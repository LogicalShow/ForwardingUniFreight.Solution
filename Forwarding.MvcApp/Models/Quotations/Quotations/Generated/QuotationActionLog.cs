using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Quotations.Quotations.Generated
{
    [Serializable]
    public class CPKQuotationActionLog
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
    public partial class CVarQuotationActionLog : CPKQuotationActionLog
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mQuotationID;
        internal Int64 mQuotationRouteID;
        internal Int32 mActionID;
        internal String mActionName;
        internal Int32 mUserID;
        internal DateTime mActionDate;
        #endregion

        #region "Methods"
        public Int64 QuotationID
        {
            get { return mQuotationID; }
            set { mIsChanges = true; mQuotationID = value; }
        }
        public Int64 QuotationRouteID
        {
            get { return mQuotationRouteID; }
            set { mIsChanges = true; mQuotationRouteID = value; }
        }
        public Int32 ActionID
        {
            get { return mActionID; }
            set { mIsChanges = true; mActionID = value; }
        }
        public String ActionName
        {
            get { return mActionName; }
            set { mIsChanges = true; mActionName = value; }
        }
        public Int32 UserID
        {
            get { return mUserID; }
            set { mIsChanges = true; mUserID = value; }
        }
        public DateTime ActionDate
        {
            get { return mActionDate; }
            set { mIsChanges = true; mActionDate = value; }
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

    public partial class CQuotationActionLog
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
        public List<CVarQuotationActionLog> lstCVarQuotationActionLog = new List<CVarQuotationActionLog>();
        public List<CPKQuotationActionLog> lstDeletedCPKQuotationActionLog = new List<CPKQuotationActionLog>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string WhereClause)
        {
            return DataFill(WhereClause, true);
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
            lstCVarQuotationActionLog.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListQuotationActionLog";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemQuotationActionLog";
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
                        CVarQuotationActionLog ObjCVarQuotationActionLog = new CVarQuotationActionLog();
                        ObjCVarQuotationActionLog.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarQuotationActionLog.mQuotationID = Convert.ToInt64(dr["QuotationID"].ToString());
                        ObjCVarQuotationActionLog.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarQuotationActionLog.mActionID = Convert.ToInt32(dr["ActionID"].ToString());
                        ObjCVarQuotationActionLog.mActionName = Convert.ToString(dr["ActionName"].ToString());
                        ObjCVarQuotationActionLog.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarQuotationActionLog.mActionDate = Convert.ToDateTime(dr["ActionDate"].ToString());
                        lstCVarQuotationActionLog.Add(ObjCVarQuotationActionLog);
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
        #region "Save Methods"
        public Exception SaveMethod(List<CVarQuotationActionLog> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@QuotationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@QuotationRouteID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ActionID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ActionName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ActionDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarQuotationActionLog ObjCVarQuotationActionLog in SaveList)
                {
                    if (ObjCVarQuotationActionLog.mIsChanges == true)
                    {
                        if (ObjCVarQuotationActionLog.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemQuotationActionLog";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarQuotationActionLog.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemQuotationActionLog";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarQuotationActionLog.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarQuotationActionLog.ID;
                        }
                        Com.Parameters["@QuotationID"].Value = ObjCVarQuotationActionLog.QuotationID;
                        Com.Parameters["@QuotationRouteID"].Value = ObjCVarQuotationActionLog.QuotationRouteID;
                        Com.Parameters["@ActionID"].Value = ObjCVarQuotationActionLog.ActionID;
                        Com.Parameters["@ActionName"].Value = ObjCVarQuotationActionLog.ActionName;
                        Com.Parameters["@UserID"].Value = ObjCVarQuotationActionLog.UserID;
                        Com.Parameters["@ActionDate"].Value = ObjCVarQuotationActionLog.ActionDate;
                        EndTrans(Com, Con);
                        if (ObjCVarQuotationActionLog.ID == 0)
                        {
                            ObjCVarQuotationActionLog.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarQuotationActionLog.mIsChanges = false;
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
    }

}