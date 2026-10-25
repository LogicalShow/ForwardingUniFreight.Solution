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
using Forwarding.MvcApp.Models.SC.Transactions.Generated;
using Forwarding.MvcApp.Controllers.Operations.API_Operations;

namespace Forwarding.MvcApp.Controllers.Station.ST_Transactions
{
    public class PackingController : ApiController
    {
        public static class GlobalVariable
        {
            public static int HeaderID = 0; // Unmodifiable


        }

        [HttpGet, HttpPost]
        public Object[] SetSize(string pItemID)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string Volume = objCCustomizedDBCall.CallStringFunction("SetSize " + pItemID);


            return new Object[] { Volume };

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


                CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();
                cPurchaseItem.GetList("where 1 = 1");

                CSC_Stores cSC_Stores = new CSC_Stores();
                cSC_Stores.GetList("where 1 = 1");

                CCommodities objCCommodities = new CCommodities();
                objCCommodities.GetList("where 1 = 1 ");

                CST_WeightType objCST_WeightType = new CST_WeightType();
                objCST_WeightType.GetList("where 1 = 1 ");



        

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
                    new JavaScriptSerializer().Serialize(objCvwOperations.lstCVarvwOperations), //0
                    new JavaScriptSerializer().Serialize(objCCustomers.lstCVarCustomers),//1
                    new JavaScriptSerializer().Serialize(objCPackageTypes.lstCVarPackageTypes),//2
                    new JavaScriptSerializer().Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItem),//3
                    new JavaScriptSerializer().Serialize(objCCommodities.lstCVarCommodities),//4
                    new JavaScriptSerializer().Serialize(objCST_WeightType.lstCVarST_WeightType),//5
                    new JavaScriptSerializer().Serialize(cSC_Stores.lstCVarSC_Stores),//6
           
    

                   


