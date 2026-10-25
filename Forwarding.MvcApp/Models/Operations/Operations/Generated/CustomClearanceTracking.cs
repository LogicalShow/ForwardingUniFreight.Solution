using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKCustomClearanceTracking
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
    public partial class CVarCustomClearanceTracking : CPKCustomClearanceTracking
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mCustomClearanceRoutingID;
        internal Int32 mTrackingStageID;
        internal DateTime mTrackingDate;
        internal String mNotes;
        internal Boolean mDone;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mCustodyID;
        #endregion

        #region "Methods"
        public Int64 CustomClearanceRoutingID
        {
            get { return mCustomClearanceRoutingID; }
            set { mIsChanges = true; mCustomClearanceRoutingID = value; }
        }
        public Int32 TrackingStageID
        {
            get { return mTrackingStageID; }
            set { mIsChanges = true; mTrackingStageID = value; }
        }
        public DateTime TrackingDate
        {
            get { return mTrackingDate; }
            set { mIsChanges = true; mTrackingDate = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Boolean Done
        {
            get { return mDone; }
            set { mIsChanges = true; mDone = value; }
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
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mIsChanges = true; mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mIsChanges = true; mModificationDate = value; }
        }
        public Int32 CustodyID
        {
            get { return mCustodyID; }
            set { mIsChanges = true; mCustodyID = value; }
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

    public partial class CCustomClearanceTracking
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
        public List<CVarCustomClearanceTracking> lstCVarCustomClearanceTracking = new List<CVarCustomClearanceTracking>();
        public List<CPKCustomClearanceTracking> lstDeletedCPKCustomClearanceTracking = new List<CPKCustomClearanceTracking>();
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
            lstCVarCustomClearanceTracking.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListCustomClearanceTracking";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemCustomClearanceTracking";
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
                        CVarCustomClearanceTracking ObjCVarCustomClearanceTracking = new CVarCustomClearanceTracking();
                        ObjCVarCustomClearanceTracking.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCustomClearanceTracking.mCustomClearanceRoutingID = Convert.ToInt64(dr["CustomClearanceRoutingID"].ToString());
                        ObjCVarCustomClearanceTracking.mTrackingStageID = Convert.ToInt32(dr["TrackingStageID"].ToString());
                        ObjCVarCustomClearanceTracking.mTrackingDate = Convert.ToDateTime(dr["TrackingDate"].ToString());
                        ObjCVarCustomClearanceTracking.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarCustomClearanceTracking.mDone = Convert.ToBoolean(dr["Done"].ToString());
                        ObjCVarCustomClearanceTracking.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCustomClearanceTracking.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCustomClearanceTracking.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarCustomClearanceTracking.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCustomClearanceTracking.mCustodyID = Convert.ToInt32(dr["CustodyID"].ToString());
                        lstCVarCustomClearanceTracking.Add(ObjCVarCustomClearanceTracking);
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
            lstCVarCustomClearanceTracking.Clear();

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
                Com.CommandText = "[dbo].GetListPagingCustomClearanceTracking";
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
                        CVarCustomClearanceTracking ObjCVarCustomClearanceTracking = new CVarCustomClearanceTracking();
                        ObjCVarCustomClearanceTracking.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCustomClearanceTracking.mCustomClearanceRoutingID = Convert.ToInt64(dr["CustomClearanceRoutingID"].ToString());
                        ObjCVarCustomClearanceTracking.mTrackingStageID = Convert.ToInt32(dr["TrackingStageID"].ToString());
                        ObjCVarCustomClearanceTracking.mTrackingDate = Convert.ToDateTime(dr["TrackingDate"].ToString());
                        ObjCVarCustomClearanceTracking.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarCustomClearanceTracking.mDone = Convert.ToBoolean(dr["Done"].ToString());
                        ObjCVarCustomClearanceTracking.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCustomClearanceTracking.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCustomClearanceTracking.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarCustomClearanceTracking.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCustomClearanceTracking.mCustodyID = Convert.ToInt32(dr["CustodyID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarCustomClearanceTracking.Add(ObjCVarCustomClearanceTracking);
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
                    Com.CommandText = "[dbo].DeleteListCustomClearanceTracking";
                else
                    Com.CommandText = "[dbo].UpdateListCustomClearanceTracking";
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
        public Exception DeleteItem(List<CPKCustomClearanceTracking> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemCustomClearanceTracking";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKCustomClearanceTracking ObjCPKCustomClearanceTracking in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKCustomClearanceTracking.ID);
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
        public Exception SaveMethod(List<CVarCustomClearanceTracking> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@CustomClearanceRoutingID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@TrackingStageID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TrackingDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Done", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CustodyID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarCustomClearanceTracking ObjCVarCustomClearanceTracking in SaveList)
                {
                    if (ObjCVarCustomClearanceTracking.mIsChanges == true)
                    {
                        if (ObjCVarCustomClearanceTracking.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemCustomClearanceTracking";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarCustomClearanceTracking.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemCustomClearanceTracking";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarCustomClearanceTracking.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarCustomClearanceTracking.ID;
                        }
                        Com.Parameters["@CustomClearanceRoutingID"].Value = ObjCVarCustomClearanceTracking.CustomClearanceRoutingID;
                        Com.Parameters["@TrackingStageID"].Value = ObjCVarCustomClearanceTracking.TrackingStageID;
                        Com.Parameters["@TrackingDate"].Value = ObjCVarCustomClearanceTracking.TrackingDate;
                        Com.Parameters["@Notes"].Value = ObjCVarCustomClearanceTracking.Notes;
                        Com.Parameters["@Done"].Value = ObjCVarCustomClearanceTracking.Done;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarCustomClearanceTracking.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarCustomClearanceTracking.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarCustomClearanceTracking.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarCustomClearanceTracking.ModificationDate;
                        Com.Parameters["@CustodyID"].Value = ObjCVarCustomClearanceTracking.CustodyID;
                        EndTrans(Com, Con);
                        if (ObjCVarCustomClearanceTracking.ID == 0)
                        {
                            ObjCVarCustomClearanceTracking.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarCustomClearanceTracking.mIsChanges = false;
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
