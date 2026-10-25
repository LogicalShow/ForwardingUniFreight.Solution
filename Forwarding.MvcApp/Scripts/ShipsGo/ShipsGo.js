//Container Tracking
function ShipsGo() {
    //if (window.addEventListener)
    //    window.addEventListener("message", ShipsgoMessagesListener);

    //function ShipsgoMessagesListener() {
    //    if (event.data.Action === "LoadNewContainerCode")
    //        document.getElementById("IframeShipsgoLiveMap").src = "https://shipsgo.com/iframe/where-is-my-container/" + event.data.Parameters.ContainerCode;

    //}

    //var urlParams = new URLSearchParams(window.location.search);
    //var defaultQuery = urlParams.get('query');

    //if (defaultQuery === undefined || defaultQuery === null)
    //    defaultQuery = "default-container-code";

    //document.getElementById("IframeShipsgoLiveMap").src = "https://shipsgo.com/iframe/where-is-my-container/" + defaultQuery;

    //$("#ContainerCode").css("display", "none");
    //$("#ContainerCode").attr("style", "display:none;")
}

//getting Container Data With Container Number

function getContainerData() {
    let searchType = $("input[name=cbShipsGoSearchType]:checked").val()
    try {
        $.ajax({
            url: '/api/ShipsGo/' + (searchType == 1 ? 'GetContainerData' : 'GetContainerDataWithBL'),
            data: { 'SearchKey': $("#txtSearchKey").val() },
            type: 'get',
            success: function (ContainerData) {
                debugger;
                window.open(ContainerData[0].LiveMapUrl, "_blank");

                $("#Status").html(ContainerData[0].Status);
                $("#From").html(ContainerData[0].FromCountry);
                $("#To").html(ContainerData[0].ToCountry);


                $("#Delay").html(ContainerData[0].ETA);
                $("#TotalTT").html(ContainerData[0].FormatedTransitTime);
                $("#ETA").html(ContainerData[0].FirstETA);

                //POL
                $("#POL .name").html(ContainerData[0].Pol);
                $("#POL .LoadingDate").html(ContainerData[0].LoadingDate.Date);
                if (ContainerData[0].LoadingDate.IsActual == true) {
                    $("#POL .LoadingDate").addClass("textDone");
                    $("#POL .type").css("background-color", "green")
                    $("#POL .progressCircle").css("background-color", "green")
                }
                $("#POL .DepartureDate").html(ContainerData[0].DepartureDate.Date);
                if (ContainerData[0].DepartureDate.IsActual == true)
                    $("#POL .DepartureDate").addClass("textDone");

                //Transit ports TS
                if (ContainerData[0].TSPorts) {
                    const ports = ContainerData[0].TSPorts;
                    let counter = 0;
                    ports.forEach(function (port) {
                        debugger;
                        counter++;
                        $("#TS" + counter).removeClass("hide");
                        $("#TS" + counter + " .name").html(port.Port);
                        $("#TS" + counter + " .ArrivalDate").html(port.ArrivalDate.Date);
                        if (port.ArrivalDate.IsActual == true) {
                            $("#TS" + counter + " .ArrivalDate").addClass("textDone");
                            $("#TS" + counter + " .type").css("background-color", "green")
                            $("#TS" + counter + " .progressCircle").css("background-color", "green")
                        }
                        $("#TS" + counter + " .DepartureDate").html(port.DepartureDate.Date);
                        if (port.DepartureDate.IsActual == true)
                            $("#TS" + counter + " .DepartureDate").addClass("textDone");
                    })
                }

                //POD
                $("#POD .name").html(ContainerData[0].Pod);
                $("#POD .ArrivalDate").html(ContainerData[0].ArrivalDate.Date);
                if (ContainerData[0].ArrivalDate.IsActual == true) {
                    $("#POD .ArrivalDate").addClass("textDone");
                    $("#POD .type").css("background-color", "green")
                    $("#POD .progressCircle").css("background-color", "green")
                }
                $("#POD .DischargeDate").html(ContainerData[0].DischargeDate.Date);
                if (ContainerData[0].DischargeDate.IsActual == true)
                    $("#POD .DischargeDate").addClass("textDone");

                $("#containerData").removeClass("hide");
            }
        })
    } catch (error) {
        console.log(error);
    }

}

