



//$(document).ready(function () {
//    REDIPS.drag.init();
//});



//WareHouseID
var _index = 0;
var AreaLocationsChartHTML = '<span></span>';
var ArrayOfSeperatedWareHouese = new Array();
var ArrIsActive = new Array();
var ArrIsNotActive = new Array();
var hAreaID = "-1";
var hIndex = -1;
var CheckedStatus = new Array();
var CheckedLocations = new Array();
var CheckedRecieveDetails = new Array();
function WarehouseLocationsChart_Print(pOutputTo) {
    debugger;
    //ReturnToMainChart();
    $('#redips-drag').html('');
    $('#ReportSectionHeader').html('');
    $('#redips-drag').fadeOut(300);
    $('#ReportSectionHeader').fadeIn(400);
     hAreaID = "-1";
     hIndex = -1;
     CheckedStatus = [];
     CheckedLocations = [];
    CheckedRecieveDetails = [];
    $(".dragCheckbox").prop("checked", false);
    if (IsNull($('#slWarehouses').val(), "0") != "0") {
        FadePageCover(true);
        var pWhereClause = " where WareHouseID = " + $('#slWarehouses').val() + " order by LocationIndex , RowID ";
        var pParametersWithValues = {
            pWhereClause: pWhereClause
        };
        CallGETFunctionWithParameters("/api/AreaLocationsChart/LoadData"
            , pParametersWithValues
            , function (pData) {
                var _RowCount = pData[0];
                if (_RowCount == 0)
                    swal("Sorry", "No records are found for that search criteria.");
                else {


                    debugger

                    var pReportRows = JSON.parse(pData[1]);
                    //var ArrayOfSeperatedWareHouese = groupBy(pReportRows, )
                    ArrayOfSeperatedWareHouese = [];
                    ArrayOfSeperatedWareHouese = groupBy(pReportRows, 'AreaID');//pReportRows.map(item => item.AreaID);
                    
                    $('#ReportSectionHeader').html('');
                    AreaLocationsChartHTML = '';


                   // console.log( ArrayOfSeperatedWareHouese.length );
                    _index = 0;
                    $.each(ArrayOfSeperatedWareHouese, function (i, WareHouseAreaList)
                    {

                        if (IsNull(WareHouseAreaList, null) != null) {
                            var Arr = new Array();
                          //  var LocationsCounts = Object.keys(WareHouseAreaList).map(LocationsCount => WareHouseAreaList[LocationsCount]);
                            //  var maxcount = Math.max.apply(Math, WareHouseAreaList.map(function (o) { return o.LocationsCount; }));
                            // var LocationsCounts = JQuery.map(WareHouseAreaList , x => x.LocationsCount);
                            //  var LocationsCounts = WareHouseAreaList.map(x => x.LocationsCount);

                            var LocationsCounts = WareHouseAreaList.map(item => item.LocationsCount);

                            var maxcount = Math.max.apply(Math, LocationsCounts);
                           //  Math.max(LocationsCounts, 0);
                            AreaLocationsChart_DrawReport_Mini(WareHouseAreaList, maxcount, pOutputTo, i, _index);

                            _index++;




                          


                        }
                        if (i == ArrayOfSeperatedWareHouese.length - 1) {

                            $('#ReportSectionHeader').html(AreaLocationsChartHTML);


                            $('.mytooltip').each(function (i, item) {
                                
                                //var _data = 'Type : ' + item.PurchaseItemName + ' ';
                                //_data += 'Color : ' + item.PaintType + ' ';
                                //_data += 'ChassisNumber : ' + item.ChassisNumber + ' ';
                                //_data += 'EngineNumber : ' + item.EngineNumber + ' ';
                                //_data += 'ReceiveDate : ' + GetDateFromServer(item.ReceiveDate) + ' ';
                                $(item).tooltipster({
                                    trigger: 'custom',
                                    triggerOpen: {
                                        click: true
                                    },
                                    triggerClose: {
                                        click: true
                                    },
                                    interactive: true,
                                    contentAsHTML: true,
                                    content: $('<b> <span class="fas fa-car-side" style="font-weight: bold;"></span> &nbsp; Type : ' + $(this).attr('Type') + '</b></br>'
                                        + '<b> <span class="fa fa-paint-brush" style="font-weight: bold;"></span> &nbsp; Color : ' + $(this).attr('Color') + '</b></br>'
                                        + '<b> <span class="fa fa-barcode" style="font-weight: bold;"></span> &nbsp; ChassisNumber : ' + $(this).attr('ChassisNumber') + '</b></br>'
                                        + '<b> <span class="fa fa-ticket" style="font-weight: bold;"></span> &nbsp; EngineNumber : ' + $(this).attr('EngineNumber') + '</b></br>'
                                        + '<b> <span class="fas fa-clock" style="font-weight: bold;"></span> &nbsp; ReceiveDate : ' + $(this).attr('ReceiveDate') + '</b></br>'

                                    )
                                });
                            });


                            //$('.IsActive').each(function (i, item) {
                            //    $(item).tooltipster({
                            //        trigger: 'custom',
                            //        triggerOpen: {
                            //            click: true
                            //        },
                            //        triggerClose: {
                            //            click: true
                            //        },
                            //        interactive: true,
                            //        contentAsHTML: true,
                            //        content: $('<div style="z-index:1000!important;"><b> <span class="" style="font-weight: bold;"></span> &nbsp;<button   type="button" style="z-index:1000;background-color:red;color:white;" class="btn  btn-sm active" onclick="SetAsNotActive(' + $(this).attr('tag') +')"><i class="fa fa-times"></i> &nbsp; Set as In-Active</button> </br></div>'
                            //        )
                            //    });

                            //    //<button   type="button" class="btn btn-warning btn-sm active" onclick="PrintAreaLocationsChartWithIndex(' + index + ', ' + pmaxcount+')"><i class="fas fa-binoculars"></i></button>
                            //});

                            //$('.IsNotActive').each(function (i, item) {
                            //    $(item).tooltipster({
                            //        trigger: 'custom',
                            //        triggerOpen: {
                            //            click: true
                            //        },
                            //        triggerClose: {
                            //            click: true
                            //        },
                            //        interactive: true,
                            //        contentAsHTML: true,
                            //        content: $('<b> <span class="" style="font-weight: bold;"></span> &nbsp;<button   type="button" style="background-color:#61B329;color:white;" class="btn  btn-sm active" onclick="SetAsActive(' + $(this).attr('tag') + ')"><i class="	fa fa-check-circle"> Set as Active</i></button> </br>'
                            //        )
                            //    });

                            //    //<button   type="button" class="btn btn-warning btn-sm active" onclick="PrintAreaLocationsChartWithIndex(' + index + ', ' + pmaxcount+')"><i class="fas fa-binoculars"></i></button>
                            //});


                          //  $('.draggable').dragon();
                        }

                    });


                    
                }
                FadePageCover(false);
            }
            , null);
    }
    else
        swal("Sorry", "Please make sure that date format is dd/MM/yyyy.");
}






function AreaLocationsChart_Print(pOutputTo) {
    debugger;
    if (IsNull($('#slArea').val(), "0") != "0") {
        FadePageCover(true);
        var pWhereClause = " where AreaID = " + $('#slArea').val() + "";
        var pParametersWithValues = {
            pWhereClause: pWhereClause
        };
        CallGETFunctionWithParameters("/api/AreaLocationsChart/LoadData"
            , pParametersWithValues
            , function (pData) {
                var _RowCount = pData[0];
                if (_RowCount == 0)
                    swal("Sorry", "No records are found for that search criteria.");
                else {

                    AreaLocationsChart_DrawReport(pData, pOutputTo);
                }
                FadePageCover(false);
            }
            , null);
    }
    else
        swal("Sorry", "Please select Area.");
}


function UpdateChartData() {
    debugger;


}

function PrintAreaLocationsChartWithIndex(index, NoOfColumns, AreaID) {
    hAreaID =  AreaID;
    hIndex = index;
    var data = ArrayOfSeperatedWareHouese[index];
    $('#ReportSectionHeader').fadeOut(300);
    $('#redips-drag').fadeIn(400);
    AreaLocationsChart_DrawReport(data, NoOfColumns, 'print');

}
function groupBy(arr, property) {
    return arr.reduce(function (memo, x) {
        if (!memo[x[property]]) { memo[x[property]] = []; }
        memo[x[property]].push(x);
        return memo;
    }, []);
}

