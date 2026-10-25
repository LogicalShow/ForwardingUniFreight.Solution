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
    public class CPKvwPS_SupplyOrders
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
    public partial class CVarvwPS_SupplyOrders : CPKvwPS_SupplyOrders
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mPurchasingSupplyNo;
        internal DateTime mPurchasingSupplyDate;
        internal String mPurchasingSupplyNoManual;
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
        internal String mQuotationNoAndRequestInfo;
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
        internal Int32 mPaymentTermID;
        internal String mPaymentNotes;
        internal Int64 mPS_PurchasingOrdersID;
        internal String mPurchasingOrderInfo;
        internal String mPaymentTermName;
        internal String mPaymentTermCode;
        #endregion

        #region "Methods"
        public String PurchasingSupplyNo
        {
            get { return mPurchasingSupplyNo; }
            set { mPurchasingSupplyNo = value; }
        }
        public DateTime PurchasingSupplyDate
        {
            get { return mPurchasingSupplyDate; }
            set { mPurchasingSupplyDate = value; }
        }
        public String PurchasingSupplyNoManual
        {
            get { return mPurchasingSupplyNoManual; }
            set { mPurchasingSupplyNoManual = value; }
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
        public String QuotationNoAndRequestInfo
        {
            get { return mQuotationNoAndRequestInfo; }
            set { mQuotationNoAndRequestInfo = value; }
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
        public Int32 PaymentTermID
        {
            get { return mPaymentTermID; }
            set { mPaymentTermID = value; }
        }
        public String PaymentNotes
        {
            get { return mPaymentNotes; }
            set { mPaymentNotes = value; }
        }
        public Int64 PS_PurchasingOrdersID
        {
            get { return mPS_PurchasingOrdersID; }
            set { mPS_PurchasingOrdersID = value; }
        }
        public String PurchasingOrderInfo
        {
            get { return mPurchasingOrderInfo; }
            set { mPurchasingOrderInfo = value; }
        }
        public String PaymentTermName
        {
            get { return mPaymentTermName; }
            set { mPaymentTermName = value; }
        }
        public String PaymentTermCode
        {
            get { return mPaymentTermCode; }
            set { mPaymentTermCode = value; }
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

    public partial class CvwPS_SupplyOrders
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
        public List<CVarvwPS_SupplyOrders> lstCVarvwPS_SupplyOrders = new List<CVarvwPS_SupplyOrders>();
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
            lstCVarvwPS_SupplyOrders.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPS_SupplyOrders";
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
                        CVarvwPS_SupplyOrders ObjCVarvwPS_SupplyOrders = new CVarvwPS_SupplyOrders();
                        ObjCVarvwPS_SupplyOrders.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPurchasingSupplyNo = Convert.ToString(dr["PurchasingSupplyNo"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPurchasingSupplyDate = Convert.ToDateTime(dr["PurchasingSupplyDate"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPurchasingSupplyNoManual = Convert.ToString(dr["PurchasingSupplyNoManual"].ToString());
                        ObjCVarvwPS_SupplyOrders.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_SupplyOrders.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_SupplyOrders.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_SupplyOrders.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarvwPS_SupplyOrders.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarvwPS_SupplyOrders.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarvwPS_SupplyOrders.mQuotationNo = Convert.ToString(dr["QuotationNo"].ToString());
                        ObjCVarvwPS_SupplyOrders.mQuotationDate = Convert.ToDateTime(dr["QuotationDate"].ToString());
                        ObjCVarvwPS_SupplyOrders.mQuotationNoManual = Convert.ToString(dr["QuotationNoManual"].ToString());
                        ObjCVarvwPS_SupplyOrders.mQuotationNoAndRequestInfo = Convert.ToString(dr["QuotationNoAndRequestInfo"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPS_QuotationsID = Convert.ToInt64(dr["PS_QuotationsID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_SupplyOrders.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwPS_SupplyOrders.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwPS_SupplyOrders.mEditorName = Convert.ToString(dr["EditorName"].ToString());
                        ObjCVarvwPS_SupplyOrders.mApproverName = Convert.ToString(dr["ApproverName"].ToString());
                        ObjCVarvwPS_SupplyOrders.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPS_SupplyOrders.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwPS_SupplyOrders.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_SupplyOrders.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_SupplyOrders.mCurrencyName = Convert.ToString(dr["CurrencyName"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPaymentNotes = Convert.ToString(dr["PaymentNotes"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPS_PurchasingOrdersID = Convert.ToInt64(dr["PS_PurchasingOrdersID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPurchasingOrderInfo = Convert.ToString(dr["PurchasingOrderInfo"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPaymentTermCode = Convert.ToString(dr["PaymentTermCode"].ToString());
                        lstCVarvwPS_SupplyOrders.Add(ObjCVarvwPS_SupplyOrders);
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
            lstCVarvwPS_SupplyOrders.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPS_SupplyOrders";
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
                        CVarvwPS_SupplyOrders ObjCVarvwPS_SupplyOrders = new CVarvwPS_SupplyOrders();
                        ObjCVarvwPS_SupplyOrders.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPurchasingSupplyNo = Convert.ToString(dr["PurchasingSupplyNo"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPurchasingSupplyDate = Convert.ToDateTime(dr["PurchasingSupplyDate"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPurchasingSupplyNoManual = Convert.ToString(dr["PurchasingSupplyNoManual"].ToString());
                        ObjCVarvwPS_SupplyOrders.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_SupplyOrders.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_SupplyOrders.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_SupplyOrders.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarvwPS_SupplyOrders.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarvwPS_SupplyOrders.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarvwPS_SupplyOrders.mQuotationNo = Convert.ToString(dr["QuotationNo"].ToString());
                        ObjCVarvwPS_SupplyOrders.mQuotationDate = Convert.ToDateTime(dr["QuotationDate"].ToString());
                        ObjCVarvwPS_SupplyOrders.mQuotationNoManual = Convert.ToString(dr["QuotationNoManual"].ToString());
                        ObjCVarvwPS_SupplyOrders.mQuotationNoAndRequestInfo = Convert.ToString(dr["QuotationNoAndRequestInfo"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPS_QuotationsID = Convert.ToInt64(dr["PS_QuotationsID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_SupplyOrders.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwPS_SupplyOrders.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwPS_SupplyOrders.mEditorName = Convert.ToString(dr["EditorName"].ToString());
                        ObjCVarvwPS_SupplyOrders.mApproverName = Convert.ToString(dr["ApproverName"].ToString());
                        ObjCVarvwPS_SupplyOrders.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPS_SupplyOrders.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwPS_SupplyOrders.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_SupplyOrders.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_SupplyOrders.mCurrencyName = Convert.ToString(dr["CurrencyName"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPaymentNotes = Convert.ToString(dr["PaymentNotes"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPS_PurchasingOrdersID = Convert.ToInt64(dr["PS_PurchasingOrdersID"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPurchasingOrderInfo = Convert.ToString(dr["PurchasingOrderInfo"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
                        ObjCVarvwPS_SupplyOrders.mPaymentTermCode = Convert.ToString(dr["PaymentTermCode"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPS_SupplyOrders.Add(ObjCVarvwPS_SupplyOrders);
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
