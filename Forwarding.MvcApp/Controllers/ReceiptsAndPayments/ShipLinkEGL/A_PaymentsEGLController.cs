using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
//using Forwarding.MvcApp.Models.ReceiptsAndPayments.MasterData.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated;
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
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkEGL.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkEGL.Customized;
using System.Data;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
//using Forwarding.MvcApp.Models.Invoicing;
//using Forwarding.MvcApp.Models.ReceiptsAndPayments.MasterData.Generated;
//using MoreLinq;


namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.ShipLinkMelk
{
    public static class GlobalVariableEGL
    {
        public static long PaymentID = 0; // Unmodifiable

    }
    public static class GlobalsEGL
    {
        public static Int32 CUserId = WebSecurity.CurrentUserId; // Unmodifiable
    }
    [Serializable]
    public class CVarTotalAmountEGL
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
    public class CTotalAmountEGL
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

        public List<CVarTotalAmountEGL> lstCVarTotalAmountEGL = new List<CVarTotalAmountEGL>();
        #endregion
    }
    public class A_PaymentsEGLController : ApiController
    {
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
            //CvwA_Payments objCA_Payments = new CvwA_Payments();
            //objCA_Payments.GetListBanksByName(" order by " + pBankID);
            //return new Object[] { new JavaScriptSerializer().Serialize(objCA_Payments.lstCVarvwA_Payments.ToList()) };
            CBankAccount CBank = new CBankAccount();
            CBank.GetList("where 1 = 1");
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[]
            {
                serializer.Serialize(CBank.lstCVarBankAccount)
            };

        }

        [HttpGet, HttpPost]
        public Object[] LoadAllSafesByName(string pSafeID)
        {
            //CvwA_Payments objCA_Payments = new CvwA_Payments();
            //objCA_Payments.GetListSafesByName(" order by " + pSafeID);
            //return new Object[] { new JavaScriptSerializer().Serialize(objCA_Payments.lstCVarvwA_Payments.ToList()) };

            //CvwSafesForLinkinkUsers objCSL_Payments = new CvwSafesForLinkinkUsers();
            ////objCSL_Payments.GetListSafesByName(" order by " + pSafeID);
            //objCSL_Payments.GetList("where DefaultCurrencyID =" + pSafeID + "  AND UserID=" + WebSecurity.CurrentUserId);

            //return new Object[] { new JavaScriptSerializer().Serialize(objCSL_Payments.lstCVarvwSafesForLinkinkUsers.ToList()) };

            CTreasury objCSafes = new CTreasury();
            objCSafes.GetList("where 1 = 1");
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[]
            {
                serializer.Serialize(objCSafes.lstCVarTreasury)
            };


        }

        [HttpGet, HttpPost]
        public Object[] LoadAllUsersByName(string pOrderBy)
        {
            CvwA_Payments objCA_Payments = new CvwA_Payments();
            objCA_Payments.GetListUsersByName(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objCA_Payments.lstCVarvwA_Payments.ToList()) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllCurrencyByName(string pCurrencyID)
        {
            CvwA_Payments objCA_Payments = new CvwA_Payments();
            objCA_Payments.GetListCurrencyByName(" order by " + pCurrencyID);
            return new Object[] { new JavaScriptSerializer().Serialize(objCA_Payments.lstCVarvwA_Payments.ToList()) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllClientsByName(string pBillNo)

        {
            // string WhereClause = pBillNo + " And IsPaid = 0 And IsAudited = 1";
            string WhereClause = pBillNo;


            CvwA_Payments objCA_Payments = new CvwA_Payments();
            objCA_Payments.GetListClientsByName(WhereClause);

            // objCA_Payments.Distinct


            return new Object[] { new JavaScriptSerializer().Serialize(objCA_Payments.lstCVarvwA_Payments) };
        }
        [HttpGet, HttpPost]
        public Object[] LoadAllClientsByNameWithInvoice(string pBillNo)

        {
            // string WhereClause = pBillNo + " And IsPaid = 0 And IsAudited = 1";
            string WhereClause = pBillNo;


            CvwA_Payments objCA_Payments = new CvwA_Payments();
            objCA_Payments.GetListClientsByNameWithInvoices(WhereClause);

            // objCA_Payments.Distinct


            return new Object[] { new JavaScriptSerializer().Serialize(objCA_Payments.lstCVarvwA_Payments) };
        }
        [HttpGet, HttpPost]
        public Object[] GetAccountIDAndSubAccountID(Int64 pClientID)
        {

            CvwA_Payments objCA_Payments = new CvwA_Payments();
            objCA_Payments.GetListAccountIDAndSubAccountID(pClientID);
            return new Object[] { new JavaScriptSerializer().Serialize(objCA_Payments.lstCVarvwA_Payments) };
            //return new Object[] {
            //    , pID //pVoucherID = pData[1]
            //    , new JavaScriptSerializer().Serialize(objCA_Payments.lstCVarvwA_Payments)
            //    , VCODE //pCode pData[3]
            //};
        }
      
        [HttpGet, HttpPost]
        public Object[] CheckFiscalYear(DateTime pVoucherDate, Int32 pCurrencyID)
        {
            bool _result = true;
            Exception checkException = null;
            string pMessageReturned = "";

            CA_Fiscal_Year objCA_Fiscal_Year = new CA_Fiscal_Year();
            CA_Fiscal_Year_Period objCA_Fiscal_Year_Period = new CA_Fiscal_Year_Period();
            CFreezeSystemTransactions objCFreezeSystemTransactions = new CFreezeSystemTransactions();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

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
            string SafeID = objCCustomizedDBCall.CallStringFunction("A_VoucherGetTopSafeIDByUserIDAndCurrency " + WebSecurity.CurrentUserId + "," + pCurrencyID);
            if (SafeID == "" || SafeID == null)
            {
                pMessageReturned = "Please Link User Safes.";
                _result = false;
            }

            return new object[] {
                _result,pMessageReturned
            };
        }
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CvwA_Payments objCA_Payments = new CvwA_Payments();
            Int32 _RowCount = objCA_Payments.lstCVarvwA_Payments.Count;
            if (pIsLoadArrayOfObjects)
            {
                objCA_Payments.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            }


            return new object[] {
                new JavaScriptSerializer().Serialize(objCA_Payments.lstCVarvwA_Payments)
                , _RowCount

            };
        }
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, String pWhereClause)
        {
            GlobalConnectionEGL.CreateConnectionEGL();

            CvwA_Payments objCA_Payments = new CvwA_Payments();

            Int32 _RowCount = objCA_Payments.lstCVarvwA_Payments.Count;

            objCA_Payments.GetListPaging(pPageSize, pPageNumber, pWhereClause == null ? "" : pWhereClause, "ID DESC", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCA_Payments.lstCVarvwA_Payments), _RowCount };
        }
        [HttpGet, HttpPost]
        //public object[] Insert(Int64 pID, DateTime pVoucherDate, Int32 pSafeID, Int32 pBankID, Int32 pCurrencyID
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
        public object[] Insert([FromBody] InsertPaymentsParametersEGL InsertPaymentsParameters)
        {
            GlobalConnectionEGL.CreateConnectionEGL();
            bool _result = true;
            decimal TotalExtraAmount = 0;
            decimal TotalToCalc = 0;
            string PaymentID = "0";
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            Exception checkException = null;
            string strMessage = "";

            try
            {
                if (!InsertPaymentsParameters.pIsExtra)
                {
                    #region NoExtra
                    CPaymentsCustomizedDBCallEGL objCCustomizedDBCall2 = new CPaymentsCustomizedDBCallEGL();


                    #region Insert PaymentHeader
                    GlobalConnectionEGL.OpenConnection();
                    GlobalConnectionEGL.myTrans = GlobalConnectionEGL.myConnection.BeginTransaction(IsolationLevel.ReadUncommitted);


                    ///////////Insert In A_Payments//////////////
                    CA_PaymentsEGL objCA_Payments = new CA_PaymentsEGL();
                    CVarA_PaymentsEGL ObjCVarA_Payments = new CVarA_PaymentsEGL();


                    String Code = objCCustomizedDBCall2.CallStringFunctionReturn("select  isnull(max(cast(Code as numeric)),0)+1  from A_Payments");
                    String ClientID = objCCustomizedDBCall2.CallStringFunctionReturn("SELECT ERPClientID FROM SL_ShipLinkClients s JOIN Customers AS c ON c.ID=s.ERPClientID where ShippingClientID= " + InsertPaymentsParameters.pClientID);
                    ObjCVarA_Payments.Code = (Code == "0" ? "1" : Code);
                    ObjCVarA_Payments.PaymentDate = InsertPaymentsParameters.pVoucherDate;
                    ObjCVarA_Payments.ClientID = int.Parse(ClientID); //pClientID;
                    ObjCVarA_Payments.Notes = InsertPaymentsParameters.pPaymentNotes == null ? "" : InsertPaymentsParameters.pPaymentNotes;
                    ObjCVarA_Payments.UserID = WebSecurity.CurrentUserId;
                    ObjCVarA_Payments.IsDeleted = false;
                    ObjCVarA_Payments.TotalCost = InsertPaymentsParameters.pTotalCost;
                    ObjCVarA_Payments.PaymentCurrencyID = InsertPaymentsParameters.pPaymentCurrencyID;
                    ObjCVarA_Payments.PaymentAmount = InsertPaymentsParameters.pPaymentAmount;
                    ObjCVarA_Payments.PaymentExchangeRate = InsertPaymentsParameters.pPaymentExchangeRate;
                    ObjCVarA_Payments.BankChargesAmount = InsertPaymentsParameters.pBankChargesAmount;
                    ObjCVarA_Payments.BankChargesCurrency = InsertPaymentsParameters.pBankChargesCurrency;
                    ObjCVarA_Payments.RefundAmount = InsertPaymentsParameters.pRefundAmount;
                    ObjCVarA_Payments.RefundCurrency = InsertPaymentsParameters.pRefundCurrency;
                    ObjCVarA_Payments.isExtra = false;

                    objCA_Payments.lstCVarA_Payments.Add(ObjCVarA_Payments);

                    checkException = objCA_Payments.SaveMethod(objCA_Payments.lstCVarA_Payments);

                    if (checkException != null) // an exception is caught in the model
                    {

                        _result = false;
                        GlobalConnectionEGL.myTrans.Rollback();
                        throw new Exception();

                    }
                    GlobalVariableEGL.PaymentID = ObjCVarA_Payments.ID;
                    #endregion

                    #region Insert In A_PaymentInvoices
                    CA_PaymentInvoicesEGL objCA_PaymentInvoices = new CA_PaymentInvoicesEGL();

                    CVarA_PaymentInvoicesEGL ObjCVarA_PaymentInvoices = new CVarA_PaymentInvoicesEGL();

                    if (InsertPaymentsParameters.pInvoicesIDs != null)
                    {
                        int NumberOfInvoices = InsertPaymentsParameters.pInvoicesIDs.Split(',').Length;
                        var Currentamount = InsertPaymentsParameters.PInvoicesAmounts.Split(',');
                        var Currenremain = InsertPaymentsParameters.PInvoicesRremain.Split(',');


                        for (int i = 0; i < NumberOfInvoices; i++)
                        {

                            decimal total = Convert.ToDecimal(Currenremain[i]) - Convert.ToDecimal(Currentamount[i]);

                            ObjCVarA_PaymentInvoices.InvoiceID = int.Parse(InsertPaymentsParameters.pInvoicesIDs.Split(',')[i]);
                            string LastPaid = objCCustomizedDBCall2.CallStringFunctionReturn("select isnull(PaidAmount,0) from [ShipLinkEGL].[dbo].InvoiceTotal where InvoiceHeaderID = " + ObjCVarA_PaymentInvoices.InvoiceID);

                            decimal TotalPaid = Convert.ToDecimal(LastPaid) + Convert.ToDecimal(Currentamount[i]);
                            #region Set IsPaid In InvoiceHeader by 1
                            objCCustomizedDBCall2.CallStringFunction("UPDATE [ShipLinkEGL].[dbo].InvoiceTotal SET PaidAmount =" + TotalPaid + ", RemainAmount =" + total + "WHERE InvoiceHeaderID = " + ObjCVarA_PaymentInvoices.InvoiceID);

                            // objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "InvoiceHeader", Int64.Parse(ObjCVarA_PaymentInvoices.InvoiceID.ToString()), "U");

                            //get totals after insert if total payment > remain
                            string Paid = objCCustomizedDBCall2.CallStringFunctionReturn("select isnull(PaidAmount,0) from [ShipLinkEGL].[dbo].InvoiceTotal where InvoiceHeaderID = " + ObjCVarA_PaymentInvoices.InvoiceID);
                            string totalInv = objCCustomizedDBCall2.CallStringFunctionReturn("select isnull(Amount,0) from [ShipLinkEGL].[dbo].InvoiceTotal where InvoiceHeaderID = " + ObjCVarA_PaymentInvoices.InvoiceID);

                            if (Convert.ToDecimal(Paid) >= Convert.ToDecimal(totalInv))
                            {
                                if (Math.Round(Convert.ToDecimal(Paid), 1) == Math.Round(Convert.ToDecimal(totalInv), 1))
                                {
                                    checkException = objCCustomizedDBCall2.CallStringFunction("UPDATE [ShipLinkEGL].[dbo].InvoiceHeader SET IsPaid = 1 WHERE id=" + int.Parse(InsertPaymentsParameters.pInvoicesIDs.Split(',')[i]));
                                }
                                else if (Math.Round(Convert.ToDecimal(Paid), 1) > Math.Round(Convert.ToDecimal(totalInv), 1))
                                {

                                    _result = false;
                                    GlobalConnectionEGL.myTrans.Rollback();

                                    throw new Exception();

                                }

                            }

                            #endregion




                            if (GlobalVariableEGL.PaymentID != 0)
                                objCA_PaymentInvoices.lstCVarA_PaymentInvoices.Clear();
                            ObjCVarA_PaymentInvoices.PaymentID = GlobalVariableEGL.PaymentID;
                            ObjCVarA_PaymentInvoices.PaidAmount = Convert.ToDecimal(InsertPaymentsParameters.PInvoicesAmounts.Split(',')[i]);
                            objCA_PaymentInvoices.lstCVarA_PaymentInvoices.Add(ObjCVarA_PaymentInvoices);

                            ObjCVarA_PaymentInvoices.ID = 0;

                            checkException = objCA_PaymentInvoices.SaveMethod(objCA_PaymentInvoices.lstCVarA_PaymentInvoices);

                            if (checkException != null)
                            {

                                _result = false;
                                GlobalConnectionEGL.myTrans.Rollback();

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
                            if (InsertPaymentsParameters.pVoucherTypeCash == 30 && SafeID == "" || SafeID == null)
                            {
                                _result = false;
                                GlobalConnectionEGL.myTrans.Rollback();
                                throw new Exception();
                            }
                            if (InsertPaymentsParameters.pVoucherTypeCash == 10)
                            {
                                pCode = Convert.ToString(GetCode(int.Parse(InsertPaymentsParameters.pSafeIDListCash.Split(',')[i].ToString()), 0, InsertPaymentsParameters.pVoucherDate, InsertPaymentsParameters.pVoucherTypeCash, 1, InsertPaymentsParameters.pPaymentCurrencyID)[0]);
                            }


                            //  string pCode = Convert.ToString(GetCode(pSafeID, pBankID, pVoucherDate, pVoucherType)[0]);

                            CVarA_VoucherHeaderEGL objCVarA_Voucher = new CVarA_VoucherHeaderEGL();
                            CVarA_VoucherHeaderDetailsEGL objCVarA_VoucherDetails = new CVarA_VoucherHeaderDetailsEGL();
                            CA_VoucherHeaderDetailsEGL objCA_VoucherDetails = new CA_VoucherHeaderDetailsEGL();
                            CA_VoucherHeaderEGL objCA_Voucher = new CA_VoucherHeaderEGL();
                            CA_VoucherPaymentsEGL objCA_VoucherPayments = new CA_VoucherPaymentsEGL();
                            CVarA_VoucherPaymentsEGL ObjCVarA_VoucherPayments = new CVarA_VoucherPaymentsEGL();
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
                            objCVarA_Voucher.SafeID = InsertPaymentsParameters.pVoucherTypeCash == 10 ? int.Parse(InsertPaymentsParameters.pSafeIDListCash.Split(',')[i]) : Convert.ToInt32(SafeID);
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
                            objCVarA_Voucher.IsLiner = true;
                            objCVarA_Voucher.TaxType = 1;
                            objCVarA_Voucher.Bill_ID = 0;
                            objCVarA_Voucher.IBAN = "0";
                            objCVarA_Voucher.ReferenceNo = "0";
                            objCVarA_Voucher.DepositeDate = Convert.ToDateTime("1/1/1900");
                            objCVarA_Voucher.TransferDate = Convert.ToDateTime("1/1/1900");
                            objCVarA_Voucher.RemainAmount = Convert.ToDecimal(InsertPaymentsParameters.pTotalAfterTaxListCash.Split(',')[i]);
                            objCVarA_Voucher.PaidAmount = 0;
                            objCVarA_Voucher.isTransfer = false;


                            objCA_Voucher.lstCVarA_Voucher.Add(objCVarA_Voucher);

                            checkException = objCA_Voucher.SaveMethod(objCA_Voucher.lstCVarA_Voucher);
                            VoucherID = objCVarA_Voucher.ID;

                            InsertPaymentsParameters.pID = objCVarA_Voucher.ID;

                            if (checkException != null)
                            {
                                strMessage = checkException.Message;
                                _result = false;
                                GlobalConnectionEGL.myTrans.Rollback();
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
                            objCVarA_VoucherDetails.Job_ID = 0;
                            objCVarA_VoucherDetails.OperationID = 0;
                            objCVarA_VoucherDetails.HouseID = 0;
                            objCVarA_VoucherDetails.BranchID = 0;


                            objCA_VoucherDetails.lstCVarA_VoucherDetails.Add(objCVarA_VoucherDetails);
                            checkException = objCA_VoucherDetails.SaveMethod(objCA_VoucherDetails.lstCVarA_VoucherDetails);

                            if (checkException != null)
                            {
                                strMessage = checkException.Message;
                                _result = false;
                                GlobalConnectionEGL.myTrans.Rollback();
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
                            //        GlobalConnectionEGL.myTrans.Rollback();
                            //        throw new Exception();

                            //    }
                            //}
                            //#endregion

                            #region Insert In A_VoucherPayments 
                            ///////////Insert In A_VoucherPayments//////////////

                            ObjCVarA_VoucherPayments.SafeID = InsertPaymentsParameters.pVoucherTypeCash == 10 ? int.Parse(InsertPaymentsParameters.pSafeIDListCash.Split(',')[i]) : 0;
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
                            ObjCVarA_VoucherPayments.PaymentID = Convert.ToInt32(GlobalVariableEGL.PaymentID);
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
                            ObjCVarA_VoucherPayments.VoucherCode = VCODE;

                            Int32 _RowCount = objCA_VoucherPayments.lstCVarA_VoucherPayments.Count;

                            objCA_VoucherPayments.lstCVarA_VoucherPayments.Add(ObjCVarA_VoucherPayments);

                            checkException = objCA_VoucherPayments.SaveMethod(objCA_VoucherPayments.lstCVarA_VoucherPayments);
                            if (checkException != null)
                            {
                                strMessage = checkException.Message;
                                _result = false;
                                GlobalConnectionEGL.myTrans.Rollback();
                                throw new Exception();

                            }
                            #endregion
                            CPaymentsCustomizedDBCallEGL objCPaymentsCustomizedDBCall = new CPaymentsCustomizedDBCallEGL();
                            //post
                            if (InsertPaymentsParameters.pVoucherTypeCash == 10)
                            {

                                checkException = objCPaymentsCustomizedDBCall.A_CashInVouchers_Posting("A_CashInVouchers_Posting_PaymentLiner", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, GlobalsEGL.CUserId);
                            }
                            else
                            {

                                checkException = objCPaymentsCustomizedDBCall.A_ChequeInVouchers_Posting("A_ChequeInVouchers_Posting_PaymentLiner", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, GlobalsEGL.CUserId);
                            }
                            if (checkException != null)
                            {
                                strMessage = checkException.Message;
                                _result = false;
                                GlobalConnectionEGL.myTrans.Rollback();
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
                                GlobalConnectionEGL.myTrans.Rollback();
                                throw new Exception();
                            }
                            if (InsertPaymentsParameters.pVoucherTypeCheque == 30)
                            {
                                pCode = Convert.ToString(GetCode(Convert.ToInt16(SafeID), int.Parse(InsertPaymentsParameters.pBankIDListCheque.Split(',')[i].ToString()), InsertPaymentsParameters.pVoucherDate, InsertPaymentsParameters.pVoucherTypeCheque, 1, InsertPaymentsParameters.pPaymentCurrencyID)[0]);
                            }


                            //  string pCode = Convert.ToString(GetCode(pSafeID, pBankID, pVoucherDate, pVoucherType)[0]);

                            CVarA_VoucherHeaderEGL objCVarA_Voucher = new CVarA_VoucherHeaderEGL();
                            CVarA_VoucherHeaderDetailsEGL objCVarA_VoucherDetails = new CVarA_VoucherHeaderDetailsEGL();
                            CA_VoucherHeaderDetailsEGL objCA_VoucherDetails = new CA_VoucherHeaderDetailsEGL();
                            CA_VoucherHeaderEGL objCA_Voucher = new CA_VoucherHeaderEGL();
                            CA_VoucherPaymentsEGL objCA_VoucherPayments = new CA_VoucherPaymentsEGL();
                            CVarA_VoucherPaymentsEGL ObjCVarA_VoucherPayments = new CVarA_VoucherPaymentsEGL();
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
                            objCVarA_Voucher.IsLiner = true;
                            objCVarA_Voucher.TaxType = 1;
                            objCVarA_Voucher.Bill_ID = 0;

                            objCVarA_Voucher.OtherSideBankName = InsertPaymentsParameters.pOtherSideBankName;
                            objCVarA_Voucher.IBAN = "0";
                            objCVarA_Voucher.ReferenceNo = "0";
                            objCVarA_Voucher.DepositeDate = Convert.ToDateTime("1/1/1900");
                            objCVarA_Voucher.TransferDate = Convert.ToDateTime("1/1/1900");
                            objCVarA_Voucher.RemainAmount = Convert.ToDecimal(InsertPaymentsParameters.pTotalAfterTaxListCheque.Split(',')[i]);
                            objCVarA_Voucher.PaidAmount = 0;
                            objCVarA_Voucher.isTransfer = false;
                            objCA_Voucher.lstCVarA_Voucher.Add(objCVarA_Voucher);

                            checkException = objCA_Voucher.SaveMethod(objCA_Voucher.lstCVarA_Voucher);
                            VoucherID = objCVarA_Voucher.ID;

                            InsertPaymentsParameters.pID = objCVarA_Voucher.ID;

                            if (checkException != null)
                            {
                                strMessage = checkException.Message;
                                _result = false;
                                GlobalConnectionEGL.myTrans.Rollback();
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
                            objCVarA_VoucherDetails.Job_ID = 0;
                            objCVarA_VoucherDetails.OperationID = 0;
                            objCVarA_VoucherDetails.HouseID = 0;
                            objCVarA_VoucherDetails.BranchID = 0;



                            objCA_VoucherDetails.lstCVarA_VoucherDetails.Add(objCVarA_VoucherDetails);
                            checkException = objCA_VoucherDetails.SaveMethod(objCA_VoucherDetails.lstCVarA_VoucherDetails);

                            if (checkException != null)
                            {
                                strMessage = checkException.Message;
                                _result = false;
                                GlobalConnectionEGL.myTrans.Rollback();
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
                            //        GlobalConnectionEGL.myTrans.Rollback();
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
                            //        GlobalConnectionEGL.myTrans.Rollback();
                            //        throw new Exception();

                            //    }
                            //}
                            //#endregion

                            #region Insert In A_VoucherPayments 
                            ///////////Insert In A_VoucherPayments//////////////

                            ObjCVarA_VoucherPayments.SafeID = InsertPaymentsParameters.pVoucherTypeCheque == 10 ? int.Parse(InsertPaymentsParameters.pSafeIDListCash.Split(',')[i]) : 0;
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
                            ObjCVarA_VoucherPayments.PaymentID = Convert.ToInt32(GlobalVariableEGL.PaymentID);
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
                            ObjCVarA_VoucherPayments.VoucherCode = VCODE;

                            Int32 _RowCount = objCA_VoucherPayments.lstCVarA_VoucherPayments.Count;

                            objCA_VoucherPayments.lstCVarA_VoucherPayments.Add(ObjCVarA_VoucherPayments);

                            checkException = objCA_VoucherPayments.SaveMethod(objCA_VoucherPayments.lstCVarA_VoucherPayments);
                            if (checkException != null)
                            {
                                strMessage = checkException.Message;
                                _result = false;
                                GlobalConnectionEGL.myTrans.Rollback();
                                throw new Exception();

                            }
                            #endregion
                            CPaymentsCustomizedDBCallEGL objCPaymentsCustomizedDBCall = new CPaymentsCustomizedDBCallEGL();
                            //post
                            if (InsertPaymentsParameters.pVoucherTypeCheque == 10)
                            {

                                checkException = objCPaymentsCustomizedDBCall.A_CashInVouchers_Posting("A_CashInVouchers_Posting_PaymentLiner", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, GlobalsEGL.CUserId);
                            }
                            else
                            {

                                checkException = objCPaymentsCustomizedDBCall.A_ChequeInVouchers_Posting("A_ChequeInVouchers_Posting_PaymentLiner", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, GlobalsEGL.CUserId);
                            }
                            if (checkException != null)
                            {
                                strMessage = checkException.Message;
                                _result = false;
                                GlobalConnectionEGL.myTrans.Rollback();
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
                                GlobalConnectionEGL.myTrans.Rollback();
                                throw new Exception();
                            }
                            if (InsertPaymentsParameters.pVoucherTypeDeposite == 30)
                            {
                                pCode = Convert.ToString(GetCode(Convert.ToInt16(SafeID), int.Parse(InsertPaymentsParameters.pBankIDListDeposite.Split(',')[i].ToString()), InsertPaymentsParameters.pVoucherDate, InsertPaymentsParameters.pVoucherTypeDeposite, 1, InsertPaymentsParameters.pPaymentCurrencyID)[0]);
                            }


                            //  string pCode = Convert.ToString(GetCode(pSafeID, pBankID, pVoucherDate, pVoucherType)[0]);

                            CVarA_VoucherHeaderEGL objCVarA_Voucher = new CVarA_VoucherHeaderEGL();
                            CVarA_VoucherHeaderDetailsEGL objCVarA_VoucherDetails = new CVarA_VoucherHeaderDetailsEGL();
                            CA_VoucherHeaderDetailsEGL objCA_VoucherDetails = new CA_VoucherHeaderDetailsEGL();
                            CA_VoucherHeaderEGL objCA_Voucher = new CA_VoucherHeaderEGL();
                            CA_VoucherPaymentsEGL objCA_VoucherPayments = new CA_VoucherPaymentsEGL();
                            CVarA_VoucherPaymentsEGL ObjCVarA_VoucherPayments = new CVarA_VoucherPaymentsEGL();
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
                            objCVarA_Voucher.IsLiner = true;
                            objCVarA_Voucher.TaxType = 1;
                            objCVarA_Voucher.Bill_ID = 0;
                            objCVarA_Voucher.IBAN = "0";
                            objCVarA_Voucher.ReferenceNo = InsertPaymentsParameters.pReferenceNo.Split(',')[i];
                            objCVarA_Voucher.DepositeDate = Convert.ToDateTime(InsertPaymentsParameters.pDepositeDateList.Split(',')[i]);
                            objCVarA_Voucher.TransferDate = Convert.ToDateTime("1/1/1900");
                            objCVarA_Voucher.RemainAmount = Convert.ToDecimal(InsertPaymentsParameters.pTotalAfterTaxListDeposite.Split(',')[i]);
                            objCVarA_Voucher.PaidAmount = 0;
                            objCVarA_Voucher.isTransfer = false;
                            objCA_Voucher.lstCVarA_Voucher.Add(objCVarA_Voucher);

                            checkException = objCA_Voucher.SaveMethod(objCA_Voucher.lstCVarA_Voucher);
                            VoucherID = objCVarA_Voucher.ID;

                            InsertPaymentsParameters.pID = objCVarA_Voucher.ID;

                            if (checkException != null)
                            {
                                strMessage = checkException.Message;
                                _result = false;
                                GlobalConnectionEGL.myTrans.Rollback();
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
                            objCVarA_VoucherDetails.Job_ID = 0;
                            objCVarA_VoucherDetails.OperationID = 0;
                            objCVarA_VoucherDetails.HouseID = 0;
                            objCVarA_VoucherDetails.BranchID = 0;



                            objCA_VoucherDetails.lstCVarA_VoucherDetails.Add(objCVarA_VoucherDetails);
                            checkException = objCA_VoucherDetails.SaveMethod(objCA_VoucherDetails.lstCVarA_VoucherDetails);

                            if (checkException != null)
                            {
                                strMessage = checkException.Message;
                                _result = false;
                                GlobalConnectionEGL.myTrans.Rollback();
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
                            //        GlobalConnectionEGL.myTrans.Rollback();
                            //        throw new Exception();

                            //    }
                            //}
                            //#endregion

                            #region Insert In A_VoucherPayments 
                            ///////////Insert In A_VoucherPayments//////////////

                            ObjCVarA_VoucherPayments.SafeID = InsertPaymentsParameters.pVoucherTypeDeposite == 10 ? int.Parse(InsertPaymentsParameters.pSafeIDListCash.Split(',')[i]) : 0;
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
                            ObjCVarA_VoucherPayments.PaymentID = Convert.ToInt32(GlobalVariableEGL.PaymentID);
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
                            ObjCVarA_VoucherPayments.VoucherCode = VCODE;

                            Int32 _RowCount = objCA_VoucherPayments.lstCVarA_VoucherPayments.Count;

                            objCA_VoucherPayments.lstCVarA_VoucherPayments.Add(ObjCVarA_VoucherPayments);

                            checkException = objCA_VoucherPayments.SaveMethod(objCA_VoucherPayments.lstCVarA_VoucherPayments);
                            if (checkException != null)
                            {
                                strMessage = checkException.Message;
                                _result = false;
                                GlobalConnectionEGL.myTrans.Rollback();
                                throw new Exception();

                            }
                            #endregion
                            CPaymentsCustomizedDBCallEGL objCPaymentsCustomizedDBCall = new CPaymentsCustomizedDBCallEGL();
                            //post
                            if (InsertPaymentsParameters.pVoucherTypeDeposite == 10)
                            {

                                checkException = objCPaymentsCustomizedDBCall.A_CashInVouchers_Posting("A_CashInVouchers_Posting_PaymentLiner", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, GlobalsEGL.CUserId);
                            }
                            else
                            {

                                checkException = objCPaymentsCustomizedDBCall.A_ChequeInVouchers_Posting("A_ChequeInVouchers_Posting_PaymentLiner", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, GlobalsEGL.CUserId);
                            }
                            if (checkException != null)
                            {
                                strMessage = checkException.Message;
                                _result = false;
                                GlobalConnectionEGL.myTrans.Rollback();
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
                                GlobalConnectionEGL.myTrans.Rollback();
                                throw new Exception();
                            }
                            if (InsertPaymentsParameters.pVoucherTypeDeposite == 30)
                            {
                                pCode = Convert.ToString(GetCode(Convert.ToInt16(SafeID), int.Parse(InsertPaymentsParameters.pBankIDListTransfer.Split(',')[i].ToString()), InsertPaymentsParameters.pVoucherDate, InsertPaymentsParameters.pVoucherTypeTransfer, 1, InsertPaymentsParameters.pPaymentCurrencyID)[0]);
                            }


                            //  string pCode = Convert.ToString(GetCode(pSafeID, pBankID, pVoucherDate, pVoucherType)[0]);

                            CVarA_VoucherHeaderEGL objCVarA_Voucher = new CVarA_VoucherHeaderEGL();
                            CVarA_VoucherHeaderDetailsEGL objCVarA_VoucherDetails = new CVarA_VoucherHeaderDetailsEGL();
                            CA_VoucherHeaderDetailsEGL objCA_VoucherDetails = new CA_VoucherHeaderDetailsEGL();
                            CA_VoucherHeaderEGL objCA_Voucher = new CA_VoucherHeaderEGL();
                            CA_VoucherPaymentsEGL objCA_VoucherPayments = new CA_VoucherPaymentsEGL();
                            CVarA_VoucherPaymentsEGL ObjCVarA_VoucherPayments = new CVarA_VoucherPaymentsEGL();
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
                            objCVarA_Voucher.IsLiner = true;
                            objCVarA_Voucher.TaxType = 1;
                            objCVarA_Voucher.Bill_ID = 0;
                            objCVarA_Voucher.IBAN = InsertPaymentsParameters.pSwiftCode.Split(',')[i];
                            objCVarA_Voucher.ReferenceNo = "0";
                            objCVarA_Voucher.DepositeDate = Convert.ToDateTime("1/1/1900");
                            objCVarA_Voucher.TransferDate = Convert.ToDateTime(InsertPaymentsParameters.pTransferDateList.Split(',')[i]);
                            objCVarA_Voucher.RemainAmount = Convert.ToDecimal(InsertPaymentsParameters.pTotalAfterTaxListTransfer.Split(',')[i]);
                            objCVarA_Voucher.PaidAmount = 0;
                            objCVarA_Voucher.isTransfer = true;
                            objCA_Voucher.lstCVarA_Voucher.Add(objCVarA_Voucher);

                            checkException = objCA_Voucher.SaveMethod(objCA_Voucher.lstCVarA_Voucher);
                            VoucherID = objCVarA_Voucher.ID;

                            InsertPaymentsParameters.pID = objCVarA_Voucher.ID;

                            if (checkException != null)
                            {
                                strMessage = checkException.Message;
                                _result = false;
                                GlobalConnectionEGL.myTrans.Rollback();
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
                            objCVarA_VoucherDetails.Job_ID = 0;
                            objCVarA_VoucherDetails.OperationID = 0;
                            objCVarA_VoucherDetails.HouseID = 0;
                            objCVarA_VoucherDetails.BranchID = 0;



                            objCA_VoucherDetails.lstCVarA_VoucherDetails.Add(objCVarA_VoucherDetails);
                            checkException = objCA_VoucherDetails.SaveMethod(objCA_VoucherDetails.lstCVarA_VoucherDetails);

                            if (checkException != null)
                            {
                                strMessage = checkException.Message;
                                _result = false;
                                GlobalConnectionEGL.myTrans.Rollback();
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
                            //        GlobalConnectionEGL.myTrans.Rollback();
                            //        throw new Exception();

                            //    }
                            //}
                            //#endregion

                            #region Insert In A_VoucherPayments 
                            ///////////Insert In A_VoucherPayments//////////////

                            ObjCVarA_VoucherPayments.SafeID = InsertPaymentsParameters.pVoucherTypeTransfer == 10 ? int.Parse(InsertPaymentsParameters.pSafeIDListCash.Split(',')[i]) : 0;
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
                            ObjCVarA_VoucherPayments.PaymentID = Convert.ToInt32(GlobalVariableEGL.PaymentID);
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
                            ObjCVarA_VoucherPayments.VoucherCode = VCODE;

                            Int32 _RowCount = objCA_VoucherPayments.lstCVarA_VoucherPayments.Count;

                            objCA_VoucherPayments.lstCVarA_VoucherPayments.Add(ObjCVarA_VoucherPayments);

                            checkException = objCA_VoucherPayments.SaveMethod(objCA_VoucherPayments.lstCVarA_VoucherPayments);
                            if (checkException != null)
                            {
                                strMessage = checkException.Message;
                                _result = false;
                                GlobalConnectionEGL.myTrans.Rollback();
                                throw new Exception();

                            }
                            #endregion
                            CPaymentsCustomizedDBCallEGL objCPaymentsCustomizedDBCall = new CPaymentsCustomizedDBCallEGL();
                            //post
                            if (InsertPaymentsParameters.pVoucherTypeTransfer == 10)
                            {

                                checkException = objCPaymentsCustomizedDBCall.A_CashInVouchers_Posting("A_CashInVouchers_Posting_PaymentLiner", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, GlobalsEGL.CUserId);
                            }
                            else
                            {

                                checkException = objCPaymentsCustomizedDBCall.A_ChequeInVouchers_Posting("A_ChequeInVouchers_Posting_PaymentLiner", "," + VoucherID.ToString() + ",", InsertPaymentsParameters.pVoucherDate, GlobalsEGL.CUserId);
                            }
                            if (checkException != null)
                            {
                                strMessage = checkException.Message;
                                _result = false;
                                GlobalConnectionEGL.myTrans.Rollback();
                            }
                        }
                    }

                    #endregion cash

                    //if (_result == true)
                    //{
                    //    CPaymentsCustomizedDBCallEGL objCPaymentsCustomizedDBCall = new CPaymentsCustomizedDBCallEGL();
                    //    //checkException = objCPaymentsCustomizedDBCall.A_ChequeInVouchers_PostingLiner("ERP_A_PostingConvertPaymentLiner", GlobalVariableEGL.PaymentID.ToString(), InsertPaymentsParameters.pVoucherDate, GlobalsEGL.CUserId);

                    //    if (checkException != null)
                    //    {
                    //        strMessage = checkException.Message;
                    //        _result = false;
                    //        GlobalConnectionEGL.myTrans.Rollback();
                    //    }
                    //}

                    _result = true;

                    #endregion

                }

                if (_result == true)
                {
                    CPaymentsCustomizedDBCallEGL objCPaymentsCustomizedDBCall = new CPaymentsCustomizedDBCallEGL();
                    checkException = objCPaymentsCustomizedDBCall.A_ChequeInVouchers_PostingLiner("ERP_A_PostingConvertPaymentLinerEGL", GlobalVariableEGL.PaymentID.ToString(), InsertPaymentsParameters.pVoucherDate, GlobalsEGL.CUserId);

                    if (checkException != null)
                    {

                        _result = false;
                        GlobalConnectionEGL.myTrans.Rollback();
                        throw new Exception();
                    }

                    //checkException = objCPaymentsCustomizedDBCall.A_ChequeInVouchers_PostingLiner("A_LinerPaymentsDiffrencecurrency", GlobalVariableEGL.PaymentID.ToString(), InsertPaymentsParameters.pVoucherDate, GlobalsEGL.CUserId);

                    // if (checkException != null)
                    // {

                    //     _result = false;
                    //     GlobalConnectionEGL.myTrans.Rollback();
                    //     throw new Exception();
                    // }
                }
                if (checkException == null)
                {
                    GlobalConnectionEGL.myTrans.Commit();
                    _result = true;
                }


            }
            catch (Exception ex)
            {
                _result = false;
                GlobalConnectionEGL.myTrans.Rollback();
                throw;
            }
            finally
            {

                GlobalConnectionEGL.myConnection.Close();
                GlobalConnectionEGL.myConnection.Dispose();
            }
            return new object[] {
                _result,strMessage,GlobalVariableEGL.PaymentID
            };

            // return _result;
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        [HttpGet, HttpPost]
        public Object[] LoadInvoices(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {

            //pWhereClause = pWhereClause + " And IsPaid = 0 And IsAudited = 1 And InvoiceSerialStr != 0";
            pWhereClause = pWhereClause + " And IsPaid = 0 And IsAudited = 1";


            int returentCount = 0;

            Cvw_InvoiceHeader_ERP_Liner InvoHeader = new Cvw_InvoiceHeader_ERP_Liner();
            InvoHeader.GetListPaging(pPageSize, pPageNumber, pWhereClause, " [ID] ", out returentCount);

            JavaScriptSerializer serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new Object[]
            {
                  serializer.Serialize(InvoHeader.lstCVarvw_InvoiceHeader_ERP_Liner)
                , returentCount
            };

        }


        public Object[] GetCode(Int32 pSafeID, Int32 pBankID, DateTime pDate, Int32 pVoucherType, Int32 pIsLiner, Int32 CurrencyID)
        {
            int constVoucherChequeOut = 40;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CPaymentsCustomizedDBCallEGL objCPaymentsCustomizedDBCall = new CPaymentsCustomizedDBCallEGL();
            string pNewCode = "";
            string pNewChequeCode = "";
            string SafeID = objCCustomizedDBCall.CallStringFunction("A_VoucherGetTopSafeIDByUserIDAndCurrency " + WebSecurity.CurrentUserId + "," + CurrencyID);

            if (pSafeID != 0 &&(pVoucherType !=30))
            {
                pNewCode = objCPaymentsCustomizedDBCall.A_CashVoucher_GetCode_BySafeCode_NEW("A_CashVoucher_GetCode_BySafeCodeLiner", pSafeID, pDate, pVoucherType);

            }



            else if (pBankID != 0) //ChequeVoucher
            {
               
              pNewCode = objCPaymentsCustomizedDBCall.A_ChequeVoucher_GetCodeByBank_NEW("A_ChequeVoucher_GetCodeByBankLiner", pDate, pBankID, Convert.ToInt16(SafeID), pVoucherType);

                
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
            CPaymentsCustomizedDBCallEGL objCPaymentsCustomizedDBCall = new CPaymentsCustomizedDBCallEGL();
            CA_VoucherPaymentsEGL objCA_VoucherPayments = new CA_VoucherPaymentsEGL();
            CVarA_VoucherPaymentsEGL ObjCVarA_VoucherPayments = new CVarA_VoucherPaymentsEGL();


            CA_VoucherPaymentsEGL objCPS_VoucherPayments = new CA_VoucherPaymentsEGL();
            CVarA_VoucherPaymentsEGL ObjCVarPS_VoucherPayments = new CVarA_VoucherPaymentsEGL();

            foreach (var PaymentID in pPaymentIDs.Split(','))
            {
                GlobalConnectionEGL.CreateConnectionEGL();

                GlobalConnectionEGL.OpenConnection();
                GlobalConnectionEGL.myTrans = GlobalConnectionEGL.myConnection.BeginTransaction(IsolationLevel.ReadUncommitted);

                try
                {
                    #region Set IsPaid In InvoiceHeader by 0
                    string InvoiceIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select InvoiceID from A_PaymentInvoices where PaymentID = " + PaymentID);
                    if (InvoiceIDs == "") // an exception is caught in the model
                    {
                        GlobalConnectionEGL.myTrans.Rollback();
                        throw new Exception();
                    }
                    foreach (var InvoiceID in InvoiceIDs.Split(','))
                    {

                        //checkException = objCPaymentsCustomizedDBCall.CallStringFunction("UPDATE InvoiceHeader SET IsPaid = 0 WHERE ID = " + InvoiceID);

                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnectionEGL.myTrans.Rollback();
                            throw new Exception();
                        }
                        checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "InvoiceHeader", Int64.Parse(InvoiceID), "U");
                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnectionEGL.myTrans.Rollback();
                            throw new Exception();
                        }
                    }


                    #endregion
                    #region Delete All Invoices From A_PaymentInvoices
                    string PaymentInvoicesIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select InvoiceID from A_PaymentInvoices where PaymentID = " + PaymentID);
                    string PaymentInvoicesPKIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select ID from A_PaymentInvoices where PaymentID = " + PaymentID);

                    #region Update Paid To After Deleted Payment
                    string PaymentInvoicesPaidAmountsIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select ISNULL(PaidAmount,0) from A_PaymentInvoices where PaymentID = " + PaymentID);


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
                            string LastPaid = objCPaymentsCustomizedDBCall.CallStringFunctionReturn("select isnull(A.PaidAmount,0) from [ShipLinkEGL].[dbo].InvoiceTotal A WHERE InvoiceHeaderID = " + int.Parse(PaymentInvoicesIDs.Split(',')[i]));
                            string TotalPrice = objCPaymentsCustomizedDBCall.CallStringFunctionReturn("select isnull(A.Amount,0) from [ShipLinkEGL].[dbo].InvoiceTotal A WHERE InvoiceHeaderID = " + int.Parse(PaymentInvoicesIDs.Split(',')[i]));
                            decimal TotalPaid = Convert.ToDecimal(LastPaid) - Convert.ToDecimal(Currentamount[i]);
                            decimal Remain = Convert.ToDecimal(TotalPrice) - TotalPaid;
                            objCPaymentsCustomizedDBCall.CallStringFunction("UPDATE [ShipLinkEGL].[dbo].InvoiceTotal SET PaidAmount =" + TotalPaid + ", RemainAmount =" + Remain + "WHERE InvoiceHeaderID = " + int.Parse(PaymentInvoicesIDs.Split(',')[i]));

                            if (Convert.ToDecimal(TotalPaid) >= Convert.ToDecimal(TotalPrice))
                            {
                                objCPaymentsCustomizedDBCall.CallStringFunction("UPDATE [ShipLinkEGL].[dbo].InvoiceHeader SET IsPaid = 1 WHERE id=" + int.Parse(PaymentInvoicesIDs.Split(',')[i]));

                            }
                            else
                            {
                                objCPaymentsCustomizedDBCall.CallStringFunction("UPDATE [ShipLinkEGL].[dbo].InvoiceHeader SET IsPaid = 0 WHERE id=" + int.Parse(PaymentInvoicesIDs.Split(',')[i]));


                            }
                        }

                    }

                    #endregion
                    if (PaymentInvoicesPKIDs == "") // an exception is caught in the model
                    {
                        GlobalConnectionEGL.myTrans.Rollback();
                        throw new Exception();
                    }
                    foreach (var PaymentInvoiceID in PaymentInvoicesPKIDs.Split(','))
                    {
                        checkException = objCPaymentsCustomizedDBCall.CallStringFunction("DELETE FROM A_PaymentInvoices WHERE ID = " + PaymentInvoiceID);
                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnectionEGL.myTrans.Rollback();
                            throw new Exception();
                        }
                        checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_PaymentInvoices", Int64.Parse(PaymentInvoiceID), "D");
                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnectionEGL.myTrans.Rollback();
                            throw new Exception();
                        }
                    }

                    #endregion
                    string VoucherIDs = "";
                    #region Get VoucherIDs
                    VoucherIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select VoucherID from A_VoucherPayments where PaymentID = " + PaymentID);
                    if (VoucherIDs == "") // an exception is caught in the model
                    {
                        GlobalConnectionEGL.myTrans.Rollback();
                        throw new Exception();
                    }

                    #endregion

                    #region Delete All InvoicesDetails From A_VoucherDetails
                    foreach (var VoucherID in VoucherIDs.Split(','))
                    {
                        //Unpost
                        string VoucherType = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select VoucherType from A_VoucherPayments where VoucherID = " + VoucherID);

                        if (Convert.ToInt32(VoucherType) == 20) //Cash
                            objCPaymentsCustomizedDBCall.A_CashVouchers_UnPosted_ByID("A_CashVouchers_UnPosted_ByID", "," + Convert.ToString(VoucherID) + ",", WebSecurity.CurrentUserId);
                        else //Cheque
                            objCPaymentsCustomizedDBCall.A_ChequeVouchers_UnPosted_ByID("A_ChequeVouchers_UnPosted_ByID", "," + Convert.ToString(VoucherID) + ",", WebSecurity.CurrentUserId);

                        checkException = objCPaymentsCustomizedDBCall.CallStringFunction("DELETE FROM A_VoucherDetails WHERE VoucherID = " + VoucherID);
                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnectionEGL.myTrans.Rollback();
                            throw new Exception();
                        }
                        checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_VoucherDetails", Int64.Parse(VoucherID), "D");
                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnectionEGL.myTrans.Rollback();
                            throw new Exception();
                        }


                    }
                    #endregion

                    #region Delete All VoucherPayment From A_VoucherPayments & Delete All Voucher From A_Voucher
                    string VoucherPaymentIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select ID from A_VoucherPayments where PaymentID = " + PaymentID);
                    if (VoucherPaymentIDs == "") // an exception is caught in the model
                    {
                        GlobalConnectionEGL.BulkTransHasErrors = true;
                        throw new Exception();
                    }
                    foreach (var VoucherPaymentID in VoucherPaymentIDs.Split(','))
                    {
                        checkException = objCPaymentsCustomizedDBCall.CallStringFunction("DELETE FROM A_VoucherPayments WHERE ID = " + VoucherPaymentID);
                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnectionEGL.myTrans.Rollback();
                            throw new Exception();
                        }
                        checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_VoucherPayments", Int64.Parse(VoucherPaymentID), "D");
                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnectionEGL.myTrans.Rollback();
                            throw new Exception();
                        }
                    }
                    foreach (var VoucherID in VoucherIDs.Split(','))
                    {
                        checkException = objCPaymentsCustomizedDBCall.CallStringFunction("DELETE FROM A_Voucher WHERE ID = " + VoucherID);
                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnectionEGL.myTrans.Rollback();
                            throw new Exception();
                        }
                        checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_Voucher", Int64.Parse(VoucherID), "D");
                        if (checkException != null) // an exception is caught in the model
                        {
                            GlobalConnectionEGL.myTrans.Rollback();
                            throw new Exception();
                        }
                    }

                    #endregion




                    #region Set IsDeleted In A_Payments by 1
                    string JVID = "";
                    JVID = objCCustomizedDBCall.CallStringFunction("SELECT ap.JVID FROM A_Payments AS ap WHERE ap.ID= " + PaymentID);

                    string JVIDDiff = "";


                    if (JVID != "")
                    {
                        checkException = objCPaymentsCustomizedDBCall.CallStringFunction("delete a_jv WHERE ID = " + JVID);

                    }


                    if (checkException != null) // an exception is caught in the model
                    {
                        GlobalConnectionEGL.myTrans.Rollback();
                        throw new Exception();
                    }
                    checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "a_jv", Int64.Parse(PaymentID), "D");

                    checkException = objCPaymentsCustomizedDBCall.CallStringFunction("delete A_Payments WHERE ID = " + PaymentID);
                    if (checkException != null) // an exception is caught in the model
                    {
                        GlobalConnectionEGL.myTrans.Rollback();
                        throw new Exception();
                    }
                    checkException = objCPaymentsCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_Payments", Int64.Parse(PaymentID), "D");
                    if (checkException != null) // an exception is caught in the model
                    {
                        GlobalConnectionEGL.myTrans.Rollback();
                        throw new Exception();
                    }

                    #endregion

                }
                catch (Exception e)
                {
                    GlobalConnectionEGL.myTrans.Rollback();
                    throw;
                }
                finally
                {
                    GlobalConnectionEGL.myTrans.Commit();
                    GlobalConnectionEGL.myConnection.Close();
                    GlobalConnectionEGL.myConnection.Dispose();
                }

            }

            return true;

        }
    }
    public class InsertPaymentsParametersEGL
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


    }
}
