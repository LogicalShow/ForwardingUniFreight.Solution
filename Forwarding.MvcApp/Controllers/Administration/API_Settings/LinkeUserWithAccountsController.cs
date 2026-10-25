using Forwarding.MvcApp.Models.SC.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.SL.SL_Transactions.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class LinkeUserWithAccountsController : ApiController
    {
  

        [HttpGet, HttpPost]
        public Object[] IntializeData(string pID) //pID : AccountID
        {
            if (pID == null)
            {
                CA_Accounts objCA_Accounts = new CA_Accounts();
                CUsers objCUsers = new CUsers();
                // CA_SubAccounts cA_SubAccounts = new CA_SubAccounts();
                
                objCA_Accounts.GetList("Where IsMain = 0");
                //var accounts = objCA_Accounts.lstCVarA_Accounts.Where(x => x.Account_Number.Substring(0, 1) == "3" || x.Account_Number.Substring(0, 1) == "4").ToList();

                objCUsers.GetList("where 1 = 1");


                // cA_SubAccounts.GetList("where ID IN(select SubAccountID from LinkeUserWithAccounts)");
                return new Object[] { new JavaScriptSerializer().Serialize(objCA_Accounts.lstCVarA_Accounts), new JavaScriptSerializer().Serialize(objCUsers.lstCVarUsers) };
            }
            else
            {
                CA_SubAccounts cA_SubAccounts = new CA_SubAccounts();
                cA_SubAccounts.GetList("where Parent_ID = "+ pID + "");
                return new Object[] {  new JavaScriptSerializer().Serialize(cA_SubAccounts.lstCVarA_SubAccounts)  };
            }
        }

        [HttpGet, HttpPost]
        public Object[] LoadAccounts(string pWhereClause) //pID : AccountID
        {
            
                CA_Accounts objCA_Accounts = new CA_Accounts();
                CA_Fiscal_Year objCFiscalYears = new CA_Fiscal_Year();
                CBudgets cBudgets = new CBudgets();
                objCA_Accounts.GetList(pWhereClause);
                var accounts = objCA_Accounts.lstCVarA_Accounts.Where(x => x.Account_Number.Substring(0, 1) == "3" || x.Account_Number.Substring(0, 1) == "4").ToList();

                return new Object[] { new JavaScriptSerializer().Serialize(accounts)};
         
        }












        [HttpGet, HttpPost]
[AllowAnonymous]
        public object[] InsertItems([FromBody]string pItems)
{
    var _result = false;
   //  Deserialize List -------------------------------------------------------------------------------
    var Listobj = new JavaScriptSerializer().Deserialize<List<CVarLinkeUserWithAccountsDetails>>(pItems);
       // Listobj = new JavaScriptSerializer().Deserialize<List<CVarSC_TransactionsDetails>>(pItems);
            CLinkeUserWithAccountsDetails cCLinkeUserWithAccountsDetails = new CLinkeUserWithAccountsDetails();
    var checkException = cCLinkeUserWithAccountsDetails.SaveMethod(Listobj);
  //  ------------------------------
    if (checkException == null)
        _result = true;

    return new object[] {
        _result, pItems
    };
}
            
        // [Route("/api/LinkeUserWithAccounts/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwLinkeUserWithAccounts objCLinkeUserWithAccounts = new CvwLinkeUserWithAccounts();
            //objCvwLinkeUserWithAccounts.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwLinkeUserWithAccounts.lstCVarLinkeUserWithAccounts.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' ";

            objCLinkeUserWithAccounts.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCLinkeUserWithAccounts.lstCVarvwLinkeUserWithAccounts), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] LoadLinkeUserWithAccountsDetails(string pWhereClause)
        {
            CLinkeUserWithAccountsDetails cvwLinkeUserWithAccountsDetails = new CLinkeUserWithAccountsDetails();
            cvwLinkeUserWithAccountsDetails.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(cvwLinkeUserWithAccountsDetails.lstCVarLinkeUserWithAccountsDetails) };
        }


        [HttpGet, HttpPost]
        public Object[] LoadFiscalYears(string pWhereClause)
        {
            CA_Fiscal_Year cA_Fiscal_Year = new CA_Fiscal_Year();
            cA_Fiscal_Year.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(cA_Fiscal_Year.lstCVarA_Fiscal_Year) };
        }


        // [Route("/api/LinkeUserWithAccounts/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public int Insert
            (
            string pUserID,
            bool pIsAllAccounts
            )
        {
        int _result = 0;

            CVarLinkeUserWithAccounts objCVarLinkeUserWithAccounts = new CVarLinkeUserWithAccounts();
            objCVarLinkeUserWithAccounts.UserID = int.Parse(pUserID);
            objCVarLinkeUserWithAccounts.IsAllAccounts = pIsAllAccounts;

            CLinkeUserWithAccounts objCLinkeUserWithAccounts = new CLinkeUserWithAccounts();
            objCLinkeUserWithAccounts.lstCVarLinkeUserWithAccounts.Add(objCVarLinkeUserWithAccounts);
            Exception checkException = objCLinkeUserWithAccounts.SaveMethod(objCLinkeUserWithAccounts.lstCVarLinkeUserWithAccounts);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = objCVarLinkeUserWithAccounts.ID;
            return _result;
        }

        [HttpGet, HttpPost]
        public int Update
            (
            string pID ,
            string pUserID,
            bool pIsAllAccounts
           )
        {
            int _result = 0;

            CVarLinkeUserWithAccounts objCVarLinkeUserWithAccounts = new CVarLinkeUserWithAccounts();
            objCVarLinkeUserWithAccounts.ID = int.Parse( pID );
            objCVarLinkeUserWithAccounts.UserID = int.Parse(pUserID);
            objCVarLinkeUserWithAccounts.IsAllAccounts = pIsAllAccounts;

            CLinkeUserWithAccounts objCLinkeUserWithAccounts = new CLinkeUserWithAccounts();
            objCLinkeUserWithAccounts.lstCVarLinkeUserWithAccounts.Add(objCVarLinkeUserWithAccounts);
            Exception checkException = objCLinkeUserWithAccounts.SaveMethod(objCLinkeUserWithAccounts.lstCVarLinkeUserWithAccounts);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = objCVarLinkeUserWithAccounts.ID;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pLinkeUserWithAccountsIDs , string type)
        {
            if (type == "1")
            {
                bool _result = false;
                CLinkeUserWithAccounts objCLinkeUserWithAccounts = new CLinkeUserWithAccounts();
                foreach (var currentID in pLinkeUserWithAccountsIDs.Split(','))
                {
                    objCLinkeUserWithAccounts.lstDeletedCPKLinkeUserWithAccounts.Add(new CPKLinkeUserWithAccounts() { ID = Int32.Parse(currentID.Trim()) });
                }

                Exception checkException = objCLinkeUserWithAccounts.DeleteItem(objCLinkeUserWithAccounts.lstDeletedCPKLinkeUserWithAccounts);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                        _result = false;
                }
                else //deleted successfully
                    _result = true;
                return _result;
            }
            else
            {
                bool _result = false;
                CLinkeUserWithAccountsDetails objCLinkeUserWithAccounts = new CLinkeUserWithAccountsDetails();
                foreach (var currentID in pLinkeUserWithAccountsIDs.Split(','))
                {
                    objCLinkeUserWithAccounts.lstDeletedCPKLinkeUserWithAccountsDetails.Add(new CPKLinkeUserWithAccountsDetails() { ID = Int32.Parse(currentID.Trim()) });
                }

                Exception checkException = objCLinkeUserWithAccounts.DeleteItem(objCLinkeUserWithAccounts.lstDeletedCPKLinkeUserWithAccountsDetails);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                        _result = false;
                }
                else //deleted successfully
                    _result = true;
                return _result;
            }
        }
    }
}
