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
    public class CPKvwSC_TransactionsHeaderDetails
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
    public partial class CVarvwSC_TransactionsHeaderDetails : CPKvwSC_TransactionsHeaderDetails
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
        internal Int32 mToStoreID;
        internal Boolean mIsBrokerStore;
        internal Int32 mP_ProductionRequestID;
        internal Int32 mP_UnitID;
        internal Int64 mP_ItemID;
        internal Int32 mP_LineID;
        internal Decimal mP_Qty;
        internal DateTime mP_FinishedDate;
        internal DateTime mP_StartDate;
        internal Int32 mEntitlementDays;
        internal Boolean mIsClosed;
        internal Int32 mFromStore;
        internal Int64 mJV_ID2;
        internal Int32 mTransferParentID;
        internal Int64 mForwardingPSInvoiceID;
        internal String mTrailerName;
        internal Int32 mTrailerCode;
        internal String mEquipmentName;
        internal Int32 mEquipmentCode;
        internal String mDevisonName;
        internal String mDevisonCode;
        internal String mDepartmentName;
        internal String mDepartmentCode;
        internal String mTransactionTypeName;
        internal String mTransactionType;
        internal Decimal mAmount;
        internal String mPartnerName;
        internal String mInvoiceNo;
        internal Int32 mID_D;
        internal Int32 mTransactionID_D;
        internal Int64 mItemID_D;
        internal Decimal mQty_D;
        internal Int32 mUnitID_D;
        internal Int32 mStoreID_D;
        internal Decimal mReturnedQty_D;
        internal Int32 mCurrencyID;
        internal Decimal mExchangeRate;
        internal Decimal mAveragePrice;
        internal String mNotes_D;
        internal Int64 mPurchaseInvoiceDetailsID_D;
        internal Int32 mSLInvoiceDetailsID_D;
        internal Int32 mSubAccountID_D;
        internal Decimal mOriginalQty_D;
        internal Int32 mParentID_D;
        internal Decimal mAveragePrice_D;
        internal DateTime mTransactionDate_D;
        internal Int32 mQtyFactor_D;
        internal Decimal mActualQty_D;
        internal Boolean mIsDeleted_D;
        internal Int32 mTransactionTypeID_D;
        internal Decimal mItemQty_D;
        internal Decimal mUnitFactor_D;
        internal Decimal mTaxAmount_D;
        internal Decimal mDiscountAmount_D;
        internal Decimal mInvoicePrice_D;
        internal Int64 mD_ItemID;
        internal Int32 mD_UnitID;
        internal Int32 mD_StoreID;
        internal Int32 mD_ID;
        internal String mD_Notes;
        internal String mD_StoreName;
        internal String mD_ToStoreName;
        internal String mD_ItemName;
        internal String mD_ItemCode;
        internal String mD_ItemNameCode;
        internal Int32 mItemTypeID;
        internal String mItemTypeName;
        internal String mD_UnitName;
        internal String mD_UnitCode;
        internal Int32 mBranchID;
        internal Int64 mOperationID;
        internal Decimal mD_OutgoingQty;
        internal String mFromStoreName_D;
        internal String mToStoreName_D;
        internal String mItemName_D;
        internal String mFromStoreName;
        internal String mToStoreName;
        internal String mHeaderItemName;
        internal String mTypeName_D;
        internal Decimal mMaterilaIssueRequest_RemainQty;
        internal Decimal mParent_RemainQty;
        internal Decimal mRemainQty;
        internal Decimal mFifo_Qty;
        internal String mMaterialIssueVoucherSummary;
        internal String mBranchName;
        internal String mBranchCode;
        internal Int32 mFA_AssetsID;
        internal String mFA_AssetsName;
        internal String mFA_AssetsCode;
        internal String mFA_AssetsBarCode;
        internal String mParentPS_InvoiceNo;
        internal DateTime mParentPS_InvoiceDate;
        internal Decimal mParentPS_InvoiceItemUnitPrice;
        internal Decimal mParentPS_InvoiceItemQty;
        internal Int32 mParentPS_InvoiceItemUnitCurrencyID;
        internal String mParentPS_InvoiceItemUnitCurrencyCode;
        internal String mParentPS_InvoiceItemName;
        internal Int64 mParentPS_InvoiceID;
        internal String mstrParentPS_InvoiceDate;
        internal DateTime mPurchaseInvoiceDate;
        internal Int32 mSC_ItemParentTransactionID;
        internal String mItemParentTransactionCode;
        internal String mstrItemParentTransactionID;
        internal String mItemsDestintions;
        internal String mItemsDestintionsLocal;
        internal Int32 mTrailerID;
        internal Int32 mEquipmentID;
        internal Int32 mInvoiceBranchID;
        internal String mInvoiceBranchName;
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
        public Int32 ToStoreID
        {
            get { return mToStoreID; }
            set { mToStoreID = value; }
        }
        public Boolean IsBrokerStore
        {
            get { return mIsBrokerStore; }
            set { mIsBrokerStore = value; }
        }
        public Int32 P_ProductionRequestID
        {
            get { return mP_ProductionRequestID; }
            set { mP_ProductionRequestID = value; }
        }
        public Int32 P_UnitID
        {
            get { return mP_UnitID; }
            set { mP_UnitID = value; }
        }
        public Int64 P_ItemID
        {
            get { return mP_ItemID; }
            set { mP_ItemID = value; }
        }
        public Int32 P_LineID
        {
            get { return mP_LineID; }
            set { mP_LineID = value; }
        }
        public Decimal P_Qty
        {
            get { return mP_Qty; }
            set { mP_Qty = value; }
        }
        public DateTime P_FinishedDate
        {
            get { return mP_FinishedDate; }
            set { mP_FinishedDate = value; }
        }
        public DateTime P_StartDate
        {
            get { return mP_StartDate; }
            set { mP_StartDate = value; }
        }
        public Int32 EntitlementDays
        {
            get { return mEntitlementDays; }
            set { mEntitlementDays = value; }
        }
        public Boolean IsClosed
        {
            get { return mIsClosed; }
            set { mIsClosed = value; }
        }
        public Int32 FromStore
        {
            get { return mFromStore; }
            set { mFromStore = value; }
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
        public String TransactionTypeName
        {
            get { return mTransactionTypeName; }
            set { mTransactionTypeName = value; }
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
        public Int32 ID_D
        {
            get { return mID_D; }
            set { mID_D = value; }
        }
        public Int32 TransactionID_D
        {
            get { return mTransactionID_D; }
            set { mTransactionID_D = value; }
        }
        public Int64 ItemID_D
        {
            get { return mItemID_D; }
            set { mItemID_D = value; }
        }
        public Decimal Qty_D
        {
            get { return mQty_D; }
            set { mQty_D = value; }
        }
        public Int32 UnitID_D
        {
            get { return mUnitID_D; }
            set { mUnitID_D = value; }
        }
        public Int32 StoreID_D
        {
            get { return mStoreID_D; }
            set { mStoreID_D = value; }
        }
        public Decimal ReturnedQty_D
        {
            get { return mReturnedQty_D; }
            set { mReturnedQty_D = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mExchangeRate = value; }
        }
        public Decimal AveragePrice
        {
            get { return mAveragePrice; }
            set { mAveragePrice = value; }
        }
        public String Notes_D
        {
            get { return mNotes_D; }
            set { mNotes_D = value; }
        }
        public Int64 PurchaseInvoiceDetailsID_D
        {
            get { return mPurchaseInvoiceDetailsID_D; }
            set { mPurchaseInvoiceDetailsID_D = value; }
        }
        public Int32 SLInvoiceDetailsID_D
        {
            get { return mSLInvoiceDetailsID_D; }
            set { mSLInvoiceDetailsID_D = value; }
        }
        public Int32 SubAccountID_D
        {
            get { return mSubAccountID_D; }
            set { mSubAccountID_D = value; }
        }
        public Decimal OriginalQty_D
        {
            get { return mOriginalQty_D; }
            set { mOriginalQty_D = value; }
        }
        public Int32 ParentID_D
        {
            get { return mParentID_D; }
            set { mParentID_D = value; }
        }
        public Decimal AveragePrice_D
        {
            get { return mAveragePrice_D; }
            set { mAveragePrice_D = value; }
        }
        public DateTime TransactionDate_D
        {
            get { return mTransactionDate_D; }
            set { mTransactionDate_D = value; }
        }
        public Int32 QtyFactor_D
        {
            get { return mQtyFactor_D; }
            set { mQtyFactor_D = value; }
        }
        public Decimal ActualQty_D
        {
            get { return mActualQty_D; }
            set { mActualQty_D = value; }
        }
        public Boolean IsDeleted_D
        {
            get { return mIsDeleted_D; }
            set { mIsDeleted_D = value; }
        }
        public Int32 TransactionTypeID_D
        {
            get { return mTransactionTypeID_D; }
            set { mTransactionTypeID_D = value; }
        }
        public Decimal ItemQty_D
        {
            get { return mItemQty_D; }
            set { mItemQty_D = value; }
        }
        public Decimal UnitFactor_D
        {
            get { return mUnitFactor_D; }
            set { mUnitFactor_D = value; }
        }
        public Decimal TaxAmount_D
        {
            get { return mTaxAmount_D; }
            set { mTaxAmount_D = value; }
        }
        public Decimal DiscountAmount_D
        {
            get { return mDiscountAmount_D; }
            set { mDiscountAmount_D = value; }
        }
        public Decimal InvoicePrice_D
        {
            get { return mInvoicePrice_D; }
            set { mInvoicePrice_D = value; }
        }
        public Int64 D_ItemID
        {
            get { return mD_ItemID; }
            set { mD_ItemID = value; }
        }
        public Int32 D_UnitID
        {
            get { return mD_UnitID; }
            set { mD_UnitID = value; }
        }
        public Int32 D_StoreID
        {
            get { return mD_StoreID; }
            set { mD_StoreID = value; }
        }
        public Int32 D_ID
        {
            get { return mD_ID; }
            set { mD_ID = value; }
        }
        public String D_Notes
        {
            get { return mD_Notes; }
            set { mD_Notes = value; }
        }
        public String D_StoreName
        {
            get { return mD_StoreName; }
            set { mD_StoreName = value; }
        }
        public String D_ToStoreName
        {
            get { return mD_ToStoreName; }
            set { mD_ToStoreName = value; }
        }
        public String D_ItemName
        {
            get { return mD_ItemName; }
            set { mD_ItemName = value; }
        }
        public String D_ItemCode
        {
            get { return mD_ItemCode; }
            set { mD_ItemCode = value; }
        }
        public String D_ItemNameCode
        {
            get { return mD_ItemNameCode; }
            set { mD_ItemNameCode = value; }
        }
        public Int32 ItemTypeID
        {
            get { return mItemTypeID; }
            set { mItemTypeID = value; }
        }
        public String ItemTypeName
        {
            get { return mItemTypeName; }
            set { mItemTypeName = value; }
        }
        public String D_UnitName
        {
            get { return mD_UnitName; }
            set { mD_UnitName = value; }
        }
        public String D_UnitCode
        {
            get { return mD_UnitCode; }
            set { mD_UnitCode = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mBranchID = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public Decimal D_OutgoingQty
        {
            get { return mD_OutgoingQty; }
            set { mD_OutgoingQty = value; }
        }
        public String FromStoreName_D
        {
            get { return mFromStoreName_D; }
            set { mFromStoreName_D = value; }
        }
        public String ToStoreName_D
        {
            get { return mToStoreName_D; }
            set { mToStoreName_D = value; }
        }
        public String ItemName_D
        {
            get { return mItemName_D; }
            set { mItemName_D = value; }
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
        public String TypeName_D
        {
            get { return mTypeName_D; }
            set { mTypeName_D = value; }
        }
        public Decimal MaterilaIssueRequest_RemainQty
        {
            get { return mMaterilaIssueRequest_RemainQty; }
            set { mMaterilaIssueRequest_RemainQty = value; }
        }
        public Decimal Parent_RemainQty
        {
            get { return mParent_RemainQty; }
            set { mParent_RemainQty = value; }
        }
        public Decimal RemainQty
        {
            get { return mRemainQty; }
            set { mRemainQty = value; }
        }
        public Decimal Fifo_Qty
        {
            get { return mFifo_Qty; }
            set { mFifo_Qty = value; }
        }
        public String MaterialIssueVoucherSummary
        {
            get { return mMaterialIssueVoucherSummary; }
            set { mMaterialIssueVoucherSummary = value; }
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
        public Int32 FA_AssetsID
        {
            get { return mFA_AssetsID; }
            set { mFA_AssetsID = value; }
        }
        public String FA_AssetsName
        {
            get { return mFA_AssetsName; }
            set { mFA_AssetsName = value; }
        }
        public String FA_AssetsCode
        {
            get { return mFA_AssetsCode; }
            set { mFA_AssetsCode = value; }
        }
        public String FA_AssetsBarCode
        {
            get { return mFA_AssetsBarCode; }
            set { mFA_AssetsBarCode = value; }
        }
        public String ParentPS_InvoiceNo
        {
            get { return mParentPS_InvoiceNo; }
            set { mParentPS_InvoiceNo = value; }
        }
        public DateTime ParentPS_InvoiceDate
        {
            get { return mParentPS_InvoiceDate; }
            set { mParentPS_InvoiceDate = value; }
        }
        public Decimal ParentPS_InvoiceItemUnitPrice
        {
            get { return mParentPS_InvoiceItemUnitPrice; }
            set { mParentPS_InvoiceItemUnitPrice = value; }
        }
        public Decimal ParentPS_InvoiceItemQty
        {
            get { return mParentPS_InvoiceItemQty; }
            set { mParentPS_InvoiceItemQty = value; }
        }
        public Int32 ParentPS_InvoiceItemUnitCurrencyID
        {
            get { return mParentPS_InvoiceItemUnitCurrencyID; }
            set { mParentPS_InvoiceItemUnitCurrencyID = value; }
        }
        public String ParentPS_InvoiceItemUnitCurrencyCode
        {
            get { return mParentPS_InvoiceItemUnitCurrencyCode; }
            set { mParentPS_InvoiceItemUnitCurrencyCode = value; }
        }
        public String ParentPS_InvoiceItemName
        {
            get { return mParentPS_InvoiceItemName; }
            set { mParentPS_InvoiceItemName = value; }
        }
        public Int64 ParentPS_InvoiceID
        {
            get { return mParentPS_InvoiceID; }
            set { mParentPS_InvoiceID = value; }
        }
        public String strParentPS_InvoiceDate
        {
            get { return mstrParentPS_InvoiceDate; }
            set { mstrParentPS_InvoiceDate = value; }
        }
        public DateTime PurchaseInvoiceDate
        {
            get { return mPurchaseInvoiceDate; }
            set { mPurchaseInvoiceDate = value; }
        }
        public Int32 SC_ItemParentTransactionID
        {
            get { return mSC_ItemParentTransactionID; }
            set { mSC_ItemParentTransactionID = value; }
        }
        public String ItemParentTransactionCode
        {
            get { return mItemParentTransactionCode; }
            set { mItemParentTransactionCode = value; }
        }
        public String strItemParentTransactionID
        {
            get { return mstrItemParentTransactionID; }
            set { mstrItemParentTransactionID = value; }
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

    public partial class CvwSC_TransactionsHeaderDetails
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
        public List<CVarvwSC_TransactionsHeaderDetails> lstCVarvwSC_TransactionsHeaderDetails = new List<CVarvwSC_TransactionsHeaderDetails>();
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
            lstCVarvwSC_TransactionsHeaderDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSC_TransactionsHeaderDetails";
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
                        CVarvwSC_TransactionsHeaderDetails ObjCVarvwSC_TransactionsHeaderDetails = new CVarvwSC_TransactionsHeaderDetails();
                        ObjCVarvwSC_TransactionsHeaderDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mCodeManual = Convert.ToString(dr["CodeManual"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mPurchaseInvoiceID = Convert.ToInt64(dr["PurchaseInvoiceID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mPurchaseOrderID = Convert.ToInt32(dr["PurchaseOrderID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mExaminationID = Convert.ToInt32(dr["ExaminationID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mSLInvoiceID = Convert.ToInt64(dr["SLInvoiceID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mIsSpareParts = Convert.ToBoolean(dr["IsSpareParts"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mFiscalYearID = Convert.ToInt32(dr["FiscalYearID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mJV_ID = Convert.ToInt64(dr["JV_ID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mIsOutOfStore = Convert.ToBoolean(dr["IsOutOfStore"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mMaterialIssueRequesitionsID = Convert.ToInt32(dr["MaterialIssueRequesitionsID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mToStoreID = Convert.ToInt32(dr["ToStoreID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mIsBrokerStore = Convert.ToBoolean(dr["IsBrokerStore"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mP_ProductionRequestID = Convert.ToInt32(dr["P_ProductionRequestID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mP_UnitID = Convert.ToInt32(dr["P_UnitID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mP_ItemID = Convert.ToInt64(dr["P_ItemID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mP_LineID = Convert.ToInt32(dr["P_LineID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mP_Qty = Convert.ToDecimal(dr["P_Qty"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mP_FinishedDate = Convert.ToDateTime(dr["P_FinishedDate"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mP_StartDate = Convert.ToDateTime(dr["P_StartDate"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mEntitlementDays = Convert.ToInt32(dr["EntitlementDays"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mIsClosed = Convert.ToBoolean(dr["IsClosed"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mFromStore = Convert.ToInt32(dr["FromStore"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mJV_ID2 = Convert.ToInt64(dr["JV_ID2"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTransferParentID = Convert.ToInt32(dr["TransferParentID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mForwardingPSInvoiceID = Convert.ToInt64(dr["ForwardingPSInvoiceID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTrailerName = Convert.ToString(dr["TrailerName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTrailerCode = Convert.ToInt32(dr["TrailerCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mEquipmentName = Convert.ToString(dr["EquipmentName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mEquipmentCode = Convert.ToInt32(dr["EquipmentCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mDevisonName = Convert.ToString(dr["DevisonName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mDevisonCode = Convert.ToString(dr["DevisonCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mDepartmentCode = Convert.ToString(dr["DepartmentCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTransactionTypeName = Convert.ToString(dr["TransactionTypeName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTransactionType = Convert.ToString(dr["TransactionType"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mID_D = Convert.ToInt32(dr["ID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTransactionID_D = Convert.ToInt32(dr["TransactionID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mItemID_D = Convert.ToInt64(dr["ItemID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mQty_D = Convert.ToDecimal(dr["Qty_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mUnitID_D = Convert.ToInt32(dr["UnitID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mStoreID_D = Convert.ToInt32(dr["StoreID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mReturnedQty_D = Convert.ToDecimal(dr["ReturnedQty_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mAveragePrice = Convert.ToDecimal(dr["AveragePrice"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mNotes_D = Convert.ToString(dr["Notes_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mPurchaseInvoiceDetailsID_D = Convert.ToInt64(dr["PurchaseInvoiceDetailsID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mSLInvoiceDetailsID_D = Convert.ToInt32(dr["SLInvoiceDetailsID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mSubAccountID_D = Convert.ToInt32(dr["SubAccountID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mOriginalQty_D = Convert.ToDecimal(dr["OriginalQty_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentID_D = Convert.ToInt32(dr["ParentID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mAveragePrice_D = Convert.ToDecimal(dr["AveragePrice_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTransactionDate_D = Convert.ToDateTime(dr["TransactionDate_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mQtyFactor_D = Convert.ToInt32(dr["QtyFactor_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mActualQty_D = Convert.ToDecimal(dr["ActualQty_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mIsDeleted_D = Convert.ToBoolean(dr["IsDeleted_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTransactionTypeID_D = Convert.ToInt32(dr["TransactionTypeID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mItemQty_D = Convert.ToDecimal(dr["ItemQty_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mUnitFactor_D = Convert.ToDecimal(dr["UnitFactor_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTaxAmount_D = Convert.ToDecimal(dr["TaxAmount_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mDiscountAmount_D = Convert.ToDecimal(dr["DiscountAmount_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mInvoicePrice_D = Convert.ToDecimal(dr["InvoicePrice_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_ItemID = Convert.ToInt64(dr["D_ItemID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_UnitID = Convert.ToInt32(dr["D_UnitID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_StoreID = Convert.ToInt32(dr["D_StoreID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_ID = Convert.ToInt32(dr["D_ID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_Notes = Convert.ToString(dr["D_Notes"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_StoreName = Convert.ToString(dr["D_StoreName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_ToStoreName = Convert.ToString(dr["D_ToStoreName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_ItemName = Convert.ToString(dr["D_ItemName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_ItemCode = Convert.ToString(dr["D_ItemCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_ItemNameCode = Convert.ToString(dr["D_ItemNameCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mItemTypeID = Convert.ToInt32(dr["ItemTypeID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mItemTypeName = Convert.ToString(dr["ItemTypeName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_UnitName = Convert.ToString(dr["D_UnitName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_UnitCode = Convert.ToString(dr["D_UnitCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_OutgoingQty = Convert.ToDecimal(dr["D_OutgoingQty"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mFromStoreName_D = Convert.ToString(dr["FromStoreName_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mToStoreName_D = Convert.ToString(dr["ToStoreName_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mItemName_D = Convert.ToString(dr["ItemName_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mFromStoreName = Convert.ToString(dr["FromStoreName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mToStoreName = Convert.ToString(dr["ToStoreName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mHeaderItemName = Convert.ToString(dr["HeaderItemName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTypeName_D = Convert.ToString(dr["TypeName_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mMaterilaIssueRequest_RemainQty = Convert.ToDecimal(dr["MaterilaIssueRequest_RemainQty"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParent_RemainQty = Convert.ToDecimal(dr["Parent_RemainQty"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mRemainQty = Convert.ToDecimal(dr["RemainQty"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mFifo_Qty = Convert.ToDecimal(dr["Fifo_Qty"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mMaterialIssueVoucherSummary = Convert.ToString(dr["MaterialIssueVoucherSummary"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mBranchCode = Convert.ToString(dr["BranchCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mFA_AssetsID = Convert.ToInt32(dr["FA_AssetsID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mFA_AssetsName = Convert.ToString(dr["FA_AssetsName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mFA_AssetsCode = Convert.ToString(dr["FA_AssetsCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mFA_AssetsBarCode = Convert.ToString(dr["FA_AssetsBarCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentPS_InvoiceNo = Convert.ToString(dr["ParentPS_InvoiceNo"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentPS_InvoiceDate = Convert.ToDateTime(dr["ParentPS_InvoiceDate"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentPS_InvoiceItemUnitPrice = Convert.ToDecimal(dr["ParentPS_InvoiceItemUnitPrice"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentPS_InvoiceItemQty = Convert.ToDecimal(dr["ParentPS_InvoiceItemQty"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentPS_InvoiceItemUnitCurrencyID = Convert.ToInt32(dr["ParentPS_InvoiceItemUnitCurrencyID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentPS_InvoiceItemUnitCurrencyCode = Convert.ToString(dr["ParentPS_InvoiceItemUnitCurrencyCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentPS_InvoiceItemName = Convert.ToString(dr["ParentPS_InvoiceItemName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentPS_InvoiceID = Convert.ToInt64(dr["ParentPS_InvoiceID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mstrParentPS_InvoiceDate = Convert.ToString(dr["strParentPS_InvoiceDate"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mPurchaseInvoiceDate = Convert.ToDateTime(dr["PurchaseInvoiceDate"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mSC_ItemParentTransactionID = Convert.ToInt32(dr["SC_ItemParentTransactionID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mItemParentTransactionCode = Convert.ToString(dr["ItemParentTransactionCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mstrItemParentTransactionID = Convert.ToString(dr["strItemParentTransactionID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mItemsDestintions = Convert.ToString(dr["ItemsDestintions"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mItemsDestintionsLocal = Convert.ToString(dr["ItemsDestintionsLocal"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mInvoiceBranchID = Convert.ToInt32(dr["InvoiceBranchID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mInvoiceBranchName = Convert.ToString(dr["InvoiceBranchName"].ToString());
                        lstCVarvwSC_TransactionsHeaderDetails.Add(ObjCVarvwSC_TransactionsHeaderDetails);
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
            lstCVarvwSC_TransactionsHeaderDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSC_TransactionsHeaderDetails";
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
                        CVarvwSC_TransactionsHeaderDetails ObjCVarvwSC_TransactionsHeaderDetails = new CVarvwSC_TransactionsHeaderDetails();
                        ObjCVarvwSC_TransactionsHeaderDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mCodeManual = Convert.ToString(dr["CodeManual"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mPurchaseInvoiceID = Convert.ToInt64(dr["PurchaseInvoiceID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mPurchaseOrderID = Convert.ToInt32(dr["PurchaseOrderID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mExaminationID = Convert.ToInt32(dr["ExaminationID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mSLInvoiceID = Convert.ToInt64(dr["SLInvoiceID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mIsSpareParts = Convert.ToBoolean(dr["IsSpareParts"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mFiscalYearID = Convert.ToInt32(dr["FiscalYearID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mJV_ID = Convert.ToInt64(dr["JV_ID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mIsOutOfStore = Convert.ToBoolean(dr["IsOutOfStore"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mMaterialIssueRequesitionsID = Convert.ToInt32(dr["MaterialIssueRequesitionsID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mToStoreID = Convert.ToInt32(dr["ToStoreID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mIsBrokerStore = Convert.ToBoolean(dr["IsBrokerStore"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mP_ProductionRequestID = Convert.ToInt32(dr["P_ProductionRequestID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mP_UnitID = Convert.ToInt32(dr["P_UnitID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mP_ItemID = Convert.ToInt64(dr["P_ItemID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mP_LineID = Convert.ToInt32(dr["P_LineID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mP_Qty = Convert.ToDecimal(dr["P_Qty"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mP_FinishedDate = Convert.ToDateTime(dr["P_FinishedDate"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mP_StartDate = Convert.ToDateTime(dr["P_StartDate"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mEntitlementDays = Convert.ToInt32(dr["EntitlementDays"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mIsClosed = Convert.ToBoolean(dr["IsClosed"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mFromStore = Convert.ToInt32(dr["FromStore"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mJV_ID2 = Convert.ToInt64(dr["JV_ID2"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTransferParentID = Convert.ToInt32(dr["TransferParentID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mForwardingPSInvoiceID = Convert.ToInt64(dr["ForwardingPSInvoiceID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTrailerName = Convert.ToString(dr["TrailerName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTrailerCode = Convert.ToInt32(dr["TrailerCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mEquipmentName = Convert.ToString(dr["EquipmentName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mEquipmentCode = Convert.ToInt32(dr["EquipmentCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mDevisonName = Convert.ToString(dr["DevisonName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mDevisonCode = Convert.ToString(dr["DevisonCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mDepartmentCode = Convert.ToString(dr["DepartmentCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTransactionTypeName = Convert.ToString(dr["TransactionTypeName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTransactionType = Convert.ToString(dr["TransactionType"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mID_D = Convert.ToInt32(dr["ID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTransactionID_D = Convert.ToInt32(dr["TransactionID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mItemID_D = Convert.ToInt64(dr["ItemID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mQty_D = Convert.ToDecimal(dr["Qty_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mUnitID_D = Convert.ToInt32(dr["UnitID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mStoreID_D = Convert.ToInt32(dr["StoreID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mReturnedQty_D = Convert.ToDecimal(dr["ReturnedQty_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mAveragePrice = Convert.ToDecimal(dr["AveragePrice"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mNotes_D = Convert.ToString(dr["Notes_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mPurchaseInvoiceDetailsID_D = Convert.ToInt64(dr["PurchaseInvoiceDetailsID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mSLInvoiceDetailsID_D = Convert.ToInt32(dr["SLInvoiceDetailsID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mSubAccountID_D = Convert.ToInt32(dr["SubAccountID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mOriginalQty_D = Convert.ToDecimal(dr["OriginalQty_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentID_D = Convert.ToInt32(dr["ParentID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mAveragePrice_D = Convert.ToDecimal(dr["AveragePrice_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTransactionDate_D = Convert.ToDateTime(dr["TransactionDate_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mQtyFactor_D = Convert.ToInt32(dr["QtyFactor_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mActualQty_D = Convert.ToDecimal(dr["ActualQty_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mIsDeleted_D = Convert.ToBoolean(dr["IsDeleted_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTransactionTypeID_D = Convert.ToInt32(dr["TransactionTypeID_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mItemQty_D = Convert.ToDecimal(dr["ItemQty_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mUnitFactor_D = Convert.ToDecimal(dr["UnitFactor_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTaxAmount_D = Convert.ToDecimal(dr["TaxAmount_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mDiscountAmount_D = Convert.ToDecimal(dr["DiscountAmount_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mInvoicePrice_D = Convert.ToDecimal(dr["InvoicePrice_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_ItemID = Convert.ToInt64(dr["D_ItemID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_UnitID = Convert.ToInt32(dr["D_UnitID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_StoreID = Convert.ToInt32(dr["D_StoreID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_ID = Convert.ToInt32(dr["D_ID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_Notes = Convert.ToString(dr["D_Notes"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_StoreName = Convert.ToString(dr["D_StoreName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_ToStoreName = Convert.ToString(dr["D_ToStoreName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_ItemName = Convert.ToString(dr["D_ItemName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_ItemCode = Convert.ToString(dr["D_ItemCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_ItemNameCode = Convert.ToString(dr["D_ItemNameCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mItemTypeID = Convert.ToInt32(dr["ItemTypeID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mItemTypeName = Convert.ToString(dr["ItemTypeName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_UnitName = Convert.ToString(dr["D_UnitName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_UnitCode = Convert.ToString(dr["D_UnitCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mD_OutgoingQty = Convert.ToDecimal(dr["D_OutgoingQty"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mFromStoreName_D = Convert.ToString(dr["FromStoreName_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mToStoreName_D = Convert.ToString(dr["ToStoreName_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mItemName_D = Convert.ToString(dr["ItemName_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mFromStoreName = Convert.ToString(dr["FromStoreName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mToStoreName = Convert.ToString(dr["ToStoreName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mHeaderItemName = Convert.ToString(dr["HeaderItemName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTypeName_D = Convert.ToString(dr["TypeName_D"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mMaterilaIssueRequest_RemainQty = Convert.ToDecimal(dr["MaterilaIssueRequest_RemainQty"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParent_RemainQty = Convert.ToDecimal(dr["Parent_RemainQty"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mRemainQty = Convert.ToDecimal(dr["RemainQty"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mFifo_Qty = Convert.ToDecimal(dr["Fifo_Qty"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mMaterialIssueVoucherSummary = Convert.ToString(dr["MaterialIssueVoucherSummary"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mBranchCode = Convert.ToString(dr["BranchCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mFA_AssetsID = Convert.ToInt32(dr["FA_AssetsID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mFA_AssetsName = Convert.ToString(dr["FA_AssetsName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mFA_AssetsCode = Convert.ToString(dr["FA_AssetsCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mFA_AssetsBarCode = Convert.ToString(dr["FA_AssetsBarCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentPS_InvoiceNo = Convert.ToString(dr["ParentPS_InvoiceNo"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentPS_InvoiceDate = Convert.ToDateTime(dr["ParentPS_InvoiceDate"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentPS_InvoiceItemUnitPrice = Convert.ToDecimal(dr["ParentPS_InvoiceItemUnitPrice"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentPS_InvoiceItemQty = Convert.ToDecimal(dr["ParentPS_InvoiceItemQty"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentPS_InvoiceItemUnitCurrencyID = Convert.ToInt32(dr["ParentPS_InvoiceItemUnitCurrencyID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentPS_InvoiceItemUnitCurrencyCode = Convert.ToString(dr["ParentPS_InvoiceItemUnitCurrencyCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentPS_InvoiceItemName = Convert.ToString(dr["ParentPS_InvoiceItemName"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mParentPS_InvoiceID = Convert.ToInt64(dr["ParentPS_InvoiceID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mstrParentPS_InvoiceDate = Convert.ToString(dr["strParentPS_InvoiceDate"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mPurchaseInvoiceDate = Convert.ToDateTime(dr["PurchaseInvoiceDate"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mSC_ItemParentTransactionID = Convert.ToInt32(dr["SC_ItemParentTransactionID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mItemParentTransactionCode = Convert.ToString(dr["ItemParentTransactionCode"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mstrItemParentTransactionID = Convert.ToString(dr["strItemParentTransactionID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mItemsDestintions = Convert.ToString(dr["ItemsDestintions"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mItemsDestintionsLocal = Convert.ToString(dr["ItemsDestintionsLocal"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mInvoiceBranchID = Convert.ToInt32(dr["InvoiceBranchID"].ToString());
                        ObjCVarvwSC_TransactionsHeaderDetails.mInvoiceBranchName = Convert.ToString(dr["InvoiceBranchName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSC_TransactionsHeaderDetails.Add(ObjCVarvwSC_TransactionsHeaderDetails);
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
