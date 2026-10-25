using Forwarding.MvcApp.Models.DashboardGroup.Customized;
using Forwarding.MvcApp.Models.Operations.Operations.Customized;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Reports.API_Statistics
{

    public class CustomersReportController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause, Int32 pRange,Int32 pReportTypeID
           , string pFromDate, string pToDate,int pCustomerID,bool pIsFilterByInvoiceDate )
        {

            string pMessageReturned = "";
            Exception checkException = null;
            int _RowCount = 0;
            // CvwOperationsStatistics objCvwOperationsStatistics = new CvwOperationsStatistics();

            CProfitabilitySummaryByCustomer_FilterByInvoiceDate objCProfitabilitySummaryByCustomer_FilterByInvoiceDate = new CProfitabilitySummaryByCustomer_FilterByInvoiceDate();
            CProfitabilitySummaryByCustomer objCProfitabilitySummaryByCustomer = new CProfitabilitySummaryByCustomer();
            CvwInvoices objCCvwInvoices = new CvwInvoices();
            CProfitabilitySummaryByServiceType objCProfitabilitySummaryByServiceType = new CProfitabilitySummaryByServiceType();

            if (pReportTypeID == 1)
            {
                
                // checkException = objCvwOperationsStatistics.GetListPaging(99999, 1, pWhereClause, "ID", out _RowCount);
                if(pIsFilterByInvoiceDate)
                    checkException = objCProfitabilitySummaryByCustomer_FilterByInvoiceDate.GetList(DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                       , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                       , pCustomerID);
                else
                    checkException = objCProfitabilitySummaryByCustomer.GetList(DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                , pCustomerID);
            
            }
            else if (pReportTypeID == 2 || pReportTypeID == 3)
            {
                checkException = objCCvwInvoices.GetListPaging(99999,1,pWhereClause, "PartnerName", out _RowCount);
            }
            else if (pReportTypeID == 4)
            {
                checkException = objCProfitabilitySummaryByServiceType.GetList( DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
            );
            }



            //var pReportList = objCvwOperationsStatistics.lstCVarvwOperationsStatistics
            //   .GroupBy(g => new { g.ClientName })
            //   .Select(s => new
            //   {
            //       ClientName = s.First().ClientName
            //       ,
            //       OperationsCount = s.Count()
            //       ,
            //       PayablesWithoutVAT = s.Sum(i => i.PayablesWithoutVAT)
            //       ,
            //       ReceivablesWithoutVAT = s.Sum(i => i.ReceivablesWithoutVAT)
            //       ,
            //       Profit = s.Sum(i => i.ReceivablesWithoutVAT) - s.Sum(i => i.PayablesWithoutVAT)
            //   })
            //   .OrderByDescending(o => o.Profit)
            //   .ToList()
            //   .Take(pRange);

            if (checkException != null)
                pMessageReturned = checkException.Message;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                pMessageReturned
                //,serializer.Serialize(pReportList.Take(pRange)) //pData[1]
                ,pIsFilterByInvoiceDate ? serializer.Serialize(objCProfitabilitySummaryByCustomer_FilterByInvoiceDate.lstCVarProfitabilitySummaryByCustomer_FilterByInvoiceDate.Take(pRange)) : serializer.Serialize(objCProfitabilitySummaryByCustomer.lstCVarProfitabilitySummaryByCustomer.Take(pRange))  //pData[1]
                ,serializer.Serialize(objCCvwInvoices.lstCVarvwInvoices) //pData[2]
                ,serializer.Serialize(objCProfitabilitySummaryByServiceType.lstCVarProfitabilitySummaryByServiceType)//pData[3]
            };
        }
    }
}
