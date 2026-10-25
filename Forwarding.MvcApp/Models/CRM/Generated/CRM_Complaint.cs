using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.CRM.Generated
{
    [Serializable]
    public class CPKCRM_Complaint
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
    public partial class CVarCRM_Complaint : CPKCRM_Complaint
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCode;
        internal Int32 mCustomerID;
        internal Int64 mOperationID;
        internal String mComplaintName;
        internal String mComplaintDetails;
        internal String mNotes;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        #endregion

        #region "Methods"
        public Int32 Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mIsChanges = true; mCustomerID = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public String ComplaintName
        {
            get { return mComplaintName; }
            set { mIsChanges = true; mComplaintName = value; }
        }
        public String ComplaintDetails
        {
            get { return mComplaintDetails; }
            set { mIsChanges = true; mComplaintDetails = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
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

    public partial class CCRM_Complaint
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
        public List<CVarCRM_Complaint> lstCVarCRM_Complaint = new List<CVarCRM_Complaint>();
        public List<CPKCRM_Complaint> lstDeletedCPKCRM_Complaint = new List<CPKCRM_Complaint>();
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
            lstCVarCRM_Complaint.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListCRM_Complaint";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemCRM_Complaint";
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
                        CVarCRM_Complaint ObjCVarCRM_Complaint = new CVarCRM_Complaint();
                        ObjCVarCRM_Complaint.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCRM_Complaint.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarCRM_Complaint.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarCRM_Complaint.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarCRM_Complaint.mComplaintName = Convert.ToString(dr["ComplaintName"].ToString());
                        ObjCVarCRM_Complaint.mComplaintDetails = Convert.ToString(dr["ComplaintDetails"].ToString());
                        ObjCVarCRM_Complaint.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarCRM_Complaint.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCRM_Complaint.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCRM_Complaint.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarCRM_Complaint.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        lstCVarCRM_Complaint.Add(ObjCVarCRM_Complaint);
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
            lstCVarCRM_Complaint.Clear();

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
                Com.CommandText = "[dbo].GetListPagingCRM_Complaint";
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
                        CVarCRM_Complaint ObjCVarCRM_Complaint = new CVarCRM_Complaint();
                        ObjCVarCRM_Complaint.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCRM_Complaint.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarCRM_Complaint.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarCRM_Complaint.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarCRM_Complaint.mComplaintName = Convert.ToString(dr["ComplaintName"].ToString());
                        ObjCVarCRM_Complaint.mComplaintDetails = Convert.ToString(dr["ComplaintDetails"].ToString());
                        ObjCVarCRM_Complaint.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarCRM_Complaint.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCRM_Complaint.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCRM_Complaint.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarCRM_Complaint.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarCRM_Complaint.Add(ObjCVarCRM_Complaint);
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
                    Com.CommandText = "[dbo].DeleteListCRM_Complaint";
                else
                    Com.CommandText = "[dbo].UpdateListCRM_Complaint";
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
        public Exception DeleteItem(List<CPKCRM_Complaint> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemCRM_Complaint";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKCRM_Complaint ObjCPKCRM_Complaint in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKCRM_Complaint.ID);
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
        public Exception SaveMethod(List<CVarCRM_Complaint> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CustomerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ComplaintName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ComplaintDetails", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarCRM_Complaint ObjCVarCRM_Complaint in SaveList)
                {
                    if (ObjCVarCRM_Complaint.mIsChanges == true)
                    {
                        if (ObjCVarCRM_Complaint.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemCRM_Complaint";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarCRM_Complaint.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemCRM_Complaint";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarCRM_Complaint.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarCRM_Complaint.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarCRM_Complaint.Code;
                        Com.Parameters["@CustomerID"].Value = ObjCVarCRM_Complaint.CustomerID;
                        Com.Parameters["@OperationID"].Value = ObjCVarCRM_Complaint.OperationID;
                        Com.Parameters["@ComplaintName"].Value = ObjCVarCRM_Complaint.ComplaintName;
                        Com.Parameters["@ComplaintDetails"].Value = ObjCVarCRM_Complaint.ComplaintDetails;
                        Com.Parameters["@Notes"].Value = ObjCVarCRM_Complaint.Notes;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarCRM_Complaint.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarCRM_Complaint.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarCRM_Complaint.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarCRM_Complaint.ModificationDate;
                        EndTrans(Com, Con);
                        if (ObjCVarCRM_Complaint.ID == 0)
                        {
                            ObjCVarCRM_Complaint.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarCRM_Complaint.mIsChanges = false;
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
