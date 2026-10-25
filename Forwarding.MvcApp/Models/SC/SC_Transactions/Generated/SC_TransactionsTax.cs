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
    public class CPKSC_TransactionsTAX
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
    public partial class CVarSC_TransactionsTAX : CPKSC_TransactionsTAX
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

    public partial class CSC_TransactionsTax
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
        public List<CVarSC_TransactionsTAX> lstCVarSC_TransactionsTAX = new List<CVarSC_TransactionsTAX>();
        public List<CPKSC_TransactionsTAX> lstDeletedCPKSC_TransactionsTAX = new List<CPKSC_TransactionsTAX>();
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
            lstCVarSC_TransactionsTAX.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
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
                        CVarSC_TransactionsTAX ObjCVarSC_TransactionsTAX = new CVarSC_TransactionsTAX();
                        ObjCVarSC_TransactionsTAX.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSC_TransactionsTAX.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarSC_TransactionsTAX.mCodeManual = Convert.ToString(dr["CodeManual"].ToString());
                        ObjCVarSC_TransactionsTAX.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarSC_TransactionsTAX.mPurchaseInvoiceID = Convert.ToInt64(dr["PurchaseInvoiceID"].ToString());
                        ObjCVarSC_TransactionsTAX.mPurchaseOrderID = Convert.ToInt32(dr["PurchaseOrderID"].ToString());
                        ObjCVarSC_TransactionsTAX.mExaminationID = Convert.ToInt32(dr["ExaminationID"].ToString());
                        ObjCVarSC_TransactionsTAX.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarSC_TransactionsTAX.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarSC_TransactionsTAX.mSLInvoiceID = Convert.ToInt64(dr["SLInvoiceID"].ToString());
                        ObjCVarSC_TransactionsTAX.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarSC_TransactionsTAX.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarSC_TransactionsTAX.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarSC_TransactionsTAX.mIsSpareParts = Convert.ToBoolean(dr["IsSpareParts"].ToString());
                        ObjCVarSC_TransactionsTAX.mFiscalYearID = Convert.ToInt32(dr["FiscalYearID"].ToString());
                        ObjCVarSC_TransactionsTAX.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarSC_TransactionsTAX.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarSC_TransactionsTAX.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarSC_TransactionsTAX.mJV_ID = Convert.ToInt64(dr["JV_ID"].ToString());
                        ObjCVarSC_TransactionsTAX.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarSC_TransactionsTAX.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarSC_TransactionsTAX.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarSC_TransactionsTAX.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarSC_TransactionsTAX.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarSC_TransactionsTAX.mIsOutOfStore = Convert.ToBoolean(dr["IsOutOfStore"].ToString());
                        ObjCVarSC_TransactionsTAX.mMaterialIssueRequesitionsID = Convert.ToInt32(dr["MaterialIssueRequesitionsID"].ToString());
                        ObjCVarSC_TransactionsTAX.mIsClosed = Convert.ToBoolean(dr["IsClosed"].ToString());
                        ObjCVarSC_TransactionsTAX.mEntitlementDays = Convert.ToInt32(dr["EntitlementDays"].ToString());
                        ObjCVarSC_TransactionsTAX.mFromStore = Convert.ToInt32(dr["FromStore"].ToString());
                        ObjCVarSC_TransactionsTAX.mP_StartDate = Convert.ToDateTime(dr["P_StartDate"].ToString());
                        ObjCVarSC_TransactionsTAX.mP_FinishedDate = Convert.ToDateTime(dr["P_FinishedDate"].ToString());
                        ObjCVarSC_TransactionsTAX.mP_Qty = Convert.ToDecimal(dr["P_Qty"].ToString());
                        ObjCVarSC_TransactionsTAX.mP_LineID = Convert.ToInt32(dr["P_LineID"].ToString());
                        ObjCVarSC_TransactionsTAX.mP_ItemID = Convert.ToInt64(dr["P_ItemID"].ToString());
                        ObjCVarSC_TransactionsTAX.mP_UnitID = Convert.ToInt32(dr["P_UnitID"].ToString());
                        ObjCVarSC_TransactionsTAX.mP_ProductionRequestID = Convert.ToInt32(dr["P_ProductionRequestID"].ToString());
                        ObjCVarSC_TransactionsTAX.mToStoreID = Convert.ToInt32(dr["ToStoreID"].ToString());
                        ObjCVarSC_TransactionsTAX.mJV_ID2 = Convert.ToInt64(dr["JV_ID2"].ToString());
                        ObjCVarSC_TransactionsTAX.mTransferParentID = Convert.ToInt32(dr["TransferParentID"].ToString());
                        ObjCVarSC_TransactionsTAX.mForwardingPSInvoiceID = Convert.ToInt64(dr["ForwardingPSInvoiceID"].ToString());
                        ObjCVarSC_TransactionsTAX.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarSC_TransactionsTAX.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarSC_TransactionsTAX.mIsFromFlexi = Convert.ToBoolean(dr["IsFromFlexi"].ToString());
                        ObjCVarSC_TransactionsTAX.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarSC_TransactionsTAX.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarSC_TransactionsTAX.mDivisionID = Convert.ToInt32(dr["DivisionID"].ToString());
                        ObjCVarSC_TransactionsTAX.mPurchaseInvoiceOpeningBalanceID = Convert.ToInt64(dr["PurchaseInvoiceOpeningBalanceID"].ToString());
                        ObjCVarSC_TransactionsTAX.mSupplyOrderID = Convert.ToInt64(dr["SupplyOrderID"].ToString());
                        lstCVarSC_TransactionsTAX.Add(ObjCVarSC_TransactionsTAX);
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
            lstCVarSC_TransactionsTAX.Clear();

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
                        CVarSC_TransactionsTAX ObjCVarSC_TransactionsTAX = new CVarSC_TransactionsTAX();
                        ObjCVarSC_TransactionsTAX.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSC_TransactionsTAX.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarSC_TransactionsTAX.mCodeManual = Convert.ToString(dr["CodeManual"].ToString());
                        ObjCVarSC_TransactionsTAX.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarSC_TransactionsTAX.mPurchaseInvoiceID = Convert.ToInt64(dr["PurchaseInvoiceID"].ToString());
                        ObjCVarSC_TransactionsTAX.mPurchaseOrderID = Convert.ToInt32(dr["PurchaseOrderID"].ToString());
                        ObjCVarSC_TransactionsTAX.mExaminationID = Convert.ToInt32(dr["ExaminationID"].ToString());
                        ObjCVarSC_TransactionsTAX.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarSC_TransactionsTAX.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarSC_TransactionsTAX.mSLInvoiceID = Convert.ToInt64(dr["SLInvoiceID"].ToString());
                        ObjCVarSC_TransactionsTAX.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarSC_TransactionsTAX.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarSC_TransactionsTAX.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarSC_TransactionsTAX.mIsSpareParts = Convert.ToBoolean(dr["IsSpareParts"].ToString());
                        ObjCVarSC_TransactionsTAX.mFiscalYearID = Convert.ToInt32(dr["FiscalYearID"].ToString());
                        ObjCVarSC_TransactionsTAX.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarSC_TransactionsTAX.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarSC_TransactionsTAX.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarSC_TransactionsTAX.mJV_ID = Convert.ToInt64(dr["JV_ID"].ToString());
                        ObjCVarSC_TransactionsTAX.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarSC_TransactionsTAX.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarSC_TransactionsTAX.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarSC_TransactionsTAX.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarSC_TransactionsTAX.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarSC_TransactionsTAX.mIsOutOfStore = Convert.ToBoolean(dr["IsOutOfStore"].ToString());
                        ObjCVarSC_TransactionsTAX.mMaterialIssueRequesitionsID = Convert.ToInt32(dr["MaterialIssueRequesitionsID"].ToString());
                        ObjCVarSC_TransactionsTAX.mIsClosed = Convert.ToBoolean(dr["IsClosed"].ToString());
                        ObjCVarSC_TransactionsTAX.mEntitlementDays = Convert.ToInt32(dr["EntitlementDays"].ToString());
                        ObjCVarSC_TransactionsTAX.mFromStore = Convert.ToInt32(dr["FromStore"].ToString());
                        ObjCVarSC_TransactionsTAX.mP_StartDate = Convert.ToDateTime(dr["P_StartDate"].ToString());
                        ObjCVarSC_TransactionsTAX.mP_FinishedDate = Convert.ToDateTime(dr["P_FinishedDate"].ToString());
                        ObjCVarSC_TransactionsTAX.mP_Qty = Convert.ToDecimal(dr["P_Qty"].ToString());
                        ObjCVarSC_TransactionsTAX.mP_LineID = Convert.ToInt32(dr["P_LineID"].ToString());
                        ObjCVarSC_TransactionsTAX.mP_ItemID = Convert.ToInt64(dr["P_ItemID"].ToString());
                        ObjCVarSC_TransactionsTAX.mP_UnitID = Convert.ToInt32(dr["P_UnitID"].ToString());
                        ObjCVarSC_TransactionsTAX.mP_ProductionRequestID = Convert.ToInt32(dr["P_ProductionRequestID"].ToString());
                        ObjCVarSC_TransactionsTAX.mToStoreID = Convert.ToInt32(dr["ToStoreID"].ToString());
                        ObjCVarSC_TransactionsTAX.mJV_ID2 = Convert.ToInt64(dr["JV_ID2"].ToString());
                        ObjCVarSC_TransactionsTAX.mTransferParentID = Convert.ToInt32(dr["TransferParentID"].ToString());
                        ObjCVarSC_TransactionsTAX.mForwardingPSInvoiceID = Convert.ToInt64(dr["ForwardingPSInvoiceID"].ToString());
                        ObjCVarSC_TransactionsTAX.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarSC_TransactionsTAX.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarSC_TransactionsTAX.mIsFromFlexi = Convert.ToBoolean(dr["IsFromFlexi"].ToString());
                        ObjCVarSC_TransactionsTAX.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarSC_TransactionsTAX.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarSC_TransactionsTAX.mDivisionID = Convert.ToInt32(dr["DivisionID"].ToString());
                        ObjCVarSC_TransactionsTAX.mPurchaseInvoiceOpeningBalanceID = Convert.ToInt64(dr["PurchaseInvoiceOpeningBalanceID"].ToString());
                        ObjCVarSC_TransactionsTAX.mSupplyOrderID = Convert.ToInt64(dr["SupplyOrderID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSC_TransactionsTAX.Add(ObjCVarSC_TransactionsTAX);
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
                    Com.CommandText = "[dbo].UpdateListSC_TransactionsTax";
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
        public Exception DeleteItem(List<CPKSC_TransactionsTAX> DeleteList)
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
                foreach (CPKSC_TransactionsTAX ObjCPKSC_TransactionsTAX in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKSC_TransactionsTAX.ID);
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
        public Exception SaveMethod(List<CVarSC_TransactionsTAX> SaveList)
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
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSC_TransactionsTAX ObjCVarSC_TransactionsTAX in SaveList)
                {
                    if (ObjCVarSC_TransactionsTAX.mIsChanges == true)
                    {
                        if (ObjCVarSC_TransactionsTAX.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSC_TransactionsTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSC_TransactionsTAX.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSC_TransactionsTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSC_TransactionsTAX.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSC_TransactionsTAX.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarSC_TransactionsTAX.Code;
                        Com.Parameters["@CodeManual"].Value = ObjCVarSC_TransactionsTAX.CodeManual;
                        Com.Parameters["@TransactionDate"].Value = ObjCVarSC_TransactionsTAX.TransactionDate;
                        Com.Parameters["@PurchaseInvoiceID"].Value = ObjCVarSC_TransactionsTAX.PurchaseInvoiceID;
                        Com.Parameters["@PurchaseOrderID"].Value = ObjCVarSC_TransactionsTAX.PurchaseOrderID;
                        Com.Parameters["@ExaminationID"].Value = ObjCVarSC_TransactionsTAX.ExaminationID;
                        Com.Parameters["@IsApproved"].Value = ObjCVarSC_TransactionsTAX.IsApproved;
                        Com.Parameters["@Notes"].Value = ObjCVarSC_TransactionsTAX.Notes;
                        Com.Parameters["@SLInvoiceID"].Value = ObjCVarSC_TransactionsTAX.SLInvoiceID;
                        Com.Parameters["@DepartmentID"].Value = ObjCVarSC_TransactionsTAX.DepartmentID;
                        Com.Parameters["@ClientID"].Value = ObjCVarSC_TransactionsTAX.ClientID;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarSC_TransactionsTAX.CostCenterID;
                        Com.Parameters["@IsSpareParts"].Value = ObjCVarSC_TransactionsTAX.IsSpareParts;
                        Com.Parameters["@FiscalYearID"].Value = ObjCVarSC_TransactionsTAX.FiscalYearID;
                        Com.Parameters["@SupplierID"].Value = ObjCVarSC_TransactionsTAX.SupplierID;
                        Com.Parameters["@ParentID"].Value = ObjCVarSC_TransactionsTAX.ParentID;
                        Com.Parameters["@TransactionTypeID"].Value = ObjCVarSC_TransactionsTAX.TransactionTypeID;
                        Com.Parameters["@JV_ID"].Value = ObjCVarSC_TransactionsTAX.JV_ID;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarSC_TransactionsTAX.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarSC_TransactionsTAX.ModificationDate;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarSC_TransactionsTAX.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarSC_TransactionsTAX.CreationDate;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarSC_TransactionsTAX.IsDeleted;
                        Com.Parameters["@IsOutOfStore"].Value = ObjCVarSC_TransactionsTAX.IsOutOfStore;
                        Com.Parameters["@MaterialIssueRequesitionsID"].Value = ObjCVarSC_TransactionsTAX.MaterialIssueRequesitionsID;
                        Com.Parameters["@IsClosed"].Value = ObjCVarSC_TransactionsTAX.IsClosed;
                        Com.Parameters["@EntitlementDays"].Value = ObjCVarSC_TransactionsTAX.EntitlementDays;
                        Com.Parameters["@FromStore"].Value = ObjCVarSC_TransactionsTAX.FromStore;
                        Com.Parameters["@P_StartDate"].Value = ObjCVarSC_TransactionsTAX.P_StartDate;
                        Com.Parameters["@P_FinishedDate"].Value = ObjCVarSC_TransactionsTAX.P_FinishedDate;
                        Com.Parameters["@P_Qty"].Value = ObjCVarSC_TransactionsTAX.P_Qty;
                        Com.Parameters["@P_LineID"].Value = ObjCVarSC_TransactionsTAX.P_LineID;
                        Com.Parameters["@P_ItemID"].Value = ObjCVarSC_TransactionsTAX.P_ItemID;
                        Com.Parameters["@P_UnitID"].Value = ObjCVarSC_TransactionsTAX.P_UnitID;
                        Com.Parameters["@P_ProductionRequestID"].Value = ObjCVarSC_TransactionsTAX.P_ProductionRequestID;
                        Com.Parameters["@ToStoreID"].Value = ObjCVarSC_TransactionsTAX.ToStoreID;
                        Com.Parameters["@JV_ID2"].Value = ObjCVarSC_TransactionsTAX.JV_ID2;
                        Com.Parameters["@TransferParentID"].Value = ObjCVarSC_TransactionsTAX.TransferParentID;
                        Com.Parameters["@ForwardingPSInvoiceID"].Value = ObjCVarSC_TransactionsTAX.ForwardingPSInvoiceID;
                        Com.Parameters["@OperationID"].Value = ObjCVarSC_TransactionsTAX.OperationID;
                        Com.Parameters["@BranchID"].Value = ObjCVarSC_TransactionsTAX.BranchID;
                        Com.Parameters["@IsFromFlexi"].Value = ObjCVarSC_TransactionsTAX.IsFromFlexi;
                        Com.Parameters["@TrailerID"].Value = ObjCVarSC_TransactionsTAX.TrailerID;
                        Com.Parameters["@EquipmentID"].Value = ObjCVarSC_TransactionsTAX.EquipmentID;
                        Com.Parameters["@DivisionID"].Value = ObjCVarSC_TransactionsTAX.DivisionID;
                        Com.Parameters["@PurchaseInvoiceOpeningBalanceID"].Value = ObjCVarSC_TransactionsTAX.PurchaseInvoiceOpeningBalanceID;
                        Com.Parameters["@SupplyOrderID"].Value = ObjCVarSC_TransactionsTAX.SupplyOrderID;
                        EndTrans(Com, Con);
                        if (ObjCVarSC_TransactionsTAX.ID == 0)
                        {
                            ObjCVarSC_TransactionsTAX.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSC_TransactionsTAX.mIsChanges = false;
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