using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.LoadingandDischarging.Generated
{
    [Serializable]
    public class CPKLD_StorageTransactions
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
    public partial class CVarLD_StorageTransactions : CPKLD_StorageTransactions
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mStorageID;
        internal Int32 mStoreID;
        internal Int32 mPackageTypeID;
        internal Int32 mCoeff;
        internal Int32 mLdHeaderTruckerID;
        #endregion

        #region "Methods"
        public Int32 StorageID
        {
            get { return mStorageID; }
            set { mIsChanges = true; mStorageID = value; }
        }
        public Int32 StoreID
        {
            get { return mStoreID; }
            set { mIsChanges = true; mStoreID = value; }
        }
        public Int32 PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mIsChanges = true; mPackageTypeID = value; }
        }
        public Int32 Coeff
        {
            get { return mCoeff; }
            set { mIsChanges = true; mCoeff = value; }
        }
        public Int32 LdHeaderTruckerID
        {
            get { return mLdHeaderTruckerID; }
            set { mIsChanges = true; mLdHeaderTruckerID = value; }
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

    public partial class CLD_StorageTransactions
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
        public List<CVarLD_StorageTransactions> lstCVarLD_StorageTransactions = new List<CVarLD_StorageTransactions>();
        public List<CPKLD_StorageTransactions> lstDeletedCPKLD_StorageTransactions = new List<CPKLD_StorageTransactions>();
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
            lstCVarLD_StorageTransactions.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListLD_StorageTransactions";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemLD_StorageTransactions";
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
                        CVarLD_StorageTransactions ObjCVarLD_StorageTransactions = new CVarLD_StorageTransactions();
                        ObjCVarLD_StorageTransactions.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLD_StorageTransactions.mStorageID = Convert.ToInt32(dr["StorageID"].ToString());
                        ObjCVarLD_StorageTransactions.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarLD_StorageTransactions.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarLD_StorageTransactions.mCoeff = Convert.ToInt32(dr["Coeff"].ToString());
                        ObjCVarLD_StorageTransactions.mLdHeaderTruckerID = Convert.ToInt32(dr["LdHeaderTruckerID"].ToString());
                        lstCVarLD_StorageTransactions.Add(ObjCVarLD_StorageTransactions);
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
            lstCVarLD_StorageTransactions.Clear();

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
                Com.CommandText = "[dbo].GetListPagingLD_StorageTransactions";
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
                        CVarLD_StorageTransactions ObjCVarLD_StorageTransactions = new CVarLD_StorageTransactions();
                        ObjCVarLD_StorageTransactions.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLD_StorageTransactions.mStorageID = Convert.ToInt32(dr["StorageID"].ToString());
                        ObjCVarLD_StorageTransactions.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarLD_StorageTransactions.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarLD_StorageTransactions.mCoeff = Convert.ToInt32(dr["Coeff"].ToString());
                        ObjCVarLD_StorageTransactions.mLdHeaderTruckerID = Convert.ToInt32(dr["LdHeaderTruckerID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarLD_StorageTransactions.Add(ObjCVarLD_StorageTransactions);
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
                    Com.CommandText = "[dbo].DeleteListLD_StorageTransactions";
                else
                    Com.CommandText = "[dbo].UpdateListLD_StorageTransactions";
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
        public Exception DeleteItem(List<CPKLD_StorageTransactions> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemLD_StorageTransactions";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKLD_StorageTransactions ObjCPKLD_StorageTransactions in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKLD_StorageTransactions.ID);
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
        public Exception SaveMethod(List<CVarLD_StorageTransactions> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@StorageID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@StoreID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PackageTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Coeff", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@LdHeaderTruckerID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarLD_StorageTransactions ObjCVarLD_StorageTransactions in SaveList)
                {
                    if (ObjCVarLD_StorageTransactions.mIsChanges == true)
                    {
                        if (ObjCVarLD_StorageTransactions.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemLD_StorageTransactions";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarLD_StorageTransactions.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemLD_StorageTransactions";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarLD_StorageTransactions.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarLD_StorageTransactions.ID;
                        }
                        Com.Parameters["@StorageID"].Value = ObjCVarLD_StorageTransactions.StorageID;
                        Com.Parameters["@StoreID"].Value = ObjCVarLD_StorageTransactions.StoreID;
                        Com.Parameters["@PackageTypeID"].Value = ObjCVarLD_StorageTransactions.PackageTypeID;
                        Com.Parameters["@Coeff"].Value = ObjCVarLD_StorageTransactions.Coeff;
                        Com.Parameters["@LdHeaderTruckerID"].Value = ObjCVarLD_StorageTransactions.LdHeaderTruckerID;
                        EndTrans(Com, Con);
                        if (ObjCVarLD_StorageTransactions.ID == 0)
                        {
                            ObjCVarLD_StorageTransactions.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarLD_StorageTransactions.mIsChanges = false;
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