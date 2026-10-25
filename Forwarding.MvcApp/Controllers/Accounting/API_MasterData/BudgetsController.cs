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

namespace Forwarding.MvcApp.Controllers.Accounting.API_MasterData
{
    public class BudgetsController : ApiController
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
                // cA_SubAccounts.GetList("where ID IN(select SubAccountID from Budgets)");
                return new Object[] { new JavaScriptSerializer().Serialize(objCA_Accounts.lstCVarA_Accounts), new JavaScriptSerializer().Serialize(cA_SubAccounts.lstCVarA_SubAccounts) };
            }
            else
            {
                CA_SubAccounts cA_SubAccounts = new CA_SubAccounts();
                cA_SubAccounts.GetList("where Parent_ID = " + pID + "");
                return new Object[] { new JavaScriptSerializer().Serialize(cA_SubAccounts.lstCVarA_SubAccounts) };
            }
        }


        // [Route("/api/Budgets/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CBudgets objCBudgets = new CBudgets();
            //objCBudgets.GetList(string.Empty);
            Int32 _RowCount = 0;// objCBudgets.lstCVarBudgets.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' ";

            objCBudgets.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCBudgets.lstCVarBudgets), _RowCount };
        }

        // [Route("/api/Budgets/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(
            string pName
            )
        {
            bool _result = false;

            CVarBudgets objCVarBudgets = new CVarBudgets();
            objCVarBudgets.Name = pName;
            CBudgets objCBudgets = new CBudgets();
            objCBudgets.lstCVarBudgets.Add(objCVarBudgets);
            Exception checkException = objCBudgets.SaveMethod(objCBudgets.lstCVarBudgets);
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
            string pID,
           string pName
           )
        {
            bool _result = false;

            CVarBudgets objCVarBudgets = new CVarBudgets();
            objCVarBudgets.ID = int.Parse(pID);
            objCVarBudgets.Name = pName;

            CBudgets objCBudgets = new CBudgets();
            objCBudgets.lstCVarBudgets.Add(objCVarBudgets);
            Exception checkException = objCBudgets.SaveMethod(objCBudgets.lstCVarBudgets);
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
        public bool Delete(String pBudgetsIDs)
        {
            bool _result = false;
            CBudgets objCBudgets = new CBudgets();
            foreach (var currentID in pBudgetsIDs.Split(','))
            {
                objCBudgets.lstDeletedCPKBudgets.Add(new CPKBudgets() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCBudgets.DeleteItem(objCBudgets.lstDeletedCPKBudgets);
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
