using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Accounting.Transactions.Generated
{
    [Serializable]
    public class CPKSystemAccount
    {
        #region "variables"
        private Int32 mAccountID;
        #endregion

        #region "Methods"
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mAccountID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarSystemAccount : CPKSystemAccount
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mAccountNameA;
        internal String mAccountNameE;
        internal Int32 mSystemAccountID;
        internal Int32 mParentAccountID;
        #endregion

        #region "Methods"
        public String AccountNameA
        {
            get { return mAccountNameA; }
            set { mIsChanges = true; mAccountNameA = value; }
        }
        public String AccountNameE
        {
            get { return mAccountNameE; }
            set { mIsChanges = true; mAccountNameE = value; }
        }
        public Int32 SystemAccountID
        {
            get { return mSystemAccountID; }
            set { mIsChanges = true; mSystemAccountID = value; }
        }
        public Int32 ParentAccountID
        {
            get { return mParentAccountID; }
            set { mIsChanges = true; mParentAccountID = value; }
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

    public partial class CSystemAccount
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
        public List<CVarSystemAccount> lstCVarSystemAccount = new List<CVarSystemAccount>();
        public List<CPKSystemAccount> lstDeletedCPKSystemAccount = new List<CPKSystemAccount>();
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
        public Exception GetItem(Int32 AccountID)
        {
            return DataFill(Convert.ToString(AccountID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarSystemAccount.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSystemAccount";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSystemAccount";
                    Com.Parameters.Add(new SqlParameter("@AccountID", SqlDbType.Int));
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
                        CVarSystemAccount ObjCVarSystemAccount = new CVarSystemAccount();
                        ObjCVarSystemAccount.AccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarSystemAccount.mAccountNameA = Convert.ToString(dr["AccountNameA"].ToString());
                        ObjCVarSystemAccount.mAccountNameE = Convert.ToString(dr["AccountNameE"].ToString());
                        ObjCVarSystemAccount.mSystemAccountID = Convert.ToInt32(dr["SystemAccountID"].ToString());
                        ObjCVarSystemAccount.mParentAccountID = Convert.ToInt32(dr["ParentAccountID"].ToString());
                        lstCVarSystemAccount.Add(ObjCVarSystemAccount);
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
            lstCVarSystemAccount.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSystemAccount";
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
                        CVarSystemAccount ObjCVarSystemAccount = new CVarSystemAccount();
                        ObjCVarSystemAccount.AccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarSystemAccount.mAccountNameA = Convert.ToString(dr["AccountNameA"].ToString());
                        ObjCVarSystemAccount.mAccountNameE = Convert.ToString(dr["AccountNameE"].ToString());
                        ObjCVarSystemAccount.mSystemAccountID = Convert.ToInt32(dr["SystemAccountID"].ToString());
                        ObjCVarSystemAccount.mParentAccountID = Convert.ToInt32(dr["ParentAccountID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSystemAccount.Add(ObjCVarSystemAccount);
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
                    Com.CommandText = "[dbo].DeleteListSystemAccount";
                else
                    Com.CommandText = "[dbo].UpdateListSystemAccount";
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
        public Exception DeleteItem(List<CPKSystemAccount> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSystemAccount";
                Com.Parameters.Add(new SqlParameter("@AccountID", SqlDbType.Int));
                foreach (CPKSystemAccount ObjCPKSystemAccount in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKSystemAccount.AccountID);
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
        public Exception SaveMethod(List<CVarSystemAccount> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@AccountNameA", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AccountNameE", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@SystemAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ParentAccountID", SqlDbType.Int));
                SqlParameter paraAccountID = Com.Parameters.Add(new SqlParameter("@AccountID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "AccountID", DataRowVersion.Default, null));
                foreach (CVarSystemAccount ObjCVarSystemAccount in SaveList)
                {
                    if (ObjCVarSystemAccount.mIsChanges == true)
                    {
                        if (ObjCVarSystemAccount.AccountID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSystemAccount";
                            paraAccountID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSystemAccount.AccountID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSystemAccount";
                            paraAccountID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSystemAccount.AccountID != 0)
                        {
                            Com.Parameters["@AccountID"].Value = ObjCVarSystemAccount.AccountID;
                        }
                        Com.Parameters["@AccountNameA"].Value = ObjCVarSystemAccount.AccountNameA;
                        Com.Parameters["@AccountNameE"].Value = ObjCVarSystemAccount.AccountNameE;
                        Com.Parameters["@SystemAccountID"].Value = ObjCVarSystemAccount.SystemAccountID;
                        Com.Parameters["@ParentAccountID"].Value = ObjCVarSystemAccount.ParentAccountID;
                        EndTrans(Com, Con);
                        if (ObjCVarSystemAccount.AccountID == 0)
                        {
                            ObjCVarSystemAccount.AccountID = Convert.ToInt32(Com.Parameters["@AccountID"].Value);
                        }
                        ObjCVarSystemAccount.mIsChanges = false;
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
