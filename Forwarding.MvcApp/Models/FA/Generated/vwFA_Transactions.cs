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
    public class CPKvwFA_Transactions
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
    public partial class CVarvwFA_Transactions : CPKvwFA_Transactions
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mTransactionTypeID;
        internal Decimal mAmount;
        internal DateTime mFromDate;
        internal DateTime mToDate;
        internal Int32 mQtyFactor;
        internal Decimal mQty;
        internal Boolean mIsApproved;
        internal String mNotes;
        internal Decimal mPercentage;
        internal Int32 mDepreciationTypeID;
        internal Int32 mAssetID;
        internal Int32 mJVID;
        internal Int32 mBranchID;
        internal Int32 mCode;
        internal String mAssetName;
        internal Int32 mDepartmentID;
        internal String mDepartmentName;
        internal Int32 mDevisonID;
        internal String mDevisonName;
        internal Int32 mGroupID;
        internal String mGroupName;
        internal Int32 mExludedTypeID;
        internal String mExludedTypeName;
        internal String mBarCode;
        internal String mBarCodeType;
        internal DateTime mPurchasingDate;
        internal Decimal mPurchasingAmountLocal;
        internal Decimal mOpeningDepreciationAmount;
        internal Decimal mScrappingAmount;
        internal String mAssetCode;
        internal Boolean mIsDeleted;
        internal Int32 mDepreciationID;
        internal DateTime mCreationDate;
        internal Int32 mUserID;
        internal Int32 mAmountFactor;
        internal String mBranchName;
        internal String mTransactionTypeName;
        internal Int32 mPeriodType;
        internal Decimal mLastQty;
        internal Decimal mLastAmount;
        internal Decimal mLastDepreciation;
        internal Int32 mAdditionAccountID;
        #endregion

        #region "Methods"
        public Int32 TransactionTypeID
        {
            get { return mTransactionTypeID; }
            set { mTransactionTypeID = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mAmount = value; }
        }
        public DateTime FromDate
        {
            get { return mFromDate; }
            set { mFromDate = value; }
        }
        public DateTime ToDate
        {
            get { return mToDate; }
            set { mToDate = value; }
        }
        public Int32 QtyFactor
        {
            get { return mQtyFactor; }
            set { mQtyFactor = value; }
        }
        public Decimal Qty
        {
            get { return mQty; }
            set { mQty = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsApproved = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Decimal Percentage
        {
            get { return mPercentage; }
            set { mPercentage = value; }
        }
        public Int32 DepreciationTypeID
        {
            get { return mDepreciationTypeID; }
            set { mDepreciationTypeID = value; }
        }
        public Int32 AssetID
        {
            get { return mAssetID; }
            set { mAssetID = value; }
        }
        public Int32 JVID
        {
            get { return mJVID; }
            set { mJVID = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mBranchID = value; }
        }
        public Int32 Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String AssetName
        {
            get { return mAssetName; }
            set { mAssetName = value; }
        }
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mDepartmentID = value; }
        }
        public String DepartmentName
        {
            get { return mDepartmentName; }
            set { mDepartmentName = value; }
        }
        public Int32 DevisonID
        {
            get { return mDevisonID; }
            set { mDevisonID = value; }
        }
        public String DevisonName
        {
            get { return mDevisonName; }
            set { mDevisonName = value; }
        }
        public Int32 GroupID
        {
            get { return mGroupID; }
            set { mGroupID = value; }
        }
        public String GroupName
        {
            get { return mGroupName; }
            set { mGroupName = value; }
        }
        public Int32 ExludedTypeID
        {
            get { return mExludedTypeID; }
            set { mExludedTypeID = value; }
        }
        public String ExludedTypeName
        {
            get { return mExludedTypeName; }
            set { mExludedTypeName = value; }
        }
        public String BarCode
        {
            get { return mBarCode; }
            set { mBarCode = value; }
        }
        public String BarCodeType
        {
            get { return mBarCodeType; }
            set { mBarCodeType = value; }
        }
        public DateTime PurchasingDate
        {
            get { return mPurchasingDate; }
            set { mPurchasingDate = value; }
        }
        public Decimal PurchasingAmountLocal
        {
            get { return mPurchasingAmountLocal; }
            set { mPurchasingAmountLocal = value; }
        }
        public Decimal OpeningDepreciationAmount
        {
            get { return mOpeningDepreciationAmount; }
            set { mOpeningDepreciationAmount = value; }
        }
        public Decimal ScrappingAmount
        {
            get { return mScrappingAmount; }
            set { mScrappingAmount = value; }
        }
        public String AssetCode
        {
            get { return mAssetCode; }
            set { mAssetCode = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public Int32 DepreciationID
        {
            get { return mDepreciationID; }
            set { mDepreciationID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public Int32 UserID
        {
            get { return mUserID; }
            set { mUserID = value; }
        }
        public Int32 AmountFactor
        {
            get { return mAmountFactor; }
            set { mAmountFactor = value; }
        }
        public String BranchName
        {
            get { return mBranchName; }
            set { mBranchName = value; }
        }
        public String TransactionTypeName
        {
            get { return mTransactionTypeName; }
            set { mTransactionTypeName = value; }
        }
        public Int32 PeriodType
        {
            get { return mPeriodType; }
            set { mPeriodType = value; }
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
        public Decimal LastDepreciation
        {
            get { return mLastDepreciation; }
            set { mLastDepreciation = value; }
        }
        public Int32 AdditionAccountID
        {
            get { return mAdditionAccountID; }
            set { mAdditionAccountID = value; }
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

    public partial class CvwFA_Transactions
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
        public List<CVarvwFA_Transactions> lstCVarvwFA_Transactions = new List<CVarvwFA_Transactions>();
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
            lstCVarvwFA_Transactions.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwFA_Transactions";
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
                        CVarvwFA_Transactions ObjCVarvwFA_Transactions = new CVarvwFA_Transactions();
                        ObjCVarvwFA_Transactions.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwFA_Transactions.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarvwFA_Transactions.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwFA_Transactions.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwFA_Transactions.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarvwFA_Transactions.mQtyFactor = Convert.ToInt32(dr["QtyFactor"].ToString());
                        ObjCVarvwFA_Transactions.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarvwFA_Transactions.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwFA_Transactions.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwFA_Transactions.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarvwFA_Transactions.mDepreciationTypeID = Convert.ToInt32(dr["DepreciationTypeID"].ToString());
                        ObjCVarvwFA_Transactions.mAssetID = Convert.ToInt32(dr["AssetID"].ToString());
                        ObjCVarvwFA_Transactions.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwFA_Transactions.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwFA_Transactions.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarvwFA_Transactions.mAssetName = Convert.ToString(dr["AssetName"].ToString());
                        ObjCVarvwFA_Transactions.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwFA_Transactions.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwFA_Transactions.mDevisonID = Convert.ToInt32(dr["DevisonID"].ToString());
                        ObjCVarvwFA_Transactions.mDevisonName = Convert.ToString(dr["DevisonName"].ToString());
                        ObjCVarvwFA_Transactions.mGroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarvwFA_Transactions.mGroupName = Convert.ToString(dr["GroupName"].ToString());
                        ObjCVarvwFA_Transactions.mExludedTypeID = Convert.ToInt32(dr["ExludedTypeID"].ToString());
                        ObjCVarvwFA_Transactions.mExludedTypeName = Convert.ToString(dr["ExludedTypeName"].ToString());
                        ObjCVarvwFA_Transactions.mBarCode = Convert.ToString(dr["BarCode"].ToString());
                        ObjCVarvwFA_Transactions.mBarCodeType = Convert.ToString(dr["BarCodeType"].ToString());
                        ObjCVarvwFA_Transactions.mPurchasingDate = Convert.ToDateTime(dr["PurchasingDate"].ToString());
                        ObjCVarvwFA_Transactions.mPurchasingAmountLocal = Convert.ToDecimal(dr["PurchasingAmountLocal"].ToString());
                        ObjCVarvwFA_Transactions.mOpeningDepreciationAmount = Convert.ToDecimal(dr["OpeningDepreciationAmount"].ToString());
                        ObjCVarvwFA_Transactions.mScrappingAmount = Convert.ToDecimal(dr["ScrappingAmount"].ToString());
                        ObjCVarvwFA_Transactions.mAssetCode = Convert.ToString(dr["AssetCode"].ToString());
                        ObjCVarvwFA_Transactions.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwFA_Transactions.mDepreciationID = Convert.ToInt32(dr["DepreciationID"].ToString());
                        ObjCVarvwFA_Transactions.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwFA_Transactions.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwFA_Transactions.mAmountFactor = Convert.ToInt32(dr["AmountFactor"].ToString());
                        ObjCVarvwFA_Transactions.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwFA_Transactions.mTransactionTypeName = Convert.ToString(dr["TransactionTypeName"].ToString());
                        ObjCVarvwFA_Transactions.mPeriodType = Convert.ToInt32(dr["PeriodType"].ToString());
                        ObjCVarvwFA_Transactions.mLastQty = Convert.ToDecimal(dr["LastQty"].ToString());
                        ObjCVarvwFA_Transactions.mLastAmount = Convert.ToDecimal(dr["LastAmount"].ToString());
                        ObjCVarvwFA_Transactions.mLastDepreciation = Convert.ToDecimal(dr["LastDepreciation"].ToString());
                        ObjCVarvwFA_Transactions.mAdditionAccountID = Convert.ToInt32(dr["AdditionAccountID"].ToString());
                        lstCVarvwFA_Transactions.Add(ObjCVarvwFA_Transactions);
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
            lstCVarvwFA_Transactions.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwFA_Transactions";
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
                        CVarvwFA_Transactions ObjCVarvwFA_Transactions = new CVarvwFA_Transactions();
                        ObjCVarvwFA_Transactions.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwFA_Transactions.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarvwFA_Transactions.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwFA_Transactions.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwFA_Transactions.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarvwFA_Transactions.mQtyFactor = Convert.ToInt32(dr["QtyFactor"].ToString());
                        ObjCVarvwFA_Transactions.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarvwFA_Transactions.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwFA_Transactions.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwFA_Transactions.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarvwFA_Transactions.mDepreciationTypeID = Convert.ToInt32(dr["DepreciationTypeID"].ToString());
                        ObjCVarvwFA_Transactions.mAssetID = Convert.ToInt32(dr["AssetID"].ToString());
                        ObjCVarvwFA_Transactions.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwFA_Transactions.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwFA_Transactions.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarvwFA_Transactions.mAssetName = Convert.ToString(dr["AssetName"].ToString());
                        ObjCVarvwFA_Transactions.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwFA_Transactions.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwFA_Transactions.mDevisonID = Convert.ToInt32(dr["DevisonID"].ToString());
                        ObjCVarvwFA_Transactions.mDevisonName = Convert.ToString(dr["DevisonName"].ToString());
                        ObjCVarvwFA_Transactions.mGroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarvwFA_Transactions.mGroupName = Convert.ToString(dr["GroupName"].ToString());
                        ObjCVarvwFA_Transactions.mExludedTypeID = Convert.ToInt32(dr["ExludedTypeID"].ToString());
                        ObjCVarvwFA_Transactions.mExludedTypeName = Convert.ToString(dr["ExludedTypeName"].ToString());
                        ObjCVarvwFA_Transactions.mBarCode = Convert.ToString(dr["BarCode"].ToString());
                        ObjCVarvwFA_Transactions.mBarCodeType = Convert.ToString(dr["BarCodeType"].ToString());
                        ObjCVarvwFA_Transactions.mPurchasingDate = Convert.ToDateTime(dr["PurchasingDate"].ToString());
                        ObjCVarvwFA_Transactions.mPurchasingAmountLocal = Convert.ToDecimal(dr["PurchasingAmountLocal"].ToString());
                        ObjCVarvwFA_Transactions.mOpeningDepreciationAmount = Convert.ToDecimal(dr["OpeningDepreciationAmount"].ToString());
                        ObjCVarvwFA_Transactions.mScrappingAmount = Convert.ToDecimal(dr["ScrappingAmount"].ToString());
                        ObjCVarvwFA_Transactions.mAssetCode = Convert.ToString(dr["AssetCode"].ToString());
                        ObjCVarvwFA_Transactions.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwFA_Transactions.mDepreciationID = Convert.ToInt32(dr["DepreciationID"].ToString());
                        ObjCVarvwFA_Transactions.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwFA_Transactions.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwFA_Transactions.mAmountFactor = Convert.ToInt32(dr["AmountFactor"].ToString());
                        ObjCVarvwFA_Transactions.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwFA_Transactions.mTransactionTypeName = Convert.ToString(dr["TransactionTypeName"].ToString());
                        ObjCVarvwFA_Transactions.mPeriodType = Convert.ToInt32(dr["PeriodType"].ToString());
                        ObjCVarvwFA_Transactions.mLastQty = Convert.ToDecimal(dr["LastQty"].ToString());
                        ObjCVarvwFA_Transactions.mLastAmount = Convert.ToDecimal(dr["LastAmount"].ToString());
                        ObjCVarvwFA_Transactions.mLastDepreciation = Convert.ToDecimal(dr["LastDepreciation"].ToString());
                        ObjCVarvwFA_Transactions.mAdditionAccountID = Convert.ToInt32(dr["AdditionAccountID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwFA_Transactions.Add(ObjCVarvwFA_Transactions);
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
