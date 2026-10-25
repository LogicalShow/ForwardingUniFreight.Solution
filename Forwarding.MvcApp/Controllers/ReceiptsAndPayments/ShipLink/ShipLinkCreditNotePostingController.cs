using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated;
using Shipping.MvcApp.Models.ShipLink.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.ShipLink.API_Transactions
{
    public class ShipLinkCreditNotePostingController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            //CInvoiceType objCInvoiceType = new CInvoiceType();
            //CSafes objCSafes = new CSafes();
            //CvwVessel objCvwVessel = new CvwVessel();

            //if (pIsLoadArrayOfObjects)
            //{
            //    objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
            //    objCInvoiceType.GetList("WHERE 1=1 ORDER BY Name");
            //    objCSafes.GetList("WHERE 1=1 ORDER BY Name");
            //    objCvwVessel.GetList("WHERE 1=1 ORDER BY Name");
            //}

            CvwERP_ShipLink_CreditNote_SelectNotPosted objCvwERP_ShipLink_CreditNote_SelectNotPosted = new CvwERP_ShipLink_CreditNote_SelectNotPosted();
            objCvwERP_ShipLink_CreditNote_SelectNotPosted.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwERP_ShipLink_CreditNote_SelectNotPosted.lstCVarvwERP_ShipLink_CreditNote_SelectNotPosted)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCvwA_Accounts.lstCVarvwA_Accounts)
                //, new JavaScriptSerializer().Serialize(objCInvoiceType.lstCVarInvoiceType) //pInvoiceType = pData[3]
                //, new JavaScriptSerializer().Serialize(objCSafes.lstCVarSafes) //pSafe = pData[4]
                //, new JavaScriptSerializer().Serialize(objCvwVessel.lstCVarvwVessel) //pVessel = pData[5]
            };
        }

        [HttpGet, HttpPost]
        public object[] Post_OneEgypt(string pPostedSelectedIDs,string plistOfInvoiceIDs, DateTime pJVDate)
        {
            string strMessage = "";
            Exception checkException = null;
            bool Return= true;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

       
            var ArrSelectedIDs = pPostedSelectedIDs.Split(',');
            var ArrSelectedInvoiceIDs = plistOfInvoiceIDs.Split(',');




                plistOfInvoiceIDs = "";
                for (int i = 0; i < ArrSelectedIDs.Length && strMessage == ""; i++)
                {
                   //string IsPart= objCCustomizedDBCall.CallStringFunction("select isnull(IsPart,0) from InvDemStrDebit where ID = " + ArrSelectedIDs[i]);
                    ////if (IsPart == "True")
                    ////{
                        checkException = objCCustomizedDBCall.CallProcFunction("ShippingLink_CreateCreditNoteJV " + ArrSelectedIDs[i].ToString() + "," + WebSecurity.CurrentUserId);
                    if(checkException == null)
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "ShippingLink_ReverseCreditNoteJV", Convert.ToInt32(ArrSelectedIDs[i]), "P");
                    //}                  
                    //else
                    //    plistOfInvoiceIDs += ArrSelectedIDs[i].ToString() + ",";

                  
                    if (checkException != null)
                    {
                        Return = false;
                        strMessage = checkException.Message;
                        break;
                    }

                }
        


            return new object[] { Return, strMessage };
        }



    }
}