                    new JavaScriptSerializer().Serialize(objCFiscalYears.lstCVarA_Fiscal_Year), new JavaScriptSerializer().Serialize(cBudgets.lstCVarBudgets) };
            }
            else
            {
                CA_SubAccounts cA_SubAccounts = new CA_SubAccounts();
                cA_SubAccounts.GetList("where Parent_ID = " + pID + "");
                return new Object[] { new JavaScriptSerializer().Serialize(cA_SubAccounts.lstCVarA_SubAccounts) };
            }
        }

        [HttpGet, HttpPost]
        public Object[] LoadPackingDetails(string pWhereClause) //pID : AccountID
        {

			CvwST_PackingDetails objCvwST_PackingDetails = new CvwST_PackingDetails();
			objCvwST_PackingDetails.GetList(pWhereClause);

            string[] _whereClause = pWhereClause.Split('=');

            if(!int.TryParse(_whereClause[1], out _))
            {
                return new Object[] { new JavaScriptSerializer().Serialize(objCvwST_PackingDetails.lstCVarvwST_PackingDetails), "" };
            }

            int _packingID = int.Parse(_whereClause[1]);

            CCustomizedDBCall getEntryDate = new CCustomizedDBCall();
            string _entryDate = getEntryDate.CallStringFunction($"select FORMAT(EntryDate, 'dd/MM/yyyy') from ST_GateIn where id=(select ST_GateInID from ST_GateInDetails where id=(select top 1 GateInDetailsID from ST_PackingDetails where ST_PackingID={_packingID}))");

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwST_PackingDetails.lstCVarvwST_PackingDetails), _entryDate };

        }



        [HttpGet, HttpPost]
        //abdooo
        public Object[] TransactiondetailsInsert(decimal pQty13, decimal pQty14, decimal pQty15, decimal pQty16, decimal pQty17, decimal pQty18, int pStoreID, string pNotes, int pSLInvoiceDetailsID, DateTime pTransactionDate) //pID : AccountID
        {

            CSC_TransactionsDetails cSC_TransactionsDetails = new CSC_TransactionsDetails();
            var checkException = cSC_TransactionsDetails.UpdateList("IsDeleted = 1  WHERE P_LiterCost = " + pSLInvoiceDetailsID + " AND  TransactionTypeID = 20 AND isnull(IsDeleted , 0 ) = 0 ");
            //CSC_Transactions cSC_Transactions = new CSC_Transactions();
            //checkException = cSC_Transactions.UpdateList("IsDeleted = 1  WHERE P_LiterCost = " + pSLInvoiceDetailsID);

            string Volume = "error";

            if (checkException == null)
            {
                int pTransactionID = 0;
                var objcondtion = new CSC_Transactions();
                objcondtion.GetList("WHERE isnull(IsDeleted , 0 ) = 0 and P_ProductionRequestID =  " + pSLInvoiceDetailsID + " and TransactionTypeID = " + 20);
                if (objcondtion.lstCVarSC_Transactions[0].ID != 0)
                {
                    pTransactionID = objcondtion.lstCVarSC_Transactions[0].ID;

                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    Volume = objCCustomizedDBCall.CallStringFunction("TransactiondetailsInsert " + pTransactionID + ",'" + pQty13 + "' , '" + pQty14 + "', '" + pQty15 + "', '" + pQty16 + "', '" + pQty17 + "', '" + pQty18 + "'," + pStoreID + "," + pNotes + "," + pSLInvoiceDetailsID + ",'" + pTransactionDate + "'," + 20);


                }

                else
                {
                    Volume = "There No Master Data ID  " + pSLInvoiceDetailsID;
                }

            }
            else
            {
                Volume = checkException.Message;
            }





            return new Object[] { Volume };
        }




        [HttpGet, HttpPost]
        //abdooo
        public Object[] Receivables_AGRInsert ( Int32 pOperationID, Int32 pContainerID)
        {

            CReceivables objCvwReceivables = new CReceivables();

            //objCvwReceivables_AGR.GetList(" where OperationID  = " + pOperationID );

   
            var checkException = objCvwReceivables.DeleteList("where InvoiceID is null and DraftInvoiceID is null and AccNoteID is null and CreatorUserID is null and ModificatorUserID is null and OperationID  = " + pOperationID + " AND OperationContainersAndPackagesID = "+ pContainerID);
            /*CReceivables objCReceivables = new CReceivables();
            objCReceivables.GetList($"WHERE OperationID={pOperationID} AND OperationContainersAndPackagesID={pContainerID}");
            if(objCReceivables.lstCVarReceivables.Count > 0)
            {
                return new Object[] { "Packing generated receivables is edited or in invoice" };
            }*/

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string Volume = objCCustomizedDBCall.CallStringFunction("INSERT_INTO_Receivables_AGR  " + pOperationID + " ,"+ pContainerID);


            return new Object[] { Volume };

        }

        [HttpGet, HttpPost]
        //abdooo
        public Object[] TransactionInsert(DateTime pTransactionDate, string pNotes, int pSLInvoiceID, int pClientID) //pID : AccountID
        {


            string Volume = "error";
            TimeSpan LastDayTime = new TimeSpan(19, 0, 0);
            CSC_Transactions objCSC_Transactions = new CSC_Transactions();
            string pUpdateClause = "";
            pUpdateClause = " IsDeleted = 1 "
             + " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString()
             + " , ModificationDate = GETDATE() "
             + " WHERE P_ProductionRequestID =" + pSLInvoiceID + " AND  TransactionTypeID = 20 And isnull(IsDeleted , 0 ) = 0 ";

            var checkException = objCSC_Transactions.UpdateList(pUpdateClause);

            if (checkException == null)
            {
                CVarSC_Transactions cVarSC_Transactions = new CVarSC_Transactions();
                var objlastcode = new CSC_Transactions();
                var objcondtion = new CSC_Transactions();
                objcondtion.GetList("WHERE isnull(IsDeleted , 0 ) = 0 and P_ProductionRequestID =  " + pSLInvoiceID + " and TransactionTypeID = " + 20);
                objlastcode.GetList("WHERE ID = (select max(ID) from SC_Transactions where isnull(IsDeleted , 0 ) = 0 and TransactionTypeID = " + 20 + " and  DATEPART(year, SC_Transactions.TransactionDate) = '" + pTransactionDate.Year + "')");

                var lastcode = objlastcode.lstCVarSC_Transactions.Count == 0 ? 0 : int.Parse(objlastcode.lstCVarSC_Transactions[0].Code);
                var pCode = (lastcode + 1).ToString();

                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                 Volume = objCCustomizedDBCall.CallStringFunction("TransactionInsert " + pCode + ",'" + pTransactionDate  + "', N'" + pNotes + "'," + pSLInvoiceID + "," + pClientID);


            }
            else
            {
                Volume = checkException.Message;
            }
            
            return new Object[] { Volume };

        }


    










        [HttpGet, HttpPost]
[AllowAnonymous]
        public object[] InsertItems([FromBody]string pItems)
{
    var _result = false;
   //  Deserialize List -------------------------------------------------------------------------------
    var Listobj = new JavaScriptSerializer().Deserialize<List<CVarST_PackingDetails>>(pItems);
            // Listobj = new JavaScriptSerializer().Deserialize<List<CVarSC_TransactionsDetails>>(pItems);
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            if (GlobalVariable.HeaderID != 0)
            {
                objCCustomizedDBCall.CallStringFunction("DELETE FROM ST_PackingDetails WHERE ST_PackingID = " + GlobalVariable.HeaderID);
            }

