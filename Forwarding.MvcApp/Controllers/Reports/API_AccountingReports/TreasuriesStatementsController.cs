//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Web.Http;

using Forwarding.MvcApp.Models.OperAcc.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Reports.API_AccountingReports
{
    public class TreasuriesStatementsController : ApiController
    {
        [HttpGet, HttpPost]//pID : is the InvoiceID
        public object[] FillFilter()
        {
            CvwBranches objCvwBranches = new CvwBranches();
            objCvwBranches.GetList(" WHERE 1=1 ORDER BY Name ");

            CvwAccPartners objCvwPartners = new CvwAccPartners();
            objCvwPartners.GetList(" WHERE 1=1 ORDER BY PartnerTypeID, Name ");

            CNoAccessPartnerTypes objCNoAccessPartnerTypes = new CNoAccessPartnerTypes();
            objCNoAccessPartnerTypes.GetList(" WHERE 1=1 ");

            CTreasury objCTreasury = new CTreasury();
            objCTreasury.GetList(" WHERE 1=1 ORDER BY Name ");

            return new object[] { 
                new JavaScriptSerializer().Serialize(objCvwBranches.lstCVarvwBranches)//data[0]
                , new JavaScriptSerializer().Serialize(objCvwPartners.lstCVarvwAccPartners)//data[1]
                , new JavaScriptSerializer().Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes)//data[2]
                , new JavaScriptSerializer().Serialize(objCTreasury.lstCVarTreasury)//data[3]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause, string pWhereClauseOpenBalance, string pWhereClauseEndBalance)
        {
            bool pRecordsExist = false;
            Exception checkException = null;
            int constPRTypeReceivable = 10;
            int constPRTypePayable = 20;

            CvwAccPaymentDetails objCvwTreasuryOpenBalance = new CvwAccPaymentDetails();
            checkException = objCvwTreasuryOpenBalance.GetList(pWhereClauseOpenBalance);
            CvwAccPaymentDetails objCvwAccTreasuryEndBalance = new CvwAccPaymentDetails();
            checkException = objCvwAccTreasuryEndBalance.GetList(pWhereClauseEndBalance);
            #region OpenBalance
            var pSelectedOpenBalance = objCvwTreasuryOpenBalance.lstCVarvwAccPaymentDetails.GroupBy(g => g.CurrencyID)
                            .Select(g => new
                            {
                                //Balance = g.Sum(s => (s.CreditAmount - s.DebitAmount))
                                //Balance = g.Sum(s => (s.CreditAmount - (s.TransactionType != constTransactionReceivableAllocation ? s.DebitAmount : 0)))
                                Balance = g.Sum(s => (s.PRType == constPRTypeReceivable ? s.Amount : (s.Amount * -1)))
                                ,
                                CurrencyCode = g.First().CurrencyCode
                            }).OrderBy(o => o.CurrencyCode);
            pSelectedOpenBalance = pSelectedOpenBalance.OrderBy(o => o.CurrencyCode);
            string pOpenBalance = "0";
            if (pSelectedOpenBalance.Count() > 0)
                if (pSelectedOpenBalance.ElementAt(0).Balance != 0)
                    pOpenBalance = decimal.Round(pSelectedOpenBalance.ElementAt(0).Balance, 3).ToString() + " " + pSelectedOpenBalance.ElementAt(0).CurrencyCode;
            for (int i = 1; i < pSelectedOpenBalance.Count(); i++)
            {
                if (pSelectedOpenBalance.ElementAt(i).Balance != 0)
                    pOpenBalance += " , " + decimal.Round(pSelectedOpenBalance.ElementAt(i).Balance, 3).ToString() + " " + pSelectedOpenBalance.ElementAt(i).CurrencyCode;
            }
            #endregion OpenBalance
            #region EndBalance
            var pSelectedEndBalance = objCvwAccTreasuryEndBalance.lstCVarvwAccPaymentDetails.GroupBy(g => g.CurrencyID)
                                        .Select(g => new
                                        {
                                            //Balance = g.Sum(s => (s.CreditAmount - s.DebitAmount))
                                            //Balance = g.Sum(s => (s.CreditAmount - (s.TransactionType != constTransactionReceivableAllocation ? s.DebitAmount : 0)))
                                            Balance = g.Sum(s => (s.PRType == constPRTypeReceivable ? s.Amount : (s.Amount * -1)))
                                            ,
                                            CurrencyCode = g.First().CurrencyCode
                                        });
            pSelectedEndBalance = pSelectedEndBalance.OrderBy(o => o.CurrencyCode);
            string pEndBalance = "0";
            if (pSelectedEndBalance.Count() > 0)
                if (pSelectedEndBalance.ElementAt(0).Balance != 0)
                    pEndBalance = decimal.Round(pSelectedEndBalance.ElementAt(0).Balance, 3).ToString() + " " + pSelectedEndBalance.ElementAt(0).CurrencyCode;
            for (int i = 1; i < pSelectedEndBalance.Count(); i++)
            {
                if (pSelectedEndBalance.ElementAt(i).Balance != 0)
                    pEndBalance += " , " + decimal.Round(pSelectedEndBalance.ElementAt(i).Balance, 3).ToString() + " " + pSelectedEndBalance.ElementAt(i).CurrencyCode;
            }
            #endregion EndBalance

            CvwAccPaymentDetails objCvwAccPayment = new CvwAccPaymentDetails();
            checkException = objCvwAccPayment.GetList(pWhereClause);

            if (objCvwAccPayment.lstCVarvwAccPaymentDetails.Count > 0 && checkException == null)
                pRecordsExist = true;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                pRecordsExist //pData[0]
                , serializer.Serialize(objCvwAccPayment.lstCVarvwAccPaymentDetails) //pData[1]
                , pOpenBalance //pData[2]
                , pEndBalance //pData[3]
            };
        }
    }
}
