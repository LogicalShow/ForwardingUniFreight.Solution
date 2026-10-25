//this function fills the DailySpotLight Table and the call the a fn to fill other charts
function Dashboard_FillCharts(callback) {
    //FillDashboardCharts_InJsDemoFile();//the original file in Demo.js
    debugger;
    var groupItems = "";
    var ParentGroupCode = "";
    var htmlDivContent = "";

    groupItems += '<a onclick="Dashboard_FillCharts();" id="tab' + 'a' + '" name="tabs" tab-name="' + 'a' + '" class="btn btn-s-md btn-primary ' + (1 == 0 ? ' btn-warning ' : '') + ' btn-rounded"><i class="fa ' + ' fa-bar-chart' + '"></i>&nbsp;' + 'Sales'+ '</a><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
    groupItems += '<a onclick="Dashboard_FillAgingReceivablesCharts();" id="tab' + 'a' + '" name="tabs" tab-name="' + 'a' + '" class="btn btn-s-md btn-primary ' + (1 == 0 ? ' btn-warning ' : '') + ' btn-rounded"><i class="fa ' + ' fa-bar-chart' + '"></i>&nbsp;' + 'Receivables Aging ' + '</a><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
    groupItems += '<a onclick="Dashboard_FillAgingPayablesCharts();" id="tab' + 'a' + '" name="tabs" tab-name="' + 'a' + '" class="btn btn-s-md btn-primary ' + (1 == 0 ? ' btn-warning ' : '') + ' btn-rounded"><i class="fa ' + ' fa-bar-chart' + '"></i>&nbsp;' + 'Payables Aging ' + '</a><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
    groupItems += '<a onclick="Dashboard_FillPayablesCharts();" id="tab' + 'a' + '" name="tabs" tab-name="' + 'a' + '" class="btn btn-s-md btn-primary ' + (1 == 0 ? ' btn-warning ' : '') + ' btn-rounded"><i class="fa ' + ' fa-bar-chart' + '"></i>&nbsp;' + 'Cost ' + '</a><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';


    $("#div-Options").html(groupItems);

    debugger;
    series = 5;//number of top pie sectors
    $("#flot-line").attr("style", "height: 1px; width: 1px; padding: 0px; position: relative;"); //this command if removed, then when drawing graph from refresh button beside year doesn't work coz width is set to 0
    GetListYears($("#slYears").val(), null, "slYears", null, function () {
        CallGETFunctionWithParameters("/api/DashboardGroup/LoadAll_Charts"
            , {
                pYear: $("#slYears").val()
                , pType : 1
        }
            , function (data) {
            //i hide the next graph in the callback, but i have to draw it for popup tooltip to be shown
            Dashboard_FlotBar_ActivityStatus(data[0], function () { Dashboard_SetMonthsNamesOnAxees(); }, 'Sales By Month','Sales');// data[3]:FlotLine
            Dashboard_FlotPie(JSON.parse(data[1]),'Sales By Service');//data[4]:FlotPieData
        }
            , function () {
              null  //$("#hl-menu-Dashboard").parent().addClass("active");
            }
        );//of CallGETFunctionWithParameters
    });
    $("#headerGraphLocalCurrency").text("Money in " + $("#hDefaultCurrencyCode").val());
  //  $("#hl-menu-Dashboard").parent().addClass("active");
}
function Dashboard_FillAgingReceivablesCharts(callback) {
    debugger;

    $("#flot-line").attr("style", "height: 1px; width: 1px; padding: 0px; position: relative;"); //this command if removed, then when drawing graph from refresh button beside year doesn't work coz width is set to 0
    GetListYears($("#slYears").val(), null, "slYears", null, function () {
        CallGETFunctionWithParameters("/api/DashboardGroup/LoadAll_Charts"
            , {
                pYear: $("#slYears").val()
                , pType: 2
            }
            , function (data) {
                Dashboard_FlotBar_AgingReceivables(data[2], function () { Dashboard_SetAgingNamesOnAxees(); }
                    , 'Account Receivable By Aging Period');
                Dashboard_FlotPie_AgingCustomers(JSON.parse(data[3]), 'Account Receivable By Customer');
            }
            , function () {
                null  //$("#hl-menu-Dashboard").parent().addClass("active");
            }
        );//of CallGETFunctionWithParameters
    });
    $("#headerGraphLocalCurrency").text("Money in " + $("#hDefaultCurrencyCode").val());
    //  $("#hl-menu-Dashboard").parent().addClass("active");
}
function Dashboard_FillAgingPayablesCharts(callback) {
    debugger;

    $("#flot-line").attr("style", "height: 1px; width: 1px; padding: 0px; position: relative;"); //this command if removed, then when drawing graph from refresh button beside year doesn't work coz width is set to 0
    GetListYears($("#slYears").val(), null, "slYears", null, function () {
        CallGETFunctionWithParameters("/api/DashboardGroup/LoadAll_Charts"
            , {
                pYear: $("#slYears").val()
                , pType: 3
            }
            , function (data) {
                Dashboard_FlotBar_AgingReceivables(data[4]   , function () { Dashboard_SetAgingNamesOnAxees(); }  , 'Account Payables By Aging Period');// data[3]:FlotLine
                Dashboard_FlotPie_AgingCustomers(JSON.parse(data[5]), 'Account Payables By Suppliers');
            }
            , function () {
                null  //$("#hl-menu-Dashboard").parent().addClass("active");
            }
        );//of CallGETFunctionWithParameters
    });
    $("#headerGraphLocalCurrency").text("Money in " + $("#hDefaultCurrencyCode").val());
    //  $("#hl-menu-Dashboard").parent().addClass("active");
}
function Dashboard_FillPayablesCharts(callback) {
    debugger;

    $("#flot-line").attr("style", "height: 1px; width: 1px; padding: 0px; position: relative;"); //this command if removed, then when drawing graph from refresh button beside year doesn't work coz width is set to 0
    GetListYears($("#slYears").val(), null, "slYears", null, function () {
        CallGETFunctionWithParameters("/api/DashboardGroup/LoadAll_Charts"
            , {
                pYear: $("#slYears").val()
                , pType: 4
            }
            , function (data) {
                Dashboard_FlotBar_ActivityStatus(data[6], function () { Dashboard_SetMonthsNamesOnAxees(); },'Cost By Month','Cost');
                Dashboard_FlotPie(JSON.parse(data[7]),'Cost By Service');
            }
            , function () {
                null  //$("#hl-menu-Dashboard").parent().addClass("active");
            }
        );//of CallGETFunctionWithParameters
    });
    $("#headerGraphLocalCurrency").text("Money in " + $("#hDefaultCurrencyCode").val());
    //  $("#hl-menu-Dashboard").parent().addClass("active");
}






