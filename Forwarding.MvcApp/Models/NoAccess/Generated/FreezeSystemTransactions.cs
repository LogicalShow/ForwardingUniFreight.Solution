using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.NoAccess.Generated
{
    [Serializable]
    public class CPKFreezeSystemTransactions
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
    public partial class CVarFreezeSystemTransactions : CPKFreezeSystemTransactions
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal DateTime mFromDate;
        internal DateTime mToDate;
        internal String mTransType;
        #endregion

        #region "Methods"
        public DateTime FromDate
        {
            get { return mFromDate; }
            set { mIsChanges = true; mFromDate = value; }
        }
        public DateTime ToDate
        {
            get { return mToDate; }
            set { mIsChanges = true; mToDate = value; }
        }
        public String TransType
        {
            get { return mTransType; }
            set { mIsChanges = true; mTransType = value; }
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

    public partial class CFreezeSystemTransactions
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
        public List<CVarFreezeSystemTransactions> lstCVarFreezeSystemTransactions = new List<CVarFreezeSystemTransactions>();
        public List<CPKFreezeSystemTransactions> lstDeletedCPKFreezeSystemTransactions = new List<CPKFreezeSystemTransactions>();
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
            lstCVarFreezeSystemTransactions.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListFreezeSystemTransactions";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemFreezeSystemTransactions";
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
                        CVarFreezeSystemTransactions ObjCVarFreezeSystemTransactions = new CVarFreezeSystemTransactions();
                        ObjCVarFreezeSystemTransactions.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFreezeSystemTransactions.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarFreezeSystemTransactions.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarFreezeSystemTransactions.mTransType = Convert.ToString(dr["TransType"].ToString());
                        lstCVarFreezeSystemTransactions.Add(ObjCVarFreezeSystemTransactions);
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
            lstCVarFreezeSystemTransactions.Clear();

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
                Com.CommandText = "[dbo].GetListPagingFreezeSystemTransactions";
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
                        CVarFreezeSystemTransactions ObjCVarFreezeSystemTransactions = new CVarFreezeSystemTransactions();
                        ObjCVarFreezeSystemTransactions.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFreezeSystemTransactions.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarFreezeSystemTransactions.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarFreezeSystemTransactions.mTransType = Convert.ToString(dr["TransType"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarFreezeSystemTransactions.Add(ObjCVarFreezeSystemTransactions);
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
                    Com.CommandText = "[dbo].DeleteListFreezeSystemTransactions";
                else
                    Com.CommandText = "[dbo].UpdateListFreezeSystemTransactions";
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
        public Exception DeleteItem(List<CPKFreezeSystemTransactions> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemFreezeSystemTransactions";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKFreezeSystemTransactions ObjCPKFreezeSystemTransactions in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKFreezeSystemTransactions.ID);
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
        public Exception SaveMethod(List<CVarFreezeSystemTransactions> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@TransType", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarFreezeSystemTransactions ObjCVarFreezeSystemTransactions in SaveList)
                {
                    if (ObjCVarFreezeSystemTransactions.mIsChanges == true)
                    {
                        if (ObjCVarFreezeSystemTransactions.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemFreezeSystemTransactions";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarFreezeSystemTransactions.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemFreezeSystemTransactions";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarFreezeSystemTransactions.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarFreezeSystemTransactions.ID;
                        }
                        Com.Parameters["@FromDate"].Value = ObjCVarFreezeSystemTransactions.FromDate;
                        Com.Parameters["@ToDate"].Value = ObjCVarFreezeSystemTransactions.ToDate;
                        Com.Parameters["@TransType"].Value = ObjCVarFreezeSystemTransactions.TransType;
                        EndTrans(Com, Con);
                        if (ObjCVarFreezeSystemTransactions.ID == 0)
                        {
                            ObjCVarFreezeSystemTransactions.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarFreezeSystemTransactions.mIsChanges = false;
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
