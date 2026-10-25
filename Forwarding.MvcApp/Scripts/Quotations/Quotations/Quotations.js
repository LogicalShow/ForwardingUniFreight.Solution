// Quotations Region ---------------------------------------------------------------
//DirectionType : 1-Import 2-Export 3-Domestic
//TransportType : 1-Ocean 2-Air 3-Inland
//ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL

var IsOpenedFromAlarm = false;
var IsFromManagement = false;
let isChargesEditRequested = false;

var TodaysDate = new Date();
var FormattedTodaysDate = TodaysDate.toLocaleDateString();
//$(document).ready(function () {
//    $("#slFilterCustomer").css({ "width": "100%" }).select2();
//    $("#slFilterCustomer").trigger("change");

//    $("#slCustomer_FleetQuotation").css({ "width": "100%" }).select2();
//    $("#slCustomer_FleetQuotation").trigger("change");

//    $("div[tabindex='-1']").removeAttr('tabindex');
//});

////to bind enter key when focus on $('#txt-Search') to $("#btn-search").click();
$('.classApplyFilter').on('keypress', function (args) {
    if (args.keyCode == 13) {
        $("#btnFilterApply").click();
        return false;
    }
});



function DirectionType_SetIconNameAndStylem() {
    debugger;
    if ($("#cbIsImportm").prop('checked')) {
        $("#hDirectionIconName").val(ImportIconName);
        $("#hDirectionIconStyle").val(strImportIconStyleClassName);
        ShowHideClientRequired();
    }
    if ($("#cbIsExportm").prop('checked')) {
        $("#hDirectionIconName").val(ExportIconName);
        $("#hDirectionIconStyle").val(strExportIconStyleClassName);
        ShowHideClientRequired();
    }
    if ($("#cbIsDomesticm").prop('checked')) {
        $("#hDirectionIconName").val(DomesticIconName);
        $("#hDirectionIconStyle").val(strDomesticIconStyleClassName);
        ShowHideClientRequired();
    }
    if ($("#cbIsCrossBookingm").prop('checked')) {
        $("#hDirectionIconName").val(CrossbookingIconName);
        $("#hDirectionIconStyle").val(strCrossbookingIconStyleClassName);
        ShowHideClientRequired();
    }
    if ($("#cbIsReExportm").prop('checked')) {
        $("#hDirectionIconName").val(ReExportIconName);
        $("#hDirectionIconStyle").val(strReExportIconStyleClassName);
        ShowHideClientRequired();
    }
}


function TransportType_SetIconNameAndStylem() {
    debugger;
    if ($("#cbIsOceanm").prop('checked')) {
        $("#hTransportIconName").val(OceanIconName);
        $("#hTransportIconStyle").val(strOceanIconStyleClassName);
        //show section ShipmentType (FCL,LCL)
        $("#secShipmentTypem").removeClass("hide");
        $("#divOceanTypem").removeClass("hide");
        $("#divInlandTypem").addClass("hide");
        //set FCL as default
        $("#cbIsFCL").prop('checked', true);
    }
    if ($("#cbIsAirm").prop('checked')) {
        $("#hTransportIconName").val(AirIconName);
        $("#hTransportIconStyle").val(strAirIconStyleClassName);
        //hide section ShipmentType (FCL,LCL,FTL,LTL)
        $("#secShipmentTypem").addClass("hide");
        //uncheck all ShipmentTypes
        $('input[name=cbShipmentType]').prop('checked', false);
    }
    if ($("#cbIsInlandm").prop('checked')) {
        $("#hTransportIconName").val(InlandIconName);
        $("#hTransportIconStyle").val(strInlandIconStyleClassName);
        //show section ShipmentType (FTL,LTL)
        $("#secShipmentTypem").removeClass("hide");
        $("#divOceanTypem").addClass("hide");
        $("#divInlandTypem").removeClass("hide");
        //set FTL as default
        $("#cbIsFTL").prop('checked', true);
    }
}


function Quotations_ChangeQuotationType() {
    debugger;
    // load QuotationContainersAndPackages first because it is needed in the following checks

    var pWhereClause = "where ID = " + $("#hQuotationID").val();

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "api/Quotations/LoadWithWhereClause", pWhereClause, 0/*$("#div-Pager li.active a").text()*/, 10/*$('#select-page-size').val().trim()*/, function (pData) {
        var q1 = JSON.parse(pData[0]); /*Quotations_ClearAllControls();*/
        var shipperId = q1[0].ShipperID;
        var cneeId = q1[0].ConsigneeID;


        if ((shipperId == 0) && ($("#cbIsExportm").prop("checked") || $("#cbIsDomesticm").prop("checked")) && !$("#cbIsMasterm").prop("checked")) {
            swal(strSorry, "Please, Enter SHIPPER in the Customer tab, then try again.");
        }
        else if ((cneeId == 0) && $("#cbIsImportm").prop("checked") && !$("#cbIsMaster").prop("checked")) {
            swal(strSorry, "Please, Enter the CONSIGNEE in the Customer tab, then try again.");
        }
        else {
            var pNewQuotationCode = $("#hQuotationCode").val().substring(0, 3) + GetDirectionType($('input[name=cbDirectionType]:checked').val()).substring(0, 3)
                + GetTransportType($('input[name=cbTransportType]:checked').val()).substring(0, 2) + $("#hCodeSerial").val();
            swal({
                title: "Are you sure?",
                text: "Quotation " + $("#hQuotationCode").val() + " will be changed to " + pNewQuotationCode + ". Note that you must re-enter the routing data manually.",
                type: "",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Continue.",
                closeOnConfirm: true
            },
                //callback function in case of success
                function () {
                    debugger;
                    var pParametersWithValues = {
                        "pQuotationID": $("#hQuotationID").val()
                        , "pNewQuotationCode": pNewQuotationCode

                        , "pDirectionType": $('input[name=cbDirectionTypem]:checked').val()
                        , "pDirectionIconName": $("#hDirectionIconName").val()
                        , "pDirectionIconStyle": $("#hDirectionIconStyle").val()

                        , "pTransportType": $('input[name=cbTransportTypem]:checked').val()
                        , "pTransportIconName": $("#hTransportIconName").val()
                        , "pTransportIconStyle": $("#hTransportIconStyle").val()

                        , "pShipmentType": $("#cbIsAirm").prop("checked") ? 0 : $('input[name=cbShipmentType]:checked').val()
                    };
                    CallGETFunctionWithParameters("/api/Quotations/ChangeQuotationType", pParametersWithValues
                        , function () { SwitchToQuotationsEditView($("#hQuotationID").val()); jQuery("#ChangeQuotationTypeModal").modal("hide"); }
                        , null /*function (data) { debugger; swal("Success", data[0]); }*/);
                });
        }
    });



}

function QuotationPartners_LoadWithPagingWithWhereClause(pQuotationID) {
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/QuotationPartners/LoadWithWhereClause", " where QuotationID = " + pQuotationID, 0, 100, function (pData) {
        var pQuotationPartnerTypes = pData[2];
        if ($("#slQuotationPartnerTypes option").length < 2)
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pQuotationPartnerTypes, "ID", "Code", '', TranslateString("SelectFromMenu"), "#slQuotationPartnerTypes", "", "PartnerTypeID", null);
        QuotationPartners_BindTableRows(JSON.parse(pData[0]));
    });
}

function Quotations_TransportTypeChanged() {
    debugger;
    CallGETFunctionWithParameters("/api/MoveTypes/LoadAll", { pWhereClause: "WHERE " + ($("#cbIsOceanm").prop("checked") ? " IsOcean=1 " : ($("#cbIsAirm").prop("checked") ? " IsAir=1 " : " IsInland=1 ")) + " OR IsCustomsClearance=1 OR IsWarehousing=1 ORDER BY Name" }
        , function (pData) {
            FillListFromObject(null, 18, "<--Select-->", "slQuotationMoveTypes", pData[0], null);
        }
        , null);
    TransportType_SetIconNameAndStyle();
    POL_GetList(null, null);
    POD_GetList(null, null);
    Lines_GetList(null, null);
    Quotations_ShipmentTypeChanged();
}


function Quotations_FillChangeQuotationTypeModal() {
    debugger;

    //if ($("#tblQuotationPartners tbody tr").length == 0) {
    //    QuotationPartners_LoadWithPagingWithWhereClause($("#hQuotationID").val());
    //    ApplySelectListSearch();
    //}
    //else {


    jQuery("#ChangeQuotationTypeModal").modal("show");


    DirectionType_SetIconNameAndStyle();
    TransportType_SetIconNameAndStyle();






    debugger;

    //    }
}


















function ApplySelectListSearch() {
    debugger;
    $("#slCustomer_FleetQuotation").css({ "width": "100%" }).select2();
    $("#slCustomer_FleetQuotation").trigger("change");

    $("#slFilterShipper").css({ "width": "100%" }).select2();
    $("#slFilterShipper").trigger("change");

    $("#slFilterConsignee").css({ "width": "100%" }).select2();
    $("#slFilterConsignee").trigger("change");

    $("#slFilterAgent").css({ "width": "100%" }).select2();
    $("#slFilterAgent").trigger("change");


    $("#slFilterCustomer").css({ "width": "100%" }).select2();
    $("#slFilterCustomer").trigger("change");

    $("#slFilterDivision").css({ "width": "100%" }).select2();
    $("#slFilterDivision").trigger("change");

    $("#slFilterPOLCountry").css({ "width": "100%" }).select2();
    $("#slFilterPOLCountry").trigger("change");

    $("#slFilterPODCountry").css({ "width": "100%" }).select2();
    $("#slFilterPODCountry").trigger("change");

    $("#slFilterPOL").css({ "width": "100%" }).select2();
    $("#slFilterPOL").trigger("change");

    $("#slFilterPOD").css({ "width": "100%" }).select2();
    $("#slFilterPOD").trigger("change");

    $("#slFilterPOD").css({ "width": "100%" }).select2();
    $("#slFilterPOD").trigger("change");

    $("#slFilterRoutingsPOL").css({ "width": "100%" }).select2();
    $("#slFilterRoutingsPOL").trigger("change");

    $("#slFilterRoutingsPOD").css({ "width": "100%" }).select2();
    $("#slFilterRoutingsPOD").trigger("change");

    $("#slShippers").css({ "width": "100%" }).select2();
    //$("#slShippers").trigger("change");

    $("#slConsignees").css({ "width": "100%" }).select2();
    //$("#slConsignees").trigger("change");

    $("#slAgents").css({ "width": "100%" }).select2();
    //$("#slAgents").trigger("change");

    $("#slSalesLead").css({ "width": "100%" }).select2();
    $("#slSalesLead").trigger("change");

    $("#slQuotationSalesman").css({ "width": "100%" }).select2();
    $("#slQuotationSalesman").trigger("change");

    $("#slPOLID_TransportID").css({ "width": "100%" }).select2();
    $("#slPOLID_TransportID").trigger("change");

    //$("#slRoutingsPOLCountries").css({ "width": "100%" }).select2();
    //$("#slRoutingsPOLCountries").trigger("change");

    //$("#slRoutingsPODCountries").css({ "width": "100%" }).select2();
    //$("#slRoutingsPODCountries").trigger("change");

    $("#slRoutingsPOL").css({ "width": "100%" }).select2();
    $("#slRoutingsPOL").trigger("change");

    $("#slRoutingsPOD").css({ "width": "100%" }).select2();
    $("#slRoutingsPOD").trigger("change");


    $("#slPOLCutoff").css({ "width": "100%" }).select2();
    $("#slPOLCutoff").trigger("change");

    $("#slPODCutoff").css({ "width": "100%" }).select2();
    $("#slPODCutoff").trigger("change");

    $("#slOperationEditOperationMan").css({ "width": "100%" }).select2();
    $("#slOperationEditOperationMan").trigger("change");

    $("div[tabindex='-1']").removeAttr('tabindex');
}
var QuotationsCanDelete = false;
function Quotations_Initialize() {
    debugger;
    if (pDefaults.UnEditableCompanyName == "EVL") {
        CallGETFunctionWithParameters("/api/UserPrivileges/LoadWithWhereClause", { pWhereClauseForPrint: `where FormID = 271 AND UserID = ${pLoggedUser.ID}`, pUserID: pLoggedUser.ID }
            , function (pData) {
                debugger;
                let quotationsPermissions = JSON.parse(pData[0]);
                QuotationsCanDelete = quotationsPermissions[0].CanDelete;            }
            , null);
    }
    Operations_ClearFilters();
    FormID = constQuotationsFormID; //to get privilage of quotations form for get permissions
    strLoadWithPagingFunctionName = "/api/Quotations/LoadWithPaging";
    strBindTableRowsFunctionName = "Quotations_BindTableRows";
    //the first parameter in the LoadView() fn. is the route in the RouteConfig
    LoadView("/Quotations/Quotations", "div-content", function () {

        LoadView("/Quotations/ModalQuotations", "div-content", function () { AfterLoadView(); }, null, null, true);//sherif: calling a partial view with only modal called from different places

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
            $("#OperatorTankChargeItemModal").remove();
            $("#divOperatorTankChargeBtns").addClass("hide");
        }, null, null, true);//sherif: calling a partial view with only modal called from different places

        LoadView("/MasterData/ModalAddresses", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalContacts", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places

        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Customers.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Agents.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Addresses.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Contacts.js');//sherif: to load the js file of the appended partial view

        //parameters (pStrFnName, pStrFirstRow, pListName, pWhereClause)
        //GetListWithNameAndWhereClause(null, "/api/NoAccessQuoteAndOperStages/LoadAll", "ALL STAGES", "slFilterQuotationStages", " WHERE IsQuotationStage = 1 AND IsInActive = 0 ORDER BY ViewOrder ");

        //Quotations_ReloadFilters();
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, Quotations_GetFilterWhereClause(), 0, 10, function (pData) {
            Quotations_BindTableRows(JSON.parse(pData[0]));
            var pUsers = pData[2];
            var _Salesmentemp = JSON.parse(pUsers);
            var pMainCriteria = pData[4];
            var pSubCriteria = pData[5];
            var pShippingLineList = pData[6];
            var pSalesmen = jQuery.grep(_Salesmentemp, function (_Salesmentemp) {
                return _Salesmentemp.IsSalesman == true;
            });
            var pCountry = pData[3];
            //FillListFromObject(null, 2, "<--Select-->", "slFilterAgent", pAgents, null);
            FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slMainCriteria", pMainCriteria, null);
            FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slSubCriteria", pSubCriteria, null);
            FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slFilterCreator", pUsers, null);
            FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slFilterShippingLine", pShippingLineList, null);
            //FillListFromObject(null, 2, "<--Select-->", "slOperationEditOperationMan", pUsers, null);
            FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slFilterSalesman", JSON.stringify(pSalesmen), function () {
                $("#slOperationSalesman").html($("#slFilterSalesman").html());
            });
            $("#slFilterBranch").html("<option value=''><--Select--></option>");
            $("#slFilterBranch").append($("#hReadySlBranches").html());
            $("#slFilterBranch").val("");
            //FillListFromObject(null, 2, "<--All-->", "slFilterShipper", pCustomers, function(){ $("#slFilterConsignee").html($("#slFilterShipper").html());$("#slFilterNotify").html($("#slFilterShipper").html());});
            if ($("#hDefaultUnEditableCompanyName").val() == "EGL") { //has alot of customers so i dont search with them with combo not to load them
                $("#slFilterShipper").html('<option value=""><--Select--></option>');
                $("#slFilterConsignee").html('<option value=""><--Select--></option>');
                $(".classHideForEGL").addClass("hide");
                $(".classShowForEGL").removeClass("hide");
                //$("#slFilterNotify").html('<option value=""><--Select--></option>');
            } else {
                $("#slFilterShipper").html($("#hReadySlCustomers").html());
                $("#slFilterAgent").html($("#hReadySlAgents").html());
                $("#slFilterConsignee").html($("#hReadySlCustomers").html());
                $(".classHideForEGL").removeClass("hide");
                $(".classShowForEGL").addClass("hide");
                //$("#slFilterNotify").html($("#hReadySlCustomers").html());
            }
            if (pDefaults.UnEditableCompanyName == "MED") {
                $(".classShowForMED").removeClass("hide");
            }
            if (pDefaults.UnEditableCompanyName == "UNF") {
                $(".classShowForUNI").removeClass("hide");
                $("#btnQuotationDownload").removeClass("hide");

            }
            FillListFromObject(null, 2, "<--Select-->", "slFilterPOLCountry", pCountry, function () {
                $("#slFilterPODCountry").html($("#slFilterPOLCountry").html());
            });
            $("#slFilterPOLCountry").attr("onchange"
                , 'FilterListByAnotherListID(null, "/api/Ports/LoadAll", "<--Select-->", "slFilterPOL", "slFilterPOLCountry", "CountryID");');
            $("#slFilterPODCountry").attr("onchange"
                , 'FilterListByAnotherListID(null, "/api/Ports/LoadAll", "<--Select-->", "slFilterPOD", "slFilterPODCountry", "CountryID");');
            if (pDefaults.UnEditableCompanyName == "NIL")
                $(".classShowForNIL").removeClass("hide");
            else if (pDefaults.UnEditableCompanyName == "GBL")
                $(".classShowForGBL").removeClass("hide");
            else if (pDefaults.UnEditableCompanyName == "AKS")
                $(".classShowForAKS").removeClass("hide");
            ApplySelectListSearch();
            //if ($("#hDefaultUnEditableCompanyName").val() == "VEN") {
            //    $("#slPOD").siblings().text("Airport Of Destination");
            //    $(".hideForAWB").addClass("hide");
            //    $(".hideThForAWB").addClass("hide");
            //    $("#thClient").text("Shipper");
            //    $("#thAWB").removeClass("hide");
            //}
            //else {
            //    $("#slPOD").siblings().text("POD");
            //    $("#thAWB").addClass("hide");
            //}
        });
        if (pDefaults.UnEditableCompanyName == "SED") {
            $(".classShowForSED").removeClass("hide");
        }
    },
        function () {
            Quotations_ClearAllControls();
        },
        function () {
            Quotations_DeleteList();
        });
}

function QuotationsEdit_Initialize(pEditedQuotationID, pQuotationRouteRequestID) {
    debugger;

    glbFormCalled = glbCallingControl;
    //strLoadWithPagingFunctionName = "/api/Quotations/LoadWithWhereClause";
    strLoadWithPagingFunctionName = "/api/Quotations/LoadWithWhereClauseAndReturnObject";
    LoadView("/Quotations/QuotationsEdit", "div-content", function () {

        AfterLoadView();
        //For MED only users with management role can set quotation stage
        if (pDefaults.UnEditableCompanyName == "QUO") {
            $("#QuotationReports").removeClass("hide")
        }
        if (pDefaults.UnEditableCompanyName == "UNF") {

            $("#btn-PrintPerforma").removeClass("hide");
            $("#tblPerforma").removeClass("hide");
            $("#btn-ChangeQuotationType").removeClass("hide");

        }
        if (pDefaults.UnEditableCompanyName == "TRM") {
            $("#cbPrintTotal").parent().removeClass("hide");
        }
        if (pDefaults.UnEditableCompanyName == "NTMU") {
            $("#slOperationEditOperationMan").parent().find("label").text("Operation User");
            $("#slQuotationSalesman").parent().find("label").text("Sales User");
        }

        if (!QAGen) {
            $("#btnSaveQuotation").addClass("hide");
        }
        else {
            $("#btnSaveQuotation").removeClass("hide");
        }
        if (pDefaults.UnEditableCompanyName == "MED" && pLoggedUser.RoleID != 5)
            $("#divSetQuotationStage").addClass("hide");
        else {
            $("#divSetQuotationStage").removeClass("hide");
        }

        if (pDefaults.UnEditableCompanyName == "MED" && pLoggedUser.RoleID == 5) {
            $(".classShowForMEDManagement").removeClass("hide");
        }
        if (pDefaults.UnEditableCompanyName == "NAJ") {
            $(".classShowForNAJ").removeClass("hide");
        }
        if (pDefaults.UnEditableCompanyName == "LATT") {
            $("#slExporter").parent().removeClass("hide");
            $("#cbPrintForExporter").click();
            $("#cbPrintForExporter").parent().removeClass("hide");
        }

        if ($("#hDefaultUnEditableCompanyName").val() == "KDS" || $("#hDefaultUnEditableCompanyName").val() == "NEW") {
            //SelectOperationTypeModal
            $("#spanCbIsHouse").text("B/L");
            $("#spanCbIsMaster").text("Full Vessel");
        }
        if (pDefaults.UnEditableCompanyName == "ENJ")
            $("#cbPrintFooter").prop("checked", true);
        //if (pLoggedUser.DepartmentCode == "MAN" || pLoggedUser.Name == "ADMIN") {
        //    $("#btn-Revised").removeClass("hide");
        //}
        if (pDefaults.UnEditableCompanyName == "BED") {
            $("#lblCreationDate").parent().removeClass("hide");
        }
        if (pDefaults.UnEditableCompanyName == "UNF") {
            $("#slPOLID_TransportID").parent().prev().text("Transshipment Port");
            $("#btnQuotationDownload").removeClass("hide");

        }
        LoadView("/MasterData/ModalSelectCharges", "div-content", function () {
            if (!QARou) {
                $("#btn-AddRoute").addClass("hide");
                $("#btn-CreateOperation").addClass("hide");
            }
            if (!QACha) {

                $("#slRoutingsLines_AddButton").addClass("hide");
                $("#slCommodities_AddButton").addClass("hide");
                $("#slRoutingsPOL_AddButton").addClass("hide");
                $("#slRoutingsPOD_AddButton").addClass("hide");
                $("#slIncoterm_AddButton").addClass("hide");

            }
            if (!QECha && !QACha) {
                $("#btn-SelectCharges").addClass("hide");
                //$("#btn-ApplyTemplateQuotationCharges").addClass("hide");
                $("#btn-PricingCharges").addClass("hide");
                $("#btn-PricingRequest").addClass("hide");
                $("#btn-QuotationsPackage").addClass("hide");
                $("#btn-MultiRowEditQuotationCharges").addClass("hide");
                $("#btn-SendChargesAdded").addClass("hide");
                $("#btn-RequestApproval").addClass("hide");
                $("#btnSaveRouting").addClass("hide");
                $("#btnSaveandNewRouting").addClass("hide");
            }
            if (!QDCha) {
                $("#btn-DeleteQuotationCharge").addClass("hide");
            }
            if (pDefaults.IsTaxOnItems)
                $(".classShowForTaxOnItems").removeClass("hide");
            else
                $(".classShowForTaxOnHeader").removeClass("hide");
            $("#slPayableBillTo").parent().addClass("hide");

            if (pDefaults.UnEditableCompanyName == "LAT" || pDefaults.UnEditableCompanyName == "LATT") {
                $("#slChargeCostCurrency").attr("onchange", "ChargeCostCurrencyChanged();");
            }

            $("#btn-SetDefaultNote").parent().addClass("hide");
            if (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV") {
                $("#btnAddNewCharge").removeClass("hide");
            }
        }, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalCustomers", "div-content"
            , function () {
                if (!QAPar) {
                    $("#btn-NewAddShipper").addClass("hide");
                    $("#btn-NewAddConsignee").addClass("hide");
                    $("#btn-NewAddAgent").addClass("hide");
                }
                if (!QEPar) {
                    $("#btn-EditShipper").addClass("hide");
                    $("#btn-EditConsignee").addClass("hide");
                    $("#btn-EditAgent").addClass("hide");
                }
                if (pDefaults.UnEditableCompanyName == "SAF") {
                    $("#btn-OperatorTankChargeModal").addClass("hide");
                    $(".classMandatoryForSAF").attr("data-required", "true");
                }
            }, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalAgents", "div-content", function () {
            if (!QAUpl) {
                $("#btnUploadFile").addClass("hide");
            }
            if (!QDUpl) {
                $("#btn-DeleteDocsIn").addClass("hide");
            }
            if (pDefaults.UnEditableCompanyName == "SAF") {
                $(".classMandatoryForSAF").attr("data-required", "true");
            }
        }, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalAddresses", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalContacts", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalCheckboxesList", "div-content", null, null, null, true);
        //LoadView("/Operations/ModalSelectContainersAndPackages", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places

        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Customers.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Agents.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Addresses.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Contacts.js');//sherif: to load the js file of the appended partial view
        //$.getScript(strServerURL + '/Scripts/Quotations/Quotations/QuotationContainersAndPackages.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/Quotations/Quotations/QuotationCharges.js');//sherif: to load the js file of the appended partial view

        //parameters (pStrFnName, pStrFirstRow, pListName, pWhereClause)
        //FillListWithNames("/api/NoAccessQuoteAndOperStages/LoadAll", "SET AS", "ulQuotationStages", " WHERE IsQuotationStage = 1 AND IsInActive = 0 ORDER BY ViewOrder ");


        //// i am calling here FillControls and not BindTableRows coz i ll ve just one row by ID
        //LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, " where ID = " + pUserID/*here it holds the QuotationID*/, 0, 10, function (pData) { Quotations_FillControls(pData); });
        CallGETFunctionWithParameters(strLoadWithPagingFunctionName
            , { pEditedQuotationID: pEditedQuotationID/*pUserID holds the QuotationID here*/ }
            , function (pData) {
                Quotations_FillControls(pData, function () {
                    if (pDefaults.UnEditableCompanyName == "MED") {
                        CallGETFunctionWithParameters("api/Quotations/CheckQuotationDraft", { pQuotationID: pEditedQuotationID }, function (pData) {
                            debugger;
                            if (pData[0]) {
                                if (pData[1] == 0) { // Quotation is not in the approve cycle
                                    $("#btnRequestQuotationApprovalLevel span").text("Request First Approval");
                                    if (glbCallingControl == "QuotationsEdit")
                                        $("#btnRequestQuotationApprovalLevel").removeClass("hide");
                                    $("#btnRequestQuotationApprovalLevel").attr("data-approveLevel", "0");
                                    $("#btnRequestQuotationApprovalLevel").attr("onclick", "Quotations_Request_ApprovalLevel(1);");
                                } else {
                                    let QD = JSON.parse(pData[2])[0];
                                    /*let Q = JSON.parse(pData[3])[0];s
                                    if (QD.ConsigneeID != Q.ConsigneeID) {
                                        $('#slConsignees').attr("onchange", "");
                                        $('#slConsignees').val(QD.ConsigneeID).trigger('change');
                                        ConsigneeContacts_GetList(null, ($('#slConsignees option:selected').val() == "" ? 0 : $('#slConsignees option:selected').val()), null);
                                        $("#bodyConsigneeContactDetails").html("");
                                    }*/


                                    let A_Users = [];
                                    switch (QD.ApprovalLevel + 1) {
                                        case 1:
                                            A_Users = QD.FirstApprovalUsers.split(",");
                                            break;
                                        case 2:
                                            A_Users = QD.SecondApprovalUsers.split(",");
                                            break;
                                        case 3:
                                            A_Users = QD.ThirdApprovalUsers.split(",");
                                            break;
                                    }
                                    $("#btnApproveQuotationApprovalLevel span").text("Approve Level " + (QD.ApprovalLevel + 1));
                                    $("#btnApproveQuotationApprovalLevel").attr("data-approveLevel", QD.ApprovalLevel + 1);
                                    $("#btnApproveQuotationApprovalLevel").attr("onclick", "QuotationEditConfirmApproval(" + (QD.ApprovalLevel + 1) + ",false);");
                                    if (glbCallingControl == "QuotationsEdit_Approval" && A_Users.includes($('#hLoggedUserID').val())) {
                                        $("#btnApproveQuotationApprovalLevel").removeClass("hide");
                                        $("#btnRejectQuotationApprovalLevel").removeClass("hide");
                                    }
                                }
                            } else {
                                swal("Sorry", "Error Happened");
                            }
                        }, null);
                    }
                    if (pQuotationRouteRequestID != null && pQuotationRouteRequestID != undefined) {
                        IsOpenedFromAlarm = true;
                        Routings_EditByDblClick(pQuotationRouteRequestID, true);
                    }
                    else
                        FadePageCover(false);
                    QuotationsEdit_SetPermissions();
                    ApplySelectListSearch();
                });
            }
            , null);

        if ($("#hLoggedUserDepartmentID").val() == "8") {   // 8 is the ID of Management Department in MED
            IsFromManagement = true;
        }

        if (pDefaults.UnEditableCompanyName == "MED" && !IsFromManagement) {
            $("#ulQuotationStages").attr("disabled", "disabled");
            $("#btn-ApplyQuotationStage").attr("disabled", "disabled");
        }
    }
        , null//function () { QuotationsEdit_ClearAllControls(); }
        , null//function () { QuotationsEdit_DeleteList(); }
    );
}

function Quotations_BindTableRows(pQuotations) {
    debugger;
    $("#hl-menu-Quotations").parent().siblings().removeClass("active");
    $("#hl-menu-Quotations").parent().addClass("active");

    ClearAllTableRows("tblQuotations");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Copy" + "</span>";
    var newTabControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Open New Tab" + "</span>";
    $.each(pQuotations, function (i, item) {
        AppendRowtoTable("tblQuotations",
            ("<tr ID='" + item.ID + "' ondblclick='SwitchToQuotationsEditView(" + item.ID + ");' "
                + "class='font-bold "
                + (
                    item.QuotationStageName == "ACCEPTED"
                        ? "static-text-primary"
                        : (item.QuotationStageName == "DECLINED"
                            ? "static-text-danger"
                            : (
                                (item.ZeroCostChargesCount > 0 || item.ChargesCount == 0)
                                    ? " static-text-danger "
                                    : ""
                            )
                        )
                )
                + "'>"

                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='OpenedBy hide' val='" + item.CreatorUserID + "'>" + item.OpenedBy + "</td>"
                //DirectionType : 1-Import 2-Export 3-Domestic
                + "<td class='DirectionType hide'>" + GetDirectionType(item.DirectionType) + "</td>"
                + "<td class='shownDirectionIconName'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-2x'/></td>"
                + "<td class='DirectionIconName hide'>" + item.DirectionIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                + "<td class='DirectionIconStyle hide'>" + item.DirectionIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                //TransportType : 1-Ocean 2-Air 3-Inland
                + "<td class='TransportType hide'>" + GetTransportType(item.TransportType) + "</td>"
                + "<td class='shownTransportIconName' >"
                + (item.IsWarehousing || item.IsLoadingDischarging || item.IsPackingRemovals || item.IsSurvey || item.IsLashing ? (getQuotationType(item))
                    : ("<i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/>"))
                + "</td>"
                + "<td class='TransportIconName hide'>" + item.TransportIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                + "<td class='TransportIconStyle hide'>" + item.TransportIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                //the next line differs from the preceeding one that date could be shown as today, tomorrow, yesterday
                + "<td class='shownOpenDate'>" //+ "<span class='pull-left thumb-sm  calendar-icon-style'>"
                //+ " <i class='fa fa-calendar'></i>"
                //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.OpenDate)) + "</small>"
                //+ "</span>"
                + "</td>"
                + "<td class='OpenDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.OpenDate)) + "</td>"

                + "<td class='Code'>" + item.Code + "</td>"
                + "<td class='crmCode " + (pDefaults.UnEditableCompanyName == "AKS" ? "" : " hide") + "' val='" + item.CRMCode + "'>" + (item.CRMCode == 0 ? "" : item.CRMCode) + "</td>"
                + "<td class='CodeSerial hide'>" + item.CodeSerial + "</td>"

                + "<td class='Client'>" + (pDefaults.UnEditableCompanyName == "LATT" ? item.ExporterName : (item.DirectionType == 1
                    ? (item.ConsigneeID == 0 ? item.ClientName : item.ConsigneeName)
                    : (item.ShipperID == 0 ? item.ClientName : item.ShipperName))) + "</td>"
                + "<td class='Agent'>" + (item.AgentName == 0 ? "" : item.AgentName) + "</td>"

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
                        : item.TuckerID) //Inland
                ) //EOF getting the carrier ID val
                + "'>" + (item.TransportType == "1" ? item.ShippingLineName //Ocean
                    : (item.TransportType == "2" ? item.AirlineName //Air
                        : item.TuckerName) //Inland
                )
                + "</td>"
                //+ "<td class='Routing'>" + item.POLCode + " > " + item.PODCode + "</td>"
                + "<td class='Incoterm hide' val='" + item.IncotermID + "'>" + item.IncotermName + "</td>"
                //+ "<td class='Commodity hide' val='" + item.CommodityID + "'>" + item.CommoditymName + "</td>"
                //+ "<td class='TransientTime hide'>" + item.TransientTime + "</td>"
                //+ "<td class='Validity hide'>" + item.Validity + "</td>"
                //+ "<td class='FreeTime hide'>" + item.FreeTime + "</td>"
                + "<td class='CloseDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CloseDate)) + "</td>"
                //ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL
                + "<td class='ShipmentType'>" + (item.IsWarehousing || item.IsLoadingDischarging || item.IsPackingRemovals || item.IsSurvey || item.IsLashing ? (getQuotationType(item)) : GetShipmentType(item.ShipmentType)) + "</td>"
                //+ "<td class='shownExpirationDate'>" //+ "<span class='pull-left thumb-sm  calendar-icon-style'>"
                //                          //+ " <i class='fa fa-calendar'></i>"
                //                          //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) + "</small>"
                //                          + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.ExpirationDate)) + "</small>"
                //                          //+ "</span>"
                //                          + "</td>"
                //+ "<td class='ExpirationDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) + "</td>"
                + "<td class='IncludePickup hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludePickup == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='PickupAddress hide' val='" + item.PickupAddressID + "'>" + item.PickupAddressID + "</td>"
                + "<td class='IncludeDelivery hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludeDelivery == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='DeliveryAddress hide' val='" + item.DeliveryAddressID + "'>" + item.DeliveryAddressID + "</td>"

                + "<td class='GrossWeight hide'>" + item.GrossWeight + "</td>"
                + "<td class='Volume hide'>" + item.Volume + "</td>"
                + "<td class='ChargeableWeight hide'>" + item.ChargeableWeight + "</td>" //shown as Wt/Msr(MT) incase of ocean or inland
                + "<td class='NumberOfPackages hide'>" + item.NumberOfPackages + "</td>"
                + "<td class='IsDangerousGoods hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDangerousGoods == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='DescriptionOfGoods hide'>" + item.DescriptionOfGoods + "</td>"
                + "<td class='Branch hide' val='" + item.BranchID + "'>" + (item.BranchID == 0 ? "" : item.BranchName) + "</td>"
                + "<td class='Notes hide'>" + item.Notes + "</td>"
                + "<td class='Salesman " + (pDefaults.UnEditableCompanyName == "NIL" ? "" : " hide") + "' val='" + item.SalesmanID + "'>" + (item.SalesmanID == 0 ? "" : item.Salesman) + "</td>"
                + "<td class='POL " + (1 == 1 ? "" : " hide") + "' val='" + item.POLID + "'>" + (item.POLName == 0 ? "" : item.POLName) + "</td>"
                + "<td class='POD " + (1 == 1 ? "" : " hide") + "' val='" + item.PODID + "'>" + (item.PODName == 0 ? "" : item.PODName) + "</td>"
                + "<td class='LineName " + (pDefaults.UnEditableCompanyName == "NIL" ? "" : " hide") + "'>" + (item.RepLineName == 0 ? "" : item.RepLineName) + "</td>"
                + "<td class='QuotationStage' val='" + item.QuotationStageID + "'>" + item.QuotationStageName + "</td>"
                + "<td class='CreatorName " + (pDefaults.UnEditableCompanyName == "GBL" ? "" : "hide") + "'>" + item.CreatorName + "</td>"

                + "<td class='QuotationCopy hide'><a onclick='Quotations_Copy(" + item.ID + ");' " + copyControlsText + "</a><a onclick='QuotationOpenInNewTab(" + item.ID + ");' " + newTabControlsText + "</a></td>"
                //+ "<td class='hide'><a onclick='SwitchToQuotationsEditView(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "</tr>"));
    });
    //ApplyPermissions();
    if (QA && glbCallingControl != "QuotationApproval") {
        $("#btn-NewAdd").removeClass("hide");
        $(".QuotationCopy").removeClass("hide");
    } else {
        $("#btn-NewAdd").addClass("hide");
        $(".QuotationCopy").addClass("hide");
    }
    if (QD && glbCallingControl != "QuotationApproval") $("#btn-Delete").removeClass("hide"); else $("#btn-Delete").addClass("hide");
    BindAllCheckboxonTable("tblQuotations", "ID");//it attaches function to the checkboxes so when all are checked then check cb-checkall too
    CheckAllCheckbox("ID");
    HighlightText("#tblQuotations>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () {
        LoadViews("hl-homepage");
    });
    //i put FillListWithNames in the LoadView so the value remains unchanged
    ////parameters (pStrFnName, pStrFirstRow, pListName)
    //FillListWithNames("/api/NoAccessQuoteAndOperStages/LoadAll", "ALL STAGES", "ulQuotationStages");
}

function Quotations_LoadingWithPaging() {
    debugger;
    //LoadWithPaging("/api/Quotations/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Quotations_BindTableRows(pTabelRows); Quotations_ClearAllControls(); });
    //Quotations_SaveFilters();//incase of returning from operations edit
    var pWhereClause = Quotations_GetFilterWhereClause();
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "api/Quotations/LoadWithWhereClause", pWhereClause, 0/*$("#div-Pager li.active a").text()*/, 10/*$('#select-page-size').val().trim()*/, function (pData) {
        Quotations_BindTableRows(JSON.parse(pData[0])); /*Quotations_ClearAllControls();*/
    });
    HighlightText("#tblQuotations>tbody>tr", $("#txt-Search").val().trim());


}

function Quotations_Insert(pSaveandAddNew) {
    debugger;
    //var varExpirationDate = ($("#txtQuotationExpirationDate").val().trim() == "" ? "" : $("#txtQuotationExpirationDate").val().trim());
    //if (!isValidDate($("#txtOpenDate").val().trim(), 1) || !isValidDate(varExpirationDate, 1))
    //    swal(strSorry, strCheckDates);
    //else
    //    if (Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat(varExpirationDate)) < 1)
    //        swal(strSorry, strCheckDates);
    //    else

    //        if ($('#slPOL option:selected').val() == $('#slPOD option:selected').val() && $('#slPOL option:selected').val() != "" && !$("#cbIsDomestic").prop("checked"))//check different ports
    //            swal(strSorry, strPOLEqualPODWarning);
    //        else //check Domestic with POLCountry = PODCountry
    //            if ($('input[name=cbDirectionType]:checked').val() == 3 && $('#slPOLCountries option:selected').val() != $('#slPODCountries option:selected').val())
    //                swal(strSorry, strDomesticWithDifferentCountriesWarning);
    //            else //check import or export with different countries
    //                if ($('input[name=cbDirectionType]:checked').val() != 3 && $('#slPOLCountries option:selected').val() == $('#slPODCountries option:selected').val() && $('#slPOLCountries option:selected').val() != "")
    //                    swal(strSorry, strImportOrExportWithSameCountriesWarning);
    //                else { //Ports are OK
    $("#slShippers").removeClass("validation-error");
    $("#slAgents").removeClass("validation-error");
    $("#slConsignees").removeClass("validation-error");
    var CurrentYear = TodaysDate.getUTCFullYear();
    if ($("#slSalesLead").val() != "") {
        $("#slShippers").attr("data-required", "false");
        $("#slAgents").attr("data-required", "false");
        $("#slConsignees").attr("data-required", "false");
    } else if ($("#slAgents").val() != "") {
        $("#slConsignees").attr("data-required", "false");
        $("#slShippers").attr("data-required", "false");
    } else
        DirectionType_SetIconNameAndStyle();
    var data = {
        "pCodeSerial": 0 /*generated automatically*/,
        "pCode": "Q" + (CurrentYear - 2000) + GetDirectionType(($('input[name=cbDirectionType]:checked').val()) == undefined ? "" : $('input[name=cbDirectionType]:checked').val()).substring(0, 3)
            + GetTransportType($('input[name=cbTransportType]:checked').val()).substring(0, 2),
        "pBranchID": $('#slQuotationBranch').val(),
        "pSalesmanID": $('#slQuotationSalesman').val(),
        "pOperationManID": $('#slOperationEditOperationMan').val() == "" || $('#slOperationEditOperationMan').val() == undefined ? 0 : $('#slOperationEditOperationMan').val(),
        "pDirectionType": $('input[name=cbDirectionType]:checked').val(),
        "pDirectionIconName": $("#hDirectionIconName").val(),
        "pDirectionIconStyle": $("#hDirectionIconStyle").val(),
        "pTransportType": $('input[name=cbTransportType]:checked').val(),
        "pTransportIconName": $("#hTransportIconName").val(),
        "pTransportIconStyle": $("#hTransportIconStyle").val(),
        "pShipmentType": ($('input[name=cbTransportType]:checked').val() == 2 ? 0 : $('input[name=cbShipmentType]:checked').val()),
        "pShipperID": CheckValueIsValidInput("#slShippers") ? $('#slShippers').val() : 0,
        "pShipperAddressID": 0,
        "pShipperContactID": 0,
        "pConsigneeID": CheckValueIsValidInput("#slConsignees") ? $('#slConsignees').val() : 0,
        "pConsigneeAddressID": 0,
        "pConsigneeContactID": 0,
        "pAgentID": ($('#slAgents').val() == "" ? 0 : $('#slAgents').val()),
        "pAgentAddressID": 0,
        "pAgentContactID": 0,
        "pCustomerID": 0, //($('#slShippers').val() == "" ? 0 : $('#slShippers').val()),
        "pCustomerContactID": 0,
        "pIncotermID": 0,
        "pCommodityID": 0,
        "pTransientTime": 0,
        "pValidity": 0,
        "pFreeTime": 0,
        "pOpenDate": ConvertDateFormat($("#txtOpenDate").val().trim()),
        "pCloseDate": "01/01/1900",
        //"pExpirationDate": varExpirationDate,
        "pExpirationDate": "01-01-1900", //ConvertDateFormat(varExpirationDate),
        "pIncludePickup": false,
        "pPickupCityID": 0,
        "pPickupAddressID": 0,
        "pPOLCountryID": 0, //$('#slPOLCountries option:selected').val(),
        "pPOL": 0, //$('#slPOL option:selected').val(),
        "pPODCountryID": 0, //$('#slPODCountries option:selected').val(),
        "pPOD": 0, //$('#slPOD option:selected').val(),
        "pShippingLineID": 0, //($('input[name=cbTransportType]:checked').val() == 1 ? ($('#slLines option:selected').val() == "" ? 0 : $('#slLines option:selected').val()) : 0),
        "pAirlineID": 0, //($('input[name=cbTransportType]:checked').val() == 2 ? ($('#slLines option:selected').val() == "" ? 0 : $('#slLines option:selected').val()) : 0),
        "pTruckerID": 0, //($('input[name=cbTransportType]:checked').val() == 3 ? ($('#slLines option:selected').val() == "" ? 0 : $('#slLines option:selected').val()) : 0),
        "pIncludeDelivery": false,
        "pDeliveryZipCode": 0,
        "pDeliveryCityID": 0,
        "pDeliveryCountryID": 0,
        "pGrossWeight": 0,
        "pVolume": 0,
        "pChargeableWeight": 0,
        "pNumberOfPackages": 0,
        "pIsDangerousGoods": $("#cbDangerousGoods").prop("checked"),
        "pDescriptionOfGoods": $("#divGoodsDescription").val().trim().toUpperCase(),
        "pNotes": "",
        "pQuotationStageID": 1, //this means Created
        "pSalesLeadID": $("#slSalesLead").val() == "" ? 0 : $("#slSalesLead").val(),
        "pIsWarehousing": $("#cbIsWarehousing").prop("checked"),
        "pMainCriteriaID": $("#slMainCriteria").val() == "" ? 0 : $("#slMainCriteria").val(),
        "pSubCriteriaID": $("#slSubCriteria").val() == "" ? 0 : $("#slSubCriteria").val(),
        "pIsFleet": false,
        "pTemplateID": 0,
        "pSubject": 0,
        "pTermsAndConditions": 0,
        "pExporterID": CheckValueIsValidInput("#slExporter") ? $("#slExporter").val() : 0,
        "pIsLoadingDischarging": $("#cbIsLoadingDischarging").prop("checked"),
        "pIsSurvey": $("#cbIsSurvey").prop("checked"),
        "pIsLashing": $("#cbIsLashing").prop("checked"),
        "pIsPackingRemovals": $("#cbIsPackingRemovals").prop("checked")
    };
    PostInsertUpdateFunction("form", "/api/Quotations/Insert", data, pSaveandAddNew, "QuotationModal", function (data) {
        SwitchToQuotationsEditView(data[1]); /*data[1] is the pID*/
    });
    //}
}

function Quotations_Update(pSaveandAddNew) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "UNF" && ($('#slOperationEditOperationMan').val() == "" || $('#slOperationEditOperationMan').val() == null || $('#slOperationEditOperationMan').val() == 0)) {
        swal("Sorry", "Customer Service CS Is Mandatory");
        return;
    } else if (["LATT", "LAT", "NAJ"].includes(pDefaults.UnEditableCompanyName)) {
        if (!CheckValueIsValidInput("#slExporter")) {
            swal("Sorry", "Client Is Mandatory");
            return;
        }
    }
    //var varExpirationDate = ($("#txtQuotationExpirationDate").val().trim() == "" ? "" : $("#txtQuotationExpirationDate").val().trim());
    //if (!isValidDate($("#txtOpenDate").val().trim(), 1) || !isValidDate(varExpirationDate, 1))
    //    swal(strSorry, strCheckDates);
    //else
    //    if (Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat(varExpirationDate)) < 1)
    //        swal(strSorry, strCheckDates);
    //    else if ($('#slPOL option:selected').val() == $('#slPOD option:selected').val() && $('#slPOL option:selected').val() != "" && !$("#cbIsDomestic").prop("checked"))//check different ports
    //            swal(strSorry, strPOLEqualPODWarning);
    //        else //check Domestic with POLCountry = PODCountry
    //            if ($('input[name=cbDirectionType]:checked').val() == 3 && $('#slPOLCountries option:selected').val() != $('#slPODCountries option:selected').val())
    //                swal(strSorry, strDomesticWithDifferentCountriesWarning);
    //            else //check import or export with different countries
    //                if ($('input[name=cbDirectionType]:checked').val() != 3 && $('#slPOLCountries option:selected').val() == $('#slPODCountries option:selected').val() && $('#slPOLCountries option:selected').val() != "")
    //                    swal(strSorry, strImportOrExportWithSameCountriesWarning);
    //                else //check Ports are entered
    //                    if ($('#slPOL option:selected').val() == "" || $('#slPOD option:selected').val() == "")
    //                        swal(strSorry, strEmptyPortsWarning);
    //                    else //check branch is entered
    //var CurrentYear = TodaysDate.getUTCFullYear();
    if ($('#slQuotationEditBranch option:selected').val() == "")
        swal(strSorry, "Please, Select the branch.");
    else //check Salesman is entered
        if ($('#slQuotationSalesman option:selected').val() == "")
            swal(strSorry, "Please, Select the salesman.");
        else //check Client is entered
            if (
                (
                    ($('input[name=cbDirectionType]:checked').val() == 1 && $('#slConsignees option:selected').val() == "") //check Consignee in case of Import
                    || (($('input[name=cbDirectionType]:checked').val() == 2 || $('input[name=cbDirectionType]:checked').val() == 3) && $('#slShippers option:selected').val() == "") //check Shipper in case of Export or 
                )
                && ($("#slSalesLead").val() == null || $("#slSalesLead").val() == "")
                && pDefaults.UnEditableCompanyName != "MIL"
            )
                swal(strSorry, "Please, Select Client.");
            else { //Ports are OK
                var data = {
                    "pID": $("#hQuotationID").val(),
                    "pCodeSerial": $("#hCodeSerial").val(), /*generated automatically*/
                    //"pCode": "Q" + (CurrentYear-2000) + GetDirectionType($('input[name=cbDirectionType]:checked').val()).substring(0, 3)
                    //                + GetTransportType($('input[name=cbTransportType]:checked').val()).substring(0, 2) + $("#hCodeSerial").val(),
                    "pBranchID": $('#slQuotationEditBranch').val(),
                    "pSalesmanID": $('#slQuotationSalesman').val(),
                    "pOperationManID": $('#slOperationEditOperationMan').val(),
                    "pDirectionType": $('input[name=cbDirectionType]:checked').val(),
                    "pDirectionIconName": $("#hDirectionIconName").val(),
                    "pDirectionIconStyle": $("#hDirectionIconStyle").val(),
                    "pTransportType": $('input[name=cbTransportType]:checked').val(),
                    "pTransportIconName": $("#hTransportIconName").val(),
                    "pTransportIconStyle": $("#hTransportIconStyle").val(),
                    "pShipmentType": ($('input[name=cbTransportType]:checked').val() == 2 ? 0 : $('input[name=cbShipmentType]:checked').val()),
                    "pShipperID": ($('#slShippers').val() == "" ? 0 : $('#slShippers').val()),

                    // To be handled (set or removed)
                    "pShipperAddressID": 0,
                    "pShipperContactID": ($('#slShipperContacts').val() == "" ? 0 : $('#slShipperContacts').val()),
                    "pConsigneeID": ($('#slConsignees').val() == "" ? 0 : $('#slConsignees').val()),

                    // To be handled (set or removed)
                    "pConsigneeAddressID": 0,
                    "pConsigneeContactID": ($('#slConsigneeContacts').val() == "" ? 0 : $('#slConsigneeContacts').val()),

                    "pAgentID": ($('#slAgents').val() == "" ? 0 : $('#slAgents').val()),

                    // To be handled (set or removed)
                    "pAgentAddressID": 0,
                    "pAgentContactID": (($('#slAgentContacts').val() == "")
                        ? 0 : $('#slAgentContacts').val()),

                    "pIncotermID": 0, //($('#slIncoterms option:selected').val() == "" ? 0 : $('#slIncoterms option:selected').val()),
                    "pCommodityID": 0, //($('#slCommodities').val() == "" ? 0 : $('#slCommodities').val()),
                    "pTransientTime": 0, //($("#txtTransientTime").val() == "" ? 0 : $("#txtTransientTime").val()),
                    "pValidity": 0, //($("#txtValidity").val() == "" ? 0 : $("#txtValidity").val()),
                    "pFreeTime": 0, //($("#txtFreeTime").val() == "" ? 0 : $("#txtFreeTime").val()),
                    "pOpenDate": ConvertDateFormat($("#txtOpenDate").val().trim()),//$("#txtOpenDate").val().trim(),
                    "pCloseDate": null,
                    "pExpirationDate": "01-01-1900", //ConvertDateFormat(varExpirationDate), //use convert fn. or not depends on the controller wether its string or datetime
                    //"pExpirationDate": varExpirationDate, //use convert fn. or not depends on the controller wether its string or datetime
                    "pIncludePickup": $("#cbIncludePickup").prop('checked'),
                    "pPickupCityID": 0, //$('#slPickupCity option:selected').val(),
                    // To be handled (set or removed)
                    "pPickupAddressID": 0,
                    "pPOLCountryID": 0, //$('#slPOLCountries option:selected').val(),
                    "pPOL": 0, //$('#slPOL option:selected').val(),
                    "pPODCountryID": 0, //$('#slPODCountries option:selected').val(),
                    "pPOD": 0, //$('#slPOD option:selected').val(),
                    "pShippingLineID": 0, //($('input[name=cbTransportType]:checked').val() == 1 && $('#slLines option:selected').val() != "" ? $('#slLines option:selected').val() : 0),
                    "pAirlineID": 0, //($('input[name=cbTransportType]:checked').val() == 2 && $('#slLines option:selected').val() != "" ? $('#slLines option:selected').val() : 0),
                    "pTruckerID": 0, //($('input[name=cbTransportType]:checked').val() == 3 && $('#slLines option:selected').val() != "" ? $('#slLines option:selected').val() : 0),

                    // To be handled (set or removed)
                    "pIncludeDelivery": $("#cbIncludeDelivery").prop('checked'),
                    "pDeliveryZipCode": 0,
                    "pDeliveryCityID": 0, //$('#slDeliveryCity option:selected').val(),
                    "pDeliveryCountryID": 0,
                    "pGrossWeight": 0,
                    "pVolume": 0,
                    "pChargeableWeight": 0,
                    "pNumberOfPackages": 0,
                    "pIsDangerousGoods": $("#cbDangerousGoods").prop("checked"),
                    // Templates 
                    "pTemplateID": ($('#slQuotationEditTemplate').val() == "" ? 0 : $('#slQuotationEditTemplate').val()),
                    "pSubject": $("#txtQuotationEditSubject").val().trim() == "" ? "0" : $("#txtQuotationEditSubject").val().trimRight(),
                    "pTermsAndConditions": $("#txtQuotationEditTermsAndConditions").val().trim() == "" ? "0" : $("#txtQuotationEditTermsAndConditions").val().trim(),

                    "pTemplateIDTransport": ($('#slQuotationEditTemplateTransport').val() == "" ? 0 : $('#slQuotationEditTemplateTransport').val()),
                    "pSubjectTransport": $("#txtQuotationEditSubjectTransport").val().trim() == "" ? "0" : $("#txtQuotationEditSubjectTransport").val().trimRight(),
                    "pTermsAndConditionsTransport": $("#txtQuotationEditTermsAndConditionsTransport").val().trim() == "" ? "0" : $("#txtQuotationEditTermsAndConditionsTransport").val().trim(),

                    "pTemplateIDClearance": ($('#slQuotationEditTemplateClearance').val() == "" ? 0 : $('#slQuotationEditTemplateClearance').val()),
                    "pSubjectClearance": $("#txtQuotationEditSubjectClearance").val().trim() == "" ? "0" : $("#txtQuotationEditSubjectClearance").val().trimRight(),
                    "pTermsAndConditionsClearance": $("#txtQuotationEditTermsAndConditionsClearance").val().trim() == "" ? "0" : $("#txtQuotationEditTermsAndConditionsClearance").val().trim(),

                    "pDescriptionOfGoods": $("#divGoodsDescription").val().trim().toUpperCase(),
                    "pNotes": $("#txtQuotationNotes").val().trim().toUpperCase(),
                    "pQuotationStageID": $("#hQuotationStageID").val(),
                    "pSalesLeadID": $("#slSalesLead").val() == "" ? 0 : $("#slSalesLead").val(),
                    "pSalesLeadContactID": $("#slSalesLeadContact").val() == "" || $("#slSalesLeadContact").val() == null ? 0 : $("#slSalesLeadContact").val(),
                    "pIsWarehousing": $("#cbIsWarehousing").prop("checked"),
                    "pMainCriteriaID": $("#slMainCriteria").val() == "" ? 0 : $("#slMainCriteria").val(),
                    "pSubCriteriaID": $("#slSubCriteria").val() == "" ? 0 : $("#slSubCriteria").val(),
                    "pExporterID": CheckValueIsValidInput("#slExporter") ? $("#slExporter").val() : 0
                };
                debugger;
                PostInsertUpdateFunction("form", "/api/Quotations/Update", data, pSaveandAddNew, "QuotationsEditModal"
                    , function () {
                        //LoadViews("QuotationsManagement");
                        LoadViews("QuotationsEdit", null, $("#hQuotationID").val());
                        //LoadWithPagingWithWhereClause("/api/QuotationCharges/LoadWithWhereClause", " where QuotationID = " + item.ID, 0, 10, function (pTabelRows) { QuotationCharges_BindTableRows(pTabelRows); });
                    });
            }
}

function Quotations_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblQuotations') != "")
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
                DeleteListFunction("/api/Quotations/Delete", { "pQuotationsIDs": GetAllSelectedIDsAsString('tblQuotations') }, function () {
                    Quotations_LoadingWithPaging(
                        //this is callback in Quotations_LoadingWithPaging
                        //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
                });
                //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
            });
}

function Quotations_ClearAllControls(callback) {
    debugger;
    ClearAll("#QuotationModal");
    FadePageCover(true);
    $("#lblShippers").text("Shipper");
    $(".classShowForWarehousing").addClass("hide");
    $(".classHideForWarehousing").removeClass("hide");
    $("#slMainCriteria").val("");
    $("#slSubCriteria").val("");
    if (pDefaults.UnEditableCompanyName == "FWD") {
        //$("#slShippers").attr("disabled", "disabled");
        //$("#slConsignees").attr("disabled", "disabled");
        $("#slQuotationSalesman").attr("onchange", "SalesmanChanged();");
    }
    CallGETFunctionWithParameters("/api/Quotations/GetModalControls", {}
        , function (pData) {
            var pShipper = pData[0];
            var pConsignee = pData[1];
            var pAgent = pData[2];
            var pSalesmen = pData[3];
            var pSalesLead = pData[4];
            var pOperationMen = pData[5];
            if (pDefaults.UnEditableCompanyName != "FWD") {
                //FillListFromObject(null, 2, "<--Select-->", "slShippers", pShipper, null);
                //FillListFromObject(null, 2, "<--Select-->", "slConsignees", pConsignee, null);
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
                }, 3, 2000, true, {
                    id: 0,
                    text: "<--Select-->"
                });
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
                }, 3, 2000, true, {
                    id: 0,
                    text: "<--Select-->"
                });
                if (pDefaults.UnEditableCompanyName == "NAJ") {
                    Select2OnlineSearch("slExporter", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
                        var query = {
                            pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND Name like N'%" + params.term + "%'",
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
                    }, 3, 2000, true, {
                        id: 0,
                        text: "<--Select-->"
                    });
                } else if (pDefaults.UnEditableCompanyName == "LATT" || pDefaults.UnEditableCompanyName == "LAT") {
                    Select2OnlineSearch("slExporter", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
                        var query = {
                            pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND ID IN (select ID from Customers where DebitorGroupID is not null) AND Name like N'%" + params.term + "%'",
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
                    }, 3, 2000, true, {
                        id: 0,
                        text: "<--Select-->"
                    });
                }
            } else {
                if ($("#slShippers option").length == 0)
                    $('#slShippers').append($('<option>', {
                        value: '',
                        text: '<--Select-->'
                    }));
                if ($("#slConsignees option").length == 0)
                    $('#slConsignees').append($('<option>', {
                        value: '',
                        text: '<--Select-->'
                    }));
            }
            //$("#slShippers").html($("#hReadySlCustomers").html());
            $("#lbShippers").text("Shipper");
            //$("#slConsignees").html($("#hReadySlCustomers").html());

            FillListFromObject(null, 2, "<--Select-->", "slFilterAgent", pAgent, null);
            FillListFromObject(null, 2, "<--Select-->", "slAgents", pAgent, null);
            FillListFromObject(null, 2, "<--Select-->", "slQuotationSalesman", pSalesmen, null);
            FillListFromObject(null, 2, "<--Select-->", "slSalesLead", pSalesLead, null);
            FillListFromObject(null, 2, "<--Select-->", "slOperationEditOperationMan", pOperationMen, null);
            if (pDefaults.UnEditableCompanyName == "UNF") {
                $("#slOperationEditOperationMan").attr("data-required", "true");
            }
            FadePageCover(false);
        }
        , null);
    $("#txtOpenDate").val(ConvertDateFormat(FormattedTodaysDate));
    //$("#txtQuotationExpirationDate").val(TodaysDate.addDays(TodaysDate, 30));
    //Shippers_GetList(null, null);
    //Consignees_GetList(null, null);
    //Agents_GetList(null, null);
    //Quotations_Branches_GetList(null, "slQuotationBranch", null);
    //Quotations_Salesmen_GetList(null, null);
    //Quotations_Countries_GetList(null, null, null);
    //POL_GetList(null, null, null);
    //POD_GetList(null, null, null);
    //ContainerTypes_GetList(null, null);
    //Lines_GetList(null, null);

    $("#slQuotationBranch").html($("#hReadySlBranches").html());
    ActivateUserBranchSelection('slQuotationBranch');
    $("#slQuotationBranch").val($("#hUserBranchID").val());

    $("#cbIsImport").prop('checked', true); //set cbIsImport to the default value
    //$('#QuotationModal #cbIsImport').prop('checked', true);
    DirectionType_SetIconNameAndStyle();//to set the defaults of Import

    $("#cbIsOcean").prop('checked', true); //set cbIsOcean to the default value
    TransportType_SetIconNameAndStyle();

    $("#secShipmentType").removeClass("hide");//show section of Shipment Types radios(FCL,....)
    $("#cbIsFCL").prop('checked', true); //set cbIsFCL to the default value

    if (CustomerAdd) {
        $("#btn-NewAddShipper").removeClass("hide");
        $("#btn-NewAddConsignee").removeClass("hide");
    } else {
        $("#btn-NewAddShipper").addClass("hide");
        $("#btn-NewAddConsignee").addClass("hide");
    }
    /*  if (AgentAdd) $("#btn-NewAddAgent").removeClass("hide"); else $("#btn-NewAddAgent").addClass("hide");*/

    //if (CustomerEdit) {
    //    $("#btn-EditShipper").removeClass("hide");
    //    $("#btn-EditConsignee").removeClass("hide");
    //} else {
    //    $("#btn-EditShipper").addClass("hide");
    //    $("#btn-EditConsignee").addClass("hide");
    //}
    //if (AgentEdit) $("#btn-EditAgent").removeClass("hide"); else $("#btn-EditAgent").addClass("hide");

    //parameter in the next 2 lines are 1:Quotations call, 2:Operations call
    $("#btn-NewAddShipper").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddConsignee").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddAgent").attr("onclick", "Agents_ClearAllControls(1);");

    $("#btn-EditShipper").attr("onclick", "Customers_FillControlsFromQuotations($('#slShippers option:selected').val());");
    $("#btn-EditConsignee").attr("onclick", "Customers_FillControlsFromQuotations($('#slConsignees option:selected').val());");
    $("#btn-EditAgent").attr("onclick", "Agents_FillControlsFromQuotations($('#slAgents option:selected').val(), null, 1);");

    $("#btnSaveQuotation").attr("onclick", "Quotations_Insert(false);");
    $("#btnSaveandNewQuotation").attr("onclick", "Quotations_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}

var pEditedQuotation_General;

//i take here a parameter of a table with just one row instead of ID
function Quotations_FillControls(pData, pCallback) {
    debugger;
    $("#hl-menu-Quotations").parent().siblings().removeClass("active");
    $("#hl-menu-Quotations").parent().addClass("active");

    var pEditedQuotation = JSON.parse(pData[1]);
    pEditedQuotation_General = pEditedQuotation;
    //var pQContainersAndPackages = JSON.parse(pData[2]);
    var pQRoutes = JSON.parse(pData[3]);
    var pCountries = pData[4];
    var pShippingLines = pData[5];
    var pAirlines = pData[6];
    var pTruckers = pData[7];
    var pBranches = pData[8];
    var pUsers = pData[9];
    var pCommodities = pData[10];
    var pShippers = pData[11];
    var pConsignees = pData[12];
    var pShipperContacts = pData[13];
    var pConsigneeContacts = pData[14];
    var pSelectedShipperContact = JSON.parse(pData[15]);
    var pPOL = pData[16];
    var pPOD = pData[17];
    var pCurrencies = pData[18];
    var pQuotationStages = pData[19];
    var pAgents = pData[20];
    var pAgentContacts = pData[21];
    var pSelectedAgentContact = JSON.parse(pData[22]);
    var pChargeSuppliers = pData[23];
    var pTemplates = pData[24];
    var pSelectedConsigneeContact = JSON.parse(pData[25]);
    var pIncoterm = pData[26];
    var pSalesLead = pData[27];
    var pSalesLeadContact = pData[28];
    var pChargeType = pData[29];
    var pMainCriteria = pData[30];
    var pSubCriteria = pData[31];
    var pEquipmentModel = pData[32];
    var pOperationMen = pData[33];
    ////////////////Header//////////////////////
    if (pDefaults.UnEditableCompanyName == "MED") {
        CallGETFunctionWithParameters("api/Quotations/CheckQuotationDraft", { pQuotationID: pEditedQuotation.ID }, function (pData) {
            debugger;
            if (pData[0]) {
                if (pData[1] != 0) { // Quotation is in the approve cycle
                    let QD = JSON.parse(pData[2])[0];
                    if (QD.ConsigneeID != pEditedQuotation.ConsigneeID) {
                        $("#divConsignee label").text(`Consignee (Requested to -> ${pData[3]})`);
                    }
                    if (QD.ConsigneeContactID != pEditedQuotation.ConsigneeContactID) {
                        $("#divConsigneeContacts label").text(`Consignee Contact (Requested to -> ${pData[7]})`);
                    }
                    if (QD.ShipperID != pEditedQuotation.ShipperID) {
                        $("#divShipper label").text(`Shipper (Requested to -> ${pData[4]})`);
                    }
                    if (QD.ShipperContactID != pEditedQuotation.ShipperContactID) {
                        $("#divShipperContacts label").text(`Shipper Contact (Requested to -> ${pData[8]})`);
                    }
                    if (QD.AgentID != pEditedQuotation.AgentID) {
                        $("#divAgent label").text(`Agent (Requested to -> ${pData[5]})`);
                    }
                    if (QD.AgentContactID != pEditedQuotation.AgentContactID) {
                        $("#divAgentContacts label").text(`Agent Contact (Requested to -> ${pData[9]})`);
                    }
                    if (QD.SalesLeadID != pEditedQuotation.SalesLeadID) {
                        $("#divSalesLead label").text(`Sales Lead (Requested to -> ${pData[6]})`);
                    }
                    if (QD.SalesLeadContactID != pEditedQuotation.SalesLeadContactID) {
                        $("#divSalesLeadContacts label").text(`Sales Lead Contact (Requested to -> ${pData[10]})`);
                    }

                    if (QD.TemplateID != pEditedQuotation.TemplateID) {
                        $("#slQuotationEditTemplate").prev().text(`Template (Requested to -> ${pData[11]})`);
                    }
                    if (QD.Subject != pEditedQuotation.TemplateSubject) {
                        $("#txtQuotationEditSubject").prev().text(`Introductory Statement (Requested to -> ${QD.Subject})`);
                    }
                    if (QD.TermsAndConditions != pEditedQuotation.TemplateTermsAndConditions) {
                        $("#txtQuotationEditTermsAndConditions").prev().text(`Terms & Conditions (Requested to -> ${QD.TermsAndConditions})`);
                    }
                    if (QD.BranchID != pEditedQuotation.BranchID) {
                        $("#slQuotationEditBranch").prev().text(`Branch (Requested to -> ${pData[13]})`);
                    }
                    if (QD.SalesmanID != pEditedQuotation.SalesmanID) {
                        $("#slQuotationSalesman").prev().text(`Salesman (Requested to -> ${pData[14]})`);
                    }
                    if (QD.OperationManID != pEditedQuotation.OperationManID) {
                        $("#slOperationEditOperationMan").prev().text(`Operation Man (Requested to -> ${pData[12]})`);
                    }
                    if (QD.Notes != pEditedQuotation.Notes) {
                        $("#txtQuotationNotes").prev().text(`Notes (Requested to -> ${QD.Notes})`);
                    }
                    if (QD.DescriptionOfGoods != pEditedQuotation.DescriptionOfGoods) {
                        $("#divGoodsDescription").prev().text(`Description Of Goods (Requested to -> ${QD.DescriptionOfGoods})`);
                    }
                }
            }
        }, null);
    }

    FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slMainCriteria", pMainCriteria, null);
    FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slSubCriteria", pSubCriteria, null);

    FillListFromObject(null, 2, "SET AS", "ulQuotationStages", pQuotationStages, null);
    //FillListFromObject(null, 12, "Select Partner Type", "slChargeOperationPartnerTypes", pOperationPartnerTypes, null);
    $("#slChargeSupplier").html("<option value=''>Select Partner</option>");
    ////i transferred the next 3 commands to the fill fn of the QuotationCharges to fix the problem that sometimes the controls are empty
    //FillListFromObject(null, 5/*pCodeOrName*/, "Select Supplier", "slChargeSupplier", pChargeSuppliers, function () { $("#slChargeSupplier option[value!=''" + "]").addClass("hide"); }); /*function () { $("#slARFAirline").html($("#slARFSupplier").html()); $("#slARFAirline option[ServiceID!=" + constServiceAirlines + "][value!=''" + "]").addClass("hide"); }*/
    //$("#slChargeCostCurrency").html($("#hReadySlCurrencies").html());
    //$("#slChargeSaleCurrency").html($("#hReadySlCurrencies").html());
    //FillListFromObject(null, 2, "<--Select-->", "slChargeType", pChargeType, null);
    var strShownDirection = "<i class=' fa " + pEditedQuotation.DirectionIconName + " " + pEditedQuotation.DirectionIconStyle + "'/>";
    var strShownTransport = "<i class=' fa " + pEditedQuotation.TransportIconName + " " + pEditedQuotation.TransportIconStyle + "'/>";

    //if (QE) {
    //    //$("#btnSaveQuotation").removeClass("hide"); /*$("#divSetQuotationStage").removeClass("hide");*/
    //}
    //else {
    //    $("#btnSaveQuotation").addClass("hide"); /*$("#divSetQuotationStage").addClass("hide");*/
    //}
    if (QVPar) $("#stepsPartners").removeClass("hide"); else $("#stepsPartners").addClass("hide");
    if (QVRou) $("#stepsRouting").removeClass("hide"); else $("#stepsRouting").addClass("hide");
    if (QVUpl) $("#stepsUploadFiles").removeClass("hide"); else $("#stepsUploadFiles").addClass("hide");

    if (pEditedQuotation.CreatorUserID == pLoggedUser.ID && pDefaults.UnEditableCompanyName == "MED" && pLoggedUser.ID != 4) {
        $("#btn-SendChargesAdded").prop("disabled", true);
    }

    //QVPac is handled in the ShowHidetblQuotationContainersAndPackagesHeaders() of QuotationContainersAndPackages.js
    //if (OA) $("#btn-CreateOperation").removeClass("hide"); else $("#btn-CreateOperation").addClass("hide");

    if (pEditedQuotation.DirectionType == 1) { //the last 2 commands are to set which is primary shipper or consignee
        $("#cbIsImport").prop('checked', true);
        $("#slShippers").attr("data-required", "false");
        $("#slConsignees").attr("data-required", "true");
    }
    if (pEditedQuotation.DirectionType == 2)
        $("#cbIsExport").prop('checked', true);
    if (pEditedQuotation.DirectionType == 3)
        $("#cbIsDomestic").prop('checked', true);
    if (pEditedQuotation.TransportType == 1)
        $("#cbIsOcean").prop('checked', true);
    if (pEditedQuotation.TransportType == 2)
        $("#cbIsAir").prop('checked', true);
    if (pEditedQuotation.TransportType == 3)
        $("#cbIsInland").prop('checked', true);

    //---------------------------------------------
    if (pEditedQuotation.ShipmentType == 1) {
        $("#cbIsFCL").prop('checked', true);
        $('#lblShipmentType').html("FCL");
        $('#lblShipmentType1').html("FCL");
    } else if (pEditedQuotation.ShipmentType == 2) {
        $("#cbIsLCL").prop('checked', true);
        $('#lblShipmentType').html("LCL");
        $('#lblShipmentType1').html("LCL");
    } else if (pEditedQuotation.ShipmentType == 3) {
        $("#cbIsFTL").prop('checked', true);
        $('#lblShipmentType').html("FTL");
        $('#lblShipmentType1').html("FTL");
    } else if (pEditedQuotation.ShipmentType == 4) {
        $("#cbIsLTL").prop('checked', true);
        $('#lblShipmentType').html("LTL");
        $('#lblShipmentType1').html("LTL");
    } else if (pEditedQuotation.ShipmentType == 10) {
        $("#cbIsFlexi").prop('checked', true);
        $('#lblShipmentType').html("Flexi");
        $('#lblShipmentType1').html("Flexi");
    } else if (pEditedQuotation.ShipmentType == 20) {
        $("#cbIsTank").prop('checked', true);
        $('#lblShipmentType').html("Tank");
        $('#lblShipmentType1').html("Tank");
    }

    if (pDefaults.UnEditableCompanyName == "BED")
        $(".classShowForBED").removeClass("hide");



    if (pDefaults.UnEditableCompanyName == 'UNF' && pEditedQuotation.QuotationStageID != 4) {
        $("#btn-ChangeQuotationType").removeClass("hide");
        if (pEditedQuotation.DirectionType == 1) { //the last 2 commands are to set which is primary shipper or consignee
            $("#cbIsImportm").prop('checked', true);

        }
        if (pEditedQuotation.DirectionType == 2)
            $("#cbIsExportm").prop('checked', true);
        if (pEditedQuotation.DirectionType == 3)
            $("#cbIsDomesticm").prop('checked', true);
        if (pEditedQuotation.TransportType == 1)
            $("#cbIsOceanm").prop('checked', true);
        if (pEditedQuotation.TransportType == 2)
            $("#cbIsAirm").prop('checked', true);
        if (pEditedQuotation.TransportType == 3)
            $("#cbIsInlandm").prop('checked', true);

        //---------------------------------------------
        if (pEditedQuotation.ShipmentType == 1) {
            $("#cbIsFCLm").prop('checked', true);

        } else if (pEditedQuotation.ShipmentType == 2) {
            $("#cbIsLCLm").prop('checked', true);

        } else if (pEditedQuotation.ShipmentType == 3) {
            $("#cbIsFTLm").prop('checked', true);

        } else if (pEditedQuotation.ShipmentType == 4) {
            $("#cbIsLTLm").prop('checked', true);

        } else if (pEditedQuotation.ShipmentType == 10) {
            $("#cbIsFlexim").prop('checked', true);

        } else if (pEditedQuotation.ShipmentType == 20) {
            $("#cbIsTankm").prop('checked', true);

        }
    }

    if (pEditedQuotation.IsWarehousing) {
        $("#cbIsWarehousing").prop('checked', true);
        //$(".classShowForWarehousing").removeClass("hide");
        $('#lblShipmentType').html(": Warehousing");
        $('#lblShipmentType1').html(": Warehousing");
        $("#slMoveTypes option:Contains(WAREHOUSING)").val();
        Quotation_cbIsWarehousingChange();
    } else if (pEditedQuotation.IsLoadingDischarging) {
        $("#cbIsLoadingDischarging").prop('checked', true);
        $('#lblShipmentType').html(": Loading Discharging");
        $('#lblShipmentType1').html(": Loading Discharging");
        Quotation_cbIsLoadingDischargingChange();
    } else if (pEditedQuotation.IsPackingRemovals) {
        $("#cbIsPackingRemovals").prop('checked', true);
        $('#lblShipmentType').html(": Packing Removals");
        $('#lblShipmentType1').html(": Packing Removals");
        Quotation_cbIsLoadingDischargingChange();
    } else if (pEditedQuotation.IsSurvey) {
        $("#cbIsSurvey").prop('checked', true);
        $('#lblShipmentType').html(": Survey");
        $('#lblShipmentType1').html(": Survey");
        Quotation_cbIsLoadingDischargingChange();
    } else if (pEditedQuotation.IsLashing) {
        $("#cbIsLashing").prop('checked', true);
        $('#lblShipmentType').html(": Lashing");
        $('#lblShipmentType1').html(": Lashing");
        Quotation_cbIsLoadingDischargingChange();
    }
    if ($("#cbIsAir").prop("checked") || $("#cbIsLCL").prop("checked") || $("#cbIsLTL").prop("checked")) {
        $(".classShowForAirAndLCL").removeClass("hide");
        $(".classHideForAirAndLCL").addClass("hide");
        $(".classShowForFCL").addClass("hide");
        $("#slCargoPackageType").attr("data-required", "true");
        $("#slCargoContainerType").attr("data-required", "false");
    } else {
        $(".classShowForAirAndLCL").addClass("hide");
        $(".classHideForAirAndLCL").removeClass("hide");
        $(".classShowForFCL").removeClass("hide");
        $("#slCargoPackageType").attr("data-required", "false");
        $("#slCargoContainerType").attr("data-required", "true");
    }
    //$('input[name=cbTransportType]:checked').val() //to get value of checked chioce
    $("#hQuotationID").val(pEditedQuotation.ID);
    $("#hCodeSerial").val(pEditedQuotation.CodeSerial);
    $("#hQuotationCode").val(pEditedQuotation.Code);
    $("#hDirectionIconName").val(pEditedQuotation.DirectionIconName);
    $("#hDirectionIconStyle").val(pEditedQuotation.DirectionIconStyle);
    $("#hTransportIconName").val(pEditedQuotation.TransportIconName);
    $("#hTransportIconStyle").val(pEditedQuotation.TransportIconStyle);
    $("#hQuotationStageID").val(pEditedQuotation.QuotationStageID);

    $("#lblQuotationCode").html(": " + pEditedQuotation.Code);
    $("#lblCreationDate").html(":" + GetFullDateTime_DD_MM_YY_hh_mm(pEditedQuotation.CreationDate));
    $("#lblDirection").html(strShownDirection);
    $("#lblTransport").html(strShownTransport);

    $("#lblQuotationCode1").html(": " + pEditedQuotation.Code);
    $("#lblSalesman").html(": " + pEditedQuotation.Salesman);
    if (pDefaults.UnEditableCompanyName == "LATT") {
        $("#lblClient").html(": " + pEditedQuotation.ExporterName
            + " / Email:" + pEditedQuotation.ExporterEmail
        );
    } else {
        $("#lblClient").html(": " + (pEditedQuotation.DirectionType == 1
            ? (pEditedQuotation.ConsigneeName == 0 ? pEditedQuotation.ClientName : pEditedQuotation.ConsigneeName)
            : (pEditedQuotation.ShipperName == 0 ? pEditedQuotation.ClientName : pEditedQuotation.ShipperName)
        )
            + (" / Email:" + pEditedQuotation.ClientEmail)
        );
    }

    $("#lblDirection1").html(strShownDirection);
    $("#lblTransport1").html(strShownTransport);
    //$("#lblSalesman1").html(": " + pEditedQuotation.Salesman);
    $("#lblClient1").html(": " + (pEditedQuotation.DirectionType == 1
        ? (pEditedQuotation.ConsigneeName == 0 ? pEditedQuotation.ClientName : pEditedQuotation.ConsigneeName)
        : (pEditedQuotation.ShipperName == 0 ? pEditedQuotation.ClientName : pEditedQuotation.ShipperName)
    )
    );

    if (pQRoutes.length > 0) {
        $("#lblStage").html(": " + pQRoutes[0].QuotationStageName + (pQRoutes[0].QuotationStageName == "DECLINED" ? ("(" + pQRoutes[0].DenialReason + ")") : ""));
        $("#lblRouting").html(": " + pQRoutes[0].POLCode + " > " + pQRoutes[0].PODCode);
        $("#lblExpirationDate").html(": " + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(pQRoutes[0].ExpirationDate)));
        $("#lblStage1").html(": " + pQRoutes[0].QuotationStageName + (pQRoutes[0].QuotationStageName == "DECLINED" ? ("(" + pQRoutes[0].DenialReason + ")") : ""));
        $("#lblRouting1").html(": " + pQRoutes[0].POLCode + " > " + pQRoutes[0].PODCode);
        $("#lblExpirationDate1").html(": " + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(pQRoutes[0].ExpirationDate)));
    }

    //$("#lblDirection_Quotation").html(strShownDirection);
    //$("#lblTransport_Quotation").html(strShownTransport);
    //$("#lblShipmentType_Quotation").text($("#lblShipmentType").text());
    //$("#lblSalesman_Quotation").html(": " + pEditedQuotation.Salesman);
    //$("#lblClient_Quotation").html(": " + (pEditedQuotation.DirectionType == 1
    //    ? (pEditedQuotation.ConsigneeName == 0 ? pEditedQuotation.ClientName : pEditedQuotation.ConsigneeName)
    //    : (pEditedQuotation.ShipperName == 0 ? pEditedQuotation.ClientName : pEditedQuotation.ShipperName)
    //                            )
    //                        );
    //$("#h6ChargesHeader_Quotation").removeClass("hide");

    ////////////////EOF Header//////////////////////
    ////////////////General/////////////////////////
    $("#txtQuotationCode").val(pEditedQuotation.Code);
    $("#txtOpenedBy").val(pEditedQuotation.OpenedBy);
    $("#txtOpenDate").val(ConvertDateFormat(GetDateWithFormatMDY(pEditedQuotation.OpenDate)));
    //$("#txtQuotationExpirationDate").val(ConvertDateFormat(GetDateWithFormatMDY(pEditedQuotation.ExpirationDate)));
    $("#slQuotationEditBranch").html($("#hReadySlBranches").html());
    ActivateUserBranchSelection('slQuotationEditBranch', pEditedQuotation.BranchID);
    $("#slQuotationEditBranch").val(pEditedQuotation.BranchID);
    $("#slMainCriteria").val(pEditedQuotation.MainCriteriaID == 0 ? "" : pEditedQuotation.MainCriteriaID);
    $("#slSubCriteria").val(pEditedQuotation.SubCriteriaID == 0 ? "" : pEditedQuotation.SubCriteriaID);
    //Quotations_Salesmen_GetList(pEditedQuotation.SalesmanID, null);
    FillListFromObject(pEditedQuotation.SalesmanID, 2/*pCodeOrName*/, null/*pStrFirstRow*/, "slQuotationSalesman", pUsers, null);
    FillListFromObject(pEditedQuotation.OperationManID, 2, "<--Select-->", "slOperationEditOperationMan", pOperationMen, null);
    //Incoterms_GetList(pEditedQuotation.IncotermID, null);
    //Commodities_GetList(pEditedQuotation.CommodityID, null);
    if (pDefaults.UnEditableCompanyName == "NAJ") {
        Select2OnlineSearch("slExporter", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
            var query = {
                pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND Name like N'%" + params.term + "%'",
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
        }, 3, 2000, true, {
            id: 0,
            text: "<--Select-->"
        });

        if ($('#slExporter').find("option[value='" + pEditedQuotation.ExporterID + "']").length) {
            $('#slExporter').val(pEditedQuotation.ExporterID).trigger('change');
        } else {
            let newOption = new Option(pEditedQuotation.ExporterName, pEditedQuotation.ExporterID, true, true);
            $('#slExporter').append(newOption).trigger('change');
        }
    } else if (pDefaults.UnEditableCompanyName == "LATT" || pDefaults.UnEditableCompanyName == "LAT") {
        Select2OnlineSearch("slExporter", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
            var query = {
                pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND ID IN (select ID from Customers where DebitorGroupID is not null) AND Name like N'%" + params.term + "%'",
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
        }, 3, 2000, true, {
            id: 0,
            text: "<--Select-->"
        });

        if ($('#slExporter').find("option[value='" + pEditedQuotation.ExporterID + "']").length) {
            $('#slExporter').val(pEditedQuotation.ExporterID).trigger('change');
        } else {
            let newOption = new Option(pEditedQuotation.ExporterName, pEditedQuotation.ExporterID, true, true);
            $('#slExporter').append(newOption).trigger('change');
        }
    }
    FillListFromObject(null, 2/*pCodeOrName*/, "<--Select-->", "slCommodities", pCommodities, null); //FillListFromObject(pEditedQuotation.CommodityID, 2/*pCodeOrName*/, "Select Commodity", "slCommodities", pCommodities, null);
    FillListFromObject(null, 2/*pCodeOrName*/, "<--Select-->", "slIncoterm", pIncoterm, null);
    FillListFromObject(null, 2/*pCodeOrName*/, "<--Select-->", "slEquipmentModel", pEquipmentModel, null);
    FillListFromObject(pEditedQuotation.TemplateID, 8, "<--Select-->", "slQuotationEditTemplate", pTemplates, null);
    FillListFromObject(pEditedQuotation.TemplateID_Clearance, 8, "<--Select-->", "slQuotationEditTemplateClearance", pTemplates, null);
    FillListFromObject(pEditedQuotation.TemplateID_Transport, 8, "<--Select-->", "slQuotationEditTemplateTransport", pTemplates, null);
    if (pEditedQuotation.TransportType == InlandTransportType) {
        $("#slIncoterm").attr("data-required", "false");
        if (pDefaults.UnEditableCompanyName == "AKS") {
            if (!pEditedQuotation.IsWarehousing && !pEditedQuotation.IsLoadingDischarging && !pEditedQuotation.IsPackingRemovals && !pEditedQuotation.IsSurvey && !pEditedQuotation.IsLashing) {
                $("#divEquipmentModel").removeClass("hide");
            }
        } else {
            if (!pEditedQuotation.IsWarehousing) {
                $("#divEquipmentModel").removeClass("hide");
            }
        }
    }
    //$("#txtTransientTime").val(pEditedQuotation.TransientTime == 0 ? "" : pEditedQuotation.TransientTime);
    //$("#txtValidity").val(pEditedQuotation.Validity == 0 ? "" : pEditedQuotation.Validity);
    //$("#txtFreeTime").val(pEditedQuotation.FreeTime == 0 ? "" : pEditedQuotation.FreeTime);
    $("#txtQuotationEditSubject").val(pEditedQuotation.QuotationSubject == 0
        ? (pEditedQuotation.TemplateSubject == 0 ? "" : pEditedQuotation.TemplateSubject)
        : pEditedQuotation.QuotationSubject);
    $("#txtQuotationEditTermsAndConditions").val(pEditedQuotation.QuotationTermsAndConditions == 0
        ? (pEditedQuotation.TemplateTermsAndConditions == 0 ? "" : pEditedQuotation.TemplateTermsAndConditions)
        : pEditedQuotation.QuotationTermsAndConditions);

    $("#txtQuotationEditSubjectTransport").val(pEditedQuotation.QuotationSubject == 0
        ? (pEditedQuotation.TemplateSubject == 0 ? "" : pEditedQuotation.TemplateSubject)
        : pEditedQuotation.QuotationSubject);
    $("#txtQuotationEditTermsAndConditionsTransport").val(pEditedQuotation.QuotationTermsAndConditions_Transport == 0
        ? (pEditedQuotation.TemplateTermsAndConditions_Transport == 0 ? "" : pEditedQuotation.TemplateTermsAndConditions_Transport)
        : pEditedQuotation.QuotationTermsAndConditions_Transport);

    $("#txtQuotationEditSubjectClearance").val(pEditedQuotation.QuotationSubject_Clearance == 0
        ? (pEditedQuotation.TemplateSubject_Clearance == 0 ? "" : pEditedQuotation.TemplateSubject_Clearance)
        : pEditedQuotation.QuotationSubject_Clearance);
    $("#txtQuotationEditTermsAndConditionsClearance").val(pEditedQuotation.QuotationTermsAndConditions_Clearance == 0
        ? (pEditedQuotation.TemplateTermsAndConditions_Clearance == 0 ? "" : pEditedQuotation.TemplateTermsAndConditions_Clearance)
        : pEditedQuotation.QuotationTermsAndConditions_Clearance);
    $("#txtQuotationNotes").val(pEditedQuotation.Notes);
    ////////////////EOF General/////////////////////////
    ////////////////////Partners////////////////////
    ////Shippers_GetList(pEditedQuotation.ShipperID, null);
    //FillListFromObject(pEditedQuotation.ShipperID, 2/*pCodeOrName*/, null/*"Select Shipper"*/, "slShippers", pShippers, null);
    ////Consignees_GetList(pEditedQuotation.ConsigneeID, null);
    //FillListFromObject(pEditedQuotation.ConsigneeID, 2/*pCodeOrName*/, null/*"Select Consignee"*/, "slConsignees", pConsignees, null);
    $("#slShippers").html($("#hReadySlCustomers").html());
    $("#slShippers").val(pEditedQuotation.ShipperID == 0 ? "" : pEditedQuotation.ShipperID);
    if ($("#slShippers").val() == null)
        FillListFromObject(pEditedQuotation.ShipperID, 2, "Select Shipper", "slShippers", pShippers, null);
    $("#slConsignees").html($("#hReadySlCustomers").html());
    $("#slConsignees").val(pEditedQuotation.ConsigneeID == 0 ? "" : pEditedQuotation.ConsigneeID);
    if ($("#slConsignees").val() == null)
        FillListFromObject(pEditedQuotation.ConsigneeID, 2, "Select Consignee", "slConsignees", pConsignees, null);

    FillListFromObject(pEditedQuotation.AgentID, 2/*pCodeOrName*/, "Select Agent", "slAgents", pAgents, null);
    //ShipperContacts_GetList(pEditedQuotation.ShipperContactID, pEditedQuotation.ShipperID, null);
    FillListFromObject(pEditedQuotation.ShipperContactID, 2/*pCodeOrName*/, null/*"Select Contact"*/, "slShipperContacts", pShipperContacts, null);
    //ConsigneeContacts_GetList(pEditedQuotation.ConsigneeContactID, pEditedQuotation.ConsigneeID, null);
    FillListFromObject(pEditedQuotation.ConsigneeContactID, 2/*pCodeOrName*/, null/*"Select Contact"*/, "slConsigneeContacts", pConsigneeContacts, null);
    FillListFromObject(pEditedQuotation.AgentContactID, 2/*pCodeOrName*/, null/*"Select Contact"*/, "slAgentContacts", pAgentContacts, null);

    FillListFromObject(pEditedQuotation.SalesLeadID, 2/*pCodeOrName*/, "<--Select-->", "slSalesLead", pSalesLead, null);
    //FillListFromObject(pEditedQuotation.SalesLeadContactID == 0 ? "" : pEditedQuotation.SalesLeadContactID, 2/*pCodeOrName*/, "<--Select-->", "slSalesLeadContact", pSalesLeadContact, null);
    Fill_SelectInputAfterLoadData(pSalesLeadContact, "ID", "NameEn", "<--Select-->", "#slSalesLeadContact", pEditedQuotation.SalesLeadContactID);

    if (pEditedQuotation.ShipperContactID != null && pSelectedShipperContact != null)
        //QuotationsEdit_ShipperContactChanged(pEditedQuotation.ShipperContactID);
        Quotations_DisplayContacts(pSelectedShipperContact, 1);
    if (pEditedQuotation.ConsigneeContactID != null && pSelectedConsigneeContact != null)
        //QuotationsEdit_ConsigneeContactChanged(pEditedQuotation.ConsigneeContactID);
        Quotations_DisplayContacts(pSelectedConsigneeContact, 2);
    if (pEditedQuotation.AgentContactID != null && pSelectedAgentContact != null)
        //QuotationsEdit_AgentContactChanged(pEditedQuotation.AgentContactID);
        Quotations_DisplayContacts(pSelectedAgentContact, 3);
    //if ($('input[name=cbDirectionType]:checked').val() == 1) { //we show consignee
    //    $("#divShipper").addClass("hide");
    //    $("#divShipperContacts").addClass("hide");
    //    $("#bodyShipperContactDetails").addClass("hide");
    //    $("#divConsignee").removeClass("hide");
    //    $("#divConsigneeContacts").removeClass("hide");
    //    $("#bodyConsigneeContactDetails").removeClass("hide");
    //}
    //else //show shipper (either export or domestic)
    //{
    //    $("#divShipper").removeClass("hide");
    //    $("#divShipperContacts").removeClass("hide");
    //    $("#bodyShipperContactDetails").removeClass("hide");
    //    $("#divConsignee").addClass("hide");
    //    $("#divConsigneeContacts").addClass("hide");
    //    $("#bodyConsigneeContactDetails").addClass("hide");
    //}

    //if (CustomerAdd) {
    //    //$("#btn-NewAddShipper").removeClass("hide");
    //    //$("#btn-NewAddConsignee").removeClass("hide");
    //} else {
    //    $("#btn-NewAddShipper").addClass("hide");
    //    $("#btn-NewAddConsignee").addClass("hide");
    //}
    //if (AgentAdd) $("#btn-NewAddAgent").removeClass("hide"); else $("#btn-NewAddAgent").addClass("hide");

    //if (CustomerEdit) {
    //    $("#btn-EditShipper").removeClass("hide");
    //    $("#btn-EditConsignee").removeClass("hide");
    //} else {
    //    $("#btn-EditShipper").addClass("hide");
    //    $("#btn-EditConsignee").addClass("hide");
    //}
    //if (AgentEdit) $("#btn-EditAgent").removeClass("hide"); else $("#btn-EditAgent").addClass("hide");

    //parameter in the next 2 lines are 1:Quotations call, 2:Operations call
    $("#btn-NewAddShipper").attr("onclick", "Customers_ClearAllControls(2);");
    $("#btn-NewAddConsignee").attr("onclick", "Customers_ClearAllControls(2);");
    $("#btn-NewAddAgent").attr("onclick", "Agents_ClearAllControls(2);");
    $("#btn-EditShipper").attr("onclick", "Customers_FillControlsFromQuotations($('#slShippers option:selected').val());");
    $("#btn-EditConsignee").attr("onclick", "Customers_FillControlsFromQuotations($('#slConsignees option:selected').val());");
    $("#btn-EditAgent").attr("onclick", "Agents_FillControlsFromQuotations($('#slAgents option:selected').val(), null, 2);");
    ///////////////////EOF Partners/////////////////
    ///////////////////Packages/////////////////
    ////to show, hide according to FCL, LCL, FTL, LTL, Air,.....
    //Quotations_ShipmentTypeChanged();
    //ContainerTypes_GetList(null, null);
    //LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/QuotationContainersAndPackages/LoadWithWhereClause", " where QuotationID = " + pEditedQuotation.ID, 0, 100, function (pTabelRows) { QuotationContainersAndPackages_BindTableRows(pTabelRows); });
    //QuotationContainersAndPackages_BindTableRows(pQContainersAndPackages);
    $("#cbDangerousGoods").prop("checked", pEditedQuotation.IsDangerousGoods);
    $("#divGoodsDescription").val(pEditedQuotation.DescriptionOfGoods == 0 ? "" : pEditedQuotation.DescriptionOfGoods);

    ///////////////////EOF Packages/////////////////

    ////////////////Routing/////////////////////////
    Routings_BindTableRows(pQRoutes);
    ////Quotations_Countries_GetList(pEditedQuotation.POLCountryID, pEditedQuotation.PODCountryID, null);
    //FillListFromObject(pEditedQuotation.POLCountryID, 2/*pCodeOrName*/, "Select Country", "slPOLCountries", pCountries, null);
    //FillListFromObject(pEditedQuotation.PODCountryID, 2/*pCodeOrName*/, "Select Country", "slPODCountries", pCountries, null);

    ////POL_GetList(pEditedQuotation.POL, pEditedQuotation.POLCountryID, null);
    //FillListFromObject(pEditedQuotation.POL, 4/*pCodeOrName*/, "Select POL", "slPOL", pPOL, null);
    ////POD_GetList(pEditedQuotation.POD, pEditedQuotation.PODCountryID, null);
    //FillListFromObject(pEditedQuotation.POD, 4/*pCodeOrName*/, "Select POD", "slPOD", pPOD, null);
    //Lines_GetList((pEditedQuotation.TransportType == 1 ? pEditedQuotation.ShippingLineID
    //    : (pEditedQuotation.TransportType == 2 ? pEditedQuotation.AirlineID : pEditedQuotation.TruckerID))
    //    , null);
    if (pEditedQuotation.TransportType == 1) // Ocean
        FillListFromObject(pEditedQuotation.ShippingLineID, 2/*pCodeOrName*/, "Select Shipping Line", "slLines", pShippingLines, null);
    else if (pEditedQuotation.TransportType == 2) // Airline
        FillListFromObject(pEditedQuotation.AirlineID, 2/*pCodeOrName*/, "Select Airline", "slLines", pAirlines, null);
    else // Trucker
        FillListFromObject(pEditedQuotation.TruckerID, 2/*pCodeOrName*/, "Select Trucker", "slLines", pTruckers, null);

    $("#cbIncludePickup").prop("checked", pEditedQuotation.IncludePickup);
    $("#cbIncludeDelivery").prop("checked", pEditedQuotation.IncludeDelivery);
    //Quotation_cbPickupOrDeliveryChange();//to show hide Delivery and Pickup Cities according to checkboxes
    //PickupCity_GetList(pEditedQuotation.PickupCityID, pEditedQuotation.POLCountryID);
    //DeliveryCity_GetList(pEditedQuotation.DeliveryCityID, pEditedQuotation.PODCountryID);
    //slPickupCity
    ////////////////EOF Routing/////////////////////////

    ////////////////UploadFiles/////////////////////////
    $("#tblUploadedFiles_Quotations tbody").html("");
    Quotations_GeneralUpload_Initialise();
    ////////////////EOF UploadFiles/////////////////////////

    if (pCallback != null && pCallback != undefined)
        pCallback();
}

//used when calling OperationEdit
function Quotations_SaveFilters() {
    debugger;
    //glbQuotationTransportFilter = $("#lbl-filter-ocean").hasClass('active')
    //                         ? 1
    //                         : ($("#lbl-filter-air").hasClass('active')
    //                            ? 2
    //                            : ($("#lbl-filter-inland").hasClass('active') ? 3 : 0)
    //                           );
    //glbQuotationDirectionFilter = $("#lbl-filter-import").hasClass('active')
    //                         ? 1
    //                         : ($("#lbl-filter-export").hasClass('active')
    //                            ? 2
    //                            : ($("#lbl-filter-domestic").hasClass('active') ? 3 : 0)
    //                           );
    //glbQuotationStageFilter = $("#ulQuotationStages").val();
    //glbQuotationTxtSearchFilter = $("#txt-Search").val().trim().toUpperCase();
}

function Quotations_ReloadFilters() {
    debugger;
    //if (glbQuotationTransportFilter == 0) { $("#lbl-filter-AllTransports").addClass("active"); $("#lbl-filter-AllTransports").siblings().removeClass("active"); }
    //else if (glbQuotationTransportFilter == 1) { $("#lbl-filter-ocean").addClass("active"); $("#lbl-filter-ocean").siblings().removeClass("active"); }
    //else if (glbQuotationTransportFilter == 2) { $("#lbl-filter-air").addClass("active"); $("#lbl-filter-air").siblings().removeClass("active"); }
    //else if (glbQuotationTransportFilter == 3) { $("#lbl-filter-inland").addClass("active"); $("#lbl-filter-inland").siblings().removeClass("active"); }

    //if (glbQuotationDirectionFilter == 0) { $("#lbl-filter-AllDirections").addClass("active"); $("#lbl-filter-AllDirections").siblings().removeClass("active"); }
    //else if (glbQuotationDirectionFilter == 1) { $("#lbl-filter-import").addClass("active"); $("#lbl-filter-import").siblings().removeClass("active"); }
    //else if (glbQuotationDirectionFilter == 2) { $("#lbl-filter-export").addClass("active"); $("#lbl-filter-export").siblings().removeClass("active"); }
    //else if (glbQuotationDirectionFilter == 3) { $("#lbl-filter-domestic").addClass("active"); $("#lbl-filter-domestic").siblings().removeClass("active"); }

    //$("#ulQuotationStages").val(glbQuotationStageFilter);

    //$("#txt-Search").val(glbQuotationTxtSearchFilter);
}

function Quotations_GetFilterWhereClause() {
    debugger;
    var pWhereClause = (glbCallingControl == "FleetQuotation" ? "WHERE IsFleet=1 " : "WHERE IsFleet=0 ");
    var pTransportFilter = "";
    var pDirectionFilter = "";
    var pBLTypeFilter = "";
    //var pQuotationStageFilter = ($("#ulFilterQuotationStages").val() == "" ? "" : " AND ( QuotationStageName=N'" + $("#ulFilterQuotationStages option:selected").text() + "')"); //if 0 then all stages

    //if (pQuotationStageFilter != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pQuotationStageFilter;

    if ($("#txtFilterQuotationCode").val().trim() != "") {
        pWhereClause += " AND (CodeSerial =" + $("#txtFilterQuotationCode").val().trim();
        pWhereClause += ")";
    }

    if (pDefaults.UnEditableCompanyName == "MED") {
        if (pLoggedUser.DepartmentID == 10 || pLoggedUser.DepartmentID == 5) {
            pWhereClause += "AND DirectionType = 1 " + " \n";
        }
        else if (pLoggedUser.DepartmentID == 11 || pLoggedUser.DepartmentID == 13) {
            pWhereClause += "AND DirectionType = 2 " + " \n";
        }
    }
    if ($("#slFilterBranch").val() != null && $("#slFilterBranch").val() != "")
        pWhereClause += " AND BranchID =" + $("#slFilterBranch").val();
    if ($("#slFilterCreator").val() != null && $("#slFilterCreator").val() != "")
        pWhereClause += " AND CreatorUserID =" + $("#slFilterCreator").val();
    if ($("#slFilterSalesman").val() != null && $("#slFilterSalesman").val() != "")
        pWhereClause += " AND SalesmanID =" + $("#slFilterSalesman").val();

    if ($("#slFilterDirection").val() != null && $("#slFilterDirection").val() != "")
        pWhereClause += " AND DirectionType =" + $("#slFilterDirection").val();
    if ($("#slFilterTransport").val() != null && $("#slFilterTransport").val() != "")
        pWhereClause += " AND TransportType =" + $("#slFilterTransport").val();

    if ($("#slFilterShipper").val() != null && $("#slFilterShipper").val() != "")
        pWhereClause += " AND ShipperID =" + $("#slFilterShipper").val();
    if ($("#slFilterConsignee").val() != null && $("#slFilterConsignee").val() != "")
        pWhereClause += " AND ConsigneeID =" + $("#slFilterConsignee").val();
    //if ($("#slFilterAgent").val() != null && $("#slFilterAgent").val() != "")
    //    pWhereClause += " AND AgentID =" + $("#slFilterAgent").val();
    if ($("#txtFilterShipperName").val().trim() != "")
        pWhereClause += " AND ShipperName like '%" + $("#txtFilterShipperName").val().trim().toUpperCase() + "%' ";
    if ($("#txtFilterClientName").val().trim() != "")
        pWhereClause += " AND ClientName like '%" + $("#txtFilterClientName").val().trim().toUpperCase() + "%' ";
    if ($("#txtFilterConsigneeName").val().trim() != "")
        pWhereClause += " AND ConsigneeName like '%" + $("#txtFilterConsigneeName").val().trim().toUpperCase() + "%' ";
    if ($("#txtFilterAgentName").val().trim() != "")
        pWhereClause += " AND AgentName like '%" + $("#txtFilterAgentName").val().trim().toUpperCase() + "%' ";

    if ($("#slFilterPOLCountry").val() != null && $("#slFilterPOLCountry").val() != "")
        pWhereClause += " AND POLCountryID =" + $("#slFilterPOLCountry").val();
    if ($("#slFilterPOL").val() != null && $("#slFilterPOL").val() != "")
        pWhereClause += " AND POL =" + $("#slFilterPOL").val();
    if ($("#slFilterPODCountry").val() != null && $("#slFilterPODCountry").val() != "")
        pWhereClause += " AND PODCountryID =" + $("#slFilterPODCountry").val();
    if ($("#slFilterPOD").val() != null && $("#slFilterPOD").val() != "")
        pWhereClause += " AND POD =" + $("#slFilterPOD").val();
    if ($("#txtFilterLineName").val().trim() != "")
        pWhereClause += " AND (ISNULL((SELECT COUNT(vqr.ID) FROM dbo.vwQuotationRoute AS vqr WHERE vqr.QuotationID = vwQuotations.ID AND vqr.LineName LIKE'%" + $("#txtFilterLineName").val().trim().toUpperCase() + "%' ) , 0 ) > 0)";
    if ($("#slFilterShippingLine").val().trim() != "")
        pWhereClause += " AND (ISNULL((SELECT COUNT(vqr.ID) FROM dbo.vwQuotationRoute AS vqr WHERE vqr.QuotationID = vwQuotations.ID AND vqr.ShippingLineID=" + $("#slFilterShippingLine").val() + ") , 0 ) > 0)";

    if ($("#slFilterStatus").val() != null && $("#slFilterStatus").val() != "")
        pWhereClause += " AND QuotationStageName = N'" + $("#slFilterStatus option:selected").text() + "'";

    //if ($("#txtFilterClientName").val().trim() != "")
    //    pWhereClause += " AND ClientName like '%" + $("#txtFilterClientName").val().trim().toUpperCase() + "%' ";

    if (isValidDate($("#txtFilterFromOpenDate").val().trim(), 1)) {
        if ($("#txtFilterFromOpenDate").val() != null && $("#txtFilterFromOpenDate").val() != "")
            pWhereClause += " AND OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromOpenDate").val()) + " 00:00:00.000'";
    }
    if (isValidDate($("#txtFilterToOpenDate").val().trim(), 1)) {
        if ($("#txtFilterToOpenDate").val() != null && $("#txtFilterToOpenDate").val() != "")
            pWhereClause += " AND OpenDate <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToOpenDate").val()) + " 23:59:00.000'";
    }
    /*****************Side Controls***************************/
    if ($("#txtFilterOperationCode").val() != null && $("#txtFilterOperationCode").val() != "") {
        pWhereClause += " AND ID IN (SELECT qr.QuotationID FROM Operations O join QuotationRoute QR on O.QuotationRouteID = QR.ID WHERE O.CodeSerial = " + $("#txtFilterOperationCode").val() + ") ";
    }
    return pWhereClause;
}

function Quotations_TransportTypeChanged() {
    TransportType_SetIconNameAndStyle();
    POL_GetList(null, null);
    POD_GetList(null, null);
    Lines_GetList(null, null);
    Quotations_ShipmentTypeChanged();
}

function Quotations_Copy(pQuotationIDToCopy) {
    debugger;
    swal({
        title: "Are you sure?",
        text: "Quotation will be copied.",
        type: "",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Copy.",
        closeOnConfirm: true
    },
        //callback function in case of success
        function () {
            FadePageCover(true);
            var CurrentYear = TodaysDate.getUTCFullYear();
            var pParametersWithValues = {
                pQuotationIDToCopy: pQuotationIDToCopy
                ,
                pCode: "Q" + (CurrentYear - 2000) + $("#tblQuotations tr[ID=" + pQuotationIDToCopy + "] td.Code").text().substring(3, 8)
            };
            CallGETFunctionWithParameters("/api/Quotations/Quotation_Copy", pParametersWithValues
                , function (pData) {
                    var pCopiedQuotationID = pData[0];
                    SwitchToQuotationsEditView(pCopiedQuotationID);
                }
                , null);
        });
}

///////////////////////////////////////Quotations Modal Functions (some are called from Quotations)//////////
//show and hide the order details with FCl, LCL, FTL, LTL, Air, .... changes
function Quotations_ShipmentTypeChanged() {
    debugger;
    if ($('input[name=cbTransportType]:checked').val() == 2)//Air
    {
        $("#divFCL").addClass("hide");
        $("#divLCL").removeClass("hide");
        $("#lblWtMsr").addClass("hide");
        $("#lblChargeableWeight").removeClass("hide");
    } else // Ocean or Inland
        if ($('input[name=cbShipmentType]:checked').val() == 1 //FCL or FTL
            || $('input[name=cbShipmentType]:checked').val() == 3) {
            $("#divLCL").addClass("hide");
            $("#divFCL").removeClass("hide");
        } else {
            $("#divFCL").addClass("hide");
            $("#divLCL").removeClass("hide");
            $("#lblChargeableWeight").addClass("hide");
            $("#lblWtMsr").removeClass("hide");
        }
}

function Quotations_Branches_GetList(pID, pSlName, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    //GetListWithName(pID, "/api/Branches/LoadAll", "Select Branch", "slQuotationBranch");
    GetListWithNameAndWhereClause((pID == null || pID == undefined ? $("#hUserBranchID").val() : pID), "/api/Branches/LoadAll", "Select Branch", pSlName, " ORDER BY Name ");
}

function Quotations_Salesmen_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithNameAndWhereClause(pID, "/api/Users/LoadAll", "Select Salesman", "slQuotationSalesman", "ORDER BY Name");
}

//fill slPOLCountries and slPODCountries
function Quotations_Countries_GetList(pPOLCountryID, pPODCountryID, callback) {//pID is used in case of editing to set the code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pPOLCountryID, "/api/Countries/LoadAll", "Select Country", "slPOLCountries");
    GetListWithName(pPODCountryID, "/api/Countries/LoadAll", "Select Country", "slPODCountries");
}

//fill slPOL , pDontCallFillOtherSidePorts: is used to handle Domestic
function POL_GetList(pID, pCountryID, pDontCallFillOtherSidePorts) {//pID is used in case of editing to set the code or name
    debugger;
    //parameters: ID, strFnName, First Row in select list, select list name, pWhereClause
    var pWhereClause = "";
    if (pCountryID != null) //this means editing
    {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = " + pCountryID;
    } else //when changing the Country or Transport Type
    {
        pWhereClause = " WHERE IsPort = 1 AND IsInactive = 0 AND CountryID = ";
        pWhereClause += ($('#slPOLCountries option:selected').val() == null || $('#slPOLCountries option:selected').val() == ""
            ? 0 : $('#slPOLCountries option:selected').val());
    }
    if ($('input[name=cbTransportType]:checked').val() == 1)
        pWhereClause += " AND IsOcean = 1 ";
    if ($('input[name=cbTransportType]:checked').val() == 2)
        pWhereClause += " AND IsAir = 1 ";
    if ($('input[name=cbTransportType]:checked').val() == 3)
        pWhereClause += " AND IsInland = 1 ";

    pWhereClause += " order by Code ";
    //GetListWithCodeAndWhereClause(pID, "/api/Ports/LoadAll", "Select POL", "slPOL", pWhereClause);
    GetListWithCodeAndNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POL", "slPOL", pWhereClause);
    //in case of domestic set POLCountry = PODCountry
    if ($('input[name=cbDirectionType]:checked').val() == 3 && pCountryID == null) {
        $('#slPODCountries option[value=' + $('#slPOLCountries option:selected').val() + ']').attr('selected', 'selected');
        if (pDontCallFillOtherSidePorts != 1) // if pDontCallFillOtherSidePorts ==1 then dont call the other port GetList to avoid open loop
            POD_GetList(pID, $('#slPOLCountries option:selected').val(), 1);
    }
    //to fill the pickup address
    //PickupCity_GetList(null, $('#slPOLCountries option:selected').val());
    PickupCity_GetList(null, pCountryID);
}

//fill slPOD , pDontCallFillOtherSidePorts: is used to handle Domestic (they could be put in one function with a flag to know who's calling)
function POD_GetList(pID, pCountryID, pDontCallFillOtherSidePorts) {//pID is used in case of editing to set the code or name
    //parameters: ID, strFnName, First Row in select list, select list name, pWhereClause
    var pWhereClause = "";
    debugger;
    if (pCountryID != null) //this means editing
    {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = " + pCountryID;
    } else //when changing the Country or Transport Type
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

    pWhereClause += " order by Code ";
    //GetListWithCodeAndWhereClause(pID, "/api/Ports/LoadAll", "Select POD", "slPOD", pWhereClause);
    GetListWithCodeAndNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POD", "slPOD", pWhereClause);
    //in case of domestic set POLCountry = PODCountry
    if ($('input[name=cbDirectionType]:checked').val() == 3 && pCountryID == null) {
        $('#slPOLCountries option[value=' + $('#slPODCountries option:selected').val() + ']').attr('selected', 'selected');
        if (pDontCallFillOtherSidePorts != 1) // if pDontCallFillOtherSidePorts ==1 then dont call the other port GetList to avoid open loop
            POL_GetList(pID, $('#slPODCountries option:selected').val(), 1);
    }
    ////to fill the Delivery address
    //DeliveryCity_GetList(null, $('#slPODCountries option:selected').val());
    DeliveryCity_GetList(null, pCountryID);
}

//all the commented COMMAND lines are to remove the IsPort condition, if u wanna return it back again just remove the comments of commands and comment the beside command if exists
function PickupCity_GetList(pID, pCountryID) {//the first parameter is used in case of editing to set the code or name to its original value
    var pWhereClause = "";
    if (pCountryID != null) //this means editing
    {
        //pWhereClause = " where IsPort = 0 AND IsInactive = 0 and CountryID = " + pCountryID;
        pWhereClause = " where IsInactive = 0 and CountryID = " + pCountryID;
    } else //when changing the Country or Transport Type
    {
        //pWhereClause = " where IsPort = 0 AND IsInactive = 0 and CountryID = ";
        pWhereClause = " where IsInactive = 0 and CountryID = ";
        pWhereClause += ($('#slPOLCountries option:selected').val() == null || $('#slPOLCountries option:selected').val() == ""
            ? 0 : $('#slPOLCountries option:selected').val());
    }
    //parameters: ID, strFnName, First Row in select list, select list name
    //GetListWithNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select Pickup City", "slPickupCity", pWhereClause);
    GetListWithCodeAndNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select Pickup City", "slPickupCity", pWhereClause);
}

//all the commented COMMAND lines are to remove the IsPort condition, if u wanna return it back again just remove the comments of commands and comment the beside command if exists
function DeliveryCity_GetList(pID, pCountryID) {//the first parameter is used in case of editing to set the code or name to its original value
    var pWhereClause = "";
    if (pCountryID != null) //this means editing
    {
        //pWhereClause = " where IsPort = 0 AND IsInactive = 0 and CountryID = " + pCountryID;
        pWhereClause = " where IsInactive = 0 and CountryID = " + pCountryID;
    } else //when changing the Country or Transport Type
    {
        //pWhereClause = " where IsPort = 0 AND IsInactive = 0 and CountryID = ";
        pWhereClause = " where IsInactive = 0 and CountryID = ";
        pWhereClause += ($('#slPODCountries option:selected').val() == null || $('#slPODCountries option:selected').val() == ""
            ? 0 : $('#slPODCountries option:selected').val());
    }
    //parameters: ID, strFnName, First Row in select list, select list name
    //GetListWithNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select Delivery City", "slDeliveryCity", pWhereClause);
    GetListWithCodeAndNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select Delivery City", "slDeliveryCity", pWhereClause);
}

function Lines_GetList(pID, callback) {
    //parameters: ID, strFnName, First Row in select list, select list name
    var strFnName = "";
    var str1stRow = "";
    var pWhereClause = " WHERE 1=1 ORDER BY Name ";
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
    if ($('input[name=cbRoutingTransportType]:checked').val() != 2)
        GetListWithNameAndWhereClause(pID, strFnName, str1stRow, "slLines", pWhereClause);
    else //incase of Air to get the prefix for MAWB
        GetListWithNameAndPrefixAttr(pID, strFnName, str1stRow, "slLines", pWhereClause);
}

function Incoterms_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pID, "/api/Incoterms/LoadAll", "Select Incoterm", "slIncoterms");
}

function Commodities_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pID, "/api/Commodities/LoadAll", "Select Commodity", "slCommodities");
}

function MoveTypes_GetList(pID, pSlName, pCallback) {
    debugger;
    pWhereClause = "";
    //if ($("#cbIsOcean").prop("checked"))
    //    pWhereClause = "WHERE IsOcean=1";
    //else if ($("#cbIsAir").prop("checked"))
    //    pWhereClause = "WHERE IsAir=1";
    //else if ($("#cbIsInland").prop("checked"))
    //    pWhereClause = "WHERE IsInland=1";
    //else
    pWhereClause = "WHERE 1=1";
    pWhereClause += " ORDER BY Name";
    GetListWithNameAndWhereClause(pID, "/api/MoveTypes/LoadAll", "Select Service Scope", pSlName, pWhereClause, pCallback);
}

///////////////////////////////////////EOF Quotations Modal Functions (some are called from Quotations)//////////

///////////////////////////////////////Partners Tab Functions///////////////////////////////////////////////
function Shippers_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    var pWhereClause = "";

    pWhereClause = " WHERE IsShipper=1 ";
    CallGETFunctionWithParameters("/api/Customers/LoadAllWithMinimalColumns"
        , { pWhereClauseWithMinimalColumns: pWhereClause, pOrderBy: "Name" }
        , function (pData) {
            FillListFromObject(pID, 2, "Select Shipper", "slShippers", pData[0], null)
        }
        , null);
}

function Consignees_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    var pWhereClause = "";

    pWhereClause = " WHERE IsConsignee=1 ";
    CallGETFunctionWithParameters("/api/Customers/LoadAllWithMinimalColumns"
        , { pWhereClauseWithMinimalColumns: pWhereClause, pOrderBy: "Name" }
        , function (pData) {
            FillListFromObject(pID, 2, "Select Consignee", "slConsignees", pData[0], null)
        }
        , null);
}

function Agents_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    var pWhereClause = "";

    pWhereClause = " WHERE 1 = 1 ";
    pWhereClause += " ORDER BY Name ";
    GetListWithNameAndWhereClause(pID, "/api/Agents/LoadAll", "Select Agent", "slAgents", pWhereClause);
}

// i added to its name 'Quotations_' to differentiate from the other fn in Customers
function Customers_FillControlsFromQuotations(pID, callback) {
    debugger;
    intPartnerTypeID = 1;
    if (pID == "") { //no selected client to edit so hide the modal
        //$("#CustomerModal").modal("show");
        swal(strPlease, "Select a Client.");
        $("#CustomerModal").addClass("hide");
    } else {
        $("#CustomerModal").removeClass("hide");
        //$("#btnClose").attr("onclick", "Customers_UnlockRecord(1);");//to handle the problem of restarting if unlocked
        //Check("/api/Customers/CheckRow", { 'pID': pID }, function () {
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Customers/LoadAll", " where ID = " + pID, 0, 10, function (pTabelRows) {   //i am sure i ve just 1 row isa
            $.each(pTabelRows, function (i, item) {
                //next line is to check if row is locked by another user

                // Fill All Modal Controls
                debugger;
                $("#hID").val(pID);

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
                $("#txtForeignExporterNo").val(item.ForeignExporterNo);
                GetListWithName(item.ForeignExporterCountryID, "/api/Countries/LoadAll", "Select", "slForeignExporterCountry")
                //the next line is to get the Customer addresses and Contacts info (PartnerTypeID for Customers is 8)
                Addresses_LoadWithPagingWithWhereClause(intPartnerTypeID);
                Contacts_LoadWithPagingWithWhereClause(intPartnerTypeID);
                debugger;

                $("#lblShown").html(": " + item.Name);
                $("#txtCode").val(item.Code);
                $("#txtName").val(item.Name);
                $("#txtLocalName").val(item.LocalName == 0 ? "" : item.LocalName);
                $("#txtWebsite").val(item.Website == 0 ? "" : item.Website);
                $("#txtCustomerEmail").val(item.Email == 0 ? "" : item.Email);
                $("#btnVisitWebsite").attr('href', 'http://' + $("#txtWebsite").val());
                $("#cbIsConsignee").prop('checked', item.IsConsignee);
                $("#cbIsShipper").prop('checked', item.IsShipper);
                $("#cbIsInternalCustomer").prop('checked', item.IsInternalCustomer);
                $("#cbIsInactive").prop('checked', item.IsInactive);
                $("#txtNotes").val(item.Notes == 0 ? "" : item.Notes);
                $("#txtCustomerAddress").val(item.Address);
                $("#txtCustomerPhonesAndFaxes").val(item.PhonesAndFaxes);
                $("#txtVATNumber").val(item.VATNumber == 0 ? "" : item.VATNumber);
                $("#cbIsConsolidatedInvoice").prop('checked', item.IsConsolidatedInvoice);
                $("#txtBankName").val(item.BankName == 0 ? "" : item.BankName);
                $("#txtBankAddress").val(item.BankAddress == 0 ? "" : item.BankName);
                $("#txtSwift").val(item.Swift == 0 ? "" : item.Swift);
                $("#txtBankAccountNumber").val(item.BankAccountNumber == 0 ? "" : item.BankAccountNumber);
                $("#txtIBANNumber").val(item.IBANNumber == 0 ? "" : item.IBANNumber);

                //this 2nd flag in Customers_Update, and the flag in the Customers_UnloclRecord are true when called from outside the form not to load the table
                $("#btnSave").attr("onclick", "Customers_Update(false,2);");
                $("#btnSaveandNew").attr("onclick", "Customers_Update(true,2);");
                //$("#btnClose").attr("onclick", "Customers_UnlockRecord(1);");

                //to set the wizard to BasicData
                $("#stepsBasicData").parent().children().removeClass("active");
                $("#stepsBasicData").addClass("active");
                $("#BasicData").parent().children().removeClass("active");
                $("#BasicData").addClass("active");
                //to hide Contacts and Addresses tabs in case of partner is not saved yet
                Customers_ShowHideTabs();
            });
        });
        //});
        if (callback != null && callback != "undefined")
            callback(); // to reload the selectbox with the new values
    }
}

//the 3rd parameter: 3 means called from operationPartners, 2 means add new operation
function Agents_FillControlsFromQuotations(pID, callback, pWhoIsCalling) {
    debugger;
    intPartnerTypeID = 2;
    if (pID == "") { //no selected client to edit so hide the modal
        //$("#AgentModal").modal("show");
        swal(strPlease, "Select an agent.");
        $("#AgentModal").addClass("hide");
    } else {
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
    debugger;
    var pWhereClause = "";

    pWhereClause = " WHERE PartnerTypeID = 1 "; //PartnerTypeID = 1 for Customers
    pWhereClause += " AND PartnerID = " + pShipperID;
    pWhereClause += " ORDER BY Name ";
    GetListWithNameAndWhereClause(pID, "/api/Contacts/LoadAll", null/*"Select Shipper Contact"*/, "slShipperContacts", pWhereClause
        , function () {
            QuotationsEdit_ShipperContactChanged();
        });
    if (callback != null)
        callback();
}

function ConsigneeContacts_GetList(pID, pConsigneeID, callback) { //pID(i.e. the ContactID) is used in case of editing to set the code or name to its original value, 2nd parameter is the (PartnerID)
    //parameters: ID, strFnName, First Row in select list, select list name
    var pWhereClause = "";

    pWhereClause = " WHERE PartnerTypeID = 1 "; //PartnerTypeID = 1 for Customers
    pWhereClause += " AND PartnerID = " + pConsigneeID;
    pWhereClause += " ORDER BY Name ";
    GetListWithNameAndWhereClause(pID, "/api/Contacts/LoadAll", null/*"Select Consignee Contact"*/, "slConsigneeContacts", pWhereClause
        , function () {
            QuotationsEdit_ConsigneeContactChanged();
        });
    if (callback != null)
        callback();
}

function AgentContacts_GetList(pID, pAgentID, callback) { //pID(i.e. the ContactID) is used in case of editing to set the code or name to its original value, 2nd parameter is the (PartnerID)
    //parameters: ID, strFnName, First Row in select list, select list name
    var pWhereClause = "";

    pWhereClause = " WHERE PartnerTypeID = 2 "; //PartnerTypeID = 1 for Agents
    pWhereClause += " AND PartnerID = " + pAgentID;
    pWhereClause += " ORDER BY Name ";
    GetListWithNameAndWhereClause(pID, "/api/Contacts/LoadAll", null/*"Select Agent Contact"*/, "slAgentContacts", pWhereClause
        , function () {
            QuotationsEdit_AgentContactChanged();
        });
    if (callback != null)
        callback();
}

//Refill Shipper Contacts in QuotationsEdit onChange
function QuotationsEdit_ShipperChanged() {
    debugger;
    ShipperContacts_GetList(null, ($('#slShippers option:selected').val() == "" ? 0 : $('#slShippers option:selected').val()), null);
    $("#bodyShipperContactDetails").html("");
}

//Refill Consignee Contacts in QuotationsEdit onChange
function QuotationsEdit_ConsigneeChanged() {
    ConsigneeContacts_GetList(null, ($('#slConsignees option:selected').val() == "" ? 0 : $('#slConsignees option:selected').val()), null);
    $("#bodyConsigneeContactDetails").html("");
}

//Refill Agent Contacts in QuotationsEdit onChange
function QuotationsEdit_AgentChanged() {
    AgentContacts_GetList(null, ($('#slAgents option:selected').val() == "" ? 0 : $('#slAgents option:selected').val()), null);
    $("#bodyAgentContactDetails").html("");
}

function QuotationsEdit_SalesLeadChanged() {
    $("#slSalesLeadContact").html("<option value=0><--Select--></option>");
    if ($('#slSalesLead').val() != "") {
        FadePageCover(true);
        var pWhereClause = " WHERE CRM_ClientsID = " + $('#slSalesLead').val();
        CallGETFunctionWithParameters("/api/CRM_ContactPersons/LoadAll", { pWhereClause: pWhereClause }
            , function (pData) {
                Fill_SelectInputAfterLoadData(pData[0], "ID", "NameEn", null/*"<--Select-->"*/, "#slSalesLeadContact", 0);
                FadePageCover(false);
            }
            , null);
    }
}

//On Changing Shipper Contact then refill contact details
function QuotationsEdit_ShipperContactChanged(pShipperContactID) {
    var pWhereClause = " WHERE ID = "
        + ($('#slShipperContacts option:selected').val() == "" || $('#slShipperContacts option:selected').val() == undefined
            ? (pShipperContactID == null ? 0 : pShipperContactID)
            : $('#slShipperContacts option:selected').val());
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Contacts/LoadWithPaging", pWhereClause, 1, 100, function (pTabelRows) {
        Quotations_DisplayContacts(pTabelRows, 1)/*2nd parameter 1:shipper, 2:consignee*/;
    });
}

//On Changing Consignee Contact then refill contact details
function QuotationsEdit_ConsigneeContactChanged(pConsigneeContactID) {
    var pWhereClause = " WHERE ID = "
        + ($('#slConsigneeContacts option:selected').val() == "" || $('#slConsigneeContacts option:selected').val() == undefined
            ? (pConsigneeContactID == null ? 0 : pConsigneeContactID)
            : $('#slConsigneeContacts option:selected').val());
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Contacts/LoadWithPaging", pWhereClause, 1, 100, function (pTabelRows) {
        Quotations_DisplayContacts(pTabelRows, 2)/*2nd parameter 1:shipper, 2:consignee*/;
    });
}

//On Changing Agent Contact then refill contact details
function QuotationsEdit_AgentContactChanged(pAgentContactID) {
    var pWhereClause = " WHERE ID = "
        + ($('#slAgentContacts option:selected').val() == "" || $('#slAgentContacts option:selected').val() == undefined
            ? (pAgentContactID == null ? 0 : pAgentContactID)
            : $('#slAgentContacts option:selected').val());
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Contacts/LoadWithPaging", pWhereClause, 1, 100, function (pTabelRows) {
        Quotations_DisplayContacts(pTabelRows, 3)/*2nd parameter 1:shipper, 2:Consignee, 3:Agent*/;
    });
}

//display Contact selected in a div
function Quotations_DisplayContacts(pTabelRows, pWhoCalled) { //pWhoCalled = 1 for Shipper and 2 for Consignee and 3 for Agent (i used this to choose which div to set)
    var strContacts = ""; // i will have only one conact isa
    debugger;
    $.each(pTabelRows, function (i, item) {//the attr name ContactVal is used just in this div coz the ID might be repeated for other divs adresses,contcts
        //strContacts += ' <textarea class="ContactsTextArea" disabled="disabled"> ';
        strContacts += ' <div contenteditable="false" class="textDivQuotations" ContactVal="' + item.ID + '" Name="' + item.Name + '" LocalName="' + item.LocalName + '" Phone1="' + item.Phone1 + '" Phone2="' + item.Phone2 + '" Mobile1="' + item.Mobile1 + '" Mobile2="' + item.Mobile2 + '" Fax="' + item.Fax + '" Email="' + item.Email + '"> ';
        //strContacts += ' <a onclick="Contacts_DeleteList(' + item.ID + ');" class="btn btn-xs btn-rounded btn-danger float-right"><i class="fa " style="padding-right:0px!Important;">X</i></a> ';
        //strContacts += ' <a data-toggle="modal" data-target="#ContactModal" onclick="Contacts_FillControls(' + item.ID + ');" class="btn btn-xs btn-rounded btn-primary float-right"><i class="fa fa-pencil"></i></a> ';
        strContacts += ' <span class = "static-text-primary"><b> ' + (item.Name == '' ? '' : '&nbsp;&nbsp;&nbsp;&nbsp; Name: ' + item.Name + ' </b></span> </br> ');
        strContacts += (item.Phone1 == '' ? '' : '&nbsp;&nbsp;&nbsp;&nbsp; Phone1: ' + item.Phone1 + ' </br> ');
        strContacts += (item.Phone2 == '' ? '' : '&nbsp;&nbsp;&nbsp;&nbsp; Phone2: ' + item.Phone2 + ' </br> ');
        strContacts += (item.Mobile1 == '' ? '' : '&nbsp;&nbsp;&nbsp;&nbsp; Mobile: ' + item.Mobile1 + ' </br> ');
        //strContacts += (item.Mobile2 == '' ? ' </br> ' : ' Mobile2: ' + item.Mobile2 + ', </br> ');
        strContacts += (item.Fax == '' ? ' </br> ' : '&nbsp;&nbsp;&nbsp;&nbsp; Fax: ' + item.Fax + ' </br> ');
        strContacts += (item.Email == '' ? '' : '&nbsp;&nbsp;&nbsp;&nbsp; Email: ' + item.Email + ' </br> ');
        strContacts += ' </div> ';
    });
    if (pWhoCalled == 1)
        $("#bodyShipperContactDetails").html(strContacts);
    else if (pWhoCalled == 2)
        $("#bodyConsigneeContactDetails").html(strContacts);
    else if (pWhoCalled == 3)
        $("#bodyAgentContactDetails").html(strContacts);
    //ApplyPermissions();
}

function QuotationsEdit_TemplateChanged(pCallerId) {
    debugger;
    var CallerName;
    if (pCallerId == 1) {
        CallerName = "";
    } else if (pCallerId == 2) {
        CallerName = "Transport";
    } else if (pCallerId == 3) {
        CallerName = "Clearance";
    }

    if ($("#slQuotationEditTemplate" + CallerName).val() != "") {
        $("#txtQuotationEditSubject" + CallerName).val($("#slQuotationEditTemplate" + CallerName + " option:selected").attr("Subject"));
        $("#txtQuotationEditTermsAndConditions" + CallerName).val($("#slQuotationEditTemplate" + CallerName + " option:selected").attr("TermsAndConditions"));
    } else {
        $("#txtQuotationEditSubject" + CallerName).val("");
        $("#txtQuotationEditTermsAndConditions" + CallerName).val("");
    }
}

function QuotationsEdit_GetReceivedCotactEmails(pOption) {
    debugger;
    $("#lblShownItems").html(" Receptionists");
    $("#divCheckboxesList").html("");
    jQuery("#CheckboxesListModal").modal("show");
    var pStrFnName = "/api/Contacts/LoadWithPaging";
    var pDivName = "divCheckboxesList";
    var pCheckboxNameAttr = "cbAddedItemID";
    $("#btnCheckboxesListApply").text("Send");
    $("#btnCheckboxesListApply").attr("onclick", "QuotationsEdit_Print(" + '"Email"' + ");");

    var pWhereClause = "WHERE Email<>'' AND Email IS NOT NULL" + " \n";
    if ($("#slAgents").val() != "" || $("#slConsignees").val() != "" || $("#slShippers").val() != "") {
        pWhereClause += " AND (1=2" + " \n";
        if ($("#slAgents").val() != "")
            pWhereClause += "   OR PartnerID=" + $("#slAgents").val() + " AND PartnerTypeID=" + constAgentPartnerTypeID + " \n";
        if ($("#slConsignees").val() != "")
            pWhereClause += "   OR (PartnerID=" + $("#slConsignees").val() + " AND PartnerTypeID=" + constCustomerPartnerTypeID + ")" + " \n";
        if ($("#slShippers").val() != "")
            pWhereClause += "   OR (PartnerID=" + $("#slShippers").val() + " AND PartnerTypeID=" + constCustomerPartnerTypeID + ")" + " \n";
        pWhereClause += ")" + " \n";
    }
    var pControllerParameters = {
        pPageNumber: 1
        , pPageSize: 999999
        , pWhereClause: pWhereClause
    };
    FadePageCover(true);
    GetListAsCheckboxesWithVariousParameters(pStrFnName, pControllerParameters, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#" + pDivName, $("#txtSearchItems").val().trim());
            FadePageCover(false);
        }
        , 5/*Email*/
        , 4/*ColSize*/);
}

function QuotationsEdit_Print(pOption) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "CAR") {
        $('#cbNotesToOpera').prop('checked', true);
    } else {
        $('#cbNotesToOpera').prop('checked', false);
    }
    var pSelectedIDs = GetAllSelectedIDsAsString("tblRoutings");

    if (pOption == "PrintAdditionalContainer") //for Bedaya
        pSelectedIDs = $("#hQuotationRouteID").val();

    var pIsExpired = false;
    var pIsAccepted = true;
    var pIsApproved = true;
    for (var i = 0; i < pSelectedIDs.split(',').length; i++) {
        if (Date.prototype.compareDates(FormattedTodaysDate
            , ConvertDateFormat($("#tblRoutings tbody tr[ID=" + pSelectedIDs.split(',')[i] + "] td.ExpirationDate").text())) <= 0)
            pIsExpired = true;
        if ($("#tblRoutings tbody tr[ID=" + pSelectedIDs.split(',')[i] + "] td.QuotationStageID").text() != "ACCEPTED")
            pIsAccepted = false;
        if (!$("#cbIsRevised" + pSelectedIDs.split(',')[i]).prop("checked")
            && (pDefaults.UnEditableCompanyName == "MED" || pDefaults.UnEditableCompanyName == "BED" || pDefaults.UnEditableCompanyName == "GBL" || pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG" || pDefaults.UnEditableCompanyName == "MAN"))
            pIsApproved = false;
    }
    if (pSelectedIDs == "")
        swal("Sorry", "Please, select at least one offer.");
    else if (pIsExpired && pDefaults.UnEditableCompanyName != "MED")
        swal("Sorry", "You can not include expired quotations in the offer.");
    else if (!pIsApproved && pDefaults.UnEditableCompanyName != "MED")
        swal("Sorry", "Offer must be approved.");
    else if (!pIsApproved && pDefaults.UnEditableCompanyName != "MAN")
        swal("Sorry", "Offer must be approved.");
    else {
        //if (pDefaults.UnEditableCompanyName == "QUO") {
        //    QuoQuotations("Rep_QOUQuotations", "WHERE QuotationRouteID IN (" + pSelectedIDs + ")", "Print")
        //} else {
        if (pDefaults.UnEditableCompanyName == "GHA") {
            $("#spPickupAddress").text("Brand");
            $("#spDeliveryAddress").text("Model");
        }
        if (pDefaults.UnEditableCompanyName == "MAY") {
            $(".showForMAY").removeClass("hide");
            $("#cbPrintQuotationCode").prop('checked', true);
        }

        if (pDefaults.UnEditableCompanyName == "UNF") {
            $("#PolTransportAdd").removeClass("hide");
            $("#OperationNoteAdd").removeClass("hide");
            $("#cbOperationNote").prop('checked', false);
            $("#cbPrintNotes").prop('checked', false);
            $("#cbCommodity").prop('checked', true);
            $("#cbPOL").prop('checked', true);
            $("#cbPOD").prop('checked', true);
            $("#cbFreeTimePOL").prop('checked', false);
            $("#cbFreeTimePOD").prop('checked', false);
            $("#cbPickupAddress").prop('checked', true);
            $("#cbDeliveryAddress").prop('checked', false);
            $("#cbPrintDemurrage").prop('checked', false);
            $("#cbPrintExpiration").prop('checked', true);
            $("#cbTransitTime").prop('checked', true);
            $("#cbPrintCost").prop('checked', false);
            $("#cbPrintCostAndSale").prop('checked', false);
            $("#cbPOrC").prop('checked', true);
            $("#cbExtraContainer").prop('checked', false);
            $("#cbSignature").prop('checked', true);
            $("#cbServiceType").prop('checked', true);
            $("#cbProfits").prop('checked', false);
            $("#cbPrintPOrCForCharges").prop('checked', false);
            $("#cbShipmentDetails").prop('checked', true);
            $("#cbIncoterm").prop('checked', true);
            $("#cbPrintFooter").prop('checked', false);


        }
        if (pDefaults.UnEditableCompanyName == "EVL") {
            if (!QuotationsCanDelete) {
                
                $('#cbPrintCostAndSale').addClass("hide");
                $('#cbPrintCostAndSaleSpan').addClass("hide");
                $('#cbPrintCost').addClass("hide"); 
                $('#cbPrintCostSpan').addClass("hide");
            } else {
                $('#cbPrintCostAndSale').removeClass("hide");
                $('#cbPrintCostAndSaleSpan').removeClass("hide");
                $('#cbPrintCost').removeClass("hide");
                $('#cbPrintCostSpan').removeClass("hide");
            }
        }
        if (pDefaults.UnEditableCompanyName == "NIL") {
           
            const idsArray = pSelectedIDs.split(',').map(id => id.trim()).filter(id => id !== '');
                if (idsArray.length > 1) {
                    swal("Sorry", "select just one route.");
                    FadePageCover(false);
                    return;
                };
                var arr_Keys = new Array();
                var arr_Values = new Array();
                arr_Keys.push("ID");
                arr_Keys.push("pSelectedQRID");
                arr_Values.push($("#hQuotationID").val());
            arr_Values.push(pSelectedIDs);
                var pParametersWithValues =
                {
                    arr_Keys: arr_Keys
                    , arr_Values: arr_Values
                    , pTitle: "Quotation"
                    , pReportName: "Rep_Quotations_NIL"
                };
                var win = window.open("", "_blank");
                var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '';

                win.location = url;
                FadePageCover(false);
                return;
       
           
        }
        jQuery("#SelectPartnerOfferModal").modal("show");
        $("#btnSelectPartnerOffer").attr("onclick", "QuotationsEdit_Draw('" + pOption + "');");
        //}  
    }
}
function Print_Quotation() {
    debugger;
    var Report_Value = $("#slQuotationReports").val();
    var QuotaionId = pEditedQuotation_General.ID;
    if (Report_Value == "Report1") {
        QuotationsEdit_Print("Print")
    }
    else if (Report_Value == "Report2") {
        QUONewShipment("Rep_QOUNewShipment", " WHERE Q.ID = " + QuotaionId, "Print")
    }
}
function QUONewShipment(ReportName, pWhereClause, pOutputTo) {
    debugger;
    CallGETFunctionWithParameters("/api/Reports/GetLogoPaths", { pLogoSubPath1: "Content/Images/CompanyHeader.jpg", pLogoSubPath2: "Content/Images/CompanyFooter.jpg" }, function (paths) {
        var arr_Keys = new Array();
        var arr_Values = new Array();
        let query = `Rep_QOUNewShipment' ${pWhereClause}'`;
        arr_Keys.push("Logo");
        arr_Keys.push("Logo1");

        arr_Values.push(paths.logoPath1);
        arr_Values.push(paths.logoPath2);



        var pParametersWithValues =
        {
            query: query
            , arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: "New Shippment"
            , pReportName: ReportName
            , pReportType: pOutputTo
        };
        var win = window.open("", "_blank");
        var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
            + '&query=' + pParametersWithValues.query + ''
            + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
            + '&arr_Values=' + pParametersWithValues.arr_Values + ''
            + '&pReportName=' + pParametersWithValues.pReportName + ''
            + '&pReportType=' + pParametersWithValues.pReportType + '';

        win.location = url;
    })
}

function QuotationsEdit_Draw(pOption) {
    debugger;

    FadePageCover(true);
    var pSelectedQRIDs = "";
    if (glbCallingControl == "FleetQuotation")
        pSelectedQRIDs = GetAllIDsAsStringWithNameAttr("tblRoutings", "Delete");
    else {
        pSelectedQRIDs = GetAllSelectedIDsAsString("tblRoutings");
        if (pSelectedQRIDs == "" && pOption == "PrintAdditionalContainer") //for Bedaya
            pSelectedQRIDs = $("#hQuotationRouteID").val();
    }
    if (pSelectedQRIDs == "") {
        swal("Sorry", "No Details.");
        FadePageCover(false);
    } else

        if (pDefaults.UnEditableCompanyName == "SED" && $("#cbGroupByChargeTypeGroup").prop("checked")) {
            var arr_Keys = new Array();
            var arr_Values = new Array();
            arr_Keys.push("pPrintedQuotationID");
            arr_Keys.push("pSelectedQRIDs");

            arr_Values.push($("#hQuotationID").val());
            arr_Values.push(pSelectedQRIDs);
            arr_Keys.push("query2");
            arr_Values.push(`select * from vwQuotations  WHERE ID in (${$("#hQuotationID").val()})`);
            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , pTitle: "Quotations"
                , pReportName: "Quotations_SED"
                , query:
                    `
                        select *,
                        (select sum(SaleAmount)
                         from vwQuotationCharges
                         Where QuotationRouteID = r.ID
                           And ChargeTypeCode = 'GNST')                                     Gen_SET,
                        (SELECT SUBSTRING(
                                        (SELECT ' + ' + SaleCurrencyCode + ' ' +
                                                Cast(FORMAT(Sum(SaleAmount), 'N0') as nvarchar) + ' ' + ContainerTypeName
from vwQuotationCharges
                         Where QuotationRouteID = r.ID
                           And ChargeTypeCode = 'OFR'
                         GROUP BY SaleCurrencyCode, ContainerTypeName
                                         FOR XML PATH (''), TYPE).value('text()[1]', 'nvarchar(max)'), 3, 1000)
                         )                      OCEANFREIGHT,
                        (select top 1 (SaleCurrencyCode)
                         from vwQuotationCharges
                         Where QuotationRouteID = r.ID
                           And ChargeTypeCode = 'OFR')                                      OCEANFREIGHT_SaleCurrencyCode,
                        (select sum(SaleAmount)
                         from vwQuotationCharges
                         Where QuotationRouteID = r.ID
                           And ChargeTypeCode = 'TRU')                                      TRUCKING,
                        Case
                            When DirectionType = 1 Then (select sum(SaleAmount)
                                                         from vwQuotationCharges
                                                         Where QuotationRouteID = r.ID
                                                           And ChargeTypeCode = 'ICC')
                            When DirectionType = 2 Then (select sum(SaleAmount)
                                                         from vwQuotationCharges
                                                         Where QuotationRouteID = r.ID
                                                           And ChargeTypeCode = 'ECC')
                        End                                                             CUSTOMS_CLEARANCE,
                        (SELECT SUBSTRING(
                                        (SELECT ChargeTypeName + ' ' + CostCurrencyCode + ' ' +
                                                Cast(FORMAT(SaleAmount, 'N2') as nvarchar) +
                                                Case WHEN ContainerTypeName IS NOT NULL Then ' Per ' ELSE ' ' End +
                                                ISNULL(ContainerTypeName, '') + '\r\n'
                                         FROM dbo.vwQuotationCharges vQC
                                         WHERE vQC.QuotationRouteID in (${pSelectedQRIDs})
                                           and vQC.ChargeTypeGroupName = 'LOCAL CHARGES'
                                         FOR XML PATH (''), TYPE)
                                            .value('text()[1]', 'nvarchar(max)'), 2, 1000)) [LocalCharges]
                        from vwQuotationRoute as r
                        Where r.ID In (${pSelectedQRIDs})
                    `
            };
            var win = window.open("", "_blank");
            var url = `/ReportMainClass/PrintReportTwoQueries?
                        pTitle=${pParametersWithValues.pTitle}
                        &query=${encodeURIComponent(pParametersWithValues.query.trimEnd())}
                        &arr_Keys=${pParametersWithValues.arr_Keys}
                        &arr_Values=${pParametersWithValues.arr_Values}
                        &pReportName=${pParametersWithValues.pReportName}`;

            win.location = url;
            FadePageCover(false);
        } else {
            CallGETFunctionWithParameters(
                "/api/Quotations/GetQuotationDataToPrint"
                , { pPrintedQuotationID: $("#hQuotationID").val(), pSelectedQRIDs: pSelectedQRIDs }
                , function (data) {
                    debugger;
                    if (data[0]) {
                        var pUserName = data[1];
                        var pUserMobile1 = data[2];
                        var pUserPhone1 = data[3];
                        var pUserEmail = data[4];
                        var pQuotationCode = data[5];
                        var pClientName = data[6];
                        var pClientContactName = data[7];
                        var pClientContactEmail = data[8];
                        var pRepDirectionTypeShown = data[9];
                        var pTblQuotationRoutes = JSON.parse(data[10]);
                        var pTblQuotationCharges = JSON.parse(data[11]);
                        var pAgentName = data[12];
                        var pAgentContactName = data[13];
                        var pAgentContactEmail = data[14];
                        var pSubject = data[15];
                        var pTermsAndConditions = data[16];
                        var pCompanyPhones = data[17];
                        var pCompanyFaxes = data[18];
                        var pIsNSLQuotationFormat = data[19];
                        var pQuotationHeader = (data[20] == undefined ? null : JSON.parse(data[20]));
                        var ContainerTypes_Summary = data[21];
                        var pSalesmanHeader = JSON.parse(data[22]);
                        var pCustomer = JSON.parse(data[23]);
                        var pSubjectClearance = data[24];
                        var pTermsAndConditionsClearance = data[25];
                        var pSubjectTransport = data[26];
                        var pTermsAndConditionsTransport = data[27];
                        var pShipmentTypeName = data[28];
                        var pTransportTypeName = data[29];
                        var pShipmentDetails = JSON.parse(data[30]);

                        var _TodaysDateInDDMMYYYY = getTodaysDateInddMMyyyyFormat();
                        var pEmail_To = ($("#cbPrintForAgent").prop("checked")
                            ? (pQuotationHeader.AgentEmail == "0" || pQuotationHeader.AgentEmail == "" ? pQuotationHeader.AgentContactEmail : pQuotationHeader.AgentEmail)
                            : (pQuotationHeader.ClientEmail == "0" || pQuotationHeader.ClientEmail == "" ? pQuotationHeader.ClientContactEmail : pQuotationHeader.ClientEmail)
                        );
                        if (pOption == "Email") {
                            let _SelectedContactEmails = GetAllSelectedTextSiblingsByNameAttr("cbAddedItemID");
                            if (pEmail_To == "0") pEmail_To = "";
                            if (_SelectedContactEmails != "")
                                pEmail_To += (pEmail_To == "" || pEmail_To == 0)
                                    ? _SelectedContactEmails
                                    : ("," + _SelectedContactEmails);
                        }

                        let _SelectedQuotationChargesIDs = "";
                        if (pOption == "PrintAdditionalContainer")
                            _SelectedQuotationChargesIDs = "," + GetAllSelectedIDsAsString("tblQuotationCharges") + ",";

                        var isPrintedForExporter = $("#cbPrintForExporter").prop("checked");

                        var pReportTitle = "Quotation";
                        var pIsPrintedForAgent = ($("#slAgents").val() != "" && $("#cbPrintForAgent").prop("checked"));
                        if (pDefaults.UnEditableCompanyName == "KDM")
                            pTblQuotationCharges.sort((a, b) => (a.SaleCurrencyCode > b.SaleCurrencyCode) ? 1 : -1);
                        else
                            //pTblQuotationCharges.sort((a, b) => (a.ViewOrder >= b.ViewOrder) ? 1 : -1);
                            pTblQuotationCharges.sort((a, b) => (a.ViewOrderForPrint >= b.ViewOrderForPrint) ? 1 : -1);
                        var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
                        var TodaysDateInLetters = Date();

                        /// Get Container count for offer calculations 
                        var ContainerCount;
                        CallGETFunctionWithParameters("/api/Quotations/Cargo_FillModal", {
                            pQRIDToFillCargoModal: $("#hQuotationRouteID").val()
                        }
                            , function (pData) {
                                var pQuotationContainersAndPackages = JSON.parse(pData[0]);
                                ContainerCount = pQuotationContainersAndPackages.length;
                                var pPackage = pData[1];
                                var pContainerType = pData[2];
                            }, null);


                        //if (pTblQuotationCharges.length > 0) {
                        var ReportHTML = '';
                        var ReportHTMLHeader = '';
                        if ((pEmail_To == "0" || pEmail_To == "") && pOption == "Email") {
                            swal("Sorry", "Please, check the receiver email.");
                            FadePageCover(false);
                        } else {
                            debugger;
                            if (pQuotationHeader.IsFleet) { //Other Companies
                                //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                                ReportHTML += '<html>';
                                ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                                ReportHTML += '         <body style="background-color:white;">';
                                if (1 == 2 /*pDefaults.UnEditableCompanyName == "CAL"*/)
                                    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader-Quotation.jpg" alt="logo"/></div> </br>';
                                else {

                                    if (pDefaults.UnEditableCompanyName != 'OPL')
                                        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                                    else
                                        ReportHTML += '             <div class="col-xs-12 text-left"><img style=" width: 25%; " src="/Content/Images/InvoiceCompanyHeader.jpg" alt="logo"/></div> </br>';
                                }

                                ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + ($("#cbIsSpanish").prop("checked") ? 'CONTRATO DE TRANSPORTE' : 'TRANSPORT CONTRACT') + '</h3></div>';

                                ReportHTML += '                 <div class="col-xs-12 m-t-lg">';
                                ReportHTML += '                     ' + ($("#cbIsSpanish").prop("checked") ? 'Querido ' : 'Dear ') + pQuotationHeader.ClientName + ",<br>";
                                ReportHTML += '                     ' + pSubject.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' <br>';
                                ReportHTML += '                 </div>',

                                    ReportHTML += '                 <table id="tblOffer" class="table table-striped b-t b-light text-sm table-bordered m-t" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                ReportHTML += '                     <thead>';
                                ReportHTML += '                         <th>' + ($("#cbIsSpanish").prop("checked") ? 'Origen' : 'Origin') + '</th>';
                                ReportHTML += '                         <th>' + ($("#cbIsSpanish").prop("checked") ? 'Destino' : 'Destination') + '</th>';
                                ReportHTML += '                         <th>' + ($("#cbIsSpanish").prop("checked") ? 'Mercancía' : 'Commodity') + '</th>';
                                ReportHTML += '                         <th>' + ($("#cbIsSpanish").prop("checked") ? 'Tiempo libre' : 'Loading/Unloading') + '</th>';
                                ReportHTML += '                         <th>' + ($("#cbIsSpanish").prop("checked") ? 'Flete' : 'Freight Rate') + '</th>';
                                ReportHTML += '                     </thead>';

                                ReportHTML += '                     <tbody>';
                                $.each((pTblQuotationRoutes), function (i, item) {
                                    ReportHTML += '                     <tr>';
                                    ReportHTML += '                         <td>' + (pDefaults.UnEditableCompanyName == "CAL" ? item.POLAddress : item.POLName) + '</td>';
                                    ReportHTML += '                         <td>' + (pDefaults.UnEditableCompanyName == "CAL" ? item.PODAddress : item.PODName) + '</td>';
                                    ReportHTML += '                         <td>' + (item.CommodityID == 0 ? "" : item.CommodityName) + '</td>';
                                    ReportHTML += '                         <td>' + (item.FreeTime == 0 ? "" : item.FreeTime) + '</td>';
                                    ReportHTML += '                         <td>' + item.Sale + (pDefaults.UnEditableCompanyName == "CAL" ? (item.FreightRateFormat == 0 ? " €" : (" " + item.FreightRateFormat)) : "") + '</td>';
                                    //ReportHTML += '                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) + '</td>';
                                    ReportHTML += '                     </tr>';
                                }); //of $.each((pTblQuotationRoutes), function (i, item) {
                                ReportHTML += '                     </tbody>';
                                ReportHTML += '                 </table>';

                                if (pTermsAndConditions != "0") {
                                    ReportHTML += '                 <div class="col-xs-12 ' + ($("#cbRightToLeft").prop("checked") ? "text-right" : "") + '">' + pTermsAndConditions.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' </div>';
                                }
                                ReportHTML += '                     <div class="col-xs-12">' + ($("#cbIsSpanish").prop("checked") ? 'Oferta válida hasta ' : 'Offer valid until ') + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pQuotationHeader.CloseDate)) < 1 ? "Unspecified" : ConvertDateFormat(GetDateWithFormatMDY(pQuotationHeader.CloseDate))) + "</div>";
                                ReportHTML += '                     <div class="col-xs-12">' + ($("#cbIsSpanish").prop("checked") ? 'Referencia: ' : 'Reference: ') + pQuotationHeader.Code + "</div>";

                                ReportHTML += '                     <div class="col-xs-4 m-t-lg"><b>' + ($("#cbIsSpanish").prop("checked") ? "Atentamente,<br>" : "Kind Regards,<br>") + pLoggedUser.Name + "<br>" + pDefaults.CompanyName + "<br>tel." + pLoggedUser.Phone1 + '</b></div>';
                                ReportHTML += '                     <div class="col-xs-4 m-t-lg"><b>' + "&emsp;&emsp;" + "<br>" + '</b></div>';
                                ReportHTML += '                     <div class="col-xs-4 m-t-lg text-right"><b>' + pLoggedUser.BranchName + ",<br>" + _TodaysDateInDDMMYYYY + '</b></div>';

                                ReportHTML += '         </body>';
                                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                                //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                                ReportHTML += '     </footer>';
                                ReportHTML += '</html>';
                            } //EOF if (pQuotationHeader.IsFleet)
                            else if (pQuotationHeader.IsWarehousing) {
                                {
                                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                                    ReportHTML += '<html>';
                                    ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                                    ReportHTML += '         <body style="background-color:white;">';
                                    if (pDefaults.UnEditableCompanyName == "LAT")
                                        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader-LATT-Logo.jpg" alt="logo"/></div> </br>';
                                    else if (pDefaults.UnEditableCompanyName == "TEL")
                                        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader-Quotation.jpg" alt="logo"/></div> </br>';
                                    else {


                                        if (pDefaults.UnEditableCompanyName != 'OPL')
                                            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                                        else
                                            ReportHTML += '             <div class="col-xs-12 text-left"><img style=" width: 25%; " src="/Content/Images/InvoiceCompanyHeader.jpg" alt="logo"/></div> </br>';

                                    }
                                    if ($("#cbHeaderQuotation").prop("checked"))
                                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><u><h3>' + 'Quotation' + '</h3></u></div>';
                                    else if ($("#cbHeaderEstimate").prop("checked"))
                                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><u><h3>' + 'Estimate' + '</h3></u></div>';

                                    var ReportHTMLtemp = ReportHTML;

                                    ReportHTML = '';

                                    ReportHTML += '                 <table id="tblBasicData" class="table table-striped b-t b-light text-sm table-bordered m-t" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                    ReportHTML += '                     <thead>';
                                    ReportHTML += '                         <td style="text-align:left!Important;">';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Date : </b>' + TodaysDateddMMyyyy + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>From : </b>' + ($("#cbSentFromLoggedUser").prop("checked") ? pUserName : pSalesmanHeader.Name) + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Messrs : </b>' + (pIsPrintedForAgent ? pAgentName : pClientName) + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Mob. : </b>' + ($("#cbSentFromLoggedUser").prop("checked") ? (pUserMobile1 == 0 ? "" : pUserMobile1) : (pSalesmanHeader.Mobile1 == 0 ? "" : pSalesmanHeader.Mobile1)) + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Attention : </b>' + (pIsPrintedForAgent ? (pAgentContactName == 0 ? "" : pAgentContactName) : (pClientContactName == 0 ? "" : pClientContactName)) + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Tel. : </b>' + ($("#cbSentFromLoggedUser").prop("checked") ? (pUserPhone1 == 0 ? "" : pUserPhone1) : (pSalesmanHeader.Phone1 == 0 ? "" : pSalesmanHeader.Phone1)) + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6">' + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Email : </b>' + ($("#cbSentFromLoggedUser").prop("checked") ? (pUserEmail == 0 ? "" : pUserEmail) : (pSalesmanHeader.Email == 0 ? "" : pSalesmanHeader.Email)) + '</div>';
                                    ReportHTML += '                         </td>';
                                    ReportHTML += '                     </thead>';
                                    ReportHTML += '                     <tr>';
                                    ReportHTML += '                         <td style="text-align:left!Important;">';
                                    if (pDefaults.UnEditableCompanyName == "ELI")
                                        ReportHTML += '                             <div class="col-xs-6"><b>Subject : </b>' + pRepDirectionTypeShown + ' Offer to ' + pTblQuotationRoutes[0].PODName + '</div>';
                                    else if (pDefaults.UnEditableCompanyName == "KDM")
                                        ReportHTML += '                             <div class="col-xs-6"><b>Subject : </b>' + pRepDirectionTypeShown + ' Offer' + '  <b class="m-l-md">POD : </b> ' + (pTblQuotationRoutes.length > 0 ? pTblQuotationRoutes[0].PODName : "") + '</div>';
                                    else
                                        ReportHTML += '                             <div class="col-xs-6"><b>Subject : </b>' + "WAREHOUSING" + ' Offer' + '</div>';

                                    ReportHTML += '                             <div class="col-xs-6"><b>Quotation Code : </b>' + pQuotationCode + '</div>';
                                    ReportHTML += '                         </td>';
                                    ReportHTML += '                     </tr>';
                                    ReportHTML += '                 </table>';
                                    ReportHTMLHeader = ReportHTML;
                                    ReportHTML = ReportHTMLtemp + ReportHTML;
                                    //if (pDefaults.UnEditableCompanyName == "ELI") {
                                    //    ReportHTML += '                 <b>Dear Sir/Madam,</b>';
                                    //    ReportHTML += '                 <br>We have the pleasure to cooperate with your esteemed company, offering our excellent service with competitive rates for your shipments as follows:<br><br>';
                                    //}
                                    //else
                                    if (pSubject == "0") {
                                        ReportHTML += '                 <b>Dear Sir,</b>';
                                        ReportHTML += '                 <br><b>&emsp; We have the pleasure to offer you the following :- </b><br><br>';
                                    } else
                                        ReportHTML += '                 <br><b>' + pSubject.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' </b><br><br>';
                                    $.each((pTblQuotationRoutes), function (i, item) {
                                        ReportHTML += '                 <div><b>(' + (i + 1) + ')</b></div><br>';
                                        ReportHTML += '                 <table id="tblOffer" class="table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                        ReportHTML += '                     <thead>';
                                        ReportHTML += '                         <th>Code</th>';
                                        ReportHTML += '                         <th>Main-Criteria</th>';
                                        ReportHTML += '                         <th>Sub-Criteria</th>';
                                        if (pDefaults.UnEditableCompanyName != "TEU")
                                            ReportHTML += '                         <th>Expiration</th>';
                                        ReportHTML += '                     </thead>';
                                        ReportHTML += '                     <tr>';
                                        ReportHTML += '                         <td>' + item.Code + '</td>';
                                        ReportHTML += '                         <td>' + (item.MainCriteriaID == 0 ? "" : item.MainCriteriaName) + '</td>';
                                        ReportHTML += '                         <td>' + (item.SubCriteriaID == 0 ? "" : item.SubCriteriaName) + '</td>';
                                        if (pDefaults.UnEditableCompanyName != "TEU")
                                            ReportHTML += '                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) + '</td>';
                                        ReportHTML += '                     </tr>';
                                        ReportHTML += '                 </table>';
                                        var pQuotationRouteID = item.ID;
                                        ReportHTML += '                 <div class=" m-t-n"><b>Quotation Expenses :</b></div><br>';
                                        ReportHTML += '                 <table id="tblCharges" class="table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                        ReportHTML += '                     <thead>';
                                        ReportHTML += '                         <th>Item</th>';
                                        ReportHTML += '                         <th>' + (pDefaults.UnEditableCompanyName == "KDM" ? 'Equip/Pkg' : 'Container/Package') + '</th>';
                                        if (pDefaults.UnEditableCompanyName != 'LAT' && pDefaults.UnEditableCompanyName != 'KDM'
                                            && ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')))
                                            ReportHTML += '                     <th>Dem/day</th>';
                                        if ((pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV")
                                            && (pQuotationHeader.TransportType == AirTransportType || pQuotationHeader.ShipmentType == constLCLShipmentType)) {
                                            ReportHTML += '                         <th>Chg.Wt</th>';
                                            if ($("#cbPrintPerKgRate").prop("checked"))
                                                ReportHTML += '                         <th>Per Kg Rate</th>';
                                        }
                                        if ($("#cbPrintCostAndSale").prop("checked")) {
                                            ReportHTML += '                         <th>Cost</th>';
                                            ReportHTML += '                         <th>Sale</th>';
                                        } else {
                                            ReportHTML += '                         <th class="' + ($("#cbPrintPerKgRate").prop("checked") && (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV") && (pQuotationHeader.TransportType == AirTransportType || pQuotationHeader.ShipmentType == constLCLShipmentType) ? "hide" : "") + '">Quantity</th>';
                                            ReportHTML += '                         <th class="' + ($("#cbPrintPerKgRate").prop("checked") && (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV") && (pQuotationHeader.TransportType == AirTransportType || pQuotationHeader.ShipmentType == constLCLShipmentType) ? "hide" : "") + '">Amount</th>';
                                        }
                                        ReportHTML += '                         <th>Currency</th>';
                                        ReportHTML += '                     </thead>';
                                        $.each((pTblQuotationCharges), function (i, item) {
                                            if (item.QuotationRouteID == pQuotationRouteID && item.SalePrice > 0) {
                                                ReportHTML += '                 <tr>';
                                                ReportHTML += '                     <td>' + item.ChargeTypeName
                                                    + (
                                                        $("#cbPrintNotes").prop('checked') || pDefaults.UnEditableCompanyName == "GLD" || pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV"
                                                            ? (item.Notes == 0 ? "" : (" (" + item.Notes + ")"))
                                                            : ""
                                                    )
                                                    + '</td>';
                                                ReportHTML += '                     <td>' + (item.ContainerTypeID == 0 ? (item.PackageTypeID == 0 ? "" : item.PackageTypeName) : item.ContainerTypeCode) + '</td>';
                                                if (pDefaults.UnEditableCompanyName != 'LAT' && pDefaults.UnEditableCompanyName != 'KDM'
                                                    && ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')))
                                                    ReportHTML += '                 <td>' + (item.DemurrageDays == 0 ? "" : item.DemurrageDays) + '</td>';
                                                if (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV"
                                                    && (pQuotationHeader.TransportType == AirTransportType || pQuotationHeader.ShipmentType == constLCLShipmentType)) {
                                                    ReportHTML += '                     <td>' + item.SaleQuantity + '</td>';
                                                    if ($("#cbPrintPerKgRate").prop("checked"))
                                                        ReportHTML += '                     <td>' + item.SalePrice + '</td>';
                                                }
                                                if ($("#cbPrintCostAndSale").prop("checked")) {
                                                    ReportHTML += '                     <td>' + item.CostAmount + '</td>';
                                                    ReportHTML += '                     <td>' + item.SaleAmount + '</td>';
                                                }
                                                ReportHTML += '                     <td class="' + ($("#cbPrintPerKgRate").prop("checked") && (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV") && (pQuotationHeader.TransportType == AirTransportType || pQuotationHeader.ShipmentType == constLCLShipmentType) ? "hide" : "") + '">' + item.CostQuantity + '</td>';
                                                ReportHTML += '                     <td class="' + ($("#cbPrintPerKgRate").prop("checked") && (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV") && (pQuotationHeader.TransportType == AirTransportType || pQuotationHeader.ShipmentType == constLCLShipmentType) ? "hide" : "") + '">' + item.SaleAmount + '</td>';
                                                ReportHTML += '                     <td>' + item.SaleCurrencyCode + '</td>';
                                                ReportHTML += '                 </tr>';
                                            }
                                        });
                                        ReportHTML += '                 </table>';
                                        if (pDefaults.UnEditableCompanyName == "KDM") {
                                            var _CurrentQRCharges = pTblQuotationCharges.filter(x => x.QuotationRouteID == pQuotationRouteID);
                                            var _TotalCurrencies = QuotationsEdit_CalculateTotalCurrenciesSummaryFromArray(_CurrentQRCharges);
                                            ReportHTML += '<div class="col-xs-12 m-t-n text-right"><b>Total : ' + _TotalCurrencies.replace(/ /g, "&nbsp;").replace(/,/g, "<br />") + '</b></div>';
                                        }


                                    }); //of $.each((pTblQuotationRoutes), function (i, item) {
                                    if ((pDefaults.UnEditableCompanyName == "KDM" || pDefaults.UnEditableCompanyName == "ELC")
                                        && pTblQuotationRoutes.length == 1) {
                                        $.each((ContainerTypes_Summary), function (i, item) {
                                            if (item.ContainerTypeCode != "0")
                                                ReportHTML += '<div class="col-xs-12 text-right"><b>' + item.Total + ' X ' + item.ContainerTypeCode + '</b></div>';

                                        });
                                    }
                                    if (pTermsAndConditions != "0") {
                                        if (!$("#cbRightToLeft").prop("checked"))
                                            ReportHTML += '                 <b><u>Terms & Conditions:</u></b><br>';
                                        ReportHTML += '                 <div class="col-xs-12 ' + ($("#cbRightToLeft").prop("checked") ? "text-right" : "") + '">' + pTermsAndConditions.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' </div><br>';
                                    } else if (pDefaults.UnEditableCompanyName == "SGA") { //Default Terms and Conditions for SGA
                                        ReportHTML += '                 <div class="col-xs-12"><b><u>FOB:</u></b></div>';
                                        ReportHTML += '                 <div class="col-xs-12"><b><u>General Terms & Conditions:</u></b></div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding any official receipts.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - THC at both ends as per Carrier current tariff subject to change and final carrier invoice and currency fluctuation.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding VAT.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Rates are subject to modification upon any sovereign changes.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Above rate is net selling excluding bank charges.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - The above quotation is under EIFFA  trading  terms and condition.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - BAF, CAF and War risk surcharges are subject to change without any previous notice.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - A/M rate subject to any IMO surcharge additional if applicable.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Subject to equipment & space availability.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Vessels arrival date & transit time are estimated & subject to variation.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Rates should be confirmed prior booking.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Any additional services rising or demand during the shipment processing will be invoiced separately.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - The transfer cost attached to payment involved with shipment processing is for your account as per our bank notification "net transfer to SGA invoice".</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Payment term:</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - For credit our finance dept. requests irrevocable bank letter of guarantee or bank authenticated check with covering the credit ceiling for the credit facility + a contract signed by the authorized signature.</div>';
                                        ReportHTML += '                 <br><div class="col-xs-12"> Hope our offer meets your requirements.</div>';
                                        ReportHTML += '                 <hr style="width:97%;height:0px;border:.5px dotted #000;">';
                                        ReportHTML += '                 <div class="col-xs-12"><b><u>Ex-Works:</u></b></div>';
                                        ReportHTML += '                 <br><div class="col-xs-12"><b><u>Please note the following:</u></b></div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Free time for loading is 8 hours, thereafter detention charges applies EGP 700/Ct for the next 8 hours, Exceeding 16 Hours detention charges 50%, Exceeding 24 Hours detention charges 100% of the trucking rate per day or part of a day.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Subject to 3rd parties official receipts (incl. carrier' + "'" + 's OTHC, PTI, Power charges, road tolls, scale receipts, clearance ... etc.) which will be debited at cost along with the Supporting docs. </div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Subject to courier charges – if needed.</div>';
                                        ReportHTML += '                 <br><div class="col-xs-12"><b><u>General Terms & Conditions:</u></b></div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding any official receipts.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - THC at both ends as per Carrier current tariff subject to change and final carrier invoice and currency fluctuation.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding VAT.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Rates are subject to modification upon any sovereign changes.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Above rate is net selling excluding bank charges.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - The above quotation is under EIFFA  trading  terms and condition.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - BAF, CAF and War risk surcharges are subject to change without any previous notice.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - A/M rate subject to any IMO surcharge additional if applicable.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Subject to equipment & space availability.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Vessels arrival date & transit time are estimated & subject to variation.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Rates should be confirmed prior booking.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Any additional services rising or demand during the shipment processing will be invoiced separately.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - The transfer cost attached to payment involved with shipment processing is for your account as per our bank notification "net transfer to SGA invoice".</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Payment term:</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - For credit our finance dept. requests irrevocable bank letter of guarantee or bank authenticated check with covering the credit ceiling for the credit facility + a contract signed by the authorized signature.</div>';
                                        ReportHTML += '                 <br><div class="col-xs-12"> Hope our offer meets your requirements.</div>';
                                        ReportHTML += '                 <hr style="width:97%;height:0px;border:.5px dotted #000;">';
                                        ReportHTML += '                 <div class="col-xs-12"><b><u>Tanks General Conditions</u></b></div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Carrier is SGA choice.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Tank hire and ocean freight included.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - All local official receipts for export formalities, trucking, courier, inspection, weighing, telex release, THC at both ends are excluded.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding VAT.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Cleaning & 20ltr residue disposal costs included, excessive amount is charged in addition.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - All local costs destination; port handlings, documentation, un/loading haulage (inclusive of re/delivery at depot/port), truck demurrage alike excluded.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Pump/compressor & hoses are provided by shipper or receiver.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Heating/heating stop, specialized/additional un/loading equipment, drop/recollection, vacuum/leak test, handrail installation excluded.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - All sorts of un/loading-related works are carried out by shipper/receiver at their own responsibility and cost.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Free time for un/loading & truck detention afterwards is charged as per agreed conditions/tariff.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Transit time refers ‘’port to port‘’ & may change due to weather or other conditions.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Tanks are not temperature controlled. Although tanks are thermally insulated however product being carried may solidify to such an extent that may result in deterioration of quality including total loss of product. For such an incident, carrier shall not be deemed responsible. Costs of re-heating the solidified product into its original state, charges for redelivery at origin or at disposal site as well as any other associated costs are re-charged on shipper/receiver in addition.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Where mentioned, net payload given is based on allowable gross weight on road&rail at un/load and/or crossing country, may change due to product’s specific gravity, safety margin applied and/or due to other variables. Net weight actually loaded that can be less than the permissible max payload shall not change the freight price quoted herein.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Where mentioned, ‘’non-hazardous or not regulated”, dependent on shipper’s declaration, refers to that the product being shipped is not regulated as per ADR/IMDG/RID Conventions but it does not refer to any other product related specifications.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Any damage incurred to tank ex/interior during heating and/or transport and/or other handlings being performed under shipper/receiver’s in/direct control, shall be fully at shipper/receiver’s account. Shipper/receiver is also regarded to be completely aware of that indicative replacement value of a tank is Usd 22,000.-</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Any party acting together with or on behalf of the shipper/receiver is regarded successively and jointly and severally responsible for all of conditions, fees and charges arising from the said shipment mentioned herein this offer/agreement.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - In conformity with current regulations at any customs at arrival/departure/transshipment ports/terminals, related declaration must be submitted minimum 48 hours prior to actual departure/arrival at related terminal/port. Otherwise and any incorrect declaration/information given due to whatsoever reason, any extra cost & full liability to incur thereof are on shipper’s account.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Where revelant, particular permission at customs of origin and destination are in full responsibility of shipper and any delay or complications occured as well as all consequences thereof shall be on shipper’s full responsibility.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Dangerous Cargo declaration where relevant shall be submitted by shipper to carrier minimum 48 hours prior to actual shipment reservation. Otherwise and any incorrect declaration/information given due to whatsoever reason, any extra cost & full liability to incur thereof are on shipper’s account.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Where related, all necessary permissions for im/export and/or transport are met by shipper/receiver by their selves at their own cost solely.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Carrier where found necessary may change at its own initiative route and kind of equipment given here, without harming the general terms agreed.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Carrier has right to adjust the rates should the surcharges or other cost content change.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Confirmation by return with authorized signature and company stamp that shipper accepts all terms and conditions as mentioned in this offer is required. If the subject transport service has been performed, however, without receipt of your confirmation, the complete contents inclusive of all terms and conditions of this quotation shall be deemed acknowledged and confirmed by the shipper undersigned herein. Furthermore, tanks supplied by carrier is regarded automatically, without need for any further approval in written or verbal prior or following after completion of loading, suitable and safe for loading the subject product.</div>';

                                    } else { //Default Terms&Conditions for NON SGA companies
                                        ReportHTML += '                 <b><u>Terms & Conditions:</u></b><br>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Above rates are not valid for dangerous cargo unless otherwise stated.</div>';
                                        ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding insurance & legalization unless otherwise stated.</div>';
                                        ReportHTML += "                 <div class='col-xs-12'> - Our liability is limited to carrier's liability as per mentioned on bill of lading.</div><br>";
                                        ReportHTML += '                 <div class="col-xs-12 m-l-n">Trust this offer will meet your requirements and approval.</div>';
                                        ReportHTML += '                 <div class="col-xs-12 m-l-n">Please do not hesitate to call us if you have any inquiries on the above.</div><br>';
                                    }

                                    ReportHTML += '                 <h5><b>Thanks & Best Regards</b></h5>';
                                    if (pDefaults.UnEditableCompanyName == "ELI") {
                                        ReportHTML += '                 <h5><b>' + pUserName + '</b></h5>';
                                        ReportHTML += '                 <h5><b>' + (pUserMobile1 == 0 ? "" : ('TEL : ' + pUserMobile1)) + (pUserEmail == 0 ? "" : ('&emsp;Email : ' + pUserEmail)) + '</b></h5>';
                                    }
                                    ReportHTML += '         </body>';
                                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                                    if (pDefaults.UnEditableCompanyName == "TRL" || pDefaults.UnEditableCompanyName == "HAS"
                                        || pDefaults.UnEditableCompanyName == "ELI")
                                        ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                                    ReportHTML += '     </footer>';
                                    ReportHTML += '</html>';
                                }
                            } //EOF if (pQuotationHeader.IsWarehousing) {
                            else if (pDefaults.UnEditableCompanyName == "NSL" && pIsNSLQuotationFormat) {
                                //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                                ReportHTML += '<html>';
                                ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                                ReportHTML += '         <body style="background-color:white;">';
                                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                                ReportHTML += '                 <div class="col-xs-12"><span class="float-right">' + TodaysDateInLetters.substr(0, 15) + '</span></div><br>';
                                ReportHTML += '                 <div class="col-xs-12"><b>To :</b> ' + (pIsPrintedForAgent ? pAgentName : pClientName) + '</div>';
                                ReportHTML += '                 <div class="col-xs-12"><b>Attention :</b> ' + (pIsPrintedForAgent ? (pAgentContactName == 0 ? "" : pAgentContactName) : (pClientContactName == 0 ? "" : pClientContactName)) + '</div>';
                                ReportHTML += '                 <div class="col-xs-12"><u><b>Subject: Freight Forwarding Quotation.</b></u></div>';
                                ReportHTML += '                 <br>';
                                if (pSubject == "0") {
                                    ReportHTML += '             <b>Dear Sir,</b>';
                                    ReportHTML += '             <br><b>&emsp; We have the pleasure to offer you the following :- </b><br><br>';
                                } else
                                    ReportHTML += '             ' + pSubject.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' <br><br>';
                                //ReportHTML += '             <div><b>(' + (i + 1) + ')</b></div><br>';
                                ReportHTML += '             <table id="tblOffer" class="table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                ReportHTML += '                 <thead>';
                                //ReportHTML += '                     <th>Code</th>';
                                ReportHTML += '                     <th>POL</th>';
                                ReportHTML += '                     <th>POD</th>';
                                ReportHTML += '                     <th>T.T.</th>';
                                ReportHTML += '                     <th>Carrier</th>';
                                ReportHTML += '                     <th>ETA POL</th>';
                                ReportHTML += '                     <th>OCF</th>';
                                ReportHTML += '                     <th>EQ.</th>';
                                ReportHTML += '                 </thead>';
                                ReportHTML += '                 <tbody>';
                                $.each((pTblQuotationRoutes), function (i, item) {
                                    var QuotationRouteID = item.ID;
                                    ReportHTML += '                 <tr>';
                                    //ReportHTML += '                     <td>' + item.QuotationRouteCode + '</td>';
                                    ReportHTML += '                     <td>' + item.POLName + '</td>';
                                    ReportHTML += '                     <td>' + item.PODName + '</td>';
                                    ReportHTML += '                     <td>' + item.TransientTime + '</td>';
                                    ReportHTML += '                     <td>' + (item.LineName == 0 ? pDefaults.UnEditableCompanyName : item.LineName) + '</td>';
                                    ReportHTML += '                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ETAPOLDate)) < 1 ? "Unspecified" : ConvertDateFormat(GetDateWithFormatMDY(item.ETAPOLDate))) + '</td>';
                                    $.each((pTblQuotationCharges), function (i, item) {
                                        if (item.ChargeTypeCode == 'OCF' && item.QuotationRouteID == QuotationRouteID)
                                            ReportHTML += '             <td>' + item.SaleAmount + ' ' + item.SaleCurrencyCode + '</td>';
                                    });
                                    $.each((pTblQuotationCharges), function (i, item) {
                                        if (item.ChargeTypeCode == 'EQ' && item.QuotationRouteID == QuotationRouteID)
                                            ReportHTML += '             <td>' + item.SaleAmount + ' ' + item.SaleCurrencyCode + '</td>';
                                    });
                                    ReportHTML += '                 </tr>';
                                }); //of $.each((pTblQuotationCharges), function (i, item) {
                                ReportHTML += '                 </tbody>';
                                ReportHTML += '             </table>';
                                if (pTermsAndConditions == "0") {
                                    ReportHTML += '                 <div class="col-xs-12"> - Above rates are not valid for dangerous cargo unless otherwise stated.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding insurance & legalization unless otherwise stated.</div>';
                                    ReportHTML += "                 <div class='col-xs-12'> - Our liability is limited to carrier's liability as per mentioned on bill of lading.</div><br>";
                                    ReportHTML += '                 <div class="col-xs-12 m-l-n">Trust this offer will meet your requirements and approval.</div>';
                                    ReportHTML += '                 <div class="col-xs-12 m-l-n">Please do not hesitate to call us if you have any inquiries on the above.</div><br>';
                                } else
                                    ReportHTML += '                 <div class="col-xs-12 ' + ($("#cbRightToLeft").prop("checked") ? "text-right" : "") + '">' + pTermsAndConditions.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' </div><br>';
                                ReportHTML += '         <div class="col-xs-12"><img src="/Content/Images/CompanyLogo.jpg" alt="footer"/></div>';
                                ReportHTML += '         <div class="col-xs-12"><h5>' + pUserName + '</h5></div>';
                                ReportHTML += '         <div class="col-xs-12">Phone: ' + (pCompanyPhones == 0 ? "" : pCompanyPhones) + '</div>';
                                ReportHTML += '         <div class="col-xs-12">Fax: ' + (pCompanyFaxes == 0 ? "" : pCompanyFaxes) + '</div>';
                                ReportHTML += '         <div class="col-xs-12">Cell Phone: ' + (pUserPhone1 == 0 ? "" : pUserPhone1) + '</div>';
                                ReportHTML += '         <div class="col-xs-12">Email: ' + (pUserEmail == 0 ? "" : pUserEmail) + '</div>';
                                ReportHTML += '         </body>';
                                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                                //ReportHTML += '         <div class="row text-center m-t-n"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                                ReportHTML += '     </footer>';
                                ReportHTML += '</html>';
                            } //EOF if (pDefaults.UnEditableCompanyName == "NSL" && pIsNSLQuotationFormat) {
                            else if (pDefaults.UnEditableCompanyName == "OAO" && $("#cbIsInland").prop("checked")) {
                                ReportHTML += '<html>';
                                ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                                ReportHTML += '         <body style="background-color:white;">';
                                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';

                                if ($("#cbHeaderQuotation").prop("checked"))
                                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><u><h3>' + 'Quotation' + '</h3></u></div>';
                                else if ($("#cbHeaderEstimate").prop("checked"))
                                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><u><h3>' + 'Estimate' + '</h3></u></div>';

                                ReportHTML += '                 <table id="tblBasicData" class="table table-striped b-t b-light text-sm table-bordered m-t" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                ReportHTML += '                     <thead>';
                                ReportHTML += '                         <td style="text-align:left!Important;">';
                                ReportHTML += '                             <div class="col-xs-6"><b>Date : </b>' + TodaysDateddMMyyyy + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>From : </b>' + pUserName + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Messrs : </b>' + (pIsPrintedForAgent ? pAgentName : pClientName) + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Mob. : </b>' + (pUserMobile1 == 0 ? "" : pUserMobile1) + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Attention : </b>' + (pIsPrintedForAgent ? (pAgentContactName == 0 ? "" : pAgentContactName) : (pClientContactName == 0 ? "" : pClientContactName)) + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Tel. : </b>' + (pUserPhone1 == 0 ? "" : pUserPhone1) + '</div>';
                                ReportHTML += '                             <div class="col-xs-6">' + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Email : </b>' + (pUserEmail == 0 ? "" : pUserEmail) + '</div>';
                                ReportHTML += '                         </td>';
                                ReportHTML += '                     </thead>';
                                ReportHTML += '                     <tr>';
                                ReportHTML += '                         <td style="text-align:left!Important;">';
                                ReportHTML += '                             <div class="col-xs-6"><b>Subject : </b>' + pRepDirectionTypeShown + ' Offer' + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Quotation Code : </b>' + pQuotationCode + '</div>';
                                ReportHTML += '                         </td>';
                                ReportHTML += '                     </tr>';
                                ReportHTML += '                 </table>';

                                if (pSubject == "0") {
                                    ReportHTML += '                 <b>Dear Sir,</b>';
                                    ReportHTML += '                 <br><b>&emsp; We have the pleasure to offer you the following :- </b><br><br>';
                                } else
                                    ReportHTML += '                 <br><b>' + pSubject.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' </b><br><br>';
                                $.each((pTblQuotationRoutes), function (i, item) {
                                    ReportHTML += '                 <div><b>(' + (i + 1) + ') ' + (item.MoveTypeName == 0 ? "" : item.MoveTypeName) + '</b></div><br>';
                                    ReportHTML += '                 <table id="tblOffer" class="table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                    ReportHTML += '                     <thead>';
                                    ReportHTML += '                         <th>Code</th>';
                                    //ReportHTML += '                         <th>Line</th>';
                                    //ReportHTML += '                         <th>Pickup Address</th>';
                                    ReportHTML += '                         <th>POL</th>';
                                    if (item.MoveTypeName.toUpperCase() != "CUSTOMS CLEARANCE")
                                        ReportHTML += '                         <th>POD</th>';
                                    //ReportHTML += '                         <th>Delivery Address</th>';
                                    //ReportHTML += '                         <th>T.T.</th>';
                                    ReportHTML += '                         <th class="hide">Validity</th>';
                                    //ReportHTML += '                         <th>FreeTime</th>';
                                    ReportHTML += '                         <th>Expiration</th>';
                                    ReportHTML += '                     </thead>';
                                    ReportHTML += '                     <tr>';
                                    ReportHTML += '                         <td>' + item.Code + '</td>';
                                    //ReportHTML += '                         <td>' + (item.LineName == 0 ? pDefaults.UnEditableCompanyName : item.LineName) + '</td>';
                                    //ReportHTML += '                         <td>' + (item.PickupAddress == 0 ? "" : item.PickupAddress) + '</td>';
                                    ReportHTML += '                         <td>' + item.POLName + '</td>';
                                    if (item.MoveTypeName.toUpperCase() != "CUSTOMS CLEARANCE")
                                        ReportHTML += '                         <td>' + item.PODName + '</td>';
                                    //ReportHTML += '                         <td>' + (item.DeliveryAddress == 0 ? "" : item.DeliveryAddress) + '</td>';
                                    //ReportHTML += '                         <td>' + item.TransientTime + '</td>';
                                    ReportHTML += '                         <td class="hide">' + item.Validity + '</td>';
                                    //ReportHTML += '                         <td>' + item.FreeTime + '</td>';
                                    ReportHTML += '                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) + '</td>';
                                    ReportHTML += '                     </tr>';
                                    ReportHTML += '                 </table>';
                                    var pQuotationRouteID = item.ID;
                                    ReportHTML += '                 <div class=" m-t-n"><b>Quotation Expenses :</b></div><br>';
                                    ReportHTML += '                 <table id="tblCharges" class="table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                    ReportHTML += '                     <thead>';
                                    ReportHTML += '                         <th>Item</th>';
                                    ReportHTML += '                         <th>Container Type</th>';
                                    ReportHTML += '                         <th>No. of Containers</th>';
                                    //if ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked'))
                                    //    ReportHTML += '                     <th>Dem/day</th>';
                                    ReportHTML += '                         <th>Amount</th>';
                                    ReportHTML += '                         <th>Currency</th>';
                                    ReportHTML += '                     </thead>';
                                    $.each((pTblQuotationCharges), function (i, item) {
                                        if (item.QuotationRouteID == pQuotationRouteID && item.SalePrice > 0) {
                                            ReportHTML += '                 <tr>';
                                            ReportHTML += '                     <td>' + item.ChargeTypeName + '</td>';
                                            ReportHTML += '                     <td>' + (item.ContainerTypeID == 0 ? (item.PackageTypeID == 0 ? "" : item.PackageTypeName) : item.ContainerTypeCode) + '</td>';
                                            //ReportHTML += '                     <td>' + (item.ContainerTypeID == 0 && item.PackageTypeID == 0 ? "" : item.CostQuantity) + '</td>';
                                            ReportHTML += '                     <td>' + (item.ContainerTypeID == 0 && item.PackageTypeID == 0 ? "" : item.CostQuantity) + '</td>';
                                            //if ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked'))
                                            //    ReportHTML += '                 <td>' + (item.DemurrageDays == 0 ? "" : item.DemurrageDays) + '</td>';
                                            ReportHTML += '                     <td>' + item.SaleAmount + '</td>';
                                            ReportHTML += '                     <td>' + item.SaleCurrencyCode + '</td>';
                                            ReportHTML += '                 </tr>';
                                        }
                                    });
                                    ReportHTML += '                 </table>';
                                }); //of $.each((pTblQuotationRoutes), function (i, item) {

                                if (pTermsAndConditions != "0") {
                                    if (!$("#cbRightToLeft").prop("checked"))
                                        ReportHTML += '                 <b><u>Terms & Conditions:</u></b><br>';
                                    ReportHTML += '                 <div class="col-xs-12 font-bold ' + ($("#cbRightToLeft").prop("checked") ? "text-right" : "") + '">' + pTermsAndConditions.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' </div><br>';
                                } else { //Default Terms&Conditions for NON SGA companies
                                    ReportHTML += '                 <b><u>Terms & Conditions:</u></b><br>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Above rates are not valid for dangerous cargo unless otherwise stated.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding insurance & legalization unless otherwise stated.</div>';
                                    ReportHTML += "                 <div class='col-xs-12'> - Our liability is limited to carrier's liability as per mentioned on bill of lading.</div><br>";
                                    ReportHTML += '                 <div class="col-xs-12 m-l-n">Trust this offer will meet your requirements and approval.</div>';
                                    ReportHTML += '                 <div class="col-xs-12 m-l-n">Please do not hesitate to call us if you have any inquiries on the above.</div><br>';
                                }

                                ReportHTML += '                 <h5><b>Thanks & Best Regards</b></h5>';
                                ReportHTML += '         </body>';
                                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                                if (pDefaults.UnEditableCompanyName == "TRL")
                                    ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                                ReportHTML += '     </footer>';
                                ReportHTML += '</html>';
                            } //EOF if (pDefaults.UnEditableCompanyName == "OAO" && $("#cbIsInland").prop("checked")) {
                            else if (pDefaults.UnEditableCompanyName == "OAO" && $("#cbIsOcean").prop("checked")) {
                                //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                                ReportHTML += '<html>';
                                ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                                ReportHTML += '         <body style="background-color:white;">';
                                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';

                                if ($("#cbHeaderQuotation").prop("checked"))
                                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><u><h3>' + 'Quotation' + '</h3></u></div>';
                                else if ($("#cbHeaderEstimate").prop("checked"))
                                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><u><h3>' + 'Estimate' + '</h3></u></div>';

                                ReportHTML += '                 <table id="tblBasicData" class="table table-striped b-t b-light text-sm table-bordered m-t" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                ReportHTML += '                     <thead>';
                                ReportHTML += '                         <td style="text-align:left!Important;">';
                                ReportHTML += '                             <div class="col-xs-6"><b>Date : </b>' + TodaysDateddMMyyyy + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>From : </b>' + pUserName + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Messrs : </b>' + (pIsPrintedForAgent ? pAgentName : pClientName) + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Mob. : </b>' + (pUserMobile1 == 0 ? "" : pUserMobile1) + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Attention : </b>' + (pIsPrintedForAgent ? (pAgentContactName == 0 ? "" : pAgentContactName) : (pClientContactName == 0 ? "" : pClientContactName)) + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Tel. : </b>' + (pUserPhone1 == 0 ? "" : pUserPhone1) + '</div>';
                                ReportHTML += '                             <div class="col-xs-6">' + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Email : </b>' + (pUserEmail == 0 ? "" : pUserEmail) + '</div>';
                                ReportHTML += '                         </td>';
                                ReportHTML += '                     </thead>';
                                ReportHTML += '                     <tr>';
                                ReportHTML += '                         <td style="text-align:left!Important;">';
                                ReportHTML += '                             <div class="col-xs-6"><b>Subject : </b>' + pRepDirectionTypeShown + ' Offer' + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Quotation Code : </b>' + pQuotationCode + '</div>';
                                ReportHTML += '                         </td>';
                                ReportHTML += '                     </tr>';
                                ReportHTML += '                 </table>';

                                if (pSubject == "0") {
                                    ReportHTML += '                 <b>Dear Sir,</b>';
                                    ReportHTML += '                 <br><b>&emsp; We have the pleasure to offer you the following :- </b><br><br>';
                                } else
                                    ReportHTML += '                 <br><b>' + pSubject.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' </b><br><br>';
                                $.each((pTblQuotationRoutes), function (i, item) {
                                    ReportHTML += '                 <div><b>(' + (i + 1) + ') ' + (item.MoveTypeName == 0 ? "" : item.MoveTypeName) + '</b></div><br>';
                                    ReportHTML += '                 <table id="tblOffer" class="table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                    ReportHTML += '                     <thead>';
                                    ReportHTML += '                         <th>Code</th>';
                                    if (item.MoveTypeName.toUpperCase() != "CUSTOMS CLEARANCE")
                                        ReportHTML += '                         <th>Line</th>';
                                    //ReportHTML += '                         <th>Pickup Address</th>';
                                    ReportHTML += '                         <th>POL</th>';
                                    if (item.MoveTypeName.toUpperCase() != "CUSTOMS CLEARANCE")
                                        ReportHTML += '                         <th>POD</th>';
                                    //ReportHTML += '                         <th>Delivery Address</th>';
                                    if (item.MoveTypeName.toUpperCase() != "CUSTOMS CLEARANCE")
                                        ReportHTML += '                         <th>T.T.</th>';
                                    ReportHTML += '                         <th class="hide">Validity</th>';
                                    if (item.MoveTypeName.toUpperCase() != "CUSTOMS CLEARANCE")
                                        ReportHTML += '                         <th>FreeTime</th>';
                                    ReportHTML += '                         <th>Expiration</th>';
                                    ReportHTML += '                     </thead>';
                                    ReportHTML += '                     <tr>';
                                    ReportHTML += '                         <td>' + item.Code + '</td>';
                                    if (item.MoveTypeName.toUpperCase() != "CUSTOMS CLEARANCE")
                                        ReportHTML += '                         <td>' + (item.LineName == 0 ? pDefaults.UnEditableCompanyName : item.LineName) + '</td>';
                                    //ReportHTML += '                         <td>' + (item.PickupAddress == 0 ? "" : item.PickupAddress) + '</td>';
                                    ReportHTML += '                         <td>' + item.POLName + '</td>';
                                    if (item.MoveTypeName.toUpperCase() != "CUSTOMS CLEARANCE")
                                        ReportHTML += '                         <td>' + item.PODName + '</td>';
                                    //ReportHTML += '                         <td>' + (item.DeliveryAddress == 0 ? "" : item.DeliveryAddress) + '</td>';
                                    if (item.MoveTypeName.toUpperCase() != "CUSTOMS CLEARANCE")
                                        ReportHTML += '                         <td>' + item.TransientTime + '</td>';
                                    ReportHTML += '                         <td class="hide">' + item.Validity + '</td>';
                                    if (item.MoveTypeName.toUpperCase() != "CUSTOMS CLEARANCE")
                                        ReportHTML += '                         <td>' + item.FreeTime + '</td>';
                                    ReportHTML += '                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) + '</td>';
                                    ReportHTML += '                     </tr>';
                                    ReportHTML += '                 </table>';
                                    var pQuotationRouteID = item.ID;
                                    ReportHTML += '                 <div class=" m-t-n"><b>Quotation Expenses :</b></div><br>';
                                    ReportHTML += '                 <table id="tblCharges" class="table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                    ReportHTML += '                     <thead>';
                                    ReportHTML += '                         <th>Item</th>';
                                    ReportHTML += '                         <th>Container/Package</th>';
                                    if ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked'))
                                        ReportHTML += '                     <th>Dem/day</th>';
                                    ReportHTML += '                         <th>Amount</th>';
                                    ReportHTML += '                         <th>Currency</th>';
                                    ReportHTML += '                     </thead>';
                                    $.each((pTblQuotationCharges), function (i, item) {
                                        if (item.QuotationRouteID == pQuotationRouteID && item.SalePrice > 0) {
                                            ReportHTML += '                 <tr>';
                                            ReportHTML += '                     <td>' + item.ChargeTypeName + '</td>';
                                            ReportHTML += '                     <td>' + (item.ContainerTypeID == 0 ? (item.PackageTypeID == 0 ? "" : item.PackageTypeName) : item.ContainerTypeCode) + '</td>';
                                            if ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked'))
                                                ReportHTML += '                 <td>' + (item.DemurrageDays == 0 ? "" : item.DemurrageDays) + '</td>';
                                            ReportHTML += '                     <td>' + item.SaleAmount + '</td>';
                                            ReportHTML += '                     <td>' + item.SaleCurrencyCode + '</td>';
                                            ReportHTML += '                 </tr>';
                                        }
                                    });
                                    ReportHTML += '                 </table>';
                                }); //of $.each((pTblQuotationRoutes), function (i, item) {

                                if (pTermsAndConditions != "0") {
                                    if (!$("#cbRightToLeft").prop("checked"))
                                        ReportHTML += '                 <b><u>Terms & Conditions:</u></b><br>';
                                    ReportHTML += '                 <div class="col-xs-12 ' + ($("#cbRightToLeft").prop("checked") ? "text-right" : "") + '">' + pTermsAndConditions.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' </div><br>';
                                } else {
                                    ReportHTML += '                 <b><u>Terms & Conditions:</u></b><br>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Above rates are not valid for dangerous cargo unless otherwise stated.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding insurance & legalization unless otherwise stated.</div>';
                                    ReportHTML += "                 <div class='col-xs-12'> - Our liability is limited to carrier's liability as per mentioned on bill of lading.</div><br>";
                                    ReportHTML += '                 <div class="col-xs-12 m-l-n">Trust this offer will meet your requirements and approval.</div>';
                                    ReportHTML += '                 <div class="col-xs-12 m-l-n">Please do not hesitate to call us if you have any inquiries on the above.</div><br>';
                                }

                                ReportHTML += '                 <h5><b>Thanks & Best Regards</b></h5>';
                                ReportHTML += '         </body>';
                                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                                if (pDefaults.UnEditableCompanyName == "TRL")
                                    ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                                ReportHTML += '     </footer>';
                                ReportHTML += '</html>';
                            } //else if (pDefaults.UnEditableCompanyName == "OAO" && $("#cbIsOcean").prop("checked")) {
                            else if (pDefaults.UnEditableCompanyName == "EGL") {
                                ReportHTML += '<html>';
                                ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                                ReportHTML += '         <body style="background-color:white;">';
                                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';

                                if ($("#cbHeaderQuotation").prop("checked"))
                                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><u><h3>' + 'Quotation' + '</h3></u></div>';
                                else if ($("#cbHeaderEstimate").prop("checked"))
                                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><u><h3>' + 'Estimate' + '</h3></u></div>';

                                ReportHTML += '                 <table id="tblBasicData" class="table table-striped b-t b-light text-sm table-bordered m-t" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                ReportHTML += '                     <thead>';
                                ReportHTML += '                         <td style="text-align:left!Important;">';
                                ReportHTML += '                             <div class="col-xs-6"><b>Date : </b>' + TodaysDateddMMyyyy + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>From : </b>' + pUserName + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Messrs : </b>' + (pIsPrintedForAgent ? pAgentName : pClientName) + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Mob. : </b>' + (pUserMobile1 == 0 ? "" : pUserMobile1) + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Attention : </b>' + (pIsPrintedForAgent ? (pAgentContactName == 0 ? "" : pAgentContactName) : (pClientContactName == 0 ? "" : pClientContactName)) + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Tel. : </b>' + (pUserPhone1 == 0 ? "" : pUserPhone1) + '</div>';
                                ReportHTML += '                             <div class="col-xs-6">' + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Email : </b>' + (pUserEmail == 0 ? "" : pUserEmail) + '</div>';
                                ReportHTML += '                         </td>';
                                ReportHTML += '                     </thead>';
                                ReportHTML += '                     <tr>';
                                ReportHTML += '                         <td style="text-align:left!Important;">';
                                ReportHTML += '                             <div class="col-xs-6"><b>Subject : </b>' + pRepDirectionTypeShown + ' Offer' + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Quotation Code : </b>' + pQuotationCode + '</div>';
                                ReportHTML += '                         </td>';
                                ReportHTML += '                     </tr>';
                                ReportHTML += '                 </table>';

                                if (pSubject == "0") {
                                    ReportHTML += '                 <b>Dear Sir,</b>';
                                    ReportHTML += '                 <br><b>&emsp; We have the pleasure to offer you the following :- </b><br><br>';
                                } else
                                    ReportHTML += '                 <br><b>' + pSubject.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' </b><br><br>';
                                $.each((pTblQuotationRoutes), function (i, item) {
                                    ReportHTML += '                 <div><b>(' + (i + 1) + ')</b></div><br>';
                                    ReportHTML += '                 <table id="tblOffer" class="table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                    ReportHTML += '                     <thead>';
                                    ReportHTML += '                         <th>Code</th>';
                                    ReportHTML += '                         <th>Line</th>';
                                    ReportHTML += '                         <th>Pickup Address</th>';
                                    ReportHTML += '                         <th>POL</th>';
                                    ReportHTML += '                         <th>POD</th>';
                                    ReportHTML += '                         <th>Delivery Address</th>';
                                    if (item.TransientTime != 0)
                                        ReportHTML += '                         <th>T.T.</th>';
                                    ReportHTML += '                         <th class="hide">Validity</th>';
                                    if (item.FreeTime != 0)
                                        ReportHTML += '                         <th>FreeTime</th>';
                                    ReportHTML += '                         <th>Validity</th>';
                                    ReportHTML += '                     </thead>';
                                    ReportHTML += '                     <tr>';
                                    ReportHTML += '                         <td>' + item.Code + '</td>';
                                    ReportHTML += '                         <td>' + (item.LineName == 0 ? pDefaults.UnEditableCompanyName : item.LineName) + '</td>';
                                    ReportHTML += '                         <td>' + (item.PickupAddress == 0 ? "" : item.PickupAddress) + '</td>';
                                    ReportHTML += '                         <td>' + item.POLName + '</td>';
                                    ReportHTML += '                         <td>' + item.PODName + '</td>';
                                    ReportHTML += '                         <td>' + (item.DeliveryAddress == 0 ? "" : item.DeliveryAddress) + '</td>';
                                    if (item.TransientTime != 0)
                                        ReportHTML += '                         <td>' + item.TransientTime + '</td>';
                                    ReportHTML += '                         <td class="hide">' + item.Validity + '</td>';
                                    if (item.FreeTime != 0)
                                        ReportHTML += '                         <td>' + item.FreeTime + '</td>';
                                    ReportHTML += '                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) + '</td>';
                                    ReportHTML += '                     </tr>';
                                    ReportHTML += '                 </table>';
                                    var pQuotationRouteID = item.ID;
                                    ReportHTML += '                 <div class=" m-t-n"><b>Quotation Expenses :</b></div><br>';
                                    ReportHTML += '                 <table id="tblCharges" class="table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                    ReportHTML += '                     <thead>';
                                    ReportHTML += '                         <th>Item</th>';
                                    ReportHTML += '                         <th>Container/Package</th>';
                                    ReportHTML += '                         <th>Amount</th>';
                                    ReportHTML += '                     </thead>';
                                    $.each((pTblQuotationCharges), function (i, item) {
                                        if (item.QuotationRouteID == pQuotationRouteID && item.SalePrice > 0) {
                                            ReportHTML += '                 <tr>';
                                            ReportHTML += '                     <td>' + item.ChargeTypeName + (item.Notes == 0 ? "" : (" (" + item.Notes + ")")) + '</td>';
                                            ReportHTML += '                     <td>' + (item.ContainerTypeID == 0 ? (item.PackageTypeID == 0 ? "" : item.PackageTypeName) : item.ContainerTypeCode) + '</td>';
                                            ReportHTML += '                     <td>' + item.SaleAmount + ' ' + item.SaleCurrencyCode + '</td>';
                                            ReportHTML += '                 </tr>';
                                        }
                                    });
                                    ReportHTML += '                 </table>';
                                }); //of $.each((pTblQuotationRoutes), function (i, item) {

                                if (pTermsAndConditions != "0") {
                                    if (!$("#cbRightToLeft").prop("checked"))
                                        ReportHTML += '                 <b><u>Terms & Conditions:</u></b><br>';
                                    ReportHTML += '                 <div class="col-xs-12 ' + ($("#cbRightToLeft").prop("checked") ? "text-right" : "") + '">' + pTermsAndConditions.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' </div><br>';
                                } else if (pDefaults.UnEditableCompanyName == "SGA") { //Default Terms and Conditions for SGA
                                    ReportHTML += '                 <div class="col-xs-12"><b><u>FOB:</u></b></div>';
                                    ReportHTML += '                 <div class="col-xs-12"><b><u>General Terms & Conditions:</u></b></div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding any official receipts.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - THC at both ends as per Carrier current tariff subject to change and final carrier invoice and currency fluctuation.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding VAT.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Rates are subject to modification upon any sovereign changes.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Above rate is net selling excluding bank charges.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - The above quotation is under EIFFA  trading  terms and condition.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - BAF, CAF and War risk surcharges are subject to change without any previous notice.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - A/M rate subject to any IMO surcharge additional if applicable.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Subject to equipment & space availability.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Vessels arrival date & transit time are estimated & subject to variation.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Rates should be confirmed prior booking.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Any additional services rising or demand during the shipment processing will be invoiced separately.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - The transfer cost attached to payment involved with shipment processing is for your account as per our bank notification "net transfer to SGA invoice".</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Payment term:</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - For credit our finance dept. requests irrevocable bank letter of guarantee or bank authenticated check with covering the credit ceiling for the credit facility + a contract signed by the authorized signature.</div>';
                                    ReportHTML += '                 <br><div class="col-xs-12"> Hope our offer meets your requirements.</div>';
                                    ReportHTML += '                 <hr style="width:97%;height:0px;border:.5px dotted #000;">';
                                    ReportHTML += '                 <div class="col-xs-12"><b><u>Ex-Works:</u></b></div>';
                                    ReportHTML += '                 <br><div class="col-xs-12"><b><u>Please note the following:</u></b></div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Free time for loading is 8 hours, thereafter detention charges applies EGP 700/Ct for the next 8 hours, Exceeding 16 Hours detention charges 50%, Exceeding 24 Hours detention charges 100% of the trucking rate per day or part of a day.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Subject to 3rd parties official receipts (incl. carrier' + "'" + 's OTHC, PTI, Power charges, road tolls, scale receipts, clearance ... etc.) which will be debited at cost along with the Supporting docs. </div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Subject to courier charges – if needed.</div>';
                                    ReportHTML += '                 <br><div class="col-xs-12"><b><u>General Terms & Conditions:</u></b></div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding any official receipts.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - THC at both ends as per Carrier current tariff subject to change and final carrier invoice and currency fluctuation.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding VAT.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Rates are subject to modification upon any sovereign changes.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Above rate is net selling excluding bank charges.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - The above quotation is under EIFFA  trading  terms and condition.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - BAF, CAF and War risk surcharges are subject to change without any previous notice.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - A/M rate subject to any IMO surcharge additional if applicable.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Subject to equipment & space availability.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Vessels arrival date & transit time are estimated & subject to variation.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Rates should be confirmed prior booking.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Any additional services rising or demand during the shipment processing will be invoiced separately.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - The transfer cost attached to payment involved with shipment processing is for your account as per our bank notification "net transfer to SGA invoice".</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Payment term:</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - For credit our finance dept. requests irrevocable bank letter of guarantee or bank authenticated check with covering the credit ceiling for the credit facility + a contract signed by the authorized signature.</div>';
                                    ReportHTML += '                 <br><div class="col-xs-12"> Hope our offer meets your requirements.</div>';
                                    ReportHTML += '                 <hr style="width:97%;height:0px;border:.5px dotted #000;">';
                                    ReportHTML += '                 <div class="col-xs-12"><b><u>Tanks General Conditions</u></b></div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Carrier is SGA choice.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Tank hire and ocean freight included.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - All local official receipts for export formalities, trucking, courier, inspection, weighing, telex release, THC at both ends are excluded.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding VAT.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Cleaning & 20ltr residue disposal costs included, excessive amount is charged in addition.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - All local costs destination; port handlings, documentation, un/loading haulage (inclusive of re/delivery at depot/port), truck demurrage alike excluded.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Pump/compressor & hoses are provided by shipper or receiver.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Heating/heating stop, specialized/additional un/loading equipment, drop/recollection, vacuum/leak test, handrail installation excluded.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - All sorts of un/loading-related works are carried out by shipper/receiver at their own responsibility and cost.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Free time for un/loading & truck detention afterwards is charged as per agreed conditions/tariff.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Transit time refers ‘’port to port‘’ & may change due to weather or other conditions.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Tanks are not temperature controlled. Although tanks are thermally insulated however product being carried may solidify to such an extent that may result in deterioration of quality including total loss of product. For such an incident, carrier shall not be deemed responsible. Costs of re-heating the solidified product into its original state, charges for redelivery at origin or at disposal site as well as any other associated costs are re-charged on shipper/receiver in addition.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Where mentioned, net payload given is based on allowable gross weight on road&rail at un/load and/or crossing country, may change due to product’s specific gravity, safety margin applied and/or due to other variables. Net weight actually loaded that can be less than the permissible max payload shall not change the freight price quoted herein.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Where mentioned, ‘’non-hazardous or not regulated”, dependent on shipper’s declaration, refers to that the product being shipped is not regulated as per ADR/IMDG/RID Conventions but it does not refer to any other product related specifications.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Any damage incurred to tank ex/interior during heating and/or transport and/or other handlings being performed under shipper/receiver’s in/direct control, shall be fully at shipper/receiver’s account. Shipper/receiver is also regarded to be completely aware of that indicative replacement value of a tank is Usd 22,000.-</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Any party acting together with or on behalf of the shipper/receiver is regarded successively and jointly and severally responsible for all of conditions, fees and charges arising from the said shipment mentioned herein this offer/agreement.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - In conformity with current regulations at any customs at arrival/departure/transshipment ports/terminals, related declaration must be submitted minimum 48 hours prior to actual departure/arrival at related terminal/port. Otherwise and any incorrect declaration/information given due to whatsoever reason, any extra cost & full liability to incur thereof are on shipper’s account.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Where revelant, particular permission at customs of origin and destination are in full responsibility of shipper and any delay or complications occured as well as all consequences thereof shall be on shipper’s full responsibility.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Dangerous Cargo declaration where relevant shall be submitted by shipper to carrier minimum 48 hours prior to actual shipment reservation. Otherwise and any incorrect declaration/information given due to whatsoever reason, any extra cost & full liability to incur thereof are on shipper’s account.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Where related, all necessary permissions for im/export and/or transport are met by shipper/receiver by their selves at their own cost solely.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Carrier where found necessary may change at its own initiative route and kind of equipment given here, without harming the general terms agreed.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Carrier has right to adjust the rates should the surcharges or other cost content change.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Confirmation by return with authorized signature and company stamp that shipper accepts all terms and conditions as mentioned in this offer is required. If the subject transport service has been performed, however, without receipt of your confirmation, the complete contents inclusive of all terms and conditions of this quotation shall be deemed acknowledged and confirmed by the shipper undersigned herein. Furthermore, tanks supplied by carrier is regarded automatically, without need for any further approval in written or verbal prior or following after completion of loading, suitable and safe for loading the subject product.</div>';

                                } else { //Default Terms&Conditions for NON SGA companies
                                    ReportHTML += '                 <b><u>Terms & Conditions:</u></b><br>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Above rates are not valid for dangerous cargo unless otherwise stated.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding insurance & legalization unless otherwise stated.</div>';
                                    ReportHTML += "                 <div class='col-xs-12'> - Our liability is limited to carrier's liability as per mentioned on bill of lading.</div><br>";
                                    ReportHTML += '                 <div class="col-xs-12 m-l-n">Trust this offer will meet your requirements and approval.</div>';
                                    ReportHTML += '                 <div class="col-xs-12 m-l-n">Please do not hesitate to call us if you have any inquiries on the above.</div><br>';
                                }

                                ReportHTML += '                 <h5><b>Thanks & Best Regards</b></h5>';
                                ReportHTML += '         </body>';
                                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                                if (pDefaults.UnEditableCompanyName == "TRL" || pDefaults.UnEditableCompanyName == "HAS")
                                    ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                                ReportHTML += '     </footer>';
                                ReportHTML += '</html>';
                            } //else if (pDefaults.UnEditableCompanyName == "EGL") {
                            else if (pDefaults.UnEditableCompanyName == "NIL") {
                                debugger;
                                ReportHTML += '<html>';
                                ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                                ReportHTML += '         <body style="background-color:white;">';
                                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';

                                if ($("#cbHeaderQuotation").prop("checked"))
                                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><u><h3>' + 'Quotation' + '</h3></u></div>';
                                else if ($("#cbHeaderEstimate").prop("checked"))
                                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><u><h3>' + 'Estimate' + '</h3></u></div>';

                                ReportHTML += '                 <table id="tblBasicData" class="table table-striped b-t b-light text-sm table-bordered m-t" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                ReportHTML += '                     <thead>';
                                ReportHTML += '                         <td style="text-align:left!Important;">';
                                ReportHTML += '                             <div class="col-xs-6"><b>Date : </b>' + TodaysDateddMMyyyy + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>From : </b>' + ($("#cbSentFromLoggedUser").prop("checked") ? pUserName : pSalesmanHeader.Name) + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Messrs : </b>' + (pIsPrintedForAgent ? pAgentName : pClientName) + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Mob. : </b>' + ($("#cbSentFromLoggedUser").prop("checked") ? (pUserMobile1 == 0 ? "" : pUserMobile1) : (pSalesmanHeader.Mobile1 == 0 ? "" : pSalesmanHeader.Mobile1)) + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Attention : </b>' + (pIsPrintedForAgent ? (pAgentContactName == 0 ? "" : pAgentContactName) : (pClientContactName == 0 ? "" : pClientContactName)) + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Tel. : </b>' + ($("#cbSentFromLoggedUser").prop("checked") ? (pUserPhone1 == 0 ? "" : pUserPhone1) : (pSalesmanHeader.Phone1 == 0 ? "" : pSalesmanHeader.Phone1)) + '</div>';

                                ReportHTML += '                             <div class="col-xs-6">' + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Email : </b>' + (pSalesmanHeader.Email == 0 ? "" : pSalesmanHeader.Email) + '</div>';
                                ReportHTML += '                         </td>';
                                ReportHTML += '                     </thead>';
                                ReportHTML += '                     <tr>';
                                ReportHTML += '                         <td style="text-align:left!Important;">';
                                //ReportHTML += '                             <div class="col-xs-6"><b>Ref : </b>' + (pTblQuotationRoutes[0].Notes == 0 || pTblQuotationRoutes[0].Notes == undefined ? "" : pTblQuotationRoutes[0].Notes) + '</div>';
                                ReportHTML += '                             <div class="col-xs-6"><b>Quotation Code : </b>' + pQuotationCode + '</div>';
                                ReportHTML += '                         </td>';
                                ReportHTML += '                     </tr>';
                                ReportHTML += '                 </table>';

                                ReportHTML += '                 <div class="col-xs-8">';
                                ReportHTML += '                     <b>Service Scope : </b>' + (pTblQuotationRoutes[0].MoveTypeName == 0 || pTblQuotationRoutes[0].MoveTypeName == undefined ? "" : pTblQuotationRoutes[0].MoveTypeName);
                                if (pSubject == "0") {
                                    ReportHTML += '                 <br><b>We have the pleasure to offer you the following :- </b><br><br>';
                                } else
                                    ReportHTML += '                 <br><b>' + pSubject.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' </b><br><br>';
                                ReportHTML += '                 </div>';
                                ReportHTML += '                 <div class="col-xs-4">';
                                if (pQuotationHeader.DescriptionOfGoods != 0) {
                                    ReportHTML += '                 <b><u>Description of Goods:</u></b><br>';
                                    ReportHTML += '                 <div class="' + ($("#cbRightToLeft").prop("checked") ? "text-right" : "") + '">' + pQuotationHeader.DescriptionOfGoods.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' </div>';
                                }
                                ReportHTML += '                 </div>';
                                //$.each((pShipmentDetails), function (i, item) {
                                //    ReportHTML += '                 <div style="clear:both;"><b> Container Types : ' + (item.ContainerTypeCode == "" ? '' : item.ContainerTypeCode) + '</div><br>';
                                //});

                                $.each((pTblQuotationRoutes), function (i, item) {
                                    ReportHTML += '                 <div style="clear:both;"><b>(' + (i + 1) + ') Ref : ' + (item.Notes == 0 ? '' : item.Notes) + '</b></div><br>';
                                    ReportHTML += '<div style="clear:both;"><b> Container Types: ';
                                    $.each(pShipmentDetails, function (i, item) {
                                        ReportHTML += (item.ContainerTypeCode == "" ? '' : item.ContainerTypeCode) + ', ';
                                    });
                                    ReportHTML = ReportHTML.slice(0, -2);  // Remove the trailing comma and space
                                    ReportHTML += '</b></div><br>';
                                    ReportHTML += '                 <table id="tblOffer" class="table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                    ReportHTML += '                     <thead>';
                                    ReportHTML += '                         <th>Code</th>';
                                    ReportHTML += '                         <th>Line</th>';
                                    ReportHTML += '                         <th>Pickup Address</th>';
                                    ReportHTML += '                         <th>POL</th>';
                                    ReportHTML += '                         <th>POD</th>';
                                    ReportHTML += '                         <th>Delivery Address</th>';
                                    ReportHTML += '                         <th>Commodity</th>';
                                    ReportHTML += '                         <th>Incoterm</th>';
                                    ReportHTML += '                         <th>FreeTime POL</th>';
                                    if (pDefaults.UnEditableCompanyName == "NIL")
                                        ReportHTML += '                         <th>FreeTime POD</th>';

                                    ReportHTML += '                         <th>TT</th>';
                                    ReportHTML += '                         <th>Expiration</th>';
                                    ReportHTML += '                     </thead>';
                                    ReportHTML += '                     <tr>';
                                    ReportHTML += '                         <td>' + item.Code + '</td>';
                                    ReportHTML += '                         <td>' + (item.LineName == 0 ? pDefaults.UnEditableCompanyName : item.LineName) + '</td>';
                                    ReportHTML += '                         <td>' + (item.PickupAddress == 0 ? "" : item.PickupAddress) + '</td>';
                                    ReportHTML += '                         <td>' + item.POLName + '</td>';
                                    ReportHTML += '                         <td>' + item.PODName + '</td>';
                                    ReportHTML += '                         <td>' + (item.DeliveryAddress == 0 ? "" : item.DeliveryAddress) + '</td>';
                                    ReportHTML += '                         <td>' + (item.CommodityName == 0 ? "" : item.CommodityName) + '</td>';
                                    ReportHTML += '                         <td>' + (item.IncotermName == 0 ? "" : item.IncotermName) + '</td>';
                                    ReportHTML += '                         <td>' + (item.FreeTime == 0 ? '' : item.FreeTime) + '</td>';
                                    if (pDefaults.UnEditableCompanyName == "NIL")
                                        ReportHTML += '                         <td>' + (item.FreeTimePOD == 0 ? '' : item.FreeTimePOD) + '</td>';

                                    ReportHTML += '                         <td>' + (item.TransientTime == 0 ? '' : item.TransientTime) + '</td>';
                                    ReportHTML += '                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) + '</td>';
                                    ReportHTML += '                     </tr>';
                                    ReportHTML += '                 </table>';
                                    var pQuotationRouteID = item.ID;
                                    ReportHTML += '                 <div class=" m-t-n"><b>Quotation Expenses :</b></div><br>';
                                    ReportHTML += '                 <table id="tblCharges"' + pQuotationRouteID + ' class="table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                    ReportHTML += '                     <thead>';
                                    ReportHTML += '                         <th>Item</th>';
                                    //ReportHTML += '                         <th>Container/Package</th>';
                                    ReportHTML += '                         <th>Notes</th>';
                                    if ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked'))
                                        ReportHTML += '                     <th>Dem/day</th>';
                                    ReportHTML += '                         <th>Qty</th>';
                                    ReportHTML += '                         <th>UnitPrice</th>';
                                    ReportHTML += '                         <th>Amount</th>';
                                    ReportHTML += '                         <th>Currency</th>';
                                    ReportHTML += '                     </thead>';
                                    $.each((pTblQuotationCharges), function (i, item) {
                                        if (item.QuotationRouteID == pQuotationRouteID && item.SalePrice > 0) {
                                            ReportHTML += '                 <tr>';
                                            ReportHTML += '                     <td>' + item.ChargeTypeName + '</td>';
                                            //ReportHTML += '                     <td>' + (item.ContainerTypeID == 0 ? (item.PackageTypeID == 0 ? "" : item.PackageTypeName) : item.ContainerTypeCode) + '</td>';
                                            ReportHTML += '                     <td>' + (item.Notes == 0 ? "" : item.Notes) + '</td>';
                                            if ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked'))
                                                ReportHTML += '                 <td>' + (item.DemurrageDays == 0 ? "" : item.DemurrageDays) + '</td>';
                                            ReportHTML += '                     <td>' + item.CostQuantity + '</td>';
                                            ReportHTML += '                     <td>' + item.SalePrice + '</td>';
                                            ReportHTML += '                     <td>' + item.SaleAmount + '</td>';
                                            ReportHTML += '                     <td>' + item.SaleCurrencyCode + '</td>';
                                            ReportHTML += '                 </tr>';
                                        }
                                    });
                                    ReportHTML += '                 </table>';
                                    var _CurrentQRCharges = pTblQuotationCharges.filter(x => x.QuotationRouteID == pQuotationRouteID);
                                    var _TotalCurrencies = QuotationsEdit_CalculateTotalCurrenciesSummaryFromArray(_CurrentQRCharges);
                                    if (pDefaults.UnEditableCompanyName != "BOM") {
                                        ReportHTML += '<div class="col-xs-12 m-t-n text-right"><b>Total : ' + _TotalCurrencies.replace(/ /g, "&nbsp;").replace(/,/g, "<br />") + '</b></div>';
                                    }
                                }); //of $.each((pTblQuotationRoutes), function (i, item) {
                                if (pTermsAndConditions != "0") {
                                    if (!$("#cbRightToLeft").prop("checked"))
                                        ReportHTML += '                 <b><u>Terms & Conditions:</u></b><br>';
                                    ReportHTML += '                 <div class="col-xs-12 ' + ($("#cbRightToLeft").prop("checked") ? "text-right" : "") + '">' + pTermsAndConditions.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' </div><br>';
                                } else { //Default Terms&Conditions
                                    ReportHTML += '                 <b><u>Terms & Conditions:</u></b><br>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Above rates are not valid for dangerous cargo unless otherwise stated.</div>';
                                    ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding insurance & legalization unless otherwise stated.</div>';
                                    ReportHTML += "                 <div class='col-xs-12'> - Our liability is limited to carrier's liability as per mentioned on bill of lading.</div><br>";
                                    ReportHTML += '                 <div class="col-xs-12 m-l-n">Trust this offer will meet your requirements and approval.</div>';
                                    ReportHTML += '                 <div class="col-xs-12 m-l-n">Please do not hesitate to call us if you have any inquiries on the above.</div><br>';
                                }

                                ReportHTML += '                 <h5><b>Thanks & Best Regards ,</b></h5>';
                                ReportHTML += '                 <h5><b>' + pSalesmanHeader.Name + '</b></h5>';
                                ReportHTML += '                 <h5><b>' + (pSalesmanHeader.Mobile1 == 0 ? "" : ('TEL : ' + pSalesmanHeader.Mobile1)) + (pSalesmanHeader.Email == 0 ? "" : ('&emsp;Email : ' + pSalesmanHeader.Email)) + '</b></h5>';
                                ReportHTML += '         </body>';
                                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                                if (pDefaults.UnEditableCompanyName == "TRL" || pDefaults.UnEditableCompanyName == "HAS")
                                    ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                                ReportHTML += '     </footer>';
                                ReportHTML += '</html>';
                            } //else if (pDefaults.UnEditableCompanyName == "NIL") {
                            else { //#region Other Companies
                                debugger;
                                //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                                ReportHTML += '<html>';
                                ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                                ReportHTML += '         <body style="background-color:white;">';
                                if (pDefaults.UnEditableCompanyName == "LAT")
                                    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader-LATT-Logo.jpg" alt="logo"/></div> </br>';
                                if (pDefaults.UnEditableCompanyName == "REL")
                                    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/relanLogo.png" alt="logo"/></div> </br>';
                                else if (pDefaults.UnEditableCompanyName == "TEL")
                                    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader-Quotation.jpg" alt="logo"/></div> </br>';
                                else if (pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG") {
                                    ReportHTML += '             <div class="col-xs-7 text-center m-b"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                                    ReportHTML += '             <div class="col-xs-5 text-center m-b">';
                                    ReportHTML += '                 <table calss="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000 !important;">';
                                    ReportHTML += '                     <tr>';
                                    ReportHTML += '                         <td>Offer No</td>' + '<td>' + pQuotationCode + '</td>';
                                    ReportHTML += '                     </tr>';
                                    ReportHTML += '                     <tr>';
                                    ReportHTML += '                         <td>Offer Date</td>' + '<td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pQuotationHeader.OpenDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pQuotationHeader.OpenDate))) + '</td>';
                                    ReportHTML += '                     </tr>';
                                    ReportHTML += '                 </table>';
                                    ReportHTML += '             </div>';
                                }
                                else if (pDefaults.UnEditableCompanyName == "MAN")
                                    ReportHTML += '              <div class="col-xs-12 text-left"><img style="WIDTH: 30%" src="/Content/Images/YLMLogoFinalConv-01.svg" alt="logo"/></div> </br>';
                                else if (pDefaults.UnEditableCompanyName == "OPL") {
                                    ReportHTML += '             <div class="col-xs-12 text-left"><img style=" width: 25%; " src="/Content/Images/InvoiceCompanyHeader.jpg" alt="logo"/></div> </br>';
                                    ReportHTML += '             <h1 style="position: fixed; top: 50px; right: 40px; color: #12529a !important; font-size: 40px; font-weight: bold;text-align: center;">QUOTATION</h1>';
                                }
                                else
                                    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';

                                if ($("#cbHeaderQuotation").prop("checked"))
                                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><u><h3>' + 'Quotation' + '</h3></u></div>';
                                else if ($("#cbHeaderEstimate").prop("checked"))
                                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><u><h3>' + 'Estimate' + '</h3></u></div>';

                                var ReportHTMLtemp = ReportHTML;
                                ReportHTML = '';

                                if (pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG") {


                                    ReportHTML += '                 <table id="tblBasicData" class="table table-striped b-t b-light text-sm table-bordered m-t" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                    ReportHTML += '                     <thead>';
                                    ReportHTML += '                         <td style="text-align:left!Important;">';
                                    ReportHTML += '                             <div class="col-xs-6">';
                                    ReportHTML += '                                 <b>Company : </b>' + pClientName; //pDefaults.CompanyName;
                                    ReportHTML += '                                 <br><b>Contact Name : </b>' + pClientContactName; //pLoggedUser.Name;
                                    ReportHTML += '                                 <br><b>Email : </b>' + (pCustomer.Email == 0 ? "" : pCustomer.Email); //(pLoggedUser.Email == 0 ? "" : pLoggedUser.Email);
                                    ReportHTML += '                                 <br><b>Phone : </b>' + (pCustomer.PhonesAndFaxes == 0 ? "" : pCustomer.PhonesAndFaxes); //(pLoggedUser.Phone1 == 0 ? "" : pLoggedUser.Phone1);
                                    ReportHTML += '                             </div>';

                                    ReportHTML += '                             <div class="col-xs-6">';
                                    ReportHTML += '                                 <b>Service : </b>' + pRepDirectionTypeShown; //(pTblQuotationRoutes.length > 0 ? pTblQuotationRoutes[0].MoveTypeName : "");
                                    ReportHTML += '                                 <br><b>Sale Rep. : </b>' + pSalesmanHeader.Name;
                                    ReportHTML += '                                 <br><b>Email : </b>' + (pSalesmanHeader.Email == 0 ? "" : pSalesmanHeader.Email);
                                    ReportHTML += '                                 <br><b>Phone : </b>' + (pSalesmanHeader.Phone1 == 0 ? "" : pSalesmanHeader.Phone1);
                                    ReportHTML += '                             </div>';
                                    ReportHTML += '                         </td>';
                                    ReportHTML += '                     </thead>';
                                    ReportHTML += '                     <tr>';
                                    ReportHTML += '                         <td style="text-align:left!Important;">';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Customer : </b>' + (pIsPrintedForAgent ? pAgentName : pClientName) + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Goods Desc. : </b>' + (pQuotationHeader.DescriptionOfGoods == 0 ? "" : pQuotationHeader.DescriptionOfGoods) + '</div>';
                                    ReportHTML += '                         </td>';
                                    ReportHTML += '                     </tr>';
                                    ReportHTML += '                 </table>';

                                    ReportHTMLHeader = ReportHTML;
                                    ReportHTML = ReportHTMLtemp + ReportHTML;
                                }
                                else if (pDefaults.UnEditableCompanyName == "TRM") {
                                    ReportHTML += '                 <table id="tblBasicData" class="table table-striped b-t b-light text-sm table-bordered m-t" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                    ReportHTML += '                     <thead>';
                                    ReportHTML += '                         <td style="text-align:left!Important;">';
                                    ReportHTML += '                             <div class="col-xs-12"><b>Date : </b>' + TodaysDateddMMyyyy + '</div>';
                                    ReportHTML += '                             <div class="col-xs-12"><b>Quotation Code : </b>' + pQuotationCode + '</div>';
                                    ReportHTML += '                             <div class="col-xs-12"><b>Customer : </b>' + (pIsPrintedForAgent ? pAgentName : pClientName) + '</div>';


                                    ReportHTML += '                         </td>';
                                    ReportHTML += '                     </thead>';
                                    ReportHTML += '                     <tr>';
                                    ReportHTML += '                         <td style="text-align:left!Important;">';

                                    ReportHTML += '                             <div class="col-xs-12"><b>Subject : </b>' + pRepDirectionTypeShown + ' ' + pTransportTypeName + ' ' + (IsNull(pShipmentTypeName, '0') == '0' ? '' : pShipmentTypeName) + ' Offer' + '</div>';


                                    ReportHTML += '                         </td>';
                                    ReportHTML += '                     </tr>';
                                    ReportHTML += '                 </table>';
                                    ReportHTMLHeader = ReportHTML;
                                    ReportHTML = ReportHTMLtemp + ReportHTML;
                                }
                                else if (pDefaults.UnEditableCompanyName == "LATT" || pDefaults.UnEditableCompanyName == "LAT") {

                                    ReportHTML += '                 <table id="tblBasicData" class="table table-striped b-t b-light text-sm table-bordered m-t" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                    ReportHTML += '                     <thead>';
                                    ReportHTML += '                         <td style="text-align:left!Important;">';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Date : </b>' + TodaysDateddMMyyyy + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>From : </b>' + ($("#cbSentFromLoggedUser").prop("checked") ? pUserName : pSalesmanHeader.Name) + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Messrs : </b>' + (pIsPrintedForAgent ? pAgentName : (isPrintedForExporter ? pQuotationHeader.ExporterName : pClientName)) + '</div>';

                                    ReportHTML += '                             <div class="col-xs-6"><b>Mob. : </b>' + ($("#cbSentFromLoggedUser").prop("checked") ? (pUserMobile1 == 0 ? "" : pUserMobile1) : (pSalesmanHeader.Mobile1 == 0 ? "" : pSalesmanHeader.Mobile1)) + '</div>';
                                    if (pIsPrintedForAgent)
                                        ReportHTML += '                             <div class="col-xs-6"><b>Attention : </b>' + (pIsPrintedForAgent ? (pAgentContactName == 0 ? "" : pAgentContactName) : "") + '</div>';
                                    else
                                        ReportHTML += '                             <div class="col-xs-6">' + '' + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Tel. : </b>' + ($("#cbSentFromLoggedUser").prop("checked") ? (pUserPhone1 == 0 ? "" : pUserPhone1) : (pSalesmanHeader.Phone1 == 0 ? "" : pSalesmanHeader.Phone1)) + '</div>';

                                    ReportHTML += '                             <div class="col-xs-6">' + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Email : </b>' + ($("#cbSentFromLoggedUser").prop("checked") ? (pUserEmail == 0 ? "" : pUserEmail) : (pSalesmanHeader.Email == 0 ? "" : pSalesmanHeader.Email)) + '</div>';

                                    ReportHTML += '                         </td>';
                                    ReportHTML += '                     </thead>';
                                    ReportHTML += '                     <tr>';
                                    ReportHTML += '                         <td style="text-align:left!Important;">';

                                    ReportHTML += '                             <div class="col-xs-6"><b>Subject : </b>' + pRepDirectionTypeShown + ' ' + pTransportTypeName + ' ' + (IsNull(pShipmentTypeName, '0') == '0' ? '' : pShipmentTypeName) + ' Offer' + '</div>';

                                    ReportHTML += '                             <div class="col-xs-6"><b>Quotation Code : </b>' + pQuotationCode + '</div>';
                                    ReportHTML += '                         </td>';
                                    ReportHTML += '                     </tr>';
                                    ReportHTML += '                 </table>';
                                    ReportHTMLHeader = ReportHTML;
                                    ReportHTML = ReportHTMLtemp + ReportHTML;
                                }

                                else if (pDefaults.UnEditableCompanyName == "OPL") {
                                    ReportHTML += '                 <table id="tblBasicData" class="m-t table table-striped b-t b-light text-sm" style="border-color: #12529a;border-width: 2px;border-style: solid;margin: 0;border-radius: 15px;">'; //the style is to fix disappearance of borders when printing with firefox
                                    ReportHTML += '                     <thead>';
                                    ReportHTML += '                         <td style="text-align:left!Important;">';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Date : </b>' + TodaysDateddMMyyyy + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>From : </b>' + ($("#cbSentFromLoggedUser").prop("checked") ? pUserName : pSalesmanHeader.Name) + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Messrs : </b>' + (pIsPrintedForAgent ? pAgentName : pClientName) + '</div>';

                                    ReportHTML += '                             <div class="col-xs-6"><b>Mob. : </b>' + ($("#cbSentFromLoggedUser").prop("checked") ? (pUserMobile1 == 0 ? "" : pUserMobile1) : (pSalesmanHeader.Mobile1 == 0 ? "" : pSalesmanHeader.Mobile1)) + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Attention : </b>' + (pIsPrintedForAgent ? (pAgentContactName == 0 ? "" : pAgentContactName) : (pClientContactName == 0 ? "" : pClientContactName)) + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Tel. : </b>' + ($("#cbSentFromLoggedUser").prop("checked") ? (pUserPhone1 == 0 ? "" : pUserPhone1) : (pSalesmanHeader.Phone1 == 0 ? "" : pSalesmanHeader.Phone1)) + '</div>';


                                    ReportHTML += '                             <div class="col-xs-6">' + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Email : </b>' + ($("#cbSentFromLoggedUser").prop("checked") ? (pUserEmail == 0 ? "" : pUserEmail) : (pSalesmanHeader.Email == 0 ? "" : pSalesmanHeader.Email)) + '</div>';

                                    ReportHTML += '                         </td>';
                                    ReportHTML += '                     </thead>';
                                    ReportHTML += '                     <tr>';
                                    ReportHTML += '                         <td style="text-align:left!Important;">';

                                    ReportHTML += '                             <div class="col-xs-6"><b>Subject : </b>' + pRepDirectionTypeShown + ' ' + pTransportTypeName + ' ' + (IsNull(pShipmentTypeName, '0') == '0' ? '' : pShipmentTypeName) + ' Offer' + '</div>';


                                    ReportHTML += '                             <div class="col-xs-6"><b>Quotation Code : </b>' + pQuotationCode + '</div>';
                                    ReportHTML += '                         </td>';
                                    ReportHTML += '                     </tr>';
                                    ReportHTML += '                 </table>';
                                    ReportHTMLHeader = ReportHTML;
                                    ReportHTML = ReportHTMLtemp + ReportHTML;
                                }
                                else {
                                    ReportHTML += '                 <table id="tblBasicData" class="table table-striped b-t b-light text-sm table-bordered m-t" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                                    ReportHTML += '                     <thead>';
                                    ReportHTML += '                         <td style="text-align:left!Important;">';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Date : </b>' + TodaysDateddMMyyyy + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>From : </b>' + ($("#cbSentFromLoggedUser").prop("checked") ? pUserName : pSalesmanHeader.Name) + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Messrs : </b>' + (pIsPrintedForAgent ? pAgentName : pClientName) + '</div>';
                                    if (pIsPrintedForAgent && pDefaults.UnEditableCompanyName == "MED")
                                        ReportHTML += '                             <div class="col-xs-6"><b>Agent : </b>' + (pAgentName) + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Mob. : </b>' + ($("#cbSentFromLoggedUser").prop("checked") ? (pUserMobile1 == 0 ? "" : pUserMobile1) : (pSalesmanHeader.Mobile1 == 0 ? "" : pSalesmanHeader.Mobile1)) + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Attention : </b>' + (pIsPrintedForAgent ? (pAgentContactName == 0 ? "" : pAgentContactName) : (pClientContactName == 0 ? "" : pClientContactName)) + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Tel. : </b>' + ($("#cbSentFromLoggedUser").prop("checked") ? (pUserPhone1 == 0 ? "" : pUserPhone1) : (pSalesmanHeader.Phone1 == 0 ? "" : pSalesmanHeader.Phone1)) + '</div>';
                                    if (pDefaults.UnEditableCompanyName == "SHO")
                                        ReportHTML += '                             <div class="col-xs-6"><b>Title : </b>' + (pCustomer.length == 0 ? "" : (pCustomer.Notes == 0 ? "" : pCustomer.Notes)) + '</div>';
                                    else
                                        ReportHTML += '                             <div class="col-xs-6">' + '</div>';
                                    ReportHTML += '                             <div class="col-xs-6"><b>Email : </b>' + ($("#cbSentFromLoggedUser").prop("checked") ? (pUserEmail == 0 ? "" : pUserEmail) : (pSalesmanHeader.Email == 0 ? "" : pSalesmanHeader.Email)) + '</div>';
                                    if (pDefaults.UnEditableCompanyName == "SHO") {
                                        ReportHTML += '                             <div class="col-xs-6"><b>Client Email : </b>' + (pQuotationHeader.ClientEmail == 0 ? "" : pQuotationHeader.ClientEmail) + '</div>';
                                        ReportHTML += '                             <div class="col-xs-6"><b>Quot.Date : </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pQuotationHeader.OpenDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pQuotationHeader.OpenDate))) + '</div>';
                                    }
                                    ReportHTML += '                         </td>';
                                    ReportHTML += '                     </thead>';
                                    ReportHTML += '                     <tr>';
                                    ReportHTML += '                         <td style="text-align:left!Important;">';
                                    if (pDefaults.UnEditableCompanyName == "ELI")
                                        ReportHTML += '                             <div class="col-xs-6"><b>Subject : </b>' + pRepDirectionTypeShown + ' Offer to ' + pTblQuotationRoutes[0].PODName + '</div>';
                                    else if (pDefaults.UnEditableCompanyName == "KDM")
                                        ReportHTML += '                             <div class="col-xs-6"><b>Subject : </b>' + pRepDirectionTypeShown + ' Offer' + '  <b class="m-l-md">POD : </b> ' + (pTblQuotationRoutes.length > 0 ? pTblQuotationRoutes[0].PODName : "") + '</div>';
                                    else
                                        ReportHTML += '                             <div class="col-xs-6"><b>Subject : </b>' + pRepDirectionTypeShown + ' ' + pTransportTypeName + ' ' + (IsNull(pShipmentTypeName, '0') == '0' ? '' : pShipmentTypeName) + ' Offer' + '</div>';

                                    if (pDefaults.UnEditableCompanyName != "MAY" || (pDefaults.UnEditableCompanyName == "MAY" && $("#cbPrintQuotationCode").prop("checked")))
                                        ReportHTML += '                             <div class="col-xs-6"><b>Quotation Code : </b>' + pQuotationCode + '</div>';
                                    ReportHTML += '                         </td>';
                                    ReportHTML += '                     </tr>';
                                    ReportHTML += '                 </table>';
                                    ReportHTMLHeader = ReportHTML;
                                    ReportHTML = ReportHTMLtemp + ReportHTML;
                                }
                                //if (pDefaults.UnEditableCompanyName == "ELI") {
                                //    ReportHTML += '                 <b>Dear Sir,</b>';
                                //    ReportHTML += '                 <br><b>We <span  style="color:#4791d2;">ELITE</span> has the pleasure to cooperate with your honor & your esteemed company and to offer our best service and rates for your shipments as follows:</b><br><br>';
                                //}
                                //else
                                if (pSubject == "0") {
                                    if (pDefaults.UnEditableCompanyName == "SHO")
                                        ReportHTML += '                 <b>Subject:</b><br>';
                                    ReportHTML += '                 <b>Dear Sir,</b>';
                                    ReportHTML += '                 <br><b>&emsp; We have the pleasure to offer you the following :- </b><br>';
                                } else
                                    ReportHTML += '                 <b>' + pSubject.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' </b><br>';

                                debugger;
                                //ahmed2022-12-25
                                $.each((pTblQuotationRoutes), function (i, item) {
                                    var pQuotationRouteID;
                                    ({ pQuotationRouteID, ReportHTML } = DrawOfferTable(ReportHTML, i, item, pQuotationHeader));
                                    //#region Charge Table
                                    if ($("#cbExtraContainer").prop("checked")) {
                                        ReportHTML = DrawExtraContainers(pTblQuotationCharges, pQuotationRouteID, ReportHTML, ReportHTMLHeader);
                                    } else {
                                        var i;
                                        ({ i, ReportHTML, i } = DrawQuotationExpenses(ReportHTML, pTblQuotationCharges, item, pQuotationRouteID, pQuotationHeader, pOption, _SelectedQuotationChargesIDs, i, pTermsAndConditionsTransport, pTermsAndConditionsClearance, pTermsAndConditions));
                                    }

                                }); //of $.each((pTblQuotationRoutes), function (i, item) 

                                if ($("#cbShipmentDetails").prop("checked")) {
                                    ReportHTML = DrawShipmentDetails(pShipmentDetails, ReportHTML);
                                }

                                if ((pDefaults.UnEditableCompanyName == "KDM" || pDefaults.UnEditableCompanyName == "ELC")
                                    && pTblQuotationRoutes.length == 1) {
                                    $.each((ContainerTypes_Summary), function (i, item) {
                                        if (item.ContainerTypeCode != "0")
                                            ReportHTML += '<div class="col-xs-12 text-right"><b>' + item.Total + ' X ' + item.ContainerTypeCode + '</b></div>';
                                    });
                                }
                                if (pDefaults.UnEditableCompanyName == "MED" && $("#cbProfits").prop("checked"))//ahmed20222-12-29
                                {
                                    debugger;
                                    var costAmount = 0;
                                    var saleAmount = 0;
                                    $.each((pTblQuotationCharges), function (i, item) {
                                        debugger;
                                        costAmount += (item.CostAmount * item.CostExchangeRate);
                                        saleAmount += (item.SaleAmount * item.SaleExchangeRate);
                                    });
                                    var profit = parseFloat(saleAmount - costAmount).toFixed(4);
                                    var profitR = parseFloat(((saleAmount - costAmount) / costAmount) * 100).toFixed(2);
                                    ReportHTML += '<div class="col-xs-12 text-right"><b>Profit: ' + profit + ' ' + pDefaults.CurrencyCode + ' ' + '(' + profitR + ' %)</b></div>';
                                    ReportHTML += '<div class="col-xs-12 text-right"><b>Profit: ' + (profit / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(4) + ' USD</b></div>';
                                    ReportHTML += '<div class="col-xs-12 text-right"><b>Profit: ' + (profit / $("#hReadySlCurrencies :contains('EUR')").attr("MasterDataExchangeRate")).toFixed(4) + ' EUR</b></div>';
                                    ReportHTML += '<div class="col-xs-12 text-right"><b>Profit: ' + (profit / $("#hReadySlCurrencies :contains('GBP')").attr("MasterDataExchangeRate")).toFixed(4) + ' GBP</b></div>';
                                }
                                //#endregion
                                //#region Terms & Conditions 
                                ReportHTML = AddTermsAndConditions(pTermsAndConditions, ReportHTML, pTermsAndConditionsClearance, pTermsAndConditionsTransport, pUserName, pUserMobile1, pUserEmail, pQuotationHeader, pEmail_To, pReportTitle);

                                //#endregion


                            }//EOF other companies
                            if (pOption == "Print" || pOption == "PrintAdditionalContainer") {
                                var mywindow = window.open('', '_blank');
                                mywindow.document.write(ReportHTML);
                                mywindow.document.close();
                                FadePageCover(false);
                            }
                            else if (pOption == "Download" || pOption == "PrintAdditionalContainer") {
                                var mywindow = window.open('', '_blank');
                                mywindow.document.write(ReportHTML);
                                mywindow.print();
                                mywindow.document.close();
                                FadePageCover(false);
                            }
                            else if (pOption == "Email") {
                                debugger;
                                //SendPDFEmail_General(pEmail_Subject, pEmail_To, pReportHTML, pReportTitle, null);
                                SendPDFEmail_General("Quotation " + pQuotationHeader.Code, pEmail_To, ReportHTML, pReportTitle, null);
                            } //else if (pOption == "Email")
                        } //EOF else if ((pEmail_To == "0" || pEmail_To == "") && pOption == "Email")
                    } else {
                        swal("Sorry", "Please refresh and then try again.");
                        FadePageCover(false);
                    }
                }
                , null);
        }

}
function QuoQuotations(ReportName, pWhereClause, pOutputTo) {
    debugger;
    CallGETFunctionWithParameters("/api/Reports/GetLogoPaths", { pLogoSubPath1: "Content/Images/CompanyHeader.jpg", pLogoSubPath2: "Content/Images/CompanyFooter.jpg" }, function (paths) {
        var arr_Keys = new Array();
        var arr_Values = new Array();
        let query = `Rep_QOUQuotations' ${pWhereClause}'`;
        arr_Keys.push("Logo");
        arr_Keys.push("Logo1");

        arr_Values.push(paths.logoPath1);
        arr_Values.push(paths.logoPath2);



        var pParametersWithValues =
        {
            query: query
            , arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: "Quotations"
            , pReportName: ReportName
            , pReportType: pOutputTo
        };
        var win = window.open("", "_blank");
        var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
            + '&query=' + pParametersWithValues.query + ''
            + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
            + '&arr_Values=' + pParametersWithValues.arr_Values + ''
            + '&pReportName=' + pParametersWithValues.pReportName + ''
            + '&pReportType=' + pParametersWithValues.pReportType + '';

        win.location = url;
    })
}
function DrawShipmentDetails(pData, ReportHTML) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "FWD") {
        ReportHTML += '                     <div>';
        ReportHTML += '                     <p style="padding:5px;font-weight:bold;">Shipment Details:</p>';
        ReportHTML += '                 <table class=" table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
        ReportHTML += '                     <thead>';
        if ($("#lblTransport .fa-plane").length == 1 || $('#lblShipmentType').text() == "LCL") {
            ReportHTML += '                     <th>Package</th>';
            ReportHTML += '                     <th>Qty</th>';
            ReportHTML += '                     <th>Length</th>';
            ReportHTML += '                     <th>Width</th>';
            ReportHTML += '                     <th>Height</th>';
            ReportHTML += '                     <th>Vol</th>';
            ReportHTML += '                     <th>Volumetric Wt</th>';
            ReportHTML += '                     <th>GW</th>';
            ReportHTML += '                     <th>Chg.W</th>';
        } else {
            ReportHTML += '                     <th>Container</th>';
            ReportHTML += '                     <th>Qty</th>';
            ReportHTML += '                     <th>GW</th>';
            if (pDefaults.UnEditableCompanyName == "MED")
                ReportHTML += '                     <th>CBM</th>';
        }
        ReportHTML += '                     </thead>';
        ReportHTML += '                     <tbody>';
        $.each(pData, function (i, item) {
            if ($("#lblTransport .fa-plane").length == 1 || $('#lblShipmentType').text() == "LCL") {
                ReportHTML += '                 <tr>';
                ReportHTML += `                     <td>` + item.PackageTypeName + `</td>`;
                ReportHTML += `                     <td>` + item.Quantity + `</td>`;
                ReportHTML += `                     <td>` + item.Length + `</td>`;
                ReportHTML += `                     <td>` + item.Width + `</td>`;
                ReportHTML += `                     <td>` + item.Height + `</td>`;
                ReportHTML += `                     <td>` + item.Volume + `</td>`;
                ReportHTML += `                     <td>` + item.VolumetricWeight + `</td>`;
                ReportHTML += `                     <td>` + item.GrossWeight + `</td>`;
                ReportHTML += `                     <td>` + item.ChargeableWeight + `</td>`;

                ReportHTML += '                 </tr>';
            } else {
                ReportHTML += '                 <tr>';
                ReportHTML += `                     <td>` + item.ContainerTypeCode + `</td>`;
                ReportHTML += `                     <td>` + item.Quantity + `</td>`;
                ReportHTML += `                     <td>` + item.GrossWeight + `</td>`;
                if (pDefaults.UnEditableCompanyName == "MED")
                    ReportHTML += `                     <td>` + item.Volume + `</td>`;

                ReportHTML += '                 </tr>';
            }

        });
        ReportHTML += '                     </tbody>';
        ReportHTML += '                 </table>  ';
        ReportHTML += '                     </div>';
    }
    else if (pDefaults.UnEditableCompanyName == "UNF") {
        ReportHTML += '                     <div>';
        ReportHTML += '                     <p style="padding:5px;font-weight:bold;">Shipment Details:</p>';
        ReportHTML += '                 <table class=" table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
        ReportHTML += '                     <thead>';
        if ($("#lblTransport .fa-plane").length == 1 || $('#lblShipmentType').text() == "LCL") {
            ReportHTML += '                     <th>Package</th>';
            ReportHTML += '                     <th>Qty</th>';
            ReportHTML += '                     <th>Length</th>';
            ReportHTML += '                     <th>Width</th>';
            ReportHTML += '                     <th>Height</th>';
            ReportHTML += '                     <th>Vol</th>';
            //ReportHTML += '                     <th>Volumetric Wt</th>';
            ReportHTML += '                     <th>GW</th>';
            //ReportHTML += '                     <th>Chg.W</th>';
        } else {
            ReportHTML += '                     <th>Container</th>';
            ReportHTML += '                     <th>Qty</th>';
            ReportHTML += '                     <th>GW</th>';
            if (pDefaults.UnEditableCompanyName == "MED")
                ReportHTML += '                     <th>CBM</th>';
        }
        ReportHTML += '                     </thead>';
        ReportHTML += '                     <tbody>';
        $.each(pData, function (i, item) {
            if ($("#lblTransport .fa-plane").length == 1 || $('#lblShipmentType').text() == "LCL") {
                ReportHTML += '                 <tr>';
                ReportHTML += `                     <td>` + item.PackageTypeName + `</td>`;
                ReportHTML += `                     <td>` + item.Quantity + `</td>`;
                ReportHTML += `                     <td>` + item.Length + `</td>`;
                ReportHTML += `                     <td>` + item.Width + `</td>`;
                ReportHTML += `                     <td>` + item.Height + `</td>`;
                ReportHTML += `                     <td>` + item.Volume + `</td>`;
                //ReportHTML += `                     <td>` + item.VolumetricWeight + `</td>`;
                ReportHTML += `                     <td>` + item.GrossWeight + `</td>`;
                //ReportHTML += `                     <td>` + item.ChargeableWeight + `</td>`;

                ReportHTML += '                 </tr>';
            } else {
                ReportHTML += '                 <tr>';
                ReportHTML += `                     <td>` + item.ContainerTypeCode + `</td>`;
                ReportHTML += `                     <td>` + item.Quantity + `</td>`;
                ReportHTML += `                     <td>` + item.GrossWeight + `</td>`;
                if (pDefaults.UnEditableCompanyName == "MED")
                    ReportHTML += `                     <td>` + item.Volume + `</td>`;

                ReportHTML += '                 </tr>';
            }

        });
        ReportHTML += '                     </tbody>';
        ReportHTML += '                 </table>  ';
        ReportHTML += '                     </div>';
    }
    else {
        ReportHTML += '                     <div>';
        ReportHTML += '                     <p style="padding:5px;font-weight:bold;">Shipment Details:</p>';
        if (pDefaults.UnEditableCompanyName == "OPL")
            ReportHTML += '                 <table class=" table table-striped b-t b-light text-sm table-bordered m-t-n" style="border-color: #12529a;border-width: 2px;border-style: solid;border-radius: 15px;">'; //the style is to fix disappearance of borders when printing with firefox

        else
            ReportHTML += '                 <table class=" table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox

        ReportHTML += '                     <thead>';
        ReportHTML += '                     <th>Container</th>';
        ReportHTML += '                     <th>Qty</th>';
        ReportHTML += '                     <th>GW</th>';
        if (pDefaults.UnEditableCompanyName == "MED")
            ReportHTML += '                     <th>CBM</th>';
        ReportHTML += '                     </thead>';
        ReportHTML += '                     <tbody>';
        $.each(pData, function (i, item) {
            ReportHTML += '                 <tr>';
            ReportHTML += `                     <td>` + item.PackageTypeName + `</td>`;
            ReportHTML += `                     <td>` + item.Quantity + `</td>`;
            ReportHTML += `                     <td>` + item.GrossWeight + `</td>`;
            if (pDefaults.UnEditableCompanyName == "MED")
                ReportHTML += `                     <td>` + item.Volume + `</td>`;

            ReportHTML += '                 </tr>';
        });
        ReportHTML += '                     </tbody>';
        ReportHTML += '                 </table>  ';
        ReportHTML += '                     </div>';
    }
    return ReportHTML;
}

function DrawExtraContainers(pTblQuotationCharges, pQuotationRouteID, ReportHTML, ReportHTMLHeader) {
    debugger;
    var CurrencyList = pTblQuotationCharges.map((item) => {
        if (item.QuotationRouteID == pQuotationRouteID)
            return item.SaleCurrencyCode;
    }).filter((value, index, self) => self.indexOf(value) === index && value !== undefined);
    if (pDefaults.UnEditableCompanyName == "OPL")
        ReportHTML += '                 <table id="tblCharges" class=" table table-striped b-t b-light text-sm table-bordered m-t-n" style="border-color: #12529a;border-width: 2px;border-style: solid;border-radius: 15px;">'; //the style is to fix disappearance of borders when printing with firefox

    else
        ReportHTML += '                 <table id="tblCharges" class=" table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
    ReportHTML += '                     <thead>';
    ReportHTML += '                     <th> Item </th>';
    if (pDefaults.UnEditableCompanyName == "BED") {
        ReportHTML += '                     <th>First Container</th>';
        ReportHTML += '                     <th>Extra Container</th>';
    } else {
        ReportHTML += '                     <th> 01X40</th>';
        ReportHTML += '                     <th> 02X40</th>';
        ReportHTML += '                     <th> 03X40</th>';
        ReportHTML += '                     <th> 04X40</th>';
        ReportHTML += '                     <th> 05X40</th>';
    }

    ReportHTML += '                     </thead>';
    var TotalInEGPPerOne = [];
    var TotalInEGPPerTwo = [];
    var TotalInEGPPerThree = [];
    var TotalInEGPPerFour = []
    var TotalInEGPPerFive = []
    CurrencyList.forEach((Currency, i) => {
        var PricePerOneArr = [];
        var PricePerTwoArr = [];
        var PricePerThreeArr = [];
        var PricePerFourArr = [];
        var PricePerFiveArr = [];
        $.each((pTblQuotationCharges), function (i, item) {
            if (item.QuotationRouteID == pQuotationRouteID) {


                debugger;
                if (item.SaleCurrencyCode == Currency) {
                    var PricePerOne;
                    var PricePerTwo;
                    var PricePerThree;
                    var PricePerFour;
                    var PricePerFive;
                    if ((item.MeasurementID == 4 && item.ChargeTypeGroupName.toUpperCase() == "CLEARANCE")) {
                        PricePerOne = item.SaleAmount + 0 * item.AdditionalAmount
                    } else if (item.MeasurementID == 4) {
                        PricePerOne = item.SaleAmount * 1
                    } else if (item.MeasurementID == 3) {
                        PricePerOne = item.SaleAmount
                    } else {
                        PricePerOne = item.SaleAmount
                    }


                    if ((item.MeasurementID == 4 && item.ChargeTypeGroupName.toUpperCase() == "CLEARANCE")) {
                        PricePerTwo = item.SaleAmount + 1 * item.AdditionalAmount
                    } else if (item.MeasurementID == 4) {
                        PricePerTwo = item.SaleAmount * 2
                    } else if (item.MeasurementID == 3) {
                        PricePerTwo = item.SaleAmount
                    } else {
                        PricePerTwo = item.SaleAmount
                    }

                    if ((item.MeasurementID == 4 && item.ChargeTypeGroupName.toUpperCase() == "CLEARANCE")) {
                        PricePerThree = item.SaleAmount + 2 * item.AdditionalAmount
                    } else if (item.MeasurementID == 4) {
                        PricePerThree = item.SaleAmount * 3
                    } else if (item.MeasurementID == 3) {
                        PricePerThree = item.SaleAmount
                    } else {
                        PricePerThree = item.SaleAmount
                    }

                    if ((item.MeasurementID == 4 && item.ChargeTypeGroupName.toUpperCase() == "CLEARANCE")) {
                        PricePerFour = item.SaleAmount + 3 * item.AdditionalAmount
                    } else if (item.MeasurementID == 4) {
                        PricePerFour = item.SaleAmount * 4
                    } else if (item.MeasurementID == 3) {
                        PricePerFour = item.SaleAmount
                    } else {
                        PricePerFour = item.SaleAmount
                    }

                    if ((item.MeasurementID == 4 && item.ChargeTypeGroupName.toUpperCase() == "CLEARANCE")) {
                        PricePerFive = item.SaleAmount + 4 * item.AdditionalAmount
                    } else if (item.MeasurementID == 4) {
                        PricePerFive = item.SaleAmount * 5
                    } else if (item.MeasurementID == 3) {
                        PricePerFive = item.SaleAmount
                    } else {
                        PricePerFive = item.SaleAmount
                    }


                    PricePerOneArr.push({ Price: PricePerOne, Code: item.SaleCurrencyCode, SaleExchangeRate: item.SaleExchangeRate });
                    PricePerTwoArr.push({ Price: PricePerTwo, Code: item.SaleCurrencyCode, SaleExchangeRate: item.SaleExchangeRate });
                    PricePerThreeArr.push({ Price: PricePerThree, Code: item.SaleCurrencyCode, SaleExchangeRate: item.SaleExchangeRate });
                    PricePerFourArr.push({ Price: PricePerFour, Code: item.SaleCurrencyCode, SaleExchangeRate: item.SaleExchangeRate });
                    PricePerFiveArr.push({ Price: PricePerFive, Code: item.SaleCurrencyCode, SaleExchangeRate: item.SaleExchangeRate });

                    ReportHTML += '                 <tr>';
                    ReportHTML += '                     <td>' + item.ChargeTypeName + '</td>';
                    if (pDefaults.UnEditableCompanyName == "BED") {
                        ReportHTML += '                     <td>' + PricePerOne + '</td>';
                        ReportHTML += '                     <td>' + PricePerTwo + '</td>';
                    } else {
                        ReportHTML += '                     <td>' + PricePerOne + '</td>';
                        ReportHTML += '                     <td>' + PricePerTwo + '</td>';
                        ReportHTML += '                     <td>' + PricePerThree + '</td>';
                        ReportHTML += '                     <td>' + PricePerFour + '</td>';
                        ReportHTML += '                     <td>' + PricePerFive + '</td>';
                    }
                    ReportHTML += '                 </tr>';
                }
            }
        });
        ReportHTML += '                 <tr>';
        ReportHTML += `                     <td style="font-weight:bold" > Total ${Currency} </td>`;
        ReportHTML += '                     <td style="font-weight:bold" >' + CalculateSumOfArrayWithGroupBy(PricePerOneArr, "Price", "Code"); +'</td>';
        ReportHTML += '                     <td style="font-weight:bold" >' + CalculateSumOfArrayWithGroupBy(PricePerTwoArr, "Price", "Code"); +'</td>';
        if (pDefaults.UnEditableCompanyName != "BED") {
            ReportHTML += '                     <td style="font-weight:bold" >' + CalculateSumOfArrayWithGroupBy(PricePerThreeArr, "Price", "Code"); +'</td>';
            ReportHTML += '                     <td style="font-weight:bold" >' + CalculateSumOfArrayWithGroupBy(PricePerFourArr, "Price", "Code"); +'</td>';
            ReportHTML += '                     <td style="font-weight:bold" >' + CalculateSumOfArrayWithGroupBy(PricePerFiveArr, "Price", "Code"); +'</td>';
        }
        ReportHTML += '                 </tr>';

        TotalInEGPPerOne.push({ EGP: PricePerOneArr.reduce((accumulator, object) => { return accumulator + object.Price * object.SaleExchangeRate; }, 0) });
        TotalInEGPPerTwo.push({ EGP: PricePerTwoArr.reduce((accumulator, object) => { return accumulator + object.Price * object.SaleExchangeRate; }, 0) });
        TotalInEGPPerThree.push({ EGP: PricePerThreeArr.reduce((accumulator, object) => { return accumulator + object.Price * object.SaleExchangeRate; }, 0) });
        TotalInEGPPerFour.push({ EGP: PricePerFourArr.reduce((accumulator, object) => { return accumulator + object.Price * object.SaleExchangeRate; }, 0) });
        TotalInEGPPerFive.push({ EGP: PricePerFiveArr.reduce((accumulator, object) => { return accumulator + object.Price * object.SaleExchangeRate; }, 0) });

    }


    );
    debugger;
    if (pDefaults.UnEditableCompanyName == "SED") {
        ReportHTML += '                 </table>  ';
        ReportHTML += '         <div class="break"></div>';
        ReportHTML += ReportHTMLHeader;
        ReportHTML += '                 <table id="tblChargesTotals" class=" table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
        ReportHTML += '                     <thead>';
        ReportHTML += '                     <th> Item </th>';
        ReportHTML += '                     <th> 01X40</th>';
        ReportHTML += '                     <th> 02X40</th>';
        ReportHTML += '                     <th> 03X40</th>';
        ReportHTML += '                     <th> 04X40</th>';
        ReportHTML += '                     <th> 05X40</th>';

        ReportHTML += '                     </thead>';
    } else {
        ReportHTML += '                 <tr>';
        ReportHTML += `                     <td style="font-weight:bold" >  </td>`;
        ReportHTML += '                     <td style="font-weight:bold" >  </td>';
        ReportHTML += '                     <td style="font-weight:bold" >  </td>';
        if (pDefaults.UnEditableCompanyName != "BED") {
            ReportHTML += '                     <td style="font-weight:bold" >  </td>';
            ReportHTML += '                     <td style="font-weight:bold" >  </td>';
            ReportHTML += '                     <td style="font-weight:bold" >  </td>';
        }
        ReportHTML += '                 </tr>';
    }


    var masterExchagneRate = $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (pDefaults.UnEditableCompanyName != "BED") {
        ReportHTML += '                 <tr>';
        ReportHTML += `                     <td style="font-weight:bold" > Total USD </td>`;
        ReportHTML += '                     <td style="font-weight:bold" >' + Number(TotalInEGPPerOne.reduce((accumulator, object) => { return accumulator + object.EGP; }, 0) / masterExchagneRate).toFixed(2); +'</td>';
        ReportHTML += '                     <td style="font-weight:bold" >' + Number(TotalInEGPPerTwo.reduce((accumulator, object) => { return accumulator + object.EGP; }, 0) / masterExchagneRate).toFixed(2); +'</td>';
        ReportHTML += '                     <td style="font-weight:bold" >' + Number(TotalInEGPPerThree.reduce((accumulator, object) => { return accumulator + object.EGP; }, 0) / masterExchagneRate).toFixed(2); +'</td>';
        ReportHTML += '                     <td style="font-weight:bold" >' + Number(TotalInEGPPerFour.reduce((accumulator, object) => { return accumulator + object.EGP; }, 0) / masterExchagneRate).toFixed(2); +'</td>';
        ReportHTML += '                     <td style="font-weight:bold" >' + Number(TotalInEGPPerFive.reduce((accumulator, object) => { return accumulator + object.EGP; }, 0) / masterExchagneRate).toFixed(2); +'</td>';

        ReportHTML += '                 </tr>';
        ReportHTML += '                 <tr>';
        ReportHTML += `                     <td style="font-weight:bold" > No. of Containers </td>`;
        ReportHTML += '                     <td style="font-weight:bold" > 1 </td>';
        ReportHTML += '                     <td style="font-weight:bold" > 2 </td>';
        ReportHTML += '                     <td style="font-weight:bold" > 3 </td>';
        ReportHTML += '                     <td style="font-weight:bold" > 4 </td>';
        ReportHTML += '                     <td style="font-weight:bold" > 5 </td>';

        ReportHTML += '                 </tr>';
        ReportHTML += '                 <tr>';
        ReportHTML += `                     <td style="font-weight:bold" > Amount </td>`;
        ReportHTML += '                     <td style="font-weight:bold" >' + Number((TotalInEGPPerOne.reduce((accumulator, object) => { return accumulator + object.EGP; }, 0) / 1) / masterExchagneRate).toFixed(2); '</td>';
        ReportHTML += '                     <td style="font-weight:bold" >' + Number((TotalInEGPPerTwo.reduce((accumulator, object) => { return accumulator + object.EGP; }, 0) / 2) / masterExchagneRate).toFixed(2); +'</td>';
        ReportHTML += '                     <td style="font-weight:bold" >' + Number((TotalInEGPPerThree.reduce((accumulator, object) => { return accumulator + object.EGP; }, 0) / 3) / masterExchagneRate).toFixed(2); +'</td>';
        ReportHTML += '                     <td style="font-weight:bold" >' + Number((TotalInEGPPerFour.reduce((accumulator, object) => { return accumulator + object.EGP; }, 0) / 4) / masterExchagneRate).toFixed(2); +'</td>';
        ReportHTML += '                     <td style="font-weight:bold" >' + Number((TotalInEGPPerFive.reduce((accumulator, object) => { return accumulator + object.EGP; }, 0) / 5) / masterExchagneRate).toFixed(2); +'</td>';

        ReportHTML += '                 </tr>';
    }

    ReportHTML += '                 </table>  ';


    return ReportHTML;
}

function DrawQuotationExpenses(ReportHTML, pTblQuotationCharges, item, pQuotationRouteID, pQuotationHeader, pOption, _SelectedQuotationChargesIDs, i, pTermsAndConditionsTransport, pTermsAndConditionsClearance, pTermsAndConditions) {
    debugger;
    let CurrencyList;
    let IsGroupByCurrency;
    let ChargeGroupList;
    let ShowChargeGroupLable;
    let IsGroupHasRow = false;
    if (!$("#cbAllIn").prop("checked")) {
        ReportHTML += '                 <div class=" m-t-n"><b>Quotation Expenses :</b></div><br>';
        if ($("#cbGroupByCurrency").prop("checked")) {
            CurrencyList = Array.from(new Set(pTblQuotationCharges.map(item => item.SaleCurrencyCode)));
            IsGroupByCurrency = true;

        } else {
            IsGroupByCurrency = false;
            CurrencyList = [];
        }

        if ($("#cbGroupByChargeTypeGroup").prop("checked")) {
            ChargeGroupList = Array.from(new Set(pTblQuotationCharges.map(item => item.ChargeTypeGroupName)));
            IsGroupByChargeType = true;
        } else {
            ChargeGroupList = [];
            IsGroupByChargeType = false;
        }

        let k = 0;
        do {
            ShowChargeGroupLable = false;
            // let IsGroupHasRow = false;
            $.each((pTblQuotationCharges), function (i, item) {
                if ((item.QuotationRouteID == pQuotationRouteID) && (item.ChargeTypeGroupName == ChargeGroupList[k] || ChargeGroupList.length == 0)) {
                    ShowChargeGroupLable = true;
                }
            });
            let j = 0;

            ReportHTML += '<div class=" ' + (ShowChargeGroupLable && IsGroupByChargeType ? " " : " hide") + ' m-t-n"><b>Charge Group  :' + (ShowChargeGroupLable ? ChargeGroupList[k] : "") + '</b>'

            if ((item.POLID_TransportName !== "" || item.POLID_TransportName !== null) && ChargeGroupList[k] == "TRUCKING") { ReportHTML += `    (<b>POL Transport</b> : ${item.POLID_TransportName})` };
            if ((item.ClientPlantName !== "" || item.ClientPlantName !== null) && ChargeGroupList[k] == "TRUCKING") { ReportHTML += `    (<b>Client Plant</b> : ${item.ClientPlantName})` };
            if ((item.PickupPlaceName !== "" || item.PickupPlaceName !== null) && ChargeGroupList[k] == "TRUCKING") { ReportHTML += `    (<b>Pickup Place </b> : ${item.PickupPlaceName})` };
            if ((item.ClearancePortName !== "" || item.ClearancePortName !== null) && ChargeGroupList[k] == "CLEARANCE") { ReportHTML += `    (<b>Clearance Port</b> : ${item.ClearancePortName})` };
            ReportHTML += '</div><br>';

            do {
                IsGroupHasRow = false;
                $.each((pTblQuotationCharges), function (i, item) {
                    if ((item.QuotationRouteID == pQuotationRouteID) && (item.SaleCurrencyCode == CurrencyList[j] || CurrencyList.length == 0) && (item.ChargeTypeGroupName == ChargeGroupList[k] || ChargeGroupList.length == 0)) {
                        IsGroupHasRow = true;
                    }
                });
                //#region Create Table Head
                ReportHTML += '<div class="' + ($("#cbAllIn").prop("checked") ? "hide" : " ") + '">';
                if (pDefaults.UnEditableCompanyName == 'OPL')
                    ReportHTML += '                 <table id="tblCharges" class="' + (IsGroupHasRow ? "" : "hide") + ' table table-striped b-t b-light text-sm table-bordered m-t-n" style="border-color: #12529a;border-width: 2px;border-style: solid;margin: 0;border-radius: 15px;"">'; //the style is to fix disappearance of borders when printing with firefox
                else
                    ReportHTML += '                 <table id="tblCharges" class="' + (IsGroupHasRow ? "" : "hide") + ' table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                ReportHTML += '                     <thead>';
                ReportHTML += '                         <th>Item</th>';
                if (pDefaults.UnEditableCompanyName != "SHO")
                    ReportHTML += '                         <th>' + (pDefaults.UnEditableCompanyName == "KDM" ? 'Equip/Pkg' : 'Container/Package') + '</th>';
                if (pDefaults.UnEditableCompanyName == "SHO")
                    ReportHTML += '                         <th>' + 'Unit Price' + '</th>';
                if ((pDefaults.UnEditableCompanyName != 'LAT' && pDefaults.UnEditableCompanyName != "KDM"
                    && pDefaults.UnEditableCompanyName != "ACS"
                    && ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')))
                    && $("#cbPrintDemurrage").prop("checked"))
                    ReportHTML += '                     <th>Dem/day</th>';
                if (pDefaults.UnEditableCompanyName == "BED" || pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG") {
                    ReportHTML += '                     <th>Qty</th>';
                    ReportHTML += '                     <th>U.Price</th>';
                }
                if ((pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV")
                    && (pQuotationHeader.TransportType == AirTransportType || pQuotationHeader.ShipmentType == constLCLShipmentType)) {
                    ReportHTML += '                         <th>Chg.Wt</th>';
                    if ($("#cbPrintPerKgRate").prop("checked"))
                        ReportHTML += '                         <th>Per Kg Rate</th>';
                }
                if (pDefaults.UnEditableCompanyName == "SHO")
                    ReportHTML += '                         <th>' + 'Per Unit' + '</th>';
                else if ($("#cbPrintCostAndSale").prop("checked")) {
                    if (['MED'].includes(pDefaults.UnEditableCompanyName)) {
                        ReportHTML += '                         <th>Cost Price</th>';
                        ReportHTML += '                         <th>Cost Quantity</th>';
                    }
                    ReportHTML += '                     <th>' + 'Cost' + '</th>';

                    if (['MED'].includes(pDefaults.UnEditableCompanyName)) {
                        ReportHTML += '                         <th>Sale Price</th>';
                        ReportHTML += '                         <th>Sale Quantity</th>';
                    }
                    ReportHTML += '                     <th>' + 'Sale' + '</th>';
                }
                else {
                    if (['MED'].includes(pDefaults.UnEditableCompanyName)) {
                        ReportHTML += '                         <th>Unit Price</th>';
                        ReportHTML += '                         <th>Quantity</th>';
                    }
                    else {
                        ReportHTML += '                         <th class="' + ($("#cbPrintPerKgRate").prop("checked") && (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV") && (pQuotationHeader.TransportType == AirTransportType || pQuotationHeader.ShipmentType == constLCLShipmentType) ? "hide" : "") + '">Unit Price</th>';
                        ReportHTML += '                         <th class="' + ($("#cbPrintPerKgRate").prop("checked") && (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV") && (pQuotationHeader.TransportType == AirTransportType || pQuotationHeader.ShipmentType == constLCLShipmentType) ? "hide" : "") + '">Quantity</th>';
                    }
                    if (pDefaults.UnEditableCompanyName == 'AGR')
                        ReportHTML += '                         <th>Sale Price</th>';
                    ReportHTML += '                         <th class="' + ($("#cbPrintPerKgRate").prop("checked") && (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV") && (pQuotationHeader.TransportType == AirTransportType || pQuotationHeader.ShipmentType == constLCLShipmentType) ? "hide" : "") + '">Amount</th>';
                }

                if (pDefaults.UnEditableCompanyName != "MED")
                    ReportHTML += '                         <th>Cur</th>';

                if ($("#cbPrintCost").prop("checked"))
                    ReportHTML += '                     <th>Supplier</th>';

                if ($("#cbPrintPOrCForCharges").prop("checked"))
                    ReportHTML += '                     <th>P/C</th>';

                if (pOption == "PrintAdditionalContainer")
                    ReportHTML += '                     <th>Add.Cont?</th>';

                ReportHTML += '                     </thead>';

                //#endregion 
                var _AdditionalContainerEGP = 0.00;
                var _AdditionalContainerUSD = 0.00;
                var _AdditionalContainerEUR = 0.00;


                //#region Create Table Body
                //check groupby options 
                $.each((pTblQuotationCharges), function (i, item) {
                    if ((item.SaleCurrencyCode == CurrencyList[j] || CurrencyList.length == 0) && (item.ChargeTypeGroupName == ChargeGroupList[k] || ChargeGroupList.length == 0)) {
                        if (item.QuotationRouteID == pQuotationRouteID && (item.SalePrice > 0 || $("#cbPrintCost").prop("checked") || $("#cbPrintPOrCForCharges").prop("checked") || $("#cbPrintCostAndSale").prop("checked"))) {
                            ReportHTML += '                 <tr>';
                            ReportHTML += '                     <td>' + item.ChargeTypeName
                                + (
                                    $("#cbPrintNotes").prop('checked') || pDefaults.UnEditableCompanyName == "GLD" || pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV"
                                        ? (item.Notes == 0 ? "" : (" (" + item.Notes + ")"))
                                        : ""
                                )
                                + '</td>';
                            if (pDefaults.UnEditableCompanyName != "SHO")
                                ReportHTML += '                     <td>' + (item.ContainerTypeID == 0 ? (item.PackageTypeID == 0 ? "" : item.PackageTypeName) : item.ContainerTypeCode) + '</td>';
                            if (pDefaults.UnEditableCompanyName == "SHO")
                                ReportHTML += '                     <td>' + ($("#cbPrintCost").prop("checked") ? item.CostPrice : item.SalePrice) + '</td>';
                            if ((pDefaults.UnEditableCompanyName != 'LAT' && pDefaults.UnEditableCompanyName != 'KDM'
                                && pDefaults.UnEditableCompanyName != "ACS"
                                && ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')))
                                && $("#cbPrintDemurrage").prop("checked"))
                                ReportHTML += '                 <td>' + (item.DemurrageDays == 0 ? "" : item.DemurrageDays) + '</td>';
                            if (pDefaults.UnEditableCompanyName == "BED" || pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG") { //the quantity is just saved in CostQuantity
                                ReportHTML += '                     <td class="classCost">' + /*($("#cbPrintCost").prop("checked") ? item.CostQuantity : item.SaleQuantity)*/ item.CostQuantity + '</td>';
                                ReportHTML += '                     <td class="classCost_PerUnit">' + ($("#cbPrintCost").prop("checked") ? item.CostPrice : item.SalePrice) + '</td>';
                            }
                            if ((pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV")
                                && (pQuotationHeader.TransportType == AirTransportType || pQuotationHeader.ShipmentType == constLCLShipmentType)) {
                                ReportHTML += '                     <td>' + /*($("#cbPrintCost").prop("checked") ? item.CostQuantity : item.SaleQuantity)*/ item.CostQuantity + '</td>';
                                if ($("#cbPrintPerKgRate").prop("checked"))
                                    ReportHTML += '                     <td>' + ($("#cbPrintCost").prop("checked") ? item.CostPrice : item.SalePrice) + '</td>';
                            }
                            if (pDefaults.UnEditableCompanyName == "SHO")
                                ReportHTML += '                     <td>' + (item.ChargeTypeNotes == 0 ? "" : item.ChargeTypeNotes) + '</td>';
                            else if ($("#cbPrintCostAndSale").prop("checked")) {
                                if (['MED'].includes(pDefaults.UnEditableCompanyName)) {
                                    ReportHTML += '                         <td>' + item.CostPrice + '</td>';
                                    ReportHTML += '                         <td>' + item.CostQuantity + '</td>';
                                }
                                ReportHTML += '                     <td>' + item.CostAmount + (pDefaults.UnEditableCompanyName == "MED" ? ' ' + item.CostCurrencyCode : "") + '</td>';

                                if (['MED'].includes(pDefaults.UnEditableCompanyName)) {
                                    ReportHTML += '                         <td>' + item.SalePrice + '</td>';
                                    ReportHTML += '                         <td>' + item.SaleQuantity + '</td>';
                                }

                                ReportHTML += '                     <td>' + item.SaleAmount + (pDefaults.UnEditableCompanyName == "MED" ? ' ' + item.SaleCurrencyCode : "") + '</td>';
                            }
                            else {
                                if (['MED'].includes(pDefaults.UnEditableCompanyName)) {
                                    ReportHTML += '                     <td>' + ($("#cbPrintCost").prop("checked") ? item.CostPrice : item.SalePrice) + '</td>';
                                    ReportHTML += '                     <td>' + ($("#cbPrintCost").prop("checked") ? item.CostQuantity : item.SaleQuantity) + '</td>';
                                }

                                else {
                                    ReportHTML += '                     <td class="' + ($("#cbPrintPerKgRate").prop("checked") && (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV") && (pQuotationHeader.TransportType == AirTransportType || pQuotationHeader.ShipmentType == constLCLShipmentType) ? "hide" : "") + '">' + ($("#cbPrintCost").prop("checked") ? item.CostPrice : item.SalePrice) + '</td>';
                                    ReportHTML += '                     <td class="' + ($("#cbPrintPerKgRate").prop("checked") && (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV") && (pQuotationHeader.TransportType == AirTransportType || pQuotationHeader.ShipmentType == constLCLShipmentType) ? "hide" : "") + '">' + /*($("#cbPrintCost").prop("checked") ? item.CostQuantity : item.SaleQuantity)*/ item.CostQuantity + '</td>';
                                }
                                if (pDefaults.UnEditableCompanyName == 'AGR')
                                    ReportHTML += '                         <td>' + item.SalePrice + '</td>';
                                ReportHTML += '                     <td class="' + ($("#cbPrintPerKgRate").prop("checked") && (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV") && (pQuotationHeader.TransportType == AirTransportType || pQuotationHeader.ShipmentType == constLCLShipmentType) ? "hide" : "") + '">' + ($("#cbPrintCost").prop("checked") ? item.CostAmount : item.SaleAmount) + '</td>';

                            }
                            //ReportHTML += '                     <td class="' + ($("#cbPrintPerKgRate").prop("checked") && (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV") && (pQuotationHeader.TransportType == AirTransportType || pQuotationHeader.ShipmentType == constLCLShipmentType) ? "hide" : "") + '">' + item.SaleAmount + (pDefaults.UnEditableCompanyName == "SAF" && item.ChargeTypeCode == "TR" ? (" (+14% VAT)") : "") + '</td>';
                            if (pDefaults.UnEditableCompanyName != "MED")
                                ReportHTML += '                     <td>' + item.SaleCurrencyCode + '</td>';

                            if ($("#cbPrintCost").prop("checked"))
                                ReportHTML += '                     <td>' + (item.PartnerSupplierName == 0 ? "" : item.PartnerSupplierName) + '</td>';

                            if (pOption == "PrintAdditionalContainer") {
                                //ReportHTML += '                     <td>' + (_SelectedQuotationChargesIDs.indexOf(',' + item.ID + ',') < 0 ? item.CostAmount.toFixed(2) : (item.CostAmount * 2).toFixed(2)) + '</td>';
                                ReportHTML += '                     <td>' + (_SelectedQuotationChargesIDs.indexOf(',' + item.ID + ',') < 0 ? 0 : (item.CostPrice).toFixed(2)) + '</td>';
                                if (_SelectedQuotationChargesIDs.indexOf(',' + item.ID + ',') >= 0) {
                                    if (item.SaleCurrencyCode == "EGP")
                                        _AdditionalContainerEGP += item.CostPrice;
                                    else if (item.SaleCurrencyCode == "USD")
                                        _AdditionalContainerUSD += item.CostPrice;
                                    else if (item.SaleCurrencyCode == "EUR")
                                        _AdditionalContainerEUR += item.CostPrice;
                                }
                            }

                            if ($("#cbPrintPOrCForCharges").prop("checked"))
                                ReportHTML += '                     <td>' + (item.POrCName == 0 ? "" : item.POrCName) + '</td>';

                            ReportHTML += '                 </tr>';
                        }
                    }
                });

                ReportHTML += '                 </table>';
                ReportHTML += '                 </div>';
                j++;
            } while (j < CurrencyList.length);
            if (true/*$("#cbPrintCost").prop("checked")*/) {
                debugger;
                var _CurrentQRCharges = pTblQuotationCharges.filter(x => x.QuotationRouteID == pQuotationRouteID && (ChargeGroupList[k] == x.ChargeTypeGroupName || ChargeGroupList.length == 0));
                if (pDefaults.UnEditableCompanyName == "BED") {
                    for (var i = 0; i < _CurrentQRCharges.length; i++) //i concatenate the cost currency with the supplier name to group by and get totals
                        _CurrentQRCharges[i].CostCurrencyCode += " " + (_CurrentQRCharges[i].PartnerSupplierName == 0 ? "" : _CurrentQRCharges[i].PartnerSupplierName);
                    var _TotalCostPerSupplier = CalculateSumOfArrayWithGroupBy(_CurrentQRCharges, "CostAmount", "CostCurrencyCode");
                    ReportHTML += '<div class="col-xs-12 text-right"><b>Suppliers Totals: ' + _TotalCostPerSupplier.replace(/ /g, "&nbsp;").replace(/,/g, "<br />") + '</b></div>';
                }
                if (pDefaults.UnEditableCompanyName != "BOM") {
                    if (pDefaults.UnEditableCompanyName == "TRM" && $("#cbPrintTotal").prop("checked")) {
                        if ($("#cbPrintCost").prop("checked")) {
                            var _TotalCost = CalculateSumOfArrayWithGroupBy(_CurrentQRCharges, "CostAmount", "SaleCurrencyCode");
                            ReportHTML += '<div class="col-xs-12 text-right"><b>Total : ' + _TotalCost /*.replace(/ /g, "&nbsp;").replace(/,/g, "<br />")*/ + '</b></div>';
                        } else {
                            var _TotalSale = CalculateSumOfArrayWithGroupBy(_CurrentQRCharges, "SaleAmount", "SaleCurrencyCode");
                            ReportHTML += '<div class="col-xs-12 text-right"><b>Total : ' + _TotalSale /*.replace(/ /g, "&nbsp;").replace(/,/g, "<br />")*/ + '</b></div>';

                        }
                    } else if (pDefaults.UnEditableCompanyName == "TRM" && !$("#cbPrintTotal").prop("checked")) {

                    } else {
                        if (pDefaults.UnEditableCompanyName != "AOL")
                            if ($("#cbPrintCost").prop("checked")) {
                                var _TotalCost = CalculateSumOfArrayWithGroupBy(_CurrentQRCharges, "CostAmount", "SaleCurrencyCode");
                                ReportHTML += '<div class="col-xs-12 text-right"><b>Total : ' + _TotalCost /*.replace(/ /g, "&nbsp;").replace(/,/g, "<br />")*/ + '</b></div>';
                            } else if (pDefaults.UnEditableCompanyName != "SHS") {
                                var _TotalSale = CalculateSumOfArrayWithGroupBy(_CurrentQRCharges, "SaleAmount", "SaleCurrencyCode");
                                ReportHTML += '<div class="col-xs-12 text-right"><b>Total : ' + _TotalSale /*.replace(/ /g, "&nbsp;").replace(/,/g, "<br />")*/ + '</b></div>';

                            }
                    }
                }
            } else if (pDefaults.UnEditableCompanyName == "KDM" || pDefaults.UnEditableCompanyName == "SUN" || pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG") {
                var _CurrentQRCharges = pTblQuotationCharges.filter(x => x.QuotationRouteID == pQuotationRouteID);
                var _TotalCurrencies = QuotationsEdit_CalculateTotalCurrenciesSummaryFromArray(_CurrentQRCharges);
                ReportHTML += '<div class="col-xs-12 m-t-n text-right"><b>Total : ' + _TotalCurrencies /*.replace(/ /g, "&nbsp;").replace(/,/g, "<br />")*/ + '</b></div>';
            }
            if (ShowChargeGroupLable) {


                var _CurrentQRCharges = pTblQuotationCharges.filter(x => x.QuotationRouteID == pQuotationRouteID && (ChargeGroupList[k] == x.ChargeTypeGroupName || ChargeGroupList.length == 0));
                var totalInUSD = _CurrentQRCharges.map((item, i, arr) => { return item.SaleAmount * item.SaleExchangeRate }).reduce((pre, cur) => { return pre = pre + cur }, 0.00) / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate");
                //if (pDefaults.UnEditableCompanyName != "ELI" && pDefaults.UnEditableCompanyName != "SUN" && pDefaults.UnEditableCompanyName != "DRA" && pDefaults.UnEditableCompanyName != "TMP" && pDefaults.UnEditableCompanyName != "BOM")
                //    ReportHTML += '<div class="col-xs-12 text-right"><b>Total In USD : ' + Number(totalInUSD).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></div>';

                //#region Add various terms and condtions 
                if (pTermsAndConditions != "0" && ChargeGroupList[k] == "FREIGHT") {
                    if (!$("#cbRightToLeft").prop("checked"))
                        ReportHTML += '                 <b><u>Terms & Conditions:</u></b>';
                    ReportHTML += '                 <div class="col-xs-12 ' + ($("#cbRightToLeft").prop("checked") ? "text-right" : "") + '">' + pTermsAndConditions.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' </div><br>';
                }
                if (pTermsAndConditionsClearance != "0" && ChargeGroupList[k] == "CLEARANCE") {
                    if (!$("#cbRightToLeft").prop("checked"))
                        ReportHTML += '                 <b><u>Clearnace Terms & Conditions:</u></b>';
                    ReportHTML += '                 <div class="col-xs-12 ' + ($("#cbRightToLeft").prop("checked") ? "text-right" : "") + '">' + pTermsAndConditionsClearance.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' </div><br>';
                }
                if (pTermsAndConditionsTransport != "0" && ChargeGroupList[k] == "TRUCKING") {
                    if (!$("#cbRightToLeft").prop("checked"))
                        ReportHTML += '                 <b><u>Transport Terms & Conditions:</u></b>';
                    ReportHTML += '                 <div class="col-xs-12 ' + ($("#cbRightToLeft").prop("checked") ? "text-right" : "") + '">' + pTermsAndConditionsTransport.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' </div><br>';
                }
                //#endregion

            }
            k++;
        } while (k < ChargeGroupList.length);

        var _CurrentQRCharges = pTblQuotationCharges.filter(x => x.QuotationRouteID == pQuotationRouteID);
        var totalInUSD = _CurrentQRCharges.map((item, i, arr) => { return item.SaleAmount * item.SaleExchangeRate }).reduce((pre, cur) => { return pre = pre + cur }, 0.00) / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate");

        //if (pDefaults.UnEditableCompanyName != "ELI" && pDefaults.UnEditableCompanyName != "SUN" && pDefaults.UnEditableCompanyName != "DRA" && pDefaults.UnEditableCompanyName != "TMP" && pDefaults.UnEditableCompanyName != "BOM")
        //    ReportHTML += '<div class="col-xs-12 text-right"><b>Total In USD : ' + Number(totalInUSD).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></div>';


        if (pOption == "PrintAdditionalContainer") {
            ReportHTML += '<div class="col-xs-12 m-t-n text-right"><b>Additinal Cnt.: ' + _AdditionalContainerEGP + ' EGP, ' + _AdditionalContainerUSD + ' USD, ' + _AdditionalContainerEUR + ' EUR' + '</b></div>';
        }



    }
    else {
        ChargeGroupList = Array.from(new Set(pTblQuotationCharges.map(item => item.ChargeTypeGroupName)));

        ReportHTML += '                 <table id="tblAllIn" class="table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox


        ChargeGroupList.forEach((item, i) => {
            var _CurrentQRCharges = pTblQuotationCharges.filter(x => x.QuotationRouteID == pQuotationRouteID && (item == x.ChargeTypeGroupName || ChargeGroupList.length == 0));
            var _TotalCost = CalculateSumOfArrayWithGroupBy(_CurrentQRCharges, "SaleAmount", "SaleCurrencyCode");
            ReportHTML += '                 <tr>';
            ReportHTML += '                     <td> ' + item + ' </td>';
            ReportHTML += '                     <td>' + _TotalCost + '</td>';
            ReportHTML += '                 </tr>';
        })


        ReportHTML += '                 </table>';

    }

    return { i, ReportHTML, i };
}

function DrawOfferTable(ReportHTML, i, item, pQuotationHeader) {
    ReportHTML += '                 <div><b>(' + (i + 1) + ') ' + (item.MoveTypeID == 0 ? "" : item.MoveTypeName) + '</b>'
    ReportHTML += `</div><br>`;
    if (pDefaults.UnEditableCompanyName == "OPL")
        ReportHTML += '                 <table id="tblOffer" class="table table-striped b-t b-light text-sm table-bordered m-t-n" style="border-color: #12529a;border-width: 2px;border-style: solid; border-radius: 15px;">'; //the style is to fix disappearance of borders when printing with firefox

    else
        ReportHTML += '                 <table id="tblOffer" class="table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
    ReportHTML += '                     <thead>';
    if (pDefaults.UnEditableCompanyName != "MAY" || (pDefaults.UnEditableCompanyName == "MAY" && $("#cbPrintQuotationCode").prop("checked")))
        ReportHTML += '                         <th>Code</th>';
    if (pDefaults.UnEditableCompanyName != 'LIO' && $("#cbShowLineOrTrucker").prop("checked"))
        ReportHTML += '                         <th>Line</th>';
    if (pDefaults.UnEditableCompanyName == 'SHO')
        ReportHTML += '                         <th>Incoterm</th>';
    if (pDefaults.UnEditableCompanyName != "OAO" && $("#cbPickupAddress").prop("checked"))
        ReportHTML += '                         <th>' + (pDefaults.UnEditableCompanyName == "GHA" ? "Brand" : "Pickup Address") + '</th>';
    if ($("#cbPOL").prop("checked"))
        ReportHTML += '                         <th>POL</th>';
    if ($("#cbPOD").prop("checked"))
        ReportHTML += '                         <th>POD</th>';
    if (pDefaults.UnEditableCompanyName == "UNF" && $("#cbPOLTransport").prop("checked"))
        ReportHTML += '                         <th>POLTransport</th>';
    if ($("#cbCommodity").prop("checked"))
        ReportHTML += '                         <th>Commodity</th>';
    if (pDefaults.UnEditableCompanyName != "OAO" && $("#cbDeliveryAddress").prop("checked"))
        ReportHTML += '                         <th>' + (pDefaults.UnEditableCompanyName == "GHA" ? "Model" : "Delivery Address") + '</th>';
    if ($("#cbTransitTime").prop("checked"))
        ReportHTML += '                         <th>T.T.</th>';
    if (pDefaults.UnEditableCompanyName == "GHA")
        ReportHTML += '                         <th>Chassis No</th>';

    if ($("#cbPOrC").prop("checked"))
        ReportHTML += '                         <th>P/C</th>';
    ReportHTML += '                         <th class="hide">Validity</th>';
    if ($("#cbFreeTimePOL").prop("checked")) //(pDefaults.UnEditableCompanyName != "ACS" && pDefaults.UnEditableCompanyName != "BED")
        ReportHTML += '                         <th>FreeTime POL</th>';
    if ($("#cbFreeTimePOD").prop("checked")) //(pDefaults.UnEditableCompanyName == "SAF" || pDefaults.UnEditableCompanyName == "ELI" || pDefaults.UnEditableCompanyName == "ACS" || pDefaults.UnEditableCompanyName == "AOL" || pDefaults.UnEditableCompanyName == "BED")
        ReportHTML += '                         <th>FreeTime POD</th>';
    if ($("#cbPrintExpiration").prop("checked"))
        ReportHTML += '                         <th>Expiration</th>';
    if ($("#cbNotesToOpera").prop("checked"))
        ReportHTML += '                         <th>Notes</th>';
    if ($("#cbIncoterm").prop("checked"))
        ReportHTML += '                         <th>Incoterm</th>';

    if (pDefaults.UnEditableCompanyName == "SUN")
        ReportHTML += '                         <th>' + (pQuotationHeader.TransportType == AirTransportType ? 'ChgWgt(KG)' : 'GW(KG)') + '</th>';
    if ($("#cbServiceType").prop("checked"))//ahmed2022-12-25
        ReportHTML += '                         <th>Service Type</th>';
    if ($("#cbSignature").prop("checked")) {
        ReportHTML += '                         <th>Created By</th>';
        if (item.IsChargesConfirmed != 0)
            ReportHTML += '                         <th>Charges Confirming Name</th>';
        if (item.IsRevised == 1 && IsNull(item.RevisorName, '0') != '0')
            ReportHTML += '                         <th>Approved By</th>';
        if (item.IsRevised == 0 && IsNull(item.RevisorName, '0') != '0')
            ReportHTML += '                         <th>Rejected By</th>';
        if (item.QuotationStageName != 'APPROVED' && pDefaults.UnEditableCompanyName != "UNF")
            ReportHTML += '                         <th>' + item.QuotationStageName + ' By</th>';
    }
    if (pDefaults.UnEditableCompanyName == "UNF" && $("#cbOperationNote").prop("checked"))
        ReportHTML += '                         <th>Notes</th>';

    ReportHTML += '                     </thead>';
    ReportHTML += '                     <tr>';
    if (pDefaults.UnEditableCompanyName != "MAY" || (pDefaults.UnEditableCompanyName == "MAY" && $("#cbPrintQuotationCode").prop("checked")))
        ReportHTML += '                         <td>' + item.Code + '</td>';
    if (pDefaults.UnEditableCompanyName != 'LIO' && $("#cbShowLineOrTrucker").prop("checked"))
        ReportHTML += '                         <td>' + (item.LineName == 0 ? pDefaults.UnEditableCompanyName : item.LineName) + '</td>';
    if (pDefaults.UnEditableCompanyName == 'SHO')
        ReportHTML += '                         <td>' + (item.IncotermName == 0 ? "" : item.IncotermName) + '</td>';
    if (pDefaults.UnEditableCompanyName != "OAO" && $("#cbPickupAddress").prop("checked"))
        ReportHTML += '                         <td>' + (item.PickupAddress == 0 ? "" : item.PickupAddress) + '</td>';
    if ($("#cbPOL").prop("checked"))
        ReportHTML += '                         <td>' + item.POLName + '</td>';
    if ($("#cbPOD").prop("checked"))
        ReportHTML += '                         <td>' + item.PODName + '</td>';
    if (pDefaults.UnEditableCompanyName == "UNF" && $("#cbPOLTransport").prop("checked"))
        ReportHTML += '                         <td>' + item.POLID_TransportName + " : " + item.POLID_TransportCode + '</td>';
    if ($("#cbCommodity").prop("checked"))
        ReportHTML += '                         <td>' + (item.CommodityName == 0 ? "" : item.CommodityName) + '</td>';
    if (pDefaults.UnEditableCompanyName != "OAO" && $("#cbDeliveryAddress").prop("checked"))
        ReportHTML += '                         <td>' + (item.DeliveryAddress == 0 ? "" : item.DeliveryAddress) + '</td>';
    if ($("#cbTransitTime").prop("checked"))
        ReportHTML += '                         <td>' + item.TransientTime + '</td>';
    if (pDefaults.UnEditableCompanyName == "GHA")
        ReportHTML += '                         <td>' + item.FreightRateFormat + '</td>';

    if ($("#cbPOrC").prop("checked"))
        ReportHTML += '                         <td>' + (item.POrCCode == 0 ? "" : item.POrCCode) + '</td>';
    ReportHTML += '                         <td class="hide">' + item.Validity + '</td>';
    if ($("#cbFreeTimePOL").prop("checked")) //(pDefaults.UnEditableCompanyName != "ACS" && pDefaults.UnEditableCompanyName != "BED")
        ReportHTML += '                         <td>' + (item.FreeTime == 0 ? "" : item.FreeTime) + '</td>';
    if ($("#cbFreeTimePOD").prop("checked")) //(pDefaults.UnEditableCompanyName == "SAF" || pDefaults.UnEditableCompanyName == "ELI" || pDefaults.UnEditableCompanyName == "ACS" || pDefaults.UnEditableCompanyName == "AOL" || pDefaults.UnEditableCompanyName == "BED")
        ReportHTML += '                         <td>' + (item.FreeTimePOD == 0 ? "" : item.FreeTimePOD) + '</td>'; 
    if ($("#cbPrintExpiration").prop("checked"))
        ReportHTML += '                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) + '</td>';
    if ($("#cbNotesToOpera").prop("checked"))
        ReportHTML += '                         <td>' +item.Notes + '</td>';
    if ($("#cbIncoterm").prop("checked"))
        ReportHTML += '                         <td>' + item.IncotermName + '</td>';

    if (pDefaults.UnEditableCompanyName == "SUN")
        ReportHTML += '                         <td>' + (pQuotationHeader.TransportType == AirTransportType ? item.ChargeableWeight : item.GrossWeight) + '</td>';
    if ($("#cbServiceType").prop("checked"))//ahmed2022-12-25
        ReportHTML += '                         <td>' + item.MoveTypeName + '</td>';
    if ($("#cbSignature").prop("checked")) {
        ReportHTML += '                         <td>' + item.CreatorName + '</td>';
        if (item.IsChargesConfirmed != 0)
            ReportHTML += '                         <td>' + item.ChargesConfirmingName + '</td>';
        if (IsNull(item.RevisorName, '0') != '0')
            ReportHTML += '                         <th>' + item.RevisorName + '</th>';
        if (item.QuotationStageName != 'APPROVED' && pDefaults.UnEditableCompanyName != "UNF")
            ReportHTML += '                         <td>' + item.ModificatorUserName + '</td>';
    }
    if (pDefaults.UnEditableCompanyName == "UNF" && $("#cbOperationNote").prop("checked")) {

        ReportHTML += '                         <td>' + item.Notes + '</td>';
    }
    ReportHTML += '                     </tr>';
    ReportHTML += '                 </table>';
    var pQuotationRouteID = item.ID;
    return { pQuotationRouteID, ReportHTML };
}

function AddTermsAndConditions(pTermsAndConditions, ReportHTML, pTermsAndConditionsClearance, pTermsAndConditionsTransport, pUserName, pUserMobile1, pUserEmail, pQuotationHeader, pEmail_To, pReportTitle) {
    debugger;
    if (pTermsAndConditions != "0") {
        if (!$("#cbRightToLeft").prop("checked"))
            ReportHTML += '                 <b><u>Terms & Conditions:</u></b>';
        ReportHTML += '                 <div class="col-xs-12 ' + ($("#cbRightToLeft").prop("checked") ? "text-right" : "") + '">' + pTermsAndConditions.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />") + ' </div><br>';
    }
    else if (pDefaults.UnEditableCompanyName == "SGA") { //Default Terms and Conditions for SGA
        ReportHTML += '                 <div class="col-xs-12"><b><u>FOB:</u></b></div>';
        ReportHTML += '                 <div class="col-xs-12"><b><u>General Terms & Conditions:</u></b></div>';
        ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding any official receipts.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - THC at both ends as per Carrier current tariff subject to change and final carrier invoice and currency fluctuation.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding VAT.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Rates are subject to modification upon any sovereign changes.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Above rate is net selling excluding bank charges.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - The above quotation is under EIFFA  trading  terms and condition.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - BAF, CAF and War risk surcharges are subject to change without any previous notice.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - A/M rate subject to any IMO surcharge additional if applicable.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Subject to equipment & space availability.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Vessels arrival date & transit time are estimated & subject to variation.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Rates should be confirmed prior booking.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Any additional services rising or demand during the shipment processing will be invoiced separately.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - The transfer cost attached to payment involved with shipment processing is for your account as per our bank notification "net transfer to SGA invoice".</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Payment term:</div>';
        ReportHTML += '                 <div class="col-xs-12"> - For credit our finance dept. requests irrevocable bank letter of guarantee or bank authenticated check with covering the credit ceiling for the credit facility + a contract signed by the authorized signature.</div>';
        ReportHTML += '                 <br><div class="col-xs-12"> Hope our offer meets your requirements.</div>';
        ReportHTML += '                 <hr style="width:97%;height:0px;border:.5px dotted #000;">';
        ReportHTML += '                 <div class="col-xs-12"><b><u>Ex-Works:</u></b></div>';
        ReportHTML += '                 <br><div class="col-xs-12"><b><u>Please note the following:</u></b></div>';
        ReportHTML += '                 <div class="col-xs-12"> - Free time for loading is 8 hours, thereafter detention charges applies EGP 700/Ct for the next 8 hours, Exceeding 16 Hours detention charges 50%, Exceeding 24 Hours detention charges 100% of the trucking rate per day or part of a day.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Subject to 3rd parties official receipts (incl. carrier' + "'" + 's OTHC, PTI, Power charges, road tolls, scale receipts, clearance ... etc.) which will be debited at cost along with the Supporting docs. </div>';
        ReportHTML += '                 <div class="col-xs-12"> - Subject to courier charges – if needed.</div>';
        ReportHTML += '                 <br><div class="col-xs-12"><b><u>General Terms & Conditions:</u></b></div>';
        ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding any official receipts.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - THC at both ends as per Carrier current tariff subject to change and final carrier invoice and currency fluctuation.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding VAT.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Rates are subject to modification upon any sovereign changes.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Above rate is net selling excluding bank charges.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - The above quotation is under EIFFA  trading  terms and condition.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - BAF, CAF and War risk surcharges are subject to change without any previous notice.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - A/M rate subject to any IMO surcharge additional if applicable.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Subject to equipment & space availability.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Vessels arrival date & transit time are estimated & subject to variation.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Rates should be confirmed prior booking.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Any additional services rising or demand during the shipment processing will be invoiced separately.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - The transfer cost attached to payment involved with shipment processing is for your account as per our bank notification "net transfer to SGA invoice".</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Payment term:</div>';
        ReportHTML += '                 <div class="col-xs-12"> - For credit our finance dept. requests irrevocable bank letter of guarantee or bank authenticated check with covering the credit ceiling for the credit facility + a contract signed by the authorized signature.</div>';
        ReportHTML += '                 <br><div class="col-xs-12"> Hope our offer meets your requirements.</div>';
        ReportHTML += '                 <hr style="width:97%;height:0px;border:.5px dotted #000;">';
        ReportHTML += '                 <div class="col-xs-12"><b><u>Tanks General Conditions</u></b></div>';
        ReportHTML += '                 <div class="col-xs-12"> - Carrier is SGA choice.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Tank hire and ocean freight included.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - All local official receipts for export formalities, trucking, courier, inspection, weighing, telex release, THC at both ends are excluded.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding VAT.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Cleaning & 20ltr residue disposal costs included, excessive amount is charged in addition.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - All local costs destination; port handlings, documentation, un/loading haulage (inclusive of re/delivery at depot/port), truck demurrage alike excluded.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Pump/compressor & hoses are provided by shipper or receiver.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Heating/heating stop, specialized/additional un/loading equipment, drop/recollection, vacuum/leak test, handrail installation excluded.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - All sorts of un/loading-related works are carried out by shipper/receiver at their own responsibility and cost.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Free time for un/loading & truck detention afterwards is charged as per agreed conditions/tariff.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Transit time refers ‘’port to port‘’ & may change due to weather or other conditions.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Tanks are not temperature controlled. Although tanks are thermally insulated however product being carried may solidify to such an extent that may result in deterioration of quality including total loss of product. For such an incident, carrier shall not be deemed responsible. Costs of re-heating the solidified product into its original state, charges for redelivery at origin or at disposal site as well as any other associated costs are re-charged on shipper/receiver in addition.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Where mentioned, net payload given is based on allowable gross weight on road&rail at un/load and/or crossing country, may change due to product’s specific gravity, safety margin applied and/or due to other variables. Net weight actually loaded that can be less than the permissible max payload shall not change the freight price quoted herein.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Where mentioned, ‘’non-hazardous or not regulated”, dependent on shipper’s declaration, refers to that the product being shipped is not regulated as per ADR/IMDG/RID Conventions but it does not refer to any other product related specifications.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Any damage incurred to tank ex/interior during heating and/or transport and/or other handlings being performed under shipper/receiver’s in/direct control, shall be fully at shipper/receiver’s account. Shipper/receiver is also regarded to be completely aware of that indicative replacement value of a tank is Usd 22,000.-</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Any party acting together with or on behalf of the shipper/receiver is regarded successively and jointly and severally responsible for all of conditions, fees and charges arising from the said shipment mentioned herein this offer/agreement.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - In conformity with current regulations at any customs at arrival/departure/transshipment ports/terminals, related declaration must be submitted minimum 48 hours prior to actual departure/arrival at related terminal/port. Otherwise and any incorrect declaration/information given due to whatsoever reason, any extra cost & full liability to incur thereof are on shipper’s account.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Where revelant, particular permission at customs of origin and destination are in full responsibility of shipper and any delay or complications occured as well as all consequences thereof shall be on shipper’s full responsibility.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Dangerous Cargo declaration where relevant shall be submitted by shipper to carrier minimum 48 hours prior to actual shipment reservation. Otherwise and any incorrect declaration/information given due to whatsoever reason, any extra cost & full liability to incur thereof are on shipper’s account.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Where related, all necessary permissions for im/export and/or transport are met by shipper/receiver by their selves at their own cost solely.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Carrier where found necessary may change at its own initiative route and kind of equipment given here, without harming the general terms agreed.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Carrier has right to adjust the rates should the surcharges or other cost content change.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Confirmation by return with authorized signature and company stamp that shipper accepts all terms and conditions as mentioned in this offer is required. If the subject transport service has been performed, however, without receipt of your confirmation, the complete contents inclusive of all terms and conditions of this quotation shall be deemed acknowledged and confirmed by the shipper undersigned herein. Furthermore, tanks supplied by carrier is regarded automatically, without need for any further approval in written or verbal prior or following after completion of loading, suitable and safe for loading the subject product.</div>';

    } else { //Default Terms&Conditions for NON SGA companies
        ReportHTML += '                 <b><u>Terms & Conditions:</u></b><br>';
        ReportHTML += '                 <div class="col-xs-12"> - Above rates are not valid for dangerous cargo unless otherwise stated.</div>';
        ReportHTML += '                 <div class="col-xs-12"> - Above rates are excluding insurance & legalization unless otherwise stated.</div>';
        ReportHTML += "                 <div class='col-xs-12'> - Our liability is limited to carrier's liability as per mentioned on bill of lading.</div><br>";
        ReportHTML += '                 <div class="col-xs-12 m-l-n">Trust this offer will meet your requirements and approval.</div>';
        ReportHTML += '                 <div class="col-xs-12 m-l-n">Please do not hesitate to call us if you have any inquiries on the above.</div><br>';
    }
    if (pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG")
        ReportHTML += '                 <h5><b>Thanks & Best Regards</b></h5>';
    if (pDefaults.UnEditableCompanyName == "ELI" || pDefaults.UnEditableCompanyName == "SAF") {
        ReportHTML += '                 <h5><b>' + pUserName + '</b></h5>';
        if (pDefaults.UnEditableCompanyName == "ELI")
            ReportHTML += '                 <h5><b>' + (pUserMobile1 == 0 ? "" : ('TEL : ' + pUserMobile1)) + (pUserEmail == 0 ? "" : ('&emsp;Email : ' + pUserEmail)) + '</b></h5>';
        if (pDefaults.UnEditableCompanyName == "SAF")
            ReportHTML += '                 <h5><b>' + (pLoggedUser.LocalName == 0 ? "" : pLoggedUser.LocalName) + '</b></h5>';
    }

    ReportHTML += '         </body>';
    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
    if ($("#cbPrintFooter").prop("checked"))
        ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
    if (pDefaults.UnEditableCompanyName == "ELI" || pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG")
        ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter-Quotation.jpg" alt="footer"/></div>';
    else if (pDefaults.UnEditableCompanyName == "TRL" || pDefaults.UnEditableCompanyName == "HAS"
        || pDefaults.UnEditableCompanyName == "ELI")
        ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
    else if (pDefaults.UnEditableCompanyName == "REL")
        ReportHTML += '         <div class="row text-center"><img src="/Content/Images/RELANFooter.png" alt="footer"/></div>';
    ReportHTML += '     </footer>';
    ReportHTML += '</html>';
    if (pDefaults.UnEditableCompanyName == "GBL") {
        SendPDFEmail_General("Quotation " + pQuotationHeader.Code, pEmail_To, ReportHTML, pReportTitle, null);
        Routings_LoadAll(); //to increment NumberOfChairs(i.e. Printing times)
    }
    return ReportHTML;
}

/******************************************QuotationStage Functions********************************************/
function QuotationsEdit_SetPermissions() {
    debugger;
    if (glbCallingControl == "QuotationsEdit_Approval") {
        $(".classHideForQuotationApproval").addClass("hide");
        $(".classShowForQuotationApproval").removeClass("hide");
    } else if (pDefaults.UnEditableCompanyName == "GBL" && pLoggedUser.Name != "ADMIN") {
        if ($("#hQRStageName").val() == "ACCEPTED" || $("#hQRStageName").val() == "DECLINED")
            $(".classHideForAcceptedOrDeclined").addClass("hide");
        else
            $(".classHideForAcceptedOrDeclined").removeClass("hide");

        if (pLoggedUser.DepartmentName == "BUSINESS DEVELOPMENT") {
            $("#txtRoutingsETAPOLDate").attr("disabled", "disabled");
            //$("#txtRoutingsExpirationDate").attr("disabled", "disabled");
            $(".classCostPriceField").attr("disabled", "disabled");
            //$("#lblIsRevised").addClass("hide");
            $("#divSetQuotationStage").removeClass("hide");
        } else if (pLoggedUser.DepartmentName == "FREIGHT" || pLoggedUser.DepartmentName == "TRANSPORTATION"
            || pLoggedUser.DepartmentName == "CLEARANCE" || pLoggedUser.DepartmentName == "WAREHOUSING"
            || pLoggedUser.DepartmentName == "FREIGHT HEAD" || pLoggedUser.DepartmentName == "TRANSPORTATION HEAD"
            || pLoggedUser.DepartmentName == "CLEARANCE HEAD" || pLoggedUser.DepartmentName == "WAREHOUSING HEAD") {
            $("#divSetQuotationStage").addClass("hide");
            $("#General").children().children().attr("disabled", "disabled");
            $("#Partners").children().children().attr("disabled", "disabled");
            $("#Partners").children().children().children().attr("disabled", "disabled");
            $("#divQuotationRouteModal").children().children().attr("disabled", "disabled");
            $("#divQuotationRouteModal").children().children().children().attr("disabled", "disabled");
            $(".classSalePriceField").attr("disabled", "disabled");
            if ($("#cbIsChargesConfirmed").prop("checked")
                && pLoggedUser.DepartmentName != "FREIGHT HEAD" && pLoggedUser.DepartmentName != "TRANSPORTATION HEAD"
                && pLoggedUser.DepartmentName != "CLEARANCE HEAD" && pLoggedUser.DepartmentName != "WAREHOUSING HEAD") //in case of head keep cost enabled all the time
                $(".classCostPriceField").attr("disabled", "disabled");
            else
                $(".classCostPriceField").removeAttr("disabled");

            $("#txtRoutingsETAPOLDate").removeAttr("disabled");
            $("#txtRoutingsExpirationDate").removeAttr("disabled");
            $("#txtRoutingsNotes").removeAttr("disabled");
            //$("#lblIsRevised").addClass("hide");
        } else if (pLoggedUser.DepartmentName == "ACCOUNTING" && pLoggedUser.Username != "BISHOY DEIF") {
            $("#divSetQuotationStage").addClass("hide");
            $("#General").children().children().attr("disabled", "disabled");
            $("#Partners").children().children().attr("disabled", "disabled");
            $("#Partners").children().children().children().attr("disabled", "disabled");
            $("#divQuotationRouteModal").children().children().attr("disabled", "disabled");
            $("#divQuotationRouteModal").children().children().children().attr("disabled", "disabled");
            $(".classCostPriceField").attr("disabled", "disabled");
            $(".classSalePriceField").attr("disabled", "disabled");

            //$("#lblIsRevised").addClass("hide");
        } else if (pLoggedUser.Username == "BISHOY DEIF") {
            $("#divSetQuotationStage").addClass("hide");
            $("#General").children().children().attr("disabled", "disabled");
            $("#Partners").children().children().attr("disabled", "disabled");
            $("#Partners").children().children().children().attr("disabled", "disabled");
            $("#divQuotationRouteModal").children().children().attr("disabled", "disabled");
            $("#divQuotationRouteModal").children().children().children().attr("disabled", "disabled");
            $(".classCostPriceField").attr("disabled", "disabled");
            $(".classSalePriceField").attr("disabled", "disabled");

            //$("#lblIsRevised").removeClass("hide");
        }
    } //if (pDefaults.UnEditableCompanyName == "GBL" && pLoggedUser.Name != "ADMIN") {
    else if (pDefaults.UnEditableCompanyName == "MED") {
        //$("#lblIsRevised").removeClass("hide");
    }
}

function QuotationsEdit_ulQuotationStagesChanged() {
    debugger;
    if ($('#ulQuotationStages').val() == DeclinedQuoteAndOperStageID) {
        $("#txtDenialReason").removeClass("hide");
        $("#txtDenialReason").val("");
    } else
        $("#txtDenialReason").addClass("hide");
}

function QuotationsEdit_ValidateChangeQuotationStageCriteria(pAction) {
    debugger;
    var pSelectedID = GetAllSelectedIDsAsString("tblRoutings");
    var tr = $("#tblRoutings tbody tr[ID=" + pSelectedID + "]");

    if (pSelectedID == "" || pSelectedID.split(',').length != 1)
        swal("Sorry", "Please, select one route to set the status.");
    else if (pAction == "Revised") {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Quotations/QR_Revised"
            , { pRevisedQRIDs: pSelectedID }
            , function (pData) {
                if (pData[0] == "") {
                    swal("Success", "Rivisal set successfully.");
                    Routings_BindTableRows(JSON.parse(pData[1]));
                } else
                    swal("Sorry", pData[0]);
                FadePageCover(false);
            }
            , null);
    } else if (tr.find("td.NumberOfChairs").text() == 0 && pDefaults.UnEditableCompanyName == "GBL")
        swal("Sorry", "This offer is not printed.");
    else if ($('#ulQuotationStages').val() == "")
        swal("Sorry", "Please, Select a stage.");
    else if (pDefaults.UnEditableCompanyName == "UNF" && ($('#slAgents').val() == "" || tr.find("td.POrC").attr("val") != 1 && $('input[name=cbDirectionType]:checked').val() == 1)) {
        if (tr.find("td.POrC").attr("val") != 1 && $('input[name=cbDirectionType]:checked').val() == 1) {
            swal("Sorry", "Please, check freight is Collect");
        }
        if ($('#slAgents').val() == "") {
            swal("Sorry", "Please, Select a Agent");
        }
    }


    //else {
    //else if (tr.find("td.QuotationStageID").attr('val') == AcceptedQuoteAndOperStageID && $('#ulQuotationStages').val() == AcceptedQuoteAndOperStageID && pDefaults.UnEditableCompanyName == "MED")
    //    swal("Sorry", "This quotation is already accepted.");
    else if ($('#ulQuotationStages').val() == DeclinedQuoteAndOperStageID && $("#txtDenialReason").val().trim() == "")
        swal("Sorry", "Please, state the reason for refusing the offer.");
    else if ((["MED", "GBL", "BED", "ILS", "ILSEG", "MAN"].includes(pDefaults.UnEditableCompanyName))
        && $('#ulQuotationStages').val() == AcceptedQuoteAndOperStageID && !$("#cbIsRevised" + pSelectedID).prop("checked")) {
        swal("Sorry", "Please, Quotation must be approved first.");
    } else if ($('#ulQuotationStages').val() != AcceptedQuoteAndOperStageID && $('#ulQuotationStages').val() != DeclinedQuoteAndOperStageID)
        SetQuotationStage();
    else if (pDefaults.UnEditableCompanyName == "MED" && pAction == "Group") {
        Receptionists_GetAvailableDepartments();
        $("#btnCheckboxesListApply").attr("onclick", "SetQuotationStageAndSendAlarmToGroup();");
    }
    else {
        Receptionists_GetAvailableUsers();
        $("#btnCheckboxesListApply").attr("onclick", "SetQuotationStage();");
        $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Apply");
        $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers();");
    }
}
function cbCheckAllUsersChanged() {
    debugger;
    if ($("#cbCheckAllUsers").prop("checked"))
        $("#divCheckboxesList input[name=cbAddedItemID]").prop("checked", true);
    else
        $("#divCheckboxesList input[name=cbAddedItemID]").prop("checked", false);
}
function SetQuotationStage() {
    debugger;
    var pSelectedID = GetAllSelectedIDsAsString("tblRoutings");
    if (pSelectedID == "" || pSelectedID.split(',').length != 1)
        swal("Sorry", "Please, select one route to set the status.");
    else if ($('#ulQuotationStages').val() == "")
        swal(strSorry, "Please, Select a stage.");
    //else {
    //var tr = $("#tblRoutings tbody tr[ID=" + pSelectedID + "]");
    //if (tr.find("td.NumberOfChairs").text() == 0)
    //    swal("Sorry", "This offer is not printed.");
    else {
        debugger;
        FadePageCover(true);
        var pModalName = "CheckboxesListModal";
        var pCheckboxNameAttr = "cbAddedItemID";
        var pSelectedAlarmReceiversIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
        CallGETFunctionWithParameters("/api/Quotations/SetQuotationStage"
            , {
                pQuotationID: $("#hQuotationID").val()
                ,
                pQuotationRouteID: pSelectedID
                ,
                pQuotationStageID: $('#ulQuotationStages').val()
                ,
                pDenialReason: $("#txtDenialReason").val().trim() == "" ? "0" : $("#txtDenialReason").val().trim().toUpperCase()
                ,
                pAlarmReceiversIDs: pSelectedAlarmReceiversIDs
            }
            , function (pData) {
                if (pData[0]) {
                    var _MailMessageReturned = pData[2];
                    //$("#lblStage").html($('#ulQuotationStages .active').text());
                    //$("#hQuotationStageID").val($('#ulQuotationStages .active').val());
                    Routings_BindTableRows(JSON.parse(pData[1]));
                    jQuery("#CheckboxesListModal").modal("hide");
                    if ($("#ulQuotationStages").val() == AcceptedQuoteAndOperStageID && $("#slSalesLead").val() != ""
                        && $("#slShippers").val() == "" && $("#slConsignees").val() == "" && $("#slAgents").val() == ""
                        && pDefaults.UnEditableCompanyName != "GBL") {
                        swal({
                            title: "",
                            text
                                : "Would you like to transfer '" + $("#slSalesLead option:selected").text() + "' to be an actual customer?",
                            //type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes, Apply!",
                            closeOnConfirm: true
                        }, function () {
                            FadePageCover(true);
                            CallGETFunctionWithParameters("/api/Customers/CRM_TransferToCustomers"
                                , { pCRMSalesLeadID: $("#slSalesLead").val(), pQuotationID: $("#hQuotationID").val() }
                                , function (pData) {
                                    var _MessageReturned = pData[0];
                                    var _CustomerID = pData[1];
                                    var _ContactID = pData[2];
                                    var _ContactName = pData[3];
                                    if (_MessageReturned == "") {
                                        $("#slConsignees").append("<option value=" + _CustomerID + ">" + $("#slSalesLead option:selected").text() + "</option>");
                                        $("#slShippers").append("<option value=" + _CustomerID + ">" + $("#slSalesLead option:selected").text() + "</option>");
                                        $("#hReadySlCustomers").append("<option value=" + _CustomerID + ">" + $("#slSalesLead option:selected").text() + "</option>");
                                        if ($("#cbIsImport").prop('checked')) {
                                            $("#slConsignees").val(_CustomerID);
                                            if (_ContactID > 0) {
                                                $("#slConsigneeContacts").append("<option value=" + _ContactID + ">" + _ContactName + "</option>");
                                                $("#slConsigneeContacts").val(_ContactID);
                                            }
                                        } else {
                                            $("#slShippers").val(_CustomerID);
                                            if (_ContactID > 0) {
                                                $("#slShipperContacts").append("<option value=" + _ContactID + ">" + _ContactName + "</option>");
                                                $("#slShipperContacts").val(_ContactID);
                                            }
                                        }
                                        swal("Success", "Saved, successfully.");
                                    } else
                                        swal("Sorry", _MessageReturned);
                                    FadePageCover(false);
                                }
                                , null);
                        });
                    } //if ($('#ulQuotationStages').val() == AcceptedQuoteAndOperStageID) {
                } else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            });
    }
    //}
}

function QuotationsEdit_CalculateTotalCurrenciesSummaryFromArray(pArray) {
    debugger;
    var temp = {};
    var row = null;
    tempArray = JSON.parse(JSON.stringify(pArray)); //not to change the original Array so i make a copy
    for (var i = 0; i < tempArray.length; i++) {
        row = tempArray[i];
        if (!temp[row.SaleCurrencyCode]) {
            temp[row.SaleCurrencyCode] = row;
        } else {
            temp[row.SaleCurrencyCode].SaleAmount += row.SaleAmount;
            row.SaleAmount = 0; //to avoid duplication
            //temp[row.CurrencyCode].PaidAmount += row.PaidAmount;
            //row.PaidAmount = 0; //to avoid duplication
            //temp[row.CurrencyCode].RemainingAmount += row.RemainingAmount;
            //row.RemainingAmount = 0; //to avoid duplication
        }
    }
    var ArrResultTotals = [];
    var pTotalSummary = "";
    for (var prop in temp) {
        ArrResultTotals.push(temp[prop]);
        pTotalSummary += (pTotalSummary == "" ? (temp[prop].SaleAmount.toFixed(2) + ' ' + prop) : (", " + temp[prop].SaleAmount.toFixed(2) + " " + prop));
    }
    return pTotalSummary;
}

///////////////////////////////////////EOF Partners Tab Functions///////////////////////////////////////////////

/////////////////////////////////////////Packages Tab Functions///////////////////////////////////////////////
//function ContainerTypes_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
//    //parameters: ID, strFnName, First Row in select list, select list name
//    var pWhereClause = "";

//    pWhereClause = " WHERE IsInactive = 0 ";
//    pWhereClause += " ORDER BY Code ";
//    GetListWithCodeAndWhereClause(pID, "/api/ContainerTypes/LoadAll", "Type 1", "slPackageTypes1", pWhereClause);
//    GetListWithCodeAndWhereClause(pID, "/api/ContainerTypes/LoadAll", "Type 2", "slPackageTypes2", pWhereClause);
//    GetListWithCodeAndWhereClause(pID, "/api/ContainerTypes/LoadAll", "Type 3", "slPackageTypes3", pWhereClause);
//}
/////////////////////////////////////////EOF Packages Tab Functions///////////////////////////////////////////////
///////////////////////////////////////Routing Tab Functions///////////////////////////////////////////////
function Quotation_cbPickupOrDeliveryChange() {
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

function Quotation_cbIsSalesLeadChange() {
    debugger;
    if ($("#cbIsSalesLead").prop("checked"))
        $(".classHideForSalesLead").addClass("hide");
    else
        $(".classHideForSalesLead").removeClass("hide");
}

function Quotation_cbIsWarehousingChange() {
    debugger;
    if ($("#cbIsWarehousing").prop("checked")) {
        $("#lblShippers").text("Client");
        $(".classShowForWarehousing").removeClass("hide");
        $(".classHideForWarehousing").addClass("hide");
        $(".classNotMandatoryForWarehousing").attr("data-required", "false");
        $("#cbIsSalesLead").prop("checked", false);
        $("#cbDangerousGoods").prop("checked", false);
        //Set as Domestic
        {
            $("#cbIsDomestic").prop("checked", true);
            $("#hDirectionIconName").val(DomesticIconName);
            $("#hDirectionIconStyle").val(strDomesticIconStyleClassName);
            $("#slConsignees").attr("data-required", "false");
            $("#divShipper").removeClass("hide");
            $("#slShippers").attr("data-required", "true");
        }
        //Set as Inland
        {
            $("#cbIsInland").prop("checked", true);

            $("#hTransportIconName").val(InlandIconName);
            $("#hTransportIconStyle").val(strInlandIconStyleClassName);
            ////show section ShipmentType (FTL,LTL)
            //$("#secShipmentType").removeClass("hide");
            $("#divOceanType").addClass("hide");
            //$("#divInlandType").removeClass("hide");
            //set LTL as default
            $("#cbIsLTL").prop('checked', true);
        }
    } else {
        Quotations_ClearAllControls();
    }
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
function SwitchToQuotationsEditView(pID) {
    debugger;
    if (glbCallingControl == "QuotationApproval")
        LoadViews("QuotationsEdit_Approval", null, pID);
    else
        LoadViews("QuotationsEdit", null, pID);
}

function SwitchToQuotationsView() {
    LoadViews("Quotations");
}

function Quotations_FillSelectOperationTypeModal() {
    var pSelectedID = GetAllSelectedIDsAsString("tblRoutings");
    if (pSelectedID == "" || pSelectedID.split(',').length != 1)
        swal("Sorry", "Please, select one route to create an operation.");
    else {
        var tr = $("#tblRoutings tbody tr[ID=" + pSelectedID + "]");
        var varExpirationDate = tr.find("td.ExpirationDate").text();
        //sherif: uncomment the next 3 lines to return back the expiration date validation
        if (Date.prototype.compareDates(FormattedTodaysDate, ConvertDateFormat(varExpirationDate)) <= 0)
            swal("Sorry", "This quotation is expired.");
        else if (tr.find("td.QuotationStageID").attr('val') != AcceptedQuoteAndOperStageID)
            swal("Sorry", "This quotation must be accepted to create the operation.");
        else { //valid choice
            jQuery("#SelectOperationTypeModal").modal("show");
            $("#lblSelectOperationTypeShown").html(": " + $("#hQuotationCode").val());

            $("#cbIsDirect").prop("checked", true);
            $("#hBLTypeIconName").val(DirectIconName);
            $("#hBLTypeIconStyle").val(strDirectIconStyleClassName);

            //if ($("#hBLType").val() == constDirectBLType) {
            //    $("#cbIsDirect").prop("checked", true);
            //    $("#hBLTypeIconName").val(DirectIconName);
            //    $("#hBLTypeIconStyle").val(strDirectIconStyleClassName);
            //}
            //else
            //    if ($("#hBLType").val() == constHouseBLType) {
            //        $("#cbIsHouse").prop("checked", true);
            //        $("#hBLTypeIconName").val(HouseIconName);
            //        $("#hBLTypeIconStyle").val(strHouseIconStyleClassName);
            //    }
            //    else { //Master
            //        $("#cbIsMaster").prop("checked", true);
            //        $("#hBLTypeIconName").val(MasterIconName);
            //        $("#hBLTypeIconStyle").val(strMasterIconStyleClassName);
            //    }
            //if ($("#hDirectionType").val() == constImportDirectionType) {
            //    $("#cbIsImport").prop("checked", true)
            //    $("#hDirectionIconName").val(ImportIconName);
            //    $("#hDirectionIconStyle").val(strImportIconStyleClassName);
            //}
            //else
            //    if ($("#hDirectionType").val() == constExportDirectionType) {
            //        $("#cbIsExport").prop("checked", true);
            //        $("#hDirectionIconName").val(ExportIconName);
            //        $("#hDirectionIconStyle").val(strExportIconStyleClassName);
            //    }
            //    else { //Domestic
            //        $("#cbIsDomestic").prop("checked", true);
            //        $("#hDirectionIconName").val(DomesticIconName);
            //        $("#hDirectionIconStyle").val(strDomesticIconStyleClassName);
            //    }
            //if ($("#hTransportType").val() == OceanTransportType) {
            //    $("#cbIsOcean").prop("checked", true);
            //    $("#hTransportIconName").val(OceanIconName);
            //    $("#hTransportIconStyle").val(strOceanIconStyleClassName);
            //    $("#divOceanType").removeClass("hide");
            //    $("#divInlandType").addClass("hide");
            //}
            //else
            //    if ($("#hTransportType").val() == AirTransportType) {
            //        $("#cbIsAir").prop("checked", true);
            //        $("#hTransportIconName").val(AirIconName);
            //        $("#hTransportIconStyle").val(strAirIconStyleClassName);
            //    }
            //    else { //Inland
            //        $("#cbIsInland").prop("checked", true);
            //        $("#hTransportIconName").val(InlandIconName);
            //        $("#hTransportIconStyle").val(strInlandIconStyleClassName);
            //        $("#divOceanType").addClass("hide");
            //        $("#divInlandType").removeClass("hide");
            //    }
            //if ($("#hShipmentType").val() == constFCLShipmentType)
            //    $("#cbIsFCL").prop("checked", true)
            //else
            //    if ($("#hShipmentType").val() == constLCLShipmentType)
            //        $("#cbIsLCL").prop("checked", true);
            //    else
            //        if ($("#hShipmentType").val() == constFTLShipmentType)
            //            $("#cbIsFTL").prop("checked", true);
            //        else
            //            if ($("#hShipmentType").val() == constLTLShipmentType)
            //                $("#cbIsLTL").prop("checked", true);
            //            else
            //                if ($("#hShipmentType").val() == constConsolidationShipmentType)
            //                    $("#cbIsConsolidation").prop("checked", true);

            //if ($("#cbIsAir").prop('checked'))
            //    $("#secShipmentType").addClass('hide');
            //else
            //    $("#secShipmentType").removeClass('hide');
            //if ($("#cbIsMaster").prop('checked'))
            //    $("#divConsolidationOption").removeClass('hide');
            //else
            //    $("#divConsolidationOption").addClass('hide');
            //debugger;
            //BLType_SetIconNameAndStyle();
            //DirectionType_SetIconNameAndStyle();
            //TransportType_SetIconNameAndStyle();
        }
    }
}

function CreateOperationFromQuotation() {
    debugger;
    var pSelectedID = GetAllSelectedIDsAsString("tblRoutings");
    var tr = $("#tblRoutings tbody tr[ID=" + pSelectedID + "]");

    //if ($('#slPOL option:selected').val() == $('#slPOD option:selected').val() && $('#slPOL option:selected').val() != "" && !$("#cbIsDomestic").prop("checked"))//check different ports
    //    swal(strSorry, strPOLEqualPODWarning);
    //else //check Domestic with POLCountry = PODCountry
    //    if ($('input[name=cbDirectionType]:checked').val() == 3 && $('#slPOLCountries option:selected').val() != $('#slPODCountries option:selected').val())
    //        swal(strSorry, strDomesticWithDifferentCountriesWarning);
    //    else //check import or export with different countries
    //        if ($('input[name=cbDirectionType]:checked').val() != 3 && $('#slPOLCountries option:selected').val() == $('#slPODCountries option:selected').val() && $('#slPOLCountries option:selected').val() != "")
    //            swal(strSorry, strImportOrExportWithSameCountriesWarning);
    //            //else //check quotation is marked as accepted
    //            //    if ($("#hQuotationStageID").val() != 4)
    //            //        swal(strSorry, "The Quotation must be accepted to build the operation.");
    //        else //build operation

    //TODO: check for valid Agent

    if ($("#slAgents").val() == "" && $("#cbIsMaster").prop("checked"))
        swal("Sorry", "Please, Select an agent and save the quotation to create a master operation.");
    else if ($("#slShippers").val() == "" && $("#slConsignees").val() == "" && $("#cbIsDirect").prop("checked"))
        swal("Sorry", "Please, Select Client.");
    else if (pDefaults.UnEditableCompanyName == "MED" && false) { // added false here to allow creating more than one operation from single quotation
        //for MED we can't create more than one operation from a single quotation route --Mustafa Mahmoud
        CallGETFunctionWithParameters("/api/Quotations/GetOperationsCreatedFromQuotationRoute", { pQuotationRouteID: pSelectedID },
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
                    CreateOperationFromQuotationAfterSuccess(tr, pSelectedID);
            });
    }
    else {
        swal({
            title: "Are you sure?",
            text: "An Operation will be created for Quotation '" + $("#txtQuotationCode").val() + "'." + (tr.find("td.Line").attr('val') == 0 ? " Take Care that no (Line/Trucker) is specified." : "")
                + " Note: If exchange rate is not entered for any charge currency, then you have to add it manually in the operation.",
            //type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Create!",
            closeOnConfirm: true
        },
            //callback function in case of success
            function () {
                CreateOperationFromQuotationAfterSuccess(tr, pSelectedID);
            });
    }
}
function CreateOperationFromQuotationAfterSuccess(tr, pSelectedID) {
    var CurrentYear = TodaysDate.getUTCFullYear();
    //FadePageCover_Customized(true, 500);
    jQuery("#SelectOperationTypeModal").modal("hide");
    var parameters = {
        "pQuotationID": $("#hQuotationID").val(),
        "pQuotationRouteID": pSelectedID,
        "pCodeSerial": 0, /*generated automatically*/
        "pCode": "O" + (CurrentYear - 2000) + "-" + GetDirectionType($('input[name=cbDirectionType]:checked').val()).substring(0, 3) + "-"
            + GetTransportType($('input[name=cbTransportType]:checked').val()).substring(0, 2) + "-"/* + $("#hCodeSerial").val()*/,
        "pBranchID": ($('#slQuotationEditBranch option:selected').val() == "" || $('#slQuotationEditBranch option:selected').val() == null || $('#slQuotationEditBranch option:selected').val() == undefined ? "0" : $('#slQuotationEditBranch option:selected').val()),
        "pSalesmanID": $('#slQuotationSalesman option:selected').val(),
        "pOperationManID": $('#slOperationEditOperationMan').val() == "" ? 0 : $('#slOperationEditOperationMan').val(),
        "pBLType": ($("#cbIsDirect").prop("checked")
            ? constDirectBLType
            : ($("#cbIsMaster").prop("checked") ? constMasterBLType : constHouseBLType)
        ),
        "pBLTypeIconName": ($("#cbIsDirect").prop("checked")
            ? DirectIconName
            : ($("#cbIsMaster").prop("checked") ? MasterIconName : HouseIconName)
        ),
        "pBLTypeIconStyle": ($("#cbIsDirect").prop("checked")
            ? strDirectIconStyleClassName
            : ($("#cbIsMaster").prop("checked") ? strMasterIconStyleClassName : strHouseIconStyleClassName)
        ),

        "pDirectionType": $('input[name=cbDirectionType]:checked').val(),
        "pDirectionIconName": $("#hDirectionIconName").val(),
        "pDirectionIconStyle": $("#hDirectionIconStyle").val(),
        "pTransportType": $('input[name=cbTransportType]:checked').val(),
        "pTransportIconName": $("#hTransportIconName").val(),
        "pTransportIconStyle": $("#hTransportIconStyle").val(),
        "pShipmentType": ($('input[name=cbTransportType]:checked').val() == 2 ? 0 : $('input[name=cbShipmentType]:checked').val()),
        "pShipperID": (($('#slShippers option:selected').val() == "" || $('#slShippers').val() == null)
            ? 0 : $('#slShippers option:selected').val()),

        // To be handled (set or removed)
        "pShipperAddressID": 0,
        "pShipperContactID": ($('#slShipperContacts option:selected').val() == undefined || $('#slShipperContacts option:selected').val() == "" ? 0 : $('#slShipperContacts option:selected').val()),
        "pConsigneeID": ($('#slConsignees option:selected').val() == "" || $('#slConsignees').val() == null ? 0 : $('#slConsignees option:selected').val()),

        // To be handled (set or removed)
        "pConsigneeAddressID": 0,
        "pConsigneeContactID": (($('#slConsigneeContacts option:selected').val() == undefined || $('#slConsigneeContacts option:selected').val() == "") ? 0 : $('#slConsigneeContacts option:selected').val()),
        "pAgentID": ($('#slAgents option:selected').val() == "" ? 0 : $('#slAgents option:selected').val()),

        // To be handled (set or removed)
        "pAgentAddressID": 0,
        "pAgentContactID": (($('#slAgentContacts option:selected').val() == undefined || $('#slAgentContacts option:selected').val() == "") ? 0 : $('#slAgentContacts option:selected').val()),
        "pIncotermID": tr.find("td.Incoterm").attr('val'), //($('#slIncoterms option:selected').val() == "" ? 0 : $('#slIncoterms option:selected').val()),
        "pCommodityID": tr.find("td.Commodity").attr('val'),//($('#slCommodities option:selected').val() == "" ? 0 : $('#slCommodities option:selected').val()),
        "pIncotermID": tr.find("td.Incoterm").attr('val'),
        "pTransientTime": tr.find("td.TransientTime").text() == "" ? 0 : tr.find("td.TransientTime").text(), //($("#txtTransientTime").val() == "" ? 0 : $("#txtTransientTime").val()),
        "pValidity": tr.find("td.Validity").text() == "" ? 0 : tr.find("td.Validity").text(), //($("#txtValidity").val() == "" ? 0 : $("#txtValidity").val()),
        "pFreeTime": tr.find("td.FreeTime").text() == "" ? 0 : tr.find("td.FreeTime").text(), //($("#txtFreeTime").val() == "" ? 0 : $("#txtFreeTime").val()),
        "pOpenDate": FormattedTodaysDate, //ConvertDateFormat($("#txtOpenDate").val().trim()),
        "pCloseDate": ConvertDateFormat(TodaysDate.addDays(TodaysDate, GetDefaultCloseDays())),
        "pCutOffDate": "01-01-1900", //varExpirationDate, //use convert fn. or not depends on the controller wether its string or datetime
        "pIncludePickup": $("#cbIncludePickup").prop('checked'),
        "pPickupCityID": 0, //($('#slPickupCity option:selected').val() == "" ? 0 : $('#slPickupCity option:selected').val()),
        // To be handled (set or removed)
        "pPickupAddressID": 0,
        "pPOLCountryID": tr.find("td.POLCountry").attr('val'),//$('#slPOLCountries option:selected').val(),
        "pPOL": tr.find("td.POL").attr('val'), //$('#slPOL option:selected').val(),
        "pPODCountryID": tr.find("td.PODCountry").attr('val'), //$('#slPODCountries option:selected').val(),
        "pPOD": tr.find("td.POD").attr('val'), //$('#slPOD option:selected').val(),

        "pPickupAddress": tr.find("td.PickupAddress").text() == "" ? "0" : tr.find("td.PickupAddress").text(),
        "pDeliveryAddress": tr.find("td.DeliveryAddress").text() == "" ? "0" : tr.find("td.DeliveryAddress").text(),
        "pMoveTypeID": tr.find("td.MoveType").attr('val'),

        "pShippingLineID": (tr.find("td.TransportType").attr('val') == 1 && tr.find("td.Line").attr('val') != "" ? tr.find("td.Line").attr('val') : 0),
        "pAirlineID": (tr.find("td.TransportType").attr('val') == 2 && tr.find("td.Line").attr('val') != "" ? tr.find("td.Line").attr('val') : 0),
        "pTruckerID": (tr.find("td.TransportType").attr('val') == 3 && tr.find("td.Line").attr('val') != "" ? tr.find("td.Line").attr('val') : 0),

        // To be handled (set or removed)
        "pIncludeDelivery": $("#cbIncludeDelivery").prop('checked'),
        "pDeliveryZipCode": 0,
        "pDeliveryCityID": 0, //($('#slDeliveryCity option:selected').val() == "" ? 0 : $('#slDeliveryCity option:selected').val()),
        "pDeliveryCountryID": 0,
        "pGrossWeight": 0,
        "pVolume": 0,
        "pChargeableWeight": 0,
        "pNumberOfPackages": 0,
        "pIsDangerousGoods": $("#cbDangerousGoods").prop("checked"),
        //"pDescriptionOfGoods": $("#divGoodsDescription").val().trim().toUpperCase(),
        "pCustomerReference": 0,
        "pNotes": $("#txtQuotationNotes").val().trim() == "" ? "0" : $("#txtQuotationNotes").val().trim().toUpperCase(),
        "pOperationStageID": OpenQuoteAndOperStageID
        //"pIsInactive": $("#cbIsInactive").prop('checked'),
    };
    debugger;
    FadePageCover(true);
    let pCreatedOperationID = 0;
    PostInsertUpdateFunction("form", "/api/Quotations/CreateOperationFromQuotation", parameters, false /*pSaveandAddNew*/, "QuotationsEditModal"
        , function (data) {
            //LoadViews("QuotationsManagement");
            //LoadViews("QuotationsEdit", null, $("#hQuotationID").val());
            pCreatedOperationID = data[1];
            if (data[1] == 0) {
                FadePageCover(false);
                swal("Sorry", "Please, ensure that partners are not inactive.");
            } else {
                LoadViews("OperationsEdit", null, data[1]);
                LoadOperationsSubMenu();
                //LoadWithPagingWithWhereClause("/api/QuotationCharges/LoadWithWhereClause", " where QuotationID = " + item.ID, 0, 10, function (pTabelRows) { QuotationCharges_BindTableRows(pTabelRows); });
            }
        });
}

function GetDefaultCloseDays() {
    debugger;
    var DefaultCloseDays = 0;
    if ($("#cbIsImport").prop('checked') && $("#cbIsOcean").prop('checked')) //ImportOceanDays
        DefaultCloseDays = $("#hDefaultImportOceanDays").val();
    else if ($("#cbIsImport").prop('checked') && ($("#cbIsAir").prop('checked'))) //ImportAirDays
        DefaultCloseDays = $("#hDefaultImportAirDays").val();
    else if ($("#cbIsImport").prop('checked') && ($("#cbIsInland").prop('checked'))) //InmportInlandDays
        DefaultCloseDays = $("#hDefaultImportInlandDays").val();
    else if ($("#cbIsExport").prop('checked') && $("#cbIsOcean").prop('checked')) //ExportOceanDays
        DefaultCloseDays = $("#hDefaultExportOceanDays").val();
    else if ($("#cbIsExport").prop('checked') && ($("#cbIsAir").prop('checked'))) //ExportAirDays
        DefaultCloseDays = $("#hDefaultExportAirDays").val();
    else if ($("#cbIsExport").prop('checked') && ($("#cbIsInland").prop('checked'))) //ExportInlandDays
        DefaultCloseDays = $("#hDefaultExportInlandDays").val();
    else if ($("#cbIsDomestic").prop('checked') && $("#cbIsOcean").prop('checked')) //DomesticOceanDays
        DefaultCloseDays = $("#hDefaultDomesticOceanDays").val();
    else if ($("#cbIsDomestic").prop('checked') && ($("#cbIsAir").prop('checked'))) //DomesticAirDays
        DefaultCloseDays = $("#hDefaultDomesticAirDays").val();
    else if ($("#cbIsDomestic").prop('checked') && ($("#cbIsInland").prop('checked'))) //DomesticInlandDays
        DefaultCloseDays = $("#hDefaultDomesticInlandDays").val();
    return DefaultCloseDays;
}

////////////////////////////////////////////////////////////////////Routing//////////////////////////////////////////////////////////
function Routings_BindTableRows(pRoutings) {
    debugger;

    ClearAllTableRows("tblRoutings");
    var AssignedExpirationDate = new Date();
    var AssignedShippingLineName = "";
    var AssignedAirlineName = "";
    var AssignedTruckerName = "";
    //var editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>";
    var copyToAnotherQuotationControlsText = " class='btn btn-xs btn-rounded btn-info float-right hide classShowForBED' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Copy To Another Quotation" + "</span>";

    var chargesControlsText = " class='btn btn-xs btn-rounded btn-info float-right" + (QVCha ? "" : " hide ") + "' > <i class='fa fa-money' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Charges") + "</span>";
    var //createOperationControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right " + (OA ? "" : " hide ") + "' > <i class='fa fa-folder-open-o' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Create Op.") + "</span>";
        createOperationControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right " + (OA ? "" : " hide ") + "' > <i class='fa fa-keyboard-o' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Operations") + "</span>";
    $.each(pRoutings, function (i, item) {
        AssignedExpirationDate = item.ExpirationDate;
        AssignedShippingLineName = item.ShippingLineName;
        AssignedAirlineName = item.AirlineName;
        AssignedTruckerName = item.TruckerName;
        var profit = (((item.SaleFromCharges - item.CostFromCharges) / item.CostFromCharges) * 100).toFixed(2);
        debugger;
        AppendRowtoTable("tblRoutings",
            ("<tr ID='" + item.ID + "' val='" + item.RoutingTypeID + "' "
                + (( // if BED, if not approved >> can edit, if approved >> must be the Revisor(which is the one who approved)
                    (pDefaults.UnEditableCompanyName != "BED" || !(item.QuotationStageID == 4))///item.IsRevised)
                    //|| (item.IsRevised && item.RevisorUserID == pLoggedUser.ID && pDefaults.UnEditableCompanyName == "BED")
                    || (item.QuotationStageID == 4 && $("#hLoggedUserDepartmentID").val() == 18 && pDefaults.UnEditableCompanyName == "BED") //Sales Head
                )
                    ? ("ondblclick='Routings_EditByDblClick(" + item.ID + ");'")
                    : ""
                )
                + (item.QuotationStageName == "REJECTED" || item.QuotationStageName == "DECLINED" ? (`title="` + item.DenialReason + `"`) : "")
                + "class='"
                + (
                    Date.prototype.compareDates(FormattedTodaysDate, GetDateWithFormatMDY(item.ExpirationDate)) <= 0
                        ? "static-text-danger"
                        : (/*item.IsRevised*/item.QuotationStageName == "APPROVED" ? " static-text-primary " : "")
                )
                + ((profit < 15.00 && pDefaults.UnEditableCompanyName != "ESG") ? "static-text-danger" : "")
                //+ ((glbCallingControl == "QuotationsEdit_Approval" && ((item.QuotationStageName != "APPROVED" && item.QuotationStageName != "APPROVAL REQUEST") || !item.IsChargeEditApprovalRequested)) ? " hide " : "")
                + (glbCallingControl == "QuotationsEdit_Approval" ? (item.QuotationStageName == "APPROVED" || item.QuotationStageName == "APPROVAL REQUEST" || item.IsChargeEditApprovalRequested ? "" : " hide ") : "")
                + "'>"
                //+ "<td class='RoutingID'> <input " + (item.RoutingTypeID != MainCarraigeRoutingTypeID ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='RoutingID'> <input " + (1 == 1 /*&&  Offer is not expired*/ ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='QuotationRouteCode'>" + item.Code + "</td>"
                + "<td class='SalesmanName'>" + item.SalesmanName + "</td>"
                + "<td class='RoutingType hide' val='" + item.RoutingTypeID + "'>" + item.RoutingName + "</td>"
                + "<td class='Line' val='" + (item.TransportType == OceanTransportType ? (item.ShippingLineID)//In case of House and main route get from vwOperations(The Line from MasterOp)
                    : (item.TransportType == AirTransportType ? (item.AirlineID)//In case of House and main route get from vwOperations(The Line from MasterOp)
                        : (item.TruckerID)) //In case of House and main route get from vwOperations(The Line from MasterOp)
                ) //EOF getting the carrier ID val
                + "'><small>" + (item.LineName == 0 ? "" : item.LineName) + "</small>"
                + "</td>"
                + "<td class='Commodity hide' val='" + item.CommodityID + "'>" + (item.CommodityID == 0 ? "" : item.CommodityName) + "</td>"
                //TransportType : 1-Ocean 2-Air 3-Inland
                + "<td class='TransportType hide' val='" + item.TransportType + "'>" + GetTransportType(item.TransportType) + "</td>"
                + "<td class='shownTransportIconName hide' ><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/></td>"
                + "<td class='TransportIconName hide'>" + item.TransportIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                + "<td class='TransportIconStyle hide'>" + item.TransportIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                + "<td class='CustomsAcceptedValue hide'>" + item.CustomsAcceptedValue + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 

                + "<td class='POLCountry hide' val='" + item.POLCountryID + "'>" + item.POLCountryID + "</td>"
                + "<td class='PODCountry hide' val='" + item.PODCountryID + "'>" + item.PODCountryID + "</td>"

                + "<td class='PickupPlace hide' val='" + item.PickupPlaceID + "'>" + item.PickupPlaceName + "</td>"
                + "<td class='POLID_Transport hide' val='" + item.POLID_Transport + "'>" + item.POLID_TransportName + "</td>"
                + "<td class='ClientPlant hide' val='" + item.ClientPlantID + "'>" + item.ClientPlantName + "</td>"
                + "<td class='ClearancePort hide' val='" + item.ClearancePortID + "'>" + item.ClearancePortName + "</td>"

                + "<td class='Route'><small> From: " + item.POLCountryCode + " (" + item.POLCode + " " + item.POLName + ")"
                + "<br>To: " + item.PODCountryCode + " (" + item.PODCode + " " + item.PODName + ")"
                + "</small>"
                + "</td>"

                + "<td class='POL hide' val='" + item.POL + "'><small>" + item.POLCountryCode + " (" + item.POLCode + " " + item.POLName + ")" + "</small></td>"
                + "<td class='POD hide' val='" + item.POD + "'><small>" + item.PODCountryCode + " (" + item.PODCode + " " + item.PODName + ")" + "</small></td>"
                + "<td class='Incoterm' val='" + item.IncotermID + "'>" + (item.IncotermID == 0 ? "" : item.IncotermName) + "</td>"
                + "<td class='EquipmentModel hide' val='" + item.EquipmentModelID + "'>" + (item.EquipmentModelID == 0 ? "" : item.EquipmentModelName) + "</td>"
                + "<td class='POrC hide' val='" + item.POrC + "'>" + (item.POrC == 0 ? "" : item.POrCName) + "</td>"
                + "<td class='PickupAddress hide'>" + (item.PickupAddress == 0 ? "" : item.PickupAddress) + "</td>"
                + "<td class='DeliveryAddress hide'>" + (item.DeliveryAddress == 0 ? "" : item.DeliveryAddress) + "</td>"
                + "<td class='MoveType hide' val='" + item.MoveTypeID + "'>" + (item.MoveTypeID == 0 ? "" : item.MoveTypeName) + "</td>"
                + "<td class='TransientTime'>" + (item.TransientTime == 0 ? "" : item.TransientTime) + "</td>"
                + "<td class='Validity hide'>" + (item.Validity == 0 ? "" : item.Validity) + "</td>"
                + "<td class='FreeTime'>" + (item.FreeTime == 0 ? "" : item.FreeTime) + "</td>"
                + "<td class='Performa hide ' >" + (item.ActionID == 0 ? "" : item.Code) + "</td>"
                + "<td class='FreeTimePOD hide'>" + (item.FreeTimePOD == 0 ? "" : item.FreeTimePOD) + "</td>"
                + "<td class='ExpirationDate' val='" + GetDateWithFormatMDY(AssignedExpirationDate) + "'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(AssignedExpirationDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(AssignedExpirationDate)))) + "</td>"
                + "<td class='ETAPOLDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ETAPOLDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ETAPOLDate))) + "</td>"
                + "<td class='ETDDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ETD)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ETD))) + "</td>"
                + "<td class='StuffingCutOf hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.StuffingCutOf)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.StuffingCutOf))) + "</td>"

                + "<td class='QRNumberOfPackages hide'>" + item.NumberOfPackages + "</td>"
                + "<td class='NumberOfChairs hide'>" + item.NumberOfChairs + "</td>"
                + "<td class='QRContainerTypes hide'>" + (item.ContainerTypes == 0 ? "" : item.ContainerTypes) + "</td>"
                + "<td class='QRPackageTypes hide'>" + (item.PackageTypes == 0 ? "" : item.PackageTypes) + "</td>"
                + "<td class='QRVolume hide'>" + item.Volume.toFixed(2) + "</td>"
                + "<td class='QRVolumetricWeight hide'>" + item.VolumetricWeight.toFixed(2) + "</td>"
                + "<td class='QRGrossWeight hide'>" + item.GrossWeight.toFixed(2) + "</td>"
                + "<td class='QRChargeableWeight hide'>" + item.ChargeableWeight.toFixed(2) + "</td>"

                //+ "<td class='QuotationStageID' val='" + item.QuotationStageID + "'>" + item.QuotationStageName /*+ (item.IsChargesConfirmed ? "(Confirmed)" : "")*/ + (item.IsRevised ? "(APPROVED)" : (item.DenialReason == 0 ? "" : "(Rejected)")) + "</td>"
                + "<td class='QuotationStageID' val='" + item.QuotationStageID + "'>" + item.QuotationStageName /*+ (item.IsChargesConfirmed ? "(Confirmed)" : "")*/ + "</td>"
                + "<td class='IsRevised hide'> <input type='checkbox' id='cbIsRevised" + item.ID + "' disabled='disabled' " + (item.IsRevised ? " checked='checked' " : "") + " />" + "</td>"
                + "<td class='IsChargesConfirmed hide'> <input type='checkbox' id='cbIsChargesConfirmed" + item.ID + "' disabled='disabled' " + (item.IsChargesConfirmed ? " checked='checked' " : "") + " /></td>"
                + "<td class='" + (glbCallingControl == "QuotationsEdit_Approval" && !item.IsChargeEditApprovalRequested ? "hide" : "") + "'>"
                + "<a href='#'" + (QA ? (" onclick='QuotationRoute_Copy(" + item.ID + ");' " + copyControlsText + "</a>") : "")
                + "<a href='#'" + (QA ? (" onclick='QuotationRoute_CopyToAnotherQuotationShowModal(" + item.ID + ");' " + copyToAnotherQuotationControlsText + "</a>") : "")
                + "<a href='#'" + " onclick='Routings_UpdateOperationFromQuotation(" + item.ID + ");' " + createOperationControlsText + "</a>"
                //+ "<a href='#'" + " onclick='QRCharge_FillModal(" + item.ID + ");' " + chargesControlsText + "</a>"
                + "</td>"

                + "<td class='FreightRateFormat hide'>" + (item.FreightRateFormat == 0 ? "" : item.FreightRateFormat) + "</td>"
                + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                + "<td class='CreatorUserID hide'>" + (item.CreatorUserID == 0 ? "" : item.CreatorUserID) + "</td>"
                + "<td class='ApprovalUserName hide'>" + (item.ApprovalUserName == 0 ? "" : item.ApprovalUserName) + "</td>"
                + "<td class='hide'><a href='#RoutingModal' data-toggle='modal' onclick='Routings_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));

    });
    //ApplyPermissions();
    if (QARou && glbCallingControl != "QuotationsEdit_Approval" /*&&  Offer is not expired*/) $("#btn-AddRoute").removeClass("hide"); else $("#btn-AddRoute").addClass("hide");
    if (QDRou && glbCallingControl != "QuotationsEdit_Approval" /*&&  Offer is not expired*/) $("#btn-DeleteRoute").removeClass("hide"); else $("#btn-DeleteRoute").addClass("hide");
    if (pDefaults.UnEditableCompanyName == "UNF") {

        $(".Performa").removeClass("hide");

    }
    BindAllCheckboxonTable("tblRoutings", "RoutingID", "cb-CheckAll-Routings");
    CheckAllCheckbox("HeaderDeleteRoutingID");
    //HighlightText("#tblRoutings>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    //Routings_SetTableProperties();//Set Routing Table Properties according to BLType and if Connected or Not

    Routings_ApplyPermissionsForAddButtons();
    if (pDefaults.UnEditableCompanyName == "BED") {
        $(".classShowForBED").removeClass("hide");
    }

}

function Routings_ApplyPermissionsForAddButtons() {
    debugger;
    if (!CommoditiesCanAdd) {
        $("#slCommodities_AddButton").addClass("hide");
    }
    if (!PortsCanAdd) {
        $("#slRoutingsPOL_AddButton").addClass("hide");
        $("#slRoutingsPOD_AddButton").addClass("hide");
        $("#slPOLID_TransportID_AddButton").addClass("hide");
        $("#slClearancePortID_AddButton").addClass("hide");
        $("#slPickupPlaceID_AddButton").addClass("hide");
        $("#slClientPlantID_AddButton").addClass("hide");
    }
    if (!IncotermsCanAdd) {
        $("#slIncoterm_AddButton").addClass("hide");
    }

    if ($("#hRoutingTransportType").val() == OceanTransportType) {
        if (!ShippingLinesCanAdd) {
            $("#slRoutingsLines_AddButton").addClass("hide");
        }
    } else if ($("#hRoutingTransportType").val() == AirTransportType) {
        if (!AirLinesCanAdd) {
            $("#slRoutingsLines_AddButton").addClass("hide");
        }
    } else if ($("#hRoutingTransportType").val() == InlandTransportType) {
        if (!TruckersCanAdd) {
            $("#slRoutingsLines_AddButton").addClass("hide");
        }
    }

}
function Routings_LoadAll() {
    var pWhereClauseQR = QuotationRoute_GetWhereClause();
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/Quotations/QR_LoadAll",
        {
            pWhereClauseQR: pWhereClauseQR, pOrderBy: "CodeSerial"
        }
        , function (pData) {
            if (pData[0]) {
                Routings_BindTableRows(JSON.parse(pData[1]));
                HighlightText("#tblRoutings", $("#txtRoutingSearch").val().trim().toUpperCase());
            }
            FadePageCover(false);
        }, null);
}

function QuotationRoute_GetWhereClause() {
    debugger;
    var pWhereClause = " WHERE QuotationID = " + $("#hQuotationID").val();
    if ($("#txtRoutingSearch").val().trim() != "") {
        pWhereClause += " AND (";
        pWhereClause += "       LineName like N'%" + $("#txtRoutingSearch").val().trim().toUpperCase() + "%' ";
        pWhereClause += "       OR POLCountryCode like N'%" + $("#txtRoutingSearch").val().trim().toUpperCase() + "%' ";
        pWhereClause += "       OR PODCountryCode like N'%" + $("#txtRoutingSearch").val().trim().toUpperCase() + "%' ";
        pWhereClause += "       OR POL like N'%" + $("#txtRoutingSearch").val().trim().toUpperCase() + "%' ";
        pWhereClause += "       OR POD like N'%" + $("#txtRoutingSearch").val().trim().toUpperCase() + "%' ";
        pWhereClause += ")";
    }
    //pWhereClause += " ORDER BY TransportType, LineName, ID DESC";
    return pWhereClause;
}

function QuotationRoute_Copy(pID) {
    debugger;
    var pParametersWithValues = {
        "pQRIDToCopy": pID
    };
    swal({
        title: "Are you sure?",
        text: "This route and the charges on it will be copied.",
        type: "",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Copy.",
        closeOnConfirm: true
    },
        //callback function in case of success
        function () {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/Quotations/QR_Copy", pParametersWithValues
                , function (pData) {
                    if (pData[0]) {
                        Routings_BindTableRows(JSON.parse(pData[1]));
                        swal("Sorry", "Route copied successfully.");
                    } else
                        swal("Sorry", "Connection failed, please try again.");
                    FadePageCover(false);
                }
                , null);
        });
}

function Routings_Insert(pSaveandAddNew) {
    debugger;
    //if (!Routings_CheckDatesLogic())
    //    swal(strSorry, strCheckDates);
    //else //check dates are not before open date
    //    if (
    //        ($("#txtExpectedDeparture").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtExpectedDeparture").val().trim())) < 0)
    //        || ($("#txtActualDeparture").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtActualDeparture").val().trim())) < 0)
    //        || ($("#txtExpectedArrival").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtExpectedArrival").val().trim())) < 0)
    //        || ($("#txtActualArrival").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtActualArrival").val().trim())) < 0)
    //        )
    //        swal(strSorry, "Dates must be after open date.");
    //    else
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    if ($('#slRoutingsPOL').val() == $('#slRoutingsPOD').val() && $('#slRoutingsPOL').val() != "" && !$("#cbIsDomestic").prop("checked") && !$("#cbIsInland").prop("checked"))//check different ports
        swal(strSorry, strPOLEqualPODWarning);
    else //check Domestic with POLCountry = PODCountry
        if ($('input[name=cbDirectionType]:checked').val() == 3 && $('#slRoutingsPOLCountries').val() != $('#slRoutingsPODCountries').val() && !$("#cbIsInland").prop("checked"))
            swal(strSorry, strDomesticWithDifferentCountriesWarning);
        else //check import or export with different countries
            if ($('input[name=cbDirectionType]:checked').val() != 3 && $('#slRoutingsPOLCountries').val() == $('#slRoutingsPODCountries').val() && !$('#slRoutingsPOLCountries').val() != "" && !$("#cbIsInland").prop("checked"))
                swal(strSorry, strImportOrExportWithSameCountriesWarning);
            //sherif: uncomment the next 2 lines to return back the expiration date validation
            else if ($("#txtRoutingsExpirationDate").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat(FormattedTodaysDate), ConvertDateFormat($("#txtRoutingsExpirationDate").val().trim())) < 1)
                swal("Sorry", "Expiration date must be after today.");
            else if ($("#txtRoutingsExpirationDate").val().trim() != "" && !isValidDate($("#txtRoutingsExpirationDate").val().trim(), 1))
                swal("Sorry", "Please, enter expiration date in the format DD/MM/YYYY.");
            else if ($("#txtRoutingsETAPOLDate").val().trim() != "" && !isValidDate($("#txtRoutingsETAPOLDate").val().trim(), 1))
                swal("Sorry", "Please, enter ETA POL Date in the format DD/MM/YYYY.");
            else if (ValidateForm("form", "RoutingModal")) {
                FadePageCover(true);
                var pParametersWithValues = {
                    pQuotationID: $("#hQuotationID").val()
                    ,
                    pRoutingTypeID: MainCarraigeRoutingTypeID //$('#slRoutingTypes option:selected').val()
                    //, pDirectionType: $('input[name=cbDirectionType]:checked').val()
                    //, pDirectionIconName: $("#hDirectionIconName").val()
                    //, pDirectionIconStyle: $("#hDirectionIconStyle").val()
                    ,
                    pTransportType: $("#hRoutingTransportType").val()
                    ,
                    pTransportIconName: $("#hRoutingTransportIconName").val()
                    ,
                    pTransportIconStyle: $("#hRoutingTransportIconStyle").val()
                    ,
                    pPOLCountryID: $('#slRoutingsPOLCountries option:selected').val()
                    ,
                    pPOLID: $('#slRoutingsPOL option:selected').val()
                    ,
                    pPODCountryID: $('#slRoutingsPODCountries option:selected').val()
                    ,
                    pPODID: $('#slRoutingsPOD option:selected').val()

                    ,
                    pClearancePortID: $('#slClearancePortID').val() == "" ? 0 : $('#slClearancePortID').val()
                    ,
                    pClientPlantID: $('#slClientPlantID').val() == "" ? 0 : $('#slClientPlantID').val()
                    ,
                    pPickupPlaceID: $('#slPickupPlaceID').val() == "" ? 0 : $('#slPickupPlaceID').val()
                    ,
                    pPOLID_TransportID: $('#slPOLID_TransportID').val() == "" ? 0 : $('#slPOLID_TransportID').val()


                    ,
                    pPickupAddress: ($("#txtPickupAddress").val().trim() == "" ? "0" : $("#txtPickupAddress").val().trim().toUpperCase())
                    ,
                    pDeliveryAddress: ($("#txtDeliveryAddress").val().trim() == "" ? "0" : $("#txtDeliveryAddress").val().trim().toUpperCase())
                    ,
                    pMoveTypeID: ($('#slMoveTypes').val() == "" ? 0 : $('#slMoveTypes').val())

                    ,
                    pExpirationDate: ($("#txtRoutingsExpirationDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtRoutingsExpirationDate").val()))
                    ,
                    pETAPOLDate: ($("#txtRoutingsETAPOLDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtRoutingsETAPOLDate").val()))

                    ,
                    pShippingLineID: ($("#hRoutingTransportType").val() == OceanTransportType
                        ? ($('#slRoutingsLines option:selected').val() == "" ? 0 : $('#slRoutingsLines option:selected').val())
                        : 0)
                    ,
                    pAirlineID: ($("#hRoutingTransportType").val() == AirTransportType
                        ? ($('#slRoutingsLines option:selected').val() == "" ? 0 : $('#slRoutingsLines option:selected').val())
                        : 0)
                    ,
                    pTruckerID: ($("#hRoutingTransportType").val() == InlandTransportType
                        ? ($('#slRoutingsLines option:selected').val() == "" ? 0 : $('#slRoutingsLines option:selected').val())
                        : 0)
                    ,
                    pTransientTime: ($("#txtRoutingsTransientTime").val() == "" ? 0 : $("#txtRoutingsTransientTime").val())
                    ,
                    pValidity: ($("#txtRoutingsValidity").val() == "" ? 0 : $("#txtRoutingsValidity").val())
                    ,
                    pFreeTime: ($("#txtRoutingsFreeTime").val() == "" ? 0 : $("#txtRoutingsFreeTime").val())
                    ,
                    pFreeTimePOD: ($("#txtRoutingsFreeTimePOD").val() == "" ? 0 : $("#txtRoutingsFreeTimePOD").val())
                    ,
                    pQuotationStageID: CreatedQuoteAndOperStageID //1
                    ,
                    pNotes: $("#txtRoutingsNotes").val().trim() == "" ? 0 : $("#txtRoutingsNotes").val().trim().toUpperCase()

                    ,
                    pCommodityID: $('#slCommodities').val() == "" ? 0 : $('#slCommodities').val()
                    ,
                    pIncotermID: $('#slIncoterm').val() == "" ? 0 : $('#slIncoterm').val()
                    ,
                    pEquipmentModelID: $('#slEquipmentModel').val() == "" ? 0 : $('#slEquipmentModel').val()
                    ,
                    pPOrC: $('#slPOrC').val() == "" ? 0 : $('#slPOrC').val()
                    ,
                    pCost: 0
                    ,
                    pSale: 0
                    ,
                    pDivisionID: 0
                    ,
                    pEquipmentTypeID: 0
                    ,
                    pFreightRateFormat: $("#txtRoutingsFreightRateFormat").val().trim() == "" ? 0 : $("#txtRoutingsFreightRateFormat").val().trim().toUpperCase()
                    ,
                    pCustomsAcceptedValue: ($("#CustomsAcceptedValue").val() == "" ? 0 : $("#CustomsAcceptedValue").val())
                }
                CallGETFunctionWithParameters("/api/Quotations/QR_Insert", pParametersWithValues
                    , function (pData) {
                        var _MailMessageReturned = pData[3];
                        if (pData[0]) {
                            //if (pDefaults.IsDepartmentOption && _MailMessageReturned == "")
                            //    swal("Success", "Charges alert sent to related departments.");
                            //else if (pDefaults.IsDepartmentOption && _MailMessageReturned != "")
                            //    swal("Success", "Notifications sent to users but sending email to departments has the following problem: " + _MailMessageReturned);
                            //else
                            swal("Success", "Saved successfully.");
                            Routings_BindTableRows(JSON.parse(pData[1]));
                            if (pSaveandAddNew)
                                Routings_ClearAllControls();
                            else {
                                //jQuery("#RoutingModal").modal("hide");
                                $("#hRoutingID").val(pData[2]);
                                $("#hQuotationRouteID").val(pData[2]);
                                $("#btnSaveRouting").attr("onclick", "Routings_Update(false);");
                                $("#btnSaveandNewRouting").attr("onclick", "Routings_Update(true);");
                                Fill_slChargeBillTo(pData[2]);
                            }
                        } else
                            swal("Sorry", "Connection failed, please try again.");
                        FadePageCover(false);
                    }
                    , null);
            }
}

function Routings_Update(pSaveandAddNew) {
    debugger;
    //getTodaysDateInddMMyyyyFormat()
    //($("#txtExpectedDeparture").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtExpectedDeparture").val().trim())) < 0)
    //if (!Routings_CheckDatesLogic())
    //    swal(strSorry, strCheckDates);
    //    else //check dates are not before open date
    //        if (!$("#cbIsImport").prop("checked") //No validation for import
    //            && (
    //                ($("#txtExpectedDeparture").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtExpectedDeparture").val().trim())) < 0)
    //                || ($("#txtActualDeparture").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtActualDeparture").val().trim())) < 0)
    //                || ($("#txtExpectedArrival").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtExpectedArrival").val().trim())) < 0)
    //                || ($("#txtActualArrival").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtActualArrival").val().trim())) < 0)
    //                )
    //            )
    //            swal(strSorry, "Dates must be after open date.");
    //else
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    if ($('#slRoutingsPOL').val() == $('#slRoutingsPOD').val() && $('#slRoutingsPOL').val() != "" && !$("#cbIsDomestic").prop("checked") && !$("#cbIsInland").prop("checked"))//check different ports
        swal(strSorry, strPOLEqualPODWarning);
    else //check Domestic with POLCountry = PODCountry
        if ($('input[name=cbDirectionType]:checked').val() == 3 && $('#slRoutingsPOLCountries').val() != $('#slRoutingsPODCountries').val())
            swal(strSorry, strDomesticWithDifferentCountriesWarning);
        else //check import or export with different countries
            if ($('input[name=cbDirectionType]:checked').val() != 3 && $('#slRoutingsPOLCountries').val() == $('#slRoutingsPODCountries').val() && $('#slRoutingsPOLCountries').val() != "" && !$("#cbIsInland").prop("checked"))
                swal(strSorry, strImportOrExportWithSameCountriesWarning);
            //sherif: uncomment then next 2 lines to return back the expiration date validation
            else if ($("#txtRoutingsExpirationDate").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat(FormattedTodaysDate), ConvertDateFormat($("#txtRoutingsExpirationDate").val().trim())) < 0)
                swal("Sorry", "Expiration can not be before today.");
            else if ($("#txtRoutingsExpirationDate").val().trim() != "" && !isValidDate($("#txtRoutingsExpirationDate").val().trim(), 1))
                swal("Sorry", "Please, enter expiration date in the format DD/MM/YYYY.");
            else if ($("#txtRoutingsETAPOLDate").val().trim() != "" && !isValidDate($("#txtRoutingsETAPOLDate").val().trim(), 1))
                swal("Sorry", "Please, enter ETA POL Date in the format DD/MM/YYYY.");
            else if (ValidateForm("form", "RoutingModal")) {
                FadePageCover(true);
                var pParametersWithValues = {
                    pRoutingID: $("#hRoutingID").val()
                    ,
                    pQuotationID: $("#hQuotationID").val()
                    ,
                    pRoutingTypeID: MainCarraigeRoutingTypeID //$('#slRoutingTypes option:selected').val()
                    //, pDirectionType: $('input[name=cbDirectionType]:checked').val()
                    //, pDirectionIconName: $("#hDirectionIconName").val()
                    //, pDirectionIconStyle: $("#hDirectionIconStyle").val()
                    ,
                    pTransportType: $("#hRoutingTransportType").val()
                    ,
                    pTransportIconName: $("#hRoutingTransportIconName").val()
                    ,
                    pTransportIconStyle: $("#hRoutingTransportIconStyle").val()
                    ,
                    pPOLCountryID: $('#slRoutingsPOLCountries option:selected').val()
                    ,
                    pPOLID: $('#slRoutingsPOL option:selected').val()
                    ,
                    pPODCountryID: $('#slRoutingsPODCountries option:selected').val()
                    ,
                    pPODID: $('#slRoutingsPOD option:selected').val()

                    ,
                    pClearancePortID: $('#slClearancePortID').val() == "" ? 0 : $('#slClearancePortID').val()
                    ,
                    pClientPlantID: $('#slClientPlantID').val() == "" ? 0 : $('#slClientPlantID').val()
                    ,
                    pPickupPlaceID: $('#slPickupPlaceID').val() == "" ? 0 : $('#slPickupPlaceID').val()
                    ,
                    pPOLID_TransportID: $('#slPOLID_TransportID').val() == "" ? 0 : $('#slPOLID_TransportID').val()

                    ,
                    pPickupAddress: ($("#txtPickupAddress").val().trim() == "" ? "0" : $("#txtPickupAddress").val().trim().toUpperCase())
                    ,
                    pDeliveryAddress: ($("#txtDeliveryAddress").val().trim() == "" ? "0" : $("#txtDeliveryAddress").val().trim().toUpperCase())
                    ,
                    pMoveTypeID: ($('#slMoveTypes').val() == "" ? 0 : $('#slMoveTypes').val())

                    ,
                    pExpirationDate: ($("#txtRoutingsExpirationDate").val().trim() == "" ? "0" : $("#txtRoutingsExpirationDate").val().trim())
                    ,
                    pETAPOLDate: ($("#txtRoutingsETAPOLDate").val().trim() == "" ? "0" : $("#txtRoutingsETAPOLDate").val().trim())
                    ,
                    pETDDate: ($("#txtRoutingsETDDate").val().trim() == "" ? "0" : $("#txtRoutingsETDDate").val().trim())
                    ,
                    pStuffingCutOf: ($("#txtRoutingsStuffingCutOfDate").val().trim() == "" ? "0" : $("#txtRoutingsStuffingCutOfDate").val().trim())
                    ,
                    pShippingLineID: ($("#hRoutingTransportType").val() == OceanTransportType
                        ? ($('#slRoutingsLines option:selected').val() == "" ? 0 : $('#slRoutingsLines option:selected').val())
                        : 0)
                    ,
                    pAirlineID: ($("#hRoutingTransportType").val() == AirTransportType
                        ? ($('#slRoutingsLines option:selected').val() == "" ? 0 : $('#slRoutingsLines option:selected').val())
                        : 0)
                    ,
                    pTruckerID: ($("#hRoutingTransportType").val() == InlandTransportType
                        ? ($('#slRoutingsLines option:selected').val() == "" ? 0 : $('#slRoutingsLines option:selected').val())
                        : 0)
                    ,
                    pTransientTime: ($("#txtRoutingsTransientTime").val() == "" ? 0 : $("#txtRoutingsTransientTime").val())
                    ,
                    pValidity: ($("#txtRoutingsValidity").val() == "" ? 0 : $("#txtRoutingsValidity").val())
                    ,
                    pFreeTime: ($("#txtRoutingsFreeTime").val() == "" ? 0 : $("#txtRoutingsFreeTime").val())
                    ,
                    pFreeTimePOD: ($("#txtRoutingsFreeTimePOD").val() == "" ? 0 : $("#txtRoutingsFreeTimePOD").val())
                    ,
                    pNotes: $("#txtRoutingsNotes").val().trim() == "" ? 0 : $("#txtRoutingsNotes").val().trim().toUpperCase()

                    ,
                    pCommodityID: $('#slCommodities').val() == "" ? 0 : $('#slCommodities').val()
                    ,
                    pIncotermID: $('#slIncoterm').val() == "" ? 0 : $('#slIncoterm').val()
                    ,
                    pEquipmentModelID: $('#slEquipmentModel').val() == "" ? 0 : $('#slEquipmentModel').val()
                    ,
                    pPOrC: $('#slPOrC').val() == "" ? 0 : $('#slPOrC').val()
                    ,
                    pIsRevised: $("#cbIsRevised").prop("checked")
                    ,
                    pCost: 0
                    ,
                    pSale: 0
                    ,
                    pDivisionID: 0
                    ,
                    pEquipmentTypeID: 0
                    ,
                    pFreightRateFormat: $("#txtRoutingsFreightRateFormat").val().trim() == "" ? 0 : $("#txtRoutingsFreightRateFormat").val().trim().toUpperCase()
                    ,
                    pCustomsAcceptedValue: ($("#txtCustomsAcceptedValue").val() == "" ? 0 : $("#txtCustomsAcceptedValue").val())

                }
                CallGETFunctionWithParameters("/api/Quotations/QR_Update", pParametersWithValues
                    , function (pData) {
                        if (pData[0]) {
                            Routings_BindTableRows(JSON.parse(pData[1]));
                            if (pSaveandAddNew)
                                Routings_ClearAllControls();
                            else {
                                swal("Success", "Saved Successfully.");
                                jQuery("#RoutingModal").modal("hide");
                            }
                        } else
                            swal("Sorry", "Connection failed, please try again.");
                        FadePageCover(false);
                    }
                    , null);
            }
}

function Routings_EditByDblClick(pID, pIsChargesRequest) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "GHA") {
        $("#RoutingsFreightRateFormat").removeClass("hide");
        $("#PickupAddress").text("Brand");
        $("#txtPickupAddress").attr("placeholder", "Brand");
        $("#DeliveryAddress").text("Model");
        $("#txtDeliveryAddress").attr("placeholder", "Model");
        $("#labRoutingsFreightRateFormat").text("Chassis No");
        $("#labMoveTypes").text("O.P Type");
        $("#labCommodity").text("Market-Config");

    }
    jQuery("#RoutingModal").modal("show");
    Routings_FillControls(pID);
    if (pDefaults.UnEditableCompanyName != "UNF") {
        $(".classHideForForwarding").addClass("hide");
    }

    if (pIsChargesRequest != undefined && pIsChargesRequest != null && pIsChargesRequest)
        $("#btn-SendChargesAdded").removeClass("hide");
}

function Routings_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblRoutings') != "")
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
                CallGETFunctionWithParameters("/api/Quotations/QR_Delete"
                    , {
                        pRoutingsIDs: GetAllSelectedIDsAsString('tblRoutings'), pQuotationID: $("#hQuotationID").val()
                    }
                    , function (pData) {
                        FadePageCover(false);
                        Routings_BindTableRows(JSON.parse(pData[1]));
                        if (!pData[0])
                            swal("Sorry", "All or some of the selected records are not deleted due to dependencies existence.");
                    }
                    , null);
            });
}

function Routings_FillControls(pID) {
    debugger;
    ClearAll("#RoutingModal");
    if (pDefaults.UnEditableCompanyName == "QUO") {
        $("#CustomsAcceptedValue").removeClass("hide")
    }
    if (pDefaults.UnEditableCompanyName == "TMP") {

        $("#RoutingsETDDate").removeClass("hide");
        $("#RoutingsStuffingCutOfDate").removeClass("hide");
    }


    var tr = $("#tblRoutings tr[ID='" + pID + "']");

    $("#hQRStageName").val($(tr).find("td.QuotationStageID").text());
    $("#hRoutingID").val(pID);
    $("#hQuotationRouteID").val(pID); //used in quotation charges
    $("#hQuotationRouteCreatorID").val($(tr).find("td.CreatorUserID").text());
    $("#hRoutingTransportType").val($(tr).find("td.TransportType").attr("val"));
    $("#hRoutingTransportIconName").val($(tr).find("td.TransportIconName").text());
    $("#hRoutingTransportIconStyle").val($(tr).find("td.TransportIconStyle").text());
    $("#lblRoutingShown").html(": " + $(tr).find("td.QuotationRouteCode").text());

    Fill_slChargeBillTo(pID);

    $("#lblTotalGrossWeightInQuotationRouteFooter").html(": " + $(tr).find("td.QRGrossWeight").text());
    $("#lblTotalVolumeInQuotationRouteFooter").html(": " + $(tr).find("td.QRVolume").text());
    $("#lblTotalVolumetricWeightInQuotationRouteFooter").html(": " + $(tr).find("td.QRVolumetricWeight").text());
    $("#lblChargeableWeightInQuotationRouteFooter").html(": " + $(tr).find("td.QRChargeableWeight").text());
    $("#lblPackageTypesInQuotationRouteFooter").html(": " + $(tr).find("td.QRPackageTypes").text());
    $("#lblContainerTypesInQuotationRouteFooter").html(": " + $(tr).find("td.QRContainerTypes").text());
    $("#lblTotalNumberOfContainers").html(": " + $(tr).find("td.QRContainerTypes").text());
    $("#lblTotalNumberOfPackages").html(": " + $(tr).find("td.QRPackageTypes").text());

    $("#txtCustomsAcceptedValue").val($(tr).find("td.CustomsAcceptedValue").text());


    $("#cbIsRevised").prop("checked", $("#cbIsRevised" + pID).prop("checked"));
    $("#cbIsChargesConfirmed").prop("checked", $("#cbIsChargesConfirmed" + pID).prop("checked"));

    Routings_SetCbRoutingTransportType($("#hRoutingTransportType").val());
    var pPOLCountryID = $(tr).find("td.POLCountry").attr("val");
    var pPODCountryID = $(tr).find("td.PODCountry").attr("val");
    var pClearancePortID = $(tr).find("td.ClearancePort").attr("val") == 0 ? "" : $(tr).find("td.ClearancePort").attr("val");
    var pClientPlantID = $(tr).find("td.ClientPlant").attr("val") == 0 ? "" : $(tr).find("td.ClientPlant").attr("val");
    var pPickupPlaceID = $(tr).find("td.PickupPlace").attr("val") == 0 ? "" : $(tr).find("td.PickupPlace").attr("val");
    var pPOLID_TransportID = $(tr).find("td.POLID_Transport").attr("val") == 0 ? "" : $(tr).find("td.POLID_Transport").attr("val");
    var pPOLID = $(tr).find("td.POL").attr("val");
    var pPODID = $(tr).find("td.POD").attr("val");
    var pMoveTypeID = $(tr).find("td.MoveType").attr("val");
    var pLineID = $(tr).find("td.Line").attr("val");
    var pCommodityID = $(tr).find("td.Commodity").attr("val");
    var pIncotermID = $(tr).find("td.Incoterm").attr("val");
    var pEquipmentModelID = $(tr).find("td.EquipmentModel").attr("val");
    var pPOrC = $(tr).find("td.POrC").attr("val");
    var ExpirationDate = $(tr).find("td.ExpirationDate").attr("val");
    //fill select boxes


    // disable buttons if Accepted in MED
    // first enable all
    SetRoutingButtonsEnabled(true);

    if (pDefaults.UnEditableCompanyName == "MED" && $(tr).find("td.ApprovalUserName").text() != $("#hLoggedUserNameNotLogin").val() && $(tr).find("td.ApprovalUserName").text() != "") {
        SetRoutingButtonsEnabled(false);
        $("#btn-SelectCharges").attr("disabled", "disabled");
        $("#btn-PricingRequest").attr("disabled", "disabled");
        $("#btnCopyCharge").attr("disabled", "disabled");
        $("#btnSaveCharge").attr("disabled", "disabled");
    }

    // then disable on condition
    // disable for all except Management even if from alarm
    // if Management, disable on condition

    //if ($("#hQRStageName").val() == "ACCEPTED" && pDefaults.UnEditableCompanyName == "MED") {
    //    if (IsFromManagement) {
    //        // if from Management, disable on condition
    //        if (!IsOpenedFromAlarm) {
    //            QuotationCharges_LoadWithPagingWithWhereClause(function () {
    //                SetRoutingButtonsEnabled(false);
    //            });
    //        } else {
    //            QuotationCharges_LoadWithPagingWithWhereClause();
    //        }
    //    } else {
    //        // if not from Management, disable without conditions
    //        QuotationCharges_LoadWithPagingWithWhereClause(function () {
    //            SetRoutingButtonsEnabled(false);
    //        });
    //    }

    //} else {
    //    QuotationCharges_LoadWithPagingWithWhereClause();
    //}



    // كان في طلب هنا انه ميبقاش من المانجمينت وانه يبقى على صلاحية الحذف

    if ($("#hQRStageName").val() == "ACCEPTED" && !QD) {
        QuotationCharges_LoadWithPagingWithWhereClause(function () {
            SetRoutingButtonsEnabled(false);
        });
    } else {
        QuotationCharges_LoadWithPagingWithWhereClause();
    }


    RoutingTypes_GetList($(tr).find("td.RoutingType").attr("val"), null);
    $("#slCommodities").val(pCommodityID == 0 ? "" : pCommodityID);
    $("#slIncoterm").val(pIncotermID == 0 ? "" : pIncotermID);
    $("#slEquipmentModel").val(pEquipmentModelID == 0 ? "" : pEquipmentModelID);
    $("#slPOrC").val(pPOrC == 0 ? "" : pPOrC);

    MoveTypes_GetList(pMoveTypeID, "slMoveTypes");
    if ($(tr).find("td.RoutingType").attr("val") == MainCarraigeRoutingTypeID) {
        $("#slRoutingTypes").attr("disabled", "disabled"); //coz its main
        Routings_DisableCbTransportType(); //to enable or disable cbTransportType
    } else {
        $("#slRoutingTypes").removeAttr("disabled");
        Routings_EnableCbTransportType();
        Routings_EnablePorts();
        Routings_EnableLines();
    }

    //$("#slRoutingsPOLCountries").html($("#slPOLCountries").html()); $("#slRoutingsPOLCountries").val(pPOLCountryID);
    //$("#slRoutingsPODCountries").html($("#slPODCountries").html()); $("#slRoutingsPODCountries").val(pPODCountryID);
    GetListWithName(pPOLCountryID, "/api/Countries/LoadAll", "Select Country", "slRoutingsPOLCountries"
        , function () {
            $("#slRoutingsPODCountries").html($("#slRoutingsPOLCountries").html());
            $("#slRoutingsPODCountries").val(pPODCountryID);
        });
    Routings_Ports_GetList(pPOLID, pPOLCountryID, 1);
    Routings_Ports_GetList(pPODID, pPODCountryID, 2);
    /////////////////////////////////////Todo: Fill Via Ports here///////////////////////////
    //Routings_Lines_GetList(pLineID, null);
    $("#slRoutingsLines").html($("#slLines").html());
    $("#slRoutingsLines").val(pLineID == 0 ? "" : pLineID);
    if (pDefaults.UnEditableCompanyName == "UNF") {
        GetListWithCodeAndNameAndWhereClause(pPickupPlaceID, "/api/Ports/LoadAll", "Select Port", "slPickupPlaceID", "Where 1=1 ", function (pData) {
            $("#slClientPlantID").html($("#slPickupPlaceID").html());
            $("#slPOLID_TransportID").html($("#slPickupPlaceID").html());
            $("#slClearancePortID").html($("#slPickupPlaceID").html());

            $("#slClientPlantID").val(pClientPlantID == 0 ? "" : pClientPlantID);
            $("#slPOLID_TransportID").val(pPOLID_TransportID == 0 ? "" : pPOLID_TransportID);
            $("#slClearancePortID").val(pClearancePortID == 0 ? "" : pClearancePortID);

        });


    }
    GetListWithCodeAndNameAndWhereClause(pPickupPlaceID, "/api/Ports/LoadAll", "Select Port", "slPickupPlaceID", "Where CountryID = " + pDefaults.CountryID, function (pData) {
        $("#slClientPlantID").html($("#slPickupPlaceID").html());
        $("#slPOLID_TransportID").html($("#slPickupPlaceID").html());
        $("#slClearancePortID").html($("#slPickupPlaceID").html());

        $("#slClientPlantID").val(pClientPlantID == 0 ? "" : pClientPlantID);
        $("#slPOLID_TransportID").val(pPOLID_TransportID == 0 ? "" : pPOLID_TransportID);
        $("#slClearancePortID").val(pClearancePortID == 0 ? "" : pClearancePortID);

    });
    $("#txtPickupAddress").val($(tr).find("td.PickupAddress").text());
    $("#txtDeliveryAddress").val($(tr).find("td.DeliveryAddress").text());
    $("#txtRoutingsExpirationDate").val(Date.prototype.compareDates("01/01/1900", ExpirationDate) < 1 ? "" : ConvertDateFormat(ExpirationDate));
    $("#txtRoutingsETAPOLDate").val($(tr).find("td.ETAPOLDate").text());
    $("#txtRoutingsETDDate").val($(tr).find("td.ETDDate").text());
    $("#txtRoutingsStuffingCutOfDate").val($(tr).find("td.StuffingCutOf").text());


    $("#txtRoutingsTransientTime").val($(tr).find("td.TransientTime").text());
    $("#txtRoutingsValidity").val($(tr).find("td.Validity").text());
    $("#txtRoutingsFreeTime").val($(tr).find("td.FreeTime").text());
    $("#txtRoutingsFreeTimePOD").val($(tr).find("td.FreeTimePOD").text());
    $("#txtRoutingsFreightRateFormat").val($(tr).find("td.FreightRateFormat").text());
    $("#txtRoutingsNotes").val($(tr).find("td.Notes").text());
    GetListWithOperationPartnerTypesCodeAndWhereClauseAndPartnerTypeAttr(null, "/api/NoAccessOperationPartnerTypes/LoadAll", "Select Partner Type", "slChargeOperationPartnerTypes", " WHERE ID NOT IN (" + constExporterOperationPartnerTypeID + "," + constBookingPartyOperationPartnerTypeID + "," + constOwnerOperationPartnerTypeID + "," + constClientOperationPartnerTypeID + "," + constNotify2OperationPartnerTypeID + "," + constImporterOperationPartnerTypeID + ") ORDER BY Code", null);

    $("#btnSaveRouting").attr("onclick", "Routings_Update(false);");

    $("#btnSaveandNewRouting").attr("onclick", "Routings_Update(true);");

    if (pDefaults.UnEditableCompanyName == "MED")
        $("#btn-QuotationApproval").attr("onclick", "QuotationApproval_GetUsers();");



    QuotationsEdit_SetPermissions();
}
function SetRoutingButtonsEnabled(IsEnable) {
    debugger;
    if (IsEnable) {
        $("#btnSaveRouting").removeAttr("disabled");
        $("#btnSaveandNewRouting").removeAttr("disabled");
        $("#btn-DeleteQuotationCharge").removeAttr("disabled");
        $("#btn-ApplyTemplateQuotationCharges").removeAttr("disabled");
        $("#btn-PricingCharges").removeAttr("disabled");
        $("#btn-QuotationsPackage").removeAttr("disabled");
        $("#btn-MultiRowEditQuotationCharges").removeAttr("disabled");
        if (pDefaults.UnEditableCompanyName != "MED")
            $("#btn-SendChargesAdded").removeAttr("disabled");
        $("#btn-RequestApproval").removeAttr("disabled");

    } else {
        // disable all
        $("#btnSaveRouting").attr("disabled", "disabled");
        $("#btnSaveandNewRouting").attr("disabled", "disabled");
        $("#btn-DeleteQuotationCharge").attr("disabled", "disabled");
        $("#btn-ApplyTemplateQuotationCharges").attr("disabled", "disabled");
        $("#btn-PricingCharges").attr("disabled", "disabled");
        $("#btn-QuotationsPackage").attr("disabled", "disabled");
        $("#btn-MultiRowEditQuotationCharges").attr("disabled", "disabled");
        $("#btn-SendChargesAdded").attr("disabled", "disabled");
        $("#btn-RequestApproval").attr("disabled", "disabled");

        $("#tblQuotationCharges tbody tr").removeAttr("ondblclick");
        $("#tblQuotationCharges tbody tr [href =#CopyChargeModal]").attr("disabled", "disabled");

    }
}
function setIsOpenedFromAlarm() {
    debugger;
    // I set IsOpenedFromAlarm here to false
    // because if the user came from the alarm, this tab #Routing is not clicked from the alarm
    // and I want IsOpenedFromAlarm to be true only the first time the user clicks the alarm that opens this form
    IsOpenedFromAlarm = false;
}
function Routings_ClearAllControls() {
    debugger;
    if (pDefaults.UnEditableCompanyName != "UNF") {
        $(".classHideForForwarding").addClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "NTMU") {
        $(".totalsCurr").text('');
    }
    ClearAll("#RoutingModal");

    $("#lblTotalGrossWeightInQuotationRouteFooter").html("");
    $("#lblTotalVolumeInQuotationRouteFooter").html("");
    $("#lblTotalVolumetricWeightInQuotationRouteFooter").html("");
    $("#lblChargeableWeightInQuotationRouteFooter").html("");
    $("#lblPackageTypesInQuotationRouteFooter").html("");
    $("#lblTotalContainerTypesInQuotationRouteFooter").html("");

    $("#tblQuotationCharges tbody").html("");
    $("#hQuotationRouteID").val("");
    var DefaultExpirationDays = 30;
    $("#txtRoutingsExpirationDate").val(TodaysDate.addDays(TodaysDate, DefaultExpirationDays));
    $("#txtRoutingsETAPOLDate").val(getTodaysDateInddMMyyyyFormat());
    //set to default values
    $("#cbIsOceanRouting").prop('checked', $("#cbIsOcean").prop("checked"));
    $("#cbIsAirRouting").prop('checked', $("#cbIsAir").prop("checked"));
    $("#cbIsInlandRouting").prop('checked', $("#cbIsInland").prop("checked"));
    Routings_TransportType_SetIconNameAndStyle();
    //Routings_EnableCbTransportType();
    //fill select boxes
    RoutingTypes_GetList(MainCarraigeRoutingTypeID, null);
    ////Routings_Countries_GetList(null, null, null);
    //$("#slRoutingsPOLCountries").html($("#slPOLCountries").html());
    //$("#slRoutingsPODCountries").html($("#slPODCountries").html());
    //if ($("#cbIsDomestic").prop("checked")) {
    //    $("#slRoutingsPOLCountries").val($("#hDefaultCountryID").val());
    //    $("#slRoutingsPODCountries").val($("#hDefaultCountryID").val());
    //    //$("#slRoutingsPOL").val($("#slRoutingsPOL option:contains(EG000)").val());
    //    //$("#slRoutingsPOD").val($("#slRoutingsPOD option:contains(EG000)").val());
    //}
    ////else {
    ////    $("#lblRoutingsPOL").html("POL");
    ////    $("#lblRoutingsPOD").html("POD");
    ////}
    GetListWithName(null, "/api/Countries/LoadAll", "Select Country", "slRoutingsPOLCountries"
        , function () {
            $("#slRoutingsPODCountries").html($("#slRoutingsPOLCountries").html());
            //$("#slRoutingsPODCountries").val(null);
            $("#slRoutingsPOLCountries").val($("#hDefaultCountryID").val());
            $("#slRoutingsPODCountries").val($("#hDefaultCountryID").val());
        });
    Routings_Ports_GetList(null, $("#hDefaultCountryID").val(), 1, function () {
        $("#slRoutingsPOD").html($("#slRoutingsPOL").html());
    });
    if (pDefaults.UnEditableCompanyName == "UNF") {
        GetListWithCodeAndNameAndWhereClause(null, "/api/Ports/LoadAll", "Select Port", "slPickupPlaceID", "Where 1=1 ", function (pData) {
            $("#slClientPlantID").html($("#slPickupPlaceID").html());
            $("#slPOLID_TransportID").html($("#slPickupPlaceID").html());
            $("#slClearancePortID").html($("#slPickupPlaceID").html());

        });
    } else {
        GetListWithCodeAndNameAndWhereClause(null, "/api/Ports/LoadAll", "Select Port", "slPickupPlaceID", "Where CountryID = " + pDefaults.CountryID, function (pData) {
            $("#slClientPlantID").html($("#slPickupPlaceID").html());
            $("#slPOLID_TransportID").html($("#slPickupPlaceID").html());
            $("#slClearancePortID").html($("#slPickupPlaceID").html());
        });
    }
    $("#slRoutingsLines").html($("#slLines").html());
    $("#slLines").val("");
    //Routings_EnableControlsForNewAdd();
    //Routings_ShowHideVessels();
    //Operation_cbPickupOrDeliveryChange();//to show hide Delivery and Pickup Cities according to checkboxes
    //PickupCity_GetList(item.PickupCityID, item.POLCountryID);
    //DeliveryCity_GetList(item.DeliveryCityID, item.PODCountryID);

    //if ($("#cbIsWarehousing").prop("checked"))
    //    $("#slMoveTypes").val($("#slMoveTypes option:Contains(WAREHOUSING)").val());

    MoveTypes_GetList(0, "slMoveTypes", function () {
        if ($("#cbIsWarehousing").prop("checked")) $("#slMoveTypes").val($("#slMoveTypes option:Contains(WAREHOUSING)").val());
    });
    //if (QACha && glbCallingControl != "QuotationsEdit_Approval") {
    //    $("#btn-SelectCharges").removeClass("hide");
    //    $("#btn-ApplyDefaultQuotationCharges").removeClass("hide");
    //    $("#btn-ApplyTemplateQuotationCharges").removeClass("hide");
    //} else {
    //    $("#btn-SelectCharges").addClass("hide");
    //    $("#btn-ApplyDefaultQuotationCharges").addClass("hide");
    //    $("#btn-ApplyTemplateQuotationCharges").addClass("hide");
    //}

    if (QDCha && glbCallingControl != "QuotationsEdit_Approval") $("#btn-DeleteQuotationCharge").removeClass("hide");
    else $("#btn-DeleteQuotationCharge").addClass("hide");

    GetListWithOperationPartnerTypesCodeAndWhereClauseAndPartnerTypeAttr(null, "/api/NoAccessOperationPartnerTypes/LoadAll", "Select Partner Type", "slChargeOperationPartnerTypes", " WHERE ID NOT IN (" + constExporterOperationPartnerTypeID + "," + constBookingPartyOperationPartnerTypeID + "," + constOwnerOperationPartnerTypeID + "," + constClientOperationPartnerTypeID + "," + constNotify2OperationPartnerTypeID + "," + constImporterOperationPartnerTypeID + ") ORDER BY Code", null);
    $("#btnSaveRouting").attr("onclick", "Routings_Insert(false);");
    $("#btnSaveandNewRouting").attr("onclick", "Routings_Insert(true);");

    // enable all buttons
    SetRoutingButtonsEnabled(true);

}

function Routings_TransportType_SetIconNameAndStyle() {
    if ($("#cbIsOceanRouting").prop('checked')) {
        $("#hRoutingTransportType").val(OceanTransportType);
        $("#hRoutingTransportIconName").val(OceanIconName);
        $("#hRoutingTransportIconStyle").val(strOceanIconStyleClassName);
        ////show section ShipmentType (FCL,LCL)
        //$("#secShipmentType").removeClass("hide");
        //$("#divOceanType").removeClass("hide");
        //$("#divInlandType").addClass("hide");
        ////set FCL as default
        //$("#cbIsFCL").prop('checked', true);
    }
    if ($("#cbIsAirRouting").prop('checked')) {
        $("#hRoutingTransportType").val(AirTransportType);
        $("#hRoutingTransportIconName").val(AirIconName);
        $("#hRoutingTransportIconStyle").val(strAirIconStyleClassName);
        ////hide section ShipmentType (FCL,LCL,FTL,LTL)
        //$("#secShipmentType").addClass("hide");
        ////uncheck all ShipmentTypes
        //$('input[name=cbShipmentType]').prop('checked', false);
    }
    if ($("#cbIsInlandRouting").prop('checked')) {
        $("#hRoutingTransportType").val(InlandTransportType);
        $("#hRoutingTransportIconName").val(InlandIconName);
        $("#hRoutingTransportIconStyle").val(strInlandIconStyleClassName);
        ////show section ShipmentType (FTL,LTL)
        //$("#secShipmentType").removeClass("hide");
        //$("#divOceanType").addClass("hide");
        //$("#divInlandType").removeClass("hide");
        ////set FTL as default
        //$("#cbIsFTL").prop('checked', true);
    }
}

function RoutingTypes_GetList(pID, callback) { //the first parameter is used in case of editing to set the code or name to its original value
    var pWhereClause = "";
    //pWhereClause = " WHERE ID NOT IN (SELECT R.RoutingTypeID From Routings R ";
    //pWhereClause += " 					WHERE R.OperationID = " + $('#hOperationID').val() + ")";
    //pWhereClause += (pID != null && pID != undefined ? " OR ID = " + pID : ""); //this is fill so i need to retreive the edited type too
    //pWhereClause += " ORDER BY ViewOrder ";

    pWhereClause = " WHERE ID <> (" + MainCarraigeRoutingTypeID + ")"; ////////////i get just 1 main carraige and any no of other routing types
    pWhereClause += (pID != null && pID != undefined ? " OR ID = " + pID : ""); //this is fill so i need to retreive the edited type too
    pWhereClause += " ORDER BY ViewOrder ";

    //parameters: ID, strFnName, First Row in select list, select list name, WhereClause
    //GetListWithRoutingTypesCodeAndWhereClauseAndPartnerTypeAttr(pID, "/api/NoAccessRoutingTypes/LoadAll", "Select Partner Type", "slRoutingTypes", pWhereClause);
    GetListWithNameAndWhereClause(pID, "/api/NoAccessRoutingTypes/LoadAll", "Select Route Type", "slRoutingTypes", pWhereClause
        , function () { //this callback inside the callback is to fill the slPartnerContacts
            if (callback != null && callback != undefined)
                callback();
        });
}

//fill slPOLCountries and slPODCountries
function Routings_Countries_GetList(pPOLCountryID, pPODCountryID, callback) {//pID is used in case of editing to set the code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pPOLCountryID, "/api/Countries/LoadAll", "Select Country", "slRoutingsPOLCountries");
    GetListWithName(pPODCountryID, "/api/Countries/LoadAll", "Select Country", "slRoutingsPODCountries");
}

//POLorPOD: 1-POL 2-POD
function Routings_Ports_GetList(pID, pCountryID, POLorPOD, pCallback) { //all the commented COMMAND lines are to remove the IsPort condition, if u wanna return it back again just remove the comments of commands and comment the beside command if exists
    //parameters: ID, strFnName, First Row in select list, select list name, pWhereClause
    debugger;
    var pWhereClause = "";
    if (pCountryID != null) //this means editing
    {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = " + pCountryID + " OR ( ID = " + pID + ") ";
        //pWhereClause = " where IsInactive = 0 and CountryID = " + pCountryID;
    } else //when changing the Country or Transport Type
    {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = ";
        //pWhereClause = " where IsInactive = 0 and CountryID = ";
        if (POLorPOD == 1) //POL
            pWhereClause += ($('#slRoutingsPOLCountries option:selected').val() == null || $('#slRoutingsPOLCountries option:selected').val() == ""
                ? 0 : $('#slRoutingsPOLCountries option:selected').val());
        else //POD
            pWhereClause += ($('#slRoutingsPODCountries option:selected').val() == null || $('#slRoutingsPODCountries option:selected').val() == ""
                ? 0 : $('#slRoutingsPODCountries option:selected').val());
        pWhereClause += " OR ( ID = " + pID + ") ";
    }
    //if ($('input[name=cbRoutingTransportType]:checked').val() == 1)
    //    pWhereClause += " and IsOcean = 1 ";
    //if ($('input[name=cbRoutingTransportType]:checked').val() == 2)
    //    pWhereClause += " and IsAir = 1 ";
    //if ($('input[name=cbRoutingTransportType]:checked').val() == 3)
    //    pWhereClause += " and IsInland = 1 ";

    pWhereClause += " order by Name ";
    if (POLorPOD == 1) //POL
        //GetListWithCodeAndWhereClause(pID, "/api/Ports/LoadAll", "Select POL", "slRoutingsPOL", pWhereClause);
        GetListWithCodeAndNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POL", "slRoutingsPOL", pWhereClause
            , function () {
                if ($("#cbIsDomestic").prop("checked") && pID == null) { // Domestic so set both countries the same
                    $("#slRoutingsPODCountries").val($("#slRoutingsPOLCountries").val());
                    $("#slRoutingsPOD").html($("#slRoutingsPOL").html());
                    $("#slRoutingsPOL").val($("#slRoutingsPOL option:contains(EG000)").val());
                    $("#slRoutingsPOD").val($("#slRoutingsPOD option:contains(EG000)").val());
                } else if (pCallback != null && pCallback != undefined) //if domestic then i already filled the POD
                    pCallback();
            }
            , ((pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV") && ($("#cbIsAir").prop("checked"))) ? 9 : null);
    else
        //GetListWithCodeAndWhereClause(pID, "/api/Ports/LoadAll", "Select POD", "slRoutingsPOD", pWhereClause);
        GetListWithCodeAndNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POD", "slRoutingsPOD", pWhereClause
            , function () {
                if (POLorPOD == 2 && $("#cbIsDomestic").prop("checked") && pID == null) { // Domestic so set both countries the same
                    $("#slRoutingsPOLCountries").val($("#slRoutingsPODCountries").val());
                    $("#slRoutingsPOL").html($("#slRoutingsPOD").html());
                    $("#slRoutingsPOL").val($("#slRoutingsPOL option:contains(EG000)").val());
                    $("#slRoutingsPOD").val($("#slRoutingsPOD option:contains(EG000)").val());
                }
            }
            , ((pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV") && ($("#cbIsAir").prop("checked"))) ? 9 : null);
}

function Routings_Lines_GetList(pID, callback) {
    //parameters: ID, strFnName, First Row in select list, select list name
    var strFnName = "";
    var str1stRow = "";
    var pWhereClause = " WHERE 1=1 ORDER BY Name ";
    if ($('input[name=cbRoutingTransportType]:checked').val() == 1
        || $('input[name=cbRoutingTransportType]:checked').val() == null) { //null is for case of first load
        strFnName = "/api/ShippingLines/LoadAll";
        str1stRow = "Select Shipping Line";
    }
    if ($('input[name=cbRoutingTransportType]:checked').val() == 2) {
        strFnName = "/api/Airlines/LoadAll";
        str1stRow = "Select Airline";
    }
    if ($('input[name=cbRoutingTransportType]:checked').val() == 3) {
        strFnName = "/api/Truckers/LoadAll";
        str1stRow = "Select Trucker";
    }
    if ($('input[name=cbRoutingTransportType]:checked').val() != 2)
        GetListWithNameAndWhereClause(pID, strFnName, str1stRow, "slRoutingsLines", pWhereClause);
    else {//incase of Air to get the prefic for MAWB
        GetListWithNameAndPrefixAttr(pID, strFnName, str1stRow, "slRoutingsLines", pWhereClause, null);
    }
    if (callback != null && callback != undefined) {
        callback();
    }
}

function Fill_slChargeBillTo(pRoutingID) {
    debugger;
    var OptionsList = `<option value=''><--Select--></option>`;
    if (pEditedQuotation_General.ShipperID != 0) {
        OptionsList += `<option value='${pEditedQuotation_General.ShipperID}' operationpartnertypeid='1'>SHIPPER: ${pEditedQuotation_General.ShipperName}</option>`;
    }
    if (pEditedQuotation_General.ConsigneeID != 0) {
        OptionsList += `<option value='${pEditedQuotation_General.ConsigneeID}' operationpartnertypeid='2'>CONSIGNEE: ${pEditedQuotation_General.ConsigneeName}</option>`;
    }
    if (pEditedQuotation_General.AgentID != 0) {
        OptionsList += `<option value='${pEditedQuotation_General.AgentID}' operationpartnertypeid='6'>AGENT: ${pEditedQuotation_General.AgentName}</option>`;
    }

    let RoutingTransportType = $("#tblRoutings tbody #" + pRoutingID + " .TransportType").attr('val');
    let LineCode = '';
    let LineOperationPartnerTypeID = '';
    if (RoutingTransportType == 1) { LineCode = "SH LINE"; LineOperationPartnerTypeID = 9; }
    if (RoutingTransportType == 2) { LineCode = "AIRLINE"; LineOperationPartnerTypeID = 10; }
    if (RoutingTransportType == 3) { LineCode = "TRUCKER"; LineOperationPartnerTypeID = 11; }
    let LineID = $("#tblRoutings tbody #" + pRoutingID + " .Line").attr('val');
    let LineName = $("#tblRoutings tbody #" + pRoutingID + " .Line").text().trim();
    OptionsList += `<option value='${LineID}' operationpartnertypeid='${LineOperationPartnerTypeID}'>${LineCode}: ${LineName}</option>`;

    $("#slChargeBillTo").html(OptionsList)
}
/*OnChangeFunctions*/

//used to make sure that if MainCarraigeRoutingType is selected then the transportType cant be changed from whats in the operations table
function Routings_RoutingTypeChanged() {
    debugger;
    Routings_EnableDisableLines();
    $("#lblRoutingShown").html(": " + $("#slRoutingTypes option:selected").text());
    if ($("#slRoutingTypes option:selected").val() == MainCarraigeRoutingTypeID) {
        //if in the future i allowed changing transport type then i have to update FCL, LCL, FTL, LTL too
        Routings_SetCbRoutingTransportType($("#hTransportType").val());
        $("#hRoutingTransportType").val($("#hTransportType").val());
        Routings_TransportTypeChanged();
        Routings_DisableCbTransportType();
    } else
        Routings_EnableCbTransportType();
}

function Routings_TransportTypeChanged(pDontRefillList) {
    //set Ocean as the default Choice
    $("#hRoutingTransportType").val($('input[name=cbRoutingTransportType]:checked').val());
    Routings_TransportType_SetIconNameAndStyle();
    //Routings_Ports_GetList(null, null, 1);
    //Routings_Ports_GetList(null, null, 2);
    Routings_Lines_GetList(null, null);
}

/*EOF OnChangeFunctions*/
function Routings_DisableCbTransportType() {
    $("#secTransportType").addClass("hide"); //Islam asked to this section not disable
    $("#cbIsOceanRouting").attr('disabled', 'disabled');
    $("#cbIsAirRouting").attr('disabled', 'disabled');
    $("#cbIsInlandRouting").attr('disabled', 'disabled');
}

function Routings_EnableCbTransportType() {
    $("#secTransportType").removeClass("hide"); //Islam asked to this section not disable
    $("#cbIsOceanRouting").removeAttr('disabled');
    $("#cbIsAirRouting").removeAttr('disabled');
    $("#cbIsInlandRouting").removeAttr('disabled');
}

function Routings_EnableDisableLines() {
    if ($("#slRoutingTypes").val() == MainCarraigeRoutingTypeID && $("#hBLType").val() == constHouseBLType) {
        $("#slRoutingsLines").attr("disabled", "disabled");
        $("#slRoutingsLines").val("");
    } else
        $("#slRoutingsLines").removeAttr("disabled");
}

function Routings_SetCbRoutingTransportType(pOptionToSelect) {
    if (pOptionToSelect == OceanTransportType) {
        $("#cbIsOceanRouting").prop('checked', true);
        $("#cbIsAirRouting").prop('checked', false);
        $("#cbIsInlandRouting").prop('checked', false);
    }
    if (pOptionToSelect == AirTransportType) {
        $("#cbIsOceanRouting").prop('checked', false);
        $("#cbIsAirRouting").prop('checked', true);
        $("#cbIsInlandRouting").prop('checked', false);
    }
    if (pOptionToSelect == InlandTransportType) {
        $("#cbIsOceanRouting").prop('checked', false);
        $("#cbIsAirRouting").prop('checked', false);
        $("#cbIsInlandRouting").prop('checked', true);
    }
}

//Set MainCarraigeRoutingType Always not to be deleted
function Routings_SetTableProperties() {
    //in case of connected prevent deleting Main Route
    //if ($("#hNumberOfHousesConnected").val() > 0 || $("#hMasterOperationID").val() > 0) {
    $("#tblRoutings tr[val=" + MainCarraigeRoutingTypeID.toString() + "] input:checkbox").attr("disabled", "disabled");
    $("#tblRoutings tr[val=" + MainCarraigeRoutingTypeID.toString() + "] input:checkbox").removeAttr("checked");
    //}
    //else
    //    $("#tblRoutings tr[val=" + MainCarraigeRoutingTypeID.toString() + "] input:checkbox").removeAttr("disabled");
}

function Routings_EnablePorts() {
    $("#slRoutingsPOLCountries").removeAttr("disabled");
    $("#slRoutingsPODCountries").removeAttr("disabled");
    $("#slRoutingsPOL").removeAttr("disabled");
    $("#slRoutingsPOD").removeAttr("disabled");
}

function Routings_DisablePorts() {
    $("#slRoutingsPOLCountries").attr("disabled", "disabled");
    $("#slRoutingsPODCountries").attr("disabled", "disabled");
    $("#slRoutingsPOL").attr("disabled", "disabled");
    $("#slRoutingsPOD").attr("disabled", "disabled");
}

function Routings_EnableLines() {
    $("#slRoutingsLines").removeAttr("disabled");
}

function Routings_DisableLines() {
    $("#slRoutingsLines").attr("disabled", "disabled");
}

function Routings_EnableControlsForNewAdd() {
    $("#slRoutingTypes").removeAttr("disabled");
    Routings_EnablePorts();
    Routings_EnableLines();
}
function OperationCharges_RequestApproval(ApprovalLevel) {
    debugger;
    if (!CheckValueIsValidInput('#slOperation')) {
        swal("Sorry", "Please Select Operation");
        return;
    }
    Receptionists_GetAvailableUsers();
    $("#btnCheckboxesListApply").attr("onclick", "SendApprovalNotification(" + ApprovalLevel + ");");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Apply");
    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers();");
}
function SendApprovalNotification(ApprovalLevel) {
    debugger;
    var pSelectedAlarmReceiversIDs = GetAllSelectedIDsAsStringWithNameAttr("cbAddedItemID");
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/Quotations/SendChargeEditApprovalRequest",
        {
            pAlarmReceiversIDs: pSelectedAlarmReceiversIDs,
            pQuotationRouteID: $("#hQuotationRouteID").val(),
            pRequstedApprovalLevel: ApprovalLevel,
            pOperationID: $('#slOperation').val()
        },
        function (pData) {
            debugger;
            let pReturnedMessage = pData[0];
            let pMailMessageReturned = pData[1];
            let pQuotationRoute = JSON.parse(pData[2]);
            if (pReturnedMessage != "")
                swal("Sorry", pReturnedMessage);
            //else if (pMailMessageReturned != "")
            //    swal("Alarm sent, but email is not sent", pMailMessageReturned);
            else {
                if (pDefaults.UnEditableCompanyName == "MED") {
                    jQuery("#UpdateOperationModal").modal("hide");
                }
                swal("Success", "Saved successfully.");
            }
            Routings_BindTableRows(pQuotationRoute);
            FadePageCover(false);
        })
}
function OperationCharges_ConfirmApproval(ApprovalLevel) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "MED" && ApprovalLevel == 3 && ($("#tblReceivables tbody tr").toArray().length == 0 && $("#tblPayables tbody tr").toArray().length == 0)) {
        swal("Sorry", "Please View the Payables and Receivables First to Approve");
        return;
    }
    CallGETFunctionWithParameters("/api/Quotations/ChargeEditConfirmApproval",
        {
            pQuotationRouteID: $("#hQuotationRouteID").val(),
            pSetApprovalLevel: ApprovalLevel,
            pIsConfirmed: true,
            pRejectionReason: "ABC"
        },
        function (pData) {
            debugger;
            let pReturnedMessage = pData[0];
            let pMailMessageReturned = pData[1];
            let pQuotationRoute = JSON.parse(pData[2]);
            if (pReturnedMessage != "")
                swal("Sorry", pReturnedMessage);
            //else if (pMailMessageReturned != "")
            //    swal("Alarm sent, but email is not sent", pMailMessageReturned);
            else {
                if (pDefaults.UnEditableCompanyName == "MED" && ApprovalLevel < 3) {
                    OperationCharges_RequestApproval((Number(ApprovalLevel) + 1));
                } else if (pDefaults.UnEditableCompanyName == "MED" && ApprovalLevel == 3) {
                    let hasError = true;
                    CallGETFunctionWithParameters("/api/ReceivablesDraft/UpdateReceivablesFromReceivableDrafts", { pReceivableDraftIDs: $("#tblReceivables tbody tr").toArray().map(item => item.id).join(","), pT: false, pR: false }, function (pData) {
                        if (pData[0] == true) {
                            hasError = false;
                            //swal("Success", "Operation receivables saved successfully");
                        } else {
                            swal("Sorry", "Error.");
                        }
                    }, null, false);
                    if (!hasError) {
                        CallGETFunctionWithParameters("/api/PayablesDraft/UpdatePayablesFromPayableDrafts", { pPayableDraftIDs: $("#tblPayables tbody tr").toArray().map(item => item.id).join(","), pT: false, pR: false }, function (pData) {
                            if (pData[0] == true) {
                                hasError = false;
                                jQuery("#UpdateOperationModal").modal("hide");

                                Receptionists_GetAvailableUsers(getMedUsersWhereClause());
                                $("#btnCheckboxesListApply").attr("onclick", "SendThirdApprovalConfirm();");
                                $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Apply");
                                $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers(getMedUsersWhereClause());");
                                swal("Success", "Operation receivables and payables updated successfully");
                            } else {
                                swal("Sorry", "Error.");
                            }
                        }, null, false);
                    }
                }
                else
                    swal("Success", "Saved successfully.");
            }
            Routings_BindTableRows(pQuotationRoute);
            FadePageCover(false);
        })
}
function Routings_UpdateOperationFromQuotation(pQuotationRouteID) {
    debugger;
    jQuery("#UpdateOperationModal").modal("show");
    if (pDefaults.UnEditableCompanyName == "MED") {
        $("#btnApplyQuotationChargesToOperation").addClass("hide");
        $("#btnApplyQuotationPackagesToOperation").addClass("hide");
        $("#btnApplyQuotationRoutingsToOperation").addClass("hide");
        $("#btnPrintQuotationRouteChargesWithApprovals").addClass("hide");
        $("#btn-MultiRowEditReceivables").addClass("hide");
        $("#btn-MultiRowEditPayables").addClass("hide");

        

        CallGETFunctionWithParameters("api/Quotations/GetChargeEditApprovalRequested", { QuotationRouteID: pQuotationRouteID, pT: false, pR: false }, function (pData) {
            if (pData == true) {
                $("#btn-AddReceivables").attr("disabled", "disabled");
                $("#btn-AddPayables").attr("disabled", "disabled");
                isChargesEditRequested = true;
                let operationID = $('#tblRoutings tbody tr[ID=' + pQuotationRouteID + '] td.FreightRateFormat').text();
                if (pDefaults.UnEditableCompanyName == "MED" && glbCallingControl == "QuotationsEdit") {
                    if (operationID != "" && operationID != 0) {
                        $('#slOperation').val(operationID);
                        $('#slOperation option').not(':selected').prop('disabled', true);
                    } else if ($('#slOperation option').length > 1) {
                        var lastOptionValue = $('#slOperation option:last').val();
                        $('#slOperation').val(lastOptionValue);
                        $('#slOperation option').not(':selected').prop('disabled', true);
                    }
                }
            } else {
                $("#btn-AddReceivables").removeAttr("disabled");
                $("#btn-AddPayables").removeAttr("disabled");
                isChargesEditRequested = false;
            }
        }, null, false);

        CallGETFunctionWithParameters("/api/Quotations/GetChargeEditApprovals", { QuotationRouteID: pQuotationRouteID }, function (pChargeEditApprovalLevel) {
            debugger;
            let approvalLevel = pChargeEditApprovalLevel;
            if (glbCallingControl == "QuotationsEdit_Approval") {
                switch (pChargeEditApprovalLevel) {
                    case 0:
                        $("#btnConfirm1stApproval").removeClass("hide");
                        $("#btnRequest1stApproval").addClass("hide");
                        break;
                    case 1:
                        $("#btnRequest2ndApproval").addClass("hide");
                        $("#btnConfirm2ndApproval").removeClass("hide");
                        if (pDefaults.UnEditableCompanyName == "MED") {
                            $("#btnPrintQuotationRouteChargesWithApprovals").removeClass("hide");
                        }
                        break;
                    case 2:
                        $("#btnRequest3rdApproval").addClass("hide");
                        $("#btnConfirm3rdApproval").removeClass("hide");
                        if (pDefaults.UnEditableCompanyName == "MED") {
                            $("#btnPrintQuotationRouteChargesWithApprovals").removeClass("hide");
                        }
                        break;
                    case 3:
                        if (pDefaults.UnEditableCompanyName == "MED") {
                            $("#btnRequest4thApproval").addClass("hide");
                            $("#btnConfirm4thApproval").addClass("hide");
                        }
                        else {
                            $("#btnRequest4thApproval").addClass("hide");
                            $("#btnConfirm4thApproval").removeClass("hide");
                        }
                        break;
                }
            }
            else {
                switch (pChargeEditApprovalLevel) {
                    case 0:
                        $("#btnRequest1stApproval").removeClass("hide");
                        $("#btnRequest2ndApproval").addClass("hide");
                        $("#btnRequest3rdApproval").addClass("hide");
                        $("#btnRequest4thApproval").addClass("hide");
                        break;
                    case 1:
                        $("#btnRequest1stApproval").addClass("hide");
                        $("#btnRequest2ndApproval").removeClass("hide");
                        $("#btnRequest3rdApproval").addClass("hide");
                        $("#btnRequest4thApproval").addClass("hide");
                        if (pDefaults.UnEditableCompanyName == "MED") {
                            $("#btnPrintQuotationRouteChargesWithApprovals").removeClass("hide");
                        }
                        break;
                    case 2:
                        $("#btnRequest1stApproval").addClass("hide");
                        $("#btnRequest2ndApproval").addClass("hide");
                        $("#btnRequest3rdApproval").removeClass("hide");
                        $("#btnRequest4thApproval").addClass("hide");
                        if (pDefaults.UnEditableCompanyName == "MED") {
                            $("#btnPrintQuotationRouteChargesWithApprovals").removeClass("hide");
                        }
                        break;
                    case 3:
                        if (pDefaults.UnEditableCompanyName == "MED") {
                            $("#btnRequest1stApproval").addClass("hide");
                            $("#btnRequest2ndApproval").addClass("hide");
                            $("#btnRequest3rdApproval").addClass("hide");
                            $("#btnRequest4thApproval").addClass("hide");
                            //$("#btnApplyQuotationChargesToOperation").removeClass("hide");
                            //$("#btnApplyQuotationRoutingsToOperation").removeClass("hide");
                            $("#btnPrintQuotationRouteChargesWithApprovals").removeClass("hide");
                        }
                        else {
                            $("#btnRequest1stApproval").addClass("hide");
                            $("#btnRequest2ndApproval").addClass("hide");
                            $("#btnRequest3rdApproval").addClass("hide");
                            $("#btnRequest4thApproval").removeClass("hide");
                        }
                        break;
                    case 4:
                        $("#btnRequest1stApproval").addClass("hide");
                        $("#btnRequest2ndApproval").addClass("hide");
                        $("#btnRequest3rdApproval").addClass("hide");
                        $("#btnRequest4thApproval").addClass("hide");
                        $("#btnApplyQuotationChargesToOperation").removeClass("hide");
                        $("#btnApplyQuotationPackagesToOperation").removeClass("hide");
                        $("#btnApplyQuotationRoutingsToOperation").removeClass("hide");
                        $("#btnPrintQuotationRouteChargesWithApprovals").removeClass("hide");
                        break;
                }
            }
            CallGETFunctionWithParameters("/api/LocalEmails/LoadAll", { pWhereClause: "WHERE Body like 'Charge Edit Approval Request of level %' AND EmailSource=80 AND QuotationRouteID=" + pQuotationRouteID + " AND ReceiverUserID=" + $('#hLoggedUserID').val() }, function (pData) {
                debugger;
                let emails = JSON.parse(pData[0]);
                if (emails.length == 0) {
                    $("#btnConfirm1stApproval").addClass("hide");
                    $("#btnConfirm2ndApproval").addClass("hide");
                    $("#btnConfirm3rdApproval").addClass("hide");
                    $("#btnConfirm4thApproval").addClass("hide");
                    $("#btnCancelEditsApprovalRequest").addClass("hide");
                } else {
                    const email = emails.reduce((max, current) => {
                        return (current.ID > max.ID) ? current : max;
                    });
                    let match = email.Body.match(/Charge Edit Approval Request of level (\d+)/);
                    if (match) {
                        const levelNumber = parseInt(match[1]);
                        switch (levelNumber) {
                            case 1:
                                $("#btnConfirm2ndApproval").addClass("hide");
                                $("#btnConfirm3rdApproval").addClass("hide");
                                $("#btnConfirm4thApproval").addClass("hide");
                                break;
                            case 2:
                                $("#btnConfirm1stApproval").addClass("hide");
                                $("#btnConfirm3rdApproval").addClass("hide");
                                $("#btnConfirm4thApproval").addClass("hide");
                                break;
                            case 3:
                                $("#btnConfirm1stApproval").addClass("hide");
                                $("#btnConfirm2ndApproval").addClass("hide");
                                $("#btnConfirm4thApproval").addClass("hide");
                                break;
                            default:
                                $("#btnConfirm1stApproval").addClass("hide");
                                $("#btnConfirm2ndApproval").addClass("hide");
                                $("#btnConfirm3rdApproval").addClass("hide");
                                $("#btnConfirm4thApproval").addClass("hide");
                                $("#btnCancelEditsApprovalRequest").addClass("hide");
                                break;
                        }
                    } else {
                        $("#btnConfirm1stApproval").addClass("hide");
                        $("#btnConfirm2ndApproval").addClass("hide");
                        $("#btnConfirm3rdApproval").addClass("hide");
                        $("#btnConfirm4thApproval").addClass("hide");
                        $("#btnCancelEditsApprovalRequest").addClass("hide");
                    }

                }
            }, null, false);
        })
    }
    $("#hQuotationRouteID").val(pQuotationRouteID);

    if (pDefaults.UnEditableCompanyName == "MED" && isChargesEditRequested) {
        $("#btnCancelEditsApprovalRequest").removeClass("hide");
        $("#btnCancelEditsApprovalRequest").attr("onclick", "CancelEditsApprovalRequest(" + pQuotationRouteID + ");");
    } else if (pDefaults.UnEditableCompanyName == "MED" && !isChargesEditRequested) {
        $("#btnCancelEditsApprovalRequest").addClass("hide");
    }
    if (IsMESCOCompany) {
        $(".classShowForMESCO").removeClass("hide");
    }
    //fill slOperation
    //GetListWithCodeAndWhereClause(null, "/api/Operations/LoadAll", null, "slOperation", " WHERE OperationStageID NOT IN (" + ClosedQuoteAndOperStageID + "," + CancelledQuoteAndOperStageID + ") AND CreationDate > DATEADD(mm,DATEDIFF(mm,0,GETDATE())-3,0) ", null);
    let operationID = $('#tblRoutings tbody tr[ID=' + pQuotationRouteID + '] td.FreightRateFormat').text();

    let whereClause = " WHERE QuotationRouteID = " + $("#hQuotationRouteID").val() + " AND OperationStageID NOT IN (" + ClosedQuoteAndOperStageID + "," + CancelledQuoteAndOperStageID + ") ";
    let selected = CheckValueIsValidInput('#slOperation') ? $('#slOperation').val() : 0;
    GetListWithCodeAndWhereClause(null, "/api/Operations/LoadAll", "<--Select-->", "slOperation", whereClause, function () {
        if (pDefaults.UnEditableCompanyName == "MED" && glbCallingControl == "QuotationsEdit_Approval") {
            if (operationID != "" && operationID != 0) {
                $('#slOperation').val(operationID);
                $('#slOperation option').not(':selected').prop('disabled', true);
            } else if ($('#slOperation option').length > 1) {
                var lastOptionValue = $('#slOperation option:last').val();
                $('#slOperation').val(lastOptionValue);
                $('#slOperation option').not(':selected').prop('disabled', true);
            }
        } else if (pDefaults.UnEditableCompanyName == "MED" && selected > 0) {
            $('#slOperation').val(selected);
            $('#slOperation option').not(':selected').prop('disabled', true);
        }
    });
}

function Routings_ActionRequiredChanged() {
    debugger;
}

/****************************************OperationCharges Fns**********************************************/
function OperationCharges_FillModal() {
    debugger;
    if (glbFormCalled == "OperationsPayablesAndReceivables") {
        $("#slOperation").html($("#slFilterOperation").html());
        $("#slOperation").val($("#slFilterOperation").val());
        $("#OperationChargeModal").removeClass("hide");
    }
    if ($("#slOperation").val() == "")
        swal("Sorry", "Please, select an operation.");
    else {
        jQuery("#OperationChargeModal").modal("show");
        FadePageCover(true);
        $("#tblPayables tbody").html("");
        $("#tblReceivables tbody").html("");
        $("#lblOperationChargeShown").html(": " + $("#slOperation option:selected").text());



        if (pDefaults.UnEditableCompanyName == "MED") {

            $("#btn-DeleteReceivable").addClass("hide");
            $("#btn-DeletePayable").addClass("hide");
        }

        CallGETFunctionWithParameters("api/QuotationCharges/GetOperationPayablesAndReceivables"
            , {
                pOperationID: $("#slOperation").val()
                , pQuotationRouteID: $("#hQuotationRouteID").val()
                , pOperationVehicleID: 0
                , pTruckingOrderID: 0
                , pCodeSearch: 0
            }
            , function (pData) {
                if (pData[0]) {
                    var pPayables = JSON.parse(pData[1]);
                    var pReceivables = JSON.parse(pData[2]);
                    if (pDefaults.UnEditableCompanyName == "MED") {
                        let receivablesIDs = pReceivables.map(item => item.ID);
                        receivablesIDs = receivablesIDs.join(",");
                        let payablesIDs = pPayables.map(item => item.ID);
                        payablesIDs = payablesIDs.join(",");
                        let hasError = true;
                        CallGETFunctionWithParameters("api/ReceivablesDraft/InsertDraftReceivableFromReceivable", { pReceivablesIDs: receivablesIDs, pT: false }, function (data) {

                            if (data[0] == true) {
                                hasError = false;
                            } else {
                                hasError = true;
                                swal("Sorry", "Error Happened.");
                            }

                        }, null, false);
                        //hasError = true;
                        if (hasError == false) {
                            CallGETFunctionWithParameters("api/PayablesDraft/InsertDraftPayableFromPayable", { pPayablesIDs: payablesIDs, pT: false }, function (data) {

                                if (data[0] == true) {
                                    hasError = false;
                                } else {
                                    hasError = true;
                                    swal("Sorry", "Error Happened.");
                                }

                            }, null, false);
                        }

                        if (hasError == false) {
                            CallGETFunctionWithParameters("api/ReceivablesDraft/GetOperationDraftPayablesAndReceivables", {
                                pOperationID: $("#slOperation").val()
                                , pQuotationRouteID: $("#hQuotationRouteID").val()
                                , pOperationVehicleID: 0
                                , pTruckingOrderID: 0
                                , pCodeSearch: 0
                            }, function (pData) {
                                var pPayables = JSON.parse(pData[1]);
                                var pReceivables = JSON.parse(pData[2]);
                                PayablesDraft_BindTableRows(pPayables);
                                ReceivablesDraft_BindTableRows(pReceivables);
                            }, null);
                        }
                        debugger;
                    } else {
                        Payables_BindTableRows(pPayables);
                        Receivables_BindTableRows(pReceivables);
                    }
                } else
                    swal("Sorry", "Connection failed, please try again later.");
                FadePageCover(false);
            }
            , null);
    }
}

function ApplyQuotationRoutingsToOperation() {
    debugger;
    if ($("#slOperation").val() == "")
        swal("Sorry", "Please, select operation");
    else swal({
        title: "Are you sure?",
        text: "Operation routes will be updated to the default quotation routes.",
        type: "",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, apply",
        closeOnConfirm: false
    },
        function () {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/QuotationCharges/ApplyQuotationRoutingsToOperation"
                , {
                    pGeneratingQRID: $("#hQuotationRouteID").val()
                    , pOperationID_Routings: $("#slOperation").val()
                }
                , function (pData) {
                    pReturnedMessage = pData[0]
                    if (pReturnedMessage == "")
                        swal("Success", "Done successfully");
                    else
                        swal("Sorry", pReturnedMessage);
                    FadePageCover(false);
                });
        });
}
function ApplyQuotationPackagesToOperation() {
    debugger;
    if ($("#slOperation").val() == "")
        swal("Sorry", "Please, select operation");
    else swal({
        title: "Are you sure?",
        text: "Operation Packages will be updated to the default quotation charges.",
        type: "",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, apply",
        closeOnConfirm: false
    },
        function () {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/QuotationCharges/ApplyQuotationPackagesToOperation"
                , {
                    pGeneratingQRID: $("#hQuotationRouteID").val()
                    , pOperationID: $("#slOperation").val()
                }
                , function (pData) {
                    pReturnedMessage = pData[0]
                    if (pReturnedMessage == "")
                        swal("Success", "Done successfully");
                    else
                        swal("Sorry", pReturnedMessage);
                    FadePageCover(false);
                });
        });
}
function ApplyQuotationChargesToOperation() {
    debugger;
    if ($("#slOperation").val() == "")
        swal("Sorry", "Please, select operation");
    else swal({
        title: "Are you sure?",
        text: "Operation Payables & Receivables will be updated to the default quotation charges.",
        type: "",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, apply",
        closeOnConfirm: false
    },
        function () {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/QuotationCharges/ApplyQuotationChargesToOperation"
                , {
                    pGeneratingQRID: $("#hQuotationRouteID").val()
                    , pOperationID: $("#slOperation").val()
                }
                , function (pData) {
                    pReturnedMessage = pData[0]
                    if (pReturnedMessage == "")
                        swal("Success", "Done successfully");
                    else
                        swal("Sorry", pReturnedMessage);
                    FadePageCover(false);
                });
        });
}
/******************Payables**************************/
function Payables_BindTableRows(pPayables) {
    ClearAllTableRows("tblPayables");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPayables, function (i, item) {

        AppendRowtoTable("tblPayables",
            //("<tr ID='" + item.ID + "' " + (OEPay && $("#hIsOperationDisabled").val() == false ? ("ondblclick='Payables_EditByDblClick(" + item.ID + ");'") : "") + ">"
            ("<tr ID='" + item.ID + "' " + (OEPay && item.AccNoteID == 0 && item.IsApproved == 0 ? ("ondblclick='Payables_EditByDblClick(" + item.ID + ");'") : "") + (item.IsApproved ? " class='text-primary' " : "") + ">"
                + "<td class='PayableID'> <input " + (item.IsApproved == 0 && item.AccNoteID == 0 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
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
    if (pDefaults.UnEditableCompanyName == "MED") {
        $("#btnSelectChargesApply").attr("onclick", "PayablesDraft_InsertListWithoutValues(false);");
    } else {
        $("#btnSelectChargesApply").attr("onclick", "Payables_InsertListWithoutValues(false);");
    }
}

function Payables_EditByDblClick(pID) {
    jQuery("#EditPayableModal").modal("show");
    Payables_FillControls(pID);
}

function Payables_FillControls(pID) {
    ClearAll("#EditPayableModal");
    if (pDefaults.UnEditableCompanyName == "GBL") {
        $(".classShowForGBL").removeClass("hide");
    }
    $("#hPayableID").val(pID);
    FadePageCover(true);
    var tr = $("#tblPayables tr[ID='" + pID + "']");
    var pPOrCID = $(tr).find("td.PayablePOrC").attr('val');
    var pPartnerSupplierID = $(tr).find("td.PayableSupplier").attr('val');
    var pUOMID = $(tr).find("td.PayableUOM").attr('val');
    var pCurrencyID = $(tr).find("td.PayableCurrency").attr('val');
    var pOperationID = $(tr).find("td.PayableOperation").attr('val');
    var pBillID = $(tr).find("td.PayableBillID").text();
    var pSupplierSiteID = $(tr).find("td.SupplierSiteID").text();

    var pTaxTypeID = $(tr).find("td.PayableTaxTypeID").attr('val');
    var pDiscountTypeID = $(tr).find("td.PayableDiscountTypeID").attr('val');


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
            pWhereClause: " WHERE MasterOperationID = " + pOperationID,
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

function Payables_MultiRowEdit() {
    debugger;
    var pStrFnName = "/api/Payables/LoadAll";
    var pDivName = "divSelectCharges";//div name to be filled
    var ptblModalName = "tblModalPayables";
    var pCheckboxNameAttr = "cbSelectPayables";
    var pWhereClause = "";
    $("#" + pDivName).html("");
    pWhereClause += " WHERE OperationID = " + $("#slOperation").val();
    pWhereClause += ($("#hQuotationRouteID").val() == 0 ? "" : " AND GeneratingQRID = " + $("#hQuotationRouteID").val());
    pWhereClause += " AND ( ChargeTypeCode LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    //pWhereClause += "                ORDER BY ChargeTypeName ";

    FillPayablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, false //pIsInsert
        , function () {
            HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
        });

    $("#btn-SearchCharges").attr("onclick", "Payables_MultiRowEdit();");
    $("#btnSelectChargesApply").attr("onclick", "Payables_UpdateList(false);");
}

function PayableSuppliers_GetList(pID, pSlName, pCallback) {
    var pWhereClause = " WHERE OperationID = " + $("#slOperation").val();
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

function Payables_CurrencyChanged() {
    $("#txtPayableExchangeRate").val($("#slPayableCurrency option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slPayableCurrency").val())
        $("#txtPayableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtPayableExchangeRate").removeAttr("disabled");
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
            pOperationID: $("#slOperation").val()
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

function Payables_InsertListWithoutValues(pSaveandAddNew) {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectPayables");//returns string array of IDs
    debugger;
    if (pSelectedIDs != "")
        InsertSelectedCheckboxItems("/api/Payables/InsertListWithoutValues"
            , {
                pOperationID: $("#slOperation").val(),
                pSelectedIDs: pSelectedIDs,
                pQuotationRouteID: $("#hQuotationRouteID").val()
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

function Payables_PayableSupplierInvoiceOrReceiptNoChanged(pSupplierControl, pSupplierInvoiceControlID, pSupplierReceiptControlID) { //pSupplierControl is a control not ID so dont use #
    debugger;
    //if ($(pSupplierInvoiceControlID).val() == "" && $(pSupplierReceiptControlID).val() == "") {
    if ($(pSupplierInvoiceControlID).val() == "") {
        $(pSupplierControl).removeAttr("disabled");
    } else {
        $(pSupplierControl).attr("disabled", "disabled");
    }
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

//if not insert (i.e. update then all will rows will be selected)
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

//to handle change of currency in the multi row edit modal
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

function Payables_txtTblModalCostAmount_Changed(pRowID, pIsInsert) {
    if (pIsInsert) { //if not insert then all IDs will be updated
        var varPayableCostAmount = $("#tblModalPayables tr[ID='" + pRowID + "']").find('input[name=txtTblModalPayableCostAmount]').val();
        if (varPayableCostAmount != 0 && varPayableCostAmount != "")
            $("#tblModalPayables tr[ID='" + pRowID + "']").find('input[name=cbSelectPayables]').prop("checked", true);
        else
            $("#tblModalPayables tr[ID='" + pRowID + "']").find('input[name=cbSelectPayables]').prop("checked", false);
    }
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
                        pPayablesIDs: GetAllSelectedIDsAsString('tblPayables'), pOperationID: $("#slOperation").val()
                    }
                    , function () {
                        OperationCharges_FillModal();
                    });
            });
    //DeleteListFunction("/api/Payables/Delete", { "pPayablesIDs": GetAllSelectedIDsAsString('tblPayables') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
}

/******************************************Get Suppliers Sites******************************************/
//function FillSupplierSites(pID) {
//    debugger;
//    if (pDefaults.UnEditableCompanyName == "GBL") {
//        var pWhereClause = "WHERE SupplierID= " + $('#slPayableSupplier option:selected').attr("partnerid");
//        if ($('#slPayableSupplier option:selected').attr("partnertypeid") != '8')
//            pWhereClause = "Where 1=0";

//        CallGETFunctionWithParameters("/api/Suppliers/LoadSupplierSites"
//        , { pWhereClause: pWhereClause }
//        , function (pData) {
//            FillListFromObject(pID, 2, TranslateString("SelectFromMenu"), "slSites", pData[0], null);
//        }
//        , null);
//    }
//}
/******************Receivables**************************/
function Receivables_BindTableRows(pReceivables) {
    ClearAllTableRows("tblReceivables");
    debugger;
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pReceivables, function (i, item) {
        AppendRowtoTable("tblReceivables",
            //("<tr ID='" + item.ID + "' " + (item.InvoiceID == 0 && OERec && $("#hIsOperationDisabled").val() == false ? "ondblclick='Receivables_EditByDblClick(" + item.ID + ");'>" : ">")
            ("<tr ID='" + item.ID + "' " + (item.InvoiceID == 0 && item.AccNoteID == 0 && OERec ? "ondblclick='Receivables_EditByDblClick(" + item.ID + ");'>" : ">")
                + "<td class='ReceivableID'> <input " + (item.InvoiceID == 0 && item.AccNoteID == 0 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
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

function Receivables_MultiRowEdit() {
    debugger;
    //ClearAll("#SelectChargesModal"); // to use it put it in a fn that calls it coz txtSearch is deleted before search is executed
    var pStrFnName = "/api/Receivables/LoadAll";
    var pDivName = "divSelectCharges";//div name to be filled
    var ptblModalName = "tblModalReceivables";
    var pCheckboxNameAttr = "cbSelectReceivables";
    var pWhereClause = "";
    $("#" + pDivName).html("");
    pWhereClause += " WHERE IsDeleted = 0 AND OperationID = " + $("#slOperation").val();
    pWhereClause += ($("#hQuotationRouteID").val() == 0 ? "" : " AND GeneratingQRID = " + $("#hQuotationRouteID").val());
    pWhereClause += " AND (ChargeTypeCode LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " ORDER BY ChargeTypeName ";

    FillReceivablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, false /*pIsInsert*/, false /*pIsInvoiceEdit*/
        , function () {
            HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
        });

    $("#btn-SearchCharges").attr("onclick", "Receivables_MultiRowEdit();");
    $("#btnSelectChargesApply").attr("onclick", "Receivables_UpdateList(false, 0, false);");//parameters are(pSaveAndNew, pInvoiceID, pIsRemoveItems)
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
        pOperationID: $("#slOperation").val()
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

//called when pressing Apply in SelectCharges Modal
function Receivables_InsertListWithoutValues(pSaveandAddNew) {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectCharges");//returns string array of IDs
    debugger;
    if (pSelectedIDs != "")
        InsertSelectedCheckboxItems("/api/Receivables/InsertListWithoutValues"
            , {
                pOperationID: $("#slOperation").val(),
                pSelectedIDs: pSelectedIDs,
                pQuotationRouteID: $("#hQuotationRouteID").val()
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

//function CalculateReceivablesAmount() {
//    $("#txtReceivableAmount").val($("#txtReceivableQuantity").val() * $("#txtReceivableUnitPrice").val());
//}
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

////if not insert (i.e. update then all will rows will be selected)
//function Receivables_Row_CalculateReceivablesAmount(pRowID, pIsInsertChoice) {
//    var rowQuantity = $("#txtTblModalReceivableQuantity" + pRowID).val();
//    var rowSalePrice = $("#txtTblModalReceivableSalePrice" + pRowID).val();
//    $("#txtTblModalReceivableSaleAmount" + pRowID).val(rowQuantity * rowSalePrice);
//    if (pIsInsertChoice) //incase of insert check and uncheck the checkbox to in GetSelectedIDs incase of insert
//        Receivables_txtTblModalSaleAmount_Changed(pRowID, pIsInsertChoice);
//}
//if not insert (i.e. update then all will rows will be selected)
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

//to handle change of currency in the multi row edit modal
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
                DeleteListFunction("/api/Receivables/Delete"
                    , {
                        pReceivablesIDs: GetAllSelectedIDsAsString('tblReceivables'),
                        pOperationID: $("#slOperation").val()
                    }
                    , function () {
                        OperationCharges_FillModal();
                    });
            });
    //DeleteListFunction("/api/Receivables/Delete", { "pReceivablesIDs": GetAllSelectedIDsAsString('tblReceivables') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
}

/****************************************Quotation Cargo**********************************************/
function QuotationsPackage_OpenModal() {
    debugger;
    if ($("#hQuotationRouteID").val() == "")
        swal("Sorry", "Please, save route first.");
    else {
        ClearAll("#QuotationsPackageModal");
        jQuery("#QuotationsPackageModal").modal("show");
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Quotations/Cargo_FillModal", {
            pQRIDToFillCargoModal: $("#hQuotationRouteID").val()
        }
            , function (pData) {
                var pQuotationContainersAndPackages = JSON.parse(pData[0]);
                var pPackage = pData[1];
                var pContainerType = pData[2];
                QuotationsPackage_BindTableRows(pQuotationContainersAndPackages);
                FillListFromObject(null, 2, "<--Select-->", "slCargoPackageType", pPackage, null);
                FillListFromObject(null, 1, "<--Select-->", "slCargoContainerType", pContainerType, null);
                FadePageCover(false);
            }
            , null);
    }
}

function QuotationsPackage_BindTableRows(pQuotationContainersAndPackages) {
    debugger;
    ClearAllTableRows("tblQuotationContainersAndPackages");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pQuotationContainersAndPackages, function (i, item) {
        debugger;
        AppendRowtoTable("tblQuotationContainersAndPackages",
            ("<tr ID='" + item.ID + "' " + (QEPac ? ("ondblclick='QuotationPackage_FillPackageModal(" + item.ID + ");'") : "") + ">"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='Container' val='" + item.ContainerTypeID + "'>" + item.ContainerTypeCode + "</td>") : "")
                + ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='Package' val='" + item.PackageTypeID + "'>" + item.PackageTypeName + "</td>") : "")
                + "<td class='ContainerTypeID hide'>" + item.ContainerTypeID + "</td>"
                + "<td class='PackageTypeID hide'>" + item.PackageTypeID + "</td>"
                + "<td class='Quantity'>" + item.Quantity + "</td>"
                + ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='Length'>" + item.Length + "</td>") : "")
                + ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='Width'>" + item.Width + "</td>") : "")
                + ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='Height'>" + item.Height + "</td>") : "")
                + ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='Volume'>" + item.Volume + "</td>") : "")
                + ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='VolumetricWeight'>" + item.VolumetricWeight + "</td>") : "")
                + ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='NetWeight hide'>" + item.NetWeight + "</td>") : "")
                + "<td class='GrossWeight'>" + item.GrossWeight + "</td>"
                + ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='ChargeableWeight'>" + item.ChargeableWeight + "</td>") : "")

                + "<td class='hide'><a href='#EditPackageModal' data-toggle='modal' onclick='QuotationPackage_FillPackageModal(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    //ShowHidetblQuotationContainersAndPackagesHeaders();
    //ApplyPermissions();
    //if (QAPac) $("#btn-SelectContainersAndPackages").removeClass("hide"); else $("#btn-SelectContainersAndPackages").addClass("hide");
    //if (QDPac) $("#btn-DeleteContainerOrPackage").removeClass("hide"); else $("#btn-DeleteContainerOrPackage").addClass("hide");
    BindAllCheckboxonTable("tblQuotationContainersAndPackages", "ID", "cb-CheckAll-QuotationContainersAndPackages");
    CheckAllCheckbox("HeaderDeleteQuotationContainersAndPackagesID");
    HighlightText("#tblQuotationContainersAndPackages>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    QuotationsPackage_CalculateSummary();
}

function QuotationPackage_FillPackageModal(pQuotationPackageID) {
    debugger;
    ClearAll("#EditPackageModal");
    if ($("#cbIsAir").prop("checked") || $("#cbIsLCL").prop("checked") || $("#cbIsLTL").prop("checked"))
        $("#cbIsAutoCalculate").prop("checked", "checked");
    else
        $("#cbIsAutoCalculate").prop("checked", false);
    jQuery("#EditPackageModal").modal("show");
    $("#btnSaveContainerOrPackage").attr("onclick", "QuotationPackage_Save(false);");
    $("#txtPackagesQuantity").val(1);
    if (pQuotationPackageID > 0) {
        $("#hContainerOrPackageID").val(pQuotationPackageID);
        var tr = $("#tblQuotationContainersAndPackages tr[ID='" + pQuotationPackageID + "']");
        //var pCurrencyID = $(tr).find("td.Currency").attr('val');
        //QuotationPackageCurrency_GetList(pCurrencyID);

        $("#lblContainersAndPackageshown").html(": "
            + ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')
                ? $(tr).find("td.Container").text()
                : $(tr).find("td.Package").text()));
        //Filling divContinersInfo
        $("#txtContainerType").val($(tr).find("td.Container").text());
        $("#txtContainerType").attr("ContainerTypeID", $(tr).find("td.Container").attr("val"));
        $("#txtContainersQuantity").val($(tr).find("td.Quantity").text());
        //Filling divPackagesInfo
        $("#slCargoPackageType").val($(tr).find("td.PackageTypeID").text() == 0 ? "" : $(tr).find("td.PackageTypeID").text());
        $("#slCargoContainerType").val($(tr).find("td.ContainerTypeID").text() == 0 ? "" : $(tr).find("td.ContainerTypeID").text());

        $("#txtLength_SelectedCurrency").val($(tr).find("td.Length").text());
        $("#txtWidth_SelectedCurrency").val($(tr).find("td.Width").text());
        $("#txtHeight_SelectedCurrency").val($(tr).find("td.Height").text());
        $("#txtLength").val($(tr).find("td.Length").text());
        $("#txtWidth").val($(tr).find("td.Width").text());
        $("#txtHeight").val($(tr).find("td.Height").text());
        $("#txtVolume").val($(tr).find("td.Volume").text());

        $("#txtVolumetricWeight").val($(tr).find("td.VolumetricWeight").text());
        $("#txtNetWeight").val($(tr).find("td.NetWeight").text());
        $("#txtGrossWeight").val($(tr).find("td.GrossWeight").text());
        $("#txtChargeableWeight").val($(tr).find("td.ChargeableWeight").text());
        $("#txtPackagesQuantity").val($(tr).find("td.Quantity").text());

        //if ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked' || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked'))) {
        //    $("#divContainersInfo").removeClass("hide");
        //    //$("#divPackagesInfo").addClass("hide");
        //}
        //if ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) {
        //    $("#divContainersInfo").addClass("hide");
        //    //$("#divPackagesInfo").removeClass("hide");
        //}
    } //if (pQuotationPackageID > 0)
}

function QuotationPackage_Save(pSaveAndNew) {
    debugger;
    if (ValidateForm("form", "EditPackageModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pQuotationContainersAndPackagesID: $("#hContainerOrPackageID").val() == "" ? 0 : $("#hContainerOrPackageID").val()
            ,
            pQuotationRouteID: $("#hQuotationRouteID").val()
            ,
            pQuotationID: $("#hQuotationID").val()
            ,
            pContainerTypeID: ($("#slCargoContainerType").val() == "" ? 0 : $("#slCargoContainerType").val())
            ,
            pPackageTypeID: ($("#slCargoPackageType").val() == "" ? 0 : $("#slCargoPackageType").val())
            ,
            pLength: ($("#txtLength").val() == "" ? 0 : $("#txtLength").val())
            ,
            pWidth: ($("#txtWidth").val() == "" ? 0 : $("#txtWidth").val())
            ,
            pHeight: ($("#txtHeight").val() == "" ? 0 : $("#txtHeight").val())
            ,
            pVolume: ($("#txtVolume").val() == "" ? 0 : $("#txtVolume").val())
            ,
            pVolumetricWeight: ($("#txtVolumetricWeight").val() == "" ? 0 : $("#txtVolumetricWeight").val())
            ,
            pNetWeight: ($("#txtNetWeight").val() == "" ? 0 : $("#txtNetWeight").val())
            ,
            pGrossWeight: ($("#txtGrossWeight").val() == "" ? 0 : $("#txtGrossWeight").val())
            ,
            pChargeableWeight: ($("#txtChargeableWeight").val() == "" ? 0 : $("#txtChargeableWeight").val())
            ,
            pQuantity: ($("#txtPackagesQuantity").val() == "" || $("#txtPackagesQuantity").val() == 0 ? 1 : $("#txtPackagesQuantity").val())
        }
        CallGETFunctionWithParameters("/api/Quotations/Cargo_Save", pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData[0];
                var pQuotationContainersAndPackages = JSON.parse(pData[1]);
                var pQuotationRoute = JSON.parse(pData[2]);
                if (_MessageReturned != "") {
                    FadePageCover(false);
                    swal("", _MessageReturned);
                } else {
                    $("#lblContainerTypesInQuotationRouteFooter").html(": " + pQuotationRoute.ContainerTypes);
                    $("#lblTotalNumberOfContainers").html(": " + pQuotationRoute.ContainerTypes);
                    $("#lblPackageTypesInQuotationRouteFooter").html(": " + pQuotationRoute.PackageTypes);
                    $("#lblTotalNumberOfPackages").html(": " + pQuotationRoute.PackageTypes);
                    QuotationsPackage_BindTableRows(pQuotationContainersAndPackages);
                    if (pSaveAndNew)
                        ClearAll("#EditPackageModal");
                    else
                        jQuery("#EditPackageModal").modal("hide");
                    swal("Success", "Saved, successfully.");
                    Routings_LoadAll();
                }
            }
            , null);
    }
}

function QuotationPackage_DeleteList() {
    //Confirmation message to delete
    var pQuotationContainersAndPackagesDeletedIDs = GetAllSelectedIDsAsString('tblQuotationContainersAndPackages');
    if (pQuotationContainersAndPackagesDeletedIDs != "")
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
                CallGETFunctionWithParameters("/api/Quotations/Cargo_Delete"
                    , {
                        pQuotationContainersAndPackagesDeletedIDs: GetAllSelectedIDsAsString('tblQuotationContainersAndPackages')
                        , pQuotationRouteID: $("#hQuotationRouteID").val()
                    }
                    , function (pData) {
                        var _MessageReturned = pData[0];
                        var pQuotationContainersAndPackages = JSON.parse(pData[1]);
                        var pQuotationRoute = JSON.parse(pData[2]);

                        $("#lblContainerTypesInQuotationRouteFooter").html(": " + pQuotationRoute.ContainerTypes);
                        $("#lblTotalNumberOfContainers").html(": " + pQuotationRoute.ContainerTypes);
                        $("#lblPackageTypesInQuotationRouteFooter").html(": " + pQuotationRoute.PackageTypes);
                        $("#lblTotalNumberOfPackages").html(": " + pQuotationRoute.PackageTypes);
                        QuotationsPackage_BindTableRows(pQuotationContainersAndPackages);
                        if (_MessageReturned != "")
                            swal("", _MessageReturned);
                        Routings_LoadAll(); //FadePageCover(false);
                    });
            });
    //DeleteListFunction("/api/QuotationContainersAndPackages/Delete", { "pQuotationContainersAndPackagesIDs": GetAllSelectedIDsAsString('tblQuotationContainersAndPackages') }, function () { LoadViews("QuotationsEdit", null, $("#hQuotationID").val()); });
}

function QuotationsPackage_CalculateSummary() {
    debugger;
    var decTotalGrossWeight = 0;
    var decTotalVolume = 0;
    var decTotalVolumetricWeight = 0;
    var decTotalChargeableWeight = 0;
    var decTotalQuantity = 0; //used to fill both lblNumberOfPackages and lblQuantity

    if (1 == 1) {//if ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) {
        $("#divPackagesSummary").removeClass("hide");
        $(".GrossWeight").each(function () {
            var value = $(this).text();
            // add only if the value is number
            if (!isNaN(value) && value.length != 0) {
                decTotalGrossWeight += parseFloat(value);
            }
        });
        $(".Volume").each(function () {
            debugger;
            var value = $(this).text();
            // add only if the value is number
            if (!isNaN(value) && value.length != 0) {
                decTotalVolume += parseFloat(value);
            }
        });
        $(".VolumetricWeight").each(function () {
            var value = $(this).text();
            // add only if the value is number
            if (!isNaN(value) && value.length != 0) {
                decTotalVolumetricWeight += parseFloat(value);
            }
        });
        $(".ChargeableWeight").each(function () {
            var value = $(this).text();
            // add only if the value is number
            if (!isNaN(value) && value.length != 0) {
                decTotalChargeableWeight += parseFloat(value);
            }
        });
        $(".Quantity").each(function () {
            var value = $(this).text();
            // add only if the value is number
            if (!isNaN(value) && value.length != 0) {
                decTotalQuantity += parseFloat(value);
            }
        });
        $("#lblTotalGrossWeight").html(": " + decTotalGrossWeight.toFixed(2).toString());
        $("#lblTotalVolume").html(": " + decTotalVolume.toFixed(2).toString());
        $("#lblTotalVolumetricWeight").html(": " + decTotalVolumetricWeight.toFixed(2).toString());
        $("#lblChargeableWeight").html(": " + decTotalChargeableWeight.toFixed(2).toString());
        //$("#lblTotalNumberOfPackages").html(": " + decTotalQuantity.toString());

        $("#lblTotalGrossWeightInQuotationRouteFooter").html($("#lblTotalGrossWeight").html());
        $("#lblTotalVolumeInQuotationRouteFooter").html($("#lblTotalVolume").html());
        $("#lblTotalVolumetricWeightInQuotationRouteFooter").html($("#lblTotalVolumetricWeight").html());
        $("#lblChargeableWeightInQuotationRouteFooter").html($("#lblChargeableWeight").html());
        //$("#lblPackageTypesInQuotationRouteFooter").html($("#lblTotalNumberOfPackages").html());
        //$("#lblContainerTypesInQuotationRouteFooter").html($("#lblTotalNumberOfPackages").html());
        //TODO: Fill $("#lblContainerTypesInQuotationRouteFooter").html() from Containers Totals
    } else { //FCL or FTL
        $("#divContainersSummary").removeClass("hide");
        $(".Quantity").each(function () {
            var value = $(this).text();
            // add only if the value is number
            if (!isNaN(value) && value.length != 0) {
                decTotalQuantity += parseFloat(value);
            }
        });
        $("#lblTotalNumberOfContainers").html(": " + decTotalQuantity.toString());
    }
}

function Cargo_CalculateVolume() {
    debugger;
    $("#txtLength").val(($("#txtLength_SelectedCurrency").val() * $("#slLengthMeasurementUnit").val()).toFixed(2));
    $("#txtWidth").val(($("#txtWidth_SelectedCurrency").val() * $("#slLengthMeasurementUnit").val()).toFixed(2));
    $("#txtHeight").val(($("#txtHeight_SelectedCurrency").val() * $("#slLengthMeasurementUnit").val()).toFixed(2));
    var _Volume = $("#txtLength").val() * $("#txtWidth").val() * $("#txtHeight").val() * $("#txtPackagesQuantity").val() / 1000000;
    $("#txtVolume").val(Math.round(100 * _Volume) / 100);
    if ($("#cbIsAutoCalculate").prop("checked")) {
        if ($("#txtLength").val() != "" && $("#txtWidth").val() != "" && $("#txtHeight").val() != "" && $("#txtPackagesQuantity").val() != "") {
            //i am sure in the next 2 conditions that they are LCL or LTL  //if Ocean then no volumetric weight
            if ($("#cbIsAir").prop("checked"))
                $("#txtVolumetricWeight").val((_Volume * 1000000 / intChgWtDividorAirConstant).toFixed(2));
            else if ($("#cbIsInland").prop("checked"))
                $("#txtVolumetricWeight").val((_Volume * 1000000 / intChgWtDividorInlandConstant).toFixed(2));
            else
                $("#txtVolumetricWeight").val((_Volume * 1000000 / intChgWtDividorOceanConstant).toFixed(2));
        } else {
            $("#txtVolume").val(0);
            $("#txtVolumetricWeight").val(0);
        }
        if ($("#txtVolumetricWeight").val() == "" || $("#txtVolumetricWeight").val() == 0)
            $("#txtChargeableWeight").val($("#txtVolumetricWeight").val());
        else if ($("#txtGrossWeight").val() == "" || $("#txtGrossWeight").val() == 0)
            $("#txtChargeableWeight").val($("#txtVolumetricWeight").val());
        else
            $("#txtChargeableWeight").val(parseFloat($("#txtVolumetricWeight").val()) > parseFloat($("#txtGrossWeight").val())
                ? $("#txtVolumetricWeight").val()
                : $("#txtGrossWeight").val());
    }
}

/***************************************Fleet Quotation****************************************/
function FleetQuotation_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "FleetQuotation_BindTableRows";
    //strBindTableRowsFunctionName = "FleetQuotation_BindTableRows";
    //strLoadWithPagingFunctionName = "/api/Quotations/QR_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    strLoadWithPagingFunctionName = "/api/Quotations/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = "WHERE IsFleet=1";
    pWhereClause += " AND CloseDate>=CAST(GETDATE() AS DATE) ";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = {
        pIsLoadArrayOfObjects: true,
        pLanguage: $("[id$='hf_ChangeLanguage']").val(),
        pPageNumber: pPageNumber,
        pPageSize: pPageSize,
        pWhereClause: pWhereClause,
        pOrderBy: pOrderBy
    }
    LoadView("/TR/FleetQuotation/FleetQuotation", "div-content", function () {
        var _TodaysDate = getTodaysDateInddMMyyyyFormat();
        $("#txtFleetTransportOrderFromDate").val("01/01/2021");
        $("#txtFleetTransportOrderToDate").val(_TodaysDate);
        if (pDefaults.UnEditableCompanyName == "CAL")
            $(".classShowForCAL").removeClass("hide");
        if (glbCallingControl == "FleetQuotation") {
            $("#liGroupName").text("Fleet");
            $("#liGroupName").attr("onclick", "LoadViews('FleetQuotationTab')");
            $("#liTabName").text("Fleet Contract");
            $("#liTabName").attr("onclick", "LoadViews('FleetQuotationTab')");
            $("#liFormName").text("Fleet Contract");
            $("#h3LblMainScreen").text("Fleet Contract"); //$("#h3LblMainScreen").addClass("static-text-primary");
            $("#h3ModalLabel").text("Quotation");
            $(".classShowForFleetQuotation").removeClass("hide");
            //$("#h3ModalLblAllocationType").html("Receivables Allocation" + '&nbsp;<label id="lblAllocationShown" purpose="dynamicLabel" class="static-text-primary"></label>');
            //$("#h3ModalLblAllocationType").addClass("static-text-primary");
        } else if (glbCallingControl == "FleetApprovedTransportOrder") {
            var TodaysDate = new Date();
            var CurrentYear = TodaysDate.getUTCFullYear();
            $("#cbIsOwnedByCompany").prop("checked", false);
            $(".classOwnedBySupplier").removeClass("hide");
            $("#liGroupName").text("Fleet");
            $("#liGroupName").attr("onclick", "LoadViews('TR_Transactions')");
            $("#liTabName").text("Transactions");
            $("#liTabName").attr("onclick", "LoadViews('TR_Transactions')");
            $("#liFormName").text("Approved Transport Orders");
            $("#h3LblMainScreen").text("Approved Transport Orders"); //$("#h3LblMainScreen").addClass("static-text-primary");
            $("#h3ModalLabel").text("Approved Transport Orders");
            $(".classShowForFleetApprovedTransportOrder").removeClass("hide");
            GetListYears(CurrentYear, null, "slFilterInvoiceYear", null
                , null //function () { }
                , parseInt(CurrentYear + 1));
            //$("#h3ModalLblAllocationType").html("Payables Allocation" + '&nbsp;<label id="lblAllocationShown" purpose="dynamicLabel" class="static-text-danger"></label>');
            //$("#h3ModalLblAllocationType").addClass("static-text-danger");
        }
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                var pPaymentTerm = pData[2];
                var pTransactionType = pData[3];
                var pTaxType = pData[4];
                var pDivision = pData[5];
                var pEquipmentModel = pData[6];
                Fill_SelectInputAfterLoadData_WithMultiAttr(pPaymentTerm, 'ID', 'Name', '<--Select-->', '#slPaymentTermCutoff', '', '');
                Fill_SelectInputAfterLoadData_WithMultiAttr(pTransactionType, 'ID', 'Name', '<--Select-->', '#slTransactionTypeCutoff', '', '');
                Fill_SelectInputAfterLoadData_WithMultiAttr(pTaxType, 'ID', 'Name', '<--Select-->', '#slTaxTypeCutoff', '', 'CurrentPercentage,IsDiscount');
                Fill_SelectInputAfterLoadData_WithMultiAttr(pDivision, 'ID', 'Name', '<--Select-->', '#slDivisionCutoff', '', '');
                Fill_SelectInputAfterLoadData_WithMultiAttr(pDivision, 'ID', 'Name', '<--All Division-->', '#slFilterDivision', '', '');
                Fill_SelectInputAfterLoadData_WithMultiAttr(pEquipmentModel, 'ID', 'Name', '<--Select-->', '#slEquipmentModel', '', '');
                FleetQuotation_BindTableRows(JSON.parse(pData[0]));
                $("#slCustomer_FleetQuotation").html($("#hReadySlCustomers").html());
                $("#slFilterCustomer").html($("#hReadySlCustomers").html());
                $("#slCurrency_FleetQuotation").html($("#hReadySlCurrencies").html());
                //FillListFromObject(null, (pDefaults.IsRepeatChargeTypeName ? 4 : 2), null/*pStrFirstRow*/, "slFleetQuotationDetailsChargeType", pChargeType, null);
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
        CallGETFunctionWithParameters("/api/Quotations/FleetQuotationDetails_GetModalControls", { pDummyToFillFleetQuotationDetailsModal: 0 }
            , function (pData) {
                var pCommodity = pData[0];
                var pPort = pData[1];
                var pTemplates = pData[2];
                var pDivision = pData[3];
                var pEquipmentType = pData[4];
                FillListFromObject(null, 8, "<--Select-->", "slQuotationEditTemplate", pTemplates, null);
                //Fill_SelectInputAfterLoadData_WithMultiAttr(data, ID_Name, Item_Name, Title, SelectInput_ID, Selected_ID, AttrItemNames, pCallback)
                Fill_SelectInputAfterLoadData_WithMultiAttr(pPort, 'ID', 'Name', '<--Select-->', '#slRoutingsPOL', '', 'CountryID', function () {
                    $("#slRoutingsPOD").html($("#slRoutingsPOL").html());
                    $("#slPOLCutoff").html($("#slRoutingsPOL").html());
                    $("#slPODCutoff").html($("#slRoutingsPOL").html());
                });
                Fill_SelectInputAfterLoadData_WithMultiAttr(pPort, 'ID', 'Name', '<--All POL-->', '#slFilterRoutingsPOL', '', '');
                Fill_SelectInputAfterLoadData_WithMultiAttr(pPort, 'ID', 'Name', '<--All POD-->', '#slFilterRoutingsPOD', '', '');
                Fill_SelectInputAfterLoadData_WithMultiAttr(pCommodity, 'ID', 'Name', '<--Select-->', '#slCommodities', '', '');
                Fill_SelectInputAfterLoadData_WithMultiAttr(pDivision, 'ID', 'Name', '<--Select-->', "#slDivision", '', '');
                Fill_SelectInputAfterLoadData_WithMultiAttr(pEquipmentType, 'ID', 'Name', '<--Select-->', '#slEquipmentType', '', '');
                ApplySelectListSearch();
            }
            , null);
    },
        function () {
            FleetQuotation_ClearAllControls();
        },
        function () {
            FleetQuotation_DeleteList();
        });
}

function FleetQuotation_BindTableRows(pContract) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblFleetQuotation");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pContract, function (i, item) {
        AppendRowtoTable("tblFleetQuotation",
            ("<tr ID='" + item.ID + "' ondblclick='FleetQuotation_FillAllControls(" + item.ID + ",0);' class='" + (item.IsFinalized ? "text-primary" : "") + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code'>" + item.Code + "</td>"
                + "<td class='ClientID hide'>" + item.ClientID + "</td>"
                + "<td class='ClientName'>" + item.ClientName + "</td>"
                + "<td class='OpenDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.OpenDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.OpenDate))) + "</td>"
                + "<td class='CloseDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CloseDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CloseDate))) + "</td>"
                //+ "<td class='IsFinalized hide'> <input type='checkbox' id='cbIsFinalized" + item.ID + "' disabled='disabled' " + (item.IsFinalized ? " checked='checked' " : "") + " /></td>"
                + "<td class='hide'><a href='#FleetQuotationModal' data-toggle='modal' onclick='Contract_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    if (glbCallingControl == "FleetQuotation")
        ApplyPermissions();
    BindAllCheckboxonTable("tblFleetQuotation", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblFleetQuotation>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () {
        LoadViews("hl-homepage");
    });
}

function FleetQuotation_LoadingWithPaging() {
    debugger;
    var pWhereClause = FleetQuotation_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = {
        pIsLoadArrayOfObjects: false,
        pLanguage: $("[id$='hf_ChangeLanguage']").val(),
        pPageNumber: pPageNumber,
        pPageSize: pPageSize,
        pWhereClause: pWhereClause,
        pOrderBy: pOrderBy
    }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) {
        FleetQuotation_BindTableRows(JSON.parse(pData[0]));
    });
    HighlightText("#tblFleetQuotation>tbody>tr", $("#txt-Search").val().trim());
}

function FleetQuotation_GetWhereClause() {
    debugger;
    var _WhereClause = "WHERE IsFleet=1" + "\n";
    if ($("#cbIsHideExpired").prop("checked"))
        _WhereClause += " AND CloseDate>=CAST(GETDATE() AS DATE) ";
    if ($("#slFilterCustomer").val() != "" && $("#slFilterCustomer").val() != null)
        _WhereClause += "AND ClientID = " + $("#slFilterCustomer").val() + "\n";
    if ($("#txt-Search").val().trim() != "") {
        _WhereClause += "AND (" + "\n";
        _WhereClause += "        ClientName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        if (!isNaN($("#txt-Search").val().trim()))
            _WhereClause += "       OR CodeSerial = " + $("#txt-Search").val().trim() + "\n";
        _WhereClause += "    )";
    }
    return _WhereClause;
}

function FleetQuotation_ClearAllControls() {
    debugger;
    $("#tblRoutings tbody").html("");
    //$("#lblContractMaxWeight").html("<span> : </span><span>" + 0 + "</span>");
    //$("#lblContractMaxVolume").html("<span> : </span><span>" + 0 + "</span>");
    ClearAll("#FleetQuotationModal");
    $("#slCurrency_FleetQuotation").val(pDefaults.CurrencyID);

    $(".classDisableForFinalized").removeAttr("disabled");

    $("#btnSave").attr("onclick", "FleetQuotation_Insert(false);");
    $("#btnSaveAndAddNew").attr("onclick", "FleetQuotation_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
    ApplySelectListSearch();
}

function FleetQuotation_FillAllControls(pID, pOption) {
    debugger;
    FadePageCover(true);
    if (glbCallingControl == "FleetQuotation") {
        ClearAll("#FleetQuotationModal");
        $("#tblRoutings tbody").html("");
        jQuery("#FleetQuotationModal").modal("show");
        var pParametersWithValues = {
            pHeaderID: pID
        };
        CallGETFunctionWithParameters("/api/Quotations/LoadHeaderWithDetails", pParametersWithValues
            , function (pData) {
                var pFleetQuotationHeader = JSON.parse(pData[0]);
                var pFleetQuotationDetails = JSON.parse(pData[1]);
                //if (pFleetQuotationHeader.Status.toUpperCase() == "FINALIZED")
                //    $(".classDisableForFinalized").attr("disabled", "disabled");
                //else
                //    $(".classDisableForFinalized").removeAttr("disabled");
                $("#hQuotationID").val(pID);
                $("#lblShown").html(": " + pFleetQuotationHeader.Code);
                $("#txtCode_FleetQuotation").val(pFleetQuotationHeader.Code);
                //$("#txtStatus").val(pFleetQuotationHeader.Status);
                $("#slCustomer_FleetQuotation").val(pFleetQuotationHeader.ClientID == 0 ? "" : pFleetQuotationHeader.ClientID);
                $("#txtOpenDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pFleetQuotationHeader.OpenDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pFleetQuotationHeader.OpenDate)));
                $("#txtCloseDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pFleetQuotationHeader.CloseDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pFleetQuotationHeader.CloseDate)));

                $("#slQuotationEditTemplate").val(pFleetQuotationHeader.TemplateID == 0 ? "" : pFleetQuotationHeader.TemplateID);
                $("#txtQuotationEditSubject").val(pFleetQuotationHeader.QuotationSubject == 0
                    ? (pFleetQuotationHeader.TemplateSubject == 0 ? "" : pFleetQuotationHeader.TemplateSubject)
                    : pFleetQuotationHeader.QuotationSubject);
                $("#txtQuotationEditTermsAndConditions").val(pFleetQuotationHeader.QuotationTermsAndConditions == 0
                    ? (pFleetQuotationHeader.TemplateTermsAndConditions == 0 ? "" : pFleetQuotationHeader.TemplateTermsAndConditions)
                    : pFleetQuotationHeader.QuotationTermsAndConditions);
                $("#txtNotes_FleetQuotation").val(pFleetQuotationHeader.Notes == 0 ? "" : pFleetQuotationHeader.Notes);
                $("#cbIsFinalized").prop("checked", pFleetQuotationHeader.IsFinalized);
                //Contract_StorageUnitChanged();
                FleetQuotationDetails_BindTableRows(pFleetQuotationDetails);
                $("#btnSave").attr("onclick", "FleetQuotation_Update(false);");
                $("#btnSaveAndAddNew").attr("onclick", "FleetQuotation_Update(true);");
                FadePageCover(false);
            }
            , null);
    } //if (glbCallingControl == "FleetQuotation") {
    else if (glbCallingControl == "FleetApprovedTransportOrder") {
        $("#tblApprovedTransportOrder tbody").html("");
        if ($("#cbIsGroupedCutoff").prop("checked")) {
            $("#btn-RejectTransportOrder").addClass("hide");
            $(".classShowForEditInvoicedOrders").addClass("hide");
        } else if ($("#cbIsByTransportOrderCutoff").prop("checked")) {
            $("#btn-RejectTransportOrder").removeClass("hide");
            $(".classShowForEditInvoicedOrders").addClass("hide");
        } else if ($("#cbIsRemoveInvoicedOrders").prop("checked")) {
            $("#btn-RejectTransportOrder").addClass("hide");
            $(".classShowForEditInvoicedOrders").removeClass("hide");
        }
        if (pID == 0) //Called from btn-RetrieveFleetInvoiceItems so $("#hQuotationID").val() already has value
            pID = $("#hQuotationID").val();
        //ClearAll("#FleetApprovedTransportOrderModal");
        jQuery("#FleetApprovedTransportOrderModal").modal("show");
        var pParametersWithValues = {
            pQuotationID_ToGetApprovedOrders: pID
            , pWhereClauseTransportOrderItems: FleetApprovedTransportOrder_GetWhereClauseItems(pID)
            , pOption: pOption
            , pIsGroupedCutoff: $("#cbIsGroupedCutoff").prop("checked")
            , pcbIsRemoveInvoicedOrders: $("#cbIsRemoveInvoicedOrders").prop("checked")
        };
        CallGETFunctionWithParameters("/api/Quotations/FleetQuotation_LoadHeaderWithApprovedTransportOrders", pParametersWithValues
            , function (pData) {
                var pFleetQuotationHeader = JSON.parse(pData[0]);
                var pFleetApprovedTransportOrder = JSON.parse(pData[1]);
                var pClient = JSON.parse(pData[2]);
                //var pFleetApprovedTransportOrder_Excel = JSON.parse(pData[3]);

                $("#hQuotationID").val(pID);
                $("#lblShownApprovedTransportOrder").html(": " + pFleetQuotationHeader.ClientName + " - " + pFleetQuotationHeader.Code);
                $("#txtCode_FleetQuotation").val(pFleetQuotationHeader.Code);
                //$("#txtStatus").val(pFleetQuotationHeader.Status);
                $("#slCustomer_FleetQuotation").val(pFleetQuotationHeader.ClientID == 0 ? "" : pFleetQuotationHeader.ClientID);
                $("#txtOpenDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pFleetQuotationHeader.OpenDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pFleetQuotationHeader.OpenDate)));
                $("#txtCloseDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pFleetQuotationHeader.CloseDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pFleetQuotationHeader.CloseDate)));

                $("#slQuotationEditTemplate").val(pFleetQuotationHeader.TemplateID == 0 ? "" : pFleetQuotationHeader.TemplateID);
                $("#txtQuotationEditSubject").val(pFleetQuotationHeader.QuotationSubject == 0
                    ? (pFleetQuotationHeader.TemplateSubject == 0 ? "" : pFleetQuotationHeader.TemplateSubject)
                    : pFleetQuotationHeader.QuotationSubject);
                $("#txtQuotationEditTermsAndConditions").val(pFleetQuotationHeader.QuotationTermsAndConditions == 0
                    ? (pFleetQuotationHeader.TemplateTermsAndConditions == 0 ? "" : pFleetQuotationHeader.TemplateTermsAndConditions)
                    : pFleetQuotationHeader.QuotationTermsAndConditions);
                $("#txtNotes_FleetQuotation").val(pFleetQuotationHeader.Notes == 0 ? "" : pFleetQuotationHeader.Notes);
                if (pDefaults.UnEditableCompanyName == "CAL" && pClient != null) {
                    $("#slTaxTypeCutoff").val(pClient.TaxeTypeID);
                    $("#slPaymentTermCutoff").val(pClient.PaymentTermID);
                }
                $("#cbIsFinalized").prop("checked", pFleetQuotationHeader.IsFinalized);
                FleetApprovedTransportOrder_BindTableRows(pFleetApprovedTransportOrder);
                $("#btnSave").attr("onclick", "FleetQuotation_Update(false);");
                $("#btnSaveAndAddNew").attr("onclick", "FleetQuotation_Update(true);");
                if (pOption == "Excel") {
                    var pFileName = (pFleetApprovedTransportOrder.length > 0 ? pFleetApprovedTransportOrder[0].ClientName : null);
                    //ExportToExcel(pArray, pHeader, pFileName, pExcludedColumns)
                    if ($("#cbIsGroupedCutoff").prop("checked"))
                        ExportToExcel(pFleetApprovedTransportOrder, "Client,Division,Code,From,To,Commodity,Equipment,Count,Sale", pFileName, "QuotationRouteOrTransportOrderID,GateOutDate,ModificationDateString,InvoiceNumber,DriverName,LastTruckCounter,TruckCounter,Notes,CargoReturnGrossWeight");
                    else //Separated
                        ExportToExcel(pFleetApprovedTransportOrder, "Client,Division,Code,From,To,Commodity,Equipment,Count,Sale,OutDate,ApprovalDate,Invoice,DriverName,KM Before,KM After,Notes,Returned Amt", pFileName, "QuotationRouteOrTransportOrderID");
                }
                FadePageCover(false);
            }
            , null);
    } //else if (glbCallingControl == "FleetApprovedTransportOrder") {
}

//pReleaseDate: ($("#txtOperationReleaseDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtOperationReleaseDate").val().trim())),
function FleetQuotation_Insert(pSaveandAddNew) {
    debugger;
    FadePageCover(true);
    //if (!isValidDate($("#txtOpenDate").val().trim(), 1) || !isValidDate($("#txtCloseDate").val().trim(), 1)) {
    //    swal(strSorry, "Please, Enter Start-End dates.");
    //    FadePageCover(false);
    //}
    var CurrentYear = TodaysDate.getUTCFullYear();
    if ($("#txtOpenDate").val().trim() != "" && $("#txtCloseDate").val().trim() != ""
        && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtCloseDate").val().trim())) < 0) {
        FadePageCover(false);
        swal("Sorry", "Please, check dates.");
    } else if (ValidateForm("form", "FleetQuotationModal")) {
        var data = {
            "pCodeSerial": 0 /*generated automatically*/,
            //"pCode": "Q" + (CurrentYear - 2000) + GetDirectionType($('input[name=cbDirectionType]:checked').val()).substring(0, 3)
            //             + GetTransportType($('input[name=cbTransportType]:checked').val()).substring(0, 2),
            "pCode": "Q" + (CurrentYear - 2000) + "DOM" + "IN",
            "pBranchID": pLoggedUser.BranchID,
            "pSalesmanID": pLoggedUser.ID, //$('#slQuotationSalesman').val(),
            "pOperationManID": $('#slOperationEditOperationMan').val(),
            "pDirectionType": constDomesticDirectionType, //$('input[name=cbDirectionType]:checked').val(),
            "pDirectionIconName": DirectIconName, //$("#hDirectionIconName").val(),
            "pDirectionIconStyle": strDirectIconStyleClassName, //$("#hDirectionIconStyle").val(),
            "pTransportType": InlandTransportType, //$('input[name=cbTransportType]:checked').val(),
            "pTransportIconName": InlandIconName, //$("#hTransportIconName").val(),
            "pTransportIconStyle": strInlandIconStyleClassName, //$("#hTransportIconStyle").val(),
            "pShipmentType": constLTLShipmentType, //($('input[name=cbTransportType]:checked').val() == 2 ? 0 : $('input[name=cbShipmentType]:checked').val()),
            "pShipperID": ($('#slCustomer_FleetQuotation').val() == "" ? 0 : $('#slCustomer_FleetQuotation').val()),
            "pShipperAddressID": 0,
            "pShipperContactID": 0,
            "pConsigneeID": ($('#slCustomer_FleetQuotation').val() == "" ? 0 : $('#slCustomer_FleetQuotation').val()),
            "pConsigneeAddressID": 0,
            "pConsigneeContactID": 0,
            "pAgentID": 0, //($('#slAgents').val() == "" ? 0 : $('#slAgents').val()),
            "pAgentAddressID": 0,
            "pAgentContactID": 0,
            "pCustomerID": ($('#slCustomer_FleetQuotation').val() == "" ? 0 : $('#slCustomer_FleetQuotation').val()),
            "pCustomerContactID": 0,
            "pIncotermID": 0,
            "pCommodityID": 0,
            "pTransientTime": 0,
            "pValidity": 0,
            "pFreeTime": 0,
            "pFreeTimePOD": 0,
            "pOpenDate": ConvertDateFormat($("#txtOpenDate").val().trim()),
            "pCloseDate": ConvertDateFormat($("#txtCloseDate").val().trim()),
            //"pExpirationDate": varExpirationDate,
            "pExpirationDate": "01-01-1900", //ConvertDateFormat(varExpirationDate),
            "pIncludePickup": false,
            "pPickupCityID": 0,
            "pPickupAddressID": 0,
            "pPOLCountryID": 0, //$('#slPOLCountries option:selected').val(),
            "pPOL": 0, //$('#slPOL option:selected').val(),
            "pPODCountryID": 0, //$('#slPODCountries option:selected').val(),
            "pPOD": 0, //$('#slPOD option:selected').val(),
            "pShippingLineID": 0, //($('input[name=cbTransportType]:checked').val() == 1 ? ($('#slLines option:selected').val() == "" ? 0 : $('#slLines option:selected').val()) : 0),
            "pAirlineID": 0, //($('input[name=cbTransportType]:checked').val() == 2 ? ($('#slLines option:selected').val() == "" ? 0 : $('#slLines option:selected').val()) : 0),
            "pTruckerID": 0, //($('input[name=cbTransportType]:checked').val() == 3 ? ($('#slLines option:selected').val() == "" ? 0 : $('#slLines option:selected').val()) : 0),
            "pIncludeDelivery": false,
            "pDeliveryZipCode": 0,
            "pDeliveryCityID": 0,
            "pDeliveryCountryID": 0,
            "pGrossWeight": 0,
            "pVolume": 0,
            "pChargeableWeight": 0,
            "pNumberOfPackages": 0,
            "pIsDangerousGoods": false, //$("#cbDangerousGoods").prop("checked"),
            "pDescriptionOfGoods": 0, //$("#txtNotes_FleetQuotation").val().trim() == "" ? 0 : $("#txtNotes_FleetQuotation").val().trim().toUpperCase(),
            "pNotes": $("#txtNotes_FleetQuotation").val().trim() == "" ? 0 : $("#txtNotes_FleetQuotation").val().trim().toUpperCase(),
            "pQuotationStageID": 1, //this means Created
            "pSalesLeadID": 0,
            "pIsWarehousing": 0,
            "pMainCriteriaID": 0,
            "pSubCriteriaID": 0,
            "pIsFleet": true,

            "pTemplateID": ($('#slQuotationEditTemplate').val() == "" ? 0 : $('#slQuotationEditTemplate').val()),
            "pSubject": $("#txtQuotationEditSubject").val().trim() == "" ? "0" : $("#txtQuotationEditSubject").val().trimRight(),
            "pTermsAndConditions": $("#txtQuotationEditTermsAndConditions").val().trim() == "" ? "0" : $("#txtQuotationEditTermsAndConditions").val().trim()
        };
        CallPOSTFunctionWithParameters("/api/Quotations/Insert", data
            , function (pData) {
                var pQuotationHeader = JSON.parse(pData[2]);
                $("#btnSave").attr("onclick", "FleetQuotation_Update(false);");
                $("#btnSaveAndAddNew").attr("onclick", "FleetQuotation_Update(true);");
                $("#hQuotationID").val(pQuotationHeader.ID);
                $("#txtCode_FleetQuotation").val(pQuotationHeader.Code);
                FleetQuotation_LoadingWithPaging();
            }
            , null);
    } else //if (ValidateForm("form", "FleetQuotationModal"))
        FadePageCover(false);
}

function FleetQuotation_Update() {
    debugger;
    FadePageCover(true);
    if (!ValidateForm("form", "FleetQuotationModal"))
        FadePageCover(false);
    else {
        var pParametersWithValues = {
            pFleetQuotationID: $("#hQuotationID").val()
            ,
            pCustomerID: $("#slCustomer_FleetQuotation").val()
            ,
            pOpenDate: $("#txtOpenDate").val()
            ,
            pCloseDate: $("#txtCloseDate").val()
            ,
            pTemplateID: ($('#slQuotationEditTemplate').val() == "" ? 0 : $('#slQuotationEditTemplate').val())
            ,
            pSubject: $("#txtQuotationEditSubject").val().trim() == "" ? "0" : $("#txtQuotationEditSubject").val().trimRight()
            ,
            pTermsAndConditions: $("#txtQuotationEditTermsAndConditions").val().trim() == "" ? "0" : $("#txtQuotationEditTermsAndConditions").val().trim()
            ,
            pNotes: $("#txtNotes_FleetQuotation").val() == "" ? "0" : $("#txtNotes_FleetQuotation").val().trim().toUpperCase()
        };
        CallPOSTFunctionWithParameters("/api/Quotations/FleetQuotation_Update", pParametersWithValues
            , function (pData) {
                var _ReturnedMessage = pData[0];
                if (_ReturnedMessage != "")
                    swal("Sorry", _ReturnedMessage);
                FleetQuotation_LoadingWithPaging();
            }
            , null);
    }
}

function FleetQuotation_DeleteList() {
    debugger;
    var pQuotationsIDs = GetAllSelectedIDsAsString('tblFleetQuotation');
    if (pQuotationsIDs != "")
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
                DeleteListFunction("/api/Quotations/Delete", { "pQuotationsIDs": pQuotationsIDs }, function () {
                    FleetQuotation_LoadingWithPaging();
                });
            });
}

/***************************************FleetQuotationDetails***************************************/
function FleetQuotationDetails_BindTableRows(pTable) {
    ClearAllTableRows("tblRoutings");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTable, function (i, item) {
        AppendRowtoTable("tblRoutings",
            ("<tr ID='" + item.ID + "' " + (1 == 1 ? ("ondblclick='FleetQuotationDetails_FillControls(" + item.ID + ");'") : "") + ">"
                + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                + "<td class='QuotationID hide'>" + item.QuotationID + "</td>"
                + "<td class='Code'>" + item.Code + "</td>"
                + "<td class='POL hide'>" + item.POL + "</td>"
                + "<td class='POD hide'>" + item.POD + "</td>"
                + "<td class='POLName'>" + item.POLName + "</td>"
                + "<td class='PODName'>" + item.PODName + "</td>"
                + "<td class='EquipmentTypeID hide'>" + item.EquipmentTypeID + "</td>"
                + "<td class='EquipmentTypeName hide'>" + (item.EquipmentTypeID == 0 ? "" : item.EquipmentTypeName) + "</td>"
                + "<td class='EquipmentModelName'>" + (item.EquipmentModelID == 0 ? "" : item.EquipmentModelName) + "</td>"
                + "<td class='CommodityID hide'>" + item.CommodityID + "</td>"
                + "<td class='CommodityName'>" + (item.CommodityID == 0 ? "" : item.CommodityName) + "</td>"
                + "<td class='Cost'>" + item.Cost + "</td>"
                + "<td class='Sale'>" + item.Sale + "</td>"
                + "<td class='DivisionName'>" + (item.DivisionName == 0 ? "" : item.DivisionName) + "</td>"
                + "<td class='hide'><a href='#FleetQuotationDetailsModal' data-toggle='modal' onclick='FleetQuotationDetails_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "</tr>"));
    });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblRoutings", "ID", "cb-CheckAll-FleetQuotationDetails");
    $("#slCustomer_FleetQuotation").trigger("change");
    CheckAllCheckbox("HeaderDeleteFleetQuotationDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}

function FleetQuotationDetails_LoadAll() {
    debugger;
    if (!$("#hQuotationID").val() == "") {
        var pWhereClause = "WHERE QuotationID=" + $("#hQuotationID").val();
        if ($("#slFilterDivision").val() != 0 && $("#slFilterDivision").val() != "")
            pWhereClause += " AND DivisionID=" + $("#slFilterDivision").val();
        if ($("#slFilterRoutingsPOL").val() != 0 && $("#slFilterRoutingsPOL").val() != "")
            pWhereClause += " AND POL=" + $("#slFilterRoutingsPOL").val();
        if ($("#slFilterRoutingsPOD").val() != 0 && $("#slFilterRoutingsPOD").val() != "")
            pWhereClause += " AND POD=" + $("#slFilterRoutingsPOD").val();
        var pParametersWithValues = {
            pIsLoadArrayOfObjects: false
            , pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pPageNumber: 1
            , pPageSize: 999999
            , pWhereClauseQR: pWhereClause
            , pOrderBy: "CodeSerial"
        };
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Quotations/QR_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned", pParametersWithValues
            , function (pData) {
                FleetQuotationDetails_BindTableRows(JSON.parse(pData[0]));
                FadePageCover(false);
            }
            , null);
    }
}

function FleetQuotationDetails_FillControls(pID) {
    debugger;
    //Routings_EditByDblClick(pID, false);
    if ($("#hQuotationID").val() == "")
        swal("Sorry", "Please, save header first.");
    else {
        FadePageCover(true);
        ClearAll("#RoutingModal");
        $("#txtRoutingsExpirationDate").val("01/01/2050");
        $("#hRoutingID").val(pID);
        jQuery("#RoutingModal").modal("show");
        if ($("#slRoutingsPOD option").length < 2)
            $("#slRoutingsPOD").html($("#slRoutingsPOL").html());
        if (pID == 0) {
            //FleetQuotation_EquipmentTypeChanged();
            $("#btnSaveRouting").attr("onclick", "FleetQuotationDetails_Insert(false);");
            $("#btnSaveandNewRouting").attr("onclick", "FleetQuotationDetails_Insert(true);");
            ApplySelectListSearch();
            FadePageCover(false);
        } else { //Update
            var pWhereClause = "WHERE ID=" + pID;
            var pOrderBy = "ID DESC";
            var pPageNumber = 1;
            var pPageSize = 1;
            var pControllerParameters = {
                pIsLoadArrayOfObjects: false,
                pLanguage: $("[id$='hf_ChangeLanguage']").val(),
                pPageNumber: pPageNumber,
                pPageSize: pPageSize,
                pWhereClauseQR: pWhereClause,
                pOrderBy: pOrderBy
            }
            CallGETFunctionWithParameters("/api/Quotations/QR_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned", pControllerParameters
                , function (pData) {
                    var pQuotationRoute = JSON.parse(pData[0])[0];
                    $("#slRoutingsPOL").val(pQuotationRoute.POL);
                    $("#slRoutingsPOD").val(pQuotationRoute.POD);
                    $("#slCommodities").val(pQuotationRoute.CommodityID);
                    $("#slDivision").val(pQuotationRoute.DivisionID);
                    $("#slEquipmentType").val(pQuotationRoute.EquipmentTypeID);
                    $("#slEquipmentModel").val(pQuotationRoute.EquipmentModelID);
                    $("#txtRoutingCost").val(pQuotationRoute.Cost == 0 ? "" : pQuotationRoute.Cost);
                    $("#txtRoutingSale").val(pQuotationRoute.Sale == 0 ? "" : pQuotationRoute.Sale);
                    $("#txtRoutingsFreightRateFormat").val(pQuotationRoute.FreightRateFormat == 0 ? "" : pQuotationRoute.FreightRateFormat);
                    $("#txtRoutingsFreeTime").val(pQuotationRoute.FreeTime == 0 ? "" : pQuotationRoute.FreeTime);
                    $("#txtRoutingsTransientTime").val(pQuotationRoute.TransientTime == 0 ? "" : pQuotationRoute.TransientTime);
                    $("#txtRoutingsNotes").val(pQuotationRoute.Notes == 0 ? "" : pQuotationRoute.Notes);
                    $("#cbIsRevised").prop("checked", pQuotationRoute.IsRevised);
                    $("#lblIsChargesConfirmed").prop("checked", pQuotationRoute.IsChargesConfirmed);
                    //FleetQuotation_EquipmentTypeChanged();
                    ApplySelectListSearch();
                    FadePageCover(false);
                }
                , null);
            $("#btnSaveRouting").attr("onclick", "FleetQuotationDetails_Update(false);");
            $("#btnSaveandNewRouting").attr("onclick", "FleetQuotationDetails_Update(true);");
        }
    }
}

function FleetQuotationDetails_Insert(pSaveandAddNew) {
    debugger;
    //if (!Routings_CheckDatesLogic())
    //    swal(strSorry, strCheckDates);
    //else //check dates are not before open date
    //    if (
    //        ($("#txtExpectedDeparture").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtExpectedDeparture").val().trim())) < 0)
    //        || ($("#txtActualDeparture").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtActualDeparture").val().trim())) < 0)
    //        || ($("#txtExpectedArrival").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtExpectedArrival").val().trim())) < 0)
    //        || ($("#txtActualArrival").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtActualArrival").val().trim())) < 0)
    //        )
    //        swal(strSorry, "Dates must be after open date.");
    //    else
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    //if ($('#slRoutingsPOL').val() == $('#slRoutingsPOD').val() && $('#slRoutingsPOL').val() != "" && !$("#cbIsDomestic").prop("checked") && !$("#cbIsInland").prop("checked"))//check different ports
    //    swal(strSorry, strPOLEqualPODWarning);
    //else //check Domestic with POLCountry = PODCountry
    //    if ($('input[name=cbDirectionType]:checked').val() == 3 && $('#slRoutingsPOLCountries').val() != $('#slRoutingsPODCountries').val() && !$("#cbIsInland").prop("checked"))
    //        swal(strSorry, strDomesticWithDifferentCountriesWarning);
    //    else //check import or export with different countries
    //        if ($('input[name=cbDirectionType]:checked').val() != 3 && $('#slRoutingsPOLCountries').val() == $('#slRoutingsPODCountries').val() && !$('#slRoutingsPOLCountries').val() != "" && !$("#cbIsInland").prop("checked"))
    //            swal(strSorry, strImportOrExportWithSameCountriesWarning);
    //            //sherif: uncomment the next 2 lines to return back the expiration date validation
    //        else if ($("#txtRoutingsExpirationDate").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat(FormattedTodaysDate), ConvertDateFormat($("#txtRoutingsExpirationDate").val().trim())) < 1)
    //            swal("Sorry", "Expiration date must be after today.");
    //        else if ($("#txtRoutingsExpirationDate").val().trim() != "" && !isValidDate($("#txtRoutingsExpirationDate").val().trim(), 1))
    //            swal("Sorry", "Please, enter expiration date in the format DD/MM/YYYY.");
    //        else if ($("#txtRoutingsETAPOLDate").val().trim() != "" && !isValidDate($("#txtRoutingsETAPOLDate").val().trim(), 1))
    //            swal("Sorry", "Please, enter ETA POL Date in the format DD/MM/YYYY.");
    //        else
    if (ValidateForm("form", "RoutingModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pQuotationID: $("#hQuotationID").val()
            ,
            pRoutingTypeID: MainCarraigeRoutingTypeID //$('#slRoutingTypes option:selected').val()
            //, pDirectionType: $('input[name=cbDirectionType]:checked').val()
            //, pDirectionIconName: $("#hDirectionIconName").val()
            //, pDirectionIconStyle: $("#hDirectionIconStyle").val()
            ,
            pTransportType: InlandTransportType //$("#hRoutingTransportType").val()
            ,
            pTransportIconName: InlandIconName //$("#hRoutingTransportIconName").val()
            ,
            pTransportIconStyle: strInlandIconStyleClassName //$("#hRoutingTransportIconStyle").val()
            ,
            pPOLCountryID: $('#slRoutingsPOL option:selected').attr("CountryID") //$('#slRoutingsPOLCountries option:selected').val()
            ,
            pPOLID: $('#slRoutingsPOL option:selected').val()
            ,
            pPODCountryID: $('#slRoutingsPOD option:selected').attr("CountryID") //$('#slRoutingsPODCountries option:selected').val()
            ,
            pPODID: $('#slRoutingsPOD option:selected').val()

            ,
            pPickupAddress: ($("#txtPickupAddress").val().trim() == "" ? "0" : $("#txtPickupAddress").val().trim().toUpperCase())
            ,
            pDeliveryAddress: ($("#txtDeliveryAddress").val().trim() == "" ? "0" : $("#txtDeliveryAddress").val().trim().toUpperCase())
            ,
            pMoveTypeID: 0 //($('#slMoveTypes').val() == "" ? 0 : $('#slMoveTypes').val())

            ,
            pExpirationDate: ($("#txtRoutingsExpirationDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtRoutingsExpirationDate").val()))
            ,
            pETAPOLDate: "01/01/1900" //($("#txtRoutingsETAPOLDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtRoutingsETAPOLDate").val()))

            ,
            pShippingLineID: 0
            //($("#hRoutingTransportType").val() == OceanTransportType
            //? ($('#slRoutingsLines option:selected').val() == "" ? 0 : $('#slRoutingsLines option:selected').val())
            //: 0)
            ,
            pAirlineID: 0
            //($("#hRoutingTransportType").val() == AirTransportType
            //? ($('#slRoutingsLines option:selected').val() == "" ? 0 : $('#slRoutingsLines option:selected').val())
            //: 0)
            ,
            pTruckerID: 0
            //($("#hRoutingTransportType").val() == InlandTransportType
            //? ($('#slRoutingsLines option:selected').val() == "" ? 0 : $('#slRoutingsLines option:selected').val())
            //: 0)
            ,
            pTransientTime: ($("#txtRoutingsTransientTime").val() == "" ? 0 : $("#txtRoutingsTransientTime").val())
            ,
            pValidity: 0 //($("#txtRoutingsValidity").val() == "" ? 0 : $("#txtRoutingsValidity").val())
            ,
            pFreeTime: ($("#txtRoutingsFreeTime").val() == "" ? 0 : $("#txtRoutingsFreeTime").val())
            ,
            pFreeTimePOD: 0 //($("#txtRoutingsFreeTimePOD").val() == "" ? 0 : $("#txtRoutingsFreeTimePOD").val())
            ,
            pQuotationStageID: CreatedQuoteAndOperStageID //1
            ,
            pNotes: $("#txtRoutingsNotes").val().trim() == "" ? 0 : $("#txtRoutingsNotes").val().trim().toUpperCase()

            ,
            pCommodityID: $('#slCommodities').val() == "" ? 0 : $('#slCommodities').val()
            ,
            pIncotermID: 0 //$('#slIncoterm').val() == "" ? 0 : $('#slIncoterm').val()
            ,
            pEquipmentModelID: $('#slEquipmentModel').val() == "" ? 0 : $('#slEquipmentModel').val()
            ,
            pPOrC: 0 //$('#slPOrC').val() == "" ? 0 : $('#slPOrC').val()
            ,
            pCost: $("#txtRoutingCost").val() == "" ? 0 : $("#txtRoutingCost").val()
            ,
            pSale: $("#txtRoutingSale").val() == "" ? 0 : $("#txtRoutingSale").val()
            ,
            pDivisionID: $("#slDivision").val() == "" ? 0 : $("#slDivision").val()
            ,
            pEquipmentTypeID: $("#slEquipmentType").val() == "" ? 0 : $("#slEquipmentType").val()
            ,
            pFreightRateFormat: $("#txtRoutingsFreightRateFormat").val().trim() == "" ? 0 : $("#txtRoutingsFreightRateFormat").val().trim().toUpperCase()
            ,
            pClearancePortID: 0
            ,
            pPickupPlaceID: 0
            ,
            pPOLID_TransportID: 0
            ,
            pClientPlantID: 0
        }
        CallGETFunctionWithParameters("/api/Quotations/QR_Insert", pParametersWithValues
            , function (pData) {
                var _MailMessageReturned = pData[3];
                if (pData[0]) {
                    //if (pDefaults.IsDepartmentOption && _MailMessageReturned == "")
                    //    swal("Success", "Charges alert sent to related departments.");
                    //else if (pDefaults.IsDepartmentOption && _MailMessageReturned != "")
                    //    swal("Success", "Notifications sent to users but sending email to departments has the following problem: " + _MailMessageReturned);
                    //else
                    swal("Success", "Saved successfully.");
                    FleetQuotationDetails_BindTableRows(JSON.parse(pData[1]));
                    if (pSaveandAddNew)
                        FleetQuotationDetails_FillControls(0);
                    else {
                        //jQuery("#RoutingModal").modal("hide");
                        $("#hRoutingID").val(pData[2]);
                        $("#hQuotationRouteID").val(pData[2]);
                        $("#btnSaveRouting").attr("onclick", "FleetQuotationDetails_Update(false);");
                        $("#btnSaveandNewRouting").attr("onclick", "FleetQuotationDetails_Update(true);");
                    }
                } else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}

function FleetQuotationDetails_Update(pSaveandAddNew) {
    debugger;
    //getTodaysDateInddMMyyyyFormat()
    //($("#txtExpectedDeparture").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtExpectedDeparture").val().trim())) < 0)
    //if (!Routings_CheckDatesLogic())
    //    swal(strSorry, strCheckDates);
    //    else //check dates are not before open date
    //        if (!$("#cbIsImport").prop("checked") //No validation for import
    //            && (
    //                ($("#txtExpectedDeparture").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtExpectedDeparture").val().trim())) < 0)
    //                || ($("#txtActualDeparture").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtActualDeparture").val().trim())) < 0)
    //                || ($("#txtExpectedArrival").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtExpectedArrival").val().trim())) < 0)
    //                || ($("#txtActualArrival").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtActualArrival").val().trim())) < 0)
    //                )
    //            )
    //            swal(strSorry, "Dates must be after open date.");
    //else
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    //if ($('#slRoutingsPOL').val() == $('#slRoutingsPOD').val() && $('#slRoutingsPOL').val() != "" && !$("#cbIsDomestic").prop("checked") && !$("#cbIsInland").prop("checked"))//check different ports
    //    swal(strSorry, strPOLEqualPODWarning);
    //else //check Domestic with POLCountry = PODCountry
    //    if ($('input[name=cbDirectionType]:checked').val() == 3 && $('#slRoutingsPOLCountries').val() != $('#slRoutingsPODCountries').val())
    //        swal(strSorry, strDomesticWithDifferentCountriesWarning);
    //    else //check import or export with different countries
    //        if ($('input[name=cbDirectionType]:checked').val() != 3 && $('#slRoutingsPOLCountries').val() == $('#slRoutingsPODCountries').val() && $('#slRoutingsPOLCountries').val() != "" && !$("#cbIsInland").prop("checked"))
    //            swal(strSorry, strImportOrExportWithSameCountriesWarning);
    //            //sherif: uncomment then next 2 lines to return back the expiration date validation
    //        else if ($("#txtRoutingsExpirationDate").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat(FormattedTodaysDate), ConvertDateFormat($("#txtRoutingsExpirationDate").val().trim())) < 0)
    //            swal("Sorry", "Expiration can not be before today.");
    //        else if ($("#txtRoutingsExpirationDate").val().trim() != "" && !isValidDate($("#txtRoutingsExpirationDate").val().trim(), 1))
    //            swal("Sorry", "Please, enter expiration date in the format DD/MM/YYYY.");
    //        else if ($("#txtRoutingsETAPOLDate").val().trim() != "" && !isValidDate($("#txtRoutingsETAPOLDate").val().trim(), 1))
    //            swal("Sorry", "Please, enter ETA POL Date in the format DD/MM/YYYY.");
    //        else
    if (ValidateForm("form", "RoutingModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pRoutingID: $("#hRoutingID").val()
            ,
            pQuotationID: $("#hQuotationID").val()
            ,
            pRoutingTypeID: MainCarraigeRoutingTypeID //$('#slRoutingTypes option:selected').val()
            //, pDirectionType: $('input[name=cbDirectionType]:checked').val()
            //, pDirectionIconName: $("#hDirectionIconName").val()
            //, pDirectionIconStyle: $("#hDirectionIconStyle").val()
            ,
            pTransportType: InlandTransportType //$("#hRoutingTransportType").val()
            ,
            pTransportIconName: InlandIconName //$("#hRoutingTransportIconName").val()
            ,
            pTransportIconStyle: strInlandIconStyleClassName //$("#hRoutingTransportIconStyle").val()
            ,
            pPOLCountryID: $('#slRoutingsPOL option:selected').attr("CountryID") //$('#slRoutingsPOLCountries option:selected').val()
            ,
            pPOLID: $('#slRoutingsPOL option:selected').val()
            ,
            pPODCountryID: $('#slRoutingsPOD option:selected').attr("CountryID") //$('#slRoutingsPODCountries option:selected').val()
            ,
            pPODID: $('#slRoutingsPOD option:selected').val()

            ,
            pPickupAddress: ($("#txtPickupAddress").val().trim() == "" ? "0" : $("#txtPickupAddress").val().trim().toUpperCase())
            ,
            pDeliveryAddress: ($("#txtDeliveryAddress").val().trim() == "" ? "0" : $("#txtDeliveryAddress").val().trim().toUpperCase())
            ,
            pMoveTypeID: 0 //($('#slMoveTypes').val() == "" ? 0 : $('#slMoveTypes').val())

            ,
            pExpirationDate: ($("#txtRoutingsExpirationDate").val().trim() == "" ? "0" : $("#txtRoutingsExpirationDate").val().trim())
            ,
            pETAPOLDate: 0 //($("#txtRoutingsETAPOLDate").val().trim() == "" ? "0" : $("#txtRoutingsETAPOLDate").val().trim())

            ,
            pShippingLineID: 0
            //($("#hRoutingTransportType").val() == OceanTransportType
            //? ($('#slRoutingsLines option:selected').val() == "" ? 0 : $('#slRoutingsLines option:selected').val())
            //: 0)
            ,
            pAirlineID: 0
            //($("#hRoutingTransportType").val() == AirTransportType
            //? ($('#slRoutingsLines option:selected').val() == "" ? 0 : $('#slRoutingsLines option:selected').val())
            //: 0)
            ,
            pTruckerID: 0
            //($("#hRoutingTransportType").val() == InlandTransportType
            //? ($('#slRoutingsLines option:selected').val() == "" ? 0 : $('#slRoutingsLines option:selected').val())
            //: 0)
            ,
            pTransientTime: ($("#txtRoutingsTransientTime").val() == "" ? 0 : $("#txtRoutingsTransientTime").val())
            ,
            pValidity: 0 //($("#txtRoutingsValidity").val() == "" ? 0 : $("#txtRoutingsValidity").val())
            ,
            pFreeTime: ($("#txtRoutingsFreeTime").val() == "" ? 0 : $("#txtRoutingsFreeTime").val())
            ,
            pFreeTimePOD: 0 //($("#txtRoutingsFreeTimePOD").val() == "" ? 0 : $("#txtRoutingsFreeTimePOD").val())
            ,
            pNotes: $("#txtRoutingsNotes").val().trim() == "" ? 0 : $("#txtRoutingsNotes").val().trim().toUpperCase()

            ,
            pCommodityID: $('#slCommodities').val() == "" ? 0 : $('#slCommodities').val()
            ,
            pIncotermID: 0 //$('#slIncoterm').val() == "" ? 0 : $('#slIncoterm').val()
            ,
            pEquipmentModelID: $('#slEquipmentModel').val() == "" ? 0 : $('#slEquipmentModel').val()
            ,
            pPOrC: 0 //$('#slPOrC').val() == "" ? 0 : $('#slPOrC').val()
            ,
            pIsRevised: $("#cbIsRevised").prop("checked")
            ,
            pCost: $("#txtRoutingCost").val() == "" ? 0 : $("#txtRoutingCost").val()
            ,
            pSale: $("#txtRoutingSale").val() == "" ? 0 : $("#txtRoutingSale").val()
            ,
            pDivisionID: $("#slDivision").val() == "" ? 0 : $("#slDivision").val()
            ,
            pEquipmentTypeID: $("#slEquipmentType").val() == "" ? 0 : $("#slEquipmentType").val()
            ,
            pFreightRateFormat: $("#txtRoutingsFreightRateFormat").val().trim() == "" ? 0 : $("#txtRoutingsFreightRateFormat").val().trim().toUpperCase()
            ,
            pClearancePortID: 0
            ,
            pPickupPlaceID: 0
            ,
            pPOLID_TransportID: 0
            ,
            pClientPlantID: 0
        }
        CallGETFunctionWithParameters("/api/Quotations/QR_Update", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    FleetQuotationDetails_BindTableRows(JSON.parse(pData[1]));
                    if (pSaveandAddNew)
                        FleetQuotationDetails_FillControls(0);
                    else {
                        swal("Success", "Saved Successfully.");
                        jQuery("#RoutingModal").modal("hide");
                    }
                } else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}

function FleetQuotationDetails_DeleteList(callback) {
    //Confirmation message to delete
    var pRoutingsIDs = GetAllSelectedIDsAsString('tblRoutings');
    if (pRoutingsIDs != "")
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
                CallGETFunctionWithParameters("/api/Quotations/QR_Delete"
                    , {
                        pRoutingsIDs: pRoutingsIDs, pQuotationID: $("#hQuotationID").val()
                    }
                    , function (pData) {
                        FadePageCover(false);
                        FleetQuotationDetails_BindTableRows(JSON.parse(pData[1]));
                        if (!pData[0])
                            swal("Sorry", "All or some of the selected records are not deleted due to dependencies existence.");
                    }
                    , null);
            });
}

function FleetQuotationDetails_ApplyFreightRateToOrders() {
    debugger;
    if ($("#hRoutingID").val() == 0 || $("#hRoutingID").val() == "")
        swal("Sorry", "Please, save route first.");
    else {
        swal({
            title: "Are you sure?",
            text: "Trucking orders rates will be changed.",
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
                    pQuotationRouteIDToApplyToOrders: $("#hRoutingID").val()
                    , pIsApplyFreightRateToApprovedOrders: $("#cbIsApplyFreightRateToApprovedOrders").prop("checked")
                };
                CallGETFunctionWithParameters("/api/Quotations/FleetQuotationDetails_ApplyFreightRateToOrders", pParametersWithValues
                    , function (pData) {
                        var _ReturnedMessage = pData[0];
                        if (_ReturnedMessage == "")
                            swal("Success", "Related orders updated successfully");
                        else
                            swal("Sorry", _ReturnedMessage);
                        FadePageCover(false);
                    }
                    , null);
            }); //ConfirmationMessage
    }
}

function FleetQuotationDetails_ApplyPercentage() {
    debugger;
    if ($("#hQuotationID").val() == 0 || $("#hQuotationID").val() == "")
        swal("Sorry", "No details.");
    else if ($("#txtQuotationEditPercentage").val().trim() == 0 || $("#txtQuotationEditPercentage").val().trim() == "")
        swal("Sorry", "Please, enter percentage.");
    else {
        swal({
            title: "Are you sure?",
            text: "Percentage will be applied to related details.",
            type: "",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Apply",
            closeOnConfirm: false
        },
            //callback function in case of confirm delete
            function () {
                FadePageCover(true);
                let pParametersWithValues = {
                    pQuotationIDToApplyPercentage: $("#hQuotationID").val()
                    ,
                    pPercentage: $("#txtQuotationEditPercentage").val().trim() == "" ? 0 : $("#txtQuotationEditPercentage").val()
                };
                CallGETFunctionWithParameters("/api/Quotations/FleetQuotationDetails_ApplyPercentage", pParametersWithValues
                    , function (pData) {
                        let _ReturnedMessage = pData[0];
                        let pTableRows = JSON.parse(pData[1]);
                        if (_ReturnedMessage == "") {
                            FleetQuotationDetails_BindTableRows(pTableRows);
                            swal("Success", "Saved successfully");
                        } else
                            swal("Sorry", _ReturnedMessage);
                        FadePageCover(false);
                    }
                    , null);
            }); //ConfirmationMessage
    }
}

function FleetQuotationDetails_Export() {
    debugger;
    if ($("#hQuotationID").val() == "")
        swal("Sorry", "No Details");
    else {
        FadePageCover(true);
        let pParametersWithValues = {
            pHeaderID_ForExport: $("#hQuotationID").val()
        };
        CallGETFunctionWithParameters("/api/Quotations/LoadHeaderWithDetails_ForExport", pParametersWithValues
            , function (pData) {
                var pFleetQuotationHeader = JSON.parse(pData[0]);
                var pFleetQuotationDetails = JSON.parse(pData[1]);
                var pFileName = pFleetQuotationHeader.Code;
                ExportToExcel(pFleetQuotationDetails, "Code,POL,POD,Model,Commodity,Cost,Freight,Division", pFileName, null/*Excluded Columns*/);
                FadePageCover(false);
            }
            , null
            , true/*Default true*/);
    }
}

function FleetQuotation_EquipmentTypeChanged() {
    debugger;
    if ($("#slEquipmentType").val() == 0 || $("#slEquipmentType option:selected").text().split(' ')[0] == "Truck")
        $(".classHideForTrips").removeClass("hide");
    else {
        $(".classHideForTrips").addClass("hide");
        $("#slCommodities").val(0);
    }
}

/***************************************FleetApprovedTransportOrder**************************************/
//if pIsGroupedCutoff --> the IDs are for quotation route else transport orders
function FleetApprovedTransportOrder_BindTableRows(pTable) {
    debugger;
    ClearAllTableRows("tblApprovedTransportOrder");
    var _TableHeader = '<th id="HeaderDeleteApprovedTransportOrderID" style="width:5%;"><input id="cb-CheckAll-ApprovedTransportOrderDetails" onchange="FleetApprovedTransportOrder_GetCheckedItemsSummary();" type="checkbox" /></th>';
    _TableHeader += '<th>Code</th>';
    _TableHeader += '<th>POL</th>';
    _TableHeader += '<th>POD</th>';
    _TableHeader += '<th>Commodity</th>';
    _TableHeader += '<th>Equipment</th>';
    _TableHeader += '<th class="hide">Loading/Unloading</th>';
    _TableHeader += '<th>Orders Count</th>';
    _TableHeader += '<th>Freight Rate</th>';
    _TableHeader += '<th>Division</th>';
    if (!$("#cbIsGroupedCutoff").prop("checked")) {
        _TableHeader += '<th>Trans.Date</th>';
        _TableHeader += '<th>ApprovalDate</th>';
        _TableHeader += '<th>Invoice</th>';
    }
    _TableHeader += '<th class="rounded-right hide"></th>';
    $("#tblApprovedTransportOrder thead tr").html(_TableHeader);
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTable, function (i, item) {
        AppendRowtoTable("tblApprovedTransportOrder",
            ("<tr ID='" + item.QuotationRouteOrTransportOrderID + "' "
                + " class='" + (item.InvoiceNumber == "" ? "" : "text-primary") + "' "
                + (1 == 2 ? ("ondblclick='FleetQuotationDetails_FillControls(" + item.QuotationRouteOrTransportOrderID + ");'") : "") + ">"
                + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " onchange='FleetApprovedTransportOrder_GetCheckedItemsSummary();' type='checkbox' value='" + item.QuotationRouteOrTransportOrderID + "'></td>"
                //+ "<td class='QuotationID hide'>" + item.QuotationID + "</td>"
                + "<td class='ClientName hide'>" + item.ClientName + "</td>"
                + "<td class='QuotationRouteOrTrnasportOrderCode'>" + item.QuotationRouteOrTrnasportOrderCode + "</td>"
                //+ "<td class='POL hide'>" + item.POL + "</td>"
                //+ "<td class='POD hide'>" + item.POD + "</td>"
                + "<td class='POLName'>" + item.POLName + "</td>"
                + "<td class='PODName'>" + item.PODName + "</td>"
                //+ "<td class='CommodityID hide'>" + item.CommodityID + "</td>"
                + "<td class='CommodityName'>" + (item.CommodityName == 0 ? "" : item.CommodityName) + "</td>"
                + "<td class='EquipmentModelNameFromQuotation'>" + (item.EquipmentModelNameFromQuotation == 0 ? "" : item.EquipmentModelNameFromQuotation) + "</td>"
                + "<td class='Count' ID='txtCount" + item.QuotationRouteOrTransportOrderID + "'>" + item.Count + "</td>"
                + "<td class='Sale' ID='txtSale" + item.QuotationRouteOrTransportOrderID + "'>" + item.Sale + "</td>"
                + "<td class='DivisionName'>" + (item.DivisionName == 0 ? "" : item.DivisionName) + "</td>"
                + "<td class='GateOutDate " + (!$("#cbIsGroupedCutoff").prop("checked") ? "" : " hide ") + "'>" + item.GateOutDate + "</td>"
                + "<td class='ModificationDateString " + (!$("#cbIsGroupedCutoff").prop("checked") ? "" : " hide ") + "'>" + item.ModificationDateString + "</td>"
                + "<td class='InvoiceNumber " + (!$("#cbIsGroupedCutoff").prop("checked") ? "" : " hide ") + "'>" + (item.InvoiceNumber == 0 ? "" : item.InvoiceNumber) + "</td>"
                + "<td class='hide'><a href='#FleetQuotationDetailsModal' data-toggle='modal' onclick='FleetQuotationDetails_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "</tr>"));
    });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblApprovedTransportOrder", "ID", "cb-CheckAll-ApprovedTransportOrderDetails");
    CheckAllCheckbox("HeaderDeleteApprovedTransportOrderID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}

function FleetApprovedTransportOrder_GetWhereClauseItems(pID) {
    debugger;
    $("#spanSelectedCount").html("");
    var _WhereClause = "WHERE QuotationID=" + pID + " AND IsFleet=1 AND IsApproved=1 AND Sale>0 " + "\n"; // AND RoutingTypeID=60
    if ($("#cbIsRemoveInvoicedOrders").prop("checked")) {
        _WhereClause += "AND InvoiceNumber=" + ($("#txt-Search-InvoicedItems").val().trim() == "" ? 0 : $("#txt-Search-InvoicedItems").val().trim()) + " \n";
        _WhereClause += "AND Year(InvoiceDate)=" + $("#slFilterInvoiceYear").val() + " \n";
        _WhereClause += "AND (SELECT Invoices.IsApproved FROM Invoices WHERE Invoices.ID= vwRoutings.InvoiceID)=0" + " \n"; //Invoice is not approved
    } else
        _WhereClause += "AND InvoiceID IS NULL " + "\n";
    if ($("#slDivisionCutoff").val() != 0)
        _WhereClause += "AND DivisionID=" + $("#slDivisionCutoff").val() + "\n";
    if ($("#slPOLCutoff").val() != 0)
        _WhereClause += "AND POL=" + $("#slPOLCutoff").val() + "\n";
    if ($("#slPODCutoff").val() != 0)
        _WhereClause += "AND POD=" + $("#slPODCutoff").val() + "\n";
    if ($("#txtFleetTransportOrderFromDate").val() != "") {
        if (1 == 1 /*pDefaults.UnEditableCompanyName == "GBL"*/)
            _WhereClause += "AND CONVERT(date,GateOutDate,103)>='" + GetDateWithFormatyyyyMMdd($("#txtFleetTransportOrderFromDate").val()) + "'" + "\n";
        //else
        //    _WhereClause += "AND CreationDate>='" + GetDateWithFormatyyyyMMdd($("#txtFleetTransportOrderFromDate").val()) + "'" + "\n";
    }
    if ($("#txtFleetTransportOrderToDate").val() != "") {
        if (1 == 1 /*pDefaults.UnEditableCompanyName == "GBL"*/)
            _WhereClause += "AND CONVERT(date,GateOutDate,103) <= '" + GetDateWithFormatyyyyMMdd($("#txtFleetTransportOrderToDate").val()) + "'" + "\n";
        //else
        //    _WhereClause += "AND CAST(CreationDate AS DATE) <= '" + GetDateWithFormatyyyyMMdd($("#txtFleetTransportOrderToDate").val()) + "'" + "\n";
    }
    return _WhereClause;
}

function FleetApprovedTransportOrder_CreateInvoice() {
    debugger;
    if (!$("#cbIsGroupedCutoff").prop("checked") && !$("#cbIsByTransportOrderCutoff").prop("checked"))
        swal("Sorry", "Creating invoice doesn't work for that option.");
    else {
        var pApprovedQuotationRouteOrTransportOrderIDs = GetAllSelectedIDsAsString('tblApprovedTransportOrder');
        if (pApprovedQuotationRouteOrTransportOrderIDs == "")
            swal("Sorry", "Please, select items.");
        else if (pDefaults.UnEditableCompanyName == "GBL"
            && ($("#slTransactionTypeCutoff").val() == 0 || $("#slPaymentTermCutoff").val() == 0)
        )
            swal("Sorry", "Please, select transaction type and payment term.");
        else
            //Confirmation Message
            swal({
                title: "Are you sure?",
                text: "Invoice will be created.",
                type: "",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Create",
                closeOnConfirm: false
            },
                function () {
                    FadePageCover(true);
                    var pFunctionName = "/api/Quotations/FleetQuotation_CreateCutoffInvoice";
                    var pParametersWithValues = {
                        pApprovedQuotationRouteOrTransportOrderIDs: pApprovedQuotationRouteOrTransportOrderIDs
                        ,
                        pFromDate: GetDateWithFormatyyyyMMdd($("#txtFleetTransportOrderFromDate").val())
                        ,
                        pCutOffDate: GetDateWithFormatyyyyMMdd($("#txtFleetTransportOrderToDate").val())
                        ,
                        pTransactionTypeID: $("#slTransactionTypeCutoff").val() == "" ? 0 : $("#slTransactionTypeCutoff").val()
                        ,
                        pPaymentTermID: $("#slPaymentTermCutoff").val() == "" ? 0 : $("#slPaymentTermCutoff").val()
                        ,
                        pTaxTypeID: $("#slTaxTypeCutoff").val() == "" ? 0 : $("#slTaxTypeCutoff").val()
                        ,
                        pTaxPercentage: $("#slTaxTypeCutoff").val() == 0 ? 0 : $("#slTaxTypeCutoff option:selected").attr("CurrentPercentage")
                        ,
                        pIsGroupedCutoff: $("#cbIsGroupedCutoff").prop("checked")
                        ,
                        pEditableNotes: $("#txtEditableNotesToInvoiceCutoff").val().trim() == "" ? 0 : $("#txtEditableNotesToInvoiceCutoff").val().trim().toUpperCase()
                    }
                    CallPOSTFunctionWithParameters(pFunctionName, pParametersWithValues
                        , function (pData) {
                            var _ReturnedMessage = pData[0];
                            var _InvoiceHeader = JSON.parse(pData[1]);
                            var _InvoiceItem = JSON.parse(pData[2]);
                            if (_ReturnedMessage == "") {
                                FleetApprovedTransportOrder_PrintInvoice(pData);
                                swal("Success", _InvoiceHeader.ConcatenatedInvoiceNumber + " created successfully.");
                                jQuery("#FleetApprovedTransportOrderModal").modal("hide");
                            } else {
                                swal("Sorry", _ReturnedMessage);
                            }
                            FadePageCover(false);
                        }
                        , null);
                });
    }
}

function FleetApprovedTransportOrder_AddInvoicedOrders() {
    debugger;
    var pTransportOrderIDsToAdd = GetAllSelectedIDsAsString('tblApprovedTransportOrder');
    if (pTransportOrderIDsToAdd == "")
        swal("Sorry", "Please, select items.");
    else if ($("#slFleetInvoiceToAddItems").val() == "" || $("#slFleetInvoiceToAddItems").val() == 0)
        swal("Sorry", "Please, select invoice.");
    else {
        swal({
            title: "Are you sure?",
            text: "The selected invoice will be changed.",
            type: "",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Apply",
            closeOnConfirm: true
        },
            //callback function in case of confirm delete
            function () {
                FadePageCover(true);
                var pParametersWithValues = {
                    pTransportOrderIDsToAdd: pTransportOrderIDsToAdd
                    , pInvoiceID: $("#slFleetInvoiceToAddItems").val()
                };
                CallPOSTFunctionWithParameters("/api/Quotations/FleetApprovedTransportOrder_AddInvoicedOrders", pParametersWithValues
                    , function (pData) {
                        var _ReturnedMessage = pData[0];
                        if (_ReturnedMessage == "") {
                            FleetQuotation_FillAllControls(0, 0);
                            FleetApprovedTransportOrder_PrintInvoice(pData);
                            jQuery("#SelectInvoiceModal").modal("hide");
                        } else {
                            swal("Sorry", _ReturnedMessage);
                            FadePageCover(false);
                        }
                    }
                    , null);
            }); //ConfirmationMessage
    }
}

function FleetApprovedTransportOrder_OpenModalToAddOrders() {
    debugger;
    var pTransportOrderIDsToAdd = GetAllSelectedIDsAsString('tblApprovedTransportOrder');
    if (!$("#cbIsByTransportOrderCutoff").prop("checked"))
        swal("Sorry", "Adding items is only from the separated option.");
    else if (pTransportOrderIDsToAdd == "")
        swal("Sorry", "Please, select items.");
    else {
        FadePageCover(true);
        $("#slFleetInvoiceToAddItems").html("<option value=''><--Select--></option>");
        var pWhereClause = "WHERE IsApproved=0 AND IsFleet=1 AND IsDeleted=0 AND InvoiceTypeCode<>N'CREDITMEMO' " + " \n";
        pWhereClause += "AND PartnerTypeID=1 AND PartnerID=" + $("#slCustomer_FleetQuotation").val() + " \n";
        jQuery("#SelectInvoiceModal").modal("show");
        CallGETFunctionWithParameters("/api/Invoices/LoadAll", { pWhereClause: pWhereClause }
            , function (pData) {
                Fill_SelectInputAfterLoadData_WithMultiAttr(pData[0], 'ID', 'ConcatenatedInvoiceNumber', '<--Select-->', '#slFleetInvoiceToAddItems', '', '');
                FadePageCover(false);
            }
            , null);
    }
}

function FleetApprovedTransportOrder_RemoveInvoicedOrders() {
    debugger;
    var pTransportOrderIDsToRemove = GetAllSelectedIDsAsString('tblApprovedTransportOrder');
    if (pTransportOrderIDsToRemove == "")
        swal("Sorry", "Please, select items.");
    else {
        swal({
            title: "Are you sure?",
            text: "The selected invoice will be changed.",
            type: "",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Apply",
            closeOnConfirm: true
        },
            //callback function in case of confirm delete
            function () {
                FadePageCover(true);
                var pParametersWithValues = {
                    pTransportOrderIDsToRemove: pTransportOrderIDsToRemove
                };
                CallPOSTFunctionWithParameters("/api/Quotations/FleetApprovedTransportOrder_RemoveInvoicedOrders", pParametersWithValues
                    , function (pData) {
                        var _ReturnedMessage = pData[0];
                        if (_ReturnedMessage == "") {
                            FleetQuotation_FillAllControls(0, 0);
                            FleetApprovedTransportOrder_PrintInvoice(pData);
                        } else {
                            swal("Sorry", _ReturnedMessage);
                            FadePageCover(false);
                        }
                    }
                    , null);
            }); //ConfirmationMessage
    }
}

function FleetApprovedTransportOrder_PrintInvoice(pData) {
    debugger;
    var pInvoiceHeader = JSON.parse(pData[1]);
    var pInvoiceItem = JSON.parse(pData[2]);
    var pClientHeader = JSON.parse(pData[3]);
    var pFleetOrders = JSON.parse(pData[4]);

    if (pFleetOrders.length > 0) {
        var pOption = "Print";
        var pInvoiceDate = ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate));
        var pInvoiceDueDate = ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.DueDate));
        if (pInvoiceHeader.IsFleet && pDefaults.IsTaxOnItems) {
            debugger;
            var ReportHTML = '';
            //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
            //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';

            //ReportHTML += '                 <div class="col-xs-12 text-center ' + (pDefaults.UnEditableCompanyName == "GBL" ? " m-t-lg " : "") + '"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + ' ' + (pInvoiceHeader.IsApproved ? $("#slInvoiceOriginal").val() : (pDefaults.UnEditableCompanyName == "GBL" ? " (Draft) " : "")) + '</h3></div>';
            if (pDefaults.UnEditableCompanyName == "GBL")
                ReportHTML += '                 <div class="col-xs-12 text-center m-t-lg"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + pInvoiceDate.substr(6, 4) + ' '
                    + "(Draft)"
                    //+ (!pInvoiceHeader.IsApproved
                    //    ? "(Draft)"
                    //    : (pInvoiceHeader.IsApproved && pInvoiceHeader.IsPrintOriginal
                    //            ? "(Original)"
                    //            : (pInvoiceHeader.IsApproved && !pInvoiceHeader.IsPrintOriginal && $("#slInvoiceOriginal").val() == ""
                    //                ? "(Copy)"
                    //                : $("#slInvoiceOriginal").val())
                    //        )
                    //  )
                    + '</h3></div>';
            else
                ReportHTML += '                 <div class="col-xs-12 text-center"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + pInvoiceDate.substr(6, 4) + ' ' + (pInvoiceHeader.IsApproved ? $("#slInvoiceOriginal").val() : "") + '</h3></div>';

            //if (!(pDefaults.UnEditableCompanyName == "MEL" && pInvoiceHeader.InvoiceTypeName == "SW")) //Dont print for Safena
            //    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '</h3></div>';
            //else { //i.e. (pDefaults.UnEditableCompanyName == "SAF" && pInvoiceTypeCode == "DRAFT") {
            //    ReportHTML += '             <div style="position:absolute;left:50px;top:170px;">';
            //    ReportHTML += '             <img src="/Content/Images/DraftWaterMark.jpg" alt="logo" width=612px; height=200px;></div>';
            //}
            ////ReportHTML += '             <div style="clear:both;"><br></div>';
            //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';

            ReportHTML += '         <div class="col-xs-12 m-t">';

            ReportHTML += '             <div class="col-xs-8">';
            ReportHTML += '                 <b>Bill to: </b>' + pClientHeader.Name;
            if (pDefaults.UnEditableCompanyName == "GBL") {
                ReportHTML += '                 <br><b>Address: </b>' + (pClientHeader.Address == 0 ? "" : pClientHeader.Address.replace(/\n/g, "<br/>"));
            }
            ReportHTML += '             </div>';
            ReportHTML += '             <div class="col-xs-4">';
            ReportHTML += '                 <b>Billing Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
            ReportHTML += '                 <b>Billing Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
            ReportHTML += '             </div>';
            //if (pInvoiceTypeCode == "DRAFT") {
            //    ReportHTML += '             <div style="position:absolute;left:50px;top:250px;">';
            //    ReportHTML += '             <img src="/Content/Images/DraftWaterMark.jpg" alt="logo" width=612px; height=200px;></div>';
            //}

            ReportHTML += '                 <div class="col-xs-12 clear"><hr style="border:solid #000 1px;" /></div>';

            //ReportHTML += '         <div class="col-xs-6"><b>Operation: </b>' + (pOperationHeader.Code == 0 ? "" : pOperationHeader.Code) + '</div>';
            //if ($("#cbPrintMBL").prop("checked"))
            //    ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
            //if ($("#cbPrintHBL").prop("checked")) {
            //    if (pHouseBLs != "0")//Master Operation so show all houses on it
            //        ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
            //    else if (pHouseNumber != "0")
            //        ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
            //}
            if (pFleetOrders != null)
                ReportHTML += '         <div class="col-xs-6"><b>Division: </b>' + (pFleetOrders[0].DivisionName == 0 ? "" : pFleetOrders[0].DivisionName) + '</div>';
            ReportHTML += '             <div class="col-xs-12" style="clear:both;"><b>Notes: </b>' + (pInvoiceHeader.EditableNotes == 0 ? "" : pInvoiceHeader.EditableNotes) + '</div>';

            //if (pInvoiceItem.length > 0 && pDefaults.UnEditableCompanyName == "GBL")
            //    if (pInvoiceItem[0].TruckingOrderID != 0) {
            //        ReportHTML += '         <div class="col-xs-6"><b>Loading Zone: </b>' + (pInvoiceItem[0].LoadingZoneName == 0 ? "N/A" : pInvoiceItem[0].LoadingZoneName) + '</div>';
            //        ReportHTML += '         <div class="col-xs-6"><b>First Curing Zone: </b>' + (pInvoiceItem[0].FirstCuringAreaName == 0 ? "" : pInvoiceItem[0].FirstCuringAreaName) + '</div>';
            //        ReportHTML += '         <div class="col-xs-6"><b>Second Curing Zone: </b>' + (pInvoiceItem[0].SecondCuringAreaName == 0 ? "" : pInvoiceItem[0].SecondCuringAreaName) + '</div>';
            //        ReportHTML += '         <div class="col-xs-6"><b>Third Curing Zone: </b>' + (pInvoiceItem[0].ThirdCuringAreaName == 0 ? "" : pInvoiceItem[0].ThirdCuringAreaName) + '</div>';
            //    }

            if ($("#cbLargeInvoice").prop("checked")) {
                ReportHTML += '         <div class="m-l" style="clear:both;"><h3><br><br><br>Please, see attachment.</h3></div>';
                ReportHTML += '         <div class="break"></div>';
            }

            ReportHTML += '                     <div class="col-xs-12 clear">';
            ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
            ReportHTML += '                             <thead>';
            ReportHTML += '                                 <tr>';
            if (pDefaults.UnEditableCompanyName == "SAF" || pDefaults.UnEditableCompanyName == "MEL" || pDefaults.UnEditableCompanyName == "GBL")
                ReportHTML += '                                     <th>Item</th>';
            ReportHTML += '                                     <th>Description</th>';
            ReportHTML += '                                     <th>Qty</th>';
            ReportHTML += '                                     <th>Unit Price</th>';
            if (pDefaults.UnEditableCompanyName == "GBL")
                ReportHTML += '                                     <th>SubTotal</th>';
            else
                ReportHTML += '                                     <th>WHT</th>';
            ReportHTML += '                                     <th>VAT</th>';
            ReportHTML += '                                     <th>Total</th>';
            ReportHTML += '                                 </tr>';
            ReportHTML += '                             </thead>';
            ReportHTML += '                             <tbody>';
            var _TotalTaxOnItems = 0;
            var _TotalDiscountOnItems = 0;
            $.each(pFleetOrders, function (i, item) {
                _TotalTaxOnItems += item.TaxAmount;
                _TotalDiscountOnItems += item.DiscountAmount;
                ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                if (pDefaults.UnEditableCompanyName == "SAF" || pDefaults.UnEditableCompanyName == "MEL" || pDefaults.UnEditableCompanyName == "GBL")
                    ReportHTML += '                                         <td>' + (i + 1) + '</td>';
                ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 && item.ChargeTypeLocalName != undefined ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes.replace(/\n/g, "<br/>")) : "") + '</td>';
                ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                ReportHTML += '                                         <td>' + item.SalePrice.toFixed(2) + '</td>';
                if (pDefaults.UnEditableCompanyName == "GBL")
                    ReportHTML += '                                         <td>' + item.AmountWithoutVAT.toFixed(2) + '</td>';
                else
                    ReportHTML += '                                         <td>' + item.DiscountAmount.toFixed(2) + '</td>';
                ReportHTML += '                                         <td>' + item.TaxAmount.toFixed(2) + '</td>';
                ReportHTML += '                                         <td>' + (item.AmountWithoutVAT + item.TaxAmount).toFixed(2) + '</td>';
                //ReportHTML += '                                         <td>' + (item.Notes == "0" ? "" : item.Notes) + '</td>';
                ReportHTML += '                                     </tr>';
            });
            if (pInvoiceHeader.FixedDiscount > 0) {
                ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                ReportHTML += '                                         <td>' + '' + '</td>';
                ReportHTML += '                                         <td style="text-align:left;">' + 'Special Discount' + '</td>';
                ReportHTML += '                                         <td>' + '' + '</td>';
                ReportHTML += '                                         <td colspan=4>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                //ReportHTML += '                                         <td>' + _TotalTaxOnItems + '</td>';
                //ReportHTML += '                                         <td>' + '' + '</td>';
                ReportHTML += '                                     </tr>';
            }
            //ReportHTML += '                                         <tr>';
            //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
            //ReportHTML += '                                             <td><b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></td>';
            //ReportHTML += '                                             <td>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</td>';
            //ReportHTML += '                                         </tr>';
            //$("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")

            //ReportHTML += '                                         <tr>';
            //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
            //ReportHTML += '                                             <td><b>Total Amount : ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
            //ReportHTML += '                                         </tr>';
            ReportHTML += '                             </tbody>';
            ReportHTML += '                         </table>';
            ReportHTML += '                     </div>'

            ReportHTML += '                         <div class="row"></div>';

            ReportHTML += '                         <div class="col-xs-8 m-t">';
            if (pDefaults.UnEditableCompanyName == "GBL") {
                ReportHTML += "&emsp;";
            }
            //else if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
            //    ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
            //    ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
            //    ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
            //    ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
            //    ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
            //    ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
            //}
            //else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
            //    ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
            //    ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
            //}
            else
                ReportHTML += '                             <br>';
            ReportHTML += '                         </div>';
            ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
            if (_TotalTaxOnItems != 0 || _TotalDiscountOnItems != 0) {
                ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                //ReportHTML += '                             <b>VAT: </b>' + (_TotalTaxOnItems - _TotalDiscountOnItems).toFixed(2) + '</br>';
                if (_TotalTaxOnItems != 0)
                    ReportHTML += '                             <b>VAT: </b>' + (_TotalTaxOnItems).toFixed(2) + '</br>';
                if (_TotalDiscountOnItems != 0)
                    ReportHTML += '                             <b>WHT: </b>' + (_TotalDiscountOnItems).toFixed(2) + '</br>';
            }
            ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + pInvoiceHeader.Amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></br>';
            ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
            //if ($("#cbPrintUSDTotal").prop("checked") && $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text().trim() == "EGP")
            //    ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toFixed(2) + '</b></br>';
            ReportHTML += '                         </div>';

            //ReportHTML += '                     </div>'; //of table-responsive
            //ReportHTML += '                 </section>';
            //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
            ReportHTML += '             </div>';
            ReportHTML += '         </body>';

            //ReportHTML += '                 <div class="col-xs-12 m-t m-l" style="clear:both;"><b>Invoice considered paid if a stamped receipt issued</b></div>';
            //ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
            //ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
            //ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
            //ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
            //ReportHTML += '                 </div>'
            //ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
            //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
            //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
            //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
            //ReportHTML += '                 </div>';
            //if ($("#cbPrintStamp").prop("checked") && pInvoiceTypeCode != "DRAFT")
            //    ReportHTML += '         <div class="text-left m-l-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';
            //if (pInvoiceHeader.InvoiceTypeName != "DN" && pDefaults.UnEditableCompanyName != "GBL"
            //    && pDefaults.UnEditableCompanyName != "ACS" && pDefaults.UnEditableCompanyName != "WAV"
            //    && pDefaults.UnEditableCompanyName != "MEL") {
            //    ReportHTML += '                     <div class="col-xs-12 m-t-lg text-center"><b>' + '   لا يعتد بالفاتورة إلا بعد استلام إيصال السداد   ' + '</b></div>';
            //    ReportHTML += '                     <div class="col-xs-12 text-center"><b>' + '   الشركة تخضع لنظام الدفعات المقدمة   ' + '</b></div>';
            //}

            ReportHTML += '     <footer class="footer col-xs-12 m-t-lg" style="width:100%; position:absolute; bottom:0;">';
            if (pDefaults.UnEditableCompanyName == "GBL") {
                ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                ReportHTML += '                             Account Name: GB LOGISTICS S A E ' + '</br>';
                ReportHTML += '                             Bank Name: SOCIETE ARABE INTERNATIONALE DE BANQUE' + '</br>';
                ReportHTML += '                             Account number : 0220-3010314-10010 EGP / 0205-3010314-10010 CHF / 0203-3010314-10010 EUR' + '</br>';
                ReportHTML += '                             Account Type : CURRENT ACCOUNT' + '</br>';
                ReportHTML += '                             Branch Name : SHOOTING CLUB' + '</br>';
                ReportHTML += '                             Branch Address : 50 SHOOTING CLUB ST. DOKKI GIZA, Cairo, Egypt' + '</br>';
                //ReportHTML += '                             Country : Egypt' + '</br>';
                //ReportHTML += '                             Town/City : Cairo' + '</br>';
                ReportHTML += '                             Swift Code : SBNKEGCXXXX' + '</br></br>';

                ReportHTML += '                             Bank Name: Abu Dhabi Islamic Bank-Egypt ' + '</br>';
                ReportHTML += '                             Bank Address : 54 Lebanon str., Giza, Egypt' + '</br>';
                ReportHTML += '                             Account number : 100000603372 USD' + '</br>';
                ReportHTML += '                             Swift Code : ABDIEGCAXXX' + '</br>';
                ReportHTML += '                             IBAN: EG900030552400000100000603372' + '</br>';

                ReportHTML += '                     <br><br><div style="font-size:12px;" class="col-xs-12 text-center"><b>' + '   برجاء عدم استقطاع او خصم أي مبالغ مالية تحت حساب الضريبة حيث أن الشركة تخضع لنظام الدفعات المقدمة عن الفترة الضريبية من 1/1/2021 حتى 31/12/2021   ' + '</b></div><br><br>';
                //ReportHTML += '                     <div style="font-size:12px;" class="col-xs-12 m-t-lg text-center"><b>' + '   شكرا لتعاونكم   ' + '</b></div>';
            }
            //ReportHTML += '         <div class="row text-right m-r m-t">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
            //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
            //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
            //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
            //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
            //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
            if ($("#cbPrintFooterInvoice").prop("checked"))
                ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter' + (pInvoiceHeader.InvoiceTypeName == "DN" ? "-Debit" : "") + '.jpg" alt="footer"/></div>';
            else
                ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
            ReportHTML += '     </footer>';
            ReportHTML += '</html>';
            if (pOption == "Print" || pOption == undefined || pOption == null) {
                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            } else if (pOption == "Email") {
                if (pClientHeader.Email != "0" && pClientHeader.Email != "")
                    SendPDFEmail_General("Invoice", pClientHeader.Email, ReportHTML, "Invoice", null);
                else {
                    swal("Sorry", "Please, check receiver email.");
                    FadePageCover(false);
                }
            }
        } //if (pInvoiceHeader.IsFleet && pDefaults.IsTaxOnItems) {
    } //EOF if (pFleetOrders.length > 0) {
    else {
        swal("Warning", "All orders removed from this invoice.");
        FadePageCover(false);
    }
}

function FleetApprovedTransportOrder_Reject() {
    debugger;
    var pRejectedIDs = GetAllSelectedIDsAsString('tblApprovedTransportOrder');
    if (pRejectedIDs != "")
        swal({
            title: "Are you sure?",
            text: "This will apply to all selected records.",
            type: "",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Apply",
            closeOnConfirm: true
        },
            function () {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/TruckingOrders/Reject"
                    , { pRejectedIDs: pRejectedIDs }
                    , function (pData) {
                        var _ReturnedMessage = pData[0];
                        var pCreatorIDsList = pData[1];
                        if (pData[0] == "") {
                            var pTruckingOrderCode = "";
                            $('#tblApprovedTransportOrder  > tbody > tr').each(function () {
                                if ($(this).find('input[name="Delete"]:checked').length > 0) {
                                    pTruckingOrderCode += $(this).find('td.QuotationRouteOrTrnasportOrderCode').text() + " (" + $(this).find('td.ClientName').text() + ")" + " - ";
                                }
                            });

                            swal("Success", "Rejected successfully.");
                            FleetQuotation_FillAllControls(0, 0);

                            var pSubject = "Trucking Orders Rejected";
                            var pBody = "Trucking orders " + pTruckingOrderCode.slice(0, -2) + " rejected.";

                            Receptionists_GetAvailableUsers("WHERE ID IN(" + pCreatorIDsList + ") ORDER BY Name");
                            //SendNormalAndLocalEmail(pSubject, pBody, pOperationID, pIsSendNormalEmail);
                            $("#btnCheckboxesListApply").attr("onclick", "SendNormalAndLocalEmail('" + pSubject + "','" + pBody + "',0,false);");
                            $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
                        } else {
                            FadePageCover(false);
                            swal("Sorry", _ReturnedMessage);
                        }
                    });
            });
}

function FleetApprovedTransportOrder_GetCheckedItemsSummary() {
    debugger;
    var pSelectedCount = 0;
    var pSelectedSale = 0.0;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblApprovedTransportOrder');
    for (var i = 0; i < pSelectedIDs.split(',').length; i++) {
        pSelectedCount += parseInt($("#txtCount" + pSelectedIDs.split(',')[i]).text());
        pSelectedSale += parseFloat($("#txtSale" + pSelectedIDs.split(',')[i]).text());
    }
    $("#spanSelectedCount").html("&emsp;(Selected Count : " + pSelectedCount + " - Selected Freight : " + pSelectedSale + ")");
}

/********************************QuotationApproval***************************************/
function QuotationApproval_GetAvailableUsers() {
    debugger;
    if (IsNull($('#hQuotationApprovalUsersIDs').val(), '0') == 0) {
        CallGETFunctionWithParameters("/api/UserPrivileges/LoadAll", {
            pWhereClause: "WHERE ImageName='QuotationApproval' AND CanEdit=1"
        }
            , function (pData) {
                if (pData) {
                    debugger;
                    var data = JSON.parse(pData);
                    var IDsLst = [];
                    for (var i = 0; i < data.length; i++) {
                        IDsLst.push(data[i].UserID);
                    }
                    $('#hQuotationApprovalUsersIDs').val(IDsLst.toString());
                }
            }
            , null, false);
    }

    $("#CheckboxesListModal #txtSearchItems").val('');
    Receptionists_GetAvailableUsers(null, '' + $('#hQuotationApprovalUsersIDs').val() + '');
    $("#btnCheckboxesListApply").attr("onclick", "QuotationApproval_RequestApproval();");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers(null,'" + $('#hQuotationApprovalUsersIDs').val() + "');");
}
function QuotationApproval_RequestApproval() {
    debugger;
    var receiverIDs = [];
    $("#CheckboxesListModal input[type=checkbox]").each(function () {
        if ($(this).is(':checked'))
            receiverIDs.push($(this).val());
    });
    if ($("#hQuotationRouteID").val() == "") {
        swal("Sorry", "Please, save basic data first.");
        return;
    }
    if (receiverIDs.length == 0) {
        swal("Sorry", "Please, select receiver first.");
        return;
    }
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Quotations/QuotationApproval_RequestApproval"
            , {
                pQuotationRouteID_ToRequestApproval: $("#hQuotationRouteID").val()
                , pReceiverIDs: receiverIDs.toString()
                , pActionID: 3
                , pActionName: 'RequestApproval'
            }
            , function (pData) {
                let pReturnedMessage = pData[0];
                let pMailMessageReturned = pData[1];
                let pQuotationRoute = JSON.parse(pData[2]);
                if (pReturnedMessage != "")
                    swal("Sorry", pReturnedMessage);
                //else if (pMailMessageReturned != "")
                //    swal("Alarm sent, but email is not sent", pMailMessageReturned);
                else
                    swal("Success", "Saved successfully.");
                Routings_BindTableRows(pQuotationRoute);
                FadePageCover(false);
            }
            , null
            , true/*Default true*/);
    }
}

function QuotationApproval_ApprovalChanged() {
    debugger;
    if ($("#cbIsRejected").prop("checked"))
        $("#txtRejectionReason").parent().removeClass("hide");
    else
        $("#txtRejectionReason").parent().addClass("hide");
}

function QuotationApproval_SetApproval() {
    debugger;
    var receiverIDs = [];
    $("#CheckboxesListModal input[type=checkbox]").each(function () {
        if ($(this).is(':checked'))
            receiverIDs.push($(this).val());
    });
    if ($("#cbIsRejected").prop("checked") && $("#txtRejectionReason").val().trim() == "")
        swal("Sorry", "Please, enter rejection reason.");
    else if (pDefaults.UnEditableCompanyName == "MED" && receiverIDs.length == 0)
        swal("Sorry", "Please, select receiver user.");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Quotations/QuotationApproval_SetApproval"
            , {
                pQuotationRouteID: $("#hQuotationRouteID").val()
                ,
                pIsApproved: $("#cbIsRejected").prop("checked") ? false : true
                ,
                pRejectionReason: $("#txtRejectionReason").val().trim() == "" ? "0" : $("#txtRejectionReason").val().trim().toUpperCase()
                , pActionID: 4
                , pActionName: 'SetApproval'
                , pReceiverIDs: receiverIDs.toString()
            }
            , function (pData) {
                let pReturnedMessage = pData[0];
                let pMailMessageReturned = pData[1];
                let pQuotationRoute = JSON.parse(pData[2]);
                if (pReturnedMessage != "")
                    swal("Sorry", pReturnedMessage);
                //else if (pMailMessageReturned != "")
                //    swal("Alarm sent, but email is not sent", pMailMessageReturned);
                else
                    swal("Success", "Saved successfully.");
                Routings_BindTableRows(pQuotationRoute);
                FadePageCover(false);
            }
            , null
            , true/*Default true*/);
    }
}

/*****************************Insert From Operations********************************************/
function Operations_InsertFromOperations(pControlID) {
    debugger;
    ClearAll("#InsertFromOperationsModal");
    if (pControlID == "ChargeType") {
        $("#lblShownInsertFromOperations").html(": Charge");
        $("#txtCodeFromOperations").attr("data-required", true);
        $("#txtCodeFromOperations").parent().removeClass("hide");
    } else if (pControlID == "slRoutingsPOL") {
        $("#lblShownInsertFromOperations").html(": POL");
        $("#txtCodeFromOperations").attr("data-required", true);
        $("#txtCodeFromOperations").parent().removeClass("hide");
        $("#slCountryFromOperations").html($("#" + pControlID + "Countries").html());
        $("#slCountryFromOperations").attr("data-required", true);
        $("#slCountryFromOperations").parent().removeClass("hide");
    } else if (pControlID == "slRoutingsPOD") {
        $("#lblShownInsertFromOperations").html(": POD");
        $("#txtCodeFromOperations").attr("data-required", true);
        $("#txtCodeFromOperations").parent().removeClass("hide");
        $("#slCountryFromOperations").html($("#" + pControlID + "Countries").html());
        $("#slCountryFromOperations").attr("data-required", true);
        $("#slCountryFromOperations").parent().removeClass("hide");
    }
    //else if (pControlID == "slOperationVessels") {
    //    $("#lblShownInsertFromOperations").html(": Vessel");
    //    $("#txtCodeFromOperations").attr("data-required", true);
    //    $("#txtCodeFromOperations").parent().removeClass("hide");
    //    $("#slCountryFromOperations").attr("data-required", false);
    //    $("#slCountryFromOperations").parent().addClass("hide");
    //}
    else if (pControlID == "slRoutingsLines" && $("#cbIsInland").prop("checked")) {
        $("#lblShownInsertFromOperations").html(": Trucker");
        $("#txtCodeFromOperations").attr("data-required", false);
        $("#txtCodeFromOperations").parent().addClass("hide");
        $("#slCountryFromOperations").attr("data-required", false);
        $("#slCountryFromOperations").parent().addClass("hide");
    } else if (pControlID == "slRoutingsLines") {
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
        if (pControlID == "slRoutingsPOL" || pControlID == "slRoutingsPOD") {
            pStrFunctionName = "/api/Ports/InsertFromOpertions";
            pParameters = {
                pCodeFromOperations: $("#txtCodeFromOperations").val().trim() == "" ? 0 : $("#txtCodeFromOperations").val().trim().toUpperCase()
                ,
                pNameFromOperations: $("#txtNameFromOperations").val().trim() == "" ? 0 : $("#txtNameFromOperations").val().trim().toUpperCase()
                ,
                pLocalNameFromOperations: $("#txtLocalNameFromOperations").val().trim() == "" ? 0 : $("#txtLocalNameFromOperations").val().trim().toUpperCase()
                ,
                pCountryIDFromOperations: $("#slCountryFromOperations").val() == "" ? 0 : $("#slCountryFromOperations").val()
            };
        } else
            pParameters = {
                pCodeFromOperations: $("#txtCodeFromOperations").val().trim() == "" ? 0 : $("#txtCodeFromOperations").val().trim().toUpperCase()
                ,
                pNameFromOperations: $("#txtNameFromOperations").val().trim() == "" ? 0 : $("#txtNameFromOperations").val().trim().toUpperCase()
                ,
                pLocalNameFromOperations: $("#txtLocalNameFromOperations").val().trim() == "" ? 0 : $("#txtLocalNameFromOperations").val().trim().toUpperCase()
            };
        if (pControlID == "ChargeType")
            pStrFunctionName = "/api/ChargeTypes/InsertFromOpertions";
        else if (pControlID == "slCargoPackageType")
            pStrFunctionName = "/api/PackageTypes/InsertFromOpertions";
        else if (pControlID == "slOperationVessels")
            pStrFunctionName = "/api/Vessels/InsertFromOpertions";
        else if (pControlID == "slIncoterm")
            pStrFunctionName = "/api/Incoterms/InsertFromOpertions";
        else if (pControlID == "slCommodities")
            pStrFunctionName = "/api/Commodities/InsertFromOpertions";
        else if (pControlID == "slRoutingsLines" && $("#cbIsInland").prop("checked"))
            pStrFunctionName = "/api/Truckers/InsertFromOpertions";
        else if (pControlID == "slRoutingsLines" && $("#cbIsOcean").prop("checked"))
            pStrFunctionName = "/api/ShippingLines/InsertFromOpertions";
        else if (pControlID == "slRoutingsLines" && $("#cbIsAir").prop("checked"))
            pStrFunctionName = "/api/Airlines/InsertFromOpertions";

        CallGETFunctionWithParameters(pStrFunctionName, pParameters
            , function (pData) {
                var _MessageReturned = pData[0];
                var _InsertedID = pData[1];
                var _ReturnedList = pData[2];
                if (_MessageReturned != "")
                    swal("Sorry", _MessageReturned);
                else {
                    if (pControlID == "ChargeType")
                        QuotationCharges_GetAvailableCharges();
                    else if (pControlID == "slRoutingsPOL" || pControlID == "slRoutingsPOD") {
                        $("#" + pControlID + "Countries").val($("#slCountryFromOperations").val());
                        FillListFromObject(_InsertedID, 4, "<--Select-->", pControlID, _ReturnedList, null);
                    } else
                        FillListFromObject(_InsertedID, 2, "<--Select-->", pControlID, _ReturnedList, null);
                    jQuery("#InsertFromOperationsModal").modal("hide");
                }
                FadePageCover(false);
            }
            , null);
    }
}


//*********************************Uploaded Files***************************************//
function Quotations_GeneralUpload_Initialise() {
    debugger;
    glbGeneralUploadModalName = ""; //if the upload is in a modal then is not opened
    glbGeneralUploadTableName = "tblUploadedFiles_Quotations";
    glbGeneralUploadFolderName = $("#hQuotationID").val();
    glbGeneralUploadPath = "/DocsInFiles//Quotations//";
    glbGeneralUploadRelativePath = "~/DocsInFiles/Quotations/";
    glbGeneralUploadBtnUploadName = "inputFileUpload_Quotations";
    glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_Quotations";
    glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_Quotations";

    if (glbGeneralUploadFolderName != "")
        GeneralUpload_FillControls();
}
//*********************************EOF Uploaded Files***************************************//

function QuotationApproval_GetUsers() {
    $("#CheckboxesListModal #txtSearchItems").val('');
    Receptionists_GetAvailableUsers("WHERE DepartmentName='MANAGEMENT'", null);
    $("#btnCheckboxesListApply").attr("onclick", "QuotationApproval_SetApproval();");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers(\"WHERE DepartmentName = 'MANAGEMENT'\", null);");
}

function PrintQuotationRouteChargesWithApprovals() {
    if (!($('#slOperation').val() > 0)) {
        swal("Sorry", "Please, select operation first");
        return;
    }
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/Quotations/GetChargesWithApprovals",
        {
            pQuotationRouteID: $('#hQuotationRouteID').val(),
            pQuotationID: $('#hQuotationID').val(),
            pOperationID: $('#slOperation').val(),
            pCompanyName: pDefaults.UnEditableCompanyName
        }
        , function (pData) {
            FadePageCover(false);
            var quotation = JSON.parse(pData[0]);
            var route = JSON.parse(pData[1]);
            var receivables = JSON.parse(pData[2]);
            var payables = JSON.parse(pData[3]);

            if (pDefaults.UnEditableCompanyName == "MED") {
                let receivablesDraft = JSON.parse(pData[4]);
                let payablesDraft = JSON.parse(pData[5]);

                let filteredRec = receivablesDraft.filter(item => item.IsFinalApproved === true).reduce((acc, item) => {
                    if (!acc[item.OriginalReceivableID]) {
                        acc[item.OriginalReceivableID] = [];
                    }
                    acc[item.OriginalReceivableID].push(item);
                    return acc;
                }, {});

                var MED_REC = Object.values(filteredRec).map(group => {
                    return group.reduce((maxItem, currentItem) => {
                        return currentItem.ID > maxItem.ID ? currentItem : maxItem;
                    });
                });
                //MED_REC = MED_REC.concat(receivablesDraft.filter(item => item.OriginalReceivableID === 0 && item.IsFinalApproved));

                let filteredPay = payablesDraft.filter(item => item.IsFinalApproved === true).reduce((acc, item) => {
                    if (!acc[item.OriginalPayableID]) {
                        acc[item.OriginalPayableID] = [];
                    }
                    acc[item.OriginalPayableID].push(item);
                    return acc;
                }, {});

                var MED_PAY = Object.values(filteredPay).map(group => {
                    return group.reduce((maxItem, currentItem) => {
                        return currentItem.ID > maxItem.ID ? currentItem : maxItem;
                    });
                });
                //MED_PAY = MED_PAY.concat(payablesDraft.filter(item => item.OriginalPayableID === 0 && item.IsFinalApproved));
            }



            var ReportHTML = '';
            debugger;
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>Quotation</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><u><h3>' + 'Quotation' + '</h3></u></div>';

            ReportHTML += '               <div class="row col-xs-12">';
            ReportHTML += '               <p>Code: ' + route[0].Code + '</p>';
            ReportHTML += '               <p>Quotation Code: ' + route[0].QuotationCode + '</p>';
            ReportHTML += '               </div>';

            ReportHTML += '               <hr>';

            ReportHTML += '               <div>';
            ReportHTML += '               <label>Receivables</label>';
            ReportHTML += '                 <table class="table table-striped b-t b-light text-sm table-bordered m-t" style="border:solid #000 !important;">';
            ReportHTML += '                     <thead>';
            ReportHTML += '                     <tr>';
            ReportHTML += '                         <th>Charge Type</th>';
            ReportHTML += '                         <th>Quantity</th>';
            if (pDefaults.UnEditableCompanyName != "MED") {

                ReportHTML += '                         <th>Cost Price</th>';
                ReportHTML += '                         <th>Cost Amount</th>';
            }
            ReportHTML += '                         <th>Sale Price</th>';
            ReportHTML += '                         <th>Sale Amount</th>';
            ReportHTML += '                         <th>Currency</th>';
            ReportHTML += '                     </tr>';
            ReportHTML += '                     </thead>';
            ReportHTML += '                     <tbody>';

            if (pDefaults.UnEditableCompanyName == "MED") {
                if (MED_REC.length > 0)
                    receivables = MED_REC;
                if (MED_PAY.length > 0)
                    payables = MED_PAY;
            }
            $.each(receivables, function (i, item) {

                ReportHTML += '                     <tr>';
                ReportHTML += '                         <td>' + item.ChargeTypeName + '</td>';
                ReportHTML += '                         <td>' + item.Quantity + '</td>';
                if (pDefaults.UnEditableCompanyName != "MED") {

                    ReportHTML += '                         <td>' + item.CostPrice + '</td>';
                    ReportHTML += '                         <td>' + item.CostAmount + '</td>';
                }
                ReportHTML += '                         <td>' + item.SalePrice + '</td>';
                ReportHTML += '                         <td>' + item.SaleAmount + '</td>';
                ReportHTML += '                         <td>' + item.CurrencyCode + '</td>';
                ReportHTML += '                     </tr>';
            });
            ReportHTML += '                     </tbody>';
            ReportHTML += '                 </table>';
            ReportHTML += '               </div>';

            ReportHTML += '               <br>';

            ReportHTML += '               <div>';
            ReportHTML += '               <label>Payables</label>';
            ReportHTML += '                 <table class="table table-striped b-t b-light text-sm table-bordered m-t" style="border:solid #000 !important;">';
            ReportHTML += '                     <thead>';
            ReportHTML += '                     <tr>';
            ReportHTML += '                         <th>Charge Type</th>';
            ReportHTML += '                         <th>Quantity</th>';
            ReportHTML += '                         <th>Cost Price</th>';
            ReportHTML += '                         <th>Cost Amount</th>';
            ReportHTML += '                         <th>Currency</th>';
            ReportHTML += '                     </tr>';
            ReportHTML += '                     </thead>';
            ReportHTML += '                     <tbody>';
            //if (['MED'].includes(pDefaults.UnEditableCompanyName)) {
            //    $.each(payables, function (i, item) {
            //        ReportHTML += '                     <tr>';
            //        ReportHTML += '                         <td>' + item.ChargeTypeName + '</td>';
            //        ReportHTML += '                         <td>' + item.Quantity + '</td>';
            //        ReportHTML += '                         <td>' + (item.CostPrice > 0 ? item.CostPrice : item.QuotationCost) + '</td>';
            //        ReportHTML += '                         <td>' + (item.AmountWithoutVAT > 0 ? item.AmountWithoutVAT : item.QuotationCost * item.Quantity) + '</td>';
            //        ReportHTML += '                         <td>' + item.CurrencyCode + '</td>';
            //        ReportHTML += '                     </tr>';
            //    });
            //}
            //else {
            $.each(payables, function (i, item) {
                ReportHTML += '                     <tr>';
                ReportHTML += '                         <td>' + item.ChargeTypeName + '</td>';
                ReportHTML += '                         <td>' + item.Quantity + '</td>';
                ReportHTML += '                         <td>' + item.CostPrice + '</td>';
                ReportHTML += '                         <td>' + item.AmountWithoutVAT + '</td>';
                ReportHTML += '                         <td>' + item.CurrencyCode + '</td>';
                ReportHTML += '                     </tr>';
            });
            //}

            ReportHTML += '                     </tbody>';
            ReportHTML += '                 </table>';
            ReportHTML += '               </div>';

            ReportHTML += '               <br>';

            ReportHTML += '               <div>';
            ReportHTML += '               <label>Approvals</label>';
            ReportHTML += '                 <table class="table table-striped b-t b-light text-sm table-bordered m-t" style="border:solid #000 !important;">';
            ReportHTML += '                     <thead>';
            ReportHTML += '                     <tr>';
            ReportHTML += '                         <th>1st Approve</th>';
            ReportHTML += '                         <th>2nd Approve</th>';
            ReportHTML += '                         <th>3rd Approve</th>';
            ReportHTML += '                     </tr>';
            ReportHTML += '                     </thead>';
            ReportHTML += '                     <tbody>';
            ReportHTML += '                     <tr>';
            ReportHTML += '                         <td>' + route[0].ChargeEdit1stApprovalUserName + '</td>';
            ReportHTML += '                         <td>' + route[0].ChargeEdit2ndApprovalUserName + '</td>';
            ReportHTML += '                         <td>' + route[0].ChargeEdit3rdApprovalUserName + '</td>';
            ReportHTML += '                     </tr>';
            ReportHTML += '                     </tbody>';
            ReportHTML += '                 </table>';
            ReportHTML += '               </div>';

            ReportHTML += '                 </body>';
            ReportHTML += '                 </html>';

            var mywindow = window.open('', '_blank');
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        , null);
}

function ReceivablesDraft_BindTableRows(pReceivables) {
    ClearAllTableRows("tblReceivables");
    debugger;
    $.each(pReceivables, function (i, item) {
        AppendRowtoTable("tblReceivables",
            ("<tr ID='" + item.ID + "' " + (item.InvoiceID == 0 && item.AccNoteID == 0 && OERec && item.DraftInvoiceID == 0 && !isChargesEditRequested ? "ondblclick='ReceivablesDraft_EditByDblClick(" + item.ID + ");'>" : ">")
                + "<td class='ReceivableID'> <input " + (item.InvoiceID == 0 && item.AccNoteID == 0 && item.DraftInvoiceID == 0 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"

                + "<td class='Receivable' val='" + item.ChargeTypeID + "'>" + (pDefaults.UnEditableCompanyName == "GBL" ? (item.ChargeTypeName + " (" + item.ChargeTypeCode + ")") : item.ChargeTypeName) + "</td>"
                + "<td class='ReceivablePOrC hide' val='" + item.POrC + "'>" + (item.POrC == 0 ? "" : item.POrCCode) + "</td>"

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

        if ((['MED'].includes(pDefaults.UnEditableCompanyName) && item.NotApproved) || (!(['MED'].includes(pDefaults.UnEditableCompanyName)) && item.OldSalePrice > 0 && item.OldSalePrice != item.SalePrice))
            $('#tblReceivables tr[id=' + item.ID + '] td').css({ 'background-color': 'lightgreen' });
    });
    if (pDefaults.UnEditableCompanyName == "MED")
        $('#tblReceivables th.ReceivableOldSalePrice, #tblReceivables td.ReceivableOldSalePrice').removeClass('hide');



    BindAllCheckboxonTable("tblReceivables", "ReceivableID", "cb-CheckAll-Receivables");
    CheckAllCheckbox("HeaderDeleteReceivableID");

}

function ReceivablesDraft_EditByDblClick(pID) {
    jQuery("#EditReceivableModal").modal("show");
    ReceivablesDraft_FillControls(pID);
}

function ReceivablesDraft_FillControls(pID) {
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
    GetListWithCodeAndWhereClause(pID, "/api/NoAccessFreightTypes/LoadAll", "P/C", "slReceivablePOrC" /*pSlName*/, " WHERE 1=1 ");
    $("#slReceivableCurrency").html($("#hReadySlCurrencies").html());
    $("#slReceivableCurrency").val(pCurrencyID); //ReceivableCurrency_GetList(pCurrencyID, "slReceivableCurrency", null);
    ReceivableUOM_GetList(pUOMID, "slReceivableUOM");

    $("#lblReceivableShown").html(": " + $(tr).find("td.Receivable").text());
    $("#lblReceivableCreatedBy").html(" : " + $(tr).find("td.ReceivableCreatorName").text())
    $("#lblReceivableCreationDate").html(" : " + $(tr).find("td.ReceivableCreationDate").text())
    $("#lblReceivableUpdatedBy").html(": " + $(tr).find("td.ReceivableModificatorName").text())
    $("#lblReceivableModificationDate").html(" : " + $(tr).find("td.ReceivableModificationDate").text())

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
    $("#btnSaveReceivable").attr("onclick", "ReceivablesDraft_Update(false);");
}

function ReceivablesDraft_Update(pSaveandAddNew) {
    debugger;
    jQuery("#UpdateOperationModal").modal("hide");
    if (!isValidDate($("#txtReceivableIssueDate").val().trim(), 1) && $("#txtReceivableIssueDate").val().trim() != "")
        swal(strSorry, strCheckDates);
    else if ($("#txtReceivableExchangeRate").val() == "" || parseFloat($("#txtReceivableExchangeRate").val()) == 0
        || (parseInt($("#txtReceivableExchangeRate").val()) == 1 && pDefaults.CurrencyID != ($("#slReceivableCurrency").val())))
        swal("Sorry", "Please, check exchange rate.");
    else InsertUpdateFunction("form", "/api/ReceivablesDraft/Update", {
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
        pOperationID: $("#slOperation").val()
        ,
        pChargeTypeID: $("#slReceivableChargeType").val() == "" ? 0 : $("#slReceivableChargeType").val() //$("#txtReceivableType").attr("ChargeTypeID")
        ,
        pMeasurementID: $('#slReceivableUOM option:selected').val() != ""
            ? $('#slReceivableUOM option:selected').val()
            : 0
        ,
        pContainerTypeID: 0
        ,
        pPOrC: ($('#slReceivablePOrC option:selected').val() == "" ? 0 : $('#slReceivablePOrC option:selected').val())
        ,
        pSupplierID: 0
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
    }, pSaveandAddNew, "EditReceivableModal", function () {
        OperationCharges_FillModal();
        $("#OperationChargeModal .modal-footer button").attr("onclick", "jQuery('#UpdateOperationModal').modal('hide')");
    });

}

function PayablesDraft_BindTableRows(pPayables) {
    ClearAllTableRows("tblPayables");
    $.each(pPayables, function (i, item) {

        AppendRowtoTable("tblPayables",
            ("<tr ID='" + item.ID + "' " + (OEPay && item.AccNoteID == 0 && item.IsApproved == 0 && item.IsPayableInPR == 0 && !isChargesEditRequested ? ("ondblclick='PayablesDraft_EditByDblClick(" + item.ID + ");'") : "") + (item.IsApproved ? " class='text-primary' " : "") + ">"
                + "<td class='PayableID'> <input " + (item.IsApproved == 0 && item.AccNoteID == 0 && item.IsPayableInPR == 0 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                //+ "<td class='Payable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
                + "<td class='Payable' val='" + item.ChargeTypeID + "'>" + (pDefaults.UnEditableCompanyName == "GBL" ? (item.ChargeTypeName + " (" + item.ChargeTypeCode + ")") : item.ChargeTypeName) + "</td>"
                + "<td class='PayablePOrC hide' val='" + item.POrC + "'>" + (item.POrC == 0 ? "" : item.POrCCode) + "</td>"
                //the next line its PartnerSupplierID comes from table OperationPartners
                + "<td class='PayableSupplier hide'[' val='" + item.SupplierOperationPartnerID + "'>" + (item.PartnerSupplierID == 0 ? "" : item.PartnerSupplierName) + "</td>"
                + "<td class='SupplierSiteID hide'>" + item.SupplierSiteID + "</td>"
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


        if ((['MED'].includes(pDefaults.UnEditableCompanyName) && item.NotApproved) || (!(['MED'].includes(pDefaults.UnEditableCompanyName)) && item.OldCostPrice > 0 && item.OldCostPrice != item.CostPrice))
            $('#tblPayables tr[id=' + item.ID + '] td').css({ 'background-color': 'lightgreen' });
    });

    if (pDefaults.UnEditableCompanyName == "MED")
        $('#tblPayables th.PayableOldCostPrice, #tblPayables td.PayableOldCostPrice').removeClass('hide');


    BindAllCheckboxonTable("tblPayables", "PayableID", "cb-CheckAll-Payables");
    CheckAllCheckbox("HeaderDeletePayableID");
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}

function PayablesDraft_EditByDblClick(pID) {
    jQuery("#EditPayableModal").modal("show");
    PayablesDraft_FillControls(pID);
}

function PayablesDraft_FillControls(pID) {
    ClearAll("#EditPayableModal");
    if (pDefaults.UnEditableCompanyName == "GBL") {
        $(".classShowForGBL").removeClass("hide");
    }
    $("#hPayableID").val(pID);
    FadePageCover(true);
    var tr = $("#tblPayables tr[ID='" + pID + "']");
    var pPOrCID = $(tr).find("td.PayablePOrC").attr('val');
    var pPartnerSupplierID = $(tr).find("td.PayableSupplier").attr('val');
    var pUOMID = $(tr).find("td.PayableUOM").attr('val');
    var pCurrencyID = $(tr).find("td.PayableCurrency").attr('val');
    var pOperationID = $(tr).find("td.PayableOperation").attr('val');
    var pBillID = $(tr).find("td.PayableBillID").text();
    var pSupplierSiteID = $(tr).find("td.SupplierSiteID").text();

    var pTaxTypeID = $(tr).find("td.PayableTaxTypeID").attr('val');
    var pDiscountTypeID = $(tr).find("td.PayableDiscountTypeID").attr('val');


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
            pWhereClause: " WHERE MasterOperationID = " + pOperationID,
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
    $("#btnSavePayable").attr("onclick", "PayablesDraft_Update(false);");
}

function PayablesDraft_Update(pSaveandAddNew) {
    debugger;
    if (
        (!isValidDate($("#txtPayableEntryDate").val().trim(), 1) && $("#txtPayableEntryDate").val().trim() != "")
        || (!isValidDate($("#txtPayableIssueDate").val().trim(), 1) && $("#txtPayableIssueDate").val().trim() != "")
    )
        swal(strSorry, strCheckDates);

    else if ($("#txtPayableExchangeRate").val() == "" || parseFloat($("#txtPayableExchangeRate").val()) == 0
        || (parseInt($("#txtPayableExchangeRate").val()) == 1 && pDefaults.CurrencyID != ($("#slPayableCurrency").val())))
        swal("Sorry", "Please, check exchange rate.");
    else {

        InsertUpdateFunction("form", "/api/PayablesDraft/Update", {
            pSavedFrom: 0
            ,
            pOperationContainersAndPackagesID: $("#slPayableTank").val() == "" ? 0 : $("#slPayableTank").val()
            ,
            pID: $("#hPayableID").val()
            //, pMeasurementID: $("#txtCalculationType").attr("MeasurementID")
            ,
            pOperationID: $("#slOperation").val()
            ,
            pChargeTypeID: $("#slPayableChargeType").val() == "" ? 0 : $("#slPayableChargeType").val() //$("#txtPayableType").attr("ChargeTypeID")
            ,
            pMeasurementID: $('#slPayableUOM option:selected').val() != ""
                ? $('#slPayableUOM option:selected').val()
                : 0
            ,
            pContainerTypeID: 0
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
            , pTruckingOrderID: 0
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

function ReceivablesDraft_InsertListWithoutValues(pSaveandAddNew) {
    jQuery("#UpdateOperationModal").modal("hide");
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectCharges");//returns string array of IDs
    debugger;
    if (pSelectedIDs != "")
        InsertSelectedCheckboxItems("/api/ReceivablesDraft/InsertDraftListWithoutValues"
            , {
                pOperationID: $("#slOperation").val(),
                pSelectedIDs: pSelectedIDs,
                pQuotationRouteID: $("#hQuotationRouteID").val()
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

function PayablesDraft_InsertListWithoutValues(pSaveandAddNew) {
    jQuery("#UpdateOperationModal").modal("hide");
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectPayables");//returns string array of IDs
    debugger;
    if (pSelectedIDs != "")
        InsertSelectedCheckboxItems("/api/PayablesDraft/InsertDraftListWithoutValues"
            , {
                pOperationID: $("#slOperation").val(),
                pSelectedIDs: pSelectedIDs,
                pQuotationRouteID: $("#hQuotationRouteID").val()
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

function CancelEditsApprovalRequest(pQuotationRouteID) {
    if ($("#slOperation").val() == "") {
        swal("Sorry", "Please, select an operation.");
    } else {
        let operationID = $("#slOperation").val();

        CallGETFunctionWithParameters("api/ReceivablesDraft/DeleteDraftReceivablesAndPayables", { pWhereClause: " WHERE OperationID = " + operationID, pQuotationRouteID: pQuotationRouteID }, function (pData) {

            if (!pData) {
                swal("Sorry", "Error in CancelEditsApprovalRequest Fn.");
            } else {
                jQuery("#UpdateOperationModal").modal("hide");
                swal("Success", "Edits canceled successfully");
            }

        }, null, false);

    }

}

function getMedUsersWhereClause() {
    let usersWhereClause = " WHERE IsInactive=0 AND ID <> " + $("#hLoggedUserID").val() + " AND Name LIKE N'%" + $("#txtSearchItems").val().trim().toUpperCase() + "%' ";
    return usersWhereClause;
}

function SendThirdApprovalConfirm() {
    debugger;
    var pSelectedAlarmReceiversIDs = GetAllSelectedIDsAsStringWithNameAttr("cbAddedItemID");
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/Quotations/SendChargeEditThirdApprovalConfirm",
        {
            pAlarmReceiversIDs: pSelectedAlarmReceiversIDs,
            pQuotationRouteID: $("#hQuotationRouteID").val()
        },
        function (pData) {
            debugger;
            let pReturnedMessage = pData[0];
            let pQuotationRoute = JSON.parse(pData[2]);
            if (pReturnedMessage != "")
                swal("Sorry", pReturnedMessage);
            else {
                if (pDefaults.UnEditableCompanyName == "MED") {
                    jQuery("#UpdateOperationModal").modal("hide");
                }
                swal("Success", "Saved successfully.");
            }
            Routings_BindTableRows(pQuotationRoute);
            FadePageCover(false);
        })
}

function SetQuotationStageAndSendAlarmToGroup() {
    debugger;
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedAlarmGroupsReceiversIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pSelectedAlarmGroupsReceiversIDs == "") {
        swal("Sorry", "Please Select Department");
        return;
    }
    CallGETFunctionWithParameters("api/Users/LoadAllIDs", { pWhereClause: " WHERE DepartmentID IN (" + pSelectedAlarmGroupsReceiversIDs + ")" }, function (pUsersIDs) {
        debugger;
        var pSelectedID = GetAllSelectedIDsAsString("tblRoutings");
        if (pSelectedID == "" || pSelectedID.split(',').length != 1)
            swal("Sorry", "Please, select one route to set the status.");
        else if ($('#ulQuotationStages').val() == "")
            swal(strSorry, "Please, Select a stage.");
        else {
            debugger;
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/Quotations/SetQuotationStage"
                , {
                    pQuotationID: $("#hQuotationID").val()
                    ,
                    pQuotationRouteID: pSelectedID
                    ,
                    pQuotationStageID: $('#ulQuotationStages').val()
                    ,
                    pDenialReason: $("#txtDenialReason").val().trim() == "" ? "0" : $("#txtDenialReason").val().trim().toUpperCase()
                    ,
                    pAlarmReceiversIDs: pUsersIDs
                }
                , function (pData) {
                    if (pData[0]) {
                        Routings_BindTableRows(JSON.parse(pData[1]));
                        jQuery("#CheckboxesListModal").modal("hide");
                        if ($("#ulQuotationStages").val() == AcceptedQuoteAndOperStageID && $("#slSalesLead").val() != ""
                            && $("#slShippers").val() == "" && $("#slConsignees").val() == "" && $("#slAgents").val() == ""
                            && pDefaults.UnEditableCompanyName != "GBL") {
                            swal({
                                title: "",
                                text
                                    : "Would you like to transfer '" + $("#slSalesLead option:selected").text() + "' to be an actual customer?",
                                //type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Yes, Apply!",
                                closeOnConfirm: true
                            }, function () {
                                FadePageCover(true);
                                CallGETFunctionWithParameters("/api/Customers/CRM_TransferToCustomers"
                                    , { pCRMSalesLeadID: $("#slSalesLead").val(), pQuotationID: $("#hQuotationID").val() }
                                    , function (pData) {
                                        var _MessageReturned = pData[0];
                                        var _CustomerID = pData[1];
                                        var _ContactID = pData[2];
                                        var _ContactName = pData[3];
                                        if (_MessageReturned == "") {
                                            $("#slConsignees").append("<option value=" + _CustomerID + ">" + $("#slSalesLead option:selected").text() + "</option>");
                                            $("#slShippers").append("<option value=" + _CustomerID + ">" + $("#slSalesLead option:selected").text() + "</option>");
                                            $("#hReadySlCustomers").append("<option value=" + _CustomerID + ">" + $("#slSalesLead option:selected").text() + "</option>");
                                            if ($("#cbIsImport").prop('checked')) {
                                                $("#slConsignees").val(_CustomerID);
                                                if (_ContactID > 0) {
                                                    $("#slConsigneeContacts").append("<option value=" + _ContactID + ">" + _ContactName + "</option>");
                                                    $("#slConsigneeContacts").val(_ContactID);
                                                }
                                            } else {
                                                $("#slShippers").val(_CustomerID);
                                                if (_ContactID > 0) {
                                                    $("#slShipperContacts").append("<option value=" + _ContactID + ">" + _ContactName + "</option>");
                                                    $("#slShipperContacts").val(_ContactID);
                                                }
                                            }
                                            swal("Success", "Saved, successfully.");
                                        } else
                                            swal("Sorry", _MessageReturned);
                                        FadePageCover(false);
                                    }
                                    , null);
                            });
                        }
                    } else
                        swal("Sorry", "Connection failed, please try again.");
                    FadePageCover(false);
                });
        }

    }, null);

}

function QuotationRoute_CopyToAnotherQuotationShowModal(pQRID) {
    debugger;
    FadePageCover(true);
    jQuery("#SelectQuotation").modal("show");
    $("#CopyModalQuotationRouteID").val(pQRID);

    CallGETFunctionWithParameters("api/Quotations/LoadAllForComboBox", {
        pWhereClause: " WHERE TransportIconStyle='" + $('#hTransportIconStyle').val() + "' AND DirectionIconStyle='" + $('#hDirectionIconStyle').val() + "' AND QuotationStageID=1"
        , pDummy: true
    }, function (pData) {
        FillListFromObject(null, 1, TranslateString("SelectFromMenu"), "slQuotations", pData[0], null);
        $("#slQuotations").css({ "width": "100%" }).select2();
        $("#slQuotations").trigger("change");
        FadePageCover(false);
    }, null);
}
function QuotationRoute_CopyToAnotherQuotation() {
    if ($('#slQuotations').val() == '' || $('#slQuotations').val() == null) {
        swal("Sorry", "Please Select Quotation");
        return;
    }
    var QRID = $("#CopyModalQuotationRouteID").val();
    CallGETFunctionWithParameters("api/Quotations/QR_CopyToAnotherQuotation", {
        pQRIDToCopy: $("#CopyModalQuotationRouteID").val(),
        pQuotationID: $('#slQuotations').val()
    }, function (pData) {
        if (pData[0]) {
            jQuery("#SelectQuotation").modal("hide");
            swal("Success", "Copied Successfully");
        } else {
            swal("Sorry", "Error Occured....");
        }

    }, null);
}

function AfterLoadView() {
    if (pDefaults.UnEditableCompanyName == 'UNF') {
        $('#slRoutingsLines').attr('data-required', false);
        $('#slOperationEditOperationMan').closest('div').find('label').text('Customer Service CS');
    } else if (pDefaults.UnEditableCompanyName == "NAJ") {
        $('#slExporter').attr('data-required', true);
        $(".classShowForNAJ").removeClass("hide");
    } else if (pDefaults.UnEditableCompanyName == "LATT") {
        $('#slExporter').attr('data-required', true);
        $('#slExporter').prev().text('Client');
        $("#slExporter").parent().parent().removeClass("hide");
        $("#divQuotationSalesLead").next().addClass("hide");
    } else if (pDefaults.UnEditableCompanyName == "AKS") {
        $(".classShowForAKS").removeClass("hide");
        $("#txtQuotationNotes").parent().remove();
        $("#termsAndConditions").after(`
        <div class="col-sm-4">
            <h4><b>Remark</b></h4>
            <textarea id="txtQuotationNotes" 
              class= "form-control parsley-validated input-sm" 
              data-required="false" 
              maxlength = "250" 
              placeholder = "ex. Notes" 
                rows="9"
              style = "text-transform:uppercase" ></textarea >
        </div>
          `);
    }
}
function Cargo_Approximate(elm) {
    if ($(elm).is(':checked'))
        $('#txtChargeableWeight').val(Math.ceil(Number($('#txtChargeableWeight').val())));
}

function SalesmanChanged() {
    debugger;
    if ($("#slQuotationSalesman").val() == "" || $("#slQuotationSalesman").val() == null) {
        $("#slShippers").empty();
        $("#slConsignees").empty();
        $('#slShippers').append($('<option>', {
            value: '',
            text: '<--Select-->'
        }));
        $('#slConsignees').append($('<option>', {
            value: '',
            text: '<--Select-->'
        }));
    } else {
        CallGETFunctionWithParameters("/api/Customers/LoadAllCustomersWithIdAndName", { pWhereClause: "WHERE IsConsignee=1 AND SalesmanID=" + $("#slQuotationSalesman").val() }, function (pData) {
            FillListFromObject(null, 2, "<--Select-->", "slConsignees", pData[0], null);
            //$("#slConsignees").removeAttr("disabled");
        }, null, false);
        CallGETFunctionWithParameters("/api/Customers/LoadAllCustomersWithIdAndName", { pWhereClause: "WHERE IsShipper=1 AND SalesmanID=" + $("#slQuotationSalesman").val() }, function (pData) {
            FillListFromObject(null, 2, "<--Select-->", "slShippers", pData[0], null);
            //$("#slShippers").removeAttr("disabled");
        }, null, false);
    }
}
function QuotationOpenInNewTab(pQuotationID) {
    debugger;
    var n = window.open(window.location.href);
    n.focus();
    n.addEventListener('load', function () {
        n.setTimeout(function () {
            n.LoadViews("QuotationsEdit", null, pQuotationID);
        }, 5000);
    });
}

//-------------Mahmoud----------



function SelectCharges() {
    FadePageCover(false);
    var pSelectedQRIDs = "";
    var pSelectedQChargesIDs = "";

    pSelectedQRIDs = GetAllSelectedIDsAsString("tblRoutings");

    if (pSelectedQRIDs == "" || pSelectedQRIDs.includes(",")) {
        swal("Sorry", "Please, select one offer.");
        FadePageCover(false);
    } else {
        jQuery("#SelectChargesModaltoPerforma").modal("show");

        CallGETFunctionWithParameters(
            "/api/Quotations/GetPerformaToPrint"
            , { pPrintedQuotationID: $("#hQuotationID").val(), pSelectedQRIDs: pSelectedQRIDs, pSelectedQChargesIDs: pSelectedQChargesIDs }
            , function (data) {
                debugger;
                if (data[0]) {

                    var pQuotationCode = data[5];
                    var pTblQuotationAllCharges = JSON.parse(data[12]);
                    var pQuotationHeader = JSON.parse(data[21]);

                    QuotationCharges_BindTableRowsToPrint(pTblQuotationAllCharges);

                }
            }
            , null);


    }

}



function QuotationCharges_BindTableRowsToPrint(pQuotationCharges) {
    ClearAllTableRows("tblQuotationChargesToPrint");
    debugger;

    $.each(pQuotationCharges, function (i, item) {
        AppendRowtoTable("tblQuotationChargesToPrint",
            ("<tr ID='" + item.ID + "' " + (QECha) + ">"
                + "<td class='ChargeID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Charge' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeName + ((pDefaults.IsRepeatChargeTypeName ? "(" + item.ChargeTypeCode + ")" : "")) + "</td>"

                + "</tr>")
        );


    });

    BindAllCheckboxonTable("tblQuotationChargesToPrint", "ChargeID", "cb-CheckAll-tblQuotationChargesToPrint");
    CheckAllCheckbox("HeaderDeleteQuotationChargeIDS");
}



function Quotations_Print(pOption) {
    debugger;

    FadePageCover(true);
    var pSelectedQRIDs = "";
    var pSelectedQChargesIDs = "";

    pSelectedQRIDs = GetAllSelectedIDsAsString("tblRoutings");
    pSelectedQChargesIDs = GetAllSelectedIDsAsString("tblQuotationChargesToPrint");

    if (pSelectedQRIDs == "" || pSelectedQRIDs.includes(",") || pSelectedQChargesIDs == "") {
        swal("Sorry", "Please, select at least one charge.");
        FadePageCover(false);
    } else {
        CallGETFunctionWithParameters(
            "/api/Quotations/GetPerformaToPrint"
            , { pPrintedQuotationID: $("#hQuotationID").val(), pSelectedQRIDs: pSelectedQRIDs, pSelectedQChargesIDs: pSelectedQChargesIDs }
            , function (data) {
                debugger;
                if (data[0]) {
                    var pUserName = data[1];
                    var pUserMobile1 = data[2];
                    var pUserPhone1 = data[3];
                    var pUserEmail = data[4];
                    var pQuotationCode = data[5];
                    var pClientName = data[6];
                    var pClientContactName = data[7];
                    var pClientContactEmail = data[8];
                    var pRepDirectionTypeShown = data[9];
                    var pTblQuotationRoutes = JSON.parse(data[10]);
                    var pTblQuotationCharges = JSON.parse(data[11]);
                    var pTblQuotationAllCharges = JSON.parse(data[11]);
                    var pAgentName = data[13];
                    var pAgentContactName = data[14];
                    var pAgentContactEmail = data[15];
                    var pSubject = data[16];
                    var pTermsAndConditions = data[17];
                    var pCompanyPhones = data[18];
                    var pCompanyFaxes = data[19];
                    var pIsNSLQuotationFormat = data[20];
                    var pQuotationHeader = JSON.parse(data[21]);
                    var ContainerTypes_Summary = data[22];
                    var pSalesmanHeader = JSON.parse(data[23]);
                    var pCustomer = JSON.parse(data[24]);
                    var pSubjectClearance = data[25];
                    var pTermsAndConditionsClearance = data[26];
                    var pSubjectTransport = data[27];
                    var pTermsAndConditionsTransport = data[28];
                    var pShipmentTypeName = data[29];
                    var pTransportTypeName = data[30];
                    var pShipmentDetails = JSON.parse(data[31]);
                    var IsPerforma = data[32];
                    var pPONumber = data[33];

                    var _TodaysDateInDDMMYYYY = getTodaysDateInddMMyyyyFormat();


                    let _SelectedQuotationChargesIDs = "";
                    if (pOption == "PrintAdditionalContainer")
                        _SelectedQuotationChargesIDs = "," + GetAllSelectedIDsAsString("tblQuotationCharges") + ",";


                    var pReportTitle = "Quotation";
                    var pIsPrintedForAgent = ($("#slAgents").val() != "" && $("#cbPrintForAgent").prop("checked"));


                    pTblQuotationCharges.sort((a, b) => (a.ViewOrderForPrint >= b.ViewOrderForPrint) ? 1 : -1);
                    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
                    var TodaysDateInLetters = Date();

                    var ContainerCount;
                    CallGETFunctionWithParameters("/api/Quotations/Cargo_FillModal", {
                        pQRIDToFillCargoModal: $("#hQuotationRouteID").val()
                    }
                        , function (pData) {
                            var pQuotationContainersAndPackages = JSON.parse(pData[0]);
                            ContainerCount = pQuotationContainersAndPackages.length;
                            var pPackage = pData[1];
                            var pContainerType = pData[2];
                        }, null);


                    var ReportHTML = '';
                    var ReportHTMLHeader = '';
                    debugger;
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';


                    var ReportHTMLtemp = ReportHTML;
                    ReportHTML = '';







                    //-------------------------------------Ma----




                    ReportHTML += '         <div style="display:flex;align-items:center;justify-content:center;padding-top:150px;>';


                    ReportHTML += '             <h3 style="font-size:30px;" >'; '</h3>';

                    ReportHTML += '             <div style="font-size:30px;">' + 'Performa INVOICE.' + ' <span>' + (pQuotationHeader.CodeSerial == 0 ? "" : pQuotationHeader.CodeSerial) + '</span>' + '</div>';

                    ReportHTML += '              </div>';


                    ReportHTML += '            <div style="width:95%;margin:auto;margin-top:40px;display:flex;align-items:center;justify-content:space-between;">';


                    ReportHTML += '             <div style="width:50%;"><b>Date: </b>' + TodaysDateddMMyyyy + '</div>';



                    ReportHTML += '              </div>';

                    ReportHTML += '            <div style="width:95%;margin:auto;display:flex;align-items:center;justify-content:space-between;">';


                    ReportHTML += '             <div style="width:50%;"><b>Messers: </b>' + (pQuotationHeader.ClientName == 0 ? "" : pQuotationHeader.ClientName) + '</div>';


                    ReportHTML += '              </div>';

                    ReportHTML += '            <div style="width:95%;margin:auto;display:flex;align-items:center;justify-content:space-between;">';


                    ReportHTML += '             <div style="width:50%;"><b>Operation S/N : </b>' + (pQuotationCode == 0 ? "" : pQuotationCode) + '</div>';


                    //ReportHTML += '             <div style="width:20%;"><b>Bill Dated: </b>' + 'test' + '</div>';


                    ReportHTML += '              </div>';

                    ReportHTML += '            <div style="width:95%;margin:auto;display:flex;align-items:center;justify-content:space-between;">';
                    ReportHTML += '             <div style="width:50%;"><b>PO Number : </b>' + (pPONumber == null || pPONumber == "" || pPONumber == "0" ? "" : pPONumber) + '</div>';
                    ReportHTML += '              </div>';

                    ReportHTML += '            <hr style="margin-top:0;margin-bottom:0;">';


                    ReportHTML += '            <div style="width:95%;margin:auto;display:flex;align-items:center;justify-content:space-between;">';


                    ReportHTML += '             <div style="width:50%;"><b>POL: </b>' + (pQuotationHeader.POLName == 0 ? "" : pQuotationHeader.POLName) + '</div>';


                    ReportHTML += '             <div style="width:45%;"><b>POD: </b>' + (pQuotationHeader.PODName == 0 ? "" : pQuotationHeader.PODName) + '</div>';


                    ReportHTML += '              </div>';
                    ReportHTML += '            <div style="width:95%;margin:auto;display:flex;align-items:center;justify-content:space-between;">';


                    ReportHTML += '             <div style="width:50%;"><b>Number of Packages : </b>' + (pTblQuotationRoutes[0].PackageTypes == 0 ? "" : pTblQuotationRoutes[0].PackageTypes) + '</div>';


                    ReportHTML += '             <div style="width:45%;"><b>Weight: </b>' + (pTblQuotationRoutes[0].GrossWeight == 0 ? "" : pTblQuotationRoutes[0].GrossWeight) + '</div>';


                    ReportHTML += '              </div>';
                    ReportHTML += '            <div style="width:95%;margin:auto;display:flex;align-items:center;justify-content:space-between;">';


                    ReportHTML += '             <div style="width:50%;"><b>Volume : </b>' + (pTblQuotationRoutes[0].Volume == 0 ? "" : pTblQuotationRoutes[0].Volume) + '</div>';


                    //ReportHTML += '             <div style="width:45%;"><b>Equipment: </b>' + 'test' + '</div>';


                    ReportHTML += '              </div>';
                    ReportHTML += '            <div style="width:95%;margin:auto;display:flex;align-items:center;justify-content:space-between;">';


                    ReportHTML += '             <div style="width:50%;"><b>Terms: </b>' + (pTblQuotationRoutes[0].IncotermName == 0 ? "" : pTblQuotationRoutes[0].IncotermName) + '</div>';


                    //ReportHTML += '             <div style="width:45%;"><b>chargable volume: </b>' + 'test' + '</div>';


                    ReportHTML += '              </div>';
                    //ReportHTML += '            <div style="width:95%;margin:auto;display:flex;align-items:center;justify-content:space-between;">';




                    //ReportHTML += '             <div style="width:45%;"><b>Vessel: </b>' + 'test' + '</div>';


                    //ReportHTML += '              </div>';

                    ReportHTMLHeader = ReportHTML;
                    ReportHTML = ReportHTMLtemp + ReportHTML;



                    debugger;
                    $.each((pTblQuotationRoutes), function (i, item) {
                        var pQuotationRouteID;
                        ({ pQuotationRouteID, ReportHTML } = DrawOfferTablePerforma(ReportHTML, i, item, pQuotationHeader));
                        if ($("#cbExtraContainer").prop("checked")) {
                            ReportHTML = DrawExtraContainers(pTblQuotationCharges, pQuotationRouteID, ReportHTML, ReportHTMLHeader);
                        } else {
                            var i;
                            ({ i, ReportHTML, i } = DrawQuotationExpensesPerforma(ReportHTML, pTblQuotationCharges, item, pQuotationRouteID, pQuotationHeader, pOption, _SelectedQuotationChargesIDs, i, pTermsAndConditionsTransport, pTermsAndConditionsClearance, pTermsAndConditions));
                        }

                    });



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

                    ReportHTML += '                 </table>';
                    ReportHTML += '                 </div>';
                    ReportHTML += '                 </div>';
                    ReportHTML += '            <div style="width:95%;margin:auto;">';


                    ReportHTML += '             <h5 style="color:red;width:57%;text-align:center;" >في حالة إصدار شيكات بالمبالغ المستحقة برجاء إصدارها بإسم / يونيفريت جلوبال لوجيستيكس لخدمات الشحن الدولي </h5>';
                    ReportHTML += '             <h6 style="margin-bottom:2px;margin-top:2px;" >Should you have any questions or inquiries please do not hesitate to contact us. Our Best attention at all times is yours. </h6>';
                    ReportHTML += '             <h6 style="margin-bottom:3px;margin-top:3px;" >Looking forward to hearing from you. </h6>';
                    ReportHTML += '             <h6 style="margin-bottom:3px;margin-top:3px;" >Sincerely,</p>';
                    ReportHTML += '             <h6 style="margin-bottom:3px;margin-top:3px;" >Unifreight Customer Service Team</h6>';
                    ReportHTML += '             <a href= "mailto: cs@unifreight.com.eg" style="font-size:14px;color:blue;text-decoration:underline;">cs@unifreight.com.eg </a>';


                    ReportHTML += '            <div style="width:100%;margin:auto;display:flex;align-items:center;justify-content:space-between;">';

                    ReportHTML += '             <p style="width:50%;"margin-bottom:3px;margin-top:3px;" >All Business is transacted as per company standard trading conditions – Copy available up on request</p>';



                    ReportHTML += '             <div style="width:14%;display:flex;height:50px;align-items:center;justify-content:space-evenly;">';
                    ReportHTML += '            <img style="width:20%;" src="../../../Content/Images/CompanyLogo-EIFFA.jpg" alt="Logo">';
                    ReportHTML += '            <img style="width:20%;" src="../../../Content/Images/CompanyLogo-LATA.jpg" alt="Logo">';
                    ReportHTML += '            <img style="width:20%;" src="../../../Content/Images/CompanyLogo-Fiata.jpg" alt="Logo">';



                    ReportHTML += '              </div>';

                    ReportHTML += '              </div>';
                    ReportHTML += '             <h6 style="margin-bottom:20px;margin-top:10px;color:green" >Please consider the environment before printing this mail. It takes 24 trees to create 1 ton of virgin office paper*</h6>';
                    ReportHTML += '              </div>';


                    debugger
                    if (pOption == "Print") {
                        var mywindow = window.open('', '_blank');
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                        FadePageCover(false);
                    }
                    if (pOption == "Download") {
                        var mywindow = window.open('', '_blank');
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                        mywindow.print();
                        FadePageCover(false);
                    }
                }
            }
            , null);


    }


}

function DrawOfferTablePerforma(ReportHTML, i, item, pQuotationHeader) {
    ReportHTML += '            <div style="width:95%;margin:auto;margin-top:40px;">';

    ReportHTML += '                 <div><b>(' + (i + 1) + ') ' + (item.MoveTypeID == 0 ? "" : item.MoveTypeName) + '</b>'
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
    ReportHTML += '                         <td>' + item.Code + '</td>';
    ReportHTML += '                         <td>' + (item.LineName == 0 ? pDefaults.UnEditableCompanyName : item.LineName) + '</td>';
    ReportHTML += '                         <td>' + (item.PickupAddress == 0 ? "" : item.PickupAddress) + '</td>';
    ReportHTML += '                         <td>' + item.POLName + '</td>';
    ReportHTML += '                         <td>' + item.PODName + '</td>';
    ReportHTML += '                         <td>' + (item.DeliveryAddress == 0 ? "" : item.DeliveryAddress) + '</td>';
    ReportHTML += '                         <td>' + item.TransientTime + '</td>';
    ReportHTML += '                         <td>' + (item.FreeTime == 0 ? "" : item.FreeTime) + '</td>';
    ReportHTML += '                         <td>' + (item.FreeTimePOD == 0 ? "" : item.FreeTimePOD) + '</td>';
    ReportHTML += '                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) + '</td>';
    ReportHTML += '                     </tr>';
    ReportHTML += '                 </table>';
    ReportHTML += `</div>`;

    var pQuotationRouteID = item.ID;
    return { pQuotationRouteID, ReportHTML };
}

function DrawQuotationExpensesPerforma(ReportHTML, pTblQuotationCharges, item, pQuotationRouteID, pQuotationHeader, pOption, _SelectedQuotationChargesIDs, i, pTermsAndConditionsTransport, pTermsAndConditionsClearance, pTermsAndConditions) {
    debugger;
    let CurrencyList;
    let IsGroupByCurrency;
    let ChargeGroupList;
    let ShowChargeGroupLable;
    let IsGroupHasRow = false;
    if (!$("#cbAllIn").prop("checked")) {
        ReportHTML += '            <div style="width:95%;margin:auto;margin-top:40px;">';



        IsGroupByCurrency = false;
        CurrencyList = [];
        ChargeGroupList = [];
        IsGroupByChargeType = false;


        let k = 0;
        do {
            ShowChargeGroupLable = false;
            // let IsGroupHasRow = false;
            $.each((pTblQuotationCharges), function (i, item) {
                if ((item.QuotationRouteID == pQuotationRouteID) && (item.ChargeTypeGroupName == ChargeGroupList[k] || ChargeGroupList.length == 0)) {
                    ShowChargeGroupLable = true;
                }
            });
            let j = 0;

            ReportHTML += '<div class=" ' + (ShowChargeGroupLable && IsGroupByChargeType ? " " : " hide") + ' m-t-n"><b>Charge Group  :' + (ShowChargeGroupLable ? ChargeGroupList[k] : "") + '</b>'

            if ((item.POLID_TransportName !== "" || item.POLID_TransportName !== null) && ChargeGroupList[k] == "TRUCKING") { ReportHTML += `    (<b>POL Transport</b> : ${item.POLID_TransportName})` };
            if ((item.ClientPlantName !== "" || item.ClientPlantName !== null) && ChargeGroupList[k] == "TRUCKING") { ReportHTML += `    (<b>Client Plant</b> : ${item.ClientPlantName})` };
            if ((item.PickupPlaceName !== "" || item.PickupPlaceName !== null) && ChargeGroupList[k] == "TRUCKING") { ReportHTML += `    (<b>Pickup Place </b> : ${item.PickupPlaceName})` };
            if ((item.ClearancePortName !== "" || item.ClearancePortName !== null) && ChargeGroupList[k] == "CLEARANCE") { ReportHTML += `    (<b>Clearance Port</b> : ${item.ClearancePortName})` };
            ReportHTML += '</div><br>';

            do {
                IsGroupHasRow = false;
                $.each((pTblQuotationCharges), function (i, item) {
                    if ((item.QuotationRouteID == pQuotationRouteID) && (item.SaleCurrencyCode == CurrencyList[j] || CurrencyList.length == 0) && (item.ChargeTypeGroupName == ChargeGroupList[k] || ChargeGroupList.length == 0)) {
                        IsGroupHasRow = true;
                    }
                });
                //#region Create Table Head
                ReportHTML += '<div class="' + ($("#cbAllIn").prop("checked") ? "hide" : " ") + '">';
                ReportHTML += '                 <table id="tblCharges" class="' + (IsGroupHasRow ? "" : "hide") + ' table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                ReportHTML += '                     <thead>';
                ReportHTML += '                     <th>Charge Details</th>';
                ReportHTML += '                     <th>Qty</th>';
                ReportHTML += '                     <th>' + 'Unit Price' + '</th>';
                ReportHTML += '                     <th>' + 'Currency' + '</th>';
                ReportHTML += '                     <th>' + 'Amount' + '</th>';
                ReportHTML += '                     </thead>';

                //#endregion 
                var _AdditionalContainerEGP = 0.00;
                var _AdditionalContainerUSD = 0.00;
                var _AdditionalContainerEUR = 0.00;


                //#region Create Table Body
                //check groupby options 
                $.each((pTblQuotationCharges), function (i, item) {
                    if ((item.SaleCurrencyCode == CurrencyList[j] || CurrencyList.length == 0) && (item.ChargeTypeGroupName == ChargeGroupList[k] || ChargeGroupList.length == 0)) {
                        if (item.QuotationRouteID == pQuotationRouteID && (item.SalePrice > 0)) {
                            ReportHTML += '                 <tr>';
                            ReportHTML += '                     <td>' + item.ChargeTypeName + '</td>';

                            ReportHTML += '                     <td>' + (item.CostQuantity == 0 ? "" : item.CostQuantity) + '</td>';
                            ReportHTML += '                     <td>' + (item.SalePrice == 0 ? "" : item.SalePrice) + '</td>';
                            ReportHTML += '                     <td>' + (item.SaleCurrencyCode == 0 ? "" : item.SaleCurrencyCode) + '</td>';
                            ReportHTML += '                     <td>' + (item.SaleAmount == 0 ? "" : item.SaleAmount) + '</td>';
                            ReportHTML += '                 </tr>';
                        }
                    }
                });

                ReportHTML += '                 </table>';
                ReportHTML += '                 </div>';
                j++;
            } while (j < CurrencyList.length);
            if (true/*$("#cbPrintCost").prop("checked")*/) {
                debugger;
                var _CurrentQRCharges = pTblQuotationCharges.filter(x => x.QuotationRouteID == pQuotationRouteID && (ChargeGroupList[k] == x.ChargeTypeGroupName || ChargeGroupList.length == 0));




                var _TotalSale = CalculateSumOfArrayWithGroupBy(_CurrentQRCharges, "SaleAmount", "SaleCurrencyCode");
                ReportHTML += '<div class="col-xs-12 text-right"><b>Total : ' + _TotalSale /*.replace(/ /g, "&nbsp;").replace(/,/g, "<br />")*/ + '</b></div>';



            }
            if (ShowChargeGroupLable) {

                var _CurrentQRCharges = pTblQuotationCharges.filter(x => x.QuotationRouteID == pQuotationRouteID && (ChargeGroupList[k] == x.ChargeTypeGroupName || ChargeGroupList.length == 0));
                var totalInUSD = _CurrentQRCharges.map((item, i, arr) => { return item.SaleAmount * item.SaleExchangeRate }).reduce((pre, cur) => { return pre = pre + cur }, 0.00) / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate");


            }
            k++;
        } while (k < ChargeGroupList.length);

        var _CurrentQRCharges = pTblQuotationCharges.filter(x => x.QuotationRouteID == pQuotationRouteID);
        var totalInUSD = _CurrentQRCharges.map((item, i, arr) => { return item.SaleAmount * item.SaleExchangeRate }).reduce((pre, cur) => { return pre = pre + cur }, 0.00) / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate");

        //if (pDefaults.UnEditableCompanyName != "ELI" && pDefaults.UnEditableCompanyName != "SUN" && pDefaults.UnEditableCompanyName != "DRA" && pDefaults.UnEditableCompanyName != "TMP" && pDefaults.UnEditableCompanyName != "BOM")
        //    ReportHTML += '<div class="col-xs-12 text-right"><b>Total In USD : ' + Number(totalInUSD).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></div>';


        if (pOption == "PrintAdditionalContainer") {
            ReportHTML += '<div class="col-xs-12 m-t-n text-right"><b>Additinal Cnt.: ' + _AdditionalContainerEGP + ' EGP, ' + _AdditionalContainerUSD + ' USD, ' + _AdditionalContainerEUR + ' EUR' + '</b></div>';
        }

        ReportHTML += `</div>`;


    }
    else {
        ChargeGroupList = Array.from(new Set(pTblQuotationCharges.map(item => item.ChargeTypeGroupName)));

        ReportHTML += '                 <table id="tblAllIn" class="table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox


        ChargeGroupList.forEach((item, i) => {
            var _CurrentQRCharges = pTblQuotationCharges.filter(x => x.QuotationRouteID == pQuotationRouteID && (item == x.ChargeTypeGroupName || ChargeGroupList.length == 0));
            var _TotalCost = CalculateSumOfArrayWithGroupBy(_CurrentQRCharges, "SaleAmount", "SaleCurrencyCode");
            ReportHTML += '                 <tr>';
            ReportHTML += '                     <td> ' + item + ' </td>';
            ReportHTML += '                     <td>' + _TotalCost + '</td>';
            ReportHTML += '                 </tr>';
        })


        ReportHTML += '                 </table>';

    }

    return { i, ReportHTML, i };
}

//-------------Mahmoud----------





function Quotations_Request_ApprovalLevel(pRequestedApprovalLevel) {
    debugger;
    if (
        (
            ($('input[name=cbDirectionType]:checked').val() == 1 && $('#slConsignees option:selected').val() == "") //check Consignee in case of Import
            || (($('input[name=cbDirectionType]:checked').val() == 2 || $('input[name=cbDirectionType]:checked').val() == 3) && $('#slShippers option:selected').val() == "") //check Shipper in case of Export or 
        )
        && ($("#slSalesLead").val() == null || $("#slSalesLead").val() == "")
        && pDefaults.UnEditableCompanyName != "MIL"
    ) {

        swal(strSorry, "Please, Select Client.");
        return;
    }
    Receptionists_GetAvailableUsers();
    $("#btnCheckboxesListApply").attr("onclick", "SendQuotationApprovalNotification(" + pRequestedApprovalLevel + ");");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Apply");
    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers();");
}
function SendQuotationApprovalNotification(pRequestedApprovalLevel) {
    debugger;
    var pSelectedAlarmReceiversIDs = GetAllSelectedIDsAsStringWithNameAttr("cbAddedItemID");
    FadePageCover(true);
    let ConsigneeID = 0;
    let ConsigneeContactID = 0;
    let ShipperID = 0;
    let ShipperContactID = 0;
    let AgentID = 0;
    let AgentContactID = 0;
    let SalesLeadID = 0;
    let SalesLeadContactID = 0;

    let TemplateID = 0;
    let Subject = "0";
    let TermsAndConditions = "0";
    let BranchID = 0;
    let SalesmanID = 0;
    let OperationManID = 0;
    let Notes = "0";
    let IsDangerousGoods = false;
    let IsWarehousing = false;
    let DescriptionOfGoods = "0";

    if (pRequestedApprovalLevel == 1) {
        ConsigneeID = (!CheckValueIsValidInput("#slConsignees") ? 0 : $('#slConsignees').val());
        ConsigneeContactID = (!CheckValueIsValidInput("#slConsigneeContacts") ? 0 : $('#slConsigneeContacts').val());
        ShipperID = (!CheckValueIsValidInput("#slShippers") ? 0 : $('#slShippers').val());
        ShipperContactID = (!CheckValueIsValidInput("#slShipperContacts") ? 0 : $('#slShipperContacts').val());
        AgentID = (!CheckValueIsValidInput("#slAgents") ? 0 : $('#slAgents').val());
        AgentContactID = (!CheckValueIsValidInput("#slAgentContacts") ? 0 : $('#slAgentContacts').val());
        SalesLeadID = !CheckValueIsValidInput("#slSalesLead") ? 0 : $("#slSalesLead").val();
        SalesLeadContactID = !CheckValueIsValidInput("#slSalesLeadContact") ? 0 : $("#slSalesLeadContact").val();

        TemplateID = !CheckValueIsValidInput("#slQuotationEditTemplate") ? 0 : $("#slQuotationEditTemplate").val();
        Subject = !CheckValueIsValidInput("#txtQuotationEditSubject") ? 0 : $("#txtQuotationEditSubject").val();
        TermsAndConditions = !CheckValueIsValidInput("#txtQuotationEditTermsAndConditions") ? 0 : $("#txtQuotationEditTermsAndConditions").val();
        BranchID = !CheckValueIsValidInput("#slQuotationEditBranch") ? 0 : $("#slQuotationEditBranch").val();
        SalesmanID = !CheckValueIsValidInput("#slQuotationSalesman") ? 0 : $("#slQuotationSalesman").val();
        OperationManID = !CheckValueIsValidInput("#slOperationEditOperationMan") ? 0 : $("#slOperationEditOperationMan").val();
        Notes = !CheckValueIsValidInput("#txtQuotationNotes") ? "0" : $("#txtQuotationNotes").val();
        IsDangerousGoods = !CheckValueIsValidInput("#cbDangerousGoods") ? false : $("#cbDangerousGoods").prop('checked');
        IsWarehousing = !CheckValueIsValidInput("#cbIsWarehousing") ? false : $("#cbIsWarehousing").prop('checked');
        DescriptionOfGoods = !CheckValueIsValidInput("#divGoodsDescription") ? "0" : $("#divGoodsDescription").val();

    }

    CallGETFunctionWithParameters("/api/Quotations/SendQuotationApprovalRequest",
        {
            pAlarmReceiversIDs: pSelectedAlarmReceiversIDs,
            pQuotationID: $("#hQuotationID").val(),
            pRequstedApprovalLevel: pRequestedApprovalLevel,
            pShipperID: ShipperID,
            pShipperContactID: ShipperContactID,
            pConsigneeID: ConsigneeID,
            pConsigneeContactID: ConsigneeContactID,
            pAgentID: AgentID,
            pAgentContactID: AgentContactID,
            pSalesLeadID: SalesLeadID,
            pSalesLeadContactID: SalesLeadContactID,
            pTemplateID: TemplateID,
            pSubject: Subject,
            pTermsAndConditions: TermsAndConditions,
            pBranchID: BranchID,
            pSalesmanID: SalesmanID,
            pOperationManID: OperationManID,
            pNotes: Notes,
            pIsDangerousGoods: IsDangerousGoods,
            pIsWarehousing: IsWarehousing,
            pDescriptionOfGoods: DescriptionOfGoods
        },
        function (pData) {
            debugger;
            let pReturnedMessage = pData[0];
            if (pReturnedMessage != "")
                swal("Sorry", pReturnedMessage);
            else {
                swal("Success", "Saved successfully.");
                jQuery("#CheckboxesListModal").modal("hide");
            }
            FadePageCover(false);
        })
}
function QuotationEditConfirmApproval(pApprovalLevel, pReject) {
    debugger;
    CallGETFunctionWithParameters("/api/Quotations/QuotationEditConfirmApproval",
        {
            pQuotationID: $("#hQuotationID").val(),
            pSetApprovalLevel: pApprovalLevel,
            pDummy: 0,
            pIsReject: pReject
        },
        function (pData) {
            debugger;
            if (pData[0] == "") {
                if (pApprovalLevel < 3 && pApprovalLevel > 0)
                    Quotations_Request_ApprovalLevel(parseInt(pApprovalLevel) + 1);
                else
                    swal("Success", "Saved successfully.");
            } else {
                swal("Sorry", pData[0]);
            }
        }, null);
}

function Quotation_cbIsLoadingDischargingChange() {
    debugger;
    if ($("#cbIsLoadingDischarging").prop("checked") || $("#cbIsPackingRemovals").prop("checked") || $("#cbIsSurvey").prop("checked") || $("#cbIsLashing").prop("checked")) {
        $("#lblShippers").text("Client");
        $(".classShowForWarehousing").removeClass("hide");
        $(".classHideForWarehousing").addClass("hide");
        $(".classNotMandatoryForWarehousing").attr("data-required", "false");
        $("#cbIsSalesLead").prop("checked", false);
        $("#cbDangerousGoods").prop("checked", false);
        //Set as Domestic
        {
            $("#cbIsDomestic").prop("checked", true);
            $("#hDirectionIconName").val(DomesticIconName);
            $("#hDirectionIconStyle").val(strDomesticIconStyleClassName);
            $("#slConsignees").attr("data-required", "false");
            $("#divShipper").removeClass("hide");
            $("#slShippers").attr("data-required", "true");
        }
        //Set as Inland
        {
            $("#cbIsInland").prop("checked", true);

            $("#hTransportIconName").val(InlandIconName);
            $("#hTransportIconStyle").val(strInlandIconStyleClassName);
            ////show section ShipmentType (FTL,LTL)
            //$("#secShipmentType").removeClass("hide");
            $("#divOceanType").addClass("hide");
            //$("#divInlandType").removeClass("hide");
            //set LTL as default
            $("#cbIsLTL").prop('checked', true);
        }
    } else {
        Quotations_ClearAllControls();
    }
}
function uncheckOthers(currentId) {
    const ids = [
        'cbIsWarehousing',
        'cbIsLoadingDischarging',
        'cbIsPackingRemovals',
        'cbIsSurvey',
        'cbIsLashing'
    ];

    ids.forEach(id => {
        if (id !== currentId) {
            document.getElementById(id).checked = false;
        }
    });
}
function getQuotationType(quotation) {
    if (quotation.IsWarehousing) {
        return "(Warehousing)"
    } else if (quotation.IsLoadingDischarging) {
        return "(Loading Discharging)"
    } else if (quotation.IsPackingRemovals) {
        return "(Packing Removals)"
    } else if (quotation.IsSurvey) {
        return "(Survey)"
    } else if (quotation.IsLashing) {
        return "(Lashing)"
    } else {
        "<i class= 'fa " + quotation.TransportIconName + " " + quotation.TransportIconStyle + " fa-2x'/>"
    }
}