function Dashboard_FlotBar_ActivityStatus(pFlotBarOperationsData, callback, pName,plblName) {
    // bar (name : flot-bar)
    //sherif: [x,y] //x:holds the time intervals (should be the same in (OperationsBars, PayablesBars, d1_3,....)) //order is not important
    //OperationsBars are the blue bars 
    debugger;
    $('#flot-line-header').html(pName);
    var OperationsBars = [];
    var data1 = [];
    //the next 2 if conditions are to show the graph always even there is no data
    if (pFlotBarOperationsData == "[]")
        OperationsBars.push([0, 0]);
    $.each(JSON.parse(pFlotBarOperationsData), function (i, item) { //data[0] : Operations
        OperationsBars.push([item.Month * 10, item.Amount]);
    });//of $.each
    //the part that draws
    data1 = [
        {
            label: plblName,
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
function Dashboard_FlotBar_AgingReceivables(pFlotBarOperationsData, callback, pName) {
    // bar (name : flot-bar)
    //sherif: [x,y] //x:holds the time intervals (should be the same in (OperationsBars, PayablesBars, d1_3,....)) //order is not important
    //OperationsBars are the blue bars 
    debugger;
    $('#flot-line-header').html(pName);
    var OperationsBars = [];
    var data1 = [];
    var Labels = [];
    //the next 2 if conditions are to show the graph always even there is no data
    if (pFlotBarOperationsData == "[]")
        OperationsBars.push([0, 0]);
    var Count = 0;
    $.each(JSON.parse(pFlotBarOperationsData), function (i, item) {
        Count += 20;
        OperationsBars.push([Count, item.Amount]);

    });//of $.each
    //the part that draws
    data1 = [
        {
            label: "Amount Due",
            data: OperationsBars,
            bars: {
                //horizontal: true,
                show: true,
                fill: true,
                lineWidth: 1,
                order: 1,
                fillColor: "#245873",           //["#ed9c28", "#4cae4c", "#d9534f", "#5ab39f", "#245873"],
                barWidth: 5 // Adjust the bar width based on your preference
            },
            color: "#245873"
        }
    ];
    //the part that draws
    $("#flot-bar-ActivityStatus").length && $.plot($("#flot-bar-ActivityStatus"), data1, {
        xaxis: {
            ticks: 7,
            tickDecimals: 0,
            min: 0,
            max: 130
        },
        yaxis: {
            tickFormatter: function (val, axis) {
                // Format the y-axis tick label with commas
                return val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            tickDecimals: 0,
            min: 10000, // Set the minimum value based on your data
            max: 100000000 // Set the maximum value based on your data
        },
        grid: {
            hoverable: true,
            clickable: false,
            borderWidth: 0
        },
        legend: {
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

    });
    if (callback() != null && callback != undefined)
        callback();
}

function Dashboard_FlotPie(pFlotPieData, pName)
{
    debugger;
    $('#flot-pie-header').html(pName);
    // Your data
    var data = pFlotPieData;
          

    // Step 1: Calculate the total amount
    var totalAmount = data.reduce((total, item) => total + item.Amount, 0);

    // Step 2: Identify items with amounts less than 1%
    var threshold = 0.01 * totalAmount; // 1% threshold
    var smallAmounts = data.filter(item => item.Amount < threshold);

    // Step 3: Sum the amounts of small items
    var sumOfSmallAmounts = smallAmounts.reduce((sum, item) => sum + item.Amount, 0);

    // Step 4: Create a new array with the grouped item
    var newData = data.map(item => ({
        MoveTypeName: item.Amount < threshold ? 'Other' : item.MoveTypeName,
        Amount: item.Amount
    }));
    var newData = data.filter(item => item.Amount >= threshold);

    // Add a new item for the sum of small amounts
    if (sumOfSmallAmounts > 0) {
        newData.push({
            MoveTypeName: 'Other',
            Amount: sumOfSmallAmounts
        });
    }

  
    $.each(newData, function (i, item) {
       newData[i] = {
            label: item.MoveTypeName ,
            data: item.Amount//item.ExchangeRate * item.Amount,
        }
    });

    var options = {
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    var dataset = ctx.chart.data.datasets[0];
                    var total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                    var percentage = ((value / total) * 100).toFixed(4)  + "%";
                    return percentage;
                },
                //backgroundColor: function (context) {
                //    return context.dataset.backgroundColor;
                //},
                borderRadius: 5,
                font: {
                    weight: 'bold'
                },
                anchor: 'end',
                align: 'start'
            },
            layout:{
                padding : 10
                    },
            labels: {
                fontSize: 12,
                position: 'outside',
            }
        },
        series: {
            pie: {
                show: true,
                radius: 1,
                label: {
                    show: true,
                    radius: 0.8,
                    threshold: 0.1,
                    formatter: function (label, series) {
                        var amount = series.data[0][1].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + $("#hDefaultCurrencyCode").val(); // Adjust formatting as needed
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:balck;">' + label + '<br/>' + amount + '<br/>' + Math.round(series.percent) + '%</div>';
                    },
                    background: {
                        opacity: 0.8//,
                       // color: 'black'
                    }
                }
            }
        },
        grid: {
            hoverable: true
        },
        tooltip: true,
        tooltipOpts: {
            cssClass: "flotTip",
            content: "%p.0%, %s",
            shifts: {
                x: 20,
                y: 0
            },
            defaultTheme: false
        }
    };

    var plot = $.plot($("#flot-pie"), newData, options);



}
function Dashboard_FlotPie_AgingCustomers(pFlotPieData,pName) {
    debugger;
    // Your data
    $('#flot-pie-header').html(pName);
    var data = pFlotPieData;
    // Step 1: Calculate the total amount
    var totalAmount = data.reduce((total, item) => total + item.Amount, 0);

    // Step 2: Identify items with amounts less than 1%
    var threshold = 0.01 * totalAmount; // 1% threshold
    var smallAmounts = data.filter(item => item.Amount < threshold);

    // Step 3: Sum the amounts of small items
    var sumOfSmallAmounts = smallAmounts.reduce((sum, item) => sum + item.Amount, 0);

    // Step 4: Create a new array with the grouped item
    var newData = data.map(item => ({
        CustomerName: item.Amount < threshold ? 'Other' : item.CustomerName,
        Amount: item.Amount
    }));
    var newData = data.filter(item => item.Amount >= threshold);

    // Add a new item for the sum of small amounts
    if (sumOfSmallAmounts > 0) {
        newData.push({
            CustomerName: 'Other',
            Amount: sumOfSmallAmounts
        });
    }


    $.each(newData, function (i, item) {
        newData[i] = {
            label: item.CustomerName,
            data: item.Amount//item.ExchangeRate * item.Amount,
        }
    });

    var options = {
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    var dataset = ctx.chart.data.datasets[0];
                    var total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                    var percentage = ((value / total) * 100).toFixed(4)  + "%";
                    return percentage;
                },
                //backgroundColor: function (context) {
                //    return context.dataset.backgroundColor;
                //},
                borderRadius: 5,
                font: {
                    weight: 'bold'
                },
                anchor: 'end',
                align: 'start'
            },
            layout: {
                padding: 10
            },
            labels: {
                fontSize: 12,
                position: 'outside',
            }
        },
        series: {
            pie: {
                show: true,
                radius: 1,
                label: {
                    show: true,
                    radius: 0.8,
                    threshold: 0.1,
                    formatter: function (label, series) {
                        var amount = series.data[0][1].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + $("#hDefaultCurrencyCode").val(); // Adjust formatting as needed
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:balck;">' + label + '<br/>' + amount + '<br/>'
                            + parseFloat(series.percent).toFixed(2); //Math.round(series.percent)
                                + '%</div>';
                    },
                    background: {
                        opacity: 0.8//,
                        // color: 'black'
                    }
                }
            }
        },
        grid: {
            hoverable: true
        },
        tooltip: true,
        tooltipOpts: {
            cssClass: "flotTip",
            content: "%p.0%, %s",
            shifts: {
                x: 20,
                y: 0
            },
            defaultTheme: false
        }
    };

    var plot = $.plot($("#flot-pie"), newData, options);



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
function Dashboard_SetAgingNamesOnAxees() {
    debugger;
    $(".flot-x-axis div:contains('120')").text("");
    $(".flot-x-axis div:contains('100')").text('>90');
    $(".flot-x-axis div:contains('80')").text('61-90');
    $(".flot-x-axis div:contains('60')").text('31-60');
    $(".flot-x-axis div:contains('40')").text('1-30');
    $(".flot-x-axis div:contains('20')").text('Current');
    // $(".flot-x-axis div:contains('0')").text("");
}





