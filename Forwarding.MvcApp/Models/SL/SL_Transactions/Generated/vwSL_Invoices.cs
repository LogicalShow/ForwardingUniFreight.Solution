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
    public class CPKvwSL_Invoices
    {
        #region "variables"
        private Int64 mID;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarvwSL_Invoices : CPKvwSL_Invoices
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mInvoiceNo;
        internal DateTime mInvoiceDate;
        internal Int32 mQuotationID;
        internal Int32 mClientID;
        internal String mClientName;
        internal String mCustomerAccountName;
        internal Int32 mCustomerSubAccountID;
        internal String mCustomerSubAccountName;
        internal String mCustomerBankAccountNumber;
        internal String mCustomerPhones;
        internal String mCustomerAddress;
        internal Decimal mRemainQuantity;
        internal Decimal mPartnerRemainedQty;
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
        internal Int32 mTypeID;
        internal String mCurrencyCode;
        internal Decimal mExchangeRate;
        internal Decimal mLocalTotalBeforeTax;
        internal Decimal mLocalTotal;
        internal Boolean mIsDeleted;
        internal Decimal mPaidAmount;
        internal Decimal mRemainAmount;
        internal Int32 mTransactionsCount;
        internal Boolean mIsFixedDiscount;
        internal Int32 mTransactionID;
        internal String mMaterialIssueVoucherCode;
        internal Int32 mRegionsID;
        internal Int32 mBranchID;
        internal String mBranchName;
        #endregion

        #region "Methods"
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
        public String ClientName
        {
            get { return mClientName; }
            set { mClientName = value; }
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
        public Decimal RemainQuantity
        {
            get { return mRemainQuantity; }
            set { mRemainQuantity = value; }
        }
        public Decimal PartnerRemainedQty
        {
            get { return mPartnerRemainedQty; }
            set { mPartnerRemainedQty = value; }
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
        public Int32 TypeID
        {
            get { return mTypeID; }
            set { mTypeID = value; }
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
        public String MaterialIssueVoucherCode
        {
            get { return mMaterialIssueVoucherCode; }
            set { mMaterialIssueVoucherCode = value; }
        }
        public Int32 RegionsID
        {
            get { return mRegionsID; }
            set { mRegionsID = value; }
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
        #endregion

        #region Functions
        public Boolean GetIsChange()
        {
            return mIsChanges;
        }
        public void SetIsChange(Boolean IsChange)
        {
            mIsChanges = IsChange;
        }
        #endregion
    }

    public partial class CvwSL_Invoices
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
        public List<CVarvwSL_Invoices> lstCVarvwSL_Invoices = new List<CVarvwSL_Invoices>();
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
            lstCVarvwSL_Invoices.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSL_Invoices";
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
                        CVarvwSL_Invoices ObjCVarvwSL_Invoices = new CVarvwSL_Invoices();
                        ObjCVarvwSL_Invoices.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_Invoices.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwSL_Invoices.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwSL_Invoices.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarvwSL_Invoices.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwSL_Invoices.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwSL_Invoices.mCustomerAccountName = Convert.ToString(dr["CustomerAccountName"].ToString());
                        ObjCVarvwSL_Invoices.mCustomerSubAccountID = Convert.ToInt32(dr["CustomerSubAccountID"].ToString());
                        ObjCVarvwSL_Invoices.mCustomerSubAccountName = Convert.ToString(dr["CustomerSubAccountName"].ToString());
                        ObjCVarvwSL_Invoices.mCustomerBankAccountNumber = Convert.ToString(dr["CustomerBankAccountNumber"].ToString());
                        ObjCVarvwSL_Invoices.mCustomerPhones = Convert.ToString(dr["CustomerPhones"].ToString());
                        ObjCVarvwSL_Invoices.mCustomerAddress = Convert.ToString(dr["CustomerAddress"].ToString());
                        ObjCVarvwSL_Invoices.mRemainQuantity = Convert.ToDecimal(dr["RemainQuantity"].ToString());
                        ObjCVarvwSL_Invoices.mPartnerRemainedQty = Convert.ToDecimal(dr["PartnerRemainedQty"].ToString());
                        ObjCVarvwSL_Invoices.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvwSL_Invoices.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvwSL_Invoices.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwSL_Invoices.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwSL_Invoices.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSL_Invoices.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwSL_Invoices.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarvwSL_Invoices.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwSL_Invoices.mInvCostCenter = Convert.ToString(dr["InvCostCenter"].ToString());
                        ObjCVarvwSL_Invoices.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarvwSL_Invoices.mPaymentMethodName = Convert.ToString(dr["PaymentMethodName"].ToString());
                        ObjCVarvwSL_Invoices.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwSL_Invoices.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvwSL_Invoices.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvwSL_Invoices.mOrderID = Convert.ToInt32(dr["OrderID"].ToString());
                        ObjCVarvwSL_Invoices.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwSL_Invoices.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSL_Invoices.mIsFromTrans = Convert.ToBoolean(dr["IsFromTrans"].ToString());
                        ObjCVarvwSL_Invoices.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
                        ObjCVarvwSL_Invoices.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwSL_Invoices.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwSL_Invoices.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvwSL_Invoices.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvwSL_Invoices.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwSL_Invoices.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwSL_Invoices.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvwSL_Invoices.mTransactionsCount = Convert.ToInt32(dr["TransactionsCount"].ToString());
                        ObjCVarvwSL_Invoices.mIsFixedDiscount = Convert.ToBoolean(dr["IsFixedDiscount"].ToString());
                        ObjCVarvwSL_Invoices.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarvwSL_Invoices.mMaterialIssueVoucherCode = Convert.ToString(dr["MaterialIssueVoucherCode"].ToString());
                        ObjCVarvwSL_Invoices.mRegionsID = Convert.ToInt32(dr["RegionsID"].ToString());
                        ObjCVarvwSL_Invoices.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwSL_Invoices.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        lstCVarvwSL_Invoices.Add(ObjCVarvwSL_Invoices);
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
            lstCVarvwSL_Invoices.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSL_Invoices";
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
                        CVarvwSL_Invoices ObjCVarvwSL_Invoices = new CVarvwSL_Invoices();
                        ObjCVarvwSL_Invoices.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_Invoices.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwSL_Invoices.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwSL_Invoices.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarvwSL_Invoices.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwSL_Invoices.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwSL_Invoices.mCustomerAccountName = Convert.ToString(dr["CustomerAccountName"].ToString());
                        ObjCVarvwSL_Invoices.mCustomerSubAccountID = Convert.ToInt32(dr["CustomerSubAccountID"].ToString());
                        ObjCVarvwSL_Invoices.mCustomerSubAccountName = Convert.ToString(dr["CustomerSubAccountName"].ToString());
                        ObjCVarvwSL_Invoices.mCustomerBankAccountNumber = Convert.ToString(dr["CustomerBankAccountNumber"].ToString());
                        ObjCVarvwSL_Invoices.mCustomerPhones = Convert.ToString(dr["CustomerPhones"].ToString());
                        ObjCVarvwSL_Invoices.mCustomerAddress = Convert.ToString(dr["CustomerAddress"].ToString());
                        ObjCVarvwSL_Invoices.mRemainQuantity = Convert.ToDecimal(dr["RemainQuantity"].ToString());
                        ObjCVarvwSL_Invoices.mPartnerRemainedQty = Convert.ToDecimal(dr["PartnerRemainedQty"].ToString());
                        ObjCVarvwSL_Invoices.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvwSL_Invoices.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvwSL_Invoices.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwSL_Invoices.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwSL_Invoices.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSL_Invoices.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwSL_Invoices.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarvwSL_Invoices.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwSL_Invoices.mInvCostCenter = Convert.ToString(dr["InvCostCenter"].ToString());
                        ObjCVarvwSL_Invoices.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarvwSL_Invoices.mPaymentMethodName = Convert.ToString(dr["PaymentMethodName"].ToString());
                        ObjCVarvwSL_Invoices.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwSL_Invoices.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvwSL_Invoices.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvwSL_Invoices.mOrderID = Convert.ToInt32(dr["OrderID"].ToString());
                        ObjCVarvwSL_Invoices.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwSL_Invoices.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSL_Invoices.mIsFromTrans = Convert.ToBoolean(dr["IsFromTrans"].ToString());
                        ObjCVarvwSL_Invoices.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
                        ObjCVarvwSL_Invoices.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwSL_Invoices.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwSL_Invoices.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvwSL_Invoices.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvwSL_Invoices.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwSL_Invoices.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwSL_Invoices.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvwSL_Invoices.mTransactionsCount = Convert.ToInt32(dr["TransactionsCount"].ToString());
                        ObjCVarvwSL_Invoices.mIsFixedDiscount = Convert.ToBoolean(dr["IsFixedDiscount"].ToString());
                        ObjCVarvwSL_Invoices.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarvwSL_Invoices.mMaterialIssueVoucherCode = Convert.ToString(dr["MaterialIssueVoucherCode"].ToString());
                        ObjCVarvwSL_Invoices.mRegionsID = Convert.ToInt32(dr["RegionsID"].ToString());
                        ObjCVarvwSL_Invoices.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwSL_Invoices.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSL_Invoices.Add(ObjCVarvwSL_Invoices);
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
