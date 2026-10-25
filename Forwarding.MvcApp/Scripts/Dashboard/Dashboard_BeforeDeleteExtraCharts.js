//this function fills the DailySpotLight Table and the call the a fn to fill other charts
function Dashboard_FillDailySpotLightTable_And_CallFillChartsFn() {
    debugger;
    //this part is to fill the spotlight table
    CallGETFunctionWithParameters("/api/Dashboard/LoadAll_DailySpotLightRows"
        , { pWhereClause: " WHERE 1=1 " }
        , function (data) {
            var tbodyDailySpotRows = "";
            $.each(JSON.parse(data[0]), function (i, item) {
                tbodyDailySpotRows += '<tr> <td class="font-bold">' + item.RowName + '</td> <td class="GreenHightlightColor">' + item.Today + '</td> <td>' + item.MTD + '</td> <td>' + item.YTD + '</td> </tr>';
                debugger;
            });//of $.each
            $("#tbodyDailySpot").html(tbodyDailySpotRows);
        }
        , function () {
            $("#hl-menu-Dashboard").parent().addClass("active");
        });//of CallGETFunctionWithParameters
    //Dashboard_FlotPie();
    Dashboard_FlotLine();
    Dashboard_FlotBar();
    Dashboard_FillDashboardCharts(); //this is  to fill the other charts
    //FillDashboardCharts_InJsDemoFile();
}
//fill all dashboard charts other than DailySpotLight Table
function Dashboard_FillDashboardCharts(callback) {
    // flot-line chart
    //var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //var d1 = [];
    //for (var i = 0; i <= 11; i += 1) {
    //    //d1.push([i, parseInt((Math.floor(Math.random() * (1 + 20 - 10))) + 10)]);
    //    d1.push([i + 1, parseInt((Math.floor(Math.random() * (1 + 20 - 10))) + 10)]);
    //}
    //jQuery.noConflict();
    //$("#flot-line").length && $.plot($("#flot-line"), [{
    //    data: d1
    //}],
    //    {
    //        series: {
    //            lines: {
    //                show: true,
    //                lineWidth: 2,
    //                fill: true,
    //                fillColor: {
    //                    colors: [{
    //                        opacity: 0.0
    //                    }, {
    //                        opacity: 0.2
    //                    }]
    //                }
    //            },
    //            points: {
    //                radius: 5,
    //                show: true
    //            },
    //            grow: {
    //                active: true,
    //                steps: 50
    //            },
    //            shadowSize: 2
    //        },
    //        grid: {
    //            hoverable: true,
    //            clickable: true,
    //            tickColor: "#f0f0f0",
    //            borderWidth: 1,
    //            color: '#f0f0f0'
    //        },
    //        colors: ["#65bd77"],
    //        xaxis: {
    //            ticks: 10 //sherif: added by me
    //        },
    //        yaxis: {
    //            ticks: 5
    //        },
    //        tooltip: true,
    //        tooltipOpts: {
    //            content: "chart: %x.1 is %y.4",
    //            defaultTheme: false,
    //            shifts: {
    //                x: 0,
    //                y: 30//y: 20    //sherif
    //            }
    //        }
    //    }
    //);

    var d2 = [];
    for (var i = 0; i <= 6; i += 1) {
        d2.push([i, parseInt((Math.floor(Math.random() * (1 + 30 - 10))) + 10)]);
    }
    var d3 = [];
    for (var i = 0; i <= 6; i += 1) {
        d3.push([i, parseInt((Math.floor(Math.random() * (1 + 30 - 10))) + 10)]);
    }
    jQuery.noConflict();
    $("#flot-chart").length && $.plot($("#flot-chart"), [{
        data: d2,
        label: "Unique Visits"
    }, {
        data: d3,
        label: "Page Views"
    }],
        {
            series: {
                lines: {
                    show: true,
                    lineWidth: 1,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.2
                        }, {
                            opacity: 0.1
                        }]
                    }
                },
                points: {
                    show: true
                },
                shadowSize: 2
            },
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#f0f0f0",
                borderWidth: 0
            },
            colors: ["#dddddd", "#89cb4e"],
            xaxis: {
                ticks: 15,
                tickDecimals: 0
            },
            yaxis: {
                ticks: 10,
                tickDecimals: 0
            },
            tooltip: true,
            tooltipOpts: {
                content: "'%s' of %x.1 is %y.4",
                defaultTheme: false,
                shifts: {
                    x: 0,
                    y: 20
                }
            }
        }
    );


    // live update
    var data = [],
    totalPoints = 300;

    function getRandomData() {

        if (data.length > 0)
            data = data.slice(1);

        // Do a random walk

        while (data.length < totalPoints) {

            var prev = data.length > 0 ? data[data.length - 1] : 50,
              y = prev + Math.random() * 10 - 5;

            if (y < 0) {
                y = 0;
            } else if (y > 100) {
                y = 100;
            }

            data.push(y);
        }

        // Zip the generated y values with the x values

        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
        }

        return res;
    }

    var updateInterval = 30, live;
    $("#flot-live").length && (live = $.plot("#flot-live", [getRandomData()], {
        series: {
            lines: {
                show: true,
                lineWidth: 1,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 0.2
                    }, {
                        opacity: 0.1
                    }]
                }
            },
            shadowSize: 2
        },
        colors: ["#cccccc"],
        yaxis: {
            min: 0,
            max: 100
        },
        xaxis: {
            show: false
        },
        grid: {
            tickColor: "#f0f0f0",
            borderWidth: 0
        },
    })) && update();

    function update() {

        live.setData([getRandomData()]);

        // Since the axes don't change, we don't need to call plot.setupGrid()

        live.draw();
        setTimeout(update, updateInterval);
    };
    //////////////////////////////////////////////////sherif:i removed flot-bar from here to a fn

    ////////var d1_1 = [ //Recievables
    ////////  [10, 6000],
    ////////  [20, 3500],
    ////////  [30, 5000],
    ////////  [40, 3000],
    ////////  [50, 1750],
    ////////  [120, 1550]
    ////////];

    ////////var d1_2 = [ //Payables
    ////////  [10, 4000],
    ////////  [20, 3000],
    ////////  [30, 1500],
    ////////  [40, 1700],
    ////////  [50, 1550],
    ////////  [120, 1550]
    ////////];
    ////////debugger;
    ////////////sherif: i commented  this coz i need just 2 bars in the flot-bar chart
    //////////var d1_3 = [
    //////////  [10, 80],
    //////////  [20, 40],
    //////////  [30, 30],
    //////////  [40, 20],
    //////////  [50, 10]
    //////////];

    ////////var data1 = [
    ////////  {
    ////////      //sherif
    ////////      //label: "Product 1",
    ////////      //label: "Invoices",
    ////////      label: "Receivables",
    ////////      data: d1_1,
    ////////      bars: {
    ////////          show: true,
    ////////          fill: true,
    ////////          lineWidth: 1,
    ////////          order: 1,
    ////////          fillColor: "#245873"           //["#ed9c28", "#4cae4c", "#d9534f", "#5ab39f", "#245873"],
    ////////      },
    ////////      color: "#245873"
    ////////  },
    ////////  {
    ////////      //sherif
    ////////      //label: "Product 2",
    ////////      //label: "Payments",
    ////////      label: "Payables",
    ////////      data: d1_2,
    ////////      bars: {
    ////////          show: true,
    ////////          fill: true,
    ////////          lineWidth: 1,
    ////////          order: 2,
    ////////          fillColor: "#ed9c28"
    ////////      },
    ////////      color: "#ed9c28"
    ////////  }
    ////////  ////sherif: i commented  this coz i need just 2 bars in the flot-bar chart
    ////////  //,
    ////////  //{
    ////////  //    label: "Product 3",
    ////////  //    data: d1_3,
    ////////  //    bars: {
    ////////  //        show: true,
    ////////  //        fill: true,
    ////////  //        lineWidth: 1,
    ////////  //        order: 3,
    ////////  //        fillColor:  "#8dd168"
    ////////  //    },
    ////////  //    color: "#8dd168"
    ////////  //}
    ////////];

    ////////debugger;
    ////////$("#flot-bar").length && $.plot($("#flot-bar"), data1, {
    ////////    xaxis: {

    ////////    },
    ////////    yaxis: {

    ////////    },
    ////////    grid: {
    ////////        hoverable: true,
    ////////        clickable: false,
    ////////        borderWidth: 0
    ////////    },
    ////////    legend: {
    ////////        labelBoxBorderColor: "none",
    ////////        position: "left"
    ////////    },
    ////////    series: {
    ////////        shadowSize: 1
    ////////    },
    ////////    tooltip: true,
    ////////});

    ////sherif: i think this is used for horizontal bars
    //var d2_1 = [
    //  [90, 10],
    //  [70, 20],
    //  [50, 30]
    //];

    //var d2_2 = [
    //  [80, 10],
    //  [60, 20],
    //  [40, 30]
    //];

    //var d2_3 = [
    //  [120, 10],
    //  [50, 20],
    //  [30, 30]
    //];
    //var data2 = [
    //  {
    //      label: "Product 1",
    //      data: d2_1,
    //      bars: {
    //          horizontal: true,
    //          show: true,
    //          fill: true,
    //          lineWidth: 1,
    //          order: 1,
    //          fillColor: "#6783b7"
    //      },
    //      color: "#6783b7"
    //  },
    //  {
    //      label: "Product 2",
    //      data: d2_2,
    //      bars: {
    //          horizontal: true,
    //          show: true,
    //          fill: true,
    //          lineWidth: 1,
    //          order: 2,
    //          fillColor: "#4fcdb7"
    //      },
    //      color: "#4fcdb7"
    //  },
    //  {
    //      label: "Product 3",
    //      data: d2_3,
    //      bars: {
    //          horizontal: true,
    //          show: true,
    //          fill: true,
    //          lineWidth: 1,
    //          order: 3,
    //          fillColor: "#8dd168"
    //      },
    //      color: "#8dd168"
    //  }
    //];

    //$("#flot-bar-h").length && $.plot($("#flot-bar-h"), data2, {
    //    xaxis: {

    //    },
    //    yaxis: {

    //    },
    //    grid: {
    //        hoverable: true,
    //        clickable: false,
    //        borderWidth: 0
    //    },
    //    legend: {
    //        labelBoxBorderColor: "none",
    //        position: "left"
    //    },
    //    series: {
    //        shadowSize: 1
    //    },
    //    tooltip: true,
    //});

    // sherif start of flot-pie Chart
    //sherif: da is used for flot-pie, da1 is used for flot-pie-donut
    var da = [],
        da1 = [],
        series = Math.floor(Math.random() * 4) + 3;
    //sherif
    series = 5;

    //sherif
    //for (var i = 0; i < series; i++) {
    //  da[i] = {
    //    label: "Series" + (i + 1),
    //    data: Math.floor(Math.random() * 100) + 1
    //  }
    //}
    da[0] = {
        label: "FIAT",
        data: 26,
    }
    da[1] = {
        label: "Arjavam",
        data: 8
    }
    da[2] = {
        label: "Toyota",
        data: 20
    }
    da[3] = {
        label: "Mwafak",
        data: 26
    }
    da[4] = {
        label: "APL",
        data: 20
    }

    for (var i = 0; i < series; i++) {
        da1[i] = {
            label: "Series" + (i + 1),
            data: Math.floor(Math.random() * 100) + 1
        }
    }

    $("#flot-pie-donut").length && $.plot($("#flot-pie-donut"), da1, {
        series: {
            pie: {
                innerRadius: 0.5,
                show: true
            }
        },

        colors: ["#99c7ce", "#999999", "#bbbbbb", "#dddddd", "#f0f0f0"],

        grid: {
            hoverable: true,
            clickable: false
        },
        tooltip: true,
        tooltipOpts: {
            content: "%s: %p.0%"
        }
    });

    $("#flot-pie").length && $.plot($("#flot-pie"), da, {
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
        //colors: ["#99c7ce","#999999","#bbbbbb","#dddddd","#f0f0f0"],
        colors: ["#ed9c28", "#4cae4c", "#d9534f", "#5ab39f", "#245873"],
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
    if (callback != null && callback != undefined)
        callback();
}
function Dashboard_FlotLine() {
    var d1 = [];
    for (var i = 0; i <= 11; i += 1) {
        //d1.push([i, parseInt((Math.floor(Math.random() * (1 + 20 - 10))) + 10)]);
        d1.push([i + 1, parseInt((Math.floor(Math.random() * (1 + 20 - 10))) + 10)]);
    }
    jQuery.noConflict();
    $("#flot-line").length && $.plot($("#flot-line"), [{
        data: d1
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
                    steps: 50
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
            xaxis: {
                ticks: 10 //sherif: added by me
            },
            yaxis: {
                ticks: 5
            },
            tooltip: true,
            tooltipOpts: {
                content: "chart: %x.1 is %y.4",
                defaultTheme: false,
                shifts: {
                    x: 0,
                    y: 30//y: 20    //sherif
                }
            }
        }
    );
}
function Dashboard_FlotBar() {
    // bar (name : flot-bar)
    //sherif: [x,y] //x:holds the time intervals (should be the same in (ReceivablesBars, PayablesBars, d1_3,....)) //order is not important
    //ReceivablesBars are the blue bars 

    var ReceivablesBars = [];
    var PayablesBars = [];
    var data1 = [];
    debugger;
    CallGETFunctionWithParameters("/api/Dashboard/LoadAll_FlotBar"
        , { pWhereClauseFlotBarReceivables: " WHERE 1=1 ", pWhereClauseFlotBarPayables: " WHERE 1=1 " }
        , function (data) {
            $.each(JSON.parse(data[0]), function (i, item) { //data[0] : Receivables
                ReceivablesBars.push([item.CreationMonth * 10, item.Amount]);
            });//of $.each
            $.each(JSON.parse(data[1]), function (i, item) { //data[1] : Payables
                PayablesBars.push([item.CreationMonth * 10, item.Amount]);
            });//of $.each
        }
        , function () {
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
                      fillColor: "#245873"           //["#ed9c28", "#4cae4c", "#d9534f", "#5ab39f", "#245873"],
                  },
                  color: "#245873"
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
                      fillColor: "#ed9c28"
                  },
                  color: "#ed9c28"
              }
            ];

            $("#flot-bar").length && $.plot($("#flot-bar"), data1, {
                xaxis: {
                    ticks: 13,
                    tickDecimals: 0,
                    min: 10,
                    max: 130
                },
                yaxis: {

                },
                grid: {
                    hoverable: true,
                    clickable: false,
                    borderWidth: 0
                },
                legend: {
                    labelBoxBorderColor: "none",
                    position: "left"
                },
                series: {
                    shadowSize: 1
                },
                tooltip: true,
            });
        });//of CallGETFunctionWithParameters
}
//function Dashboard_FlotPie() {
//    // sherif start of flot-pie Chart
//    //sherif: da is used for flot-pie, da1 is used for flot-pie-donut
//    var da = [],
//        da1 = [],
//        series = Math.floor(Math.random() * 4) + 3;
//    //sherif
//    series = 5;

