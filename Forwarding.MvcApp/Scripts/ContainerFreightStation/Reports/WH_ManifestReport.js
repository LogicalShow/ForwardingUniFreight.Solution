function WH_ManifestReportInit() {
    //debugger;
    //FadePageCover(true);

    //CallGETFunctionWithParameters("/api/WH_ManifestReport/LoadData", null
    //    , function (pData) {

    //        debugger;
    //        var pOperations = pData[1];
    //        FillListFromObject(null, 1, TranslateString("SelectFromMenu"), "slOperationSearch", pOperations, function () { $("#slOperation").html($("#slOperationSearch").html()); });

    //    }
    //    , function () { FadePageCover(false); $("#hl-menu-ContainerFreightStation").parent().addClass("active"); });
}

function GetOperationRoadNumber() {
    debugger;
    var pWhereClause = "";
    if ($("#slOperationSearch").val() != "") {
        pWhereClause += " Where RoutingTypeID = 30 and OperationID =" + $("#slOperationSearch").val() + "";

        var pParametersWithValues = {
            pWhereClause: pWhereClause ,
            pOperationID: $("#slOperationSearch").val()
        };
        CallGETFunctionWithParameters("/api/WH_ManifestReport/GetOperationRoadNumber"
            , pParametersWithValues
            , function (data) {
                if (data[0]) {//pRecordsExist
                    debugger;
                    $("#txtRoutingRoadNumber").val(data[1]);
                }
                else
                    swal(strSorry, "Please, Connection Error While Getting Road Number");
                FadePageCover(false);
            });
    }
    else {
        swal(strSorry, "Please, Select Operation First ");
    }
}

function SaveRoadNumber() {
    debugger;
    var strRoadNumber = "";
    var strWhereClause = "";

    strRoadNumber = $("#txtRoutingRoadNumber").val();

    if ($("#slOperationSearch").val() != "") {
        strWhereClause += " Where RoutingTypeID = 30 and OperationID =" + $("#slOperationSearch").val() + "";

        var pParametersWithValues = {
            pRoadNumber: strRoadNumber,
            pWhereClause: strWhereClause,
            pOperationID: $("#slOperationSearch").val()
        };
        CallGETFunctionWithParameters("/api/WH_ManifestReport/SaveRoadNumber"
            , pParametersWithValues
            , function (data) {
                if (data[0]) {
                    debugger;
                    swal("succes", "Road Number Saved Succesfully.");
                }
                else
                    swal(strSorry, "Sorry, Connection Error While Saving Road Number");
                FadePageCover(false);
            }
            , null);
    }
    else {
        swal(strSorry, "Please, Select Operation First ");
    }
}

if (pDefaults.UnEditableCompanyName == "UNF") {
    $("#btn-printsticker").removeClass("hide");
}

function ManifestReport_Print(pOutputTo) {
    debugger;
    if ($("#slOperationSearch").val() != "") {
        FadePageCover(true);
        var pOperationID = $("#slOperationSearch").val()
        var pParametersWithValues = {
            pOperationID: pOperationID
        };
        CallGETFunctionWithParameters("/api/WH_ManifestReport/PrintManifest"
            , pParametersWithValues
            , function (data) {
                if (data[0]) {//pRecordsExist
                    ManifestReport_DrawReport(data, 240);
                }
                else
                    swal(strSorry, "Please, Refresh then try again and if the problem persists try another search criteria.");
                FadePageCover(false);
            });
        //}
    }
    else
        swal(strSorry, "Please, Select Operation First ");
}

