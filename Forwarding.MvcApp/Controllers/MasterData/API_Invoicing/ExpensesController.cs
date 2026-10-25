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

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class ExpensesController : ApiController
    {
  

        [HttpGet, HttpPost]
        public Object[] IntializeData(string pID) //pID : AccountID
        {
            if (pID == null)
            {
                CA_Accounts objCA_Accounts = new CA_Accounts();
                CA_SubAccounts cA_SubAccounts = new CA_SubAccounts();
                // CA_CostCenters objCA_CostCenters = new CA_CostCenters();
                objCA_Accounts.GetList("Where 1 = 1");
               // cA_SubAccounts.GetList("where ID IN(select SubAccountID from Expenses)");
                return new Object[] { new JavaScriptSerializer().Serialize(objCA_Accounts.lstCVarA_Accounts), new JavaScriptSerializer().Serialize(cA_SubAccounts.lstCVarA_SubAccounts) };
            }
            else
            {
                CA_SubAccounts cA_SubAccounts = new CA_SubAccounts();
                cA_SubAccounts.GetList("where Parent_ID = "+ pID + "");
                return new Object[] {  new JavaScriptSerializer().Serialize(cA_SubAccounts.lstCVarA_SubAccounts) };
            }
        }


        // [Route("/api/Expenses/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwExpenses objCExpenses = new CvwExpenses();
            //objCvwExpenses.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwExpenses.lstCVarExpenses.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' "
                + " OR AccountName LIKE '%" + pSearchKey + "%' "
            +" OR SubAccountName LIKE '%" + pSearchKey + "%' ";

            objCExpenses.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCExpenses.lstCVarvwExpenses), _RowCount };
        }

        // [Route("/api/Expenses/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(
            string pName,
            String pAccountID, 
            String pSubAccountID
            )
        {
            bool _result = false;

            CVarExpenses objCVarExpenses = new CVarExpenses();
            objCVarExpenses.Name = pName;
            objCVarExpenses.AccountID = int.Parse(pAccountID);
            objCVarExpenses.SubAccountID = int.Parse(pSubAccountID);
            CExpenses objCExpenses = new CExpenses();
            objCExpenses.lstCVarExpenses.Add(objCVarExpenses);
            Exception checkException = objCExpenses.SaveMethod(objCExpenses.lstCVarExpenses);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(
            string pID ,
           string pName,
           String pAccountID,
           String pSubAccountID
           )
        {
            bool _result = false;

            CVarExpenses objCVarExpenses = new CVarExpenses();
            objCVarExpenses.ID = int.Parse( pID );
            objCVarExpenses.Name = pName;
            objCVarExpenses.AccountID = int.Parse(pAccountID);
            objCVarExpenses.SubAccountID = int.Parse(pSubAccountID);
            CExpenses objCExpenses = new CExpenses();
            objCExpenses.lstCVarExpenses.Add(objCVarExpenses);
            Exception checkException = objCExpenses.SaveMethod(objCExpenses.lstCVarExpenses);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pExpensesIDs)
        {
            bool _result = false;
            CExpenses objCExpenses = new CExpenses();
            foreach (var currentID in pExpensesIDs.Split(','))
            {
                objCExpenses.lstDeletedCPKExpenses.Add(new CPKExpenses() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCExpenses.DeleteItem(objCExpenses.lstDeletedCPKExpenses);
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