//    //sherif
//    //for (var i = 0; i < series; i++) {
//    //  da[i] = {
//    //    label: "Series" + (i + 1),
//    //    data: Math.floor(Math.random() * 100) + 1
//    //  }
//    //}
//    da[0] = {
//        label: "FIAT",
//        data: 26
//    }
//    da[1] = {
//        label: "Arjavam",
//        data: 8
//    }
//    da[2] = {
//        label: "Toyota",
//        data: 20
//    }
//    da[3] = {
//        label: "Mwafak",
//        data: 26
//    }
//    da[4] = {
//        label: "APL",
//        data: 20
//    }

//    for (var i = 0; i < series; i++) {
//        da1[i] = {
//            label: "Series" + (i + 1),
//            data: Math.floor(Math.random() * 100) + 1
//        }
//    }

//    $("#flot-pie-donut").length && $.plot($("#flot-pie-donut"), da1, {
//        series: {
//            pie: {
//                innerRadius: 0.5,
//                show: true
//            }
//        },

//        colors: ["#99c7ce", "#999999", "#bbbbbb", "#dddddd", "#f0f0f0"],

//        grid: {
//            hoverable: true,
//            clickable: false
//        },
//        tooltip: true,
//        tooltipOpts: {
//            content: "%s: %p.0%"
//        }
//    });

//    $("#flot-pie").length && $.plot($("#flot-pie"), da, {
//        series: {
//            pie: {
//                combine: {
//                    color: "#999",
//                    threshold: 0.05
//                },
//                show: true
//            }
//        },
//        //sherif
//        //colors: ["#99c7ce","#999999","#bbbbbb","#dddddd","#f0f0f0"],
//        colors: ["#ed9c28", "#4cae4c", "#d9534f", "#5ab39f", "#245873"],
//        legend: {
//            show: false
//        },
//        grid: {
//            hoverable: true,
//            clickable: false
//        },
//        tooltip: true,
//        tooltipOpts: {
//            content: "%s: %p.0%"
//        }
//    });
//}