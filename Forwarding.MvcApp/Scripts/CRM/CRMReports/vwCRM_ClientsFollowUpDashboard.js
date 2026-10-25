
function ShowDashboard() {
    debugger;
    //vwCRM_ClientsFollowUpDashboard
    var pWhereClause = "";
    FadePageCover(true);
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
    CallGETFunctionWithParameters("/api/vwCRM_ClientsFollowUpDashboard/LoadFollowUpDashboard"
        , pParametersWithValues
        , function (data) {
            FadePageCover(false);
            debugger;
          //  FadePageCover(true);
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
            $('#ChartNumberOfActions').html(' <canvas id="barChart3"></canvas>')
            
              
              
          //  FadePageCover(false);

            ////-------------------------------barChart3-----------------------------------------
            var FollowUpDashboard = JSON.parse(data[7]);
            var ChartLabel3 = [];
            var Charty3 = [];

            if (parseInt($('#slSalesRep_search').val()) == 0) {
                var LastAction_SalesRep_User = JSON.parse(data[11]);
                if (LastAction_SalesRep_User.length > 0) {
                    ChartLabel3.push(LastAction_SalesRep_User[0].Action);
                    Charty3.push(parseFloat(LastAction_SalesRep_User[0].Total));

                    var i = 0;
                    for (i = 1; i < LastAction_SalesRep_User.length; i++) {
                        ChartLabel3.push(LastAction_SalesRep_User[i].Action);
                        Charty3.push(parseFloat(LastAction_SalesRep_User[i].Total));
                    }


                    var ctxB = document.getElementById("barChart3").getContext('2d');
                    var myBarChart = new Chart(ctxB, {
                        type: 'bar',
                        data: {
                            labels: ChartLabel3,//["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Purple", "Purple", "Orange", "Orange", "Blue", "Blue"],
                            datasets: [{
                                barPercentage: .5,
                                barThickness: 11,
                                maxBarThickness: 12,
                                label: 'Action Statistics',
                                data: Charty3,//[12, 19, 3, 5, 2, 3, 6, 7, 8, 8, 30, 30],
                                backgroundColor: [
                                    '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                     '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                      '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                    '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a',
                                ],
                                borderColor: [
                                     '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                     '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                      '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
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

            }
            else {
                var LastAction_SalesRep_User = JSON.parse(data[11]);
                var ChartLabel2 = [];
                var Charty2 = [];

                if (LastAction_SalesRep_User.length > 0) {
                    ChartLabel3.push(LastAction_SalesRep_User[0].Action);
                    Charty3.push(parseFloat(LastAction_SalesRep_User[0].Total));

                    var i = 0;
                    for (i = 1; i < LastAction_SalesRep_User.length; i++) {
                        ChartLabel3.push(LastAction_SalesRep_User[i].Action);
                        Charty3.push(parseFloat(LastAction_SalesRep_User[i].Total));
                    }


                    var ctxB = document.getElementById("barChart3").getContext('2d');
                    var myBarChart = new Chart(ctxB, {
                        type: 'bar',
                        data: {
                            labels: ChartLabel3,//["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Purple", "Purple", "Orange", "Orange", "Blue", "Blue"],
                            datasets: [{
                                barPercentage: .5,
                                barThickness: 8,
                                maxBarThickness: 9,
                                label: ' Last Action',
                                data: Charty3,//[12, 19, 3, 5, 2, 3, 6, 7, 8, 8, 30, 30],
                                backgroundColor: [
                                     '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                     '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                      '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                    '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a',
                                ],
                                borderColor: [
                         '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                     '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                      '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
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

            }

            //------------------------------------------------------------------------
            var FollowUpDashboard = JSON.parse(data[7]);
            var ChartLabel4 = [];
            var Charty4 = [];

            var ProfitValuePipeline = JSON.parse(data[12]);
            //if (ProfitValuePipeline.length > 0) {
            //    ChartLabel4.push(ProfitValuePipeline[0].PipeLineStageName);
            //    Charty4.push(parseFloat(ProfitValuePipeline[0].TotalPerAction));

            //    var i = 0;
            //    for (i = 1; i < ProfitValuePipeline.length; i++) {
            //        ChartLabel4.push(ProfitValuePipeline[i].PipeLineStageName);
            //        Charty4.push(parseFloat(ProfitValuePipeline[i].TotalPerAction));
            //    }

                var PipeLineStatistics = JSON.parse(data[25]);
                if (PipeLineStatistics.length > 0) {
                    ChartLabel4.push(PipeLineStatistics[0].PipeLineStageName);
                    Charty4.push(parseFloat(PipeLineStatistics[0].PipeLineStageCount));
                    
                    var i = 0;
                    for (i = 1; i < PipeLineStatistics.length; i++) {
                        ChartLabel4.push(PipeLineStatistics[i].PipeLineStageName);
                        Charty4.push(parseFloat(PipeLineStatistics[i].PipeLineStageCount));
                    }
                var ctxB = document.getElementById("barChart4").getContext('2d');
                var myBarChart = new Chart(ctxB, {
                    type: 'bar',
                    data: {
                        labels: ChartLabel4,//["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Purple", "Purple", "Orange", "Orange", "Blue", "Blue"],
                        datasets: [{
                            //barPercentage: 2.5,
                            //barThickness: 16,
                            //maxBarThickness: 18,
                            //minBarLength: 12,
                            barPercentage: .5,
                            barThickness: 11,
                            maxBarThickness: 12,
                            label: 'Pipeline Statistics',
                            data: Charty4,//[12, 19, 3, 5, 2, 3, 6, 7, 8, 8, 30, 30],
                            backgroundColor: [
                                    //'#2C73D2', '#4E8397', '#D5CABD', '#008F7A', '#B39CD0', '#0081CF', '#B0A8B9', '#4B4453', '#4D8076',
                                    '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                    '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                    '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                            ],
                            borderColor: [
                                    '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                    '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                    '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
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

            var ChartLabel8 = [];
            var Charty8 = [];
            var ChartLabel_8 = [];
            var Charty_8 = [];
            var Receivables = JSON.parse(data[23]);
            debugger;
            if(data[24])
                Receivables = JSON.parse(data[23]);
            else
                Receivables = JSON.parse(data[16]);

            if (Receivables.length > 0) {
                ChartLabel8.push(Receivables[0].InvoiceMonth);//CreationMonth);
                Charty8.push(parseFloat(Receivables[0].Amount));

                var i = 0;
                for (i = 1; i < Receivables.length; i++) {
                    ChartLabel8.push(Receivables[i].InvoiceMonth)//CreationMonth);
                    Charty8.push(parseFloat(Receivables[i].Amount));
                }

                debugger;
                var MonthCounter = 0;
                for (MonthCounter = 1; MonthCounter < 13; MonthCounter++)
                {
                    var cntMonth = 0; var MonthExists = 0; var AmountExists = 0;
                    for (cntMonth = 0; cntMonth < Receivables.length; cntMonth++)
                    {
                        if (MonthCounter == Receivables[cntMonth].InvoiceMonth)
                        {
                            MonthExists = 1;
                            AmountExists = (parseFloat(Receivables[cntMonth].Amount));
                        }
                    }
                    if(MonthExists == 1)
                    {
                        ChartLabel_8.push(GetMonthName(MonthCounter));
                        Charty_8.push(AmountExists);
                    }
                    else
                    {
                        ChartLabel_8.push(GetMonthName(MonthCounter));
                        Charty_8.push(0);
                    }
                }
                try {
                    var ctxB = document.getElementById("barChart8").getContext('2d');
                    var myBarChart = new Chart(ctxB, {
                        type: 'bar',
                        data: {
                            labels: ChartLabel_8,//["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Purple", "Purple", "Orange", "Orange", "Blue", "Blue"],
                            datasets: [{
                                barPercentage: .5,
                                barThickness: 11,
                                maxBarThickness: 12,
                                // minBarLength: 6,
                                label: 'Monthly Revenue',
                                data: Charty_8,
                                backgroundColor: [
                                    '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                    '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                    '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                    '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a',
                                ],
                                borderColor: [
                                    '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                    '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                    '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c', '#4cae4c',
                                    '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a', '#43456a',
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                        //,callback: function (value) { if (value % 1 === 0) { return value; } }
                                    }
                                }]
                            }
                        }
                    });

                }
                catch (m) {console.log("xxxx")}

            }
            //--------------------------------999999----------------------------------------
            //Dashboard_FlotPie(JSON.parse(data[17]));
            var ChartLabel9 = [];
            var Charty9 = [];

            var Receivables = JSON.parse(data[17]);
            if (Receivables.length > 0) {
                ChartLabel9.push(Receivables[0].CustomerName);
                Charty9.push(parseFloat(Receivables[0].Amount));

                var i = 0;
                for (i = 1; i < Receivables.length; i++) {
                    ChartLabel9.push(Receivables[i].CustomerName);
                    Charty9.push(parseFloat(Receivables[i].Amount));
                }

                var ctxP = document.getElementById("pieChart1").getContext('2d');
                var myPieChart = new Chart(ctxP, {
                    type: 'pie',
                    data: {
                        labels: ChartLabel9,//["Red", "Green", "Yellow", "Grey", "Dark Grey"],
                        datasets: [{
                            label: 'Top 5 Customers',
                            data: Charty9,//[300, 50, 100, 40, 120],
                            backgroundColor: ["#D9534F", "#4CAE4C", "#ED9C28", "#428BCA", "#245873"],//["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                            hoverBackgroundColor: ["#D9534F", "#4CAE4C", "#ED9C28", "#428BCA", "#245873"]//["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
                        }]
                    },
                    options: {
                        responsive: true
                    }
                });
            }

            debugger;
          
            var ctxL = document.getElementById("lineChart").getContext('2d');
            var lineChartLabel = [];
            var lineCharty = [];

            var LastActionToEachSalesLead = JSON.parse(data[21]);
            if (LastActionToEachSalesLead.length > 0) {
                lineChartLabel.push(LastActionToEachSalesLead[0].ClientName);
                lineCharty.push(parseFloat(LastActionToEachSalesLead[0].ActionOrder));

                var i = 0;
                for (i = 1; i < LastActionToEachSalesLead.length; i++) {
                    lineChartLabel.push(LastActionToEachSalesLead[i].ClientName);
                    lineCharty.push(parseFloat(LastActionToEachSalesLead[i].ActionOrder));
                }

                debugger;
                var arr = [];
                var cnt = 0; var cntarr = 0; var j = 0;

                for (cnt = 0; cnt < LastActionToEachSalesLead.length; cnt++) {
                    var Exists = 0;
                    for (j = 0; j < arr.length; j++)
                    {
                        if ((LastActionToEachSalesLead[cnt].ActionName) == (arr[j][0]))
                            Exists = 1;
                    }
                    if (Exists == 0)
                    {
                        arr[cntarr] = [(LastActionToEachSalesLead[cnt].ActionName), (parseFloat(LastActionToEachSalesLead[cnt].ActionOrder))];
                        cntarr += 1;
                    }
                }

                var k = 0; var ActionsNames = "";

                for (k = 0; k < arr.length; k++)
                {
                    ActionsNames += "<span style='border-radius: 30%;behavior: url(PIE.htc);display: inline-block;padding: 5px;background: #d3d4e5;border: 2px solid #666;color: #666;text-align: center; margin-left: 30px;'> " + arr[k][1] + " </span> " + arr[k][0] + "   "
                }
                $('#ActionsNames').html(ActionsNames);
                debugger;
                var myLineChart = new Chart(ctxL, {
                    type: 'line',
                    data: {
                        labels: lineChartLabel,//["January", "February", "March", "April", "May", "June", "July"],
                        datasets: [{
                            label: "Recent Action  ",
                            data: lineCharty,//[65, 59, 80, 81, 56, 55, 40],
                            backgroundColor: [
                            //'rgba(105, 0, 132, .2)',
                            //'rgba(245, 100, 50, .2)',
                            //'rgba(32, 124, 229, 0.12)',
                              'rgba(144, 198, 149, .3)',
                            ],
                            borderColor: [
                                 'rgba(74, 96, 207, 0.72)',
                            //'rgba(200, 99, 132, .7)',
                            ],
                            borderWidth: 2
                        }
                        //,
                        //{
                        //    label: "My Second dataset",
                        //    data: [28, 48, 40, 19, 86, 27, 90],
                        //    backgroundColor: [
                        //    'rgba(0, 137, 132, .2)',
                        //    ],
                        //    borderColor: [ 
                        //    'rgba(0, 10, 130, .7)',
                        //    ],
                        //    borderWidth: 2
                        //}
                        ]
                    },
                    options: {
                        responsive: true,
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
            //-----------------------PipeLineStageToEachSalesLead-------------------------------------------------
            debugger;

            var ctxL = document.getElementById("PipelineChart").getContext('2d');
            var PipelineChartLabel = [];
            var PipelineCharty = [];

            var PipeLineStageToEachSalesLead = JSON.parse(data[22]);
            if (PipeLineStageToEachSalesLead.length > 0) {
                PipelineChartLabel.push(PipeLineStageToEachSalesLead[0].ClientName);
                PipelineCharty.push(parseFloat(PipeLineStageToEachSalesLead[0].PipeLineStageID));

                var i = 0;
                for (i = 1; i < PipeLineStageToEachSalesLead.length; i++) {
                    PipelineChartLabel.push(PipeLineStageToEachSalesLead[i].ClientName);
                    PipelineCharty.push(parseFloat(PipeLineStageToEachSalesLead[i].PipeLineStageID));
                }

                debugger;
                var arr = [];
                var cnt = 0; var cntarr = 0; var j = 0;

                for (cnt = 0; cnt < PipeLineStageToEachSalesLead.length; cnt++) {
                    var Exists = 0;
                    for (j = 0; j < arr.length; j++) {
                        if ((PipeLineStageToEachSalesLead[cnt].PipeLineStageName) == (arr[j][0]))
                            Exists = 1;
                    }
                    if (Exists == 0) {
                        arr[cntarr] = [(PipeLineStageToEachSalesLead[cnt].PipeLineStageName), (parseFloat(PipeLineStageToEachSalesLead[cnt].PipeLineStageID))];
                        cntarr += 1;
                    }
                }

                var k = 0; var PipelineNames = "";

                for (k = 0; k < arr.length; k++) {
                    PipelineNames += "<span style='border-radius: 30%;behavior: url(PIE.htc);display: inline-block;padding: 5px;background: #d3d4e5;border: 2px solid #666;color: #666;text-align: center; margin-left: 30px;'> " + arr[k][1] + " </span> " + arr[k][0] + "   "
                }
                $('#PipelineNames').html(PipelineNames);
                debugger;
                var myPipelineChart = new Chart(ctxL, {
                    type: 'line',
                    data: {
                        labels: PipelineChartLabel,//["January", "February", "March", "April", "May", "June", "July"],
                        datasets: [{
                            label: "Recent Pipe line",
                            data: PipelineCharty,//[65, 59, 80, 81, 56, 55, 40],
                            backgroundColor: [
                            //'rgba(105, 0, 132, .2)',
                            //'rgba(245, 100, 50, .2)',
                             //'rgba(32, 124, 229, 0.12)',
                             'rgba(144, 198, 149, .3)',
                            ],
                            borderColor: [
                                'rgba(74, 96, 207, 0.72)',
                            //'rgba(200, 99, 132, .7)',
                            ],
                            borderWidth: 2
                        }
                        //,
                        //{
                        //    label: "My Second dataset",
                        //    data: [28, 48, 40, 19, 86, 27, 90],
                        //    backgroundColor: [
                        //    'rgba(0, 137, 132, .2)',
                        //    ],
                        //    borderColor: [
                        //    'rgba(0, 10, 130, .7)',
                        //    ],
                        //    borderWidth: 2
                        //}
                        ]
                    },
                    options: {
                        responsive: true,
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
            //------------------------------------------------------------------------
            if ($("#SEC_RecentAction").height() > $("#SEC_ActionStatistics").height())
                $("#SEC_ActionStatistics").height($("#SEC_RecentAction").height());
            else
                $("#SEC_RecentAction").height($("#SEC_ActionStatistics").height());

            if ($("#SEC_RecentPipeline").height() > $("#SEC_PipelineStatistics").height())
                $("#SEC_PipelineStatistics").height($("#SEC_RecentPipeline").height());
            else
                $("#SEC_RecentPipeline").height($("#SEC_PipelineStatistics").height());
            //------------------------------------------------------------------------
        });
   

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
