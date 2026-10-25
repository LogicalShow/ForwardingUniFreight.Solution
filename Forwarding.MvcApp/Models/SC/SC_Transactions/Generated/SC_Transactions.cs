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
    public class CPKSC_Transactions
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
    public partial class CVarSC_Transactions : CPKSC_Transactions
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
        internal Decimal mP_Qty;
        internal Int32 mP_LineID;
        internal Int64 mP_ItemID;
        internal Int32 mP_UnitID;
        internal Int32 mP_ProductionRequestID;
        internal Int32 mToStoreID;
        internal Int64 mJV_ID2;
        internal Int32 mTransferParentID;
        internal Int64 mForwardingPSInvoiceID;
        internal Int64 mOperationID;
        internal Int32 mBranchID;
        internal Boolean mIsFromFlexi;
        internal Int32 mTrailerID;
        internal Int32 mEquipmentID;
        internal Int32 mDivisionID;
        internal Int64 mPurchaseInvoiceOpeningBalanceID;
        internal Int64 mSupplyOrderID;
        internal Boolean mIsConfirm;
        internal String mAmount;
        internal String mTotalQty;
        internal Int32 mTruckerID;
        internal String mCardNo;
        internal Int32 mAccountID;
        internal Int32 mSubAccountID;


        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public String CodeManual
        {
            get { return mCodeManual; }
            set { mIsChanges = true; mCodeManual = value; }
        }
        public DateTime TransactionDate
        {
            get { return mTransactionDate; }
            set { mIsChanges = true; mTransactionDate = value; }
        }
        public Int64 PurchaseInvoiceID
        {
            get { return mPurchaseInvoiceID; }
            set { mIsChanges = true; mPurchaseInvoiceID = value; }
        }
        public Int32 PurchaseOrderID
        {
            get { return mPurchaseOrderID; }
            set { mIsChanges = true; mPurchaseOrderID = value; }
        }
        public Int32 ExaminationID
        {
            get { return mExaminationID; }
            set { mIsChanges = true; mExaminationID = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsChanges = true; mIsApproved = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int64 SLInvoiceID
        {
            get { return mSLInvoiceID; }
            set { mIsChanges = true; mSLInvoiceID = value; }
        }
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mIsChanges = true; mDepartmentID = value; }
        }
        public Int32 ClientID
        {
            get { return mClientID; }
            set { mIsChanges = true; mClientID = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mIsChanges = true; mCostCenterID = value; }
        }
        public Boolean IsSpareParts
        {
            get { return mIsSpareParts; }
            set { mIsChanges = true; mIsSpareParts = value; }
        }
        public Int32 FiscalYearID
        {
            get { return mFiscalYearID; }
            set { mIsChanges = true; mFiscalYearID = value; }
        }
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mIsChanges = true; mSupplierID = value; }
        }
        public Int32 ParentID
        {
            get { return mParentID; }
            set { mIsChanges = true; mParentID = value; }
        }
        public Int32 TransactionTypeID
        {
            get { return mTransactionTypeID; }
            set { mIsChanges = true; mTransactionTypeID = value; }
        }
        public Int64 JV_ID
        {
            get { return mJV_ID; }
            set { mIsChanges = true; mJV_ID = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mIsChanges = true; mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mIsChanges = true; mModificationDate = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mIsChanges = true; mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
        }
        public Boolean IsOutOfStore
        {
            get { return mIsOutOfStore; }
            set { mIsChanges = true; mIsOutOfStore = value; }
        }
        public Int32 MaterialIssueRequesitionsID
        {
            get { return mMaterialIssueRequesitionsID; }
            set { mIsChanges = true; mMaterialIssueRequesitionsID = value; }
        }
        public Boolean IsClosed
        {
            get { return mIsClosed; }
            set { mIsChanges = true; mIsClosed = value; }
        }
        public Int32 EntitlementDays
        {
            get { return mEntitlementDays; }
            set { mIsChanges = true; mEntitlementDays = value; }
        }
        public Int32 FromStore
        {
            get { return mFromStore; }
            set { mIsChanges = true; mFromStore = value; }
        }
        public DateTime P_StartDate
        {
            get { return mP_StartDate; }
            set { mIsChanges = true; mP_StartDate = value; }
        }
        public DateTime P_FinishedDate
        {
            get { return mP_FinishedDate; }
            set { mIsChanges = true; mP_FinishedDate = value; }
        }
        public Decimal P_Qty
        {
            get { return mP_Qty; }
            set { mIsChanges = true; mP_Qty = value; }
        }
        public Int32 P_LineID
        {
            get { return mP_LineID; }
            set { mIsChanges = true; mP_LineID = value; }
        }
        public Int64 P_ItemID
        {
            get { return mP_ItemID; }
            set { mIsChanges = true; mP_ItemID = value; }
        }
        public Int32 P_UnitID
        {
            get { return mP_UnitID; }
            set { mIsChanges = true; mP_UnitID = value; }
        }
        public Int32 P_ProductionRequestID
        {
            get { return mP_ProductionRequestID; }
            set { mIsChanges = true; mP_ProductionRequestID = value; }
        }
        public Int32 ToStoreID
        {
            get { return mToStoreID; }
            set { mIsChanges = true; mToStoreID = value; }
        }
        public Int64 JV_ID2
        {
            get { return mJV_ID2; }
            set { mIsChanges = true; mJV_ID2 = value; }
        }
        public Int32 TransferParentID
        {
            get { return mTransferParentID; }
            set { mIsChanges = true; mTransferParentID = value; }
        }
        public Int64 ForwardingPSInvoiceID
        {
            get { return mForwardingPSInvoiceID; }
            set { mIsChanges = true; mForwardingPSInvoiceID = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mIsChanges = true; mBranchID = value; }
        }
        public Boolean IsFromFlexi
        {
            get { return mIsFromFlexi; }
            set { mIsChanges = true; mIsFromFlexi = value; }
        }
        public Int32 TrailerID
        {
            get { return mTrailerID; }
            set { mIsChanges = true; mTrailerID = value; }
        }
        public Int32 EquipmentID
        {
            get { return mEquipmentID; }
            set { mIsChanges = true; mEquipmentID = value; }
        }
        public Int32 DivisionID
        {
            get { return mDivisionID; }
            set { mIsChanges = true; mDivisionID = value; }
        }
        public Int64 PurchaseInvoiceOpeningBalanceID
        {
            get { return mPurchaseInvoiceOpeningBalanceID; }
            set { mIsChanges = true; mPurchaseInvoiceOpeningBalanceID = value; }
        }
        public Int64 SupplyOrderID
        {
            get { return mSupplyOrderID; }
            set { mIsChanges = true; mSupplyOrderID = value; }
        }
        public Boolean IsConfirm
        {
            get { return mIsConfirm; }
            set { mIsChanges = true; mIsConfirm = value; }
        }
        public String Amount
        {
            get { return mAmount; }
            set { mIsChanges = true; mAmount = value; }
        }
        public String TotalQty
        {
            get { return mTotalQty; }
            set { mIsChanges = true; mTotalQty = value; }
        }
        public Int32 TruckerID
        {
            get { return mTruckerID; }
            set { mIsChanges = true; mTruckerID = value; }
        }
        public String CardNo
        {
            get { return mCardNo; }
            set { mIsChanges = true; mCardNo = value; }
        }
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mIsChanges = true; mAccountID = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mIsChanges = true; mSubAccountID = value; }
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

    public partial class CSC_Transactions
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
        public List<CVarSC_Transactions> lstCVarSC_Transactions = new List<CVarSC_Transactions>();
        public List<CPKSC_Transactions> lstDeletedCPKSC_Transactions = new List<CPKSC_Transactions>();
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
            lstCVarSC_Transactions.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListSC_Transactions";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSC_Transactions";
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
                        CVarSC_Transactions ObjCVarSC_Transactions = new CVarSC_Transactions();
                        ObjCVarSC_Transactions.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSC_Transactions.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarSC_Transactions.mCodeManual = Convert.ToString(dr["CodeManual"].ToString());
                        ObjCVarSC_Transactions.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarSC_Transactions.mPurchaseInvoiceID = Convert.ToInt64(dr["PurchaseInvoiceID"].ToString());
                        ObjCVarSC_Transactions.mPurchaseOrderID = Convert.ToInt32(dr["PurchaseOrderID"].ToString());
                        ObjCVarSC_Transactions.mExaminationID = Convert.ToInt32(dr["ExaminationID"].ToString());
                        ObjCVarSC_Transactions.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarSC_Transactions.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarSC_Transactions.mSLInvoiceID = Convert.ToInt64(dr["SLInvoiceID"].ToString());
                        ObjCVarSC_Transactions.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarSC_Transactions.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarSC_Transactions.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarSC_Transactions.mIsSpareParts = Convert.ToBoolean(dr["IsSpareParts"].ToString());
                        ObjCVarSC_Transactions.mFiscalYearID = Convert.ToInt32(dr["FiscalYearID"].ToString());
                        ObjCVarSC_Transactions.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarSC_Transactions.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarSC_Transactions.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarSC_Transactions.mJV_ID = Convert.ToInt64(dr["JV_ID"].ToString());
                        ObjCVarSC_Transactions.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarSC_Transactions.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarSC_Transactions.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarSC_Transactions.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarSC_Transactions.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarSC_Transactions.mIsOutOfStore = Convert.ToBoolean(dr["IsOutOfStore"].ToString());
                        ObjCVarSC_Transactions.mMaterialIssueRequesitionsID = Convert.ToInt32(dr["MaterialIssueRequesitionsID"].ToString());
                        ObjCVarSC_Transactions.mIsClosed = Convert.ToBoolean(dr["IsClosed"].ToString());
                        ObjCVarSC_Transactions.mEntitlementDays = Convert.ToInt32(dr["EntitlementDays"].ToString());
                        ObjCVarSC_Transactions.mFromStore = Convert.ToInt32(dr["FromStore"].ToString());
                        ObjCVarSC_Transactions.mP_StartDate = Convert.ToDateTime(dr["P_StartDate"].ToString());
                        ObjCVarSC_Transactions.mP_FinishedDate = Convert.ToDateTime(dr["P_FinishedDate"].ToString());
                        ObjCVarSC_Transactions.mP_Qty = Convert.ToDecimal(dr["P_Qty"].ToString());
                        ObjCVarSC_Transactions.mP_LineID = Convert.ToInt32(dr["P_LineID"].ToString());
                        ObjCVarSC_Transactions.mP_ItemID = Convert.ToInt64(dr["P_ItemID"].ToString());
                        ObjCVarSC_Transactions.mP_UnitID = Convert.ToInt32(dr["P_UnitID"].ToString());
                        ObjCVarSC_Transactions.mP_ProductionRequestID = Convert.ToInt32(dr["P_ProductionRequestID"].ToString());
                        ObjCVarSC_Transactions.mToStoreID = Convert.ToInt32(dr["ToStoreID"].ToString());
                        ObjCVarSC_Transactions.mJV_ID2 = Convert.ToInt64(dr["JV_ID2"].ToString());
                        ObjCVarSC_Transactions.mTransferParentID = Convert.ToInt32(dr["TransferParentID"].ToString());
                        ObjCVarSC_Transactions.mForwardingPSInvoiceID = Convert.ToInt64(dr["ForwardingPSInvoiceID"].ToString());
                        ObjCVarSC_Transactions.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarSC_Transactions.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarSC_Transactions.mIsFromFlexi = Convert.ToBoolean(dr["IsFromFlexi"].ToString());
                        ObjCVarSC_Transactions.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarSC_Transactions.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarSC_Transactions.mDivisionID = Convert.ToInt32(dr["DivisionID"].ToString());
                        ObjCVarSC_Transactions.mPurchaseInvoiceOpeningBalanceID = Convert.ToInt64(dr["PurchaseInvoiceOpeningBalanceID"].ToString());
                        ObjCVarSC_Transactions.mSupplyOrderID = Convert.ToInt64(dr["SupplyOrderID"].ToString());
                        ObjCVarSC_Transactions.mIsConfirm = Convert.ToBoolean(dr["IsConfirm"].ToString());
                        ObjCVarSC_Transactions.mAmount = Convert.ToString(dr["Amount"].ToString());
                        ObjCVarSC_Transactions.mTotalQty = Convert.ToString(dr["TotalQty"].ToString());
                        ObjCVarSC_Transactions.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarSC_Transactions.mCardNo = Convert.ToString(dr["CardNo"].ToString());
                        lstCVarSC_Transactions.Add(ObjCVarSC_Transactions);
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
            lstCVarSC_Transactions.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSC_Transactions";
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
                        CVarSC_Transactions ObjCVarSC_Transactions = new CVarSC_Transactions();
                        ObjCVarSC_Transactions.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSC_Transactions.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarSC_Transactions.mCodeManual = Convert.ToString(dr["CodeManual"].ToString());
                        ObjCVarSC_Transactions.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarSC_Transactions.mPurchaseInvoiceID = Convert.ToInt64(dr["PurchaseInvoiceID"].ToString());
                        ObjCVarSC_Transactions.mPurchaseOrderID = Convert.ToInt32(dr["PurchaseOrderID"].ToString());
                        ObjCVarSC_Transactions.mExaminationID = Convert.ToInt32(dr["ExaminationID"].ToString());
                        ObjCVarSC_Transactions.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarSC_Transactions.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarSC_Transactions.mSLInvoiceID = Convert.ToInt64(dr["SLInvoiceID"].ToString());
                        ObjCVarSC_Transactions.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarSC_Transactions.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarSC_Transactions.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarSC_Transactions.mIsSpareParts = Convert.ToBoolean(dr["IsSpareParts"].ToString());
                        ObjCVarSC_Transactions.mFiscalYearID = Convert.ToInt32(dr["FiscalYearID"].ToString());
                        ObjCVarSC_Transactions.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarSC_Transactions.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarSC_Transactions.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarSC_Transactions.mJV_ID = Convert.ToInt64(dr["JV_ID"].ToString());
                        ObjCVarSC_Transactions.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarSC_Transactions.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarSC_Transactions.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarSC_Transactions.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarSC_Transactions.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarSC_Transactions.mIsOutOfStore = Convert.ToBoolean(dr["IsOutOfStore"].ToString());
                        ObjCVarSC_Transactions.mMaterialIssueRequesitionsID = Convert.ToInt32(dr["MaterialIssueRequesitionsID"].ToString());
                        ObjCVarSC_Transactions.mIsClosed = Convert.ToBoolean(dr["IsClosed"].ToString());
                        ObjCVarSC_Transactions.mEntitlementDays = Convert.ToInt32(dr["EntitlementDays"].ToString());
                        ObjCVarSC_Transactions.mFromStore = Convert.ToInt32(dr["FromStore"].ToString());
                        ObjCVarSC_Transactions.mP_StartDate = Convert.ToDateTime(dr["P_StartDate"].ToString());
                        ObjCVarSC_Transactions.mP_FinishedDate = Convert.ToDateTime(dr["P_FinishedDate"].ToString());
                        ObjCVarSC_Transactions.mP_Qty = Convert.ToDecimal(dr["P_Qty"].ToString());
                        ObjCVarSC_Transactions.mP_LineID = Convert.ToInt32(dr["P_LineID"].ToString());
                        ObjCVarSC_Transactions.mP_ItemID = Convert.ToInt64(dr["P_ItemID"].ToString());
                        ObjCVarSC_Transactions.mP_UnitID = Convert.ToInt32(dr["P_UnitID"].ToString());
                        ObjCVarSC_Transactions.mP_ProductionRequestID = Convert.ToInt32(dr["P_ProductionRequestID"].ToString());
                        ObjCVarSC_Transactions.mToStoreID = Convert.ToInt32(dr["ToStoreID"].ToString());
                        ObjCVarSC_Transactions.mJV_ID2 = Convert.ToInt64(dr["JV_ID2"].ToString());
                        ObjCVarSC_Transactions.mTransferParentID = Convert.ToInt32(dr["TransferParentID"].ToString());
                        ObjCVarSC_Transactions.mForwardingPSInvoiceID = Convert.ToInt64(dr["ForwardingPSInvoiceID"].ToString());
                        ObjCVarSC_Transactions.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarSC_Transactions.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarSC_Transactions.mIsFromFlexi = Convert.ToBoolean(dr["IsFromFlexi"].ToString());
                        ObjCVarSC_Transactions.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarSC_Transactions.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarSC_Transactions.mDivisionID = Convert.ToInt32(dr["DivisionID"].ToString());
                        ObjCVarSC_Transactions.mPurchaseInvoiceOpeningBalanceID = Convert.ToInt64(dr["PurchaseInvoiceOpeningBalanceID"].ToString());
                        ObjCVarSC_Transactions.mSupplyOrderID = Convert.ToInt64(dr["SupplyOrderID"].ToString());
                        ObjCVarSC_Transactions.mIsConfirm = Convert.ToBoolean(dr["IsConfirm"].ToString());
                        ObjCVarSC_Transactions.mAmount = Convert.ToString(dr["Amount"].ToString());
                        ObjCVarSC_Transactions.mTotalQty = Convert.ToString(dr["TotalQty"].ToString());
                        ObjCVarSC_Transactions.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarSC_Transactions.mCardNo = Convert.ToString(dr["CardNo"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSC_Transactions.Add(ObjCVarSC_Transactions);
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
                    Com.CommandText = "[dbo].DeleteListSC_Transactions";
                else
                    Com.CommandText = "[dbo].UpdateListSC_Transactions";
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
        public Exception DeleteItem(List<CPKSC_Transactions> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSC_Transactions";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKSC_Transactions ObjCPKSC_Transactions in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKSC_Transactions.ID);
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
        public Exception SaveMethod(List<CVarSC_Transactions> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CodeManual", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TransactionDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PurchaseInvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@PurchaseOrderID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExaminationID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@SLInvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@DepartmentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ClientID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenterID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsSpareParts", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@FiscalYearID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SupplierID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ParentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TransactionTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@JV_ID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsOutOfStore", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@MaterialIssueRequesitionsID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsClosed", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@EntitlementDays", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@FromStore", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@P_StartDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@P_FinishedDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@P_Qty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@P_LineID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@P_ItemID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@P_UnitID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@P_ProductionRequestID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ToStoreID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@JV_ID2", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@TransferParentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ForwardingPSInvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsFromFlexi", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@TrailerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EquipmentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DivisionID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PurchaseInvoiceOpeningBalanceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@SupplyOrderID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@IsConfirm", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Amount", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TotalQty", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TruckerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CardNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));

                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSC_Transactions ObjCVarSC_Transactions in SaveList)
                {
                    if (ObjCVarSC_Transactions.mIsChanges == true)
                    {
                        if (ObjCVarSC_Transactions.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSC_Transactions";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSC_Transactions.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSC_Transactions";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSC_Transactions.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSC_Transactions.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarSC_Transactions.Code;
                        Com.Parameters["@CodeManual"].Value = ObjCVarSC_Transactions.CodeManual;
                        Com.Parameters["@TransactionDate"].Value = ObjCVarSC_Transactions.TransactionDate;
                        Com.Parameters["@PurchaseInvoiceID"].Value = ObjCVarSC_Transactions.PurchaseInvoiceID;
                        Com.Parameters["@PurchaseOrderID"].Value = ObjCVarSC_Transactions.PurchaseOrderID;
                        Com.Parameters["@ExaminationID"].Value = ObjCVarSC_Transactions.ExaminationID;
                        Com.Parameters["@IsApproved"].Value = ObjCVarSC_Transactions.IsApproved;
                        Com.Parameters["@Notes"].Value = ObjCVarSC_Transactions.Notes;
                        Com.Parameters["@SLInvoiceID"].Value = ObjCVarSC_Transactions.SLInvoiceID;
                        Com.Parameters["@DepartmentID"].Value = ObjCVarSC_Transactions.DepartmentID;
                        Com.Parameters["@ClientID"].Value = ObjCVarSC_Transactions.ClientID;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarSC_Transactions.CostCenterID;
                        Com.Parameters["@IsSpareParts"].Value = ObjCVarSC_Transactions.IsSpareParts;
                        Com.Parameters["@FiscalYearID"].Value = ObjCVarSC_Transactions.FiscalYearID;
                        Com.Parameters["@SupplierID"].Value = ObjCVarSC_Transactions.SupplierID;
                        Com.Parameters["@ParentID"].Value = ObjCVarSC_Transactions.ParentID;
                        Com.Parameters["@TransactionTypeID"].Value = ObjCVarSC_Transactions.TransactionTypeID;
                        Com.Parameters["@JV_ID"].Value = ObjCVarSC_Transactions.JV_ID;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarSC_Transactions.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarSC_Transactions.ModificationDate;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarSC_Transactions.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarSC_Transactions.CreationDate;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarSC_Transactions.IsDeleted;
                        Com.Parameters["@IsOutOfStore"].Value = ObjCVarSC_Transactions.IsOutOfStore;
                        Com.Parameters["@MaterialIssueRequesitionsID"].Value = ObjCVarSC_Transactions.MaterialIssueRequesitionsID;
                        Com.Parameters["@IsClosed"].Value = ObjCVarSC_Transactions.IsClosed;
                        Com.Parameters["@EntitlementDays"].Value = ObjCVarSC_Transactions.EntitlementDays;
                        Com.Parameters["@FromStore"].Value = ObjCVarSC_Transactions.FromStore;
                        Com.Parameters["@P_StartDate"].Value = ObjCVarSC_Transactions.P_StartDate;
                        Com.Parameters["@P_FinishedDate"].Value = ObjCVarSC_Transactions.P_FinishedDate;
                        Com.Parameters["@P_Qty"].Value = ObjCVarSC_Transactions.P_Qty;
                        Com.Parameters["@P_LineID"].Value = ObjCVarSC_Transactions.P_LineID;
                        Com.Parameters["@P_ItemID"].Value = ObjCVarSC_Transactions.P_ItemID;
                        Com.Parameters["@P_UnitID"].Value = ObjCVarSC_Transactions.P_UnitID;
                        Com.Parameters["@P_ProductionRequestID"].Value = ObjCVarSC_Transactions.P_ProductionRequestID;
                        Com.Parameters["@ToStoreID"].Value = ObjCVarSC_Transactions.ToStoreID;
                        Com.Parameters["@JV_ID2"].Value = ObjCVarSC_Transactions.JV_ID2;
                        Com.Parameters["@TransferParentID"].Value = ObjCVarSC_Transactions.TransferParentID;
                        Com.Parameters["@ForwardingPSInvoiceID"].Value = ObjCVarSC_Transactions.ForwardingPSInvoiceID;
                        Com.Parameters["@OperationID"].Value = ObjCVarSC_Transactions.OperationID;
                        Com.Parameters["@BranchID"].Value = ObjCVarSC_Transactions.BranchID;
                        Com.Parameters["@IsFromFlexi"].Value = ObjCVarSC_Transactions.IsFromFlexi;
                        Com.Parameters["@TrailerID"].Value = ObjCVarSC_Transactions.TrailerID;
                        Com.Parameters["@EquipmentID"].Value = ObjCVarSC_Transactions.EquipmentID;
                        Com.Parameters["@DivisionID"].Value = ObjCVarSC_Transactions.DivisionID;
                        Com.Parameters["@PurchaseInvoiceOpeningBalanceID"].Value = ObjCVarSC_Transactions.PurchaseInvoiceOpeningBalanceID;
                        Com.Parameters["@SupplyOrderID"].Value = ObjCVarSC_Transactions.SupplyOrderID;
                        Com.Parameters["@IsConfirm"].Value = ObjCVarSC_Transactions.IsConfirm;
                        Com.Parameters["@Amount"].Value = ObjCVarSC_Transactions.Amount;
                        Com.Parameters["@TotalQty"].Value = ObjCVarSC_Transactions.TotalQty;
                        Com.Parameters["@TruckerID"].Value = ObjCVarSC_Transactions.TruckerID;
                        Com.Parameters["@CardNo"].Value = ObjCVarSC_Transactions.CardNo;
                        Com.Parameters["@AccountID"].Value = ObjCVarSC_Transactions.AccountID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarSC_Transactions.SubAccountID;

                        EndTrans(Com, Con);
                        if (ObjCVarSC_Transactions.ID == 0)
                        {
                            ObjCVarSC_Transactions.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSC_Transactions.mIsChanges = false;
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