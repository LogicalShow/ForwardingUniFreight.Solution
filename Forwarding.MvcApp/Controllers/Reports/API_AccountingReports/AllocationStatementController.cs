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
    public class AllocationStatementController : ApiController
    {
        [HttpGet, HttpPost]//pID : is the InvoiceID
        public object[] FillFilter()
        {
            CvwBranches objCvwBranches = new CvwBranches();
            objCvwBranches.GetList(" WHERE 1=1 ORDER BY Name ");

            CvwAccPartners objCvwPartners = new CvwAccPartners();
            //objCvwPartners.GetList(" WHERE 1=1 ORDER BY PartnerTypeID, Name ");

            CNoAccessPartnerTypes objCNoAccessPartnerTypes = new CNoAccessPartnerTypes();
            objCNoAccessPartnerTypes.GetList(" WHERE 1=1 ");
            //objCNoAccessPartnerTypes.GetList(" WHERE ID <> " + constCustodyPartnerTypeID);

            return new object[] { 
                new JavaScriptSerializer().Serialize(objCvwBranches.lstCVarvwBranches)//data[0]
                , new JavaScriptSerializer().Serialize(objCvwPartners.lstCVarvwAccPartners)//data[1]
                , new JavaScriptSerializer().Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes)//data[2]
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

        //// pWhereClauseOpenBalance & pWhereClauseEndBalance are equal to (payments - allocations)
        //// pWhereClauseOpenBalance-Real & pWhereClauseEndBalance-Real are equal to (payments - approvals)
        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause, string pWhereClauseOpenBalance, string pWhereClauseEndBalance, string pWhereClauseOpenBalance_RegardingApprovals, string pWhereClauseEndBalance_RegardingApprovals, Int32 pPartnerTypeID)
        {
            //int constTransactionAPPayment = 20;
            //int constTransactionPayableAllocation = 80;
            int constTransactionReceivableAllocation = 40;
            bool pRecordsExist = false;
            Exception checkException = null;
            int constCustomerPartnerTypeID = 1;

            CvwAccPartnerBalance objCvwAccPartnerOpenBalance = new CvwAccPartnerBalance();
            checkException = objCvwAccPartnerOpenBalance.GetList(pWhereClauseOpenBalance);
            CvwAccPartnerBalance objCvwAccPartnerEndBalance = new CvwAccPartnerBalance();
            checkException = objCvwAccPartnerEndBalance.GetList(pWhereClauseEndBalance);
            CvwAccPartnerBalance objCvwAccPartnerOpenBalance_RegardingApprovals = new CvwAccPartnerBalance();
            checkException = objCvwAccPartnerOpenBalance_RegardingApprovals.GetList(pWhereClauseOpenBalance_RegardingApprovals);
            CvwAccPartnerBalance objCvwAccPartnerEndBalance_RegardingApprovals = new CvwAccPartnerBalance();
            checkException = objCvwAccPartnerEndBalance_RegardingApprovals.GetList(pWhereClauseEndBalance_RegardingApprovals);

            #region OpenBalance
            var pSelectedOpenBalance = objCvwAccPartnerOpenBalance.lstCVarvwAccPartnerBalance.GroupBy(g => g.CurrencyCode)
                            .Select(g => new
                            {
                                Balance = g.Sum(s => (s.CreditAmount - s.DebitAmount))
                                    //Balance = g.Sum(s => (s.CreditAmount - (s.TransactionType != constTransactionReceivableAllocation ? s.DebitAmount : 0)))
                                ,
                                CurrencyCode = g.First().CurrencyCode
                            }).OrderBy(o => o.CurrencyCode);
            pSelectedOpenBalance = pSelectedOpenBalance.OrderBy(o => o.CurrencyCode);
            string pOpenBalance = "0";
            if (pSelectedOpenBalance.Count() > 0)
                if (pSelectedOpenBalance.ElementAt(0).Balance != 0)
                    pOpenBalance = decimal.Round(pSelectedOpenBalance.ElementAt(0).Balance, 3).ToString() + " " + pSelectedOpenBalance.ElementAt(0).CurrencyCode;
                    //pOpenBalance = (pPartnerTypeID == constCustomerPartnerTypeID ? decimal.Round(pSelectedOpenBalance.ElementAt(0).Balance, 3).ToString() : (-1 * (decimal.Round(pSelectedOpenBalance.ElementAt(0).Balance, 3))).ToString()
                    //    + " " + pSelectedOpenBalance.ElementAt(0).CurrencyCode);
            for (int i = 1; i < pSelectedOpenBalance.Count(); i++)
            {
                if (pSelectedOpenBalance.ElementAt(i).Balance != 0)
                    pOpenBalance += " , " + decimal.Round(pSelectedOpenBalance.ElementAt(i).Balance, 3).ToString() + " " + pSelectedOpenBalance.ElementAt(i).CurrencyCode;
                    //pOpenBalance += " , " + (pPartnerTypeID == constCustomerPartnerTypeID ? decimal.Round(pSelectedOpenBalance.ElementAt(i).Balance, 3).ToString() : (-1 * (decimal.Round(pSelectedOpenBalance.ElementAt(i).Balance, 3))).ToString()
                    //    + " " + pSelectedOpenBalance.ElementAt(i).CurrencyCode);
            }
            #endregion OpenBalance
            #region EndBalance

            //var pAvailableAmounts = objCvwAccPartnerEndBalance.lstCVarvwAccPartnerBalance //constTransactionAPPayment=20
            //    .GroupBy(g => g.CurrencyID)
            //    .Select(g => new
            //    {
            //        AvailableBalance = g.Sum(s => (s.TransactionType == constTransactionAPPayment ? s.DebitAmount
            //                                                     : (s.TransactionType == constTransactionPayableAllocation ? (-1 * s.DebitAmount) : 0)))
            //        , CurrencyID = g.First().CurrencyID
            //        , CurrencyCode = g.First().CurrencyCode
            //    });

            //var pAvailableAmounts = objCvwAccPartnerEndBalance.lstCVarvwAccPartnerBalance //constTransactionAPPayment=20
            //    .GroupBy(g => g.CurrencyCode)
            //    .Select(s => new
            //    {
            //        ApprovedDebits = s.Where(w => w.TransactionType == 20).Sum(d => d.DebitAmount) - s.Where(w => w.TransactionType == 80).Sum(d => d.DebitAmount)
            //        , CurrencyCode = s.First().CurrencyCode });

            //var pAvailableAmounts = objCvwAccPartnerEndBalance.lstCVarvwAccPartnerBalance //constTransactionAPPayment=20
            //    .GroupBy(g => g.CurrencyID)
            //    .Select(g => new
            //    {
            //        AvailableBalance = g.Sum(s => (s.TransactionType == constTransactionAPPayment || s.TransactionType == constTransactionPayableAllocation 
            //                                       ? s.DebitAmount - s.CreditAmount
            //                                       : 0))
            //        ,
            //        CurrencyID = g.First().CurrencyID
            //        ,
            //        CurrencyCode = g.First().CurrencyCode
            //    });

            var pSelectedEndBalance = objCvwAccPartnerEndBalance.lstCVarvwAccPartnerBalance.GroupBy(g => g.CurrencyCode)
                                        .Select(g => new
                                        {
                                            Balance = g.Sum(s => (s.CreditAmount - s.DebitAmount))
                                                //Balance = g.Sum(s => (s.CreditAmount - (s.TransactionType != constTransactionReceivableAllocation ? s.DebitAmount : 0)))
                                            ,
                                            CurrencyCode = g.First().CurrencyCode
                                        });
            pSelectedEndBalance = pSelectedEndBalance.OrderBy(o => o.CurrencyCode);
            string pEndBalance = "0";
            if (pSelectedEndBalance.Count() > 0)
                if (pSelectedEndBalance.ElementAt(0).Balance != 0)
                    pEndBalance = decimal.Round(pSelectedEndBalance.ElementAt(0).Balance, 3).ToString() + " " + pSelectedEndBalance.ElementAt(0).CurrencyCode;
            //pEndBalance = (pPartnerTypeID == constCustomerPartnerTypeID ? decimal.Round(pSelectedEndBalance.ElementAt(0).Balance, 3).ToString() : (-1 * (decimal.Round(pSelectedEndBalance.ElementAt(0).Balance, 3))).ToString()
            //    + " " + pSelectedEndBalance.ElementAt(0).CurrencyCode);
            for (int i = 1; i < pSelectedEndBalance.Count(); i++)
            {
                if (pSelectedEndBalance.ElementAt(i).Balance != 0)
                    pEndBalance += " , " + decimal.Round(pSelectedEndBalance.ElementAt(i).Balance, 3).ToString() + " " + pSelectedEndBalance.ElementAt(i).CurrencyCode;
                //pEndBalance += " , " + (pPartnerTypeID == constCustomerPartnerTypeID ? decimal.Round(pSelectedEndBalance.ElementAt(i).Balance, 3).ToString() : (-1 * (decimal.Round(pSelectedEndBalance.ElementAt(i).Balance, 3))).ToString()
                //    + " " + pSelectedEndBalance.ElementAt(i).CurrencyCode);
            }
            #endregion EndBalance

            #region OpenBalance_RegardingApprovals
            var pSelectedOpenBalance_RegardingApprovals = objCvwAccPartnerOpenBalance_RegardingApprovals.lstCVarvwAccPartnerBalance.GroupBy(g => g.CurrencyCode)
                            .Select(g => new
                            {
                                Balance = g.Sum(s => (s.CreditAmount - s.DebitAmount))
                                    //Balance = g.Sum(s => (s.CreditAmount - (s.TransactionType != constTransactionReceivableAllocation ? s.DebitAmount : 0)))
                                ,
                                CurrencyCode = g.First().CurrencyCode
                            }).OrderBy(o => o.CurrencyCode);
            pSelectedOpenBalance_RegardingApprovals = pSelectedOpenBalance_RegardingApprovals.OrderBy(o => o.CurrencyCode);
            string pOpenBalance_RegardingApprovals = "0";
            if (pSelectedOpenBalance_RegardingApprovals.Count() > 0)
                if (pSelectedOpenBalance_RegardingApprovals.ElementAt(0).Balance != 0)
                    pOpenBalance_RegardingApprovals = decimal.Round(pSelectedOpenBalance_RegardingApprovals.ElementAt(0).Balance, 3).ToString()
                        + " " + pSelectedOpenBalance_RegardingApprovals.ElementAt(0).CurrencyCode;
            for (int i = 1; i < pSelectedOpenBalance_RegardingApprovals.Count(); i++)
            {
                if (pSelectedOpenBalance_RegardingApprovals.ElementAt(i).Balance != 0)
                    pOpenBalance_RegardingApprovals += " , " + decimal.Round(pSelectedOpenBalance_RegardingApprovals.ElementAt(i).Balance, 3).ToString()
                        + " " + pSelectedOpenBalance_RegardingApprovals.ElementAt(i).CurrencyCode;
            }
            #endregion OpenBalance_RegardingApprovals
            #region EndBalance_RegardingApprovals
            var pSelectedEndBalance_RegardingApprovals = objCvwAccPartnerEndBalance_RegardingApprovals.lstCVarvwAccPartnerBalance.GroupBy(g => g.CurrencyCode)
                            .Select(g => new
                            {
                                Balance = g.Sum(s => (s.CreditAmount - s.DebitAmount))
                                    //Balance = g.Sum(s => (s.CreditAmount - (s.TransactionType != constTransactionReceivableAllocation ? s.DebitAmount : 0)))
                                ,
                                CurrencyCode = g.First().CurrencyCode
                            }).OrderBy(o => o.CurrencyCode);
            pSelectedEndBalance_RegardingApprovals = pSelectedEndBalance_RegardingApprovals.OrderBy(o => o.CurrencyCode);
            string pEndBalance_RegardingApprovals = "0";
            if (pSelectedEndBalance_RegardingApprovals.Count() > 0)
                if (pSelectedEndBalance_RegardingApprovals.ElementAt(0).Balance != 0)
                    pEndBalance_RegardingApprovals = decimal.Round(pSelectedEndBalance_RegardingApprovals.ElementAt(0).Balance, 3).ToString()
                        + " " + pSelectedEndBalance_RegardingApprovals.ElementAt(0).CurrencyCode;
            for (int i = 1; i < pSelectedEndBalance_RegardingApprovals.Count(); i++)
            {
                if (pSelectedEndBalance_RegardingApprovals.ElementAt(i).Balance != 0)
                    pEndBalance_RegardingApprovals += " , " + decimal.Round(pSelectedEndBalance_RegardingApprovals.ElementAt(i).Balance, 3).ToString()
                        + " " + pSelectedEndBalance_RegardingApprovals.ElementAt(i).CurrencyCode;
            }
            #endregion EndBalance_RegardingApprovals

            CvwAccPartnerBalance objCvwAccPartnerBalance = new CvwAccPartnerBalance();
            checkException = objCvwAccPartnerBalance.GetList(pWhereClause);

            if (objCvwAccPartnerBalance.lstCVarvwAccPartnerBalance.Count > 0 && checkException == null)
                pRecordsExist = true;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] 
            {
                pRecordsExist //pData[0]
                , serializer.Serialize(objCvwAccPartnerBalance.lstCVarvwAccPartnerBalance) //pData[1]
                , pOpenBalance //pData[2]
                , pEndBalance //pData[3]
                , pOpenBalance_RegardingApprovals //pData[4]
                , pEndBalance_RegardingApprovals //pData[5]
            };
        }
    }
}
