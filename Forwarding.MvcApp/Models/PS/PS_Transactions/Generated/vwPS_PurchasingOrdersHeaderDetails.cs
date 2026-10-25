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
    public class CPKvwPS_PurchasingOrdersHeaderDetails
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
    public partial class CVarvwPS_PurchasingOrdersHeaderDetails : CPKvwPS_PurchasingOrdersHeaderDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mPurchasingOrderNo;
        internal DateTime mPurchasingOrderDate;
        internal String mPurchasingOrderNoManual;
        internal Int32 mDepartmentID;
        internal Int32 mBranchID;
        internal Int32 mCostCenter_ID;
        internal Int32 mSupplierID;
        internal Boolean mIsDeleted;
        internal String mNotes;
        internal Int64 mPS_QuotationsID;
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
        internal Int64 mPS_PurchasingOrdersID;
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
        public Int64 PS_QuotationsID
        {
            get { return mPS_QuotationsID; }
            set { mPS_QuotationsID = value; }
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
        public Int64 PS_PurchasingOrdersID
        {
            get { return mPS_PurchasingOrdersID; }
            set { mPS_PurchasingOrdersID = value; }
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

    public partial class CvwPS_PurchasingOrdersHeaderDetails
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
        public List<CVarvwPS_PurchasingOrdersHeaderDetails> lstCVarvwPS_PurchasingOrdersHeaderDetails = new List<CVarvwPS_PurchasingOrdersHeaderDetails>();
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
            lstCVarvwPS_PurchasingOrdersHeaderDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPS_PurchasingOrdersHeaderDetails";
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
                        CVarvwPS_PurchasingOrdersHeaderDetails ObjCVarvwPS_PurchasingOrdersHeaderDetails = new CVarvwPS_PurchasingOrdersHeaderDetails();
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mPurchasingOrderNo = Convert.ToString(dr["PurchasingOrderNo"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mPurchasingOrderDate = Convert.ToDateTime(dr["PurchasingOrderDate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mPurchasingOrderNoManual = Convert.ToString(dr["PurchasingOrderNoManual"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mPS_QuotationsID = Convert.ToInt64(dr["PS_QuotationsID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mQuotationNo = Convert.ToString(dr["QuotationNo"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mQuotationDate = Convert.ToDateTime(dr["QuotationDate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mQuotationNoManual = Convert.ToString(dr["QuotationNoManual"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mEditorName = Convert.ToString(dr["EditorName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mApproverName = Convert.ToString(dr["ApproverName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mCurrencyName = Convert.ToString(dr["CurrencyName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mPS_PurchasingOrdersID = Convert.ToInt64(dr["PS_PurchasingOrdersID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_ID = Convert.ToInt32(dr["D_ID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_ItemID = Convert.ToInt64(dr["D_ItemID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_ItemName = Convert.ToString(dr["D_ItemName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_ServiceID = Convert.ToInt64(dr["D_ServiceID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_ServiceName = Convert.ToString(dr["D_ServiceName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_StoreID = Convert.ToInt32(dr["D_StoreID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mItemServiceName = Convert.ToString(dr["ItemServiceName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_StoreName = Convert.ToString(dr["D_StoreName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_Notes = Convert.ToString(dr["D_Notes"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_Quantity = Convert.ToDecimal(dr["D_Quantity"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_CostCenterID = Convert.ToInt32(dr["D_CostCenterID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_CostCenter = Convert.ToString(dr["D_CostCenter"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_Type = Convert.ToString(dr["D_Type"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_UnitID = Convert.ToInt32(dr["D_UnitID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_UnitName = Convert.ToString(dr["D_UnitName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_UnitPrice = Convert.ToDecimal(dr["D_UnitPrice"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mPriceLocal = Convert.ToDecimal(dr["PriceLocal"].ToString());
                        lstCVarvwPS_PurchasingOrdersHeaderDetails.Add(ObjCVarvwPS_PurchasingOrdersHeaderDetails);
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
            lstCVarvwPS_PurchasingOrdersHeaderDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPS_PurchasingOrdersHeaderDetails";
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
                        CVarvwPS_PurchasingOrdersHeaderDetails ObjCVarvwPS_PurchasingOrdersHeaderDetails = new CVarvwPS_PurchasingOrdersHeaderDetails();
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mPurchasingOrderNo = Convert.ToString(dr["PurchasingOrderNo"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mPurchasingOrderDate = Convert.ToDateTime(dr["PurchasingOrderDate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mPurchasingOrderNoManual = Convert.ToString(dr["PurchasingOrderNoManual"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mPS_QuotationsID = Convert.ToInt64(dr["PS_QuotationsID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mQuotationNo = Convert.ToString(dr["QuotationNo"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mQuotationDate = Convert.ToDateTime(dr["QuotationDate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mQuotationNoManual = Convert.ToString(dr["QuotationNoManual"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mEditorName = Convert.ToString(dr["EditorName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mApproverName = Convert.ToString(dr["ApproverName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mCurrencyName = Convert.ToString(dr["CurrencyName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mPS_PurchasingOrdersID = Convert.ToInt64(dr["PS_PurchasingOrdersID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_ID = Convert.ToInt32(dr["D_ID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_ItemID = Convert.ToInt64(dr["D_ItemID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_ItemName = Convert.ToString(dr["D_ItemName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_ServiceID = Convert.ToInt64(dr["D_ServiceID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_ServiceName = Convert.ToString(dr["D_ServiceName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_StoreID = Convert.ToInt32(dr["D_StoreID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mItemServiceName = Convert.ToString(dr["ItemServiceName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_StoreName = Convert.ToString(dr["D_StoreName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_Notes = Convert.ToString(dr["D_Notes"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_Quantity = Convert.ToDecimal(dr["D_Quantity"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_CostCenterID = Convert.ToInt32(dr["D_CostCenterID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_CostCenter = Convert.ToString(dr["D_CostCenter"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_Type = Convert.ToString(dr["D_Type"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_UnitID = Convert.ToInt32(dr["D_UnitID"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_UnitName = Convert.ToString(dr["D_UnitName"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mD_UnitPrice = Convert.ToDecimal(dr["D_UnitPrice"].ToString());
                        ObjCVarvwPS_PurchasingOrdersHeaderDetails.mPriceLocal = Convert.ToDecimal(dr["PriceLocal"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPS_PurchasingOrdersHeaderDetails.Add(ObjCVarvwPS_PurchasingOrdersHeaderDetails);
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
