function WHInvoice_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "WHInvoice_BindTableRows";
    strLoadWithPagingFunctionName = "/api/WHInvoice/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    //var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pWhereClause = " WHERE 1=1";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/Transactions/WHInvoice", "div-content", function () {
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                var pWarehouse = pData[2];
                var pCustomer = pData[3];
                var pChargeType = pData[4];
                FillListFromObject(null, 2, null/*pStrFirstRow*/, "slWarehouse", pWarehouse, function () { $("#slFilterWarehouse").html($("#slWarehouse").html()); });
                FillListFromObject(null, 2, "<--Select-->", "slCustomer", pCustomer, function () { $("#slFilterCustomer").html($("#slCustomer").html()); });
                FillListFromObject(null, (pDefaults.IsRepeatChargeTypeName ? 4 : 2), "<--Select-->"/*pStrFirstRow*/, "slWHInvoiceDetailsChargeType", pChargeType, null);
                $("#slCurrency").html($("#hReadySlCurrencies").html());
                //$("#txtFilterFromInvoiceDate").val("01/01/2000");
                //$("#txtFilterToInvoiceDate").val(pFormattedTodaysDate);
                //$("#slCustomer").html($("#hReadySlCustomers").html());
                WHInvoice_BindTableRows(JSON.parse(pData[0]));
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { WHInvoice_ClearAllControls(); },
        function () { WHInvoice_DeleteList(); });
}
function WHInvoice_BindTableRows(pWHInvoice) {
    debugger;
    ClearAllTableRows("tblWHInvoice");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
    $.each(pWHInvoice, function (i, item) {
        AppendRowtoTable("tblWHInvoice",
        ("<tr ID='" + item.ID + "' ondblclick='WHInvoice_FillAllControls(" + item.ID + ");'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Code'>" + item.Code + "</td>"
            + "<td class='WarehouseID hide'>" + item.WarehouseID + "</td>"
            + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
            + "<td class='CustomerName'>" + item.CustomerName + "</td>"
            + "<td class='ContractID hide'>" + item.ContractID + "</td>"
            + "<td class='ContractCode hide'>" + (item.ContractCode == 0 ? "" : item.ContractCode) + "</td>"
            + "<td class='InvoiceDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.InvoiceDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate))) + "</td>"
            + "<td class='Amount'>" + item.Amount + "</td>"
            + "<td class='CurrencyID hide'>" + item.CurrencyID + "</td>"
            + "<td class='CurrencyCode'>" + item.CurrencyCode + "</td>"
            + "<td class='ExchangeRate hide'>" + item.ExchangeRate + "</td>"
            + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
            + "<td class='IsPosted hide'> <input type='checkbox' id='cbIsPosted" + item.ID + "' disabled='disabled' " + (item.IsPosted ? " checked='checked' " : "") + " /></td>"
            + "<td class='PostDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PostDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PostDate))) + "</td>"

            //+ "<td class='StorageUnitID hide'>" + item.StorageUnitID + "</td>"
            //+ "<td class='StorageUnitCode hide'>" + (item.StorageUnitCode == 0 ? "" : item.StorageUnitCode) + "</td>"
            //+ "<td class='IsByPallet hide'> <input type='checkbox' id='cbIsByPallet" + item.ID + "' disabled='disabled' " + (item.IsByPallet ? " checked='checked' " : "") + " /></td>"
            //+ "<td class='NumberOfPallets hide'>" + item.NumberOfPallets + "</td>"
            //+ "<td class='Status'>" + item.Status + "</td>"
            + "<td class=''>"
                //+ "<a href='#WHInvoiceModal' data-toggle='modal' onclick='WHInvoiceFillControls(" + item.ID + ");' " + editControlsText + "</a>"
            + "<a href='#' data-toggle='modal' onclick='WHInvoice_PrintFast(" + item.ID + ",true);' " + printControlsText.replace('Print', 'Print Details') + "</a>&emsp;"
            + "<a href='#' data-toggle='modal' onclick='WHInvoice_PrintFast(" + item.ID + ",false);' " + printControlsText + "</a>"
            + "</td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWHInvoice", "ID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblWHInvoice>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function WHInvoice_LoadingWithPaging() {
    debugger;
    var pWhereClause = WHInvoice_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WHInvoice_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWHInvoice>tbody>tr", $("#txt-Search").val().trim());
}
function WHInvoice_GetWhereClause() {
    var pWhereClause = "WHERE 1=1 ";
    if ($("#txtFilterCodeSerial").val().trim() != "")
        pWhereClause += "AND (CodeSerial=N'" + $("#txtFilterCodeSerial").val().trim().toUpperCase() + "')" + "\n";
    if ($("#slFilterCustomer").val().trim() != "")
        pWhereClause += "AND (CustomerID=N'" + $("#slFilterCustomer").val() + "')" + "\n";
    if (isValidDate($("#txtFilterFromInvoiceDate").val().trim(), 1)) {
        if ($("#txtFilterFromInvoiceDate").val() != null && $("#txtFilterFromInvoiceDate").val() != "")
            pWhereClause += " AND (InvoiceDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromInvoiceDate").val()) + " 00:00:00.000')" + "\n";
    }
    if (isValidDate($("#txtFilterToInvoiceDate").val().trim(), 1)) {
        if ($("#txtFilterToInvoiceDate").val() != null && $("#txtFilterToInvoiceDate").val() != "")
            pWhereClause += " AND (InvoiceDate <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToInvoiceDate").val()) + " 23:59:59.999')" + "\n";
    }
    return pWhereClause;
}
function WHInvoice_ClearAllControls() {
    debugger;
    $("#tblWHInvoiceDetails tbody").html("");
    //$("#lblWHInvoiceMaxWeight").html("<span> : </span><span>" + 0 + "</span>");
    //$("#lblWHInvoiceMaxVolume").html("<span> : </span><span>" + 0 + "</span>");
    ClearAll("#WHInvoiceModal");

    $("#slCurrency").val(pDefaults.CurrencyID);
    $("#txtInvoiceDate").val(getTodaysDateInddMMyyyyFormat());
    $("#txtExchangeRate").val(1);
    $("#txtWHInvoiceDetailsDays").val(1);
    $(".classDisableForPosted").removeAttr("disabled");
    $(".classDisableForDetails").removeAttr("disabled");

    $("#btnSave").attr("onclick", "WHInvoice_Save(false);");
    $("#btnSaveAndAddNew").attr("onclick", "WHInvoice_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
}
function WHInvoice_FillAllControls(pID) {
    debugger;
    $("#tblWHInvoiceDetails tbody").html("");
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WHInvoice/LoadHeaderWithDetails", { pHeaderID: pID }
        , function (pData) {
            jQuery("#WHInvoiceModal").modal("show");
            var pHeader = JSON.parse(pData[0]);
            var pInvoiceDetails = JSON.parse(pData[1]);
            if (pInvoiceDetails.length > 0) {
                $(".classDisableForDetails").attr("disabled", "disabled");
            }
            else {
                $(".classDisableForDetails").removeAttr("disabled");
            }
            if (pHeader.IsPosted) {
                $(".classDisableForPosted").attr("disabled", "disabled");
            }
            else {
                $(".classDisableForPosted").removeAttr("disabled");
            }
            WHInvoiceDetails_BindTableRows(pInvoiceDetails);
            $("#hID").val(pID);
            $("#lblShown").html(": " + pHeader.Code);
            $("#txtCode").val(pHeader.Code);
            $("#slWarehouse").val(pHeader.WarehouseID == 0 ? "" : pHeader.WarehouseID);
            $("#slCustomer").val(pHeader.CustomerID);
            $("#slContract").val(pHeader.ContractID == 0 ? "" : pHeader.ContractID);
            $("#txtInvoiceDate").val(pHeader.strInvoiceDate == "01/01/1900" ? "" : pHeader.strInvoiceDate);
            $("#txtAmount").val(pHeader.Amount.toFixed(2));
            $("#slCurrency").val(pHeader.CurrencyID);
            $("#txtExchangeRate").val(pHeader.ExchangeRate);
            $("#txtNotes").val(pHeader.Notes == 0 ? "" : pHeader.Notes);
            $("#cbIsPosted").prop("checked", pHeader.IsPosted);
            FadePageCover(false);
        }
        , null);
}
function WHInvoice_Save(pSaveAndNew) {
    debugger;
    if ($("#hID").val() == "" && $('#tblWHInvoiceDetails tbody tr').lenght==0)
        swal("Sorry", "Please, Add at least one invoice item.");
    else
        if (ValidateForm("form", "WHInvoiceModal")) {
            FadePageCover(true);
            var pParametersWithValues = {
                pWhereClauseCurrencyDetails: ("WHERE ID=" + $("#slCurrency").val() + " AND '" + GetDateWithFormatyyyyMMdd($("#txtInvoiceDate").val()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                        + " AND '" + GetDateWithFormatyyyyMMdd($("#txtInvoiceDate").val()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                        + " ORDER BY CODE"
                      )
            };
            CallGETFunctionWithParameters("/api/Currencies/LoadCurrencyDetails", pParametersWithValues
                , function (pData) {
                    if (pData[0] == "[]") {
                        $("#txtExchangeRate").val(0);
                        swal("Sorry", "Exchange rate is not set for " + $("#slCurrency option:selected").text() + " in the Master Data.");
                        FadePageCover(false);
                    }
                    else {
                        var details = [];
                        $('#tblWHInvoiceDetails tbody tr').each(function () {
                            details.push({
                                ID: $(this).attr('ID')>0? $(this).attr('ID'):0,
                                ChargeTypeID: $(this).find('td.ChargeTypeID').text(),
                                ReceiveID: $(this).find('td.ReceiveID').text()>0? $(this).find('td.ReceiveID').text():0,
                                PickupID: $(this).find('td.PickupID').text()>0?$(this).find('td.PickupID').text():0,
                                TransServiceID: $(this).find('td.TransServiceID').text() > 0 ? $(this).find('td.TransServiceID').text():0,
                                ContractDetailsID: $(this).find('td.ContractDetailsID').text(),
                                SpacePerPallet: $(this).find('td.SpacePerPallet').text() > 0 ? $(this).find('td.SpacePerPallet').text():0,
                                Days: $(this).find('td.Days').text() > 0 ? $(this).find('td.Days').text():0,
                                Rate: $(this).find('td.Rate').text() > 0 ? $(this).find('td.Rate').text():0,
                                Qty: $(this).find('td.Qty').text() > 0 ? $(this).find('td.Qty').text():0,
                                Amount: $(this).find('td.Amount').text() > 0 ? $(this).find('td.Amount').text():0,
                                Notes: $(this).find('td.Notes').text(),
                            });
                        });

                        $("#txtExchangeRate").val(JSON.parse(pData[0])[0].ExchangeRate);
                        var pParametersWithValues = {
                              ID: $("#hID").val()>0 ? $("#hID").val():0
                            , WarehouseID: $("#slWarehouse").val()
                            , CustomerID: $("#slCustomer").val()
                            , ContractID: 0
                            , InvoiceDate: $("#txtInvoiceDate").val()
                            , CurrencyID: $("#slCurrency").val()
                            , ExchangeRate: $("#txtExchangeRate").val()
                            , Amount: $("#txtAmount").val()
                            , Notes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()
                            , Details: details
                        };
                        CallPOSTFunctionWithParameters("/api/WHInvoice/Save", pParametersWithValues
                            , function (pData) {
                                var _ReturnedMessage = pData[0];
                                if (_ReturnedMessage == "") {
                                    var pHeader = JSON.parse(pData[1]);
                                    var pDetails = JSON.parse(pData[2]);
                                    $("#hID").val(pHeader.ID);
                                    $("#lblShown").html(": " + pHeader.Code);
                                    $("#txtAmount").val(pHeader.Amount.toFixed(2));
                                    WHInvoiceDetails_BindTableRows(pDetails);
                                    WHInvoice_LoadingWithPaging();
                                    //if (pSaveAndNew) {
                                    //    ClearAll("#WHInvoiceModal");
                                    //    $("#txtWHInvoiceDetailsDays").val(1);
                                    //    $("#txtExchangeRate").val(1);
                                    //    $(".classDisableForPosted").attr("disabled", "disabled");
                                    //    $(".classDisableForDetails").attr("disabled");
                                    //}
                                    //else
                                    //    jQuery("#WHInvoiceModal").modal("hide");
                                    swal("Success", "Saved successfully.");
                                }
                                else {
                                    swal("Sorry", _ReturnedMessage);
                                    FadePageCover(false);
                                }
                            }
                            , null);
                    }
                }
                , null);
        }
}
function WHInvoice_slCustomerChanged() {
    debugger;
    $("#slWHInvoiceDetailsReceive").html("<option value=''><--Select--></option>");
    $("#slWHInvoiceDetailsPickup").html("<option value=''><--Select--></option>");
    $("#slWHInvoiceDetailsContract").html("<option value=''><--Select--></option>");
}
function WHInvoice_Print(pID) {
    debugger;
    if (pID == 0)
        pID = $("#hID").val();
    if (pID == "") //this means new without saving
        swal("Sorry", "Please, Add at least one invoice item.");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/WHInvoice/LoadHeaderWithDetails"
            , { pHeaderID: pID }
            , function (pData) {
                var pHeader = JSON.parse(pData[0]);
                var pDetails = JSON.parse(pData[1]);
                var mywindow = window.open('', '_blank');
                var ReportHTML = '';
                //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>' + 'Invoice' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '         <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>' + 'Invoice ' + pHeader.Code + '</h3></div> </br>';
                ReportHTML += '             <div class="col-xs-6"><b>Bill To : </b>' + pHeader.CustomerName + '</div>';
                ReportHTML += '             <div class="col-xs-6"><b>Invoice Date: ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pHeader.InvoiceDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(pHeader.InvoiceDate)) : "") + '</b></div>';
                ReportHTML += '             <div class="col-xs-6"><b>Address : </b>' + (pHeader.Address == 0 ? "" : pHeader.Address.replace(/\n/g, "<br/>")) + '</div>';
                //ReportHTML += '             <div class="col-xs-6"><b>Contact No. : </b>' + (pHeader.BillToContactPhones == 0 ? "" : pHeader.BillToContactPhones) + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Delivered to : </b>' + (pHeader.EndUserName == 0 ? "" : pHeader.EndUserName) + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Address : </b>' + (pHeader.EndUserAddress == 0 ? "" : pHeader.EndUserAddress) + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Contact Name : </b>' + (pHeader.EndUserContactName == 0 ? "" : pHeader.EndUserContactName) + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Contact No. : </b>' + (pHeader.EndUserContactPhones == 0 ? "" : pHeader.EndUserContactPhones) + '</div>';
                //ReportHTML += '             <div class="col-xs-4"><b>Operation : </b>' + (pHeader.OperationCode == 0 ? "" : pHeader.OperationCode) + '</div>';
                //ReportHTML += '             <div class="col-xs-4"><b>PO Number : </b>' + (pHeader.PONumber == 0 ? "" : pHeader.PONumber) + '</div>';
                //ReportHTML += '             <div class="col-xs-4"><b>RMA No. : </b>' + (pHeader.RMANumber == 0 ? "" : pHeader.RMANumber) + '</div>';
                ReportHTML += '                         <table id="tblDetails" class="table table-striped b-t b-light text-sm table-bordered">'; //table-hover
                ReportHTML += '                             <thead>';
                ReportHTML += '                                 <tr>';
                ReportHTML += '                                     <th style="width:35%;">Item</th>';
                ReportHTML += '                                     <th style="width:35%;">Notes</th>';
                ReportHTML += '                                     <th style="width:10%;">Rec.Code</th>';
                ReportHTML += '                                     <th style="width:10%;">Pickup Code</th>';
                ReportHTML += '                                     <th style="width:10%;">Amount</th>';
                ReportHTML += '                                 </tr>';
                ReportHTML += '                             </thead>';
                ReportHTML += '                             <tbody>';
                debugger;
                $.each(pDetails, function (i, item) {
                    ReportHTML += '                                     <tr class="" style="font-size:95%;">';
                    ReportHTML += '                                         <td>' + (item.ChargeTypeName == 0 ? '' : item.ChargeTypeName) + '</td>';
                    ReportHTML += '                                         <td>' + (item.Notes == 0 ? '' : item.Notes) + '</td>';
                    ReportHTML += '                                         <td>' + (item.ReceiveCode == 0 ? '' : item.ReceiveCode) + '</td>';
                    ReportHTML += '                                         <td>' + (item.PickupCode == 0 ? '' : item.PickupCode) + '</td>';
                    ReportHTML += '                                         <td>' + (item.Amount.toFixed(2)) + '</td>';
                    //ReportHTML += '                                         <td class="Quantity">' + item.Quantity + '</td>';

                    ReportHTML += '                                     </tr>';
                });
                /*********************************Summary*****************************************/
                ReportHTML += '                                     <tr class="" style="font-size:95%;">';
                ReportHTML += '                                         <td colspan=4 style="">'
                    + 'Total : ' + (pHeader.Amount.toFixed(2) + " " + pHeader.CurrencyCode) + ' - ONLY: ' + pHeader.CurrencyCode + ' ' + toWords_WithFractionNumbers(pHeader.Amount.toFixed(2))
                    + '</td>';
                ReportHTML += '                                     </tr>';
                /*********************************EOF Summary*****************************************/
                ReportHTML += '                             </tbody>';
                ReportHTML += '                         </table>';

                //ReportHTML += '                         <div class="col-xs-7"><b>Received By : &nbsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';
                ReportHTML += '                         <div class="col-xs-12"><b>Signature : </b>' + '  _______________________	 ' + '</div>';
                //ReportHTML += '                         <div class="col-xs-7"><b>ID No. : &emsp;&emsp;&emsp;&nbsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';
                //ReportHTML += '                         <div class="col-xs-7"><b>Mobile : &emsp;&emsp;&emsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';
                //ReportHTML += '                         <div class="col-xs-5"><b>Date : &emsp;&emsp;&emsp;&emsp;</b>' + getTodaysDateInddMMyyyyFormat() + '</div>';

                //ReportHTML += '                         <div class="col-xs-12 text-center m-t"><b>' + '  The equipment was received in good condition and there were no scratches.   ' + '</b></div>';
                //ReportHTML += '                         <div class="col-xs-12 text-center"><b>' + '  تم إستلام الأجهزة فى حالة سليمة ولا يوجد أى خدوش   ' + '</b></div>';
                //ReportHTML += '                         <div class="col-xs-12 text-center"><b>' + '  رجاء الختم بخاتم الشركه بما يفيد الاستلام  ' + '</b></div>';
                //ReportHTML += '                         <div class="col-xs-12 text-center"><b>' + '  Please seal the company with the receipt.	 ' + '</b></div>';
                ReportHTML += '         </body>';
                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                ReportHTML += '     </footer>';
                ReportHTML += '</html>';
                mywindow.document.write(ReportHTML);
                mywindow.document.close();

                FadePageCover(false);
            }
            , null);
    }
}
function WHInvoice_PrintFast(pID, pDetails) {
    debugger;

    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("dummy");
    arr_Values.push("0");

    var ReportName = pDetails ? "WhInvoiceSrvD" : "WhInvoiceSrv";
    var query = ``;
    if (pDetails) {
        query = `select Convert(nvarchar(10),InvoiceDate,111) as InvoiceDate,* from vwWH_InvoiceDetails_rpt where ID=${pID}`;
    }
    else {
        query = `select Code, Convert(nvarchar(10),InvoiceDate,111) as InvoiceDate, Amount, CustomerName, WarehouseName, Notes, ChargeTypeName, Sum(DetailsAmount) as DetailsAmount 
from vwWH_InvoiceDetails_rpt 
where ID=${pID} 
Group By Code, InvoiceDate, Amount, CustomerName, WarehouseName, Notes, ChargeTypeName`;
    }

    debugger;

    query = query.replace(/[\n\t]/g, '');
    debugger;

    var pParametersWithValues =
    {
        query: query
        , arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: ReportName
        , pReportName: ReportName
        , pReportType: 'Print'
    };

    var win = window.open("", "_blank");

    url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
        + '&query=' + pParametersWithValues.query + ''
        + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
        + '&arr_Values=' + pParametersWithValues.arr_Values + ''
        + '&pReportName=' + pParametersWithValues.pReportName + ''
        + '&pReportType=' + pParametersWithValues.pReportType + '';

    win.location = url;

}
/*************************************Details*******************************************/
function WHInvoiceDetails_BindTableRows(pInvoiceDetails) {
    ClearAllTableRows("tblWHInvoiceDetails");
    var totalAmount = 0;
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pInvoiceDetails, function (i, item) {
        totalAmount += Number(item.Amount);
        AppendRowtoTable("tblWHInvoiceDetails",
        ("<tr ID='" + item.ID + "' " + (1 == 1 ? ("ondblclick='WHInvoiceDetails_FillModalControls(" + item.ID + ");'") : "") + ">"
            + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
            + "<td class='InvoiceID hide'>" + item.InvoiceID + "</td>"
            + "<td class='ChargeTypeID hide'>" + (item.ChargeTypeID == 0 ? "" : item.ChargeTypeID) + "</td>"
            + "<td class='ChargeTypeName'>" + (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) + "</td>"
            + "<td class='ReceiveID hide'>" + item.ReceiveID + "</td>"
            + "<td class='ReceiveCode'>" + (item.ReceiveCode == 0 ? "" : item.ReceiveCode) + "</td>"
            + "<td class='PickupID hide'>" + item.PickupID + "</td>"
            + "<td class='PickupCode'>" + (item.PickupCode == 0 ? "" : item.PickupCode) + "</td>"
            + "<td class='TransServiceID hide'>" + item.TransServiceID + "</td>"
            + "<td class='ServiceName'>" + (item.ServiceName == 0 ? "" : item.ServiceName) + "</td>"
            + "<td class='ContractDetailsID hide'>" + item.ContractDetailsID + "</td>"
            + "<td class='ContractCode hide'>" + (item.ContractCode == 0 ? "" : item.ContractCode) + "</td>"
            + "<td class='SpacePerPallet hide'>" + item.SpacePerPallet + "</td>"
            + "<td class='Days hide'>" + item.Days + "</td>"
            + "<td class='Qty'>" + item.Qty + "</td>"
            + "<td class='Rate'>" + item.Rate + "</td>"
            + "<td class='Amount'>" + item.Amount + "</td>"
            + "<td class='Notes hide'>" + (item.Notes ? item.Notes : "" ) + "</td>"
            + "<td class='hide'><a href='#WHInvoiceDetailsModal' data-toggle='modal' onclick='WHInvoiceDetails_FillModalControls(" + item.ID + ");' " + editControlsText + "</a></td>"
        + "</tr>"));
    });
    if ($('#txtAmount').val() != totalAmount)
        $('#txtAmount').val(totalAmount);
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblWHInvoiceDetails", "ID", "cb-CheckAll-WHInvoiceDetails");
    CheckAllCheckbox("HeaderDeleteWHInvoiceDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function WHInvoiceDetails_FillModalControls(pInvoiceDetailsID) {
    debugger;
    if (ValidateForm("form", "WHInvoiceModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pWhereClauseCurrencyDetails: ("WHERE ID=" + $("#slCurrency").val() + " AND '" + GetDateWithFormatyyyyMMdd($("#txtInvoiceDate").val()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                    + " AND '" + GetDateWithFormatyyyyMMdd($("#txtInvoiceDate").val()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                    + " ORDER BY CODE"
                  )
        };
        CallGETFunctionWithParameters("/api/Currencies/LoadCurrencyDetails", pParametersWithValues
            , function (pData) {
                if (pData[0] == "[]") {
                    $("#txtExchangeRate").val(0);
                    swal("Sorry", "Exchange rate is not set for " + $("#slCurrency option:selected").text() + " in the Master Data.");
                    FadePageCover(false);
                }
                else {
                    ClearAll("#WHInvoiceDetailsModal");
                    var pReceiveID = null;
                    var pPickupID = null;
                    var pContractID = null;
                    var pChargeTypeID = null;
                    if (pInvoiceDetailsID != 0) {
                        var tr = $("#tblWHInvoiceDetails tr[ID=" + pInvoiceDetailsID + "]");
                        var pReceiveID = $(tr).find("td.ReceiveID").text();
                        var pPickupID = $(tr).find("td.PickupID").text();
                        var pContractID = $(tr).find("td.ContractDetailsID").text();
                        var pChargeTypeID = $(tr).find("td.ChargeTypeID").text();
                        $("#hWHInvoiceDetailsID").val(pInvoiceDetailsID);
                        $("#slWHInvoiceDetailsChargeType").val($(tr).find("td.ChargeTypeID").text());
                        if ($("#slWHInvoiceDetailsChargeType").val() == null) //to handle the case that the item flag IsWarehouseChargeType=0
                            $("#slWHInvoiceDetailsChargeType").val("");
                        $("#txtWHInvoiceDetailsSpacePerPallet").val($(tr).find("td.SpacePerPallet").text());
                        $("#txtWHInvoiceDetailsDays").val($(tr).find("td.Days").text());
                        $("#txtWHInvoiceDetailsQty").val($(tr).find("td.Qty").text());
                        $("#txtWHInvoiceDetailsRate").val($(tr).find("td.Rate").text());
                        $("#txtWHInvoiceDetailsAmount").val($(tr).find("td.Amount").text());
                        $("#txtWHInvoiceDetailsNotes").val($(tr).find("td.Notes").text());
                    }
                        $("#txtWHInvoiceDetailsDays").val(1);
                    $("#txtWHInvoiceDetailsSpacePerPallet").val(1);
                    $("#txtExchangeRate").val(JSON.parse(pData[0])[0].ExchangeRate);
                    $("#btnSaveWHInvoiceDetails").attr("onclick", "WHInvoiceDetails_Save(false);");
                    $("#btnSaveAndAddNewWHInvoiceDetails").attr("onclick", "WHInvoiceDetails_Save(true);");
                    jQuery("#WHInvoiceDetailsModal").modal("show");
                    var pParametersWithValues = {
                        pIsLoadArrayOfObjects: $("#slWHInvoiceDetailsReceive option").length < 2 ? true : false
                        , pCustomerID: $("#slCustomer").val()
                        , pInvoiceDetailsID: 0
                    };
                    CallGETFunctionWithParameters("/api/WHInvoice/InvoiceDetails_FillModal", pParametersWithValues
                        , function (pData) {
                            var pInvoiceDetails = JSON.parse(pData[0]);
                            var pReceive = pData[1];
                            var pPickup = pData[2];
                            var pContract = pData[3];
                            if ($("#slWHInvoiceDetailsReceive option").length < 2) {
                                FillListFromObject(pReceiveID, 1, "<--Select-->", "slWHInvoiceDetailsReceive", pReceive, null);
                                FillListFromObject(pPickupID, 1, "<--Select-->", "slWHInvoiceDetailsPickup", pPickup, null);
                                FillListFromObject(pContractID, 1, "<--Select-->", "slWHInvoiceDetailsContract", pContract, null);
                            }
                            FadePageCover(false);
                        }
                        , null);
                }
            }
            , null);
    }
}
function WHInvoiceDetails_Save(pSaveAndNew) {
    debugger;
    //if ($("#hID").val() == "")
    //    swal("Sorry", "Please, save header first.");
    //else 
    if ($("#txtWHInvoiceDetailsSpacePerPallet").val() == 0 || $("#txtWHInvoiceDetailsDays").val() == 0 || $("#txtWHInvoiceDetailsRate").val() == 0)
        swal("Sorry", "Amount can not be 0.");
    else if (ValidateForm("form", "WHInvoiceDetailsModal")) { //test here for exchange rate
        FadePageCover(true);
        var pParametersWithValues = {
            pInvoiceID: $("#hID").val() == "" ? 0 : $("#hID").val()
            , pWarehouseID: $("#slWarehouse").val()
            , pCustomerID: $("#slCustomer").val()
            , pContractID: 0
            , pInvoiceDate: $("#txtInvoiceDate").val()
            , pCurrencyID: $("#slCurrency").val()
            , pExchangeRate: $("#txtExchangeRate").val()
            , pNotes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()
            , pIsPosted: $("#cbIsPosted").prop("checked")
            , pPostDate: "01/01/1900"
            //Details
            , pInvoiceDetailsID: $("#hWHInvoiceDetailsID").val() == "" ? 0 : $("#hWHInvoiceDetailsID").val()
            , pInvoiceDetailsReceiveID: $("#slWHInvoiceDetailsReceive").val() == "" ? 0 : $("#slWHInvoiceDetailsReceive").val()
            , pInvoiceDetailsPickupID: $("#slWHInvoiceDetailsPickup").val() == "" ? 0 : $("#slWHInvoiceDetailsPickup").val()
            , pInvoiceDetailsChargeTypeID: $("#slWHInvoiceDetailsChargeType").val() == "" ? 0 : $("#slWHInvoiceDetailsChargeType").val()
            , pInvoiceDetailsContractDetailsID: $("#slWHInvoiceDetailsContract").val() == "" ? 0 : $("#slWHInvoiceDetailsContract").val()
            , pInvoiceDetailsSpacePerPallet: $("#txtWHInvoiceDetailsSpacePerPallet").val() == "" ? 0 : $("#txtWHInvoiceDetailsSpacePerPallet").val()
            , pInvoiceDetailsDays: $("#txtWHInvoiceDetailsDays").val() == "" ? 0 : $("#txtWHInvoiceDetailsDays").val()
            , pInvoiceDetailsRate: $("#txtWHInvoiceDetailsRate").val() == "" ? 0 : $("#txtWHInvoiceDetailsRate").val()
            , pInvoiceDetailsNotes: $("#txtWHInvoiceDetailsNotes").val().trim() == "" ? 0 : $("#txtWHInvoiceDetailsNotes").val().trim().toUpperCase()
            , pInvoiceDetailsQty: $("#txtWHInvoiceDetailsQty").val() > 0 ? $("#txtWHInvoiceDetailsQty").val():0
        };
        CallGETFunctionWithParameters("/api/WHInvoice/InvoiceDetails_Save", pParametersWithValues
            , function (pData) {
                var _ReturnedMessage = pData[0];
                if (_ReturnedMessage == "") {
                    var pInvoiceDetails = JSON.parse(pData[1]);
                    var pHeader = JSON.parse(pData[2]);
                    $("#hID").val(pHeader.ID);
                    $("#lblShown").html(": " + pHeader.Code);
                    $("#txtAmount").val(pHeader.Amount.toFixed(2));
                    //$(".classDisableForPosted").attr("disabled", "disabled");
                    $(".classDisableForDetails").attr("disabled", "disabled");
                    WHInvoiceDetails_BindTableRows(pInvoiceDetails);
                    WHInvoice_LoadingWithPaging();
                    if (pSaveAndNew) {
                        ClearAll("#WHInvoiceDetailsModal");
                        $("#txtWHInvoiceDetailsDays").val(1);
                        $("#txtExchangeRate").val(1);
                    }
                    else
                        jQuery("#WHInvoiceDetailsModal").modal("hide");
                    swal("Success", "Saved successfully.");
                }
                else {
                    swal("Sorry", _ReturnedMessage);
                    FadePageCover(false);
                }
            }
            , null);
    }
}
function WHInvoiceDetails_DeleteList() {
    debugger;
    var pDeletedWHInvoiceDetailsIDs = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblWHInvoiceDetails", "Delete");
    if (pDeletedWHInvoiceDetailsIDs != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        //callback function in case of confirm delete
        function () {
            if (ValidateForm("form", "WHInvoiceModal")) {
                FadePageCover(true);
                var pParametersWithValues = {
                    pDeletedWHInvoiceDetailsIDs: pDeletedWHInvoiceDetailsIDs
                    //Header
                    , pInvoiceID: $("#hID").val() == "" ? 0 : $("#hID").val()
                    , pWarehouseID: $("#slWarehouse").val() == "" ? 0 : $("#slWarehouse").val()
                    , pCustomerID: $("#slCustomer").val() == "" ? 0 : $("#slCustomer").val()
                    , pContractID: 0 //$("#slContract").val() == "" ? 0 : $("#slContract").val()
                    , pInvoiceDate: $("#txtInvoiceDate").val()
                    , pCurrencyID: $("#slCurrency").val()
                    , pExchangeRate: $("#txtExchangeRate").val()
                    , pNotes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()
                };
                CallGETFunctionWithParameters("/api/WHInvoice/InvoiceDetails_Delete", pParametersWithValues
                    , function (pData) {
                        if (pData[0]) {
                            var pHeader = JSON.parse(pData[1]);
                            var pInvoiceDetails = JSON.parse(pData[2]);
                            WHInvoice_LoadingWithPaging();
                            WHInvoiceDetails_BindTableRows(pInvoiceDetails);
                            $("#txtAmount").val(pHeader.Amount.toFixed(2));
                        }
                        else
                            swal("Sorry", "Connection failed, please try again.");
                        FadePageCover(false);
                    }
                    , null);
            }
        });//of swal
}
function WHInvoiceDetails_CalculateAmount() {
    debugger;
    var _SpacePerPallet = $("#txtWHInvoiceDetailsSpacePerPallet").val() == "" ? 0 : parseFloat($("#txtWHInvoiceDetailsSpacePerPallet").val()).toFixed(2);
    var _Days = $("#txtWHInvoiceDetailsDays").val() == "" ? 0 : parseFloat($("#txtWHInvoiceDetailsDays").val()).toFixed(2);
    var _Rate = $("#txtWHInvoiceDetailsRate").val() == "" ? 0 : parseFloat($("#txtWHInvoiceDetailsRate").val()).toFixed(2);
    var _Qty = $("#txtWHInvoiceDetailsQty").val() > 0 ?parseFloat($("#txtWHInvoiceDetailsQty").val()).toFixed(2):0;
    var _Amount = _SpacePerPallet * _Days * _Qty * _Rate;
    $("#txtWHInvoiceDetailsAmount").val(_Amount.toFixed(2));
}

function GetTransServices() {
    debugger;
    if (!($('#slCustomer').val() > 0)) {
        swal('Sorry', 'Please, Select Customer');
        return;
    }
    var customerId = $('#slCustomer').val();
    var date = $('#txtInvoiceDate').val();
    var year = date.slice(6,10);  
    var month = date.slice(3, 5);  
    var whereClause = `where CustomerID=${customerId} and ( Year(CreationDate)=${year} and month(CreationDate)=${month} or (${year} >= YEAR(CreationDate) and ${month} > MONTH(CreationDate)) or CreationDate is null ) and '${ConvertDateFormat(date)}' between ContractDateFrom and ContractDateTo and IsContractApproved=1 Order By PickupID,ReceiveID`;
    FadePageCover(true);
  
    CallGETFunctionWithParameters("/api/WHInvoice/GetTransServices", {pWhereClause:whereClause}
        , function (pData) {
            if (pData) {
                var data = JSON.parse(pData);
                WHInvoiceDetails_BindTableRows(data);
            }
            else
                swal("Sorry", "Connection failed, please try again.");
            FadePageCover(false);
        }
        , null);
}