using Forwarding.MvcApp.Models.SC.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.SC.Transactions.Generated;
using Forwarding.MvcApp.Models.SC.Transactions.Customized;
using MoreLinq;
using Forwarding.MvcApp.Models.CRM.CRM_Reports.Generated;
using Forwarding.MvcApp.Helpers;
using Forwarding.MvcApp.Models.CRM.CRM_Reports.Customized;
using Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Sources.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Actions.Generated;

namespace Forwarding.MvcApp.Controllers.SC.API_SC_Transactions
{
    public class SC_OutgoingItemsReportController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] GetPrintedData(string pCodes)
        {
            int TotalRows = 10000;
            CvwSC_TransactionsHeaderDetails cvwSC_TransactionsHeaderDetails = new CvwSC_TransactionsHeaderDetails();
            cvwSC_TransactionsHeaderDetails.GetListPaging(10000, 1, "where Code In("+ pCodes + ")", " ID ", out TotalRows);
            return new Object[] { new JavaScriptSerializer().Serialize(cvwSC_TransactionsHeaderDetails.lstCVarvwSC_TransactionsHeaderDetails) };
        }
        
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] FillFilter(string pWhereClause)
        {
            int TotalRows = 10000;
            CSC_Transactions cSC_Transactions = new CSC_Transactions();
            cSC_Transactions.GetListPaging(10000, 1, pWhereClause, " ID ", out TotalRows);
            return new Object[] { new JavaScriptSerializer().Serialize(cSC_Transactions.lstCVarSC_Transactions) };
        }






    }






}


