using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.FA.Generated;
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
    public class FA_UserBranchesController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;

            CvwFA_UserBranches objCvwFA_UserBranches = new CvwFA_UserBranches();
            objCvwFA_UserBranches.GetListPaging(pPageSize, pPageNumber, pWhereClause, "ID", out _RowCount);

            CBranches objCBranches = new CBranches();
            objCBranches.GetList("Where 1=1");

            CUsers objCUsers = new CUsers();
            objCUsers.GetList("Where IsNull(CustomerID , 0) = 0 AND 1=1");

            return new object[] {
                 new JavaScriptSerializer().Serialize(objCvwFA_UserBranches.lstCVarvwFA_UserBranches)
               , _RowCount
               , new JavaScriptSerializer().Serialize(objCBranches.lstCVarBranches)
               , new JavaScriptSerializer().Serialize(objCUsers.lstCVarUsers)
              

            };
        }



        [HttpGet, HttpPost]
        public object[] GetUserBranches(string pID)
        {
            CBranches objCBranches = new CBranches();
            objCBranches.GetList("WHERE (ID NOT IN (SELECT fa.BranchID  FROM dbo.FA_UserBranches fa WHERE fa.UserID = "+ pID + ")) order by Code");


            return new object[] {
                 new JavaScriptSerializer().Serialize(objCBranches.lstCVarBranches)



            };
        }



        [HttpGet, HttpPost]
        public bool Insert(Int32 pUserID, Int32 pBranchID , DateTime pLastDepreciationDate)
        {
            bool _result = false;

            CVarFA_UserBranches objCVarFA_UserBranches = new CVarFA_UserBranches();

            objCVarFA_UserBranches.UserID = pUserID;
            objCVarFA_UserBranches.BranchID = pBranchID;
            objCVarFA_UserBranches.LastDepreciationDate = pLastDepreciationDate;

            CFA_UserBranches objCFA_UserBranches = new CFA_UserBranches();
            objCFA_UserBranches.lstCVarFA_UserBranches.Add(objCVarFA_UserBranches);
            Exception checkException = objCFA_UserBranches.SaveMethod(objCFA_UserBranches.lstCVarFA_UserBranches);
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
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "FA_UserBranches", objCVarFA_UserBranches.ID, "I");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pUserID, Int32 pBranchID, DateTime pLastDepreciationDate)
        {
            bool _result = false;

            CVarFA_UserBranches objCVarFA_UserBranches = new CVarFA_UserBranches();

            objCVarFA_UserBranches.ID = pID;
            objCVarFA_UserBranches.UserID = pUserID;
            objCVarFA_UserBranches.BranchID = pBranchID;
            objCVarFA_UserBranches.LastDepreciationDate = pLastDepreciationDate;

            CFA_UserBranches objCFA_UserBranches = new CFA_UserBranches();
            objCFA_UserBranches.lstCVarFA_UserBranches.Add(objCVarFA_UserBranches);
            Exception checkException = objCFA_UserBranches.SaveMethod(objCFA_UserBranches.lstCVarFA_UserBranches);

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "FA_UserBranches", pID, "U");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pIDs)//pFA_UserBranchesIDs
        {
            bool _result = true;
            CFA_UserBranches objCFA_UserBranches = new CFA_UserBranches();
            Exception checkException = null;
            foreach (var currentID in pIDs.Split(','))
            {
                objCFA_UserBranches.lstDeletedCPKFA_UserBranches.Add(new CPKFA_UserBranches() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCFA_UserBranches.DeleteItem(objCFA_UserBranches.lstDeletedCPKFA_UserBranches);
                if (checkException != null)
                    _result = false;
                else
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "FA_UserBranches", Int32.Parse(currentID.Trim()), "D");
                }

            }

            return _result;
        }
    }
}
