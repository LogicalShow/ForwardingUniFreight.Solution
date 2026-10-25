using Forwarding.MvcApp.Models.PS.PS_Transactions.Generated;
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
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using System.Data.SqlClient;
using System.Configuration;
using Forwarding.MvcApp.Models.SL.SL_Transactions.Generated;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;

namespace Forwarding.MvcApp.Controllers.PS.API_PS_Transactions
{
    public class PS_ClientDbtCrdtNotesController : ApiController
    {
        [HttpGet, HttpPost]

        public Object[] A_A_JobAccountRequiredCheck(string pAccountIDs)
        {
            string _result = "";
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string dt = objCCustomizedDBCall.CallStringFunction("A_A_JobAccountRequiredDCNotesCheck " + "'," + pAccountIDs + ",'");
            if (dt != "")
            {
                _result = dt;
            }
            else
            {
                _result = dt;
            }
            return new Object[] { _result };

        }
        [HttpGet, HttpPost]
        public String deleteAllIDs(string pWhereClause)
        {
            bool _result = false;
            string pUpdateClause = "";

            CPS_ClientDbtCrdtNotesDetails cClientDbtCrdtNotesServicesDetails = new CPS_ClientDbtCrdtNotesDetails();
            var pDeleteClause = "";
            var pDeleteClauseDetailes = "";

            // pDeleteClause = "WHERE ID In(" + pSL_InvoicesIDs + ")";
            pDeleteClauseDetailes = "WHERE ID In(" + pWhereClause + ")";
            var checkException = cClientDbtCrdtNotesServicesDetails.DeleteList(pDeleteClauseDetailes);
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
        //[HttpGet, HttpPost]
        //public Object[] FillDAS_DisbursementJobs_FillInvoices(string pWhereClause)
        //{
        //    int _RowCount = 0;
        //    CvwA_DAS_DisbursementJobs_FillInvoices objCvwA_DAS_DisbursementJobs = new CvwA_DAS_DisbursementJobs_FillInvoices();
        //    objCvwA_DAS_DisbursementJobs.GetListPaging(9999, 1, "WHERE DisbursementJob_ID=" + pWhereClause, "JobNumber", out _RowCount);
        //    return new Object[]
        //      {
        //        new JavaScriptSerializer().Serialize(objCvwA_DAS_DisbursementJobs.lstCVarvwA_DAS_DisbursementJobs_FillInvoices)
        //      };


        //}
        [HttpGet, HttpPost]
        public Object[] FillInvoiceByClient(string pWhereClause)
        {
            int _RowCount = 0;

            CPS_Invoices CSL_Invoices = new CPS_Invoices();

            CSL_Invoices.GetListPaging(9999, 1, "WHERE " + pWhereClause, "ID", out _RowCount);

            return new Object[]
               {
                new JavaScriptSerializer().Serialize(CSL_Invoices.lstCVarPS_Invoices),
               };

        }
        [HttpGet, HttpPost]
        public Object[] IntializeData(string pDate, string pOnlyCurrency)
        {
            int _RowCount = 0;
            if (!bool.Parse(pOnlyCurrency))
            {

                //CCustomers cClients = new CCustomers();
                CSuppliers cClients = new CSuppliers();
                CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
                CInvoiceTypes cNoAccessPaymentType = new CInvoiceTypes();
                CSC_Stores cSC_Stores = new CSC_Stores();
                CA_CostCenters cA_CostCenters = new CA_CostCenters();
                CvwSC_PurchaseItemPS cPurchaseItem = new CvwSC_PurchaseItemPS();
                CTaxeTypes cTaxeTypes = new CTaxeTypes();
                CServices cServices = new CServices();
                // CExpenses cExpenses = new CExpenses();
                CBankAccount CBank = new CBankAccount();
                CvwPS_Invoices CSL_Invoices = new CvwPS_Invoices();

                cClients.GetList("where 1 = 1");
                cCurrencies.GetList(" where  CONVERT(date , \'" + pDate + "\') between  CONVERT(date ,FromDate) and  CONVERT(date ,ToDate) ");
                cNoAccessPaymentType.GetList("where 1 = 1");
                cSC_Stores.GetList("where 1 = 1");
                cA_CostCenters.GetList("where 1 = 1");
                cPurchaseItem.GetList("where 1 = 1");
                cTaxeTypes.GetList("where isnull(IsDiscount,0) <> 1");
                cServices.GetList("where 1 = 1");
                //objCvwA_DAS_DisbursementJobs.GetListPaging(9999, 1, "WHERE 1=1", "JobNumber", out _RowCount);
                CBank.GetList("where 1 = 1");
                //CSL_Invoices.GetList("where 1 = 1");


                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new Object[]
                {
                serializer.Serialize(cClients.lstCVarSuppliers),
                serializer.Serialize(cCurrencies.lstCVarvwCurrencyDetails),
                serializer.Serialize(cNoAccessPaymentType.lstCVarInvoiceTypes),
                serializer.Serialize(cSC_Stores.lstCVarSC_Stores),
                serializer.Serialize(cA_CostCenters.lstCVarA_CostCenters) ,
                serializer.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItemPS) ,
                serializer.Serialize(cTaxeTypes.lstCVarTaxeTypes) ,
                serializer.Serialize(cServices.lstCVarServices) ,
                serializer.Serialize(CBank.lstCVarBankAccount),

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
            CPS_ClientDbtCrdtNotes objCClientDbtCrdtNotesServices = new CPS_ClientDbtCrdtNotes();
            //objCSL_Invoices.GetList(string.Empty);
            Int32 _RowCount = 0;// objCSL_Invoices.lstCVarSL_Invoices.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' "
                + " OR AccountName LIKE '%" + pSearchKey + "%' "
            + " OR SubAccountName LIKE '%" + pSearchKey + "%' ";

            objCClientDbtCrdtNotesServices.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCClientDbtCrdtNotesServices.lstCVarPS_ClientDbtCrdtNotes), _RowCount };
        }
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CvwPS_ClientDbtCrdtNotes objCClientDbtCrdtNotesServices = new CvwPS_ClientDbtCrdtNotes();
            Int32 _RowCount = 0;
            //if (pIsLoadArrayOfObjects)
            //{
            //}