function UpdateActionOrInActive(ID, SetActive)
{
    var pParametersWithValues = {
        pID: ID, pStatueID: (SetActive == true ? 10 : 30) 
    };
    CallGETFunctionWithParameters("/api/AreaLocationsChart/UpdateActionOrInActive", pParametersWithValues
        , function (pData) {
            //var data = JSON.parse(pData);
            //debugger
            //if (IsNull(data[0], "") != "")
            //    swal("Excuse me !", pData[0], "warning");
            //else
            //    TransferProducts_LoadingWithPaging();



            FadePageCover(false);
        }
        , null);
}

function ReturnToMainChart()
{
    if (IsNull($('#slWarehouses').val(), "0") != "0") {
        FadePageCover(true);
        var pWhereClause = " where WareHouseID = " + $('#slWarehouses').val() + " and AreaID = " + hAreaID + " order by LocationIndex , RowID ";
        var pParametersWithValues = {
            pWhereClause: pWhereClause
        };
        CallGETFunctionWithParameters("/api/AreaLocationsChart/LoadData"
            , pParametersWithValues
            , function (pData) {
                var _RowCount = pData[0];
                if (_RowCount == 0)
                    swal("Sorry", "No records are found for that search criteria.");
                else {


                    debugger

                    var pReportRows = JSON.parse(pData[1]);


                    ArrayOfSeperatedWareHouese[hIndex] = pReportRows;
                    
                    $('#divArea_' + hIndex + '').html(AreaLocationsChart_DrawReport_Mini(pReportRows, JSON.parse(pData[2]), "print", hIndex, 0, true));
                    $('#redips-drag').fadeOut(300);
                    $('#ReportSectionHeader').fadeIn(400);

                    $('#divArea_' + hIndex + '').find('.mytooltip').each(function (i, item) {

                        //var _data = 'Type : ' + item.PurchaseItemName + ' ';
                        //_data += 'Color : ' + item.PaintType + ' ';
                        //_data += 'ChassisNumber : ' + item.ChassisNumber + ' ';
                        //_data += 'EngineNumber : ' + item.EngineNumber + ' ';
                        //_data += 'ReceiveDate : ' + GetDateFromServer(item.ReceiveDate) + ' ';
                        $(item).tooltipster({
                            trigger: 'custom',
                            triggerOpen: {
                                click: true
                            },
                            triggerClose: {
                                click: true
                            },
                            interactive: true,
                            contentAsHTML: true,
                            content: $('<b> <span class="fas fa-car-side" style="font-weight: bold;"></span> &nbsp; Type : ' + $(this).attr('Type') + '</b></br>'
                                + '<b> <span class="fa fa-paint-brush" style="font-weight: bold;"></span> &nbsp; Color : ' + $(this).attr('Color') + '</b></br>'
                                + '<b> <span class="fa fa-barcode" style="font-weight: bold;"></span> &nbsp; ChassisNumber : ' + $(this).attr('ChassisNumber') + '</b></br>'
                                + '<b> <span class="fa fa-ticket" style="font-weight: bold;"></span> &nbsp; EngineNumber : ' + $(this).attr('EngineNumber') + '</b></br>'
                                + '<b> <span class="fas fa-clock" style="font-weight: bold;"></span> &nbsp; ReceiveDate : ' + $(this).attr('ReceiveDate') + '</b></br>'

                            )
                        });
                    });
                }
                FadePageCover(false);
            }
            , null);
    }
    else
        swal("Sorry", "Please make sure that date format is dd/MM/yyyy.");


}

