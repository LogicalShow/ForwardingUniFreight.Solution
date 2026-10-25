using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.WebSite.Generated
{
    [Serializable]
    public partial class CVarvwInvoicesForWebSite
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
        internal Int32 mCreatorUserID;
        internal String mCreatorName;
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
        internal String mBookingNumbers;
        internal String mContainerNumbers;
        internal String mContainerNumber;
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
        public String BookingNumbers
        {
            get { return mBookingNumbers; }
            set { mBookingNumbers = value; }
        }
        public String ContainerNumbers
        {
            get { return mContainerNumbers; }
            set { mContainerNumbers = value; }
        }
        public String ContainerNumber
        {
            get { return mContainerNumber; }
            set { mContainerNumber = value; }
        }
        #endregion
    }

    public partial class CvwInvoicesForWebSite
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
        public List<CVarvwInvoicesForWebSite> lstCVarvwInvoicesForWebSite = new List<CVarvwInvoicesForWebSite>();
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
            lstCVarvwInvoicesForWebSite.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwInvoicesForWebSite";
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
                        CVarvwInvoicesForWebSite ObjCVarvwInvoicesForWebSite = new CVarvwInvoicesForWebSite();
                        ObjCVarvwInvoicesForWebSite.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwInvoicesForWebSite.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mInvoiceTypeCode = Convert.ToString(dr["InvoiceTypeCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mConcatenatedInvoiceNumber = Convert.ToString(dr["ConcatenatedInvoiceNumber"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwInvoicesForWebSite.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mOperationCodeWithoutDashes = Convert.ToString(dr["OperationCodeWithoutDashes"].ToString());
                        ObjCVarvwInvoicesForWebSite.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwInvoicesForWebSite.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarvwInvoicesForWebSite.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
                        ObjCVarvwInvoicesForWebSite.mOperationStageID = Convert.ToInt32(dr["OperationStageID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mOperationCloseDate = Convert.ToDateTime(dr["OperationCloseDate"].ToString());
                        ObjCVarvwInvoicesForWebSite.mIsOperationClosed = Convert.ToBoolean(dr["IsOperationClosed"].ToString());
                        ObjCVarvwInvoicesForWebSite.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarvwInvoicesForWebSite.mBLType = Convert.ToInt32(dr["BLType"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPOLCode = Convert.ToString(dr["POLCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPOLName = Convert.ToString(dr["POLName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPODCountryName = Convert.ToString(dr["PODCountryName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPODCode = Convert.ToString(dr["PODCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPODName = Convert.ToString(dr["PODName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPODCountryCode = Convert.ToString(dr["PODCountryCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mMasterOperationCode = Convert.ToString(dr["MasterOperationCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mOperationPartnerID = Convert.ToInt64(dr["OperationPartnerID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPartnerTypeCode = Convert.ToString(dr["PartnerTypeCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mGeneralPartnerTypeCode = Convert.ToString(dr["GeneralPartnerTypeCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPartnerLocalName = Convert.ToString(dr["PartnerLocalName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarvwInvoicesForWebSite.mInvoiceStatus = Convert.ToString(dr["InvoiceStatus"].ToString());
                        ObjCVarvwInvoicesForWebSite.mAddressID = Convert.ToInt64(dr["AddressID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCityID = Convert.ToInt32(dr["CityID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCityName = Convert.ToString(dr["CityName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCountryName = Convert.ToString(dr["CountryName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mStreetLine1 = Convert.ToString(dr["StreetLine1"].ToString());
                        ObjCVarvwInvoicesForWebSite.mStreetLine2 = Convert.ToString(dr["StreetLine2"].ToString());
                        ObjCVarvwInvoicesForWebSite.mAddressTypeID = Convert.ToInt32(dr["AddressTypeID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mAddressTypeName = Convert.ToString(dr["AddressTypeName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPrintedAddress = Convert.ToString(dr["PrintedAddress"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPaymentTermCode = Convert.ToString(dr["PaymentTermCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mMasterDataExchangeRate = Convert.ToDecimal(dr["MasterDataExchangeRate"].ToString());
                        ObjCVarvwInvoicesForWebSite.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwInvoicesForWebSite.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarvwInvoicesForWebSite.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mTaxTypeName = Convert.ToString(dr["TaxTypeName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarvwInvoicesForWebSite.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDiscountTypeName = Convert.ToString(dr["DiscountTypeName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarvwInvoicesForWebSite.mFixedDiscount = Convert.ToDecimal(dr["FixedDiscount"].ToString());
                        ObjCVarvwInvoicesForWebSite.mItems5PercTaxAmount = Convert.ToDecimal(dr["Items5PercTaxAmount"].ToString());
                        ObjCVarvwInvoicesForWebSite.mItems10PercTaxAmount = Convert.ToDecimal(dr["Items10PercTaxAmount"].ToString());
                        ObjCVarvwInvoicesForWebSite.mItems14PercTaxAmount = Convert.ToDecimal(dr["Items14PercTaxAmount"].ToString());
                        ObjCVarvwInvoicesForWebSite.mVATFromItems = Convert.ToDecimal(dr["VATFromItems"].ToString());
                        ObjCVarvwInvoicesForWebSite.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwInvoicesForWebSite.mRemainingAmount = Convert.ToDecimal(dr["RemainingAmount"].ToString());
                        ObjCVarvwInvoicesForWebSite.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarvwInvoicesForWebSite.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwInvoicesForWebSite.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwInvoicesForWebSite.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mApprovingUserName = Convert.ToString(dr["ApprovingUserName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mVesselID = Convert.ToInt32(dr["VesselID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mVesselCode = Convert.ToString(dr["VesselCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mLineID = Convert.ToInt32(dr["LineID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mLineName = Convert.ToString(dr["LineName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mVoyageOrTruckNumber = Convert.ToString(dr["VoyageOrTruckNumber"].ToString());
                        ObjCVarvwInvoicesForWebSite.mNumberOfAccNotes = Convert.ToInt32(dr["NumberOfAccNotes"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwInvoicesForWebSite.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mModificatorName = Convert.ToString(dr["ModificatorName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwInvoicesForWebSite.mLeftSignature = Convert.ToString(dr["LeftSignature"].ToString());
                        ObjCVarvwInvoicesForWebSite.mMiddleSignature = Convert.ToString(dr["MiddleSignature"].ToString());
                        ObjCVarvwInvoicesForWebSite.mRightSignature = Convert.ToString(dr["RightSignature"].ToString());
                        ObjCVarvwInvoicesForWebSite.mTaxAccount_ID = Convert.ToInt32(dr["TaxAccount_ID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mTaxSubAccount_ID = Convert.ToInt32(dr["TaxSubAccount_ID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDiscAccount_ID = Convert.ToInt32(dr["DiscAccount_ID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDiscSubAccount_ID = Convert.ToInt32(dr["DiscSubAccount_ID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mGRT = Convert.ToString(dr["GRT"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDWT = Convert.ToString(dr["DWT"].ToString());
                        ObjCVarvwInvoicesForWebSite.mNRT = Convert.ToString(dr["NRT"].ToString());
                        ObjCVarvwInvoicesForWebSite.mLOA = Convert.ToString(dr["LOA"].ToString());
                        ObjCVarvwInvoicesForWebSite.mRoutingID = Convert.ToInt64(dr["RoutingID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCertificateNumber = Convert.ToString(dr["CertificateNumber"].ToString());
                        ObjCVarvwInvoicesForWebSite.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mTankOrFlexiNumber = Convert.ToString(dr["TankOrFlexiNumber"].ToString());
                        ObjCVarvwInvoicesForWebSite.mIsNeglectLimit = Convert.ToBoolean(dr["IsNeglectLimit"].ToString());
                        ObjCVarvwInvoicesForWebSite.mRelatedToInvoiceID = Convert.ToInt64(dr["RelatedToInvoiceID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mRelatedToInvoiceNumber = Convert.ToInt64(dr["RelatedToInvoiceNumber"].ToString());
                        ObjCVarvwInvoicesForWebSite.mRelatedToInvoiceTypeName = Convert.ToString(dr["RelatedToInvoiceTypeName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mOperationOpenDate = Convert.ToDateTime(dr["OperationOpenDate"].ToString());
                        ObjCVarvwInvoicesForWebSite.mChildInvoiceID = Convert.ToInt64(dr["ChildInvoiceID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mChildInvoiceNumber = Convert.ToInt64(dr["ChildInvoiceNumber"].ToString());
                        ObjCVarvwInvoicesForWebSite.mChildInvoiceTypeName = Convert.ToString(dr["ChildInvoiceTypeName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mIsDraftApproved = Convert.ToBoolean(dr["IsDraftApproved"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDraftApprovingUserID = Convert.ToInt32(dr["DraftApprovingUserID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPaymentDate = Convert.ToDateTime(dr["PaymentDate"].ToString());
                        ObjCVarvwInvoicesForWebSite.mBookingNumbers = Convert.ToString(dr["BookingNumbers"].ToString());
                        ObjCVarvwInvoicesForWebSite.mContainerNumbers = Convert.ToString(dr["ContainerNumbers"].ToString());
                        ObjCVarvwInvoicesForWebSite.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        lstCVarvwInvoicesForWebSite.Add(ObjCVarvwInvoicesForWebSite);
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
            lstCVarvwInvoicesForWebSite.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwInvoicesForWebSite";
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
                        CVarvwInvoicesForWebSite ObjCVarvwInvoicesForWebSite = new CVarvwInvoicesForWebSite();
                        ObjCVarvwInvoicesForWebSite.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwInvoicesForWebSite.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mInvoiceTypeCode = Convert.ToString(dr["InvoiceTypeCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mConcatenatedInvoiceNumber = Convert.ToString(dr["ConcatenatedInvoiceNumber"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwInvoicesForWebSite.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mOperationCodeWithoutDashes = Convert.ToString(dr["OperationCodeWithoutDashes"].ToString());
                        ObjCVarvwInvoicesForWebSite.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwInvoicesForWebSite.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarvwInvoicesForWebSite.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
                        ObjCVarvwInvoicesForWebSite.mOperationStageID = Convert.ToInt32(dr["OperationStageID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mOperationCloseDate = Convert.ToDateTime(dr["OperationCloseDate"].ToString());
                        ObjCVarvwInvoicesForWebSite.mIsOperationClosed = Convert.ToBoolean(dr["IsOperationClosed"].ToString());
                        ObjCVarvwInvoicesForWebSite.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarvwInvoicesForWebSite.mBLType = Convert.ToInt32(dr["BLType"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPOLCode = Convert.ToString(dr["POLCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPOLName = Convert.ToString(dr["POLName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPODCountryName = Convert.ToString(dr["PODCountryName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPODCode = Convert.ToString(dr["PODCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPODName = Convert.ToString(dr["PODName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPODCountryCode = Convert.ToString(dr["PODCountryCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mMasterOperationCode = Convert.ToString(dr["MasterOperationCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mOperationPartnerID = Convert.ToInt64(dr["OperationPartnerID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPartnerTypeCode = Convert.ToString(dr["PartnerTypeCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mGeneralPartnerTypeCode = Convert.ToString(dr["GeneralPartnerTypeCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPartnerLocalName = Convert.ToString(dr["PartnerLocalName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarvwInvoicesForWebSite.mInvoiceStatus = Convert.ToString(dr["InvoiceStatus"].ToString());
                        ObjCVarvwInvoicesForWebSite.mAddressID = Convert.ToInt64(dr["AddressID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCityID = Convert.ToInt32(dr["CityID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCityName = Convert.ToString(dr["CityName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCountryName = Convert.ToString(dr["CountryName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mStreetLine1 = Convert.ToString(dr["StreetLine1"].ToString());
                        ObjCVarvwInvoicesForWebSite.mStreetLine2 = Convert.ToString(dr["StreetLine2"].ToString());
                        ObjCVarvwInvoicesForWebSite.mAddressTypeID = Convert.ToInt32(dr["AddressTypeID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mAddressTypeName = Convert.ToString(dr["AddressTypeName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPrintedAddress = Convert.ToString(dr["PrintedAddress"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPaymentTermCode = Convert.ToString(dr["PaymentTermCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mMasterDataExchangeRate = Convert.ToDecimal(dr["MasterDataExchangeRate"].ToString());
                        ObjCVarvwInvoicesForWebSite.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwInvoicesForWebSite.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarvwInvoicesForWebSite.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mTaxTypeName = Convert.ToString(dr["TaxTypeName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarvwInvoicesForWebSite.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDiscountTypeName = Convert.ToString(dr["DiscountTypeName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarvwInvoicesForWebSite.mFixedDiscount = Convert.ToDecimal(dr["FixedDiscount"].ToString());
                        ObjCVarvwInvoicesForWebSite.mItems5PercTaxAmount = Convert.ToDecimal(dr["Items5PercTaxAmount"].ToString());
                        ObjCVarvwInvoicesForWebSite.mItems10PercTaxAmount = Convert.ToDecimal(dr["Items10PercTaxAmount"].ToString());
                        ObjCVarvwInvoicesForWebSite.mItems14PercTaxAmount = Convert.ToDecimal(dr["Items14PercTaxAmount"].ToString());
                        ObjCVarvwInvoicesForWebSite.mVATFromItems = Convert.ToDecimal(dr["VATFromItems"].ToString());
                        ObjCVarvwInvoicesForWebSite.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwInvoicesForWebSite.mRemainingAmount = Convert.ToDecimal(dr["RemainingAmount"].ToString());
                        ObjCVarvwInvoicesForWebSite.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarvwInvoicesForWebSite.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwInvoicesForWebSite.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwInvoicesForWebSite.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mApprovingUserName = Convert.ToString(dr["ApprovingUserName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mVesselID = Convert.ToInt32(dr["VesselID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mVesselCode = Convert.ToString(dr["VesselCode"].ToString());
                        ObjCVarvwInvoicesForWebSite.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mLineID = Convert.ToInt32(dr["LineID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mLineName = Convert.ToString(dr["LineName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mVoyageOrTruckNumber = Convert.ToString(dr["VoyageOrTruckNumber"].ToString());
                        ObjCVarvwInvoicesForWebSite.mNumberOfAccNotes = Convert.ToInt32(dr["NumberOfAccNotes"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwInvoicesForWebSite.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mModificatorName = Convert.ToString(dr["ModificatorName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwInvoicesForWebSite.mLeftSignature = Convert.ToString(dr["LeftSignature"].ToString());
                        ObjCVarvwInvoicesForWebSite.mMiddleSignature = Convert.ToString(dr["MiddleSignature"].ToString());
                        ObjCVarvwInvoicesForWebSite.mRightSignature = Convert.ToString(dr["RightSignature"].ToString());
                        ObjCVarvwInvoicesForWebSite.mTaxAccount_ID = Convert.ToInt32(dr["TaxAccount_ID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mTaxSubAccount_ID = Convert.ToInt32(dr["TaxSubAccount_ID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDiscAccount_ID = Convert.ToInt32(dr["DiscAccount_ID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDiscSubAccount_ID = Convert.ToInt32(dr["DiscSubAccount_ID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mGRT = Convert.ToString(dr["GRT"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDWT = Convert.ToString(dr["DWT"].ToString());
                        ObjCVarvwInvoicesForWebSite.mNRT = Convert.ToString(dr["NRT"].ToString());
                        ObjCVarvwInvoicesForWebSite.mLOA = Convert.ToString(dr["LOA"].ToString());
                        ObjCVarvwInvoicesForWebSite.mRoutingID = Convert.ToInt64(dr["RoutingID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mCertificateNumber = Convert.ToString(dr["CertificateNumber"].ToString());
                        ObjCVarvwInvoicesForWebSite.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mTankOrFlexiNumber = Convert.ToString(dr["TankOrFlexiNumber"].ToString());
                        ObjCVarvwInvoicesForWebSite.mIsNeglectLimit = Convert.ToBoolean(dr["IsNeglectLimit"].ToString());
                        ObjCVarvwInvoicesForWebSite.mRelatedToInvoiceID = Convert.ToInt64(dr["RelatedToInvoiceID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mRelatedToInvoiceNumber = Convert.ToInt64(dr["RelatedToInvoiceNumber"].ToString());
                        ObjCVarvwInvoicesForWebSite.mRelatedToInvoiceTypeName = Convert.ToString(dr["RelatedToInvoiceTypeName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mOperationOpenDate = Convert.ToDateTime(dr["OperationOpenDate"].ToString());
                        ObjCVarvwInvoicesForWebSite.mChildInvoiceID = Convert.ToInt64(dr["ChildInvoiceID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mChildInvoiceNumber = Convert.ToInt64(dr["ChildInvoiceNumber"].ToString());
                        ObjCVarvwInvoicesForWebSite.mChildInvoiceTypeName = Convert.ToString(dr["ChildInvoiceTypeName"].ToString());
                        ObjCVarvwInvoicesForWebSite.mIsDraftApproved = Convert.ToBoolean(dr["IsDraftApproved"].ToString());
                        ObjCVarvwInvoicesForWebSite.mDraftApprovingUserID = Convert.ToInt32(dr["DraftApprovingUserID"].ToString());
                        ObjCVarvwInvoicesForWebSite.mPaymentDate = Convert.ToDateTime(dr["PaymentDate"].ToString());
                        ObjCVarvwInvoicesForWebSite.mBookingNumbers = Convert.ToString(dr["BookingNumbers"].ToString());
                        ObjCVarvwInvoicesForWebSite.mContainerNumbers = Convert.ToString(dr["ContainerNumbers"].ToString());
                        ObjCVarvwInvoicesForWebSite.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwInvoicesForWebSite.Add(ObjCVarvwInvoicesForWebSite);
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
