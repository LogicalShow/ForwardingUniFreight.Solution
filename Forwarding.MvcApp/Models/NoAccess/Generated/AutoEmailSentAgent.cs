using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.NoAccess.Generated
{
    [Serializable] 
    public class CPKAutoEmailSentAgent
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
    public partial class CVarAutoEmailSentAgent : CPKAutoEmailSentAgent
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mAgentID;
        internal String mEmailType;
        internal Int32 mSentYear;
        internal Int32 mSentMonth;
        internal Boolean mIsFirstHalf;
        internal Boolean mIsSecondHalf;
        internal DateTime mCreationDate;
        #endregion

        #region "Methods"
        public Int32 AgentID
        {
            get { return mAgentID; }
            set { mIsChanges = true; mAgentID = value; }
        }
        public String EmailType
        {
            get { return mEmailType; }
            set { mIsChanges = true; mEmailType = value; }
        }
        public Int32 SentYear
        {
            get { return mSentYear; }
            set { mIsChanges = true; mSentYear = value; }
        }
        public Int32 SentMonth
        {
            get { return mSentMonth; }
            set { mIsChanges = true; mSentMonth = value; }
        }
        public Boolean IsFirstHalf
        {
            get { return mIsFirstHalf; }
            set { mIsChanges = true; mIsFirstHalf = value; }
        }
        public Boolean IsSecondHalf
        {
            get { return mIsSecondHalf; }
            set { mIsChanges = true; mIsSecondHalf = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
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

    public partial class CAutoEmailSentAgent
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
        public List<CVarAutoEmailSentAgent> lstCVarAutoEmailSentAgent = new List<CVarAutoEmailSentAgent>();
        public List<CPKAutoEmailSentAgent> lstDeletedCPKAutoEmailSentAgent = new List<CPKAutoEmailSentAgent>();
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
            lstCVarAutoEmailSentAgent.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListAutoEmailSentAgent";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemAutoEmailSentAgent";
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
                        CVarAutoEmailSentAgent ObjCVarAutoEmailSentAgent = new CVarAutoEmailSentAgent();
                        ObjCVarAutoEmailSentAgent.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarAutoEmailSentAgent.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarAutoEmailSentAgent.mEmailType = Convert.ToString(dr["EmailType"].ToString());
                        ObjCVarAutoEmailSentAgent.mSentYear = Convert.ToInt32(dr["SentYear"].ToString());
                        ObjCVarAutoEmailSentAgent.mSentMonth = Convert.ToInt32(dr["SentMonth"].ToString());
                        ObjCVarAutoEmailSentAgent.mIsFirstHalf = Convert.ToBoolean(dr["IsFirstHalf"].ToString());
                        ObjCVarAutoEmailSentAgent.mIsSecondHalf = Convert.ToBoolean(dr["IsSecondHalf"].ToString());
                        ObjCVarAutoEmailSentAgent.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        lstCVarAutoEmailSentAgent.Add(ObjCVarAutoEmailSentAgent);
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
            lstCVarAutoEmailSentAgent.Clear();

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
                Com.CommandText = "[dbo].GetListPagingAutoEmailSentAgent";
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
                        CVarAutoEmailSentAgent ObjCVarAutoEmailSentAgent = new CVarAutoEmailSentAgent();
                        ObjCVarAutoEmailSentAgent.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarAutoEmailSentAgent.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarAutoEmailSentAgent.mEmailType = Convert.ToString(dr["EmailType"].ToString());
                        ObjCVarAutoEmailSentAgent.mSentYear = Convert.ToInt32(dr["SentYear"].ToString());
                        ObjCVarAutoEmailSentAgent.mSentMonth = Convert.ToInt32(dr["SentMonth"].ToString());
                        ObjCVarAutoEmailSentAgent.mIsFirstHalf = Convert.ToBoolean(dr["IsFirstHalf"].ToString());
                        ObjCVarAutoEmailSentAgent.mIsSecondHalf = Convert.ToBoolean(dr["IsSecondHalf"].ToString());
                        ObjCVarAutoEmailSentAgent.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarAutoEmailSentAgent.Add(ObjCVarAutoEmailSentAgent);
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
                    Com.CommandText = "[dbo].DeleteListAutoEmailSentAgent";
                else
                    Com.CommandText = "[dbo].UpdateListAutoEmailSentAgent";
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
        public Exception DeleteItem(List<CPKAutoEmailSentAgent> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemAutoEmailSentAgent";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKAutoEmailSentAgent ObjCPKAutoEmailSentAgent in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKAutoEmailSentAgent.ID);
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
        public Exception SaveMethod(List<CVarAutoEmailSentAgent> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@AgentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EmailType", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@SentYear", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SentMonth", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsFirstHalf", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsSecondHalf", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarAutoEmailSentAgent ObjCVarAutoEmailSentAgent in SaveList)
                {
                    if (ObjCVarAutoEmailSentAgent.mIsChanges == true)
                    {
                        if (ObjCVarAutoEmailSentAgent.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemAutoEmailSentAgent";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarAutoEmailSentAgent.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemAutoEmailSentAgent";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarAutoEmailSentAgent.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarAutoEmailSentAgent.ID;
                        }
                        Com.Parameters["@AgentID"].Value = ObjCVarAutoEmailSentAgent.AgentID;
                        Com.Parameters["@EmailType"].Value = ObjCVarAutoEmailSentAgent.EmailType;
                        Com.Parameters["@SentYear"].Value = ObjCVarAutoEmailSentAgent.SentYear;
                        Com.Parameters["@SentMonth"].Value = ObjCVarAutoEmailSentAgent.SentMonth;
                        Com.Parameters["@IsFirstHalf"].Value = ObjCVarAutoEmailSentAgent.IsFirstHalf;
                        Com.Parameters["@IsSecondHalf"].Value = ObjCVarAutoEmailSentAgent.IsSecondHalf;
                        Com.Parameters["@CreationDate"].Value = ObjCVarAutoEmailSentAgent.CreationDate;
                        EndTrans(Com, Con);
                        if (ObjCVarAutoEmailSentAgent.ID == 0)
                        {
                            ObjCVarAutoEmailSentAgent.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarAutoEmailSentAgent.mIsChanges = false;
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
