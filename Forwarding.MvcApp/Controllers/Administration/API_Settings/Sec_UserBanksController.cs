using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Administration.API_Settings
{
    public class Sec_UserBanksController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;

            CvwSec_UserBanks objCvwSec_UserBanks = new CvwSec_UserBanks();
            objCvwSec_UserBanks.GetListPaging(pPageSize, pPageNumber, pWhereClause, "ID", out _RowCount);

            CBankAccount objCBankAccount = new CBankAccount();
            objCBankAccount.GetList("Where 1=1");

            CUsers objCUsers = new CUsers();
            objCUsers.GetList("Where IsNull(CustomerID , 0) = 0 AND 1=1");

            return new object[] {
                 new JavaScriptSerializer().Serialize(objCvwSec_UserBanks.lstCVarvwSec_UserBanks)
               , _RowCount
               , new JavaScriptSerializer().Serialize(objCBankAccount.lstCVarBankAccount)
               , new JavaScriptSerializer().Serialize(objCUsers.lstCVarUsers)


            };
        }
        [HttpGet, HttpPost]
        public bool Insert(Int32 pUserID, Int32 pBankID)
        {
            bool _result = false;

            CVarSec_UserBanks objCVarSec_UserBanks = new CVarSec_UserBanks();

            objCVarSec_UserBanks.UserID = pUserID;
            objCVarSec_UserBanks.BankID = pBankID;

            CSec_UserBanks objCSec_UserBanks = new CSec_UserBanks();
            objCSec_UserBanks.lstCVarSec_UserBanks.Add(objCVarSec_UserBanks);
            Exception checkException = objCSec_UserBanks.SaveMethod(objCSec_UserBanks.lstCVarSec_UserBanks);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                //CallCustomizedSP
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "Sec_UserBanks", objCVarSec_UserBanks.ID, "I");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pUserID, Int32 pBankID)
        {
            bool _result = false;

            CVarSec_UserBanks objCVarSec_UserBanks = new CVarSec_UserBanks();

            objCVarSec_UserBanks.ID = pID;
            objCVarSec_UserBanks.UserID = pUserID;
            objCVarSec_UserBanks.BankID = pBankID;

            CSec_UserBanks objCSec_UserBanks = new CSec_UserBanks();
            objCSec_UserBanks.lstCVarSec_UserBanks.Add(objCVarSec_UserBanks);
            Exception checkException = objCSec_UserBanks.SaveMethod(objCSec_UserBanks.lstCVarSec_UserBanks);

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "Sec_UserBanks", pID, "U");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pIDs)//pSec_UserBanksIDs
        {
            bool _result = true;
            CSec_UserBanks objCSec_UserBanks = new CSec_UserBanks();
            Exception checkException = null;
            foreach (var currentID in pIDs.Split(','))
            {
                objCSec_UserBanks.lstDeletedCPKSec_UserBanks.Add(new CPKSec_UserBanks() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCSec_UserBanks.DeleteItem(objCSec_UserBanks.lstDeletedCPKSec_UserBanks);
                if (checkException != null)
                    _result = false;
                else
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "Sec_UserBanks", Int32.Parse(currentID.Trim()), "D");
                }

            }

            return _result;
        }
    }
}
