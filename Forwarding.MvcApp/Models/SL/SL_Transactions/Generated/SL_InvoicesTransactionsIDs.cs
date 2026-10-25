using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Controllers.SL.API_SL_Transactions
{
    [Serializable]
    public class CPKSL_InvoicesTransactionsIDs
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
    public partial class CVarSL_InvoicesTransactionsIDs : CPKSL_InvoicesTransactionsIDs
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mInvoiceID;
        internal Int32 mTransactionID;
        #endregion

        #region "Methods"
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mIsChanges = true; mInvoiceID = value; }
        }
        public Int32 TransactionID
        {
            get { return mTransactionID; }
            set { mIsChanges = true; mTransactionID = value; }
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

    public partial class CSL_InvoicesTransactionsIDs
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
        public List<CVarSL_InvoicesTransactionsIDs> lstCVarSL_InvoicesTransactionsIDs = new List<CVarSL_InvoicesTransactionsIDs>();
        public List<CPKSL_InvoicesTransactionsIDs> lstDeletedCPKSL_InvoicesTransactionsIDs = new List<CPKSL_InvoicesTransactionsIDs>();
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
            lstCVarSL_InvoicesTransactionsIDs.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSL_InvoicesTransactionsIDs";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSL_InvoicesTransactionsIDs";
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
                        CVarSL_InvoicesTransactionsIDs ObjCVarSL_InvoicesTransactionsIDs = new CVarSL_InvoicesTransactionsIDs();
                        ObjCVarSL_InvoicesTransactionsIDs.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarSL_InvoicesTransactionsIDs.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarSL_InvoicesTransactionsIDs.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        lstCVarSL_InvoicesTransactionsIDs.Add(ObjCVarSL_InvoicesTransactionsIDs);
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
            lstCVarSL_InvoicesTransactionsIDs.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSL_InvoicesTransactionsIDs";
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
                        CVarSL_InvoicesTransactionsIDs ObjCVarSL_InvoicesTransactionsIDs = new CVarSL_InvoicesTransactionsIDs();
                        ObjCVarSL_InvoicesTransactionsIDs.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarSL_InvoicesTransactionsIDs.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarSL_InvoicesTransactionsIDs.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSL_InvoicesTransactionsIDs.Add(ObjCVarSL_InvoicesTransactionsIDs);
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
                    Com.CommandText = "[dbo].DeleteListSL_InvoicesTransactionsIDs";
                else
                    Com.CommandText = "[dbo].UpdateListSL_InvoicesTransactionsIDs";
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
        public Exception DeleteItem(List<CPKSL_InvoicesTransactionsIDs> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSL_InvoicesTransactionsIDs";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKSL_InvoicesTransactionsIDs ObjCPKSL_InvoicesTransactionsIDs in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKSL_InvoicesTransactionsIDs.ID);
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
        public Exception SaveMethod(List<CVarSL_InvoicesTransactionsIDs> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@InvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@TransactionID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSL_InvoicesTransactionsIDs ObjCVarSL_InvoicesTransactionsIDs in SaveList)
                {
                    if (ObjCVarSL_InvoicesTransactionsIDs.mIsChanges == true)
                    {
                        if (ObjCVarSL_InvoicesTransactionsIDs.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSL_InvoicesTransactionsIDs";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSL_InvoicesTransactionsIDs.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSL_InvoicesTransactionsIDs";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSL_InvoicesTransactionsIDs.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSL_InvoicesTransactionsIDs.ID;
                        }
                        Com.Parameters["@InvoiceID"].Value = ObjCVarSL_InvoicesTransactionsIDs.InvoiceID;
                        Com.Parameters["@TransactionID"].Value = ObjCVarSL_InvoicesTransactionsIDs.TransactionID;
                        EndTrans(Com, Con);
                        if (ObjCVarSL_InvoicesTransactionsIDs.ID == 0)
                        {
                            ObjCVarSL_InvoicesTransactionsIDs.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSL_InvoicesTransactionsIDs.mIsChanges = false;
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