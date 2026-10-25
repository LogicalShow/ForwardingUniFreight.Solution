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
    public class CPKvwFA_Assets
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
    public partial class CVarvwFA_Assets : CPKvwFA_Assets
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
        internal Int64 mSerialNo;
        internal String mGroupName;
        internal String mBranchName;
        internal String mDevisonName;
        internal String mDepartmentName;
        internal String mCurrencyCode;
        internal String mNameBarCode;
        internal Boolean mHasTransaction;
        internal Decimal mLastQty;
        internal Decimal mLastAmount;
        internal DateTime mLastDepreciationDate;
        internal Boolean mIsExcluded;
        internal Decimal mDepreciationTotal;
        internal Decimal mAdditionsTotal;
        internal Decimal mExclusionsTotal;
        internal Decimal mAdditionsQty;
        internal Decimal mExclusionsQty;
        internal DateTime mExclusionDate;
        internal String mExclusionReason;
        internal DateTime mMinFromDate;
        internal Decimal mLastMonthAmount;
        internal DateTime mMaxToDate;
        internal Int32 mGroupParentSubAccountID;
        internal Int32 mGroupSubAccountID;
        internal Decimal mPercentage;
        internal Decimal mCost;
        internal Int32 mSC_TransactionDetailsID;
        internal Int32 mSC_TransactionID;
        internal String mSC_TransactionCode;
        internal String mSC_TransactionCodeManual;
        internal Int32 mAssetType;
        internal String mAssetAccountName;
        internal String mAssetAccumulatedDepreciationAccountName;
        internal String mAssetDepreciationAccountName;
        internal Int32 mAssetAccountID;
        internal Int32 mAssetAccumulatedDepreciationAccountID;
        internal Int32 mAssetDepreciationAccountID;
        internal Int64 mPSInvoiceID;
        internal Int64 mItemID;
        internal Int32 mAssetCostCenter_ID;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public Int32 GroupID
        {
            get { return mGroupID; }
            set { mGroupID = value; }
        }
        public Decimal Qty
        {
            get { return mQty; }
            set { mQty = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public Boolean Approved
        {
            get { return mApproved; }
            set { mApproved = value; }
        }
        public String BarCode
        {
            get { return mBarCode; }
            set { mBarCode = value; }
        }
        public DateTime PurchasingDate
        {
            get { return mPurchasingDate; }
            set { mPurchasingDate = value; }
        }
        public Decimal PurchasingAmount
        {
            get { return mPurchasingAmount; }
            set { mPurchasingAmount = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mSubAccountID = value; }
        }
        public Decimal OpeningDepreciationAmount
        {
            get { return mOpeningDepreciationAmount; }
            set { mOpeningDepreciationAmount = value; }
        }
        public Decimal DepreciableAmount
        {
            get { return mDepreciableAmount; }
            set { mDepreciableAmount = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mBranchID = value; }
        }
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mDepartmentID = value; }
        }
        public Int32 DevisonID
        {
            get { return mDevisonID; }
            set { mDevisonID = value; }
        }
        public Decimal IntialAmount
        {
            get { return mIntialAmount; }
            set { mIntialAmount = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public DateTime StartDepreciationDate
        {
            get { return mStartDepreciationDate; }
            set { mStartDepreciationDate = value; }
        }
        public Decimal PurchasingAmountLocal
        {
            get { return mPurchasingAmountLocal; }
            set { mPurchasingAmountLocal = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mExchangeRate = value; }
        }
        public String BarCodeType
        {
            get { return mBarCodeType; }
            set { mBarCodeType = value; }
        }
        public Decimal ScrappingAmount
        {
            get { return mScrappingAmount; }
            set { mScrappingAmount = value; }
        }
        public Boolean IsNotDepreciable
        {
            get { return mIsNotDepreciable; }
            set { mIsNotDepreciable = value; }
        }
        public Int32 DepreciationTypeID
        {
            get { return mDepreciationTypeID; }
            set { mDepreciationTypeID = value; }
        }
        public Int64 SerialNo
        {
            get { return mSerialNo; }
            set { mSerialNo = value; }
        }
        public String GroupName
        {
            get { return mGroupName; }
            set { mGroupName = value; }
        }
        public String BranchName
        {
            get { return mBranchName; }
            set { mBranchName = value; }
        }
        public String DevisonName
        {
            get { return mDevisonName; }
            set { mDevisonName = value; }
        }
        public String DepartmentName
        {
            get { return mDepartmentName; }
            set { mDepartmentName = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
        }
        public String NameBarCode
        {
            get { return mNameBarCode; }
            set { mNameBarCode = value; }
        }
        public Boolean HasTransaction
        {
            get { return mHasTransaction; }
            set { mHasTransaction = value; }
        }
        public Decimal LastQty
        {
            get { return mLastQty; }
            set { mLastQty = value; }
        }
        public Decimal LastAmount
        {
            get { return mLastAmount; }
            set { mLastAmount = value; }
        }
        public DateTime LastDepreciationDate
        {
            get { return mLastDepreciationDate; }
            set { mLastDepreciationDate = value; }
        }
        public Boolean IsExcluded
        {
            get { return mIsExcluded; }
            set { mIsExcluded = value; }
        }
        public Decimal DepreciationTotal
        {
            get { return mDepreciationTotal; }
            set { mDepreciationTotal = value; }
        }
        public Decimal AdditionsTotal
        {
            get { return mAdditionsTotal; }
            set { mAdditionsTotal = value; }
        }
        public Decimal ExclusionsTotal
        {
            get { return mExclusionsTotal; }
            set { mExclusionsTotal = value; }
        }
        public Decimal AdditionsQty
        {
            get { return mAdditionsQty; }
            set { mAdditionsQty = value; }
        }
        public Decimal ExclusionsQty
        {
            get { return mExclusionsQty; }
            set { mExclusionsQty = value; }
        }
        public DateTime ExclusionDate
        {
            get { return mExclusionDate; }
            set { mExclusionDate = value; }
        }
        public String ExclusionReason
        {
            get { return mExclusionReason; }
            set { mExclusionReason = value; }
        }
        public DateTime MinFromDate
        {
            get { return mMinFromDate; }
            set { mMinFromDate = value; }
        }
        public Decimal LastMonthAmount
        {
            get { return mLastMonthAmount; }
            set { mLastMonthAmount = value; }
        }
        public DateTime MaxToDate
        {
            get { return mMaxToDate; }
            set { mMaxToDate = value; }
        }
        public Int32 GroupParentSubAccountID
        {
            get { return mGroupParentSubAccountID; }
            set { mGroupParentSubAccountID = value; }
        }
        public Int32 GroupSubAccountID
        {
            get { return mGroupSubAccountID; }
            set { mGroupSubAccountID = value; }
        }
        public Decimal Percentage
        {
            get { return mPercentage; }
            set { mPercentage = value; }
        }
        public Decimal Cost
        {
            get { return mCost; }
            set { mCost = value; }
        }
        public Int32 SC_TransactionDetailsID
        {
            get { return mSC_TransactionDetailsID; }
            set { mSC_TransactionDetailsID = value; }
        }
        public Int32 SC_TransactionID
        {
            get { return mSC_TransactionID; }
            set { mSC_TransactionID = value; }
        }
        public String SC_TransactionCode
        {
            get { return mSC_TransactionCode; }
            set { mSC_TransactionCode = value; }
        }
        public String SC_TransactionCodeManual
        {
            get { return mSC_TransactionCodeManual; }
            set { mSC_TransactionCodeManual = value; }
        }
        public Int32 AssetType
        {
            get { return mAssetType; }
            set { mAssetType = value; }
        }
        public String AssetAccountName
        {
            get { return mAssetAccountName; }
            set { mAssetAccountName = value; }
        }
        public String AssetAccumulatedDepreciationAccountName
        {
            get { return mAssetAccumulatedDepreciationAccountName; }
            set { mAssetAccumulatedDepreciationAccountName = value; }
        }
        public String AssetDepreciationAccountName
        {
            get { return mAssetDepreciationAccountName; }
            set { mAssetDepreciationAccountName = value; }
        }
        public Int32 AssetAccountID
        {
            get { return mAssetAccountID; }
            set { mAssetAccountID = value; }
        }
        public Int32 AssetAccumulatedDepreciationAccountID
        {
            get { return mAssetAccumulatedDepreciationAccountID; }
            set { mAssetAccumulatedDepreciationAccountID = value; }
        }
        public Int32 AssetDepreciationAccountID
        {
            get { return mAssetDepreciationAccountID; }
            set { mAssetDepreciationAccountID = value; }
        }
        public Int64 PSInvoiceID
        {
            get { return mPSInvoiceID; }
            set { mPSInvoiceID = value; }
        }
        public Int64 ItemID
        {
            get { return mItemID; }
            set { mItemID = value; }
        }
        public Int32 AssetCostCenter_ID
        {
            get { return mAssetCostCenter_ID; }
            set { mAssetCostCenter_ID = value; }
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

    public partial class CvwFA_Assets
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
        public List<CVarvwFA_Assets> lstCVarvwFA_Assets = new List<CVarvwFA_Assets>();
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
            lstCVarvwFA_Assets.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwFA_Assets";
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
                        CVarvwFA_Assets ObjCVarvwFA_Assets = new CVarvwFA_Assets();
                        ObjCVarvwFA_Assets.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwFA_Assets.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwFA_Assets.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwFA_Assets.mGroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarvwFA_Assets.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarvwFA_Assets.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwFA_Assets.mApproved = Convert.ToBoolean(dr["Approved"].ToString());
                        ObjCVarvwFA_Assets.mBarCode = Convert.ToString(dr["BarCode"].ToString());
                        ObjCVarvwFA_Assets.mPurchasingDate = Convert.ToDateTime(dr["PurchasingDate"].ToString());
                        ObjCVarvwFA_Assets.mPurchasingAmount = Convert.ToDecimal(dr["PurchasingAmount"].ToString());
                        ObjCVarvwFA_Assets.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwFA_Assets.mOpeningDepreciationAmount = Convert.ToDecimal(dr["OpeningDepreciationAmount"].ToString());
                        ObjCVarvwFA_Assets.mDepreciableAmount = Convert.ToDecimal(dr["DepreciableAmount"].ToString());
                        ObjCVarvwFA_Assets.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwFA_Assets.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwFA_Assets.mDevisonID = Convert.ToInt32(dr["DevisonID"].ToString());
                        ObjCVarvwFA_Assets.mIntialAmount = Convert.ToDecimal(dr["IntialAmount"].ToString());
                        ObjCVarvwFA_Assets.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwFA_Assets.mStartDepreciationDate = Convert.ToDateTime(dr["StartDepreciationDate"].ToString());
                        ObjCVarvwFA_Assets.mPurchasingAmountLocal = Convert.ToDecimal(dr["PurchasingAmountLocal"].ToString());
                        ObjCVarvwFA_Assets.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwFA_Assets.mBarCodeType = Convert.ToString(dr["BarCodeType"].ToString());
                        ObjCVarvwFA_Assets.mScrappingAmount = Convert.ToDecimal(dr["ScrappingAmount"].ToString());
                        ObjCVarvwFA_Assets.mIsNotDepreciable = Convert.ToBoolean(dr["IsNotDepreciable"].ToString());
                        ObjCVarvwFA_Assets.mDepreciationTypeID = Convert.ToInt32(dr["DepreciationTypeID"].ToString());
                        ObjCVarvwFA_Assets.mSerialNo = Convert.ToInt64(dr["SerialNo"].ToString());
                        ObjCVarvwFA_Assets.mGroupName = Convert.ToString(dr["GroupName"].ToString());
                        ObjCVarvwFA_Assets.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwFA_Assets.mDevisonName = Convert.ToString(dr["DevisonName"].ToString());
                        ObjCVarvwFA_Assets.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwFA_Assets.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwFA_Assets.mNameBarCode = Convert.ToString(dr["NameBarCode"].ToString());
                        ObjCVarvwFA_Assets.mHasTransaction = Convert.ToBoolean(dr["HasTransaction"].ToString());
                        ObjCVarvwFA_Assets.mLastQty = Convert.ToDecimal(dr["LastQty"].ToString());
                        ObjCVarvwFA_Assets.mLastAmount = Convert.ToDecimal(dr["LastAmount"].ToString());
                        ObjCVarvwFA_Assets.mLastDepreciationDate = Convert.ToDateTime(dr["LastDepreciationDate"].ToString());
                        ObjCVarvwFA_Assets.mIsExcluded = Convert.ToBoolean(dr["IsExcluded"].ToString());
                        ObjCVarvwFA_Assets.mDepreciationTotal = Convert.ToDecimal(dr["DepreciationTotal"].ToString());
                        ObjCVarvwFA_Assets.mAdditionsTotal = Convert.ToDecimal(dr["AdditionsTotal"].ToString());
                        ObjCVarvwFA_Assets.mExclusionsTotal = Convert.ToDecimal(dr["ExclusionsTotal"].ToString());
                        ObjCVarvwFA_Assets.mAdditionsQty = Convert.ToDecimal(dr["AdditionsQty"].ToString());
                        ObjCVarvwFA_Assets.mExclusionsQty = Convert.ToDecimal(dr["ExclusionsQty"].ToString());
                        ObjCVarvwFA_Assets.mExclusionDate = Convert.ToDateTime(dr["ExclusionDate"].ToString());
                        ObjCVarvwFA_Assets.mExclusionReason = Convert.ToString(dr["ExclusionReason"].ToString());
                        ObjCVarvwFA_Assets.mMinFromDate = Convert.ToDateTime(dr["MinFromDate"].ToString());
                        ObjCVarvwFA_Assets.mLastMonthAmount = Convert.ToDecimal(dr["LastMonthAmount"].ToString());
                        ObjCVarvwFA_Assets.mMaxToDate = Convert.ToDateTime(dr["MaxToDate"].ToString());
                        ObjCVarvwFA_Assets.mGroupParentSubAccountID = Convert.ToInt32(dr["GroupParentSubAccountID"].ToString());
                        ObjCVarvwFA_Assets.mGroupSubAccountID = Convert.ToInt32(dr["GroupSubAccountID"].ToString());
                        ObjCVarvwFA_Assets.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarvwFA_Assets.mCost = Convert.ToDecimal(dr["Cost"].ToString());
                        ObjCVarvwFA_Assets.mSC_TransactionDetailsID = Convert.ToInt32(dr["SC_TransactionDetailsID"].ToString());
                        ObjCVarvwFA_Assets.mSC_TransactionID = Convert.ToInt32(dr["SC_TransactionID"].ToString());
                        ObjCVarvwFA_Assets.mSC_TransactionCode = Convert.ToString(dr["SC_TransactionCode"].ToString());
                        ObjCVarvwFA_Assets.mSC_TransactionCodeManual = Convert.ToString(dr["SC_TransactionCodeManual"].ToString());
                        ObjCVarvwFA_Assets.mAssetType = Convert.ToInt32(dr["AssetType"].ToString());
                        ObjCVarvwFA_Assets.mAssetAccountName = Convert.ToString(dr["AssetAccountName"].ToString());
                        ObjCVarvwFA_Assets.mAssetAccumulatedDepreciationAccountName = Convert.ToString(dr["AssetAccumulatedDepreciationAccountName"].ToString());
                        ObjCVarvwFA_Assets.mAssetDepreciationAccountName = Convert.ToString(dr["AssetDepreciationAccountName"].ToString());
                        ObjCVarvwFA_Assets.mAssetAccountID = Convert.ToInt32(dr["AssetAccountID"].ToString());
                        ObjCVarvwFA_Assets.mAssetAccumulatedDepreciationAccountID = Convert.ToInt32(dr["AssetAccumulatedDepreciationAccountID"].ToString());
                        ObjCVarvwFA_Assets.mAssetDepreciationAccountID = Convert.ToInt32(dr["AssetDepreciationAccountID"].ToString());
                        ObjCVarvwFA_Assets.mPSInvoiceID = Convert.ToInt64(dr["PSInvoiceID"].ToString());
                        ObjCVarvwFA_Assets.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarvwFA_Assets.mAssetCostCenter_ID = Convert.ToInt32(dr["AssetCostCenter_ID"].ToString());
                        lstCVarvwFA_Assets.Add(ObjCVarvwFA_Assets);
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
            lstCVarvwFA_Assets.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwFA_Assets";
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
                        CVarvwFA_Assets ObjCVarvwFA_Assets = new CVarvwFA_Assets();
                        ObjCVarvwFA_Assets.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwFA_Assets.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwFA_Assets.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwFA_Assets.mGroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarvwFA_Assets.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarvwFA_Assets.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwFA_Assets.mApproved = Convert.ToBoolean(dr["Approved"].ToString());
                        ObjCVarvwFA_Assets.mBarCode = Convert.ToString(dr["BarCode"].ToString());
                        ObjCVarvwFA_Assets.mPurchasingDate = Convert.ToDateTime(dr["PurchasingDate"].ToString());
                        ObjCVarvwFA_Assets.mPurchasingAmount = Convert.ToDecimal(dr["PurchasingAmount"].ToString());
                        ObjCVarvwFA_Assets.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwFA_Assets.mOpeningDepreciationAmount = Convert.ToDecimal(dr["OpeningDepreciationAmount"].ToString());
                        ObjCVarvwFA_Assets.mDepreciableAmount = Convert.ToDecimal(dr["DepreciableAmount"].ToString());
                        ObjCVarvwFA_Assets.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwFA_Assets.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwFA_Assets.mDevisonID = Convert.ToInt32(dr["DevisonID"].ToString());
                        ObjCVarvwFA_Assets.mIntialAmount = Convert.ToDecimal(dr["IntialAmount"].ToString());
                        ObjCVarvwFA_Assets.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwFA_Assets.mStartDepreciationDate = Convert.ToDateTime(dr["StartDepreciationDate"].ToString());
                        ObjCVarvwFA_Assets.mPurchasingAmountLocal = Convert.ToDecimal(dr["PurchasingAmountLocal"].ToString());
                        ObjCVarvwFA_Assets.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwFA_Assets.mBarCodeType = Convert.ToString(dr["BarCodeType"].ToString());
                        ObjCVarvwFA_Assets.mScrappingAmount = Convert.ToDecimal(dr["ScrappingAmount"].ToString());
                        ObjCVarvwFA_Assets.mIsNotDepreciable = Convert.ToBoolean(dr["IsNotDepreciable"].ToString());
                        ObjCVarvwFA_Assets.mDepreciationTypeID = Convert.ToInt32(dr["DepreciationTypeID"].ToString());
                        ObjCVarvwFA_Assets.mSerialNo = Convert.ToInt64(dr["SerialNo"].ToString());
                        ObjCVarvwFA_Assets.mGroupName = Convert.ToString(dr["GroupName"].ToString());
                        ObjCVarvwFA_Assets.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwFA_Assets.mDevisonName = Convert.ToString(dr["DevisonName"].ToString());
                        ObjCVarvwFA_Assets.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwFA_Assets.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwFA_Assets.mNameBarCode = Convert.ToString(dr["NameBarCode"].ToString());
                        ObjCVarvwFA_Assets.mHasTransaction = Convert.ToBoolean(dr["HasTransaction"].ToString());
                        ObjCVarvwFA_Assets.mLastQty = Convert.ToDecimal(dr["LastQty"].ToString());
                        ObjCVarvwFA_Assets.mLastAmount = Convert.ToDecimal(dr["LastAmount"].ToString());
                        ObjCVarvwFA_Assets.mLastDepreciationDate = Convert.ToDateTime(dr["LastDepreciationDate"].ToString());
                        ObjCVarvwFA_Assets.mIsExcluded = Convert.ToBoolean(dr["IsExcluded"].ToString());
                        ObjCVarvwFA_Assets.mDepreciationTotal = Convert.ToDecimal(dr["DepreciationTotal"].ToString());
                        ObjCVarvwFA_Assets.mAdditionsTotal = Convert.ToDecimal(dr["AdditionsTotal"].ToString());
                        ObjCVarvwFA_Assets.mExclusionsTotal = Convert.ToDecimal(dr["ExclusionsTotal"].ToString());
                        ObjCVarvwFA_Assets.mAdditionsQty = Convert.ToDecimal(dr["AdditionsQty"].ToString());
                        ObjCVarvwFA_Assets.mExclusionsQty = Convert.ToDecimal(dr["ExclusionsQty"].ToString());
                        ObjCVarvwFA_Assets.mExclusionDate = Convert.ToDateTime(dr["ExclusionDate"].ToString());
                        ObjCVarvwFA_Assets.mExclusionReason = Convert.ToString(dr["ExclusionReason"].ToString());
                        ObjCVarvwFA_Assets.mMinFromDate = Convert.ToDateTime(dr["MinFromDate"].ToString());
                        ObjCVarvwFA_Assets.mLastMonthAmount = Convert.ToDecimal(dr["LastMonthAmount"].ToString());
                        ObjCVarvwFA_Assets.mMaxToDate = Convert.ToDateTime(dr["MaxToDate"].ToString());
                        ObjCVarvwFA_Assets.mGroupParentSubAccountID = Convert.ToInt32(dr["GroupParentSubAccountID"].ToString());
                        ObjCVarvwFA_Assets.mGroupSubAccountID = Convert.ToInt32(dr["GroupSubAccountID"].ToString());
                        ObjCVarvwFA_Assets.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarvwFA_Assets.mCost = Convert.ToDecimal(dr["Cost"].ToString());
                        ObjCVarvwFA_Assets.mSC_TransactionDetailsID = Convert.ToInt32(dr["SC_TransactionDetailsID"].ToString());
                        ObjCVarvwFA_Assets.mSC_TransactionID = Convert.ToInt32(dr["SC_TransactionID"].ToString());
                        ObjCVarvwFA_Assets.mSC_TransactionCode = Convert.ToString(dr["SC_TransactionCode"].ToString());
                        ObjCVarvwFA_Assets.mSC_TransactionCodeManual = Convert.ToString(dr["SC_TransactionCodeManual"].ToString());
                        ObjCVarvwFA_Assets.mAssetType = Convert.ToInt32(dr["AssetType"].ToString());
                        ObjCVarvwFA_Assets.mAssetAccountName = Convert.ToString(dr["AssetAccountName"].ToString());
                        ObjCVarvwFA_Assets.mAssetAccumulatedDepreciationAccountName = Convert.ToString(dr["AssetAccumulatedDepreciationAccountName"].ToString());
                        ObjCVarvwFA_Assets.mAssetDepreciationAccountName = Convert.ToString(dr["AssetDepreciationAccountName"].ToString());
                        ObjCVarvwFA_Assets.mAssetAccountID = Convert.ToInt32(dr["AssetAccountID"].ToString());
                        ObjCVarvwFA_Assets.mAssetAccumulatedDepreciationAccountID = Convert.ToInt32(dr["AssetAccumulatedDepreciationAccountID"].ToString());
                        ObjCVarvwFA_Assets.mAssetDepreciationAccountID = Convert.ToInt32(dr["AssetDepreciationAccountID"].ToString());
                        ObjCVarvwFA_Assets.mPSInvoiceID = Convert.ToInt64(dr["PSInvoiceID"].ToString());
                        ObjCVarvwFA_Assets.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarvwFA_Assets.mAssetCostCenter_ID = Convert.ToInt32(dr["AssetCostCenter_ID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwFA_Assets.Add(ObjCVarvwFA_Assets);
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
