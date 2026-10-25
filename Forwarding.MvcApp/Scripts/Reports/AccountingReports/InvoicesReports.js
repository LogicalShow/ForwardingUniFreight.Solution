
//1: Excel File
//2: Excel File Without Formatting
//3: PDF File
//4: Rich Text Format Document
//5: Word Document
var TodaysDate = new Date();
var FormattedTodaysDate = TodaysDate.toLocaleDateString();

// for EISAS
const InvoiceTypes_INV = [6, 29, 30, 12];
const InvoiceTypes_DN = [15, 31];
const InvoiceTypes_ACF = [13];
var ETDPOL = "";
var ETAPOD = "";
var ACID = "";
var shipperName = "";
var VoucherCode = "";



$(document).ready(function ()
{
    debugger;
    if (pDefaults == undefined)
        LoadDefaults("/api/Defaults/LoadAll", "WHERE 1=1", function () { InvoicesReports_Print("PrintInReportBody"); });
});
function InvoicesReports_Initialize() {
    debugger;
    LoadView("/Reports/InvoicesReports", "div-content", function () {
        if (!pDefaults.IsTaxOnItems)
            $(".classShowForTaxOnHeader").removeClass("hide");

            if(pDefaults.UnEditableCompanyName == "HAN")
                $('.showForHAN').removeClass('hide');



        if (pDefaults.UnEditableCompanyName == "ARK")
                $('.showForARK').removeClass('hide');

        if (pDefaults.UnEditableCompanyName == "MES") {
            $('.classShowForMesco').removeClass('hide');
            $('.classHideForMesco').addClass('hide');
        }
        if (pDefaults.UnEditableCompanyName == "UNF") {
            $('#FilterslWarehouse').removeClass('hide');
            GetListWithNameAndWhereClause("0", "/api/Warehouse/LoadWithWhereClause", "<--" + TranslateString("Select") + "-->", "slWarehouse", " Where 1 = 1 ", null);
        }

        $(".classShowForTaxType").removeClass("hide");

        CallGETFunctionWithParameters("/api/InvoicesReports/FillFilter", null
            , function (data) {
                //data[0]:Branches //data[1]:Partners //data[2]:TaxTypes //data[3]:DiscountTypes
                debugger;
                //FillListFromObject(pID, pCodeOrName/*1-Code 2-Name*/, pStrFirstRow, pSlName, pData, callback)
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slBranch", data[0], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slPartner", data[1], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slVATType", data[2], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slDiscountType", data[3], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slInvoiceType", data[4], null);
                FillListFromObject(null, 1/*pCodeOrName*/, TranslateString("SelectFromMenu")/*"Select Pay. Type"*/, "slPartnerType", data[5], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slSalesman", data[6], function () {
                    if (pDefaults.UnEditableCompanyName == "ATL" && pLoggedUser.IsHideOthersRecords == true) {
                        $("#slSalesman").prop("disabled", true);
                        $("#slSalesman").val(pLoggedUser.ID);

                    }
                });
                $("#slCurrency").html("<option value=''>" + TranslateString("SelectFromMenu") + "</option>");
                $("#slCurrency").append($("#hReadySlCurrencies").html());

                FillListFromObject(null, 2, "<--Select-->", "slFilterCreator", data[7], null);

                //FillListFromObject(null, 5/*pCodeOrName*/, "Select Partner", "slPartner", pData[2], function () { $("#slPaymentPartner").html($("#slPartner").html()); }); /*function () { $("#slARFAirline").html($("#slARFSupplier").html()); $("#slARFAirline option[ServiceID!=" + constServiceAirlines + "][value!=''" + "]").addClass("hide"); }*/
                $("#txtFromDate").val(getTodaysDateInddMMyyyyFormat());
                $("#txtToDate").val(getTodaysDateInddMMyyyyFormat());
                //$("#txtFromDueDate").val(getTodaysDateInddMMyyyyFormat());
                //$("#txtToDueDate").val(getTodaysDateInddMMyyyyFormat());

                //added by ahmed maher
                if (pDefaults.CompanyName == "CHMTax" || pDefaults.CompanyName == "OCETax") {
                    $("#slInvoiceType").val(6);
                    $("#slInvoiceType").attr("disabled", "disabled");
                }
                else {
                    $("#slInvoiceType").removeAttr("disabled");

                }
            }
            , function () { FadePageCover(false); $("#hl-menu-Reports").parent().addClass("active"); });
    });
}

function isDateRangeValid(fromDateStr, toDateStr) {
    if (!fromDateStr || !toDateStr) return true; 

    var fromParts = fromDateStr.split('/');
    var toParts = toDateStr.split('/');

    var fromDate = new Date(fromParts[2], fromParts[1] - 1, fromParts[0]);
    var toDate = new Date(toParts[2], toParts[1] - 1, toParts[0]);

    var maxToDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 3, fromDate.getDate() - 1);

    return toDate <= maxToDate;
}

