using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SL.SL_Transactions.Generated
{
    [Serializable]
    public partial class CVarvwSL_InvoicesDetailsForPrintCLient
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal String mInvoiceNo;
        internal DateTime mInvoiceDate;
        internal Int32 mQuotationID;
        internal Int32 mClientID;
        internal String mCustomerName;
        internal String mCustomerAccountName;
        internal Int32 mCustomerSubAccountID;
        internal String mCustomerSubAccountName;
        internal String mCustomerBankAccountNumber;
        internal String mCustomerPhones;
        internal String mCustomerAddress;
        internal Decimal mTotalBeforTax;
        internal Decimal mTotalPrice;
        internal Decimal mDiscount;
        internal Decimal mDiscountPercentage;
        internal String mNotes;
        internal Int32 mDepartmentID;
        internal Int32 mSalesManID;
        internal Int32 mCostCenter_ID;
        internal String mInvCostCenter;
        internal Int32 mPaymentMethodID;
        internal String mPaymentMethodName;
        internal Boolean mIsApproved;
        internal Boolean mISDiscountBeforeTax;
        internal String mInvoiceNoManual;
        internal Int32 mOrderID;
        internal Int32 mJVID;
        internal Int32 mCurrencyID;
        internal Boolean mIsFromTrans;
        internal String mCurrencyCode;
        internal Decimal mExchangeRate;
        internal Decimal mLocalTotalBeforeTax;
        internal Decimal mLocalTotal;
        internal Boolean mIsDeleted;
        internal Decimal mPaidAmount;
        internal Decimal mRemainAmount;
        internal Decimal mTaxesAmount;
        internal Decimal mItemsAmount;
        internal Decimal mServicesAmount;
        internal Decimal mExpensesAmount;
        internal Int32 mTransactionsCount;
        internal Boolean mIsFixedDiscount;
        internal Int32 mTransactionID;
        internal Int32 mBranchID;
        internal String mBranchName;
        internal String mPrinted_ItemName;
        internal Decimal mPrinted_TotalPrice;
        internal Decimal mPrinted_Qty;
        internal String mPrinted_Unit;
        internal String mInvoiceTypeCode;
        internal String mInvoiceTypeName;
        internal String mSalesManName;
        internal String mRegionName;
        internal Decimal mD_TotalTaxAmount;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String InvoiceNo
        {
            get { return mInvoiceNo; }
            set { mInvoiceNo = value; }
        }
        public DateTime InvoiceDate
        {
            get { return mInvoiceDate; }
            set { mInvoiceDate = value; }
        }
        public Int32 QuotationID
        {
            get { return mQuotationID; }
            set { mQuotationID = value; }
        }
        public Int32 ClientID
        {
            get { return mClientID; }
            set { mClientID = value; }
        }
        public String CustomerName
        {
            get { return mCustomerName; }
            set { mCustomerName = value; }
        }
        public String CustomerAccountName
        {
            get { return mCustomerAccountName; }
            set { mCustomerAccountName = value; }
        }
        public Int32 CustomerSubAccountID
        {
            get { return mCustomerSubAccountID; }
            set { mCustomerSubAccountID = value; }
        }
        public String CustomerSubAccountName
        {
            get { return mCustomerSubAccountName; }
            set { mCustomerSubAccountName = value; }
        }
        public String CustomerBankAccountNumber
        {
            get { return mCustomerBankAccountNumber; }
            set { mCustomerBankAccountNumber = value; }
        }
        public String CustomerPhones
        {
            get { return mCustomerPhones; }
            set { mCustomerPhones = value; }
        }
        public String CustomerAddress
        {
            get { return mCustomerAddress; }
            set { mCustomerAddress = value; }
        }
        public Decimal TotalBeforTax
        {
            get { return mTotalBeforTax; }
            set { mTotalBeforTax = value; }
        }
        public Decimal TotalPrice
        {
            get { return mTotalPrice; }
            set { mTotalPrice = value; }
        }
        public Decimal Discount
        {
            get { return mDiscount; }
            set { mDiscount = value; }
        }
        public Decimal DiscountPercentage
        {
            get { return mDiscountPercentage; }
            set { mDiscountPercentage = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mDepartmentID = value; }
        }
        public Int32 SalesManID
        {
            get { return mSalesManID; }
            set { mSalesManID = value; }
        }
        public Int32 CostCenter_ID
        {
            get { return mCostCenter_ID; }
            set { mCostCenter_ID = value; }
        }
        public String InvCostCenter
        {
            get { return mInvCostCenter; }
            set { mInvCostCenter = value; }
        }
        public Int32 PaymentMethodID
        {
            get { return mPaymentMethodID; }
            set { mPaymentMethodID = value; }
        }
        public String PaymentMethodName
        {
            get { return mPaymentMethodName; }
            set { mPaymentMethodName = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsApproved = value; }
        }
        public Boolean ISDiscountBeforeTax
        {
            get { return mISDiscountBeforeTax; }
            set { mISDiscountBeforeTax = value; }
        }
        public String InvoiceNoManual
        {
            get { return mInvoiceNoManual; }
            set { mInvoiceNoManual = value; }
        }
        public Int32 OrderID
        {
            get { return mOrderID; }
            set { mOrderID = value; }
        }
        public Int32 JVID
        {
            get { return mJVID; }
            set { mJVID = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public Boolean IsFromTrans
        {
            get { return mIsFromTrans; }
            set { mIsFromTrans = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mExchangeRate = value; }
        }
        public Decimal LocalTotalBeforeTax
        {
            get { return mLocalTotalBeforeTax; }
            set { mLocalTotalBeforeTax = value; }
        }
        public Decimal LocalTotal
        {
            get { return mLocalTotal; }
            set { mLocalTotal = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public Decimal PaidAmount
        {
            get { return mPaidAmount; }
            set { mPaidAmount = value; }
        }
        public Decimal RemainAmount
        {
            get { return mRemainAmount; }
            set { mRemainAmount = value; }
        }
        public Decimal TaxesAmount
        {
            get { return mTaxesAmount; }
            set { mTaxesAmount = value; }
        }
        public Decimal ItemsAmount
        {
            get { return mItemsAmount; }
            set { mItemsAmount = value; }
        }
        public Decimal ServicesAmount
        {
            get { return mServicesAmount; }
            set { mServicesAmount = value; }
        }
        public Decimal ExpensesAmount
        {
            get { return mExpensesAmount; }
            set { mExpensesAmount = value; }
        }
        public Int32 TransactionsCount
        {
            get { return mTransactionsCount; }
            set { mTransactionsCount = value; }
        }
        public Boolean IsFixedDiscount
        {
            get { return mIsFixedDiscount; }
            set { mIsFixedDiscount = value; }
        }
        public Int32 TransactionID
        {
            get { return mTransactionID; }
            set { mTransactionID = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mBranchID = value; }
        }
        public String BranchName
        {
            get { return mBranchName; }
            set { mBranchName = value; }
        }
        public String Printed_ItemName
        {
            get { return mPrinted_ItemName; }
            set { mPrinted_ItemName = value; }
        }
        public Decimal Printed_TotalPrice
        {
            get { return mPrinted_TotalPrice; }
            set { mPrinted_TotalPrice = value; }
        }
        public Decimal Printed_Qty
        {
            get { return mPrinted_Qty; }
            set { mPrinted_Qty = value; }
        }
        public String Printed_Unit
        {
            get { return mPrinted_Unit; }
            set { mPrinted_Unit = value; }
        }
        public String InvoiceTypeCode
        {
            get { return mInvoiceTypeCode; }
            set { mInvoiceTypeCode = value; }
        }
        public String InvoiceTypeName
        {
            get { return mInvoiceTypeName; }
            set { mInvoiceTypeName = value; }
        }
        public String SalesManName
        {
            get { return mSalesManName; }
            set { mSalesManName = value; }
        }
        public String RegionName
        {
            get { return mRegionName; }
            set { mRegionName = value; }
        }
        public Decimal D_TotalTaxAmount
        {
            get { return mD_TotalTaxAmount; }
            set { mD_TotalTaxAmount = value; }
        }
        #endregion
    }

    public partial class CvwSL_InvoicesDetailsForPrintCLient
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
        private SqlTransaction tr;
        public List<CVarvwSL_InvoicesDetailsForPrintCLient> lstCVarvwSL_InvoicesDetailsForPrintCLient = new List<CVarvwSL_InvoicesDetailsForPrintCLient>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string WhereClause)
        {
            return DataFill(WhereClause, true);
        }
        public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwSL_InvoicesDetailsForPrintCLient.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSL_InvoicesDetailsForPrintCLient";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwSL_InvoicesDetailsForPrintCLient ObjCVarvwSL_InvoicesDetailsForPrintCLient = new CVarvwSL_InvoicesDetailsForPrintCLient();
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCustomerAccountName = Convert.ToString(dr["CustomerAccountName"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCustomerSubAccountID = Convert.ToInt32(dr["CustomerSubAccountID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCustomerSubAccountName = Convert.ToString(dr["CustomerSubAccountName"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCustomerBankAccountNumber = Convert.ToString(dr["CustomerBankAccountNumber"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCustomerPhones = Convert.ToString(dr["CustomerPhones"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCustomerAddress = Convert.ToString(dr["CustomerAddress"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mInvCostCenter = Convert.ToString(dr["InvCostCenter"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mPaymentMethodName = Convert.ToString(dr["PaymentMethodName"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mOrderID = Convert.ToInt32(dr["OrderID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mIsFromTrans = Convert.ToBoolean(dr["IsFromTrans"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mTransactionsCount = Convert.ToInt32(dr["TransactionsCount"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mIsFixedDiscount = Convert.ToBoolean(dr["IsFixedDiscount"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mPrinted_ItemName = Convert.ToString(dr["Printed_ItemName"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mPrinted_TotalPrice = Convert.ToDecimal(dr["Printed_TotalPrice"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mPrinted_Qty = Convert.ToDecimal(dr["Printed_Qty"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mPrinted_Unit = Convert.ToString(dr["Printed_Unit"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mInvoiceTypeCode = Convert.ToString(dr["InvoiceTypeCode"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mSalesManName = Convert.ToString(dr["SalesManName"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mRegionName = Convert.ToString(dr["RegionName"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mD_TotalTaxAmount = Convert.ToDecimal(dr["D_TotalTaxAmount"].ToString());
                        lstCVarvwSL_InvoicesDetailsForPrintCLient.Add(ObjCVarvwSL_InvoicesDetailsForPrintCLient);
                    }
                }
                catch (Exception ex)
                {
                    Exp = ex;
                }
                finally
                {
                    if (dr != null)
                    {
                        dr.Close();
                        dr.Dispose();
                    }
                }
                tr.Commit();
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return Exp;
        }

        private Exception DataFill(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotRecs)
        {
            Exception Exp = null;
            TotRecs = 0;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwSL_InvoicesDetailsForPrintCLient.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingvwSL_InvoicesDetailsForPrintCLient";
                Com.Parameters[0].Value = PageSize;
                Com.Parameters[1].Value = PageNumber;
                Com.Parameters[2].Value = WhereClause;
                Com.Parameters[3].Value = OrderBy;
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwSL_InvoicesDetailsForPrintCLient ObjCVarvwSL_InvoicesDetailsForPrintCLient = new CVarvwSL_InvoicesDetailsForPrintCLient();
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCustomerAccountName = Convert.ToString(dr["CustomerAccountName"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCustomerSubAccountID = Convert.ToInt32(dr["CustomerSubAccountID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCustomerSubAccountName = Convert.ToString(dr["CustomerSubAccountName"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCustomerBankAccountNumber = Convert.ToString(dr["CustomerBankAccountNumber"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCustomerPhones = Convert.ToString(dr["CustomerPhones"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCustomerAddress = Convert.ToString(dr["CustomerAddress"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mInvCostCenter = Convert.ToString(dr["InvCostCenter"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mPaymentMethodName = Convert.ToString(dr["PaymentMethodName"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mOrderID = Convert.ToInt32(dr["OrderID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mIsFromTrans = Convert.ToBoolean(dr["IsFromTrans"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mTransactionsCount = Convert.ToInt32(dr["TransactionsCount"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mIsFixedDiscount = Convert.ToBoolean(dr["IsFixedDiscount"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mPrinted_ItemName = Convert.ToString(dr["Printed_ItemName"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mPrinted_TotalPrice = Convert.ToDecimal(dr["Printed_TotalPrice"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mPrinted_Qty = Convert.ToDecimal(dr["Printed_Qty"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mPrinted_Unit = Convert.ToString(dr["Printed_Unit"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mInvoiceTypeCode = Convert.ToString(dr["InvoiceTypeCode"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mSalesManName = Convert.ToString(dr["SalesManName"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mRegionName = Convert.ToString(dr["RegionName"].ToString());
                        ObjCVarvwSL_InvoicesDetailsForPrintCLient.mD_TotalTaxAmount = Convert.ToDecimal(dr["D_TotalTaxAmount"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSL_InvoicesDetailsForPrintCLient.Add(ObjCVarvwSL_InvoicesDetailsForPrintCLient);
                    }
                }
                catch (Exception ex)
                {
                    Exp = ex;
                }
                finally
                {
                    if (dr != null)
                    {
                        dr.Close();
                        dr.Dispose();
                    }
                }
                tr.Commit();
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return Exp;
        }

        #endregion
    }

}
