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
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using System.Data.SqlClient;
using System.Configuration;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.SC.Transactions.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.SL.SL_MasterData.Generated;
using Forwarding.MvcApp.Controllers.SL.API_SL_Transactions;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class SL_InvoicesController : ApiController
    {

        [HttpGet, HttpPost]
        public Object[] GetLastThreePurshaseInvoicesByItemID( Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
            
        {
            Exception checkException = null;
            //CDefaults objCDefaults = new CDefaults();
            //objCDefaults.GetList("WHERE 1=1");

            CGetGetSL_LastThreePurshaseInvoicesByItemID objGetSL_LastThreePurshaseInvoicesByItemID = new CGetGetSL_LastThreePurshaseInvoicesByItemID();

            checkException = objGetSL_LastThreePurshaseInvoicesByItemID.GetList(int.Parse(pWhereClause));
                   
           

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                new JavaScriptSerializer().Serialize(objGetSL_LastThreePurshaseInvoicesByItemID.lstCVarGetGetSL_LastThreePurshaseInvoicesByItemID) 
                           };
        }
        [HttpGet, HttpPost]
        public Object[] GetLastUnitPriceByItemAndClientName(Int32 pClientID,Int32 pItemID)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string UnitePrice = objCCustomizedDBCall.CallStringFunction("SL_InvoiceGetLastUnitPriceByItemAndClientName " + pItemID + "," + pClientID);
            string PriceList = objCCustomizedDBCall.CallStringFunction("SL_InvoiceGetPriceListByItemAndClientName " + pItemID + "," + pClientID);

            return new Object[] { UnitePrice, PriceList };

        }
        [HttpGet, HttpPost]

        public Object[] A_CheckIfInvoiceInPayments(string pID)
        {
            string _result = "";
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string dt = objCCustomizedDBCall.CallStringFunction("SL_CheckFromInvoicesInPayments " + pID );
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
        public Object[] IntializeData(string pDate , int? pID)
        {
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;

            if (pID == null)
            {

                CCustomers cCustomers = new CCustomers();
                CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
                CNoAccessPaymentType cNoAccessPaymentType = new CNoAccessPaymentType();
                CPaymentTerms objCPaymentTerms = new CPaymentTerms();
                CSC_Stores cSC_Stores = new CSC_Stores();
                CA_CostCenters cA_CostCenters = new CA_CostCenters();
                CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();
                CvwSC_PurchaseItem cPurchaseItemTax = new CvwSC_PurchaseItem();
                CvwSC_PurchaseItem cPurchaseItemNoTax = new CvwSC_PurchaseItem();
                CBranches cBranches = new CBranches(); 
                CTaxeTypes cTaxeTypes = new CTaxeTypes();
                CServices cServices = new CServices();
                CExpenses cExpenses = new CExpenses();
                CI_ItemsPrice cI_ItemsPrice = new CI_ItemsPrice();
                CvwSL_GetSalesManToSLInvoiceByCustomerID vwSL_GetSalesManToSLInvoiceByCustomerID = new CvwSL_GetSalesManToSLInvoiceByCustomerID();

                cI_ItemsPrice.GetList("where 1 = 1");

                //---
                CPackageTypes Units = new CPackageTypes();
                Units.GetList("where 1 = 1");
                //----
               // cA_CostCenters.lstCVarA_CostCenters[0].CostCenterName
                cCustomers.GetList("where 1 = 1 order by Name ");
                cCurrencies.GetList(" where  CONVERT(date , \'" + pDate + "\') between  CONVERT(date ,FromDate) and  CONVERT(date ,ToDate) ");
                //cNoAccessPaymentType.GetList("where 1 = 1");
                objCPaymentTerms.GetList("where 1 = 1");

                cSC_Stores.GetList("where 1 = 1");
                cA_CostCenters.GetList("where isnull(IsMain , 0 ) = 0 order by CostCenterName ");
                //cPurchaseItem.GetList("where 1 = 1");
                var _RowCount = 0;
                cPurchaseItem.GetListPaging(100000, 1, " where 1 = 1 ", " Code ", out _RowCount);



                // cPurchaseItemTax.GetList("where ItemTypeID=6");
                //  cPurchaseItemNoTax.GetList("where ItemTypeID=7");
                cPurchaseItemTax.lstCVarvwSC_PurchaseItem = cPurchaseItem.lstCVarvwSC_PurchaseItem.Where(x => x.ItemTypeID == 6).ToList();
                cPurchaseItemNoTax.lstCVarvwSC_PurchaseItem = cPurchaseItem.lstCVarvwSC_PurchaseItem.Where(x => x.ItemTypeID == 7).ToList();
                cTaxeTypes.GetList("where 1 = 1");
                cServices.GetList("where 1 = 1");
                cExpenses.GetList("where 1 = 1");
                CA_Accounts cA_Accounts = new CA_Accounts();
                cA_Accounts.GetList(" where isnull( IsMain , 0 ) = 0 ");
                cBranches.GetList("where 1 = 1");

                CvwWH_PackageTypeBarCode objCWH_PackageTypeBarCode = new CvwWH_PackageTypeBarCode();
                objCWH_PackageTypeBarCode.GetList("where 1=1");


                CSL_SalesMan objCSL_SalesMan = new CSL_SalesMan();
                objCSL_SalesMan.GetList("where 1=1");

                CSL_Regions objCSL_Regions = new CSL_Regions();
                objCSL_Regions.GetList("where 1=1");


                return new Object[]
                {
                srialize.Serialize(cCustomers.lstCVarCustomers), //0
                srialize.Serialize(cCurrencies.lstCVarvwCurrencyDetails),//1
                srialize.Serialize(objCPaymentTerms.lstCVarPaymentTerms),//2
                srialize.Serialize(cSC_Stores.lstCVarSC_Stores),//3
                srialize.Serialize(cA_CostCenters.lstCVarA_CostCenters) ,//4
                srialize.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItem) ,//5
                srialize.Serialize(cTaxeTypes.lstCVarTaxeTypes) ,//6
                srialize.Serialize(cServices.lstCVarServices) ,//7
                srialize.Serialize(cExpenses.lstCVarExpenses)   , //8
                    new JavaScriptSerializer().Serialize(Units.lstCVarPackageTypes) , //9
                srialize.Serialize(cI_ItemsPrice.lstCVarI_ItemsPrice), //10
                srialize.Serialize(cPurchaseItemTax.lstCVarvwSC_PurchaseItem) , //11
                srialize.Serialize(cPurchaseItemNoTax.lstCVarvwSC_PurchaseItem) , //12
                srialize.Serialize(cBranches.lstCVarBranches) , //13
                srialize.Serialize(objCWH_PackageTypeBarCode.lstCVarvwWH_PackageTypeBarCode), //14  
                srialize.Serialize(objCSL_SalesMan.lstCVarSL_SalesMan), //15
                srialize.Serialize(objCSL_Regions.lstCVarSL_Regions) //16   
                
                

                

               // new JavaScriptSerializer().Serialize(cA_Accounts.lstCVarA_Accounts)
                };
            }
            else
            {
                CSC_Transactions cSC_Transactions = new CSC_Transactions();
                CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
                CInvoiceTypes cInvoiceTypes = new CInvoiceTypes();

                cInvoiceTypes.GetList("where 1 = 1");
                cCurrencies.GetList(" where  CONVERT(date , \'" + pDate + "\') between  CONVERT(date ,FromDate) and  CONVERT(date ,ToDate) ");
                //var SC_TransactionsCondition = " where (SC_Transactions.ID not In( select isnull( vw.TransactionID , 0 ) from vwSL_Invoices vw where isnull(vw.IsDeleted,0) = 0 and vw.TransactionID is not null and IsNULL(vw.IsFromTrans , 0) = 1 ) or SC_Transactions.SLInvoiceID   = " + pID + ") and SC_Transactions.TransactionTypeID = 20 and isnull(SC_Transactions.IsDeleted , 0) = 0 and Isnull(MaterialIssueRequesitionsID , 0) <> 0";
                var SC_TransactionsCondition = " where (SC_Transactions.ID not In( select isnull( vw.TransactionID , 0 ) from vwSL_Invoices vw where isnull(vw.IsDeleted,0) = 0 and vw.TransactionID is not null and IsNULL(vw.IsFromTrans , 0) = 1 ) or SC_Transactions.SLInvoiceID   = " + pID + ") and SC_Transactions.TransactionTypeID = 20 and isnull(SC_Transactions.IsDeleted , 0) = 0";

                cSC_Transactions.GetList(SC_TransactionsCondition);
                return new Object[]
                {   srialize.Serialize(cCurrencies.lstCVarvwCurrencyDetails) ,
                    srialize.Serialize(cSC_Transactions.lstCVarSC_Transactions) ,
                    srialize.Serialize(cInvoiceTypes.lstCVarInvoiceTypes) ,
                };
            }
        }
        [HttpGet, HttpPost]
        public Object[] GetSC_TransactionDetailsByClientID(Int32 pClientID,Int32 pID)
        {
            var srialize = new JavaScriptSerializer();
            CSC_Transactions cSC_Transactions = new CSC_Transactions();
            var SC_TransactionsCondition = "";
            if (pID==0)
            {
                SC_TransactionsCondition = " where SC_Transactions.ID not In( select TransactionID from SL_InvoicesTransactionsIDs ) and SC_Transactions.TransactionTypeID = 20 and isnull(SC_Transactions.IsDeleted , 0) = 0 and isnull(IsApproved,0)=1 and ClientID=" + pClientID; ;

            }
            else
            {
                SC_TransactionsCondition = " where SC_Transactions.ID In( select TransactionID from SL_InvoicesTransactionsIDs where InvoiceID ="+ pID + ")" + " and SC_Transactions.TransactionTypeID = 20 and isnull(SC_Transactions.IsDeleted , 0) = 0 and isnull(IsApproved,0)=1 and ClientID=" + pClientID;

            }


            cSC_Transactions.GetList(SC_TransactionsCondition);
            return new Object[]
            {
                    srialize.Serialize(cSC_Transactions.lstCVarSC_Transactions) 
            };
        }
        // [
        [HttpGet, HttpPost]
        public Object[] GetCurrencyExchangeRateWithDate(string pDate, int pCurrencyID)
        {
                var srialize = new JavaScriptSerializer();
                srialize.MaxJsonLength = int.MaxValue;

                CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
                cCurrencies.GetList(" where ID = "+ pCurrencyID + " and  CONVERT(date , \'" + pDate + "\') between  CONVERT(date ,FromDate) and  CONVERT(date ,ToDate) ");
                //----------------------------------------------------------------------------------------------------------
                decimal ExchangeRate = 1;
                if (cCurrencies.lstCVarvwCurrencyDetails != null && cCurrencies.lstCVarvwCurrencyDetails.Count > 0)
                ExchangeRate = cCurrencies.lstCVarvwCurrencyDetails[0].ExchangeRate;
                //-----------------------------------------------------------------------------------------------------------
                return new Object[]
                {
                    ExchangeRate
                };
        }
        // [Route("/api/SL_Invoices/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
            CSL_Invoices objCSL_Invoices = new CSL_Invoices();
            //objCSL_Invoices.GetList(string.Empty);
            Int32 _RowCount = 0;// objCSL_Invoices.lstCVarSL_Invoices.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' "
                + " OR AccountName LIKE '%" + pSearchKey + "%' "
            +" OR SubAccountName LIKE '%" + pSearchKey + "%' ";

            objCSL_Invoices.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { srialize.Serialize(objCSL_Invoices.lstCVarSL_Invoices), _RowCount };
        }
        [HttpGet, HttpPost]
        public Object[] LoadWithPagingItems(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();

            pWhereClause = (pWhereClause == null ? "" : pWhereClause.Trim().ToUpper());
            Int32 _RowCount = 0;

            cPurchaseItem.GetListPaging(pPageSize, pPageNumber, pWhereClause, "ID", out _RowCount);

            JavaScriptSerializer serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };


            return new Object[] {serializer.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItem),//0
                                    
                _RowCount, //1
                
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {

            CvwSL_Invoices cSL_Invoices = new CvwSL_Invoices();
            Int32 _RowCount = 0;
            cSL_Invoices.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(cSL_Invoices.lstCVarvwSL_Invoices), _RowCount };
        }


        //[HttpGet, HttpPost]
        //public object[] LoadDetails(string pWhereClause)
        //{
        //    if (pWhereClause.Contains("where \'**LoadItemsFromTrans**\'=\'**LoadItemsFromTrans**\'"))
        //    {

        //        CSC_TransactionsDetails cSC_TransactionsDetails = new CSC_TransactionsDetails();
        //        cSC_TransactionsDetails.GetList(pWhereClause);

        //        var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
        //        return new Object[] {
        //        serializer.Serialize(cSC_TransactionsDetails.lstCVarSC_TransactionsDetails) };
        //    }
        //    else
        //    {
        //        CvwPS_InvoicesDetails cPS_InvoicesDetails = new CvwPS_InvoicesDetails();
        //        CPS_InvoicesExpenses cPS_InvoicesExpenses = new CPS_InvoicesExpenses();
        //        CPS_InvoicesTaxes cPS_InvoicesTaxes = new CPS_InvoicesTaxes();
        //        cPS_InvoicesDetails.GetList(pWhereClause);
        //        cPS_InvoicesExpenses.GetList(pWhereClause);
        //        cPS_InvoicesTaxes.GetList(pWhereClause);

        //        var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
        //        return new Object[] {
        //        serializer.Serialize(cPS_InvoicesDetails.lstCVarvwPS_InvoicesDetails),
        //        serializer.Serialize(cPS_InvoicesExpenses.lstCVarPS_InvoicesExpenses) ,
        //        serializer.Serialize(cPS_InvoicesTaxes.lstCVarPS_InvoicesTaxes) };
        //    }
        //}

        [HttpGet, HttpPost]
        public object[] LoadDetails(string pWhereClause)
        {
           
            if (pWhereClause.Contains("where \'**LoadItemsFromTrans**\'=\'**LoadItemsFromTrans**\'"))
            {

                CSC_TransactionsDetails cSC_TransactionsDetails = new CSC_TransactionsDetails();
                cSC_TransactionsDetails.GetList(pWhereClause);

                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new Object[] {
                serializer.Serialize(cSC_TransactionsDetails.lstCVarSC_TransactionsDetails) };
            }
            else
            {
                CvwSL_InvoicesDetails cSL_InvoicesDetails = new CvwSL_InvoicesDetails();
                CvwSL_InvoicesExpenses cSL_InvoicesExpenses = new CvwSL_InvoicesExpenses();
                CvwSL_InvoicesTaxes cSL_InvoicesTaxes = new CvwSL_InvoicesTaxes();
                int _RowCount = 0;
                cSL_InvoicesDetails.GetListPaging(10000, 1, pWhereClause , " ID desc ", out _RowCount);
                cSL_InvoicesExpenses.GetList(pWhereClause);
                cSL_InvoicesTaxes.GetList(pWhereClause);

                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new Object[] {
                serializer.Serialize(cSL_InvoicesDetails.lstCVarvwSL_InvoicesDetails),
                serializer.Serialize(cSL_InvoicesExpenses.lstCVarvwSL_InvoicesExpenses) ,
                serializer.Serialize(cSL_InvoicesTaxes.lstCVarvwSL_InvoicesTaxes) };
            }


        }

        
        public void CheckSavedSL(string pIsFromTrans, string pTransactionID,bool isMulti,ref CVarSL_Invoices objCVarSL_Invoices,ref CSL_Invoices objCSL_Invoices,ref Exception checkException, ref long? _result)
        {
            if (bool.Parse(pIsFromTrans))
            {
                if (isMulti)
                {
                    objCSL_Invoices.lstCVarSL_Invoices.Add(objCVarSL_Invoices);
                    checkException = objCSL_Invoices.SaveMethod(objCSL_Invoices.lstCVarSL_Invoices);
                    _result = 0;
                }
                else
                {
                    CSC_Transactions sC_Transactions = new CSC_Transactions();

                    sC_Transactions.GetList("where ID = " + pTransactionID);
                    var transaction_date = sC_Transactions.lstCVarSC_Transactions[0].TransactionDate;

                    if (objCVarSL_Invoices.InvoiceDate >= transaction_date)
                    {
                        objCSL_Invoices.lstCVarSL_Invoices.Add(objCVarSL_Invoices);
                        checkException = objCSL_Invoices.SaveMethod(objCSL_Invoices.lstCVarSL_Invoices);
                        _result = 0;

                    }
                    else
                    {
                        _result = null;
                        // checkException.Message = "Date Must >= Good Receipt Note Date";

                    }
                }
              



            }
            else
            {
                objCSL_Invoices.lstCVarSL_Invoices.Add(objCVarSL_Invoices);
                checkException = objCSL_Invoices.SaveMethod(objCSL_Invoices.lstCVarSL_Invoices);
                _result = 0;
            }

        }


        //  http://localhost:1425/api/SL_Invoices/Save?pID=20&pInvoiceNo=1-INV&pInvoiceDate=02%2F06%2F2020&pQuotationID=0&pClientID=1666&pTotalBeforTax=210.00&pTotalPrice=210.00&pDiscount=0.00&pDiscountPercentage=0.00&pNotes=0&pDepartmentID=0&pSalesManID=0&pCostCenter_ID=0&pPaymentMethodID=10&pIsApproved=false&pISDiscountBeforeTax=false&pInvoiceNoManual=0&pOrderID=0&pJVID=0&pCurrencyID=83&pExchangeRate=1&pLocalTotalBeforeTax=210&pLocalTotal=210.00&pIsDeleted=0&pTaxesAmount=0.00&pItemsAmount=210.00&pServicesAmount=0.00&pExpensesAmount=0.00&pIsFixedDiscount=false&pIsFromTrans=false&pTransactionID=24&pTypeID=6&pRemainAmount=&pPaidAmount=
        [HttpGet, HttpPost]
        public long? Save(
            string pID ,
        string pInvoiceNo,
        DateTime pInvoiceDate,
        string pQuotationID,
        string pClientID,
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
        string pInvoiceNoManual,
        string pOrderID,
        string pJVID,
        string pCurrencyID,
        string pExchangeRate,
        string pLocalTotalBeforeTax,
        string pLocalTotal , string pTaxesAmount , string pItemsAmount , string pServicesAmount , string pExpensesAmount , string pIsFixedDiscount
            , string pIsFromTrans  , string pTransactionID , string pTypeID , string pRemainAmount , string pPaidAmount, string pRegionsID ,
        string pBranchID, string pTransIDs
            )
        {
            TimeSpan FirsrDayTime = new TimeSpan(19, 0, 0);
            Exception checkException = new Exception();
            long? _result = null;
            var lastcode = 0;
            //---- Get Last Code
            var objlastcode = new CSL_Invoices();
            CVarSL_Invoices objCVarSL_Invoices = new CVarSL_Invoices();
            if (int.Parse(pID) == 0)
            {
                try
                {
                    //  select isnull(max(cast(IsNull(InvoiceNo,0) as numeric)),0)+1 from SL_Invoices where ISNUMERIC(Invoiceno) = 1
                    //   objlastcode.GetList("WHERE TypeID = " + pTypeID + " AND InvoiceNo  = (select isnull(max(cast(IsNull(InvoiceNo,0) as numeric)),0) from SL_Invoices where isnull(isdeleted,0) = 0 and DATEPART(year, SL_Invoices.InvoiceDate) = '" + pInvoiceDate.Year + "')");
                   // objlastcode.GetList("WHERE TypeID = " + pTypeID + "  AND InvoiceNo = CONVERT(NVARCHAR, (select isnull(max(cast(IsNull(ISNUMERIC(InvoiceNo), 0) as numeric)), 0) from SL_Invoices where isnull(IsDeleted, 0) = 0) and DATEPART(year, SL_Invoices.InvoiceDate) = '" + pInvoiceDate.Year + "'" + " and ISNULL(IsDeleted , 0 ) = 0 ");
                    objlastcode.GetList("where TypeID = " + pTypeID + "  AND InvoiceNo = CONVERT(NVARCHAR, (select isnull(max(cast(IsNull(InvoiceNo, 0) as numeric)), 0) from SL_Invoices WHERE ISNUMERIC(InvoiceNo) = 1 and isnull(IsDeleted, 0) = 0 and DATEPART(year, SL_Invoices.InvoiceDate) = '" + pInvoiceDate.Year + "' AND SL_Invoices.TypeID = "+pTypeID+" " + ") ) and ISNULL(IsDeleted , 0 ) = 0 ");
                    lastcode = objlastcode.lstCVarSL_Invoices.Count == 0 ? 0 : int.Parse(objlastcode.lstCVarSL_Invoices[0].InvoiceNo);
                    //----
                }
                catch(Exception ex)
                {
                    lastcode = 0;
                }
               
                objCVarSL_Invoices.InvoiceNo = (lastcode + 1).ToString();
                objCVarSL_Invoices.InvoiceNoManual = (lastcode + 1).ToString();
            }
            else
            {
                try
                {
                    objCVarSL_Invoices.InvoiceNo = pInvoiceNo.Split('-')[0].Trim();
                    objCVarSL_Invoices.InvoiceNoManual = pInvoiceNo.Split('-')[0].Trim();
                }
                catch
                {
                    objCVarSL_Invoices.InvoiceNo = pInvoiceNo;
                    objCVarSL_Invoices.InvoiceNoManual = pInvoiceNo;
                }
            }
            objCVarSL_Invoices.InvoiceDate =  pInvoiceDate.Date + FirsrDayTime;
            objCVarSL_Invoices.IsFromTrans = bool.Parse(pIsFromTrans == null ? "false" : pIsFromTrans);
            objCVarSL_Invoices.QuotationID = int.Parse( pQuotationID == null ? "0" : pQuotationID);
            objCVarSL_Invoices.ClientID = int.Parse( pClientID == null ? "0" : pClientID);
            objCVarSL_Invoices.TotalBeforTax = decimal.Parse( pTotalBeforTax == null ? "0" : pTotalBeforTax);
            objCVarSL_Invoices.TotalPrice = decimal.Parse( pTotalPrice == null ? "0" : pTotalPrice);
            objCVarSL_Invoices.Discount = decimal.Parse( pDiscount == null ? "0" : pDiscount);
            objCVarSL_Invoices.DiscountPercentage = decimal.Parse( pDiscountPercentage == null ? "0" : pDiscountPercentage);
            objCVarSL_Invoices.Notes = (pNotes == null ? "0" : pNotes );
            objCVarSL_Invoices.DepartmentID = int.Parse( pDepartmentID == null ? "0" : pDepartmentID);
            objCVarSL_Invoices.SalesManID = int.Parse( pSalesManID == null ? "0" : pSalesManID);
            objCVarSL_Invoices.CostCenter_ID = int.Parse(pCostCenter_ID == null ? "0" : pCostCenter_ID);
            objCVarSL_Invoices.PaymentMethodID = int.Parse( pPaymentMethodID == null ? "0" : pPaymentMethodID);
            objCVarSL_Invoices.IsApproved = bool.Parse( pIsApproved == null ? "false" : pIsApproved);
            objCVarSL_Invoices.ISDiscountBeforeTax = bool.Parse( pISDiscountBeforeTax == null ? "false" : pISDiscountBeforeTax);
            objCVarSL_Invoices.IsFixedDiscount = bool.Parse(pIsFixedDiscount == null ? "false" : pIsFixedDiscount);
            objCVarSL_Invoices.OrderID = int.Parse(pOrderID == null ? "0" : pOrderID);
            objCVarSL_Invoices.JVID = int.Parse(pJVID == null ? "0" : pJVID);
            objCVarSL_Invoices.CurrencyID = int.Parse(pCurrencyID == null ? "0" : pCurrencyID);
            objCVarSL_Invoices.ExchangeRate = decimal.Parse( pExchangeRate == null ? "0" : pExchangeRate);
            objCVarSL_Invoices.LocalTotalBeforeTax = decimal.Parse( pLocalTotalBeforeTax == null ? "0" : pLocalTotalBeforeTax);
            objCVarSL_Invoices.LocalTotal =decimal.Parse( pLocalTotal == null ? "0" : pLocalTotal);
            objCVarSL_Invoices.IsDeleted = false;
            objCVarSL_Invoices.PaidAmount = (int.Parse(pID) == 0 ? decimal.Parse("0") : decimal.Parse(pPaidAmount)); //pPaidAmount
            objCVarSL_Invoices.RegionsID = int.Parse(pRegionsID == null ? "0" : pRegionsID);
            objCVarSL_Invoices.BranchID = int.Parse(pBranchID == null ? "0" : pBranchID);




            //--------------------
            objCVarSL_Invoices.RemainAmount = (objCVarSL_Invoices.TotalPrice - objCVarSL_Invoices.PaidAmount); //(int.Parse(pID) == 0 ? decimal.Parse( pTotalPrice ) : decimal.Parse( pRemainAmount ));
            //--------------------


            objCVarSL_Invoices.TypeID = int.Parse(pTypeID == null ? "0" : pTypeID);
            objCVarSL_Invoices.TaxesAmount = decimal.Parse(pTaxesAmount == null ? "0" : pTaxesAmount);
            objCVarSL_Invoices.ItemsAmount = decimal.Parse(pItemsAmount == null ? "0" : pItemsAmount);
            objCVarSL_Invoices.ServicesAmount = decimal.Parse(pServicesAmount == null ? "0" : pServicesAmount);
            objCVarSL_Invoices.ExpensesAmount = decimal.Parse(pExpensesAmount == null ? "0" : pExpensesAmount);
            objCVarSL_Invoices.ID = long.Parse(pID);
            objCVarSL_Invoices.TransactionID = int.Parse(pTransactionID == null ? "0" : pTransactionID );
            CSL_Invoices objCSL_Invoices = new CSL_Invoices();

            var historyOfSL = new CSL_Invoices();
            historyOfSL.GetList("where ID = " + pID + "");

            if (int.Parse(pID) != 0)
            {
                if (historyOfSL.lstCVarSL_Invoices[0].IsApproved == true)
                {
                    _result = null;

                }
                else
                {
                    CheckSavedSL(pIsFromTrans, pTransactionID, (pTransIDs != "" && pTransIDs != "0") ? true : false, ref objCVarSL_Invoices,ref objCSL_Invoices,ref checkException, ref _result);
                }

            }
            else
            {
                CheckSavedSL(pIsFromTrans, pTransactionID, (pTransIDs != "" && pTransIDs != "0") ? true : false, ref objCVarSL_Invoices,ref objCSL_Invoices,ref checkException, ref _result);

            }

            var _result1 = _result;

            if (checkException != null || _result == null) // an exception is caught in the model
            {
                // if (checkException.Message.Contains("UNIQUE"))
                _result = 0;
            }
            else //not unique
            {
                CSC_Transactions cSC_Transactions = new CSC_Transactions();
                checkException = cSC_Transactions.UpdateList(" SLInvoiceID = " + objCVarSL_Invoices.ID + " , IsOutOfStore = 0 where ID = " + pTransactionID);
                if (checkException != null || _result == null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = 0;
                }
                else
                {
                    //insert in link table if pTransIDs not empty and agro
                    if (pTransIDs !="" && pTransIDs != "0" && pID=="0")
                    {
                        CSL_InvoicesTransactionsIDs objCSL_InvoicesTransactionsIDs = new CSL_InvoicesTransactionsIDs();

                        foreach (var currentID in pTransIDs.Split(','))
                        {
                            CVarSL_InvoicesTransactionsIDs objCVarSL_InvoicesTransactionsIDs = new CVarSL_InvoicesTransactionsIDs();
                            objCVarSL_InvoicesTransactionsIDs.InvoiceID = objCVarSL_Invoices.ID;
                            objCVarSL_InvoicesTransactionsIDs.TransactionID = int.Parse(currentID);
                            objCSL_InvoicesTransactionsIDs.lstCVarSL_InvoicesTransactionsIDs.Add(objCVarSL_InvoicesTransactionsIDs);

                        }
                        checkException = objCSL_InvoicesTransactionsIDs.SaveMethod(objCSL_InvoicesTransactionsIDs.lstCVarSL_InvoicesTransactionsIDs);
                       
                    }
                    _result = objCVarSL_Invoices.ID;
                }
            }

            return _result;
        }



        [HttpGet, HttpPost]
        [AllowAnonymous]
        public object[] InsertItems([FromBody]string pItems)
        {
            try
            {   // Insert Items to Invoices 
                var Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
                var _result = false;
                var obj = new JavaScriptSerializer().Deserialize<List<object>>(pItems);
                var Obj_List_Items = obj[0];
                var Obj_List_Expenses = obj[1];
                var Obj_List_Taxes = obj[2];
                var serialize = new JavaScriptSerializer();
                var Details = serialize.Deserialize<List<CVarSL_InvoicesDetails>>(serialize.Serialize(Obj_List_Items));
                var Expenses = serialize.Deserialize<List<CVarSL_InvoicesExpenses>>(serialize.Serialize(Obj_List_Expenses));
                var Taxes = serialize.Deserialize<List<CVarSL_InvoicesTaxes>>(serialize.Serialize(Obj_List_Taxes));
                Exception checkException = new Exception();
                CSL_InvoicesDetails cSL_InvoicesDetails = new CSL_InvoicesDetails();
                CSL_InvoicesExpenses cSL_InvoicesExpenses = new CSL_InvoicesExpenses();
                CSL_InvoicesTaxes cSL_InvoicesTaxes = new CSL_InvoicesTaxes();
                if (Details != null && Details.Count > 0)
                {
                    checkException = cSL_InvoicesDetails.SaveMethod(Details);
                    var DetailsIDs = String.Join(",", Details.Select(x => x.ID).ToList());
                    cSL_InvoicesDetails.DeleteList("where InvoiceID = " + Details[0].InvoiceID + " and ID Not IN(" + DetailsIDs + ")");
                }
                else
                {
                    cSL_InvoicesDetails.DeleteList("where InvoiceID = " + Details[0].InvoiceID);
                }
                //*********************
                if (Expenses != null && Expenses.Count > 0)
                {
                    checkException = cSL_InvoicesExpenses.SaveMethod(Expenses);
                    var DetailsIDs1 = String.Join(",", Expenses.Select(x => x.ID).ToList());
                    cSL_InvoicesExpenses.DeleteList("where InvoiceID = " + Details[0].InvoiceID + " and ID Not IN(" + DetailsIDs1 + ")");
                }
                else
                {
                    cSL_InvoicesExpenses.DeleteList("where InvoiceID = " + Details[0].InvoiceID);
                }
                //**********************
                if (Taxes != null && Taxes.Count > 0)
                {
                    checkException = cSL_InvoicesTaxes.SaveMethod(Taxes);
                    var DetailsIDs2 = String.Join(",", Taxes.Select(x => x.ID).ToList());
                    cSL_InvoicesTaxes.DeleteList("where InvoiceID = " + Details[0].InvoiceID + " and ID Not IN(" + DetailsIDs2 + ")");
                }
                else
                {
                    cSL_InvoicesTaxes.DeleteList("where InvoiceID = " + Details[0].InvoiceID);

                }
                //************************








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
            catch   // Update Items in SC_Transaction Details
            {
                try
                {
                    // Insert List Of Details
                    string _result = "0";
                    var istrue = false;
                    var OldTD_count = 0; // for old Transaction Details
                    var isrestore = false;
                    string OldTD_IDs = "0"; // for old Transaction Details
                    DateTime StartDate = new DateTime();

                    // set Time ----------------------------------------------------------------------------------------
                    TimeSpan FirsrDayTime = new TimeSpan(7, 0, 0);
                    TimeSpan LastDayTime = new TimeSpan(19, 0, 0);
                    CSC_TransactionsDetails cSC_TransactionsDetails = new CSC_TransactionsDetails();
                    CSC_Transactions cSC_Transactions = new CSC_Transactions();


                    // Deserialize List -------------------------------------------------------------------------------
                    var Listobj = new JavaScriptSerializer().Deserialize<List<CVarSC_TransactionsDetails>>(pItems);
                    var TransNotes = Listobj[0].Notes; // used to update Transaction header
                    Listobj[0].Notes = "-";



                    // Get Transaction Type ----------------------------------------------------------------------------
                    cSC_Transactions.GetList("where ID = " + Listobj[0].TransactionID);
                    var TransactionType = cSC_Transactions.lstCVarSC_Transactions[0].TransactionTypeID;



                    // Get Old Transaction Details -------------------------------------------------------------------------------------
                    CSC_TransactionsDetails oldCSC_TransactionsDetails = new CSC_TransactionsDetails();
                    oldCSC_TransactionsDetails.GetList("where TransactionID = " + cSC_Transactions.lstCVarSC_Transactions[0].ID + "");


                    // [Delete = 1] for  Old Transaction Details ---------------------------------------------------------------------------------
                    var OldListobj = oldCSC_TransactionsDetails.lstCVarSC_TransactionsDetails;

                    if (OldListobj.Count > 0)
                    {
                        OldTD_IDs = "";
                        foreach (var item in OldListobj)
                        {
                            OldTD_IDs += "," + item.ID;

                        }
                        OldTD_IDs = OldTD_IDs.Substring(1);

                        var checkException1 = cSC_TransactionsDetails.UpdateList("IsDeleted = 1  where  ID  IN(" + OldTD_IDs + ")");

                        OldTD_count = OldListobj.Count;
                        isrestore = false;

                    }


                    // Set Transaction Details Time ---------------------------------------------------------------------
                    if (TransactionType == 10 || TransactionType == 30 || TransactionType == 40 || TransactionType == 60 || TransactionType == 50)
                    {
                        foreach (var item in Listobj)
                        {
                            item.TransactionDate = item.TransactionDate.Date + FirsrDayTime;
                            StartDate = item.TransactionDate.Date + FirsrDayTime;
                        }
                    }
                    else if (TransactionType == 20)
                    {
                        foreach (var item in Listobj)
                        {
                            item.TransactionDate = item.TransactionDate.Date + LastDayTime;
                            StartDate = item.TransactionDate.Date + LastDayTime;
                        }
                    }
                    else
                    {

                    }




                    // Insert NEW List --------------------------------------------------------------------------------------------------
                    Exception checkException = cSC_TransactionsDetails.SaveMethod(Listobj);



                    //if (TransactionType != 60)
                    //{
                    //    // Validation -----------------------------------------------------------------------------------------------
                    //    if (checkException == null)
                    //    {

                    //        var ListLength = Listobj.Count;
                    //        var List_StoresItem = new List<string>(ListLength);

                    //        for (int i = 0; i < ListLength; i++)
                    //        {
                    //            if (OldTD_count > 0 && Listobj.Count > 0)
                    //            {
                    //                List_StoresItem.AddRange(new string[]{ Listobj[i].StoreID + "-" + Listobj[i].ItemID ,
                    //                                   OldListobj[i].StoreID + "-" + OldListobj[i].ItemID });
                    //            }
                    //            else if (Listobj.Count > 0)
                    //            {
                    //                List_StoresItem.Add(Listobj[i].StoreID + "-" + Listobj[i].ItemID);

                    //            }
                    //            else
                    //            {

                    //                List_StoresItem.Add(OldListobj[i].StoreID + "-" + OldListobj[i].ItemID);
                    //            }

                    //        }

                    //        var NewList_Stores = List_StoresItem.DistinctBy(x => x).ToList();
                    //        var NewListLength = NewList_Stores.Count;
                    //        var str_Items = new List<string>(NewListLength);
                    //        var str_Stores = new List<string>(NewListLength);
                    //        for (int i = 0; i < NewList_Stores.Count; i++)
                    //        {

                    //            str_Stores.Add(NewList_Stores[i].Split('-')[0]);
                    //            str_Items.Add(NewList_Stores[i].Split('-')[1]);

                    //        }
                    //        CSC_ValidateTransaction_AND_UpdateHeader cSC_ValidateTransaction = new CSC_ValidateTransaction_AND_UpdateHeader();
                    //        checkException = cSC_ValidateTransaction.GetList(string.Join("-", str_Items), string.Join("-", str_Stores), StartDate, cSC_Transactions.lstCVarSC_Transactions[0].ID, TransNotes);
                    //    }
                    //}
                    //---------------
                    // If faild ------------------------
                    if (checkException != null)
                    {
                        if (OldTD_IDs == "")
                            OldTD_IDs = "0";
                        // delete any NEW Transaction Details ----------------------------------------------------------------------------
                        // var OldListobj = oldCSC_TransactionsDetails.lstCVarSC_TransactionsDetails;
                        var checkException1 = cSC_TransactionsDetails.DeleteList("where ID NOT IN(" + OldTD_IDs + ") AND  TransactionID = " + cSC_Transactions.lstCVarSC_Transactions[0].ID + "");
                        var Message = checkException.Message;

                        if (Message.Contains("Divide by zero"))
                        {
                            Message = "One of Stores has zero from required item ..";

                        }
                        if (OldTD_count > 0)
                        {
                            //foreach (var item in OldListobj)
                            //{
                            //    IDs += "," + item.ID;
                            //}
                            //IDs = IDs.Substring(1);
                            checkException = cSC_TransactionsDetails.UpdateList("IsDeleted = 0  where  ID  IN(" + OldTD_IDs + ")");
                        }
                        else
                        {
                            checkException = cSC_Transactions.UpdateList("IsDeleted = 1  where  ID  IN(" + cSC_Transactions.lstCVarSC_Transactions[0].ID + ")");

                        }
                        istrue = false;
                        return new object[] { istrue, Message, cSC_Transactions.lstCVarSC_Transactions[0].ID };
                    }
                    // if Sucessed -----------------------------------------------------------------------------------------------------------
                    else
                    {

                        if (OldTD_IDs == "")
                            OldTD_IDs = "0";
                        //----------------- Update New List (is deleted = 0) for refresh remained quantity -------------------------------------
                        checkException = cSC_TransactionsDetails.UpdateList(" IsDeleted = 0  where  ID NOT IN(" + OldTD_IDs + ") AND  TransactionID = " + cSC_Transactions.lstCVarSC_Transactions[0].ID + "");
                        //----------------- Delete Old List ----------------------------------------------------------------
                        checkException = cSC_TransactionsDetails.DeleteList("where  ID  IN(" + OldTD_IDs + ")");





                        _result = cSC_Transactions.lstCVarSC_Transactions[0].Code;

                        //  var OldListobj = oldCSC_TransactionsDetails.lstCVarSC_TransactionsDetails;

                        //if (OldListobj.Count > 0)
                        //{
                        //    foreach (var item in OldListobj)
                        //    {
                        //        IDs += "," + item.ID;

                        //    }
                        //    IDs = IDs.Substring(1);
                        //    checkException = cSC_TransactionsDetails.DeleteList("where  ID  IN(" + IDs + ")");
                        //}
                        istrue = true;
                        return new object[] { istrue, _result, cSC_Transactions.lstCVarSC_Transactions[0].ID };
                    }


                }
                catch
                {
                    return new object[] { true, "", 1 };
                }

            }
        }

        [HttpGet, HttpPost]
        public bool Delete(String pSL_InvoicesIDs)
        {
            bool _result = false;

            CSL_Invoices objCSL_Invoices = new CSL_Invoices();
            string pUpdateClause = "";
            pUpdateClause = " IsDeleted = 1 "+ " WHERE ID In(" + pSL_InvoicesIDs + ")";
            var checkException = objCSL_Invoices.UpdateList(pUpdateClause);


            CSL_InvoicesDetails cSL_InvoicesDetails = new CSL_InvoicesDetails();
            CSL_InvoicesExpenses cSL_InvoicesExpenses = new CSL_InvoicesExpenses();
            CSL_InvoicesTaxes cSL_InvoicesTaxes = new CSL_InvoicesTaxes();
            CSL_InvoicesTransactionsIDs cSL_InvoicesTransactionsIDs = new CSL_InvoicesTransactionsIDs();

            var pDeleteClause = "";
            pDeleteClause = "WHERE InvoiceID In(" + pSL_InvoicesIDs + ")";
            checkException = objCSL_Invoices.DeleteList(pDeleteClause);
            checkException = cSL_InvoicesExpenses.DeleteList(pDeleteClause);
            checkException = cSL_InvoicesTaxes.DeleteList(pDeleteClause);
            checkException = cSL_InvoicesTransactionsIDs.DeleteList(pDeleteClause);


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
            else
            {
                CSC_Transactions cSC_Transactions = new CSC_Transactions();
                _result = true;
                string pUpdateClause1 = "";
                pUpdateClause1 = " SLInvoiceID = 0   " + " WHERE SLInvoiceID In(" + pSL_InvoicesIDs + ")";
                var checkException11 = cSC_Transactions.UpdateList(pUpdateClause1);
            }
            return _result;
        }
    }
}
