// This file is containing fns. to handle Generating MAWBs from MasterData/Partners/Airlines
function MAWBStock_BindTableRows(pMAWBStock) {
    debugger;
    ClearAllTableRows("tblMAWBStock");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pMAWBStock, function (i, item) {
        AppendRowtoTable("tblMAWBStock",
        //("<tr ID='" + item.ID + "' ondblclick='MAWBStock_EditByDblClick(" + item.ID + ");'>"
        ("<tr ID='" + item.ID + "'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='AirlineID hide'>" + item.AirlineID + "</td>"
                    + "<td class='AirlineName hide'>" + item.AirlineName + "</td>"
                    + "<td class='MAWBSuffix'>" + (item.MAWBSuffix == 0 ? "" : item.MAWBSuffix) + "</td>"
                    + "<td class='InsertionDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</td>"
                    + "<td class='AssignedToOperationID hide'>" + item.AssignedToOperationID + "</td>"
                    + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='hide'><a href='#MAWBStockModal' data-toggle='modal' onclick='MAWBStock_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblMAWBStock", "ID", "cb-CheckAll-MAWBStock");
    CheckAllCheckbox("HeaderDeletetblMAWBStockID");
    HighlightText("#tblMAWBStock>tbody>tr", $("#txtMAWBStockSearch").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    //MAWBStock_Summary();
}
function MAWBStock_LoadingWithPagingForModal(pID) {//pID = ID and it is the search key which will be used in the where clause
    debugger;
    var tr = $("tr[ID='" + pID + "']");

    strLoadWithPagingFunctionName = "/api/MAWBStock/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "MAWBStock_BindTableRows";
    var pWhereClause = " WHERE AirlineID = " + pID;
    pWhereClause += " AND AssignedToOperationID IS NULL ";
    pWhereClause += ($("#txtMAWBStockSearch").val().trim() == "" && $("#txtMAWBStockSearch").val() == undefined
        ? ""
        : " AND MAWBSuffix LIKE '%" + $("#txtMAWBStockSearch").val().trim() + "%'");
    if ($("#SlSTypeOfStock").val() != "" && $("#SlSTypeOfStock").val() != null)
        pWhereClause += " And TypeOfStockID=" + $("#SlSTypeOfStock").val();
    var pOrderBy = " MAWBSuffix ";
    LoadWithPagingForModal("/api/MAWBStock/LoadWithPaging", pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim(), function (pTabelRows) {
        MAWBStock_BindTableRows(pTabelRows); //TaxeTypes_ClearAllControls();
    });

}
//to reset function names as in mainapp.master
function MAWBStock_ResetFunctionsNames() {
    strLoadWithPagingFunctionName = "/api/Airlines/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "Airlines_BindTableRows";
}
function MAWBStock_Delete() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblMAWBStock') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        //callback function in case of pressing "Yes, delete"
        function () {
            DeleteListFunction("/api/MAWBStock/Delete", { "pMAWBStockIDs": GetAllSelectedIDsAsString('tblMAWBStock') }, function () {
                //MAWBStock_LoadAll($("#hAirlineID").val());
                MAWBStock_LoadingWithPagingForModal($("#hAirlineID").val());
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function MAWBStock_ClearAllControls() {
    debugger;
    ClearAll("#MAWBStockModal", null);

    $("#lblMAWBStockShown").html($("#lblShown").html());

    $("#cbIsAddByEndNumber").prop("checked", true);
    $("#cbIsAddByAmount").prop("checked", false);
    MAWBStock_AddByChanged(); //to set the MAWBStockControls

    //$("#btnSaveMAWBStock").attr("onclick", "MAWBStock_Insert(false);");
    //$("#btnSaveandNewMAWBStock").attr("onclick", "MAWBStock_Insert(true);");

    $("#btnGenerateMAWBStock").attr("onclick", "MAWBStock_GenerateMAWBStock();");
}
function MAWBStock_AddByChanged() {
    if ($("#cbIsAddByEndNumber").prop("checked")) { //Add by End Number
        $("#txtMAWBStockAmount").attr("disabled", "disabled");
        $("#txtEndNumber").removeAttr("disabled");
    }
    else { //Add by Amount
        $("#txtEndNumber").attr("disabled", "disabled");
        $("#txtMAWBStockAmount").removeAttr("disabled");
    }
}

function MAWBStock_LimitsChanged() { //Add by End Number
    if ($("#cbIsAddByEndNumber").prop("checked")) {
        if ($("#txtStartNumber").val().length == 7 && $("#txtEndNumber").val().length == 7)
            if (parseInt($("#txtStartNumber").val()) <= parseInt($("#txtEndNumber").val()))
                $("#txtMAWBStockAmount").val(parseInt($("#txtEndNumber").val()) - parseInt($("#txtStartNumber").val()) + 1);
    }
    else //Add by Amount
        if ($("#txtStartNumber").val().length == 7 && parseInt($("#txtMAWBStockAmount").val()) > 0) {
            $("#txtEndNumber").val(parseInt($("#txtStartNumber").val()) + parseInt($("#txtMAWBStockAmount").val()) - 1);
            var EndNumberLength = $("#txtEndNumber").val().length;
            if (EndNumberLength < 7) //to handle the case that MAWBs start with zero
                for (x = 0; x < 7 - EndNumberLength; x++)
                    $("#txtEndNumber").val("0" + $("#txtEndNumber").val());
        }
}
function MAWBStock_GenerateMAWBStock() {
    debugger;
    if ($("#slTypeOfStock").val() == 0)
        swal(strSorry, 'select type of stock');
    else
        if ($("#txtStartNumber").val().length != 7 || $("#txtEndNumber").val().length != 7)
            //swal(strSorry, 'The Start and End Numbers must be 8 digits.'); //this line is from separated Venus version
            swal(strSorry, 'The Start and End Numbers must be 7 digits.');
        else
            if (parseInt($("#txtEndNumber").val()) < parseInt($("#txtStartNumber").val()))
                swal(strSorry, 'The Start Number must be smaller than the End number.');
            else
                if (parseInt($("#txtMAWBStockAmount").val()) > maxMAWBGeneratedTogether)
                    swal(strSorry, 'You can not generate more than ' + maxMAWBGeneratedTogether.toString() + ' MAWBs at a time.');
                else
                    if (parseInt($("#txtStartNumber").val()) == 0)
                        swal(strSorry, 'The BL number can not be 00000000.');
                    else //Correct Limits
                        CallGETFunctionWithParameters("/api/MAWBStock/GenerateMAWBStock", { pAirlineID: $("#hAirlineID").val(), pStartNumber: $("#txtStartNumber").val(), pEndNumber: $("#txtEndNumber").val(), pAmount: $("#txtMAWBStockAmount").val(), pTypeOfStockID: $("#slTypeOfStock").val() }
                            , function (pMAWBSuffix) { //pMAWBSuffix is empty string if OK and holds MAWBSuffix if exists)
                                if (pMAWBSuffix == "") {
                                    MAWBStock_LoadingWithPagingForModal($("#hAirlineID").val());
                                    jQuery("#MAWBStockModal").modal('hide');
                                }
                                else
                                    swal(strSorry, "MAWB '" + pMAWBSuffix + "' either exists or used before for this airline.");
                            });
}
//function MAWBStock_Summary() {
//    var NumberOfMAWBs = document.getElementById("tblMAWBStock").getElementsByTagName("tr").length - 1;
//    $("#lblTotalNumberOfMAWBs").html(": " + NumberOfMAWBs.toString());
//}
//By A.Medra
function MAWBStock_Print() {
    debugger;
    if ($("#All").prop("checked")) {
        //var pWhereClause = " WHERE AirlineID = " + pID;
        //pWhereClause += " AND AssignedToOperationID IS NULL ";
        var pWhereClause = ($("#txtMAWBStockSearch").val().trim() == "" && $("#txtMAWBStockSearch").val() == undefined
            ? ""
            : " WHERE AirWayBills LIKE '%" + $("#txtMAWBStockSearch").val().trim() + "%'");
        if ($("#SlSTypeOfStock").val() != "")
            pWhereClause += " And TypeOfStockID=" + $("#SlSTypeOfStock").val();

        pWhereClause += " And AirlineID=" + $("#hAirlineID").val();
        //pWhereClause += " and UnUsedNull IS NOT NULL ";
        var pOrderBy = " MAWBSuffix ";


        var pParametersWithValues = {
            pWhereClausePrintMAWBStock: pWhereClause
        };


        CallGETFunctionWithParameters("/api/MAWBStock/PrintMAWBStock", pParametersWithValues
           , function (pData) {
               console.log(JSON.parse(pData[0]));

               var UsedUnusedStock = JSON.parse(pData[0])
               var mywindow = window.open('', '_blank');
               var ReportHTML = '';
               console.log("moooosalah");

               var NumUsed = 0;
               var NumUnused = 0;
               debugger;
               //for (var i = 0; i < UsedUnusedStock.length; i++) {
               //    if (UsedUnusedStock.UnUsedNull == 0)
               //        NumUnused += 1;
               //    else
               //        NumUsed += 1;
               //}

               $.each(UsedUnusedStock, function (i, item) {
                   if (item.UnUsedNull == 0)
                       NumUnused += 1;
                   else
                       NumUsed += 1;
               })


               if (UsedUnusedStock.length > 1) {
                   ReportHTML += '<html>';
                   ReportHTML += '     <head><title>AirLine Stock</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                   ReportHTML += '         <body style="background-color:white;">';
                   ////////
                   ReportHTML += '             <div class="col-xs-12  text-center m-t-n"><u><h3><b><i>AirLine Stock </i></b></h3></u></div>';
                   //ReportHTML += '             <hr width="10%" style="height: 2px;background: black;border: 0;"/>';
                   ReportHTML += '                 <div class="row m-l-md">';
                   ReportHTML += '             <div class="col-xs-9 " style="font-size: 15px;  font-weight: bold;">';
                   ReportHTML += '                 AirLine Code :' + UsedUnusedStock[0].AirlinePrefix + ' ';
                   ReportHTML += '             </div>';
                   ReportHTML += '             <div class="col-xs-3 "  style="font-size: 15px;  font-weight: bold;">';
                   ReportHTML += '                 ALL : ' + UsedUnusedStock.length + ' ';
                   ReportHTML += '             </div>';
                   ReportHTML += '             </div>';
                   ReportHTML += '             <div class="row m-l-md" style="font-size: 15px;  font-weight: bold;">';
                   ReportHTML += '             <div class="col-xs-9 "  style="font-size: 15px;  font-weight: bold;">';
                   ReportHTML += '                 Type Of Stock : ' + UsedUnusedStock[0].TypeOfStock + ' ';
                   ReportHTML += '             </div>';

                   ReportHTML += '             <div class="col-xs-3">';
                   ReportHTML += '                 Used : ' + NumUsed + ' ';
                   ReportHTML += '             </div>';
                   ReportHTML += '             </div>';
                   ReportHTML += '             <div class="row m-l-md" style="font-size: 15px;  font-weight: bold;">';
                   ReportHTML += '             <div class="col-xs-9 ">';
                   ReportHTML += '             </div>';
                   ReportHTML += '             <div class="col-xs-3 ">';
                   ReportHTML += '                 Unused : ' + NumUnused + ' ';
                   ReportHTML += '             </div>';
                   ReportHTML += '             </div>';
                   //ReportHTML += '             <div class="col-xs-12  m-t-n"><h3><b><i> AIRLINE :' + UsedUnusedStock[0].AirlinePrefix + ' TYPE OF STOCK :' + UsedUnusedStock[0].TypeOfStock + '</i></b></h3></div>';

                   ReportHTML += '                 <div class="col-xs-12">';
                   ReportHTML += '                     <table id="tblContainers" class="table table-striped text-sm  table-bordered" style="border:solid #000 !Important;">';  //table-hover
                   ReportHTML += '                         <tr class="" style="">';
                   ReportHTML += '                             <td>' + '<b> AirWayBill</b></td>';
                   ReportHTML += '                             <td>' + '<b>Operation' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Air Departure' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Air Destination' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Flight No' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Date' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Shipper' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>GrossWeight' + '</b></td>';

                   ReportHTML += '                         </tr>';

                   var AirWayBills1 = '';
                   var operationCode1 = '';
                   var AirDprt1 = '';
                   var AirDst1 = '';
                   var FlightNo1 = '';
                   var BLDate1 = '';
                   var ShipperName1 = '';
                   var GrossWeight1 = '';
                   //$.each(pContainers, function (j, item) {
                   debugger;
                   $.each(UsedUnusedStock, function (i, item) {
                       //if (i > 0)
                       ReportHTML += '                     <tr class="" style="">';
                       if (item.AirWayBills != 0)
                           ReportHTML += '                         <td>' + item.AirWayBills + '</td>';
                       else
                           ReportHTML += '                         <td>' + AirWayBills1 + '</td>';

                       if (item.operationCode != 0)
                           ReportHTML += '                         <td>' + item.operationCode + '</td>';
                       else
                           ReportHTML += '                         <td>' + operationCode1 + '</td>';

                       if (item.AirDprt != 0)
                           ReportHTML += '                         <td>' + item.AirDprt + '</td>';
                       else
                           ReportHTML += '                         <td>' + AirDprt1 + '</td>';

                       if (item.AirDst != 0)
                           ReportHTML += '                         <td>' + item.AirDst + '</td>';
                       else
                           ReportHTML += '                         <td>' + AirDst1 + '</td>';

                       if (item.FlightNo != 0)
                           ReportHTML += '                         <td>' + item.FlightNo + '</td>';
                       else
                           ReportHTML += '                         <td>' + FlightNo1 + '</td>';

                       if (GetDateWithFormatMDY(item.BLDate) != '1/1/1900')
                           ReportHTML += '                         <td>' + GetDateWithFormatMDY(item.BLDate) + '</td>';
                       else
                           ReportHTML += '                         <td>' + BLDate1 + '</td>';

                       if (item.ShipperName != 0)
                           ReportHTML += '                         <td>' + item.ShipperName + '</td>';
                       else
                           ReportHTML += '                         <td>' + ShipperName1 + '</td>';

                       if (item.GrossWeight != 0)
                           ReportHTML += '                         <td>' + item.GrossWeight + '</td>';
                       else
                           ReportHTML += '                         <td>' + GrossWeight1 + '</td>';

                       //ReportHTML += '                         <td>' + item.operationCode + '</td>';
                       //ReportHTML += '                         <td>' + item.AirDprt + '</td>';
                       //ReportHTML += '                         <td>' + item.AirDst + '</td>';
                       //ReportHTML += '                         <td>' + item.FlightNo + '</td>';
                       //ReportHTML += '                         <td>' + GetDateWithFormatMDY(item.BLDate) + '</td>';
                       //ReportHTML += '                         <td>' + item.ShipperName + '</td>';
                       //ReportHTML += '                         <td>' + item.GrossWeight + '</td>';
                       ReportHTML += '                     </tr>';
                   });
                   ////////

                   ReportHTML += '                     </table>';

                   ReportHTML += '                     </div>';
                   ReportHTML += '         </body>';

                   ReportHTML += '</html>';
                   mywindow.document.write(ReportHTML);
                   mywindow.document.close();
               }
               else {
                   ReportHTML += '<html>';
                   ReportHTML += '     <head><title>AirLine Stock</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                   ReportHTML += '         <body style="background-color:white;">';
                   ////////
                   ReportHTML += '             <div class="col-xs-12  text-center m-t-n"><h3><b><i>AirLine Stock </i></b></h3></div>';
                   ReportHTML += '                 <div class="row m-l-md">';
                   ReportHTML += '             <div class="col-xs-9 ">';
                   ReportHTML += '                 AirLine Code : ' + UsedUnusedStock[0].AirlinePrefix + ' ';
                   ReportHTML += '             </div>';
                   ReportHTML += '             <div class="col-xs-3 ">';
                   ReportHTML += '             </div>';
                   ReportHTML += '             </div>';
                   ReportHTML += '             <div class="row m-l-md">';
                   ReportHTML += '             <div class="col-xs-9 ">';
                   ReportHTML += '                 Type Of Stock : ' + UsedUnusedStock[0].TypeOfStock + ' ';
                   ReportHTML += '             </div>';

                   ReportHTML += '             <div class="col-xs-3">';
                   ReportHTML += '             </div>';
                   ReportHTML += '             </div>';
                   //ReportHTML += '             <div class="col-xs-12  m-t-n"><h3><b><i> AIRLINE :' + UsedUnusedStock[0].AirlinePrefix + ' TYPE OF STOCK :' + UsedUnusedStock[0].TypeOfStock + '</i></b></h3></div>';

                   ReportHTML += '                 <div class="col-xs-12">';
                   ReportHTML += '                     <table id="tblContainers" class="table table-striped text-sm  table-bordered" style="border:solid #000 !Important;">';  //table-hover
                   ReportHTML += '                         <tr class="" style="">';
                   ReportHTML += '                             <td>' + '<b> AirWayBill</b></td>';
                   ReportHTML += '                             <td>' + '<b>Operation' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Air Departure' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Air Destination' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Flight No' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Date' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Shipper' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>GrossWeight' + '</b></td>';

                   ReportHTML += '                         </tr>';
                   var AirWayBills1 = '';
                   var operationCode1 = '';
                   var AirDprt1 = '';
                   var AirDst1 = '';
                   var FlightNo1 = '';
                   var BLDate1 = '';
                   var ShipperName1 = '';
                   var GrossWeight1 = '';
                   //$.each(pContainers, function (j, item) {
                   $.each(UsedUnusedStock, function (i, item) {
                       //if (i > 0)
                       ReportHTML += '                     <tr class="" style="">';
                       if (item.AirWayBills != 0)
                           ReportHTML += '                         <td>' + item.AirWayBills + '</td>';
                       else
                           ReportHTML += '                         <td>' + AirWayBills1 + '</td>';

                       if (item.operationCode != 0)
                           ReportHTML += '                         <td>' + item.operationCode + '</td>';
                       else
                           ReportHTML += '                         <td>' + operationCode1 + '</td>';

                       if (item.AirDprt != 0)
                           ReportHTML += '                         <td>' + item.AirDprt + '</td>';
                       else
                           ReportHTML += '                         <td>' + AirDprt1 + '</td>';

                       if (item.AirDst != 0)
                           ReportHTML += '                         <td>' + item.AirDst + '</td>';
                       else
                           ReportHTML += '                         <td>' + AirDst1 + '</td>';

                       if (item.FlightNo != 0)
                           ReportHTML += '                         <td>' + item.FlightNo + '</td>';
                       else
                           ReportHTML += '                         <td>' + FlightNo1 + '</td>';

                       if (GetDateWithFormatMDY(item.BLDate) != '1/1/1900')
                           ReportHTML += '                         <td>' + GetDateWithFormatMDY(item.BLDate) + '</td>';
                       else
                           ReportHTML += '                         <td>' + BLDate1 + '</td>';

                       if (item.ShipperName != 0)
                           ReportHTML += '                         <td>' + item.ShipperName + '</td>';
                       else
                           ReportHTML += '                         <td>' + ShipperName1 + '</td>';

                       if (item.GrossWeight != 0)
                           ReportHTML += '                         <td>' + item.GrossWeight + '</td>';
                       else
                           ReportHTML += '                         <td>' + GrossWeight1 + '</td>';

                       ReportHTML += '                     </tr>';
                   });
                   ////////

                   ReportHTML += '                     </table>';

                   ReportHTML += '                     </div>';
                   ReportHTML += '         </body>';

                   ReportHTML += '</html>';
                   mywindow.document.write(ReportHTML);
                   mywindow.document.close();
               }
               FadePageCover(false);
           }
                , null);
    }

    if ($("#Used").prop("checked")) {
        //var pWhereClause = " WHERE AirlineID = " + pID;
        //pWhereClause += " AND AssignedToOperationID IS NULL ";
        var pWhereClause = ($("#txtMAWBStockSearch").val().trim() == "" && $("#txtMAWBStockSearch").val() == undefined
            ? ""
            : " WHERE AirWayBills LIKE '%" + $("#txtMAWBStockSearch").val().trim() + "%'");
        if ($("#SlSTypeOfStock").val() != "")
            pWhereClause += " And TypeOfStockID=" + $("#SlSTypeOfStock").val();
        pWhereClause += " and UnUsedNull IS NOT NULL ";
        pWhereClause += " And AirlineID=" + $("#hAirlineID").val();

        var pOrderBy = " MAWBSuffix ";
        //$("#hAirlineID").val()  AirlineID =

        var pParametersWithValues = {
            pWhereClausePrintMAWBStock: pWhereClause
        };


        CallGETFunctionWithParameters("/api/MAWBStock/PrintMAWBStock", pParametersWithValues
           , function (pData) {
               console.log(JSON.parse(pData[0]));

               var UsedUnusedStock = JSON.parse(pData[0])
               var mywindow = window.open('', '_blank');
               var ReportHTML = '';
               console.log("moooosalah");
               if (UsedUnusedStock.length > 1) {
                   ReportHTML += '<html>';
                   ReportHTML += '     <head><title>AirLine Stock</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                   ReportHTML += '         <body style="background-color:white;">';
                   ////////
                   ReportHTML += '             <div class="col-xs-12  text-center m-t-n"><h3><b><i>AirLine Stock </i></b></h3></div>';
                   ReportHTML += '                 <div class="row m-l-md">';
                   ReportHTML += '             <div class="col-xs-9 ">';
                   ReportHTML += '                 AirLine Code : ' + UsedUnusedStock[0].AirlinePrefix + ' ';
                   ReportHTML += '             </div>';
                   ReportHTML += '             <div class="col-xs-3 ">';
                   ReportHTML += '                 Used : ' + UsedUnusedStock.length + ' ';
                   ReportHTML += '             </div>';
                   ReportHTML += '             </div>';
                   ReportHTML += '             <div class="row m-l-md">';
                   ReportHTML += '             <div class="col-xs-9 ">';
                   ReportHTML += '                 Type Of Stock : ' + UsedUnusedStock[0].TypeOfStock + ' ';
                   ReportHTML += '             </div>';
                   ReportHTML += '             </div>';
                   //ReportHTML += '             <div class="col-xs-12  m-t-n"><h3><b><i> AIRLINE :' + UsedUnusedStock[0].AirlinePrefix + ' TYPE OF STOCK :' + UsedUnusedStock[0].TypeOfStock + '</i></b></h3></div>';

                   ReportHTML += '                 <div class="col-xs-12">';
                   ReportHTML += '                     <table id="tblContainers" class="table table-striped text-sm  table-bordered" style="border:solid #000 !Important;">';  //table-hover
                   ReportHTML += '                         <tr class="" style="">';
                   ReportHTML += '                             <td>' + '<b> AirWayBill</b></td>';
                   ReportHTML += '                             <td>' + '<b>Operation' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Air Departure' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Air Destination' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Flight No' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Date' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Shipper' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>GrossWeight' + '</b></td>';

                   ReportHTML += '                         </tr>';
                   var AirWayBills1 = '';
                   var operationCode1 = '';
                   var AirDprt1 = '';
                   var AirDst1 = '';
                   var FlightNo1 = '';
                   var BLDate1 = '';
                   var ShipperName1 = '';
                   var GrossWeight1 = '';
                   //$.each(pContainers, function (j, item) {
                   $.each(UsedUnusedStock, function (i, item) {
                       //if (i > 0)
                       ReportHTML += '                     <tr class="" style="">';
                       if (item.AirWayBills != 0)
                           ReportHTML += '                         <td>' + item.AirWayBills + '</td>';
                       else
                           ReportHTML += '                         <td>' + AirWayBills1 + '</td>';

                       if (item.operationCode != 0)
                           ReportHTML += '                         <td>' + item.operationCode + '</td>';
                       else
                           ReportHTML += '                         <td>' + operationCode1 + '</td>';

                       if (item.AirDprt != 0)
                           ReportHTML += '                         <td>' + item.AirDprt + '</td>';
                       else
                           ReportHTML += '                         <td>' + AirDprt1 + '</td>';

                       if (item.AirDst != 0)
                           ReportHTML += '                         <td>' + item.AirDst + '</td>';
                       else
                           ReportHTML += '                         <td>' + AirDst1 + '</td>';

                       if (item.FlightNo != 0)
                           ReportHTML += '                         <td>' + item.FlightNo + '</td>';
                       else
                           ReportHTML += '                         <td>' + FlightNo1 + '</td>';

                       if (GetDateWithFormatMDY(item.BLDate) != '1/1/1900')
                           ReportHTML += '                         <td>' + GetDateWithFormatMDY(item.BLDate) + '</td>';
                       else
                           ReportHTML += '                         <td>' + BLDate1 + '</td>';

                       if (item.ShipperName != 0)
                           ReportHTML += '                         <td>' + item.ShipperName + '</td>';
                       else
                           ReportHTML += '                         <td>' + ShipperName1 + '</td>';

                       if (item.GrossWeight != 0)
                           ReportHTML += '                         <td>' + item.GrossWeight + '</td>';
                       else
                           ReportHTML += '                         <td>' + GrossWeight1 + '</td>';
                       ReportHTML += '                     </tr>';
                   });
                   ////////

                   ReportHTML += '                     </table>';

                   ReportHTML += '                     </div>';
                   ReportHTML += '         </body>';

                   ReportHTML += '</html>';
                   mywindow.document.write(ReportHTML);
                   mywindow.document.close();
               }
               else {
                   ReportHTML += '<html>';
                   ReportHTML += '     <head><title>AirLine Stock</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                   ReportHTML += '         <body style="background-color:white;">';
                   ////////
                   ReportHTML += '             <div class="col-xs-12  text-center m-t-n"><h3><b><i>AirLine Stock </i></b></h3></div>';
                   ReportHTML += '                 <div class="row m-l-md">';
                   ReportHTML += '             <div class="col-xs-9 ">';
                   ReportHTML += '                 AirLine Code : ' + UsedUnusedStock[0].AirlinePrefix + ' ';
                   ReportHTML += '             </div>';
                   ReportHTML += '             <div class="col-xs-3 ">';
                   ReportHTML += '             </div>';
                   ReportHTML += '             </div>';
                   ReportHTML += '             <div class="row m-l-md">';
                   ReportHTML += '             <div class="col-xs-9 ">';
                   ReportHTML += '                 Type Of Stock : ' + UsedUnusedStock[0].TypeOfStock + ' ';
                   ReportHTML += '             </div>';
                   ReportHTML += '             </div>';
                   //ReportHTML += '             <div class="col-xs-12  m-t-n"><h3><b><i> AIRLINE :' + UsedUnusedStock[0].AirlinePrefix + ' TYPE OF STOCK :' + UsedUnusedStock[0].TypeOfStock + '</i></b></h3></div>';

                   ReportHTML += '                 <div class="col-xs-12">';
                   ReportHTML += '                     <table id="tblContainers" class="table table-striped text-sm  table-bordered" style="border:solid #000 !Important;">';  //table-hover
                   ReportHTML += '                         <tr class="" style="">';
                   ReportHTML += '                             <td>' + '<b> AirWayBill</b></td>';
                   ReportHTML += '                             <td>' + '<b>Operation' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Air Departure' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Air Destination' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Flight No' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Date' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Shipper' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>GrossWeight' + '</b></td>';

                   ReportHTML += '                         </tr>';
                   var AirWayBills1 = '';
                   var operationCode1 = '';
                   var AirDprt1 = '';
                   var AirDst1 = '';
                   var FlightNo1 = '';
                   var BLDate1 = '';
                   var ShipperName1 = '';
                   var GrossWeight1 = '';
                   //$.each(pContainers, function (j, item) {
                   $.each(UsedUnusedStock, function (i, item) {
                       //if (i > 0)
                       ReportHTML += '                     <tr class="" style="">';
                       //ReportHTML += '                         <td>' + item.AirWayBills + '</td>';
                       //ReportHTML += '                         <td>' + item.operationCode + '</td>';
                       //ReportHTML += '                         <td>' + item.AirDprt + '</td>';
                       //ReportHTML += '                         <td>' + item.AirDst + '</td>';
                       //ReportHTML += '                         <td>' + item.FlightNo + '</td>';
                       //ReportHTML += '                         <td>' + GetDateWithFormatMDY(item.BLDate) + '</td>';
                       //ReportHTML += '                         <td>' + item.ShipperName + '</td>';
                       //ReportHTML += '                         <td>' + item.GrossWeight + '</td>';
                       if (item.AirWayBills != 0)
                           ReportHTML += '                         <td>' + item.AirWayBills + '</td>';
                       else
                           ReportHTML += '                         <td>' + AirWayBills1 + '</td>';

                       if (item.operationCode != 0)
                           ReportHTML += '                         <td>' + item.operationCode + '</td>';
                       else
                           ReportHTML += '                         <td>' + operationCode1 + '</td>';

                       if (item.AirDprt != 0)
                           ReportHTML += '                         <td>' + item.AirDprt + '</td>';
                       else
                           ReportHTML += '                         <td>' + AirDprt1 + '</td>';

                       if (item.AirDst != 0)
                           ReportHTML += '                         <td>' + item.AirDst + '</td>';
                       else
                           ReportHTML += '                         <td>' + AirDst1 + '</td>';

                       if (item.FlightNo != 0)
                           ReportHTML += '                         <td>' + item.FlightNo + '</td>';
                       else
                           ReportHTML += '                         <td>' + FlightNo1 + '</td>';

                       if (GetDateWithFormatMDY(item.BLDate) != '1/1/1900')
                           ReportHTML += '                         <td>' + GetDateWithFormatMDY(item.BLDate) + '</td>';
                       else
                           ReportHTML += '                         <td>' + BLDate1 + '</td>';

                       if (item.ShipperName != 0)
                           ReportHTML += '                         <td>' + item.ShipperName + '</td>';
                       else
                           ReportHTML += '                         <td>' + ShipperName1 + '</td>';

                       if (item.GrossWeight != 0)
                           ReportHTML += '                         <td>' + item.GrossWeight + '</td>';
                       else
                           ReportHTML += '                         <td>' + GrossWeight1 + '</td>';

                       ReportHTML += '                     </tr>';
                   });
                   ////////

                   ReportHTML += '                     </table>';

                   ReportHTML += '                     </div>';
                   ReportHTML += '         </body>';

                   ReportHTML += '</html>';
                   mywindow.document.write(ReportHTML);
                   mywindow.document.close();
               }
               FadePageCover(false);
           }
                , null);

    }

    //if ($("#Unused").prop("checked")) {
    if ($("#Unused").prop("checked")) {
        //var pWhereClause = " WHERE AirlineID = " + pID;
        //pWhereClause += " AND AssignedToOperationID IS NULL ";
        var pWhereClause = ($("#txtMAWBStockSearch").val().trim() == "" && $("#txtMAWBStockSearch").val() == undefined
            ? ""
            : " WHERE AirWayBills LIKE '%" + $("#txtMAWBStockSearch").val().trim() + "%'");
        if ($("#SlSTypeOfStock").val() != "")
            pWhereClause += " And TypeOfStockID=" + $("#SlSTypeOfStock").val();
        pWhereClause += " and UnUsedNull IS  NULL ";

        pWhereClause += " And AirlineID=" + $("#hAirlineID").val();
        var pOrderBy = " MAWBSuffix ";


        var pParametersWithValues = {
            pWhereClausePrintMAWBStock: pWhereClause
        };


        CallGETFunctionWithParameters("/api/MAWBStock/PrintMAWBStock", pParametersWithValues
           , function (pData) {
               console.log(JSON.parse(pData[0]));

               var UsedUnusedStock = JSON.parse(pData[0])
               var mywindow = window.open('', '_blank');
               var ReportHTML = '';
               console.log("moooosalah");
               if (UsedUnusedStock.length > 1) {
                   ReportHTML += '<html>';
                   ReportHTML += '     <head><title>AirLine Stock</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                   ReportHTML += '         <body style="background-color:white;">';
                   ////////
                   ReportHTML += '             <div class="col-xs-12  text-center m-t-n"><h3><b><i>AirLine Stock </i></b></h3></div>';

                   ReportHTML += '                 <div class="row m-l-md">';
                   ReportHTML += '             <div class="col-xs-9 ">';
                   ReportHTML += '                 AirLine Code : ' + UsedUnusedStock[0].AirlinePrefix + ' ';
                   ReportHTML += '             </div>';
                   ReportHTML += '             <div class="col-xs-3 ">';
                   ReportHTML += '                 Unused : ' + UsedUnusedStock.length + ' ';
                   ReportHTML += '             </div>';
                   ReportHTML += '             </div>';
                   ReportHTML += '             <div class="row m-l-md">';
                   ReportHTML += '             <div class="col-xs-9 ">';
                   ReportHTML += '                 Type Of Stock : ' + UsedUnusedStock[0].TypeOfStock + ' ';
                   ReportHTML += '             </div>';
                   ReportHTML += '             </div>';
                   //ReportHTML += '             <div class="col-xs-12  m-t-n"><h3><b><i> AIRLINE :' + UsedUnusedStock[0].AirlinePrefix + ' TYPE OF STOCK :' + UsedUnusedStock[0].TypeOfStock + '</i></b></h3></div>';

                   ReportHTML += '                 <div class="col-xs-12">';
                   ReportHTML += '                     <table id="tblContainers" class="table table-striped text-sm  table-bordered" style="border:solid #000 !Important;">';  //table-hover
                   ReportHTML += '                         <tr class="" style="">';
                   ReportHTML += '                             <td>' + '<b> AirWayBill</b></td>';
                   ReportHTML += '                             <td>' + '<b>Operation' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Air Departure' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Air Destination' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Flight No' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Date' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Shipper' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>GrossWeight' + '</b></td>';

                   ReportHTML += '                         </tr>';
                   var AirWayBills1 = '';
                   var operationCode1 = '';
                   var AirDprt1 = '';
                   var AirDst1 = '';
                   var FlightNo1 = '';
                   var BLDate1 = '';
                   var ShipperName1 = '';
                   var GrossWeight1 = '';
                   //$.each(pContainers, function (j, item) {
                   $.each(UsedUnusedStock, function (i, item) {
                       //if (i > 0)
                       ReportHTML += '                     <tr class="" style="">';
                       if (item.AirWayBills != 0)
                           ReportHTML += '                         <td>' + item.AirWayBills + '</td>';
                       else
                           ReportHTML += '                         <td>' + AirWayBills1 + '</td>';

                       if (item.operationCode != 0)
                           ReportHTML += '                         <td>' + item.operationCode + '</td>';
                       else
                           ReportHTML += '                         <td>' + operationCode1 + '</td>';

                       if (item.AirDprt != 0)
                           ReportHTML += '                         <td>' + item.AirDprt + '</td>';
                       else
                           ReportHTML += '                         <td>' + AirDprt1 + '</td>';

                       if (item.AirDst != 0)
                           ReportHTML += '                         <td>' + item.AirDst + '</td>';
                       else
                           ReportHTML += '                         <td>' + AirDst1 + '</td>';

                       if (item.FlightNo != 0)
                           ReportHTML += '                         <td>' + item.FlightNo + '</td>';
                       else
                           ReportHTML += '                         <td>' + FlightNo1 + '</td>';

                       if (GetDateWithFormatMDY(item.BLDate) != '1/1/1900')
                           ReportHTML += '                         <td>' + GetDateWithFormatMDY(item.BLDate) + '</td>';
                       else
                           ReportHTML += '                         <td>' + BLDate1 + '</td>';

                       if (item.ShipperName != 0)
                           ReportHTML += '                         <td>' + item.ShipperName + '</td>';
                       else
                           ReportHTML += '                         <td>' + ShipperName1 + '</td>';

                       if (item.GrossWeight != 0)
                           ReportHTML += '                         <td>' + item.GrossWeight + '</td>';
                       else
                           ReportHTML += '                         <td>' + GrossWeight1 + '</td>';
                       ReportHTML += '                     </tr>';
                   });
                   ////////

                   ReportHTML += '                     </table>';

                   ReportHTML += '                     </div>';
                   ReportHTML += '         </body>';

                   ReportHTML += '</html>';
                   mywindow.document.write(ReportHTML);
                   mywindow.document.close();
               }
               else {
                   ReportHTML += '<html>';
                   ReportHTML += '     <head><title>AirLine Stock</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                   ReportHTML += '         <body style="background-color:white;">';
                   ////////
                   ReportHTML += '             <div class="col-xs-12  text-center m-t-n"><h3><b><i>AirLine Stock </i></b></h3></div>';

                   ReportHTML += '                 <div class="row m-l-md">';
                   ReportHTML += '             <div class="col-xs-9 ">';
                   ReportHTML += '                 AirLine Code : ' + UsedUnusedStock[0].AirlinePrefix + ' ';
                   ReportHTML += '             </div>';
                   ReportHTML += '             <div class="col-xs-3 ">';
                   ReportHTML += '             </div>';
                   ReportHTML += '             </div>';
                   ReportHTML += '             <div class="row m-l-md">';
                   ReportHTML += '             <div class="col-xs-9 ">';
                   ReportHTML += '                 Type Of Stock : ' + UsedUnusedStock[0].TypeOfStock + ' ';
                   ReportHTML += '             </div>';
                   ReportHTML += '             </div>';

                   ReportHTML += '                 <div class="col-xs-12">';
                   ReportHTML += '                     <table id="tblContainers" class="table table-striped text-sm  table-bordered" style="border:solid #000 !Important;">';  //table-hover
                   ReportHTML += '                         <tr class="" style="">';
                   ReportHTML += '                             <td>' + '<b> AirWayBill</b></td>';
                   ReportHTML += '                             <td>' + '<b>Operation' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Air Departure' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Air Destination' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Flight No' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Date' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>Shipper' + '</b></td>';
                   ReportHTML += '                             <td>' + '<b>GrossWeight' + '</b></td>';
                   ReportHTML += '                         </tr>';

                   var AirWayBills1 = '';
                   var operationCode1 = '';
                   var AirDprt1 = '';
                   var AirDst1 = '';
                   var FlightNo1 = '';
                   var BLDate1 = '';
                   var ShipperName1 = '';
                   var GrossWeight1 = '';
                   $.each(UsedUnusedStock, function (i, item) {
                       //if (i > 0)
                       ReportHTML += '                     <tr class="" style="">';
                       if (item.AirWayBills != 0)
                           ReportHTML += '                         <td>' + item.AirWayBills + '</td>';
                       else
                           ReportHTML += '                         <td>' + AirWayBills1 + '</td>';

                       if (item.operationCode != 0)
                           ReportHTML += '                         <td>' + item.operationCode + '</td>';
                       else
                           ReportHTML += '                         <td>' + operationCode1 + '</td>';

                       if (item.AirDprt != 0)
                           ReportHTML += '                         <td>' + item.AirDprt + '</td>';
                       else
                           ReportHTML += '                         <td>' + AirDprt1 + '</td>';

                       if (item.AirDst != 0)
                           ReportHTML += '                         <td>' + item.AirDst + '</td>';
                       else
                           ReportHTML += '                         <td>' + AirDst1 + '</td>';

                       if (item.FlightNo != 0)
                           ReportHTML += '                         <td>' + item.FlightNo + '</td>';
                       else
                           ReportHTML += '                         <td>' + FlightNo1 + '</td>';

                       if (GetDateWithFormatMDY(item.BLDate) != '1/1/1900')
                           ReportHTML += '                         <td>' + GetDateWithFormatMDY(item.BLDate) + '</td>';
                       else
                           ReportHTML += '                         <td>' + BLDate1 + '</td>';

                       if (item.ShipperName != 0)
                           ReportHTML += '                         <td>' + item.ShipperName + '</td>';
                       else
                           ReportHTML += '                         <td>' + ShipperName1 + '</td>';

                       if (item.GrossWeight != 0)
                           ReportHTML += '                         <td>' + item.GrossWeight + '</td>';
                       else
                           ReportHTML += '                         <td>' + GrossWeight1 + '</td>';
                       ReportHTML += '                     </tr>';
                   });
                   ////////

                   ReportHTML += '                     </table>';

                   ReportHTML += '                     </div>';
                   ReportHTML += '         </body>';

                   ReportHTML += '</html>';
                   mywindow.document.write(ReportHTML);
                   mywindow.document.close();
               }
               FadePageCover(false);
           }
                , null);
    }


}
