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
    public partial class CVarvwPS_QuotationsDetailsHeaderDetails
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
        internal Int64 mPSQuotationID;
        internal Int32 mD_ID;
        internal Int64 mD_ItemID;
        internal String mD_ItemName;
        internal Int64 mD_ServiceID;
        internal String mD_ServiceName;
        internal Int32 mD_StoreID;
        internal String mD_StoreName;
        internal String mD_Notes;
        internal Decimal mD_Quantity;
        internal Int32 mD_CostCenterID;
        internal String mD_CostCenter;
        internal String mD_Type;
        internal Int32 mD_UnitID;
        internal String mD_UnitName;
        internal Decimal mPrice;
        internal Int32 mCurrencyID;
        internal Decimal mExchangeRate;
        internal String mCurrencyCode;
        internal String mCurrencyName;
        internal Decimal mPriceLocal;
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
        public Int64 PSQuotationID
        {
            get { return mPSQuotationID; }
            set { mPSQuotationID = value; }
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
        public Decimal PriceLocal
        {
            get { return mPriceLocal; }
            set { mPriceLocal = value; }
        }
        #endregion
    }

    public partial class CvwPS_QuotationsDetailsHeaderDetails
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
        public List<CVarvwPS_QuotationsDetailsHeaderDetails> lstCVarvwPS_QuotationsDetailsHeaderDetails = new List<CVarvwPS_QuotationsDetailsHeaderDetails>();
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
            lstCVarvwPS_QuotationsDetailsHeaderDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPS_QuotationsDetailsHeaderDetails";
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
                        CVarvwPS_QuotationsDetailsHeaderDetails ObjCVarvwPS_QuotationsDetailsHeaderDetails = new CVarvwPS_QuotationsDetailsHeaderDetails();
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mQuotationNo = Convert.ToString(dr["QuotationNo"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mQuotationDate = Convert.ToDateTime(dr["QuotationDate"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mRequestNo = Convert.ToString(dr["RequestNo"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mRequestDate = Convert.ToDateTime(dr["RequestDate"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mRequestNoManual = Convert.ToString(dr["RequestNoManual"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mQuotationNoManual = Convert.ToString(dr["QuotationNoManual"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mPurchasingRequestID = Convert.ToInt64(dr["PurchasingRequestID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mEditorName = Convert.ToString(dr["EditorName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mApproverName = Convert.ToString(dr["ApproverName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mPSQuotationID = Convert.ToInt64(dr["PSQuotationID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_ID = Convert.ToInt32(dr["D_ID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_ItemID = Convert.ToInt64(dr["D_ItemID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_ItemName = Convert.ToString(dr["D_ItemName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_ServiceID = Convert.ToInt64(dr["D_ServiceID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_ServiceName = Convert.ToString(dr["D_ServiceName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_StoreID = Convert.ToInt32(dr["D_StoreID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_StoreName = Convert.ToString(dr["D_StoreName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_Notes = Convert.ToString(dr["D_Notes"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_Quantity = Convert.ToDecimal(dr["D_Quantity"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_CostCenterID = Convert.ToInt32(dr["D_CostCenterID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_CostCenter = Convert.ToString(dr["D_CostCenter"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_Type = Convert.ToString(dr["D_Type"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_UnitID = Convert.ToInt32(dr["D_UnitID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_UnitName = Convert.ToString(dr["D_UnitName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mCurrencyName = Convert.ToString(dr["CurrencyName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mPriceLocal = Convert.ToDecimal(dr["PriceLocal"].ToString());
                        lstCVarvwPS_QuotationsDetailsHeaderDetails.Add(ObjCVarvwPS_QuotationsDetailsHeaderDetails);
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
            lstCVarvwPS_QuotationsDetailsHeaderDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPS_QuotationsDetailsHeaderDetails";
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
                        CVarvwPS_QuotationsDetailsHeaderDetails ObjCVarvwPS_QuotationsDetailsHeaderDetails = new CVarvwPS_QuotationsDetailsHeaderDetails();
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mQuotationNo = Convert.ToString(dr["QuotationNo"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mQuotationDate = Convert.ToDateTime(dr["QuotationDate"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mRequestNo = Convert.ToString(dr["RequestNo"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mRequestDate = Convert.ToDateTime(dr["RequestDate"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mRequestNoManual = Convert.ToString(dr["RequestNoManual"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mQuotationNoManual = Convert.ToString(dr["QuotationNoManual"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mPurchasingRequestID = Convert.ToInt64(dr["PurchasingRequestID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mEditorName = Convert.ToString(dr["EditorName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mApproverName = Convert.ToString(dr["ApproverName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mPSQuotationID = Convert.ToInt64(dr["PSQuotationID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_ID = Convert.ToInt32(dr["D_ID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_ItemID = Convert.ToInt64(dr["D_ItemID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_ItemName = Convert.ToString(dr["D_ItemName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_ServiceID = Convert.ToInt64(dr["D_ServiceID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_ServiceName = Convert.ToString(dr["D_ServiceName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_StoreID = Convert.ToInt32(dr["D_StoreID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_StoreName = Convert.ToString(dr["D_StoreName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_Notes = Convert.ToString(dr["D_Notes"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_Quantity = Convert.ToDecimal(dr["D_Quantity"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_CostCenterID = Convert.ToInt32(dr["D_CostCenterID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_CostCenter = Convert.ToString(dr["D_CostCenter"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_Type = Convert.ToString(dr["D_Type"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_UnitID = Convert.ToInt32(dr["D_UnitID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mD_UnitName = Convert.ToString(dr["D_UnitName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mCurrencyName = Convert.ToString(dr["CurrencyName"].ToString());
                        ObjCVarvwPS_QuotationsDetailsHeaderDetails.mPriceLocal = Convert.ToDecimal(dr["PriceLocal"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPS_QuotationsDetailsHeaderDetails.Add(ObjCVarvwPS_QuotationsDetailsHeaderDetails);
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
