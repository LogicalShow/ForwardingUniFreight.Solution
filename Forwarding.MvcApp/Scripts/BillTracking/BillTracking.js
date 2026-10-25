//$(document).ready(function () {


//    BillTracking_LoadingWithPaging();

//    $("div[tabindex='-1']").removeAttr('tabindex');

//    FadePageCover(false);
//    setTimeout(function () {
//        UpdateAllBillsData();
//    }, 100);


//});

function BillTracking_GetFilterWhereClause() {
    debugger;

    let pWhereClause = "WHERE 1=1";


    if ($("#txtFilterOperationCodeCCModule").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND (OperationCode LIKE '%" + $("#txtFilterOperationCodeCCModule").val().trim() + "%')";
    }

    if ($("#txtFilterBillNoCCModule").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND (BillNo LIKE '%" + $("#txtFilterBillNoCCModule").val().trim() + "%')";
    }

    pWhereClause = (pWhereClause == "" ? " WHERE 1=1" : pWhereClause);


    return pWhereClause;
}
function BillTracking_LoadingWithPaging() {
    debugger;

    var pWhereClause = BillTracking_GetFilterWhereClause();
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/BillTrackingAPI/LoadWithWhereClause", pWhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pData) { BillTracking_BindTableRows(pData); BillTracking_ClearAllControls(); });

    HighlightText("#tblBillTrackingDataData>tbody>tr", $("#txt-Search").val().trim());
}

