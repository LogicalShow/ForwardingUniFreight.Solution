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

namespace Forwarding.MvcApp.Controllers.SL
{
    public class SL_ApprovingController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] IntializeData()
        {
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
            CCustomers cClients = new CCustomers();
            CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
            CNoAccessPaymentType cNoAccessPaymentType = new CNoAccessPaymentType();
            CA_CostCenters cA_CostCenters = new CA_CostCenters();
            
            cClients.GetList("where 1 = 1");
            cCurrencies.GetList(" where  1 = 1");
            cNoAccessPaymentType.GetList("where 1 = 1");
            cA_CostCenters.GetList("where 1 = 1");

            return new Object[]
            {
                srialize.Serialize(cClients.lstCVarCustomers),
                srialize.Serialize(cCurrencies.lstCVarvwCurrencyDetails),
                srialize.Serialize(cNoAccessPaymentType.lstCVarNoAccessPaymentType),
                srialize.Serialize(cA_CostCenters.lstCVarA_CostCenters) 
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwSL_Invoices cvwSL_Invoices = new CvwSL_Invoices();
            Int32 _RowCount = 0;
            cvwSL_Invoices.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(cvwSL_Invoices.lstCVarvwSL_Invoices), _RowCount };
        }

        [HttpGet, HttpPost]
        public object[] Approve(string pSelectedIDs  , bool pApproved)
        {
            //---------------------------------------------------------------------------------------------------
            var _Result = false;
            var ErrorMessage = "";
                CSL_PostingInvoices cSLPostingGoods = new CSL_PostingInvoices();
                var Exception = cSLPostingGoods.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);
                if(Exception != null)
                ErrorMessage = Exception.Message; //cSLPostingGoods.lstCVarSLPostingGoodsReceiptNotes[0].ErrMessage;
            //create proc[dbo].[ERP_Web_PostingSalesInvoice]
            //(@ID nvarchar(max),@UserID int,@Approved bit)


            if (ErrorMessage.Trim() == "")
            {
                _Result = true;

            }
        
            return new Object[] { _Result, ErrorMessage };
        }

    }






}