//getting Container Data With Bill Number
function getContainerDataWithBL() {
    try {
        $.ajax({
            url: '/api/ShipsGo/GetContainerData',
            data: { ContainerNumber: $("#blContainersRef").val() },
            type: 'get',
            success: function (ContainerData) {
                debugger;
                ClearAllTableRows("tblContainersData");

                const validResponse = Array.isArray(ContainerData) && ContainerData[0].Message == 'Success';
                if (validResponse) {
                    window.open(ContainerData[0].LiveMapUrl, "_blank");

                    $("#Status").html(ContainerData[0].Status);
                    $("#From").html(ContainerData[0].FromCountry);
                    $("#To").html(ContainerData[0].ToCountry);
                    $("#ShippingLine").html(ContainerData[0].ShippingLine);
                    $("#ContainersCount").html(ContainerData[0].BLContainerCount);


                    $("#Delay").html(ContainerData[0].ETA);
                    $("#TotalTT").html(ContainerData[0].FormatedTransitTime);
                    $("#ETA").html(ContainerData[0].FirstETA);

                    //POL
                    $("#POL .name").html(ContainerData[0].Pol);
                    $("#POL .LoadingDate").html(ContainerData[0].LoadingDate.Date);
                    if (ContainerData[0].LoadingDate.IsActual == true) {
                        $("#POL .LoadingDate").addClass("textDone");
                        $("#POL .type").css("background-color", "green")
                        $("#POL .progressCircle").css("background-color", "green")
                    }
                    $("#POL .DepartureDate").html(ContainerData[0].DepartureDate.Date);
                    if (ContainerData[0].DepartureDate.IsActual == true)
                        $("#POL .DepartureDate").addClass("textDone");

                    //Transit ports TS
                    if (ContainerData[0].TSPorts) {
                        const ports = ContainerData[0].TSPorts;
                        let counter = 0;
                        ports.forEach(function (port) {
                            debugger;
                            counter++;
                            $("#TS" + counter).removeClass("hide");
                            $("#TS" + counter + " .name").html(port.Port);
                            $("#TS" + counter + " .ArrivalDate").html(port.ArrivalDate.Date);
                            if (port.ArrivalDate.IsActual == true) {
                                $("#TS" + counter + " .ArrivalDate").addClass("textDone");
                                $("#TS" + counter + " .type").css("background-color", "green")
                                $("#TS" + counter + " .progressCircle").css("background-color", "green")
                            }
                            $("#TS" + counter + " .DepartureDate").html(port.DepartureDate.Date);
                            if (port.DepartureDate.IsActual == true)
                                $("#TS" + counter + " .DepartureDate").addClass("textDone");
                        })
                    }

                    //POD
                    $("#POD .name").html(ContainerData[0].Pod);
                    $("#POD .ArrivalDate").html(ContainerData[0].ArrivalDate.Date);
                    if (ContainerData[0].ArrivalDate.IsActual == true) {
                        $("#POD .ArrivalDate").addClass("textDone");
                        $("#POD .type").css("background-color", "green")
                        $("#POD .progressCircle").css("background-color", "green")
                    }
                    $("#POD .DischargeDate").html(ContainerData[0].DischargeDate.Date);
                    if (ContainerData[0].DischargeDate.IsActual == true)
                        $("#POD .DischargeDate").addClass("textDone");

                    $("#containerData").removeClass("hide");

                    //show containers Data Table
                    if (ContainerData[0].BLContainerCount > 0) {
                        showContainersTable(ContainerData);
                    }
                }
                else {
                    message = ContainerData.Message;
                    swal("Sorry", message);
                }
            }
        })
    } catch (error) {
        console.log(error);
    }

}


function showContainersTable(ContainerData) {
    $("#divContainersData").removeClass("hide");


    //Getting data of the Main Container in the Bill
    AppendRowtoTable("tblContainersData",
        ("<tr ID=" + 1 + ">"
            + "<td class='ContainerCode'>" + 1 + "</td>"
            + "<td class='ContainerCode'>" + ContainerData[0].ContainerNumber + "</td>"
            + "<td class='ContainerTEU'>" + ContainerData[0].ContainerTEU + "</td>"
            + "<td class='LiveMapUrl'> <a href=" + ContainerData[0].LiveMapUrl + " target='_blank' rel='noopener noreferrer'>Go to Live Map</a> </td>"
            + "<td class='BLGateOutDate'>" + ContainerData[0].GateOutDate + "</td>"
            + "<td class='BLEmptyReturnDate'>" + ContainerData[0].EmptyReturnDate + "</td>"

        ));

    var items = ContainerData[0].BLContainers;
    if (items.length > 0) {
        $.each(items, function (i, item) {
            AppendRowtoTable("tblContainersData",
                ("<tr ID=" + (parseInt(i) + 2) + ">"
                    + "<td class='ContainerCode'>" + (parseInt(i) + 2) + "</td>"
                    + "<td class='ContainerCode'>" + item.ContainerCode + "</td>"
                    + "<td class='ContainerTEU'>" + item.ContainerTEU + "</td>"
                    + "<td class='LiveMapUrl'> <a href=" + item.LiveMapUrl + " target='_blank' rel='noopener noreferrer'>Go to Live Map</a> </td>"
                    + "<td class='BLGateOutDate'>" + item.BLGateOutDate + "</td>"
                    + "<td class='BLEmptyReturnDate'>" + item.BLEmptyReturnDate + "</td>"


                ));

        });

    }


}