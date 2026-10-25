using Forwarding.MvcApp.Models.OperAcc.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Reports.API_AccountingReports
{
    public class AgingReportsController : ApiController
    {
        //if i need filters then Re-Enable what i need
        [HttpGet, HttpPost]
        public object[] FillFilter()
        {
            //CvwBranches objCvwBranches = new CvwBranches();
            //objCvwBranches.GetList(" WHERE 1=1 ORDER BY Name ");

            //CvwAccPartners objCvwPartners = new CvwAccPartners();
            //objCvwPartners.GetList(" WHERE 1=1 ORDER BY PartnerTypeID, Name ");

            //CNoAccessPartnerTypes objCNoAccessPartnerTypes = new CNoAccessPartnerTypes();
            //objCNoAccessPartnerTypes.GetList(" WHERE 1=1 ");

            //CvwBankAccount objCvwBankAccount = new CvwBankAccount();
            //objCvwBankAccount.GetList(" WHERE 1=1 ORDER BY Name ");

            //return new object[] { 
            //    new JavaScriptSerializer().Serialize(objCvwBranches.lstCVarvwBranches)//data[0]
            //    , new JavaScriptSerializer().Serialize(objCvwPartners.lstCVarvwAccPartners)//data[1]
            //    , new JavaScriptSerializer().Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes)//data[2]
            //    , new JavaScriptSerializer().Serialize(objCvwBankAccount.lstCVarvwBankAccount)//data[2]
            //};
            return new object[] { };
        }

        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause, int pPRType, bool pSeparateCurrencies, bool pIncludeDetails)
        {
            bool pRecordsExist = false;
            Exception checkException = null;
            int _RowCount = 0;
            decimal pTotalLate = 0;
            decimal pTotalZeroTo15 = 0;
            decimal pTotalSixteenTo30 = 0;
            decimal pTotalThirtyOneTo45 = 0;
            decimal pTotalFourtySixTo60 = 0;
            int constPRTypeReceivable = 10;
            int constPRTypePayable = 20;

            CvwAccAgingReceivables objCvwAccAgingReceivables = new CvwAccAgingReceivables();
            CvwAccAgingReceivables_SeparateCurrencies objCvwAccAgingReceivables_SeparateCurrencies = new CvwAccAgingReceivables_SeparateCurrencies();
            CvwAccAgingReceivablesTotal objCvwAccAgingReceivablesTotal = new CvwAccAgingReceivablesTotal();
            CvwAccAgingPayables objCvwAccAgingPayables = new CvwAccAgingPayables();
            CvwAccAgingPayables_SeparateCurrencies objCvwAccAgingPayables_SeparateCurrencies = new CvwAccAgingPayables_SeparateCurrencies();
            CvwAccAgingPayablesTotal objCvwAccAgingPayablesTotal = new CvwAccAgingPayablesTotal();

            if (pPRType == constPRTypeReceivable)
            {
                if (pSeparateCurrencies)
                    checkException = objCvwAccAgingReceivables_SeparateCurrencies.GetListPaging(20000, 1, pWhereClause, "PartnerName", out _RowCount);
                else
                    checkException = objCvwAccAgingReceivables.GetListPaging(20000, 1, pWhereClause, "PartnerName", out _RowCount);
                checkException = objCvwAccAgingReceivablesTotal.GetListPaging(20000, 1, pWhereClause, "TransactionType", out _RowCount);
            }
            else //Payables
            {
                if (pSeparateCurrencies)
                    checkException = objCvwAccAgingPayables_SeparateCurrencies.GetListPaging(20000, 1, pWhereClause, "PartnerName", out _RowCount);
                else
                    checkException = objCvwAccAgingPayables.GetListPaging(20000, 1, pWhereClause, "PartnerName", out _RowCount);
                checkException = objCvwAccAgingPayablesTotal.GetListPaging(20000, 1, pWhereClause, "TransactionType", out _RowCount);
            }
            #region SummaryRowFields
            //pTotalLate = objCvwAccAging.lstCVarvwAccAging.Sum(s => s.Late);
            //pTotalZeroTo15 = objCvwAccAging.lstCVarvwAccAging.Sum(s => s.ZeroTo15);
            //pTotalSixteenTo30 = objCvwAccAging.lstCVarvwAccAging.Sum(s => s.SixteenTo30);
            //pTotalThirtyOneTo45 = objCvwAccAging.lstCVarvwAccAging.Sum(s => s.ThirtyOneTo45);
            //pTotalFourtySixTo60 = objCvwAccAging.lstCVarvwAccAging.Sum(s => s.FourtySixTo60);
            #endregion SummaryRowFields

            if (
                    (objCvwAccAgingReceivables.lstCVarvwAccAgingReceivables.Count > 0 || objCvwAccAgingPayables.lstCVarvwAccAgingPayables.Count > 0
                    || objCvwAccAgingReceivables_SeparateCurrencies.lstCVarvwAccAgingReceivables_SeparateCurrencies.Count > 0 || objCvwAccAgingPayables_SeparateCurrencies.lstCVarvwAccAgingPayables_SeparateCurrencies.Count > 0) 
                    && checkException == null
               )
                pRecordsExist = true;

            #region TotalSummary 
            //var pSelectedTotalSummary = objCvwAccAging.lstCVarvwAccAging.GroupBy(g => g.CurrencyID)
            //                .Select(g => new
            //                {
            //                    //Balance = g.Sum(s => (s.CreditAmount - s.DebitAmount))
            //                    //Balance = g.Sum(s => (s.CreditAmount - (s.TransactionType != constTransactionReceivableAllocation ? s.DebitAmount : 0)))
            //                    Balance = g.Sum(s => (s.PRType == constPRTypeReceivable ? s.Amount : (s.Amount * -1)))
            //                    ,
            //                    CurrencyCode = g.First().CurrencyCode
            //                }).OrderBy(o => o.CurrencyCode);
            //pSelectedTotalSummary = pSelectedTotalSummary.OrderBy(o => o.CurrencyCode);
            //string pTotalSummary = "0";
            //if (pSelectedTotalSummary.Count() > 0)
            //    if (pSelectedTotalSummary.ElementAt(0).Balance != 0)
            //        pTotalSummary = decimal.Round(pSelectedTotalSummary.ElementAt(0).Balance, 3).ToString() + " " + pSelectedTotalSummary.ElementAt(0).CurrencyCode;
            //for (int i = 1; i < pSelectedTotalSummary.Count(); i++)
            //{
            //    if (pSelectedTotalSummary.ElementAt(i).Balance != 0)
            //        pTotalSummary += " , " + decimal.Round(pSelectedTotalSummary.ElementAt(i).Balance, 3).ToString() + " " + pSelectedTotalSummary.ElementAt(i).CurrencyCode;
            //}
            #endregion TotalSummary

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new object[] 
            {
                pRecordsExist
                , pPRType == constPRTypeReceivable 
                    ? (pSeparateCurrencies ? serializer.Serialize(objCvwAccAgingReceivables_SeparateCurrencies.lstCVarvwAccAgingReceivables_SeparateCurrencies) : serializer.Serialize(objCvwAccAgingReceivables.lstCVarvwAccAgingReceivables)) 
                    : (pSeparateCurrencies ? serializer.Serialize(objCvwAccAgingPayables_SeparateCurrencies.lstCVarvwAccAgingPayables_SeparateCurrencies) : serializer.Serialize(objCvwAccAgingPayables.lstCVarvwAccAgingPayables))//data[1]
                , pPRType == constPRTypeReceivable ? serializer.Serialize(objCvwAccAgingReceivablesTotal.lstCVarvwAccAgingReceivablesTotal) : serializer.Serialize(objCvwAccAgingPayablesTotal.lstCVarvwAccAgingPayablesTotal) //data[2]
            };
        }


    }
}
