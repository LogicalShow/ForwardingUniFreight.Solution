using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

//Com.CommandTimeout = 2000;
namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public partial class CVarvwInvoicesTaxationOfSales
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
        internal String mTaxIdentificationNumber;
        internal String mAddress;
        internal String mCustomerPhone;
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
        internal Int32 mDocumentTypeNO;
        internal Int32 mTaxTypeNO;
        internal Int32 mItemTypeNO;
        internal Int32 mStatementTypeNO;
        internal String mReceiptCode;
        internal Decimal mTotalVoucher;
        internal String mReferenceNo;
        internal Decimal mDiff;
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
        public String TaxIdentificationNumber
        {
            get { return mTaxIdentificationNumber; }
            set { mTaxIdentificationNumber = value; }
        }
        public String Address
        {
            get { return mAddress; }
            set { mAddress = value; }
        }
        public String CustomerPhone
        {
            get { return mCustomerPhone; }
            set { mCustomerPhone = value; }
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
        public Int32 DocumentTypeNO
        {
            get { return mDocumentTypeNO; }
            set { mDocumentTypeNO = value; }
        }
        public Int32 TaxTypeNO
        {
            get { return mTaxTypeNO; }
            set { mTaxTypeNO = value; }
        }
        public Int32 ItemTypeNO
        {
            get { return mItemTypeNO; }
            set { mItemTypeNO = value; }
        }
        public Int32 StatementTypeNO
        {
            get { return mStatementTypeNO; }
            set { mStatementTypeNO = value; }
        }
        public String ReceiptCode
        {
            get { return mReceiptCode; }
            set { mReceiptCode = value; }
        }
        public Decimal TotalVoucher
        {
            get { return mTotalVoucher; }
            set { mTotalVoucher = value; }
        }
        public String ReferenceNo
        {
            get { return mReferenceNo; }
            set { mReferenceNo = value; }
        }
        public Decimal Diff
        {
            get { return mDiff; }
            set { mDiff = value; }
        }
        #endregion
    }

    public partial class CvwInvoicesTaxationOfSales
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
        public List<CVarvwInvoicesTaxationOfSales> lstCVarvwInvoicesTaxationOfSales = new List<CVarvwInvoicesTaxationOfSales>();
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
            lstCVarvwInvoicesTaxationOfSales.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwInvoicesTaxationOfSales";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 2000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwInvoicesTaxationOfSales ObjCVarvwInvoicesTaxationOfSales = new CVarvwInvoicesTaxationOfSales();
                        ObjCVarvwInvoicesTaxationOfSales.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mInvoiceTypeCode = Convert.ToString(dr["InvoiceTypeCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mConcatenatedInvoiceNumber = Convert.ToString(dr["ConcatenatedInvoiceNumber"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mOperationCodeWithoutDashes = Convert.ToString(dr["OperationCodeWithoutDashes"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mOperationStageID = Convert.ToInt32(dr["OperationStageID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mOperationCloseDate = Convert.ToDateTime(dr["OperationCloseDate"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mIsOperationClosed = Convert.ToBoolean(dr["IsOperationClosed"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mBLType = Convert.ToInt32(dr["BLType"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPOLCode = Convert.ToString(dr["POLCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPOLName = Convert.ToString(dr["POLName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPODCountryName = Convert.ToString(dr["PODCountryName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPODCode = Convert.ToString(dr["PODCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPODName = Convert.ToString(dr["PODName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPODCountryCode = Convert.ToString(dr["PODCountryCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mMasterOperationCode = Convert.ToString(dr["MasterOperationCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mOperationPartnerID = Convert.ToInt64(dr["OperationPartnerID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPartnerTypeCode = Convert.ToString(dr["PartnerTypeCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mGeneralPartnerTypeCode = Convert.ToString(dr["GeneralPartnerTypeCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPartnerLocalName = Convert.ToString(dr["PartnerLocalName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTaxIdentificationNumber = Convert.ToString(dr["TaxIdentificationNumber"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCustomerPhone = Convert.ToString(dr["CustomerPhone"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mInvoiceStatus = Convert.ToString(dr["InvoiceStatus"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mAddressID = Convert.ToInt64(dr["AddressID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCityID = Convert.ToInt32(dr["CityID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCityName = Convert.ToString(dr["CityName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCountryName = Convert.ToString(dr["CountryName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mStreetLine1 = Convert.ToString(dr["StreetLine1"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mStreetLine2 = Convert.ToString(dr["StreetLine2"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mAddressTypeID = Convert.ToInt32(dr["AddressTypeID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mAddressTypeName = Convert.ToString(dr["AddressTypeName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPrintedAddress = Convert.ToString(dr["PrintedAddress"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPaymentTermCode = Convert.ToString(dr["PaymentTermCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mMasterDataExchangeRate = Convert.ToDecimal(dr["MasterDataExchangeRate"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTaxTypeName = Convert.ToString(dr["TaxTypeName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDiscountTypeName = Convert.ToString(dr["DiscountTypeName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mRemainingAmount = Convert.ToDecimal(dr["RemainingAmount"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mApprovingUserName = Convert.ToString(dr["ApprovingUserName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mVesselID = Convert.ToInt32(dr["VesselID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mVesselCode = Convert.ToString(dr["VesselCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mLineID = Convert.ToInt32(dr["LineID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mLineName = Convert.ToString(dr["LineName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mVoyageOrTruckNumber = Convert.ToString(dr["VoyageOrTruckNumber"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mNumberOfAccNotes = Convert.ToInt32(dr["NumberOfAccNotes"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mModificatorName = Convert.ToString(dr["ModificatorName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mLeftSignature = Convert.ToString(dr["LeftSignature"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mMiddleSignature = Convert.ToString(dr["MiddleSignature"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mRightSignature = Convert.ToString(dr["RightSignature"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTaxAccount_ID = Convert.ToInt32(dr["TaxAccount_ID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTaxSubAccount_ID = Convert.ToInt32(dr["TaxSubAccount_ID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDiscAccount_ID = Convert.ToInt32(dr["DiscAccount_ID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDiscSubAccount_ID = Convert.ToInt32(dr["DiscSubAccount_ID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mGRT = Convert.ToString(dr["GRT"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDWT = Convert.ToString(dr["DWT"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mNRT = Convert.ToString(dr["NRT"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mLOA = Convert.ToString(dr["LOA"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDocumentTypeNO = Convert.ToInt32(dr["DocumentTypeNO"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTaxTypeNO = Convert.ToInt32(dr["TaxTypeNO"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mItemTypeNO = Convert.ToInt32(dr["ItemTypeNO"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mStatementTypeNO = Convert.ToInt32(dr["StatementTypeNO"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mReceiptCode = Convert.ToString(dr["ReceiptCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTotalVoucher = Convert.ToDecimal(dr["TotalVoucher"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mReferenceNo = Convert.ToString(dr["ReferenceNo"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDiff = Convert.ToDecimal(dr["Diff"].ToString());
                        lstCVarvwInvoicesTaxationOfSales.Add(ObjCVarvwInvoicesTaxationOfSales);
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
            lstCVarvwInvoicesTaxationOfSales.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwInvoicesTaxationOfSales";
                Com.Parameters[0].Value = PageSize;
                Com.Parameters[1].Value = PageNumber;
                Com.Parameters[2].Value = WhereClause;
                Com.Parameters[3].Value = OrderBy;
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 2000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwInvoicesTaxationOfSales ObjCVarvwInvoicesTaxationOfSales = new CVarvwInvoicesTaxationOfSales();
                        ObjCVarvwInvoicesTaxationOfSales.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mInvoiceTypeCode = Convert.ToString(dr["InvoiceTypeCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mConcatenatedInvoiceNumber = Convert.ToString(dr["ConcatenatedInvoiceNumber"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mOperationCodeWithoutDashes = Convert.ToString(dr["OperationCodeWithoutDashes"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mOperationStageID = Convert.ToInt32(dr["OperationStageID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mOperationCloseDate = Convert.ToDateTime(dr["OperationCloseDate"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mIsOperationClosed = Convert.ToBoolean(dr["IsOperationClosed"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mBLType = Convert.ToInt32(dr["BLType"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPOLCode = Convert.ToString(dr["POLCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPOLName = Convert.ToString(dr["POLName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPODCountryName = Convert.ToString(dr["PODCountryName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPODCode = Convert.ToString(dr["PODCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPODName = Convert.ToString(dr["PODName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPODCountryCode = Convert.ToString(dr["PODCountryCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mMasterOperationCode = Convert.ToString(dr["MasterOperationCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mOperationPartnerID = Convert.ToInt64(dr["OperationPartnerID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPartnerTypeCode = Convert.ToString(dr["PartnerTypeCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mGeneralPartnerTypeCode = Convert.ToString(dr["GeneralPartnerTypeCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPartnerLocalName = Convert.ToString(dr["PartnerLocalName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTaxIdentificationNumber = Convert.ToString(dr["TaxIdentificationNumber"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCustomerPhone = Convert.ToString(dr["CustomerPhone"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mInvoiceStatus = Convert.ToString(dr["InvoiceStatus"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mAddressID = Convert.ToInt64(dr["AddressID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCityID = Convert.ToInt32(dr["CityID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCityName = Convert.ToString(dr["CityName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCountryName = Convert.ToString(dr["CountryName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mStreetLine1 = Convert.ToString(dr["StreetLine1"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mStreetLine2 = Convert.ToString(dr["StreetLine2"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mAddressTypeID = Convert.ToInt32(dr["AddressTypeID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mAddressTypeName = Convert.ToString(dr["AddressTypeName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPrintedAddress = Convert.ToString(dr["PrintedAddress"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPaymentTermCode = Convert.ToString(dr["PaymentTermCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mMasterDataExchangeRate = Convert.ToDecimal(dr["MasterDataExchangeRate"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTaxTypeName = Convert.ToString(dr["TaxTypeName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDiscountTypeName = Convert.ToString(dr["DiscountTypeName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mRemainingAmount = Convert.ToDecimal(dr["RemainingAmount"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mApprovingUserName = Convert.ToString(dr["ApprovingUserName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mVesselID = Convert.ToInt32(dr["VesselID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mVesselCode = Convert.ToString(dr["VesselCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mLineID = Convert.ToInt32(dr["LineID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mLineName = Convert.ToString(dr["LineName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mVoyageOrTruckNumber = Convert.ToString(dr["VoyageOrTruckNumber"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mNumberOfAccNotes = Convert.ToInt32(dr["NumberOfAccNotes"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mModificatorName = Convert.ToString(dr["ModificatorName"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mLeftSignature = Convert.ToString(dr["LeftSignature"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mMiddleSignature = Convert.ToString(dr["MiddleSignature"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mRightSignature = Convert.ToString(dr["RightSignature"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTaxAccount_ID = Convert.ToInt32(dr["TaxAccount_ID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTaxSubAccount_ID = Convert.ToInt32(dr["TaxSubAccount_ID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDiscAccount_ID = Convert.ToInt32(dr["DiscAccount_ID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDiscSubAccount_ID = Convert.ToInt32(dr["DiscSubAccount_ID"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mGRT = Convert.ToString(dr["GRT"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDWT = Convert.ToString(dr["DWT"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mNRT = Convert.ToString(dr["NRT"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mLOA = Convert.ToString(dr["LOA"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDocumentTypeNO = Convert.ToInt32(dr["DocumentTypeNO"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTaxTypeNO = Convert.ToInt32(dr["TaxTypeNO"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mItemTypeNO = Convert.ToInt32(dr["ItemTypeNO"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mStatementTypeNO = Convert.ToInt32(dr["StatementTypeNO"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mReceiptCode = Convert.ToString(dr["ReceiptCode"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mTotalVoucher = Convert.ToDecimal(dr["TotalVoucher"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mReferenceNo = Convert.ToString(dr["ReferenceNo"].ToString());
                        ObjCVarvwInvoicesTaxationOfSales.mDiff = Convert.ToDecimal(dr["Diff"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwInvoicesTaxationOfSales.Add(ObjCVarvwInvoicesTaxationOfSales);
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
