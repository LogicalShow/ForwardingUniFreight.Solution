using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ContainerFreightStation.Transactions
{
    [Serializable]
    public partial class CVarvwWH_CFS_Invoices
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Int64 mInvoiceNumber;
        internal Int32 mInvoiceTypeID;
        internal String mInvoiceTypeCode;
        internal String mInvoiceTypeName;
        internal String mConcatenatedInvoiceNumber;
        internal String mCode;
        internal Int64 mOperationID;
        internal String mOperationCode;
        internal String mOperationCodeWithoutDashes;
        internal String mMasterBL;
        internal String mHouseNumber;
        internal Int32 mTransportType;
        internal Int32 mOperationStageID;
        internal String mOperationNotes;
        internal DateTime mOperationCloseDate;
        internal Boolean mIsOperationClosed;
        internal Int32 mBranchID;
        internal String mBranchName;
        internal Int32 mDirectionType;
        internal Int32 mBLType;
        internal String mPOLCode;
        internal String mPOLName;
        internal String mPODCountryName;
        internal String mPODCode;
        internal String mPODName;
        internal String mPODCountryCode;
        internal Int64 mMasterOperationID;
        internal String mMasterOperationCode;
        internal Int64 mOperationPartnerID;
        internal Int32 mPartnerTypeID;
        internal String mPartnerTypeCode;
        internal String mGeneralPartnerTypeCode;
        internal Int32 mPartnerID;
        internal String mPartnerName;
        internal String mPartnerLocalName;
        internal Boolean mIsInactive;
        internal String mVATNumber;
        internal String mInvoiceStatus;
        internal Int64 mAddressID;
        internal Int32 mCityID;
        internal String mCityName;
        internal Int32 mCountryID;
        internal String mCountryName;
        internal String mStreetLine1;
        internal String mStreetLine2;
        internal Int32 mAddressTypeID;
        internal String mAddressTypeName;
        internal String mPrintedAddress;
        internal String mCustomerReference;
        internal String mSupplierReference;
        internal Int32 mPaymentTermID;
        internal String mPaymentTermCode;
        internal String mPaymentTermName;
        internal Int32 mCurrencyID;
        internal String mCurrencyCode;
        internal Decimal mMasterDataExchangeRate;
        internal Decimal mExchangeRate;
        internal Decimal mAmountWithoutVAT;
        internal Int32 mTaxTypeID;
        internal String mTaxTypeName;
        internal Decimal mTaxPercentage;
        internal Decimal mTaxAmount;
        internal Int32 mDiscountTypeID;
        internal String mDiscountTypeName;
        internal Decimal mDiscountPercentage;
        internal Decimal mDiscountAmount;
        internal Decimal mFixedDiscount;
        internal Decimal mItems5PercTaxAmount;
        internal Decimal mItems10PercTaxAmount;
        internal Decimal mItems14PercTaxAmount;
        internal Decimal mVATFromItems;
        internal Decimal mDiscountFromItems;
        internal Decimal mAmount;
        internal Decimal mPaidAmount;
        internal Decimal mRemainingAmount;
        internal DateTime mInvoiceDate;
        internal DateTime mDueDate;
        internal Boolean mIsApproved;
        internal Boolean mIsDeleted;
        internal Int32 mApprovingUserID;
        internal String mApprovingUserName;
        internal Int32 mVesselID;
        internal String mVesselCode;
        internal String mVesselName;
        internal Int32 mLineID;
        internal String mLineName;
        internal String mVoyageOrTruckNumber;
        internal Int32 mNumberOfAccNotes;
        internal Int32 mNumberOfRoutings;
        internal Int32 mCreatorUserID;
        internal String mCreatorName;
        internal Int32 mSalesmanID;
        internal String mSalesmanName;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal String mModificatorName;
        internal DateTime mModificationDate;
        internal String mLeftSignature;
        internal String mMiddleSignature;
        internal String mRightSignature;
        internal Int32 mTaxAccount_ID;
        internal Int32 mTaxSubAccount_ID;
        internal Int32 mDiscAccount_ID;
        internal Int32 mDiscSubAccount_ID;
        internal String mGRT;
        internal String mDWT;
        internal String mNRT;
        internal String mLOA;
        internal Int64 mRoutingID;
        internal String mCertificateNumber;
        internal Int64 mOperationContainersAndPackagesID;
        internal String mTankOrFlexiNumber;
        internal Boolean mIsNeglectLimit;
        internal Int64 mRelatedToInvoiceID;
        internal Int64 mRelatedToInvoiceNumber;
        internal String mRelatedToInvoiceTypeName;
        internal DateTime mOperationOpenDate;
        internal Int64 mChildInvoiceID;
        internal Int64 mChildInvoiceNumber;
        internal String mChildInvoiceTypeName;
        internal Boolean mIsDraftApproved;
        internal Int32 mDraftApprovingUserID;
        internal DateTime mPaymentDate;
        internal Int32 mTransactionTypeID;
        internal DateTime mCutOffDate;
        internal String mNotes;
        internal String mEditableNotes;
        internal Boolean mIs3PL;
        internal Boolean mIsFleet;
        internal Boolean mIsPrintOriginal;
        internal Int64 mCancelledInvoiceID;
        internal Boolean mIsDelivered;
        internal Int32 mManualPaymentStatusID;
        internal String mManualPaymentStatusName;
        internal String mECode;
        internal String mHouseBillContainers;
        internal DateTime mEntryDate;
        internal DateTime mStorageEndDate;
        internal Int32 mStorageDays;
        internal decimal mStorageRate;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int64 InvoiceNumber
        {
            get { return mInvoiceNumber; }
            set { mInvoiceNumber = value; }
        }
        public Int32 InvoiceTypeID
        {
            get { return mInvoiceTypeID; }
            set { mInvoiceTypeID = value; }
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
        public String ConcatenatedInvoiceNumber
        {
            get { return mConcatenatedInvoiceNumber; }
            set { mConcatenatedInvoiceNumber = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public String OperationCode
        {
            get { return mOperationCode; }
            set { mOperationCode = value; }
        }
        public String OperationCodeWithoutDashes
        {
            get { return mOperationCodeWithoutDashes; }
            set { mOperationCodeWithoutDashes = value; }
        }
        public String MasterBL
        {
            get { return mMasterBL; }
            set { mMasterBL = value; }
        }
        public String HouseNumber
        {
            get { return mHouseNumber; }
            set { mHouseNumber = value; }
        }
        public Int32 TransportType
        {
            get { return mTransportType; }
            set { mTransportType = value; }
        }
        public Int32 OperationStageID
        {
            get { return mOperationStageID; }
            set { mOperationStageID = value; }
        }
        public String OperationNotes
        {
            get { return mOperationNotes; }
            set { mOperationNotes = value; }
        }
        public DateTime OperationCloseDate
        {
            get { return mOperationCloseDate; }
            set { mOperationCloseDate = value; }
        }
        public Boolean IsOperationClosed
        {
            get { return mIsOperationClosed; }
            set { mIsOperationClosed = value; }
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
        public Int32 DirectionType
        {
            get { return mDirectionType; }
            set { mDirectionType = value; }
        }
        public Int32 BLType
        {
            get { return mBLType; }
            set { mBLType = value; }
        }
        public String POLCode
        {
            get { return mPOLCode; }
            set { mPOLCode = value; }
        }
        public String POLName
        {
            get { return mPOLName; }
            set { mPOLName = value; }
        }
        public String PODCountryName
        {
            get { return mPODCountryName; }
            set { mPODCountryName = value; }
        }
        public String PODCode
        {
            get { return mPODCode; }
            set { mPODCode = value; }
        }
        public String PODName
        {
            get { return mPODName; }
            set { mPODName = value; }
        }
        public String PODCountryCode
        {
            get { return mPODCountryCode; }
            set { mPODCountryCode = value; }
        }
        public Int64 MasterOperationID
        {
            get { return mMasterOperationID; }
            set { mMasterOperationID = value; }
        }
        public String MasterOperationCode
        {
            get { return mMasterOperationCode; }
            set { mMasterOperationCode = value; }
        }
        public Int64 OperationPartnerID
        {
            get { return mOperationPartnerID; }
            set { mOperationPartnerID = value; }
        }
        public Int32 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mPartnerTypeID = value; }
        }
        public String PartnerTypeCode
        {
            get { return mPartnerTypeCode; }
            set { mPartnerTypeCode = value; }
        }
        public String GeneralPartnerTypeCode
        {
            get { return mGeneralPartnerTypeCode; }
            set { mGeneralPartnerTypeCode = value; }
        }
        public Int32 PartnerID
        {
            get { return mPartnerID; }
            set { mPartnerID = value; }
        }
        public String PartnerName
        {
            get { return mPartnerName; }
            set { mPartnerName = value; }
        }
        public String PartnerLocalName
        {
            get { return mPartnerLocalName; }
            set { mPartnerLocalName = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsInactive = value; }
        }
        public String VATNumber
        {
            get { return mVATNumber; }
            set { mVATNumber = value; }
        }
        public String InvoiceStatus
        {
            get { return mInvoiceStatus; }
            set { mInvoiceStatus = value; }
        }
        public Int64 AddressID
        {
            get { return mAddressID; }
            set { mAddressID = value; }
        }
        public Int32 CityID
        {
            get { return mCityID; }
            set { mCityID = value; }
        }
        public String CityName
        {
            get { return mCityName; }
            set { mCityName = value; }
        }
        public Int32 CountryID
        {
            get { return mCountryID; }
            set { mCountryID = value; }
        }
        public String CountryName
        {
            get { return mCountryName; }
            set { mCountryName = value; }
        }
        public String StreetLine1
        {
            get { return mStreetLine1; }
            set { mStreetLine1 = value; }
        }
        public String StreetLine2
        {
            get { return mStreetLine2; }
            set { mStreetLine2 = value; }
        }
        public Int32 AddressTypeID
        {
            get { return mAddressTypeID; }
            set { mAddressTypeID = value; }
        }
        public String AddressTypeName
        {
            get { return mAddressTypeName; }
            set { mAddressTypeName = value; }
        }
        public String PrintedAddress
        {
            get { return mPrintedAddress; }
            set { mPrintedAddress = value; }
        }
        public String CustomerReference
        {
            get { return mCustomerReference; }
            set { mCustomerReference = value; }
        }
        public String SupplierReference
        {
            get { return mSupplierReference; }
            set { mSupplierReference = value; }
        }
        public Int32 PaymentTermID
        {
            get { return mPaymentTermID; }
            set { mPaymentTermID = value; }
        }
        public String PaymentTermCode
        {
            get { return mPaymentTermCode; }
            set { mPaymentTermCode = value; }
        }
        public String PaymentTermName
        {
            get { return mPaymentTermName; }
            set { mPaymentTermName = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
        }
        public Decimal MasterDataExchangeRate
        {
            get { return mMasterDataExchangeRate; }
            set { mMasterDataExchangeRate = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mExchangeRate = value; }
        }
        public Decimal AmountWithoutVAT
        {
            get { return mAmountWithoutVAT; }
            set { mAmountWithoutVAT = value; }
        }
        public Int32 TaxTypeID
        {
            get { return mTaxTypeID; }
            set { mTaxTypeID = value; }
        }
        public String TaxTypeName
        {
            get { return mTaxTypeName; }
            set { mTaxTypeName = value; }
        }
        public Decimal TaxPercentage
        {
            get { return mTaxPercentage; }
            set { mTaxPercentage = value; }
        }
        public Decimal TaxAmount
        {
            get { return mTaxAmount; }
            set { mTaxAmount = value; }
        }
        public Int32 DiscountTypeID
        {
            get { return mDiscountTypeID; }
            set { mDiscountTypeID = value; }
        }
        public String DiscountTypeName
        {
            get { return mDiscountTypeName; }
            set { mDiscountTypeName = value; }
        }
        public Decimal DiscountPercentage
        {
            get { return mDiscountPercentage; }
            set { mDiscountPercentage = value; }
        }
        public Decimal DiscountAmount
        {
            get { return mDiscountAmount; }
            set { mDiscountAmount = value; }
        }
        public Decimal FixedDiscount
        {
            get { return mFixedDiscount; }
            set { mFixedDiscount = value; }
        }
        public Decimal Items5PercTaxAmount
        {
            get { return mItems5PercTaxAmount; }
            set { mItems5PercTaxAmount = value; }
        }
        public Decimal Items10PercTaxAmount
        {
            get { return mItems10PercTaxAmount; }
            set { mItems10PercTaxAmount = value; }
        }
        public Decimal Items14PercTaxAmount
        {
            get { return mItems14PercTaxAmount; }
            set { mItems14PercTaxAmount = value; }
        }
        public Decimal VATFromItems
        {
            get { return mVATFromItems; }
            set { mVATFromItems = value; }
        }
        public Decimal DiscountFromItems
        {
            get { return mDiscountFromItems; }
            set { mDiscountFromItems = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mAmount = value; }
        }
        public Decimal PaidAmount
        {
            get { return mPaidAmount; }
            set { mPaidAmount = value; }
        }
        public Decimal RemainingAmount
        {
            get { return mRemainingAmount; }
            set { mRemainingAmount = value; }
        }
        public DateTime InvoiceDate
        {
            get { return mInvoiceDate; }
            set { mInvoiceDate = value; }
        }
        public DateTime DueDate
        {
            get { return mDueDate; }
            set { mDueDate = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsApproved = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public Int32 ApprovingUserID
        {
            get { return mApprovingUserID; }
            set { mApprovingUserID = value; }
        }
        public String ApprovingUserName
        {
            get { return mApprovingUserName; }
            set { mApprovingUserName = value; }
        }
        public Int32 VesselID
        {
            get { return mVesselID; }
            set { mVesselID = value; }
        }
        public String VesselCode
        {
            get { return mVesselCode; }
            set { mVesselCode = value; }
        }
        public String VesselName
        {
            get { return mVesselName; }
            set { mVesselName = value; }
        }
        public Int32 LineID
        {
            get { return mLineID; }
            set { mLineID = value; }
        }
        public String LineName
        {
            get { return mLineName; }
            set { mLineName = value; }
        }
        public String VoyageOrTruckNumber
        {
            get { return mVoyageOrTruckNumber; }
            set { mVoyageOrTruckNumber = value; }
        }
        public Int32 NumberOfAccNotes
        {
            get { return mNumberOfAccNotes; }
            set { mNumberOfAccNotes = value; }
        }
        public Int32 NumberOfRoutings
        {
            get { return mNumberOfRoutings; }
            set { mNumberOfRoutings = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
        }
        public String CreatorName
        {
            get { return mCreatorName; }
            set { mCreatorName = value; }
        }
        public Int32 SalesmanID
        {
            get { return mSalesmanID; }
            set { mSalesmanID = value; }
        }
        public String SalesmanName
        {
            get { return mSalesmanName; }
            set { mSalesmanName = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mModificatorUserID = value; }
        }
        public String ModificatorName
        {
            get { return mModificatorName; }
            set { mModificatorName = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mModificationDate = value; }
        }
        public String LeftSignature
        {
            get { return mLeftSignature; }
            set { mLeftSignature = value; }
        }
        public String MiddleSignature
        {
            get { return mMiddleSignature; }
            set { mMiddleSignature = value; }
        }
        public String RightSignature
        {
            get { return mRightSignature; }
            set { mRightSignature = value; }
        }
        public Int32 TaxAccount_ID
        {
            get { return mTaxAccount_ID; }
            set { mTaxAccount_ID = value; }
        }
        public Int32 TaxSubAccount_ID
        {
            get { return mTaxSubAccount_ID; }
            set { mTaxSubAccount_ID = value; }
        }
        public Int32 DiscAccount_ID
        {
            get { return mDiscAccount_ID; }
            set { mDiscAccount_ID = value; }
        }
        public Int32 DiscSubAccount_ID
        {
            get { return mDiscSubAccount_ID; }
            set { mDiscSubAccount_ID = value; }
        }
        public String GRT
        {
            get { return mGRT; }
            set { mGRT = value; }
        }
        public String DWT
        {
            get { return mDWT; }
            set { mDWT = value; }
        }
        public String NRT
        {
            get { return mNRT; }
            set { mNRT = value; }
        }
        public String LOA
        {
            get { return mLOA; }
            set { mLOA = value; }
        }
        public Int64 RoutingID
        {
            get { return mRoutingID; }
            set { mRoutingID = value; }
        }
        public String CertificateNumber
        {
            get { return mCertificateNumber; }
            set { mCertificateNumber = value; }
        }
        public Int64 OperationContainersAndPackagesID
        {
            get { return mOperationContainersAndPackagesID; }
            set { mOperationContainersAndPackagesID = value; }
        }
        public String TankOrFlexiNumber
        {
            get { return mTankOrFlexiNumber; }
            set { mTankOrFlexiNumber = value; }
        }
        public Boolean IsNeglectLimit
        {
            get { return mIsNeglectLimit; }
            set { mIsNeglectLimit = value; }
        }
        public Int64 RelatedToInvoiceID
        {
            get { return mRelatedToInvoiceID; }
            set { mRelatedToInvoiceID = value; }
        }
        public Int64 RelatedToInvoiceNumber
        {
            get { return mRelatedToInvoiceNumber; }
            set { mRelatedToInvoiceNumber = value; }
        }
        public String RelatedToInvoiceTypeName
        {
            get { return mRelatedToInvoiceTypeName; }
            set { mRelatedToInvoiceTypeName = value; }
        }
        public DateTime OperationOpenDate
        {
            get { return mOperationOpenDate; }
            set { mOperationOpenDate = value; }
        }
        public Int64 ChildInvoiceID
        {
            get { return mChildInvoiceID; }
            set { mChildInvoiceID = value; }
        }
        public Int64 ChildInvoiceNumber
        {
            get { return mChildInvoiceNumber; }
            set { mChildInvoiceNumber = value; }
        }
        public String ChildInvoiceTypeName
        {
            get { return mChildInvoiceTypeName; }
            set { mChildInvoiceTypeName = value; }
        }
        public Boolean IsDraftApproved
        {
            get { return mIsDraftApproved; }
            set { mIsDraftApproved = value; }
        }
        public Int32 DraftApprovingUserID
        {
            get { return mDraftApprovingUserID; }
            set { mDraftApprovingUserID = value; }
        }
        public DateTime PaymentDate
        {
            get { return mPaymentDate; }
            set { mPaymentDate = value; }
        }
        public Int32 TransactionTypeID
        {
            get { return mTransactionTypeID; }
            set { mTransactionTypeID = value; }
        }
        public DateTime CutOffDate
        {
            get { return mCutOffDate; }
            set { mCutOffDate = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public String EditableNotes
        {
            get { return mEditableNotes; }
            set { mEditableNotes = value; }
        }
        public Boolean Is3PL
        {
            get { return mIs3PL; }
            set { mIs3PL = value; }
        }
        public Boolean IsFleet
        {
            get { return mIsFleet; }
            set { mIsFleet = value; }
        }
        public Boolean IsPrintOriginal
        {
            get { return mIsPrintOriginal; }
            set { mIsPrintOriginal = value; }
        }
        public Int64 CancelledInvoiceID
        {
            get { return mCancelledInvoiceID; }
            set { mCancelledInvoiceID = value; }
        }
        public Boolean IsDelivered
        {
            get { return mIsDelivered; }
            set { mIsDelivered = value; }
        }
        public Int32 ManualPaymentStatusID
        {
            get { return mManualPaymentStatusID; }
            set { mManualPaymentStatusID = value; }
        }
        public String ManualPaymentStatusName
        {
            get { return mManualPaymentStatusName; }
            set { mManualPaymentStatusName = value; }
        }
        public String ECode
        {
            get { return mECode; }
            set { mECode = value; }
        }

        public String HouseBillContainers
        {
            get { return mHouseBillContainers; }
            set { mHouseBillContainers = value; }
        }

        public DateTime EntryDate
        {
            get { return mEntryDate; }
            set { mEntryDate = value; }
        }
        public DateTime StorageEndDate
        {
            get { return mStorageEndDate; }
            set { mStorageEndDate = value; }
        }
        public Int32 StorageDays
        {
            get { return mStorageDays; }
            set { mStorageDays = value; }
        }
        public Decimal StorageRate
        {
            get { return mStorageRate; }
            set { mStorageRate = value; }
        }
        #endregion
    }

    public partial class CvwWH_CFS_Invoices
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
        public List<CVarvwWH_CFS_Invoices> lstCVarvwWH_CFS_Invoices = new List<CVarvwWH_CFS_Invoices>();
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
            lstCVarvwWH_CFS_Invoices.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListvwWH_CFS_Invoices";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 3000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwWH_CFS_Invoices ObjCVarvwWH_CFS_Invoices = new CVarvwWH_CFS_Invoices();
                        ObjCVarvwWH_CFS_Invoices.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mInvoiceTypeCode = Convert.ToString(dr["InvoiceTypeCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mConcatenatedInvoiceNumber = Convert.ToString(dr["ConcatenatedInvoiceNumber"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mOperationCodeWithoutDashes = Convert.ToString(dr["OperationCodeWithoutDashes"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mOperationStageID = Convert.ToInt32(dr["OperationStageID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mOperationNotes = Convert.ToString(dr["OperationNotes"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mOperationCloseDate = Convert.ToDateTime(dr["OperationCloseDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIsOperationClosed = Convert.ToBoolean(dr["IsOperationClosed"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mBLType = Convert.ToInt32(dr["BLType"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPOLCode = Convert.ToString(dr["POLCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPOLName = Convert.ToString(dr["POLName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPODCountryName = Convert.ToString(dr["PODCountryName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPODCode = Convert.ToString(dr["PODCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPODName = Convert.ToString(dr["PODName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPODCountryCode = Convert.ToString(dr["PODCountryCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mMasterOperationCode = Convert.ToString(dr["MasterOperationCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mOperationPartnerID = Convert.ToInt64(dr["OperationPartnerID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPartnerTypeCode = Convert.ToString(dr["PartnerTypeCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mGeneralPartnerTypeCode = Convert.ToString(dr["GeneralPartnerTypeCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPartnerLocalName = Convert.ToString(dr["PartnerLocalName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mInvoiceStatus = Convert.ToString(dr["InvoiceStatus"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mAddressID = Convert.ToInt64(dr["AddressID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCityID = Convert.ToInt32(dr["CityID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCityName = Convert.ToString(dr["CityName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCountryName = Convert.ToString(dr["CountryName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mStreetLine1 = Convert.ToString(dr["StreetLine1"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mStreetLine2 = Convert.ToString(dr["StreetLine2"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mAddressTypeID = Convert.ToInt32(dr["AddressTypeID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mAddressTypeName = Convert.ToString(dr["AddressTypeName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPrintedAddress = Convert.ToString(dr["PrintedAddress"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mSupplierReference = Convert.ToString(dr["SupplierReference"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPaymentTermCode = Convert.ToString(dr["PaymentTermCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mMasterDataExchangeRate = Convert.ToDecimal(dr["MasterDataExchangeRate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mTaxTypeName = Convert.ToString(dr["TaxTypeName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDiscountTypeName = Convert.ToString(dr["DiscountTypeName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mFixedDiscount = Convert.ToDecimal(dr["FixedDiscount"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mItems5PercTaxAmount = Convert.ToDecimal(dr["Items5PercTaxAmount"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mItems10PercTaxAmount = Convert.ToDecimal(dr["Items10PercTaxAmount"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mItems14PercTaxAmount = Convert.ToDecimal(dr["Items14PercTaxAmount"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mVATFromItems = Convert.ToDecimal(dr["VATFromItems"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDiscountFromItems = Convert.ToDecimal(dr["DiscountFromItems"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mRemainingAmount = Convert.ToDecimal(dr["RemainingAmount"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mApprovingUserName = Convert.ToString(dr["ApprovingUserName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mVesselID = Convert.ToInt32(dr["VesselID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mVesselCode = Convert.ToString(dr["VesselCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mLineID = Convert.ToInt32(dr["LineID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mLineName = Convert.ToString(dr["LineName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mVoyageOrTruckNumber = Convert.ToString(dr["VoyageOrTruckNumber"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mNumberOfAccNotes = Convert.ToInt32(dr["NumberOfAccNotes"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mNumberOfRoutings = Convert.ToInt32(dr["NumberOfRoutings"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mSalesmanID = Convert.ToInt32(dr["SalesmanID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mSalesmanName = Convert.ToString(dr["SalesmanName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mModificatorName = Convert.ToString(dr["ModificatorName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mLeftSignature = Convert.ToString(dr["LeftSignature"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mMiddleSignature = Convert.ToString(dr["MiddleSignature"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mRightSignature = Convert.ToString(dr["RightSignature"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mTaxAccount_ID = Convert.ToInt32(dr["TaxAccount_ID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mTaxSubAccount_ID = Convert.ToInt32(dr["TaxSubAccount_ID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDiscAccount_ID = Convert.ToInt32(dr["DiscAccount_ID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDiscSubAccount_ID = Convert.ToInt32(dr["DiscSubAccount_ID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mGRT = Convert.ToString(dr["GRT"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDWT = Convert.ToString(dr["DWT"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mNRT = Convert.ToString(dr["NRT"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mLOA = Convert.ToString(dr["LOA"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mRoutingID = Convert.ToInt64(dr["RoutingID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCertificateNumber = Convert.ToString(dr["CertificateNumber"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mTankOrFlexiNumber = Convert.ToString(dr["TankOrFlexiNumber"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIsNeglectLimit = Convert.ToBoolean(dr["IsNeglectLimit"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mRelatedToInvoiceID = Convert.ToInt64(dr["RelatedToInvoiceID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mRelatedToInvoiceNumber = Convert.ToInt64(dr["RelatedToInvoiceNumber"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mRelatedToInvoiceTypeName = Convert.ToString(dr["RelatedToInvoiceTypeName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mOperationOpenDate = Convert.ToDateTime(dr["OperationOpenDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mChildInvoiceID = Convert.ToInt64(dr["ChildInvoiceID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mChildInvoiceNumber = Convert.ToInt64(dr["ChildInvoiceNumber"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mChildInvoiceTypeName = Convert.ToString(dr["ChildInvoiceTypeName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIsDraftApproved = Convert.ToBoolean(dr["IsDraftApproved"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDraftApprovingUserID = Convert.ToInt32(dr["DraftApprovingUserID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPaymentDate = Convert.ToDateTime(dr["PaymentDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mEditableNotes = Convert.ToString(dr["EditableNotes"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIs3PL = Convert.ToBoolean(dr["Is3PL"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIsFleet = Convert.ToBoolean(dr["IsFleet"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIsPrintOriginal = Convert.ToBoolean(dr["IsPrintOriginal"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCancelledInvoiceID = Convert.ToInt64(dr["CancelledInvoiceID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIsDelivered = Convert.ToBoolean(dr["IsDelivered"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mManualPaymentStatusID = Convert.ToInt32(dr["ManualPaymentStatusID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mManualPaymentStatusName = Convert.ToString(dr["ManualPaymentStatusName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mECode = Convert.ToString(dr["ECode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mHouseBillContainers = Convert.ToString(dr["HouseBillContainers"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mEntryDate = Convert.ToDateTime(dr["EntryDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mStorageEndDate = Convert.ToDateTime(dr["StorageEndDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mStorageDays = Convert.ToInt32(dr["StorageDays"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mStorageRate = Convert.ToDecimal(dr["StorageRate"].ToString());


                        lstCVarvwWH_CFS_Invoices.Add(ObjCVarvwWH_CFS_Invoices);
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
            lstCVarvwWH_CFS_Invoices.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingvwWH_CFS_Invoices";
                Com.Parameters[0].Value = PageSize;
                Com.Parameters[1].Value = PageNumber;
                Com.Parameters[2].Value = WhereClause;
                Com.Parameters[3].Value = OrderBy;
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 3000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwWH_CFS_Invoices ObjCVarvwWH_CFS_Invoices = new CVarvwWH_CFS_Invoices();
                        ObjCVarvwWH_CFS_Invoices.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mInvoiceTypeCode = Convert.ToString(dr["InvoiceTypeCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mConcatenatedInvoiceNumber = Convert.ToString(dr["ConcatenatedInvoiceNumber"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mOperationCodeWithoutDashes = Convert.ToString(dr["OperationCodeWithoutDashes"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mOperationStageID = Convert.ToInt32(dr["OperationStageID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mOperationNotes = Convert.ToString(dr["OperationNotes"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mOperationCloseDate = Convert.ToDateTime(dr["OperationCloseDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIsOperationClosed = Convert.ToBoolean(dr["IsOperationClosed"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mBLType = Convert.ToInt32(dr["BLType"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPOLCode = Convert.ToString(dr["POLCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPOLName = Convert.ToString(dr["POLName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPODCountryName = Convert.ToString(dr["PODCountryName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPODCode = Convert.ToString(dr["PODCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPODName = Convert.ToString(dr["PODName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPODCountryCode = Convert.ToString(dr["PODCountryCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mMasterOperationCode = Convert.ToString(dr["MasterOperationCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mOperationPartnerID = Convert.ToInt64(dr["OperationPartnerID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPartnerTypeCode = Convert.ToString(dr["PartnerTypeCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mGeneralPartnerTypeCode = Convert.ToString(dr["GeneralPartnerTypeCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPartnerLocalName = Convert.ToString(dr["PartnerLocalName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mInvoiceStatus = Convert.ToString(dr["InvoiceStatus"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mAddressID = Convert.ToInt64(dr["AddressID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCityID = Convert.ToInt32(dr["CityID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCityName = Convert.ToString(dr["CityName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCountryName = Convert.ToString(dr["CountryName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mStreetLine1 = Convert.ToString(dr["StreetLine1"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mStreetLine2 = Convert.ToString(dr["StreetLine2"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mAddressTypeID = Convert.ToInt32(dr["AddressTypeID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mAddressTypeName = Convert.ToString(dr["AddressTypeName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPrintedAddress = Convert.ToString(dr["PrintedAddress"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mSupplierReference = Convert.ToString(dr["SupplierReference"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPaymentTermCode = Convert.ToString(dr["PaymentTermCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mMasterDataExchangeRate = Convert.ToDecimal(dr["MasterDataExchangeRate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mTaxTypeName = Convert.ToString(dr["TaxTypeName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDiscountTypeName = Convert.ToString(dr["DiscountTypeName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mFixedDiscount = Convert.ToDecimal(dr["FixedDiscount"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mItems5PercTaxAmount = Convert.ToDecimal(dr["Items5PercTaxAmount"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mItems10PercTaxAmount = Convert.ToDecimal(dr["Items10PercTaxAmount"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mItems14PercTaxAmount = Convert.ToDecimal(dr["Items14PercTaxAmount"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mVATFromItems = Convert.ToDecimal(dr["VATFromItems"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDiscountFromItems = Convert.ToDecimal(dr["DiscountFromItems"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mRemainingAmount = Convert.ToDecimal(dr["RemainingAmount"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mApprovingUserName = Convert.ToString(dr["ApprovingUserName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mVesselID = Convert.ToInt32(dr["VesselID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mVesselCode = Convert.ToString(dr["VesselCode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mLineID = Convert.ToInt32(dr["LineID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mLineName = Convert.ToString(dr["LineName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mVoyageOrTruckNumber = Convert.ToString(dr["VoyageOrTruckNumber"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mNumberOfAccNotes = Convert.ToInt32(dr["NumberOfAccNotes"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mNumberOfRoutings = Convert.ToInt32(dr["NumberOfRoutings"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mSalesmanID = Convert.ToInt32(dr["SalesmanID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mSalesmanName = Convert.ToString(dr["SalesmanName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mModificatorName = Convert.ToString(dr["ModificatorName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mLeftSignature = Convert.ToString(dr["LeftSignature"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mMiddleSignature = Convert.ToString(dr["MiddleSignature"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mRightSignature = Convert.ToString(dr["RightSignature"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mTaxAccount_ID = Convert.ToInt32(dr["TaxAccount_ID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mTaxSubAccount_ID = Convert.ToInt32(dr["TaxSubAccount_ID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDiscAccount_ID = Convert.ToInt32(dr["DiscAccount_ID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDiscSubAccount_ID = Convert.ToInt32(dr["DiscSubAccount_ID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mGRT = Convert.ToString(dr["GRT"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDWT = Convert.ToString(dr["DWT"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mNRT = Convert.ToString(dr["NRT"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mLOA = Convert.ToString(dr["LOA"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mRoutingID = Convert.ToInt64(dr["RoutingID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCertificateNumber = Convert.ToString(dr["CertificateNumber"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mTankOrFlexiNumber = Convert.ToString(dr["TankOrFlexiNumber"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIsNeglectLimit = Convert.ToBoolean(dr["IsNeglectLimit"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mRelatedToInvoiceID = Convert.ToInt64(dr["RelatedToInvoiceID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mRelatedToInvoiceNumber = Convert.ToInt64(dr["RelatedToInvoiceNumber"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mRelatedToInvoiceTypeName = Convert.ToString(dr["RelatedToInvoiceTypeName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mOperationOpenDate = Convert.ToDateTime(dr["OperationOpenDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mChildInvoiceID = Convert.ToInt64(dr["ChildInvoiceID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mChildInvoiceNumber = Convert.ToInt64(dr["ChildInvoiceNumber"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mChildInvoiceTypeName = Convert.ToString(dr["ChildInvoiceTypeName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIsDraftApproved = Convert.ToBoolean(dr["IsDraftApproved"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mDraftApprovingUserID = Convert.ToInt32(dr["DraftApprovingUserID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mPaymentDate = Convert.ToDateTime(dr["PaymentDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mEditableNotes = Convert.ToString(dr["EditableNotes"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIs3PL = Convert.ToBoolean(dr["Is3PL"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIsFleet = Convert.ToBoolean(dr["IsFleet"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIsPrintOriginal = Convert.ToBoolean(dr["IsPrintOriginal"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mCancelledInvoiceID = Convert.ToInt64(dr["CancelledInvoiceID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mIsDelivered = Convert.ToBoolean(dr["IsDelivered"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mManualPaymentStatusID = Convert.ToInt32(dr["ManualPaymentStatusID"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mManualPaymentStatusName = Convert.ToString(dr["ManualPaymentStatusName"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mECode = Convert.ToString(dr["ECode"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mHouseBillContainers = Convert.ToString(dr["HouseBillContainers"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mEntryDate = Convert.ToDateTime(dr["EntryDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mStorageEndDate = Convert.ToDateTime(dr["StorageEndDate"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mStorageDays = Convert.ToInt32(dr["StorageDays"].ToString());
                        ObjCVarvwWH_CFS_Invoices.mStorageRate = Convert.ToDecimal(dr["StorageRate"].ToString());

                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwWH_CFS_Invoices.Add(ObjCVarvwWH_CFS_Invoices);
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

