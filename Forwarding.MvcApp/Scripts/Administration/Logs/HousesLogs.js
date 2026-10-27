//1: Excel File
//2: Excel File Without Formatting
//3: PDF File
//4: Rich Text Format Document
//5: Word Document
var TodaysDate = new Date();
var FormattedTodaysDate = TodaysDate.toLocaleDateString();

function HousesLogs_LoadHouses() {
    debugger;
    let MasterOperationID = $("#slMasterOperations").val();
    if (MasterOperationID == '') {
        swal(strSorry, "Please Choose a Master Operation");
    } else {
        let pWhereClause = " WHERE MasterOperationID=" + MasterOperationID + " AND BLType = " + constHouseBLType;
        let pOrderBy = " ID DESC ";
        let pControllerParameters = {
            pIsLoadArrayOfObjects: false
            , pPageNumber: 1
            , pPageSize: 999
            , pWhereClause: pWhereClause
            , pIsBindTableRows: false
            , pWhereClause_Routings: "0"
            , pOrderBy: "ID DESC"
        }
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "api/Operations/LoadWithWhereClause", pWhereClause, "ID DESC", 1, 999, pControllerParameters
            , function (pData) {
                HousesLogs_BindTableRows(JSON.parse(pData[0]));
            });


    }
    

}

