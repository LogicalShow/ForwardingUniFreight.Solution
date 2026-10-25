//using Forwarding.MvcApp.Models.Administration.DisbursementLink.Customized;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkMelk.Customized;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
//using Forwarding.MvcApp.Models.Administration.Settings.Generated;
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
    public class UserShippingLinkController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;

            CvwSec_User_DAS_Link objCvwSec_User_DAS_Link = new CvwSec_User_DAS_Link();
            objCvwSec_User_DAS_Link.GetListPaging(pPageSize, pPageNumber, pWhereClause, "ID", out _RowCount);


            CvwShipLinkMelc_User_Link objDASUsers = new CvwShipLinkMelc_User_Link();
            objDASUsers.GetList("Where 1=1");

            CUsers objCUsers = new CUsers();
            objCUsers.GetList("Where IsNull(CustomerID , 0) = 0 AND 1=1");

            return new object[] {
                 new JavaScriptSerializer().Serialize(objCvwSec_User_DAS_Link.lstCVarvwSec_User_DAS_Link)
               , _RowCount
               , new JavaScriptSerializer().Serialize(objDASUsers.lstCVarvwShipLinkMelc_User_Link)
               , new JavaScriptSerializer().Serialize(objCUsers.lstCVarUsers)
              

            };
        }
        [HttpGet, HttpPost]
        public bool Insert(Int32 pUserID, Int32 pUserDasID)
        {
            bool _result = false;

            CVarSec_User_DAS_Link objCVarSec_User_DAS_Link = new CVarSec_User_DAS_Link();

            objCVarSec_User_DAS_Link.UserID = pUserID;
            objCVarSec_User_DAS_Link.UserDasID = pUserDasID;

            CSec_User_DAS_Link objCSec_User_DAS_Link = new CSec_User_DAS_Link();
            objCSec_User_DAS_Link.lstCVarSec_User_DAS_Link.Add(objCVarSec_User_DAS_Link);
            Exception checkException = objCSec_User_DAS_Link.SaveMethod(objCSec_User_DAS_Link.lstCVarSec_User_DAS_Link);
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
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "Sec_User_DAS_Link", objCVarSec_User_DAS_Link.ID, "I");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pUserID, Int32 pUserDasID)
        {
            bool _result = false;

            CVarSec_User_DAS_Link objCVarSec_User_DAS_Link = new CVarSec_User_DAS_Link();

            objCVarSec_User_DAS_Link.ID = pID;
            objCVarSec_User_DAS_Link.UserID = pUserID;
            objCVarSec_User_DAS_Link.UserDasID = pUserDasID;




            CSec_User_DAS_Link objCSec_User_DAS_Link = new CSec_User_DAS_Link();
            objCSec_User_DAS_Link.lstCVarSec_User_DAS_Link.Add(objCVarSec_User_DAS_Link);
            Exception checkException = objCSec_User_DAS_Link.SaveMethod(objCSec_User_DAS_Link.lstCVarSec_User_DAS_Link);

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "Sec_User_DAS_Link", pID, "U");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pIDs)//pSec_UserSafesIDs
        {
            bool _result = true;
            CSec_User_DAS_Link objCSec_User_DAS_Link = new CSec_User_DAS_Link();
            Exception checkException = null;
            foreach (var currentID in pIDs.Split(','))
            {
                objCSec_User_DAS_Link.lstDeletedCPKSec_User_DAS_Link.Add(new CPKSec_User_DAS_Link() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCSec_User_DAS_Link.DeleteItem(objCSec_User_DAS_Link.lstDeletedCPKSec_User_DAS_Link);
                if (checkException != null)
                    _result = false;
                else
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "Sec_User_DAS_Link", Int32.Parse(currentID.Trim()), "D");
                }

            }

            return _result;
        }
    }
}
