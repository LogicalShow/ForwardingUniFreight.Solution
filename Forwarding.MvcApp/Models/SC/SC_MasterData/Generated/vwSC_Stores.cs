using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SC.MasterData.Generated
{
    [Serializable]
    public class CPKvwSC_Stores
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
    public partial class CVarvwSC_Stores : CPKvwSC_Stores
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mStoreNumber;
        internal String mStoreName;
        internal Int32 mParentID;
        internal Boolean mIsMain;
        internal Byte mStoreLevel;
        internal String mStoreRealCode;
        internal Boolean mIsLocked;
        internal Int32 mStoreAccountID;
        internal Int32 mOperationAccountID;
        internal Int32 mSalesAccountID;
        internal Int32 mCostCenterID;
        internal String mStoreAccountName;
        internal String mOperationAccountName;
        internal String mSalesAccountName;
        internal String mCostCenterName;
        internal Boolean mIsBrokenStore;
        internal Boolean mIsRawStore;
        internal Boolean mIsUnderOperationStore;
        internal Boolean mIsFinalProductStore;
        internal Int32 mSubAccountID;

        #endregion

        #region "Methods"
        public String StoreNumber
        {
            get { return mStoreNumber; }
            set { mStoreNumber = value; }
        }
        public String StoreName
        {
            get { return mStoreName; }
            set { mStoreName = value; }
        }
        public Int32 ParentID
        {
            get { return mParentID; }
            set { mParentID = value; }
        }
        public Boolean IsMain
        {
            get { return mIsMain; }
            set { mIsMain = value; }
        }
        public Byte StoreLevel
        {
            get { return mStoreLevel; }
            set { mStoreLevel = value; }
        }
        public String StoreRealCode
        {
            get { return mStoreRealCode; }
            set { mStoreRealCode = value; }
        }
        public Boolean IsLocked
        {
            get { return mIsLocked; }
            set { mIsLocked = value; }
        }
        public Int32 StoreAccountID
        {
            get { return mStoreAccountID; }
            set { mStoreAccountID = value; }
        }
        public Int32 OperationAccountID
        {
            get { return mOperationAccountID; }
            set { mOperationAccountID = value; }
        }
        public Int32 SalesAccountID
        {
            get { return mSalesAccountID; }
            set { mSalesAccountID = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mCostCenterID = value; }
        }
        public String StoreAccountName
        {
            get { return mStoreAccountName; }
            set { mStoreAccountName = value; }
        }
        public String OperationAccountName
        {
            get { return mOperationAccountName; }
            set { mOperationAccountName = value; }
        }
        public String SalesAccountName
        {
            get { return mSalesAccountName; }
            set { mSalesAccountName = value; }
        }
        public String CostCenterName
        {
            get { return mCostCenterName; }
            set { mCostCenterName = value; }
        }
        public Boolean IsBrokenStore
        {
            get { return mIsBrokenStore; }
            set { mIsBrokenStore = value; }
        }
        public Boolean IsRawStore
        {
            get { return mIsRawStore; }
            set { mIsRawStore = value; }
        }
        public Boolean IsUnderOperationStore
        {
            get { return mIsUnderOperationStore; }
            set { mIsUnderOperationStore = value; }
        }
        public Boolean IsFinalProductStore
        {
            get { return mIsFinalProductStore; }
            set { mIsFinalProductStore = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mSubAccountID = value; }
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

    public partial class CvwSC_Stores
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
        public List<CVarvwSC_Stores> lstCVarvwSC_Stores = new List<CVarvwSC_Stores>();
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
            lstCVarvwSC_Stores.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSC_Stores";
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
                        CVarvwSC_Stores ObjCVarvwSC_Stores = new CVarvwSC_Stores();
                        ObjCVarvwSC_Stores.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSC_Stores.mStoreNumber = Convert.ToString(dr["StoreNumber"].ToString());
                        ObjCVarvwSC_Stores.mStoreName = Convert.ToString(dr["StoreName"].ToString());
                        ObjCVarvwSC_Stores.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarvwSC_Stores.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarvwSC_Stores.mStoreLevel = Convert.ToByte(dr["StoreLevel"].ToString());
                        ObjCVarvwSC_Stores.mStoreRealCode = Convert.ToString(dr["StoreRealCode"].ToString());
                        ObjCVarvwSC_Stores.mIsLocked = Convert.ToBoolean(dr["IsLocked"].ToString());
                        ObjCVarvwSC_Stores.mStoreAccountID = Convert.ToInt32(dr["StoreAccountID"].ToString());
                        ObjCVarvwSC_Stores.mOperationAccountID = Convert.ToInt32(dr["OperationAccountID"].ToString());
                        ObjCVarvwSC_Stores.mSalesAccountID = Convert.ToInt32(dr["SalesAccountID"].ToString());
                        ObjCVarvwSC_Stores.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwSC_Stores.mStoreAccountName = Convert.ToString(dr["StoreAccountName"].ToString());
                        ObjCVarvwSC_Stores.mOperationAccountName = Convert.ToString(dr["OperationAccountName"].ToString());
                        ObjCVarvwSC_Stores.mSalesAccountName = Convert.ToString(dr["SalesAccountName"].ToString());
                        ObjCVarvwSC_Stores.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwSC_Stores.mIsBrokenStore = Convert.ToBoolean(dr["IsBrokenStore"].ToString());
                        ObjCVarvwSC_Stores.mIsRawStore = Convert.ToBoolean(dr["IsRawStore"].ToString());
                        ObjCVarvwSC_Stores.mIsUnderOperationStore = Convert.ToBoolean(dr["IsUnderOperationStore"].ToString());
                        ObjCVarvwSC_Stores.mIsFinalProductStore = Convert.ToBoolean(dr["IsFinalProductStore"].ToString());
                        lstCVarvwSC_Stores.Add(ObjCVarvwSC_Stores);
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
            lstCVarvwSC_Stores.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSC_Stores";
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
                        CVarvwSC_Stores ObjCVarvwSC_Stores = new CVarvwSC_Stores();
                        ObjCVarvwSC_Stores.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSC_Stores.mStoreNumber = Convert.ToString(dr["StoreNumber"].ToString());
                        ObjCVarvwSC_Stores.mStoreName = Convert.ToString(dr["StoreName"].ToString());
                        ObjCVarvwSC_Stores.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarvwSC_Stores.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarvwSC_Stores.mStoreLevel = Convert.ToByte(dr["StoreLevel"].ToString());
                        ObjCVarvwSC_Stores.mStoreRealCode = Convert.ToString(dr["StoreRealCode"].ToString());
                        ObjCVarvwSC_Stores.mIsLocked = Convert.ToBoolean(dr["IsLocked"].ToString());
                        ObjCVarvwSC_Stores.mStoreAccountID = Convert.ToInt32(dr["StoreAccountID"].ToString());
                        ObjCVarvwSC_Stores.mOperationAccountID = Convert.ToInt32(dr["OperationAccountID"].ToString());
                        ObjCVarvwSC_Stores.mSalesAccountID = Convert.ToInt32(dr["SalesAccountID"].ToString());
                        ObjCVarvwSC_Stores.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwSC_Stores.mStoreAccountName = Convert.ToString(dr["StoreAccountName"].ToString());
                        ObjCVarvwSC_Stores.mOperationAccountName = Convert.ToString(dr["OperationAccountName"].ToString());
                        ObjCVarvwSC_Stores.mSalesAccountName = Convert.ToString(dr["SalesAccountName"].ToString());
                        ObjCVarvwSC_Stores.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwSC_Stores.mIsBrokenStore = Convert.ToBoolean(dr["IsBrokenStore"].ToString());
                        ObjCVarvwSC_Stores.mIsRawStore = Convert.ToBoolean(dr["IsRawStore"].ToString());
                        ObjCVarvwSC_Stores.mIsUnderOperationStore = Convert.ToBoolean(dr["IsUnderOperationStore"].ToString());
                        ObjCVarvwSC_Stores.mIsFinalProductStore = Convert.ToBoolean(dr["IsFinalProductStore"].ToString());
                        ObjCVarvwSC_Stores.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());

                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSC_Stores.Add(ObjCVarvwSC_Stores);
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
