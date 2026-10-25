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
    public class CPKA_Fiscal_Year_Period
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
    public partial class CVarA_Fiscal_Year_Period : CPKA_Fiscal_Year_Period
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mFiscal_Year_ID;
        internal DateTime mFrom_Date;
        internal DateTime mTo_Date;
        internal Boolean mClosed;
        internal Int32 mClosed_User_ID;
        #endregion

        #region "Methods"
        public Int32 Fiscal_Year_ID
        {
            get { return mFiscal_Year_ID; }
            set { mIsChanges = true; mFiscal_Year_ID = value; }
        }
        public DateTime From_Date
        {
            get { return mFrom_Date; }
            set { mIsChanges = true; mFrom_Date = value; }
        }
        public DateTime To_Date
        {
            get { return mTo_Date; }
            set { mIsChanges = true; mTo_Date = value; }
        }
        public Boolean Closed
        {
            get { return mClosed; }
            set { mIsChanges = true; mClosed = value; }
        }
        public Int32 Closed_User_ID
        {
            get { return mClosed_User_ID; }
            set { mIsChanges = true; mClosed_User_ID = value; }
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

    public partial class CA_Fiscal_Year_Period
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
        public List<CVarA_Fiscal_Year_Period> lstCVarA_Fiscal_Year_Period = new List<CVarA_Fiscal_Year_Period>();
        public List<CPKA_Fiscal_Year_Period> lstDeletedCPKA_Fiscal_Year_Period = new List<CPKA_Fiscal_Year_Period>();
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
            lstCVarA_Fiscal_Year_Period.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_Fiscal_Year_Period";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_Fiscal_Year_Period";
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
                        CVarA_Fiscal_Year_Period ObjCVarA_Fiscal_Year_Period = new CVarA_Fiscal_Year_Period();
                        ObjCVarA_Fiscal_Year_Period.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_Fiscal_Year_Period.mFiscal_Year_ID = Convert.ToInt32(dr["Fiscal_Year_ID"].ToString());
                        ObjCVarA_Fiscal_Year_Period.mFrom_Date = Convert.ToDateTime(dr["From_Date"].ToString());
                        ObjCVarA_Fiscal_Year_Period.mTo_Date = Convert.ToDateTime(dr["To_Date"].ToString());
                        ObjCVarA_Fiscal_Year_Period.mClosed = Convert.ToBoolean(dr["Closed"].ToString());
                        ObjCVarA_Fiscal_Year_Period.mClosed_User_ID = Convert.ToInt32(dr["Closed_User_ID"].ToString());
                        lstCVarA_Fiscal_Year_Period.Add(ObjCVarA_Fiscal_Year_Period);
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
            lstCVarA_Fiscal_Year_Period.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_Fiscal_Year_Period";
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
                        CVarA_Fiscal_Year_Period ObjCVarA_Fiscal_Year_Period = new CVarA_Fiscal_Year_Period();
                        ObjCVarA_Fiscal_Year_Period.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_Fiscal_Year_Period.mFiscal_Year_ID = Convert.ToInt32(dr["Fiscal_Year_ID"].ToString());
                        ObjCVarA_Fiscal_Year_Period.mFrom_Date = Convert.ToDateTime(dr["From_Date"].ToString());
                        ObjCVarA_Fiscal_Year_Period.mTo_Date = Convert.ToDateTime(dr["To_Date"].ToString());
                        ObjCVarA_Fiscal_Year_Period.mClosed = Convert.ToBoolean(dr["Closed"].ToString());
                        ObjCVarA_Fiscal_Year_Period.mClosed_User_ID = Convert.ToInt32(dr["Closed_User_ID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_Fiscal_Year_Period.Add(ObjCVarA_Fiscal_Year_Period);
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
                    Com.CommandText = "[dbo].DeleteListA_Fiscal_Year_Period";
                else
                    Com.CommandText = "[dbo].UpdateListA_Fiscal_Year_Period";
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
        public Exception DeleteItem(List<CPKA_Fiscal_Year_Period> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_Fiscal_Year_Period";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKA_Fiscal_Year_Period ObjCPKA_Fiscal_Year_Period in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKA_Fiscal_Year_Period.ID);
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
        public Exception SaveMethod(List<CVarA_Fiscal_Year_Period> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Fiscal_Year_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@From_Date", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@To_Date", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Closed", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Closed_User_ID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarA_Fiscal_Year_Period ObjCVarA_Fiscal_Year_Period in SaveList)
                {
                    if (ObjCVarA_Fiscal_Year_Period.mIsChanges == true)
                    {
                        if (ObjCVarA_Fiscal_Year_Period.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_Fiscal_Year_Period";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_Fiscal_Year_Period.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_Fiscal_Year_Period";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_Fiscal_Year_Period.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarA_Fiscal_Year_Period.ID;
                        }
                        Com.Parameters["@Fiscal_Year_ID"].Value = ObjCVarA_Fiscal_Year_Period.Fiscal_Year_ID;
                        Com.Parameters["@From_Date"].Value = ObjCVarA_Fiscal_Year_Period.From_Date;
                        Com.Parameters["@To_Date"].Value = ObjCVarA_Fiscal_Year_Period.To_Date;
                        Com.Parameters["@Closed"].Value = ObjCVarA_Fiscal_Year_Period.Closed;
                        Com.Parameters["@Closed_User_ID"].Value = ObjCVarA_Fiscal_Year_Period.Closed_User_ID;
                        EndTrans(Com, Con);
                        if (ObjCVarA_Fiscal_Year_Period.ID == 0)
                        {
                            ObjCVarA_Fiscal_Year_Period.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarA_Fiscal_Year_Period.mIsChanges = false;
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
