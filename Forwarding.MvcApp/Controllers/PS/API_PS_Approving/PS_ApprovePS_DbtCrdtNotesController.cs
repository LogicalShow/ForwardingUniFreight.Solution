
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
using Forwarding.MvcApp.Models.PS.PS_Transactions.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.PS.PS_Approving.Customized;

namespace Forwarding.MvcApp.Controllers.Sales.API_Approving
{
    public class PS_ApprovePS_DbtCrdtNotesController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] IntializeData()
        {

            CSuppliers cClients = new CSuppliers();
            CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
            
            
            cClients.GetList("where 1 = 1");
            cCurrencies.GetList(" where  1 = 1");
          
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
  
            return new Object[]
            {
                serializer.Serialize(cClients.lstCVarSuppliers),
                serializer.Serialize(cCurrencies.lstCVarvwCurrencyDetails)
              
            };
        }
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CPS_ClientDbtCrdtNotes objCSL_DbtCrdtNotes = new CPS_ClientDbtCrdtNotes();
            //objCSL_Invoices.GetList(string.Empty);
            Int32 _RowCount = 0;// objCSL_Invoices.lstCVarSL_Invoices.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' "
                + " OR AccountName LIKE '%" + pSearchKey + "%' "
            + " OR SubAccountName LIKE '%" + pSearchKey + "%' ";

            objCSL_DbtCrdtNotes.GetListPaging(pPageSize, pPageNumber, whereClause, " ID ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCSL_DbtCrdtNotes.lstCVarPS_ClientDbtCrdtNotes), _RowCount };
        }
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CvwPS_ClientDbtCrdtNotes cvwSL_Invoices = new CvwPS_ClientDbtCrdtNotes();
            Int32 _RowCount = 0;
            cvwSL_Invoices.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(cvwSL_Invoices.lstCVarvwPS_ClientDbtCrdtNotes), _RowCount };
        }

        [HttpGet, HttpPost]
        public object[] Approve(string pSelectedIDs  , bool pApproved)
        {
            //---------------------------------------------------------------------------------------------------
            var _Result = false;
            var ErrorMessage = "";
                CSL_PostingDCNotes cSLPostingGoods = new CSL_PostingDCNotes();
                var Exception = cSLPostingGoods.GetListServices("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);
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


