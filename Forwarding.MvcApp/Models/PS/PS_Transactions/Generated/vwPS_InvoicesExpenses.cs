using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.PS.PS_Transactions.Generated
{
    [Serializable]
    public class CPKvwPS_InvoicesExpenses
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
    public partial class CVarvwPS_InvoicesExpenses : CPKvwPS_InvoicesExpenses
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mInvoiceNo;
        internal DateTime mInvoiceDate;
        internal Int32 mQuotationID;
        internal Int32 mSupplierID;
        internal String mSupplierName;
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
        internal Decimal mTaxesAmount;
        internal Boolean mIsFixedDiscount;
        internal Decimal mItemsAmount;
        internal Decimal mServicesAmount;
        internal Decimal mExpensesAmount;
        internal Int32 mTransactionID;
        internal String mCurrencyCode;
        internal Decimal mExchangeRate;
        internal Decimal mLocalTotalBeforeTax;
        internal Decimal mLocalTotal;
        internal Boolean mIsDeleted;
        internal Decimal mPaidAmount;
        internal Decimal mRemainAmount;
        internal String mSupplierInvoiceNo;
        internal Boolean mIsFromTrans;
        internal Int32 mInvoiceExpencesID;
        internal Int64 mExpensesID;
        internal String mExpnesesName;
        internal Decimal mInvExpensesAmount;
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
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mSupplierID = value; }
        }
        public String SupplierName
        {
            get { return mSupplierName; }
            set { mSupplierName = value; }
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
        public Decimal TaxesAmount
        {
            get { return mTaxesAmount; }
            set { mTaxesAmount = value; }
        }
        public Boolean IsFixedDiscount
        {
            get { return mIsFixedDiscount; }
            set { mIsFixedDiscount = value; }
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
        public Int32 TransactionID
        {
            get { return mTransactionID; }
            set { mTransactionID = value; }
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
        public String SupplierInvoiceNo
        {
            get { return mSupplierInvoiceNo; }
            set { mSupplierInvoiceNo = value; }
        }
        public Boolean IsFromTrans
        {
            get { return mIsFromTrans; }
            set { mIsFromTrans = value; }
        }
        public Int32 InvoiceExpencesID
        {
            get { return mInvoiceExpencesID; }
            set { mInvoiceExpencesID = value; }
        }
        public Int64 ExpensesID
        {
            get { return mExpensesID; }
            set { mExpensesID = value; }
        }
        public String ExpnesesName
        {
            get { return mExpnesesName; }
            set { mExpnesesName = value; }
        }
        public Decimal InvExpensesAmount
        {
            get { return mInvExpensesAmount; }
            set { mInvExpensesAmount = value; }
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

    public partial class CvwPS_InvoicesExpenses
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
        public List<CVarvwPS_InvoicesExpenses> lstCVarvwPS_InvoicesExpenses = new List<CVarvwPS_InvoicesExpenses>();
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
            lstCVarvwPS_InvoicesExpenses.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPS_InvoicesExpenses";
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
                        CVarvwPS_InvoicesExpenses ObjCVarvwPS_InvoicesExpenses = new CVarvwPS_InvoicesExpenses();
                        ObjCVarvwPS_InvoicesExpenses.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mInvCostCenter = Convert.ToString(dr["InvCostCenter"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mPaymentMethodName = Convert.ToString(dr["PaymentMethodName"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mOrderID = Convert.ToInt32(dr["OrderID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mIsFixedDiscount = Convert.ToBoolean(dr["IsFixedDiscount"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mSupplierInvoiceNo = Convert.ToString(dr["SupplierInvoiceNo"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mIsFromTrans = Convert.ToBoolean(dr["IsFromTrans"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mInvoiceExpencesID = Convert.ToInt32(dr["InvoiceExpencesID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mExpensesID = Convert.ToInt64(dr["ExpensesID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mExpnesesName = Convert.ToString(dr["ExpnesesName"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mInvExpensesAmount = Convert.ToDecimal(dr["InvExpensesAmount"].ToString());
                        lstCVarvwPS_InvoicesExpenses.Add(ObjCVarvwPS_InvoicesExpenses);
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
            lstCVarvwPS_InvoicesExpenses.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPS_InvoicesExpenses";
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
                        CVarvwPS_InvoicesExpenses ObjCVarvwPS_InvoicesExpenses = new CVarvwPS_InvoicesExpenses();
                        ObjCVarvwPS_InvoicesExpenses.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mInvCostCenter = Convert.ToString(dr["InvCostCenter"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mPaymentMethodName = Convert.ToString(dr["PaymentMethodName"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mOrderID = Convert.ToInt32(dr["OrderID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mIsFixedDiscount = Convert.ToBoolean(dr["IsFixedDiscount"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mSupplierInvoiceNo = Convert.ToString(dr["SupplierInvoiceNo"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mIsFromTrans = Convert.ToBoolean(dr["IsFromTrans"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mInvoiceExpencesID = Convert.ToInt32(dr["InvoiceExpencesID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mExpensesID = Convert.ToInt64(dr["ExpensesID"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mExpnesesName = Convert.ToString(dr["ExpnesesName"].ToString());
                        ObjCVarvwPS_InvoicesExpenses.mInvExpensesAmount = Convert.ToDecimal(dr["InvExpensesAmount"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPS_InvoicesExpenses.Add(ObjCVarvwPS_InvoicesExpenses);
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
