
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using System.Data;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Controllers.SL.API_SL_Transactions;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Sales.Transactions.Generated.Payments.Generated;
using Forwarding.MvcApp.Models.Customized;
//using MoreLinq;

namespace ERP_Web.MvcApp.Controllers.Sales.API_Transactions
{
    public static class GlobalVariable
    {
        public static long PaymentID = 0; // Unmodifiable

    }
    public static class Globals
    {
        public static Int32 CUserId = WebSecurity.CurrentUserId; // Unmodifiable
    }
    [Serializable]
    public class CVarTotalAmount
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
    public class CTotalAmount
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

        public List<CVarTotalAmount> lstCVarTotalAmount = new List<CVarTotalAmount>();
        #endregion
    }
    public class SL_PaymentsController : ApiController
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
            CvwClientsGroups objCvwSL_ClientsGroups = new CvwClientsGroups();

            objCvwSL_ClientsGroups.GetListPaging(9999, 1, "WHERE 1=1", "Name", out _RowCount);

            return new Object[] {
                 new JavaScriptSerializer().Serialize(objCvwSL_ClientsGroups.lstCVarvwClientsGroups) //pAccounts = pData[0]};
                 ,_RowCount
                 };
        }
        [HttpGet, HttpPost]
        public Object[] LoadAllBanksByName(string pBankID)
        {
            CvwSL_Payments objCSL_Payments = new CvwSL_Payments();
            // objCSL_Payments.GetListBanksByName(" order by " + pBankID);
            objCSL_Payments.GetListBanksByName("where DefaultCurrencyID = " + pBankID);

            return new Object[] { new JavaScriptSerializer().Serialize(objCSL_Payments.lstCVarvwSL_Payments.ToList()) };

        }

        [HttpGet, HttpPost]
        public Object[] LoadAllSafesByName(string pSafeID)
        {

            CvwSafesForLinkinkUsers objCSL_Payments = new CvwSafesForLinkinkUsers();
            //objCSL_Payments.GetListSafesByName(" order by " + pSafeID);
            objCSL_Payments.GetList("where DefaultCurrencyID =" + pSafeID + "  AND UserID=" + WebSecurity.CurrentUserId);

            return new Object[] { new JavaScriptSerializer().Serialize(objCSL_Payments.lstCVarvwSafesForLinkinkUsers.ToList()) };
            //CvwSL_Payments objCSL_Payments = new CvwSL_Payments();
            ////objCSL_Payments.GetListSafesByName(" order by " + pSafeID);
            //objCSL_Payments.GetListSafesByName(" where DefaultCurrencyID =" + pSafeID);

            //return new Object[] { new JavaScriptSerializer().Serialize(objCSL_Payments.lstCVarvwSL_Payments.ToList()) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllUsersByName(string pOrderBy)
        {
            CvwSL_Payments objCSL_Payments = new CvwSL_Payments();
            objCSL_Payments.GetListUsersByName(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objCSL_Payments.lstCVarvwSL_Payments.ToList()) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllCurrencyByName()
        {
            //CvwSL_Payments objCSL_Payments = new CvwSL_Payments();
            //objCSL_Payments.GetListCurrencyByName(" order by " + pCurrencyID);
            //return new Object[] { new JavaScriptSerializer().Serialize(objCSL_Payments.lstCVarvwSL_Payments.ToList()) };

            CvwCurrencies objCvwCurrencies = new CvwCurrencies();
            objCvwCurrencies.GetList(" order by " + "  ID ");
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCurrencies.lstCVarvwCurrencies.ToList()) };

        }

        [HttpGet, HttpPost]
        public Object[] LoadAllClientsByName(string pBillNo)

        {
            string WhereClause = pBillNo;
            CvwSL_selectClientNameByNoPayment objCSL_Payments = new CvwSL_selectClientNameByNoPayment();
            objCSL_Payments.GetList(WhereClause);
            // objCSL_Payments.Distinct


            return new Object[] { new JavaScriptSerializer().Serialize(objCSL_Payments.lstCVarvwSL_selectClientNameByNoPayment) };
        }

        [HttpGet, HttpPost]
        public Object[] GetAccountIDAndSubAccountID(Int64 pClientID)
        {

            CvwSL_Payments objCSL_Payments = new CvwSL_Payments();
            objCSL_Payments.GetListAccountIDAndSubAccountID(pClientID);
            return new Object[] { new JavaScriptSerializer().Serialize(objCSL_Payments.lstCVarvwSL_Payments) };
            //return new Object[] {
            //    , pID //pVoucherID = pData[1]
            //    , new JavaScriptSerializer().Serialize(objCSL_Payments.lstCVarvwPayments)
            //    , VCODE //pCode pData[3]
            //};
        }
         
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, String pWhereClause)
        {
            GlobalConnection.CreateConnection();

            CvwSL_Payments objCSL_Payments = new CvwSL_Payments();

            Int32 _RowCount = objCSL_Payments.lstCVarvwSL_Payments.Count;

            objCSL_Payments.GetListPaging(pPageSize, pPageNumber, pWhereClause == null ? "" : pWhereClause, "ID", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCSL_Payments.lstCVarvwSL_Payments), _RowCount };
        }
        //[HttpGet, HttpPost]
        //public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        //{
        //    CvwSL_Payments objCSL_Payments = new CvwSL_Payments();
        //    Int32 _RowCount = objCSL_Payments.lstCVarvwSL_Payments.Count;
        //    if (pIsLoadArrayOfObjects)
        //    {
        //        objCSL_Payments.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);

        //    }

        //    return new object[] {
        //        new JavaScriptSerializer().Serialize(objCSL_Payments.lstCVarvwSL_Payments)
        //        , _RowCount

        //    };
        //}

        [HttpGet, HttpPost]
        public Object[] GetRefundAccountIDAndSubAccountID(Int64 pClientID)
        {
            CvwSL_Payments objCSL_Payments = new CvwSL_Payments();
            objCSL_Payments.GetListRefundAccountIDAndSubAccountID(pClientID);
            return new Object[] { objCSL_Payments.lstCVarvwSL_Payments[0].AccountID, objCSL_Payments.lstCVarvwSL_Payments[0].SubAccountID };
        }

        [HttpGet, HttpPost]
        public bool InsertA_PaymentsAndA_PaymentInvoices(Int32 pClientID, DateTime pVoucherDate, string pPaymentNotes, string pTotalCost,
                                           string pInvoicesIDs, string pInvoicesDCNotesIDs, string PInvoicesAmounts, string PInvoicesRremain, string PInvoicesDCNotesAmounts, string PInvoicesDCNotesRremain, Int32 pPaymentCurrencyID, decimal pPaymentAmount, decimal pPaymentExchangeRate,
                                           Int32 pBankChargesCurrency, decimal pBankChargesAmount, Int32 pRefundCurrency, decimal pRefundAmount)
        {
            GlobalConnection.CreateConnection();

            bool _result = true;
            Exception checkException = null;
            string pMessageReturned = "";
            //GlobalConnection.StartBulkTrans();
            try
            {

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
                    throw new Exception();
                }
                else if (objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count > 0)
                {
                    pMessageReturned = "This fiscal year is closed.";
                    _result = false;
                    throw new Exception();
                }
                #endregion Check FiscalYear is Confirmed and NOT Closed
                #region Check VoucherCode
                //if (objCA_Voucher.lstCVarA_Voucher.Count > 0)
                //    pMessageReturned = "This code already exists for this year.";
                #endregion Check VoucherCode
                #region Check Period is Not Frozen
                if (objCFreezeSystemTransactions.lstCVarFreezeSystemTransactions.Count > 0)
                {
                    pMessageReturned = "The transactions for this date is frozen.";
                    _result = false;
                    throw new Exception();
                }
                #endregion Check Period is Not Frozen


                GlobalConnection.OpenConnection();
                GlobalConnection.myTrans = GlobalConnection.myConnection.BeginTransaction(IsolationLevel.ReadUncommitted);

                //CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                CPaymentsCustomizedDBCall objCCustomizedDBCall = new CPaymentsCustomizedDBCall();

                #region Insert In A_Payments
                ///////////Insert In A_Payments//////////////
                CSL_Payments objCSL_Payments = new CSL_Payments();
                CVarSL_Payments ObjCVarSL_Payments = new CVarSL_Payments();


                String Code = objCCustomizedDBCall.CallStringFunctionReturn("select  isnull(max(cast(Code as numeric)),0)+1  from Payments");
                ObjCVarSL_Payments.Code = (Code == "0" ? "1" : Code);
                ObjCVarSL_Payments.PaymentDate = pVoucherDate;
                ObjCVarSL_Payments.ClientID = pClientID;
                ObjCVarSL_Payments.Notes = pPaymentNotes == null ? "" : pPaymentNotes;
                ObjCVarSL_Payments.UserID = WebSecurity.CurrentUserId;
                ObjCVarSL_Payments.IsDeleted = false;
                ObjCVarSL_Payments.TotalPayment = Convert.ToDecimal(pTotalCost);
                ObjCVarSL_Payments.CurrencyID = pPaymentCurrencyID;
                //ObjCVarSL_Payments.PaymentAmount = pPaymentAmount;
                ObjCVarSL_Payments.ExchangeRate = pPaymentExchangeRate;
                ObjCVarSL_Payments.BankChargesAmount = pBankChargesAmount;
                ObjCVarSL_Payments.BankChargesCurrencyID = pBankChargesCurrency;
                ObjCVarSL_Payments.RefundAmount = pRefundAmount;
                ObjCVarSL_Payments.RefundCurrencyID = pRefundCurrency;
                ObjCVarSL_Payments.IsDeleted = false;


                objCSL_Payments.lstCVarSL_Payments.Add(ObjCVarSL_Payments);

                checkException = objCSL_Payments.SaveMethod(objCSL_Payments.lstCVarSL_Payments);

                if (checkException != null) // an exception is caught in the model
                {

                    _result = false;
                    GlobalConnection.myTrans.Rollback();
                    throw new Exception();

                }
                GlobalVariable.PaymentID = ObjCVarSL_Payments.ID;
                #endregion

                #region Insert In A_PaymentInvoices
                CPaymentInvoices objCA_PaymentInvoices = new CPaymentInvoices();

                CVarPaymentInvoices ObjCVarA_PaymentInvoices = new CVarPaymentInvoices();

                if (pInvoicesIDs != null)
                {
                    int NumberOfInvoices = pInvoicesIDs.Split(',').Length;
                    var Currentamount = PInvoicesAmounts.Split(',');
                    var Currenremain = PInvoicesRremain.Split(',');


                    for (int i = 0; i < NumberOfInvoices; i++)
                    {

                        decimal total = Convert.ToDecimal(Currenremain[i]) - Convert.ToDecimal(Currentamount[i]);

                        ObjCVarA_PaymentInvoices.InvoiceID = int.Parse(pInvoicesIDs.Split(',')[i]);
                        string LastPaid = objCCustomizedDBCall.CallStringFunctionReturn("select isnull(PaidAmount,0)PaidAmount from SL_Invoices where ID = " + ObjCVarA_PaymentInvoices.InvoiceID);

                        decimal TotalPaid = (LastPaid ==""?0:Convert.ToDecimal(LastPaid)) + Convert.ToDecimal(Currentamount[i]);
                        #region Set IsPaid In InvoiceHeader by 1
                        objCCustomizedDBCall.CallStringFunction("UPDATE SL_Invoices SET PaidAmount =" + TotalPaid + ", RemainAmount =" + total + "WHERE ID = " + ObjCVarA_PaymentInvoices.InvoiceID);

                        // objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "InvoiceHeader", Int64.Parse(ObjCVarA_PaymentInvoices.InvoiceID.ToString()), "U");
                        #endregion




                        if (GlobalVariable.PaymentID != 0)
                            objCA_PaymentInvoices.lstCVarPaymentInvoices.Clear();
                        ObjCVarA_PaymentInvoices.PaymentID = GlobalVariable.PaymentID;
                        ObjCVarA_PaymentInvoices.PaidAmount = Convert.ToDecimal(PInvoicesAmounts.Split(',')[i]);


                        objCA_PaymentInvoices.lstCVarPaymentInvoices.Add(ObjCVarA_PaymentInvoices);

                        ObjCVarA_PaymentInvoices.ID = 0;

                        checkException = objCA_PaymentInvoices.SaveMethod(objCA_PaymentInvoices.lstCVarPaymentInvoices);

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
                CPaymentDbtCrdtNotes objCSL_PaymentDbtCrdtNotes = new CPaymentDbtCrdtNotes();

                CVarPaymentDbtCrdtNotes ObjCVarSL_PaymentDbtCrdtNotes = new CVarPaymentDbtCrdtNotes();

                if (pInvoicesDCNotesIDs != null)
                {
                    int NumberOfInvoicesDCNotesIDss = pInvoicesDCNotesIDs.Split(',').Length;
                    var CurrentamountDC = PInvoicesDCNotesAmounts.Split(',');
                    var CurrenremainDC = PInvoicesDCNotesRremain.Split(',');
                    for (int i = 0; i < NumberOfInvoicesDCNotesIDss; i++)
                    {
                        decimal totalDC = Convert.ToDecimal(CurrenremainDC[i]) - Convert.ToDecimal(CurrentamountDC[i]);

                        ObjCVarSL_PaymentDbtCrdtNotes.DbtCrdtNotesID = int.Parse(pInvoicesDCNotesIDs.Split(',')[i]);
                        string LastPaid = objCCustomizedDBCall.CallStringFunctionReturn("select ISNULL(PaidAmount,0) from DbtCrdtNotes where ID = " + ObjCVarSL_PaymentDbtCrdtNotes.DbtCrdtNotesID);
                        decimal TotalPaid = Convert.ToDecimal(LastPaid) + Convert.ToDecimal(CurrentamountDC[i]);
                        #region Set IsPaid In InvoiceHeader by 1
                        objCCustomizedDBCall.CallStringFunction("UPDATE DbtCrdtNotes SET PaidAmount =" + TotalPaid + ", RemainAmount =" + totalDC + "WHERE ID = " + ObjCVarSL_PaymentDbtCrdtNotes.DbtCrdtNotesID);

                        // objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "InvoiceHeader", Int64.Parse(ObjCVarA_PaymentInvoices.InvoiceID.ToString()), "U");
                        #endregion

                        if (GlobalVariable.PaymentID != 0)
                            objCSL_PaymentDbtCrdtNotes.lstCVarPaymentDbtCrdtNotes.Clear();
                        ObjCVarSL_PaymentDbtCrdtNotes.PaymentID = GlobalVariable.PaymentID;
                        ObjCVarSL_PaymentDbtCrdtNotes.PaidAmount = Convert.ToDecimal(PInvoicesDCNotesAmounts.Split(',')[i]);

                        objCSL_PaymentDbtCrdtNotes.lstCVarPaymentDbtCrdtNotes.Add(ObjCVarSL_PaymentDbtCrdtNotes);

                        ObjCVarSL_PaymentDbtCrdtNotes.ID = 0;

                        checkException = objCSL_PaymentDbtCrdtNotes.SaveMethod(objCSL_PaymentDbtCrdtNotes.lstCVarPaymentDbtCrdtNotes);

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
        public Object[] GetCode(Int32 pSafeID, Int32 pBankID, DateTime pDate, Int32 pVoucherType)
        {
            int constVoucherChequeOut = 40;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string pNewCode = "";
            string pNewChequeCode = "";

            if (pBankID != 0) //ChequeVoucher
            {
                pNewCode = objCCustomizedDBCall.A_ChequeVoucher_GetCodeByBank2("A_ChequeVoucher_GetCodeByBank", pDate, pBankID, pVoucherType, pSafeID);
                if (pVoucherType == constVoucherChequeOut)
                    pNewChequeCode = objCCustomizedDBCall.A_ChequeVoucher_GetNextChequeNo("A_ChequeVoucher_GetNextChequeNo", pBankID, pVoucherType);
            }
            else if (pSafeID != 0) //CashVoucher
                pNewCode = objCCustomizedDBCall.A_CashVoucher_GetCode_BySafeCode("A_CashVoucher_GetCode_BySafeCode", pSafeID, pDate, pVoucherType);
            return new object[] {
                pNewCode //pNewCode = pData[0]
                , pNewChequeCode //pNewChequeCode = pData[1]
            };
        }



        [HttpGet, HttpPost]
        //public bool Insert(Int64 pID, DateTime pVoucherDate, Int32 pSafeID, Int32 pBankID, Int32 pCurrencyID
        //    , decimal pExchangeRate, decimal pAmount, string pNotes, string pPaymentNotes, string pChequeNo, DateTime pChequeDate, Int32 pVoucherType, bool pIsChequeOrDeposit
        //    , Int32 pTaxID, decimal pTaxValue, Int32 pTaxSign, Int32 pTaxID2, decimal pTaxValue2, Int32 pTaxSign2, Int32 pDiscountTaxID, decimal pDiscountTaxValue
        //    , Int32 pDiscountTaxID2, decimal pDiscountTaxValue2, string pChargedPerson, decimal pTotal, decimal pTotalAfterTax, bool pIsAGInvoice
        //    , Int32 pAGInvType_ID, Int32 pInv_No, Int64 pInvoiceID, Int64 pJVID1, Int64 pJVID2, Int64 pJVID3, Int64 pJVID4, Int32 pSalesManID
        //    , Int32 pforwOperationID, bool pIsCustomClearance, Int32 pTransType_ID, bool pIsCash, bool pIsCheque, DateTime pPrintDate, string pOtherSideBankName
        //    , DateTime pCollectionDate, decimal pCollectionExpense
        //    //Details Data
        //    , Int64 pDetailsID, decimal pValue, string pDescription, Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, bool pIsDocumented
        //    , Int32 pDetailsInvoiceID, string pInvoicesIDs, decimal pRefund, Int32 pClientID
        //    //Bank Charges Data 
        //    , string pCollectionExpensesList)
            public object[] Insert([FromBody] InsertPaymentsParameters InsertPaymentsParameters)
        {

            bool _result = true;
            Exception checkException = null;

            try
            {
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                CVoucherPayments objCA_VoucherPayments = new CVoucherPayments();
                CVarVoucherPayments ObjCVarA_VoucherPayments = new CVarVoucherPayments();


                #region Insert In A_VoucherDetails And  A_Voucher
                //////////////////////Insert In A_VoucherDetails/////////////////////////////
                string VCODE = "0";
                string pCode = "0";
                string pUpdateClause = "";
                string SafeID = objCCustomizedDBCall.CallStringFunction("A_VoucherGetTopSafeIDByUserID " + WebSecurity.CurrentUserId);
                SafeID = ((SafeID == "" || SafeID ==  null) ? "0" : SafeID);
                if (InsertPaymentsParameters.pVoucherType == 10)
                {
                    pCode = Convert.ToString(GetCode(InsertPaymentsParameters.pSafeID, InsertPaymentsParameters.pBankID, InsertPaymentsParameters.pVoucherDate,InsertPaymentsParameters.pVoucherType)[0]);
                }
                else if (InsertPaymentsParameters.pVoucherType == 30)
                {
                    pCode = Convert.ToString(GetCode(InsertPaymentsParameters.pSafeID, InsertPaymentsParameters.pBankID, InsertPaymentsParameters.pVoucherDate, InsertPaymentsParameters.pVoucherType)[0]);
                    pCode = ((pCode == "" || pCode == null) ? "0" : pCode);
                }
                else
                {
                    pCode = Convert.ToString(GetCode(InsertPaymentsParameters.pSafeID, InsertPaymentsParameters.pBankID, InsertPaymentsParameters.pVoucherDate, InsertPaymentsParameters.pVoucherType)[0]);
                }

                //  string pCode = Convert.ToString(GetCode(pSafeID, pBankID, pVoucherDate, pVoucherType)[0]);

                CVarA_VoucherHeader objCVarA_Voucher = new CVarA_VoucherHeader();
                CVarA_VoucherHeaderDetails objCVarA_VoucherDetails = new CVarA_VoucherHeaderDetails();
                CA_VoucherHeaderDetails objCA_VoucherDetails = new CA_VoucherHeaderDetails();
                CA_VoucherHeader objCA_Voucher = new CA_VoucherHeader();

                #region Save
                long VoucherID = 0;

                #region Save Header
                if (InsertPaymentsParameters.pID == 0) //insert header
                {
                    //if (objCA_Voucher.lstCVarA_Voucher.Count > 0)
                    VCODE = pCode;
                    //else
                    //    VCODE = pCode;

                    objCVarA_Voucher.Code = VCODE;
                    objCVarA_Voucher.VoucherDate = InsertPaymentsParameters.pVoucherDate;
                    objCVarA_Voucher.SafeID = InsertPaymentsParameters.pVoucherType == 10 ? InsertPaymentsParameters.pSafeID : Convert.ToInt32(SafeID);
                    objCVarA_Voucher.CurrencyID = InsertPaymentsParameters.pCurrencyID;
                    objCVarA_Voucher.ExchangeRate = InsertPaymentsParameters.pExchangeRate;
                    objCVarA_Voucher.ChargedPerson = InsertPaymentsParameters.pChargedPerson;
                    objCVarA_Voucher.Notes = InsertPaymentsParameters.pNotes == null ? "" : InsertPaymentsParameters.pNotes;
                    objCVarA_Voucher.TaxID = InsertPaymentsParameters.pTaxID;
                    objCVarA_Voucher.Posted = false;
                    objCVarA_Voucher.Approved = false;

                    objCVarA_Voucher.TaxValue = InsertPaymentsParameters.pTaxValue;
                    objCVarA_Voucher.TaxSign = InsertPaymentsParameters.pTaxSign;
                    objCVarA_Voucher.TaxID2 = InsertPaymentsParameters.pTaxID2;
                    objCVarA_Voucher.TaxValue2 = InsertPaymentsParameters.pTaxValue2;
                    objCVarA_Voucher.TaxSign2 = InsertPaymentsParameters.pTaxSign2;
                    objCVarA_Voucher.Total = InsertPaymentsParameters.pTotal;
                    objCVarA_Voucher.TotalAfterTax = InsertPaymentsParameters.pTotalAfterTax;
                    objCVarA_Voucher.IsAGInvoice = InsertPaymentsParameters.pIsAGInvoice;
                    objCVarA_Voucher.AGInvType_ID = InsertPaymentsParameters.pAGInvType_ID;
                    objCVarA_Voucher.Inv_No = InsertPaymentsParameters.pInv_No;
                    objCVarA_Voucher.InvoiceID = InsertPaymentsParameters.pInvoiceID;
                    objCVarA_Voucher.SalesManID = InsertPaymentsParameters.pSalesManID;
                    objCVarA_Voucher.forwOperationID = InsertPaymentsParameters.pforwOperationID;
                    objCVarA_Voucher.IsCustomClearance = InsertPaymentsParameters.pIsCustomClearance;
                    objCVarA_Voucher.TransType_ID = InsertPaymentsParameters.pTransType_ID;
                    objCVarA_Voucher.VoucherType = InsertPaymentsParameters.pVoucherType;
                    objCVarA_Voucher.IsCash = InsertPaymentsParameters.pIsCash;
                    objCVarA_Voucher.IsCheque = InsertPaymentsParameters.pIsCheque;
                    objCVarA_Voucher.PrintDate = InsertPaymentsParameters.pPrintDate;
                    objCVarA_Voucher.ChequeNo = InsertPaymentsParameters.pVoucherType == 30 ? InsertPaymentsParameters.pChequeNo : "0";
                    objCVarA_Voucher.ChequeDate = InsertPaymentsParameters.pVoucherType == 30 ? InsertPaymentsParameters.pChequeDate : Convert.ToDateTime("1/1/1900");
                    objCVarA_Voucher.BankID = InsertPaymentsParameters.pVoucherType == 30 ? InsertPaymentsParameters.pBankID : 0;
                    objCVarA_Voucher.OtherSideBankName = InsertPaymentsParameters.pOtherSideBankName;
                    objCVarA_Voucher.CollectionDate = InsertPaymentsParameters.pCollectionDate;
                    objCVarA_Voucher.CollectionExpense = InsertPaymentsParameters.pCollectionExpense;
                    objCVarA_Voucher.DiscountTaxID = InsertPaymentsParameters.pDiscountTaxID;
                    objCVarA_Voucher.DiscountTaxValue = InsertPaymentsParameters.pDiscountTaxValue;
                    objCVarA_Voucher.DiscountTaxID2 = InsertPaymentsParameters.pDiscountTaxID2;
                    objCVarA_Voucher.DiscountTaxValue2 = InsertPaymentsParameters.pDiscountTaxValue2;
                    objCVarA_Voucher.IsCustody = false;
                    objCVarA_Voucher.IsLiner = false;

                    objCVarA_Voucher.DisbursementJob_ID = 0;
                    objCVarA_Voucher.SL_SalesManID = 0;
                    objCVarA_Voucher.Bill_ID = 0;
                    objCVarA_Voucher.IBAN = "0";
                    objCVarA_Voucher.ReferenceNo = "0";
                    objCVarA_Voucher.DepositeDate = Convert.ToDateTime("1/1/1900");
                    objCVarA_Voucher.TransferDate = Convert.ToDateTime("1/1/1900");

                    objCVarA_Voucher.PaidAmount = 0;
                    objCVarA_Voucher.RemainAmount = InsertPaymentsParameters.pTotalAfterTax;
                    objCVarA_Voucher.isTransfer = false;


                    objCVarA_Voucher.OtherSideBankName = "0";
                    objCVarA_Voucher.CollectionDate = Convert.ToDateTime("1/1/1900");
                    objCVarA_Voucher.CollectionExpense = 0;
                    objCVarA_Voucher.NoteAccountID = 0;
                    objCVarA_Voucher.NoteAccountIDRec = 0;
                    objCVarA_Voucher.ReciprocalBankID = 0;

                    objCA_Voucher.lstCVarA_Voucher.Add(objCVarA_Voucher);

                    checkException = objCA_Voucher.SaveMethod(objCA_Voucher.lstCVarA_Voucher);
                    VoucherID = objCVarA_Voucher.ID;

                    InsertPaymentsParameters.pID = objCVarA_Voucher.ID;

                    if (checkException != null)
                    {
                        _result = false;
                        GlobalConnection.myTrans.Rollback();
                        throw new Exception();
                    }

                }
               
                #endregion Save Header
                #region Save Details

                objCVarA_VoucherDetails.ID = InsertPaymentsParameters.pDetailsID;
                objCVarA_VoucherDetails.VoucherID = InsertPaymentsParameters.pID;
                objCVarA_VoucherDetails.Value = InsertPaymentsParameters.pValue - InsertPaymentsParameters.pRefund;
                objCVarA_VoucherDetails.Description = InsertPaymentsParameters.pDescription == null ? "" : InsertPaymentsParameters.pDescription;
                objCVarA_VoucherDetails.AccountID = InsertPaymentsParameters.pAccountID;
                objCVarA_VoucherDetails.SubAccountID = InsertPaymentsParameters.pSubAccountID;
                objCVarA_VoucherDetails.CostCenterID = InsertPaymentsParameters.pCostCenterID;
                objCVarA_VoucherDetails.IsDocumented = InsertPaymentsParameters.pIsDocumented;
                objCVarA_VoucherDetails.InvoiceID = InsertPaymentsParameters.pInvoiceID;
                objCVarA_VoucherDetails.VoucherType = InsertPaymentsParameters.pVoucherType;
                objCVarA_VoucherDetails.Job_ID = 0;
                objCVarA_VoucherDetails.OperationID = 0;
                objCVarA_VoucherDetails.TruckingOrderID = 0;

                objCVarA_VoucherDetails.HouseID = 0;
                objCVarA_VoucherDetails.BranchID = 0;
                objCA_VoucherDetails.lstCVarA_VoucherDetails.Add(objCVarA_VoucherDetails);
                checkException = objCA_VoucherDetails.SaveMethod(objCA_VoucherDetails.lstCVarA_VoucherDetails);

                if (checkException != null)
                {
                    _result = false;
                    GlobalConnection.myTrans.Rollback();
                    throw new Exception();

                }

                //if (pVoucherType == 30 && pRefund != 0)
                //{
                //    Object[] Parms = new Object[2];
                //    Parms = GetRefundAccountIDAndSubAccountID(pClientID);

                //    objCVarA_VoucherDetails.ID = pDetailsID;
                //    objCVarA_VoucherDetails.VoucherID = pID;
                //    objCVarA_VoucherDetails.Value = pRefund;
                //    objCVarA_VoucherDetails.Description = pDescription == null ? "" : pDescription;
                //    objCVarA_VoucherDetails.AccountID = Convert.ToInt32(Parms[0]);
                //    objCVarA_VoucherDetails.SubAccountID = Convert.ToInt32(Parms[1]);
                //    objCVarA_VoucherDetails.CostCenterID = pCostCenterID;
                //    objCVarA_VoucherDetails.IsDocumented = pIsDocumented;
                //    objCVarA_VoucherDetails.InvoiceID = pInvoiceID;
                //    objCVarA_VoucherDetails.VoucherType = pVoucherType;
                //    objCA_VoucherDetails.lstCVarA_VoucherDetails.Add(objCVarA_VoucherDetails);
                //    checkException = objCA_VoucherDetails.SaveMethod(objCA_VoucherDetails.lstCVarA_VoucherDetails);

                //    if (checkException != null)
                //    {
                //        _result = false;
                //        throw new Exception();

                //    }
                //}



                CPaymentsCustomizedDBCall objCPaymentsCustomizedDBCall = new CPaymentsCustomizedDBCall();

                if (InsertPaymentsParameters.pVoucherType == 10)
                {

                    objCPaymentsCustomizedDBCall.A_CashInVouchers_Posting("A_CashInVouchers_Posting", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, Globals.CUserId);
                }
                else
                {

                    objCPaymentsCustomizedDBCall.A_ChequeInVouchers_Posting("A_ChequeInVouchers_Posting", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, Globals.CUserId);
                }

                #endregion Save Details
                #endregion Save
                #endregion


                #region Insert In A_JV For Bank Charges
                if (InsertPaymentsParameters.pVoucherType == 30 && InsertPaymentsParameters.pCollectionExpensesList != "0" && !InsertPaymentsParameters.pIsChequeOrDeposit)
                {
                    bool check = PostingUnderCollectNotes_ApproveOrReturn(Convert.ToString(InsertPaymentsParameters.pBankID), Convert.ToString(VoucherID), Convert.ToString(InsertPaymentsParameters.pChequeDate), Convert.ToString(InsertPaymentsParameters.pTotal), InsertPaymentsParameters.pCollectionExpensesList);
                    if (!check)
                    {
                        _result = false;
                        GlobalConnection.myTrans.Rollback();
                        throw new Exception();

                    }
                }
                #endregion

                #region Insert In A_PaymentInvoices
                //CA_PaymentInvoices objCA_PaymentInvoices = new CA_PaymentInvoices();

                //CVarA_PaymentInvoices ObjCVarA_PaymentInvoices = new CVarA_PaymentInvoices();

                //if (pFirstCall == 1)
                //{
                //    int NumberOfInvoices = pInvoicesIDs.Split(',').Length;

                //    for (int i = 0; i < NumberOfInvoices; i++)
                //    {
                //        ObjCVarA_PaymentInvoices.InvoiceID = int.Parse(pInvoicesIDs.Split(',')[i]);
                //        //if (Globals.PaymentID == 0)
                //        if (GlobalVariable.PaymentID != 0)
                //            objCA_PaymentInvoices.lstCVarA_PaymentInvoices.Clear();
                //        ObjCVarA_PaymentInvoices.PaymentID = GlobalVariable.PaymentID;

                //        objCA_PaymentInvoices.lstCVarA_PaymentInvoices.Add(ObjCVarA_PaymentInvoices);

                //        ObjCVarA_PaymentInvoices.ID = 0;

                //        checkException = objCA_PaymentInvoices.SaveMethod(objCA_PaymentInvoices.lstCVarA_PaymentInvoices);

                //        if (checkException != null)
                //        {
                //            pMessageReturned = checkException.Message;
                //            GlobalConnection.BulkTransHasErrors = true;
                //            throw new Exception();
                //              _result = false;
                //        }
                //        //else
                //        //{
                //        //    
                //        //}
                //    }
                //}
                #endregion
                #region Insert In A_VoucherPayments 
                ///////////Insert In A_VoucherPayments//////////////

                ObjCVarA_VoucherPayments.SafeID = InsertPaymentsParameters.pVoucherType == 10 ? InsertPaymentsParameters.pSafeID : 0;
                ObjCVarA_VoucherPayments.BankID = InsertPaymentsParameters.pVoucherType == 30 ? InsertPaymentsParameters.pBankID : 0;
                ObjCVarA_VoucherPayments.CurrencyID = InsertPaymentsParameters.pCurrencyID;
                ObjCVarA_VoucherPayments.ExchangeRate = InsertPaymentsParameters.pExchangeRate;
                ObjCVarA_VoucherPayments.Amount = InsertPaymentsParameters.pAmount;
                ObjCVarA_VoucherPayments.Notes = InsertPaymentsParameters.pNotes == null ? "" : InsertPaymentsParameters.pNotes; ;
                ObjCVarA_VoucherPayments.ChequeNo = InsertPaymentsParameters.pVoucherType == 30 ? InsertPaymentsParameters.pChequeNo : "0";
                ObjCVarA_VoucherPayments.ChequeDate = InsertPaymentsParameters.pVoucherType == 30 ? Convert.ToDateTime(InsertPaymentsParameters.pChequeDate) : Convert.ToDateTime("1/1/1900");
                ObjCVarA_VoucherPayments.VoucherType = InsertPaymentsParameters.pVoucherType;
                ObjCVarA_VoucherPayments.VoucherID = Convert.ToInt32(VoucherID);
                ObjCVarA_VoucherPayments.PaymentID = Convert.ToInt32(GlobalVariable.PaymentID);
                ObjCVarA_VoucherPayments.IsCheque = InsertPaymentsParameters.pIsChequeOrDeposit;
                ObjCVarA_VoucherPayments.TaxID = InsertPaymentsParameters.pTaxID;
                ObjCVarA_VoucherPayments.TaxValue = InsertPaymentsParameters.pTaxValue;
                ObjCVarA_VoucherPayments.TaxSign = InsertPaymentsParameters.pTaxSign;
                ObjCVarA_VoucherPayments.TaxID2 = InsertPaymentsParameters.pTaxID2;
                ObjCVarA_VoucherPayments.TaxValue2 = InsertPaymentsParameters.pTaxValue2;
                ObjCVarA_VoucherPayments.TaxSign2 = InsertPaymentsParameters.pTaxSign2;
                ObjCVarA_VoucherPayments.DiscountTaxID = InsertPaymentsParameters.pDiscountTaxID;
                ObjCVarA_VoucherPayments.DiscountTaxValue = InsertPaymentsParameters.pDiscountTaxValue;
                ObjCVarA_VoucherPayments.DiscountTaxID2 = InsertPaymentsParameters.pDiscountTaxID2;
                ObjCVarA_VoucherPayments.DiscountTaxValue2 = InsertPaymentsParameters.pDiscountTaxValue2;
                ObjCVarA_VoucherPayments.voucherCode = pCode;


                Int32 _RowCount = objCA_VoucherPayments.lstCVarVoucherPayments.Count;

                objCA_VoucherPayments.lstCVarVoucherPayments.Add(ObjCVarA_VoucherPayments);

                checkException = objCA_VoucherPayments.SaveMethod(objCA_VoucherPayments.lstCVarVoucherPayments);
                if (checkException != null)
                {
                    _result = false;
                    GlobalConnection.myTrans.Rollback();
                    throw new Exception();

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
            finally
            {

            }


            return new object[] { _result };
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        [HttpGet, HttpPost]
        public bool InsertA_JVAndA_JVDetails(string pInvoicesIDs, bool pCheck)
        {
            bool _result = true;
            Exception checkException = null;
            try
            {
                CPaymentsCustomizedDBCall objCCustomizedDBCall = new CPaymentsCustomizedDBCall();
                CVarPaymentInvoices ObjCVarA_PaymentInvoices = new CVarPaymentInvoices();
                CVarSL_Payments ObjCVarSL_Payments = new CVarSL_Payments();
                CSL_Payments objCSL_Payments = new CSL_Payments();

                string PaymentAmount = objCCustomizedDBCall.CallStringFunctionReturn("select sum(ISNULL(Amount, 0)) from VoucherPayments where PaymentID = " + Convert.ToInt32(GlobalVariable.PaymentID) + " and CurrencyID = (select CurrencyID from Payments where ID = " + Convert.ToInt32(GlobalVariable.PaymentID) + ")");
                string InvoicesAmount = objCCustomizedDBCall.CallStringFunctionReturn("select ISNULL(TotalPayment, 0)TotalPayment from Payments where ID = " + Convert.ToInt32(GlobalVariable.PaymentID));
                if (Convert.ToDecimal(PaymentAmount == "" ? "0" : PaymentAmount) >= Convert.ToDecimal((InvoicesAmount == "" ? "0" : InvoicesAmount)))
                {
                    pCheck = false;
                }

                if (pCheck == true)
                {
                   
                }
                else
                {
                   
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

        //pOption 1:Approve 2:Returned
        [HttpGet, HttpPost]
        public bool PostingUnderCollectNotes_ApproveOrReturn(string pBankIDList, string pVoucherIDList, string pJVDateList, string pAmountList, string pCollectionExpensesList)
        {
           
            CPaymentsCustomizedDBCall objCCustomizedDBCall = new CPaymentsCustomizedDBCall();

            Int32 ArrChequeStatusIDList = Convert.ToInt32(objCCustomizedDBCall.CallStringFunctionReturn("select ID from A_ChequeStatus where VoucherID = " + pVoucherIDList));
            Int32 pOption = 1;
            string pSafeIDList = "0";
            string pSafeAccountIDList = "0";
            string pBankAccountIDList = objCCustomizedDBCall.CallStringFunctionReturn("select Account_ID from Bank where ID = " + pBankIDList);
            string pBankNotesReceivableUnderCollectionList = objCCustomizedDBCall.CallStringFunctionReturn("select NotesReceivableUnderCollection from Bank where ID = " + pBankIDList);
            string pBankNotesPayableUnderCollectionList = objCCustomizedDBCall.CallStringFunctionReturn("select NotesPayableUnderCollection from Bank where ID = " + pBankIDList);
            string pBankCollectionExpensesIDsList = objCCustomizedDBCall.CallStringFunctionReturn("select CollectionExpenses from Bank where ID = " + pBankIDList);
            string pBankNotesReceivableList = objCCustomizedDBCall.CallStringFunctionReturn("select NotesReceivable from Bank where ID = " + pBankIDList);
            string pBankNotesPayableList = objCCustomizedDBCall.CallStringFunctionReturn("select NotesPayable from Bank where ID = " + pBankIDList);
            string pBankInJournalTypeIDList = objCCustomizedDBCall.CallStringFunctionReturn("select InJournalTypeID from Bank where ID = " + pBankIDList);
            string pBankOutJournalTypeIDList = objCCustomizedDBCall.CallStringFunctionReturn("select OutJournalTypeID from Bank where ID = " + pBankIDList);

            //int constVoucherCashIn = 10;
            //int constVoucherCashOut = 20;
            int constVoucherChequeIn = 30;
            int constVoucherChequeOut = 40;
            bool _result = true;
            Exception checkException = null;
            CA_Voucher objCA_Voucher = new CA_Voucher();
            CvwA_Voucher objCvwA_Voucher = new CvwA_Voucher();
            CA_Fiscal_Year_Period objCA_Fiscal_Year_Period = new CA_Fiscal_Year_Period();
            CFreezeSystemTransactions objCFreezeSystemTransactions = new CFreezeSystemTransactions();
            CA_ChequeStatus objCA_ChequeStatus = new CA_ChequeStatus();
            CA_JV objCA_JV = new CA_JV();
            CvwA_JV objCOriginalvwA_JV = new CvwA_JV(); //The first JV created
            CA_JVDetails objCA_JVDetails = new CA_JVDetails();
            CJVDefaults objCJVDefaults = new CJVDefaults();

            //     --16--ترحيل أوراق قبض
            //--17--ترحيل أوراق قبض تحت التحصيل
            //--18--ترحيل أوراق دفع
            //-- 19-- ترحيل أوراق دفع تحت التحصيل

            checkException = objCJVDefaults.GetList("WHERE TransTypeID IN (16,17,19)");
            int pJournalID16 = objCJVDefaults.lstCVarJVDefaults.Where(w => w.TransTypeID == 16).Last().JournalTypeID;
            int pJournalID17 = objCJVDefaults.lstCVarJVDefaults.Where(w => w.TransTypeID == 17).Last().JournalTypeID;
            int pJournalID19 = objCJVDefaults.lstCVarJVDefaults.Where(w => w.TransTypeID == 19).Last().JournalTypeID;

            int pJVTypeID16 = objCJVDefaults.lstCVarJVDefaults.Where(w => w.TransTypeID == 16).Last().JVTypeID;
            int pJVTypeID17 = objCJVDefaults.lstCVarJVDefaults.Where(w => w.TransTypeID == 17).Last().JVTypeID;
            int pJVTypeID19 = objCJVDefaults.lstCVarJVDefaults.Where(w => w.TransTypeID == 19).Last().JVTypeID;
            //checkException = objCA_Voucher.GetList("WHERE ID IN (" + pVoucherIDList + ")");
            int NumberOfSelectedRows = 1; //pSelectedReceivablePayableNotesIDs.Split(',').Length;
            //var ArrChequeStatusIDList = pSelectedReceivablePayableNotesIDs.Split(',');
            var ArrVoucherIDsList = pVoucherIDList.Split(',');
            var ArrJVDateList = pJVDateList.Split(',');
            var ArrSafeIDList = pSafeIDList.Split(',');
            var ArrBankIDList = pBankIDList.Split(',');
            var ArrSafeAccountIDList = pSafeAccountIDList.Split(',');
            var ArrBankAccountIDList = pBankAccountIDList.Split(',');
            var ArrCollectionExpensesList = pCollectionExpensesList.Split(',');
            var ArrAmountList = pAmountList.Split(',');
            var ArrBankNotesReceivableUnderCollectionList = pBankNotesReceivableUnderCollectionList.Split(',');
            var ArrBankNotesPayableUnderCollectionList = pBankNotesPayableUnderCollectionList.Split(',');
            var ArrBankCollectionExpensesIDsList = pBankCollectionExpensesIDsList.Split(',');
            var ArrBankInJournalTypeIDList = pBankInJournalTypeIDList.Split(',');
            var ArrBankOutJournalTypeIDList = pBankOutJournalTypeIDList.Split(',');
            var ArrBankNotesReceivableList = pBankNotesReceivableList.Split(',');
            var ArrBankNotesPayable = pBankNotesPayableList.Split(',');
            for (int i = 0; i < NumberOfSelectedRows; i++)
            {
                CVarA_JV objCVarA_JV = new CVarA_JV();
                objCVarA_JV.ID = 0;
                objCA_JV.lstCVarA_JV.RemoveAll(r => 1 == 1); //to empty the list in case its filled inside the loop
                objCA_JVDetails.lstCVarA_JVDetails.RemoveAll(r => 1 == 1); //to empty the list in case its filled inside the loop
                DateTime pJVDate = Convert.ToDateTime(ArrJVDateList[i]);   //  , "dd/MM/yyyy", CultureInfo.InvariantCulture);
                string pJVDateInyyyyMMddFormat = pJVDate.ToString("yyyyMMdd");
                checkException = objCvwA_Voucher.A_JVDataFill("WHERE ID = " + ArrVoucherIDsList[i] + ""); //i put it here to handle order of retrieving
                DateTime pVoucherDate = objCvwA_Voucher.lstCVarvwA_Voucher[0].VoucherDate;
                int pTransType_ID = objCvwA_Voucher.lstCVarvwA_Voucher[0].TransType_ID;
                checkException = objCA_Fiscal_Year_Period.GetList("WHERE '" + pVoucherDate.ToString("yyyy/MM/dd") + "' BETWEEN From_Date AND To_Date and Closed=1");
                checkException = objCFreezeSystemTransactions.GetList("WHERE TransType='All' AND ('" + pVoucherDate.ToString("yyyy/MM/dd") + "' BETWEEN FromDate AND ToDate)");
                if (objCFreezeSystemTransactions.lstCVarFreezeSystemTransactions.Count == 0
                    /*&& objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count == 0*/) //not closed and date not frozen
                {
                    checkException = objCOriginalvwA_JV.A_JVDataFill("WHERE ID=" + objCvwA_Voucher.lstCVarvwA_Voucher[0].JVID1);
                    decimal pTaxValue1 = objCvwA_Voucher.lstCVarvwA_Voucher[0].TaxValue;
                    bool pIsDebitAccount1 = objCvwA_Voucher.lstCVarvwA_Voucher[0].IsDebitAccount;
                    decimal pTaxValue2 = objCvwA_Voucher.lstCVarvwA_Voucher[0].TaxValue2;
                    decimal pTaxValue = 0;
                    bool pIsDebitAccount2 = objCvwA_Voucher.lstCVarvwA_Voucher[0].IsDebitAccount2;
                    int pCurrencyID = objCvwA_Voucher.lstCVarvwA_Voucher[0].CurrencyID;
                    decimal pExchangeRate = decimal.Parse(objCCustomizedDBCall.CallStringFunctionReturn("SELECT dbo.Get_Exch_Rate (" + pCurrencyID + ",'" + ArrJVDateList[i] + "')"));
                    #region Post (Collected or ToSafe)
                    if (pOption == 1) //Post
                    {
                        #region Income
                        if (objCvwA_Voucher.lstCVarvwA_Voucher[0].VoucherType == constVoucherChequeIn)
                        {
                            pTaxValue = (pIsDebitAccount1 ? pTaxValue1 : 0) + (pIsDebitAccount2 ? pTaxValue2 : 0);
                            #region A_JVDetails Row 1
                            CVarA_JVDetails objCVarA_JVDetails1 = new CVarA_JVDetails();
                            //objCVarA_JVDetails.JV_ID = objCVarA_JV.ID;
                            objCVarA_JVDetails1.Account_ID = (ArrSafeAccountIDList[i] == "0" ? int.Parse(ArrBankAccountIDList[i]) : int.Parse(ArrSafeAccountIDList[i]));
                            //objCVarA_JVDetails.SubAccount_ID = 0;
                            //objCVarA_JVDetails.CostCenter_ID = 0;
                            objCVarA_JVDetails1.Debit = decimal.Parse(ArrAmountList[i]) - decimal.Parse(ArrCollectionExpensesList[i]);
                            objCVarA_JVDetails1.Credit = 0;
                            objCVarA_JVDetails1.Currency_ID = pCurrencyID;
                            objCVarA_JVDetails1.ExchangeRate = pExchangeRate;
                            objCVarA_JVDetails1.LocalDebit = objCVarA_JVDetails1.Debit * pExchangeRate;
                            objCVarA_JVDetails1.LocalCredit = 0;
                            objCVarA_JVDetails1.Description = "0";
                            objCA_JVDetails.lstCVarA_JVDetails.Add(objCVarA_JVDetails1);
                            #endregion A_JVDetails Row 1
                            #region A_JVDetails Row 2
                            CVarA_JVDetails objCVarA_JVDetails2 = new CVarA_JVDetails();
                            //objCVarA_JVDetails2.JV_ID = objCVarA_JV.ID;
                            objCVarA_JVDetails2.Account_ID = int.Parse(ArrBankNotesReceivableUnderCollectionList[i]);
                            //objCVarA_JVDetails2.SubAccount_ID = 0;
                            //objCVarA_JVDetails2.CostCenter_ID = 0;
                            objCVarA_JVDetails2.Debit = 0;
                            objCVarA_JVDetails2.Credit = decimal.Parse(ArrAmountList[i]);
                            objCVarA_JVDetails2.Currency_ID = pCurrencyID;
                            objCVarA_JVDetails2.ExchangeRate = pExchangeRate;
                            objCVarA_JVDetails2.LocalDebit = 0;
                            objCVarA_JVDetails2.LocalCredit = decimal.Parse(ArrAmountList[i]) * pExchangeRate;
                            objCVarA_JVDetails2.Description = "0";
                            objCA_JVDetails.lstCVarA_JVDetails.Add(objCVarA_JVDetails2);
                            #endregion A_JVDetails Row 2 
                            #region A_JVDetails Row 3 //if Collection Expense exists
                            if (ArrCollectionExpensesList[i] != "0")
                            {
                                CVarA_JVDetails objCVarA_JVdetails3 = new CVarA_JVDetails();
                                //objCVarA_JVdetails3.JV_ID = objCVarA_JV.ID;
                                objCVarA_JVdetails3.Account_ID = int.Parse(ArrBankCollectionExpensesIDsList[i]);
                                //objCVarA_JVdetails3.SubAccount_ID = 0;
                                //objCVarA_JVdetails3.CostCenter_ID = 0;
                                objCVarA_JVdetails3.Debit = decimal.Parse(ArrCollectionExpensesList[i]);
                                objCVarA_JVdetails3.Credit = 0;
                                objCVarA_JVdetails3.Currency_ID = pCurrencyID;
                                objCVarA_JVdetails3.ExchangeRate = pExchangeRate;
                                objCVarA_JVdetails3.LocalDebit = decimal.Parse(ArrCollectionExpensesList[i]) * pExchangeRate;
                                objCVarA_JVdetails3.LocalCredit = 0;
                                objCVarA_JVdetails3.Description = "0";
                                objCA_JVDetails.lstCVarA_JVDetails.Add(objCVarA_JVdetails3);
                            }
                            #endregion A_JVDetails Row 3 //if Collection Expense exists
                            #region Save JV Header And Details
                            int pJournal_ID = (ArrSafeIDList[i] != "0"
                                              ? pJournalID17
                                              : (
                                                    ArrBankIDList[i] == "0"
                                                    ? pJournalID17
                                                    : int.Parse(ArrBankInJournalTypeIDList[i])
                                                )
                                           );
                            //CCustomizedDBCall objCCustomizedDBCall2 = new CCustomizedDBCall();
                            string pNewJVCode = objCCustomizedDBCall.SP_A_JV_Get_Code("SP_A_JV_Get_Code", pJVDate, WebSecurity.CurrentUserId, pJournal_ID);
                            if (objCA_JVDetails.lstCVarA_JVDetails.Count == 2)
                            {
                                if (objCA_JVDetails.lstCVarA_JVDetails[0].Account_ID != objCA_JVDetails.lstCVarA_JVDetails[1].Account_ID)
                                {
                                    decimal TotalDebit = objCA_JVDetails.lstCVarA_JVDetails.Sum(s => s.LocalDebit);
                                    objCVarA_JV.JVNo = pNewJVCode;
                                    objCVarA_JV.JVDate = pJVDate;
                                    objCVarA_JV.TotalDebit = TotalDebit - pTaxValue;
                                    objCVarA_JV.TotalCredit = objCVarA_JV.TotalDebit;
                                    objCVarA_JV.Journal_ID = pJournal_ID;
                                    objCVarA_JV.JVType_ID = pJVTypeID17;
                                    objCVarA_JV.ReceiptNo = objCOriginalvwA_JV.lstCVarvwA_JV[0].ReceiptNo;
                                    objCVarA_JV.RemarksHeader = objCOriginalvwA_JV.lstCVarvwA_JV[0].RemarksHeader;
                                    objCVarA_JV.Deleted = false;
                                    objCVarA_JV.Posted = true;
                                    objCVarA_JV.User_ID = WebSecurity.CurrentUserId;
                                    objCVarA_JV.TransType_ID = pTransType_ID;
                                    objCVarA_JV.IsSysJv = true;
                                    objCA_JV.lstCVarA_JV.Add(objCVarA_JV);
                                    checkException = objCA_JV.A_JVSaveMethod(objCA_JV.lstCVarA_JV);
                                    if (checkException == null)
                                    {
                                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JV", objCVarA_JV.ID, "I");
                                    }
                                    else
                                        _result = false;
                                }
                            }
                            else
                            {
                                objCVarA_JV.JVNo = pNewJVCode;
                                objCVarA_JV.JVDate = pJVDate;
                                objCVarA_JV.TotalDebit = objCOriginalvwA_JV.lstCVarvwA_JV[0].TotalDebit - pTaxValue;
                                objCVarA_JV.TotalCredit = objCVarA_JV.TotalDebit;
                                objCVarA_JV.Journal_ID = pJournal_ID;
                                objCVarA_JV.JVType_ID = pJVTypeID17;
                                objCVarA_JV.ReceiptNo = objCOriginalvwA_JV.lstCVarvwA_JV[0].ReceiptNo;
                                objCVarA_JV.RemarksHeader = objCOriginalvwA_JV.lstCVarvwA_JV[0].RemarksHeader;
                                objCVarA_JV.Deleted = false;
                                objCVarA_JV.Posted = true;
                                objCVarA_JV.User_ID = WebSecurity.CurrentUserId;
                                objCVarA_JV.TransType_ID = pTransType_ID;
                                objCVarA_JV.IsSysJv = true;
                                objCA_JV.lstCVarA_JV.Add(objCVarA_JV);
                                checkException = objCA_JV.A_JVSaveMethod(objCA_JV.lstCVarA_JV);
                                if (checkException == null)
                                {
                                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JV", objCVarA_JV.ID, "I");
                                }
                                else
                                    _result = false;
                            }
                            if (_result)
                            {
                                for (int j = 0; j < objCA_JVDetails.lstCVarA_JVDetails.Count; j++)
                                    objCA_JVDetails.lstCVarA_JVDetails[j].JV_ID = objCVarA_JV.ID;
                                checkException = objCA_JVDetails.SaveMethod(objCA_JVDetails.lstCVarA_JVDetails);
                                checkException = objCA_Voucher.A_JVUpdateList("JVID3=" + objCVarA_JV.ID
                                            + " ,CollectionDate='" + pJVDateInyyyyMMddFormat + "'"
                                            + " ,CollectionExpense=" + ArrCollectionExpensesList[i]
                                            + " ,BankID=" + ArrBankIDList[i]
                                            + " WHERE ID=" + ArrVoucherIDsList[i]);
                                checkException = objCA_ChequeStatus.A_JVUpdateList("Type=1"
                                    + " ,BankID=" + ArrBankIDList[i]
                                    + " ,JVID=NULL , Posted=1, UnderCollection=1"
                                    + " ,Collected=" + (ArrSafeIDList[i] == "0" ? "1" : "0")
                                    + " ,Returned=0, ToSafe=" + (ArrSafeIDList[i] == "0" ? "0" : "1")
                                    + " ,SafeID=" + (ArrSafeIDList[i] == "0" ? "null" : ArrSafeIDList[i])
                                    //+ " ,DueDate='" + DateTime.ParseExact(ArrDueDateList[i], "dd/MM/yyyy", CultureInfo.InvariantCulture) + "'"
                                    + " WHERE ID=" + ArrChequeStatusIDList);
                            }
                            #endregion Save JVHeader And Details
                        }
                        #endregion Income

                    }
                    #endregion Post (Collected or ToSafe)

                }
                else
                    _result = false; //Frozen or closed period
            }

            return _result;

        }

        [HttpGet, HttpPost]
        public Object[] LoadInvoices(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)

        {

            //pWhereClause = pWhereClause + " And IsPaid = 0 And IsAudited = 1 And InvoiceSerialStr != 0";
            //pWhereClause = pWhereClause + " And IsPaid = 0 And IsAudited = 1";



            int returentCount = 0;

            Cvw_PaymentSL_InvoicesHeader InvoHeader = new Cvw_PaymentSL_InvoicesHeader();
            InvoHeader.GetListPaging(pPageSize, pPageNumber, pWhereClause, " [ID] ", out returentCount);

            JavaScriptSerializer serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new Object[]
            {
                  serializer.Serialize(InvoHeader.lstCVarvw_PaymentSL_InvoicesHeader)
                , returentCount
            };

        }
        [HttpGet, HttpPost]
        public Object[] LoadInvoicesDbtCrdtNote(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {

            //pWhereClause = pWhereClause + " And IsPaid = 0 And IsAudited = 1 And InvoiceSerialStr != 0";
            //pWhereClause = pWhereClause + " And IsPaid = 0 And IsAudited = 1";



            int returentCount = 0;

            Cvw_PaymentSL_InvoicesDbtCrdtNotesHeader InvoHeader = new Cvw_PaymentSL_InvoicesDbtCrdtNotesHeader();
            InvoHeader.GetListPaging(pPageSize, pPageNumber, pWhereClause, " [ID] ", out returentCount);

            JavaScriptSerializer serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new Object[]
            {
                  serializer.Serialize(InvoHeader.lstCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader)
                , returentCount
            };

        }
        //kk 1-1-2020
        //[HttpGet, HttpPost]
        //public Object[] GetPrintedData(Int64 pPaymentIDToPrint)
        //{
        //    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

        //    #region Payment
        //    CvwSL_Payments objCvwPayments = new CvwSL_Payments();
        //    objCvwPayments.GetList(" WHERE ID = " + pPaymentIDToPrint);
        //    #endregion

        //    #region Invoices
        //    Cvw_InvoiceHeader InvoHeader = new Cvw_InvoiceHeader();
        //    string PaymentInvoicesIDs = objCCustomizedDBCall.CallStringFunction("select InvoiceID from A_PaymentInvoices where PaymentID = " + pPaymentIDToPrint);

        //    //foreach (var PaymentInvoiceID in PaymentInvoicesIDs.Split(','))
        //    //{
        //    //    InvoHeader.GetList(" WHERE ID = " + PaymentInvoiceID);
        //    //}
        //    InvoHeader.GetList(" WHERE ID IN (" + PaymentInvoicesIDs + ")");

        //    #endregion

        //    #region Cash Payment
        //    CVoucherPayments objCA_VoucherPayments = new CVoucherPayments();
        //    objCA_VoucherPayments.GetList(" WHERE PaymentID = " + pPaymentIDToPrint);



        //    //foreach (var PaymentInvoiceID in PaymentInvoicesIDs.Split(','))
        //    //{
        //    //    objCA_VoucherPayments.GetList(" WHERE PaymentID = '" + pPaymentIDToPrint + "' & VoucherType = 10 '");
        //    //}
        //    //#endregion
        //    //#region Cheque Payment
        //    //foreach (var PaymentInvoiceID in PaymentInvoicesIDs.Split(','))
        //    //{
        //    //    objCA_VoucherPayments.GetList(" WHERE PaymentID = '" + pPaymentIDToPrint + "' & VoucherType = 30 '");
        //    //}
        //    #endregion

        //    return new Object[] {
        //        new JavaScriptSerializer().Serialize(objCvwPayments.lstCVarvwSL_Payments)
        //        ,new JavaScriptSerializer().Serialize(InvoHeader.lstCVarvw_InvoiceHeader)
        //        ,new JavaScriptSerializer().Serialize(objCA_VoucherPayments.lstCVarVoucherPayments)
        //    };
        //}

        [HttpGet, HttpPost]
        public Object[] GetPaymentsByDate_Printed(String pWhereClauseToPrint)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            #region Payment
            CvwSL_Payments objCvwPayments = new CvwSL_Payments();
            objCvwPayments.GetList(" WHERE IsDeleted = 0 And" + pWhereClauseToPrint);
            #endregion
            #region Calculate Total Amount
            CVarTotalAmount objCVarTotalAmount = new CVarTotalAmount();

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

            objCVarTotalAmount.Cash = "CASH ," + Convert.ToString(CashEGP) + ',' + Convert.ToString(CashUSD) + ',' + Convert.ToString(CashEUR);
            objCVarTotalAmount.Cheque = "CHEQUE ," + Convert.ToString(ChequeEGP) + ',' + Convert.ToString(ChequeUSD) + ',' + Convert.ToString(ChequeEUR);
            objCVarTotalAmount.Deposite = "DEPOSIT ," + Convert.ToString(DepositEGP) + ',' + Convert.ToString(DepositUSD) + ',' + Convert.ToString(DepositEUR);

            objCVarTotalAmount.Total = "Total ," + Convert.ToString(CashEGP + ChequeEGP + DepositEGP) + ','
                                                + Convert.ToString(CashUSD + ChequeUSD + DepositUSD) + ','
                                                + Convert.ToString(CashEUR + ChequeEUR + DepositEUR);

            CTotalAmount objCTotalAmount = new CTotalAmount();
            objCTotalAmount.lstCVarTotalAmount.Add(objCVarTotalAmount);

            #endregion

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwPayments.lstCVarvwSL_Payments)
                ,new JavaScriptSerializer().Serialize(objCTotalAmount.lstCVarTotalAmount)
                //,new JavaScriptSerializer().Serialize(objCA_VoucherPayments.lstCVarA_VoucherPayments)
            };
        }
        

        [HttpGet, HttpPost]
        public void Voucher_SetTotal(Int64 pVoucherID)
        {
            //Total = Sum of all rows + Sum of positive Taxes
            //TotalAfterTax = For Out-Vouchers then (Total - Sum of -ve Taxes)
            int constVoucherCashIn = 10;
            //int constVoucherCashOut = 20;
            int constVoucherChequeIn = 30;
            //int constVoucherChequeOut = 40;

            CA_Voucher objCA_Voucher = new CA_Voucher();
            CA_VoucherDetails objCA_VoucherDetails = new CA_VoucherDetails();
            objCA_Voucher.GetList("WHERE ID=" + pVoucherID);
            objCA_VoucherDetails.GetList("WHERE VoucherID=" + pVoucherID);
            decimal pTaxValue = objCA_Voucher.lstCVarA_Voucher[0].TaxValue * objCA_Voucher.lstCVarA_Voucher[0].TaxSign;
            decimal pTaxValue2 = objCA_Voucher.lstCVarA_Voucher[0].TaxValue2 * objCA_Voucher.lstCVarA_Voucher[0].TaxSign2;

            //decimal pDiscountTaxValue = objCA_Voucher.lstCVarA_Voucher[0].DiscountTaxValue;
            //decimal pDiscountTaxValue2 = objCA_Voucher.lstCVarA_Voucher[0].DiscountTaxValue2;

            decimal pTotal = 0;
            decimal pTotalAfterTax = 0;
            pTotal = objCA_VoucherDetails.lstCVarA_VoucherDetails.Sum(s => s.Value);
            pTotalAfterTax = pTotal;
            pTotal += (pTaxValue > 0 ? pTaxValue : 0) + (pTaxValue2 > 0 ? pTaxValue2 : 0);
            //if (objCA_Voucher.lstCVarA_Voucher[0].VoucherType == constVoucherCashIn || objCA_Voucher.lstCVarA_Voucher[0].VoucherType == constVoucherChequeIn)
            pTotalAfterTax += pTaxValue + pTaxValue2;
            //pTotalAfterTax -= (pDiscountTaxValue > 0 ? pDiscountTaxValue : 0) + (pDiscountTaxValue2 > 0 ? pDiscountTaxValue2 : 0);
            //else //OutVouchers so TotalAfterTax is remove just -ve Taxes
            //    pTotalAfterTax = (pTaxValue < 0 ? pTaxValue : 0) + (pTaxValue2 < 0 ? pTaxValue2 : 0);
            //if (pTotal >= pTotalAfterTax)
            objCA_Voucher.UpdateList("Total=" + pTotal + " ,TotalAfterTax=" + pTotalAfterTax + " WHERE ID=" + pVoucherID);
            //else
            //    objCA_Voucher.UpdateList("Total=" + pTotalAfterTax + " ,TotalAfterTax=" + pTotal + " WHERE ID=" + pVoucherID);
        }



        [HttpGet, HttpPost]
        public bool Delete(String pPaymentIDs)
        {

            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CPaymentsCustomizedDBCall objCPaymentsCustomizedDBCall = new CPaymentsCustomizedDBCall();
            CVoucherPayments objCA_VoucherPayments = new CVoucherPayments();
            CVarVoucherPayments ObjCVarA_VoucherPayments = new CVarVoucherPayments();

            foreach (var PaymentID in pPaymentIDs.Split(','))
            {
                GlobalConnection.CreateConnection();

                GlobalConnection.OpenConnection();
                GlobalConnection.myTrans = GlobalConnection.myConnection.BeginTransaction(IsolationLevel.ReadUncommitted);

                try
                {
                    #region Set IsPaid In InvoiceHeader by 0
                    string InvoiceIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select InvoiceID from PaymentInvoices where PaymentID = " + PaymentID);
                    if (InvoiceIDs == "") // an exception is caught in the model
                    {
                        GlobalConnection.BulkTransHasErrors = true;
                        throw new Exception();
                    }
                    foreach (var InvoiceID in InvoiceIDs.Split(','))
                    {

                        //checkException = objCPaymentsCustomizedDBCall.CallStringFunction("UPDATE InvoiceHeader SET IsPaid = 0 WHERE ID = " + InvoiceID);

                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnection.BulkTransHasErrors = true;
                            throw new Exception();
                        }
                        checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "InvoiceHeader", Int64.Parse(InvoiceID), "U");
                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnection.BulkTransHasErrors = true;
                            throw new Exception();
                        }
                    }


                    #endregion
                    #region Delete All Invoices From A_PaymentInvoices
                    //string PaymentInvoicesIDs = objCCustomizedDBCall.CallStringFunction("select ID from SL_PaymentInvoices where PaymentID = " + PaymentID);
                    //string PaymentDCInvoicesIDs = objCCustomizedDBCall.CallStringFunction("select ID from SL_PaymentDbtCrdtNotes where PaymentID = " + PaymentID);

                    string PaymentInvoicesIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select InvoiceID from PaymentInvoices where PaymentID = " + PaymentID);
                   // PaymentInvoicesIDs = ((PaymentInvoicesIDs == "" || PaymentInvoicesIDs == null) ? "0" : PaymentInvoicesIDs);
                    string PaymentDCInvoicesIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select DbtCrdtNotesID from PaymentDbtCrdtNotes where PaymentID = " + PaymentID);
                   // PaymentDCInvoicesIDs = ((PaymentDCInvoicesIDs == "" || PaymentDCInvoicesIDs == null) ? "0" : PaymentDCInvoicesIDs);
                    string PaymentInvoicesPKIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select ID from PaymentInvoices where PaymentID = " + PaymentID);
                  //  PaymentInvoicesPKIDs = ((PaymentInvoicesPKIDs == "" || PaymentInvoicesPKIDs == null) ? "0" : PaymentInvoicesPKIDs);
                    string PaymentDCInvoicesPKIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select ID from PaymentDbtCrdtNotes where PaymentID = " + PaymentID);
                 //   PaymentDCInvoicesPKIDs = ((PaymentDCInvoicesPKIDs == "" || PaymentDCInvoicesPKIDs == null) ? "0" : PaymentDCInvoicesPKIDs);
                    #region Update Paid To After Deleted Payment
                    string PaymentInvoicesPaidAmountsIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select PaidAmount from PaymentInvoices where PaymentID = " + PaymentID);
                   // PaymentDCInvoicesPKIDs = ((PaymentDCInvoicesPKIDs == "" || PaymentDCInvoicesPKIDs == null) ? "0" : PaymentDCInvoicesPKIDs);
                    string PaymentDCPaidAmountsInvoicesIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select PaidAmount from PaymentDbtCrdtNotes where PaymentID = " + PaymentID);
                   // PaymentDCInvoicesPKIDs = ((PaymentDCInvoicesPKIDs == "" || PaymentDCInvoicesPKIDs == null) ? "0" : PaymentDCInvoicesPKIDs);
                    //Update PS_Invoices PaidAmount
                    if (PaymentInvoicesIDs != "")
                    {
                        int NumberOfInvoices = PaymentInvoicesIDs.Split(',').Length;
                        var Currentamount = PaymentInvoicesPaidAmountsIDs.Split(',');
                        //var Currenremain = PInvoicesRremain.Split(',');
                        for (int i = 0; i < NumberOfInvoices; i++)
                        {

                            // decimal total = Convert.ToDecimal(Currenremain[i]) - Convert.ToDecimal(Currentamount[i]);

                            // ObjCVarA_PaymentInvoices.InvoiceID = int.Parse(PaymentInvoicesIDs.Split(',')[i]);
                            string LastPaid = objCPaymentsCustomizedDBCall.CallStringFunctionReturn("select isnull(PaidAmount,0) from SL_Invoices where ID = " + int.Parse(PaymentInvoicesIDs.Split(',')[i]));
                            LastPaid = ((LastPaid == "" || LastPaid == null) ? "0" : LastPaid);
                            string TotalPrice = objCPaymentsCustomizedDBCall.CallStringFunctionReturn("select isnull(totalPrice,0) from SL_Invoices where ID = " + int.Parse(PaymentInvoicesIDs.Split(',')[i]));
                            TotalPrice = ((TotalPrice == "" || TotalPrice == null) ? "0" : TotalPrice);
                            decimal TotalPaid = Convert.ToDecimal(LastPaid) - Convert.ToDecimal(Currentamount[i]);
                           // TotalPaid = ((TotalPaid == "" || TotalPaid == null) ? "0" : TotalPaid);

                            decimal Remain = Convert.ToDecimal(TotalPrice) - TotalPaid;
                            objCCustomizedDBCall.CallStringFunction("UPDATE SL_Invoices SET PaidAmount =" + TotalPaid + ", RemainAmount =" + Remain + "WHERE ID = " + int.Parse(PaymentInvoicesIDs.Split(',')[i]));
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
                            string LastPaid = objCPaymentsCustomizedDBCall.CallStringFunctionReturn("select PaidAmount from DbtCrdtNotes where ID = " + int.Parse(PaymentDCInvoicesIDs.Split(',')[i]));
                            LastPaid = ((LastPaid == "" || LastPaid == null) ? "0" : LastPaid);
                            string TotalPrice = objCPaymentsCustomizedDBCall.CallStringFunctionReturn("select totalPrice from DbtCrdtNotes where ID = " + int.Parse(PaymentDCInvoicesIDs.Split(',')[i]));
                            TotalPrice = ((TotalPrice == "" || TotalPrice == null) ? "0" : TotalPrice);

                            decimal TotalPaid = Convert.ToDecimal(LastPaid) - Convert.ToDecimal(Currentamount[i]);
                           // TotalPaid = ((TotalPaid == "" || TotalPaid == null) ? "0" : TotalPaid);


                            decimal Remain = Convert.ToDecimal(TotalPrice) - TotalPaid;
                            objCCustomizedDBCall.CallStringFunction("UPDATE DbtCrdtNotes SET PaidAmount =" + TotalPaid + ", RemainAmount =" + Remain + "WHERE ID = " + int.Parse(PaymentDCInvoicesIDs.Split(',')[i]));
                        }
                    }
                    #endregion
                    if (PaymentInvoicesPKIDs == "") // an exception is caught in the model
                    {
                        GlobalConnection.BulkTransHasErrors = true;
                        throw new Exception();
                    }
                    foreach (var PaymentInvoiceID in PaymentInvoicesPKIDs.Split(','))
                    {
                        checkException = objCPaymentsCustomizedDBCall.CallStringFunction("DELETE FROM PaymentInvoices WHERE ID = " + PaymentInvoiceID);
                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnection.BulkTransHasErrors = true;
                            throw new Exception();
                        }
                        checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "PaymentInvoices", Int64.Parse(PaymentInvoiceID), "D");
                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnection.BulkTransHasErrors = true;
                            throw new Exception();
                        }
                    }
                    if (PaymentDCInvoicesPKIDs != "")
                    {
                        foreach (var PaymentDCInvoiceID in PaymentDCInvoicesPKIDs.Split(','))
                        {
                            checkException = objCPaymentsCustomizedDBCall.CallStringFunction("DELETE FROM PaymentDbtCrdtNotes WHERE ID = " + PaymentDCInvoiceID);
                            if (checkException != null) // an exception is caught in the model
                            {
                                GlobalConnection.BulkTransHasErrors = true;
                                throw new Exception();
                            }
                            checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "PaymentInvoices", Int64.Parse(PaymentDCInvoiceID), "D");
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
                    VoucherIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select VoucherID from VoucherPayments where PaymentID = " + PaymentID);
                    if (VoucherIDs == "") // an exception is caught in the model
                    {
                        GlobalConnection.BulkTransHasErrors = true;
                        throw new Exception();
                    }

                    #endregion

                    #region Delete All InvoicesDetails From A_VoucherDetails
                    foreach (var VoucherID in VoucherIDs.Split(','))
                    {
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

                        //Unpost
                        string VoucherType = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select VoucherType from VoucherPayments where VoucherID = " + VoucherID);

                        if (Convert.ToInt32(VoucherType) == 10) //Cash                 A_CashVouchers_UnPosted_ByID
                            objCPaymentsCustomizedDBCall.A_CashVouchers_UnPosted_ByID("A_CashVouchers_UnPosted_ByID", "," + Convert.ToString(VoucherID) + ",", WebSecurity.CurrentUserId);
                        else //Cheque
                            objCPaymentsCustomizedDBCall.A_ChequeVouchers_UnPosted_ByID("A_ChequeVouchers_UnPosted_ByID", "," + Convert.ToString(VoucherID) + ",", WebSecurity.CurrentUserId);

                    }
                    #endregion

                    #region Delete All VoucherPayment From A_VoucherPayments & Delete All Voucher From A_Voucher
                    string VoucherPaymentIDs = objCCustomizedDBCall.CallStringFunction("select ID from VoucherPayments where PaymentID = " + PaymentID);
                    if (VoucherPaymentIDs == "") // an exception is caught in the model
                    {
                        GlobalConnection.BulkTransHasErrors = true;
                        throw new Exception();
                    }
                    foreach (var VoucherPaymentID in VoucherPaymentIDs.Split(','))
                    {
                        checkException = objCPaymentsCustomizedDBCall.CallStringFunction("DELETE FROM VoucherPayments WHERE ID = " + VoucherPaymentID);
                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnection.BulkTransHasErrors = true;
                            throw new Exception();
                        }
                        checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_VoucherPayments", Int64.Parse(VoucherPaymentID), "D");
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

                    #region Set IsDeleted In A_Payments by 1

                    checkException = objCPaymentsCustomizedDBCall.CallStringFunction("UPDATE Payments SET IsDeleted = 1 WHERE ID = " + PaymentID);
                    if (checkException != null) // an exception is caught in the model
                    {
                        GlobalConnection.BulkTransHasErrors = true;
                        throw new Exception();
                    }
                    checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "Payments", Int64.Parse(PaymentID), "U");
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
    //public bool Insert(Int64 pID, DateTime pVoucherDate, Int32 pSafeID, Int32 pBankID, Int32 pCurrencyID
    //    , decimal pExchangeRate, decimal pAmount, string pNotes, string pPaymentNotes, string pChequeNo, DateTime pChequeDate, Int32 pVoucherType, bool pIsChequeOrDeposit
    //    , Int32 pTaxID, decimal pTaxValue, Int32 pTaxSign, Int32 pTaxID2, decimal pTaxValue2, Int32 pTaxSign2, Int32 pDiscountTaxID, decimal pDiscountTaxValue
    //    , Int32 pDiscountTaxID2, decimal pDiscountTaxValue2, string pChargedPerson, decimal pTotal, decimal pTotalAfterTax, bool pIsAGInvoice
    //    , Int32 pAGInvType_ID, Int32 pInv_No, Int64 pInvoiceID, Int64 pJVID1, Int64 pJVID2, Int64 pJVID3, Int64 pJVID4, Int32 pSalesManID
    //    , Int32 pforwOperationID, bool pIsCustomClearance, Int32 pTransType_ID, bool pIsCash, bool pIsCheque, DateTime pPrintDate, string pOtherSideBankName
    //    , DateTime pCollectionDate, decimal pCollectionExpense
    //    //Details Data
    //    , Int64 pDetailsID, decimal pValue, string pDescription, Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, bool pIsDocumented
    //    , Int32 pDetailsInvoiceID, string pInvoicesIDs, decimal pRefund, Int32 pClientID
    //    //Bank Charges Data 
    //    , string pCollectionExpensesList)
    public class InsertPaymentsParameters
    {
        public Int64 pID { get; set; }
        public DateTime pVoucherDate { get; set; }
        public Int32 pSafeID { get; set; }
        public Int32 pBankID { get; set; }
        public Int32 pCurrencyID { get; set; }
        public decimal pExchangeRate { get; set; }
        public decimal pAmount { get; set; }
        public string pNotes { get; set; }
        public string pPaymentNotes { get; set; }
        public string pChequeNo { get; set; }
        public DateTime pChequeDate { get; set; }
        public Int32 pVoucherType { get; set; }
        public bool pIsChequeOrDeposit { get; set; }
        public Int32 pTaxID { get; set; }
        public decimal pTaxValue { get; set; }
        public Int32 pTaxSign { get; set; }
        public Int32 pTaxID2 { get; set; }
        public decimal pTaxValue2 { get; set; }
        public Int32 pTaxSign2 { get; set; }
        public Int32 pDiscountTaxID { get; set; }
        public decimal pDiscountTaxValue { get; set; }
        public Int32 pDiscountTaxID2 { get; set; }
        public decimal pDiscountTaxValue2 { get; set; }
        public string pChargedPerson { get; set; }
        public decimal pTotal { get; set; }
        public decimal pTotalAfterTax { get; set; }
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
        public decimal pValue { get; set; }
        public string pDescription { get; set; }
        public Int32 pAccountID { get; set; }
        public Int32 pSubAccountID { get; set; }
        public Int32 pCostCenterID { get; set; }
        public bool pIsDocumented { get; set; }
        public Int32 pDetailsInvoiceID { get; set; }
        public string pInvoicesIDs { get; set; }
        public decimal pRefund { get; set; }
        public Int32 pClientID { get; set; }
        public string pCollectionExpensesList { get; set; }

        
    }
}
