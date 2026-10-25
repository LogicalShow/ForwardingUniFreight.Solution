using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
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
    public class A_PaymentRequest_UsersLevelController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;

            CvwA_PaymentRequest_UsersLevel objCvwA_PaymentRequest_UsersLevel = new CvwA_PaymentRequest_UsersLevel();
            objCvwA_PaymentRequest_UsersLevel.GetListPaging(pPageSize, pPageNumber, pWhereClause, "ID", out _RowCount);


            CTreasury objCTreasury = new CTreasury();
            CUsers objCUsers = new CUsers();
            CPaymentRequestApprovalLevels objCPaymentRequestApprovalLevels = new CPaymentRequestApprovalLevels();
            if (pIsLoadArrayOfObjects)
            {
                objCTreasury.GetList("Where 1=1");
                objCUsers.GetList("Where IsNull(CustomerID , 0) = 0 AND 1=1");
                objCPaymentRequestApprovalLevels.GetList("WHERE 1=1");
            }

            return new object[] {
                 new JavaScriptSerializer().Serialize(objCvwA_PaymentRequest_UsersLevel.lstCVarvwA_PaymentRequest_UsersLevel)
               , _RowCount
               , new JavaScriptSerializer().Serialize(objCTreasury.lstCVarTreasury)
               , new JavaScriptSerializer().Serialize(objCUsers.lstCVarUsers)
               , new JavaScriptSerializer().Serialize(objCPaymentRequestApprovalLevels.lstCVarPaymentRequestApprovalLevels)


            };
        }
        [HttpGet, HttpPost]
        public bool Insert(Int32 pUserID, Int32 pLevelNo)
        {
            bool _result = false;

            CVarA_PaymentRequest_UsersLevel objCVarA_PaymentRequest_UsersLevel = new CVarA_PaymentRequest_UsersLevel();

            objCVarA_PaymentRequest_UsersLevel.UserID = pUserID;
            objCVarA_PaymentRequest_UsersLevel.LevelNo = pLevelNo;

            CA_PaymentRequest_UsersLevel objCA_PaymentRequest_UsersLevel = new CA_PaymentRequest_UsersLevel();
            objCA_PaymentRequest_UsersLevel.lstCVarA_PaymentRequest_UsersLevel.Add(objCVarA_PaymentRequest_UsersLevel);
            Exception checkException = objCA_PaymentRequest_UsersLevel.SaveMethod(objCA_PaymentRequest_UsersLevel.lstCVarA_PaymentRequest_UsersLevel);
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
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_PaymentRequest_UsersLevel", objCVarA_PaymentRequest_UsersLevel.ID, "I");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pUserID, Int32 pLevelNo)
        {
            bool _result = false;

            CVarA_PaymentRequest_UsersLevel objCVarA_PaymentRequest_UsersLevel = new CVarA_PaymentRequest_UsersLevel();

            objCVarA_PaymentRequest_UsersLevel.ID = pID;
            objCVarA_PaymentRequest_UsersLevel.UserID = pUserID;
            objCVarA_PaymentRequest_UsersLevel.LevelNo = pLevelNo;

            CA_PaymentRequest_UsersLevel objCA_PaymentRequest_UsersLevel = new CA_PaymentRequest_UsersLevel();
            objCA_PaymentRequest_UsersLevel.lstCVarA_PaymentRequest_UsersLevel.Add(objCVarA_PaymentRequest_UsersLevel);
            Exception checkException = objCA_PaymentRequest_UsersLevel.SaveMethod(objCA_PaymentRequest_UsersLevel.lstCVarA_PaymentRequest_UsersLevel);

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_PaymentRequest_UsersLevel", pID, "U");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pIDs)
        {
            bool _result = true;
            CA_PaymentRequest_UsersLevel objCA_PaymentRequest_UsersLevel = new CA_PaymentRequest_UsersLevel();
            Exception checkException = null;
            foreach (var currentID in pIDs.Split(','))
            {
                objCA_PaymentRequest_UsersLevel.lstDeletedCPKA_PaymentRequest_UsersLevel.Add(new CPKA_PaymentRequest_UsersLevel() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCA_PaymentRequest_UsersLevel.DeleteItem(objCA_PaymentRequest_UsersLevel.lstDeletedCPKA_PaymentRequest_UsersLevel);
                if (checkException != null)
                    _result = false;
                else
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_PaymentRequest_UsersLevel", Int32.Parse(currentID.Trim()), "D");
                }

            }

            return _result;
        }
        [HttpGet, HttpPost]
        public object[] GetUserByLevel(int pLevelNo)
        {
            bool IsRedirectNotifyOnApproveLevel = false;
            bool IsLastLevel = false;
            bool IsAfterLastLevel = false;
            CvwA_PaymentRequest_UsersLevel objCvwA_PaymentRequest_UsersLevel = new CvwA_PaymentRequest_UsersLevel();
            Exception checkException  = objCvwA_PaymentRequest_UsersLevel.GetList("Where LevelNo=" + pLevelNo);

            CPaymentRequestApprovalLevels objCPaymentRequestApprovalLevels = new CPaymentRequestApprovalLevels();
            objCPaymentRequestApprovalLevels.GetList("WHERE RedirectNotifyOnApprove = 1");
            if (objCPaymentRequestApprovalLevels.lstCVarPaymentRequestApprovalLevels.Count > 0 && pLevelNo > objCPaymentRequestApprovalLevels.lstCVarPaymentRequestApprovalLevels[0].OrderNo)
                IsRedirectNotifyOnApproveLevel = true;

            objCPaymentRequestApprovalLevels.GetList("WHERE IsLastLevel = 1");
            if (objCPaymentRequestApprovalLevels.lstCVarPaymentRequestApprovalLevels.Count > 0 && pLevelNo - 1 == objCPaymentRequestApprovalLevels.lstCVarPaymentRequestApprovalLevels[0].OrderNo)
                IsLastLevel = true;

            IsAfterLastLevel = pLevelNo - 1 > objCPaymentRequestApprovalLevels.lstCVarPaymentRequestApprovalLevels[0].OrderNo ? true : false;

            return new object[] {
                 new JavaScriptSerializer().Serialize(objCvwA_PaymentRequest_UsersLevel.lstCVarvwA_PaymentRequest_UsersLevel)
                 ,IsRedirectNotifyOnApproveLevel
                 , IsLastLevel
                 , IsAfterLastLevel
            };
        }

    }
}
