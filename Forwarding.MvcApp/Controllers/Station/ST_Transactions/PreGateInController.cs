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
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.Station.ST_Transactions.Generated;
using Forwarding.MvcApp.Models.Customized;

namespace Forwarding.MvcApp.Controllers.Station.ST_Transactions
{
    public class PreGateInController : ApiController
    {
        public static class GlobalVariable
        {
            public static int HeaderID = 0; // Unmodifiable


        }

        [HttpGet, HttpPost]
        public Object[] IntializeData(string pID) //pID : AccountID
        {
            if (pID == null)
            {
                CvwOperations objCvwOperations = new CvwOperations();
                objCvwOperations.GetList("Where 1=1");

                CCustomers objCCustomers = new CCustomers();
                objCCustomers.GetList("Where 1=1");

                CPackageTypes objCPackageTypes = new CPackageTypes();
                objCPackageTypes.GetList("Where 1=1");


                CA_Accounts objCA_Accounts = new CA_Accounts();
                CA_Fiscal_Year objCFiscalYears = new CA_Fiscal_Year();
                CBudgets cBudgets = new CBudgets();
                // CA_SubAccounts cA_SubAccounts = new CA_SubAccounts();
                // CA_CostCenters objCA_CostCenters = new CA_CostCenters();
                objCA_Accounts.GetList("Where IsMain = 0");
                var accounts = objCA_Accounts.lstCVarA_Accounts.Where(x => x.Account_Number.Substring(0, 1) == "3" || x.Account_Number.Substring(0, 1) == "4").ToList();
                objCFiscalYears.GetList("where 1 = 1");
                cBudgets.GetList("where 1 = 1");
               // cA_SubAccounts.GetList("where ID IN(select SubAccountID from BudgetsFiscal)");
                return new Object[] {
                    new JavaScriptSerializer().Serialize(objCvwOperations.lstCVarvwOperations),
                    new JavaScriptSerializer().Serialize(objCCustomers.lstCVarCustomers),
                    new JavaScriptSerializer().Serialize(objCPackageTypes.lstCVarPackageTypes),


                    new JavaScriptSerializer().Serialize(objCFiscalYears.lstCVarA_Fiscal_Year), new JavaScriptSerializer().Serialize(cBudgets.lstCVarBudgets) };
            }
            else
            {
                CA_SubAccounts cA_SubAccounts = new CA_SubAccounts();
                cA_SubAccounts.GetList("where Parent_ID = "+ pID + "");
                return new Object[] {  new JavaScriptSerializer().Serialize(cA_SubAccounts.lstCVarA_SubAccounts) };
            }
        }

        [HttpGet, HttpPost]
        public Object[] LoadPreGateInDetails(string pWhereClause) //pID : AccountID
        {

            CvwpreGateinvwOperationContainersAndPackages objCvwpreGateinvwOperationContainersAndPackages = new CvwpreGateinvwOperationContainersAndPackages();
                CA_Fiscal_Year objCFiscalYears = new CA_Fiscal_Year();
                CBudgets cBudgets = new CBudgets();
            objCvwpreGateinvwOperationContainersAndPackages.GetList(pWhereClause);
                //var accounts = objCA_Accounts.lstCVarA_Accounts.Where(x => x.Account_Number.Substring(0, 1) == "3" || x.Account_Number.Substring(0, 1) == "4").ToList();

                return new Object[] { new JavaScriptSerializer().Serialize(objCvwpreGateinvwOperationContainersAndPackages.lstCVarvwpreGateinvwOperationContainersAndPackages) };
         
        }












        [HttpGet, HttpPost]
[AllowAnonymous]
        public object[] InsertItems([FromBody]string pItems)
{
    var _result = false;
   //  Deserialize List -------------------------------------------------------------------------------
    var Listobj = new JavaScriptSerializer().Deserialize<List<CVarST_PreGateInDetails>>(pItems);
            // Listobj = new JavaScriptSerializer().Deserialize<List<CVarSC_TransactionsDetails>>(pItems);
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            if (GlobalVariable.HeaderID != 0)
            {
                objCCustomizedDBCall.CallStringFunction("DELETE FROM ST_PreGateInDetails WHERE ID NOT IN (SELECT sgid.ST_PreGateInDetailsID FROM ST_GateInDetails AS sgid) AND PreGateInID = " + GlobalVariable.HeaderID);
            }
            //*************************************************
         
            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
            foreach (var Container in Listobj)
            {
               
                objCOperationContainersAndPackages.UpdateList("ContainerNumber = '" + Container.ContainerNumber + "' WHERE ID = " + Container.ContainerID);

            }

            //*************************************************


