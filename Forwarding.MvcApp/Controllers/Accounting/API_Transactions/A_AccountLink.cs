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
    public class A_AccountLinkController : ApiController
    {
        //[Route("/api/A_AccountLink/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CA_AccountLink objCA_AccountLink = new CA_AccountLink();
            objCA_AccountLink.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCA_AccountLink.lstCVarA_AccountLink) };
        }

        // [Route("/api/A_AccountLink/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CA_AccountLink objCvwA_AccountLink = new CA_AccountLink();
            //objCvwA_AccountLink.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwA_AccountLink.lstCVarA_AccountLink.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE N'%" + pSearchKey + "%' ";
                //+ " OR Name LIKE '%" + pSearchKey + "%' ";

            objCvwA_AccountLink.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwA_AccountLink.lstCVarA_AccountLink), _RowCount };
        }



        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] IntializeData()
        {
            CA_Accounts RevenueAccounts = new CA_Accounts();
            CA_Accounts ExpensesAccounts = new CA_Accounts();
            ExpensesAccounts.GetList("where IsMain = 0 and SUBSTRING (Account_Number, 1, 1) = 3 ");
            RevenueAccounts.GetList("where IsMain = 0 and SUBSTRING (Account_Number, 1, 1) = 4 ");
            // objCA_AccountLink.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(ExpensesAccounts.lstCVarA_Accounts) , new JavaScriptSerializer().Serialize(RevenueAccounts.lstCVarA_Accounts) };
        }



        // [Route("/api/A_AccountLink/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public object[] Insert(String pName, String pExpensesAccountID , string pRevenueAccountID)
        {
            bool _result = false;
            var Message = "";

            CVarA_AccountLink objCVarA_AccountLink = new CVarA_AccountLink();
            CA_AccountLink objA_AccountLink = new CA_AccountLink();

            objCVarA_AccountLink.Name = pName.ToUpper();
            objCVarA_AccountLink.ExpensesAccountID = int.Parse(pExpensesAccountID);
            objCVarA_AccountLink.RevenueAccountID = int.Parse(pRevenueAccountID);
            objCVarA_AccountLink.Notes = "";
            CA_AccountLink objCA_AccountLink = new CA_AccountLink();
     
            objA_AccountLink.GetList("where Name = N'" + pName.ToUpper() + "'");
            var NameCount = objA_AccountLink.lstCVarA_AccountLink.Count;
            var expensesCount = 0;
            var RevenueCount = 0;
            if(NameCount <= 0)
            {
                objA_AccountLink.GetList("where ExpensesAccountID = " + int.Parse(pExpensesAccountID) + "");
                expensesCount = objA_AccountLink.lstCVarA_AccountLink.Count;

                if(expensesCount <= 0)
                {

                    objA_AccountLink.GetList("where RevenueAccountID = " + int.Parse(pRevenueAccountID) + "");
                    RevenueCount = objA_AccountLink.lstCVarA_AccountLink.Count;

                    if(RevenueCount > 0 )
                    {
                        Message = "Please Change The [ Revenue Account ] , is Used before ... ";
                        _result = false;
                    }

                }
                else
                {
                    Message = "Please Change The [ Expenses Account ] , is Used before ... ";
                    _result = false;

                }

            }
            else
            {

                Message = "Please Change The [ Name ] , is Used before ... ";
                _result = false;

            }

            if (Message.Trim() == "")
            {
                objCA_AccountLink.lstCVarA_AccountLink.Add(objCVarA_AccountLink);
                Exception checkException = objCA_AccountLink.SaveMethod(objCA_AccountLink.lstCVarA_AccountLink);
                if (checkException != null)
                    _result = false;
                else
                     _result = true;
            }
            

            return new Object[] { _result , Message};
        }

        // [Route("/api/A_AccountLink/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public object [] Update(Int32 pID, String pName, String pExpensesAccountID, string pRevenueAccountID)
        {
            bool _result = false;
            var Message = "";
            CVarA_AccountLink objCVarA_AccountLink = new CVarA_AccountLink();
            CA_AccountLink objA_AccountLink = new CA_AccountLink();
            objCVarA_AccountLink.ID = pID;

            objCVarA_AccountLink.Name = pName.ToUpper();
            objCVarA_AccountLink.ExpensesAccountID = int.Parse(pExpensesAccountID);
            objCVarA_AccountLink.RevenueAccountID = int.Parse(pRevenueAccountID);
            objCVarA_AccountLink.Notes = "";

            CA_AccountLink objCA_AccountLink = new CA_AccountLink();
            objA_AccountLink.GetList("where Name = N'" + pName.ToUpper() + "' AND ID <> " + pID + "");
            var NameCount = objA_AccountLink.lstCVarA_AccountLink.Count;
            var expensesCount = 0;
            var RevenueCount = 0;
            if (NameCount <= 0)
            {
                objA_AccountLink.GetList("where ExpensesAccountID = " + int.Parse(pExpensesAccountID) + " AND ID <> " +  pID + "");
                expensesCount = objA_AccountLink.lstCVarA_AccountLink.Count;

                if (expensesCount <= 0)
                {

                    objA_AccountLink.GetList("where RevenueAccountID = " + int.Parse(pRevenueAccountID) + " AND ID <> " +  pID + "");
                    RevenueCount = objA_AccountLink.lstCVarA_AccountLink.Count;

                    if (RevenueCount > 0)
                    {
                        Message = "Please Change The [ Revenue Account ] , is Used before ... ";
                        _result = false;
                    }

                }
                else
                {
                    Message = "Please Change The [ Expenses Account ] , is Used before ... ";
                    _result = false;

                }

            }
            else
            {

                Message = "Please Change The [ Name ] , is Used before ... ";
                _result = false;

            }

            if (Message.Trim() == "")
            {
                objCA_AccountLink.lstCVarA_AccountLink.Add(objCVarA_AccountLink);
                Exception checkException = objCA_AccountLink.SaveMethod(objCA_AccountLink.lstCVarA_AccountLink);
                if (checkException != null)
                    _result = false;
                else
                    _result = true;
            }


            return new Object[] { _result, Message };
        }

        // [Route("/api/A_AccountLink/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CA_AccountLink objCA_AccountLink = new CA_AccountLink();
        //    objCA_AccountLink.lstDeletedCPKA_AccountLink.Add(new CPKA_AccountLink() { ID = pID });
        //    objCA_AccountLink.DeleteItem(objCA_AccountLink.lstDeletedCPKA_AccountLink);
        //}

        // [Route("api/A_AccountLink/Delete/{pA_AccountLinkIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pA_AccountLinkIDs)
        {
            bool _result = false;
            CA_AccountLink objCA_AccountLink = new CA_AccountLink();
            foreach (var currentID in pA_AccountLinkIDs.Split(','))
            {
                objCA_AccountLink.lstDeletedCPKA_AccountLink.Add(new CPKA_AccountLink() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCA_AccountLink.DeleteItem(objCA_AccountLink.lstDeletedCPKA_AccountLink);
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