function Manifeststicker_Print(pOutputTo) {
    debugger;
    if ($("#slOperationSearch").val() != "") {
        FadePageCover(false);
        var OPID = $("#slOperationSearch").val()
        //var pParametersWithValues = {
        //    pOperationID: pOperationID
        //};
        //CallGETFunctionWithParameters("/api/WH_ManifestReport/PrintManifest"
        //    , pParametersWithValues
        //    , function (data) {
        //        if (data[0]) {//pRecordsExist
        //            debugger;
        //            var pRecordsExist = data[0];
        //            var pRoutings = JSON.parse(data[1]);
        //            var pOperationHeader = JSON.parse(data[2]);
        //            var pHouses = JSON.parse(data[3]);
        //            var pContainersAndPackages = JSON.parse(data[4]);


        //            var mywindow = window.open('', '_blank');
        //            var ReportHTML = '';
        //            ReportHTML += '<html>';
        //            ReportHTML += `     <head>
        //            <title>Manifeststicker</title>
        //               <style>
        //                @media print {
        //                  .house {
        //                    page-break-before: always;
        //                  }
        //                }
        //              </style>
        //            </head>`;

        //            ReportHTML += '         <body style="background-color:white;">';

        //            for (var Num = 0 ; Num < pHouses.length ; Num++){
        //                ReportHTML += '             <div class="house" style="display:flex;align-items:center;justify-content:center;padding-top:150px;">'
        //                ReportHTML += '             <div class="" style="display:flex;align-items:flex-end;justify-content:center;flex-direction:column;width:100%;font-size:45px;font-weight:700;margin-bottom:80px;">'

        //                ReportHTML += '       <div class="" style="display:flex;justify-content:flex-end;align-items:center;width:100%;">'
        //                ReportHTML += '         <p style="margin-right:13px;text-align:end;margin:5px;">' + (pOperationHeader.BranchName == 0 ? "" : pOperationHeader.BranchName) + '</p>';
        //                ReportHTML += '         <p style="width:50 %;text-align:end;margin:15px;">' + ' : اسم الفرع ' + '</p>';
        //                ReportHTML += '        </div > ';
        //                ReportHTML += '       <div class="" style="display:flex;justify-content:flex-end;align-items:center;width:100%;">'
        //                ReportHTML += '         <p style="margin-right:13px;text-align:end;margin:5px;">' + (pHouses[0].RoadNumber == 0 ? "0" : pHouses[0].RoadNumber) + '</p>';
        //                ReportHTML += '         <p style="width:50 %;text-align:end;margin:15px;">' + ' : رقم الطريق' + '</p>';
        //                ReportHTML += '        </div > ';
        //                ReportHTML += '       <div class="" style="display:flex;justify-content:flex-end;align-items:center;width:100%;">'
        //                ReportHTML += '         <p style="margin-right:13px;text-align:end;margin:5px;">' + (pOperationHeader.VesselName == 0 ? "" : pOperationHeader.VesselName) + '</p>';
        //                ReportHTML += '          <p style="width:50 %;text-align:end;margin:15px;">' + ' : اسم الباخرة ' + '</p>';
        //                ReportHTML += '        </div > ';
        //                ReportHTML += '       <div class="" style="display:flex;justify-content:flex-end;align-items:center;width:100%;">'
        //                ReportHTML += '         <p style="margin-right:13px;text-align:end;margin:5px;">' + (pHouses[Num].HouseNumber == 0 ? "" : pHouses[Num].HouseNumber) + '</p>';
        //                ReportHTML += '          <p style="text-align:end;margin:15px 15px 15px 0;">' + ' : رقم البوليصة ' + '</p>';
        //                ReportHTML += '        </div > ';

        //                ReportHTML += '       <div class="" style="display:flex;justify-content:flex-end;align-items:center;width:100%;">'
        //                ReportHTML += '         <p style="margin-right:13px;text-align:end;margin:5px;">' + (pOperationHeader.Code == 0 ? "" : pOperationHeader.Code) + '</p>';
        //                ReportHTML += '          <p style="width:50 %;text-align:end;margin:15px;">' + ' : رقم العملية ' + '</p>';
        //                ReportHTML += '        </div > ';

        //                ReportHTML += '       <div class="" style="display:flex;justify-content:flex-end;align-items:center;width:100%;">'
        //                ReportHTML += '         <p style="margin-right:13px;text-align:end;margin:5px;">' + (pHouses[Num].NumberOfPackages == 0 ? "0" : pHouses[Num].NumberOfPackages) + '</p>';
        //                ReportHTML += '          <p style="width:50 %;text-align:end;margin:15px;">' + ' : عدد الطرود ' + '</p>';
        //                ReportHTML += '        </div > ';




        //                ReportHTML += '            </div > ';
        //                ReportHTML += '            </div > ';
        //            }

        //            ReportHTML += '         </body>';


        //            ReportHTML += '</html>';
        //            mywindow.document.write(ReportHTML);
        //            mywindow.document.close();



        //        }
        //        else
        //            swal(strSorry, "Please, Refresh then try again and if the problem persists try another search criteria.");
        //        FadePageCover(false);
        //    });
        ////}

            debugger;
            var arr_Keys = new Array();
            var arr_Values = new Array();


            arr_Keys.push("OPID");
            arr_Values.push(OPID);
            ReportName = "Manifeststicker";

            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , pTitle: ReportName
                , pReportName: ReportName
            };

            var win = window.open("", "_blank");
       
        var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"'
                + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
                + '&arr_Values=' + pParametersWithValues.arr_Values + ''
                + '&pReportName=' + pParametersWithValues.pReportName + ''


            win.location = url;







        




    }
    else
        swal(strSorry, "Please, Select Operation First ");
}

