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
using Forwarding.MvcApp.Models.SL.SL_Transactions.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.PS.PS_Transactions.Generated;

namespace Forwarding.MvcApp.Controllers.PS
{
    public class PS_ApproveQuotationController : ApiController
    {
            [HttpGet, HttpPost]
            public Object[] IntializeData()
            {
            var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            CvwPS_PurchasingRequest cPS_PurchasingRequest = new CvwPS_PurchasingRequest();
            var PS_PurchasingRequestCondition = " where ";
            PS_PurchasingRequestCondition += " ( ";
            PS_PurchasingRequestCondition += " Isnull(dbo.vwPS_PurchasingRequest.IsApproved , 0 ) = 1 ";
            PS_PurchasingRequestCondition += " AND ";
            PS_PurchasingRequestCondition += " Isnull(dbo.vwPS_PurchasingRequest.IsDeleted , 0 ) = 0 ";
            PS_PurchasingRequestCondition += " AND ";
            PS_PurchasingRequestCondition += " (not EXISTS (select top(1) Q.ID from dbo.PS_Quotations Q where Q.PurchasingRequestID = dbo.vwPS_PurchasingRequest.ID AND IsNull( Q.IsApproved , 0 ) = 1 )) ";
            PS_PurchasingRequestCondition += " ) ";
            cPS_PurchasingRequest.GetList(PS_PurchasingRequestCondition);
            return new Object[] {serialize.Serialize(cPS_PurchasingRequest.lstCVarvwPS_PurchasingRequest) };
            }

            [HttpGet, HttpPost]
            public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
            {
            CvwPS_Quotations cvwPS_Quotations = new CvwPS_Quotations();

            Int32 _RowCount = 0;
            cvwPS_Quotations.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(cvwPS_Quotations.lstCVarvwPS_Quotations), _RowCount };
            }

            [HttpGet, HttpPost]
            public object[] Approve(string pSelectedIDs, bool pApproved)
            {
                //---------------------------------------------------------------------------------------------------
                var _Result = false;
                var ErrorMessage = "";
                CPS_Quotations cPS_Quotations = new CPS_Quotations();
                var Exception = cPS_Quotations.UpdateList(" IsApproved = " + (pApproved == true ? " 1 " : " 0 ") + "  where ID In(" + pSelectedIDs + ")");
                if (Exception != null)
                ErrorMessage = Exception.Message;
                if (ErrorMessage.Trim() == "")
                {
                    _Result = true;
                }
                return new Object[] { _Result, ErrorMessage };
            }
        
    }






}


