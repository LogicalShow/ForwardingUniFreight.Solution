using Forwarding.MvcApp.Models.OperAcc.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Reports.API_AccountingReports
{
    public class ChequesReportsController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] FillFilter()
        {
            CvwBranches objCvwBranches = new CvwBranches();
            objCvwBranches.GetList(" WHERE 1=1 ORDER BY Name ");

            CvwAccPartners objCvwPartners = new CvwAccPartners();
            //objCvwPartners.GetList(" WHERE 1=1 ORDER BY PartnerTypeID, Name ");

            CNoAccessPartnerTypes objCNoAccessPartnerTypes = new CNoAccessPartnerTypes();
            objCNoAccessPartnerTypes.GetList(" WHERE 1=1 ");

            CvwBankAccount objCvwBankAccount = new CvwBankAccount();
            objCvwBankAccount.GetList(" WHERE 1=1 ORDER BY Name ");

            return new object[] { 
                new JavaScriptSerializer().Serialize(objCvwBranches.lstCVarvwBranches)//data[0]
                , new JavaScriptSerializer().Serialize(objCvwPartners.lstCVarvwAccPartners)//data[1]
                , new JavaScriptSerializer().Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes)//data[2]
                , new JavaScriptSerializer().Serialize(objCvwBankAccount.lstCVarvwBankAccount)//data[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] FillPartners(Int32 pPartnerTypeID)
        {
            int _RowCount = 0;
            int constCustomerPartnerTypeID = 1;
            int constAgentPartnerTypeID = 2;
            int constShippingAgentPartnerTypeID = 3;
            int constCustomsClearanceAgentPartnerTypeID = 4;
            int constShippingLinePartnerTypeID = 5;
            int constAirlinePartnerTypeID = 6;
            int constTruckerPartnerTypeID = 7;
            int constSupplierPartnerTypeID = 8;
            int constCustodyPartnerTypeID = 20;

            if (pPartnerTypeID == constCustomerPartnerTypeID)
            {
                CvwCustomersWithMinimalColumns objCCustomers = new CvwCustomersWithMinimalColumns();
                objCCustomers.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCCustomers.lstCVarvwCustomersWithMinimalColumns) };
            }
            else if (pPartnerTypeID == constAgentPartnerTypeID)
            {
                CAgents objCAgents = new CAgents();
                objCAgents.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCAgents.lstCVarAgents) };
            }
            else if (pPartnerTypeID == constShippingAgentPartnerTypeID)
            {

                CShippingAgents objCShippingAgents = new CShippingAgents();
                objCShippingAgents.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCShippingAgents.lstCVarShippingAgents) };
            }
            else if (pPartnerTypeID == constCustomsClearanceAgentPartnerTypeID)
            {
                CCustomsClearanceAgents objCCustomsClearanceAgents = new CCustomsClearanceAgents();
                objCCustomsClearanceAgents.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents) };
            }
            else if (pPartnerTypeID == constShippingLinePartnerTypeID)
            {
                CShippingLines objCShippingLines = new CShippingLines();
                objCShippingLines.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCShippingLines.lstCVarShippingLines) };
            }
            else if (pPartnerTypeID == constAirlinePartnerTypeID)
            {
                CvwAirlinesWithMinimalColumns objCAirlines = new CvwAirlinesWithMinimalColumns();
                objCAirlines.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCAirlines.lstCVarvwAirlinesWithMinimalColumns) };
            }
            else if (pPartnerTypeID == constTruckerPartnerTypeID)
            {
                CTruckers objCTruckers = new CTruckers();
                objCTruckers.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCTruckers.lstCVarTruckers) };
            }
            else if (pPartnerTypeID == constSupplierPartnerTypeID)
            {
                CSuppliers objCSuppliers = new CSuppliers();
                objCSuppliers.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCSuppliers.lstCVarSuppliers) };
            }
            else if (pPartnerTypeID == constCustodyPartnerTypeID)
            {
                CCustody objCCustody = new CCustody();
                objCCustody.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCCustody.lstCVarCustody) };
            }
            return new object[] { };
        }

        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause)
        {
            bool pRecordsExist = false;
            Exception checkException = null;
            int constPRTypeReceivable = 10;
            int constPRTypePayable = 20;

            CvwAccPaymentDetails objCvwAccPayment = new CvwAccPaymentDetails();
            checkException = objCvwAccPayment.GetList(pWhereClause);

            if (objCvwAccPayment.lstCVarvwAccPaymentDetails.Count > 0 && checkException == null)
                pRecordsExist = true;

            #region TotalSummary
            var pSelectedTotalSummary = objCvwAccPayment.lstCVarvwAccPaymentDetails.GroupBy(g => g.CurrencyID)
                            .Select(g => new
                            {
                                //Balance = g.Sum(s => (s.CreditAmount - s.DebitAmount))
                                //Balance = g.Sum(s => (s.CreditAmount - (s.TransactionType != constTransactionReceivableAllocation ? s.DebitAmount : 0)))
                                Balance = g.Sum(s => (s.PRType == constPRTypeReceivable ? s.Amount : (s.Amount * -1)))
                                ,
                                CurrencyCode = g.First().CurrencyCode
                            }).OrderBy(o => o.CurrencyCode);
            pSelectedTotalSummary = pSelectedTotalSummary.OrderBy(o => o.CurrencyCode);
            string pTotalSummary = "0";
            if (pSelectedTotalSummary.Count() > 0)
                if (pSelectedTotalSummary.ElementAt(0).Balance != 0)
                    pTotalSummary = decimal.Round(pSelectedTotalSummary.ElementAt(0).Balance, 3).ToString() + " " + pSelectedTotalSummary.ElementAt(0).CurrencyCode;
            for (int i = 1; i < pSelectedTotalSummary.Count(); i++)
            {
                if (pSelectedTotalSummary.ElementAt(i).Balance != 0)
                    pTotalSummary += " , " + decimal.Round(pSelectedTotalSummary.ElementAt(i).Balance, 3).ToString() + " " + pSelectedTotalSummary.ElementAt(i).CurrencyCode;
            }
            #endregion TotalSummary

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new object[] 
            {
                pRecordsExist
                , serializer.Serialize(objCvwAccPayment.lstCVarvwAccPaymentDetails)
                , pTotalSummary
            };
        }


    }
}
