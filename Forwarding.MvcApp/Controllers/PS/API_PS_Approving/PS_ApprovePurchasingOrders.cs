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
    public class PS_ApprovePurchasingOrdersController : ApiController
    {

         
        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            
            CvwPS_PurchasingOrders cvwPS_PurchasingOrders = new CvwPS_PurchasingOrders();
            Int32 _RowCount = 0;
            cvwPS_PurchasingOrders.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(cvwPS_PurchasingOrders.lstCVarvwPS_PurchasingOrders), _RowCount };
        }

        [HttpGet, HttpPost]
        public object[] Approve(string pSelectedIDs  , bool pApproved)
        {
            //---------------------------------------------------------------------------------------------------
            var _Result = false;
            var ErrorMessage = "";
                CPS_PostingInvoices cSLPostingGoods = new CPS_PostingInvoices();

            CPS_PurchasingOrders cPS_PurchasingOrders = new CPS_PurchasingOrders();

            var Exception =  cPS_PurchasingOrders.UpdateList(" IsApproved = "+( pApproved == true ? " 1 " : " 0 " )+ "  where ID IN(" + pSelectedIDs + ")");

            if(Exception != null)
            ErrorMessage = Exception.Message;
            
            
            if(ErrorMessage.Trim() == "")
            {
                _Result = true;

            }
        
            return new Object[] { _Result, ErrorMessage };
        }

    }






}


