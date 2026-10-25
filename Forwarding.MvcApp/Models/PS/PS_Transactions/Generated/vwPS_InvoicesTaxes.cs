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
    public partial class CVarvwPS_InvoicesTaxes
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
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
        internal Int64 mOrderID;
        internal Int32 mJVID;
        internal Int32 mCurrencyID;
        internal Decimal mTaxesAmount;
        internal Boolean mIsFixedDiscount;
        internal Boolean mIsFromTrans;
        internal Int32 mTransactionID;
        internal Decimal mItemsAmount;
        internal Decimal mServicesAmount;
        internal Decimal mExpensesAmount;
        internal String mCurrencyCode;
        internal Decimal mExchangeRate;
        internal Decimal mLocalTotalBeforeTax;
        internal Decimal mLocalTotal;
        internal Boolean mIsDeleted;
        internal Decimal mPaidAmount;
        internal Decimal mRemainAmount;
        internal String mSupplierInvoiceNo;
        internal Int32 mInvoiceTaxesID;
        internal Int32 mTaxID;
        internal String mName;
        internal Decimal mTaxValue;
        internal Decimal mTaxAmount;
        internal Boolean mIsPercentage;
        internal Int64 mInvoiceID;
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
        public Int64 OrderID
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
        public Boolean IsFromTrans
        {
            get { return mIsFromTrans; }
            set { mIsFromTrans = value; }
        }
        public Int32 TransactionID
        {
            get { return mTransactionID; }
            set { mTransactionID = value; }
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
        public Int32 InvoiceTaxesID
        {
            get { return mInvoiceTaxesID; }
            set { mInvoiceTaxesID = value; }
        }
        public Int32 TaxID
        {
            get { return mTaxID; }
            set { mTaxID = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public Decimal TaxValue
        {
            get { return mTaxValue; }
            set { mTaxValue = value; }
        }
        public Decimal TaxAmount
        {
            get { return mTaxAmount; }
            set { mTaxAmount = value; }
        }
        public Boolean IsPercentage
        {
            get { return mIsPercentage; }
            set { mIsPercentage = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mInvoiceID = value; }
        }
        #endregion
    }

    public partial class CvwPS_InvoicesTaxes
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
        public List<CVarvwPS_InvoicesTaxes> lstCVarvwPS_InvoicesTaxes = new List<CVarvwPS_InvoicesTaxes>();
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
            lstCVarvwPS_InvoicesTaxes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPS_InvoicesTaxes";
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
                        CVarvwPS_InvoicesTaxes ObjCVarvwPS_InvoicesTaxes = new CVarvwPS_InvoicesTaxes();
                        ObjCVarvwPS_InvoicesTaxes.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mInvCostCenter = Convert.ToString(dr["InvCostCenter"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mPaymentMethodName = Convert.ToString(dr["PaymentMethodName"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mOrderID = Convert.ToInt64(dr["OrderID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mIsFixedDiscount = Convert.ToBoolean(dr["IsFixedDiscount"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mIsFromTrans = Convert.ToBoolean(dr["IsFromTrans"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mSupplierInvoiceNo = Convert.ToString(dr["SupplierInvoiceNo"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mInvoiceTaxesID = Convert.ToInt32(dr["InvoiceTaxesID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mTaxID = Convert.ToInt32(dr["TaxID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mTaxValue = Convert.ToDecimal(dr["TaxValue"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mIsPercentage = Convert.ToBoolean(dr["IsPercentage"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        lstCVarvwPS_InvoicesTaxes.Add(ObjCVarvwPS_InvoicesTaxes);
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
            lstCVarvwPS_InvoicesTaxes.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPS_InvoicesTaxes";
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
                        CVarvwPS_InvoicesTaxes ObjCVarvwPS_InvoicesTaxes = new CVarvwPS_InvoicesTaxes();
                        ObjCVarvwPS_InvoicesTaxes.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mInvCostCenter = Convert.ToString(dr["InvCostCenter"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mPaymentMethodName = Convert.ToString(dr["PaymentMethodName"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mOrderID = Convert.ToInt64(dr["OrderID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mIsFixedDiscount = Convert.ToBoolean(dr["IsFixedDiscount"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mIsFromTrans = Convert.ToBoolean(dr["IsFromTrans"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mSupplierInvoiceNo = Convert.ToString(dr["SupplierInvoiceNo"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mInvoiceTaxesID = Convert.ToInt32(dr["InvoiceTaxesID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mTaxID = Convert.ToInt32(dr["TaxID"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mTaxValue = Convert.ToDecimal(dr["TaxValue"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mIsPercentage = Convert.ToBoolean(dr["IsPercentage"].ToString());
                        ObjCVarvwPS_InvoicesTaxes.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPS_InvoicesTaxes.Add(ObjCVarvwPS_InvoicesTaxes);
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
