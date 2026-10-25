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
    public class CPKvwMaterialIssueVoucherFollowUp
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
    public partial class CVarvwMaterialIssueVoucherFollowUp : CPKvwMaterialIssueVoucherFollowUp
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mTransactionID;
        internal DateTime mTransactionDate;
        internal String mTransactionCode;
        internal String mTransactionCodeManual;
        internal Int32 mStoreID_D;
        internal String mD_StoreName;
        internal Int64 mD_ItemID;
        internal String mD_ItemCode;
        internal String mD_ItemName;
        internal String mD_ItemNameCode;
        internal Int32 mBranchID;
        internal String mBranchName;
        internal Int32 mDepartmentID;
        internal String mDepartmentName;
        internal Int32 mTrailerID;
        internal String mTrailerName;
        internal Int32 mEquipmentID;
        internal String mEquipmentName;
        internal Decimal mQty_D;
        internal String mD_UnitName;
        internal Decimal mAveragePrice_D;
        internal String mItemsNotes;
        internal String m_Type;
        internal Int64 mExpensesID;
        internal String mExpensesName;
        internal Int64 mPartnerTypeID;
        internal Int64 mPartnerID;
        internal String mPartnerTypeName;
        internal String mPartnerName;
        internal String mExpensesNotes;
        internal Decimal mExpensesAmount;
        internal String mStoresIDs;
        internal String mItemsIDs;
        internal String mPartnerTypeIDs;
        internal String mSuppliersIDs;
        internal String mExpensesIDs;
        internal String mItemsDestintions;
        internal String mItemsDestintionsLocal;
        internal Boolean mIsApproved;
        internal String mNotes;
        internal Decimal mTotalExpensesTaxes;
        internal String mExpensesTaxesDetails;
        internal Decimal mTotalExpenses;
        #endregion

        #region "Methods"
        public Int32 TransactionID
        {
            get { return mTransactionID; }
            set { mTransactionID = value; }
        }
        public DateTime TransactionDate
        {
            get { return mTransactionDate; }
            set { mTransactionDate = value; }
        }
        public String TransactionCode
        {
            get { return mTransactionCode; }
            set { mTransactionCode = value; }
        }
        public String TransactionCodeManual
        {
            get { return mTransactionCodeManual; }
            set { mTransactionCodeManual = value; }
        }
        public Int32 StoreID_D
        {
            get { return mStoreID_D; }
            set { mStoreID_D = value; }
        }
        public String D_StoreName
        {
            get { return mD_StoreName; }
            set { mD_StoreName = value; }
        }
        public Int64 D_ItemID
        {
            get { return mD_ItemID; }
            set { mD_ItemID = value; }
        }
        public String D_ItemCode
        {
            get { return mD_ItemCode; }
            set { mD_ItemCode = value; }
        }
        public String D_ItemName
        {
            get { return mD_ItemName; }
            set { mD_ItemName = value; }
        }
        public String D_ItemNameCode
        {
            get { return mD_ItemNameCode; }
            set { mD_ItemNameCode = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mBranchID = value; }
        }
        public String BranchName
        {
            get { return mBranchName; }
            set { mBranchName = value; }
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
        public Int32 TrailerID
        {
            get { return mTrailerID; }
            set { mTrailerID = value; }
        }
        public String TrailerName
        {
            get { return mTrailerName; }
            set { mTrailerName = value; }
        }
        public Int32 EquipmentID
        {
            get { return mEquipmentID; }
            set { mEquipmentID = value; }
        }
        public String EquipmentName
        {
            get { return mEquipmentName; }
            set { mEquipmentName = value; }
        }
        public Decimal Qty_D
        {
            get { return mQty_D; }
            set { mQty_D = value; }
        }
        public String D_UnitName
        {
            get { return mD_UnitName; }
            set { mD_UnitName = value; }
        }
        public Decimal AveragePrice_D
        {
            get { return mAveragePrice_D; }
            set { mAveragePrice_D = value; }
        }
        public String ItemsNotes
        {
            get { return mItemsNotes; }
            set { mItemsNotes = value; }
        }
        public String _Type
        {
            get { return m_Type; }
            set { m_Type = value; }
        }
        public Int64 ExpensesID
        {
            get { return mExpensesID; }
            set { mExpensesID = value; }
        }
        public String ExpensesName
        {
            get { return mExpensesName; }
            set { mExpensesName = value; }
        }
        public Int64 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mPartnerTypeID = value; }
        }
        public Int64 PartnerID
        {
            get { return mPartnerID; }
            set { mPartnerID = value; }
        }
        public String PartnerTypeName
        {
            get { return mPartnerTypeName; }
            set { mPartnerTypeName = value; }
        }
        public String PartnerName
        {
            get { return mPartnerName; }
            set { mPartnerName = value; }
        }
        public String ExpensesNotes
        {
            get { return mExpensesNotes; }
            set { mExpensesNotes = value; }
        }
        public Decimal ExpensesAmount
        {
            get { return mExpensesAmount; }
            set { mExpensesAmount = value; }
        }
        public String StoresIDs
        {
            get { return mStoresIDs; }
            set { mStoresIDs = value; }
        }
        public String ItemsIDs
        {
            get { return mItemsIDs; }
            set { mItemsIDs = value; }
        }
        public String PartnerTypeIDs
        {
            get { return mPartnerTypeIDs; }
            set { mPartnerTypeIDs = value; }
        }
        public String SuppliersIDs
        {
            get { return mSuppliersIDs; }
            set { mSuppliersIDs = value; }
        }
        public String ExpensesIDs
        {
            get { return mExpensesIDs; }
            set { mExpensesIDs = value; }
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
        public Decimal TotalExpensesTaxes
        {
            get { return mTotalExpensesTaxes; }
            set { mTotalExpensesTaxes = value; }
        }
        public String ExpensesTaxesDetails
        {
            get { return mExpensesTaxesDetails; }
            set { mExpensesTaxesDetails = value; }
        }
        public Decimal TotalExpenses
        {
            get { return mTotalExpenses; }
            set { mTotalExpenses = value; }
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

    public partial class CvwMaterialIssueVoucherFollowUp
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
        public List<CVarvwMaterialIssueVoucherFollowUp> lstCVarvwMaterialIssueVoucherFollowUp = new List<CVarvwMaterialIssueVoucherFollowUp>();
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
            lstCVarvwMaterialIssueVoucherFollowUp.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwMaterialIssueVoucherFollowUp";
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
                        CVarvwMaterialIssueVoucherFollowUp ObjCVarvwMaterialIssueVoucherFollowUp = new CVarvwMaterialIssueVoucherFollowUp();
                        ObjCVarvwMaterialIssueVoucherFollowUp.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mTransactionCode = Convert.ToString(dr["TransactionCode"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mTransactionCodeManual = Convert.ToString(dr["TransactionCodeManual"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mStoreID_D = Convert.ToInt32(dr["StoreID_D"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mD_StoreName = Convert.ToString(dr["D_StoreName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mD_ItemID = Convert.ToInt64(dr["D_ItemID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mD_ItemCode = Convert.ToString(dr["D_ItemCode"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mD_ItemName = Convert.ToString(dr["D_ItemName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mD_ItemNameCode = Convert.ToString(dr["D_ItemNameCode"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mTrailerName = Convert.ToString(dr["TrailerName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mEquipmentName = Convert.ToString(dr["EquipmentName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mQty_D = Convert.ToDecimal(dr["Qty_D"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mD_UnitName = Convert.ToString(dr["D_UnitName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mAveragePrice_D = Convert.ToDecimal(dr["AveragePrice_D"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mItemsNotes = Convert.ToString(dr["ItemsNotes"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.m_Type = Convert.ToString(dr["_Type"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mExpensesID = Convert.ToInt64(dr["ExpensesID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mExpensesName = Convert.ToString(dr["ExpensesName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mPartnerTypeID = Convert.ToInt64(dr["PartnerTypeID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mPartnerID = Convert.ToInt64(dr["PartnerID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mPartnerTypeName = Convert.ToString(dr["PartnerTypeName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mExpensesNotes = Convert.ToString(dr["ExpensesNotes"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mStoresIDs = Convert.ToString(dr["StoresIDs"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mItemsIDs = Convert.ToString(dr["ItemsIDs"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mPartnerTypeIDs = Convert.ToString(dr["PartnerTypeIDs"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mSuppliersIDs = Convert.ToString(dr["SuppliersIDs"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mExpensesIDs = Convert.ToString(dr["ExpensesIDs"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mItemsDestintions = Convert.ToString(dr["ItemsDestintions"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mItemsDestintionsLocal = Convert.ToString(dr["ItemsDestintionsLocal"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mTotalExpensesTaxes = Convert.ToDecimal(dr["TotalExpensesTaxes"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mExpensesTaxesDetails = Convert.ToString(dr["ExpensesTaxesDetails"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mTotalExpenses = Convert.ToDecimal(dr["TotalExpenses"].ToString());
                        lstCVarvwMaterialIssueVoucherFollowUp.Add(ObjCVarvwMaterialIssueVoucherFollowUp);
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
            lstCVarvwMaterialIssueVoucherFollowUp.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwMaterialIssueVoucherFollowUp";
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
                        CVarvwMaterialIssueVoucherFollowUp ObjCVarvwMaterialIssueVoucherFollowUp = new CVarvwMaterialIssueVoucherFollowUp();
                        ObjCVarvwMaterialIssueVoucherFollowUp.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mTransactionCode = Convert.ToString(dr["TransactionCode"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mTransactionCodeManual = Convert.ToString(dr["TransactionCodeManual"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mStoreID_D = Convert.ToInt32(dr["StoreID_D"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mD_StoreName = Convert.ToString(dr["D_StoreName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mD_ItemID = Convert.ToInt64(dr["D_ItemID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mD_ItemCode = Convert.ToString(dr["D_ItemCode"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mD_ItemName = Convert.ToString(dr["D_ItemName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mD_ItemNameCode = Convert.ToString(dr["D_ItemNameCode"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mTrailerName = Convert.ToString(dr["TrailerName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mEquipmentName = Convert.ToString(dr["EquipmentName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mQty_D = Convert.ToDecimal(dr["Qty_D"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mD_UnitName = Convert.ToString(dr["D_UnitName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mAveragePrice_D = Convert.ToDecimal(dr["AveragePrice_D"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mItemsNotes = Convert.ToString(dr["ItemsNotes"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.m_Type = Convert.ToString(dr["_Type"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mExpensesID = Convert.ToInt64(dr["ExpensesID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mExpensesName = Convert.ToString(dr["ExpensesName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mPartnerTypeID = Convert.ToInt64(dr["PartnerTypeID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mPartnerID = Convert.ToInt64(dr["PartnerID"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mPartnerTypeName = Convert.ToString(dr["PartnerTypeName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mExpensesNotes = Convert.ToString(dr["ExpensesNotes"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mStoresIDs = Convert.ToString(dr["StoresIDs"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mItemsIDs = Convert.ToString(dr["ItemsIDs"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mPartnerTypeIDs = Convert.ToString(dr["PartnerTypeIDs"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mSuppliersIDs = Convert.ToString(dr["SuppliersIDs"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mExpensesIDs = Convert.ToString(dr["ExpensesIDs"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mItemsDestintions = Convert.ToString(dr["ItemsDestintions"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mItemsDestintionsLocal = Convert.ToString(dr["ItemsDestintionsLocal"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mTotalExpensesTaxes = Convert.ToDecimal(dr["TotalExpensesTaxes"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mExpensesTaxesDetails = Convert.ToString(dr["ExpensesTaxesDetails"].ToString());
                        ObjCVarvwMaterialIssueVoucherFollowUp.mTotalExpenses = Convert.ToDecimal(dr["TotalExpenses"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwMaterialIssueVoucherFollowUp.Add(ObjCVarvwMaterialIssueVoucherFollowUp);
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
