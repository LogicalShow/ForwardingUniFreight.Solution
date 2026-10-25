using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.FA.Generated
{
    [Serializable]
    public partial class CVarvwPS_InvoicesAssets
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal String mInvoiceNo;
        internal DateTime mInvoiceDate;
        internal Int32 mQuotationID;
        internal Int32 mSupplierID;
        internal Int32 mPaymentTermID;
        internal Int64 mSupplyOrderID;
        internal Int64 mOrderID;
        internal String mPaymentTermName;
        internal String mPaymentTermCode;
        internal String mPurchasingOrderInfo;
        internal String mPurchasingSupplyInfo;
        internal DateTime mPurchasingOrderDate;
        internal DateTime mPurchasingSupplyDate;
        internal Boolean mIsFixedDiscount;
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
        internal Int32 mJVID;
        internal Int32 mCurrencyID;
        internal Int32 mTransactionID;
        internal Int32 mEntitlementDays;
        internal Int32 mBranchID;
        internal String mBranchName;
        internal String mCurrencyCode;
        internal Decimal mExchangeRate;
        internal Decimal mLocalTotalBeforeTax;
        internal Decimal mLocalTotal;
        internal Boolean mIsDeleted;
        internal Decimal mPaidAmount;
        internal Decimal mRemainAmount;
        internal String mSupplierInvoiceNo;
        internal Boolean mIsFromTrans;
        internal Int32 mDepItemCount;
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
        public Int32 PaymentTermID
        {
            get { return mPaymentTermID; }
            set { mPaymentTermID = value; }
        }
        public Int64 SupplyOrderID
        {
            get { return mSupplyOrderID; }
            set { mSupplyOrderID = value; }
        }
        public Int64 OrderID
        {
            get { return mOrderID; }
            set { mOrderID = value; }
        }
        public String PaymentTermName
        {
            get { return mPaymentTermName; }
            set { mPaymentTermName = value; }
        }
        public String PaymentTermCode
        {
            get { return mPaymentTermCode; }
            set { mPaymentTermCode = value; }
        }
        public String PurchasingOrderInfo
        {
            get { return mPurchasingOrderInfo; }
            set { mPurchasingOrderInfo = value; }
        }
        public String PurchasingSupplyInfo
        {
            get { return mPurchasingSupplyInfo; }
            set { mPurchasingSupplyInfo = value; }
        }
        public DateTime PurchasingOrderDate
        {
            get { return mPurchasingOrderDate; }
            set { mPurchasingOrderDate = value; }
        }
        public DateTime PurchasingSupplyDate
        {
            get { return mPurchasingSupplyDate; }
            set { mPurchasingSupplyDate = value; }
        }
        public Boolean IsFixedDiscount
        {
            get { return mIsFixedDiscount; }
            set { mIsFixedDiscount = value; }
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
        public Int32 TransactionID
        {
            get { return mTransactionID; }
            set { mTransactionID = value; }
        }
        public Int32 EntitlementDays
        {
            get { return mEntitlementDays; }
            set { mEntitlementDays = value; }
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
        public Int32 DepItemCount
        {
            get { return mDepItemCount; }
            set { mDepItemCount = value; }
        }
        #endregion
    }

    public partial class CvwPS_InvoicesAssets
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
        public List<CVarvwPS_InvoicesAssets> lstCVarvwPS_InvoicesAssets = new List<CVarvwPS_InvoicesAssets>();
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
            lstCVarvwPS_InvoicesAssets.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPS_InvoicesAssets";
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
                        CVarvwPS_InvoicesAssets ObjCVarvwPS_InvoicesAssets = new CVarvwPS_InvoicesAssets();
                        ObjCVarvwPS_InvoicesAssets.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mSupplyOrderID = Convert.ToInt64(dr["SupplyOrderID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mOrderID = Convert.ToInt64(dr["OrderID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPaymentTermCode = Convert.ToString(dr["PaymentTermCode"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPurchasingOrderInfo = Convert.ToString(dr["PurchasingOrderInfo"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPurchasingSupplyInfo = Convert.ToString(dr["PurchasingSupplyInfo"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPurchasingOrderDate = Convert.ToDateTime(dr["PurchasingOrderDate"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPurchasingSupplyDate = Convert.ToDateTime(dr["PurchasingSupplyDate"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mIsFixedDiscount = Convert.ToBoolean(dr["IsFixedDiscount"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mInvCostCenter = Convert.ToString(dr["InvCostCenter"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPaymentMethodName = Convert.ToString(dr["PaymentMethodName"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mEntitlementDays = Convert.ToInt32(dr["EntitlementDays"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mSupplierInvoiceNo = Convert.ToString(dr["SupplierInvoiceNo"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mIsFromTrans = Convert.ToBoolean(dr["IsFromTrans"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mDepItemCount = Convert.ToInt32(dr["DepItemCount"].ToString());
                        lstCVarvwPS_InvoicesAssets.Add(ObjCVarvwPS_InvoicesAssets);
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
            lstCVarvwPS_InvoicesAssets.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPS_InvoicesAssets";
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
                        CVarvwPS_InvoicesAssets ObjCVarvwPS_InvoicesAssets = new CVarvwPS_InvoicesAssets();
                        ObjCVarvwPS_InvoicesAssets.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mSupplyOrderID = Convert.ToInt64(dr["SupplyOrderID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mOrderID = Convert.ToInt64(dr["OrderID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPaymentTermCode = Convert.ToString(dr["PaymentTermCode"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPurchasingOrderInfo = Convert.ToString(dr["PurchasingOrderInfo"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPurchasingSupplyInfo = Convert.ToString(dr["PurchasingSupplyInfo"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPurchasingOrderDate = Convert.ToDateTime(dr["PurchasingOrderDate"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPurchasingSupplyDate = Convert.ToDateTime(dr["PurchasingSupplyDate"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mIsFixedDiscount = Convert.ToBoolean(dr["IsFixedDiscount"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mInvCostCenter = Convert.ToString(dr["InvCostCenter"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPaymentMethodName = Convert.ToString(dr["PaymentMethodName"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mEntitlementDays = Convert.ToInt32(dr["EntitlementDays"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mSupplierInvoiceNo = Convert.ToString(dr["SupplierInvoiceNo"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mIsFromTrans = Convert.ToBoolean(dr["IsFromTrans"].ToString());
                        ObjCVarvwPS_InvoicesAssets.mDepItemCount = Convert.ToInt32(dr["DepItemCount"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPS_InvoicesAssets.Add(ObjCVarvwPS_InvoicesAssets);
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
