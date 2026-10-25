using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKPayablesTAX
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
    public partial class CVarPayablesTAX : CPKPayablesTAX
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationID;
        internal Int32 mChargeTypeID;
        internal Int32 mPOrC;
        internal Int64 mSupplierOperationPartnerID;
        internal Int32 mContainerTypeID;
        internal Int32 mMeasurementID;
        internal Decimal mQuantity;
        internal Decimal mCostPrice;
        internal Decimal mAmountWithoutVAT;
        internal Int32 mTaxTypeID;
        internal Decimal mTaxPercentage;
        internal Decimal mTaxAmount;
        internal Int32 mDiscountTypeID;
        internal Decimal mDiscountPercentage;
        internal Decimal mDiscountAmount;
        internal Decimal mCostAmount;
        internal Decimal mPaidAmount;
        internal Decimal mRemainingAmount;
        internal Decimal mInitialSalePrice;
        internal String mSupplierInvoiceNo;
        internal DateTime mEntryDate;
        internal Decimal mExchangeRate;
        internal Int32 mCurrencyID;
        internal Int64 mGeneratingQRID;
        internal String mNotes;
        internal Int32 mCustodyID;
        internal String mSupplierReceiptNo;
        internal Int64 mAccNoteID;
        internal Boolean mIsDeleted;
        internal Boolean mIsApproved;
        internal Int32 mApprovingUserID;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int64 mJVID;
        internal Int64 mBillTo;
        internal Int64 mReceivableID;
        internal DateTime mIssueDate;
        internal Int64 mOperationContainersAndPackagesID;
        internal Int64 mBillID;
        internal Int32 mTransactionID;
        internal Decimal mQuotationCost;
        internal Int64 mJVID2;
        internal Boolean mIsNeglectLimit;
        internal Int64 mPricingID;
        internal Int32 mSupplierSiteID;
        internal Boolean mIsPrinted;
        internal Int64 mOperationVehicleID;
        internal Int64 mTruckingOrderID;
        internal Decimal mOfficialAmountPaid;
        #endregion

        #region "Methods"
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public Int32 ChargeTypeID
        {
            get { return mChargeTypeID; }
            set { mIsChanges = true; mChargeTypeID = value; }
        }
        public Int32 POrC
        {
            get { return mPOrC; }
            set { mIsChanges = true; mPOrC = value; }
        }
        public Int64 SupplierOperationPartnerID
        {
            get { return mSupplierOperationPartnerID; }
            set { mIsChanges = true; mSupplierOperationPartnerID = value; }
        }
        public Int32 ContainerTypeID
        {
            get { return mContainerTypeID; }
            set { mIsChanges = true; mContainerTypeID = value; }
        }
        public Int32 MeasurementID
        {
            get { return mMeasurementID; }
            set { mIsChanges = true; mMeasurementID = value; }
        }
        public Decimal Quantity
        {
            get { return mQuantity; }
            set { mIsChanges = true; mQuantity = value; }
        }
        public Decimal CostPrice
        {
            get { return mCostPrice; }
            set { mIsChanges = true; mCostPrice = value; }
        }
        public Decimal AmountWithoutVAT
        {
            get { return mAmountWithoutVAT; }
            set { mIsChanges = true; mAmountWithoutVAT = value; }
        }
        public Int32 TaxTypeID
        {
            get { return mTaxTypeID; }
            set { mIsChanges = true; mTaxTypeID = value; }
        }
        public Decimal TaxPercentage
        {
            get { return mTaxPercentage; }
            set { mIsChanges = true; mTaxPercentage = value; }
        }
        public Decimal TaxAmount
        {
            get { return mTaxAmount; }
            set { mIsChanges = true; mTaxAmount = value; }
        }
        public Int32 DiscountTypeID
        {
            get { return mDiscountTypeID; }
            set { mIsChanges = true; mDiscountTypeID = value; }
        }
        public Decimal DiscountPercentage
        {
            get { return mDiscountPercentage; }
            set { mIsChanges = true; mDiscountPercentage = value; }
        }
        public Decimal DiscountAmount
        {
            get { return mDiscountAmount; }
            set { mIsChanges = true; mDiscountAmount = value; }
        }
        public Decimal CostAmount
        {
            get { return mCostAmount; }
            set { mIsChanges = true; mCostAmount = value; }
        }
        public Decimal PaidAmount
        {
            get { return mPaidAmount; }
            set { mIsChanges = true; mPaidAmount = value; }
        }
        public Decimal RemainingAmount
        {
            get { return mRemainingAmount; }
            set { mIsChanges = true; mRemainingAmount = value; }
        }
        public Decimal InitialSalePrice
        {
            get { return mInitialSalePrice; }
            set { mIsChanges = true; mInitialSalePrice = value; }
        }
        public String SupplierInvoiceNo
        {
            get { return mSupplierInvoiceNo; }
            set { mIsChanges = true; mSupplierInvoiceNo = value; }
        }
        public DateTime EntryDate
        {
            get { return mEntryDate; }
            set { mIsChanges = true; mEntryDate = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mIsChanges = true; mExchangeRate = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public Int64 GeneratingQRID
        {
            get { return mGeneratingQRID; }
            set { mIsChanges = true; mGeneratingQRID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int32 CustodyID
        {
            get { return mCustodyID; }
            set { mIsChanges = true; mCustodyID = value; }
        }
        public String SupplierReceiptNo
        {
            get { return mSupplierReceiptNo; }
            set { mIsChanges = true; mSupplierReceiptNo = value; }
        }
        public Int64 AccNoteID
        {
            get { return mAccNoteID; }
            set { mIsChanges = true; mAccNoteID = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsChanges = true; mIsApproved = value; }
        }
        public Int32 ApprovingUserID
        {
            get { return mApprovingUserID; }
            set { mIsChanges = true; mApprovingUserID = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mIsChanges = true; mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mIsChanges = true; mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mIsChanges = true; mModificationDate = value; }
        }
        public Int64 JVID
        {
            get { return mJVID; }
            set { mIsChanges = true; mJVID = value; }
        }
        public Int64 BillTo
        {
            get { return mBillTo; }
            set { mIsChanges = true; mBillTo = value; }
        }
        public Int64 ReceivableID
        {
            get { return mReceivableID; }
            set { mIsChanges = true; mReceivableID = value; }
        }
        public DateTime IssueDate
        {
            get { return mIssueDate; }
            set { mIsChanges = true; mIssueDate = value; }
        }
        public Int64 OperationContainersAndPackagesID
        {
            get { return mOperationContainersAndPackagesID; }
            set { mIsChanges = true; mOperationContainersAndPackagesID = value; }
        }
        public Int64 BillID
        {
            get { return mBillID; }
            set { mIsChanges = true; mBillID = value; }
        }
        public Int32 TransactionID
        {
            get { return mTransactionID; }
            set { mIsChanges = true; mTransactionID = value; }
        }
        public Decimal QuotationCost
        {
            get { return mQuotationCost; }
            set { mIsChanges = true; mQuotationCost = value; }
        }
        public Int64 JVID2
        {
            get { return mJVID2; }
            set { mIsChanges = true; mJVID2 = value; }
        }
        public Boolean IsNeglectLimit
        {
            get { return mIsNeglectLimit; }
            set { mIsChanges = true; mIsNeglectLimit = value; }
        }
        public Int64 PricingID
        {
            get { return mPricingID; }
            set { mIsChanges = true; mPricingID = value; }
        }
        public Int32 SupplierSiteID
        {
            get { return mSupplierSiteID; }
            set { mIsChanges = true; mSupplierSiteID = value; }
        }
        public Boolean IsPrinted
        {
            get { return mIsPrinted; }
            set { mIsChanges = true; mIsPrinted = value; }
        }
        public Int64 OperationVehicleID
        {
            get { return mOperationVehicleID; }
            set { mIsChanges = true; mOperationVehicleID = value; }
        }
        public Int64 TruckingOrderID
        {
            get { return mTruckingOrderID; }
            set { mIsChanges = true; mTruckingOrderID = value; }
        }
        public Decimal OfficialAmountPaid
        {
            get { return mOfficialAmountPaid; }
            set { mIsChanges = true; mOfficialAmountPaid = value; }
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

    public partial class CPayablesTAX
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
        public List<CVarPayablesTAX> lstCVarPayables = new List<CVarPayablesTAX>();
        public List<CPKPayablesTAX> lstDeletedCPKPayables = new List<CPKPayablesTAX>();
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
        public Exception GetItem(Int64 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarPayables.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPayablesTax";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPayablesTax";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                    Com.Parameters[0].Value = Convert.ToInt64(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarPayablesTAX ObjCVarPayables = new CVarPayablesTAX();
                        ObjCVarPayables.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPayables.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarPayables.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarPayables.mPOrC = Convert.ToInt32(dr["POrC"].ToString());
                        ObjCVarPayables.mSupplierOperationPartnerID = Convert.ToInt64(dr["SupplierOperationPartnerID"].ToString());
                        ObjCVarPayables.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarPayables.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        ObjCVarPayables.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
                        ObjCVarPayables.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarPayables.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarPayables.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarPayables.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarPayables.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarPayables.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarPayables.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarPayables.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarPayables.mCostAmount = Convert.ToDecimal(dr["CostAmount"].ToString());
                        ObjCVarPayables.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarPayables.mRemainingAmount = Convert.ToDecimal(dr["RemainingAmount"].ToString());
                        ObjCVarPayables.mInitialSalePrice = Convert.ToDecimal(dr["InitialSalePrice"].ToString());
                        ObjCVarPayables.mSupplierInvoiceNo = Convert.ToString(dr["SupplierInvoiceNo"].ToString());
                        ObjCVarPayables.mEntryDate = Convert.ToDateTime(dr["EntryDate"].ToString());
                        ObjCVarPayables.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarPayables.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPayables.mGeneratingQRID = Convert.ToInt64(dr["GeneratingQRID"].ToString());
                        ObjCVarPayables.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPayables.mCustodyID = Convert.ToInt32(dr["CustodyID"].ToString());
                        ObjCVarPayables.mSupplierReceiptNo = Convert.ToString(dr["SupplierReceiptNo"].ToString());
                        ObjCVarPayables.mAccNoteID = Convert.ToInt64(dr["AccNoteID"].ToString());
                        ObjCVarPayables.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarPayables.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPayables.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarPayables.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarPayables.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarPayables.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarPayables.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarPayables.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarPayables.mBillTo = Convert.ToInt64(dr["BillTo"].ToString());
                        ObjCVarPayables.mReceivableID = Convert.ToInt64(dr["ReceivableID"].ToString());
                        ObjCVarPayables.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarPayables.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarPayables.mBillID = Convert.ToInt64(dr["BillID"].ToString());
                        ObjCVarPayables.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarPayables.mQuotationCost = Convert.ToDecimal(dr["QuotationCost"].ToString());
                        ObjCVarPayables.mJVID2 = Convert.ToInt64(dr["JVID2"].ToString());
                        ObjCVarPayables.mIsNeglectLimit = Convert.ToBoolean(dr["IsNeglectLimit"].ToString());
                        ObjCVarPayables.mPricingID = Convert.ToInt64(dr["PricingID"].ToString());
                        ObjCVarPayables.mSupplierSiteID = Convert.ToInt32(dr["SupplierSiteID"].ToString());
                        ObjCVarPayables.mIsPrinted = Convert.ToBoolean(dr["IsPrinted"].ToString());
                       // ObjCVarPayables.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        //ObjCVarPayables.mTruckingOrderID = Convert.ToInt64(dr["TruckingOrderID"].ToString());
                       // ObjCVarPayables.mOfficialAmountPaid = Convert.ToDecimal(dr["OfficialAmountPaid"].ToString());
                        lstCVarPayables.Add(ObjCVarPayables);
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
            lstCVarPayables.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPayablesTax";
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
                        CVarPayablesTAX ObjCVarPayables = new CVarPayablesTAX();
                        ObjCVarPayables.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPayables.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarPayables.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarPayables.mPOrC = Convert.ToInt32(dr["POrC"].ToString());
                        ObjCVarPayables.mSupplierOperationPartnerID = Convert.ToInt64(dr["SupplierOperationPartnerID"].ToString());
                        ObjCVarPayables.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarPayables.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        ObjCVarPayables.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
                        ObjCVarPayables.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarPayables.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarPayables.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarPayables.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarPayables.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarPayables.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarPayables.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarPayables.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarPayables.mCostAmount = Convert.ToDecimal(dr["CostAmount"].ToString());
                        ObjCVarPayables.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarPayables.mRemainingAmount = Convert.ToDecimal(dr["RemainingAmount"].ToString());
                        ObjCVarPayables.mInitialSalePrice = Convert.ToDecimal(dr["InitialSalePrice"].ToString());
                        ObjCVarPayables.mSupplierInvoiceNo = Convert.ToString(dr["SupplierInvoiceNo"].ToString());
                        ObjCVarPayables.mEntryDate = Convert.ToDateTime(dr["EntryDate"].ToString());
                        ObjCVarPayables.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarPayables.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPayables.mGeneratingQRID = Convert.ToInt64(dr["GeneratingQRID"].ToString());
                        ObjCVarPayables.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPayables.mCustodyID = Convert.ToInt32(dr["CustodyID"].ToString());
                        ObjCVarPayables.mSupplierReceiptNo = Convert.ToString(dr["SupplierReceiptNo"].ToString());
                        ObjCVarPayables.mAccNoteID = Convert.ToInt64(dr["AccNoteID"].ToString());
                        ObjCVarPayables.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarPayables.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPayables.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarPayables.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarPayables.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarPayables.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarPayables.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarPayables.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarPayables.mBillTo = Convert.ToInt64(dr["BillTo"].ToString());
                        ObjCVarPayables.mReceivableID = Convert.ToInt64(dr["ReceivableID"].ToString());
                        ObjCVarPayables.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarPayables.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarPayables.mBillID = Convert.ToInt64(dr["BillID"].ToString());
                        ObjCVarPayables.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarPayables.mQuotationCost = Convert.ToDecimal(dr["QuotationCost"].ToString());
                        ObjCVarPayables.mJVID2 = Convert.ToInt64(dr["JVID2"].ToString());
                        ObjCVarPayables.mIsNeglectLimit = Convert.ToBoolean(dr["IsNeglectLimit"].ToString());
                        ObjCVarPayables.mPricingID = Convert.ToInt64(dr["PricingID"].ToString());
                        ObjCVarPayables.mSupplierSiteID = Convert.ToInt32(dr["SupplierSiteID"].ToString());
                        ObjCVarPayables.mIsPrinted = Convert.ToBoolean(dr["IsPrinted"].ToString());
                        ObjCVarPayables.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarPayables.mTruckingOrderID = Convert.ToInt64(dr["TruckingOrderID"].ToString());
                        ObjCVarPayables.mOfficialAmountPaid = Convert.ToDecimal(dr["OfficialAmountPaid"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPayables.Add(ObjCVarPayables);
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
        #region "Common Methods"
        private void BeginTrans(SqlCommand Com, SqlConnection Con)
        {

            tr = Con.BeginTransaction(IsolationLevel.Serializable);
            Com.CommandType = CommandType.StoredProcedure;
        }

        private void EndTrans(SqlCommand Com, SqlConnection Con)
        {

            Com.Transaction = tr;
            Com.Connection = Con;
            Com.ExecuteNonQuery();
            tr.Commit();
        }

        #endregion
        #region "Set List Method"
        private Exception SetList(string WhereClause, Boolean IsDelete)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListPayables";
                else
                    Com.CommandText = "[dbo].UpdateListPayablesTax";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                BeginTrans(Com, Con);
                Com.Parameters[0].Value = WhereClause;
                EndTrans(Com, Con);
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
        #region "Delete Methods"
        public Exception DeleteItem(List<CPKPayablesTAX> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPayables";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKPayablesTAX ObjCPKPayables in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKPayables.ID);
                    EndTrans(Com, Con);
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                Con.Close();
                Con.Dispose();
                DeleteList.Clear();
            }
            return Exp;
        }

        public Exception DeleteList(string WhereClause)
        {

            return SetList(WhereClause, true);
        }

        #endregion
        #region "Save Methods"
        public Exception SaveMethod(List<CVarPayablesTAX> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ChargeTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@POrC", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SupplierOperationPartnerID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ContainerTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@MeasurementID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Quantity", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CostPrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@AmountWithoutVAT", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TaxTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TaxPercentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TaxAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DiscountTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DiscountPercentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DiscountAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CostAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@PaidAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@RemainingAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@InitialSalePrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@SupplierInvoiceNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@EntryDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@GeneratingQRID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CustodyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SupplierReceiptNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AccNoteID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ApprovingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@JVID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@BillTo", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ReceivableID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@IssueDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@OperationContainersAndPackagesID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@BillID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@TransactionID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@QuotationCost", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@JVID2", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@IsNeglectLimit", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@PricingID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@SupplierSiteID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsPrinted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@OperationVehicleID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@TruckingOrderID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@OfficialAmountPaid", SqlDbType.Decimal));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPayablesTAX ObjCVarPayables in SaveList)
                {
                    if (ObjCVarPayables.mIsChanges == true)
                    {
                        if (ObjCVarPayables.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPayablesTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPayables.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPayablesTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPayables.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPayables.ID;
                        }
                        Com.Parameters["@OperationID"].Value = ObjCVarPayables.OperationID;
                        Com.Parameters["@ChargeTypeID"].Value = ObjCVarPayables.ChargeTypeID;
                        Com.Parameters["@POrC"].Value = ObjCVarPayables.POrC;
                        Com.Parameters["@SupplierOperationPartnerID"].Value = ObjCVarPayables.SupplierOperationPartnerID;
                        Com.Parameters["@ContainerTypeID"].Value = ObjCVarPayables.ContainerTypeID;
                        Com.Parameters["@MeasurementID"].Value = ObjCVarPayables.MeasurementID;
                        Com.Parameters["@Quantity"].Value = ObjCVarPayables.Quantity;
                        Com.Parameters["@CostPrice"].Value = ObjCVarPayables.CostPrice;
                        Com.Parameters["@AmountWithoutVAT"].Value = ObjCVarPayables.AmountWithoutVAT;
                        Com.Parameters["@TaxTypeID"].Value = ObjCVarPayables.TaxTypeID;
                        Com.Parameters["@TaxPercentage"].Value = ObjCVarPayables.TaxPercentage;
                        Com.Parameters["@TaxAmount"].Value = ObjCVarPayables.TaxAmount;
                        Com.Parameters["@DiscountTypeID"].Value = ObjCVarPayables.DiscountTypeID;
                        Com.Parameters["@DiscountPercentage"].Value = ObjCVarPayables.DiscountPercentage;
                        Com.Parameters["@DiscountAmount"].Value = ObjCVarPayables.DiscountAmount;
                        Com.Parameters["@CostAmount"].Value = ObjCVarPayables.CostAmount;
                        Com.Parameters["@PaidAmount"].Value = ObjCVarPayables.PaidAmount;
                        Com.Parameters["@RemainingAmount"].Value = ObjCVarPayables.RemainingAmount;
                        Com.Parameters["@InitialSalePrice"].Value = ObjCVarPayables.InitialSalePrice;
                        Com.Parameters["@SupplierInvoiceNo"].Value = ObjCVarPayables.SupplierInvoiceNo;
                        Com.Parameters["@EntryDate"].Value = ObjCVarPayables.EntryDate;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarPayables.ExchangeRate;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarPayables.CurrencyID;
                        Com.Parameters["@GeneratingQRID"].Value = ObjCVarPayables.GeneratingQRID;
                        Com.Parameters["@Notes"].Value = ObjCVarPayables.Notes;
                        Com.Parameters["@CustodyID"].Value = ObjCVarPayables.CustodyID;
                        Com.Parameters["@SupplierReceiptNo"].Value = ObjCVarPayables.SupplierReceiptNo;
                        Com.Parameters["@AccNoteID"].Value = ObjCVarPayables.AccNoteID;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarPayables.IsDeleted;
                        Com.Parameters["@IsApproved"].Value = ObjCVarPayables.IsApproved;
                        Com.Parameters["@ApprovingUserID"].Value = ObjCVarPayables.ApprovingUserID;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarPayables.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarPayables.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarPayables.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarPayables.ModificationDate;
                        Com.Parameters["@JVID"].Value = ObjCVarPayables.JVID;
                        Com.Parameters["@BillTo"].Value = ObjCVarPayables.BillTo;
                        Com.Parameters["@ReceivableID"].Value = ObjCVarPayables.ReceivableID;
                        Com.Parameters["@IssueDate"].Value = ObjCVarPayables.IssueDate;
                        Com.Parameters["@OperationContainersAndPackagesID"].Value = ObjCVarPayables.OperationContainersAndPackagesID;
                        Com.Parameters["@BillID"].Value = ObjCVarPayables.BillID;
                        Com.Parameters["@TransactionID"].Value = ObjCVarPayables.TransactionID;
                        Com.Parameters["@QuotationCost"].Value = ObjCVarPayables.QuotationCost;
                        Com.Parameters["@JVID2"].Value = ObjCVarPayables.JVID2;
                        Com.Parameters["@IsNeglectLimit"].Value = ObjCVarPayables.IsNeglectLimit;
                        Com.Parameters["@PricingID"].Value = ObjCVarPayables.PricingID;
                        Com.Parameters["@SupplierSiteID"].Value = ObjCVarPayables.SupplierSiteID;
                        Com.Parameters["@IsPrinted"].Value = ObjCVarPayables.IsPrinted;
                        Com.Parameters["@OperationVehicleID"].Value = ObjCVarPayables.OperationVehicleID;
                        Com.Parameters["@TruckingOrderID"].Value = ObjCVarPayables.TruckingOrderID;
                        Com.Parameters["@OfficialAmountPaid"].Value = ObjCVarPayables.OfficialAmountPaid;
                        EndTrans(Com, Con);
                        if (ObjCVarPayables.ID == 0)
                        {
                            ObjCVarPayables.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPayables.mIsChanges = false;
                    }
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
                if (tr != null)
                    tr.Rollback();
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return Exp;
        }
        #endregion
        #region "Update Methods"
        public Exception UpdateList(string UpdateClause)
        {

            return SetList(UpdateClause, false);
        }

        #endregion
    }
}