            objCClientDbtCrdtNotesServices.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCClientDbtCrdtNotesServices.lstCVarvwPS_ClientDbtCrdtNotes)
                , _RowCount

            };
        }


        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwPS_ClientDbtCrdtNotes cClientDbtCrdtNotesServices = new CvwPS_ClientDbtCrdtNotes();
            Int32 _RowCount = 0;
            cClientDbtCrdtNotesServices.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(cClientDbtCrdtNotesServices.lstCVarvwPS_ClientDbtCrdtNotes), _RowCount };
        }


        [HttpGet, HttpPost]
        public object[] LoadDetails(string pWhereClause)
        {
            CPS_ClientDbtCrdtNotesDetails cClientDbtCrdtNotesServicesDetails = new CPS_ClientDbtCrdtNotesDetails();

            cClientDbtCrdtNotesServicesDetails.GetList(pWhereClause);


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(cClientDbtCrdtNotesServicesDetails.lstCVarPS_ClientDbtCrdtNotesDetails),
                };
        }
        [HttpGet, HttpPost]
        public object[] LoadInvoicesDetailsByInvoiceID(string pWhereClause)
        {
            CvwSl_LoadSL_InvoicesDetailsCDByInvoiceID cSL_InvoicesDetails = new CvwSl_LoadSL_InvoicesDetailsCDByInvoiceID();
            CPS_Invoices objCCSL_Invoices = new CPS_Invoices();

            cSL_InvoicesDetails.GetList(pWhereClause);

            if (cSL_InvoicesDetails.lstCVarvwSl_LoadSL_InvoicesDetailsCDByInvoiceID.Count >0)
            {
                objCCSL_Invoices.GetList("where id="+ cSL_InvoicesDetails.lstCVarvwSl_LoadSL_InvoicesDetailsCDByInvoiceID[0].InvoiceID);

            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(cSL_InvoicesDetails.lstCVarvwSl_LoadSL_InvoicesDetailsCDByInvoiceID),
                new JavaScriptSerializer().Serialize(objCCSL_Invoices.lstCVarPS_Invoices)

              };
        }
        [HttpGet, HttpPost]
        public Object[] GetCode(DateTime pDate,bool isdc)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string pNewCode = "";
            pNewCode = objCCustomizedDBCall.CallStringFunction("PSDbtCrdtNotes_GetCode '" + pDate + "'" + "," + isdc);

            return new object[] {
                pNewCode //pNewCode = pData[0]
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
        string pJobID, bool pisBebtCredtNot,string pBankID, DateTime pDueDate,string pNetPriceValue, string pTotalTaxesItem, string pPriceValue
            , string pDiscount,
        string pDiscountPercentage, Boolean pISRatio)
        {
            //Get Grace Period
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string GracePeriod = "0";// objCCustomizedDBCall.CallStringFunction("SELECT isnull(sc.GracePeriod,0) FROM SL_Clients AS sc WHERE sc.ID= " + pClientID);

            long _result = 0;
            //---- Get Last Code
            var objlastcode = new CPS_ClientDbtCrdtNotes();
            CVarPS_ClientDbtCrdtNotes objCVarSL_Invoices = new CVarPS_ClientDbtCrdtNotes();
            if (int.Parse(pID) == 0)
            {
                var lastcode = Convert.ToString(GetCode(pDate, pisBebtCredtNot)[0]);
                //objlastcode.GetList("WHERE Code = (select max(Code) from ClientDbtCrdtNotesServices where DATEPART(year, ClientDbtCrdtNotesServices.DbtCrdtNoteDate) = '" + pDate.Year + "')");
                //var lastcode = objlastcode.lstCVarClientDbtCrdtNotesServices.Count == 0 ? 0 : int.Parse(objlastcode.lstCVarClientDbtCrdtNotesServices[0].Code);
                //----

                objCVarSL_Invoices.Code = (lastcode).ToString();
            }
            else
            {
                objCVarSL_Invoices.Code = pNo;
            }
            objCVarSL_Invoices.TotalPrice = Convert.ToDecimal(pNetPriceValue);
            objCVarSL_Invoices.RemainAmount = Convert.ToDecimal(pAmount);
            objCVarSL_Invoices.PaidAmount = 0;

            objCVarSL_Invoices.DbtCrdtNoteDate = pDate;
            objCVarSL_Invoices.SupplierID = int.Parse(pClientID);
            objCVarSL_Invoices.Notes = (pNotes == null ? "0" : pNotes);
            objCVarSL_Invoices.InvoiceID = pInvoiceID == null ? 0 : int.Parse(pInvoiceID);
            objCVarSL_Invoices.IsApproved = pIsApproved;
            objCVarSL_Invoices.JVID = int.Parse(pJVID);
            objCVarSL_Invoices.CurrencyID = int.Parse(pCurrencyID);
            objCVarSL_Invoices.mSerial = (pSerial == null ? "0" : pSerial);
            objCVarSL_Invoices.mDisbursementJob_ID = 0;
            objCVarSL_Invoices.mIsDbt = pisBebtCredtNot;
            objCVarSL_Invoices.BankID = int.Parse("0");
            objCVarSL_Invoices.DueDate = pDueDate.AddDays(int.Parse(GracePeriod));
            objCVarSL_Invoices.TotalPrice = decimal.Parse(pNetPriceValue);
            objCVarSL_Invoices.TaxAmount = decimal.Parse(pTotalTaxesItem);
            objCVarSL_Invoices.TotalAfterTax = decimal.Parse(pPriceValue);
            
            objCVarSL_Invoices.isDiscount = pISRatio;
            objCVarSL_Invoices.Discount = decimal.Parse(pDiscount);
            objCVarSL_Invoices.DiscountPercentege = int.Parse(pDiscountPercentage);

            objCVarSL_Invoices.ID = int.Parse(pID);
            CPS_ClientDbtCrdtNotes objCSL_Invoices = new CPS_ClientDbtCrdtNotes();
            objCSL_Invoices.lstCVarPS_ClientDbtCrdtNotes.Add(objCVarSL_Invoices);
            Exception checkException = objCSL_Invoices.SaveMethod(objCSL_Invoices.lstCVarPS_ClientDbtCrdtNotes);
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
            var Details = serialize.Deserialize<List<CVarPS_ClientDbtCrdtNotesDetails>>(serialize.Serialize(Obj_List_Items));
            Exception checkException = new Exception();
            CPS_ClientDbtCrdtNotesDetails cSL_InvoicesDetails = new CPS_ClientDbtCrdtNotesDetails();
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

            CPS_ClientDbtCrdtNotes objCSL_Invoices = new CPS_ClientDbtCrdtNotes();
            string pUpdateClause = "";
            pUpdateClause = " WHERE ID In(" + pSL_InvoicesIDs + ")";
            var checkException = objCSL_Invoices.DeleteList(pUpdateClause);


            CPS_ClientDbtCrdtNotesDetails cSL_InvoicesDetails = new CPS_ClientDbtCrdtNotesDetails();

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

        //[HttpGet, HttpPost]
        //public object[] Print(string pWhereClause)
        //{
        //    CvwSL_SL_DbtCrdtNotesRebortServices cSL_InvoicesDetails = new CvwSL_SL_DbtCrdtNotesRebortServices();

        //    cSL_InvoicesDetails.GetList("WHERE ID = " + pWhereClause + " AND isnull(ID , 0 ) <> 0");


        //    var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
        //    return new Object[] {
        //        serializer.Serialize(cSL_InvoicesDetails.lstCVarvwSL_SL_DbtCrdtNotesRebortServices)
        //    };
        //}
    }
}