function InvoicesReports_Print(pOutputTo) {
    debugger;
    //if ($("#cbAgingPerClient").prop("checked") && $("#slCurrency").val() == "")
    //    swal("Sorry", "Please, select currency for aging per client option.");
    //else
  
    if (($("#txtFromDate").val().trim() == "" || isValidDate($("#txtFromDate").val(), 1))
        && ($("#txtToDate").val().trim() == "" || isValidDate($("#txtToDate").val(), 1))) {

        var fromDate = $("#txtFromDate").val().trim();
        var toDate = $("#txtToDate").val().trim();

        if (!isDateRangeValid(fromDate, toDate)) {
            swal("Sorry", "The date range must not exceed 3 months.");
            return;
        }
        if (
            ($("#txtFromDate").val().trim() == "" || isValidDate($("#txtFromDate").val(), 1))
            && ($("#txtToDate").val().trim() == "" || isValidDate($("#txtToDate").val(), 1))
            && ($("#txtFromDueDate").val().trim() == "" || isValidDate($("#txtFromDueDate").val(), 1))
            && ($("#txtToDueDate").val().trim() == "" || isValidDate($("#txtToDueDate").val(), 1))
        ) {



            if (pOutputTo != "Email") {
                FadePageCover(true);   
                var pWhereClause = InvoicesReports_GetFilterWhereClause();
                var pWhereClause_AccNote = InvoicesReports_GetFilterWhereClause_AccNote();

                var pOrderBy = "";

                if (IsMESCOCompany)
                    pOrderBy = "InvoiceDate,UniqueSerial";
                else if ($("#cbAddFleetInvoice").prop("checked"))
                    pOrderBy = "UniqueSerial";
                else if ($('#cbOrderByInvoiceTypeName').prop('checked'))
                    pOrderBy = "InvoiceTypeName, InvoiceNumber";
                else if ($('#cbOrderByOperationID').prop('checked'))
                    pOrderBy = "OperationID, InvoiceNumber, InvoiceTypeName";
                else 
                    pOrderBy = "InvoiceNumber, InvoiceTypeName";


                if ($('#cbGroupByBranch').prop('checked'))
                    pOrderBy = "BranchName, " + pOrderBy;
                else if ($('#cbGroupByCustomer').prop('checked'))
                    pOrderBy = "PartnerName, " + pOrderBy;
               // var pOrderBy = $('#cbGroupByBranch').prop('checked') ? "BranchName, InvoiceNumber" : "InvoiceTypeName, InvoiceNumber";
                //if ($('#ulReportTypes .active').val() == 0)
                //    swal(strSorry, "Please, Select a report type.");
                //else {
                var pParametersWithValues = {
                    pWhereClause: pWhereClause
                    , pWhereClause_AccNote: pWhereClause_AccNote
                    , pOrderBy: pOrderBy
                    , pIncludeDetails: $("#cbIncludeDetails").prop("checked") || $("#cbIsByItem").prop("checked")
                    , pIsAddNotes: $("#cbIncludeAccNotes").prop("checked")
                    , pIsAddAllNotes: $("#cbIncludeAllAccNotes").prop("checked")
                    , pCurrencyID: $("#slCurrency").val() == "" ? 0 : $("#slCurrency").val()
                    , pIsAgingPerClient: $("#cbAgingPerClient").prop("checked")
                    , pIsAgingPerClient_AllCurrency: $("#cbAgingPerClient_AllCurrency").prop("checked") || $("#cbAgingPerClient_AllCurrency_Minified").prop("checked")
                    , pIsAddFleetInvoice: $("#cbAddFleetInvoice").prop("checked")
                    , pIsAllocateInvoice: $("#cbIncludeDetails").prop("checked")
                };
                CallGETFunctionWithParameters("/api/InvoicesReports/LoadData"
                    , pParametersWithValues
                    , function (data) {
                    
                        if (data[0]) //pRecordsExist
                        {
                            debugger;
                           // Fill_SelectInputAfterLoadData(data[3], "PartnerID", "PartnerName", null, $('#hReadySlPartners'), '');

                            //Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(data[3], "PartnerID", "PartnerTypECode,PartnerName", ":", null, $('#hReadySlPartners'), '', 'InvoiceNumber');
                            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(data[3], "PartnerID", "PartnerName", ":", null, $('#hReadySlPartners'), '', 'InvoiceNumber');

                            if ($("#cbAgingPerClient").prop("checked"))
                                InvoicesReports_DrawReport_AgingPerClient(data, pOutputTo);
                            else if ($("#cbAgingPerClient_AllCurrency").prop("checked") || $("#cbAgingPerClient_AllCurrency_Minified").prop("checked"))
                                InvoicesReports_DrawReport_AgingPerClient_AllCurrency(data, pOutputTo);
                            //else if ($("#cbAgingPerClient_AllCurrency_Minified").prop("checked"))
                            //    InvoicesReports_DrawReport_AgingPerClient_AllCurrency_Minified(data, pOutputTo);
                            else if ($("#cbIncludeDetails").prop("checked"))
                                InvoicesReports_DrawReport_IncludeDetails(data, pOutputTo);
                            else if (pDefaults.IsTaxOnItems) {
                                if ($('#cbGroupByBranch').prop('checked'))
                                    InvoicesReports_DrawReport_GroupByBranch_TaxOnItems(data, pOutputTo);
                                else if ($('#cbGroupByCustomer').prop('checked') && IsNull($('#slPartner').val(), "") == "")
                                    InvoicesReports_DrawReport_GroupByPartners_TaxOnItems(data, pOutputTo);
                                else
                                    InvoicesReports_DrawReport_TaxOnItems(data, pOutputTo);
                            } //if (pDefaults.IsTaxOnItems) {
                            else if ($('#cbGroupByBranch').prop('checked'))
                                InvoicesReports_DrawReport_GroupByBranch(data, pOutputTo);
                            else if ($('#cbGroupByCustomer').prop('checked') && IsNull( $('#slPartner').val() , "" ) == "")
                                InvoicesReports_DrawReport_GroupByPartners(data, pOutputTo);
                            else
                                InvoicesReports_DrawReport(data, pOutputTo);
                        }
                        else
                            swal(strSorry, "No records are found for that search criteria.");

                    
                            FadePageCover(false);
                  
                        

                    });
                //}
            }
            else {


                SendAsEmail();

            }
        }
        else
            swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
   }
}
function InvoicesReports_GetFilterWhereClause() {
    debugger;
    var pWhereClause = "WHERE InvoiceTypeID<>9 ";
    if ($("#cbDraftInvoice").prop("checked"))
        pWhereClause = "WHERE InvoiceTypeID = 9 ";


    var pTransportFilter = "";
    var pDirectionFilter = "";
    var pBLTypeFilter = "";
    var pPartnerTypeFilter = "";
    var pPartnerFilter = "";
    var pBranchFilter = "";
    var pSalesmanFilter = "";
    var pInvoiceStatusFilter = "";
    var pVATTypeFilter = "";
    var pDiscountTypeFilter = "";
    var pTxtSearchOperationFilter = "";
    var pTxtCustomerReferenceFilter = "";
    var pTxtSearchInvoiceFilter = ""
    var pCurrencyFilter = "";
    var pInvoiceTypeFilter = "";
    var pFromDateFilter = "";
    var pToDateFilter = "";
    var pFromDueDateFilter = "";
    var pToDueDateFilter = "";

    //pWhereClause += ($("#cbIncludeUnApproved").prop("checked") ? "" : " AND IsApproved=1 ");
    pWhereClause += ($("#slApprovalStatus").val() == 10 ? " AND IsApproved=1 \n" : "");
    pWhereClause += ($("#slApprovalStatus").val() == 20 ? " AND IsApproved=0 \n" : "");
    if ($("#slDeliveryStatus").val() != "")
        pWhereClause += " AND IsDelivered=" + $("#slDeliveryStatus").val() + " \n";
    pDirectionFilter += ($("#lbl-filter-import").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 1 " : " OR DirectionType = 1 ") : "");
    pDirectionFilter += ($("#lbl-filter-export").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 2 " : " OR DirectionType = 2 ") : "");
    pDirectionFilter += ($("#lbl-filter-domestic").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 3 " : " OR DirectionType = 3 ") : "");
    pDirectionFilter += (pDirectionFilter == "" ? "" : ") ");

    pTransportFilter += ($("#lbl-filter-ocean").hasClass('active') ? (pTransportFilter == "" ? " (TransportType = 1 " : " OR TransportType = 1 ") : "");
    pTransportFilter += ($("#lbl-filter-air").hasClass('active') ? (pTransportFilter == "" ? " (TransportType = 2 " : " OR TransportType = 2 ") : "");
    pTransportFilter += ($("#lbl-filter-inland").hasClass('active') ? (pTransportFilter == "" ? " (TransportType = 3 " : " OR TransportType = 3 ") : "");
    pTransportFilter += (pTransportFilter == "" ? "" : ") ");

    pBLTypeFilter += ($("#lbl-filter-direct").hasClass('active') ? (pBLTypeFilter == "" ? " (BLType = " + constDirectBLType : " OR BLType = " + constDirectBLType) : "");
    pBLTypeFilter += ($("#lbl-filter-house").hasClass('active') ? (pBLTypeFilter == "" ? " (BLType = " + constHouseBLType : " OR BLType = " + constHouseBLType) : "");
    pBLTypeFilter += ($("#lbl-filter-master").hasClass('active') ? (pBLTypeFilter == "" ? " (BLType = " + constMasterBLType : " OR BLType = " + constMasterBLType) : "");
    pBLTypeFilter += (pBLTypeFilter == "" ? "" : ") ");

    if (pDirectionFilter != "" && pTransportFilter == "")
        pWhereClause = " WHERE " + pDirectionFilter;
    else
        if (pDirectionFilter == "" && pTransportFilter != "")
            pWhereClause = " WHERE " + pTransportFilter;
        else
            if (pDirectionFilter != "" && pTransportFilter != "")
                pWhereClause = " WHERE " + pDirectionFilter + " AND " + pTransportFilter;

    if (pBLTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pBLTypeFilter;
    else
        if (pBLTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pBLTypeFilter;

    pBranchFilter = ($("#slBranch").val() == "" ? "" : " BranchID = " + $("#slBranch").val());
    if (pBranchFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pBranchFilter;
    else
        if (pBranchFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pBranchFilter;

    pSalesmanFilter = ($("#slSalesman").val() == "" ? "" : " SalesmanID = " + $("#slSalesman").val());
    if (pSalesmanFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pSalesmanFilter;
    else
        if (pSalesmanFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pSalesmanFilter;

    pPartnerFilter = ($("#slPartner").val() == "" ? "" : (" PartnerID = " + $("#slPartner").val()));
    if (pPartnerFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pPartnerFilter;
    else
        if (pPartnerFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPartnerFilter;

    pPartnerTypeFilter = ($("#slPartnerType").val() == "" ? "" : (" PartnerTypeID = " + $("#slPartnerType").val()));
    if (pPartnerTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pPartnerTypeFilter;
    else
        if (pPartnerTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPartnerTypeFilter;

    pCurrencyFilter = ($("#slCurrency").val() == "" || $("#cbAgingPerClient_AllCurrency").prop("checked") ? "" : " CurrencyID = " + $("#slCurrency").val());
    if (pCurrencyFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pCurrencyFilter;
    else
        if (pCurrencyFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pCurrencyFilter;

    if ((IsMESCOCompany || pDefaults.UnEditableCompanyName == "UNF" )&& $("#slInvoiceType").val() != "")
        pInvoiceTypeFilter = ($("#slInvoiceType").val() == "" ? "" : "( TariffID in (select id from WH_CSL_Tariff where InvoiceTypeID =  " + $("#slInvoiceType").val()) + ") or (InvoiceTypeID =" + $("#slInvoiceType").val() +"and TariffID is null  ))";
    else
        pInvoiceTypeFilter = ($("#slInvoiceType").val() == "" ? "" : " InvoiceTypeID = " + $("#slInvoiceType").val());

    if (pInvoiceTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pInvoiceTypeFilter;
    else
        if (pInvoiceTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pInvoiceTypeFilter;

    //if ($("#slInvoiceStatus").val() == 40)
    //    pInvoiceStatusFilter = " IsDeleted=1 ";
    //else
    //    pInvoiceStatusFilter = ($("#slInvoiceStatus").val() == "" ? " IsDeleted=0 AND InvoiceTypeCode<>N'CREDITMEMO' " : " IsDeleted=0 AND InvoiceStatus = N'" + $("#slInvoiceStatus option:selected").text() + "'");
    //if (pInvoiceStatusFilter != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pInvoiceStatusFilter;
    //else
    //    if (pInvoiceStatusFilter != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pInvoiceStatusFilter;

    if ($("#slInvoiceStatus").val() == 40)
        pWhereClause += " AND IsDeleted=1 " + " \n";
    else if ($("#slInvoiceStatus").val() == "")
        pWhereClause += " AND IsDeleted=0 AND InvoiceTypeID<>13   " + " \n";

    //if UnPaid then include Partially Paid
    else if ($("#slInvoiceStatus").val() == 10) {
        pWhereClause += " AND IsDeleted=0 AND InvoiceTypeID<>13  AND InvoiceStatus IN (N'UnPaid', N'Partially Paid')" + " \n";

        //To eliminate the invoices cancelled with credit notes
        pWhereClause += " AND Amount > (SELECT isnull(SUM(AccNote.Amount),0) FROM AccNote WHERE InvoiceID = vwInvoicesForReports.ID) "
    }

    
    else
        pWhereClause += " AND IsDeleted=0 AND InvoiceTypeID<>13 AND InvoiceStatus = N'" + $("#slInvoiceStatus option:selected").text() + "'" + " \n";
    
    if (!pDefaults.IsTaxOnItems)
        pVATTypeFilter = ($("#slVATType").val() == "" ? "" : " TaxTypeID = " + $("#slVATType").val());
    else {

        //_VATfilter = "  ((ISNULL((SELECT COUNT(r.ID) FROM dbo.Receivables AS r WHERE dbo.vwInvoices.ID = r.InvoiceID AND r.TaxeTypeID = " + $("#slVATType").val().trim().toUpperCase() + "), 0)) > 0)";
        _VATfilter = "  ID IN (SELECT InvoiceID FROM Receivables WHERE TaxeTypeID = " + $("#slVATType").val().trim().toUpperCase()  + ") ";
        pVATTypeFilter = ($("#slVATType").val() == "" ? "" : _VATfilter );
    }


    if (pVATTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pVATTypeFilter;
    else
        if (pVATTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pVATTypeFilter;

    pDiscountTypeFilter = ($("#slDiscountType").val() == "" ? "" : " DiscountTypeID = " + $("#slDiscountType").val());
    if (pDiscountTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pDiscountTypeFilter;
    else
        if (pDiscountTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pDiscountTypeFilter;

    pTxtSearchOperationFilter = ($("#txtSearchOperation").val().trim() == "" ? "" : " (SUBSTRING(OperationCode,12,5)=N'" + $("#txtSearchOperation").val().trim().toUpperCase() + "' OR SUBSTRING(MasterOperationCode,12,5) = N'" + $("#txtSearchOperation").val().trim().toUpperCase() + "') \n");
    if (pTxtSearchOperationFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pTxtSearchOperationFilter;
    else
        if (pTxtSearchOperationFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pTxtSearchOperationFilter;

    pTxtCustomerReferenceFilter = ($("#txtCustomerReference").val().trim() == "" ? "" : " (CustomerReference =N'" + $("#txtCustomerReference").val().trim() + "')");
    if (pTxtCustomerReferenceFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pTxtCustomerReferenceFilter;
    else
        if (pTxtCustomerReferenceFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pTxtCustomerReferenceFilter;

    //pTxtSearchInvoiceFilter = ($("#txtSearchInvoice").val().trim() == "" ? "" : " (ConcatenatedInvoiceNumber like N'%" + $("#txtSearchInvoice").val().trim() + "%')");
    pTxtSearchInvoiceFilter = ($("#txtSearchInvoice").val().trim() == "" ? "" : " (InvoiceNumber ='" + $("#txtSearchInvoice").val().trim() + "')");
    if (pTxtSearchInvoiceFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pTxtSearchInvoiceFilter;
    else
        if (pTxtSearchInvoiceFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pTxtSearchInvoiceFilter;

    if ($("#txtECode").val().trim() != "")
        pWhereClause += " AND ECode=N'" + $("#txtECode").val().trim() + "' \n";

    if ($("#cbWithoutVAT").prop("checked") && pWhereClause != "")
        pWhereClause += " AND " + " TaxTypeID IS NULL ";
    else
        if ($("#cbWithoutVAT").prop("checked") && pWhereClause == "")
            pWhereClause += " WHERE " + " TaxTypeID IS NULL ";

    if ($("#cbWithoutDiscount").prop("checked") && pWhereClause != "")
        pWhereClause += " AND " + " DiscountTypeID IS NULL ";
    else
        if ($("#cbWithoutDiscount").prop("checked") && pWhereClause == "")
            pWhereClause += " WHERE " + " DiscountTypeID IS NULL ";

    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtFromDate").val().trim(), 1) && $("#txtFromDate").val().trim() != "") {
        if (IsMESCOCompany)
            pFromDateFilter = " ApprovedDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'";
        else
            pFromDateFilter = " InvoiceDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'";

        if (pFromDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pFromDateFilter;
        else
            if (pFromDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pFromDateFilter;
    }
    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtToDate").val().trim(), 1) && $("#txtToDate").val().trim() != "") {
        if (IsMESCOCompany)
            pToDateFilter = " ApprovedDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + " 23:59:59'";
        else
            pToDateFilter = " InvoiceDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + " 23:59:59'";

        if (pToDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pToDateFilter;
        else
            if (pToDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pToDateFilter;
    }


    if (isValidDate($("#txtFromPaymentDate").val(), 1) && $("#txtFromPaymentDate").val() != "") {
     
        pFromPaymentDateFilter = " PaymentDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromPaymentDate").val().trim()) + "'";

        if (pFromPaymentDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pFromPaymentDateFilter;
    }

    if (isValidDate($("#txtToPaymentDate").val(), 1) && $("#txtToPaymentDate").val() != "") {

        pToPaymentDateFilter = " PaymentDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToPaymentDate").val().trim()) + " 23:59:59'";

        if (pToPaymentDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pToPaymentDateFilter;
    }



    //DueDate is the DueDate
    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtFromDueDate").val().trim(), 1) && $("#txtFromDueDate").val().trim() != "") {
        pFromDueDateFilter = " DueDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDueDate").val().trim()) + "'";
        if (pFromDueDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pFromDueDateFilter;
        else
            if (pFromDueDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pFromDueDateFilter;
    }
    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtToDueDate").val().trim(), 1) && $("#txtToDueDate").val().trim() != "") {
        pToDueDateFilter = " DueDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToDueDate").val().trim()) + " 23:59:59'";
        if (pToDueDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pToDueDateFilter;
        else
            if (pToDueDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pToDueDateFilter;
    }

    if (isValidDate($("#txtFromDeliveryDate").val().trim(), 1) && $("#txtFromDeliveryDate").val().trim() != "") {
        pFromDeliveryDateFilter = " CutOffDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDeliveryDate").val().trim()) + "'";
        if (pFromDeliveryDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pFromDeliveryDateFilter;
        else
            if (pFromDeliveryDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pFromDeliveryDateFilter;
    }
    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtToDeliveryDate").val().trim(), 1) && $("#txtToDeliveryDate").val().trim() != "") {
        pToDeliveryDateFilter = " CutOffDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToDeliveryDate").val().trim()) + " 23:59:59'";
        if (pToDeliveryDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pToDeliveryDateFilter;
        else
            if (pToDeliveryDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pToDeliveryDateFilter;
    }

    //pPOL = ($("#slPOL option:selected").val() == "" ? "" : " POL = " + $("#slPOL option:selected").val());
    //if (pPOL != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pPOL;
    //else
    //    if (pPOL != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pPOL;
    //pPOD = ($("#slPOD option:selected").val() == "" ? "" : " POD = " + $("#slPOD option:selected").val());
    //if (pPOD != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pPOD;
    //else
    //    if (pPOD != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pPOD;

    //pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause);
    pWhereClause += ($("#slApprovalStatus").val() == 10 ? " AND IsApproved=1 \n" : "");
    pWhereClause += ($("#slApprovalStatus").val() == 20 ? " AND IsApproved=0 \n" : "");

    if ($("#slFilterCreator").val() != "")
        pWhereClause += " AND CreatorUserID = " + $("#slFilterCreator").val()+ " \n";

    if ($('#cbOnlineInvoices').prop('checked'))
        pWhereClause += " AND id in (select InvoiceID from CheckInvoicePaymentWhats where VoucherID is not null And InvoiceID is not null) "+" \n";
    else
        pWhereClause += " AND id not in (select InvoiceID from CheckInvoicePaymentWhats where VoucherID is not null And InvoiceID is not null) " + " \n";


    if (pDefaults.UnEditableCompanyName == "UNF") {
        var pWareHouseID = $("#slWarehouse").val();
        if (pWareHouseID > 0 && pWareHouseID != "" && pWareHouseID != null)
            pWhereClause += ` AND HouseNumber in (select HouseNumber from vwOperationsForBindTableRows where WarehouseID = ${pWareHouseID})`
    }
    return pWhereClause;
}
function InvoicesReports_GetFilterWhereClause_AccNote() {
    debugger;
    var _WhereClause = "WHERE 1=1" + "\n";
    _WhereClause += ($("#slApprovalStatus").val() == 10 ? " AND IsApproved=1 " : "");
    _WhereClause += ($("#slApprovalStatus").val() == 20 ? " AND IsApproved=0 " : "");

    if ($("#slBranch").val() != "")
        _WhereClause += "AND BranchID=" + $("#slBranch").val() + "\n";

    if ($("#slPartnerType").val() != "")
        _WhereClause += "AND PartnerTypeID=" + $("#slPartnerType").val() + "\n";

    if ($("#slPartner").val() != "")
        _WhereClause += "AND PartnerID=" + $("#slPartner").val() + "\n";

    if ($("#slCurrency").val() != "")
        _WhereClause += "AND CurrencyID=" + $("#slCurrency").val() + "\n";

    if ($("#txtSearchOperation").val().trim() != "")
        _WhereClause += "AND (SUBSTRING(OperationCode,12,7)=N'" + $("#txtSearchOperation").val().trim().toUpperCase() + "' OR SUBSTRING(MasterOperationCode,12,5) = N'" + $("#txtSearchOperation").val().trim().toUpperCase() + "') \n";
    
    if ($("#txtSearchInvoice").val().trim() != "")
        _WhereClause += "AND (CodeSerial ='" + $("#txtSearchInvoice").val().trim() + "')" + "\n";

    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtFromDate").val().trim(), 1) && $("#txtFromDate").val().trim() != "")
        _WhereClause += "AND NoteDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + " 00:00:00'" + "\n";
    
    if (isValidDate($("#txtToDate").val().trim(), 1) && $("#txtToDate").val().trim() != "")
        _WhereClause += "AND NoteDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + " 23:59:59'" + "\n";

    var pVATTypeFilter = "";
    if ($("#slVATType").val() != "" && $("#slVATType").val() != null) {
        if (!pDefaults.IsTaxOnItems)
            pVATTypeFilter = ($("#slVATType").val() == "" ? "" : " TaxTypeID = " + $("#slVATType").val());
        else {
            _VATfilter = " ID IN (SELECT AccNoteID FROM Payables WHERE AccNoteID IS NOT NULL and TaxTypeID=" + $("#slVATType").val().trim().toUpperCase() + " UNION SELECT AccNoteID FROM Receivables WHERE AccNoteID IS NOT NULL and TaxeTypeID=" + $("#slVATType").val().trim().toUpperCase() +")"
            pVATTypeFilter = ($("#slVATType").val() == "" ? "" : _VATfilter);
        }
    }
    if (pVATTypeFilter != "")
        _WhereClause += " AND " + pVATTypeFilter;

    return _WhereClause;
}
function InvoicesReports_PartnerTypeChanged() {
    //debugger;
    //$("#slPartner").val("");
    //$("#slPartner option").removeClass("hide");
    //if ($("#slPartnerType").val() != "") //handle show all partners
    //    $("#slPartner option[PartnerTypeID!=" + $("#slPartnerType").val() + "][value!=''" + "]").addClass("hide");
    debugger;
    $("#slPartner").html("<option value=''>" + TranslateString("SelectFromMenu") + "</option>");//to quickly empty
    if ($("#slPartnerType").val() != "") {
        //if ($("#slPartnerType").val() == constCustomerPartnerTypeID) {
        //    $("#slPartner").html($("#hReadySlCustomers").html());
        //}
        //else {
        //    FadePageCover(true);
        //    CallGETFunctionWithParameters("/api/InvoicesReports/FillPartners", { pPartnerTypeID: $("#slPartnerType").val() }
        //        , function (pData) {
        //            FillListFromObject(null, 2/*pCodeOrName*/, "<--All-->", "slPartner", pData[0], null);
        //            FadePageCover(false);
        //        }
        //        , null);
        //}

        //FadePageCover(true);
        //CallGETFunctionWithParameters("/api/InvoicesReports/FillPartners", { pPartnerTypeID: $("#slPartnerType").val() }
        //    , function (pData) {
        //        FillListFromObject(null, 2/*pCodeOrName*/, "<--All-->", "slPartner", pData[0], null);
        //        FadePageCover(false);
        //    }
        //    , null);

        $("div[tabindex='-1']").removeAttr('tabindex');
        Select2OnlineSearch("slPartner", "/api/InvoicesReports/FillPartners", function (params) {
            var query = {
                pPartnerTypeID: $("#slPartnerType").val(),
                pWhereClause: ("WHERE Name LIKE  N'%" + params.term + "%'")
                , pOrderBy: "Name"
            }
            return query;
        }, function (data) {
            var Partners = JSON.parse(data[0]);
            return {

                results: $.map(Partners, function (item) {
                    return {
                        text: item.Name,
                        id: item.ID,
                        value: item.ID
                    };
                })
            };
        }, 3, 1000);
    }
}
function InvoicesReports_IncludeVATChanged() {
    if ($("#cbWithoutVAT").prop("checked")) {
        $("#divVATType").addClass("hide");
        $("#slVATType").val("");
    }
    else
        $("#divVATType").removeClass("hide");
    if ($("#cbWithoutDiscount").prop("checked")) {
        $("#divDiscountType").addClass("hide");
        $("#slDiscountType").val("");
    }
    else
        $("#divDiscountType").removeClass("hide");
}
function InvoicesReports_IncludeDetailsChanged() {
    debugger;
    if ($("#cbIncludeDetails").prop("checked")) {
        $("#cbIncludeAccNotes").parent().addClass("hide");
        $("#cbIncludeAllAccNotes").parent().addClass("hide");
        $("#cbGroupByBranch").parent().addClass("hide");
        //$("#menu1").parent().addClass("hide");
        $("#btn-SelectColumns").addClass("hide");
    }
    else { //Not Details
        $("#cbIncludeAccNotes").prop("checked", false);
        $("#cbIncludeAccNotes").parent().removeClass("hide");
        $("#cbIncludeAllAccNotes").prop("checked", false);
        $("#cbIncludeAllAccNotes").parent().removeClass("hide");
        $("#cbGroupByBranch").parent().removeClass("hide");
        //$("#menu1").parent().removeClass("hide");
        $("#btn-SelectColumns").removeClass("hide");
    }
}
function InvoicesReports_IsByItemChanged() {
    debugger;
    SetSelectedColumns(false);
    if ($("#cbIsByItem").prop("checked")) {
        $("#cbOperationCode").prop("checked", true);
        $("#cbPartnerType").prop("checked", true);
        $("#cbCustomer").prop("checked", true);
        $("#cbInvoiceDate").prop("checked", true);
        $("#cbDueDate").prop("checked", true);
        
    }
}
/*****************************TaxOnHeader Draw**********************************/
function InvoicesReports_DrawReport_GroupByPartners(data, pOutputTo) {
    setTimeout(function () {
        debugger;
        var pReportRows = JSON.parse(data[1]);
        var pInvoiceItems = JSON.parse(data[2]);
        var _TotalPaid = CalculateSumOfArrayWithGroupBy(pReportRows, "PaidAmount", "CurrencyCode");
        var _TotalRemaining = CalculateSumOfArrayWithGroupBy(pReportRows, "RemainingAmount", "CurrencyCode");
        //var pPayablesCurrenciesSummary = data[2];
        //var pReceivablesOrInvoicesCurrenciesSummary = data[3];
        //var pProfitCurrenciesSummary = data[4];
        //var pMarginSummary = data[5];
        console.log(document.getElementById("hReadySlPartners").options);

        var pReportTitle = $("#cbAging").prop("checked") ? "Aging Report" : "Invoices Report";

        var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
        var pTableHTML = "";
        var pPartnerList = document.getElementById("hReadySlPartners").options;
        for (var i = 0; i < pPartnerList.length; i++) {
            var pGroupedReportRows = jQuery.grep(pReportRows, function (pReportRows) {
                return pReportRows.PartnerID == pPartnerList[i].value;
            });
            if (pGroupedReportRows.length > 0) {
                //pTableHTML += '                         <table id="tblInvoicesReports" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
                pTableHTML += '                         <table id="tblInvoicesReports' + pPartnerList[i].value + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
                pTableHTML += '                             <thead>';
                pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                //pTableHTML += '                                     <th class="hide">Ser.</th>';
                //pTableHTML += '                                     <th class="hide">Branch</th>';
                pTableHTML += '                                     <th>Inv No.</th>';
                if ($("#cbECode").prop("checked"))
                    pTableHTML += '                                     <th>ECode</th>';
                if ($("#cbSOA").prop("checked"))
                    pTableHTML += '                                     <th>SOA</th>';
                if ($("#cbPartnerType").prop("checked"))
                    pTableHTML += '                                     <th>Partner Type</th>';
                if ($("#cbCustomer").prop("checked"))
                    pTableHTML += '                                     <th>Partner Name</th>';
                if ($("#cbCustomerReference").prop("checked"))
                    pTableHTML += '                                     <th>CustomerRef.</th>';
                if ($("#cbMasterBL").prop("checked"))
                    pTableHTML += '                                     <th>MasterBL</th>';
                if ($("#cbHouseNumber").prop("checked"))
                    pTableHTML += '                                     <th>HBL</th>';
                if ($("#cbOperationNotes").prop("checked"))
                    pTableHTML += '                                     <th>Oper.Notes</th>';
                if ($("#cbInvoiceStatus").prop("checked"))
                    pTableHTML += '                                     <th>Status</th>';
                if ($("#cbDeliveryStatus").prop("checked"))
                    pTableHTML += '                                     <th>Delivery</th>';
                if ($("#cbSalesman").prop("checked"))
                    pTableHTML += '                                     <th>Salesman</th>';
                if ($("#cbSalesman").prop("checked"))
                    pTableHTML += '                                     <th>Salesman</th>';
                if ($("#cbOperationCode").prop("checked"))
                    pTableHTML += '                                     <th>Operation No.</th>';
                if ($("#cbInvoiceDate").prop("checked"))
                    pTableHTML += '                                     <th>Inv. Date</th>';
                if ($("#cbDueDate").prop("checked"))
                    pTableHTML += '                                     <th>Due Date</th>';
                if ($("#cbCertificateNumber").prop("checked"))
                    pTableHTML += '                                     <th>Cert No</th>';
                if ($("#cbVATNo").prop("checked"))
                    pTableHTML += '                                     <th>VAT No</th>';
                if ($("#cbBookingNumber").prop("checked"))
                    pTableHTML += '                                     <th>Booking No</th>';
                if ($("#cbVessel").prop("checked"))
                    pTableHTML += '                                     <th>Vessel</th>';
                //pTableHTML += '                                     <th>Status</th>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableHTML += '                                     <th>Amt w/o VAT</th>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableHTML += '                                     <th>VAT</th>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableHTML += '                                     <th>WHT</th>';
                pTableHTML += '                                     <th>Total</th>';
                pTableHTML += '                                     <th>Cur.</th>';
                if ($("#cbLocalCurrency").prop("checked")) {
                    pTableHTML += '                                     <th>Ex.Rate</th>';
                    pTableHTML += '                                     <th>' + pDefaults.CurrencyCode + '</th>';
                }
                if ($("#cbPaidAmount").prop("checked"))
                    pTableHTML += '                                     <th>Paid Amt.</th>';
                if ($("#cbRemaining").prop("checked"))
                    pTableHTML += '                                     <th>Remaining</th>';
                if ($("#cbOperationDate").prop("checked"))
                    pTableHTML += '                                     <th>OperDate</th>';
                if ($("#cbPaymentDate").prop("checked"))
                    pTableHTML += '                                     <th>PaymentDate</th>';
                if ($("#cbDaysDifference").prop("checked"))
                    pTableHTML += '                                     <th>DaysDif.</th>';
                if ($("#cbAging").prop("checked")) {
                    pTableHTML += '                                 <th>0-30</th>';
                    pTableHTML += '                                 <th>31-60</th>';
                    pTableHTML += '                                 <th>61-90</th>';
                    pTableHTML += '                                 <th>Later</th>';
                }
                pTableHTML += '                                 </tr>';
                pTableHTML += '                             </thead>';
                pTableHTML += '                             <tbody>';
                var serial = 0;
                $.each((pGroupedReportRows), function (i, item) {
                    //pTableHTML += '                                     <tr class="' + (item.Cargo == "Totals In Default Currency:" ? "font-bold text-ul" : "") + '" style="font-size:95%; ' + (item.Cargo == "Total:" ? "background-color: #f9f9f9;!Important" : "") + '">' + (item.Code == "Total" ? "<b>" : "");
                    var _AgingDays = Date.prototype.compareDates(GetDateWithFormatMDY(item.DueDate), FormattedTodaysDate);
                    pTableHTML += '                                     <tr style="font-size:95%;">';
                    ++serial;
                    //pTableHTML += '                                         <td class="hide">' + (++serial) + '</td>';
                    //pTableHTML += '                                         <td class="hide">' + item.BranchName + '</td>';

                    let InvoiceTypeShortCode = "INV";
                    if (InvoiceTypes_INV.includes(item.InvoiceTypeID)) {
                        InvoiceTypeShortCode = "SRV";
                    } else if (InvoiceTypes_DN.includes(item.InvoiceTypeID)) {
                        InvoiceTypeShortCode = "D/N";
                    } else if (InvoiceTypes_ACF.includes(item.InvoiceTypeID)) {
                        InvoiceTypeShortCode = "ACF";
                    }

                    let ShortYear = GetDateFromServer(item.InvoiceDate).slice(-2)
                    if (pDefaults.UnEditableCompanyName == "EISAS") {
                        item.ConcatenatedInvoiceNumber = (InvoiceTypeShortCode + '-' + ShortYear + '-' + item.InvoiceNumber)
                    }

                
                    if (pDefaults.UnEditableCompanyName == "LIN")
                        pTableHTML += '                                         <td>' + (item.InvoiceTypeID == 12 ? '55550' : '') + item.ConcatenatedInvoiceNumber + '</td>';
                    else
                        pTableHTML += '                                         <td>' + (item.ConcatenatedInvoiceNumber == 0 ? "" : item.ConcatenatedInvoiceNumber) + '</td>';


                    if ($("#cbECode").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.ECode == 0 ? "" : item.ECode) + '</td>';

                    if ($("#cbSOA").prop("checked"))
                        if (pDefaults.UnEditableCompanyName == "LIN")
                            pTableHTML += '                                         <td>' + (item.InvoiceTypeID == 12 ? '55550' : '') + (item.RelatedToInvoiceID != 0 ? (item.RelatedToInvoiceNumber + '/' + item.RelatedToInvoiceTypeName) : '') + '</td>';
                        else
                            pTableHTML += '                                         <td>' + (item.RelatedToInvoiceID != 0 ? (item.RelatedToInvoiceNumber + '/' + item.RelatedToInvoiceTypeName) : '') + '</td>';

                    if ($("#cbPartnerType").prop("checked"))
                        pTableHTML += '                                         <td>' + item.PartnerTypeCode + '</td>';
                    if ($("#cbCustomer").prop("checked"))
                        pTableHTML += '                                         <td>' + item.PartnerName.replace(/'/g, "''"); + '</td>';


                    if ($("#cbCustomerReference").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.CustomerReference == 0 ? "" : item.CustomerReference) + '</td>';
                    if ($("#cbMasterBL").prop("checked")) {
                        let MasterBL = item.MasterBL;
                        if (item.TransportType == AirTransportType && (MasterBL == "" || MasterBL == "0")) {
                            MasterBL = item.MainRouteNotes;
                        }
                        pTableHTML += '                                         <td>' + (MasterBL == 0 ? "" : MasterBL) + '</td>';
                    }
                    if ($("#cbHouseNumber").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.HouseNumber == 0 ? "" : item.HouseNumber) + '</td>';
                    if ($("#cbOperationNotes").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.OperationNotes == 0 ? "" : item.OperationNotes) + '</td>';
                    if ($("#cbInvoiceStatus").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.InvoiceStatus == 0 ? "" : item.InvoiceStatus) + '</td>';
                    if ($("#cbDeliveryStatus").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.IsDelivered ? "Yes" : "No") + '</td>';
                    if ($("#cbSalesman").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.SalesmanID != 0 ? item.SalesmanName : '') + '</td>';
                    if ($("#cbOperationCode").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.OperationCode == 0 ? item.MasterOperationCode : item.OperationCode) + '</td>';
                    if ($("#cbInvoiceDate").prop("checked"))
                        pTableHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + '</td>';
                    if ($("#cbDueDate").prop("checked"))
                        pTableHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.DueDate)) + '</td>';
                    if ($("#cbCertificateNumber").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.CertificateNumber == 0 ? "" : item.CertificateNumber) + '</td>';
                    if ($("#cbVATNo").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.VATNumber == 0 ? "" : item.VATNumber) + '</td>';
                    if ($("#cbBookingNumber").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.BookingNumber == 0 ? "" : item.BookingNumber) + '</td>';
                    if ($("#cbVessel").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.VesselName == 0 ? "" : item.VesselName) + '</td>';
                    //pTableHTML += '                                         <td' + (item.InvoiceStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + (item.InvoiceStatus == 0 ? "" : item.InvoiceStatus) + '</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableHTML += '                                         <td>' + item.AmountWithoutVAT.toFixed(2) + '</td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableHTML += '                                         <td>' + item.TaxAmount.toFixed(2) + '</td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableHTML += '                                         <td>' + item.DiscountAmount.toFixed(2) + '</td>';
                    pTableHTML += '                                         <td>' + item.Amount.toFixed(2) + '</td>';
                    pTableHTML += '                                         <td>' + item.CurrencyCode + '</td>';
                    if ($("#cbLocalCurrency").prop("checked")) {
                        pTableHTML += '                                         <td>' + item.ExchangeRate + '</td>';
                        pTableHTML += '                                         <td>' + (item.ExchangeRate * item.Amount).toFixed(2) + '</td>';
                    }
                    if ($("#cbPaidAmount").prop("checked"))
                        pTableHTML += '                                         <td>' + item.PaidAmount.toFixed(2) + '</td>';
                    if ($("#cbRemaining").prop("checked"))
                        pTableHTML += '                                         <td' + (item.InvoiceStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + item.RemainingAmount.toFixed(2) + '</td>';
                    var _PaymentDate = (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PaymentDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PaymentDate)));
                    if ($("#cbOperationDate").prop("checked"))
                        pTableHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.OperationOpenDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.OperationOpenDate))) + '</td>';
                    if ($("#cbPaymentDate").prop("checked"))
                        pTableHTML += '                                         <td>' + _PaymentDate + '</td>';
                    if ($("#cbDaysDifference").prop("checked"))
                        pTableHTML += '                                         <td>' + (_PaymentDate == "" ? "" : (Date.prototype.compareDates(GetDateWithFormatMDY(item.OperationOpenDate), GetDateWithFormatMDY(item.PaymentDate)))) + '</td>';
                    //pTableHTML += '                                         <td>' + (_AgingDays >= 0 && _AgingDays < 30 ? '✔' : '') + '</td>';
                    //pTableHTML += '                                         <td>' + (_AgingDays >= 30 && _AgingDays < 60 ? '✔' : '') + '</td>';
                    //pTableHTML += '                                         <td>' + (_AgingDays >= 60 && _AgingDays < 90 ? '✔' : '') + '</td>';
                    //pTableHTML += '                                         <td>' + (_AgingDays >= 90 ? '✔' : '') + '</td>';
                    if ($("#cbAging").prop("checked")) {
                        pTableHTML += '                                     <td>' + (_AgingDays >= 0 && _AgingDays < 30 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                        pTableHTML += '                                     <td>' + (_AgingDays >= 30 && _AgingDays < 60 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                        pTableHTML += '                                     <td>' + (_AgingDays >= 60 && _AgingDays < 90 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                        pTableHTML += '                                     <td>' + (_AgingDays >= 90 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                    }
                    pTableHTML += '                                     </tr>';
                });
                pTableHTML += '                             </tbody>';
                pTableHTML += '                         </table>';
            } //if (pGroupedReportRows.length > 0)
        } //for (var i = 0; i < pPartnerList.length; i++)
        $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
        if (pOutputTo == "Excel") {
            for (var i = 0; i < pPartnerList.length; i++) {
                var pGroupedReportRows = jQuery.grep(pReportRows, function (pReportRows) {
                    return pReportRows.PartnerID == pPartnerList[i].value;
                });
                if (pGroupedReportRows.length > 0) {
                    var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pGroupedReportRows, "Amount", "ExchangeRate");
                    var pTotalSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "Amount", "CurrencyCode");
                    var pTableSummary = "";
                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                    pTableSummary += '                                 </tr>';

                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                        var pAmountWithoutVATSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "AmountWithoutVAT", "CurrencyCode");

                        pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                        pTableSummary += '                                     <td>' + /*pPartnerList[i].text +*/ ' TOTAL AMOUNT W/O VAT :</td>';
                        pTableSummary += '                                     <td>' + pAmountWithoutVATSummary + '</td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        //pTableSummary += '                                     <td>Status</td>';
                        if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                            pTableSummary += '                                     <td></td>';
                        if (!$("#cbWithoutVAT").prop("checked"))
                            pTableSummary += '                                     <td></td>';
                        if (!$("#cbWithoutDiscount").prop("checked"))
                            pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                        pTableSummary += '                                 </tr>';
                    }

                    if (!$("#cbWithoutVAT").prop("checked")) {
                        var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "TaxAmount", "CurrencyCode");

                        pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                        pTableSummary += '                                     <td>' + /*pPartnerList[i].text +*/ ' TOTAL VAT :</td>';
                        pTableSummary += '                                     <td>' + pTaxAmountSummary + '</td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        //pTableSummary += '                                     <td>Status</td>';
                        if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                            pTableSummary += '                                     <td></td>';
                        if (!$("#cbWithoutVAT").prop("checked"))
                            pTableSummary += '                                     <td></td>';
                        if (!$("#cbWithoutDiscount").prop("checked"))
                            pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                        pTableSummary += '                                 </tr>';
                    }


                    if (!$("#cbWithoutDiscount").prop("checked")) {
                        var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pGroupedReportRows);

                        pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                        pTableSummary += '                                     <td>' + /*pPartnerList[i].text +*/ ' TOTAL WHT :</td>';
                        pTableSummary += '                                     <td>' + pDiscountAmountSummary + '</td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        //pTableSummary += '                                     <td>Status</td>';
                        if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                            pTableSummary += '                                     <td></td>';
                        if (!$("#cbWithoutVAT").prop("checked"))
                            pTableSummary += '                                     <td></td>';
                        if (!$("#cbWithoutDiscount").prop("checked"))
                            pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                    }

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + /*pPartnerList[i].text +*/ ' TOTAL :</td>';
                    pTableSummary += '                                     <td>' + pTotalSummary + ' = (' + _TotalInDefaultCurrency + ')' + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                    pTableSummary += '                                 </tr>';
                    $("#tblInvoicesReports" + pPartnerList[i].value + " tbody").append(pTableSummary);
                    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblInvoicesReports" + pPartnerList[i].value, /*pPartnerList[i].text +*/ ' ' + 'Invoices');
                }
            }
        }
        else {
            var ReportHTML = '';
            //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
            ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

            ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>Transport Type :</b> ' + $("#divTransportFilter label.active").attr("title") + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>Direction Type :</b> ' + $("#divDirectionFilter label.active").attr("title") + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';

            ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Inv. Type :</b> ' + $("#slInvoiceType option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Inv. Status :</b> ' + $("#slInvoiceStatus option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Approval Status :</b> ' + $("#slApprovalStatus option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>VAT Type :</b> ' + ($("#cbWithoutVAT").prop("checked") ? "W/O" : $("#slVATType option:selected").text()) + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>WHT :</b> ' + ($("#cbWithoutDiscount").prop("checked") ? "W/O" : $("#slDiscountType option:selected").text()) + '</div>';
            ReportHTML += '             <div class="col-xs-6"><b>Inv. Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
                ? "All Dates"
                : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
            ////ReportHTML += '                 <section class="panel panel-default">';
            //ReportHTML += '                     <div class="table-responsive">';
            ReportHTML += '                     <div>&nbsp;</div>';
            for (var i = 0; i < pPartnerList.length; i++) {
                var pGroupedReportRows = jQuery.grep(pReportRows, function (pReportRows) {
                    return pReportRows.PartnerID == pPartnerList[i].value;
                });
                if (pGroupedReportRows.length > 0) {
                    //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    ReportHTML += '                         <h4><b><u> ' + /*pPartnerList[i].text +*/ '</u></b></h4>';

                    ReportHTML += '                         <table id="tblInvoicesReports' + pPartnerList[i].value + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
                    ReportHTML += '                         ' + $("#tblInvoicesReports" + pPartnerList[i].value).html();
                    ReportHTML += '                         </table>';
                    //ReportHTML += '                     </div>';//of table-responsive
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                        var pAmountWithoutVATSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "AmountWithoutVAT", "CurrencyCode");
                        ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + /*pPartnerList[i].text +*/ ' TOTAL AMOUNT W/O VAT : </b> ' + pAmountWithoutVATSummary + '</div>';
                    }
                    if (!$("#cbWithoutVAT").prop("checked")) {
                        var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "TaxAmount", "CurrencyCode");
                        ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + /*pPartnerList[i].text +*/ ' TOTAL VAT : </b> ' + pTaxAmountSummary + '</div>';
                    }
                    if (!$("#cbWithoutDiscount").prop("checked")) {
                        var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pGroupedReportRows);
                        ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + /*pPartnerList[i].text +*/ ' TOTAL WHT : </b> ' + pDiscountAmountSummary + '</div>';
                    }
                    var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pGroupedReportRows, "Amount", "ExchangeRate");
                    var pTotalSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "Amount", "CurrencyCode");
                    ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + /*pPartnerList[i].text +*/ ' TOTAL AMOUNT : </b> ' + pTotalSummary + ' = (' + _TotalInDefaultCurrency + ')' + '</div>';
                    //ReportHTML += '             <div class="col-xs-12"><b>Payables Summary :</b> ' + pPayablesCurrenciesSummary + '</div>';
                    //ReportHTML += '             <div class="col-xs-12"><b>Invoices Summary :</b> ' + pReceivablesOrInvoicesCurrenciesSummary + '</div>';
                    //ReportHTML += '             <div class="col-xs-12"><b>Profit Summary :</b> ' + pProfitCurrenciesSummary + '</div>';
                    //ReportHTML += '             <div class="col-xs-12"><b>Profit Margin :</b> ' + pMarginSummary + '%</div>';
                }
            }

            debugger;
            if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                var pAmountWithoutVATSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "AmountWithoutVAT", "CurrencyCode");
                ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL AMOUNT W/O VAT :</u> </b> ' + pAmountWithoutVATSummary + '</div>';
            }
            if (!$("#cbWithoutVAT").prop("checked")) {
                var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "TaxAmount", "CurrencyCode");
                ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL VAT :</u> </b> ' + pTaxAmountSummary + '</div>';
            }
            if (!$("#cbWithoutDiscount").prop("checked")) {
                var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pReportRows);
                ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL WHT :</u> </b> ' + pDiscountAmountSummary + '</div>';
            }
            var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pReportRows, "Amount", "ExchangeRate");
            var pTotalSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "Amount", "CurrencyCode");
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary + ' =(' + _TotalInDefaultCurrency + ')' + '</div>';
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Paid :</u> </b> ' + _TotalPaid + '</div>';
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Remaining :</u> </b> ' + _TotalRemaining + '</div>';
            ReportHTML += '         </body>';
            ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
            //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
            //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            ReportHTML += '     </footer>';

            ReportHTML += '</html>';
            if (pOutputTo == "PrintInReportBody")
                $("#ReportBody").html(ReportHTML);
            else {
                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
        }



    }, 300);

}
function InvoicesReports_DrawReport_GroupByBranch(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pInvoiceItems = JSON.parse(data[2]);
    var _TotalPaid = CalculateSumOfArrayWithGroupBy(pReportRows, "PaidAmount", "CurrencyCode");
    var _TotalRemaining = CalculateSumOfArrayWithGroupBy(pReportRows, "RemainingAmount", "CurrencyCode");
    //var pPayablesCurrenciesSummary = data[2];
    //var pReceivablesOrInvoicesCurrenciesSummary = data[3];
    //var pProfitCurrenciesSummary = data[4];
    //var pMarginSummary = data[5];

    var pReportTitle = $("#cbAging").prop("checked") ? "Aging Report" : "Invoices Report";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";
    var pBranchesList = document.getElementById("hReadySlBranches").options;
    for (var i = 0; i < pBranchesList.length; i++) {
        var pGroupedReportRows = jQuery.grep(pReportRows, function (pReportRows) {
            return pReportRows.BranchID == pBranchesList[i].value;
        });
        if (pGroupedReportRows.length > 0) {
            //pTableHTML += '                         <table id="tblInvoicesReports" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
            pTableHTML += '                         <table id="tblInvoicesReports' + pBranchesList[i].value + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            pTableHTML += '                             <thead>';
            pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            //pTableHTML += '                                     <th class="hide">Ser.</th>';
            //pTableHTML += '                                     <th class="hide">Branch</th>';
            pTableHTML += '                                     <th>Inv No.</th>';
            if ($("#cbECode").prop("checked"))
                pTableHTML += '                                     <th>ECode</th>';
            if ($("#cbSOA").prop("checked"))
                pTableHTML += '                                     <th>SOA</th>';
            if ($("#cbPartnerType").prop("checked"))
                pTableHTML += '                                     <th>Partner Type</th>';
            if ($("#cbCustomer").prop("checked"))
                pTableHTML += '                                     <th>Partner Name</th>';
            if ($("#cbCustomerReference").prop("checked"))
                pTableHTML += '                                     <th>CustomerRef.</th>';
            if ($("#cbMasterBL").prop("checked"))
                pTableHTML += '                                     <th>MasterBL</th>';
            if ($("#cbHouseNumber").prop("checked"))
                pTableHTML += '                                     <th>HBL</th>';
            if ($("#cbOperationNotes").prop("checked"))
                pTableHTML += '                                     <th>Oper.Notes</th>';
            if ($("#cbInvoiceStatus").prop("checked"))
                pTableHTML += '                                     <th>Status</th>';
            if ($("#cbDeliveryStatus").prop("checked"))
                pTableHTML += '                                     <th>Delivery</th>';
            if ($("#cbSalesman").prop("checked"))
                pTableHTML += '                                     <th>Salesman</th>';
            if ($("#cbOperationCode").prop("checked"))
                pTableHTML += '                                     <th>Operation No.</th>';
            if ($("#cbInvoiceDate").prop("checked"))
                pTableHTML += '                                     <th>Inv. Date</th>';
            if ($("#cbDueDate").prop("checked"))
                pTableHTML += '                                     <th>Due Date</th>';
            if ($("#cbCertificateNumber").prop("checked"))
                pTableHTML += '                                     <th>Cert No</th>';
            if ($("#cbVATNo").prop("checked"))
                pTableHTML += '                                     <th>VAT No</th>';
            if ($("#cbBookingNumber").prop("checked"))
                pTableHTML += '                                     <th>Booking No</th>';
            if ($("#cbVessel").prop("checked"))
                pTableHTML += '                                     <th>Vessel</th>';
            //pTableHTML += '                                     <th>Status</th>';
            if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                pTableHTML += '                                     <th>Amt w/o VAT</th>';
            if (!$("#cbWithoutVAT").prop("checked"))
                pTableHTML += '                                     <th>VAT</th>';
            if (!$("#cbWithoutDiscount").prop("checked"))
                pTableHTML += '                                     <th>WHT</th>';
            pTableHTML += '                                     <th>Total</th>';
            pTableHTML += '                                     <th>Cur.</th>';
            if ($("#cbLocalCurrency").prop("checked")) {
                pTableHTML += '                                     <th>Ex.Rate</th>';
                pTableHTML += '                                     <th>' + pDefaults.CurrencyCode + '</th>';
            }
            if ($("#cbPaidAmount").prop("checked"))
                pTableHTML += '                                     <th>Paid Amt.</th>';
            if ($("#cbRemaining").prop("checked"))
                pTableHTML += '                                     <th>Remaining</th>';
            if ($("#cbOperationDate").prop("checked"))
                pTableHTML += '                                     <th>OperDate</th>';
            if ($("#cbPaymentDate").prop("checked"))
                pTableHTML += '                                     <th>PaymentDate</th>';
            if ($("#cbDaysDifference").prop("checked"))
                pTableHTML += '                                     <th>DaysDif.</th>';
            if ($("#cbAging").prop("checked")) {
                pTableHTML += '                                 <th>0-30</th>';
                pTableHTML += '                                 <th>31-60</th>';
                pTableHTML += '                                 <th>61-90</th>';
                pTableHTML += '                                 <th>Later</th>';
            }
            pTableHTML += '                                 </tr>';
            pTableHTML += '                             </thead>';
            pTableHTML += '                             <tbody>';
            var serial = 0;
            $.each((pGroupedReportRows), function (i, item) {
                //pTableHTML += '                                     <tr class="' + (item.Cargo == "Totals In Default Currency:" ? "font-bold text-ul" : "") + '" style="font-size:95%; ' + (item.Cargo == "Total:" ? "background-color: #f9f9f9;!Important" : "") + '">' + (item.Code == "Total" ? "<b>" : "");
                var _AgingDays = Date.prototype.compareDates(GetDateWithFormatMDY(item.DueDate), FormattedTodaysDate);
                pTableHTML += '                                     <tr style="font-size:95%;">';
                ++serial;
                //pTableHTML += '                                         <td class="hide">' + (++serial) + '</td>';
                //pTableHTML += '                                         <td class="hide">' + item.BranchName + '</td>';

                let InvoiceTypeShortCode = "INV";
                if (InvoiceTypes_INV.includes(item.InvoiceTypeID)) {
                    InvoiceTypeShortCode = "SRV";
                } else if (InvoiceTypes_DN.includes(item.InvoiceTypeID)) {
                    InvoiceTypeShortCode = "D/N";
                } else if (InvoiceTypes_ACF.includes(item.InvoiceTypeID)) {
                    InvoiceTypeShortCode = "ACF";
                }

                let ShortYear = GetDateFromServer(item.InvoiceDate).slice(-2)
                if (pDefaults.UnEditableCompanyName == "EISAS") {
                    item.ConcatenatedInvoiceNumber = (InvoiceTypeShortCode + '-' + ShortYear + '-' + item.InvoiceNumber)
                }

           
                if (pDefaults.UnEditableCompanyName == "LIN")
                    pTableHTML += '                                         <td>' + (item.InvoiceTypeID == 12 ? '55550' : '') + (item.ConcatenatedInvoiceNumber == 0 ? "" : item.ConcatenatedInvoiceNumber) + '</td>';
                else
                    pTableHTML += '                                         <td>' + (item.ConcatenatedInvoiceNumber == 0 ? "" : item.ConcatenatedInvoiceNumber) + '</td>';

                if ($("#cbECode").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.ECode == 0 ? "" : item.ECode) + '</td>';
                if ($("#cbSOA").prop("checked"))
                    if (pDefaults.UnEditableCompanyName == "LIN")
                        pTableHTML += '                                         <td>' + (item.InvoiceTypeID == 12 ? '55550' : '') + (item.RelatedToInvoiceID != 0 ? (item.RelatedToInvoiceNumber + '/' + item.RelatedToInvoiceTypeName) : '') + '</td>';
                    else
                        pTableHTML += '                                         <td>' + (item.RelatedToInvoiceID != 0 ? (item.RelatedToInvoiceNumber + '/' + item.RelatedToInvoiceTypeName) : '') + '</td>';
                if ($("#cbPartnerType").prop("checked"))
                    pTableHTML += '                                         <td>' + item.PartnerTypeCode + '</td>';
                if ($("#cbCustomer").prop("checked"))
                    pTableHTML += '                                         <td>' + item.PartnerName.replace(/'/g, "''"); + '</td>';
                if ($("#cbCustomerReference").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.CustomerReference == 0 ? "" : item.CustomerReference) + '</td>';
                if ($("#cbMasterBL").prop("checked")) {
                    let MasterBL = item.MasterBL;
                    if (item.TransportType == AirTransportType && (MasterBL == "" || MasterBL == "0")) {
                        MasterBL = item.MainRouteNotes;
                    }
                    pTableHTML += '                                         <td>' + (MasterBL == 0 ? "" : MasterBL) + '</td>';
                }
                if ($("#cbHouseNumber").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.HouseNumber == 0 ? "" : item.HouseNumber) + '</td>';
                if ($("#cbOperationNotes").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.OperationNotes == 0 ? "" : item.OperationNotes) + '</td>';
                if ($("#cbInvoiceStatus").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.InvoiceStatus == 0 ? "" : item.InvoiceStatus) + '</td>';
                if ($("#cbDeliveryStatus").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.IsDelivered ? "Yes" : "No") + '</td>';
                if ($("#cbSalesman").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.SalesmanID != 0 ? item.SalesmanName : '') + '</td>';
                if ($("#cbOperationCode").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.OperationCode == 0 ? item.MasterOperationCode : item.OperationCode) + '</td>';
                if ($("#cbInvoiceDate").prop("checked"))
                    pTableHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + '</td>';
                if ($("#cbDueDate").prop("checked"))
                    pTableHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.DueDate)) + '</td>';
                if ($("#cbCertificateNumber").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.CertificateNumber == 0 ? "" : item.CertificateNumber) + '</td>';
                if ($("#cbVATNo").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.VATNumber == 0 ? "" : item.VATNumber) + '</td>';
                if ($("#cbBookingNumber").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.BookingNumber == 0 ? "" : item.BookingNumber) + '</td>';
                if ($("#cbVessel").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.VesselName == 0 ? "" : item.VesselName) + '</td>';
                //pTableHTML += '                                         <td' + (item.InvoiceStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + (item.InvoiceStatus == 0 ? "" : item.InvoiceStatus) + '</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableHTML += '                                         <td>' + item.AmountWithoutVAT.toFixed(2) + '</td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableHTML += '                                         <td>' + item.TaxAmount.toFixed(2) + '</td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableHTML += '                                         <td>' + item.DiscountAmount.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + item.Amount.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + item.CurrencyCode + '</td>';
                if ($("#cbLocalCurrency").prop("checked")) {
                    pTableHTML += '                                         <td>' + item.ExchangeRate + '</td>';
                    pTableHTML += '                                         <td>' + (item.ExchangeRate * item.Amount).toFixed(2) + '</td>';
                }
                if ($("#cbPaidAmount").prop("checked"))
                    pTableHTML += '                                         <td>' + item.PaidAmount.toFixed(2) + '</td>';
                if ($("#cbRemaining").prop("checked"))
                    pTableHTML += '                                         <td' + (item.InvoiceStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + item.RemainingAmount.toFixed(2) + '</td>';
                var _PaymentDate = (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PaymentDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PaymentDate)));
                if ($("#cbOperationDate").prop("checked"))
                    pTableHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.OperationOpenDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.OperationOpenDate))) + '</td>';
                if ($("#cbPaymentDate").prop("checked"))
                    pTableHTML += '                                         <td>' + _PaymentDate + '</td>';
                if ($("#cbDaysDifference").prop("checked"))
                    pTableHTML += '                                         <td>' + (_PaymentDate == "" ? "" : (Date.prototype.compareDates(GetDateWithFormatMDY(item.OperationOpenDate), GetDateWithFormatMDY(item.PaymentDate)))) + '</td>';
                //pTableHTML += '                                         <td>' + (_AgingDays >= 0 && _AgingDays < 30 ? '✔' : '') + '</td>';
                //pTableHTML += '                                         <td>' + (_AgingDays >= 30 && _AgingDays < 60 ? '✔' : '') + '</td>';
                //pTableHTML += '                                         <td>' + (_AgingDays >= 60 && _AgingDays < 90 ? '✔' : '') + '</td>';
                //pTableHTML += '                                         <td>' + (_AgingDays >= 90 ? '✔' : '') + '</td>';
                if ($("#cbAging").prop("checked")) {
                    pTableHTML += '                                     <td>' + (_AgingDays >= 0 && _AgingDays < 30 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                    pTableHTML += '                                     <td>' + (_AgingDays >= 30 && _AgingDays < 60 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                    pTableHTML += '                                     <td>' + (_AgingDays >= 60 && _AgingDays < 90 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                    pTableHTML += '                                     <td>' + (_AgingDays >= 90 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                }
                pTableHTML += '                                     </tr>';
            });
            pTableHTML += '                             </tbody>';
            pTableHTML += '                         </table>';
        } //if (pGroupedReportRows.length > 0)
    } //for (var i = 0; i < pBranchesList.length; i++)
    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        for (var i = 0; i < pBranchesList.length; i++) {
            var pGroupedReportRows = jQuery.grep(pReportRows, function (pReportRows) {
                return pReportRows.BranchID == pBranchesList[i].value;
            });
            if (pGroupedReportRows.length > 0) {
                var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pGroupedReportRows, "Amount", "ExchangeRate");
                var pTotalSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "Amount", "CurrencyCode");
                var pTableSummary = "";
                pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                //pTableSummary += '                                     <td>Status</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                pTableSummary += '                                 </tr>';

                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                    var pAmountWithoutVATSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "AmountWithoutVAT", "CurrencyCode");

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + pBranchesList[i].text + ' TOTAL AMOUNT W/O VAT :</td>';
                    pTableSummary += '                                     <td>' + pAmountWithoutVATSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                    pTableSummary += '                                 </tr>';
                }

                if (!$("#cbWithoutVAT").prop("checked")) {
                    var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "TaxAmount", "CurrencyCode");

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + pBranchesList[i].text + ' TOTAL VAT :</td>';
                    pTableSummary += '                                     <td>' + pTaxAmountSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                    pTableSummary += '                                 </tr>';
                }


                if (!$("#cbWithoutDiscount").prop("checked")) {
                    var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pGroupedReportRows);

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + pBranchesList[i].text + ' TOTAL WHT :</td>';
                    pTableSummary += '                                     <td>' + pDiscountAmountSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                }

                pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                pTableSummary += '                                     <td>' + pBranchesList[i].text + ' TOTAL :</td>';
                pTableSummary += '                                     <td>' + pTotalSummary + ' = (' + _TotalInDefaultCurrency + ')' + '</td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                //pTableSummary += '                                     <td>Status</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                pTableSummary += '                                 </tr>';
                $("#tblInvoicesReports" + pBranchesList[i].value + " tbody").append(pTableSummary);
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblInvoicesReports" + pBranchesList[i].value, pBranchesList[i].text + ' ' + 'Invoices');
            }
        }
    }
    else {
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Transport Type :</b> ' + $("#divTransportFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Direction Type :</b> ' + $("#divDirectionFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner Type:</b> ' + $("#slPartnerType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Inv. Type :</b> ' + $("#slInvoiceType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Inv. Status :</b> ' + $("#slInvoiceStatus option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Approval Status :</b> ' + $("#slApprovalStatus option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>VAT Type :</b> ' + ($("#cbWithoutVAT").prop("checked") ? "W/O" : $("#slVATType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>WHT :</b> ' + ($("#cbWithoutDiscount").prop("checked") ? "W/O" : $("#slDiscountType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Inv. Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
            ? "All Dates"
            : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        ReportHTML += '                     <div>&nbsp;</div>';
        for (var i = 0; i < pBranchesList.length; i++) {
            var pGroupedReportRows = jQuery.grep(pReportRows, function (pReportRows) {
                return pReportRows.BranchID == pBranchesList[i].value;
            });
            if (pGroupedReportRows.length > 0) {
                //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                ReportHTML += '                         <h4><b><u>' + pBranchesList[i].text + ' BRANCH:</u></b></h4>';

                ReportHTML += '                         <table id="tblInvoicesReports' + pBranchesList[i].value + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
                ReportHTML += '                         ' + $("#tblInvoicesReports" + pBranchesList[i].value).html();
                ReportHTML += '                         </table>';
                //ReportHTML += '                     </div>';//of table-responsive
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                    var pAmountWithoutVATSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "AmountWithoutVAT", "CurrencyCode");
                    ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + pBranchesList[i].text + ' TOTAL AMOUNT W/O VAT : </b> ' + pAmountWithoutVATSummary + '</div>';
                }
                if (!$("#cbWithoutVAT").prop("checked")) {
                    var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "TaxAmount", "CurrencyCode");
                    ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + pBranchesList[i].text + ' TOTAL VAT : </b> ' + pTaxAmountSummary + '</div>';
                }
                if (!$("#cbWithoutDiscount").prop("checked")) {
                    var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pGroupedReportRows);
                    ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + pBranchesList[i].text + ' TOTAL WHT : </b> ' + pDiscountAmountSummary + '</div>';
                }
                var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pGroupedReportRows, "Amount", "ExchangeRate");
                var pTotalSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "Amount", "CurrencyCode");
                ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + pBranchesList[i].text + ' TOTAL AMOUNT : </b> ' + pTotalSummary + ' = (' + _TotalInDefaultCurrency + ')' + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Payables Summary :</b> ' + pPayablesCurrenciesSummary + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Invoices Summary :</b> ' + pReceivablesOrInvoicesCurrenciesSummary + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Profit Summary :</b> ' + pProfitCurrenciesSummary + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Profit Margin :</b> ' + pMarginSummary + '%</div>';
            }
        }

        debugger;
        if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
            var pAmountWithoutVATSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "AmountWithoutVAT", "CurrencyCode");
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL AMOUNT W/O VAT :</u> </b> ' + pAmountWithoutVATSummary + '</div>';
        }
        if (!$("#cbWithoutVAT").prop("checked")) {
            var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "TaxAmount", "CurrencyCode");
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL VAT :</u> </b> ' + pTaxAmountSummary + '</div>';
        }
        if (!$("#cbWithoutDiscount").prop("checked")) {
            var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pReportRows);
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL WHT :</u> </b> ' + pDiscountAmountSummary + '</div>';
        }
        var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pReportRows, "Amount", "ExchangeRate");
        var pTotalSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "Amount", "CurrencyCode");
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary + ' =(' + _TotalInDefaultCurrency + ')' + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Paid :</u> </b> ' + _TotalPaid + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Remaining :</u> </b> ' + _TotalRemaining + '</div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        if (pOutputTo == "PrintInReportBody")
            $("#ReportBody").html(ReportHTML);
        else {
            var mywindow = window.open('', '_blank');
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
    }
}
function InvoicesReports_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pInvoiceItems = JSON.parse(data[2]);
    var _TotalPaid = CalculateSumOfArrayWithGroupBy(pReportRows, "PaidAmount", "CurrencyCode");
    var _TotalRemaining = CalculateSumOfArrayWithGroupBy(pReportRows, "RemainingAmount", "CurrencyCode");

    var pReportTitle = $("#cbAging").prop("checked") ? "Aging Report" : "Invoices Report";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";
    //$('#hDefaultCompanyName').val()
    pTableHTML += '<input type="text" style="display:none;" id="hDefaultCompanyName" value="' + $('#hDefaultCompanyName').val() +'"></input>';
    var pBranchesList = document.getElementById("hReadySlBranches").options;
    for (var i = 0; i < 1; i++) {
        var pGroupedReportRows = pReportRows;
        ////Array.sort() works by looping through each item in the array and comparing it to the one after it based on some criteria you specify in your comparison function, if return is 1 then swap.
        //pGroupedReportRows.sort((a, b) => ((a.InvoiceTypeName >= b.InvoiceTypeName && a.InvoiceNumber > b.InvoiceNumber)
        //                                  ) ? 1 : -1);
        if (pGroupedReportRows.length > 0) {
            //pTableHTML += '                         <table id="tblInvoicesReports" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
            pTableHTML += '                         <table id="tblInvoicesReports' + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            pTableHTML += '                             <thead>';
            pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            //pTableHTML += '                                     <th class="hide">Ser.</th>';
            //pTableHTML += '                                     <th class="hide">Branch</th>';

            pTableHTML += '                                     <th>Inv No.</th>';
            if ($("#cbECode").prop("checked"))
                pTableHTML += '                                     <th>ECode</th>';
            if ($("#cbSOA").prop("checked"))
                pTableHTML += '                                     <th>SOA</th>';
            if ($("#cbPartnerType").prop("checked"))
                pTableHTML += '                                     <th>Partner Type</th>';
            if ($("#cbCustomer").prop("checked"))
                pTableHTML += '                                     <th>Partner Name</th>';

            if ($("#cbIsByItem").prop("checked")) {
                pTableHTML += '                                     <th>Item</th>';
                pTableHTML += '                                     <th>Value</th>';
            }

            if ($("#cbCustomerReference").prop("checked"))
                pTableHTML += '                                     <th>CustomerRef.</th>';
            if ($("#cbMasterBL").prop("checked"))
                pTableHTML += '                                     <th>MasterBL</th>';
            if ($("#cbHouseNumber").prop("checked"))
                pTableHTML += '                                     <th>HBL</th>';
            if ($("#cbOperationNotes").prop("checked"))
                pTableHTML += '                                     <th>Oper.Notes</th>';
            if ($("#cbInvoiceStatus").prop("checked"))
                pTableHTML += '                                     <th>Status</th>';
            if ($("#cbDeliveryStatus").prop("checked"))
                pTableHTML += '                                     <th>Delivery</th>';
            if ($("#cbSalesman").prop("checked"))
                pTableHTML += '                                     <th>Salesman</th>';
            if ($("#cbOperationCode").prop("checked"))
                pTableHTML += '                                     <th>Operation No.</th>';
            if ($("#cbACIDNo").prop("checked")) {
                if (pDefaults.UnEditableCompanyName == "ARK")
                    pTableHTML += '                                     <th>ACID No.</th>';
            }
            //    pTableHTML += '                                     <th>Operation No.</th>';
            if ($("#OPType").prop("checked"))
                pTableHTML += '                                     <th>Operation Type.</th>';
            if ($("#cbInvoiceDate").prop("checked"))
                pTableHTML += '                                     <th>Inv. Date</th>';
            if ($("#cbDueDate").prop("checked"))
                pTableHTML += '                                     <th>Due Date</th>';
            if ($("#cbCertificateNumber").prop("checked"))
                pTableHTML += '                                     <th>Cert No</th>';
            if ($("#cbVATNo").prop("checked"))
                pTableHTML += '                                     <th>VAT No</th>';
            if ($("#cbBookingNumber").prop("checked"))
                pTableHTML += '                                     <th>Booking No</th>';
            if ($("#cbVessel").prop("checked"))
                pTableHTML += '                                     <th>Vessel</th>';
            if ($("#cbETD").prop("checked"))
                pTableHTML += '                                     <th>ETD POL</th>';
            if ($("#cbETA").prop("checked"))
                pTableHTML += '                                     <th>ETA POD</th>';
            if ($("#cbShipperName").prop("checked"))
                pTableHTML += '                                     <th>Shipper Name</th>';
            if ($("#cbACID").prop("checked"))
                pTableHTML += '                                     <th>ACID Number</th>';
            //pTableHTML += '                                     <th>Status</th>';
            if ($("#cbVoucher").prop("checked"))
                pTableHTML += '                                     <th>Voucher Code</th>';
            if (!$("#cbIsByItem").prop("checked")) {
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableHTML += '                                     <th>Amt w/o VAT</th>';
                if (!$("#cbWithoutVAT").prop("checked")) {
                    if (pDefaults.UnEditableCompanyName == "SWI") {
                        pTableHTML += '                                     <th>VAT 10%</th>';
                        pTableHTML += '                                     <th>VAT 14%</th>';
                    }
                    else
                        pTableHTML += '                                     <th>VAT</th>';
                }
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableHTML += '                                     <th>WHT</th>';
                pTableHTML += '                                     <th>Total</th>';
            }

            
            pTableHTML += '                                     <th>Cur.</th>';
            if ($("#cbDraftInvoice").prop("checked"))
                pTableHTML += '                                     <th>Transfer To Invoice</th>';

            if ($("#cbLocalCurrency").prop("checked")) {
                pTableHTML += '                                     <th>Ex.Rate</th>';
                pTableHTML += '                                     <th>' + pDefaults.CurrencyCode + '</th>';
            }
            if ($("#cbPaidAmount").prop("checked"))
                pTableHTML += '                                     <th>Paid Amt.</th>';
            if ($("#cbRemaining").prop("checked"))
                pTableHTML += '                                     <th>Remaining</th>';
            if ($("#cbOperationDate").prop("checked"))
                pTableHTML += '                                     <th>OperDate</th>';
            if ($("#cbPaymentDate").prop("checked"))
                pTableHTML += '                                     <th>PaymentDate</th>';
            if ($("#cbDaysDifference").prop("checked"))
                pTableHTML += '                                     <th>DaysDif.</th>';

            pTableHTML += '                                     <th>Voucher Num.</th>';
            if ($("#cbAging").prop("checked")) {
                pTableHTML += '                                 <th>0-30</th>';
                pTableHTML += '                                 <th>31-60</th>';
                pTableHTML += '                                 <th>61-90</th>';
                pTableHTML += '                                 <th>Later</th>';
            }
            if ($("#PC").prop("checked"))
                pTableHTML += '                                     <th>PC.</th>';
            if ($("#VolumNo").prop("checked"))
                pTableHTML += '                                     <th>Volum.</th>';
            //if ($("#PONumber").prop("checked"))
            //    pTableHTML += '                                     <th>PO Number.</th>';
            pTableHTML += '                                 </tr>';
            pTableHTML += '                             </thead>';
            pTableHTML += '                             <tbody>';
            var serial = 0;
            $.each((pGroupedReportRows), function (i, item) {
                //debugger;
                var _CurrentInvoiceItems = [];
                if ($("#cbIncludeAllAccNotes").prop("checked")) {
                    _CurrentInvoiceItems = pInvoiceItems.filter(x => item.ID == (x.AccNoteID == 0 ? x.InvoiceID : x.AccNoteID));
                }
                else if ($("#cbDraftInvoice").prop("checked")) {
                    _CurrentInvoiceItems = pInvoiceItems.filter(x => item.ID == x.DraftInvoiceID);
                } 
                else {
                    _CurrentInvoiceItems = pInvoiceItems.filter(x => item.ID == x.InvoiceID);
                }
                var _CurrentInvoiceItemsCount = _CurrentInvoiceItems.length;
                if ($("#cbIsByItem").prop("checked") == false)
                    _CurrentInvoiceItemsCount = _CurrentInvoiceItems.length > 0 ? 1 : ($("#cbIncludeAllAccNotes").prop("checked") ? 1 : 0);

                //$.each((_CurrentInvoiceItems), function (j, InvoiceItem) {
                //    pTableHTML += '                                     <tr style="font-size:95%;">';
                //    pTableHTML += '                                         <td>' + InvoiceItem.ChargeTypeName + (pDefaults.UnEditableCompanyName == "SEA" ? (InvoiceItem.Notes == 0 ? "" : (" - " + InvoiceItem.Notes)) : "") + '</td>';
                //    pTableHTML += '                                         <td>' + InvoiceItem.Quantity.toFixed(2) + '</td>';
                //    pTableHTML += '                                         <td>' + InvoiceItem.SalePrice.toFixed(2) + '</td>';
                //    if (pDefaults.IsTaxOnItems) {
                //        pTableHTML += '                                         <td>' + InvoiceItem.TaxPercentage.toFixed(2) + '%' + '</td>';
                //        pTableHTML += '                                         <td>' + InvoiceItem.TaxAmount.toFixed(2) + '</td>';
                //        pTableHTML += '                                         <td>' + InvoiceItem.DiscountPercentage.toFixed(2) + '%' + '</td>';
                //        pTableHTML += '                                         <td>' + InvoiceItem.DiscountAmount.toFixed(2) + '</td>';
                //    }
                //    pTableHTML += '                                         <td>' + InvoiceItem.SaleAmount.toFixed(2) + '</td>';
                //    pTableHTML += '                                     </tr>';
                //});
                if (pDefaults.UnEditableCompanyName == "ARK" && $("#cbVoucher").prop("checked"))
                {
                    VoucherCode = '';
                    var pWhereClause = "where id in (select VoucherID from A_VoucherInvoicesPayment where InvoiceID =" + item.ID + ")";
                    CallGETFunctionWithParameters("/api/Voucher/LoadAll"
                        , { pWhereClause: pWhereClause }
                        , function (pData) {
                            if (JSON.parse(pData[0]).length>0)
                            VoucherCode = JSON.parse(pData[0])[0].Code;


                        }
                        , null, false);



                }

                if (pDefaults.UnEditableCompanyName == "HAN")
                {


                    ETDPOL = '';
                    ETAPOD = '';
                    shipperName = '';
                    ACID = '';
                    var pWhereClause = "Where id = " + item.OperationID;
                    let pWhereClause_Routings = "1=2";
                    let pOrderBy = " ID DESC ";
                    let pParametersWithValues = {
                        pIsLoadArrayOfObjects: false
                        , pPageNumber: 1
                        , pPageSize: '10'
                        , pWhereClause: pWhereClause
                        , pIsBindTableRows: false
                        , pWhereClause_Routings: pWhereClause_Routings
                        , pOrderBy: pOrderBy
                        , pCallingControl: "OperationsManagement_BindTableRows"
                    }
                    CallGETFunctionWithParameters("api/Operations/LoadWithWhereClause", pParametersWithValues, function (pData) {

                        var operation = JSON.parse(pData[0]);

                        ETDPOL = operation[0].ExpectedDeparture;
                        ETAPOD = operation[0].ExpectedArrival;
                        shipperName = operation[0].ShipperName;
                        ACID = operation[0].ACIDNumber;

                     

                    }, null, false/*Default true*/);




                    //let pControllerParameters = {
                    //    pIsLoadArrayOfObjects: false
                    //    , pPageNumber: 1
                    //    , pPageSize: 1
                    //    , pWhereClause: pWhereClause
                    //    , pIsBindTableRows: false
                    //    , pWhereClause_Routings: pWhereClause_Routings
                    //    , pOrderBy: pOrderBy
                    //    , pCallingControl: ""
                    //}
                    //LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "api/Operations/LoadWithWhereClause", pWhereClause, "ID DESC", 1, 10, pControllerParameters
                    //    , function (pData) {
                    //        var operation = JSON.parse(pData[0]);

                    //        ETDPOL= operation[0].ExpectedDeparture;
                    //        ETAPOD = operation[0].ExpectedArrival;
                    //        shipperName = operation[0].ShipperName;
                    //        ACID = operation[0].ACIDNumber;
                           


                    //    });



                }
                for (let ItemsCounter = 0; ItemsCounter < _CurrentInvoiceItemsCount; ItemsCounter++) {

                    //pTableHTML += '                                     <tr class="' + (item.Cargo == "Totals In Default Currency:" ? "font-bold text-ul" : "") + '" style="font-size:95%; ' + (item.Cargo == "Total:" ? "background-color: #f9f9f9;!Important" : "") + '">' + (item.Code == "Total" ? "<b>" : "");
                    var _AgingDays = Date.prototype.compareDates(GetDateWithFormatMDY(item.DueDate), FormattedTodaysDate);
                    pTableHTML += '                                     <tr style="font-size:95%;">';
                    ++serial;
                    //pTableHTML += '                                         <td class="hide">' + (++serial) + '</td>';
                    //pTableHTML += '                                         <td class="hide">' + item.BranchName + '</td>';
                    debugger;
                    
                    let InvoiceTypeShortCode = "INV";
                    if (InvoiceTypes_INV.includes(item.InvoiceTypeID)) {
                        InvoiceTypeShortCode = "SRV";
                    } else if (InvoiceTypes_DN.includes(item.InvoiceTypeID)) {
                        InvoiceTypeShortCode = "D/N";
                    } else if (InvoiceTypes_ACF.includes(item.InvoiceTypeID)) {
                        InvoiceTypeShortCode = "ACF";
                    }

                    let ShortYear = GetDateFromServer(item.InvoiceDate).slice(-2)
                    if (pDefaults.UnEditableCompanyName == "EISAS") {
                        item.ConcatenatedInvoiceNumber = (InvoiceTypeShortCode + '-' + ShortYear + '-' + item.InvoiceNumber)
                    }

                    //pTableHTML += '                                         <td>' + (item.ConcatenatedInvoiceNumber == 0 ? "" : item.ConcatenatedInvoiceNumber) + '</td>';
                   

                    if (pDefaults.UnEditableCompanyName == "LIN")
                        pTableHTML += `                     <td class="" style="text-align:center;"><a href="#" onclick="Invoices_Print(${item.ID},3,'Print',0);" ><span>&emsp; ${item.InvoiceTypeID == 12 ? "55550" : ""}${item.ConcatenatedInvoiceNumber} </span></td></a> `;
                    else
                        pTableHTML += `                     <td class="" style="text-align:center;"><a href="#" onclick="Invoices_Print(${item.ID},3,'Print',0);" ><span>&emsp; ${item.ConcatenatedInvoiceNumber} </span></td></a> `;


                    if ($("#cbECode").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.ECode == 0 ? "" : item.ECode) + '</td>';
                    if ($("#cbSOA").prop("checked"))
                        if (pDefaults.UnEditableCompanyName == "LIN")
                            pTableHTML += '                                         <td>' + (item.InvoiceTypeID == 12 ? '55550' : '') + (item.RelatedToInvoiceID != 0 ? (item.RelatedToInvoiceNumber + '/' + item.RelatedToInvoiceTypeName) : '') + '</td>';
                        else
                            pTableHTML += '                                         <td>' + (item.RelatedToInvoiceID != 0 ? (item.RelatedToInvoiceNumber + '/' + item.RelatedToInvoiceTypeName) : '') + '</td>';
                    if ($("#cbPartnerType").prop("checked"))
                        pTableHTML += '                                         <td>' + item.PartnerTypeCode + '</td>';
                    if ($("#cbCustomer").prop("checked"))
                        pTableHTML += '                                         <td>' + item.PartnerName.replace(/'/g, "''"); + '</td>';

                    if ($("#cbIsByItem").prop("checked")) {
                        pTableHTML += '                                         <td>' + _CurrentInvoiceItems[ItemsCounter].ChargeTypeName + '</td>';
                        pTableHTML += '                                         <td>' + _CurrentInvoiceItems[ItemsCounter].SaleAmount.toFixed(2) + '</td>';
                    }

                    if ($("#cbCustomerReference").prop("checked")) {
                        if (pDefaults.UnEditableCompanyName=="UNF") {
                            pTableHTML += '                                         <td>' + (item.OperationCode == 0 ? "" : item.OperationCode) + '</td>';

                        } else {
                        pTableHTML += '                                         <td>' + (item.CustomerReference == 0 ? "" : item.CustomerReference) + '</td>';

                        }

                    }
                    if ($("#cbMasterBL").prop("checked")) {
                        let MasterBL = item.MasterBL;
                        if (item.TransportType == AirTransportType && (MasterBL == "" || MasterBL == "0")) {
                            MasterBL = item.MainRouteNotes;
                        }
                        pTableHTML += '                                         <td>' + (MasterBL == 0 ? "" : MasterBL) + '</td>';
                    }
                    if ($("#cbHouseNumber").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.HouseNumber == 0 ? "" : item.HouseNumber) + '</td>';
                    if ($("#cbOperationNotes").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.OperationNotes == 0 ? "" : item.OperationNotes) + '</td>';
                    if ($("#cbInvoiceStatus").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.InvoiceStatus == 0 ? "" : item.InvoiceStatus) + '</td>';
                    if ($("#cbDeliveryStatus").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.IsDelivered ? "Yes" : "No") + '</td>';
                    if ($("#cbSalesman").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.SalesmanID != 0 ? item.SalesmanName : '') + '</td>';
                    if ($("#cbOperationCode").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.MasterOperationCode == 0 ? item.OperationCode : item.MasterOperationCode) + '</td>';
                    if ($("#cbACIDNo").prop("checked")) {
                        if (pDefaults.UnEditableCompanyName == "ARK")
                            pTableHTML += '                                         <td>' + (item.ACIDNumber == 0 ? item.ACIDNumber : item.ACIDNumber) + '</td>';
                    }
                    if ($("#OPType").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.ShipmentTypeCode == 0 ? "" : item.ShipmentTypeCode) + '</td>';

                    if ($("#cbInvoiceDate").prop("checked"))
                        pTableHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + '</td>';
                    if ($("#cbDueDate").prop("checked"))
                        pTableHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.DueDate)) + '</td>';
                    if ($("#cbCertificateNumber").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.CertificateNumber == 0 ? "" : item.CertificateNumber) + '</td>';
                    if ($("#cbVATNo").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.VATNumber == 0 ? "" : item.VATNumber) + '</td>';
                    if ($("#cbBookingNumber").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.BookingNumber == 0 ? "" : item.BookingNumber) + '</td>';
                    if ($("#cbVessel").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.VesselName == 0 ? "" : item.VesselName) + '</td>';
                    if ($("#cbETD").prop("checked"))
                        pTableHTML += '                                         <td>' +( ConvertDateFormat(GetDateWithFormatMDY(ETDPOL)) == "01/01/1900" ? "-" : ConvertDateFormat(GetDateWithFormatMDY(ETDPOL))) + '</td>';
                    if ($("#cbETA").prop("checked"))
                        pTableHTML += '                                         <td>' +( ConvertDateFormat(GetDateWithFormatMDY(ETAPOD)) == "01/01/1900" ? "-" : ConvertDateFormat(GetDateWithFormatMDY(ETAPOD))) + '</td>';
                    if ($("#cbShipperName").prop("checked"))
                        pTableHTML += '                                         <td>' + (shipperName == 0 ? "" : shipperName) + '</td>';
                    if ($("#cbACID").prop("checked"))
                        pTableHTML += '                                         <td>' + (ACID == 0 ? "" : ACID) + '</td>';
                    //pTableHTML += '                                         <td' + (item.InvoiceStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + (item.InvoiceStatus == 0 ? "" : item.InvoiceStatus) + '</td>';
                    if ($("#cbVoucher").prop("checked"))
                        pTableHTML += '                                         <td>' + (VoucherCode == 0 ? "" : VoucherCode) + '</td>';
                    if (!$("#cbIsByItem").prop("checked")) {
                        if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                            pTableHTML += '                                         <td>' + item.AmountWithoutVAT.toFixed(2) + '</td>';
                        if (!$("#cbWithoutVAT").prop("checked")) {
                            if (pDefaults.UnEditableCompanyName == "SWI") {
                                pTableHTML += '                                         <td>' + item.Items10PercTaxAmount.toFixed(2) + '</td>';
                                pTableHTML += '                                         <td>' + item.Items14PercTaxAmount.toFixed(2) + '</td>';
                            }
                            else
                                pTableHTML += '                                         <td>' + item.TaxAmount.toFixed(2) + '</td>';
                        }
                        if (!$("#cbWithoutDiscount").prop("checked"))
                            pTableHTML += '                                         <td>' + item.DiscountAmount.toFixed(2) + '</td>';
                        pTableHTML += '                                         <td>' + item.Amount.toFixed(2) + '</td>';
                    }
                    
                    pTableHTML += '                                         <td>' + item.CurrencyCode + '</td>';

                    if ($("#cbDraftInvoice").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.ChildInvoiceID == 0 ? "N" : "Y") + '</td>';

                    if ($("#cbLocalCurrency").prop("checked")) {
                        pTableHTML += '                                         <td>' + item.ExchangeRate + '</td>';
                        if (!$("#cbIsByItem").prop("checked"))
                            pTableHTML += '                                         <td>' + (item.ExchangeRate * item.Amount).toFixed(2) + '</td>';
                        else
                            pTableHTML += '                                         <td>' + (item.ExchangeRate * _CurrentInvoiceItems[ItemsCounter].SaleAmount).toFixed(2) + '</td>';
                        
                    }
                    if ($("#cbPaidAmount").prop("checked"))
                        pTableHTML += '                                         <td>' + item.PaidAmount.toFixed(2) + '</td>';
                    if ($("#cbRemaining").prop("checked"))
                        pTableHTML += '                                         <td' + (item.InvoiceStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + item.RemainingAmount.toFixed(2) + '</td>';
                    var _PaymentDate = (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PaymentDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PaymentDate)));
                    if ($("#cbOperationDate").prop("checked"))
                        pTableHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.OperationOpenDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.OperationOpenDate))) + '</td>';
                    if ($("#cbPaymentDate").prop("checked"))
                        pTableHTML += '                                         <td>' + _PaymentDate + '</td>';
                    if ($("#cbDaysDifference").prop("checked"))
                        pTableHTML += '                                         <td>' + (_PaymentDate == "" ? "" : (Date.prototype.compareDates(GetDateWithFormatMDY(item.OperationOpenDate), GetDateWithFormatMDY(item.PaymentDate)))) + '</td>';

                    pTableHTML += '                                         <td>' + (item.ChequeNum == "" ? "" : item.ChequeNum) + (item.AllocationCode == 0 ? "" : "(" +item.AllocationCode+")") + '</td>';

                    //pTableHTML += '                                         <td>' + (_AgingDays >= 0 && _AgingDays < 30 ? '✔' : '') + '</td>';
                    //pTableHTML += '                                         <td>' + (_AgingDays >= 30 && _AgingDays < 60 ? '✔' : '') + '</td>';
                    //pTableHTML += '                                         <td>' + (_AgingDays >= 60 && _AgingDays < 90 ? '✔' : '') + '</td>';
                    //pTableHTML += '                                         <td>' + (_AgingDays >= 90 ? '✔' : '') + '</td>';
                    if ($("#cbAging").prop("checked")) {
                        pTableHTML += '                                     <td>' + (_AgingDays >= 0 && _AgingDays < 30 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                        pTableHTML += '                                     <td>' + (_AgingDays >= 30 && _AgingDays < 60 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                        pTableHTML += '                                     <td>' + (_AgingDays >= 60 && _AgingDays < 90 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                        pTableHTML += '                                     <td>' + (_AgingDays >= 90 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                    }
                    if ($("#PC").prop("checked"))
                        pTableHTML += '                                     <td>' + item.POrCName + '</td>';
                    if ($("#VolumNo").prop("checked"))
                        pTableHTML += '                                     <td>' + item.Volume + '</td>';
                    //if ($("#PONumber").prop("checked"))
                    //    pTableHTML += '                                     <td>' + (item.PONumber == 0 ? "" : item.PONumber) +'</td>';
                    pTableHTML += '                                     </tr>';



                }

                

                
            });
            pTableHTML += '                             </tbody>';
            pTableHTML += '                         </table>';
        } //if (pGroupedReportRows.length > 0)
    } //for (var i = 0; i < 1; i++)
    debugger;
    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        for (var i = 0; i < 1; i++) {
            //var pGroupedReportRows = jQuery.grep(pReportRows, function (pReportRows) {
            //    return pReportRows.BranchID == pBranchesList[i].value;
            //});
            var pGroupedReportRows = pReportRows;
            if (pGroupedReportRows.length > 0) {
                var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pGroupedReportRows, "Amount", "ExchangeRate");
                var pTotalSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "Amount", "CurrencyCode");
                var pTableSummary = "";
                pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                //pTableSummary += '                                     <td>Status</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                if ($("#cbDraftInvoice").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                pTableSummary += '                                 </tr>';

                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                    var pAmountWithoutVATSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "AmountWithoutVAT", "CurrencyCode");

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + 'TOTAL AMOUNT W/O VAT :</td>';
                    pTableSummary += '                                     <td>' + pAmountWithoutVATSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if ($("#cbDraftInvoice").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                    pTableSummary += '                                 </tr>';
                }

                if (!$("#cbWithoutVAT").prop("checked")) {
                    var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "TaxAmount", "CurrencyCode");
                    var pTaxAmountSummary_10 = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "Items10PercTaxAmount", "CurrencyCode");
                    var pTaxAmountSummary_14 = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "Items14PercTaxAmount", "CurrencyCode");

                    if (pDefaults.UnEditableCompanyName == "SWI") {
                        { //pTaxAmountSummary_10
                            pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                            pTableSummary += '                                     <td>' + 'TOTAL 10% VAT :</td>';
                            pTableSummary += '                                     <td>' + pTaxAmountSummary_10 + '</td>';
                            pTableSummary += '                                     <td></td>';
                            pTableSummary += '                                     <td></td>';
                            pTableSummary += '                                     <td></td>';
                            pTableSummary += '                                     <td></td>';
                            //pTableSummary += '                                     <td>Status</td>';
                            if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                                pTableSummary += '                                     <td></td>';
                            if (!$("#cbWithoutVAT").prop("checked"))
                                pTableSummary += '                                     <td></td>';
                            if (!$("#cbWithoutDiscount").prop("checked"))
                                pTableSummary += '                                     <td></td>';
                            pTableSummary += '                                     <td></td>';
                            pTableSummary += '                                     <td></td>';
                            pTableSummary += '                                     <td></td>';
                            if ($("#cbDraftInvoice").prop("checked"))
                                pTableSummary += '                                     <td></td>';
                            pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                            pTableSummary += '                                 </tr>';
                        }
                        { //pTaxAmountSummary_14
                            pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                            pTableSummary += '                                     <td>' + 'TOTAL 14% VAT :</td>';
                            pTableSummary += '                                     <td>' + pTaxAmountSummary_14 + '</td>';
                            pTableSummary += '                                     <td></td>';
                            pTableSummary += '                                     <td></td>';
                            pTableSummary += '                                     <td></td>';
                            pTableSummary += '                                     <td></td>';
                            //pTableSummary += '                                     <td>Status</td>';
                            if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                                pTableSummary += '                                     <td></td>';
                            if (!$("#cbWithoutVAT").prop("checked"))
                                pTableSummary += '                                     <td></td>';
                            if (!$("#cbWithoutDiscount").prop("checked"))
                                pTableSummary += '                                     <td></td>';
                            pTableSummary += '                                     <td></td>';
                            pTableSummary += '                                     <td></td>';
                            pTableSummary += '                                     <td></td>';
                            if ($("#cbDraftInvoice").prop("checked"))
                                pTableSummary += '                                     <td></td>';
                            pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                            pTableSummary += '                                 </tr>';
                        }
                    }
                    else {

                        pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                        pTableSummary += '                                     <td>' + 'TOTAL VAT :</td>';
                        pTableSummary += '                                     <td>' + pTaxAmountSummary + '</td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        //pTableSummary += '                                     <td>Status</td>';
                        if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                            pTableSummary += '                                     <td></td>';
                        if (!$("#cbWithoutVAT").prop("checked"))
                            pTableSummary += '                                     <td></td>';
                        if (!$("#cbWithoutDiscount").prop("checked"))
                            pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td>';
                        if ($("#cbDraftInvoice").prop("checked"))
                            pTableSummary += '                                     <td></td>';
                        pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                        pTableSummary += '                                 </tr>';
                    }

                }


                if (!$("#cbWithoutDiscount").prop("checked")) {
                    var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pGroupedReportRows);

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + 'TOTAL WHT :</td>';
                    pTableSummary += '                                     <td>' + pDiscountAmountSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    if ($("#cbDraftInvoice").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                }

                pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                pTableSummary += '                                     <td>' + 'TOTAL :</td>';
                pTableSummary += '                                     <td>' + pTotalSummary + ' = (' + _TotalInDefaultCurrency + ')' + '</td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                //pTableSummary += '                                     <td>Status</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                if ($("#cbDraftInvoice").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                pTableSummary += '                                 </tr>';
                $("#tblInvoicesReports tbody").append(pTableSummary);
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblInvoicesReports", 'Invoices');
            }
        }
    }
    else {
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
        ReportHTML += AddScripts;
        ReportHTML += '     </head>';

        ReportHTML += '         <body style="background-color:white;overflow-x: scroll;">';
        ReportHTML += '<input type="text" style="display:none;" id="hDefaultCompanyName" value="' + $('#hDefaultCompanyName').val() + '"></input>';
        ReportHTML += '<input type="checkbox" style="display:none;" id="cbPrintMBL" checked></input>';
        ReportHTML += '<input type="checkbox" style="display:none;" id="cbPrintHBL" checked></input>';
        ReportHTML += '<input type="checkbox" style="display:none;" id="cbPrintBankDetailsFromDefaults" checked></input>';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Transport Type :</b> ' + $("#divTransportFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Direction Type :</b> ' + $("#divDirectionFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner Type:</b> ' + $("#slPartnerType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Inv. Type :</b> ' + $("#slInvoiceType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Inv. Status :</b> ' + $("#slInvoiceStatus option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Approval Status :</b> ' + $("#slApprovalStatus option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>VAT Type :</b> ' + ($("#cbWithoutVAT").prop("checked") ? "W/O" : $("#slVATType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>WHT:</b> ' + ($("#cbWithoutDiscount").prop("checked") ? "W/O" : $("#slDiscountType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Inv. Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
                                                                                    ? "All Dates"
                                                                                    : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        ReportHTML += '                     <div>&nbsp;</div>';
        var pGroupedReportRows = pReportRows;
        if (pGroupedReportRows.length > 0) {
            //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';

            ReportHTML += '                         <table id="tblInvoicesReports' + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            ReportHTML += '                         ' + $("#tblInvoicesReports").html();
            ReportHTML += '                         </table>';
            //ReportHTML += '                     </div>';//of table-responsive
            //if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
            //    var pAmountWithoutVATSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "AmountWithoutVAT", "CurrencyCode");
            //    ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + ' TOTAL AMOUNT W/O VAT : </b> ' + pAmountWithoutVATSummary + '</div>';
            //}
            //if (!$("#cbWithoutVAT").prop("checked")) {
            //    var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "TaxAmount", "CurrencyCode");
            //    ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + ' TOTAL VAT : </b> ' + pTaxAmountSummary + '</div>';
            //}
            //if (!$("#cbWithoutDiscount").prop("checked")) {
            //    var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pGroupedReportRows);
            //    ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + ' TOTAL WHT : </b> ' + pDiscountAmountSummary + '</div>';
            //}
            //var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pGroupedReportRows, "Amount", "ExchangeRate");
            //var pTotalSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "Amount", "CurrencyCode");
            //ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + ' TOTAL AMOUNT : </b> ' + pTotalSummary + ' = (' + _TotalInDefaultCurrency + ')' + '</div>';
        }

        debugger;
        if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
            var pAmountWithoutVATSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "AmountWithoutVAT", "CurrencyCode");
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL AMOUNT W/O VAT :</u> </b> ' + pAmountWithoutVATSummary + '</div>';
        }
        if (!$("#cbWithoutVAT").prop("checked")) {
            var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "TaxAmount", "CurrencyCode");
            var pTaxAmountSummary_10 = CalculateSumOfArrayWithGroupBy(pReportRows, "Items10PercTaxAmount", "CurrencyCode");
            var pTaxAmountSummary_14 = CalculateSumOfArrayWithGroupBy(pReportRows, "Items14PercTaxAmount", "CurrencyCode");
            if (pDefaults.UnEditableCompanyName == "SWI") {
                ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL 10% VAT :</u> </b> ' + pTaxAmountSummary_10 + '</div>';
                ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL 14% VAT :</u> </b> ' + pTaxAmountSummary_14 + '</div>';
            }
            else {
                ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL VAT :</u> </b> ' + pTaxAmountSummary + '</div>';
            }
        }
        if (!$("#cbWithoutDiscount").prop("checked")) {
            var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pReportRows);
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL WHT :</u> </b> ' + pDiscountAmountSummary + '</div>';
        }
        var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pReportRows, "Amount", "ExchangeRate");
        var pTotalSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "Amount", "CurrencyCode");
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary + ' =(' + _TotalInDefaultCurrency + ')' + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Paid :</u> </b> ' + _TotalPaid + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Remaining :</u> </b> ' + _TotalRemaining + '</div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        if (pOutputTo == "PrintInReportBody")
            $("#ReportBody").html(ReportHTML);
        else {
            var mywindow = window.open('', '_blank');
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
    }
}
/*****************************TaxOnItems Draw**********************************/
function InvoicesReports_DrawReport_GroupByPartners_TaxOnItems(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pInvoiceItems = JSON.parse(data[2]);
    var _TotalPaid = CalculateSumOfArrayWithGroupBy(pReportRows, "PaidAmount", "CurrencyCode");
    var _TotalRemaining = CalculateSumOfArrayWithGroupBy(pReportRows, "RemainingAmount", "CurrencyCode");
    //var pPayablesCurrenciesSummary = data[2];
    //var pReceivablesOrInvoicesCurrenciesSummary = data[3];
    //var pProfitCurrenciesSummary = data[4];
    //var pMarginSummary = data[5];

    var pReportTitle = $("#cbAging").prop("checked") ? "Aging Report" : "Invoices Report";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";
    var pPartnerList = document.getElementById("hReadySlPartners").options;
    for (var i = 0; i < pPartnerList.length; i++) {
        var pGroupedReportRows = jQuery.grep(pReportRows, function (pReportRows) {
            return pReportRows.PartnerID == pPartnerList[i].value;
        });
        if (pGroupedReportRows.length > 0) {
            //pTableHTML += '                         <table id="tblInvoicesReports" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
            pTableHTML += '                         <table id="tblInvoicesReports' + pPartnerList[i].value + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            pTableHTML += '                             <thead>';
            pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            //pTableHTML += '                                     <th class="hide">Ser.</th>';
            //pTableHTML += '                                     <th class="hide">Branch</th>';
            pTableHTML += '                                     <th>Inv No.</th>';
            if ($("#cbECode").prop("checked"))
                pTableHTML += '                                     <th>ECode</th>';
            if ($("#cbSOA").prop("checked"))
                pTableHTML += '                                     <th>SOA</th>';
            if ($("#cbPartnerType").prop("checked"))
                pTableHTML += '                                     <th>Partner Type</th>';
            if ($("#cbCustomer").prop("checked"))
                pTableHTML += '                                     <th>Partner Name</th>';
            if ($("#cbCustomerReference").prop("checked"))
                pTableHTML += '                                     <th>CustomerRef.</th>';
            if ($("#cbMasterBL").prop("checked"))
                pTableHTML += '                                     <th>MasterBL</th>';
            if ($("#cbHouseNumber").prop("checked"))
                pTableHTML += '                                     <th>HBL</th>';
            if ($("#cbOperationNotes").prop("checked"))
                pTableHTML += '                                     <th>Oper.Notes</th>';
            if ($("#cbInvoiceStatus").prop("checked"))
                pTableHTML += '                                     <th>Status</th>';
            if ($("#cbDeliveryStatus").prop("checked"))
                pTableHTML += '                                     <th>Delivery</th>';
            if ($("#cbSalesman").prop("checked"))
                pTableHTML += '                                     <th>Salesman</th>';
            if ($("#cbOperationCode").prop("checked"))
                pTableHTML += '                                     <th>Operation No.</th>';
            if ($("#cbInvoiceDate").prop("checked"))
                pTableHTML += '                                     <th>Inv. Date</th>';
            if ($("#cbDueDate").prop("checked"))
                pTableHTML += '                                     <th>Due Date</th>';
            if ($("#cbCertificateNumber").prop("checked"))
                pTableHTML += '                                     <th>Cert No</th>';
            if ($("#cbVATNo").prop("checked"))
                pTableHTML += '                                     <th>VAT No</th>';
            if ($("#cbBookingNumber").prop("checked"))
                pTableHTML += '                                     <th>Booking No</th>';
            if ($("#cbVessel").prop("checked"))
                pTableHTML += '                                     <th>Vessel</th>';
            //pTableHTML += '                                     <th>Status</th>';
            //if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
            //    pTableHTML += '                                     <th>Amt w/o VAT</th>';
            //if (!$("#cbWithoutVAT").prop("checked"))
            //    pTableHTML += '                                     <th>VAT</th>';
            pTableHTML += '                                     <th>Amt w/o VAT-Disc</th>';
            if (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLD") {
                pTableHTML += '                                     <th>5%</th>';
                pTableHTML += '                                     <th class="hide">10%</th>';
                pTableHTML += '                                     <th class="">14%</th>';
                pTableHTML += '                                     <th class="">Other VAT</th>';
            }
            else
                pTableHTML += '                                     <th>Total VAT</th>';

            if (!$("#cbWithoutDiscount").prop("checked"))
                pTableHTML += '                                     <th>WHT</th>';

            pTableHTML += '                                     <th>Total</th>';
            pTableHTML += '                                     <th>Cur.</th>';
            if ($("#cbLocalCurrency").prop("checked")) {
                pTableHTML += '                                     <th>Ex.Rate</th>';
                pTableHTML += '                                     <th>' + pDefaults.CurrencyCode + '</th>';
            }
            if ($("#cbPaidAmount").prop("checked"))
                pTableHTML += '                                     <th>Paid Amt.</th>';
            if ($("#cbRemaining").prop("checked"))
                pTableHTML += '                                     <th>Remaining</th>';
            if ($("#cbOperationDate").prop("checked"))
                pTableHTML += '                                     <th>OperDate</th>';
            if ($("#cbPaymentDate").prop("checked"))
                pTableHTML += '                                     <th>PaymentDate</th>';
            if ($("#cbDaysDifference").prop("checked"))
                pTableHTML += '                                     <th>DaysDif.</th>';
            if ($("#cbAging").prop("checked")) {
                pTableHTML += '                                 <th>0-30</th>';
                pTableHTML += '                                 <th>31-60</th>';
                pTableHTML += '                                 <th>61-90</th>';
                pTableHTML += '                                 <th>Later</th>';
            }
            pTableHTML += '                                 </tr>';
            pTableHTML += '                             </thead>';
            pTableHTML += '                             <tbody>';
            var serial = 0;
            $.each((pGroupedReportRows), function (i, item) {
                //pTableHTML += '                                     <tr class="' + (item.Cargo == "Totals In Default Currency:" ? "font-bold text-ul" : "") + '" style="font-size:95%; ' + (item.Cargo == "Total:" ? "background-color: #f9f9f9;!Important" : "") + '">' + (item.Code == "Total" ? "<b>" : "");
                pTableHTML += '                                     <tr style="font-size:95%;">';
                ++serial;
                var _AgingDays = Date.prototype.compareDates(GetDateWithFormatMDY(item.DueDate), FormattedTodaysDate);
                //var _TotalVAT = item.VATFromItems; //item.Items5PercTaxAmount + item.Items10PercTaxAmount + item.Items14PercTaxAmount;
                //var _RowAmountWithoutVAT = (item.Amount - _TotalVAT + item.DiscountAmount).toFixed(2);
                //pTableHTML += '                                         <td class="hide">' + (++serial) + '</td>';
                //pTableHTML += '                                         <td class="hide">' + item.BranchName + '</td>';
            

                if (pDefaults.UnEditableCompanyName == "LIN")
                    pTableHTML += '                                         <td>' + (item.InvoiceTypeID == 12 ? '55550' : '') + item.ConcatenatedInvoiceNumber + '</td>';
                else
                    pTableHTML += '                                         <td>' + (pDefaults.UnEditableCompanyName == "SAF"
                        ? (item.InvoiceTypeName + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)).substr(8, 2) + "#" + (item.ConcatenatedInvoiceNumber).split('/')[0].padStart(5, 0))
                        : item.ConcatenatedInvoiceNumber)
                        + '</td>';

                if ($("#cbECode").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.ECode == 0 ? "" : item.ECode) + '</td>';
                if ($("#cbSOA").prop("checked"))
                    if (pDefaults.UnEditableCompanyName == "LIN")
                        pTableHTML += '                                         <td>' + (item.InvoiceTypeID == 12 ? '55550' : '') + (item.RelatedToInvoiceID != 0 ? (item.RelatedToInvoiceNumber + '/' + item.RelatedToInvoiceTypeName) : '') + '</td>';
                    else
                        pTableHTML += '                                         <td>' + (item.RelatedToInvoiceID != 0 ? (item.RelatedToInvoiceNumber + '/' + item.RelatedToInvoiceTypeName) : '') + '</td>';
                if ($("#cbPartnerType").prop("checked"))
                    pTableHTML += '                                         <td>' + item.PartnerTypeCode + '</td>';
                if ($("#cbCustomer").prop("checked"))
                    pTableHTML += '                                         <td>' + item.PartnerName.replace(/'/g, "''"); + '</td>';
                if ($("#cbCustomerReference").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.CustomerReference == 0 ? "" : item.CustomerReference) + '</td>';
                if ($("#cbMasterBL").prop("checked")) {
                    let MasterBL = item.MasterBL;
                    if (item.TransportType == AirTransportType && (MasterBL == "" || MasterBL == "0")) {
                        MasterBL = item.MainRouteNotes;
                    }
                    pTableHTML += '                                         <td>' + (MasterBL == 0 ? "" : MasterBL) + '</td>';
                }
                if ($("#cbHouseNumber").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.HouseNumber == 0 ? "" : item.HouseNumber) + '</td>';
                if ($("#cbOperationNotes").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.OperationNotes == 0 ? "" : item.OperationNotes) + '</td>';
                if ($("#cbInvoiceStatus").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.InvoiceStatus == 0 ? "" : item.InvoiceStatus) + '</td>';
                if ($("#cbDeliveryStatus").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.IsDelivered ? "Yes" : "No") + '</td>';
                if ($("#cbSalesman").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.SalesmanID != 0 ? item.SalesmanName : '') + '</td>';
                if ($("#cbOperationCode").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.OperationCode == 0 ? item.MasterOperationCode : item.OperationCode) + '</td>';
                if ($("#cbInvoiceDate").prop("checked"))
                    pTableHTML += '                                         <td>' + GetDateWithFormatYMD((item.InvoiceDate)) + '</td>';
                if ($("#cbDueDate").prop("checked"))
                    pTableHTML += '                                         <td>' + GetDateWithFormatYMD((item.DueDate)) + '</td>';
                if ($("#cbCertificateNumber").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.CertificateNumber == 0 ? "" : item.CertificateNumber) + '</td>';
                if ($("#cbVATNo").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.VATNumber == 0 ? "" : item.VATNumber) + '</td>';
                if ($("#cbBookingNumber").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.BookingNumber == 0 ? "" : item.BookingNumber) + '</td>';
                if ($("#cbVessel").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.VesselName == 0 ? "" : item.VesselName) + '</td>';
                //pTableHTML += '                                         <td' + (item.InvoiceStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + (item.InvoiceStatus == 0 ? "" : item.InvoiceStatus) + '</td>';
                //if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                //    pTableHTML += '                                         <td>' + item.AmountWithoutVAT.toFixed(2) + '</td>';
                //if (!$("#cbWithoutVAT").prop("checked"))
                //    pTableHTML += '                                         <td>' + item.TaxAmount.toFixed(2) + '</td>';
                //if (!$("#cbWithoutDiscount").prop("checked"))
                //    pTableHTML += '                                         <td>' + item.DiscountAmount.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + item.AmountWithoutVAT + '</td>';
                if (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLD") {
                    pTableHTML += '                                         <td>' + item.Items5PercTaxAmount.toFixed(2) + '</td>';
                    pTableHTML += '                                         <td class="hide">' + item.Items10PercTaxAmount.toFixed(2) + '</td>';
                    pTableHTML += '                                         <td class="">' + item.Items14PercTaxAmount.toFixed(2) + '</td>';
                    pTableHTML += '                                         <td>' + (item.VATFromItems - item.Items5PercTaxAmount - item.Items14PercTaxAmount).toFixed(2) + '</td>';
                }
                else
                    pTableHTML += '                                         <td>' + item.VATFromItems.toFixed(2) + '</td>';

                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableHTML += '                                         <td>' + item.DiscountFromItems.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + item.Amount.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + item.CurrencyCode + '</td>';
                if ($("#cbLocalCurrency").prop("checked")) {
                    pTableHTML += '                                         <td>' + item.ExchangeRate + '</td>';
                    pTableHTML += '                                         <td>' + (item.ExchangeRate * item.Amount).toFixed(2) + '</td>';
                }
                if ($("#cbPaidAmount").prop("checked"))
                    pTableHTML += '                                         <td>' + item.PaidAmount.toFixed(2) + '</td>';
                if ($("#cbRemaining").prop("checked"))
                    pTableHTML += '                                         <td' + (item.InvoiceStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + item.RemainingAmount.toFixed(2) + '</td>';
                var _PaymentDate = (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PaymentDate)) < 1 ? "" : GetDateWithFormatYMD((item.PaymentDate)));
                if ($("#cbOperationDate").prop("checked"))
                    pTableHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.OperationOpenDate)) < 1 ? "" : GetDateWithFormatYMD((item.OperationOpenDate))) + '</td>';
                if ($("#cbPaymentDate").prop("checked"))
                    pTableHTML += '                                         <td>' + _PaymentDate + '</td>';
                if ($("#cbDaysDifference").prop("checked"))
                    pTableHTML += '                                         <td>' + (_PaymentDate == "" ? "" : (Date.prototype.compareDates(GetDateWithFormatMDY(item.OperationOpenDate), GetDateWithFormatMDY(item.PaymentDate)))) + '</td>';
                //pTableHTML += '                                         <td>' + (_AgingDays >= 0 && _AgingDays < 30 ? '✔' : '') + '</td>';
                //pTableHTML += '                                         <td>' + (_AgingDays >= 30 && _AgingDays < 60 ? '✔' : '') + '</td>';
                //pTableHTML += '                                         <td>' + (_AgingDays >= 60 && _AgingDays < 90 ? '✔' : '') + '</td>';
                //pTableHTML += '                                         <td>' + (_AgingDays >= 90 ? '✔' : '') + '</td>';
                if ($("#cbAging").prop("checked")) {
                    pTableHTML += '                                     <td>' + (_AgingDays >= 0 && _AgingDays < 30 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                    pTableHTML += '                                     <td>' + (_AgingDays >= 30 && _AgingDays < 60 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                    pTableHTML += '                                     <td>' + (_AgingDays >= 60 && _AgingDays < 90 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                    pTableHTML += '                                     <td>' + (_AgingDays >= 90 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                }
                pTableHTML += '                                     </tr>';
            });
            pTableHTML += '                             </tbody>';
            pTableHTML += '                         </table>';
        } //if (pGroupedReportRows.length > 0)
    } //for (var i = 0; i < pPartnerList.length; i++)
    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        for (var i = 0; i < pPartnerList.length; i++) {
            var pGroupedReportRows = jQuery.grep(pReportRows, function (pReportRows) {
                return pReportRows.PartnerID == pPartnerList[i].value;
            });
            if (pGroupedReportRows.length > 0) {
                var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pGroupedReportRows, "Amount", "ExchangeRate");
                var pTotalSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "Amount", "CurrencyCode");
                var pTableSummary = "";
                pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                //pTableSummary += '                                     <td>Status</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                pTableSummary += '                                 </tr>';

                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                    var pAmountWithoutVATSummary = CalculateAmountWithoutVATCurrenciesSummaryFromArray_TaxOnItems(pGroupedReportRows);

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + /*pPartnerList[i].text +*/ ' TOTAL AMOUNT W/O VAT :</td>';
                    pTableSummary += '                                     <td>' + pAmountWithoutVATSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                    pTableSummary += '                                 </tr>';
                }

                if (!$("#cbWithoutVAT").prop("checked")) {
                    var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "VATFromItems", "CurrencyCode");

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + /*pPartnerList[i].text +*/ ' TOTAL VAT :</td>';
                    pTableSummary += '                                     <td>' + pTaxAmountSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                    pTableSummary += '                                 </tr>';
                }


                if (!$("#cbWithoutDiscount").prop("checked")) {
                    var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pGroupedReportRows);

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + /*pPartnerList[i].text +*/ ' TOTAL WHT :</td>';
                    pTableSummary += '                                     <td>' + pDiscountAmountSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                }

                pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                pTableSummary += '                                     <td>' + /*pPartnerList[i].text +*/ ' TOTAL :</td>';
                pTableSummary += '                                     <td>' + pTotalSummary + ' = (' + _TotalInDefaultCurrency + ')' + '</td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                //pTableSummary += '                                     <td>Status</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                pTableSummary += '                                 </tr>';
                $("#tblInvoicesReports" + pPartnerList[i].value + " tbody").append(pTableSummary);
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblInvoicesReports" + pPartnerList[i].value, /*pPartnerList[i].text +*/ ' ' + 'Invoices');
            }
        }
    }
    else {
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Transport Type :</b> ' + $("#divTransportFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Direction Type :</b> ' + $("#divDirectionFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner Type:</b> ' + $("#slPartnerType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Inv. Type :</b> ' + $("#slInvoiceType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Inv. Status :</b> ' + $("#slInvoiceStatus option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Approval Status :</b> ' + $("#slApprovalStatus option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>VAT Type :</b> ' + ($("#cbWithoutVAT").prop("checked") ? "W/O" : $("#slVATType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>WHT :</b> ' + ($("#cbWithoutDiscount").prop("checked") ? "W/O" : $("#slDiscountType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Inv. Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
            ? "All Dates"
            : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        ReportHTML += '                     <div>&nbsp;</div>';
        for (var i = 0; i < pPartnerList.length; i++) {
            var pGroupedReportRows = jQuery.grep(pReportRows, function (pReportRows) {
                return pReportRows.PartnerID == pPartnerList[i].value;
            });
            if (pGroupedReportRows.length > 0) {
                //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                ReportHTML += '                         <h4><b><u>' + /*pPartnerList[i].text +*/ '</u></b></h4>';

                ReportHTML += '                         <table id="tblInvoicesReports' + pPartnerList[i].value + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
                ReportHTML += '                         ' + $("#tblInvoicesReports" + pPartnerList[i].value).html();
                ReportHTML += '                         </table>';
                //ReportHTML += '                     </div>';//of table-responsive
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                    var pAmountWithoutVATSummary = CalculateAmountWithoutVATCurrenciesSummaryFromArray_TaxOnItems(pGroupedReportRows);
                    ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + /*pPartnerList[i].text +*/ ' TOTAL AMOUNT W/O VAT : </b> ' + pAmountWithoutVATSummary + '</div>';
                }
                if (!$("#cbWithoutVAT").prop("checked")) {
                    var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "VATFromItems", "CurrencyCode");
                    ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + /*pPartnerList[i].text +*/ ' TOTAL VAT : </b> ' + pTaxAmountSummary + '</div>';
                }
                if (!$("#cbWithoutDiscount").prop("checked")) {
                    var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pGroupedReportRows);
                    ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + /*pPartnerList[i].text +*/ ' TOTAL WHT : </b> ' + pDiscountAmountSummary + '</div>';
                }
                var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pGroupedReportRows, "Amount", "ExchangeRate");
                var pTotalSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "Amount", "CurrencyCode");
                ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + /*pPartnerList[i].text +*/ ' TOTAL AMOUNT : </b> ' + pTotalSummary + ' = (' + _TotalInDefaultCurrency + ')' + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Payables Summary :</b> ' + pPayablesCurrenciesSummary + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Invoices Summary :</b> ' + pReceivablesOrInvoicesCurrenciesSummary + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Profit Summary :</b> ' + pProfitCurrenciesSummary + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Profit Margin :</b> ' + pMarginSummary + '%</div>';
            }
        }

        debugger;
        //if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
        //    var pAmountWithoutVATSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "AmountWithoutVAT", "CurrencyCode");
        //    ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL AMOUNT W/O VAT :</u> </b> ' + pAmountWithoutVATSummary + '</div>';
        //}
        //if (!$("#cbWithoutVAT").prop("checked")) {
        //    var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "TaxAmount", "CurrencyCode");
        //    ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL VAT :</u> </b> ' + pTaxAmountSummary + '</div>';
        //}
        //if (!$("#cbWithoutDiscount").prop("checked")) {
        //    var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pReportRows);
        //    ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL WHT :</u> </b> ' + pDiscountAmountSummary + '</div>';
        //}
        var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pReportRows, "Amount", "ExchangeRate");
        var pTotalSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "Amount", "CurrencyCode");
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary + ' =(' + _TotalInDefaultCurrency + ')' + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Paid :</u> </b> ' + _TotalPaid + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Remaining :</u> </b> ' + _TotalRemaining + '</div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        if (pOutputTo == "PrintInReportBody")
            $("#ReportBody").html(ReportHTML);
        else {
            var mywindow = window.open('', '_blank');
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
    }
}
function InvoicesReports_DrawReport_GroupByBranch_TaxOnItems(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pInvoiceItems = JSON.parse(data[2]);
    var _TotalPaid = CalculateSumOfArrayWithGroupBy(pReportRows, "PaidAmount", "CurrencyCode");
    var _TotalRemaining = CalculateSumOfArrayWithGroupBy(pReportRows, "RemainingAmount", "CurrencyCode");
    //var pPayablesCurrenciesSummary = data[2];
    //var pReceivablesOrInvoicesCurrenciesSummary = data[3];
    //var pProfitCurrenciesSummary = data[4];
    //var pMarginSummary = data[5];

    var pReportTitle = $("#cbAging").prop("checked") ? "Aging Report" : "Invoices Report";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";
    var pBranchesList = document.getElementById("hReadySlBranches").options;
    for (var i = 0; i < pBranchesList.length; i++) {
        var pGroupedReportRows = jQuery.grep(pReportRows, function (pReportRows) {
            return pReportRows.BranchID == pBranchesList[i].value;
        });
        if (pGroupedReportRows.length > 0) {
            //pTableHTML += '                         <table id="tblInvoicesReports" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
            pTableHTML += '                         <table id="tblInvoicesReports' + pBranchesList[i].value + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            pTableHTML += '                             <thead>';
            pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            //pTableHTML += '                                     <th class="hide">Ser.</th>';
            //pTableHTML += '                                     <th class="hide">Branch</th>';
            pTableHTML += '                                     <th>Inv No.</th>';
            if ($("#cbECode").prop("checked"))
                pTableHTML += '                                     <th>ECode</th>';
            if ($("#cbSOA").prop("checked"))
                pTableHTML += '                                     <th>SOA</th>';
            if ($("#cbPartnerType").prop("checked"))
                pTableHTML += '                                     <th>Partner Type</th>';
            if ($("#cbCustomer").prop("checked"))
                pTableHTML += '                                     <th>Partner Name</th>';
            if ($("#cbCustomerReference").prop("checked"))
                pTableHTML += '                                     <th>CustomerRef.</th>';
            if ($("#cbMasterBL").prop("checked"))
                pTableHTML += '                                     <th>MasterBL</th>';
            if ($("#cbHouseNumber").prop("checked"))
                pTableHTML += '                                     <th>HBL</th>';
            if ($("#cbOperationNotes").prop("checked"))
                pTableHTML += '                                     <th>Oper.Notes</th>';
            if ($("#cbInvoiceStatus").prop("checked"))
                pTableHTML += '                                     <th>Status</th>';
            if ($("#cbDeliveryStatus").prop("checked"))
                pTableHTML += '                                     <th>Delivery</th>';
            if ($("#cbSalesman").prop("checked"))
                pTableHTML += '                                     <th>Salesman</th>';
            if ($("#cbOperationCode").prop("checked"))
                pTableHTML += '                                     <th>Operation No.</th>';
            if ($("#cbInvoiceDate").prop("checked"))
                pTableHTML += '                                     <th>Inv. Date</th>';
            if ($("#cbDueDate").prop("checked"))
                pTableHTML += '                                     <th>Due Date</th>';
            if ($("#cbCertificateNumber").prop("checked"))
                pTableHTML += '                                     <th>Cert No</th>';
            if ($("#cbVATNo").prop("checked"))
                pTableHTML += '                                     <th>VAT No</th>';
            if ($("#cbBookingNumber").prop("checked"))
                pTableHTML += '                                     <th>Booking No</th>';
            if ($("#cbVessel").prop("checked"))
                pTableHTML += '                                     <th>Vessel</th>';
            //pTableHTML += '                                     <th>Status</th>';
            //if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
            //    pTableHTML += '                                     <th>Amt w/o VAT</th>';
            //if (!$("#cbWithoutVAT").prop("checked"))
            //    pTableHTML += '                                     <th>VAT</th>';
            pTableHTML += '                                     <th>Amt w/o VAT-Disc</th>';
            if (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLD") {
                pTableHTML += '                                     <th>5%</th>';
                pTableHTML += '                                     <th class="hide">10%</th>';
                pTableHTML += '                                     <th class="">14%</th>';
                pTableHTML += '                                     <th class="">Other VAT</th>';
            }
            else
                pTableHTML += '                                     <th>Total VAT</th>';

            if (!$("#cbWithoutDiscount").prop("checked"))
                pTableHTML += '                                     <th>WHT</th>';

            pTableHTML += '                                     <th>Total</th>';
            pTableHTML += '                                     <th>Cur.</th>';
            if ($("#cbLocalCurrency").prop("checked")) {
                pTableHTML += '                                     <th>Ex.Rate</th>';
                pTableHTML += '                                     <th>' + pDefaults.CurrencyCode + '</th>';
            }
            if ($("#cbPaidAmount").prop("checked"))
                pTableHTML += '                                     <th>Paid Amt.</th>';
            if ($("#cbRemaining").prop("checked"))
                pTableHTML += '                                     <th>Remaining</th>';
            if ($("#cbOperationDate").prop("checked"))
                pTableHTML += '                                     <th>OperDate</th>';
            if ($("#cbPaymentDate").prop("checked"))
                pTableHTML += '                                     <th>PaymentDate</th>';
            if ($("#cbDaysDifference").prop("checked"))
                pTableHTML += '                                     <th>DaysDif.</th>';
            if ($("#cbAging").prop("checked")) {
                pTableHTML += '                                 <th>0-30</th>';
                pTableHTML += '                                 <th>31-60</th>';
                pTableHTML += '                                 <th>61-90</th>';
                pTableHTML += '                                 <th>Later</th>';
            }
            pTableHTML += '                                 </tr>';
            pTableHTML += '                             </thead>';
            pTableHTML += '                             <tbody>';
            var serial = 0;
            $.each((pGroupedReportRows), function (i, item) {
                //pTableHTML += '                                     <tr class="' + (item.Cargo == "Totals In Default Currency:" ? "font-bold text-ul" : "") + '" style="font-size:95%; ' + (item.Cargo == "Total:" ? "background-color: #f9f9f9;!Important" : "") + '">' + (item.Code == "Total" ? "<b>" : "");
                pTableHTML += '                                     <tr style="font-size:95%;">';
                ++serial;
                var _AgingDays = Date.prototype.compareDates(GetDateWithFormatMDY(item.DueDate), FormattedTodaysDate);
                //var _TotalVAT = item.VATFromItems; //item.Items5PercTaxAmount + item.Items10PercTaxAmount + item.Items14PercTaxAmount;
                //var _RowAmountWithoutVAT = (item.Amount - _TotalVAT + item.DiscountAmount).toFixed(2);
                //pTableHTML += '                                         <td class="hide">' + (++serial) + '</td>';
                //pTableHTML += '                                         <td class="hide">' + item.BranchName + '</td>';
       

                if (pDefaults.UnEditableCompanyName == "LIN")
                    pTableHTML += '                                         <td>' + (item.InvoiceTypeID == 12 ? '55550' : '') + item.ConcatenatedInvoiceNumber + '</td>';
                else
                    pTableHTML += '                                         <td>' + (pDefaults.UnEditableCompanyName == "SAF"
                        ? (item.InvoiceTypeName + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)).substr(8, 2) + "#" + (item.ConcatenatedInvoiceNumber).split('/')[0].padStart(5, 0))
                        : item.ConcatenatedInvoiceNumber)
                        + '</td>';

                if ($("#cbECode").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.ECode == 0 ? "" : item.ECode) + '</td>';
                if ($("#cbSOA").prop("checked"))
                    if (pDefaults.UnEditableCompanyName == "LIN")
                        pTableHTML += '                                         <td>' + (item.InvoiceTypeID == 12 ? '55550' : '') + (item.RelatedToInvoiceID != 0 ? (item.RelatedToInvoiceNumber + '/' + item.RelatedToInvoiceTypeName) : '') + '</td>';
                    else
                        pTableHTML += '                                         <td>' + (item.RelatedToInvoiceID != 0 ? (item.RelatedToInvoiceNumber + '/' + item.RelatedToInvoiceTypeName) : '') + '</td>';
                if ($("#cbPartnerType").prop("checked"))
                    pTableHTML += '                                         <td>' + item.PartnerTypeCode + '</td>';
                if ($("#cbCustomer").prop("checked"))
                    pTableHTML += '                                         <td>' + item.PartnerName.replace(/'/g, "''"); + '</td>';
                if ($("#cbCustomerReference").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.CustomerReference == 0 ? "" : item.CustomerReference) + '</td>';
                if ($("#cbMasterBL").prop("checked")) {
                    let MasterBL = item.MasterBL;
                    if (item.TransportType == AirTransportType && (MasterBL == "" || MasterBL == "0")) {
                        MasterBL = item.MainRouteNotes;
                    }
                    pTableHTML += '                                         <td>' + (MasterBL == 0 ? "" : MasterBL) + '</td>';
                }
                if ($("#cbHouseNumber").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.HouseNumber == 0 ? "" : item.HouseNumber) + '</td>';
                if ($("#cbOperationNotes").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.OperationNotes == 0 ? "" : item.OperationNotes) + '</td>';
                if ($("#cbInvoiceStatus").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.InvoiceStatus == 0 ? "" : item.InvoiceStatus) + '</td>';
                if ($("#cbDeliveryStatus").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.IsDelivered ? "Yes" : "No") + '</td>';
                if ($("#cbSalesman").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.SalesmanID != 0 ? item.SalesmanName : '') + '</td>';
                if ($("#cbOperationCode").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.OperationCode == 0 ? item.MasterOperationCode : item.OperationCode) + '</td>';
                if ($("#cbInvoiceDate").prop("checked"))
                    pTableHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + '</td>';
                if ($("#cbDueDate").prop("checked"))
                    pTableHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.DueDate)) + '</td>';
                if ($("#cbCertificateNumber").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.CertificateNumber == 0 ? "" : item.CertificateNumber) + '</td>';
                if ($("#cbVATNo").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.VATNumber == 0 ? "" : item.VATNumber) + '</td>';
                if ($("#cbBookingNumber").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.BookingNumber == 0 ? "" : item.BookingNumber) + '</td>';
                if ($("#cbVessel").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.VesselName == 0 ? "" : item.VesselName) + '</td>';
                //pTableHTML += '                                         <td' + (item.InvoiceStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + (item.InvoiceStatus == 0 ? "" : item.InvoiceStatus) + '</td>';
                //if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                //    pTableHTML += '                                         <td>' + item.AmountWithoutVAT.toFixed(2) + '</td>';
                //if (!$("#cbWithoutVAT").prop("checked"))
                //    pTableHTML += '                                         <td>' + item.TaxAmount.toFixed(2) + '</td>';
                //if (!$("#cbWithoutDiscount").prop("checked"))
                //    pTableHTML += '                                         <td>' + item.DiscountAmount.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + item.AmountWithoutVAT + '</td>';
                if (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLD") {
                    pTableHTML += '                                         <td>' + item.Items5PercTaxAmount.toFixed(2) + '</td>';
                    pTableHTML += '                                         <td class="hide">' + item.Items10PercTaxAmount.toFixed(2) + '</td>';
                    pTableHTML += '                                         <td class="">' + item.Items14PercTaxAmount.toFixed(2) + '</td>';
                    pTableHTML += '                                         <td>' + (item.VATFromItems - item.Items5PercTaxAmount - item.Items14PercTaxAmount).toFixed(2) + '</td>';
                }
                else
                    pTableHTML += '                                         <td>' + item.VATFromItems.toFixed(2) + '</td>';

                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableHTML += '                                         <td>' + item.DiscountFromItems.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + item.Amount.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + item.CurrencyCode + '</td>';
                if ($("#cbLocalCurrency").prop("checked")) {
                    pTableHTML += '                                         <td>' + item.ExchangeRate + '</td>';
                    pTableHTML += '                                         <td>' + (item.ExchangeRate * item.Amount).toFixed(2) + '</td>';
                }
                if ($("#cbPaidAmount").prop("checked"))
                    pTableHTML += '                                         <td>' + item.PaidAmount.toFixed(2) + '</td>';
                if ($("#cbRemaining").prop("checked"))
                    pTableHTML += '                                         <td' + (item.InvoiceStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + item.RemainingAmount.toFixed(2) + '</td>';
                var _PaymentDate = (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PaymentDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PaymentDate)));
                if ($("#cbOperationDate").prop("checked"))
                    pTableHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.OperationOpenDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.OperationOpenDate))) + '</td>';
                if ($("#cbPaymentDate").prop("checked"))
                    pTableHTML += '                                         <td>' + _PaymentDate + '</td>';
                if ($("#cbDaysDifference").prop("checked"))
                    pTableHTML += '                                         <td>' + (_PaymentDate == "" ? "" : (Date.prototype.compareDates(GetDateWithFormatMDY(item.OperationOpenDate), GetDateWithFormatMDY(item.PaymentDate)))) + '</td>';
                //pTableHTML += '                                         <td>' + (_AgingDays >= 0 && _AgingDays < 30 ? '✔' : '') + '</td>';
                //pTableHTML += '                                         <td>' + (_AgingDays >= 30 && _AgingDays < 60 ? '✔' : '') + '</td>';
                //pTableHTML += '                                         <td>' + (_AgingDays >= 60 && _AgingDays < 90 ? '✔' : '') + '</td>';
                //pTableHTML += '                                         <td>' + (_AgingDays >= 90 ? '✔' : '') + '</td>';
                if ($("#cbAging").prop("checked")) {
                    pTableHTML += '                                     <td>' + (_AgingDays >= 0 && _AgingDays < 30 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                    pTableHTML += '                                     <td>' + (_AgingDays >= 30 && _AgingDays < 60 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                    pTableHTML += '                                     <td>' + (_AgingDays >= 60 && _AgingDays < 90 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                    pTableHTML += '                                     <td>' + (_AgingDays >= 90 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                }
                pTableHTML += '                                     </tr>';
            });
            pTableHTML += '                             </tbody>';
            pTableHTML += '                         </table>';
        } //if (pGroupedReportRows.length > 0)
    } //for (var i = 0; i < pBranchesList.length; i++)
    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        for (var i = 0; i < pBranchesList.length; i++) {
            var pGroupedReportRows = jQuery.grep(pReportRows, function (pReportRows) {
                return pReportRows.BranchID == pBranchesList[i].value;
            });
            if (pGroupedReportRows.length > 0) {
                var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pGroupedReportRows, "Amount", "ExchangeRate");
                var pTotalSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "Amount", "CurrencyCode");
                var pTableSummary = "";
                pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                //pTableSummary += '                                     <td>Status</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                pTableSummary += '                                 </tr>';

                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                    var pAmountWithoutVATSummary = CalculateAmountWithoutVATCurrenciesSummaryFromArray_TaxOnItems(pGroupedReportRows);

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + pBranchesList[i].text + ' TOTAL AMOUNT W/O VAT :</td>';
                    pTableSummary += '                                     <td>' + pAmountWithoutVATSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                    pTableSummary += '                                 </tr>';
                }

                if (!$("#cbWithoutVAT").prop("checked")) {
                    var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "VATFromItems", "CurrencyCode");

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + pBranchesList[i].text + ' TOTAL VAT :</td>';
                    pTableSummary += '                                     <td>' + pTaxAmountSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                    pTableSummary += '                                 </tr>';
                }


                if (!$("#cbWithoutDiscount").prop("checked")) {
                    var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pGroupedReportRows);

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + pBranchesList[i].text + ' TOTAL WHT :</td>';
                    pTableSummary += '                                     <td>' + pDiscountAmountSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                }

                pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                pTableSummary += '                                     <td>' + pBranchesList[i].text + ' TOTAL :</td>';
                pTableSummary += '                                     <td>' + pTotalSummary + ' = (' + _TotalInDefaultCurrency + ')' + '</td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                //pTableSummary += '                                     <td>Status</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                pTableSummary += '                                 </tr>';
                $("#tblInvoicesReports" + pBranchesList[i].value + " tbody").append(pTableSummary);
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblInvoicesReports" + pBranchesList[i].value, pBranchesList[i].text + ' ' + 'Invoices');
            }
        }
    }
    else {
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Transport Type :</b> ' + $("#divTransportFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Direction Type :</b> ' + $("#divDirectionFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner Type:</b> ' + $("#slPartnerType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Inv. Type :</b> ' + $("#slInvoiceType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Inv. Status :</b> ' + $("#slInvoiceStatus option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Approval Status :</b> ' + $("#slApprovalStatus option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>VAT Type :</b> ' + ($("#cbWithoutVAT").prop("checked") ? "W/O" : $("#slVATType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>WHT :</b> ' + ($("#cbWithoutDiscount").prop("checked") ? "W/O" : $("#slDiscountType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Inv. Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
                                                                                    ? "All Dates"
                                                                                    : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        ReportHTML += '                     <div>&nbsp;</div>';
        for (var i = 0; i < pBranchesList.length; i++) {
            var pGroupedReportRows = jQuery.grep(pReportRows, function (pReportRows) {
                return pReportRows.BranchID == pBranchesList[i].value;
            });
            if (pGroupedReportRows.length > 0) {
                //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                ReportHTML += '                         <h4><b><u>' + pBranchesList[i].text + ' BRANCH:</u></b></h4>';

                ReportHTML += '                         <table id="tblInvoicesReports' + pBranchesList[i].value + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
                ReportHTML += '                         ' + $("#tblInvoicesReports" + pBranchesList[i].value).html();
                ReportHTML += '                         </table>';
                //ReportHTML += '                     </div>';//of table-responsive
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                    var pAmountWithoutVATSummary = CalculateAmountWithoutVATCurrenciesSummaryFromArray_TaxOnItems(pGroupedReportRows);
                    ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + pBranchesList[i].text + ' TOTAL AMOUNT W/O VAT : </b> ' + pAmountWithoutVATSummary + '</div>';
                }
                if (!$("#cbWithoutVAT").prop("checked")) {
                    var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "VATFromItems", "CurrencyCode");
                    ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + pBranchesList[i].text + ' TOTAL VAT : </b> ' + pTaxAmountSummary + '</div>';
                }
                if (!$("#cbWithoutDiscount").prop("checked")) {
                    var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pGroupedReportRows);
                    ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + pBranchesList[i].text + ' TOTAL WHT : </b> ' + pDiscountAmountSummary + '</div>';
                }
                var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pGroupedReportRows, "Amount", "ExchangeRate");
                var pTotalSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "Amount", "CurrencyCode");
                ReportHTML += '             <div class="col-xs-12  text-right m-l"><b>' + pBranchesList[i].text + ' TOTAL AMOUNT : </b> ' + pTotalSummary + ' = (' + _TotalInDefaultCurrency + ')' + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Payables Summary :</b> ' + pPayablesCurrenciesSummary + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Invoices Summary :</b> ' + pReceivablesOrInvoicesCurrenciesSummary + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Profit Summary :</b> ' + pProfitCurrenciesSummary + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Profit Margin :</b> ' + pMarginSummary + '%</div>';
            }
        }

        debugger;
        //if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
        //    var pAmountWithoutVATSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "AmountWithoutVAT", "CurrencyCode");
        //    ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL AMOUNT W/O VAT :</u> </b> ' + pAmountWithoutVATSummary + '</div>';
        //}
        //if (!$("#cbWithoutVAT").prop("checked")) {
        //    var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "TaxAmount", "CurrencyCode");
        //    ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL VAT :</u> </b> ' + pTaxAmountSummary + '</div>';
        //}
        //if (!$("#cbWithoutDiscount").prop("checked")) {
        //    var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pReportRows);
        //    ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL WHT :</u> </b> ' + pDiscountAmountSummary + '</div>';
        //}
        var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pReportRows, "Amount", "ExchangeRate");
        var pTotalSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "Amount", "CurrencyCode");
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary + ' =(' + _TotalInDefaultCurrency + ')' + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Paid :</u> </b> ' + _TotalPaid + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Remaining :</u> </b> ' + _TotalRemaining + '</div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        if (pOutputTo == "PrintInReportBody")
            $("#ReportBody").html(ReportHTML);
        else {
            var mywindow = window.open('', '_blank');
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
    }
}
function InvoicesReports_DrawReport_TaxOnItems(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pInvoiceItems = JSON.parse(data[2]);
    if (pDefaults.UnEditableCompanyName == "UNV") {
        pReportRows = pReportRows.map(function (item) {
            if (item.ManualPaymentStatusID == 30) { // Paid Manually
                return {
                    ...item,
                    PaidAmount: item.Amount,
                    RemainingAmount: 0
                }
            } else {
                return item;
            }
        });
    }
    var _TotalPaid = CalculateSumOfArrayWithGroupBy(pReportRows, "PaidAmount", "CurrencyCode");
    var _TotalRemaining = CalculateSumOfArrayWithGroupBy(pReportRows, "RemainingAmount", "CurrencyCode");

    var pReportTitle = $("#cbAging").prop("checked") ? "Aging Report" : "Invoices Report";
    
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";
    var pBranchesList = document.getElementById("hReadySlBranches").options;
    for (var i = 0; i < 1; i++) {
        var pGroupedReportRows = pReportRows;
        ////Array.sort() works by looping through each item in the array and comparing it to the one after it based on some criteria you specify in your comparison function, if return is 1 then swap.
        //pGroupedReportRows.sort((a, b) => ((a.InvoiceTypeName >= b.InvoiceTypeName && a.InvoiceNumber > b.InvoiceNumber)
        //                                  ) ? 1 : -1);
        if (pGroupedReportRows.length > 0) {
            //pTableHTML += '                         <table id="tblInvoicesReports" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
            pTableHTML += '                         <table id="tblInvoicesReports' + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            pTableHTML += '                             <thead>';
            pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            pTableHTML += '                                     <th>Inv No.</th>';
            if (pDefaults.UnEditableCompanyName == "MES") {
                pTableHTML += '                                     <th>UniqueSerial</th>';
                if ($("#cbAddFleetInvoice").prop("checked"))
                    pTableHTML += '                                     <th>Source</th>';

                pTableHTML += '                                     <th>Invoice Type</th>';
                
            }    
            if ($("#cbECode").prop("checked"))
                pTableHTML += '                                     <th>ECode</th>';
            if ($("#cbSOA").prop("checked"))
                pTableHTML += '                                     <th>SOA</th>';
            if ($("#cbPartnerType").prop("checked"))
                pTableHTML += '                                     <th>Partner Type</th>';
            if ($("#cbCustomer").prop("checked"))
                pTableHTML += '                                     <th>Partner Name</th>';
            if (IsMESCOCompany && !$("#cbAddFleetInvoice").prop("checked") )
                pTableHTML += '                                     <th>Agent</th>';
            if ($("#cbAddFleetInvoice").prop("checked"))
                pTableHTML += '                                     <th>VatNumber</th>';
            if ($("#cbAddFleetInvoice").prop("checked"))
                pTableHTML += '                                     <th>PortalPartnerName </th>';
            if ($("#cbAddFleetInvoice").prop("checked"))
                pTableHTML += '                                     <th>PortalVATNumber </th>';
            if ($("#cbCustomerReference").prop("checked"))
                pTableHTML += '                                     <th>CustomerRef.</th>';
            if ($("#cbSupplierReference").prop("checked"))
                pTableHTML += '                                     <th>SupplierRef.</th>';
            if ($("#cbMasterBL").prop("checked"))
                pTableHTML += '                                     <th>MasterBL</th>';
            if ($("#cbHouseNumber").prop("checked"))
                pTableHTML += '                                     <th>HBL</th>';
            if ($("#cbOperationNotes").prop("checked"))
                pTableHTML += '                                     <th>Oper.Notes</th>';
            if ($("#cbInvoiceStatus").prop("checked"))
                pTableHTML += '                                     <th>Status</th>';
            if ($("#cbDeliveryStatus").prop("checked"))
                pTableHTML += '                                     <th>Delivery</th>';
            if ($("#cbSalesman").prop("checked"))
                pTableHTML += '                                     <th>Salesman</th>';
            if ($("#cbOperationCode").prop("checked"))
                pTableHTML += '                                     <th>Operation No.</th>';
            if ($("#cbInvoiceDate").prop("checked"))
                pTableHTML += '                                     <th>Inv. Date</th>';
            if ($("#cbDueDate").prop("checked"))
                pTableHTML += '                                     <th>Due Date</th>';
            if (IsMESCOCompany )
                pTableHTML += '                                     <th>Approve Date</th>';
            if ($("#cbDeliveryDate").prop("checked"))
                pTableHTML += '                                     <th>Delivery Date</th>';
            if ($("#cbCertificateNumber").prop("checked"))
                pTableHTML += '                                     <th>Cert No</th>';
            if ($("#cbVATNo").prop("checked"))
                pTableHTML += '                                     <th>VAT No</th>';
            if ($("#cbBookingNumber").prop("checked"))
                pTableHTML += '                                     <th>Booking No</th>';
            if ($("#cbVessel").prop("checked"))
                pTableHTML += '                                     <th>Vessel</th>';
            //pTableHTML += '                                     <th>Status</th>';
            //if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
            //    pTableHTML += '                                     <th>Amt w/o VAT</th>';
            //if (!$("#cbWithoutVAT").prop("checked"))
            //    pTableHTML += '                                     <th>VAT</th>';
            pTableHTML += '                                     <th>Amt w/o VAT-Disc</th>';
            if (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLD" || pDefaults.UnEditableCompanyName == "SWI") {
                if (pDefaults.UnEditableCompanyName == "SWI") {
                    pTableHTML += '                                     <th class="">10%</th>';
                    pTableHTML += '                                     <th class="">14%</th>';
                    pTableHTML += '                                     <th class="">Other VAT</th>';
                }
                else {
                    pTableHTML += '                                     <th>5%</th>';
                    pTableHTML += '                                     <th class="hide">10%</th>';
                    pTableHTML += '                                     <th class="">14%</th>';
                    pTableHTML += '                                     <th class="">Other VAT</th>';
                }
            }
            else
                pTableHTML += '                                     <th>Total VAT</th>';

            if (!$("#cbWithoutDiscount").prop("checked"))
                pTableHTML += '                                     <th>WHT</th>';

            pTableHTML += '                                     <th>Total</th>';
            pTableHTML += '                                     <th>Cur.</th>';
            if ($("#cbLocalCurrency").prop("checked")) {
                pTableHTML += '                                     <th>Ex.Rate</th>';
                pTableHTML += '                                     <th>' + pDefaults.CurrencyCode + '</th>';
            }
            if ($("#cbPaidAmount").prop("checked"))
                pTableHTML += '                                     <th>Paid Amt.</th>';
            if (IsMESCOCompany )
                pTableHTML += '                                     <th>Credit Amt.</th>';
            if ($("#cbRemaining").prop("checked"))
                pTableHTML += '                                     <th>Remaining</th>';
            if ($("#cbOperationDate").prop("checked"))
                pTableHTML += '                                     <th>OperDate</th>';
            if ($("#cbPaymentDate").prop("checked"))
                pTableHTML += '                                     <th>PaymentDate</th>';
            if ($("#cbDaysDifference").prop("checked"))
                pTableHTML += '                                     <th>DaysDif.</th>';

            pTableHTML += '                                     <th>Voucher Num.</th>';
            if (pDefaults.UnEditableCompanyName == "MES") 
                pTableHTML += '                                     <th>Collection Man</th>';

            if ($("#cbAddFleetInvoice").prop("checked"))
                pTableHTML += '                                     <th>Customer PaymentTerm</th>';

            if ($("#cbAging").prop("checked")) {
                pTableHTML += '                                 <th>0-30</th>';
                pTableHTML += '                                 <th>31-60</th>';
                pTableHTML += '                                 <th>61-90</th>';
                pTableHTML += '                                 <th>Later</th>';
            }
            //if ($("#PONumber").prop("checked"))
            //    pTableHTML += '                                     <th>PO Number.</th>';
            pTableHTML += '                                 </tr>';
            pTableHTML += '                             </thead>';
            pTableHTML += '                             <tbody>';
            var serial = 0;
            $.each((pGroupedReportRows), function (i, item) {
                //debugger;
                var _AgingDays = Date.prototype.compareDates(GetDateWithFormatMDY(item.DueDate), FormattedTodaysDate);
                pTableHTML += '                                     <tr style="font-size:95%;">';
                ++serial;
                //var _TotalVAT = item.VATFromItems; //item.Items5PercTaxAmount + item.Items10PercTaxAmount + item.Items14PercTaxAmount;
                //var _RowAmountWithoutVAT = (item.Amount - _TotalVAT + item.DiscountAmount).toFixed(2);
                //pTableHTML += '                                         <td class="hide">' + (++serial) + '</td>';
                //pTableHTML += '                                         <td class="hide">' + item.BranchName + '</td>';
                if (pDefaults.UnEditableCompanyName == "LIN")
                    pTableHTML += '                                         <td>' + (item.InvoiceTypeID == 12 ? '55550' : '') + item.ConcatenatedInvoiceNumber + '</td>';
                else
                    pTableHTML += '                                         <td>' + (pDefaults.UnEditableCompanyName == "SAF"
                        ? (item.InvoiceTypeName + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)).substr(8, 2) + "#" + (item.ConcatenatedInvoiceNumber).split('/')[0].padStart(5, 0))
                        : item.ConcatenatedInvoiceNumber)
                        + '</td>';

                if (pDefaults.UnEditableCompanyName == "MES") {
                    pTableHTML += '                                         <td>' + (item.UniqueSerial == 0 ? "" : item.UniqueSerial) + '</td>';
                    if ($("#cbAddFleetInvoice").prop("checked"))
                        pTableHTML += '                                         <td>' + (item.InvoiceSource == 0 ? "" : item.InvoiceSource) + '</td>';

                    pTableHTML += '                                         <td>' + (item.InvoiceTypeName == 0 ? "" : item.InvoiceTypeName) + '</td>';
                    
                }
                   
                if ($("#cbECode").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.ECode == 0 ? "" : item.ECode) + '</td>';
                if ($("#cbSOA").prop("checked"))
                    if (pDefaults.UnEditableCompanyName == "LIN")
                        pTableHTML += '                                         <td>' + (item.InvoiceTypeID == 12 ? '55550' : '') + (item.RelatedToInvoiceID != 0 ? (item.RelatedToInvoiceNumber + '/' + item.RelatedToInvoiceTypeName) : '') + '</td>';
                    else
                        pTableHTML += '                                         <td>' + (item.RelatedToInvoiceID != 0 ? (item.RelatedToInvoiceNumber + '/' + item.RelatedToInvoiceTypeName) : '') + '</td>';
                if ($("#cbPartnerType").prop("checked"))
                    pTableHTML += '                                         <td>' + item.PartnerTypeCode + '</td>';
                if ($("#cbCustomer").prop("checked"))
                    pTableHTML += '                                         <td>' + item.PartnerName.replace(/'/g, "''"); + '</td>';
                if (IsMESCOCompany && !$("#cbAddFleetInvoice").prop("checked"))
                    pTableHTML += '                                         <td>' + item.AgentName.replace(/'/g, "''"); + '</td>';
                if ($("#cbAddFleetInvoice").prop("checked"))
                    pTableHTML += '                                         <td>' + item.VATNumber + '</td>';
                if ($("#cbAddFleetInvoice").prop("checked"))
                    pTableHTML += '                                         <td>' + item.PortalPartnerName + '</td>';
                if ($("#cbAddFleetInvoice").prop("checked"))
                    pTableHTML += '                                         <td>' + item.PortalVATNumber + '</td>';

                if ($("#cbCustomerReference").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.CustomerReference == 0 ? "" : item.CustomerReference) + '</td>';
                if ($("#cbSupplierReference").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.SupplierReference == 0 ? "" : item.SupplierReference) + '</td>';
                if ($("#cbMasterBL").prop("checked")) {
                    let MasterBL = item.MasterBL;
                    if (item.TransportType == AirTransportType && (MasterBL == "" || MasterBL == "0")) {
                        MasterBL = item.MainRouteNotes;
                    }
                    pTableHTML += '                                         <td>' + (MasterBL == 0 ? "" : MasterBL) + '</td>';
                }
                if ($("#cbHouseNumber").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.HouseNumber == 0 ? "" : item.HouseNumber) + '</td>';
                if ($("#cbOperationNotes").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.OperationNotes == 0 ? "" : item.OperationNotes) + '</td>';
                if ($("#cbInvoiceStatus").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.InvoiceStatus == 0 ? "" : item.InvoiceStatus) + '</td>';
                if ($("#cbDeliveryStatus").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.IsDelivered ? "Yes" : "No") + '</td>';
                if ($("#cbSalesman").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.SalesmanID != 0 ? item.SalesmanName : '') + '</td>';
                if ($("#cbOperationCode").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.OperationCode == 0 ? item.MasterOperationCode : item.OperationCode) + '</td>';
                if ($("#cbInvoiceDate").prop("checked"))
                    pTableHTML += '                                         <td>' + (GetDateWithFormatYMD(item.InvoiceDate)) + '</td>';
                if ($("#cbDueDate").prop("checked"))
                    pTableHTML += '                                         <td>' + (GetDateWithFormatYMD(item.DueDate)) + '</td>';
                if (IsMESCOCompany )
                    pTableHTML += '                                         <td>' + (GetDateWithFormatYMD((item.ApprovedDate)) == "01/01/1900" ? "" : GetDateWithFormatYMD((item.ApprovedDate))) + '</td>';
                if ($("#cbDeliveryDate").prop("checked"))
                    pTableHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate)) + '</td>';
                if ($("#cbCertificateNumber").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.CertificateNumber == 0 ? "" : item.CertificateNumber) + '</td>';
                if ($("#cbVATNo").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.VATNumber == 0 ? "" : item.VATNumber) + '</td>';
                if ($("#cbBookingNumber").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.BookingNumber == 0 || item.BookingNumber == null ? "" : item.BookingNumber) + '</td>';
                if ($("#cbVessel").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.VesselName == 0 ? "" : item.VesselName) + '</td>';
                //pTableHTML += '                                         <td' + (item.InvoiceStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + (item.InvoiceStatus == 0 ? "" : item.InvoiceStatus) + '</td>';
                //if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                //    pTableHTML += '                                         <td>' + item.AmountWithoutVAT.toFixed(2) + '</td>';
                //if (!$("#cbWithoutVAT").prop("checked"))
                //    pTableHTML += '                                         <td>' + item.TaxAmount.toFixed(2) + '</td>';
                //if (!$("#cbWithoutDiscount").prop("checked"))
                //    pTableHTML += '                                         <td>' + item.DiscountAmount.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + item.AmountWithoutVAT + '</td>';
                if (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLD" || pDefaults.UnEditableCompanyName == "SWI") {
                    if (pDefaults.UnEditableCompanyName == "SWI") {
                        pTableHTML += '                                         <td class="">' + item.Items10PercTaxAmount.toFixed(2) + '</td>';
                        pTableHTML += '                                         <td class="">' + item.Items14PercTaxAmount.toFixed(2) + '</td>';
                        pTableHTML += '                                         <td>' + (item.VATFromItems - item.Items10PercTaxAmount - item.Items14PercTaxAmount).toFixed(2) + '</td>';
                    }
                    else {
                        pTableHTML += '                                         <td>' + item.Items5PercTaxAmount.toFixed(2) + '</td>';
                        pTableHTML += '                                         <td class="hide">' + item.Items10PercTaxAmount.toFixed(2) + '</td>';
                        pTableHTML += '                                         <td class="">' + item.Items14PercTaxAmount.toFixed(2) + '</td>';
                        pTableHTML += '                                         <td>' + (item.VATFromItems - item.Items5PercTaxAmount - item.Items14PercTaxAmount).toFixed(2) + '</td>';
                    }
                }
                else
                    pTableHTML += '                                         <td>' + item.VATFromItems.toFixed(2) + '</td>';

                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableHTML += '                                         <td>' + item.DiscountFromItems.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + item.Amount.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + item.CurrencyCode + '</td>';
                if ($("#cbLocalCurrency").prop("checked")) {
                    pTableHTML += '                                         <td>' + item.ExchangeRate + '</td>';
                    pTableHTML += '                                         <td>' + (item.ExchangeRate * item.Amount).toFixed(2) + '</td>';
                }
                if ($("#cbPaidAmount").prop("checked"))
                    pTableHTML += '                                         <td>' + item.PaidAmount.toFixed(2) + '</td>';
                if (IsMESCOCompany )
                    pTableHTML += '                                         <td>' + item.CreditAmount.toFixed(2) + '</td>';
                if ($("#cbRemaining").prop("checked"))
                    pTableHTML += '                                         <td' + (item.InvoiceStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + item.RemainingAmount.toFixed(2) + '</td>';
                var _PaymentDate = (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PaymentDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PaymentDate)));
                if ($("#cbOperationDate").prop("checked"))
                    pTableHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.OperationOpenDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.OperationOpenDate))) + '</td>';
                if ($("#cbPaymentDate").prop("checked"))
                    pTableHTML += '                                         <td>' + _PaymentDate + '</td>';
                if ($("#cbDaysDifference").prop("checked"))
                    pTableHTML += '                                         <td>' + (_PaymentDate == "" ? "" : (Date.prototype.compareDates(GetDateWithFormatMDY(item.OperationOpenDate), GetDateWithFormatMDY(item.PaymentDate)))) + '</td>';

                pTableHTML += '                                         <td>' + (item.ChequeNum == "0" ? "" : item.ChequeNum) + (item.AllocationCode == 0 ? "" : "(" + "/" + item.AllocationCode + ")") + '</td>';

                if (pDefaults.UnEditableCompanyName == "MES") 
                    pTableHTML += '                                         <td>' + (item.BillingDetails == 0 ? "" : item.BillingDetails) + '</td>';
                if ($("#cbAddFleetInvoice").prop("checked"))
                    pTableHTML += '                                         <td>' + (item.CustomerPaymentTerm == 0 ? "" : item.CustomerPaymentTerm) + '</td>';

                //pTableHTML += '                                         <td>' + (_AgingDays >= 0 && _AgingDays < 30 ? '✔' : '') + '</td>';
                //pTableHTML += '                                         <td>' + (_AgingDays >= 30 && _AgingDays < 60 ? '✔' : '') + '</td>';
                //pTableHTML += '                                         <td>' + (_AgingDays >= 60 && _AgingDays < 90 ? '✔' : '') + '</td>';
                //pTableHTML += '                                         <td>' + (_AgingDays >= 90 ? '✔' : '') + '</td>';
                if ($("#cbAging").prop("checked")) {
                    pTableHTML += '                                     <td>' + (_AgingDays >= 0 && _AgingDays < 30 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                    pTableHTML += '                                     <td>' + (_AgingDays >= 30 && _AgingDays < 60 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                    pTableHTML += '                                     <td>' + (_AgingDays >= 60 && _AgingDays < 90 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                    pTableHTML += '                                     <td>' + (_AgingDays >= 90 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                }
                //if ($("#PONumber").prop("checked"))
                //    pTableHTML += '                                     <td>' + (item.PONumber == 0 ? "" : item.PONumber) + '</td>';
                pTableHTML += '                                     </tr>';
            });
            pTableHTML += '                             </tbody>';
            pTableHTML += '                         </table>';
        } //if (pGroupedReportRows.length > 0)
    } //for (var i = 0; i < 1; i++)
    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        for (var i = 0; i < 1; i++) {
            var pGroupedReportRows = pReportRows;
            if (pGroupedReportRows.length > 0) {
                var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pGroupedReportRows, "Amount", "ExchangeRate");
                var pTotalSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "Amount", "CurrencyCode");
                var pTableSummary = "";
                pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                //pTableSummary += '                                     <td>Status</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                pTableSummary += '                                 </tr>';

                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                    var pAmountWithoutVATSummary = CalculateAmountWithoutVATCurrenciesSummaryFromArray_TaxOnItems(pGroupedReportRows);

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + 'TOTAL AMOUNT W/O VAT :</td>';
                    pTableSummary += '                                     <td>' + pAmountWithoutVATSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                    pTableSummary += '                                 </tr>';
                }

                if (!$("#cbWithoutVAT").prop("checked")) {
                    var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "VATFromItems", "CurrencyCode");

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + 'TOTAL VAT :</td>';
                    pTableSummary += '                                     <td>' + pTaxAmountSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                    pTableSummary += '                                 </tr>';
                }


                if (!$("#cbWithoutDiscount").prop("checked")) {
                    var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pGroupedReportRows);

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + 'TOTAL WHT :</td>';
                    pTableSummary += '                                     <td>' + pDiscountAmountSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                }

                pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                pTableSummary += '                                     <td>' + 'TOTAL :</td>';
                pTableSummary += '                                     <td>' + pTotalSummary + ' = (' + _TotalInDefaultCurrency + ')' + '</td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                //pTableSummary += '                                     <td>Status</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                pTableSummary += '                                 </tr>';
                $("#tblInvoicesReports tbody").append(pTableSummary);
                //ExportHtmlTableToCsv_RemovingCommasForNumbers("tblInvoicesReports", 'Invoices');
                ExportHtmlTableToCsv_RemovingCommasForNumbers_New("tblInvoicesReports", 'Invoices');
            }
        }
    }
    else {
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white; overflow-x: scroll;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Transport Type :</b> ' + $("#divTransportFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Direction Type :</b> ' + $("#divDirectionFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner Type:</b> ' + $("#slPartnerType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Inv. Type :</b> ' + $("#slInvoiceType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Inv. Status :</b> ' + $("#slInvoiceStatus option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Approval Status :</b> ' + $("#slApprovalStatus option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>VAT Type :</b> ' + ($("#cbWithoutVAT").prop("checked") ? "W/O" : $("#slVATType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>WHT :</b> ' + ($("#cbWithoutDiscount").prop("checked") ? "W/O" : $("#slDiscountType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Inv. Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
                                                                                    ? "All Dates"
                                                                                    : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        ReportHTML += '                     <div>&nbsp;</div>';
        var pGroupedReportRows = pReportRows;
        if (pGroupedReportRows.length > 0) {
            //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';

            ReportHTML += '                         <table id="tblInvoicesReports' + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            ReportHTML += '                         ' + $("#tblInvoicesReports").html();
            ReportHTML += '                         </table>';
        }

        debugger;
        if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
            var pAmountWithoutVATSummary = CalculateAmountWithoutVATCurrenciesSummaryFromArray_TaxOnItems(pReportRows);
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL AMOUNT W/O VAT :</u> </b> ' + pAmountWithoutVATSummary + '</div>';
        }
        if (!$("#cbWithoutVAT").prop("checked")) {
            var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "VATFromItems", "CurrencyCode");
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL VAT :</u> </b> ' + pTaxAmountSummary + '</div>';
        }
        if (!$("#cbWithoutDiscount").prop("checked")) {
            var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pReportRows);
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL WHT :</u> </b> ' + pDiscountAmountSummary + '</div>';
        }
        var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pReportRows, "Amount", "ExchangeRate");
        var pTotalSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "Amount", "CurrencyCode");
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary + ' =(' + _TotalInDefaultCurrency + ')' + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Paid :</u> </b> ' + _TotalPaid + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Remaining :</u> </b> ' + _TotalRemaining + '</div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        if (pOutputTo == "PrintInReportBody")
            $("#ReportBody").html(ReportHTML);
        else {
            var mywindow = window.open('', '_blank');
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
    }
}
/*****************************AgingPerClient**********************************/
function InvoicesReports_DrawReport_AgingPerClient(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pInvoiceItems = JSON.parse(data[2]);
    var pAgingPerClient = JSON.parse(data[4]);
    var _TotalPaid = CalculateSumOfArrayWithGroupBy(pReportRows, "PaidAmount", "CurrencyCode");
    var _TotalRemaining = CalculateSumOfArrayWithGroupBy(pReportRows, "RemainingAmount", "CurrencyCode");

    var pReportTitle = "A/R Aging Summary";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";
    var pBranchesList = document.getElementById("hReadySlBranches").options;
    for (var i = 0; i < 1; i++) {
        var pGroupedReportRows = pAgingPerClient;
        ////Array.sort() works by looping through each item in the array and comparing it to the one after it based on some criteria you specify in your comparison function, if return is 1 then swap.
        //pGroupedReportRows.sort((a, b) => ((a.InvoiceTypeName >= b.InvoiceTypeName && a.InvoiceNumber > b.InvoiceNumber)
        //                                  ) ? 1 : -1);
        if (pGroupedReportRows.length > 0) {
            //pTableHTML += '                         <table id="tblInvoicesReports" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
            pTableHTML += '                         <table id="tblInvoicesReports' + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            pTableHTML += '                             <thead>';
            pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            pTableHTML += '                                     <th>Customer</th>';
            if ($("#slCurrency").val() != "")
                pTableHTML += '                                     <th>Cur.</th>';
            if ($("#cbPaidAmount").prop("checked"))
                pTableHTML += '                                     <th>Paid Amt.</th>';
            if ($("#cbRemaining").prop("checked"))
                pTableHTML += '                                     <th>Remaining</th>';
            pTableHTML += '                                     <th>0-30</th>';
            pTableHTML += '                                     <th>31-60</th>';
            pTableHTML += '                                     <th>61-90</th>';
            pTableHTML += '                                     <th>Later</th>';
            pTableHTML += '                                 </tr>';
            pTableHTML += '                             </thead>';
            pTableHTML += '                             <tbody>';
            var serial = 0;
            $.each((pGroupedReportRows), function (i, item) {
                debugger;
                pTableHTML += '                                     <tr style="font-size:95%;">';
                ++serial;
                //var _TotalVAT = item.VATFromItems; //item.Items5PercTaxAmount + item.Items10PercTaxAmount + item.Items14PercTaxAmount;
                //var _RowAmountWithoutVAT = (item.Amount - _TotalVAT + item.DiscountAmount).toFixed(2);
                //pTableHTML += '                                         <td class="hide">' + (++serial) + '</td>';
                //pTableHTML += '                                         <td class="hide">' + item.BranchName + '</td>';
                pTableHTML += '                                         <td>' + item.PartnerName.replace(/'/g, "''"); + '</td>';
                if ($("#slCurrency").val() != "")
                    pTableHTML += '                                         <td>' + item.CurrencyCode + '</td>';
                if ($("#cbPaidAmount").prop("checked"))
                    pTableHTML += '                                         <td>' + item.PaidAmount.toFixed(2) + '</td>';
                if ($("#cbRemaining").prop("checked"))
                    pTableHTML += '                                         <td' + (item.InvoiceStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + item.RemainingAmount.toFixed(2) + '</td>';
                
                pTableHTML += '                                         <td>' + item.ZeroToThirty.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + item.ThirtyOneToSixty.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + item.SixtyOneToNinty.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + item.Later.toFixed(2) + '</td>';
                pTableHTML += '                                     </tr>';
            });
            pTableHTML += '                             </tbody>';
            pTableHTML += '                         </table>';
        } //if (pGroupedReportRows.length > 0)
    } //for (var i = 0; i < 1; i++)
    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        for (var i = 0; i < 1; i++) {
            var pGroupedReportRows = pReportRows;
            if (pGroupedReportRows.length > 0) {
                var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pGroupedReportRows, "Amount", "ExchangeRate");
                var pTotalSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "Amount", "CurrencyCode");
                var pTableSummary = "";
                pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                //pTableSummary += '                                     <td>Status</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                pTableSummary += '                                 </tr>';

                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                    var pAmountWithoutVATSummary = CalculateAmountWithoutVATCurrenciesSummaryFromArray_TaxOnItems(pGroupedReportRows);

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + 'TOTAL AMOUNT W/O VAT :</td>';
                    pTableSummary += '                                     <td>' + pAmountWithoutVATSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                    pTableSummary += '                                 </tr>';
                }

                if (!$("#cbWithoutVAT").prop("checked")) {
                    var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "VATFromItems", "CurrencyCode");

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + 'TOTAL VAT :</td>';
                    pTableSummary += '                                     <td>' + pTaxAmountSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                    pTableSummary += '                                 </tr>';
                }


                if (!$("#cbWithoutDiscount").prop("checked")) {
                    var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pGroupedReportRows);

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + 'TOTAL WHT :</td>';
                    pTableSummary += '                                     <td>' + pDiscountAmountSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                }

                pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                pTableSummary += '                                     <td>' + 'TOTAL :</td>';
                pTableSummary += '                                     <td>' + pTotalSummary + ' = (' + _TotalInDefaultCurrency + ')' + '</td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                //pTableSummary += '                                     <td>Status</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                pTableSummary += '                                 </tr>';
                $("#tblInvoicesReports tbody").append(pTableSummary);
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblInvoicesReports", 'Invoices');
            }
        }
    }
    else {
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Transport Type :</b> ' + $("#divTransportFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Direction Type :</b> ' + $("#divDirectionFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner Type:</b> ' + $("#slPartnerType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Inv. Type :</b> ' + $("#slInvoiceType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Inv. Status :</b> ' + $("#slInvoiceStatus option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Approval Status :</b> ' + $("#slApprovalStatus option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>VAT Type :</b> ' + ($("#cbWithoutVAT").prop("checked") ? "W/O" : $("#slVATType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>WHT :</b> ' + ($("#cbWithoutDiscount").prop("checked") ? "W/O" : $("#slDiscountType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Inv. Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
                                                                                    ? "All Dates"
                                                                                    : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        ReportHTML += '                     <div>&nbsp;</div>';
        var pGroupedReportRows = pReportRows;
        if (pGroupedReportRows.length > 0) {
            //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';

            ReportHTML += '                         <table id="tblInvoicesReports' + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            ReportHTML += '                         ' + $("#tblInvoicesReports").html();
            ReportHTML += '                         </table>';
        }

        debugger;
        if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
            var pAmountWithoutVATSummary = CalculateAmountWithoutVATCurrenciesSummaryFromArray_TaxOnItems(pReportRows);
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL AMOUNT W/O VAT :</u> </b> ' + pAmountWithoutVATSummary + '</div>';
        }
        if (!$("#cbWithoutVAT").prop("checked")) {
            var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "VATFromItems", "CurrencyCode");
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL VAT :</u> </b> ' + pTaxAmountSummary + '</div>';
        }
        if (!$("#cbWithoutDiscount").prop("checked")) {
            var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pReportRows);
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL WHT :</u> </b> ' + pDiscountAmountSummary + '</div>';
        }
        var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pReportRows, "Amount", "ExchangeRate");
        var pTotalSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "Amount", "CurrencyCode");
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary + ' =(' + _TotalInDefaultCurrency + ')' + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Paid :</u> </b> ' + _TotalPaid + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Remaining :</u> </b> ' + _TotalRemaining + '</div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        if (pOutputTo == "PrintInReportBody")
            $("#ReportBody").html(ReportHTML);
        else {
            var mywindow = window.open('', '_blank');
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
    }
}
/*****************************AgingPerClient**********************************/
function InvoicesReports_DrawReport_AgingPerClient_AllCurrency(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pInvoiceItems = JSON.parse(data[2]);
    var pAgingPerClient = JSON.parse(data[4]);
    var pDistinctClientsList = JSON.parse(data[5]);

    var _TotalPaid = CalculateSumOfArrayWithGroupBy(pReportRows, "PaidAmount", "CurrencyCode");
    var _TotalRemaining = CalculateSumOfArrayWithGroupBy(pReportRows, "RemainingAmount", "CurrencyCode");

    var pReportTitle = "A/R Aging Summary (All Currencies)";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";
    //var pBranchesList = document.getElementById("hReadySlBranches").options;
    debugger;
    pTableHTML += '                         <table id="tblInvoicesReports' + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
    pTableHTML += '                             <thead>';
    pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
    pTableHTML += '                                     <th>Customer</th>';

    pTableHTML += '                                     <th>Total EGP</th>';
    pTableHTML += '                                     <th>Total EUR</th>';
    pTableHTML += '                                     <th>Total GBP</th>';
    pTableHTML += '                                     <th>Total USD</th>';
    if (!$("#cbAgingPerClient_AllCurrency_Minified").prop("checked")) {
        pTableHTML += '                                     <th>0-30 EGP</th>';
        pTableHTML += '                                     <th>0-30 EUR</th>';
        pTableHTML += '                                     <th>0-30 GBP</th>';
        pTableHTML += '                                     <th>0-30 USD</th>';

        pTableHTML += '                                     <th>31-60 EGP</th>';
        pTableHTML += '                                     <th>31-60 EUR</th>';
        pTableHTML += '                                     <th>31-60 GBP</th>';
        pTableHTML += '                                     <th>31-60 USD</th>';

        pTableHTML += '                                     <th>61-90 EGP</th>';
        pTableHTML += '                                     <th>61-90 EUR</th>';
        pTableHTML += '                                     <th>61-90 GBP</th>';
        pTableHTML += '                                     <th>61-90 USD</th>';

        pTableHTML += '                                     <th>Later EGP</th>';
        pTableHTML += '                                     <th>Later EUR</th>';
        pTableHTML += '                                     <th>Later GBP</th>';
        pTableHTML += '                                     <th>Later USD</th>';
    }
    pTableHTML += '                                     <th>Total OverDue EGP</th>';
    pTableHTML += '                                     <th>Total OverDue EUR</th>';
    pTableHTML += '                                     <th>Total OverDue GBP</th>';
    pTableHTML += '                                     <th>Total OverDue USD</th>';

    pTableHTML += '                                     <th>NotDue EGP</th>';
    pTableHTML += '                                     <th>NotDue EUR</th>';
    pTableHTML += '                                     <th>NotDue GBP</th>';
    pTableHTML += '                                     <th>NotDue USD</th>';
    pTableHTML += '                                 </tr>';
    pTableHTML += '                             </thead>';
    pTableHTML += '                             <tbody>';
    var serial = 0;
    for (var i = 0; i < pDistinctClientsList.length; i++) {
        var pGroupedReportRows = pAgingPerClient.filter(x => x.PartnerName == pDistinctClientsList[i].PartnerName);

        var pZeroToThirtyEGPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EGP");
        var _ZeroToThirtyEGP = GetArraySum(pZeroToThirtyEGPArray, "ZeroToThirty");
        var pZeroToThirtyEURArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EUR");
        var _ZeroToThirtyEUR = GetArraySum(pZeroToThirtyEURArray, "ZeroToThirty");
        var pZeroToThirtyGBPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "GBP");
        var _ZeroToThirtyGBP = GetArraySum(pZeroToThirtyGBPArray, "ZeroToThirty");
        var pZeroToThirtyUSDArray = pGroupedReportRows.filter(x => x.CurrencyCode == "USD");
        var _ZeroToThirtyUSD = GetArraySum(pZeroToThirtyUSDArray, "ZeroToThirty");

        var pThirtyOneToSixtyEGPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EGP");
        var _ThirtyOneToSixtyEGP = GetArraySum(pThirtyOneToSixtyEGPArray, "ThirtyOneToSixty");
        var pThirtyOneToSixtyEURArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EUR");
        var _ThirtyOneToSixtyEUR = GetArraySum(pThirtyOneToSixtyEURArray, "ThirtyOneToSixty");
        var pThirtyOneToSixtyGBPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "GBP");
        var _ThirtyOneToSixtyGBP = GetArraySum(pThirtyOneToSixtyGBPArray, "ThirtyOneToSixty");
        var pThirtyOneToSixtyUSDArray = pGroupedReportRows.filter(x => x.CurrencyCode == "USD");
        var _ThirtyOneToSixtyUSD = GetArraySum(pThirtyOneToSixtyUSDArray, "ThirtyOneToSixty");

        var pSixtyOneToNintyEGPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EGP");
        var _SixtyOneToNintyEGP = GetArraySum(pSixtyOneToNintyEGPArray, "SixtyOneToNinty");
        var pSixtyOneToNintyEURArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EUR");
        var _SixtyOneToNintyEUR = GetArraySum(pSixtyOneToNintyEURArray, "SixtyOneToNinty");
        var pSixtyOneToNintyGBPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "GBP");
        var _SixtyOneToNintyGBP = GetArraySum(pSixtyOneToNintyGBPArray, "SixtyOneToNinty");
        var pSixtyOneToNintyUSDArray = pGroupedReportRows.filter(x => x.CurrencyCode == "USD");
        var _SixtyOneToNintyUSD = GetArraySum(pSixtyOneToNintyUSDArray, "SixtyOneToNinty");

        var pLaterEGPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EGP");
        var _LaterEGP = GetArraySum(pLaterEGPArray, "Later");
        var pLaterEURArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EUR");
        var _LaterEUR = GetArraySum(pLaterEURArray, "Later");
        var pLaterGBPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "GBP");
        var _LaterGBP = GetArraySum(pLaterGBPArray, "Later");
        var pLaterUSDArray = pGroupedReportRows.filter(x => x.CurrencyCode == "USD");
        var _LaterUSD = GetArraySum(pLaterUSDArray, "Later");

        var pNotDueEGPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EGP");
        var _NotDueEGP = GetArraySum(pNotDueEGPArray, "NotDue");
        var pNotDueEURArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EUR");
        var _NotDueEUR = GetArraySum(pNotDueEURArray, "NotDue");
        var pNotDueGBPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "GBP");
        var _NotDueGBP = GetArraySum(pNotDueGBPArray, "NotDue");
        var pNotDueUSDArray = pGroupedReportRows.filter(x => x.CurrencyCode == "USD");
        var _NotDueUSD = GetArraySum(pNotDueUSDArray, "NotDue");

        var _TotalOverDueEGP = _ZeroToThirtyEGP + _ThirtyOneToSixtyEGP + _SixtyOneToNintyEGP + _LaterEGP;
        var _TotalOverDueEUR = _ZeroToThirtyEUR + _ThirtyOneToSixtyEUR + _SixtyOneToNintyEUR + _LaterEUR;
        var _TotalOverDueGBP = _ZeroToThirtyGBP + _ThirtyOneToSixtyGBP + _SixtyOneToNintyGBP + _LaterGBP;
        var _TotalOverDueUSD = _ZeroToThirtyUSD + _ThirtyOneToSixtyUSD + _SixtyOneToNintyUSD + _LaterUSD;

        var _TotalEGP = _TotalOverDueEGP + _NotDueEGP;
        var _TotalEUR = _TotalOverDueEUR + _NotDueEUR;
        var _TotalGBP = _TotalOverDueGBP + _NotDueGBP;
        var _TotalUSD = _TotalOverDueUSD + _NotDueUSD;
        ////Array.sort() works by looping through each item in the array and comparing it to the one after it based on some criteria you specify in your comparison function, if return is 1 then swap.
        //pGroupedReportRows.sort((a, b) => ((a.InvoiceTypeName >= b.InvoiceTypeName && a.InvoiceNumber > b.InvoiceNumber)
        //                                  ) ? 1 : -1);
        if (pGroupedReportRows.length > 0) {
            //pTableHTML += '                         <table id="tblInvoicesReports" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
            //$.each((pGroupedReportRows), function (i, item) {
            pTableHTML += '                                     <tr style="font-size:95%;">';
            ++serial;
            //var _TotalVAT = item.VATFromItems; //item.Items5PercTaxAmount + item.Items10PercTaxAmount + item.Items14PercTaxAmount;
            //var _RowAmountWithoutVAT = (item.Amount - _TotalVAT + item.DiscountAmount).toFixed(2);
            //pTableHTML += '                                         <td class="hide">' + (++serial) + '</td>';
            //pTableHTML += '                                         <td class="hide">' + item.BranchName + '</td>';
            pTableHTML += '                                         <td>' + pGroupedReportRows[0].PartnerName + '</td>';

            pTableHTML += '                                         <td>' + _TotalEGP.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + _TotalEUR.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + _TotalGBP.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + _TotalUSD.toFixed(2) + '</td>';

            if (!$("#cbAgingPerClient_AllCurrency_Minified").prop("checked")) {

                pTableHTML += '                                         <td>' + _ZeroToThirtyEGP.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _ZeroToThirtyEUR.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _ZeroToThirtyGBP.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _ZeroToThirtyUSD.toFixed(2) + '</td>';

                pTableHTML += '                                         <td>' + _ThirtyOneToSixtyEGP.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _ThirtyOneToSixtyEUR.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _ThirtyOneToSixtyGBP.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _ThirtyOneToSixtyUSD.toFixed(2) + '</td>';

                pTableHTML += '                                         <td>' + _SixtyOneToNintyEGP.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _SixtyOneToNintyEUR.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _SixtyOneToNintyGBP.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _SixtyOneToNintyUSD.toFixed(2) + '</td>';

                pTableHTML += '                                         <td>' + _LaterEGP.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _LaterEUR.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _LaterGBP.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _LaterUSD.toFixed(2) + '</td>';
            }
            pTableHTML += '                                         <td>' + _TotalOverDueEGP.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + _TotalOverDueEUR.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + _TotalOverDueGBP.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + _TotalOverDueUSD.toFixed(2) + '</td>';

            pTableHTML += '                                         <td>' + _NotDueEGP.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + _NotDueEUR.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + _NotDueGBP.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + _NotDueUSD.toFixed(2) + '</td>';

            //});
        } //if (pGroupedReportRows.length > 0)
    } //for (var i = 0; i < pDistinctClientsList.length; i++)
    pTableHTML += '                             </tbody>';
    pTableHTML += '                         </table>';
    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        for (var i = 0; i < 1; i++) {
            var pGroupedReportRows = pReportRows;
            if (pGroupedReportRows.length > 0) {
                var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pGroupedReportRows, "Amount", "ExchangeRate");
                var pTotalSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "Amount", "CurrencyCode");
                var pTableSummary = "";
                pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                //pTableSummary += '                                     <td>Status</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                pTableSummary += '                                 </tr>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                    var pAmountWithoutVATSummary = CalculateAmountWithoutVATCurrenciesSummaryFromArray_TaxOnItems(pGroupedReportRows);

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + 'TOTAL AMOUNT W/O VAT :</td>';
                    pTableSummary += '                                     <td>' + pAmountWithoutVATSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                    pTableSummary += '                                 </tr>';
                }
                if (!$("#cbWithoutVAT").prop("checked")) {
                    var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "VATFromItems", "CurrencyCode");

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + 'TOTAL VAT :</td>';
                    pTableSummary += '                                     <td>' + pTaxAmountSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                    pTableSummary += '                                 </tr>';
                }
                if (!$("#cbWithoutDiscount").prop("checked")) {
                    var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pGroupedReportRows);

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + 'TOTAL WHT :</td>';
                    pTableSummary += '                                     <td>' + pDiscountAmountSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                }
                pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                pTableSummary += '                                     <td>' + 'TOTAL :</td>';
                pTableSummary += '                                     <td>' + pTotalSummary + ' = (' + _TotalInDefaultCurrency + ')' + '</td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                //pTableSummary += '                                     <td>Status</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                pTableSummary += '                                 </tr>';
                //$("#tblInvoicesReports tbody").append(pTableSummary);
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblInvoicesReports", 'Invoices');
            }
        }
    }
    else {
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Transport Type :</b> ' + $("#divTransportFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Direction Type :</b> ' + $("#divDirectionFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner Type:</b> ' + $("#slPartnerType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Inv. Type :</b> ' + $("#slInvoiceType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Inv. Status :</b> ' + $("#slInvoiceStatus option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Approval Status :</b> ' + $("#slApprovalStatus option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>VAT Type :</b> ' + ($("#cbWithoutVAT").prop("checked") ? "W/O" : $("#slVATType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>WHT :</b> ' + ($("#cbWithoutDiscount").prop("checked") ? "W/O" : $("#slDiscountType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Inv. Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
                                                                                    ? "All Dates"
                                                                                    : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        ReportHTML += '                     <div>&nbsp;</div>';
        var pGroupedReportRows = pReportRows;
        if (pGroupedReportRows.length > 0) {
            //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';

            ReportHTML += '                         <table id="tblInvoicesReports' + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            ReportHTML += '                         ' + $("#tblInvoicesReports").html();
            ReportHTML += '                         </table>';
        }

        debugger;
        //if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
        //    var pAmountWithoutVATSummary = CalculateAmountWithoutVATCurrenciesSummaryFromArray_TaxOnItems(pReportRows);
        //    ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL AMOUNT W/O VAT :</u> </b> ' + pAmountWithoutVATSummary + '</div>';
        //}
        //if (!$("#cbWithoutVAT").prop("checked")) {
        //    var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "VATFromItems", "CurrencyCode");
        //    ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL VAT :</u> </b> ' + pTaxAmountSummary + '</div>';
        //}
        //if (!$("#cbWithoutDiscount").prop("checked")) {
        //    var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pReportRows);
        //    ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL WHT :</u> </b> ' + pDiscountAmountSummary + '</div>';
        //}
        //var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pReportRows, "Amount", "ExchangeRate");
        //var pTotalSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "Amount", "CurrencyCode");
        //ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary + ' =(' + _TotalInDefaultCurrency + ')' + '</div>';
        //ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Paid :</u> </b> ' + _TotalPaid + '</div>';
        //ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Remaining :</u> </b> ' + _TotalRemaining + '</div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        if (pOutputTo == "PrintInReportBody")
            $("#ReportBody").html(ReportHTML);
        else {
            var mywindow = window.open('', '_blank');
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
    }
}
/*****************************IncludeDetails**********************************/
function InvoicesReports_DrawReport_IncludeDetails(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pInvoiceItems = JSON.parse(data[2]);
    var _TotalPaid = CalculateSumOfArrayWithGroupBy(pReportRows, "PaidAmount", "CurrencyCode");
    var _TotalRemaining = CalculateSumOfArrayWithGroupBy(pReportRows, "RemainingAmount", "CurrencyCode");
    var pReportTitle = "Invoices Report";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";
    var pTableHTML2 = "";
    var pBranchesList = document.getElementById("hReadySlBranches").options;
    var _NumberOfColumns = 4;
    var pInvoiceAllocation = JSON.parse(data[6]);
    if (pDefaults.IsTaxOnItems)
        _NumberOfColumns = 8;
    //for (var i = 0; i < 1; i++) {
        
        ////Array.sort() works by looping through each item in the array and comparing it to the one after it based on some criteria you specify in your comparison function, if return is 1 then swap.
        //pReportRows.sort((a, b) => ((a.InvoiceTypeName >= b.InvoiceTypeName && a.InvoiceNumber > b.InvoiceNumber)
        //                                  ) ? 1 : -1);

    $.each((pReportRows), function (i, item) {
        //pTableHTML += '                         <table id="tblInvoicesReports" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
        //var _TotalVAT = item.VATFromItems; //item.Items5PercTaxAmount + item.Items10PercTaxAmount + item.Items14PercTaxAmount;
        //var _RowAmountWithoutVAT = (item.Amount - _TotalVAT + item.DiscountAmount).toFixed(2);
        pTableHTML += '                         <table id="tblInvoicesReports' + item.ID + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
        pTableHTML += '                             <thead>';
        pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        //pTableHTML += '                                     <th colspan=' + _NumberOfColumns + '>Inv. ' + (pDefaults.UnEditableCompanyName == "SAF"
        //                                                                    ? (item.InvoiceTypeName + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)).substr(8, 2) + "#" + (item.ConcatenatedInvoiceNumber).split('/')[0].padStart(5, 0))
        //    : item.ConcatenatedInvoiceNumber)
        //    + '&nbsp; Client: ' + item.PartnerName.replace(/'/g, "''"); + '&nbsp; Oper.: ' + item.OperationCode + '&nbsp; MBL.: ' + item.MasterBL + '&nbsp; RNo.: ' + item.CCReleaseNo + '&nbsp; Inv.Date: ' + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + '&nbsp; DueDate: ' + ConvertDateFormat(GetDateWithFormatMDY(item.DueDate)) + '&nbsp; Total: ' + item.Amount + item.CurrencyCode + (pDefaults.UnEditableCompanyName == "GHA" ? ' Payment Date :  ' + (ConvertDateFormat(GetDateWithFormatMDY(item.PaymentDate)) == '01/01/1900' ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PaymentDate))) : "") + (pDefaults.UnEditableCompanyName=="GHA"?  '    Payment Amount : ' + item.RemainingAmount :"")+'</th>';


        pTableHTML += '<th colspan=' + _NumberOfColumns + '>Inv. ' +
            (pDefaults.UnEditableCompanyName == "SAF"
                ? (item.InvoiceTypeName + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)).substr(8, 2) + "#" + (item.ConcatenatedInvoiceNumber).split('/')[0].padStart(5, 0))
                : item.ConcatenatedInvoiceNumber
            ) +
            '&nbsp; Client: ' + item.PartnerName.replace(/'/g, "''") +
            '&nbsp; Oper.: ' + item.OperationCode +
            '&nbsp; MBL.: ' + item.MasterBL +
            '&nbsp; RNo.: ' + item.CCReleaseNo +
            '&nbsp; Inv.Date: ' + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) +
            '&nbsp; DueDate: ' + ConvertDateFormat(GetDateWithFormatMDY(item.DueDate)) +
            '&nbsp; Total: ' + item.Amount + item.CurrencyCode +
            (pDefaults.UnEditableCompanyName == "GHA"
                ? ' Payment Date : ' + (ConvertDateFormat(GetDateWithFormatMDY(item.PaymentDate)) == '01/01/1900' ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PaymentDate)))
                : ""
            ) +
            (pDefaults.UnEditableCompanyName == "GHA"
                ? ' Payment Amount : ' + item.RemainingAmount
                : ""
            ) +
            '</th>';
        pTableHTML += '                                 </tr>';
        pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        pTableHTML += '                                     <th style="width:30%">Item</th>';
        if (pDefaults.UnEditableCompanyName != "GHA") {
            pTableHTML += '                                     <th style="width:5%">Qty</th>';
            pTableHTML += '                                     <th style="width:15%">Unit Price</th>';
        }
     
    
        if (pDefaults.IsTaxOnItems) {
            pTableHTML += '                                     <th style="width:10%">VAT Perc.</th>';
            pTableHTML += '                                     <th style="width:10%">VAT Amount</th>';
            pTableHTML += '                                     <th style="width:10%">WHT Perc.</th>';
            pTableHTML += '                                     <th style="width:10%">WHT Amount</th>';
           
        }
        pTableHTML += '                                     <th style="width:10%">Amount</th>';
        if (pDefaults.UnEditableCompanyName == "GHA") {
            pTableHTML += '                                     <th style="width:5%">Notes</th>';
        }
        pTableHTML += '                                 </tr>';
        pTableHTML += '                             </thead>';
        pTableHTML += '                             <tbody>';

        var _CurrentInvoiceItems = pInvoiceItems.filter(x => x.InvoiceID == item.ID);
        var _pInvoiceAllocation = pInvoiceAllocation.filter(x => x.InvoiceID == item.ID);
        $.each((_CurrentInvoiceItems), function (j, InvoiceItem) {
            pTableHTML += '                                     <tr style="font-size:95%;">';
            pTableHTML += '                                         <td>' + InvoiceItem.ChargeTypeName + (pDefaults.UnEditableCompanyName == "SEA" ? (InvoiceItem.Notes == 0 ? "" : (" - " + InvoiceItem.Notes)) : "") + '</td>';
            if (pDefaults.UnEditableCompanyName != "GHA") {
                pTableHTML += '                                         <td>' + InvoiceItem.Quantity.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + InvoiceItem.SalePrice.toFixed(2) + '</td>';
            }
           

            if (pDefaults.IsTaxOnItems) {
                pTableHTML += '                                         <td>' + InvoiceItem.TaxPercentage.toFixed(2) + '%' + '</td>';
                pTableHTML += '                                         <td>' + InvoiceItem.TaxAmount.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + InvoiceItem.DiscountPercentage.toFixed(2) + '%' + '</td>';
                pTableHTML += '                                         <td>' + InvoiceItem.DiscountAmount.toFixed(2) + '</td>';
            }
            pTableHTML += '                                         <td>' + InvoiceItem.SaleAmount.toFixed(2) + '</td>';
            if (pDefaults.UnEditableCompanyName == "GHA") {
                pTableHTML += '                                         <td colspan=' + InvoiceItem.Notes + '</td>';
            }
            pTableHTML += '                                     </tr>';
        });
     
  
        if (item.FixedDiscount > 0) {
            pTableHTML += '                                     <tr style="font-size:95%;">';
            pTableHTML += '                                         <td>' + 'Special Discount' + '</td>';
            pTableHTML += '                                         <td colspan=' + (_NumberOfColumns - 1) + '>' + '-' + item.FixedDiscount.toFixed(2) + '</td>';
            pTableHTML += '                                     </tr>';
        }
        //pTableHTML += '                                     <tr style="font-size:95%;">';
        //pTableHTML += '                                     <th>Payment Date</th>';
        //var _pInvoiceAllocationFiltered = _pInvoiceAllocation.filter(x => x.InvoiceID == item.ID);
        //_pInvoiceAllocationFiltered.forEach(function (InvoiceItem) {
        //    pTableHTML += '<td>' + ConvertDateFormat(GetDateWithFormatMDY(InvoiceItem.Date)) + '</td>';
        //});
        //pTableHTML += '</tr>';
        pTableHTML += '                             </tbody>';
        pTableHTML += '                         </table>';

        pTableHTML += '                         </br>';
        var _pInvoiceAllocationFiltered = _pInvoiceAllocation.filter(x => x.InvoiceID == item.ID);
        if (pDefaults.UnEditableCompanyName == "GHA") {
      
            debugger;
            if (_pInvoiceAllocationFiltered.length > 0) {

                pTableHTML += ' <table id="tblInvoicesRep' + item.ID + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';

                pTableHTML += '                                     <tbody>';
                pTableHTML += '                                     <tr">';
                pTableHTML += '                                     <td> Payment Date</td>';

                debugger;
                _pInvoiceAllocationFiltered.forEach(function (InvoiceItem) {
                    debugger;
                    pTableHTML += '<td>' + ConvertDateFormat(GetDateWithFormatMDY(InvoiceItem.Date)) + '</td>';
                });
                pTableHTML += '</tr>';
                pTableHTML += '                                     <tr">';
                pTableHTML += '                                     <td> Payment Amount</td>';
                var _pInvoiceAllocationFiltered = _pInvoiceAllocation.filter(x => x.InvoiceID == item.ID);
                debugger;
                _pInvoiceAllocationFiltered.forEach(function (InvoiceItem) {
                    debugger;
                    pTableHTML += '<td>' + InvoiceItem.Paid + '</td>';
                });
                pTableHTML += '</tr>';
                pTableHTML += '                                     </tbody>';
                pTableHTML += '</table>';
            }

         
        }
    }); //$.each((pReportRows), function (i, item) {
  
    //} //for (var i = 0; i < 1; i++)
    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (1 == 2) {//if (pOutputTo == "Excel" ) {
        //for (var i = 0; i < 1; i++) {
            
        //    if (pReportRows.length > 0) {
        //        var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pReportRows, "Amount", "ExchangeRate");
        //        var pTotalSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "Amount", "CurrencyCode");
        //        var pTableSummary = "";
        //        pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        //        pTableSummary += '                                     <td></td>';
        //        pTableSummary += '                                     <td></td>';
        //        pTableSummary += '                                     <td></td>';
        //        pTableSummary += '                                     <td></td>';
        //        pTableSummary += '                                     <td></td>';
        //        pTableSummary += '                                     <td></td>';
        //        //pTableSummary += '                                     <td>Status</td>';
        //        if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
        //            pTableSummary += '                                     <td></td>';
        //        if (!$("#cbWithoutVAT").prop("checked"))
        //            pTableSummary += '                                     <td></td>';
        //        if (!$("#cbWithoutDiscount").prop("checked"))
        //            pTableSummary += '                                     <td></td>';
        //        pTableSummary += '                                     <td></td>';
        //        pTableSummary += '                                     <td></td>';
        //        pTableSummary += '                                     <td></td>';
        //        pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
        //        pTableSummary += '                                 </tr>';

        //        if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
        //            var pAmountWithoutVATSummary = CalculateAmountWithoutVATCurrenciesSummaryFromArray_TaxOnItems(pReportRows);

        //            pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        //            pTableSummary += '                                     <td>' + 'TOTAL AMOUNT W/O VAT :</td>';
        //            pTableSummary += '                                     <td>' + pAmountWithoutVATSummary + '</td>';
        //            pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td>';
        //            //pTableSummary += '                                     <td>Status</td>';
        //            if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
        //                pTableSummary += '                                     <td></td>';
        //            if (!$("#cbWithoutVAT").prop("checked"))
        //                pTableSummary += '                                     <td></td>';
        //            if (!$("#cbWithoutDiscount").prop("checked"))
        //                pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
        //            pTableSummary += '                                 </tr>';
        //        }

        //        if (!$("#cbWithoutVAT").prop("checked")) {
        //            var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "VATFromItems", "CurrencyCode");

        //            pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        //            pTableSummary += '                                     <td>' + 'TOTAL VAT :</td>';
        //            pTableSummary += '                                     <td>' + pTaxAmountSummary + '</td>';
        //            pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td>';
        //            //pTableSummary += '                                     <td>Status</td>';
        //            if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
        //                pTableSummary += '                                     <td></td>';
        //            if (!$("#cbWithoutVAT").prop("checked"))
        //                pTableSummary += '                                     <td></td>';
        //            if (!$("#cbWithoutDiscount").prop("checked"))
        //                pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
        //            pTableSummary += '                                 </tr>';
        //        }


        //        if (!$("#cbWithoutDiscount").prop("checked")) {
        //            var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pReportRows);

        //            pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        //            pTableSummary += '                                     <td>' + 'TOTAL WHT :</td>';
        //            pTableSummary += '                                     <td>' + pDiscountAmountSummary + '</td>';
        //            pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td>';
        //            //pTableSummary += '                                     <td>Status</td>';
        //            if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
        //                pTableSummary += '                                     <td></td>';
        //            if (!$("#cbWithoutVAT").prop("checked"))
        //                pTableSummary += '                                     <td></td>';
        //            if (!$("#cbWithoutDiscount").prop("checked"))
        //                pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td>';
        //            pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
        //        }

        //        pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        //        pTableSummary += '                                     <td>' + 'TOTAL :</td>';
        //        pTableSummary += '                                     <td>' + pTotalSummary + ' = (' + _TotalInDefaultCurrency + ')' + '</td>';
        //        pTableSummary += '                                     <td></td>';
        //        pTableSummary += '                                     <td></td>';
        //        pTableSummary += '                                     <td></td>';
        //        pTableSummary += '                                     <td></td>';
        //        //pTableSummary += '                                     <td>Status</td>';
        //        if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
        //            pTableSummary += '                                     <td></td>';
        //        if (!$("#cbWithoutVAT").prop("checked"))
        //            pTableSummary += '                                     <td></td>';
        //        if (!$("#cbWithoutDiscount").prop("checked"))
        //            pTableSummary += '                                     <td></td>';
        //        pTableSummary += '                                     <td></td>';
        //        pTableSummary += '                                     <td></td>';
        //        pTableSummary += '                                     <td></td>';
        //        pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
        //        pTableSummary += '                                 </tr>';
        //        $("#tblInvoicesReports" + pReportRows[j].ID+" tbody").append(pTableSummary);
        //        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblInvoicesReports" + pReportRows[j].ID, 'Invoices');
        //    }
        //}
    }
    else {
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';

        ReportHTML += ' <div id="Reportbody">';

        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Transport Type :</b> ' + $("#divTransportFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Direction Type :</b> ' + $("#divDirectionFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner Type:</b> ' + $("#slPartnerType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Inv. Type :</b> ' + $("#slInvoiceType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Inv. Status :</b> ' + $("#slInvoiceStatus option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Approval Status :</b> ' + $("#slApprovalStatus option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>VAT Type :</b> ' + ($("#cbWithoutVAT").prop("checked") ? "W/O" : $("#slVATType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>WHT :</b> ' + ($("#cbWithoutDiscount").prop("checked") ? "W/O" : $("#slDiscountType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Inv. Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
                                                                                    ? "All Dates"
                                                                                    : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        ReportHTML += '                     <div>&nbsp;</div>';
        
        for (var j = 0 ; j < pReportRows.length; j++) { //if (pReportRows.length > 0) {
            //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
            
            ReportHTML += '                         <table id="tblInvoicesReports' + pReportRows[j].ID + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            ReportHTML += '                         ' + $("#tblInvoicesReports" + pReportRows[j].ID).html();
            ReportHTML += '                         </table>';
            if ($("#tblInvoicesRep" + pReportRows[j].ID).html() != undefined && pDefaults.UnEditableCompanyName == "GHA") {
                ReportHTML += '                         <table id="tblInvoicesRep' + pReportRows[j].ID + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
                ReportHTML += '                         ' + $("#tblInvoicesRep" + pReportRows[j].ID).html();
                ReportHTML += '                         </table>';

            }
          

        }

        debugger;
        var pAmountWithoutVATSummary = 0;
        var pTaxAmountSummary = 0;
        if (pDefaults.IsTaxOnItems) {
            pAmountWithoutVATSummary = CalculateAmountWithoutVATCurrenciesSummaryFromArray_TaxOnItems(pReportRows);
            pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "VATFromItems", "CurrencyCode");
        }
        else {
            pAmountWithoutVATSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "AmountWithoutVAT", "CurrencyCode");
            pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "TaxAmount", "CurrencyCode");
        }
        if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL AMOUNT W/O VAT :</u> </b> ' + pAmountWithoutVATSummary + '</div>';
        }
        if (!$("#cbWithoutVAT").prop("checked")) {
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL VAT :</u> </b> ' + pTaxAmountSummary + '</div>';
        }
        if (!$("#cbWithoutDiscount").prop("checked")) {
            var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pReportRows);
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL WHT :</u> </b> ' + pDiscountAmountSummary + '</div>';
        }
        var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pReportRows, "Amount", "ExchangeRate");
        var pTotalSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "Amount", "CurrencyCode");
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary + ' =(' + _TotalInDefaultCurrency + ')' + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Paid :</u> </b> ' + _TotalPaid + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Remaining :</u> </b> ' + _TotalRemaining + '</div>';

        ReportHTML += '         </body>';

        ReportHTML += ' </div>'; //ReportHTML += ' <div id="Reportbody">';

        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        if (pOutputTo == "Excel") {
            $("#hExportedTable").html(ReportHTML);
            $("#Reportbody").tblToExcel(pReportTitle);
        }
        else {
            var mywindow = window.open('', '_blank');
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
    }
}
/*****************************Summary Functions**********************************/
function CalculateAmountWithoutVATCurrenciesSummaryFromArray_TaxOnItems(pArray) {
    debugger;
    var temp = {};
    var row = null;
    tempArray = JSON.parse(JSON.stringify(pArray)); //not to change the original Array so i make a copy
    for (var i = 0; i < tempArray.length; i++) {
        row = tempArray[i];
        row.AmountWithoutVAT = (row.Amount - row.VATFromItems + row.DiscountAmount);
        if (!temp[row.CurrencyCode]) {
            temp[row.CurrencyCode] = row;
        } else {
            temp[row.CurrencyCode].AmountWithoutVAT += row.AmountWithoutVAT;
            row.AmountWithoutVAT = 0; //to avoid duplication
            //temp[row.CurrencyCode].PaidAmount += row.PaidAmount;
            //row.PaidAmount = 0; //to avoid duplication
            //temp[row.CurrencyCode].RemainingAmount += row.RemainingAmount;
            //row.RemainingAmount = 0; //to avoid duplication
        }
    }
    var ArrResultTotals = [];
    var pTotalSummary = "";
    for (var prop in temp) {
        ArrResultTotals.push(temp[prop]);
        pTotalSummary += (pTotalSummary == "" ? (temp[prop].AmountWithoutVAT.toFixed(2) + ' ' + prop) : (", " + temp[prop].AmountWithoutVAT.toFixed(2) + " " + prop));
    }
    return pTotalSummary;
}
function CalculateDiscountAmountCurrenciesSummaryFromArray(pArray) {
    debugger;
    var temp = {};
    var row = null;
    tempArray = JSON.parse(JSON.stringify(pArray)); //not to change the original Array so i make a copy
    for (var i = 0; i < tempArray.length; i++) {
        row = tempArray[i];
        if (!temp[row.CurrencyCode]) {
            temp[row.CurrencyCode] = row;
        } else {
            temp[row.CurrencyCode].DiscountAmount += row.DiscountAmount;
            temp[row.CurrencyCode].FixedDiscount += row.FixedDiscount;
            row.DiscountAmount = 0; //to avoid duplication
            row.FixedDiscount = 0; //to avoid duplication
            //temp[row.CurrencyCode].PaidAmount += row.PaidAmount;
            //row.PaidAmount = 0; //to avoid duplication
            //temp[row.CurrencyCode].RemainingAmount += row.RemainingAmount;
            //row.RemainingAmount = 0; //to avoid duplication
        }
    }
    var ArrResultTotals = [];
    var pTotalSummary = "";
    for (var prop in temp) {
        ArrResultTotals.push(temp[prop]);
        pTotalSummary += (pTotalSummary == "" ? ((temp[prop].DiscountAmount + temp[prop].FixedDiscount).toFixed(2) + ' ' + prop) : (", " + (temp[prop].DiscountAmount + temp[prop].FixedDiscount).toFixed(2) + " " + prop));
    }
    return pTotalSummary;
}
/*****************************By Mostafa**************************************/
function SR_Print(pOutputTo) {
    debugger;
    var pWhereClause = InvoicesReports_GetFilterWhereClause();
    pWhereClause = pWhereClause.replace(/'/g, "''");
    pWhereClause = pWhereClause.replace(/\n/g, '');

    var arr_Keys = new Array();
    var arr_Values = new Array();
    let query = "Rep_InvoicesSR '" + pWhereClause + "'";
    arr_Keys.push("dummy");
    arr_Values.push("dummy");

    var pParametersWithValues =
    {
        query: query
        , arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "SR"
        , pReportName: "Rep_InvoicesSR"
        , pReportType: pOutputTo
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
        + '&query=' + pParametersWithValues.query + ''
        + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
        + '&arr_Values=' + pParametersWithValues.arr_Values + ''
        + '&pReportName=' + pParametersWithValues.pReportName + ''
        + '&pReportType=' + pParametersWithValues.pReportType + '';

    win.location = url;
}

function TaxationOfSales_Print(pOutputTo) {
    debugger;
    //if (!(isValidDate($("#txtFromDate").val(), 1) && isValidDate($("#txtToDate").val(), 1))) {
    //    swal('Excuse me', " make sure that date format is dd/MM/yyyy.", 'warning');
    //}
    //else if ($('#slVATType').val() == '0' || $('#slVATType').val() == '') {
    //    swal('Excuse me', "Select VAT", 'warning');
    //    $("#slVATType").addClass('bg-light');
    //    $("#slInvoiceType").addClass('bg-light');
    //    $("#txtFromDate").addClass('bg-light');
    //    $("#txtToDate").addClass('bg-light');
    //}
    //else if ($('#slInvoiceType').val() == '0' || $('#slInvoiceType').val() == '') {
    //    swal('Excuse me', "Select Invoice Type", 'warning');
    //    $("#slVATType").addClass('bg-light');
    //    $("#slInvoiceType").addClass('bg-light');
    //    $("#txtFromDate").addClass('bg-light');
    //    $("#txtToDate").addClass('bg-light');
    //}
    //else
    {
        $("#slInvoiceType").removeClass('bg-light');
        $("#slVATType").removeClass('bg-light');
        $("#txtFromDate").removeClass('bg-light');
        $("#txtToDate").removeClass('bg-light');
        FadePageCover(true);
        var pWhereClause = InvoicesReports_GetFilterWhereClause();
        var pWhereClause_AccNote = InvoicesReports_GetFilterWhereClause_AccNote();
        //if ($('#ulReportTypes .active').val() == 0)
        //    swal(strSorry, "Please, Select a report type.");
        //else {
        var pParametersWithValues = {
            pWhereClauseTaxationOfSales: pWhereClause
            , pWhereClause_AccNote: pWhereClause_AccNote
            //, pDirectionType: ($("#lbl-filter-import").hasClass('active') ? "Import"
            //    : $("#lbl-filter-export").hasClass('active') ? "Export"
            //    : $("#lbl-filter-domestic").hasClass('active') ? "Domestic"
            //    : "ALL")
            //, pTransPortType: ($("#lbl-filter-ocean").hasClass('active') ? "Ocean"
            //    : $("#lbl-filter-air").hasClass('active') ? "Air"
            //    : $("#lbl-filter-inland").hasClass('active') ? "Inland"
            //    : "ALL")
        };
        CallGETFunctionWithParameters("/api/InvoicesReports/LoadData_TaxationOfSales"
            , pParametersWithValues
            , function (data) {
                if (data[0]) { //pRecordsExist
                    TaxationOfSales_DrawReport(data, pOutputTo);
                } else {
                    if (pDefaults.UnEditableCompanyName == "MKH") {
                        debugger;
                        var pWhereClause_AccNote = InvoicesReports_GetFilterWhereClause_AccNote();
                        CallGETFunctionWithParameters("api/AccNote/LoadAll", {
                            pWhereClause: pWhereClause_AccNote + "AND IsDeleted=0 AND NoteType IN (90,100)"
                        }, function (pData) {
                            debugger;
                            let rows = JSON.parse(pData[0]);
                            if (rows.length == 0) {
                                swal(strSorry, "No records are found for that search criteria.");
                                return;
                            } else {
                                TaxationOfSalesAccNotesOnly_DrawReport(rows, "Excel");
                            }
                        }, null, false);
                    } else {
                        swal(strSorry, "No records are found for that search criteria.");
                    }
                    
                }
                FadePageCover(false);
            });
        //}
    }

}
function TaxationOfSales_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    //  var pSummaryTablesHTML = '<table id="tblvwTaxationOfSales" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered" >';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    // pSummaryTablesHTML += JSON.parse(data[2]);
    //   pSummaryTablesHTML += ' </table>'
    var pReportTitle = "الإقرار الضريبي للمبيعات";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    //var _BranchIDs = "";
    //for (var i = 1; i < ($("#slBranch option").length + 1); i++)
    //    _BranchIDs += _BranchIDs == "" ? $("#slBranch option:nth-child(" + (i) + ")").val() : ("," + $("#slBranch option:nth-child(" + (i) + ")").val());
    //var ArrBranchIDs = _BranchIDs.split(",");

    var pTablesHTML = "";
    //   " style="border: solid #000!important; "
    //ReportHTML += '                         <table id="tblvwCRM_ClientsFollowReport" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
    pTablesHTML += '                         <table id="tblvwTaxationOfSales" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered >';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:90%;">';
    if (pDefaults.UnEditableCompanyName == "MKH") {
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">نوع المستند </th>'; /*1*/
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">نوع الضريبة</th>';/*2*/
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">نوع سلع    </th>';/*3*/
    }

    else {
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">نوع المستند (فاتورة 1/ إشعار إضافة 2/إشعار خصم 3)</th>'; /*1*/
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">نوع الضريبة(سلع عامة 1/سلع جدول 2)</th>';/*2*/
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">نوع سلع الجدول (لايوجد 0 / جدول أولا 1 / جدول ثانيا 2)</th>';/*3*/
    }
      
 

    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">رقم الفاتورة</th>';/*4*/
    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal;font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">اسم العميل</th>';/*5*/
    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">رقم التسجيل الضريبي للعميل</th>';/*6*/
    if (pDefaults.UnEditableCompanyName !="MKH")
    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">رقم الملف الضريبي للعميل</th>';/*7*/
    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">العنوان</th>';/*8*/
    if (pDefaults.UnEditableCompanyName == "MKH") {
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">الرقم القومي/ جواز السفر</th>';/*9*/
    }
    else
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">الرقم القومي</th>';/*9*/
    if (pDefaults.UnEditableCompanyName !="MKH")
    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">رقم الموبيل</th>';/*10*/
    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">تاريخ الفاتورة</th>';/*11*/

    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">اسم المنتج</th>';/*12*/
    if (pDefaults.UnEditableCompanyName != "MKH")
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">كود المنتج</th>';/*13*/
    if (pDefaults.UnEditableCompanyName == "MKH") {
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">نوع البيان </th>';/*14*/
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal;font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">نوع السلعة  </th>';/*15*/
    }
    else {
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">نوع البيان (سلعة 3/خدمة 4/تسويات 5)</th>';/*14*/
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal;font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">نوع السلعة (محلي 1/صادرات  2 / آلات ومعدات 5 / أجزاء آلات 6 / إعفاءات 7 / سلع الجدول  مراجعة الإرشادات ) </th>';/*15*/
    }

    if (pDefaults.UnEditableCompanyName !="MKH")
    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal;font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">وحدة قياس المنتج</th>';/*16*/
    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal;font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">سعر الوحدة</th>';/*17*/
    if (pDefaults.UnEditableCompanyName =="MKH")
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">فئة الضريبة </th>';/*18*/
    else
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">فئة الضريبة (14%/5%)</th>';/*18*/
    if (pDefaults.UnEditableCompanyName != "MKH")
    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal;font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">كمية المنتج</th>';/*19*/
    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal;font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">المبلغ الصافي</th>';/*20*/
    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">قيمة الضريبة</th>';/*21*/
    if (pDefaults.UnEditableCompanyName =="MKH")
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">المبلغ الاجمالي</th>';/*22*/
    else
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">إجمالي</th>';/*22*/
    if (pDefaults.UnEditableCompanyName == "COS") {
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal;font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">WHT</th>';/*23*/
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal;font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">House</th>';/*23*/
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal;font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">ReceiptCode</th>';/*24*/
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal;font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">TotalVoucher</th>';/*25*/
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal;font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">ReferenceNo</th>';/*26*/
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal;font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">Diff</th>';/*27*/
    }
    if (pDefaults.UnEditableCompanyName == "FAI") {
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">العملة الأصلية</th>';/*28*/
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">  الإجمالي بالعملة الأصلية </th>';/*29*/
    }

    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    //debugger;
    //$.each(JSON.parse(pReportRows), function (i, item) { debugger; });
    // style = "background-color:Gainsboro;"
    $.each((pReportRows), function (i, item) {

        pTablesHTML += '                                     <tr>';
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.DocumentTypeNO + '</td>'; /*1*/
        pTablesHTML += '                                         <td  dir="LTR"style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.TaxTypeNO + '</td>';/*2*/
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.ItemTypeNO + '</td>';/*3*/
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.InvoiceNumber + '</td>';/*4*/
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.PartnerName.replace(/'/g, "''"); + '</td>';/*5*/
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.VATNumber + '</td>';/*6*/
        if (pDefaults.UnEditableCompanyName !="MKH")
            pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.TaxIdentificationNumber + '</td>';/*7*/
        if (pDefaults.UnEditableCompanyName == "ELC") {
            pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.StreetLine1 + '</td>';/*8*/
        } else {
            pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.Address + '</td>';/*8*/
        }
        
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + '' + '</td>';/*9*/
        if (pDefaults.UnEditableCompanyName !="MKH")
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.CustomerPhone + '</td>';/*10*/
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + GetDateFromServer(item.InvoiceDate) + '</td>';/*11*/
       
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.InvoiceTypeName + '</td>';/*12*/
        if (pDefaults.UnEditableCompanyName != "MKH")
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + '' + '</td>';/*13*/
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.StatementTypeNO + '</td>';/*14*/
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.ItemTypeNO + '</td>';/*15*/
        if (pDefaults.UnEditableCompanyName != "MKH")
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + '' + '</td>';/*16*/
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + (item.AmountWithoutVAT * item.ExchangeRate) + '</td>';/*17*/
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + (item.TaxPercentage).toFixed(0) + '</td>';/*18*/
        if (pDefaults.UnEditableCompanyName !="MKH")
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + '' + '</td>';/*19*/
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + (item.AmountWithoutVAT * item.ExchangeRate) + '</td>';/*20*/
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt; ">' + (item.TaxAmount * item.ExchangeRate) + '</td>';/*21*/
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt;">' + (item.Amount * item.ExchangeRate) + '</td>';/*22*/
        if (pDefaults.UnEditableCompanyName == "COS") {
            pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt;">' + (item.DiscountAmount) + '</td>';/*23*/
            pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt;">' + (item.HouseNumber == 0 ? "" : item.HouseNumber) + '</td>';/*23*/
            pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt;">' + (item.ReceiptCode == 0 ? "" : item.ReceiptCode) + '</td>';/*24*/
            pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt;">' + (item.TotalVoucher == 0 ? "" : item.TotalVoucher) + '</td>';/*25*/
            pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt;">' + (item.ReferenceNo == 0 ? "" : item.ReferenceNo) + '</td>';/*26*/
            pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt;">' + (item.Diff == 0 ? "" : item.Diff) + '</td>';/*27*/
        }
        if (pDefaults.UnEditableCompanyName == "FAI") {
            pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt;">' + (item.CurrencyCode == 0 ? "" : item.CurrencyCode) + '</td>';/*28*/
            pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt;">' + (item.Amount == 0 ? "" : item.Amount) + '</td>';/*29*/
        }
        pTablesHTML += '                                     </tr>';
    });
    if (pDefaults.UnEditableCompanyName == "MKH") {
        debugger;
        var pWhereClause_AccNote = InvoicesReports_GetFilterWhereClause_AccNote();
        CallGETFunctionWithParameters("api/AccNote/LoadAll", {
            pWhereClause: pWhereClause_AccNote + "AND IsDeleted=0 AND NoteType IN (90,100)"
        }, function (pData) {
            debugger;
            let accNotesRows = JSON.parse(pData[0]);
            if (accNotesRows.length == 0) {
                return;
            } else {
                
                accNotesRows.reverse();
                $.each(accNotesRows, function (i, item) {
                    pTablesHTML += '                                     <tr>';
                    pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + (item.NoteTypeName == "Credit" ? 3 : 2) + '</td>';
                    pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + (item.TaxPercentage == 14 ? 1 : 2) + '</td>';
                    pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + (item.TaxPercentage == 14 ? 2 : 1) + '</td>';
                    pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.CodeSerial + '</td>';
                    pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.PartnerName.replace(/'/g, "''"); + '</td>';
                    pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.VATNumber + '</td>';
                    pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.Address + '</td>';
                    pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + '' +'</td>';
                    pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + GetDateFromServer(item.NoteDate) + '</td>';
                    pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.NoteTypeName + ' Note</td>';
                    pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + 4 + '</td>';
                    pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + (item.OperationCode.includes("EXP") ? 2 : 1) + '</td>';
                    pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.AmountWithoutVAT + '</td>';
                    pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.TaxPercentage + '</td>';
                    pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.AmountWithoutVAT + '</td>';
                    pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.TaxAmount + '</td>';
                    pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.Amount + '</td>';

                    pTablesHTML += '                                     </tr>';
                });
            }
        }, null, false);
    }
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        // ReportHTML += '<style> table>thead>th{font-size:11.0pt;color:white;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5;} </style>';
        ReportHTML += '         <div id="Reportbody">';
        ReportHTML += pTablesHTML;
        ReportHTML += '         </div>';
        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

        ReportHTML += '     </footer>';

        ReportHTML += '</html>';

        $("#hExportedTable").html(ReportHTML);

        // $("#Reportbody").tblToExcel(pReportTitle);
        // $("#Reportbody").tblToExcel("Account Ledger");

        $("#Reportbody").table2excel({
            exclude: ".excludeThisClass",
            name: "Sheet 1",
            filename: "الإقرار الضريبي للمبيعات" //do not include extension
        });

    }
    else {
        debugger;
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '         <div id="Reportbody">';
        ReportHTML += pTablesHTML;
        ReportHTML += '         </div>';
        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

        ReportHTML += '     </footer>';
        ReportHTML += '</html>';

        $("#hExportedTable").html(ReportHTML);

        if (pOutputTo == "PrintInReportBody")
            $("#ReportBody").html(ReportHTML);
        else {
            var mywindow = window.open('', '_blank');
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
    }
}
/*****************************EOF By Mostafa**************************************/
function InvoicesReports_SelectColumns() {
    jQuery("#ModalSelectColumns").modal("show");
}
function InvoicesReport_cbAgingPerClientChanged() {
    debugger;
    if ($("#cbAgingPerClient").prop("checked")) {
        $("#cbAgingPerClient_AllCurrency").prop("checked", false);
        $("#cbAgingPerClient_AllCurrency_Minified").prop("checked", false);
    }
}
function InvoicesReport_cbAgingPerClientChanged_AllCurrency() {
    debugger;
    if ($("#cbAgingPerClient_AllCurrency").prop("checked")) {
        $("#cbAgingPerClient").prop("checked", false);
        $("#cbAgingPerClient_AllCurrency_Minified").prop("checked", false);
    }
}
function InvoicesReport_cbAgingPerClientChanged_AllCurrency_Minified() {
    debugger;
    if ($("#cbAgingPerClient_AllCurrency_Minified").prop("checked")) {
        $("#cbAgingPerClient").prop("checked", false);
        $("#cbAgingPerClient_AllCurrency").prop("checked",false);
    }
}





var arr_Values = new Array();

function SendAsEmail() {
    debugger;
    arr_Values = [];
    ReportName = "Invoices Report";

    arr_Values.push($("#txtFromDate").val());
    arr_Values.push($("#txtToDate").val());
    arr_Values.push($("#txtFromDueDate").val());
    arr_Values.push($("#txtToDueDate").val());
    arr_Values.push($('#cbGroupByBranch').prop('checked'));
    arr_Values.push($("#cbIncludeDetails").prop("checked"));
    arr_Values.push($('#cbGroupByBranch').prop('checked'));
    arr_Values.push($("#cbSOA").prop("checked"));
    arr_Values.push($("#cbCustomer").prop("checked"));
    arr_Values.push($("#cbCustomerReference").prop("checked"));
    arr_Values.push($("#cbOperationCode").prop("checked"));
    arr_Values.push($("#cbInvoiceDate").prop("checked"));
    arr_Values.push($("#cbDueDate").prop("checked"));
    arr_Values.push($("#cbWithoutVAT").prop("checked"));
    arr_Values.push($("#cbWithoutDiscount").prop("checked"));
    arr_Values.push($("#cbPaidAmount").prop("checked"));
    arr_Values.push($("#cbRemaining").prop("checked"));
    arr_Values.push($("#cbOperationDate").prop("checked"));
    arr_Values.push($("#cbPaymentDate").prop("checked"));
    arr_Values.push($("#cbDaysDifference").prop("checked"));
    arr_Values.push($("#cbAging").prop("checked"));
    arr_Values.push($("#lbl-filter-import").hasClass('active') == true ? "active" : "InActive");
    arr_Values.push($("#lbl-filter-export").hasClass('active') == true ? "active" : "InActive");
    arr_Values.push($("#lbl-filter-domestic").hasClass('active') == true ? "active" : "InActive");
    arr_Values.push($("#lbl-filter-ocean").hasClass('active') == true ? "active" : "InActive");
    arr_Values.push($("#lbl-filter-air").hasClass('active') == true ? "active" : "InActive");
    arr_Values.push($("#lbl-filter-inland").hasClass('active') == true ? "active" : "InActive");
    arr_Values.push($("#lbl-filter-direct").hasClass('active') == true ? "active" : "InActive");
    arr_Values.push($("#lbl-filter-house").hasClass('active') == true ? "active" : "InActive");
    arr_Values.push($("#lbl-filter-master").hasClass('active') == true ? "active" : "InActive");
    arr_Values.push($("#txtSearchOperation").val());
    arr_Values.push($("#txtCustomerReference").val());
    arr_Values.push($("#txtSearchInvoice").val());
    //document.getElementById("hReadySlBranches").options
    arr_Values.push($("#slPartnerType").val());
    arr_Values.push($("#slPartnerType option:selected").text());
    arr_Values.push($("#slPartner").val());
    arr_Values.push($("#slPartner option:selected").text());
    arr_Values.push($("#slBranch").val());
    arr_Values.push($("#slBranch option:selected").text());
    arr_Values.push($("#slCurrency").val());
    arr_Values.push($("#slCurrency option:selected").text());
    arr_Values.push($("#slApprovalStatus").val());
    arr_Values.push($("#slApprovalStatus option:selected").text());
    arr_Values.push($("#slDiscountType").val());
    arr_Values.push($("#slDiscountType option:selected").text());
    arr_Values.push($("#slVATType").val());
    arr_Values.push($("#slVATType option:selected").text());
    arr_Values.push($("#slInvoiceType").val());
    arr_Values.push($("#slInvoiceType option:selected").text());
    arr_Values.push($("#slInvoiceStatus").val());
    arr_Values.push($("#slInvoiceStatus option:selected").text());


    var pParametersWithValues =
    {
        arr_Values: arr_Values
        , pTitle: "Invoices Report"
        , pReportName: ReportName
    };

    //********************
    //***** For show Link Report Now
    //*********************
    //var win = window.open("", "_blank");
    //var url = '/GlobalReports/ViewInvoiceReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';
    //win.location = url;
    //******

    //********************
    //***** For Send Email
    //*********************
    var url = '/GlobalReports/ViewInvoiceReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';
    SendUrlEmail_General("Invoices Report", $('#txtToEmail').val(), null, $('#btn-Email').attr('BaseUrl') + url, "Invoices Report", null);
    //******


    FadePageCover(false);



}

function SetSelectedColumns(pFlag) {
    debugger;
    $(".classCheckColumn:not(.hide)").prop("checked", pFlag);
}

function TaxationOfSalesAccNotesOnly_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = data.reverse();

    var pReportTitle = "الإقرار الضريبي للمبيعات";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();


    var pTablesHTML = "";

    pTablesHTML += '                         <table id="tblvwTaxationOfSales" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered >';
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:90%;">';
    if (pDefaults.UnEditableCompanyName == "MKH") {
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">نوع المستند </th>'; /*1*/
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">نوع الضريبة</th>';/*2*/
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">نوع سلع    </th>';/*3*/
    }



    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">رقم الفاتورة</th>';/*4*/
    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal;font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">اسم العميل</th>';/*5*/
    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">رقم التسجيل الضريبي للعميل</th>';/*6*/

    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">العنوان</th>';/*8*/
    if (pDefaults.UnEditableCompanyName == "MKH") {
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">الرقم القومي/ جواز السفر</th>';/*9*/
    }

    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">تاريخ الفاتورة</th>';/*11*/

    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">اسم المنتج</th>';/*12*/

    if (pDefaults.UnEditableCompanyName == "MKH") {
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">نوع البيان </th>';/*14*/
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal;font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">نوع السلعة  </th>';/*15*/
    }


    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal;font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">سعر الوحدة</th>';/*17*/
    if (pDefaults.UnEditableCompanyName == "MKH")
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">فئة الضريبة </th>';/*18*/

    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal;font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">المبلغ الصافي</th>';/*20*/
    pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">قيمة الضريبة</th>';/*21*/
    if (pDefaults.UnEditableCompanyName == "MKH")
        pTablesHTML += '                                     <th dir="RTL" style="text-align: right;vertical-align: middle; white-space: normal; font-size:11.0pt;color:black;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5; mso-pattern:#5B9BD5 none;">المبلغ الاجمالي</th>';/*22*/

    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    $.each(pReportRows, function (i, item) {
        pTablesHTML += '                                     <tr>';
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + (item.NoteTypeName == "Credit" ? 3 : 2) + '</td>';
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + (item.TaxPercentage == 14 ? 1 : 2) + '</td>';
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + (item.TaxPercentage == 14 ? 2 : 1) + '</td>';
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.CodeSerial + '</td>';
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.PartnerName.replace(/'/g, "''"); + '</td>';
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.VATNumber + '</td>';
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.Address + '</td>';
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + '' + '</td>';
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + GetDateFromServer(item.NoteDate) + '</td>';
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.NoteTypeName + ' Note</td>';
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + 4 + '</td>';
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + (item.OperationCode.includes("EXP") ? 2 : 1) + '</td>';
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.AmountWithoutVAT + '</td>';
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.TaxPercentage + '</td>';
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.AmountWithoutVAT + '</td>';
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.TaxAmount + '</td>';
        pTablesHTML += '                                         <td dir="LTR" style="text-align: center; font-size:11.0pt;color:black;font-weight:400;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border:.5pt ;">' + item.Amount + '</td>';

        pTablesHTML += '                                     </tr>';
    });
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '         <div id="Reportbody">';
        ReportHTML += pTablesHTML;
        ReportHTML += '         </div>';
        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

        ReportHTML += '     </footer>';

        ReportHTML += '</html>';

        $("#hExportedTable").html(ReportHTML);
        

        $("#Reportbody").table2excel({
            exclude: ".excludeThisClass",
            name: "Sheet 1",
            filename: "الإقرار الضريبي للمبيعات" //do not include extension
        });

    }
}




var AddScripts = '';
AddScripts += '<script src="/Scripts/utilities/jquery-1.10.2.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/mainapp.master.js" type="text/javascript"></script>';