// BillTracking Region ---------------------------------------------------------------
// Bind Operations with BillTracking Table Rows
function BillTracking_BindTableRows(pBillTrackingData) {
    ClearAllTableRows("tblBillTrackingData");
    $.each(pBillTrackingData, function (i, item) {

        AppendRowtoTable("tblBillTrackingData",

            //("<tr ID='" + item.ID + "' ondblclick='BillTracking_FillControls(" + item.ID + "," + null + ");' class=" + (item.IsInactive == null ? "static-text-danger" : "") + ">"

            ("<tr ID='" + item.ID + "' OperationID='" + item.OperationID + "' onclick='BillTracking_FillControls(" + item.ID + "," + null + ");'>"

                + "<td class='No' val='" + (i + 1) + "'>" + (i + 1) + "</td>"

                + "<td class='OperationCode' val='" + item.OperationCode + "'>" + item.OperationCode + "</td>"

                + "<td class='BillNo' val='" + item.BillNo + "'>" + item.BillNo + "</td>"

                + "<td class='Status' val='" + item.Status + "'>" + item.Status + "</td>"

                + "<td class='ShippingLine' val='" + item.ShippingLine + "'>" + item.ShippingLine + "</td>"

                + "<td class='LoadPort' val='" + item.LoadPort + "'>" + item.LoadPort + "</td>"

                + "<td class='DischargePort' val='" + item.DischargePort + "'>" + item.DischargePort + "</td>"

                + "<td class='ContainersCount' val='" + item.ContainersCount + "'>" + item.ContainersCount + "</td>"

                + "<td class='ContainersCount hide' val='" + item.FirstETA + "'>" + item.FirstETA + "</td>"

                + "<td class='OperationExpectedArrivalDate' val='" + item.OperationExpectedArrivalDate + "'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatDMY(item.OperationExpectedArrivalDate)) < 1 ? "" : GetDateWithFormatDMY(item.OperationExpectedArrivalDate)) + "</td>"

                + "<td class='OperationActualArrivalDate' val='" + item.OperationActualArrivalDate + "'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatDMY(item.OperationActualArrivalDate)) < 1 ? "" : GetDateWithFormatDMY(item.OperationActualArrivalDate)) + "</td>"

                + "<td class='ContainersCount' val='" + item.ETA + "'>" + item.ETA + "</td>"



                + "<td class='LiveMapURL' val='" + item.LiveMapURL + "'> <a href=" + item.LiveMapURL + " target='_blank' rel='noopener noreferrer'>Go to Live Map</a> </td>"

                + "<td class='FreeDays' val='" + item.NumberOfAllowanceDays + "'>" + item.NumberOfAllowanceDays + "</td>"


                + "</tr> "));


        $("#slFilterTrackingStageCCModule" + item.ID).val(item.TrackingStageID == 0 ? "" : item.TrackingStageID);
        $("#slFilterTrackingStageCCModule" + item.ID).attr("onchange", "GetTrackingStageUpdates(" + item.ID + ", 0);");
    });
    ApplyPermissions();
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function BillTracking_FillControls(pID, pCallback) {
    debugger;
    FadePageCover(true);

    ClearAllTableRows("tblBillTrackingContainersData");

    var tr = $("#tblBillTrackingData tr[ID='" + pID + "']");

    $("#txtOperationCodeModel").val($(tr).find("td.OperationCode").text());
    $("#txtBillNoModel").val($(tr).find("td.BillNo").text());

    var pOperationID = $(tr).attr("OperationID");

    var pParametersWithValues = {
        pWhereClause: "WHERE OperationID =" + pOperationID
    };

    CallGETFunctionWithParameters("/api/BillTrackingAPI/GetContainersData"
        , pParametersWithValues
        , function (pData) {
            debugger;
            var containers = JSON.parse(pData);
            $.each(containers, function (i, item) {

                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //var targetGateOutDate = (item.GateOutDate == "" ? (Date.prototype.compareDates("01/01/1900", GetDateWithFormatDMY(item.TruckingOrdersMovementTime)) < 1 ? "" : GetDateWithFormatDMY(item.TruckingOrdersMovementTime)) : item.GateOutDate);

                //var targetEmptyReturnDate = (item.EmptyReturnDate == "" ? (Date.prototype.compareDates("01/01/1900", GetDateWithFormatDMY(item.TruckingOrdersReturnDate)) < 1 ? "" : GetDateWithFormatDMY(item.TruckingOrdersReturnDate)) : item.EmptyReturnDate);
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                var targetGateOutDate = item.GateOutDate;
                var targetEmptyReturnDate = item.EmptyReturnDate;

                var todayDate = moment().format('YYYY/MM/DD');
                console.log(todayDate);

                var returnDate = targetEmptyReturnDate;
                //var returnDate = "2024/02/13";

                var allowanceDays = item.NumberOfAllowanceDays;

                var differenceDays = Date.prototype.compareDates(todayDate, returnDate);

                var remainingFreeDays = allowanceDays + differenceDays;

                var allowanceFreeDays, exceededdays;

                if (returnDate == "") {
                    allowanceFreeDays = 0;
                    exceededdays = 0;
                }
                else if (remainingFreeDays >= 0) {
                    allowanceFreeDays = remainingFreeDays;
                    exceededdays = 0
                }

                else {
                    exceededdays = Math.abs(differenceDays + allowanceDays);
                    allowanceFreeDays = 0;
                }


                AppendRowtoTable("tblBillTrackingContainersData",

                    ("<tr ID='" + item.ID + "' >"

                        + "<td class='No' val='" + (i + 1) + "'>" + (i + 1) + "</td>"

                        + "<td class='ContainerNumber' val='" + item.ContainerNumber + "'>" + item.ContainerNumber + "</td>"

                        + "<td class='TEU' val='" + item.TEU + "'>" + item.TEU + "</td>"

                        + "<td class='LiveMapURL' val='" + item.LiveMapURL + "'> <a href=" + item.LiveMapURL + " target='_blank' rel='noopener noreferrer'>Go to Live Map</a> </td>"


                        + "<td class='GateOutDate hide' val='" + item.GateOutDate + "'>" + item.GateOutDate + "</td>"


                        + "<td class='TruckingOrdersMovementTime hide' val='" + item.TruckingOrdersMovementTime + "'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatDMY(item.TruckingOrdersMovementTime)) < 1 ? "" : GetDateWithFormatDMY(item.TruckingOrdersMovementTime)) + "</td>"

                        + "<td class='targetGateOutDate' val='" + targetGateOutDate + "'>" + targetGateOutDate + "</td>"



                        + "<td class='targetEmptyReturnDate' val='" + targetEmptyReturnDate + "'>" + targetEmptyReturnDate + "</td>"

                        + "<td class='EmptyReturnDate hide' val='" + item.EmptyReturnDate + "'>" + item.EmptyReturnDate + "</td>"


                        + "<td class='TruckingOrdersReturnDate hide' val='" + item.TruckingOrdersReturnDate + "'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatDMY(item.TruckingOrdersReturnDate)) < 1 ? "" : GetDateWithFormatDMY(item.TruckingOrdersReturnDate)) + "</td>"

                        + "<td class='TruckingOrdersReturnDate hide' val='" + item.TruckingOrdersActualReturnDate + "'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatDMY(item.TruckingOrdersActualReturnDate)) < 1 ? "" : GetDateWithFormatDMY(item.TruckingOrdersActualReturnDate)) + "</td>"

                        //+ "<td> <div contenteditable>editable</div></td>"

                        //+ `<td><input id="input-${item.ID}" type="date" data-date-format="dd-mm-yyyy" placeholder="dd-mm-yyyy" /></td>`

                        //+ `<td><input type="date">   </td>`


                        + "<td class='FreeDays' val='" + item.NumberOfAllowanceDays + "'>" + item.NumberOfAllowanceDays + "</td>"


                        + "<td class='Plus' val='" + 0 + "'>" + allowanceFreeDays + "</td>"

                        + "<td class='Plus' val='" + 0 + "'>" + exceededdays + "</td>"

                        //+ "<td> <div contenteditable>editable</div></td>"

                        //+ "<td> <input type='text'>  </td>"


                        + "</tr> "));
            });

            FadePageCover(false);
            jQuery("#BillTrackingModal").modal("show");

        }
        , null);

    if (pCallback != null && pCallback != undefined) {
        pCallback();
    }
}

function BillTracking_ClearAllControls(callback) {
    debugger;
    ClearAll("#BillTrackingModal");
    ClearAllTableRows("tblBillTrackingContainersData");
    if (callback != null && callback != undefined)
        callback();
}

function BillTracking_ClearAllControls(callback) {
    debugger;
    ClearAll("#BillTrackingModal");
    ClearAllTableRows("tblBillTrackingContainersData");
    if (callback != null && callback != undefined)
        callback();
}

async function getMasterBillData(MasterBillNo) {
    debugger;

    var APIDataParameters = {};

    let promise = new Promise((resolve, reject) => {
        $.ajax({
            url: '/api/ShipsGo/GetContainerDataWithBL',
            data: { 'blContainersRef': MasterBillNo },
            type: 'get',
            success: function (MasterBillData) {
                const validResponse = Array.isArray(MasterBillData) && MasterBillData[0].Message == 'Success';
                if (validResponse) {
                    var BillData = MasterBillData[0];
                    APIDataParameters = {
                        Status: BillData.Status,
                        BLReferenceNo: BillData.BLReferenceNo,
                        LiveMapUrl: BillData.LiveMapUrl,
                        FromCountry: BillData.FromCountry,
                        ToCountry: BillData.ToCountry,
                        ShippingLine: BillData.ShippingLine,
                        ContainersCount: BillData.BLContainerCount,
                        ETA: BillData.ETA,
                        TotalTT: BillData.FormatedTransitTime,
                        FirstETA: BillData.FirstETA,

                        //POL
                        POLName: BillData.Pol,
                        POLLoadingDate: BillData.LoadingDate.Date,
                        LoadingDateIsActual: BillData.LoadingDate.IsActual,

                        POLDepartureDate: BillData.DepartureDate.Date,
                        DepartureDateIsActual: BillData.DepartureDate.IsActual,

                        TSPorts: BillData.TSPorts,
                        PODName: BillData.Pod,
                        PODArrivalDate: BillData.ArrivalDate.Date,
                        ArrivalDateIsActual: BillData.ArrivalDate.IsActual,
                        PODDischargeDate: BillData.DischargeDate.Date,
                        DischargeDateIsActual: BillData.DischargeDate.IsActual,

                        //get containers Data 
                        BillContainersData: getBillContainersData(MasterBillData)
                    };

                }
                resolve(APIDataParameters);
            }
        })
    });

    let result = await promise;

    return result;

}

function getBillContainersData(MasterBillData) {
    debugger;

    var BillData = MasterBillData[0];

    var BillContainersData = [];

    //Getting data of the Main Container in the Bill
    var FirstContainerData = [BillData.ContainerNumber, BillData.ContainerTEU, BillData.LiveMapUrl, BillData.GateOutDate, BillData.EmptyReturnDate];
    BillContainersData.push(FirstContainerData);


    //Getting data of the other Containers in the Bill
    var OtherContainersData = [];

    var items = BillData.BLContainers;
    if (items.length > 0) {
        $.each(items, function (i, item) {
            OtherContainersData[i] = [item.ContainerCode, item.ContainerTEU, item.LiveMapUrl, item.BLGateOutDate, item.BLEmptyReturnDate];
            BillContainersData.push(OtherContainersData[i]);
        });
    }

    return BillContainersData;
}


////////////////////////////////////////////////////////////
//////////////Updating Bill Data and the associated containers  //////////////////////////      

function BillTracking_UpdateBillData(billNoID, operationID, billNo, BillData) {
    debugger;
    var pParametersWithValues = {
        pBillNoID: billNoID,
        pOperationID: operationID,
        pBillNo: billNo,
        pStatus: BillData.Status,
        pLiveMapURL: BillData.LiveMapUrl,
        pShippingLine: BillData.ShippingLine,
        pPOLCountry: BillData.FromCountry,
        pPODCountry: BillData.ToCountry,
        pLoadPort: BillData.POLName,
        pDischargePort: BillData.PODName,
        pContainersCount: BillData.ContainersCount,
        pETA: BillData.ETA,
        pFormatedTransitTime: BillData.TotalTT,
        pFirstETA: BillData.FirstETA,
        pLoadingDate: BillData.POLLoadingDate,
        pLoadingDateIsActual: BillData.LoadingDateIsActual,
        pDepartureDate: BillData.POLDepartureDate,
        pDepartureDateIsActual: BillData.DepartureDateIsActual,
        pArrivalDate: BillData.PODArrivalDate,
        pArrivalDateIsActual: BillData.ArrivalDateIsActual,
        pDischargeDate: BillData.PODDischargeDate,
        pDischargeDateIsActual: BillData.DischargeDateIsActual
    };

    CallPOSTFunctionWithParameters("/api/BillTrackingAPI/UpdateBillsData", pParametersWithValues
        , function (pData) {
            if (pData) {
                //console.log(pData)
                //swal("Success", "Saved successfully.");
            }
            else {
                swal("Sorry", "Updating Bills Data failed, please try again.");
            }
        }
        , null);
    //BillTracking_LoadingWithPaging();
    //FadePageCover(true);
}
function BillTracking_UpdateContainersData(BillContainer) {
    debugger;
    var pParametersWithValues = {
        pContanierNo: BillContainer[0],
        pContanierTEU: BillContainer[1],
        pContanierLiveMapUrl: BillContainer[2],
        pContanierGateOutDate: BillContainer[3],
        pContanierEmptyReturnDate: BillContainer[4]
    };

    CallGETFunctionWithParameters("/api/BillTrackingAPI/UpdateContainersData", pParametersWithValues
        , function (pData) {
            if (pData) {
                //console.log(pData)
                //swal("Success", "Saved successfully.");
            }
            else {
                swal("Sorry", "Updating Containers Data failed, please try again.");
            }
            //FadePageCover(false);
        }
        , null);
}

// Update one Bill record from API and the associated containers
function UpdateBillAndOperationRecord(billNoID, operationID, billNo) {
    debugger;
    var APIMasterBillData = getMasterBillData(billNo);

    //resolving promise from API
    Promise.resolve(APIMasterBillData).then((MasterBillData) => {

        const validResponse = Object.entries(MasterBillData).length != 0;

        if (validResponse) {

            BillTracking_UpdateBillData(billNoID, operationID, billNo, MasterBillData);

            //UpdateOperationRecordData(operationID, MasterBillData.FirstETA)

            var LastETA = getLastETA(MasterBillData.FirstETA, MasterBillData.ETA);

            UpdateOperationRecordData(operationID, LastETA);

            //BillTracking_LoadingWithPaging(); 



            if (MasterBillData.Status == 'New') {

                swal("Confirmed", "Please, wait until getting the shipment data and try again later");
            }
            else if (MasterBillData.Status == 'Inprogress') {
                swal("Confirmed", "The request is in progress.Please,try again later");
            }
            else if (MasterBillData.Status == 'Untracked') {
                swal("Sorry", "It’s not possible to track the containers for this Bill No.");
            }
            else {

                BillContainers = MasterBillData.BillContainersData
                $.each(BillContainers, function (i, item) {

                    BillTracking_UpdateContainersData(item);
                });
            }
        }
        else {
            // swal("Sorry", "Internal Error in API");
        }
    })
        .catch((error) => {
            swal("Sorry", "Failed to get the data from API");
            //console.log(error);
        });
}

// Update All Bills Data from API
function UpdateAllBillsData() {
    debugger;

    //FadePageCover(true);

    var billNoID = 0;
    var operationID = 0;
    var billNo = "";

    var BillDataTable = $("#tblBillTrackingData tbody");

    var trows = BillDataTable.children("tr");

    $.each(trows, function (index, row) {
        billNoID = $(row).attr("ID");
        operationID = $(row).attr("OperationID");
        billNo = $(row).find("td.BillNo").text()

        UpdateBillAndOperationRecord(billNoID, operationID, billNo);
    });
    BillTracking_LoadingWithPaging();
}

//setInterval(UpdateAllBillsData, 60000);

setTimeout(function () {
    UpdateAllBillsData();
}, 1000);

////////////////////////////////NOT USED////////////////////////////////////////
/*
function BillTracking_UpdateBillsDataWithBLNo(billNo, BillData) {

    var pParametersWithValues = {
        pBillNo: billNo,
        pStatus: BillData.Status,
        pLiveMapURL: BillData.LiveMapUrl,
        pShippingLine: BillData.ShippingLine,
        pPOLCountry: BillData.FromCountry,
        pPODCountry: BillData.ToCountry,
        pLoadPort: BillData.POLName,
        pDischargePort: BillData.PODName,
        pContainersCount: BillData.ContainersCount,
        pETA: BillData.ETA,
        pFormatedTransitTime: BillData.TotalTT,
        pFirstETA: BillData.FirstETA,
        pLoadingDate: BillData.POLLoadingDate,
        pLoadingDateIsActual: BillData.LoadingDateIsActual,
        pDepartureDate: BillData.POLDepartureDate,
        pDepartureDateIsActual: BillData.DepartureDateIsActual,
        pArrivalDate: BillData.PODArrivalDate,
        pArrivalDateIsActual: BillData.ArrivalDateIsActual,
        pDischargeDate: BillData.PODDischargeDate,
        pDischargeDateIsActual: BillData.DischargeDateIsActual,
    };

    CallGETFunctionWithParameters("/api/BillTrackingAPI/UpdateBillsDataWithBLNo", pParametersWithValues
        , function (pData) {
            if (pData) {

                console.log(JSON.parse(pData[1]))

                //BillTracking_BindTableRows(JSON.parse(pData[1]));
                BillTracking_LoadingWithPaging(JSON.parse(pData[1]));

                //swal("Success", "Saved successfully.");
            }
            else {
                swal("Sorry", "Updating Containers Data failed, please try again.");
            }
            //FadePageCover(false);
        }
        , null);

}

function UpdateAllBillsDataWithBLNo() {
    debugger;


    var pParametersWithValues = {
        pWhereClause: "Where 1=1"
    };
    CallGETFunctionWithParameters("/api/BillTrackingAPI/GetBillData", pParametersWithValues
        , function (pData) {
            var BillsData = JSON.parse(pData);

            BillsData.forEach((item, i) => {

                console.log(item.BillNo);

                UpdateBillRecordWithBLNo(item.BillNo);


            });

        }
        , null);
    //BillTracking_LoadingWithPaging();

}

function UpdateBillRecordWithBLNo(billNo) {
    debugger;
    var APIMasterBillData = getMasterBillData(billNo);

    //resolving promise from API
    Promise.resolve(APIMasterBillData).then((MasterBillData) => {

        const validResponse = Object.entries(MasterBillData).length != 0;

        if (validResponse) {

            BillTracking_UpdateBillData2(billNo, MasterBillData);

            if (MasterBillData.Status == 'New') {

                swal("Confirmed", "Please, wait until getting the shipment data and try again later");
            }
            else if (MasterBillData.Status == 'Inprogress') {
                swal("Confirmed", "The request is in progress.Please,try again later");
            }
            else if (MasterBillData.Status == 'Untracked') {
                swal("Sorry", "It’s not possible to track the containers for this Bill No.");
            }
            else {

                BillContainers = MasterBillData.BillContainersData
                $.each(BillContainers, function (i, item) {

                    BillTracking_UpdateContainersData(item);
                });
            }
        }
        else {
            swal("Sorry", "Internal Error in API");
        }
    })
        .catch((error) => {
            swal("Sorry", "Failed to get the data from API");
            //console.log(error);
        });

}
*/
///////////////////////////////--NOT USED--/////////////////////////////////////


//Updating the operation parameters with the new received  parameter from API
function UpdateOperationRecordData(OperationID, ExpectedArrival) {
    debugger;


    var pParametersWithValues = {
        pOperationID: OperationID
        , pExpectedArrival: ExpectedArrival
    };
    CallGETFunctionWithParameters("/api/BillTrackingAPI/UpdateOperationsData", pParametersWithValues
        , function (pData) {
            console.log(pData);
        }
        , null);
}
function getLastETA(FirstETA, Delay) {

    var LastETA = FirstETA;

    if (Delay != "") {

        if (Delay.includes('days Delay Occured.')) {

            daysDelay = parseInt(Delay.match(/\d+/)[0]);

            const dateObj = new Date(FirstETA)

            dateObj.setDate(dateObj.getDate() + daysDelay);

            LastETA = dateObj.toISOString().split('T')[0]

        }
    }

    return LastETA;
}
