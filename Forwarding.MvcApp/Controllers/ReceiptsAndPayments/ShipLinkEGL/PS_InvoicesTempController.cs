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
using Forwarding.MvcApp.Models.PS.PS_Transactions.Generated;

using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using System.Data.SqlClient;
using System.Configuration;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Customized;
using Shipping.MvcApp.Models.Purchasing.PS_Transactions.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkEGL.Generated;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public static class GlobalVariable
    {
        public static bool IsCalc = false; // Unmodifiable

    }
    public class PS_InvoicesTempController : ApiController
    {
        [HttpGet, HttpPost]
        public String deleteFromInvoiceTaxes(string pWhereClause)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string deleteFromInvoiceTaxes = objCCustomizedDBCall.CallStringFunction("deleteFromPSInvoiceTaxes " + pWhereClause);
            return deleteFromInvoiceTaxes;

        }
        [HttpGet, HttpPost]
        public Object[] CheckForSupplierInvoiceNo(string pSupplierInvoiceNo,Int32 pID,Int32 pSupplierID)
        {

            CPS_InvoicesTemp objCPS_InvoicesTemp = new CPS_InvoicesTemp();
            if (pID==0)
            {
                objCPS_InvoicesTemp.GetList("where SupplierInvoiceNo='" + pSupplierInvoiceNo + "'" + " and SupplierID=" + pSupplierID);

            }
            return new Object[] { new JavaScriptSerializer().Serialize(objCPS_InvoicesTemp.lstCVarPS_InvoicesTemp)};

        }
  
        [HttpGet, HttpPost]
        public String deleteAllSelectedDetailesIDs(string pWhereClause)
        {
            bool _result = false;
            string pUpdateClause = "";
            CPS_InvoicesDetailsTemp cPS_InvoicesDetailsTemp = new CPS_InvoicesDetailsTemp();
            var pDeleteClause = "";
            var pDeleteClauseDetailes = "";
            pDeleteClauseDetailes = "WHERE ID In(" + pWhereClause + ")";
            var checkException = cPS_InvoicesDetailsTemp.DeleteList(pDeleteClauseDetailes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            return pUpdateClause;

        }
        [HttpGet, HttpPost]
        public Object[] IntializeData(string pDate , string pOnlyCurrency)
        {
            int _RowCount = 0;

            if (!bool.Parse(pOnlyCurrency))
            {

                CSuppliers cSuppliers = new CSuppliers();
                CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
                CSC_Stores cSC_Stores = new CSC_Stores();
                CA_CostCenters cA_CostCenters = new CA_CostCenters();
                CPurchaseItem cPurchaseItem = new CPurchaseItem();
                CTaxeTypes cTaxeTypes = new CTaxeTypes();
                CServicesTemp cServices = new CServicesTemp();
                CExpenses cExpenses = new CExpenses();
                CvwA_DAS_DisbursementJobs objCvwA_DAS_DisbursementJobs = new CvwA_DAS_DisbursementJobs();

                cSuppliers.GetList("where 1 = 1 order by name");
                cCurrencies.GetList(" where  CONVERT(date , \'" + pDate + "\') between  CONVERT(date ,FromDate) and  CONVERT(date ,ToDate) ");

                cSC_Stores.GetList("where 1 = 1");
                cA_CostCenters.GetList("where 1 = 1");
                cPurchaseItem.GetList("where 1 = 1");
                cTaxeTypes.GetList("where isnull(IsDiscount,0) <> 1");
                cServices.GetList("where 1 = 1");
               // cServices.GetList("where 1 = 1 AND IsPurchase=1");

                cExpenses.GetList("where 1 = 1");
                objCvwA_DAS_DisbursementJobs.GetListPaging(9999, 1, "WHERE 1=1", "JobNumber", out _RowCount);


                return new Object[]
                {
                new JavaScriptSerializer().Serialize(cSuppliers.lstCVarSuppliers),
                new JavaScriptSerializer().Serialize(cCurrencies.lstCVarvwCurrencyDetails),
                new JavaScriptSerializer().Serialize(cSC_Stores.lstCVarSC_Stores),
                new JavaScriptSerializer().Serialize(cA_CostCenters.lstCVarA_CostCenters) ,
                new JavaScriptSerializer().Serialize(cPurchaseItem.lstCVarPurchaseItem) ,
                new JavaScriptSerializer().Serialize(cTaxeTypes.lstCVarTaxeTypes) ,
                new JavaScriptSerializer().Serialize(cServices.lstCVarServicesTemp) ,
                new JavaScriptSerializer().Serialize(cExpenses.lstCVarExpenses),
                new JavaScriptSerializer().Serialize(objCvwA_DAS_DisbursementJobs.lstCVarvwA_DAS_DisbursementJobs)

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

        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            // CPS_InvoicesTemp objCPS_InvoicesTemp = new CPS_InvoicesTemp();
            CvwPS_InvoicesTemp objCPS_InvoicesTemp = new CvwPS_InvoicesTemp();

            
            Int32 _RowCount = 0;
            if (pIsLoadArrayOfObjects)
            {
                objCPS_InvoicesTemp.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);

            }


            return new object[] {
                new JavaScriptSerializer().Serialize(objCPS_InvoicesTemp.lstCVarvwPS_InvoicesTemp)
                , _RowCount

            };
        }
        // [Route("/api/PS_InvoicesTemp/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CPS_InvoicesTemp objCPS_InvoicesTemp = new CPS_InvoicesTemp();
            //objCPS_InvoicesTemp.GetList(string.Empty);
            Int32 _RowCount = 0;// objCPS_InvoicesTemp.lstCVarPS_InvoicesTemp.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' "
                + " OR AccountName LIKE '%" + pSearchKey + "%' "
            +" OR SubAccountName LIKE '%" + pSearchKey + "%' ";

            objCPS_InvoicesTemp.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCPS_InvoicesTemp.lstCVarPS_InvoicesTemp), _RowCount };
        }


        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwPS_InvoicesTemp cPS_InvoicesTemp = new CvwPS_InvoicesTemp();
            Int32 _RowCount = 0;
            cPS_InvoicesTemp.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(cPS_InvoicesTemp.lstCVarvwPS_InvoicesTemp), _RowCount };
        }


        [HttpGet, HttpPost]
        public object[] LoadDetails(string pWhereClause)
        {
            CPS_InvoicesDetailsTemp cPS_InvoicesDetailsTemp = new CPS_InvoicesDetailsTemp();
            cPS_InvoicesDetailsTemp.GetList(pWhereClause);
            
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(cPS_InvoicesDetailsTemp.lstCVarPS_InvoicesDetailsTemp),
               };
        }

        [HttpGet, HttpPost]
        public Object[] GetCode(DateTime pDate)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string pNewCode = "";
            pNewCode = objCCustomizedDBCall.CallStringFunction("PS_InvoicesTemp_GetCode '" + pDate + "'");


             return new object[] {
                pNewCode //pNewCode = pData[0]
            };
        }
        [HttpGet, HttpPost]
        public long Save(
            string pID ,
        string pInvoiceNo,
        DateTime pInvoiceDate,
        string pQuotationID,
        string pSupplierID,
        string pTotalBeforTax,
        string pTotalPrice,
        string pDiscount,
        string pDiscountPercentage,
        string pNotes,
        string pDepartmentID,
        string pSalesManID,
        string pCostCenter_ID,
        string pPaymentMethodID,
        string pIsApproved,
        string pISDiscountBeforeTax,
        Boolean pISRatio,
        Boolean pISCalc,
        string pInvoiceNoManual,
        string pOrderID,
        string pJVID,
        string pCurrencyID,
        string pExchangeRate,
        string pLocalTotalBeforeTax,
        string pLocalTotal ,
        string pSupplierInvoiceNo  , string pTaxesAmount, string pItemsAmount,
        string pServicesAmount, string pExpensesAmount, string pTaxType, DateTime pDueDate, string pJobID
        , string pVatAmount,
         Boolean pisVatRatio, string pDiscountAmount)
        {
            GlobalVariable.IsCalc = pISCalc;
            long _result = 0;
            //---- Get Last Code
            var objlastcode = new CPS_InvoicesTemp();
            CVarPS_InvoicesTemp objCVarPS_InvoicesTemp = new CVarPS_InvoicesTemp();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            //Get Grace Period
            //string GracePeriod = objCCustomizedDBCall.CallStringFunction("SELECT isnull(sc.GracePeriod,0) FROM Suppliers AS sc WHERE sc.ID= " + pSupplierID);


            String Serial = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select  isnull(max(cast(Serial as numeric)),0)+1  from PS_InvoicesTemp");

            if (int.Parse(pID) == 0)
            {
                objlastcode.GetList("WHERE invoiceNo = (select max(invoiceNo) from PS_InvoicesTemp where DATEPART(year, PS_InvoicesTemp.InvoiceDate) = '" + pInvoiceDate.Year + "')");
               // var lastcode = objlastcode.lstCVarPS_InvoicesTemp.Count == 0 ? 0 : int.Parse(objlastcode.lstCVarPS_InvoicesTemp[0].InvoiceNo);
                var lastcode=Convert.ToString(GetCode(pInvoiceDate)[0]);
                //----
                String Code = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select  isnull(max(cast(InvoiceNo as numeric)),0)+1  from PS_InvoicesTemp where DATEPART(year, PS_InvoicesTemp.InvoiceDate) = '" + pInvoiceDate.Year + "'");

                objCVarPS_InvoicesTemp.InvoiceNo = lastcode;
                objCVarPS_InvoicesTemp.InvoiceNoManual = lastcode;
                objCVarPS_InvoicesTemp.Serial = int.Parse(Serial);

            }
            else
            {
                if (pInvoiceNo=="0")
                {
                    objlastcode.GetList("WHERE invoiceNo = (select max(invoiceNo) from PS_InvoicesTemp where DATEPART(year, PS_InvoicesTemp.InvoiceDate) = '" + pInvoiceDate.Year + "')");
                   // var lastcode = objlastcode.lstCVarPS_InvoicesTemp.Count == 0 ? 0 : int.Parse(objlastcode.lstCVarPS_InvoicesTemp[0].InvoiceNo);
                    var lastcode = Convert.ToString(GetCode(pInvoiceDate)[0]);
                    //----
                    String Code = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select  isnull(max(cast(InvoiceNo as numeric)),0)+1  from PS_InvoicesTemp where DATEPART(year, PS_InvoicesTemp.InvoiceDate) = '" + pInvoiceDate.Year + "'");

                    objCVarPS_InvoicesTemp.InvoiceNo = lastcode;

                }
                else
                {
                    objCVarPS_InvoicesTemp.InvoiceNo = pInvoiceNo;
                }
               
                objCVarPS_InvoicesTemp.InvoiceNoManual = pInvoiceNo;

                CPS_InvoicesTemp objCVarPS_InvoicesTempSerial = new CPS_InvoicesTemp();
                objCVarPS_InvoicesTempSerial.GetList("where id="+pID);
                objCVarPS_InvoicesTemp.Serial = objCVarPS_InvoicesTempSerial.lstCVarPS_InvoicesTemp.Count > 0 ? objCVarPS_InvoicesTempSerial.lstCVarPS_InvoicesTemp[0].Serial :0;

            }
            objCVarPS_InvoicesTemp.InvoiceDate = pInvoiceDate;
            objCVarPS_InvoicesTemp.QuotationID = int.Parse( pQuotationID);
            objCVarPS_InvoicesTemp.SupplierID = int.Parse( pSupplierID);
            objCVarPS_InvoicesTemp.TotalBeforTax = decimal.Parse( pTotalBeforTax);
            objCVarPS_InvoicesTemp.TotalPrice = decimal.Parse( pTotalPrice);
            objCVarPS_InvoicesTemp.Discount = decimal.Parse( pDiscount);
            objCVarPS_InvoicesTemp.DiscountPercentage = decimal.Parse( pDiscountPercentage);
            objCVarPS_InvoicesTemp.Notes = (pNotes == null ? "0" : pNotes );
            objCVarPS_InvoicesTemp.DepartmentID = int.Parse( pDepartmentID);
            objCVarPS_InvoicesTemp.SalesManID = int.Parse( pSalesManID);
            objCVarPS_InvoicesTemp.CostCenter_ID = int.Parse(pCostCenter_ID);
            objCVarPS_InvoicesTemp.PaymentMethodID = int.Parse( pPaymentMethodID);
            objCVarPS_InvoicesTemp.IsApproved = bool.Parse( pIsApproved);
            objCVarPS_InvoicesTemp.ISDiscountBeforeTax = bool.Parse( pISDiscountBeforeTax);
            objCVarPS_InvoicesTemp.DiscountType = pISRatio;
            objCVarPS_InvoicesTemp.IsCalc = pISCalc;
            objCVarPS_InvoicesTemp.OrderID = int.Parse(pOrderID);
            objCVarPS_InvoicesTemp.JVID = int.Parse(pJVID);
            objCVarPS_InvoicesTemp.CurrencyID = int.Parse(pCurrencyID);
            objCVarPS_InvoicesTemp.ExchangeRate = decimal.Parse( pExchangeRate);
            objCVarPS_InvoicesTemp.LocalTotalBeforeTax = decimal.Parse( pLocalTotalBeforeTax);
            objCVarPS_InvoicesTemp.LocalTotal =decimal.Parse( pLocalTotal);
            objCVarPS_InvoicesTemp.IsDeleted = false;
            objCVarPS_InvoicesTemp.PaidAmount = 0;
            objCVarPS_InvoicesTemp.RemainAmount = decimal.Parse(pTotalPrice);
            objCVarPS_InvoicesTemp.SupplierInvoiceNo = pSupplierInvoiceNo;
            objCVarPS_InvoicesTemp.TaxesAmount = decimal.Parse(pTaxesAmount);
            objCVarPS_InvoicesTemp.ItemsAmount = decimal.Parse(pItemsAmount);
            objCVarPS_InvoicesTemp.ServicesAmount = decimal.Parse(pServicesAmount);
            objCVarPS_InvoicesTemp.ExpensesAmount = decimal.Parse(pExpensesAmount);
            objCVarPS_InvoicesTemp.TaxType = int.Parse(pTaxType);
            objCVarPS_InvoicesTemp.DueDate = pDueDate;
            objCVarPS_InvoicesTemp.mDisbursementJob_ID = int.Parse(pJobID);
            objCVarPS_InvoicesTemp.VatAmount = decimal.Parse(pVatAmount);
            objCVarPS_InvoicesTemp.isVatRatio = pisVatRatio;
            objCVarPS_InvoicesTemp.DiscountAmount = decimal.Parse(pDiscountAmount);

            objCVarPS_InvoicesTemp.ID = long.Parse(pID);
            CPS_InvoicesTemp objCPS_InvoicesTemp = new CPS_InvoicesTemp();
            objCPS_InvoicesTemp.lstCVarPS_InvoicesTemp.Add(objCVarPS_InvoicesTemp);
            Exception checkException = objCPS_InvoicesTemp.SaveMethod(objCPS_InvoicesTemp.lstCVarPS_InvoicesTemp);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
            {
                _result = objCVarPS_InvoicesTemp.ID;

                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "PS_InvoicesTemp", objCVarPS_InvoicesTemp.ID, (long.Parse(pID) == 0 ? "I" : "U"));

            }
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
         // var Obj_List_Expenses = obj[1];
         // var Obj_List_Taxes = obj[2];
          var serialize = new JavaScriptSerializer();
          var Details = serialize.Deserialize<List<CVarPS_InvoicesDetailsTemp>>(serialize.Serialize(Obj_List_Items));
       //   var Expenses = serialize.Deserialize<List<CVarPS_InvoicesTempExpenses>>(serialize.Serialize(Obj_List_Expenses));
        //  var Taxes = serialize.Deserialize<List<CVarPS_InvoicesTempTaxes>>(serialize.Serialize(Obj_List_Taxes));
            Exception checkException = new Exception();
            CPS_InvoicesDetailsTemp cPS_InvoicesDetailsTemp = new CPS_InvoicesDetailsTemp();
            if (Details != null && Details.Count > 0)
                checkException = cPS_InvoicesDetailsTemp.SaveMethod(Details);

            //if (Expenses != null && Expenses.Count > 0)
            //    checkException = cPS_InvoicesTempExpenses.SaveMethod(Expenses);
            //if (GlobalVariable.IsCalc)
            //{
            //    if (Taxes != null && Taxes.Count > 0)
            //        checkException = cPS_InvoicesTempTaxes.SaveMethod(Taxes);

            //}

            


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
        public bool Delete(String pPS_InvoicesTempIDs)
        {
            bool _result = false;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            Exception checkException = null;

            CPS_InvoicesTemp objCPS_InvoicesTemp = new CPS_InvoicesTemp();
            string pUpdateClause = "";
            pUpdateClause = " IsDeleted = 1 "+ " WHERE ID In(" + pPS_InvoicesTempIDs + ")";
            //var checkException = objCPS_InvoicesTemp.UpdateList(pUpdateClause);

            foreach (var currentID in pPS_InvoicesTempIDs.Split(','))
            {
                CPS_InvoicesTemp objCPS_InvoicesTempLog = new CPS_InvoicesTemp();
                objCPS_InvoicesTempLog.GetList("Where id=" + currentID);
                if (objCPS_InvoicesTempLog.lstCVarPS_InvoicesTemp.Count > 0)
                {
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "PS_InvoicesTemp", objCPS_InvoicesTempLog.lstCVarPS_InvoicesTemp[0].ID, "D");

                }
            }


            CPS_InvoicesDetailsTemp cPS_InvoicesDetailsTemp = new CPS_InvoicesDetailsTemp();

            var pDeleteClause = "";
            pDeleteClause = "WHERE InvoiceID In(" + pPS_InvoicesTempIDs + ")";
            checkException = cPS_InvoicesDetailsTemp.DeleteList(pDeleteClause);


            var pDeleteClause2 = "";
            pDeleteClause2 = "WHERE ID In(" + pPS_InvoicesTempIDs + ")";

            checkException = objCPS_InvoicesTemp.DeleteList(pDeleteClause2);
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
