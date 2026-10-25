using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SL.SL_Transactions.Generated
{
    [Serializable]
    public class CPKvwSL_InvoicesDetails
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
    public partial class CVarvwSL_InvoicesDetails : CPKvwSL_InvoicesDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mInvoiceNo;
        internal DateTime mInvoiceDate;
        internal Int32 mQuotationID;
        internal Int32 mClientID;
        internal String mCustomerName;
        internal Int32 mCustomerCode;
        internal String mCustomerAccountName;
        internal Int32 mCustomerSubAccountID;
        internal String mCustomerSubAccountName;
        internal String mCustomerBankAccountNumber;
        internal String mCustomerPhones;
        internal String mCustomerAddress;
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
        internal String mPaymentMethodName;
        internal Boolean mIsApproved;
        internal Boolean mISDiscountBeforeTax;
        internal String mInvoiceNoManual;
        internal Int32 mOrderID;
        internal Int32 mJVID;
        internal Int32 mCurrencyID;
        internal Boolean mIsFromTrans;
        internal String mCurrencyCode;
        internal Decimal mExchangeRate;
        internal Decimal mLocalTotalBeforeTax;
        internal Decimal mLocalTotal;
        internal Boolean mIsDeleted;
        internal Decimal mPaidAmount;
        internal Decimal mRemainAmount;
        internal Decimal mTaxesAmount;
        internal Decimal mItemsAmount;
        internal Decimal mServicesAmount;
        internal Decimal mExpensesAmount;
        internal Int32 mTransactionsCount;
        internal Boolean mIsFixedDiscount;
        internal Int32 mTransactionID;
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
        internal String mD_Type;
        internal Decimal mD_RemainedQuantity;
        internal Decimal mD_ItemQty;
        internal Int32 mD_UnitID;
        internal String mD_UnitName;
        internal Decimal mAveragePrice;
        internal Decimal mD_UnitFactor;
        internal String mPrinted_ItemName;
        internal Decimal mPrinted_Price;
        internal Decimal mPrinted_Qty;
        internal String mPrinted_Unit;
        internal Int32 mRegionID;
        internal String mRegionName;
        internal String mSalesManName;
        internal String mInvoiceTypeCode;
        internal String mInvoiceTypeName;
        internal Decimal mD_PartnerRemainedQty;
        internal Decimal mD_ClientReturnedQty;
        internal Decimal mD_ClientReturnedAmount;
        internal Int32 mBranchID;
        internal String mBranchName;
        internal Decimal mD_ItemPriceListPrice;
        internal Decimal mD_TotalTaxAmount;
        internal Int64 mBarCode;
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
        public Int32 ClientID
        {
            get { return mClientID; }
            set { mClientID = value; }
        }
        public String CustomerName
        {
            get { return mCustomerName; }
            set { mCustomerName = value; }
        }
        public Int32 CustomerCode
        {
            get { return mCustomerCode; }
            set { mCustomerCode = value; }
        }
        public String CustomerAccountName
        {
            get { return mCustomerAccountName; }
            set { mCustomerAccountName = value; }
        }
        public Int32 CustomerSubAccountID
        {
            get { return mCustomerSubAccountID; }
            set { mCustomerSubAccountID = value; }
        }
        public String CustomerSubAccountName
        {
            get { return mCustomerSubAccountName; }
            set { mCustomerSubAccountName = value; }
        }
        public String CustomerBankAccountNumber
        {
            get { return mCustomerBankAccountNumber; }
            set { mCustomerBankAccountNumber = value; }
        }
        public String CustomerPhones
        {
            get { return mCustomerPhones; }
            set { mCustomerPhones = value; }
        }
        public String CustomerAddress
        {
            get { return mCustomerAddress; }
            set { mCustomerAddress = value; }
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
        public Int32 OrderID
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
        public Boolean IsFromTrans
        {
            get { return mIsFromTrans; }
            set { mIsFromTrans = value; }
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
        public Int32 TransactionsCount
        {
            get { return mTransactionsCount; }
            set { mTransactionsCount = value; }
        }
        public Boolean IsFixedDiscount
        {
            get { return mIsFixedDiscount; }
            set { mIsFixedDiscount = value; }
        }
        public Int32 TransactionID
        {
            get { return mTransactionID; }
            set { mTransactionID = value; }
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
        public String D_Type
        {
            get { return mD_Type; }
            set { mD_Type = value; }
        }
        public Decimal D_RemainedQuantity
        {
            get { return mD_RemainedQuantity; }
            set { mD_RemainedQuantity = value; }
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
        public String D_UnitName
        {
            get { return mD_UnitName; }
            set { mD_UnitName = value; }
        }
        public Decimal AveragePrice
        {
            get { return mAveragePrice; }
            set { mAveragePrice = value; }
        }
        public Decimal D_UnitFactor
        {
            get { return mD_UnitFactor; }
            set { mD_UnitFactor = value; }
        }
        public String Printed_ItemName
        {
            get { return mPrinted_ItemName; }
            set { mPrinted_ItemName = value; }
        }
        public Decimal Printed_Price
        {
            get { return mPrinted_Price; }
            set { mPrinted_Price = value; }
        }
        public Decimal Printed_Qty
        {
            get { return mPrinted_Qty; }
            set { mPrinted_Qty = value; }
        }
        public String Printed_Unit
        {
            get { return mPrinted_Unit; }
            set { mPrinted_Unit = value; }
        }
        public Int32 RegionID
        {
            get { return mRegionID; }
            set { mRegionID = value; }
        }
        public String RegionName
        {
            get { return mRegionName; }
            set { mRegionName = value; }
        }
        public String SalesManName
        {
            get { return mSalesManName; }
            set { mSalesManName = value; }
        }
        public String InvoiceTypeCode
        {
            get { return mInvoiceTypeCode; }
            set { mInvoiceTypeCode = value; }
        }
        public String InvoiceTypeName
        {
            get { return mInvoiceTypeName; }
            set { mInvoiceTypeName = value; }
        }
        public Decimal D_PartnerRemainedQty
        {
            get { return mD_PartnerRemainedQty; }
            set { mD_PartnerRemainedQty = value; }
        }
        public Decimal D_ClientReturnedQty
        {
            get { return mD_ClientReturnedQty; }
            set { mD_ClientReturnedQty = value; }
        }
        public Decimal D_ClientReturnedAmount
        {
            get { return mD_ClientReturnedAmount; }
            set { mD_ClientReturnedAmount = value; }
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
        public Decimal D_ItemPriceListPrice
        {
            get { return mD_ItemPriceListPrice; }
            set { mD_ItemPriceListPrice = value; }
        }
        public Decimal D_TotalTaxAmount
        {
            get { return mD_TotalTaxAmount; }
            set { mD_TotalTaxAmount = value; }
        }
        public Int64 BarCode
        {
            get { return mBarCode; }
            set { mBarCode = value; }
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

    public partial class CvwSL_InvoicesDetails
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
        public List<CVarvwSL_InvoicesDetails> lstCVarvwSL_InvoicesDetails = new List<CVarvwSL_InvoicesDetails>();
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
            lstCVarvwSL_InvoicesDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSL_InvoicesDetails";
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
                        CVarvwSL_InvoicesDetails ObjCVarvwSL_InvoicesDetails = new CVarvwSL_InvoicesDetails();
                        ObjCVarvwSL_InvoicesDetails.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCustomerCode = Convert.ToInt32(dr["CustomerCode"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCustomerAccountName = Convert.ToString(dr["CustomerAccountName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCustomerSubAccountID = Convert.ToInt32(dr["CustomerSubAccountID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCustomerSubAccountName = Convert.ToString(dr["CustomerSubAccountName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCustomerBankAccountNumber = Convert.ToString(dr["CustomerBankAccountNumber"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCustomerPhones = Convert.ToString(dr["CustomerPhones"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCustomerAddress = Convert.ToString(dr["CustomerAddress"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mInvCostCenter = Convert.ToString(dr["InvCostCenter"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mPaymentMethodName = Convert.ToString(dr["PaymentMethodName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mOrderID = Convert.ToInt32(dr["OrderID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mIsFromTrans = Convert.ToBoolean(dr["IsFromTrans"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mTransactionsCount = Convert.ToInt32(dr["TransactionsCount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mIsFixedDiscount = Convert.ToBoolean(dr["IsFixedDiscount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_ID = Convert.ToInt32(dr["D_ID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_ItemID = Convert.ToInt64(dr["D_ItemID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_ItemName = Convert.ToString(dr["D_ItemName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_ServiceID = Convert.ToInt64(dr["D_ServiceID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_ServiceName = Convert.ToString(dr["D_ServiceName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_Discount = Convert.ToDecimal(dr["D_Discount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_Total = Convert.ToDecimal(dr["D_Total"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_StoreID = Convert.ToInt32(dr["D_StoreID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_Price = Convert.ToDecimal(dr["D_Price"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_StoreName = Convert.ToString(dr["D_StoreName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_Notes = Convert.ToString(dr["D_Notes"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_Quantity = Convert.ToDecimal(dr["D_Quantity"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_UnitPrice = Convert.ToDecimal(dr["D_UnitPrice"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_CostCenterID = Convert.ToInt32(dr["D_CostCenterID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_CostCenter = Convert.ToString(dr["D_CostCenter"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_Type = Convert.ToString(dr["D_Type"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_RemainedQuantity = Convert.ToDecimal(dr["D_RemainedQuantity"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_ItemQty = Convert.ToDecimal(dr["D_ItemQty"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_UnitID = Convert.ToInt32(dr["D_UnitID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_UnitName = Convert.ToString(dr["D_UnitName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mAveragePrice = Convert.ToDecimal(dr["AveragePrice"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_UnitFactor = Convert.ToDecimal(dr["D_UnitFactor"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mPrinted_ItemName = Convert.ToString(dr["Printed_ItemName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mPrinted_Price = Convert.ToDecimal(dr["Printed_Price"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mPrinted_Qty = Convert.ToDecimal(dr["Printed_Qty"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mPrinted_Unit = Convert.ToString(dr["Printed_Unit"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mRegionID = Convert.ToInt32(dr["RegionID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mRegionName = Convert.ToString(dr["RegionName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mSalesManName = Convert.ToString(dr["SalesManName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mInvoiceTypeCode = Convert.ToString(dr["InvoiceTypeCode"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_PartnerRemainedQty = Convert.ToDecimal(dr["D_PartnerRemainedQty"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_ClientReturnedQty = Convert.ToDecimal(dr["D_ClientReturnedQty"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_ClientReturnedAmount = Convert.ToDecimal(dr["D_ClientReturnedAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_ItemPriceListPrice = Convert.ToDecimal(dr["D_ItemPriceListPrice"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_TotalTaxAmount = Convert.ToDecimal(dr["D_TotalTaxAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mBarCode = Convert.ToInt64(dr["BarCode"].ToString());
                        lstCVarvwSL_InvoicesDetails.Add(ObjCVarvwSL_InvoicesDetails);
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
            lstCVarvwSL_InvoicesDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSL_InvoicesDetails";
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
                        CVarvwSL_InvoicesDetails ObjCVarvwSL_InvoicesDetails = new CVarvwSL_InvoicesDetails();
                        ObjCVarvwSL_InvoicesDetails.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mQuotationID = Convert.ToInt32(dr["QuotationID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCustomerCode = Convert.ToInt32(dr["CustomerCode"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCustomerAccountName = Convert.ToString(dr["CustomerAccountName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCustomerSubAccountID = Convert.ToInt32(dr["CustomerSubAccountID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCustomerSubAccountName = Convert.ToString(dr["CustomerSubAccountName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCustomerBankAccountNumber = Convert.ToString(dr["CustomerBankAccountNumber"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCustomerPhones = Convert.ToString(dr["CustomerPhones"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCustomerAddress = Convert.ToString(dr["CustomerAddress"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mInvCostCenter = Convert.ToString(dr["InvCostCenter"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mPaymentMethodID = Convert.ToInt32(dr["PaymentMethodID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mPaymentMethodName = Convert.ToString(dr["PaymentMethodName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mInvoiceNoManual = Convert.ToString(dr["InvoiceNoManual"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mOrderID = Convert.ToInt32(dr["OrderID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mIsFromTrans = Convert.ToBoolean(dr["IsFromTrans"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mLocalTotalBeforeTax = Convert.ToDecimal(dr["LocalTotalBeforeTax"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mLocalTotal = Convert.ToDecimal(dr["LocalTotal"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mTransactionsCount = Convert.ToInt32(dr["TransactionsCount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mIsFixedDiscount = Convert.ToBoolean(dr["IsFixedDiscount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_ID = Convert.ToInt32(dr["D_ID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_ItemID = Convert.ToInt64(dr["D_ItemID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_ItemName = Convert.ToString(dr["D_ItemName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_ServiceID = Convert.ToInt64(dr["D_ServiceID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_ServiceName = Convert.ToString(dr["D_ServiceName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_Discount = Convert.ToDecimal(dr["D_Discount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_Total = Convert.ToDecimal(dr["D_Total"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_StoreID = Convert.ToInt32(dr["D_StoreID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_Price = Convert.ToDecimal(dr["D_Price"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_StoreName = Convert.ToString(dr["D_StoreName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_Notes = Convert.ToString(dr["D_Notes"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_Quantity = Convert.ToDecimal(dr["D_Quantity"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_UnitPrice = Convert.ToDecimal(dr["D_UnitPrice"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_CostCenterID = Convert.ToInt32(dr["D_CostCenterID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_CostCenter = Convert.ToString(dr["D_CostCenter"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_Type = Convert.ToString(dr["D_Type"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_RemainedQuantity = Convert.ToDecimal(dr["D_RemainedQuantity"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_ItemQty = Convert.ToDecimal(dr["D_ItemQty"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_UnitID = Convert.ToInt32(dr["D_UnitID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_UnitName = Convert.ToString(dr["D_UnitName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mAveragePrice = Convert.ToDecimal(dr["AveragePrice"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_UnitFactor = Convert.ToDecimal(dr["D_UnitFactor"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mPrinted_ItemName = Convert.ToString(dr["Printed_ItemName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mPrinted_Price = Convert.ToDecimal(dr["Printed_Price"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mPrinted_Qty = Convert.ToDecimal(dr["Printed_Qty"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mPrinted_Unit = Convert.ToString(dr["Printed_Unit"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mRegionID = Convert.ToInt32(dr["RegionID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mRegionName = Convert.ToString(dr["RegionName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mSalesManName = Convert.ToString(dr["SalesManName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mInvoiceTypeCode = Convert.ToString(dr["InvoiceTypeCode"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_PartnerRemainedQty = Convert.ToDecimal(dr["D_PartnerRemainedQty"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_ClientReturnedQty = Convert.ToDecimal(dr["D_ClientReturnedQty"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_ClientReturnedAmount = Convert.ToDecimal(dr["D_ClientReturnedAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_ItemPriceListPrice = Convert.ToDecimal(dr["D_ItemPriceListPrice"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mD_TotalTaxAmount = Convert.ToDecimal(dr["D_TotalTaxAmount"].ToString());
                        ObjCVarvwSL_InvoicesDetails.mBarCode = Convert.ToInt64(dr["BarCode"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSL_InvoicesDetails.Add(ObjCVarvwSL_InvoicesDetails);
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