function HousesLogs_BindTableRows(pOperations) {
    ClearAllTableRows("tblOperations");
    debugger;
    let copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Copy" + "</span>";
    let printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
    let transferControlsText = " class='btn btn-xs btn-rounded btn-info float-right " + (OEDoc ? "" : " hide ") + "' > <i class='fa fa-exchange' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Transfer" + "</span>";

    var downloadControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-cloud-download' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Download Log" + "</span>";

    $.each(pOperations, function (i, item) {
        
        AppendRowtoTable("tblOperations",

            ("<tr ID='" + item.ID + "' >"//of tr

                + "<td class='MasterOperationID hide' val='" + item.MasterOperationID + "'>" + item.MasterOperationID + "</td>"
                + "<td class='DirectionType hide'>" + item.DirectionType + "</td>"
                + "<td class='shownDirectionIconName'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-2x'/><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/></td>"
                + "<td class='TransportType hide'>" + item.TransportType + "</td>"
                + "<td class='Code'>" + (item.Code == 0 ? item.MasterOperationCode : item.Code) + "</td>"
                + "<td class='MasterBL'>" + (item.MasterBL == 0 ? "" : item.MasterBL) + "</td>"
                + "<td class='HouseNumber'>" + (item.HouseNumber == 0 ? "" : item.HouseNumber) + "</td>"
                + "<td class='OpenedBy " + (1 == 1 ? " hide " : "  ") + "' val='" + item.CreatorUserID + "'>" + item.OpenedBy + "</td>"
                + "<td class='shownOpenDate hide'>"
                + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.OpenDate))
                + "</td>"
                + "<td class='Reference hide'>" + (pDefaults.UnEditableCompanyName == "KDM" ? (item.ReleaseNumber == 0 ? "" : item.ReleaseNumber) : (item.Reference == 0 ? "" : item.Reference)) + "</td>"
                + "<td class='Client'>" + (item.BookingPartyName != 0 && item.BLType == constMasterBLType ? item.BookingPartyName : (item.ClientName == 0 ? "" : item.ClientName)) + "</td>"
                + "<td class='Shipper hide' val='" + item.ShipperID + "'>" + item.ShipperName + "</td>"
                + "<td class='ShipperAddress hide' val='" + item.ShipperAddressID + "'>" + item.ShipperAddressID + "</td>"
                + "<td class='ShipperContact hide' val='" + item.ShipperContactID + "'>" + item.ShipperContactID + "</td>"
                + "<td class='Consignee hide' val='" + item.ConsigneeID + "'>" + item.ConsigneeName + "</td>"
                + "<td class='ConsigneeAddress hide' val='" + item.ConsigneeAddressID + "'>" + item.ConsigneeAddressID + "</td>"
                + "<td class='ConsigneeContact hide' val='" + item.ConsigneeContactID + "'>" + item.ConsigneeContactID + "</td>"
                + "<td class='Agent hide' val='" + item.AgentID + "'>" + item.AgentName + "</td>"
                + "<td class='AgentAddress hide' val='" + item.AgentAddressID + "'>" + item.AgentAddressID + "</td>"
                + "<td class='AgentContact hide' val='" + item.AgentContactID + "'>" + item.AgentContactID + "</td>"

                + "<td class='Routing'>" + (item.POLName + " > " + item.PODName) + "</td>"
                + "<td class='POL hide' val='" + item.POL + "'>" + item.POLCode + "</td>"
                + "<td class='POD hide' val='" + item.POD + "'>" + item.PODCode + "</td>"
                + "<td class='Incoterm hide' val='" + item.IncotermID + "'>" + item.IncotermName + "</td>"
                + "<td class='OperationPOrC hide' val='" + item.POrC + "'>" + item.POrC + "</td>"
                + "<td class='Commodity hide' val='" + item.CommodityID + "'>" + item.CommoditymName + "</td>"
                + "<td class='TransientTime hide'>" + item.TransientTime + "</td>"
                + "<td class='CloseDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CloseDate)) + "</td>"
                //ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL
                + "<td class='ShipmentType' val='" + item.ShipmentType + "'>" + GetShipmentType(item.ShipmentType) + " " + item.RepBLTypeShown + "</td>"
                + "<td class='shownCutOffDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                + " <i class='fa fa-calendar'></i>"
                //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate)) + "</small>"
                + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CutOffDate)) + "</small>"
                + "</span>"
                + "</td>"
                + "<td class='CutOffDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CutOffDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate))) + "</td>"
                + "<td class='Volume hide'>" + item.Volume + "</td>"
                + "<td class='IncludePickup hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludePickup == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='PickupAddress hide' val='" + item.PickupAddressID + "'>" + item.PickupAddressID + "</td>"
                + "<td class='IncludeDelivery hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludeDelivery == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='DeliveryAddress hide' val='" + item.DeliveryAddressID + "'>" + item.DeliveryAddressID + "</td>"

                + "<td class='GrossWeight'>" + item.GrossWeight + "</td>"
                + "<td class='Volume hide'>" + item.Volume + "</td>"
                + "<td class='ChargeableWeight hide'>" + item.ChargeableWeight + "</td>" //shown as Wt/Msr(MT) incase of ocean or inland
                + "<td class='IsDangerousGoods hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDangerousGoods == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                + "<td class='BookingNumbers hide'>" + item.BookingNumbers + "</td>"
                + "<td class='NumberOfPackages hide'>" + (item.ContainerTypes == 0 ? (item.PackageTypes == 0 ? "" : item.PackageTypes) : item.ContainerTypes) + "</td>"
                + "<td class='MoveType " + (1 == 1 ? "hide" : "") + "'>" + (item.MoveTypeCode == 0 ? "" : item.MoveTypeCode) + "</td>"
                + "<td class='OperationStage hide' val='" + item.OperationStageID + "'>"
                + (item.OperationStageID == CancelledQuoteAndOperStageID
                    ? item.OperationStageName //cancelled operation
                    : (Date.prototype.compareDates(FormattedTodaysDate, GetDateWithFormatMDY(item.CloseDate)) <= 0
                        ? "CLOSED" //closed operation
                        : item.OperationStageName)
                ) + "</td>"
                + "<td class='Salesman hide' val='" + item.SalesmanID + "'>" + item.Salesman + "</td>"
                + "<td class='OperationMan hide' val='" + item.OperationManID + "'>" + item.OperationMan + "</td>"
                + "<td class='AgreedRate hide'>" + (item.AgreedRate == "0" ? "" : item.AgreedRate) + "</td>"
                + "<td class='CustomerReference hide'>" + (item.CustomerReference == "0" ? "" : item.CustomerReference) + "</td>"
                + "<td class='SupplierReference hide'>" + (item.SupplierReference == "0" ? "" : item.SupplierReference) + "</td>"
                + "<td class='PONumber hide'>" + (item.PONumber == "0" ? "" : item.PONumber) + "</td>"
                + "<td class='CertificateNumber hide'>" + (item.CertificateNumber == "0" ? "" : item.CertificateNumber) + "</td>"
                + "<td class='IsAWB hide'> <input type='checkbox' id='cbIsAWB" + item.ID + "' disabled='disabled' " + (item.IsAWB ? " checked='checked' " : "") + " /></td>"
                + "<td class='QuotationRouteID hide' val='" + item.QuotationRouteID + "'>" + (item.QuotationRouteID == 0 ? "" : item.QuotationCode.substr(8, 9)) + "</td>"
                + "<td class='AWB " + (pDefaults.UnEditableCompanyName == "VEN" ? "" : "hide") + "'>" + (item.MAWBSuffix == "0" ? "" : item.AirlinePrefix + ">" + item.MAWBSuffix) + "</td>"
                //+ "<td class='hide'><a onclick='SwitchToOperationsEditView(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "<td class='InvoiceNumbers'>" + (item.InvoiceNumbers == 0 ? "" : item.InvoiceNumbers) + "</td>"
                + "<td class='ContainerTypes20 hide'>" + (item.ContainerTypes20 == "0" ? "" : item.ContainerTypes20) + "</td>"
                + "<td class='ContainerTypes40 hide'>" + (item.ContainerTypes40 == "0" ? "" : item.ContainerTypes40) + "</td>"
                + "<td class=''>"

                + `<td class=''><a href='/api/HousesLogs/GetLog?pID=${item.ID}&pTableName=vwOperations' target='_blank' ${downloadControlsText} </a></td>`

                + "</td>"
                + "</tr>"));


    });



    if (OD) $("#btn-Delete").removeClass("hide"); else $("#btn-Delete").addClass("hide");

    BindAllCheckboxonTable("tblOperations", "ID2");//it attaches function to the checkboxes so when all are checked then check cb-checkall too
    CheckAllCheckbox("ID2");
    //HighlightText("#tblOperations>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
        strDeleteFailMessage = "This command is not completed because of dependencies existance."
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
    FadePageCover(false); //to quickly fade before filters are filled(user psycology)
    //i put FillListWithNames in the LoadView so the value remains unchanged
    ////parameters (pStrFnName, pStrFirstRow, pListName)
    //FillListWithNames("/api/NoAccessQuoteAndOperStages/LoadAll", "ALL STAGES", "ulOperationStages");

    //GetListWithNameAndWhereClause(null, "/api/DocumentTypes/LoadAll", "<-- Select Document Type -->", "slDocsOutTypesOutsideModal", " WHERE 1=1 AND Name <> 'HBL' AND IsDocOut = 1 ORDER BY ViewOrder,TableOrViewName ");
    //DocsOut_LoadAll(0, "slDocsOutTypesOutsideModal");


}

