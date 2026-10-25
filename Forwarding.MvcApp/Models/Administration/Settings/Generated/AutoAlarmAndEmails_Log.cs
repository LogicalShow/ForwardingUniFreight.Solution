using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Administration.Settings.Generated
{
    [Serializable]
    public class CPKAutoAlarmAndEmails_Log
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
    public partial class CVarAutoAlarmAndEmails_Log : CPKAutoAlarmAndEmails_Log
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mType;
        internal Int64 mTypeID;
        internal DateTime mExpireDate;
        internal DateTime mSendingDate;
        internal String mNotes;
        internal DateTime mCreationDate;
        internal Boolean mIsExpireDate;
        #endregion

        #region "Methods"
        public String Type
        {
            get { return mType; }
            set { mIsChanges = true; mType = value; }
        }
        public Int64 TypeID
        {
            get { return mTypeID; }
            set { mIsChanges = true; mTypeID = value; }
        }
        public DateTime ExpireDate
        {
            get { return mExpireDate; }
            set { mIsChanges = true; mExpireDate = value; }
        }
        public DateTime SendingDate
        {
            get { return mSendingDate; }
            set { mIsChanges = true; mSendingDate = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
        }
        public Boolean IsExpireDate
        {
            get { return mIsExpireDate; }
            set { mIsChanges = true; mIsExpireDate = value; }
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

    public partial class CAutoAlarmAndEmails_Log
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
        public List<CVarAutoAlarmAndEmails_Log> lstCVarAutoAlarmAndEmails_Log = new List<CVarAutoAlarmAndEmails_Log>();
        public List<CPKAutoAlarmAndEmails_Log> lstDeletedCPKAutoAlarmAndEmails_Log = new List<CPKAutoAlarmAndEmails_Log>();
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
            lstCVarAutoAlarmAndEmails_Log.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListAutoAlarmAndEmails_Log";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemAutoAlarmAndEmails_Log";
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
                        CVarAutoAlarmAndEmails_Log ObjCVarAutoAlarmAndEmails_Log = new CVarAutoAlarmAndEmails_Log();
                        ObjCVarAutoAlarmAndEmails_Log.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarAutoAlarmAndEmails_Log.mType = Convert.ToString(dr["Type"].ToString());
                        ObjCVarAutoAlarmAndEmails_Log.mTypeID = Convert.ToInt64(dr["TypeID"].ToString());
                        ObjCVarAutoAlarmAndEmails_Log.mExpireDate = Convert.ToDateTime(dr["ExpireDate"].ToString());
                        ObjCVarAutoAlarmAndEmails_Log.mSendingDate = Convert.ToDateTime(dr["SendingDate"].ToString());
                        ObjCVarAutoAlarmAndEmails_Log.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarAutoAlarmAndEmails_Log.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAutoAlarmAndEmails_Log.mIsExpireDate = Convert.ToBoolean(dr["IsExpireDate"].ToString());
                        lstCVarAutoAlarmAndEmails_Log.Add(ObjCVarAutoAlarmAndEmails_Log);
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
            lstCVarAutoAlarmAndEmails_Log.Clear();

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
                Com.CommandText = "[dbo].GetListPagingAutoAlarmAndEmails_Log";
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
                        CVarAutoAlarmAndEmails_Log ObjCVarAutoAlarmAndEmails_Log = new CVarAutoAlarmAndEmails_Log();
                        ObjCVarAutoAlarmAndEmails_Log.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarAutoAlarmAndEmails_Log.mType = Convert.ToString(dr["Type"].ToString());
                        ObjCVarAutoAlarmAndEmails_Log.mTypeID = Convert.ToInt64(dr["TypeID"].ToString());
                        ObjCVarAutoAlarmAndEmails_Log.mExpireDate = Convert.ToDateTime(dr["ExpireDate"].ToString());
                        ObjCVarAutoAlarmAndEmails_Log.mSendingDate = Convert.ToDateTime(dr["SendingDate"].ToString());
                        ObjCVarAutoAlarmAndEmails_Log.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarAutoAlarmAndEmails_Log.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAutoAlarmAndEmails_Log.mIsExpireDate = Convert.ToBoolean(dr["IsExpireDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarAutoAlarmAndEmails_Log.Add(ObjCVarAutoAlarmAndEmails_Log);
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
                    Com.CommandText = "[dbo].DeleteListAutoAlarmAndEmails_Log";
                else
                    Com.CommandText = "[dbo].UpdateListAutoAlarmAndEmails_Log";
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
        public Exception DeleteItem(List<CPKAutoAlarmAndEmails_Log> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemAutoAlarmAndEmails_Log";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKAutoAlarmAndEmails_Log ObjCPKAutoAlarmAndEmails_Log in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKAutoAlarmAndEmails_Log.ID);
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
        public Exception SaveMethod(List<CVarAutoAlarmAndEmails_Log> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Type", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TypeID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ExpireDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@SendingDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsExpireDate", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarAutoAlarmAndEmails_Log ObjCVarAutoAlarmAndEmails_Log in SaveList)
                {
                    if (ObjCVarAutoAlarmAndEmails_Log.mIsChanges == true)
                    {
                        if (ObjCVarAutoAlarmAndEmails_Log.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemAutoAlarmAndEmails_Log";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarAutoAlarmAndEmails_Log.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemAutoAlarmAndEmails_Log";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarAutoAlarmAndEmails_Log.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarAutoAlarmAndEmails_Log.ID;
                        }
                        Com.Parameters["@Type"].Value = ObjCVarAutoAlarmAndEmails_Log.Type;
                        Com.Parameters["@TypeID"].Value = ObjCVarAutoAlarmAndEmails_Log.TypeID;
                        Com.Parameters["@ExpireDate"].Value = ObjCVarAutoAlarmAndEmails_Log.ExpireDate;
                        Com.Parameters["@SendingDate"].Value = ObjCVarAutoAlarmAndEmails_Log.SendingDate;
                        Com.Parameters["@Notes"].Value = ObjCVarAutoAlarmAndEmails_Log.Notes;
                        Com.Parameters["@CreationDate"].Value = ObjCVarAutoAlarmAndEmails_Log.CreationDate;
                        Com.Parameters["@IsExpireDate"].Value = ObjCVarAutoAlarmAndEmails_Log.IsExpireDate;
                        EndTrans(Com, Con);
                        if (ObjCVarAutoAlarmAndEmails_Log.ID == 0)
                        {
                            ObjCVarAutoAlarmAndEmails_Log.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarAutoAlarmAndEmails_Log.mIsChanges = false;
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
