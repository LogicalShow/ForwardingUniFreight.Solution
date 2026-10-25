//using Forwarding.MvcApp.Models.OperAcc.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
//using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Accounting.Reports.Customized;
using Forwarding.MvcApp.Models.MasterData.CashAndBanks.Generated;
using Shipping.MvcApp.Models.Accounting.Reports.Generated;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.API_Reports
{
    public class ChequesStatueReportsController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] FillFilter()
        {
            int _RowCount = 0;

            CvwBranches objCvwBranches = new CvwBranches();
            objCvwBranches.GetList(" WHERE 1=1 ORDER BY Name ");

            CBankAccount CBank = new CBankAccount();
            CBank.GetList(" WHERE 1=1 ORDER BY Name ");

            //LinkUserAndSafes
            string pSafesWhereClause = " WHERE 1=1 ";
            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetItem(55);
            if (objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                pSafesWhereClause = " JOIN VW_Sec_UserSafes USF ON ID =  USF._SafeID " + pSafesWhereClause + "  AND USF._UserID=" + WebSecurity.CurrentUserId;

            CTreasury objCSafes = new CTreasury();
            objCSafes.GetListPaging(9999, 1, pSafesWhereClause, "Name", out _RowCount);


            return new object[] { 
                new JavaScriptSerializer().Serialize(objCvwBranches.lstCVarvwBranches)//data[0]
                , new JavaScriptSerializer().Serialize(CBank.lstCVarBankAccount)//data[1]
                  , new JavaScriptSerializer().Serialize(objCSafes.lstCVarTreasury)//data[2]
            };
        }

        //[HttpGet, HttpPost]
        //public object[] FillPartners(Int32 pPartnerTypeID)
        //{
        //    int _RowCount = 0;
        //    int constCustomerPartnerTypeID = 1;
        //    int constAgentPartnerTypeID = 2;
        //    int constForwardingAgentPartnerTypeID = 3;
        //    int constCustomsClearanceAgentPartnerTypeID = 4;
        //    int constForwardingLinePartnerTypeID = 5;
        //    int constAirlinePartnerTypeID = 6;
        //    int constTruckerPartnerTypeID = 7;
        //    int constSupplierPartnerTypeID = 8;
        //    int constCustodyPartnerTypeID = 20;

        //    if (pPartnerTypeID == constCustomerPartnerTypeID)
        //    {
        //        CvwCustomersWithMinimalColumns objCCustomers = new CvwCustomersWithMinimalColumns();
        //        objCCustomers.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
        //        return new object[] { new JavaScriptSerializer().Serialize(objCCustomers.lstCVarvwCustomersWithMinimalColumns) };
        //    }
        //    else if (pPartnerTypeID == constAgentPartnerTypeID)
        //    {
        //        CAgents objCAgents = new CAgents();
        //        objCAgents.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
        //        return new object[] { new JavaScriptSerializer().Serialize(objCAgents.lstCVarAgents) };
        //    }
        //    else if (pPartnerTypeID == constForwardingAgentPartnerTypeID)
        //    {

        //        CForwardingAgents objCForwardingAgents = new CForwardingAgents();
        //        objCForwardingAgents.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
        //        return new object[] { new JavaScriptSerializer().Serialize(objCForwardingAgents.lstCVarForwardingAgents) };
        //    }
        //    else if (pPartnerTypeID == constCustomsClearanceAgentPartnerTypeID)
        //    {
        //        CCustomsClearanceAgents objCCustomsClearanceAgents = new CCustomsClearanceAgents();
        //        objCCustomsClearanceAgents.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
        //        return new object[] { new JavaScriptSerializer().Serialize(objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents) };
        //    }
        //    else if (pPartnerTypeID == constForwardingLinePartnerTypeID)
        //    {
        //        CForwardingLines objCForwardingLines = new CForwardingLines();
        //        objCForwardingLines.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
        //        return new object[] { new JavaScriptSerializer().Serialize(objCForwardingLines.lstCVarForwardingLines) };
        //    }
        //    else if (pPartnerTypeID == constAirlinePartnerTypeID)
        //    {
        //        CvwAirlinesWithMinimalColumns objCAirlines = new CvwAirlinesWithMinimalColumns();
        //        objCAirlines.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
        //        return new object[] { new JavaScriptSerializer().Serialize(objCAirlines.lstCVarvwAirlinesWithMinimalColumns) };
        //    }
        //    else if (pPartnerTypeID == constTruckerPartnerTypeID)
        //    {
        //        CTruckers objCTruckers = new CTruckers();
        //        objCTruckers.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
        //        return new object[] { new JavaScriptSerializer().Serialize(objCTruckers.lstCVarTruckers) };
        //    }
        //    else if (pPartnerTypeID == constSupplierPartnerTypeID)
        //    {
        //        CSuppliers objCSuppliers = new CSuppliers();
        //        objCSuppliers.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
        //        return new object[] { new JavaScriptSerializer().Serialize(objCSuppliers.lstCVarSuppliers) };
        //    }
        //    else if (pPartnerTypeID == constCustodyPartnerTypeID)
        //    {
        //        CCustody objCCustody = new CCustody();
        //        objCCustody.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
        //        return new object[] { new JavaScriptSerializer().Serialize(objCCustody.lstCVarCustody) };
        //    }
        //    return new object[] { };
        //}

        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause,string pOrderBy)
        {
            bool pRecordsExist = false;
            Exception checkException = null;
            int constPRTypeReceivable = 30;
            int constPRTypePayable = 40;
            int _RowCount = 0;
        
            CvwA_VoucherReportCheck objCvwAccPayment = new CvwA_VoucherReportCheck();
            //checkException = objCvwAccPayment.GetList(pWhereClause);
            checkException = objCvwAccPayment.GetListPaging(999999,1,pWhereClause, pOrderBy, out _RowCount);

            if (objCvwAccPayment.lstCVarvwA_VoucherReportCheck.Count > 0 && checkException == null)
                pRecordsExist = true;

            #region TotalSummary
            var pSelectedTotalSummary = objCvwAccPayment.lstCVarvwA_VoucherReportCheck.GroupBy(g => g.CurrencyID)
                            .Select(g => new
                            {
                                //Balance = g.Sum(s => (s.CreditAmount - s.DebitAmount))
                                //Balance = g.Sum(s => (s.CreditAmount - (s.TransactionType != constTransactionReceivableAllocation ? s.DebitAmount : 0)))
                                Balance = g.Sum(s => (s.VoucherType == constPRTypeReceivable ? s.Total : (s.Total * -1)))
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
                , serializer.Serialize(objCvwAccPayment.lstCVarvwA_VoucherReportCheck)
                , pTotalSummary
            };
        }


    }
}
