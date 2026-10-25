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
    public class CPKSecUserCustomizedTabs
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
    public partial class CVarSecUserCustomizedTabs : CPKSecUserCustomizedTabs
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mUserID;
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
        public Int32 UserID
        {
            get { return mUserID; }
            set { mIsChanges = true; mUserID = value; }
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

    public partial class CSecUserCustomizedTabs
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
        public List<CVarSecUserCustomizedTabs> lstCVarSecUserCustomizedTabs = new List<CVarSecUserCustomizedTabs>();
        public List<CPKSecUserCustomizedTabs> lstDeletedCPKSecUserCustomizedTabs = new List<CPKSecUserCustomizedTabs>();
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
            lstCVarSecUserCustomizedTabs.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListSecUserCustomizedTabs";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSecUserCustomizedTabs";
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
                        CVarSecUserCustomizedTabs ObjCVarSecUserCustomizedTabs = new CVarSecUserCustomizedTabs();
                        ObjCVarSecUserCustomizedTabs.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSecUserCustomizedTabs.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarSecUserCustomizedTabs.mSecCustomizedTabID = Convert.ToInt32(dr["SecCustomizedTabID"].ToString());
                        ObjCVarSecUserCustomizedTabs.mCanView = Convert.ToBoolean(dr["CanView"].ToString());
                        ObjCVarSecUserCustomizedTabs.mCanAdd = Convert.ToBoolean(dr["CanAdd"].ToString());
                        ObjCVarSecUserCustomizedTabs.mCanEdit = Convert.ToBoolean(dr["CanEdit"].ToString());
                        ObjCVarSecUserCustomizedTabs.mCanDelete = Convert.ToBoolean(dr["CanDelete"].ToString());
                        ObjCVarSecUserCustomizedTabs.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarSecUserCustomizedTabs.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarSecUserCustomizedTabs.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarSecUserCustomizedTabs.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        lstCVarSecUserCustomizedTabs.Add(ObjCVarSecUserCustomizedTabs);
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
            lstCVarSecUserCustomizedTabs.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSecUserCustomizedTabs";
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
                        CVarSecUserCustomizedTabs ObjCVarSecUserCustomizedTabs = new CVarSecUserCustomizedTabs();
                        ObjCVarSecUserCustomizedTabs.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSecUserCustomizedTabs.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarSecUserCustomizedTabs.mSecCustomizedTabID = Convert.ToInt32(dr["SecCustomizedTabID"].ToString());
                        ObjCVarSecUserCustomizedTabs.mCanView = Convert.ToBoolean(dr["CanView"].ToString());
                        ObjCVarSecUserCustomizedTabs.mCanAdd = Convert.ToBoolean(dr["CanAdd"].ToString());
                        ObjCVarSecUserCustomizedTabs.mCanEdit = Convert.ToBoolean(dr["CanEdit"].ToString());
                        ObjCVarSecUserCustomizedTabs.mCanDelete = Convert.ToBoolean(dr["CanDelete"].ToString());
                        ObjCVarSecUserCustomizedTabs.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarSecUserCustomizedTabs.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarSecUserCustomizedTabs.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarSecUserCustomizedTabs.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSecUserCustomizedTabs.Add(ObjCVarSecUserCustomizedTabs);
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
                    Com.CommandText = "[dbo].DeleteListSecUserCustomizedTabs";
                else
                    Com.CommandText = "[dbo].UpdateListSecUserCustomizedTabs";
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
        public Exception DeleteItem(List<CPKSecUserCustomizedTabs> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSecUserCustomizedTabs";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKSecUserCustomizedTabs ObjCPKSecUserCustomizedTabs in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKSecUserCustomizedTabs.ID);
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
        public Exception SaveMethod(List<CVarSecUserCustomizedTabs> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
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
                foreach (CVarSecUserCustomizedTabs ObjCVarSecUserCustomizedTabs in SaveList)
                {
                    if (ObjCVarSecUserCustomizedTabs.mIsChanges == true)
                    {
                        if (ObjCVarSecUserCustomizedTabs.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSecUserCustomizedTabs";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSecUserCustomizedTabs.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSecUserCustomizedTabs";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSecUserCustomizedTabs.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSecUserCustomizedTabs.ID;
                        }
                        Com.Parameters["@UserID"].Value = ObjCVarSecUserCustomizedTabs.UserID;
                        Com.Parameters["@SecCustomizedTabID"].Value = ObjCVarSecUserCustomizedTabs.SecCustomizedTabID;
                        Com.Parameters["@CanView"].Value = ObjCVarSecUserCustomizedTabs.CanView;
                        Com.Parameters["@CanAdd"].Value = ObjCVarSecUserCustomizedTabs.CanAdd;
                        Com.Parameters["@CanEdit"].Value = ObjCVarSecUserCustomizedTabs.CanEdit;
                        Com.Parameters["@CanDelete"].Value = ObjCVarSecUserCustomizedTabs.CanDelete;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarSecUserCustomizedTabs.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarSecUserCustomizedTabs.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarSecUserCustomizedTabs.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarSecUserCustomizedTabs.ModificationDate;
                        EndTrans(Com, Con);
                        if (ObjCVarSecUserCustomizedTabs.ID == 0)
                        {
                            ObjCVarSecUserCustomizedTabs.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSecUserCustomizedTabs.mIsChanges = false;
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
