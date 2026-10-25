using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Quotations.Quotations.Generated
{
    [Serializable]
    public class CPKQuotationRouteLog
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
    public partial class CVarQuotationRouteLog : CPKQuotationRouteLog
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mLogFor;
        internal Int32 mUserID;
        internal String mUserName;
        internal String mActionType;
        internal Int64 mActionOnRowID;
        internal Int64 mQuotationRouteID;
        internal String mQuotationRouteCode;
        internal String mActionTaken;
        internal DateTime mActionDate;
        #endregion

        #region "Methods"
        public Int32 LogFor
        {
            get { return mLogFor; }
            set { mIsChanges = true; mLogFor = value; }
        }
        public Int32 UserID
        {
            get { return mUserID; }
            set { mIsChanges = true; mUserID = value; }
        }
        public String UserName
        {
            get { return mUserName; }
            set { mIsChanges = true; mUserName = value; }
        }
        public String ActionType
        {
            get { return mActionType; }
            set { mIsChanges = true; mActionType = value; }
        }
        public Int64 ActionOnRowID
        {
            get { return mActionOnRowID; }
            set { mIsChanges = true; mActionOnRowID = value; }
        }
        public Int64 QuotationRouteID
        {
            get { return mQuotationRouteID; }
            set { mIsChanges = true; mQuotationRouteID = value; }
        }
        public String QuotationRouteCode
        {
            get { return mQuotationRouteCode; }
            set { mIsChanges = true; mQuotationRouteCode = value; }
        }
        public String ActionTaken
        {
            get { return mActionTaken; }
            set { mIsChanges = true; mActionTaken = value; }
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

    public partial class CQuotationRouteLog
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
        public List<CVarQuotationRouteLog> lstCVarQuotationRouteLog = new List<CVarQuotationRouteLog>();
        public List<CPKQuotationRouteLog> lstDeletedCPKQuotationRouteLog = new List<CPKQuotationRouteLog>();
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
            lstCVarQuotationRouteLog.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListQuotationRouteLog";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemQuotationRouteLog";
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
                        CVarQuotationRouteLog ObjCVarQuotationRouteLog = new CVarQuotationRouteLog();
                        ObjCVarQuotationRouteLog.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarQuotationRouteLog.mLogFor = Convert.ToInt32(dr["LogFor"].ToString());
                        ObjCVarQuotationRouteLog.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarQuotationRouteLog.mUserName = Convert.ToString(dr["UserName"].ToString());
                        ObjCVarQuotationRouteLog.mActionType = Convert.ToString(dr["ActionType"].ToString());
                        ObjCVarQuotationRouteLog.mActionOnRowID = Convert.ToInt64(dr["ActionOnRowID"].ToString());
                        ObjCVarQuotationRouteLog.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarQuotationRouteLog.mQuotationRouteCode = Convert.ToString(dr["QuotationRouteCode"].ToString());
                        ObjCVarQuotationRouteLog.mActionTaken = Convert.ToString(dr["ActionTaken"].ToString());
                        ObjCVarQuotationRouteLog.mActionDate = Convert.ToDateTime(dr["ActionDate"].ToString());
                        lstCVarQuotationRouteLog.Add(ObjCVarQuotationRouteLog);
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
            lstCVarQuotationRouteLog.Clear();

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
                Com.CommandText = "[dbo].GetListPagingQuotationRouteLog";
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
                        CVarQuotationRouteLog ObjCVarQuotationRouteLog = new CVarQuotationRouteLog();
                        ObjCVarQuotationRouteLog.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarQuotationRouteLog.mLogFor = Convert.ToInt32(dr["LogFor"].ToString());
                        ObjCVarQuotationRouteLog.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarQuotationRouteLog.mUserName = Convert.ToString(dr["UserName"].ToString());
                        ObjCVarQuotationRouteLog.mActionType = Convert.ToString(dr["ActionType"].ToString());
                        ObjCVarQuotationRouteLog.mActionOnRowID = Convert.ToInt64(dr["ActionOnRowID"].ToString());
                        ObjCVarQuotationRouteLog.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarQuotationRouteLog.mQuotationRouteCode = Convert.ToString(dr["QuotationRouteCode"].ToString());
                        ObjCVarQuotationRouteLog.mActionTaken = Convert.ToString(dr["ActionTaken"].ToString());
                        ObjCVarQuotationRouteLog.mActionDate = Convert.ToDateTime(dr["ActionDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarQuotationRouteLog.Add(ObjCVarQuotationRouteLog);
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
                    Com.CommandText = "[dbo].DeleteListQuotationRouteLog";
                else
                    Com.CommandText = "[dbo].UpdateListQuotationRouteLog";
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
        public Exception DeleteItem(List<CPKQuotationRouteLog> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemQuotationRouteLog";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKQuotationRouteLog ObjCPKQuotationRouteLog in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKQuotationRouteLog.ID);
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
        public Exception SaveMethod(List<CVarQuotationRouteLog> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@LogFor", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@UserName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ActionType", SqlDbType.Char));
                Com.Parameters.Add(new SqlParameter("@ActionOnRowID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@QuotationRouteID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@QuotationRouteCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ActionTaken", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ActionDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarQuotationRouteLog ObjCVarQuotationRouteLog in SaveList)
                {
                    if (ObjCVarQuotationRouteLog.mIsChanges == true)
                    {
                        if (ObjCVarQuotationRouteLog.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemQuotationRouteLog";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarQuotationRouteLog.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemQuotationRouteLog";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarQuotationRouteLog.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarQuotationRouteLog.ID;
                        }
                        Com.Parameters["@LogFor"].Value = ObjCVarQuotationRouteLog.LogFor;
                        Com.Parameters["@UserID"].Value = ObjCVarQuotationRouteLog.UserID;
                        Com.Parameters["@UserName"].Value = ObjCVarQuotationRouteLog.UserName;
                        Com.Parameters["@ActionType"].Value = ObjCVarQuotationRouteLog.ActionType;
                        Com.Parameters["@ActionOnRowID"].Value = ObjCVarQuotationRouteLog.ActionOnRowID;
                        Com.Parameters["@QuotationRouteID"].Value = ObjCVarQuotationRouteLog.QuotationRouteID;
                        Com.Parameters["@QuotationRouteCode"].Value = ObjCVarQuotationRouteLog.QuotationRouteCode;
                        Com.Parameters["@ActionTaken"].Value = ObjCVarQuotationRouteLog.ActionTaken;
                        Com.Parameters["@ActionDate"].Value = ObjCVarQuotationRouteLog.ActionDate;
                        EndTrans(Com, Con);
                        if (ObjCVarQuotationRouteLog.ID == 0)
                        {
                            ObjCVarQuotationRouteLog.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarQuotationRouteLog.mIsChanges = false;
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
