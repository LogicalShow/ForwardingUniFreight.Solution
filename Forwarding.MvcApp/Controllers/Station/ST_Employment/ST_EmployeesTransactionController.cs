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
using Forwarding.MvcApp.Models.Station.ST_Transactions.Generated;
using Forwarding.MvcApp.Models.Customized;

namespace Forwarding.MvcApp.Controllers.Station.ST_Employment
{
    public class ST_EmployeesTransactionController : ApiController
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
                CST_employment objCST_employment = new CST_employment();
                CST_CartoonType objCST_CartoonType = new CST_CartoonType();


                objCST_employment.GetList("where 1 = 1 AND isnull(IsInactive,0)=0");
                objCST_CartoonType.GetList("where 1 = 1");

                // cA_SubAccounts.GetList("where ID IN(select SubAccountID from BudgetsFiscal)");
                return new Object[] {new JavaScriptSerializer().Serialize(objCST_employment.lstCVarST_employment),
                new JavaScriptSerializer().Serialize(objCST_CartoonType.lstCVarST_CartoonType)};
            }
            else
            {
                CST_employment objCST_employment = new CST_employment();

                objCST_employment.GetList("where 1 = 1");
                return new Object[] {  new JavaScriptSerializer().Serialize(objCST_employment.lstCVarST_employment) };
            }
        }





        [HttpGet, HttpPost]
[AllowAnonymous]
        public object[] InsertItems([FromBody]string pItems)
{
    var _result = false;
   //  Deserialize List -------------------------------------------------------------------------------
    var Listobj = new JavaScriptSerializer().Deserialize<List<CVarST_EmployeesTransactionDetails>>(pItems);
            // Listobj = new JavaScriptSerializer().Deserialize<List<CVarSC_TransactionsDetails>>(pItems);
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            if (GlobalVariable.HeaderID != 0)
            {
                objCCustomizedDBCall.CallStringFunction("DELETE FROM ST_EmployeesTransactionDetails WHERE EmployeesTransactionID = " + GlobalVariable.HeaderID);
            }

            CST_EmployeesTransactionDetails cCBudgetsFiscalDetails = new CST_EmployeesTransactionDetails();
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
            CST_EmployeesTransaction objCBudgetsFiscal = new CST_EmployeesTransaction();
            //objCvwBudgetsFiscal.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwBudgetsFiscal.lstCVarBudgetsFiscal.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE '%" + pSearchKey + "%' ";
               

            objCBudgetsFiscal.GetListPaging(pPageSize, pPageNumber, whereClause, " ID desc ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCBudgetsFiscal.lstCVarST_EmployeesTransaction), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] LoadST_EmployeesTransactionDetails(string pWhereClause,int pType)
        {
            CvwGetST_EmployeesTransactionDetails cvwBudgetsFiscalDetails = new CvwGetST_EmployeesTransactionDetails();
            CvwGetST_EmployeesTransactionDetailsByST_employment CvwGetST_EmployeesTransactionDetailsByST_employment = new CvwGetST_EmployeesTransactionDetailsByST_employment();

            if (pType ==1 )
            {
                CvwGetST_EmployeesTransactionDetailsByST_employment.GetList(pWhereClause);

            }
            else
            {
                cvwBudgetsFiscalDetails.GetList(pWhereClause);

            }
            return new Object[] { new JavaScriptSerializer().Serialize(cvwBudgetsFiscalDetails.lstCVarvwGetST_EmployeesTransactionDetails),
                new JavaScriptSerializer().Serialize(CvwGetST_EmployeesTransactionDetailsByST_employment.lstCVarvwGetST_EmployeesTransactionDetailsByST_employment)
            };
        }


        // [Route("/api/BudgetsFiscal/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public int Insert
            (
            string pCode,
            DateTime pDate
            )
        {
        int _result = 0;
            var objlastcode = new CST_EmployeesTransaction();

            objlastcode.GetList("WHERE Code = (select max(Code) from ST_EmployeesTransaction)");

            var lastcode = objlastcode.lstCVarST_EmployeesTransaction.Count == 0 ? 0 : int.Parse(objlastcode.lstCVarST_EmployeesTransaction[0].Code);
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();


            String Code = objCCustomizedDBCall.CallStringFunction("select  isnull(max(cast(Code as numeric)),0)+1  from ST_EmployeesTransaction");

            CVarST_EmployeesTransaction objCVarST_EmployeesTransaction = new CVarST_EmployeesTransaction();
            objCVarST_EmployeesTransaction.Code = (int.Parse(Code)).ToString();
            objCVarST_EmployeesTransaction.Date = pDate;
           
            CST_EmployeesTransaction objST_EmployeesTransaction = new CST_EmployeesTransaction();
            objST_EmployeesTransaction.lstCVarST_EmployeesTransaction.Add(objCVarST_EmployeesTransaction);
            Exception checkException = objST_EmployeesTransaction.SaveMethod(objST_EmployeesTransaction.lstCVarST_EmployeesTransaction);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = objCVarST_EmployeesTransaction.ID;

            GlobalVariable.HeaderID = objCVarST_EmployeesTransaction.ID;
            return _result;
        }

        [HttpGet, HttpPost]
        public int Update
            (
            string pID ,
            string pCode,
            DateTime pDate
           )
        {
            int _result = 0;
            
            CVarST_EmployeesTransaction objCVarST_EmployeesTransaction = new CVarST_EmployeesTransaction();

            objCVarST_EmployeesTransaction.ID = int.Parse( pID );
            objCVarST_EmployeesTransaction.Code = pCode;
            objCVarST_EmployeesTransaction.Date = pDate;
            
            CST_EmployeesTransaction objST_EmployeesTransaction = new CST_EmployeesTransaction();

            objST_EmployeesTransaction.lstCVarST_EmployeesTransaction.Add(objCVarST_EmployeesTransaction);
            Exception checkException = objST_EmployeesTransaction.SaveMethod(objST_EmployeesTransaction.lstCVarST_EmployeesTransaction);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = objCVarST_EmployeesTransaction.ID;

            GlobalVariable.HeaderID = objCVarST_EmployeesTransaction.ID;

            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pST_EmployeesTransactionIDs)
        {
            bool _result = false;
            CST_EmployeesTransaction objCST_EmployeesTransaction = new CST_EmployeesTransaction();
            CST_EmployeesTransactionDetails CCST_EmployeesTransactionDetails = new CST_EmployeesTransactionDetails();

            var pDeleteClause = "";
            var pDeleteClauseDetailes = "";

            pDeleteClause = "WHERE ID In(" + pST_EmployeesTransactionIDs + ")";
            pDeleteClauseDetailes = "WHERE EmployeesTransactionID In(" + pST_EmployeesTransactionIDs + ")";
            var checkException = CCST_EmployeesTransactionDetails.DeleteList(pDeleteClauseDetailes);
            checkException = objCST_EmployeesTransaction.DeleteList(pDeleteClause);


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
