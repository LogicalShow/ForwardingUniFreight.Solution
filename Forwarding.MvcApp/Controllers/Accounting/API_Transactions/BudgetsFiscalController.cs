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

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class BudgetsFiscalController : ApiController
    {
  

        [HttpGet, HttpPost]
        public Object[] IntializeData(string pID) //pID : AccountID
        {
            if (pID == null)
            {

                CA_Accounts objCA_Accounts = new CA_Accounts();
                CA_Fiscal_Year objCFiscalYears = new CA_Fiscal_Year();
                CBudgets cBudgets = new CBudgets();
                // CA_SubAccounts cA_SubAccounts = new CA_SubAccounts();
                 CA_CostCenters objCA_CostCenters = new CA_CostCenters();
                //objCA_Accounts.GetList("Where IsMain = 0");
                objCA_Accounts.GetList("WHERE IsMain=0 And ID in (select AA.AccountID from  A_Accounts_Activities AA  where ActivityCostCenterID=(select ActivityID from NoAccessActivities where SystemName = 'Forwarding') )");
                var accounts = objCA_Accounts.lstCVarA_Accounts.Where(x => x.Account_Number.Substring(0, 1) == "3" || x.Account_Number.Substring(0, 1) == "4").ToList();
                objCFiscalYears.GetList("where 1 = 1");
                cBudgets.GetList("where 1 = 1");
                objCA_CostCenters.GetList("Where IsMain = 0");


                // cA_SubAccounts.GetList("where ID IN(select SubAccountID from BudgetsFiscal)");
                return new Object[] { new JavaScriptSerializer().Serialize(accounts), new JavaScriptSerializer().Serialize(objCFiscalYears.lstCVarA_Fiscal_Year), new JavaScriptSerializer().Serialize(cBudgets.lstCVarBudgets), new JavaScriptSerializer().Serialize(objCA_CostCenters.lstCVarA_CostCenters) };
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
    var Listobj = new JavaScriptSerializer().Deserialize<List<CVarBudgetsFiscalDetails>>(pItems);
       // Listobj = new JavaScriptSerializer().Deserialize<List<CVarSC_TransactionsDetails>>(pItems);
            CBudgetsFiscalDetails cCBudgetsFiscalDetails = new CBudgetsFiscalDetails();
    var checkException = cCBudgetsFiscalDetails.SaveMethod(Listobj);
  //  ------------------------------
    if (checkException == null)
        _result = true;

    return new object[] {
        _result, pItems
    };
}
            
        // [Route("/api/BudgetsFiscal/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwBudgetsFiscal objCBudgetsFiscal = new CvwBudgetsFiscal();
            //objCvwBudgetsFiscal.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwBudgetsFiscal.lstCVarBudgetsFiscal.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' "
                + " OR FiscalYearName LIKE '%" + pSearchKey + "%' ";

            objCBudgetsFiscal.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCBudgetsFiscal.lstCVarvwBudgetsFiscal), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] LoadBudgetsFiscalDetails(string pWhereClause)
        {
            CvwBudgetsFiscalDetails cvwBudgetsFiscalDetails = new CvwBudgetsFiscalDetails();
            cvwBudgetsFiscalDetails.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(cvwBudgetsFiscalDetails.lstCVarvwBudgetsFiscalDetails) };
        }


        [HttpGet, HttpPost]
        public Object[] LoadFiscalYears(string pWhereClause)
        {
            CA_Fiscal_Year cA_Fiscal_Year = new CA_Fiscal_Year();
            cA_Fiscal_Year.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(cA_Fiscal_Year.lstCVarA_Fiscal_Year) };
        }


        // [Route("/api/BudgetsFiscal/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public int Insert
            (
            string pBudgetID,
            String pFiscalYearID ,
            DateTime pFromDate,
            DateTime pToDate,
            int pMonthID
            )
        {
        int _result = 0;

            CVarBudgetsFiscal objCVarBudgetsFiscal = new CVarBudgetsFiscal();
            objCVarBudgetsFiscal.BudgetID = int.Parse(pBudgetID);
            objCVarBudgetsFiscal.FiscalYearID = int.Parse(pFiscalYearID);
            objCVarBudgetsFiscal.MonthID = pMonthID;
            objCVarBudgetsFiscal.FromDate = pFromDate;
            objCVarBudgetsFiscal.ToDate = pToDate;
            CBudgetsFiscal objCBudgetsFiscal = new CBudgetsFiscal();
            objCBudgetsFiscal.lstCVarBudgetsFiscal.Add(objCVarBudgetsFiscal);
            Exception checkException = objCBudgetsFiscal.SaveMethod(objCBudgetsFiscal.lstCVarBudgetsFiscal);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = objCVarBudgetsFiscal.ID;
            return _result;
        }

        [HttpGet, HttpPost]
        public int Update
            (
            string pID ,
            string pBudgetID ,
            String pFiscalYearID,
            DateTime pFromDate,
            DateTime pToDate,
            int pMonthID
           )
        {
            int _result = 0;

            CVarBudgetsFiscal objCVarBudgetsFiscal = new CVarBudgetsFiscal();
            objCVarBudgetsFiscal.ID = int.Parse( pID );
            objCVarBudgetsFiscal.BudgetID = int.Parse(pBudgetID);
            objCVarBudgetsFiscal.FiscalYearID = int.Parse(pFiscalYearID);
            objCVarBudgetsFiscal.MonthID = pMonthID;
            objCVarBudgetsFiscal.FromDate = pFromDate;
            objCVarBudgetsFiscal.ToDate = pToDate;
            CBudgetsFiscal objCBudgetsFiscal = new CBudgetsFiscal();
            objCBudgetsFiscal.lstCVarBudgetsFiscal.Add(objCVarBudgetsFiscal);
            Exception checkException = objCBudgetsFiscal.SaveMethod(objCBudgetsFiscal.lstCVarBudgetsFiscal);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = objCVarBudgetsFiscal.ID;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pBudgetsFiscalIDs , string type)
        {
            if (type == "1")
            {
                bool _result = false;
                CBudgetsFiscal objCBudgetsFiscal = new CBudgetsFiscal();
                foreach (var currentID in pBudgetsFiscalIDs.Split(','))
                {
                    objCBudgetsFiscal.lstDeletedCPKBudgetsFiscal.Add(new CPKBudgetsFiscal() { ID = Int32.Parse(currentID.Trim()) });
                }

                Exception checkException = objCBudgetsFiscal.DeleteItem(objCBudgetsFiscal.lstDeletedCPKBudgetsFiscal);
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
                CBudgetsFiscalDetails objCBudgetsFiscal = new CBudgetsFiscalDetails();
                foreach (var currentID in pBudgetsFiscalIDs.Split(','))
                {
                    objCBudgetsFiscal.lstDeletedCPKBudgetsFiscalDetails.Add(new CPKBudgetsFiscalDetails() { ID = Int32.Parse(currentID.Trim()) });
                }

                Exception checkException = objCBudgetsFiscal.DeleteItem(objCBudgetsFiscal.lstDeletedCPKBudgetsFiscalDetails);
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
