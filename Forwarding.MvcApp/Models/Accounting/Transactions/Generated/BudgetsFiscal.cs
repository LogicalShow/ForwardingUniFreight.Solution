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
    public class CPKBudgetsFiscal
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
    public partial class CVarBudgetsFiscal : CPKBudgetsFiscal
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mBudgetID;
        internal Int32 mFiscalYearID;
        internal Int32 mMonthID;
        internal DateTime mFromDate;
        internal DateTime mToDate;
        #endregion

        #region "Methods"
        public Int32 BudgetID
        {
            get { return mBudgetID; }
            set { mIsChanges = true; mBudgetID = value; }
        }
        public Int32 FiscalYearID
        {
            get { return mFiscalYearID; }
            set { mIsChanges = true; mFiscalYearID = value; }
        }
        public Int32 MonthID
        {
            get { return mMonthID; }
            set { mIsChanges = true; mMonthID = value; }
        }
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

    public partial class CBudgetsFiscal
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
        public List<CVarBudgetsFiscal> lstCVarBudgetsFiscal = new List<CVarBudgetsFiscal>();
        public List<CPKBudgetsFiscal> lstDeletedCPKBudgetsFiscal = new List<CPKBudgetsFiscal>();
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
            lstCVarBudgetsFiscal.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListBudgetsFiscal";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemBudgetsFiscal";
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
                        CVarBudgetsFiscal ObjCVarBudgetsFiscal = new CVarBudgetsFiscal();
                        ObjCVarBudgetsFiscal.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarBudgetsFiscal.mBudgetID = Convert.ToInt32(dr["BudgetID"].ToString());
                        ObjCVarBudgetsFiscal.mFiscalYearID = Convert.ToInt32(dr["FiscalYearID"].ToString());
                        ObjCVarBudgetsFiscal.mMonthID = Convert.ToInt32(dr["MonthID"].ToString());
                        ObjCVarBudgetsFiscal.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarBudgetsFiscal.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        lstCVarBudgetsFiscal.Add(ObjCVarBudgetsFiscal);
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
            lstCVarBudgetsFiscal.Clear();

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
                Com.CommandText = "[dbo].GetListPagingBudgetsFiscal";
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
                        CVarBudgetsFiscal ObjCVarBudgetsFiscal = new CVarBudgetsFiscal();
                        ObjCVarBudgetsFiscal.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarBudgetsFiscal.mBudgetID = Convert.ToInt32(dr["BudgetID"].ToString());
                        ObjCVarBudgetsFiscal.mFiscalYearID = Convert.ToInt32(dr["FiscalYearID"].ToString());
                        ObjCVarBudgetsFiscal.mMonthID = Convert.ToInt32(dr["MonthID"].ToString());
                        ObjCVarBudgetsFiscal.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarBudgetsFiscal.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarBudgetsFiscal.Add(ObjCVarBudgetsFiscal);
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
                    Com.CommandText = "[dbo].DeleteListBudgetsFiscal";
                else
                    Com.CommandText = "[dbo].UpdateListBudgetsFiscal";
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
        public Exception DeleteItem(List<CPKBudgetsFiscal> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemBudgetsFiscal";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKBudgetsFiscal ObjCPKBudgetsFiscal in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKBudgetsFiscal.ID);
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
        public Exception SaveMethod(List<CVarBudgetsFiscal> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@BudgetID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@FiscalYearID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@MonthID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarBudgetsFiscal ObjCVarBudgetsFiscal in SaveList)
                {
                    if (ObjCVarBudgetsFiscal.mIsChanges == true)
                    {
                        if (ObjCVarBudgetsFiscal.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemBudgetsFiscal";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarBudgetsFiscal.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemBudgetsFiscal";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarBudgetsFiscal.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarBudgetsFiscal.ID;
                        }
                        Com.Parameters["@BudgetID"].Value = ObjCVarBudgetsFiscal.BudgetID;
                        Com.Parameters["@FiscalYearID"].Value = ObjCVarBudgetsFiscal.FiscalYearID;
                        Com.Parameters["@MonthID"].Value = ObjCVarBudgetsFiscal.MonthID;
                        Com.Parameters["@FromDate"].Value = ObjCVarBudgetsFiscal.FromDate;
                        Com.Parameters["@ToDate"].Value = ObjCVarBudgetsFiscal.ToDate;
                        EndTrans(Com, Con);
                        if (ObjCVarBudgetsFiscal.ID == 0)
                        {
                            ObjCVarBudgetsFiscal.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarBudgetsFiscal.mIsChanges = false;
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