//https://www.redips.net/javascript/redips-drag-documentation/#event.clicked
function AreaLocationsChart_DrawReport(pData, NoOfColumns, pOutputTo) {
    debugger;
    $('#redips-drag').html('');
    var pReportRows = pData; // JSON.parse(pData[1]);
    var pReportTitle = " Area Locations Chart ";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";
    var IndexForRow = 0;
    var _NumberOfColumns = NoOfColumns; //parseInt(pData[2]);
    var HeaderCells = pData.map(item => item.RowName).filter((value, index, self) => self.indexOf(value) === index);
    //var _NumberOfColumns = 15;
    console.log("_NumberOfColumns " + _NumberOfColumns);
    pTableHTML += '<h4>';
    pTableHTML += '<span class="fas fa-map-marked-alt">&nbsp;Area:&nbsp;</span>' + pReportRows[0].AreaName + '&nbsp; <button   type="button" class="btn btn-warning btn-sm active" onclick="ReturnToMainChart();"><i class="fas fa-chevron-circle-left">&nbsp; Return</i></button>';
    pTableHTML += '<div class="float-right">';

    pTableHTML += '<div class="btn-group" role="group" aria-label="Basic example">';
    pTableHTML += '&nbsp;<button   type="button" class="btn-status-10 btn-status btn  btn-sm " onclick="ResetStatus(10);"><span class="fas fa-check-circle">&nbsp;</span>Active Locations</button>';
    pTableHTML += '&nbsp;<button   type="button" class="btn-status-30 btn-status btn  btn-sm " onclick="ResetStatus(30);"><span class="fa fa-times">&nbsp;</span>Block Locations</button>';
    pTableHTML += '</div>';
    pTableHTML += '<div class="btn-group" role="group" aria-label="Basic example">';
    pTableHTML += '&nbsp;<button   type="button" class="btn-status-40 btn-status btn  btn-sm " onclick="ResetStatus(40);"><span class="fas fa-car">&nbsp;</span>Confirm Spot Allocation</button>';
    pTableHTML += '&nbsp;<button   type="button" class="btn-status-20 btn-status btn  btn-sm " onclick="ResetStatus(20);"><span class="fas fa-eye-slash">&nbsp;</span>Un-Confirmed</button>';
    pTableHTML += '</div>';
    pTableHTML += '<div class="btn-group" role="group" aria-label="Basic example">';
    pTableHTML += '&nbsp;<button   type="button" class="btn-status-50 btn-status btn  btn-sm " onclick="ResetStatus(50);"><span class="fas fa-tools">&nbsp;</span>PDI IN</button>';
    pTableHTML += '&nbsp;<button   type="button" class="btn-status-40 btn-status btn  btn-sm " onclick="ResetStatus(40);"><span class="fas fa-check-double">&nbsp;</span>PDI OUT</button>';
    pTableHTML += '</div>';
    pTableHTML += '<div class="btn-group" role="group" aria-label="Basic example">';
    pTableHTML += '&nbsp;<button   type="button" class="btn-status-10 btn-status btn  btn-sm float-right" onclick="ResetStatus(10);"><span class="fas fa-truck-moving">&nbsp;</span>Pick Up</button>';
    pTableHTML += '</div>';




    pTableHTML += '</div>';
    pTableHTML += '</h4>';
    pTableHTML += '                         <table id="tblAreaLocationsChart" class="tblAreaLocationsChart   print " style="">';//remove t1 class to remove row numbers
    //----------------------------------------------------------- table header ---------------------------------------------------------------------
    pTableHTML += '                             <thead>';
    pTableHTML += '                                 <tr class=""  >';
    pTableHTML += '<th class="redips-mark" ></th>';
    for (var i = 0; i < HeaderCells.length; i++)
    {
        pTableHTML += '        <th   class="redips-mark">' + HeaderCells[i] + '</th>';
    }

    pTableHTML += '                                 </tr>';
    pTableHTML += '                             </thead>';
    //---------------------------------------------------------------------------------------------------------------------------------
    pTableHTML += '                             <tbody>';
    $.each((pReportRows), function (i, item) {

        if (i == 0) {
            IndexForRow = 0;
            pTableHTML += '                                         <tr  >';
            pTableHTML += '                                         <td class="redips-mark">' + item.LocationIndex + '</td>';
        }
        else if (item.LocationIndex != pReportRows[i - 1].LocationIndex) {
            IndexForRow = 0;
            pTableHTML += '                                         </tr>';
            pTableHTML += '                                         <tr  >';
            pTableHTML += '                                         <td class="redips-mark">  ' + item.LocationIndex + '</td>';
        }

        if (item.RowName == HeaderCells[IndexForRow]) {


            if (item.StatusID == 50) // Reserved
                pTableHTML += '                                         <td class="redips-mark" td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '" div_StatusID="' + item.StatusID + '" div_RecieveDetailsID="' + item.MaxRecievedDetailsID + '" div_LocationID="' + item.ID + '" Type="' + item.PurchaseItemName + '" Color="' + item.PaintType + '" ChassisNumber="' + item.ChassisNumber + '" EngineNumber="' + item.EngineNumber + '" ReceiveDate="' + GetDateFromServer(item.ReceiveDate) + ' ' + GetTimeFromServer(item.ReceiveDate) + '"       class="redips-drag dragDiv   mytooltip Reserved"><input onchange="CheckStatusButtons();" cb_LocationID="' + item.ID + '"   cb_StatusID="50" type="checkbox" class="dragCheckbox" /><span class="dragSpan"  >' + 'R' + '</span></div>' + '</td>';
            else if (item.StatusID == 40) // Confirmed
                pTableHTML += '                                         <td class="redips-mark" td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '" div_StatusID="' + item.StatusID + '" div_RecieveDetailsID="' + item.MaxRecievedDetailsID + '" div_LocationID="' + item.ID + '" Type="' + item.PurchaseItemName + '" Color="' + item.PaintType + '" ChassisNumber="' + item.ChassisNumber + '" EngineNumber="' + item.EngineNumber + '" ReceiveDate="' + GetDateFromServer(item.ReceiveDate) + ' ' + GetTimeFromServer(item.ReceiveDate) + '"       class="redips-drag dragDiv   mytooltip Confirmed"><input type="checkbox" onchange="CheckStatusButtons();" cb_LocationID="' + item.ID + '"  cb_StatusID="40" class="dragCheckbox" /><span class="dragSpan fas fa-car"  >' + '' + '</span></div>' + '</td>';
            else if (item.StatusID == 30) // blocked
                pTableHTML += '                                         <td class="redips-mark" td_LocationID = "' + item.ID + '">' + '<div  tag="' + item.ID + '" div_StatusID="' + item.StatusID + '" div_RecieveDetailsID="' + 0 + '" div_LocationID="' + item.ID + '"  class=" dragDiv    Blocked"><input type="checkbox" onchange="CheckStatusButtons();" cb_LocationID="' + item.ID + '" cb_StatusID="30" class="dragCheckbox" /><span class="dragSpan fa fa-times"  >' + '' + '</span></div>' + '</td>';
            else if (item.StatusID == 20) // Allocated
                pTableHTML += '                                         <td td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '" div_StatusID="' + item.StatusID + '" div_RecieveDetailsID="' + item.MaxRecievedDetailsID + '" div_LocationID="' + item.ID + '" Type="' + item.PurchaseItemName + '" Color="' + item.PaintType + '" ChassisNumber="' + item.ChassisNumber + '" EngineNumber="' + item.EngineNumber + '" ReceiveDate="' + GetDateFromServer(item.ReceiveDate) + ' ' + GetTimeFromServer(item.ReceiveDate) + '"       class="redips-drag dragDiv   mytooltip Allocated"><input type="checkbox" onchange="CheckStatusButtons();" cb_StatusID="20" cb_LocationID="' + item.ID + '" class="dragCheckbox" /><span class="dragSpan fas fa-car"  >' + '' + '</span></div>' + '</td>';
            else if (item.StatusID == 10 && item.IsUsed != true) // Normal && Is Not Used
                pTableHTML += '                                         <td  td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '" div_StatusID="' + item.StatusID + '" div_RecieveDetailsID="' + 0 + '" div_LocationID="' + item.ID + '"  class=" dragDiv    Normal"><input type="checkbox" cb_LocationID="' + item.ID + '" onchange="CheckStatusButtons();" cb_StatusID="10" class="dragCheckbox" /><span class="dragSpan"  >' + '\xa0' + '\xa0' + '\xa0' + '</span></div>' + '</td>';
            else // Allocated
                pTableHTML += '                                         <td class="redips-mark" td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '" div_StatusID="' + 20 + '" div_RecieveDetailsID="' + item.MaxRecievedDetailsID + '" div_LocationID="' + item.ID + '" Type="' + item.PurchaseItemName + '" Color="' + item.PaintType + '" ChassisNumber="' + item.ChassisNumber + '" EngineNumber="' + item.EngineNumber + '" ReceiveDate="' + GetDateFromServer(item.ReceiveDate) + ' ' + GetTimeFromServer(item.ReceiveDate) + '"       class="redips-drag dragDiv   mytooltip Allocated"><input onchange="CheckStatusButtons();" cb_StatusID="20" cb_LocationID="' + item.ID + '" type="checkbox" class="dragCheckbox" /><span class="dragSpan fas fa-car"  >' + '' + '</span></div>' + '</td>';

            
        }
        else {

            var _i = HeaderCells.indexOf(item.RowName);
            console.log("INNNNNNNNNNNNNNNN" + _i)
            if (_i != -1) {

                var diff = (_i - IndexForRow);

                for (var j = 0; j < diff; j++) {
                    pTableHTML += '                                         <td style="border: solid 0px white!important;" class="redips-mark NotLocation"></td>';
                    IndexForRow = IndexForRow + 1;




                    if (j == diff - 1) {
                        if (item.StatusID == 50) // Reserved
                            pTableHTML += '                                         <td class="redips-mark" td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '" div_StatusID="' + item.StatusID + '" div_RecieveDetailsID="' + item.MaxRecievedDetailsID + '" div_LocationID="' + item.ID + '" Type="' + item.PurchaseItemName + '" Color="' + item.PaintType + '" ChassisNumber="' + item.ChassisNumber + '" EngineNumber="' + item.EngineNumber + '" ReceiveDate="' + GetDateFromServer(item.ReceiveDate) + ' ' + GetTimeFromServer(item.ReceiveDate) + '"       class="redips-drag dragDiv   mytooltip Reserved"><input onchange="CheckStatusButtons();" cb_LocationID="' + item.ID + '"   cb_StatusID="50" type="checkbox" class="dragCheckbox" /><span class="dragSpan"  >' + 'R' + '</span></div>' + '</td>';
                        else if (item.StatusID == 40) // Confirmed
                            pTableHTML += '                                         <td class="redips-mark" td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '" div_StatusID="' + item.StatusID + '" div_RecieveDetailsID="' + item.MaxRecievedDetailsID + '" div_LocationID="' + item.ID + '" Type="' + item.PurchaseItemName + '" Color="' + item.PaintType + '" ChassisNumber="' + item.ChassisNumber + '" EngineNumber="' + item.EngineNumber + '" ReceiveDate="' + GetDateFromServer(item.ReceiveDate) + ' ' + GetTimeFromServer(item.ReceiveDate) + '"       class="redips-drag dragDiv   mytooltip Confirmed"><input type="checkbox" onchange="CheckStatusButtons();" cb_LocationID="' + item.ID + '"  cb_StatusID="40" class="dragCheckbox" /><span class="dragSpan fas fa-car"  >' + '' + '</span></div>' + '</td>';
                        else if (item.StatusID == 30) // blocked
                            pTableHTML += '                                         <td class="redips-mark" td_LocationID = "' + item.ID + '">' + '<div  tag="' + item.ID + '" div_StatusID="' + item.StatusID + '" div_RecieveDetailsID="' + 0 + '" div_LocationID="' + item.ID + '"  class=" dragDiv    Blocked"><input type="checkbox" onchange="CheckStatusButtons();" cb_LocationID="' + item.ID + '" cb_StatusID="30" class="dragCheckbox" /><span class="dragSpan fa fa-times"  >' + '' + '</span></div>' + '</td>';
                        else if (item.StatusID == 20) // Allocated
                            pTableHTML += '                                         <td td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '" div_StatusID="' + item.StatusID + '" div_RecieveDetailsID="' + item.MaxRecievedDetailsID + '" div_LocationID="' + item.ID + '" Type="' + item.PurchaseItemName + '" Color="' + item.PaintType + '" ChassisNumber="' + item.ChassisNumber + '" EngineNumber="' + item.EngineNumber + '" ReceiveDate="' + GetDateFromServer(item.ReceiveDate) + ' ' + GetTimeFromServer(item.ReceiveDate) + '"       class="redips-drag dragDiv   mytooltip Allocated"><input type="checkbox" onchange="CheckStatusButtons();" cb_StatusID="20" cb_LocationID="' + item.ID + '" class="dragCheckbox" /><span class="dragSpan fas fa-car"  >' + '' + '</span></div>' + '</td>';
                        else if (item.StatusID == 10 && item.IsUsed != true) // Normal && Is Not Used
                            pTableHTML += '                                         <td  td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '" div_StatusID="' + item.StatusID + '" div_RecieveDetailsID="' + 0 + '" div_LocationID="' + item.ID + '"  class=" dragDiv    Normal"><input type="checkbox" cb_LocationID="' + item.ID + '" onchange="CheckStatusButtons();" cb_StatusID="10" class="dragCheckbox" /><span class="dragSpan"  >' + '\xa0' + '\xa0' + '\xa0' + '</span></div>' + '</td>';
                        else // Allocated
                            pTableHTML += '                                         <td class="redips-mark" td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '" div_StatusID="' + 20 + '" div_RecieveDetailsID="' + item.MaxRecievedDetailsID + '" div_LocationID="' + item.ID + '" Type="' + item.PurchaseItemName + '" Color="' + item.PaintType + '" ChassisNumber="' + item.ChassisNumber + '" EngineNumber="' + item.EngineNumber + '" ReceiveDate="' + GetDateFromServer(item.ReceiveDate) + ' ' + GetTimeFromServer(item.ReceiveDate) + '"       class="redips-drag dragDiv   mytooltip Allocated"><input onchange="CheckStatusButtons();" cb_StatusID="20" cb_LocationID="' + item.ID + '" type="checkbox" class="dragCheckbox" /><span class="dragSpan fas fa-car"  >' + '' + '</span></div>' + '</td>';


                    }
                }


            }

           
        }

    
        IndexForRow = IndexForRow + 1;
        if (i == pReportRows.length - 1) {
            pTableHTML += '                                         </tr>';
        }

    });
    pTableHTML += '                             </tbody>';
    pTableHTML += '                         </table>';

    var ReportHTML = '';
    ReportHTML += '<html>';
    ReportHTML += '     <head><title>' + pReportTitle + '</title><link href="/Content/CSS/fontawesome5/css/all.css" rel="stylesheet" /><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /> <style>@media print{@page {size: landscape}}</style></head>';
    ReportHTML += '         <body style="background-color:white;">';
    //    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
    //    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';


    //    ReportHTML += '                     <div>&nbsp;</div>';
    ReportHTML += '                         ' + pTableHTML + '';
    // ReportHTML += '             <div style="color:#613c67;font-size: large;font-weight: bold;" class="col-xs-12"><b> <span class="	fas fa-house-damage"></span>&nbsp;Warehouse :</b> ' + $('#slWarehouses option:selected').text() + '</div><hr>';
    //  ReportHTML += '             <div style="color:#613c67;font-size: large;font-weight: bold;" class="col-xs-12"><b>Area :</b> ' + $('#slArea option:selected').text() + '</div>';
    //  ReportHTML += '             <div style="color:#613c67;font-size: large;font-weight: bold;" class="col-xs-12"><b>Empty Location :</b> ' + '<span class="fa fa-times" style=" color: #613c67;font-size: xx-small;"></span>' + '</div>';
    //  ReportHTML += '             <div style="color:#613c67;font-size: large;font-weight: bold;" class="col-xs-12"><b>Used Location&nbsp;&nbsp; :</b> ' + '<span class="fas fa-car" style=" color: white;background-color: #613c67;font-size: xx-small;"></span>' + '</div>'; 
    ReportHTML += '         </body>';
    //ReportHTML += '     <footer class="footer col-xs-12 hidden-print" style="width:100%; position:absolute; bottom:0;">';

    //    ReportHTML += '     </footer>';

    ReportHTML += '</html>';
    if (pOutputTo == "PrintInReportBody")
        $("#ReportBody").html(ReportHTML);
    else {
        //var mywindow = window.open('', '_blank');
        //mywindow.document.write(ReportHTML);
        //mywindow.document.close();
        $('#redips-drag').html(ReportHTML);

        $('#redips-drag .mytooltip').each(function (i, item) {
            //var _data = 'Type : ' + item.PurchaseItemName + ' ';
            //_data += 'Color : ' + item.PaintType + ' ';
            //_data += 'ChassisNumber : ' + item.ChassisNumber + ' ';
            //_data += 'EngineNumber : ' + item.EngineNumber + ' ';
            //_data += 'ReceiveDate : ' + GetDateFromServer(item.ReceiveDate) + ' ';
            $(item).tooltipster({
                trigger: 'custom',
                triggerOpen: {
                    click: true
                },
                triggerClose: {
                    click: true
                },
                interactive: true,
                contentAsHTML: true,
                content: $('<b> <span class="fas fa-car-side" style="font-weight: bold;"></span> &nbsp; Type : ' + $(this).attr('Type') + '</b></br>'
                    + '<b> <span class="fa fa-paint-brush" style="font-weight: bold;"></span> &nbsp; Color : ' + $(this).attr('Color') + '</b></br>'
                    + '<b> <span class="fa fa-barcode" style="font-weight: bold;"></span> &nbsp; ChassisNumber : ' + $(this).attr('ChassisNumber') + '</b></br>'
                    + '<b> <span class="fa fa-ticket" style="font-weight: bold;"></span> &nbsp; EngineNumber : ' + $(this).attr('EngineNumber') + '</b></br>'
                    + '<b> <span class="fas fa-clock" style="font-weight: bold;"></span> &nbsp; ReceiveDate : ' + $(this).attr('ReceiveDate') + '</b></br>'

                )
            });







        });

        //$('#redips-drag .IsActive').each(function (i, item) {
        //    $(item).tooltipster({
        //        trigger: 'custom',
        //        triggerOpen: {
        //            click: true
        //        },
        //        triggerClose: {
        //            click: true
        //        },
        //        interactive: true,
        //        contentAsHTML: true,
        //        content: $('<div style="z-index:1000!important;"><b> <span class="" style="font-weight: bold;"></span> &nbsp;<button   type="button" style="z-index:1000;background-color:red;color:white;" class="btn  btn-sm active" onclick="SetAsNotActive(' + $(this).attr('tag') + ')"><i class="fa fa-times"></i> &nbsp; Set as In-Active</button> </br></div>'
        //        )
        //    });

        //    //<button   type="button" class="btn btn-warning btn-sm active" onclick="PrintAreaLocationsChartWithIndex(' + index + ', ' + pmaxcount+')"><i class="fas fa-binoculars"></i></button>
        //});

        //$('#redips-drag .IsNotActive').each(function (i, item) {
        //    $(item).tooltipster({
        //        trigger: 'custom',
        //        triggerOpen: {
        //            click: true
        //        },
        //        triggerClose: {
        //            click: true
        //        },
        //        interactive: true,
        //        contentAsHTML: true,
        //        content: $('<b> <span class="" style="font-weight: bold;"></span> &nbsp;<button   type="button" style="background-color:#61B329;color:white;" class="btn  btn-sm active" onclick="SetAsActive(' + $(this).attr('tag') + ')"><i class="	fa fa-check-circle"> Set as Active</i></button> </br>'
        //        )
        //    });

        //    //<button   type="button" class="btn btn-warning btn-sm active" onclick="PrintAreaLocationsChartWithIndex(' + index + ', ' + pmaxcount+')"><i class="fas fa-binoculars"></i></button>
        //});



        //$(ArrIsActive).each(function (i, item) {
        //    SetAsActive(item);

        //});

        //$(ArrIsNotActive).each(function (i, item) {
        //    SetAsNotActive(item);

        //});
        REDIPS.drag.init();
        REDIPS.drag.dropMode = 'switch';
      //  REDIPS.drag.drop_option = 'switch'; //multiple, single, switch, switching, overwrite and shift.


        var rd = REDIPS.drag;
        // display target and source position of dropped element
        rd.event.dropped = function () {
            // get target and source position (method returns positions as array)
            // pos[0] - target table index
            // pos[1] - target row index
            // pos[2] - target cell (column) index
            // pos[3] - source table index
            // pos[4] - source row index
            // pos[5] - source cell (column) index
           // var pos = rd.getPosition();
            // display element positions
          //  console.log(pos);


          //  console.log()


            UpdateSwappedLocations(REDIPS.drag.obj, REDIPS.drag.objOld);


          //  swal(pos[0] + '--------' + pos[1] + '--------' + '--------' + pos[2] + '--------' + pos[3] + '--------' + pos[4] + '--------' + pos[5]);
        };



    }


}