            CST_PreGateInDetails cCST_PreGateInDetails = new CST_PreGateInDetails();
    var checkException = cCST_PreGateInDetails.SaveMethod(Listobj);
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
            CvwST_PreGateIn objCvwST_PreGateIn = new CvwST_PreGateIn();
            //objCvwBudgetsFiscal.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwBudgetsFiscal.lstCVarBudgetsFiscal.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where CustomerName LIKE '%" + pSearchKey + "%' "
                + " OR OperationCode LIKE '%" + pSearchKey + "%' "
                + " OR TruckingOrderNumber LIKE '%" + pSearchKey + "%' "
                + " OR Notes LIKE '%" + pSearchKey + "%' ";


            objCvwST_PreGateIn.GetListPaging(pPageSize, pPageNumber, whereClause, " ID desc", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwST_PreGateIn.lstCVarvwST_PreGateIn), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] LoadST_PreGateInDetails(string pWhereClause)
        {
            //CST_PreGateInDetails cobjCST_PreGateInDetails = new CST_PreGateInDetails();
            CvwST_PreGateInDetails cobjCST_PreGateInDetails = new CvwST_PreGateInDetails();

            cobjCST_PreGateInDetails.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(cobjCST_PreGateInDetails.lstCVarvwST_PreGateInDetails) };
        }




        // [Route("/api/BudgetsFiscal/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public int Insert
            (
            string pOperationID,
            String pCustomerID ,
            String pEnteryDate,
            String pTruckingOrderNumber,
            String pNotes,
            String pBoogingNumber



            )
        {
        int _result = 0;
            TimeSpan TodayTime = DateTime.Now.TimeOfDay;
            

            CVarST_PreGateIn objCVarST_PreGateIn = new CVarST_PreGateIn();
            objCVarST_PreGateIn.OperationID = int.Parse(pOperationID);
            objCVarST_PreGateIn.CustomerID = int.Parse(pCustomerID);
            objCVarST_PreGateIn.EntryDate = DateTime.Parse(pEnteryDate);
            objCVarST_PreGateIn.TruckingOrderNumber = pTruckingOrderNumber;
            objCVarST_PreGateIn.BoogingNumber = pBoogingNumber;

            objCVarST_PreGateIn.Notes = pNotes;
            CST_PreGateIn objCCST_PreGateIn = new CST_PreGateIn();
            objCCST_PreGateIn.lstCVarST_PreGateIn.Add(objCVarST_PreGateIn);
            Exception checkException = objCCST_PreGateIn.SaveMethod(objCCST_PreGateIn.lstCVarST_PreGateIn);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = objCVarST_PreGateIn.ID;

            GlobalVariable.HeaderID = objCVarST_PreGateIn.ID;
            return _result;
        }

        [HttpGet, HttpPost]
        public int Update
            (
            string pID ,
             string pOperationID,
            String pCustomerID,
            DateTime pEnteryDate,
            String pTruckingOrderNumber,
            String pNotes,
            String pBoogingNumber
           )
        {
            int _result = 0;

            CVarST_PreGateIn objCVarST_PreGateIn = new CVarST_PreGateIn();
            objCVarST_PreGateIn.ID = int.Parse( pID );
            objCVarST_PreGateIn.OperationID = int.Parse(pOperationID);
            objCVarST_PreGateIn.CustomerID = int.Parse(pCustomerID);
            objCVarST_PreGateIn.EntryDate = pEnteryDate;
            objCVarST_PreGateIn.TruckingOrderNumber = pTruckingOrderNumber;
            objCVarST_PreGateIn.BoogingNumber = pBoogingNumber;

            objCVarST_PreGateIn.Notes = pNotes;
            CST_PreGateIn objCCST_PreGateIn = new CST_PreGateIn();

            objCCST_PreGateIn.lstCVarST_PreGateIn.Add(objCVarST_PreGateIn);
            Exception checkException = objCCST_PreGateIn.SaveMethod(objCCST_PreGateIn.lstCVarST_PreGateIn);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = objCVarST_PreGateIn.ID;

            GlobalVariable.HeaderID = int.Parse(pID);

            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pPreGateInIDs)
        {
            bool _result = false;
            CST_PreGateIn objCST_PreGateIn = new CST_PreGateIn();
            CST_PreGateInDetails CST_PreGateInDetails = new CST_PreGateInDetails();

            var pDeleteClause = "";
            var pDeleteClauseDetailes = "";

            pDeleteClause = "WHERE ID In(" + pPreGateInIDs + ")";
            pDeleteClauseDetailes = "WHERE PreGateInID In(" + pPreGateInIDs + ")";
            var checkException = CST_PreGateInDetails.DeleteList(pDeleteClauseDetailes);
            checkException = objCST_PreGateIn.DeleteList(pDeleteClause);


            //foreach (var currentID in pSL_InvoicesIDs.Split(','))
            //{
            //    objCSL_Invoices.lstDeletedCPKSL_Invoices.Add(new CPKSL_Invoices() { ID = Int32.Parse(currentID.Trim()) });
            //}

            //Exception checkException = objCSL_Invoices.DeleteItem(objCSL_Invoices.lstDeletedCPKSL_Invoices);
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
