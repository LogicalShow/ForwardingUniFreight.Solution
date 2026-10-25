
function ShipsGo_Initialize() {
    debugger;
    UnLoadOperationsSubMenu();
    strBindTableRowsFunctionName = "ShipsGoCustomers_BindTableRows";
    strLoadWithPagingFunctionName = "/api/ShipsGo/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    LoadView("/Pricing/ShipsGoCustomers", "div-content", function () {

        if (pDefaults.UnEditableCompanyName == "ELI") {
            $(".classShowForELI").removeClass("hide");
        } else if (pDefaults.UnEditableCompanyName == "ARK") {
            $(".classShowForARK").removeClass("hide");
        }

        var pOrderBy = "ID DESC";
        var pPageNumber = 1;
        var pPageSize = 10;
        var pWhereClause = "WHERE 1=1";
        var pControllerParameters = {
            pPageNumber: pPageNumber
            , pPageSize: pPageSize
            , pWhereClause: pWhereClause
            , pOrderBy: pOrderBy
        };

        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                if (pData[2] == "") {
                    ShipsGoCustomers_BindTableRows(JSON.parse(pData[0]));
                } else {
                    swal("Sorry", "Error Loading Data...");
                    LoadViews('Dashboard');
                }
                ApplyPermissions();
                LoadCombosData();
            });
    },
        function () { ShipsGoCustomers_ClearAllControls(); },
        function () { ShipsGoCustomers_DeleteList(); });
}


