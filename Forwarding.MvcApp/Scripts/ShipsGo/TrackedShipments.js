
function TrackedShipments_Initialize() {
    debugger;
    UnLoadOperationsSubMenu();
    strBindTableRowsFunctionName = "TrackedShipments_BindTableRows";
    strLoadWithPagingFunctionName = "/api/ShipsGo/LoadTrackedShipments";

    LoadView("/Pricing/TrackedShipments", "div-content", function () {


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
                    TrackedShipments_BindTableRows(JSON.parse(pData[0]));
                    $("#h3TrackedShipments").text(`Tracked Shipments (Max:${pData[4]} - Remaining:${pData[4] - pData[3]})`);
                } else {
                    swal("Sorry", "Error Loading Data...");
                    LoadViews('Dashboard');
                }
                ApplyPermissions();
            });
    },
        function () {},
        function () {});
}


function TrackedShipments_BindTableRows(pRows) {
    debugger;
    ClearAllTableRows("tblTrackedShipments");
    $.each(pRows, function (i, item) {
        debugger;
        AppendRowtoTable("tblTrackedShipments",
            ("<tr>"
                + "<td class='Customer' val='" + item.CustomerID + "'>" + item.CustomerName + "</td>"
                + "<td class='OperationCode' style='min-width: 150px;'>" + item.OperationCode  + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.Status  + "</td>"
                + "<td class='' style='min-width: 150px;'>" + GetFullDateTime_DD_MM_YY_ForTrackedShipments(item.LastChecked) + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.ReferenceNo  + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.BLReferenceNo  + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.ShippingLine  + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.ContainerNumber  + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.ContainerTEU  + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.FromCountry  + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.Pol  + "</td>"
                + "<td class='' style='min-width: 150px;'>" + displayDate(item.LoadingDate) + "</td>"
                + "<td class='' style='min-width: 150px;'>" + displayDate(item.DepartureDate) + "</td>"
                + "<td class='' style='min-width: 150px;'>" + displayTSPorts(item.TSPorts) + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.ToCountry + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.Pod + "</td>"
                + "<td class='' style='min-width: 150px;'>" + displayDate(item.ArrivalDate) + "</td>"
                + "<td class='' style='min-width: 150px;'>" + displayDate(item.DischargeDate) + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.Vessel + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.VesselIMO + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.VesselLatitude + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.VesselLongitude + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.GateOutDate + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.EmptyReturnDate + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.FormatedTransitTime + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.ETA + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.FirstETA + "</td>"
                + "<td class='' style='min-width: 150px;'>" + item.BLContainerCount + "</td>"
                + "<td class='' style='min-width: 150px;'>" + displayContainers(item.BLContainers) + "</td>"
                + "<td class='' style='min-width: 150px;'>" + '<a style="color:blue;" target="_blank" href="' + item.LiveMapUrl + '">Live Map</a>' + "</td>"
                + "</tr> "));
        debugger;
    });

    //BindAllCheckboxonTable("tblShipsGoCustomers", "ID");
    //CheckAllCheckbox("ID");
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
/*function ShipsGoCustomers_ClearAllControls(callback){
    debugger;
    ClearAll("#ShipsGoCustomersModal");
    $("#txtEmail").val("");
    $("#slCustomer").trigger('change');

    jQuery("#ShipsGoCustomersModal").modal("show");


    $("#btnSaveShipsGoCustomer").attr("onclick", "AddNewShipsGoCustomer();");

    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}*/

/*function ShipsGoCustomers_LoadingWithPaging(){
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
}*/
/*function ShipsGoCustomer_EditByDblClick(pID) {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/ShipsGoAPI/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned", {
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
    };
    PostInsertUpdateFunction("form", "/api/ShipsGo/UpdateShipsGoCustomer", data, false, "ShipsGoCustomersModal", function (pData) {
        if (pData[0] == false) {
            swal("Sorry", pData[1]);
        } else {
            ShipsGoCustomers_LoadingWithPaging();
        }
    });
}*/
function GetFullDateTime_DD_MM_YY_ForTrackedShipments(pSenderDate) {
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

    return (Day + "/" + Month + "/" + dtFormatedMDY.getFullYear() + " " + strTime);
}
function displayDate(jsonString) {
    if (jsonString == "")
        return "";
    const data = JSON.parse(jsonString);
    if (data == null) {
        return "";
    }
    const date = new Date(data.Date);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return `${formattedDate} ${data.IsActual ? '(Actual)' : '(Estimated)'}`;
}
function formatDateTR(dateObj) {
    if (!dateObj || !dateObj.Date) return "Unknown";
    if (dateObj == null) {
        return "";
    }
    const date = new Date(dateObj.Date);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return `${formattedDate} (${dateObj.IsActual ? 'Actual' : 'Estimated'})`;
}
function displayTSPorts(jsonString) {
    debugger;
    const vessels = JSON.parse(jsonString);
    let readableOutput = "";

    vessels.forEach((vessel, index) => {
        readableOutput += `Port (${index + 1}): ${vessel.Port}\n<br>`;
        readableOutput += `Vessel: ${vessel.Vessel}\n<br>`;
        readableOutput += `IMO: ${vessel.VesselIMO}\n<br>`;
        readableOutput += `Arrival: ${formatDateTR(vessel.ArrivalDate)}\n<br>`;
        readableOutput += `Departure: ${formatDateTR(vessel.DepartureDate)}\n<br>`;

        if (index < vessels.length - 1) {
            readableOutput += "\n---------------------------\n\n<br>";
        }
    });

    return readableOutput;
}
function displayContainers(jsonString) {
    debugger;
    let readableOutput = "";
    if (jsonString == "") {
        return "";
    }

    const containers = JSON.parse(jsonString);

    containers.forEach(container => {
        readableOutput += `Container Code: ${container.ContainerCode}\n<br>`;
        readableOutput += `Container TEU: ${container.ContainerTEU} feet\n<br>`;
        readableOutput += `Gate Out Date: ${container.BLGateOutDate}\n<br>`;
        readableOutput += `Empty Return Date: ${container.BLEmptyReturnDate}\n<br>`;
        readableOutput += `<a style='color:blue;' href='${container.LiveMapUrl}' target='_blank'>Live Map</a>\n<br>`;
        readableOutput += '-------------------\n<br>';
    });

    return readableOutput;
}