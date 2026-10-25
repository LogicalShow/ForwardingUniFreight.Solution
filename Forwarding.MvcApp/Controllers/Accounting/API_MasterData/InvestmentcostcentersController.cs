using Forwarding.MvcApp.Models.Sales.Transactions.Generated;
using Forwarding.MvcApp.Models.SC.MasterData.Generated;
//using Forwarding.MvcApp.Models.Sales.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

namespace Forwarding.MvcApp.Controllers.Accounting.API_MasterData
{
    public class InvestmentcostcentersController : ApiController
    {
        [HttpGet, HttpPost]
        public String deleteFromList(string pWhereClause)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string deleteFromInvoiceTaxes = objCCustomizedDBCall.CallStringFunction("deleteFromInvoiceTaxes " + pWhereClause);
            return deleteFromInvoiceTaxes;

        }
        //[HttpGet, HttpPost]
        //public Object[] A_CostCenter_ByRealCode(string pWhereClause)
        //{
        //    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
        //    DataTable DTCostCenter = objCCustomizedDBCall.ExecuteQuery_DataTable("A_CostCenter_ByRealCode " + pWhereClause);
        //    CVarA_CostCenters ObjCVarCostCenterPercentage = null;
        //    CA_CostCenters objCostCenterPercentage = new CA_CostCenters();
        //    for (int i = 0; i < DTCostCenter.Rows.Count; i++)
        //    {
        //        ObjCVarCostCenterPercentage = new CVarA_CostCenters();
        //        ObjCVarCostCenterPercentage.ID = Convert.ToInt32(DTCostCenter.Rows[i]["ID"].ToString());
        //        ObjCVarCostCenterPercentage.Percentage = Convert.ToDecimal(DTCostCenter.Rows[i]["Percentage"].ToString());
        //        objCostCenterPercentage.lstCVarA_CostCenters.Add(ObjCVarCostCenterPercentage);
        //    }
        //    return new Object[] { new JavaScriptSerializer().Serialize(objCostCenterPercentage.lstCVarA_CostCenters) };
        //}

        [HttpGet, HttpPost]
        public String deleteAllIDs(string pWhereClause)
        {
            bool _result = false;

            CA_InvestmentCostCenters objCSL_Invoices = new CA_InvestmentCostCenters();
            string pUpdateClause = "";
            pUpdateClause = " WHERE ID In(" + pWhereClause + ")";
            var checkException = objCSL_Invoices.UpdateList(pUpdateClause);


            //CA_InvestmentCostCenters cSL_InvoicesDetails = new CA_InvestmentCostCenters();

            //var pDeleteClause = "";
            //var pDeleteClauseDetailes = "";

            //// pDeleteClause = "WHERE ID In(" + pSL_InvoicesIDs + ")";
            //pDeleteClauseDetailes = "WHERE CostCenterPercentageID In(" + pWhereClause + ")";
            //checkException = cSL_InvoicesDetails.DeleteList(pDeleteClauseDetailes);
            // checkException = objCSL_Invoices.DeleteList(pDeleteClause);


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
            //else //deleted successfully
            //    _result = true;
            //return _result;


            //CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            //string deleteCostCenterPercentage = objCCustomizedDBCall.CallStringFunction("A_CostCenterPercentage_DeleteAllIDs " + pWhereClause);
            return pUpdateClause;

        }
        [HttpGet, HttpPost]
        public Object[] GetTotalCS()
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            //string dtTaxRatio = objCCustomizedDBCall.CallStringFunction("select isnull(Ratio,0) Ratio from Services s join Taxes t on s.taxID=t.ID where s.ID = " + pWhereClause);
            string TotalCS = objCCustomizedDBCall.CallStringFunction("A_InvestmentCostCentersGetTotal ");

