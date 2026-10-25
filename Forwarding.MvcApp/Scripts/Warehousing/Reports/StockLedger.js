function ApplySelectListSearch() {
    debugger;
    $("#slCustomer").css({ "width": "100%" }).select2();
    $("#slCustomer").trigger("change");
    $("#slOwners").css({ "width": "100%" }).select2();
    $("#slOwners").trigger("change");
    $("#slPurchaseItems").css({ "width": "100%" }).select2();
    $("#slPurchaseItems").trigger("change");
    
    $("div[tabindex='-1']").removeAttr('tabindex');
}
var _hasRequest = false;
function StockLedger_Initialize() {
    debugger;
    if (["EF", "FPL"].includes(pDefaults.UnEditableCompanyName))
        _hasRequest = true;
    FadePageCover(true);
    LoadView("/Warehousing/Reports/StockLedger", "div-content", function () {
        FadePageCover(false);
        if (_hasRequest) {
            $('div.DetailsPrint, div.SuppressPrint, div.Customer, #btn-SelectColumns').addClass('hide');
            $('div.Owner').removeClass('hide');
            $('#slOwners').attr('onchange', 'LoadItems();');
            $('#slPurchaseItems').attr('multiple','multiple');
        }
        else {
        if (pDefaults.UnEditableCompanyName == "NIL" || pDefaults.UnEditableCompanyName == "EXP")
            $(".classAddSerialToPalletLbl").text(" PalletID/Serial(Only Details)");
        }

        
        CallGETFunctionWithParameters("/api/StockLedger/GetStatisticsFilter", null
            , function (pData) {
                debugger;
                var pPurchaseItem = pData[0];
                var pOwners = pData[1];
                ////FillListFromObject(null, 2, "All Customers", "slCustomer", data[2], null);
                $("#slCustomer").html($("#hReadySlCustomers").html());
                //FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slNetwork", data[10], null);
                FillListFromObject(null, 9, TranslateString("SelectFromMenu"), "slPurchaseItems", pPurchaseItem, null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slOwners", pOwners, null);
                $("#txtFromDate").val(getTodaysDateInddMMyyyyFormat());
                $("#txtToDate").val(getTodaysDateInddMMyyyyFormat());
            }
            , function () { $("#hl-menu-Warehousing").parent().addClass("active"); ApplySelectListSearch(); });
    });
}
function StockLedger_Print(pOutputTo) {
    debugger;
    if (!_hasRequest && $('#slCustomer').val() == "")
        swal("Sorry", "Please, select customer");
    else if (
        ($("#txtFromDate").val().trim() == "" || isValidDate($("#txtFromDate").val(), 1))
        && ($("#txtToDate").val().trim() == "" || isValidDate($("#txtToDate").val(), 1))
        ) {
        FadePageCover(true);
        //var pWhereClause = StockLedger_GetFilterWhereClause();
        var pParametersWithValues = {
            pFrom: ConvertDateFormat($("#txtFromDate").val().trim())
           , pTo: ConvertDateFormat($("#txtToDate").val().trim())
            , pCustomerID: $('#slCustomer').val() == "" ? 0 : $('#slCustomer').val()
            , pOwnersIDs: IsNull($('#slOwners').val(), '0').toString()
            , pPurchaseItemIDs: IsNull($('#slPurchaseItems').val(), '0').toString()
            , pIsSupressForZero: $("#cbSupressForZero").prop("checked")
            , pHasRequest:_hasRequest
        };
        CallGETFunctionWithParameters("/api/StockLedger/LoadData"
            , pParametersWithValues
            , function (data) {
                StockLedger_DrawReport(data, pOutputTo);
                FadePageCover(false);
            });
        //}
    }
    else
        swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
}
function StockLedger_GetFilterWhereClause() {
    debugger;
    var pWhereClause = "WHERE IsFinalized=1 " + "\n";

    return pWhereClause;
}
function StockLedger_DrawReport(data, pOutputTo) {
    debugger;
    var pReportTitle = " Stock Ledger Report From " + $("#txtFromDate").val().trim() + " To " + $("#txtToDate").val().trim() + "";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();

    if (pOutputTo == "Print") {
        var mywindow = window.open('', '_blank');
    }
    var ReportHTML = '';

    if (_hasRequest) {
        var details = JSON.parse(data[0]);
        var detailsDic = {};
        $.each(details, function (i, item) {
            if (detailsDic[item.PurchaseItemCode]) {
                detailsDic[item.PurchaseItemCode]['ActualQty'] += Number(item.Quantity) ;
                detailsDic[item.PurchaseItemCode]['AllocatedQty'] += item.PalletStatusID == 1 ? Number(item.PDL_DemandedQuantity) : 0;
                detailsDic[item.PurchaseItemCode]['InactiveQty'] += item.PalletStatusID == 2 ? Number(item.Quantity) : 0;
                detailsDic[item.PurchaseItemCode]['DamageQty'] += item.PalletStatusID == 4 ? Number(item.Quantity) : 0;
            }
            else {
                detailsDic[item.PurchaseItemCode] = {
                    PurchaseItemCode: item.PurchaseItemCode,
                    PurchaseItemName: item.PurchaseItemName,
                    ActualQty: Number(item.Quantity),
                    AllocatedQty: item.PalletStatusID == 1 ? Number(item.PDL_DemandedQuantity) : 0,
                    InactiveQty: item.PalletStatusID == 2 ? Number(item.Quantity) : 0,
                    DamageQty: item.PalletStatusID == 4 ? Number(item.Quantity) : 0,
                };
            }
        });
        $.each(details, function (i, item) {
            detailsDic[item.PurchaseItemCode]['AvailableQty'] = detailsDic[item.PurchaseItemCode]['ActualQty'] - detailsDic[item.PurchaseItemCode]['AllocatedQty'] - detailsDic[item.PurchaseItemCode]['InactiveQty'] - detailsDic[item.PurchaseItemCode]['DamageQty'];
            
        });
        ReportHTML += '<html>';
        if (pOutputTo == "Print") {
            ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        }
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 ' + (pDefaults.UnEditableCompanyName == "FPL" ? "" : "text-center") + '"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style="' + (pDefaults.UnEditableCompanyName == "FPL" ? "width:20%;margin-top:1%;" : "") + '"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-12"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
     
        ReportHTML += '             <div class="col-xs-12">';
        ReportHTML += '                         <table id="tblStockLedgerReport" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';
        ReportHTML += '                             <thead>';
        ReportHTML += '                                 <tr class="" style="font-size:95%;">';
        ReportHTML += '                                     <th>Product Code</th>';
        ReportHTML += '                                     <th>Description</th>';
        ReportHTML += '                                     <th>Actual Quantity</th>';
        ReportHTML += '                                     <th>Allocated Quantity</th>';
        ReportHTML += '                                     <th>Damage Quantity</th>';
        ReportHTML += '                                     <th>Inactive Quantity</th>';
        ReportHTML += '                                     <th>Available Quantity</th>';
        ReportHTML += '                                 </tr>';

        ReportHTML += '                             </thead>';
        ReportHTML += '                             <tbody>';

        $.each(detailsDic, function (i, item) {
            ReportHTML += '                                     <tr class="" style="font-size:95%;">';
            ReportHTML += '                                         <td>' + (item.PurchaseItemCode == 0 ? '' : item.PurchaseItemCode) + '</td>';
            ReportHTML += '                                         <td>' + (item.PurchaseItemName == 0 ? '' : item.PurchaseItemName) + '</td>';
            ReportHTML += '                                         <td>' + item.ActualQty + '</td>';
            ReportHTML += '                                         <td>' + item.AllocatedQty + '</td>';
            ReportHTML += '                                         <td>' + item.DamageQty + '</td>';
            ReportHTML += '                                         <td>' + item.InactiveQty + '</td>';
            ReportHTML += '                                         <td>' + item.AvailableQty + '</td>';
            ReportHTML += '                                     </tr>';
        });


        ReportHTML += '                             </tbody>';
        ReportHTML += '                         </table>';
        ReportHTML += '                         </div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';

        if (pOutputTo == "Print") {
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else {
            $('#tblStockLedgerExcel').html($.parseHTML(ReportHTML));
            $("#tblStockLedgerExcel").tblToExcel();
        }
    }
    else {
        var pSummaryRows = JSON.parse(data[0]).sort((a, b) => (a.PurchaseItemCode > b.PurchaseItemCode) ? 1 : -1);
        var pDetailsRows = JSON.parse(data[1]).sort((a, b) => (a.PurchaseItemCode > b.PurchaseItemCode) ? 1 : -1);
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        if ($('#rdSummary').prop('checked')) {

            ReportHTML += '<html>';
            if (pOutputTo == "Print") {
                ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            }
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '             <div class="col-xs-12 ' + (pDefaults.UnEditableCompanyName == "FPL" ? "" : "text-center") + '"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style="' + (pDefaults.UnEditableCompanyName == "FPL" ? "width:20%;margin-top:1%;" : "") + '"/></div> </br>';
            ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

            ReportHTML += '             <div class="col-xs-12"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
            if (pDefaults.UnEditableCompanyName == "DGL")
                ReportHTML += '             <div class="col-xs-12 float-left"><b>Warehouse :</b>DGL Internaional</div>';
            ReportHTML += '             <div class="col-xs-12 float-left"><b>Client : </b> ' + $('#slCustomer  option:selected').text() + '</div>';

            ReportHTML += '             <div class="col-xs-12">';
            ReportHTML += '                         <table id="tblStockLedgerReport" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';
            ReportHTML += '                             <thead>';
            ReportHTML += '                                 <tr class="" style="font-size:95%;">';
            ReportHTML += '                                     <th rowspan="2">S.N</th>';
            ReportHTML += '                                     <th rowspan="2">Product</th>';
            if ($("#cbPartNumber").prop("checked"))
                ReportHTML += '                                     <th rowspan="2">PartNo</th>';
            if ($("#cbHSCode").prop("checked"))
                ReportHTML += '                                     <th rowspan="2">HSCode</th>';
            if ($("#cbProductType").prop("checked"))
                ReportHTML += '                                     <th rowspan="2">ProductType</th>';
            if ($("#cbModelNumber").prop("checked"))
                ReportHTML += '                                     <th rowspan="2">ModelNo</th>';
            if ($("#cbBrandName").prop("checked"))
                ReportHTML += '                                     <th rowspan="2">Brand</th>';
            if ($("#cbGrossWeight").prop("checked"))
                ReportHTML += '                                     <th rowspan="2">G.W.</th>';
            if ($("#cbVolume").prop("checked"))
                ReportHTML += '                                     <th rowspan="2">Vol</th>';
            ReportHTML += '                                     <th rowspan="2">Stock Unit</th>';
            if ($("#cbOpening").prop("checked"))
                ReportHTML += '                                     <th colspan="3">Opening</th>';
            if ($("#cbReceipt").prop("checked"))
                ReportHTML += '                                     <th colspan="3">Receipt</th>';
            if ($("#cbDispatch").prop("checked"))
                ReportHTML += '                                     <th colspan="3">Dispatch</th>';
            if ($("#cbStock").prop("checked"))
                ReportHTML += '                                     <th colspan="3">Stock On Hand</th>';
            ReportHTML += '                                 </tr>';
            ReportHTML += '                                 <tr class="" style="font-size:95%;">';
            if ($("#cbOpening").prop("checked")) {
                ReportHTML += '                                     <th>Qty</th>';
                ReportHTML += '                                     <th>Weight</th>';
                ReportHTML += '                                     <th>Volume</th>';
            }
            if ($("#cbReceipt").prop("checked")) {
                ReportHTML += '                                     <th>Qty</th>';
                ReportHTML += '                                     <th>Weight</th>';
                ReportHTML += '                                     <th>Volume</th>';
            }
            if ($("#cbDispatch").prop("checked")) {
                ReportHTML += '                                     <th>Qty</th>';
                ReportHTML += '                                     <th>Weight</th>';
                ReportHTML += '                                     <th>Volume</th>';
            }
            if ($("#cbStock").prop("checked")) {
                ReportHTML += '                                     <th>Qty</th>';
                ReportHTML += '                                     <th>Weight</th>';
                ReportHTML += '                                     <th>Volume</th>';
            }

            ReportHTML += '                                 </tr>';
            ReportHTML += '                             </thead>';
            ReportHTML += '                             <tbody>';
            var TotalOpeningQty = 0, TotalOpeningWeight = 0, TotalOpeningVolume = 0, TotalReceiptQty = 0, TotalReceiptWeight = 0;
            var TotalDispatchWeight = 0, TotalDispatchVolume = 0, TotalReceiptVolume = 0, TotalDispatchQty = 0;

            $.each(pSummaryRows, function (i, item) {
                TotalOpeningQty += item.OpeningQty;
                TotalOpeningWeight += item.OpeningWeight;
                TotalOpeningVolume += item.OpeningVolume;
                TotalReceiptQty += item.ReceiptQty;
                TotalReceiptWeight += item.ReceiptWeight;
                TotalDispatchWeight += item.DispatchWeight;
                TotalDispatchVolume += item.DispatchVolume;
                TotalReceiptVolume += item.ReceiptVolume;
                TotalDispatchQty += item.DispatchQty;
                var _ProductInfoShown = item.PurchaseItemCode;
                //_ProductInfoShown += $("#cbPartNumber").prop("checked") ? (" (PartNo:" + item.PartNumber + ")") : "";
                //_ProductInfoShown += $("#cbHSCode").prop("checked") ? (" (HSCode:" + item.HSCode + ")") : "";
                //_ProductInfoShown += $("#cbModelNumber").prop("checked") ? (" (ModelNumber:" + item.ModelNumber + ")") : "";
                //_ProductInfoShown += $("#cbBrandName").prop("checked") ? (" (BrandName:" + item.BrandName + ")") : "";
                //_ProductInfoShown += $("#cbProductType").prop("checked") ? (" (ProductType:" + item.ProductType + ")") : "";
                //_ProductInfoShown += $("#cbGrossWeight").prop("checked") ? (" (Weight:" + item.GrossWeight + ")") : "";
                //_ProductInfoShown += $("#cbVolume").prop("checked") ? (" (CBM:" + item.Volume + ")") : "";
                ReportHTML += '                             <tr style="font-size:95%;" class="' + (item.IsDefected ? "text-danger" : "")+'">';
                ReportHTML += '                                 <td>' + (i + 1) + '</td>';
                ReportHTML += '                                 <td>' + item.PurchaseItemCode + '</td>';
                if ($("#cbPartNumber").prop("checked"))
                    ReportHTML += '                                 <td>' + (item.PartNumber == 0 ? "" : item.PartNumber) + '</td>';
                if ($("#cbHSCode").prop("checked"))
                    ReportHTML += '                                 <td>' + (item.HSCode == 0 ? "" : item.HSCode) + '</td>';
                if ($("#cbProductType").prop("checked"))
                    ReportHTML += '                                 <td>' + (item.ProductType == 0 ? "" : item.ProductType) + '</td>';
                if ($("#cbModelNumber").prop("checked"))
                    ReportHTML += '                                 <td>' + (item.ModelNumber == 0 ? "" : item.ModelNumber) + '</td>';
                if ($("#cbBrandName").prop("checked"))
                    ReportHTML += '                                 <td>' + (item.BrandName == 0 ? "" : item.BrandName) + '</td>';
                if ($("#cbGrossWeight").prop("checked"))
                    ReportHTML += '                                 <td>' + (item.GrossWeight == 0 ? "" : item.GrossWeight) + '</td>';
                if ($("#cbVolume").prop("checked"))
                    ReportHTML += '                                 <td>' + (item.cbVolume == 0 ? "" : item.Volume) + '</td>';
                ReportHTML += '                                 <td>' + (item.StockUnit == 0 || item.StockUnit == 0 ? "" : item.StockUnit) + '</td>';
                if ($("#cbOpening").prop("checked")) {
                    ReportHTML += '                                 <td>' + (item.OpeningQty == 0 || item.OpeningQty == 0 ? ".00" : item.OpeningQty.toFixed(2)) + '</td>';
                    ReportHTML += '                                 <td>' + (item.OpeningWeight == 0 || item.OpeningWeight == 0 ? ".00" : parseFloat(item.OpeningWeight).toFixed(2)) + '</td>';
                    ReportHTML += '                                 <td>' + (item.OpeningVolume == 0 || item.OpeningVolume == 0 ? ".00" : parseFloat(item.OpeningVolume).toFixed(2)) + '</td>';
                }
                if ($("#cbReceipt").prop("checked")) {
                    ReportHTML += '                                 <td>' + (item.ReceiptQty == 0 || item.ReceiptQty == 0 ? ".00" : item.ReceiptQty.toFixed(2)) + '</td>';
                    ReportHTML += '                                 <td>' + (item.ReceiptWeight == 0 || item.ReceiptWeight == 0 ? ".00" : item.ReceiptWeight.toFixed(2)) + '</td>';
                    ReportHTML += '                                 <td>' + (item.ReceiptVolume == 0 || item.ReceiptVolume == 0 ? ".00" : item.ReceiptVolume.toFixed(2)) + '</td>';
                }
                if ($("#cbDispatch").prop("checked")) {
                    ReportHTML += '                                 <td>' + (item.DispatchQty == 0 || item.DispatchQty == 0 ? ".00" : parseFloat(item.DispatchQty).toFixed(2)) + '</td>';
                    ReportHTML += '                                 <td>' + (item.DispatchWeight == 0 || item.DispatchWeight == 0 ? ".00" : parseFloat(item.DispatchWeight).toFixed(2)) + '</td>';
                    ReportHTML += '                                 <td>' + (item.DispatchVolume == 0 || item.DispatchVolume == 0 ? ".00" : parseFloat(item.DispatchVolume).toFixed(2)) + '</td>';
                }
                if ($("#cbStock").prop("checked")) {
                    ReportHTML += '                                 <td>' + ((item.OpeningQty + item.ReceiptQty - item.DispatchQty) == 0 ? ".00" : parseFloat((item.OpeningQty + item.ReceiptQty - item.DispatchQty)).toFixed(2)) + '</td>';
                    ReportHTML += '                                 <td>' + ((item.OpeningWeight + item.ReceiptWeight - item.DispatchWeight) == 0 ? ".00" : parseFloat((item.OpeningWeight + item.ReceiptWeight - item.DispatchWeight)).toFixed(2)) + '</td>';
                    ReportHTML += '                                 <td>' + ((item.OpeningVolume + item.ReceiptVolume - item.DispatchVolume) == 0 ? ".00" : parseFloat((item.OpeningVolume + item.ReceiptVolume - item.DispatchVolume)).toFixed(2)) + '</td>';
                }

                ReportHTML += '                             </tr>';
            });
            ReportHTML += '                             <tr style="font-size:95%;">';
            ReportHTML += '                                 <td colspan="3"><b>Client Total :</b></td>';
            if ($("#cbPartNumber").prop("checked"))
                ReportHTML += '                                     <td></td>';
            if ($("#cbHSCode").prop("checked"))
                ReportHTML += '                                     <td></td>';
            if ($("#cbProductType").prop("checked"))
                ReportHTML += '                                     <td></td>';
            if ($("#cbModelNumber").prop("checked"))
                ReportHTML += '                                     <td></td>';
            if ($("#cbBrandName").prop("checked"))
                ReportHTML += '                                     <td></td>';
            if ($("#cbGrossWeight").prop("checked"))
                ReportHTML += '                                     <td></td>';
            if ($("#cbVolume").prop("checked"))
                ReportHTML += '                                     <td></td>';
            if ($("#cbOpening").prop("checked")) {
                ReportHTML += '                                 <td><b>' + (TotalOpeningQty).toFixed(2) + '</b></td>';
                ReportHTML += '                                 <td><b>' + (TotalOpeningWeight).toFixed(2) + '</b></td>';
                ReportHTML += '                                 <td><b>' + (TotalOpeningVolume).toFixed(2) + '</b></td>';
            }
            if ($("#cbReceipt").prop("checked")) {
                ReportHTML += '                                 <td><b>' + (TotalReceiptQty).toFixed(2) + '</b></td>';
                ReportHTML += '                                 <td><b>' + (TotalReceiptWeight.toFixed(2)) + '</b></td>';
                ReportHTML += '                                 <td><b>' + (TotalReceiptVolume).toFixed(2) + '</b></td>';
            }
            if ($("#cbDispatch").prop("checked")) {
                ReportHTML += '                                 <td><b>' + (TotalDispatchQty).toFixed(2) + '</b></td>';
                ReportHTML += '                                 <td><b>' + (TotalDispatchWeight).toFixed(2) + '</b></td>';
                ReportHTML += '                                 <td><b>' + (TotalDispatchVolume).toFixed(2) + '</b></td>';
            }
            if ($("#cbStock").prop("checked")) {
                ReportHTML += '                                 <td><b>' + (TotalOpeningQty + TotalReceiptQty - TotalDispatchQty).toFixed(2) + '</b></td>';
                ReportHTML += '                                 <td><b>' + (TotalOpeningWeight + TotalReceiptWeight - TotalDispatchWeight).toFixed(2) + '</b></td>';
                ReportHTML += '                                 <td><b>' + (TotalOpeningVolume + TotalReceiptVolume - TotalDispatchVolume).toFixed(2) + '</b></td>';
            }
            ReportHTML += '                             </tr>';
            ReportHTML += '                             <tr style="font-size:95%;">';
            ReportHTML += '                                 <td colspan="3"><b>Warehouse Total :</b></td>';
            if ($("#cbPartNumber").prop("checked"))
                ReportHTML += '                                     <td></td>';
            if ($("#cbHSCode").prop("checked"))
                ReportHTML += '                                     <td></td>';
            if ($("#cbProductType").prop("checked"))
                ReportHTML += '                                     <td></td>';
            if ($("#cbModelNumber").prop("checked"))
                ReportHTML += '                                     <td></td>';
            if ($("#cbBrandName").prop("checked"))
                ReportHTML += '                                     <td></td>';
            if ($("#cbGrossWeight").prop("checked"))
                ReportHTML += '                                     <td></td>';
            if ($("#cbVolume").prop("checked"))
                ReportHTML += '                                     <td></td>';
            if ($("#cbOpening").prop("checked")) {
                ReportHTML += '                                 <td><b>' + (TotalOpeningQty).toFixed(2) + '</b></td>';
                ReportHTML += '                                 <td><b>' + (TotalOpeningWeight).toFixed(2) + '</b></td>';
                ReportHTML += '                                 <td><b>' + (TotalOpeningVolume).toFixed(2) + '</b></td>';
            }
            if ($("#cbReceipt").prop("checked")) {
                ReportHTML += '                                 <td><b>' + (TotalReceiptQty).toFixed(2) + '</b></td>';
                ReportHTML += '                                 <td><b>' + (TotalReceiptWeight).toFixed(2) + '</b></td>';
                ReportHTML += '                                 <td><b>' + (TotalReceiptVolume).toFixed(2) + '</b></td>';
            }
            if ($("#cbDispatch").prop("checked")) {
                ReportHTML += '                                 <td><b>' + (TotalDispatchQty).toFixed(2) + '</b></td>';
                ReportHTML += '                                 <td><b>' + (TotalDispatchWeight).toFixed(2) + '</b></td>';
                ReportHTML += '                                 <td><b>' + (TotalDispatchVolume).toFixed(2) + '</b></td>';
            }
            if ($("#cbStock").prop("checked")) {
                ReportHTML += '                                 <td><b>' + (TotalOpeningQty + TotalReceiptQty - TotalDispatchQty).toFixed(2) + '</b></td>';
                ReportHTML += '                                 <td><b>' + (TotalOpeningWeight + TotalReceiptWeight - TotalDispatchWeight).toFixed(2) + '</b></td>';
                ReportHTML += '                                 <td><b>' + (TotalOpeningVolume + TotalReceiptVolume - TotalDispatchVolume).toFixed(2) + '</b></td>';
            }
            ReportHTML += '                             </tr>';

            ReportHTML += '                             </tbody>';
            ReportHTML += '                         </table>';
            ReportHTML += '                         </div>';

            ReportHTML += '         </body>';
            ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            ReportHTML += '     </footer>';

            ReportHTML += '</html>';

            if (pOutputTo == "Print") {
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            else {
                $('#tblStockLedgerExcel').html($.parseHTML(ReportHTML));
                $("#tblStockLedgerExcel").tblToExcel();
            }
        }
        else {

            ReportHTML += '<html>';
            if (pOutputTo == "Print") {
                ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            }
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '             <div class="col-xs-12 ' + (pDefaults.UnEditableCompanyName == "FPL" ? "" : "text-center") + '"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style="' + (pDefaults.UnEditableCompanyName == "FPL" ? "width:20%;margin-top:1%;" : "") + '"/></div> </br>';
            ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

            ReportHTML += '             <div class="col-xs-12"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
            if (pDefaults.UnEditableCompanyName == "DGL")
                ReportHTML += '             <div class="col-xs-12 float-left"><b>Warehouse :</b>DGL Internaional</div>';
            ReportHTML += '             <div class="col-xs-12 float-left"><b>Client : </b> ' + $('#slCustomer  option:selected').text() + '</div>';

            ReportHTML += '             <div class="col-xs-12">';
            ReportHTML += '                         <table id="tblStockLedgerReport" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';
            ReportHTML += '                             <thead>';
            ReportHTML += '                                 <tr class="" style="font-size:95%;">';
            ReportHTML += '                                     <th colspan="2" style="width:25%;">Item</th>';
            ReportHTML += '                                     <th colspan="3" style="width:21%;">Receipt</th>';
            ReportHTML += '                                     <th colspan="4" style="width:33%;">Dispatch</th>';
            ReportHTML += '                                     <th colspan="4" style="width:21%;">Stock On Hand</th>';
            ReportHTML += '                                 </tr>';
            ReportHTML += '                                 <tr class="" style="font-size:95%;">';
            ReportHTML += '                                     <th style="width:10%;">Date</th>';
            ReportHTML += '                                     <th style="width:15%;">Unit</th>';

            ReportHTML += '                                     <th style="width:7%;">Qty</th>';
            ReportHTML += '                                     <th style="width:7%;">Weight</th>';
            ReportHTML += '                                     <th style="width:7%;">Volume</th>';
            //ReportHTML += '                                     <th>Client Ref</th>';

            ReportHTML += '                                     <th style="width:7%;">Qty</th>';
            ReportHTML += '                                     <th style="width:7%;">Weight</th>';
            ReportHTML += '                                     <th style="width:7%;">Volume</th>';
            ReportHTML += '                                     <th style="width:12%;">Order No</th>';

            ReportHTML += '                                     <th style="width:7%;">Qty</th>';
            ReportHTML += '                                     <th style="width:7%;">Weight</th>';
            ReportHTML += '                                     <th style="width:7%;">Volume</th>';
            ReportHTML += '                                 </tr>';
            ReportHTML += '                             </thead>';
            ReportHTML += '                         </table></div>';


            //ReportHTML += '             <div class="col-xs-12">';
            //ReportHTML += '                         <table id="tblStockLedgerReport" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';

            //ReportHTML += '                             <tbody>';
            var TotalOpeningQty = 0, TotalOpeningWeight = 0, TotalOpeningVolume = 0, TotalReceiptQty = 0, TotalReceiptWeight = 0;
            var TotalDispatchWeight = 0, TotalDispatchVolume = 0, TotalReceiptVolume = 0, TotalDispatchQty = 0;
            var SummaryCounter = 0;

            var ClientTotalReceiptQty = 0, ClientTotalReceiptWeight = 0, ClientTotalReceiptVolume = 0, ClientTotalDispatchQty = 0;
            var ClientTotalDispatchWeight = 0, ClientTotalDispatchVolume = 0;
            debugger;
            if (pSummaryRows.length > 0)
                $.each(pDetailsRows, function (i, item) {
                    var IndexCounter = 0;
                    $.each(pSummaryRows, function (Counter, item) {
                        if (pDetailsRows[i].PurchaseItemID == pSummaryRows[Counter].PurchaseItemID) {
                            IndexCounter = Counter;
                        }
                    });

                    TotalReceiptQty += item.ReceiptQty;
                    TotalReceiptWeight += item.ReceiptWeight;
                    TotalDispatchWeight += item.DispatchWeight;
                    TotalDispatchVolume += item.DispatchVolume;
                    TotalReceiptVolume += item.ReceiptVolume;
                    TotalDispatchQty += item.DispatchQty;
                    debugger;

                    if (i > 0 && pDetailsRows[i].PurchaseItemName == pDetailsRows[i - 1].PurchaseItemName) {

                        ReportHTML += '                             <tr style="font-size:95%;" class="' + (item.IsDefected ? "text-danger" : "") +'">';
                        ReportHTML += '                                 <td style="width:10%;">' + (ConvertDateFormat(GetDateWithFormatMDY(item.FinalizeDate)) == "NaN" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.FinalizeDate))) + '</td>';
                        ReportHTML += '                                 <td style="width:15%;">' + item.PackageTypeName + ($("#cbPalletID").prop("checked") && item.PalletID != "" ? ("<br>PalletID/Serial: " + item.PalletID.replace(/[,]/g, '<br>')) : "") + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + item.ReceiptQty.toFixed(2) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + item.ReceiptWeight.toFixed(2) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + item.ReceiptVolume.toFixed(2) + '</td>';
                        //ReportHTML += '                                 <td></td>';

                        ReportHTML += '                                 <td style="width:7%;">' + item.DispatchQty.toFixed(2) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + item.DispatchWeight.toFixed(2) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + item.DispatchVolume.toFixed(2) + '</td>';

                        ReportHTML += '                                 <td style="width:12%;">' + item.Code + (pDefaults.UnEditableCompanyName == "DGL" && item.PickupNotes != 0 ? '<br/>' + item.PickupNotes : "") +
                            (pDefaults.UnEditableCompanyName == "NIL" || pDefaults.UnEditableCompanyName == "EXP" ?
                                '<br>' + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate))
                                + (item.DetailFile == "" ? "" : "<br/> File:" + item.DetailFile)
                                + (item.DetailInvoice == "" ? "" : "<br/> Invoice:" + item.DetailInvoice)
                                + (item.ContainerNumber == "" ? "" : "<br/> Container:" + item.ContainerNumber)
                                : "")
                            + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + (item.ReceiptQty - item.DispatchQty).toFixed(2) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + (item.ReceiptWeight - item.DispatchWeight).toFixed(2) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + (item.ReceiptVolume - item.DispatchVolume).toFixed(2) + '</td>';

                        ReportHTML += '                             </tr>';
                    }
                    else {
                        if (i > 0) {
                            ReportHTML += '                             </tbody></table></div>';
                        }
                        var _ProductInfoShown = pDetailsRows[i].PurchaseItemCode + ' - ' + pDetailsRows[i].PurchaseItemName;
                        _ProductInfoShown += $("#cbPartNumber").prop("checked") ? (" (PartNo:" + pSummaryRows[IndexCounter].PartNumber + ")") : "";
                        _ProductInfoShown += $("#cbHSCode").prop("checked") ? (" (HSCode:" + pSummaryRows[IndexCounter].HSCode + ")") : "";
                        _ProductInfoShown += $("#cbModelNumber").prop("checked") ? (" (ModelNumber:" + pSummaryRows[IndexCounter].ModelNumber + ")") : "";
                        _ProductInfoShown += $("#cbBrandName").prop("checked") ? (" (BrandName:" + pSummaryRows[IndexCounter].BrandName + ")") : "";
                        _ProductInfoShown += $("#cbProductType").prop("checked") ? (" (ProductType:" + pSummaryRows[IndexCounter].ProductType + ")") : "";
                        _ProductInfoShown += $("#cbGrossWeight").prop("checked") ? (" (Weight:" + pSummaryRows[IndexCounter].GrossWeight + ")") : "";
                        _ProductInfoShown += $("#cbVolume").prop("checked") ? (" (CBM:" + pSummaryRows[IndexCounter].Volume + ")") : "";
                        _ProductInfoShown += $("#cbContainerNumber").prop("checked") ? (" (Container Number:" + pSummaryRows[IndexCounter].ContainerNumber + ")") : "";
                        _ProductInfoShown += $("#cbExtra1").prop("checked") ? (" (Extra1:" + pSummaryRows[IndexCounter].Extra1 + ")") : "";
                        _ProductInfoShown += $("#cbExtra2").prop("checked") ? (" (Extra2:" + pSummaryRows[IndexCounter].Extra2 + ")") : "";
                        _ProductInfoShown += $("#cbExtra3").prop("checked") ? (" (Extra3:" + pSummaryRows[IndexCounter].Extra3 + ")") : "";
                        _ProductInfoShown += $("#cbExtra4").prop("checked") ? (" (Extra4:" + pSummaryRows[IndexCounter].Extra4 + ")") : "";
                        _ProductInfoShown += $("#cbExtra5").prop("checked") ? (" (Extra5:" + pSummaryRows[IndexCounter].Extra5 + ")") : "";
                        _ProductInfoShown += $("#cbExtra6").prop("checked") ? (" (Extra6:" + pSummaryRows[IndexCounter].Extra6 + ")") : "";
                        _ProductInfoShown += $("#cbExtra7").prop("checked") ? (" (Extra7:" + pSummaryRows[IndexCounter].Extra7 + ")") : "";
                        _ProductInfoShown += $("#cbExtra8").prop("checked") ? (" (Extra8:" + pSummaryRows[IndexCounter].Extra8 + ")") : "";
                        _ProductInfoShown += $("#cbExtra9").prop("checked") ? (" (Extra9:" + pSummaryRows[IndexCounter].Extra9 + ")") : "";

                        ReportHTML += '<div class="col-xs-12"> Product: ' + _ProductInfoShown
                            //+ pDetailsRows[i].PurchaseItemCode + ' - ' + pDetailsRows[i].PurchaseItemName
                            //+ (pDetailsRows[i].PartNumber == "" ? "" : (' - PartNo:' + pDetailsRows[i].PartNumber)) + (pDetailsRows[i].BrandName == "" ? "" : (' - Brand: ' + pDetailsRows[i].BrandName)) + (pDetailsRows[i].Notes == "" ? "" : (' - Desc: ' + pDetailsRows[i].Notes))
                            + '</div>';
                        ReportHTML += '             <div class="col-xs-12">';
                        ReportHTML += '                         <table id="tblStockLedgerReport" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';
                        ReportHTML += '                             <tbody>';
                        ReportHTML += '                             <tr style="font-size:95%;" class="' + (item.IsDefected ? "text-danger" : "") +'">';
                        ReportHTML += '                                 <td colspan="2" style="width:25%;"><b>Opening:</b></td>';
                        console.log(SummaryCounter);
                        console.log(pSummaryRows[SummaryCounter].OpeningQty);
                        //ReportHTML += '                                 <td><b>' + pSummaryRows[SummaryCounter].OpeningQty + '</b></td>';
                        //ReportHTML += '                                 <td><b>' + pSummaryRows[SummaryCounter].OpeningWeight + '</b></td>';
                        //ReportHTML += '                                 <td><b>' + pSummaryRows[SummaryCounter].OpeningVolume + '</b></td>';
                        //ReportHTML += '                                 <td colspan="5"></td>';
                        //ReportHTML += '                                 <td><b>' + pSummaryRows[SummaryCounter].OpeningQty + '</b></td>';
                        //ReportHTML += '                                 <td><b>' + pSummaryRows[SummaryCounter].OpeningWeight + '</b></td>';
                        //ReportHTML += '                                 <td><b>' + pSummaryRows[SummaryCounter].OpeningVolume + '</b></td>';

                        ReportHTML += '                                 <td style="width:7%;"><b>' + pSummaryRows[IndexCounter].OpeningQty.toFixed(2) + '</b></td>';
                        ReportHTML += '                                 <td style="width:7%;"><b>' + parseFloat(pSummaryRows[IndexCounter].OpeningWeight).toFixed(2) + '</b></td>';
                        ReportHTML += '                                 <td style="width:7%;"><b>' + parseFloat(pSummaryRows[IndexCounter].OpeningVolume).toFixed(2) + '</b></td>';
                        ReportHTML += '                                 <td style="width:33%;" colspan="4"></td>';
                        ReportHTML += '                                 <td style="width:7%;"><b>' + pSummaryRows[IndexCounter].OpeningQty.toFixed(2) + '</b></td>';
                        ReportHTML += '                                 <td style="width:7%;"><b>' + parseFloat(pSummaryRows[IndexCounter].OpeningWeight).toFixed(2) + '</b></td>';
                        ReportHTML += '                                 <td style="width:7%;"><b>' + parseFloat(pSummaryRows[IndexCounter].OpeningVolume).toFixed(2) + '</b></td>';
                        debugger;
                        ReportHTML += '                             </tr>';
                        ReportHTML += '                             <tr style="font-size:95%;">';
                        ReportHTML += '                                 <td style="width:10%;">' + ConvertDateFormat(GetDateWithFormatMDY(item.FinalizeDate)) + '</td>';
                        ReportHTML += '                                 <td style="width:15%;">' + item.PackageTypeName + ($("#cbPalletID").prop("checked") && item.PalletID != "" ? ("<br>PalletID/Serial: " + item.PalletID.replace(/[,]/g, '<br>')) : "") + '</td>';

                        ReportHTML += '                                 <td style="width:7%;">' + item.ReceiptQty.toFixed(2) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + item.ReceiptWeight.toFixed(2) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + item.ReceiptVolume.toFixed(2) + '</td>';
                        //ReportHTML += '                                 <td></td>';

                        ReportHTML += '                                 <td style="width:7%;">' + item.DispatchQty.toFixed(2) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + item.DispatchWeight.toFixed(2) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + item.DispatchVolume.toFixed(2) + '</td>';
                        ReportHTML += '                                 <td style="width:12%;">' + item.Code + (pDefaults.UnEditableCompanyName == 'NIL' || pDefaults.UnEditableCompanyName == 'EXP' ? ' <br/> ' + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) : "") + (pDefaults.UnEditableCompanyName == 'DGL' ? '<br>' + (item.PickupNotes) : "") + '</td>';

                        ReportHTML += '                                 <td style="width:7%;">' + (item.ReceiptQty - item.DispatchQty).toFixed(2) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + (item.ReceiptWeight - item.DispatchWeight).toFixed(2) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + (item.ReceiptVolume - item.DispatchVolume).toFixed(2) + '</td>';

                        ReportHTML += '                             </tr>';
                        SummaryCounter += 1;
                    }

                    if (i == (pDetailsRows.length - 1) || pDetailsRows[i].PurchaseItemName != pDetailsRows[i + 1].PurchaseItemName) {
                        //TotalOpeningQty += pSummaryRows[SummaryCounter - 1].OpeningQty;
                        //TotalOpeningWeight += pSummaryRows[SummaryCounter - 1].OpeningWeight;
                        //TotalOpeningVolume += pSummaryRows[SummaryCounter - 1].OpeningVolume;

                        TotalOpeningQty += pSummaryRows[IndexCounter].OpeningQty;
                        TotalOpeningWeight += pSummaryRows[IndexCounter].OpeningWeight;
                        TotalOpeningVolume += pSummaryRows[IndexCounter].OpeningVolume;

                        ReportHTML += '                             </tr>';
                        ReportHTML += '                             <tr style="font-size:95%;">';
                        ReportHTML += '                                 <td style="width:25%;" colspan="2"><b>Item Total :</b></td>';

                        //ReportHTML += '                                 <td>' + (TotalOpeningQty + TotalReceiptQty) + '</td>';
                        //ReportHTML += '                                 <td>' + (TotalOpeningWeight + TotalReceiptWeight) + '</td>';
                        //ReportHTML += '                                 <td>' + (TotalOpeningVolume + TotalReceiptVolume) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + (TotalReceiptQty).toFixed(2) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + (TotalReceiptWeight).toFixed(2) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + (TotalReceiptVolume).toFixed(2) + '</td>';

                        //ReportHTML += '                                 <td></td>';
                        ReportHTML += '                                 <td style="width:7%;">' + TotalDispatchQty.toFixed(2) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + TotalDispatchWeight.toFixed(2) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + TotalDispatchVolume.toFixed(2) + '</td>';

                        ReportHTML += '                                 <td style="width:12%;"></td>';
                        //ReportHTML += '                                 <td>' + (TotalOpeningQty + TotalReceiptQty - TotalDispatchQty) + '</td>';
                        //ReportHTML += '                                 <td>' + (TotalOpeningWeight + TotalReceiptWeight - TotalDispatchWeight) + '</td>';
                        //ReportHTML += '                                 <td>' + (TotalOpeningVolume + TotalReceiptVolume - TotalDispatchVolume) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + (TotalReceiptQty - TotalDispatchQty).toFixed(2) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + (TotalReceiptWeight - TotalDispatchWeight).toFixed(2) + '</td>';
                        ReportHTML += '                                 <td style="width:7%;">' + (TotalReceiptVolume - TotalDispatchVolume).toFixed(2) + '</td>';

                        ReportHTML += '                             </tr>';

                        //////////Ending 
                        debugger;
                        ReportHTML += '                             <tr style="font-size:95%;">';
                        ReportHTML += '                                 <td style="width:25%;" colspan="2"><b>Ending:</b></td>';
                        ReportHTML += '                                 <td style="width:7%;"><b>' + (TotalOpeningQty + TotalReceiptQty - TotalDispatchQty).toFixed(2) + '</b></td>';
                        ReportHTML += '                                 <td style="width:7%;"><b>' + (TotalOpeningWeight + TotalReceiptWeight - TotalDispatchWeight).toFixed(2) + '</b></td>';
                        ReportHTML += '                                 <td style="width:7%;"><b>' + (TotalOpeningVolume + TotalReceiptVolume - TotalDispatchVolume).toFixed(2) + '</b></td>';
                        ReportHTML += '                                 <td style="width:33%;" colspan="4"></td>';
                        ReportHTML += '                                 <td style="width:7%;"><b>' + (TotalOpeningQty + TotalReceiptQty - TotalDispatchQty).toFixed(2) + '</b></td>';
                        ReportHTML += '                                 <td style="width:7%;"><b>' + (TotalOpeningWeight + TotalReceiptWeight - TotalDispatchWeight).toFixed(2) + '</b></td>';
                        ReportHTML += '                                 <td style="width:7%;"><b>' + (TotalOpeningVolume + TotalReceiptVolume - TotalDispatchVolume).toFixed(2) + '</b></td>';
                        ReportHTML += '                             </tr>';
                        /////////Ending

                        //ClientTotalReceiptQty += (TotalOpeningQty + TotalReceiptQty);
                        //ClientTotalReceiptWeight += (TotalOpeningWeight + TotalReceiptWeight);
                        //ClientTotalReceiptVolume += (TotalOpeningVolume + TotalReceiptVolume);
                        ClientTotalReceiptQty += (TotalReceiptQty);
                        ClientTotalReceiptWeight += (TotalReceiptWeight);
                        ClientTotalReceiptVolume += (TotalReceiptVolume);
                        ClientTotalDispatchQty += TotalDispatchQty;
                        ClientTotalDispatchWeight += TotalDispatchWeight;
                        ClientTotalDispatchVolume += TotalDispatchVolume;

                        TotalOpeningQty = 0, TotalOpeningWeight = 0, TotalOpeningVolume = 0, TotalReceiptQty = 0, TotalReceiptWeight = 0;
                        TotalDispatchWeight = 0, TotalDispatchVolume = 0, TotalReceiptVolume = 0, TotalDispatchQty = 0;
                    }
                });


            ReportHTML += '                             </tbody>';
            ReportHTML += '                         </table>';
            ReportHTML += '                         </div>';

            ReportHTML += '             <div class="col-xs-12">';
            ReportHTML += '                         <table id="tblTotalStockLedgerReport" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';
            ReportHTML += '                             <tbody>';
            ReportHTML += '                             <tr style="font-size:95%;">';
            ReportHTML += '                                 <td colspan="2" style="width:25%;"><b>Client Total :</b></td>';

            ReportHTML += '                                 <td style="width:7%;">' + (ClientTotalReceiptQty).toFixed(2) + '</td>';
            ReportHTML += '                                 <td style="width:7%;">' + (ClientTotalReceiptWeight).toFixed(2) + '</td>';
            ReportHTML += '                                 <td style="width:7%;">' + (ClientTotalReceiptVolume).toFixed(2) + '</td>';

            //ReportHTML += '                                 <td></td>';
            ReportHTML += '                                 <td style="width:7%;">' + ClientTotalDispatchQty.toFixed(2) + '</td>';
            ReportHTML += '                                 <td style="width:7%;">' + ClientTotalDispatchWeight.toFixed(2) + '</td>';
            ReportHTML += '                                 <td style="width:7%;">' + ClientTotalDispatchVolume.toFixed(2) + '</td>';

            ReportHTML += '                                 <td style="width:12%;"></td>'; //Order No
            ReportHTML += '                                 <td style="width:7%;">' + (ClientTotalReceiptQty - ClientTotalDispatchQty).toFixed(2) + '</td>';
            ReportHTML += '                                 <td style="width:7%;">' + (ClientTotalReceiptWeight - ClientTotalDispatchWeight).toFixed(2) + '</td>';
            ReportHTML += '                                 <td style="width:7%;">' + (ClientTotalReceiptVolume - ClientTotalDispatchVolume).toFixed(2) + '</td>';

            ReportHTML += '                             </tr>';

            ReportHTML += '                             <tr style="font-size:95%;">';
            ReportHTML += '                                 <td style="width:25%;" colspan="2"><b>Warehouse Total :</b></td>';

            ReportHTML += '                                 <td style="width:7%;">' + (ClientTotalReceiptQty).toFixed(2) + '</td>';
            ReportHTML += '                                 <td style="width:7%;">' + (ClientTotalReceiptWeight).toFixed(2) + '</td>';
            ReportHTML += '                                 <td style="width:7%;">' + (ClientTotalReceiptVolume).toFixed(2) + '</td>';

            //ReportHTML += '                                 <td></td>';
            ReportHTML += '                                 <td style="width:7%;">' + ClientTotalDispatchQty.toFixed(2) + '</td>';
            ReportHTML += '                                 <td style="width:7%;">' + ClientTotalDispatchWeight.toFixed(2) + '</td>';
            ReportHTML += '                                 <td style="width:7%;">' + ClientTotalDispatchVolume.toFixed(2) + '</td>';

            ReportHTML += '                                 <td style="width:12%;"></td>'; //Order No

            ReportHTML += '                                 <td style="width:7%;">' + (ClientTotalReceiptQty - ClientTotalDispatchQty).toFixed(2) + '</td>';
            ReportHTML += '                                 <td style="width:7%;">' + (ClientTotalReceiptWeight - ClientTotalDispatchWeight).toFixed(2) + '</td>';
            ReportHTML += '                                 <td style="width:7%;">' + (ClientTotalReceiptVolume - ClientTotalDispatchVolume).toFixed(2) + '</td>';

            ReportHTML += '                             </tr>';
            ReportHTML += '                         </tbody></table> </div>';

            if (pDefaults.UnEditableCompanyName == "NIL" || pDefaults.UnEditableCompanyName == "EXP")
                ReportHTML += '         <div class="row text-center"><img src="/Content/Images/StockLedgerFooter.jpg" alt="footer"/></div>';

            ReportHTML += '         </body>';
            ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            ReportHTML += '     </footer>';

            ReportHTML += '</html>';
            if (pOutputTo == "Print") {
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            else {
                $('#tblStockLedgerExcel').html($.parseHTML(ReportHTML));
                $("#tblStockLedgerExcel").tblToExcel();
            }
        }
    }

  
}
function StockLedger_SelectColumns() {
    debugger;
    jQuery("#ModalSelectColumns").modal("show");
}
function StockLedger_PrintOptionChanged() {
    debugger;
    if ($("#rdSummary").prop("checked"))
        $("#cbSupressForZero").parent().parent().removeClass("hide");
    else
        $("#cbSupressForZero").parent().parent().addClass("hide");
    //if ($("#rdSummary").prop("checked"))
    //    $("#btn-SelectColumns").removeClass("hide");
    //else
    //    $("#btn-SelectColumns").addClass("hide");
}
function LoadItems() {
    $('#slPurchaseItems').html('');
    var ownerIds = IsNull($('#slOwners option:selected').val(), '0').toString();
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/PurchaseItem/LoadAll"
        , { pWhereClause: `where OwnerID in (${ownerIds})` }
        , function (pData) {
            FadePageCover(false);
            FillListFromObject(null, 9, "<--Select-->", "slPurchaseItems", pData, null);
        }
        , null);
}