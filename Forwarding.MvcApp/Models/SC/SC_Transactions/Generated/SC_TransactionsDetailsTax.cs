using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SC.Transactions.Generated
{
    [Serializable]
    public class CPKSC_TransactionsDetailsTAX
    {
        #region "variables"
        private Int32 mID;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarSC_TransactionsDetailsTAX : CPKSC_TransactionsDetailsTAX
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mTransactionID;
        internal Int64 mItemID;
        internal Decimal mQty;
        internal Int32 mUnitID;
        internal Int32 mStoreID;
        internal Decimal mReturnedQty;
        internal Int32 mCurrencyID;
        internal Decimal mExchangeRate;
        internal String mNotes;
        internal Int64 mPurchaseInvoiceDetailsID;
        internal Int32 mSLInvoiceDetailsID;
        internal Int32 mSubAccountID;
        internal Decimal mOriginalQty;
        internal Int32 mParentID;
        internal Decimal mAveragePrice;
        internal DateTime mTransactionDate;
        internal Int32 mQtyFactor;
        internal Decimal mActualQty;
        internal Boolean mIsDeleted;
        internal Int32 mTransactionTypeID;
        internal Decimal mItemQty;
        internal Decimal mUnitFactor;
        internal Decimal mTaxAmount;
        internal Decimal mDiscountAmount;
        internal Decimal mInvoicePrice;
        internal Decimal mAvaliableQty;
        internal Decimal mP_Percentage;
        internal Decimal mP_Density;
        internal Int32 mToStoreID;
        internal Decimal mP_LiterCost;
        internal Decimal mP_ExpectedQty;
        internal Int32 mSC_ItemParentTransactionID;
        #endregion

        #region "Methods"
        public Int32 TransactionID
        {
            get { return mTransactionID; }
            set { mIsChanges = true; mTransactionID = value; }
        }
        public Int64 ItemID
        {
            get { return mItemID; }
            set { mIsChanges = true; mItemID = value; }
        }
        public Decimal Qty
        {
            get { return mQty; }
            set { mIsChanges = true; mQty = value; }
        }
        public Int32 UnitID
        {
            get { return mUnitID; }
            set { mIsChanges = true; mUnitID = value; }
        }
        public Int32 StoreID
        {
            get { return mStoreID; }
            set { mIsChanges = true; mStoreID = value; }
        }
        public Decimal ReturnedQty
        {
            get { return mReturnedQty; }
            set { mIsChanges = true; mReturnedQty = value; }
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
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int64 PurchaseInvoiceDetailsID
        {
            get { return mPurchaseInvoiceDetailsID; }
            set { mIsChanges = true; mPurchaseInvoiceDetailsID = value; }
        }
        public Int32 SLInvoiceDetailsID
        {
            get { return mSLInvoiceDetailsID; }
            set { mIsChanges = true; mSLInvoiceDetailsID = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mIsChanges = true; mSubAccountID = value; }
        }
        public Decimal OriginalQty
        {
            get { return mOriginalQty; }
            set { mIsChanges = true; mOriginalQty = value; }
        }
        public Int32 ParentID
        {
            get { return mParentID; }
            set { mIsChanges = true; mParentID = value; }
        }
        public Decimal AveragePrice
        {
            get { return mAveragePrice; }
            set { mIsChanges = true; mAveragePrice = value; }
        }
        public DateTime TransactionDate
        {
            get { return mTransactionDate; }
            set { mIsChanges = true; mTransactionDate = value; }
        }
        public Int32 QtyFactor
        {
            get { return mQtyFactor; }
            set { mIsChanges = true; mQtyFactor = value; }
        }
        public Decimal ActualQty
        {
            get { return mActualQty; }
            set { mIsChanges = true; mActualQty = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
        }
        public Int32 TransactionTypeID
        {
            get { return mTransactionTypeID; }
            set { mIsChanges = true; mTransactionTypeID = value; }
        }
        public Decimal ItemQty
        {
            get { return mItemQty; }
            set { mIsChanges = true; mItemQty = value; }
        }
        public Decimal UnitFactor
        {
            get { return mUnitFactor; }
            set { mIsChanges = true; mUnitFactor = value; }
        }
        public Decimal TaxAmount
        {
            get { return mTaxAmount; }
            set { mIsChanges = true; mTaxAmount = value; }
        }
        public Decimal DiscountAmount
        {
            get { return mDiscountAmount; }
            set { mIsChanges = true; mDiscountAmount = value; }
        }
        public Decimal InvoicePrice
        {
            get { return mInvoicePrice; }
            set { mIsChanges = true; mInvoicePrice = value; }
        }
        public Decimal AvaliableQty
        {
            get { return mAvaliableQty; }
            set { mIsChanges = true; mAvaliableQty = value; }
        }
        public Decimal P_Percentage
        {
            get { return mP_Percentage; }
            set { mIsChanges = true; mP_Percentage = value; }
        }
        public Decimal P_Density
        {
            get { return mP_Density; }
            set { mIsChanges = true; mP_Density = value; }
        }
        public Int32 ToStoreID
        {
            get { return mToStoreID; }
            set { mIsChanges = true; mToStoreID = value; }
        }
        public Decimal P_LiterCost
        {
            get { return mP_LiterCost; }
            set { mIsChanges = true; mP_LiterCost = value; }
        }
        public Decimal P_ExpectedQty
        {
            get { return mP_ExpectedQty; }
            set { mIsChanges = true; mP_ExpectedQty = value; }
        }
        public Int32 SC_ItemParentTransactionID
        {
            get { return mSC_ItemParentTransactionID; }
            set { mIsChanges = true; mSC_ItemParentTransactionID = value; }
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

    public partial class CSC_TransactionsDetailsTax
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
        public List<CVarSC_TransactionsDetailsTAX> lstCVarSC_TransactionsDetailsTAX = new List<CVarSC_TransactionsDetailsTAX>();
        public List<CPKSC_TransactionsDetailsTAX> lstDeletedCPKSC_TransactionsDetailsTAX = new List<CPKSC_TransactionsDetailsTAX>();
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
        public Exception GetItem(Int32 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarSC_TransactionsDetailsTAX.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSC_TransactionsDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSC_TransactionsDetails";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                    Com.Parameters[0].Value = Convert.ToInt32(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarSC_TransactionsDetailsTAX ObjCVarSC_TransactionsDetailsTAX = new CVarSC_TransactionsDetailsTAX();
                        ObjCVarSC_TransactionsDetailsTAX.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mReturnedQty = Convert.ToDecimal(dr["ReturnedQty"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mPurchaseInvoiceDetailsID = Convert.ToInt64(dr["PurchaseInvoiceDetailsID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mSLInvoiceDetailsID = Convert.ToInt32(dr["SLInvoiceDetailsID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mOriginalQty = Convert.ToDecimal(dr["OriginalQty"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mAveragePrice = Convert.ToDecimal(dr["AveragePrice"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mQtyFactor = Convert.ToInt32(dr["QtyFactor"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mActualQty = Convert.ToDecimal(dr["ActualQty"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mItemQty = Convert.ToDecimal(dr["ItemQty"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mUnitFactor = Convert.ToDecimal(dr["UnitFactor"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mInvoicePrice = Convert.ToDecimal(dr["InvoicePrice"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mAvaliableQty = Convert.ToDecimal(dr["AvaliableQty"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mP_Percentage = Convert.ToDecimal(dr["P_Percentage"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mP_Density = Convert.ToDecimal(dr["P_Density"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mToStoreID = Convert.ToInt32(dr["ToStoreID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mP_LiterCost = Convert.ToDecimal(dr["P_LiterCost"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mP_ExpectedQty = Convert.ToDecimal(dr["P_ExpectedQty"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mSC_ItemParentTransactionID = Convert.ToInt32(dr["SC_ItemParentTransactionID"].ToString());
                        lstCVarSC_TransactionsDetailsTAX.Add(ObjCVarSC_TransactionsDetailsTAX);
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
            lstCVarSC_TransactionsDetailsTAX.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSC_TransactionsDetails";
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
                        CVarSC_TransactionsDetailsTAX ObjCVarSC_TransactionsDetailsTAX = new CVarSC_TransactionsDetailsTAX();
                        ObjCVarSC_TransactionsDetailsTAX.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mReturnedQty = Convert.ToDecimal(dr["ReturnedQty"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mPurchaseInvoiceDetailsID = Convert.ToInt64(dr["PurchaseInvoiceDetailsID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mSLInvoiceDetailsID = Convert.ToInt32(dr["SLInvoiceDetailsID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mOriginalQty = Convert.ToDecimal(dr["OriginalQty"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mAveragePrice = Convert.ToDecimal(dr["AveragePrice"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mQtyFactor = Convert.ToInt32(dr["QtyFactor"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mActualQty = Convert.ToDecimal(dr["ActualQty"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mItemQty = Convert.ToDecimal(dr["ItemQty"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mUnitFactor = Convert.ToDecimal(dr["UnitFactor"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mInvoicePrice = Convert.ToDecimal(dr["InvoicePrice"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mAvaliableQty = Convert.ToDecimal(dr["AvaliableQty"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mP_Percentage = Convert.ToDecimal(dr["P_Percentage"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mP_Density = Convert.ToDecimal(dr["P_Density"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mToStoreID = Convert.ToInt32(dr["ToStoreID"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mP_LiterCost = Convert.ToDecimal(dr["P_LiterCost"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mP_ExpectedQty = Convert.ToDecimal(dr["P_ExpectedQty"].ToString());
                        ObjCVarSC_TransactionsDetailsTAX.mSC_ItemParentTransactionID = Convert.ToInt32(dr["SC_ItemParentTransactionID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSC_TransactionsDetailsTAX.Add(ObjCVarSC_TransactionsDetailsTAX);
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
                    Com.CommandText = "[dbo].DeleteListSC_TransactionsDetails";
                else
                    Com.CommandText = "[dbo].UpdateListSC_TransactionsDetailsTax";
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
        public Exception DeleteItem(List<CPKSC_TransactionsDetailsTAX> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSC_TransactionsDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKSC_TransactionsDetailsTAX ObjCPKSC_TransactionsDetailsTAX in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKSC_TransactionsDetailsTAX.ID);
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
        public Exception SaveMethod(List<CVarSC_TransactionsDetailsTAX> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@TransactionID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ItemID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Qty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@UnitID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@StoreID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ReturnedQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PurchaseInvoiceDetailsID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@SLInvoiceDetailsID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OriginalQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ParentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AveragePrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TransactionDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@QtyFactor", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ActualQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@TransactionTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ItemQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@UnitFactor", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TaxAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DiscountAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@InvoicePrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@AvaliableQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@P_Percentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@P_Density", SqlDbType.Decimal));

                Com.Parameters.Add(new SqlParameter("@ToStoreID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@P_LiterCost", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@P_ExpectedQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@SC_ItemParentTransactionID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSC_TransactionsDetailsTAX ObjCVarSC_TransactionsDetailsTAX in SaveList)
                {
                    if (ObjCVarSC_TransactionsDetailsTAX.mIsChanges == true)
                    {
                        if (ObjCVarSC_TransactionsDetailsTAX.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSC_TransactionsDetailsTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSC_TransactionsDetailsTAX.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSC_TransactionsDetailsTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSC_TransactionsDetailsTAX.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSC_TransactionsDetailsTAX.ID;
                        }
                        Com.Parameters["@TransactionID"].Value = ObjCVarSC_TransactionsDetailsTAX.TransactionID;
                        Com.Parameters["@ItemID"].Value = ObjCVarSC_TransactionsDetailsTAX.ItemID;
                        Com.Parameters["@Qty"].Value = ObjCVarSC_TransactionsDetailsTAX.Qty;
                        Com.Parameters["@UnitID"].Value = ObjCVarSC_TransactionsDetailsTAX.UnitID;
                        Com.Parameters["@StoreID"].Value = ObjCVarSC_TransactionsDetailsTAX.StoreID;
                        Com.Parameters["@ReturnedQty"].Value = ObjCVarSC_TransactionsDetailsTAX.ReturnedQty;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarSC_TransactionsDetailsTAX.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarSC_TransactionsDetailsTAX.ExchangeRate;
                        Com.Parameters["@Notes"].Value = ObjCVarSC_TransactionsDetailsTAX.Notes;
                        Com.Parameters["@PurchaseInvoiceDetailsID"].Value = ObjCVarSC_TransactionsDetailsTAX.PurchaseInvoiceDetailsID;
                        Com.Parameters["@SLInvoiceDetailsID"].Value = ObjCVarSC_TransactionsDetailsTAX.SLInvoiceDetailsID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarSC_TransactionsDetailsTAX.SubAccountID;
                        Com.Parameters["@OriginalQty"].Value = ObjCVarSC_TransactionsDetailsTAX.OriginalQty;
                        Com.Parameters["@ParentID"].Value = ObjCVarSC_TransactionsDetailsTAX.ParentID;
                        Com.Parameters["@AveragePrice"].Value = ObjCVarSC_TransactionsDetailsTAX.AveragePrice;
                        Com.Parameters["@TransactionDate"].Value = ObjCVarSC_TransactionsDetailsTAX.TransactionDate;
                        Com.Parameters["@QtyFactor"].Value = ObjCVarSC_TransactionsDetailsTAX.QtyFactor;
                        Com.Parameters["@ActualQty"].Value = ObjCVarSC_TransactionsDetailsTAX.ActualQty;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarSC_TransactionsDetailsTAX.IsDeleted;
                        Com.Parameters["@TransactionTypeID"].Value = ObjCVarSC_TransactionsDetailsTAX.TransactionTypeID;
                        Com.Parameters["@ItemQty"].Value = ObjCVarSC_TransactionsDetailsTAX.ItemQty;
                        Com.Parameters["@UnitFactor"].Value = ObjCVarSC_TransactionsDetailsTAX.UnitFactor;
                        Com.Parameters["@TaxAmount"].Value = ObjCVarSC_TransactionsDetailsTAX.TaxAmount;
                        Com.Parameters["@DiscountAmount"].Value = ObjCVarSC_TransactionsDetailsTAX.DiscountAmount;
                        Com.Parameters["@InvoicePrice"].Value = ObjCVarSC_TransactionsDetailsTAX.InvoicePrice;
                        Com.Parameters["@AvaliableQty"].Value = ObjCVarSC_TransactionsDetailsTAX.AvaliableQty;
                        Com.Parameters["@P_Percentage"].Value = ObjCVarSC_TransactionsDetailsTAX.P_Percentage;
                        Com.Parameters["@P_Density"].Value = ObjCVarSC_TransactionsDetailsTAX.P_Density;
                        Com.Parameters["@ToStoreID"].Value = ObjCVarSC_TransactionsDetailsTAX.ToStoreID;
                        Com.Parameters["@P_LiterCost"].Value = ObjCVarSC_TransactionsDetailsTAX.P_LiterCost;
                        Com.Parameters["@P_ExpectedQty"].Value = ObjCVarSC_TransactionsDetailsTAX.P_ExpectedQty;
                        Com.Parameters["@SC_ItemParentTransactionID"].Value = ObjCVarSC_TransactionsDetailsTAX.SC_ItemParentTransactionID;
                        EndTrans(Com, Con);
                        if (ObjCVarSC_TransactionsDetailsTAX.ID == 0)
                        {
                            ObjCVarSC_TransactionsDetailsTAX.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSC_TransactionsDetailsTAX.mIsChanges = false;
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



        #region "Save Methods"
        public Exception SavePayablesMethod(List<CVarSC_TransactionsDetailsTAX> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@TransactionID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ItemID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Qty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@UnitID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@StoreID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ReturnedQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PurchaseInvoiceDetailsID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@SLInvoiceDetailsID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OriginalQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ParentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AveragePrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TransactionDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@QtyFactor", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ActualQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@TransactionTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ItemQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@UnitFactor", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TaxAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DiscountAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@InvoicePrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@AvaliableQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@P_Percentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@P_Density", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ToStoreID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@P_LiterCost", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@P_ExpectedQty", SqlDbType.Decimal));

                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSC_TransactionsDetailsTAX ObjCVarSC_TransactionsDetailsTAX in SaveList)
                {
                    if (ObjCVarSC_TransactionsDetailsTAX.mIsChanges == true)
                    {
                        if (ObjCVarSC_TransactionsDetailsTAX.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSC_TransactionsDetailsWithPayables";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        //else if (ObjCVarSC_TransactionsDetailsTAX.ID != 0)
                        //{
                        //    Com.CommandText = "[dbo].UpdateItemSC_TransactionsDetails";
                        //    paraID.Direction = ParameterDirection.Input;
                        //}
                        BeginTrans(Com, Con);
                        if (ObjCVarSC_TransactionsDetailsTAX.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSC_TransactionsDetailsTAX.ID;
                        }
                        Com.Parameters["@TransactionID"].Value = ObjCVarSC_TransactionsDetailsTAX.TransactionID;
                        Com.Parameters["@ItemID"].Value = ObjCVarSC_TransactionsDetailsTAX.ItemID;
                        Com.Parameters["@Qty"].Value = ObjCVarSC_TransactionsDetailsTAX.Qty;
                        Com.Parameters["@UnitID"].Value = ObjCVarSC_TransactionsDetailsTAX.UnitID;
                        Com.Parameters["@StoreID"].Value = ObjCVarSC_TransactionsDetailsTAX.StoreID;
                        Com.Parameters["@ReturnedQty"].Value = ObjCVarSC_TransactionsDetailsTAX.ReturnedQty;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarSC_TransactionsDetailsTAX.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarSC_TransactionsDetailsTAX.ExchangeRate;
                        Com.Parameters["@Notes"].Value = ObjCVarSC_TransactionsDetailsTAX.Notes;
                        Com.Parameters["@PurchaseInvoiceDetailsID"].Value = ObjCVarSC_TransactionsDetailsTAX.PurchaseInvoiceDetailsID;
                        Com.Parameters["@SLInvoiceDetailsID"].Value = ObjCVarSC_TransactionsDetailsTAX.SLInvoiceDetailsID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarSC_TransactionsDetailsTAX.SubAccountID;
                        Com.Parameters["@OriginalQty"].Value = ObjCVarSC_TransactionsDetailsTAX.OriginalQty;
                        Com.Parameters["@ParentID"].Value = ObjCVarSC_TransactionsDetailsTAX.ParentID;
                        Com.Parameters["@AveragePrice"].Value = ObjCVarSC_TransactionsDetailsTAX.AveragePrice;
                        Com.Parameters["@TransactionDate"].Value = ObjCVarSC_TransactionsDetailsTAX.TransactionDate;
                        Com.Parameters["@QtyFactor"].Value = ObjCVarSC_TransactionsDetailsTAX.QtyFactor;
                        Com.Parameters["@ActualQty"].Value = ObjCVarSC_TransactionsDetailsTAX.ActualQty;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarSC_TransactionsDetailsTAX.IsDeleted;
                        Com.Parameters["@TransactionTypeID"].Value = ObjCVarSC_TransactionsDetailsTAX.TransactionTypeID;
                        Com.Parameters["@ItemQty"].Value = ObjCVarSC_TransactionsDetailsTAX.ItemQty;
                        Com.Parameters["@UnitFactor"].Value = ObjCVarSC_TransactionsDetailsTAX.UnitFactor;
                        Com.Parameters["@TaxAmount"].Value = ObjCVarSC_TransactionsDetailsTAX.TaxAmount;
                        Com.Parameters["@DiscountAmount"].Value = ObjCVarSC_TransactionsDetailsTAX.DiscountAmount;
                        Com.Parameters["@InvoicePrice"].Value = ObjCVarSC_TransactionsDetailsTAX.InvoicePrice;
                        Com.Parameters["@AvaliableQty"].Value = ObjCVarSC_TransactionsDetailsTAX.AvaliableQty;
                        Com.Parameters["@P_Percentage"].Value = ObjCVarSC_TransactionsDetailsTAX.P_Percentage;
                        Com.Parameters["@P_Density"].Value = ObjCVarSC_TransactionsDetailsTAX.P_Density;
                        Com.Parameters["@ToStoreID"].Value = ObjCVarSC_TransactionsDetailsTAX.ToStoreID;
                        Com.Parameters["@P_LiterCost"].Value = ObjCVarSC_TransactionsDetailsTAX.P_LiterCost;
                        Com.Parameters["@P_ExpectedQty"].Value = ObjCVarSC_TransactionsDetailsTAX.P_ExpectedQty;

                        EndTrans(Com, Con);
                        if (ObjCVarSC_TransactionsDetailsTAX.ID == 0)
                        {
                            ObjCVarSC_TransactionsDetailsTAX.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSC_TransactionsDetailsTAX.mIsChanges = false;
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
