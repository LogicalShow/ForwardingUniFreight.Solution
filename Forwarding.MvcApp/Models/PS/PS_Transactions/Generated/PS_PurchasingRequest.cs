using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.PS.PS_Transactions.Generated
{
    [Serializable]
    public class CPKPS_PurchasingRequest
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
    public partial class CVarPS_PurchasingRequest : CPKPS_PurchasingRequest
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mRequestNo;
        internal DateTime mRequestDate;
        internal Int32 mDepartmentID;
        internal Int32 mBranchID;
        internal Int32 mCostCenter_ID;
        internal Int32 mSupplierID;
        internal Boolean mIsDeleted;
        internal String mRequestNoManual;
        internal String mNotes;
        internal Boolean mIsApproved;
        internal Int32 mCreatedUserID;
        internal DateTime mCreatedDate;
        internal Int32 mApprovedUserID;
        internal DateTime mApprovedDate;
        internal Int32 mEditedByUserID;
        internal DateTime mEditedDate;
        internal String mName;

        #endregion

        #region "Methods"
        public String RequestNo
        {
            get { return mRequestNo; }
            set { mIsChanges = true; mRequestNo = value; }
        }
        public DateTime RequestDate
        {
            get { return mRequestDate; }
            set { mIsChanges = true; mRequestDate = value; }
        }
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mIsChanges = true; mDepartmentID = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mIsChanges = true; mBranchID = value; }
        }
        public Int32 CostCenter_ID
        {
            get { return mCostCenter_ID; }
            set { mIsChanges = true; mCostCenter_ID = value; }
        }
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mIsChanges = true; mSupplierID = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
        }
        public String RequestNoManual
        {
            get { return mRequestNoManual; }
            set { mIsChanges = true; mRequestNoManual = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsChanges = true; mIsApproved = value; }
        }
        public Int32 CreatedUserID
        {
            get { return mCreatedUserID; }
            set { mIsChanges = true; mCreatedUserID = value; }
        }
        public DateTime CreatedDate
        {
            get { return mCreatedDate; }
            set { mIsChanges = true; mCreatedDate = value; }
        }
        public Int32 ApprovedUserID
        {
            get { return mApprovedUserID; }
            set { mIsChanges = true; mApprovedUserID = value; }
        }
        public DateTime ApprovedDate
        {
            get { return mApprovedDate; }
            set { mIsChanges = true; mApprovedDate = value; }
        }
        public Int32 EditedByUserID
        {
            get { return mEditedByUserID; }
            set { mIsChanges = true; mEditedByUserID = value; }
        }
        public DateTime EditedDate
        {
            get { return mEditedDate; }
            set { mIsChanges = true; mEditedDate = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mIsChanges = true; mName = value; }
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

    public partial class CPS_PurchasingRequest
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
        public List<CVarPS_PurchasingRequest> lstCVarPS_PurchasingRequest = new List<CVarPS_PurchasingRequest>();
        public List<CPKPS_PurchasingRequest> lstDeletedCPKPS_PurchasingRequest = new List<CPKPS_PurchasingRequest>();
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
            lstCVarPS_PurchasingRequest.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPS_PurchasingRequest";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPS_PurchasingRequest";
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
                        CVarPS_PurchasingRequest ObjCVarPS_PurchasingRequest = new CVarPS_PurchasingRequest();
                        ObjCVarPS_PurchasingRequest.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPS_PurchasingRequest.mRequestNo = Convert.ToString(dr["RequestNo"].ToString());
                        ObjCVarPS_PurchasingRequest.mRequestDate = Convert.ToDateTime(dr["RequestDate"].ToString());
                        ObjCVarPS_PurchasingRequest.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarPS_PurchasingRequest.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarPS_PurchasingRequest.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarPS_PurchasingRequest.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarPS_PurchasingRequest.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarPS_PurchasingRequest.mRequestNoManual = Convert.ToString(dr["RequestNoManual"].ToString());
                        ObjCVarPS_PurchasingRequest.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_PurchasingRequest.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPS_PurchasingRequest.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarPS_PurchasingRequest.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarPS_PurchasingRequest.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarPS_PurchasingRequest.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarPS_PurchasingRequest.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarPS_PurchasingRequest.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarPS_PurchasingRequest.mName = Convert.ToString(dr["Name"].ToString());

                        lstCVarPS_PurchasingRequest.Add(ObjCVarPS_PurchasingRequest);
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
            lstCVarPS_PurchasingRequest.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPS_PurchasingRequest";
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
                        CVarPS_PurchasingRequest ObjCVarPS_PurchasingRequest = new CVarPS_PurchasingRequest();
                        ObjCVarPS_PurchasingRequest.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPS_PurchasingRequest.mRequestNo = Convert.ToString(dr["RequestNo"].ToString());
                        ObjCVarPS_PurchasingRequest.mRequestDate = Convert.ToDateTime(dr["RequestDate"].ToString());
                        ObjCVarPS_PurchasingRequest.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarPS_PurchasingRequest.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarPS_PurchasingRequest.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarPS_PurchasingRequest.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarPS_PurchasingRequest.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarPS_PurchasingRequest.mRequestNoManual = Convert.ToString(dr["RequestNoManual"].ToString());
                        ObjCVarPS_PurchasingRequest.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_PurchasingRequest.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPS_PurchasingRequest.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarPS_PurchasingRequest.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarPS_PurchasingRequest.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarPS_PurchasingRequest.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarPS_PurchasingRequest.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarPS_PurchasingRequest.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPS_PurchasingRequest.Add(ObjCVarPS_PurchasingRequest);
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
                    Com.CommandText = "[dbo].DeleteListPS_PurchasingRequest";
                else
                    Com.CommandText = "[dbo].UpdateListPS_PurchasingRequest";
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
        public Exception DeleteItem(List<CPKPS_PurchasingRequest> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPS_PurchasingRequest";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKPS_PurchasingRequest ObjCPKPS_PurchasingRequest in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKPS_PurchasingRequest.ID);
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
        public Exception SaveMethod(List<CVarPS_PurchasingRequest> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@RequestNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@RequestDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@DepartmentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenter_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SupplierID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@RequestNoManual", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatedUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreatedDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ApprovedUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ApprovedDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@EditedByUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EditedDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPS_PurchasingRequest ObjCVarPS_PurchasingRequest in SaveList)
                {
                    if (ObjCVarPS_PurchasingRequest.mIsChanges == true)
                    {
                        if (ObjCVarPS_PurchasingRequest.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPS_PurchasingRequest";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPS_PurchasingRequest.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPS_PurchasingRequest";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPS_PurchasingRequest.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPS_PurchasingRequest.ID;
                        }
                        Com.Parameters["@RequestNo"].Value = ObjCVarPS_PurchasingRequest.RequestNo;
                        Com.Parameters["@RequestDate"].Value = ObjCVarPS_PurchasingRequest.RequestDate;
                        Com.Parameters["@DepartmentID"].Value = ObjCVarPS_PurchasingRequest.DepartmentID;
                        Com.Parameters["@BranchID"].Value = ObjCVarPS_PurchasingRequest.BranchID;
                        Com.Parameters["@CostCenter_ID"].Value = ObjCVarPS_PurchasingRequest.CostCenter_ID;
                        Com.Parameters["@SupplierID"].Value = ObjCVarPS_PurchasingRequest.SupplierID;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarPS_PurchasingRequest.IsDeleted;
                        Com.Parameters["@RequestNoManual"].Value = ObjCVarPS_PurchasingRequest.RequestNoManual;
                        Com.Parameters["@Notes"].Value = ObjCVarPS_PurchasingRequest.Notes;
                        Com.Parameters["@IsApproved"].Value = ObjCVarPS_PurchasingRequest.IsApproved;
                        Com.Parameters["@CreatedUserID"].Value = ObjCVarPS_PurchasingRequest.CreatedUserID;
                        Com.Parameters["@CreatedDate"].Value = ObjCVarPS_PurchasingRequest.CreatedDate;
                        Com.Parameters["@ApprovedUserID"].Value = ObjCVarPS_PurchasingRequest.ApprovedUserID;
                        Com.Parameters["@ApprovedDate"].Value = ObjCVarPS_PurchasingRequest.ApprovedDate;
                        Com.Parameters["@EditedByUserID"].Value = ObjCVarPS_PurchasingRequest.EditedByUserID;
                        Com.Parameters["@EditedDate"].Value = ObjCVarPS_PurchasingRequest.EditedDate;
                        EndTrans(Com, Con);
                        if (ObjCVarPS_PurchasingRequest.ID == 0)
                        {
                            ObjCVarPS_PurchasingRequest.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPS_PurchasingRequest.mIsChanges = false;
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
