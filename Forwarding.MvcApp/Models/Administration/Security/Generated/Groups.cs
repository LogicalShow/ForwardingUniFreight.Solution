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
    public class CPKGroups
    {
        #region "variables"
        private Int32 mGroupID;
        #endregion

        #region "Methods"
        public Int32 GroupID
        {
            get { return mGroupID; }
            set { mGroupID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarGroups : CPKGroups
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mParentGroupID;
        internal String mGroupCode;
        internal Int32 mGroupOrderNo;
        internal String mGroupIconName;
        internal String mGroupImageURL;
        internal String mGroupDecryptedName;
        internal Int32 mCreatorUserID;
        internal Int32 mwebpages_UserID;
        internal Boolean mIsInactive;
        internal Boolean mIsForCustomers;
        #endregion

        #region "Methods"
        public Int32 ParentGroupID
        {
            get { return mParentGroupID; }
            set { mIsChanges = true; mParentGroupID = value; }
        }
        public String GroupCode
        {
            get { return mGroupCode; }
            set { mIsChanges = true; mGroupCode = value; }
        }
        public Int32 GroupOrderNo
        {
            get { return mGroupOrderNo; }
            set { mIsChanges = true; mGroupOrderNo = value; }
        }
        public String GroupIconName
        {
            get { return mGroupIconName; }
            set { mIsChanges = true; mGroupIconName = value; }
        }
        public String GroupImageURL
        {
            get { return mGroupImageURL; }
            set { mIsChanges = true; mGroupImageURL = value; }
        }
        public String GroupDecryptedName
        {
            get { return mGroupDecryptedName; }
            set { mIsChanges = true; mGroupDecryptedName = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mIsChanges = true; mCreatorUserID = value; }
        }
        public Int32 webpages_UserID
        {
            get { return mwebpages_UserID; }
            set { mIsChanges = true; mwebpages_UserID = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsChanges = true; mIsInactive = value; }
        }
        public Boolean IsForCustomers
        {
            get { return mIsForCustomers; }
            set { mIsChanges = true; mIsForCustomers = value; }
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

    public partial class CGroups
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
        public List<CVarGroups> lstCVarGroups = new List<CVarGroups>();
        public List<CPKGroups> lstDeletedCPKGroups = new List<CPKGroups>();
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
        public Exception GetItem(Int32 GroupID)
        {
            return DataFill(Convert.ToString(GroupID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarGroups.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListGroups";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemGroups";
                    Com.Parameters.Add(new SqlParameter("@GroupID", SqlDbType.Int));
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
                        CVarGroups ObjCVarGroups = new CVarGroups();
                        ObjCVarGroups.GroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarGroups.mParentGroupID = Convert.ToInt32(dr["ParentGroupID"].ToString());
                        ObjCVarGroups.mGroupCode = Convert.ToString(dr["GroupCode"].ToString());
                        ObjCVarGroups.mGroupOrderNo = Convert.ToInt32(dr["GroupOrderNo"].ToString());
                        ObjCVarGroups.mGroupIconName = Convert.ToString(dr["GroupIconName"].ToString());
                        ObjCVarGroups.mGroupImageURL = Convert.ToString(dr["GroupImageURL"].ToString());
                        ObjCVarGroups.mGroupDecryptedName = Convert.ToString(dr["GroupDecryptedName"].ToString());
                        ObjCVarGroups.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarGroups.mwebpages_UserID = Convert.ToInt32(dr["webpages_UserID"].ToString());
                        ObjCVarGroups.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarGroups.mIsForCustomers = Convert.ToBoolean(dr["IsForCustomers"].ToString());
                        lstCVarGroups.Add(ObjCVarGroups);
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
            lstCVarGroups.Clear();

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
                Com.CommandText = "[dbo].GetListPagingGroups";
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
                        CVarGroups ObjCVarGroups = new CVarGroups();
                        ObjCVarGroups.GroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarGroups.mParentGroupID = Convert.ToInt32(dr["ParentGroupID"].ToString());
                        ObjCVarGroups.mGroupCode = Convert.ToString(dr["GroupCode"].ToString());
                        ObjCVarGroups.mGroupOrderNo = Convert.ToInt32(dr["GroupOrderNo"].ToString());
                        ObjCVarGroups.mGroupIconName = Convert.ToString(dr["GroupIconName"].ToString());
                        ObjCVarGroups.mGroupImageURL = Convert.ToString(dr["GroupImageURL"].ToString());
                        ObjCVarGroups.mGroupDecryptedName = Convert.ToString(dr["GroupDecryptedName"].ToString());
                        ObjCVarGroups.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarGroups.mwebpages_UserID = Convert.ToInt32(dr["webpages_UserID"].ToString());
                        ObjCVarGroups.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarGroups.mIsForCustomers = Convert.ToBoolean(dr["IsForCustomers"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarGroups.Add(ObjCVarGroups);
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
                    Com.CommandText = "[dbo].DeleteListGroups";
                else
                    Com.CommandText = "[dbo].UpdateListGroups";
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
        public Exception DeleteItem(List<CPKGroups> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemGroups";
                Com.Parameters.Add(new SqlParameter("@GroupID", SqlDbType.Int));
                foreach (CPKGroups ObjCPKGroups in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKGroups.GroupID);
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
        public Exception SaveMethod(List<CVarGroups> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@ParentGroupID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@GroupCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@GroupOrderNo", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@GroupIconName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@GroupImageURL", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@GroupDecryptedName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@webpages_UserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsForCustomers", SqlDbType.Bit));
                SqlParameter paraGroupID = Com.Parameters.Add(new SqlParameter("@GroupID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "GroupID", DataRowVersion.Default, null));
                foreach (CVarGroups ObjCVarGroups in SaveList)
                {
                    if (ObjCVarGroups.mIsChanges == true)
                    {
                        if (ObjCVarGroups.GroupID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemGroups";
                            paraGroupID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarGroups.GroupID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemGroups";
                            paraGroupID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarGroups.GroupID != 0)
                        {
                            Com.Parameters["@GroupID"].Value = ObjCVarGroups.GroupID;
                        }
                        Com.Parameters["@ParentGroupID"].Value = ObjCVarGroups.ParentGroupID;
                        Com.Parameters["@GroupCode"].Value = ObjCVarGroups.GroupCode;
                        Com.Parameters["@GroupOrderNo"].Value = ObjCVarGroups.GroupOrderNo;
                        Com.Parameters["@GroupIconName"].Value = ObjCVarGroups.GroupIconName;
                        Com.Parameters["@GroupImageURL"].Value = ObjCVarGroups.GroupImageURL;
                        Com.Parameters["@GroupDecryptedName"].Value = ObjCVarGroups.GroupDecryptedName;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarGroups.CreatorUserID;
                        Com.Parameters["@webpages_UserID"].Value = ObjCVarGroups.webpages_UserID;
                        Com.Parameters["@IsInactive"].Value = ObjCVarGroups.IsInactive;
                        Com.Parameters["@IsForCustomers"].Value = ObjCVarGroups.IsForCustomers;
                        EndTrans(Com, Con);
                        if (ObjCVarGroups.GroupID == 0)
                        {
                            ObjCVarGroups.GroupID = Convert.ToInt32(Com.Parameters["@GroupID"].Value);
                        }
                        ObjCVarGroups.mIsChanges = false;
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
