using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Administration.Settings.Generated
{
    [Serializable]
    public class CPKCustomerCreditlimitexceptionperiodLog
    {
        #region "variables"
        private Decimal mID;
        #endregion

        #region "Methods"
        public Decimal ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarCustomerCreditlimitexceptionperiodLog : CPKCustomerCreditlimitexceptionperiodLog
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Decimal mCustomerCreditlimitexceptionperiod;
        internal Int32 mCustomerID;
        internal DateTime mDateLog;
        #endregion

        #region "Methods"
        public Decimal CustomerCreditlimitexceptionperiod
        {
            get { return mCustomerCreditlimitexceptionperiod; }
            set { mIsChanges = true; mCustomerCreditlimitexceptionperiod = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mIsChanges = true; mCustomerID = value; }
        }
        public DateTime DateLog
        {
            get { return mDateLog; }
            set { mIsChanges = true; mDateLog = value; }
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

    public partial class CCustomerCreditlimitexceptionperiodLog
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
        public List<CVarCustomerCreditlimitexceptionperiodLog> lstCVarCustomerCreditlimitexceptionperiodLog = new List<CVarCustomerCreditlimitexceptionperiodLog>();
        public List<CPKCustomerCreditlimitexceptionperiodLog> lstDeletedCPKCustomerCreditlimitexceptionperiodLog = new List<CPKCustomerCreditlimitexceptionperiodLog>();
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
        public Exception GetItem(Decimal ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarCustomerCreditlimitexceptionperiodLog.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListCustomerCreditlimitexceptionperiodLog";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemCustomerCreditlimitexceptionperiodLog";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Decimal));
                    Com.Parameters[0].Value = Convert.ToDecimal(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarCustomerCreditlimitexceptionperiodLog ObjCVarCustomerCreditlimitexceptionperiodLog = new CVarCustomerCreditlimitexceptionperiodLog();
                        ObjCVarCustomerCreditlimitexceptionperiodLog.ID = Convert.ToDecimal(dr["ID"].ToString());
                        ObjCVarCustomerCreditlimitexceptionperiodLog.mCustomerCreditlimitexceptionperiod = Convert.ToDecimal(dr["CustomerCreditlimitexceptionperiod"].ToString());
                        ObjCVarCustomerCreditlimitexceptionperiodLog.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarCustomerCreditlimitexceptionperiodLog.mDateLog = Convert.ToDateTime(dr["DateLog"].ToString());
                        lstCVarCustomerCreditlimitexceptionperiodLog.Add(ObjCVarCustomerCreditlimitexceptionperiodLog);
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
            lstCVarCustomerCreditlimitexceptionperiodLog.Clear();

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
                Com.CommandText = "[dbo].GetListPagingCustomerCreditlimitexceptionperiodLog";
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
                        CVarCustomerCreditlimitexceptionperiodLog ObjCVarCustomerCreditlimitexceptionperiodLog = new CVarCustomerCreditlimitexceptionperiodLog();
                        ObjCVarCustomerCreditlimitexceptionperiodLog.ID = Convert.ToDecimal(dr["ID"].ToString());
                        ObjCVarCustomerCreditlimitexceptionperiodLog.mCustomerCreditlimitexceptionperiod = Convert.ToDecimal(dr["CustomerCreditlimitexceptionperiod"].ToString());
                        ObjCVarCustomerCreditlimitexceptionperiodLog.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarCustomerCreditlimitexceptionperiodLog.mDateLog = Convert.ToDateTime(dr["DateLog"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarCustomerCreditlimitexceptionperiodLog.Add(ObjCVarCustomerCreditlimitexceptionperiodLog);
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
                    Com.CommandText = "[dbo].DeleteListCustomerCreditlimitexceptionperiodLog";
                else
                    Com.CommandText = "[dbo].UpdateListCustomerCreditlimitexceptionperiodLog";
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
        public Exception DeleteItem(List<CPKCustomerCreditlimitexceptionperiodLog> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemCustomerCreditlimitexceptionperiodLog";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Decimal));
                foreach (CPKCustomerCreditlimitexceptionperiodLog ObjCPKCustomerCreditlimitexceptionperiodLog in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToDecimal(ObjCPKCustomerCreditlimitexceptionperiodLog.ID);
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
        public Exception SaveMethod(List<CVarCustomerCreditlimitexceptionperiodLog> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@CustomerCreditlimitexceptionperiod", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CustomerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DateLog", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Decimal, 17, ParameterDirection.Input, false, 18, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarCustomerCreditlimitexceptionperiodLog ObjCVarCustomerCreditlimitexceptionperiodLog in SaveList)
                {
                    if (ObjCVarCustomerCreditlimitexceptionperiodLog.mIsChanges == true)
                    {
                        if (ObjCVarCustomerCreditlimitexceptionperiodLog.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemCustomerCreditlimitexceptionperiodLog";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarCustomerCreditlimitexceptionperiodLog.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemCustomerCreditlimitexceptionperiodLog";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarCustomerCreditlimitexceptionperiodLog.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarCustomerCreditlimitexceptionperiodLog.ID;
                        }
                        Com.Parameters["@CustomerCreditlimitexceptionperiod"].Value = ObjCVarCustomerCreditlimitexceptionperiodLog.CustomerCreditlimitexceptionperiod;
                        Com.Parameters["@CustomerID"].Value = ObjCVarCustomerCreditlimitexceptionperiodLog.CustomerID;
                        Com.Parameters["@DateLog"].Value = ObjCVarCustomerCreditlimitexceptionperiodLog.DateLog;
                        EndTrans(Com, Con);
                        if (ObjCVarCustomerCreditlimitexceptionperiodLog.ID == 0)
                        {
                            ObjCVarCustomerCreditlimitexceptionperiodLog.ID = Convert.ToDecimal(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarCustomerCreditlimitexceptionperiodLog.mIsChanges = false;
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
