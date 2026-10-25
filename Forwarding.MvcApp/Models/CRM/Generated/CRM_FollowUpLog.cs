using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.CRM.CRM_FollowUpLog.Generated
{
    [Serializable]
    public class CPKCRM_FollowUpLog
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
    public partial class CVarCRM_FollowUpLog : CPKCRM_FollowUpLog
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mSalesRep;
        internal Int32 mActionType_ID;
        internal DateTime mActionDate;
        internal Int32 mNextStepID;
        internal DateTime mNextStepDate;
        internal String mNotes;
        internal Int32 mNextActionStatue_ID;
        internal String mNextActionStatueName;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModifatorUserID;
        internal DateTime mModificationDate;
        internal String mCancelReason;
        internal String mDenyReason;
        internal String mActionName;
        internal String mNextActionName;
        internal Int32 mCRM_ClientID;
        #endregion

        #region "Methods"
        public Int32 SalesRep
        {
            get { return mSalesRep; }
            set { mIsChanges = true; mSalesRep = value; }
        }
        public Int32 ActionType_ID
        {
            get { return mActionType_ID; }
            set { mIsChanges = true; mActionType_ID = value; }
        }
        public DateTime ActionDate
        {
            get { return mActionDate; }
            set { mIsChanges = true; mActionDate = value; }
        }
        public Int32 NextStepID
        {
            get { return mNextStepID; }
            set { mIsChanges = true; mNextStepID = value; }
        }
        public DateTime NextStepDate
        {
            get { return mNextStepDate; }
            set { mIsChanges = true; mNextStepDate = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int32 NextActionStatue_ID
        {
            get { return mNextActionStatue_ID; }
            set { mIsChanges = true; mNextActionStatue_ID = value; }
        }
        public String NextActionStatueName
        {
            get { return mNextActionStatueName; }
            set { mIsChanges = true; mNextActionStatueName = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mIsChanges = true; mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
        }
        public Int32 ModifatorUserID
        {
            get { return mModifatorUserID; }
            set { mIsChanges = true; mModifatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mIsChanges = true; mModificationDate = value; }
        }
        public String CancelReason
        {
            get { return mCancelReason; }
            set { mIsChanges = true; mCancelReason = value; }
        }
        public String DenyReason
        {
            get { return mDenyReason; }
            set { mIsChanges = true; mDenyReason = value; }
        }
        public String ActionName
        {
            get { return mActionName; }
            set { mIsChanges = true; mActionName = value; }
        }
        public String NextActionName
        {
            get { return mNextActionName; }
            set { mIsChanges = true; mNextActionName = value; }
        }
        public Int32 CRM_ClientID
        {
            get { return mCRM_ClientID; }
            set { mIsChanges = true; mCRM_ClientID = value; }
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

    public partial class CCRM_FollowUpLog
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
        public List<CVarCRM_FollowUpLog> lstCVarCRM_FollowUpLog = new List<CVarCRM_FollowUpLog>();
        public List<CPKCRM_FollowUpLog> lstDeletedCPKCRM_FollowUpLog = new List<CPKCRM_FollowUpLog>();
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
            lstCVarCRM_FollowUpLog.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListCRM_FollowUpLog";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemCRM_FollowUpLog";
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
                        CVarCRM_FollowUpLog ObjCVarCRM_FollowUpLog = new CVarCRM_FollowUpLog();
                        ObjCVarCRM_FollowUpLog.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCRM_FollowUpLog.mSalesRep = Convert.ToInt32(dr["SalesRep"].ToString());
                        ObjCVarCRM_FollowUpLog.mActionType_ID = Convert.ToInt32(dr["ActionType_ID"].ToString());
                        ObjCVarCRM_FollowUpLog.mActionDate = Convert.ToDateTime(dr["ActionDate"].ToString());
                        ObjCVarCRM_FollowUpLog.mNextStepID = Convert.ToInt32(dr["NextStepID"].ToString());
                        ObjCVarCRM_FollowUpLog.mNextStepDate = Convert.ToDateTime(dr["NextStepDate"].ToString());
                        ObjCVarCRM_FollowUpLog.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarCRM_FollowUpLog.mNextActionStatue_ID = Convert.ToInt32(dr["NextActionStatue_ID"].ToString());
                        ObjCVarCRM_FollowUpLog.mNextActionStatueName = Convert.ToString(dr["NextActionStatueName"].ToString());
                        ObjCVarCRM_FollowUpLog.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCRM_FollowUpLog.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCRM_FollowUpLog.mModifatorUserID = Convert.ToInt32(dr["ModifatorUserID"].ToString());
                        ObjCVarCRM_FollowUpLog.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCRM_FollowUpLog.mCancelReason = Convert.ToString(dr["CancelReason"].ToString());
                        ObjCVarCRM_FollowUpLog.mDenyReason = Convert.ToString(dr["DenyReason"].ToString());
                        ObjCVarCRM_FollowUpLog.mActionName = Convert.ToString(dr["ActionName"].ToString());
                        ObjCVarCRM_FollowUpLog.mNextActionName = Convert.ToString(dr["NextActionName"].ToString());
                        ObjCVarCRM_FollowUpLog.mCRM_ClientID = Convert.ToInt32(dr["CRM_ClientID"].ToString());
                        lstCVarCRM_FollowUpLog.Add(ObjCVarCRM_FollowUpLog);
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
            lstCVarCRM_FollowUpLog.Clear();

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
                Com.CommandText = "[dbo].GetListPagingCRM_FollowUpLog";
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
                        CVarCRM_FollowUpLog ObjCVarCRM_FollowUpLog = new CVarCRM_FollowUpLog();
                        ObjCVarCRM_FollowUpLog.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCRM_FollowUpLog.mSalesRep = Convert.ToInt32(dr["SalesRep"].ToString());
                        ObjCVarCRM_FollowUpLog.mActionType_ID = Convert.ToInt32(dr["ActionType_ID"].ToString());
                        ObjCVarCRM_FollowUpLog.mActionDate = Convert.ToDateTime(dr["ActionDate"].ToString());
                        ObjCVarCRM_FollowUpLog.mNextStepID = Convert.ToInt32(dr["NextStepID"].ToString());
                        ObjCVarCRM_FollowUpLog.mNextStepDate = Convert.ToDateTime(dr["NextStepDate"].ToString());
                        ObjCVarCRM_FollowUpLog.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarCRM_FollowUpLog.mNextActionStatue_ID = Convert.ToInt32(dr["NextActionStatue_ID"].ToString());
                        ObjCVarCRM_FollowUpLog.mNextActionStatueName = Convert.ToString(dr["NextActionStatueName"].ToString());
                        ObjCVarCRM_FollowUpLog.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCRM_FollowUpLog.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCRM_FollowUpLog.mModifatorUserID = Convert.ToInt32(dr["ModifatorUserID"].ToString());
                        ObjCVarCRM_FollowUpLog.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCRM_FollowUpLog.mCancelReason = Convert.ToString(dr["CancelReason"].ToString());
                        ObjCVarCRM_FollowUpLog.mDenyReason = Convert.ToString(dr["DenyReason"].ToString());
                        ObjCVarCRM_FollowUpLog.mActionName = Convert.ToString(dr["ActionName"].ToString());
                        ObjCVarCRM_FollowUpLog.mNextActionName = Convert.ToString(dr["NextActionName"].ToString());
                        ObjCVarCRM_FollowUpLog.mCRM_ClientID = Convert.ToInt32(dr["CRM_ClientID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarCRM_FollowUpLog.Add(ObjCVarCRM_FollowUpLog);
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
                    Com.CommandText = "[dbo].DeleteListCRM_FollowUpLog";
                else
                    Com.CommandText = "[dbo].UpdateListCRM_FollowUpLog";
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
        public Exception DeleteItem(List<CPKCRM_FollowUpLog> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemCRM_FollowUpLog";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKCRM_FollowUpLog ObjCPKCRM_FollowUpLog in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKCRM_FollowUpLog.ID);
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
        public Exception SaveMethod(List<CVarCRM_FollowUpLog> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@SalesRep", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ActionType_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ActionDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@NextStepID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@NextStepDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@NextActionStatue_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@NextActionStatueName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModifatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CancelReason", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DenyReason", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ActionName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@NextActionName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CRM_ClientID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarCRM_FollowUpLog ObjCVarCRM_FollowUpLog in SaveList)
                {
                    if (ObjCVarCRM_FollowUpLog.mIsChanges == true)
                    {
                        if (ObjCVarCRM_FollowUpLog.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemCRM_FollowUpLog";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarCRM_FollowUpLog.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemCRM_FollowUpLog";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarCRM_FollowUpLog.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarCRM_FollowUpLog.ID;
                        }
                        Com.Parameters["@SalesRep"].Value = ObjCVarCRM_FollowUpLog.SalesRep;
                        Com.Parameters["@ActionType_ID"].Value = ObjCVarCRM_FollowUpLog.ActionType_ID;
                        Com.Parameters["@ActionDate"].Value = ObjCVarCRM_FollowUpLog.ActionDate;
                        Com.Parameters["@NextStepID"].Value = ObjCVarCRM_FollowUpLog.NextStepID;
                        Com.Parameters["@NextStepDate"].Value = ObjCVarCRM_FollowUpLog.NextStepDate;
                        Com.Parameters["@Notes"].Value = ObjCVarCRM_FollowUpLog.Notes;
                        Com.Parameters["@NextActionStatue_ID"].Value = ObjCVarCRM_FollowUpLog.NextActionStatue_ID;
                        Com.Parameters["@NextActionStatueName"].Value = ObjCVarCRM_FollowUpLog.NextActionStatueName;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarCRM_FollowUpLog.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarCRM_FollowUpLog.CreationDate;
                        Com.Parameters["@ModifatorUserID"].Value = ObjCVarCRM_FollowUpLog.ModifatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarCRM_FollowUpLog.ModificationDate;
                        Com.Parameters["@CancelReason"].Value = ObjCVarCRM_FollowUpLog.CancelReason;
                        Com.Parameters["@DenyReason"].Value = ObjCVarCRM_FollowUpLog.DenyReason;
                        Com.Parameters["@ActionName"].Value = ObjCVarCRM_FollowUpLog.ActionName;
                        Com.Parameters["@NextActionName"].Value = ObjCVarCRM_FollowUpLog.NextActionName;
                        Com.Parameters["@CRM_ClientID"].Value = ObjCVarCRM_FollowUpLog.CRM_ClientID;
                        EndTrans(Com, Con);
                        if (ObjCVarCRM_FollowUpLog.ID == 0)
                        {
                            ObjCVarCRM_FollowUpLog.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarCRM_FollowUpLog.mIsChanges = false;
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
