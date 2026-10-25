using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Shipping.MvcApp.Models.Purchasing.PS_Transactions.Generated
{
    [Serializable]
    public class CPKPS_InvoicesTemp
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
    public partial class CVarPS_InvoicesTemp : CPKPS_InvoicesTemp
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mInvoiceNo;
        internal DateTime mInvoiceDate;
        internal Int32 mQuotationID;
        internal Int32 mSupplierID;
        internal Decimal mTotalBeforTax;
        internal Decimal mTotalPrice;
        internal Decimal mDiscount;
        internal Decimal mDiscountPercentage;
        internal String mNotes;
        internal Int32 mDepartmentID;
        internal Int32 mSalesManID;
        internal Int32 mCostCenter_ID;
        internal Int32 mPaymentMethodID;
        internal Boolean mIsApproved;
        internal Boolean mISDiscountBeforeTax;
        internal String mInvoiceNoManual;
        internal Int32 mOrderID;
        internal Int64 mJVID;
        internal Int32 mCurrencyID;
        internal Decimal mExchangeRate;
        internal Decimal mLocalTotalBeforeTax;
        internal Decimal mLocalTotal;
        internal Boolean mIsDeleted;
        internal Decimal mPaidAmount;
        internal Decimal mRemainAmount;
        internal String mSupplierInvoiceNo;
        internal Decimal mTaxesAmount;
        internal Decimal mItemsAmount;
        internal Decimal mServicesAmount;
        internal Decimal mExpensesAmount;
        internal Boolean mIsCalc;
        internal Boolean mDiscountType;
        internal Int32 mTaxType;
        internal DateTime mDueDate;
        internal Int32 mDisbursementJob_ID;
        internal Decimal mVatAmount;
        internal Boolean misVatRatio;
        internal Int64 mSerial;
        internal Decimal mDiscountAmount;
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
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mIsChanges = true; mSupplierID = value; }
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
        public Decimal DiscountPercentage
        {
            get { return mDiscountPercentage; }
            set { mIsChanges = true; mDiscountPercentage = value; }
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
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsChanges = true; mIsApproved = value; }
        }
        public Boolean ISDiscountBeforeTax
        {
            get { return mISDiscountBeforeTax; }
            set { mIsChanges = true; mISDiscountBeforeTax = value; }
        }
        public String InvoiceNoManual
        {
            get { return mInvoiceNoManual; }
            set { mIsChanges = true; mInvoiceNoManual = value; }
        }
        public Int32 OrderID
        {
            get { return mOrderID; }
            set { mIsChanges = true; mOrderID = value; }
        }
        public Int64 JVID
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
        public String SupplierInvoiceNo
        {
            get { return mSupplierInvoiceNo; }
            set { mIsChanges = true; mSupplierInvoiceNo = value; }
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
        public Boolean IsCalc
        {
            get { return mIsCalc; }
            set { mIsChanges = true; mIsCalc = value; }
        }
        public Boolean DiscountType
        {
            get { return mDiscountType; }
            set { mIsChanges = true; mDiscountType = value; }
        }
        public Int32 TaxType
        {
            get { return mTaxType; }
            set { mIsChanges = true; mTaxType = value; }
        }
        public DateTime DueDate
        {
            get { return mDueDate; }
            set { mIsChanges = true; mDueDate = value; }
        }
        public Int32 DisbursementJob_ID
        {
            get { return mDisbursementJob_ID; }
            set { mIsChanges = true; mDisbursementJob_ID = value; }
        }
        public Decimal VatAmount
        {
            get { return mVatAmount; }
            set { mIsChanges = true; mVatAmount = value; }
        }
        public Boolean isVatRatio
        {
            get { return misVatRatio; }
            set { mIsChanges = true; misVatRatio = value; }
        }
        public Int64 Serial
        {
            get { return mSerial; }
            set { mIsChanges = true; mSerial = value; }
        }
        public Decimal DiscountAmount
        {
            get { return mDiscountAmount; }
            set { mIsChanges = true; mDiscountAmount = value; }
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

    public partial class CPS_InvoicesTemp
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
        public List<CVarPS_InvoicesTemp> lstCVarPS_InvoicesTemp = new List<CVarPS_InvoicesTemp>();
        public List<CPKPS_InvoicesTemp> lstDeletedCPKPS_InvoicesTemp = new List<CPKPS_InvoicesTemp>();
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
            lstCVarPS_InvoicesTemp.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPS_InvoicesTemp";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPS_InvoicesTemp";
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
                        CVarPS_InvoicesTemp ObjCVarPS_InvoicesTemp = new CVarPS_InvoicesTemp();
                        ObjCVarPS_InvoicesTemp.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPS_InvoicesTemp.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarPS_InvoicesTemp.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarPS_InvoicesTemp.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarPS_InvoicesTemp.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarPS_InvoicesTemp.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarPS_InvoicesTemp.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarPS_InvoicesTemp.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarPS_InvoicesTemp.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarPS_InvoicesTemp.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_InvoicesTemp.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarPS_InvoicesTemp.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarPS_InvoicesTemp.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarPS_InvoicesTemp.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarPS_InvoicesTemp.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPS_InvoicesTemp.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarPS_InvoicesTemp.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarPS_InvoicesTemp.mOrderID = Convert.ToInt32(dr["OrderID"].ToString());
                        ObjCVarPS_InvoicesTemp.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarPS_InvoicesTemp.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPS_InvoicesTemp.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarPS_InvoicesTemp.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarPS_InvoicesTemp.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarPS_InvoicesTemp.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarPS_InvoicesTemp.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarPS_InvoicesTemp.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarPS_InvoicesTemp.mSupplierInvoiceNo = Convert.ToString(dr["SupplierInvoiceNo"].ToString());
                        ObjCVarPS_InvoicesTemp.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarPS_InvoicesTemp.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarPS_InvoicesTemp.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarPS_InvoicesTemp.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarPS_InvoicesTemp.mIsCalc = Convert.ToBoolean(dr["IsCalc"].ToString());
                        ObjCVarPS_InvoicesTemp.mDiscountType = Convert.ToBoolean(dr["DiscountType"].ToString());
                        ObjCVarPS_InvoicesTemp.mTaxType = Convert.ToInt32(dr["TaxType"].ToString());
                        ObjCVarPS_InvoicesTemp.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarPS_InvoicesTemp.mDisbursementJob_ID = Convert.ToInt32(dr["DisbursementJob_ID"].ToString());
                        ObjCVarPS_InvoicesTemp.mVatAmount = Convert.ToDecimal(dr["VatAmount"].ToString());
                        ObjCVarPS_InvoicesTemp.misVatRatio = Convert.ToBoolean(dr["isVatRatio"].ToString());
                        ObjCVarPS_InvoicesTemp.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarPS_InvoicesTemp.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        lstCVarPS_InvoicesTemp.Add(ObjCVarPS_InvoicesTemp);
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
            lstCVarPS_InvoicesTemp.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPS_InvoicesTemp";
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
                        CVarPS_InvoicesTemp ObjCVarPS_InvoicesTemp = new CVarPS_InvoicesTemp();
                        ObjCVarPS_InvoicesTemp.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPS_InvoicesTemp.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarPS_InvoicesTemp.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarPS_InvoicesTemp.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarPS_InvoicesTemp.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarPS_InvoicesTemp.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarPS_InvoicesTemp.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarPS_InvoicesTemp.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarPS_InvoicesTemp.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarPS_InvoicesTemp.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_InvoicesTemp.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarPS_InvoicesTemp.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarPS_InvoicesTemp.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarPS_InvoicesTemp.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarPS_InvoicesTemp.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPS_InvoicesTemp.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarPS_InvoicesTemp.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarPS_InvoicesTemp.mOrderID = Convert.ToInt32(dr["OrderID"].ToString());
                        ObjCVarPS_InvoicesTemp.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarPS_InvoicesTemp.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPS_InvoicesTemp.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarPS_InvoicesTemp.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarPS_InvoicesTemp.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarPS_InvoicesTemp.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarPS_InvoicesTemp.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarPS_InvoicesTemp.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarPS_InvoicesTemp.mSupplierInvoiceNo = Convert.ToString(dr["SupplierInvoiceNo"].ToString());
                        ObjCVarPS_InvoicesTemp.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarPS_InvoicesTemp.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarPS_InvoicesTemp.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarPS_InvoicesTemp.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarPS_InvoicesTemp.mIsCalc = Convert.ToBoolean(dr["IsCalc"].ToString());
                        ObjCVarPS_InvoicesTemp.mDiscountType = Convert.ToBoolean(dr["DiscountType"].ToString());
                        ObjCVarPS_InvoicesTemp.mTaxType = Convert.ToInt32(dr["TaxType"].ToString());
                        ObjCVarPS_InvoicesTemp.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarPS_InvoicesTemp.mDisbursementJob_ID = Convert.ToInt32(dr["DisbursementJob_ID"].ToString());
                        ObjCVarPS_InvoicesTemp.mVatAmount = Convert.ToDecimal(dr["VatAmount"].ToString());
                        ObjCVarPS_InvoicesTemp.misVatRatio = Convert.ToBoolean(dr["isVatRatio"].ToString());
                        ObjCVarPS_InvoicesTemp.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarPS_InvoicesTemp.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPS_InvoicesTemp.Add(ObjCVarPS_InvoicesTemp);
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
                    Com.CommandText = "[dbo].DeleteListPS_InvoicesTemp";
                else
                    Com.CommandText = "[dbo].UpdateListPS_InvoicesTemp";
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
        public Exception DeleteItem(List<CPKPS_InvoicesTemp> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPS_InvoicesTemp";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKPS_InvoicesTemp ObjCPKPS_InvoicesTemp in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKPS_InvoicesTemp.ID);
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
        public Exception SaveMethod(List<CVarPS_InvoicesTemp> SaveList)
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
                Com.Parameters.Add(new SqlParameter("@SupplierID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TotalBeforTax", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TotalPrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Discount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DiscountPercentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DepartmentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SalesManID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenter_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PaymentMethodID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ISDiscountBeforeTax", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@InvoiceNoManual", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OrderID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@JVID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@LocalTotalBeforeTax", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@LocalTotal", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@PaidAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@RemainAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@SupplierInvoiceNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TaxesAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ItemsAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ServicesAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ExpensesAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@IsCalc", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@DiscountType", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@TaxType", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DueDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@DisbursementJob_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@VatAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@isVatRatio", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Serial", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@DiscountAmount", SqlDbType.Decimal));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPS_InvoicesTemp ObjCVarPS_InvoicesTemp in SaveList)
                {
                    if (ObjCVarPS_InvoicesTemp.mIsChanges == true)
                    {
                        if (ObjCVarPS_InvoicesTemp.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPS_InvoicesTemp";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPS_InvoicesTemp.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPS_InvoicesTemp";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPS_InvoicesTemp.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPS_InvoicesTemp.ID;
                        }
                        Com.Parameters["@InvoiceNo"].Value = ObjCVarPS_InvoicesTemp.InvoiceNo;
                        Com.Parameters["@InvoiceDate"].Value = ObjCVarPS_InvoicesTemp.InvoiceDate;
                        Com.Parameters["@QuotationID"].Value = ObjCVarPS_InvoicesTemp.QuotationID;
                        Com.Parameters["@SupplierID"].Value = ObjCVarPS_InvoicesTemp.SupplierID;
                        Com.Parameters["@TotalBeforTax"].Value = ObjCVarPS_InvoicesTemp.TotalBeforTax;
                        Com.Parameters["@TotalPrice"].Value = ObjCVarPS_InvoicesTemp.TotalPrice;
                        Com.Parameters["@Discount"].Value = ObjCVarPS_InvoicesTemp.Discount;
                        Com.Parameters["@DiscountPercentage"].Value = ObjCVarPS_InvoicesTemp.DiscountPercentage;
                        Com.Parameters["@Notes"].Value = ObjCVarPS_InvoicesTemp.Notes;
                        Com.Parameters["@DepartmentID"].Value = ObjCVarPS_InvoicesTemp.DepartmentID;
                        Com.Parameters["@SalesManID"].Value = ObjCVarPS_InvoicesTemp.SalesManID;
                        Com.Parameters["@CostCenter_ID"].Value = ObjCVarPS_InvoicesTemp.CostCenter_ID;
                        Com.Parameters["@PaymentMethodID"].Value = ObjCVarPS_InvoicesTemp.PaymentMethodID;
                        Com.Parameters["@IsApproved"].Value = ObjCVarPS_InvoicesTemp.IsApproved;
                        Com.Parameters["@ISDiscountBeforeTax"].Value = ObjCVarPS_InvoicesTemp.ISDiscountBeforeTax;
                        Com.Parameters["@InvoiceNoManual"].Value = ObjCVarPS_InvoicesTemp.InvoiceNoManual;
                        Com.Parameters["@OrderID"].Value = ObjCVarPS_InvoicesTemp.OrderID;
                        Com.Parameters["@JVID"].Value = ObjCVarPS_InvoicesTemp.JVID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarPS_InvoicesTemp.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarPS_InvoicesTemp.ExchangeRate;
                        Com.Parameters["@LocalTotalBeforeTax"].Value = ObjCVarPS_InvoicesTemp.LocalTotalBeforeTax;
                        Com.Parameters["@LocalTotal"].Value = ObjCVarPS_InvoicesTemp.LocalTotal;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarPS_InvoicesTemp.IsDeleted;
                        Com.Parameters["@PaidAmount"].Value = ObjCVarPS_InvoicesTemp.PaidAmount;
                        Com.Parameters["@RemainAmount"].Value = ObjCVarPS_InvoicesTemp.RemainAmount;
                        Com.Parameters["@SupplierInvoiceNo"].Value = ObjCVarPS_InvoicesTemp.SupplierInvoiceNo;
                        Com.Parameters["@TaxesAmount"].Value = ObjCVarPS_InvoicesTemp.TaxesAmount;
                        Com.Parameters["@ItemsAmount"].Value = ObjCVarPS_InvoicesTemp.ItemsAmount;
                        Com.Parameters["@ServicesAmount"].Value = ObjCVarPS_InvoicesTemp.ServicesAmount;
                        Com.Parameters["@ExpensesAmount"].Value = ObjCVarPS_InvoicesTemp.ExpensesAmount;
                        Com.Parameters["@IsCalc"].Value = ObjCVarPS_InvoicesTemp.IsCalc;
                        Com.Parameters["@DiscountType"].Value = ObjCVarPS_InvoicesTemp.DiscountType;
                        Com.Parameters["@TaxType"].Value = ObjCVarPS_InvoicesTemp.TaxType;
                        Com.Parameters["@DueDate"].Value = ObjCVarPS_InvoicesTemp.DueDate;
                        Com.Parameters["@DisbursementJob_ID"].Value = ObjCVarPS_InvoicesTemp.DisbursementJob_ID;
                        Com.Parameters["@VatAmount"].Value = ObjCVarPS_InvoicesTemp.VatAmount;
                        Com.Parameters["@isVatRatio"].Value = ObjCVarPS_InvoicesTemp.isVatRatio;
                        Com.Parameters["@Serial"].Value = ObjCVarPS_InvoicesTemp.Serial;
                        Com.Parameters["@DiscountAmount"].Value = ObjCVarPS_InvoicesTemp.DiscountAmount;
                        EndTrans(Com, Con);
                        if (ObjCVarPS_InvoicesTemp.ID == 0)
                        {
                            ObjCVarPS_InvoicesTemp.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPS_InvoicesTemp.mIsChanges = false;
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
