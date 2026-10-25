//this function fills the DailySpotLight Table and the call the a fn to fill other charts
function Dashboard_FillCharts(callback) {
    //FillDashboardCharts_InJsDemoFile();//the original file in Demo.js
    debugger;
    series = 5;//number of top pie sectors
    $("#flot-line").attr("style", "height: 1px; width: 1px; padding: 0px; position: relative;"); //this command if removed, then when drawing graph from refresh button beside year doesn't work coz width is set to 0
    GetListYears($("#slYears").val(), null, "slYears", null, function () {
        CallGETFunctionWithParameters("/api/Dashboard/LoadAll_Charts"
        , {
            pWhereClauseDailySpotLight: " WHERE 1=1 "
            , pWhereClauseFlotLine: " WHERE OperationYear = '" + $("#slYears").val() + "'" + (pLoggedUser.IsHideOthersRecords ? " AND CreatorUserID=" + pLoggedUser.ID : "")
            , pWhereClauseFlotBarReceivables: " WHERE CreationYear = '" + $("#slYears").val() + "'" + (pLoggedUser.IsHideOthersRecords ? " AND CreatorUserID=" + pLoggedUser.ID : "")
            , pWhereClauseFlotBarPayables: " WHERE CreationYear = '" + $("#slYears").val() + "'" + (pLoggedUser.IsHideOthersRecords ? " AND CreatorUserID=" + pLoggedUser.ID : "")
            //flot pie conditions
            , pPageNumber: 1, pPageSize: series, pWhereClause: " WHERE IsDeleted = 0 AND DATEPART(YYYY, InvoiceDate) = '" + $("#slYears").val() + "'" + (pLoggedUser.IsHideOthersRecords ? " AND CreatorUserID=" + pLoggedUser.ID : "")
            , pOrderBy: " Amount * ExchangeRate DESC "
        }
        , function (data) {//data[0]:DailySpotLight, data[1]:FlotBarReceivables, data[2]:FlotBarPayables, data[3]:FlotLine
            Dashboard_FillDailySpotLightTable(JSON.parse(data[0]));//data[0]:DailySpotLight
            //i hide the next graph in the callback, but i have to draw it for popup tooltip to be shown
            Dashboard_FlotLine(JSON.parse(data[3]), function () { Dashboard_SetMonthsNamesOnAxees(); $("#flot-line").addClass("hide");/*if i removed that command, then the popup value is not shown and i dont know why*/ });// data[3]:FlotLine
            Dashboard_FlotBar_ActivityStatus(data[3], function () { Dashboard_SetMonthsNamesOnAxees(); });// data[3]:FlotLine
            Dashboard_FlotBar(data[1], data[2], function () { Dashboard_SetMonthsNamesOnAxees(); });
            Dashboard_FlotPie(JSON.parse(data[4]));//data[4]:FlotPieData
        }
        , function () { $("#hl-menu-Dashboard").parent().addClass("active"); }
        );//of CallGETFunctionWithParameters
    });
    $("#headerGraphLocalCurrency").text("Money in " + $("#hDefaultCurrencyCode").val());
    $("#hl-menu-Dashboard").parent().addClass("active");
}
function Dashboard_FillDailySpotLightTable(pDailySpotLightData) {
    var tbodyDailySpotRows = "";
    $.each(pDailySpotLightData, function (i, item) {
        tbodyDailySpotRows += '<tr> <td class="font-bold">' + item.RowName + '</td> <td class="GreenHightlightColor">' + item.Today + '</td> <td>' + item.MTD + '</td> <td>' + item.YTD + '</td> </tr>';
    });//of $.each
    $("#tbodyDailySpot").html(tbodyDailySpotRows);
}
function Dashboard_FlotLine(pFlotLineData, callback) {
    //var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var OperationsCount = [];
    //for (var i = 0; i <= 11; i += 1) {
    //    //OperationsCount.push([i, parseInt((Math.floor(Math.random() * (1 + 20 - 10))) + 10)]);
    //    OperationsCount.push([i + 1, parseInt((Math.floor(Math.random() * (1 + 20 - 10))) + 10)]);
    //}
    $.each(pFlotLineData, function (i, item) {
        OperationsCount.push([item.OperationMonth * 10, item.OperationsCount]);
    });//of $.each
    jQuery.noConflict();
    //the part that draws
    $("#flot-line").length && $.plot($("#flot-line"), [{
        data: OperationsCount
    }],
        {
            series: {
                lines: {
                    show: true,
                    lineWidth: 2,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.0
                        }, {
                            opacity: 0.2
                        }]
                    }
                },
                points: {
                    radius: 5,
                    show: true
                },
                grow: {
                    active: true,
                    steps: 30
                },
                shadowSize: 2
            },
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#f0f0f0",
                borderWidth: 1,
                color: '#f0f0f0'
            },
            colors: ["#65bd77"],
            //xaxis: {
            //    tickDecimals: 0,
            //    ticks: 10 //sherif: added by me
            //},
            xaxis: {
                ticks: 13,
                tickDecimals: 0,
                min: 0,
                max: 130
            },
            yaxis: {
                tickDecimals: 0,
                ticks: 10 //sherif: number of grade points on the y-axis (default was 5)
            },
            tooltip: true,
            tooltipOpts: {
                //content: "Operations Count in %x.1 is %y.4",
                content: "Operations Count is %y.4",
                defaultTheme: false,
                shifts: {
                    x: 0,
                    y: 30//y: 20    //sherif
                }
            }
        }
    );
    if (callback() != null && callback != undefined)
        callback();
}
function Dashboard_FlotBar_ActivityStatus(pFlotBarOperationsData, callback) {
    // bar (name : flot-bar)
    //sherif: [x,y] //x:holds the time intervals (should be the same in (OperationsBars, PayablesBars, d1_3,....)) //order is not important
    //OperationsBars are the blue bars 
    debugger;
    var OperationsBars = [];
    var data1 = [];
    //the next 2 if conditions are to show the graph always even there is no data
    if (pFlotBarOperationsData == "[]")
        OperationsBars.push([0, 0]);
    $.each(JSON.parse(pFlotBarOperationsData), function (i, item) { //data[0] : Operations
        OperationsBars.push([item.OperationMonth * 10, item.OperationsCount]);
    });//of $.each
    //the part that draws
    data1 = [
      {
          label: "Operations",
          data: OperationsBars,
          bars: {
              //horizontal: true,
              show: true,
              fill: true,
              lineWidth: 1,
              order: 1,
              fillColor: "#245873"           //["#ed9c28", "#4cae4c", "#d9534f", "#5ab39f", "#245873"],
          },
          color: "#245873"
      }
    ];
    //the part that draws
    $("#flot-bar-ActivityStatus").length && $.plot($("#flot-bar-ActivityStatus"), data1, {
        xaxis: {
            ticks: 13,
            tickDecimals: 0,
            min: 0,
            max: 130
        },
        yaxis: {
            tickDecimals: 0
        },
        grid: {
            hoverable: true,
            clickable: false,
            borderWidth: 0
        },
        legend: {
            //labelBoxBorderColor: "none",
            labelBoxBorderColor: "blue",
            position: "left"
        },
        series: {
            shadowSize: 1,
            grow: {
                active: true,
                steps: 30
            },
        },
        tooltip: true,
        //tooltipOpts: {
        //    content: "chart: %x.1 is %y.4",
        //    defaultTheme: true,
        //    shifts: {
        //        x: 0,
        //        y: 30//y: 20    //sherif
        //    }
        //}
    });
    if (callback() != null && callback != undefined)
        callback();
}
function Dashboard_FlotBar(pFlotBarReceivablesData, pFlotBarPayablesData, callback) {
    // bar (name : flot-bar)
    //sherif: [x,y] //x:holds the time intervals (should be the same in (ReceivablesBars, PayablesBars, d1_3,....)) //order is not important
    //ReceivablesBars are the blue bars 
    debugger;
    var ReceivablesBars = [];
    var PayablesBars = [];
    var data1 = [];
    //the next 2 if conditions are to show the graph always even there is no data
    if (pFlotBarReceivablesData == "[]")
        ReceivablesBars.push([0, 0]);
    if (pFlotBarPayablesData == "[]")
        PayablesBars.push([0, 0]);
    $.each(JSON.parse(pFlotBarReceivablesData), function (i, item) { //data[0] : Receivables
        ReceivablesBars.push([item.CreationMonth * 10, item.Amount]);
    });//of $.each
    $.each(JSON.parse(pFlotBarPayablesData), function (i, item) { //data[1] : Payables
        PayablesBars.push([item.CreationMonth * 10, item.Amount]);
    });//of $.each
    //the part that draws
    data1 = [
      {
          label: "Receivables",
          data: ReceivablesBars,
          bars: {
              //horizontal: true,
              show: true,
              fill: true,
              lineWidth: 1,
              order: 1,
              fillColor: "#4cae4c"//"#245873"           //["#ed9c28", "#4cae4c", "#d9534f", "#5ab39f", "#245873"],
          },
          color: "#4cae4c"//"#245873"
      },
      {
          label: "Payables",
          data: PayablesBars,
          bars: {
              //horizontal: true,
              show: true,
              fill: true,
              lineWidth: 1,
              order: 2,
              fillColor: "#d9534f"//"#ed9c28"
          },
          color: "#d9534f"//"#ed9c28"
      }
    ];
    //the part that draws
    $("#flot-bar").length && $.plot($("#flot-bar"), data1, {
        xaxis: {
            ticks: 13,
            tickDecimals: 0,
            min: 0,
            max: 130
        },
        yaxis: {
            tickDecimals: 0
        },
        grid: {
            hoverable: true,
            clickable: false,
            borderWidth: 0
        },
        legend: {
            //labelBoxBorderColor: "none",
            labelBoxBorderColor: "blue",
            position: "left"
        },
        series: {
            shadowSize: 1,
            grow: {
                active: true,
                steps: 30
            },
        },
        tooltip: true,
        //tooltipOpts: {
        //    content: "chart: %x.1 is %y.4",
        //    defaultTheme: true,
        //    shifts: {
        //        x: 0,
        //        y: 30//y: 20    //sherif
        //    }
        //}
    });
    if (callback() != null && callback != undefined)
        callback();
}
function Dashboard_FlotPie(pFlotPieData) {
    // sherif start of flot-pie Chart
    //sherif: da is used for flot-pie, da1 is used for flot-pie-donut
    debugger;
    if (pDefaults.UnEditableCompanyName != "MEL")
        $("#divTopFiveSales").removeClass("hide");
    var PartnersTopInvoices = [],
        series = Math.floor(Math.random() * 4) + 3;
    //sherif
    series = 5;

    //sherif
    //for (var i = 0; i < series; i++) {
    //  PartnersTopInvoices[i] = {
    //    label: "Series" + (i + 1),
    //    data: Math.floor(Math.random() * 100) + 1
    //  }
    //}
    $.each(pFlotPieData, function (i, item) {
        PartnersTopInvoices[i] = {
            label: item.PartnerName + ": " + item.Amount + " " + $("#hDefaultCurrencyCode").val(),
            data: item.Amount//item.ExchangeRate * item.Amount,
        }
    });//of $.each
    //the part that draws
    $("#flot-pie").length && $.plot($("#flot-pie"), PartnersTopInvoices, {
        series: {
            pie: {
                combine: {
                    color: "#999",
                    threshold: 0.05
                },
                show: true
            }
        },
        //sherif
        //colors: ["#99c7ce","#999999","#bbbbbb","#dddddd","#f0f0f0"],#5ab39f
        colors: ["#ed9c28", "#4cae4c", "#d9534f", "#428bca", "#245873"],
        legend: {
            show: false
        },
        grid: {
            hoverable: true,
            clickable: false
        },
        tooltip: true,
        tooltipOpts: {
            content: "%s: %p.0%"
        }
    });

    //PartnersTopInvoices[0] = {
    //    label: "FIAT",
    //    data: 26,
    //}
    //PartnersTopInvoices[1] = {
    //    label: "Arjavam",
    //    data: 8
    //}
    //PartnersTopInvoices[2] = {
    //    label: "Toyota",
    //    data: 20
    //}
    //PartnersTopInvoices[3] = {
    //    label: "Mwafak",
    //    data: 26
    //}
    //PartnersTopInvoices[4] = {
    //    label: "APL",
    //    data: 20
    //}
    //the part that draws
    //$("#flot-pie").length && $.plot($("#flot-pie"), PartnersTopInvoices, {
    //    series: {
    //        pie: {
    //            combine: {
    //                color: "#999",
    //                threshold: 0.05
    //            },
    //            show: true
    //        }
    //    },
    //    //sherif
    //    //colors: ["#99c7ce","#999999","#bbbbbb","#dddddd","#f0f0f0"],
    //    colors: ["#ed9c28", "#4cae4c", "#d9534f", "#5ab39f", "#245873"],
    //    legend: {
    //        show: false
    //    },
    //    grid: {
    //        hoverable: true,
    //        clickable: false
    //    },
    //    tooltip: true,
    //    tooltipOpts: {
    //        content: "%s: %p.0%"
    //    }
    //});
}
function Dashboard_SetMonthsNamesOnAxees() {
    debugger;
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    $(".flot-x-axis div:contains('130')").text("");
    $(".flot-x-axis div:contains('120')").text(monthNames[11]);
    $(".flot-x-axis div:contains('110')").text(monthNames[10]);
    $(".flot-x-axis div:contains('100')").text(monthNames[9]);
    $(".flot-x-axis div:contains('90')").text(monthNames[8]);
    $(".flot-x-axis div:contains('80')").text(monthNames[7]);
    $(".flot-x-axis div:contains('70')").text(monthNames[6]);
    $(".flot-x-axis div:contains('60')").text(monthNames[5]);
    $(".flot-x-axis div:contains('50')").text(monthNames[4]);
    $(".flot-x-axis div:contains('40')").text(monthNames[3]);
    $(".flot-x-axis div:contains('30')").text(monthNames[2]);
    $(".flot-x-axis div:contains('20')").text(monthNames[1]);
    $(".flot-x-axis div:contains('10')").text(monthNames[0]);
    $(".flot-x-axis div:contains('0')").text("");
}
