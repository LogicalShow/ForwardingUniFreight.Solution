
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Reports.Customized;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Helpers;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Data;
using Forwarding.MvcApp.Models.SC.Transactions.Customized;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;

namespace Forwarding.MvcApp.Controllers.Accounting.API_Reports
{
    public class BudgetDetailsReportController : ApiController
    {

        [HttpGet, HttpPost]
        public object[] IntializeData()
        {
            CA_Fiscal_Year objCFiscalYears = new CA_Fiscal_Year();
            CBudgets cBudgets = new CBudgets();

            objCFiscalYears.GetList("where 1 = 1");
            cBudgets.GetList("where 1 = 1");

            return new object[]
            {
                new JavaScriptSerializer().Serialize(objCFiscalYears.lstCVarA_Fiscal_Year),
                 new JavaScriptSerializer().Serialize(cBudgets.lstCVarBudgets),

            };
        }


        [HttpGet, HttpPost]
        public object[] GetPrintedData(string pFiscalYearID, string pBudgetID, string pFromDate, string pToDate,string pBudgetIDList
            ,bool pByMonth,string pMonthIDs)
        {
            Exception checkException = null;


            CGetBudgetsDetailsReport cGetBudgetsDetailsReport = new CGetBudgetsDetailsReport();
            CGetBudgetsDetailsReportByPeriod cCGetBudgetsDetailsReportByPeriod = new CGetBudgetsDetailsReportByPeriod();

            if (pFiscalYearID != "0")
                checkException = cGetBudgetsDetailsReport.GetList(int.Parse(pFiscalYearID), int.Parse(pBudgetID), pByMonth, 
                   ","+ pMonthIDs + ","
                    );
            else
                checkException = cCGetBudgetsDetailsReportByPeriod.GetList(","+ pBudgetIDList + ","
                        , DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    );



            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
                {   ( pFiscalYearID != "0" ? serializer.Serialize(cGetBudgetsDetailsReport.lstCVarGetBudgetsDetailsReport)
                    : serializer.Serialize(cCGetBudgetsDetailsReportByPeriod.lstCVarGetBudgetsDetailsReportByPeriod)) //pDefaultsHeader = pData[0]  
                };
        }














    }
}