//function Dashboard_FillDailySpotLightTable(pDailySpotLightData) {
//    var tbodyDailySpotRows = "";
//    $.each(pDailySpotLightData, function (i, item) {
//        tbodyDailySpotRows += '<tr> <td class="font-bold">' + item.RowName + '</td> <td class="GreenHightlightColor">' + item.Today + '</td> <td>' + item.MTD + '</td> <td>' + item.YTD + '</td> </tr>';
//    });//of $.each
//    $("#tbodyDailySpot").html(tbodyDailySpotRows);
//}
//function Dashboard_FlotLine(pFlotLineData, callback) {
//    //var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//    var OperationsCount = [];
//    //for (var i = 0; i <= 11; i += 1) {
//    //    //OperationsCount.push([i, parseInt((Math.floor(Math.random() * (1 + 20 - 10))) + 10)]);
//    //    OperationsCount.push([i + 1, parseInt((Math.floor(Math.random() * (1 + 20 - 10))) + 10)]);
//    //}
//    $.each(pFlotLineData, function (i, item) {
//        OperationsCount.push([item.Month * 10, item.Amount]);
//    });//of $.each
//    jQuery.noConflict();
//    //the part that draws
//    $("#flot-line").length && $.plot($("#flot-line"), [{
//        data: Amount
//    }],
//        {
//            series: {
//                lines: {
//                    show: true,
//                    lineWidth: 2,
//                    fill: true,
//                    fillColor: {
//                        colors: [{
//                            opacity: 0.0
//                        }, {
//                            opacity: 0.2
//                        }]
//                    }
//                },
//                points: {
//                    radius: 5,
//                    show: true
//                },
//                grow: {
//                    active: true,
//                    steps: 30
//                },
//                shadowSize: 2
//            },
//            grid: {
//                hoverable: true,
//                clickable: true,
//                tickColor: "#f0f0f0",
//                borderWidth: 1,
//                color: '#f0f0f0'
//            },
//            colors: ["#65bd77"],
//            //xaxis: {
//            //    tickDecimals: 0,
//            //    ticks: 10 //sherif: added by me
//            //},
//            xaxis: {
//                ticks: 13,
//                tickDecimals: 0,
//                min: 0,
//                max: 130
//            },
//            yaxis: {
//                tickDecimals: 0,
//                ticks: 10 //sherif: number of grade points on the y-axis (default was 5)
//            },
//            tooltip: true,
//            tooltipOpts: {
//                //content: "Operations Count in %x.1 is %y.4",
//                content: "Operations Count is %y.4",
//                defaultTheme: false,
//                shifts: {
//                    x: 0,
//                    y: 30//y: 20    //sherif
//                }
//            }
//        }
//    );
//    if (callback() != null && callback != undefined)
//        callback();
//}
//function Dashboard_FlotBar(pFlotBarReceivablesData, pFlotBarPayablesData, callback) {
//    // bar (name : flot-bar)
//    //sherif: [x,y] //x:holds the time intervals (should be the same in (ReceivablesBars, PayablesBars, d1_3,....)) //order is not important
//    //ReceivablesBars are the blue bars 
//    debugger;
//    var ReceivablesBars = [];
//    var PayablesBars = [];
//    var data1 = [];

