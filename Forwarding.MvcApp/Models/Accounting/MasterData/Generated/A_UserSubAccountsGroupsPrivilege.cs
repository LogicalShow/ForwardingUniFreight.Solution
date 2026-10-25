using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.Accounting.MasterData.Generated
{
    [Serializable]
    public class CPKA_UserSubAccountsGroupsPrivilege
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
    public partial class CVarA_UserSubAccountsGroupsPrivilege : CPKA_UserSubAccountsGroupsPrivilege
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mUserID;
        internal Int32 mSubAccountID;
        #endregion

        #region "Methods"
        public Int32 UserID
        {
            get { return mUserID; }
            set { mIsChanges = true; mUserID = value; }
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

    public partial class CA_UserSubAccountsGroupsPrivilege
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
        public List<CVarA_UserSubAccountsGroupsPrivilege> lstCVarA_UserSubAccountsGroupsPrivilege = new List<CVarA_UserSubAccountsGroupsPrivilege>();
        public List<CPKA_UserSubAccountsGroupsPrivilege> lstDeletedCPKA_UserSubAccountsGroupsPrivilege = new List<CPKA_UserSubAccountsGroupsPrivilege>();
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
            lstCVarA_UserSubAccountsGroupsPrivilege.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_UserSubAccountsGroupsPrivilege";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_UserSubAccountsGroupsPrivilege";
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
                        CVarA_UserSubAccountsGroupsPrivilege ObjCVarA_UserSubAccountsGroupsPrivilege = new CVarA_UserSubAccountsGroupsPrivilege();
                        ObjCVarA_UserSubAccountsGroupsPrivilege.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_UserSubAccountsGroupsPrivilege.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarA_UserSubAccountsGroupsPrivilege.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        lstCVarA_UserSubAccountsGroupsPrivilege.Add(ObjCVarA_UserSubAccountsGroupsPrivilege);
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
            lstCVarA_UserSubAccountsGroupsPrivilege.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_UserSubAccountsGroupsPrivilege";
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
                        CVarA_UserSubAccountsGroupsPrivilege ObjCVarA_UserSubAccountsGroupsPrivilege = new CVarA_UserSubAccountsGroupsPrivilege();
                        ObjCVarA_UserSubAccountsGroupsPrivilege.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_UserSubAccountsGroupsPrivilege.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarA_UserSubAccountsGroupsPrivilege.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_UserSubAccountsGroupsPrivilege.Add(ObjCVarA_UserSubAccountsGroupsPrivilege);
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
                    Com.CommandText = "[dbo].DeleteListA_UserSubAccountsGroupsPrivilege";
                else
                    Com.CommandText = "[dbo].UpdateListA_UserSubAccountsGroupsPrivilege";
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
        public Exception DeleteItem(List<CPKA_UserSubAccountsGroupsPrivilege> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_UserSubAccountsGroupsPrivilege";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKA_UserSubAccountsGroupsPrivilege ObjCPKA_UserSubAccountsGroupsPrivilege in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKA_UserSubAccountsGroupsPrivilege.ID);
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
        public Exception SaveMethod(List<CVarA_UserSubAccountsGroupsPrivilege> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarA_UserSubAccountsGroupsPrivilege ObjCVarA_UserSubAccountsGroupsPrivilege in SaveList)
                {
                    if (ObjCVarA_UserSubAccountsGroupsPrivilege.mIsChanges == true)
                    {
                        if (ObjCVarA_UserSubAccountsGroupsPrivilege.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_UserSubAccountsGroupsPrivilege";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_UserSubAccountsGroupsPrivilege.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_UserSubAccountsGroupsPrivilege";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_UserSubAccountsGroupsPrivilege.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarA_UserSubAccountsGroupsPrivilege.ID;
                        }
                        Com.Parameters["@UserID"].Value = ObjCVarA_UserSubAccountsGroupsPrivilege.UserID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarA_UserSubAccountsGroupsPrivilege.SubAccountID;
                        EndTrans(Com, Con);
                        if (ObjCVarA_UserSubAccountsGroupsPrivilege.ID == 0)
                        {
                            ObjCVarA_UserSubAccountsGroupsPrivilege.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarA_UserSubAccountsGroupsPrivilege.mIsChanges = false;
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
