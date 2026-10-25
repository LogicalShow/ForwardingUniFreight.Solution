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
    public class CPKvwPS_PurchasingOrdersNew
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
    public partial class CVarvwPS_PurchasingOrdersNew : CPKvwPS_PurchasingOrdersNew
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mRequestNo;
        internal DateTime mRequestDate;
        internal Int32 mDepartmentID;
        internal Int32 mSupplierID;
        internal String mNotes;
        internal Boolean mIsApproved;
        internal Int32 mCreatedUserID;
        internal DateTime mCreatedDate;
        internal Int32 mApprovedUserID;
        internal DateTime mApprovedDate;
        internal Int32 mEditedByUserID;
        internal DateTime mEditedDate;
        internal String mName;
        internal String mCreatorName;
        internal String mEditorName;
        internal String mApproverName;
        internal String mDepartmentName;
        internal Int32 mCustodyID;
        internal Int32 mCurrencyID;
        #endregion

        #region "Methods"
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
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mSupplierID = value; }
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
        public String DepartmentName
        {
            get { return mDepartmentName; }
            set { mDepartmentName = value; }
        }
        public Int32 CustodyID
        {
            get { return mCustodyID; }
            set { mCustodyID = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
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

    public partial class CvwPS_PurchasingOrdersNew
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
        public List<CVarvwPS_PurchasingOrdersNew> lstCVarvwPS_PurchasingOrdersNew = new List<CVarvwPS_PurchasingOrdersNew>();
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
            lstCVarvwPS_PurchasingOrdersNew.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPS_PurchasingOrdersNew";
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
                        CVarvwPS_PurchasingOrdersNew ObjCVarvwPS_PurchasingOrdersNew = new CVarvwPS_PurchasingOrdersNew();
                        ObjCVarvwPS_PurchasingOrdersNew.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mRequestNo = Convert.ToString(dr["RequestNo"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mRequestDate = Convert.ToDateTime(dr["RequestDate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mEditorName = Convert.ToString(dr["EditorName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mApproverName = Convert.ToString(dr["ApproverName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mCustodyID = Convert.ToInt32(dr["CustodyID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        lstCVarvwPS_PurchasingOrdersNew.Add(ObjCVarvwPS_PurchasingOrdersNew);
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
            lstCVarvwPS_PurchasingOrdersNew.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPS_PurchasingOrdersNew";
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
                        CVarvwPS_PurchasingOrdersNew ObjCVarvwPS_PurchasingOrdersNew = new CVarvwPS_PurchasingOrdersNew();
                        ObjCVarvwPS_PurchasingOrdersNew.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mRequestNo = Convert.ToString(dr["RequestNo"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mRequestDate = Convert.ToDateTime(dr["RequestDate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mEditorName = Convert.ToString(dr["EditorName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mApproverName = Convert.ToString(dr["ApproverName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mCustodyID = Convert.ToInt32(dr["CustodyID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersNew.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPS_PurchasingOrdersNew.Add(ObjCVarvwPS_PurchasingOrdersNew);
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
