

function Dynamicpost_Initialize() {
    debugger;

    LoadView("/Accounting/Reports/Dynamicpost", "div-content", function () {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Dynamicpost/FillSearchControls"
            , {}
            , function (pData) {
                $("#hl-menu-Accounting").parent().addClass("active");
                $("#hl-menu-Accounting").parent().siblings().removeClass("active");
                var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
                $("#txtFromDate").val(pFormattedTodaysDate);
                $("#txtToDate").val(pFormattedTodaysDate);
                pSafe = pData[0];
                FillListFromObject_ERP(null, 8/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slSafe", pSafe, null);
                FillListFromObject(null, 2, "<--Select-->", "slServices", pData[1], null);
                FillListFromObject(null, 2, "<--Select-->", "slDirections", pData[2], null);
                //FillListFromObject(null, 2, "<--Select-->", "slSalesman", pData[3], null);
                FillListFromObject(null, 2, "<--Select-->", "slInvoiceType", pData[4], null);
                $('#slSafe').select2();
                FadePageCover(false);
            }
            , null);
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        null/*function () { PrintArrivalNotification_ClearAllControls(); }*/,
        null/*function () { PrintArrivalNotification_DeleteList(); }*/);
}
function BalanceSheet_Print(pOutputTo) {
    debugger;

   //

    var ErrorMsg = "";
    if ($('#slSafeTransaction').val() == 0 && $('#slAccrual').val() == 0 && $('#slSafe').val() == 0)
        ErrorMsg = "you must choose accrual or safe  ";
    if (($('#slDirections').val() != '' || $('#slServices').val() != '' || $('#slAccrual').val() != 0) && $('#slSafeTransaction').val() != 0 )
        ErrorMsg = " you choose safe transaction ,( accrual and drirection and service must choose all) ";
    if (($('#slSafeTransaction').val() != 0 || $('#slSafe').val() != 0 ) &&  $('#slAccrual').val() != 0)
        ErrorMsg = " you choose accrual  ,( SafeTransaction and safe  must choose all) ";


    if (ErrorMsg == "")
        BalanceSheet_Draw(0);
    else
        swal("Sorry",ErrorMsg);
 
}


//function BalanceSheet_Draw(pBatchNumber) {

//    var arr_Keys = new Array();
//    var arr_Values = new Array();

//    arr_Keys.push("FromDate");
//    arr_Keys.push("ToDate");
//    arr_Keys.push("JVType_IDs");
//    arr_Keys.push("SafeID");
//    arr_Keys.push("DirectionID");
//    arr_Keys.push("ServiceID");
//    arr_Keys.push("InvoiceTypeID");

//    //--يوميه بنك 5
//    //--اذن  استلام بنك 70
//    //--اذن صرف بنك 80
//    var JVType_IDs = "";
//    if ($('#slAccrual').val() == 1) //Vendor Accrual
//        JVType_IDs += "20"
//    else if ($('#slAccrual').val() == 2)
//        JVType_IDs += "10"
//    else if ($('#slAccrual').val() == 3)
//        JVType_IDs += "90"
//    else if ($('#slAccrual').val() == 4)
//        JVType_IDs += "100"
//    else if ($('#slAccrual').val() == 5)
//        JVType_IDs += "110"
//    else if ($('#slAccrual').val() == 6)
//        JVType_IDs += "50"
//    else if ($('#slAccrual').val() == 7)
//        JVType_IDs += "60"
//    else if ($('#slAccrual').val() == 8)
//        JVType_IDs += "120"



//    if ($('#slSafeTransaction').val() == 10) //Cash In
//        JVType_IDs += "30*70"
//    else if ($('#slSafeTransaction').val() == 20) //Cash Out
//        JVType_IDs += "40*80"


//    if (JVType_IDs == "")
//        JVType_IDs = "-1"


//    var SafeID = "-1";
//    if ($('#slSafe').val() != 0)
//        SafeID = $('#slSafe').val();


//    var DirectionID = "-1";
//    if ($('#slDirections').val() != '')
//        DirectionID = $('#slDirections').val();


//    var ServiceID = "-1";
//    if ($('#slServices').val() != '')
//        ServiceID = $('#slServices').val();

//    var InvoiceTypeID = "-1"
//    if ($('#slInvoiceType').val() != '' && $('#slAccrual').val() == 2)
//        InvoiceTypeID = $('#slInvoiceType').val();

//    arr_Values.push(ConvertDateFormat($("#txtFromDate").val()));
//    arr_Values.push(ConvertDateFormat($("#txtToDate").val()));
//    arr_Values.push(JVType_IDs);
//    arr_Values.push(SafeID);
//    arr_Values.push(DirectionID);
//    arr_Values.push(ServiceID);
//    arr_Values.push(InvoiceTypeID);



//    var pParametersWithValues =
//    {
//        arr_Keys: arr_Keys
//        , arr_Values: arr_Values
//        , pTitle: "JVExcel"
//        , pReportName: "RepA_JVNew"
//    };
//    var win = window.open("", "_blank");
//    var url = '/ReportMainClass/PrintInqueryReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '';

//    win.location = url;
//    FadePageCover(false);
//}

function BalanceSheet_Draw() {
    var fromDate = ConvertDateFormat($("#txtFromDate").val());
    var toDate = ConvertDateFormat($("#txtToDate").val());

    // Prepare JVTypeIds based on selected options
    var jvTypeIds = "";
    switch ($('#slAccrual').val()) {
        case "1": jvTypeIds += "20"; break;
        case "2": jvTypeIds += "10"; break;
        case "3": jvTypeIds += "90"; break;
        case "4": jvTypeIds += "100"; break;
        case "5": jvTypeIds += "110"; break;
        case "6": jvTypeIds += "50"; break;
        case "7": jvTypeIds += "60"; break;
        case "8": jvTypeIds += "120"; break;
    }

    switch ($('#slSafeTransaction').val()) {
        case "10": jvTypeIds += "30,70"; break;
        case "20": jvTypeIds += "40,80"; break;
    }

    // Wrap with commas or fallback to ,-1,
    jvTypeIds = jvTypeIds ? `,${jvTypeIds},` : ",-1,";

    // SafeID
    var safeId = ($('#slSafe').val() && $('#slSafe').val() !== "0") ? `,${$('#slSafe').val()},` : ",-1,";

    // DirectionID
    var directionId = ($('#slDirections').val()) ? `,${$('#slDirections').val()},` : ",-1,";

    // ServiceID
    var serviceId = ($('#slServices').val()) ? `,${$('#slServices').val()},` : ",-1,";

    // InvoiceTypeID
    var invoiceTypeId = ",-1,";
    if ($('#slInvoiceType').val() && $('#slAccrual').val() === "2") {
        invoiceTypeId = `,${$('#slInvoiceType').val()},`;
    }

    var safeTypeId = ",-1,";
    if ($('#slSafeType').val() != "0")
        safeTypeId = `,${$('#slSafeType').val()},`;

    var voucherTypeId = ",-1,";
    if ($('#slVoucherType').val() != "0")
        voucherTypeId = `,${$('#slVoucherType').val()},`;

    // Build query string
    var query = $.param({
        fromDate: fromDate,
        toDate: toDate,
        jvTypeIds: jvTypeIds,
        safeId: safeId,
        directionId: directionId,
        serviceId: serviceId,
        invoiceTypeId: invoiceTypeId,
        safeTypeId: safeTypeId,
        voucherTypeId: voucherTypeId
    });

    var reportUrl = '/reports/RepA_JVNewReport?' + query;

    // Open report in new tab
    var win = window.open(reportUrl, '_blank');
    if (win) {
        win.focus();
    } else {
        alert('Please allow popups for this site.');
    }

    FadePageCover(false);
}


function ChangeAccrual() {
    if ($('#slAccrual').val() == 2) {
        $('#slInvoiceType').removeAttr("disabled", "disabled");
    }
    else {
        $('#slInvoiceType').attr("disabled", true);
        $('#slInvoiceType').val();
    }
}

function Dynamicpost_RegenerateJVs() {

    debugger;
    var ErrorMsg = "";
    if ($('#slSafeTransaction').val() == 0 && $('#slAccrual').val() == 0 && $('#slSafe').val() == 0)
        ErrorMsg = "you must choose accrual or safe  ";
    if (($('#slDirections').val() != '' || $('#slServices').val() != '' || $('#slAccrual').val() != 0) && $('#slSafeTransaction').val() != 0)
        ErrorMsg = " you choose safe transaction ,( accrual and drirection and service must choose all) ";
    if (($('#slSafeTransaction').val() != 0 || $('#slSafe').val() != 0) && $('#slAccrual').val() != 0)
        ErrorMsg = " you choose accrual  ,( SafeTransaction and safe  must choose all) ";

    if (ErrorMsg == "") {

        var fromDate = ConvertDateFormat($("#txtFromDate").val());
        var toDate = ConvertDateFormat($("#txtToDate").val());

        // Prepare JVTypeIds based on selected options
        var jvTypeIds = "";
        switch ($('#slAccrual').val()) {
            case "1": jvTypeIds += "20"; break;
            case "2": jvTypeIds += "10"; break;
            case "3": jvTypeIds += "90"; break;
            case "4": jvTypeIds += "100"; break;
            case "5": jvTypeIds += "110"; break;
            case "6": jvTypeIds += "50"; break;
            case "7": jvTypeIds += "60"; break;
            case "8": jvTypeIds += "120"; break;
        }

        switch ($('#slSafeTransaction').val()) {
            case "10": jvTypeIds += "30,70"; break;
            case "20": jvTypeIds += "40,80"; break;
        }

        // Wrap with commas or fallback to ,-1,
        jvTypeIds = jvTypeIds ? `,${jvTypeIds},` : ",-1,";

        // SafeID
        var safeId = ($('#slSafe').val() && $('#slSafe').val() !== "0") ? `,${$('#slSafe').val()},` : ",-1,";

        // DirectionID
        var directionId = ($('#slDirections').val()) ? `,${$('#slDirections').val()},` : ",-1,";

        // ServiceID
        var serviceId = ($('#slServices').val()) ? `,${$('#slServices').val()},` : ",-1,";

        // InvoiceTypeID
        var invoiceTypeId = ",-1,";
        if ($('#slInvoiceType').val() && $('#slAccrual').val() === "2") {
            invoiceTypeId = `,${$('#slInvoiceType').val()},`;
        }

        var pParametersWithValues = {
            pPromDate: fromDate,
            pToDate: toDate,
            pJvTypeIds: jvTypeIds,
            pSafeId: safeId,
            pDirectionId: directionId,
            pServiceId: serviceId,
            pInvoiceTypeId: invoiceTypeId,
            pJVNo: $('#txtJVNo').val() 

        }

        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Dynamicpost/GetRegenerateJVs"
            , pParametersWithValues
            , function (pData) {
                if (pData[0] != '')
                    swal("Sorry", pData[0]);
                else
                    swal("Success", "Saved successfully.");
                
                FadePageCover(false);
            }
            , null);



    }
    else
        swal("Sorry", ErrorMsg);
}