function ManifestReport_DrawReport(data, pDocumentTypeID) {
    debugger;
    var pRecordsExist = data[0];
    var pRoutings = JSON.parse(data[1]);
    var pOperationHeader = JSON.parse(data[2]);
    var pHouses = JSON.parse(data[3]);
    var pContainersAndPackages = JSON.parse(data[4]);


    //var pDescriptionOfGoodsOnContainers = "";
    //$.each(JSON.parse(pOperationContainersAndPackages), function (i, item) {
    //    pDescriptionOfGoodsOnContainers += (item.DescriptionOfGoods == 0 ? "" : (item.DescriptionOfGoods + " "));
    //});
    //if ($("#hDefaultUnEditableCompanyName").val() == "DSE" || $("#hDefaultUnEditableCompanyName").val() == "DSC") {
    var mywindow = window.open('', '_blank');
    var ReportHTML = '';
    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
    ReportHTML += '<html>';
    ReportHTML += '     <head><title>' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.TableOrViewName").text() + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body style="background-color:white;">';
    if ($("#hDefaultUnEditableCompanyName").val() == "GLS") {

        //if ($('#ChForConsignee2' + $('#slDocsOutOperations').val() + '').prop('checked') || (pHouses.length>0? (pHouses[0].ConsigneeName != 0):false))
        //{
        var counter = 0;
        for (counter = 0; counter < 2; counter++) {
            if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ShowHeader input[type=checkbox]").prop("checked")) {
                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3><b>' + ' CARGO MANIFEST ' + '</b></h3></div>';
            }
            else //header not printed so leave place for header on the original company paper
                ReportHTML += '             <div class="col-xs-12 text-center text-ul"></br></br><h3><b>' + ' CARGO MANIFEST ' + '</b></h3></div>';

            var TotalWeight = 0
            $.each(pHouses, function (i, item) {
                if (item.GrossWeightSum > 0)
                    TotalWeight += item.GrossWeightSum
            });

            ReportHTML += '             <div class="row col-xs-12"><div class="col-xs-2">MBL NO</div>';
            ReportHTML += '             <div class="col-xs-10">' + (pOperationHeader.MasterBL == 0 ? "" : pOperationHeader.MasterBL) + '</div></div>';
            ReportHTML += '             <div class="row col-xs-12"><div class="col-xs-2">POL</div>';
            ReportHTML += '             <div class="col-xs-10">' + pOperationHeader.POLName + '</div></div>';
            ReportHTML += '             <div class="row col-xs-12"><div class="col-xs-2">POD</div>';
            ReportHTML += '             <div class="col-xs-10">' + pOperationHeader.PODName + '</div></div>';
            ReportHTML += '             <div class="row col-xs-12"><div class="col-xs-2">Road No.</div>';
            ReportHTML += '             <div class="col-xs-10">' + pRoutings[0].RoadNumber + '</div></div>';
            ReportHTML += '             <div class="row col-xs-12"><div class="col-xs-2">Date</div>';
            ReportHTML += '             <div class="col-xs-10">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ExpectedArrival)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ExpectedArrival)) : "") + '</div></div>';
            ReportHTML += '             <div class="row col-xs-12"><div class="col-xs-2">Vessel</div>';
            ReportHTML += '             <div class="col-xs-10">' + (pOperationHeader.VesselName == 0 ? "" : pOperationHeader.VesselName) + '</div></div>';
            ReportHTML += '             <div class="row col-xs-12"><div class="col-xs-2">Seal Number</div>';
            ReportHTML += '             <div class="col-xs-10">' + (pContainersAndPackages[0].CarrierSeal == 0 ? "" : pContainersAndPackages[0].CarrierSeal) + '</div></div>';
            //ReportHTML += '             <div class="row col-xs-12"><div class="col-xs-2">SEAL NO</div>';
            //ReportHTML += '             <div class="col-xs-10">asd</div></div>';
            ReportHTML += '             <div class="row col-xs-12"><div class="col-xs-2">Containers NO</div>';
            ReportHTML += '             <div class="col-xs-10">' + (pOperationHeader.ContainerNumbers == 0 ? "" : pOperationHeader.ContainerNumbers) + '</div></div>';
            ReportHTML += '             <div class="row col-xs-12"><div class="col-xs-2">Total Weight</div>';
            ReportHTML += '             <div class="col-xs-10">' + TotalWeight + ' KGS</div></div>';
            ReportHTML += '             <div class="row col-xs-12"><div class="col-xs-2">Total Pcs</div>';
            //ReportHTML += '             <div class="col-xs-10">' + (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.PackageTypesOnContainersTotals == 0 ? "" : pOperationHeader.PackageTypesOnContainersTotals) : pOperationHeader.PackageTypes) + (pOperationHeader.ContainerTypes == 0 ? "" : (" - " + pOperationHeader.ContainerTypes)) + '</div></div>';
            ReportHTML += '             <div class="col-xs-10">' + (pOperationHeader.NumberOfPackages == 0 ? '' : pOperationHeader.NumberOfPackages) + ' x ' + (pOperationHeader.PackageTypeName == 0 ? "" : pOperationHeader.PackageTypeName) + (pOperationHeader.ContainerTypes == 0 ? "" : (" - " + pOperationHeader.ContainerTypes)) + '</div></div>';


            ReportHTML += '                         <table id="tblHouses" class="table table-striped text-sm  table-bordered" style="border:solid #000 !Important;">';  //table-hover
            ReportHTML += '                                 <tr class="" style="">';
            ReportHTML += '                                     <td>' + '<b>HBL No.</b>' + '</td>';
            ReportHTML += '                                     <td>' + '<b>CNEE' + '</b></td>';
            ReportHTML += '                                     <td>' + '<b>PCS' + '</b></td>';
            ReportHTML += '                                     <td>' + '<b>Desc Of Goods' + '</b></td>';
            ReportHTML += '                                     <td>' + '<b>GROSS WEIGHT' + '</b></td>';
            ReportHTML += '                                     <td>' + '<b>VOLUME' + '</b></td>';
            ReportHTML += '                                 </tr>';
            $.each(pHouses, function (i, item) {

                ReportHTML += '                                     <tr class="" style="font-size:95%;">';
                if (counter == 0) {
                    ReportHTML += '                                         <td> ' + (item.HouseNumber == 0 ? '' : item.HouseNumber) + '</td>';
                    ReportHTML += '                                         <td>' + (item.ConsigneeName == 0 ? '' : item.ConsigneeName) + '</td>';
                    ReportHTML += '                                         <td>' + (item.NumberOfPackages == 0 ? '' : item.NumberOfPackages) + ' x ' + (item.PackageTypeName == 0 ? '' : item.PackageTypeName) + '</td>';
                    ReportHTML += '                                         <td>' + (item.DescriptionOfGoods == 0 ? '' : item.DescriptionOfGoods.replace(/\n/g, "<br/>")) + '</td>';
                    ReportHTML += '                                         <td>' + (item.GrossWeightSum + ' KGS') + '</td>';
                    ReportHTML += '                                         <td>' + (item.VolumeSum + ' CBM') + '</td>';

                }
                else {
                    if ($('#ChForConsignee2' + pHouses[i].ID + '').prop('checked')) {
                        ReportHTML += '                                         <td> ' + (item.HouseNumber == 0 ? '' : item.HouseNumber) + '</td>';
                        ReportHTML += '                                         <td>' + (item.ConsigneeName == 0 ? '' : item.ConsigneeName) + '</td>';
                        ReportHTML += '                                         <td>' + (item.NumberOfPackages == 0 ? '' : item.NumberOfPackages) + ' x ' + (item.PackageTypeName == 0 ? '' : item.PackageTypeName) + '</td>';
                        ReportHTML += '                                         <td>' + (item.DescriptionOfGoods == 0 ? '' : item.DescriptionOfGoods.replace(/\n/g, "<br/>")) + '</td>';
                        ReportHTML += '                                         <td>' + (item.GrossWeightSum + ' KGS') + '</td>';
                        ReportHTML += '                                         <td>' + (item.VolumeSum + ' CBM') + '</td>';
                    }
                    else {
                        ReportHTML += '                                         <td> ' + (item.HouseNumber == 0 ? '' : item.HouseNumber) + '</td>';
                        ReportHTML += '                                         <td>' + (item.Consignee2Name == 0 ? '' : item.Consignee2Name) + '</td>';
                        ReportHTML += '                                         <td>' + (item.NumberOfPackages == 0 ? '' : item.NumberOfPackages) + ' x ' + (item.PackageTypeName == 0 ? '' : item.PackageTypeName) + '</td>';
                        ReportHTML += '                                         <td>' + (item.DescriptionOfGoods == 0 ? '' : item.DescriptionOfGoods.replace(/\n/g, "<br/>")) + '</td>';
                        ReportHTML += '                                         <td>' + (item.GrossWeightSum + ' KGS') + '</td>';
                        ReportHTML += '                                         <td>' + (item.VolumeSum + ' CBM') + '</td>';
                    }

                }
                ReportHTML += '                                     </tr>';
            });
            ReportHTML += '                         </table>';

            ReportHTML += '         <div class="break"></div>';
        }
    } //if ($("#hDefaultUnEditableCompanyName").val() == "GLS")
    else //other companies
    {

        //if ($('#ChForConsignee2' + $('#slDocsOutOperations').val() + '').prop('checked') || (pHouses.length > 0 ? (pHouses[0].ConsigneeName != 0) : false)) {
        var counter = 0;
        for (counter = 0; counter < 1; counter++) {// for (counter = 0; counter < 2; counter++) { updated by nour 09052022 to print data one time only
            if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ShowHeader input[type=checkbox]").prop("checked")) {
                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3><b>' + ' CARGO MANIFEST ' + '</b></h3></div>';
            }
            else //header not printed so leave place for header on the original company paper
                ReportHTML += '             <div class="col-xs-12 text-center text-ul"></br></br><h3><b>' + ' CARGO MANIFEST ' + '</b></h3></div>';
            if ($("#hDefaultUnEditableCompanyName").val() == "DSE" || $("#hDefaultUnEditableCompanyName").val() == "DSC")
                ReportHTML += '             <div class="col-xs-12"><b>Ref. </b>' + (pOperationHeader.Reference == 0 ? '' : pOperationHeader.Reference) + '</div>';
            ReportHTML += '                         <table id="tblManifestHeader" class="table table-striped text-sm  table-bordered" style="border:solid #000 !Important;">';  //table-hover
            ReportHTML += '                                 <tr class="" style="">';
            if (pDefaults.UnEditableCompanyName == "UNF")
                ReportHTML += '                                     <td><b>' + 'CNTR. NO.' + '</b></td>';
            ReportHTML += '                                     <td><b>' + 'MASTER B/L' + '</b></td>';
            ReportHTML += '                                     <td><b>' + 'VESSEL NAME' + '</b></td>';
            ReportHTML += '                                     <td><b>' + 'DATE' + '</b></td>';
            ReportHTML += '                                     <td><b>' + 'ROAD NO.' + '</b></td>';
            ReportHTML += '                                     <td><b>' + 'PLACE OF DISCHARGE' + '</b></td>';
            ReportHTML += '                                     <td><b>' + 'POL' + '</b></td>';
            ReportHTML += '                                     <td><b>' + 'POD' + '</b></td>';
            ReportHTML += '                                     <td><b>' + 'Cont.Type' + '</b></td>';
            ReportHTML += '                                 </tr>';
            ReportHTML += '                                 <tr class="" style="">';
            if (pDefaults.UnEditableCompanyName == "UNF")
                ReportHTML += '                                     <td>' + (pContainersAndPackages[0].ContainerNumber == 0 ? "" : pContainersAndPackages[0].ContainerNumber) + '</td>';
            ReportHTML += '                                     <td>' + (pOperationHeader.MasterBL == 0 ? "" : pOperationHeader.MasterBL) + '</td>';
            ReportHTML += '                                     <td>' + (pOperationHeader.VesselName == 0 ? "" : pOperationHeader.VesselName) + '</td>';
            ReportHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ExpectedArrival)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ExpectedArrival)) : "") + '</td>';
            if (pDefaults.UnEditableCompanyName == "UNF" ||pDefaults.UnEditableCompanyName == "MES") {
                ReportHTML += '                                     <td>' + pHouses[0].RoadNumber + '</td>';
            } else {
                ReportHTML += '                                     <td>' + pRoutings[0].RoadNumber + '</td>';
            }
            ReportHTML += '                                     <td>' + pOperationHeader.PODName + '</td>';
            ReportHTML += '                                     <td>' + pOperationHeader.POLName + '</td>';
            ReportHTML += '                                     <td>' + (pOperationHeader.DeliveryCityName == 0 ? pOperationHeader.PODName : pOperationHeader.DeliveryCityName) + '</td>';
            ReportHTML += '                                     <td>' + (pOperationHeader.ContainerTypes == 0 ? "" : pOperationHeader.ContainerTypes) + '</td>';
            ReportHTML += '                                 </tr>';
            ReportHTML += '                         </table>';

            ReportHTML += '                         <table id="tblHouses" class="table table-striped text-sm  table-bordered" style="border:solid #000 !Important;">';  //table-hover
            ReportHTML += '                                 <tr class="" style="">';
            ReportHTML += '                                     <td style="text-align:left;">' + '<b>1-SHIPPER<br>2-CONSIGNEE<br>3-NOTIFY PARTY' + '</b></td>';
            ReportHTML += '                                     <td>' + '<b>DESCRIPTION OF GOODS</b>' + '</td>';
            ReportHTML += '                                     <td>' + '<b>WEIGHT <br>&<br> CBM' + '</b></td>';
            if (pDefaults.UnEditableCompanyName == "UNF")
                ReportHTML += '                                     <td>' + '<b>POL' + '</b></td>';
            else
                ReportHTML += '                                     <td>' + '<b>CNTR NO. <br>&<br> POL' + '</b></td>';
            ReportHTML += '                                 </tr>';
            $.each(pHouses, function (i, item) {

                ReportHTML += '                                     <tr class="" style="font-size:95%;">';
                if (counter == 0) {
                    ReportHTML += '                                         <td style="text-align:left;">'
                                                                            + '<b>HBL:</b> ' + (item.HouseNumber == 0 ? '' : item.HouseNumber)
                                                                            + '<b><br>SHPR:</b> ' + (item.ShipperName == 0 ? '' : item.ShipperName)
                                                                            + '<b><br>CNEE:</b> ' + (item.ConsigneeName == 0 ? '' : item.ConsigneeName)
                                                                            + '<b><br>NOTIFY:</b> ' + (item.Notify1Name == 0 ? 'SAME AS CONSIGNEE' : item.Notify1Name)
                                                                        + '</td>';
                }
                else {
                    if ($('#ChForConsignee2' + pHouses[i].ID + '').prop('checked')) {
                        ReportHTML += '                                         <td style="text-align:left;">'
                                                                          + '<b>HBL:</b> ' + (item.HouseNumber == 0 ? '' : item.HouseNumber)
                                                                          + '<b><br>SHPR:</b> ' + (item.ShipperName == 0 ? '' : item.ShipperName)
                                                                          + '<b><br>CNEE:</b> ' + (item.ConsigneeName == 0 ? '' : item.ConsigneeName)
                                                                          + '<b><br>NOTIFY:</b> ' + (item.Notify1Name == 0 ? 'SAME AS CONSIGNEE' : item.Notify1Name)
                                                                      + '</td>';
                    }
                    else {
                        ReportHTML += '                                         <td style="text-align:left;">'
                                                                            + '<b>HBL:</b> ' + (item.HouseNumber == 0 ? '' : item.HouseNumber)
                                                                            + '<b><br>SHPR:</b> ' + (item.ShipperName == 0 ? '' : item.ShipperName)
                                                                            + '<b><br>CNEE:</b> ' + (item.Consignee2Name == 0 ? '' : item.Consignee2Name)
                                                                            + '<b><br>NOTIFY:</b> ' + (item.Notify1Name == 0 ? 'SAME AS CONSIGNEE' : item.Notify1Name)
                                                                        + '</td>';
                    }

                }


                //ReportHTML += '                                         <td>' + (pOperationHeader.DirectionType == 1 ? (item.ConsigneeName == 0 ? '' : item.ConsigneeName) : (item.ShipperName == 0 ? '' : item.ShipperName)) + '</td>';
                ReportHTML += '                                         <td>' + (item.DescriptionOfGoods == 0 ? '' : item.DescriptionOfGoods.replace(/\n/g, "<br/>")) + '</td>';
                ReportHTML += '                                         <td>' + (item.GrossWeightSum + ' KGM') + '<br>' + (item.VolumeSum + ' CBM') + '<br>' + (item.NumberOfPackages == 0 ? '' : item.NumberOfPackages + 'x' + item.PackageTypeName) + '</td>';
                ReportHTML += '                                         <td>' + (item.ContainerNumbers == 0 ? '' : item.ContainerNumbers) + '<br>POL: ' + pOperationHeader.POLName + '</td>';
                //ReportHTML += '                                         <td>' + (item.PackageTypes == 0
                //                                                                ? (item.PackageTypesOnContainersTotals == 0 ? "" : item.PackageTypesOnContainersTotals)
                //                                                                : item.PackageTypes) + '</td>';
                ReportHTML += '                                     </tr>';
            });
            ReportHTML += '                         </table>';

            ReportHTML += '                         <table id="tblManifestFooter" class="table table-striped text-sm  table-bordered" style="border:solid #000 !Important;">';  //table-hover
            ReportHTML += '                                 <tr class="" style="">';
            ReportHTML += '                                     <td><b>' + 'Totals :' + '</b></td>';
            ReportHTML += '                                     <td><b>' + 'No. Of Bills : ' + pHouses.length + '</b></td>';
            ReportHTML += '                                     <td><b>' + 'Weight : ' + pOperationHeader.GrossWeightSum + ' KGM' + '</b></td>';
            ReportHTML += '                                     <td><b>' + 'Volume : ' + pOperationHeader.VolumeSum + ' CBM' + '</b></td>';
            ReportHTML += '                                 </tr>';
            ReportHTML += '                         </table>';
            ReportHTML += '         <div class="break"></div>';
        }
    } //else //other companies
    ReportHTML += '         </body>';
    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
    //ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';

    if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
    if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ShowFooter input[type=checkbox]").prop("checked"))
        ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';




    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat() + ' ' + getTime();


    ReportHTML += '             <div class="" style="display: flex;align-items: center;justify-content: space-between;width: 98%;margin: auto;margin-top: 17px;">';

    ReportHTML += '             <div class="">' + 'Printed On :' + TodaysDateddMMyyyy + '</div>';
    ReportHTML += '             <div class="">' + 'Printed By :' + $("#hLoggedUserNameNotLogin").val() + '</div>';
    ReportHTML += '             </div>';
    ReportHTML += '     </footer>';

    ReportHTML += '</html>';
    mywindow.document.write(ReportHTML);
    mywindow.document.close();
}

function GetOperations() {
    debugger;
    FadePageCover(true);
    if ($("#txtSearchText").val() != "") {

        var pWhereClause = " Where ContainerNumber LIKE N'%" + $("#txtSearchText").val().trim().toUpperCase() + "%' ";
        pWhereClause += " or Code LIKE N'%" + $("#txtSearchText").val().trim().toUpperCase() + "%' ";

        var pParametersWithValues = {
            pWhereClause: pWhereClause
        };

        CallGETFunctionWithParameters("/api/WH_ManifestReport/GetOperations"
                , pParametersWithValues
                , function (pData) {
                    if (pData[0] > 0) //pRecordsExist
                    {
                        var pOperations = pData[1];
                        FillListFromObject(null, 1, TranslateString("SelectFromMenu"), "slOperationSearch", pOperations, function () { $("#slOperation").html($("#slOperationSearch").html()); });
                        FadePageCover(false);
                    }
                    else
                        swal(strSorry, "Error getting operations");
                    FadePageCover(false);
                });
    }
    else {
        swal(strSorry, "Please enter container number or operation code first.");
        FadePageCover(false);
    }


}