function CheckStatusButtons()
{
    CheckedStatus = [];
    CheckedLocations = [];
    CheckedRecieveDetails = [];
    $('.btn-status').prop('disabled', true);
    setTimeout(function () {

        $(".dragCheckbox:checked").each(function (i, cb) {

            CheckedStatus.push($(cb).attr('cb_StatusID'));
            CheckedLocations.push($(cb).attr('cb_LocationID'));
            _td = cb.closest("td");
            _div = $(_td).find('.dragDiv');

            CheckedRecieveDetails.push($(_div).attr('div_RecieveDetailsID'))
            if (i == $(".dragCheckbox:checked").length - 1)
            {

                var _CheckedStatusIDs = CheckedStatus.filter((value, index, self) => self.indexOf(value) === index);


                if (_CheckedStatusIDs.length != 1)
                $('.btn-status').prop('disabled', true);
                else if (_CheckedStatusIDs[0] == "10") //empty
                {
                    $('.btn-status-30').prop('disabled', false);
                }
                else if (_CheckedStatusIDs[0] == "20") //Allocated
                {
                    $('.btn-status-40:eq( 0 )').prop('disabled', false);
                    $('.btn-status-10:eq( 1 )').prop('disabled', false);
                    $('.btn-status-50').prop('disabled', false);
                }
                else if (_CheckedStatusIDs[0] == "30") // Blocked
                {
                    $('.btn-status-10:eq( 0 )').prop('disabled', false);
                }
                else if (_CheckedStatusIDs[0] == "40") // Confirmed //PickOut
                {
                    $('.btn-status-20').prop('disabled', false);
                    $('.btn-status-50').prop('disabled', false);
                    $('.btn-status-10:eq( 1 )').prop('disabled', false);
                }
                else if (_CheckedStatusIDs[0] == "50") // Reserved //PickIn
                {
                    $('.btn-status-40:eq( 1 )').prop('disabled', false);
                }


            }



            //btn-status-40 btn-status


        });




    }, 100);
    


}

