
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

//using Shipping.MvcApp.Models.SC.Transactions.Generated;
//using Shipping.MvcApp.Models.SC.Transactions.Customized;
//using MoreLinq;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkEGL.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkEGL.Customized;

namespace Shipping.MvcApp.Controllers.Purchasing.API_PS_Approving
{
    public class PS_ApprovingTempController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] IntializeData()
        {

            CSuppliers CPS_Suppliers = new CSuppliers();
            CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
            
            CA_CostCenters cA_CostCenters = new CA_CostCenters();

            CPS_Suppliers.GetList("where 1 = 1 order by name");
            cCurrencies.GetList(" where  1 = 1");
            cA_CostCenters.GetList("where 1 = 1");

            return new Object[]
            {
                new JavaScriptSerializer().Serialize(CPS_Suppliers.lstCVarSuppliers),
                new JavaScriptSerializer().Serialize(cCurrencies.lstCVarvwCurrencyDetails),
                new JavaScriptSerializer().Serialize(cA_CostCenters.lstCVarA_CostCenters) 
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwPS_InvoicesForApprove cPS_Invoices = new CvwPS_InvoicesForApprove();
            Int32 _RowCount = 0;
            cPS_Invoices.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(cPS_Invoices.lstCVarvwPS_InvoicesForApprove), _RowCount };
        }


        [HttpGet, HttpPost]
        public object[] Approve(string pSelectedIDs  , bool pApproved)
        {
            //---------------------------------------------------------------------------------------------------
            var _Result = false;
            var ErrorMessage = "";
                CPS_PostingInvoices cSLPostingGoods = new CPS_PostingInvoices();
                var Exception = cSLPostingGoods.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);
                if(Exception != null)
                ErrorMessage = Exception.Message; //cSLPostingGoods.lstCVarSLPostingGoodsReceiptNotes[0].ErrMessage;
            
            
            if(ErrorMessage.Trim() == "")
            {
                _Result = true;

            }
        
            return new Object[] { _Result, ErrorMessage };
        }

    }






}


