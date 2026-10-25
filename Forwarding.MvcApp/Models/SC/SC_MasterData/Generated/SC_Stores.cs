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
    public class CPKSC_Stores
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
    public partial class CVarSC_Stores : CPKSC_Stores
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
        internal Int32 mSubAccountID;

        #endregion

        #region "Methods"
        public String StoreNumber
        {
            get { return mStoreNumber; }
            set { mIsChanges = true; mStoreNumber = value; }
        }
        public String StoreName
        {
            get { return mStoreName; }
            set { mIsChanges = true; mStoreName = value; }
        }
        public Int32 ParentID
        {
            get { return mParentID; }
            set { mIsChanges = true; mParentID = value; }
        }
        public Boolean IsMain
        {
            get { return mIsMain; }
            set { mIsChanges = true; mIsMain = value; }
        }
        public Byte StoreLevel
        {
            get { return mStoreLevel; }
            set { mIsChanges = true; mStoreLevel = value; }
        }
        public String StoreRealCode
        {
            get { return mStoreRealCode; }
            set { mIsChanges = true; mStoreRealCode = value; }
        }
        public Boolean IsLocked
        {
            get { return mIsLocked; }
            set { mIsChanges = true; mIsLocked = value; }
        }
        public Int32 StoreAccountID
        {
            get { return mStoreAccountID; }
            set { mIsChanges = true; mStoreAccountID = value; }
        }
        public Int32 OperationAccountID
        {
            get { return mOperationAccountID; }
            set { mIsChanges = true; mOperationAccountID = value; }
        }
        public Int32 SalesAccountID
        {
            get { return mSalesAccountID; }
            set { mIsChanges = true; mSalesAccountID = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mIsChanges = true; mCostCenterID = value; }
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

    public partial class CSC_Stores
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
        public List<CVarSC_Stores> lstCVarSC_Stores = new List<CVarSC_Stores>();
        public List<CPKSC_Stores> lstDeletedCPKSC_Stores = new List<CPKSC_Stores>();
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
            lstCVarSC_Stores.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSC_Stores";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSC_Stores";
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
                        CVarSC_Stores ObjCVarSC_Stores = new CVarSC_Stores();
                        ObjCVarSC_Stores.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSC_Stores.mStoreNumber = Convert.ToString(dr["StoreNumber"].ToString());
                        ObjCVarSC_Stores.mStoreName = Convert.ToString(dr["StoreName"].ToString());
                        ObjCVarSC_Stores.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarSC_Stores.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarSC_Stores.mStoreLevel = Convert.ToByte(dr["StoreLevel"].ToString());
                        ObjCVarSC_Stores.mStoreRealCode = Convert.ToString(dr["StoreRealCode"].ToString());
                        ObjCVarSC_Stores.mIsLocked = Convert.ToBoolean(dr["IsLocked"].ToString());
                        ObjCVarSC_Stores.mStoreAccountID = Convert.ToInt32(dr["StoreAccountID"].ToString());
                        ObjCVarSC_Stores.mOperationAccountID = Convert.ToInt32(dr["OperationAccountID"].ToString());
                        ObjCVarSC_Stores.mSalesAccountID = Convert.ToInt32(dr["SalesAccountID"].ToString());
                        ObjCVarSC_Stores.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        lstCVarSC_Stores.Add(ObjCVarSC_Stores);
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
            lstCVarSC_Stores.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSC_Stores";
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
                        CVarSC_Stores ObjCVarSC_Stores = new CVarSC_Stores();
                        ObjCVarSC_Stores.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSC_Stores.mStoreNumber = Convert.ToString(dr["StoreNumber"].ToString());
                        ObjCVarSC_Stores.mStoreName = Convert.ToString(dr["StoreName"].ToString());
                        ObjCVarSC_Stores.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarSC_Stores.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarSC_Stores.mStoreLevel = Convert.ToByte(dr["StoreLevel"].ToString());
                        ObjCVarSC_Stores.mStoreRealCode = Convert.ToString(dr["StoreRealCode"].ToString());
                        ObjCVarSC_Stores.mIsLocked = Convert.ToBoolean(dr["IsLocked"].ToString());
                        ObjCVarSC_Stores.mStoreAccountID = Convert.ToInt32(dr["StoreAccountID"].ToString());
                        ObjCVarSC_Stores.mOperationAccountID = Convert.ToInt32(dr["OperationAccountID"].ToString());
                        ObjCVarSC_Stores.mSalesAccountID = Convert.ToInt32(dr["SalesAccountID"].ToString());
                        ObjCVarSC_Stores.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSC_Stores.Add(ObjCVarSC_Stores);
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
                    Com.CommandText = "[dbo].DeleteListSC_Stores";
                else
                    Com.CommandText = "[dbo].UpdateListSC_Stores";
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
        public Exception DeleteItem(List<CPKSC_Stores> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSC_Stores";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKSC_Stores ObjCPKSC_Stores in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKSC_Stores.ID);
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
        public Exception SaveMethod(List<CVarSC_Stores> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@StoreNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@StoreName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ParentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsMain", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@StoreLevel", SqlDbType.TinyInt));
                Com.Parameters.Add(new SqlParameter("@StoreRealCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsLocked", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@StoreAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OperationAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SalesAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenterID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));

                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSC_Stores ObjCVarSC_Stores in SaveList)
                {
                    if (ObjCVarSC_Stores.mIsChanges == true)
                    {
                        if (ObjCVarSC_Stores.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSC_Stores";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSC_Stores.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSC_Stores";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSC_Stores.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSC_Stores.ID;
                        }
                        Com.Parameters["@StoreNumber"].Value = ObjCVarSC_Stores.StoreNumber;
                        Com.Parameters["@StoreName"].Value = ObjCVarSC_Stores.StoreName;
                        Com.Parameters["@ParentID"].Value = ObjCVarSC_Stores.ParentID;
                        Com.Parameters["@IsMain"].Value = ObjCVarSC_Stores.IsMain;
                        Com.Parameters["@StoreLevel"].Value = ObjCVarSC_Stores.StoreLevel;
                        Com.Parameters["@StoreRealCode"].Value = ObjCVarSC_Stores.StoreRealCode;
                        Com.Parameters["@IsLocked"].Value = ObjCVarSC_Stores.IsLocked;
                        Com.Parameters["@StoreAccountID"].Value = ObjCVarSC_Stores.StoreAccountID;
                        Com.Parameters["@OperationAccountID"].Value = ObjCVarSC_Stores.OperationAccountID;
                        Com.Parameters["@SalesAccountID"].Value = ObjCVarSC_Stores.SalesAccountID;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarSC_Stores.CostCenterID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarSC_Stores.SubAccountID;

                        EndTrans(Com, Con);
                        if (ObjCVarSC_Stores.ID == 0)
                        {
                            ObjCVarSC_Stores.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSC_Stores.mIsChanges = false;
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
