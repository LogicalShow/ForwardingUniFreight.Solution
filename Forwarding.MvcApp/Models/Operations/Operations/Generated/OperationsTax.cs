using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKOperationsTAX
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
    public partial class CVarOperationsTAX : CPKOperationsTAX
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mQuotationRouteID;
        internal Int32 mCodeSerial;
        internal String mCode;
        internal Int32 mBranchID;
        internal Int32 mSalesmanID;
        internal Int32 mBLType;
        internal String mBLTypeIconName;
        internal String mBLTypeIconStyle;
        internal Int32 mDirectionType;
        internal String mDirectionIconName;
        internal String mDirectionIconStyle;
        internal Int32 mTransportType;
        internal String mTransportIconName;
        internal String mTransportIconStyle;
        internal Int32 mShipmentType;
        internal String mHouseNumber;
        internal Boolean mIsPackagesPlacedOnMaster;
        internal Int64 mPlacedOnOperationContainersAndPackagesID;
        internal Int64 mMAWBStockID;
        internal String mMasterBL;
        internal String mMAWBSuffix;
        internal DateTime mBLDate;
        internal DateTime mHBLDate;
        internal Int32 mVia1;
        internal Int32 mVia2;
        internal Int32 mVia3;
        internal Int32 mAgentID;
        internal Int64 mAgentAddressID;
        internal Int64 mAgentContactID;
        internal Int32 mShipperID;
        internal Int64 mShipperAddressID;
        internal Int64 mShipperContactID;
        internal Int32 mConsigneeID;
        internal Int64 mConsigneeAddressID;
        internal Int64 mConsigneeContactID;
        internal Int32 mIncotermID;
        internal Int32 mMoveTypeID;
        internal Int32 mCommodityID;
        internal Int32 mPOrC;
        internal Int32 mTransientTime;
        internal DateTime mOpenDate;
        internal DateTime mCloseDate;
        internal DateTime mCutOffDate;
        internal Boolean mIncludePickup;
        internal Int32 mPickupCityID;
        internal Int32 mPickupAddressID;
        internal Int32 mPOLCountryID;
        internal Int32 mPOL;
        internal Int32 mPODCountryID;
        internal Int32 mPOD;
        internal String mPickupAddress;
        internal String mDeliveryAddress;
        internal Int32 mShippingLineID;
        internal Int32 mAirlineID;
        internal Int32 mTruckerID;
        internal Boolean mIncludeDelivery;
        internal String mDeliveryZipCode;
        internal Int32 mDeliveryCityID;
        internal Int32 mDeliveryCountryID;
        internal Decimal mGrossWeight;
        internal Decimal mVolume;
        internal Decimal mChargeableWeight;
        internal Int32 mNumberOfPackages;
        internal Boolean mIsDangerousGoods;
        internal String mNotes;
        internal String mCustomerReference;
        internal Int32 mOperationStageID;
        internal Int64 mMasterOperationID;
        internal Int32 mNumberOfHousesConnected;
        internal Boolean mIsDelivered;
        internal Boolean mIsTrucking;
        internal Boolean mIsInsurance;
        internal Boolean mIsClearance;
        internal Boolean mIsGenset;
        internal Boolean mIsCourrier;
        internal String mMarksAndNumbers;
        internal Boolean mIsTelexRelease;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal String mAgreedRate;
        internal String mSupplierReference;
        internal String mPONumber;
        internal Int32 mNetworkID;
        internal Int32 mAirLineID1;
        internal String mFlightNo1;
        internal DateTime mFlightDate1;
        internal Int32 mAirLineID2;
        internal String mFlightNo2;
        internal DateTime mFlightDate2;
        internal Int32 mAirLineID3;
        internal String mFlightNo3;
        internal DateTime mFlightDate3;
        internal String mHandlingInformation;
        internal String mAmountOfInsurance;
        internal String mDeclaredValueForCarriage;
        internal Decimal mWeightCharge;
        internal Decimal mValuationCharge;
        internal Decimal mOtherChargesDueAgent;
        internal String mOtherCharges;
        internal Int32 mCurrencyID;
        internal String mAccountingInformation;
        internal String mReferenceNumber;
        internal String mOptionalShippingInformation;
        internal String mCHGSCode;
        internal String mWT_VALL_Other;
        internal String mDeclaredValueForCustoms;
        internal Int32 mTypeOfStockID;
        internal Decimal mTax;
        internal Decimal mOtherChargesDueCarrier;
        internal String mWT_VALL;
        internal String mFlightNo;
        internal String mDescription;
        internal Boolean mIsAWB;
        internal Int32 mConsigneeID2;
        internal DateTime mReleaseDate;
        internal Decimal mNetWeight;
        internal Decimal mTareWeight;
        internal Decimal mVGM;
        internal Int32 mPackageTypeID;
        internal Decimal mReleaseValue;
        internal String mPOValue;
        internal DateTime mPODate;
        internal String mReleaseNumber;
        internal String mUNOrID;
        internal String mProperShippingName;
        internal String mClassOrDivision;
        internal String mPackingGroup;
        internal String mQuantityAndTypeOfPacking;
        internal String mPackingInstruction;
        internal String mShippingDeclarationAuthorization;
        internal String mBarcode;
        internal String mGuaranteeLetterNumber;
        internal DateTime mGuaranteeLetterDate;
        internal String mGuaranteeLetterAmount;
        internal String mGuaranteeLetterSupplierInvoiceNumber;
        internal Int32 mBankAccountID;
        internal String mGuaranteeLetterNotes;
        internal String mDismissalPermissionSerial;
        internal String mDeliveryOrderSerial;
        internal Decimal mVolumetricWeight;
        internal Int32 mETAPOLAlarmStatus;
        internal Int32 mATAPOLAlarmStatus;
        internal Int32 mETDPOLAlarmStatus;
        internal Int32 mATDPOLAlarmStatus;
        internal Int32 mETAPODAlarmStatus;
        internal Int32 mATAPODAlarmStatus;
        internal Int32 mOperationManID;
        internal String mDispatchNumber;
        internal String mBusinessUnit;
        internal DateTime mShippedOnBoardDate;
        internal String mFreightPayableAt;
        internal Int32 mNumberOfOriginalBills;
        internal Boolean mIsClearanceApproved;
        internal DateTime mClearanceApprovalDate;
        internal Boolean mIsTruckingApproved;
        internal DateTime mTruckingApprovalDate;
        internal Boolean mIsFreightApproved;
        internal DateTime mFreightApprovalDate;
        internal Boolean mIsFleet;
        internal String mCertificateNumber;
        internal String mCountryOfOrigin;
        internal String mInvoiceValue;
        internal Int32 mOperationWithInvoiceSerial;
        internal String mForm13Number;
        internal String mACIDNumber;
        internal String meFBLID;
        internal Int32 meFBLStatus;
        #endregion

        #region "Methods"
        public Int64 QuotationRouteID
        {
            get { return mQuotationRouteID; }
            set { mIsChanges = true; mQuotationRouteID = value; }
        }
        public Int32 CodeSerial
        {
            get { return mCodeSerial; }
            set { mIsChanges = true; mCodeSerial = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mIsChanges = true; mBranchID = value; }
        }
        public Int32 SalesmanID
        {
            get { return mSalesmanID; }
            set { mIsChanges = true; mSalesmanID = value; }
        }
        public Int32 BLType
        {
            get { return mBLType; }
            set { mIsChanges = true; mBLType = value; }
        }
        public String BLTypeIconName
        {
            get { return mBLTypeIconName; }
            set { mIsChanges = true; mBLTypeIconName = value; }
        }
        public String BLTypeIconStyle
        {
            get { return mBLTypeIconStyle; }
            set { mIsChanges = true; mBLTypeIconStyle = value; }
        }
        public Int32 DirectionType
        {
            get { return mDirectionType; }
            set { mIsChanges = true; mDirectionType = value; }
        }
        public String DirectionIconName
        {
            get { return mDirectionIconName; }
            set { mIsChanges = true; mDirectionIconName = value; }
        }
        public String DirectionIconStyle
        {
            get { return mDirectionIconStyle; }
            set { mIsChanges = true; mDirectionIconStyle = value; }
        }
        public Int32 TransportType
        {
            get { return mTransportType; }
            set { mIsChanges = true; mTransportType = value; }
        }
        public String TransportIconName
        {
            get { return mTransportIconName; }
            set { mIsChanges = true; mTransportIconName = value; }
        }
        public String TransportIconStyle
        {
            get { return mTransportIconStyle; }
            set { mIsChanges = true; mTransportIconStyle = value; }
        }
        public Int32 ShipmentType
        {
            get { return mShipmentType; }
            set { mIsChanges = true; mShipmentType = value; }
        }
        public String HouseNumber
        {
            get { return mHouseNumber; }
            set { mIsChanges = true; mHouseNumber = value; }
        }
        public Boolean IsPackagesPlacedOnMaster
        {
            get { return mIsPackagesPlacedOnMaster; }
            set { mIsChanges = true; mIsPackagesPlacedOnMaster = value; }
        }
        public Int64 PlacedOnOperationContainersAndPackagesID
        {
            get { return mPlacedOnOperationContainersAndPackagesID; }
            set { mIsChanges = true; mPlacedOnOperationContainersAndPackagesID = value; }
        }
        public Int64 MAWBStockID
        {
            get { return mMAWBStockID; }
            set { mIsChanges = true; mMAWBStockID = value; }
        }
        public String MasterBL
        {
            get { return mMasterBL; }
            set { mIsChanges = true; mMasterBL = value; }
        }
        public String MAWBSuffix
        {
            get { return mMAWBSuffix; }
            set { mIsChanges = true; mMAWBSuffix = value; }
        }
        public DateTime BLDate
        {
            get { return mBLDate; }
            set { mIsChanges = true; mBLDate = value; }
        }
        public DateTime HBLDate
        {
            get { return mHBLDate; }
            set { mIsChanges = true; mHBLDate = value; }
        }
        public Int32 Via1
        {
            get { return mVia1; }
            set { mIsChanges = true; mVia1 = value; }
        }
        public Int32 Via2
        {
            get { return mVia2; }
            set { mIsChanges = true; mVia2 = value; }
        }
        public Int32 Via3
        {
            get { return mVia3; }
            set { mIsChanges = true; mVia3 = value; }
        }
        public Int32 AgentID
        {
            get { return mAgentID; }
            set { mIsChanges = true; mAgentID = value; }
        }
        public Int64 AgentAddressID
        {
            get { return mAgentAddressID; }
            set { mIsChanges = true; mAgentAddressID = value; }
        }
        public Int64 AgentContactID
        {
            get { return mAgentContactID; }
            set { mIsChanges = true; mAgentContactID = value; }
        }
        public Int32 ShipperID
        {
            get { return mShipperID; }
            set { mIsChanges = true; mShipperID = value; }
        }
        public Int64 ShipperAddressID
        {
            get { return mShipperAddressID; }
            set { mIsChanges = true; mShipperAddressID = value; }
        }
        public Int64 ShipperContactID
        {
            get { return mShipperContactID; }
            set { mIsChanges = true; mShipperContactID = value; }
        }
        public Int32 ConsigneeID
        {
            get { return mConsigneeID; }
            set { mIsChanges = true; mConsigneeID = value; }
        }
        public Int64 ConsigneeAddressID
        {
            get { return mConsigneeAddressID; }
            set { mIsChanges = true; mConsigneeAddressID = value; }
        }
        public Int64 ConsigneeContactID
        {
            get { return mConsigneeContactID; }
            set { mIsChanges = true; mConsigneeContactID = value; }
        }
        public Int32 IncotermID
        {
            get { return mIncotermID; }
            set { mIsChanges = true; mIncotermID = value; }
        }
        public Int32 MoveTypeID
        {
            get { return mMoveTypeID; }
            set { mIsChanges = true; mMoveTypeID = value; }
        }
        public Int32 CommodityID
        {
            get { return mCommodityID; }
            set { mIsChanges = true; mCommodityID = value; }
        }
        public Int32 POrC
        {
            get { return mPOrC; }
            set { mIsChanges = true; mPOrC = value; }
        }
        public Int32 TransientTime
        {
            get { return mTransientTime; }
            set { mIsChanges = true; mTransientTime = value; }
        }
        public DateTime OpenDate
        {
            get { return mOpenDate; }
            set { mIsChanges = true; mOpenDate = value; }
        }
        public DateTime CloseDate
        {
            get { return mCloseDate; }
            set { mIsChanges = true; mCloseDate = value; }
        }
        public DateTime CutOffDate
        {
            get { return mCutOffDate; }
            set { mIsChanges = true; mCutOffDate = value; }
        }
        public Boolean IncludePickup
        {
            get { return mIncludePickup; }
            set { mIsChanges = true; mIncludePickup = value; }
        }
        public Int32 PickupCityID
        {
            get { return mPickupCityID; }
            set { mIsChanges = true; mPickupCityID = value; }
        }
        public Int32 PickupAddressID
        {
            get { return mPickupAddressID; }
            set { mIsChanges = true; mPickupAddressID = value; }
        }
        public Int32 POLCountryID
        {
            get { return mPOLCountryID; }
            set { mIsChanges = true; mPOLCountryID = value; }
        }
        public Int32 POL
        {
            get { return mPOL; }
            set { mIsChanges = true; mPOL = value; }
        }
        public Int32 PODCountryID
        {
            get { return mPODCountryID; }
            set { mIsChanges = true; mPODCountryID = value; }
        }
        public Int32 POD
        {
            get { return mPOD; }
            set { mIsChanges = true; mPOD = value; }
        }
        public String PickupAddress
        {
            get { return mPickupAddress; }
            set { mIsChanges = true; mPickupAddress = value; }
        }
        public String DeliveryAddress
        {
            get { return mDeliveryAddress; }
            set { mIsChanges = true; mDeliveryAddress = value; }
        }
        public Int32 ShippingLineID
        {
            get { return mShippingLineID; }
            set { mIsChanges = true; mShippingLineID = value; }
        }
        public Int32 AirlineID
        {
            get { return mAirlineID; }
            set { mIsChanges = true; mAirlineID = value; }
        }
        public Int32 TruckerID
        {
            get { return mTruckerID; }
            set { mIsChanges = true; mTruckerID = value; }
        }
        public Boolean IncludeDelivery
        {
            get { return mIncludeDelivery; }
            set { mIsChanges = true; mIncludeDelivery = value; }
        }
        public String DeliveryZipCode
        {
            get { return mDeliveryZipCode; }
            set { mIsChanges = true; mDeliveryZipCode = value; }
        }
        public Int32 DeliveryCityID
        {
            get { return mDeliveryCityID; }
            set { mIsChanges = true; mDeliveryCityID = value; }
        }
        public Int32 DeliveryCountryID
        {
            get { return mDeliveryCountryID; }
            set { mIsChanges = true; mDeliveryCountryID = value; }
        }
        public Decimal GrossWeight
        {
            get { return mGrossWeight; }
            set { mIsChanges = true; mGrossWeight = value; }
        }
        public Decimal Volume
        {
            get { return mVolume; }
            set { mIsChanges = true; mVolume = value; }
        }
        public Decimal ChargeableWeight
        {
            get { return mChargeableWeight; }
            set { mIsChanges = true; mChargeableWeight = value; }
        }
        public Int32 NumberOfPackages
        {
            get { return mNumberOfPackages; }
            set { mIsChanges = true; mNumberOfPackages = value; }
        }
        public Boolean IsDangerousGoods
        {
            get { return mIsDangerousGoods; }
            set { mIsChanges = true; mIsDangerousGoods = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public String CustomerReference
        {
            get { return mCustomerReference; }
            set { mIsChanges = true; mCustomerReference = value; }
        }
        public Int32 OperationStageID
        {
            get { return mOperationStageID; }
            set { mIsChanges = true; mOperationStageID = value; }
        }
        public Int64 MasterOperationID
        {
            get { return mMasterOperationID; }
            set { mIsChanges = true; mMasterOperationID = value; }
        }
        public Int32 NumberOfHousesConnected
        {
            get { return mNumberOfHousesConnected; }
            set { mIsChanges = true; mNumberOfHousesConnected = value; }
        }
        public Boolean IsDelivered
        {
            get { return mIsDelivered; }
            set { mIsChanges = true; mIsDelivered = value; }
        }
        public Boolean IsTrucking
        {
            get { return mIsTrucking; }
            set { mIsChanges = true; mIsTrucking = value; }
        }
        public Boolean IsInsurance
        {
            get { return mIsInsurance; }
            set { mIsChanges = true; mIsInsurance = value; }
        }
        public Boolean IsClearance
        {
            get { return mIsClearance; }
            set { mIsChanges = true; mIsClearance = value; }
        }
        public Boolean IsGenset
        {
            get { return mIsGenset; }
            set { mIsChanges = true; mIsGenset = value; }
        }
        public Boolean IsCourrier
        {
            get { return mIsCourrier; }
            set { mIsChanges = true; mIsCourrier = value; }
        }
        public String MarksAndNumbers
        {
            get { return mMarksAndNumbers; }
            set { mIsChanges = true; mMarksAndNumbers = value; }
        }
        public Boolean IsTelexRelease
        {
            get { return mIsTelexRelease; }
            set { mIsChanges = true; mIsTelexRelease = value; }
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
        public String AgreedRate
        {
            get { return mAgreedRate; }
            set { mIsChanges = true; mAgreedRate = value; }
        }
        public String SupplierReference
        {
            get { return mSupplierReference; }
            set { mIsChanges = true; mSupplierReference = value; }
        }
        public String PONumber
        {
            get { return mPONumber; }
            set { mIsChanges = true; mPONumber = value; }
        }
        public Int32 NetworkID
        {
            get { return mNetworkID; }
            set { mIsChanges = true; mNetworkID = value; }
        }
        public Int32 AirLineID1
        {
            get { return mAirLineID1; }
            set { mIsChanges = true; mAirLineID1 = value; }
        }
        public String FlightNo1
        {
            get { return mFlightNo1; }
            set { mIsChanges = true; mFlightNo1 = value; }
        }
        public DateTime FlightDate1
        {
            get { return mFlightDate1; }
            set { mIsChanges = true; mFlightDate1 = value; }
        }
        public Int32 AirLineID2
        {
            get { return mAirLineID2; }
            set { mIsChanges = true; mAirLineID2 = value; }
        }
        public String FlightNo2
        {
            get { return mFlightNo2; }
            set { mIsChanges = true; mFlightNo2 = value; }
        }
        public DateTime FlightDate2
        {
            get { return mFlightDate2; }
            set { mIsChanges = true; mFlightDate2 = value; }
        }
        public Int32 AirLineID3
        {
            get { return mAirLineID3; }
            set { mIsChanges = true; mAirLineID3 = value; }
        }
        public String FlightNo3
        {
            get { return mFlightNo3; }
            set { mIsChanges = true; mFlightNo3 = value; }
        }
        public DateTime FlightDate3
        {
            get { return mFlightDate3; }
            set { mIsChanges = true; mFlightDate3 = value; }
        }
        public String HandlingInformation
        {
            get { return mHandlingInformation; }
            set { mIsChanges = true; mHandlingInformation = value; }
        }
        public String AmountOfInsurance
        {
            get { return mAmountOfInsurance; }
            set { mIsChanges = true; mAmountOfInsurance = value; }
        }
        public String DeclaredValueForCarriage
        {
            get { return mDeclaredValueForCarriage; }
            set { mIsChanges = true; mDeclaredValueForCarriage = value; }
        }
        public Decimal WeightCharge
        {
            get { return mWeightCharge; }
            set { mIsChanges = true; mWeightCharge = value; }
        }
        public Decimal ValuationCharge
        {
            get { return mValuationCharge; }
            set { mIsChanges = true; mValuationCharge = value; }
        }
        public Decimal OtherChargesDueAgent
        {
            get { return mOtherChargesDueAgent; }
            set { mIsChanges = true; mOtherChargesDueAgent = value; }
        }
        public String OtherCharges
        {
            get { return mOtherCharges; }
            set { mIsChanges = true; mOtherCharges = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public String AccountingInformation
        {
            get { return mAccountingInformation; }
            set { mIsChanges = true; mAccountingInformation = value; }
        }
        public String ReferenceNumber
        {
            get { return mReferenceNumber; }
            set { mIsChanges = true; mReferenceNumber = value; }
        }
        public String OptionalShippingInformation
        {
            get { return mOptionalShippingInformation; }
            set { mIsChanges = true; mOptionalShippingInformation = value; }
        }
        public String CHGSCode
        {
            get { return mCHGSCode; }
            set { mIsChanges = true; mCHGSCode = value; }
        }
        public String WT_VALL_Other
        {
            get { return mWT_VALL_Other; }
            set { mIsChanges = true; mWT_VALL_Other = value; }
        }
        public String DeclaredValueForCustoms
        {
            get { return mDeclaredValueForCustoms; }
            set { mIsChanges = true; mDeclaredValueForCustoms = value; }
        }
        public Int32 TypeOfStockID
        {
            get { return mTypeOfStockID; }
            set { mIsChanges = true; mTypeOfStockID = value; }
        }
        public Decimal Tax
        {
            get { return mTax; }
            set { mIsChanges = true; mTax = value; }
        }
        public Decimal OtherChargesDueCarrier
        {
            get { return mOtherChargesDueCarrier; }
            set { mIsChanges = true; mOtherChargesDueCarrier = value; }
        }
        public String WT_VALL
        {
            get { return mWT_VALL; }
            set { mIsChanges = true; mWT_VALL = value; }
        }
        public String FlightNo
        {
            get { return mFlightNo; }
            set { mIsChanges = true; mFlightNo = value; }
        }
        public String Description
        {
            get { return mDescription; }
            set { mIsChanges = true; mDescription = value; }
        }
        public Boolean IsAWB
        {
            get { return mIsAWB; }
            set { mIsChanges = true; mIsAWB = value; }
        }
        public Int32 ConsigneeID2
        {
            get { return mConsigneeID2; }
            set { mIsChanges = true; mConsigneeID2 = value; }
        }
        public DateTime ReleaseDate
        {
            get { return mReleaseDate; }
            set { mIsChanges = true; mReleaseDate = value; }
        }
        public Decimal NetWeight
        {
            get { return mNetWeight; }
            set { mIsChanges = true; mNetWeight = value; }
        }
        public Decimal TareWeight
        {
            get { return mTareWeight; }
            set { mIsChanges = true; mTareWeight = value; }
        }
        public Decimal VGM
        {
            get { return mVGM; }
            set { mIsChanges = true; mVGM = value; }
        }
        public Int32 PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mIsChanges = true; mPackageTypeID = value; }
        }
        public Decimal ReleaseValue
        {
            get { return mReleaseValue; }
            set { mIsChanges = true; mReleaseValue = value; }
        }
        public String POValue
        {
            get { return mPOValue; }
            set { mIsChanges = true; mPOValue = value; }
        }
        public DateTime PODate
        {
            get { return mPODate; }
            set { mIsChanges = true; mPODate = value; }
        }
        public String ReleaseNumber
        {
            get { return mReleaseNumber; }
            set { mIsChanges = true; mReleaseNumber = value; }
        }
        public String UNOrID
        {
            get { return mUNOrID; }
            set { mIsChanges = true; mUNOrID = value; }
        }
        public String ProperShippingName
        {
            get { return mProperShippingName; }
            set { mIsChanges = true; mProperShippingName = value; }
        }
        public String ClassOrDivision
        {
            get { return mClassOrDivision; }
            set { mIsChanges = true; mClassOrDivision = value; }
        }
        public String PackingGroup
        {
            get { return mPackingGroup; }
            set { mIsChanges = true; mPackingGroup = value; }
        }
        public String QuantityAndTypeOfPacking
        {
            get { return mQuantityAndTypeOfPacking; }
            set { mIsChanges = true; mQuantityAndTypeOfPacking = value; }
        }
        public String PackingInstruction
        {
            get { return mPackingInstruction; }
            set { mIsChanges = true; mPackingInstruction = value; }
        }
        public String ShippingDeclarationAuthorization
        {
            get { return mShippingDeclarationAuthorization; }
            set { mIsChanges = true; mShippingDeclarationAuthorization = value; }
        }
        public String Barcode
        {
            get { return mBarcode; }
            set { mIsChanges = true; mBarcode = value; }
        }
        public String GuaranteeLetterNumber
        {
            get { return mGuaranteeLetterNumber; }
            set { mIsChanges = true; mGuaranteeLetterNumber = value; }
        }
        public DateTime GuaranteeLetterDate
        {
            get { return mGuaranteeLetterDate; }
            set { mIsChanges = true; mGuaranteeLetterDate = value; }
        }
        public String GuaranteeLetterAmount
        {
            get { return mGuaranteeLetterAmount; }
            set { mIsChanges = true; mGuaranteeLetterAmount = value; }
        }
        public String GuaranteeLetterSupplierInvoiceNumber
        {
            get { return mGuaranteeLetterSupplierInvoiceNumber; }
            set { mIsChanges = true; mGuaranteeLetterSupplierInvoiceNumber = value; }
        }
        public Int32 BankAccountID
        {
            get { return mBankAccountID; }
            set { mIsChanges = true; mBankAccountID = value; }
        }
        public String GuaranteeLetterNotes
        {
            get { return mGuaranteeLetterNotes; }
            set { mIsChanges = true; mGuaranteeLetterNotes = value; }
        }
        public String DismissalPermissionSerial
        {
            get { return mDismissalPermissionSerial; }
            set { mIsChanges = true; mDismissalPermissionSerial = value; }
        }
        public String DeliveryOrderSerial
        {
            get { return mDeliveryOrderSerial; }
            set { mIsChanges = true; mDeliveryOrderSerial = value; }
        }
        public Decimal VolumetricWeight
        {
            get { return mVolumetricWeight; }
            set { mIsChanges = true; mVolumetricWeight = value; }
        }
        public Int32 ETAPOLAlarmStatus
        {
            get { return mETAPOLAlarmStatus; }
            set { mIsChanges = true; mETAPOLAlarmStatus = value; }
        }
        public Int32 ATAPOLAlarmStatus
        {
            get { return mATAPOLAlarmStatus; }
            set { mIsChanges = true; mATAPOLAlarmStatus = value; }
        }
        public Int32 ETDPOLAlarmStatus
        {
            get { return mETDPOLAlarmStatus; }
            set { mIsChanges = true; mETDPOLAlarmStatus = value; }
        }
        public Int32 ATDPOLAlarmStatus
        {
            get { return mATDPOLAlarmStatus; }
            set { mIsChanges = true; mATDPOLAlarmStatus = value; }
        }
        public Int32 ETAPODAlarmStatus
        {
            get { return mETAPODAlarmStatus; }
            set { mIsChanges = true; mETAPODAlarmStatus = value; }
        }
        public Int32 ATAPODAlarmStatus
        {
            get { return mATAPODAlarmStatus; }
            set { mIsChanges = true; mATAPODAlarmStatus = value; }
        }
        public Int32 OperationManID
        {
            get { return mOperationManID; }
            set { mIsChanges = true; mOperationManID = value; }
        }
        public String DispatchNumber
        {
            get { return mDispatchNumber; }
            set { mIsChanges = true; mDispatchNumber = value; }
        }
        public String BusinessUnit
        {
            get { return mBusinessUnit; }
            set { mIsChanges = true; mBusinessUnit = value; }
        }
        public DateTime ShippedOnBoardDate
        {
            get { return mShippedOnBoardDate; }
            set { mIsChanges = true; mShippedOnBoardDate = value; }
        }
        public String FreightPayableAt
        {
            get { return mFreightPayableAt; }
            set { mIsChanges = true; mFreightPayableAt = value; }
        }
        public Int32 NumberOfOriginalBills
        {
            get { return mNumberOfOriginalBills; }
            set { mIsChanges = true; mNumberOfOriginalBills = value; }
        }
        public Boolean IsClearanceApproved
        {
            get { return mIsClearanceApproved; }
            set { mIsChanges = true; mIsClearanceApproved = value; }
        }
        public DateTime ClearanceApprovalDate
        {
            get { return mClearanceApprovalDate; }
            set { mIsChanges = true; mClearanceApprovalDate = value; }
        }
        public Boolean IsTruckingApproved
        {
            get { return mIsTruckingApproved; }
            set { mIsChanges = true; mIsTruckingApproved = value; }
        }
        public DateTime TruckingApprovalDate
        {
            get { return mTruckingApprovalDate; }
            set { mIsChanges = true; mTruckingApprovalDate = value; }
        }
        public Boolean IsFreightApproved
        {
            get { return mIsFreightApproved; }
            set { mIsChanges = true; mIsFreightApproved = value; }
        }
        public DateTime FreightApprovalDate
        {
            get { return mFreightApprovalDate; }
            set { mIsChanges = true; mFreightApprovalDate = value; }
        }
        public Boolean IsFleet
        {
            get { return mIsFleet; }
            set { mIsChanges = true; mIsFleet = value; }
        }
        public String CertificateNumber
        {
            get { return mCertificateNumber; }
            set { mIsChanges = true; mCertificateNumber = value; }
        }
        public String CountryOfOrigin
        {
            get { return mCountryOfOrigin; }
            set { mIsChanges = true; mCountryOfOrigin = value; }
        }
        public String InvoiceValue
        {
            get { return mInvoiceValue; }
            set { mIsChanges = true; mInvoiceValue = value; }
        }
        public Int32 OperationWithInvoiceSerial
        {
            get { return mOperationWithInvoiceSerial; }
            set { mIsChanges = true; mOperationWithInvoiceSerial = value; }
        }
        public String Form13Number
        {
            get { return mForm13Number; }
            set { mIsChanges = true; mForm13Number = value; }
        }
        public String ACIDNumber
        {
            get { return mACIDNumber; }
            set { mIsChanges = true; mACIDNumber = value; }
        }
        public String eFBLID
        {
            get { return meFBLID; }
            set { mIsChanges = true; meFBLID = value; }
        }
        public Int32 eFBLStatus
        {
            get { return meFBLStatus; }
            set { mIsChanges = true; meFBLStatus = value; }
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

    public partial class COperationsTAX
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
        public List<CVarOperationsTAX> lstCVarOperations = new List<CVarOperationsTAX>();
        public List<CPKOperationsTAX> lstDeletedCPKOperations = new List<CPKOperationsTAX>();
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
            lstCVarOperations.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListOperationsTax";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemOperationsTax";
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
                        CVarOperationsTAX ObjCVarOperations = new CVarOperationsTAX();
                        ObjCVarOperations.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarOperations.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarOperations.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
                        ObjCVarOperations.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarOperations.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarOperations.mSalesmanID = Convert.ToInt32(dr["SalesmanID"].ToString());
                        ObjCVarOperations.mBLType = Convert.ToInt32(dr["BLType"].ToString());
                        ObjCVarOperations.mBLTypeIconName = Convert.ToString(dr["BLTypeIconName"].ToString());
                        ObjCVarOperations.mBLTypeIconStyle = Convert.ToString(dr["BLTypeIconStyle"].ToString());
                        ObjCVarOperations.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarOperations.mDirectionIconName = Convert.ToString(dr["DirectionIconName"].ToString());
                        ObjCVarOperations.mDirectionIconStyle = Convert.ToString(dr["DirectionIconStyle"].ToString());
                        ObjCVarOperations.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
                        ObjCVarOperations.mTransportIconName = Convert.ToString(dr["TransportIconName"].ToString());
                        ObjCVarOperations.mTransportIconStyle = Convert.ToString(dr["TransportIconStyle"].ToString());
                        ObjCVarOperations.mShipmentType = Convert.ToInt32(dr["ShipmentType"].ToString());
                        ObjCVarOperations.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarOperations.mIsPackagesPlacedOnMaster = Convert.ToBoolean(dr["IsPackagesPlacedOnMaster"].ToString());
                        ObjCVarOperations.mPlacedOnOperationContainersAndPackagesID = Convert.ToInt64(dr["PlacedOnOperationContainersAndPackagesID"].ToString());
                        ObjCVarOperations.mMAWBStockID = Convert.ToInt64(dr["MAWBStockID"].ToString());
                        ObjCVarOperations.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarOperations.mMAWBSuffix = Convert.ToString(dr["MAWBSuffix"].ToString());
                        ObjCVarOperations.mBLDate = Convert.ToDateTime(dr["BLDate"].ToString());
                        ObjCVarOperations.mHBLDate = Convert.ToDateTime(dr["HBLDate"].ToString());
                        ObjCVarOperations.mVia1 = Convert.ToInt32(dr["Via1"].ToString());
                        ObjCVarOperations.mVia2 = Convert.ToInt32(dr["Via2"].ToString());
                        ObjCVarOperations.mVia3 = Convert.ToInt32(dr["Via3"].ToString());
                        ObjCVarOperations.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarOperations.mAgentAddressID = Convert.ToInt64(dr["AgentAddressID"].ToString());
                        ObjCVarOperations.mAgentContactID = Convert.ToInt64(dr["AgentContactID"].ToString());
                        ObjCVarOperations.mShipperID = Convert.ToInt32(dr["ShipperID"].ToString());
                        ObjCVarOperations.mShipperAddressID = Convert.ToInt64(dr["ShipperAddressID"].ToString());
                        ObjCVarOperations.mShipperContactID = Convert.ToInt64(dr["ShipperContactID"].ToString());
                        ObjCVarOperations.mConsigneeID = Convert.ToInt32(dr["ConsigneeID"].ToString());
                        ObjCVarOperations.mConsigneeAddressID = Convert.ToInt64(dr["ConsigneeAddressID"].ToString());
                        ObjCVarOperations.mConsigneeContactID = Convert.ToInt64(dr["ConsigneeContactID"].ToString());
                        ObjCVarOperations.mIncotermID = Convert.ToInt32(dr["IncotermID"].ToString());
                        ObjCVarOperations.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarOperations.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarOperations.mPOrC = Convert.ToInt32(dr["POrC"].ToString());
                        ObjCVarOperations.mTransientTime = Convert.ToInt32(dr["TransientTime"].ToString());
                        ObjCVarOperations.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        ObjCVarOperations.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarOperations.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarOperations.mIncludePickup = Convert.ToBoolean(dr["IncludePickup"].ToString());
                        ObjCVarOperations.mPickupCityID = Convert.ToInt32(dr["PickupCityID"].ToString());
                        ObjCVarOperations.mPickupAddressID = Convert.ToInt32(dr["PickupAddressID"].ToString());
                        ObjCVarOperations.mPOLCountryID = Convert.ToInt32(dr["POLCountryID"].ToString());
                        ObjCVarOperations.mPOL = Convert.ToInt32(dr["POL"].ToString());
                        ObjCVarOperations.mPODCountryID = Convert.ToInt32(dr["PODCountryID"].ToString());
                        ObjCVarOperations.mPOD = Convert.ToInt32(dr["POD"].ToString());
                        ObjCVarOperations.mPickupAddress = Convert.ToString(dr["PickupAddress"].ToString());
                        ObjCVarOperations.mDeliveryAddress = Convert.ToString(dr["DeliveryAddress"].ToString());
                        ObjCVarOperations.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarOperations.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarOperations.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarOperations.mIncludeDelivery = Convert.ToBoolean(dr["IncludeDelivery"].ToString());
                        ObjCVarOperations.mDeliveryZipCode = Convert.ToString(dr["DeliveryZipCode"].ToString());
                        ObjCVarOperations.mDeliveryCityID = Convert.ToInt32(dr["DeliveryCityID"].ToString());
                        ObjCVarOperations.mDeliveryCountryID = Convert.ToInt32(dr["DeliveryCountryID"].ToString());
                        ObjCVarOperations.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarOperations.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarOperations.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
                        ObjCVarOperations.mNumberOfPackages = Convert.ToInt32(dr["NumberOfPackages"].ToString());
                        ObjCVarOperations.mIsDangerousGoods = Convert.ToBoolean(dr["IsDangerousGoods"].ToString());
                        ObjCVarOperations.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarOperations.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
                        ObjCVarOperations.mOperationStageID = Convert.ToInt32(dr["OperationStageID"].ToString());
                        ObjCVarOperations.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarOperations.mNumberOfHousesConnected = Convert.ToInt32(dr["NumberOfHousesConnected"].ToString());
                        ObjCVarOperations.mIsDelivered = Convert.ToBoolean(dr["IsDelivered"].ToString());
                        ObjCVarOperations.mIsTrucking = Convert.ToBoolean(dr["IsTrucking"].ToString());
                        ObjCVarOperations.mIsInsurance = Convert.ToBoolean(dr["IsInsurance"].ToString());
                        ObjCVarOperations.mIsClearance = Convert.ToBoolean(dr["IsClearance"].ToString());
                        ObjCVarOperations.mIsGenset = Convert.ToBoolean(dr["IsGenset"].ToString());
                        ObjCVarOperations.mIsCourrier = Convert.ToBoolean(dr["IsCourrier"].ToString());
                        ObjCVarOperations.mMarksAndNumbers = Convert.ToString(dr["MarksAndNumbers"].ToString());
                        ObjCVarOperations.mIsTelexRelease = Convert.ToBoolean(dr["IsTelexRelease"].ToString());
                        ObjCVarOperations.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarOperations.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarOperations.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarOperations.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarOperations.mAgreedRate = Convert.ToString(dr["AgreedRate"].ToString());
                        ObjCVarOperations.mSupplierReference = Convert.ToString(dr["SupplierReference"].ToString());
                        ObjCVarOperations.mPONumber = Convert.ToString(dr["PONumber"].ToString());
                        ObjCVarOperations.mNetworkID = Convert.ToInt32(dr["NetworkID"].ToString());
                        ObjCVarOperations.mAirLineID1 = Convert.ToInt32(dr["AirLineID1"].ToString());
                        ObjCVarOperations.mFlightNo1 = Convert.ToString(dr["FlightNo1"].ToString());
                        ObjCVarOperations.mFlightDate1 = Convert.ToDateTime(dr["FlightDate1"].ToString());
                        ObjCVarOperations.mAirLineID2 = Convert.ToInt32(dr["AirLineID2"].ToString());
                        ObjCVarOperations.mFlightNo2 = Convert.ToString(dr["FlightNo2"].ToString());
                        ObjCVarOperations.mFlightDate2 = Convert.ToDateTime(dr["FlightDate2"].ToString());
                        ObjCVarOperations.mAirLineID3 = Convert.ToInt32(dr["AirLineID3"].ToString());
                        ObjCVarOperations.mFlightNo3 = Convert.ToString(dr["FlightNo3"].ToString());
                        ObjCVarOperations.mFlightDate3 = Convert.ToDateTime(dr["FlightDate3"].ToString());
                        ObjCVarOperations.mHandlingInformation = Convert.ToString(dr["HandlingInformation"].ToString());
                        ObjCVarOperations.mAmountOfInsurance = Convert.ToString(dr["AmountOfInsurance"].ToString());
                        ObjCVarOperations.mDeclaredValueForCarriage = Convert.ToString(dr["DeclaredValueForCarriage"].ToString());
                        ObjCVarOperations.mWeightCharge = Convert.ToDecimal(dr["WeightCharge"].ToString());
                        ObjCVarOperations.mValuationCharge = Convert.ToDecimal(dr["ValuationCharge"].ToString());
                        ObjCVarOperations.mOtherChargesDueAgent = Convert.ToDecimal(dr["OtherChargesDueAgent"].ToString());
                        ObjCVarOperations.mOtherCharges = Convert.ToString(dr["OtherCharges"].ToString());
                        ObjCVarOperations.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarOperations.mAccountingInformation = Convert.ToString(dr["AccountingInformation"].ToString());
                        ObjCVarOperations.mReferenceNumber = Convert.ToString(dr["ReferenceNumber"].ToString());
                        ObjCVarOperations.mOptionalShippingInformation = Convert.ToString(dr["OptionalShippingInformation"].ToString());
                        ObjCVarOperations.mCHGSCode = Convert.ToString(dr["CHGSCode"].ToString());
                        ObjCVarOperations.mWT_VALL_Other = Convert.ToString(dr["WT_VALL_Other"].ToString());
                        ObjCVarOperations.mDeclaredValueForCustoms = Convert.ToString(dr["DeclaredValueForCustoms"].ToString());
                        ObjCVarOperations.mTypeOfStockID = Convert.ToInt32(dr["TypeOfStockID"].ToString());
                        ObjCVarOperations.mTax = Convert.ToDecimal(dr["Tax"].ToString());
                        ObjCVarOperations.mOtherChargesDueCarrier = Convert.ToDecimal(dr["OtherChargesDueCarrier"].ToString());
                        ObjCVarOperations.mWT_VALL = Convert.ToString(dr["WT_VALL"].ToString());
                        ObjCVarOperations.mFlightNo = Convert.ToString(dr["FlightNo"].ToString());
                        ObjCVarOperations.mDescription = Convert.ToString(dr["Description"].ToString());
                        ObjCVarOperations.mIsAWB = Convert.ToBoolean(dr["IsAWB"].ToString());
                        ObjCVarOperations.mConsigneeID2 = Convert.ToInt32(dr["ConsigneeID2"].ToString());
                        ObjCVarOperations.mReleaseDate = Convert.ToDateTime(dr["ReleaseDate"].ToString());
                        ObjCVarOperations.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarOperations.mTareWeight = Convert.ToDecimal(dr["TareWeight"].ToString());
                        ObjCVarOperations.mVGM = Convert.ToDecimal(dr["VGM"].ToString());
                        ObjCVarOperations.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarOperations.mReleaseValue = Convert.ToDecimal(dr["ReleaseValue"].ToString());
                        ObjCVarOperations.mPOValue = Convert.ToString(dr["POValue"].ToString());
                        ObjCVarOperations.mPODate = Convert.ToDateTime(dr["PODate"].ToString());
                        ObjCVarOperations.mReleaseNumber = Convert.ToString(dr["ReleaseNumber"].ToString());
                        ObjCVarOperations.mUNOrID = Convert.ToString(dr["UNOrID"].ToString());
                        ObjCVarOperations.mProperShippingName = Convert.ToString(dr["ProperShippingName"].ToString());
                        ObjCVarOperations.mClassOrDivision = Convert.ToString(dr["ClassOrDivision"].ToString());
                        ObjCVarOperations.mPackingGroup = Convert.ToString(dr["PackingGroup"].ToString());
                        ObjCVarOperations.mQuantityAndTypeOfPacking = Convert.ToString(dr["QuantityAndTypeOfPacking"].ToString());
                        ObjCVarOperations.mPackingInstruction = Convert.ToString(dr["PackingInstruction"].ToString());
                        ObjCVarOperations.mShippingDeclarationAuthorization = Convert.ToString(dr["ShippingDeclarationAuthorization"].ToString());
                        ObjCVarOperations.mBarcode = Convert.ToString(dr["Barcode"].ToString());
                        ObjCVarOperations.mGuaranteeLetterNumber = Convert.ToString(dr["GuaranteeLetterNumber"].ToString());
                        ObjCVarOperations.mGuaranteeLetterDate = Convert.ToDateTime(dr["GuaranteeLetterDate"].ToString());
                        ObjCVarOperations.mGuaranteeLetterAmount = Convert.ToString(dr["GuaranteeLetterAmount"].ToString());
                        ObjCVarOperations.mGuaranteeLetterSupplierInvoiceNumber = Convert.ToString(dr["GuaranteeLetterSupplierInvoiceNumber"].ToString());
                        ObjCVarOperations.mBankAccountID = Convert.ToInt32(dr["BankAccountID"].ToString());
                        ObjCVarOperations.mGuaranteeLetterNotes = Convert.ToString(dr["GuaranteeLetterNotes"].ToString());
                        ObjCVarOperations.mDismissalPermissionSerial = Convert.ToString(dr["DismissalPermissionSerial"].ToString());
                        ObjCVarOperations.mDeliveryOrderSerial = Convert.ToString(dr["DeliveryOrderSerial"].ToString());
                        ObjCVarOperations.mVolumetricWeight = Convert.ToDecimal(dr["VolumetricWeight"].ToString());
                        ObjCVarOperations.mETAPOLAlarmStatus = Convert.ToInt32(dr["ETAPOLAlarmStatus"].ToString());
                        ObjCVarOperations.mATAPOLAlarmStatus = Convert.ToInt32(dr["ATAPOLAlarmStatus"].ToString());
                        ObjCVarOperations.mETDPOLAlarmStatus = Convert.ToInt32(dr["ETDPOLAlarmStatus"].ToString());
                        ObjCVarOperations.mATDPOLAlarmStatus = Convert.ToInt32(dr["ATDPOLAlarmStatus"].ToString());
                        ObjCVarOperations.mETAPODAlarmStatus = Convert.ToInt32(dr["ETAPODAlarmStatus"].ToString());
                        ObjCVarOperations.mATAPODAlarmStatus = Convert.ToInt32(dr["ATAPODAlarmStatus"].ToString());
                        ObjCVarOperations.mOperationManID = Convert.ToInt32(dr["OperationManID"].ToString());
                        ObjCVarOperations.mDispatchNumber = Convert.ToString(dr["DispatchNumber"].ToString());
                        ObjCVarOperations.mBusinessUnit = Convert.ToString(dr["BusinessUnit"].ToString());
                        ObjCVarOperations.mShippedOnBoardDate = Convert.ToDateTime(dr["ShippedOnBoardDate"].ToString());
                        ObjCVarOperations.mFreightPayableAt = Convert.ToString(dr["FreightPayableAt"].ToString());
                        ObjCVarOperations.mNumberOfOriginalBills = Convert.ToInt32(dr["NumberOfOriginalBills"].ToString());
                        ObjCVarOperations.mIsClearanceApproved = Convert.ToBoolean(dr["IsClearanceApproved"].ToString());
                        ObjCVarOperations.mClearanceApprovalDate = Convert.ToDateTime(dr["ClearanceApprovalDate"].ToString());
                        ObjCVarOperations.mIsTruckingApproved = Convert.ToBoolean(dr["IsTruckingApproved"].ToString());
                        ObjCVarOperations.mTruckingApprovalDate = Convert.ToDateTime(dr["TruckingApprovalDate"].ToString());
                        ObjCVarOperations.mIsFreightApproved = Convert.ToBoolean(dr["IsFreightApproved"].ToString());
                        ObjCVarOperations.mFreightApprovalDate = Convert.ToDateTime(dr["FreightApprovalDate"].ToString());
                        ObjCVarOperations.mIsFleet = Convert.ToBoolean(dr["IsFleet"].ToString());
                        ObjCVarOperations.mCertificateNumber = Convert.ToString(dr["CertificateNumber"].ToString());
                        ObjCVarOperations.mCountryOfOrigin = Convert.ToString(dr["CountryOfOrigin"].ToString());
                        ObjCVarOperations.mInvoiceValue = Convert.ToString(dr["InvoiceValue"].ToString());
                        ObjCVarOperations.mOperationWithInvoiceSerial = Convert.ToInt32(dr["OperationWithInvoiceSerial"].ToString());
                        ObjCVarOperations.mForm13Number = Convert.ToString(dr["Form13Number"].ToString());
                        ObjCVarOperations.mACIDNumber = Convert.ToString(dr["ACIDNumber"].ToString());
                        ObjCVarOperations.meFBLID = Convert.ToString(dr["eFBLID"].ToString());
                        ObjCVarOperations.meFBLStatus = Convert.ToInt32(dr["eFBLStatus"].ToString());
                        lstCVarOperations.Add(ObjCVarOperations);
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
            lstCVarOperations.Clear();

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
                Com.CommandText = "[dbo].GetListPagingOperations";
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
                        CVarOperationsTAX ObjCVarOperations = new CVarOperationsTAX();
                        ObjCVarOperations.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarOperations.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarOperations.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
                        ObjCVarOperations.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarOperations.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarOperations.mSalesmanID = Convert.ToInt32(dr["SalesmanID"].ToString());
                        ObjCVarOperations.mBLType = Convert.ToInt32(dr["BLType"].ToString());
                        ObjCVarOperations.mBLTypeIconName = Convert.ToString(dr["BLTypeIconName"].ToString());
                        ObjCVarOperations.mBLTypeIconStyle = Convert.ToString(dr["BLTypeIconStyle"].ToString());
                        ObjCVarOperations.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarOperations.mDirectionIconName = Convert.ToString(dr["DirectionIconName"].ToString());
                        ObjCVarOperations.mDirectionIconStyle = Convert.ToString(dr["DirectionIconStyle"].ToString());
                        ObjCVarOperations.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
                        ObjCVarOperations.mTransportIconName = Convert.ToString(dr["TransportIconName"].ToString());
                        ObjCVarOperations.mTransportIconStyle = Convert.ToString(dr["TransportIconStyle"].ToString());
                        ObjCVarOperations.mShipmentType = Convert.ToInt32(dr["ShipmentType"].ToString());
                        ObjCVarOperations.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarOperations.mIsPackagesPlacedOnMaster = Convert.ToBoolean(dr["IsPackagesPlacedOnMaster"].ToString());
                        ObjCVarOperations.mPlacedOnOperationContainersAndPackagesID = Convert.ToInt64(dr["PlacedOnOperationContainersAndPackagesID"].ToString());
                        ObjCVarOperations.mMAWBStockID = Convert.ToInt64(dr["MAWBStockID"].ToString());
                        ObjCVarOperations.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarOperations.mMAWBSuffix = Convert.ToString(dr["MAWBSuffix"].ToString());
                        ObjCVarOperations.mBLDate = Convert.ToDateTime(dr["BLDate"].ToString());
                        ObjCVarOperations.mHBLDate = Convert.ToDateTime(dr["HBLDate"].ToString());
                        ObjCVarOperations.mVia1 = Convert.ToInt32(dr["Via1"].ToString());
                        ObjCVarOperations.mVia2 = Convert.ToInt32(dr["Via2"].ToString());
                        ObjCVarOperations.mVia3 = Convert.ToInt32(dr["Via3"].ToString());
                        ObjCVarOperations.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarOperations.mAgentAddressID = Convert.ToInt64(dr["AgentAddressID"].ToString());
                        ObjCVarOperations.mAgentContactID = Convert.ToInt64(dr["AgentContactID"].ToString());
                        ObjCVarOperations.mShipperID = Convert.ToInt32(dr["ShipperID"].ToString());
                        ObjCVarOperations.mShipperAddressID = Convert.ToInt64(dr["ShipperAddressID"].ToString());
                        ObjCVarOperations.mShipperContactID = Convert.ToInt64(dr["ShipperContactID"].ToString());
                        ObjCVarOperations.mConsigneeID = Convert.ToInt32(dr["ConsigneeID"].ToString());
                        ObjCVarOperations.mConsigneeAddressID = Convert.ToInt64(dr["ConsigneeAddressID"].ToString());
                        ObjCVarOperations.mConsigneeContactID = Convert.ToInt64(dr["ConsigneeContactID"].ToString());
                        ObjCVarOperations.mIncotermID = Convert.ToInt32(dr["IncotermID"].ToString());
                        ObjCVarOperations.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarOperations.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarOperations.mPOrC = Convert.ToInt32(dr["POrC"].ToString());
                        ObjCVarOperations.mTransientTime = Convert.ToInt32(dr["TransientTime"].ToString());
                        ObjCVarOperations.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        ObjCVarOperations.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarOperations.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarOperations.mIncludePickup = Convert.ToBoolean(dr["IncludePickup"].ToString());
                        ObjCVarOperations.mPickupCityID = Convert.ToInt32(dr["PickupCityID"].ToString());
                        ObjCVarOperations.mPickupAddressID = Convert.ToInt32(dr["PickupAddressID"].ToString());
                        ObjCVarOperations.mPOLCountryID = Convert.ToInt32(dr["POLCountryID"].ToString());
                        ObjCVarOperations.mPOL = Convert.ToInt32(dr["POL"].ToString());
                        ObjCVarOperations.mPODCountryID = Convert.ToInt32(dr["PODCountryID"].ToString());
                        ObjCVarOperations.mPOD = Convert.ToInt32(dr["POD"].ToString());
                        ObjCVarOperations.mPickupAddress = Convert.ToString(dr["PickupAddress"].ToString());
                        ObjCVarOperations.mDeliveryAddress = Convert.ToString(dr["DeliveryAddress"].ToString());
                        ObjCVarOperations.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarOperations.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarOperations.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarOperations.mIncludeDelivery = Convert.ToBoolean(dr["IncludeDelivery"].ToString());
                        ObjCVarOperations.mDeliveryZipCode = Convert.ToString(dr["DeliveryZipCode"].ToString());
                        ObjCVarOperations.mDeliveryCityID = Convert.ToInt32(dr["DeliveryCityID"].ToString());
                        ObjCVarOperations.mDeliveryCountryID = Convert.ToInt32(dr["DeliveryCountryID"].ToString());
                        ObjCVarOperations.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarOperations.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarOperations.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
                        ObjCVarOperations.mNumberOfPackages = Convert.ToInt32(dr["NumberOfPackages"].ToString());
                        ObjCVarOperations.mIsDangerousGoods = Convert.ToBoolean(dr["IsDangerousGoods"].ToString());
                        ObjCVarOperations.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarOperations.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
                        ObjCVarOperations.mOperationStageID = Convert.ToInt32(dr["OperationStageID"].ToString());
                        ObjCVarOperations.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarOperations.mNumberOfHousesConnected = Convert.ToInt32(dr["NumberOfHousesConnected"].ToString());
                        ObjCVarOperations.mIsDelivered = Convert.ToBoolean(dr["IsDelivered"].ToString());
                        ObjCVarOperations.mIsTrucking = Convert.ToBoolean(dr["IsTrucking"].ToString());
                        ObjCVarOperations.mIsInsurance = Convert.ToBoolean(dr["IsInsurance"].ToString());
                        ObjCVarOperations.mIsClearance = Convert.ToBoolean(dr["IsClearance"].ToString());
                        ObjCVarOperations.mIsGenset = Convert.ToBoolean(dr["IsGenset"].ToString());
                        ObjCVarOperations.mIsCourrier = Convert.ToBoolean(dr["IsCourrier"].ToString());
                        ObjCVarOperations.mMarksAndNumbers = Convert.ToString(dr["MarksAndNumbers"].ToString());
                        ObjCVarOperations.mIsTelexRelease = Convert.ToBoolean(dr["IsTelexRelease"].ToString());
                        ObjCVarOperations.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarOperations.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarOperations.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarOperations.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarOperations.mAgreedRate = Convert.ToString(dr["AgreedRate"].ToString());
                        ObjCVarOperations.mSupplierReference = Convert.ToString(dr["SupplierReference"].ToString());
                        ObjCVarOperations.mPONumber = Convert.ToString(dr["PONumber"].ToString());
                        ObjCVarOperations.mNetworkID = Convert.ToInt32(dr["NetworkID"].ToString());
                        ObjCVarOperations.mAirLineID1 = Convert.ToInt32(dr["AirLineID1"].ToString());
                        ObjCVarOperations.mFlightNo1 = Convert.ToString(dr["FlightNo1"].ToString());
                        ObjCVarOperations.mFlightDate1 = Convert.ToDateTime(dr["FlightDate1"].ToString());
                        ObjCVarOperations.mAirLineID2 = Convert.ToInt32(dr["AirLineID2"].ToString());
                        ObjCVarOperations.mFlightNo2 = Convert.ToString(dr["FlightNo2"].ToString());
                        ObjCVarOperations.mFlightDate2 = Convert.ToDateTime(dr["FlightDate2"].ToString());
                        ObjCVarOperations.mAirLineID3 = Convert.ToInt32(dr["AirLineID3"].ToString());
                        ObjCVarOperations.mFlightNo3 = Convert.ToString(dr["FlightNo3"].ToString());
                        ObjCVarOperations.mFlightDate3 = Convert.ToDateTime(dr["FlightDate3"].ToString());
                        ObjCVarOperations.mHandlingInformation = Convert.ToString(dr["HandlingInformation"].ToString());
                        ObjCVarOperations.mAmountOfInsurance = Convert.ToString(dr["AmountOfInsurance"].ToString());
                        ObjCVarOperations.mDeclaredValueForCarriage = Convert.ToString(dr["DeclaredValueForCarriage"].ToString());
                        ObjCVarOperations.mWeightCharge = Convert.ToDecimal(dr["WeightCharge"].ToString());
                        ObjCVarOperations.mValuationCharge = Convert.ToDecimal(dr["ValuationCharge"].ToString());
                        ObjCVarOperations.mOtherChargesDueAgent = Convert.ToDecimal(dr["OtherChargesDueAgent"].ToString());
                        ObjCVarOperations.mOtherCharges = Convert.ToString(dr["OtherCharges"].ToString());
                        ObjCVarOperations.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarOperations.mAccountingInformation = Convert.ToString(dr["AccountingInformation"].ToString());
                        ObjCVarOperations.mReferenceNumber = Convert.ToString(dr["ReferenceNumber"].ToString());
                        ObjCVarOperations.mOptionalShippingInformation = Convert.ToString(dr["OptionalShippingInformation"].ToString());
                        ObjCVarOperations.mCHGSCode = Convert.ToString(dr["CHGSCode"].ToString());
                        ObjCVarOperations.mWT_VALL_Other = Convert.ToString(dr["WT_VALL_Other"].ToString());
                        ObjCVarOperations.mDeclaredValueForCustoms = Convert.ToString(dr["DeclaredValueForCustoms"].ToString());
                        ObjCVarOperations.mTypeOfStockID = Convert.ToInt32(dr["TypeOfStockID"].ToString());
                        ObjCVarOperations.mTax = Convert.ToDecimal(dr["Tax"].ToString());
                        ObjCVarOperations.mOtherChargesDueCarrier = Convert.ToDecimal(dr["OtherChargesDueCarrier"].ToString());
                        ObjCVarOperations.mWT_VALL = Convert.ToString(dr["WT_VALL"].ToString());
                        ObjCVarOperations.mFlightNo = Convert.ToString(dr["FlightNo"].ToString());
                        ObjCVarOperations.mDescription = Convert.ToString(dr["Description"].ToString());
                        ObjCVarOperations.mIsAWB = Convert.ToBoolean(dr["IsAWB"].ToString());
                        ObjCVarOperations.mConsigneeID2 = Convert.ToInt32(dr["ConsigneeID2"].ToString());
                        ObjCVarOperations.mReleaseDate = Convert.ToDateTime(dr["ReleaseDate"].ToString());
                        ObjCVarOperations.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarOperations.mTareWeight = Convert.ToDecimal(dr["TareWeight"].ToString());
                        ObjCVarOperations.mVGM = Convert.ToDecimal(dr["VGM"].ToString());
                        ObjCVarOperations.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarOperations.mReleaseValue = Convert.ToDecimal(dr["ReleaseValue"].ToString());
                        ObjCVarOperations.mPOValue = Convert.ToString(dr["POValue"].ToString());
                        ObjCVarOperations.mPODate = Convert.ToDateTime(dr["PODate"].ToString());
                        ObjCVarOperations.mReleaseNumber = Convert.ToString(dr["ReleaseNumber"].ToString());
                        ObjCVarOperations.mUNOrID = Convert.ToString(dr["UNOrID"].ToString());
                        ObjCVarOperations.mProperShippingName = Convert.ToString(dr["ProperShippingName"].ToString());
                        ObjCVarOperations.mClassOrDivision = Convert.ToString(dr["ClassOrDivision"].ToString());
                        ObjCVarOperations.mPackingGroup = Convert.ToString(dr["PackingGroup"].ToString());
                        ObjCVarOperations.mQuantityAndTypeOfPacking = Convert.ToString(dr["QuantityAndTypeOfPacking"].ToString());
                        ObjCVarOperations.mPackingInstruction = Convert.ToString(dr["PackingInstruction"].ToString());
                        ObjCVarOperations.mShippingDeclarationAuthorization = Convert.ToString(dr["ShippingDeclarationAuthorization"].ToString());
                        ObjCVarOperations.mBarcode = Convert.ToString(dr["Barcode"].ToString());
                        ObjCVarOperations.mGuaranteeLetterNumber = Convert.ToString(dr["GuaranteeLetterNumber"].ToString());
                        ObjCVarOperations.mGuaranteeLetterDate = Convert.ToDateTime(dr["GuaranteeLetterDate"].ToString());
                        ObjCVarOperations.mGuaranteeLetterAmount = Convert.ToString(dr["GuaranteeLetterAmount"].ToString());
                        ObjCVarOperations.mGuaranteeLetterSupplierInvoiceNumber = Convert.ToString(dr["GuaranteeLetterSupplierInvoiceNumber"].ToString());
                        ObjCVarOperations.mBankAccountID = Convert.ToInt32(dr["BankAccountID"].ToString());
                        ObjCVarOperations.mGuaranteeLetterNotes = Convert.ToString(dr["GuaranteeLetterNotes"].ToString());
                        ObjCVarOperations.mDismissalPermissionSerial = Convert.ToString(dr["DismissalPermissionSerial"].ToString());
                        ObjCVarOperations.mDeliveryOrderSerial = Convert.ToString(dr["DeliveryOrderSerial"].ToString());
                        ObjCVarOperations.mVolumetricWeight = Convert.ToDecimal(dr["VolumetricWeight"].ToString());
                        ObjCVarOperations.mETAPOLAlarmStatus = Convert.ToInt32(dr["ETAPOLAlarmStatus"].ToString());
                        ObjCVarOperations.mATAPOLAlarmStatus = Convert.ToInt32(dr["ATAPOLAlarmStatus"].ToString());
                        ObjCVarOperations.mETDPOLAlarmStatus = Convert.ToInt32(dr["ETDPOLAlarmStatus"].ToString());
                        ObjCVarOperations.mATDPOLAlarmStatus = Convert.ToInt32(dr["ATDPOLAlarmStatus"].ToString());
                        ObjCVarOperations.mETAPODAlarmStatus = Convert.ToInt32(dr["ETAPODAlarmStatus"].ToString());
                        ObjCVarOperations.mATAPODAlarmStatus = Convert.ToInt32(dr["ATAPODAlarmStatus"].ToString());
                        ObjCVarOperations.mOperationManID = Convert.ToInt32(dr["OperationManID"].ToString());
                        ObjCVarOperations.mDispatchNumber = Convert.ToString(dr["DispatchNumber"].ToString());
                        ObjCVarOperations.mBusinessUnit = Convert.ToString(dr["BusinessUnit"].ToString());
                        ObjCVarOperations.mShippedOnBoardDate = Convert.ToDateTime(dr["ShippedOnBoardDate"].ToString());
                        ObjCVarOperations.mFreightPayableAt = Convert.ToString(dr["FreightPayableAt"].ToString());
                        ObjCVarOperations.mNumberOfOriginalBills = Convert.ToInt32(dr["NumberOfOriginalBills"].ToString());
                        ObjCVarOperations.mIsClearanceApproved = Convert.ToBoolean(dr["IsClearanceApproved"].ToString());
                        ObjCVarOperations.mClearanceApprovalDate = Convert.ToDateTime(dr["ClearanceApprovalDate"].ToString());
                        ObjCVarOperations.mIsTruckingApproved = Convert.ToBoolean(dr["IsTruckingApproved"].ToString());
                        ObjCVarOperations.mTruckingApprovalDate = Convert.ToDateTime(dr["TruckingApprovalDate"].ToString());
                        ObjCVarOperations.mIsFreightApproved = Convert.ToBoolean(dr["IsFreightApproved"].ToString());
                        ObjCVarOperations.mFreightApprovalDate = Convert.ToDateTime(dr["FreightApprovalDate"].ToString());
                        ObjCVarOperations.mIsFleet = Convert.ToBoolean(dr["IsFleet"].ToString());
                        ObjCVarOperations.mCertificateNumber = Convert.ToString(dr["CertificateNumber"].ToString());
                        ObjCVarOperations.mCountryOfOrigin = Convert.ToString(dr["CountryOfOrigin"].ToString());
                        ObjCVarOperations.mInvoiceValue = Convert.ToString(dr["InvoiceValue"].ToString());
                        ObjCVarOperations.mOperationWithInvoiceSerial = Convert.ToInt32(dr["OperationWithInvoiceSerial"].ToString());
                        ObjCVarOperations.mForm13Number = Convert.ToString(dr["Form13Number"].ToString());
                        ObjCVarOperations.mACIDNumber = Convert.ToString(dr["ACIDNumber"].ToString());
                        ObjCVarOperations.meFBLID = Convert.ToString(dr["eFBLID"].ToString());
                        ObjCVarOperations.meFBLStatus = Convert.ToInt32(dr["eFBLStatus"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarOperations.Add(ObjCVarOperations);
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
                    Com.CommandText = "[dbo].DeleteListOperationsTax";
                else
                    Com.CommandText = "[dbo].UpdateListOperationsTax";
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
        public Exception DeleteItem(List<CPKOperationsTAX> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemOperations";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKOperationsTAX ObjCPKOperations in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKOperations.ID);
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
        public Exception SaveMethod(List<CVarOperationsTAX> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@QuotationRouteID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@CodeSerial", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SalesmanID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@BLType", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@BLTypeIconName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BLTypeIconStyle", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DirectionType", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DirectionIconName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DirectionIconStyle", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TransportType", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TransportIconName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TransportIconStyle", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ShipmentType", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@HouseNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsPackagesPlacedOnMaster", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@PlacedOnOperationContainersAndPackagesID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@MAWBStockID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@MasterBL", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@MAWBSuffix", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BLDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@HBLDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Via1", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Via2", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Via3", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AgentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AgentAddressID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@AgentContactID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ShipperID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ShipperAddressID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ShipperContactID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ConsigneeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ConsigneeAddressID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ConsigneeContactID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@IncotermID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@MoveTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CommodityID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@POrC", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TransientTime", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OpenDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CloseDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CutOffDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IncludePickup", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@PickupCityID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PickupAddressID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@POLCountryID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@POL", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PODCountryID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@POD", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PickupAddress", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DeliveryAddress", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ShippingLineID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AirlineID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TruckerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IncludeDelivery", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@DeliveryZipCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DeliveryCityID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DeliveryCountryID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@GrossWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Volume", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ChargeableWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@NumberOfPackages", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsDangerousGoods", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CustomerReference", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OperationStageID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@MasterOperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@NumberOfHousesConnected", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsDelivered", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsTrucking", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsInsurance", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsClearance", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsGenset", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsCourrier", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@MarksAndNumbers", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsTelexRelease", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@AgreedRate", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@SupplierReference", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PONumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@NetworkID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AirLineID1", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@FlightNo1", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@FlightDate1", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@AirLineID2", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@FlightNo2", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@FlightDate2", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@AirLineID3", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@FlightNo3", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@FlightDate3", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@HandlingInformation", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AmountOfInsurance", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DeclaredValueForCarriage", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@WeightCharge", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ValuationCharge", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@OtherChargesDueAgent", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@OtherCharges", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AccountingInformation", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ReferenceNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OptionalShippingInformation", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CHGSCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@WT_VALL_Other", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DeclaredValueForCustoms", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TypeOfStockID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Tax", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@OtherChargesDueCarrier", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@WT_VALL", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@FlightNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Description", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsAWB", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ConsigneeID2", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ReleaseDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@NetWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TareWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@VGM", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@PackageTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ReleaseValue", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@POValue", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PODate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ReleaseNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@UNOrID", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ProperShippingName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ClassOrDivision", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PackingGroup", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@QuantityAndTypeOfPacking", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PackingInstruction", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ShippingDeclarationAuthorization", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Barcode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@GuaranteeLetterNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@GuaranteeLetterDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@GuaranteeLetterAmount", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@GuaranteeLetterSupplierInvoiceNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BankAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@GuaranteeLetterNotes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DismissalPermissionSerial", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DeliveryOrderSerial", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@VolumetricWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ETAPOLAlarmStatus", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ATAPOLAlarmStatus", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ETDPOLAlarmStatus", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ATDPOLAlarmStatus", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ETAPODAlarmStatus", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ATAPODAlarmStatus", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OperationManID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DispatchNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BusinessUnit", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ShippedOnBoardDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@FreightPayableAt", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@NumberOfOriginalBills", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsClearanceApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ClearanceApprovalDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsTruckingApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@TruckingApprovalDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsFreightApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@FreightApprovalDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsFleet", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CertificateNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CountryOfOrigin", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@InvoiceValue", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OperationWithInvoiceSerial", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Form13Number", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ACIDNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@eFBLID", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@eFBLStatus", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarOperationsTAX ObjCVarOperations in SaveList)
                {
                    if (ObjCVarOperations.mIsChanges == true)
                    {
                        if (ObjCVarOperations.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemOperationsTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarOperations.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemOperationsTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarOperations.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarOperations.ID;
                        }
                        Com.Parameters["@QuotationRouteID"].Value = ObjCVarOperations.QuotationRouteID;
                        Com.Parameters["@CodeSerial"].Value = ObjCVarOperations.CodeSerial;
                        Com.Parameters["@Code"].Value = ObjCVarOperations.Code;
                        Com.Parameters["@BranchID"].Value = ObjCVarOperations.BranchID;
                        Com.Parameters["@SalesmanID"].Value = ObjCVarOperations.SalesmanID;
                        Com.Parameters["@BLType"].Value = ObjCVarOperations.BLType;
                        Com.Parameters["@BLTypeIconName"].Value = ObjCVarOperations.BLTypeIconName;
                        Com.Parameters["@BLTypeIconStyle"].Value = ObjCVarOperations.BLTypeIconStyle;
                        Com.Parameters["@DirectionType"].Value = ObjCVarOperations.DirectionType;
                        Com.Parameters["@DirectionIconName"].Value = ObjCVarOperations.DirectionIconName;
                        Com.Parameters["@DirectionIconStyle"].Value = ObjCVarOperations.DirectionIconStyle;
                        Com.Parameters["@TransportType"].Value = ObjCVarOperations.TransportType;
                        Com.Parameters["@TransportIconName"].Value = ObjCVarOperations.TransportIconName;
                        Com.Parameters["@TransportIconStyle"].Value = ObjCVarOperations.TransportIconStyle;
                        Com.Parameters["@ShipmentType"].Value = ObjCVarOperations.ShipmentType;
                        Com.Parameters["@HouseNumber"].Value = ObjCVarOperations.HouseNumber;
                        Com.Parameters["@IsPackagesPlacedOnMaster"].Value = ObjCVarOperations.IsPackagesPlacedOnMaster;
                        Com.Parameters["@PlacedOnOperationContainersAndPackagesID"].Value = ObjCVarOperations.PlacedOnOperationContainersAndPackagesID;
                        Com.Parameters["@MAWBStockID"].Value = ObjCVarOperations.MAWBStockID;
                        Com.Parameters["@MasterBL"].Value = ObjCVarOperations.MasterBL;
                        Com.Parameters["@MAWBSuffix"].Value = ObjCVarOperations.MAWBSuffix;
                        Com.Parameters["@BLDate"].Value = ObjCVarOperations.BLDate;
                        Com.Parameters["@HBLDate"].Value = ObjCVarOperations.HBLDate;
                        Com.Parameters["@Via1"].Value = ObjCVarOperations.Via1;
                        Com.Parameters["@Via2"].Value = ObjCVarOperations.Via2;
                        Com.Parameters["@Via3"].Value = ObjCVarOperations.Via3;
                        Com.Parameters["@AgentID"].Value = ObjCVarOperations.AgentID;
                        Com.Parameters["@AgentAddressID"].Value = ObjCVarOperations.AgentAddressID;
                        Com.Parameters["@AgentContactID"].Value = ObjCVarOperations.AgentContactID;
                        Com.Parameters["@ShipperID"].Value = ObjCVarOperations.ShipperID;
                        Com.Parameters["@ShipperAddressID"].Value = ObjCVarOperations.ShipperAddressID;
                        Com.Parameters["@ShipperContactID"].Value = ObjCVarOperations.ShipperContactID;
                        Com.Parameters["@ConsigneeID"].Value = ObjCVarOperations.ConsigneeID;
                        Com.Parameters["@ConsigneeAddressID"].Value = ObjCVarOperations.ConsigneeAddressID;
                        Com.Parameters["@ConsigneeContactID"].Value = ObjCVarOperations.ConsigneeContactID;
                        Com.Parameters["@IncotermID"].Value = ObjCVarOperations.IncotermID;
                        Com.Parameters["@MoveTypeID"].Value = ObjCVarOperations.MoveTypeID;
                        Com.Parameters["@CommodityID"].Value = ObjCVarOperations.CommodityID;
                        Com.Parameters["@POrC"].Value = ObjCVarOperations.POrC;
                        Com.Parameters["@TransientTime"].Value = ObjCVarOperations.TransientTime;
                        Com.Parameters["@OpenDate"].Value = ObjCVarOperations.OpenDate;
                        Com.Parameters["@CloseDate"].Value = ObjCVarOperations.CloseDate;
                        Com.Parameters["@CutOffDate"].Value = ObjCVarOperations.CutOffDate;
                        Com.Parameters["@IncludePickup"].Value = ObjCVarOperations.IncludePickup;
                        Com.Parameters["@PickupCityID"].Value = ObjCVarOperations.PickupCityID;
                        Com.Parameters["@PickupAddressID"].Value = ObjCVarOperations.PickupAddressID;
                        Com.Parameters["@POLCountryID"].Value = ObjCVarOperations.POLCountryID;
                        Com.Parameters["@POL"].Value = ObjCVarOperations.POL;
                        Com.Parameters["@PODCountryID"].Value = ObjCVarOperations.PODCountryID;
                        Com.Parameters["@POD"].Value = ObjCVarOperations.POD;
                        Com.Parameters["@PickupAddress"].Value = ObjCVarOperations.PickupAddress;
                        Com.Parameters["@DeliveryAddress"].Value = ObjCVarOperations.DeliveryAddress;
                        Com.Parameters["@ShippingLineID"].Value = ObjCVarOperations.ShippingLineID;
                        Com.Parameters["@AirlineID"].Value = ObjCVarOperations.AirlineID;
                        Com.Parameters["@TruckerID"].Value = ObjCVarOperations.TruckerID;
                        Com.Parameters["@IncludeDelivery"].Value = ObjCVarOperations.IncludeDelivery;
                        Com.Parameters["@DeliveryZipCode"].Value = ObjCVarOperations.DeliveryZipCode;
                        Com.Parameters["@DeliveryCityID"].Value = ObjCVarOperations.DeliveryCityID;
                        Com.Parameters["@DeliveryCountryID"].Value = ObjCVarOperations.DeliveryCountryID;
                        Com.Parameters["@GrossWeight"].Value = ObjCVarOperations.GrossWeight;
                        Com.Parameters["@Volume"].Value = ObjCVarOperations.Volume;
                        Com.Parameters["@ChargeableWeight"].Value = ObjCVarOperations.ChargeableWeight;
                        Com.Parameters["@NumberOfPackages"].Value = ObjCVarOperations.NumberOfPackages;
                        Com.Parameters["@IsDangerousGoods"].Value = ObjCVarOperations.IsDangerousGoods;
                        Com.Parameters["@Notes"].Value = ObjCVarOperations.Notes;
                        Com.Parameters["@CustomerReference"].Value = ObjCVarOperations.CustomerReference;
                        Com.Parameters["@OperationStageID"].Value = ObjCVarOperations.OperationStageID;
                        Com.Parameters["@MasterOperationID"].Value = ObjCVarOperations.MasterOperationID;
                        Com.Parameters["@NumberOfHousesConnected"].Value = ObjCVarOperations.NumberOfHousesConnected;
                        Com.Parameters["@IsDelivered"].Value = ObjCVarOperations.IsDelivered;
                        Com.Parameters["@IsTrucking"].Value = ObjCVarOperations.IsTrucking;
                        Com.Parameters["@IsInsurance"].Value = ObjCVarOperations.IsInsurance;
                        Com.Parameters["@IsClearance"].Value = ObjCVarOperations.IsClearance;
                        Com.Parameters["@IsGenset"].Value = ObjCVarOperations.IsGenset;
                        Com.Parameters["@IsCourrier"].Value = ObjCVarOperations.IsCourrier;
                        Com.Parameters["@MarksAndNumbers"].Value = ObjCVarOperations.MarksAndNumbers;
                        Com.Parameters["@IsTelexRelease"].Value = ObjCVarOperations.IsTelexRelease;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarOperations.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarOperations.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarOperations.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarOperations.ModificationDate;
                        Com.Parameters["@AgreedRate"].Value = ObjCVarOperations.AgreedRate;
                        Com.Parameters["@SupplierReference"].Value = ObjCVarOperations.SupplierReference;
                        Com.Parameters["@PONumber"].Value = ObjCVarOperations.PONumber;
                        Com.Parameters["@NetworkID"].Value = ObjCVarOperations.NetworkID;
                        Com.Parameters["@AirLineID1"].Value = ObjCVarOperations.AirLineID1;
                        Com.Parameters["@FlightNo1"].Value = ObjCVarOperations.FlightNo1;
                        Com.Parameters["@FlightDate1"].Value = ObjCVarOperations.FlightDate1;
                        Com.Parameters["@AirLineID2"].Value = ObjCVarOperations.AirLineID2;
                        Com.Parameters["@FlightNo2"].Value = ObjCVarOperations.FlightNo2;
                        Com.Parameters["@FlightDate2"].Value = ObjCVarOperations.FlightDate2;
                        Com.Parameters["@AirLineID3"].Value = ObjCVarOperations.AirLineID3;
                        Com.Parameters["@FlightNo3"].Value = ObjCVarOperations.FlightNo3;
                        Com.Parameters["@FlightDate3"].Value = ObjCVarOperations.FlightDate3;
                        Com.Parameters["@HandlingInformation"].Value = ObjCVarOperations.HandlingInformation;
                        Com.Parameters["@AmountOfInsurance"].Value = ObjCVarOperations.AmountOfInsurance;
                        Com.Parameters["@DeclaredValueForCarriage"].Value = ObjCVarOperations.DeclaredValueForCarriage;
                        Com.Parameters["@WeightCharge"].Value = ObjCVarOperations.WeightCharge;
                        Com.Parameters["@ValuationCharge"].Value = ObjCVarOperations.ValuationCharge;
                        Com.Parameters["@OtherChargesDueAgent"].Value = ObjCVarOperations.OtherChargesDueAgent;
                        Com.Parameters["@OtherCharges"].Value = ObjCVarOperations.OtherCharges;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarOperations.CurrencyID;
                        Com.Parameters["@AccountingInformation"].Value = ObjCVarOperations.AccountingInformation;
                        Com.Parameters["@ReferenceNumber"].Value = ObjCVarOperations.ReferenceNumber;
                        Com.Parameters["@OptionalShippingInformation"].Value = ObjCVarOperations.OptionalShippingInformation;
                        Com.Parameters["@CHGSCode"].Value = ObjCVarOperations.CHGSCode;
                        Com.Parameters["@WT_VALL_Other"].Value = ObjCVarOperations.WT_VALL_Other;
                        Com.Parameters["@DeclaredValueForCustoms"].Value = ObjCVarOperations.DeclaredValueForCustoms;
                        Com.Parameters["@TypeOfStockID"].Value = ObjCVarOperations.TypeOfStockID;
                        Com.Parameters["@Tax"].Value = ObjCVarOperations.Tax;
                        Com.Parameters["@OtherChargesDueCarrier"].Value = ObjCVarOperations.OtherChargesDueCarrier;
                        Com.Parameters["@WT_VALL"].Value = ObjCVarOperations.WT_VALL;
                        Com.Parameters["@FlightNo"].Value = ObjCVarOperations.FlightNo;
                        Com.Parameters["@Description"].Value = ObjCVarOperations.Description;
                        Com.Parameters["@IsAWB"].Value = ObjCVarOperations.IsAWB;
                        Com.Parameters["@ConsigneeID2"].Value = ObjCVarOperations.ConsigneeID2;
                        Com.Parameters["@ReleaseDate"].Value = ObjCVarOperations.ReleaseDate;
                        Com.Parameters["@NetWeight"].Value = ObjCVarOperations.NetWeight;
                        Com.Parameters["@TareWeight"].Value = ObjCVarOperations.TareWeight;
                        Com.Parameters["@VGM"].Value = ObjCVarOperations.VGM;
                        Com.Parameters["@PackageTypeID"].Value = ObjCVarOperations.PackageTypeID;
                        Com.Parameters["@ReleaseValue"].Value = ObjCVarOperations.ReleaseValue;
                        Com.Parameters["@POValue"].Value = ObjCVarOperations.POValue;
                        Com.Parameters["@PODate"].Value = ObjCVarOperations.PODate;
                        Com.Parameters["@ReleaseNumber"].Value = ObjCVarOperations.ReleaseNumber;
                        Com.Parameters["@UNOrID"].Value = ObjCVarOperations.UNOrID;
                        Com.Parameters["@ProperShippingName"].Value = ObjCVarOperations.ProperShippingName;
                        Com.Parameters["@ClassOrDivision"].Value = ObjCVarOperations.ClassOrDivision;
                        Com.Parameters["@PackingGroup"].Value = ObjCVarOperations.PackingGroup;
                        Com.Parameters["@QuantityAndTypeOfPacking"].Value = ObjCVarOperations.QuantityAndTypeOfPacking;
                        Com.Parameters["@PackingInstruction"].Value = ObjCVarOperations.PackingInstruction;
                        Com.Parameters["@ShippingDeclarationAuthorization"].Value = ObjCVarOperations.ShippingDeclarationAuthorization;
                        Com.Parameters["@Barcode"].Value = ObjCVarOperations.Barcode;
                        Com.Parameters["@GuaranteeLetterNumber"].Value = ObjCVarOperations.GuaranteeLetterNumber;
                        Com.Parameters["@GuaranteeLetterDate"].Value = ObjCVarOperations.GuaranteeLetterDate;
                        Com.Parameters["@GuaranteeLetterAmount"].Value = ObjCVarOperations.GuaranteeLetterAmount;
                        Com.Parameters["@GuaranteeLetterSupplierInvoiceNumber"].Value = ObjCVarOperations.GuaranteeLetterSupplierInvoiceNumber;
                        Com.Parameters["@BankAccountID"].Value = ObjCVarOperations.BankAccountID;
                        Com.Parameters["@GuaranteeLetterNotes"].Value = ObjCVarOperations.GuaranteeLetterNotes;
                        Com.Parameters["@DismissalPermissionSerial"].Value = ObjCVarOperations.DismissalPermissionSerial;
                        Com.Parameters["@DeliveryOrderSerial"].Value = ObjCVarOperations.DeliveryOrderSerial;
                        Com.Parameters["@VolumetricWeight"].Value = ObjCVarOperations.VolumetricWeight;
                        Com.Parameters["@ETAPOLAlarmStatus"].Value = ObjCVarOperations.ETAPOLAlarmStatus;
                        Com.Parameters["@ATAPOLAlarmStatus"].Value = ObjCVarOperations.ATAPOLAlarmStatus;
                        Com.Parameters["@ETDPOLAlarmStatus"].Value = ObjCVarOperations.ETDPOLAlarmStatus;
                        Com.Parameters["@ATDPOLAlarmStatus"].Value = ObjCVarOperations.ATDPOLAlarmStatus;
                        Com.Parameters["@ETAPODAlarmStatus"].Value = ObjCVarOperations.ETAPODAlarmStatus;
                        Com.Parameters["@ATAPODAlarmStatus"].Value = ObjCVarOperations.ATAPODAlarmStatus;
                        Com.Parameters["@OperationManID"].Value = ObjCVarOperations.OperationManID;
                        Com.Parameters["@DispatchNumber"].Value = ObjCVarOperations.DispatchNumber;
                        Com.Parameters["@BusinessUnit"].Value = ObjCVarOperations.BusinessUnit;
                        Com.Parameters["@ShippedOnBoardDate"].Value = ObjCVarOperations.ShippedOnBoardDate;
                        Com.Parameters["@FreightPayableAt"].Value = ObjCVarOperations.FreightPayableAt;
                        Com.Parameters["@NumberOfOriginalBills"].Value = ObjCVarOperations.NumberOfOriginalBills;
                        Com.Parameters["@IsClearanceApproved"].Value = ObjCVarOperations.IsClearanceApproved;
                        Com.Parameters["@ClearanceApprovalDate"].Value = ObjCVarOperations.ClearanceApprovalDate;
                        Com.Parameters["@IsTruckingApproved"].Value = ObjCVarOperations.IsTruckingApproved;
                        Com.Parameters["@TruckingApprovalDate"].Value = ObjCVarOperations.TruckingApprovalDate;
                        Com.Parameters["@IsFreightApproved"].Value = ObjCVarOperations.IsFreightApproved;
                        Com.Parameters["@FreightApprovalDate"].Value = ObjCVarOperations.FreightApprovalDate;
                        Com.Parameters["@IsFleet"].Value = ObjCVarOperations.IsFleet;
                        Com.Parameters["@CertificateNumber"].Value = ObjCVarOperations.CertificateNumber;
                        Com.Parameters["@CountryOfOrigin"].Value = ObjCVarOperations.CountryOfOrigin;
                        Com.Parameters["@InvoiceValue"].Value = ObjCVarOperations.InvoiceValue;
                        Com.Parameters["@OperationWithInvoiceSerial"].Value = ObjCVarOperations.OperationWithInvoiceSerial;
                        Com.Parameters["@Form13Number"].Value = ObjCVarOperations.Form13Number;
                        Com.Parameters["@ACIDNumber"].Value = ObjCVarOperations.ACIDNumber;
                        Com.Parameters["@eFBLID"].Value = ObjCVarOperations.eFBLID;
                        Com.Parameters["@eFBLStatus"].Value = ObjCVarOperations.eFBLStatus;
                        EndTrans(Com, Con);
                        if (ObjCVarOperations.ID == 0)
                        {
                            ObjCVarOperations.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarOperations.mIsChanges = false;
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
