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
    public class CPKSL_Invoices
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
    public partial class CVarSL_Invoices : CPKSL_Invoices
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mInvoiceNo;
        internal DateTime mInvoiceDate;
        internal Int32 mQuotationID;
        internal Int32 mClientID;
        internal Decimal mTotalBeforTax;
        internal Decimal mTotalPrice;
        internal Decimal mDiscount;
        internal String mNotes;
        internal Int32 mDepartmentID;
        internal Int32 mSalesManID;
        internal Int32 mCostCenter_ID;
        internal Int32 mPaymentMethodID;
        internal Int32 mOrderID;
        internal Decimal mDiscountPercentage;
        internal Boolean mISDiscountBeforeTax;
        internal Boolean mIsApproved;
        internal String mInvoiceNoManual;
        internal Int32 mJVID;
        internal Int32 mCurrencyID;
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
        internal Boolean mIsFixedDiscount;
        internal Boolean mIsFromTrans;
        internal Int32 mTransactionID;
        internal Int32 mTypeID;
        internal Int32 mRegionsID;
        internal Int32 mBranchID;
        #endregion

        #region "Methods"
        public String InvoiceNo
        {
            get { return mInvoiceNo; }
            set { mIsChanges = true; mInvoiceNo = value; }
        }
        public DateTime InvoiceDate
        {
            get { return mInvoiceDate; }
            set { mIsChanges = true; mInvoiceDate = value; }
        }
        public Int32 QuotationID
        {
            get { return mQuotationID; }
            set { mIsChanges = true; mQuotationID = value; }
        }
        public Int32 ClientID
        {
            get { return mClientID; }
            set { mIsChanges = true; mClientID = value; }
        }
        public Decimal TotalBeforTax
        {
            get { return mTotalBeforTax; }
            set { mIsChanges = true; mTotalBeforTax = value; }
        }
        public Decimal TotalPrice
        {
            get { return mTotalPrice; }
            set { mIsChanges = true; mTotalPrice = value; }
        }
        public Decimal Discount
        {
            get { return mDiscount; }
            set { mIsChanges = true; mDiscount = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mIsChanges = true; mDepartmentID = value; }
        }
        public Int32 SalesManID
        {
            get { return mSalesManID; }
            set { mIsChanges = true; mSalesManID = value; }
        }
        public Int32 CostCenter_ID
        {
            get { return mCostCenter_ID; }
            set { mIsChanges = true; mCostCenter_ID = value; }
        }
        public Int32 PaymentMethodID
        {
            get { return mPaymentMethodID; }
            set { mIsChanges = true; mPaymentMethodID = value; }
        }
        public Int32 OrderID
        {
            get { return mOrderID; }
            set { mIsChanges = true; mOrderID = value; }
        }
        public Decimal DiscountPercentage
        {
            get { return mDiscountPercentage; }
            set { mIsChanges = true; mDiscountPercentage = value; }
        }
        public Boolean ISDiscountBeforeTax
        {
            get { return mISDiscountBeforeTax; }
            set { mIsChanges = true; mISDiscountBeforeTax = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsChanges = true; mIsApproved = value; }
        }
        public String InvoiceNoManual
        {
            get { return mInvoiceNoManual; }
            set { mIsChanges = true; mInvoiceNoManual = value; }
        }
        public Int32 JVID
        {
            get { return mJVID; }
            set { mIsChanges = true; mJVID = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mIsChanges = true; mExchangeRate = value; }
        }
        public Decimal LocalTotalBeforeTax
        {
            get { return mLocalTotalBeforeTax; }
            set { mIsChanges = true; mLocalTotalBeforeTax = value; }
        }
        public Decimal LocalTotal
        {
            get { return mLocalTotal; }
            set { mIsChanges = true; mLocalTotal = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
        }
        public Decimal PaidAmount
        {
            get { return mPaidAmount; }
            set { mIsChanges = true; mPaidAmount = value; }
        }
        public Decimal RemainAmount
        {
            get { return mRemainAmount; }
            set { mIsChanges = true; mRemainAmount = value; }
        }
        public Decimal TaxesAmount
        {
            get { return mTaxesAmount; }
            set { mIsChanges = true; mTaxesAmount = value; }
        }
        public Decimal ItemsAmount
        {
            get { return mItemsAmount; }
            set { mIsChanges = true; mItemsAmount = value; }
        }
        public Decimal ServicesAmount
        {
            get { return mServicesAmount; }
            set { mIsChanges = true; mServicesAmount = value; }
        }
        public Decimal ExpensesAmount
        {
            get { return mExpensesAmount; }
            set { mIsChanges = true; mExpensesAmount = value; }
        }
        public Boolean IsFixedDiscount
        {
            get { return mIsFixedDiscount; }
            set { mIsChanges = true; mIsFixedDiscount = value; }
        }
        public Boolean IsFromTrans
        {
            get { return mIsFromTrans; }
            set { mIsChanges = true; mIsFromTrans = value; }
        }
        public Int32 TransactionID
        {
            get { return mTransactionID; }
            set { mIsChanges = true; mTransactionID = value; }
        }
        public Int32 TypeID
        {
            get { return mTypeID; }
            set { mIsChanges = true; mTypeID = value; }
        }
        public Int32 RegionsID
        {
            get { return mRegionsID; }
            set { mIsChanges = true; mRegionsID = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mIsChanges = true; mBranchID = value; }
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

    public partial class CSL_Invoices
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
        public List<CVarSL_Invoices> lstCVarSL_Invoices = new List<CVarSL_Invoices>();
        public List<CPKSL_Invoices> lstDeletedCPKSL_Invoices = new List<CPKSL_Invoices>();
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
        public Exception GetItem(Int64 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarSL_Invoices.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSL_Invoices";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSL_Invoices";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                    Com.Parameters[0].Value = Convert.ToInt64(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarSL_Invoices ObjCVarSL_Invoices = new CVarSL_Invoices();
                        ObjCVarSL_Invoices.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarSL_Invoices.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarSL_Invoices.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarSL_Invoices.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarSL_Invoices.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarSL_Invoices.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarSL_Invoices.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarSL_Invoices.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarSL_Invoices.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarSL_Invoices.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarSL_Invoices.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarSL_Invoices.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarSL_Invoices.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarSL_Invoices.mOrderID = Convert.ToInt32(dr["OrderID"].ToString());
                        ObjCVarSL_Invoices.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarSL_Invoices.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarSL_Invoices.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarSL_Invoices.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarSL_Invoices.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarSL_Invoices.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarSL_Invoices.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarSL_Invoices.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarSL_Invoices.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarSL_Invoices.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarSL_Invoices.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarSL_Invoices.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarSL_Invoices.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarSL_Invoices.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarSL_Invoices.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarSL_Invoices.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarSL_Invoices.mIsFixedDiscount = Convert.ToBoolean(dr["IsFixedDiscount"].ToString());
                        ObjCVarSL_Invoices.mIsFromTrans = Convert.ToBoolean(dr["IsFromTrans"].ToString());
                        ObjCVarSL_Invoices.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarSL_Invoices.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
                        ObjCVarSL_Invoices.mRegionsID = Convert.ToInt32(dr["RegionsID"].ToString());
                        ObjCVarSL_Invoices.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        lstCVarSL_Invoices.Add(ObjCVarSL_Invoices);
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
            lstCVarSL_Invoices.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSL_Invoices";
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
                        CVarSL_Invoices ObjCVarSL_Invoices = new CVarSL_Invoices();
                        ObjCVarSL_Invoices.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarSL_Invoices.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarSL_Invoices.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarSL_Invoices.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarSL_Invoices.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarSL_Invoices.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarSL_Invoices.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarSL_Invoices.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarSL_Invoices.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarSL_Invoices.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarSL_Invoices.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarSL_Invoices.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarSL_Invoices.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarSL_Invoices.mOrderID = Convert.ToInt32(dr["OrderID"].ToString());
                        ObjCVarSL_Invoices.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarSL_Invoices.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarSL_Invoices.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarSL_Invoices.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarSL_Invoices.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarSL_Invoices.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarSL_Invoices.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarSL_Invoices.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarSL_Invoices.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarSL_Invoices.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarSL_Invoices.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarSL_Invoices.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarSL_Invoices.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarSL_Invoices.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarSL_Invoices.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarSL_Invoices.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarSL_Invoices.mIsFixedDiscount = Convert.ToBoolean(dr["IsFixedDiscount"].ToString());
                        ObjCVarSL_Invoices.mIsFromTrans = Convert.ToBoolean(dr["IsFromTrans"].ToString());
                        ObjCVarSL_Invoices.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarSL_Invoices.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
                        ObjCVarSL_Invoices.mRegionsID = Convert.ToInt32(dr["RegionsID"].ToString());
                        ObjCVarSL_Invoices.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSL_Invoices.Add(ObjCVarSL_Invoices);
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
        #region "Common Methods"
        private void BeginTrans(SqlCommand Com, SqlConnection Con)
        {

            tr = Con.BeginTransaction(IsolationLevel.Serializable);
            Com.CommandType = CommandType.StoredProcedure;
        }

        private void EndTrans(SqlCommand Com, SqlConnection Con)
        {

            Com.Transaction = tr;
            Com.Connection = Con;
            Com.ExecuteNonQuery();
            tr.Commit();
        }

        #endregion
        #region "Set List Method"
        private Exception SetList(string WhereClause, Boolean IsDelete)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListSL_Invoices";
                else
                    Com.CommandText = "[dbo].UpdateListSL_Invoices";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                BeginTrans(Com, Con);
                Com.Parameters[0].Value = WhereClause;
                EndTrans(Com, Con);
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
        #region "Delete Methods"
        public Exception DeleteItem(List<CPKSL_Invoices> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSL_Invoices";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKSL_Invoices ObjCPKSL_Invoices in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKSL_Invoices.ID);
                    EndTrans(Com, Con);
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                Con.Close();
                Con.Dispose();
                DeleteList.Clear();
            }
            return Exp;
        }

        public Exception DeleteList(string WhereClause)
        {

            return SetList(WhereClause, true);
        }

        #endregion
        #region "Save Methods"
        public Exception SaveMethod(List<CVarSL_Invoices> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@InvoiceNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@InvoiceDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@QuotationID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ClientID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TotalBeforTax", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TotalPrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Discount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DepartmentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SalesManID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenter_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PaymentMethodID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OrderID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DiscountPercentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ISDiscountBeforeTax", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@InvoiceNoManual", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@JVID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@LocalTotalBeforeTax", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@LocalTotal", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@PaidAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@RemainAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TaxesAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ItemsAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ServicesAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ExpensesAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@IsFixedDiscount", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsFromTrans", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@TransactionID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@RegionsID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSL_Invoices ObjCVarSL_Invoices in SaveList)
                {
                    if (ObjCVarSL_Invoices.mIsChanges == true)
                    {
                        if (ObjCVarSL_Invoices.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSL_Invoices";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSL_Invoices.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSL_Invoices";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSL_Invoices.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSL_Invoices.ID;
                        }
                        Com.Parameters["@InvoiceNo"].Value = ObjCVarSL_Invoices.InvoiceNo;
                        Com.Parameters["@InvoiceDate"].Value = ObjCVarSL_Invoices.InvoiceDate;
                        Com.Parameters["@QuotationID"].Value = ObjCVarSL_Invoices.QuotationID;
                        Com.Parameters["@ClientID"].Value = ObjCVarSL_Invoices.ClientID;
                        Com.Parameters["@TotalBeforTax"].Value = ObjCVarSL_Invoices.TotalBeforTax;
                        Com.Parameters["@TotalPrice"].Value = ObjCVarSL_Invoices.TotalPrice;
                        Com.Parameters["@Discount"].Value = ObjCVarSL_Invoices.Discount;
                        Com.Parameters["@Notes"].Value = ObjCVarSL_Invoices.Notes;
                        Com.Parameters["@DepartmentID"].Value = ObjCVarSL_Invoices.DepartmentID;
                        Com.Parameters["@SalesManID"].Value = ObjCVarSL_Invoices.SalesManID;
                        Com.Parameters["@CostCenter_ID"].Value = ObjCVarSL_Invoices.CostCenter_ID;
                        Com.Parameters["@PaymentMethodID"].Value = ObjCVarSL_Invoices.PaymentMethodID;
                        Com.Parameters["@OrderID"].Value = ObjCVarSL_Invoices.OrderID;
                        Com.Parameters["@DiscountPercentage"].Value = ObjCVarSL_Invoices.DiscountPercentage;
                        Com.Parameters["@ISDiscountBeforeTax"].Value = ObjCVarSL_Invoices.ISDiscountBeforeTax;
                        Com.Parameters["@IsApproved"].Value = ObjCVarSL_Invoices.IsApproved;
                        Com.Parameters["@InvoiceNoManual"].Value = ObjCVarSL_Invoices.InvoiceNoManual;
                        Com.Parameters["@JVID"].Value = ObjCVarSL_Invoices.JVID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarSL_Invoices.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarSL_Invoices.ExchangeRate;
                        Com.Parameters["@LocalTotalBeforeTax"].Value = ObjCVarSL_Invoices.LocalTotalBeforeTax;
                        Com.Parameters["@LocalTotal"].Value = ObjCVarSL_Invoices.LocalTotal;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarSL_Invoices.IsDeleted;
                        Com.Parameters["@PaidAmount"].Value = ObjCVarSL_Invoices.PaidAmount;
                        Com.Parameters["@RemainAmount"].Value = ObjCVarSL_Invoices.RemainAmount;
                        Com.Parameters["@TaxesAmount"].Value = ObjCVarSL_Invoices.TaxesAmount;
                        Com.Parameters["@ItemsAmount"].Value = ObjCVarSL_Invoices.ItemsAmount;
                        Com.Parameters["@ServicesAmount"].Value = ObjCVarSL_Invoices.ServicesAmount;
                        Com.Parameters["@ExpensesAmount"].Value = ObjCVarSL_Invoices.ExpensesAmount;
                        Com.Parameters["@IsFixedDiscount"].Value = ObjCVarSL_Invoices.IsFixedDiscount;
                        Com.Parameters["@IsFromTrans"].Value = ObjCVarSL_Invoices.IsFromTrans;
                        Com.Parameters["@TransactionID"].Value = ObjCVarSL_Invoices.TransactionID;
                        Com.Parameters["@TypeID"].Value = ObjCVarSL_Invoices.TypeID;
                        Com.Parameters["@RegionsID"].Value = ObjCVarSL_Invoices.RegionsID;
                        Com.Parameters["@BranchID"].Value = ObjCVarSL_Invoices.BranchID;
                        EndTrans(Com, Con);
                        if (ObjCVarSL_Invoices.ID == 0)
                        {
                            ObjCVarSL_Invoices.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSL_Invoices.mIsChanges = false;
                    }
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
                if (tr != null)
                    tr.Rollback();
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return Exp;
        }
        #endregion
        #region "Update Methods"
        public Exception UpdateList(string UpdateClause)
        {

            return SetList(UpdateClause, false);
        }

        #endregion
    }

}
