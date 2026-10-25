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
    public partial class CVarvwPS_Quotations
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal String mQuotationNo;
        internal DateTime mQuotationDate;
        internal Int32 mDepartmentID;
        internal Int32 mBranchID;
        internal String mRequestNo;
        internal DateTime mRequestDate;
        internal String mRequestNoManual;
        internal Int32 mCostCenter_ID;
        internal Int32 mSupplierID;
        internal Boolean mIsDeleted;
        internal String mQuotationNoManual;
        internal String mNotes;
        internal Boolean mIsApproved;
        internal Int32 mCreatedUserID;
        internal DateTime mCreatedDate;
        internal Int32 mApprovedUserID;
        internal DateTime mApprovedDate;
        internal Int32 mEditedByUserID;
        internal DateTime mEditedDate;
        internal Int64 mPurchasingRequestID;
        internal String mSupplierName;
        internal String mCostCenterName;
        internal String mCreatorName;
        internal String mEditorName;
        internal String mApproverName;
        internal String mBranchName;
        internal String mDepartmentName;
        internal Int32 mCurrencyID;
        internal Decimal mExchangeRate;
        internal String mCurrencyCode;
        internal String mCurrencyName;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String QuotationNo
        {
            get { return mQuotationNo; }
            set { mQuotationNo = value; }
        }
        public DateTime QuotationDate
        {
            get { return mQuotationDate; }
            set { mQuotationDate = value; }
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
        public String RequestNoManual
        {
            get { return mRequestNoManual; }
            set { mRequestNoManual = value; }
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
        public String QuotationNoManual
        {
            get { return mQuotationNoManual; }
            set { mQuotationNoManual = value; }
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
        public Int64 PurchasingRequestID
        {
            get { return mPurchasingRequestID; }
            set { mPurchasingRequestID = value; }
        }
        public String SupplierName
        {
            get { return mSupplierName; }
            set { mSupplierName = value; }
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
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mExchangeRate = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
        }
        public String CurrencyName
        {
            get { return mCurrencyName; }
            set { mCurrencyName = value; }
        }
        #endregion
    }

    public partial class CvwPS_Quotations
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
        public List<CVarvwPS_Quotations> lstCVarvwPS_Quotations = new List<CVarvwPS_Quotations>();
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
            lstCVarvwPS_Quotations.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPS_Quotations";
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
                        CVarvwPS_Quotations ObjCVarvwPS_Quotations = new CVarvwPS_Quotations();
                        ObjCVarvwPS_Quotations.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_Quotations.mQuotationNo = Convert.ToString(dr["QuotationNo"].ToString());
                        ObjCVarvwPS_Quotations.mQuotationDate = Convert.ToDateTime(dr["QuotationDate"].ToString());
                        ObjCVarvwPS_Quotations.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_Quotations.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPS_Quotations.mRequestNo = Convert.ToString(dr["RequestNo"].ToString());
                        ObjCVarvwPS_Quotations.mRequestDate = Convert.ToDateTime(dr["RequestDate"].ToString());
                        ObjCVarvwPS_Quotations.mRequestNoManual = Convert.ToString(dr["RequestNoManual"].ToString());
                        ObjCVarvwPS_Quotations.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_Quotations.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_Quotations.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_Quotations.mQuotationNoManual = Convert.ToString(dr["QuotationNoManual"].ToString());
                        ObjCVarvwPS_Quotations.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_Quotations.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_Quotations.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarvwPS_Quotations.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarvwPS_Quotations.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarvwPS_Quotations.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarvwPS_Quotations.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarvwPS_Quotations.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarvwPS_Quotations.mPurchasingRequestID = Convert.ToInt64(dr["PurchasingRequestID"].ToString());
                        ObjCVarvwPS_Quotations.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_Quotations.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwPS_Quotations.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwPS_Quotations.mEditorName = Convert.ToString(dr["EditorName"].ToString());
                        ObjCVarvwPS_Quotations.mApproverName = Convert.ToString(dr["ApproverName"].ToString());
                        ObjCVarvwPS_Quotations.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPS_Quotations.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwPS_Quotations.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_Quotations.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_Quotations.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_Quotations.mCurrencyName = Convert.ToString(dr["CurrencyName"].ToString());
                        lstCVarvwPS_Quotations.Add(ObjCVarvwPS_Quotations);
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
            lstCVarvwPS_Quotations.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPS_Quotations";
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
                        CVarvwPS_Quotations ObjCVarvwPS_Quotations = new CVarvwPS_Quotations();
                        ObjCVarvwPS_Quotations.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_Quotations.mQuotationNo = Convert.ToString(dr["QuotationNo"].ToString());
                        ObjCVarvwPS_Quotations.mQuotationDate = Convert.ToDateTime(dr["QuotationDate"].ToString());
                        ObjCVarvwPS_Quotations.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_Quotations.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPS_Quotations.mRequestNo = Convert.ToString(dr["RequestNo"].ToString());
                        ObjCVarvwPS_Quotations.mRequestDate = Convert.ToDateTime(dr["RequestDate"].ToString());
                        ObjCVarvwPS_Quotations.mRequestNoManual = Convert.ToString(dr["RequestNoManual"].ToString());
                        ObjCVarvwPS_Quotations.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_Quotations.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_Quotations.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_Quotations.mQuotationNoManual = Convert.ToString(dr["QuotationNoManual"].ToString());
                        ObjCVarvwPS_Quotations.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_Quotations.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_Quotations.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarvwPS_Quotations.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarvwPS_Quotations.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarvwPS_Quotations.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarvwPS_Quotations.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarvwPS_Quotations.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarvwPS_Quotations.mPurchasingRequestID = Convert.ToInt64(dr["PurchasingRequestID"].ToString());
                        ObjCVarvwPS_Quotations.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_Quotations.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwPS_Quotations.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwPS_Quotations.mEditorName = Convert.ToString(dr["EditorName"].ToString());
                        ObjCVarvwPS_Quotations.mApproverName = Convert.ToString(dr["ApproverName"].ToString());
                        ObjCVarvwPS_Quotations.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPS_Quotations.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwPS_Quotations.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_Quotations.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_Quotations.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_Quotations.mCurrencyName = Convert.ToString(dr["CurrencyName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPS_Quotations.Add(ObjCVarvwPS_Quotations);
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
