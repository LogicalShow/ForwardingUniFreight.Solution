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
    public class CPKUserGroups
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
    public partial class CVarUserGroups : CPKUserGroups
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mUserID;
        internal Int32 mGroupID;
        internal Boolean mCanView;
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
        public Int32 GroupID
        {
            get { return mGroupID; }
            set { mIsChanges = true; mGroupID = value; }
        }
        public Boolean CanView
        {
            get { return mCanView; }
            set { mIsChanges = true; mCanView = value; }
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

    public partial class CUserGroups
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
        public List<CVarUserGroups> lstCVarUserGroups = new List<CVarUserGroups>();
        public List<CPKUserGroups> lstDeletedCPKUserGroups = new List<CPKUserGroups>();
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
        public Exception GetItem(Int64 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarUserGroups.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListUserGroups";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemUserGroups";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                    Com.Parameters[0].Value = Convert.ToInt64(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarUserGroups ObjCVarUserGroups = new CVarUserGroups();
                        ObjCVarUserGroups.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarUserGroups.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarUserGroups.mGroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarUserGroups.mCanView = Convert.ToBoolean(dr["CanView"].ToString());
                        ObjCVarUserGroups.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarUserGroups.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarUserGroups.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarUserGroups.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        lstCVarUserGroups.Add(ObjCVarUserGroups);
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
            lstCVarUserGroups.Clear();

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
                Com.CommandText = "[dbo].GetListPagingUserGroups";
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
                        CVarUserGroups ObjCVarUserGroups = new CVarUserGroups();
                        ObjCVarUserGroups.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarUserGroups.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarUserGroups.mGroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarUserGroups.mCanView = Convert.ToBoolean(dr["CanView"].ToString());
                        ObjCVarUserGroups.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarUserGroups.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarUserGroups.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarUserGroups.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarUserGroups.Add(ObjCVarUserGroups);
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
                    Com.CommandText = "[dbo].DeleteListUserGroups";
                else
                    Com.CommandText = "[dbo].UpdateListUserGroups";
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
        public Exception DeleteItem(List<CPKUserGroups> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemUserGroups";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKUserGroups ObjCPKUserGroups in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKUserGroups.ID);
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
        public Exception SaveMethod(List<CVarUserGroups> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@GroupID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CanView", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarUserGroups ObjCVarUserGroups in SaveList)
                {
                    if (ObjCVarUserGroups.mIsChanges == true)
                    {
                        if (ObjCVarUserGroups.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemUserGroups";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarUserGroups.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemUserGroups";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarUserGroups.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarUserGroups.ID;
                        }
                        Com.Parameters["@UserID"].Value = ObjCVarUserGroups.UserID;
                        Com.Parameters["@GroupID"].Value = ObjCVarUserGroups.GroupID;
                        Com.Parameters["@CanView"].Value = ObjCVarUserGroups.CanView;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarUserGroups.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarUserGroups.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarUserGroups.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarUserGroups.ModificationDate;
                        EndTrans(Com, Con);
                        if (ObjCVarUserGroups.ID == 0)
                        {
                            ObjCVarUserGroups.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarUserGroups.mIsChanges = false;
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
