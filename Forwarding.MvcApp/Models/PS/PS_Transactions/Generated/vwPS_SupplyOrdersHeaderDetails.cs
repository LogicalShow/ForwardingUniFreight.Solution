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
    public class CPKvwPS_SupplyOrdersHeaderDetails
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
    public partial class CVarvwPS_SupplyOrdersHeaderDetails : CPKvwPS_SupplyOrdersHeaderDetails
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
        internal Int64 mPS_SupplyOrdersID;
        internal Int32 mD_ID;
        internal Int64 mD_ItemID;
        internal String mD_ItemName;
        internal Int64 mD_ServiceID;
        internal String mD_ServiceName;
        internal Int32 mD_StoreID;
        internal String mItemServiceName;
        internal String mD_StoreName;
        internal String mD_Notes;
        internal Decimal mD_Quantity;
        internal Int32 mD_CostCenterID;
        internal String mD_CostCenter;
        internal String mD_Type;
        internal Int32 mD_UnitID;
        internal String mD_UnitName;
        internal Decimal mPrice;
        internal Decimal mD_UnitPrice;
        internal Decimal mPriceLocal;
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
        public Int64 PS_SupplyOrdersID
        {
            get { return mPS_SupplyOrdersID; }
            set { mPS_SupplyOrdersID = value; }
        }
        public Int32 D_ID
        {
            get { return mD_ID; }
            set { mD_ID = value; }
        }
        public Int64 D_ItemID
        {
            get { return mD_ItemID; }
            set { mD_ItemID = value; }
        }
        public String D_ItemName
        {
            get { return mD_ItemName; }
            set { mD_ItemName = value; }
        }
        public Int64 D_ServiceID
        {
            get { return mD_ServiceID; }
            set { mD_ServiceID = value; }
        }
        public String D_ServiceName
        {
            get { return mD_ServiceName; }
            set { mD_ServiceName = value; }
        }
        public Int32 D_StoreID
        {
            get { return mD_StoreID; }
            set { mD_StoreID = value; }
        }
        public String ItemServiceName
        {
            get { return mItemServiceName; }
            set { mItemServiceName = value; }
        }
        public String D_StoreName
        {
            get { return mD_StoreName; }
            set { mD_StoreName = value; }
        }
        public String D_Notes
        {
            get { return mD_Notes; }
            set { mD_Notes = value; }
        }
        public Decimal D_Quantity
        {
            get { return mD_Quantity; }
            set { mD_Quantity = value; }
        }
        public Int32 D_CostCenterID
        {
            get { return mD_CostCenterID; }
            set { mD_CostCenterID = value; }
        }
        public String D_CostCenter
        {
            get { return mD_CostCenter; }
            set { mD_CostCenter = value; }
        }
        public String D_Type
        {
            get { return mD_Type; }
            set { mD_Type = value; }
        }
        public Int32 D_UnitID
        {
            get { return mD_UnitID; }
            set { mD_UnitID = value; }
        }
        public String D_UnitName
        {
            get { return mD_UnitName; }
            set { mD_UnitName = value; }
        }
        public Decimal Price
        {
            get { return mPrice; }
            set { mPrice = value; }
        }
        public Decimal D_UnitPrice
        {
            get { return mD_UnitPrice; }
            set { mD_UnitPrice = value; }
        }
        public Decimal PriceLocal
        {
            get { return mPriceLocal; }
            set { mPriceLocal = value; }
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

    public partial class CvwPS_SupplyOrdersHeaderDetails
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
        public List<CVarvwPS_SupplyOrdersHeaderDetails> lstCVarvwPS_SupplyOrdersHeaderDetails = new List<CVarvwPS_SupplyOrdersHeaderDetails>();
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
            lstCVarvwPS_SupplyOrdersHeaderDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPS_SupplyOrdersHeaderDetails";
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
                        CVarvwPS_SupplyOrdersHeaderDetails ObjCVarvwPS_SupplyOrdersHeaderDetails = new CVarvwPS_SupplyOrdersHeaderDetails();
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPurchasingSupplyNo = Convert.ToString(dr["PurchasingSupplyNo"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPurchasingSupplyDate = Convert.ToDateTime(dr["PurchasingSupplyDate"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPurchasingSupplyNoManual = Convert.ToString(dr["PurchasingSupplyNoManual"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mQuotationNo = Convert.ToString(dr["QuotationNo"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mQuotationDate = Convert.ToDateTime(dr["QuotationDate"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mQuotationNoManual = Convert.ToString(dr["QuotationNoManual"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mQuotationNoAndRequestInfo = Convert.ToString(dr["QuotationNoAndRequestInfo"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPS_QuotationsID = Convert.ToInt64(dr["PS_QuotationsID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mEditorName = Convert.ToString(dr["EditorName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mApproverName = Convert.ToString(dr["ApproverName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mCurrencyName = Convert.ToString(dr["CurrencyName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPaymentNotes = Convert.ToString(dr["PaymentNotes"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPS_PurchasingOrdersID = Convert.ToInt64(dr["PS_PurchasingOrdersID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPurchasingOrderInfo = Convert.ToString(dr["PurchasingOrderInfo"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPaymentTermCode = Convert.ToString(dr["PaymentTermCode"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPS_SupplyOrdersID = Convert.ToInt64(dr["PS_SupplyOrdersID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_ID = Convert.ToInt32(dr["D_ID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_ItemID = Convert.ToInt64(dr["D_ItemID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_ItemName = Convert.ToString(dr["D_ItemName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_ServiceID = Convert.ToInt64(dr["D_ServiceID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_ServiceName = Convert.ToString(dr["D_ServiceName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_StoreID = Convert.ToInt32(dr["D_StoreID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mItemServiceName = Convert.ToString(dr["ItemServiceName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_StoreName = Convert.ToString(dr["D_StoreName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_Notes = Convert.ToString(dr["D_Notes"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_Quantity = Convert.ToDecimal(dr["D_Quantity"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_CostCenterID = Convert.ToInt32(dr["D_CostCenterID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_CostCenter = Convert.ToString(dr["D_CostCenter"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_Type = Convert.ToString(dr["D_Type"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_UnitID = Convert.ToInt32(dr["D_UnitID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_UnitName = Convert.ToString(dr["D_UnitName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_UnitPrice = Convert.ToDecimal(dr["D_UnitPrice"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPriceLocal = Convert.ToDecimal(dr["PriceLocal"].ToString());
                        lstCVarvwPS_SupplyOrdersHeaderDetails.Add(ObjCVarvwPS_SupplyOrdersHeaderDetails);
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
            lstCVarvwPS_SupplyOrdersHeaderDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPS_SupplyOrdersHeaderDetails";
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
                        CVarvwPS_SupplyOrdersHeaderDetails ObjCVarvwPS_SupplyOrdersHeaderDetails = new CVarvwPS_SupplyOrdersHeaderDetails();
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPurchasingSupplyNo = Convert.ToString(dr["PurchasingSupplyNo"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPurchasingSupplyDate = Convert.ToDateTime(dr["PurchasingSupplyDate"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPurchasingSupplyNoManual = Convert.ToString(dr["PurchasingSupplyNoManual"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mQuotationNo = Convert.ToString(dr["QuotationNo"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mQuotationDate = Convert.ToDateTime(dr["QuotationDate"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mQuotationNoManual = Convert.ToString(dr["QuotationNoManual"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mQuotationNoAndRequestInfo = Convert.ToString(dr["QuotationNoAndRequestInfo"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPS_QuotationsID = Convert.ToInt64(dr["PS_QuotationsID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mEditorName = Convert.ToString(dr["EditorName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mApproverName = Convert.ToString(dr["ApproverName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mCurrencyName = Convert.ToString(dr["CurrencyName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPaymentNotes = Convert.ToString(dr["PaymentNotes"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPS_PurchasingOrdersID = Convert.ToInt64(dr["PS_PurchasingOrdersID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPurchasingOrderInfo = Convert.ToString(dr["PurchasingOrderInfo"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPaymentTermCode = Convert.ToString(dr["PaymentTermCode"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPS_SupplyOrdersID = Convert.ToInt64(dr["PS_SupplyOrdersID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_ID = Convert.ToInt32(dr["D_ID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_ItemID = Convert.ToInt64(dr["D_ItemID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_ItemName = Convert.ToString(dr["D_ItemName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_ServiceID = Convert.ToInt64(dr["D_ServiceID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_ServiceName = Convert.ToString(dr["D_ServiceName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_StoreID = Convert.ToInt32(dr["D_StoreID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mItemServiceName = Convert.ToString(dr["ItemServiceName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_StoreName = Convert.ToString(dr["D_StoreName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_Notes = Convert.ToString(dr["D_Notes"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_Quantity = Convert.ToDecimal(dr["D_Quantity"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_CostCenterID = Convert.ToInt32(dr["D_CostCenterID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_CostCenter = Convert.ToString(dr["D_CostCenter"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_Type = Convert.ToString(dr["D_Type"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_UnitID = Convert.ToInt32(dr["D_UnitID"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_UnitName = Convert.ToString(dr["D_UnitName"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mD_UnitPrice = Convert.ToDecimal(dr["D_UnitPrice"].ToString());
                        ObjCVarvwPS_SupplyOrdersHeaderDetails.mPriceLocal = Convert.ToDecimal(dr["PriceLocal"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPS_SupplyOrdersHeaderDetails.Add(ObjCVarvwPS_SupplyOrdersHeaderDetails);
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
