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
    public class CPKvwSL_InvoicesTaxes
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
    public partial class CVarvwSL_InvoicesTaxes : CPKvwSL_InvoicesTaxes
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mInvoiceNo;
        internal DateTime mInvoiceDate;
        internal Int32 mQuotationID;
        internal Int32 mClientID;
        internal String mCustomerName;
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
        internal Boolean mIsFromTrans;
        internal String mCurrencyCode;
        internal Decimal mExchangeRate;
        internal Decimal mLocalTotalBeforeTax;
        internal Decimal mLocalTotal;
        internal Boolean mIsDeleted;
        internal Decimal mPaidAmount;
        internal Decimal mRemainAmount;
        internal Int32 mInvoiceTaxesID;
        internal Int32 mTaxID;
        internal String mName;
        internal Decimal mTaxValue;
        internal Decimal mTaxAmount;
        internal Boolean mIsPercentage;
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
        public String CustomerName
        {
            get { return mCustomerName; }
            set { mCustomerName = value; }
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

    public partial class CvwSL_InvoicesTaxes
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
        public List<CVarvwSL_InvoicesTaxes> lstCVarvwSL_InvoicesTaxes = new List<CVarvwSL_InvoicesTaxes>();
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
            lstCVarvwSL_InvoicesTaxes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSL_InvoicesTaxes";
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
                        CVarvwSL_InvoicesTaxes ObjCVarvwSL_InvoicesTaxes = new CVarvwSL_InvoicesTaxes();
                        ObjCVarvwSL_InvoicesTaxes.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mInvCostCenter = Convert.ToString(dr["InvCostCenter"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mPaymentMethodName = Convert.ToString(dr["PaymentMethodName"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mOrderID = Convert.ToInt32(dr["OrderID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mIsFixedDiscount = Convert.ToBoolean(dr["IsFixedDiscount"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mIsFromTrans = Convert.ToBoolean(dr["IsFromTrans"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mInvoiceTaxesID = Convert.ToInt32(dr["InvoiceTaxesID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mTaxID = Convert.ToInt32(dr["TaxID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mTaxValue = Convert.ToDecimal(dr["TaxValue"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mIsPercentage = Convert.ToBoolean(dr["IsPercentage"].ToString());
                        lstCVarvwSL_InvoicesTaxes.Add(ObjCVarvwSL_InvoicesTaxes);
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
            lstCVarvwSL_InvoicesTaxes.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSL_InvoicesTaxes";
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
                        CVarvwSL_InvoicesTaxes ObjCVarvwSL_InvoicesTaxes = new CVarvwSL_InvoicesTaxes();
                        ObjCVarvwSL_InvoicesTaxes.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mInvCostCenter = Convert.ToString(dr["InvCostCenter"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mPaymentMethodName = Convert.ToString(dr["PaymentMethodName"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mOrderID = Convert.ToInt32(dr["OrderID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mIsFixedDiscount = Convert.ToBoolean(dr["IsFixedDiscount"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mIsFromTrans = Convert.ToBoolean(dr["IsFromTrans"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mInvoiceTaxesID = Convert.ToInt32(dr["InvoiceTaxesID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mTaxID = Convert.ToInt32(dr["TaxID"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mTaxValue = Convert.ToDecimal(dr["TaxValue"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarvwSL_InvoicesTaxes.mIsPercentage = Convert.ToBoolean(dr["IsPercentage"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSL_InvoicesTaxes.Add(ObjCVarvwSL_InvoicesTaxes);
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