function ShipsGoCustomers_BindTableRows(pRows) {
    debugger;
    ClearAllTableRows("tblShipsGoCustomers");
    $.each(pRows, function (i, item) {
        debugger;
        AppendRowtoTable("tblShipsGoCustomers",
            ("<tr ID='" + item.ID + "' " + "ondblclick='ShipsGoCustomer_EditByDblClick(" + item.ID + ");' " + " >"
                + "<td class='ID'> <input name='Delete' type='checkbox' " + " value='" + item.ID + "' /></td>"
                + "<td class='Customer' val='" + item.CustomerID + "'>" + item.CustomerName + "</td>"
                + "<td class='Email' style='min-width: 150px;'>" + item.Email  + "</td>"
                + "</tr> "));
        debugger;
    });

    BindAllCheckboxonTable("tblShipsGoCustomers", "ID");
    CheckAllCheckbox("ID");
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ShipsGoCustomers_ClearAllControls(callback){
    debugger;
    ClearAll("#ShipsGoCustomersModal");
    $("#txtEmail").val("");
    $("#slCustomer").trigger('change');

    jQuery("#ShipsGoCustomersModal").modal("show");


    $("#btnSaveShipsGoCustomer").attr("onclick", "AddNewShipsGoCustomer();");

    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}
function LoadCombosData() {
    debugger;
    Select2OnlineSearch("slCustomer", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
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


    

    $("div[tabindex='-1']").removeAttr('tabindex');
}
function AddNewShipsGoCustomer() {
    debugger;
    if (!validateEmailList($("#txtEmail").val().trim().toUpperCase())) {
        swal("Sorry", "Check Emails separated by ;");
        return;
    }
    let data = {
        CustomerID: CheckValueIsValidInput("#slCustomer") ? $("#slCustomer").val() : 0
        , Email: CheckValueIsValidInput("#txtEmail") ? $("#txtEmail").val().trim().toUpperCase() : "0"
        , Status: CheckValueIsValidInput("#cbIsStatus") ? $("#cbIsStatus").prop('checked') : false
        , BLReferenceNo: CheckValueIsValidInput("#cbIsBLReferenceNo") ? $("#cbIsBLReferenceNo").prop('checked') : false
        , ShippingLine: CheckValueIsValidInput("#cbIsShippingLine") ? $("#cbIsShippingLine").prop('checked') : false
        , ContainerNumber: CheckValueIsValidInput("#cbIsContainerNumber") ? $("#cbIsContainerNumber").prop('checked') : false
        , ContainerTEU: CheckValueIsValidInput("#cbIsContainerTEU") ? $("#cbIsContainerTEU").prop('checked') : false
        , FromCountry: CheckValueIsValidInput("#cbIsFromCountry") ? $("#cbIsFromCountry").prop('checked') : false
        , Pol: CheckValueIsValidInput("#cbIsPol") ? $("#cbIsPol").prop('checked') : false
        , LoadingDate: CheckValueIsValidInput("#cbIsLoadingDate") ? $("#cbIsLoadingDate").prop('checked') : false
        , DepartureDate: CheckValueIsValidInput("#cbIsDepartureDate") ? $("#cbIsDepartureDate").prop('checked') : false
        , TSPorts: CheckValueIsValidInput("#cbIsTSPorts") ? $("#cbIsTSPorts").prop('checked') : false
        , ToCountry: CheckValueIsValidInput("#cbIsToCountry") ? $("#cbIsToCountry").prop('checked') : false
        , Pod: CheckValueIsValidInput("#cbIsPod") ? $("#cbIsPod").prop('checked') : false
        , ArrivalDate: CheckValueIsValidInput("#cbIsArrivalDate") ? $("#cbIsArrivalDate").prop('checked') : false
        , DischargeDate: CheckValueIsValidInput("#cbIsDischargeDate") ? $("#cbIsDischargeDate").prop('checked') : false
        , Vessel: CheckValueIsValidInput("#cbIsVessel") ? $("#cbIsVessel").prop('checked') : false
        , VesselIMO: CheckValueIsValidInput("#cbIsVesselIMO") ? $("#cbIsVesselIMO").prop('checked') : false
        , GateOutDate: CheckValueIsValidInput("#cbIsGateOutDate") ? $("#cbIsGateOutDate").prop('checked') : false
        , EmptyReturnDate: CheckValueIsValidInput("#cbIsEmptyReturnDate") ? $("#cbIsEmptyReturnDate").prop('checked') : false
        , FormatedTransitTime: CheckValueIsValidInput("#cbIsFormatedTransitTime") ? $("#cbIsFormatedTransitTime").prop('checked') : false
        , ETA: CheckValueIsValidInput("#cbIsETA") ? $("#cbIsETA").prop('checked') : false
        , FirstETA: CheckValueIsValidInput("#cbIsFirstETA") ? $("#cbIsFirstETA").prop('checked') : false
        , BLContainerCount: CheckValueIsValidInput("#cbIsBLContainerCount") ? $("#cbIsBLContainerCount").prop('checked') : false
        , BLContainers: CheckValueIsValidInput("#cbIsBLContainers") ? $("#cbIsBLContainers").prop('checked') : false
        , FromDate: CheckValueIsValidInput("#txtShipsGoFromDate") ? ConvertDateFormat($("#txtShipsGoFromDate").val().trim()) : '01/01/1900'
        , ToDate: CheckValueIsValidInput("#txtShipsGoToDate") ? ConvertDateFormat($("#txtShipsGoToDate").val().trim()) : '01/01/1900'
        , IsImport: CheckValueIsValidInput("#cbIsImport") ? $("#cbIsImport").prop('checked') : false
        , IsExport: CheckValueIsValidInput("#cbIsExport") ? $("#cbIsExport").prop('checked') : false
        , IsHaveCC: CheckValueIsValidInput("#cbIsHaveCC") ? $("#cbIsHaveCC").prop('checked') : false
    };
    PostInsertUpdateFunction("form", "/api/ShipsGo/InsertShipsGoCustomer", data, false, "ShipsGoCustomersModal", function (pData) {
        if (pData[0] == false) {
            swal("Sorry", pData[1]);
        } else {
            ShipsGoCustomers_LoadingWithPaging();
        }
    });
}
function ShipsGoCustomers_LoadingWithPaging(){
    debugger;
    var pOrderBy = "ID DESC";
    var pPageNumber = ($("#div-Pager li.active a").text() == 0 ? 1 : $("#div-Pager li.active a").text());
    var pPageSize = $('#select-page-size').val();
    var pWhereClause = "WHERE 1=1";
    var pControllerParameters = {
        pPageNumber: pPageNumber
        , pPageSize: pPageSize
        , pWhereClause: pWhereClause
        , pOrderBy: pOrderBy
    };

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (pData) {
            if (pData[2] == "") {
                ShipsGoCustomers_BindTableRows(JSON.parse(pData[0]));
            } else {
                swal("Sorry", "Error Loading Data...");
                LoadViews('Dashboard');
            }
        });
}
function ShipsGoCustomer_EditByDblClick(pID) {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/ShipsGo/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned", {
        pPageNumber: 1,
        pPageSize: 1,
        pWhereClause: "WHERE ID=" + pID,
        pOrderBy: "ID"
    }, function (pData) {
        if (pData[2] == "" && pData[1] == 1) {
            ShipsGoCustomer_FillControls(JSON.parse(pData[0])[0]);
        } else {
            swal("Sorry", "Error Loading Data...");
            LoadViews('Dashboard');
        }
    });
}
function ShipsGoCustomer_FillControls(pShipsGoCustomer) {
    debugger;
    ClearAll("#ShipsGoCustomersModal");
    jQuery("#ShipsGoCustomersModal").modal("show");

    $("#hShipsGoCustomerID").val(pShipsGoCustomer.ID);

    if ($('#slCustomer').find("option[value='" + pShipsGoCustomer.CustomerID + "']").length) {
        $('#slCustomer').val(pShipsGoCustomer.CustomerID).trigger('change');
    } else {
        let newOption = new Option(pShipsGoCustomer.CustomerName, pShipsGoCustomer.CustomerID, true, true);
        $('#slCustomer').append(newOption).trigger('change');
    }

    $("#txtEmail").val(pShipsGoCustomer.Email == "0" ? "" : pShipsGoCustomer.Email);
    $("#cbIsStatus").prop('checked', pShipsGoCustomer.Status);
    $("#cbIsBLReferenceNo").prop('checked', pShipsGoCustomer.BLReferenceNo);
    $("#cbIsShippingLine").prop('checked', pShipsGoCustomer.ShippingLine);
    $("#cbIsContainerNumber").prop('checked', pShipsGoCustomer.ContainerNumber);
    $("#cbIsContainerTEU").prop('checked', pShipsGoCustomer.ContainerTEU);
    $("#cbIsFromCountry").prop('checked', pShipsGoCustomer.FromCountry);
    $("#cbIsPol").prop('checked', pShipsGoCustomer.Pol);
    $("#cbIsLoadingDate").prop('checked', pShipsGoCustomer.LoadingDate);
    $("#cbIsDepartureDate").prop('checked', pShipsGoCustomer.DepartureDate);
    $("#cbIsTSPorts").prop('checked', pShipsGoCustomer.TSPorts);
    $("#cbIsToCountry").prop('checked', pShipsGoCustomer.ToCountry);
    $("#cbIsPod").prop('checked', pShipsGoCustomer.Pod);
    $("#cbIsArrivalDate").prop('checked', pShipsGoCustomer.ArrivalDate);
    $("#cbIsDischargeDate").prop('checked', pShipsGoCustomer.DischargeDate);
    $("#cbIsVessel").prop('checked', pShipsGoCustomer.Vessel);
    $("#cbIsVesselIMO").prop('checked', pShipsGoCustomer.VesselIMO);
    $("#cbIsGateOutDate").prop('checked', pShipsGoCustomer.GateOutDate);
    $("#cbIsEmptyReturnDate").prop('checked', pShipsGoCustomer.EmptyReturnDate);
    $("#cbIsFormatedTransitTime").prop('checked', pShipsGoCustomer.FormatedTransitTime);
    $("#cbIsETA").prop('checked', pShipsGoCustomer.ETA);
    $("#cbIsFirstETA").prop('checked', pShipsGoCustomer.FirstETA);
    $("#cbIsBLContainerCount").prop('checked', pShipsGoCustomer.BLContainerCount);
    $("#cbIsBLContainers").prop('checked', pShipsGoCustomer.BLContainers);
    $("#txtShipsGoFromDate").val(GetDateFromServer(pShipsGoCustomer.FromDate) == "01/01/2000" ? "" : GetDateFromServer(pShipsGoCustomer.FromDate));
    $("#txtShipsGoToDate").val(GetDateFromServer(pShipsGoCustomer.ToDate) == "01/01/2000" ? "" : GetDateFromServer(pShipsGoCustomer.ToDate));
    $("#cbIsImport").prop('checked', pShipsGoCustomer.IsImport);
    $("#cbIsExport").prop('checked', pShipsGoCustomer.IsExport);
    $("#cbIsHaveCC").prop('checked', pShipsGoCustomer.IsHaveCC);


    FadePageCover(false);
    $("#btnSaveShipsGoCustomer").attr("onclick", "EditShipsGoCustomer(" + pShipsGoCustomer.ID + ");");
}
function EditShipsGoCustomer(pID) {
    debugger;
    let data = {
        ID: pID
        , CustomerID: CheckValueIsValidInput("#slCustomer") ? $("#slCustomer").val() : 0
        , Email: CheckValueIsValidInput("#txtEmail") ? $("#txtEmail").val().trim().toUpperCase() : "0"
        , Status: CheckValueIsValidInput("#cbIsStatus") ? $("#cbIsStatus").prop('checked') : false
        , BLReferenceNo: CheckValueIsValidInput("#cbIsBLReferenceNo") ? $("#cbIsBLReferenceNo").prop('checked') : false
        , ShippingLine: CheckValueIsValidInput("#cbIsShippingLine") ? $("#cbIsShippingLine").prop('checked') : false
        , ContainerNumber: CheckValueIsValidInput("#cbIsContainerNumber") ? $("#cbIsContainerNumber").prop('checked') : false
        , ContainerTEU: CheckValueIsValidInput("#cbIsContainerTEU") ? $("#cbIsContainerTEU").prop('checked') : false
        , FromCountry: CheckValueIsValidInput("#cbIsFromCountry") ? $("#cbIsFromCountry").prop('checked') : false
        , Pol: CheckValueIsValidInput("#cbIsPol") ? $("#cbIsPol").prop('checked') : false
        , LoadingDate: CheckValueIsValidInput("#cbIsLoadingDate") ? $("#cbIsLoadingDate").prop('checked') : false
        , DepartureDate: CheckValueIsValidInput("#cbIsDepartureDate") ? $("#cbIsDepartureDate").prop('checked') : false
        , TSPorts: CheckValueIsValidInput("#cbIsTSPorts") ? $("#cbIsTSPorts").prop('checked') : false
        , ToCountry: CheckValueIsValidInput("#cbIsToCountry") ? $("#cbIsToCountry").prop('checked') : false
        , Pod: CheckValueIsValidInput("#cbIsPod") ? $("#cbIsPod").prop('checked') : false
        , ArrivalDate: CheckValueIsValidInput("#cbIsArrivalDate") ? $("#cbIsArrivalDate").prop('checked') : false
        , DischargeDate: CheckValueIsValidInput("#cbIsDischargeDate") ? $("#cbIsDischargeDate").prop('checked') : false
        , Vessel: CheckValueIsValidInput("#cbIsVessel") ? $("#cbIsVessel").prop('checked') : false
        , VesselIMO: CheckValueIsValidInput("#cbIsVesselIMO") ? $("#cbIsVesselIMO").prop('checked') : false
        , GateOutDate: CheckValueIsValidInput("#cbIsGateOutDate") ? $("#cbIsGateOutDate").prop('checked') : false
        , EmptyReturnDate: CheckValueIsValidInput("#cbIsEmptyReturnDate") ? $("#cbIsEmptyReturnDate").prop('checked') : false
        , FormatedTransitTime: CheckValueIsValidInput("#cbIsFormatedTransitTime") ? $("#cbIsFormatedTransitTime").prop('checked') : false
        , ETA: CheckValueIsValidInput("#cbIsETA") ? $("#cbIsETA").prop('checked') : false
        , FirstETA: CheckValueIsValidInput("#cbIsFirstETA") ? $("#cbIsFirstETA").prop('checked') : false
        , BLContainerCount: CheckValueIsValidInput("#cbIsBLContainerCount") ? $("#cbIsBLContainerCount").prop('checked') : false
        , BLContainers: CheckValueIsValidInput("#cbIsBLContainers") ? $("#cbIsBLContainers").prop('checked') : false
        , FromDate: CheckValueIsValidInput("#txtShipsGoFromDate") ? ConvertDateFormat($("#txtShipsGoFromDate").val().trim()) : '01/01/1900'
        , ToDate: CheckValueIsValidInput("#txtShipsGoToDate") ? ConvertDateFormat($("#txtShipsGoToDate").val().trim()) : '01/01/1900'
        , IsImport: CheckValueIsValidInput("#cbIsImport") ? $("#cbIsImport").prop('checked') : false
        , IsExport: CheckValueIsValidInput("#cbIsExport") ? $("#cbIsExport").prop('checked') : false
        , IsHaveCC: CheckValueIsValidInput("#cbIsHaveCC") ? $("#cbIsHaveCC").prop('checked') : false
    };


    PostInsertUpdateFunction("form", "/api/ShipsGo/UpdateShipsGoCustomer", data, false, "ShipsGoCustomersModal", function (pData) {
        if (pData[0] == false) {
            swal("Sorry", pData[1]);
        } else {
            ShipsGoCustomers_LoadingWithPaging();
        }
    });
}
function ShipsGoCustomers_DeleteList() {
    debugger;
    if (GetAllSelectedIDsAsString('tblShipsGoCustomers') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            function () {
                CallGETFunctionWithParameters("/api/ShipsGo/DeleteShipsGoCustomer", { pIDs: GetAllSelectedIDsAsString('tblShipsGoCustomers') }
                    , function (data) {
                        ShipsGoCustomers_LoadingWithPaging();
                    }
                    , function () { FadePageCover(false); });
            });
}
function validateEmailList(emailString) {
    if (!emailString || typeof emailString !== 'string') {
        return false;
    }

    const emails = emailString.split(';').map(email => email.trim());

    const filteredEmails = emails.filter(email => email !== '');

    if (filteredEmails.length === 0) {
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return filteredEmails.every(email => emailRegex.test(email));
}