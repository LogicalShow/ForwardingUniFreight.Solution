using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.CRM.CRM_ActionDetails.Generated
{
    [Serializable]
    public class CPKCRM_ActionDetails
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
    public partial class CVarCRM_ActionDetails : CPKCRM_ActionDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mLocation;
        internal String mAbout;
        internal String mResults;
        internal String mNote;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificationUserID;
        internal DateTime mModificationDate;
        internal Int32 mCRM_FollowID;
        internal Int32 mCRM_ActionID;
        #endregion

        #region "Methods"
        public String Location
        {
            get { return mLocation; }
            set { mIsChanges = true; mLocation = value; }
        }
        public String About
        {
            get { return mAbout; }
            set { mIsChanges = true; mAbout = value; }
        }
        public String Results
        {
            get { return mResults; }
            set { mIsChanges = true; mResults = value; }
        }
        public String Note
        {
            get { return mNote; }
            set { mIsChanges = true; mNote = value; }
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
        public Int32 ModificationUserID
        {
            get { return mModificationUserID; }
            set { mIsChanges = true; mModificationUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mIsChanges = true; mModificationDate = value; }
        }
        public Int32 CRM_FollowID
        {
            get { return mCRM_FollowID; }
            set { mIsChanges = true; mCRM_FollowID = value; }
        }
        public Int32 CRM_ActionID
        {
            get { return mCRM_ActionID; }
            set { mIsChanges = true; mCRM_ActionID = value; }
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

    public partial class CCRM_ActionDetails
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
        public List<CVarCRM_ActionDetails> lstCVarCRM_ActionDetails = new List<CVarCRM_ActionDetails>();
        public List<CPKCRM_ActionDetails> lstDeletedCPKCRM_ActionDetails = new List<CPKCRM_ActionDetails>();
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
            lstCVarCRM_ActionDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListCRM_ActionDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemCRM_ActionDetails";
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
                        CVarCRM_ActionDetails ObjCVarCRM_ActionDetails = new CVarCRM_ActionDetails();
                        ObjCVarCRM_ActionDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCRM_ActionDetails.mLocation = Convert.ToString(dr["Location"].ToString());
                        ObjCVarCRM_ActionDetails.mAbout = Convert.ToString(dr["About"].ToString());
                        ObjCVarCRM_ActionDetails.mResults = Convert.ToString(dr["Results"].ToString());
                        ObjCVarCRM_ActionDetails.mNote = Convert.ToString(dr["Note"].ToString());
                        ObjCVarCRM_ActionDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCRM_ActionDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCRM_ActionDetails.mModificationUserID = Convert.ToInt32(dr["ModificationUserID"].ToString());
                        ObjCVarCRM_ActionDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCRM_ActionDetails.mCRM_FollowID = Convert.ToInt32(dr["CRM_FollowID"].ToString());
                        ObjCVarCRM_ActionDetails.mCRM_ActionID = Convert.ToInt32(dr["CRM_ActionID"].ToString());
                        lstCVarCRM_ActionDetails.Add(ObjCVarCRM_ActionDetails);
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
            lstCVarCRM_ActionDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingCRM_ActionDetails";
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
                        CVarCRM_ActionDetails ObjCVarCRM_ActionDetails = new CVarCRM_ActionDetails();
                        ObjCVarCRM_ActionDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCRM_ActionDetails.mLocation = Convert.ToString(dr["Location"].ToString());
                        ObjCVarCRM_ActionDetails.mAbout = Convert.ToString(dr["About"].ToString());
                        ObjCVarCRM_ActionDetails.mResults = Convert.ToString(dr["Results"].ToString());
                        ObjCVarCRM_ActionDetails.mNote = Convert.ToString(dr["Note"].ToString());
                        ObjCVarCRM_ActionDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCRM_ActionDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCRM_ActionDetails.mModificationUserID = Convert.ToInt32(dr["ModificationUserID"].ToString());
                        ObjCVarCRM_ActionDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCRM_ActionDetails.mCRM_FollowID = Convert.ToInt32(dr["CRM_FollowID"].ToString());
                        ObjCVarCRM_ActionDetails.mCRM_ActionID = Convert.ToInt32(dr["CRM_ActionID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarCRM_ActionDetails.Add(ObjCVarCRM_ActionDetails);
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
                    Com.CommandText = "[dbo].DeleteListCRM_ActionDetails";
                else
                    Com.CommandText = "[dbo].UpdateListCRM_ActionDetails";
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
        public Exception DeleteItem(List<CPKCRM_ActionDetails> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemCRM_ActionDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKCRM_ActionDetails ObjCPKCRM_ActionDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKCRM_ActionDetails.ID);
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
        public Exception SaveMethod(List<CVarCRM_ActionDetails> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Location", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@About", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Results", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Note", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificationUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CRM_FollowID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CRM_ActionID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarCRM_ActionDetails ObjCVarCRM_ActionDetails in SaveList)
                {
                    if (ObjCVarCRM_ActionDetails.mIsChanges == true)
                    {
                        if (ObjCVarCRM_ActionDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemCRM_ActionDetails";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarCRM_ActionDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemCRM_ActionDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarCRM_ActionDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarCRM_ActionDetails.ID;
                        }
                        Com.Parameters["@Location"].Value = ObjCVarCRM_ActionDetails.Location;
                        Com.Parameters["@About"].Value = ObjCVarCRM_ActionDetails.About;
                        Com.Parameters["@Results"].Value = ObjCVarCRM_ActionDetails.Results;
                        Com.Parameters["@Note"].Value = ObjCVarCRM_ActionDetails.Note;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarCRM_ActionDetails.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarCRM_ActionDetails.CreationDate;
                        Com.Parameters["@ModificationUserID"].Value = ObjCVarCRM_ActionDetails.ModificationUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarCRM_ActionDetails.ModificationDate;
                        Com.Parameters["@CRM_FollowID"].Value = ObjCVarCRM_ActionDetails.CRM_FollowID;
                        Com.Parameters["@CRM_ActionID"].Value = ObjCVarCRM_ActionDetails.CRM_ActionID;
                        EndTrans(Com, Con);
                        if (ObjCVarCRM_ActionDetails.ID == 0)
                        {
                            ObjCVarCRM_ActionDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarCRM_ActionDetails.mIsChanges = false;
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
