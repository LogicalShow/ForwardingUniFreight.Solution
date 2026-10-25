using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

//Karim
namespace Forwarding.MvcApp.Models.Accounting.Transactions.Generated
{
    [Serializable]
    public class CPKA_AccountLink
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
    public partial class CVarA_AccountLink : CPKA_AccountLink
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mName;
        internal Int32 mExpensesAccountID;
        internal Int32 mRevenueAccountID;
        internal String mNotes;
        #endregion

        #region "Methods"
        public String Name
        {
            get { return mName; }
            set { mIsChanges = true; mName = value; }
        }
        public Int32 ExpensesAccountID
        {
            get { return mExpensesAccountID; }
            set { mIsChanges = true; mExpensesAccountID = value; }
        }
        public Int32 RevenueAccountID
        {
            get { return mRevenueAccountID; }
            set { mIsChanges = true; mRevenueAccountID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
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

    public partial class CA_AccountLink
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
        public List<CVarA_AccountLink> lstCVarA_AccountLink = new List<CVarA_AccountLink>();
        public List<CPKA_AccountLink> lstDeletedCPKA_AccountLink = new List<CPKA_AccountLink>();
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
            lstCVarA_AccountLink.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_AccountLink";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_AccountLink";
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
                        CVarA_AccountLink ObjCVarA_AccountLink = new CVarA_AccountLink();
                        ObjCVarA_AccountLink.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_AccountLink.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarA_AccountLink.mExpensesAccountID = Convert.ToInt32(dr["ExpensesAccountID"].ToString());
                        ObjCVarA_AccountLink.mRevenueAccountID = Convert.ToInt32(dr["RevenueAccountID"].ToString());
                        ObjCVarA_AccountLink.mNotes = Convert.ToString(dr["Notes"].ToString());
                        lstCVarA_AccountLink.Add(ObjCVarA_AccountLink);
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
            lstCVarA_AccountLink.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_AccountLink";
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
                        CVarA_AccountLink ObjCVarA_AccountLink = new CVarA_AccountLink();
                        ObjCVarA_AccountLink.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_AccountLink.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarA_AccountLink.mExpensesAccountID = Convert.ToInt32(dr["ExpensesAccountID"].ToString());
                        ObjCVarA_AccountLink.mRevenueAccountID = Convert.ToInt32(dr["RevenueAccountID"].ToString());
                        ObjCVarA_AccountLink.mNotes = Convert.ToString(dr["Notes"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_AccountLink.Add(ObjCVarA_AccountLink);
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
                    Com.CommandText = "[dbo].DeleteListA_AccountLink";
                else
                    Com.CommandText = "[dbo].UpdateListA_AccountLink";
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
        public Exception DeleteItem(List<CPKA_AccountLink> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_AccountLink";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKA_AccountLink ObjCPKA_AccountLink in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKA_AccountLink.ID);
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
        public Exception SaveMethod(List<CVarA_AccountLink> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ExpensesAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@RevenueAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarA_AccountLink ObjCVarA_AccountLink in SaveList)
                {
                    if (ObjCVarA_AccountLink.mIsChanges == true)
                    {
                        if (ObjCVarA_AccountLink.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_AccountLink";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_AccountLink.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_AccountLink";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_AccountLink.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarA_AccountLink.ID;
                        }
                        Com.Parameters["@Name"].Value = ObjCVarA_AccountLink.Name;
                        Com.Parameters["@ExpensesAccountID"].Value = ObjCVarA_AccountLink.ExpensesAccountID;
                        Com.Parameters["@RevenueAccountID"].Value = ObjCVarA_AccountLink.RevenueAccountID;
                        Com.Parameters["@Notes"].Value = ObjCVarA_AccountLink.Notes;
                        EndTrans(Com, Con);
                        if (ObjCVarA_AccountLink.ID == 0)
                        {
                            ObjCVarA_AccountLink.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarA_AccountLink.mIsChanges = false;
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
