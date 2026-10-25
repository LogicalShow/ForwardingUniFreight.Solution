
function ShowDashboard() {
    debugger;
    //vwCRM_ClientsFollowUpDashboard
    var pWhereClause = "";

    var nowDate = new Date();
    var Month = ((nowDate.getMonth() + 1).toString().length) == 1 ? (("0" + (nowDate.getMonth() + 1)).toString()) : ((nowDate.getMonth() + 1).toString())
    var Day = ((nowDate.getDate()).toString().length) == 1 ? (("0" + (nowDate.getDate())).toString()) : ((nowDate.getDate()).toString())
    var date = nowDate.getFullYear() + '-' + Month + '-' + Day;

    var pParametersWithValues = {
        pWhereClause: pWhereClause
      , pSalesmanID: $('#slSalesRep_search').val()
      , Todaysdate: date
      , pActionType_ID: 0//$('#slActionType_Search').val()
      , pYear: $('#slYearsCRMdashboard').val()
      , pMonth: $('#slMonthsCRMdashboard').val()
    };
    CallGETFunctionWithParameters("/api/QuotationsDashboard/LoadFollowUpDashboard"
        , pParametersWithValues
        , function (data) {
            debugger;
            $('#IDbarChart1').html(' <canvas id="barChart1"></canvas>')
            $('#IDbarChart2').html(' <canvas id="barChart2"></canvas>')
            //$('#IDbarChart3').html(' <canvas id="barChart3"></canvas>')
            $('#IDbarChart4').html(' <canvas id="barChart4"></canvas>')
            $('#IDbarChart5').html(' <canvas id="barChart5"></canvas>')
            $('#IDbarChart6').html(' <canvas id="barChart6"></canvas>')
            //$('#IDbarChart7').html(' <canvas id="barChart7"></canvas>')
            //$('#IDbarChart8').html(' <canvas id="barChart8"></canvas>')
            $('#ChartMonthlyRevenue').html('<canvas id="barChart8" style="height: 185px; width:100%; padding: 0px; position: relative;"></canvas>')
            $('#ChartTop5Sales').html(' <canvas id="pieChart1" style="height: 185px; width:100%; padding: 0px; position: relative;"></canvas>')
            $('#ChartSalesLeadPipeline').html('<canvas id="PipelineChart"></canvas><div id="PipelineNames" class="m-t-sm"></div> ')
            $('#ChartProfitValuePipeline').html('<div id="barChart44"></div> <canvas id="barChart4"></canvas>')
            $('#ChartNumberofactionsSaleslead').html('<div id="chtAnimatedBarChart" class="bcBar"></div>')
            $('#ChartSalesLeadLastAction').html('  <canvas id="lineChart"></canvas><div id="ActionsNames" class="m-t-sm"></div> ')
            $('#ChartNumberOfQuotations').html(' <canvas id="barChart444"></canvas>')
            
            ////------------------------------------------------------------------------
            var ChartLabel6 = [];
            var Charty6 = [];

            var QuotationsNumber = JSON.parse(data[1]);
            if (QuotationsNumber.length > 0) {
                ChartLabel6.push(QuotationsNumber[0].QuotationStageName);
                Charty6.push(parseFloat(QuotationsNumber[0].QuotationsNumber));

                var i = 0;
                for (i = 1; i < QuotationsNumber.length; i++) {
                    ChartLabel6.push(QuotationsNumber[i].QuotationStageName);
                    Charty6.push(parseFloat(QuotationsNumber[i].QuotationsNumber));
                }

                var ctxB = document.getElementById("barChart444").getContext('2d');
                var myBarChart = new Chart(ctxB, {
                    type: 'bar',
                    data: {
                        labels: ChartLabel6,//["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Purple", "Purple", "Orange", "Orange", "Blue", "Blue"],
                        datasets: [{
                            barPercentage: .5,
                            barThickness: 12,
                            maxBarThickness: 13,
                            label: 'Quotations Number',
                            data: Charty6,//[12, 19, 3, 5, 2, 3, 6, 7, 8, 8, 30, 30],
                            backgroundColor: [
                        '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                        '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                        '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                        '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a',
                            ],
                            borderColor: [
                        '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a',
                        '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a',
                        '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a',
                        '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a',
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    callback: function (value) { if (value % 1 === 0) { return value; } }
                                }
                            }]
                        }
                    }
                });
            }
            //-------------------------------------------------------------------
            {
                debugger;
                var QuotationsNumberPerEachSalesLead = JSON.parse(data[2])
                var i = 0;
                var showdata__ = [];

                var jsonObj = [];
                for (i = 0; i < QuotationsNumberPerEachSalesLead.length; i++)
                {
                    var item = {}
                    item["company"] = QuotationsNumberPerEachSalesLead[i].QuotationStageName;
                    item["month"] = QuotationsNumberPerEachSalesLead[i].SalesLeadName;
                    item["employees_no"] = QuotationsNumberPerEachSalesLead[i].QuotationsNumberPerEachSalesLead;

                    jsonObj.push(item);
                }
                var chart_data = jsonObj;

                var options = {
                    data: chart_data, // data for chart rendering
                    params: { // columns from data array for rendering graph
                        group_name: 'company', // title for group name to be shown in legend
                        name: 'month', // name for xaxis
                        value: 'employees_no' // value for yaxis
                    },
                    horizontal_bars: false, // default chart orientation
                    chart_height: 250, // default chart height in px
                    colors: null, // colors for chart
                    show_legend: true, // show chart legend
                    legend: { // default legend settings
                        position: LegendPosition.bottom, // legend position (bottom/top/right/left)
                        width: 200 // legend width in pixels for left/right
                    },
                    x_grid_lines: false, // show x grid lines
                    y_grid_lines: true, // show y grid lines
                    tweenDuration: 300, // speed for tranistions
                    bars: { // default bar settings
                        padding: 0.075, // padding between bars
                        opacity: 0.7, // default bar opacity
                        opacity_hover: 0.45, // default bar opacity on mouse hover
                        disable_hover: false, // disable animation and legend on hover
                        hover_name_text: 'name', // text for name column for label displayed on bar hover
                        hover_value_text: 'value', // text for value column for label displayed on bar hover
                    },
                    number_format: { // default locale for number format
                        format: ',.2f', // default number format
                        decimal: '.', // decimal symbol
                        thousands: ',', // thousand separator symbol
                        grouping: [3], // thousand separator grouping
                        currency: ['$'] // currency symbol
                    },
                    margin: { // margins for chart rendering
                        top: 0, // top margin
                        right: 35, // right margin
                        bottom: 20, // bottom margin
                        left: 70 // left margin
                    },
                    rotate_x_axis_labels: { // rotate xaxis label params
                        process: true, // process xaxis label rotation
                                    minimun_resolution: 720, // minimun_resolution for label rotating
                                    bottom_margin: 15, // bottom margin for label rotation
                                    rotating_angle: 90, // angle for rotation,
                                    x_position: 9, // label x position after rotation
                                    y_position: -3 // label y position after rotation
                    }
                };

                $('#chtAnimatedBarChart').animatedBarChart(options);
            }
            //------------------------------------------------------------------------
            $("#SEC_ActionStatistics").height($("#SEC_RecentAction").height());
            $("#SEC_PipelineStatistics").height($("#SEC_RecentPipeline").height());
            //------------------------------------------------------------------------
        });
    FadePageCover(false);

}
function getData() {
    return [
       { "company": "Google", "month": "Jan", "employees_no": 38367 },
       { "company": "Google", "month": "Feb", "employees_no": 32684 },
       { "company": "Google", "month": "Mar", "employees_no": 28236 },
       { "company": "Google", "month": "Apr", "employees_no": 44205 },
       { "company": "Google", "month": "May", "employees_no": 3357 },
       { "company": "Google", "month": "Jun", "employees_no": 3511 },
       { "company": "Google", "month": "Jul", "employees_no": 10372 },
       { "company": "Google", "month": "Aug", "employees_no": 15565 },
       { "company": "Google", "month": "Sep", "employees_no": 23752 },
       { "company": "Google", "month": "Oct", "employees_no": 28927 },
       { "company": "Google", "month": "Nov", "employees_no": 21795 },
       { "company": "Google", "month": "Dec11", "employees_no": 49217 },
       { "company": "Apple", "month": "Jan", "employees_no": 28827 },
       { "company": "Apple", "month": "Feb", "employees_no": 13671 },
       { "company": "Apple", "month": "Mar", "employees_no": 27670 },
       { "company": "Apple", "month": "Apr", "employees_no": 6274 },
       { "company": "Apple", "month": "May", "employees_no": 12563 },
       { "company": "Apple", "month": "Jun", "employees_no": 31263 },
       { "company": "Apple", "month": "Jul", "employees_no": 24848 },
       { "company": "Apple", "month": "Aug", "employees_no": 41199 },
       { "company": "Apple", "month": "Sep", "employees_no": 18952 },
       { "company": "Apple", "month": "Oct", "employees_no": 30701 },
       { "company": "Apple", "month": "Nov", "employees_no": 16554 },
       { "company": "Apple", "month": "Dec11", "employees_no": 36399 },
       { "company": "Microsoft", "month": "Jan", "employees_no": 38674 },
       { "company": "Microsoft", "month": "Feb", "employees_no": 9595 },
       { "company": "Microsoft", "month": "Mar", "employees_no": 7520 },
       { "company": "Microsoft", "month": "Apr", "employees_no": 2568 },
       { "company": "Microsoft", "month": "May", "employees_no": 6583 },
       { "company": "Microsoft", "month": "Jun", "employees_no": 44485 },
       { "company": "Microsoft", "month": "Jul", "employees_no": 3405 },
       { "company": "Microsoft", "month": "Aug", "employees_no": 31709 },
       { "company": "Microsoft", "month": "Sep", "employees_no": 45442 },
       { "company": "Microsoft", "month": "Oct", "employees_no": 37580 },
       { "company": "Microsoft", "month": "Nov", "employees_no": 23445 },
       { "company": "Microsoft", "month": "Dec11", "employees_no": 7554 },
       { "company": "Samsung", "month": "Jan", "employees_no": 40110 },
       { "company": "Samsung", "month": "Feb", "employees_no": 35605 },
       { "company": "Samsung", "month": "Mar", "employees_no": 15768 },
       { "company": "Samsung", "month": "Apr", "employees_no": 15075 },
       { "company": "Samsung", "month": "May", "employees_no": 12424 },
       { "company": "Samsung", "month": "Jun", "employees_no": 12227 },
       { "company": "Samsung", "month": "Jul", "employees_no": 40906 },
       { "company": "Samsung", "month": "Aug", "employees_no": 34032 },
       { "company": "Samsung", "month": "Sep", "employees_no": 18110 },
       { "company": "Samsung", "month": "Oct", "employees_no": 4755 },
       { "company": "Samsung", "month": "Nov", "employees_no": 42202 },
       { "company": "Samsung", "month": "Dec11", "employees_no": 36183 }
    ];
}
function Dashboard_FlotPie(pFlotPieData) {
    // sherif start of flot-pie Chart
    //sherif: da is used for flot-pie, da1 is used for flot-pie-donut
    debugger;
    var PartnersTopInvoices = [],
        series = Math.floor(Math.random() * 4) + 3;
    //sherif
    series = 5;
    $.each(pFlotPieData, function (i, item) {
        PartnersTopInvoices[i] = {
            label: item.PartnerName + ": " + item.Amount + " " + $("#hDefaultCurrencyCode").val(),
            data: item.Amount//item.ExchangeRate * item.Amount,
        }
    });
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
        if (i < 4)
        ReceivablesBars.push([item.CreationMonth * 10, item.Amount]);
    });//of $.each
  
    //the part that draws
    data1 = [
      {
          label: "Monthly Revenue",
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
function Dashboard_FlotBar_ActivityStatus(pFlotBarMonthlyRevenueData, callback) {
    // bar (name : flot-bar)
    //sherif: [x,y] //x:holds the time intervals (should be the same in (MonthlyRevenueBars, PayablesBars, d1_3,....)) //order is not important
    //MonthlyRevenueBars are the blue bars 
    debugger;
    var MonthlyRevenueBars = [];
    var data1 = [];
    //the next 2 if conditions are to show the graph always even there is no data
    if (pFlotBarMonthlyRevenueData == "[]")
        MonthlyRevenueBars.push([0, 0]);
    $.each(JSON.parse(pFlotBarMonthlyRevenueData), function (i, item) { //data[0] : Operations
        MonthlyRevenueBars.push([item.InvoiceMonth * 10, item.Amount]);
    });//of $.each
    //the part that draws
    data1 = [
      {
          label: "Monthly Revenue",
          data: MonthlyRevenueBars,
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
    $("#flot-bar-ActivityStatus1").length && $.plot($("#flot-bar-ActivityStatus1"), data1, {
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
    });
    if (callback() != null && callback != undefined)
        callback();
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
function GetMonthName(monthNumber)
{
    debugger;
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[monthNumber - 1]
}
