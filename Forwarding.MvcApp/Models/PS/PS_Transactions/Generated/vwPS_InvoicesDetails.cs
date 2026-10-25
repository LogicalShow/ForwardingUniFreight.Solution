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
    public class CPKvwPS_InvoicesDetails
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
    public partial class CVarvwPS_InvoicesDetails : CPKvwPS_InvoicesDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mInvoiceNo;
        internal DateTime mInvoiceDate;
        internal Int32 mQuotationID;
        internal Int32 mSupplierID;
        internal String mSupplierName;
        internal Int32 mPaymentTermID;
        internal Int64 mSupplyOrderID;
        internal String mPaymentTermName;
        internal String mPaymentTermCode;
        internal String mPurchasingOrderInfo;
        internal String mPurchasingSupplyInfo;
        internal DateTime mPurchasingOrderDate;
        internal DateTime mPurchasingSupplyDate;
        internal Decimal mTotalBeforTax;
        internal Decimal mTotalPrice;
        internal Decimal mDiscount;
        internal Decimal mDiscountPercentage;
        internal String mNotes;
        internal Int32 mDepartmentID;
        internal Int32 mSalesManID;
        internal Int32 mCostCenter_ID;
        internal String mInvCostCenter;
        internal Int32 mPaymentMethodID;
        internal Int32 mTransactionID;
        internal String mPaymentMethodName;
        internal Boolean mIsApproved;
        internal Boolean mISDiscountBeforeTax;
        internal String mInvoiceNoManual;
        internal Int64 mOrderID;
        internal Int32 mJVID;
        internal Int32 mCurrencyID;
        internal Boolean mIsFixedDiscount;
        internal Int32 mEntitlementDays;
        internal String mCurrencyCode;
        internal Decimal mExchangeRate;
        internal Decimal mLocalTotalBeforeTax;
        internal Decimal mLocalTotal;
        internal Boolean mIsDeleted;
        internal Decimal mPaidAmount;
        internal Decimal mRemainAmount;
        internal String mSupplierInvoiceNo;
        internal Decimal mTaxesAmount;
        internal Decimal mItemsAmount;
        internal Decimal mServicesAmount;
        internal Decimal mExpensesAmount;
        internal Boolean mIsFromTrans;
        internal Int32 mBranchID;
        internal String mBranchName;
        internal Int32 mTransactionsCount;
        internal Int32 mD_ID;
        internal Int64 mD_ItemID;
        internal String mD_ItemName;
        internal Int64 mD_ServiceID;
        internal String mD_ServiceName;
        internal Decimal mD_Discount;
        internal Decimal mD_Total;
        internal Int32 mD_StoreID;
        internal Decimal mD_Price;
        internal String mD_StoreName;
        internal String mD_Notes;
        internal Decimal mD_Quantity;
        internal Decimal mD_UnitPrice;
        internal Int32 mD_CostCenterID;
        internal String mD_CostCenter;
        internal Decimal mD_RemainedQuantity;
        internal String mD_Type;
        internal Decimal mD_ItemQty;
        internal Int32 mD_UnitID;
        internal Decimal mD_UnitFactor;
        internal String mD_UnitName;
        internal Decimal mD_PartnerRemainedQty;
        internal Int64 mBarCode;
        internal Int32 mItemTypeID;
        internal Int64 mInvoiceID;
        internal Boolean mIsexempt;
        #endregion

        #region "Methods"
        public String InvoiceNo
        {
            get { return mInvoiceNo; }
            set { mInvoiceNo = value; }
        }
        public DateTime InvoiceDate
        {
            get { return mInvoiceDate; }
            set { mInvoiceDate = value; }
        }
        public Int32 QuotationID
        {
            get { return mQuotationID; }
            set { mQuotationID = value; }
        }
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mSupplierID = value; }
        }
        public String SupplierName
        {
            get { return mSupplierName; }
            set { mSupplierName = value; }
        }
        public Int32 PaymentTermID
        {
            get { return mPaymentTermID; }
            set { mPaymentTermID = value; }
        }
        public Int64 SupplyOrderID
        {
            get { return mSupplyOrderID; }
            set { mSupplyOrderID = value; }
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
        public String PurchasingOrderInfo
        {
            get { return mPurchasingOrderInfo; }
            set { mPurchasingOrderInfo = value; }
        }
        public String PurchasingSupplyInfo
        {
            get { return mPurchasingSupplyInfo; }
            set { mPurchasingSupplyInfo = value; }
        }
        public DateTime PurchasingOrderDate
        {
            get { return mPurchasingOrderDate; }
            set { mPurchasingOrderDate = value; }
        }
        public DateTime PurchasingSupplyDate
        {
            get { return mPurchasingSupplyDate; }
            set { mPurchasingSupplyDate = value; }
        }
        public Decimal TotalBeforTax
        {
            get { return mTotalBeforTax; }
            set { mTotalBeforTax = value; }
        }
        public Decimal TotalPrice
        {
            get { return mTotalPrice; }
            set { mTotalPrice = value; }
        }
        public Decimal Discount
        {
            get { return mDiscount; }
            set { mDiscount = value; }
        }
        public Decimal DiscountPercentage
        {
            get { return mDiscountPercentage; }
            set { mDiscountPercentage = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mDepartmentID = value; }
        }
        public Int32 SalesManID
        {
            get { return mSalesManID; }
            set { mSalesManID = value; }
        }
        public Int32 CostCenter_ID
        {
            get { return mCostCenter_ID; }
            set { mCostCenter_ID = value; }
        }
        public String InvCostCenter
        {
            get { return mInvCostCenter; }
            set { mInvCostCenter = value; }
        }
        public Int32 PaymentMethodID
        {
            get { return mPaymentMethodID; }
            set { mPaymentMethodID = value; }
        }
        public Int32 TransactionID
        {
            get { return mTransactionID; }
            set { mTransactionID = value; }
        }
        public String PaymentMethodName
        {
            get { return mPaymentMethodName; }
            set { mPaymentMethodName = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsApproved = value; }
        }
        public Boolean ISDiscountBeforeTax
        {
            get { return mISDiscountBeforeTax; }
            set { mISDiscountBeforeTax = value; }
        }
        public String InvoiceNoManual
        {
            get { return mInvoiceNoManual; }
            set { mInvoiceNoManual = value; }
        }
        public Int64 OrderID
        {
            get { return mOrderID; }
            set { mOrderID = value; }
        }
        public Int32 JVID
        {
            get { return mJVID; }
            set { mJVID = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public Boolean IsFixedDiscount
        {
            get { return mIsFixedDiscount; }
            set { mIsFixedDiscount = value; }
        }
        public Int32 EntitlementDays
        {
            get { return mEntitlementDays; }
            set { mEntitlementDays = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mExchangeRate = value; }
        }
        public Decimal LocalTotalBeforeTax
        {
            get { return mLocalTotalBeforeTax; }
            set { mLocalTotalBeforeTax = value; }
        }
        public Decimal LocalTotal
        {
            get { return mLocalTotal; }
            set { mLocalTotal = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public Decimal PaidAmount
        {
            get { return mPaidAmount; }
            set { mPaidAmount = value; }
        }
        public Decimal RemainAmount
        {
            get { return mRemainAmount; }
            set { mRemainAmount = value; }
        }
        public String SupplierInvoiceNo
        {
            get { return mSupplierInvoiceNo; }
            set { mSupplierInvoiceNo = value; }
        }
        public Decimal TaxesAmount
        {
            get { return mTaxesAmount; }
            set { mTaxesAmount = value; }
        }
        public Decimal ItemsAmount
        {
            get { return mItemsAmount; }
            set { mItemsAmount = value; }
        }
        public Decimal ServicesAmount
        {
            get { return mServicesAmount; }
            set { mServicesAmount = value; }
        }
        public Decimal ExpensesAmount
        {
            get { return mExpensesAmount; }
            set { mExpensesAmount = value; }
        }
        public Boolean IsFromTrans
        {
            get { return mIsFromTrans; }
            set { mIsFromTrans = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mBranchID = value; }
        }
        public String BranchName
        {
            get { return mBranchName; }
            set { mBranchName = value; }
        }
        public Int32 TransactionsCount
        {
            get { return mTransactionsCount; }
            set { mTransactionsCount = value; }
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
        public Decimal D_Discount
        {
            get { return mD_Discount; }
            set { mD_Discount = value; }
        }
        public Decimal D_Total
        {
            get { return mD_Total; }
            set { mD_Total = value; }
        }
        public Int32 D_StoreID
        {
            get { return mD_StoreID; }
            set { mD_StoreID = value; }
        }
        public Decimal D_Price
        {
            get { return mD_Price; }
            set { mD_Price = value; }
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
        public Decimal D_UnitPrice
        {
            get { return mD_UnitPrice; }
            set { mD_UnitPrice = value; }
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
        public Decimal D_RemainedQuantity
        {
            get { return mD_RemainedQuantity; }
            set { mD_RemainedQuantity = value; }
        }
        public String D_Type
        {
            get { return mD_Type; }
            set { mD_Type = value; }
        }
        public Decimal D_ItemQty
        {
            get { return mD_ItemQty; }
            set { mD_ItemQty = value; }
        }
        public Int32 D_UnitID
        {
            get { return mD_UnitID; }
            set { mD_UnitID = value; }
        }
        public Decimal D_UnitFactor
        {
            get { return mD_UnitFactor; }
            set { mD_UnitFactor = value; }
        }
        public String D_UnitName
        {
            get { return mD_UnitName; }
            set { mD_UnitName = value; }
        }
        public Decimal D_PartnerRemainedQty
        {
            get { return mD_PartnerRemainedQty; }
            set { mD_PartnerRemainedQty = value; }
        }
        public Int64 BarCode
        {
            get { return mBarCode; }
            set { mBarCode = value; }
        }
        public Int32 ItemTypeID
        {
            get { return mItemTypeID; }
            set { mItemTypeID = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mInvoiceID = value; }
        }
        public Boolean Isexempt
        {
            get { return mIsexempt; }
            set { mIsexempt = value; }
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

    public partial class CvwPS_InvoicesDetails
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
        public List<CVarvwPS_InvoicesDetails> lstCVarvwPS_InvoicesDetails = new List<CVarvwPS_InvoicesDetails>();
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
            lstCVarvwPS_InvoicesDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPS_InvoicesDetails";
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
                        CVarvwPS_InvoicesDetails ObjCVarvwPS_InvoicesDetails = new CVarvwPS_InvoicesDetails();
                        ObjCVarvwPS_InvoicesDetails.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mSupplyOrderID = Convert.ToInt64(dr["SupplyOrderID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPaymentTermCode = Convert.ToString(dr["PaymentTermCode"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPurchasingOrderInfo = Convert.ToString(dr["PurchasingOrderInfo"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPurchasingSupplyInfo = Convert.ToString(dr["PurchasingSupplyInfo"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPurchasingOrderDate = Convert.ToDateTime(dr["PurchasingOrderDate"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPurchasingSupplyDate = Convert.ToDateTime(dr["PurchasingSupplyDate"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mInvCostCenter = Convert.ToString(dr["InvCostCenter"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPaymentMethodName = Convert.ToString(dr["PaymentMethodName"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mOrderID = Convert.ToInt64(dr["OrderID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mIsFixedDiscount = Convert.ToBoolean(dr["IsFixedDiscount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mEntitlementDays = Convert.ToInt32(dr["EntitlementDays"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mSupplierInvoiceNo = Convert.ToString(dr["SupplierInvoiceNo"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mIsFromTrans = Convert.ToBoolean(dr["IsFromTrans"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mTransactionsCount = Convert.ToInt32(dr["TransactionsCount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_ID = Convert.ToInt32(dr["D_ID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_ItemID = Convert.ToInt64(dr["D_ItemID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_ItemName = Convert.ToString(dr["D_ItemName"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_ServiceID = Convert.ToInt64(dr["D_ServiceID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_ServiceName = Convert.ToString(dr["D_ServiceName"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_Discount = Convert.ToDecimal(dr["D_Discount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_Total = Convert.ToDecimal(dr["D_Total"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_StoreID = Convert.ToInt32(dr["D_StoreID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_Price = Convert.ToDecimal(dr["D_Price"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_StoreName = Convert.ToString(dr["D_StoreName"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_Notes = Convert.ToString(dr["D_Notes"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_Quantity = Convert.ToDecimal(dr["D_Quantity"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_UnitPrice = Convert.ToDecimal(dr["D_UnitPrice"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_CostCenterID = Convert.ToInt32(dr["D_CostCenterID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_CostCenter = Convert.ToString(dr["D_CostCenter"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_RemainedQuantity = Convert.ToDecimal(dr["D_RemainedQuantity"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_Type = Convert.ToString(dr["D_Type"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_ItemQty = Convert.ToDecimal(dr["D_ItemQty"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_UnitID = Convert.ToInt32(dr["D_UnitID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_UnitFactor = Convert.ToDecimal(dr["D_UnitFactor"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_UnitName = Convert.ToString(dr["D_UnitName"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_PartnerRemainedQty = Convert.ToDecimal(dr["D_PartnerRemainedQty"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mBarCode = Convert.ToInt64(dr["BarCode"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mItemTypeID = Convert.ToInt32(dr["ItemTypeID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mIsexempt = Convert.ToBoolean(dr["Isexempt"].ToString());
                        lstCVarvwPS_InvoicesDetails.Add(ObjCVarvwPS_InvoicesDetails);
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
            lstCVarvwPS_InvoicesDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPS_InvoicesDetails";
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
                        CVarvwPS_InvoicesDetails ObjCVarvwPS_InvoicesDetails = new CVarvwPS_InvoicesDetails();
                        ObjCVarvwPS_InvoicesDetails.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mSupplyOrderID = Convert.ToInt64(dr["SupplyOrderID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPaymentTermCode = Convert.ToString(dr["PaymentTermCode"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPurchasingOrderInfo = Convert.ToString(dr["PurchasingOrderInfo"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPurchasingSupplyInfo = Convert.ToString(dr["PurchasingSupplyInfo"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPurchasingOrderDate = Convert.ToDateTime(dr["PurchasingOrderDate"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPurchasingSupplyDate = Convert.ToDateTime(dr["PurchasingSupplyDate"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mInvCostCenter = Convert.ToString(dr["InvCostCenter"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPaymentMethodName = Convert.ToString(dr["PaymentMethodName"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mOrderID = Convert.ToInt64(dr["OrderID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mIsFixedDiscount = Convert.ToBoolean(dr["IsFixedDiscount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mEntitlementDays = Convert.ToInt32(dr["EntitlementDays"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mSupplierInvoiceNo = Convert.ToString(dr["SupplierInvoiceNo"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mIsFromTrans = Convert.ToBoolean(dr["IsFromTrans"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mTransactionsCount = Convert.ToInt32(dr["TransactionsCount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_ID = Convert.ToInt32(dr["D_ID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_ItemID = Convert.ToInt64(dr["D_ItemID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_ItemName = Convert.ToString(dr["D_ItemName"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_ServiceID = Convert.ToInt64(dr["D_ServiceID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_ServiceName = Convert.ToString(dr["D_ServiceName"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_Discount = Convert.ToDecimal(dr["D_Discount"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_Total = Convert.ToDecimal(dr["D_Total"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_StoreID = Convert.ToInt32(dr["D_StoreID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_Price = Convert.ToDecimal(dr["D_Price"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_StoreName = Convert.ToString(dr["D_StoreName"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_Notes = Convert.ToString(dr["D_Notes"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_Quantity = Convert.ToDecimal(dr["D_Quantity"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_UnitPrice = Convert.ToDecimal(dr["D_UnitPrice"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_CostCenterID = Convert.ToInt32(dr["D_CostCenterID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_CostCenter = Convert.ToString(dr["D_CostCenter"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_RemainedQuantity = Convert.ToDecimal(dr["D_RemainedQuantity"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_Type = Convert.ToString(dr["D_Type"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_ItemQty = Convert.ToDecimal(dr["D_ItemQty"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_UnitID = Convert.ToInt32(dr["D_UnitID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_UnitFactor = Convert.ToDecimal(dr["D_UnitFactor"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_UnitName = Convert.ToString(dr["D_UnitName"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mD_PartnerRemainedQty = Convert.ToDecimal(dr["D_PartnerRemainedQty"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mBarCode = Convert.ToInt64(dr["BarCode"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mItemTypeID = Convert.ToInt32(dr["ItemTypeID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvwPS_InvoicesDetails.mIsexempt = Convert.ToBoolean(dr["Isexempt"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPS_InvoicesDetails.Add(ObjCVarvwPS_InvoicesDetails);
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
