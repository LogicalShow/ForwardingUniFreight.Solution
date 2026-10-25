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
    public class CPKUserForms
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
    public partial class CVarUserForms : CPKUserForms
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mUserID;
        internal Int32 mFormID;
        internal Boolean mCanView;
        internal Boolean mCanAdd;
        internal Boolean mCanEdit;
        internal Boolean mCanDelete;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Boolean mHideOthersRecords;
        #endregion

        #region "Methods"
        public Int32 UserID
        {
            get { return mUserID; }
            set { mIsChanges = true; mUserID = value; }
        }
        public Int32 FormID
        {
            get { return mFormID; }
            set { mIsChanges = true; mFormID = value; }
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
        public Boolean HideOthersRecords
        {
            get { return mHideOthersRecords; }
            set { mIsChanges = true; mHideOthersRecords = value; }
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

    public partial class CUserForms
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
        public List<CVarUserForms> lstCVarUserForms = new List<CVarUserForms>();
        public List<CPKUserForms> lstDeletedCPKUserForms = new List<CPKUserForms>();
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
            lstCVarUserForms.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListUserForms";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemUserForms";
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
                        CVarUserForms ObjCVarUserForms = new CVarUserForms();
                        ObjCVarUserForms.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarUserForms.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarUserForms.mFormID = Convert.ToInt32(dr["FormID"].ToString());
                        ObjCVarUserForms.mCanView = Convert.ToBoolean(dr["CanView"].ToString());
                        ObjCVarUserForms.mCanAdd = Convert.ToBoolean(dr["CanAdd"].ToString());
                        ObjCVarUserForms.mCanEdit = Convert.ToBoolean(dr["CanEdit"].ToString());
                        ObjCVarUserForms.mCanDelete = Convert.ToBoolean(dr["CanDelete"].ToString());
                        ObjCVarUserForms.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarUserForms.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarUserForms.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarUserForms.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarUserForms.mHideOthersRecords = Convert.ToBoolean(dr["HideOthersRecords"].ToString());
                        lstCVarUserForms.Add(ObjCVarUserForms);
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
            lstCVarUserForms.Clear();

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
                Com.CommandText = "[dbo].GetListPagingUserForms";
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
                        CVarUserForms ObjCVarUserForms = new CVarUserForms();
                        ObjCVarUserForms.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarUserForms.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarUserForms.mFormID = Convert.ToInt32(dr["FormID"].ToString());
                        ObjCVarUserForms.mCanView = Convert.ToBoolean(dr["CanView"].ToString());
                        ObjCVarUserForms.mCanAdd = Convert.ToBoolean(dr["CanAdd"].ToString());
                        ObjCVarUserForms.mCanEdit = Convert.ToBoolean(dr["CanEdit"].ToString());
                        ObjCVarUserForms.mCanDelete = Convert.ToBoolean(dr["CanDelete"].ToString());
                        ObjCVarUserForms.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarUserForms.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarUserForms.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarUserForms.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarUserForms.mHideOthersRecords = Convert.ToBoolean(dr["HideOthersRecords"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarUserForms.Add(ObjCVarUserForms);
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
                    Com.CommandText = "[dbo].DeleteListUserForms";
                else
                    Com.CommandText = "[dbo].UpdateListUserForms";
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
        public Exception DeleteItem(List<CPKUserForms> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemUserForms";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKUserForms ObjCPKUserForms in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKUserForms.ID);
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
        public Exception SaveMethod(List<CVarUserForms> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@FormID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CanView", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CanAdd", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CanEdit", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CanDelete", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@HideOthersRecords", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarUserForms ObjCVarUserForms in SaveList)
                {
                    if (ObjCVarUserForms.mIsChanges == true)
                    {
                        if (ObjCVarUserForms.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemUserForms";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarUserForms.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemUserForms";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarUserForms.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarUserForms.ID;
                        }
                        Com.Parameters["@UserID"].Value = ObjCVarUserForms.UserID;
                        Com.Parameters["@FormID"].Value = ObjCVarUserForms.FormID;
                        Com.Parameters["@CanView"].Value = ObjCVarUserForms.CanView;
                        Com.Parameters["@CanAdd"].Value = ObjCVarUserForms.CanAdd;
                        Com.Parameters["@CanEdit"].Value = ObjCVarUserForms.CanEdit;
                        Com.Parameters["@CanDelete"].Value = ObjCVarUserForms.CanDelete;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarUserForms.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarUserForms.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarUserForms.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarUserForms.ModificationDate;
                        Com.Parameters["@HideOthersRecords"].Value = ObjCVarUserForms.HideOthersRecords;
                        EndTrans(Com, Con);
                        if (ObjCVarUserForms.ID == 0)
                        {
                            ObjCVarUserForms.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarUserForms.mIsChanges = false;
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
