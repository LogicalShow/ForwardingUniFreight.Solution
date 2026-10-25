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
    public partial class CVarvwPS_PurchasingRequest
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
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
        internal String mCostCenterName;
        internal String mCreatorName;
        internal String mEditorName;
        internal String mApproverName;
        internal String mBranchName;
        internal String mDepartmentName;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String RequestNo
        {
            get { return mRequestNo; }
            set { mRequestNo = value; }
        }
        public DateTime RequestDate
        {
            get { return mRequestDate; }
            set { mRequestDate = value; }
        }
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mDepartmentID = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mBranchID = value; }
        }
        public Int32 CostCenter_ID
        {
            get { return mCostCenter_ID; }
            set { mCostCenter_ID = value; }
        }
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mSupplierID = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public String RequestNoManual
        {
            get { return mRequestNoManual; }
            set { mRequestNoManual = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsApproved = value; }
        }
        public Int32 CreatedUserID
        {
            get { return mCreatedUserID; }
            set { mCreatedUserID = value; }
        }
        public DateTime CreatedDate
        {
            get { return mCreatedDate; }
            set { mCreatedDate = value; }
        }
        public Int32 ApprovedUserID
        {
            get { return mApprovedUserID; }
            set { mApprovedUserID = value; }
        }
        public DateTime ApprovedDate
        {
            get { return mApprovedDate; }
            set { mApprovedDate = value; }
        }
        public Int32 EditedByUserID
        {
            get { return mEditedByUserID; }
            set { mEditedByUserID = value; }
        }
        public DateTime EditedDate
        {
            get { return mEditedDate; }
            set { mEditedDate = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public String CostCenterName
        {
            get { return mCostCenterName; }
            set { mCostCenterName = value; }
        }
        public String CreatorName
        {
            get { return mCreatorName; }
            set { mCreatorName = value; }
        }
        public String EditorName
        {
            get { return mEditorName; }
            set { mEditorName = value; }
        }
        public String ApproverName
        {
            get { return mApproverName; }
            set { mApproverName = value; }
        }
        public String BranchName
        {
            get { return mBranchName; }
            set { mBranchName = value; }
        }
        public String DepartmentName
        {
            get { return mDepartmentName; }
            set { mDepartmentName = value; }
        }
        #endregion
    }

    public partial class CvwPS_PurchasingRequest
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
        public List<CVarvwPS_PurchasingRequest> lstCVarvwPS_PurchasingRequest = new List<CVarvwPS_PurchasingRequest>();
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
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwPS_PurchasingRequest.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPS_PurchasingRequest";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwPS_PurchasingRequest ObjCVarvwPS_PurchasingRequest = new CVarvwPS_PurchasingRequest();
                        ObjCVarvwPS_PurchasingRequest.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mRequestNo = Convert.ToString(dr["RequestNo"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mRequestDate = Convert.ToDateTime(dr["RequestDate"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mRequestNoManual = Convert.ToString(dr["RequestNoManual"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mEditorName = Convert.ToString(dr["EditorName"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mApproverName = Convert.ToString(dr["ApproverName"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        lstCVarvwPS_PurchasingRequest.Add(ObjCVarvwPS_PurchasingRequest);
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
            lstCVarvwPS_PurchasingRequest.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPS_PurchasingRequest";
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
                        CVarvwPS_PurchasingRequest ObjCVarvwPS_PurchasingRequest = new CVarvwPS_PurchasingRequest();
                        ObjCVarvwPS_PurchasingRequest.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mRequestNo = Convert.ToString(dr["RequestNo"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mRequestDate = Convert.ToDateTime(dr["RequestDate"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mRequestNoManual = Convert.ToString(dr["RequestNoManual"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mEditorName = Convert.ToString(dr["EditorName"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mApproverName = Convert.ToString(dr["ApproverName"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPS_PurchasingRequest.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPS_PurchasingRequest.Add(ObjCVarvwPS_PurchasingRequest);
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
    }



}
