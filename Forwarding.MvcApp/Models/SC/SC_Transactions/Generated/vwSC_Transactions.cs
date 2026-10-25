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
    public class CPKvwSC_Transactions
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
    public partial class CVarvwSC_Transactions : CPKvwSC_Transactions
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mCodeManual;
        internal DateTime mTransactionDate;
        internal Int64 mPurchaseInvoiceID;
        internal Int32 mPurchaseOrderID;
        internal Int32 mExaminationID;
        internal Boolean mIsApproved;
        internal String mNotes;
        internal Int64 mSLInvoiceID;
        internal Int32 mDepartmentID;
        internal Int32 mClientID;
        internal Int32 mCostCenterID;
        internal Boolean mIsSpareParts;
        internal Int32 mFiscalYearID;
        internal Int32 mSupplierID;
        internal Int32 mParentID;
        internal Int32 mTransactionTypeID;
        internal Int64 mJV_ID;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Boolean mIsDeleted;
        internal Boolean mIsOutOfStore;
        internal Int32 mMaterialIssueRequesitionsID;
        internal Boolean mIsClosed;
        internal Int32 mEntitlementDays;
        internal Int32 mFromStore;
        internal DateTime mP_StartDate;
        internal DateTime mP_FinishedDate;
        internal Int64 mPurchaseInvoiceOpeningBalanceID;
        internal Decimal mP_Qty;
        internal Int32 mP_LineID;
        internal Int64 mP_ItemID;
        internal Int32 mP_UnitID;
        internal Int32 mP_ProductionRequestID;
        internal Int32 mToStoreID;
        internal Int64 mJV_ID2;
        internal Int32 mTransferParentID;
        internal Int64 mForwardingPSInvoiceID;
        internal Int64 mSupplyOrderID;
        internal String mTransactionType;
        internal Decimal mAmount;
        internal String mPartnerName;
        internal String mInvoiceNo;
        internal String mFromStoreName;
        internal String mToStoreName;
        internal String mHeaderItemName;
        internal String mHeaderItemCode;
        internal String mParentTransCode;
        internal String mParentTransTypeName;
        internal String mMaterialRequestCode;
        internal String mMaterialRequesTypeName;
        internal Boolean mIsBrokerStore;
        internal Boolean mHasChildren;
        internal Int64 mOperationID;
        internal Int32 mBranchID;
        internal Boolean mIsFromFlexi;
        internal String mOperationCode;
        internal Int64 mPayableID;
        internal String mBranchName;
        internal String mBranchCode;
        internal String mStoresAndRemainedItemsQty;
        internal Int32 mTrailerID;
        internal Int32 mEquipmentID;
        internal Int32 mDivisionID;
        internal String mSourceOfTransactionName;
        internal String mTrailerName;
        internal Int32 mTrailerCode;
        internal String mEquipmentName;
        internal Int32 mEquipmentCode;
        internal String mDevisonName;
        internal String mDevisonCode;
        internal String mDepartmentName;
        internal String mDepartmentCode;
        internal Decimal mTotalExpenses;
        internal String mItemsDestintions;
        internal String mItemsDestintionsLocal;
        internal Int32 mInvoiceBranchID;
        internal String mInvoiceBranchName;
        internal Boolean misconfirm;
        internal Int32 mAccountID;
        internal Int32 mSubAccountID;

        // add manual Abdoo 
        internal String mTAmount  ;
        internal String mCardNo;
        internal String mTotalQty;
        internal Int32  mTruckerID;
        internal String mParentCode;


        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String CodeManual
        {
            get { return mCodeManual; }
            set { mCodeManual = value; }
        }
        public DateTime TransactionDate
        {
            get { return mTransactionDate; }
            set { mTransactionDate = value; }
        }
        public Int64 PurchaseInvoiceID
        {
            get { return mPurchaseInvoiceID; }
            set { mPurchaseInvoiceID = value; }
        }
        public Int32 PurchaseOrderID
        {
            get { return mPurchaseOrderID; }
            set { mPurchaseOrderID = value; }
        }
        public Int32 ExaminationID
        {
            get { return mExaminationID; }
            set { mExaminationID = value; }
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
        public Int64 SLInvoiceID
        {
            get { return mSLInvoiceID; }
            set { mSLInvoiceID = value; }
        }
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mDepartmentID = value; }
        }
        public Int32 ClientID
        {
            get { return mClientID; }
            set { mClientID = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mCostCenterID = value; }
        }
        public Boolean IsSpareParts
        {
            get { return mIsSpareParts; }
            set { mIsSpareParts = value; }
        }
        public Int32 FiscalYearID
        {
            get { return mFiscalYearID; }
            set { mFiscalYearID = value; }
        }
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mSupplierID = value; }
        }
        public Int32 ParentID
        {
            get { return mParentID; }
            set { mParentID = value; }
        }
        public Int32 TransactionTypeID
        {
            get { return mTransactionTypeID; }
            set { mTransactionTypeID = value; }
        }
        public Int64 JV_ID
        {
            get { return mJV_ID; }
            set { mJV_ID = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mModificationDate = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public Boolean IsOutOfStore
        {
            get { return mIsOutOfStore; }
            set { mIsOutOfStore = value; }
        }
        public Int32 MaterialIssueRequesitionsID
        {
            get { return mMaterialIssueRequesitionsID; }
            set { mMaterialIssueRequesitionsID = value; }
        }
        public Boolean IsClosed
        {
            get { return mIsClosed; }
            set { mIsClosed = value; }
        }
        public Int32 EntitlementDays
        {
            get { return mEntitlementDays; }
            set { mEntitlementDays = value; }
        }
        public Int32 FromStore
        {
            get { return mFromStore; }
            set { mFromStore = value; }
        }
        public DateTime P_StartDate
        {
            get { return mP_StartDate; }
            set { mP_StartDate = value; }
        }
        public DateTime P_FinishedDate
        {
            get { return mP_FinishedDate; }
            set { mP_FinishedDate = value; }
        }
        public Int64 PurchaseInvoiceOpeningBalanceID
        {
            get { return mPurchaseInvoiceOpeningBalanceID; }
            set { mPurchaseInvoiceOpeningBalanceID = value; }
        }
        public Decimal P_Qty
        {
            get { return mP_Qty; }
            set { mP_Qty = value; }
        }
        public Int32 P_LineID
        {
            get { return mP_LineID; }
            set { mP_LineID = value; }
        }
        public Int64 P_ItemID
        {
            get { return mP_ItemID; }
            set { mP_ItemID = value; }
        }
        public Int32 P_UnitID
        {
            get { return mP_UnitID; }
            set { mP_UnitID = value; }
        }
        public Int32 P_ProductionRequestID
        {
            get { return mP_ProductionRequestID; }
            set { mP_ProductionRequestID = value; }
        }
        public Int32 ToStoreID
        {
            get { return mToStoreID; }
            set { mToStoreID = value; }
        }
        public Int64 JV_ID2
        {
            get { return mJV_ID2; }
            set { mJV_ID2 = value; }
        }
        public Int32 TransferParentID
        {
            get { return mTransferParentID; }
            set { mTransferParentID = value; }
        }
        public Int64 ForwardingPSInvoiceID
        {
            get { return mForwardingPSInvoiceID; }
            set { mForwardingPSInvoiceID = value; }
        }
        public Int64 SupplyOrderID
        {
            get { return mSupplyOrderID; }
            set { mSupplyOrderID = value; }
        }
        public String TransactionType
        {
            get { return mTransactionType; }
            set { mTransactionType = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mAmount = value; }
        }
        public String PartnerName
        {
            get { return mPartnerName; }
            set { mPartnerName = value; }
        }
        public String InvoiceNo
        {
            get { return mInvoiceNo; }
            set { mInvoiceNo = value; }
        }
        public String FromStoreName
        {
            get { return mFromStoreName; }
            set { mFromStoreName = value; }
        }
        public String ToStoreName
        {
            get { return mToStoreName; }
            set { mToStoreName = value; }
        }
        public String HeaderItemName
        {
            get { return mHeaderItemName; }
            set { mHeaderItemName = value; }
        }
        public String HeaderItemCode
        {
            get { return mHeaderItemCode; }
            set { mHeaderItemCode = value; }
        }
        public String ParentTransCode
        {
            get { return mParentTransCode; }
            set { mParentTransCode = value; }
        }
        public String ParentTransTypeName
        {
            get { return mParentTransTypeName; }
            set { mParentTransTypeName = value; }
        }
        public String MaterialRequestCode
        {
            get { return mMaterialRequestCode; }
            set { mMaterialRequestCode = value; }
        }
        public String MaterialRequesTypeName
        {
            get { return mMaterialRequesTypeName; }
            set { mMaterialRequesTypeName = value; }
        }
        public Boolean IsBrokerStore
        {
            get { return mIsBrokerStore; }
            set { mIsBrokerStore = value; }
        }
        public Boolean HasChildren
        {
            get { return mHasChildren; }
            set { mHasChildren = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mBranchID = value; }
        }
        public Boolean IsFromFlexi
        {
            get { return mIsFromFlexi; }
            set { mIsFromFlexi = value; }
        }
        public String OperationCode
        {
            get { return mOperationCode; }
            set { mOperationCode = value; }
        }
        public Int64 PayableID
        {
            get { return mPayableID; }
            set { mPayableID = value; }
        }
        public String BranchName
        {
            get { return mBranchName; }
            set { mBranchName = value; }
        }
        public String BranchCode
        {
            get { return mBranchCode; }
            set { mBranchCode = value; }
        }
        public String StoresAndRemainedItemsQty
        {
            get { return mStoresAndRemainedItemsQty; }
            set { mStoresAndRemainedItemsQty = value; }
        }
        public Int32 TrailerID
        {
            get { return mTrailerID; }
            set { mTrailerID = value; }
        }
        public Int32 EquipmentID
        {
            get { return mEquipmentID; }
            set { mEquipmentID = value; }
        }
        public Int32 DivisionID
        {
            get { return mDivisionID; }
            set { mDivisionID = value; }
        }
        public String SourceOfTransactionName
        {
            get { return mSourceOfTransactionName; }
            set { mSourceOfTransactionName = value; }
        }
        public String TrailerName
        {
            get { return mTrailerName; }
            set { mTrailerName = value; }
        }
        public Int32 TrailerCode
        {
            get { return mTrailerCode; }
            set { mTrailerCode = value; }
        }
        public String EquipmentName
        {
            get { return mEquipmentName; }
            set { mEquipmentName = value; }
        }
        public Int32 EquipmentCode
        {
            get { return mEquipmentCode; }
            set { mEquipmentCode = value; }
        }
        public String DevisonName
        {
            get { return mDevisonName; }
            set { mDevisonName = value; }
        }
        public String DevisonCode
        {
            get { return mDevisonCode; }
            set { mDevisonCode = value; }
        }
        public String DepartmentName
        {
            get { return mDepartmentName; }
            set { mDepartmentName = value; }
        }
        public String DepartmentCode
        {
            get { return mDepartmentCode; }
            set { mDepartmentCode = value; }
        }
        public Decimal TotalExpenses
        {
            get { return mTotalExpenses; }
            set { mTotalExpenses = value; }
        }
        public String ItemsDestintions
        {
            get { return mItemsDestintions; }
            set { mItemsDestintions = value; }
        }
        public String ItemsDestintionsLocal
        {
            get { return mItemsDestintionsLocal; }
            set { mItemsDestintionsLocal = value; }
        }
        
        public Int32 InvoiceBranchID
        {
            get { return mInvoiceBranchID; }
            set { mInvoiceBranchID = value; }
        }
        public String InvoiceBranchName
        {
            get { return mInvoiceBranchName; }
            set { mInvoiceBranchName = value; }
        }

        public Boolean isconfirm
        {
            get { return misconfirm; }
            set { misconfirm = value; }
        }
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mAccountID = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mSubAccountID = value; }
        }

        // add manual Abdoo

 
        public String TAmount
        {
            get { return mTAmount; }
            set { mTAmount = value; }
        }
        public String CardNo
        {
            get { return mCardNo; }
            set { mCardNo = value; }
        }
        public String TotalQty
        {
            get { return mTotalQty; }
            set { mTotalQty = value; }
        }
        public Int32 TruckerID
        {
            get { return mTruckerID; }
            set { mTruckerID = value; }
        }

        public String ParentCode
        {
            get { return mParentCode; }
            set { mParentCode = value; }
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

    public partial class CvwSC_Transactions
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
        public List<CVarvwSC_Transactions> lstCVarvwSC_Transactions = new List<CVarvwSC_Transactions>();
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
        public Exception GetListPagingEGL(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFillEGL(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwSC_Transactions.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSC_Transactions";
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
                        CVarvwSC_Transactions ObjCVarvwSC_Transactions = new CVarvwSC_Transactions();
                        ObjCVarvwSC_Transactions.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSC_Transactions.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwSC_Transactions.mCodeManual = Convert.ToString(dr["CodeManual"].ToString());
                        ObjCVarvwSC_Transactions.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarvwSC_Transactions.mPurchaseInvoiceID = Convert.ToInt64(dr["PurchaseInvoiceID"].ToString());
                        ObjCVarvwSC_Transactions.mPurchaseOrderID = Convert.ToInt32(dr["PurchaseOrderID"].ToString());
                        ObjCVarvwSC_Transactions.mExaminationID = Convert.ToInt32(dr["ExaminationID"].ToString());
                        ObjCVarvwSC_Transactions.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwSC_Transactions.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSC_Transactions.mSLInvoiceID = Convert.ToInt64(dr["SLInvoiceID"].ToString());
                        ObjCVarvwSC_Transactions.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwSC_Transactions.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwSC_Transactions.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwSC_Transactions.mIsSpareParts = Convert.ToBoolean(dr["IsSpareParts"].ToString());
                        ObjCVarvwSC_Transactions.mFiscalYearID = Convert.ToInt32(dr["FiscalYearID"].ToString());
                        ObjCVarvwSC_Transactions.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwSC_Transactions.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarvwSC_Transactions.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarvwSC_Transactions.mJV_ID = Convert.ToInt64(dr["JV_ID"].ToString());
                        ObjCVarvwSC_Transactions.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwSC_Transactions.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwSC_Transactions.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwSC_Transactions.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwSC_Transactions.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwSC_Transactions.mIsOutOfStore = Convert.ToBoolean(dr["IsOutOfStore"].ToString());
                        ObjCVarvwSC_Transactions.mMaterialIssueRequesitionsID = Convert.ToInt32(dr["MaterialIssueRequesitionsID"].ToString());
                        ObjCVarvwSC_Transactions.mIsClosed = Convert.ToBoolean(dr["IsClosed"].ToString());
                        ObjCVarvwSC_Transactions.mEntitlementDays = Convert.ToInt32(dr["EntitlementDays"].ToString());
                        ObjCVarvwSC_Transactions.mFromStore = Convert.ToInt32(dr["FromStore"].ToString());
                        ObjCVarvwSC_Transactions.mP_StartDate = Convert.ToDateTime(dr["P_StartDate"].ToString());
                        ObjCVarvwSC_Transactions.mP_FinishedDate = Convert.ToDateTime(dr["P_FinishedDate"].ToString());
                        ObjCVarvwSC_Transactions.mPurchaseInvoiceOpeningBalanceID = Convert.ToInt64(dr["PurchaseInvoiceOpeningBalanceID"].ToString());
                        ObjCVarvwSC_Transactions.mP_Qty = Convert.ToDecimal(dr["P_Qty"].ToString());
                        ObjCVarvwSC_Transactions.mP_LineID = Convert.ToInt32(dr["P_LineID"].ToString());
                        ObjCVarvwSC_Transactions.mP_ItemID = Convert.ToInt64(dr["P_ItemID"].ToString());
                        ObjCVarvwSC_Transactions.mP_UnitID = Convert.ToInt32(dr["P_UnitID"].ToString());
                        ObjCVarvwSC_Transactions.mP_ProductionRequestID = Convert.ToInt32(dr["P_ProductionRequestID"].ToString());
                        ObjCVarvwSC_Transactions.mToStoreID = Convert.ToInt32(dr["ToStoreID"].ToString());
                        ObjCVarvwSC_Transactions.mJV_ID2 = Convert.ToInt64(dr["JV_ID2"].ToString());
                        ObjCVarvwSC_Transactions.mTransferParentID = Convert.ToInt32(dr["TransferParentID"].ToString());
                        ObjCVarvwSC_Transactions.mForwardingPSInvoiceID = Convert.ToInt64(dr["ForwardingPSInvoiceID"].ToString());
                        ObjCVarvwSC_Transactions.mSupplyOrderID = Convert.ToInt64(dr["SupplyOrderID"].ToString());
                        ObjCVarvwSC_Transactions.mTransactionType = Convert.ToString(dr["TransactionType"].ToString());
                        ObjCVarvwSC_Transactions.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwSC_Transactions.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwSC_Transactions.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwSC_Transactions.mFromStoreName = Convert.ToString(dr["FromStoreName"].ToString());
                        ObjCVarvwSC_Transactions.mToStoreName = Convert.ToString(dr["ToStoreName"].ToString());
                        ObjCVarvwSC_Transactions.mHeaderItemName = Convert.ToString(dr["HeaderItemName"].ToString());
                        ObjCVarvwSC_Transactions.mHeaderItemCode = Convert.ToString(dr["HeaderItemCode"].ToString());
                        ObjCVarvwSC_Transactions.mParentTransCode = Convert.ToString(dr["ParentTransCode"].ToString());
                        ObjCVarvwSC_Transactions.mParentTransTypeName = Convert.ToString(dr["ParentTransTypeName"].ToString());
                        ObjCVarvwSC_Transactions.mMaterialRequestCode = Convert.ToString(dr["MaterialRequestCode"].ToString());
                        ObjCVarvwSC_Transactions.mMaterialRequesTypeName = Convert.ToString(dr["MaterialRequesTypeName"].ToString());
                        ObjCVarvwSC_Transactions.mIsBrokerStore = Convert.ToBoolean(dr["IsBrokerStore"].ToString());
                        ObjCVarvwSC_Transactions.mHasChildren = Convert.ToBoolean(dr["HasChildren"].ToString());
                        ObjCVarvwSC_Transactions.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwSC_Transactions.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwSC_Transactions.mIsFromFlexi = Convert.ToBoolean(dr["IsFromFlexi"].ToString());
                        ObjCVarvwSC_Transactions.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwSC_Transactions.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        ObjCVarvwSC_Transactions.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwSC_Transactions.mBranchCode = Convert.ToString(dr["BranchCode"].ToString());
                        ObjCVarvwSC_Transactions.mStoresAndRemainedItemsQty = Convert.ToString(dr["StoresAndRemainedItemsQty"].ToString());
                        ObjCVarvwSC_Transactions.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarvwSC_Transactions.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarvwSC_Transactions.mDivisionID = Convert.ToInt32(dr["DivisionID"].ToString());
                        ObjCVarvwSC_Transactions.mSourceOfTransactionName = Convert.ToString(dr["SourceOfTransactionName"].ToString());
                        ObjCVarvwSC_Transactions.mTrailerName = Convert.ToString(dr["TrailerName"].ToString());
                        ObjCVarvwSC_Transactions.mTrailerCode = Convert.ToInt32(dr["TrailerCode"].ToString());
                        ObjCVarvwSC_Transactions.mEquipmentName = Convert.ToString(dr["EquipmentName"].ToString());
                        ObjCVarvwSC_Transactions.mEquipmentCode = Convert.ToInt32(dr["EquipmentCode"].ToString());
                        ObjCVarvwSC_Transactions.mDevisonName = Convert.ToString(dr["DevisonName"].ToString());
                        ObjCVarvwSC_Transactions.mDevisonCode = Convert.ToString(dr["DevisonCode"].ToString());
                        ObjCVarvwSC_Transactions.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwSC_Transactions.mDepartmentCode = Convert.ToString(dr["DepartmentCode"].ToString());
                        ObjCVarvwSC_Transactions.mTotalExpenses = Convert.ToDecimal(dr["TotalExpenses"].ToString());
                        ObjCVarvwSC_Transactions.mItemsDestintions = Convert.ToString(dr["ItemsDestintions"].ToString());
                        ObjCVarvwSC_Transactions.mItemsDestintionsLocal = Convert.ToString(dr["ItemsDestintionsLocal"].ToString());
                        ObjCVarvwSC_Transactions.mInvoiceBranchID = Convert.ToInt32(dr["InvoiceBranchID"].ToString());
                        ObjCVarvwSC_Transactions.mInvoiceBranchName = Convert.ToString(dr["InvoiceBranchName"].ToString());
                        lstCVarvwSC_Transactions.Add(ObjCVarvwSC_Transactions);
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
            lstCVarvwSC_Transactions.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSC_Transactions";
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
                        CVarvwSC_Transactions ObjCVarvwSC_Transactions = new CVarvwSC_Transactions();
                        ObjCVarvwSC_Transactions.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSC_Transactions.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwSC_Transactions.mCodeManual = Convert.ToString(dr["CodeManual"].ToString());
                        ObjCVarvwSC_Transactions.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarvwSC_Transactions.mPurchaseInvoiceID = Convert.ToInt64(dr["PurchaseInvoiceID"].ToString());
                        ObjCVarvwSC_Transactions.mPurchaseOrderID = Convert.ToInt32(dr["PurchaseOrderID"].ToString());
                        ObjCVarvwSC_Transactions.mExaminationID = Convert.ToInt32(dr["ExaminationID"].ToString());
                        ObjCVarvwSC_Transactions.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwSC_Transactions.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSC_Transactions.mSLInvoiceID = Convert.ToInt64(dr["SLInvoiceID"].ToString());
                        ObjCVarvwSC_Transactions.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwSC_Transactions.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwSC_Transactions.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwSC_Transactions.mIsSpareParts = Convert.ToBoolean(dr["IsSpareParts"].ToString());
                        ObjCVarvwSC_Transactions.mFiscalYearID = Convert.ToInt32(dr["FiscalYearID"].ToString());
                        ObjCVarvwSC_Transactions.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwSC_Transactions.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarvwSC_Transactions.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarvwSC_Transactions.mJV_ID = Convert.ToInt64(dr["JV_ID"].ToString());
                        ObjCVarvwSC_Transactions.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwSC_Transactions.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwSC_Transactions.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwSC_Transactions.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwSC_Transactions.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwSC_Transactions.mIsOutOfStore = Convert.ToBoolean(dr["IsOutOfStore"].ToString());
                        ObjCVarvwSC_Transactions.mMaterialIssueRequesitionsID = Convert.ToInt32(dr["MaterialIssueRequesitionsID"].ToString());
                        ObjCVarvwSC_Transactions.mIsClosed = Convert.ToBoolean(dr["IsClosed"].ToString());
                        ObjCVarvwSC_Transactions.mEntitlementDays = Convert.ToInt32(dr["EntitlementDays"].ToString());
                        ObjCVarvwSC_Transactions.mFromStore = Convert.ToInt32(dr["FromStore"].ToString());
                        ObjCVarvwSC_Transactions.mP_StartDate = Convert.ToDateTime(dr["P_StartDate"].ToString());
                        ObjCVarvwSC_Transactions.mP_FinishedDate = Convert.ToDateTime(dr["P_FinishedDate"].ToString());
                        ObjCVarvwSC_Transactions.mPurchaseInvoiceOpeningBalanceID = Convert.ToInt64(dr["PurchaseInvoiceOpeningBalanceID"].ToString());
                        ObjCVarvwSC_Transactions.mP_Qty = Convert.ToDecimal(dr["P_Qty"].ToString());
                        ObjCVarvwSC_Transactions.mP_LineID = Convert.ToInt32(dr["P_LineID"].ToString());
                        ObjCVarvwSC_Transactions.mP_ItemID = Convert.ToInt64(dr["P_ItemID"].ToString());
                        ObjCVarvwSC_Transactions.mP_UnitID = Convert.ToInt32(dr["P_UnitID"].ToString());
                        ObjCVarvwSC_Transactions.mP_ProductionRequestID = Convert.ToInt32(dr["P_ProductionRequestID"].ToString());
                        ObjCVarvwSC_Transactions.mToStoreID = Convert.ToInt32(dr["ToStoreID"].ToString());
                        ObjCVarvwSC_Transactions.mJV_ID2 = Convert.ToInt64(dr["JV_ID2"].ToString());
                        ObjCVarvwSC_Transactions.mTransferParentID = Convert.ToInt32(dr["TransferParentID"].ToString());
                        ObjCVarvwSC_Transactions.mForwardingPSInvoiceID = Convert.ToInt64(dr["ForwardingPSInvoiceID"].ToString());
                        ObjCVarvwSC_Transactions.mSupplyOrderID = Convert.ToInt64(dr["SupplyOrderID"].ToString());
                        ObjCVarvwSC_Transactions.mTransactionType = Convert.ToString(dr["TransactionType"].ToString());
                        ObjCVarvwSC_Transactions.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwSC_Transactions.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwSC_Transactions.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwSC_Transactions.mFromStoreName = Convert.ToString(dr["FromStoreName"].ToString());
                        ObjCVarvwSC_Transactions.mToStoreName = Convert.ToString(dr["ToStoreName"].ToString());
                        ObjCVarvwSC_Transactions.mHeaderItemName = Convert.ToString(dr["HeaderItemName"].ToString());
                        ObjCVarvwSC_Transactions.mHeaderItemCode = Convert.ToString(dr["HeaderItemCode"].ToString());
                        ObjCVarvwSC_Transactions.mParentTransCode = Convert.ToString(dr["ParentTransCode"].ToString());
                        ObjCVarvwSC_Transactions.mParentTransTypeName = Convert.ToString(dr["ParentTransTypeName"].ToString());
                        ObjCVarvwSC_Transactions.mMaterialRequestCode = Convert.ToString(dr["MaterialRequestCode"].ToString());
                        ObjCVarvwSC_Transactions.mMaterialRequesTypeName = Convert.ToString(dr["MaterialRequesTypeName"].ToString());
                        ObjCVarvwSC_Transactions.mIsBrokerStore = Convert.ToBoolean(dr["IsBrokerStore"].ToString());
                        ObjCVarvwSC_Transactions.mHasChildren = Convert.ToBoolean(dr["HasChildren"].ToString());
                        ObjCVarvwSC_Transactions.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwSC_Transactions.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwSC_Transactions.mIsFromFlexi = Convert.ToBoolean(dr["IsFromFlexi"].ToString());
                        ObjCVarvwSC_Transactions.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwSC_Transactions.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        ObjCVarvwSC_Transactions.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwSC_Transactions.mBranchCode = Convert.ToString(dr["BranchCode"].ToString());
                        ObjCVarvwSC_Transactions.mStoresAndRemainedItemsQty = Convert.ToString(dr["StoresAndRemainedItemsQty"].ToString());
                        ObjCVarvwSC_Transactions.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarvwSC_Transactions.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarvwSC_Transactions.mDivisionID = Convert.ToInt32(dr["DivisionID"].ToString());
                        ObjCVarvwSC_Transactions.mSourceOfTransactionName = Convert.ToString(dr["SourceOfTransactionName"].ToString());
                        ObjCVarvwSC_Transactions.mTrailerName = Convert.ToString(dr["TrailerName"].ToString());
                        ObjCVarvwSC_Transactions.mTrailerCode = Convert.ToInt32(dr["TrailerCode"].ToString());
                        ObjCVarvwSC_Transactions.mEquipmentName = Convert.ToString(dr["EquipmentName"].ToString());
                        ObjCVarvwSC_Transactions.mEquipmentCode = Convert.ToInt32(dr["EquipmentCode"].ToString());
                        ObjCVarvwSC_Transactions.mDevisonName = Convert.ToString(dr["DevisonName"].ToString());
                        ObjCVarvwSC_Transactions.mDevisonCode = Convert.ToString(dr["DevisonCode"].ToString());
                        ObjCVarvwSC_Transactions.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwSC_Transactions.mDepartmentCode = Convert.ToString(dr["DepartmentCode"].ToString());
                        ObjCVarvwSC_Transactions.mTotalExpenses = Convert.ToDecimal(dr["TotalExpenses"].ToString());
                        ObjCVarvwSC_Transactions.mItemsDestintions = Convert.ToString(dr["ItemsDestintions"].ToString());
                        ObjCVarvwSC_Transactions.mItemsDestintionsLocal = Convert.ToString(dr["ItemsDestintionsLocal"].ToString());
                        ObjCVarvwSC_Transactions.mInvoiceBranchID = Convert.ToInt32(dr["InvoiceBranchID"].ToString());
                        ObjCVarvwSC_Transactions.mInvoiceBranchName = Convert.ToString(dr["InvoiceBranchName"].ToString());
                        ObjCVarvwSC_Transactions.misconfirm = Convert.ToBoolean(dr["IsConfirm"].ToString());
                        ObjCVarvwSC_Transactions.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwSC_Transactions.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());

                        //------------ Add manual Abdoo
                        ObjCVarvwSC_Transactions.mTAmount   = Convert.ToString(dr["TAmount"].ToString());
                        ObjCVarvwSC_Transactions.mTotalQty = Convert.ToString(dr["TotalQty"].ToString());
                        ObjCVarvwSC_Transactions.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarvwSC_Transactions.mCardNo = Convert.ToString(dr["CardNo"].ToString());

                        //------------ Add manual ahmed
                        ObjCVarvwSC_Transactions.mParentCode = Convert.ToString(dr["ParentCode"].ToString());

                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSC_Transactions.Add(ObjCVarvwSC_Transactions);
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

        private Exception DataFillEGL(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotRecs)
        {
            Exception Exp = null;
            TotRecs = 0;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwSC_Transactions.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSC_TransactionsEGL";
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
                        CVarvwSC_Transactions ObjCVarvwSC_Transactions = new CVarvwSC_Transactions();
                        ObjCVarvwSC_Transactions.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSC_Transactions.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwSC_Transactions.mCodeManual = Convert.ToString(dr["CodeManual"].ToString());
                        ObjCVarvwSC_Transactions.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarvwSC_Transactions.mPurchaseInvoiceID = Convert.ToInt64(dr["PurchaseInvoiceID"].ToString());
                        ObjCVarvwSC_Transactions.mPurchaseOrderID = Convert.ToInt32(dr["PurchaseOrderID"].ToString());
                        ObjCVarvwSC_Transactions.mExaminationID = Convert.ToInt32(dr["ExaminationID"].ToString());
                        ObjCVarvwSC_Transactions.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwSC_Transactions.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSC_Transactions.mSLInvoiceID = Convert.ToInt64(dr["SLInvoiceID"].ToString());
                        ObjCVarvwSC_Transactions.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwSC_Transactions.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwSC_Transactions.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwSC_Transactions.mIsSpareParts = Convert.ToBoolean(dr["IsSpareParts"].ToString());
                        ObjCVarvwSC_Transactions.mFiscalYearID = Convert.ToInt32(dr["FiscalYearID"].ToString());
                        ObjCVarvwSC_Transactions.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwSC_Transactions.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarvwSC_Transactions.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarvwSC_Transactions.mJV_ID = Convert.ToInt64(dr["JV_ID"].ToString());
                        ObjCVarvwSC_Transactions.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwSC_Transactions.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwSC_Transactions.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwSC_Transactions.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwSC_Transactions.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwSC_Transactions.mIsOutOfStore = Convert.ToBoolean(dr["IsOutOfStore"].ToString());
                        ObjCVarvwSC_Transactions.mMaterialIssueRequesitionsID = Convert.ToInt32(dr["MaterialIssueRequesitionsID"].ToString());
                        ObjCVarvwSC_Transactions.mIsClosed = Convert.ToBoolean(dr["IsClosed"].ToString());
                        ObjCVarvwSC_Transactions.mEntitlementDays = Convert.ToInt32(dr["EntitlementDays"].ToString());
                        ObjCVarvwSC_Transactions.mFromStore = Convert.ToInt32(dr["FromStore"].ToString());
                        ObjCVarvwSC_Transactions.mP_StartDate = Convert.ToDateTime(dr["P_StartDate"].ToString());
                        ObjCVarvwSC_Transactions.mP_FinishedDate = Convert.ToDateTime(dr["P_FinishedDate"].ToString());
                        ObjCVarvwSC_Transactions.mPurchaseInvoiceOpeningBalanceID = Convert.ToInt64(dr["PurchaseInvoiceOpeningBalanceID"].ToString());
                        ObjCVarvwSC_Transactions.mP_Qty = Convert.ToDecimal(dr["P_Qty"].ToString());
                        ObjCVarvwSC_Transactions.mP_LineID = Convert.ToInt32(dr["P_LineID"].ToString());
                        ObjCVarvwSC_Transactions.mP_ItemID = Convert.ToInt64(dr["P_ItemID"].ToString());
                        ObjCVarvwSC_Transactions.mP_UnitID = Convert.ToInt32(dr["P_UnitID"].ToString());
                        ObjCVarvwSC_Transactions.mP_ProductionRequestID = Convert.ToInt32(dr["P_ProductionRequestID"].ToString());
                        ObjCVarvwSC_Transactions.mToStoreID = Convert.ToInt32(dr["ToStoreID"].ToString());
                        ObjCVarvwSC_Transactions.mJV_ID2 = Convert.ToInt64(dr["JV_ID2"].ToString());
                        ObjCVarvwSC_Transactions.mTransferParentID = Convert.ToInt32(dr["TransferParentID"].ToString());
                        ObjCVarvwSC_Transactions.mForwardingPSInvoiceID = Convert.ToInt64(dr["ForwardingPSInvoiceID"].ToString());
                        ObjCVarvwSC_Transactions.mSupplyOrderID = Convert.ToInt64(dr["SupplyOrderID"].ToString());
                        ObjCVarvwSC_Transactions.mTransactionType = Convert.ToString(dr["TransactionType"].ToString());
                        ObjCVarvwSC_Transactions.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwSC_Transactions.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwSC_Transactions.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwSC_Transactions.mFromStoreName = Convert.ToString(dr["FromStoreName"].ToString());
                        ObjCVarvwSC_Transactions.mToStoreName = Convert.ToString(dr["ToStoreName"].ToString());
                        ObjCVarvwSC_Transactions.mHeaderItemName = Convert.ToString(dr["HeaderItemName"].ToString());
                        ObjCVarvwSC_Transactions.mHeaderItemCode = Convert.ToString(dr["HeaderItemCode"].ToString());
                        ObjCVarvwSC_Transactions.mParentTransCode = Convert.ToString(dr["ParentTransCode"].ToString());
                        ObjCVarvwSC_Transactions.mParentTransTypeName = Convert.ToString(dr["ParentTransTypeName"].ToString());
                        ObjCVarvwSC_Transactions.mMaterialRequestCode = Convert.ToString(dr["MaterialRequestCode"].ToString());
                        ObjCVarvwSC_Transactions.mMaterialRequesTypeName = Convert.ToString(dr["MaterialRequesTypeName"].ToString());
                        ObjCVarvwSC_Transactions.mIsBrokerStore = Convert.ToBoolean(dr["IsBrokerStore"].ToString());
                        ObjCVarvwSC_Transactions.mHasChildren = Convert.ToBoolean(dr["HasChildren"].ToString());
                        ObjCVarvwSC_Transactions.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwSC_Transactions.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwSC_Transactions.mIsFromFlexi = Convert.ToBoolean(dr["IsFromFlexi"].ToString());
                        ObjCVarvwSC_Transactions.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwSC_Transactions.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        ObjCVarvwSC_Transactions.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwSC_Transactions.mBranchCode = Convert.ToString(dr["BranchCode"].ToString());
                        ObjCVarvwSC_Transactions.mStoresAndRemainedItemsQty = Convert.ToString(dr["StoresAndRemainedItemsQty"].ToString());
                        ObjCVarvwSC_Transactions.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarvwSC_Transactions.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarvwSC_Transactions.mDivisionID = Convert.ToInt32(dr["DivisionID"].ToString());
                        ObjCVarvwSC_Transactions.mSourceOfTransactionName = Convert.ToString(dr["SourceOfTransactionName"].ToString());
                        ObjCVarvwSC_Transactions.mTrailerName = Convert.ToString(dr["TrailerName"].ToString());
                        ObjCVarvwSC_Transactions.mTrailerCode = Convert.ToInt32(dr["TrailerCode"].ToString());
                        ObjCVarvwSC_Transactions.mEquipmentName = Convert.ToString(dr["EquipmentName"].ToString());
                        ObjCVarvwSC_Transactions.mEquipmentCode = Convert.ToInt32(dr["EquipmentCode"].ToString());
                        ObjCVarvwSC_Transactions.mDevisonName = Convert.ToString(dr["DevisonName"].ToString());
                        ObjCVarvwSC_Transactions.mDevisonCode = Convert.ToString(dr["DevisonCode"].ToString());
                        ObjCVarvwSC_Transactions.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwSC_Transactions.mDepartmentCode = Convert.ToString(dr["DepartmentCode"].ToString());
                        ObjCVarvwSC_Transactions.mTotalExpenses = Convert.ToDecimal(dr["TotalExpenses"].ToString());
                        ObjCVarvwSC_Transactions.mItemsDestintions = Convert.ToString(dr["ItemsDestintions"].ToString());
                        ObjCVarvwSC_Transactions.mItemsDestintionsLocal = Convert.ToString(dr["ItemsDestintionsLocal"].ToString());
                        ObjCVarvwSC_Transactions.mInvoiceBranchID = Convert.ToInt32(dr["InvoiceBranchID"].ToString());
                        ObjCVarvwSC_Transactions.mInvoiceBranchName = Convert.ToString(dr["InvoiceBranchName"].ToString());
                        ObjCVarvwSC_Transactions.misconfirm = Convert.ToBoolean(dr["isconfirm"].ToString());
                        ObjCVarvwSC_Transactions.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwSC_Transactions.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());

                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSC_Transactions.Add(ObjCVarvwSC_Transactions);
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
