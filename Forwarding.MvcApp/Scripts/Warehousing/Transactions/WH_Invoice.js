function WH_Invoice_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "WH_Invoice_BindTableRows";
    strLoadWithPagingFunctionName = "/api/WH_Invoice/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    //var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pWhereClause = " WHERE 1=1";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/Transactions/WH_Invoice", "div-content", function () {
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                var pWarehouse = pData[2];
                var pCustomer = pData[3];
                var pChargeType = pData[4];
                FillListFromObject(null, 2, null/*pStrFirstRow*/, "slWarehouse", pWarehouse, function () { $("#slFilterWarehouse").html($("#slWarehouse").html()); });
                FillListFromObject(null, 2, "<--Select-->", "slCustomer", pCustomer, function () { $("#slFilterCustomer").html($("#slCustomer").html()); });
                FillListFromObject(null, (pDefaults.IsRepeatChargeTypeName ? 4 : 2), "<--Select-->"/*pStrFirstRow*/, "slWH_InvoiceDetailsChargeType", pChargeType, null);
                $("#slCurrency").html($("#hReadySlCurrencies").html());
                //$("#txtFilterFromInvoiceDate").val("01/01/2000");
                //$("#txtFilterToInvoiceDate").val(pFormattedTodaysDate);
                //$("#slCustomer").html($("#hReadySlCustomers").html());
                WH_Invoice_BindTableRows(JSON.parse(pData[0]));
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { WH_Invoice_ClearAllControls(); },
        function () { WH_Invoice_DeleteList(); });
}
function WH_Invoice_BindTableRows(pWH_Invoice) {
    debugger;
    ClearAllTableRows("tblWH_Invoice");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
    $.each(pWH_Invoice, function (i, item) {
        AppendRowtoTable("tblWH_Invoice",
        ("<tr ID='" + item.ID + "' ondblclick='WH_Invoice_FillAllControls(" + item.ID + ");'>"
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
                //+ "<a href='#WH_InvoiceModal' data-toggle='modal' onclick='WH_InvoiceFillControls(" + item.ID + ");' " + editControlsText + "</a>"
            + "<a href='#' data-toggle='modal' onclick='WH_Invoice_PrintFast(" + item.ID + ",true);' " + printControlsText.replace('Print', 'Print Details') + "</a>&emsp;"
            + "<a href='#' data-toggle='modal' onclick='WH_Invoice_PrintFast(" + item.ID + ",false);' " + printControlsText + "</a>"
            + "</td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWH_Invoice", "ID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblWH_Invoice>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function WH_Invoice_LoadingWithPaging() {
    debugger;
    var pWhereClause = WH_Invoice_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WH_Invoice_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWH_Invoice>tbody>tr", $("#txt-Search").val().trim());
}
function WH_Invoice_GetWhereClause() {
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
function WH_Invoice_ClearAllControls() {
    debugger;
    $("#tblWH_InvoiceDetails tbody").html("");
    //$("#lblWH_InvoiceMaxWeight").html("<span> : </span><span>" + 0 + "</span>");
    //$("#lblWH_InvoiceMaxVolume").html("<span> : </span><span>" + 0 + "</span>");
    ClearAll("#WH_InvoiceModal");

    $("#slCurrency").val(pDefaults.CurrencyID);
    $("#txtInvoiceDate").val(getTodaysDateInddMMyyyyFormat());
    $("#txtExchangeRate").val(1);
    $("#txtWH_InvoiceDetailsDays").val(1);
    $(".classDisableForPosted").removeAttr("disabled");
    $(".classDisableForDetails").removeAttr("disabled");

    $("#btnSave").attr("onclick", "WH_Invoice_Save(false);");
    $("#btnSaveAndAddNew").attr("onclick", "WH_Invoice_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
}
function WH_Invoice_FillAllControls(pID) {
    debugger;
    $("#tblWH_InvoiceDetails tbody").html("");
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_Invoice/LoadHeaderWithDetails", { pHeaderID: pID }
        , function (pData) {
            jQuery("#WH_InvoiceModal").modal("show");
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
            WH_InvoiceDetails_BindTableRows(pInvoiceDetails);
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
function WH_Invoice_Save(pSaveAndNew) {
    debugger;
    if ($("#hID").val() == "" && $('#tblWH_InvoiceDetails tbody tr').lenght==0)
        swal("Sorry", "Please, Add at least one invoice item.");
    else
        if (ValidateForm("form", "WH_InvoiceModal")) {
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
                        $('#tblWH_InvoiceDetails tbody tr').each(function () {
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
                        CallPOSTFunctionWithParameters("/api/WH_Invoice/Save", pParametersWithValues
                            , function (pData) {
                                var _ReturnedMessage = pData[0];
                                if (_ReturnedMessage == "") {
                                    var pHeader = JSON.parse(pData[1]);
                                    var pDetails = JSON.parse(pData[2]);
                                    $("#hID").val(pHeader.ID);
                                    $("#lblShown").html(": " + pHeader.Code);
                                    $("#txtAmount").val(pHeader.Amount.toFixed(2));
                                    WH_InvoiceDetails_BindTableRows(pDetails);
                                    WH_Invoice_LoadingWithPaging();
                                    //if (pSaveAndNew) {
                                    //    ClearAll("#WH_InvoiceModal");
                                    //    $("#txtWH_InvoiceDetailsDays").val(1);
                                    //    $("#txtExchangeRate").val(1);
                                    //    $(".classDisableForPosted").attr("disabled", "disabled");
                                    //    $(".classDisableForDetails").attr("disabled");
                                    //}
                                    //else
                                    //    jQuery("#WH_InvoiceModal").modal("hide");
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
function WH_Invoice_slCustomerChanged() {
    debugger;
    $("#slWH_InvoiceDetailsReceive").html("<option value=''><--Select--></option>");
    $("#slWH_InvoiceDetailsPickup").html("<option value=''><--Select--></option>");
    $("#slWH_InvoiceDetailsContract").html("<option value=''><--Select--></option>");
}
function WH_Invoice_Print(pID) {
    debugger;
    if (pID == 0)
        pID = $("#hID").val();
    if (pID == "") //this means new without saving
        swal("Sorry", "Please, Add at least one invoice item.");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/WH_Invoice/LoadHeaderWithDetails"
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
function WH_Invoice_PrintFast(pID, pDetails) {
    debugger;

    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("dummy");
    arr_Values.push("0");

    var ReportName = pDetails ? "WH_InvoiceSrvD" : "WH_InvoiceSrv";
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
function WH_InvoiceDetails_BindTableRows(pInvoiceDetails) {
    ClearAllTableRows("tblWH_InvoiceDetails");
    var totalAmount = 0;
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pInvoiceDetails, function (i, item) {
        totalAmount += Number(item.Amount);
        AppendRowtoTable("tblWH_InvoiceDetails",
        ("<tr ID='" + item.ID + "' " + (1 == 1 ? ("ondblclick='WH_InvoiceDetails_FillModalControls(" + item.ID + ");'") : "") + ">"
            + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
            + "<td class='ChargeTypeID hide'>" + (item.ChargeTypeID == 0 ? "" : item.ChargeTypeID) + "</td>"
            + "<td class='ChargeTypeName'>" + (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) + "</td>"
            + "<td class='Qty'>" + item.PalletCount + "</td>"
            + "<td class='Amount'>" + item.Amount + "</td>"
            + "<td class='hide'><a href='#WH_InvoiceDetailsModal' data-toggle='modal' onclick='WH_InvoiceDetails_FillModalControls(" + item.ID + ");' " + editControlsText + "</a></td>"
        + "</tr>"));
    });
    if ($('#txtAmount').val() != totalAmount)
        $('#txtAmount').val(totalAmount);
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblWH_InvoiceDetails", "ID", "cb-CheckAll-WH_InvoiceDetails");
    CheckAllCheckbox("HeaderDeleteWH_InvoiceDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function WH_InvoiceDetails_FillModalControls(pInvoiceDetailsID) {
    debugger;
    if (ValidateForm("form", "WH_InvoiceModal")) {
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
                    ClearAll("#WH_InvoiceDetailsModal");
                    var pReceiveID = null;
                    var pPickupID = null;
                    var pContractID = null;
                    var pChargeTypeID = null;
                    if (pInvoiceDetailsID != 0) {
                        var tr = $("#tblWH_InvoiceDetails tr[ID=" + pInvoiceDetailsID + "]");
                        var pReceiveID = $(tr).find("td.ReceiveID").text();
                        var pPickupID = $(tr).find("td.PickupID").text();
                        var pContractID = $(tr).find("td.ContractDetailsID").text();
                        var pChargeTypeID = $(tr).find("td.ChargeTypeID").text();
                        $("#hWH_InvoiceDetailsID").val(pInvoiceDetailsID);
                        $("#slWH_InvoiceDetailsChargeType").val($(tr).find("td.ChargeTypeID").text());
                        if ($("#slWH_InvoiceDetailsChargeType").val() == null) //to handle the case that the item flag IsWarehouseChargeType=0
                            $("#slWH_InvoiceDetailsChargeType").val("");
                        $("#txtWH_InvoiceDetailsSpacePerPallet").val($(tr).find("td.SpacePerPallet").text());
                        $("#txtWH_InvoiceDetailsDays").val($(tr).find("td.Days").text());
                        $("#txtWH_InvoiceDetailsQty").val($(tr).find("td.Qty").text());
                        $("#txtWH_InvoiceDetailsRate").val($(tr).find("td.Rate").text());
                        $("#txtWH_InvoiceDetailsAmount").val($(tr).find("td.Amount").text());
                        $("#txtWH_InvoiceDetailsNotes").val($(tr).find("td.Notes").text());
                    }
                        $("#txtWH_InvoiceDetailsDays").val(1);
                    $("#txtWH_InvoiceDetailsSpacePerPallet").val(1);
                    $("#txtExchangeRate").val(JSON.parse(pData[0])[0].ExchangeRate);
                    $("#btnSaveWH_InvoiceDetails").attr("onclick", "WH_InvoiceDetails_Save(false);");
                    $("#btnSaveAndAddNewWH_InvoiceDetails").attr("onclick", "WH_InvoiceDetails_Save(true);");
                    jQuery("#WH_InvoiceDetailsModal").modal("show");
                    var pParametersWithValues = {
                        pIsLoadArrayOfObjects: $("#slWH_InvoiceDetailsReceive option").length < 2 ? true : false
                        , pCustomerID: $("#slCustomer").val()
                        , pInvoiceDetailsID: 0
                    };
                    CallGETFunctionWithParameters("/api/WH_Invoice/InvoiceDetails_FillModal", pParametersWithValues
                        , function (pData) {
                            var pInvoiceDetails = JSON.parse(pData[0]);
                            var pReceive = pData[1];
                            var pPickup = pData[2];
                            var pContract = pData[3];
                            if ($("#slWH_InvoiceDetailsReceive option").length < 2) {
                                FillListFromObject(pReceiveID, 1, "<--Select-->", "slWH_InvoiceDetailsReceive", pReceive, null);
                                FillListFromObject(pPickupID, 1, "<--Select-->", "slWH_InvoiceDetailsPickup", pPickup, null);
                                FillListFromObject(pContractID, 1, "<--Select-->", "slWH_InvoiceDetailsContract", pContract, null);
                            }
                            FadePageCover(false);
                        }
                        , null);
                }
            }
            , null);
    }
}
function WH_InvoiceDetails_Save(pSaveAndNew) {
    debugger;
    //if ($("#hID").val() == "")
    //    swal("Sorry", "Please, save header first.");
    //else 
    if ($("#txtWH_InvoiceDetailsSpacePerPallet").val() == 0 || $("#txtWH_InvoiceDetailsDays").val() == 0 || $("#txtWH_InvoiceDetailsRate").val() == 0)
        swal("Sorry", "Amount can not be 0.");
    else if (ValidateForm("form", "WH_InvoiceDetailsModal")) { //test here for exchange rate
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
            , pInvoiceDetailsID: $("#hWH_InvoiceDetailsID").val() == "" ? 0 : $("#hWH_InvoiceDetailsID").val()
            , pInvoiceDetailsReceiveID: $("#slWH_InvoiceDetailsReceive").val() == "" ? 0 : $("#slWH_InvoiceDetailsReceive").val()
            , pInvoiceDetailsPickupID: $("#slWH_InvoiceDetailsPickup").val() == "" ? 0 : $("#slWH_InvoiceDetailsPickup").val()
            , pInvoiceDetailsChargeTypeID: $("#slWH_InvoiceDetailsChargeType").val() == "" ? 0 : $("#slWH_InvoiceDetailsChargeType").val()
            , pInvoiceDetailsContractDetailsID: $("#slWH_InvoiceDetailsContract").val() == "" ? 0 : $("#slWH_InvoiceDetailsContract").val()
            , pInvoiceDetailsSpacePerPallet: $("#txtWH_InvoiceDetailsSpacePerPallet").val() == "" ? 0 : $("#txtWH_InvoiceDetailsSpacePerPallet").val()
            , pInvoiceDetailsDays: $("#txtWH_InvoiceDetailsDays").val() == "" ? 0 : $("#txtWH_InvoiceDetailsDays").val()
            , pInvoiceDetailsRate: $("#txtWH_InvoiceDetailsRate").val() == "" ? 0 : $("#txtWH_InvoiceDetailsRate").val()
            , pInvoiceDetailsNotes: $("#txtWH_InvoiceDetailsNotes").val().trim() == "" ? 0 : $("#txtWH_InvoiceDetailsNotes").val().trim().toUpperCase()
            , pInvoiceDetailsQty: $("#txtWH_InvoiceDetailsQty").val() > 0 ? $("#txtWH_InvoiceDetailsQty").val():0
        };
        CallGETFunctionWithParameters("/api/WH_Invoice/InvoiceDetails_Save", pParametersWithValues
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
                    WH_InvoiceDetails_BindTableRows(pInvoiceDetails);
                    WH_Invoice_LoadingWithPaging();
                    if (pSaveAndNew) {
                        ClearAll("#WH_InvoiceDetailsModal");
                        $("#txtWH_InvoiceDetailsDays").val(1);
                        $("#txtExchangeRate").val(1);
                    }
                    else
                        jQuery("#WH_InvoiceDetailsModal").modal("hide");
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
function WH_InvoiceDetails_DeleteList() {
    debugger;
    var pDeletedWH_InvoiceDetailsIDs = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblWH_InvoiceDetails", "Delete");
    if (pDeletedWH_InvoiceDetailsIDs != "")
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
            if (ValidateForm("form", "WH_InvoiceModal")) {
                FadePageCover(true);
                var pParametersWithValues = {
                    pDeletedWH_InvoiceDetailsIDs: pDeletedWH_InvoiceDetailsIDs
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
                CallGETFunctionWithParameters("/api/WH_Invoice/InvoiceDetails_Delete", pParametersWithValues
                    , function (pData) {
                        if (pData[0]) {
                            var pHeader = JSON.parse(pData[1]);
                            var pInvoiceDetails = JSON.parse(pData[2]);
                            WH_Invoice_LoadingWithPaging();
                            WH_InvoiceDetails_BindTableRows(pInvoiceDetails);
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
function WH_InvoiceDetails_CalculateAmount() {
    debugger;
    var _SpacePerPallet = $("#txtWH_InvoiceDetailsSpacePerPallet").val() == "" ? 0 : parseFloat($("#txtWH_InvoiceDetailsSpacePerPallet").val()).toFixed(2);
    var _Days = $("#txtWH_InvoiceDetailsDays").val() == "" ? 0 : parseFloat($("#txtWH_InvoiceDetailsDays").val()).toFixed(2);
    var _Rate = $("#txtWH_InvoiceDetailsRate").val() == "" ? 0 : parseFloat($("#txtWH_InvoiceDetailsRate").val()).toFixed(2);
    var _Qty = $("#txtWH_InvoiceDetailsQty").val() > 0 ?parseFloat($("#txtWH_InvoiceDetailsQty").val()).toFixed(2):0;
    var _Amount = _SpacePerPallet * _Days * _Qty * _Rate;
    $("#txtWH_InvoiceDetailsAmount").val(_Amount.toFixed(2));
}

function GetTrans() {
    debugger;
    if (!($('#slCustomer').val() > 0)) {
        swal('Sorry', 'Please, Select Customer');
        return;
    }
    var customerId = $('#slCustomer').val();
    var date = $('#txtInvoiceDate').val();

    FadePageCover(true);
  
    CallGETFunctionWithParameters("/api/WH_Invoice/GetTrans", { pCustomerID: customerId, pInvoiceDate: PadDateWithZeroes(date,true)}
        , function (pData) {
            if (pData) {
                var data = JSON.parse(pData);
                WH_InvoiceDetails_BindTableRows(data);
            }
            else
                swal("Sorry", "Connection failed, please try again.");
            FadePageCover(false);
        }
        , null);
}