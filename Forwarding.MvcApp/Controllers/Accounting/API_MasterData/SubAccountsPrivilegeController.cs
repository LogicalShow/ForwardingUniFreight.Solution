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
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;

namespace Forwarding.MvcApp.Controllers.Accounting.API_MasterData
{

    public class SubAccountsPrivilegeController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;

            CvwA_UserSubAccountsGroupsPrivilege objCvwA_UserSubAccountsGroupsPrivilege = new CvwA_UserSubAccountsGroupsPrivilege();
            objCvwA_UserSubAccountsGroupsPrivilege.GetListPaging(pPageSize, pPageNumber, pWhereClause, "ID", out _RowCount);

            CvwA_SubAccounts objCvwA_SubAccounts_Groups = new CvwA_SubAccounts();
            objCvwA_SubAccounts_Groups.GetListPaging(9999, 1, "WHERE IsMain=1", "Code", out _RowCount);

            CUsers objCUsers = new CUsers();
            objCUsers.GetList("Where IsNull(CustomerID , 0) = 0 AND 1=1");

            return new object[] {
                 new JavaScriptSerializer().Serialize(objCvwA_UserSubAccountsGroupsPrivilege.lstCVarvwA_UserSubAccountsGroupsPrivilege)
               , _RowCount
               , new JavaScriptSerializer().Serialize(objCvwA_SubAccounts_Groups.lstCVarvwA_SubAccounts)
               , new JavaScriptSerializer().Serialize(objCUsers.lstCVarUsers)
              

            };
        }
        [HttpGet, HttpPost]
        public bool Insert(Int32 pUserID, Int32 pSubAccountID)
        {
            bool _result = false;

            CVarA_UserSubAccountsGroupsPrivilege objCVarA_UserSubAccountsGroupsPrivilege = new CVarA_UserSubAccountsGroupsPrivilege();

            objCVarA_UserSubAccountsGroupsPrivilege.UserID = pUserID;
            objCVarA_UserSubAccountsGroupsPrivilege.SubAccountID = pSubAccountID;

            CA_UserSubAccountsGroupsPrivilege objCA_UserSubAccountsGroupsPrivilege = new CA_UserSubAccountsGroupsPrivilege();
            objCA_UserSubAccountsGroupsPrivilege.lstCVarA_UserSubAccountsGroupsPrivilege.Add(objCVarA_UserSubAccountsGroupsPrivilege);
            Exception checkException = objCA_UserSubAccountsGroupsPrivilege.SaveMethod(objCA_UserSubAccountsGroupsPrivilege.lstCVarA_UserSubAccountsGroupsPrivilege);
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
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_UserSubAccountsGroupsPrivilege", objCVarA_UserSubAccountsGroupsPrivilege.ID, "I");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pUserID, Int32 pSubAccountID)
        {
            bool _result = false;

            CVarA_UserSubAccountsGroupsPrivilege objCVarA_UserSubAccountsGroupsPrivilege = new CVarA_UserSubAccountsGroupsPrivilege();

            objCVarA_UserSubAccountsGroupsPrivilege.ID = pID;
            objCVarA_UserSubAccountsGroupsPrivilege.UserID = pUserID;
            objCVarA_UserSubAccountsGroupsPrivilege.SubAccountID = pSubAccountID;

            CA_UserSubAccountsGroupsPrivilege objCA_UserSubAccountsGroupsPrivilege = new CA_UserSubAccountsGroupsPrivilege();
            objCA_UserSubAccountsGroupsPrivilege.lstCVarA_UserSubAccountsGroupsPrivilege.Add(objCVarA_UserSubAccountsGroupsPrivilege);
            Exception checkException = objCA_UserSubAccountsGroupsPrivilege.SaveMethod(objCA_UserSubAccountsGroupsPrivilege.lstCVarA_UserSubAccountsGroupsPrivilege);

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_UserSubAccountsGroupsPrivilege", pID, "U");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pIDs)//pSec_UserSafesIDs
        {
            bool _result = true;
            CA_UserSubAccountsGroupsPrivilege objCA_UserSubAccountsGroupsPrivilege = new CA_UserSubAccountsGroupsPrivilege();

            Exception checkException = null;
            foreach (var currentID in pIDs.Split(','))
            {
                objCA_UserSubAccountsGroupsPrivilege.lstDeletedCPKA_UserSubAccountsGroupsPrivilege.Add(new CPKA_UserSubAccountsGroupsPrivilege() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCA_UserSubAccountsGroupsPrivilege.DeleteItem(objCA_UserSubAccountsGroupsPrivilege.lstDeletedCPKA_UserSubAccountsGroupsPrivilege);
                if (checkException != null)
                    _result = false;
                else
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_UserSubAccountsGroupsPrivilege", Int32.Parse(currentID.Trim()), "D");
                }

            }

            return _result;
        }
    }
}