function HousesLogs_GetFilterWhereClause() {
    var pWhereClause = "";
    //var pOperationStageFilter = ($("#slOperationStages").val() == 0
    //                            ? "" //if 0 then all stages
    //                            : ($("#slOperationStages").val() == ClosedQuoteAndOperStageID.toString() ? (" (CloseDate <= GETDATE() AND OperationStageID <> " + /*This is to handle case of auto close*/CancelledQuoteAndOperStageID.toString() + ") ") : (" OperationStageID = " + $("#slOperationStages").val() + " AND CloseDate > GETDATE() "))
    //                            );

    pWhereClause += "WHERE 1=1 ";
    pWhereClause += $("#slOperation").val() == "" ? "" : (" AND OperationID = N'" + $("#slOperation").val() +"' ");
    pWhereClause += $("#slActionType").val() == "" ? "" : (" AND ActionType = N'" + $("#slActionType").val() + "' ");
    pWhereClause += $("#slLogFor").val() == "" ? "" : (" AND LogFor = N'" + $("#slLogFor").val() + "' ");
    pWhereClause += " AND CAST(ActionDate AS date) BETWEEN '" + GetDateWithFormatyyyyMMdd($("#txtFromOpenDate").val().trim()) + "' AND '" + GetDateWithFormatyyyyMMdd($("#txtToOpenDate").val().trim()) + "'";

    return pWhereClause;
}

