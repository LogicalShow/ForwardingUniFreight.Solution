using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Administration.Security.Generated
{
    [Serializable]
    public class CPKSecRoleCustomizedTabs
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
    public partial class CVarSecRoleCustomizedTabs : CPKSecRoleCustomizedTabs
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mRoleID;
        internal Int32 mSecCustomizedTabID;
        internal Boolean mCanView;
        internal Boolean mCanAdd;
        internal Boolean mCanEdit;
        internal Boolean mCanDelete;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        #endregion

        #region "Methods"
        public Int32 RoleID
        {
            get { return mRoleID; }
            set { mIsChanges = true; mRoleID = value; }
        }
        public Int32 SecCustomizedTabID
        {
            get { return mSecCustomizedTabID; }
            set { mIsChanges = true; mSecCustomizedTabID = value; }
        }
        public Boolean CanView
        {
            get { return mCanView; }
            set { mIsChanges = true; mCanView = value; }
        }
        public Boolean CanAdd
        {
            get { return mCanAdd; }
            set { mIsChanges = true; mCanAdd = value; }
        }
        public Boolean CanEdit
        {
            get { return mCanEdit; }
            set { mIsChanges = true; mCanEdit = value; }
        }
        public Boolean CanDelete
        {
            get { return mCanDelete; }
            set { mIsChanges = true; mCanDelete = value; }
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

    public partial class CSecRoleCustomizedTabs
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
        public List<CVarSecRoleCustomizedTabs> lstCVarSecRoleCustomizedTabs = new List<CVarSecRoleCustomizedTabs>();
        public List<CPKSecRoleCustomizedTabs> lstDeletedCPKSecRoleCustomizedTabs = new List<CPKSecRoleCustomizedTabs>();
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
            lstCVarSecRoleCustomizedTabs.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListSecRoleCustomizedTabs";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSecRoleCustomizedTabs";
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
                        CVarSecRoleCustomizedTabs ObjCVarSecRoleCustomizedTabs = new CVarSecRoleCustomizedTabs();
                        ObjCVarSecRoleCustomizedTabs.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mRoleID = Convert.ToInt32(dr["RoleID"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mSecCustomizedTabID = Convert.ToInt32(dr["SecCustomizedTabID"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mCanView = Convert.ToBoolean(dr["CanView"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mCanAdd = Convert.ToBoolean(dr["CanAdd"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mCanEdit = Convert.ToBoolean(dr["CanEdit"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mCanDelete = Convert.ToBoolean(dr["CanDelete"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        lstCVarSecRoleCustomizedTabs.Add(ObjCVarSecRoleCustomizedTabs);
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
            lstCVarSecRoleCustomizedTabs.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSecRoleCustomizedTabs";
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
                        CVarSecRoleCustomizedTabs ObjCVarSecRoleCustomizedTabs = new CVarSecRoleCustomizedTabs();
                        ObjCVarSecRoleCustomizedTabs.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mRoleID = Convert.ToInt32(dr["RoleID"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mSecCustomizedTabID = Convert.ToInt32(dr["SecCustomizedTabID"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mCanView = Convert.ToBoolean(dr["CanView"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mCanAdd = Convert.ToBoolean(dr["CanAdd"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mCanEdit = Convert.ToBoolean(dr["CanEdit"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mCanDelete = Convert.ToBoolean(dr["CanDelete"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarSecRoleCustomizedTabs.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSecRoleCustomizedTabs.Add(ObjCVarSecRoleCustomizedTabs);
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
                    Com.CommandText = "[dbo].DeleteListSecRoleCustomizedTabs";
                else
                    Com.CommandText = "[dbo].UpdateListSecRoleCustomizedTabs";
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
        public Exception DeleteItem(List<CPKSecRoleCustomizedTabs> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSecRoleCustomizedTabs";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKSecRoleCustomizedTabs ObjCPKSecRoleCustomizedTabs in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKSecRoleCustomizedTabs.ID);
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
        public Exception SaveMethod(List<CVarSecRoleCustomizedTabs> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@RoleID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SecCustomizedTabID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CanView", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CanAdd", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CanEdit", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CanDelete", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSecRoleCustomizedTabs ObjCVarSecRoleCustomizedTabs in SaveList)
                {
                    if (ObjCVarSecRoleCustomizedTabs.mIsChanges == true)
                    {
                        if (ObjCVarSecRoleCustomizedTabs.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSecRoleCustomizedTabs";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSecRoleCustomizedTabs.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSecRoleCustomizedTabs";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSecRoleCustomizedTabs.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSecRoleCustomizedTabs.ID;
                        }
                        Com.Parameters["@RoleID"].Value = ObjCVarSecRoleCustomizedTabs.RoleID;
                        Com.Parameters["@SecCustomizedTabID"].Value = ObjCVarSecRoleCustomizedTabs.SecCustomizedTabID;
                        Com.Parameters["@CanView"].Value = ObjCVarSecRoleCustomizedTabs.CanView;
                        Com.Parameters["@CanAdd"].Value = ObjCVarSecRoleCustomizedTabs.CanAdd;
                        Com.Parameters["@CanEdit"].Value = ObjCVarSecRoleCustomizedTabs.CanEdit;
                        Com.Parameters["@CanDelete"].Value = ObjCVarSecRoleCustomizedTabs.CanDelete;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarSecRoleCustomizedTabs.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarSecRoleCustomizedTabs.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarSecRoleCustomizedTabs.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarSecRoleCustomizedTabs.ModificationDate;
                        EndTrans(Com, Con);
                        if (ObjCVarSecRoleCustomizedTabs.ID == 0)
                        {
                            ObjCVarSecRoleCustomizedTabs.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSecRoleCustomizedTabs.mIsChanges = false;
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
