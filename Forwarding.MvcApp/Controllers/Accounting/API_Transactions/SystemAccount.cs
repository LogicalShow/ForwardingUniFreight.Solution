using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Accounting.API_Transactions
{
    public class SystemAccountController : ApiController
    {
        //[Route("/api/SystemAccount/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CSystemAccount objCSystemAccount = new CSystemAccount();
            objCSystemAccount.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCSystemAccount.lstCVarSystemAccount) };
        }

        // [Route("/api/SystemAccount/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CSystemAccount objCvwSystemAccount = new CSystemAccount();
            //objCvwSystemAccount.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwSystemAccount.lstCVarSystemAccount.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE N'%" + pSearchKey + "%' ";
                //+ " OR Name LIKE '%" + pSearchKey + "%' ";

            objCvwSystemAccount.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwSystemAccount.lstCVarSystemAccount), _RowCount };
        }



        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] IntializeData()
        {
           // CA_Accounts RevenueAccounts = new CA_Accounts();
            CA_Accounts accounts = new CA_Accounts();
            accounts.GetList("where 1 = 1 ");
           // RevenueAccounts.GetList("where IsMain = 0 and SUBSTRING (Account_Number, 1, 1) = 4 ");
           // objCSystemAccount.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(accounts.lstCVarA_Accounts) };
        }

        
        // [Route("/api/SystemAccount/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public object [] Update(string pSystemAccountIDs, String pAccountIDs)
        {
            bool _result = false;
            var Message = "";
            _result = true;
            CSystemAccount cSystemAccount = new CSystemAccount();
            string pUpdateClause = "";
            var AccountLength = pSystemAccountIDs.Split(',').Length;
            if( AccountLength == 1 && !(pSystemAccountIDs.Contains(",")) )
            {
                pUpdateClause = " SystemAccountID =  " + pSystemAccountIDs.Split(',')[0]+ " WHERE AccountID IN(" + pAccountIDs + ")";
            }
            else
            {
            for (int i = 0; i < AccountLength; i++)
            {
                if(i == 0)
                {
                    pUpdateClause += " SystemAccountID = CASE ";

                }


                pUpdateClause += " WHEN AccountID = " + pAccountIDs.Split(',')[i] + " THEN " + pSystemAccountIDs.Split(',')[i] + "";

                if(i == AccountLength - 1)
                {

                    pUpdateClause += " END";
                    pUpdateClause += " WHERE AccountID IN(" + pAccountIDs + ")";

                }
            }

            }
            
            var checkException = cSystemAccount.UpdateList(pUpdateClause);


            if (checkException == null)
            {
                _result = true;
                Message = "Done !"; 
            }
            else
            {
                _result = false;
                Message = "Something is error  , contact your technical support!  ";
            }

            return new Object[] { _result , Message };
        }

        // [Route("/api/SystemAccount/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CSystemAccount objCSystemAccount = new CSystemAccount();
        //    objCSystemAccount.lstDeletedCPKSystemAccount.Add(new CPKSystemAccount() { ID = pID });
        //    objCSystemAccount.DeleteItem(objCSystemAccount.lstDeletedCPKSystemAccount);
        //}

        // [Route("api/SystemAccount/Delete/{pSystemAccountIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pSystemAccountIDs)
        {
            bool _result = false;
            CSystemAccount objCSystemAccount = new CSystemAccount();
            foreach (var currentID in pSystemAccountIDs.Split(','))
            {
                objCSystemAccount.lstDeletedCPKSystemAccount.Add(new CPKSystemAccount() { AccountID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCSystemAccount.DeleteItem(objCSystemAccount.lstDeletedCPKSystemAccount);
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