function HousesLogs_DrawReport(data) {
    debugger;
    var pReportRows = JSON.parse(data[1]);

    var pReportTitle = "Operations Charges Logs";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();

    var mywindow = window.open('', '_blank');
    var ReportHTML = '';
    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
    ReportHTML += '<html>';
    ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body style="background-color:white;">';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

    ReportHTML += '             <div class="col-xs-3"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
    ReportHTML += '             <div class="col-xs-3"><b>Operation :</b> ' + $("#slOperation option:selected").text() + '</div>';
    ////ReportHTML += '                 <section class="panel panel-default">';
    //ReportHTML += '                     <div class="table-responsive">';
    ReportHTML += '                         <div> &nbsp; </div>'
    //ReportHTML += '                         <table id="tblHousesLogs" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
    ReportHTML += '                         <table id="tblHousesLogs" class="table table-striped text-sm table-bordered m-t-sm " style="border:solid #999 !important;">';//style="border:solid #000 !important;"
    ReportHTML += '                             <thead>';
    ReportHTML += '                                 <tr class="" style="font-size:95%;">';
    ReportHTML += '                                     <th>User</th>';
    ReportHTML += '                                     <th>Log For</th>';
    ReportHTML += '                                     <th>Action</th>';
    ReportHTML += '                                     <th>Action Taken</th>';
    ReportHTML += '                                 </tr>';
    ReportHTML += '                             </thead>';
    ReportHTML += '                             <tbody>';
    //debugger;
    //$.each(JSON.parse(pReportRows), function (i, item) { debugger; });
    $.each((pReportRows), function (i, item) {
        ReportHTML += '                                     <tr style="font-size:95%;">';
        ReportHTML += '                                         <td>' + (item.UserName == 0 ? "" : item.UserName) + '</td>';
        ReportHTML += '                                         <td>' + (item.LogFor == constOperationLogForPay ? "Pay." : "Rec.") + '</td>';
        ReportHTML += '                                         <td>' + (item.ActionType == 'I' ? "Insert"
                                                                                    : (item.ActionType == 'U' ? "Update" : "Delete") 
                                                                        ) + '</td>';
        ReportHTML += '                                         <td>' + (item.ActionTaken == 0 ? "" : item.ActionTaken) + '</td>';
        //ReportHTML += '                                         <td>' + item.CostAmountSubTotal.toFixed(2) + '</td>';
        ReportHTML += '                                     </tr>';
    });
    ReportHTML += '                             </tbody>';
    ReportHTML += '                         </table>';
    //ReportHTML += '                     </div>';//of table-responsive
    //ReportHTML += '             <div class="col-xs-12"><b>Payables Summary :</b> ' + pPayablesCurrenciesSummary + '</div>';
    //ReportHTML += '             <div class="col-xs-12"><b>Invoices Summary :</b> ' + pReceivablesOrInvoicesCurrenciesSummary + '</div>';
    //ReportHTML += '             <div class="col-xs-12"><b>Profit Summary :</b> ' + pProfitCurrenciesSummary + '</div>';
    //ReportHTML += '             <div class="col-xs-12"><b>Profit Margin :</b> ' + pMarginSummary + '%</div>';

    ReportHTML += '         </body>';
    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
    ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
    //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
    //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
    //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
    ReportHTML += '     </footer>';

    ReportHTML += '</html>';
    mywindow.document.write(ReportHTML);
    mywindow.document.close();
}



function ConfigureAfterOperationChangeEvent() {
    $("#slMasterOperations").off('change').on('change', function () {

        if ($("#slMasterOperations").val() == $("#slMasterOperations option:selected").text()) {
            swal('اختيار عملية خاطئء - Is Not Correct Selected Operation');
            window.CurrentOperationID = null;
        }
        else {
            console.log("operation : " + $("#slMasterOperations").val() + " Is Selected");
            window.CurrentOperationID = $("#slMasterOperations").val();

        }
    }
    );

}

function IntializeOperationAutoCompleteSearch() {
    debugger;
    $("#slMasterOperations").css({ 'width': '100%' }).select2({
        minimumInputLength: 1,
        tags: [],
        ajax: {
            url: strServerURL + "/api/Operations/GetMasterOperationsByCode",
            dataType: 'json',
            type: "GET",
            contentType: "application/json; charset=utf-8",
            quietMillis: 50,
            data: function (params) {
                var query = {
                    term: params.term
                }

                return query;
            },
            processResults: function (data) {

                var d = JSON.parse(data[0]);
                return {
                    results: $.map(d, function (item) {
                        return {
                            text: item.Code,
                            id: item.ID,
                            value: item.ID,
                            pol: item.POL,
                            pod: item.POD
                        };
                    })
                };
            }
        }
    });
}