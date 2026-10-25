
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using System.Data.SqlClient;
using System.Configuration;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.SC.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.MasterData.CashAndBanks.Generated;
using Forwarding.MvcApp.Models.SL.SL_Transactions.Generated;

namespace Forwarding.MvcApp.Controllers.Sales.API_Transactions
{
    public class ClientDbtCrdtNotesController : ApiController
    {

        [HttpGet, HttpPost]
        public object[] LoadInvoicesDetailsByInvoiceID(string pWhereClause)
        {
            CvwSl_LoadSL_InvoicesDetailsByInvoiceID cSL_InvoicesDetails = new CvwSl_LoadSL_InvoicesDetailsByInvoiceID();

            cSL_InvoicesDetails.GetList(pWhereClause);


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(cSL_InvoicesDetails.lstCVarvwSl_LoadSL_InvoicesDetailsByInvoiceID)
              };
        }
        [HttpGet, HttpPost]
        public String deleteAllIDs(string pWhereClause)
        {
            bool _result = false;
            string pUpdateClause = "";

            CSL_DbtCrdtNotesDetails cSL_DbtCrdtNotesDetails = new CSL_DbtCrdtNotesDetails();
            var pDeleteClause = "";
            var pDeleteClauseDetailes = "";

            // pDeleteClause = "WHERE ID In(" + pSL_InvoicesIDs + ")";
            pDeleteClauseDetailes = "WHERE ID In(" + pWhereClause + ")";
            var checkException = cSL_DbtCrdtNotesDetails.DeleteList(pDeleteClauseDetailes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            return pUpdateClause;

        }
        [HttpGet, HttpPost]
        public String deleteFromInvoiceTaxes(string pWhereClause)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string deleteFromInvoiceTaxes = objCCustomizedDBCall.CallStringFunction("deleteFromInvoiceTaxes " + pWhereClause);
            return deleteFromInvoiceTaxes;

        }
        [HttpGet, HttpPost]
        public Object[] GetListTaxRatio(string pWhereClause)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string dtTaxRatio = objCCustomizedDBCall.CallStringFunction("select isnull(Ratio,0) Ratio from Services s join Taxes t on s.taxID=t.ID where s.ID = " + pWhereClause);
            string dtTaxID = objCCustomizedDBCall.CallStringFunction("getTaxIdForSL_Invoices " + pWhereClause);