function ResetStatus(ToStatusID)
{
    if ($(".dragCheckbox:checked").length > 0) {
        //var CheckedStatus = new Array();
        //var CheckedLocations = new Array();
        //var CheckedRecieveDetails = new Array();
   
        var pParametersWithValues = {
            pToStatusID: ToStatusID, pLocationsIDs: CheckedLocations.join(","), pRecieveDetailsIDs: CheckedRecieveDetails.join(",")
            };
    CallGETFunctionWithParameters("/api/AreaLocationsChart/ResetStatus", pParametersWithValues
        , function (pData) {
            //var data = JSON.parse(pData);
            //debugger
            //if (IsNull(data[0], "") != "")
            //    swal("Excuse me !", pData[0], "warning");
            //else
            //    TransferProducts_LoadingWithPaging();

            $(".dragCheckbox:checked").each(function (i, cb) {
                //-----------------------------------
                _td = cb.closest("td");
                _div = $(_td).find('.dragDiv');
                //-----------------------------------
                $(_div).removeClass("Reserved Confirmed Allocated Blocked Normal");
                $(_div).attr('div_StatusID', ToStatusID);
                $(_div).find('.dragSpan').remove();
                // $(_div).addClass(ToStatueName);
                //-----------------------------------
                $(cb).attr('cb_StatusID', ToStatusID);
                //-----------------------------------
                $(cb).prop("checked", false);

                if (ToStatusID == "50") // Reserved
                {
                    $(_div).append('<span class="dragSpan">' + 'R' + '</span>');
                    $(_div).addClass("Reserved");
                }
                else if (ToStatusID == "40") // Confirmed
                {
                    $(_div).append('<span class="dragSpan fas fa-car"  >' + '' + '</span>');
                    $(_div).addClass("Confirmed");
                }

                else if (ToStatusID == "30") // blocked
                {
                    $(_div).append('<span class="dragSpan fa fa-times"  >' + '' + '</span>');
                    $(_div).removeClass("redips-drag  mytooltip");
                    $(_td).addClass("redips-mark");
                    $(_div).addClass("Blocked");
                }

                else if (ToStatusID == "20") // Allocated
                {
                    $(_div).append('<span class="dragSpan fas fa-car"  >' + '' + '</span>');
                    $(_div).addClass("Allocated");
                }

                else if (ToStatusID == "10") // Normal && Is Not Used
                {
                    $(_div).append('<span class="dragSpan"  >' + '\xa0' + '\xa0' + '\xa0' + '</span>');
                    $(_div).removeClass("redips-drag  mytooltip");
                    $(_td).removeClass("redips-mark");
                    $(_div).addClass("Normal");
                    $(_div).attr('div_RecieveDetailsID', "0");
                }



                if (i == $(".dragCheckbox:checked").length - 1) {




                    CheckedStatus = [];
                    CheckedLocations = [];
                    $('.btn-status').prop('disabled', true);
                }

            });

            FadePageCover(false);
        }
        , null);

 


    }
}


function UpdateSwappedLocations(FromLocation, ToLocation) {
    debugger;
    FadePageCover(true);
    var FromLocation_td = $(FromLocation).closest("td");
    var ToLocation_td = $(ToLocation).closest("td");
    
    var FromRecieveDetailsID = $(FromLocation).attr('div_RecieveDetailsID');
    var ToRecieveDetailsID = IsNull($(ToLocation).attr('div_RecieveDetailsID'), "0");






    var FromLocationID = $(FromLocation).attr('div_LocationID');
    var ToLocationID = $(ToLocation).attr('div_LocationID');

    var FromStatusID = $(FromLocation).attr('div_StatusID');
    var ToStatusID = $(ToLocation).attr('div_StatusID');
    console.log(FromStatusID + ">" + ToStatusID);
    console.log($(FromLocation_td).attr('td_locationid') + ">" + $(ToLocation_td).attr('ToLocation_td'));
    if (FromLocationID != ToLocationID && $(FromLocation_td).attr('td_locationid') != $(ToLocation_td).attr('ToLocation_td') ) {

        var pParametersWithValues =
        {
            pFromLocationID: FromLocationID,
            pToLocationID: ToLocationID,
            pFromRecieveDetailsID: FromRecieveDetailsID,
            pToRecieveDetailsID: ToRecieveDetailsID,
            pFromStatusID: FromStatusID,
            pToStatusID: ToStatusID
        };
        CallGETFunctionWithParameters("/api/AreaLocationsChart/UpdateSwappedLocations", pParametersWithValues
            , function (pData) {
                //var data = JSON.parse(pData);
                //debugger
                //if (IsNull(data[0], "") != "")
                //    swal("Excuse me !", pData[0], "warning");
                //else
                //    TransferProducts_LoadingWithPaging();

                var _fromLocation_ID = $(FromLocation).attr('div_LocationID');
                var _toLocation_ID = $(ToLocation).attr('div_LocationID');
                // $(ToLocation).closest("td");


                $(FromLocation).attr('div_LocationID', _toLocation_ID);
                $(ToLocation).attr('div_LocationID', _fromLocation_ID);


                $(FromLocation).find(".dragCheckbox").attr('cb_LocationID', _toLocation_ID);
                $(ToLocation).find(".dragCheckbox").attr('cb_LocationID', _fromLocation_ID);


                FadePageCover(false);
            }
            , null);
    }
    else {
        FadePageCover(false);
    }



}




