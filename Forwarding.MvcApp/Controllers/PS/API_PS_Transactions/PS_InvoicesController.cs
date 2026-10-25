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
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using System.Data.SqlClient;
using System.Configuration;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.SC.Transactions.Generated;
using MoreLinq;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Shipping.MvcApp.Models.ReportViews;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.FA.Generated;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class PS_InvoicesController : ApiController
    {

        [HttpGet, HttpPost]
        public object[] ReadyUnReady(Int32 pID,string PReceiverUsers, Int32 pType)
        {
            bool result = true;
            CPS_Invoices objCPS_Invoices = new CPS_Invoices();
            if (pType == 1)
            {
                objCPS_Invoices.UpdateList(" Ready=1 where id=" + pID);

                objCPS_Invoices.GetList("where id=" + pID);
                //Insert notification
                CEmail objCEmail = new CEmail();
                CVarEmail objCVarEmail = new CVarEmail();
                objCVarEmail.ID = 0;
                if (objCPS_Invoices.lstCVarPS_Invoices.Count > 0)
                    objCVarEmail.Subject = " Purshase Invoice " + objCPS_Invoices.lstCVarPS_Invoices[0].InvoiceNo + " - يجيب عمل اصل على فاتورة مشتريات";
                else
                    objCVarEmail.Subject = " Fixed Asset  - اصل ثابت";
                objCVarEmail.Body = "Purshase Invoice/" + pID.ToString() + "";// " Payment request with code "+ objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " ";
                objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                objCVarEmail.SendingDate = DateTime.Now;
                objCEmail.lstCVarEmail.Add(objCVarEmail);
                
                    objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                
                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                string[] ReceiverUsers = PReceiverUsers.Split(',');
                //if(PReceiverUsers != "0")
                for (int j = 0; j < ReceiverUsers.Length; j++)
                {
                    CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                    objCVarEmailReceiver.ID = 0;
                    objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                    objCVarEmailReceiver.ReceiverUserID = Convert.ToInt32(ReceiverUsers[j]);
                    objCVarEmailReceiver.IsAlarm = true;
                    objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                    objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                }

                objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);

            }
            else
            {
                objCPS_Invoices.UpdateList(" Ready=0 where id=" + pID);
            }
            return new Object[] { result };
        }
        [HttpGet, HttpPost]
        public Object[] IntializeData(string pDate , int? pID)
        {
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
            if (pID == null)
            {

                CSuppliers cSuppliers = new CSuppliers();
                CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
                CNoAccessPaymentType cNoAccessPaymentType = new CNoAccessPaymentType();
                CSC_Stores cSC_Stores = new CSC_Stores();
                CA_CostCenters cA_CostCenters = new CA_CostCenters();
                CvwSC_PurchaseItemPS cPurchaseItem = new CvwSC_PurchaseItemPS();
                CTaxeTypes cTaxeTypes = new CTaxeTypes();
                CServices cServices = new CServices();
                CExpenses cExpenses = new CExpenses();
                CPaymentTerms cPaymentTerms = new CPaymentTerms();
                //---
                CPackageTypes Units = new CPackageTypes();
                CBranches cBranches = new CBranches();
                CvwWH_PackageTypeBarCode objCWH_PackageTypeBarCode = new CvwWH_PackageTypeBarCode();
                objCWH_PackageTypeBarCode.GetList("where 1=1");

                Units.GetList("where 1 = 1");
                //----
                //cSuppliers.lstCVarSuppliers[0].
                cSuppliers.GetList("where 1 = 1 order by Name");
                cCurrencies.GetList(" where  CONVERT(date , \'" + pDate + "\') between  CONVERT(date ,FromDate) and  CONVERT(date ,ToDate) ");
                cNoAccessPaymentType.GetList("where 1 = 1");
                cPaymentTerms.GetList("where 1 = 1");
                cSC_Stores.GetList("where 1 = 1");
                cA_CostCenters.GetList("where isnull(IsMain , 0 ) = 0 order by CostCenterName"); 
                cPurchaseItem.GetList("where 1 = 1");
                cTaxeTypes.GetList("where 1= 1"); // cTaxeTypes.GetList("where isnull(IsDiscount,0) <> 1");
                cServices.GetList("where 1 = 1");
                cExpenses.GetList("where 1 = 1");
                cBranches.GetList("where 1 = 1");
                return new Object[]
                {
                srialize.Serialize(cSuppliers.lstCVarSuppliers), //0
                srialize.Serialize(cCurrencies.lstCVarvwCurrencyDetails), //1
                srialize.Serialize(cNoAccessPaymentType.lstCVarNoAccessPaymentType),//2
                srialize.Serialize(cSC_Stores.lstCVarSC_Stores),//3
                srialize.Serialize(cA_CostCenters.lstCVarA_CostCenters) , //4
                srialize.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItemPS) , //5
                srialize.Serialize(cTaxeTypes.lstCVarTaxeTypes) , //6
                srialize.Serialize(cServices.lstCVarServices) , //7
                srialize.Serialize(cExpenses.lstCVarExpenses)   , //8
                    new JavaScriptSerializer().Serialize(Units.lstCVarPackageTypes) , //9
                  srialize.Serialize(cPaymentTerms.lstCVarPaymentTerms) ,//10   ,
                   srialize.Serialize(cBranches.lstCVarBranches) ,//11   
                   srialize.Serialize(objCWH_PackageTypeBarCode.lstCVarvwWH_PackageTypeBarCode) //12   
                };
            }
            else
            {
                CSC_Transactions cSC_Transactions = new CSC_Transactions();

                CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
                cCurrencies.GetList(" where  CONVERT(date , \'" + pDate + "\') between  CONVERT(date ,FromDate) and  CONVERT(date ,ToDate) ");

                int _RowCount2 = 0;
                CvwDefaults objCDefaults = new CvwDefaults();
                objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount2);
                string CompanyName = objCDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
                var SC_TransactionsCondition = "";
                if (CompanyName=="AGR")
                {
                    SC_TransactionsCondition = " where (SC_Transactions.ID not In( select isnull( vw.TransactionID , 0 ) from vwPS_Invoices vw where isnull(vw.IsDeleted,0) = 0 and vw.TransactionID is not null and IsNULL(vw.IsFromTrans , 0) = 1 ) or SC_Transactions.PurchaseInvoiceID = " + pID + ") and SC_Transactions.TransactionTypeID = 10 and isnull(SC_Transactions.IsDeleted , 0) = 0";

                }
                else
                {
                     SC_TransactionsCondition = " where (SC_Transactions.ID not In( select isnull( vw.TransactionID , 0 ) from vwPS_Invoices vw where isnull(vw.IsDeleted,0) = 0 and vw.TransactionID is not null and IsNULL(vw.IsFromTrans , 0) = 1 ) or SC_Transactions.PurchaseInvoiceID = " + pID + ") and SC_Transactions.TransactionTypeID = 10 and isnull(SC_Transactions.IsDeleted , 0) = 0 and Isnull(ExaminationID , 0) <> 0";

                }
                cSC_Transactions.GetList(SC_TransactionsCondition);

                //------------------------------------------------------------------------------------------------------
                CPS_PurchasingOrders cPS_PurchasingOrders = new CPS_PurchasingOrders();
                var PS_PurchasingOrderConditionCondition = " where ";
                PS_PurchasingOrderConditionCondition += " ( ";
                PS_PurchasingOrderConditionCondition += " Isnull(dbo.PS_PurchasingOrders.IsApproved , 0 ) = 1 ";
                PS_PurchasingOrderConditionCondition += " AND ";
                PS_PurchasingOrderConditionCondition += " Isnull(dbo.PS_PurchasingOrders.IsDeleted , 0 ) = 0 ";
                PS_PurchasingOrderConditionCondition += " AND ";
                PS_PurchasingOrderConditionCondition += " (not EXISTS (select top(1) INV.ID from dbo.PS_Invoices INV where INV.OrderID = dbo.PS_PurchasingOrders.ID AND IsNull( INV.IsDeleted , 0 ) = 0 AND INV.ID <> " + pID + " )) ";
                PS_PurchasingOrderConditionCondition += " ) ";
                cPS_PurchasingOrders.GetList(PS_PurchasingOrderConditionCondition);
                //-------------------------------------------------------------------------------------------------------
                CPS_SupplyOrders cPS_SupplyOrders = new CPS_SupplyOrders();
                var PS_SupplyOrderCondition = " where ";
                PS_SupplyOrderCondition += " ( ";
                PS_SupplyOrderCondition += " Isnull(dbo.PS_SupplyOrders.IsApproved , 0 ) = 1 ";
                PS_SupplyOrderCondition += " AND ";
                PS_SupplyOrderCondition += " Isnull(dbo.PS_SupplyOrders.IsDeleted , 0 ) = 0 ";
                PS_SupplyOrderCondition += " AND ";
                PS_SupplyOrderCondition += " (not EXISTS (select top(1) INV.ID from dbo.PS_Invoices INV where INV.SupplyOrderID = dbo.PS_SupplyOrders.ID AND IsNull( INV.IsDeleted , 0 ) = 0 AND INV.ID <> " + pID + " )) ";
                PS_SupplyOrderCondition += " ) ";
                cPS_SupplyOrders.GetList(PS_SupplyOrderCondition);

                return new Object[]
                {
                    srialize.Serialize(cCurrencies.lstCVarvwCurrencyDetails) ,
                    srialize.Serialize(cSC_Transactions.lstCVarSC_Transactions) ,
                      srialize.Serialize(cPS_PurchasingOrders.lstCVarPS_PurchasingOrders),
                       srialize.Serialize(cPS_SupplyOrders.lstCVarPS_SupplyOrders)
                };
            }
        }


        // [Route("/api/PS_Invoices/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {


            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;


            CPS_Invoices objCPS_Invoices = new CPS_Invoices();
            //objCPS_Invoices.GetList(string.Empty);
            Int32 _RowCount = 0;// objCPS_Invoices.lstCVarPS_Invoices.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' "
                + " OR AccountName LIKE '%" + pSearchKey + "%' "
            +" OR SubAccountName LIKE '%" + pSearchKey + "%' ";

            objCPS_Invoices.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { srialize.Serialize(objCPS_Invoices.lstCVarPS_Invoices), _RowCount };
        }


        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwPS_Invoices cPS_Invoices = new CvwPS_Invoices();
            Int32 _RowCount = 0;
            cPS_Invoices.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(cPS_Invoices.lstCVarvwPS_Invoices), _RowCount };
        }


        [HttpGet, HttpPost]
        public object[] LoadDetails(string pWhereClause)
        {
            if(pWhereClause.Contains("where \'**LoadItemsFromTrans**\'=\'**LoadItemsFromTrans**\'"))
            {

                CSC_TransactionsDetails cSC_TransactionsDetails = new CSC_TransactionsDetails();
                cSC_TransactionsDetails.GetList(pWhereClause);

                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new Object[] {
                serializer.Serialize(cSC_TransactionsDetails.lstCVarSC_TransactionsDetails) };
            }
            else if (pWhereClause.Contains("where \'**LoadItemsFromPurchasingOrder**\'=\'**LoadItemsFromPurchasingOrder**\'"))
            {

                Int32 _RowCount = 0;
             
                CvwPS_PurchasingOrdersHeaderDetails cvwPS_PurchasingOrdersDetails = new CvwPS_PurchasingOrdersHeaderDetails();
                cvwPS_PurchasingOrdersDetails.GetListPaging(100000, 1, pWhereClause, " ID DESC ", out _RowCount);

                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new Object[] {
                serializer.Serialize(cvwPS_PurchasingOrdersDetails.lstCVarvwPS_PurchasingOrdersHeaderDetails) };
            }
            else if (pWhereClause.Contains("where \'**LoadItemsFromSupplyOrder**\'=\'**LoadItemsFromSupplyOrder**\'"))
            {

                Int32 _RowCount = 0;



                CvwPS_SupplyOrdersHeaderDetails cvwPS_SupplyOrdersHeaderDetails = new CvwPS_SupplyOrdersHeaderDetails();
                cvwPS_SupplyOrdersHeaderDetails.GetListPaging(100000, 1, pWhereClause, " ID DESC ", out _RowCount);

                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new Object[] {
                serializer.Serialize(cvwPS_SupplyOrdersHeaderDetails.lstCVarvwPS_SupplyOrdersHeaderDetails) };
            }
            else
            {
                CvwPS_InvoicesDetails cPS_InvoicesDetails = new CvwPS_InvoicesDetails();
                CvwPS_InvoicesExpenses cPS_InvoicesExpenses = new CvwPS_InvoicesExpenses();
                CvwPS_InvoicesTaxes cPS_InvoicesTaxes = new CvwPS_InvoicesTaxes();
                cPS_InvoicesExpenses.GetList(pWhereClause);
                cPS_InvoicesTaxes.GetList(pWhereClause);

                int _RowCount = 0;
                cPS_InvoicesDetails.GetListPaging(100000, 1, pWhereClause, " ID DESC ", out _RowCount);
                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new Object[] {
                serializer.Serialize(cPS_InvoicesDetails.lstCVarvwPS_InvoicesDetails),
                serializer.Serialize(cPS_InvoicesExpenses.lstCVarvwPS_InvoicesExpenses) ,
                serializer.Serialize(cPS_InvoicesTaxes.lstCVarvwPS_InvoicesTaxes) };
            }
        }

        

        public void CheckSavedPS(string pIsFromTrans , string pTransactionID ,ref CVarPS_Invoices objCVarPS_Invoices ,ref CPS_Invoices objCPS_Invoices ,ref Exception checkException, ref long? _result )
        {
            if (bool.Parse(pIsFromTrans))
            {
                CSC_Transactions sC_Transactions = new CSC_Transactions();
                sC_Transactions.GetList("where ID = " + pTransactionID);
                var transaction_date = sC_Transactions.lstCVarSC_Transactions[0].TransactionDate;








                if (objCVarPS_Invoices.InvoiceDate >= transaction_date)
                {
                    objCPS_Invoices.lstCVarPS_Invoices.Add(objCVarPS_Invoices);
                    checkException = objCPS_Invoices.SaveMethod(objCPS_Invoices.lstCVarPS_Invoices);
                    _result = 0;

                }
                else
                {
                    _result = null;
                    // checkException.Message = "Date Must >= Good Receipt Note Date";

                }



            }
            else
            {
                objCPS_Invoices.lstCVarPS_Invoices.Add(objCVarPS_Invoices);
                checkException = objCPS_Invoices.SaveMethod(objCPS_Invoices.lstCVarPS_Invoices);
                _result = 0;
            }

        }



       // http://localhost:7059/api/PS_Invoices/Save?pID=0&pInvoiceNo=0&pInvoiceDate=07%2F26%2F2020&pQuotationID=0&pSupplierID=259&pTotalBeforTax=37.00&pTotalPrice=37.00&pDiscount=0.00&pDiscountPercentage=0.00&pNotes=0&pDepartmentID=0&pSalesManID=0&pCostCenter_ID=0&pPaymentMethodID=50&pISDiscountBeforeTax=false&pInvoiceNoManual=0&pOrderID=0&

        [HttpGet, HttpPost]
        public long? Save(
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
        string pPaymentTermID,
        string pIsApproved,
        string pISDiscountBeforeTax,
        string pInvoiceNoManual,
        string pOrderID,
        string pSupplyOrderID,
        string pJVID,
        string pCurrencyID,
        string pExchangeRate,
        string pLocalTotalBeforeTax,
        string pLocalTotal ,
        string pIsDeleted ,
        string pSupplierInvoiceNo  , 
        string pTaxesAmount, 
        string pItemsAmount,
        string pServicesAmount,
        string pExpensesAmount , 
        string pIsFixedDiscount, 
        string pIsFromTrans ,
        string pTransactionID ,
        string pEntitlementDays , string pBranchID

            )
        {
            
            TimeSpan FirsrDayTime = new TimeSpan(7, 0, 0); // new TimeSpan(7, 0, 0);
            Exception checkException = new Exception();
           long? _result = null;
            //---- Get Last Code
            var objlastcode = new CPS_Invoices();
            CVarPS_Invoices objCVarPS_Invoices = new CVarPS_Invoices();
            if (int.Parse(pID) == 0)
            {
                objlastcode.GetList("WHERE ID = (select max(ID) from PS_Invoices where Isnull(IsDeleted , 0) = 0 and DATEPART(year, PS_Invoices.InvoiceDate) = '" + pInvoiceDate.Year + "')");
                var lastcode = objlastcode.lstCVarPS_Invoices.Count == 0 ? 0 : int.Parse(objlastcode.lstCVarPS_Invoices[0].InvoiceNo);
                //----
               
                objCVarPS_Invoices.InvoiceNo = (lastcode + 1).ToString();
                objCVarPS_Invoices.InvoiceNoManual = (lastcode + 1).ToString();
            }
            else
            {
                objCVarPS_Invoices.InvoiceNo = pInvoiceNo;
                objCVarPS_Invoices.InvoiceNoManual = pInvoiceNo;
            }
            objCVarPS_Invoices.IsFromTrans = bool.Parse( ( pIsFromTrans == null ? "false" : pIsFromTrans ));
            objCVarPS_Invoices.InvoiceDate = pInvoiceDate.Date + FirsrDayTime;
            objCVarPS_Invoices.QuotationID = int.Parse( (pQuotationID == null ? "0" : pQuotationID) );
            objCVarPS_Invoices.SupplierID = int.Parse( (pSupplierID == null ? "0" : pSupplierID ));
            objCVarPS_Invoices.TotalBeforTax = decimal.Parse( pTotalBeforTax == null ? "0" : pTotalBeforTax);
            objCVarPS_Invoices.TotalPrice = decimal.Parse( pTotalPrice == null ? "0" : pTotalPrice);
            objCVarPS_Invoices.Discount = decimal.Parse( pDiscount == null ? "0" : pDiscount);
            objCVarPS_Invoices.DiscountPercentage = decimal.Parse( pDiscountPercentage == null ? "0" : pDiscountPercentage);
            objCVarPS_Invoices.Notes = (pNotes == null ? "0" : pNotes );
            objCVarPS_Invoices.DepartmentID = int.Parse( pDepartmentID == null ? "0" : pDepartmentID);
            objCVarPS_Invoices.SalesManID = int.Parse( pSalesManID == null ? "0" : pSalesManID);
            objCVarPS_Invoices.CostCenter_ID = int.Parse(pCostCenter_ID == null ? "0" : pCostCenter_ID);
            objCVarPS_Invoices.PaymentMethodID = int.Parse( pPaymentMethodID == null ? "0" : pPaymentMethodID);
            objCVarPS_Invoices.PaymentTermID = int.Parse(pPaymentTermID == null ? "0" : pPaymentTermID);
            objCVarPS_Invoices.IsApproved = bool.Parse( pIsApproved == null ? "false" : pIsApproved);
            objCVarPS_Invoices.ISDiscountBeforeTax = bool.Parse( pISDiscountBeforeTax == null ? "0" : pISDiscountBeforeTax );
            objCVarPS_Invoices.IsFixedDiscount = bool.Parse(pIsFixedDiscount == null ? "false" : pIsFixedDiscount);
            objCVarPS_Invoices.IsDeleted = bool.Parse(pIsDeleted == null ? "false" : pIsDeleted);
            objCVarPS_Invoices.OrderID = long.Parse(pOrderID == null ? "0" : pOrderID);
            objCVarPS_Invoices.SupplyOrderID = long.Parse(pSupplyOrderID == null ? "0" : pSupplyOrderID);
            objCVarPS_Invoices.JVID = int.Parse(pJVID == null ? "0" : pJVID);
            objCVarPS_Invoices.CurrencyID = int.Parse(pCurrencyID == null ? "0" : pCurrencyID);
            objCVarPS_Invoices.ExchangeRate = decimal.Parse( pExchangeRate == null ? "0" : pExchangeRate);
            objCVarPS_Invoices.LocalTotalBeforeTax = decimal.Parse( pLocalTotalBeforeTax == null ? "0" : pLocalTotalBeforeTax);
            objCVarPS_Invoices.LocalTotal =decimal.Parse( pLocalTotal == null ? "0" : pLocalTotal);
            objCVarPS_Invoices.IsDeleted = false;
            objCVarPS_Invoices.PaidAmount = 0;
            objCVarPS_Invoices.RemainAmount = 0;
            objCVarPS_Invoices.SupplierInvoiceNo = pSupplierInvoiceNo == null ? "0" : pSupplierInvoiceNo ;
            objCVarPS_Invoices.TaxesAmount = decimal.Parse(pTaxesAmount == null ? "0" : pTaxesAmount);
            objCVarPS_Invoices.ItemsAmount = decimal.Parse(pItemsAmount == null ? "0" : pItemsAmount);
            objCVarPS_Invoices.ServicesAmount = decimal.Parse(pServicesAmount == null ? "0" : pServicesAmount);
            objCVarPS_Invoices.ExpensesAmount = decimal.Parse(pExpensesAmount == null ? "0" : pExpensesAmount);
            objCVarPS_Invoices.ID = long.Parse(pID);
            objCVarPS_Invoices.TransactionID = int.Parse(pTransactionID == null ? "0" : pTransactionID);
            objCVarPS_Invoices.EntitlementDays = int.Parse(pEntitlementDays == null ? "0" : pEntitlementDays);
            objCVarPS_Invoices.BranchID = int.Parse(pBranchID == null ? "0" : pBranchID);
            


            CPS_Invoices objCPS_Invoices = new CPS_Invoices();

            var historyOfPS = new CPS_Invoices();
            historyOfPS.GetList("where ID = " + pID + "");
            
            if (int.Parse(pID) != 0)
            {
                if (historyOfPS.lstCVarPS_Invoices[0].IsApproved == true)
                {
                    _result = null;

                }
                else
                {
                    CheckSavedPS(pIsFromTrans, pTransactionID,ref objCVarPS_Invoices,ref objCPS_Invoices,ref checkException, ref _result);
                }


            }
            else
            {
                   CheckSavedPS(pIsFromTrans, pTransactionID,ref objCVarPS_Invoices,ref objCPS_Invoices,ref checkException, ref _result);

            }
           
            
            if (checkException != null ||  _result == null) // an exception is caught in the model
            {
               // if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
            {
                CSC_Transactions cSC_Transactions = new CSC_Transactions();
                checkException =  cSC_Transactions.UpdateList( " PurchaseInvoiceID = " + objCVarPS_Invoices.ID + " , IsOutOfStore = 0 where ID = " + pTransactionID);
                if (checkException != null || _result == null ) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = 0;
                }
                else
                {
                    _result = objCVarPS_Invoices.ID;



                }
            }
            if (_result != 1)
            {
                #region Tax
                CvwDefaults objCDefaults = new CvwDefaults();
                int _RowCount2 = 0;
                objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount2);
                string CompanyName = objCDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
                if (CompanyName == "CHMmm" && checkException == null)
                {
                    CTaxLink objCTaxLinkHeader = new CTaxLink();
                    objCTaxLinkHeader.GetList("WHERE Notes='PS_Invoices' and OriginID=" + pID);
                    CSuppliersTax objCCSuppliersTax = new CSuppliersTax();
                    objCCSuppliersTax.GetList("WHERE id=" + pSupplierID);
                    CVarPS_InvoicesTAX objCVarPS_InvoicesTax = new CVarPS_InvoicesTAX();
                    if (int.Parse(pID) == 0)
                    {


                        objCVarPS_InvoicesTax.InvoiceNo = objCVarPS_Invoices.InvoiceNo;
                        objCVarPS_InvoicesTax.InvoiceNoManual = objCVarPS_Invoices.InvoiceNoManual;
                    }
                    else
                    {
                        objCVarPS_InvoicesTax.InvoiceNo = pInvoiceNo;
                        objCVarPS_InvoicesTax.InvoiceNoManual = pInvoiceNo;
                    }
                    objCVarPS_InvoicesTax.IsFromTrans = bool.Parse((pIsFromTrans == null ? "false" : pIsFromTrans));
                    objCVarPS_InvoicesTax.InvoiceDate = pInvoiceDate.Date + FirsrDayTime;
                    objCVarPS_InvoicesTax.QuotationID = 0;
                    objCVarPS_InvoicesTax.SupplierID = objCCSuppliersTax.lstCVarSuppliersTax.Count > 0 ? objCCSuppliersTax.lstCVarSuppliersTax[0].ID : 0;
                    objCVarPS_InvoicesTax.TotalBeforTax = decimal.Parse(pTotalBeforTax == null ? "0" : pTotalBeforTax);
                    objCVarPS_InvoicesTax.TotalPrice = decimal.Parse(pTotalPrice == null ? "0" : pTotalPrice);
                    objCVarPS_InvoicesTax.Discount = decimal.Parse(pDiscount == null ? "0" : pDiscount);
                    objCVarPS_InvoicesTax.DiscountPercentage = decimal.Parse(pDiscountPercentage == null ? "0" : pDiscountPercentage);
                    objCVarPS_InvoicesTax.Notes = (pNotes == null ? "0" : pNotes);
                    objCVarPS_InvoicesTax.DepartmentID = int.Parse(pDepartmentID == null ? "0" : pDepartmentID);
                    objCVarPS_InvoicesTax.SalesManID = int.Parse(pSalesManID == null ? "0" : pSalesManID);
                    objCVarPS_InvoicesTax.CostCenter_ID = 0;
                    objCVarPS_InvoicesTax.PaymentMethodID = int.Parse(pPaymentMethodID == null ? "0" : pPaymentMethodID);
                    objCVarPS_InvoicesTax.PaymentTermID = int.Parse(pPaymentTermID == null ? "0" : pPaymentTermID);
                    objCVarPS_InvoicesTax.IsApproved = bool.Parse(pIsApproved == null ? "false" : pIsApproved);
                    objCVarPS_InvoicesTax.ISDiscountBeforeTax = bool.Parse(pISDiscountBeforeTax == null ? "0" : pISDiscountBeforeTax);
                    objCVarPS_InvoicesTax.IsFixedDiscount = bool.Parse(pIsFixedDiscount == null ? "false" : pIsFixedDiscount);
                    objCVarPS_InvoicesTax.IsDeleted = bool.Parse(pIsDeleted == null ? "false" : pIsDeleted);
                    objCVarPS_InvoicesTax.OrderID = long.Parse(pOrderID == null ? "0" : pOrderID);
                    objCVarPS_InvoicesTax.SupplyOrderID = long.Parse(pSupplyOrderID == null ? "0" : pSupplyOrderID);
                    objCVarPS_InvoicesTax.JVID = 0;
                    objCVarPS_InvoicesTax.CurrencyID = int.Parse(pCurrencyID == null ? "0" : pCurrencyID);
                    objCVarPS_InvoicesTax.ExchangeRate = decimal.Parse(pExchangeRate == null ? "0" : pExchangeRate);
                    objCVarPS_InvoicesTax.LocalTotalBeforeTax = decimal.Parse(pLocalTotalBeforeTax == null ? "0" : pLocalTotalBeforeTax);
                    objCVarPS_InvoicesTax.LocalTotal = decimal.Parse(pLocalTotal == null ? "0" : pLocalTotal);
                    objCVarPS_InvoicesTax.IsDeleted = false;
                    objCVarPS_InvoicesTax.PaidAmount = 0;
                    objCVarPS_InvoicesTax.RemainAmount = 0;
                    objCVarPS_InvoicesTax.SupplierInvoiceNo = pSupplierInvoiceNo == null ? "0" : pSupplierInvoiceNo;
                    objCVarPS_InvoicesTax.TaxesAmount = decimal.Parse(pTaxesAmount == null ? "0" : pTaxesAmount);
                    objCVarPS_InvoicesTax.ItemsAmount = decimal.Parse(pItemsAmount == null ? "0" : pItemsAmount);
                    objCVarPS_InvoicesTax.ServicesAmount = decimal.Parse(pServicesAmount == null ? "0" : pServicesAmount);
                    objCVarPS_InvoicesTax.ExpensesAmount = decimal.Parse(pExpensesAmount == null ? "0" : pExpensesAmount);
                    objCVarPS_InvoicesTax.ID = objCTaxLinkHeader.lstCVarTaxLink.Count > 0 ? objCTaxLinkHeader.lstCVarTaxLink[0].TaxID : long.Parse(pID);
                    objCVarPS_InvoicesTax.TransactionID = int.Parse(pTransactionID == null ? "0" : pTransactionID);
                    objCVarPS_InvoicesTax.EntitlementDays = int.Parse(pEntitlementDays == null ? "0" : pEntitlementDays);
                    objCVarPS_InvoicesTax.BranchID = int.Parse(pBranchID == null ? "0" : pBranchID);

                    CPS_InvoicesTax cCPS_InvoicesTax = new CPS_InvoicesTax();
                    cCPS_InvoicesTax.lstCVarPS_InvoicesTAX.Add(objCVarPS_InvoicesTax);
                    checkException = cCPS_InvoicesTax.SaveMethod(cCPS_InvoicesTax.lstCVarPS_InvoicesTAX);
                    if (checkException == null && int.Parse(pID) == 0)
                    {
                        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall(); // i // u // D //
                                                                                          //link
                        objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + objCVarPS_Invoices.ID + "," + objCVarPS_InvoicesTax.ID + "," + "PS_Invoices");
                       

                    }
                }
                
                #endregion

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
                var Details = serialize.Deserialize<List<CVarPS_InvoicesDetails>>(serialize.Serialize(Obj_List_Items));
                var DetailsTax = serialize.Deserialize<List<CVarPS_InvoicesDetailsTAX>>(serialize.Serialize(Obj_List_Items));

                var Expenses = serialize.Deserialize<List<CVarPS_InvoicesExpenses>>(serialize.Serialize(Obj_List_Expenses));
                var Taxes = serialize.Deserialize<List<CVarPS_InvoicesTaxes>>(serialize.Serialize(Obj_List_Taxes));
                Exception checkException = new Exception();
                CPS_InvoicesDetails cPS_InvoicesDetails = new CPS_InvoicesDetails();
                CPS_InvoicesDetailsTax cPS_InvoicesDetailsTax = new CPS_InvoicesDetailsTax();
                CTaxLink objcTaxLink = new CTaxLink();
                CPS_InvoicesExpenses cPS_InvoicesExpenses = new CPS_InvoicesExpenses();
                CPS_InvoicesTaxes cPS_InvoicesTaxes = new CPS_InvoicesTaxes();
                if (Details != null && Details.Count > 0)
                {
                    checkException = cPS_InvoicesDetails.SaveMethod(Details);
                    //cPS_InvoicesDetailsTax.DeleteList("where InvoiceID = " + Details[0].InvoiceID);

                    CvwDefaults objCDefaults = new CvwDefaults();
                    int _RowCount2 = 0;
                    objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount2);
                    string CompanyName = objCDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

                    if (CompanyName == "CHMmm" && checkException == null)
                    {
                        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall(); // i // u // D //

                        CTaxLink objCTaxLink = new CTaxLink();

                        objCTaxLink.GetList("WHERE Notes='PS_Invoices' and OriginID=" + Details[0].InvoiceID);

                        objCCustomizedDBCall.ExecuteQuery_DataTable("delete ForwardingTransChemTax.dbo.PS_InvoicesDetails where InvoiceID=" + objCTaxLink.lstCVarTaxLink[0].TaxID);                                                            //link

                        checkException = cPS_InvoicesDetailsTax.SaveMethod(DetailsTax);

                        objCTaxLink.GetList("WHERE Notes='PS_Invoices' and OriginID=" + Details[0].InvoiceID);



                        if (objCTaxLink.lstCVarTaxLink.Count > 0)
                        {
                            checkException = cPS_InvoicesDetailsTax.UpdateList("InvoiceID =" + objCTaxLink.lstCVarTaxLink[0].TaxID + " where  InvoiceID  IN(" + Details[0].InvoiceID + ")");

                        }

                    }



                    var DetailsIDs = String.Join(",", Details.Select(x => x.ID).ToList());
                    cPS_InvoicesDetails.DeleteList("where InvoiceID = " + Details[0].InvoiceID + " and ID Not IN(" + DetailsIDs + ")");
                }
                else
                {
                    cPS_InvoicesDetails.DeleteList("where InvoiceID = " + Details[0].InvoiceID);
                }
                //*********************
                if (Expenses != null && Expenses.Count > 0)
                {
                    checkException = cPS_InvoicesExpenses.SaveMethod(Expenses);
                    var DetailsIDs1 = String.Join(",", Expenses.Select(x => x.ID).ToList());
                    cPS_InvoicesExpenses.DeleteList("where InvoiceID = " + Details[0].InvoiceID + " and ID Not IN(" + DetailsIDs1 + ")");
                }
                else
                {
                    cPS_InvoicesExpenses.DeleteList("where InvoiceID = " + Details[0].InvoiceID);
                }
                //**********************
                if (Taxes != null && Taxes.Count > 0)
                {
                    checkException = cPS_InvoicesTaxes.SaveMethod(Taxes);
                    var DetailsIDs2 = String.Join(",", Taxes.Select(x => x.ID).ToList());
                    cPS_InvoicesTaxes.DeleteList("where InvoiceID = " + Details[0].InvoiceID + " and ID Not IN(" + DetailsIDs2 + ")");
                }
                else
                {
                    cPS_InvoicesTaxes.DeleteList("where InvoiceID = " + Details[0].InvoiceID);

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

                var Ready = 0;
                CPurchaseItem objCPurchaseItem = new CPurchaseItem();
                CPS_InvoicesDetails objCSC_TransactionsDetails = new CPS_InvoicesDetails();
                objCSC_TransactionsDetails.GetList("where InvoiceID=" + Details[0].InvoiceID);
                if (objCSC_TransactionsDetails.lstCVarPS_InvoicesDetails.Count > 0 && Ready == 0)
                {
                    for (int i = 0; i < objCSC_TransactionsDetails.lstCVarPS_InvoicesDetails.Count; i++)
                    {
                        objCPurchaseItem.GetList("where ItemTypeID=4 AND ID=" + objCSC_TransactionsDetails.lstCVarPS_InvoicesDetails[i].ItemID);
                        if (objCPurchaseItem.lstCVarPurchaseItem.Count > 0 && Ready == 0)
                        {
                            Ready = 1;
                        }
                    }
                }


                return new object[] {
                _result , message,Ready
            };
            }
            catch   // Update Items in SC_Transaction Details
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
                //
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
        }

        [HttpGet, HttpPost]
        public object[] Delete(String pPS_InvoicesIDs)
        {
            bool _result = false;
            bool _result2 = false;


            CPS_Invoices objCPS_Invoices = new CPS_Invoices();
            CFA_Assets objFA_Assets = new CFA_Assets();

            objFA_Assets.GetList(" WHERE PSInvoiceID In(" + pPS_InvoicesIDs + ")");
            if (objFA_Assets.lstCVarFA_Assets.Count > 0)
            {
                _result = false;
                _result2 = false;
            }
            if (objFA_Assets.lstCVarFA_Assets.Count == 0)
            {
                string pUpdateClause = "";
                pUpdateClause = " IsDeleted = 1   " + " WHERE ID In(" + pPS_InvoicesIDs + ")";
                var checkException = objCPS_Invoices.UpdateList(pUpdateClause);

                int _RowCount = 0;
                CvwDefaults objCvwDefaults = new CvwDefaults();
                objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
                string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;


                if (CompanyName == "CHM")
                {
                    foreach (var currentID in pPS_InvoicesIDs.Split(','))
                    {

                        CPS_InvoicesTax objCPS_InvoicesTax = new CPS_InvoicesTax();
                        objCPS_Invoices.GetList("WHERE ID=" + currentID);

                        CTaxLink cCTaxLink = new CTaxLink();
                        cCTaxLink.GetList("where notes='PS_Invoices' and originid=" + currentID);
                        if (cCTaxLink.lstCVarTaxLink.Count > 0)
                        {
                            checkException = objCPS_InvoicesTax.UpdateList("IsDeleted = 1" + " where notes='PS_Invoices' and invoiceid  IN(" + cCTaxLink.lstCVarTaxLink[0].TaxID + ")");
                            cCTaxLink.DeleteList("where notes='PS_Invoices' and taxid=" + cCTaxLink.lstCVarTaxLink[0].TaxID);
                        }


                    }


                }
                //----
                //----

                CPS_InvoicesDetails cPS_InvoicesDetails = new CPS_InvoicesDetails();
                CPS_InvoicesExpenses cPS_InvoicesExpenses = new CPS_InvoicesExpenses();
                CPS_InvoicesTaxes cPS_InvoicesTaxes = new CPS_InvoicesTaxes();
                var pDeleteClause = "";
                pDeleteClause = "WHERE InvoiceID In(" + pPS_InvoicesIDs + ")";
                checkException = cPS_InvoicesDetails.DeleteList(pDeleteClause);
                checkException = cPS_InvoicesExpenses.DeleteList(pDeleteClause);
                checkException = cPS_InvoicesTaxes.DeleteList(pDeleteClause);

                //foreach (var currentID in pPS_InvoicesIDs.Split(','))
                //{
                //    objCPS_Invoices.lstDeletedCPKPS_Invoices.Add(new CPKPS_Invoices() { ID = Int32.Parse(currentID.Trim()) });
                //}

                //Exception checkException = objCPS_Invoices.DeleteItem(objCPS_Invoices.lstDeletedCPKPS_Invoices);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                        _result = false;
                }
                else //deleted successfully
                {
                    CSC_Transactions cSC_Transactions = new CSC_Transactions();
                    _result = true;
                    _result2 = true;

                    string pUpdateClause1 = "";
                    pUpdateClause1 = " PurchaseInvoiceID = 0 , IsOutOfStore = 1  " + " WHERE PurchaseInvoiceID In(" + pPS_InvoicesIDs + ")";
                    var checkException11 = cSC_Transactions.UpdateList(pUpdateClause1);
                }
            }


            return new object[] { _result, _result2};
        }
    }
}