//    //the next 2 if conditions are to show the graph always even there is no data
//    if (pFlotBarReceivablesData == "[]")
//        ReceivablesBars.push([0, 0]);
//    if (pFlotBarPayablesData == "[]")
//        PayablesBars.push([0, 0]);
//    $.each(JSON.parse(pFlotBarReceivablesData), function (i, item) { //data[0] : Receivables
//        ReceivablesBars.push([item.CreationMonth * 10, item.Amount]);
//    });//of $.each
//    $.each(JSON.parse(pFlotBarPayablesData), function (i, item) { //data[1] : Payables
//        PayablesBars.push([item.CreationMonth * 10, item.Amount]);
//    });//of $.each
//    //the part that draws
//    data1 = [
//        {
//            label: "Receivables",
//            data: ReceivablesBars,
//            bars: {
//                //horizontal: true,
//                show: true,
//                fill: true,
//                lineWidth: 1,
//                order: 1,
//                fillColor: "#4cae4c"//"#245873"           //["#ed9c28", "#4cae4c", "#d9534f", "#5ab39f", "#245873"],

//            },
//            color: "#4cae4c"//"#245873"
//        },
//        {
//            label: "Payables",
//            data: PayablesBars,
//            bars: {
//                //horizontal: true,
//                show: true,
//                fill: true,
//                lineWidth: 1,
//                order: 2,
//                fillColor: "#d9534f"//"#ed9c28"
//            },
//            color: "#d9534f"//"#ed9c28"
//        }
//    ];
//    //the part that draws
//    $("#flot-bar").length && $.plot($("#flot-bar"), data1, {
//        xaxis: {
//            ticks: 13,
//            tickDecimals: 0,
//            min: 0,
//            max: 130
//        },
//        yaxis: {
//            tickDecimals: 0
//        },
//        grid: {
//            hoverable: true,
//            clickable: false,
//            borderWidth: 0
//        },
//        legend: {
//            //labelBoxBorderColor: "none",
//            labelBoxBorderColor: "blue",
//            position: "left"
//        },
//        series: {
//            shadowSize: 1,
//            grow: {
//                active: true,
//                steps: 30
//            },
//        },
//        tooltip: true,
//        //tooltipOpts: {
//        //    content: "chart: %x.1 is %y.4",
//        //    defaultTheme: true,
//        //    shifts: {
//        //        x: 0,
//        //        y: 30//y: 20    //sherif
//        //    }
//        //}
//    });
//    if (callback() != null && callback != undefined)
//        callback();
//}