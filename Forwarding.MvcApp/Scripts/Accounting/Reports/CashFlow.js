
function BalanceSheet_Print(pOutputTo) {
    debugger;
    FadePageCover(true);
    var pParametersWithValues = {
        pFromDate : $("#txtFromDate").val()
        , pToDate: $("#txtToDate").val()
        , pInvoiceDueDate: $("#cbOptionDueDate").prop("checked")
    };
    CallGETFunctionWithParameters("/api/CashFlowReport/GetPrintedData", pParametersWithValues
        , function (pData) {
            CashFlow_Draw(pData, pOutputTo);
        }
        , null);
}

function CashFlow_Draw(pData, pOutputTo) {
    debugger;

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pIncomeStatement = JSON.parse(pData[1]);

    var BySummary = $("#cbBySummary").prop("checked");

    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();

    var pTableHTML = "";

    var arr_Cur = [];
    var arr_Type = [];
    var arr_ID = [];

    var arr_m_total = new Array();

    arr_Cur.push("EGP", "USD", "EUR", "GBP");

    pIncomeStatement.reduce(function (a, d) {
        return arr_Cur;
        if (a.indexOf(d.CurrencyCode) === -1) {
            arr_Cur.push(d.CurrencyCode);

        }
        return arr_Cur;
    }, []);


    pIncomeStatement.reduce(function (a, d) {
        if (a.indexOf(d.Name) === -1) {
            arr_Type.push(d.Name );
            arr_ID.push( d.CashFlowID);
        }
        return arr_Type;
    }, []);



    for (var i = 0; i < arr_Cur.length; i++) {
        for (var j = 0; j < arr_ID.length; j++) {
            arr_m_total.push({ "CurrencyCode": arr_Cur[i], "Total": 0, "TypeID": arr_ID[j] });
        }       
    }


    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        pTableHTML += '             <table id="tblIncomeStatement" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        pTableHTML += '                 <thead class="" style="">'
        pTableHTML += '                     <tr class="" style="">';
        pTableHTML += '                         <th class="">' + 'Group' + '</th>';
        pTableHTML += '                         <th class="">' + 'Account' + '</th>';
        for (var i = 0; i < arr_Cur.length; i++) {
            pTableHTML += '                     <th class="">' + arr_Cur[i] + '</th>';
        }
        pTableHTML += '                     </tr>'
        pTableHTML += '                 </thead>';
        pTableHTML += '                 <tbody>';
        if (pIncomeStatement != null) {
            /*****************************************************************/
            for (var k = 0; k < arr_Type.length; k++) {
                if (!$("#cbOnlyTreasuryAndBanks").prop("checked") || k < 4 ) {
            /*******************************Group Header**********************************/
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                         <th class="">' + arr_Type[k] + '</th>';
                pTableHTML += '                         <th class="">' + '' + '</th>';
                for (var i = 0; i < arr_Cur.length; i++) {
                    pTableHTML += '                         <th class="">' + '' + '</th>';
                }
                pTableHTML += '                 </tr>';
                /*******************************Group Account Details**********************************/
                var arrAccounts = [];
                pIncomeStatement.filter(f => f.Name == arr_Type[k]).reduce(function (a, d) {
                    if (a.indexOf(d.Account_Name) === -1) {
                        arrAccounts.push(d.Account_Name);
                    }
                    return arrAccounts;
                }, []);

                for (var j = 0; j < arrAccounts.length; j++) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                         <th class="">' + '' + '</th>';
                    pTableHTML += '                         <th class="">' + arrAccounts[j] + '</th>';
                    for (var h = 0; h < arr_Cur.length; h++) {
                        var RowsAccountValue = pIncomeStatement.filter(f => f.Name == arr_Type[k] && f.Account_Name == arrAccounts[j] && f.CurrencyCode == arr_Cur[h]);
                        if (RowsAccountValue.length > 0) {
                            pTableHTML += '                     <th class="">' + RowsAccountValue[0].Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</th>';
                            arr_m_total.find(x => x.TypeID == arr_ID[k] && x.CurrencyCode == arr_Cur[h]).Total += RowsAccountValue[0].Balance;
                        }
                        else
                            pTableHTML += '                     <th class="">' + '-' + '</th>';

                    }
 
                }
                pTableHTML += '                 </tr>';
              /******************Group Total***********************************************/
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                         <th class="">' + '' + '</th>';
                pTableHTML += '                         <th  class="">' + 'Total ' + arr_Type[k] + ' :' + '</th>';
                for (var f = 0; f < arr_Cur.length; f++) {
                    pTableHTML += '                         <th class="">'
                        + arr_m_total.find(x => x.TypeID == arr_ID[k] && x.CurrencyCode == arr_Cur[f]).Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        + '</th>';
                     
                }
                pTableHTML += '                 </tr>';

                 if (arr_ID[k] == "7" && !$("#cbOptionDueDate").prop("checked"))
                {
                    pTableHTML += '                 <tr class=""  style="font-size:95%;">';
                    pTableHTML += '                         <th colspan="2" style="text-align:center;" class="">' + 'Total Cash Available In Treasury and Bank Accounts : ' + '</th>';
                     for (var n = 0; n < arr_Cur.length; n++) {
                         const matchingElements = arr_m_total.filter(x => x.TypeID === "6" && x.CurrencyCode === arr_Cur[n]);
                        var Total = arr_m_total.find(x => x.TypeID == "4" && x.CurrencyCode == arr_Cur[n]).Total
                            + arr_m_total.find(x => x.TypeID == "5" && x.CurrencyCode == arr_Cur[n]).Total
                            + (matchingElements.length > 0 ? arr_m_total.find(x => x.TypeID == "6" && x.CurrencyCode == arr_Cur[n]).Total : 0)
                            + arr_m_total.find(x => x.TypeID == "7" && x.CurrencyCode == arr_Cur[n]).Total;

                        pTableHTML += '                         <th class="">' + Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</th>';
                    }
                    pTableHTML += '                 </tr>';
                }
                 if (arr_ID[k] == "9" && !$("#cbOptionDueDate").prop("checked")) {
                    pTableHTML += '                 <tr class=""  style="font-size:95%;">';
                    pTableHTML += '                         <th colspan="2" style="text-align:center;" class="">' + 'Total Cash Available In Treasury and Bank Accounts & Cheques : ' + '</th>';
                     for (var n = 0; n < arr_Cur.length; n++) {
                         const matchingElements = arr_m_total.filter(x => x.TypeID === "6" && x.CurrencyCode === arr_Cur[n]);
                        var Total2 = arr_m_total.find(x => x.TypeID == "4" && x.CurrencyCode == arr_Cur[n]).Total
                            + arr_m_total.find(x => x.TypeID == "5" && x.CurrencyCode == arr_Cur[n]).Total
                            + (matchingElements.length > 0 ? arr_m_total.find(x => x.TypeID == "6" && x.CurrencyCode == arr_Cur[n]).Total : 0)
                            + arr_m_total.find(x => x.TypeID == "7" && x.CurrencyCode == arr_Cur[n]).Total
                            + arr_m_total.find(x => x.TypeID == "8" && x.CurrencyCode == arr_Cur[n]).Total
                            + arr_m_total.find(x => x.TypeID == "9" && x.CurrencyCode == arr_Cur[n]).Total
                            + arr_m_total.find(x => x.TypeID == "10" && x.CurrencyCode == arr_Cur[n]).Total;

                        pTableHTML += '                         <th class="">' + Total2.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</th>';
                    }
                    pTableHTML += '                 </tr>';
                }
                 if (arr_ID[k] == "11" && !$("#cbOptionDueDate").prop("checked")) {
                    debugger;
                    pTableHTML += '                 <tr class=""  style="font-size:95%;">';
                    pTableHTML += '                         <th colspan="2" style="text-align:center;" class="">' + 'Net Cash Available : ' + '</th>';
                     for (var n = 0; n < arr_Cur.length; n++) {
                         const matchingElements4 = arr_m_total.filter(x => x.TypeID === "4" && x.CurrencyCode === arr_Cur[n]);
                         const matchingElements5 = arr_m_total.filter(x => x.TypeID === "5" && x.CurrencyCode === arr_Cur[n]);
                         const matchingElements6 = arr_m_total.filter(x => x.TypeID === "6" && x.CurrencyCode === arr_Cur[n]);
                         const matchingElements7 = arr_m_total.filter(x => x.TypeID === "7" && x.CurrencyCode === arr_Cur[n]);
                         const matchingElements8 = arr_m_total.filter(x => x.TypeID === "8" && x.CurrencyCode === arr_Cur[n]);
                         const matchingElements9 = arr_m_total.filter(x => x.TypeID === "9" && x.CurrencyCode === arr_Cur[n]);
                         const matchingElements10 = arr_m_total.filter(x => x.TypeID === "10" && x.CurrencyCode === arr_Cur[n]);
                         const matchingElements11 = arr_m_total.filter(x => x.TypeID === "11" && x.CurrencyCode === arr_Cur[n]);

                         var Total3 =
                              (matchingElements4.length > 0 ? arr_m_total.find(x => x.TypeID == "4" && x.CurrencyCode == arr_Cur[n]).Total : 0)
                            +  (matchingElements5.length > 0 ? arr_m_total.find(x => x.TypeID == "5" && x.CurrencyCode == arr_Cur[n]).Total : 0)
                            + (matchingElements6.length > 0 ? arr_m_total.find(x => x.TypeID == "6" && x.CurrencyCode == arr_Cur[n]).Total : 0)
                             + (matchingElements7.length > 0 ? arr_m_total.find(x => x.TypeID == "7" && x.CurrencyCode == arr_Cur[n]).Total : 0)
                             + (matchingElements8.length > 0 ? arr_m_total.find(x => x.TypeID == "8" && x.CurrencyCode == arr_Cur[n]).Total : 0)
                             + (matchingElements9.length > 0 ? arr_m_total.find(x => x.TypeID == "9" && x.CurrencyCode == arr_Cur[n]).Total : 0)
                             + (matchingElements10.length > 0 ? arr_m_total.find(x => x.TypeID == "10" && x.CurrencyCode == arr_Cur[n]).Total : 0)
                             - (matchingElements11.length > 0 ? arr_m_total.find(x => x.TypeID == "11" && x.CurrencyCode == arr_Cur[n]).Total : 0);

                        pTableHTML += '                         <th class="">' + Total3.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</th>';
                    }
                    pTableHTML += '                 </tr>';
                }
            }
           }

          }
            /*************************EOF Flag1 : BusinessRevenue****************************************/

            /*************************EOF Flag2 : Total Gross Profit****************************************/
            //pTableHTML += '                 <tr class="" style="font-size:95%;">';
            //pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total Gross Profit' + '</b></td>';
            //var pFlag1Total_M = 0;
            //var pFlag2Total_M = 0;
            //for (var i = 0; i < arr.length; i++) {
            //    pFlag1Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag1Total').Total
            //    pFlag2Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag2Total').Total
            //    pTableHTML += '                     <td class="" style="">' + (pFlag1Total_M - pFlag2Total_M).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            //}
            //pTableHTML += '                     <td class="" style=""><b>' + (pFlag1Total - pFlag2Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            //pTableHTML += '                 </tr>';
                
           
            ///*************************Flag6 : Earnings Before Tax (EBT) ****************************************/
            //Total Cost of Sales
            //Dedcut
            //Total General And Administrative Ex
            //Add
            //Total Other Income 
            // Add
            // CREDIT INTEREST - فوائد بنكية

            //(pFlag2Total - pFlag3Total) + pFlag4Total +pFlag5Total
            //pTableHTML += '                 <tr class="" style="font-size:95%;">';
            //pTableHTML += '                     <td class="" style="text-align:left;"><b>' + 'Earnings Before Tax (EBT) ' + '</b></td>';
            //var pFlag2Total_M = 0;
            //var pFlag3Total_M = 0;
            //var pFlag4Total_M = 0;
            //var pFlag5Total_M = 0;
            //for (var i = 0; i < arr.length; i++) {
            //    // pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            //    pFlag2Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag2Total').Total
            //    pFlag3Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag3Total').Total
            //    pFlag4Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag4Total').Total
            //    pFlag5Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag5Total').Total
            //    pTableHTML += '                     <td class="" style="">' + ((pFlag2Total_M - pFlag3Total_M) + pFlag4Total_M + pFlag5Total_M).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            //}
            //pTableHTML += '                     <td class="" style=""><b>' + ((pFlag2Total - pFlag3Total) + pFlag4Total + pFlag5Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            //pTableHTML += '                 </tr>';
           
        pTableHTML += '                 </tbody>';
        pTableHTML += '             </table>';

        $("#hExportedTable").html(pTableHTML);

        //Totals row
        var pRowTotalsHTML = "";
        $("#tblIncomeStatement tbody").append(pRowTotalsHTML);
    }

    if (pOutputTo == "Excel") {
        //  ExportHtmlTableToCsv_RemovingCommasForNumbers("tblIncomeStatement");
        ReportHTML = "";
        ReportHTML += '<html dir="rtl">';

        ReportHTML += '     <head><title>' + '' + '</title></head>';
        ReportHTML += '         <body">';
        ReportHTML += '         <div id="ReportBody">';

        ReportHTML += '                     <table id="tblHeaderDate' + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
        ReportHTML += '             ' + $("#tblIncomeStatement").html();
        ReportHTML += '                     </table>';

        $("#hExportedTable").html(ReportHTML);

        var $table = $("#ReportBody");
        $table.table2excel({
            exclude: ".noExl",
            name: "sheet",
            filename: "IncomeStatement" + ".xls", // do include extension
            preserveColors: false // set to true if you want background colors and font colors preserved
        });
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            ReportHTML += '<html>';
            //ReportHTML += '     <head><title>' + 'Income Statement' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '     <head>';
            ReportHTML += '</head>';
            ReportHTML += '     <head><title>' + 'Income Statement' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';

            ReportHTML += '</head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '<div id="hExportedTable" class="hide"></div>';
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Income Statement</u></b>' + '</div>';
            ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += '             <table id="tblIncomeStatement' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblIncomeStatement").html();
            ReportHTML += '             </table>';

            //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pIncomeStatement.length + '</div>';

            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';
        }
        else {
            ReportHTML += '<html dir="rtl">';
            ReportHTML += '     <head><title>' + 'قائمة الدخل' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>قائمة الدخل</u></b>' + '</div>';
            ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
            ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
            ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
            ReportHTML += '             </div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += '             <table id="tblIncomeStatement' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblIncomeStatement").html();
            ReportHTML += '             </table>';

            //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pIncomeStatement.length + '</div>';

            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';
        }

        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
    FadePageCover(false);

}