function AreaLocationsChart_DrawReport_Mini(pData, pmaxcount, pOutputTo, index, inx, IsUpdate) {
    debugger;
   
    var pReportRows = pData;
    var pReportTitle = " Area Locations Chart ";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";
    var IndexForRow = 0;
    var _NumberOfColumns = parseInt(pmaxcount);

    var HeaderCells = pData.map(item => item.RowName).filter((value, index, self) => self.indexOf(value) === index);


    //var _NumberOfColumns = 15;
    console.log("_NumberOfColumns " + HeaderCells);
    pTableHTML += '<h4> Area : ' + pReportRows[0].AreaName + '&nbsp; <button   type="button" class="btn btn-warning btn-sm active" onclick="PrintAreaLocationsChartWithIndex(' + index + ', ' + pmaxcount + ', ' + pReportRows[0].AreaID + ')"><i style="color:black;" class="fas fa-binoculars">&nbsp; Expand & Edit </i></button></h3>';
    pTableHTML += '                         <table id="tblAreaLocationsChart' + index +'" class="tblAreaLocationsChart   print " style="">';//remove t1 class to remove row numbers
    //----------------------------------------------------------- table header ---------------------------------------------------------------------
    pTableHTML += '                             <thead>';
    pTableHTML += '                                 <tr class="" style="">';
    pTableHTML += '<th style="border: solid 1px black;"></th>';
    for (var i = 0; i < HeaderCells.length; i++)
    {
        pTableHTML += '        <th style="">' + HeaderCells[i] + '</th>';
    }
    pTableHTML += '                                 </tr>';
    pTableHTML += '                             </thead>';
    //---------------------------------------------------------------------------------------------------------------------------------
    pTableHTML += '                             <tbody>';
    $.each((pReportRows), function (i, item) {

        if (i == 0) {
            IndexForRow = 0;
            pTableHTML += '                                         <tr  >';
            pTableHTML += '                                         <td  >' + item.LocationIndex + '</td>';
        }
        else if (item.LocationIndex != pReportRows[i - 1].LocationIndex) {
            IndexForRow = 0;
            pTableHTML += '                                         </tr>';
            pTableHTML += '                                         <tr  >';
            pTableHTML += '                                         <td  >' + item.LocationIndex + '</td>';
        }
        // else
        // {
        //if (item.IsUsed != true)
        //    if (item.StatusID == 30 /*Is Not Active*/)
        //        pTableHTML += '                                         <td>' + '<div  tag="' + item.ID + '" ID="S' + item.ID + '"   class="redips-drag   IsNotActive dragDiv"><span class="fa fa-times"  >' + '' + '</span></div>' + '</td>';
        //    else
        //        pTableHTML += '                                         <td>' + '<div  tag="' + item.ID + '" ID="S' + item.ID + '"   class="redips-drag   IsActive dragDiv"><span class=""  >' + '' + '</span>' + '</div></td>';
        ////PurchaseItemName //PaintType  //ChassisNumber //EngineNumber //ReceiveDate
        //else {
        //    //pTableHTML += '                                         <td aria-label="' + _data + '"  data-microtip-position="top" role="tooltip" style="background-color: #613c67;">' + '<span class="fa fa-truck" style=" color:white;font-size: xx-small;"></span>' + '</td>';
        //    pTableHTML += '                                         <td>' + '<div tag="' + item.ID + '" ID="S' + item.ID + '" Type="' + item.PurchaseItemName + '" Color="' + item.PaintType + '" ChassisNumber="' + item.ChassisNumber + '" EngineNumber="' + item.EngineNumber + '" ReceiveDate="' + GetDateFromServer(item.ReceiveDate) + ' ' + GetTimeFromServer(item.ReceiveDate) + '"       class="redips-drag dragDiv   mytooltip Allocated"><span class="fas fa-car"  >' + '' + '</span></div>' + '</td>';
        //}
        //  }
        //  }

        if (item.RowName == HeaderCells[IndexForRow]) {
            if (item.StatusID == 50) // Reserved
                pTableHTML += '                                         <td td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '" div_RecieveDetailsID="' + item.MaxRecievedDetailsID + '" div_LocationID="' + item.ID + '" Type="' + item.PurchaseItemName + '" Color="' + item.PaintType + '" ChassisNumber="' + item.ChassisNumber + '" EngineNumber="' + item.EngineNumber + '" ReceiveDate="' + GetDateFromServer(item.ReceiveDate) + ' ' + GetTimeFromServer(item.ReceiveDate) + '"       class=" dragDiv   mytooltip Reserved"><input style="opacity:0.0" disabled type="checkbox" class="dragCheckbox" /><span class="dragSpan"  >' + 'R' + '</span></div>' + '</td>';
            else if (item.StatusID == 40) // Confirmed
                pTableHTML += '                                         <td td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '" div_RecieveDetailsID="' + item.MaxRecievedDetailsID + '" div_LocationID="' + item.ID + '" Type="' + item.PurchaseItemName + '" Color="' + item.PaintType + '" ChassisNumber="' + item.ChassisNumber + '" EngineNumber="' + item.EngineNumber + '" ReceiveDate="' + GetDateFromServer(item.ReceiveDate) + ' ' + GetTimeFromServer(item.ReceiveDate) + '"       class=" dragDiv   mytooltip Confirmed"><input style="opacity:0.0" disabled type="checkbox" class="dragCheckbox" /><span class="dragSpan fas fa-car"  >' + '' + '</span></div>' + '</td>';
            else if (item.StatusID == 30) // blocked
                pTableHTML += '                                         <td td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '"  class=" dragDiv   mytooltip Blocked"><input style="opacity:0.0" disabled type="checkbox" class="dragCheckbox" /><span class="dragSpan fa fa-times"  >' + '' + '</span></div>' + '</td>';
            else if (item.StatusID == 20) // Allocated
                pTableHTML += '                                         <td td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '" div_RecieveDetailsID="' + item.MaxRecievedDetailsID + '" div_LocationID="' + item.ID + '" Type="' + item.PurchaseItemName + '" Color="' + item.PaintType + '" ChassisNumber="' + item.ChassisNumber + '" EngineNumber="' + item.EngineNumber + '" ReceiveDate="' + GetDateFromServer(item.ReceiveDate) + ' ' + GetTimeFromServer(item.ReceiveDate) + '"       class=" dragDiv   mytooltip Allocated"><input style="opacity:0.0" disabled type="checkbox" class="dragCheckbox" /><span class="dragSpan fas fa-car"  >' + '' + '</span></div>' + '</td>';
            else if (item.StatusID == 10 && item.IsUsed != true) // Normal && Is Not Used
                pTableHTML += '                                         <td td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '"  class=" dragDiv   mytooltip Normal"><span class="dragSpan"  >' + '' + '</span></div>' + '</td>';
            else
                pTableHTML += '                                         <td td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '" div_RecieveDetailsID="' + item.MaxRecievedDetailsID + '" div_LocationID="' + item.ID + '" Type="' + item.PurchaseItemName + '" Color="' + item.PaintType + '" ChassisNumber="' + item.ChassisNumber + '" EngineNumber="' + item.EngineNumber + '" ReceiveDate="' + GetDateFromServer(item.ReceiveDate) + ' ' + GetTimeFromServer(item.ReceiveDate) + '"       class=" dragDiv   mytooltip Allocated"><input style="opacity:0.0" disabled type="checkbox" class="dragCheckbox" /><span class="dragSpan fas fa-car"  >' + '' + '</span></div>' + '</td>';

        }
        else {

            var _i = HeaderCells.indexOf(item.RowName);
            console.log("INNNNNNNNNNNNNNNN" + _i)
            if (_i != -1) {

                var diff = (_i - IndexForRow);

                for (var j = 0; j < diff; j++) {
                    pTableHTML += '                                         <td style="border: solid 0px white!important;" class="redips-mark NotLocation"></td>';
                    IndexForRow = IndexForRow + 1;




                    if (j == diff - 1) {
                        if (item.StatusID == 50) // Reserved
                            pTableHTML += '                                         <td td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '" div_RecieveDetailsID="' + item.MaxRecievedDetailsID + '" div_LocationID="' + item.ID + '" Type="' + item.PurchaseItemName + '" Color="' + item.PaintType + '" ChassisNumber="' + item.ChassisNumber + '" EngineNumber="' + item.EngineNumber + '" ReceiveDate="' + GetDateFromServer(item.ReceiveDate) + ' ' + GetTimeFromServer(item.ReceiveDate) + '"       class=" dragDiv   mytooltip Reserved"><input style="opacity:0.0" disabled type="checkbox" class="dragCheckbox" /><span class="dragSpan"  >' + 'R' + '</span></div>' + '</td>';
                        else if (item.StatusID == 40) // Confirmed
                            pTableHTML += '                                         <td td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '" div_RecieveDetailsID="' + item.MaxRecievedDetailsID + '" div_LocationID="' + item.ID + '" Type="' + item.PurchaseItemName + '" Color="' + item.PaintType + '" ChassisNumber="' + item.ChassisNumber + '" EngineNumber="' + item.EngineNumber + '" ReceiveDate="' + GetDateFromServer(item.ReceiveDate) + ' ' + GetTimeFromServer(item.ReceiveDate) + '"       class=" dragDiv   mytooltip Confirmed"><input style="opacity:0.0" disabled type="checkbox" class="dragCheckbox" /><span class="dragSpan fas fa-car"  >' + '' + '</span></div>' + '</td>';
                        else if (item.StatusID == 30) // blocked
                            pTableHTML += '                                         <td td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '"  class=" dragDiv   mytooltip Blocked"><input style="opacity:0.0" disabled type="checkbox" class="dragCheckbox" /><span class="dragSpan fa fa-times"  >' + '' + '</span></div>' + '</td>';
                        else if (item.StatusID == 20) // Allocated
                            pTableHTML += '                                         <td td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '" div_RecieveDetailsID="' + item.MaxRecievedDetailsID + '" div_LocationID="' + item.ID + '" Type="' + item.PurchaseItemName + '" Color="' + item.PaintType + '" ChassisNumber="' + item.ChassisNumber + '" EngineNumber="' + item.EngineNumber + '" ReceiveDate="' + GetDateFromServer(item.ReceiveDate) + ' ' + GetTimeFromServer(item.ReceiveDate) + '"       class=" dragDiv   mytooltip Allocated"><input style="opacity:0.0" disabled type="checkbox" class="dragCheckbox" /><span class="dragSpan fas fa-car"  >' + '' + '</span></div>' + '</td>';
                        else if (item.StatusID == 10 && item.IsUsed != true) // Normal && Is Not Used
                            pTableHTML += '                                         <td td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '"  class=" dragDiv   mytooltip Normal"><span class="dragSpan"  >' + '' + '</span></div>' + '</td>';
                        else
                            pTableHTML += '                                         <td td_LocationID = "' + item.ID + '">' + '<div tag="' + item.ID + '" div_RecieveDetailsID="' + item.MaxRecievedDetailsID + '" div_LocationID="' + item.ID + '" Type="' + item.PurchaseItemName + '" Color="' + item.PaintType + '" ChassisNumber="' + item.ChassisNumber + '" EngineNumber="' + item.EngineNumber + '" ReceiveDate="' + GetDateFromServer(item.ReceiveDate) + ' ' + GetTimeFromServer(item.ReceiveDate) + '"       class=" dragDiv   mytooltip Allocated"><input style="opacity:0.0" disabled type="checkbox" class="dragCheckbox" /><span class="dragSpan fas fa-car"  >' + '' + '</span></div>' + '</td>';


                    }
                }


            }


        }


        IndexForRow = IndexForRow + 1;

        if (i == pReportRows.length - 1) {
            pTableHTML += '                                         </tr>';
        }

    });
    pTableHTML += '                             </tbody>';
    pTableHTML += '                         </table>';

    var ReportHTML = '';
    ReportHTML += '<html>';
    ReportHTML += '     <head><title>' + pReportTitle + '</title><link href="/Content/CSS/fontawesome5/css/all.css" rel="stylesheet" /><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /> <style>@media print{@page {size: landscape}}</style></head>';
    ReportHTML += '         <body style="background-color:white;">';
    //    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
    //    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';


    //    ReportHTML += '                     <div>&nbsp;</div>';
    ReportHTML += '                         ' + pTableHTML + '';
   // ReportHTML += '             <div style="color:#613c67;font-size: large;font-weight: bold;" class="col-xs-12"><b> <span class="	fas fa-house-damage"></span>&nbsp;Warehouse :</b> ' + $('#slWarehouses option:selected').text() + '</div><hr>';
   // ReportHTML += '             <div style="color:#613c67;font-size: large;font-weight: bold;" class="col-xs-12"><b>Area :</b> ' + $('#slArea option:selected').text() + '</div>';
   // ReportHTML += '             <div style="color:#613c67;font-size: large;font-weight: bold;" class="col-xs-12"><b>Empty Location :</b> ' + '<span class="fa fa-times" style=" color: #613c67;font-size: xx-small;"></span>' + '</div>';
   // ReportHTML += '             <div style="color:#613c67;font-size: large;font-weight: bold;" class="col-xs-12"><b>Used Location&nbsp;&nbsp; :</b> ' + '<span class="fas fa-car" style=" color: white;background-color: #613c67;font-size: xx-small;"></span>' + '</div>';
    ReportHTML += '         </body>';
    //ReportHTML += '     <footer class="footer col-xs-12 hidden-print" style="width:100%; position:absolute; bottom:0;">';

    //ReportHTML += '     </footer>';

    ReportHTML += '</html>';
    if (pOutputTo == "PrintInReportBody")
        $("#ReportBody").html(ReportHTML);
    else {
        //var mywindow = window.open('', '_blank');
        //mywindow.document.write(ReportHTML);
        //mywindow.document.close();



        if (typeof IsUpdate !== "undefined" && IsUpdate == true)
        {

            return ReportHTML;
        }
        if (IsNull(IsUpdate, null) == null)
        {
            if (inx == 0 || inx % 2 == 0) {
                ReportHTML = ('<div  class="row"><div id= "divArea_' + index + '" class="col-sm-6" style="overflow:scroll;height:300px;">' + ReportHTML + " </div>");
                //   $('#ReportSectionHeader').html($('#ReportSectionHeader').html() + ReportHTML);


            }
            else {
                ReportHTML = ('<div id= "divArea_' + index + '" class="col-sm-6" style="overflow:scroll;height:300px;">' + ReportHTML + " </div></div> ");
                // $('#ReportSectionHeader').html($('#ReportSectionHeader').html() + ReportHTML);
            }

            AreaLocationsChartHTML = AreaLocationsChartHTML + ReportHTML;
           
        }


       
       // $('#ReportSectionHeader').html();

     




    }


}