            return new Object[] { TotalCS };

        }
        [HttpGet, HttpPost]
        public string GetListTaxID(string pWhereClause)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string dtTaxID = objCCustomizedDBCall.CallStringFunction("getTaxIdForSL_Invoices " + pWhereClause);

            return   dtTaxID ;

        }
        //[HttpGet, HttpPost]
        //public Object[] FillDAS_DisbursementJobs_FillInvoices(string pWhereClause)
        //{
        //    int _RowCount = 0;
        //    CvwA_DAS_DisbursementJobs_FillInvoices objCvwA_DAS_DisbursementJobs = new CvwA_DAS_DisbursementJobs_FillInvoices();
        //    objCvwA_DAS_DisbursementJobs.GetListPaging(9999, 1, "WHERE DisbursementJob_ID="+pWhereClause, "JobNumber", out _RowCount);
        //    return new Object[]
        //      {
        //        new JavaScriptSerializer().Serialize(objCvwA_DAS_DisbursementJobs.lstCVarvwA_DAS_DisbursementJobs_FillInvoices)
        //      };

   
        //}
        [HttpGet, HttpPost]
        public Object[] IntializeData(string pDate , string pOnlyCurrency)
        {
            int _RowCount = 0;


                //CCustomers cClients = new CCustomers();
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                CA_InvestmentCostCenters cCostCenterGroups = new CA_InvestmentCostCenters();
                CA_CostCenters cCostCenters = new CA_CostCenters();

                string CostCenter = objCCustomizedDBCall.CallStringFunction("select Top 1 NameLocal from SystemDefaults where ID = 1");
                string CostCenter2 = objCCustomizedDBCall.CallStringFunction("select Top 1 NameLocal from SystemDefaults where ID = 2");
                string CostCenter3 = objCCustomizedDBCall.CallStringFunction("select Top 1 NameLocal from SystemDefaults where ID = 3");

                string slCostCenter = objCCustomizedDBCall.CallStringFunction("select Top 1 DefaultValue from SystemDefaults where ID = 1");
                string slCostCenter2 = objCCustomizedDBCall.CallStringFunction("select Top 1 DefaultValue from SystemDefaults where ID = 2");
                string slCostCenter3 = objCCustomizedDBCall.CallStringFunction("select Top 1 DefaultValue from SystemDefaults where ID = 3");
                //CSL_InvoicesTypes cNoAccessPaymentType = new CSL_InvoicesTypes();
                //CSC_Stores cSC_Stores = new CSC_Stores();
                //CA_CostCenters cA_CostCenters = new CA_CostCenters();
                //CPurchaseItem cPurchaseItem = new CPurchaseItem();
                //CTaxeTypes cTaxeTypes = new CTaxeTypes();
                //CServices cServices = new CServices();
                //CExpenses cExpenses = new CExpenses();
                //CvwA_DAS_DisbursementJobs objCvwA_DAS_DisbursementJobs = new CvwA_DAS_DisbursementJobs();
                //CBank CBank = new CBank();
                //CvwSL_Invoices CSL_Invoices = new CvwSL_Invoices();

            
                cCostCenters.GetList("where 1 = 1");
                //cNoAccessPaymentType.GetList("where 1 = 1");
                //cSC_Stores.GetList("where 1 = 1");
                //cA_CostCenters.GetList("where 1 = 1");
                //cPurchaseItem.GetList("where 1 = 1");
                //cTaxeTypes.GetList("where isnull(IsDiscount,0) <> 1");
                //cServices.GetList("where 1 = 1");
                //cExpenses.GetList("where 1 = 1");
                //objCvwA_DAS_DisbursementJobs.GetListPaging(9999, 1, "WHERE 1=1", "JobNumber", out _RowCount);
                //CBank.GetList("where 1 = 1");
                //CSL_Invoices.GetList("where 1 = 1");

                return new Object[]
                {
                new JavaScriptSerializer().Serialize(cCostCenters.lstCVarA_CostCenters)
                //new JavaScriptSerializer().Serialize(cNoAccessPaymentType.lstCVarSL_InvoicesTypes),
                //new JavaScriptSerializer().Serialize(cSC_Stores.lstCVarSC_Stores),
                //new JavaScriptSerializer().Serialize(cA_CostCenters.lstCVarA_CostCenters) ,
                //new JavaScriptSerializer().Serialize(cPurchaseItem.lstCVarPurchaseItem) ,
                //new JavaScriptSerializer().Serialize(cTaxeTypes.lstCVarTaxeTypes) ,
                //new JavaScriptSerializer().Serialize(cServices.lstCVarServices) ,
                //new JavaScriptSerializer().Serialize(cExpenses.lstCVarExpenses),
                //new JavaScriptSerializer().Serialize(objCvwA_DAS_DisbursementJobs.lstCVarvwA_DAS_DisbursementJobs),
                //new JavaScriptSerializer().Serialize(CBank.lstCVarBank),
                //new JavaScriptSerializer().Serialize(CSL_Invoices.lstCVarvwSL_Invoices)

                };
           
        }
        [HttpGet, HttpPost]
        public Object[] FillComboDet(string pWhereClause)
        {
            int _RowCount = 0;


            //CCustomers cClients = new CCustomers();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CA_InvestmentCostCenters cCostCenterGroups = new CA_InvestmentCostCenters();
            CA_CostCenters cCostCenters = new CA_CostCenters();

            string CostCenter = objCCustomizedDBCall.CallStringFunction("select Top 1 NameLocal from SystemDefaults where ID = 1");
            string CostCenter2 = objCCustomizedDBCall.CallStringFunction("select Top 1 NameLocal from SystemDefaults where ID = 2");
            string CostCenter3 = objCCustomizedDBCall.CallStringFunction("select Top 1 NameLocal from SystemDefaults where ID = 3");

            string slCostCenter = objCCustomizedDBCall.CallStringFunction("select Top 1 DefaultValue from SystemDefaults where ID = 1");
            string slCostCenter2 = objCCustomizedDBCall.CallStringFunction("select Top 1 DefaultValue from SystemDefaults where ID = 2");
            string slCostCenter3 = objCCustomizedDBCall.CallStringFunction("select Top 1 DefaultValue from SystemDefaults where ID = 3");

            return new Object[] { CostCenter, CostCenter2, CostCenter3, slCostCenter, slCostCenter2, slCostCenter3 };




        }

        // [Route("/api/SL_Invoices/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CA_InvestmentCostCenters objCSL_DbtCrdtNotes = new CA_InvestmentCostCenters();
            //objCSL_Invoices.GetList(string.Empty);
            Int32 _RowCount = 0;// objCSL_Invoices.lstCVarSL_Invoices.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' "
                + " OR AccountName LIKE '%" + pSearchKey + "%' "
            +" OR SubAccountName LIKE '%" + pSearchKey + "%' ";

            objCSL_DbtCrdtNotes.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCSL_DbtCrdtNotes.lstCVarA_InvestmentCostCenters), _RowCount };
        }

        //[HttpGet, HttpPost]
        //public object[] LoadWithWhereClauseCostCenters( string pWhereClause)
        //{
        //    CA_InvestmentCostCenters cSL_DbtCrdtNotes = new CA_InvestmentCostCenters();

        //    cSL_DbtCrdtNotes.GetList("where ID=" + pWhereClause);
        //    var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
        //    return new Object[] { serializer.Serialize(cSL_DbtCrdtNotes.lstCVarA_InvestmentCostCenters) };
        //}
        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CA_InvestmentCostCenters cSL_DbtCrdtNotes = new CA_InvestmentCostCenters();
            Int32 _RowCount = 0;
            cSL_DbtCrdtNotes.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(cSL_DbtCrdtNotes.lstCVarA_InvestmentCostCenters), _RowCount };
        }


        //    [HttpGet, HttpPost]
        //    public object[] LoadDetails(string pWhereClause)
        //    {
        //        CSL_DbtCrdtNotesDetails cSL_DbtCrdtNotesDetails = new CSL_DbtCrdtNotesDetails();

        //        cSL_DbtCrdtNotesDetails.GetList(pWhereClause);


        //        var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
        //        return new Object[] {
        //            serializer.Serialize(cSL_DbtCrdtNotesDetails.lstCVarSL_DbtCrdtNotesDetails),
        //            };
        //}


        [HttpGet, HttpPost]
        public long Save(string pCostCenterID, string pCostCenterID2, string pCostCenterID3)
        {
        

        long _result = 1;
            //---- Get Last Code

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            //string CostCenterID1 = objCCustomizedDBCall.CallStringFunctionByMultiReturn("Select ID from A_CostCenters where ID = " + pCostCenterID1);
            //string CostCenterID2 = objCCustomizedDBCall.CallStringFunctionByMultiReturn("Select ID from A_CostCenters where ID = " + pCostCenterID2);
            //string CostCenterID3 = objCCustomizedDBCall.CallStringFunctionByMultiReturn("Select ID from A_CostCenters where ID = " + pCostCenterID3);

            if (pCostCenterID != "")
            {
                objCCustomizedDBCall.CallStringFunction("Update SystemDefaults set DefaultValue = " + pCostCenterID + " where ID = 1");
            }
            else
            {
                objCCustomizedDBCall.CallStringFunction("Update SystemDefaults set DefaultValue = 0 where ID = 1");
            }
            if (pCostCenterID2 != "")
            {
                objCCustomizedDBCall.CallStringFunction("Update SystemDefaults set DefaultValue = " + pCostCenterID2 + " where ID = 2");
            }
            else
            {
                objCCustomizedDBCall.CallStringFunction("Update SystemDefaults set DefaultValue = 0 where ID = 2");
            }
            if (pCostCenterID3 != "")
            {
                objCCustomizedDBCall.CallStringFunction("Update SystemDefaults set DefaultValue = " + pCostCenterID3 + " where ID = 3");
            }
            else
            {
                objCCustomizedDBCall.CallStringFunction("Update SystemDefaults set DefaultValue = 0 where ID = 3");
            }

            //else //not unique
                //_result = objCVarSL_Invoices.ID;
            return _result;
        }



        [HttpGet, HttpPost]
        [AllowAnonymous]
        public object[] InsertItems([FromBody]string pItems)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            var Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            var _result = false;
          var obj = new JavaScriptSerializer().Deserialize<List<object>>(pItems);
          var Obj_List_Items = obj[0];
         

          var serialize = new JavaScriptSerializer();
          var Details = serialize.Deserialize<List<CVarA_InvestmentCostCenters>>(serialize.Serialize(Obj_List_Items));
            Exception checkException = new Exception();
            CA_InvestmentCostCenters cSL_InvoicesDetails = new CA_InvestmentCostCenters();

            //delete details and add all again
            objCCustomizedDBCall.CallStringFunction("delete from A_InvestmentCostCenters");
            if (Details != null && Details.Count > 0)
                checkException = cSL_InvoicesDetails.SaveMethod(Details);
            var message = "";

            if (checkException != null)
            {
                message = "Please Insert Correct Data";
            }
            else
            {
                _result = true;
                message = "Done";

            }
                return new object[] {
                _result , message
            };
        }

        [HttpGet, HttpPost]
        public bool Delete(String pSL_InvoicesIDs)
        {
            bool _result = false;

            CA_InvestmentCostCenters objCSL_Invoices = new CA_InvestmentCostCenters();
            string pUpdateClause = "";
            pUpdateClause = " WHERE ID In(" + pSL_InvoicesIDs + ")";
            var checkException = objCSL_Invoices.UpdateList(pUpdateClause);


           // CA_CostCenterPercentage cSL_InvoicesDetails = new CA_CostCenterPercentage();
         
           // var pDeleteClause = "";
           // var pDeleteClauseDetailes = "";

           //// pDeleteClause = "WHERE ID In(" + pSL_InvoicesIDs + ")";
           // pDeleteClauseDetailes = "WHERE CostCenterPercentageID In(" + pSL_InvoicesIDs + ")";
           // checkException = cSL_InvoicesDetails.DeleteList(pDeleteClauseDetailes);
           // checkException = objCSL_Invoices.DeleteList(pDeleteClause);
           

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

        //[HttpGet, HttpPost]
        //public object[] Print(string pWhereClause)
        //{
        //    CvwSL_SL_DbtCrdtNotesRebort cSL_InvoicesDetails = new CvwSL_SL_DbtCrdtNotesRebort();
           
        //    cSL_InvoicesDetails.GetList("WHERE ID = " + pWhereClause + " AND isnull(ID , 0 ) <> 0");
        

        //    var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
        //    return new Object[] {
        //        serializer.Serialize(cSL_InvoicesDetails.lstCVarvwSL_SL_DbtCrdtNotesRebort)
        //    };
        //}
    }
}