function CashFlow_Draw_OLD(pData, pOutputTo) {
    debugger;
    var pDefaultsHeader = JSON.parse(pData[0]);
    var pCashFlow = JSON.parse(pData[1]);
    var pCashFlowGroups = JSON.parse(pData[2]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
    var pTableHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
    pTableHTML += '             <table id="tblCashFlow" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
    pTableHTML += '                 <thead class="" style="">'
    pTableHTML += '                     <tr class="" style="">';
    pTableHTML += '                         <th class="">' + 'Account' + '</th>';
    pTableHTML += '                         <th class="">' + 'Balance' + '</thb>';
    pTableHTML += '                     </tr>'     
    pTableHTML += '                 </thead>';
    pTableHTML += '                 <tbody>';
    if (pCashFlow != null)
    {
        var tabs = "&emsp;&emsp;&emsp;&emsp;&emsp;";
        var Total = 0.00;

        $.each(pCashFlowGroups, function (i, item) {
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            pTableHTML += '                     <td class="" style="text-align:left;">' + (pOutputTo != "Excel" ? "" : "") + (pOutputTo != "Excel" ? ('<b>' + item.Name + '</b>') : item.Name) + '</td>';
            pTableHTML += '                     <td class="Balance" style="text-align:left;">' + "" + '</td>';
            pTableHTML += '                 </tr>';
            var CurrenctCashFlowGroups = pCashFlow.filter(x=> x.ParentGroupID == item.ID);
            Total = 0;
            $.each(CurrenctCashFlowGroups, function (k, account) {
                Total += account.Balance;
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:left;">' + (pOutputTo != "Excel" ? "" : "") + ( account.GroupName) + '</td>';
                pTableHTML += '                     <td class="Balance" style="text-align:left;">' + account.Balance + '</td>';
                pTableHTML += '                 </tr>';
            });
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            pTableHTML += '                     <td class="" style="text-align:left;">' + (pOutputTo != "Excel" ? "" : "") + (pOutputTo != "Excel" ? ('<b>' + item.Name.replace('التدفقات','صافى') + '</b>') : item.Name) + '</td>';
            pTableHTML += '                     <td class="GroupBalance" style="text-align:left;">' + (pOutputTo != "Excel" ? tabs : "") + Total + '</td>';
            pTableHTML += '                 </tr>';

        });



    }
    //$.each(pCashFlow, function (i, item) {
    //    if (!($("#cbSuppressForZeroes").prop("checked") && item.Balance == 0)) {
    //        var tabs = "";
    //        for (var y = 1; y < item.AccLevel ; y++)
    //            tabs += "&emsp;&emsp;";
    //        pTableHTML += '                 <tr class="" style="font-size:95%;">';
    //        pTableHTML += '                     <td class="" style="text-align:left;">' + (pOutputTo != "Excel" ? tabs : "") + (item.IsMain && pOutputTo != "Excel" ? ('<b>' + item.Account_Name + '</b>') : item.Account_Name) + '</td>';
    //        pTableHTML += '                     <td class="FinalBalance" style="text-align:left;">' + (pOutputTo != "Excel" ? tabs : "") + (item.FinalBalance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
    //        //the columns after here are not shown in Excel coz the header is only 2 columns
    //        //pTableHTML += '                     <td class="ProfitAndLoss hide" style="text-align:center;">' + (item.Account_ID == 1 || item.Account_ID == 2 ? item.FinalBalance : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
    //        pTableHTML += '                     <td class="ProfitAndLoss hide" style="text-align:center;">' + (item.Account_ID == 1 ? Math.abs(item.FinalBalance) : (item.Account_ID == 2 ? (-1 * Math.abs(item.FinalBalance)) : 0)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
    //        pTableHTML += '                 </tr>';
    //    }
    //});
    pTableHTML += '                 </tbody>';
    pTableHTML += '             </table>';

    $("#hExportedTable").html(pTableHTML);
    debugger;
    //Totals row
    var pRowTotalsHTML = "";
    //var ProfitAndLossTotal = GetColumnSum("tblCashFlow", "ProfitAndLoss");
    //pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
    //pRowTotalsHTML += '                             <td class="" style="text-align:center;"><b><u>' + 'Profit & Loss :</u> ' + ProfitAndLossTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    //pRowTotalsHTML += '                             <td class="" style="text-align:left;"><b><u>' + '' + '</td>';
    //pRowTotalsHTML += '                         </tr>';

    var tabs = "&emsp;&emsp;&emsp;&emsp;&emsp;";
    var TotalCash = GetColumnSum("tblCashFlow", "GroupBalance");
    // var OpeningCashFlowGroup = pCashFlow.filter(x=> x.ParentGroupID == 4);
    var OpeningCashFlowGroup = pCashFlow.find(x=> x.ParentGroupID == 4).Balance;
    pRowTotalsHTML += '                 <tr class="" style="font-size:95%;">';
    pRowTotalsHTML += '                     <td class="" style="text-align:left;">'  + ("صافى النقدية وما فى حكمها") + '</td>';
    pRowTotalsHTML += '                     <td class="Balance" style="text-align:left;">' + (pOutputTo != "Excel" ? tabs : "") + TotalCash.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
    pRowTotalsHTML += '                 </tr>';

    pRowTotalsHTML += '                 <tr class="" style="font-size:95%;">';
    pRowTotalsHTML += '                     <td class="" style="text-align:left;">'  + ("النقدية وما فى حكمها فى بداية الفترة") + '</td>';
    pRowTotalsHTML += '                     <td class="Balance" style="text-align:left;">' + (pOutputTo != "Excel" ? tabs : "") + OpeningCashFlowGroup + '</td>';
    pRowTotalsHTML += '                 </tr>';

    pRowTotalsHTML += '                 <tr class="" style="font-size:95%;">';
    pRowTotalsHTML += '                     <td class="" style="text-align:left;">'  + ("النقدية وما فى حكمها فى نهاية الفترة") + '</td>';
    pRowTotalsHTML += '                     <td class="Balance" style="text-align:left;">' + (pOutputTo != "Excel" ? tabs : "") + (OpeningCashFlowGroup + TotalCash) + '</td>';
    pRowTotalsHTML += '                 </tr>';

    $("#tblCashFlow tbody").append(pRowTotalsHTML);
}
else {
        pTableHTML += '             <table id="tblCashFlow" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
pTableHTML += '                 <thead class="" style="">'
pTableHTML += '                     <tr class="" style="">';
pTableHTML += '                         <th class="">' + 'الحساب' + '</th>';
pTableHTML += '                         <th class="">' + 'الرصيد' + '</thb>';
pTableHTML += '                     </tr>'     
pTableHTML += '                 </thead>';
pTableHTML += '                 <tbody>';
if (pCashFlow != null)
{
    var tabs = "&emsp;&emsp;&emsp;&emsp;&emsp;";
    var Total = 0.00;

    $.each(pCashFlowGroups, function (i, item) {
        pTableHTML += '                 <tr class="" style="font-size:95%;">';
        pTableHTML += '                     <td class="" style="text-align:right;">' + (pOutputTo != "Excel" ? "" : "") + (pOutputTo != "Excel" ? ('<b>' + item.Name + '</b>') : item.Name) + '</td>';
        pTableHTML += '                     <td class="Balance" style="text-align:right;">' + "" + '</td>';
        pTableHTML += '                 </tr>';
        var CurrenctCashFlowGroups = pCashFlow.filter(x=> x.ParentGroupID == item.ID);
        Total = 0;
        $.each(CurrenctCashFlowGroups, function (k, account) {
            Total += account.Balance;
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            pTableHTML += '                     <td class="" style="text-align:right;">' + (pOutputTo != "Excel" ? "" : "") + (account.GroupName) + '</td>';
            pTableHTML += '                     <td class="Balance" style="text-align:right;">' + account.Balance + '</td>';
            pTableHTML += '                 </tr>';
        });
        pTableHTML += '                 <tr class="" style="font-size:95%;">';
        pTableHTML += '                     <td class="" style="text-align:right;">' + (pOutputTo != "Excel" ? "" : "") + (pOutputTo != "Excel" ? ('<b>' + item.Name.replace('التدفقات', 'صافى') + '</b>') : item.Name) + '</td>';
        pTableHTML += '                     <td class="GroupBalance" style="text-align:right;">' + (pOutputTo != "Excel" ? tabs : "") + Total + '</td>';
        pTableHTML += '                 </tr>';

    });



}
//$.each(pCashFlow, function (i, item) {
//    if (!($("#cbSuppressForZeroes").prop("checked") && item.Balance == 0)) {
//        var tabs = "";
//        for (var y = 1; y < item.AccLevel ; y++)
//            tabs += "&emsp;&emsp;";
//        pTableHTML += '                 <tr class="" style="font-size:95%;">';
//        pTableHTML += '                     <td class="" style="text-align:left;">' + (pOutputTo != "Excel" ? tabs : "") + (item.IsMain && pOutputTo != "Excel" ? ('<b>' + item.Account_Name + '</b>') : item.Account_Name) + '</td>';
//        pTableHTML += '                     <td class="FinalBalance" style="text-align:left;">' + (pOutputTo != "Excel" ? tabs : "") + (item.FinalBalance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
//        //the columns after here are not shown in Excel coz the header is only 2 columns
//        //pTableHTML += '                     <td class="ProfitAndLoss hide" style="text-align:center;">' + (item.Account_ID == 1 || item.Account_ID == 2 ? item.FinalBalance : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
//        pTableHTML += '                     <td class="ProfitAndLoss hide" style="text-align:center;">' + (item.Account_ID == 1 ? Math.abs(item.FinalBalance) : (item.Account_ID == 2 ? (-1 * Math.abs(item.FinalBalance)) : 0)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
//        pTableHTML += '                 </tr>';
//    }
//});
pTableHTML += '                 </tbody>';
pTableHTML += '             </table>';

$("#hExportedTable").html(pTableHTML);
debugger;
//Totals row
var pRowTotalsHTML = "";
//var ProfitAndLossTotal = GetColumnSum("tblCashFlow", "ProfitAndLoss");
//pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
//pRowTotalsHTML += '                             <td class="" style="text-align:center;"><b><u>' + 'Profit & Loss :</u> ' + ProfitAndLossTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
//pRowTotalsHTML += '                             <td class="" style="text-align:left;"><b><u>' + '' + '</td>';
//pRowTotalsHTML += '                         </tr>';

var tabs = "&emsp;&emsp;&emsp;&emsp;&emsp;";
var TotalCash = GetColumnSum("tblCashFlow", "GroupBalance");
// var OpeningCashFlowGroup = pCashFlow.filter(x=> x.ParentGroupID == 4);
var OpeningCashFlowGroup = pCashFlow.find(x=> x.ParentGroupID == 4).Balance;
pRowTotalsHTML += '                 <tr class="" style="font-size:95%;">';
pRowTotalsHTML += '                     <td class="" style="text-align:right;">' + ("صافى النقدية وما فى حكمها") + '</td>';
pRowTotalsHTML += '                     <td class="Balance" style="text-align:right;">' + (pOutputTo != "Excel" ? tabs : "") + TotalCash.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
pRowTotalsHTML += '                 </tr>';

pRowTotalsHTML += '                 <tr class="" style="font-size:95%;">';
pRowTotalsHTML += '                     <td class="" style="text-align:right;">' + ("النقدية وما فى حكمها فى بداية الفترة") + '</td>';
pRowTotalsHTML += '                     <td class="Balance" style="text-align:right;">' + (pOutputTo != "Excel" ? tabs : "") + OpeningCashFlowGroup + '</td>';
pRowTotalsHTML += '                 </tr>';

pRowTotalsHTML += '                 <tr class="" style="font-size:95%;">';
pRowTotalsHTML += '                     <td class="" style="text-align:right;">' + ("النقدية وما فى حكمها فى نهاية الفترة") + '</td>';
pRowTotalsHTML += '                     <td class="Balance" style="text-align:right;">' + (pOutputTo != "Excel" ? tabs : "") + (OpeningCashFlowGroup + TotalCash) + '</td>';
pRowTotalsHTML += '                 </tr>';

$("#tblCashFlow tbody").append(pRowTotalsHTML);
}

if (pOutputTo == "Excel") {
    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblCashFlow");
}
else {
    var mywindow = window.open('', '_blank');
    var ReportHTML = '';
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Cash Flow' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Cash Flow</u></b>' + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-9 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

        //ReportHTML += pTablesHTML; //Add table html in the next lines
        ReportHTML += '             <table id="tblCashFlow' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        ReportHTML += '             ' + $("#tblCashFlow").html();
        ReportHTML += '             </table>';

        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pBalanceSheet.length + '</div>';

        ReportHTML += '         <body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';
    }
    else {
        ReportHTML += '<html dir="rtl">';
        ReportHTML += '     <head><title>' + 'التدفق النقدي' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>التدفق النقدي</u></b>' + '</div>';
        ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
        ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
        ReportHTML += '             </div>';
        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

        //ReportHTML += pTablesHTML; //Add table html in the next lines
        ReportHTML += '             <table id="tblCashFlow' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        ReportHTML += '             ' + $("#tblCashFlow").html();
        ReportHTML += '             </table>';

        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pBalanceSheet.length + '</div>';

        ReportHTML += '         <body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';
    }

        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }

    FadePageCover(false);
}