function GetAreaFromWarehouse()
{
    //$('#redips-drag').html('');
    //Fill_SelectInput_WithDependedID("/api/AreaLocationsChart/GetAreaFromWarehouse", "ID", "Name", "select Area Name", "#slArea", '', $('#slWarehouses').val());
}





function AreaLocationsChart_GetFilterWhereClause() {
    debugger;
    var _WhereClause = "WHERE 1=1" + "\n";
    if ($("#txtChassisNumber").val().trim() != "")
        _WhereClause += "AND ChassisNumber=N'" + $("#txtChassisNumber").val().trim().toUpperCase() + "'" + "\n";
    if ($("#txtDispatchNumber").val().trim() != "")
        _WhereClause += "AND DispatchNumber=N'" + $("#txtDispatchNumber").val().trim().toUpperCase() + "'" + "\n";
    if ($("#txtOperationNumber").val().trim() != "")
        _WhereClause += "AND OperationCodeSerial=N'" + $("#txtOperationNumber").val().trim().toUpperCase() + "'" + "\n";
    if ($("#slCustomer").val() != "")
        _WhereClause += "AND CustomerID=" + $("#slCustomer").val() + " \n";

    if ($("#cbIsVehicleTracking").prop("checked")) {
        if ($("#txtDocNumber").val().trim() != "")
            _WhereClause += "AND (CodeSerial=N'" + $("#txtDocNumber").val().trim().toUpperCase() + "')" + "\n";
        if ($("#txtFromActionDate").val().trim() != "")
            _WhereClause += "AND ActionDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromActionDate").val().trim()) + "'" + " \n";
        if ($("#txtToActionDate").val().trim() != "")
            _WhereClause += "AND ActionDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToActionDate").val().trim()) + " 23:59:59'" + " \n";
        if ($("#slVehicleActionType").val() != "")
            _WhereClause += "AND VehicleActionID=" + $("#slVehicleActionType").val() + " \n";
    }
    if ($("#cbIsVehicleCharge").prop("checked")) {
        if ($("#txtDocNumber").val().trim() != "")
            _WhereClause += "AND (ReceiveDoc=N'" + $("#txtDocNumber").val().trim().toUpperCase() + "' OR PickupDoc=N'" + $("#txtDocNumber").val().trim().toUpperCase() + "')" + "\n";
        if ($("#txtFromReceiveDate").val().trim() != "")
            _WhereClause += "AND ReceiveDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromReceiveDate").val().trim()) + "'" + " \n";
        if ($("#txtToReceiveDate").val().trim() != "")
            _WhereClause += "AND ReceiveDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToReceiveDate").val().trim()) + " 23:59:59'" + " \n";
        if ($("#txtFromPickupDate").val().trim() != "")
            _WhereClause += "AND PickupFinalizeDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromPickupDate").val().trim()) + "'" + " \n";
        if ($("#txtToPickupDate").val().trim() != "")
            _WhereClause += "AND PickupFinalizeDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToPickupDate").val().trim()) + " 23:59:59'" + " \n";
    }
    return _WhereClause;
}
function AreaLocationsChart_DrawReport_Rotated(pData, NoOfColumns , pOutputTo) {
    debugger;
    $('#redips-drag').html('');
    var pReportRows = pData; // JSON.parse(pData[1]);
    var pReportTitle = " Area Locations Chart ";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";
    var _NumberOfColumns = NoOfColumns; //parseInt(pData[2]);
    //var _NumberOfColumns = 15;
    console.log("_NumberOfColumns " + _NumberOfColumns);
    pTableHTML += '<h4> <span class="fas fa-map-marked-alt">&nbsp;<span>' + pReportRows[0].AreaName + '&nbsp; <button   type="button" class="btn btn-warning btn-sm active" onclick="ReturnToMainChart();"><i class="fas fa-chevron-circle-left"></i></button></h3>';

    pTableHTML += '                         <table id="tblAreaLocationsChart" class="  print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
    //----------------------------------------------------------- table header ---------------------------------------------------------------------
    pTableHTML += '                             <thead>';
    pTableHTML += '                                 <tr class="" style="">';
    pTableHTML += '<th style="vertical-align: middle;text-align: center;border: solid 1px black;"></th>';                                   
    for (var i = 1; i <= _NumberOfColumns; i++)
    {
        pTableHTML += '        <th style="font-size: x-small;border: solid 1px black;">'+i+'</th>';
    }
    pTableHTML += '                                 </tr>';
    pTableHTML += '                             </thead>';
    //---------------------------------------------------------------------------------------------------------------------------------
    pTableHTML += '                             <tbody>';
    $.each((pReportRows), function (i, item)
    {
        
        if (i == 0)
        {
            pTableHTML += '                                         <tr style="">';
            pTableHTML += '                                         <td style="font-size: x-small;font-weight: bold;vertical-align: middle;text-align: center;border: solid 1px black;">' + item.RowName + '</td>';
        }
        else if (item.RowID != pReportRows[i - 1].RowID)
        {
            pTableHTML += '                                         </tr>';
            pTableHTML += '                                         <tr style="">';
            pTableHTML += '                                         <td style="font-size: x-small;font-weight: bold;vertical-align: middle;text-align: center;border: solid 1px black;">' + item.RowName + '</td>';
        }
       // else
       // {
        if (item.IsUsed != true)                                     ////PurchaseItemName //PaintType  //ChassisNumber //EngineNumber //ReceiveDate
        {
            if (item.StatusID == 30)
                pTableHTML += '                                         <td class="IsNotActive" tag="' + item.ID + '" ID="C' + item.ID +'"  style="background-color: red;border: solid 1px black;">' + '<span class="fa fa-times" style="  color: white;font-size: xxx-small;">' + '' + '</span>' + '</td>';
            else
                pTableHTML += '                                         <td class="IsActive" tag="' + item.ID + '" ID="C' + item.ID +'" style="border: solid 1px black;">' + '<span class="" style=" color: white;font-size: xxx-small;">' + '' + '</span>' + '</td>';


        }


        else {
            //pTableHTML += '                                         <td aria-label="' + _data + '"  data-microtip-position="top" role="tooltip" style="background-color: #613c67;">' + '<span class="fa fa-truck" style=" color:white;font-size: xxx-small;"></span>' + '</td>';
            pTableHTML += '                                         <td Type="' + item.PurchaseItemName + '" Color="' + item.PaintType + '" ChassisNumber="' + item.ChassisNumber + '" EngineNumber="' + item.EngineNumber + '" ReceiveDate="' + GetDateFromServer(item.ReceiveDate) + ' ' + GetTimeFromServer(item.ReceiveDate) + '"    class="mytooltip"   style="background-color: #61B329;vertical-align: middle;text-align: center;border: solid 1px black;">' + '<span class="fas fa-car" style=" color:white;font-size: xxx-small;">' + '' + '</span>' + '</td>';
        }
          //  }
      //  }

        if (i == pReportRows.length - 1)
        {
            pTableHTML += '                                         </tr>';
        }
        
    });
    pTableHTML += '                             </tbody>';
    pTableHTML += '                         </table>';

        var ReportHTML = '';
        ReportHTML += '<html>';
    ReportHTML += '     <head><title>' + pReportTitle + '</title><link href="/Content/CSS/fontawesome5/css/all.css" rel="stylesheet" /><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /> <style>@media print{@page {size: landscape}}</style></head>';
        ReportHTML += '         <body style="background-color:white;">';
    //    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
    //    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        
    //    ReportHTML += '                     <div>&nbsp;</div>';
    ReportHTML += '                         ' + pTableHTML + '';
   // ReportHTML += '             <div style="color:#613c67;font-size: large;font-weight: bold;" class="col-xs-12"><b> <span class="	fas fa-house-damage"></span>&nbsp;Warehouse :</b> ' + $('#slWarehouses option:selected').text() + '</div><hr>';
  //  ReportHTML += '             <div style="color:#613c67;font-size: large;font-weight: bold;" class="col-xs-12"><b>Area :</b> ' + $('#slArea option:selected').text() + '</div>';
  //  ReportHTML += '             <div style="color:#613c67;font-size: large;font-weight: bold;" class="col-xs-12"><b>Empty Location :</b> ' + '<span class="fa fa-times" style=" color: #613c67;font-size: xx-small;"></span>' + '</div>';
  //  ReportHTML += '             <div style="color:#613c67;font-size: large;font-weight: bold;" class="col-xs-12"><b>Used Location&nbsp;&nbsp; :</b> ' + '<span class="fas fa-car" style=" color: white;background-color: #613c67;font-size: xx-small;"></span>' + '</div>'; 
        ReportHTML += '         </body>';
    //ReportHTML += '     <footer class="footer col-xs-12 hidden-print" style="width:100%; position:absolute; bottom:0;">';
        
    //    ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        if (pOutputTo == "PrintInReportBody")
            $("#ReportBody").html(ReportHTML);
        else {
            //var mywindow = window.open('', '_blank');
            //mywindow.document.write(ReportHTML);
            //mywindow.document.close();
            $('#redips-drag').html(ReportHTML);

            $('#redips-drag .mytooltip').each(function (i, item) {
                //var _data = 'Type : ' + item.PurchaseItemName + ' ';
                //_data += 'Color : ' + item.PaintType + ' ';
                //_data += 'ChassisNumber : ' + item.ChassisNumber + ' ';
                //_data += 'EngineNumber : ' + item.EngineNumber + ' ';
                //_data += 'ReceiveDate : ' + GetDateFromServer(item.ReceiveDate) + ' ';
                $(item).tooltipster({
                    trigger: 'custom',
                    triggerOpen: {
                        click: true
                    },
                    triggerClose: {
                        click: true
                    },
                    interactive: true,
                    contentAsHTML: true,
                    content: $('<b> <span class="fas fa-car-side" style="font-weight: bold;"></span> &nbsp; Type : ' + $(this).attr('Type') + '</b></br>'
                        + '<b> <span class="fa fa-paint-brush" style="font-weight: bold;"></span> &nbsp; Color : ' + $(this).attr('Color') + '</b></br>'
                        + '<b> <span class="fa fa-barcode" style="font-weight: bold;"></span> &nbsp; ChassisNumber : ' + $(this).attr('ChassisNumber') + '</b></br>'
                        + '<b> <span class="fa fa-ticket" style="font-weight: bold;"></span> &nbsp; EngineNumber : ' + $(this).attr('EngineNumber') + '</b></br>'
                        + '<b> <span class="fas fa-clock" style="font-weight: bold;"></span> &nbsp; ReceiveDate : ' + $(this).attr('ReceiveDate') + '</b></br>'
                        
                        )
                });







            });

            //$('#redips-drag .IsActive').each(function (i, item) {
            //    $(item).tooltipster({
            //        trigger: 'custom',
            //        triggerOpen: {
            //            click: true
            //        },
            //        triggerClose: {
            //            click: true
            //        },
            //        interactive: true,
            //        contentAsHTML: true,
            //        content: $('<div style="z-index:1000!important;"><b> <span class="" style="font-weight: bold;"></span> &nbsp;<button   type="button" style="z-index:1000;background-color:red;color:white;" class="btn  btn-sm active" onclick="SetAsNotActive(' + $(this).attr('tag') + ')"><i class="fa fa-times"></i> &nbsp; Set as In-Active</button> </br></div>'
            //        )
            //    });

            //    //<button   type="button" class="btn btn-warning btn-sm active" onclick="PrintAreaLocationsChartWithIndex(' + index + ', ' + pmaxcount+')"><i class="fas fa-binoculars"></i></button>
            //});

            //$('#redips-drag .IsNotActive').each(function (i, item) {
            //    $(item).tooltipster({
            //        trigger: 'custom',
            //        triggerOpen: {
            //            click: true
            //        },
            //        triggerClose: {
            //            click: true
            //        },
            //        interactive: true,
            //        contentAsHTML: true,
            //        content: $('<b> <span class="" style="font-weight: bold;"></span> &nbsp;<button   type="button" style="background-color:#61B329;color:white;" class="btn  btn-sm active" onclick="SetAsActive(' + $(this).attr('tag') + ')"><i class="	fa fa-check-circle"> Set as Active</i></button> </br>'
            //        )
            //    });

            //    //<button   type="button" class="btn btn-warning btn-sm active" onclick="PrintAreaLocationsChartWithIndex(' + index + ', ' + pmaxcount+')"><i class="fas fa-binoculars"></i></button>
            //});



            //$(ArrIsActive).each(function (i, item) {
            //    SetAsActive(item);

            //});

            //$(ArrIsNotActive).each(function (i, item) {
            //    SetAsNotActive(item);

            //});

        }
    

}

