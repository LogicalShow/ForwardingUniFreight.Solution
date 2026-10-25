using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.SL.SL_Transactions.Generated;
using Forwarding.MvcApp.Models.Sales.Approving.Customized;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Sales.API_Approving
{
    public class SL_ApprovingClientDbtCrdtNotesController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] IntializeData()
        {
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
            CCustomers cClients = new CCustomers();
            CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
            //CPaymentType cNoAccessPaymentType = new CPaymentType();
            CA_CostCenters cA_CostCenters = new CA_CostCenters();
            
            cClients.GetList("where 1 = 1");
            cCurrencies.GetList(" where  1 = 1");
            //cNoAccessPaymentType.GetList("where 1 = 1");
            cA_CostCenters.GetList("where 1 = 1");

            return new Object[]
            {
                srialize.Serialize(cClients.lstCVarCustomers),
                srialize.Serialize(cCurrencies.lstCVarvwCurrencyDetails),
                //new JavaScriptSerializer().Serialize(cNoAccessPaymentType.lstCVarPaymentType),
                srialize.Serialize(cA_CostCenters.lstCVarA_CostCenters) 
            };
        }
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CSL_DbtCrdtNotes objCSL_DbtCrdtNotes = new CSL_DbtCrdtNotes();
            //objCSL_Invoices.GetList(string.Empty);
            Int32 _RowCount = 0;// objCSL_Invoices.lstCVarSL_Invoices.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' "
                + " OR AccountName LIKE '%" + pSearchKey + "%' "
            + " OR SubAccountName LIKE '%" + pSearchKey + "%' ";

            objCSL_DbtCrdtNotes.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCSL_DbtCrdtNotes.lstCVarSL_DbtCrdtNotes), _RowCount };
        }
        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwDbtCrdtNotes cvwSL_Invoices = new CvwDbtCrdtNotes();
            Int32 _RowCount = 0;
            cvwSL_Invoices.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(cvwSL_Invoices.lstCVarvwDbtCrdtNotes), _RowCount };
        }

        [HttpGet, HttpPost]
        public object[] Approve(string pSelectedIDs  , bool pApproved)
        {
            //---------------------------------------------------------------------------------------------------
            var _Result = false;
            var ErrorMessage = "";
                CSL_PostingDCNotes cSLPostingGoods = new CSL_PostingDCNotes();
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


