using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Controllers.SL.API_SL_Transactions
{
    [Serializable]
    public partial class CVarvw_PaymentSL_InvoicesHeader
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal String mInvoiceNo;
        internal DateTime mInvoiceDate;
        internal Int64 mClientID;
        internal String mClientName;
        internal Decimal mTotalBeforTax;
        internal Decimal mTotalPrice;
        internal Decimal mDiscount;
        internal Decimal mDiscountPercentage;
        internal String mNotes;
        internal Int32 mDepartmentID;
        internal Int32 mCostCenter_ID;
        internal Byte mPaymentMethodID;
        internal Boolean mIsApproved;
        internal Boolean mISDiscountBeforeTax;
        internal String mInvoiceNoManual;
        internal Int64 mJVID;
        internal Int32 mCurrencyID;
        internal String mCurrency;
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
        internal String mSerial2;
        internal String mReference;
        internal String mReference2;
        internal Int32 mJobID;
        internal Int32 mInvoiceTypeID;
        internal String mFromMr;
        internal Int32 mBankID;
        internal Decimal mQty;
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
        public Int64 ClientID
        {
            get { return mClientID; }
            set { mClientID = value; }
        }
        public String ClientName
        {
            get { return mClientName; }
            set { mClientName = value; }
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
        public Int32 CostCenter_ID
        {
            get { return mCostCenter_ID; }
            set { mCostCenter_ID = value; }
        }
        public Byte PaymentMethodID
        {
            get { return mPaymentMethodID; }
            set { mPaymentMethodID = value; }
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
        public Int64 JVID
        {
            get { return mJVID; }
            set { mJVID = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public String Currency
        {
            get { return mCurrency; }
            set { mCurrency = value; }
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
        public String Serial2
        {
            get { return mSerial2; }
            set { mSerial2 = value; }
        }
        public String Reference
        {
            get { return mReference; }
            set { mReference = value; }
        }
        public String Reference2
        {
            get { return mReference2; }
            set { mReference2 = value; }
        }
        public Int32 JobID
        {
            get { return mJobID; }
            set { mJobID = value; }
        }
        public Int32 InvoiceTypeID
        {
            get { return mInvoiceTypeID; }
            set { mInvoiceTypeID = value; }
        }
        public String FromMr
        {
            get { return mFromMr; }
            set { mFromMr = value; }
        }
        public Int32 BankID
        {
            get { return mBankID; }
            set { mBankID = value; }
        }
        public Decimal Qty
        {
            get { return mQty; }
            set { mQty = value; }
        }
        #endregion
    }

    public partial class Cvw_PaymentSL_InvoicesHeader
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
        public List<CVarvw_PaymentSL_InvoicesHeader> lstCVarvw_PaymentSL_InvoicesHeader = new List<CVarvw_PaymentSL_InvoicesHeader>();
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
            lstCVarvw_PaymentSL_InvoicesHeader.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvw_PaymentSL_InvoicesHeader";
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
                        CVarvw_PaymentSL_InvoicesHeader ObjCVarvw_PaymentSL_InvoicesHeader = new CVarvw_PaymentSL_InvoicesHeader();
                        ObjCVarvw_PaymentSL_InvoicesHeader.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mClientID = Convert.ToInt64(dr["ClientID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mPaymentMethodID = Convert.ToByte(dr["PaymentMethodID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mCurrency = Convert.ToString(dr["Currency"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mSerial2 = Convert.ToString(dr["Serial2"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mReference = Convert.ToString(dr["Reference"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mReference2 = Convert.ToString(dr["Reference2"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mJobID = Convert.ToInt32(dr["JobID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mFromMr = Convert.ToString(dr["FromMr"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mBankID = Convert.ToInt32(dr["BankID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mQty = Convert.ToInt32(dr["Qty"].ToString());
                        lstCVarvw_PaymentSL_InvoicesHeader.Add(ObjCVarvw_PaymentSL_InvoicesHeader);
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
            lstCVarvw_PaymentSL_InvoicesHeader.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvw_PaymentSL_InvoicesHeader";
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
                        CVarvw_PaymentSL_InvoicesHeader ObjCVarvw_PaymentSL_InvoicesHeader = new CVarvw_PaymentSL_InvoicesHeader();
                        ObjCVarvw_PaymentSL_InvoicesHeader.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mClientID = Convert.ToInt64(dr["ClientID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mPaymentMethodID = Convert.ToByte(dr["PaymentMethodID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mCurrency = Convert.ToString(dr["Currency"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        //ObjCVarvw_PaymentSL_InvoicesHeader.mJobID = Convert.ToInt32(dr["JobID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesHeader.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvw_PaymentSL_InvoicesHeader.Add(ObjCVarvw_PaymentSL_InvoicesHeader);
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