
function SafesJournalPayment_cbCheckAllSafesChanged() {
    debugger;
    if ($("#cbCheckAllSafes").prop("checked"))
        $("#divCbSafe input[name=nameCbSafe]").prop("checked", true);
    else
        $("#divCbSafe input[name=nameCbSafe]").prop("checked", false);
}
function SafesJournalPayment_cbCheckAllCurrencyChanged() {
    debugger;
    if ($("#cbCheckAllCurrency").prop("checked"))
        $("#divCbCurrency input[name=nameCbCurrency]").prop("checked", true);
    else
        $("#divCbCurrency input[name=nameCbCurrency]").prop("checked", false);
}
function SafesJournalPayment_Print(pOutputTo) {
    debugger;
    var pSafeIDList = GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbSafe");
    var pCurrencyIDList = GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbCurrency");
    if (pSafeIDList == "" || pCurrencyIDList == "")
        swal("Sorry", "Please, select at least one safe and one currency.");
    else {
        FadePageCover(true);

        debugger;
        var arr_Keys = new Array();
        var arr_Values = new Array();
        arr_Keys.push("safeIDs");
        arr_Keys.push("CurrencyIDs");

        arr_Values.push(pSafeIDList);
        arr_Values.push(pCurrencyIDList);


        var pParametersWithValues =
        {
            arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: "Safe Journal Payment"
            , pReportName: pOutputTo == "Print" ? "RepSafeJournal" : "RepSafeJournalExcel"
        };
        var win = window.open("", "_blank");
        var url = '/ReportMainClass/PrintInqueryReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '';

        win.location = url;
        FadePageCover(false);

    }
}

function ExportExcelPaymentOrderReport() {
    debugger;
    FadePageCover(true);
    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("dummy");
    arr_Values.push("dummy");

    var pParametersWithValues =
    {
        query: "select * from vwMescoPaymentOrderReport order by ID desc"
        , arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "Payment Order Report"
        , pReportName: "MescoPaymentOrderReport"
        , pReportType: "Excel"
    };

    var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
        + '&query=' + pParametersWithValues.query + ''
        + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
        + '&arr_Values=' + pParametersWithValues.arr_Values + ''
        + '&pReportName=' + pParametersWithValues.pReportName + ''
        + '&pReportType=' + pParametersWithValues.pReportType + '';

    var win = window.open(url, "_blank");
    win.close;
    if (win) {
        win.addEventListener('beforeunload', function (event) {
            FadePageCover(false);
        });
    }
}

function ExportExcelPaymentRequestReport() {
    debugger;
    FadePageCover(true);
    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("dummy");
    arr_Values.push("dummy");

    var pParametersWithValues =
    {
        query: "select * from vwMescoPaymentRequestReport order by ID desc"
        , arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "Payment Request Report"
        , pReportName: "MescoPaymentRequestReport"
        , pReportType: "Excel"
    };

    var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
        + '&query=' + pParametersWithValues.query + ''
        + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
        + '&arr_Values=' + pParametersWithValues.arr_Values + ''
        + '&pReportName=' + pParametersWithValues.pReportName + ''
        + '&pReportType=' + pParametersWithValues.pReportType + '';

    var win = window.open(url, "_blank");
    win.close;
    if (win) {
        win.addEventListener('beforeunload', function (event) {
            FadePageCover(false);
        });
    }
}
function ExportExcelCashReceiveReport() {
    debugger;
    FadePageCover(true);
    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("dummy");
    arr_Values.push("dummy");

    var pParametersWithValues =
    {
        query: "select * from vwMescoPaymentOrderReport order by ID desc"
        , arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "Cash Receive Report"
        , pReportName: "MescoCashReceiveReport"
        , pReportType: "Excel"
    };

    var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
        + '&query=' + pParametersWithValues.query + ''
        + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
        + '&arr_Values=' + pParametersWithValues.arr_Values + ''
        + '&pReportName=' + pParametersWithValues.pReportName + ''
        + '&pReportType=' + pParametersWithValues.pReportType + '';

    var win = window.open(url, "_blank");
    win.close;
    if (win) {
        win.addEventListener('beforeunload', function (event) {
            FadePageCover(false);
        });
    }
}