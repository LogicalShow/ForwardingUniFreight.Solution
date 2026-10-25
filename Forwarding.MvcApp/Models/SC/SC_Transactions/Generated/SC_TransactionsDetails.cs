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
    public class CPKSC_TransactionsDetails
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
    public partial class CVarSC_TransactionsDetails : CPKSC_TransactionsDetails
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
        internal Decimal mEnteryQty;
        internal Int32 mfrz1;
        internal Int32 mfrz2;
        internal Int32 mhwalek;
        internal Int32 mFlexiSerialID;
        internal String mTransIDYard;




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
        public Decimal EnteryQty
        {
            get { return mEnteryQty; }
            set { mIsChanges = true; mEnteryQty = value; }
        }
        public Int32 frz1
        {
            get { return mfrz1; }
            set { mIsChanges = true; mfrz1 = value; }
        }
        public Int32 frz2
        {
            get { return mfrz2; }
            set { mIsChanges = true; mfrz2 = value; }
        }
        public Int32 hwalek
        {
            get { return mhwalek; }
            set { mIsChanges = true; mhwalek = value; }
        }
        public Int32 FlexiSerialID
        {
            get { return mFlexiSerialID; }
            set { mIsChanges = true; mFlexiSerialID = value; }
        }
        public string TransIDYard
        {
            get { return mTransIDYard; }
            set { mIsChanges = true; mTransIDYard = value; }
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

    public partial class CSC_TransactionsDetails
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
        public List<CVarSC_TransactionsDetails> lstCVarSC_TransactionsDetails = new List<CVarSC_TransactionsDetails>();
        public List<CPKSC_TransactionsDetails> lstDeletedCPKSC_TransactionsDetails = new List<CPKSC_TransactionsDetails>();
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
            lstCVarSC_TransactionsDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
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
                        CVarSC_TransactionsDetails ObjCVarSC_TransactionsDetails = new CVarSC_TransactionsDetails();
                        ObjCVarSC_TransactionsDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSC_TransactionsDetails.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarSC_TransactionsDetails.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarSC_TransactionsDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarSC_TransactionsDetails.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarSC_TransactionsDetails.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarSC_TransactionsDetails.mReturnedQty = Convert.ToDecimal(dr["ReturnedQty"].ToString());
                        ObjCVarSC_TransactionsDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarSC_TransactionsDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarSC_TransactionsDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarSC_TransactionsDetails.mPurchaseInvoiceDetailsID = Convert.ToInt64(dr["PurchaseInvoiceDetailsID"].ToString());
                        ObjCVarSC_TransactionsDetails.mSLInvoiceDetailsID = Convert.ToInt32(dr["SLInvoiceDetailsID"].ToString());
                        ObjCVarSC_TransactionsDetails.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarSC_TransactionsDetails.mOriginalQty = Convert.ToDecimal(dr["OriginalQty"].ToString());
                        ObjCVarSC_TransactionsDetails.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarSC_TransactionsDetails.mAveragePrice = Convert.ToDecimal(dr["AveragePrice"].ToString());
                        ObjCVarSC_TransactionsDetails.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarSC_TransactionsDetails.mQtyFactor = Convert.ToInt32(dr["QtyFactor"].ToString());
                        ObjCVarSC_TransactionsDetails.mActualQty = Convert.ToDecimal(dr["ActualQty"].ToString());
                        ObjCVarSC_TransactionsDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarSC_TransactionsDetails.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarSC_TransactionsDetails.mItemQty = Convert.ToDecimal(dr["ItemQty"].ToString());
                        ObjCVarSC_TransactionsDetails.mUnitFactor = Convert.ToDecimal(dr["UnitFactor"].ToString());
                        ObjCVarSC_TransactionsDetails.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarSC_TransactionsDetails.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarSC_TransactionsDetails.mInvoicePrice = Convert.ToDecimal(dr["InvoicePrice"].ToString());
                        ObjCVarSC_TransactionsDetails.mAvaliableQty = Convert.ToDecimal(dr["AvaliableQty"].ToString());
                        ObjCVarSC_TransactionsDetails.mP_Percentage = Convert.ToDecimal(dr["P_Percentage"].ToString());
                        ObjCVarSC_TransactionsDetails.mP_Density = Convert.ToDecimal(dr["P_Density"].ToString());
                        ObjCVarSC_TransactionsDetails.mToStoreID = Convert.ToInt32(dr["ToStoreID"].ToString());
                        ObjCVarSC_TransactionsDetails.mP_LiterCost = Convert.ToDecimal(dr["P_LiterCost"].ToString());
                        ObjCVarSC_TransactionsDetails.mP_ExpectedQty = Convert.ToDecimal(dr["P_ExpectedQty"].ToString());
                        ObjCVarSC_TransactionsDetails.mSC_ItemParentTransactionID = Convert.ToInt32(dr["SC_ItemParentTransactionID"].ToString());
                        ObjCVarSC_TransactionsDetails.mEnteryQty = Convert.ToDecimal(dr["EnteryQty"].ToString());
                        ObjCVarSC_TransactionsDetails.mfrz1 = Convert.ToInt32(dr["frz1"].ToString());
                        ObjCVarSC_TransactionsDetails.mfrz2 = Convert.ToInt32(dr["frz2"].ToString());
                        ObjCVarSC_TransactionsDetails.mhwalek = Convert.ToInt32(dr["hwalek"].ToString());
                        ObjCVarSC_TransactionsDetails.mFlexiSerialID = Convert.ToInt32(dr["FlexiSerialID"].ToString());
                        ObjCVarSC_TransactionsDetails.mTransIDYard = Convert.ToString(dr["TransIDYard"].ToString());


                        lstCVarSC_TransactionsDetails.Add(ObjCVarSC_TransactionsDetails);
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
            lstCVarSC_TransactionsDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
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
                        CVarSC_TransactionsDetails ObjCVarSC_TransactionsDetails = new CVarSC_TransactionsDetails();
                        ObjCVarSC_TransactionsDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSC_TransactionsDetails.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarSC_TransactionsDetails.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarSC_TransactionsDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarSC_TransactionsDetails.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarSC_TransactionsDetails.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarSC_TransactionsDetails.mReturnedQty = Convert.ToDecimal(dr["ReturnedQty"].ToString());
                        ObjCVarSC_TransactionsDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarSC_TransactionsDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarSC_TransactionsDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarSC_TransactionsDetails.mPurchaseInvoiceDetailsID = Convert.ToInt64(dr["PurchaseInvoiceDetailsID"].ToString());
                        ObjCVarSC_TransactionsDetails.mSLInvoiceDetailsID = Convert.ToInt32(dr["SLInvoiceDetailsID"].ToString());
                        ObjCVarSC_TransactionsDetails.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarSC_TransactionsDetails.mOriginalQty = Convert.ToDecimal(dr["OriginalQty"].ToString());
                        ObjCVarSC_TransactionsDetails.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarSC_TransactionsDetails.mAveragePrice = Convert.ToDecimal(dr["AveragePrice"].ToString());
                        ObjCVarSC_TransactionsDetails.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarSC_TransactionsDetails.mQtyFactor = Convert.ToInt32(dr["QtyFactor"].ToString());
                        ObjCVarSC_TransactionsDetails.mActualQty = Convert.ToDecimal(dr["ActualQty"].ToString());
                        ObjCVarSC_TransactionsDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarSC_TransactionsDetails.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarSC_TransactionsDetails.mItemQty = Convert.ToDecimal(dr["ItemQty"].ToString());
                        ObjCVarSC_TransactionsDetails.mUnitFactor = Convert.ToDecimal(dr["UnitFactor"].ToString());
                        ObjCVarSC_TransactionsDetails.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarSC_TransactionsDetails.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarSC_TransactionsDetails.mInvoicePrice = Convert.ToDecimal(dr["InvoicePrice"].ToString());
                        ObjCVarSC_TransactionsDetails.mAvaliableQty = Convert.ToDecimal(dr["AvaliableQty"].ToString());
                        ObjCVarSC_TransactionsDetails.mP_Percentage = Convert.ToDecimal(dr["P_Percentage"].ToString());
                        ObjCVarSC_TransactionsDetails.mP_Density = Convert.ToDecimal(dr["P_Density"].ToString());
                        ObjCVarSC_TransactionsDetails.mToStoreID = Convert.ToInt32(dr["ToStoreID"].ToString());
                        ObjCVarSC_TransactionsDetails.mP_LiterCost = Convert.ToDecimal(dr["P_LiterCost"].ToString());
                        ObjCVarSC_TransactionsDetails.mP_ExpectedQty = Convert.ToDecimal(dr["P_ExpectedQty"].ToString());
                        ObjCVarSC_TransactionsDetails.mSC_ItemParentTransactionID = Convert.ToInt32(dr["SC_ItemParentTransactionID"].ToString());
                        ObjCVarSC_TransactionsDetails.mEnteryQty = Convert.ToDecimal(dr["EnteryQty"].ToString());
                        ObjCVarSC_TransactionsDetails.mfrz1 = Convert.ToInt32(dr["frz1"].ToString());
                        ObjCVarSC_TransactionsDetails.mfrz2 = Convert.ToInt32(dr["frz2"].ToString());
                        ObjCVarSC_TransactionsDetails.mhwalek = Convert.ToInt32(dr["hwalek"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSC_TransactionsDetails.Add(ObjCVarSC_TransactionsDetails);
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
                    Com.CommandText = "[dbo].UpdateListSC_TransactionsDetails";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
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
        public Exception DeleteItem(List<CPKSC_TransactionsDetails> DeleteList)
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
                foreach (CPKSC_TransactionsDetails ObjCPKSC_TransactionsDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKSC_TransactionsDetails.ID);
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
        public Exception SaveMethod(List<CVarSC_TransactionsDetails> SaveList)
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
                Com.Parameters.Add(new SqlParameter("@EnteryQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@frz1", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@frz2", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@hwalek", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@FlexiSerialID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TransIDYard", SqlDbType.VarChar));

                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSC_TransactionsDetails ObjCVarSC_TransactionsDetails in SaveList)
                {
                    if (ObjCVarSC_TransactionsDetails.mIsChanges == true)
                    {
                        if (ObjCVarSC_TransactionsDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSC_TransactionsDetails";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSC_TransactionsDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSC_TransactionsDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSC_TransactionsDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSC_TransactionsDetails.ID;
                        }
                        Com.Parameters["@TransactionID"].Value = ObjCVarSC_TransactionsDetails.TransactionID;
                        Com.Parameters["@ItemID"].Value = ObjCVarSC_TransactionsDetails.ItemID;
                        Com.Parameters["@Qty"].Value = ObjCVarSC_TransactionsDetails.Qty;
                        Com.Parameters["@UnitID"].Value = ObjCVarSC_TransactionsDetails.UnitID;
                        Com.Parameters["@StoreID"].Value = ObjCVarSC_TransactionsDetails.StoreID;
                        Com.Parameters["@ReturnedQty"].Value = ObjCVarSC_TransactionsDetails.ReturnedQty;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarSC_TransactionsDetails.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarSC_TransactionsDetails.ExchangeRate;
                        Com.Parameters["@Notes"].Value = ObjCVarSC_TransactionsDetails.Notes;
                        Com.Parameters["@PurchaseInvoiceDetailsID"].Value = ObjCVarSC_TransactionsDetails.PurchaseInvoiceDetailsID;
                        Com.Parameters["@SLInvoiceDetailsID"].Value = ObjCVarSC_TransactionsDetails.SLInvoiceDetailsID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarSC_TransactionsDetails.SubAccountID;
                        Com.Parameters["@OriginalQty"].Value = ObjCVarSC_TransactionsDetails.OriginalQty;
                        Com.Parameters["@ParentID"].Value = ObjCVarSC_TransactionsDetails.ParentID;
                        Com.Parameters["@AveragePrice"].Value = ObjCVarSC_TransactionsDetails.AveragePrice;
                        Com.Parameters["@TransactionDate"].Value = ObjCVarSC_TransactionsDetails.TransactionDate;
                        Com.Parameters["@QtyFactor"].Value = ObjCVarSC_TransactionsDetails.QtyFactor;
                        Com.Parameters["@ActualQty"].Value = ObjCVarSC_TransactionsDetails.ActualQty;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarSC_TransactionsDetails.IsDeleted;
                        Com.Parameters["@TransactionTypeID"].Value = ObjCVarSC_TransactionsDetails.TransactionTypeID;
                        Com.Parameters["@ItemQty"].Value = ObjCVarSC_TransactionsDetails.ItemQty;
                        Com.Parameters["@UnitFactor"].Value = ObjCVarSC_TransactionsDetails.UnitFactor;
                        Com.Parameters["@TaxAmount"].Value = ObjCVarSC_TransactionsDetails.TaxAmount;
                        Com.Parameters["@DiscountAmount"].Value = ObjCVarSC_TransactionsDetails.DiscountAmount;
                        Com.Parameters["@InvoicePrice"].Value = ObjCVarSC_TransactionsDetails.InvoicePrice;
                        Com.Parameters["@AvaliableQty"].Value = ObjCVarSC_TransactionsDetails.AvaliableQty;
                        Com.Parameters["@P_Percentage"].Value = ObjCVarSC_TransactionsDetails.P_Percentage;
                        Com.Parameters["@P_Density"].Value = ObjCVarSC_TransactionsDetails.P_Density;
                        Com.Parameters["@ToStoreID"].Value = ObjCVarSC_TransactionsDetails.ToStoreID;
                        Com.Parameters["@P_LiterCost"].Value = ObjCVarSC_TransactionsDetails.P_LiterCost;
                        Com.Parameters["@P_ExpectedQty"].Value = ObjCVarSC_TransactionsDetails.P_ExpectedQty;
                        Com.Parameters["@SC_ItemParentTransactionID"].Value = ObjCVarSC_TransactionsDetails.SC_ItemParentTransactionID;
                        Com.Parameters["@EnteryQty"].Value = ObjCVarSC_TransactionsDetails.EnteryQty;
                        Com.Parameters["@frz1"].Value = ObjCVarSC_TransactionsDetails.frz1;
                        Com.Parameters["@frz2"].Value = ObjCVarSC_TransactionsDetails.frz2;
                        Com.Parameters["@hwalek"].Value = ObjCVarSC_TransactionsDetails.hwalek;
                        Com.Parameters["@FlexiSerialID"].Value = ObjCVarSC_TransactionsDetails.FlexiSerialID;
                        Com.Parameters["@TransIDYard"].Value = ObjCVarSC_TransactionsDetails.TransIDYard;


                        EndTrans(Com, Con);
                        if (ObjCVarSC_TransactionsDetails.ID == 0)
                        {
                            ObjCVarSC_TransactionsDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSC_TransactionsDetails.mIsChanges = false;
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
        public Exception SavePayablesMethod(List<CVarSC_TransactionsDetails> SaveList)
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
                foreach (CVarSC_TransactionsDetails ObjCVarSC_TransactionsDetails in SaveList)
                {
                    if (ObjCVarSC_TransactionsDetails.mIsChanges == true)
                    {
                        if (ObjCVarSC_TransactionsDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSC_TransactionsDetailsWithPayables";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        //else if (ObjCVarSC_TransactionsDetails.ID != 0)
                        //{
                        //    Com.CommandText = "[dbo].UpdateItemSC_TransactionsDetails";
                        //    paraID.Direction = ParameterDirection.Input;
                        //}
                        BeginTrans(Com, Con);
                        if (ObjCVarSC_TransactionsDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSC_TransactionsDetails.ID;
                        }
                        Com.Parameters["@TransactionID"].Value = ObjCVarSC_TransactionsDetails.TransactionID;
                        Com.Parameters["@ItemID"].Value = ObjCVarSC_TransactionsDetails.ItemID;
                        Com.Parameters["@Qty"].Value = ObjCVarSC_TransactionsDetails.Qty;
                        Com.Parameters["@UnitID"].Value = ObjCVarSC_TransactionsDetails.UnitID;
                        Com.Parameters["@StoreID"].Value = ObjCVarSC_TransactionsDetails.StoreID;
                        Com.Parameters["@ReturnedQty"].Value = ObjCVarSC_TransactionsDetails.ReturnedQty;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarSC_TransactionsDetails.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarSC_TransactionsDetails.ExchangeRate;
                        Com.Parameters["@Notes"].Value = ObjCVarSC_TransactionsDetails.Notes;
                        Com.Parameters["@PurchaseInvoiceDetailsID"].Value = ObjCVarSC_TransactionsDetails.PurchaseInvoiceDetailsID;
                        Com.Parameters["@SLInvoiceDetailsID"].Value = ObjCVarSC_TransactionsDetails.SLInvoiceDetailsID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarSC_TransactionsDetails.SubAccountID;
                        Com.Parameters["@OriginalQty"].Value = ObjCVarSC_TransactionsDetails.OriginalQty;
                        Com.Parameters["@ParentID"].Value = ObjCVarSC_TransactionsDetails.ParentID;
                        Com.Parameters["@AveragePrice"].Value = ObjCVarSC_TransactionsDetails.AveragePrice;
                        Com.Parameters["@TransactionDate"].Value = ObjCVarSC_TransactionsDetails.TransactionDate;
                        Com.Parameters["@QtyFactor"].Value = ObjCVarSC_TransactionsDetails.QtyFactor;
                        Com.Parameters["@ActualQty"].Value = ObjCVarSC_TransactionsDetails.ActualQty;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarSC_TransactionsDetails.IsDeleted;
                        Com.Parameters["@TransactionTypeID"].Value = ObjCVarSC_TransactionsDetails.TransactionTypeID;
                        Com.Parameters["@ItemQty"].Value = ObjCVarSC_TransactionsDetails.ItemQty;
                        Com.Parameters["@UnitFactor"].Value = ObjCVarSC_TransactionsDetails.UnitFactor;
                        Com.Parameters["@TaxAmount"].Value = ObjCVarSC_TransactionsDetails.TaxAmount;
                        Com.Parameters["@DiscountAmount"].Value = ObjCVarSC_TransactionsDetails.DiscountAmount;
                        Com.Parameters["@InvoicePrice"].Value = ObjCVarSC_TransactionsDetails.InvoicePrice;
                        Com.Parameters["@AvaliableQty"].Value = ObjCVarSC_TransactionsDetails.AvaliableQty;
                        Com.Parameters["@P_Percentage"].Value = ObjCVarSC_TransactionsDetails.P_Percentage;
                        Com.Parameters["@P_Density"].Value = ObjCVarSC_TransactionsDetails.P_Density;
                        Com.Parameters["@ToStoreID"].Value = ObjCVarSC_TransactionsDetails.ToStoreID;
                        Com.Parameters["@P_LiterCost"].Value = ObjCVarSC_TransactionsDetails.P_LiterCost;
                        Com.Parameters["@P_ExpectedQty"].Value = ObjCVarSC_TransactionsDetails.P_ExpectedQty;

                        EndTrans(Com, Con);
                        if (ObjCVarSC_TransactionsDetails.ID == 0)
                        {
                            ObjCVarSC_TransactionsDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSC_TransactionsDetails.mIsChanges = false;
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
