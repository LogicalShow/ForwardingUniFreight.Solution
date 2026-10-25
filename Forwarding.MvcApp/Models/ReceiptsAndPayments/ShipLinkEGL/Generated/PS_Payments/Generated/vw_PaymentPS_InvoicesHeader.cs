using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkEGL.Generated.PS_Payments.Generated
{
    [Serializable]
    public class CPKvw_PaymentPS_InvoicesHeader
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
    public partial class CVarvw_PaymentPS_InvoicesHeader : CPKvw_PaymentPS_InvoicesHeader
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mInvoiceNo;
        internal DateTime mInvoiceDate;
        internal Int64 mSupplierID;
        internal String msupplierName;
        internal Decimal mTotalBeforTax;
        internal Decimal mTotalPrice;
        internal Decimal mDiscount;
        internal Decimal mDiscountPercentage;
        internal String mNotes;
        internal Int32 mDepartmentID;
        internal Int32 mCostCenter_ID;
        internal Int32 mPaymentMethodID;
        internal Boolean mIsApproved;
        internal Boolean mISDiscountBeforeTax;
        internal String mInvoiceNoManual;
        internal Int32 mJVID;
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
        internal Decimal mQty;
        internal String mType;

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
        public Int64 SupplierID
        {
            get { return mSupplierID; }
            set { mSupplierID = value; }
        }
        public String supplierName
        {
            get { return msupplierName; }
            set { msupplierName = value; }
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
        public Int32 PaymentMethodID
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
        public Decimal Qty
        {
            get { return mQty; }
            set { mQty = value; }
        }
        public String Type
        {
            get { return mType; }
            set { mType = value; }
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

    public partial class Cvw_PaymentPS_InvoicesHeader
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
        public List<CVarvw_PaymentPS_InvoicesHeader> lstCVarvw_PaymentPS_InvoicesHeader = new List<CVarvw_PaymentPS_InvoicesHeader>();
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
            lstCVarvw_PaymentPS_InvoicesHeader.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvw_PaymentPS_InvoicesHeader";
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
                        CVarvw_PaymentPS_InvoicesHeader ObjCVarvw_PaymentPS_InvoicesHeader = new CVarvw_PaymentPS_InvoicesHeader();
                        ObjCVarvw_PaymentPS_InvoicesHeader.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mSupplierID = Convert.ToInt64(dr["SupplierID"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.msupplierName = Convert.ToString(dr["supplierName"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mCurrency = Convert.ToString(dr["Currency"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        lstCVarvw_PaymentPS_InvoicesHeader.Add(ObjCVarvw_PaymentPS_InvoicesHeader);
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
            lstCVarvw_PaymentPS_InvoicesHeader.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvw_PaymentPS_InvoicesHeaderTemp";
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
                        CVarvw_PaymentPS_InvoicesHeader ObjCVarvw_PaymentPS_InvoicesHeader = new CVarvw_PaymentPS_InvoicesHeader();
                        ObjCVarvw_PaymentPS_InvoicesHeader.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mSupplierID = Convert.ToInt64(dr["SupplierID"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.msupplierName = Convert.ToString(dr["supplierName"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mCurrency = Convert.ToString(dr["Currency"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarvw_PaymentPS_InvoicesHeader.mType = Convert.ToString(dr["Type"].ToString());

                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvw_PaymentPS_InvoicesHeader.Add(ObjCVarvw_PaymentPS_InvoicesHeader);
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