            return new Object[] { dtTaxRatio, dtTaxID };

        }
        [HttpGet, HttpPost]
        public string GetListTaxID(string pWhereClause)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string dtTaxID = objCCustomizedDBCall.CallStringFunction("getTaxIdForSL_Invoices " + pWhereClause);

            return dtTaxID;

        }

        [HttpGet, HttpPost]
        public Object[] FillInvoiceByClient(string pWhereClause)
        {
            int _RowCount = 0;

            CSL_Invoices CSL_Invoices = new CSL_Invoices();

            CSL_Invoices.GetListPaging(9999, 1, "WHERE " + pWhereClause, "InvoiceNo", out _RowCount);

            return new Object[]
               {
                new JavaScriptSerializer().Serialize(CSL_Invoices.lstCVarSL_Invoices)
               };

        }
        [HttpGet, HttpPost]
        public Object[] IntializeData(string pDate, string pOnlyCurrency)
        {
            int _RowCount = 0;
            if (!bool.Parse(pOnlyCurrency))
            {

                //CCustomers cClients = new CCustomers();
                CCustomers cClients = new CCustomers();
                CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
                CInvoiceTypes cNoAccessPaymentType = new CInvoiceTypes();
                CSC_Stores cSC_Stores = new CSC_Stores();
                CA_CostCenters cA_CostCenters = new CA_CostCenters();
                CPurchaseItem cPurchaseItem = new CPurchaseItem();
                CTaxeTypes cTaxeTypes = new CTaxeTypes();
                CServices cServices = new CServices();
                CExpenses cExpenses = new CExpenses();
                CBanks CBank = new CBanks();
                CvwInvoices CSL_Invoices = new CvwInvoices();
            
                
                cClients.GetList("where 1 = 1");
                cCurrencies.GetList(" where  CONVERT(date , \'" + pDate + "\') between  CONVERT(date ,FromDate) and  CONVERT(date ,ToDate) ");
                cNoAccessPaymentType.GetList("where 1 = 1");
                cSC_Stores.GetList("where 1 = 1");
                cA_CostCenters.GetList("where 1 = 1");
                cPurchaseItem.GetList("where 1 = 1");
                cTaxeTypes.GetList("where isnull(IsDiscount,0) <> 1");
                cServices.GetList("where 1 = 1");
                cExpenses.GetList("where 1 = 1");
                CBank.GetList("where 1 = 1");
                CSL_Invoices.GetList("where 1 = 1");



                CA_Accounts cA_Accounts = new CA_Accounts();
                cA_Accounts.GetList(" where isnull( IsMain , 0 ) = 0 ");


                return new Object[]
                {
                new JavaScriptSerializer().Serialize(cClients.lstCVarCustomers),
                new JavaScriptSerializer().Serialize(cCurrencies.lstCVarvwCurrencyDetails),
                new JavaScriptSerializer().Serialize(cNoAccessPaymentType.lstCVarInvoiceTypes),
                new JavaScriptSerializer().Serialize(cSC_Stores.lstCVarSC_Stores),
                new JavaScriptSerializer().Serialize(cA_CostCenters.lstCVarA_CostCenters) ,
                new JavaScriptSerializer().Serialize(cPurchaseItem.lstCVarPurchaseItem) ,
                new JavaScriptSerializer().Serialize(cTaxeTypes.lstCVarTaxeTypes) ,
                new JavaScriptSerializer().Serialize(cServices.lstCVarServices) ,
                new JavaScriptSerializer().Serialize(cExpenses.lstCVarExpenses),
                new JavaScriptSerializer().Serialize(CBank.lstCVarBanks),
                new JavaScriptSerializer().Serialize(CSL_Invoices.lstCVarvwInvoices) ,
                new JavaScriptSerializer().Serialize(cA_Accounts.lstCVarA_Accounts) 
                

                };
            }
            else
            {
                CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
                cCurrencies.GetList(" where  CONVERT(date , \'" + pDate + "\') between  CONVERT(date ,FromDate) and  CONVERT(date ,ToDate) ");
                return new Object[]
                {    new JavaScriptSerializer().Serialize(cCurrencies.lstCVarvwCurrencyDetails) };
            }
        }


        // [Route("/api/SL_Invoices/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CSL_DbtCrdtNotes objCSL_DbtCrdtNotes = new CSL_DbtCrdtNotes();
            //objCSL_Invoices.GetList(string.Empty);
            Int32 _RowCount = 0;// objCSL_Invoices.lstCVarSL_Invoices.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' "
                + " OR AccountName LIKE '%" + pSearchKey + "%' "
            + " OR SubAccountName LIKE '%" + pSearchKey + "%' ";

            objCSL_DbtCrdtNotes.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCSL_DbtCrdtNotes.lstCVarSL_DbtCrdtNotes), _RowCount };
        }


        //[HttpGet, HttpPost]
        //public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        //{
        //    CvwDbtCrdtNotes cSL_DbtCrdtNotes = new CvwDbtCrdtNotes();
        //    Int32 _RowCount = 0;
      
        //    var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

        //    cSL_DbtCrdtNotes.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
        //    return new Object[] { serializer.Serialize(cSL_DbtCrdtNotes.lstCVarvwDbtCrdtNotes), _RowCount };
        //}



        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwDbtCrdtNotes cSL_DbtCrdtNotes = new CvwDbtCrdtNotes();
            Int32 _RowCount = 0;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            cSL_DbtCrdtNotes.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            return new Object[] { serializer.Serialize(cSL_DbtCrdtNotes.lstCVarvwDbtCrdtNotes), _RowCount };
        }






        [HttpGet, HttpPost]
        public object[] LoadDetails(string pWhereClause)
        {
            CSL_DbtCrdtNotesDetails cSL_DbtCrdtNotesDetails = new CSL_DbtCrdtNotesDetails();

            cSL_DbtCrdtNotesDetails.GetList(pWhereClause);


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(cSL_DbtCrdtNotesDetails.lstCVarSL_DbtCrdtNotesDetails),
                };
        }


        [HttpGet, HttpPost]
        public long Save(
            string pID,
        string pNo,
        string pAmount,
        DateTime pDate,
        string pClientID,
        string pNotes,
        string pInvoiceID,
        bool pIsApproved,
        string pJVID,
        string pCurrencyID,
        string pSerial,
        bool pisBebtCredtNot,
        string pVatAmount, string pVatPerc, string pTotal)
        {
            long _result = 0;
            //---- Get Last Code
            var objlastcode = new CSL_DbtCrdtNotes();
            CVarSL_DbtCrdtNotes objCVarSL_Invoices = new CVarSL_DbtCrdtNotes();
            if (int.Parse(pID) == 0)
            {
                objlastcode.GetList("WHERE Code = (select max(Code) from SL_DbtCrdtNotes where DATEPART(year, SL_DbtCrdtNotes.DbtCrdtNoteDate) = '" + pDate.Year + "')");
                var lastcode = objlastcode.lstCVarSL_DbtCrdtNotes.Count == 0 ? 0 : int.Parse(objlastcode.lstCVarSL_DbtCrdtNotes[0].Code);
                //----
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

                String Code = objCCustomizedDBCall.CallStringFunctionReturn("select  isnull(max(cast(Code as numeric)),0)+1  from SL_DbtCrdtNotes");


                //objCVarSL_Invoices.Code = (lastcode + 1).ToString();
                objCVarSL_Invoices.Code = Code;


            }
            else
            {
                objCVarSL_Invoices.Code = pNo;
            }
            objCVarSL_Invoices.TotalPrice = Convert.ToDecimal(pAmount);
            objCVarSL_Invoices.RemainAmount = Convert.ToDecimal(pAmount);
            objCVarSL_Invoices.PaidAmount = 0;

            objCVarSL_Invoices.DbtCrdtNoteDate = pDate;
            objCVarSL_Invoices.ClientID = int.Parse(pClientID);
            objCVarSL_Invoices.Notes = (pNotes == null ? "0" : pNotes);
            objCVarSL_Invoices.mInvoiceID = pInvoiceID == null ? 0 : int.Parse(pInvoiceID);
            objCVarSL_Invoices.IsApproved = pIsApproved;
            objCVarSL_Invoices.JVID = int.Parse(pJVID);
            objCVarSL_Invoices.CurrencyID = int.Parse(pCurrencyID);
            objCVarSL_Invoices.mSerial = (pSerial == null ? "0" : pSerial);
            objCVarSL_Invoices.mIsDbt = pisBebtCredtNot;

            objCVarSL_Invoices.VatAmount = Convert.ToDecimal(pVatAmount);
            objCVarSL_Invoices.VatPerc = Convert.ToInt32(pVatPerc);
            objCVarSL_Invoices.Total = Convert.ToDecimal(pTotal);

            objCVarSL_Invoices.ID = int.Parse(pID);
            CSL_DbtCrdtNotes objCSL_Invoices = new CSL_DbtCrdtNotes();
            objCSL_Invoices.lstCVarSL_DbtCrdtNotes.Add(objCVarSL_Invoices);
            Exception checkException = objCSL_Invoices.SaveMethod(objCSL_Invoices.lstCVarSL_DbtCrdtNotes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = objCVarSL_Invoices.ID;
            return _result;
        }



        [HttpGet, HttpPost]
        [AllowAnonymous]
        public object[] InsertItems([FromBody]string pItems)
        {
            var Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            var _result = false;
            var obj = new JavaScriptSerializer().Deserialize<List<object>>(pItems);
            var Obj_List_Items = obj[0];


            var serialize = new JavaScriptSerializer();
            var Details = serialize.Deserialize<List<CVarSL_DbtCrdtNotesDetails>>(serialize.Serialize(Obj_List_Items));
            Exception checkException = new Exception();
            CSL_DbtCrdtNotesDetails cSL_InvoicesDetails = new CSL_DbtCrdtNotesDetails();
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

            CSL_DbtCrdtNotes objCSL_Invoices = new CSL_DbtCrdtNotes();
            string pUpdateClause = "";
            pUpdateClause = " WHERE ID In(" + pSL_InvoicesIDs + ")";
            var checkException = objCSL_Invoices.UpdateList(pUpdateClause);


            CSL_DbtCrdtNotesDetails cSL_InvoicesDetails = new CSL_DbtCrdtNotesDetails();

            var pDeleteClause = "";
            var pDeleteClauseDetailes = "";

            pDeleteClause = "WHERE ID In(" + pSL_InvoicesIDs + ")";
            pDeleteClauseDetailes = "WHERE DbtCrdtNoteID In(" + pSL_InvoicesIDs + ")";
            checkException = cSL_InvoicesDetails.DeleteList(pDeleteClauseDetailes);
            checkException = objCSL_Invoices.DeleteList(pDeleteClause);


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

        [HttpGet, HttpPost]
        public object[] Print(string pWhereClause)
        {
            CvwDbtCrdtNotesReport cSL_InvoicesDetails = new CvwDbtCrdtNotesReport();

            cSL_InvoicesDetails.GetList("WHERE ID = " + pWhereClause + " AND isnull(ID , 0 ) <> 0");


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(cSL_InvoicesDetails.lstCVarvwDbtCrdtNotesReport)
            };
        }
    }
}
