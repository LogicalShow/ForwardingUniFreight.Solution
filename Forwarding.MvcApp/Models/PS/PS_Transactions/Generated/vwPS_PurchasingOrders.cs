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
    public partial class CVarvwPS_PurchasingOrders
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal String mPurchasingOrderNo;
        internal DateTime mPurchasingOrderDate;
        internal String mPurchasingOrderNoManual;
        internal Int32 mDepartmentID;
        internal Int32 mBranchID;
        internal Int32 mCostCenter_ID;
        internal Int32 mSupplierID;
        internal Boolean mIsDeleted;
        internal String mNotes;
        internal Boolean mIsApproved;
        internal Int32 mCreatedUserID;
        internal DateTime mCreatedDate;
        internal Int32 mApprovedUserID;
        internal DateTime mApprovedDate;
        internal Int32 mEditedByUserID;
        internal DateTime mEditedDate;
        internal String mQuotationNo;
        internal DateTime mQuotationDate;
        internal String mQuotationNoManual;
        internal Int64 mPS_QuotationsID;
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
        public String PurchasingOrderNo
        {
            get { return mPurchasingOrderNo; }
            set { mPurchasingOrderNo = value; }
        }
        public DateTime PurchasingOrderDate
        {
            get { return mPurchasingOrderDate; }
            set { mPurchasingOrderDate = value; }
        }
        public String PurchasingOrderNoManual
        {
            get { return mPurchasingOrderNoManual; }
            set { mPurchasingOrderNoManual = value; }
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
        public String QuotationNoManual
        {
            get { return mQuotationNoManual; }
            set { mQuotationNoManual = value; }
        }
        public Int64 PS_QuotationsID
        {
            get { return mPS_QuotationsID; }
            set { mPS_QuotationsID = value; }
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

    public partial class CvwPS_PurchasingOrders
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
        public List<CVarvwPS_PurchasingOrders> lstCVarvwPS_PurchasingOrders = new List<CVarvwPS_PurchasingOrders>();
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
            lstCVarvwPS_PurchasingOrders.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPS_PurchasingOrders";
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
                        CVarvwPS_PurchasingOrders ObjCVarvwPS_PurchasingOrders = new CVarvwPS_PurchasingOrders();
                        ObjCVarvwPS_PurchasingOrders.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mPurchasingOrderNo = Convert.ToString(dr["PurchasingOrderNo"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mPurchasingOrderDate = Convert.ToDateTime(dr["PurchasingOrderDate"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mPurchasingOrderNoManual = Convert.ToString(dr["PurchasingOrderNoManual"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mQuotationNo = Convert.ToString(dr["QuotationNo"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mQuotationDate = Convert.ToDateTime(dr["QuotationDate"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mQuotationNoManual = Convert.ToString(dr["QuotationNoManual"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mPS_QuotationsID = Convert.ToInt64(dr["PS_QuotationsID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mEditorName = Convert.ToString(dr["EditorName"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mApproverName = Convert.ToString(dr["ApproverName"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mCurrencyName = Convert.ToString(dr["CurrencyName"].ToString());
                        lstCVarvwPS_PurchasingOrders.Add(ObjCVarvwPS_PurchasingOrders);
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
            lstCVarvwPS_PurchasingOrders.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPS_PurchasingOrders";
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
                        CVarvwPS_PurchasingOrders ObjCVarvwPS_PurchasingOrders = new CVarvwPS_PurchasingOrders();
                        ObjCVarvwPS_PurchasingOrders.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mPurchasingOrderNo = Convert.ToString(dr["PurchasingOrderNo"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mPurchasingOrderDate = Convert.ToDateTime(dr["PurchasingOrderDate"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mPurchasingOrderNoManual = Convert.ToString(dr["PurchasingOrderNoManual"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mQuotationNo = Convert.ToString(dr["QuotationNo"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mQuotationDate = Convert.ToDateTime(dr["QuotationDate"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mQuotationNoManual = Convert.ToString(dr["QuotationNoManual"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mPS_QuotationsID = Convert.ToInt64(dr["PS_QuotationsID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mEditorName = Convert.ToString(dr["EditorName"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mApproverName = Convert.ToString(dr["ApproverName"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_PurchasingOrders.mCurrencyName = Convert.ToString(dr["CurrencyName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPS_PurchasingOrders.Add(ObjCVarvwPS_PurchasingOrders);
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
