using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
//using Shipping.MvcApp.Models.Sales.Transactions.Generated;
using Forwarding.MvcApp.Models.Customized;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
//using Shipping.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated.Payments.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkEGL.Generated.PS_Payments.Generated;
using System.Data;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkEGL.Generated;
//using MoreLinq;

    
 namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.ShipLinkEGL
{
    public static class PS_GlobalVariable
    {
        public static long PaymentID = 0; // Unmodifiable

    }
    public static class PS_Globals
    {
        public static Int32 CUserId = WebSecurity.CurrentUserId; // Unmodifiable
    }
    [Serializable]
    public class PS_CVarTotalAmount
    {
        #region "variables"
        internal String mCash;
        internal String mCheque;
        internal String mDeposite;
        internal String mTotal;
        #endregion

        #region "Methods"
        public String Cash
        {
            get { return mCash; }
            set { mCash = value; }
        }
        public String Cheque
        {
            get { return mCheque; }
            set { mCheque = value; }

        }
        public String Deposite
        {
            get { return mDeposite; }
            set { mDeposite = value; }

        }
        public String Total
        {
            get { return mTotal; }
            set { mTotal = value; }

        }
        #endregion
    }
    public class PS_CTotalAmount
    {
        #region "variables"
        /*If "App.Config" isnot exist add it to your Application
		Add this code after <Configuration> tag
		-------------------------------------------------------
		<appsettings>
		<add key="ConnectionString" value="............"/>
		</appsettings>
		-------------------------------------------------------
		where ".........." is connection string to database server*/
      
        public List<PS_CVarTotalAmount> lstPS_CVarTotalAmount = new List<PS_CVarTotalAmount>();
        #endregion
    }

    public class PS_PaymentsTempController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] IntializeData(string pDate, string pOnlyCurrency)
        {
            if (!bool.Parse(pOnlyCurrency))
            {

                //CCustomers cClients = new CCustomers();
                CCustomers cClients = new CCustomers();

                cClients.GetList("where 1 = 1");
                return new Object[]
                {
                new JavaScriptSerializer().Serialize(cClients.lstCVarCustomers)
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
        public Object[] LoadAllClientsGroupsByName()
        {
            int _RowCount = 0;
            CvwSL_ClientsGroups objCvwSL_ClientsGroups = new CvwSL_ClientsGroups();

            objCvwSL_ClientsGroups.GetListPaging(9999, 1, "WHERE 1=1", "Name", out _RowCount);

            return new Object[] {
                 new JavaScriptSerializer().Serialize(objCvwSL_ClientsGroups.lstCVarvwSL_ClientsGroups) //pAccounts = pData[0]};
                 ,_RowCount
                 };
        }
        [HttpGet, HttpPost]
        public Object[] LoadAllBanksByName(string pBankID)
        {
            //CvwPS_Payments objCPS_Payments = new CvwPS_Payments();
            //// objCSL_Payments.GetListBanksByName(" order by " + pBankID);
            ////objCPS_Payments.GetListBanksByName("where DefaultCurrencyID = "+pBankID);
            //objCPS_Payments.GetListBanksByName("where 1 = 1");


            CBankAccount CBank = new CBankAccount();
            CBank.GetList("WHERE 1=1");


            return new Object[] { new JavaScriptSerializer().Serialize(CBank.lstCVarBankAccount.ToList()) };
       
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllSafesByName(string pSafeID)
        {
            //CvwPS_Payments objCPS_Payments = new CvwPS_Payments();
            ////objCSL_Payments.GetListSafesByName(" order by " + pSafeID);
            //objCPS_Payments.GetListSafesByName(" where DefaultCurrencyID =" + pSafeID);

            //return new Object[] { new JavaScriptSerializer().Serialize(objCPS_Payments.lstCVarvwPS_Payments.ToList()) };
           // CvwSafesForLinkinkUsers objCSL_Payments = new CvwSafesForLinkinkUsers();
           // //objCSL_Payments.GetListSafesByName(" order by " + pSafeID);
           //// objCSL_Payments.GetList("where DefaultCurrencyID =" + pSafeID + "  AND UserID=" + WebSecurity.CurrentUserId);
           // objCSL_Payments.GetList("where 1=1");

            CTreasury objCSafes = new CTreasury();
            objCSafes.GetList("where 1=1");


            return new Object[] { new JavaScriptSerializer().Serialize(objCSafes.lstCVarTreasury.ToList()) };

        }

        [HttpGet, HttpPost]
        public Object[] LoadAllUsersByName(string pOrderBy)
        {
            CvwPS_Payments objCPS_Payments = new CvwPS_Payments();
            objCPS_Payments.GetListUsersByName(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objCPS_Payments.lstCVarvwPS_Payments.ToList()) };
        }
        
        [HttpGet, HttpPost]
        public Object[] LoadAllCurrencyByName(string pCurrencyID)
        {
            CvwPS_Payments objCPS_Payments = new CvwPS_Payments();
            objCPS_Payments.GetListCurrencyByName(" order by " + pCurrencyID);
            return new Object[] { new JavaScriptSerializer().Serialize(objCPS_Payments.lstCVarvwPS_Payments.ToList()) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllClientsByName(string pBillNo)

        {
            // string WhereClause = pBillNo + " And IsPaid = 0 And IsAudited = 1";
            string WhereClause = pBillNo;


            //CvwPS_Payments objCSL_Payments = new CvwPS_Payments();
            //objCSL_Payments.GetListClientsByName(WhereClause);
            CvwSL_selectClientNameByNoPayment objCSL_Payments = new CvwSL_selectClientNameByNoPayment();
            objCSL_Payments.GetList(WhereClause);
            // objCSL_Payments.Distinct


            return new Object[] { new JavaScriptSerializer().Serialize(objCSL_Payments.lstCVarvwSL_selectClientNameByNoPayment) };
        }

        [HttpGet, HttpPost]
        public Object[] GetAccountIDAndSubAccountID(Int64 pClientID)
        {
            
            CvwPS_Payments objCSL_Payments = new CvwPS_Payments();
            objCSL_Payments.GetListAccountIDAndSubAccountID(pClientID);
            return new Object[] { new JavaScriptSerializer().Serialize(objCSL_Payments.lstCVarvwPS_Payments) };
            //return new Object[] {
            //    , pID //pVoucherID = pData[1]
            //    , new JavaScriptSerializer().Serialize(objCSL_Payments.lstCVarvwSL_Payments)
            //    , VCODE //pCode pData[3]
            //};
        }
        [HttpGet, HttpPost]
        public Object[] CheckFiscalYear(DateTime pVoucherDate)
        {
            bool _result = true;
            Exception checkException = null;
            string pMessageReturned = "";

            CA_Fiscal_Year objCA_Fiscal_Year = new CA_Fiscal_Year();
            CA_Fiscal_Year_Period objCA_Fiscal_Year_Period = new CA_Fiscal_Year_Period();
            CFreezeSystemTransactions objCFreezeSystemTransactions = new CFreezeSystemTransactions();


            checkException = objCA_Fiscal_Year.GetList("WHERE Confirmed=1 AND Fiscal_Year_Name=N'" + pVoucherDate.Year + "'");
            checkException = objCA_Fiscal_Year_Period.GetList("WHERE '" + pVoucherDate.ToString("yyyy/MM/dd") + "' BETWEEN From_Date AND To_Date and Closed=1");
            checkException = objCFreezeSystemTransactions.GetList("WHERE TransType='All' AND ('" + pVoucherDate.ToString("yyyy/MM/dd") + "' BETWEEN FromDate AND ToDate)");
            #region Check FiscalYear is Confirmed and NOT Closed
            if (objCA_Fiscal_Year.lstCVarA_Fiscal_Year.Count == 0)
            {
                pMessageReturned = "This fiscal year is not confirmed.";
                _result = false;
                //throw new Exception();
            }
            else if (objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count > 0)
            {
                pMessageReturned = "This fiscal year is closed.";
                _result = false;
               // throw new Exception();
            }
            #endregion Check FiscalYear is Confirmed and NOT Closed

            #region Check Period is Not Frozen
            if (objCFreezeSystemTransactions.lstCVarFreezeSystemTransactions.Count > 0)
            {
                pMessageReturned = "The transactions for this date is frozen.";
                _result = false;
               // throw new Exception();
            }
            #endregion Check Period is Not Frozen

            return new object[] {
                _result,pMessageReturned
            };
        }
        [HttpGet, HttpPost]
        public Object[] CheckFromRefNo(string pReferenceNo, string pSwiftCode)
        {
            bool _result = true;
            Exception checkException = null;
            string pMessageReturned = "";
            CA_Voucher objCA_Voucherrefno = new CA_Voucher();


            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            int NumberReferenceNo = pReferenceNo.Split(',').Length;
            for (int i = 0; i < NumberReferenceNo; i++)
            {
                if (pReferenceNo.Split(',')[i].Trim() != "" && pReferenceNo.Split(',')[i].Trim() != "0" && pReferenceNo.Split(',')[i].Trim() != null)
                {

                    objCA_Voucherrefno.GetList("where ReferenceNo='" + pReferenceNo.Split(',')[i].Trim() + "'");
                    if (objCA_Voucherrefno.lstCVarA_Voucher.Count > 0)
                    {
                        pMessageReturned = "ReferenceNo exists before.";
                        _result = false;
                    }

                }
            }
            int NumberSwiftCode = pSwiftCode.Split(',').Length;
            for (int i = 0; i < NumberSwiftCode; i++)
            {
                if (pSwiftCode.Split(',')[i].Trim() != "" && pSwiftCode.Split(',')[i].Trim() != "0" && pSwiftCode.Split(',')[i].Trim() != null)
                {

                    objCA_Voucherrefno.GetList("where IBAN='" + pSwiftCode.Split(',')[i].Trim() + "'");
                    if (objCA_Voucherrefno.lstCVarA_Voucher.Count > 0)
                    {
                        pMessageReturned = "Bank Reference No exists before.";
                        _result = false;
                    }

                }
            }

            return new object[] {
                _result,pMessageReturned
            };
        }
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, String pWhereClause)
        {
            GlobalConnection.CreateConnection();

            CvwPS_Payments objCPS_Payments = new CvwPS_Payments();
            
            Int32 _RowCount = objCPS_Payments.lstCVarvwPS_Payments.Count;

            objCPS_Payments.GetListPaging(pPageSize, pPageNumber, pWhereClause == null ? "" : pWhereClause, "ID", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCPS_Payments.lstCVarvwPS_Payments), _RowCount };
        }

        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CvwPS_Payments objCPS_Payments = new CvwPS_Payments();
            Int32 _RowCount = 0;
            if (pIsLoadArrayOfObjects)
            {
                objCPS_Payments.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            }


            return new object[] {
                new JavaScriptSerializer().Serialize(objCPS_Payments.lstCVarvwPS_Payments)
                , _RowCount

            };
        }
        [HttpGet, HttpPost]
        public Object[] GetRefundAccountIDAndSubAccountID(Int64 pClientID)
        {
            CvwPS_Payments objCPS_Payments = new CvwPS_Payments();
            objCPS_Payments.GetListRefundAccountIDAndSubAccountID(pClientID);
            return new Object[] { objCPS_Payments.lstCVarvwPS_Payments[0].AccountID , objCPS_Payments.lstCVarvwPS_Payments[0].SubAccountID};
        }

        [HttpGet, HttpPost]
        public bool InsertA_PaymentsAndA_PaymentInvoices(Int32 pClientID, DateTime pVoucherDate, string pPaymentNotes, string pTotalCost,
                                           string pInvoicesIDs, string pInvoicesDCNotesIDs,string PInvoicesAmounts,string PInvoicesRremain,string PInvoicesDCNotesAmounts,string PInvoicesDCNotesRremain, Int32 pPaymentCurrencyID, decimal pPaymentAmount, decimal pPaymentExchangeRate,
                                           Int32 pBankChargesCurrency, decimal pBankChargesAmount, Int32 pRefundCurrency, decimal pRefundAmount)
        {
            GlobalConnection.CreateConnection();

            bool _result = true;
            Exception checkException = null;
            string pMessageReturned = "";
            //GlobalConnection.StartBulkTrans();
            try
            {

                //CA_Fiscal_Year objCA_Fiscal_Year = new CA_Fiscal_Year();
                //CA_Fiscal_Year_Period objCA_Fiscal_Year_Period = new CA_Fiscal_Year_Period();
                //CFreezeSystemTransactions objCFreezeSystemTransactions = new CFreezeSystemTransactions();


                //checkException = objCA_Fiscal_Year.GetList("WHERE Confirmed=1 AND Fiscal_Year_Name=N'" + pVoucherDate.Year + "'");
                //checkException = objCA_Fiscal_Year_Period.GetList("WHERE '" + pVoucherDate.ToString("yyyy/MM/dd") + "' BETWEEN From_Date AND To_Date and Closed=1");
                //checkException = objCFreezeSystemTransactions.GetList("WHERE TransType='All' AND ('" + pVoucherDate.ToString("yyyy/MM/dd") + "' BETWEEN FromDate AND ToDate)");
                //#region Check FiscalYear is Confirmed and NOT Closed
                //if (objCA_Fiscal_Year.lstCVarA_Fiscal_Year.Count == 0)
                //{
                //    pMessageReturned = "This fiscal year is not confirmed.";
                //    _result = false;
                //    throw new Exception();
                //}
                //else if (objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count > 0)
                //{
                //    pMessageReturned = "This fiscal year is closed.";
                //    _result = false;
                //    throw new Exception();
                //}
                //#endregion Check FiscalYear is Confirmed and NOT Closed
         
                //#region Check Period is Not Frozen
                //if (objCFreezeSystemTransactions.lstCVarFreezeSystemTransactions.Count > 0)
                //{
                //    pMessageReturned = "The transactions for this date is frozen.";
                //    _result = false;
                //    throw new Exception();
                //}
                //#endregion Check Period is Not Frozen


                GlobalConnection.OpenConnection();
                GlobalConnection.myTrans = GlobalConnection.myConnection.BeginTransaction(IsolationLevel.ReadUncommitted);

                //CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                CPaymentsCustomizedDBCall objCCustomizedDBCall = new CPaymentsCustomizedDBCall();

                #region Insert In A_Payments
                ///////////Insert In A_Payments//////////////
                CPS_Payments objCPS_Payments = new CPS_Payments();
                CVarPS_Payments ObjCVarPS_Payments = new CVarPS_Payments();


                String Code = objCCustomizedDBCall.CallStringFunctionReturn("select  isnull(max(cast(Code as numeric)),0)+1  from PS_Payments where IsDeleted=0");
                ObjCVarPS_Payments.Code = (Code == "0" ? "1" : Code);
                ObjCVarPS_Payments.PaymentDate = pVoucherDate;
                ObjCVarPS_Payments.ClientID = pClientID;
                ObjCVarPS_Payments.Notes = pPaymentNotes == null ? "" : pPaymentNotes;
                ObjCVarPS_Payments.UserID = WebSecurity.CurrentUserId;
                ObjCVarPS_Payments.IsDeleted = false;
                ObjCVarPS_Payments.TotalPayment = Convert.ToDecimal(pTotalCost);
                ObjCVarPS_Payments.CurrencyID = pPaymentCurrencyID;
                //ObjCVarSL_Payments.PaymentAmount = pPaymentAmount;
                ObjCVarPS_Payments.ExchangeRate = pPaymentExchangeRate;
                ObjCVarPS_Payments.BankChargesAmount = pBankChargesAmount;
                ObjCVarPS_Payments.BankChargesCurrencyID = pBankChargesCurrency;
                ObjCVarPS_Payments.RefundAmount = pRefundAmount;
                ObjCVarPS_Payments.RefundCurrencyID = pRefundCurrency;
                ObjCVarPS_Payments.IsDeleted = false;


                objCPS_Payments.lstCVarPS_Payments.Add(ObjCVarPS_Payments);

                checkException = objCPS_Payments.SaveMethod(objCPS_Payments.lstCVarPS_Payments);

                if (checkException != null) // an exception is caught in the model
                {
                    
                        _result = false;
                GlobalConnection.myTrans.Rollback();

                    throw new Exception();

                }
                PS_GlobalVariable.PaymentID = ObjCVarPS_Payments.ID;
                #endregion

                #region Insert In A_PaymentInvoices
                CPS_PaymentInvoices objCA_PaymentInvoices = new CPS_PaymentInvoices();

                CVarPS_PaymentInvoices ObjCVarA_PaymentInvoices = new CVarPS_PaymentInvoices();

                if (pInvoicesIDs !=null)
                {
                    int NumberOfInvoices = pInvoicesIDs.Split(',').Length;
                    var Currentamount = PInvoicesAmounts.Split(',');
                    var Currenremain = PInvoicesRremain.Split(',');


                    for (int i = 0; i < NumberOfInvoices; i++)
                    {

                        decimal total = Convert.ToDecimal(Currenremain[i]) - Convert.ToDecimal(Currentamount[i]);
                        
                        ObjCVarA_PaymentInvoices.InvoiceID = int.Parse(pInvoicesIDs.Split(',')[i]);
                        string LastPaid = objCCustomizedDBCall.CallStringFunctionReturn("select isnull(PaidAmount,0) from PS_InvoicesTemp where ID = " + ObjCVarA_PaymentInvoices.InvoiceID);

                        decimal TotalPaid = Convert.ToDecimal(LastPaid) + Convert.ToDecimal(Currentamount[i]);
                        #region Set IsPaid In InvoiceHeader by 1
                        objCCustomizedDBCall.CallStringFunction("UPDATE PS_InvoicesTemp SET PaidAmount =" + TotalPaid + ", RemainAmount =" + total + "WHERE ID = " + ObjCVarA_PaymentInvoices.InvoiceID);

                        // objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "InvoiceHeader", Int64.Parse(ObjCVarA_PaymentInvoices.InvoiceID.ToString()), "U");
                        #endregion




                        if (PS_GlobalVariable.PaymentID != 0)
                            objCA_PaymentInvoices.lstCVarPS_PaymentInvoices.Clear();
                        ObjCVarA_PaymentInvoices.PaymentID = PS_GlobalVariable.PaymentID;
                        ObjCVarA_PaymentInvoices.PaidAmount = Convert.ToDecimal(PInvoicesAmounts.Split(',')[i]);
                        objCA_PaymentInvoices.lstCVarPS_PaymentInvoices.Add(ObjCVarA_PaymentInvoices);

                        ObjCVarA_PaymentInvoices.ID = 0;

                        checkException = objCA_PaymentInvoices.SaveMethod(objCA_PaymentInvoices.lstCVarPS_PaymentInvoices);

                        if (checkException != null)
                        {

                            _result = false;
                            GlobalConnection.myTrans.Rollback();

                            throw new Exception();
                        }
                    }
                }
                


                #endregion
                #region Insert In SL_PaymentDbtCrdtNotes
                CPS_PaymentDbtCrdtNotes objCSL_PaymentDbtCrdtNotes = new CPS_PaymentDbtCrdtNotes();

                CVarPS_PaymentDbtCrdtNotes ObjCVarSL_PaymentDbtCrdtNotes = new CVarPS_PaymentDbtCrdtNotes();

                if (pInvoicesDCNotesIDs !=null)
                {
                    int NumberOfInvoicesDCNotesIDss = pInvoicesDCNotesIDs.Split(',').Length;
                    var CurrentamountDC = PInvoicesDCNotesAmounts.Split(',');
                    var CurrenremainDC = PInvoicesDCNotesRremain.Split(',');
                    

                    for (int i = 0; i < NumberOfInvoicesDCNotesIDss; i++)
                    {
                        decimal totalDC = Convert.ToDecimal(CurrenremainDC[i]) - Convert.ToDecimal(CurrentamountDC[i]);

                        ObjCVarSL_PaymentDbtCrdtNotes.DbtCrdtNotesID = int.Parse(pInvoicesDCNotesIDs.Split(',')[i]);
                        string LastPaid = objCCustomizedDBCall.CallStringFunctionReturn("select isnull(PaidAmount,0) from PS_DbtCrdtNotes where ID = " + ObjCVarSL_PaymentDbtCrdtNotes.DbtCrdtNotesID);
                        decimal TotalPaid = Convert.ToDecimal(LastPaid) + Convert.ToDecimal(CurrentamountDC[i]);
                        #region Set IsPaid In InvoiceHeader by 1
                        objCCustomizedDBCall.CallStringFunction("UPDATE PS_DbtCrdtNotes SET PaidAmount =" + TotalPaid + ", RemainAmount =" + totalDC + "WHERE ID = " + ObjCVarSL_PaymentDbtCrdtNotes.DbtCrdtNotesID);

                        // objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "InvoiceHeader", Int64.Parse(ObjCVarA_PaymentInvoices.InvoiceID.ToString()), "U");
                        #endregion

                        if (PS_GlobalVariable.PaymentID != 0)
                            objCSL_PaymentDbtCrdtNotes.lstCVarPS_PaymentDbtCrdtNotes.Clear();
                        ObjCVarSL_PaymentDbtCrdtNotes.PaymentID = PS_GlobalVariable.PaymentID;
                        ObjCVarSL_PaymentDbtCrdtNotes.PaidAmount = Convert.ToDecimal(PInvoicesDCNotesAmounts.Split(',')[i]);
                        objCSL_PaymentDbtCrdtNotes.lstCVarPS_PaymentDbtCrdtNotes.Add(ObjCVarSL_PaymentDbtCrdtNotes);

                        ObjCVarSL_PaymentDbtCrdtNotes.ID = 0;

                        checkException = objCSL_PaymentDbtCrdtNotes.SaveMethod(objCSL_PaymentDbtCrdtNotes.lstCVarPS_PaymentDbtCrdtNotes);

                        if (checkException != null)
                        {

                            _result = false;
                            GlobalConnection.myTrans.Rollback();

                            throw new Exception();
                        }
                    }
                }
              


                #endregion

                _result = true;

            }
            catch (Exception ex)
            {
                _result = false;
                GlobalConnection.myTrans.Rollback();
                throw;
            }

            return _result;
        }

        [HttpGet, HttpPost]
        //public object[] Insert(Int64 pID, DateTime pVoucherDate, Int32 pSafeID, Int32 pBankID, Int32 pCurrencyID
        //    , decimal pExchangeRate, decimal pAmount, string pNotes, string pPaymentNotes, string pChequeNo, DateTime pChequeDate, Int32 pVoucherType, bool pIsChequeOrDeposit
        //    , Int32 pTaxID, decimal pTaxValue, Int32 pTaxSign, Int32 pTaxID2, decimal pTaxValue2, Int32 pTaxSign2, Int32 pDiscountTaxID, decimal pDiscountTaxValue
        //    , Int32 pDiscountTaxID2, decimal pDiscountTaxValue2, string pChargedPerson, decimal pTotal, decimal pTotalAfterTax, bool pIsAGInvoice
        //    , Int32 pAGInvType_ID, Int32 pInv_No, Int64 pInvoiceID, Int64 pJVID1, Int64 pJVID2, Int64 pJVID3, Int64 pJVID4, Int32 pSalesManID
        //    , Int32 pforwOperationID, bool pIsCustomClearance, Int32 pTransType_ID, bool pIsCash, bool pIsCheque, DateTime pPrintDate, string pOtherSideBankName
        //    , DateTime pCollectionDate, decimal pCollectionExpense, Int32 pTaxType,decimal pInvoiceAmount
        //    //Details Data
        //    , Int64 pDetailsID, decimal pValue, string pDescription, Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, bool pIsDocumented
        //    , Int32 pDetailsInvoiceID, string pInvoicesIDs, decimal pRefund, Int32 pClientID
        //    //Bank Charges Data 
        //    , string pCollectionExpensesList)

            public object[] Insert([FromBody] InsertPS_PaymentsParameters InsertPaymentsParameters)
        {

            GlobalConnection.CreateConnection();
            bool _result = true;
            decimal TotalExtraAmount = 0;
            decimal TotalToCalc = 0;
            string PaymentID = "0";
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            Exception checkException = null;
            string strMessage = "";

            try
            {
                if (InsertPaymentsParameters.pInvoicesIDs != null)
                {
                    int NumberOfInvoices = InsertPaymentsParameters.pInvoicesIDs.Split(',').Length;
                    var Currentamount = InsertPaymentsParameters.PInvoicesAmounts.Split(',');
                    var Currenremain = InsertPaymentsParameters.PInvoicesRremain.Split(',');
                    var Currenispurchase = InsertPaymentsParameters.PInvoicesisPurchase.Split(',');


                    for (int i = 0; i < NumberOfInvoices; i++)
                    {
                        decimal total = Convert.ToDecimal(Currenremain[i]) - Convert.ToDecimal(Currentamount[i]);

                        string LastPaid = objCCustomizedDBCall.CallStringFunction("select isnull(PaidAmount,0) from PS_InvoicesTemp where ID = " + int.Parse(InsertPaymentsParameters.pInvoicesIDs.Split(',')[i]));
                        decimal TotalPaid = ((LastPaid == "" || LastPaid == null) ? 0 : Convert.ToDecimal(LastPaid)) + Convert.ToDecimal(Currentamount[i]);
                        #region Set IsPaid In InvoiceHeader by 1
                        //get totals after insert if total payment > remain
                        string Paid = objCCustomizedDBCall.CallStringFunction("select isnull(PaidAmount,0) from PS_InvoicesTemp where ID = " + int.Parse(InsertPaymentsParameters.pInvoicesIDs.Split(',')[i]));
                        string totalInv = objCCustomizedDBCall.CallStringFunction("select isnull(totalPrice,0) from PS_InvoicesTemp where ID = " + int.Parse(InsertPaymentsParameters.pInvoicesIDs.Split(',')[i]));

                        if (Convert.ToBoolean(Currenispurchase[i]) == true && Convert.ToDecimal(TotalPaid) >= Convert.ToDecimal(totalInv))
                        {
                            if (Math.Round(Convert.ToDecimal(TotalPaid), 1) > Math.Round(Convert.ToDecimal(totalInv), 1))
                            {
                                //strMessage = "Paid Before";
                                _result = false;
                            }
                        }

                        #endregion

                    }
                }

                if (_result == true)
                {
                    //if (!InsertPaymentsParameters.pIsExtra || (InsertPaymentsParameters.pIsExtra == true && InsertPaymentsParameters.pPaymentCurrencyID == 83 && InsertPaymentsParameters.pExtraAmount >= 5) || (InsertPaymentsParameters.pIsExtra == true && InsertPaymentsParameters.pPaymentCurrencyID != 83 && InsertPaymentsParameters.pExtraAmount >= 1))
                    if (1==1/*InsertPaymentsParameters.pIsExtra == false*/)
                    {
                        #region NoExtra
                        CPaymentsCustomizedDBCall objCCustomizedDBCall2 = new CPaymentsCustomizedDBCall();


                        #region Insert PaymentHeader
                        GlobalConnection.OpenConnection();
                        GlobalConnection.myTrans = GlobalConnection.myConnection.BeginTransaction(IsolationLevel.ReadUncommitted);


                        ///////////Insert In A_Payments//////////////
                        CPS_Payments objCA_Payments = new CPS_Payments();
                        CVarPS_Payments ObjCVarA_Payments = new CVarPS_Payments();


                        String Code = objCCustomizedDBCall2.CallStringFunctionReturn("select  isnull(max(cast(Code as numeric)),0)+1  from PS_PaymentsTemp");


                        ObjCVarA_Payments.Code = (Code == "0" ? "1" : Code);
                        ObjCVarA_Payments.PaymentDate = InsertPaymentsParameters.pVoucherDate;
                        ObjCVarA_Payments.ClientID = InsertPaymentsParameters.pClientID;
                        ObjCVarA_Payments.Notes = InsertPaymentsParameters.pPaymentNotes == null ? "" : InsertPaymentsParameters.pPaymentNotes;
                        ObjCVarA_Payments.UserID = WebSecurity.CurrentUserId;
                        ObjCVarA_Payments.IsDeleted = false;
                        ObjCVarA_Payments.TotalPayment = Convert.ToDecimal(InsertPaymentsParameters.pTotalCost);
                        ObjCVarA_Payments.CurrencyID = InsertPaymentsParameters.pPaymentCurrencyID;
                        //ObjCVarSL_Payments.PaymentAmount = pPaymentAmount;
                        ObjCVarA_Payments.ExchangeRate = InsertPaymentsParameters.pPaymentExchangeRate;
                        ObjCVarA_Payments.BankChargesAmount = InsertPaymentsParameters.pBankChargesAmount;
                        ObjCVarA_Payments.BankChargesCurrencyID = InsertPaymentsParameters.pBankChargesCurrency;
                        ObjCVarA_Payments.RefundAmount = InsertPaymentsParameters.pRefundAmount;
                        ObjCVarA_Payments.RefundCurrencyID = InsertPaymentsParameters.pRefundCurrency;
                        ObjCVarA_Payments.IsDeleted = false;
                        ObjCVarA_Payments.isExtra = InsertPaymentsParameters.pExtraAmount ==0 ? true : false;


                        objCA_Payments.lstCVarPS_Payments.Add(ObjCVarA_Payments);

                        checkException = objCA_Payments.SaveMethod(objCA_Payments.lstCVarPS_Payments);

                        if (checkException != null) // an exception is caught in the model
                        {

                            _result = false;
                            GlobalConnection.myTrans.Rollback();
                            throw new Exception();

                        }
                        PS_GlobalVariable.PaymentID = ObjCVarA_Payments.ID;
                        if (checkException == null)
                        {
                            objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "PS_Payments", Int64.Parse(ObjCVarA_Payments.ID.ToString()), "I");

                        }

                        #endregion

                        #region Insert In A_PaymentInvoices
                        CPS_PaymentInvoices objCA_PaymentInvoices = new CPS_PaymentInvoices();

                        CVarPS_PaymentInvoices ObjCVarA_PaymentInvoices = new CVarPS_PaymentInvoices();

                        if (InsertPaymentsParameters.pInvoicesIDs != null)
                        {
                            int NumberOfInvoices = InsertPaymentsParameters.pInvoicesIDs.Split(',').Length;
                            var Currentamount = InsertPaymentsParameters.PInvoicesAmounts.Split(',');
                            var Currenremain = InsertPaymentsParameters.PInvoicesRremain.Split(',');
                            var CurrenisPurchase = InsertPaymentsParameters.PInvoicesisPurchase.Split(',');


                            for (int i = 0; i < NumberOfInvoices; i++)
                            {

                                decimal total = Convert.ToDecimal(Currenremain[i]) - Convert.ToDecimal(Currentamount[i]);

                                ObjCVarA_PaymentInvoices.InvoiceID = int.Parse(InsertPaymentsParameters.pInvoicesIDs.Split(',')[i]);
                                string LastPaid = objCCustomizedDBCall2.CallStringFunctionReturn("select isnull(PaidAmount,0) from PS_InvoicesTemp where ID = " + ObjCVarA_PaymentInvoices.InvoiceID);
                                if (Convert.ToBoolean(CurrenisPurchase[i])==false)
                                {
                                    LastPaid = "0";
                                }
                                decimal TotalPaid = Convert.ToDecimal(LastPaid) + Convert.ToDecimal(Currentamount[i]);
                                #region Set IsPaid In InvoiceHeader by 1
                                if (Convert.ToBoolean(CurrenisPurchase[i]) == true)
                                {
                                    objCCustomizedDBCall2.CallStringFunction("UPDATE PS_InvoicesTemp SET PaidAmount =" + TotalPaid + ", RemainAmount =" + total + "WHERE ID = " + ObjCVarA_PaymentInvoices.InvoiceID);
                                }
                                if (Convert.ToBoolean(CurrenisPurchase[i])==false)
                                {
                                    objCCustomizedDBCall2.CallStringFunction("UPDATE DAS_VoyageDisbursement SET PaymentAmount =" + Convert.ToDecimal(Currentamount[i]) + ", RemainingAmount =0, IsPaid =1 WHERE VoyageDisbursement_ID = " + ObjCVarA_PaymentInvoices.InvoiceID);

                                }


                                // objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "InvoiceHeader", Int64.Parse(ObjCVarA_PaymentInvoices.InvoiceID.ToString()), "U");

                                //get totals after insert if total payment > remain
                                string Paid = objCCustomizedDBCall2.CallStringFunctionReturn("select isnull(PaidAmount,0) from PS_InvoicesTemp where ID = " + ObjCVarA_PaymentInvoices.InvoiceID);
                                string totalInv = objCCustomizedDBCall2.CallStringFunctionReturn("select isnull(totalPrice,0) from PS_InvoicesTemp where ID = " + ObjCVarA_PaymentInvoices.InvoiceID);

                                if (Convert.ToBoolean(CurrenisPurchase[i]) == true && Convert.ToDecimal(Paid) >= Convert.ToDecimal(totalInv))
                                {
                                    if (Math.Round(Convert.ToDecimal(Paid), 1) == Math.Round(Convert.ToDecimal(totalInv), 1))
                                    {
                                        //checkException = objCCustomizedDBCall2.CallStringFunction("UPDATE PS_Invoices SET IsPaid = 1 WHERE id=" + int.Parse(InsertPaymentsParameters.pInvoicesIDs.Split(',')[i]));
                                    }
                                    else if (Math.Round(Convert.ToDecimal(Paid), 1) > Math.Round(Convert.ToDecimal(totalInv), 1))
                                    {

                                        _result = false;
                                        GlobalConnection.myTrans.Rollback();

                                        throw new Exception();

                                    }

                                }

                                #endregion




                                if (PS_GlobalVariable.PaymentID != 0)
                                    objCA_PaymentInvoices.lstCVarPS_PaymentInvoices.Clear();
                                ObjCVarA_PaymentInvoices.PaymentID = PS_GlobalVariable.PaymentID;
                                ObjCVarA_PaymentInvoices.PaidAmount = Convert.ToDecimal(InsertPaymentsParameters.PInvoicesAmounts.Split(',')[i]);
                                ObjCVarA_PaymentInvoices.isPurchase = Convert.ToBoolean(CurrenisPurchase[i]);

                                objCA_PaymentInvoices.lstCVarPS_PaymentInvoices.Add(ObjCVarA_PaymentInvoices);

                                ObjCVarA_PaymentInvoices.ID = 0;

                                checkException = objCA_PaymentInvoices.SaveMethod(objCA_PaymentInvoices.lstCVarPS_PaymentInvoices);

                                if (checkException != null)
                                {

                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();

                                    throw new Exception();
                                }
                            }
                        }



                        #endregion

                        #region Insert In SL_PaymentDbtCrdtNotes
                        CPS_PaymentDbtCrdtNotes objCSL_PaymentDbtCrdtNotes = new CPS_PaymentDbtCrdtNotes();

                        CVarPS_PaymentDbtCrdtNotes ObjCVarSL_PaymentDbtCrdtNotes = new CVarPS_PaymentDbtCrdtNotes();

                        if (InsertPaymentsParameters.pInvoicesDCNotesIDs != null && InsertPaymentsParameters.pInvoicesDCNotesIDs != "")
                        {
                            int NumberOfInvoicesDCNotesIDss = InsertPaymentsParameters.pInvoicesDCNotesIDs.Split(',').Length;
                            var CurrentamountDC = InsertPaymentsParameters.PInvoicesDCNotesAmounts.Split(',');
                            var CurrenremainDC = InsertPaymentsParameters.PInvoicesDCNotesRremain.Split(',');
                            for (int i = 0; i < NumberOfInvoicesDCNotesIDss; i++)
                            {
                                decimal totalDC = Convert.ToDecimal(CurrenremainDC[i]) - Convert.ToDecimal(CurrentamountDC[i]);

                                ObjCVarSL_PaymentDbtCrdtNotes.DbtCrdtNotesID = int.Parse(InsertPaymentsParameters.pInvoicesDCNotesIDs.Split(',')[i]);
                                string LastPaid = objCCustomizedDBCall.CallStringFunction("select isnull(PaidAmount,0) from PS_DbtCrdtNotes where ID = " + ObjCVarSL_PaymentDbtCrdtNotes.DbtCrdtNotesID);
                                decimal TotalPaid = Convert.ToDecimal(LastPaid) + Convert.ToDecimal(CurrentamountDC[i]);
                                #region Set IsPaid In InvoiceHeader by 1
                                objCCustomizedDBCall.CallStringFunction("UPDATE PS_DbtCrdtNotes SET PaidAmount =" + TotalPaid + ", RemainAmount =" + totalDC + "WHERE ID = " + ObjCVarSL_PaymentDbtCrdtNotes.DbtCrdtNotesID);

                                // objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "InvoiceHeader", Int64.Parse(ObjCVarA_PaymentInvoices.InvoiceID.ToString()), "U");
                                #endregion

                                if (PS_GlobalVariable.PaymentID != 0)
                                    objCSL_PaymentDbtCrdtNotes.lstCVarPS_PaymentDbtCrdtNotes.Clear();
                                ObjCVarSL_PaymentDbtCrdtNotes.PaymentID = PS_GlobalVariable.PaymentID;
                                ObjCVarSL_PaymentDbtCrdtNotes.PaidAmount = Convert.ToDecimal(InsertPaymentsParameters.PInvoicesDCNotesAmounts.Split(',')[i]);
                                objCSL_PaymentDbtCrdtNotes.lstCVarPS_PaymentDbtCrdtNotes.Add(ObjCVarSL_PaymentDbtCrdtNotes);

                                ObjCVarSL_PaymentDbtCrdtNotes.ID = 0;

                                checkException = objCSL_PaymentDbtCrdtNotes.SaveMethod(objCSL_PaymentDbtCrdtNotes.lstCVarPS_PaymentDbtCrdtNotes);

                                if (checkException != null)
                                {

                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();

                                    throw new Exception();
                                }
                            }
                        }



                        #endregion

                        string VCODE = "0";
                        string pCode = "0";
                        string pUpdateClause = "";
                        string SafeID = objCCustomizedDBCall.CallStringFunction("A_VoucherGetTopSafeIDByUserIDAndCurrency " + WebSecurity.CurrentUserId + "," + InsertPaymentsParameters.pPaymentCurrencyID);
                        #region cash incert
                        //////////////////////Insert In A_VoucherDetails/////////////////////////////

                        int NumberOfCash = InsertPaymentsParameters.pSafeIDListCash.Split(',').Length;
                        for (int i = 0; i < NumberOfCash; i++)
                        {
                            if (InsertPaymentsParameters.pSafeIDListCash.Split(',')[i].ToString() != "" && InsertPaymentsParameters.pSafeIDListCash.Split(',')[i].ToString() != "0")
                            {
                                if (InsertPaymentsParameters.pVoucherTypeCash == 20 && SafeID == "" || SafeID == null)
                                {
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                    throw new Exception();
                                }
        
                                if (InsertPaymentsParameters.pVoucherTypeCash == 20)
                                {
                                    pCode = Convert.ToString(GetCode(int.Parse(InsertPaymentsParameters.pSafeIDListCash.Split(',')[i].ToString()), int.Parse(InsertPaymentsParameters.pSafeIDListCash.Split(',')[i].ToString()), InsertPaymentsParameters.pVoucherDate, InsertPaymentsParameters.pVoucherTypeCash, true)[0]);
                                }
                              


                                //  string pCode = Convert.ToString(GetCode(pSafeID, pBankID, pVoucherDate, pVoucherType)[0]);

                                CVarA_VoucherHeader objCVarA_Voucher = new CVarA_VoucherHeader();
                                CVarA_VoucherHeaderDetails objCVarA_VoucherDetails = new CVarA_VoucherHeaderDetails();
                                CA_VoucherHeaderDetails objCA_VoucherDetails = new CA_VoucherHeaderDetails();
                                CA_VoucherHeader objCA_Voucher = new CA_VoucherHeader();



                                CPS_VoucherPayments objCA_VoucherPayments = new CPS_VoucherPayments();
                                CVarPS_VoucherPayments ObjCVarA_VoucherPayments = new CVarPS_VoucherPayments();
                                #region Save
                                long VoucherID = 0;

                                #region Save Header
                                //if (InsertPaymentsParameters.pID == 0) //insert header
                                //{
                                //if (objCA_Voucher.lstCVarA_Voucher.Count > 0)
                                VCODE = pCode;
                                //else
                                //    VCODE = pCode;

                                objCVarA_Voucher.Code = VCODE;
                                objCVarA_Voucher.VoucherDate = InsertPaymentsParameters.pVoucherDate;
                                objCVarA_Voucher.SafeID = (InsertPaymentsParameters.pVoucherTypeCash == 10 || InsertPaymentsParameters.pVoucherTypeCash == 20) ? int.Parse(InsertPaymentsParameters.pSafeIDListCash.Split(',')[i]) : Convert.ToInt32(SafeID);
                                objCVarA_Voucher.CurrencyID = int.Parse(InsertPaymentsParameters.pCurrencyIDListCash.Split(',')[i]);
                                objCVarA_Voucher.ExchangeRate = Convert.ToDecimal(InsertPaymentsParameters.pExchangeRateListCash.Split(',')[i]);
                                objCVarA_Voucher.ChargedPerson = InsertPaymentsParameters.pChargedPerson;
                                objCVarA_Voucher.Notes = InsertPaymentsParameters.pPaymentNotesListCash.Split(',')[i] == null ? "" : InsertPaymentsParameters.pPaymentNotesListCash.Split(',')[i];
                                objCVarA_Voucher.TaxID = int.Parse(InsertPaymentsParameters.pTaxIDListCash.Split(',')[i]);
                                objCVarA_Voucher.TaxValue = Convert.ToDecimal(InsertPaymentsParameters.pTaxValueListCash.Split(',')[i]);
                                objCVarA_Voucher.TaxSign = 1;
                                objCVarA_Voucher.TaxID2 = 0;
                                objCVarA_Voucher.TaxValue2 = 0;
                                objCVarA_Voucher.TaxSign2 = 1;
                                objCVarA_Voucher.Total = Convert.ToDecimal(InsertPaymentsParameters.pTotalListCash.Split(',')[i]);
                                objCVarA_Voucher.TotalAfterTax = Convert.ToDecimal(InsertPaymentsParameters.pTotalAfterTaxListCash.Split(',')[i]);
                                objCVarA_Voucher.IsAGInvoice = false;
                                objCVarA_Voucher.AGInvType_ID = 0;
                                objCVarA_Voucher.Inv_No = 0;
                                objCVarA_Voucher.InvoiceID = 0;
                                objCVarA_Voucher.SalesManID = 0;
                                objCVarA_Voucher.forwOperationID = 0;
                                objCVarA_Voucher.IsCustomClearance = false;
                                objCVarA_Voucher.TransType_ID = 0;
                                objCVarA_Voucher.VoucherType = InsertPaymentsParameters.pVoucherTypeCash;
                                objCVarA_Voucher.IsCash = true;
                                objCVarA_Voucher.IsCheque = false;
                                objCVarA_Voucher.PrintDate = InsertPaymentsParameters.pPrintDate;
                                objCVarA_Voucher.ChequeNo = "0";
                                objCVarA_Voucher.ChequeDate = Convert.ToDateTime("1/1/1900");
                                objCVarA_Voucher.BankID = 0;
                                objCVarA_Voucher.OtherSideBankName = "0";
                                objCVarA_Voucher.CollectionDate = InsertPaymentsParameters.pCollectionDate;
                                objCVarA_Voucher.CollectionExpense = InsertPaymentsParameters.pCollectionExpense;
                                objCVarA_Voucher.DiscountTaxID = 0;
                                objCVarA_Voucher.DiscountTaxValue = 0;
                                objCVarA_Voucher.DiscountTaxID2 = 0;
                                objCVarA_Voucher.DiscountTaxValue2 = 0;
                                objCVarA_Voucher.IsCustody = false;
                                objCVarA_Voucher.IsLiner = false;
                                objCVarA_Voucher.TaxType = 1;
                                objCVarA_Voucher.IBAN = "0";
                                objCVarA_Voucher.ReferenceNo = "0";
                                objCVarA_Voucher.DepositeDate = Convert.ToDateTime("1/1/1900");
                                objCVarA_Voucher.TransferDate = Convert.ToDateTime("1/1/1900");
                                objCVarA_Voucher.RemainAmount = InsertPaymentsParameters.pExtraAmount >0 ? (InsertPaymentsParameters.pExtraAmount) : 0;
                                objCVarA_Voucher.PaidAmount = InsertPaymentsParameters.pExtraAmount > 0 ? (Convert.ToDecimal(InsertPaymentsParameters.pTotalAfterTaxListCash.Split(',')[i]) - InsertPaymentsParameters.pExtraAmount) : Convert.ToDecimal(InsertPaymentsParameters.pTotalAfterTaxListCash.Split(',')[i]);
                                objCVarA_Voucher.isTransfer = false;
                                objCVarA_Voucher.UserCreate = WebSecurity.CurrentUserId;



                                objCA_Voucher.lstCVarA_Voucher.Add(objCVarA_Voucher);

                                checkException = objCA_Voucher.SaveMethod(objCA_Voucher.lstCVarA_Voucher);
                                VoucherID = objCVarA_Voucher.ID;

                                InsertPaymentsParameters.pID = objCVarA_Voucher.ID;

                                if (checkException != null)
                                {
                                    strMessage = checkException.Message;
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                    throw new Exception();
                                }

                                //}


                                #endregion Save Header
                                #region Save Details

                                objCVarA_VoucherDetails.ID = 0;
                                objCVarA_VoucherDetails.VoucherID = InsertPaymentsParameters.pID;
                                objCVarA_VoucherDetails.Value = Convert.ToDecimal(InsertPaymentsParameters.pValueListCash.Split(',')[i]) - InsertPaymentsParameters.pRefund;
                                objCVarA_VoucherDetails.Description = InsertPaymentsParameters.pDescriptionListCash.Split(',')[i] == null ? "" : InsertPaymentsParameters.pDescriptionListCash.Split(',')[i];
                                objCVarA_VoucherDetails.AccountID = InsertPaymentsParameters.pAccountID;
                                objCVarA_VoucherDetails.SubAccountID = InsertPaymentsParameters.pSubAccountID;
                                objCVarA_VoucherDetails.CostCenterID = InsertPaymentsParameters.pCostCenterID;
                                objCVarA_VoucherDetails.IsDocumented = InsertPaymentsParameters.pIsDocumented;
                                objCVarA_VoucherDetails.InvoiceID = InsertPaymentsParameters.pInvoiceID;
                                objCVarA_VoucherDetails.VoucherType = InsertPaymentsParameters.pVoucherTypeCash;
                                objCVarA_VoucherDetails.InvoiceNo = "0";
                                objCVarA_VoucherDetails.DepartementID = 0;


                                objCA_VoucherDetails.lstCVarA_VoucherDetails.Add(objCVarA_VoucherDetails);
                                checkException = objCA_VoucherDetails.SaveMethod(objCA_VoucherDetails.lstCVarA_VoucherDetails);

                                if (checkException != null)
                                {
                                    strMessage = checkException.Message;
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                    throw new Exception();

                                }






                                #endregion Save Details
                                #endregion Save


                                //#region Insert In A_JV For Bank Charges
                                //if (InsertPaymentsParameters.pVoucherTypeCash == 30 && InsertPaymentsParameters.pCollectionExpensesList != "0" && !InsertPaymentsParameters.pIsChequeOrDeposit)
                                //{
                                //    bool check = PostingUnderCollectNotes_ApproveOrReturn(Convert.ToString(InsertPaymentsParameters.pBankID), Convert.ToString(VoucherID), Convert.ToString(InsertPaymentsParameters.pChequeDate), Convert.ToString(InsertPaymentsParameters.pTotalListCash), InsertPaymentsParameters.pCollectionExpensesList);
                                //    if (!check)
                                //    {
                                //        strMessage = checkException.Message;
                                //        _result = false;
                                //        GlobalConnection.myTrans.Rollback();
                                //        throw new Exception();

                                //    }
                                //}
                                //#endregion

                                #region Insert In A_VoucherPayments 
                                ///////////Insert In A_VoucherPayments//////////////

                                ObjCVarA_VoucherPayments.SafeID = (InsertPaymentsParameters.pVoucherTypeCash == 10 || InsertPaymentsParameters.pVoucherTypeCash == 20) ? int.Parse(InsertPaymentsParameters.pSafeIDListCash.Split(',')[i]) : 0;
                                ObjCVarA_VoucherPayments.BankID = 0;
                                ObjCVarA_VoucherPayments.CurrencyID = int.Parse(InsertPaymentsParameters.pCurrencyIDListCash.Split(',')[i]);
                                ObjCVarA_VoucherPayments.ExchangeRate = Convert.ToDecimal(InsertPaymentsParameters.pExchangeRateListCash.Split(',')[i]);
                                ObjCVarA_VoucherPayments.NewExchangeRate = Convert.ToDecimal(InsertPaymentsParameters.pNewExchangeRateListCash.Split(',')[i]);

                                ObjCVarA_VoucherPayments.Amount = Convert.ToDecimal(InsertPaymentsParameters.pAmountListCash.Split(',')[i]);
                                ObjCVarA_VoucherPayments.Notes = InsertPaymentsParameters.pPaymentNotesListCash.Split(',')[i] == null ? "" : InsertPaymentsParameters.pPaymentNotesListCash.Split(',')[i];
                                ObjCVarA_VoucherPayments.ChequeNo = "0";
                                ObjCVarA_VoucherPayments.ChequeDate = Convert.ToDateTime("1/1/1900");
                                ObjCVarA_VoucherPayments.VoucherType = InsertPaymentsParameters.pVoucherTypeCash;
                                ObjCVarA_VoucherPayments.VoucherID = Convert.ToInt32(VoucherID);
                                ObjCVarA_VoucherPayments.PaymentID = Convert.ToInt32(PS_GlobalVariable.PaymentID);
                                ObjCVarA_VoucherPayments.IsCheque = false;
                                ObjCVarA_VoucherPayments.TaxID = int.Parse(InsertPaymentsParameters.pTaxIDListCash.Split(',')[i]);
                                ObjCVarA_VoucherPayments.TaxValue = Convert.ToDecimal(InsertPaymentsParameters.pTaxValueListCash.Split(',')[i]);
                                ObjCVarA_VoucherPayments.TaxSign = 1;
                                ObjCVarA_VoucherPayments.TaxID2 = 0;
                                ObjCVarA_VoucherPayments.TaxValue2 = 0;
                                ObjCVarA_VoucherPayments.TaxSign2 = 1;
                                ObjCVarA_VoucherPayments.DiscountTaxID = 0;
                                ObjCVarA_VoucherPayments.DiscountTaxValue = 0;
                                ObjCVarA_VoucherPayments.DiscountTaxID2 = 0;
                                ObjCVarA_VoucherPayments.DiscountTaxValue2 = 0;
                                ObjCVarA_VoucherPayments.voucherCode = VCODE;


                                Int32 _RowCount = objCA_VoucherPayments.lstCVarPS_VoucherPayments.Count;

                                objCA_VoucherPayments.lstCVarPS_VoucherPayments.Add(ObjCVarA_VoucherPayments);

                                checkException = objCA_VoucherPayments.SaveMethod(objCA_VoucherPayments.lstCVarPS_VoucherPayments);
                                if (checkException != null)
                                {
                                    strMessage = checkException.Message;
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                    throw new Exception();

                                }
                                #endregion
                                CPaymentsCustomizedDBCall objCPaymentsCustomizedDBCall = new CPaymentsCustomizedDBCall();
                                //post
                                if (InsertPaymentsParameters.pVoucherTypeCash == 10)
                                {

                                    checkException = objCPaymentsCustomizedDBCall.A_CashInVouchers_Posting("A_CashInVouchers_Posting_PaymentLiner", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, PS_Globals.CUserId);
                                }
                                else
                                {
                                    checkException = objCPaymentsCustomizedDBCall.A_CashOutVouchers_Posting("A_CashOutVouchers_Posting", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, PS_Globals.CUserId);

                                }
                                if (checkException != null)
                                {
                                    strMessage = checkException.Message;
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                }
                            }
                        }

                        #endregion cash
                        #region Cheque incert
                        //////////////////////Insert In A_VoucherDetails/////////////////////////////

                        int NumberOfCheque = InsertPaymentsParameters.pBankIDListCheque.Split(',').Length;
                        for (int i = 0; i < NumberOfCheque; i++)
                        {
                            if (InsertPaymentsParameters.pBankIDListCheque.Split(',')[i].ToString() != "" && InsertPaymentsParameters.pBankIDListCheque.Split(',')[i].ToString() != "0")
                            {
                                if (SafeID == "" || SafeID == null)
                                {
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                    throw new Exception();
                                }
                                if (InsertPaymentsParameters.pVoucherTypeCheque == 40)
                                {
                                    pCode = Convert.ToString(GetCode(Convert.ToInt16(SafeID), int.Parse(InsertPaymentsParameters.pBankIDListCheque.Split(',')[i].ToString()), InsertPaymentsParameters.pVoucherDate, InsertPaymentsParameters.pVoucherTypeCheque, true)[0]);

                                }


                                //  string pCode = Convert.ToString(GetCode(pSafeID, pBankID, pVoucherDate, pVoucherType)[0]);

                                CVarA_VoucherHeader objCVarA_Voucher = new CVarA_VoucherHeader();
                                CVarA_VoucherHeaderDetails objCVarA_VoucherDetails = new CVarA_VoucherHeaderDetails();
                                CA_VoucherHeaderDetails objCA_VoucherDetails = new CA_VoucherHeaderDetails();
                                CA_VoucherHeader objCA_Voucher = new CA_VoucherHeader();
                                CPS_VoucherPayments objCA_VoucherPayments = new CPS_VoucherPayments();
                                CVarPS_VoucherPayments ObjCVarA_VoucherPayments = new CVarPS_VoucherPayments();
                                #region Save
                                long VoucherID = 0;

                                #region Save Header
                                //if (InsertPaymentsParameters.pID == 0) //insert header
                                //{
                                //if (objCA_Voucher.lstCVarA_Voucher.Count > 0)
                                VCODE = pCode;
                                //else
                                //    VCODE = pCode;

                                objCVarA_Voucher.Code = VCODE;
                                objCVarA_Voucher.VoucherDate = InsertPaymentsParameters.pVoucherDate;
                                objCVarA_Voucher.SafeID = InsertPaymentsParameters.pVoucherTypeCheque == 10 ? int.Parse(InsertPaymentsParameters.pSafeIDListCash.Split(',')[i]) : Convert.ToInt32(SafeID);
                                objCVarA_Voucher.CurrencyID = int.Parse(InsertPaymentsParameters.pCurrencyIDListCheque.Split(',')[i]);
                                objCVarA_Voucher.ExchangeRate = Convert.ToDecimal(InsertPaymentsParameters.pExchangeRateListCheque.Split(',')[i]);
                                objCVarA_Voucher.ChargedPerson = InsertPaymentsParameters.pChargedPerson;
                                objCVarA_Voucher.Notes = InsertPaymentsParameters.pPaymentNotesListCheque.Split(',')[i] == null ? "" : InsertPaymentsParameters.pPaymentNotesListCheque.Split(',')[i];
                                objCVarA_Voucher.TaxID = int.Parse(InsertPaymentsParameters.pTaxIDListCheque.Split(',')[i]);
                                objCVarA_Voucher.TaxValue = Convert.ToDecimal(InsertPaymentsParameters.pTaxValueListCheque.Split(',')[i]);
                                objCVarA_Voucher.TaxSign = 1;
                                objCVarA_Voucher.TaxID2 = 0;
                                objCVarA_Voucher.TaxValue2 = 0;
                                objCVarA_Voucher.TaxSign2 = 1;
                                objCVarA_Voucher.Total = Convert.ToDecimal(InsertPaymentsParameters.pTotalListCheque.Split(',')[i]);
                                objCVarA_Voucher.TotalAfterTax = Convert.ToDecimal(InsertPaymentsParameters.pTotalAfterTaxListCheque.Split(',')[i]);
                                objCVarA_Voucher.IsAGInvoice = false;
                                objCVarA_Voucher.AGInvType_ID = 0;
                                objCVarA_Voucher.Inv_No = 0;
                                objCVarA_Voucher.InvoiceID = 0;
                                objCVarA_Voucher.SalesManID = 0;
                                objCVarA_Voucher.forwOperationID = 0;
                                objCVarA_Voucher.IsCustomClearance = false;
                                objCVarA_Voucher.TransType_ID = 0;
                                objCVarA_Voucher.VoucherType = InsertPaymentsParameters.pVoucherTypeCheque;
                                objCVarA_Voucher.IsCash = false;
                                objCVarA_Voucher.IsCheque = true;
                                objCVarA_Voucher.PrintDate = InsertPaymentsParameters.pPrintDate;
                                objCVarA_Voucher.ChequeNo = InsertPaymentsParameters.pChequeNoListCheque.Split(',')[i];
                                objCVarA_Voucher.ChequeDate = Convert.ToDateTime(InsertPaymentsParameters.pChequeDateList.Split(',')[i]);
                                objCVarA_Voucher.BankID = int.Parse(InsertPaymentsParameters.pBankIDListCheque.Split(',')[i]);

                                objCVarA_Voucher.CollectionDate = InsertPaymentsParameters.pCollectionDate;
                                objCVarA_Voucher.CollectionExpense = InsertPaymentsParameters.pCollectionExpense;
                                objCVarA_Voucher.DiscountTaxID = 0;
                                objCVarA_Voucher.DiscountTaxValue = 0;
                                objCVarA_Voucher.DiscountTaxID2 = 0;
                                objCVarA_Voucher.DiscountTaxValue2 = 0;
                                objCVarA_Voucher.IsCustody = false;
                                objCVarA_Voucher.IsLiner = false;
                                objCVarA_Voucher.TaxType = 1;

                                objCVarA_Voucher.OtherSideBankName = InsertPaymentsParameters.pOtherSideBankName;
                                objCVarA_Voucher.IBAN = "0";
                                objCVarA_Voucher.ReferenceNo = "0";
                                objCVarA_Voucher.DepositeDate = Convert.ToDateTime("1/1/1900");
                                objCVarA_Voucher.TransferDate = Convert.ToDateTime("1/1/1900");

                                objCVarA_Voucher.RemainAmount = InsertPaymentsParameters.pExtraAmount > 0 ? (InsertPaymentsParameters.pExtraAmount) : 0;
                                objCVarA_Voucher.PaidAmount = InsertPaymentsParameters.pExtraAmount > 0 ? (Convert.ToDecimal(InsertPaymentsParameters.pTotalAfterTaxListCheque.Split(',')[i]) - InsertPaymentsParameters.pExtraAmount) : Convert.ToDecimal(InsertPaymentsParameters.pTotalAfterTaxListCheque.Split(',')[i]);

                                objCVarA_Voucher.isTransfer = false;
                                objCVarA_Voucher.UserCreate = WebSecurity.CurrentUserId;

                                objCA_Voucher.lstCVarA_Voucher.Add(objCVarA_Voucher);

                                checkException = objCA_Voucher.SaveMethod(objCA_Voucher.lstCVarA_Voucher);
                                VoucherID = objCVarA_Voucher.ID;

                                InsertPaymentsParameters.pID = objCVarA_Voucher.ID;

                                if (checkException != null)
                                {
                                    strMessage = checkException.Message;
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                    throw new Exception();
                                }

                                //}


                                #endregion Save Header
                                #region Save Details

                                objCVarA_VoucherDetails.ID = 0;
                                objCVarA_VoucherDetails.VoucherID = InsertPaymentsParameters.pID;
                                objCVarA_VoucherDetails.Value = Convert.ToDecimal(InsertPaymentsParameters.pValueListCheque.Split(',')[i]) - InsertPaymentsParameters.pRefund;
                                objCVarA_VoucherDetails.Description = InsertPaymentsParameters.pDescriptionListCheque.Split(',')[i] == null ? "" : InsertPaymentsParameters.pDescriptionListCheque.Split(',')[i];
                                objCVarA_VoucherDetails.AccountID = InsertPaymentsParameters.pAccountID;
                                objCVarA_VoucherDetails.SubAccountID = InsertPaymentsParameters.pSubAccountID;
                                objCVarA_VoucherDetails.CostCenterID = InsertPaymentsParameters.pCostCenterID;
                                objCVarA_VoucherDetails.IsDocumented = InsertPaymentsParameters.pIsDocumented;
                                objCVarA_VoucherDetails.InvoiceID = InsertPaymentsParameters.pInvoiceID;
                                objCVarA_VoucherDetails.VoucherType = InsertPaymentsParameters.pVoucherTypeCash;
                                objCVarA_VoucherDetails.InvoiceNo = "0";
                                objCVarA_VoucherDetails.DepartementID = 0;



                                objCA_VoucherDetails.lstCVarA_VoucherDetails.Add(objCVarA_VoucherDetails);
                                checkException = objCA_VoucherDetails.SaveMethod(objCA_VoucherDetails.lstCVarA_VoucherDetails);

                                if (checkException != null)
                                {
                                    strMessage = checkException.Message;
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                    throw new Exception();

                                }

                                //if (InsertPaymentsParameters.pVoucherTypeCash == 30 && InsertPaymentsParameters.pRefund != 0)
                                //{
                                //    Object[] Parms = new Object[2];
                                //    Parms = GetRefundAccountIDAndSubAccountID(InsertPaymentsParameters.pClientID);

                                //    objCVarA_VoucherDetails.ID = 0;
                                //    objCVarA_VoucherDetails.VoucherID = InsertPaymentsParameters.pID;
                                //    objCVarA_VoucherDetails.Value = InsertPaymentsParameters.pRefund;
                                //    objCVarA_VoucherDetails.Description = InsertPaymentsParameters.pDescriptionListCheque.Split(',')[i] == null ? "" : InsertPaymentsParameters.pDescriptionListCheque.Split(',')[i];
                                //    objCVarA_VoucherDetails.AccountID = Convert.ToInt32(Parms[0]);
                                //    objCVarA_VoucherDetails.SubAccountID = Convert.ToInt32(Parms[1]);
                                //    objCVarA_VoucherDetails.CostCenterID = InsertPaymentsParameters.pCostCenterID;
                                //    objCVarA_VoucherDetails.IsDocumented = InsertPaymentsParameters.pIsDocumented;
                                //    objCVarA_VoucherDetails.InvoiceID = InsertPaymentsParameters.pInvoiceID;
                                //    objCVarA_VoucherDetails.VoucherType = InsertPaymentsParameters.pVoucherTypeCheque;
                                //    objCA_VoucherDetails.lstCVarA_VoucherDetails.Add(objCVarA_VoucherDetails);
                                //    checkException = objCA_VoucherDetails.SaveMethod(objCA_VoucherDetails.lstCVarA_VoucherDetails);

                                //    if (checkException != null)
                                //    {
                                //        strMessage = checkException.Message;
                                //        _result = false;
                                //        GlobalConnection.myTrans.Rollback();
                                //        throw new Exception();

                                //    }
                                //}





                                #endregion Save Details
                                #endregion Save


                                //#region Insert In A_JV For Bank Charges
                                //if (InsertPaymentsParameters.pVoucherTypeCash == 30 && InsertPaymentsParameters.pCollectionExpensesList != "0" && !InsertPaymentsParameters.pIsChequeOrDeposit)
                                //{
                                //    bool check = PostingUnderCollectNotes_ApproveOrReturn(Convert.ToString(InsertPaymentsParameters.pBankID), Convert.ToString(VoucherID), Convert.ToString(InsertPaymentsParameters.pChequeDate), Convert.ToString(InsertPaymentsParameters.pTotalListCash), InsertPaymentsParameters.pCollectionExpensesList);
                                //    if (!check)
                                //    {
                                //        strMessage = checkException.Message;
                                //        _result = false;
                                //        GlobalConnection.myTrans.Rollback();
                                //        throw new Exception();

                                //    }
                                //}
                                //#endregion

                                #region Insert In A_VoucherPayments 
                                ///////////Insert In A_VoucherPayments//////////////

                                ObjCVarA_VoucherPayments.SafeID = (InsertPaymentsParameters.pVoucherTypeCheque == 10 || InsertPaymentsParameters.pVoucherTypeCheque == 20) ? int.Parse(InsertPaymentsParameters.pSafeIDListCash.Split(',')[i]) : 0;
                                ObjCVarA_VoucherPayments.BankID = int.Parse(InsertPaymentsParameters.pBankIDListCheque.Split(',')[i]); ;
                                ObjCVarA_VoucherPayments.CurrencyID = int.Parse(InsertPaymentsParameters.pCurrencyIDListCheque.Split(',')[i]);
                                ObjCVarA_VoucherPayments.ExchangeRate = Convert.ToDecimal(InsertPaymentsParameters.pExchangeRateListCheque.Split(',')[i]);
                                ObjCVarA_VoucherPayments.NewExchangeRate = Convert.ToDecimal(InsertPaymentsParameters.pNewExchangeRateListCheque.Split(',')[i]);

                                ObjCVarA_VoucherPayments.Amount = Convert.ToDecimal(InsertPaymentsParameters.pAmountListCheque.Split(',')[i]);
                                ObjCVarA_VoucherPayments.Notes = InsertPaymentsParameters.pPaymentNotesListCheque.Split(',')[i] == null ? "" : InsertPaymentsParameters.pPaymentNotesListCheque.Split(',')[i];
                                ObjCVarA_VoucherPayments.ChequeNo = InsertPaymentsParameters.pChequeNoListCheque.Split(',')[i] == null ? "" : InsertPaymentsParameters.pChequeNoListCheque.Split(',')[i];
                                ObjCVarA_VoucherPayments.ChequeDate = Convert.ToDateTime("1/1/1900");
                                ObjCVarA_VoucherPayments.VoucherType = InsertPaymentsParameters.pVoucherTypeCheque;
                                ObjCVarA_VoucherPayments.VoucherID = Convert.ToInt32(VoucherID);
                                ObjCVarA_VoucherPayments.PaymentID = Convert.ToInt32(PS_GlobalVariable.PaymentID);
                                ObjCVarA_VoucherPayments.IsCheque = true;
                                ObjCVarA_VoucherPayments.TaxID = int.Parse(InsertPaymentsParameters.pTaxIDListCheque.Split(',')[i]);
                                ObjCVarA_VoucherPayments.TaxValue = Convert.ToDecimal(InsertPaymentsParameters.pTaxValueListCheque.Split(',')[i]);
                                ObjCVarA_VoucherPayments.TaxSign = 1;
                                ObjCVarA_VoucherPayments.TaxID2 = 0;
                                ObjCVarA_VoucherPayments.TaxValue2 = 0;
                                ObjCVarA_VoucherPayments.TaxSign2 = 1;
                                ObjCVarA_VoucherPayments.DiscountTaxID = 0;
                                ObjCVarA_VoucherPayments.DiscountTaxValue = 0;
                                ObjCVarA_VoucherPayments.DiscountTaxID2 = 0;
                                ObjCVarA_VoucherPayments.DiscountTaxValue2 = 0;
                                ObjCVarA_VoucherPayments.voucherCode = VCODE;

                                Int32 _RowCount = objCA_VoucherPayments.lstCVarPS_VoucherPayments.Count;

                                objCA_VoucherPayments.lstCVarPS_VoucherPayments.Add(ObjCVarA_VoucherPayments);

                                checkException = objCA_VoucherPayments.SaveMethod(objCA_VoucherPayments.lstCVarPS_VoucherPayments);
                                if (checkException != null)
                                {
                                    strMessage = checkException.Message;
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                    throw new Exception();

                                }
                                #endregion
                                CPaymentsCustomizedDBCall objCPaymentsCustomizedDBCall = new CPaymentsCustomizedDBCall();
                                //post
                                if (InsertPaymentsParameters.pVoucherTypeCheque == 10)
                                {

                                    checkException = objCPaymentsCustomizedDBCall.A_CashInVouchers_Posting("A_CashInVouchers_Posting_PaymentLiner", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, PS_Globals.CUserId);
                                }
                                else
                                {
                                    checkException = objCPaymentsCustomizedDBCall.A_ChequeOutVouchers_Posting("A_ChequeOutVouchers_Posting", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, PS_Globals.CUserId);

                                }
                                if (checkException != null)
                                {
                                    strMessage = checkException.Message;
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                }
                            }
                        }

                        #endregion
                        #region deposite incert
                        //////////////////////Insert In A_VoucherDetails/////////////////////////////

                        int NumberOfDeposite = InsertPaymentsParameters.pBankIDListDeposite.Split(',').Length;
                        for (int i = 0; i < NumberOfDeposite; i++)
                        {
                            if (InsertPaymentsParameters.pBankIDListDeposite.Split(',')[i].ToString() != "" && InsertPaymentsParameters.pBankIDListDeposite.Split(',')[i].ToString() != "0")
                            {
                                if (SafeID == "" || SafeID == null)
                                {
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                    throw new Exception();
                                }
                                if (InsertPaymentsParameters.pVoucherTypeDeposite == 40)
                                {
                                    pCode = Convert.ToString(GetCode(Convert.ToInt16(SafeID), int.Parse(InsertPaymentsParameters.pBankIDListDeposite.Split(',')[i].ToString()), InsertPaymentsParameters.pVoucherDate, InsertPaymentsParameters.pVoucherTypeDeposite, true)[0]);

                                }


                                //  string pCode = Convert.ToString(GetCode(pSafeID, pBankID, pVoucherDate, pVoucherType)[0]);

                                CVarA_VoucherHeader objCVarA_Voucher = new CVarA_VoucherHeader();
                                CVarA_VoucherHeaderDetails objCVarA_VoucherDetails = new CVarA_VoucherHeaderDetails();
                                CA_VoucherHeaderDetails objCA_VoucherDetails = new CA_VoucherHeaderDetails();
                                CA_VoucherHeader objCA_Voucher = new CA_VoucherHeader();
                                CPS_VoucherPayments objCA_VoucherPayments = new CPS_VoucherPayments();
                                CVarPS_VoucherPayments ObjCVarA_VoucherPayments = new CVarPS_VoucherPayments();
                                #region Save
                                long VoucherID = 0;

                                #region Save Header
                                //if (InsertPaymentsParameters.pID == 0) //insert header
                                //{
                                //if (objCA_Voucher.lstCVarA_Voucher.Count > 0)
                                VCODE = pCode;
                                //else
                                //    VCODE = pCode;

                                objCVarA_Voucher.Code = VCODE;
                                objCVarA_Voucher.VoucherDate = InsertPaymentsParameters.pVoucherDate;
                                objCVarA_Voucher.SafeID = InsertPaymentsParameters.pVoucherTypeDeposite == 10 ? int.Parse(InsertPaymentsParameters.pSafeIDListCash.Split(',')[i]) : Convert.ToInt32(SafeID);
                                objCVarA_Voucher.CurrencyID = int.Parse(InsertPaymentsParameters.pCurrencyIDListDeposite.Split(',')[i]);
                                objCVarA_Voucher.ExchangeRate = Convert.ToDecimal(InsertPaymentsParameters.pExchangeRateListDeposite.Split(',')[i]);
                                objCVarA_Voucher.ChargedPerson = InsertPaymentsParameters.pChargedPerson;
                                objCVarA_Voucher.Notes = InsertPaymentsParameters.pPaymentNotesListDeposite.Split(',')[i] == null ? "" : InsertPaymentsParameters.pPaymentNotesListDeposite.Split(',')[i];
                                objCVarA_Voucher.TaxID = int.Parse(InsertPaymentsParameters.pTaxIDListDeposite.Split(',')[i]);
                                objCVarA_Voucher.TaxValue = Convert.ToDecimal(InsertPaymentsParameters.pTaxValueListDeposite.Split(',')[i]);
                                objCVarA_Voucher.TaxSign = 1;
                                objCVarA_Voucher.TaxID2 = 0;
                                objCVarA_Voucher.TaxValue2 = 0;
                                objCVarA_Voucher.TaxSign2 = 1;
                                objCVarA_Voucher.Total = Convert.ToDecimal(InsertPaymentsParameters.pTotalListDeposite.Split(',')[i]);
                                objCVarA_Voucher.TotalAfterTax = Convert.ToDecimal(InsertPaymentsParameters.pTotalAfterTaxListDeposite.Split(',')[i]);
                                objCVarA_Voucher.IsAGInvoice = false;
                                objCVarA_Voucher.AGInvType_ID = 0;
                                objCVarA_Voucher.Inv_No = 0;
                                objCVarA_Voucher.InvoiceID = 0;
                                objCVarA_Voucher.SalesManID = 0;
                                objCVarA_Voucher.forwOperationID = 0;
                                objCVarA_Voucher.IsCustomClearance = false;
                                objCVarA_Voucher.TransType_ID = 0;
                                objCVarA_Voucher.VoucherType = InsertPaymentsParameters.pVoucherTypeDeposite;
                                objCVarA_Voucher.IsCash = false;
                                objCVarA_Voucher.IsCheque = false;
                                objCVarA_Voucher.PrintDate = InsertPaymentsParameters.pPrintDate;
                                objCVarA_Voucher.ChequeNo = "0";
                                objCVarA_Voucher.ChequeDate = Convert.ToDateTime("1/1/1900");
                                objCVarA_Voucher.BankID = int.Parse(InsertPaymentsParameters.pBankIDListDeposite.Split(',')[i]);
                                objCVarA_Voucher.OtherSideBankName = "0";
                                objCVarA_Voucher.CollectionDate = InsertPaymentsParameters.pCollectionDate;
                                objCVarA_Voucher.CollectionExpense = InsertPaymentsParameters.pCollectionExpense;
                                objCVarA_Voucher.DiscountTaxID = 0;
                                objCVarA_Voucher.DiscountTaxValue = 0;
                                objCVarA_Voucher.DiscountTaxID2 = 0;
                                objCVarA_Voucher.DiscountTaxValue2 = 0;
                                objCVarA_Voucher.IsCustody = false;
                                objCVarA_Voucher.IsLiner = false;
                                objCVarA_Voucher.TaxType = 1;
                                objCVarA_Voucher.IBAN = "0";
                                objCVarA_Voucher.ReferenceNo = InsertPaymentsParameters.pReferenceNo.Split(',')[i];
                                objCVarA_Voucher.DepositeDate = Convert.ToDateTime(InsertPaymentsParameters.pDepositeDateList.Split(',')[i]);
                                objCVarA_Voucher.TransferDate = Convert.ToDateTime("1/1/1900");
     
                                objCVarA_Voucher.RemainAmount = InsertPaymentsParameters.pExtraAmount > 0 ? (InsertPaymentsParameters.pExtraAmount) : 0;
                                objCVarA_Voucher.PaidAmount = InsertPaymentsParameters.pExtraAmount > 0 ? (Convert.ToDecimal(InsertPaymentsParameters.pTotalAfterTaxListDeposite.Split(',')[i]) - InsertPaymentsParameters.pExtraAmount) : Convert.ToDecimal(InsertPaymentsParameters.pTotalAfterTaxListDeposite.Split(',')[i]);



                                objCVarA_Voucher.isTransfer = false;
                                objCVarA_Voucher.UserCreate = WebSecurity.CurrentUserId;

                                objCA_Voucher.lstCVarA_Voucher.Add(objCVarA_Voucher);

                                checkException = objCA_Voucher.SaveMethod(objCA_Voucher.lstCVarA_Voucher);
                                VoucherID = objCVarA_Voucher.ID;

                                InsertPaymentsParameters.pID = objCVarA_Voucher.ID;

                                if (checkException != null)
                                {
                                    strMessage = checkException.Message;
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                    throw new Exception();
                                }

                                //}


                                #endregion Save Header
                                #region Save Details

                                objCVarA_VoucherDetails.ID = 0;
                                objCVarA_VoucherDetails.VoucherID = InsertPaymentsParameters.pID;
                                objCVarA_VoucherDetails.Value = Convert.ToDecimal(InsertPaymentsParameters.pValueListDeposite.Split(',')[i]) - InsertPaymentsParameters.pRefund;
                                objCVarA_VoucherDetails.Description = InsertPaymentsParameters.pDescriptionListDeposite.Split(',')[i] == null ? "" : InsertPaymentsParameters.pDescriptionListDeposite.Split(',')[i];
                                objCVarA_VoucherDetails.AccountID = InsertPaymentsParameters.pAccountID;
                                objCVarA_VoucherDetails.SubAccountID = InsertPaymentsParameters.pSubAccountID;
                                objCVarA_VoucherDetails.CostCenterID = InsertPaymentsParameters.pCostCenterID;
                                objCVarA_VoucherDetails.IsDocumented = InsertPaymentsParameters.pIsDocumented;
                                objCVarA_VoucherDetails.InvoiceID = InsertPaymentsParameters.pInvoiceID;
                                objCVarA_VoucherDetails.VoucherType = InsertPaymentsParameters.pVoucherTypeDeposite;
                                objCVarA_VoucherDetails.InvoiceNo = "0";
                                objCVarA_VoucherDetails.DepartementID = 0;



                                objCA_VoucherDetails.lstCVarA_VoucherDetails.Add(objCVarA_VoucherDetails);
                                checkException = objCA_VoucherDetails.SaveMethod(objCA_VoucherDetails.lstCVarA_VoucherDetails);

                                if (checkException != null)
                                {
                                    strMessage = checkException.Message;
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                    throw new Exception();

                                }







                                #endregion Save Details
                                #endregion Save


                                //#region Insert In A_JV For Bank Charges
                                //if (InsertPaymentsParameters.pVoucherTypeCash == 30 && InsertPaymentsParameters.pCollectionExpensesList != "0" && !InsertPaymentsParameters.pIsChequeOrDeposit)
                                //{
                                //    bool check = PostingUnderCollectNotes_ApproveOrReturn(Convert.ToString(InsertPaymentsParameters.pBankID), Convert.ToString(VoucherID), Convert.ToString(InsertPaymentsParameters.pChequeDate), Convert.ToString(InsertPaymentsParameters.pTotalListCash), InsertPaymentsParameters.pCollectionExpensesList);
                                //    if (!check)
                                //    {
                                //        strMessage = checkException.Message;
                                //        _result = false;
                                //        GlobalConnection.myTrans.Rollback();
                                //        throw new Exception();

                                //    }
                                //}
                                //#endregion

                                #region Insert In A_VoucherPayments 
                                ///////////Insert In A_VoucherPayments//////////////

                                ObjCVarA_VoucherPayments.SafeID = (InsertPaymentsParameters.pVoucherTypeDeposite == 10 || InsertPaymentsParameters.pVoucherTypeDeposite == 20) ? int.Parse(InsertPaymentsParameters.pSafeIDListCash.Split(',')[i]) : 0;
                                ObjCVarA_VoucherPayments.BankID = int.Parse(InsertPaymentsParameters.pBankIDListDeposite.Split(',')[i]); ;
                                ObjCVarA_VoucherPayments.CurrencyID = int.Parse(InsertPaymentsParameters.pCurrencyIDListDeposite.Split(',')[i]);
                                ObjCVarA_VoucherPayments.ExchangeRate = Convert.ToDecimal(InsertPaymentsParameters.pExchangeRateListDeposite.Split(',')[i]);
                                ObjCVarA_VoucherPayments.NewExchangeRate = Convert.ToDecimal(InsertPaymentsParameters.pNewExchangeRateListDeposite.Split(',')[i]);

                                ObjCVarA_VoucherPayments.Amount = Convert.ToDecimal(InsertPaymentsParameters.pAmountListDeposite.Split(',')[i]);
                                ObjCVarA_VoucherPayments.Notes = InsertPaymentsParameters.pPaymentNotesListDeposite.Split(',')[i] == null ? "" : InsertPaymentsParameters.pPaymentNotesListDeposite.Split(',')[i];
                                ObjCVarA_VoucherPayments.ChequeNo = InsertPaymentsParameters.pReferenceNoListDeposite.Split(',')[i] == null ? "" : InsertPaymentsParameters.pReferenceNoListDeposite.Split(',')[i];
                                ObjCVarA_VoucherPayments.ChequeDate = Convert.ToDateTime("1/1/1900");
                                ObjCVarA_VoucherPayments.VoucherType = InsertPaymentsParameters.pVoucherTypeDeposite;
                                ObjCVarA_VoucherPayments.VoucherID = Convert.ToInt32(VoucherID);
                                ObjCVarA_VoucherPayments.PaymentID = Convert.ToInt32(PS_GlobalVariable.PaymentID);
                                ObjCVarA_VoucherPayments.IsCheque = true;
                                ObjCVarA_VoucherPayments.TaxID = int.Parse(InsertPaymentsParameters.pTaxIDListDeposite.Split(',')[i]);
                                ObjCVarA_VoucherPayments.TaxValue = Convert.ToDecimal(InsertPaymentsParameters.pTaxValueListDeposite.Split(',')[i]);
                                ObjCVarA_VoucherPayments.TaxSign = 1;
                                ObjCVarA_VoucherPayments.TaxID2 = 0;
                                ObjCVarA_VoucherPayments.TaxValue2 = 0;
                                ObjCVarA_VoucherPayments.TaxSign2 = 1;
                                ObjCVarA_VoucherPayments.DiscountTaxID = 0;
                                ObjCVarA_VoucherPayments.DiscountTaxValue = 0;
                                ObjCVarA_VoucherPayments.DiscountTaxID2 = 0;
                                ObjCVarA_VoucherPayments.DiscountTaxValue2 = 0;
                                ObjCVarA_VoucherPayments.voucherCode = VCODE;

                                Int32 _RowCount = objCA_VoucherPayments.lstCVarPS_VoucherPayments.Count;

                                objCA_VoucherPayments.lstCVarPS_VoucherPayments.Add(ObjCVarA_VoucherPayments);

                                checkException = objCA_VoucherPayments.SaveMethod(objCA_VoucherPayments.lstCVarPS_VoucherPayments);
                                if (checkException != null)
                                {
                                    strMessage = checkException.Message;
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                    throw new Exception();

                                }
                                #endregion
                                CPaymentsCustomizedDBCall objCPaymentsCustomizedDBCall = new CPaymentsCustomizedDBCall();
                                //post
                                if (InsertPaymentsParameters.pVoucherTypeDeposite == 10)
                                {

                                    checkException = objCPaymentsCustomizedDBCall.A_CashInVouchers_Posting("A_CashInVouchers_Posting_PaymentLiner", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, PS_Globals.CUserId);
                                }
                                else
                                {
                                    checkException = objCPaymentsCustomizedDBCall.A_ChequeOutVouchers_Posting("A_ChequeOutVouchers_Posting", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, PS_Globals.CUserId);

                                    //checkException = objCPaymentsCustomizedDBCall.A_ChequeInVouchers_Posting("A_ChequeInVouchers_Posting_PaymentLiner", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, Globals.CUserId);
                                }
                                if (checkException != null)
                                {
                                    strMessage = checkException.Message;
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                }
                            }
                        }

                        #endregion cash
                        #region transfer incert
                        //////////////////////Insert In A_VoucherDetails/////////////////////////////

                        int NumberOfTransfer = InsertPaymentsParameters.pBankIDListTransfer.Split(',').Length;
                        for (int i = 0; i < NumberOfTransfer; i++)
                        {
                            if (InsertPaymentsParameters.pBankIDListTransfer.Split(',')[i].ToString() != "" && InsertPaymentsParameters.pBankIDListTransfer.Split(',')[i].ToString() != "0")
                            {
                                if (SafeID == "" || SafeID == null)
                                {
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                    throw new Exception();
                                }
                                if (InsertPaymentsParameters.pVoucherTypeTransfer == 40)
                                {
                                    pCode = Convert.ToString(GetCode(Convert.ToInt16(SafeID), int.Parse(InsertPaymentsParameters.pBankIDListTransfer.Split(',')[i].ToString()), InsertPaymentsParameters.pVoucherDate, InsertPaymentsParameters.pVoucherTypeTransfer, true)[0]);

                                }


                                //  string pCode = Convert.ToString(GetCode(pSafeID, pBankID, pVoucherDate, pVoucherType)[0]);

                                CVarA_VoucherHeader objCVarA_Voucher = new CVarA_VoucherHeader();
                                CVarA_VoucherHeaderDetails objCVarA_VoucherDetails = new CVarA_VoucherHeaderDetails();
                                CA_VoucherHeaderDetails objCA_VoucherDetails = new CA_VoucherHeaderDetails();
                                CA_VoucherHeader objCA_Voucher = new CA_VoucherHeader();
                                CPS_VoucherPayments objCA_VoucherPayments = new CPS_VoucherPayments();
                                CVarPS_VoucherPayments ObjCVarA_VoucherPayments = new CVarPS_VoucherPayments();
                                #region Save
                                long VoucherID = 0;

                                #region Save Header
                                //if (InsertPaymentsParameters.pID == 0) //insert header
                                //{
                                //if (objCA_Voucher.lstCVarA_Voucher.Count > 0)
                                VCODE = pCode;
                                //else
                                //    VCODE = pCode;

                                objCVarA_Voucher.Code = VCODE;
                                objCVarA_Voucher.VoucherDate = InsertPaymentsParameters.pVoucherDate;
                                objCVarA_Voucher.SafeID = InsertPaymentsParameters.pVoucherTypeTransfer == 10 ? int.Parse(InsertPaymentsParameters.pSafeIDListCash.Split(',')[i]) : Convert.ToInt32(SafeID);
                                objCVarA_Voucher.CurrencyID = int.Parse(InsertPaymentsParameters.pCurrencyIDListTransfer.Split(',')[i]);
                                objCVarA_Voucher.ExchangeRate = Convert.ToDecimal(InsertPaymentsParameters.pExchangeRateListTransfer.Split(',')[i]);
                                objCVarA_Voucher.ChargedPerson = InsertPaymentsParameters.pChargedPerson;
                                objCVarA_Voucher.Notes = InsertPaymentsParameters.pPaymentNotesListTransfer.Split(',')[i] == null ? "" : InsertPaymentsParameters.pPaymentNotesListTransfer.Split(',')[i];
                                objCVarA_Voucher.TaxID = int.Parse(InsertPaymentsParameters.pTaxIDListTransfer.Split(',')[i]);
                                objCVarA_Voucher.TaxValue = Convert.ToDecimal(InsertPaymentsParameters.pTaxValueListTransfer.Split(',')[i]);
                                objCVarA_Voucher.TaxSign = 1;
                                objCVarA_Voucher.TaxID2 = 0;
                                objCVarA_Voucher.TaxValue2 = 0;
                                objCVarA_Voucher.TaxSign2 = 1;
                                objCVarA_Voucher.Total = Convert.ToDecimal(InsertPaymentsParameters.pTotalListTransfer.Split(',')[i]);
                                objCVarA_Voucher.TotalAfterTax = Convert.ToDecimal(InsertPaymentsParameters.pTotalAfterTaxListTransfer.Split(',')[i]);
                                objCVarA_Voucher.IsAGInvoice = false;
                                objCVarA_Voucher.AGInvType_ID = 0;
                                objCVarA_Voucher.Inv_No = 0;
                                objCVarA_Voucher.InvoiceID = 0;
                                objCVarA_Voucher.SalesManID = 0;
                                objCVarA_Voucher.forwOperationID = 0;
                                objCVarA_Voucher.IsCustomClearance = false;
                                objCVarA_Voucher.TransType_ID = 0;
                                objCVarA_Voucher.VoucherType = InsertPaymentsParameters.pVoucherTypeTransfer;
                                objCVarA_Voucher.IsCash = false;
                                objCVarA_Voucher.IsCheque = false;
                                objCVarA_Voucher.PrintDate = InsertPaymentsParameters.pPrintDate;
                                objCVarA_Voucher.ChequeNo = "0";
                                objCVarA_Voucher.ChequeDate = Convert.ToDateTime("1/1/1900");
                                objCVarA_Voucher.BankID = int.Parse(InsertPaymentsParameters.pBankIDListTransfer.Split(',')[i]);
                                objCVarA_Voucher.OtherSideBankName = "0";
                                objCVarA_Voucher.CollectionDate = InsertPaymentsParameters.pCollectionDate;
                                objCVarA_Voucher.CollectionExpense = InsertPaymentsParameters.pCollectionExpense;
                                objCVarA_Voucher.DiscountTaxID = 0;
                                objCVarA_Voucher.DiscountTaxValue = 0;
                                objCVarA_Voucher.DiscountTaxID2 = 0;
                                objCVarA_Voucher.DiscountTaxValue2 = 0;
                                objCVarA_Voucher.IsCustody = false;
                                objCVarA_Voucher.IsLiner = false;
                                objCVarA_Voucher.TaxType = 1;
                                objCVarA_Voucher.IBAN = InsertPaymentsParameters.pSwiftCode.Split(',')[i];
                                objCVarA_Voucher.ReferenceNo = "0";
                                objCVarA_Voucher.DepositeDate = Convert.ToDateTime("1/1/1900");
                                objCVarA_Voucher.TransferDate = Convert.ToDateTime(InsertPaymentsParameters.pTransferDateList.Split(',')[i]);

                                objCVarA_Voucher.RemainAmount = InsertPaymentsParameters.pExtraAmount > 0 ? (InsertPaymentsParameters.pExtraAmount) : 0;
                                objCVarA_Voucher.PaidAmount = InsertPaymentsParameters.pExtraAmount > 0 ? (Convert.ToDecimal(InsertPaymentsParameters.pTotalAfterTaxListTransfer.Split(',')[i]) - InsertPaymentsParameters.pExtraAmount) : Convert.ToDecimal(InsertPaymentsParameters.pTotalAfterTaxListTransfer.Split(',')[i]);



                                objCVarA_Voucher.isTransfer = true;
                                objCVarA_Voucher.UserCreate = WebSecurity.CurrentUserId;

                                objCA_Voucher.lstCVarA_Voucher.Add(objCVarA_Voucher);

                                checkException = objCA_Voucher.SaveMethod(objCA_Voucher.lstCVarA_Voucher);
                                VoucherID = objCVarA_Voucher.ID;

                                InsertPaymentsParameters.pID = objCVarA_Voucher.ID;

                                if (checkException != null)
                                {
                                    strMessage = checkException.Message;
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                    throw new Exception();
                                }

                                //}


                                #endregion Save Header
                                #region Save Details

                                objCVarA_VoucherDetails.ID = 0;
                                objCVarA_VoucherDetails.VoucherID = InsertPaymentsParameters.pID;
                                objCVarA_VoucherDetails.Value = Convert.ToDecimal(InsertPaymentsParameters.pValueListTransfer.Split(',')[i]) - InsertPaymentsParameters.pRefund;
                                objCVarA_VoucherDetails.Description = InsertPaymentsParameters.pDescriptionListTransfer.Split(',')[i] == null ? "" : InsertPaymentsParameters.pDescriptionListTransfer.Split(',')[i];
                                objCVarA_VoucherDetails.AccountID = InsertPaymentsParameters.pAccountID;
                                objCVarA_VoucherDetails.SubAccountID = InsertPaymentsParameters.pSubAccountID;
                                objCVarA_VoucherDetails.CostCenterID = InsertPaymentsParameters.pCostCenterID;
                                objCVarA_VoucherDetails.IsDocumented = InsertPaymentsParameters.pIsDocumented;
                                objCVarA_VoucherDetails.InvoiceID = InsertPaymentsParameters.pInvoiceID;
                                objCVarA_VoucherDetails.VoucherType = InsertPaymentsParameters.pVoucherTypeTransfer;
                                objCVarA_VoucherDetails.InvoiceNo = "0";
                                objCVarA_VoucherDetails.DepartementID = 0;



                                objCA_VoucherDetails.lstCVarA_VoucherDetails.Add(objCVarA_VoucherDetails);
                                checkException = objCA_VoucherDetails.SaveMethod(objCA_VoucherDetails.lstCVarA_VoucherDetails);

                                if (checkException != null)
                                {
                                    strMessage = checkException.Message;
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                    throw new Exception();

                                }






                                #endregion Save Details
                                #endregion Save


                                //#region Insert In A_JV For Bank Charges
                                //if (InsertPaymentsParameters.pVoucherTypeCash == 30 && InsertPaymentsParameters.pCollectionExpensesList != "0" && !InsertPaymentsParameters.pIsChequeOrDeposit)
                                //{
                                //    bool check = PostingUnderCollectNotes_ApproveOrReturn(Convert.ToString(InsertPaymentsParameters.pBankID), Convert.ToString(VoucherID), Convert.ToString(InsertPaymentsParameters.pChequeDate), Convert.ToString(InsertPaymentsParameters.pTotalListCash), InsertPaymentsParameters.pCollectionExpensesList);
                                //    if (!check)
                                //    {
                                //        strMessage = checkException.Message;
                                //        _result = false;
                                //        GlobalConnection.myTrans.Rollback();
                                //        throw new Exception();

                                //    }
                                //}
                                //#endregion

                                #region Insert In A_VoucherPayments 
                                ///////////Insert In A_VoucherPayments//////////////

                                ObjCVarA_VoucherPayments.SafeID = (InsertPaymentsParameters.pVoucherTypeTransfer == 10 || InsertPaymentsParameters.pVoucherTypeTransfer == 20) ? int.Parse(InsertPaymentsParameters.pSafeIDListCash.Split(',')[i]) : 0;
                                ObjCVarA_VoucherPayments.BankID = int.Parse(InsertPaymentsParameters.pBankIDListTransfer.Split(',')[i]); ;
                                ObjCVarA_VoucherPayments.CurrencyID = int.Parse(InsertPaymentsParameters.pCurrencyIDListTransfer.Split(',')[i]);
                                ObjCVarA_VoucherPayments.ExchangeRate = Convert.ToDecimal(InsertPaymentsParameters.pExchangeRateListTransfer.Split(',')[i]);
                                ObjCVarA_VoucherPayments.NewExchangeRate = Convert.ToDecimal(InsertPaymentsParameters.pNewExchangeRateListTransfer.Split(',')[i]);

                                ObjCVarA_VoucherPayments.Amount = Convert.ToDecimal(InsertPaymentsParameters.pAmountListTransfer.Split(',')[i]);
                                ObjCVarA_VoucherPayments.Notes = InsertPaymentsParameters.pPaymentNotesListTransfer.Split(',')[i] == null ? "" : InsertPaymentsParameters.pPaymentNotesListTransfer.Split(',')[i];
                                ObjCVarA_VoucherPayments.ChequeNo = InsertPaymentsParameters.pSwiftCodeListTransfer.Split(',')[i] == null ? "" : InsertPaymentsParameters.pSwiftCodeListTransfer.Split(',')[i];
                                ObjCVarA_VoucherPayments.ChequeDate = Convert.ToDateTime("1/1/1900");
                                ObjCVarA_VoucherPayments.VoucherType = InsertPaymentsParameters.pVoucherTypeTransfer;
                                ObjCVarA_VoucherPayments.VoucherID = Convert.ToInt32(VoucherID);
                                ObjCVarA_VoucherPayments.PaymentID = Convert.ToInt32(PS_GlobalVariable.PaymentID);
                                ObjCVarA_VoucherPayments.IsCheque = true;
                                ObjCVarA_VoucherPayments.TaxID = int.Parse(InsertPaymentsParameters.pTaxIDListTransfer.Split(',')[i]);
                                ObjCVarA_VoucherPayments.TaxValue = Convert.ToDecimal(InsertPaymentsParameters.pTaxValueListTransfer.Split(',')[i]);
                                ObjCVarA_VoucherPayments.TaxSign = 1;
                                ObjCVarA_VoucherPayments.TaxID2 = 0;
                                ObjCVarA_VoucherPayments.TaxValue2 = 0;
                                ObjCVarA_VoucherPayments.TaxSign2 = 1;
                                ObjCVarA_VoucherPayments.DiscountTaxID = 0;
                                ObjCVarA_VoucherPayments.DiscountTaxValue = 0;
                                ObjCVarA_VoucherPayments.DiscountTaxID2 = 0;
                                ObjCVarA_VoucherPayments.DiscountTaxValue2 = 0;
                                ObjCVarA_VoucherPayments.voucherCode = VCODE;

                                Int32 _RowCount = objCA_VoucherPayments.lstCVarPS_VoucherPayments.Count;

                                objCA_VoucherPayments.lstCVarPS_VoucherPayments.Add(ObjCVarA_VoucherPayments);

                                checkException = objCA_VoucherPayments.SaveMethod(objCA_VoucherPayments.lstCVarPS_VoucherPayments);
                                if (checkException != null)
                                {
                                    strMessage = checkException.Message;
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                    throw new Exception();

                                }
                                #endregion
                                CPaymentsCustomizedDBCall objCPaymentsCustomizedDBCall = new CPaymentsCustomizedDBCall();
                                //post
                                if (InsertPaymentsParameters.pVoucherTypeTransfer == 10)
                                {

                                    checkException = objCPaymentsCustomizedDBCall.A_CashInVouchers_Posting("A_CashInVouchers_Posting_PaymentLiner", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, PS_Globals.CUserId);
                                }
                                else
                                {
                                    checkException = objCPaymentsCustomizedDBCall.A_ChequeOutVouchers_Posting("A_ChequeOutVouchers_Posting", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, PS_Globals.CUserId);

                                    //checkException = objCPaymentsCustomizedDBCall.A_ChequeInVouchers_Posting("A_ChequeInVouchers_Posting_PaymentLiner", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, Globals.CUserId);
                                }
                                if (checkException != null)
                                {
                                    strMessage = checkException.Message;
                                    _result = false;
                                    GlobalConnection.myTrans.Rollback();
                                }
                            }
                        }

                        #endregion cash

                        //if (_result == true)
                        //{
                        //    CPaymentsCustomizedDBCall objCPaymentsCustomizedDBCall = new CPaymentsCustomizedDBCall();
                        //    //checkException = objCPaymentsCustomizedDBCall.A_ChequeInVouchers_PostingLiner("ERP_A_PostingConvertPaymentLiner", PS_GlobalVariable.PaymentID.ToString(), InsertPaymentsParameters.pVoucherDate, Globals.CUserId);

                        //    if (checkException != null)
                        //    {
                        //        strMessage = checkException.Message;
                        //        _result = false;
                        //        GlobalConnection.myTrans.Rollback();
                        //    }
                        //}

                        _result = true;

                        #endregion

                    }

                    if (_result == true)
                    {
                        CPaymentsCustomizedDBCall objCCustomizedDBCall3 = new CPaymentsCustomizedDBCall();

                        string VouID = objCCustomizedDBCall3.CallStringFunctionReturn("select isnull(VoucherID,0) from PS_VoucherPaymentsTemp where PaymentID = " + PS_GlobalVariable.PaymentID.ToString());

                        if (VouID == "0" || VouID == "" || VouID == null)
                        {
                            _result = false;
                            GlobalConnection.myTrans.Rollback();
                            throw new Exception();
                        }

                        CPaymentsCustomizedDBCall objCPaymentsCustomizedDBCall = new CPaymentsCustomizedDBCall();
                        checkException = objCPaymentsCustomizedDBCall.A_ChequeInVouchers_PostingLiner("ERP_PS_PostingConvertPaymentLiner", PS_GlobalVariable.PaymentID.ToString(), InsertPaymentsParameters.pVoucherDate, PS_Globals.CUserId);

                        if (checkException != null)
                        {

                            _result = false;
                            GlobalConnection.myTrans.Rollback();
                            throw new Exception();
                        }

                        //checkException = objCPaymentsCustomizedDBCall.A_ChequeInVouchers_PostingLiner("A_LinerPaymentsDiffrencecurrency", PS_GlobalVariable.PaymentID.ToString(), InsertPaymentsParameters.pVoucherDate, Globals.CUserId);

                        // if (checkException != null)
                        // {

                        //     _result = false;
                        //     GlobalConnection.myTrans.Rollback();
                        //     throw new Exception();
                        // }
                    }
                    if (checkException == null)
                    {
                        GlobalConnection.myTrans.Commit();
                        _result = true;
                    }

                }


            }
            catch (Exception ex)
            {
                _result = false;
                GlobalConnection.myTrans.Rollback();
                throw;
            }
            finally
            {

                GlobalConnection.myConnection.Close();
                GlobalConnection.myConnection.Dispose();
            }
            return new object[] {
                _result,strMessage,PS_GlobalVariable.PaymentID
            };
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        [HttpGet, HttpPost]
        public bool InsertA_JVAndA_JVDetails(string pInvoicesIDs , bool pCheck)
        {
            bool _result = true;
            Exception checkException = null;
            try
            {
                CPaymentsCustomizedDBCall objCCustomizedDBCall = new CPaymentsCustomizedDBCall();
                CVarPS_PaymentInvoices ObjCVarA_PaymentInvoices = new CVarPS_PaymentInvoices();
                CVarPS_Payments ObjCVarSL_Payments = new CVarPS_Payments();
                CPS_Payments objCSL_Payments = new CPS_Payments();

                string PaymentAmount = objCCustomizedDBCall.CallStringFunctionReturn("select sum(ISNULL(Amount, 0)) from PS_VoucherPaymentsTemp where PaymentID = " + Convert.ToInt32(PS_GlobalVariable.PaymentID) + " and CurrencyID = (select CurrencyID from PS_Payments where ID = " + Convert.ToInt32(PS_GlobalVariable.PaymentID) + ")");
                string InvoicesAmount = objCCustomizedDBCall.CallStringFunctionReturn("select TotalPayment from PS_Payments where ID = " + Convert.ToInt32(PS_GlobalVariable.PaymentID));
                if (Convert.ToDecimal(PaymentAmount == "" ? "0" : PaymentAmount) >= Convert.ToDecimal(InvoicesAmount))
                {
                    pCheck = false;
                }

                if (pCheck == true)
                {
                    //#region Insert In A_JV And A_JVDetails
                    //checkException = objCSL_Payments.SaveA_JVAndA_JVDetails(Convert.ToInt32(PS_GlobalVariable.PaymentID));

                    //if (checkException != null)
                    //{
                    //    _result = false;
                    //    throw new Exception();

                    //}
                    //else //not unique
                    //{

                    //    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_Payments", PS_GlobalVariable.PaymentID, "I");

                    //    int NumberOfInvoices = pInvoicesIDs.Split(',').Length;

                    //    for (int i = 0; i < NumberOfInvoices; i++)
                    //    {
                    //        ObjCVarA_PaymentInvoices.InvoiceID = int.Parse(pInvoicesIDs.Split(',')[i]);

                    //        #region Set IsPaid In InvoiceHeader by 1
                    //        objCCustomizedDBCall.CallStringFunction("UPDATE InvoiceHeader SET IsPaid = 1 WHERE ID = " + ObjCVarA_PaymentInvoices.InvoiceID);
                    //        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "InvoiceHeader", Int64.Parse(ObjCVarA_PaymentInvoices.InvoiceID.ToString()), "U");
                    //        #endregion


                    //        var PaymentInvoicesID = int.Parse(objCCustomizedDBCall.CallStringFunctionReturn("select  ID  from A_PaymentInvoices where InvoiceID = " + ObjCVarA_PaymentInvoices.InvoiceID));
                    //        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_PaymentInvoices", ObjCVarA_PaymentInvoices.ID, "I");
                    //    }

                    //    string VoucherIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select VoucherID from A_VoucherPayments where PaymentID = " + PS_GlobalVariable.PaymentID);
                    //    if (VoucherIDs == "") // an exception is caught in the model
                    //    {
                    //        _result = false;
                    //        throw new Exception();
                    //    }
                    //    foreach (var VoucherID in VoucherIDs.Split(','))
                    //    {
                    //        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", PS_Globals.CUserId, "A_Voucher", Int64.Parse(VoucherID), "I");

                    //        string VoucherDetailsID = objCCustomizedDBCall.CallStringFunctionReturn("select ID from A_VoucherDetails where VoucherID = " + VoucherID);
                    //        if (VoucherDetailsID == "") // an exception is caught in the model
                    //        {
                    //            _result = false;
                    //            throw new Exception();
                    //        }
                    //        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", PS_Globals.CUserId, "A_VoucherDetails", Int64.Parse(VoucherDetailsID), "I");
                    //    }

                    //    string VoucherPaymentsIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select ID from SL_VoucherPayments where PaymentID = " + PS_GlobalVariable.PaymentID);
                    //    if (VoucherPaymentsIDs == "") // an exception is caught in the model
                    //    {
                    //        _result = false;
                    //        throw new Exception();
                    //    }
                    //    foreach (var VoucherPaymentsID in VoucherPaymentsIDs.Split(','))
                    //    {
                    //        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_VoucherPayments", Int64.Parse(VoucherPaymentsID), "I");
                    //    }



                    //}
                    //#endregion
                }
                else
                {
                    //#region Insert Trans_Log Only
                    //objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_Payments", PS_GlobalVariable.PaymentID, "I");

                    //int NumberOfInvoices = pInvoicesIDs.Split(',').Length;

                    //for (int i = 0; i < NumberOfInvoices; i++)
                    //{
                    //    ObjCVarA_PaymentInvoices.InvoiceID = int.Parse(pInvoicesIDs.Split(',')[i]);

                    //    #region Set IsPaid In InvoiceHeader by 1
                    //    objCCustomizedDBCall.CallStringFunction("UPDATE InvoiceHeader SET IsPaid = 1 WHERE ID = " + ObjCVarA_PaymentInvoices.InvoiceID);
                    //    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "InvoiceHeader", Int64.Parse(ObjCVarA_PaymentInvoices.InvoiceID.ToString()), "U");
                    //    #endregion


                    //    var PaymentInvoicesID = int.Parse(objCCustomizedDBCall.CallStringFunctionReturn("select  ID  from SL_PaymentInvoices where InvoiceID = " + ObjCVarA_PaymentInvoices.InvoiceID));
                    //    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_PaymentInvoices", ObjCVarA_PaymentInvoices.ID, "I");
                    //}

                    //string VoucherIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select VoucherID from SL_VoucherPayments where PaymentID = " + PS_GlobalVariable.PaymentID);
                    //if (VoucherIDs == "") // an exception is caught in the model
                    //{
                    //    _result = false;
                    //    throw new Exception();
                    //}
                    //foreach (var VoucherID in VoucherIDs.Split(','))
                    //{
                    //    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", PS_Globals.CUserId, "A_Voucher", Int64.Parse(VoucherID), "I");

                    //    string VoucherDetailsID = objCCustomizedDBCall.CallStringFunctionReturn("select ID from A_VoucherDetails where VoucherID = " + VoucherID);
                    //    if (VoucherDetailsID == "") // an exception is caught in the model
                    //    {
                    //        _result = false;
                    //        throw new Exception();
                    //    }
                    //    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", PS_Globals.CUserId, "A_VoucherDetails", Int64.Parse(VoucherDetailsID), "I");
                    //}

                    //string VoucherPaymentsIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select ID from SL_VoucherPayments where PaymentID = " + PS_GlobalVariable.PaymentID);
                    //if (VoucherPaymentsIDs == "") // an exception is caught in the model
                    //{
                    //    _result = false;
                    //    throw new Exception();
                    //}
                    //foreach (var VoucherPaymentsID in VoucherPaymentsIDs.Split(','))
                    //{
                    //    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_VoucherPayments", Int64.Parse(VoucherPaymentsID), "I");
                    //}
                    //#endregion



                    _result = true;
                    GlobalConnection.myTrans.Commit();
                }
            }

            catch (Exception ex)
            {
                _result = false;
                GlobalConnection.myTrans.Rollback();
                throw;
            }
            finally
            {
                GlobalConnection.myConnection.Close();
                GlobalConnection.myConnection.Dispose();
            }


            return _result;
        }


        [HttpGet, HttpPost]
        public Object[] LoadInvoices(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)

        {

            //pWhereClause = pWhereClause + " And IsPaid = 0 And IsAudited = 1 And InvoiceSerialStr != 0";
            //pWhereClause = pWhereClause + " And IsPaid = 0 And IsAudited = 1";



            int returentCount = 0;

            Cvw_PaymentPS_InvoicesHeader InvoHeader = new Cvw_PaymentPS_InvoicesHeader();
            InvoHeader.GetListPaging(pPageSize, pPageNumber, pWhereClause, " InvoiceNo desc ", out returentCount);

            JavaScriptSerializer serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new Object[]
            {
                  serializer.Serialize(InvoHeader.lstCVarvw_PaymentPS_InvoicesHeader)
                , returentCount
            };

        }
        [HttpGet, HttpPost]
        public Object[] LoadInvoicesDbtCrdtNote(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {

            //pWhereClause = pWhereClause + " And IsPaid = 0 And IsAudited = 1 And InvoiceSerialStr != 0";
            //pWhereClause = pWhereClause + " And IsPaid = 0 And IsAudited = 1";



            int returentCount = 0;

            Cvw_PaymentPS_InvoicesDbtCrdtNotesHeader InvoHeader = new Cvw_PaymentPS_InvoicesDbtCrdtNotesHeader();
            InvoHeader.GetListPaging(9999, 1, pWhereClause, " [ID] ", out returentCount);

            JavaScriptSerializer serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new Object[]
            {
                  serializer.Serialize(InvoHeader.lstCVarvw_PaymentPS_InvoicesDbtCrdtNotesHeader)
                , returentCount
            };

        }
        [HttpGet, HttpPost]
        public Object[] GetPrintedData(Int64 pPaymentIDToPrint)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            #region Payment
            CvwPS_Payments objCvwPS_Payments = new CvwPS_Payments();
            objCvwPS_Payments.GetList(" WHERE ID = " + pPaymentIDToPrint);
            #endregion

            #region Invoices
            Cvw_PaymentPS_InvoicesHeader InvoHeader = new Cvw_PaymentPS_InvoicesHeader();
            string PaymentInvoicesIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select InvoiceID from PS_PaymentInvoices where PaymentID = " + pPaymentIDToPrint);
        
            //foreach (var PaymentInvoiceID in PaymentInvoicesIDs.Split(','))
            //{
            //    InvoHeader.GetList(" WHERE ID = " + PaymentInvoiceID);
            //}
            InvoHeader.GetList(" WHERE ID IN (" + PaymentInvoicesIDs + ")");

            #endregion

            #region Cash Payment
            CPS_VoucherPayments objCA_VoucherPayments = new CPS_VoucherPayments();
            objCA_VoucherPayments.GetList(" WHERE PaymentID = " + pPaymentIDToPrint );

            

            //foreach (var PaymentInvoiceID in PaymentInvoicesIDs.Split(','))
            //{
            //    objCA_VoucherPayments.GetList(" WHERE PaymentID = '" + pPaymentIDToPrint + "' & VoucherType = 10 '");
            //}
            //#endregion
            //#region Cheque Payment
            //foreach (var PaymentInvoiceID in PaymentInvoicesIDs.Split(','))
            //{
            //    objCA_VoucherPayments.GetList(" WHERE PaymentID = '" + pPaymentIDToPrint + "' & VoucherType = 30 '");
            //}
            #endregion

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwPS_Payments.lstCVarvwPS_Payments)
                ,new JavaScriptSerializer().Serialize(InvoHeader.lstCVarvw_PaymentPS_InvoicesHeader)
                ,new JavaScriptSerializer().Serialize(objCA_VoucherPayments.lstCVarPS_VoucherPayments)
            };
        }

        [HttpGet, HttpPost]
        public object[] GetPrintedDataRep(string pID)
        {
            Exception checkException = null;
            //CDefaults objCDefaults = new CDefaults();
            //objCDefaults.GetList("WHERE 1=1");
            Cvw_PS_PaymentsRep ObjCVarvw_PS_PaymentsRep = new Cvw_PS_PaymentsRep();
            ObjCVarvw_PS_PaymentsRep.GetList(pID);
            
                //checkException = ObjCVarvw_PS_PaymentsRep.GetList(
                //     pID
                //    //, pLanguage == "ar" ? true : false
                //    );
            
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new object[] {
                //new JavaScriptSerializer().Serialize(objCDefaults.lstCVarDefaults[0]) //pDefaultsHeader = pData[0]
                new JavaScriptSerializer().Serialize(ObjCVarvw_PS_PaymentsRep.lstCVarvw_PS_PaymentsRep)
                
                //                  :serializer.Serialize(ObjCVarIncomeStatementByActivityCenter.lstCVarIncomeStatementByActivityCenter)
            };

        }


        [HttpGet, HttpPost]
        public Object[] GetPaymentsByDate_Printed(String pWhereClauseToPrint)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            #region Payment
            CvwPS_Payments objCvwPS_Payments = new CvwPS_Payments();
            objCvwPS_Payments.GetList(" WHERE IsDeleted = 0 And" + pWhereClauseToPrint);
            #endregion
            #region Calculate Total Amount
            PS_CVarTotalAmount objPS_CVarTotalAmount = new PS_CVarTotalAmount();

            string PaymentIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select ID from A_Payments where IsDeleted = 0 And " + pWhereClauseToPrint);

            Decimal CashEGP = 0;
            Decimal ChequeEGP = 0;
            Decimal DepositEGP = 0;
            Decimal CashUSD = 0;
            Decimal ChequeUSD = 0;
            Decimal DepositUSD = 0;
            Decimal CashEUR = 0;
            Decimal ChequeEUR = 0;
            Decimal DepositEUR = 0;

            if (PaymentIDs != "")
            {
                
                foreach (var PaymentID in PaymentIDs.Split(','))
                {
                    string VoucherIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select VoucherID from A_VoucherPayments where PaymentID = " + PaymentID);
                    foreach (var VoucherID in VoucherIDs.Split(','))
                    {
                        string Amount = objCCustomizedDBCall.CallStringFunction("select Total from A_Voucher where ID = " + VoucherID);
                        string CurrencyID = objCCustomizedDBCall.CallStringFunction("select CurrencyID from A_Voucher where ID = " + VoucherID);
                        string IsCash = objCCustomizedDBCall.CallStringFunction("select  IsCash from A_Voucher where ID = " + VoucherID);
                        string IsCheque = objCCustomizedDBCall.CallStringFunction("select  IsCheque from A_Voucher where ID = " + VoucherID);

                        string CurrencyName = objCCustomizedDBCall.CallStringFunction("select Name from Currency where ID = " + CurrencyID);
                        CurrencyName = CurrencyName.Trim();
                        if (CurrencyName == "EGP")
                        {
                            if (Convert.ToBoolean(IsCash) == true)
                            {
                                CashEGP += Convert.ToDecimal(Amount);
                            }
                            else if (Convert.ToBoolean(IsCheque) == true)
                            {
                                ChequeEGP += Convert.ToDecimal(Amount);
                            }
                            else
                                DepositEGP += Convert.ToDecimal(Amount);
                        }
                        else if (CurrencyName == "USD")
                        {
                            if (Convert.ToBoolean(IsCash) == true)
                            {
                                CashUSD += Convert.ToDecimal(Amount);
                            }
                            else if (Convert.ToBoolean(IsCheque) == true)
                            {
                                ChequeUSD += Convert.ToDecimal(Amount);
                            }
                            else
                                DepositUSD += Convert.ToDecimal(Amount);
                        }
                        else
                        {
                            if (Convert.ToBoolean(IsCash) == true)
                            {
                                CashEUR += Convert.ToDecimal(Amount);
                            }
                            else if (Convert.ToBoolean(IsCheque) == true)
                            {
                                ChequeEUR += Convert.ToDecimal(Amount);
                            }
                            else
                                DepositEUR += Convert.ToDecimal(Amount);
                        }
                    }
                }

            }

            objPS_CVarTotalAmount.Cash = "CASH ," + Convert.ToString(CashEGP) + ',' + Convert.ToString(CashUSD) + ',' + Convert.ToString(CashEUR);
            objPS_CVarTotalAmount.Cheque = "CHEQUE ," + Convert.ToString(ChequeEGP) + ',' + Convert.ToString(ChequeUSD) + ',' + Convert.ToString(ChequeEUR);
            objPS_CVarTotalAmount.Deposite = "DEPOSIT ," + Convert.ToString(DepositEGP) + ',' + Convert.ToString(DepositUSD) + ',' + Convert.ToString(DepositEUR);

            objPS_CVarTotalAmount.Total = "Total ," + Convert.ToString(CashEGP + ChequeEGP + DepositEGP) + ',' 
                                                + Convert.ToString(CashUSD + ChequeUSD + DepositUSD) + ','
                                                + Convert.ToString(CashEUR + ChequeEUR + DepositEUR);

            PS_CTotalAmount objPS_CTotalAmount = new PS_CTotalAmount();
            objPS_CTotalAmount.lstPS_CVarTotalAmount.Add(objPS_CVarTotalAmount);

            #endregion

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwPS_Payments.lstCVarvwPS_Payments)
                ,new JavaScriptSerializer().Serialize(objPS_CTotalAmount.lstPS_CVarTotalAmount)
                //,new JavaScriptSerializer().Serialize(objCA_VoucherPayments.lstCVarA_VoucherPayments)
            };
        }

        //    [HttpGet, HttpPost]
        //    public Boolean DeleteInvoice(Int32 pInvoiceID)
        //    {
        //        Boolean _Result = false;
        //        try
        //        {
        //            CInvoiceHeader InvHedr = new CInvoiceHeader();
        //            _Result = InvHedr.UpdateList("IsDeleted=1 Where ID = " + Convert.ToString(pInvoiceID));
        //        }
        //        catch (Exception)
        //        {
        //            _Result = false;
        //        }
        //        return _Result;
        //    }


        [HttpGet, HttpPost]
        //public Object[] GetCode(Int32 pSafeID, Int32 pBankID, DateTime pDate, Int32 pVoucherType)
        //{
        //    int constVoucherChequeOut = 40;
        //    CPaymentsCustomizedDBCall objCPaymentsCustomizedDBCall = new CPaymentsCustomizedDBCall();
        //    string pNewCode = "";
        //    string pNewChequeCode = "";
        //    if (pSafeID != 0) //CashVoucher
        //        pNewCode = objCPaymentsCustomizedDBCall.A_CashVoucher_GetCode_BySafeCode("A_CashVoucher_GetCode_BySafeCode", pSafeID, pDate, pVoucherType);
        //    else if (pBankID != 0) //ChequeVoucher
        //    {
        //        pNewCode = objCPaymentsCustomizedDBCall.A_ChequeVoucher_GetCodeByBank("A_ChequeVoucher_GetCodeByBank", pDate, pBankID, pVoucherType);
        //        if (pVoucherType == constVoucherChequeOut)
        //            pNewChequeCode = objCPaymentsCustomizedDBCall.A_ChequeVoucher_GetNextChequeNo("A_ChequeVoucher_GetNextChequeNo", pBankID, pVoucherType);
        //    }
        //    return new object[] {
        //        pNewCode //pNewCode = pData[0]
        //        , pNewChequeCode //pNewChequeCode = pData[1]
        //    };
        //}

        public Object[] GetCode(Int32 pSafeID, Int32 pBankID, DateTime pDate, Int32 pVoucherType, bool pIsLiner)
        {
            int constVoucherChequeOut = 40;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CPaymentsCustomizedDBCall objCPaymentsCustomizedDBCall = new CPaymentsCustomizedDBCall();
            string pNewCode = "";
            string pNewChequeCode = "";
            string SafeID = objCCustomizedDBCall.CallStringFunction("A_VoucherGetTopSafeIDByUserID " + WebSecurity.CurrentUserId);

            if (pSafeID !=0 )
            {
                SafeID =  pSafeID.ToString();
            }
            if (pSafeID != 0) //CashVoucher
                              // pNewCode = objCCustomizedDBCall.A_CashVoucher_GetCode_BySafeCode("A_CashVoucher_GetCode_BySafeCode", pSafeID, pDate, pVoucherType);
                if (pVoucherType == 10)
                {
                    pNewCode = objCCustomizedDBCall.A_ChequeVoucher_GetCodeByBank("A_ChequeVoucher_GetCodeByBank", pDate, pBankID, pVoucherType, pSafeID);

                }
                if (pVoucherType == 20)
                {
                    pNewCode = objCCustomizedDBCall.A_ChequeVoucher_GetCodeByBank("A_ChequeVoucher_GetCodeByBank", pDate, pBankID, pVoucherType, pSafeID);

            }



            else if (pBankID != 0) //ChequeVoucher
            {
                // pNewCode = objCCustomizedDBCall.A_ChequeVoucher_GetCodeByBank("A_ChequeVoucher_GetCodeByBank", pDate, pBankID, pVoucherType);
                //if (pVoucherType== constVoucherChequeOut)
                //    pNewChequeCode = objCCustomizedDBCall.A_ChequeVoucher_GetNextChequeNo("A_ChequeVoucher_GetNextChequeNo", pBankID, pVoucherType);
                if (pVoucherType == 30)
                {
                   // pNewCode = objCPaymentsCustomizedDBCall.A_ChequeVoucher_GetCodeByBank_NEW("A_CheckIn_GetCode_BySafeID", pDate, Convert.ToInt16(SafeID), false);
                    //pNewCode = objCPaymentsCustomizedDBCall.A_ChequeVoucher_GetCodeByBank_NEW("A_CheckIn_GetCode_BySafeID", pDate, Convert.ToInt16(SafeID), false);
                    pNewCode = objCCustomizedDBCall.A_CashVoucher_GetCode_BySafeCode("A_CashVoucher_GetCode_BySafeCode", pSafeID, pDate, pVoucherType);



                }
                else if (pVoucherType == 40)
                {
                    //pNewCode = objCPaymentsCustomizedDBCall.A_ChequeVoucher_GetCodeByBank_NEW("A_CheckOut_GetCode_BySafeID", pDate, Convert.ToInt16(SafeID), false);
                    pNewCode = objCCustomizedDBCall.A_CashVoucher_GetCode_BySafeCode("A_CashVoucher_GetCode_BySafeCode", pSafeID, pDate, pVoucherType);


                }
            }
            return new object[] {
                pNewCode //pNewCode = pData[0]
                , pNewChequeCode //pNewChequeCode = pData[1]
            };
        }

        [HttpGet, HttpPost]
        public bool Delete(String pPaymentIDs)
        {

            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CPaymentsCustomizedDBCall objCPaymentsCustomizedDBCall = new CPaymentsCustomizedDBCall();

            CPS_VoucherPayments objCPS_VoucherPayments = new CPS_VoucherPayments();
            CVarPS_VoucherPayments ObjCVarPS_VoucherPayments = new CVarPS_VoucherPayments();

            foreach (var PaymentID in pPaymentIDs.Split(','))
            {
                GlobalConnection.CreateConnection();

                GlobalConnection.OpenConnection();
                GlobalConnection.myTrans = GlobalConnection.myConnection.BeginTransaction(IsolationLevel.ReadUncommitted);

                try
                {
                    #region Set IsPaid In InvoiceHeader by 0
                    string InvoiceIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select InvoiceID from PS_PaymentTempInvoices where PaymentID = " + PaymentID);
                    //if (InvoiceIDs == "") // an exception is caught in the model
                    //{
                    //    GlobalConnection.BulkTransHasErrors = true;
                    //    throw new Exception();
                    //}
                    //foreach (var InvoiceID in InvoiceIDs.Split(','))
                    //{

                    //    //checkException = objCPaymentsCustomizedDBCall.CallStringFunction("UPDATE InvoiceHeader SET IsPaid = 0 WHERE ID = " + InvoiceID);

                    //    if (checkException != null) // an exception is caught in the model
                    //    {
                    //        GlobalConnection.BulkTransHasErrors = true;
                    //        throw new Exception();
                    //    }
                    //    checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "InvoiceHeader", Int64.Parse(InvoiceID), "U");
                    //    if (checkException != null) // an exception is caught in the model
                    //    {
                    //        GlobalConnection.BulkTransHasErrors = true;
                    //        throw new Exception();
                    //    }
                    //}


                    #endregion
                    #region Delete All Invoices From A_PaymentInvoices
                    string PaymentInvoicesIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select InvoiceID from PS_PaymentTempInvoices where PaymentID = " + PaymentID);
                    string PaymentisPurchase = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select isPurchase from PS_PaymentTempInvoices where PaymentID = " + PaymentID);

                    string PaymentDCInvoicesIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select DbtCrdtNotesID from PS_PaymentDbtCrdtNotes where PaymentID = " + PaymentID);
                    string PaymentInvoicesPKIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select ID from PS_PaymentTempInvoices where PaymentID = " + PaymentID);
                    string PaymentDCInvoicesPKIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select ID from PS_PaymentDbtCrdtNotes where PaymentID = " + PaymentID);

                    #region Update Paid To After Deleted Payment
                    string PaymentInvoicesPaidAmountsIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select PaidAmount from PS_PaymentTempInvoices where PaymentID = " + PaymentID);
                    string PaymentDCPaidAmountsInvoicesIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select PaidAmount from PS_PaymentDbtCrdtNotes where PaymentID = " + PaymentID);

                    //Update PS_Invoices PaidAmount
                    if (PaymentInvoicesIDs != "")
                    {
                        int NumberOfInvoices = PaymentInvoicesIDs.Split(',').Length;
                        var Currentamount = PaymentInvoicesPaidAmountsIDs.Split(',');
                        var CurrenisPurchase = PaymentisPurchase.Split(',');

                        //var Currenremain = PInvoicesRremain.Split(',');
                        for (int i = 0; i < NumberOfInvoices; i++)
                        {

                            // decimal total = Convert.ToDecimal(Currenremain[i]) - Convert.ToDecimal(Currentamount[i]);

                            // ObjCVarA_PaymentInvoices.InvoiceID = int.Parse(PaymentInvoicesIDs.Split(',')[i]);
                            string LastPaid = objCPaymentsCustomizedDBCall.CallStringFunctionReturn("select PaidAmount from PS_InvoicesTemp where ID = " + int.Parse(PaymentInvoicesIDs.Split(',')[i]));
                            string TotalPrice = objCPaymentsCustomizedDBCall.CallStringFunctionReturn("select totalPrice from PS_InvoicesTemp where ID = " + int.Parse(PaymentInvoicesIDs.Split(',')[i]));
                            if (Convert.ToBoolean(CurrenisPurchase[i]) == false)
                            {
                                LastPaid = "0";
                            }
                            decimal TotalPaid = Convert.ToDecimal(LastPaid) - Convert.ToDecimal(Currentamount[i]);
                            if (Convert.ToBoolean(CurrenisPurchase[i]) == false)
                            {
                                TotalPaid = Math.Abs(TotalPaid);
                            }
                            decimal Remain = 0;
                            if (Convert.ToBoolean(CurrenisPurchase[i]) == false)
                            {
                                Remain = TotalPaid;
                            }
                            else
                            {
                                Remain = Convert.ToDecimal(TotalPrice) - TotalPaid;
                            }
                             
                            if (Convert.ToBoolean(CurrenisPurchase[i]) == true)
                            {
                                objCPaymentsCustomizedDBCall.CallStringFunction("UPDATE PS_InvoicesTemp SET PaidAmount =" + TotalPaid + ", RemainAmount =" + Remain + "WHERE ID = " + int.Parse(PaymentInvoicesIDs.Split(',')[i]));
                            }
                            if (Convert.ToBoolean(CurrenisPurchase[i]) == false)
                            {
                                objCPaymentsCustomizedDBCall.CallStringFunction("UPDATE DAS_VoyageDisbursement SET IsPaid=0,PaymentAmount =0, RemainingAmount =" + Convert.ToDecimal(Currentamount[i]) + "WHERE VoyageDisbursement_ID = " + int.Parse(PaymentInvoicesIDs.Split(',')[i]));

                            }
                        }

                    }
                    if (PaymentDCInvoicesIDs != "")
                    {
                        int NumberOfInvoices = PaymentDCInvoicesIDs.Split(',').Length;
                        var Currentamount = PaymentDCPaidAmountsInvoicesIDs.Split(',');
                        //var Currenremain = PInvoicesRremain.Split(',');
                        for (int i = 0; i < NumberOfInvoices; i++)
                        {

                            // decimal total = Convert.ToDecimal(Currenremain[i]) - Convert.ToDecimal(Currentamount[i]);

                            // ObjCVarA_PaymentInvoices.InvoiceID = int.Parse(PaymentInvoicesIDs.Split(',')[i]);
                            string LastPaid = objCPaymentsCustomizedDBCall.CallStringFunctionReturn("select PaidAmount from PS_DbtCrdtNotes where ID = " + int.Parse(PaymentDCInvoicesIDs.Split(',')[i]));
                            string TotalPrice = objCPaymentsCustomizedDBCall.CallStringFunctionReturn("select totalPrice from PS_DbtCrdtNotes where ID = " + int.Parse(PaymentDCInvoicesIDs.Split(',')[i]));
                            decimal TotalPaid = Convert.ToDecimal(LastPaid) - Convert.ToDecimal(Currentamount[i]);
                            decimal Remain = Convert.ToDecimal(TotalPrice) - TotalPaid;
                            objCCustomizedDBCall.CallStringFunction("UPDATE PS_DbtCrdtNotes SET PaidAmount =" + TotalPaid + ", RemainAmount =" + Remain + "WHERE ID = " + int.Parse(PaymentDCInvoicesIDs.Split(',')[i]));
                        }
                    }
                    #endregion
                    //if (PaymentInvoicesPKIDs == "") // an exception is caught in the model
                    //{
                    //    GlobalConnection.BulkTransHasErrors = true;
                    //    throw new Exception();
                    //}
                    if (PaymentInvoicesPKIDs != "")
                    {
                        foreach (var PaymentInvoiceID in PaymentInvoicesPKIDs.Split(','))
                        {
                            checkException = objCPaymentsCustomizedDBCall.CallStringFunction("DELETE FROM PS_PaymentTempInvoices WHERE ID = " + PaymentInvoiceID);
                            if (checkException != null) // an exception is caught in the model
                            {
                                GlobalConnection.BulkTransHasErrors = true;
                                throw new Exception();
                            }
                            checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "PS_PaymentTempInvoices", Int64.Parse(PaymentInvoiceID), "D");
                            if (checkException != null) // an exception is caught in the model
                            {
                                GlobalConnection.BulkTransHasErrors = true;
                                throw new Exception();
                            }
                        }

                    }
                    if (PaymentDCInvoicesPKIDs != "")
                    {
                        foreach (var PaymentDCInvoiceID in PaymentDCInvoicesPKIDs.Split(','))
                        {
                            checkException = objCPaymentsCustomizedDBCall.CallStringFunction("DELETE FROM PS_PaymentDbtCrdtNotes WHERE ID = " + PaymentDCInvoiceID);
                            if (checkException != null) // an exception is caught in the model
                            {
                                GlobalConnection.BulkTransHasErrors = true;
                                throw new Exception();
                            }
                            checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "PS_PaymentTempInvoices", Int64.Parse(PaymentDCInvoiceID), "D");
                            if (checkException != null) // an exception is caught in the model
                            {
                                GlobalConnection.BulkTransHasErrors = true;
                                throw new Exception();
                            }
                        }
                    }
                    #endregion
                    string VoucherIDs = "";
                    #region Get VoucherIDs
                    VoucherIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select VoucherID from PS_VoucherPaymentsTemp where PaymentID = " + PaymentID);
                    if (VoucherIDs == "") // an exception is caught in the model
                    {
                        GlobalConnection.BulkTransHasErrors = true;
                        throw new Exception();
                    }

                    #endregion

                    #region Delete All InvoicesDetails From A_VoucherDetails
                    foreach (var VoucherID in VoucherIDs.Split(','))
                    {
                        //Unpost
                        string VoucherType = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select VoucherType from PS_VoucherPaymentsTemp where VoucherID = " + VoucherID);

                        if (Convert.ToInt32(VoucherType) == 20) //Cash
                            objCPaymentsCustomizedDBCall.A_CashVouchers_UnPosted_ByID("A_CashVouchers_UnPosted_ByID", "," + Convert.ToString(VoucherID) + ",", WebSecurity.CurrentUserId);
                        else //Cheque
                            objCPaymentsCustomizedDBCall.A_ChequeVouchers_UnPosted_ByID("A_ChequeVouchers_UnPosted_ByID", "," + Convert.ToString(VoucherID) + ",", WebSecurity.CurrentUserId);

                        checkException = objCPaymentsCustomizedDBCall.CallStringFunction("DELETE FROM A_VoucherDetails WHERE VoucherID = " + VoucherID);
                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnection.BulkTransHasErrors = true;
                            throw new Exception();
                        }
                        checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_VoucherDetails", Int64.Parse(VoucherID), "D");
                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnection.BulkTransHasErrors = true;
                            throw new Exception();
                        }


                    }
                    #endregion

                    #region Delete All VoucherPayment From A_VoucherPayments & Delete All Voucher From A_Voucher
                    string VoucherPaymentIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select ID from PS_VoucherPaymentsTemp where PaymentID = " + PaymentID);
                    if (VoucherPaymentIDs == "") // an exception is caught in the model
                    {
                        GlobalConnection.BulkTransHasErrors = true;
                        throw new Exception();
                    }
                    foreach (var VoucherPaymentID in VoucherPaymentIDs.Split(','))
                    {
                        checkException = objCPaymentsCustomizedDBCall.CallStringFunction("DELETE FROM PS_VoucherPaymentsTemp WHERE ID = " + VoucherPaymentID);
                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnection.BulkTransHasErrors = true;
                            throw new Exception();
                        }
                        checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "PS_VoucherPaymentsTemp", Int64.Parse(VoucherPaymentID), "D");
                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnection.BulkTransHasErrors = true;
                            throw new Exception();
                        }
                    }
                    foreach (var VoucherID in VoucherIDs.Split(','))
                    {
                        checkException = objCPaymentsCustomizedDBCall.CallStringFunction("DELETE FROM A_Voucher WHERE ID = " + VoucherID);
                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnection.BulkTransHasErrors = true;
                            throw new Exception();
                        }
                        checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_Voucher", Int64.Parse(VoucherID), "D");
                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnection.BulkTransHasErrors = true;
                            throw new Exception();
                        }
                    }

                    #endregion


                    //string JVID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select JVID from PS_Payments where ID = " + PaymentID);
                    //if (JVID != "")
                    //{
                    //    #region Delete From A_JVDetails


                    //    string JVDetailsIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select ID from A_JVDetails where JV_ID = " + JVID);
                    //    foreach (var JVDetailsID in JVDetailsIDs.Split(','))
                    //    {
                    //        checkException = objCPaymentsCustomizedDBCall.CallStringFunction("DELETE FROM A_JVDetails WHERE ID = " + JVDetailsID);
                    //        if (checkException != null) // an exception is caught in the model
                    //        {
                    //            GlobalConnection.BulkTransHasErrors = true;
                    //            throw new Exception();
                    //        }
                    //        checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JVDetails", Int64.Parse(JVDetailsID), "D");
                    //        if (checkException != null) // an exception is caught in the model
                    //        {
                    //            GlobalConnection.BulkTransHasErrors = true;
                    //            throw new Exception();
                    //        }
                    //    }
                    //    #endregion
                    //    #region Delete From A_JV

                    //    checkException = objCPaymentsCustomizedDBCall.CallStringFunction("DELETE FROM A_JV WHERE ID = " + JVID);
                    //    if (checkException != null) // an exception is caught in the model
                    //    {
                    //        GlobalConnection.BulkTransHasErrors = true;
                    //        throw new Exception();
                    //    }
                    //    checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JV", Int64.Parse(JVID), "D");
                    //    if (checkException != null) // an exception is caught in the model
                    //    {
                    //        GlobalConnection.BulkTransHasErrors = true;
                    //        throw new Exception();
                    //    }
                    //    #endregion
                    //}

                    #region Set IsDeleted In A_Payments by 1

                    //checkException = objCPaymentsCustomizedDBCall.CallStringFunction("UPDATE PS_Payments SET IsDeleted = 1 WHERE ID = " + PaymentID);
                    checkException = objCPaymentsCustomizedDBCall.CallStringFunction("delete PS_PaymentsTemp WHERE ID = " + PaymentID);

                    if (checkException != null) // an exception is caught in the model
                    {
                        GlobalConnection.BulkTransHasErrors = true;
                        throw new Exception();
                    }
                    checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "PS_PaymentsTemp", Int64.Parse(PaymentID), "U");
                    if (checkException != null) // an exception is caught in the model
                    {
                        GlobalConnection.BulkTransHasErrors = true;
                        throw new Exception();
                    }
                    GlobalConnection.myTrans.Commit();
                    #endregion

                }
                catch (Exception e)
                {
                    GlobalConnection.myTrans.Rollback();
                    throw;
                }
                finally
                {
                    GlobalConnection.myConnection.Close();
                    GlobalConnection.myConnection.Dispose();
                }

            }

            return true;
        }

    }
    public class InsertPS_PaymentsParameters
    {
        //CASH PARAMETERS
        public string pSafeIDListCash { get; set; }
        public string pCurrencyIDListCash { get; set; }
        public string pExchangeRateListCash { get; set; }
        public string pNewExchangeRateListCash { get; set; }

        public string pAmountListCash { get; set; }
        public string pPaymentNotesListCash { get; set; }
        public Int32 pVoucherTypeCash { get; set; }
        public string pTaxIDListCash { get; set; }
        public string pTaxValueListCash { get; set; }
        public string pTotalListCash { get; set; }
        public string pTotalAfterTaxListCash { get; set; }
        public string pValueListCash { get; set; }
        public string pDescriptionListCash { get; set; }
        //CHEQUE PARAMETERS
        public string pCurrencyIDListCheque { get; set; }
        public string pExchangeRateListCheque { get; set; }
        public string pNewExchangeRateListCheque { get; set; }

        public string pAmountListCheque { get; set; }
        public string pPaymentNotesListCheque { get; set; }
        public Int32 pVoucherTypeCheque { get; set; }
        public string pTaxIDListCheque { get; set; }
        public string pTaxValueListCheque { get; set; }
        public string pTotalListCheque { get; set; }
        public string pTotalAfterTaxListCheque { get; set; }
        public string pValueListCheque { get; set; }
        public string pDescriptionListCheque { get; set; }
        public string pBankIDListCheque { get; set; }
        public string pChequeNoListCheque { get; set; }
        //DEPOSITE PARAMETERS
        public string pCurrencyIDListDeposite { get; set; }
        public string pExchangeRateListDeposite { get; set; }
        public string pNewExchangeRateListDeposite { get; set; }

        public string pAmountListDeposite { get; set; }
        public string pPaymentNotesListDeposite { get; set; }
        public Int32 pVoucherTypeDeposite { get; set; }
        public string pTaxIDListDeposite { get; set; }
        public string pTaxValueListDeposite { get; set; }
        public string pTotalListDeposite { get; set; }
        public string pTotalAfterTaxListDeposite { get; set; }
        public string pValueListDeposite { get; set; }
        public string pDescriptionListDeposite { get; set; }
        public string pBankIDListDeposite { get; set; }
        public string pReferenceNoListDeposite { get; set; }
        //transfer PARAMETERS
        public string pCurrencyIDListTransfer { get; set; }
        public string pExchangeRateListTransfer { get; set; }
        public string pNewExchangeRateListTransfer { get; set; }

        public string pAmountListTransfer { get; set; }
        public string pPaymentNotesListTransfer { get; set; }
        public Int32 pVoucherTypeTransfer { get; set; }
        public string pTaxIDListTransfer { get; set; }
        public string pTaxValueListTransfer { get; set; }
        public string pTotalListTransfer { get; set; }
        public string pTotalAfterTaxListTransfer { get; set; }
        public string pValueListTransfer { get; set; }
        public string pDescriptionListTransfer { get; set; }
        public string pBankIDListTransfer { get; set; }
        public string pSwiftCodeListTransfer { get; set; }
        public Int64 pID { get; set; }
        public DateTime pVoucherDate { get; set; }
        
        public string pChequeNo { get; set; }
        public string pChequeDateList { get; set; }
        public string pDepositeDateList { get; set; }
        public string pTransferDateList { get; set; }


        public Int32 pVoucherType { get; set; }


        public bool pIsChequeOrDeposit { get; set; }

        public Int32 pTaxSign { get; set; }
        public Int32 pTaxID2 { get; set; }
        public decimal pTaxValue2 { get; set; }
        public Int32 pTaxSign2 { get; set; }
        public Int32 pDiscountTaxID { get; set; }
        public decimal pDiscountTaxValue { get; set; }
        public Int32 pDiscountTaxID2 { get; set; }
        public decimal pDiscountTaxValue2 { get; set; }
        public string pChargedPerson { get; set; }

        public bool pIsAGInvoice { get; set; }
        public Int32 pAGInvType_ID { get; set; }
        public Int32 pInv_No { get; set; }
        public Int32 pInvoiceID { get; set; }
        public Int32 pJVID1 { get; set; }
        public Int64 pJVID2 { get; set; }
        public Int64 pJVID3 { get; set; }
        public Int64 pJVID4 { get; set; }
        public Int32 pSalesManID { get; set; }
        public Int32 pforwOperationID { get; set; }
        public bool pIsCustomClearance { get; set; }
        public Int32 pTransType_ID { get; set; }
        public bool pIsCash { get; set; }
        public bool pIsCheque { get; set; }
        public DateTime pPrintDate { get; set; }
        public string pOtherSideBankName { get; set; }
        public DateTime pCollectionDate { get; set; }
        public decimal pCollectionExpense { get; set; }
        public Int64 pDetailsID { get; set; }

        public Int32 pAccountID { get; set; }
        public Int32 pSubAccountID { get; set; }
        public Int32 pCostCenterID { get; set; }
        public bool pIsDocumented { get; set; }
        public Int32 pDetailsInvoiceID { get; set; }

        public decimal pRefund { get; set; }
        public Int32 pClientID { get; set; }
        public string pCollectionExpensesList { get; set; }

        //paymentHeader
        public string pClientIDHeader { get; set; }
        public DateTime pVoucherDateHeader { get; set; }
        public string pPaymentNotes { get; set; }
        public string pTotalCost { get; set; }
        public Int32 pPaymentCurrencyID { get; set; }
        public decimal pPaymentAmount { get; set; }
        public decimal pPaymentExchangeRate { get; set; }
        public string pInvoicesIDs { get; set; }
        public string pInvoicesDCNotesIDs { get; set; }

        public Int32 pBankChargesCurrency { get; set; }
        public decimal pRefundAmount { get; set; }
        public Int32 pRefundCurrency { get; set; }
        public decimal pBankChargesAmount { get; set; }
        public string PInvoicesAmounts { get; set; }
        public string PInvoicesRremain { get; set; }
        public string pReferenceNo { get; set; }
        public string pSwiftCode { get; set; }
        public bool pIsExtra { get; set; }
        public decimal pExtraAmount { get; set; }
        
        public string PInvoicesDCNotesAmounts { get; set; }
        public string PInvoicesDCNotesRremain { get; set; }
        public string PInvoicesisPurchase { get; set; }




    }

}