            CST_PackingDetails cCST_PackingDetails = new CST_PackingDetails();
            var checkException = cCST_PackingDetails.SaveMethod(Listobj);
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
            CvwST_GateInDetails cobjCST_PackingDetails = new CvwST_GateInDetails();
            cobjCST_PackingDetails.GetList("where ISNULL(isGateIn,0) = 1");
            return new Object[] { new JavaScriptSerializer().Serialize(cobjCST_PackingDetails.lstCVarvwST_GateInDetails) };

        }

        [HttpGet, HttpPost]
        public Object[] LoadST_Packing(string pWhereClause)
        {


            CSp_Packing cobjCSp_Packing = new CSp_Packing();
            cobjCSp_Packing.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(cobjCSp_Packing.lstCVarSp_Packing) };


          
        }

        public Object[] LoadST_PackingDetails(string pWhereClause)
        {
            CST_PackingDetails cobjCST_PackingDetails = new CST_PackingDetails();
            cobjCST_PackingDetails.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(cobjCST_PackingDetails.lstCVarST_PackingDetails) };
        }


        // [Route("/api/BudgetsFiscal/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public int Insert
            (


            DateTime pDate,
            String pNotes,
            String pOperationID,
            String pPO,
			 string pLot

			)
        {
        int _result = 0;
            TimeSpan TodayTime = DateTime.Now.TimeOfDay;
            

            CVarST_Packing objCVarST_Packing = new CVarST_Packing();

            var objlastcode = new CST_Packing();

            objlastcode.GetList("WHERE Code = (select max(Code) from ST_Packing)");

            var lastcode = objlastcode.lstCVarST_Packing.Count == 0 ? 0 : objlastcode.lstCVarST_Packing[0].Code;

            objCVarST_Packing.Code = (lastcode + 1);

            objCVarST_Packing.Date = pDate.Date   ;

            objCVarST_Packing.Note = pNotes;
            objCVarST_Packing.Lot = pLot;
            objCVarST_Packing.PO = pPO;
            objCVarST_Packing.OperationID =Convert.ToInt32(pOperationID);

            CST_Packing objCCST_Packing = new CST_Packing();
            objCCST_Packing.lstCVarST_Packing.Add(objCVarST_Packing);
            Exception checkException = objCCST_Packing.SaveMethod(objCCST_Packing.lstCVarST_Packing);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = objCVarST_Packing.ID;

            GlobalVariable.HeaderID = objCVarST_Packing.ID;
            return _result;
        }

        [HttpGet, HttpPost]
        public int Update
            (
            string pID ,
            DateTime pDate,
            String pNotes,
            String pOperationID,
             String pPO,
			 string pLot
		   )
        {
            int _result = 0;

            CVarST_Packing objCVarST_Packing = new CVarST_Packing();

            objCVarST_Packing.ID = int.Parse( pID );
            // ---------------- get Code ---------- 
            var objlastcode = new CST_Packing();
            objlastcode.GetList("WHERE id = 0" + pID);
            var lastcode = objlastcode.lstCVarST_Packing.Count == 0 ? 0 : objlastcode.lstCVarST_Packing[0].Code;
            objCVarST_Packing.Code = lastcode;
            objCVarST_Packing.Date = pDate.Date;
            objCVarST_Packing.Note = pNotes;
			objCVarST_Packing.Lot = pLot;
			objCVarST_Packing.PO = pPO;
            objCVarST_Packing.OperationID = Convert.ToInt32(pOperationID);


            CST_Packing objCCST_Packing = new CST_Packing();

            objCCST_Packing.lstCVarST_Packing.Add(objCVarST_Packing);
            Exception checkException = objCCST_Packing.SaveMethod(objCCST_Packing.lstCVarST_Packing);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = objCVarST_Packing.ID;

            GlobalVariable.HeaderID = int.Parse(pID);

            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pPackingIDs)
        {
            bool _result = false;
            CST_Packing objCST_Packing = new CST_Packing();
            CST_PackingDetails CST_PackingDetails = new CST_PackingDetails();

            var pDeleteClause = "";
            var pDeleteClauseDetailes = "";

            pDeleteClause = "WHERE ID In(" + pPackingIDs + ")";
            pDeleteClauseDetailes = "WHERE ST_PackingID In(" + pPackingIDs + ")";
            var checkException = CST_PackingDetails.DeleteList(pDeleteClauseDetailes);
            checkException = objCST_Packing.DeleteList(pDeleteClause);

            if (checkException == null)
            {
                CSC_Transactions objCSC_Transactions = new CSC_Transactions();
                string pUpdateClause = "";
                pUpdateClause = " IsDeleted = 1 "
                 + " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString()
                 + " , ModificationDate = GETDATE() "   
                 + " WHERE P_ProductionRequestID =" + pPackingIDs + " AND  TransactionTypeID = 20 And isnull(IsDeleted , 0 ) = 0 ";
                checkException = objCSC_Transactions.UpdateList(pUpdateClause);

                CSC_TransactionsDetails cSC_TransactionsDetails = new CSC_TransactionsDetails();
                var checkException1 = cSC_TransactionsDetails.UpdateList("IsDeleted = 1  WHERE P_LiterCost = " + pPackingIDs + " AND  TransactionTypeID = 20 And isnull(IsDeleted , 0 ) = 0 ");



            }





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
