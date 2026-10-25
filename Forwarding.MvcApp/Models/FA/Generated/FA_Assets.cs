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
    public class CPKFA_Assets
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
    public partial class CVarFA_Assets : CPKFA_Assets
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal Int32 mGroupID;
        internal Decimal mQty;
        internal Int32 mCurrencyID;
        internal Boolean mApproved;
        internal String mBarCode;
        internal DateTime mPurchasingDate;
        internal Decimal mPurchasingAmount;
        internal Int32 mSubAccountID;
        internal Decimal mOpeningDepreciationAmount;
        internal Decimal mDepreciableAmount;
        internal Int32 mBranchID;
        internal Int32 mDepartmentID;
        internal Int32 mDevisonID;
        internal Decimal mIntialAmount;
        internal DateTime mCreationDate;
        internal DateTime mStartDepreciationDate;
        internal Decimal mPurchasingAmountLocal;
        internal Decimal mExchangeRate;
        internal String mBarCodeType;
        internal Decimal mScrappingAmount;
        internal Boolean mIsNotDepreciable;
        internal Int32 mDepreciationTypeID;
        internal Int32 mInvoiceID;
        internal Int64 mSerialNo;
        internal Int32 mSC_TransactionDetailsID;
        internal Decimal mIntialPercentage;
        internal Int32 mAssetType;
        internal Int32 mAssetAccount_ID;
        internal Int32 mAssetDepreciationAccount_ID;
        internal Int32 mAssetAccumulatedDepreciationAccount_ID;
        internal Int64 mPSInvoiceID;
        internal Int64 mItemID;
        internal Int64 mJVID;
        internal Int32 mAssetCostCenter_ID;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mIsChanges = true; mName = value; }
        }
        public Int32 GroupID
        {
            get { return mGroupID; }
            set { mIsChanges = true; mGroupID = value; }
        }
        public Decimal Qty
        {
            get { return mQty; }
            set { mIsChanges = true; mQty = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public Boolean Approved
        {
            get { return mApproved; }
            set { mIsChanges = true; mApproved = value; }
        }
        public String BarCode
        {
            get { return mBarCode; }
            set { mIsChanges = true; mBarCode = value; }
        }
        public DateTime PurchasingDate
        {
            get { return mPurchasingDate; }
            set { mIsChanges = true; mPurchasingDate = value; }
        }
        public Decimal PurchasingAmount
        {
            get { return mPurchasingAmount; }
            set { mIsChanges = true; mPurchasingAmount = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mIsChanges = true; mSubAccountID = value; }
        }
        public Decimal OpeningDepreciationAmount
        {
            get { return mOpeningDepreciationAmount; }
            set { mIsChanges = true; mOpeningDepreciationAmount = value; }
        }
        public Decimal DepreciableAmount
        {
            get { return mDepreciableAmount; }
            set { mIsChanges = true; mDepreciableAmount = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mIsChanges = true; mBranchID = value; }
        }
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mIsChanges = true; mDepartmentID = value; }
        }
        public Int32 DevisonID
        {
            get { return mDevisonID; }
            set { mIsChanges = true; mDevisonID = value; }
        }
        public Decimal IntialAmount
        {
            get { return mIntialAmount; }
            set { mIsChanges = true; mIntialAmount = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
        }
        public DateTime StartDepreciationDate
        {
            get { return mStartDepreciationDate; }
            set { mIsChanges = true; mStartDepreciationDate = value; }
        }
        public Decimal PurchasingAmountLocal
        {
            get { return mPurchasingAmountLocal; }
            set { mIsChanges = true; mPurchasingAmountLocal = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mIsChanges = true; mExchangeRate = value; }
        }
        public String BarCodeType
        {
            get { return mBarCodeType; }
            set { mIsChanges = true; mBarCodeType = value; }
        }
        public Decimal ScrappingAmount
        {
            get { return mScrappingAmount; }
            set { mIsChanges = true; mScrappingAmount = value; }
        }
        public Boolean IsNotDepreciable
        {
            get { return mIsNotDepreciable; }
            set { mIsChanges = true; mIsNotDepreciable = value; }
        }
        public Int32 DepreciationTypeID
        {
            get { return mDepreciationTypeID; }
            set { mIsChanges = true; mDepreciationTypeID = value; }
        }
        public Int32 InvoiceID
        {
            get { return mInvoiceID; }
            set { mIsChanges = true; mInvoiceID = value; }
        }
        public Int64 SerialNo
        {
            get { return mSerialNo; }
            set { mIsChanges = true; mSerialNo = value; }
        }
        public Int32 SC_TransactionDetailsID
        {
            get { return mSC_TransactionDetailsID; }
            set { mIsChanges = true; mSC_TransactionDetailsID = value; }
        }
        public Decimal IntialPercentage
        {
            get { return mIntialPercentage; }
            set { mIsChanges = true; mIntialPercentage = value; }
        }
        public Int32 AssetType
        {
            get { return mAssetType; }
            set { mIsChanges = true; mAssetType = value; }
        }
        public Int32 AssetAccount_ID
        {
            get { return mAssetAccount_ID; }
            set { mIsChanges = true; mAssetAccount_ID = value; }
        }
        public Int32 AssetDepreciationAccount_ID
        {
            get { return mAssetDepreciationAccount_ID; }
            set { mIsChanges = true; mAssetDepreciationAccount_ID = value; }
        }
        public Int32 AssetAccumulatedDepreciationAccount_ID
        {
            get { return mAssetAccumulatedDepreciationAccount_ID; }
            set { mIsChanges = true; mAssetAccumulatedDepreciationAccount_ID = value; }
        }
        public Int64 PSInvoiceID
        {
            get { return mPSInvoiceID; }
            set { mIsChanges = true; mPSInvoiceID = value; }
        }
        public Int64 ItemID
        {
            get { return mItemID; }
            set { mIsChanges = true; mItemID = value; }
        }
        public Int64 JVID
        {
            get { return mJVID; }
            set { mIsChanges = true; mJVID = value; }
        }
        public Int32 AssetCostCenter_ID
        {
            get { return mAssetCostCenter_ID; }
            set { mIsChanges = true; mAssetCostCenter_ID = value; }
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

    public partial class CFA_Assets
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
        public List<CVarFA_Assets> lstCVarFA_Assets = new List<CVarFA_Assets>();
        public List<CPKFA_Assets> lstDeletedCPKFA_Assets = new List<CPKFA_Assets>();
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
            lstCVarFA_Assets.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListFA_Assets";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemFA_Assets";
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
                        CVarFA_Assets ObjCVarFA_Assets = new CVarFA_Assets();
                        ObjCVarFA_Assets.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_Assets.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarFA_Assets.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarFA_Assets.mGroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarFA_Assets.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarFA_Assets.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarFA_Assets.mApproved = Convert.ToBoolean(dr["Approved"].ToString());
                        ObjCVarFA_Assets.mBarCode = Convert.ToString(dr["BarCode"].ToString());
                        ObjCVarFA_Assets.mPurchasingDate = Convert.ToDateTime(dr["PurchasingDate"].ToString());
                        ObjCVarFA_Assets.mPurchasingAmount = Convert.ToDecimal(dr["PurchasingAmount"].ToString());
                        ObjCVarFA_Assets.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarFA_Assets.mOpeningDepreciationAmount = Convert.ToDecimal(dr["OpeningDepreciationAmount"].ToString());
                        ObjCVarFA_Assets.mDepreciableAmount = Convert.ToDecimal(dr["DepreciableAmount"].ToString());
                        ObjCVarFA_Assets.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarFA_Assets.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarFA_Assets.mDevisonID = Convert.ToInt32(dr["DevisonID"].ToString());
                        ObjCVarFA_Assets.mIntialAmount = Convert.ToDecimal(dr["IntialAmount"].ToString());
                        ObjCVarFA_Assets.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarFA_Assets.mStartDepreciationDate = Convert.ToDateTime(dr["StartDepreciationDate"].ToString());
                        ObjCVarFA_Assets.mPurchasingAmountLocal = Convert.ToDecimal(dr["PurchasingAmountLocal"].ToString());
                        ObjCVarFA_Assets.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarFA_Assets.mBarCodeType = Convert.ToString(dr["BarCodeType"].ToString());
                        ObjCVarFA_Assets.mScrappingAmount = Convert.ToDecimal(dr["ScrappingAmount"].ToString());
                        ObjCVarFA_Assets.mIsNotDepreciable = Convert.ToBoolean(dr["IsNotDepreciable"].ToString());
                        ObjCVarFA_Assets.mDepreciationTypeID = Convert.ToInt32(dr["DepreciationTypeID"].ToString());
                        ObjCVarFA_Assets.mInvoiceID = Convert.ToInt32(dr["InvoiceID"].ToString());
                        ObjCVarFA_Assets.mSerialNo = Convert.ToInt64(dr["SerialNo"].ToString());
                        ObjCVarFA_Assets.mSC_TransactionDetailsID = Convert.ToInt32(dr["SC_TransactionDetailsID"].ToString());
                        ObjCVarFA_Assets.mIntialPercentage = Convert.ToDecimal(dr["IntialPercentage"].ToString());
                        ObjCVarFA_Assets.mAssetType = Convert.ToInt32(dr["AssetType"].ToString());
                        ObjCVarFA_Assets.mAssetAccount_ID = Convert.ToInt32(dr["AssetAccount_ID"].ToString());
                        ObjCVarFA_Assets.mAssetDepreciationAccount_ID = Convert.ToInt32(dr["AssetDepreciationAccount_ID"].ToString());
                        ObjCVarFA_Assets.mAssetAccumulatedDepreciationAccount_ID = Convert.ToInt32(dr["AssetAccumulatedDepreciationAccount_ID"].ToString());
                        ObjCVarFA_Assets.mPSInvoiceID = Convert.ToInt64(dr["PSInvoiceID"].ToString());
                        ObjCVarFA_Assets.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarFA_Assets.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarFA_Assets.mAssetCostCenter_ID = Convert.ToInt32(dr["AssetCostCenter_ID"].ToString());
                        lstCVarFA_Assets.Add(ObjCVarFA_Assets);
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
            lstCVarFA_Assets.Clear();

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
                Com.CommandText = "[dbo].GetListPagingFA_Assets";
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
                        CVarFA_Assets ObjCVarFA_Assets = new CVarFA_Assets();
                        ObjCVarFA_Assets.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_Assets.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarFA_Assets.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarFA_Assets.mGroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarFA_Assets.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarFA_Assets.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarFA_Assets.mApproved = Convert.ToBoolean(dr["Approved"].ToString());
                        ObjCVarFA_Assets.mBarCode = Convert.ToString(dr["BarCode"].ToString());
                        ObjCVarFA_Assets.mPurchasingDate = Convert.ToDateTime(dr["PurchasingDate"].ToString());
                        ObjCVarFA_Assets.mPurchasingAmount = Convert.ToDecimal(dr["PurchasingAmount"].ToString());
                        ObjCVarFA_Assets.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarFA_Assets.mOpeningDepreciationAmount = Convert.ToDecimal(dr["OpeningDepreciationAmount"].ToString());
                        ObjCVarFA_Assets.mDepreciableAmount = Convert.ToDecimal(dr["DepreciableAmount"].ToString());
                        ObjCVarFA_Assets.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarFA_Assets.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarFA_Assets.mDevisonID = Convert.ToInt32(dr["DevisonID"].ToString());
                        ObjCVarFA_Assets.mIntialAmount = Convert.ToDecimal(dr["IntialAmount"].ToString());
                        ObjCVarFA_Assets.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarFA_Assets.mStartDepreciationDate = Convert.ToDateTime(dr["StartDepreciationDate"].ToString());
                        ObjCVarFA_Assets.mPurchasingAmountLocal = Convert.ToDecimal(dr["PurchasingAmountLocal"].ToString());
                        ObjCVarFA_Assets.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarFA_Assets.mBarCodeType = Convert.ToString(dr["BarCodeType"].ToString());
                        ObjCVarFA_Assets.mScrappingAmount = Convert.ToDecimal(dr["ScrappingAmount"].ToString());
                        ObjCVarFA_Assets.mIsNotDepreciable = Convert.ToBoolean(dr["IsNotDepreciable"].ToString());
                        ObjCVarFA_Assets.mDepreciationTypeID = Convert.ToInt32(dr["DepreciationTypeID"].ToString());
                        ObjCVarFA_Assets.mInvoiceID = Convert.ToInt32(dr["InvoiceID"].ToString());
                        ObjCVarFA_Assets.mSerialNo = Convert.ToInt64(dr["SerialNo"].ToString());
                        ObjCVarFA_Assets.mSC_TransactionDetailsID = Convert.ToInt32(dr["SC_TransactionDetailsID"].ToString());
                        ObjCVarFA_Assets.mIntialPercentage = Convert.ToDecimal(dr["IntialPercentage"].ToString());
                        ObjCVarFA_Assets.mAssetType = Convert.ToInt32(dr["AssetType"].ToString());
                        ObjCVarFA_Assets.mAssetAccount_ID = Convert.ToInt32(dr["AssetAccount_ID"].ToString());
                        ObjCVarFA_Assets.mAssetDepreciationAccount_ID = Convert.ToInt32(dr["AssetDepreciationAccount_ID"].ToString());
                        ObjCVarFA_Assets.mAssetAccumulatedDepreciationAccount_ID = Convert.ToInt32(dr["AssetAccumulatedDepreciationAccount_ID"].ToString());
                        ObjCVarFA_Assets.mPSInvoiceID = Convert.ToInt64(dr["PSInvoiceID"].ToString());
                        ObjCVarFA_Assets.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarFA_Assets.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarFA_Assets.mAssetCostCenter_ID = Convert.ToInt32(dr["AssetCostCenter_ID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarFA_Assets.Add(ObjCVarFA_Assets);
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
                    Com.CommandText = "[dbo].DeleteListFA_Assets";
                else
                    Com.CommandText = "[dbo].UpdateListFA_Assets";
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
        public Exception DeleteItem(List<CPKFA_Assets> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemFA_Assets";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKFA_Assets ObjCPKFA_Assets in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKFA_Assets.ID);
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
        public Exception SaveMethod(List<CVarFA_Assets> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@GroupID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Qty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Approved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@BarCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PurchasingDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PurchasingAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OpeningDepreciationAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DepreciableAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DepartmentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DevisonID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IntialAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@StartDepreciationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PurchasingAmountLocal", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@BarCodeType", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ScrappingAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@IsNotDepreciable", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@DepreciationTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@InvoiceID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SerialNo", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@SC_TransactionDetailsID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IntialPercentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@AssetType", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AssetAccount_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AssetDepreciationAccount_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AssetAccumulatedDepreciationAccount_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PSInvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ItemID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@JVID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@AssetCostCenter_ID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarFA_Assets ObjCVarFA_Assets in SaveList)
                {
                    if (ObjCVarFA_Assets.mIsChanges == true)
                    {
                        if (ObjCVarFA_Assets.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemFA_Assets";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarFA_Assets.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemFA_Assets";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarFA_Assets.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarFA_Assets.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarFA_Assets.Code;
                        Com.Parameters["@Name"].Value = ObjCVarFA_Assets.Name;
                        Com.Parameters["@GroupID"].Value = ObjCVarFA_Assets.GroupID;
                        Com.Parameters["@Qty"].Value = ObjCVarFA_Assets.Qty;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarFA_Assets.CurrencyID;
                        Com.Parameters["@Approved"].Value = ObjCVarFA_Assets.Approved;
                        Com.Parameters["@BarCode"].Value = ObjCVarFA_Assets.BarCode;
                        Com.Parameters["@PurchasingDate"].Value = ObjCVarFA_Assets.PurchasingDate;
                        Com.Parameters["@PurchasingAmount"].Value = ObjCVarFA_Assets.PurchasingAmount;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarFA_Assets.SubAccountID;
                        Com.Parameters["@OpeningDepreciationAmount"].Value = ObjCVarFA_Assets.OpeningDepreciationAmount;
                        Com.Parameters["@DepreciableAmount"].Value = ObjCVarFA_Assets.DepreciableAmount;
                        Com.Parameters["@BranchID"].Value = ObjCVarFA_Assets.BranchID;
                        Com.Parameters["@DepartmentID"].Value = ObjCVarFA_Assets.DepartmentID;
                        Com.Parameters["@DevisonID"].Value = ObjCVarFA_Assets.DevisonID;
                        Com.Parameters["@IntialAmount"].Value = ObjCVarFA_Assets.IntialAmount;
                        Com.Parameters["@CreationDate"].Value = ObjCVarFA_Assets.CreationDate;
                        Com.Parameters["@StartDepreciationDate"].Value = ObjCVarFA_Assets.StartDepreciationDate;
                        Com.Parameters["@PurchasingAmountLocal"].Value = ObjCVarFA_Assets.PurchasingAmountLocal;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarFA_Assets.ExchangeRate;
                        Com.Parameters["@BarCodeType"].Value = ObjCVarFA_Assets.BarCodeType;
                        Com.Parameters["@ScrappingAmount"].Value = ObjCVarFA_Assets.ScrappingAmount;
                        Com.Parameters["@IsNotDepreciable"].Value = ObjCVarFA_Assets.IsNotDepreciable;
                        Com.Parameters["@DepreciationTypeID"].Value = ObjCVarFA_Assets.DepreciationTypeID;
                        Com.Parameters["@InvoiceID"].Value = ObjCVarFA_Assets.InvoiceID;
                        Com.Parameters["@SerialNo"].Value = ObjCVarFA_Assets.SerialNo;
                        Com.Parameters["@SC_TransactionDetailsID"].Value = ObjCVarFA_Assets.SC_TransactionDetailsID;
                        Com.Parameters["@IntialPercentage"].Value = ObjCVarFA_Assets.IntialPercentage;
                        Com.Parameters["@AssetType"].Value = ObjCVarFA_Assets.AssetType;
                        Com.Parameters["@AssetAccount_ID"].Value = ObjCVarFA_Assets.AssetAccount_ID;
                        Com.Parameters["@AssetDepreciationAccount_ID"].Value = ObjCVarFA_Assets.AssetDepreciationAccount_ID;
                        Com.Parameters["@AssetAccumulatedDepreciationAccount_ID"].Value = ObjCVarFA_Assets.AssetAccumulatedDepreciationAccount_ID;
                        Com.Parameters["@PSInvoiceID"].Value = ObjCVarFA_Assets.PSInvoiceID;
                        Com.Parameters["@ItemID"].Value = ObjCVarFA_Assets.ItemID;
                        Com.Parameters["@JVID"].Value = ObjCVarFA_Assets.JVID;
                        Com.Parameters["@AssetCostCenter_ID"].Value = ObjCVarFA_Assets.AssetCostCenter_ID;
                        EndTrans(Com, Con);
                        if (ObjCVarFA_Assets.ID == 0)
                        {
                            ObjCVarFA_Assets.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarFA_Assets.mIsChanges = false;
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
