// Operations Region ---------------------------------------------------------------
//BLType : 1-Direct 2-House 3-Master
//DirectionType : 1-Import 2-Export 3-Domestic
//TransportType : 1-Ocean 2-Air 3-Inland
//ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL

var TodaysDate = new Date();
var FormattedTodaysDate = TodaysDate.toLocaleDateString();
var pOperationHeader_Global = null;
var IsSupplementaryInvoice = false;
var currentTariffID = 0;

function Houses_onFileSelected(event, pBtnName) {
    debugger;
    var selectedFile = event.target.files[0];
    if (selectedFile != undefined) { //to handle the case of not choosing a file
        var sFilename = selectedFile.name;
        // Create A File Reader HTML5
        var reader = new FileReader();
        var result = document.getElementById("hExtractedData");
        reader.onload = function (e) {
            debugger;
            var data = e.target.result;
            var cfb = XLS.CFB.read(data, {
                type: 'binary'
            });
            var wb = XLS.parse_xlscfb(cfb);
            // Loop Over Each Sheet
            wb.SheetNames.forEach(function (sheetName) {
                debugger;
                //// Obtain The Current Row As CSV
                //var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
                var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
                //$("#hExtractedData").val(sCSV);
                if (oJS.length > 0 ) //if (sCSV != "")
                    Houses_ImportFromExcelFile(oJS, pBtnName);
                else {
                    swal("Sorry", "Please, revise data and version of the file.");
                    $("#" + pBtnName).val("");
                }
            });
        };
        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(selectedFile);
    }
}


function Houses_ImportFromExcelFile(pDataRows, pBtnName) {
    debugger;
    FadePageCover(true);
    var pHouseBLList = "";
    var pShipperList = "";
    var pConsigneeList = [];
    var pNotifyList = [];
    var pContainerNumberList = "";
    var pDescriptionList = "";
    var pPackageNoList = "";
    var pGrossWeightList = "";
    var pPickupCityList = "";
    var pPickupCountryList = "";
    var pDeliveryCityList = "";
    var pDeliveryCountryList = "";
    var pOperationID = $('#hOperationID').val();


    var pBLType =  constHouseBLType ;
    var pBLTypeIconName = HouseIconName;
    var pBLTypeIconStyle = strHouseIconStyleClassName;
    var pDirectionType = $('input[name=cbDirectionType]:checked').val();
    var pDirectionIconName = $("#hDirectionIconName").val();
    var pDirectionIconStyle = $("#hDirectionIconStyle").val();
    var pTransportType = $('input[name=cbTransportType]:checked').val();
    var pTransportIconName = $("#hTransportIconName").val();
    var pTransportIconStyle = $("#hTransportIconStyle").val();

    for (var i = 0; i < pDataRows.length; i++) { 
        debugger;
        pHouseBLList += ((pHouseBLList == "" ? "" : ",") +
            (pDataRows[i].HouseBL == undefined || pDataRows[i].HouseBL == "" ? 0 : pDataRows[i].HouseBL)
        );

        pShipperList += ((pShipperList == "" ? "" : ",") +
            (pDataRows[i].Shipper == undefined || pDataRows[i].Shipper.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Shipper.replace(/[\, ]/g, ' ').toUpperCase().trim())
        );

        pConsigneeList += ((pConsigneeList == "" ? "" : ",") +
            (pDataRows[i].Consignee == undefined || pDataRows[i].Consignee.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Consignee.replace(/[\, ]/g, ' ').toUpperCase().trim())
        );


        pNotifyList += ((pNotifyList == "" ? "" : ",") +
            (pDataRows[i].Notify == undefined || pDataRows[i].Notify.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Notify.replace(/[\, ]/g, ' ').toUpperCase().trim())
        );


        pContainerNumberList += ((pContainerNumberList == "" ? "" : ",") +
            (pDataRows[i].ContainerNumber == undefined || pDataRows[i].ContainerNumber == "" ? 0 : pDataRows[i].ContainerNumber)
        );

        pDescriptionList += ((pDescriptionList == "" ? "" : ",") +
            (pDataRows[i].Description == undefined || pDataRows[i].Description.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Description.replace(/[\, ]/g, ' ').trim())
        );

        pPackageNoList += ((pPackageNoList == "" ? "" : ",") +
            (pDataRows[i].PackageNo == undefined || pDataRows[i].PackageNo.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PackageNo.replace(/[\, ]/g, ' ').trim())
        );

        pGrossWeightList += ((pGrossWeightList == "" ? "" : ",") +
            (pDataRows[i].GrossWeight == undefined || pDataRows[i].GrossWeight.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].GrossWeight.replace(/[\, ]/g, ' ').trim())
        );

        pPickupCityList += ((pPickupCityList == "" ? "" : ",") +
            (pDataRows[i].PickupCity == undefined || pDataRows[i].PickupCity.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PickupCity.replace(/[\, ]/g, ' ').toUpperCase().trim())
        );

        pPickupCountryList += ((pPickupCountryList == "" ? "" : ",") +
            (pDataRows[i].PickupCountry == undefined || pDataRows[i].PickupCountry.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PickupCountry.replace(/[\, ]/g, ' ').toUpperCase().trim())
        );

        pDeliveryCityList += ((pDeliveryCityList == "" ? "" : ",") +
            (pDataRows[i].DeliveryCity == undefined || pDataRows[i].DeliveryCity.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].DeliveryCity.replace(/[\, ]/g, ' ').toUpperCase().trim())
        );

        pDeliveryCountryList += ((pDeliveryCountryList == "" ? "" : ",") +
            (pDataRows[i].DeliveryCountry == undefined || pDataRows[i].DeliveryCountry.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].DeliveryCountry.replace(/[\, ]/g, ' ').toUpperCase().trim())
        );

    }
    var pParametersWithValues = {
        pHouseBLList, pShipperList, pConsigneeList, pNotifyList, pContainerNumberList, pDescriptionList, pPackageNoList, pGrossWeightList
        , pPickupCityList, pPickupCountryList, pDeliveryCityList, pDeliveryCountryList, pOperationID, pBLType, pBLTypeIconName, pBLTypeIconStyle
        , pDirectionType, pDirectionIconName, pDirectionIconStyle, pTransportType, pTransportIconName, pTransportIconStyle
    };

    debugger;
    CallPOSTFunctionWithParameters("/api/Operations/InsertListFromExcel_Houses", pParametersWithValues, function (pData) {
        debugger;
            let pReturnedMessage = pData[0];
            if (pReturnedMessage == "")
                swal("Success", "Saved Successfully.");
            else
                swal("", pReturnedMessage);
        Shipments_LoadAvailableShipments();
        }, null);

    $("#" + pBtnName).val(""); 

    FadePageCover(false);
    
}
function ChangeDates() {
    $(".hijridatepicker-input").on('dp.change', function (event) {
        //if (this.id == "txtOperationOpenDateHijriCCModule")
        ConvertFromHijriDate(this.id);
    });

}


if (pDefaults.UnEditableCompanyName == "UNF") {
    $("#slLines").attr('data-required', 'false');

}

function LoadDates() {
    debugger;
    LoadHijriDatePicker('txtOperationOpenDateHijriCCModule');
    LoadHijriDatePicker('txtETADateHijriCCModule');
    LoadHijriDatePicker('txtOffloadingDateHijriCCModule');
    LoadHijriDatePicker('txtDocDateHijriCCModule');
    LoadHijriDatePicker('txtFeesPaymentDateHijriCCModule');
    LoadHijriDatePicker('txtBayanDateHijriCCModule');
}

function LoadHijriDatePicker(ID) {
    $("#" + ID + "").hijriDatePicker({
        locale: "ar-sa",
        showSwitcher: false,
        allowInputToggle: true,
        showTodayButton: false,
        useCurrent: true,
        isRTL: true,
        keepOpen: false,
        hijri: true,
        debug: true,
        showClear: true,
        showTodayButton: true,
        showClose: true
    });
}
$(function () {
    LoadDates();
    ChangeDates();
});

function BindContainerCheckBoxesForTRI() {
    debugger;
    var pStrFnName = "/api/ContainerPackages/LoadOperationContainers";
    var pDivName = "divSelectContainers";
    var pCheckboxNameAttr = "cbSelectContainersTri";
    var pWhereClause = "";
    pWhereClause += " WHERE OperationID =" + $("#hOperationID").val();
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr, null, 5);
}

function OperationsManagement_Initialize(pWhereClauseOverwriting) {
    debugger;

    //SetAsideSearchControls(1);
    Quotations_ClearFilters();
    FormID = constOperationsFormID; //to get privilage of operations form for get permissions
    strLoadWithPagingFunctionName = "/api/Operations/LoadWithWhereClause";
    //the first parameter in the LoadView() fn. is the route in the RouteConfig
    LoadView("/Operations/Operations", "div-content", function () {
        if (pDefaults.UnEditableCompanyName == "FEL" || IsMESCOCompany)
            $("#txtOperationOpenDate").attr("disabled", "disabled");
        else if (pDefaults.UnEditableCompanyName == "MIL")
            $("#tblOperations").removeClass("table-striped");
        else if (pDefaults.UnEditableCompanyName == 'GLF')
            $('div.OperationUpload').removeClass('hide');

        if (pDefaults.UnEditableCompanyName != "BOM")
            $('#slFilterShipmentType option[value=40]').remove();//bulk

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
            , pIsBindTableRows: (pDefaults.UnEditableCompanyName != "MIL" && pDefaults.UnEditableCompanyName != "NEW" && pDefaults.UnEditableCompanyName != "CAP"
                && (glbCallingControl == "OperationsManagement" || glbCallingControl == "Operations")
                ? true : false)
            , pWhereClause_Routings: "0"
            , pOrderBy: "ID DESC"
            , pCallingControl: glbCallingControl
        };
        //LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, Operations_GetFilterWhereClause(), 1, 10
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, /*pWhereClause*/"dummy", "ID DESC", 1, 10, pControllerParameters
            , function (pData) {
                if (glbCallingControl == "OperationsManagement" || glbCallingControl == "Operations") {
                    OperationsManagement_BindTableRows(JSON.parse(pData[0]));
                }
                else if (glbCallingControl == "BLDocuments") {
                    if (pDefaults.UnEditableCompanyName == "UNF" || IsMESCOCompany) {
                        $('#btn-AddReceivablesLcl').removeClass('hide');
                        $('#btnGetLclPayables').removeClass('hide');
                        $(".ISUNIFREIGHT").removeClass("hide");


                        $.getScript(strServerURL + '/Scripts/Operations/Operations/Receivables.js' + '?version=' + version);
                        $.getScript(strServerURL + '/Scripts/Operations/Operations/Payables.js' + '?version=' + version);
                        LoadView("/MasterData/ModalSelectCharges", "div-content", function () { $("#slPayableBillTo").parent().addClass("hide"); $("#btn-SetDefaultNote").parent().addClass("hide"); }, null, null, true);//sherif: calling a partial view with only modal called from different places

                    }
                    strBindTableRowsFunctionName = "BLDocuments_BindTableRows";
                    BLDocuments_BindTableRows(JSON.parse(pData[0]));
                }
                else if (glbCallingControl == "TransferHouse") {
                    strBindTableRowsFunctionName = "BLDocuments_BindTableRows";
                    $("#h3PrintOperationDocument").text("Transfer To");
                    $("#btnPrintDocOutFromOperation").text("Transfer");
                    $("#btnPrintDocOutFromOperation").attr("onclick", "Operations_TransferHouse();");
                    BLDocuments_BindTableRows(JSON.parse(pData[0]));
                }
                else if (glbCallingControl == "CustomClearanceModule") {
                    OperationsManagement_BindTableRows(JSON.parse(pData[0]));
                }
                //var pCustomers = pData[2];
                var pAgents = pData[3];
                //var pVessels = pData[4];
                //var pContainerTypes = pData[5];
                //var pCountry = pData[6];
                //var pMoveTypes = pData[7];
                //var pShippingLines = pData[8];
                //var pTruckers = pData[9];
                //var pUsers = pData[10];
                //var pCommodity = pData[11];
                //var pTypeOfStock = pData[12];
                //var pCCA = pData[13];
                //var pAirlines = pData[14];

                //var _Salesmentemp = JSON.parse(pUsers);
                //var pSalesmen = jQuery.grep(_Salesmentemp, function (_Salesmentemp) {
                //    return _Salesmentemp.IsSalesman == true;
                //});




                ////FillListFromObject(null, 2, "<--All-->", "slFilterShipper", pCustomers, function(){ $("#slFilterConsignee").html($("#slFilterShipper").html());$("#slFilterNotify").html($("#slFilterShipper").html());});


                $.ajaxSetup({
                    cache: true
                });
                $.getScript(strServerURL + '/Scripts/Operations/Operations/DocsOut.js' + '?version=' + version, function () {
                    DocsOut_LoadAll(0, "slDocsOutTypesOutsideModal", false);
                });
                $.ajaxSetup({
                    cache: false
                });

                if (glbCallingControl == "BLDocuments") {
                    $("#slDocsOutTypesOutsideModal").removeClass("hide");
                    $("#btn-print_Multiple_OnePage").removeClass("hide");
                    //$("#btn-AddShipment").removeClass("hide");

                    InvoiceTypes_GetList_ForLCL(null, "slInvoiceTypesOutsideModal");
                    $(".divBLDocumentsSearch").removeClass("hide");

                } else {
                    $("#slDocsOutTypesOutsideModal").addClass("hide");
                    $("#btn-print_Multiple_OnePage").addClass("hide");
                    //$("#btn-AddShipment").addClass("hide");

                    $(".divBLDocumentsSearch").addClass("hide");
                }


                //FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slOperationMoveTypes", pMoveTypes, null);
                //$("#asideSearch").removeClass("hide");
            }, true);
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
        $("#div-main-options").width($("#mainForm").width() - 185);
        $("#divTblOperations").width($("#mainForm").width() - 185);
        //$("#divTblOperations").height($("#mainForm").height() - 360);

        if (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV") {
            $(".classShowForFRE").removeClass("hide");
        }
        else if (pDefaults.UnEditableCompanyName == "TRL") {
            $(".classShowForTRL").removeClass("hide");
        }
        else if (pDefaults.UnEditableCompanyName == "STR") {
            $(".classShowForSTR").removeClass("hide");
        }
        else if (pDefaults.UnEditableCompanyName == "SAF") {
            $(".classShowForSAF").removeClass("hide");
        }
        else if (pDefaults.UnEditableCompanyName == "NIL")
            $(".classShowForNIL").removeClass("hide");
        else if (pDefaults.UnEditableCompanyName == "MediterRanean")
            $(".MediterRanean").removeClass("hide");
        if (pDefaults.UnEditableCompanyName == "KDS" || pDefaults.UnEditableCompanyName == "NEW") {
            $("#spanCbBLType").text("Type");
            $("#spanLblContainerType").text("Vessel Type");
            $("#spanLblContainerType2").text("Cargo");
            $("#spanLblContainerType3").text("Cargo");
            $("#spanLblSlLines").text("Operator");

            $("#spanCbIsHouse").text("B/L");
            $("#spanCbIsMaster").text("Full Vessel");
            $("#spanCbIsConsolidation").text("General Cargo");
            //SelectOperationTypeModal
            $("#spanCbIsHouseFromQuotation").text("B/L");
            $("#spanCbIsMasterFromQuotation").text("Full Vessel");
        }
        if (pDefaults.UnEditableCompanyName == "ORI") {
            $(".classShowForOrigin").removeClass("hide");
        }
        if (pDefaults.UnEditableCompanyName == "AKS") {
            $("#txtFilteraACIDDetails").parent().addClass("hide");
            $("#txtFilterACIDNumber").parent().addClass("hide");
            $("#txtFilterForm13Number").parent().addClass("hide");
            $("#slFilterIsForm13Delivered").parent().addClass("hide");
        }

        if (OA && (glbCallingControl == "OperationsManagement" || glbCallingControl == "Operations")) {
            LoadView("/MasterData/ModalAgents", "div-content", function () {
                if (pDefaults.UnEditableCompanyName == "SAF") {
                    $(".classMandatoryForSAF").attr("data-required", "true");
                }
                $("#OperatorTankChargeItemModal").remove();
                $("#divOperatorTankChargeBtns").addClass("hide");
            }, null, null, true);//sherif: calling a partial view with only modal called from different places
            LoadView("/MasterData/ModalCustomers", "div-content"
                , function () {
                    //$(".classHideOutsidePartners").addClass("hide");
                    if (pDefaults.UnEditableCompanyName == "SAF") {
                        $("#btn-OperatorTankChargeModal").addClass("hide");
                        $(".classMandatoryForSAF").attr("data-required", "true");
                    }
                }, null, null, true);//sherif: calling a partial view with only modal called from different places
            LoadView("/MasterData/ModalAddresses", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
            LoadView("/MasterData/ModalContacts", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
            LoadView("/MasterData/ModalVessels", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
            $.ajaxSetup({
                cache: true
            });
            $.getScript(strServerURL + '/Scripts/MasterData/Partners/Agents.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
            $.getScript(strServerURL + '/Scripts/MasterData/Partners/Customers.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
            $.getScript(strServerURL + '/Scripts/MasterData/Partners/Addresses.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
            $.getScript(strServerURL + '/Scripts/MasterData/Partners/Contacts.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
            $.getScript(strServerURL + '/Scripts/MasterData/Others/Vessels.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
            $.ajaxSetup({
                cache: false
            });
        }


        if (glbCallingControl == "OperationsManagement" || glbCallingControl == "Operations") {
            OperationsManagement_BLDocuments_BindTableRows = "OperationsManagement_BindTableRows";
            $("#hl-menu-Operations").parent().siblings().removeClass("active");
            $(".classShowForOperationsManagement").removeClass("hide");
            if (pDefaults.UnEditableCompanyName == "ELI")
                $(".classShowForELI").removeClass("hide");
        }
        else if (glbCallingControl == "BLDocuments") {
            OperationsManagement_BLDocuments_BindTableRows = "BLDocuments_BindTableRows";
            $("#h3Operations").text("Houses");
            $("#hl-menu-ContainerTrackingGroup").parent().siblings().removeClass("active");
            $("#hl-menu-ContainerTrackingGroup").parent().addClass("active");
            $(".classShowForBLDocuments").removeClass("hide");
        }
        else if (glbCallingControl == "TransferHouse") {
            OperationsManagement_BLDocuments_BindTableRows = "BLDocuments_BindTableRows";
            $("#h3Operations").text("Houses");
            $("#hl-menu-ContainerTrackingGroup").parent().siblings().removeClass("active");
            $("#hl-menu-ContainerTrackingGroup").parent().addClass("active");
            $(".classShowForTransferHouse").removeClass("hide");
            $(".classHideForTransferHouse").addClass("hide");
        }
        else if (glbCallingControl == "CustomClearanceModule") {
            OperationsManagement_BLDocuments_BindTableRows = "OperationsManagement_BindTableRows";
            $("#btn-NewAdd").attr("data-target", "#CCModal");
        }
        if (pDefaults.UnEditableCompanyName == "NAJ") {
            $(".classHideForNAJ").addClass("hide");
            $(".classShowForNAJ").removeClass("hide");
            $("#slFilterClients").parent().css("clear", "both");
        }

    },
        function () { Operations_ClearAllControls(); },
        function () { Operations_DeleteList(); });
}
//var listVehicleTracking = '';
function OperationsEdit_Initialize(pOperationID, evlMessage = "") {
    debugger;
    //let version = 2.3;

    FadePageCover(true);
    $("#asideSearch").addClass("hide");
    Quotations_ClearFilters();
    strLoadWithPagingFunctionName = "/api/Operations/LoadOperationWithDetails_ForEdit";
    SetglbCallingControlInOperation("General");

    LoadView("/Operations/OperationsEdit", "div-content", function () {
        debugger;
        
        if (pDefaults.UnEditableCompanyName == "EVL" && evlMessage != "") {
            swal("Attention!", evlMessage, "warning");
        }
        if (pDefaults.UnEditableCompanyName == "QUO") {
            $("#OperationDispatchNumber").html("سداد تكلفة البضاعة");
            $("#lblFileAccountingDate").parent().removeClass("hide");
        }
        else if (pDefaults.UnEditableCompanyName == "MES") {
            $('#txtShipmentPONumber').closest('.form-group').find('label').text('Freight Quotation Cost');
        }
        if (pDefaults.UnEditableCompanyName == "UNF") {
            $("#lblOperationNetwork").html("Feeder");
            $(".classShowForUNF").removeClass("hide");
            $("#txtSearchInvoicesBL").attr("placeholder", "Search BL / Invoice NO / Date / Status Paid / Name");
        }
        else if (pDefaults.UnEditableCompanyName == 'SSH') {
            $("#lblOperationNetwork").text("Project");
            $("#lblOperationDispatchNumber").text("Department");
        }
        else {
            $("#lblOperationNetwork").html("Network");
        }
        if (pDefaults.UnEditableCompanyName == "HOR") {
            //  $("#slOperationEditSalesman").attr("disabled", true);
        }
        if (pDefaults.UnEditableCompanyName == "AKS") {
            $('#txtOperationSupplierReference').parent().addClass('hide');
            $('#txtOperationPONumber').parent().addClass('hide');
            $('#txtOperationPODate').parent().addClass('hide');
            $('#txtOperationPOValue').parent().addClass('hide');
            $('#txtOperationReleaseValue').parent().addClass('hide');
            $('#txtOperationDispatchNumber').parent().addClass('hide');
            $('#slOperationVesselID').parent().addClass('hide');
        }
        if (pDefaults.UnEditableCompanyName == "NAJ") {
            $("#txtOperationPODate").prev().text("SI Date Of Submission");
            $("#txtOperationReleaseDate").prev().text("Validated Titles");
            $("#txtOperationForm13Date").prev().text("Date Of Submission");
            $("#txtFileAccountingDate").prev().text("Term Cutoff");
            $("#txtFileAccountingDate").parent().removeClass("hide");
            $("#CommoditeHideMED").css("clear", "both");
            $("#divShipperAddress").addClass("hide");
            $("#divConsigneeAddress").addClass("hide");
            $("#divNotifyAddress").addClass("hide");
            $("#slOperationMoveTypes").parent().css("clear", "both");
            $("#txtOperationSIDate").parent().removeClass("hide");
            $("#txtOperationSIDate").datetimepicker({
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                forceParse: 0,
                showMeridian: 1
            });
        }
        

        if (pDefaults.UnEditableCompanyName == "BRS") {
            $("#txtOperationNotes").attr("maxlength", 5000);
        }
        CallGETFunctionWithParameters(strLoadWithPagingFunctionName, { pPageNumber: 1, pPageSize: 1, pWhereClause_ForEdit: " where ID = " + pOperationID, pOperationID: pOperationID, pOperationFormID: constOperationsFormID }
            , function (data) {
                pOperationHeader_Global = JSON.parse(data[0]);
                MESCanMulEdit = data[27];
                listVehicleTracking = data[28];
                objTransPorts = data[29];
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slOperationTransPort", objTransPorts, null);
                $("#cb-CheckAll").prop('checked', false);
                Operations_FillControls(JSON.parse(data[0])/*Operation(just 1)*/, data[2]/*pIsOperationClosed*/, JSON.parse(data[3])/*pDocsInFileNames*/
                    , data[4]/*pOperationStages*/, data[5]/*pBranches*/, data[6]/*pUsers*/, data[7]/*pIncoterms*/, data[8]/*pPOrC*/, data[9]/*pMoveTypes*/
                    , data[10]/*pCommodities*/, data[11]/*pInvoiceTypes*/, data[12]/*pNetwork*/, data[13]/*pSuppliers*/, JSON.parse(data[14])/*pMasterAndHouses*/, data[15] /*pVessel*/
                    , data[16] /*ClientPickUpAddress*/, data[17] /*ClientDeliveryAddress*/, data[18] /*ClientOtherAddress*/, data[19] /*ClientContactDetails*/, data[20] /*Salesmen*/, data[21] /*Categories*/, data[22], data[23], data[24], data[25]
                    , data[26], data[30], JSON.parse(data[31])/*pDocsInFileNamesPayables*/);
                debugger;
                if (pDefaults.UnEditableCompanyName == "TRI") {
                    BindContainerCheckBoxesForTRI();
                }
                //Printing invoice items with notes by default in NewTrans
                if (pDefaults.UnEditableCompanyName == "NEW" || pDefaults.UnEditableCompanyName == "TRM") {
                    $("#cbAddNotesToItems").prop("checked", true);
                    $("#cbPrintFooterInvoice").prop("checked", true);
                    $("#cbPrintHeaderInvoice").prop("checked", true);
                }
                if (IsMESCOCompany) {

                    if (pOperationHeader_Global.TransportType == 2) {
                        $('#txtFileAccountingDate').parent().parent().removeClass('hide');
                        $('#txtFileAccountingDate').parent().parent().children().addClass('hide');
                    }

                    $(".classShowForMesco").removeClass("hide");
                    $('#lblFileAccountingDate').text('End Of Services');
                    $('#txtFileAccountingDate').parent().removeClass('hide');


                    if (pOperationHeader_Global.QuotationID != 0)
                        $("#slOperationEditSalesman").attr("disabled", true);

                    if (pOperationHeader_Global.BLType == 1 && pOperationHeader_Global.TransportType == 2)
                        $("#btn-LinkHAWB").parent().removeClass("hide");
                    if (IsMESCOCompany && pOperationHeader_Global.QuotationID != 0 && !(pOperationHeader_Global.OperationStageID != CancelledQuoteAndOperStageID && Date.prototype.compareDates(FormattedTodaysDate, GetDateWithFormatMDY(pOperationHeader_Global.CloseDate)) <= 0)) {
                        $("#btn-GetCrmUpdates").parent().removeClass("hide");
                    }
                    if (pOperationHeader_Global.QuotationID != 0 && (pOperationHeader_Global.OperationStageID == 110 || pOperationHeader_Global.OperationStageID == 120 || pOperationHeader_Global.OperationStageID == 130)) {
                        $("#btn-GetCrmUpdates").parent().addClass("hide");
                    }
                }
                if (pDefaults.UnEditableCompanyName == "NTMU") {
                    $("#slOperationEditOperationMan").parent().find("label").text("Operation User");
                    $("#slOperationEditSalesman").parent().find("label").text("Sales User");
                    $("#txtOperationCutOffDate").parent().find("label").text("Doc Cut off Date");
                    $("#lblOperationForm13Number").parent().find("label").text("AES ITN");
                    $(".ShowForNTMUS").addClass("hide");
                    $("#cbIsForm13Delivered").parent().addClass("hide");
                    if (pOperationHeader_Global.DirectionType == 1) {
                        $("#txtOperationForm13Date").parent().find("label").text("AMS Filing Date");
                        $("#txtOperationReleaseDate").parent().find("label").text("ISF Filing Date");
                    }
                    else if (pOperationHeader_Global.DirectionType == 2)
                        $("#txtOperationForm13Date").parent().find("label").text("AES Filing Date");

                }

                FadePageCover(false);

                $.ajaxSetup({
                    cache: true
                });

                $.getScript(strServerURL + '/Scripts/Operations/Operations/Payables.js' + '?version=' + version);
                $.getScript(strServerURL + '/Scripts/Operations/Operations/Receivables.js' + '?version=' + version);
                $.getScript(strServerURL + '/Scripts/Operations/Operations/Invoices.js' + '?version=' + version);

                $.ajaxSetup({
                    cache: false
                });

                if (pDefaults.UnEditableCompanyName == "MED") {
                    Tracking_LoadAll();
                }

                HideOperationActions();
            }
            , null, false);
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
        $("title").text("Operation");
        if (pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG") {
            $("#lblCustomerReference").text("Commercial Invoice Value");
            $("#lblReleaseValue").text("Commercial Invoice Number");
            $("#lblKDMReferenceOrILSComInvNo").text("Commercial Invoice Number");
            $("#lblSupplierReference").text("HBL ACID No");
            $("#lblBusinessUnit").text("HS Code");

            $("#lblShipmentCustomerReference").text("Place of Issue");
            $("#lblShipmentSupplierReference").text("Freight Payable By");
        }
        else if (pDefaults.UnEditableCompanyName == "KDM") {
            $("#txtOperationReleaseNumber").attr("disabled", "disabled");
            $("#lblKDMReferenceOrILSComInvNo").text("KDM Reference");
        }
        else if (pDefaults.UnEditableCompanyName == "GLS") {
            $("#txtOperationPODate").siblings().text("Storing Date");
        }
        else if (pDefaults.UnEditableCompanyName == "KDS" || pDefaults.UnEditableCompanyName == "NEW") {
            $("#spanCbBLType").text("Type");
            $("#spanLblContainerType").text("Vessel Type");
            $("#spanLblContainerType2").text("Cargo");
            $("#spanLblContainerType3").text("Cargo");
            $("#spanLblSlLines").text("Operator");
            $("#spanLine").text("Operator");
            $("#spanClient").text("Owner");
            $("#spanAgent").text("Owner");
            $("#txtOperationCutOffDate").siblings().text("ETC/ETS");

            $("#lblCustomerReference").text("Kadmar Serial No.");
            $("#lblCustomerReference").siblings().attr("placeholder", "Kadmar Serial No.");
            $(".classHideForKDS").addClass("hide");
            $("#spanCbIsHouse").text("B/L");
            $("#spanCbIsMaster").text("Full Vessel");
            $("#spanCbIsConsolidation").text("General Cargo");
            //OperationTracking
            $("#btn-AddTracking").text('Add Vessel Position');
            $("#h3TrackingStage").text('Daily Vessel Position');
            $("#lblTrackingStage").text('Vessel Position');
            $("#lblBusinessUnit").text("اسم الكابتن");

            //if (pDefaults.UnEditableCompanyName == "NEW") {
            //    $("#slShippers").siblings().text("صاحب الشهادة");
            //    $("#slConsignees").siblings().text("عميل الفاتورة");
            //}
        }
        else if (pDefaults.UnEditableCompanyName == "SAF") {
            $(".classShowForSAF").removeClass("hide");
        }
        else if (pDefaults.UnEditableCompanyName == "MED") {
            $("#lblBusinessUnit").text("HS Code");
            $("#lblBusinessUnit2").text("HS Code 2");
            $("div.BusinessUnit2").removeClass("hide");
        }
        else if (pDefaults.UnEditableCompanyName == "DGL") {
            $("#menu1_PrintOptions").removeClass("hide");
        }
        else if (pDefaults.UnEditableCompanyName == "NIL") {
            $("#lblSupplierReference").text("Customs Closing Date");
            $("#txtOperationSupplierReference").attr("Placeholder", "Select Date");
            $("#txtOperationSupplierReference").attr("data-date-format", "dd/mm/yyyy");
            $("#txtOperationSupplierReference").datepicker().on('changeDate', function () { $(this).datepicker('hide'); });

            $("#lblKDMReferenceOrILSComInvNo").text("File Selling Date");
            $("#txtOperationReleaseNumber").attr("Placeholder", "Select Date");
            $("#txtOperationReleaseNumber").attr("data-date-format", "dd/mm/yyyy");
            $("#txtOperationReleaseNumber").datepicker().on('changeDate', function () { $(this).datepicker('hide'); });

            //$("#lblOperationForm13Number").text("Freight Operation Man"); 
            $(".Form13NumberLable").text("Freight Operation Man"); 


        } else if (pDefaults.UnEditableCompanyName == "BED") {
            $("#txtTrackingDate").attr("data-date-format", "dd/mm/yyyy hh:ii");
            $("#txtTrackingDate").datetimepicker({
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                forceParse: 0,
                showMeridian: 1
            });
            $("#lblCreationDate").parent().removeClass("hide");
        } else if (pDefaults.UnEditableCompanyName == "USC") {
            $(".classShowForUSC").removeClass("hide");
        }
        if (pDefaults.UnEditableCompanyName == "USC" && OEInv) {
            $("#btn-InvoiceApproveFromOperation").removeClass("hide");
        }



        //if (OVShi) LoadView("/Operations/ModalShipments", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalCustomers", "div-content"
            , function () {
                if (pDefaults.UnEditableCompanyName == "SAF") {
                    $("#btn-OperatorTankChargeModal").addClass("hide");
                    $(".classMandatoryForSAF").attr("data-required", "true");
                }
            }, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalAgents", "div-content", function () {
            if (pDefaults.UnEditableCompanyName == "SAF") {
                $(".classMandatoryForSAF").attr("data-required", "true");
            }
        }, null, null, true);//sherif: calling a partial view with only modal called from different places
        if (OVPac || OVShi) LoadView("/Operations/ModalSelectOperationsContainersAndPackages", "div-content", function () {
            GetListWithNameAndWhereClause(null, "/api/PackageTypes/LoadAll", "<--Select-->", "slPackageTypes", "ORDER BY Name", null);
            if (pDefaults.UnEditableCompanyName == 'UNF') {
                $('#txtCargoTareWeight').prop('disabled', true);
                $('#txtCargoGrossWeightTON').prop('disabled', true);
                $('#txtCargoVGM').prop('disabled', true);
                $('#txtCargoNetWeight').prop('disabled', true);
                $('#txtCargoNetWeightTON').prop('disabled', true);
                $('#txtCargoVolumetricWeight').prop('disabled', true);
                $('#txtCargoChargeableWeight').prop('disabled', true);
            }
        }
            , null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalShippingAgents", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalCustomsClearanceAgents", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalSuppliers", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalVessels", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        if (OVRou) LoadView("/Operations/ModalRoutings", "div-content"
            , function () {
                if (pDefaults.UnEditableCompanyName == "ELI" && $('#cbPrintAsBosla').is(':checked')) {
                    $('#divRoadNumberTruckingOrder').removeClass('hide');
                }
                else if (pDefaults.UnEditableCompanyName == 'SSH') {
                    $('#btn-AddCustomClearanceTracking').text('Add Approving Stage');
                    $('#spanCustomClearanceTrackingStage').text('Approving Stage');
                    $('td.CcTemporaryDate').text('تأمين');
                    $('#lblQasimaNumber').text('Form4 Number');
                    $('#lblQasimaDate').text('Form4 Date');
                    $('#lblCCAAcceptedValue').text('Custom Duty Val');
                    $('#lblCCAImportValue').text('Custom Duty Reason');
                    $('#lblCCAReceiveDate').text('Custom Duty Date');
                    $('#lblMatch').text('Inspection');
                    $('#slCustomClearanceTrackingStage,#slCustomClearanceTrackingCustody').attr('data-required', 'false').closest('div').addClass('hide');
                    $('.hideForSSH').addClass('hide');
                    $('.showForSSH').removeClass('hide');
                }
                GetListWithCodeAndNameAndWhereClause(null, "/api/Ports/LoadAll", "<--Select-->", "slTruckingOrderGateInPort"
                    , "WHERE CountryID=" + $("#hDefaultCountryID").val()
                    , function () {
                        $("#slTruckingOrderGateOutPort").html($("#slTruckingOrderGateInPort").html());
                        $("#slTruckingOrderGateInPortTruckingOrder").html($("#slTruckingOrderGateInPort").html());
                        $("#slTruckingOrderGateOutPortTruckingOrder").html($("#slTruckingOrderGateInPort").html());
                        if (pDefaults.UnEditableCompanyName == "MED") {
                            $("#lblStuffingDate").text("Stuffing Date - تاريخ التحميل ");
                            $(".classShowForMED").removeClass("hide");
                        }
                    });
            }, null, null, true);//sherif: calling a partial view with only modal called from different places
        //if (OVPac) LoadView("/Operations/ModalRebuildConsolidation", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        if (OVInv || OVDraftInv || OVNot || OVPurInv || OVPurchaseingInv) LoadView("/Operations/ModalInvoices", "div-content"
            , function () {
                if (pDefaults.UnEditableCompanyName == "GBL") {
                    $("#txtInvoiceFixedDiscount").parent().addClass("hide");
                    $(".classShowForGBL").removeClass("hide");
                }
                if (pDefaults.UnEditableCompanyName == "AGR") {
                    $(".classShowForAGR").removeClass("hide");
                }
                if (pDefaults.UnEditableCompanyName == "LATT") {
                    $(".classShowForLatt").removeClass("hide");
                }
                if (pDefaults.IsTaxOnItems)
                    $(".classShowForTaxOnItems").removeClass("hide");
                else
                    $(".classShowForTaxOnHeader").removeClass("hide");
                if (pDefaults.UnEditableCompanyName == "ELI")
                    $(".classShowForELI").removeClass("hide");
                if (pDefaults.UnEditableCompanyName == "SEF")
                    $(".classShowForSEF").removeClass("hide");
                $("#slInvoiceCurrency").html($("#hReadySlCurrencies").html());
                $("#slEditInvoiceCurrency").html($("#hReadySlCurrencies").html());
                $("#slAccNoteCurrency").html($("#hReadySlCurrencies").html());
                $("#slEditAccNoteCurrency").html($("#hReadySlCurrencies").html());
                $("#slPurchaseInvoiceCurrency").html($("#hReadySlCurrencies").html());
                $("#slPurchaseingInvoiceCurrency").html($("#hReadySlCurrencies").html());

                if (pDefaults.UnEditableCompanyName == "IST" || pDefaults.UnEditableCompanyName == "KML" || pDefaults.UnEditableCompanyName == "KDS" || pDefaults.UnEditableCompanyName == "NEW" || pDefaults.UnEditableCompanyName == "GBL") {
                    $("#slInvoiceAddressTypes").attr("data-required", "false");
                    $("#slEditInvoiceAddressTypes").attr("data-required", "false");
                }
                else {
                    $("#slInvoiceAddressTypes").attr("data-required", "true");
                    $("#slEditInvoiceAddressTypes").attr("data-required", "true");
                }
                if (pDefaults.UnEditableCompanyName == "TRM") {
                    GetListWithNameAndWhereClause(1, "/api/BankTemplate/LoadAll", "<--Select Bank Template-->", "slBankTemplate", "ORDER BY Name", null);
                    $("#cbPrintHeaderInvoice").prop("checked", true);
                    $("#cbAddNotesToItems").prop("checked", true);
                    $("#cbPrintBankDetailsFromTemplate").prop("checked", true).trigger('change');
                } else {
                    GetListWithNameAndWhereClause(null, "/api/BankTemplate/LoadAll", "<--Select Bank Template-->", "slBankTemplate", "ORDER BY Name", null);
                }
            }, null, null, true);//sherif: calling a partial view with only modal called from different places
        if (OVPay || OVRec || OVInv || OVDraftInv || OVNot) LoadView("/MasterData/ModalSelectCharges", "div-content"
            , function () {
                if (pDefaults.UnEditableCompanyName == "GBL") {
                    $("#txtReceivableNotes").attr("maxlength", "500");
                    $(".classShowForGBL").removeClass("hide");
                }
                $(".classHideForOperations").addClass("hide");
                if (["FIV", "SUS"].includes(pDefaults.UnEditableCompanyName)) {
                    $(".classShowForFIV").removeClass("hide");
                    $(".classDisableForFIV").attr("disabled", "disabled");
                }
                //if (pDefaults.UnEditableCompanyName == "SUS") {
                //    $(".classShowForSUS").removeClass("hide");
                //}
                if (pDefaults.UnEditableCompanyName == "DGL")
                    $(".classShowForDGL").removeClass("hide");
                if (pDefaults.IsTaxOnItems)
                    $(".classShowForTaxOnItems").removeClass("hide");
                else
                    $(".classShowForTaxOnHeader").removeClass("hide");
                if (pDefaults.UnEditableCompanyName == "SAF" || pDefaults.UnEditableCompanyName == "VER")
                    $("#txtPayableSupplierInvoiceNo").attr("data-required", "true");
                else
                    $("#txtPayableSupplierInvoiceNo").attr("data-required", "false");
                $("#slPayableCurrency").html($("#hReadySlCurrencies").html());
                $("#slReceivableCurrency").html($("#hReadySlCurrencies").html());
                $("#slReceivableCurrency_Foreign").html($("#hReadySlCurrencies").html());
            }, null, null, true);//sherif: calling a partial view with only modal called from different places
        //if (OVRou && OERou) LoadView("/MasterData/ModalMAWBStockSelect", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        //if (OVPar && OERou) LoadView("/MasterData/ModalMAWBStock", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        //if (OVPay || OVRec || OVPac) LoadView("/MasterData/ModalCheckboxesList", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places

        //$.getScript(strServerURL + '/Scripts/Operations/Operations/Invoices.js');//sherif: to load the js file of the appended partial view

        $.ajaxSetup({
            cache: true
        });

        if (OVPar) $.getScript(strServerURL + '/Scripts/MasterData/Others/Vessels.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
        if (OVPar) $.getScript(strServerURL + '/Scripts/MasterData/Partners/Customers.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
        if (OVPar) $.getScript(strServerURL + '/Scripts/MasterData/Partners/Agents.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
        if (OVPar) $.getScript(strServerURL + '/Scripts/MasterData/Partners/ShippingAgents.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
        if (OVPar) $.getScript(strServerURL + '/Scripts/MasterData/Partners/CustomsClearanceAgents.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
        if (OVPar) $.getScript(strServerURL + '/Scripts/MasterData/Partners/Suppliers.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
        if (OVPac || OVShi) $.getScript(strServerURL + '/Scripts/Operations/Operations/OperationContainersAndPackages.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
        //$.getScript(strServerURL + '/Scripts/Operations/Operations/OperationCharges.js');//sherif: to load the js file of the appended partial view
        if (OVPar) $.getScript(strServerURL + '/Scripts/Operations/Operations/OperationPartners.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
        if (OVRou) $.getScript(strServerURL + '/Scripts/Operations/Operations/Routings.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
        //if (OVPac && OEPac) $.getScript(strServerURL + '/Scripts/Operations/Operations/RebuildConsolidation.js');//sherif: to load the js file of the appended partial view
        if (OVDocIn) $.getScript(strServerURL + '/Scripts/Operations/Operations/DocsIn.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
        //if (OVDoc || OVInv) $.getScript(strServerURL + '/Scripts/Operations/Operations/DocsOut.js');//sherif: to load the js file of the appended partial view
        if (OVPar) $.getScript(strServerURL + '/Scripts/MasterData/Partners/Addresses.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
        if (OVPar) $.getScript(strServerURL + '/Scripts/MasterData/Partners/Contacts.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
        //$.getScript(strServerURL + '/Scripts/Operations/Operations/Payables.js');//sherif: to load the js file of the appended partial view
        if (OVDelivery) $.getScript(strServerURL + '/Scripts/Operations/Operations/Delivery.js' + '?version=' + version);//sherif: to load the js file of the appended partial view

        //$.getScript(strServerURL + '/Scripts/Operations/Operations/Receivables.js');//sherif: to load the js file of the appended partial view
        if (OVMas) $.getScript(strServerURL + '/Scripts/Operations/Operations/Master.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
        if (OVShi || OVPac) $.getScript(strServerURL + '/Scripts/Operations/Operations/Shipments.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
        if (OVShi || OVPac) $.getScript(strServerURL + '/Scripts/DocAi/DocAiExtract.js' + '?version=' + version, function () {
            $.getScript(strServerURL + '/Scripts/DocAi/DocAiReview.js' + '?version=' + version);//DocAi: bill review flow
        });//DocAi: "Extract with AI" in the Houses tab
        if (OVACID) $.getScript(strServerURL + '/Scripts/Operations/Operations/ACIDDetails.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
        if (OVNotif) $.getScript(strServerURL + '/Scripts/LocalEmails/LocalEmails.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
        if (OVRou && OERou) $.getScript(strServerURL + '/Scripts/MasterData/Partners/MAWBStockSelect.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
        if (OVRou && OERou) $.getScript(strServerURL + '/Scripts/MasterData/Partners/MAWBStock.js' + '?version=' + version);//sherif: to load the js file of the appended partial view
        if (OVInt) $.getScript(strServerURL + '/Scripts/InterServices/Transactions/InterServicesRequests.js' + '?version=' + version);//a7med: to load the js file of the appended partial view
        if (OVDoc || OVInv) $.getScript(strServerURL + '/Scripts/Operations/Operations/DocsOut.js' + '?version=' + version);

        $.ajaxSetup({
            cache: false
        });

        if (IsNull(pDefaults.ShowUserSalesmen, "false") == true) {
            $('#slOperationEditSalesman').on('change', function () {
                FadePageCover(true)

                CallGETFunctionWithParameters("/api/Customers/LoadAllWithMinimalColumns"
                    , {
                        pWhereClauseWithMinimalColumns: (($("#sp-LoginName").text() == "BG EGYPT" ? "WHERE Name=N'BG EGYPT'" : "WHERE 1=1") + "  AND SalesmanID = " + $('#slOperationEditSalesman').val() + " ")
                        , pOrderBy: "Name"
                    }
                    , function (pData) {
                        FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "hReadySlCustomers", pData[0], null);

                    }
                    , null);
            });
        }


    }
        , null//function () { OperationsEdit_ClearAllControls(); }
        , null//function () { OperationsEdit_DeleteList(); }
    );
}
function ApplySelectListSearch() {
    debugger;
    $('#slShippers').attr('onchange', '');
    $('#slConsignees').attr('onchange', '');
    $('#slNotify').attr('onchange', '');
    //if (pDefaults.UnEditableCompanyName == "GBL") {
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

    $("#slOperationVessels").css({ "width": "100%" }).select2();
    $("#slOperationVessels").trigger("change");

    if (pDefaults.UnEditableCompanyName != "UNF") {
        $("#slPOL").css({ "width": "100%" }).select2();
        $("#slPOL").trigger("change");
        $("#slPOD").css({ "width": "100%" }).select2();
        $("#slPOD").trigger("change");
    }


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

    $("#slRoutingVessels").css({ "width": "100%" }).select2();
    $("#slRoutingVessels").trigger("change");

    $("#slQuotationRoutes").css({ "width": "100%" }).select2();
    //$("#slQuotationRoutes").trigger("change");

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

    $("#slOperationToSetShipmentDates").css({ "width": "100%" }).select2();
    $("#slOperationToSetShipmentDates").trigger("change");

    $("#slPayableBill").css({ "width": "100%" }).select2();
    $("#slPayableBill").trigger("change");

    $("#slCreatedBy").css({ "width": "100%" }).select2();
    $("#slCreatedBy").trigger("change");
    //$("#slFilterCCA").css({ "width": "100%" }).select2();
    //$("#slFilterCCA").trigger("change");

    //$("#slFilterBookingParty").css({ "width": "100%" }).select2();
    //$("#slFilterBookingParty").trigger("change");

    //}
    $('#slShippers').attr('onchange', "GetRelatedSalesman('shipper');OnCustomerChanged('slShippers', 'divShipperAddress'); checkShipmentIsTracked();");
    $('#slConsignees').attr('onchange', "GetRelatedSalesman('consignee');OnCustomerChanged('slConsignees', 'divConsigneeAddress'); checkShipmentIsTracked();");
    $('#slNotify').attr('onchange', "OnCustomerChanged('slNotify', 'divNotifyAddress');");
    $("div[tabindex='-1']").removeAttr('tabindex');
}
function UpdateMasterData() {
    swal("Loading...", "Updating Master Data is in progress, please wait");
    try {
        $.ajax({
            url: '/api/DynamicsCRM/UpdateMasterData',
            type: 'get',
            success: function () {
                debugger;
                swal("Success", "Master data is up to date");
            }
        })
    } catch (error) {
        console.log(error);
    }
}
function RefreshQuotations() {
    debugger;
    //UpdateDynamicsQuotations(3057);
    swal("Loading...", "Updating quotations is in progress, please wait");
    try {
        $.ajax({
            url: '/api/DynamicsCRM/RefreshQuotations',
            type: 'get',
            success: function () {
                debugger;
                swal("OK", "All quotations are up to date");
            }
        })
    } catch (error) {
        console.log(error);
    }
}
function GetQuotationByQuotationNumber() {
    if ($("#txtQuotationCode").val() == "" || $("#txtQuotationCode").val() == null)
        swal("Error", "Please enter quotation code");
    else {
        FadePageCover(true);
        try {
            $.ajax({
                url: '/api/DynamicsCRM/GetQuotationByQuotationNumber',
                data: { 'QuotationNumber': $("#txtQuotationCode").val() },
                type: 'get',
                success: function (Message) {
                    debugger;
                    FadePageCover(false);
                    swal("", Message);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}




function OperationsManagement_BindTableRows(pOperations) {
    debugger;
    ClearAllTableRows("tblOperations");
    if (IsMESCOCompany) {
        $("#btn-RefreshQuotations").removeClass("hide");
        $("#btn-UpdateMasterData").removeClass("hide");
        $("#txtQuotationCode").parent().removeClass("hide");
        $(".classShowForMesco").removeClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "EVL") {
        $('.showForEVL').removeClass('hide');
    } else {
        $('.showForEVL').addClass('hide');
    }
    if (pDefaults.UnEditableCompanyName == "NIL") {
        $('.showForNIL').removeClass('hide');
        $('.hideForNIL').addClass('hide');
    }
    debugger;
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    let copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>";
    let printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right " + (OEDoc ? "" : " hide ") + "' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    let openNewTabControlsText = " class='btn btn-xs btn-rounded btn-primary float-right ' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>Open New Tab</span>";
    $.each(pOperations, function (i, item) {
        if (pDefaults.UnEditableCompanyName == "NAJ") {
            AppendRowtoTable("tblOperations",
                //("<tr ID='" + item.ID + "' ondblclick='SwitchToOperationsEditView(" + item.ID + ");' title='" + (item.InvoiceNumbers == 0 ? "" : ("Invoices:" + item.InvoiceNumbers)) + "' class='font-bold "
                ("<tr ID='" + item.ID + "' " + (IsMESCOCompany && !(pLoggedUserSalesmen.includes(item.SalesmanID) && pLoggedUserServices.includes(item.ServiceID)) ? "" : "ondblclick = 'SwitchToOperationsEditView(" + item.ID + ");'") + " class='font-bold "
                    //+ (item.OperationStageID == CancelledQuoteAndOperStageID
                    //        ? "static-text-danger" //cancelled operation  
                    //        : (item.OperationStageName == "CLOSED" //(Date.prototype.compareDates(FormattedTodaysDate, GetDateWithFormatMDY(item.CloseDate)) <= 0
                    //            ? "static-text-primary" //closed operation
                    //            : "")
                    //)
                    + "' style='" //of class
                    + (pDefaults.UnEditableCompanyName == "MIL"
                        ? (item.OperationStageName == "CLOSED"
                            ? "background-color:cyan;"
                            : (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActualArrival)) > 0
                                ? "background-color:green;"
                                : (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActualDeparture)) > 0
                                    ? "background-color:yellow;"
                                    : ""
                                )
                            )
                        )
                        : (item.OperationStageID == CancelledQuoteAndOperStageID
                            ? "background-color:#e16f67;" //red //cancelled operation
                            : (item.OperationStageName == "CLOSED" //(Date.prototype.compareDates(FormattedTodaysDate, GetDateWithFormatMDY(item.CloseDate)) <= 0
                                ? "background-color:#67e167;" //green //closed operation
                                : "")
                        )
                    )
                    + "' title='" + (item.ShipperName == "0" ? "" : "Shipper: " + item.ShipperName) + "\n" + (item.ConsigneeName == "0" ? "" : "Consignee: " + item.ConsigneeName) + "\n" + (item.Consignee2Name == "0" ? "" : "Consignee2: " + item.Consignee2Name) + "'>"
                    + "<td class='QuotationID hide' val='" + item.QuotationID + "'>" + item.QuotationID + "</td>"

                    + "<td class='shownBLTypeIconName hide'><i class= 'fa " + item.BLTypeIconName + " " + item.BLTypeIconStyle + " fa-2x'/></td>"
                    + "<td class='DirectionType hide'>" + item.DirectionType + "</td>"
                    + "<td class='shownDirectionIconName'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-2x'/><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/></td>"

                    + "<td class='TransportType hide'>" + item.TransportType + "</td>"

                    + "<td class='Code'>" + item.Code + (pDefaults.UnEditableCompanyName == "NEW" && item.VesselID != 0 ? (" / " + item.VesselName) : "") + "</td>"
                    + "<td class='Quotation " + (IsMESCOCompany ? '' : 'hide') + "' val='" + item.QuotationID + "'>" + (item.QuotationCode == 0 ? "" : item.QuotationCode) + "</td>"
                    + "<td class='Salesman " + (pDefaults.UnEditableCompanyName == "NIL" ? "" : " hide ") + "' val='" + item.SalesmanID + "'>" + item.Salesman + "</td>"
                    + "<td class='Notes " + (pDefaults.UnEditableCompanyName == "NAJ" ? '' : 'hide') + "' val='" + "'>" + (item.OperationNotes == 0 ? "" : item.OperationNotes) + "</td>"
                    + "<td class='BusinessUnit " + (pDefaults.UnEditableCompanyName == "NAJ" ? '' : 'hide') + "' val='" + "'>" + (item.BusinessUnit == 0 ? "" : item.BusinessUnit) + "</td>"
                    + "<td class='AgentName " + (pDefaults.UnEditableCompanyName == "NAJ" ? '' : 'hide') + "' val='" + "'>" + (item.AgentName == 0 ? "" : item.AgentName) + "</td>"
                    + "<td class='OperationBookingNumber " + (pDefaults.UnEditableCompanyName == "NAJ" ? '' : 'hide') + "' val='" + "'>" + (item.OperationBookingNumber == 0 ? "" : item.OperationBookingNumber) + "</td>"
                    + "<td class='NumberOfPackages'>" + (item.ContainerTypes == 0 ? (item.PackageTypes == 0 ? "" : item.PackageTypes) : item.ContainerTypes) + "</td>"
                    + "<td class='Routing'>" + (item.POLName + " > " + item.PODName) + "</td>"

                    + "<td class='OperationMan " + (pDefaults.UnEditableCompanyName == "NAJ" ? " hide " : "") + "' val='" + item.OperationManID + "'>" + (item.OperationManName != "0" ? item.OperationManName : "") + "</td>"
                    + "<td class='OpenedBy " + (pDefaults.UnEditableCompanyName == "NAJ" ? " hide " : "") + "' val='" + item.CreatorUserID + "'>" + item.CreatorName + "</td>"
                    + "<td class='shownOpenDate " + (pDefaults.UnEditableCompanyName == "NAJ" ? " hide " : "") + "'>"
                    + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.OpenDate))
                    + "</td>"


                    + "<td class='Carrier' val='" + (item.LineID) + "'>" + (pDefaults.UnEditableCompanyName == "CAP" ? (item.ShippingLineName == 0 ? "" : item.ShippingLineName) : (item.LineName == 0 ? "" : item.LineName)) + "</td>"
                    + "<td class='VesselName'>" + (item.VesselName == 0 ? "" : item.VesselName) + "</td>"
                    + "<td class='VoyageOrTruckNumber'>" + (item.VoyageOrTruckNumber == 0 ? "" : item.VoyageOrTruckNumber) + "</td>"
                    + "<td class='WareHouse'>" + (item.WareHouse == 0 ? "" : item.WareHouse) + "</td>"
                    + "<td class='Client'>" + (item.BookingPartyName != 0 && item.BLType == constMasterBLType ? item.BookingPartyName : (item.ClientName == 0 ? "" : item.ClientName)) + "</td>"
                    + "<td class='UnloadingDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.UnloadingDate)) > 0 ? pDefaults.UnEditableCompanyName == "NAJ" ? ConvertDateFormat(GetFullDateTime_DD_MM_YY(item.UnloadingDate).replaceAll("-", "/")) : (ConvertDateFormat(GetDateWithFormatMDY(item.UnloadingDate))) : "") + "</td>"
                    + "<td class='PODate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PODate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.PODate)) : "") + "</td>"
                    + "<td class='ReleaseDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReleaseDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ReleaseDate)) : "") + "</td>"
                    + "<td class='Form13Date'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.Form13Date)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.Form13Date)) : "") + "</td>"
                    + "<td class='FileAccountingDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FileAccountingDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.FileAccountingDate)) : "") + "</td>"

                    + "<td class='RoutingDates " + (1 == 1 ? "" : "hide") + "'>"
                    + 'ETD:' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpectedDeparture)) < 1 ? "UnSpecified" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedDeparture))) + "<br>"
                    + 'ATD:' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActualDeparture)) < 1 ? "UnSpecified" : ConvertDateFormat(GetDateWithFormatMDY(item.ActualDeparture))) + "<br>"
                    + 'ETA:' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpectedArrival)) < 1 ? "UnSpecified" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedArrival))) + "<br>"
                    + 'ATA:' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActualArrival)) < 1 ? "UnSpecified" : ConvertDateFormat(GetDateWithFormatMDY(item.ActualArrival)))
                    + (pDefaults.UnEditableCompanyName == "MIL" ? ('<br>LoadDate:' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.StuffingDate)) < 1 ? "UnSpecified" : ConvertDateFormat(GetDateWithFormatMDY(item.StuffingDate)))) : "")
                    + "</td>"


                    + "<td class='MasterBL'>" + (item.MasterBL == 0 ? (pDefaults.UnEditableCompanyName == "HON" && item.CourierNotes != "" ? item.CourierNotes : "") : item.MasterBL) + "</td>"
                    + "<td class='HouseBLs'>" + (item.HouseBLs == 0 ? "" : item.HouseBLs) + "</td>"
                    + "<td class='ACIDNumber " + (pDefaults.UnEditableCompanyName == "NAJ" ? " hide " : "") + "'>" + (item.ACIDNumber == 0 ? "" : item.ACIDNumber) + "</td>"

                    + "<td class='OperationStage' val='" + item.OperationStageID + "'>"
                    + (item.OperationStageID == CancelledQuoteAndOperStageID
                        ? item.OperationStageName //cancelled operation
                        : (Date.prototype.compareDates(FormattedTodaysDate, GetDateWithFormatMDY(item.CloseDate)) <= 0
                            ? "CLOSED" //closed operation
                            : item.OperationStageName)
                    ) + "</td>"

                    + "<td class='MoveType " + (pDefaults.UnEditableCompanyName == "ELI" ? " static-text-primary " : " hide ") + " '>" + (item.MoveTypeName == 0 || item.MoveTypeName == undefined ? "" : item.MoveTypeName) + "</td>"
                    + "<td class='TrackingStage " + (1 == 1 ? "" : "hide") + "'>" + (item.TrackingStageName == "0" ? "" : item.TrackingStageName) + "</td>"
                    + "<td class='OperationCopy'>"
                    + "<a href='#' data-toggle='modal' onclick='Operations_FillPrintDocsOutModal(" + item.ID + ");' " + printControlsText + "</a>"
                    + "<a href='#' data-toggle='modal'  onclick='PostToIATA(" + item.ID + "," + (item.BLType == constDirectBLType ? "\"FWB\"" : (item.BLType == constMasterBLType ? "\"FHL\"" : "")) + ");' class='btn btn-xs btn-rounded btn-warning float-right " + (item.TransportType == AirTransportType && (pDefaults.UnEditableCompanyName == "IST" || pDefaults.UnEditableCompanyName == "DGL") ? "" : "hide") + "'> <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>Post To IATA</span></a>"
                    + (OA ? ("<a href='#CopyOperationModal' data-toggle='modal' onclick='Operations_FillCopyOperationModal(" + item.ID + ");' " + copyControlsText + "</a>") : "")
                    + "<a href='#' onclick='Operations_OpenInNewTab(" + item.ID + ");' " + " class='btn btn-xs btn-rounded btn-primary float-right " + (IsMESCOCompany && !(pLoggedUserSalesmen.includes(item.SalesmanID) && pLoggedUserServices.includes(item.ServiceID)) ? "hide'" : "'") + " > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>Open New Tab</span>" + "</a>"
                    + "</td>"
                    + "</tr>"));
        } else {
            AppendRowtoTable("tblOperations",
                //("<tr ID='" + item.ID + "' ondblclick='SwitchToOperationsEditView(" + item.ID + ");' title='" + (item.InvoiceNumbers == 0 ? "" : ("Invoices:" + item.InvoiceNumbers)) + "' class='font-bold "
                ("<tr ID='" + item.ID + "' " + (IsMESCOCompany && !(pLoggedUserSalesmen.includes(item.SalesmanID) && pLoggedUserServices.includes(item.ServiceID)) ? "" : "ondblclick = 'SwitchToOperationsEditView(" + item.ID + ");'") + " class='font-bold "
                    //+ (item.OperationStageID == CancelledQuoteAndOperStageID
                    //        ? "static-text-danger" //cancelled operation  
                    //        : (item.OperationStageName == "CLOSED" //(Date.prototype.compareDates(FormattedTodaysDate, GetDateWithFormatMDY(item.CloseDate)) <= 0
                    //            ? "static-text-primary" //closed operation
                    //            : "")
                    //)
                    + "' style='" //of class
                    + (pDefaults.UnEditableCompanyName == "MIL"
                        ? (item.OperationStageName == "CLOSED"
                            ? "background-color:cyan;"
                            : (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActualArrival)) > 0
                                ? "background-color:green;"
                                : (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActualDeparture)) > 0
                                    ? "background-color:yellow;"
                                    : ""
                                )
                            )
                        )
                        : (item.OperationStageID == CancelledQuoteAndOperStageID
                            ? "background-color:#e16f67;" //red //cancelled operation
                            : (item.OperationStageName == "CLOSED" //(Date.prototype.compareDates(FormattedTodaysDate, GetDateWithFormatMDY(item.CloseDate)) <= 0
                                ? "background-color:#67e167;" //green //closed operation
                                : "")
                        )
                    )
                    + "' title='" + (item.ShipperName == "0" ? "" : "Shipper: " + item.ShipperName) + "\n" + (item.ConsigneeName == "0" ? "" : "Consignee: " + item.ConsigneeName) + "\n" + (item.Consignee2Name == "0" ? "" : "Consignee2: " + item.Consignee2Name) + "'>"//of tr
                    //+ "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    //+ "<td class='ID '> <input type='checkbox' value='" + item.ID + "' " + (item.MasterOperationID == 0 && item.NumberOfHousesConnected == 0 ? "name='Delete'" : " disabled ") + " /></td>"
                    + "<td class='QuotationID hide' val='" + item.QuotationID + "'>" + item.QuotationID + "</td>"
                    ////BLType : 1-Direct 2-House 3-Master
                    //+ "<td class='BLType hide'>" + item.RepBLTypeShown + "</td>"
                    + "<td class='shownBLTypeIconName hide'><i class= 'fa " + item.BLTypeIconName + " " + item.BLTypeIconStyle + " fa-2x'/></td>"
                    //+ "<td class='BLTypeIconName hide'>" + item.BLTypeIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                    //+ "<td class='BLTypeIconStyle hide'>" + item.BLTypeIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                    ////DirectionType : 1-Import 2-Export 3-Domestic
                    + "<td class='DirectionType hide'>" + item.DirectionType + "</td>"
                    + "<td class='shownDirectionIconName'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-2x'/><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/></td>"

                    + "<td class='TransportType hide'>" + item.TransportType + "</td>"

                    + "<td class='Code'>" + item.Code + (pDefaults.UnEditableCompanyName == "NEW" && item.VesselID != 0 ? (" / " + item.VesselName) : "") + "</td>"
                    + "<td class='Quotation " + (IsMESCOCompany ? '' : 'hide') + "' val='" + item.QuotationID + "'>" + (item.QuotationCode == 0 ? "" : item.QuotationCode) + "</td>"
                    + "<td class='Salesman " + (pDefaults.UnEditableCompanyName == "NIL" ? "" : " hide ") + "' val='" + item.SalesmanID + "'>" + item.Salesman + "</td>"

                    + "<td class='OperationMan' val='" + item.OperationManID + "'>" + (item.OperationManName != "0" ? item.OperationManName : "") + "</td>"
                    + "<td class='OpenedBy' val='" + item.CreatorUserID + "'>" + item.CreatorName + "</td>"
                    //the next line differs from the preceeding one that date could be shown as today, tomorrow, yesterday
                    + "<td class='shownOpenDate'>" //+ "<span class='pull-left thumb-sm  calendar-icon-style'>"
                    //+ " <i class='fa fa-calendar'></i>"
                    //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                    //+ " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.OpenDate)) + "</small>"
                    + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.OpenDate))
                    //+ "</span>"
                    + "</td>"
                    + "<td class='Reference " + (pDefaults.UnEditableCompanyName == "NIL" ? "hide":"")+"'>" + (pDefaults.UnEditableCompanyName == "KDM" ? (item.ReleaseNumber == 0 ? "" : item.ReleaseNumber) : (item.Reference == 0 ? "" : item.Reference)) + "</td>"
                    + "<td class='ServiceType " + (pDefaults.UnEditableCompanyName == "NIL" ? "" : "hide") + "'>" +(item.MoveTypeName == 0 ? "" : item.MoveTypeName) + "</td>"
                    + "<td class='Client'>" + (item.BookingPartyName != 0 && item.BLType == constMasterBLType ? item.BookingPartyName : (item.ClientName == 0 ? "" : item.ClientName)) + "</td>"
                    //+ "<td class='Shipper hide' val='" + item.ShipperID + "'>" + item.ShipperName + "</td>"
                    //+ "<td class='ShipperAddress hide' val='" + item.ShipperAddressID + "'>" + item.ShipperAddressID + "</td>"
                    //+ "<td class='ShipperContact hide' val='" + item.ShipperContactID + "'>" + item.ShipperContactID + "</td>"
                    //+ "<td class='Consignee hide' val='" + item.ConsigneeID + "'>" + item.ConsigneeName + "</td>"
                    //+ "<td class='ConsigneeAddress hide' val='" + item.ConsigneeAddressID + "'>" + item.ConsigneeAddressID + "</td>"
                    //+ "<td class='ConsigneeContact hide' val='" + item.ConsigneeContactID + "'>" + item.ConsigneeContactID + "</td>"
                    //+ "<td class='Agent hide' val='" + item.AgentID + "'>" + item.AgentName + "</td>"
                    //+ "<td class='AgentAddress hide' val='" + item.AgentAddressID + "'>" + item.AgentAddressID + "</td>"
                    //+ "<td class='AgentContact hide' val='" + item.AgentContactID + "'>" + item.AgentContactID + "</td>"
                    //+ "<td class='Carrier  " + (pDefaults.UnEditableCompanyName == "VEN" ? "hide" : "") + "' val='" + (item.TransportType == "1" ? item.ShippingLineID //Ocean
                    //                : (item.TransportType == "2" ? item.AirlineID //Air
                    //                : item.TruckerID) //Inland
                    //                ) //EOF getting the carrier ID val
                    //            + "'>" + (item.TransportType == "1" ? (item.ShippingLineName == 0 ? "" : item.ShippingLineName) //Ocean
                    //            : (item.TransportType == "2" ? (item.AirlineName == 0 ? "" : item.AirlineName)//Air
                    //            : (item.TruckerName == 0 ? "" : item.TruckerName)) //Inland
                    //            )
                    //+ "</td>"

                    //+ "<td class='Carrier' val='" + (item.LineID) + "'>" + (item.LineName == 0 ? "" : item.LineName) + "</td>"
                    + "<td class='Carrier' val='" + (item.LineID) + "'>" + (pDefaults.UnEditableCompanyName == "CAP" ? (item.ShippingLineName == 0 ? "" : item.ShippingLineName) : (item.LineName == 0 ? "" : item.LineName)) + "</td>"
                    + "<td class='Routing'>" + (item.POLName + " > " + item.PODName) + "</td>"
                    //+ "<td class='POL hide' val='" + item.POL + "'>" + item.POLCode + "</td>"
                    //+ "<td class='POD hide' val='" + item.POD + "'>" + item.PODCode + "</td>"
                    //+ "<td class='Incoterm hide' val='" + item.IncotermID + "'>" + item.IncotermName + "</td>"
                    //+ "<td class='OperationPOrC hide' val='" + item.POrC + "'>" + item.POrC + "</td>"
                    //+ "<td class='Commodity hide' val='" + item.CommodityID + "'>" + item.CommoditymName + "</td>"
                    //+ "<td class='TransientTime hide'>" + item.TransientTime + "</td>"
                    //+ "<td class='CloseDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CloseDate)) + "</td>"

                    //ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL
                    //+ "<td class='ShipmentType'>" + GetShipmentType(item.ShipmentType) + " " + GetBLType(item.BLType) + "</td>"
                    + "<td class='ShipmentType'>" + GetShipmentType(item.ShipmentType) + " " + item.RepBLTypeShown + "</td>"
                    //+ "<td class='CutOffDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CutOffDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate))) + "</td>"
                    //+ "<td class='IncludePickup hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludePickup == true ? "true' checked='checked'" : "'") + " /></td>"
                    //+ "<td class='PickupAddress hide' val='" + item.PickupAddressID + "'>" + item.PickupAddressID + "</td>"
                    //+ "<td class='IncludeDelivery hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludeDelivery == true ? "true' checked='checked'" : "'") + " /></td>"
                    //+ "<td class='DeliveryAddress hide' val='" + item.DeliveryAddressID + "'>" + item.DeliveryAddressID + "</td>"

                    //+ "<td class='GrossWeight hide'>" + item.GrossWeight + "</td>"
                    //+ "<td class='Volume hide'>" + item.Volume + "</td>"
                    //+ "<td class='ChargeableWeight hide'>" + item.ChargeableWeight + "</td>" //shown as Wt/Msr(MT) incase of ocean or inland
                    //+ "<td class='IsDangerousGoods hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDangerousGoods == true ? "true' checked='checked'" : "'") + " /></td>"
                    //+ "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"

                    + "<td class='BookingNumbers'>" + (item.BookingNumbers == 0 ? "" : item.BookingNumbers) + "</td>"
                    + "<td class='MasterBL'>" + (item.MasterBL == 0 ? (pDefaults.UnEditableCompanyName == "HON" && item.CourierNotes != "" ? item.CourierNotes : "") : item.MasterBL) + "</td>"
                    + "<td class='HouseBLs'>" + (item.HouseBLs == 0 ? "" : item.HouseBLs) + "</td>"
                    + "<td class='ACIDNumber'>" + (item.ACIDNumber == 0 ? "" : item.ACIDNumber) + "</td>"
                    + "<td class='NumberOfPackages'>" + (item.ContainerTypes == 0 ? (item.PackageTypes == 0 ? "" : item.PackageTypes) : item.ContainerTypes) + "</td>"
                    + "<td class='OperationStage' val='" + item.OperationStageID + "'>"
                    + (item.OperationStageID == CancelledQuoteAndOperStageID
                        ? item.OperationStageName //cancelled operation
                        : (Date.prototype.compareDates(FormattedTodaysDate, GetDateWithFormatMDY(item.CloseDate)) <= 0
                            ? "CLOSED" //closed operation
                            : item.OperationStageName)
                    ) + "</td>"
                    + "<td class='ChassisNumbers " + (pDefaults.UnEditableCompanyName == "EVL" ? " " : " hide ") + " '>" + (item.ChassisNumbers == 0 || item.ChassisNumbers == undefined ? "" : item.ChassisNumbers) + "</td>"
                    //+ "<td class='OperationMan hide' val='" + item.OperationManID + "'>" + item.OperationMan + "</td>"
                    //+ "<td class='AgreedRate hide'>" + (item.AgreedRate == "0" ? "" : item.AgreedRate) + "</td>"
                    //+ "<td class='CustomerReference hide'>" + (item.CustomerReference == "0" ? "" : item.CustomerReference) + "</td>"
                    //+ "<td class='SupplierReference hide'>" + (item.SupplierReference == "0" ? "" : item.SupplierReference) + "</td>"
                    //+ "<td class='PONumber hide'>" + (item.PONumber == "0" ? "" : item.PONumber) + "</td>"
                    //+ "<td class='CertificateNumber hide'>" + (item.CertificateNumber == "0" ? "" : item.CertificateNumber) + "</td>"
                    //+ "<td class='IsAWB hide'> <input type='checkbox' id='cbIsAWB" + item.ID + "' disabled='disabled' " + (item.IsAWB ? " checked='checked' " : "") + " /></td>"
                    //+ "<td class='QuotationRouteID hide' val='" + item.QuotationRouteID + "'>" + (item.QuotationRouteID == 0 ? "" : item.QuotationCode.substr(8, 9)) + "</td>"
                    //+ "<td class='ContainerTypes20 " + (1 == 2 ? "" : "hide") + "'>" + (item.ContainerTypes20 == "0" ? "" : item.ContainerTypes20) + "</td>"
                    //+ "<td class='ContainerTypes40 " + (1 == 2 ? "" : "hide") + "'>" + (item.ContainerTypes40 == "0" ? "" : item.ContainerTypes40) + "</td>"
                    + "<td class='RoutingDates " + (1 == 1 ? "" : "hide") + "'>"
                    + 'ETD:' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpectedDeparture)) < 1 ? "UnSpecified" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedDeparture))) + "<br>"
                    + 'ATD:' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActualDeparture)) < 1 ? "UnSpecified" : ConvertDateFormat(GetDateWithFormatMDY(item.ActualDeparture))) + "<br>"
                    + 'ETA:' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpectedArrival)) < 1 ? "UnSpecified" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedArrival))) + "<br>"
                    + 'ATA:' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActualArrival)) < 1 ? "UnSpecified" : ConvertDateFormat(GetDateWithFormatMDY(item.ActualArrival)))
                    + (pDefaults.UnEditableCompanyName == "MIL" ? ('<br>LoadDate:' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.StuffingDate)) < 1 ? "UnSpecified" : ConvertDateFormat(GetDateWithFormatMDY(item.StuffingDate)))) : "")
                    + "</td>"
                    + "<td class='MoveType " + (pDefaults.UnEditableCompanyName == "ELI" ? " static-text-primary " : " hide ") + " '>" + (item.MoveTypeName == 0 || item.MoveTypeName == undefined ? "" : item.MoveTypeName) + "</td>"
                    + "<td class='TrackingStage " + (1 == 1 ? "" : "hide") + "'>" + (item.TrackingStageName == "0" ? "" : item.TrackingStageName) + "</td>"
                    + "<td class='OperationCopy'>"
                    + "<a href='#' data-toggle='modal' onclick='Operations_FillPrintDocsOutModal(" + item.ID + ");' " + printControlsText + "</a>"
                    + "<a href='#' data-toggle='modal'  onclick='PostToIATA(" + item.ID + "," + (item.BLType == constDirectBLType ? "\"FWB\"" : (item.BLType == constMasterBLType ? "\"FHL\"" : "")) + ");' class='btn btn-xs btn-rounded btn-warning float-right " + (item.TransportType == AirTransportType && (pDefaults.UnEditableCompanyName == "IST" || pDefaults.UnEditableCompanyName == "DGL") ? "" : "hide") + "'> <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>Post To IATA</span></a>"
                    + (OA ? ("<a href='#CopyOperationModal' data-toggle='modal' onclick='Operations_FillCopyOperationModal(" + item.ID + ");' " + copyControlsText + "</a>") : "")
                    + "<a href='#' onclick='Operations_OpenInNewTab(" + item.ID + ");' " + " class='btn btn-xs btn-rounded btn-primary float-right " + (IsMESCOCompany && !(pLoggedUserSalesmen.includes(item.SalesmanID) && pLoggedUserServices.includes(item.ServiceID)) ? "hide'" : "'") + " > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>Open New Tab</span>" + "</a>"
                    + "<button onclick='Tracking_ClearAllControls("+item.ID+");' data-toggle='modal' data-target='#TrackingModal' class='btn btn-xs btn-rounded btn-lightblue float-right " + (pDefaults.UnEditableCompanyName=='SSH'?'':'hide') + "'> <i class='fa fa-plus' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>TrackingStage</span>" + "</button>"
                    + "</td>"
                    + "</tr>"));
        }
    });
    //ApplyPermissions();
    if (!OA) { //(pDefaults.UnEditableCompanyName == "VEN") {
        $("#btn-NewAdd").addClass("hide");
        //$("#btn-NewAddAWB").removeClass("hide");
    }
    if (!OD) {
        $("#btn-NewAddFromQuotation").addClass("hide");
    }
    if (OD) $("#btn-Delete").removeClass("hide"); else $("#btn-Delete").addClass("hide");

    BindAllCheckboxonTable("tblOperations", "ID");//it attaches function to the checkboxes so when all are checked then check cb-checkall too
    CheckAllCheckbox("ID");
    //HighlightText("#tblOperations>tbody>tr", $("#txt-Search").val().trim());
    if (IsMESCOCompany) {
        HighlightText("#tblOperations>tbody>tr", $("#txtFilterQuotation").val().trim());
        HighlightText("#tblOperations>tbody>tr", $("#txtFilterOperationCode").val().trim());
    }
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
        strDeleteFailMessage = "This command is not completed because of dependencies existance."
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
    //FadePageCover(false); //to quickly fade before filters are filled(user psycology)
    //i put FillListWithNames in the LoadView so the value remains unchanged
    ////parameters (pStrFnName, pStrFirstRow, pListName)
    //FillListWithNames("/api/NoAccessQuoteAndOperStages/LoadAll", "ALL STAGES", "ulOperationStages");
}
if (pDefaults.UnEditableCompanyName == "MES") {
    function BLDocuments_BindTableRows(pOperations) {
        ClearAllTableRows("tblOperations");
        $("th.code").addClass("hide");
        $("th.masterbl").addClass("hide");
        $("th.route").addClass("hide");
        $("th.shipment").addClass("hide");
        $("th.vessel").removeClass("hide");
        $("th.ExpectedArrival").removeClass("hide");
        $("th.ActualArrival").removeClass("hide");
        $("th.Sales").removeClass("hide");
        debugger;
        let copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Copy" + "</span>";
        let printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
        let transferControlsText = " class='btn btn-xs btn-rounded btn-info float-right " + (OEDoc ? "" : " hide ") + "' > <i class='fa fa-exchange' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Transfer" + "</span>";
        $.each(pOperations, function (i, item) {
            if (item.HouseParentID == 0) {

                AppendRowtoTable("tblOperations",

                    ("<tr ID='" + item.ID + "' " + ((item.IsHold == false) ? " ondblclick='Shipments_FillControlsFromBLDocuments(" + item.ID + "," + item.MasterOperationID + ");' " : "") + " class='"
                        + (item.OperationStageID == CancelledQuoteAndOperStageID
                            ? "static-text-danger" //cancelled operation
                            : (item.OperationStageName == "CLOSED" //(Date.prototype.compareDates(FormattedTodaysDate, GetDateWithFormatMDY(item.CloseDate)) <= 0
                                ? "static-text-primary" //closed operation
                                : "")
                        )
                        + "'>"//of tr

                        + "<td class='ID2'> <input name='Delete' type='checkbox' " + ((item.IsHold == true) ? " Disabled " : "") + " value='" + item.ID + "' /></td>"

                        + (IsMESCOCompany ? "<td><i class='fa fa-plus' " + ((item.IsHold == false) ? " onclick='ShowHide(" + item.ID + ");' " : "") + "></i></td>" : "")
                        //+ "<td class='ID '> <input type='checkbox' value='" + item.ID + "' " + (item.MasterOperationID == 0 && item.NumberOfHousesConnected == 0 ? "name='Delete'" : " disabled ") + " /></td>"
                        + "<td class='QuotationID hide' val='" + item.QuotationID + "'>" + item.QuotationID + "</td>"
                        + "<td class='MasterOperationID hide' val='" + item.MasterOperationID + "'>" + item.MasterOperationID + "</td>"
                        ////BLType : 1-Direct 2-House 3-Master
                        //+ "<td class='BLType hide'>" + item.RepBLTypeShown + "</td>"
                        //+ "<td class='shownBLTypeIconName hide'><i class= 'fa " + item.BLTypeIconName + " " + item.BLTypeIconStyle + " fa-2x'/></td>"
                        //+ "<td class='BLTypeIconName hide'>" + item.BLTypeIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                        //+ "<td class='BLTypeIconStyle hide'>" + item.BLTypeIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                        ////DirectionType : 1-Import 2-Export 3-Domestic
                        //+ "<td class='DirectionType hide'>" + item.RepDirectionTypeShown + "</td>"
                        //+ "<td class='DirectionType hide'>" + item.DirectionType + "</td>"
                        //+ "<td class='shownDirectionIconName'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-2x'/></td>"
                        + "<td class='shownDirectionIconName'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-2x'/><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/></td>"
                        //+ "<td class='DirectionIconName hide'>" + item.DirectionIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                        //+ "<td class='DirectionIconStyle hide'>" + item.DirectionIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                        ////TransportType : 1-Ocean 2-Air 3-Inland
                        //+ "<td class='TransportType hide'> <input type='text' id='txtTransportType" + item.ID + "' disabled='disabled' value=" + item.TransportType + " /></td>"
                        //+ "<td class='TransportType hide'>" + item.RepTransportTypeShown + "</td>"
                        //+ "<td class='TransportType hide'>" + item.TransportType + "</td>"
                        //+ "<td class='shownTransportIconName' ><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/></td>"
                        //+ "<td class='TransportIconName hide'>" + item.TransportIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                        //+ "<td class='TransportIconStyle hide'>" + item.TransportIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 

                        /*  + "<td class='Code hide'>" + (item.Code == 0 ? item.MasterOperationCode : item.Code) + "</td>"*/
                        + "<td class='Reference'>" + (item.Reference == 0 ? "" : item.Reference) + "</td>"
                        /*  + "<td class='MasterBL hide'>" + (item.MasterBL == 0 ? "" : item.MasterBL) + "</td>"*/
                        + "<td class='HouseNumber'>" + (item.HouseNumber == 0 ? "" : item.HouseNumber) + "</td>"
                        //+ "<td class='OpenedBy " + (1 == 1/*/pDefaults.UnEditableCompanyName == "FRE"*/ ? " hide " : "  ") + "' val='" + item.CreatorUserID + "'>" + item.OpenedBy + "</td>"
                        ////the next line differs from the preceeding one that date could be shown as today, tomorrow, yesterday
                        ////+ "<td class='shownOpenDate hide'>" //+ "<span class='pull-left thumb-sm  calendar-icon-style'>"
                        ////+ " <i class='fa fa-calendar'></i>"
                        ////+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                        ////+ " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.OpenDate)) + "</small>"
                        //+ GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.OpenDate))
                        ////+ "</span>"
                        //+ "</td>"
                        //+ "<td class='OpenDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.OpenDate)) + "</td>"
                        //+ "<td class='Branch' val='" + item.BranchID + "'>" + (item.BranchID == 0 ? "" : item.BranchName) + "</td>"
                        + "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchID + "</td>"
                        //+ "<td class='Reference hide'>" + (pDefaults.UnEditableCompanyName == "KDM" ? (item.ReleaseNumber == 0 ? "" : item.ReleaseNumber) : (item.Reference == 0 ? "" : item.Reference)) + "</td>"
                        //+ "<td class='CodeSerial hide'>" + item.CodeSerial + "</td>"
                        //+ "<td class='Client'>" + (item.BLType == constMasterBLType
                        //                            ? (item.AgentName == 0 ? "" : item.AgentName)
                        //                            : (item.DirectionType == constImportDirectionType ? (item.ConsigneeName == 0 ? "" : item.ConsigneeName) : (item.ShipperName == 0 ? "" : item.ShipperName))) + "</td>"
                        //+ "<td class='Client'>" + (item.ClientName == 0 ? "" : item.ClientName) + "</td>"
                        + "<td class='Client'>" + (item.BookingPartyName != 0 && item.BLType == constMasterBLType ? item.BookingPartyName : (item.ClientName == 0 ? "" : item.ClientName)) + "</td>"
                        //+ "<td class='Shipper hide' val='" + item.ShipperID + "'>" + item.ShipperName + "</td>"
                        //+ "<td class='ShipperAddress hide' val='" + item.ShipperAddressID + "'>" + item.ShipperAddressID + "</td>"
                        //+ "<td class='ShipperContact hide' val='" + item.ShipperContactID + "'>" + item.ShipperContactID + "</td>"
                        //+ "<td class='Consignee hide' val='" + item.ConsigneeID + "'>" + item.ConsigneeName + "</td>"
                        //+ "<td class='ConsigneeAddress hide' val='" + item.ConsigneeAddressID + "'>" + item.ConsigneeAddressID + "</td>"
                        //+ "<td class='ConsigneeContact hide' val='" + item.ConsigneeContactID + "'>" + item.ConsigneeContactID + "</td>"
                        //+ "<td class='Agent hide' val='" + item.AgentID + "'>" + item.AgentName + "</td>"
                        //+ "<td class='AgentAddress hide' val='" + item.AgentAddressID + "'>" + item.AgentAddressID + "</td>"
                        //+ "<td class='AgentContact hide' val='" + item.AgentContactID + "'>" + item.AgentContactID + "</td>"

                        //+ "<td class='Carrier hide' val='" + (item.TransportType == "1" ? item.ShippingLineID //Ocean
                        //    : (item.TransportType == "2" ? item.AirlineID //Air
                        //        : item.TruckerID) //Inland
                        //) //EOF getting the carrier ID val
                        //+ "'>" + (item.TransportType == "1" ? (item.ShippingLineName == 0 ? "" : item.ShippingLineName) //Ocean
                        //    : (item.TransportType == "2" ? (item.AirlineName == 0 ? "" : item.AirlineName)//Air
                        //        : (item.TruckerName == 0 ? "" : item.TruckerName)) //Inland
                        //)
                        //+ "</td>"
                        /* + "<td class='Routing'>" + (item.POLName + " > " + item.PODName) + "</td>"*/
                        //+ "<td class='POL hide' val='" + item.POL + "'>" + item.POLCode + "</td>"
                        //+ "<td class='POD hide' val='" + item.POD + "'>" + item.PODCode + "</td>"
                        //+ "<td class='Incoterm hide' val='" + item.IncotermID + "'>" + item.IncotermName + "</td>"
                        //+ "<td class='OperationPOrC hide' val='" + item.POrC + "'>" + item.POrC + "</td>"
                        //+ "<td class='Commodity hide' val='" + item.CommodityID + "'>" + item.CommoditymName + "</td>"
                        //+ "<td class='TransientTime hide'>" + item.TransientTime + "</td>"
                        //+ "<td class='CloseDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CloseDate)) + "</td>"
                        //ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL
                        //+ "<td class='ShipmentType'>" + GetShipmentType(item.ShipmentType) + " " + GetBLType(item.BLType) + "</td>"
                        /*+ "<td class='ShipmentType'>" + GetShipmentType(item.ShipmentType) + " " + item.RepBLTypeShown + "</td>"*/
                        + "<td class='vessel'>" + (item.VesselName == "" ? "" : item.VesselName) + "</td>"
                        + "<td class='ExpectedArrival'>" + (ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedArrival)) == "01/01/1900" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedArrival))) + "</td>"
                        + "<td class='ActualArrival'>" + (ConvertDateFormat(GetDateWithFormatMDY(item.ActualArrival)) == "01/01/1900" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ActualArrival))) + "</td>"
                        + "<td class='Sales'>" + (item.Salesman == "" ? "" : item.Salesman) + "</td>"


                        //+ "<td class='shownCutOffDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                        //+ " <i class='fa fa-calendar'></i>"
                        ////+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate)) + "</small>"
                        //+ " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CutOffDate)) + "</small>"
                        //+ "</span>"
                        //+ "</td>"
                        //+ "<td class='CutOffDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CutOffDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate))) + "</td>"
                        //+ "<td class='Volume hide'>" + item.Volume + "</td>"
                        //+ "<td class='IncludePickup hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludePickup == true ? "true' checked='checked'" : "'") + " /></td>"
                        //+ "<td class='PickupAddress hide' val='" + item.PickupAddressID + "'>" + item.PickupAddressID + "</td>"
                        //+ "<td class='IncludeDelivery hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludeDelivery == true ? "true' checked='checked'" : "'") + " /></td>"
                        //+ "<td class='DeliveryAddress hide' val='" + item.DeliveryAddressID + "'>" + item.DeliveryAddressID + "</td>"

                        + "<td class='GrossWeight'>" + item.GrossWeight + "</td>"

                        //+ "<td class='Volume hide'>" + item.Volume + "</td>"
                        //+ "<td class='ChargeableWeight hide'>" + item.ChargeableWeight + "</td>" //shown as Wt/Msr(MT) incase of ocean or inland
                        //+ "<td class='IsDangerousGoods hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDangerousGoods == true ? "true' checked='checked'" : "'") + " /></td>"
                        //+ "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                        //+ "<td class='BookingNumbers hide'>" + item.BookingNumbers + "</td>"
                        //+ "<td class='NumberOfPackages hide'>" + (item.ContainerTypes == 0 ? (item.PackageTypes == 0 ? "" : item.PackageTypes) : item.ContainerTypes) + "</td>"
                        //+ "<td class='MoveType " + (1 == 1 ? "hide" : "") + "'>" + (item.MoveTypeCode == 0 ? "" : item.MoveTypeCode) + "</td>"
                        //+ "<td class='OperationStage hide' val='" + item.OperationStageID + "'>"
                        //+ (item.OperationStageID == CancelledQuoteAndOperStageID
                        //    ? item.OperationStageName //cancelled operation
                        //    : (Date.prototype.compareDates(FormattedTodaysDate, GetDateWithFormatMDY(item.CloseDate)) <= 0
                        //        ? "CLOSED" //closed operation
                        //        : item.OperationStageName)
                        //) + "</td>"
                        //+ "<td class='Salesman hide' val='" + item.SalesmanID + "'>" + item.Salesman + "</td>"
                        //+ "<td class='OperationMan hide' val='" + item.OperationManID + "'>" + item.OperationMan + "</td>"
                        //+ "<td class='AgreedRate hide'>" + (item.AgreedRate == "0" ? "" : item.AgreedRate) + "</td>"
                        //+ "<td class='CustomerReference hide'>" + (item.CustomerReference == "0" ? "" : item.CustomerReference) + "</td>"
                        //+ "<td class='SupplierReference hide'>" + (item.SupplierReference == "0" ? "" : item.SupplierReference) + "</td>"
                        //+ "<td class='PONumber hide'>" + (item.PONumber == "0" ? "" : item.PONumber) + "</td>"
                        //+ "<td class='CertificateNumber hide'>" + (item.CertificateNumber == "0" ? "" : item.CertificateNumber) + "</td>"
                        //+ "<td class='IsAWB hide'> <input type='checkbox' id='cbIsAWB" + item.ID + "' disabled='disabled' " + (item.IsAWB ? " checked='checked' " : "") + " /></td>"
                        //+ "<td class='QuotationRouteID hide' val='" + item.QuotationRouteID + "'>" + (item.QuotationRouteID == 0 ? "" : item.QuotationCode.substr(8, 9)) + "</td>"
                        /*      + "<td class='AWB " + (pDefaults.UnEditableCompanyName == "VEN" ? "" : "hide") + "'>" + (item.MAWBSuffix == "0" ? "" : item.AirlinePrefix + ">" + item.MAWBSuffix) + "</td>"*/
                        //+ "<td class='hide'><a onclick='SwitchToOperationsEditView(" + item.ID + ");' " + editControlsText + "</a></td>"
                        + "<td class='InvoiceNumbers' style='white-space:pre-wrap; word-wrap:break-word'>" + (item.InvoiceNumbers == 0 ? "" : item.InvoiceNumbers) + "</td>"
                        //+ "<td class='ContainerTypes20 hide'>" + (item.ContainerTypes20 == "0" ? "" : item.ContainerTypes20) + "</td>"
                        //+ "<td class='ContainerTypes40 hide'>" + (item.ContainerTypes40 == "0" ? "" : item.ContainerTypes40) + "</td>"

                        + "<td class='WarehouseName hide' val='" + item.WarehouseID + "'>" + (item.WarehouseName == 0 ? "N/A" : item.WarehouseName) + "</td>"
                        + "<td class='EntryDate hide'>" + (ConvertDateFormat(GetDateWithFormatMDY(item.EntryDate)) == "01/01/1900" ? "N/A" : ConvertDateFormat(GetDateWithFormatMDY(item.EntryDate))) + "</td>"
                        + "<td class='DeliveryDate hide'>" + (ConvertDateFormat(GetDateWithFormatMDY(item.DeliveryDate)) == "01/01/1900" ? "N/A" : ConvertDateFormat(GetDateWithFormatMDY(item.DeliveryDate))) + "</td>"
                        + "<td class='DeliveryNumber hide'>" + (item.DeliveryNumber == 0 ? "N/A" : item.DeliveryNumber) + "</td>"
                        + "<td class='RoadNumber hide'>" + (item.RoadNumber == 0 ? "N/A" : item.RoadNumber) + "</td>"
                        + "<td class='Representative hide'>" + (item.Representative == 0 ? "N/A" : item.Representative) + "</td>"
                        + "<td class='ConsigneeName hide'>" + (item.ConsigneeName == 0 ? "N/A" : item.ConsigneeName) + "</td>"

                        //nour06112023
                        + "<td class='IsHold'> <input type='checkbox' disabled='disabled' val='" + (item.IsHold == true ? "true' checked='checked'" : "'") + " /></td>"
                        + "<td class='HoldReason'>" + (item.HoldReason == 0 || !item.IsHold ? "" : item.HoldReason) + "</td>"
                        + "<td class='HoldUserName'>" + (item.HoldUserName == 0 || !item.IsHold ? "" : item.HoldUserName) + "</td>"


                        + (glbCallingControl != "TransferHouse" && item.IsHold == false ? ("<a href='#' data-toggle='modal' onclick='Operations_FillPrintDocsOutModal(" + item.ID + ");' " + printControlsText + "</a>") : "")
                        + (glbCallingControl == "TransferHouse" ? ("<a href='#' data-toggle='modal' onclick='Operations_FillTransferHouseModal(" + item.ID + ");' " + transferControlsText + "</a>") : "")
                        //+ "<a href='#CopyOperationModal' data-toggle='modal' onclick='Operations_FillCopyOperationModal(" + item.ID + ");' " + copyControlsText + "</a>"
                        + "</td>"
                        + "</tr>"));
                let timer = 0;
                $("#tblOperations tbody tr").each(function (index, item) {
                    let ItemID = $(this).attr("id");
                    const offset = 75;
                    $(item).mouseover(function (event) {
                        timer = setTimeout(() => {
                            const { pageX, pageY } = event;
                            $("#HouseStorageData").css({
                                left: `${pageX - 2 * offset}px`,
                                top: `${pageY - offset}px`
                            });
                            let houseStorageDataHTML = "<b>Stored At: </b> " + $(this).find(".WarehouseName").text() + "<br/>"
                                + "<b>Store Date: </b> " + $(this).find(".EntryDate").text() + "<br/>"
                                + "<b>Delivered At: </b> " + $(this).find(".DeliveryDate").text() + "<br/>"
                                + "<b>Delivery No: </b> " + $(this).find(".DeliveryNumber").text() + "<br/>"
                                + "<b>Road No: </b> " + $(this).find(".RoadNumber").text() + "<br/>"
                                + "<b>Representative: </b> " + $(this).find(".Representative").text() + "<br/>"
                                + $(this).find(".ConsigneeName").text();
                            $("#HouseStorageData").html(houseStorageDataHTML);

                            $("#HouseStorageData").removeClass("hide");
                        }, 1000);

                    })

                    $(item).mouseout(function (event) {
                        $("#HouseStorageData").addClass("hide");
                        clearTimeout(timer);
                        timer = 0;
                    })
                })

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
                    '<th>Hold Status</th>' +
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
                                + "<td class='Reference'>" + (item.Reference == 0 ? "" : item.Reference) + "</td>"
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
                                + "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchID + "</td>"
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
                                + "<td class='ShipmentType'>" + GetShipmentType(item.ShipmentType) + " " + item.RepBLTypeShown + "</td>"
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

        ///ApplyPermissions();
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
    }
}
else {
    function BLDocuments_BindTableRows(pOperations) {
        ClearAllTableRows("tblOperations");
        debugger;
        if (pDefaults.UnEditableCompanyName == "UNF") {
            $("#CreateDebitInvoices").addClass("hide");
            $("th.HoldStatus").addClass("hide");
            $("th.HoldReason").addClass("hide");
            $("th.HoldUser").addClass("hide");
            $("th.ExpectedArrival").removeClass("hide");
            $("th.ActualArrival").removeClass("hide");
            $(".classShowForUNF").removeClass("hide");
        }
        let copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Copy" + "</span>";
        let printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
        let transferControlsText = " class='btn btn-xs btn-rounded btn-info float-right " + (OEDoc ? "" : " hide ") + "' > <i class='fa fa-exchange' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Transfer" + "</span>";
        $.each(pOperations, function (i, item) {
            if (0 == 0) {


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
                        //+ "<td class='ID '> <input type='checkbox' value='" + item.ID + "' " + (item.MasterOperationID == 0 && item.NumberOfHousesConnected == 0 ? "name='Delete'" : " disabled ") + " /></td>"
                        + "<td class='QuotationID hide' val='" + item.QuotationID + "'>" + item.QuotationID + "</td>"
                        + "<td class='MasterOperationID hide' val='" + item.MasterOperationID + "'>" + item.MasterOperationID + "</td>"
                        ////BLType : 1-Direct 2-House 3-Master
                        //+ "<td class='BLType hide'>" + item.RepBLTypeShown + "</td>"
                        //+ "<td class='shownBLTypeIconName hide'><i class= 'fa " + item.BLTypeIconName + " " + item.BLTypeIconStyle + " fa-2x'/></td>"
                        //+ "<td class='BLTypeIconName hide'>" + item.BLTypeIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                        //+ "<td class='BLTypeIconStyle hide'>" + item.BLTypeIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                        ////DirectionType : 1-Import 2-Export 3-Domestic
                        //+ "<td class='DirectionType hide'>" + item.RepDirectionTypeShown + "</td>"
                        //+ "<td class='DirectionType hide'>" + item.DirectionType + "</td>"
                        //+ "<td class='shownDirectionIconName'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-2x'/></td>"
                        + "<td class='shownDirectionIconName'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-2x'/><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/></td>"
                        //+ "<td class='DirectionIconName hide'>" + item.DirectionIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                        //+ "<td class='DirectionIconStyle hide'>" + item.DirectionIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                        ////TransportType : 1-Ocean 2-Air 3-Inland
                        //+ "<td class='TransportType hide'> <input type='text' id='txtTransportType" + item.ID + "' disabled='disabled' value=" + item.TransportType + " /></td>"
                        //+ "<td class='TransportType hide'>" + item.RepTransportTypeShown + "</td>"
                        //+ "<td class='TransportType hide'>" + item.TransportType + "</td>"
                        //+ "<td class='shownTransportIconName' ><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/></td>"
                        //+ "<td class='TransportIconName hide'>" + item.TransportIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                        //+ "<td class='TransportIconStyle hide'>" + item.TransportIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 

                        + "<td class='Code'>" + (item.Code == 0 ? item.MasterOperationCode : item.Code) + "</td>"
                        + "<td class='Reference'>" + (item.Reference == 0 ? "" : item.Reference) + "</td>"
                        + "<td class='MasterBL'>" + (item.MasterBL == 0 ? "" : item.MasterBL) + "</td>"
                        + "<td class='HouseNumber'>" + (item.HouseNumber == 0 ? "" : item.HouseNumber) + "</td>"
                        + "<td class='CertificationNumber hide'>" + (item.CertificationNumber == 0 ? "" : item.CertificationNumber) + "</td>"
                        + "<td class='EntryDate hide'>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.EntryDate)) + "</td>"
                        + "<td class='RoadNumber hide'>" + (item.RoadNumber == 0 ? "" : item.RoadNumber) + "</td>"

                        //+ "<td class='OpenedBy " + (1 == 1/*/pDefaults.UnEditableCompanyName == "FRE"*/ ? " hide " : "  ") + "' val='" + item.CreatorUserID + "'>" + item.OpenedBy + "</td>"
                        ////the next line differs from the preceeding one that date could be shown as today, tomorrow, yesterday
                        ////+ "<td class='shownOpenDate hide'>" //+ "<span class='pull-left thumb-sm  calendar-icon-style'>"
                        ////+ " <i class='fa fa-calendar'></i>"
                        ////+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                        ////+ " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.OpenDate)) + "</small>"
                        //+ GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.OpenDate))
                        ////+ "</span>"
                        //+ "</td>"
                        //+ "<td class='OpenDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.OpenDate)) + "</td>"
                        //+ "<td class='Branch' val='" + item.BranchID + "'>" + (item.BranchID == 0 ? "" : item.BranchName) + "</td>"
                        + "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchID + "</td>"
                        //+ "<td class='Reference hide'>" + (pDefaults.UnEditableCompanyName == "KDM" ? (item.ReleaseNumber == 0 ? "" : item.ReleaseNumber) : (item.Reference == 0 ? "" : item.Reference)) + "</td>"
                        //+ "<td class='CodeSerial hide'>" + item.CodeSerial + "</td>"
                        //+ "<td class='Client'>" + (item.BLType == constMasterBLType
                        //                            ? (item.AgentName == 0 ? "" : item.AgentName)
                        //                            : (item.DirectionType == constImportDirectionType ? (item.ConsigneeName == 0 ? "" : item.ConsigneeName) : (item.ShipperName == 0 ? "" : item.ShipperName))) + "</td>"
                        //+ "<td class='Client'>" + (item.ClientName == 0 ? "" : item.ClientName) + "</td>"
                        + "<td class='Client'>" + (item.BookingPartyName != 0 && item.BLType == constMasterBLType ? item.BookingPartyName : (item.ClientName == 0 ? "" : item.ClientName)) + "</td>"
                        //+ "<td class='Shipper hide' val='" + item.ShipperID + "'>" + item.ShipperName + "</td>"
                        //+ "<td class='ShipperAddress hide' val='" + item.ShipperAddressID + "'>" + item.ShipperAddressID + "</td>"
                        //+ "<td class='ShipperContact hide' val='" + item.ShipperContactID + "'>" + item.ShipperContactID + "</td>"
                        //+ "<td class='Consignee hide' val='" + item.ConsigneeID + "'>" + item.ConsigneeName + "</td>"
                        //+ "<td class='ConsigneeAddress hide' val='" + item.ConsigneeAddressID + "'>" + item.ConsigneeAddressID + "</td>"
                        //+ "<td class='ConsigneeContact hide' val='" + item.ConsigneeContactID + "'>" + item.ConsigneeContactID + "</td>"
                        //+ "<td class='Agent hide' val='" + item.AgentID + "'>" + item.AgentName + "</td>"
                        //+ "<td class='AgentAddress hide' val='" + item.AgentAddressID + "'>" + item.AgentAddressID + "</td>"
                        //+ "<td class='AgentContact hide' val='" + item.AgentContactID + "'>" + item.AgentContactID + "</td>"

                        //+ "<td class='Carrier hide' val='" + (item.TransportType == "1" ? item.ShippingLineID //Ocean
                        //    : (item.TransportType == "2" ? item.AirlineID //Air
                        //        : item.TruckerID) //Inland
                        //) //EOF getting the carrier ID val
                        //+ "'>" + (item.TransportType == "1" ? (item.ShippingLineName == 0 ? "" : item.ShippingLineName) //Ocean
                        //    : (item.TransportType == "2" ? (item.AirlineName == 0 ? "" : item.AirlineName)//Air
                        //        : (item.TruckerName == 0 ? "" : item.TruckerName)) //Inland
                        //)
                        //+ "</td>"
                        + "<td class='Routing'>" + (item.POLName + " > " + item.PODName) + "</td>"
                        //+ "<td class='POL hide' val='" + item.POL + "'>" + item.POLCode + "</td>"
                        //+ "<td class='POD hide' val='" + item.POD + "'>" + item.PODCode + "</td>"
                        //+ "<td class='Incoterm hide' val='" + item.IncotermID + "'>" + item.IncotermName + "</td>"
                        //+ "<td class='OperationPOrC hide' val='" + item.POrC + "'>" + item.POrC + "</td>"
                        //+ "<td class='Commodity hide' val='" + item.CommodityID + "'>" + item.CommoditymName + "</td>"
                        //+ "<td class='TransientTime hide'>" + item.TransientTime + "</td>"
                        //+ "<td class='CloseDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CloseDate)) + "</td>"
                        //ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL
                        //+ "<td class='ShipmentType'>" + GetShipmentType(item.ShipmentType) + " " + GetBLType(item.BLType) + "</td>"
                        + "<td class='ShipmentType'>" + GetShipmentType(item.ShipmentType) + " " + item.RepBLTypeShown + "</td>"

                        + (pDefaults.UnEditableCompanyName == "UNF" ? ("<td class='ExpectedArrival'>" + (ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedArrival)) == "01/01/1900" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedArrival))) + "</td>") : "")
                        + (pDefaults.UnEditableCompanyName == "UNF" ? ("<td class='ActualArrival'>" + (ConvertDateFormat(GetDateWithFormatMDY(item.ActualArrival)) == "01/01/1900" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ActualArrival))) + "</td>") : "")

                        //+ "<td class='shownCutOffDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                        //+ " <i class='fa fa-calendar'></i>"
                        ////+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate)) + "</small>"
                        //+ " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CutOffDate)) + "</small>"
                        //+ "</span>"
                        //+ "</td>"
                        //+ "<td class='CutOffDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CutOffDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate))) + "</td>"
                        //+ "<td class='Volume hide'>" + item.Volume + "</td>"
                        //+ "<td class='IncludePickup hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludePickup == true ? "true' checked='checked'" : "'") + " /></td>"
                        //+ "<td class='PickupAddress hide' val='" + item.PickupAddressID + "'>" + item.PickupAddressID + "</td>"
                        //+ "<td class='IncludeDelivery hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludeDelivery == true ? "true' checked='checked'" : "'") + " /></td>"
                        //+ "<td class='DeliveryAddress hide' val='" + item.DeliveryAddressID + "'>" + item.DeliveryAddressID + "</td>"

                        + "<td class='GrossWeight'>" + item.GrossWeight + "</td>"
                        //+ "<td class='Volume hide'>" + item.Volume + "</td>"
                        //+ "<td class='ChargeableWeight hide'>" + item.ChargeableWeight + "</td>" //shown as Wt/Msr(MT) incase of ocean or inland
                        //+ "<td class='IsDangerousGoods hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDangerousGoods == true ? "true' checked='checked'" : "'") + " /></td>"
                        //+ "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                        //+ "<td class='BookingNumbers hide'>" + item.BookingNumbers + "</td>"
                        //+ "<td class='NumberOfPackages hide'>" + (item.ContainerTypes == 0 ? (item.PackageTypes == 0 ? "" : item.PackageTypes) : item.ContainerTypes) + "</td>"
                        //+ "<td class='MoveType " + (1 == 1 ? "hide" : "") + "'>" + (item.MoveTypeCode == 0 ? "" : item.MoveTypeCode) + "</td>"
                        //+ "<td class='OperationStage hide' val='" + item.OperationStageID + "'>"
                        //+ (item.OperationStageID == CancelledQuoteAndOperStageID
                        //    ? item.OperationStageName //cancelled operation
                        //    : (Date.prototype.compareDates(FormattedTodaysDate, GetDateWithFormatMDY(item.CloseDate)) <= 0
                        //        ? "CLOSED" //closed operation
                        //        : item.OperationStageName)
                        //) + "</td>"
                        //+ "<td class='Salesman hide' val='" + item.SalesmanID + "'>" + item.Salesman + "</td>"
                        //+ "<td class='OperationMan hide' val='" + item.OperationManID + "'>" + item.OperationMan + "</td>"
                        //+ "<td class='AgreedRate hide'>" + (item.AgreedRate == "0" ? "" : item.AgreedRate) + "</td>"
                        //+ "<td class='CustomerReference hide'>" + (item.CustomerReference == "0" ? "" : item.CustomerReference) + "</td>"
                        //+ "<td class='SupplierReference hide'>" + (item.SupplierReference == "0" ? "" : item.SupplierReference) + "</td>"
                        //+ "<td class='PONumber hide'>" + (item.PONumber == "0" ? "" : item.PONumber) + "</td>"
                        //+ "<td class='CertificateNumber hide'>" + (item.CertificateNumber == "0" ? "" : item.CertificateNumber) + "</td>"
                        //+ "<td class='IsAWB hide'> <input type='checkbox' id='cbIsAWB" + item.ID + "' disabled='disabled' " + (item.IsAWB ? " checked='checked' " : "") + " /></td>"
                        //+ "<td class='QuotationRouteID hide' val='" + item.QuotationRouteID + "'>" + (item.QuotationRouteID == 0 ? "" : item.QuotationCode.substr(8, 9)) + "</td>"
                        + "<td class='AWB " + (pDefaults.UnEditableCompanyName == "VEN" ? "" : "hide") + "'>" + (item.MAWBSuffix == "0" ? "" : item.AirlinePrefix + ">" + item.MAWBSuffix) + "</td>"
                        //+ "<td class='hide'><a onclick='SwitchToOperationsEditView(" + item.ID + ");' " + editControlsText + "</a></td>"
                        + "<td class='InvoiceNumbers' style='white-space:pre-wrap; word-wrap:break-word'>" + (item.InvoiceNumbers == 0 ? "" : item.InvoiceNumbers) + "</td>"
                        + "<td class='WareHouseID' val='" + item.WarehouseID + "'>" + item.WarehouseName + "</td>"
                        + "<td class='StoringDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.EntryDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.EntryDate))) + "</td>"
                        + "<td class='ReleaseDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReleasingDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReleasingDate))) + "</td>"
                        + "<td class='DODate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.DliveryOrderDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.DliveryOrderDate))) + "</td>"

                        + "<td class='RLDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReleaseOrderDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReleaseOrderDate))) + "</td>"
                        + "<td class='HouseContainerNumber hide'>" + (item.HouseContainerNumber == 0 ? item.ContainerNumber.toUpperCase() : item.HouseContainerNumber.toUpperCase()) + "</td>"
                        + "<td  class='THCInvPaymentDate hide' colspan='12' >" + (Date.prototype.compareDates("01/01/1970", GetDateWithFormatMDY(item.THCInvPaymentDate)) < 1 ? "" : item.THCInvPaymentDate) + "</td>"
                        //+ "<td class='ContainerTypes20 hide'>" + (item.ContainerTypes20 == "0" ? "" : item.ContainerTypes20) + "</td>"
                        //+ "<td class='ContainerTypes40 hide'>" + (item.ContainerTypes40 == "0" ? "" : item.ContainerTypes40) + "</td>"
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
                debugger;
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
                                + "<td class='Reference'>" + (item.Reference == 0 ? "" : item.Reference) + "</td>"
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
                                + "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchID + "</td>"
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
                                + "<td class='ShipmentType'>" + GetShipmentType(item.ShipmentType) + " " + item.RepBLTypeShown + "</td>"
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

        ///ApplyPermissions();
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
            $(".THCInvPaymentDate").removeClass("hide");

        }

    }
}

function Operations_GetFilterWhereClause() {
    debugger;
    let pWhereClause = "WHERE 1=1 " + " \n";
    if (pDefaults.UnEditableCompanyName == "MED") {
        if (pLoggedUser.DepartmentID == 10 || pLoggedUser.DepartmentID == 5) {
            pWhereClause += "AND DirectionType = 1 " + " \n";
        }
        else if (pLoggedUser.DepartmentID == 11 || pLoggedUser.DepartmentID == 13) {
            pWhereClause += "AND DirectionType = 2 " + " \n";
        }

    } 
    if (pDefaults.UnEditableCompanyName == "NIL") {
        if ($("#slFilterBLType").val() != null && $("#slFilterBLType").val() != "" && $("#slFilterBLType").val() != "0")
            pWhereClause += " AND BLType =" + $("#slFilterBLType").val();

    }
    if (pDefaults.UnEditableCompanyName == "EVL") {
        if ($("#txtFilterChassis").val() && $("#txtFilterChassis").val() != "") {
            pWhereClause += "AND ChassisNumbers LIKE N'%" + $("#txtFilterChassis").val().trim() + "%' \n";
        }

    }
    if (glbCallingControl == "BLDocuments") {
        ////pWhereClause += "AND BLType=2 AND MasterOperationID IS NOT NULL" + " \n";
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

    }
    else if (glbCallingControl == "TransferHouse")
        pWhereClause += "AND BLType=2" + " \n";
    else
        pWhereClause += " AND BLType<>2" + " \n";
    let pTransportFilter = "";
    let pDirectionFilter = "";
    let pBLTypeFilter = "";
    let pOperationStageFilter = ($("#ulOperationStages").val() == "" || $("#ulOperationStages option:selected").text() == "" ? "" : " ( OperationStageName=N'" + $("#ulOperationStages option:selected").text() + "')"); //if 0 then all stages

    if (pOperationStageFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pOperationStageFilter;


    if (glbCallingControl == "BLDocuments" && IsMESCOCompany) {


        pWhereClause += " AND ( MasterOperationID in (select id from operations where ShipmentType = 5))";


    }


    if (glbCallingControl == "BLDocuments") {

        if ($("#txtFilterOperationCode").val().trim() != "") {
            pWhereClause += " AND ( MasterOperationCodeSerial=" + $("#txtFilterOperationCode").val().trim();
            pWhereClause += ")";
        }
    }
    else {
        if ($("#txtFilterOperationCode").val().trim() != "") {
            pWhereClause += " AND (CodeSerial=" + $("#txtFilterOperationCode").val().trim();
            pWhereClause += "       OR MasterOperationCodeSerial=" + $("#txtFilterOperationCode").val().trim();
            pWhereClause += ")";
        }

    }

    if ($("#txtFilterNotify").val().trim() != "") {
        pWhereClause += " AND Notify1Name LIKE '%" + $("#txtFilterNotify").val().trim() + "%'";
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



    if (glbCallingControl == "BLDocuments") {

        if ($("#slFilterCustomerService").val() != null && $("#slFilterCustomerService").val() != "")
            pWhereClause += " AND ETAPODAlarmStatus in (select ID from operations where BLType = 2 and MasterOperationID is null and OperationManID = " + $("#slFilterCustomerService").val() + ") And MasterOperationID is not null " ;
    }
    else {

    if ($("#slFilterCustomerService").val() != null && $("#slFilterCustomerService").val() != "")
        pWhereClause += " AND ID in (select MasterOperationID from operations where BLType=2 And OperationManID=" + $("#slFilterCustomerService").val() +")";

    }





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
    if ($("#txtFilterGrossWeight").val().trim() != "" && pWhereClause !== "") {
        if (glbCallingControl == "BLDocuments") {
            pWhereClause += " AND GrossWeightSum = '" + $("#txtFilterGrossWeight").val().trim().toUpperCase() + "' ";
        } else {
            if (pDefaults.UnEditableCompanyName == "UNF")
                pWhereClause += " AND ID IN (select MasterOperationID from operations where MasterOperationID IS NOT NULL AND GrossWeight = " + $("#txtFilterGrossWeight").val().trim() + ") ";
            else
                pWhereClause += " AND GrossWeightSum = '" + $("#txtFilterGrossWeight").val().trim().toUpperCase() + "' ";
        }
    }
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
    //**************************************************************** */
    //if ($("#slFilterTrackingStatage").val() != null && $("#slFilterTrackingStatage").val() != "" && pWhereClause !== "")
    //    pWhereClause += " AND TrackingStageID =" + $("#slFilterTrackingStatage").val();
    //********************************************************************* */
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

    if (IsMESCOCompany) {
        pWhereClause += " AND ServiceID IN (SELECT ServiceID FROM crmUserServices WHERE UserID = " + pLoggedUser.ID + ")"
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
            // if(glbCallingControl == "BLDocuments"){
            pWhereClause += " AND (" + " \n";
            pWhereClause += "       HouseNumber LIKE N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%' ";
            pWhereClause += "       OR ((ISNULL((SELECT COUNT(op.ID) FROM dbo.Operations AS op WHERE dbo.vwOperationsForFilter.ID = op.MasterOperationID AND op.HouseNumber  LIKE N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%'), 0)) > 0)";
            pWhereClause += "     ) \n ";
            //}
            //else{
            //        pWhereClause += " AND (" + " \n";
            //    pWhereClause += "       HouseNumber=N'" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "' ";
            //    pWhereClause += "       OR ((ISNULL((SELECT COUNT(op.ID) FROM dbo.Operations AS op WHERE dbo.vwOperations.ID = op.MasterOperationID AND op.HouseNumber = N'" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "'), 0)) > 0)";
            //    pWhereClause += "     ) \n ";
            //}
        }
        //pWhereClause += " AND (HouseBLs like '%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%' OR HouseNumber LIKE N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%') ";
        ////pWhereClause += " AND HouseNumber=N'" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "' ";
    }
    if ($("#txtFilterBookingNumbers").val().trim() != "" && pWhereClause !== "") {
        if (["ELI", "OAO", "WFE", "MR", "SHS"].includes(pDefaults.UnEditableCompanyName))
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
        pWhereClause += " AND ((ISNULL((SELECT COUNT(OCP.ID) FROM OperationContainersAndPackages AS OCP WHERE dbo.vwOperationsForFilter.ID=OCP.OperationID AND OCP.TankOrFlexiNumber LIKE N'%" + $("#txtFilterFlexi").val().trim().toUpperCase() + "%'), 0)) > 0)";
    }
    if (isValidDate($("#txtFilterLoadingDate").val().trim(), 1)) {
        if ($("#txtFilterLoadingDate").val() != null && $("#txtFilterLoadingDate").val() != "" && pWhereClause !== "")
            pWhereClause += " AND ((ISNULL((SELECT COUNT(o.ID) FROM dbo.Routings AS o WHERE dbo.vwOperationsForFilter.ID = o.OperationID AND CONVERT(DATE , o.StuffingDate) = CONVERT(DATE ,'" + GetDateWithFormatyyyyMMdd($("#txtFilterLoadingDate").val()) + " 00:00:00.000')" + "), 0)) > 0)";
    }

    if ($("#txtFilterTruckerName").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND (TruckerName like N'%" + $("#txtFilterTruckerName").val().trim().toUpperCase() + "%') ";
    }
    if ($("#txtFilterQuotation").val().trim() != "" && pWhereClause !== "" && !IsMESCOCompany && pDefaults.UnEditableCompanyName != "BED") {
        pWhereClause += " AND (QuotationCode like N'%" + $("#txtFilterQuotation").val().trim().toUpperCase() + "%') ";
    }
    if ($("#txtFilterQuotation").val().trim() != "" && pWhereClause !== "" && pDefaults.UnEditableCompanyName == "BED") {
        pWhereClause += "  AND (QuotationID in (select id from vwQuotations where CodeSerial =" + $("#txtFilterQuotation").val().trim().toUpperCase() + "))";
    }
    if ($("#txtFilterQuotation").val().trim() != "" && pWhereClause !== "" && IsMESCOCompany) {
        pWhereClause += " AND ((QuotationCode like N'%" + $("#txtFilterQuotation").val().trim().toUpperCase() + "%') OR (HouseBLs LIKE N'%" + $("#txtFilterQuotation").val().trim().toUpperCase() + "%') ) ";
    }
    if ($("#txtFilterForm13Number").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND (Form13Number=N'" + $("#txtFilterForm13Number").val().trim().toUpperCase() + "') ";
    }
    if ($("#txtFilterACIDNumber").val().trim() != "" && pWhereClause !== "") {
        if (glbCallingControl == "BLDocuments") {
            pWhereClause += " AND ID IN (select ID from Operations where MasterOperationID=(select ID from Operations where ACIDNumber=N'" + $("#txtFilterACIDNumber").val().trim().toUpperCase() + "'))";
        } else {
            pWhereClause += " AND (ACIDNumber=N'" + $("#txtFilterACIDNumber").val().trim().toUpperCase() + "') ";
        }

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

    if (isValidDate($("#txtFilterFromCloseDate").val().trim(), 1)) {
        if ($("#txtFilterFromCloseDate").val() != null && $("#txtFilterFromCloseDate").val() != "" && pWhereClause !== "")
            pWhereClause += " AND CloseDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromCloseDate").val()) + " 00:00:00.000' and YEAR(CloseDate) = YEAR(GETDATE())";
    }
    if (isValidDate($("#txtFilterToCloseDate").val().trim(), 1)) {
        if ($("#txtFilterToCloseDate").val() != null && $("#txtFilterToCloseDate").val() != "" && pWhereClause !== "")
            pWhereClause += " AND CloseDate <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToCloseDate").val()) + " 23:59:50.999'";
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
        if (glbCallingControl == "BLDocuments") {
            pWhereClause += " AND (ACIDNumber=N'" + $("#txtFilteraACIDDetails").val().trim().toUpperCase() + "') ";
        } else {


            if (pDefaults.UnEditableCompanyName == "ORI" || pDefaults.UnEditableCompanyName == "BOM") {
                //(select OP.ID from Operations AS O INNER JOIN Operations AS OP ON O.ID = OP.MasterOperationID where OP.ACIDNumber = '12345678955')
                pWhereClause += " AND ID = (select O.ID from Operations AS O INNER JOIN Operations AS OP ON O.ID = OP.MasterOperationID where OP.ACIDNumber = N'" + $("#txtFilteraACIDDetails").val().trim().toUpperCase() + "')";
            } else if (pDefaults.UnEditableCompanyName == "UNF") {
                pWhereClause += "  and ID in (select MasterOperationID from operations where MasterOperationID IS NOT NULL AND ACIDNumber ='" + $("#txtFilteraACIDDetails").val().trim().toUpperCase() + "') ";
            }
            else {
                pWhereClause += " AND ( ID = (select O.ID from  Operations AS O  INNER JOIN Operations AS OP ON O.ID = OP.MasterOperationID WHERE OP.ACIDDetails = N'" + $("#txtFilteraACIDDetails").val().trim().toUpperCase() + "')) ";
            }
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
    if ($("#slFilterTrackingStage").val() != "" && $("#slFilterTrackingStage").val() != null) {
        pWhereClause += " AND ID IN (select OperationID from OperationTracking where TrackingStageID=" + $("#slFilterTrackingStage").val() + ") ";
    }
    /*****************Side Controls***************************/
    if (isValidDate($("#txtFilterFromUnloadingDate").val().trim(), 1)) {

        if ($("#txtFilterFromUnloadingDate").val() != null && $("#txtFilterFromUnloadingDate").val() != "") {
            if (pDefaults.UnEditableCompanyName == "NAJ")
                pWhereClause += " AND ID IN (select ID from Operations where DOPrintedON >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromUnloadingDate").val()) + " 00:00:00.000')";
            else
                pWhereClause += " AND ID IN (select OperationID from Routings where UnloadingDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromUnloadingDate").val()) + " 00:00:00.000')";
        }
    }
    if (isValidDate($("#txtFilterToUnloadingDate").val().trim(), 1)) {

        if ($("#txtFilterToUnloadingDate").val() != null && $("#txtFilterToUnloadingDate").val() != "") {
            if (pDefaults.UnEditableCompanyName == "NAJ")
                pWhereClause += " AND ID IN (select ID from Operations where DOPrintedON < '" + GetDateWithFormatyyyyMMdd($("#txtFilterToUnloadingDate").val()) + " 23:59:50.999')";
            else
                pWhereClause += " AND ID IN (select OperationID from Routings where UnloadingDate < '" + GetDateWithFormatyyyyMMdd($("#txtFilterToUnloadingDate").val()) + " 23:59:50.999')";

        }
    }

    pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause);
    return pWhereClause;
}
function Operations_GetFilterWhereClause_Routings() {
    debugger;
    let pWhereClause = "WHERE 1=1 ";
    if ($("#txtFilterBookingNumbers").val().trim() != "" && pWhereClause !== "")
        pWhereClause += " AND (BookingNumber like '%" + $("#txtFilterBookingNumbers").val().trim().toUpperCase() + "%') ";

    return pWhereClause == "WHERE 1=1 " ? "0" : pWhereClause;
}
function Operations_LoadingWithPaging() {
    debugger;
    Operations_SaveFilters();//incase of returning from operations edit
    let pWhereClause = Operations_GetFilterWhereClause();
    let pWhereClause_Routings = "0";
    pWhereClause_Routings = Operations_GetFilterWhereClause_Routings();
    let pOrderBy = " ID DESC ";
    let pControllerParameters = {
        pIsLoadArrayOfObjects: false
        , pPageNumber: 1
        , pPageSize: $("#select-page-size option:selected").text()
        , pWhereClause: pWhereClause
        , pIsBindTableRows: false
        , pWhereClause_Routings: pWhereClause_Routings
        , pOrderBy: pOrderBy
        , pCallingControl: glbCallingControl//"OperationsManagement_BindTableRows"
    }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "api/Operations/LoadWithWhereClause", pWhereClause, "ID DESC", 1, 10, pControllerParameters
        , function (pData) {
            if (glbCallingControl == "BLDocuments" || glbCallingControl == "TransferHouse")
                BLDocuments_BindTableRows(JSON.parse(pData[0]));
            else
                OperationsManagement_BindTableRows(JSON.parse(pData[0]));
        });
    //HighlightText("#tblOperations>tbody>tr", $("#txt-Search").val().trim());
}
function Operations_Insert(pSaveandAddNew, pIsShipment, callback, pIsAWB) { //pIsShipment: is true if this fn is called from adding new house op from consolidation
    debugger;
    if (pIsShipment) {
        if ($("#btnSaveShipment").prop("disabled") == true)
            return;
        $("#btnSaveShipment").attr("disabled", true);

        var pCallerCallback = callback;
        callback = function (pData) {
            $("#btnSaveShipment").attr("disabled", false);
            if (pCallerCallback != null && pCallerCallback != undefined)
                pCallerCallback(pData);
        };
    }
    var HouseNumber = $("#txtShipmentHouseNumber").val()
    CallGETFunctionWithParameters("api/Operations/checkHouseNumber", { HouseNumber: HouseNumber, pShipmentID: 0 }, function (pData) {
        if (pData == true) {
            swal("Sorry", "This house number already exists.");
            if (pIsShipment)
                $("#btnSaveShipment").attr("disabled", false);
        }
        else {
            if (pDefaults.UnEditableCompanyName == "BOM") {


                let pWhereClause = "WHERE 1=1 " + " \n"; pWhereClause += " AND (ACIDNumber=N'" + $("#txtShipmentACIDNumber").val().trim().toUpperCase() + "') ";
                let pWhereClause_Routings = "0";
                pWhereClause_Routings = "0";
                let pOrderBy = " ID DESC ";
                let pParametersWithValues = {
                    pIsLoadArrayOfObjects: false
                    , pPageNumber: 1
                    , pPageSize: '10'
                    , pWhereClause: pWhereClause
                    , pIsBindTableRows: false
                    , pWhereClause_Routings: pWhereClause_Routings
                    , pOrderBy: pOrderBy
                    , pCallingControl: "OperationsManagement_BindTableRows"
                }
                CallGETFunctionWithParameters("api/Operations/LoadWithWhereClause", pParametersWithValues, function (pData) {

                    $.each((JSON.parse(pData[0])), function (i, item) {
                        ACIDCOUNT += 1;

                    });

                }, null, false/*Default true*/);



            }


            if (IsMESCOCompany) {
                let canCreateOp = true;
                let operation = "";
                CallGETFunctionWithParameters("/api/Operations/CheckLastMonthOperations", null, function (pData) {
                    if (!pData[0]) {
                        canCreateOp = true;
                        operation = JSON.parse(pData[1]).map(item => item.Code).join("||");
                    }
                }, null, false);
                if (!canCreateOp) {
                    swal("Sorry", "Please Check last month Operations have no uninvoiced receivables. \nCheck Operations->" + operation);
                    return;
                }
            }
            if ((pDefaults.UnEditableCompanyName == "UNF" && $('#txtShipmentACIDNumber').val() != "" && $('#txtShipmentACIDNumber').val() != null && $('#txtShipmentACIDNumber').val() != undefined && $('#txtShipmentACIDNumber').val().length != 19) || isNaN($('#txtShipmentACIDNumber').val())) {
                swal("Sorry", "Acid must be 19 Numbers Excatly.");
                return;
            } else if (pDefaults.UnEditableCompanyName == "BOM" && ACIDCOUNT > 0) {
                swal("Sorry", "ACID must be unique.");
                $("#btnSaveOperation").removeAttr("disabled", "disabled");
                ACIDCOUNT = 0;
            }
            //var varExpirationDate = ($("#txtOperationCutOffDate").val().trim() == "" ? "" : $("#txtOperationCutOffDate").val().trim());
            //if (!isValidDate($("#txtOperationOpenDate").val().trim(), 1) || !isValidDate(varExpirationDate, 1))
            $(".validation-error").removeClass("validation-error");
            FadePageCover(true);
            if (pDefaults.UnEditableCompanyName == "FEL" && $("#slAgents").val() == "")
                swal("Sorry", "Please, select agent.");

            if (pDefaults.UnEditableCompanyName == "EVL" && $('#cbIsInland').prop('checked') && $('#slOperationMoveTypes').val() == 1) {
                $('.showForEVLInland input').attr('data-required', 'true');
                $('.hideForEVLInland select').attr('data-required', 'false');
            } else {
                $('.hideForEVLInland input').attr('data-required', 'false');
                $('.hideForEVLInland select').attr('data-required', 'true');
            }
            if (!isValidDate($("#txtOperationOpenDate").val().trim(), 1)) {
                swal(strSorry, strCheckDates);
                FadePageCover(false);
            }
            //else
            //    if (Date.prototype.compareDates(FormattedTodaysDate, ConvertDateFormat($("#txtOperationOpenDate").val().trim())) < 0)
            //        swal(strSorry, "Check the open date.");
            else if (Date.prototype.compareDates(ConvertDateFormat($("#txtOperationOpenDate").val().trim()), ConvertDateFormat($("#txtOperationCloseDate").val().trim())) <= 0) {
                swal(strSorry, "Close date must be after open date.");
                FadePageCover(false);
            }
            //else if (!isValidDate($("#txtOperationCutOffDate").val().trim(), 1) && $("#txtOperationCutOffDate").val().trim() != "")
            //    swal("Sorry", "Please, Check Cut Off Date.");
            else if (isValidDate($("#txtOperationExpectedDeparture").val().trim(), 1) && isValidDate($("#txtOperationExpectedArrival").val().trim(), 1)
                && Date.prototype.compareDates(ConvertDateFormat($("#txtOperationExpectedDeparture").val().trim()), ConvertDateFormat($("#txtOperationExpectedArrival").val().trim())) < 0) {
                swal(strSorry, "ETA must be after ETD date.");
                FadePageCover(false);
            }
            else if ($('#slPOL option:selected').val() == $('#slPOD option:selected').val() && $('#slPOL option:selected').val() != "" && $('#slPOL option:selected').val() != undefined && !$("#cbIsDomestic").prop("checked")) {//check different ports
                swal(strSorry, strPOLEqualPODWarning);
                FadePageCover(false);
            }
            //check Domestic with POLCountry = PODCountry
            else if ($('input[name=cbDirectionType]:checked').val() == 3 && $('#slPOLCountries option:selected').val() != $('#slPODCountries option:selected').val() && $('#slPOLCountries option:selected').val() != undefined) {
                swal(strSorry, strDomesticWithDifferentCountriesWarning);
                FadePageCover(false);
            }
            //    //check import or export with different countries
            //else if ($('input[name=cbDirectionType]:checked').val() != 3 && $('#slPOLCountries option:selected').val() == $('#slPODCountries option:selected').val() && $('#slPOLCountries option:selected').val() != "" && $('#slPOLCountries option:selected').val() != undefined) {
            //    swal(strSorry, strImportOrExportWithSameCountriesWarning);
            //    FadePageCover(false);
            //}
            else if ($("#txtOperationNumberOfContainers").val() > 50 && $("#txtOperationNumberOfContainers").val() != "") {
                swal("Sorry", "You can not enter more than 50 containers at the first time.");
                FadePageCover(false);
            }
            else if (IsMESCOCompany && pOperationHeader_Global != null && (['CONSOL', 'LCL'].includes(pOperationHeader_Global.ShipmentTypeCode))) {
                debugger;

                if ($('#slCargoPlacedOnContainerMulti').val() == null || $('#slCargoPlacedOnContainerMulti').val()[0] == '') {
                    debugger;
                    swal("Sorry", "Please enter placed on container..");
                    FadePageCover(false);
                } else {
                    debugger;
                    let containersSelected = $('#slCargoPlacedOnContainerMulti').val();
                    let storeLocations = new Set();
                    containersSelected.map(function (item) {
                        storeLocations.add($("#slCargoPlacedOnContainerMulti option[value='" + item + "']").attr('storelocationid'));
                    });
                    if (storeLocations.size != 1) {
                        swal("Sorry", "Please check the warehouses of the containers are the same");
                        FadePageCover(false);
                        $("#btnSaveShipment").attr("disabled", false);
                        return;
                    }
                    var parameters = {
                        //if HouseNumber is not null then its entered manually
                        "pIsShipment": pIsShipment,
                        "pCodeSerial": 0 /*generated automatically*/,
                        //"pCode": "O" + $("#txtOperationOpenDate").val().substring(10, 8) + "-" + GetDirectionType($('input[name=cbDirectionType]:checked').val()).substring(0, 3) + "-"
                        //             + GetTransportType($('input[name=cbTransportType]:checked').val()).substring(0, 2) + "-",
                        "pCode": (pIsShipment || $('input[name=cbBLType]:checked').val() == constHouseBLType)
                            ? "0"
                            : ("O" + $("#txtOperationOpenDate").val().substring(10, 8) + "-" + GetDirectionType($('input[name=cbDirectionType]:checked').val()).substring(0, 3) + "-"
                                + GetTransportType($('input[name=cbTransportType]:checked').val()).substring(0, 2) + "-"),
                        "pHouseNumber": pIsShipment
                            ? ($("#txtShipmentHouseNumber").val().trim().toUpperCase() == "" ? 0 : $("#txtShipmentHouseNumber").val().trim().toUpperCase())
                            : "0",//if "0" then auto generated
                        "pBranchID": $('#slOperationBranch option:selected').val(),
                        "pSalesmanID": $('#slOperationSalesman option:selected').val(),
                        //"pOperationManID": $('#slOperationOperationMan option:selected').val(),

                        "pBLType": pIsShipment ? constHouseBLType : $('input[name=cbBLType]:checked').val(),
                        "pBLTypeIconName": pIsShipment ? HouseIconName : $("#hBLTypeIconName").val(),
                        "pBLTypeIconStyle": pIsShipment ? strHouseIconStyleClassName : $("#hBLTypeIconStyle").val(),

                        "pDirectionType": $('input[name=cbDirectionType]:checked').val(),
                        "pDirectionIconName": $("#hDirectionIconName").val(),
                        "pDirectionIconStyle": $("#hDirectionIconStyle").val(),

                        "pTransportType": $('input[name=cbTransportType]:checked').val(),
                        "pTransportIconName": $("#hTransportIconName").val(),
                        "pTransportIconStyle": $("#hTransportIconStyle").val(),

                        //"pShipmentType": pIsShipment
                        //    ? ($("#cbIsOcean").prop("checked") ? constLCLShipmentType : constLTLShipmentType)/*No air in this case coz air has no consolidation*/
                        //    : ($('input[name=cbTransportType]:checked').val() == AirTransportType ? 0 : $('input[name=cbShipmentType]:checked').val()),
                        "pShipmentType": pIsShipment
                            ? ($("#cbIsOcean").prop("checked") || $("#cbIsInland").prop("checked")
                                ? ($('input[name=cbShipmentType]:checked').val() == constConsolidationShipmentType ? ($("#cbIsOcean").prop("checked") ? constLCLShipmentType : constLTLShipmentType) : $('input[name=cbShipmentType]:checked').val())
                                : 0 //air and house
                            )/*No air in this case coz air has no consolidation*/
                            : ($('input[name=cbTransportType]:checked').val() == AirTransportType ? 0 : $('input[name=cbShipmentType]:checked').val()),
                        "pMasterBL": pIsShipment
                            ? "0"
                            : ($("#txtOperationMasterBL").val().trim() == "" ? "0" : $("#txtOperationMasterBL").val().trim().toUpperCase()),
                        "pShipperID": $('#slShippers option:selected').val() == "" || $('#slShippers option:selected').val() == null || $('#slShippers option:selected').val() == undefined
                            ? 0 : $('#slShippers option:selected').val(),
                        "pShipperAddressID": 0,
                        "pShipperContactID": 0,
                        //"pConsigneeID": (($('#slConsignees option:selected').val() == "" || $('input[name=cbDirectionType]:checked').val() == 2 || $('input[name=cbDirectionType]:checked').val() == 3)
                        "pConsigneeID": $('#slConsignees option:selected').val() == "" || $('#slConsignees option:selected').val() == null || $('#slConsignees option:selected').val() == undefined
                            ? 0 : $('#slConsignees option:selected').val(),
                        "pConsigneeAddressID": 0,
                        "pConsigneeContactID": 0,
                        "pNotifyID": $('#slNotify option:selected').val() == "" || $('#slNotify option:selected').val() == null || $('#slNotify option:selected').val() == undefined
                            ? 0 : $('#slNotify option:selected').val(),
                        "pAgentID": $('#slAgents').val() == "" || $('#slAgents').val() == null
                            ? 0 : $('#slAgents option:selected').val(),
                        "pAgentAddressID": 0,
                        "pAgentContactID": 0,
                        "pIncotermID": pIsShipment ? ($("#slShipmentIncoterm").val() == "" ? 0 : $("#slShipmentIncoterm").val()) : 0,
                        //"pPOrC": pDefaults.UnEditableCompanyName == "CQL" ? 3 : ($("#radIsConfirm1").prop('checked') ? 1 : 3),
                        "pPOrC": pIsShipment
                            ? ($("#slShipmentPOrC").val() == "" ? 0 : $("#slShipmentPOrC").val())
                            : ($("#radIsConfirm1").prop('checked') ? 1 : 3),
                        "pMoveTypeID": $("#slOperationMoveTypes").val() == "" ? 0 : $("#slOperationMoveTypes").val(),
                        "pCommodityID": pIsShipment ? 0 : ($('#slCommodity').val() == "" ? 0 : $('#slCommodity').val()),
                        "pTransientTime": 0,
                        "pOpenDate": ConvertDateFormat($("#txtOperationOpenDate").val().trim()),
                        //"pCloseDate": null,
                        "pCloseDate": ConvertDateFormat($("#txtOperationCloseDate").val().trim()),
                        "pCutOffDate": "01/01/1900",
                        "pIncludePickup": false,
                        "pPickupCityID": pIsShipment ? ($("#slPickupCity").val() == "" || $("#slPickupCity").val() == undefined || $("#slPickupCity").val() == null ? 0 : $("#slPickupCity").val()) : 0,
                        "pPickupAddressID": 0,
                        "pPOLCountryID": (pIsShipment/*means its house*/ ? $('#hPOLCountryID').val() : $('#slPOLCountries option:selected').val() == "" ? "0" : $('#slPOLCountries option:selected').val()),
                        "pPOL": (pIsShipment/*means its house*/ ? $('#hPOL').val() : $('#slPOL option:selected').val() == "" ? "0" : $('#slPOL option:selected').val()),
                        "pPODCountryID": (pIsShipment/*means its house*/ ? $('#hPODCountryID').val() : $('#slPODCountries option:selected').val() == "" ? "0" : $('#slPODCountries option:selected').val()),
                        "pPOD": (pIsShipment/*means its house*/ ? $('#hPOD').val() : $('#slPOD option:selected').val() == "" ? "0" : $('#slPOD option:selected').val()),
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
                        "pNotes": $("#divNotes").val().trim().toUpperCase(),
                        "pIsDelivered": pIsShipment ? $("#cbIsDelivered").prop("checked") : false,
                        "pIsTrucking": false, //$("#cbIsTrucking").prop("checked"),
                        "pIsInsurance": false, //$("#cbIsInsurance").prop("checked"),
                        "pIsClearance": false, //$("#cbIsClearance").prop("checked"),
                        "pIsBosla": false, //$("#cbPrintAsBosla").prop("checked"),
                        "pIsCertificate": false, //$("#cbPrintAsCertificate").prop("checked"),
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
                        "pOperationStageID": 60, //this means Order
                        "pNumberOfHousesConnected": 0,
                        "pExpectedDeparture": pIsShipment
                            ? "01/01/1900"
                            : ($("#txtOperationExpectedDeparture").val().trim() == "" ? "01/01/1900" : $("#txtOperationExpectedDeparture").val().trim().toUpperCase()),
                        "pExpectedArrival": pIsShipment
                            ? "01/01/1900"
                            : ($("#txtOperationExpectedArrival").val().trim() == "" ? "01/01/1900" : $("#txtOperationExpectedArrival").val().trim().toUpperCase()),
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
                        "pMAWBStockID": $("#slMAWBStock").val() > 0 ? $("#slMAWBStock").val() : 0,
                        "pTypeOfStockID": $('#slTypeOfStock  option:selected').val() > 0 ? $('#slTypeOfStock option:selected').val() : 0,
                        "pMAWBSuffix": pIsShipment ? "0" : ($("#slMAWBStock").val() == "" ? "0" : $("#slMAWBStock option:selected").text()),
                        "pFlightNo": pIsShipment ? "0" : ($("#txtFlightNo").val().trim() == "" ? 0 : $("#txtFlightNo").val().toUpperCase()),
                        "pIsAWB": pIsShipment ? false : $("#cbIsAWB").prop("checked"),
                        "pConsigneeID2": $('#slConsignees2 option:selected').val() == "" || $('#slConsignees2 option:selected').val() == null || $('#slConsignees2 option:selected').val() == undefined
                            ? 0 : $('#slConsignees2 option:selected').val(),
                        "pReleaseDate": pIsShipment
                            ? ($("#txtShipmentReleaseDate").val().trim() == "" ? "01/01/1900" : $("#txtShipmentReleaseDate").val().trim())
                            : "01/01/1900",
                        "pCertificateNumber": pIsShipment ? ($("#txtShipmentCertificateNumber").val().trim() == "" ? 0 : $("#txtShipmentCertificateNumber").val().trim().toUpperCase()) : 0,
                        "pCountryOfOrigin": pIsShipment ? ($("#txtShipmentCountryOfOrigin").val().trim() == "" ? 0 : $("#txtShipmentCountryOfOrigin").val().trim().toUpperCase()) : 0,
                        "pInvoiceValue": pIsShipment ? ($("#txtShipmentInvoiceValue").val().trim() == "" ? 0 : $("#txtShipmentInvoiceValue").val().trim().toUpperCase()) : 0,
                        "pCurrencyID": pIsShipment ? ($("#slClearanceCurrency").val() == "" ? 0 : $("#slClearanceCurrency").val()) : "0",
                        "pACIDNumber": pIsShipment ? ($("#txtShipmentACIDNumber").val() == "" ? "0" : $("#txtShipmentACIDNumber").val()) : 0,
                        "pACIDNumberDetails": pIsShipment ? ($("#txtShipmentACIDDetails").val() == "" ? "0" : $("#txtShipmentACIDDetails").val()) : "0",
                        "pBookingNumber": pIsShipment ? ($("#txtShipmentBookingNumber").val() == "" ? "0" : $("#txtShipmentBookingNumber").val()) : "0",
                        "pUNNumber": pIsShipment ? ($("#txtShipmentUNNumber").val() == "" || $("#txtShipmentUNNumber").val() == null ? 0 : $("#txtShipmentUNNumber").val())
                            : (pDefaults.UnEditableCompanyName == "NIL" ? $("#slCIPStatus").val() : ($("#txtOperationUNNumber").val() == "" || $("#txtOperationUNNumber").val() == null ? 0 : $("#txtOperationUNNumber").val())),
                        "pIMOClass": pIsShipment ? ($("#txtShipmentIMOClass").val() == "" || $("#txtShipmentIMOClass").val() == null ? 0 : $("#txtShipmentIMOClass").val())
                            : ($("#txtOperationIMOClass").val() == "" || $("#txtOperationIMOClass").val() == null ? 0 : $("#txtOperationIMOClass").val()),
                        "pVesselID": pIsShipment ? ($("#slShipmentVesselID").val() == "" || $("#slShipmentVesselID").val() == null ? 0 : $("#slShipmentVesselID").val())
                            : ($("#txtOperationVesselID").val() == "" || $("#txtOperationVesselID").val() == null ? 0 : $("#txtOperationVesselID").val()),
                        "pNumberOfOriginalBills": IsNull($('#txtShipmentNumberOfOriginalBills').val(), 0),
                        "pManifestPreConsignee": pIsShipment ? $("#txtManifestPreConsignee").val() : "",
                        "pBlStatus": pIsShipment ? (($('#slBLStatusBLDocuments').val() == '' || $('#slBLStatusBLDocuments').val() == null) ? "0" : $('#slBLStatusBLDocuments').val()) : "0",
                        "pATAPODAlarmStatus": (pIsShipment && pDefaults.UnEditableCompanyName == 'UNF') ? 3 : 0 //to seperate houses from routing orders to UNF
                    };
                    if (glbCallingControl == "OperationsEdit" && pOperationHeader_Global != undefined && pOperationHeader_Global != null) {
                        parameters.pForm13Notes = CheckValueIsValidInput("#divShipperAddress") ? $("#divShipperAddress").val().toUpperCase() : "0";
                        parameters.pForm13Number = CheckValueIsValidInput("#divConsigneeAddress") ? $("#divConsigneeAddress").val().toUpperCase() : "0";
                        parameters.pBusinessUnit = CheckValueIsValidInput("#divNotifyAddress") ? $("#divNotifyAddress").val().toUpperCase() : "0";

                    }

                    let callback2 = function (pData) {
                        if (pData[3] != "") {
                            swal("Sorry", pData[3]);
                            $("#btnSaveShipment").attr("disabled", false);
                        }
                        else {
                            /*let ini = parseInt($("#hNumberOfHousesConnected").val());
                            let timer = setInterval(() => {
                                let newIni = parseInt($("#hNumberOfHousesConnected").val());
                                if (newIni > ini) {
                                    CargoProperties_Save(pData[1]);
                                    jQuery("#ShipmentModal").modal("hide");
                                    clearInterval(timer);
                                }
                            }, 100);*/
                            Shipments_ConnectOrDisconnect(pData[1], true, true);
                            $("#hShipmentID").val(pData[1]); //id of the newly created house
                            $("#txtShipmentHouseNumber").val(pData[2]);
                            $("#btnSaveShipment").attr("onclick", "Shipment_Update();");
                            //FadePageCover(false);
                            //swal("Success", "Saved Successfully.");
                        }
                    };
                    $("#btnSaveShipment").attr("disabled", true);
                    PostInsertUpdateFunction("form", "/api/Operations/Insert", parameters, pSaveandAddNew, pIsShipment ? "ShipmentModal" : "OperationModal", callback2);
                }


            } else { //Ports are OK
                var parameters = {
                    //if HouseNumber is not null then its entered manually
                    "pIsShipment": pIsShipment,
                    "pCodeSerial": 0 /*generated automatically*/,
                    //"pCode": "O" + $("#txtOperationOpenDate").val().substring(10, 8) + "-" + GetDirectionType($('input[name=cbDirectionType]:checked').val()).substring(0, 3) + "-"
                    //             + GetTransportType($('input[name=cbTransportType]:checked').val()).substring(0, 2) + "-",
                    "pCode": (pIsShipment || $('input[name=cbBLType]:checked').val() == constHouseBLType)
                        ? "0"
                        : ("O" + $("#txtOperationOpenDate").val().substring(10, 8) + "-" + GetDirectionType($('input[name=cbDirectionType]:checked').val()).substring(0, 3) + "-"
                            + GetTransportType($('input[name=cbTransportType]:checked').val()).substring(0, 2) + "-"),
                    "pHouseNumber": pIsShipment
                        ? ($("#txtShipmentHouseNumber").val().trim().toUpperCase() == "" ? 0 : $("#txtShipmentHouseNumber").val().trim().toUpperCase())
                        : "0",//if "0" then auto generated
                    "pBranchID": $('#slOperationBranch option:selected').val(),
                    "pSalesmanID": $('#slOperationSalesman option:selected').val(),
                    //"pOperationManID": $('#slOperationOperationMan option:selected').val(),

                    "pBLType": pIsShipment ? constHouseBLType : $('input[name=cbBLType]:checked').val(),
                    "pBLTypeIconName": pIsShipment ? HouseIconName : $("#hBLTypeIconName").val(),
                    "pBLTypeIconStyle": pIsShipment ? strHouseIconStyleClassName : $("#hBLTypeIconStyle").val(),

                    "pDirectionType": $('input[name=cbDirectionType]:checked').val(),
                    "pDirectionIconName": $("#hDirectionIconName").val(),
                    "pDirectionIconStyle": $("#hDirectionIconStyle").val(),

                    "pTransportType": $('input[name=cbTransportType]:checked').val(),
                    "pTransportIconName": $("#hTransportIconName").val(),
                    "pTransportIconStyle": $("#hTransportIconStyle").val(),

                    //"pShipmentType": pIsShipment
                    //    ? ($("#cbIsOcean").prop("checked") ? constLCLShipmentType : constLTLShipmentType)/*No air in this case coz air has no consolidation*/
                    //    : ($('input[name=cbTransportType]:checked').val() == AirTransportType ? 0 : $('input[name=cbShipmentType]:checked').val()),
                    "pShipmentType": pIsShipment
                        ? ($("#cbIsOcean").prop("checked") || $("#cbIsInland").prop("checked")
                            ? ($('input[name=cbShipmentType]:checked').val() == constConsolidationShipmentType ? ($("#cbIsOcean").prop("checked") ? constLCLShipmentType : constLTLShipmentType) : $('input[name=cbShipmentType]:checked').val())
                            : 0 //air and house
                        )/*No air in this case coz air has no consolidation*/
                        : ($('input[name=cbTransportType]:checked').val() == AirTransportType ? 0 : $('input[name=cbShipmentType]:checked').val()),
                    "pMasterBL": pIsShipment
                        ? "0"
                        : ($("#txtOperationMasterBL").val().trim() == "" ? "0" : $("#txtOperationMasterBL").val().trim().toUpperCase()),
                    "pShipperID": $('#slShippers option:selected').val() == "" || $('#slShippers option:selected').val() == null || $('#slShippers option:selected').val() == undefined
                        ? 0 : $('#slShippers option:selected').val(),
                    "pShipperAddressID": 0,
                    "pShipperContactID": 0,
                    //"pConsigneeID": (($('#slConsignees option:selected').val() == "" || $('input[name=cbDirectionType]:checked').val() == 2 || $('input[name=cbDirectionType]:checked').val() == 3)
                    "pConsigneeID": $('#slConsignees option:selected').val() == "" || $('#slConsignees option:selected').val() == null || $('#slConsignees option:selected').val() == undefined
                        ? 0 : $('#slConsignees option:selected').val(),
                    "pConsigneeAddressID": 0,
                    "pConsigneeContactID": 0,
                    "pNotifyID": $('#slNotify option:selected').val() == "" || $('#slNotify option:selected').val() == null || $('#slNotify option:selected').val() == undefined
                        ? 0 : $('#slNotify option:selected').val(),
                    "pAgentID": $('#slAgents').val() == "" || $('#slAgents').val() == null
                        ? 0 : $('#slAgents option:selected').val(),
                    "pAgentAddressID": 0,
                    "pAgentContactID": 0,
                    "pIncotermID": pIsShipment ? ($("#slShipmentIncoterm").val() == "" ? 0 : $("#slShipmentIncoterm").val()) : 0,
                    //"pPOrC": pDefaults.UnEditableCompanyName == "CQL" ? 3 : ($("#radIsConfirm1").prop('checked') ? 1 : 3),
                    "pPOrC": pIsShipment
                        ? ($("#slShipmentPOrC").val() == "" ? 0 : $("#slShipmentPOrC").val())
                        : ($("#radIsConfirm1").prop('checked') ? 1 : 3),
                    "pMoveTypeID": $("#slOperationMoveTypes").val() == "" ? 0 : $("#slOperationMoveTypes").val(),
                    "pCommodityID": pIsShipment ? 0 : ($('#slCommodity').val() == "" ? 0 : $('#slCommodity').val()),
                    "pTransientTime": 0,
                    "pOpenDate": ConvertDateFormat($("#txtOperationOpenDate").val().trim()),
                    //"pCloseDate": null,
                    "pCloseDate": ConvertDateFormat($("#txtOperationCloseDate").val().trim()),
                    "pCutOffDate": "01/01/1900",
                    "pIncludePickup": false,
                    "pPickupCityID": pIsShipment ? ($("#slPickupCity").val() == "" || $("#slPickupCity").val() == undefined || $("#slPickupCity").val() == null ? 0 : $("#slPickupCity").val()) : 0,
                    "pPickupAddressID": 0,

                    "pPOLCountryID": (pIsShipment/*means its house*/ ? $('#hPOLCountryID').val() : $('#slPOLCountries option:selected').val() == "" ? "0" : $('#slPOLCountries option:selected').val()),
                    "pPOL": (pIsShipment/*means its house*/ ? $('#hPOL').val() : $('#slPOL option:selected').val() == "" ? "0" : $('#slPOL option:selected').val()),
                    "pPODCountryID": (pIsShipment/*means its house*/ ? $('#hPODCountryID').val() : $('#slPODCountries option:selected').val() == "" ? "0" : $('#slPODCountries option:selected').val()),
                    "pPOD": (pIsShipment/*means its house*/ ? $('#hPOD').val() : $('#slPOD option:selected').val() == "" ? "0" : $('#slPOD option:selected').val()),
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
                    "pNotes": $("#divNotes").val().trim().toUpperCase(),
                    "pIsDelivered": pIsShipment ? $("#cbIsDelivered").prop("checked") : false,
                    "pIsTrucking": false, //$("#cbIsTrucking").prop("checked"),
                    "pIsInsurance": false, //$("#cbIsInsurance").prop("checked"),
                    "pIsClearance": false, //$("#cbIsClearance").prop("checked"),
                    "pIsBosla": false, //$("#cbPrintAsBosla").prop("checked"),
                    "pIsCertificate": false, //$("#cbPrintAsCertificate").prop("checked"),
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
                    "pOperationStageID": 60, //this means Order
                    "pNumberOfHousesConnected": 0,
                    "pExpectedDeparture": pIsShipment
                        ? "01/01/1900"
                        : ($("#txtOperationExpectedDeparture").val().trim() == "" ? "01/01/1900" : $("#txtOperationExpectedDeparture").val().trim().toUpperCase()),
                    "pExpectedArrival": pIsShipment
                        ? "01/01/1900"
                        : ($("#txtOperationExpectedArrival").val().trim() == "" ? "01/01/1900" : $("#txtOperationExpectedArrival").val().trim().toUpperCase()),
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
                    "pMAWBStockID": $("#slMAWBStock").val() > 0 ? $("#slMAWBStock").val() : 0,
                    "pTypeOfStockID": $('#slTypeOfStock  option:selected').val() > 0 ? $('#slTypeOfStock option:selected').val() : 0,
                    "pMAWBSuffix": pIsShipment ? "0" : ($("#slMAWBStock").val() == "" ? "0" : $("#slMAWBStock option:selected").text()),
                    "pFlightNo": pIsShipment ? "0" : ($("#txtFlightNo").val().trim() == "" ? 0 : $("#txtFlightNo").val().toUpperCase()),
                    "pIsAWB": pIsShipment ? false : $("#cbIsAWB").prop("checked"),
                    "pConsigneeID2": $('#slConsignees2 option:selected').val() == "" || $('#slConsignees2 option:selected').val() == null || $('#slConsignees2 option:selected').val() == undefined
                        ? 0 : $('#slConsignees2 option:selected').val(),
                    "pReleaseDate": pIsShipment
                        ? ($("#txtShipmentReleaseDate").val().trim() == "" ? "01/01/1900" : $("#txtShipmentReleaseDate").val().trim())
                        : "01/01/1900",
                    "pCertificateNumber": pIsShipment ? ($("#txtShipmentCertificateNumber").val().trim() == "" ? 0 : $("#txtShipmentCertificateNumber").val().trim().toUpperCase()) : 0,
                    "pCountryOfOrigin": pIsShipment ? ($("#txtShipmentCountryOfOrigin").val().trim() == "" ? 0 : $("#txtShipmentCountryOfOrigin").val().trim().toUpperCase()) : 0,
                    "pInvoiceValue": pIsShipment ? ($("#txtShipmentInvoiceValue").val().trim() == "" ? 0 : $("#txtShipmentInvoiceValue").val().trim().toUpperCase()) : 0,
                    "pCurrencyID": pIsShipment ? ($("#slClearanceCurrency").val() == "" ? 0 : $("#slClearanceCurrency").val()) : "0",
                    "pACIDNumber": pIsShipment ? ($("#txtShipmentACIDNumber").val() == "" ? "0" : $("#txtShipmentACIDNumber").val()) : 0,
                    "pACIDNumberDetails": pIsShipment ? ($("#txtShipmentACIDDetails").val() == "" ? "0" : $("#txtShipmentACIDDetails").val()) : "0",
                    "pBookingNumber": pIsShipment ? ($("#txtShipmentBookingNumber").val() == "" ? "0" : $("#txtShipmentBookingNumber").val()) : "0",
                    "pUNNumber": pIsShipment ? ($("#txtShipmentUNNumber").val() == "" || $("#txtShipmentUNNumber").val() == null ? 0 : $("#txtShipmentUNNumber").val())
                        : (pDefaults.UnEditableCompanyName == "NIL" ? $("#slCIPStatus").val() : ($("#txtOperationUNNumber").val() == "" || $("#txtOperationUNNumber").val() == null ? 0 : $("#txtOperationUNNumber").val())),
                    "pIMOClass": pIsShipment ? ($("#txtShipmentIMOClass").val() == "" || $("#txtShipmentIMOClass").val() == null ? 0 : $("#txtShipmentIMOClass").val())
                        : ($("#txtOperationIMOClass").val() == "" || $("#txtOperationIMOClass").val() == null ? 0 : $("#txtOperationIMOClass").val()),
                    "pVesselID": pIsShipment ? ($("#slShipmentVesselID").val() == "" || $("#slShipmentVesselID").val() == null ? 0 : $("#slShipmentVesselID").val())
                        : ($("#txtOperationVesselID").val() == "" || $("#txtOperationVesselID").val() == null ? 0 : $("#txtOperationVesselID").val()),
                    "pNumberOfOriginalBills": IsNull($('#txtShipmentNumberOfOriginalBills').val(), 0),
                    "pManifestPreConsignee": pIsShipment ? $("#txtManifestPreConsignee").val() : "",
                    "pBlStatus": pIsShipment ? (($('#slBLStatusBLDocuments').val() == '' || $('#slBLStatusBLDocuments').val() == null) ? "0" : $('#slBLStatusBLDocuments').val()) : "0",
                    "pDeliveryAddress": (pDefaults.UnEditableCompanyName == "EVL" ? ($('#cbIsInland').prop('checked') ? ($('#slOperationMoveTypes').val() == 1 ? $('#txtDeliveryAddress').val() : "") : "") : ""),
                    "pPickupAddress": (pDefaults.UnEditableCompanyName == "EVL" ? ($('#cbIsInland').prop('checked') ? ($('#slOperationMoveTypes').val() == 1 ? $('#txtPickupAddress').val() : "") : "") : "")

                };
                if (['KDM', 'NAJ'].includes(pDefaults.UnEditableCompanyName) || IsMESCOCompany) {
                    parameters.pVesselID = pIsShipment ? ($("#slShipmentVesselID").val() == "" || $("#slShipmentVesselID").val() == null ? 0 : $("#slShipmentVesselID").val()) : ($("#slOperationVessels").val() == "" ? "0" : $("#slOperationVessels").val());
                }
                if (pDefaults.UnEditableCompanyName == "UNF" || pDefaults.UnEditableCompanyName == "FAI") {
                    parameters.pVesselID = pIsShipment ? ($("#slShipmentVesselID").val() == "" ? "0" : $("#slShipmentVesselID").val()) : ($("#slOperationVessels").val() == "" ? "0" : $("#slOperationVessels").val());
                }
                if (glbCallingControl == "OperationsEdit" && pOperationHeader_Global != undefined && pOperationHeader_Global != null) {
                    parameters.pForm13Notes = CheckValueIsValidInput("#divShipperAddress") ? $("#divShipperAddress").val().toUpperCase() : "0";
                    parameters.pForm13Number = CheckValueIsValidInput("#divConsigneeAddress") ? $("#divConsigneeAddress").val().toUpperCase() : "0";
                    parameters.pBusinessUnit = CheckValueIsValidInput("#divNotifyAddress") ? $("#divNotifyAddress").val().toUpperCase() : "0";
                    if (pDefaults.UnEditableCompanyName == "UNF") {
                        parameters.pBusinessUnit2 = CheckValueIsValidInput("#txtShipmentIMOClass2") ? $("#txtShipmentIMOClass2").val().toUpperCase() : "0";
                    }
                }
                if (pDefaults.UnEditableCompanyName == "NAJ" && pOperationHeader_Global == null) {
                    parameters.pBookingNumber = CheckValueIsValidInput("#txtOperationBookingNumber") ? $("#txtOperationBookingNumber").val().trim().toUpperCase() : "0";
                }
                if (pDefaults.UnEditableCompanyName == "ELI" && pOperationHeader_Global == null) {
                    parameters.pIsTracked = CheckValueIsValidInput("#cbIsShipsGoTrack") ? $("#cbIsShipsGoTrack").prop("checked") : false;
                }
                PostInsertUpdateFunction("form", "/api/Operations/Insert", parameters, pSaveandAddNew, pIsShipment ? "ShipmentModal" : "OperationModal", callback);
            }
          
        }

    }, null);
}
function GetQuotationCharges() {
    debugger;
    if (IsMESCOCompany) {
        ClearAllTableRows("tblQuotationPayables");
        ClearAllTableRows("tblQuotationReceivables");
        let QuotationRouteID = $('#slQuotationRoutes').val() == "" ? 0 : $('#slQuotationRoutes').val();
        if (QuotationRouteID > 0) {
            $("#divQuotationCharges").removeClass("hide");
            CallGETFunctionWithParameters("/api/Quotations/GetQuotationCharges", { pQuotationRouteID: $('#slQuotationRoutes').val() },
                function (pData) {
                    debugger;
                    let QuotationCharges = JSON.parse(pData[0]);
                    let Categories = pData[1];
                    if (QuotationCharges.length > 0) {
                        $.each(QuotationCharges, function (i, item) {
                            if (item.CostAmount != 0) {
                                //AppendRowtoTable("tblQuotationPayables",
                                //    ("<tr ID='" + item.ID + "'>"
                                //        + "<td class='ChargeTypeName'>" + (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) + "</td>"
                                //        + "<td class='CostAmount'>" + item.CostAmount + " " + item.CostCurrencyCode + "</td>"
                                //        + "<td class='CategoryID'><select id='slPayableCategory" + item.ID + "' style='width:100%;text-align:center' class='selectPayableCategoryID form-control' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='true'></select></td>"
                                //        + "</tr>"
                                //    ));
                                AppendRowtoTable("tblQuotationPayables",
                                    "<tr id='" + item.ID + "'>" +
                                    "<td class='ChargeTypeName'>" +
                                    (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) +
                                    "</td>" +
                                    "<td class='CostAmount'>" +
                                    item.CostAmount + " " + item.CostCurrencyCode +
                                    "</td>" +
                                    "<td class='CategoryID'>" +
                                    "<select id='slPayableCategory" + item.ID + "' " +
                                    "style='width:100%;text-align:center' " +
                                    "class='selectPayableCategoryID form-control' " +
                                    "onfocus='DisableBackspaceKey(id);' " +
                                    "onkeydown='DisableBackspaceKey(id);' " +
                                    "onkeypress='DisableBackspaceKey(id);' " +
                                    "onchange=\"checkCategoryAccounts(this.value, '" + item.ID + "', this.id);\" " +
                                    "data-required='true'>" +
                                    "</select>" +
                                    "</td>" +
                                    "</tr>"
                                );

                            }
                            FillListFromObject(null, 2, "<--Select-->", "slPayableCategory" + item.ID, pData[1], null);

                            if (item.SaleAmount != 0) {
                                //AppendRowtoTable("tblQuotationReceivables",
                                //    ("<tr ID='" + item.ID + "'>"
                                //        + "<td class='ChargeTypeName'>" + (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) + "</td>"
                                //        + "<td class='CostAmount'>" + item.SaleAmount + " " + item.SaleCurrencyCode + "</td>"
                                //        + "<td class='CategoryID'><select id='slReceivableCategory" + item.ID + "' style='width:100%;text-align:center' class='selectReceivableCategoryID form-control' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='true'></select></td>"
                                //        + "</tr>"
                                //    ));
                                AppendRowtoTable("tblQuotationReceivables",
                                    "<tr id='" + item.ID + "'>" +
                                    "<td class='ChargeTypeName'>" +
                                    (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) +
                                    "</td>" +
                                    "<td class='CostAmount'>" +
                                    item.SaleAmount + " " + item.SaleCurrencyCode +
                                    "</td>" +
                                    "<td class='CategoryID'>" +
                                    "<select id='slReceivableCategory" + item.ID + "' " +
                                    "style='width:100%;text-align:center' " +
                                    "class='selectReceivableCategoryID form-control' " +
                                    "onfocus='DisableBackspaceKey(id);' " +
                                    "onkeydown='DisableBackspaceKey(id);' " +
                                    "onkeypress='DisableBackspaceKey(id);' " +
                                    "onchange=\"checkCategoryAccounts(this.value, '" + item.ID + "', this.id);\" " +
                                    "data-required='true'>" +
                                    "</select>" +
                                    "</td>" +
                                    "</tr>"
                                );


                            }
                            FillListFromObject(null, 2, "<--Select-->", "slReceivableCategory" + item.ID, pData[1], null);
                        })

                    }
                });
        }
    }
}


function checkCategoryAccounts(pCategoryId, pQuotaionChargeId, pCategoryElementId) {

    debugger;


    CallGETFunctionWithParameters("/api/Quotations/CheckChargeTypeCategory", {
        pQuotationRouteId: $('#slQuotationRoutes').val(),
        pCategoryId: pCategoryId,
        pQuotaionChargeId: pQuotaionChargeId,

    },
        function (pData) {
            debugger;

            if (!pData[0]) {

                swal("Sorry", "Please Check ChargeType has ExpenseAccount , RevenueAccount ");

                $("#" + pCategoryElementId).val("");

            }


        });





}



function GetOperationPayablesAndReceivables() {
    debugger;
    if (IsMESCOCompany) {
        ClearAllTableRows("tblOperationPayables");
        ClearAllTableRows("tblOperationReceivables");
        let OperationID = pOperationHeader_Global.ID;

        $("#divOperationCharges").removeClass("hide");
        CallGETFunctionWithParameters("/api/Operations/GetOperationPayablesAndReceivables", { pOperationID: OperationID },
            function (pData) {
                debugger;
                let Payables = JSON.parse(pData[0]);
                let Receivables = JSON.parse(pData[1]);
                let Categories = pData[2];
                $.each(Payables, function (i, payable) {
                    AppendRowtoTable("tblOperationPayables",
                        ("<tr ID='" + payable.ID + "'>"
                            + "<td class='ChargeTypeName'>" + (payable.ChargeTypeName == 0 ? "" : payable.ChargeTypeName) + (payable.IsCancelled ? "(Cancelled)" : (payable.IsDeleted ? "(Deleted)" : ""))  + "</td>"
                            + "<td class='CostAmount'>" + payable.QuotationCost + " " + payable.CurrencyCode + "</td>"
                            + "<td class='CategoryID'><select id='slPayableCategory" + payable.ID + "' style='width:100%;text-align:center' class='selectPayableCategoryID form-control' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='true'></select></td>"
                            + "</tr>"
                        ));
                    FillListFromObject(payable.CategoryID, 2, "<--Select-->", "slPayableCategory" + payable.ID, Categories, null);
                });
                $.each(Receivables, function (i, receivable) {
                    AppendRowtoTable("tblOperationReceivables",
                        ("<tr ID='" + receivable.ID + "'>"
                            + "<td class='ChargeTypeName'>" + (receivable.ChargeTypeName == 0 ? "" : receivable.ChargeTypeName) + (receivable.IsCancelled ? "(Cancelled)" : (receivable.IsDeleted ? "(Deleted)" : "")) + "</td>"
                            + "<td class='SaleAmount'>" + receivable.SaleAmount + " " + receivable.CurrencyCode + "</td>"
                            + "<td class='CategoryID'><select id='slReceivableCategory" + receivable.ID + "' style='width:100%;text-align:center' class='selectReceivableCategoryID form-control' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='true'></select></td>"
                            + "</tr>"
                        ));
                    FillListFromObject(receivable.CategoryID, 2, "<--Select-->", "slReceivableCategory" + receivable.ID, Categories, null);
                })

            });
    }
}
function Operations_LoadQuotationDataForCreateTruckingOrders() {
    debugger;
    if ($('#slQuotationRoutes').val() != null) {
        CallGETFunctionWithParameters("/api/Quotations/QR_LoadAll"
            , { pPageSize: 99999, pWhereClauseQR: "WHERE (ShipmentTypeName in ('LCL','LTL','FCL') OR ShipmentType is null) and ID= '" + $('#slQuotationRoutes').val() + "'", pOrderBy: "ID DESC" }
            , function (pData) {
                var QData = JSON.parse(pData[1]);

                if (QData.length > 0 && (QData[0].ShipmentTypeName == 'LCL' || QData[0].ShipmentTypeName == 'LTL' || QData[0].ShipmentTypeName == '0')) {
                    $('.classShowByOperationType').removeClass('hide');
                    $("#txtClientName").val(QData[0].ClientName);
                    $("#txtPOLName").val(QData[0].POLName);
                    $("#txtPODName").val(QData[0].PODName);
                    $("#txtGrossWeight").val(QData[0].GrossWeight);
                    $("#txtCommodityName").val(QData[0].CommodityName);
                    $("#NumberOfPackages").val(QData[0].NumberOfPackages);
                }
                else {
                    $('.classShowByOperationType').addClass('hide');
                    $("#txtClientName").val('');
                    $("#txtPOLName").val('');
                    $("#txtPODName").val('');
                    $("#txtGrossWeight").val('');
                    $("#txtCommodityName").val('');
                    $("#NumberOfPackages").val('0');
                }


                if (QData[0].ShipmentTypeName === 'FCL' && IsMESCOCompany && QData[0].DirectionIconName === 'fa-arrow-circle-down') {
                    $("#cbIsDirectFromQuotation").prop("disabled", true);
                    $("#cbIsDirectFromQuotation").prop("checked", false);

                    $("#cbIsMasterFromQuotation").prop("checked", true).trigger("change");

                } else if (IsMESCOCompany) {
                    $("#cbIsDirectFromQuotation").prop("disabled", false);

                    $("#cbIsDirectFromQuotation").prop("checked", true).trigger("change");

                    $("#cbIsHouseFromQuotation").prop("checked", false);
                    $("#cbIsMasterFromQuotation").prop("checked", false);
                }




            }
            , null);
    }
}
function GetCategories(PayableOrReceivable) {
    debugger;
    let ChargesCategories = [];
    $("#tbl" + PayableOrReceivable + " tbody tr").each(function (i, tr) {
        if (PayableOrReceivable.startsWith("Quotation")) {
            ChargesCategories.push({
                pQuotationChargeID: $(tr).attr("ID"),
                pCategoryID: $(tr).find("td.CategoryID select").val()
            });
        }
        else if (PayableOrReceivable.startsWith("Operation")) {
            ChargesCategories.push({
                pID: $(tr).attr("ID"),
                pCategoryID: $(tr).find("td.CategoryID select").val()
            });
        }
    });
    return ChargesCategories;
}
function Operations_CreateOperationFromQuotation() {
    debugger;
    if (IsMESCOCompany) {
        let canCreateOp = true;
        //let operation = "";
        //CallGETFunctionWithParameters("/api/Operations/CheckLastMonthOperations", null, function (pData) {
        //    if (!pData[0]) {
        //        canCreateOp = false;
        //        operation = JSON.parse(pData[1]).map(item => item.Code).join("||");
        //    }
        //}, null, false);
        let salesman = "";
        CallGETFunctionWithParameters("/api/Operations/CheckSalesmanReceivables", {
            pQuotationRouteID: $("#slQuotationRoutes").val()
        }, function (pData) {
            if (!pData[0]) {
                canCreateOp = true;
                salesman = pData[1];
            }
        }, null, false);

        if (!canCreateOp) {
            swal("Sorry", "Please Check uninvoiced receivables for salesman > " + salesman);
            //swal("Sorry", "Please Check last month Operations have no uninvoiced receivables. \nCheck Operations->" + operation);
            return;
        }
    }
    if ($("#slQuotationRoutes").val() == "")
        swal("Sorry", "Please, Select Quotation.");
    else if (pDefaults.UnEditableCompanyName == "MED") {
        //for MED we can't create more than one operation from a single quotation route --Mustafa Mahmoud
        CallGETFunctionWithParameters("/api/Quotations/GetOperationsCreatedFromQuotationRoute", { pQuotationRouteID: $("#slQuotationRoutes").val() },
            function (pData) {
                debugger;
                if (pData > 0) {
                    swal({
                        title: "Creation Failed",
                        text: "There is already an operation created from this quotation route.",
                        showCancelButton: false,
                        confirmButtonColor: "#65bd77",
                        confirmButtonText: "OK",
                        closeOnConfirm: true
                    }, null);
                } else
                    Operations_CreateOperationFromQuotationAfterSuccess();
            });
    } else {
        Operations_CreateOperationFromQuotationAfterSuccess();
    }
}
function Operations_CreateOperationFromQuotationAfterSuccess() {
    debugger;


    var pParameterObject = {
        pEmailID: 0 //to be considered as not created
        , pQuotationRouteID: $("#slQuotationRoutes").val()
        , pBLType: ($("#cbIsDirectFromQuotation").prop("checked")
            ? constDirectBLType
            : ($("#cbIsMasterFromQuotation").prop("checked") ? constMasterBLType : constHouseBLType)
        )
        , pBLTypeIconName: ($("#cbIsDirectFromQuotation").prop("checked")
            ? DirectIconName
            : ($("#cbIsMasterFromQuotation").prop("checked") ? MasterIconName : HouseIconName)
        )
        , pBLTypeIconStyle: ($("#cbIsDirectFromQuotation").prop("checked")
            ? strDirectIconStyleClassName
            : ($("#cbIsMasterFromQuotation").prop("checked") ? strMasterIconStyleClassName : strHouseIconStyleClassName)
        )
        , pNumberOfTruckingOrders: $('#NumberOfTruckingOrders').val() == '' ? "0" : $('#NumberOfTruckingOrders').val()
        , pIsOwnedByCompany: $("#cbTruckingOrderIsOwnedByCompany").prop("checked") ? true : false
        , pPayableCategories: GetCategories("QuotationPayables")
        , pReceivableCategories: GetCategories("QuotationReceivables")
    };
    if (ValidateForm("form", "SelectOperationTypeModal")) {
        jQuery("#SelectOperationTypeModal").modal("hide");
        FadePageCover(true);
        PostInsertUpdateFunction("form", "/api/Quotations/CreateOperationFromAlarm", pParameterObject, false, "SelectOperationTypeModal",
            function (pData) {
                if (pData[0]) {
                    if (pData[1] == 0) {
                        FadePageCover(false);
                        swal("Sorry", "Please, ensure that partners are not inactive.");
                    }
                    else {
                        LoadViews("OperationsEdit", null, pData[1]); //pData[1]: is the Created OperationID
                        LoadOperationsSubMenu();
                        //LoadDefaults("/api/Defaults/LoadAll", " WHERE ID = 1 ");
                    }
                }
                else if (pData[2] == "") {//false with no message
                    swal("Sorry", "Connection failed, please try again.");
                    FadePageCover(false);
                }
                else {//false and there is message
                    swal("Sorry", pData[2]);
                    FadePageCover(false);
                }
            });
    }
    //CallGETFunctionWithParameters("/api/Quotations/CreateOperationFromAlarm"
    //    , pParameterObject
    //    , function (pData) {
    //        if (pData[0]) {
    //            if (pData[1] == 0) {
    //                FadePageCover(false);
    //                swal("Sorry", "Please, ensure that partners are not inactive.");
    //            }
    //            else {
    //                LoadViews("OperationsEdit", null, pData[1]); //pData[1]: is the Created OperationID
    //                LoadOperationsSubMenu();
    //                //LoadDefaults("/api/Defaults/LoadAll", " WHERE ID = 1 ");
    //            }
    //        }
    //        else if (pData[2] == "") {//false with no message
    //            swal("Sorry", "Connection failed, please try again.");
    //            FadePageCover(false);
    //        }
    //        else {//false and there is message
    //            swal("Sorry", pData[2]);
    //            FadePageCover(false);
    //        }
    //    }
    //    , null);
}
function Operations_Update(pSaveandAddNew) {

    debugger;
    if ((pDefaults.UnEditableCompanyName == "UNF" && $('#txtOperationACIDNumber').val() != "" && $('#txtOperationACIDNumber').val() != null && $('#txtOperationACIDNumber').val() != undefined && $('#txtOperationACIDNumber').val().length != 19) || isNaN($('#txtOperationACIDNumber').val())) {
        swal("Sorry", "Acid must be 19 Numbers Excatly.");
        return;
    }

    if (pDefaults.UnEditableCompanyName == "BOM") {


        let pWhereClause = "WHERE 1=1 " + " \n"; pWhereClause += " AND (ACIDNumber=N'" + $("#txtOperationACIDNumber").val().trim().toUpperCase() + "') "; pWhereClause += " AND (ID!=" + $("#hOperationID").val() + ") ";
        let pWhereClause_Routings = "0";
        pWhereClause_Routings = "0";
        let pOrderBy = " ID DESC ";
        let pParametersWithValues = {
            pIsLoadArrayOfObjects: false
            , pPageNumber: 1
            , pPageSize: '10'
            , pWhereClause: pWhereClause
            , pIsBindTableRows: false
            , pWhereClause_Routings: pWhereClause_Routings
            , pOrderBy: pOrderBy
            , pCallingControl: "OperationsManagement_BindTableRows"
        }
        CallGETFunctionWithParameters("api/Operations/LoadWithWhereClause", pParametersWithValues, function (pData) {

            $.each((JSON.parse(pData[0])), function (i, item) {

                if (item.id != $("#hOperationID").val())
                    ACIDCOUNT += 1;

            });

        }, null, false/*Default true*/);



    }

    ////var varExpirationDate = ($("#txtOperationCutOffDate").val().trim() == "" ? "" : $("#txtOperationCutOffDate").val().trim());
    ////if (!isValidDate($("#txtOpenDate").val().trim(), 1) || !isValidDate(varExpirationDate, 1))
    //if (!isValidDate($("#txtOpenDate").val().trim(), 1) && $("#txtOpenDate").val().trim() != "")
    //    swal(strSorry, "Check open date.");
    //else
    //    if (!isValidDate($("#txtCloseDate").val().trim(), 1) && $("#txtCloseDate").val().trim() != "")
    //        swal(strSorry, "Check close date.");
    //else
    $("#btnSaveOperation").attr("disabled", "disabled");
    if (Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtCloseDate").val().trim())) <= 0) {
        swal(strSorry, "Close date must be after open date.");
        $("#btnSaveOperation").removeAttr("disabled", "disabled");
    }
    else if ($("#slOperationNetwork").val() == "" && pDefaults.UnEditableCompanyName == "SWI" && $("#lblAgent").text() != "0" && $("#lblAgent").text() != "") {
        swal("Sorry", "Please, select network.");
        $("#btnSaveOperation").removeAttr("disabled", "disabled");
    }
    else if (!isValidDate($("#txtOperationCutOffDate").val().trim(), 1) && $("#txtOperationCutOffDate").val().trim() != "" && pDefaults.UnEditableCompanyName != 'NAJ') {
        swal("Sorry", "Please, Check Cut Off Date.");
        $("#btnSaveOperation").removeAttr("disabled", "disabled");
    }
    else if (pDefaults.UnEditableCompanyName == "BOM" && ACIDCOUNT > 0) {
        swal("Sorry", "ACID must be unique.");
        $("#btnSaveOperation").removeAttr("disabled", "disabled");
        ACIDCOUNT = 0;
    }
    //else
    //if (Date.prototype.compareDates(FormattedTodaysDate, ConvertDateFormat($("#txtOperationOpenDate").val().trim())) < 0)
    //    swal(strSorry, "Check the open date.");
    //else
    //    if (Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat(varExpirationDate)) < 1)
    //        swal(strSorry, strCheckDates);
    //else
    //    if ($('#slPOL option:selected').val() == $('#slPOD option:selected').val() && $('#slPOL option:selected').val() && $('#slPOL option:selected').val() != undefined != "" && !$("#cbIsDomestic").prop("checked"))//check different ports
    //        swal(strSorry, strPOLEqualPODWarning);

    //else //check Domestic with POLCountry = PODCountry
    //    if ($('input[name=cbDirectionType]:checked').val() == 3 && $('#slPOLCountries option:selected').val() != $('#slPODCountries option:selected').val())
    //        swal(strSorry, strDomesticWithDifferentCountriesWarning);
    //    else //check import or export with different countries
    //        if ($('input[name=cbDirectionType]:checked').val() != 3 && $('#slPOLCountries option:selected').val() == $('#slPODCountries option:selected').val() && $('#slPOLCountries option:selected').val() != "" && $('#slPOLCountries option:selected').val() != undefined)
    //            swal(strSorry, strImportOrExportWithSameCountriesWarning);
    //        else //check Ports are entered
    //            if ($('#slPOL option:selected').val() == "" || $('#slPOD option:selected').val() == "")
    //                swal(strSorry, strEmptyPortsWarning);
    else if ($('#slOperationEditBranch option:selected').val() == "") {
        swal(strSorry, "Please, Select the branch.");
        $("#btnSaveOperation").removeAttr("disabled", "disabled");
    }
    else if ($('#slMoveTypes').val() == "") {
        swal(strSorry, "Please, Select Service.");
        $("#btnSaveOperation").removeAttr("disabled", "disabled");
    }
    else if ($('#slOperationEditSalesman option:selected').val() == "") {
        swal(strSorry, "Please, Select the salesman.");
        $("#btnSaveOperation").removeAttr("disabled", "disabled");
    }
    //else //check Client is entered
    //    if (($('input[name=cbDirectionType]:checked').val() == 1 && $('#slConsignees option:selected').val() == "") //check Consignee in case of Import
    //        || (($('input[name=cbDirectionType]:checked').val() == 2 || $('input[name=cbDirectionType]:checked').val() == 3) && $('#slShippers option:selected').val() == "")) //check Shipper in case of Export or 
    //        swal(strSorry, "Please, Select Client.");
    else { //Ports are OK

        debugger;
        if (pDefaults.UnEditableCompanyName == 'NAJ')
            var CutOffDateForNAJ = CheckValueIsValidInput("#txtOperationCutOffDate") ? ConvertDateFormat($("#txtOperationCutOffDate").val()) : "01/01/1900";

        var CutOffDateForNAJ = ($("#txtOperationCutOffDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtOperationCutOffDate").val().trim()));
        var form13NumberText;
        if (pDefaults.UnEditableCompanyName == "TRI") {
            form13NumberText = $('#slOperationTransPort option:selected').val();
        } else {
            form13NumberText = $("#txtOperationForm13Number").val().trim() == "" ? "0" : $("#txtOperationForm13Number").val().trim().toUpperCase();
        }
        var parameters = {
            "pID": $("#hOperationID").val(),
            "pQuotationRouteID": $("#hQuotationRouteID").val(),//has value in case operation is built on a Quotation
            "pCodeSerial": $("#hCodeSerial").val(), /*generated automatically*/
            //"pCode": "O" + (CurrentYear - 2000) + "-" + GetDirectionType($('input[name=cbDirectionType]:checked').val()).substring(0, 3) + "-"
            //                + GetTransportType($('input[name=cbTransportType]:checked').val()).substring(0, 2) + "-" + $("#hCodeSerial").val(),
            //"pHouseNumber": ($('input[name=cbBLType]:checked').val() != constMasterBLType //if not main add the house number
            //                ? ("H-" + GetDirectionType($('input[name=cbDirectionType]:checked').val()).substring(0, 3) + "-"
            //                + GetTransportType($('input[name=cbTransportType]:checked').val()).substring(0, 2) + "-" + $("#hCodeSerial").val())
            //                : "0"),
            "pHouseNumber": ($('input[name=cbBLType]:checked').val() != constMasterBLType //if not main add the house number
                ? $("#txtHouseNumber").val().trim().toUpperCase()
                : "0"),
            "pBranchID": $('#slOperationEditBranch option:selected').val(),
            "pSalesmanID": $('#slOperationEditSalesman option:selected').val(),
            "pOperationManID": $('#slOperationEditOperationMan option:selected').val(),

            "pBLType": $('input[name=cbBLType]:checked').val(),
            "pBLTypeIconName": $("#hBLTypeIconName").val(),
            "pBLTypeIconStyle": $("#hBLTypeIconStyle").val(),

            "pDirectionType": $('input[name=cbDirectionType]:checked').val(),
            "pDirectionIconName": $("#hDirectionIconName").val(),
            "pDirectionIconStyle": $("#hDirectionIconStyle").val(),

            "pTransportType": $('input[name=cbTransportType]:checked').val(),
            "pTransportIconName": $("#hTransportIconName").val(),
            "pTransportIconStyle": $("#hTransportIconStyle").val(),

            "pShipmentType": ($('input[name=cbTransportType]:checked').val() == AirTransportType ? 0 : $('input[name=cbShipmentType]:checked').val()),

            "pMasterBL": ($("#hBLType").val() == constHouseBLType || $("#hMasterBL").val().trim().toUpperCase() == "" ? "0" : $("#hMasterBL").val().trim().toUpperCase()),
            "pMAWBSuffix": ($("#hBLType").val() != constHouseBLType && $("#cbIsAir").prop("checked") ? $("#hMAWBSuffix").val() : "0"),
            "pBLDate": ($("#hBLType").val() == constHouseBLType || $("#hMasterBL").val().trim().toUpperCase() == "" ? "01/01/1900" : ConvertDateFormat($("#hBLDate").val())),
            "pHBLDate": "01/01/1900",
            "pVia1": ($("#hBLType").val() == constHouseBLType ? 0 : $("#hVia1").val()),
            "pVia2": ($("#hBLType").val() == constHouseBLType ? 0 : $("#hVia2").val()),
            "pVia3": ($("#hBLType").val() == constHouseBLType ? 0 : $("#hVia3").val()),

            "pMAWBStockID": $("#hMAWBStockID").val() > 0 ? $("#hMAWBStockID").val() : 0,
            "pShipperID": $("#hShipperID").val() > 0 ? $("#hShipperID").val() : 0, //different from insert coz i am saving in table not from sl in modal

            // To be handled (set or removed)
            "pShipperAddressID": 0,
            "pShipperContactID": ($("#hShipperContactID").val() == "" ? 0 : $("#hShipperContactID").val()), //different from insert coz i am saving in table not from sl in modal
            "pConsigneeID": ($("#hConsigneeID").val() == "" ? 0 : $("#hConsigneeID").val()), //different from insert coz i am saving in table not from sl in modal

            // To be handled (set or removed)
            "pConsigneeAddressID": 0,
            "pConsigneeContactID": ($("#hConsigneeContactID").val() == "" ? 0 : $("#hConsigneeContactID").val()), //different from insert coz i am saving in table not from sl in modal
            "pAgentID": ($("#hAgentID").val() == "" ? 0 : $("#hAgentID").val()), //different from insert coz i am saving in table not from sl in modal

            // To be handled (set or removed)
            "pAgentAddressID": 0,
            "pAgentContactID": ($("#hAgentContactID").val() == "" ? 0 : $("#hAgentContactID").val()), //different from insert coz i am saving in table not from sl in modal

            "pIncotermID": ($('#slIncoterms option:selected').val() == "" ? 0 : $('#slIncoterms option:selected').val()),
            "pPOrC": ($('#slOperationPOrC option:selected').val() == "" ? 0 : $('#slOperationPOrC option:selected').val()),
            "pMoveTypeID": ($('#slMoveTypes option:selected').val() == "" ? 0 : $('#slMoveTypes option:selected').val()),
            "pCommodityID": ($('#slCommodities option:selected').val() == "" ? 0 : $('#slCommodities option:selected').val()),
            "pCommodityID2": ($('#slCommodities2 option:selected').val() == "" ? 0 : $('#slCommodities2 option:selected').val()),
            "pCommodityID3": ($('#slCommodities3 option:selected').val() == "" ? 0 : $('#slCommodities3 option:selected').val()),
            "pTransientTime": ($("#txtTransientTime").val() == "" ? 0 : $("#txtTransientTime").val()),
            "pOpenDate": ($("#txtOpenDate").val().trim() == "" ? null : ConvertDateFormat($("#txtOpenDate").val().trim())),//$("#txtOpenDate").val().trim(),
            "pFileAccountingDate": ($("#txtFileAccountingDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtFileAccountingDate").val().trim())),
            //"pCloseDate": null,
            "pCloseDate": ConvertDateFormat($("#txtCloseDate").val().trim()),
            "pCloseDateAsDateTime": ConvertDateFormat($("#txtCloseDate").val().trim()),//i use it comparison with datetime in serverside
            "pCutOffDate": CutOffDateForNAJ,
            "pIncludePickup": false,//$("#cbIncludePickup").prop('checked'),
            "pPickupCityID": 0,// $('#slPickupCity option:selected').val(),
            // To be handled (set or removed)
            "pPickupAddressID": 0,
            "pPOLCountryID": $("#hPOLCountryID").val(),
            "pPOL": $("#hPOL").val(),
            "pPODCountryID": $("#hPODCountryID").val(),
            "pPOD": $("#hPOD").val(),
            "pShippingLineID": $("#hShippingLineID").val(),
            "pAirlineID": $("#hAirlineID").val(),
            "pTruckerID": $("#hTruckerID").val(),

            // To be handled (set or removed)
            "pIncludeDelivery": false,//$("#cbIncludeDelivery").prop('checked'),
            "pDeliveryZipCode": 0,
            "pDeliveryCityID": 0,//$('#slDeliveryCity option:selected').val(),
            "pDeliveryCountryID": 0,
            "pGrossWeight": 0,
            "pVolume": 0,
            //pChargeableWeight, pNumberOfPackages are not updated in operationscontroller(but in OperationContainersAndPackages)
            "pChargeableWeight": 0,
            "pNumberOfPackages": ($("#txtOperationNumberOfPackages").val() == "" || $("#txtOperationNumberOfPackages").val() == 0 ? 1 : $("#txtOperationNumberOfPackages").val()),
            "pIsDangerousGoods": $("#cbDangerousGoods").prop("checked"),
            "pDeliveryCustomer": $("#txtDeliverTo").val().trim() == '' ? 0 : $("#txtDeliverTo").val().trim(),
            "pNotes": $("#txtOperationNotes").val().trim() == '' ? 0 : $("#txtOperationNotes").val().trim(),
            "pNotes2": $("#txtOperationNotes2").val().trim() == '' ? 0 : $("#txtOperationNotes2").val().trim(),
            "pCustomerReference": $("#txtOperationCustomerReference").val().trim() == "" ? "0" : $("#txtOperationCustomerReference").val().trim().toUpperCase(),
            "pSupplierReference": $("#txtOperationSupplierReference").val().trim() == "" ? "0" : $("#txtOperationSupplierReference").val().trim().toUpperCase(),

            "pPONumber": $("#txtOperationPONumber").val().trim() == "" ? "0" : $("#txtOperationPONumber").val().trim().toUpperCase(),
            "pPODate": ($("#txtOperationPODate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtOperationPODate").val().trim())),
            "pPOValue": $("#txtOperationPOValue").val().trim() == "" ? "0" : $("#txtOperationPOValue").val().trim().toUpperCase(),
            "pReleaseNumber": $("#txtOperationReleaseNumber").val().trim() == "" ? "0" : $("#txtOperationReleaseNumber").val().trim().toUpperCase(),
            "pReleaseDate": ($("#txtOperationReleaseDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtOperationReleaseDate").val().trim())),
            "pForm13Date": ($("#txtOperationForm13Date").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtOperationForm13Date").val().trim())),
            "pReleaseValue": $("#txtOperationReleaseValue").val().trim() == "" ? "0" : $("#txtOperationReleaseValue").val().trim().toUpperCase(),
            "pDispatchNumber": $("#txtOperationDispatchNumber").val().trim() == "" ? "0" : $("#txtOperationDispatchNumber").val().trim().toUpperCase(),
            "pBusinessUnit": $("#txtOperationBusinessUnit").val().trim() == "" ? "0" : $("#txtOperationBusinessUnit").val().trim().toUpperCase(),
            "pBusinessUnit2": $("#txtOperationBusinessUnit2").val().trim() == "" ? "0" : $("#txtOperationBusinessUnit2").val().trim().toUpperCase(),
            "pForm13Number": form13NumberText,
            "pACIDNumber": $("#txtOperationACIDNumber").val().trim() == "" ? "0" : $("#txtOperationACIDNumber").val().trim().toUpperCase(),
            "pACIDNumberDetails": $("#txtOperationACIDDetails").val() == "" ? "0" : $("#txtOperationACIDDetails").val(),
            "pBookingNumber": $("#txtOperationBookingNumber").val() == "" ? "0" : $("#txtOperationBookingNumber").val(),
            "pAgreedRate": $("#txtOperationAgreedRate").val().trim() == "" ? "0" : $("#txtOperationAgreedRate").val().trim().toUpperCase(),
            "pOperationStageID": $("#hOperationStageID").val(),
            //"pOperationStageID": Date.prototype.compareDates(FormattedTodaysDate, ConvertDateFormat($("#txtCloseDate").val().trim())) <= 0 ? 120/*Closed OperationStageID*/ : 0,
            "pMasterOperationID": $("#hMasterOperationID").val(),
            "pNumberOfHousesConnected": ($("#hBLType").val() != constMasterBLType ? 0 : $("#hNumberOfHousesConnected").val()),
            "pIsDelivered": $("#cbIsForm13Delivered").prop("checked"),
            "pIsTrucking": false, //$("#cbIsTrucking").prop("checked"),
            "pIsInsurance": false, //$("#cbIsInsurance").prop("checked"),
            "pIsClearance": $("#cbIsClearance").prop("checked"),  //Added in routing clearance and used as IsVesselArrived
            "pIsBosla": $("#cbPrintAsBosla").prop("checked"),  //Added in routing clearance and used as IsVesselArrived
            "pIsCertificate": $("#cbPrintAsCertificate").prop("checked"),
            "pIsGenset": false, //$("#cbIsGenset").prop("checked"),
            "pIsCourrier": false, //$("#cbIsCourrier").prop("checked"),
            "pIsTelexRelease": false, //$("#cbIsTelexRelease").prop("checked"),

            "pNetworkID": ($('#slOperationNetwork option:selected').val() == "" ? 0 : $('#slOperationNetwork option:selected').val()),
            "pNumberOfOriginalBills": $("#txtOperationNumberOfOriginalBills").val().trim() == "" ? "0" : $("#txtOperationNumberOfOriginalBills").val().trim(),
            "pUNNumber": (pDefaults.UnEditableCompanyName == "NIL" ? $("#slCIPStatus").val() : ($("#txtOperationUNNumber").val() == "" || $("#txtOperationUNNumber").val() == null ? 0 : $("#txtOperationUNNumber").val())),
            "pIMOClass": $("#txtOperationIMOClass").val() == "" || $("#txtOperationIMOClass").val() == null ? 0 : $("#txtOperationIMOClass").val(),
            "pVesselID": $("#slOperationVesselID").val() == "" || $("#slOperationVesselID").val() == null ? 0 : $("#slOperationVesselID").val(),
            "pForm13Notes": (pDefaults.UnEditableCompanyName == "NIL" ? $("#txtCargoOrigins").val() :$("#txtOperationForm13Notes").val().trim() == "" || $("#txtOperationForm13Notes").val() == null ? "0" : $("#txtOperationForm13Notes").val().trim().toUpperCase()) ,
            //"pIsInactive": $("#cbIsInactive").prop('checked'),


        };

        if (pDefaults.UnEditableCompanyName == "NAJ") {
            parameters.pSIDate = CheckValueIsValidInput("#txtOperationSIDate") ? ConvertDateFormat($("#txtOperationSIDate").val()) : "01/01/1900";
        }

        PostInsertUpdateFunction("form", "/api/Operations/Update", parameters, pSaveandAddNew, "OperationsEditModal"
            , function (pData) {
                var _MessageReturned = pData[2];
                if (_MessageReturned == "")
                    swal("Success", "Saved successfully.");
                else
                    swal("Sorry", _MessageReturned);
                FadePageCover(false);
                $("#btnSaveOperation").removeAttr("disabled");
                //LoadViews("OperationsEdit", null, $("#hOperationID").val());
                //$("#ulOperationsSubMenu").children().removeClass("active");
                //$("#hl-submenu-General").parent().addClass("active");
                //LoadWithPagingWithWhereClause("/api/OperationCharges/LoadWithWhereClause", " where OperationID = " + item.ID, 0, 10, function (pTabelRows) { OperationCharges_BindTableRows(pTabelRows); });
            });
    }
}
function Operations_FillChangeOperationTypeModal() {
    if ($("#tblOperationPartners tbody tr").length == 0) {
        OperationPartners_LoadWithPagingWithWhereClause($("#hOperationID").val());
        ApplySelectListSearch();
    }
    else {
        jQuery("#ChangeOperationTypeModal").modal("show");

        BLType_SetIconNameAndStyle();
        DirectionType_SetIconNameAndStyle();
        TransportType_SetIconNameAndStyle();


        $("#lblChangeOperationTypeShown").html(": " + $("#hOperationCode").val());
        if ($("#hBLType").val() == constDirectBLType) {
            $("#cbIsDirect").prop("checked", true);
            $("#hBLTypeIconName").val(DirectIconName);
            $("#hBLTypeIconStyle").val(strDirectIconStyleClassName);
        }
        else if ($("#hBLType").val() == constHouseBLType) {
            $("#cbIsHouse").prop("checked", true);
            $("#hBLTypeIconName").val(HouseIconName);
            $("#hBLTypeIconStyle").val(strHouseIconStyleClassName);
        } else { //Master
            $("#cbIsMaster").prop("checked", true);
            $("#hBLTypeIconName").val(MasterIconName);
            $("#hBLTypeIconStyle").val(strMasterIconStyleClassName);
        }


        if ($("#hDirectionType").val() == constImportDirectionType) {
            $("#cbIsImport").prop("checked", true)
            $("#hDirectionIconName").val(ImportIconName);
            $("#hDirectionIconStyle").val(strImportIconStyleClassName);
        }
        else if ($("#hDirectionType").val() == constExportDirectionType) {
            $("#cbIsExport").prop("checked", true);
            $("#hDirectionIconName").val(ExportIconName);
            $("#hDirectionIconStyle").val(strExportIconStyleClassName);
        }
        else if ($("#hDirectionType").val() == constDomesticDirectionType) { //Domestic
            $("#cbIsDomestic").prop("checked", true);
            $("#hDirectionIconName").val(DomesticIconName);
            $("#hDirectionIconStyle").val(strDomesticIconStyleClassName);
        }
        else if ($("#hDirectionType").val() == constCrossBookingDirectionType) { //CrossBooking
            $("#cbIsCrossBooking").prop("checked", true);
            $("#hDirectionIconName").val(CrossBookingIconName);
            $("#hDirectionIconStyle").val(strCrossBookingIconStyleClassName);
        }
        else if ($("#hDirectionType").val() == constReExportDirectionType) { //ReExport
            $("#cbIsReExport").prop("checked", true);
            $("#hDirectionIconName").val(ReExportIconName);
            $("#hDirectionIconStyle").val(strReExportIconStyleClassName);
        }


        if ($("#hTransportType").val() == OceanTransportType) {
            $("#cbIsOcean").prop("checked", true);
            $("#hTransportIconName").val(OceanIconName);
            $("#hTransportIconStyle").val(strOceanIconStyleClassName);
            $("#divOceanType").removeClass("hide");
            $("#divInlandType").addClass("hide");
        }
        else if ($("#hTransportType").val() == AirTransportType) {
            $("#cbIsAir").prop("checked", true);
            $("#hTransportIconName").val(AirIconName);
            $("#hTransportIconStyle").val(strAirIconStyleClassName);
        }
        else { //Inland
            $("#cbIsInland").prop("checked", true);
            $("#hTransportIconName").val(InlandIconName);
            $("#hTransportIconStyle").val(strInlandIconStyleClassName);
            $("#divOceanType").addClass("hide");
            $("#divInlandType").removeClass("hide");
        }


        if ($("#hShipmentType").val() == constFCLShipmentType)
            $("#cbIsFCL").prop("checked", true)
        else if ($("#hShipmentType").val() == constLCLShipmentType)
            $("#cbIsLCL").prop("checked", true);
        else if ($("#hShipmentType").val() == constFTLShipmentType)
            $("#cbIsFTL").prop("checked", true);
        else if ($("#hShipmentType").val() == constLTLShipmentType)
            $("#cbIsLTL").prop("checked", true);
        else if ($("#hShipmentType").val() == constConsolidationShipmentType)
            $("#cbIsConsolidation").prop("checked", true);
        else if ($("#hShipmentType").val() == constFlexiShipmentType)
            $("#cbIsFlexi").prop("checked", true);
        else if ($("#hShipmentType").val() == constTankShipmentType)
            $("#cbIsTank").prop("checked", true);
        else if ($("#hShipmentType").val() == constVehicleShipmentType)
            $("#cbIsVehicle").prop("checked", true);
        else if ($("#hShipmentType").val() == constBulkShipmentType)
            $("#cbIsBulk").prop("checked", true);

        if ($("#cbIsAir").prop('checked'))
            $("#secShipmentType").addClass('hide');
        else
            $("#secShipmentType").removeClass('hide');

        if ($("#cbIsMaster").prop('checked'))
            $("#divConsolidationOption").removeClass('hide');
        else
            $("#divConsolidationOption").addClass('hide');

        if (pDefaults.UnEditableCompanyName == "GHA")
            $("#cbIsVehicle").parent().removeClass('hide');
        debugger;

    }
}
function Operations_ChangeOperationType() {
    debugger;
    // load OperationContainersAndPackages first because it is needed in the following checks
    OperationContainersAndPackages_SubmenuTabClicked();

    if ($("#hNumberOfHousesConnected").val() > 0 || $("#hMasterOperationID").val() > 0) {
        swal(strSorry, "Operation is connected. Remove any Houses connections then try again.");
    } else if ($('#tblOperationContainersAndPackages tr').length > 1
        && ($('input[name=cbTransportType]:checked').val() != $("#hTransportType").val()
            || ($('input[name=cbShipmentType]:checked').val() != $("#hShipmentType").val() && $('input[name=cbTransportType]:checked').val() != 2))) {
        // this message appears only if there is a change in either Transport Type or Ship.Type
        // && $('input[name=cbTransportType]:checked').val() != 2 >> this is because when air, there is no shipmenttype
        swal(strSorry, "Remove Cargo, then try again.");
    } else if (($("#tblOperationPartners tr:has(.PartnerType[val=" + constShipperOperationPartnerTypeID + "]) .PartnerName").attr("val") == undefined || $("#tblOperationPartners tr:has(.PartnerType[val=" + constShipperOperationPartnerTypeID + "]) .PartnerName").attr("val") == 0)
        && ($("#cbIsExport").prop("checked") || $("#cbIsDomestic").prop("checked")) && !$("#cbIsMaster").prop("checked")) {
        swal(strSorry, "Please, Enter SHIPPER in the Partners tab, then try again.");
    } else if (($("#tblOperationPartners tr:has(.PartnerType[val=" + constConsigneeOperationPartnerTypeID + "]) .PartnerName").attr("val") == undefined || $("#tblOperationPartners tr:has(.PartnerType[val=" + constConsigneeOperationPartnerTypeID + "]) .PartnerName").attr("val") == 0)
        && $("#cbIsImport").prop("checked") && !$("#cbIsMaster").prop("checked")) {
        swal(strSorry, "Please, Enter the CONSIGNEE in the Partners tab, then try again.");
    } else if (($("#tblOperationPartners tr:has(.PartnerType[val=" + constAgentOperationPartnerTypeID + "]) .PartnerName").attr("val") == undefined || $("#tblOperationPartners tr:has(.PartnerType[val=" + constAgentOperationPartnerTypeID + "]) .PartnerName").attr("val") == 0)
        && $("#cbIsMaster").prop("checked")) {
        swal(strSorry, "Please, Enter the AGENT in the Partners tab, then try again.");
    } else { //update type
        //var pNewOperationCode = "O" + (CurrentYear - 2000) + "-" + GetDirectionType($('input[name=cbDirectionType]:checked').val()).substring(0, 3) + "-"
        //                            + GetTransportType($('input[name=cbTransportType]:checked').val()).substring(0, 2) + "-" + $("#hCodeSerial").val();
        var pNewOperationCode = $("#hOperationCode").val().substring(0, 3) + "-" + GetDirectionType($('input[name=cbDirectionType]:checked').val()).substring(0, 3) + "-"
            + GetTransportType($('input[name=cbTransportType]:checked').val()).substring(0, 2) + "-" + $("#hCodeSerial").val();
        swal({
            title: "Are you sure?",
            text: "Operation " + $("#hOperationCode").val() + " will be changed to " + pNewOperationCode + ". Note that you must change the house number and re-enter the routing data manually.",
            type: "",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Continue.",
            closeOnConfirm: true
        },
            //callback function in case of success
            function () {
                var pParametersWithValues = {
                    "pOperationID": $("#hOperationID").val()
                    , "pNewOperationCode": pNewOperationCode
                    , "pBLType": $('input[name=cbBLType]:checked').val()
                    , "pBLTypeIconName": $("#hBLTypeIconName").val()
                    , "pBLTypeIconStyle": $("#hBLTypeIconStyle").val()

                    , "pDirectionType": $('input[name=cbDirectionType]:checked').val()
                    , "pDirectionIconName": $("#hDirectionIconName").val()
                    , "pDirectionIconStyle": $("#hDirectionIconStyle").val()

                    , "pTransportType": $('input[name=cbTransportType]:checked').val()
                    , "pTransportIconName": $("#hTransportIconName").val()
                    , "pTransportIconStyle": $("#hTransportIconStyle").val()

                    , "pShipmentType": $("#cbIsAir").prop("checked") ? 0 : $('input[name=cbShipmentType]:checked').val()
                };
                CallGETFunctionWithParameters("/api/Operations/ChangeOperationType", pParametersWithValues
                    , function () { SwitchToOperationsEditView($("#hOperationID").val()); jQuery("#ChangeOperationTypeModal").modal("hide"); }
                    , null /*function (data) { debugger; swal("Success", data[0]); }*/);
            });
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
//function Operations_Delete(pID) {
//    DeleteListFunction("/api/Operations/DeleteByID", { "pID": pID }, function () { Operations_LoadingWithPaging(); });
//}
function Operations_DeleteList() {
    debugger;
    //Confirmation message to delete
    var pDeletedOperationsIDs = GetAllSelectedIDsAsString('tblOperations');
    if (pDeletedOperationsIDs != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of pressing "Yes, delete"
            function () {
                CallGETFunctionWithParameters("/api/Operations/Delete", { "pDeletedOperationsIDs": pDeletedOperationsIDs }
                    , function (pData) {
                        if (pData[0] != "") {
                            showDeleteFailMessage = true;
                            strDeleteFailMessage = pData[0];
                        }
                        else
                            swal("Success", "Deleted successfully.");
                        Operations_LoadingWithPaging();
                    }
                    , null);
                //DeleteListFunction("/api/Operations/Delete", { "pDeletedOperationsIDs": pDeletedOperationsIDs }, function () {
                //    Operations_LoadingWithPaging(
                //        //this is callback in Operations_LoadingWithPaging
                //        //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.");}
                //        );
                //});
                ////swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.");
            });
}
function Operations_ClearAllControls(callback) {
    debugger;
    ClearAll("#OperationModal");
    $(".classAWBFields").addClass("hide");
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $("#slLines").attr('data-required', 'false');
        //$("#slPOLCountries").attr("disabled", "disabled");
        //$("#slPODCountries").attr("disabled", "disabled");
        $("#slPOL").attr("onchange", "POL_Contry_GetList();");
        $("#slPOD").attr("onchange", "POD_Contry_GetList();");


    }
    if (IsAdminRoleID && !IsMESCOCompany)
        $("#txtOperationCloseDate").removeAttr("disabled");
    else
        $("#txtOperationCloseDate").attr("disabled", "disabled");
    $(".hideForAWB").removeClass("hide");
    $("#slPOD").parent().attr("style", "");
    $("#slMAWBStock").html("<option value=''></option>");
    $("#slMAWBStock").attr("data-required", "false");
    $("#slOperationMoveTypes").attr("data-required", "true");

    if (pDefaults.UnEditableCompanyName == "TRM") {
        $("#txtOperationCloseDate").attr("disabled", "disabled");
    }

    $("#txtOperationOpenDate").val(ConvertDateFormat(FormattedTodaysDate));

    $("#cbIsOcean").prop("checked", true);
    $("#divOperationExpectedDeparture").addClass("hide");
    $("#divOperationExpectedArrival").addClass("hide");
    $("#divOperationVessels").addClass("hide");
    $("#divOperationVoyageOrTruckNumber").addClass("hide");
    $("#divOperationMasterBL").addClass("hide");

    //$("#spanLblSlLines").text("Line/Trucker");
    //Operations_Salesmen_GetList(null, "slOperationSalesman", null);
    $("#slOperationSalesman").val("");
    Operations_Countries_GetList(null, null, null);
    POL_GetList(null, null, null);
    POD_GetList(null, null, null);
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
    if (pDefaults.UnEditableCompanyName == "MAN") {

        $('#txtOperationOpenDate').attr('disabled', 'disabled');
        $('#txtOperationOpenDate').css('background-color', '');
        $('#txtOperationCloseDate').attr('disabled', 'disabled');
    }
    $("#slOperationBranch").html($("#hReadySlBranches").html());
    ActivateUserBranchSelection('slOperationBranch');
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
                    pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsConsignee=1 AND Name like N'%" + params.term + "%' " + (pDefaults.UnEditableCompanyName == 'CFR' && $('#slOperationSalesman').val() > 0 && $('#cbIsImport').is(':checked') ? ' and SalesmanID=' + $('#slOperationSalesman').val() + '' : '') + "",
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
                    pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsShipper=1 AND Name like N'%" + params.term + "%' " + (pDefaults.UnEditableCompanyName == 'CFR' && $('#slOperationSalesman').val() > 0 && $('#cbIsExport').is(':checked') ? ' and SalesmanID=' + $('#slOperationSalesman').val() + '' : '') + "",
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

                Select2OnlineSearch("slPOD", "/api/Ports/LoadAllPortsForSlPort", function (params) {
                    debugger;
                    var query = {
                        pWhereClauseWithMinimalColumns: " WHERE Name like N'%" + params.term + "%'",
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
                }, 2, 2000);


                Select2OnlineSearch("slPOL", "/api/Ports/LoadAllPortsForSlPort", function (params) {
                    debugger;
                    var query = {
                        pWhereClauseWithMinimalColumns: " WHERE Name like N'%" + params.term + "%'",
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
                }, 2, 2000);
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
    if (pDefaults.UnEditableCompanyName != "NAJ")
        $("#divOperationMasterBL").removeClass("hide");

    $("#cbIsDirect").prop('checked', true); //set cbIsDirect to the default value
    BLType_SetIconNameAndStyle();//to set the defaults of Import

    $("#cbIsImport").prop('checked', true); //set cbIsImport to the default value
    DirectionType_SetIconNameAndStyle();//to set the defaults of Import

    $("#cbIsOcean").prop('checked', true); //set cbIsOcean to the default value
    TransportType_SetIconNameAndStyle();

    $("#secBLType").removeClass("hide");
    $("#secDirectionType").removeClass("hide");
    $("#secTransportType").removeClass("hide");
    $("#secShipmentType").removeClass("hide");//show section of Shipment Types radios(FCL,....)
    $("#cbIsFCL").prop('checked', true); //set cbIsFCL to the default value

    //Show vehicle shipment type for GhandourAuto
    if (pDefaults.UnEditableCompanyName == "GHA" || pDefaults.UnEditableCompanyName == "EVL") {
        $(".classVehicle").removeClass("hide");
    }

    if (CustomerAdd) { $("#btn-NewAddShipper").removeClass("hide"); $("#btn-NewAddConsignee").removeClass("hide"); }
    else { $("#btn-NewAddShipper").addClass("hide"); $("#btn-NewAddConsignee").addClass("hide"); }
    if (AgentAdd) $("#btn-NewAddAgent").removeClass("hide"); else $("#btn-NewAddAgent").addClass("hide");

    if (CustomerEdit) { $("#btn-EditShipper").removeClass("hide"); $("#btn-EditConsignee").removeClass("hide"); }
    else { $("#btn-EditShipper").addClass("hide"); $("#btn-EditConsignee").addClass("hide"); }
    if (AgentEdit) $("#btn-EditAgent").removeClass("hide"); else $("#btn-EditAgent").addClass("hide");

    if (pDefaults.UnEditableCompanyName == "LATT") {
        $("#btn-NewAddShipper").addClass("hide");
        $("#btn-NewAddConsignee").addClass("hide");
        $("#btn-NewAddAgent").addClass("hide");
        $("#btn-EditShipper").addClass("hide");
        $("#btn-EditConsignee").addClass("hide");
        $("#btn-EditAgent").addClass("hide");
        $("#slLines").parent().find('.input-group-addon').addClass('hide');
        $('#slOperationContainerType').attr('data-required', 'true');
        $('#txtOperationNumberOfContainers').attr('data-required', 'true');
        $('#txtOperationMasterBL').attr('data-required', 'true');
    }

    Operations_ShowHideContainerControls();
    //parameter in the next 3 lines are 1:Quotations call, 2:Operations call
    $("#btn-NewAddShipper").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddConsignee").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddAgent").attr("onclick", "Agents_ClearAllControls(1);");

    $("#btn-EditShipper").attr("onclick", "Customers_FillControlsFromOperations($('#slShippers option:selected').val(), null, 1);");
    $("#btn-EditConsignee").attr("onclick", "Customers_FillControlsFromOperations($('#slConsignees option:selected').val(), null, 1);");
    $("#btn-EditAgent").attr("onclick", "Agents_FillControlsFromOperations($('#slAgents option:selected').val(), null, 1);");
    debugger;
    if (pDefaults.UnEditableCompanyName == "EVL") {
        $("#btnSaveOperation").attr("onclick", "Operations_Insert(false, false, function (data) { if (data[3] == '') SwitchToOperationsEditViewEVL(data); else {swal('Sorry', data[3]); FadePageCover(false);} } );");//data[1]: is the pID
    } else {
        $("#btnSaveOperation").attr("onclick", "Operations_Insert(false, false, function (data) { if (data[3] == '') SwitchToOperationsEditView(data[1]); else {swal('Sorry', data[3]); FadePageCover(false);} } );");//data[1]: is the pID
    }
   
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
function Operations_ClearOperationFromQuotationModal() {
    debugger;
    /*    FadePageCover(true);*/
    if (IsMESCOCompany) {
        $("#cbIsMasterFromQuotation").prop("checked", true);
        ClearAllTableRows("tblQuotationPayables");
        ClearAllTableRows("tblQuotationReceivables");
    }
    $("#slQuotationRoutes").html("<option value=''>" + TranslateString("SelectFromMenu") + "</option>");
    //Whereclause: accepted and not expired

    /*for MESCO companies
    1- Contract Quotations should always appear and you can open as many operations as you want from it 
    2- non-contract Quotation should appear till an operation is created from it
    3- Ocean LCL Quotations shouldn't apear in create operation from quotation
    4- User can only see quotations with services linked to him EX. FCL,LCL,AIR
    5- User can only see quotations of salesmen linked to him
    */
    var pWhereClauseQRWithMinimalColumns = "WHERE " + (IsMESCOCompany ? "" : "GETDATE()<=DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ExpirationDate))) AND ") + " QuotationStageID=" + AcceptedQuoteAndOperStageID + (IsMESCOCompany ? " AND ((IsContract = 1) OR ((IsContract = 0 OR IsContract IS NULL) AND ID NOT IN (SELECT  O.QuotationRouteID FROM Operations O WHERE O.QuotationRouteID IS NOT null))) AND NOT(TransportType = 1 AND (SELECT ShipmentType FROM Quotations Q WHERE Q.ID = QuotationID) = 2) AND ServiceID IN(SELECT ServiceID FROM crmUserServices WHERE UserID = " + pLoggedUser.ID + ") AND SalesmanID IN (SELECT SalesmanID From crmUserSalesmen WHERE UserID = " + pLoggedUser.ID + ")" : "");
    //var pWhereClauseQRWithMinimalColumns = "WHERE " + (IsMESCOCompany ? "ID NOT IN (SELECT  O.QuotationRouteID FROM Operations O WHERE O.QuotationRouteID IS NOT null) AND " : "GETDATE()<=DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ExpirationDate))) AND ") + " QuotationStageID=" + AcceptedQuoteAndOperStageID;
    //CallGETFunctionWithParameters("/api/Quotations/QR_LoadAllWithMinimalColumns",
    //    { pWhereClauseQRWithMinimalColumns: pWhereClauseQRWithMinimalColumns, pOrderBy: "ID DESC" }
    //    , function (pData) {
    //        if (pData[0])
    //            FillListFromObject(null, 20, TranslateString("SelectFromMenu"), "slQuotationRoutes", pData[1], null);
    //        $("#slQuotationRoutes").css({ "width": "100%" }).select2();
    //        $("div[tabindex='-1']").removeAttr('tabindex');
    //        FadePageCover(false);
    //    }, null);
    $("div[tabindex='-1']").removeAttr('tabindex');
    Select2OnlineSearch("slQuotationRoutes", "/api/Quotations/QR_LoadAllWithMinimalColumns", function (params) {
        var query = {
            pWhereClauseQRWithMinimalColumns: (pWhereClauseQRWithMinimalColumns + " AND Code LIKE  N'%" + params.term + "%'")
            , pOrderBy: "Code"
        }
        return query;
    }, function (data) {
        var QuotationRoutes = JSON.parse(data[1]);
        return {

            results: $.map(QuotationRoutes, function (item) {
                return {
                    text: item.Code + ' - ' + item.ClientName + ' (' + item.POLName + ' TO ' + item.PODName + ')',
                    id: item.ID,
                    value: item.ID
                };
            })
        };
    }, 3, 1000);
}
//i take here a parameter of a table with just one row instead of ID
function Operations_FillControls(pOperationHeader, pIsOperationClosed, pDocsInFileNames, pOperationStages, pBranches, pUsers, pIncoterms, pPOrC, pMoveTypes, pCommodities, pInvoiceTypes, pNetwork, pSuppliers, pMasterAndHouses, pVessels, ClientPickUpAddress, ClientDeliveryAddress, ClientOtherAddress, ClientContactDetails, Salesmen, Categories, pShipLinePayables, PAgentPayables, pTruckerPayables, pAirLinePayables, pCustodyPayables, pContainers, pDocsInFileNamesPayables=[]) {
    ////////////////Header//////////////////////
    debugger;
    debugger;
    debugger;
    debugger;
    debugger;
    debugger;
    debugger;
    debugger;
    debugger;
    debugger;
    debugger;
    debugger;
    debugger;
    debugger;
    debugger;
    if (pDefaults.UnEditableCompanyName == "GHA") {
        $("#labMoveT").text("O.P Type");
        $("#labComm").text("Market-Config");
    }
    if ($("#hf_CanAdd").val() != "1" && pDefaults.UnEditableCompanyName == "MED") {
        $("#CommoditeHideMED").addClass("hide");
        $("#CommoditeHideMED2").addClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "NIL") {
        $('.showForNIL').removeClass('hide');
        $('.hideForNIL').addClass('hide');
    }
    $("#slDocsOutOperations").html("<option value=" + pOperationHeader.ID + "></option>");
    var h5Label = "";
    if (pOperationHeader.IsFreightApproved) {
        if ($("#hf_ChangeLanguage").val() == "en")
            h5Label += "<u>Freight set done on</u> " + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.FreightApprovalDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.FreightApprovalDate)) : "");
        else
            h5Label += (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.FreightApprovalDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.FreightApprovalDate)) : "") + "<u>تم الشحن في </u> ";
    }
    if (pOperationHeader.IsTruckingApproved) {
        if ($("#hf_ChangeLanguage").val() == "en")
            h5Label += "&emsp;-&emsp;" + "<u>Trucking set done on</u> " + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.TruckingApprovalDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.TruckingApprovalDate)) : "");
        else
            h5Label += "&emsp;-&emsp;" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.TruckingApprovalDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.TruckingApprovalDate)) : "") + "<u>تم تحديد النقل بالشاحنات في</u> ";

    }
    if (pOperationHeader.IsClearanceApproved) {
        if ($("#hf_ChangeLanguage").val() == "en")
            h5Label += "&emsp;-&emsp;" + "<u>Clearance set done on </u> " + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ClearanceApprovalDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ClearanceApprovalDate)) : "");
        else
            h5Label += "&emsp;-&emsp;" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ClearanceApprovalDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ClearanceApprovalDate)) : "") + "<u>تم التخليص في</u> ";

    }
    $("#h5LblApprovedServices").html(h5Label);

    if (IsMESCOCompany && pOperationHeader.TransportType == AirTransportType) {
        $(".classHideForAirInMescoCompanies").addClass("hide");
    }

    if (pDefaults.UnEditableCompanyName == "MED") {
        $(".classShowForMED").removeClass("hide");
    }

    if (pDefaults.UnEditableCompanyName == "TRI") {
        $('#slOperationTransPort').val(pOperationHeader.Form13Number);
        $(".showForTRI").removeClass("hide");
        $(".hideForTRI").addClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "NAJ") {
        $(".ClassHideForNAJCompany").addClass("hide");
        $('#txtOperationCutOffDate').removeClass('datepicker-input');
        $('#txtOperationCutOffDate').addClass('datetimepicker-input');

        //format: 'DD/MM/YYYY hh:mm A',
        // Format for date and time with AM/PM useCurrent: false,
        // Will not use current date and time by default showTodayButton: true,
        // Show "Today" button in the picker showClear: true,
        // Show "Clear" button in the picker showClose: true
        // Show "Close" button in the picker


        $("#txtOperationCutOffDate").datetimepicker({
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,

            startView: 2,
            forceParse: 0,
            format: 'dd/mm/yyyy HH:ii p',
            showMeridian: 1,
            showClear: true,
            showClose: true
        });

        $('#txtOperationCutOffDate').parent().find('label').text('Cargo CutOff Date');


    }

    if (pDefaults.UnEditableCompanyName == "AKS") {
        $("#txtOperationForm13Number").parent().addClass("hide");
        $("#txtOperationACIDNumber").parent().addClass("hide");
        $("#txtOperationACIDDetails").parent().addClass("hide");
        $("#txtOperationForm13Date").parent().addClass("hide");
        $("#cbIsForm13Delivered").parent().addClass("hide");
        $("#txtOperationBusinessUnit").parent().addClass("hide");
        $("#txtShipmentACIDNumber").parent().addClass("hide");
        $("#txtOperationNotes2").parent().css("clear", "both");
    }

    if (IsMESCOCompany && pOperationHeader.DirectionType == 1) {



        $("#txtOperationForm13Number").parent().addClass("hide");


    }




    $("#hOperationIDAWB").val(pOperationHeader.ID); //for AWB
    $(".steps").children().removeClass("active");
    $(".step-pane").removeClass("active");
    $("#cbIsAWB").prop("checked", pOperationHeader.IsAWB);
    if (!pOperationHeader.IsAWB) {
        $("#General").addClass("active");
        $("#stepsGeneral").addClass("active");
    }
    else {
        $("#BillsofLading").addClass("active");
        $("#stepsBillsofLading").addClass("active");
    }
    /***************************Flexi & Tank & Vehicle*****************************/
    if (pOperationHeader.ShipmentType == constFlexiShipmentType && pOperationHeader.DirectionType == constImportDirectionType) {
        $(".classShowFlexiImport").removeClass("hide");
        $("#spanFlexiLabel").text("Flexi");
    }
    else if (pOperationHeader.ShipmentType == constFlexiShipmentType) {
        $(".classHideForFlexi").addClass("hide");
        $(".classDisableForFlexi").attr("disabled", "disabled");
        $("#spanFlexiLabel").text("Flexi");
    }
    else if (pOperationHeader.ShipmentType == constTankShipmentType) {
        $(".classShowForTank").removeClass("hide");
        $("#spanFlexiLabel").text(TranslateString("Purchase.Inv"));
    }
    else //not Flexi
        $("#spanFlexiLabel").text(TranslateString("Purchase.Inv"));

    if (OVVeh && pOperationHeader.ShipmentType == constVehicleShipmentType) {
        $(".classShowForVehicle").removeClass("hide");
    }
    else if (OVPac) {
        $(".classHideForVehicle").removeClass("hide");
    }

    if (IsMESCOCompany && pOperationHeader.CodeSerial == 7449 ) {

        $(".classShowForVehicle").removeClass("hide");


    }

    if (pOperationHeader.ShipmentType == constFlexiShipmentType && pOperationHeader.DirectionType == constExportDirectionType) {
        $(".classShowFlexiExport").removeClass("hide");
        $("#spanFlexiLabel").text("Flexi");
    }
    /***************************EOF Flexi*****************************/
    /***************************CustomsClearance*****************************/
    if (pOperationHeader.IsCustomsClearance) {
        $(".classShowForCustomsClearance").removeClass("hide");
    }
    else {
        $(".classShowForCustomsClearance").addClass("hide");
    }
    /***************************EOF CustomsClearance*****************************/
    var strShownDirection = "<i class=' fa " + pOperationHeader.DirectionIconName + " " + pOperationHeader.DirectionIconStyle + "'/>";
    var strShownTransport = "<i class=' fa " + pOperationHeader.TransportIconName + " " + pOperationHeader.TransportIconStyle + "'/>";
    if (pDefaults.UnEditableCompanyName == "MED") {
        $("#txtOperationBusinessUnit,#txtOperationBusinessUnit2").css({ 'color': 'black', 'border-style': 'solid' });
        $("#lblBusinessUnit,#lblBusinessUnit2").css({ 'color': 'black' });
        $("#txtOperationForm13Notes").val(pOperationHeader.Form13Notes == "0" ? "" : pOperationHeader.Form13Notes);
    } else if (pDefaults.UnEditableCompanyName == "NAJ") {
        $("#txtOperationBusinessUnit").addClass("hide");
        $("#txtOperationBusinessUnit").replaceWith('<select id="txtOperationBusinessUnit" name="txtOperationBusinessUnit" class="form-control input-sm" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" data-required="false"><option value = "" selected >Select</option><option value="non">Non-HAZ</option><option value="haz">HAZ</option><option value="hybrid">Hybrid</option></select > ');
        $("#lblBusinessUnit").text("Hazmat");
        $("#lblBusinessUnit").css({ 'color': 'black' });
    } else if (pDefaults.UnEditableCompanyName == "UNF") {
        $("#txtOperationBusinessUnit").parent().addClass("hide");
        $("#txtOperationBusinessUnit2").parent().addClass("hide");
    }
    debugger;
    if ($("#hf_ChangeLanguage").val() == "ar")
        FillListFromObject(null, 2, "تغيير نوع المعاملة", "slOperationStages", pOperationStages, null, pOperationHeader.OperationStageName);
    else
        FillListFromObject(null, 2, "SET AS", "slOperationStages", pOperationStages, null, pOperationHeader.OperationStageName);

    if (IsMESCOCompany)
        $('#slOperationStages option[value="120"]').remove();

    $("#hIsOperationDisabled").val(pIsOperationClosed == true || pOperationHeader.OperationStageID == CancelledQuoteAndOperStageID ? 1 : 0);
    if ($("#hf_CanEdit").val() == 1) {
        if (!IsMESCOCompany)
            $("#txtOpenDate").removeAttr("disabled");
        $("#slOperationStages").removeClass("hide");
    }
    else {
        $("#txtOpenDate").attr("disabled", "disabled"); $("#slOperationStages").addClass("hide");
    }
    //btn-ChangeOperationType
    if ($("#hf_CanEdit").val() == 1 && $("#hIsOperationDisabled").val() == false) {
        $("#btn-ChangeOperationType").removeClass("hide");
        if (pOperationHeader.TransportType == AirTransportType && !pOperationHeader.IsAWB)
            $("#btn-CallShipmentsAWB_FillControls").removeClass("hide");
    }
    else {
        $("#btn-ChangeOperationType").addClass("hide");
    }

    //if ((OEGen && !pIsOperationClosed) || IsAdminRoleID) { $("#btnSaveOperation").removeClass("hide"); $("#slOperationStages").removeClass("hide"); } else { $("#btnSaveOperation").addClass("hide"); $("#divSetOperationStage").addClass("hide"); }
    if (OEGen && $("#hIsOperationDisabled").val() == false) $("#btnSaveOperation").removeClass("hide"); else $("#btnSaveOperation").addClass("hide");
    //if (pIsOperationClosed && IsAdminRoleID) $("#btnSaveOperation").removeClass("hide");//for case of closed and admin role then dont show set operation stage
    if (pOperationHeader.BLType == constDirectBLType)
        $("#cbIsDirect").prop('checked', true);
    if (pOperationHeader.BLType == constHouseBLType) {
        $("#cbIsHouse").prop('checked', true);
        $("#hl-submenu-Master").removeClass("hide");
        $("#slLines").attr("disabled", "disabled");
    }

    if (pOperationHeader.DirectionType == 1) { //the last 2 commands are to set which is primary shipper or consignee
        $("#cbIsImport").prop('checked', true); //$("#slShippers").attr("data-required", "false"); $("#slConsignees").attr("data-required", "true");
    }
    else if (pOperationHeader.DirectionType == 2)
        $("#cbIsExport").prop('checked', true);
    else if (pOperationHeader.DirectionType == 3)
        $("#cbIsDomestic").prop('checked', true);
    else if (pOperationHeader.DirectionType == 4)
        $("#cbIsCrossBooking").prop('checked', true);
    else if (pOperationHeader.DirectionType == 5)
        $("#cbIsReExport").prop('checked', true);
    if (pOperationHeader.TransportType == OceanTransportType)
        $("#cbIsOcean").prop('checked', true);
    else if (pOperationHeader.TransportType == AirTransportType)
        $("#cbIsAir").prop('checked', true);
    else if (pOperationHeader.TransportType == InlandTransportType)
        $("#cbIsInland").prop('checked', true);

    if (pOperationHeader.ShipmentType == constFCLShipmentType)
        $("#cbIsFCL").prop('checked', true);
    else if (pOperationHeader.ShipmentType == constLCLShipmentType)
        $("#cbIsLCL").prop('checked', true);
    else if (pOperationHeader.ShipmentType == constFTLShipmentType)
        $("#cbIsFTL").prop('checked', true);
    else if (pOperationHeader.ShipmentType == constLTLShipmentType)
        $("#cbIsLTL").prop('checked', true);
    else if (pOperationHeader.ShipmentType == constConsolidationShipmentType)
        $("#cbIsConsolidation").prop('checked', true);
    else if (pOperationHeader.ShipmentType == constFlexiShipmentType)
        $("#cbIsFlexi").prop('checked', true);
    else if (pOperationHeader.ShipmentType == constTankShipmentType)
        $("#cbIsTank").prop('checked', true);
    else if (pOperationHeader.ShipmentType == constVehicleShipmentType)
        $("#cbIsVehicle").prop('checked', true);
    else if (pOperationHeader.ShipmentType == constBulkShipmentType)
        $("#cbIsBulk").prop('checked', true);

    if (pOperationHeader.BLType == constMasterBLType) {
        $("#cbIsMaster").prop('checked', true);
        $("#hl-submenu-Shipments").removeClass("hide");
        $("#hl-submenu-ACIDDetails").removeClass("hide");
        //$("#divMoveTypes").addClass("hide");
        $("#divHouseNumber").addClass("hide");
    }
    else {
        //$("#divMoveTypes").removeClass("hide");
        $("#divHouseNumber").removeClass("hide");
    }

    if (pOperationHeader.TransportType == OceanTransportType && pOperationHeader.DirectionType == 2) //Ocean & Export 
        $("#divOperationAgreedRate").removeClass("hide");
    else
        $("#divOperationAgreedRate").addClass("hide");
    //$('input[name=cbTransportType]:checked').val() //to get value of checked choice
    $("#hOperationID").val(pOperationHeader.ID);
    $("#hQuotationRouteID").val(pOperationHeader.QuotationRouteID); // incase it is build from an operation
    $("#hCodeSerial").val(pOperationHeader.CodeSerial);
    $("#hOperationCode").val(pOperationHeader.Code);
    $("#hOperationCreationYear").val(GetDateWithFormatMDY(pOperationHeader.CreationDate).split('/')[2].toString());
    $("#hHouseNumber").val(pOperationHeader.HouseNumber);
    $("#txtOperationCustomerReference").val(pOperationHeader.CustomerReference == 0 ? "" : pOperationHeader.CustomerReference);
    $("#txtOperationSupplierReference").val(pOperationHeader.SupplierReference == 0 ? "" : pOperationHeader.SupplierReference);
    $("#txtOperationReference").val(pOperationHeader.Reference == 0 ? "" : pOperationHeader.Reference);

    $("#txtOperationPONumber").val(pOperationHeader.PONumber == 0 ? "" : pOperationHeader.PONumber);
    $("#txtOperationPODate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.PODate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.PODate)));
    $("#txtOperationPOValue").val(pOperationHeader.POValue == 0 ? "" : pOperationHeader.POValue);
    $("#txtOperationReleaseNumber").val(pOperationHeader.ReleaseNumber == 0 ? "" : pOperationHeader.ReleaseNumber);
    $("#txtOperationReleaseDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ReleaseDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ReleaseDate)));
    $("#txtOperationForm13Date").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.Form13Date)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.Form13Date)));
    $("#txtOperationReleaseValue").val(pOperationHeader.ReleaseValue == 0 ? "" : pOperationHeader.ReleaseValue);
    $("#txtOperationDispatchNumber").val(pOperationHeader.DispatchNumber == 0 ? "" : pOperationHeader.DispatchNumber);
    if (pDefaults.UnEditableCompanyName == "NAJ") {
        $("#txtOperationBusinessUnit").replaceWith('<select id="txtOperationBusinessUnit" name="txtOperationBusinessUnit" class="form-control input-sm" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" data-required="false"><option value = "" selected >Select</option><option value="non">Non-HAZ</option><option value="haz">HAZ</option><option value="hybrid">Hybrid</option></select > ');
        $("#txtOperationBusinessUnit").val(pOperationHeader.BusinessUnit == 0 ? "" : pOperationHeader.BusinessUnit.toLowerCase());
    } else {
        $("#txtOperationBusinessUnit").val(pOperationHeader.BusinessUnit == 0 ? "" : pOperationHeader.BusinessUnit);
    }
    $("#txtOperationBusinessUnit2").val(pOperationHeader.BusinessUnit2 == 0 ? "" : pOperationHeader.BusinessUnit2);
    $("#txtOperationForm13Number").val(pOperationHeader.Form13Number == 0 ? "" : pOperationHeader.Form13Number);
    $("#txtOperationNumberOfOriginalBills").val(pOperationHeader.NumberOfOriginalBills == 0 ? "" : pOperationHeader.NumberOfOriginalBills);
    $("#txtOperationACIDNumber").val(pOperationHeader.ACIDNumber == 0 ? "" : pOperationHeader.ACIDNumber);
    $("#txtOperationACIDDetails").val(pOperationHeader.ACIDDetails == 0 ? "" : pOperationHeader.ACIDDetails);
    $("#txtOperationBookingNumber").val(pOperationHeader.BookingNumber == 0 ? "" : pOperationHeader.BookingNumber);
    debugger;
 
    if (pDefaults.UnEditableCompanyName == "NIL") {
        $("#slCIPStatus").val(pOperationHeader.UNNumber);
        $("#txtDeliverTo").val(pOperationHeader.DeliveryCustomer);
        $("#txtCargoOrigins").val(pOperationHeader.Form13Notes == "0" ? "" : pOperationHeader.Form13Notes);
    } else {
        $("#txtOperationUNNumber").val(pOperationHeader.UNNumber == 0 ? "" : pOperationHeader.UNNumber);
    }
    $("#txtOperationIMOClass").val(pOperationHeader.IMOClass == 0 ? "" : pOperationHeader.IMOClass);

    $("#txtOperationAgreedRate").val(pOperationHeader.AgreedRate == 0 ? "" : pOperationHeader.AgreedRate);
    ///////////////////////////////////////
    $("#hBLDate").val(ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.BLDate)));//DDMMYYYY
    $("#hVia1").val(pOperationHeader.Via1);
    $("#hVia2").val(pOperationHeader.Via2);
    $("#hVia3").val(pOperationHeader.Via3);
    ///////////////////////////////////////
    $("#hMasterBL").val(pOperationHeader.MasterBL);
    $("#hMAWBSuffix").val(pOperationHeader.MAWBSuffix == 0 ? "" : pOperationHeader.MAWBSuffix);
    $("#hMAWBStockID").val(pOperationHeader.MAWBStockID);
    $("#hBLType").val(pOperationHeader.BLType);
    $("#hBLTypeIconName").val(pOperationHeader.BLTypeIconName);
    $("#hBLTypeIconStyle").val(pOperationHeader.BLTypeIconStyle);
    $("#hDirectionType").val(pOperationHeader.DirectionType);
    $("#hDirectionIconName").val(pOperationHeader.DirectionIconName);
    $("#hDirectionIconStyle").val(pOperationHeader.DirectionIconStyle);
    $("#hTransportType").val(pOperationHeader.TransportType);
    $("#hTransportIconName").val(pOperationHeader.TransportIconName);
    $("#hTransportIconStyle").val(pOperationHeader.TransportIconStyle);
    $("#hShipmentType").val(pOperationHeader.ShipmentType);
    $("#hPOLCountryID").val(pOperationHeader.POLCountryID);
    $("#hPODCountryID").val(pOperationHeader.PODCountryID);
    $("#hPOL").val(pOperationHeader.POL);
    $("#hPOD").val(pOperationHeader.POD);
    $("#hClientEmail").val(pOperationHeader.ClientEmail);
    debugger;
    $("#hClientPickupAddress").val(ClientPickUpAddress);
    $("#hClientDeliveryAddress").val(ClientDeliveryAddress);
    $("#hClientOtherAddress").val(ClientOtherAddress);
    $("#hClientContactDetails").val(ClientContactDetails);
    $("#hClientAddress").val(pOperationHeader.ClientAddress == 0 ? "" : pOperationHeader.ClientAddress);
    $("#hPickupAddress").val(pOperationHeader.PickupAddress == 0 ? "" : pOperationHeader.PickupAddress); //to prevent clear when opening the RoutingModal
    $("#hDeliveryAddress").val(pOperationHeader.DeliveryAddress == 0 ? "" : pOperationHeader.DeliveryAddress); //to prevent clear when opening the RoutingModal
    $("#txtPickupAddress").val(pOperationHeader.PickupAddress == 0 ? "" : pOperationHeader.PickupAddress);
    $("#txtDeliveryAddress").val(pOperationHeader.DeliveryAddress == 0 ? "" : pOperationHeader.DeliveryAddress);
    $("#hShippingLineID").val(pOperationHeader.ShippingLineID);
    $("#hAirlineID").val(pOperationHeader.AirlineID);
    $("#hVoyageOrTruckNumber").val(pOperationHeader.VoyageOrTruckNumber);
    $("#hTruckerID").val(pOperationHeader.TruckerID);
    $("#hShippingLineName").val(pOperationHeader.ShippingLineName);
    $("#hAirlineName").val(pOperationHeader.AirlineName);
    $("#hTruckerName").val(pOperationHeader.TruckerName);
    $("#hETAPOLDate").val(pOperationHeader.ETAPOLDate);
    $("#hATAPOLDate").val(pOperationHeader.ATAPOLDate);
    $("#hExpectedDeparture").val(pOperationHeader.ExpectedDeparture);
    $("#hActualDeparture").val(pOperationHeader.ActualDeparture);
    $("#hExpectedArrival").val(pOperationHeader.ExpectedArrival);
    $("#hActualArrival").val(pOperationHeader.ActualArrival);
    $("#hOperationStageID").val(pOperationHeader.OperationStageID);
    $("#hMasterOperationID").val(pOperationHeader.MasterOperationID);
    $("#hNumberOfHousesConnected").val(pOperationHeader.NumberOfHousesConnected);

    $("#lblMaster").html(":" + (pOperationHeader.MasterBL == 0 ? "N/A" : pOperationHeader.MasterBL));
    $("#lblHouse").html(":" + (pOperationHeader.HouseNumber == 0 ? "N/A" : pOperationHeader.HouseNumber));

    $("#lblTotalNumberOfContainers").html(": " + pOperationHeader.ContainerTypes);

    if (pDefaults.UnEditableCompanyName == "SEF") {
        $("#lblAccountingInformation").html("Freight Payable At");
    }

    $("#btn-DownloadLogContainerOrPackage").attr("onclick", `window.location.href='/api/OperationContainersAndPackages/GetLog?pTableName=vwOperationContainersAndPackages&pOperationCode=${pOperationHeader.Code}';`)

    $("#lblOperationCode").html(":" + pOperationHeader.Code
        + (pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG" ? (" / Ref: " + pOperationHeader.ReferenceNumber) : "")
        + (pDefaults.UnEditableCompanyName == "ELI" || 1 == 1 ? (" / Oper.W.Inv.: " + pOperationHeader.OperationWithInvoiceSerial) : "")
        + (pDefaults.UnEditableCompanyName == "NEW" ? (" / Vessel: " + pOperationHeader.VesselName + " / ATA: " + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ActualArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ActualArrival)))) : ""));
    $("#lblDirection").html(strShownDirection);
    $("#lblTransport").html(strShownTransport);
    $("#lblShipmentType").html(":" + pOperationHeader.RepBLTypeShown + (pOperationHeader.ShipmentTypeCode == 0 ? " " : (" " + pOperationHeader.ShipmentTypeCode)));
    $("#lblClient").html(":" + (pOperationHeader.DirectionType == 1 ? (pOperationHeader.ConsigneeName == 0 ? "" : pOperationHeader.ConsigneeName) : (pOperationHeader.ShipperName == 0 ? "" : pOperationHeader.ShipperName)));
    //$("#lblClient").html(":" + pOperationHeader.ClientName);
    //$("#lblAgent").html(":" + (pOperationHeader.BLType == 3 ? (pOperationHeader.BookingPartyName == 0 ? (pOperationHeader.AgentName == 0 ? "" : pOperationHeader.AgentName) : pOperationHeader.BookingPartyName) : 0));
    $("#lblAgent").html(":" + pOperationHeader.AgentName == 0 ? "" : pOperationHeader.AgentName);
    $("#lblServiceScope").html(":" + (pOperationHeader.MoveTypeName == "0" ? "N/A" : pOperationHeader.MoveTypeName));
    if (pOperationHeader.BLType == constMasterBLType) {
        //$("#lblClient").addClass("hide"); $("#spanClient").addClass("hide");
        //$("#lblAgent").removeClass("hide"); $("#spanAgent").removeClass("hide");
        $("#lblHouse").addClass("hide"); $("#spanHouse").addClass("hide");
    }
    else {
        //$("#lblClient").removeClass("hide"); $("#spanClient").removeClass("hide");
        //$("#lblAgent").addClass("hide"); $("#spanAgent").addClass("hide");
        $("#lblHouse").removeClass("hide"); $("#spanHouse").removeClass("hide");
    }
    if ($("#cbIsAir").prop("checked"))
        $("#spanMaster").html("&nbsp;&nbsp;MAWB");
    else
        $("#spanMaster").html("&nbsp;&nbsp;M-B/L");
    //$("#lblStage").html(":" + pOperationHeader.OperationStageName)
    $("#lblStage").html(":" + (pIsOperationClosed
        ? "CLOSED"
        : pOperationHeader.OperationStageName
    )
    );
    $("#lblRouting").html(":" + pOperationHeader.POLCode + ">" + pOperationHeader.PODCode);
    $("#lblQuotation").html(":" + (pOperationHeader.QuotationRouteID == 0 ? "N/A" : pOperationHeader.QuotationCode) + ((Date.prototype.compareDates(GetDateWithFormatMDY(pOperationHeader.QuotationExpirationDate), GetDateWithFormatMDY(pOperationHeader.ExpectedDeparture)) < 1 || pOperationHeader.QuotationRouteID == 0 ? "" : '<span class="text-danger">(Expired)</span>')) + (pOperationHeader.FreeTime > 0 ? (" - FreeTime(" + pOperationHeader.FreeTime + ")") : ""));
    $("#lblLine").html(":" + (pOperationHeader.AirlineName == 0 ? pOperationHeader.ShippingLineName : pOperationHeader.AirlineName));// $("#hShippingLineName").val()
    $("#lblTrucker").html(":" + (pOperationHeader.TruckerName == 0 ? "N/A" : pOperationHeader.TruckerName));
    //get balance while change combo limit
    if (pOperationHeader.ClientID != "0") {
        debugger;
        $.getJSON("/api/Customers/getCustomerCreditLimitBalance", { pIsCust: 0, pCustomerID: pOperationHeader.ClientID, plimitID: 0 }, function (Result) {
            if (Result.length > 0) {
                debugger;
                $("#lblClientBalance").html(":" + Result);
            }
        });
    }
    $("#lblCutOffDate").html(":" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(pOperationHeader.CutOffDate)));
    $("#lblCreationDate").html(":" + GetFullDateTime_DD_MM_YY_hh_mm(pOperationHeader.CreationDate));
    $("#lblSalesman").html(":" + pOperationHeader.Salesman);
    $("#hShipperID").val(pOperationHeader.ShipperID); // i need to catch ShipperID and ConsigneeID coz when saving they are lost due to difference in handling partners in (Quotations and Operations)
    $("#hConsigneeID").val(pOperationHeader.ConsigneeID); // i need to catch ShipperID and ConsigneeID coz when saving they are lost due to difference in handling partners in (Quotations and Operations)
    $("#hAgentID").val(pOperationHeader.AgentID); // i need to catch ShipperID and ConsigneeID coz when saving they are lost due to difference in handling partners in (Quotations and Operations)
    $("#hShipperContactID").val(pOperationHeader.ShipperContactID); // i need to catch ShipperID and ConsigneeID coz when saving they are lost due to difference in handling partners in (Quotations and Operations)
    $("#hConsigneeContactID").val(pOperationHeader.ConsigneeContactID); // i need to catch ShipperID and ConsigneeID coz when saving they are lost due to difference in handling partners in (Quotations and Operations)
    $("#hAgentContactID").val(pOperationHeader.AgentContactID); // i need to catch ShipperID and ConsigneeID coz when saving they are lost due to difference in handling partners in (Quotations and Operations)
    ////////////////EOF Header//////////////////////
    ////////////////General/////////////////////////
    $("#txtOperationCode").val(pOperationHeader.Code);
    $("#txtOpenedBy").val(pOperationHeader.OpenedBy);
    $("#txtOpenDate").val(ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.OpenDate)));
    $("#txtCloseDate").val(ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.CloseDate)));
    if (pDefaults.UnEditableCompanyName == 'NAJ') {
        $("#txtOperationCutOffDate").val(GetFullDateTime_DD_MM_YY(pOperationHeader.CutOffDate).replaceAll("-", "/"));
        CallGETFunctionWithParameters("/api/Operations/LoadWithWhereClause", {
            pIsLoadArrayOfObjects: false,
            pPageNumber: 1,
            pPageSize: 1,
            pWhereClause: "WHERE ID=" + pOperationHeader.ID,
            pIsBindTableRows: true,
            pWhereClause_Routings: "0",
            pOrderBy: "ID",
            pCallingControl: "Operations"
        }, function (pData) {
            let OP = JSON.parse(pData[0]);
            debugger;
            $("#txtOperationSIDate").val(GetFullDateTime_DD_MM_YY_OP(OP[0].UnloadingDate));
        });
    }
    else
        $("#txtOperationCutOffDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.CutOffDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.CutOffDate)));
    $("#txtFileAccountingDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.FileAccountingDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.FileAccountingDate)));
    $("#cbIsForm13Delivered").prop("checked", pOperationHeader.IsDelivered);
    //$("#cbIsTrucking").prop("checked", pOperationHeader.IsTrucking);
    //$("#cbIsInsurance").prop("checked", pOperationHeader.IsInsurance);
    $("#cbIsClearance").prop("checked", pOperationHeader.IsClearance);
    $("#cbPrintAsBosla,#cbPrintAsBosla_general").prop("checked", pOperationHeader.IsBosla);
    $("#cbPrintAsCertificate,#cbPrintAsCertificate_general").prop("checked", pOperationHeader.IsCertificate);
    //$("#cbIsGenset").prop("checked", pOperationHeader.IsGenset);
    //$("#cbIsCourrier").prop("checked", pOperationHeader.IsCourrier);
    //$("#cbIsTelexRelease").prop("checked", pOperationHeader.IsTelexRelease);
    $("#txtOperationQRNotes").val(pOperationHeader.QRNotes);
    if (pOperationHeader.QRNotes == "")
        $("#divOperationQRNotes").addClass("hide");
    else
        $("#divOperationQRNotes").removeClass("hide");

    FillListFromObject(pOperationHeader.BranchID, 2, null, "slOperationEditBranch", pBranches
        , function () {
            if (pDefaults.UnEditableCompanyName == "SAF") {
                $("#lblOperationEditBranch").text("B.P.");//BusinessPlan
                $("#slOperationEditBranch option:contains('IACC')").addClass("hide");
                $("#slOperationEditBranch option:contains('TL')").addClass("hide");
            }
            else if (pDefaults.UnEditableCompanyName == "MED") {
                $('#slOperationEditBranch').prop('disabled', false);
            }
            ActivateUserBranchSelection('slOperationEditBranch');
        });

    //$("#slOperationEditBranch").html($("#hReadySlBranches").html()); $("#slOperationEditBranch").val(pOperationHeader.BranchID);
    var _Salesmentemp = JSON.parse(pUsers);
    var pSalesmen = jQuery.grep(_Salesmentemp, function (_Salesmentemp) {
        return _Salesmentemp.IsSalesman == true;
    });

    if (IsMESCOCompany) {
        FillListFromObject(pOperationHeader.SalesmanID, 2, "<--Select-->", "slOperationEditSalesman", Salesmen, null)
    } else {
        FillListFromObject(pOperationHeader.SalesmanID, 2, "<--Select-->", "slOperationEditSalesman", JSON.stringify(pSalesmen), function () {
            if (IsNull(pDefaults.ShowUserSalesmen, "false") == true)
                $('#slOperationEditSalesman').trigger("change");
        });
    }
    if (pDefaults.UnEditableCompanyName == "BED") {
        debugger;
        let tempu = jQuery.grep(JSON.parse(pUsers), function (_U) {
            return ([5, 10, 16].includes(_U.DepartmentID));
        });
        let pUsers2 = JSON.stringify(tempu);

        FillListFromObject(pOperationHeader.OperationManID, 2, "<--Select-->", "slOperationEditOperationMan", pUsers2, null);
    } else {
        FillListFromObject(pOperationHeader.OperationManID, 2, "<--Select-->", "slOperationEditOperationMan", pUsers, null);
    }
    FillListFromObject(pOperationHeader.IncotermID, 2, "Select Incoterm", "slIncoterms", pIncoterms
        , function () { $("#slShipmentIncoterm").html($("#slIncoterms").html()); });
    FillListFromObject(pOperationHeader.POrC, 2, "Select Freight Type", "slOperationPOrC", pPOrC, null);
    if (IsMESCOCompany)
        $("#slOperationPOrC option[value='40']").remove();
    FillListFromObject(null, 2, "<--Select-->", "hReadyCategories", Categories, null);
    FillListFromObject(pOperationHeader.MoveTypeID, 2, "Select Service Scope", "slMoveTypes", pMoveTypes
        , function () { $("#slOperationMoveTypes").html($("#slMoveTypes").html()); });

    let CodeOrNameforslCommodities = 4;     // NameAndCode
    FillListFromObject(pOperationHeader.CommodityID, CodeOrNameforslCommodities, "Select Commodity", "slCommodities", pCommodities
        , function () {
            $("#slDocsOutCommodity").html($("#slCommodities").html());
            $("#slCommodities2").html($("#slCommodities").html());
            $("#slCommodities3").html($("#slCommodities").html());
            $("#slDocsOutCommodity").val("");
        });

    $("#slCommodities").css({ "width": "100%" }).select2();
    $("#slCommodities").trigger("change");
    $("#slCommodities2").css({ "width": "100%" }).select2();
    $("#slCommodities2").trigger("change");
    $("#slCommodities3").css({ "width": "100%" }).select2();
    $("#slCommodities3").trigger("change");
    $("#slOperationVesselID").css({ "width": "100%" }).select2();
    $("#slOperationVesselID").trigger("change");
    $("div[tabindex='-1']").removeAttr('tabindex');


    $("#slCommodities2").val(pOperationHeader.CommodityID2 == 0 ? "" : pOperationHeader.CommodityID2).trigger("change");
    $("#slCommodities3").val(pOperationHeader.CommodityID3 == 0 ? "" : pOperationHeader.CommodityID3).trigger("change");

    if (pDefaults.UnEditableCompanyName == "UNF") {
        FillListFromObject(pOperationHeader.NetworkID, 2, "Select Feeder", "slOperationNetwork", pVessels, null);
    }
    else if (pDefaults.UnEditableCompanyName == "CFR") {
        debugger;
        FillListFromObject(pOperationHeader.NetworkID, 2, "Select Network", "slOperationNetwork", pNetwork, null);

        let networks = JSON.parse(pNetwork);
        if (networks.length == 1) {
            let selectedID = networks[0].ID;
            $("#slOperationNetwork").val(selectedID);
        }
       
    }
    else {
        FillListFromObject(pOperationHeader.NetworkID, 2, "Select Network", "slOperationNetwork", pNetwork, null);
    }

    debugger;
    var pSupplierPayables = JSON.parse(pSuppliers);
    var PAgentPayablesString = JSON.parse(PAgentPayables);
    var ppShipLinePayableslesString = JSON.parse(pShipLinePayables);
    var pTruckerPayablesString = JSON.parse(pTruckerPayables);
    var pAirLinePayablesString = JSON.parse(pAirLinePayables);
    var pCustodyPayablesString = JSON.parse(pCustodyPayables);
    var pCustodyPayablesString = JSON.parse(pCustodyPayables);
    var ALLSupplier = PAgentPayablesString.concat(ppShipLinePayableslesString).concat(pTruckerPayablesString).concat(pAirLinePayablesString).concat(pCustodyPayablesString).concat(pSupplierPayables);
    var result = JSON.stringify(ALLSupplier)
    FillListFromObject(null, 2, "Select Suppliers", "slSupplierFilterPayables", result, null);
    FillListFromObject(pOperationHeader.VesselID, 2, "Select Vessel", "slOperationVesselID", pVessels, null);

    $("#txtTransientTime").val(pOperationHeader.TransientTime == "0" ? "" : pOperationHeader.TransientTime);
    $("#txtOperationNumberOfPackages").val(pOperationHeader.NumberOfPackages == "0" ? "" : pOperationHeader.NumberOfPackages);
    $("#txtHouseNumber").val(pOperationHeader.HouseNumber == "0" ? "" : pOperationHeader.HouseNumber);
    $("#txtOperationNotes").val(pOperationHeader.Notes == "0" ? "" : pOperationHeader.Notes);
    $("#txtOperationNotes2").val(pOperationHeader.Notes2 == "0" ? "" : pOperationHeader.Notes2);

    $("#lblTotalGrossWeight").html(": " + pOperationHeader.GrossWeightSum);
    $("#lblTotalVolume").html(": " + pOperationHeader.VolumeSum);
    $("#lblChargeableWeight").html(": " + pOperationHeader.ChargeableWeightSum);
    $("#lblTotalNumberOfPackages").html(": " + pOperationHeader.NumberOfPackages);
    $("#slslOperationNetwork").trigger("change");
    ////////////////EOF General/////////////////////////


    ////////////////Receivables & Receivables/////////////////////////
    if (OVPay || OVRec || OVInv || OVNot || OVDoc) {
        //ReceivablesLcl_BindTableRows(pReceivables);
        if ($("#hf_ChangeLanguage").val() == "ar") {
            FillListFromObject(null, 2, "نوع الفاتورة الإفتراضي", "slReceivableInvoiceTypes", pInvoiceTypes, null);
        } else {
            FillListFromObject(null, 2, "Inv.Type Defaults", "slReceivableInvoiceTypes", pInvoiceTypes, null);
        }
        CallGETFunctionWithParameters("/api/OperationContainersAndPackages/LoadAllTanks"
            , {
                pPageNumber: 1
                , pPageSize: 999999
                , pWhereClauseForTank: "WHERE OperationID=" + $("#hOperationID").val() + (pOperationHeader.ShipmentType == constTankShipmentType ? " AND TankOrFlexiNumber IS NOT NULL AND TankOrFlexiNumber<>'' " : " AND ContainerNumber IS NOT NULL AND ContainerNumber<>'' ")
                , pOrderBy: "TankOrFlexiNumber"
            }
            , function (pData_Tank) {
                debugger;
                var pTank = pData_Tank[0];
                if (pOperationHeader.ShipmentType == constTankShipmentType)
                    FillListFromObject(null, 1, "<--Select Tank-->", "slSearchTankInPayables", pTank
                        , function () { $("#slSearchTankInReceivables").html($("#slSearchTankInPayables").html()); });
                else FillListFromObject(null, 11, "<--Select Container-->", "slSearchTankInPayables", pTank
                    , function () { $("#slSearchTankInReceivables").html($("#slSearchTankInPayables").html()); });
            }
            , null);
    }

    ////////////////DocsOut/////////////////////////
    ////DocsOut_LoadAll(item.ID);
    if (OVDoc) {
        //    DocsOut_BindTableRows(pDocsOut);
        if (pMasterAndHouses.length > 0)
            DocsOut_FillMasterAndHouses(pMasterAndHouses, "slDocsOutOperations", null, null);//Parameters: (pListItems, pSlName, pStrFirstRow)
        else
            $("#slDocsOutOperations").html('<option value="' + pOperationHeader.ID + '" OperationCode="' + pOperationHeader.Code + '" HouseNumber="' + pOperationHeader.HouseNumber + '" ClientEmail="' + (pOperationHeader.ClientEmail == 0 ? "" : pOperationHeader.ClientEmail) + '" selected >' + /*item.EffectiveOperationCode +*/ (pOperationHeader.BLType != 2 ? ('(MBL:' + (pOperationHeader.MasterBL == 0 ? "" : pOperationHeader.MasterBL) + ')') : ('(HBL:' + (pOperationHeader.HouseNumber == 0 ? "" : pOperationHeader.HouseNumber) + ')')) + '</option>');



        if (pContainers.length > 0)
            FillListFromObject(null, 11, "<--Select-->", "slDocsOutContainers", pContainers, null);

        if (pDefaults.UnEditableCompanyName == 'TRGL') {


            $('#slDocsOutContainers').parent().removeClass('hide');


        }
    }
    ////////////////EOF DocsOut/////////////////////////
    ////////////////DocsIn/////////////////////////
    //DocsIn_LoadAll(pOperationHeader.ID);
    if (OVDocIn) {
        DocsIn_BindTableRows(pDocsInFileNames);
    }
    if (OVDocInP) {
        DocsIn_BindTableRows(pDocsInFileNamesPayables,true);
    }
    ////////////////EOF DocsIn/////////////////////////
    if (pDefaults.UnEditableCompanyName == "NEW")
        Certificate_GetCertificateHousesAndGrossWeight(pOperationHeader.ID);
    if (pOperationHeader.OperationStageID == 65 && pLoggedUser.DepartmentID == 8 && pDefaults.UnEditableCompanyName == "MED") {
        debugger;
        $("#btn-ChangeOperationType").addClass("hide");
        $("#btnSaveOperation").addClass("hide");
        $("#btn-AddOperationPartners").addClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "MAN") {

        $('#txtOpenDate').attr('disabled', 'disabled');
        //$('#txtOperationOpenDate').css('background-color', '');
        $('#txtCloseDate').attr('disabled', 'disabled');
    }



}
function Operations_FillCopyOperationModal(pOperationID) {
    var tr = $("#tblOperations tr[ID='" + pOperationID + "']");
    $("#lblCopyOperationShown").html(": " + $(tr).find("td.Code").text());
    //$("#cbIncludeReceivables").prop("checked", false);
    //$("#cbIncludePayables").prop("checked", false);
    $("#hOperationToCopyID").val(pOperationID);
    $("#txtShipmentNumberOfCopies").val(1);
}
function Operations_FlexiGuaranteeLetter_FillControls(pOption) {
    debugger;
    var pOperationIDForGuaranteeLetter = 0;
    if (pOption == 10)
        pOperationIDForGuaranteeLetter = $("#hOperationID").val();
    else if (pOption == 20)
        pOperationIDForGuaranteeLetter = $("#hShipmentID").val();
    if (pOperationIDForGuaranteeLetter == "")
        swal("Sorry", "Please, save house first.");
    else {
        ClearAll("#GuaranteeLetterModal");
        FadePageCover(true);
        jQuery("#GuaranteeLetterModal").modal("show");
        var pParametersWithValues = {
            pOperationIDForGuaranteeLetter: pOperationIDForGuaranteeLetter
        };
        CallGETFunctionWithParameters("/api/Operations/LoadGuaranteeLetterData"
            , pParametersWithValues
            , function (pData) {
                $("#btn-SaveGuaranteeLetter").attr("onclick", "GuaranteeLetter_Save(" + pOperationIDForGuaranteeLetter + ");")
                var pOperationHeader = JSON.parse(pData[0]);
                var pBankAccount = pData[1];
                $("#txtGuaranteeLetterNumber").val(pOperationHeader.GuaranteeLetterNumber);
                $("#txtGuaranteeLetterDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.GuaranteeLetterDate)) < 1 ? getTodaysDateInddMMyyyyFormat() : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.GuaranteeLetterDate)));
                $("#txtGuaranteeLetterAmount").val(pOperationHeader.GuaranteeLetterAmount);
                $("#txtGuaranteeLetterSupplierReference").val(pOperationHeader.SupplierReference);
                $("#txtGuaranteeLetterPONumber").val(pOperationHeader.PONumber);
                FillListFromObject(pOperationHeader.BankAccountID, 2, "<--Select-->", "slGuaranteeLetterBankAccount", pBankAccount, null);
                $("#txtGuaranteeLetterNotes").val(pOperationHeader.GuaranteeLetterNotes);
                FadePageCover(false);
            }
            , null);
    }
}
function GuaranteeLetter_Save(pOperationIDForGuaranteeLetter) {
    debugger;
    FadePageCover(true);
    var pParametersWithValues = {
        pOperationIDForGuaranteeLetter: pOperationIDForGuaranteeLetter
        , pGuaranteeLetterNumber: $("#txtGuaranteeLetterNumber").val().trim() == "" ? 0 : $("#txtGuaranteeLetterNumber").val().trim().toUpperCase()
        , pGuaranteeLetterDate: ($("#txtGuaranteeLetterDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtGuaranteeLetterDate").val().trim()))
        , pGuaranteeLetterAmount: $("#txtGuaranteeLetterAmount").val().trim() == "" ? 0 : $("#txtGuaranteeLetterAmount").val().trim().toUpperCase()
        , pSupplierReference: $("#txtGuaranteeLetterSupplierReference").val().trim() == "" ? 0 : $("#txtGuaranteeLetterSupplierReference").val().trim().toUpperCase()
        , pPONumber: $("#txtGuaranteeLetterPONumber").val().trim() == "" ? 0 : $("#txtGuaranteeLetterPONumber").val().trim().toUpperCase()
        , pBankAccountID: $("#slGuaranteeLetterBankAccount").val() == "" ? 0 : $("#slGuaranteeLetterBankAccount").val()
        , pGuaranteeLetterNotes: $("#txtGuaranteeLetterNotes").val().trim() == "" ? 0 : $("#txtGuaranteeLetterNotes").val().trim().toUpperCase()
    };
    CallGETFunctionWithParameters("/api/Operations/SaveGuaranteeLetter", pParametersWithValues
        , function (pData) {
            var _ReturnedMessage = pData[0];
            if (_ReturnedMessage == "") {
                $("#txtOperationSupplierReference").val($("#txtGuaranteeLetterSupplierReference").val());
                $("#txtOperationPONumber").val($("#txtGuaranteeLetterPONumber").val());
                swal("Success", "Saved successfully.");
                jQuery("#GuaranteeLetterModal").modal("hide");
            }
            else
                swal("Sorry", _ReturnedMessage);
            FadePageCover(false);
        }
        , null);
}
function Operations_Copy() {
    debugger;
    var pParametersWithValues = {
        "pOperationToCopyID": $("#hOperationToCopyID").val()
        , "pIncludePayables": $("#cbIncludePayables").prop("checked")
        , "pIncludeReceivables": $("#cbIncludeReceivables").prop("checked")
    };
    //Confirmation message to delete
    swal({
        title: "Are you sure?",
        text: "Operation" + $("#lblCopyOperationShown").html() + " will be copied."
            + " Note: If exchange rate is not entered for any charge currency, then you have to add it manually in the operation.",
        type: "",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Copy.",
        closeOnConfirm: true
    },
        //callback function in case of success
        function () {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/Operations/CopyOperation", pParametersWithValues
                , function (data) {
                    if (data[0])
                        SwitchToOperationsEditView(data[1]/*NewOperationID*/);
                    else if (data[2] != null || data[2] != undefined) {
                        FadePageCover(false);
                        swal("Sorry", data[2]);
                    }
                    else {
                        FadePageCover(false);
                        swal("Sorry", "Please, ensure that partners are not inactive.");
                    }
                }
                , null);
        });
}
//used when calling OperationEdit
function Operations_SaveFilters() {
    debugger;
    //glbOperationTransportFilter = $("#lbl-filter-ocean").hasClass('active')
    //                         ? 1
    //                         : ($("#lbl-filter-air").hasClass('active')
    //                            ? 2
    //                            : ($("#lbl-filter-inland").hasClass('active') ? 3 : 0)
    //                           );
    //glbOperationDirectionFilter = $("#lbl-filter-import").hasClass('active')
    //                         ? 1
    //                         : ($("#lbl-filter-export").hasClass('active')
    //                            ? 2
    //                            : ($("#lbl-filter-domestic").hasClass('active') ? 3 : 0)
    //                           );
    //glbOperationBLTypeFilter = $("#lbl-filter-direct").hasClass('active')
    //                         ? 1
    //                         : ($("#lbl-filter-house").hasClass('active')
    //                            ? 2
    //                            : ($("#lbl-filter-master").hasClass('active') ? 3 : 0)
    //                           );
    ////glbOperationStageFilter = $("#ulOperationStages li[class=active]").val();
    //glbOperationStageFilter = $("#ulOperationStages").val();
    //glbOperationTxtSearchFilter = $("#txt-Search").val().trim().toUpperCase();
}
function Operations_ReloadFilters() {
    debugger;
    //if (glbOperationTransportFilter == 0) { $("#lbl-filter-AllTransports").addClass("active"); $("#lbl-filter-AllTransports").siblings().removeClass("active"); }
    //else if (glbOperationTransportFilter == 1) { $("#lbl-filter-ocean").addClass("active"); $("#lbl-filter-ocean").siblings().removeClass("active"); }
    //else if (glbOperationTransportFilter == 2) { $("#lbl-filter-air").addClass("active"); $("#lbl-filter-air").siblings().removeClass("active"); }
    //else if (glbOperationTransportFilter == 3) { $("#lbl-filter-inland").addClass("active"); $("#lbl-filter-inland").siblings().removeClass("active"); }

    //if (glbOperationDirectionFilter == 0) { $("#lbl-filter-AllDirections").addClass("active"); $("#lbl-filter-AllDirections").siblings().removeClass("active"); }
    //else if (glbOperationDirectionFilter == 1) { $("#lbl-filter-import").addClass("active"); $("#lbl-filter-import").siblings().removeClass("active"); }
    //else if (glbOperationDirectionFilter == 2) { $("#lbl-filter-export").addClass("active"); $("#lbl-filter-export").siblings().removeClass("active"); }
    //else if (glbOperationDirectionFilter == 3) { $("#lbl-filter-domestic").addClass("active"); $("#lbl-filter-domestic").siblings().removeClass("active"); }

    //if (glbOperationBLTypeFilter == 0) { $("#lbl-filter-AllBLTypes").addClass("active"); $("#lbl-filter-AllBLTypes").siblings().removeClass("active"); }
    //else if (glbOperationBLTypeFilter == 1) { $("#lbl-filter-direct").addClass("active"); $("#lbl-filter-direct").siblings().removeClass("active"); }
    //else if (glbOperationBLTypeFilter == 2) { $("#lbl-filter-house").addClass("active"); $("#lbl-filter-house").siblings().removeClass("active"); }
    //else if (glbOperationBLTypeFilter == 3) { $("#lbl-filter-master").addClass("active"); $("#lbl-filter-master").siblings().removeClass("active"); }

    //$("#ulOperationStages").val(glbOperationStageFilter);

    //$("#txt-Search").val(glbOperationTxtSearchFilter);
}
function Operations_BLTypeChanged() {

    if ($('#cbIsMaster').is(':checked') && pDefaults.UnEditableCompanyName == "UNF") {
        //$('#cbIsLCL').parent('label').addClass('hide');
    }
    else {
        $('#cbIsLCL').parent('label').removeClass('hide');
    }

    BLType_SetIconNameAndStyle();
    ShowHideClientRequired();
    Operations_ShipmentTypeChanged();
    if ($('input[name=cbBLType]:checked').val() == constHouseBLType) {
        $("#slLines").attr("disabled", "disabled");
        $("#slLines").attr("data-required", false); $("#slLines").removeClass("validation-error");
        $("#slLines").val("");
    }
    else {
        $("#slLines").removeAttr("disabled");
        if (pDefaults.UnEditableCompanyName == "UNF") {
            $("#slLines").attr('data-required', 'false');

        } else {

            $("#slLines").attr("data-required", true);
        }
    }
    //to handle the case of checking House or Direct after the Consolidation was checked(coz the consolidation option hides)
    if ($('input[name=cbBLType]:checked').val() == constHouseBLType || $('input[name=cbBLType]:checked').val() == constDirectBLType) {
        if ($("#cbIsOcean").prop("checked"))
            $("#cbIsFCL").prop("checked", true);
        else
            if ($("#cbIsInland").prop("checked"))
                $("#cbIsFTL").prop("checked", true);
    }
}
function Operations_TransportTypeChanged() {
    debugger;
    CallGETFunctionWithParameters("/api/MoveTypes/LoadAll", { pWhereClause: "WHERE " + ($("#cbIsOcean").prop("checked") ? " IsOcean=1 " : ($("#cbIsAir").prop("checked") ? " IsAir=1 " : " IsInland=1 ")) + " OR IsCustomsClearance=1 OR IsWarehousing=1 ORDER BY Name" }
        , function (pData) {
            FillListFromObject(null, 18, "<--Select-->", "slOperationMoveTypes", pData[0], null);
        }
        , null);
    TransportType_SetIconNameAndStyle();
    POL_GetList(null, null);
    POD_GetList(null, null);
    Lines_GetList(null, null);
    Operations_ShipmentTypeChanged();
    if (pDefaults.UnEditableCompanyName == "EVL") {
        if ($('#cbIsInland').prop('checked')) {
            if ($('#slOperationMoveTypes').val() == 1) {
                $('.showForEVLInland').removeClass('hide');
                $('.hideForEVLInland').addClass('hide');
            } else { 
                $('.hideForEVLInland').removeClass('hide');
                $('.showForEVLInland').addClass('hide');
            }
        } else {
            $('.hideForEVLInland').removeClass('hide');
            $('.showForEVLInland').addClass('hide');
        }
    }
}
var TotalAccountingUsers = 0;
async function SetOperationStage() {
    debugger;

    if (IsMESCOCompany && $('#hOperationStageID').val() == 120) {
        swal(strSorry, "Sorry operation is closed change stage is disabled");
        return;
    }

    if (pDefaults.UnEditableCompanyName == "MED" && pOperationHeader_Global.OperationStageName == "INVOICE" && $('#slOperationStages').val() == OpenQuoteAndOperStageID && $("#hf_CanDelete").val() != '1') {
        swal(strSorry, "Sorry you don't have permission");
        return;
    }
    if (($('#slOperationStages').val() == ClosedQuoteAndOperStageID || $('#slOperationStages').val() == 65) && pDefaults.UnEditableCompanyName == "MED") {
        let masterBl = pOperationHeader_Global.MasterBL;
        if (masterBl == "" || masterBl == null || masterBl == undefined || masterBl == 0 || masterBl == "0") {
            swal(strSorry, "Please Enter MasterBL First");
            return;
        }
    }
    // if Bedaya, لا يمكن اغلاق العملية الا بترحيل مصاريف و الفواتير و الاشعارات  و اذا كان يوجد مصروف صفر يتم الترحيل
    var DoesNeadToApproveFirst = false;
    if ($('#slOperationStages').val() == ClosedQuoteAndOperStageID && pDefaults.UnEditableCompanyName == "BED") {
        var NumberOfUnApproved = await CallGETFunctionWithParametersAsync("/api/Operations/FindNumberOfUnApproved_Invoices_AccNotes_Payables",
            {
                pOperationID: $("#hOperationID").val()
            })

        if (NumberOfUnApproved > 0) {
            DoesNeadToApproveFirst = true;
        }
    }

    // if Medetrenian,  لا يتم غلق الشحنة الا ورقم الشهادة وتاريخها مدخل
    var DoesNeadToEnterCertificateFirst = false;
    if (($('#slOperationStages').val() == ClosedQuoteAndOperStageID || $('#slOperationStages').val() == 65) && pDefaults.UnEditableCompanyName == "MED") {
        var CertificateData = await CallGETFunctionWithParametersAsync("/api/Operations/FindCertificateNumberAndCertificateDate",
            {
                pOperationID: $("#hOperationID").val()
            })
        debugger;
        if (CertificateData[0] == "" || CertificateData[1] == "") {
            DoesNeadToEnterCertificateFirst = true;
        }
    }

    if (pDefaults.UnEditableCompanyName == "SAF" && $('#slOperationStages').val() == 65) {
        CallGETFunctionWithParameters("/api/Users/LoadAll", { pWhereClause: "WHERE RoleID=3 ORDER BY Name" }
            , function (pData) {
                //txtAccountingUsers
                $('#txtAccountingUsers').html('');
                var i = 0;
                TotalAccountingUsers = JSON.parse(pData[0]).length;
                for (i = 0; i < JSON.parse(pData[0]).length; i++) {
                    $('#txtAccountingUsers').append('<label class="m-l-n col-sm-4 m-t"><input type="checkbox" id="cbUser' + i + '" UserID=' + JSON.parse(pData[0])[i].ID + ' onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);">&nbsp;' + JSON.parse(pData[0])[i].Name + '</label>');

                }
                jQuery("#InvoiceUsersNotification").modal("show");
            }
            , null);
    }
    debugger;
    if (pDefaults.UnEditableCompanyName == 'SSH' && $('#slOperationStages option:selected').val() == 120)//inspection in cc must be checked to close
    {
        CallGETFunctionWithParameters("api/Routings/LoadAll",
            { pWhereClause: `where RoutingTypeID=70 and Match=1 and OperationID=${$("#hOperationID").val()}`, pOrderBy: 'ID' },
            function (pData) {
                var data = JSON.parse(pData[0]);
                if (data.length == 0) {
                    swal("Sorry", "Inspection in Customs Clearance must be checked");
                    return;
                }

            }, null, false);
    }
    if (pDefaults.UnEditableCompanyName == "MED" && !IsAllTrackingTasksDone()) {
        swal(strSorry, "Please, Finish all tracking tasks");
    }
    else {
        //if ($('#ulOperationStages .active').val() == "")
        if ($('#slOperationStages').val() == "")
            swal(strSorry, "Please, Select a stage.");
        else
            if ($('#slOperationStages').val() == OpenQuoteAndOperStageID) {//handle Re-Opening Operation
                jQuery("#CloseDateModal").modal("show");      //the modal will call the Operations_ReOpenOperation() fn.
            }
            else if ($('#slOperationStages').val() == 65) {
                jQuery("#InvoiceStageDateModal").modal("show");
            }

            else
                if ($('#slOperationStages').val() == CancelledQuoteAndOperStageID && ($("#hNumberOfHousesConnected").val() > 0 || $("#hMasterOperationID").val() > 0))
                    swal(strSorry, "Operation is connected. Remove any connections then try again.");
                else
                    if (!IsMESCOCompany && $('#slOperationStages').val() == CancelledQuoteAndOperStageID && ($('#tblPayables tr').length > 1 || $('#tblReceivablesLcl tr').length > 1 || $('#tblInvoices tr').length > 1))
                        swal(strSorry, "Remove Payables, Receivables and Invoices, then try again.");
                    else { //rest of cases
                        if (DoesNeadToApproveFirst) {
                            swal(strSorry, "Please Approve Invoices, Acc Notes and Payables")
                        } else if (DoesNeadToEnterCertificateFirst) {
                            swal(strSorry, "Please Enter Certificate Number and Date First")
                        } else {
                            swal({
                                title: "Are you sure?",
                                text: "The stage for Operation '" + $("#txtOperationCode").val() + "' will be changed to '" + $('#slOperationStages option:selected').text() + "'",
                                //type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Yes, Apply!",
                                closeOnConfirm: false
                            },
                                //callback function in case of confirm
                                function () {
                                    FadePageCover(true);
                                    CallGETFunctionWithParameters("/api/Operations/SetOperationStage", { pID: $("#hOperationID").val(), pOperationStageID: $('#slOperationStages').val(), pCloseDate: "20100101"/*Dummy Date not used in this case*/ }
                                        , function (pData) {
                                            let pReturnedMessage = pData[0];
                                            let DynamicsQuotationUpdateStatus = "";
                                            if (pData[0] != "") {
                                                swal("Sorry", pReturnedMessage);
                                                FadePageCover(false);
                                            }
                                            else {
                                                if (IsMESCOCompany && $('#slOperationStages').val() == ClosedQuoteAndOperStageID) {
                                                    //Update crmLines in dynamics crm after closing the operation
                                                    UpdateDynamicsQuotations($("#hOperationID").val());
                                                    //swal("Success", "Done successfully" + DynamicsQuotationUpdateStatus);
                                                    LoadViews("OperationsEdit", null, $("#hOperationID").val());
                                                } else
                                                    swal("Success", "Done successfully");
                                                LoadViews("OperationsEdit", null, $("#hOperationID").val());
                                                if (pLoggedUser.DepartmentID == 8 && $('#slOperationStages').val() == 65 && pDefaults.UnEditableCompanyName == "MED") {
                                                    console.log("Accounting");
                                                    /*  $('#ulOperationsSubMenu li:not(.setInvoice)').addClass("hide");*/
                                                    $('#ulOperationsSubMenu a:not(.setInvoice)').addClass('disabled');
                                                }
                                                else {
                                                    $('#ulOperationsSubMenu li:not(.setInvoice)').removeClass("hide");
                                                }
                                            }
                                        });
                                });
                        }


                    }
    }

}

function UpdateDynamicsQuotations(pOperationID) {
    debugger;
    CallGETFunctionWithParameters("/api/DynamicsCRM/UpdateDynamicsQuotations", {
        pOperationID: pOperationID
    }, function (ReturnedMessage) {
        debugger;
        if (ReturnedMessage != "")
            swal("Done", "Operation is closed but quotation charges cannot be updated on dynamics CRM");
        else
            swal("Success", "Operation is closed and quotation charges are updated on dynamics CRM successfully!");
    })
}
function Insert_Update_NotificationforUsers_Invoice() {
    debugger;
    var UserIDs = "";
    var i = 0;
    for (i = 0; i < TotalAccountingUsers; i++) {
        if ($('#cbUser' + i + '').prop('checked'))
            UserIDs += $('#cbUser' + i + '').attr('UserID') + ","

    }
    CallGETFunctionWithParameters("/api/Invoices/Insert_Update_NotificationforUsers_Invoice", { pOperationID: $("#hOperationID").val(), pUserIDs: UserIDs }
        , function (pData) {
            debugger;
            if (pData[0] == true) {
                jQuery("#InvoiceUsersNotification").modal("hide");
                swal("Success", "Notification will alarm users successfully");
            }
            else
                swal("Sorry", "There Is an error");
        });
}
function Operations_SetInvoiceStageDate() {
    debugger;
    if ($("#txtInvoiceStageDateInModal").val().trim() != "")
        swal({
            title: "Are you sure?",
            text: "The stage for Operation '" + $("#txtOperationCode").val() + "' will be changed to '" + $('#slOperationStages option:selected').text() + "'",
            //type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Apply!",
            closeOnConfirm: true
        },
            //callback function in case of confirm
            function () {
                debugger;
                CallGETFunctionWithParameters("/api/Operations/SetOperationStage", { pID: $("#hOperationID").val(), pOperationStageID: $('#slOperationStages').val(), pCloseDate: GetDateWithFormatyyyyMMdd($("#txtInvoiceStageDateInModal").val().trim()) }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
            });

    else
        swal(strSorry, "Please, Enter Invoice Stage date later than today.");
}
function Operations_ReOpenOperation() {
    debugger;
    //if ($("#txtCloseDateInModal").val().trim() != "")
    //    if (Date.prototype.compareDates(FormattedTodaysDate, ConvertDateFormat($("#txtCloseDateInModal").val().trim())) <= 0)
    //        swal(strSorry, "Please, Enter close date later than today.");
    if ($("#txtCloseDateInModal").val().trim() != "")
        if (1 > 1)
            swal(strSorry, "Please, Select close date.");
        else {
            swal({
                title: "Are you sure?",
                text: "The stage for Operation '" + $("#txtOperationCode").val() + "' will be changed to '" + $('#slOperationStages option:selected').text() + "'",
                //type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Apply!",
                closeOnConfirm: true
            },
                //callback function in case of confirm
                function () {
                    CallGETFunctionWithParameters("/api/Operations/SetOperationStage", { pID: $("#hOperationID").val(), pOperationStageID: $('#slOperationStages').val(), pCloseDate: GetDateWithFormatyyyyMMdd($("#txtCloseDateInModal").val().trim()) }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
                });
        }
    else //if ($("#txtCloseDateInModal").val().trim() != "")
        swal(strSorry, "Please, Enter close date later than today.");
}
function Operations_SelectOperationModal() {
    debugger;
    jQuery("#SelectOperationModal").modal("show");
}
function Operations_MoveToOperation() {
    debugger;
    //if ($("#txtMoveToOperation").val() == "")
    //    swal("Sorry", "Please, Enter Operation Serial.");
    if ($("#txtMoveToOperation").val() == "" && $("#txtMoveToOperationBookingNo").val() == "" && $("#txtMoveToOperationMasterBL").val() == "" && $("#txtFilterFlexi").val() == "")
        swal("Sorry", "Please, Enter Search Criteria");
    else {
        let pWhereClause = "Where 1=1";
        if ($("#txtMoveToOperation").val() != "")
            pWhereClause += " AND Code like '%-" + $("#txtMoveToOperation").val() + "'";

        if ($("#txtMoveToOperationBookingNo").val() != "") {
            if (pDefaults.UnEditableCompanyName == "ELI" || pDefaults.UnEditableCompanyName == "OAO" || pDefaults.UnEditableCompanyName == "BAD")
                pWhereClause += " AND (BookingNumbers like '%" + $("#txtMoveToOperationBookingNo").val().trim().toUpperCase() + "%') ";
            else
                pWhereClause += " AND (BookingNumbers = '" + $("#txtMoveToOperationBookingNo").val().trim().toUpperCase() + "') ";
        }

        if ($("#txtMoveToOperationMasterBL").val() != "")
            pWhereClause += " AND MasterBL LIKE N'%" + $("#txtMoveToOperationMasterBL").val().trim().toUpperCase() + "%' ";

        if ($("#txtFilterFlexi").val().trim() != "")
            pWhereClause += " AND ((ISNULL((SELECT COUNT(OCP.ID) FROM OperationContainersAndPackages AS OCP WHERE dbo.vwOperationsForBindOperationsTabRowsOnly.ID=OCP.OperationID AND OCP.TankOrFlexiNumber LIKE N'%" + $("#txtFilterFlexi").val().trim().toUpperCase() + "%'), 0)) > 0)";

        UnLoadOperationsSubMenu();
        LoadViews("Operations", null, null, pWhereClause);
    }
}
function OperationRefresh() {
    debugger;
    SwitchToOperationsEditView($("#hOperationID").val(), 'OperationsCreate');
}
function Operations_GoBacktoOperations() {
    debugger;
    SwitchToOperationsView();
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
function Operations_FillTransferHouseModal(pHouseID) {
    debugger;
    $("#slDocsOutOperationsFromSearch").html("");
    FadePageCover(true);
    var tr = $("#tblOperations tbody tr[id=" + pHouseID + "]");
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

    $("#hOperationID").val(pHouseID);

    jQuery("#SelectOperationAndDocumentModal").modal("show");
    /*            , { pPageSize: 99999, pWhereClauseToGetOperationsToRestoreInvoices: "WHERE BLType=3 AND OperationStageID NOT IN (" + ClosedQuoteAndOperStageID + "," + CancelledQuoteAndOperStageID + ") AND CreationDate > DATEADD(mm,DATEDIFF(mm,0,GETDATE())-15,0)", pOrderBy: "ID DESC" }*/

    if ($("#slDocsOutOperationsFromSearch option").length == 0)
        CallGETFunctionWithParameters("/api/Operations/LoadOperationsToRestoreInvoices"
            , { pPageSize: 99999, pWhereClauseToGetOperationsToRestoreInvoices: "WHERE BLType=3 AND OperationStageID NOT IN (" + ClosedQuoteAndOperStageID + "," + CancelledQuoteAndOperStageID + ") ", pOrderBy: "ID DESC" }
            , function (pData) {
                FillListFromObject(null, 13, "<--Select-->", "slDocsOutOperationsFromSearch", pData[0], function () { FadePageCover(false); });
            }
            , null);

    $('#slDocsOutOperationsFromSearch').css({ 'width': '100%' }).select2();

}
function Operations_TransferHouse() {
    debugger;
    if ($("#slDocsOutOperationsFromSearch").val() == "")
        swal("Sorry", "Please, select operation.");
    else
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
                    pMasterOperationID: $("#slDocsOutOperationsFromSearch").val()
                    , pIsHouseConnected: true
                    , pMasterOperationIDFieldInHouse: $("#slDocsOutOperationsFromSearch").val()
                    , pHouseOperationID: $("#hOperationID").val()
                    , pHouseParentID: $("#hOperationID").val()
                };
                CallGETFunctionWithParameters("/api/Operations/ConnectOrDisconnect", pParametersWithValues
                    , function (pData) {
                        let pReturnedMessage = pData[1];
                        if (pReturnedMessage == "") {
                            swal("Success", "Transferred successsfully.");
                            Operations_LoadingWithPaging();
                        }
                        else {
                            swal("Sorry", pReturnedMessage);
                            FadePageCover(false);
                        }
                    }
                    , null);
            });
}
//set close date to the default value specified in Admin/Settings/Defaults
///////////////////////////////////////Operations Modal Functions (some are called from Operations)//////////
//show and hide the order details with FCl, LCL, FTL, LTL, Air, .... changes
function Operations_ShipmentTypeChanged() {
    debugger;
    if (pDefaults.UnEditableCompanyName == "LATT") {
        $('#slOperationContainerType').attr('data-required', 'false');
        $('#txtOperationNumberOfContainers').attr('data-required', 'false');
        $('#txtOperationMasterBL').attr('data-required', 'false');
    }

    if ($('input[name=cbTransportType]:checked').val() == 2) //Air
    {
        $("#divFCL").addClass("hide");
        $("#divLCL").removeClass("hide");
        $("#lblWtMsr").addClass("hide");
        $("#lblChargeableWeight").removeClass("hide");
    }
    else // Ocean or Inland
    {
        if (pDefaults.UnEditableCompanyName == "LATT" && $('input[name=cbTransportType]:checked').val() == 1) {
            $('#txtOperationMasterBL').attr('data-required', 'true');
        }
        if ($('input[name=cbShipmentType]:checked').val() == 1 //FCL or FTL
            || $('input[name=cbShipmentType]:checked').val() == 3) {
            $("#divLCL").addClass("hide");
            $("#divFCL").removeClass("hide");
            if (pDefaults.UnEditableCompanyName == "LATT") {
                $('#slOperationContainerType').attr('data-required', 'true');
                $('#txtOperationNumberOfContainers').attr('data-required', 'true');
            }
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

        }

    } //of else
}
function Operations_AdjustControlsSettings() {
    debugger;
    /**********************ShowHide ETA,ETD,MasterBL,Vessel,VoyageNo***********************/
    //By default i add class hide then for each accepted case i show
    $("#divOperationExpectedDeparture").addClass("hide");
    $("#divOperationExpectedArrival").addClass("hide");
    $("#divOperationVessels").addClass("hide");
    $("#divOperationVoyageOrTruckNumber").addClass("hide");
    $("#divOperationMasterBL").addClass("hide");

    if ($("#cbIsHouse").prop('checked')) {
        //clear the coming fields coz they will be hidden
        $("#txtOperationExpectedDeparture").val("");
        $("#txtOperationExpectedArrival").val("");
        $("#slOperationVessels").val("").trigger("change");
        $("#txtOperationVoyageOrTruckNumber").val("");
        $("#txtOperationMasterBL").val("");
    }

    else if ($("#cbIsMaster").prop("checked") || $("#cbIsDirect").prop("checked")) {
        if ($("#cbIsInland").prop("checked")) {
            $("#divOperationExpectedDeparture").removeClass("hide");
            $("#divOperationExpectedArrival").removeClass("hide");
            $("#divOperationMasterBL").removeClass("hide");
            $("#divOperationVoyageOrTruckNumber").removeClass("hide");
            $("#slOperationVessels").val("").trigger("change");
        }
        else if ($("#cbIsAir").prop("checked")) {
            $("#divOperationExpectedDeparture").removeClass("hide");
            $("#divOperationExpectedArrival").removeClass("hide");
            $("#divOperationMasterBL").removeClass("hide");
            $("#txtOperationVoyageOrTruckNumber").val("");
            $("#slOperationVessels").val("").trigger("change");
        }
        else if ($("#cbIsOcean").prop("checked")) {
            $("#divOperationExpectedDeparture").removeClass("hide");
            $("#divOperationExpectedArrival").removeClass("hide");
            $("#divOperationMasterBL").removeClass("hide");
            $("#divOperationVessels").removeClass("hide");
            $("#divOperationVoyageOrTruckNumber").removeClass("hide");
        }
    }
    /**********************EOF ShowHide ETA,ETD,MasterBL,Vessel,VoyageNo***********************/
}
function Operations_ShowHideContainerControls() {
    debugger;
    if ($("#cbIsAir").prop("checked") || $("#cbIsLCL").prop("checked") || $("#cbIsLTL").prop("checked") || $("#cbIsVehicle").prop("checked") || $("#cbIsBulk").prop("checked")) {
        $(".classOperationContainerType").addClass("hide"); $("#slOperationContainerType").val(""); $("#slOperationContainerType2").val(""); $("#slOperationContainerType2").val("");
        $(".classOperationContainerType").addClass("hide"); $("#txtOperationNumberOfContainers").val(""); $("#txtOperationNumberOfContainers2").val(""); $("#txtOperationNumberOfContainers3").val("");
    }
    else {
        $(".classOperationContainerType").removeClass("hide");
        $(".classOperationContainerType").removeClass("hide");
    }
}
function Operations_ShowHideAdvancedFilters(pOption) {
    debugger;
    if (pOption == 0) {
        $("#asideSearch").addClass("hide");
        $("#aShowHideAdvancedFilters").attr("onclick", "Operations_ShowHideAdvancedFilters(1);");
    }
    else if (pOption == 1) {
        $("#asideSearch").removeClass("hide");
        $("#aShowHideAdvancedFilters").attr("onclick", "Operations_ShowHideAdvancedFilters(0);");
    }
}
function Operations_Salesmen_GetList(pID, pSlName, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithNameAndWhereClause(pID, "/api/Users/LoadAll", "Select Salesman", pSlName, "ORDER BY Name");
}
//fill slPOLCountries and slPODCountries
function Operations_Countries_GetList(pPOLCountryID, pPODCountryID, callback) {//pID is used in case of editing to set the code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pPOLCountryID, "/api/Countries/LoadAll", "Select Country", "slPOLCountries", function () { $("#slPODCountries").html($("#slPOLCountries").html()); $("#slPODCountries").val(pPODCountryID); });
    //GetListWithName(pPODCountryID, "/api/Countries/LoadAll", "Select Country", "slPODCountries");
}
//fill slPOL , pDontCallFillOtherSidePorts: is used to handle Domestic
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


function POL_Contry_GetList() {
    debugger;
    var pWhereClause = "";
    var PolValue = $("#slPOL").val()

    debugger;

    CallGETFunctionWithParameters("/api/Ports/GetCountry", { id: PolValue }
        , function (Countries) {
            GetListWithName(Countries, "/api/Countries/LoadAll", "Select Country", "slPOLCountries", function () { $("#slPOLCountries").val(Countries); });

        }
        , null);


}

function POD_Contry_GetList() {
    debugger;
    var pWhereClause = "";
    var PODValue = $("#slPOD").val()

    debugger;

    CallGETFunctionWithParameters("/api/Ports/GetCountry", { id: PODValue }
        , function (Countries) {
            GetListWithName(Countries, "/api/Countries/LoadAll", "Select Country", "slPODCountries", function () { $("#slPODCountries").val(Countries); });

        }
        , null);


}



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
    if (pDefaults.UnEditableCompanyName == "USC") {
        pWhereClause = " WHERE SubAccountID IS NOT NULL ORDER BY Name ";
    }
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
    if (IsMESCOCompany)
        GetListWithNameAndWhereClause(pID, "/api/NoAccessFreightTypes/LoadAll", "P/C", "slOperationPOrC", " WHERE id !=40 ");
    else
        GetListWithNameAndWhereClause(pID, "/api/NoAccessFreightTypes/LoadAll", "P/C", "slOperationPOrC", " WHERE 1=1 ");

}
function Operations_MoveTypeChanged() {
    debugger;
    if (pDefaults.UnEditableCompanyName == "EVL") {
        if ($('#cbIsInland').prop('checked')) {
            if ($('#slOperationMoveTypes').val() == 1) {
                $('.showForEVLInland').removeClass('hide');
                $('.hideForEVLInland').addClass('hide');
            } else {
                $('.hideForEVLInland').removeClass('hide');
                $('.showForEVLInland').addClass('hide');
            }
        } else {
            $('.hideForEVLInland').removeClass('hide');
            $('.showForEVLInland').addClass('hide');
        }
    }
    //$("#slOperationCCA").val("");
    //if ($("#slOperationMoveTypes option:selected").attr("IsCustomsClearance") == "true") {
    //    $(".classShowForCustomsClearance").removeClass("hide");
    //}
    //else {
    //    $(".classShowForCustomsClearance").addClass("hide");
    //}
    //if ($("#slOperationMoveTypes option:selected").attr("IsWarehousing") == "true") {
    //    $(".classShowForWarehousing").removeClass("hide");
    //}
    //else {
    //    $(".classShowForWarehousing").addClass("hide");
    //}
}
function Commodities_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pID, "/api/Commodities/LoadAll", "Select Commodity", "slCommodities");
}
///////////////////////////////////////EOF Operations Modal Functions (some are called from Operations)//////////

///////////////////////////////////////Partners Tab Functions///////////////////////////////////////////////
function Shippers_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    var pWhereClause = "";

    //pWhereClause = " WHERE IsShipper = 1 AND IsInactive = 0  ";
    pWhereClause = " WHERE 1=1 ";
    CallGETFunctionWithParameters("/api/Customers/LoadAllWithMinimalColumns"
        , { pWhereClauseWithMinimalColumns: pWhereClause, pOrderBy: "Name" }
        , function (pData) {
            FillListFromObject(pID, 2, "Select Shipper", "slShippers", pData[0], callback)
        }
        , null);
}
function Consignees_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    var pWhereClause = "";

    //pWhereClause = " WHERE IsConsignee = 1 AND IsInactive = 0 ";
    pWhereClause = " WHERE 1=1 ";
    CallGETFunctionWithParameters("/api/Customers/LoadAllWithMinimalColumns"
        , { pWhereClauseWithMinimalColumns: pWhereClause, pOrderBy: "Name" }
        , function (pData) {
            FillListFromObject(pID, 2, "Select Consignee", "slConsignees", pData[0], callback)
        }
        , null);
}
function Agents_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    //var pWhereClause = "";
    //pWhereClause = " WHERE IsInactive = 0 ";
    //pWhereClause += " ORDER BY Name ";
    //GetListWithNameAndWhereClause(pID, "/api/Agents/LoadAll", "Select Agent", "slAgents", pWhereClause);
    let pWhereClause = " ORDER BY Name";
    if (pDefaults.UnEditableCompanyName == "USC") {
        pWhereClause = " WHERE ID IN (select ID from Agents where SubAccountID is not null) ORDER BY Name";
    }
    CallGETFunctionWithParameters("/api/Agents/LoadAllForCombo"
        , { pWhereClauseForCombo: pWhereClause }
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
// i added to its name 'Operations_' to differentiate from the other fn in Customers
//the 3rd parameter: 3 means called from operationPartners, 2 means add new operation
function Customers_FillControlsFromOperations(pID, callback, pWhoIsCalling) {
    debugger;
    intPartnerTypeID = 1;
    if (pID == "") { //no selected client to edit so hide the modal
        //$("#CustomerModal").modal("show");
        swal(strPlease, "Select a Client.");
        $("#CustomerModal").addClass("hide");
    }
    else {
        $("#CustomerModal").removeClass("hide");
        //$("#btnClose").attr("onclick", "Customers_UnlockRecord(" + pWhoIsCalling + ");");//to handle the problem of restarting if unlocked
        //Check("/api/Customers/CheckRow", { 'pID': pID }, function () {
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Customers/LoadAll", " where ID = " + pID, 0, 10, function (pTabelRows) {   //i am sure i ve just 1 row isa
            $.each(pTabelRows, function (i, item) {

                // Fill All Modal Controls
                debugger;
                $("#hID").val(pID);
                if (item.OperationCount == 0) {
                    $("#txtName").removeAttr("disabled");
                    $("#txtLocalName").removeAttr("disabled");
                }
                else {
                    $("#txtName").attr("disabled", "disabled");
                    $("#txtLocalName").attr("disabled", "disabled");
                }

                let b = item.BranchID == 0 ? "" : item.BranchID;
                let d = item.DebitorGroupID == 0 ? "" : item.DebitorGroupID;

                CallGETFunctionWithParameters("/api/Customers/LoadCustomersModalComboBoxes", {}, function (pData) {
                    FillListFromObject(b, 2, TranslateString("SelectFromMenu"), "slCustomerBranchID", pData[0], null);
                    FillListFromObject(d, 2, TranslateString("SelectFromMenu"), "slCustomerDebitorGroupID", pData[1], null);
                }, null, false);
                //the next 6 lines are to set the slPaymentTerms, slCurrencies and slTaxeTypes to the value entered before
                var pSalesmanID = item.SalesmanID; //store the val in a var to be re-entered in the select box
                Salesmen_GetList(pSalesmanID, null);
                var pPaymentTermID = item.PaymentTermID;
                PaymentTerms_GetList(pPaymentTermID, null);
                var pCurrencyID = item.CurrencyID;
                Currencies_GetList(pCurrencyID, null);
                var pTaxeTypeID = item.TaxeTypeID;
                TaxeTypes_GetList(pTaxeTypeID, null);

                //the next line is to get the Customer addresses and Contacts info (PartnerTypeID for Customers is 1)
                Addresses_LoadWithPagingWithWhereClause(intPartnerTypeID);
                Contacts_LoadWithPagingWithWhereClause(intPartnerTypeID);
                debugger;
                if (pDefaults.UnEditableCompanyName == "UNF" && CustomersCanDelete)
                    $("#cbIgnoreVATNumberValidation").parent().parent().removeClass("hide");
                $("#lblShown").html(": " + item.Name);
                $("#txtCode").val(item.Code);
                $("#txtName").val(item.Name);
                $("#txtLocalName").val(item.LocalName);
                $("#txtWebsite").val((item.Website == "0" ? "" : item.Website));
                $("#txtCustomerEmail").val(item.Email == "0" ? "" : item.Email);
                $("#btnVisitWebsite").attr('href', 'http://' + $("#txtWebsite").val());
                $("#cbIsConsignee").prop('checked', item.IsConsignee);
                $("#cbIsShipper").prop('checked', item.IsShipper);
                $("#cbIsInternalCustomer").prop('checked', item.IsInternalCustomer);
                $("#cbIsInactive").prop('checked', item.IsInactive);
                $("#txtNotes").val(item.Notes);
                $("#txtCustomerAddress").val(item.Address);
                $("#txtCustomerPhonesAndFaxes").val(item.PhonesAndFaxes);
                $("#txtVATNumber").val(item.VATNumber);
                $("#cbIsConsolidatedInvoice").prop('checked', item.IsConsolidatedInvoice);
                $("#txtBankName").val(item.BankName);
                $("#txtBankAddress").val(item.BankAddress);
                $("#txtSwift").val(item.Swift);
                $("#txtBankAccountNumber").val(item.BankAccountNumber);
                $("#txtIBANNumber").val(item.IBANNumber);

                $("#txtForeignExporterNo").val(item.ForeignExporterNo);
                GetListWithName(item.ForeignExporterCountryID, "/api/Countries/LoadAll", "Select", "slForeignExporterCountry")

                //parameter in the next lines are 1:Quotations call, 2:New Operations call, 3:OperationPartners Call
                $("#btnSave").attr("onclick", "Customers_Update(false, " + pWhoIsCalling + ");");
                $("#btnSaveandNew").attr("onclick", "Customers_Update(true, " + pWhoIsCalling + ");");

                //to set the wizard to BasicData
                $("#stepsBasicData").parent().children().removeClass("active");
                $("#stepsBasicData").addClass("active");
                $("#BasicData").parent().children().removeClass("active");
                $("#BasicData").addClass("active");
                //to hide Contacts and Addresses tabs in case of partner is not saved yet
                Customers_ShowHideTabs();
            });
        });
        //} //this is the close brace of the function in Check()
        //, intPartnerTypeID);
        if (callback != null && callback != "undefined")
            callback(); // to reload the selectbox with the new values
    }
}
// i added to its name 'Operations_' to differentiate from the other fn in Agents
//the 3rd parameter: 3 means called from operationPartners, 2 means add new operation
function Agents_FillControlsFromOperations(pID, callback, pWhoIsCalling) {
    debugger;
    intPartnerTypeID = 2;
    if (pID == "") { //no selected client to edit so hide the modal
        //$("#AgentModal").modal("show");
        swal(strPlease, "Select a Client.");
        $("#AgentModal").addClass("hide");
    }
    else {
        $("#AgentModal").removeClass("hide");
        //$("#btnClose").attr("onclick", "Agents_UnlockRecord(" + pWhoIsCalling + ");");//to handle the problem of restarting if unlocked
        //Check("/api/Agents/CheckRow", { 'pID': pID }, function () {
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Agents/LoadAll", " where ID = " + pID, 0, 10, function (pTabelRows) {   //i am sure i ve just 1 row isa
            $.each(pTabelRows, function (i, item) {
                //next line is to check if row is locked by another user

                // Fill All Modal Controls
                debugger;
                $("#hAgentID").val(pID);

                //the next 6 lines are to set the slPaymentTerms, slCurrencies and slTaxeTypes to the value entered before
                var pPaymentTermID = item.PaymentTermID;
                Agent_PaymentTerms_GetList(pPaymentTermID, null);
                var pCurrencyID = item.CurrencyID;
                Agent_Currencies_GetList(pCurrencyID, null);
                var pTaxeTypeID = item.TaxeTypeID;
                Agent_TaxeTypes_GetList(pTaxeTypeID, null);
                var pNetworkID = item.NetworkID;
                Agent_Network_GetList(pNetworkID, null);

                //the next line is to get the Agent addresses and Contacts info (PartnerTypeID for Agents is 2)
                Addresses_LoadWithPagingWithWhereClause(intPartnerTypeID);
                Contacts_LoadWithPagingWithWhereClause(intPartnerTypeID);
                AgentNetwork_LoadingWithPagingForModal(pID);
                debugger;

                $("#lblAgentShown").html(": " + item.Name);
                $("#txtAgentCode").val(item.Code);
                $("#txtAgentName").val(item.Name);
                $("#txtAgentLocalName").val(item.LocalName == 0 ? "" : item.LocalName);
                $("#txtAgentWebsite").val(item.Website == 0 ? "" : item.Website);
                $("#txtAgentEmail").val(item.Email == 0 ? "" : item.Email);
                $("#btnAgentVisitWebsite").attr('href', 'http://' + $("#txtWebsite").val());

                $("#cbAgentIsInactive").prop('checked', item.IsInactive);
                $("#txtAgentNotes").val(item.Notes == 0 ? "" : item.Notes);
                $("#txtAgentAddress").val(item.Address == 0 ? "" : item.Address);
                $("#txtAgentPhonesAndFaxes").val(item.PhonesAndFaxes == 0 ? "" : item.PhonesAndFaxes);
                $("#txtAgentVATNumber").val(item.VATNumber == 0 ? "" : item.VATNumber);
                $("#cbAgentIsConsolidatedInvoice").prop('checked', item.IsConsolidatedInvoice);
                $("#txtAgentBankName").val(item.BankName);
                $("#txtAgentBankAddress").val(item.BankAddress);
                $("#txtAgentSwift").val(item.Swift);
                $("#txtAgentBankAccountNumber").val(item.BankAccountNumber == 0 ? "" : item.BankAccountNumber);
                $("#txtAgentIBANNumber").val(item.IBANNumber == 0 ? "" : item.IBANNumber);

                //parameter in the next lines are 1:Quotations call, 2:New Operations call, 3:OperationPartners Call
                $("#btnSaveAgent").attr("onclick", "Agents_Update(false, " + pWhoIsCalling + ");");
                $("#btnSaveandNewAgent").attr("onclick", "Agents_Update(true, " + pWhoIsCalling + ");");
                $("#btnCloseAgent").attr("onclick", "Agents_UnlockRecord(" + pWhoIsCalling + ");");

                //to set the wizard to BasicData
                $("#stepsBasicData").parent().children().removeClass("active");
                $("#stepsBasicData").addClass("active");
                $("#BasicData").parent().children().removeClass("active");
                $("#BasicData").addClass("active");
                //to hide Contacts and Addresses tabs in case of partner is not saved yet
                Agents_ShowHideTabs();
            });
        });
        //}
        //, intPartnerTypeID);
        if (callback != null && callback != "undefined")
            callback(); // to reload the selectbox with the new values
    }
}
function ShipperContacts_GetList(pID, pShipperID, callback) { //pID(i.e. the ContactID) is used in case of editing to set the code or name to its original value, 2nd parameter is the (PartnerID)
    //parameters: ID, strFnName, First Row in select list, select list name
    var pWhereClause = "";

    pWhereClause = " WHERE PartnerTypeID = 1 "; //PartnerTypeID = 1 for Customers
    pWhereClause += " AND PartnerID = " + pShipperID;
    pWhereClause += " ORDER BY Name ";
    GetListWithNameAndWhereClause(pID, "/api/Contacts/LoadAll", "Select Shipper Contact", "slShipperContacts", pWhereClause);
    if (callback != null)
        callback();
}
function ConsigneeContacts_GetList(pID, pConsigneeID, callback) { //pID(i.e. the ContactID) is used in case of editing to set the code or name to its original value, 2nd parameter is the (PartnerID)
    //parameters: ID, strFnName, First Row in select list, select list name
    var pWhereClause = "";

    pWhereClause = " WHERE PartnerTypeID = 1 "; //PartnerTypeID = 1 for Customers
    pWhereClause += " AND PartnerID = " + pConsigneeID;
    pWhereClause += " ORDER BY Name ";
    GetListWithNameAndWhereClause(pID, "/api/Contacts/LoadAll", "Select Consignee Contact", "slConsigneeContacts", pWhereClause);
    if (callback != null)
        callback();
}
function NotifyContacts_GetList(pID, pNotifyID, callback) { //pID(i.e. the ContactID) is used in case of editing to set the code or name to its original value, 2nd parameter is the (PartnerID)
    //parameters: ID, strFnName, First Row in select list, select list name
    var pWhereClause = "";

    pWhereClause = " WHERE PartnerTypeID = 1 "; //PartnerTypeID = 1 for Customers
    pWhereClause += " AND PartnerID = " + pNotifyID;
    pWhereClause += " ORDER BY Name ";
    GetListWithNameAndWhereClause(pID, "/api/Contacts/LoadAll", "Select Notify Contact", "slNotifyContacts", pWhereClause);
    if (callback != null)
        callback();
}
function AgentContacts_GetList(pID, pAgentID, callback) { //pID(i.e. the ContactID) is used in case of editing to set the code or name to its original value, 2nd parameter is the (PartnerID)
    //parameters: ID, strFnName, First Row in select list, select list name
    var pWhereClause = "";

    pWhereClause = " WHERE PartnerTypeID = 2 "; //PartnerTypeID = 2 for Agents
    pWhereClause += " AND PartnerID = " + pAgentID;
    pWhereClause += " ORDER BY Name ";
    GetListWithNameAndWhereClause(pID, "/api/Contacts/LoadAll", "Select Agent Contact", "slAgentContacts", pWhereClause);
    if (callback != null)
        callback();
}
//Refill Shipper Contacts in OperationsEdit onChange
function OperationsEdit_ShipperChanged() {
    ShipperContacts_GetList(null, ($('#slShippers option:selected').val() == "" ? 0 : $('#slShippers option:selected').val()), null);
    $("#bodyShipperContactDetails").html("");
}
//Refill Consignee Contacts in OperationsEdit onChange
function OperationsEdit_ConsigneeChanged() {
    ConsigneeContacts_GetList(null, ($('#slConsignees option:selected').val() == "" ? 0 : $('#slConsignees option:selected').val()), null);
    $("#bodyConsigneeContactDetails").html("");
}
///////////////////////////////////////Routing Tab Functions///////////////////////////////////////////////
function Operations_ApproveService(pServiceToApprove, pIsApprove) {
    debugger;
    FadePageCover(true);
    var pParametersWithValues = {
        pOperationID: $("#hOperationID").val()
        , pServiceToApprove: pServiceToApprove
        , pIsApprove: pIsApprove
    }
    CallGETFunctionWithParameters("/api/Operations/ApproveService", pParametersWithValues
        , function (pData) {
            var _ReturnedMessage = pData[0];
            var _OperationHeader = JSON.parse(pData[1]);

            var h5Label = "";
            if (_OperationHeader.IsFreightApproved) {
                if ($("#hf_ChangeLanguage").val() == "en")
                    h5Label += "<u>Freight set done on</u> " + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(_OperationHeader.FreightApprovalDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(_OperationHeader.FreightApprovalDate)) : "");
                else
                    h5Label += (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(_OperationHeader.FreightApprovalDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(_OperationHeader.FreightApprovalDate)) : "") + "<u>تم الشحن في </u> ";

            }
            if (_OperationHeader.IsTruckingApproved) {
                if ($("#hf_ChangeLanguage").val() == "en")
                    h5Label += "&emsp;-&emsp;" + "<u>Trucking set done on</u> " + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(_OperationHeader.TruckingApprovalDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(_OperationHeader.TruckingApprovalDate)) : "");
                else
                    h5Label += "&emsp;-&emsp;" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(_OperationHeader.TruckingApprovalDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(_OperationHeader.TruckingApprovalDate)) : "") + "<u>تم تحديد النقل بالشاحنات في</u> ";

            }
            if (_OperationHeader.IsClearanceApproved) {
                if ($("#hf_ChangeLanguage").val() == "en")
                    h5Label += "&emsp;-&emsp;" + "<u>Clearance set done on </u> " + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(_OperationHeader.ClearanceApprovalDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(_OperationHeader.ClearanceApprovalDate)) : "");
                else
                    h5Label += "&emsp;-&emsp;" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(_OperationHeader.ClearanceApprovalDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(_OperationHeader.ClearanceApprovalDate)) : "") + "<u>تم التخليص في</u> ";

            }
            $("#h5LblApprovedServices").html(h5Label);

            var pSubject = "Oper " + $("#hOperationCode").val() + ": " + pServiceToApprove + " done.";
            var pBody = pServiceToApprove + " is set to done for operation " + $("#hOperationCode").val() + "";

            //Receptionists_GetAvailableUsers("WHERE DepartmentName in('ACCOUNTING','PAYABLE') ORDER BY Name");
            Receptionists_GetAvailableUsers("WHERE IsInactive=0 ORDER BY Name");
            $("#btnCheckboxesListApply").attr("onclick", "SendNormalAndLocalEmail('" + pSubject + "','" + pBody + "'," + $("#hOperationID").val() + "," + (pDefaults.UnEditableCompanyName == "GBL" ? true : false) + ");");
            $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send - إرسال");
        }
        , null);
}
function Operation_cbPickupOrDeliveryChange() {
    debugger;
    if ($("#cbIncludePickup").prop("checked"))
        $("#divPickupCity").removeClass("hide");
    else
        $("#divPickupCity").addClass("hide");
    if ($("#cbIncludeDelivery").prop("checked"))
        $("#divDeliveryCity").removeClass("hide");
    else
        $("#divDeliveryCity").addClass("hide");
}
///////////////////////////////////////EOF Routing Tab Functions///////////////////////////////////////////////
///////////////////////////////////////Charges Tab Functions///////////////////////////////////////////////
//in SelectChargeTypes.js
//function ActivateChargesTab() {
//    $("#General").removeClass("active");
//    $("#stepsGeneral").removeClass("active");
//    $("#Charges").addClass("active");
//    $("#stepsCharges").addClass("active");
//}
///////////////////////////////////////EOF Charges Tab Functions///////////////////////////////////////////////
/*****************************Insert From Operations********************************************/
function Operations_InsertFromOperations(pControlID) {
    debugger;
    ClearAll("#InsertFromOperationsModal");
    if (pControlID == "slPOL") {
        $("#lblShownInsertFromOperations").html(": POL");
        $("#txtCodeFromOperations").attr("data-required", true);
        $("#txtCodeFromOperations").parent().removeClass("hide");
        $("#slCountryFromOperations").html($("#" + pControlID + "Countries").html());
        $("#slCountryFromOperations").attr("data-required", true);
        $("#slCountryFromOperations").parent().removeClass("hide");
    }
    else if (pControlID == "slPOD") {
        $("#lblShownInsertFromOperations").html(": POD");
        $("#txtCodeFromOperations").attr("data-required", true);
        $("#txtCodeFromOperations").parent().removeClass("hide");
        $("#slCountryFromOperations").html($("#" + pControlID + "Countries").html());
        $("#slCountryFromOperations").attr("data-required", true);
        $("#slCountryFromOperations").parent().removeClass("hide");
    }
    else if (pControlID == "slOperationVessels") {
        $("#lblShownInsertFromOperations").html(": Vessel");
        $("#txtCodeFromOperations").attr("data-required", true);
        $("#txtCodeFromOperations").parent().removeClass("hide");
        $("#slCountryFromOperations").attr("data-required", false);
        $("#slCountryFromOperations").parent().addClass("hide");
    }
    else if (pControlID == "slLines" && $("#cbIsInland").prop("checked")) {
        $("#lblShownInsertFromOperations").html(": Trucker");
        $("#txtCodeFromOperations").attr("data-required", false);
        $("#txtCodeFromOperations").parent().addClass("hide");
        $("#slCountryFromOperations").attr("data-required", false);
        $("#slCountryFromOperations").parent().addClass("hide");
    }
    else if (pControlID == "slLines") {
        $("#lblShownInsertFromOperations").html(": Line");
        $("#txtCodeFromOperations").attr("data-required", true);
        $("#txtCodeFromOperations").parent().removeClass("hide");
        $("#slCountryFromOperations").attr("data-required", false);
        $("#slCountryFromOperations").parent().addClass("hide");
    }

    $("#btnSaveMasterDataFromOperations").attr("onclick", "Operations_SaveMasterDataFromOperations('" + pControlID + "');");
    jQuery("#InsertFromOperationsModal").modal("show");
}
function Operations_SaveMasterDataFromOperations(pControlID) {
    debugger;
    if (ValidateForm("form", "InsertFromOperationsModal")) {
        FadePageCover(true);
        var pParameters = {};
        var pStrFunctionName = "";
        if (pControlID == "slPOL" || pControlID == "slPOD") {
            pStrFunctionName = "/api/Ports/InsertFromOpertions";
            pParameters = {
                pCodeFromOperations: $("#txtCodeFromOperations").val().trim() == "" ? 0 : $("#txtCodeFromOperations").val().trim().toUpperCase()
                , pNameFromOperations: $("#txtNameFromOperations").val().trim() == "" ? 0 : $("#txtNameFromOperations").val().trim().toUpperCase()
                , pLocalNameFromOperations: $("#txtLocalNameFromOperations").val().trim() == "" ? 0 : $("#txtLocalNameFromOperations").val().trim().toUpperCase()
                , pCountryIDFromOperations: $("#slCountryFromOperations").val() == "" ? 0 : $("#slCountryFromOperations").val()
            };
        }
        else
            pParameters = {
                pCodeFromOperations: $("#txtCodeFromOperations").val().trim() == "" ? 0 : $("#txtCodeFromOperations").val().trim().toUpperCase()
                , pNameFromOperations: $("#txtNameFromOperations").val().trim() == "" ? 0 : $("#txtNameFromOperations").val().trim().toUpperCase()
                , pLocalNameFromOperations: $("#txtLocalNameFromOperations").val().trim() == "" ? 0 : $("#txtLocalNameFromOperations").val().trim().toUpperCase()
            };
        if (pControlID == "slOperationVessels")
            pStrFunctionName = "/api/Vessels/InsertFromOpertions";
        else if (pControlID == "slCommodities")
            pStrFunctionName = "/api/Commodities/InsertFromOpertions";
        else if (pControlID == "slLines" && $("#cbIsInland").prop("checked"))
            pStrFunctionName = "/api/Truckers/InsertFromOpertions";
        else if (pControlID == "slLines" && $("#cbIsOcean").prop("checked"))
            pStrFunctionName = "/api/ShippingLines/InsertFromOpertions";
        else if (pControlID == "slLines" && $("#cbIsAir").prop("checked"))
            pStrFunctionName = "/api/Airlines/InsertFromOpertions";

        CallGETFunctionWithParameters(pStrFunctionName, pParameters
            , function (pData) {
                var _MessageReturned = pData[0];
                var _InsertedID = pData[1];
                var _ReturnedList = pData[2];
                if (_MessageReturned != "")
                    swal("Sorry", _MessageReturned);
                else {
                    if (pControlID == "slPOL" || pControlID == "slPOD") {
                        $("#" + pControlID + "Countries").val($("#slCountryFromOperations").val());
                        FillListFromObject(_InsertedID, 4, "<--Select-->", pControlID, _ReturnedList, null);
                    }
                    else
                        FillListFromObject(_InsertedID, 2, "<--Select-->", pControlID, _ReturnedList, null);
                    jQuery("#InsertFromOperationsModal").modal("hide");
                }
                FadePageCover(false);
            }
            , null);
    }
}
/*****************************EOF Insert From Operations********************************************/
/*****************************Tracking Fns*************************************/
function Tracking_SubmenuTabClicked() {
    debugger;
    if ($("#tblTracking tbody tr").length == 0) {
        Tracking_LoadAll();
    }
}
function Tracking_LoadAll() {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/OperationTracking/LoadAll",
        {
            pWhereClause: "WHERE OperationID=" + ($("#hOperationID").val() == "" ? 0 : $("#hOperationID").val()) + " ORDER BY ViewOrder, TrackingDate"
        }
        , function (pData) { Tracking_BindTableRows(JSON.parse(pData[0])); FadePageCover(false); }
        , null);
}
function Tracking_BindTableRows(pTracking) {
    debugger;
    ClearAllTableRows("tblTracking");
    ClearAllTableRows("tblCustomsClearanceTracking");
    if (pDefaults.UnEditableCompanyName == "BED") {
        $("#txtTrackingNotes").attr("maxlength", "1000");
    }
    //var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' title='Print'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    var alarmControlsText = " class='btn btn-xs btn-rounded btn-warning float-right' title='Print'> <i class='fa fa-bell' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Alarm" + "</span>";
    var alarmGroupControlsText = " class='btn btn-xs btn-rounded btn-warning float-right' title='Print'> <i class='fa fa-bell' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Alarm Group" + "</span>";
    var emailControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' title='Print'> <i class='fa fa-envelope' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Email" + "</span>";
    $.each(pTracking, function (i, item) {
        AppendRowtoTable("tblTracking",
            ("<tr ID='" + item.ID + "' " + (OETra && $("#hIsOperationDisabled").val() == false ? "ondblclick='Tracking_FillControls(" + item.ID + ',"tblTracking"' + ");'>" : ">")
                + "<td class='TrackingID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='TrackingStageID hide'>" + item.TrackingStageID + "</td>"
                + "<td class='TrackingStageName'>" + (item.TrackingStageID == 0 ? "" : item.TrackingStageName) + "</td>"
                + "<td class='TrackingCreatedBy'>" + (item.CreatorName == "" ? "" : item.CreatorName) + "</td>"
                + "<td class='TrackingCustodyID hide'>" + item.CustodyID + "</td>"
                + "<td class='TrackingCustodyName'>" + (item.CustodyID == 0 ? "" : item.CustodyName) + "</td>"
                //+ "<td class='TrackingStageNotes hide'>" + item.TrackingStageNotes + "</td>"
                + "<td class='TrackingStringTrackingDate'>" + (pDefaults.UnEditableCompanyName == "BED" ? convertTimestampToDateTime(item.TrackingDate) : item.StringTrackingDate) + "</td>"
                + "<td class='TrackingTrackingDate hide'>" + item.TrackingDate + "</td>"

                + "<td class='TrackingStringReleasingDate'>" + item.StringReleasingDate + "</td>"
                + "<td class='TrackingStringLoadingDate'>" + item.StringLoadingDate + "</td>"
                + "<td class='TrackingPickupAddress'>" + item.PickupAddress + "</td>"
                + "<td class='TrackingDeliveryAddress'>" + item.DeliveryAddress + "</td>"
                + "<td class='TrackingOtherAddress'>" + item.OtherAddress + "</td>"
                + "<td class='TrackingContactDetails'>" + item.ContactDetails + "</td>"

                + "<td class='TrackingNotes'>" + item.Notes + "</td>"
                + "<td class='TrackingDone'> <input id='cbIsDone" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.Done == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='TrackingIsAlarmed hide'> <input id='cbIsAlarmed" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.IsAlarmed == true ? "true' checked='checked'" : "'") + " /></td>"
                //+ "<td class='TrackingCreatorName hide'>" + item.CreatorName + "</td>"
                //+ "<td class='ModificatorName hide'>" + item.ModificatorName + "</td>"
                //+ "<td class='hide'><a href='#TrackingModal' data-toggle='modal' onclick='Tracking_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "<td class=''>"
                + "<a href='#' data-toggle='modal' onclick='Tracking_GetAvailableDepartments(" + item.ID + ");' " + alarmGroupControlsText + "</a>"
                + "<a href='#' data-toggle='modal' onclick='Tracking_GetAvailableUsers(" + item.ID + ");' " + alarmControlsText + "</a>"
                + "<a href='#' data-toggle='modal' onclick='Tracking_OpenSendEmailModal(" + item.ID + " , \"tblTracking\");' " + emailControlsText + "</a>"
                + "</td>"
                + "</tr>"));
    });
    $.each(pTracking, function (i, item) {
        AppendRowtoTable("tblCustomsClearanceTracking",
            ("<tr ID='" + item.ID + "' " + (OETra && $("#hIsOperationDisabled").val() == false ? "ondblclick='Tracking_FillControls(" + item.ID + ',"tblCustomsClearanceTracking"' + ");'>" : ">")
                + "<td class='CustomsClearanceTrackingID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='TrackingStageID hide'>" + item.TrackingStageID + "</td>"
                + "<td class='TrackingStageName'>" + (item.TrackingStageID == 0 ? "" : item.TrackingStageName) + "</td>"
                + "<td class='TrackingCustodyID hide'>" + item.CustodyID + "</td>"
                + "<td class='TrackingCustodyName'>" + (item.CustodyID == 0 ? "" : item.CustodyName) + "</td>"
                //+ "<td class='TrackingStageNotes hide'>" + item.TrackingStageNotes + "</td>"
                + "<td class='TrackingStringTrackingDate'>" + item.StringTrackingDate + "</td>"

                + "<td class='TrackingStringReleasingDate'>" + item.StringReleasingDate + "</td>"
                + "<td class='TrackingStringLoadingDate'>" + item.StringLoadingDate + "</td>"
                + "<td class='TrackingPickupAddress'>" + item.PickupAddress + "</td>"
                + "<td class='TrackingDeliveryAddress'>" + item.DeliveryAddress + "</td>"
                + "<td class='TrackingOtherAddress'>" + item.OtherAddress + "</td>"
                + "<td class='TrackingContactDetails'>" + item.ContactDetails + "</td>"

                + "<td class='TrackingNotes'>" + item.Notes + "</td>"
                + "<td class='TrackingDone'> <input id='cbIsDone_CustomsClearanceTracking" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.Done == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='TrackingIsAlarmed hide'> <input id='cbIsAlarmed_CustomsClearanceTracking" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.IsAlarmed == true ? "true' checked='checked'" : "'") + " /></td>"
                //+ "<td class='TrackingCreatorName hide'>" + item.CreatorName + "</td>"
                //+ "<td class='ModificatorName hide'>" + item.ModificatorName + "</td>"
                //+ "<td class='hide'><a href='#TrackingModal' data-toggle='modal' onclick='Tracking_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "<td class=''>"
                + "<a href='#' data-toggle='modal' onclick='Tracking_GetAvailableDepartments(" + item.ID + ");' " + alarmGroupControlsText + "</a>"
                + "<a href='#' data-toggle='modal' onclick='Tracking_GetAvailableUsers(" + item.ID + ");' " + alarmControlsText + "</a>"
                + "<a href='#' data-toggle='modal' onclick='Tracking_OpenSendEmailModal(" + item.ID + ", \"tblCustomsClearanceTracking\");' " + emailControlsText + "</a>"
                + "</td>"
                + "</tr>"));
    });
    //ApplyPermissions();
    if (OATra && $("#hIsOperationDisabled").val() == false) { $("#btn-AddTracking").removeClass("hide"); $("#btn-AddTracking_Trucking").removeClass("hide"); $("#btn-AddCustomsClearanceTracking").removeClass("hide"); } else { $("#btn-AddTracking").addClass("hide"); $("#btn-AddTracking_Trucking").addClass("hide"); $("#btn-AddCustomsClearanceTracking").addClass("hide"); }
    if (ODTra && $("#hIsOperationDisabled").val() == false) { $("#btn-DeleteTracking").removeClass("hide"); $("#btn-DeleteCustomsClearanceTracking").removeClass("hide"); } else { $("#btn-DeleteTracking").removeClass("hide"); $("#btn-DeleteCustomsClearanceTracking").addClass("hide"); }
    if (pDefaults.UnEditableCompanyName == "MED" && pLoggedUser.DepartmentID == 8 && pOperationHeader_Global.OperationStageID == 65) {
        $("#btn-AddTracking").addClass("hide");
        $("#btn-DeleteTracking").addClass("hide");
    }
    BindAllCheckboxonTable("tblTracking", "TrackingID", "cb-CheckAll-Tracking");
    BindAllCheckboxonTable("tblCustomsClearanceTracking", "CustomsClearanceTrackingID", "cb-CheckAll-CustomsClearanceTracking");
    CheckAllCheckbox("HeaderDeleteTrackingID");
    CheckAllCheckbox("HeaderDeleteCustomsClearanceTrackingID");

    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }

    if (pDefaults.UnEditableCompanyName == "MED") {
        $(".classShowForMED").removeClass("hide");
    }
}
function Tracking_ClearAllControls(pID) {
    if (!(pID > 0))
        pID = 0;
    ClearAll("#TrackingModal");
    var TodaysDateInddMMyyyyFormat = getTodaysDateInddMMyyyyFormat();
    $("#txtTrackingDate").val(TodaysDateInddMMyyyyFormat);
    $("#txtTrackingPickupAddress").val("");
    $("#txtTrackingDeliveryAddress").val("");
    $("#txtTrackingOtherAddress").val("");
    $("#txtTrackingContactDetails").val("");

    //if (pDefaults.UnEditableCompanyName == "MED") {
    $("#txtTrackingPickupAddress").val($("#hClientPickupAddress").val());
    $("#txtTrackingDeliveryAddress").val($("#hClientDeliveryAddress").val());
    $("#txtTrackingOtherAddress").val($("#hClientOtherAddress").val());
    $("#txtTrackingContactDetails").val($("#hClientContactDetails").val());

    if (pDefaults.UnEditableCompanyName == "MED") {
        $("#txtTrackingDate").attr("disabled", "disabled");
        $("#cbIsDone").attr("disabled", "disabled");
    }
    if (pDefaults.UnEditableCompanyName == "BED") {
        const now22 = new Date();
        const hours = String(now22.getHours()).padStart(2, '0');
        const minutes = String(now22.getMinutes()).padStart(2, '0');
        let todayDateTime = TodaysDateInddMMyyyyFormat + " " + hours + ":" + minutes;
        $("#txtTrackingDate").val(todayDateTime);

        $("#txtTrackingDate").attr("disabled", "disabled");
        $("#txtTrackingDate").css("background-color", "whitesmoke");
        $("#txtTrackingNotes").attr("maxlength", "1000");

    }
    if (pDefaults.UnEditableCompanyName == "HON") {
        $(".showCreationUserInfo").removeClass("hide");
        $("#OperationTrackingCreationUser").text($("#hLoggedUserNameNotLogin").val());
    }
    //}
    var pWhereClause = "WHERE 1=1";
    pWhereClause += ($("#cbIsOcean").prop("checked") ? (" AND IsOcean=1") : ($("#cbIsAir").prop("checked") ? (" AND IsAir=1") : ($("#cbIsInland").prop("checked") ? (" AND IsInland=1") : "")));
    pWhereClause += ($("#cbIsImport").prop("checked") ? (" AND IsImport=1") : ($("#cbIsExport").prop("checked") ? (" AND IsExport=1") : ($("#cbIsDomestic").prop("checked") ? (" AND IsDomestic=1") : "")));
    pWhereClause += " ORDER BY ViewOrder";
    if ($("#slTrackingCustody option").length < 2) {
        FadePageCover(true);
        GetListWithNameAndWhereClause(null, "/api/Custody/LoadAll", TranslateString("SelectFromMenu"), "slTrackingCustody"
            , "ORDER BY Name"
            , null //function () { FadePageCover(false); }
        );
        //GetListWithNameAndWhereClause(null, "/api/TrackingStage/LoadAll", TranslateString("SelectFromMenu"), "slTrackingStage"
        //, pWhereClause
        //    , function () { FadePageCover(false); }
        //);
        GetListWithNameAndWhereClauseWithMultiAttrs(null, "Notes", "/api/TrackingStage/LoadAll", TranslateString("SelectFromMenu")
            , "slTrackingStage"
            , pWhereClause
            , function () { FadePageCover(false); });
    }
    else {
        $("#slTrackingCustody").val("");
        $("#slTrackingStage").val("");
    }
    $("#btnSaveTracking").attr("onclick", "Tracking_Insert(false,"+pID+");");
    $("#btnSaveAndNewTracking").attr("onclick", "Tracking_Insert(false," + pID +");");
}
function Tracking_FillControls(pID, pTableName) {
    debugger;
    jQuery("#TrackingModal").modal("show");
    ClearAll("#TrackingModal");
    $("#hTrackingID").val(pID);
    var tr = $("#" + pTableName + " tr[ID='" + pID + "']");
    $("#lblTrackingShown").html(": " + $(tr).find("td.TrackingStageName").text());
    var pTrackingStageID = $(tr).find("td.TrackingStageID").text();
    var pTrackingCustodyID = ($(tr).find("td.TrackingCustodyID").text() == 0 ? "" : $(tr).find("td.TrackingCustodyID").text());
    $("#txtTrackingDate").val($(tr).find("td.TrackingStringTrackingDate").text());
    $("#txtReleasingDate").val($(tr).find("td.TrackingStringReleasingDate").text());
    $("#txtLoadingDate").val($(tr).find("td.TrackingStringLoadingDate").text());
    $("#txtTrackingNotes").val($(tr).find("td.TrackingNotes").text());
    $("#txtTrackingPickupAddress").val($(tr).find("td.TrackingPickupAddress").text());
    $("#txtTrackingDeliveryAddress").val($(tr).find("td.TrackingDeliveryAddress").text());
    $("#txtTrackingOtherAddress").val($(tr).find("td.TrackingOtherAddress").text());
    $("#txtTrackingContactDetails").val($(tr).find("td.TrackingContactDetails").text());

    if (pDefaults.UnEditableCompanyName == "MED") {
        $("#txtTrackingDate").attr("disabled", "disabled");
    }

    if (pDefaults.UnEditableCompanyName == "MED") {
        if ($("#cbIsAlarmed" + pID).prop("checked"))
            $("#cbIsDone").removeAttr("disabled");
        else
            $("#cbIsDone").attr("disabled", "disabled");

    }
    if (pDefaults.UnEditableCompanyName == "HON") {
        $(".showCreationUserInfo").removeClass("hide");
        $("#OperationTrackingCreationUser").text($(tr).find("td.TrackingCreatedBy").text());
    }
    if (pDefaults.UnEditableCompanyName == "BED") {
        $("#txtTrackingDate").val(convertTimestampToDateTime($(tr).find("td.TrackingTrackingDate").text()));
        $("#txtTrackingDate").attr("disabled", "disabled");
        $("#txtTrackingDate").css("background-color", "whitesmoke");
    }

    if (pTableName == "tblTracking") {
        $("#cbIsDone").prop("checked", $("#cbIsDone" + pID).prop("checked"));
        $("#cbIsAlarmed").prop("checked", $("#cbIsAlarmed" + pID).prop("checked"));
    }
    else {
        $("#cbIsDone").prop("checked", $("#cbIsDone_CustomsClearanceTracking" + pID).prop("checked"));
        $("#cbIsAlarmed").prop("checked", $("#cbIsAlarmed_CustomsClearanceTracking" + pID).prop("checked"));

    }
    var pWhereClause = "WHERE 1=1";
    pWhereClause += ($("#cbIsOcean").prop("checked") ? (" AND IsOcean=1") : ($("#cbIsAir").prop("checked") ? (" AND IsAir=1") : ($("#cbIsInland").prop("checked") ? (" AND IsInland=1") : "")));
    pWhereClause += ($("#cbIsImport").prop("checked") ? (" AND IsImport=1") : ($("#cbIsExport").prop("checked") ? (" AND IsExport=1") : ($("#cbIsDomestic").prop("checked") ? (" AND IsDomestic=1") : "")));
    pWhereClause += " ORDER BY ViewOrder";
    if ($("#slTrackingCustody option").length < 2) {
        FadePageCover(true);
        GetListWithNameAndWhereClause(pTrackingCustodyID, "/api/Custody/LoadAll", TranslateString("SelectFromMenu")
            , "slTrackingCustody"
            , "ORDER BY Name"
            , null //function () { FadePageCover(false); }
        );


        GetListWithNameAndWhereClauseWithMultiAttrs(pTrackingStageID, "Notes", "/api/TrackingStage/LoadAll", TranslateString("SelectFromMenu")
            , "slTrackingStage"
            , pWhereClause
            , function () { FadePageCover(false); });
    }
    else {
        $("#slTrackingCustody").val(pTrackingCustodyID);
        $("#slTrackingStage").val(pTrackingStageID);
    }

    $("#hPreTrackingStageNotes").val($(tr).find("td.TrackingNotes").text());
    $("#hPreTrackingStageID").val(pTrackingStageID);
    $("#btnSaveTracking").attr("onclick", "Tracking_Update(false);");
    $("#btnSaveAndNewTracking").attr("onclick", "Tracking_Update(false);");

}
function GetTrackingStageNotes() {
    if (IsNull($("#hTrackingID").val(), "0") == "0" || $('#hPreTrackingStageID').val() != $("#slTrackingStage").val()) {
        $('#txtTrackingNotes').val($("#slTrackingStage option:selected").attr('Notes'));
    }
    else if ($('#hPreTrackingStageID').val() == $("#slTrackingStage").val()) {
        $('#txtTrackingNotes').val($("#hPreTrackingStageNotes").val());
    }

}
function Tracking_Insert(pSaveandAddNew,pID) {
    debugger;
    if (ValidateForm("form", "TrackingModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
              pOperationID: pID > 0 ? pID: $("#hOperationID").val()
            , pTrackingStageID: $("#slTrackingStage").val()
            , pCustodyID: $("#slTrackingCustody").val() == "" ? 0 : $("#slTrackingCustody").val()
            , pTrackingDate: ConvertDateFormat($("#txtTrackingDate").val())
            , pReleasingDate: $("#txtReleasingDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtReleasingDate").val())
            , pLoadingDate: $("#txtLoadingDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtLoadingDate").val())
            , pNotes: $("#txtTrackingNotes").val().trim() == "" ? "0" : $("#txtTrackingNotes").val().trim().toUpperCase()
            , pPickupAddress: $("#txtTrackingPickupAddress").val().trim() == "" ? "0" : $("#txtTrackingPickupAddress").val().trim().toUpperCase()
            , pDeliveryAddress: $("#txtTrackingDeliveryAddress").val().trim() == "" ? "0" : $("#txtTrackingDeliveryAddress").val().trim().toUpperCase()
            , pOtherAddress: $("#txtTrackingOtherAddress").val().trim() == "" ? "0" : $("#txtTrackingOtherAddress").val().trim().toUpperCase()
            , pContactDetails: $("#txtTrackingContactDetails").val().trim() == "" ? "0" : $("#txtTrackingContactDetails").val().trim().toUpperCase()
            , pDone: $("#cbIsDone").prop("checked")
            , pIsAlarmed: $("#cbIsAlarmed").prop("checked")
        };
        CallGETFunctionWithParameters("/api/OperationTracking/Insert", pParametersWithValues
            , function (pData) {
                debugger;
                if (pData[0]) {
                    if (pID == 0)
                        Tracking_BindTableRows(JSON.parse(pData[1]));
                    jQuery("#TrackingModal").modal("hide");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
function Tracking_Update(pSaveandAddNew) {
    debugger;
    if (ValidateForm("form", "TrackingModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pID: $("#hTrackingID").val()
            , pOperationID: $("#hOperationID").val()
            , pTrackingStageID: $("#slTrackingStage").val()
            , pCustodyID: $("#slTrackingCustody").val() == "" ? 0 : $("#slTrackingCustody").val()
            , pTrackingDate: ConvertDateFormat($("#txtTrackingDate").val())
            , pReleasingDate: $("#txtReleasingDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtReleasingDate").val())
            , pLoadingDate: $("#txtLoadingDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtLoadingDate").val())
            , pNotes: $("#txtTrackingNotes").val().trim() == "" ? "0" : $("#txtTrackingNotes").val().trim().toUpperCase()
            , pPickupAddress: $("#txtTrackingPickupAddress").val().trim() == "" ? "0" : $("#txtTrackingPickupAddress").val().trim().toUpperCase()
            , pDeliveryAddress: $("#txtTrackingDeliveryAddress").val().trim() == "" ? "0" : $("#txtTrackingDeliveryAddress").val().trim().toUpperCase()
            , pOtherAddress: $("#txtTrackingOtherAddress").val().trim() == "" ? "0" : $("#txtTrackingOtherAddress").val().trim().toUpperCase()
            , pContactDetails: $("#txtTrackingContactDetails").val().trim() == "" ? "0" : $("#txtTrackingContactDetails").val().trim().toUpperCase()
            , pDone: $("#cbIsDone").prop("checked")
            , pIsAlarmed: $("#cbIsAlarmed").prop("checked")
        };
        CallGETFunctionWithParameters("/api/OperationTracking/Insert", pParametersWithValues
            , function (pData) {
                debugger;
                if (pData[0]) {
                    //let taskDone = $("#cbIsDone").prop("checked");
                    if (pDefaults.UnEditableCompanyName == "MED" && pParametersWithValues.pDone == true) {
                        CallGETFunctionWithParameters("api/NoAccessDepartments/LoadAll", { pWhereClause: " WHERE Name = 'ACCOUNTING'" }, function (pD) {
                            let departments = JSON.parse(pD);
                            if (departments.length == 1) {
                                debugger;
                                Tracking_SendDoneAlarmToSpecificGroupsAuto(pParametersWithValues.pID, departments[0].ID);
                            }
                            debugger;
                        }, null);
                    }

                    Tracking_BindTableRows(JSON.parse(pData[1]));
                    jQuery("#TrackingModal").modal("hide");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
function Tracking_DeleteList(pTableName) {
    debugger;
    var pDeletedTrackingIDs = GetAllSelectedIDsAsString(pTableName);
    if (pDeletedTrackingIDs != "")
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
                FadePageCover(true);
                var pParametersWithValues = { pDeletedTrackingIDs: pDeletedTrackingIDs, pOperationID: $("#hOperationID").val() };
                CallGETFunctionWithParameters("/api/OperationTracking/Delete", pParametersWithValues
                    , function (pData) {
                        if (pData[0])
                            Tracking_BindTableRows(JSON.parse(pData[1]));
                        else
                            swal("Sorry", "Connection failed, please try again.");
                        FadePageCover(false);
                    }
                    , null);
            });
}
//if pTrackingStageID == 0 this means create Trucking Task and Alarm for MED
function Tracking_GetAvailableUsers(pTrackingStageID) {
    debugger;
    Receptionists_GetAvailableUsers();
    $("#btnCheckboxesListApply").attr("onclick", "Tracking_SendAlarm(" + pTrackingStageID + ");");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers();");
}
function Tracking_GetAvailableDepartments(pTrackingStageID) {
    debugger;
    Receptionists_GetAvailableDepartments();
    $("#btnCheckboxesListApply").attr("onclick", "Tracking_SendAlarmToGroup(" + pTrackingStageID + ");");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableDepartments();");
}
//if pTrackingStageID == 0 this means create Trucking Task and Alarm for MED
function Tracking_SendAlarm(pTrackingStageID) {
    debugger;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pAlarmReceiversIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pAlarmReceiversIDs == "")
        swal("Sorry", "You did not select any receivers.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pTrackingStageID: pTrackingStageID
            , pAlarmReceiversIDs: pAlarmReceiversIDs
            , pOperationID: $("#hOperationID").val() == "" ? 0 : $("#hOperationID").val()
        };
        CallGETFunctionWithParameters("/api/OperationTracking/SendAlarm", pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData;
                if (_MessageReturned == "") {
                    swal("Success", "Task sent successfully.");
                    Tracking_LoadAll();
                }
                else
                    swal("Sorry", _MessageReturned);
                FadePageCover(false);
            }
            , null);
    }
}
function Tracking_SendAlarmToGroup(pTrackingStageID) {
    debugger;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pAlarmReceiversDepartmentsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pAlarmReceiversDepartmentsIDs == "")
        swal("Sorry", "You did not select any departments.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pTrackingStageID: pTrackingStageID
            , pAlarmReceiversDepartmentsIDs: pAlarmReceiversDepartmentsIDs
            , pOperationID: $("#hOperationID").val() == "" ? 0 : $("#hOperationID").val()
        };
        CallGETFunctionWithParameters("/api/OperationTracking/SendAlarmToGroup", pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData;
                if (_MessageReturned == "") {
                    Tracking_LoadAll();
                    swal("Success", "Task sent successfully.");
                }
                else
                    swal("Sorry", _MessageReturned);
                FadePageCover(false);
            }
            , null);
    }
}
//MOSTAA_01/10/2020
function Tracking_OpenSendEmailModal(pID, tblID) {
    debugger;
    FadePageCover(true);
    jQuery("#TrackingEMailModal").modal("show");
    ClearAll("#TrackingEMailModal");
    $("#hEmailTrackingID").val(pID);
    var tr = $("#" + tblID + " tr[ID='" + pID + "']");
    $('#txtTrackingEmailNotes').val($(tr).find("td.TrackingNotes").text());

    $('#lblShownTrackinEmail').text($("#hClientEmail").val().toUpperCase());
    $('#txtTrackingEmailTo').val($("#hClientEmail").val().toUpperCase());

    CallGETFunctionWithParameters("/api/Contacts/GetContactsForOperation"
        , { pOperationID: $("#hOperationID").val() }
        , function (pData) {
            var _ContactEmails = pData[0];
            if ($('#txtTrackingEmailTo').val() == "")
                $("#txtTrackingEmailTo").val(_ContactEmails);
            else
                $("#txtTrackingEmailCC").val(_ContactEmails);
            FadePageCover(false);
        }
        , null);
}


function Tracking_SendEmail() {
    debugger;
    if ($('#txtTrackingEmailSubject').val().trim() == "" || $('#txtTrackingEmailTo').val().trim() == "")
        swal("Sorry", "Enter subject and receiver email.");
    else
        swal({
            title: "Are you sure?",
            text: "This will be sent via email.",
            type: "", //"warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Send.",
            closeOnConfirm: false
        },
            function () {
                FadePageCover(true);
                var pParametersWithValues = {
                    pTrackingStageID_SendEmail: parseInt($("#hEmailTrackingID").val())
                    , pSubject: $('#txtTrackingEmailSubject').val() == "" ? "0" : $('#txtTrackingEmailSubject').val().trim()
                    , pTo: $('#txtTrackingEmailTo').val() == "" ? "0" : $('#txtTrackingEmailTo').val().trim()
                    , pCC: $('#txtTrackingEmailCC').val().trim() == "" ? "0" : $('#txtTrackingEmailCC').val().trim()
                    , pBody: $('#txtTrackingEmailNotes').val() == "" ? "0" : $('#txtTrackingEmailNotes').val().trim()
                };
                CallGETFunctionWithParameters("/api/OperationTracking/OperationTracking_SendEmail", pParametersWithValues
                    , function (pData) {
                        var _MessageReturned = pData[0];
                        if (pData[0] == "")
                            swal("Success", "Task sent successfully.");
                        else
                            swal("Sorry", _MessageReturned);
                        FadePageCover(false);
                    }
                    , null);
            });
}

function Tracking_SendDoneAlarmToSpecificGroupsAuto(pTrackingStageID, pDepartmentsIDs) {
    debugger;
    var pAlarmReceiversDepartmentsIDs = pDepartmentsIDs;

    FadePageCover(true);
    var pParametersWithValues = {
        pTrackingStageID: pTrackingStageID
        , pAlarmReceiversDepartmentsIDs: pAlarmReceiversDepartmentsIDs
        , pOperationID: $("#hOperationID").val() == "" ? 0 : $("#hOperationID").val()
        , pDone: true
    };
    CallGETFunctionWithParameters("/api/OperationTracking/SendAlarmToGroup", pParametersWithValues
        , function (pData) {
            var _MessageReturned = pData;
            if (_MessageReturned == "") {
                //Tracking_LoadAll();
                //swal("Success", "Task sent successfully.");
            }
            else
                swal("Sorry", _MessageReturned);
            FadePageCover(false);
        }
        , null);

}
/***********************************************************************************/
function SwitchToOperationsEditView(pID) {
    debugger;
    LoadViews("OperationsEdit", null, pID);
    LoadOperationsSubMenu($("#cbIsAWB" + pID).prop("checked"));
}
function SwitchToOperationsEditViewEVL(pData) {
    debugger;
    if (pData[6])
        LoadViews("OperationsEdit", null, pData[1], pData[5]);
    else
        LoadViews("OperationsEdit", null, pData[1],'');

    LoadOperationsSubMenu($("#cbIsAWB" + pData[1]).prop("checked"));
}
function SwitchToOperationsView() {
    LoadViews("OperationsManagement");
    UnLoadOperationsSubMenu();
}
/*****************************AWB functions*************************************/
function OperationsAWB_ClearAllControls() {
    debugger;
    ClearAll("#OperationModal");
    if (IsAdminRoleID && !IsMESCOCompany)
        $("#txtOperationCloseDate").removeAttr("disabled");
    else
        $("#txtOperationCloseDate").attr("disabled", "disabled");
    $(".hideForAWB").addClass("hide");
    $("#slPOD").parent().attr("style", "clear:both;");
    $("#slOperationMoveTypes").attr("data-required", "false");

    $("#txtOperationOpenDate").val(ConvertDateFormat(FormattedTodaysDate));
    $("#txtOperationBLDate").val(ConvertDateFormat(FormattedTodaysDate));
    $("#slMAWBStock").html("<option value=''></option>");
    $("#slMAWBStock").attr("data-required", "true");

    $("#cbIsAWB").prop("checked", true);
    $("#cbIsAir").prop("checked", true);
    $("#divOperationExpectedDeparture").addClass("hide");
    $("#divOperationExpectedArrival").addClass("hide");
    $("#divOperationVessels").addClass("hide");
    $("#divOperationVoyageOrTruckNumber").addClass("hide");
    $("#divOperationMasterBL").addClass("hide");
    $("#spanLblSlLines").text("Airline");
    //Operations_Salesmen_GetList(4/*AdminUserID*/, "slOperationSalesman", null);
    $("#slOperationSalesman").val(4);
    //In AWB the CountryID is just Air to get all Airports all around the world
    Operations_Countries_GetList(pDefaults.DefaultCountryID, pDefaults.DefaultCountryID, null);
    //POL_GetList(pDefaults.DefaultPortID, pDefaults.DefaultCountryID, null, function () { $("#slPOD").html($("#slPOL").html()); $("#slPOD").val(""); });
    CallGETFunctionWithParameters("/api/Ports/LoadAllForCombo"
        , { pWhereClauseForCombo: "WHERE IsAir=1 AND CountryID=" + pDefaults.DefaultCountryID }
        , function (pData) {
            FillListFromObject(pDefaults.DefaultPortID, 16, "<--Select-->", "slPOL", pData[0], function () { $("#slPOD").html($("#slPOL").html()); $("#slPOD").val(""); });
        }
        , null);
    //POD_GetList(null, null, null);
    Lines_GetList(null, null);

    //$("#slOperationMoveTypes").html("<option value=''><--Select--></option>");
    GetListWithNameAndWhereClause(null, "/api/MoveTypes/LoadAll", TranslateString("SelectFromMenu"), "slOperationMoveTypes"
        , "WHERE IsAir=1 ORDER BY Name"
        , null);

    //Agents_GetList(null, null);
    $("#slAgents").html("<option value=''><--Select--></option>");

    //Shippers_GetList(null, null);
    //Consignees_GetList(null, null);
    $("#slConsignees").html($("#hReadySlCustomers").html());
    $("#slShippers").html($("#hReadySlCustomers").html());

    $("#slOperationBranch").html($("#hReadySlBranches").html());
    ActivateUserBranchSelection('slOperationBranch');
    //$("#divOperationExpectedDeparture").removeClass("hide");
    //$("#divOperationExpectedArrival").removeClass("hide");
    //$("#divOperationVessels").removeClass("hide");
    //$("#divOperationVoyageOrTruckNumber").removeClass("hide");
    //$("#divOperationMasterBL").removeClass("hide");

    $("#cbIsMaster").prop('checked', true);
    BLType_SetIconNameAndStyle();//to set the defaults

    $("#cbIsExport").prop('checked', true);
    DirectionType_SetIconNameAndStyle();//to set the defaults

    $("#cbIsAir").prop('checked', true);
    TransportType_SetIconNameAndStyle();//to set the defaults

    $("#secBLType").addClass("hide");
    $("#secDirectionType").addClass("hide");
    $("#secTransportType").addClass("hide");
    $("#secShipmentType").addClass("hide");//show section of Shipment Types radios(FCL,....)
    //$("#cbIsFCL").prop('checked', true); //set cbIsFCL to the default value

    if (CustomerAdd) { $("#btn-NewAddShipper").removeClass("hide"); $("#btn-NewAddConsignee").removeClass("hide"); }
    else { $("#btn-NewAddShipper").addClass("hide"); $("#btn-NewAddConsignee").addClass("hide"); }
    if (AgentAdd) $("#btn-NewAddAgent").removeClass("hide"); else $("#btn-NewAddAgent").addClass("hide");

    if (CustomerEdit) { $("#btn-EditShipper").removeClass("hide"); $("#btn-EditConsignee").removeClass("hide"); }
    else { $("#btn-EditShipper").addClass("hide"); $("#btn-EditConsignee").addClass("hide"); }
    if (AgentEdit) $("#btn-EditAgent").removeClass("hide"); else $("#btn-EditAgent").addClass("hide");

    Operations_ShowHideContainerControls();
    //parameter in the next 3 lines are 1:Quotations call, 2:Operations call
    $("#btn-NewAddShipper").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddConsignee").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddAgent").attr("onclick", "Agents_ClearAllControls(1);");

    $("#btn-EditShipper").attr("onclick", "Customers_FillControlsFromOperations($('#slShippers option:selected').val(), null, 1);");
    $("#btn-EditConsignee").attr("onclick", "Customers_FillControlsFromOperations($('#slConsignees option:selected').val(), null, 1);");
    $("#btn-EditAgent").attr("onclick", "Agents_FillControlsFromOperations($('#slAgents option:selected').val(), null, 1);");

    $("#btnSaveOperation").attr("onclick", "Operations_Insert(false, false, function (data) { SwitchToOperationsEditView(data[1]); }, true);");//data[1]: is the pID
    //$("#btnSaveandNewOperation").attr("onclick", "Operations_Insert(true, false);");
    $("#cb-CheckAll").prop('checked', false);
    //set close date //i put it down not to use callback(i need the radio controls to be filled first)
    Operations_SetCloseDate("txtOperationOpenDate", "txtOperationCloseDate");
    OperationsAWB_SetControlsProperties();
}
function OperationsAWB_SetControlsProperties() {
    debugger;
    $(".classAWBFields").removeClass("hide");
    $("#divAgent").addClass("hide");
    $("#slShippers").attr("data-required", true);
    $("#slAgents").attr("data-required", false);
    $("#slCommodity").attr("data-required", true);
    $("#slTypeOfStock").attr("data-required", true);
}
function OperationsAWB_FillMAWBList(pOption) { //pOption:'edit' or 'auto'
    debugger;
    if ($("#slLines").val() == "" || $("#slTypeOfStock").val() == "")
        swal("Sorry", "Please, select airline and stock type.");
    else {
        $("#slMAWBStock").html("<option value=''></option>");
        if (pOption == "auto")
            $("#slMAWBStock").prop('disabled', true);
        else
            $("#slMAWBStock").prop('disabled', false);
        MAWBStock_GetList($("#slLines").val(), pOption, null);
    }
}
function MAWBStock_GetList(pID, SlctItem, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    debugger;
    GetListMAWBStockWithMAWBSuffixAttr(pID, "/api/MAWBStock/LoadAll", "Select MAWB Stock", "slMAWBStock", SlctItem, " WHERE 1=1 and AirlineID=" + pID + " and TypeOfStockID= " + $("#slTypeOfStock").val() + " and ID not in (select MAWBStockID from Operations  where MAWBStockID is not null) " + " ORDER BY ID ", function () {
        //$("#slTypeOfStock").html($("#SlSTypeOfStock").html());
    });
}
function Operations_CallShipmentsAWB_FillControls() {
    debugger;
    ShipmentsAWB_FillControls($("#hOperationID").val());

    $("#lblManualMAWB").text("MAWB No.");
    $("#lblMAWBStockAir").text("MWB NO.");
}
/***************************************Docs*************************************/
//to fill list with house clients and their emails
function DocsOut_FillMasterAndHouses(pListItems, pSlName, pStrFirstRow, pCallback) {
    ClearAllOptions(pSlName);
    var option = "";
    if (pStrFirstRow != "" && pStrFirstRow != null)
        option = '<option value="">' + pStrFirstRow + '</option>';
    // Bind Data
    debugger;
    $.each(pListItems, function (i, item) {
        if ($("#hOperationID").val() == item.ID)
            //option += '<option value="' + item.ID + '" OperationCode="' + item.Code + '" HouseNumber="' + item.HouseNumber + '" ClientEmail="' + (item.ClientEmail == 0 ? "" : item.ClientEmail) + '" selected >' + item.Code + (item.RepBLTypeShown == 'MASTER' ? ('(MBL:' + (item.MasterBL == 0 ? "'N/A'" : item.MasterBL) + ')') : ('(House:' + (item.HouseNumber == 0 ? "'N/A'" : item.HouseNumber) + ')')) + '</option>';
            option += '<option value="' + item.ID + '" OperationCode="' + item.Code + '" HouseNumber="' + item.HouseNumber + '" ClientEmail="' + (item.ClientEmail == 0 ? "" : item.ClientEmail) + '" selected >' + /*item.EffectiveOperationCode +*/ (item.BLType == 3 ? ('(MBL:' + (item.MasterBL == 0 ? "" : item.MasterBL) + ')') : ('(HBL:' + (item.HouseNumber == 0 ? "" : item.HouseNumber) + ')')) + '</option>';
        else
            //option += '<option value="' + item.ID + '" OperationCode="' + item.Code + '" HouseNumber="' + item.HouseNumber + '" ClientEmail="' + (item.ClientEmail == 0 ? "" : item.ClientEmail) + '">' + item.Code + (item.RepBLTypeShown == 'MASTER' ? ('(MBL:' + (item.MasterBL == 0 ? "'N/A'" : item.MasterBL) + ')') : ('(House:' + (item.HouseNumber == 0 ? "'N/A'" : item.HouseNumber) + ')')) + '</option>';
            option += '<option value="' + item.ID + '" OperationCode="' + item.Code + '" HouseNumber="' + item.HouseNumber + '" ClientEmail="' + (item.ClientEmail == 0 ? "" : item.ClientEmail) + '">' + /*item.EffectiveOperationCode +*/ (item.BLType == 3 ? ('(MBL:' + (item.MasterBL == 0 ? "" : item.MasterBL) + ')') : ('(HBL:' + (item.HouseNumber == 0 ? "" : item.HouseNumber) + ')')) + '</option>';
    });

    $("#" + pSlName).append(option);
    if (pCallback != null && pCallback != undefined)
        pCallback();
}
function DocsIn_BindTableRows(pDocsInFileNames, isPayable= false) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "BED" && pDocsInFileNames != null) {
        $('#archieving_count').text(`${pDocsInFileNames.length}`);
        $('#archieving_count').removeClass('hide');
    }
    var tableID = "";
    if (pDefaults.UnEditableCompanyName == "EVL" && isPayable == true) {
        tableID = "-payables";
    }

    if (pDocsInFileNames != null) {
        ClearAllTableRows("tblDocsIn"+tableID);
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        downloadControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-cloud-download' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Download" + "</span>";
        openControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-folder-open' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Open" + "</span>";
        emailControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-envelope-o' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Mail" + "</span>";
        for (i = 0; i < pDocsInFileNames.length; i++) {
            AppendRowtoTable("tblDocsIn"+tableID,
                //("<tr ID='" + item.ID + "' ondblclick='DocumentTypes_EditByDblClick(" + item.ID + ");'>"
                ("<tr ID='" + i + "'>"
                    + "<td class='DocsInID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + pDocsInFileNames[i] + "'></td>"
                    + "<td class='FileName'>" + pDocsInFileNames[i] + "</td>"

                    //+ "<td class=''><a onclick='OpenUploadedFile(" + '"' + pDocsInFileNames[i] + '"' + ");' " + openControlsText + "</a><a onclick='SaveFile(" + '"' + pDocsInFileNames[i] + '"' + ");' " + downloadControlsText + "</a>&nbsp;&nbsp;&nbsp;</td>"
                    + "<td class=''><a onclick='OpenUploadedFile(" + '"' + pDocsInFileNames[i] + '"' + ");' " + downloadControlsText + "</a>&nbsp;&nbsp;&nbsp;</td>"
                    //+ ($("#hIsOperationDisabled").val() == false
                    //? ("<td class=''><a href='#DocumentTypeModal' data-toggle='modal' onclick='DocsOut_Print(" + item.ID + ");' " + printControlsText + "</a><a onclick='DocsOut_SendEmail(" + item.ID + ", function(){window.onbeforeunload = confirmExit;});' " + emailControlsText + "</a>&nbsp;&nbsp;&nbsp;</td>")
                    //: "<td></td>")
                    + "</tr>"));
        }
    }
    //ApplyPermissions();
    if (OADocInP && $("#hIsOperationDisabled").val() == false) { $("#inputFileUpload-payables").removeClass("hide"); $("#divUpload-payables").removeClass("hide"); } else { $("#inputFileUpload-payables").addClass("hide"); $("#divUpload-payables").addClass("hide"); }
    if (ODDocInP && $("#hIsOperationDisabled").val() == false) { $("#btn-DeleteDocsIn-payables").removeClass("hide"); } else { $("#btn-DeleteDocsIn-payables").addClass("hide"); }
    if (OADocIn && $("#hIsOperationDisabled").val() == false) { $("#inputFileUpload").removeClass("hide"); $("#divUpload").removeClass("hide"); } else { $("#inputFileUpload").addClass("hide"); $("#divUpload").addClass("hide"); }
    if (ODDocIn && $("#hIsOperationDisabled").val() == false) { $("#btn-DeleteDocsIn").removeClass("hide"); } else { $("#btn-DeleteDocsIn").addClass("hide"); }
    if (pDefaults.UnEditableCompanyName == "MED" && pLoggedUser.DepartmentID == 8 && pOperationHeader_Global.OperationStageID == 65) {
        $("#btn-DeleteDocsIn").addClass("hide");
        $("#inputFileUpload").addClass("hide");
        $("#divUpload").addClass("hide");

    }
    if (pDefaults.UnEditableCompanyName == "MED" && OADocIn && pOperationHeader_Global.OperationStageName == "INVOICE") {
        $("#inputFileUpload").removeClass("hide");
        $("#divUpload").removeClass("hide");
    }
    BindAllCheckboxonTable("tblDocsIn" + tableID, "DocsInID", "cb-CheckAll-DocsIn" + tableID);
    CheckAllCheckbox("HeaderDeleteDocsInID"+tableID);
    HideOperationActions();
}
/***************************************Vehicle*************************************/
function Vehicle_SubmenuTabClicked() {
    debugger;
    loadAllGroupsData();
    if (OAVeh && $("#hIsOperationDisabled").val() == false) {
        $("#btnAddFromExcel-Vehicle").removeClass("hide");
        //$("#btn-AddVehicleAction").removeClass("hide");
    }
    else {
        $("#btnAddFromExcel-Vehicle").addClass("hide");
        $("#btn-AddVehicleAction").addClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "EVL") {
        $("#txtVehicleChassisNo").data("required",true);
    }
    if (pOperationHeader_Global.OperationStageName == "CLOSED") { $('#btn-AddNewVehicle').parent().addClass("hide") }
    if ($("#tblVehicle tbody tr").length == 0) {
        //Comment not to load vehicles in the operations
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/OperationVehicle/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
            {
                pIsLoadArrayOfObjects: false
                , pLanguage: $("[id$='hf_ChangeLanguage']").val()
                , pPageNumber: 1
                , pPageSize: 999999
                , pWhereClause: "WHERE OperationID=" + ($("#hOperationID").val() == "" ? 0 : $("#hOperationID").val())
                , pOrderBy: "ID"
            }
            , function (pData) { Vehicle_BindTableRows(JSON.parse(pData[0])); FadePageCover(false); }
            , null);
    }
}
function Vehicle_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned() {
    debugger;
    var _SearchKey = $("#txtOperationVehicleSearch").val().trim().toUpperCase();
    var pWhereClause = " WHERE OperationID = " + $("#hOperationID").val();
    if (_SearchKey != "")
        pWhereClause += " AND (" + " \n"
            + "         Brand LIKE N'%" + _SearchKey + "%' " + " \n"
            + "         OR Model LIKE N'%" + _SearchKey + "%' " + " \n"
            + "         OR Color LIKE N'%" + _SearchKey + "%' " + " \n"
            + "         OR Body LIKE N'%" + _SearchKey + "%'" + " \n"
            + "      )" + " \n";
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/OperationVehicle/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
        {
            pIsLoadArrayOfObjects: false
            , pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pPageNumber: 1
            , pPageSize: 999999
            , pWhereClause: pWhereClause
            , pOrderBy: "ID"
        }
        , function (pData) { Vehicle_BindTableRows(JSON.parse(pData[0])); FadePageCover(false); }
        , null);
}

function Vehicle_BindTableRows(pVehicle) {
    debugger;
    ClearAllTableRows("tblVehicle");
    var inspectionControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-list' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + " Actions" + "</span>";
    $.each(pVehicle, function (i, item) {
        //console.log(item);
        AppendRowtoTable("tblVehicle",
            ("<tr ID='" + item.ID + "' " + (OEVeh && !item.IsSentToWarehouse && $("#hIsOperationDisabled").val() == false ? ("ondblclick='Vehicle_EditByDblClick(" + item.ID + ");'") : "") + ">"
                + "<td class='ID'> <input name='Delete' " + (item.ID ? "" : " disabled ") + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='OPType'>" + (item.OPType == 0 ? "" : item.OPType) + "</td>"
                + "<td class='CommodityName'>" + (item.CommodityName == 0 ? "" : item.CommodityName) + "</td>"
                + "<td class='Brand'>" + (item.Brand == 0 ? "" : item.Brand) + "</td>"
                + "<td class='Model'>" + (item.Model == 0 ? "" : item.Model) + "</td>"
                + "<td class='Color'>" + (item.Color == 0 ? "" : item.Color) + "</td>"
                + "<td class='Body'>" + (item.Body == 0 ? "" : item.Body) + "</td>"
                + "<td class='ModelYear'>" + (item.ModelYear == 0 ? "" : item.ModelYear) + "</td>"
                + "<td class='ManufactureYear'>" + (item.ManufactureYear == 0 ? "" : item.ManufactureYear) + "</td>"
                + "<td class='Manufacturecountry'>" + (item.Manufacturecountry == 0 ? "" : item.Manufacturecountry) + "</td>"
                + "<td class='Condition'>" + (item.Condition == 0 ? "" : item.Condition) + "</td>"
                + "<td class='EngineType'>" + (item.EngineType == "" ? "" : item.EngineType) + "</td>"

                + "<td class='IsEuroOne'><input type='checkbox' " + (item.IsEuroOne ? "checked" : "") + " disabled></td>"

                + "<td class='EngineDisplacement'>" + (item.EngineDisplacement == 0 ? "" : item.EngineDisplacement) + "</td>"

                + "<td class='KiloMeter'>" + (item.KiloMeter == 0 ? "" : item.KiloMeter) + "</td>"
                + "<td class='ConfigCode'>" + item.ConfigCode + "</td>"
                + "<td class='ChassisNo'>" + (item.ChassisNo == 0 ? "" : item.ChassisNo) + "</td>"


                + "<td class='VehicleAcid'>" + (item.VehicleAcid == 0 ? "" : item.VehicleAcid) + "</td>"
                + "<td class='PriceWebsite'>" + (item.PriceWebsite == 0 ? "" : item.PriceWebsite) + "</td>"

                + "<td class='PriceContract'>" + (item.PriceContract == 0 ? "" : item.PriceContract) + "</td>"
                + "<td class='DealerName'>" + (item.DealerName == 0 ? "" : item.DealerName) + "</td>"
                + "<td class='DealerLocation'>" + (item.DealerLocation == 0 ? "" : item.DealerLocation) + "</td>"
                + "<td class='IsImportApproval'><input type='checkbox' " + (item.IsImportApproval ? "checked" : "") + " disabled></td>"
                + "<td class='IsDisabilityLetter'><input type='checkbox' " + (item.IsDisabilityLetter ? "checked" : "") + " disabled></td>"
                + "<td class='Notes'>" + item.Notes + "</td>"

                //+ "<td class='IsSentToWarehouse'> <input type='checkbox' disabled='disabled' val='" + (item.IsSentToWarehouse == true ? "true' checked='checked'" : "'") + " /></td>"
                //+ "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                //+ (1 == 1 ? ("<td class='IsLoaded hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsLoaded == true ? "true' checked='checked'" : "'") + " /></td>") : "")

                //+ "<td class='DescriptionOfGoods hide'>" + (item.DescriptionOfGoods == 0 ? "" : item.DescriptionOfGoods) + "</td>"

                + ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') || $("#cbIsVehicle").prop('checked')
                    //? ("<td class='hide'><a href='#EditContainerModal' data-toggle='modal' onclick='Vehicle_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>")
                    ? ("<td class=' hide " + (OAVeh && ODVeh && $("#hIsOperationDisabled").val() == false ? "" : "hide") + "'><a href='#' data-toggle='modal' onclick='VehicleAction_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(" + item.ID + ");' " + inspectionControlsText + "</a></td></tr>")
                    : ("<td class='hide'><a href='#EditPackageModal' data-toggle='modal' onclick='Vehicle_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>")
                )));
    });
    //ApplyPermissions();
    //if (OAVeh && $("#hIsOperationDisabled").val() == false) { $("#btnAddFromExcel-Vehicle").removeClass("hide"); $(".classSetCargoProperties").removeClass("hide"); } else { $("#btnAddFromExcel-Vehicle").addClass("hide"); $(".classSetCargoProperties").addClass("hide"); }
    if (ODVeh && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteVehicle").removeClass("hide"); else $("#btn-DeleteVehicle").addClass("hide");
    BindAllCheckboxonTable("tblVehicle", "ID", "cb-CheckAll-Vehicle");
    CheckAllCheckbox("HeaderDeleteVehicleID");
    $("#lblTotalNumberOfVehicles").text(": " + $("#tblVehicle tbody tr").length);
    $("#lblNumberOfReceivedVehicles").text(": " + $("#tblVehicle tbody tr td.IsReceived:Contains(1)").length);
    $("#lblNumberOfPickedVehicles").text(": " + $("#tblVehicle tbody tr td.IsPicked:Contains(1)").length);
    HighlightText("#tblVehicle>tbody>tr", $("#txtOperationContainerAndPackagesSearch").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#divTblVehicle").width($("#mainForm").width() - 190);
    $("#divTblVehicle").height(430);
}
function Vehicle_DeleteList() {
    debugger;
    var pDeletedVehicleIDs = GetAllSelectedIDsAsString("tblVehicle");
    if (pDeletedVehicleIDs != "")
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
                FadePageCover(true);
                var pParametersWithValues = { pDeletedVehicleIDs: pDeletedVehicleIDs, pOperationID: $("#hOperationID").val() };
                CallGETFunctionWithParameters("/api/OperationVehicle/Delete", pParametersWithValues
                    , function (pData) {
                        if (pData[0])
                            Vehicle_BindTableRows(JSON.parse(pData[1]));
                        else
                            swal("Sorry", "Dependencies exist.");
                        FadePageCover(false);
                    }
                    , null);
            });
}
/********************************VehicleAction*****************************************/
function VehicleAction_BindTableRows(pVehicleAction) {
    debugger;
    ClearAllTableRows("tblVehicleAction");
    //var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' title='Print'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    //var alarmControlsText = " class='btn btn-xs btn-rounded btn-warning float-right' title='Print'> <i class='fa fa-bell' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Alarm" + "</span>";
    //var emailControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' title='Print'> <i class='fa fa-envelope' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Email" + "</span>";
    $.each(pVehicleAction, function (i, item) {
        AppendRowtoTable("tblVehicleAction",
            ("<tr ID='" + item.ID + "' " + (OETra && $("#hIsOperationDisabled").val() == false ? "ondblclick='VehicleAction_FillControls(" + item.ID + ',"tblVehicleAction"' + ");'>" : ">")
                + "<td class='VehicleActionID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='NoAccessVehicleActionID hide'>" + item.VehicleActionID + "</td>"
                + "<td class='VehicleActionEngineNumber'>" + (item.EngineNumber == 0 ? "" : item.EngineNumber) + "</td>"
                + "<td class='VehicleActionName'>" + item.VehicleActionName + "</td>"
                + "<td class='VehicleActionDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActionDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ActionDate)) : "") + "</td>"
                + "<td class='VehicleActionNotes'>" + (item.InspectionNotes == 0 ? "" : item.InspectionNotes) + "</td>"
                //+ "<td class='TrackingDone'> <input id='cbIsDone" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.Done == true ? "true' checked='checked'" : "'") + " /></td>"
                //+ "<td class='hide'><a href='#VehicleActionModal' data-toggle='modal' onclick='VehicleAction_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "<td class='hide'>"
                //+ "<a href='#' data-toggle='modal' onclick='VehicleAction_GetAvailableUsers(" + item.ID + ");' " + alarmControlsText + "</a>"
                //+ "<a href='#' data-toggle='modal' onclick='VehicleAction_SendEmail(" + item.ID + ");' " + emailControlsText + "</a>"
                + "</td>"
                + "</tr>"));
    });
    //ApplyPermissions();
    //if (OAVeh && $("#hIsOperationDisabled").val() == false) { $("#btn-AddVehicleAction").removeClass("hide"); } else { $("#btn-AddVehicleAction").addClass("hide"); }
    //if (ODVeh && $("#hIsOperationDisabled").val() == false) { $("#btn-DeleteVehicleAction").removeClass("hide"); } else { $("#btn-DeleteVehicleAction").removeClass("hide"); }
    BindAllCheckboxonTable("tblVehicleAction", "VehicleActionID", "cb-CheckAll-VehicleAction");
    CheckAllCheckbox("HeaderDeleteVehicleActionID");

    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function VehicleAction_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(pOperationVehicleID) {
    debugger;
    jQuery("#VehicleActionTableModal").modal("show");
    FadePageCover(true);
    var pWhereClauseForVehicleAction = "WHERE OperationVehicleID=" + pOperationVehicleID;
    CallGETFunctionWithParameters("/api/OperationVehicle/VehicleAction_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
        {
            pIsLoadArrayOfObjects: false
            , pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pPageNumber: 1
            , pPageSize: 999999
            , pWhereClauseForVehicleAction: pWhereClauseForVehicleAction
            , pOrderBy: "ActionDate DESC, ID DESC"
        }
        , function (pData) { VehicleAction_BindTableRows(JSON.parse(pData[0])); FadePageCover(false); }
        , null);
}
function VehicleAction_FillInspectionModal(pTableName) {
    debugger;
    var _SelectedRows = GetAllSelectedIDsAsString(pTableName);
    if (_SelectedRows == "")
        swal("Sorry", "Please, select vehicles.");
    else {
        //if (_SelectedRows.split(",").length > 1)
        //    $("#slVehicleAction").attr("disabled", "disabled");
        //else
        //    $("#slVehicleAction").removeAttr("disabled");
        ClearAll("#VehicleActionModal");
        $(".classHideForInspection").addClass("hide");
        $("#txtVehicleActionDate").val(getTodaysDateInddMMyyyyFormat());
        $("#slVehicleActionWarehouse").html("<option value=''><--Select--></option>");
        $("#slVehicleActionArea").html("<option value=''><--Select--></option>");
        $("#slVehicleActionRow").html("<option value=''><--Select--></option>");
        $("#slVehicleActionLocation").html("<option value=''><--Select--></option>");
        $("#btnSaveVehicleAction").attr("onclick", "VehicleAction_Save('tblVehicle');");
        FadePageCover(true);
        var pParametersWithValues = {
            pWhereClauseNoAccessVehicleAction: "WHERE IsOperationAction=1"
        };
        CallGETFunctionWithParameters("/api/OperationVehicle/FillInspectionModal", pParametersWithValues
            , function (pData) {
                jQuery("#VehicleActionModal").modal("show");
                var pNoAccessVehicleAction = pData[1];
                var pWarehouse = pData[2];
                FillListFromObject(null, 2, null, "slVehicleAction", pNoAccessVehicleAction, null);
                FillListFromObject(null, 9, "<--Select-->", "slVehicleActionWarehouse", pWarehouse, null);
                FadePageCover(false);
            }
            , null);
    }
}
function VehicleAction_Save(pTableName) {
    debugger;
    var _SelectedVehicles = GetAllSelectedIDsAsString(pTableName);
    if ($("#slVehicleAction").val() != constVehicleActionInspection && $("#slVehicleAction").val() != constVehicleActionPOReceipt
        && $("#slVehicleActionWarehouse").val() == "")
        swal("Sorry", "Please, Select warehouse.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pOperationVehicleIDsList: _SelectedVehicles
            , pOperationID: $("#hOperationID").val()
            , pVehicleActionID: $("#slVehicleAction").val()
            , pActionDate: $("#txtVehicleActionDate").val()
            , pInspectionNotes: $("#txtVehicleActionNotes").val().trim() == "" ? 0 : $("#txtVehicleActionNotes").val().trim().toUpperCase()
            , pWarehouseID: $("#slVehicleActionWarehouse").val() == "" ? 0 : $("#slVehicleActionWarehouse").val()
            , pRowLocationID: $("#slVehicleActionLocation").val() == "" ? 0 : $("#slVehicleActionLocation").val()
        };
        CallPOSTFunctionWithParameters("/api/OperationVehicle/VehicleAction_Save", pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData[0];
                var _ReceiveHeader = JSON.parse(pData[1]);
                var _PickupHeader = JSON.parse(pData[2]);
                var _Code = _ReceiveHeader != null ? _ReceiveHeader.Code : (_PickupHeader != null ? _PickupHeader.Code : null);

                if (_MessageReturned == "") {
                    jQuery("#VehicleActionModal").modal("hide");
                    swal("Success", _Code == null ? "Saved successfully." : ("Saved to " + _Code + "."));
                    Vehicle_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned();
                }
                else {
                    swal("Sorry", _MessageReturned);
                    FadePageCover(false);
                }
            }
            , null);
    }
}
function VehicleAction_ActionChanged() {
    debugger;
    if ($("#slVehicleAction").val() == constVehicleActionInspection || $("#slVehicleAction").val() == constVehicleActionPOReceipt)
        $(".classHideForInspection").addClass("hide");
    else
        $(".classHideForInspection").removeClass("hide");
}
function VehicleAction_WarehouseChanged() {
    debugger;
    $("#slVehicleActionArea").html("<option value=''><--Select--></option>");
    $("#slVehicleActionRow").html("<option value=''><--Select--></option>");
    $("#slVehicleActionLocation").html("<option value=''><--Select--></option>");
    if ($("#slVehicleActionWarehouse").val() != "") {
        FadePageCover(true);
        var pParametersWithValues = {
            pIsLoadArrayOfObjects: false
            , pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pPageNumber: 1
            , pPageSize: 999999
            , pWhereClause: "WHERE WarehouseID=" + $("#slVehicleActionWarehouse").val()
            , pOrderBy: "Name"
        };
        CallGETFunctionWithParameters("/api/Area/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
            , pParametersWithValues
            , function (pData) {
                var _Area = pData[0];
                FillListFromObject(null, 2, "<--Select-->", "slVehicleActionArea", _Area, null);
                FadePageCover(false);
            }
            , null);
    }
}
function VehicleAction_AreaChanged() {
    debugger;
    $("#slVehicleActionRow").html("<option value=''><--Select--></option>");
    $("#slVehicleActionLocation").html("<option value=''><--Select--></option>");
    if ($("#slVehicleActionArea").val() != "") {
        FadePageCover(true);
        var pParametersWithValues = {
            pIsLoadArrayOfObjects: false
            , pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pPageNumber: 1
            , pPageSize: 999999
            , pWhereClause: "WHERE AreaID=" + $("#slVehicleActionArea").val()
            , pOrderBy: "Name"
        };
        CallGETFunctionWithParameters("/api/Row/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
            , pParametersWithValues
            , function (pData) {
                var _Row = pData[0];
                FillListFromObject(null, 2, "<--Select-->", "slVehicleActionRow", _Row, null);
                FadePageCover(false);
            }
            , null);
    }
}
function VehicleAction_RowChanged() {
    debugger;
    $("#slVehicleActionLocation").html("<option value=''><--Select--></option>");
    if ($("#slVehicleActionRow").val() != "") {
        FadePageCover(true);
        var pParametersWithValues = {
            pRowLocationWhereClauseWithMinimalColumns: "WHERE IsUsed=0 AND RowID=" + $("#slVehicleActionRow").val()
            , pOrderBy: "Code"
            , pWarehouseID: $("#slVehicleActionWarehouse").val() == "" ? 0 : $("#slVehicleActionWarehouse").val()
        };
        CallGETFunctionWithParameters("/api/Row/RowLocation_LoadAllWithMinimalColumns"
            , pParametersWithValues
            , function (pData) {
                var _Row = pData[0];
                FillListFromObject(null, 1, "<--Select-->", "slVehicleActionLocation", _Row, null);
                FadePageCover(false);
            }
            , null);
    }
}
//*******************Reading Excel Files(Must be saved as Excel 97-2003)***************************************//
function Vehicle_onFileSelected(event, pBtnName) {
    debugger;
    var selectedFile = event.target.files[0];
    if (selectedFile != undefined) { //to handle the case of not choosing a file
        var sFilename = selectedFile.name;
        // Create A File Reader HTML5
        var reader = new FileReader();
        var result = document.getElementById("hExtractedData");
        reader.onload = function (e) {
            var data = e.target.result;
            $("#" + pBtnName).val("");
            var cfb = XLS.CFB.read(data, { type: 'binary' });
            var wb = XLS.parse_xlscfb(cfb);
            // Loop Over Each Sheet
            wb.SheetNames.forEach(function (sheetName) {
                //// Obtain The Current Row As CSV
                //var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
                var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
                //$("#hExtractedData").val(sCSV);
                //if (oJS.length > 0 && oJS[0].Item != undefined && oJS[0].EngineNumber != undefined) //if (sCSV != "")
                if (oJS.length > 0 && wb.Sheets[sheetName]["N2"].v/*Item*/ != undefined && wb.Sheets[sheetName]["C2"].v/*EngineNumber*/ != undefined) //if (sCSV != "")
                    //Vehicle_ImportFromExcelFile(oJS, pBtnName);
                    Vehicle_ImportFromExcelFile(wb.Sheets[sheetName], oJS.length);
                else {
                    swal("Sorry", "Please, revise data and version of the file.");
                }
            });
        };
        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(selectedFile);
    }
}
function Vehicle_ImportFromExcelFile(pDataRows, pNumberOfRows) {
    debugger;
    FadePageCover(true);
    var pBrandList = "";
    var pModelList = "";
    var pColorList = "";
    var pBodyList = "";
    var pModelYearList = "";
    var pManufactureYearsList = "";

    var pManufactureCountryList = "";
    var pEngineDisplacementList = "";
    var pConditionList = "";
    var pKilometersList = "";
    var pChassisNoList = "";
    var pEngineType = "";
    var pEureOneList = "";
    var pDealerList = "";
    var pDealerLocationList = "";
    var pNotesList = "";
    var pPanoramicRoofList = "";
    var pInteriorColorList = "";
    var pDriverSeatList = "";
    var pNumOfDoorsList = "";
    var pKeylessEntryList = "";
    for (var i = 3; i < (pNumberOfRows + 2); i++) { //replace '\', ' ', ',' with space
        //pMotorNumberList += (pMotorNumberList == ""
        //    ? (pDataRows[i].MotorNumber == undefined || pDataRows[i].MotorNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].MotorNumber.replace(/[\, ]/g, ' ').toUpperCase().trim())
        //    : ("," + (pDataRows[i].MotorNumber == undefined || pDataRows[i].MotorNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].MotorNumber.replace(/[\, ]/g, ' ').toUpperCase().trim()))
        //    );
        //pMotorNumberList += (pMotorNumberList == "" ? "0" : ",0");
        //pLotNumberList += (pLotNumberList == "" ? "0" : ",0");
        //pSerialNumberList += (pSerialNumberList == "" ? "0" : ",0");
        //pNotesList += (pNotesList == "" ? "0" : ",0");

        pBrandList += (pBrandList == ""
            ? (pDataRows["A" + i] == undefined || pDataRows["A" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["A" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["A" + i] == undefined || pDataRows["A" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["A" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pModelList += (pModelList == ""
            ? (pDataRows["B" + i] == undefined || pDataRows["B" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["B" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["B" + i] == undefined || pDataRows["B" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["B" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pColorList += (pColorList == ""
            ? (pDataRows["C" + i] == undefined || pDataRows["C" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["C" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["C" + i] == undefined || pDataRows["C" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["C" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pBodyList += (pBodyList == ""
            ? (pDataRows["D" + i] == undefined || pDataRows["D" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["D" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["D" + i] == undefined || pDataRows["D" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["D" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pModelYearList += (pModelYearList == ""
            ? (pDataRows["E" + i] == undefined || pDataRows["E" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["E" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["E" + i] == undefined || pDataRows["E" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["E" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pManufactureCountryList += (pManufactureCountryList == ""
            ? (pDataRows["F" + i] == undefined || pDataRows["F" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["F" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["F" + i] == undefined || pDataRows["F" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["F" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pEngineDisplacementList += (pEngineDisplacementList == ""
            ? (pDataRows["G" + i] == undefined || pDataRows["G" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["G" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["G" + i] == undefined || pDataRows["G" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["G" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pConditionList += (pConditionList == ""
            ? (pDataRows["H" + i] == undefined || pDataRows["H" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["H" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["H" + i] == undefined || pDataRows["H" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["H" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pKilometersList += (pKilometersList == ""
            ? (pDataRows["I" + i] == undefined || pDataRows["I" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["I" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["I" + i] == undefined || pDataRows["I" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["I" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pChassisNoList += (pChassisNoList == ""
            ? (pDataRows["J" + i] == undefined || pDataRows["J" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["J" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["J" + i] == undefined || pDataRows["J" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["J" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pEngineType += (pEngineType == ""
            ? (pDataRows["K" + i] == undefined || pDataRows["K" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["K" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["K" + i] == undefined || pDataRows["K" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["K" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pEureOneList += (pEureOneList == ""
            ? (pDataRows["L" + i] == undefined || pDataRows["L" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["L" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["L" + i] == undefined || pDataRows["L" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["L" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pDealerList += (pDealerList == ""
            ? (pDataRows["M" + i] == undefined || pDataRows["M" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["M" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["M" + i] == undefined || pDataRows["M" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["M" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pDealerLocationList += (pDealerLocationList == ""
            ? (pDataRows["N" + i] == undefined || pDataRows["N" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["N" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["N" + i] == undefined || pDataRows["N" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["N" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pNotesList += (pNotesList == ""
            ? (pDataRows["O" + i] == undefined || pDataRows["O" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["O" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["O" + i] == undefined || pDataRows["O" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["O" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        ); pPanoramicRoofList += (pPanoramicRoofList == ""
            ? (pDataRows["P" + i] == undefined || pDataRows["P" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["P" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["P" + i] == undefined || pDataRows["P" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["P" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        ); pInteriorColorList += (pInteriorColorList == ""
            ? (pDataRows["Q" + i] == undefined || pDataRows["Q" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["Q" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["Q" + i] == undefined || pDataRows["Q" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["Q" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pDriverSeatList += (pDriverSeatList == ""
            ? (pDataRows["R" + i] == undefined || pDataRows["R" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["R" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["R" + i] == undefined || pDataRows["R" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["R" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        ); pNumOfDoorsList += (pNumOfDoorsList == ""
            ? (pDataRows["S" + i] == undefined || pDataRows["S" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["S" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["S" + i] == undefined || pDataRows["S" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["S" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        ); pKeylessEntryList += (pKeylessEntryList == ""
            ? (pDataRows["T" + i] == undefined || pDataRows["T" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["T" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows["T" + i] == undefined || pDataRows["T" + i].v.toString().replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows["T" + i].v.toString().replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
    }

    var pParametersWithValues = {
        pOperationID: $("#hOperationID").val()
        , pBrandList: pBrandList
        , pModelList: pModelList
        , pColorList: pColorList
        , pBodyList: pBodyList
        , pModelYearList: pModelYearList
        , pManufactureCountryList: pManufactureCountryList

        , pEngineDisplacementList: pEngineDisplacementList
        , pConditionList: pConditionList
        , pKilometersList: pKilometersList
        , pChassisNoList: pChassisNoList
        , pEngineType: pEngineType
        , pEureOneList: pEureOneList
        , pDealerList: pDealerList
        , pDealerLocationList: pDealerLocationList
        , pNotesList: pNotesList
        , pPanoramicRoofList: pPanoramicRoofList
        , pInteriorColorList: pInteriorColorList
        , pDriverSeatList: pDriverSeatList
        , pNumOfDoorsList: pNumOfDoorsList
        , pKeylessEntryList: pKeylessEntryList

    };
    CallPOSTFunctionWithParameters("/api/OperationVehicle/InsertListFromExcel_Vehicle", pParametersWithValues
        , function (pData) {
            var _MessageReturned = pData[0];
            var pVehicle = JSON.parse(pData[1]);
            if (_MessageReturned == "") {
                swal("Success", "Saved Successfully.");
            }
            else {
                swal("Sorry", _MessageReturned);
            }
            Vehicle_BindTableRows(pVehicle);
            FadePageCover(false);
        }
        , null);
    //$("#" + pBtnName).val(""); //if removed the last selected file remains till unselected
}

function AddNewVehicle() {
    ClearAll("#VehicleTrackingModal", null);
    jQuery("#VehicleTrackingModal").modal("show");
    fillModelSelectBox();

}
let allGroups;

function fillModelSelectBox() {
    let brands = allGroups.filter((item) => item.parent == "G1").map((item) => item.title.trim());
    ClearAllOptions("txtVehicleBrand");
    var option = '<option value="">' + '<--Select-->' + '</option>';
    $.each(brands, function (i, item) {
        option += '<option value="' + item + '">' + item + '</option>';
    });
    $("#txtVehicleBrand").append(option);
}

function VehicleBrandChanged(obj) {

    if (obj.value == "") {
        ClearAllOptions("txtVehicleModel");
        return
    }
    let x = allGroups.filter(item => item.title.trim() == obj.value);

    let models = allGroups.filter((item) => item.parent == x[0].id);
    ClearAllOptions("txtVehicleModel");
    var option = '<option value="">' + '<--Select-->' + '</option>';
    $.each(models, function (i, item) {
        option += '<option value="' + item.title.trim() + '">' + item.title.trim() + '</option>';
    });
    $("#txtVehicleModel").append(option);
}
function loadAllGroupsData() {
    CallGETFunctionWithParameters("/api/I_ItemsGroups/LoadWithPaging", { pPageNumber: 1, pPageSize: 999999, pSearchKey: null }, function (data) {
        allGroups = JSON.parse(data[0]);



    }, null, false);
}

function DateCheckBox(id) {

    if (!$('#' + id).prop('checked')) {
        $('#' + id).parent().next().val('');
        $('#' + id).parent().next().prop('disabled', true);
    } else {
        $('#' + id).parent().next().prop('disabled', false);
    }
}

function Vehicle_SaveDetails(newVehicle) {
    debugger;
    let vehicleData = {
        pID: $('#VehicleTrackingModal #hID').val() == '' ? 0 : parseInt($('#VehicleTrackingModal #hID').val()),
        pOperationID: $("#hOperationID").val(),
        pVehicleBrand: $('#txtVehicleBrand').val().trim(),
        pVehicleModel: $('#txtVehicleModel').val().trim(),
        pVehicleColor: $('#txtVehicleColor').val().trim(),
        pVehicleBody: $('#txtVehicleBody').val().trim(),
        pVehicleModelYear: $('#txtVehicleModelYear').val() == "" ? 0 : $('#txtVehicleModelYear').val(),
        pVehicleManufactureYear: $('#txtVehicleManufactureYear').val() == "" ? 0 : $('#txtVehicleManufactureYear').val(),
        pIsEuroOne: $('#cbIsEuroOne').prop('checked'),
        pIsImportApproval: $('#cbIsImportApproval').prop('checked'),
        pIsDisabilityLetter: $('#cbIsDisabilityLetter').prop('checked'),
        pVehicleManufactureCountry: $('#txtVehicleManufactureCountry').val().trim(),
        pVehicleCondition: $('#txtVehicleCondition').val().trim(),
        pVehicleEngineType: $('#txtVehicleEngineType').val().trim(),
        pVehicleEngineDisplacement: $('#txtVehicleEngineDisplacement').val() == "" ? 0 : $('#txtVehicleEngineDisplacement').val(),
        pVehicleKilometers: $('#txtVehicleKilometers').val() == "" ? 0 : $('#txtVehicleKilometers').val(),
        pVehicleConfigCode: $('#txtVehicleConfigCode').val().trim(),
        pVehicleChassisNo: $('#txtVehicleChassisNo').val().trim(),
        pVehicleACID: $('#txtVehicleACID').val().trim(),
        pVehiclePriceWebsite: $('#txtVehiclePriceWebsite').val() == "" ? 0 : $('#txtVehiclePriceWebsite').val(),
        pVehiclePriceContract: $('#txtVehiclePriceContract').val() == "" ? 0 : $('#txtVehiclePriceContract').val(),
        pVehicleDealerName: $('#txtVehicleDealerName').val().trim(),
        pVehicleDealerLocation: $('#txtVehicleDealerLocation').val().trim(),
        pVehicleNotes: $('#txtVehicleNotes').val().trim(),
        pInteriorColorName: $('#slInteriorColorName').val().trim(),
        pIsPanoramicRoof: $('#cbIsPanoramicRoof').prop('checked'),
        pIsElectricSeats: $('#cbIsElectricSeats').prop('checked'),
        pIsCamera: $('#cbIsCamera').prop('checked'),
        pIsKeylessEntry: $('#cbIsKeylessEntry').prop('checked'),
        pIsParkingAids: $('#cbIsParkingAids').prop('checked'),
        pIsRearCamera: $('#cbIsRearCamera').prop('checked'),

        pVehicleImpModel: $('#txtVehicleImpModel').val().trim(),
        pVehicleImpCategory: $('#txtVehicleImpCategory').val().trim(),
        pImpYearOfManufacture: $('#txtImpYearOfManufacture').val() == "" ? 0 : $('#txtImpYearOfManufacture').val(),
        pVehicleImpCountryOfOrigin: $('#txtVehicleImpCountryOfOrigin').val().trim(),
        pVehicleImpCountryOfResidence: $('#txtVehicleImpCountryOfResidence').val().trim(),
        pImpIsEuroOne: $('#cbImpIsEuroOne').prop('checked'),

        pIsBillOfLading: $('#cbIsBillOfLading').prop('checked'),
        pBillOfLadingDate: $('#txtBillOfLadingDate').val().trim() == "" ? '01/01/1900' : $('#txtBillOfLadingDate').val(),

        pIsEuroOneCertificate: $('#cbIsEuroOneCertificate').prop('checked'),
        pEuroOneCertificateDate: $('#txtEuroOneCertificateDate').val().trim() == "" ? '01/01/1900' : $('#txtEuroOneCertificateDate').val(),

        pIsPowerOfAttorneys: $('#cbIsPowerOfAttorneys').prop('checked'),
        pPowerOfAttorneysDate: $('#txtPowerOfAttorneysDate').val().trim() == "" ? '01/01/1900' : $('#txtPowerOfAttorneysDate').val(),

        pIsGPSDoc: $('#cbIsGPSDoc').prop('checked'),
        pGPSDocDate: $('#txtGPSDocDate').val().trim() == "" ? '01/01/1900' : $('#txtGPSDocDate').val(),

        pIsTrafficDoc: $('#cbIsTrafficDoc').prop('checked'),
        pTrafficDocDate: $('#txtTrafficDocDate').val().trim() == "" ? '01/01/1900' : $('#txtTrafficDocDate').val(),

        pIsSADDoc: $('#cbIsSADDoc').prop('checked'),
        pSADDocDate: $('#txtSADDocDate').val().trim() == "" ? '01/01/1900' : $('#txtSADDocDate').val(),

        pIsDHL: $('#cbIsDHL').prop('checked'),
        pDHLDate: $('#txtDHLDate').val().trim() == "" ? '01/01/1900' : $('#txtDHLDate').val(),

        pIsVehicleLicense: $('#cbIsVehicleLicense').prop('checked'),
        pVehicleLicenseDate: $('#txtVehicleLicenseDate').val().trim() == "" ? '01/01/1900' : $('#txtVehicleLicenseDate').val(),

        pIsArriveAirport: $('#cbIsArriveAirport').prop('checked'),
        pArriveAirportDate: $('#txtArriveAirportDate').val().trim() == "" ? '01/01/1900' : $('#txtArriveAirportDate').val(),

        pIsArriveGhandour: $('#cbIsArriveGhandour').prop('checked'),
        pArriveGhandourDate: $('#txtArriveGhandourDate').val().trim() == "" ? '01/01/1900' : $('#txtArriveGhandourDate').val(),

        pIsPhotos: $('#cbIsPhotos').prop('checked'),
        pPhotosDate: $('#txtPhotosDate').val().trim() == "" ? '01/01/1900' : $('#txtPhotosDate').val(),

        pVehicleDownPayment: $('#txtVehicleDownPayment').val() == "" ? 0 : $('#txtVehicleDownPayment').val(),
        pVehicleApexInvoice: $('#txtVehicleApexInvoice').val() == "" ? 0 : $('#txtVehicleApexInvoice').val(),

        pVehicleEmail: $('#txtVehicleEmail').val().trim(),
        pVehiclePassword: $('#txtVehiclePassword').val().trim(),
        pVehiclePasswordTesla: $('#txtVehiclePasswordTesla').val().trim(),
        pVehicleUserNotes: $('#txtVehicleUserNotes').val().trim()

    };

    if (ValidateForm('form', 'VehicleTrackingModal')) {
        FadePageCover(true);
        CallPOSTFunctionWithParameters('/api/OperationVehicle/VehicleDetails_Save', vehicleData, function (data) {
            //console.log(data);
            if (!data[0]) {
                FadePageCover(false);
                if (data[1]) {
                    swal(data[1]);
                } else {
                    swal("Error Happened");
                }
               
                return;
            }
            swal("Saved Successfully");

     
           
            if (!newVehicle) {
                jQuery("#VehicleTrackingModal").modal("hide");
                $('#txtVehicleChassisNo').val('');
                
            } else {
                $('#VehicleTrackingModal #hID').val(0);
            }
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/OperationVehicle/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
                {
                    pIsLoadArrayOfObjects: false
                    , pLanguage: $("[id$='hf_ChangeLanguage']").val()
                    , pPageNumber: 1
                    , pPageSize: 999999
                    , pWhereClause: "WHERE OperationID=" + ($("#hOperationID").val() == "" ? 0 : $("#hOperationID").val())
                    , pOrderBy: "ID"
                }
                , function (pData) {
                    Vehicle_BindTableRows(JSON.parse(pData[0]));
                    FadePageCover(false);
                    if (data[1] != "") {
                        swal("Vehicle Chassis number found in Operations " + data[1]);
                    }
                  
                }
                , null);
        });

    } else {
        swal("Please fill the required fields");
    }
}

function Vehicle_EditByDblClick(id) {

    let vehicleID = parseInt(id);
    if (isNaN(vehicleID)) {
        return
    }

    ClearAll("#VehicleTrackingModal", null);
    //FillVehicleModalSelectBoxes();
    fillModelSelectBox();



    jQuery("#VehicleTrackingModal").modal("show");
    FadePageCover(true);

    CallGETFunctionWithParameters("/api/OperationVehicle/LoadVehicleFullDetailsWithID", { pID: vehicleID }, function (pData) {
        let data = JSON.parse(pData[0]);
        vehicleData = data[0];
        $('#VehicleTrackingModal #hID').val(vehicleData.ID);
        $('#txtVehicleBrand').val(vehicleData.Brand);

        let x = allGroups.filter(item => item.title.trim() == vehicleData.Brand.trim());

        let models = allGroups.filter((item) => item.parent == x[0].id);
        ClearAllOptions("txtVehicleModel");
        var option = '<option value="">' + '<--Select-->' + '</option>';
        $.each(models, function (i, item) {
            option += '<option value="' + item.title.trim() + '">' + item.title.trim() + '</option>';
        });
        $("#txtVehicleModel").append(option);

        $('#txtVehicleModel').val(vehicleData.Model);
        $('#txtVehicleColor').val(vehicleData.Color);
        $('#txtVehicleBody').val(vehicleData.Body);
        $('#txtVehicleModelYear').val(vehicleData.ModelYear == 0 ? "" : vehicleData.ModelYear);
        $('#txtVehicleManufactureYear').val(vehicleData.ManufactureYear == 0 ? "" : vehicleData.ManufactureYear);
        $('#cbIsEuroOne').prop('checked', vehicleData.IsEuroOne);
        $('#cbIsImportApproval').prop('checked', vehicleData.IsImportApproval);
        $('#cbIsDisabilityLetter').prop('checked', vehicleData.IsDisabilityLetter);
        $('#txtVehicleManufactureCountry').val(vehicleData.Manufacturecountry);
        $('#txtVehicleCondition').val(vehicleData.Condition);
        $('#txtVehicleEngineType').val(vehicleData.EngineType);
        $('#txtVehicleEngineDisplacement').val(vehicleData.EngineDisplacement == 0 ? "" : vehicleData.EngineDisplacement);
        $('#txtVehicleKilometers').val(vehicleData.KiloMeter == 0 ? "" : vehicleData.KiloMeter);
        $('#txtVehicleConfigCode').val(vehicleData.ConfigCode);

        $('#txtVehicleChassisNo').val(vehicleData.ChassisNo);
        $('#txtVehicleACID').val(vehicleData.VehicleAcid);
        $('#txtVehiclePriceWebsite').val(vehicleData.PriceWebsite == 0 ? "" : vehicleData.PriceWebsite);
        $('#txtVehiclePriceContract').val(vehicleData.PriceContract == 0 ? "" : vehicleData.PriceContract);
        $('#txtVehicleDealerName').val(vehicleData.DealerName);
        $('#txtVehicleDealerLocation').val(vehicleData.DealerLocation);
        $('#txtVehicleNotes').val(vehicleData.Notes);

        $('#slInteriorColorName').val(vehicleData.InteriorColorName);
        $('#cbIsPanoramicRoof').prop('checked', vehicleData.IsPanoramicRoof);
        $('#cbIsElectricSeats').prop('checked', vehicleData.IsElectricSeats);
        $('#cbIsCamera').prop('checked', vehicleData.IsCamera);
        $('#cbIsKeylessEntry').prop('checked', vehicleData.IsKeylessEntry);
        $('#cbIsParkingAids').prop('checked', vehicleData.IsParkingAids);
        $('#cbIsRearCamera').prop('checked', vehicleData.IsRearCamera);

        $('#txtVehicleImpModel').val(vehicleData.ImpModel == "0" ? "" : vehicleData.ImpModel);
        $('#txtVehicleImpCategory').val(vehicleData.ImpCategory == "0" ? "" : vehicleData.ImpCategory);
        $('#txtImpYearOfManufacture').val(vehicleData.ImpYearOfManufacture == 0 ? "" : vehicleData.ImpYearOfManufacture);
        $('#txtVehicleImpCountryOfOrigin').val(vehicleData.ImpCountryOfOrigin == "0" ? "" : vehicleData.ImpCountryOfOrigin);
        $('#txtVehicleImpCountryOfResidence').val(vehicleData.ImpCountryOfResidence == "0" ? "" : vehicleData.ImpCountryOfResidence);
        $('#cbImpIsEuroOne').prop('checked', vehicleData.ImpIsEuroOne);

        $('#cbIsBillOfLading').prop('checked', vehicleData.IsBillOfLading);
        if (vehicleData.IsBillOfLading) {
            $('#txtBillOfLadingDate').val(GetDateFromServer(vehicleData.BillOfLadingDate));
            $('#txtBillOfLadingDate').prop('disabled', false);
        }

        $('#cbIsEuroOneCertificate').prop('checked', vehicleData.IsEuroOneCertificate);
        if (vehicleData.IsEuroOneCertificate) {
            $('#txtEuroOneCertificateDate').val(GetDateFromServer(vehicleData.EuroOneCertificateDate));
            $('#txtEuroOneCertificateDate').prop('disabled', false);
        }

        $('#cbIsPowerOfAttorneys').prop('checked', vehicleData.IsPowerOfAttorneys);
        if (vehicleData.IsPowerOfAttorneys) {
            $('#txtPowerOfAttorneysDate').val(GetDateFromServer(vehicleData.PowerOfAttorneysDate));
            $('#txtPowerOfAttorneysDate').prop('disabled', false);
        }
        $('#cbIsGPSDoc').prop('checked', vehicleData.IsGPSDoc);
        if (vehicleData.IsGPSDoc) {
            $('#txtGPSDocDate').val(GetDateFromServer(vehicleData.GPSDocDate));
            $('#txtGPSDocDate').prop('disabled', false);
        }
        $('#cbIsTrafficDoc').prop('checked', vehicleData.IsTrafficDoc);
        if (vehicleData.IsTrafficDoc) {
            $('#txtTrafficDocDate').val(GetDateFromServer(vehicleData.TrafficDocDate));
            $('#txtTrafficDocDate').prop('disabled', false);
        }
        $('#cbIsSADDoc').prop('checked', vehicleData.IsSADDoc);
        if (vehicleData.IsSADDoc) {
            $('#txtSADDocDate').val(GetDateFromServer(vehicleData.SADDocDate));
            $('#txtSADDocDate').prop('disabled', false);
        }
        $('#cbIsDHL').prop('checked', vehicleData.IsDHL);
        if (vehicleData.IsDHL) {
            $('#txtDHLDate').val(GetDateFromServer(vehicleData.DHLDate));
            $('#txtDHLDate').prop('disabled', false);
        }
        $('#cbIsVehicleLicense').prop('checked', vehicleData.IsVehicleLicense);
        if (vehicleData.IsVehicleLicense) {
            $('#txtVehicleLicenseDate').val(GetDateFromServer(vehicleData.VehicleLicenseDate));
            $('#txtVehicleLicenseDate').prop('disabled', false);
        }

        $('#cbIsArriveAirport').prop('checked', vehicleData.IsArriveAirport);
        if (vehicleData.IsArriveAirport) {
            $('#txtArriveAirportDate').val(GetDateFromServer(vehicleData.ArriveAirportDate));
            $('#txtArriveAirportDate').prop('disabled', false);
        }
        $('#cbIsArriveGhandour').prop('checked', vehicleData.IsArriveGhandour);
        if (vehicleData.IsArriveGhandour) {
            $('#txtArriveGhandourDate').val(GetDateFromServer(vehicleData.ArriveGhandourDate));
            $('#txtArriveGhandourDate').prop('disabled', false);
        }
        $('#cbIsPhotos').prop('checked', vehicleData.IsPhotos);
        if (vehicleData.IsPhotos) {
            $('#txtPhotosDate').val(GetDateFromServer(vehicleData.PhotosDate));
            $('#txtPhotosDate').prop('disabled', false);
        }

        $('#txtVehicleDownPayment').val(vehicleData.DownPayment == 0 ? "" : vehicleData.DownPayment);
        $('#txtVehicleApexInvoice').val(vehicleData.ApexInvoice == 0 ? "" : vehicleData.ApexInvoice);

        $('#txtVehicleEmail').val(vehicleData.VehicleEmail == "0" ? "" : vehicleData.VehicleEmail);
        $('#txtVehiclePassword').val(vehicleData.VehiclePassword == "0" ? "" : vehicleData.VehiclePassword);
        $('#txtVehiclePasswordTesla').val(vehicleData.VehiclePasswordTesla == "0" ? "" : vehicleData.VehiclePasswordTesla);
        $('#txtVehicleUserNotes').val(vehicleData.VehicleNotes == "0" ? "" : vehicleData.VehicleNotes);



        FadePageCover(false);
    });



}

//******************************EOF Reading Excel Files***************************************//
//******************************Send Alarm***************************************//
function LocalEmails_SendAlarm() {
    debugger;
    //var pModalName = "CheckboxesListModal";
    //var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = "";//GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    // CallGETFunctionWithParameters("/api/Users/LoadAll", { pWhereClause: "WHERE RoleID=1 ORDER BY Name" }
    CallGETFunctionWithParameters("/api/Users/LoadAll", { pWhereClause: "WHERE DepartmentName='TRANSPORTATION' ORDER BY Name" }
        , function (pData) {
            //txtAccountingUsers
            $('#txtAccountingUsers').html('');
            var i = 0;
            TotalAccountingUsers = JSON.parse(pData[0]).length;
            for (i = 0; i < JSON.parse(pData[0]).length; i++) {
                pSelectedItemsIDs += ((pSelectedItemsIDs == "") ? "" : ",") + JSON.parse(pData[0])[i].ID;
            }
        }
        , function () {
            if ($("#txtSubjectAlarm").val().trim() == "" || $("#txtBodyAlarm").val().trim() == "")
                swal("Sorry", "Please, make sure to enter subject and body.");
            else if (pSelectedItemsIDs == "")
                swal("Sorry", "You have to select at least one receptionist.");
            else { //send
                FadePageCover(true);
                var pParametersWithValues = {
                    pUserIDs: pSelectedItemsIDs
                    , pSubject: $("#txtSubjectAlarm").val().trim().toUpperCase()
                    , pBody: $("#txtBodyAlarm").val().trim().toUpperCase()
                    , pQuotationRouteID: 0
                    , pPricingID: 0
                    , pRequestOrReply: 0
                    , pOperationID: $("#hOperationID").val() //($("#slRegardingOperation").val() == undefined || $("#slRegardingOperation").val() == "" ? 0 : $("#slRegardingOperation").val())
                    , pIsAlarm: true
                    , pParentID: IsNull($('#hParentEmailAlarmID').val(), IsNull($('#hLocalEmailAlarmID').val(), "0"))
                    , pEmailSource: 10
                    , pIsSendNormalEmail: false
                    //LoadWithPaging parameters
                    , pWhereClauseForLoadWithPaging: LocalEmails_GetWhereClause()
                    , pPageSize: $("#select-page-size").val()
                    //pPageNumber is 1 coz its insert so it will be on the top
                    , pPageNumber: 1 //$("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text() 
                    , pOrderBy: "ID DESC"
                    , pSenderUserID: pLoggedUser.ID
                };
                CallGETFunctionWithParameters("/api/LocalEmails/SendEmail", pParametersWithValues
                    , function (pData) {
                        if (pData[0]) {
                            jQuery("#LocalEmailsAlarmModal").modal("hide");
                            $('#txtSubjectAlarm').val('');
                            $('#txtBodyAlarm').val('');
                            swal("Success", "Sent Successfully.");

                        }
                        else
                            swal("Sorry", "Connection failed, please try again.");
                        FadePageCover(false);
                    }
                    , null);
            }
        }

    );

}


//*******************CC Module***************************************//
function ChangeTransportTypeCCModule() {
    //*******************Add Line in mainapp***************************************//



    var strFnName = "";
    var str1stRow = "";
    var pWhereClause = " WHERE 1=1 ORDER BY Name ";
    debugger;
    if ($('input[name=cbTransportTypeCCModule]:checked').val() == 1
        || $('input[name=cbTransportType]:checked').val() == null) {//null is for case of first load
        strFnName = "/api/ShippingLines/LoadAll";
        str1stRow = "Select Shipping Line";
        $('#lblLineCCModule').text('Line الخط الملاحي');
    }
    if ($('input[name=cbTransportTypeCCModule]:checked').val() == 2) {
        strFnName = "/api/Airlines/LoadAll";
        str1stRow = "Select Airline";
        $('#lblLineCCModule').text('Line الخط الجوى');
    }
    if ($('input[name=cbTransportTypeCCModule]:checked').val() == 3) {
        strFnName = "/api/Truckers/LoadAll";
        str1stRow = "Select Trucker";
        $('#lblLineCCModule').text('Trucker مقاول النقل');
    }

    GetListWithNameAndWhereClause(0, strFnName, str1stRow, "slLineCCModule", pWhereClause);



}
function Operations_InsertCCModule(pSaveandAddNew, pIsShipment, callback, pIsAWB) { //pIsShipment: is true if this fn is called from adding new house op from consolidation
    debugger;
    if ($("#btnSaveCC").prop("disabled") == true)
        return;

    $(".validation-error").removeClass("validation-error");
    FadePageCover(true);

    var pShipmentType = 0;
    var pDirectionType = 0;
    var pBLType = 0;
    var pTransportType = 0;

    if ($("#cbIsOceanCCModule").prop("checked"))
        pShipmentType = 1;
    else if ($("#cbIsInlandCCModule").prop("checked"))
        pShipmentType = 3;
    else
        pShipmentType = 0;

    pBLType = $('input[name=cbBLTypeCCModule]:checked').val();
    pDirectionType = $('input[name=cbDirectionTypeCCModule]:checked').val();
    pTransportType = $('input[name=cbTransportTypeCCModule]:checked').val()



    if (1 != 1) {

    }
    //if (!isValidDate($("#txtOperationOpenDate").val().trim(), 1)) {
    //    swal(strSorry, strCheckDates);
    //    FadePageCover(false);
    //}
    //else if (Date.prototype.compareDates(ConvertDateFormat($("#txtOperationOpenDate").val().trim()), ConvertDateFormat($("#txtOperationCloseDate").val().trim())) <= 0) {
    //    swal(strSorry, "Close date must be after open date.");
    //    FadePageCover(false);
    //}
    //    //else if (!isValidDate($("#txtOperationCutOffDate").val().trim(), 1) && $("#txtOperationCutOffDate").val().trim() != "")
    //    //    swal("Sorry", "Please, Check Cut Off Date.");
    //else if (isValidDate($("#txtOperationExpectedDeparture").val().trim(), 1) && isValidDate($("#txtOperationExpectedArrival").val().trim(), 1)
    //    && Date.prototype.compareDates(ConvertDateFormat($("#txtOperationExpectedDeparture").val().trim()), ConvertDateFormat($("#txtOperationExpectedArrival").val().trim())) < 0) {
    //    swal(strSorry, "ETA must be after ETD date.");
    //    FadePageCover(false);
    //}
    //else if ($('#slPOL option:selected').val() == $('#slPOD option:selected').val() && $('#slPOL option:selected').val() != "" && $('#slPOL option:selected').val() != undefined && !$("#cbIsDomestic").prop("checked")) {//check different ports
    //    swal(strSorry, strPOLEqualPODWarning);
    //    FadePageCover(false);
    //}
    //    //check Domestic with POLCountry = PODCountry
    //else if ($('input[name=cbDirectionType]:checked').val() == 3 && $('#slPOLCountries option:selected').val() != $('#slPODCountries option:selected').val() && $('#slPOLCountries option:selected').val() != undefined) {
    //    swal(strSorry, strDomesticWithDifferentCountriesWarning);
    //    FadePageCover(false);
    //}

    //else if ($("#txtOperationNumberOfContainers").val() > 50 && $("#txtOperationNumberOfContainers").val() != "") {
    //    swal("Sorry", "You can not enter more than 50 containers at the first time.");
    //    FadePageCover(false);
    //}
    else { //Ports are OK

        //BLType : 1-Direct 2-House 3-Master
        //DirectionType : 1-Import 2-Export 3-Domestic
        //TransportType : 1-Ocean 2-Air 3-Inland
        //ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL

        var parameters = {
            //if HouseNumber is not null then its entered manually
            "pIsShipment": pIsShipment,
            "pCodeSerial": 0 /*generated automatically*/,
            "pCode": (pIsShipment || pBLType == constHouseBLType)
                ? "0"
                : ("O" + $("#txtOperationOpenDateCCModule").val().substring(10, 8) + "-" + GetDirectionType($('input[name=cbDirectionTypeCCModule]:checked').val()).substring(0, 3) + "-"
                    + GetTransportType($('input[name=cbTransportTypeCCModule]:checked').val()).substring(0, 2) + "-"),
            "pHouseNumber": pIsShipment
                ? ($("#txtShipmentHouseNumber").val().trim().toUpperCase() == "" ? 0 : $("#txtShipmentHouseNumber").val().trim().toUpperCase())
                : "0",//if "0" then auto generated
            "pBranchID": pLoggedUser.BranchID,// $('#slOperationBranch option:selected').val(),
            "pSalesmanID": 0,// $('#slOperationSalesman option:selected').val(),

            "pBLType": pIsShipment ? constHouseBLType : pBLType,
            "pBLTypeIconName": pIsShipment ? HouseIconName : $("#hBLTypeIconName").val(),
            "pBLTypeIconStyle": pIsShipment ? strHouseIconStyleClassName : $("#hBLTypeIconStyle").val(),

            "pDirectionType": pDirectionType,
            "pDirectionIconName": $("#hDirectionIconName").val(),
            "pDirectionIconStyle": $("#hDirectionIconStyle").val(),

            "pTransportType": $('input[name=cbTransportTypeCCModule]:checked').val(),
            "pTransportIconName": $("#hTransportIconName").val(),
            "pTransportIconStyle": $("#hTransportIconStyle").val(),

            "pShipmentType": pIsShipment
                ? ($("#cbIsOceanCCModule").prop("checked") || $("#cbIsInland").prop("checked")
                    ? (pShipmentType == constConsolidationShipmentType ? ($("#cbIsOceanCCModule").prop("checked") ? constLCLShipmentType : constLTLShipmentType)
                        : pShipmentType)
                    : 0 //air and house
                )/*No air in this case coz air has no consolidation*/
                : (pTransportType == AirTransportType ? 0 : pShipmentType),
            "pMasterBL": pIsShipment
                ? "0"
                : ($("#txtOperationMasterBL").val().trim() == "" ? "0" : $("#txtOperationMasterBL").val().trim().toUpperCase()),
            "pShipperID": pDirectionType == 2 ? $('#slClientCCModule option:selected').val() : 0,
            "pShipperAddressID": 0,
            "pShipperContactID": 0,
            "pConsigneeID": pDirectionType == 1 ? $('#slClientCCModule option:selected').val() : 0,
            "pConsigneeAddressID": 0,
            "pConsigneeContactID": 0,
            "pNotifyID": $('#slNotify option:selected').val() == "" || $('#slNotify option:selected').val() == null || $('#slNotify option:selected').val() == undefined ? 0 : $('#slNotify option:selected').val(),
            "pAgentID": $('#slAgents').val() == "" || $('#slAgents').val() == null ? 0 : $('#slAgents option:selected').val(),
            "pAgentAddressID": 0,
            "pAgentContactID": 0,
            "pIncotermID": 0,
            "pPOrC": pIsShipment ? ($("#slShipmentPOrC").val() == "" ? 0 : $("#slShipmentPOrC").val()) : ($("#radIsConfirm1").prop('checked') ? 1 : 3),
            "pMoveTypeID": $("#slOperationMoveTypes").val() == "" ? 0 : $("#slOperationMoveTypes").val(),
            "pCommodityID": pIsShipment ? 0 : ($('#slCommodityCCModule').val() == "" ? 0 : $('#slCommodityCCModule').val()),
            "pTransientTime": 0,
            "pOpenDate": ConvertDateFormat($("#txtOperationOpenDateCCModule").val().trim()),
            //"pCloseDate": null,
            "pCloseDate": ConvertDateFormat($("#txtOperationCloseDate").val().trim()),
            "pCutOffDate": "01/01/1900",
            "pIncludePickup": false,
            "pPickupCityID": 0,
            "pPickupAddressID": 0,
            "pPOLCountryID": (pIsShipment/*means its house*/ ? $('#slOriginCountryCCModule').val() : $('#slOriginCountryCCModule option:selected').val()),
            "pPOL": 0,//(pIsShipment/*means its house*/ ? $('#hPOL').val() : $('#slOriginCountryCCModule option:selected').val()),
            "pPODCountryID": 0,//(pIsShipment/*means its house*/ ? $('#hPODCountryID').val() : $('#slPODCountries option:selected').val()),
            "pPOD": 0,//(pIsShipment/*means its house*/ ? $('#hPOD').val() : $('#slPOD option:selected').val()),
            "pShippingLineID": (pIsShipment/*means its house*/ || pBLType == constHouseBLType || $('#slLines option:selected').val() == "")
                ? 0
                : (pTransportType == OceanTransportType ? $('#slLines option:selected').val() : 0),
            "pAirlineID": (pIsShipment/*means its house*/ || pBLType == constHouseBLType || $('#slLines option:selected').val() == "")
                ? 0
                : (pTransportType == AirTransportType ? $('#slLines option:selected').val() : 0),
            "pTruckerID": (pIsShipment/*means its house*/ || pBLType == constHouseBLType || $('#slLines option:selected').val() == "")
                ? 0
                : (pTransportType == InlandTransportType ? $('#slLines option:selected').val() : 0),
            "pIncludeDelivery": false,
            "pDeliveryZipCode": 0,
            "pDeliveryCityID": (pIsShipment
                ? ($("#slDeliveryCity").val() == "" || $("#slDeliveryCity").val() == undefined || $("#slDeliveryCity").val() == null ? 0 : $("#slDeliveryCity").val())
                : 0),
            "pDeliveryCountryID": 0,//i am leaving it the same as PODCountryID
            "pNetWeight": pIsShipment ?
                ($("#txtNetWeightCCModule").val() == "" ? 0 : $("#txtNetWeightCCModule").val())
                : 0,
            "pGrossWeight": pIsShipment ? ($("#txtShipmentGrossWeight").val() == "" ? 0 : $("#txtShipmentGrossWeight").val())
                : ($("#txtGrossWeightCCModule").val() == "" ? 0 : $("#txtGrossWeightCCModule").val()),
            "pVolume": 0, // pIsShipment ?   ($("#txtShipmentVolume").val() == "" ? 0 : $("#txtShipmentVolume").val())    : 0,
            "pChargeableWeight": 0, //pIsShipment ?      0    : ($("#txtChargeableWeight").val() == "" ? 0 : $("#txtChargeableWeight").val()),
            "pPackageTypeID": 0, // pIsShipment ?   $("#slShipmentPackageTypes").val() == "" || $("#slShipmentPackageTypes").val() == null || $("#slShipmentPackageTypes").val() == undefined ? 0 : $("#slShipmentPackageTypes").val()    : 0,
            "pNumberOfPackages": pIsShipment ? ($("#txtNoOfPackagesCCModule").val() == "" || $("#txtNoOfPackagesCCModule").val() == 0 ? 1 : $("#txtNoOfPackagesCCModule").val()) : 1,
            "pIsDangerousGoods": 0,//$("#cbDangerousGoods").prop("checked"),
            "pNotes": $("#divNotesNotesCCModule").val().trim().toUpperCase(),
            "pIsDelivered": pIsShipment ? $("#cbIsDelivered").prop("checked") : false,
            "pIsTrucking": false, //$("#cbIsTrucking").prop("checked"),
            "pIsInsurance": false, //$("#cbIsInsurance").prop("checked"),
            "pIsClearance": false, //$("#cbIsClearance").prop("checked"),
            "pIsGenset": false, //$("#cbIsGenset").prop("checked"),
            "pIsCourrier": false, //$("#cbIsCourrier").prop("checked"),
            "pIsTelexRelease": false, //$("#cbIsTelexRelease").prop("checked"),
            "pCustomerReference": 0,// pIsShipment ?    ($("#txtShipmentCustomerReference").val() == "" ? 0 : $("#txtShipmentCustomerReference").val())      : "0",
            "pSupplierReference": "0",
            "pPONumber": pIsShipment ? ($("#txtPONumberCCModule").val() == "" ? 0 : $("#txtPONumberCCModule").val()) : "0",
            "pAgreedRate": "0",
            "pOperationStageID": 60, //this means Order
            "pNumberOfHousesConnected": 0,
            "pExpectedDeparture": "01/01/1900",//pIsShipment    ? "01/01/1900"   : ($("#txtOperationExpectedDeparture").val().trim() == "" ? "01/01/1900" : $("#txtOperationExpectedDeparture").val().trim().toUpperCase()),
            "pExpectedArrival": "01/01/1900",// pIsShipment     ? "01/01/1900"    : ($("#txtOperationExpectedArrival").val().trim() == "" ? "01/01/1900" : $("#txtOperationExpectedArrival").val().trim().toUpperCase()),
            "pVoyageOrTruckNumber": 0, //pIsShipment    ? "0"     : ($("#txtOperationVoyageOrTruckNumber").val().trim() == "" ? "0" : $("#txtOperationVoyageOrTruckNumber").val().trim().toUpperCase()),
            "pVesselID": pIsShipment ? "0" : ($("#slVesselCCModule").val() == "" ? "0" : $("#slVesselCCModule").val()),
            "pContainerTypeID": 0,// pIsShipment    ? "0"     : ($("#slOperationContainerType").val() == "" ? "0" : $("#slOperationContainerType").val()),
            "pNumberOfContainers": 0, //pIsShipment   ? "0"  : ($("#txtOperationNumberOfContainers").val() == "" ? "0" : $("#txtOperationNumberOfContainers").val()),
            "pContainerTypeID2": 0,//pIsShipment     ? "0"   : ($("#slOperationContainerType2").val() == "" ? "0" : $("#slOperationContainerType2").val()),
            "pNumberOfContainers2": 0,//pIsShipment    ? "0"      : ($("#txtOperationNumberOfContainers2").val() == "" ? "0" : $("#txtOperationNumberOfContainers2").val()),
            "pContainerTypeID3": 0,//pIsShipment        ? "0"  : ($("#slOperationContainerType3").val() == "" ? "0" : $("#slOperationContainerType3").val()),
            "pNumberOfContainers3": 0,//pIsShipment     ? "0"  : ($("#txtOperationNumberOfContainers3").val() == "" ? "0" : $("#txtOperationNumberOfContainers3").val()),
            /***************************Venus Fields: A.Medra****************************/
            "pBLDate": "01/01/1900",// pIsShipment    ? "01/01/1900"    :       ($("#txtOperationBLDate").val().trim() == "" ? "01/01/1900" : $("#txtOperationBLDate").val().trim()),
            "pMAWBStockID": 0,//$("#slMAWBStock").val() == "" ? 0 : $("#slMAWBStock").val(),
            "pTypeOfStockID": 0,// $('#slTypeOfStock  option:selected').val() == "" ? 0 : $('#slTypeOfStock option:selected').val(),
            "pMAWBSuffix": 0,// pIsShipment ? "0" : ($("#slMAWBStock").val() == "" ? "0" : $("#slMAWBStock option:selected").text()),
            "pFlightNo": 0,// pIsShipment ? "0" : ($("#txtFlightNo").val().trim() == "" ? 0 : $("#txtFlightNo").val().toUpperCase()),
            "pIsAWB": 0,// pIsShipment ? false : $("#cbIsAWB").prop("checked"),
            "pConsigneeID2": 0,//$('#slConsignees2 option:selected').val() == "" || $('#slConsignees2 option:selected').val() == null || $('#slConsignees2 option:selected').val() == undefined    ? 0 : $('#slConsignees2 option:selected').val(),
            "pReleaseDate": pIsShipment ? ($("#txtShipmentReleaseDate").val().trim() == "" ? "01/01/1900" : $("#txtShipmentReleaseDate").val().trim()) : "01/01/1900",
            "pACIDNumber": pIsShipment ? ($("#txtShipmentACIDNumber").val() == "" ? "0" : $("#txtShipmentACIDNumber").val()) : 0,
            "pACIDNumberDetails": pIsShipment ? ($("#txtShipmentACIDDetails").val() == "" ? "0" : $("#txtShipmentACIDDetails").val()) : "0",
            "pUNNumber": pIsShipment ? ($("#txtShipmentUNNumber").val() == "" || $("#txtShipmentUNNumber").val() == null ? 0 : $("#txtShipmentUNNumber").val())
                : (pDefaults.UnEditableCompanyName == "NIL" ? $("#slCIPStatus").val() : ($("#txtOperationUNNumber").val() == "" || $("#txtOperationUNNumber").val() == null ? 0 : $("#txtOperationUNNumber").val())),
            "pIMOClass": pIsShipment ? ($("#txtShipmentIMOClass").val() == "" || $("#txtShipmentIMOClass").val() == null ? 0 : $("#txtShipmentIMOClass").val())
                : ($("#txtOperationIMOClass").val() == "" || $("#txtOperationIMOClass").val() == null ? 0 : $("#txtOperationIMOClass").val()),
            "pVesselID": pIsShipment ? ($("#slShipmentVesselID").val() == "" || $("#slShipmentVesselID").val() == null ? 0 : $("#slShipmentVesselID").val())
                : ($("#slOperationVesselID").val() == "" || $("#slOperationVesselID").val() == null ? 0 : $("#slOperationVesselID").val()),
            "pNumberOfOriginalBills": IsNull($('#txtShipmentNumberOfOriginalBills').val(), 0),
            "pManifestPreConsignee": pIsShipment ? $("#txtManifestPreConsignee").val() : ""
        };
        $("#btnSaveCC").attr("disabled", true);
        var pCallerCallbackCC = callback;
        callback = function (pData) {
            $("#btnSaveCC").attr("disabled", false);
            if (pCallerCallbackCC != null && pCallerCallbackCC != undefined)
                pCallerCallbackCC(pData);
        };
        PostInsertUpdateFunction("CC-form", "/api/Operations/Insert", parameters, pSaveandAddNew, pIsShipment ? "ShipmentModal" : "OperationModal", callback);
    }
}
var maxDetailsIDInTable = 0;
function ContainerDetailsCCModule_NewRow() {
    debugger;
    ++maxDetailsIDInTable;
    // var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-btn-AddPaymentRequestDetails' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'></span>";
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);

    var tr = "";
    tr += "<tr ID='" + maxDetailsIDInTable + "' isdeleted='0' tag='item'   counter='" + (maxDetailsIDInTable) + "' value='" + 0 + "'>"
    tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>";
    tr += "     <td class='DetailsID' style='width:2%;'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + 0 + "' /></td>";
    tr += "     <td class='ContainerNo' style='width:20%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtContainerNo" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='' /> </td>";
    tr += "     <td class='ContainerType' style='width:20%;' val=''><select id='slContainerType" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slContainerType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='true'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='Weight' style='width:9%;'><input type='text' style='width:100%;font-size:90%;'  id='txtWeight" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='' data-required='true' value='' /> </td>";
    tr += "     <td class='NoOfPcs' style='width:9%;'><input type='text' style='width:100%;font-size:90%;'  id='txtNoOfPcs" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='' data-required='true' value='' /> </td>";
    //tr += "      <td class='Documented' style='width:1%;'><input id='cbDocumented" + maxDetailsIDInTable + "' name='Documented'  class='cbIsDocumented' type='checkbox' value='' ></td>";
    tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate'  id='SelectedIDsToUpdate" + maxDetailsIDInTable + "' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
    tr += "     <td class='hide'>"
        + "</td>";
    tr += "</tr>";

    $("#tblContainersDetailsCCModule tbody").prepend(tr);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $("#tblContainersDetailsCCModule tbody tr[ID=" + maxDetailsIDInTable + "]").reverseChildren();
    /***************************Filling row controls******************************/

    $("#slContainerType" + maxDetailsIDInTable).html($("#slOperationContainerType").html());


    BindAllCheckboxonTable("tblContainersDetailsCCModule", "DetailsID", "cb-CheckAll-ContainersDetailsCCModule");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    /***********************EOF Filling row controls******************************/
}
function ConvertFromHijriDate(id) {
    debugger;
    if (id == "txtOperationOpenDateHijriCCModule") {
        var Date = moment($('#txtOperationOpenDateHijriCCModule').val(), 'iYYYY/iMM/iDD HH:mm').format('YYYY-MM-DD');
        $('#txtOperationOpenDateCCModule').val(Date);
    }
    if (id == "txtOperationOpenDateCCModule") {
        var Date = moment(GetDateWithFormatyyyyMMdd($('#txtOperationOpenDateCCModule').val()), 'YYYY-MM-DD HH:mm:ss').format('iYYYY/iMM/iDD ');
        $('#txtOperationOpenDateHijriCCModule').val(Date);
    }

    if (id == "txtETADateCCModule") {
        var Date = moment($('#txtETADateCCModule').val(), 'iYYYY/iMM/iDD HH:mm').format('YYYY-MM-DD');
        $('#txtOperationOpenDateCCModule').val(Date);
    }
    if (id == "txtOperationOpenDateCCModule") {
        var Date = moment(GetDateWithFormatyyyyMMdd($('#txtOperationOpenDateCCModule').val()), 'YYYY-MM-DD HH:mm:ss').format('iYYYY/iMM/iDD ');
        $('#txtOperationOpenDateHijriCCModule').val(Date);
    }

    if (id == "txtOperationOpenDateHijriCCModule") {
        var Date = moment($('#txtOperationOpenDateHijriCCModule').val(), 'iYYYY/iMM/iDD HH:mm').format('YYYY-MM-DD');
        $('#txtOperationOpenDateCCModule').val(Date);
    }
    if (id == "txtOperationOpenDateCCModule") {
        var Date = moment(GetDateWithFormatyyyyMMdd($('#txtOperationOpenDateCCModule').val()), 'YYYY-MM-DD HH:mm:ss').format('iYYYY/iMM/iDD ');
        $('#txtOperationOpenDateHijriCCModule').val(Date);
    }

    if (id == "txtOperationOpenDateHijriCCModule") {
        var Date = moment($('#txtOperationOpenDateHijriCCModule').val(), 'iYYYY/iMM/iDD HH:mm').format('YYYY-MM-DD');
        $('#txtOperationOpenDateCCModule').val(Date);
    }
    if (id == "txtOperationOpenDateCCModule") {
        var Date = moment(GetDateWithFormatyyyyMMdd($('#txtOperationOpenDateCCModule').val()), 'YYYY-MM-DD HH:mm:ss').format('iYYYY/iMM/iDD ');
        $('#txtOperationOpenDateHijriCCModule').val(Date);
    }

    if (id == "txtOperationOpenDateHijriCCModule") {
        var Date = moment($('#txtOperationOpenDateHijriCCModule').val(), 'iYYYY/iMM/iDD HH:mm').format('YYYY-MM-DD');
        $('#txtOperationOpenDateCCModule').val(Date);
    }
    if (id == "txtOperationOpenDateCCModule") {
        var Date = moment(GetDateWithFormatyyyyMMdd($('#txtOperationOpenDateCCModule').val()), 'YYYY-MM-DD HH:mm:ss').format('iYYYY/iMM/iDD ');
        $('#txtOperationOpenDateHijriCCModule').val(Date);
    }
}

/***************************HBLCertificate************************************/
function Certificate_OpenSetHBLCertificateModal() {
    debugger;
    jQuery("#SetHBLCertificateModal").modal("show");
    if ($("#slOperationToSetHBLCertificate option").length < 2) {
        FadePageCover(true);
        /*var pParametersWithValues = {
            pWhereClause: "WHERE BLType=" + constMasterBLType
        };
        CallGETFunctionWithParameters("/api/Operations/LoadAll", pParametersWithValues
            , function (pData) {
                var pOperationList = pData[0];
                Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pOperationList, "ID", "Code,VesselName,ActualArrivalString", ' --> ', "<--Select-->", "#slOperationToSetHBLCertificate", null, "", function () { });
                FadePageCover(false);
            }
            , null);*/
        var pParametersWithValues = {
            pWhereClause: "WHERE BLType=" + constMasterBLType,
            pDummy: false
        };
        CallGETFunctionWithParameters("/api/Operations/LoadAllForHBLCertificateModal", pParametersWithValues
            , function (pData) {
                var pOperationList = pData[0];
                Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pOperationList, "ID", "Code,VesselName,ActualArrivalString", ' --> ', "<--Select-->", "#slOperationToSetHBLCertificate", null, "", function () { });
                FadePageCover(false);
            }
            , null);
    }
    if ($("#slOperationToSetHBLCertificate option").length < 2)
        $("#slCertificateCurrency").html($("#hReadySlCurrencies").html());
}
function Certificate_slOperationToSetHBLCertificateChanged() {
    debugger;
    $("#divSetHBLCertificate").html("");
    if ($("#slOperationToSetHBLCertificate").val() > 0) {
        FadePageCover(true);
        var pParametersWithValues = {
            pPageNumber: 1
            , pPageSize: 999999
            , pWhereClause: "WHERE BLType=" + constHouseBLType + " AND MasterOperationID=" + $("#slOperationToSetHBLCertificate").val() + ($("#cbAllHBLs").prop("checked") ? "" : " AND CertificateNumber IS NULL")
            , pOrderBy: "ID DESC"
        };
        CallGETFunctionWithParameters("/api/Operations/LoadWithParameters", pParametersWithValues
            , function (pData) {
                var pOperationList = JSON.parse(pData[0]);
                var _HTMLRows = "";
                _HTMLRows += '<div class="form-group col-sm-1 m-l-n-md" style="clear:both;"><input type="checkbox" id="cbHBLSelectAll" onchange="Certificate_cbHBLSelectAllChanged();" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control parsley-validated input-sm" /></div>';
                _HTMLRows += '<div class="form-group col-sm-2 m-t-sm m-l-n-lg"><b>HBL</b></div>';
                _HTMLRows += '<div class="form-group col-sm-2 text-center m-l-n m-t-sm"><b>  رقم الشهادة   </b></div>';
                _HTMLRows += '<div class="form-group col-sm-2 text-center m-l-n m-t-sm"><b>  بلد المنشأ   </b></div>';
                _HTMLRows += '<div class="form-group col-sm-2 text-center m-l-n m-t-sm"><b>  قيمة الفاتورة   </b></div>';
                _HTMLRows += '<div class="form-group col-sm-2 text-center m-l-n m-t-sm"><b>  الصنف   </b></div>';
                _HTMLRows += '<div class="form-group col-sm-1 text-center m-l-n m-t-sm"><b>  العملة   </b></div>';
                _HTMLRows += '<div class="form-group col-sm-1 text-center m-l-n m-t-sm"><b>  الوزن   </b></div>';
                for (var i = 0; i < pOperationList.length; i++) {
                    _HTMLRows += '<div class="form-group col-sm-1 m-l-n-md m-t-n-xs" style="clear:both;">';
                    _HTMLRows += '  <input type="checkbox" id="cbHBLID' + pOperationList[i].ID + '" OperationID=' + pOperationList[i].ID + ' onchange="Certificate_CalculateCertificateGrossWeight();" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control input-sm classCbHBL" />';
                    _HTMLRows += '</div>';
                    _HTMLRows += '<div class="form-group col-sm-2 m-l-n-lg">';
                    _HTMLRows += '  <input type="text" id="txtCertificateHouseNumber' + pOperationList[i].ID + '" style="text-transform:uppercase;height:90%;" disabled onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control input-sm" maxlength="100" placeholder="" value="' + (pOperationList[i].HouseNumber == 0 ? "" : pOperationList[i].HouseNumber) + '" />';
                    _HTMLRows += '</div>';
                    _HTMLRows += '<div class="form-group col-sm-2 m-l-n">';
                    _HTMLRows += '  <input type="text" id="txtCertificateNumber' + pOperationList[i].ID + '" style="text-transform:uppercase;height:90%;" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control input-sm" maxlength="100" placeholder="" value="' + (pOperationList[i].CertificateNumber == 0 ? "" : pOperationList[i].CertificateNumber) + '" />';
                    _HTMLRows += '</div>';
                    _HTMLRows += '<div class="form-group col-sm-2 m-l-n">';
                    _HTMLRows += '  <input type="text" id="txtCertificateCountryOfOrigin' + pOperationList[i].ID + '" style="text-transform:uppercase;height:90%;" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control input-sm" maxlength="100" placeholder="" value="' + (pOperationList[i].CountryOfOrigin == 0 ? "" : pOperationList[i].CountryOfOrigin) + '" />';
                    _HTMLRows += '</div>';
                    _HTMLRows += '<div class="form-group col-sm-2 m-l-n">';
                    _HTMLRows += '  <input type="text" id="txtCertificateInvoiceValue' + pOperationList[i].ID + '" style="text-transform:uppercase;height:90%;" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control input-sm" maxlength="100" placeholder="" value="' + (pOperationList[i].InvoiceValue == 0 ? "" : pOperationList[i].InvoiceValue) + '" />';
                    _HTMLRows += '</div>';
                    _HTMLRows += '<div class="form-group col-sm-2 m-l-n">';
                    _HTMLRows += '  <select id="slCertificateCommodity' + pOperationList[i].ID + '" style="text-transform:uppercase;height:90%;" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control input-sm" />';
                    _HTMLRows += '</div>';
                    _HTMLRows += '<div class="form-group col-sm-1 m-l-n">';
                    _HTMLRows += '  <select id="slCertificateCurrency' + pOperationList[i].ID + '" style="text-transform:uppercase;height:90%;" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control input-sm" />';
                    _HTMLRows += '</div>';
                    _HTMLRows += '<div class="form-group col-sm-1 m-l-n">';
                    if (pOperationList[i].ShipmentType == constBulkShipmentType) {
                        _HTMLRows += '  <input type="text" id="txtCertificateGrossWeight' + pOperationList[i].ID + '" style="text-transform:uppercase;height:90%;" disabled onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control input-sm" maxlength="100" placeholder="" value="' + (pOperationList[i].GrossWeightTON == 0 ? "" : pOperationList[i].GrossWeightTON) + '" />';
                    } else {
                        _HTMLRows += '  <input type="text" id="txtCertificateGrossWeight' + pOperationList[i].ID + '" style="text-transform:uppercase;height:90%;" disabled onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control input-sm" maxlength="100" placeholder="" value="' + (pOperationList[i].GrossWeight == 0 ? "" : pOperationList[i].GrossWeight) + '" />';
                    }
                    _HTMLRows += '</div>';
                }
                $("#divSetHBLCertificate").html(_HTMLRows);
                for (var i = 0; i < pOperationList.length; i++) {
                    $("#slCertificateCommodity" + pOperationList[i].ID).html($("#slCertificateCommodity").html());
                    $("#slCertificateCommodity" + pOperationList[i].ID).val(pOperationList[i].CommodityID == 0 ? "" : pOperationList[i].CommodityID);
                    $("#slCertificateCurrency" + pOperationList[i].ID).html($("#hReadySlCurrencies").html());
                    $("#slCertificateCurrency" + pOperationList[i].ID).val(pOperationList[i].CurrencyID);
                }
                FadePageCover(false);
            }
            , null);
    }
}
function Certificate_ApplyCertificateToSelected() {
    debugger;
    var _ListofControls = $('#divSetHBLCertificate .classCbHBL');
    $.each(_ListofControls, function (i, item) {
        var pOperationID = item.getAttribute("OperationID");
        if ($("#cbHBLID" + pOperationID).prop("checked")) {
            $("#txtCertificateNumber" + pOperationID).val($("#txtCertificateNumber").val());
            $("#txtCertificateCountryOfOrigin" + pOperationID).val($("#txtCertificateCountryOfOrigin").val());
            $("#txtCertificateInvoiceValue" + pOperationID).val($("#txtCertificateInvoiceValue").val());
            $("#slCertificateCommodity" + pOperationID).val($("#slCertificateCommodity").val());
            $("#slCertificateCurrency" + pOperationID).val($("#slCertificateCurrency").val());
        }
    });
}
function Certificate_SaveCertificateList() {
    debugger;
    var pOperationIDList = "0";
    var pCertificateNumberList = "0";
    var pCountryOfOriginList = "0";
    var pInvoiceValueList = "0";
    var pCommodityIDList = "0";
    var pCurrencyIDList = "0";
    var _ListofControls = $('#divSetHBLCertificate .classCbHBL');
    $.each(_ListofControls, function (i, item) {
        var pOperationID = item.getAttribute("OperationID");
        pOperationIDList += "," + item.getAttribute("OperationID");
        pCertificateNumberList += "," + IsNull($("#txtCertificateNumber" + pOperationID).val().trim().toUpperCase(), 0);
        pCountryOfOriginList += "," + IsNull($("#txtCertificateCountryOfOrigin" + pOperationID).val().trim().toUpperCase(), 0);
        pInvoiceValueList += "," + IsNull($("#txtCertificateInvoiceValue" + pOperationID).val().trim().toUpperCase(), 0);
        pCommodityIDList += "," + IsNull($("#slCertificateCommodity" + pOperationID).val(), 0);
        pCurrencyIDList += "," + IsNull($("#slCertificateCurrency" + pOperationID).val(), 0);
    });
    var pParametersWithValues = {
        pOperationIDList: pOperationIDList
        , pCertificateNumberList: pCertificateNumberList
        , pCountryOfOriginList: pCountryOfOriginList
        , pInvoiceValueList: pInvoiceValueList
        , pCommodityIDList: pCommodityIDList
        , pCurrencyIDList: pCurrencyIDList
    };
    if (pOperationIDList != "0") {
        FadePageCover(true);
        CallPOSTFunctionWithParameters("/api/Operations/Shipment_SetCertificateNumber", pParametersWithValues
            , function (pData) {
                var _ReturnedMessage = pData[0];
                if (_ReturnedMessage == "")
                    swal("Success", "Saved successfully.");
                else
                    swal("Sorry", _ReturnedMessage);
                FadePageCover(false);
            }
            , null);
    }
}
function Certificate_cbHBLSelectAllChanged() {
    debugger;
    if ($("#cbHBLSelectAll").prop("checked"))
        $(".classCbHBL").prop("checked", true);
    else
        $(".classCbHBL").prop("checked", false);
    Certificate_CalculateCertificateGrossWeight();
}
function Certificate_CalculateCertificateGrossWeight() {
    debugger;
    var _GrossWeightSum = 0.0;
    var _ListofControls = $('#divSetHBLCertificate .classCbHBL');
    $.each(_ListofControls, function (i, item) {
        var pOperationID = item.getAttribute("OperationID");
        if ($("#cbHBLID" + pOperationID).prop("checked")) {
            _GrossWeightSum += parseFloat(IsNull($("#txtCertificateGrossWeight" + pOperationID).val(), 0));
        }
    });
    $("#txtCertificateGrossWeight").val(_GrossWeightSum);
}
function Certificate_GetCertificateHousesAndGrossWeight(pOperationIDToGetCertificates) {
    debugger;
    var h5LblCertificates = "";
    var pParametersWithValues = {
        pOperationIDToGetCertificates: pOperationIDToGetCertificates
    };
    CallGETFunctionWithParameters("/api/Operations/Certificate_GetCertificateHousesAndGrossWeight", pParametersWithValues
        , function (pData) {
            pDistinctCertificates = JSON.parse(pData[1]);
            pHouses = JSON.parse(pData[2]);
            for (var i = 0; i < pDistinctCertificates.length; i++) {
                h5LblCertificates += ("<u>Cert:</u> " + pDistinctCertificates[i].CertificateNumber + " <u>GW:</u> " + pDistinctCertificates[i].CertificateWeight + " ");
                var pCertificateHouses = pHouses.filter(x => x.CertificateNumber == pDistinctCertificates[i].CertificateNumber);
                h5LblCertificates += " <u>HBLs</u>("
                for (var j = 0; j < pCertificateHouses.length; j++) {
                    h5LblCertificates += pCertificateHouses[j].HouseNumber + ",";
                }
                h5LblCertificates += ")<br>";
            }
            $("#h5LblCertificates").html(h5LblCertificates);
        }
        , null, true/*Default true*/);
}


/***************************ShipmentDates************************************/
function ShipmentDates_OpenSetShipmentDatesModal() {
    debugger;
    jQuery("#SetShipmentDatesModal").modal("show");
    ClearAllTableRows("tblShipmentDatesOperations");
    FillOperationsFilters();
    //$("#txtShipmentDatesOperationCodeSerial").val("");
    //$("#slShipmentDatesClient").val("").trigger("change");
    //$("#txtShipmentDatesBookingNo").val("");
    //$("#txtShipmentDatesMasterBL").val("");
}


function ShipmentDates_LoadOperations() {
    debugger;

    if ($("#txtShipmentDatesOperationCodeSerial").val() == "" && $("#slShipmentDatesClient").val() == ""
        && $("#slShipmentDatesMoveType").val() == "" && $("#txtShipmentDatesBookingNo").val() == ""
        && $("#txtShipmentDatesMasterBL").val() == "" && $("#slShipmentDatesIsVesselArrived").val() == ""
        && $("#slShipmentDatesShippingLine").val() == ""
        && $("#slCreatedBy").val() == ""
        && $("#txtTankNo").val() == "")
        swal("Sorry", "Please, Enter Search Criteria");
    else {
        let pWhereClause = "Where 1=1";
        if ($("#txtShipmentDatesOperationCodeSerial").val() != "")
            pWhereClause += " AND CodeSerial=" + $("#txtShipmentDatesOperationCodeSerial").val();

        if ($("#slShipmentDatesClient").val() != "")
            pWhereClause += " AND ID IN(SELECT ID FROM vwOperations WHERE ClientID = " + $("#slShipmentDatesClient").val() + ")";

        if ($("#slShipmentDatesMoveType").val() != null && $("#slShipmentDatesMoveType").val() != "")
            pWhereClause += " AND MoveTypeID =" + $("#slShipmentDatesMoveType").val();

        if ($("#txtShipmentDatesBookingNo").val() != "") {
            if (pDefaults.UnEditableCompanyName == "ELI" || pDefaults.UnEditableCompanyName == "OAO" || pDefaults.UnEditableCompanyName == "BAD")
                pWhereClause += " AND (BookingNumbers like '%" + $("#txtShipmentDatesBookingNo").val().trim().toUpperCase() + "%') ";
            else
                pWhereClause += " AND (BookingNumbers = '" + $("#txtShipmentDatesBookingNo").val().trim().toUpperCase() + "') ";
        }

        if ($("#txtShipmentDatesMasterBL").val() != "")
            pWhereClause += " AND MasterBL LIKE N'%" + $("#txtShipmentDatesMasterBL").val().trim().toUpperCase() + "%' ";

        if ($("#slShipmentDatesIsVesselArrived").val() != "")
            pWhereClause += " AND IsClearance=" + $("#slShipmentDatesIsVesselArrived").val() + " \n";

        if ($("#slShipmentDatesOperationStages").val() != "")
            pWhereClause += " AND ( OperationStageName=N'" + $("#slShipmentDatesOperationStages option:selected").text() + "')"

        if ($("#slShipmentDatesShippingLine").val() != "")
            pWhereClause += " AND ShippingLineID =" + $("#slShipmentDatesShippingLine").val();

        if ($("#slCreatedBy").val() > 0)
            pWhereClause += " AND CreatorUserID =" + $("#slCreatedBy").val();

        if ($("#txtTankNo").val() != "")
            pWhereClause += " AND ((ISNULL((SELECT COUNT(OCP.ID) FROM OperationContainersAndPackages AS OCP WHERE dbo.vwOperationsForFilter.ID=OCP.OperationID AND OCP.TankOrFlexiNumber LIKE N'%" + $("#txtTankNo").val().trim().toUpperCase() + "%'), 0)) > 0)";

        debugger;

        //let pWhereClause = Operations_GetFilterWhereClause();
        let pWhereClause_Routings = "0";

        let pOrderBy = " ID DESC ";
        let pParametersWithValues = {
            pIsLoadArrayOfObjects: false
            , pPageNumber: 1
            , pPageSize: 200
            , pWhereClause: pWhereClause
            , pIsBindTableRows: false
            , pWhereClause_Routings: pWhereClause_Routings
            , pOrderBy: ""
        }


        FadePageCover(true);

        CallGETFunctionWithParameters("/api/Operations/LoadWithWhereClause", pParametersWithValues
            , function (pData) {
                debugger;
                ClearAllTableRows("tblShipmentDatesOperations");

                var pOperationList = JSON.parse(pData[0]);
                var OriginalLength = pOperationList.length;
                if (OriginalLength > 100) {
                    pOperationList = pOperationList.slice(0, 100);
                }

                $.each(pOperationList, function (i, item) {
                    AppendRowtoTable("tblShipmentDatesOperations",
                        ("<tr ID='" + item.ID + "'>"
                            + "<td class='Code'>" + item.Code + "</td>"
                            + "<td class='BookingNo'>" + (item.BookingNumbers == 0 ? "" : item.BookingNumbers) + "</td>"
                            + "<td class='MasterBL'>" + (item.MasterBL == 0 ? "" : item.MasterBL) + "</td>"
                            + "<td class='Line'>" + (pDefaults.UnEditableCompanyName == "CAP" ? (item.ShippingLineName == 0 ? "" : item.ShippingLineName) : (item.LineName == 0 ? "" : item.LineName)) + "</td>"
                            + "<td class='POD'>" + (item.PODName == 0 ? "" : item.PODName) + "</td>"
                            + "<td class='POL'>" + (item.POLName == 0 ? "" : item.POLName) + "</td>"
                            + "<td class='DeliveryPlace'>" + (item.DeliveryAddress == 0 || item.DeliveryAddress == undefined ? "" : item.DeliveryAddress) + "</td>"
                            + "<td class='ExpectedDeparture'><input id='txtExpectedDeparture" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' class='datepicker-input form-control input-sm' data-date-format='dd/mm/yyyy' style='cursor:text;' val='' /></td>"
                            + "<td class='ActualDeparture'><input id='txtActualDeparture" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' class='datepicker-input form-control input-sm' data-date-format='dd/mm/yyyy' style='cursor:text;' val='' /></td>"
                            + "<td class='ExpectedArrival'><input id='txtExpectedArrival" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' class='datepicker-input form-control input-sm' data-date-format='dd/mm/yyyy' style='cursor:text;' val='' /></td>"
                            + "<td class='ActualArrival'><input id='txtActualArrival" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' class='datepicker-input form-control input-sm' data-date-format='dd/mm/yyyy' style='cursor:text;' val='' /></td>"
                            + "<td class='LoadingDate hide'><input id='txtLoadingDate" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' class='datepicker-input form-control input-sm' data-date-format='dd/mm/yyyy' style='cursor:text;' val='' /></td>"
                            + "<td class='IsClearance hide classShowForELI'> <input id='cbIsClearance" + item.ID + "' type='checkbox' val='" + (item.IsClearance == true ? "true' checked='checked'" : "'") + " /></td>"
                            + "</tr>"));

                    $("#txtExpectedDeparture" + item.ID).datepicker().on('changeDate', function () { $(this).datepicker('hide'); });
                    $("#txtExpectedDeparture" + item.ID).val(GetDateFromServer(item.ExpectedDeparture) == "01/01/1900" ? "" : GetDateFromServer(item.ExpectedDeparture));
                    $("#txtActualDeparture" + item.ID).datepicker().on('changeDate', function () { $(this).datepicker('hide'); });
                    $("#txtActualDeparture" + item.ID).val(GetDateFromServer(item.ActualDeparture) == "01/01/1900" ? "" : GetDateFromServer(item.ActualDeparture));
                    $("#txtExpectedArrival" + item.ID).datepicker().on('changeDate', function () { $(this).datepicker('hide'); });
                    $("#txtExpectedArrival" + item.ID).val(GetDateFromServer(item.ExpectedArrival) == "01/01/1900" ? "" : GetDateFromServer(item.ExpectedArrival));
                    $("#txtActualArrival" + item.ID).datepicker().on('changeDate', function () { $(this).datepicker('hide'); });
                    $("#txtActualArrival" + item.ID).val(GetDateFromServer(item.ActualArrival) == "01/01/1900" ? "" : GetDateFromServer(item.ActualArrival));
                    $("#txtLoadingDate" + item.ID).datepicker().on('changeDate', function () { $(this).datepicker('hide'); });
                });

                FadePageCover(false);


                if (OriginalLength > 100)
                    swal("", "We Listed only 100 Operations, Please make your search more specific");

                if (pDefaults.UnEditableCompanyName == "ELI") {
                    $(".classShowForELI").removeClass("hide");
                } else {
                    $(".classShowForELI").addClass("hide");
                }

                if (pDefaults.UnEditableCompanyName == "CHM") {
                    $('#tblShipmentDatesOperations th.LoadingDate, #tblShipmentDatesOperations td.LoadingDate').removeClass('hide');
                }

            }
            , null);



    }

}
function ShipmentDates_SaveList() {
    debugger;
    if ($("#tblShipmentDatesOperations tbody tr").length == 0) {
        swal(strSorry, "No Records to Save");
    } else {
        var pOperationIDList = "";
        var pExpectedDepartureList = "";
        var pActualDepartureList = "";
        var pExpectedArrivalList = "";
        var pActualArrivalList = "";
        var pLoadingDateList = "";
        var pIsClearanceList = "";
        $("#tblShipmentDatesOperations tbody tr").each(function (i, item) {
            var pOperationID = item.id;
            pOperationIDList += (pOperationIDList == "" ? "" : ",") + pOperationID;
            pExpectedDepartureList += (pExpectedDepartureList == "" ? "" : ",") + ($("#txtExpectedDeparture" + pOperationID).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtExpectedDeparture" + pOperationID).val().trim()));
            pActualDepartureList += (pActualDepartureList == "" ? "" : ",") + ($("#txtActualDeparture" + pOperationID).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtActualDeparture" + pOperationID).val().trim()));
            pExpectedArrivalList += (pExpectedArrivalList == "" ? "" : ",") + ($("#txtExpectedArrival" + pOperationID).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtExpectedArrival" + pOperationID).val().trim()));
            pActualArrivalList += (pActualArrivalList == "" ? "" : ",") + ($("#txtActualArrival" + pOperationID).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtActualArrival" + pOperationID).val().trim()));
            pLoadingDateList += (pLoadingDateList == "" ? "" : ",") + ($("#txtLoadingDate" + pOperationID).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtLoadingDate" + pOperationID).val().trim()));
            pIsClearanceList += (pIsClearanceList == "" ? "" : ",") + ($("#cbIsClearance" + pOperationID).prop('checked'));
        });
        if (pDefaults.UnEditableCompanyName != "CHM") {
            pLoadingDateList = "";
        }
        var pParametersWithValues = {
            pOperationIDList: pOperationIDList
            , pExpectedDepartureList: pExpectedDepartureList
            , pActualDepartureList: pActualDepartureList
            , pExpectedArrivalList: pExpectedArrivalList
            , pActualArrivalList: pActualArrivalList
            , pLoadingDateList: pLoadingDateList
            , pIsClearanceList: pIsClearanceList
        };
        console.log(pParametersWithValues);
        FadePageCover(true);
        CallPOSTFunctionWithParameters("/api/Operations/ShipmentDates_SaveList", pParametersWithValues
            , function (pData) {
                var _ReturnedMessage = pData[0];
                if (_ReturnedMessage == "")
                    swal("Success", "Saved successfully.");
                else
                    swal("Sorry", _ReturnedMessage);
                FadePageCover(false);
            }
            , null);
    }

}

/*****************************Loading Empty modules*************************************/
function Invoices_SubmenuTabClicked() {
    debugger;
    if (typeof Invoices_LoadAll == "function" && $("#tblInvoices tbody tr").length == 0 && $("#tblInvoicesDRAFT tbody tr").length == 0) {
        Invoices_LoadAll($("#hOperationID").val());
        if (pDefaults.UnEditableCompanyName == "CAL" || pDefaults.UnEditableCompanyName == "MAR" || pDefaults.UnEditableCompanyName == "ARR")
            $("#cbPrintHeaderInvoice").prop("checked", true);
        if (pDefaults.UnEditableCompanyName == "MAR")
            $("#cbPrintFooterInvoice").prop("checked", true);
    }
}



/******************** BLDocuments Edit on DblClick and Update Start ********************/
var pIsOperationDisabled = false;
var pIsFCL = false;
var pIsFTL = false;



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



    var pParametersWithValues = { pMasterOperationID: "0", pShipmentID: 0, pDefaultCountryID: pDefaults.DefaultCountryID, pShowUserSalesmen: pDefaults.ShowUserSalesmen, pUnEditableCompanyName: pDefaults.UnEditableCompanyName, pFromOperation: true };

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
            var pWareHouseList = pData[22];

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
                //$("#slPOLCountriesForBLDocuments").html($("#slPickupCountry").html());
                //$("#slPODCountriesForBLDocuments").html($("#slPickupCountry").html());
            });
            FillListFromObject(null, 11, "<--Select-->", "slShipmentContainers", pContainers, null); //to be used when open PackagesModal
            FillListFromObject(null, 2, "<--Select-->", "slOperationVesselID", pVessels, null);

            //FillListFromObject(null, 2, "Select Incoterm", "slShipmentIncoterm", pIncotermsList, null);
            //FillListFromObject(null, 2, "Select Service Scope", "slOperationMoveTypesForBLDocuments", pMoveTypesList, null);
            //FillListFromObject(null, 2, "Select Freight Type", "slShipmentPOrC", pNoAccessFreightTypesList, null);
            $('#slShipmentIncoterm').html($('#slIncoterms').html());
            $('#slOperationMoveTypesForBLDocuments').html($('#slMoveTypes').html());
            $('#slShipmentPOrC').html($('#slOperationPOrC').html());

            FadePageCover(false);
        }
        , null);




    $("#slOperationBranchForBLDocuments").html($("#hReadySlBranches").html());
    ActivateUserBranchSelection('slOperationBranchForBLDocuments');
    $("#slOperationSalesmanForBLDocuments").html($("#slOperationSalesman").html()); $("#slOperationSalesmanForBLDocuments").val($("#hLoggedUserID").val());

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
    $("#btn-NewAddVessel").attr("onclick", "Vessels_ClearAllControls(null,2));");

    $("#btn-EditShipperForBLDocuments").attr("onclick", "Customers_FillControlsFromOperations($('#slShippersForBLDocuments option:selected').val(), null, 1);");
    $("#btn-EditConsigneeForBLDocuments").attr("onclick", "Customers_FillControlsFromOperations($('#slConsigneesForBLDocuments option:selected').val(), null, 1);");
    $("#btn-EditNotify").attr("onclick", "Customers_FillControlsFromOperations($('#slNotifyForBLDocuments option:selected').val(), null, 1);");
    $("#btn-EditAgentForBLDocuments").attr("onclick", "Agents_FillControlsFromOperations($('#slAgentsForBLDocuments option:selected').val(), null, 1);");

    //$("#btnSaveShipment").attr("onclick", "Operations_InsertFromBLDocuments(true,true, function(pData) { if (pData[3] != '') swal('Sorry', pData[3]); else { Shipments_ConnectOrDisconnect(pData[1], true, true); $('#hShipmentID').val(pData[1]); $('#txtShipmentHouseNumber').val(pData[2]); $('#btnSaveShipment').attr('onclick','Shipment_Update();'); swal('Success', 'Saved Successfully.'); } });");
    //$("#btnSaveClearanceProperties").attr("onclick", "Operations_InsertFromBLDocuments(true,true, function(pData) { if (pData[3] != '') swal('Sorry', pData[3]); else { Shipments_ConnectOrDisconnect(pData[1], true, true); $('#hShipmentID').val(pData[1]); $('#txtShipmentHouseNumber').val(pData[2]); $('#btnSaveClearanceProperties').attr('onclick','Shipment_Update();'); swal('Success', 'Saved Successfully.'); } });");
    $("#btnSaveShipment").attr("onclick", "Operations_InsertFromBLDocuments(true,true, function(pData) { if (pData[3] != '') swal('Sorry', pData[3]); else { $('#hShipmentID').val(pData[1]); $('#txtShipmentHouseNumber').val(pData[2]); Operations_LoadingWithPaging(); Shipments_ClearAllControls(); swal('Success', 'Saved Successfully.'); } });");


    if (pHouseParentID !== "") $("#hHouseParentID").val(pHouseParentID);
    //$("#btnSaveandNewShipment").attr("onclick", "Operations_InsertFromBLDocuments(true);");
}
function Shipments_FillControlsFromBLDocuments(pID, MasterOperationID) {
    debugger;
    var tr = $("#tblOperations tr[ID='" + pID + "']");

    //$(".classShowForUpdate").removeClass("hide");
    $(".classShowForUpdate").addClass("hide");  // don't need it here

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

    if (IsMESCOCompany) {
        $("#btn-NafezaIntegration").parent().removeClass("hide");
        $("#slInvoiceForBLDocuments").parent().parent().removeClass("hide");
        $("#txtDORepresentative").parent().parent().removeClass("hide");
        $("#txtDeliveryCustomer").parent().parent().removeClass("hide");
        $("#txtCommodityForBLDocument").parent().removeClass("hide");
        $("#txtNoOfPackagesForBLDocument").parent().removeClass("hide");
        $("#slPOTForBLDocuments").parent().removeClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $("#slInvoiceForBLDocuments").parent().parent().removeClass("hide");
        $("#txtCommodityForBLDocument").parent().removeClass("hide");
        $("#txtNoOfPackagesForBLDocument").parent().removeClass("hide");
        $("#slOperationSalesmanForBLDocuments").parent().addClass("hide");
        $("#txtOperationOpenDateForBLDocuments").parent().addClass("hide");
        $("#slPickupCountry").parent().addClass("hide");
        $("#slPickupCity").parent().addClass("hide");
        $("#slDeliveryCountry").parent().addClass("hide");
        $("#slDeliveryCity").parent().addClass("hide");
        $("#txtShipmentReleaseDate").parent().addClass("hide");
        $("#txtShipmentACIDNumber").parent().addClass("hide");
        $("#slShipmentIncoterm").parent().addClass("hide");
        $("#slDirectionType").parent().addClass("hide");
        $("#slAgentsForBLDocuments").parent().addClass("hide");
        $("#slNotifyForBLDocuments").parent().addClass("hide");
        $("#slConsignees2").parent().addClass("hide");
        $("#slOperationMoveTypesForBLDocuments").parent().addClass("hide");
        //$("#slPOLCountriesForBLDocuments").parent().addClass("hide"); 
        //$("#slPOLForBLDocuments").parent().addClass("hide"); 
        //$("#slPODCountriesForBLDocuments").parent().addClass("hide"); 
        //$("#slPODForBLDocuments").parent().addClass("hide");
        $("#txtShipmentCustomerReference").parent().addClass("hide");
        $("#txtShipmentSupplierReference").parent().addClass("hide");
        $("#txtShipmentPONumber").parent().addClass("hide");
        $("#txtShipmentNumberOfOriginalBills").parent().addClass("hide");
        $("#slShipmentPOrC").parent().addClass("hide");
        $("#txtOperationUNNumber").parent().addClass("hide");
        $("#slOperationOperationManID").parent().addClass("hide");
        $("#txtContainerNumberForBLDocument").parent().addClass("hide");
        $("#DivInvoice").removeClass("hide");
        $(".classShowForUNFBLDocuments").removeClass("hide");
        $("#divQuotationRoute").addClass("hide");
        $("#txtCommodityForBLDocument").parent().addClass("hide");
        $(".HideForUNFCPW").addClass("hide");
        $(".ShowForUNFCPW").removeClass("hide");



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
            //var pCustomers = pData[1];
            //var pAgents = pData[2];
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
            //var pCustomers = pData[23];
            var pInvoiceList = pData[24];
            var pQuotationRoutes = pData[25];
            var pPOTList = pData[26];
            var pAllUsers = pData[27];
            var SelectedQRCode = pData[28];
            var ConsigneeName = pData[29];
            var Consignee2Name = pData[30];
            var NotifyName = pData[31];
            var ShipperName = pData[32];
            var MescoSalesmen = pData[33];
            var ForwarderName = pData[34];

            var _Salesmentemp = JSON.parse(pUsers);
            var pSalesmen = jQuery.grep(_Salesmentemp, function (_Salesmentemp) {
                return _Salesmentemp.IsSalesman == true;
            });


            pIsOperationDisabled = pIsOperationClosed == true || pShipmentHeader.OperationStageID == CancelledQuoteAndOperStageID ? 1 : 0;
            //if (OAPac && $("#hIsOperationDisabled").val() == false) { $(".classSetCargoProperties").removeClass("hide"); $(".classSetClearanceProperties").removeClass("hide"); } else { $(".classSetCargoProperties").addClass("hide"); $(".classSetClearanceProperties").addClass("hide"); }
            if (/*OAPac && */pIsOperationDisabled == false) {
                $(".classSetCargoProperties").removeClass("hide");
                $(".classSetClearanceProperties").removeClass("hide");
            } else {
                $(".classSetCargoProperties").addClass("hide");
                $(".classSetClearanceProperties").addClass("hide");
            }

            if (/*$("#hIsOperationDisabled").val()*/pIsOperationDisabled == false) {
                $("#divShipmentPackageBtns").removeClass("hide");
                //$("#divShipmentPackage").removeClass("hide");
            } else {
                $("#divShipmentPackageBtns").addClass("hide");
                //$("#divShipmentPackage").addClass("hide");
            }

            if (pDefaults.UnEditableCompanyName == "MES") {
                $("#divForwarder").removeClass("hide");
                $("#divBlStatus").removeClass("hide");
                $("#divStoreLocation").removeClass("hide");
                $("#divQuotationRoute").removeClass("hide");
            }
            if (pDefaults.UnEditableCompanyName == "UNF") {
                $("#divQuotationRoute").removeClass("hide");
            }

            if (pShipmentHeader.ShipmentType == constFCLShipmentType)
                pIsFCL = true;
            else if (pShipmentHeader.ShipmentType == constFTLShipmentType)
                pIsFTL = true;

            if ($("#slClearanceCurrency option").length == 0)
                $("#slClearanceCurrency").html($("#hReadySlCurrencies").html());




            $("#hShipmentID").val(pID);

            $("#slDirectionType").val(pShipmentHeader.DirectionType);

            if ((pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG")
                && /*$("#hDirectionType").val()*/pShipmentHeader.DirectionType == constExportDirectionType
                && pShipmentHeader.HouseNumber != "0" && pShipmentHeader.HouseNumber != "")
                $("#txtShipmentHouseNumber").attr("disabled", "disabled");

            if (/*$("#hDirectionType").val()*/pShipmentHeader.DirectionType == constImportDirectionType) {
                $("#slConsigneesForBLDocuments").attr("data-required", true);
                $("#slShippersForBLDocuments").attr("data-required", false);
            }
            else { //Export or Domestic
                $("#slShippersForBLDocuments").attr("data-required", true);
                $("#slConsigneesForBLDocuments").attr("data-required", false);
            }
            debugger;
            if (pDefaults.UnEditableCompanyName == "UNF" && pShipmentHeader.DirectionType != constExportDirectionType) {
                $("#txtShipmentHouseNumber").attr("disabled", "disabled");
            } else {
                $("#txtShipmentHouseNumber").removeAttr("disabled");

            }

            //FillListFromObject(pShipmentHeader.ShipperID, 2, "<--Select-->", "slShippersForBLDocuments", pCustomers
            //    , function () {
            //        $("#slConsigneesForBLDocuments").html($("#slShippersForBLDocuments").html()); $("#slConsigneesForBLDocuments").val(pShipmentHeader.ConsigneeID == 0 ? "" : pShipmentHeader.ConsigneeID);
            //        $("#slNotifyForBLDocuments").html($("#slShippersForBLDocuments").html()); $("#slNotifyForBLDocuments").val(pNotifyID == 0 ? "" : pNotifyID);
            //    });
            //$("#slConsigneesForBLDocuments").html($("#hReadySlCustomers").html());
            //$("#slConsigneesForBLDocuments").val(pShipmentHeader.ConsigneeID == 0 ? "" : pShipmentHeader.ConsigneeID);
            //$("#slConsignees2").html($("#hReadySlCustomers").html());
            //$("#slConsignees2").val(pShipmentHeader.ConsigneeID2 == 0 ? "" : pShipmentHeader.ConsigneeID2);

            //$("#slShippersForBLDocuments").html($("#hReadySlCustomers").html());
            //$("#slShippersForBLDocuments").val(pShipmentHeader.ShipperID == 0 ? "" : pShipmentHeader.ShipperID);



            //$("#slNotifyForBLDocuments").html($("#hReadySlCustomers").html());
            $("#slNotifyForBLDocuments").val(pNotifyID == 0 ? "" : pNotifyID);
            $("#slAgentsForBLDocuments").html($("#hReadySlAgents").html());
            $("#slAgentsForBLDocuments").val(pShipmentHeader.AgentID == 0 ? "" : pShipmentHeader.AgentID);

            //FillListFromObject(pShipmentHeader.AgentID, 2, "<--Select-->", "slAgentsForBLDocuments", pAgents, null);
            FillListFromObject(null, 2, "<--Select-->", "slPackageTypes", pPackageTypes, null); //to be used when open PackagesModal
            FillListFromObject(pShipmentHeader.DeliveryCityID, 4, "<--Select-->", "slDeliveryCity", pFinalDestination, null);
            FillListFromObject(pShipmentHeader.PickupCityID, 4, "<--Select-->", "slPickupCity", pPickupCityList, null);
            FillListFromObject(pShipmentHeader.POLCountryID, 4, "<--Select-->", "slPickupCountry", pCountryList, null);
            FillListFromObject(pShipmentHeader.PODCountryID, 4, "<--Select-->", "slDeliveryCountry", pCountryList, null);
            FillListFromObject(pShipmentHeader.POLCountryID, 4, "<--Select-->", "slNafezaPickupCountry", pCountryList, null);
            FillListFromObject(pShipmentHeader.POTID, 2, "<--Select-->", "slPOTForBLDocuments", pPOTList, null);
            //FillListFromObject(pShipmentHeader.PickupCountryID == 0 ? pShipmentHeader.POLCountryID : pShipmentHeader.PickupCountryID, 2, "<--Select-->", "slPickupCountry", pCountryList, function () {
            //    $("#slDeliveryCountry").html($("#slPickupCountry").html());
            //    $("#slDeliveryCountry").val(pShipmentHeader.DeliveryCountryID == 0 ? pShipmentHeader.PODCountryID : pShipmentHeader.DeliveryCountryID);
            //    FillListFromObject(pShipmentHeader.PickupCountryID == 0 ? pShipmentHeader.POLCountryID : pShipmentHeader.PickupCountryID, 2, "<--Select-->", "slNafezaPickupCountry", pCountryList, null);
            //    //$("#slPOLCountriesForBLDocuments").html($("#slPickupCountry").html());
            //    //$("#slPODCountriesForBLDocuments").html($("#slPickupCountry").html());
            //    //$("#slPOLCountriesForBLDocuments").val(pShipmentHeader.POLCountryID);
            //    //$("#slPODCountriesForBLDocuments").val(pShipmentHeader.PODCountryID);
            //    $("#slPOTForBLDocuments").val(pShipmentHeader.POTID);

            //    POL_GetListForBLDocuments(pShipmentHeader.POL, pShipmentHeader.POLCountryID);
            //    POD_GetListForBLDocuments(pShipmentHeader.POD, pShipmentHeader.PODCountryID);
            //});
            FillListFromObject(null, 11, "<--Select-->", "slShipmentContainers", pContainers, null); //to be used when open PackagesModal

            //FillListFromObject(null, 2, "Select Incoterm", "slShipmentIncoterm", pIncotermsList, null);
            //FillListFromObject(null, 2, "Select Service Scope", "slOperationMoveTypesForBLDocuments", pMoveTypesList, null);
            //FillListFromObject(null, 2, "Select Freight Type", "slShipmentPOrC", pNoAccessFreightTypesList, null);
            $('#slShipmentIncoterm').html($('#slIncoterms').html());
            $("#slShipmentIncoterm").val(pShipmentHeader.IncotermID == 0 ? "" : pShipmentHeader.IncotermID);
            $('#slOperationMoveTypesForBLDocuments').html($('#slMoveTypes').html());
            $('#slShipmentPOrC').html($('#slOperationPOrC').html());
            if (IsMESCOCompany) {
                FillListFromObject(pShipmentHeader.IncotermID, 2, "Select Incoterm", "slShipmentIncoterm", pIncotermsList, null);
                FillListFromObject(pShipmentHeader.MoveTypeID, 2, "Select Service Scope", "slOperationMoveTypesForBLDocuments", pMoveTypesList, null);
                FillListFromObject(pShipmentHeader.POrC, 2, "Select Freight Type", "slShipmentPOrC", pNoAccessFreightTypesList, null);
            }

            FillListFromObject(pShipmentHeader.VesselID, 2, "Select Vessel", "slOperationVesselID", pVessels, null);
            FillListFromObject(pShipmentHeader.OperationManID, 2, "<--Select-->", "slOperationOperationManID", pUsers, null);
            FillListFromObject(pShipmentHeader.StoreLocation, 2, "<--Select-->", "slStoreLocationBLDocuments", pWareHouseList, null);
            //$("#slForwarderBLDocuments").html($("#hReadySlCustomers").html());
            //$("#slForwarderBLDocuments").val(pShipmentHeader.ForwarderId == 0 ? "" : pShipmentHeader.ForwarderId);
            //FillListFromObject(null, 2, "<--Select-->", "slForwarderBLDocuments", pCustomers, null);
            FillListFromObject(null, 2, "<--Select-->", "slInvoiceForBLDocuments", pInvoiceList, null);

            //FillListFromObject(null, 1, "<--Select-->", "slQuotationRoutesForBLDocuments", pQuotationRoutes, null);






            //$("#slShipmentPackageTypes").html($("#slPackageTypes").html());
            $("#slOperationBranchForBLDocuments").html($("#hReadySlBranches").html());
            ActivateUserBranchSelection('slOperationBranchForBLDocuments');
            $("#slOperationBranchForBLDocuments").val(pShipmentHeader.BranchID);
            if (IsMESCOCompany) {
                //$("#slOperationSalesmanForBLDocuments").html($("#slOperationSalesman").html());
                //$("#slOperationSalesmanForBLDocuments").val(pShipmentHeader.SalesmanID);
                FillListFromObject(pShipmentHeader.SalesmanID, 2, "<--Select-->", "slOperationSalesmanForBLDocuments", MescoSalesmen, null);
            }

            else {
                FillListFromObject(null, 2, "<--Select-->", "slOperationSalesmanForBLDocuments", JSON.stringify(pSalesmen), null);
            }
            /*          $("#slStoreLocationBLDocuments").html($("#slStoreLocation").html()); $("#slStoreLocationBLDocuments").val(pWareHouseList.ID);*/

            $("#slOperationMoveTypesForBLDocuments").val(pShipmentHeader.MoveTypeID == 0 ? "" : pShipmentHeader.MoveTypeID);


            $("#slShipmentCommodities").html($("#slCommodity").html()); $("#slShipmentCommodities").val(pShipmentHeader.CommodityID == 0 ? "" : pShipmentHeader.CommodityID);
            $("#slShipmentPOrC").val(pShipmentHeader.POrC == 0 ? "" : pShipmentHeader.POrC);
            //$("#txtShipmentDeliveryOrderNumber").val(pMainRoute.DeliveryOrderNumber == 0 ? "" : pMainRoute.DeliveryOrderNumber);
            $("#txtShipmentDeliveryOrderNumber").val(pShipmentHeader.ID);
            $("#txtShipmentDeliveryDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pMainRoute.DeliveryDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pMainRoute.DeliveryDate)));
            $("#txtShipmentReleaseDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pShipmentHeader.ReleaseDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.ReleaseDate)));
            $("#txtCertificationNumberForBLDocument").val($(tr).find("td.CertificationNumber").text());
            $("#txtRoadNumberForBLDocument").val($(tr).find("td.RoadNumber").text());
            $("#txtStorageDateForBLDocument").val($(tr).find("td.EntryDate").text());


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
            $("#divNotes1ForBLDocuments").val(pShipmentHeader.Notes2 == 0 ? "" : pShipmentHeader.Notes2);
            $("#txtHouseContainerNumber").val(pShipmentHeader.HouseContainerNumber == 0 ? "" : pShipmentHeader.HouseContainerNumber);

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
            //$("#slStoreLocationBLDocuments").val(pShipmentHeader.StoreLocationID == 0 ? "" : pShipmentHeader.StoreLocationID);
            $("#slBLStatusBLDocuments").val(pShipmentHeader.BlStatus == 0 ? "" : pShipmentHeader.BlStatus);
            //$("#slForwarderBLDocuments").val(pShipmentHeader.ForwarderId == 0 ? "" : pShipmentHeader.ForwarderId);
            //$("#slQuotationRoutesForBLDocuments").val(pShipmentHeader.QuotationRouteID == 0 ? "" : pShipmentHeader.QuotationRouteID);
            //let QROption = new Option(SelectedQRCode, 1);
            //$('#slQuotationRoutesForBLDocuments').empty();
            //$('#slQuotationRoutesForBLDocuments').append($(QROption));
            //$('#slQuotationRoutesForBLDocuments').val(1);
            let newOptionn = new Option(SelectedQRCode, 0, true, true);
            $('#slQuotationRoutesForBLDocuments').append(newOptionn).trigger('change');


            $("#txtOperationUNNumber").val(pShipmentHeader.UNNumber == 0 ? "" : pShipmentHeader.UNNumber);
            $("#txtOperationIMOClass").val(pShipmentHeader.IMOClass == 0 ? "" : pShipmentHeader.IMOClass);

            //Nafeza Integration
            $("#txtNafezaShipperVATNumber").val(pShipmentHeader.ShipperVATNumber);
            $("#txtNafezaConsigneeVATNumber").val(pShipmentHeader.ConsigneeVATNumber);
            $("#txtNafezaACIDNumber").val(pShipmentHeader.ACIDNumber == 0 ? "" : pShipmentHeader.ACIDNumber);

            $("#txtContainerNumberForBLDocument").val(pShipmentHeader.ContainerNumbers == 0 ? "" : pShipmentHeader.ContainerNumbers);
            $("#txtGrossWeightForBLDocument").val(pShipmentHeader.GrossWeight == 0 ? "" : pShipmentHeader.GrossWeight);
            $("#txtVolumeCBMForBLDocument").val(pShipmentHeader.Volume == 0 ? "" : pShipmentHeader.Volume);
            $("#txtDescriptionOfGoodsForBLDocument").val(pShipmentHeader.DescriptionOfGoods == 0 ? "" : pShipmentHeader.DescriptionOfGoods);
            $("#txtDORepresentative").val(pShipmentHeader.DORepresentative == 0 ? "" : pShipmentHeader.DORepresentative);
            $("#txtDeliveryCustomer").val(pShipmentHeader.DeliveryCustomer == 0 ? "" : pShipmentHeader.DeliveryCustomer);
            $("#txtCommodityForBLDocument").val(pShipmentHeader.CommodityName == 0 ? "" : pShipmentHeader.CommodityName);
            $("#txtNoOfPackagesForBLDocument").val(pShipmentHeader.NumberOfPackages == 0 ? "" : pShipmentHeader.NumberOfPackages);


            //$("#slShippersForBLDocuments").css({ "width": "100%" }).select2();
            //$("#slConsigneesForBLDocuments").css({ "width": "100%" }).select2();
            $("#slAgentsForBLDocuments").css({ "width": "100%" }).select2();
            //$("#slNotifyForBLDocuments").css({ "width": "100%" }).select2();
            //$("#slConsignees2").css({ "width": "100%" }).select2();

            Select2OnlineSearch("slShippersForBLDocuments", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
                debugger;
                var query = {
                    pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsShipper=1 AND Name like N'%" + params.term + "%'",
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
                options.push({ text: "Empty Select", id: "", value: "" });
                return {
                    results: options
                };
            }, 3, 2000);
            if ($('#slShippersForBLDocuments').find("option[value='" + pShipmentHeader.ShipperID + "']").length) {
                $('#slShippersForBLDocuments').val(pShipmentHeader.ShipperID).trigger('change');
            } else {
                let newOption = new Option(ShipperName, pShipmentHeader.ShipperID, true, true);
                $('#slShippersForBLDocuments').append(newOption).trigger('change');
            }
            Select2OnlineSearch("slConsigneesForBLDocuments", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
                debugger;
                var query = {
                    pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsConsignee=1 AND Name like N'%" + params.term + "%'",
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
            }, 3, 2000);
            if ($('#slConsigneesForBLDocuments').find("option[value='" + pShipmentHeader.ConsigneeID + "']").length) {
                $('#slConsigneesForBLDocuments').val(pShipmentHeader.ConsigneeID).trigger('change');
            } else {
                let newOption = new Option(ConsigneeName, pShipmentHeader.ConsigneeID, true, true);
                $('#slConsigneesForBLDocuments').append(newOption).trigger('change');
            }
            Select2OnlineSearch("slConsignees2", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
                debugger;
                var query = {
                    pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsConsignee=1 AND Name like N'%" + params.term + "%'",
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
                options.push({ text: "Empty Select", id: "", value: "" });
                return {
                    results: options
                };
            }, 3, 2000);
            if ($('#slConsignees2').find("option[value='" + pShipmentHeader.ConsigneeID2 + "']").length) {
                $('#slConsignees2').val(pShipmentHeader.ConsigneeID2).trigger('change');
            } else {
                let newOption = new Option(Consignee2Name, pShipmentHeader.ConsigneeID2, true, true);
                $('#slConsignees2').append(newOption).trigger('change');
            }
            Select2OnlineSearch("slNotifyForBLDocuments", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
                debugger;
                var query = {
                    pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsConsignee=1 AND Name like N'%" + params.term + "%'",
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
                options.push({ text: "Empty Select", id: "", value: "" });
                return {

                    results: options
                };
            }, 3, 2000);
            if ($('#slNotifyForBLDocuments').find("option[value='" + pNotifyID + "']").length) {
                $('#slNotifyForBLDocuments').val(pNotifyID).trigger('change');
            } else {
                let newOption = new Option(NotifyName, pNotifyID, true, true);
                $('#slNotifyForBLDocuments').append(newOption).trigger('change');
            }
            Select2OnlineSearch("slForwarderBLDocuments", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
                debugger;
                var query = {
                    pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsConsignee=1 AND Name like N'%" + params.term + "%'",
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
                options.push({ text: "Empty Select", id: "", value: "" });
                return {
                    results: options
                };
            }, 3, 2000);
            if ($('#slForwarderBLDocuments').find("option[value='" + pShipmentHeader.ForwarderId + "']").length) {
                $('#slForwarderBLDocuments').val(pShipmentHeader.ForwarderId).trigger('change');
            } else {
                let newOption = new Option(ForwarderName, pShipmentHeader.ForwarderId, true, true);
                $('#slForwarderBLDocuments').append(newOption).trigger('change');
            }

            FadePageCover(false);
            $("div[tabindex='-1']").removeAttr('tabindex');
        }

        , null);


    //parameter in the next 3 lines are 1:Quotations call, 2:Operations call
    $("#btn-NewAddShipperForBLDocuments").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddConsigneeForBLDocuments").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddNotifyForBLDocuments").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddAgentForBLDocuments").attr("onclick", "Agents_ClearAllControls(1);");
    $("#btn-NewAddVessel").attr("onclick", "Vessels_ClearAllControls(null,2));");

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
            , pShipperID: $("#slShippersForBLDocuments").val() == "" ? 0 : $("#slShippersForBLDocuments").val()
            , pConsigneeID: $("#slConsigneesForBLDocuments").val() == "" ? 0 : $("#slConsigneesForBLDocuments").val()
            , pAgentID: $("#slAgentsForBLDocuments").val() == "" ? 0 : $("#slAgentsForBLDocuments").val()
            , pNotifyID: $("#slNotifyForBLDocuments").val() == "" || $("#slNotifyForBLDocuments").val() == null ? 0 : $("#slNotifyForBLDocuments").val()
            , pIncotermID: ($("#slShipmentIncoterm").val() == null || $("#slShipmentIncoterm").val() == "") ? 0 : $("#slShipmentIncoterm").val()
            , pMoveTypeID: ($('#slOperationMoveTypesForBLDocuments option:selected').val() == undefined ? 0 : $('#slOperationMoveTypesForBLDocuments option:selected').val())
            , pNotes: $("#divNotesForBLDocuments").val().trim() == "" ? "0" : $("#divNotesForBLDocuments").val().trim().toUpperCase()

            , pCommodityID: ($("#slShipmentCommodities").val() == "" || $("#slShipmentCommodities").val() == null ? 0 : $("#slShipmentCommodities").val())
            , pCustomerReference: $("#txtShipmentCustomerReference").val().trim() == "" ? "0" : $("#txtShipmentCustomerReference").val().trim().toUpperCase()
            , pSupplierReference: $("#txtShipmentSupplierReference").val().trim() == "" ? "0" : $("#txtShipmentSupplierReference").val().trim().toUpperCase()
            , pPONumber: $("#txtShipmentPONumber").val().trim() == "" ? "0" : $("#txtShipmentPONumber").val().trim().toUpperCase()
            , pPOrC: ($("#slShipmentPOrC").val() == null ? 0 : $("#slShipmentPOrC").val())
            , pDeliveryOrderNumber: ($("#txtShipmentDeliveryOrderNumber").val().trim() == "" ? 0 : $("#txtShipmentDeliveryOrderNumber").val().trim().toUpperCase())
            , pDeliveryDate: ($("#txtShipmentDeliveryDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtShipmentDeliveryDate").val()))

            , pIsDelivered: $("#cbIsDelivered").prop("checked")
            , pIsReceivedFromShipper: $("#cbIsReceivedFromShipper").prop("checked")
            , pConsigneeID2: $("#slConsignees2").val() == "" ? 0 : $("#slConsignees2").val()
            , pReleaseDate: ($("#txtShipmentReleaseDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtShipmentReleaseDate").val()))

            , pBLDate: ($("#txtShipmentBLDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtShipmentBLDate").val()))
            , pShippedOnBoardDate: ($("#txtShipmentShippedOnBoardDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtShipmentShippedOnBoardDate").val()))
            , pFreightPayableAt: $("#txtShipmentFreightPayableAt").val().trim() == "" ? "0" : $("#txtShipmentFreightPayableAt").val().trim().toUpperCase()
            , pACIDNumber: $("#txtShipmentACIDNumber").val().trim() == "" ? "0" : $("#txtShipmentACIDNumber").val().trim().toUpperCase()
            , pACIDNumberDetails: $("#txtShipmentACIDDetails").val() == "" ? "0" : $("#txtShipmentACIDDetails").val()
            , pBookingNumber: $("#txtShipmentBookingNumber").val() == "" ? "0" : $("#txtShipmentBookingNumber").val()
            , pNumberOfOriginalBills: $("#txtShipmentNumberOfOriginalBills").val().trim() == "" ? "0" : $("#txtShipmentNumberOfOriginalBills").val().trim().toUpperCase()

            , pCertificateNumber: $("#txtShipmentCertificateNumber").val().trim() == "" ? 0 : $("#txtShipmentCertificateNumber").val().trim().toUpperCase()
            , pCountryOfOrigin: $("#txtShipmentCountryOfOrigin").val().trim() == "" ? 0 : $("#txtShipmentCountryOfOrigin").val().trim().toUpperCase()
            , pInvoiceValue: $("#txtShipmentInvoiceValue").val().trim() == "" ? 0 : $("#txtShipmentInvoiceValue").val().trim().toUpperCase()
            , pCurrencyID: $("#slClearanceCurrency").val() == null ? 0 : $("#slClearanceCurrency").val()

            , pUNNumber: $("#txtOperationUNNumber").val() == "" || $("#txtOperationUNNumber").val() == null ? 0 : $("#txtOperationUNNumber").val()
            , pIMOClass: $("#txtOperationIMOClass").val() == "" || $("#txtOperationIMOClass").val() == null ? 0 : $("#txtOperationIMOClass").val()
            , pVesselID: $("#slOperationVesselID").val() == "" || $("#slOperationVesselID").val() == null ? 0 : $("#slOperationVesselID").val()
            , pOperationManID: $("#slOperationOperationManID").val() == "" || $("#slOperationOperationManID").val() == null ? 0 : $("#slOperationOperationManID").val()

            //, pPOLCountryID: $("#slPOLCountriesForBLDocuments").val()
            //, pPOL: $("#slPOLForBLDocuments").val()
            //, pPODCountryID: $("#slPODCountriesForBLDocuments").val()
            //, pPOD: $("#slPODForBLDocuments").val()
            , pStoreLocation: $("#slStoreLocationBLDocuments").val() == null || $("#slStoreLocationBLDocuments").val() == "" ? 0 : $("#slStoreLocationBLDocuments").val()
            , pBlStatus: $("#slBLStatusBLDocuments").val() != "" ? $("#slBLStatusBLDocuments").val() : ""
            , pForwarder: $("#slForwarderBLDocuments").val() != "" ? $("#slForwarderBLDocuments").val() : 0
            , pQuotationRouteID: $("#slQuotationRoutesForBLDocuments").val() == null || $("#slQuotationRoutesForBLDocuments").val() == "" ? 0 : $("#slQuotationRoutesForBLDocuments").val()
            , pPrintHouseConsignee: false
            , pPOT: ($("#slPOTForBLDocuments").val() == null || $("#slPOTForBLDocuments").val() == "" ? 0 : $("#slPOTForBLDocuments").val())
            , pNotes1: $("#divNotes1ForBLDocuments").val().trim() == "" ? "0" : $("#divNotes1ForBLDocuments").val().trim().toUpperCase()
            , pExpectedDeparture: "0"
            , pExpectedArrival: "0"
            , pHouseContainerNumber: (glbCallingControl == 'BLDocuments' && pDefaults.UnEditableCompanyName == "UNF") ? $("#txtHouseContainerNumber").val().trim() == "" ? "0" : $("#txtHouseContainerNumber").val().trim().toUpperCase() : "0"
        };
        CallPOSTFunctionWithParameters("/api/Operations/Shipment_Update"
            , pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData[1];
                if (_MessageReturned != "")
                    swal("Success", _MessageReturned);
                else if (pData[0]) {
                    swal("Success", "Saved successfully.");
                    if (pDefaults.UnEditableCompanyName == "NEW")
                        Certificate_GetCertificateHousesAndGrossWeight(MasterOperationID/*$("#hOperationID").val()*/);
                }
                else
                    swal("Sorry", "Connection failed, please try again.");

                jQuery("#ShipmentModal").modal("hide");
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
    FadePageCover(true);
    if (pDefaults.UnEditableCompanyName == "FEL" && $("#slAgentsForBLDocuments").val() == "")
        swal("Sorry", "Please, select agent.");
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
    //check Domestic with POLCountry = PODCountry
    else if ($('input[name=cbDirectionType]:checked').val() == 3 && $('#slPickupCountry option:selected').val() != $('#slDeliveryCountry option:selected').val() && $('#slPickupCountry option:selected').val() != undefined) {
        swal(strSorry, strDomesticWithDifferentCountriesWarning);
        FadePageCover(false);
    }

    else if ($("#txtOperationNumberOfContainers").val() > 50 && $("#txtOperationNumberOfContainers").val() != "") {
        swal("Sorry", "You can not enter more than 50 containers at the first time.");
        FadePageCover(false);
    }
    else { //Ports are OK

        var DirectionIconName = 0;
        var DirectionIconStyle = 0;
        if ($("#slDirectionType").val() == constImportDirectionType) {
            DirectionIconName = ImportIconName; DirectionIconStyle = strImportIconStyleClassName;
        }
        else if ($("#slDirectionType").val() == constExportDirectionType) {
            DirectionIconName = ExportIconName; DirectionIconStyle = strExportIconStyleClassName;
        }
        else if ($("#slDirectionType").val() == constDomesticDirectionType) { //Domestic
            DirectionIconName = DomesticIconName; DirectionIconStyle = strDomesticIconStyleClassName;
        }
        else if ($("#slDirectionType").val() == constCrossBookingDirectionType) { //CrossBooking
            DirectionIconName = CrossBookingIconName; DirectionIconStyle = strCrossBookingIconStyleClassName;
        }
        else if ($("#slDirectionType").val() == constReExportDirectionType) { //ReExport
            DirectionIconName = ReExportIconName; DirectionIconStyle = strReExportIconStyleClassName;
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

            "pDirectionType": $("#slDirectionType").val(),//$('input[name=cbDirectionType]:checked').val(),
            "pDirectionIconName": DirectionIconName,
            "pDirectionIconStyle": DirectionIconStyle,

            "pTransportType": "1",//$('input[name=cbTransportType]:checked').val(),
            "pTransportIconName": OceanIconName,
            "pTransportIconStyle": strOceanIconStyleClassName,

            //"pShipmentType": pIsShipment
            //    ? ($("#cbIsOcean").prop("checked") || $("#cbIsInland").prop("checked")
            //            ? ($('input[name=cbShipmentType]:checked').val() == constConsolidationShipmentType ? ($("#cbIsOcean").prop("checked") ? constLCLShipmentType : constLTLShipmentType) : $('input[name=cbShipmentType]:checked').val())
            //            : 0 //air and house
            //    )/*No air in this case coz air has no consolidation*/
            //    : ($('input[name=cbTransportType]:checked').val() == AirTransportType ? 0 : $('input[name=cbShipmentType]:checked').val()),
            "pShipmentType": constLCLShipmentType,
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
            "pOperationStageID": 60, //this means Order
            "pNumberOfHousesConnected": 0,
            "pExpectedDeparture": pIsShipment
                ? "01/01/1900"
                : ($("#txtOperationExpectedDepartureForBLDocuments").val().trim() == "" ? "01/01/1900" : $("#txtOperationExpectedDepartureForBLDocuments").val().trim().toUpperCase()),
            "pExpectedArrival": pIsShipment
                ? "01/01/1900"
                : ($("#txtOperationExpectedArrivalForBLDocuments").val().trim() == "" ? "01/01/1900" : $("#txtOperationExpectedArrivalForBLDocuments").val().trim().toUpperCase()),
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
            "pMAWBStockID": $("#slMAWBStock").val() > 0 ? $("#slMAWBStock").val() : 0,
            "pTypeOfStockID": $('#slTypeOfStock  option:selected').val() > 0 ? $('#slTypeOfStock option:selected').val() : 0,
            "pMAWBSuffix": pIsShipment ? "0" : ($("#slMAWBStock").val() == "" ? "0" : $("#slMAWBStock option:selected").text()),
            "pFlightNo": pIsShipment ? "0" : ($("#txtFlightNo").val().trim() == "" ? 0 : $("#txtFlightNo").val().toUpperCase()),
            "pIsAWB": pIsShipment ? false : $("#cbIsAWB").prop("checked"),
            "pConsigneeID2": $('#slConsignees2 option:selected').val() == "" || $('#slConsignees2 option:selected').val() == null || $('#slConsignees2 option:selected').val() == undefined
                ? 0 : $('#slConsignees2 option:selected').val(),
            "pReleaseDate": pIsShipment
                ? ($("#txtShipmentReleaseDate").val().trim() == "" ? "01/01/1900" : $("#txtShipmentReleaseDate").val().trim())
                : "01/01/1900",
            "pCertificateNumber": pIsShipment ? ($("#txtShipmentCertificateNumber").val().trim() == "" ? 0 : $("#txtShipmentCertificateNumber").val().trim().toUpperCase()) : 0,
            "pCountryOfOrigin": pIsShipment ? ($("#txtShipmentCountryOfOrigin").val().trim() == "" ? 0 : $("#txtShipmentCountryOfOrigin").val().trim().toUpperCase()) : 0,
            "pInvoiceValue": pIsShipment ? ($("#txtShipmentInvoiceValue").val().trim() == "" ? 0 : $("#txtShipmentInvoiceValue").val().trim().toUpperCase()) : 0,
            "pCurrencyID": 83,//pIsShipment ? ($("#slClearanceCurrency").val() == "" ? 0 : $("#slClearanceCurrency").val()) : "0",
            "pACIDNumber": pIsShipment ? ($("#txtShipmentACIDNumber").val() == "" ? "0" : $("#txtShipmentACIDNumber").val()) : 0,
            "pACIDNumberDetails": pIsShipment ? ($("#txtShipmentACIDDetails").val() == "" ? "0" : $("#txtShipmentACIDDetails").val()) : "0",
            "pBookingNumber": pIsShipment ? ($("#txtShipmentBookingNumber").val() == "" ? "0" : $("#txtShipmentBookingNumber").val()) : "0",
            "pUNNumber": pIsShipment ? ($("#txtShipmentUNNumber").val() == "" || $("#txtShipmentUNNumber").val() == null ? 0 : $("#txtShipmentUNNumber").val())
                : (pDefaults.UnEditableCompanyName == "NIL" ? $("#slCIPStatus").val() : ($("#txtOperationUNNumber").val() == "" || $("#txtOperationUNNumber").val() == null ? 0 : $("#txtOperationUNNumber").val())),
            "pIMOClass": pIsShipment ? ($("#txtShipmentIMOClass").val() == "" || $("#txtShipmentIMOClass").val() == null ? 0 : $("#txtShipmentIMOClass").val())
                : ($("#txtOperationIMOClass").val() == "" || $("#txtOperationIMOClass").val() == null ? 0 : $("#txtOperationIMOClass").val()),
            "pVesselID": pIsShipment ? ($("#slShipmentVesselID").val() == "" || $("#slShipmentVesselID").val() == null ? 0 : $("#slShipmentVesselID").val())
                : ($("#txtOperationVesselID").val() == "" || $("#txtOperationVesselID").val() == null ? 0 : $("#txtOperationVesselID").val()),
            "pNumberOfOriginalBills": IsNull($('#txtShipmentNumberOfOriginalBills').val(), 0),
            "pManifestPreConsignee": pIsShipment ? $("#txtManifestPreConsignee").val() : ""
        };
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
function POL_GetListForBLDocuments(pID, pCountryID, pDontCallFillOtherSidePorts, pCallback) {
    debugger;
    var pWhereClause = "";
    if (pCountryID != null) {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = " + pCountryID;
    }
    else {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = ";
        pWhereClause += ($('#slPickupCity option:selected').val() == null || $('#slPickupCity option:selected').val() == ""
            ? 0 : $('#slPickupCity option:selected').val());
    }
    //if ($('input[name=cbTransportType]:checked').val() == 1)
    //    pWhereClause += " and IsOcean = 1 ";
    //if ($('input[name=cbTransportType]:checked').val() == 2)
    //    pWhereClause += " and IsAir = 1 ";
    //if ($('input[name=cbTransportType]:checked').val() == 3)
    //    pWhereClause += " and IsInland = 1 ";
    pWhereClause += " order by Name ";
    GetListWithCodeAndNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POL", "slPickupCity", pWhereClause
        , function () {
            if (pCallback != null && pCallback != undefined)
                pCallback();
        });
}
function POD_GetListForBLDocuments(pID, pCountryID, pDontCallFillOtherSidePorts) {
    debugger;
    var pWhereClause = "";
    if (pCountryID != null) {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = " + pCountryID;
    }
    else {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = ";
        pWhereClause += ($('#slPODCountriesForBLDocuments option:selected').val() == null || $('#slPODCountriesForBLDocuments option:selected').val() == ""
            ? 0 : $('#slPODCountriesForBLDocuments option:selected').val());
    }
    //if ($('input[name=cbTransportType]:checked').val() == 1)
    //    pWhereClause += " and IsOcean = 1 ";
    //if ($('input[name=cbTransportType]:checked').val() == 2)
    //    pWhereClause += " and IsAir = 1 ";
    //if ($('input[name=cbTransportType]:checked').val() == 3)
    //    pWhereClause += " and IsInland = 1 ";
    pWhereClause += " order by Name ";
    GetListWithCodeAndNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POD", "slDeliveryCity", pWhereClause);
}


/******************** BLDocuments Edit on DblClick and Update End ********************/

/********************* Operation Complaints Start *********************/
function Operations_OpenOperationComplaintsModal() {
    debugger;
    jQuery("#OperationComplaintsModal").modal("show");

    strBindTableRowsFunctionName = "Complaint_BindTableRows";
    strLoadWithPagingFunctionName = "/api/CRM_Clients/Complaint_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    debugger;
    var pWhereClause = " WHERE 1=1 AND OperationID=" + $("#hOperationID").val();
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 999;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (pData) {
            var pUserList = pData[2];
            FillListFromObject(null, 2, "<--Select-->", "slComplaintDetailsSalesRep", pUserList, function () { $("#slComplaintDetailsSalesRep2").html($("#slComplaintDetailsSalesRep").html()) });
            Complaint_BindTableRows(JSON.parse(pData[0]));

            //$("#slCustomer").html($("#hReadySlCustomers").html());
            GetListWithNameAndWhereClause(0, '/api/Customers/LoadAll', '<--Select-->', "slCustomer"
                , ' WHERE ID IN (SELECT CustomerID FROM OperationPartners WHERE OperationID=' + $("#hOperationID").val() + ' AND (OperationPartnerTypeID=1 OR OperationPartnerTypeID=2)) ');


            Fill_SelectInputAfterLoadData(pData[3], 'ID', 'Name', 'select status', '#slStatus', '');
            Fill_SelectInputAfterLoadData(pData[3], 'ID', 'Name', 'select status', '#slStatusDetails', '');
            Fill_SelectInputAfterLoadData(pData[6], 'ID', 'Name', 'select Complaint', '#slComplaint', '');

            FillListFromObject($("#hOperationID").val(), 1, TranslateString("SelectFromMenu"), "slOperationForHeader", pData[7], function () { });

            $("#slComplaintDetailsSalesRep2").html($("#slComplaintDetailsSalesRep").html());
            //Complaint_SetPermissions();

        });


}

function Complaint_BindTableRows(pComplaint) {
    debugger;
    $("#hl-menu-Complaint").parent().addClass("active");
    ClearAllTableRows("tblComplaint");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' title='Print'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";

    $.each(pComplaint, function (i, item) {
        AppendRowtoTable("tblComplaint",
            ("<tr ID='" + item.ID + "' ondblclick='Complaint_FillAllControls(" + item.ID + ");' class='" + (1 == 2 ? "text-primary" : "") + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code'>" + item.Code + "</td>"
                + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
                + "<td class='CustomerName'>" + item.CustomerName + "</td>"
                + "<td class='OperationID hide'>" + item.OperationID + "</td>"
                + "<td class='OperationName'>" + (item.OperationID == 0 ? "" : item.OperationCode) + "</td>"
                //+ "<td class='FromDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.FromDate))) + "</td>"
                + "<td class='ComplaintName hide'>" + (item.ComplaintName == 0 ? "" : item.ComplaintName) + "</td>"
                + "<td class='ComplaintDetails hide'>" + (item.ComplaintDetails == 0 ? "" : item.ComplaintDetails) + "</td>"
                + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"

                //+ "<td class='IsFinalized hide'> <input type='checkbox' id='cbIsFinalized" + item.ID + "' disabled='disabled' " + (item.IsFinalized ? " checked='checked' " : "") + " /></td>"
                + "<td class=''><a onclick='Complaint_Print(" + item.ID + ");' " + printControlsText + "</a></td>"
                + "<td class='hide'><a href='#ComplaintModal' data-toggle='modal' onclick='Complaint_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblComplaint", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblComplaint>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }

    $("#slOperationForHeader").attr("disabled", "disabled");
}
function Complaint_LoadingWithPaging() {
    debugger;
    strBindTableRowsFunctionName = "Complaint_BindTableRows";
    strLoadWithPagingFunctionName = "/api/CRM_Clients/Complaint_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    debugger;
    var pWhereClause = " WHERE 1=1 AND OperationID=" + $("#hOperationID").val();
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 999;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (pData) {

            Complaint_BindTableRows(JSON.parse(pData[0]));

        });
}
function Complaint_ClearAllControls() {
    debugger;
    ClearAllTableRows("tblCRM_ComplaintDetails");
    ClearAllTableRows("tblCRM_ComplaintDetailsResponses");
    ClearAll("#ComplaintModal");
    $("#slCustomer").val("");
    $("#slOperationForHeader").val($("#hOperationID").val());
    $("#slOperation").html("<option value=''><--Select--></option>");
    ClearAllTableRows("tblCRM_ComplaintDetails");
    $("#btnSaveComplaint").attr("onclick", "Complaint_Save(false);");
    $("#btnSaveAndAddNewComplaint").attr("onclick", "Complaint_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
}
function Complaint_FillAllControls(pID) {
    debugger;
    FadePageCover(true);
    ClearAllTableRows("tblCRM_ComplaintDetails");
    ClearAllTableRows("tblCRM_ComplaintDetailsResponses");

    ClearAll("#ComplaintModal");
    var pParametersWithValues = {
        pComplaintID: pID
    };
    CallGETFunctionWithParameters("/api/CRM_Clients/Complaint_FillModal", pParametersWithValues
        , function (pData) {
            var pComplaintHeader = JSON.parse(pData[0]);
            var pOperationList = pData[1];
            var pComplaintDetails = pData[2];
            ComplaintDetails_BindTableRows(JSON.parse(pData[2]));
            jQuery("#ComplaintModal").modal("show");
            $("#hComplaintID").val(pID);
            //$("#lblShown").html(": " + pComplaintHeader.ComplaintName);
            $("#txtComplaintCode").val(pComplaintHeader.Code);
            $("#slCustomer").val(pComplaintHeader.CustomerID == 0 ? "" : pComplaintHeader.CustomerID);
            $("#slOperationForHeader").val(pComplaintHeader.OperationID == 0 ? "" : pComplaintHeader.OperationID);
            FillListFromObject(pComplaintHeader.OperationID, 1, "<--Select-->", "slOperation", pOperationList, null);
            //$("#txtComplaintName").val(pComplaintHeader.ComplaintName == 0 ? "" : pComplaintHeader.ComplaintName);
            $("#txtComplaintDetails").val(pComplaintHeader.ComplaintDetails == 0 ? "" : pComplaintHeader.ComplaintDetails);
            $("#txtNotes").val(pComplaintHeader.Notes == 0 ? "" : pComplaintHeader.Notes);

            //$("#txtFromDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pComplaintHeader.FromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pComplaintHeader.FromDate)));

            $("#btnSaveComplaint").attr("onclick", "Complaint_Save(false);");
            $("#btnSaveAndAddNewComplaint").attr("onclick", "Complaint_Save(true);");
            FadePageCover(false);
        }
        , null);
}
function Complaint_Save(pSaveAndNew) {
    debugger;
    FadePageCover(true);
    //if (!isValidDate($("#txtFromDate").val().trim(), 1) || !isValidDate($("#txtToDate").val().trim(), 1)) {
    //    swal(strSorry, "Please, Enter Start-End dates.");
    //    FadePageCover(false);
    //}
    //if ($("#txtFromDate").val().trim() != "" && $("#txtToDate").val().trim() != ""
    //    && Date.prototype.compareDates(ConvertDateFormat($("#txtFromDate").val().trim()), ConvertDateFormat($("#txtToDate").val().trim())) < 0) {
    //    FadePageCover(false);
    //    swal("Sorry", "Please, check dates.");
    //}
    if (ValidateForm("form", "ComplaintModal")) {
        pParametersWithValues = {
            pID: $("#hComplaintID").val() == "" ? 0 : $("#hComplaintID").val()
            , pCustomerID: $("#slCustomer").val() == "" ? "0" : $("#slCustomer").val()
            , pOperationID: $("#slOperationForHeader").val() == "" ? "0" : $("#slOperationForHeader").val()
            //, pComplaintName: $("#txtComplaintName").val().trim() == "" ? "0" : $("#txtComplaintName").val().trim().toUpperCase()
            //, pComplaintDetails: $("#txtComplaintDetails").val().trim() == "" ? "0" : $("#txtComplaintDetails").val().trim().toUpperCase()
            //, pNotes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()
        };
        CallGETFunctionWithParameters("/api/CRM_Clients/Complaint_Save", pParametersWithValues
            , function (pData) {
                if (pData[0] == "") {
                    Complaint_LoadingWithPaging();
                    if (pSaveAndNew) {
                        Complaint_ClearAllControls();
                        $("#hComplaintID").val(pData[1]);
                        $("#txtComplaintCode").val(pData[2]);
                    }
                    else {
                        //jQuery("#ComplaintModal").modal("hide");
                        $("#hComplaintID").val(pData[1]);
                        $("#txtComplaintCode").val(pData[2]);
                    }
                    swal("Success", "Saved successfully.");
                }
                else {
                    swal("Sorry", pData[0]);
                    FadePageCover(false);
                }
            }
            , null);
    }
    else //if (ValidateForm("form", "ComplaintModal"))
        FadePageCover(false);
}

function ComplaintDetails_Save(pSaveandAddNew) {
    debugger;
    if ($("#hComplaintID").val() == "") {
        swal("Sorry", "Please Enter customer first.");
    }
    else
        if (ValidateForm("form", "CRM_ComplaintDetailsModal")) {

            CallGETFunctionWithParameters("/api/CRM_Clients/ComplaintDetails_Save", {
                pID: $("#hIDDetails").val() == "" ? 0 : $("#hIDDetails").val(),
                pCRM_ComplaintID: $("#hComplaintID").val(),
                pOperationID: ($("#slOperation").val() == "" || $("#slOperation").val() == null) ? 0 : $("#slOperation").val(),
                pStatusID: $("#slStatus").val() == "" ? 0 : $("#slStatus").val(),
                pComplaintDescription: $("#txtComplaintDetails").val() == "" ? 0 : $("#txtComplaintDetails").val(),
                //pComplaint: $("#txtComplaintName").val() == "" ? 0 : $("#txtComplaintName").val(),
                pComplaintDate: ($("#txtComplaintDate").val().trim()).length < 6 ? "01/01/1900" : ConvertDateFormat($("#txtComplaintDate").val().trim()),
                pSalesRepID: ($("#slComplaintDetailsSalesRep").val() == "" ? 0 : $("#slComplaintDetailsSalesRep").val()),
                pResponseDescription: $("#txtResponseDetails").val() == "" ? 0 : $("#txtResponseDetails").val(),
                pResponseDate: ($("#txtResponseDate").val().trim()).length < 6 ? "01/01/1900" : ConvertDateFormat($("#txtResponseDate").val().trim()),
                pSalesRep2ID: ($("#slComplaintDetailsSalesRep2").val() == "" ? 0 : $("#slComplaintDetailsSalesRep2").val()),
                pComplaintNameID: ($("#slComplaint").val() == "" ? 0 : $("#slComplaint").val())

            }, function (pData) {
                if (pData[0] == "") {
                    ComplaintDetails_LoadingWithPaging();
                    if (pSaveandAddNew) {
                        Complaint_ClearAllControls();
                        $("#hIDDetails").val(pData[1])


                    }
                    else {
                        //jQuery("#CRM_ComplaintDetailsModal").modal("hide");
                        $("#hIDDetails").val(pData[1])
                    }
                    swal("Success", "Saved successfully.");
                }
                else {
                    swal("Sorry", pData[0]);
                    FadePageCover(false);
                }
            }, null);
        }
}
function ComplaintDetails_BindTableRows(pComplaint) {
    debugger;
    ClearAllTableRows("tblCRM_ComplaintDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pComplaint, function (i, item) {
        AppendRowtoTable("tblCRM_ComplaintDetails",
            ("<tr ID='" + item.ID + "' ondblclick='ComplaintDetails_FillAllControls(" + item.ID + ");' class='" + (1 == 2 ? "text-primary" : "") + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='CRM_ComplaintID hide'>" + item.CRM_ComplaintID + "</td>"
                + "<td class='OperationID hide' value='" + item.OperationID + "'>" + (item.OperationCode == 0 ? "" : item.OperationCode) + "</td>"
                + "<td class='StatusID' value='" + item.StatusID + "'>" + (item.StatueCode == 0 ? "" : item.StatueCode) + "</td>"
                + "<td class='ComplaintNameID' value='" + (item.ComplaintNameID == 0 ? "" : item.ComplaintNameID) + "'>" + (item.ComplaintName == 0 ? "" : item.ComplaintName) + "</td>"
                + "<td class='ComplaintDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ComplaintDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ComplaintDate))) + "</td>"
                + "<td class='ResponseDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ResponseDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ResponseDate))) + "</td>"
                + "<td class='SalesRepID' value='" + item.SalesRepID + "'>" + (item.SalesRepName == 0 ? "" : item.SalesRepName) + "</td>"
                + "<td class='SalesRepID2 hide' value='" + item.SalesRepID2 + "'>" + (item.StatueCode == 0 ? "" : item.StatueCode) + "</td>"
                + "<td class='StatusID hide' value='" + item.StatusID + "'>" + (item.StatueCode == 0 ? "" : item.StatueCode) + "</td>"
                + "<td class='SalesRepID2 hide'>" + (item.SalesRepName2 == 0 ? "" : item.SalesRepName2) + "</td>"
                + "<td class='Complaint hide'>" + (item.Complaint == 0 ? "" : item.Complaint) + "</td>"
                + "<td class='ComplaintDescription hide'>" + (item.ComplaintDescription == 0 ? "" : item.ComplaintDescription) + "</td>"
                + "<td class='ResponseDescription hide'>" + (item.ResponseDescription == 0 ? "" : item.ResponseDescription) + "</td>"
                //CRM_ComplaintID ,StatusID ,StatueCode,OperationID,OperationCode ,Complaint ,ComplaintDescription ,
                //ComplaintDate ,SalesRepID,SalesRepName ,ResponseDescription ,ResponseDate ,SalesRepID2,SalesRepName2,ID 
                //+ "<td class='IsFinalized hide'> <input type='checkbox' id='cbIsFinalized" + item.ID + "' disabled='disabled' " + (item.IsFinalized ? " checked='checked' " : "") + " /></td>"
                + "<td class='hide'><a href='#CRM_ComplaintDetailsModal' data-toggle='modal' onclick='ComplaintDetails_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCRM_ComplaintDetails", "ID", "cb-CheckAll_ComplaintDetails");
    CheckAllCheckbox("ID");
    HighlightText("#tblCRM_ComplaintDetails>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }

}
function ComplaintDetails_FillAllControls(pID) {
    debugger;
    FadePageCover(true);
    ClearAll("#CRM_ComplaintDetailsModal");
    var pParametersWithValues = {
        pComplaintDetailsID: pID
    };
    CallGETFunctionWithParameters("/api/CRM_Clients/ComplaintDetails_FillModal", pParametersWithValues
        , function (pData) {
            debugger;
            var pComplaintDetails = JSON.parse(pData[0]);
            ComplaintDetailsResponses_BindTableRows(JSON.parse(pData[1]))
            jQuery("#CRM_ComplaintDetailsModal").modal("show");
            $("#hIDDetails").val(pID);

            $("#slOperation").val(pComplaintDetails[0].OperationID == 0 ? "" : pComplaintDetails[0].OperationID)
            $("#slStatus").val(pComplaintDetails[0].StatusID == 0 ? 0 : pComplaintDetails[0].StatusID)
            $("#txtComplaintDetails").val(pComplaintDetails[0].ComplaintDescription == 0 ? "" : pComplaintDetails[0].ComplaintDescription)
            //$("#txtComplaintName").val(pComplaintDetails[0].Complaint == 0 ? "" : pComplaintDetails[0].Complaint)
            $("#txtComplaintDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pComplaintDetails[0].ComplaintDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pComplaintDetails[0].ComplaintDate)))//(pComplaintDetails[0].ComplaintDate)
            $("#slComplaintDetailsSalesRep").val(pComplaintDetails[0].SalesRepID == 0 ? "" : pComplaintDetails[0].SalesRepID)
            $("#txtResponseDetails").val(pComplaintDetails[0].ResponseDescription == 0 ? "" : pComplaintDetails[0].ResponseDescription)
            $("#txtResponseDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pComplaintDetails[0].ResponseDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pComplaintDetails[0].ResponseDate)))//(pComplaintDetails[0].ResponseDate)
            $("#slComplaintDetailsSalesRep2").val(pComplaintDetails[0].SalesRepID2 == 0 ? "" : pComplaintDetails[0].SalesRepID2)
            $("#slComplaint").val(pComplaintDetails[0].ComplaintNameID)

            //$("#txtFromDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pComplaintHeader.FromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pComplaintHeader.FromDate)));

            $("#btnSave2").attr("onclick", "ComplaintDetails_Save(false);");
            $("#btnSaveandNew2").attr("onclick", "ComplaintDetails_Save(true);");
            FadePageCover(false);
        }
        , null);
}
function ComplaintDetails_LoadingWithPaging() {
    debugger;
    var pWhereClause = ComplaintDetails_GetWhereClause();
    var pPageSize = 100;
    var pPageNumber = 1;
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size",
        "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total",
        "/api/CRM_Clients/Complaint_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned", pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters,
        function (pData) { ComplaintDetails_BindTableRows(JSON.parse(pData[4])); });
    HighlightText("#tblCRM_ComplaintDetails>tbody>tr", $("#txt-Search").val().trim());
}
function ComplaintDetails_GetWhereClause() {
    return ("WHERE 1=1 AND CRM_ComplaintID = " + $("#hComplaintID").val());
}
function ComplaintDetails_ClearAllControls() {
    debugger;
    ClearAllTableRows("tblCRM_ComplaintDetailsResponses");

    ClearAll("#CRM_ComplaintDetailsModal");
    $('.StatusComplaintDetails').addClass('hide');
    $("#btnSave2").attr("onclick", "ComplaintDetails_Save(false);");
    $("#btnSaveandNew2").attr("onclick", "ComplaintDetails_Save(true);");
    $("#cb-CheckAll_ComplaintDetails").prop('checked', false);
}
function ComplaintDetails_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCRM_ComplaintDetails') != "")
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
                DeleteListFunction("/api/CRM_Clients/ComplaintDetails_Delete", { "pComplaintDetailsIDs": GetAllSelectedIDsAsString('tblCRM_ComplaintDetails') }, function () {
                    ComplaintDetails_LoadingWithPaging();
                });
            });
    //DeleteListFunction("/api/Complaint/Delete", { "pComplaintIDs": GetAllSelectedIDsAsString('tblComplaint') }, function () { Complaint_LoadingWithPaging(); });
}


function ComplaintDetailsResponses_Save(pSaveandAddNew) {
    debugger;
    if ($("#hIDDetails").val() == "") {
        swal("Sorry", "Please Enter Complaint first.");
    }
    else
        if (ValidateForm("form", "CRM_ComplaintDetailsResponsesModal")) {

            CallGETFunctionWithParameters("/api/CRM_Clients/ComplaintDetailsResponses_Save", {
                pID: $("#hIDDetailsResponses").val() == "" ? 0 : $("#hIDDetailsResponses").val(),
                pComplaintDetailsID: $("#hIDDetails").val(),
                pResponseDescription: $("#txtResponseDetails").val() == "" ? 0 : $("#txtResponseDetails").val(),
                pResponseDate: ConvertDateFormat($("#txtResponseDate").val().trim()).length < 6 ? "01/01/1900" : ConvertDateFormat($("#txtResponseDate").val().trim()),
                pSalesRep2ID: ($("#slComplaintDetailsSalesRep2").val() == "" ? 0 : $("#slComplaintDetailsSalesRep2").val()),
                pStatusDetailsID: ($("#slStatusDetails").val() == "" ? 0 : $("#slStatusDetails").val())
                //pID  pComplaintDetailsID   pResponseDescription  pResponseDate  pSalesRep2ID
            }, function (pData) {
                if (pData[0] == "") {
                    ComplaintDetailsResponses_LoadingWithPaging();
                    if (pSaveandAddNew) {
                        Complaint_ClearAllControls();
                    }
                    else {
                        jQuery("#CRM_ComplaintDetailsResponsesModal").modal("hide");
                    }
                    swal("Success", "Saved successfully.");
                }
                else {
                    swal("Sorry", pData[0]);
                    FadePageCover(false);
                }
            }, null);
        }
}
function ComplaintDetailsResponses_BindTableRows(pComplaint) {
    debugger;
    ClearAllTableRows("tblCRM_ComplaintDetailsResponses");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pComplaint, function (i, item) {
        AppendRowtoTable("tblCRM_ComplaintDetailsResponses",
            ("<tr ID='" + item.ID + "' ondblclick='ComplaintDetailsResponses_FillAllControls(" + item.ID + ");' class='" + (1 == 2 ? "text-primary" : "") + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='ComplaintDetailsID hide'>" + item.ComplaintDetailsID + "</td>"
                + "<td class='SalesRep2'  value='" + item.SalesRep2 + "'>" + (item.SalesRep2Name == 0 ? "" : item.SalesRep2Name) + "</td>"
                + "<td class='StatusDetailsID'  value='" + item.StatusID + "'>" + (item.StatusName == 0 ? "" : item.StatusName) + "</td>"
                + "<td class='ResponseDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ResponseDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ResponseDate))) + "</td>"
                + "<td class='ResponseDescription hide'>" + (item.ResponseDescription == 0 ? "" : item.ResponseDescription) + "</td>"
                + "<td class='hide'><a href='#CRM_ComplaintDetailsResponsesModal' data-toggle='modal' onclick='ComplaintDetailsResponses_FillControls(" + item.ID + ");'> " + editControlsText + "</a></td>"
                + "<td class=''><a href='#' class='btn btn-xs btn-rounded btn-warning float-right' onclick='Pricing_Notify(" + item.ID + ");'>Notify </a></td></tr>"));
        //<a href="#CRM_FollowUpModal" data-toggle="modal" onclick="CRM_FollowUp_EditByDblClick(31 ,0);" class="btn btn-xs btn-rounded btn-lightblue float-right" title="Edit"> <i class="fa fa-pencil" style="padding-left: 5px;"></i> <span style="padding-right: 5px;">Edit</span></a>
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCRM_ComplaintDetailsResponses", "ID", "cb-CheckAll_ComplaintDetailsResponses");
    CheckAllCheckbox("ID");
    HighlightText("#tblCRM_ComplaintDetailsResponses>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    if (pComplaint.length > 0)
        $('.StatusComplaintDetails').removeClass('hide');
    else
        $('.StatusComplaintDetails').addClass('hide');
    if ($('#slStatus').val() == null)
        $('#slStatus').val(0);
}
function ComplaintDetailsResponses_FillAllControls(pID) {
    debugger;
    jQuery("#CRM_ComplaintDetailsResponsesModal").modal("show");
    ClearAll("#CRM_ComplaintDetailsResponsesModal");
    var tr = $("tr[ID='" + pID + "']");
    $("#hIDDetailsResponses").val(pID)
    $("#txtResponseDetails").val($(tr).find("td.ResponseDescription").text());
    $("#txtResponseDate").val($(tr).find("td.ResponseDate").text());
    $("#slComplaintDetailsSalesRep2").val(parseInt($(tr).find("td.SalesRep2").attr('value')));
    $("#slStatusDetails").val(parseInt($(tr).find("td.StatusDetailsID").attr('value')));
}
function ComplaintDetailsResponses_LoadingWithPaging() {
    debugger;
    var pWhereClause = ComplaintDetailsResponses_GetWhereClause();
    var pPageSize = 100;
    var pPageNumber = 1;
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size",
        "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total",
        "/api/CRM_Clients/Complaint_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned", pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters,
        function (pData) { ComplaintDetailsResponses_BindTableRows(JSON.parse(pData[5])); });
    HighlightText("#tblCRM_ComplaintDetailsResponses>tbody>tr", $("#txt-Search").val().trim());
}
function ComplaintDetailsResponses_GetWhereClause() {
    return ("WHERE 1=1 AND ComplaintDetailsID = " + $("#hIDDetails").val());
}
function ComplaintDetailsResponses_ClearAllControls() {
    debugger;
    ClearAll("#CRM_ComplaintDetailsResponsesModal");
    $("#hIDDetailsResponses").val("")
    //$("#btnSave2").attr("onclick", "ComplaintDetailsResponses_Save(false);");
    //$("#btnSaveandNew2").attr("onclick", "ComplaintDetailsResponses_Save(true);");
    $("#cb-CheckAll_ComplaintDetailsResponses").prop('checked', false);
}
function ComplaintDetailsResponses_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCRM_ComplaintDetailsResponses') != "")
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
                DeleteListFunction("/api/CRM_Clients/ComplaintDetailsResponses_Delete", { "pComplaintDetailsResponsesIDs": GetAllSelectedIDsAsString('tblCRM_ComplaintDetailsResponses') }, function () {
                    ComplaintDetailsResponses_LoadingWithPaging();
                });
            });
    //DeleteListFunction("/api/Complaint/Delete", { "pComplaintIDs": GetAllSelectedIDsAsString('tblComplaint') }, function () { Complaint_LoadingWithPaging(); });
}



function Pricing_Notify(pID) {
    debugger;
    Receptionists_GetAvailableUsers();
    $("#btnCheckboxesListApply").attr("onclick", "Pricing_SendLocalEmail(" + pID + ");");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers();");
}

function ShowReceptionists(pID) {
    debugger;
    Receptionists_GetAvailableUsers();
    $("#btnCheckboxesListApply").attr("onclick", "ComplaintDetails_SendLocalEmail(" + pID + ");");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers();");
}
function Pricing_SendLocalEmail(pID) {
    debugger;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pSelectedItemsIDs == "")
        swal("Sorry", "You have to select at least one receptionist.");
    else { //send
        FadePageCover(true);
        var tr = $("tr[ID='" + pID + "']");
        $("#hIDDetailsResponses").val(pID)
        $("#txtResponseDetails").val($(tr).find("td.ResponseDescription").text());

        var pParametersWithValues = {
            pUserIDs: pSelectedItemsIDs
            , pSubject: "Response on Complaint From " + $('#slCustomer  option:selected').text() + ""
            , pBody: "There is a complaint from Client " + $('#slCustomer  option:selected').text() + " on operation " + $('#slOperation  option:selected').text() + " "
            , pQuotationRouteID: 0
            , pPricingID: 0
            , pRequestOrReply: 0
            , pOperationID: $('#slOperation').val()
            , pIsAlarm: true
            , pParentID: 0
            , pEmailSource: 0
            , pIsSendNormalEmail: false
            //LoadWithPaging parameters
            , pWhereClauseForLoadWithPaging: ("WHERE 1=1")
            , pPageSize: 1 //$("#select-page-size").val()
            //pPageNumber is 1 coz its insert so it will be on the top
            , pPageNumber: 1 //$("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text() 
            , pOrderBy: "ID DESC"
            , pSenderUserID: pLoggedUser.ID
        };
        CallGETFunctionWithParameters("/api/LocalEmails/SendEmail", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    jQuery("#CheckboxesListModal").modal("hide");
                    swal("Success", "Sent successfully.");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}

function ComplaintDetails_SendLocalEmail(pID) {
    debugger;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pSelectedItemsIDs == "")
        swal("Sorry", "You have to select at least one receptionist.");
    else { //send
        FadePageCover(true);
        var tr = $("tr[ID='" + pID + "']");
        $("#hIDDetailsResponses").val(pID)
        $("#txtResponseDetails").val($(tr).find("td.ResponseDescription").text());

        var pParametersWithValues = {
            pUserIDs: pSelectedItemsIDs
            , pSubject: "Complaint " + $('#slComplaint option:selected').text() + " From " + $('#slCustomer  option:selected').text() + ""
            , pBody: "There is a complaint from Client " + $('#slCustomer  option:selected').text() + " on operation " + $('#slOperation  option:selected').text() + " (" + $('#txtComplaintDetails').val() + ") "
            , pQuotationRouteID: 0
            , pPricingID: 0
            , pRequestOrReply: 0
            , pOperationID: $('#slOperation').val()
            , pIsAlarm: true
            , pParentID: ""
            , pEmailSource: 0
            , pIsSendNormalEmail: false
            //LoadWithPaging parameters
            , pWhereClauseForLoadWithPaging: ("WHERE 1=1")
            , pPageSize: 1 //$("#select-page-size").val()
            //pPageNumber is 1 coz its insert so it will be on the top
            , pPageNumber: 1 //$("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text() 
            , pOrderBy: "ID DESC"
            , pSenderUserID: pLoggedUser.ID
        };// bool pIsAlarm, string pParentID , string pWhereClauseForLoadWithPaging, Int32 pPageSize, Int32 pPageNumber, string pOrderBy
        CallGETFunctionWithParameters("/api/LocalEmails/SendEmail", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    jQuery("#CheckboxesListModal").modal("hide");
                    swal("Success", "Sent successfully.");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}


function OpenCRM_ComplaintDetailsModal() {
    debugger;
    if ($("#hComplaintID").val() == "") {
        swal(strSorry, "Please Save the Complaint First");
    } else {
        jQuery("#CRM_ComplaintDetailsModal").modal("show");
    }
}
function OpenCRM_ComplaintDetailsResponsesModal() {
    debugger;
    if ($("#hIDDetails").val() == "") {
        swal(strSorry, "Please Save the Complaint Details First");
    } else {
        jQuery("#CRM_ComplaintDetailsResponsesModal").modal("show");
    }
}

function Complaint_Print(pID) {
    debugger;
    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("pID");

    arr_Values.push(pID);

    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "ComplaintsReport"
        , pReportName: "ComplaintsReport"
    };


    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;
    FadePageCover(false);

}
/********************* Operation Complaints End *********************/

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
                $("#txtCargoGrossWeight").val(pOperationHeader.GrossWeight);
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////ContainerPackages Fns////////////////////////////////////////////////////////////

function cbIsForm13DeliveredChanged() {
    debugger;
    if ($("#cbIsForm13Delivered").prop('checked')) {
        $("#txtOperationForm13Date").val(getTodaysDateInddMMyyyyFormat());
    } else {
        $("#txtOperationForm13Date").val("");
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//#region LCL Houses screen new objects added by nourat 10-09-2023

function InvoiceTypes_GetList_ForLCL(pID, pSlName) {

    var wherestr = "";
    wherestr += " WHERE invoicetypes.IsInactive = 0 and invoicetypes.Code NOT IN ('draft') ";
    wherestr += "\n" + " AND ID IN (SELECT DISTINCT InvoiceTypeID FROM WH_CSL_Tariff  ";
    wherestr += "\n" + "            WHERE ID IN (SELECT utd.WH_CSL_TariffID FROM User_WH_CSL_TariffDraft AS utd WHERE utd.CanGenerate = 1 AND utd.UserID = " + $("#hLoggedUserID").val() + ") )";
    wherestr += "\n" + " AND ID NOT IN (SELECT wct.InvoiceTypeID FROM WH_CSL_Tariff AS wct ";
    wherestr += "\n" + " 				 INNER JOIN WH_CSL_Tariff_Details AS td  ON wct.ID = td.WH_CSL_TariffID ";
    wherestr += "\n" + " 				 INNER JOIN ChargeTypes AS ct ON ct.ID = td.ChargeTypesID WHERE ct.Name = N'" + (IsMESCOCompany ? "مصاريف التخزين" : "Storage At Warehouse") + "'";
    wherestr += "\n" + "			    )  ORDER BY invoicetypes.Name";

    GetListWithNameAndWhereClause(pID, "/api/InvoiceTypes/LoadAll", "Select Invoice Type", pSlName, wherestr, null);
}

function WH_CSL_Tariff_Details_BindTableRows(pTableRows, pCanDelete, pDoNotClearTable) {
    debugger;
    if (!IsNull(pDoNotClearTable, false))
        ClearAllTableRows("tblWH_CSL_Tariff_Details");

    $("#cbWH_CSL_Tariff_DetailsDeleteHeader").attr("checked", true);
    $("#cbWH_CSL_Tariff_DetailsDeleteHeader").attr("disabled", pCanDelete ? false : true);

    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblWH_CSL_Tariff_Details",
            ("<tr ID='Item" + item.ID + "' ondblclick='WH_CSL_Tariff_Details_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ItemID'> <input name='Delete' id='" + item.ID + "' type='checkbox' checked "
                + (pCanDelete ? "" : " disabled ")
                + " value='" + item.ID + "'"
                + " onfocus='DisableEnterKey(id);'"
                + " onkeypress='DisableEnterKey(id);'"
                + " onchange='updateCheckedRateSum();' /></td>"
                + "<td class='ChargeType'>" + item.ChargeType + "</td>"
                + "<td class='Rate'>" + item.Rate + "</td>"
                + "<td class='CalcType'>" + (item.CalcType == 0 ? "" : item.CalcType) + "</td>"
                + "<td class='CalculatedAmount hide'>" + item.CalculatedAmount + "</td>"
                + "<td class='CurrencyID' val='" + (item.CurrencyID == undefined ? pDefaults.CurrencyID : item.CurrencyID) + "'>"
                + (item.CurrencyCode == undefined ? pDefaults.CurrencyCode : item.CurrencyCode) + "</td>"
                + "<td class='HouseBillID hide'>" + IsNull(item.HouseBillID, 0) + "</td>"
                + "<td class='IsPayable hide'>" + IsNull(item.IsPayable, false) + "</td>"
                + "</tr>")
        );

    });
    updateCheckedRateSum();
    BindAllCheckboxonTable("tblWH_CSL_Tariff_Details", "ItemID");
    CheckAllCheckbox("HeaderDeleteWH_CSL_Tariff_DetailsID");
    //HighlightText("#tblWH_CSL_Tariff_Details>tbody>tr", $("#txt-SearchItem").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}


function Payables_Details_BindTableRows(pTableRows, pCanDelete, pDoNotClearTable) {
    debugger;
    if (!IsNull(pDoNotClearTable, false))
        ClearAllTableRows("tblWH_CSL_Tariff_Details");

    $("#cbWH_CSL_Tariff_DetailsDeleteHeader").attr("checked", true);
    $("#cbWH_CSL_Tariff_DetailsDeleteHeader").attr("disabled", pCanDelete ? false : true);

    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblWH_CSL_Tariff_Details",
            ("<tr ID='Item" + item.ID + "' >"
                + "<td class='ItemID'> <input " + (item.AccNoteID > 0 || item.IsApproved || item.InvoiceID > 0 || item.DraftInvoiceID > 0 ? " disabled = 'disabled'" : "") + " name = 'Delete' id = '" + item.ID + "' type = 'checkbox'" + " value = '" + item.ID + "' onfocus = 'DisableEnterKey(id);' onkeypress = 'DisableEnterKey(id);' /></td > "
                + "<td class='ChargeType'>" + item.ChargeType + "</td>"
                + "<td class='Rate'>" + item.Rate + "</td>"
                + "<td></td>"
                + "<td class='CalcType'>" + (item.CalcType == 0 ? "" : item.CalcType) + "</td>"
                + "<td class='CurrencyID hide' val='" + (item.CurrencyID == 0 ? "" : item.CurrencyID) + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyID) + "</td>"
                + "<td class='OperationID  hide'>" + (item.OperationID == 0 ? "" : item.OperationID) + "</td>"
                + "<td class='CalculatedAmount hide'>" + item.CalculatedAmount + "</td>"
                + "<td class='HouseBillID hide'>" + IsNull(item.HouseBillID, 0) + "</td>"//used to generate invoice from receivable                
                + "<td class='IsPayable hide'>" + IsNull(item.IsPayable, false) + "</td>"//used to generate receivable from payable                
                + "</tr>"));
    });
    BindAllCheckboxonTable("tblWH_CSL_Tariff_Details", "ItemID");
    CheckAllCheckbox("HeaderDeleteWH_CSL_Tariff_DetailsID");
    //HighlightText("#tblWH_CSL_Tariff_Details>tbody>tr", $("#txt-SearchItem").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
var pSelectedHouseIDs = "";
var pSelectedItemIDs = "";
var pGeneratedDraftIDs = "";
var _SelectedMasterIDs = "";

function GetHousesReceivables() {
    debugger;
    /*    let ids = "";*/
    $("#btn-MultiEditPayablesLCL").addClass("hide");
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $("#btn-MultiEditReceivablesLCL").removeClass("hide");
    }

    $("#WH_CSL_TariffModal #btnGenerateAndUpdateInvoices").addClass("hide");
    //let id = parseInt($('#tblOperations tbody td input[name="Delete"]:checked').val());
    let ids = [];
    var id;
    $('#tblOperations tbody td input[name="Delete"]:checked').each(function (i, item) {
        id = parseInt($(this).val());
        if (!isNaN(id)) {
            ids.push(id);
        }
    });
    //$('#tblOperations tbody td input[name="Delete"]:checked').each(function (i, item) {
    //    let id = parseInt($(this).val());
    //    if (!isNaN(id)) {
    //        ids += id + ",";
    //    }
    //});
    //// Remove trailing comma, if any
    //ids = ids.replace(/,$/, "");
    if (isNaN(id) || ids.length > 1) {
        swal("Sorry", "Please Select at only one House");
    }
    else {
        console.log("API Call");
        FadePageCover(true);
        $("#btnGenerateInvoices").addClass("hide");
        $("#btnGetLclPayables").addClass("hide");
        $("#btn-NewDebitNote").removeClass("hide");
        if (pDefaults.UnEditableCompanyName == "UNF") {
            $("#btn-AddReceivablesLclNote").removeClass("hide");
        }
        $("#btn-NewCreditNote").addClass("hide");
        $("#btn-AddPayables").addClass("hide");
        jQuery("#WH_CSL_TariffModal").modal("show");


        CallGETFunctionWithParameters("/api/Operations/GetAllReceivablesForHouses", { pSelectedID: id },
            function (pResult) {
                FadePageCover(false);
                var result = JSON.parse(pResult);
                if (result) {
                    $('#WH_CSL_TariffModal .head-title').text('Receivables');
                    FadePageCover(true);
                    //$("#btnGenerateInvoices").removeClass("hide");

                    var customData = [];
                    $.each(result, function (i, item) {
                        customData.push({
                            ID: item.ID,
                            ChargeType: item.ChargeTypeName,
                            CalcType: item.CurrencyCode,
                            Rate: item.SalePrice,
                            CalculatedAmount: item.cost,
                            HouseBillID: item.HouseBillID,
                            OperationID: item.OperationID,
                            CurrencyID: item.CurrencyID,
                            InvoiceID: item.InvoiceID,
                            DraftInvoiceID: item.DraftInvoiceID,
                            AccNoteID: item.AccNoteID

                        });
                    });
                    Payables_Details_BindTableRows(customData, true);
                    FadePageCover(false);

                }

            },
            null
        );
    }


}
function GetHousesPayables() {
    debugger;
    /*    let ids = "";*/


    $("#WH_CSL_TariffModal #btn-NewCreditNote").removeClass("hide");
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $("#WH_CSL_TariffModal #btn-AddPayables").removeClass("hide");
        $("#btn-MultiEditPayablesLCL").removeClass("hide");
        $("#btn-MultiEditReceivablesLCL").addClass("hide");
    }
    $("#WH_CSL_TariffModal #btnGenerateAndUpdateInvoices").addClass("hide");
    $("#WH_CSL_TariffModal #btn-AddReceivablesLclNote").addClass("hide");
    //let id = parseInt($('#tblOperations tbody td input[name="Delete"]:checked').val());
    let ids = [];
    var id;
    $('#tblOperations tbody td input[name="Delete"]:checked').each(function (i, item) {
        id = parseInt($(this).val());
        if (!isNaN(id)) {
            ids.push(id);
        }
    });
    //$('#tblOperations tbody td input[name="Delete"]:checked').each(function (i, item) {
    //    let id = parseInt($(this).val());
    //    if (!isNaN(id)) {
    //        ids += id + ",";
    //    }
    //});
    //// Remove trailing comma, if any
    //ids = ids.replace(/,$/, "");
    if (isNaN(id) || ids.length > 1) {
        swal("Sorry", "Please Select at only one House");
    }
    else {
        console.log("API Call");
        FadePageCover(true);
        $("#btnGenerateInvoices").addClass("hide");
        $("#btnGetLclPayables").addClass("hide");
        $("#btn-NewDebitNote").addClass("hide");
        jQuery("#WH_CSL_TariffModal").modal("show");


        CallGETFunctionWithParameters("/api/Operations/GetAllPayablesForHouses", { pSelectedID: id },
            function (pResult) {
                FadePageCover(false);
                var result = JSON.parse(pResult);
                $('#WH_CSL_TariffModal .head-title').text('Payables');
                if (result) {
                    FadePageCover(true);
                    //$("#btnGenerateInvoices").removeClass("hide");

                    var customData = [];
                    $.each(result, function (i, item) {
                        customData.push({
                            ID: item.ID,
                            ChargeType: item.ChargeTypeName,
                            CalcType: item.CurrencyCode,
                            Rate: item.CostAmount,
                            CalculatedAmount: item.cost,
                            HouseBillID: item.BillID,
                            OperationID: item.OperationID,
                            CurrencyID: item.CurrencyID,
                            //InvoiceID: item.InvoiceID,
                            //DraftInvoiceID: item.DraftInvoiceID,
                            AccNoteID: item.AccNoteID

                        });
                    });
                    Payables_Details_BindTableRows(customData, true);
                    FadePageCover(false);

                }

            },
            null
        );
    }


}

//******************************************************** */
function CreateDebitNote() {
    debugger;
    var pTblName = "tblWH_CSL_Tariff_Details";
    var pClassOfAmountTd = "Rate";
    var OperationID = "OperationID";
    var CurrencyID = "CurrencyID"
    var decInvoiceAmount = 0;
    //let id = parseInt($('#tblOperations tbody td input[name="Delete"]:checked').val());
    var id = $("#tblOperations tr[ID=Item" + this.value + "] td." + OperationID).text();
    pSelectedReceivablesIDs = GetAllSelectedIDsAsString('tblWH_CSL_Tariff_Details');

    if (pSelectedReceivablesIDs == "") {
        swal("Sorry", " Please select one Receivables before creating Debit Note.");
        //FadePageCover(false);
    }
    else {
        console.log(pSelectedReceivablesIDs)
        if (Invoices_CheckSameCurrency(pTblName, CurrencyID)) {
            swal(strSorry, "The items must be of the same currency.")
        }
        else {
            $("#" + pTblName + " td input[name='Delete']:checked").each(function () {
                var RowSaleAmount = $("#" + pTblName + " tr[ID=Item" + this.value + "] td." + pClassOfAmountTd).text();
                var ID = $("#" + pTblName + " tr[ID=Item" + this.value + "] td." + OperationID).text();
                var Currency = $("#" + pTblName + " tr[ID=Item" + this.value + "] td." + CurrencyID).text();
                var currentDate = new Date();
                var year = currentDate.getFullYear();
                var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 because month is zero-indexed
                var day = ('0' + currentDate.getDate()).slice(-2);

                var formattedDate = year + "/" + month + "/" + day;
                if (!isNaN(RowSaleAmount) && RowSaleAmount.length != 0) {
                    decInvoiceAmount += parseFloat(RowSaleAmount);
                    OperationID = ID
                    console.log(decInvoiceAmount);
                    if (decInvoiceAmount == 0) {
                        FadePageCover(false);
                        swal(strSorry, "The total amount can't be 0.");
                    }
                    else {

                        var data = {
                            "pSelectedItemsIDs": pSelectedReceivablesIDs
                            , "pNoteType": "90"
                            , "pNoteDate": formattedDate

                            , "pOperationID": OperationID
                            , "pOperationPartnerID": 0 //in table OperationPartners
                            , "pInvoiceID": 0
                            , "pAddressID": 0
                            , "pPrintedAddress": "0"

                            , "pCurrencyID": Currency
                            , "pExchangeRate": 1

                            , "pAmountWithoutVAT": decInvoiceAmount
                            , "pTaxTypeID": 0
                            , "pTaxPercentage": "0"
                            , "pTaxAmount": 0
                            , "pDiscountTypeID": 0
                            , "pDiscountPercentage": "0"
                            , "pDiscountAmount": "0"

                            , "pAmount": decInvoiceAmount
                            , "pNoteStatusID": 1
                            , "pRemarks": ""
                        }
                        InsertUpdateFunction("form", "/api/AccNote/Insert", data, false, "AccNoteModal"
                            , function (data) {
                                jQuery("#WH_CSL_TariffModal").modal("hide");
                                if (data) {
                                    swal("Saved", "Debit Note Created Successfully")
                                }
                                else
                                    swal("Sorry", "Connection Failure, please refresh then try again.");
                            });
                    }
                }
            });
        }

    }
}
function CreateCreditNote() {
    debugger;
    var pTblName = "tblWH_CSL_Tariff_Details";
    var pClassOfAmountTd = "Rate";
    var OperationID = "OperationID";
    var CurrencyID = "CurrencyID"
    var decInvoiceAmount = 0;
    //let id = parseInt($('#tblOperations tbody td input[name="Delete"]:checked').val());
    var id = $("#tblOperations tr[ID=Item" + this.value + "] td." + OperationID).text();
    pSelectedReceivablesIDs = GetAllSelectedIDsAsString('tblWH_CSL_Tariff_Details');

    if (pSelectedReceivablesIDs == "") {
        swal("Sorry", " Please select one Payable before creating Credit Note.");
        //FadePageCover(false);
    }
    else {
        //console.log(pSelectedReceivablesIDs)
        //if (Invoices_CheckSameCurrency(pTblName, CurrencyID)) {
        //    swal(strSorry, "The items must be of the same currency.")
        //}
        //else {
        $("#" + pTblName + " td input[name='Delete']:checked").each(function () {
            var RowSaleAmount = $("#" + pTblName + " tr[ID=Item" + this.value + "] td." + pClassOfAmountTd).text();
            var ID = $("#" + pTblName + " tr[ID=Item" + this.value + "] td." + OperationID).text();
            var Currency = $("#" + pTblName + " tr[ID=Item" + this.value + "] td." + CurrencyID).text();
            var currentDate = new Date();
            var year = currentDate.getFullYear();
            var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 because month is zero-indexed
            var day = ('0' + currentDate.getDate()).slice(-2);

            var formattedDate = year + "/" + month + "/" + day;
            if (!isNaN(RowSaleAmount) && RowSaleAmount.length != 0) {
                decInvoiceAmount += parseFloat(RowSaleAmount);
                OperationID = ID
                console.log(decInvoiceAmount);
                if (decInvoiceAmount == 0) {
                    FadePageCover(false);
                    swal(strSorry, "The total amount can't be 0.");
                }
                else {

                    var data = {
                        "pSelectedItemsIDs": pSelectedReceivablesIDs
                        , "pNoteType": "100"
                        , "pNoteDate": formattedDate

                        , "pOperationID": OperationID
                        , "pOperationPartnerID": 0 //in table OperationPartners
                        , "pInvoiceID": 0
                        , "pAddressID": 0
                        , "pPrintedAddress": "0"

                        , "pCurrencyID": Currency
                        , "pExchangeRate": 1

                        , "pAmountWithoutVAT": decInvoiceAmount
                        , "pTaxTypeID": 0
                        , "pTaxPercentage": "0"
                        , "pTaxAmount": 0
                        , "pDiscountTypeID": 0
                        , "pDiscountPercentage": "0"
                        , "pDiscountAmount": "0"

                        , "pAmount": decInvoiceAmount
                        , "pNoteStatusID": 1
                        , "pRemarks": ""
                    }
                    InsertUpdateFunction("form", "/api/AccNote/Insert", data, false, "AccNoteModal"
                        , function (data) {
                            jQuery("#WH_CSL_TariffModal").modal("hide");
                            if (data) {
                                swal("Saved", "Credit Note Created Successfully")
                            }
                            else
                                swal("Sorry", "Connection Failure, please refresh then try again.");
                        });
                }
            }
        });
    }

}
//}
function Invoices_CheckSameCurrency(pTblName, pClassOfCurrencyTd) {
    debugger;
    var isSameCurrency = true;
    //get the currencyID of the first item checked and then compare it to currencies of other items
    var firstCurrencyIDChecked = $('#' + pTblName).find('input[name="Delete"]:checked:first').parent().parent().find("td." + pClassOfCurrencyTd).attr('val');
    $('#' + pTblName + ' td').find('input[name="Delete"]:checked').each(function () {
        if (firstCurrencyIDChecked != $("#" + pTblName + " tr[id=" + $(this).attr('value') + "]").find("td." + pClassOfCurrencyTd).attr('val'))
            isSameCurrency = false;
    });
    return isSameCurrency;
}
function Invoices_CheckSameCurrencyForCustomizedIDs(pTblName, pCustomizedID, pClassOfCurrencyTd) {
    debugger;
    var isSameCurrency = true;
    //get the currencyID of the first item checked and then compare it to currencies of other items
    var firstCurrencyIDChecked = $('#' + pTblName).find('input[name="Delete"]:checked:first').parent().parent().find("td." + pClassOfCurrencyTd).attr('val');
    $('#' + pTblName + ' td').find('input[name="Delete"]:checked').each(function () {
        if (firstCurrencyIDChecked != $("#" + pTblName + " tr[id=" + pCustomizedID + $(this).attr('value') + "]").find("td." + pClassOfCurrencyTd).attr('val'))
            isSameCurrency = false;
    });
    return isSameCurrency;
}

//********************************************************* */
function SelectLCLInvoiceItems(pIsSupplementaryInv) {
    debugger;
    //FadePageCover(true);
    _SelectedMasterIDs = '';

    IsSupplementaryInvoice = pIsSupplementaryInv;
    $("#btn-MultiEditPayablesLCL").addClass("hide");
    $("#btn-MultiEditReceivablesLCL").addClass("hide");

    $("#WH_CSL_TariffModal #btn-NewCreditNote").addClass("hide");
    $("#WH_CSL_TariffModal #btn-AddPayables").addClass("hide");
    $("#WH_CSL_TariffModal #btn-AddReceivablesLclNote").addClass("hide");
    $("#WH_CSL_TariffModal #btnGenerateAndUpdateInvoices").removeClass("hide");

    if ($("#slInvoiceTypesOutsideModal").val() == 0 || $("#slInvoiceTypesOutsideModal").val() == null) {
        swal("Sorry", "Please select invoice type");
        //FadePageCover(false);
    }
    else {
        pSelectedHouseIDs = GetAllSelectedIDsAsString('tblOperations');
        if (pSelectedHouseIDs == "") {
            swal("Sorry", " Please select one house B/L before creating invoices.");
            //FadePageCover(false);
        }
        else {
            if (CheckHousesBranch() == false) {
                swal("Sorry", " Selected house B/Ls are not of the same branch.");
                //FadePageCover(false);
            }
            else {
                if (pIsSupplementaryInv && (pSelectedHouseIDs.indexOf(',') > 0)) {
                    swal("Sorry", " Only one house B/L can be selected for supplementary invoice.");
                    //FadePageCover(false);
                }
                else {
                    $('#WH_CSL_TariffModal .head-title').text($('#WH_CSL_TariffModal .head-title').attr('head-title'));
                    $("#btnGenerateAndUpdateInvoices,#btnGenerateInvoices").addClass("hide");
                    FadePageCover(true);
                    jQuery("#WH_CSL_TariffModal").modal("show");
                    $("#btn-NewDebitNote").addClass("hide");

                    CallGETFunctionWithParameters("/api/WH_CSL_Tariffs/LoadWithWhereClause", { pWhereClause: 'where InvoiceTypeID=' + $("#slInvoiceTypesOutsideModal").val() + ' and InvoicingFromReceivable=1' },
                        function (pResult) {
                            FadePageCover(false);
                            var result = JSON.parse(pResult.Tarrif);
                            if (result) {
                                $('#WH_CSL_TariffModal .head-title').text('Receivables');
                                currentTariffID = result.ID;
                                FadePageCover(true);
                                var pWhereClause = 'where IsNull(DraftInvoiceID,0)=0 and HouseBillID in (' + pSelectedHouseIDs + ')';
                                if (pDefaults.UnEditableCompanyName == "MES" && result.ChargeTypeGroupID > 0)
                                    pWhereClause += ' and CategoryID=' + result.ChargeTypeGroupID + '';
                                CallGETFunctionWithParameters("/api/Receivables/GetReceivablesOnly", { pWhereClause: pWhereClause },
                                    function (pData) {
                                        FadePageCover(false);
                                        var data = JSON.parse(pData);
                                        if (data) {
                                            $("#btnGenerateInvoices").removeClass("hide");
                                            var customData = [];
                                            $.each(data, function (i, item) {
                                                customData.push({
                                                    ID: item.ID,
                                                    ChargeType: item.ChargeTypeName,
                                                    CalcType: 'Fixed',
                                                    Rate: item.SalePrice,
                                                    CalculatedAmount: item.SaleAmount,
                                                    HouseBillID: item.HouseBillID,
                                                    CurrencyID: item.CurrencyID,
                                                    CurrencyCode: item.CurrencyCode
                                                });
                                            });
                                            WH_CSL_Tariff_Details_BindTableRows(customData, true);
                                        }
                                    },
                                    null
                                );
                            }
                            else {
                                FadePageCover(true);
                                var pControllerParameters = {
                                    pHouseBillIDs: pSelectedHouseIDs
                                    , pInvoiceTypeID: $("#slInvoiceTypesOutsideModal").val()
                                    , pIsSupplementary: pIsSupplementaryInv
                                };

                                CallGETFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_GetInvoiceTypeTariffDetails", pControllerParameters,
                                    function (pData) {
                                        FadePageCover(false);

                                        WH_CSL_Tariff_Details_BindTableRows(JSON.parse(pData[0]), pData[2])

                                        if (pData[3]) // CanAdd
                                        {
                                            $("#btnGenerateInvoices").removeClass("hide");
                                        }
                                        else {
                                            $("#btnGenerateInvoices").addClass("hide");
                                        }

                                        if (pData[4]) // CanEdit
                                        {
                                            $("#btnGenerateAndUpdateInvoices").removeClass("hide");
                                        }
                                        else {
                                            $("#btnGenerateAndUpdateInvoices").addClass("hide");
                                        }
                                    },
                                    null
                                );


                            }
                        },
                        null
                    );

                    var masterIDsArr = [];
                    $('#tblOperations tbody tr').each(function () {
                        if ($(this).find('input[name=Delete]').is(':checked'))
                            if ($(this).find('td.MasterOperationID').attr('val') > 0)
                                masterIDsArr.push($(this).find('td.MasterOperationID').attr('val'));
                    });
                    masterIDsArr = Array.from(new Set(masterIDsArr));
                    _SelectedMasterIDs = masterIDsArr.toString();
                }
            }
        }
    }
}
function updateCheckedRateSum() {
    let total = 0;
    $('input[name="Delete"]:checked').each(function () {
        const rate = parseFloat($(this).closest('tr').find('.Rate').text());
        if (!isNaN(rate)) {
            total += rate;
        }
    });
    $('#rateTotal').text('Total Rate: ' + total.toFixed(2));
}
function CheckHousesBranch() {
    debugger;
    var _result = true;
    var SelectedBranchsID = "";

    $.each($("#tblOperations tbody tr"), function (Index, CurrentValue) {
        if ($(CurrentValue).find("input:checked").length == 1) {

            if ($(CurrentValue).find(".BranchID").text().trim() != "") {
                if (SelectedBranchsID == "") {
                    SelectedBranchsID = $(CurrentValue).find(".BranchID").text().trim();
                }
                else {
                    if (SelectedBranchsID != $(CurrentValue).find(".BranchID").text().trim()) {
                        _result = false;
                    }
                    else {

                    }
                }
            }

        }
    });

    return _result
}

function GenerateLCLInvoices(pGenerateAndUpdate) {
    debugger;
    FadePageCover(true);

    if ($("#slInvoiceTypesOutsideModal").val() == 0 || $("#slInvoiceTypesOutsideModal").val() == null) {
        swal("Sorry", "Please select invoice type");
        FadePageCover(false);
    }
    else {
        pSelectedHouseIDs = GetAllSelectedIDsAsString('tblOperations');
        if (pSelectedHouseIDs == "") {
            swal("Sorry", " Please select one house B/L at least before creating invoices.");
            FadePageCover(false);
        }
        else {
            pSelectedItemIDs = GetAllSelectedIDsAsString('tblWH_CSL_Tariff_Details');
            if (pSelectedItemIDs == "") {
                swal("Sorry", " Please select one item at least before generating invoices.");
                FadePageCover(false);
            }
            else if (!Invoices_CheckSameCurrencyForCustomizedIDs("tblWH_CSL_Tariff_Details", "Item", "CurrencyID")) {
                swal("Sorry", " Items must have the same currency");
                FadePageCover(false);
            } else {
                if ($('#WH_CSL_TariffModal .head-title').text() == 'Receivables') {



                    var pHouses = {
                        CurrencyID: $('#tblWH_CSL_Tariff_Details').find('input[name="Delete"]:checked:first').parent().parent().find("td.CurrencyID").attr('val'),
                        UnEditableCompanyName: pDefaults.UnEditableCompanyName,
                        IsTaxOnItems: pDefaults.IsTaxOnItems,
                        Receivables: []
                        , pTariffDetailIDs: currentTariffID

                    };
                    $('#tblWH_CSL_Tariff_Details tbody tr').each(function () {
                        if ($(this).find('td.ItemID input[name=Delete]').is(':checked')) {
                            pHouses.Receivables.push({
                                ID: $(this).find('td.ItemID input[name=Delete]').attr('id'),
                                HouseBillID: $(this).find('td.HouseBillID').text(),
                                Price: $(this).find('td.CalculatedAmount').text(),
                            });
                        }
                    });
                    FadePageCover(true);
                    CallPOSTFunctionWithParameters("/api/Invoices/CreateInvoicesFromHousesReceivables", pHouses
                        , function (pData) {
                            var _ReturnedMessage = pData;
                            if (_ReturnedMessage == "")
                                swal("Success", "Saved successfully.");
                            else
                                swal("Sorry", _ReturnedMessage);
                            FadePageCover(false);
                        }
                        , null);
                }
                else {
                    jQuery("#WH_CSL_TariffModal").modal("show");
                    var tariffArr = [];
                    var payableArr = [];
                    $('#tblWH_CSL_Tariff_Details tbody tr').each(function () {
                        if ($(this).find('td.ItemID input').is(':checked')) {

                            if ($(this).find('td.IsPayable').text() == 'true') {
                                payableArr.push($(this).find('td.ItemID input').attr('id'));
                            }
                            else {
                                tariffArr.push($(this).find('td.ItemID input').attr('id'));
                            }
                        }
                    });
                    pSelectedItemIDs = tariffArr.toString();
                    pSelectedPayableIDs = payableArr.toString();
                    var pControllerParameters = {
                        pHouseBillIDs: pSelectedHouseIDs
                        , pInvoiceTypeID: $("#slInvoiceTypesOutsideModal").val()
                        , pCreateInvoice: true
                        , pTariffDetailIDs: pSelectedItemIDs
                        , pCalculateInvoiceOnly: false
                        , pSelectedPayableIDs: IsNull(pSelectedPayableIDs, '')
                        , pIsTaxOnItems: pDefaults.IsTaxOnItems
                    };

                    if (IsMESCOCompany && $("#slInvoiceTypesOutsideModal").val() == '14') {
                        let CanCreateInvoice = true;
                        let whereClause = ` WHERE id IN (${pSelectedHouseIDs})`;
                        CallGETFunctionWithParameters("api/Operations/LoadAll", { pWhereClause: whereClause }, function (pData) {
                            debugger;
                            let Operation = JSON.parse(pData[0]);
                            if (Operation.length > 0) {
                                if (Operation[0].POrC == 1 && !(Operation[0].QuotationRouteID > 0))
                                    CanCreateInvoice = false;
                            }
                        }, null, false);

                        if (!CanCreateInvoice) {
                            swal("Sorry", "Can't Create invoice For A Collect House Without Quotation");
                            FadePageCover(false);
                            return;
                        }
                    }


                    if (!IsSupplementaryInvoice && (pDefaults.UnEditableCompanyName == "UNF" || IsMESCOCompany)) {
                        let invoiceExist = true;
                        let invoicetypeID = $("#slInvoiceTypesOutsideModal").val();
                        let branchID = $("#hUserBranchID").val();
                        let whereClause = ` WHERE OperationID IN (${pSelectedHouseIDs}) AND IsDeleted=0 AND TariffID IN (select ID from WH_CSL_Tariff where InvoiceTypeID=${invoicetypeID})`;
                        CallGETFunctionWithParameters("api/Invoices/LoadAll", { pWhereClause: whereClause }, function (pData) {
                            debugger;
                            let invoices = JSON.parse(pData[0]);
                            if (invoices.length == 0) {
                                invoiceExist = false;
                            }
                        }, null, false);

                        if (invoiceExist) {
                            swal("Sorry", "Can't Insert same invoice type twice");
                            FadePageCover(false);
                            return;
                        }
                    }

                    CallGETFunctionWithParameters("/api/Invoices/CheckTariffDetailsAccountLink", {
                        pHouseBillIDs: pSelectedHouseIDs,
                        pTariffDetailIDs: pSelectedItemIDs
                    },
                        function (pReturnedMessage) {
                            if (pReturnedMessage == "") {
                                CallGETFunctionWithParameters("/api/WH_CFS_Invoices/GenerateReceivablesAndInvoicesForConsol", pControllerParameters,
                                    function (pData) {
                                        if (pData[0]) {

                                            if (pGenerateAndUpdate == true) {
                                                pGeneratedDraftIDs = pData[1];
                                                if (pGeneratedDraftIDs != "") {
                                                    jQuery("#WH_CSL_UpdateItemsModal").modal("show");

                                                    WH_CSL_UpdateReceivables_LoadWithPagingWithWhereClause();

                                                    updateGeneratedInvoiceTotalLCL();
                                                }
                                                else {
                                                    swal("Data Error", "No Draft Generated!");
                                                }
                                            }
                                            else {
                                                swal("Success", "Generated Successfully.");
                                                jQuery("#WH_CSL_TariffModal").modal("hide");
                                            }

                                        }
                                        else {
                                            if (IsMESCOCompany && pData[1] == "VAT") {
                                                swal("Sorry", "Customer has no vat number.");
                                            } else {
                                                swal("Sorry", "Connection failed, please try again.");
                                            }
                                        }
                                    },
                                    function () {
                                        FadePageCover(false);
                                        if (pGenerateAndUpdate == false) {
                                            Operations_LoadingWithPaging();
                                        }
                                    }
                                );
                            }
                            else {
                                swal("Sorry", pReturnedMessage);
                            }
                        },
                        function () {
                            FadePageCover(false);
                        }
                    );
                }
            }
        }
    }
}


//#region R E C E I V A B L E S   F U N C T I O N S

function WH_CSL_UpdateReceivables_LoadWithPagingWithWhereClause() {
    debugger;
    var FirstDarftID = "";
    if (pGeneratedDraftIDs.indexOf(',') > 0) {
        FirstDarftID = pGeneratedDraftIDs.substring(0, pGeneratedDraftIDs.indexOf(','));
    }
    else {
        FirstDarftID = pGeneratedDraftIDs;
    }

    var pWhereClause = " WHERE DraftInvoiceID in ( " + FirstDarftID + " ) ";

    $("#cb-CheckAll-Receivables").attr("Checked", true);
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/WH_CFS_Invoices/Receivables_LoadWithWhereClause", pWhereClause, 0, 1000, function (pTabelRows) {
        ReceivablesLcl_BindTableRows(pTabelRows);

    });
}

function ReceivablesLcl_BindTableRows(pReceivables) {
    ClearAllTableRows("tblReceivablesLcl");

    debugger;
    //var editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>";
    $.each(pReceivables, function (i, item) {
        AppendRowtoTable("tblReceivablesLcl",
            ("<tr ID='" + item.ID + "'  ondblclick='ReceivablesLcl_EditByDblClick(" + item.ID + ");'>"
                //+ "<td class='ReceivableID'> <input " + ((item.InvoiceID == 0 && item.DraftInvoiceID == 0 && item.AccNoteID == 0 && CanDeleteReceivebles == true) ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' checked value='" + item.ID + "' /></td>"
                + "<td class='ReceivableID'> <input name='Delete'  type='checkbox' value='" + item.ID + "' /></td>"
                //+ "<td class='Receivable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
                + "<td class='Receivable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeName + "</td>"
                + "<td class='ReceivablePOrC hide' val='" + item.POrC + "'>" + (item.POrC == 0 ? "" : item.POrCCode) + "</td>"
                //+ "<td class='ReceivableSupplier hide' val='" + item.SupplierID + "'>" + (item.SupplierID == 0 ? "" : item.SupplierName) + "</td>"
                //+ ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? ("<td class='ReceivableUOM' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeCode == 0 ? "" : item.ContainerTypeCode) + "</td>") : "")
                //+ ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='ReceivableUOM' val='" + item.PackageTypeID + "'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>") : "")
                + "<td class='ReceivableUOM hide' val='" + item.MeasurementID + "'>" + (item.MeasurementID == 0 ? "" : item.MeasurementCode) + "</td>"
                + "<td class='ReceivableQuantity'>" + item.Quantity + "</td>"
                + "<td class='ReceivableCostPrice hide'>" + (item.CostPrice).toFixed(4) + "</td>"
                + "<td class='ReceivableCostAmount hide'>" + (item.CostAmount).toFixed(4) + "</td>"
                + "<td class='ReceivableSalePrice'>" + (item.SalePrice).toFixed(4) + "</td>"

                + "<td class='ReceivableAmountWithoutVAT hide'>" + item.AmountWithoutVAT.toFixed(4) + "</td>"
                + "<td class='ReceivableTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                + "<td class='ReceivableTaxPercentage hide'>" + item.TaxPercentage.toFixed(4) + "</td>"
                + "<td class='ReceivableTaxAmount hide'>" + item.TaxAmount.toFixed(4) + "</td>"

                + "<td class='ReceivableSaleAmount'>" + (item.SaleAmount).toFixed(4) + "</td>"
                + "<td class='ReceivableExchangeRate'>" + item.ExchangeRate.toFixed(4) + "</td>"
                + "<td class='ReceivableCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                + "<td class='ReceivableInvoice hide' val='" + item.InvoiceID + "'>" + (item.InvoiceID == 0 ? "" : (item.InvoiceNumber + " / " + item.InvoiceTypeName)) + "</td>"
                + "<td class='ReceivableAccNote hide' val='" + item.AccNoteID + "'>" + (item.AccNoteID == 0 ? "" : item.AccNoteCode) + "</td>"
                + "<td class='ReceivableShownInvoiceOrAccNote'>" + (item.AccNoteID == 0
                    ? (item.InvoiceID == 0 && item.DraftInvoiceID == 0 ? "" : (item.InvoiceNumber + " / " + item.InvoiceTypeName))
                    : item.AccNoteCode)
                + "</td>"
                + "<td class='ReceivableOperation hide' val='" + item.OperationID + "'>" + (item.OperationID == 0 ? "" : item.OperationCode) + "</td>"
                + "<td class='ReceivableNotes hide'>" + (item.Notes == "0" ? "" : item.Notes) + "</td>"

                + "<td class='ReceivableIssueDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.IssueDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)) : "") + "</td>"
                + "<td class='ReceivableOperationContainersAndPackagesID hide'>" + item.OperationContainersAndPackagesID + "</td>"
                + "<td class='ReceivableTrailerID hide'>" + item.TrailerID + "</td>"

                + "<td class='ReceivableCreatorName hide'>" + item.CreatorName + "</td>"
                //+ "<td class='ReceivableCreationDate hide'>" + item.CreationDate + "</td>"
                + "<td class='ReceivableCreationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                + " <i class='fa fa-calendar'></i>"
                + " <small>" + GetShownDate(getTodaysDateInddMMyyyyFormat(), GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                + "</span>"
                + "</td>"
                + "<td class='ReceivableModificatorName hide'>" + item.ModificatorName + "</td>"
                //+ "<td class='ReceivableModificationDate hide'>" + item.ModificationDate + "</td>"
                + "<td class='ReceivableModificationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                + " <i class='fa fa-calendar'></i>"
                + " <small>" + GetShownDate(getTodaysDateInddMMyyyyFormat(), GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                + "</span>"
                + "</td>"
                + "<td class='ReceivableBillTo hide' val='" + item.BillTo + "'>" + (item.BillTo == 0 ? "" : item.BillToName) + "</td>"
                + "<td class='ReceivableIDToExcludePurchase hide'> <input name='nameExcludePurchase'  type='checkbox' value='" + item.ID + "' /></td>"

                + "</tr>"));
    });
    //ApplyPermissions();

    BindAllCheckboxonTable("tblReceivablesLcl", "ReceivableID", "cb-CheckAll-Receivables");
    CheckAllCheckbox("HeaderDeleteReceivableID");
    //HighlightText("#tblReceivablesLcl>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}

function ReceivablesLcl_EditByDblClick(pID) {
    debugger;
    jQuery("#EditReceivableLclModal").modal("show");

    ClearAll("#EditReceivableLclModal");

    $("#hReceivableID").val(pID);
    FadePageCover(true);
    var tr = $("#tblReceivablesLcl tr[ID='" + pID + "']");

    var pCurrencyID = $(tr).find("td.ReceivableCurrency").attr('val');
    var pTaxTypeID = $(tr).find("td.ReceivableTaxTypeID").attr('val');

    $("#hReceivableChargeTypeID").val($(tr).find("td.Receivable").attr('val'));
    $("#hReceivableMeasurementID").val($(tr).find("td.ReceivableUOM").attr('val'));

    if ($("#hDefaultCurrencyID").val() == pCurrencyID)
        $("#txtReceivableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtReceivableExchangeRate").removeAttr("disabled");


    $("#lblReceivableShown").html(": " + $(tr).find("td.Receivable").text());
    $("#lblReceivableCreatedBy").html(" : " + $(tr).find("td.ReceivableCreatorName").text())
    $("#lblReceivableCreationDate").html(" : " + $(tr).find("td.ReceivableCreationDate").text())
    $("#lblReceivableUpdatedBy").html(": " + $(tr).find("td.ReceivableModificatorName").text())
    $("#lblReceivableModificationDate").html(" : " + $(tr).find("td.ReceivableModificationDate").text())

    $("#txtReceivableQuantity").val($(tr).find("td.ReceivableQuantity").text());

    $("#txtReceivableUnitPrice").val(parseInt($(tr).find("td.ReceivableSalePrice").text()) == 0 ? "" : $(tr).find("td.ReceivableSalePrice").text());

    $("#txtReceivableAmountWithoutVAT").val(parseInt($(tr).find("td.ReceivableAmountWithoutVAT").text()) == 0 ? "" : $(tr).find("td.ReceivableAmountWithoutVAT").text());
    $("#txtReceivableTaxPercentage").val($(tr).find("td.ReceivableTaxPercentage").text());
    $("#txtReceivableTaxAmount").val($(tr).find("td.ReceivableTaxAmount").text());

    $("#txtReceivableAmount").val(parseInt($(tr).find("td.ReceivableSaleAmount").text()) == 0 ? "" : $(tr).find("td.ReceivableSaleAmount").text());
    $("#txtReceivableExchangeRate").val($(tr).find("td.ReceivableExchangeRate").text());
    $("#txtReceivableNotes").val($(tr).find("td.ReceivableNotes").text());
    $("#txtReceivableIssueDate").val($(tr).find("td.ReceivableIssueDate").text());
    $("#txtReceivableBillTo").val($(tr).find("td.ReceivableBillTo").text());

    $("#btnSaveReceivable").attr("onclick", "ReceivablesLcl_Update(false);");

    FadePageCover(false);
}

function CalculateReceivablesLclAmount() {
    debugger;
    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0; var decTaxPercentage = 0.0;
    var decDiscountAmount = 0; var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = $("#txtReceivableQuantity").val() * $("#txtReceivableUnitPrice").val();
    $("#txtReceivableAmountWithoutVAT").val(decAmountWithoutVAT);
    //decTaxPercentage = $("#slReceivableTax option:selected").attr("CurrentPercentage");
    decTaxAmount = parseFloat($("#tblReceivablesLcl tbody tr[id=" + $("#hReceivableID").val() + "]").find(".ReceivableTaxAmount").text()).toFixed(2);

    //$("#txtReceivableTaxPercentage").val(decTaxPercentage);
    //$("#txtReceivableTaxAmount").val(decTaxAmount.toFixed(2));

    $("#txtReceivableAmount").val((decAmountWithoutVAT + parseFloat(decTaxAmount)).toFixed(2));  //$("#txtReceivableAmount").val((decAmountWithoutVAT + decTaxAmount - decDiscountAmount).toFixed(2));
}

function ReceivablesLcl_Update(pSaveandAddNew) {
    debugger;
    if (!isValidDate($("#txtReceivableIssueDate").val().trim(), 1) && $("#txtReceivableIssueDate").val().trim() != "")
        swal(strSorry, strCheckDates);
    //else if ($("#txtReceivableExchangeRate").val() == "" || parseFloat($("#txtReceivableExchangeRate").val()) == 0
    //    || (parseFloat($("#txtReceivableExchangeRate").val()) == 1 && pDefaults.CurrencyID != ($("#slReceivableCurrency").val())))
    //    swal("Sorry", "Please, check exchange rate.");
    else {
        InsertUpdateFunction("form", "/api/WH_CFS_Invoices/Receivables_UpdateMultipleItems", {
            pGeneratedDraftIDs
            , pChargeTypeID: $("#hReceivableChargeTypeID").val()
            , pQuantity: ($("#txtReceivableQuantity").val().trim() == "" ? 0 : $("#txtReceivableQuantity").val().trim())
            , pSalePrice: ($("#txtReceivableUnitPrice").val().trim() == "" ? 0 : $("#txtReceivableUnitPrice").val().trim())
            , pNotes: $("#txtReceivableNotes").val().toUpperCase().trim()

        }
            , pSaveandAddNew, "EditReceivableLclModal"
            , function () {
                WH_CSL_UpdateReceivables_LoadWithPagingWithWhereClause();
                updateGeneratedInvoiceTotalLCL();
            });
    }
    //}
    //else
    //    swal(strSorry, strCheckEntries, "warning");
}


function DeleteGeneratedReceivables() {//nour28102023
    debugger;
    //Confirmation message to delete
    var SelectedChargeTypeIDs = GetAllSelectedChargeTypeIDsAsString('tblReceivablesLcl');
    var NotSelectedCharges = GetAllNOTSelectedLCLInvoiceItems();
    if (NotSelectedCharges == "") {
        swal("Sorry", "Can't delete all Invoice Items!");
        return;
    }

    if (SelectedChargeTypeIDs != "")
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
                var pParametersWithValues = {
                    pChargeTypeIDs: SelectedChargeTypeIDs,
                    pGeneratedDraftIDs
                };

                FadePageCover(true);
                CallPOSTFunctionWithParameters("/api/WH_CFS_Invoices/Receivables_DeleteMultipleItems", pParametersWithValues, function (pData) {

                    if (pData) {
                        swal("Success", "Deleted Successfully.");
                        updateGeneratedInvoiceTotalLCL();
                    }
                    else
                        swal("Sorry", " Delete Error");


                    WH_CSL_UpdateReceivables_LoadWithPagingWithWhereClause();

                    FadePageCover(false);
                }, null
                );
            });
}

function GetAllSelectedChargeTypeIDsAsString(pTableName) {
    debugger;
    var listOfIDs = "";

    $.each($("#" + pTableName + " tbody tr"), function (Index, CurrentValue) {
        if ($(CurrentValue).find(".ReceivableID  input[type=checkbox]").prop('checked') == true) {

            listOfIDs += ((listOfIDs == "") ? "" : ",") + ($(CurrentValue).find(".Receivable").attr('val'));
        }
    });

    return listOfIDs;
}



//#endregion

//#endregion

function IsAllTrackingTasksDone() {
    var done = true;
    $('#tblTracking tbody tr').each(function () {
        if (!$(this).find('td.TrackingDone input[type=checkbox]').is(':checked')) {
            done = false;
            return false;
        }
    });
    return done;
}

function NafezaIntegrationModal_FillControls() {
    debugger;
    jQuery("#NafezaIntegrationModal").modal("show");
}

function NafezaValidateACID() {
    debugger;
    let ValidateACIDDTO = {
        pShipmentID: $("#hShipmentID").val(),
        pACIDNumber: $("#txtNafezaACIDNumber").val(),
        pConsigneeVATNumber: $("#txtNafezaConsigneeVATNumber").val(),
        pShipperVATNumber: $("#txtNafezaShipperVATNumber").val(),
        pRegistrationType: $("#slNafezaRegistrationType").val(),
        pPickupCountry: $("#slNafezaPickupCountry").val(),
    }
    PostInsertUpdateFunction("form", "/api/Operations/NafezaValidateACID", ValidateACIDDTO, false, "NafezaIntegrationModal",
        function (pData) {
        });
}

function NafezaUseConsignee2Changed() {
    CallGETFunctionWithParameters("/api/Operations/NafezaChangeConsignee", { pShipmentID: $("#hShipmentID").val() },
        function (pData) {
            debugger;
            let ConsigneeVATNumber = JSON.parse(pData[0])[0].ConsigneeVATNumber;
            let Consignee2VATNumber = JSON.parse(pData[0])[0].Consignee2VATNumber;
            if ($("#cbUseConsignee2").prop("checked"))
                $("#txtNafezaConsigneeVATNumber").val(Consignee2VATNumber);
            else
                $("#txtNafezaConsigneeVATNumber").val(ConsigneeVATNumber);
        })
}

function PrintSelectedInvoiceForBLDocument() {
    debugger;

    let InvoiceID = $("#slInvoiceForBLDocuments").val();
    if (InvoiceID != "") {
        if (pDefaults.UnEditableCompanyName == "MES") {

            Invoice_MescoPrint(InvoiceID);



        }
        else
            Invoices_Print(InvoiceID, 3, "Print", "Copy");
    }
    else
        swal("Error", "Please Select an invoice to print");
}

function PrintDeliveryOrderForBLDocument() {
    debugger;
    if ($("#txtDORepresentative").val() == "")
        swal("Sorry", "Please enter the delivery order representative name")
    else {
        let houseDeliveryOrderPrintData = {
            pShipmentID: $("#hShipmentID").val(),
            pRepresentativeName: $("#txtDORepresentative").val(),
            pDeliveryCustomer: $("#txtDeliveryCustomer").val()
        }

        CallPOSTFunctionWithParameters("/api/Operations/SetHouseDeliveryOrderPrintData", houseDeliveryOrderPrintData,
            function (pData) {
                debugger;
                let ExceptionMessage = pData[0];
                let Status = pData[1];
                if (Status) {
                    DocsOut_Print(120, 0, $("#hShipmentID").val(), null, "Print"); //Print Delivery Order For this House
                } else {
                    swal("Error", ExceptionMessage);
                }
            });
    }
}
function GetUnLinkedHAWB() {
    debugger;
    $("#btnCheckboxesListApply").attr("onclick", "LinkHAWB();");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-link'></span> Link");
    $("#btn-SearchItems").attr("onclick", "UnLinkedHAWB_GetAvailableItems();");
    UnLinkedHAWB_GetAvailableItems();
    jQuery("#CheckboxesListModal").modal("show")
}

function LinkHAWB() {
    debugger;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    var pParametersWithValues = {
        pHAWBIDs: pSelectedItemsIDs,
        pOperationID: pOperationHeader_Global.ID
    }
    CallGETFunctionWithParameters("/api/Operations/LinkHAWB", pParametersWithValues
        , function (pData) {
            if (pData[0]) {
                jQuery("#CheckboxesListModal").modal("hide");
                swal("Success", "Linked Successfully.");
            }
            else
                swal("Sorry", "Connection failed, please try again.");
            FadePageCover(false);
        }
        , null);
}

function UnLinkedHAWB_GetAvailableItems() {
    debugger;
    $("#lblShownItems").html("HAWB");
    $("#divCheckboxesList").html("");
    var pStrFnName = "/api/Operations/LoadUnlinkedHAWB";
    var pDivName = "divCheckboxesList";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pWhereClause = "";
    pWhereClause += " WHERE MasterBL = '" + pOperationHeader_Global.MasterBL + "' AND BLType = 3 AND TransportType = 2 AND POL = " + pOperationHeader_Global.POL + " AND POD = " + pOperationHeader_Global.POD;
    pWhereClause += " AND Code Like '%" + $("#txtSearchItems").val().trim().toUpperCase() + "%'"
    pWhereClause += " ORDER BY OpenDate DESC";
    FadePageCover(true);
    GetListAsCheckboxesWithVariousParameters(pStrFnName, { pWhereClause: pWhereClause }, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#" + pDivName, $("#txtSearchItems").val().trim());
            $("span[MasterOperationID=" + pOperationHeader_Global.ID + "]").prev().attr("checked", true);
            FadePageCover(false);
        }
        , 6, 3);
}

function BoslaChange(elm) {

    $('#divRoadNumberTruckingOrder').addClass('hide');
    $('#txtRoadNumberTruckingOrder').val('');

    var isChecked = $(elm).is(':checked');
    var elmId = $(elm).attr('id');
    if (elmId == 'cbPrintAsBosla' || elmId == 'cbPrintAsBosla_general') {
        if (isChecked) {
            $('#cbPrintAsBosla,#cbPrintAsBosla_general').prop('checked', true);
            $('#cbPrintAsCertificate,#cbPrintAsCertificate_general').prop('checked', false);
            if (pDefaults.UnEditableCompanyName == "ELI")
                $('#divRoadNumberTruckingOrder').removeClass('hide');
        }
        else {
            $('#cbPrintAsBosla,#cbPrintAsBosla_general').prop('checked', false);
        }
    }
    else if (elmId == 'cbPrintAsCertificate' || elmId == 'cbPrintAsCertificate_general') {
        if (isChecked) {
            $('#cbPrintAsCertificate,#cbPrintAsCertificate_general').prop('checked', true);
            $('#cbPrintAsBosla,#cbPrintAsBosla_general').prop('checked', false);
        }
        else {
            $('#cbPrintAsCertificate,#cbPrintAsCertificate_general').prop('checked', false);
        }
    }
}

function GetLclPayables() {
    FadePageCover(true);
    var masterOperationIDs = GetAllSelectedIDsFromTd('tblOperations', 'Delete', 'MasterOperationID');
    var pWhereClause = 'where IsNull(ReceivableIDFromReceivable,0)=0 and ( BillID in (' + pSelectedHouseIDs + ') or ( OperationID in (' + masterOperationIDs + ') and IsNull(BillID,0)=0 ) )';
    CallGETFunctionWithParameters("/api/Payables/GetPayablesOnly", { pWhereClause: pWhereClause },
        function (pData) {
            FadePageCover(false);
            var data = JSON.parse(pData);
            if (data) {
                var customData = [];
                $.each(data, function (i, item) {
                    customData.push({
                        ID: item.ID,
                        ChargeType: item.ChargeTypeName,
                        CalcType: 'Fixed',
                        Rate: item.CostPrice,
                        CalculatedAmount: item.CostAmount,
                        HouseBillID: item.BillID,
                        IsPayable: true
                    });
                });
                WH_CSL_Tariff_Details_BindTableRows(customData, true, true);
            }
        },
        null
    );
}

/*function makeOperationsOpenInNewTab() {
    debugger;
    let firstOP = $($("#tblOperations tbody tr")[0]).attr("id");
    let interval = setInterval(function () {
        let op = $($("#tblOperations tbody tr")[0]).attr("id");
        if (op != firstOP) {
            clearInterval(interval);
            let newOperations = $("#tblOperations tbody tr");
            $.each(newOperations, function (i, item) {
                console.dir(item);
                let id = $(item).attr("id");
                let newDblClick = `var n= window.open(window.location.href); n.focus(); n.addEventListener('load', function(){
                    n.setTimeout(function(){
                        n.LoadViews("OperationsEdit", null, ${id});
                        n.LoadOperationsSubMenu();
                    },1000);
                    }, true);`;
                $(item).attr("ondblclick", newDblClick);

            });
            
        }
    }, 10);
}*/

function Operations_OpenInNewTab(pID) {
    debugger;
    var n = window.open(window.location.href);
    n.focus();
    n.addEventListener('load', function () {
        n.setTimeout(function () {
            n.FormID = constOperationsFormID;
            n.GetPermissions();
            n.LoadViews("OperationsEdit", null, pID);
            n.LoadOperationsSubMenu($("#cbIsAWB" + pID).prop("checked"));
        }, 5000);
    });
}
function GetCrmUpdates() {

    let OperationID = pOperationHeader_Global.ID;
    CallGETFunctionWithParameters("/api/DynamicsCRM/GetCrmUpdatesForOperation", { pOperationID: OperationID }, function (Status) {
        debugger;
        if (Status) {
            GetOperationPayablesAndReceivables();
            jQuery("#UpdateOperationChargesModal").modal("show");
        }
        else {
            swal("Sorry", "There are no linked quotation to the current operations")
        }
    })
}

function UpdateOperationCharges() {
    if (ValidateForm("form", "UpdateOperationChargesModal")) {
        let Charges = {
            pPayableCategories: GetCategories("OperationPayables"),
            pReceivableCategories: GetCategories("OperationReceivables")
        }
        CallPOSTFunctionWithParameters("/api/Operations/UpdateOperationCharges", Charges,
            function (pData) {
                debugger;
                if (pData[0]) {
                    jQuery("#UpdateOperationChargesModal").modal("hide");
                    swal({
                        title: "Success",
                        text: "Operation payables & receivables are up-to-date.",
                        showCancelButton: false,
                        confirmButtonColor: "#65bd77",
                        confirmButtonText: "OK",
                        closeOnConfirm: true
                    }, function () { OperationRefresh(); });
                }
                else {
                    swal("Sorry", "There are no linked quotation to the current operations")
                }
            })
    }
}
function Payables_SubmenuTabClickedNew() {
    debugger;
    if (typeof Payables_SubmenuTabClicked == "function") {
        Payables_SubmenuTabClicked();
    }
}
function Receivables_SubmenuTabClickedNew() {
    debugger;
    if (typeof Receivables_SubmenuTabClicked == "function") {
        Receivables_SubmenuTabClicked();
    }
}
function OperationPartners_SubmenuTabClickedNew() {
    debugger;
    if (typeof OperationPartners_SubmenuTabClicked == "function") {
        OperationPartners_SubmenuTabClicked();
    }
}
function OperationContainersAndPackages_SubmenuTabClickedNew() {
    debugger;
    if (typeof OperationContainersAndPackages_SubmenuTabClicked == "function") {
        OperationContainersAndPackages_SubmenuTabClicked();
    }
}
function Routings_SubmenuTabClickedNew() {
    debugger;
    if (typeof Routings_SubmenuTabClicked == "function") {
        Routings_SubmenuTabClicked();
    }
}
function InterCompanyService_SubmenuTabClickedNew() {
    debugger;
    if (typeof InterCompanyService_SubmenuTabClicked == "function") {
        InterCompanyService_SubmenuTabClicked();
    }
}
function Invoices_SubmenuTabClickedNew() {
    debugger;
    if (typeof Invoices_SubmenuTabClicked == "function") {
        Invoices_SubmenuTabClicked();
    }
}
function AccNotes_SubmenuTabClickedNew() {
    debugger;
    if (typeof AccNotes_SubmenuTabClicked == "function") {
        AccNotes_SubmenuTabClicked();
    }
}
function PurchaseInvoice_SubmenuTabClickedNew() {
    debugger;
    if (typeof PurchaseInvoice_SubmenuTabClicked == "function") {
        PurchaseInvoice_SubmenuTabClicked();
    }
}
function PurchasingInvoice_SubmenuTabClickedNew() {
    debugger;
    if (typeof PurchasingInvoice_SubmenuTabClicked == "function") {
        PurchasingInvoice_SubmenuTabClicked();
    }
}
function DocsOut_SubmenuTabClickedNew() {
    debugger;
    if (typeof DocsOut_SubmenuTabClicked == "function") {
        DocsOut_SubmenuTabClicked();
    }
}
function Delivery_SubmenuTabClickedNew() {
    debugger;
    if (typeof Delivery_SubmenuTabClicked == "function") {
        Delivery_SubmenuTabClicked();
    }
}
function Tracking_SubmenuTabClickedNew() {
    debugger;
    if (typeof Tracking_SubmenuTabClicked == "function") {
        Tracking_SubmenuTabClicked();
    }
}
function Shipments_SubmenuTabClickedNew() {
    debugger;
    if (typeof Shipments_SubmenuTabClicked == "function") {
        Shipments_SubmenuTabClicked();
    }
}
function ACIDDetails_SubmenuTabClickedNew() {
    debugger;
    if (typeof ACIDDetails_SubmenuTabClicked == "function") {
        ACIDDetails_SubmenuTabClicked();
    }
}
function LocalEmails_LoadALLFromOperationsNew() {
    debugger;
    if (typeof LocalEmails_LoadALLFromOperations == "function") {
        LocalEmails_LoadALLFromOperations();
    }
}
function FillOperationsFilters() {
    debugger;
    if ($('#ulOperationStages option').length > 1) {
        return;
    }
    $("#slFilterBranch").html("<option value=''><--Select--></option>");
    $("#slFilterCommodity").html("<option value=''><--Select--></option>");
    $("#slFilterTrackingStatage").html("<option value=''><--Select--></option>");
    $("#slFilterClients").html('<option value=""><--Select--></option>');

    $("#slFilterBranch").append($("#hReadySlBranches").html());
    $("#slFilterBranch").val("");

    if (pDefaults.UnEditableCompanyName == "EGL") { //has alot of customers so i dont search with them with combo not to load them
        $("#slFilterShipper").html('<option value=""><--Select--></option>');
        $("#slShipmentDatesClient").html('<option value=""><--Select--></option>');
        $("#slFilterConsignee").html('<option value=""><--Select--></option>');
        $("#slFilterBookingParty").html('<option value=""><--Select--></option>');
        $(".classHideForEGL").addClass("hide");
        if (glbCallingControl == "OperationsManagement" || glbCallingControl == "Operations")
            $(".classShowForEGL").removeClass("hide");
        //$("#slFilterNotify").html('<option value=""><--Select--></option>');
    }
    else {
        //$("#slFilterShipper").html($("#hReadySlCustomers").html());
        //$("#slFilterClients").html($("#hReadySlCustomers").html());

        //$("#slShipmentDatesClient").html($("#hReadySlCustomers").html());
        //$("#slFilterConsignee").html($("#hReadySlCustomers").html());
        if (pDefaults.UnEditableCompanyName != "MED") {
            $("#slFilterCommodity").addClass("hide")
            $("#commodite").addClass("hide")
        }
        $("#slFilterCommodity").html($("#hReadySlCommodities").html());
        $("#slFilterTrackingStatage").html($("#hReadySlTrackingStatge ").html());

        //$("#slFilterBookingParty").html($("#hReadySlCustomers").html());
        if (glbCallingControl == "OperationsManagement" || glbCallingControl == "Operations")
            $(".classHideForEGL").removeClass("hide");
        $(".classShowForEGL").addClass("hide");
        //$("#slFilterNotify").html($("#hReadySlCustomers").html());
    }
    if (glbCallingControl != "BLDocuments") {
        GetListWithNameAndWhereClause((glbOperationStageFilter == "" ? null : glbOperationStageFilter), "/api/NoAccessQuoteAndOperStages/LoadAll", "<--Select-->", "ulOperationStages", " WHERE IsOperationStage = 1  AND IsInActive = 0 ORDER BY ViewOrder ", function () {
            $("#slShipmentDatesOperationStages").html($("#ulOperationStages").html());
            $("#slShipmentDatesOperationStages").val("60");
        });
    }
    ApplySelectListSearch();

    Select2OnlineSearch("slFilterShipper", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
        var query = {
            pWhereClauseWithMinimalColumns: ($("#sp-LoginName").text() == "BG EGYPT" ? "WHERE Name=N'BG EGYPT'" : "WHERE Name LIKE  N'%" + params.term + "%' AND IsInActive=0 ")
            , pOrderBy: "Name"
            , pDummy: false
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
    }, 3, 3000);
    Select2OnlineSearch("slFilterClients", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
        var query = {
            pWhereClauseWithMinimalColumns: ($("#sp-LoginName").text() == "BG EGYPT" ? "WHERE Name=N'BG EGYPT'" : "WHERE Name LIKE  N'%" + params.term + "%' AND IsInActive=0 ")
            , pOrderBy: "Name"
            , pDummy: false
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
    }, 3, 3000);
    Select2OnlineSearch("slShipmentDatesClient", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
        var query = {
            pWhereClauseWithMinimalColumns: ($("#sp-LoginName").text() == "BG EGYPT" ? "WHERE Name=N'BG EGYPT'" : "WHERE Name LIKE  N'%" + params.term + "%' AND IsInActive=0 ")
            , pOrderBy: "Name"
            , pDummy: false
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
    }, 3, 3000);
    Select2OnlineSearch("slFilterConsignee", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
        var query = {
            pWhereClauseWithMinimalColumns: ($("#sp-LoginName").text() == "BG EGYPT" ? "WHERE Name=N'BG EGYPT'" : "WHERE Name LIKE  N'%" + params.term + "%' AND IsInActive=0 ")
            , pOrderBy: "Name"
            , pDummy: false
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
    }, 3, 3000);
    Select2OnlineSearch("slFilterBookingParty", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
        var query = {
            pWhereClauseWithMinimalColumns: ($("#sp-LoginName").text() == "BG EGYPT" ? "WHERE Name=N'BG EGYPT'" : "WHERE Name LIKE  N'%" + params.term + "%' AND IsInActive=0 ")
            , pOrderBy: "Name"
            , pDummy: false
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
    }, 3, 3000);

    GetListWithNameAndWhereClauseWithMultiAttrs(null, "Notes", "/api/TrackingStage/LoadAll", TranslateString("SelectFromMenu")
        , "slFilterTrackingStage"
        , " Where 1=1 ORDER BY ViewOrder"
        , null);

    CallGETFunctionWithParameters("/api/Operations/LoadFilters", { pDummyParameter: 0 }
        , function (pData) {

            pAgents = pData[0]; var pVessels = pData[1]; var pContainerTypes = pData[2]; var pCountry = pData[3]; var pMoveTypes = pData[4]; var pShippingLines = pData[5];
            var pTruckers = pData[6]; var pUsers = pData[7]; var pCommodity = pData[8]; var pTypeOfStock = pData[9]; var pCCA = pData[10]; var pAirlines = pData[11];
            var pUsersAll = pData[12]; var pMescoSalesmen = pData[13];


            var _Salesmentemp = JSON.parse(pUsers);
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
            FillListFromObject(null, 2, "<--Select-->", "slFilterCustomerService", pUsers, null);
            FillListFromObject(null, 2, "<--Select-->", "slCreatedBy", pUsersAll, null);
            if (IsMESCOCompany) {
                FillListFromObject(null, 2, "<--Select-->", "slOperationSalesman", pMescoSalesmen, null);
                FillListFromObject(null, 2, "<--Select-->", "slFilterSalesman", pMescoSalesmen, null);
            } else {
                FillListFromObject(null, 2, "<--Select-->", "slFilterSalesman", JSON.stringify(pSalesmen), function () { $("#slOperationSalesman").html($("#slFilterSalesman").html()); });
            }
            //FadePageCover(false);
            if (glbCallingControl != "BLDocuments") {
                //$("#slClientCCModule").html($("#hReadySlCustomers").html());
                Select2OnlineSearch("slClientCCModule", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
                    var query = {
                        pWhereClauseWithMinimalColumns: ($("#sp-LoginName").text() == "BG EGYPT" ? "WHERE Name=N'BG EGYPT'" : "WHERE Name LIKE  N'%" + params.term + "%' AND IsInActive=0 ")
                        , pOrderBy: "Name"
                        , pDummy: false
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
                }, 3, 3000);
            }
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

}

function GetAllNOTSelectedLCLInvoiceItems(pTableID, pCheckboxNameAttr) {
    var listOfIDs = "";
    $("#tblReceivablesLcl tbody").find('input[name="Delete"]:not(:checked)').each(function () {
        listOfIDs += ((listOfIDs == "") ? "" : ",") + ($(this).attr('value'));
    });
    return listOfIDs;
}
function SearchInvoiceBLs(pInvoiceType) {
    if (pInvoiceType == "Draft") {
        $("#tblInvoicesDRAFT tbody tr").removeClass("hide");
        $('#tblInvoicesDRAFT tbody tr').each(function () {
            if ($(this).find('td.InvoiceHouseNumber').text().includes($('#txtSearchInvoicesBLD').val().trim())) {

            } else {
                $(this).addClass("hide");
            }
        });
    } else {
        $("#tblInvoices tbody tr").removeClass("hide");
        $('#tblInvoices tbody tr').each(function () {
            if (pDefaults.UnEditableCompanyName == "UNF") {
                if ($(this).find('td.InvoiceHouseNumber').text().includes($('#txtSearchInvoicesBL').val().trim())) {

                }

                else if ($(this).find('td.InvoiceNumber').text().includes($('#txtSearchInvoicesBL').val().trim())) {

                } else if ($(this).find('td.InvoiceDate').text().includes($('#txtSearchInvoicesBL').val().trim())) {

                } else if ($(this).find('td.InvoiceStatus').text().includes($('#txtSearchInvoicesBL').val().trim())) {

                } else if ($(this).find('td.InvoicePartner').text().includes($('#txtSearchInvoicesBL').val().trim())) {

                }
                else {
                    $(this).addClass("hide");
                }
            }
            else {
                if ($(this).find('td.InvoiceHouseNumber').text().includes($('#txtSearchInvoicesBL').val().trim())) {

                }
                else {

                    $(this).addClass("hide");
                }
            }

        });
    }
}
function convertTimestampToDateTime(timestampString) {
    // Extract the timestamp from the string
    const timestamp = parseInt(timestampString.match(/\d+/)[0], 10);

    // Create a Date object using the timestamp
    const date = new Date(timestamp);

    // Format the date and time in the desired format
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function HideOperationActions() {
    debugger;
    if (pDefaults.UnEditableCompanyName == 'MED' && pOperationHeader_Global.OperationStageCode == 'OPINV') {
        if (pLoggedUser.DepartmentCode == 'AC') {
            $('#btnSaveOperation').removeClass('hide');
            $('#btn-AddOperationPartners').removeClass('hide');
            $('#btn-SelectContainersAndPackages').removeClass('hide');
            $('#btn-SetCargoProperties').removeClass('hide');
            $('#btn-SetReeferDetails').removeClass('hide');
            $('#btn-AddMissingRoute').removeClass('hide');
            $('#btn-AddRouteTruckingOrder').removeClass('hide');
            $('#btn-AddRouteCustomsClearance').removeClass('hide');
            $('#btn-PaymentRequest').removeClass('hide');
            $('#btn-DeleteOperationPartners').removeClass('hide');
        }
        else {
            //general
            $('#btnSaveOperation').addClass('hide');

            //partner
            $('#btn-AddOperationPartners').addClass('hide');
            $('#btn-DeleteOperationPartners').addClass('hide');
            $('#tblOperationPartners tbody tr').attr('ondblclick', '');

            //package
            $('#btn-SelectContainersAndPackages').addClass('hide');
            $('#btn-SetCargoProperties').addClass('hide');
            $('#btn-SetReeferDetails').addClass('hide');
            $('#btn-ApproveFreight').addClass('hide');
            $('#btn-DeleteContainerOrPackage').addClass('hide');
            $('#tblOperationContainersAndPackages tbody tr').attr('ondblclick', '');

            //routing
            $('#btn-AddMissingRoute').addClass('hide');
            $('#btn-AddRouteTruckingOrder').addClass('hide');
            $('#btn-AddRouteCustomsClearance').addClass('hide');
            $('#btn-PaymentRequest').addClass('hide');
            $('#btn-ApproveTrucking').addClass('hide');
            $('#btn-ApproveClearance').addClass('hide');
            $('#btn-DeleteRoute').addClass('hide');
            $('#tblRoutings tbody tr').attr('ondblclick', '');

            //payable
            $('#btn-AddPayables').addClass('hide');
            $('#btn-MultiRowEditPayables').addClass('hide');
            $('#btn-DeletePayable').addClass('hide');
            $('#btn-NewCreditNote').addClass('hide');
            $('#tblPayables tbody tr').attr('ondblclick', '');

            //receivable
            $('#btn-AddReceivables').addClass('hide');
            $('#btn-GenerateReceivablesFromQuotation').addClass('hide');
            $('#btn-GenerateReceivablesFromPayables').addClass('hide');
            $('#btn-ApplyInvoiceTypeDefaults').addClass('hide');
            $('#btn-NewDebitNote').addClass('hide');
            $('#btn-MultiRowEditReceivables').addClass('hide');
            $('#btn-DeleteReceivable').addClass('hide');
            $('#btn-NewInvoice').addClass('hide');
            $('#btn-NewDraftInvoice').addClass('hide');
            $('#tblReceivables tbody tr').attr('ondblclick', '');

            //draft invoice
            $('#btn-DeleteDraftInvoice').addClass('hide');
            $('#tblInvoicesDRAFT tbody tr').attr('ondblclick', '');

            //invoice
            $('#btn-DeleteInvoice').addClass('hide');
            $('#tblInvoices tbody tr').attr('ondblclick', '');

            //credit note
            $('#btn-DeleteAccNote').addClass('hide');
            $('#tblAccNotes tbody tr').attr('ondblclick', '');

            //docs in
            $('#btnUploadFile').addClass('hide');
            $('#btn-DeleteDocsIn').addClass('hide');
            $('#tblDocsIn tbody tr').attr('ondblclick', '');

            //tracking
            $('#btn-AddTracking').addClass('hide');
            $('#btn-AddTracking_Trucking').addClass('hide');
            $('#btn-DeleteTracking').addClass('hide');
            $('#tblTracking tbody tr').attr('ondblclick', '');
        }
    }
    if (pDefaults.UnEditableCompanyName == 'MED' && (pOperationHeader_Global.OperationStageCode == 'OPINV' || pOperationHeader_Global.OperationStageCode == 'OPCLO' || $('#lblStage').text().includes('CLOSED'))) {
        if (pLoggedUser.DepartmentCode == 'MA' || ODACID) {
            $('#slOperationStages').removeClass('hide');
            $('#btn-Apply').removeClass('hide');
        }
        else {
            $('#slOperationStages').addClass('hide');
            $('#btn-Apply').addClass('hide');
        }
    }
    if (IsMESCOCompany) {

        $('#btn-AddOperationPartners').removeClass('hide');

    }

    if (pDefaults.UnEditableCompanyName == "UNF") {
        $('.classShowForUNI').removeClass('hide');

    }
}
function PostToIATA(pID, pType) {
    debugger;
    var endpoint = "";
    switch (pType) {
        case "FWB":
            endpoint = "/api/IATAIntegration/SendFWBMessage";
            break;
        case "FHL":
            endpoint = "/api/IATAIntegration/SendFHLMessage";
            break;
        default:
            break;
    }
    if (endpoint != "") {
        CallGETFunctionWithParameters(endpoint
            , {
                pOperationID: pID
            }
            , function (pData) {
                debugger;
                var returnedMessage = pData[0];
                if (returnedMessage == "") {
                    swal("Success", "Message queued for transmission");
                } else {
                    swal("Missing", returnedMessage);
                }
            }
        );
    }
}

function updateGeneratedInvoiceTotalLCL() {

    let FirstDraftID = "";
    if (pGeneratedDraftIDs.indexOf(',') > 0) {
        FirstDraftID = pGeneratedDraftIDs.substring(0, pGeneratedDraftIDs.indexOf(','));
    }
    else {
        FirstDraftID = pGeneratedDraftIDs;
    }
    CallGETFunctionWithParameters("api/Invoices/LoadAll", { pWhereClause: 'WHERE ID=' + FirstDraftID }, function (pData) {
        let invoices = JSON.parse(pData[0]);
        if (invoices.length == 1) {
            let inv = invoices[0];
            let t = 'Subtotal: ' + inv.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + inv.CurrencyCode;
            if (inv.TaxAmount > 0) {
                let tax = inv.TaxAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                t += ` | VAT(${inv.TaxTypeName}): ${tax} ${inv.CurrencyCode}`;
            }
            t += ' | Total: ' + inv.Amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + inv.CurrencyCode;
            $("#spGeneratedInvoiceDetails").text(t);
        }
    });
}

function CopySelectedName(elementId) {
    debugger;
    if ($('#' + elementId + ' option:selected').text() == "" || $('#' + elementId + ' option:selected').text() == "0" || $('#' + elementId + ' option:selected').text() == "<---Select--->") {
        return;
    }

    var element = document.getElementById(elementId);

    var tempInput = document.createElement('input');
    document.body.appendChild(tempInput);

    tempInput.value = $('#' + elementId + ' option:selected').text();

    tempInput.select();

    try {
        document.execCommand('copy');
        navigator.clipboard.writeText($('#' + elementId + ' option:selected').text())
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }

    document.body.removeChild(tempInput);
}

function Payables_MultiRowEdit_CustomLCL() {
    debugger;
    FadePageCover(true);
    var AWBSuffix = "";
    if ($("#cbIsAWB").prop("checked")) {
        AWBSuffix = "AWB";
    }
    var pSelectedIDs = GetAllSelectedIDsAsString('tblWH_CSL_Tariff_Details' + AWBSuffix);
    $("#divSelectCharges").html("");
    var pStrFnName = "/api/Payables/LoadAll";
    var pDivName = "divSelectCharges";//div name to be filled
    var ptblModalName = "tblModalPayables";
    var pCheckboxNameAttr = "cbSelectPayables";
    var listOfIDs = "";
    $("#tblWH_CSL_Tariff_Details").find('input[name="Delete"]').not(':disabled').each(function () {
        listOfIDs += ((listOfIDs == "") ? "" : ",") + ($(this).attr('value'));
    });

    var pWhereClause = "WHERE ISNULL(IsApproved,0)=0 AND AccNoteID IS NULL AND ID IN (" + listOfIDs + ")";


    FillPayablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, false //pIsInsert
        , function () {
            FadePageCover(false);
            //HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
            if (pDefaults.UnEditableCompanyName == "USC") {
                $(".tblModalPayableCurrency select").attr("disabled", "disabled");
                $(".tblModalPayableExchangeRate input").attr("disabled", "disabled");
            }
        });

    $("#btn-SearchCharges").attr("onclick", "Payables_MultiRowEdit();");
    $("#btnSelectChargesApply").attr("onclick", "Payables_UpdateList(false);");


}

function Receivables_MultiRowEdit_CustomLCL() {
    debugger;
    FadePageCover(true);
    $("#divSelectCharges").html("");
    var pStrFnName = "/api/Receivables/LoadAll";
    var pDivName = "divSelectCharges";//div name to be filled
    var ptblModalName = "tblModalReceivables";
    var pCheckboxNameAttr = "cbSelectReceivables";
    var AWBSuffix = "";
    if ($("#cbIsAWB").prop("checked")) {
        AWBSuffix = "AWB";
    }
    var listOfIDs = "";
    $("#tblWH_CSL_Tariff_Details").find('input[name="Delete"]').not(':disabled').each(function () {
        listOfIDs += ((listOfIDs == "") ? "" : ",") + ($(this).attr('value'));
    });

    var pWhereClause = "WHERE AccNoteID IS NULL AND InvoiceID IS NULL AND DraftInvoiceID IS NULL AND ID IN (" + listOfIDs + ")";

    FillReceivablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, false /*pIsInsert*/, false /*pIsInvoiceEdit*/
        , function () {
            FadePageCover(false);
            //HighlightText("#" + divSelectCharges, $("#txtSearchCharges").val().trim().toUpperCase());
            if (pDefaults.UnEditableCompanyName == "USC") {
                $(".tblModalReceivableCurrency select").attr("disabled", "disabled");
                $(".tblModalReceivableExchangeRate input").attr("disabled", "disabled");
            }

        });

    $("#btn-SearchCharges").attr("onclick", "Receivables_MultiRowEdit();");
    $("#btnSelectChargesApply").attr("onclick", "Receivables_UpdateList(false, 0, false);");//parameters are(pSaveAndNew, pInvoiceID, pIsRemoveItems)
}

function getOperationDataFromBooking() {
    debugger;
    if (CheckValueIsValidInput("#txtOperationBookingNumber") && $('#cbIsOcean').prop('checked')) {
        CallGETFunctionWithParameters("/api/Bookings/LoadAll", { pWhereClause: "WHERE OperationID IS NULL AND ValidatedTitlesDate >= cast(GETDATE() as Date) AND ISNULL(IsFromCustomer,0)=0 AND BookingNumber='" + $("#txtOperationBookingNumber").val().trim() + "'" }, function (pData) {
            let bookings = JSON.parse(pData[0]);
            if (bookings.length == 1) {
                let booking = bookings[0];

                $("#slPOLCountries").attr("onchange", "");
                $("#slPODCountries").attr("onchange", "");
                $("#slPOLCountries").val(booking.POLCountryID).trigger("change");
                $("#slPODCountries").val(booking.PODCountryID).trigger("change");
                POL_GetList(booking.POLID, booking.POLCountryID, null, function () {
                    $("#slPOL").trigger("change");
                });
                POD_GetList(booking.PODID, booking.PODCountryID, null, function () {
                    $("#slPOD").trigger("change");
                });
                $("#slPOLCountries").attr("onchange", "POL_GetList();");
                $("#slPODCountries").attr("onchange", "POD_GetList();");

                if (booking.ContainerQuantity1 > 0) {
                    $("#slOperationContainerType").val(booking.ContainerType1);
                    $("#txtOperationNumberOfContainers").val(booking.ContainerQuantity1);
                }
                if (booking.ContainerQuantity2 > 0) {
                    $("#slOperationContainerType2").val(booking.ContainerType2);
                    $("#txtOperationNumberOfContainers2").val(booking.ContainerQuantity2);
                }

                $("#slAgents").val(booking.ContractHolder).trigger("change");
                $("#slLines").val(booking.ShippingLineID).trigger("change");
                $("#slOperationVessels").val(booking.VesselID).trigger("change");
                $("#txtOperationVoyageOrTruckNumber").val(booking.VoyageNumber);

                if ($('#cbIsImport').prop('checked')) {

                    if ($('#slConsignees').find("option[value='" + booking.CustomerID + "']").length) {
                        $('#slConsignees').val(booking.CustomerID).trigger('change');
                    } else {
                        let newOption = new Option(booking.CustomerName, booking.CustomerID, true, true);
                        $('#slConsignees').append(newOption).trigger('change');
                    }
                } else {
                    if ($('#slShippers').find("option[value='" + booking.CustomerID + "']").length) {
                        $('#slShippers').val(booking.CustomerID).trigger('change');
                    } else {
                        let newOption = new Option(booking.CustomerName, booking.CustomerID, true, true);
                        $('#slShippers').append(newOption).trigger('change');
                    }
                }
            }
        });
    }
}

function GetFullDateTime_DD_MM_YY_OP(pSenderDate) {
    debugger;
    var dtFormatedMDY = new Date(1 * pSenderDate.substring(6, pSenderDate.length - 2));
    var hours = dtFormatedMDY.getHours();
    var minutes = dtFormatedMDY.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    var Day = (dtFormatedMDY.getDate().toString().length == 1 ? ("0" + dtFormatedMDY.getDate()) : dtFormatedMDY.getDate());
    var Month = (dtFormatedMDY.getMonth().toString().length == 1 ? ("0" + (dtFormatedMDY.getMonth() + 1)) : (dtFormatedMDY.getMonth() + 1));

    if (dtFormatedMDY.getFullYear() == 1900)
        return "";

    return (Day + "/" + Month + "/" + dtFormatedMDY.getFullYear() + " " + strTime);
}

function GetRelatedSalesman(pPartnerType) {
    if (pDefaults.UnEditableCompanyName != 'CFR')
        return;
    var isExport = $('#cbIsExport').is(':checked');
    var isImport = $('#cbIsImport').is(':checked');
    var partnerID = 0;
    if (isExport && pPartnerType == 'shipper') {
        partnerID = $('#slShippers').val();
    }
    else if (isImport && pPartnerType == 'consignee') {
        partnerID = $('#slConsignees').val();
    }
    if (!(partnerID > 0))
        return;

    $('#slOperationSalesman').val('');

    FadePageCover(true);

    CallGETFunctionWithParameters("/api/Customers/LoadAll", { pWhereClause: `where ID=${partnerID}` }
        , function (pData) {
            FadePageCover(false);
            var data = JSON.parse(pData);
            if (data.length > 0)
                $('#slOperationSalesman').val(data[0].SalesmanID);
        }
        , function () { FadePageCover(false); });

}

function OnCustomerChanged(str, str2) {
    if (pOperationHeader_Global == null) {
        return;
    }
}
function checkShipmentIsTracked() {
    debugger;
    $('#cbIsShipsGoTrack').prop('checked', false);

    if (pDefaults.UnEditableCompanyName != "ELI") {
        return;
    }

    if ($('#cbIsImport').prop('checked') && $('#slConsignees').val() > 0) {

        CallGETFunctionWithParameters('api/Operations/checkCustomerIsTracked', { customerID: $('#slConsignees').val(), isImport: $('#cbIsImport').prop('checked'), isExport: $('#cbIsExport').prop('checked') }, function (pData) {
            $('#cbIsShipsGoTrack').prop('checked', pData);
        }, null, false);

    } else if ($('#cbIsExport').prop('checked') && $('#slShippers').val() > 0) {

        CallGETFunctionWithParameters('api/Operations/checkCustomerIsTracked', { customerID: $('#slShippers').val(), isImport: $('#cbIsImport').prop('checked'), isExport: $('#cbIsExport').prop('checked') }, function (pData) {
            $('#cbIsShipsGoTrack').prop('checked', pData);
        }, null, false);

    } else {
        $('#cbIsShipsGoTrack').prop('checked', false);
        return;
    }
}

function UploadOperationByExcel() {
    debugger;

    // Checking whether FormData is available in browser  
    if (window.FormData !== undefined) {

        var data = new FormData();

        var files = $("#fileOrders").get(0).files;

        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            data.append(files[0].name, files[0]);
            FadePageCover(true);
            $.ajax({
                url: '/api/Operations/UploadOperationByExcel',
                type: "POST",
                contentType: false, // Not to set any content header  
                processData: false, // Not to process data  
                data: data,
                success:
                    function (result) {
                        debugger;
                        FadePageCover(false);
                        console.log(result.Exception);
                        console.log(result.Msg);
                        if (result.IsUploaded) {
                            swal("Success", "File Uploaded successfully.");
                            Operations_LoadingWithPaging();
                        }
                        else
                            swal("File Uploading faild", result.Msg);
                    }
                ,
                error: function (err) {
                    FadePageCover(false);
                    swal("Sorry", err.statusText);
                }

            });
        }
        else {
            swal("Sorry", "Choose Excel File");
        }
    }
    else {
        alert("FormData is not supported.");
    }

}