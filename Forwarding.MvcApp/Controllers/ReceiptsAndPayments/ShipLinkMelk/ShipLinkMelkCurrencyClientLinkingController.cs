using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkMelk.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.ShipLinkMelk
{
    public class ShipLinkMelkCurrencyClientLinkingController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            if (pIsLoadArrayOfObjects)
            {
                objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
            }
            CvwSL_DailyClientAccounts objCvwSL_DailyClientAccounts = new CvwSL_DailyClientAccounts();
            objCvwSL_DailyClientAccounts.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwSL_DailyClientAccounts.lstCVarvwSL_DailyClientAccounts)
                , _RowCount
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCvwA_Accounts.lstCVarvwA_Accounts) : null //pAccounts = pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] Save(Int32 pID, Int32 pAccountID, Int32 pSubAccountID, Int64 pClientID, Int32 pCurrencyID)
        {
            bool _result = false;
            Exception checkException = null;
            CSL_DailyClientAccounts objCSL_DailyClientAccounts = new CSL_DailyClientAccounts();
            CVarSL_DailyClientAccounts objCVarSL_DailyClientAccounts = new CVarSL_DailyClientAccounts();
            #region Insert
            if (pID == 0) //Insert
            {
                objCVarSL_DailyClientAccounts.AccountID = pAccountID;
                objCVarSL_DailyClientAccounts.SubAccountID = pSubAccountID;
                objCVarSL_DailyClientAccounts.ClientID = pClientID;
                objCVarSL_DailyClientAccounts.CurrencyID = pCurrencyID;
                
                objCSL_DailyClientAccounts.lstCVarSL_DailyClientAccounts.Add(objCVarSL_DailyClientAccounts);
                checkException = objCSL_DailyClientAccounts.SaveMethod(objCSL_DailyClientAccounts.lstCVarSL_DailyClientAccounts);
                if (checkException == null) // an exception is caught in the model
                {
                    _result = true;
                    //CallCustomizedSP
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_DailyClientAccounts", objCVarSL_DailyClientAccounts.ID, "I");
                }
            }
            #endregion Insert
            #region Update
            else //Update
            {
                string pUpdateClause = "";
                pUpdateClause += (pAccountID == 0 ? ("AccountID=null") : ("AccountID=" + pAccountID)) + "\n";
                pUpdateClause += (pSubAccountID == 0 ? (",SubAccountID=null") : (",SubAccountID=" + pSubAccountID)) + "\n";
                pUpdateClause += (pClientID == 0 ? (",ClientID=null") : (",ClientID=" + pClientID)) + "\n";
                pUpdateClause += (pCurrencyID == 0 ? (",CurrencyID=null") : (",CurrencyID=" + pCurrencyID)) + "\n";
                
                pUpdateClause += "WHERE ID=" + pID + "\n";
                checkException = objCSL_DailyClientAccounts.UpdateList(pUpdateClause);
                if (checkException == null) // an exception is caught in the model
                {
                    _result = true;
                    //CallCustomizedSP
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_DailyClientAccounts", pID, "U");
                }
            }
            #endregion Update
            return new object[]
                {
                    _result
                };
        }

        [HttpGet, HttpPost]
        public bool Delete(String pIDs)
        {
            bool _result = true;
            CSL_DailyClientAccounts objCSL_DailyClientAccounts = new CSL_DailyClientAccounts();
            Exception checkException = null;
            foreach (var currentID in pIDs.Split(','))
            {
                objCSL_DailyClientAccounts.lstDeletedCPKSL_DailyClientAccounts.Add(new CPKSL_DailyClientAccounts() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCSL_DailyClientAccounts.DeleteItem(objCSL_DailyClientAccounts.lstDeletedCPKSL_DailyClientAccounts);
                if (checkException != null)
                    _result = false;
                else
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_DailyClientAccounts", Int32.Parse(currentID.Trim()), "D");
                }

            }
            return _result;
        }

    }
}
