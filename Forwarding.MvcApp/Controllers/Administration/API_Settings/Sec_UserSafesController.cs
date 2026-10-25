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
    public class Sec_UserSafesController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;

            CvwSec_UserSafes objCvwSec_UserSafes = new CvwSec_UserSafes();
            objCvwSec_UserSafes.GetListPaging(pPageSize, pPageNumber, pWhereClause, "ID", out _RowCount);

            CTreasury objCTreasury = new CTreasury();
            objCTreasury.GetList("Where 1=1");

            CUsers objCUsers = new CUsers();
            objCUsers.GetList("Where IsNull(CustomerID , 0) = 0 AND 1=1");

            return new object[] {
                 new JavaScriptSerializer().Serialize(objCvwSec_UserSafes.lstCVarvwSec_UserSafes)
               , _RowCount
               , new JavaScriptSerializer().Serialize(objCTreasury.lstCVarTreasury)
               , new JavaScriptSerializer().Serialize(objCUsers.lstCVarUsers)
              

            };
        }
        [HttpGet, HttpPost]
        public bool Insert(Int32 pUserID, Int32 pSafeID)
        {
            bool _result = false;

            CVarSec_UserSafes objCVarSec_UserSafes = new CVarSec_UserSafes();

            objCVarSec_UserSafes.UserID = pUserID;
            objCVarSec_UserSafes.SafeID = pSafeID;

            CSec_UserSafes objCSec_UserSafes = new CSec_UserSafes();
            objCSec_UserSafes.lstCVarSec_UserSafes.Add(objCVarSec_UserSafes);
            Exception checkException = objCSec_UserSafes.SaveMethod(objCSec_UserSafes.lstCVarSec_UserSafes);
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
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "Sec_UserSafes", objCVarSec_UserSafes.ID, "I");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pUserID, Int32 pSafeID)
        {
            bool _result = false;

            CVarSec_UserSafes objCVarSec_UserSafes = new CVarSec_UserSafes();

            objCVarSec_UserSafes.ID = pID;
            objCVarSec_UserSafes.UserID = pUserID;
            objCVarSec_UserSafes.SafeID = pSafeID;

            CSec_UserSafes objCSec_UserSafes = new CSec_UserSafes();
            objCSec_UserSafes.lstCVarSec_UserSafes.Add(objCVarSec_UserSafes);
            Exception checkException = objCSec_UserSafes.SaveMethod(objCSec_UserSafes.lstCVarSec_UserSafes);

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "Sec_UserSafes", pID, "U");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pIDs)//pSec_UserSafesIDs
        {
            bool _result = true;
            CSec_UserSafes objCSec_UserSafes = new CSec_UserSafes();
            Exception checkException = null;
            foreach (var currentID in pIDs.Split(','))
            {
                objCSec_UserSafes.lstDeletedCPKSec_UserSafes.Add(new CPKSec_UserSafes() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCSec_UserSafes.DeleteItem(objCSec_UserSafes.lstDeletedCPKSec_UserSafes);
                if (checkException != null)
                    _result = false;
                else
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "Sec_UserSafes", Int32.Parse(currentID.Trim()), "D");
                }

            }

            return _result;
        }
    }
}
