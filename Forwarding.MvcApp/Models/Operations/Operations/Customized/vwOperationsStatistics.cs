using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
//Don't generate: Change manually;
//Don't generate: Change manually;
//Don't generate: Change manually;
//Don't generate: Change manually;
// because GetListPagingvwOperationsStatistics_FilterInvoices is added manually
// so when you change any thing in vwOperationsStatistics, change it manually here and in GetListPagingvwOperationsStatistics_FilterInvoices in the DB
//Com.CommandTimeout = 200000;
//Com.CommandTimeout = 200000;

namespace Forwarding.MvcApp.Models.Operations.Operations.Customized
{
    #region Generated
    [Serializable]
    public partial class CVarvwOperationsStatistics
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal String mCode;
        internal Int32 mCodeSerial;
        internal Int32 mDirectionType;
        internal Int32 mTransportType;
        internal Int32 mBLType;
        internal Int64 mMasterOperationID;
        internal String mMasterBL;
        internal String mDaysDifference;
        internal Int32 mBranchID;
        internal String mBranchName;
        internal Int32 mSalesmanID;
        internal String mSalesman;
        internal Int32 mCreatorUserID;
        internal String mOpenedBy;
        internal Int32 mShipmentType;
        internal String mShipmentTypeCode;
        internal Int32 mOperationManID;
        internal String mOperationManName;
        internal Int32 mCreatorRoleID;
        internal Int32 mSalesmanRoleID;
        internal Int32 mOperationManRoleID;
        internal String mHouseNumber;
        internal Int32 mPOrC;
        internal String mDismissalPermissionSerial;
        internal Int32 mNumberOfPackages;
        internal Int32 mPackageTypeID;
        internal String mPackageTypeName;
        internal String mDescriptionOfGoods;
        internal String mDeliveryAddress;
        internal String mNotes;
        internal String mNotes2;
        internal Int32 mDeliveryCityID;
        internal String mDeliveryCityName;
        internal DateTime mOpenDate;
        internal DateTime mCloseDate;
        internal DateTime mCutOffDate;
        internal String mCustomerReference;
        internal String mSupplierReference;
        internal String mPONumber;
        internal String mPOValue;
        internal DateTime mPODate;
        internal String mReleaseNumber;
        internal DateTime mReleaseDate;
        internal Decimal mReleaseValue;
        internal DateTime mETAPOLDate;
        internal DateTime mExpectedDeparture;
        internal DateTime mActualDeparture;
        internal DateTime mExpectedArrival;
        internal DateTime mActualArrival;
        internal DateTime mUnloadingDate;
        internal DateTime mDeliveryDate;
        internal DateTime mTruckingApprovalDate;
        internal DateTime mCCADocumentReceiveDate;
        internal Int32 mFreeTime;
        internal Int32 mTransientTime;
        internal Int32 mPOLCountryID;
        internal String mPOLCountryCode;
        internal String mPOLCountryName;
        internal Int32 mPOL;
        internal String mPOLCode;
        internal String mPOLName;
        internal Int32 mPODCountryID;
        internal String mPODCountryCode;
        internal String mPODCountryName;
        internal Int32 mPOD;
        internal String mPODCode;
        internal String mPODName;
        internal String mOperationStageName;
        internal Int32 mBookingPartyID;
        internal String mBookingPartyName;
        internal Int32 mCustomsClearanceAgentID;
        internal String mCustomsClearanceAgentName;
        internal Int32 mAgentID;
        internal String mAgentName;
        internal Int32 mShipperID;
        internal String mShipperName;
        internal Int32 mConsigneeID;
        internal String mConsigneeName;
        internal String mNetworksNames;
        internal String mNotify1Name;
        internal Int32 mEndUserID;
        internal String mEndUserName;
        internal Int32 mClientID;
        internal String mClientName;
        internal String mClientPhonesAndFaxes;
        internal String mClientAddress;
        internal Int32 mCommodityID;
        internal String mCommodityName;
        internal Int32 mCommodityID2;
        internal String mCommodityName2;
        internal Int32 mCommodityID3;
        internal String mCommodityName3;
        internal Int32 mIncotermID;
        internal String mIncotermName;
        internal Int64 mQuotationRouteID;
        internal String mQuotationRouteCode;
        internal String mCertificateNumber;
        internal String mCertificateValue;
        internal String mCertificateDate;
        internal String mQasimaNumber;
        internal Boolean mMatch;
        internal String mQasimaDate;
        internal String mMainRouteNotes;
        internal Int32 mCC_ClearanceTypeID;
        internal String mCC_ClearanceTypeName;
        internal Int32 mMoveTypeID;
        internal String mMoveTypeName;
        internal String mLineName;
        internal Int32 mShippingLineID;
        internal Int32 mAirlineID;
        internal Int32 mTruckerID;
        internal Int32 mVesselID;
        internal String mVesselName;
        internal String mVoyageOrTruckNumber;
        internal String mMainRouteWarehouse;
        internal Int32 mNetworkID;
        internal String mNetworkName;
        internal String mContainerTypes;
        internal String mPackageTypes;
        internal String mPackageTypesOnContainersTotals;
        internal String mInvoiceNumbers;
        internal String mHouseBLs;
        internal String mBookingNumbers;
        internal Int32 mTEUs;
        internal String mTrackingStageName;
        internal String mAllTrackingStages;
        internal String mAllTrackingStages_NotDone;
        internal String mAllTrackingStages_Done;
        internal String mAllTrackingStages_CC;
        internal String mAllTrackingStages_CCDone;
        internal String mAllTrackingStages_CCNotDone;
        internal Decimal mGrossWeightSum;
        internal Decimal mGrossWeightTONSum;
        internal Decimal mNetWeightSum;
        internal Decimal mNetWeightTONSum;
        internal Decimal mVolumeSum;
        internal Decimal mChargeableWeight;
        internal Decimal mVolumetricWeight;
        internal String mContainerTypes20;
        internal String mContainerTypes40;
        internal String mContainerTypes45;
        internal String mContainerTypesReefer20;
        internal String mContainerTypesReefer40;
        internal String mContainerNumbers;
        internal String mCreatorName;
        internal Decimal mPayablesWithoutVAT;
        internal Decimal mFixedDiscount;
        internal Decimal mReceivables;
        internal Decimal mReceivablesWithoutVAT;
        internal Decimal mPayables;
        internal String mTruckersName;
        internal String mQuotationCode;
        internal Int32 mOperationWithInvoiceSerial;
        internal String mForm13Number;
        internal String mACIDNumber;
        internal String mCCAVATCertificateValue;
        internal String mCCACommercialProfitTax;
        internal String mCCACustomsValue;
        internal String mCCAStorageFees;
        internal String mCCAWindowFees;
        internal String mCCAOthers;
        internal DateTime mCCASpendDate;
        internal String mCCAExchangeRate;
        internal String mReferenceNumber;
        internal DateTime mForm13Date;
        internal DateTime mEntryDate;
        internal DateTime mStorageEndDate;
        internal decimal mNawaleenReceivables;
        internal decimal mNawaleenPayablesDiff;
        internal decimal mAccNawaleenPayablesDiff;
        internal String mIMO_Chemical;

        internal Int32 mUnAllocatedReceivables;
        internal Int32 mCountTHC;
        internal Int32 mCountStorage;
        internal Int32 mCountStorageService;
        internal Int32 mCountNafeza;
        internal Int32 mCountCollectionForOthers;
        internal Int32 mCountNolon;
        internal Int32 mCountG3ala;
        internal String mChassisNumbers;
        internal String mMasterOperationCode;
        internal Decimal mHBOutcome;
        internal Decimal mHBIncome;
        internal Decimal mHBIncomeWithvat;
        internal String mNameConsignee2;

        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public Int32 CodeSerial
        {
            get { return mCodeSerial; }
            set { mCodeSerial = value; }
        }
        public String ChassisNumbers
        {
            get { return mChassisNumbers; }
            set { mChassisNumbers = value; }
        }
        public Int32 DirectionType
        {
            get { return mDirectionType; }
            set { mDirectionType = value; }
        }
        public Int32 TransportType
        {
            get { return mTransportType; }
            set { mTransportType = value; }
        }
        public Int32 BLType
        {
            get { return mBLType; }
            set { mBLType = value; }
        }
        public Int64 MasterOperationID
        {
            get { return mMasterOperationID; }
            set { mMasterOperationID = value; }
        }

        public String DaysDifference
        {
            get { return mDaysDifference; }
            set { mDaysDifference = value; }
        }
        public String MasterBL
        {
            get { return mMasterBL; }
            set { mMasterBL = value; }
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
        public Int32 SalesmanID
        {
            get { return mSalesmanID; }
            set { mSalesmanID = value; }
        }
        public String Salesman
        {
            get { return mSalesman; }
            set { mSalesman = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
        }
        public String OpenedBy
        {
            get { return mOpenedBy; }
            set { mOpenedBy = value; }
        }
        public Int32 ShipmentType
        {
            get { return mShipmentType; }
            set { mShipmentType = value; }
        }
        public String ShipmentTypeCode
        {
            get { return mShipmentTypeCode; }
            set { mShipmentTypeCode = value; }
        }
        public Int32 OperationManID
        {
            get { return mOperationManID; }
            set { mOperationManID = value; }
        }
        public String OperationManName
        {
            get { return mOperationManName; }
            set { mOperationManName = value; }
        }
        public Int32 CreatorRoleID
        {
            get { return mCreatorRoleID; }
            set { mCreatorRoleID = value; }
        }
        public Int32 SalesmanRoleID
        {
            get { return mSalesmanRoleID; }
            set { mSalesmanRoleID = value; }
        }
        public Int32 OperationManRoleID
        {
            get { return mOperationManRoleID; }
            set { mOperationManRoleID = value; }
        }
        public String HouseNumber
        {
            get { return mHouseNumber; }
            set { mHouseNumber = value; }
        }
        public Int32 POrC
        {
            get { return mPOrC; }
            set { mPOrC = value; }
        }
        public String DismissalPermissionSerial
        {
            get { return mDismissalPermissionSerial; }
            set { mDismissalPermissionSerial = value; }
        }
        public Int32 NumberOfPackages
        {
            get { return mNumberOfPackages; }
            set { mNumberOfPackages = value; }
        }
        public Int32 PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mPackageTypeID = value; }
        }
        public String PackageTypeName
        {
            get { return mPackageTypeName; }
            set { mPackageTypeName = value; }
        }
        public String DescriptionOfGoods
        {
            get { return mDescriptionOfGoods; }
            set { mDescriptionOfGoods = value; }
        }
        public String DeliveryAddress
        {
            get { return mDeliveryAddress; }
            set { mDeliveryAddress = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public String Notes2
        {
            get { return mNotes2; }
            set { mNotes2 = value; }
        }
        public Int32 DeliveryCityID
        {
            get { return mDeliveryCityID; }
            set { mDeliveryCityID = value; }
        }
        public String DeliveryCityName
        {
            get { return mDeliveryCityName; }
            set { mDeliveryCityName = value; }
        }
        public DateTime OpenDate
        {
            get { return mOpenDate; }
            set { mOpenDate = value; }
        }
        public DateTime CloseDate
        {
            get { return mCloseDate; }
            set { mCloseDate = value; }
        }
        public DateTime CutOffDate
        {
            get { return mCutOffDate; }
            set { mCutOffDate = value; }
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
        public String PONumber
        {
            get { return mPONumber; }
            set { mPONumber = value; }
        }
        public String POValue
        {
            get { return mPOValue; }
            set { mPOValue = value; }
        }
        public DateTime PODate
        {
            get { return mPODate; }
            set { mPODate = value; }
        }
        public String ReleaseNumber
        {
            get { return mReleaseNumber; }
            set { mReleaseNumber = value; }
        }
        public DateTime ReleaseDate
        {
            get { return mReleaseDate; }
            set { mReleaseDate = value; }
        }
        public Decimal ReleaseValue
        {
            get { return mReleaseValue; }
            set { mReleaseValue = value; }
        }
        public DateTime ETAPOLDate
        {
            get { return mETAPOLDate; }
            set { mETAPOLDate = value; }
        }
        public DateTime ExpectedDeparture
        {
            get { return mExpectedDeparture; }
            set { mExpectedDeparture = value; }
        }
        public DateTime ActualDeparture
        {
            get { return mActualDeparture; }
            set { mActualDeparture = value; }
        }
        public DateTime ExpectedArrival
        {
            get { return mExpectedArrival; }
            set { mExpectedArrival = value; }
        }
        public DateTime ActualArrival
        {
            get { return mActualArrival; }
            set { mActualArrival = value; }
        }
        public DateTime UnloadingDate
        {
            get { return mUnloadingDate; }
            set { mUnloadingDate = value; }
        }
        public DateTime TruckingApprovalDate
        {
            get { return mTruckingApprovalDate; }
            set { mTruckingApprovalDate = value; }
        }

        public DateTime DeliveryDate
        {
            get { return mDeliveryDate; }
            set { mDeliveryDate = value; }
        }
        public DateTime CCADocumentReceiveDate
        {
            get { return mCCADocumentReceiveDate; }
            set { mCCADocumentReceiveDate = value; }
        }
        public Int32 FreeTime
        {
            get { return mFreeTime; }
            set { mFreeTime = value; }
        }
        public Int32 TransientTime
        {
            get { return mTransientTime; }
            set { mTransientTime = value; }
        }
        public Int32 POLCountryID
        {
            get { return mPOLCountryID; }
            set { mPOLCountryID = value; }
        }
        public String POLCountryCode
        {
            get { return mPOLCountryCode; }
            set { mPOLCountryCode = value; }
        }
        public String POLCountryName
        {
            get { return mPOLCountryName; }
            set { mPOLCountryName = value; }
        }
        public Int32 POL
        {
            get { return mPOL; }
            set { mPOL = value; }
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
        public Int32 PODCountryID
        {
            get { return mPODCountryID; }
            set { mPODCountryID = value; }
        }
        public String PODCountryCode
        {
            get { return mPODCountryCode; }
            set { mPODCountryCode = value; }
        }
        public String PODCountryName
        {
            get { return mPODCountryName; }
            set { mPODCountryName = value; }
        }
        public Int32 POD
        {
            get { return mPOD; }
            set { mPOD = value; }
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
        public String OperationStageName
        {
            get { return mOperationStageName; }
            set { mOperationStageName = value; }
        }
        public Int32 BookingPartyID
        {
            get { return mBookingPartyID; }
            set { mBookingPartyID = value; }
        }
        public String BookingPartyName
        {
            get { return mBookingPartyName; }
            set { mBookingPartyName = value; }
        }
        public Int32 CustomsClearanceAgentID
        {
            get { return mCustomsClearanceAgentID; }
            set { mCustomsClearanceAgentID = value; }
        }
        public String CustomsClearanceAgentName
        {
            get { return mCustomsClearanceAgentName; }
            set { mCustomsClearanceAgentName = value; }
        }
        public Int32 AgentID
        {
            get { return mAgentID; }
            set { mAgentID = value; }
        }
        public String AgentName
        {
            get { return mAgentName; }
            set { mAgentName = value; }
        }
        public Int32 ShipperID
        {
            get { return mShipperID; }
            set { mShipperID = value; }
        }
        public String ShipperName
        {
            get { return mShipperName; }
            set { mShipperName = value; }
        }
        public Int32 ConsigneeID
        {
            get { return mConsigneeID; }
            set { mConsigneeID = value; }
        }
        public String ConsigneeName
        {
            get { return mConsigneeName; }
            set { mConsigneeName = value; }
        }
        public String NetworksNames
        {
            get { return mNetworksNames; }
            set { mNetworksNames = value; }
        }
        public String Notify1Name
        {
            get { return mNotify1Name; }
            set { mNotify1Name = value; }
        }
        public Int32 EndUserID
        {
            get { return mEndUserID; }
            set { mEndUserID = value; }
        }
        public String EndUserName
        {
            get { return mEndUserName; }
            set { mEndUserName = value; }
        }
        public Int32 ClientID
        {
            get { return mClientID; }
            set { mClientID = value; }
        }
        public String ClientName
        {
            get { return mClientName; }
            set { mClientName = value; }
        }
        public String ClientPhonesAndFaxes
        {
            get { return mClientPhonesAndFaxes; }
            set { mClientPhonesAndFaxes = value; }
        }
        public String ClientAddress
        {
            get { return mClientAddress; }
            set { mClientAddress = value; }
        }
        public Int32 CommodityID
        {
            get { return mCommodityID; }
            set { mCommodityID = value; }
        }
        public String CommodityName
        {
            get { return mCommodityName; }
            set { mCommodityName = value; }
        }
        public Int32 CommodityID2
        {
            get { return mCommodityID2; }
            set { mCommodityID2 = value; }
        }
        public String CommodityName2
        {
            get { return mCommodityName2; }
            set { mCommodityName2 = value; }
        }
        public Int32 CommodityID3
        {
            get { return mCommodityID3; }
            set { mCommodityID3 = value; }
        }
        public String CommodityName3
        {
            get { return mCommodityName3; }
            set { mCommodityName3 = value; }
        }
        public Int32 IncotermID
        {
            get { return mIncotermID; }
            set { mIncotermID = value; }
        }
        public String IncotermName
        {
            get { return mIncotermName; }
            set { mIncotermName = value; }
        }
        public Int64 QuotationRouteID
        {
            get { return mQuotationRouteID; }
            set { mQuotationRouteID = value; }
        }
        public String QuotationRouteCode
        {
            get { return mQuotationRouteCode; }
            set { mQuotationRouteCode = value; }
        }
        public String CertificateNumber
        {
            get { return mCertificateNumber; }
            set { mCertificateNumber = value; }
        }
        public String CertificateValue
        {
            get { return mCertificateValue; }
            set { mCertificateValue = value; }
        }
        public String CertificateDate
        {
            get { return mCertificateDate; }
            set { mCertificateDate = value; }
        }
        public String QasimaNumber
        {
            get { return mQasimaNumber; }
            set { mQasimaNumber = value; }
        }
        public Boolean Match
        {
            get { return mMatch; }
            set { mMatch = value; }
        }
        public String QasimaDate
        {
            get { return mQasimaDate; }
            set { mQasimaDate = value; }
        }
        public String MainRouteNotes
        {
            get { return mMainRouteNotes; }
            set { mMainRouteNotes = value; }
        }
        public Int32 CC_ClearanceTypeID
        {
            get { return mCC_ClearanceTypeID; }
            set { mCC_ClearanceTypeID = value; }
        }
        public String CC_ClearanceTypeName
        {
            get { return mCC_ClearanceTypeName; }
            set { mCC_ClearanceTypeName = value; }
        }
        public Int32 MoveTypeID
        {
            get { return mMoveTypeID; }
            set { mMoveTypeID = value; }
        }
        public String MoveTypeName
        {
            get { return mMoveTypeName; }
            set { mMoveTypeName = value; }
        }
        public String LineName
        {
            get { return mLineName; }
            set { mLineName = value; }
        }
        public Int32 ShippingLineID
        {
            get { return mShippingLineID; }
            set { mShippingLineID = value; }
        }
        public Int32 AirlineID
        {
            get { return mAirlineID; }
            set { mAirlineID = value; }
        }
        public Int32 TruckerID
        {
            get { return mTruckerID; }
            set { mTruckerID = value; }
        }
        public Int32 VesselID
        {
            get { return mVesselID; }
            set { mVesselID = value; }
        }
        public String VesselName
        {
            get { return mVesselName; }
            set { mVesselName = value; }
        }
        public String VoyageOrTruckNumber
        {
            get { return mVoyageOrTruckNumber; }
            set { mVoyageOrTruckNumber = value; }
        }
        public String MainRouteWarehouse
        {
            get { return mMainRouteWarehouse; }
            set { mMainRouteWarehouse = value; }
        }
        public Int32 NetworkID
        {
            get { return mNetworkID; }
            set { mNetworkID = value; }
        }
        public String NetworkName
        {
            get { return mNetworkName; }
            set { mNetworkName = value; }
        }
        public String ContainerTypes
        {
            get { return mContainerTypes; }
            set { mContainerTypes = value; }
        }
        public String PackageTypes
        {
            get { return mPackageTypes; }
            set { mPackageTypes = value; }
        }
        public String PackageTypesOnContainersTotals
        {
            get { return mPackageTypesOnContainersTotals; }
            set { mPackageTypesOnContainersTotals = value; }
        }
        public String InvoiceNumbers
        {
            get { return mInvoiceNumbers; }
            set { mInvoiceNumbers = value; }
        }
        public String HouseBLs
        {
            get { return mHouseBLs; }
            set { mHouseBLs = value; }
        }
        public String BookingNumbers
        {
            get { return mBookingNumbers; }
            set { mBookingNumbers = value; }
        }
        public Int32 TEUs
        {
            get { return mTEUs; }
            set { mTEUs = value; }
        }
        public String TrackingStageName
        {
            get { return mTrackingStageName; }
            set { mTrackingStageName = value; }
        }
        public String AllTrackingStages
        {
            get { return mAllTrackingStages; }
            set { mAllTrackingStages = value; }
        }
        public String AllTrackingStages_NotDone
        {
            get { return mAllTrackingStages_NotDone; }
            set { mAllTrackingStages_NotDone = value; }
        }
        public String AllTrackingStages_Done
        {
            get { return mAllTrackingStages_Done; }
            set { mAllTrackingStages_Done = value; }
        }
        public String AllTrackingStages_CC
        {
            get { return mAllTrackingStages_CC; }
            set { mAllTrackingStages_CC = value; }
        }
        public String AllTrackingStages_CCDone
        {
            get { return mAllTrackingStages_CCDone; }
            set { mAllTrackingStages_CCDone = value; }
        }
        public String AllTrackingStages_CCNotDone
        {
            get { return mAllTrackingStages_CCNotDone; }
            set { mAllTrackingStages_CCNotDone = value; }
        }
        public Decimal GrossWeightSum
        {
            get { return mGrossWeightSum; }
            set { mGrossWeightSum = value; }
        }
        public Decimal GrossWeightTONSum
        {
            get { return mGrossWeightTONSum; }
            set { mGrossWeightTONSum = value; }
        }
        public Decimal NetWeightSum
        {
            get { return mNetWeightSum; }
            set { mNetWeightSum = value; }
        }
        public Decimal NetWeightTONSum
        {
            get { return mNetWeightTONSum; }
            set { mNetWeightTONSum = value; }
        }
        public Decimal VolumeSum
        {
            get { return mVolumeSum; }
            set { mVolumeSum = value; }
        }
        public Decimal ChargeableWeight
        {
            get { return mChargeableWeight; }
            set { mChargeableWeight = value; }
        }
        public Decimal VolumetricWeight
        {
            get { return mVolumetricWeight; }
            set { mVolumetricWeight = value; }
        }
        public String ContainerTypes20
        {
            get { return mContainerTypes20; }
            set { mContainerTypes20 = value; }
        }
        public String ContainerTypes40
        {
            get { return mContainerTypes40; }
            set { mContainerTypes40 = value; }
        }
        public String ContainerTypes45
        {
            get { return mContainerTypes45; }
            set { mContainerTypes45 = value; }
        }
        public String ContainerTypesReefer20
        {
            get { return mContainerTypesReefer20; }
            set { mContainerTypesReefer20 = value; }
        }
        public String ContainerTypesReefer40
        {
            get { return mContainerTypesReefer40; }
            set { mContainerTypesReefer40 = value; }
        }
        public String ContainerNumbers
        {
            get { return mContainerNumbers; }
            set { mContainerNumbers = value; }
        }
        public String CreatorName
        {
            get { return mCreatorName; }
            set { mCreatorName = value; }
        }
        public Decimal PayablesWithoutVAT
        {
            get { return mPayablesWithoutVAT; }
            set { mPayablesWithoutVAT = value; }
        }
        public Decimal FixedDiscount
        {
            get { return mFixedDiscount; }
            set { mFixedDiscount = value; }
        }
        public Decimal Receivables
        {
            get { return mReceivables; }
            set { mReceivables = value; }
        }
        public Decimal ReceivablesWithoutVAT
        {
            get { return mReceivablesWithoutVAT; }
            set { mReceivablesWithoutVAT = value; }
        }
        public Decimal Payables
        {
            get { return mPayables; }
            set { mPayables = value; }
        }
        public String TruckersName
        {
            get { return mTruckersName; }
            set { mTruckersName = value; }
        }
        public String QuotationCode
        {
            get { return mQuotationCode; }
            set { mQuotationCode = value; }
        }
        public Int32 OperationWithInvoiceSerial
        {
            get { return mOperationWithInvoiceSerial; }
            set { mOperationWithInvoiceSerial = value; }
        }
        public String Form13Number
        {
            get { return mForm13Number; }
            set { mForm13Number = value; }
        }
        public String ACIDNumber
        {
            get { return mACIDNumber; }
            set { mACIDNumber = value; }
        }
        public String CCAVATCertificateValue
        {
            get { return mCCAVATCertificateValue; }
            set { mCCAVATCertificateValue = value; }
        }
        public String CCACommercialProfitTax
        {
            get { return mCCACommercialProfitTax; }
            set { mCCACommercialProfitTax = value; }
        }
        public String CCACustomsValue
        {
            get { return mCCACustomsValue; }
            set { mCCACustomsValue = value; }
        }
        public String CCAStorageFees
        {
            get { return mCCAStorageFees; }
            set { mCCAStorageFees = value; }
        }
        public String CCAWindowFees
        {
            get { return mCCAWindowFees; }
            set { mCCAWindowFees = value; }
        }
        public String CCAOthers
        {
            get { return mCCAOthers; }
            set { mCCAOthers = value; }
        }
        public DateTime CCASpendDate
        {
            get { return mCCASpendDate; }
            set { mCCASpendDate = value; }
        }
        public String CCAExchangeRate
        {
            get { return mCCAExchangeRate; }
            set { mCCAExchangeRate = value; }
        }
        public String ReferenceNumber
        {
            get { return mReferenceNumber; }
            set { mReferenceNumber = value; }
        }
        public DateTime Form13Date
        {
            get { return mForm13Date; }
            set { mForm13Date = value; }
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
        public Decimal NawaleenReceivables
        {
            get { return mNawaleenReceivables; }
            set { mNawaleenReceivables = value; }
        }
        public Decimal NawaleenPayablesDiff
        {
            get { return mNawaleenPayablesDiff; }
            set { mNawaleenPayablesDiff = value; }
        }
        public Decimal AccNawaleenPayablesDiff
        {
            get { return mAccNawaleenPayablesDiff; }
            set { mAccNawaleenPayablesDiff = value; }
        }
        public String IMO_Chemical
        {
            get { return mIMO_Chemical; }
            set { mIMO_Chemical = value; }
        }
        public Int32 UnAllocatedReceivables
        {
            get { return mUnAllocatedReceivables; }
            set { mUnAllocatedReceivables = value; }
        }
        public Int32 CountTHC
        {
            get { return mCountTHC; }
            set { mCountTHC = value; }
        }
        public Int32 CountStorage
        {
            get { return mCountStorage; }
            set { mCountStorage = value; }
        }
        public Int32 CountStorageService
        {
            get { return mCountStorageService; }
            set { mCountStorageService = value; }
        }
        public Int32 CountNafeza
        {
            get { return mCountNafeza; }
            set { mCountNafeza = value; }
        }
        public Int32 CountCollectionForOthers
        {
            get { return mCountCollectionForOthers; }
            set { mCountCollectionForOthers = value; }
        }
        public Int32 CountNolon
        {
            get { return mCountNolon; }
            set { mCountNolon = value; }
        }
        public Int32 CountG3ala
        {
            get { return mCountG3ala; }
            set { mCountG3ala = value; }
        }
        public String MasterOperationCode
        {
            get { return mMasterOperationCode; }
            set { mMasterOperationCode = value; }
        }
        public Decimal HBOutcome
        {
            get { return mHBOutcome; }
            set { mHBOutcome = value; }
        }
        public Decimal HBIncome
        {
            get { return mHBIncome; }
            set { mHBIncome = value; }
        }
        public Decimal HBIncomeWithvat
        {
            get { return mHBIncomeWithvat; }
            set { mHBIncomeWithvat = value; }
        }
        public String NameConsignee2
        {
            get { return mNameConsignee2; }
            set { mNameConsignee2 = value; }
        }
        #endregion
    }

    public partial class CvwOperationsStatistics
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
        public List<CVarvwOperationsStatistics> lstCVarvwOperationsStatistics = new List<CVarvwOperationsStatistics>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string WhereClause)
        {
            return DataFill(WhereClause, true);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwOperationsStatistics.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwOperationsStatistics";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 200000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwOperationsStatistics ObjCVarvwOperationsStatistics = new CVarvwOperationsStatistics();
                        ObjCVarvwOperationsStatistics.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwOperationsStatistics.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwOperationsStatistics.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
                        ObjCVarvwOperationsStatistics.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarvwOperationsStatistics.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
                        ObjCVarvwOperationsStatistics.mBLType = Convert.ToInt32(dr["BLType"].ToString());

                        ObjCVarvwOperationsStatistics.mDaysDifference = Convert.ToString(dr["DaysDifference"].ToString());
                        ObjCVarvwOperationsStatistics.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwOperationsStatistics.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwOperationsStatistics.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwOperationsStatistics.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwOperationsStatistics.mSalesmanID = Convert.ToInt32(dr["SalesmanID"].ToString());
                        ObjCVarvwOperationsStatistics.mSalesman = Convert.ToString(dr["Salesman"].ToString());
                        ObjCVarvwOperationsStatistics.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwOperationsStatistics.mOpenedBy = Convert.ToString(dr["OpenedBy"].ToString());
                        ObjCVarvwOperationsStatistics.mShipmentType = Convert.ToInt32(dr["ShipmentType"].ToString());
                        ObjCVarvwOperationsStatistics.mShipmentTypeCode = Convert.ToString(dr["ShipmentTypeCode"].ToString());
                        ObjCVarvwOperationsStatistics.mOperationManID = Convert.ToInt32(dr["OperationManID"].ToString());
                        ObjCVarvwOperationsStatistics.mOperationManName = Convert.ToString(dr["OperationManName"].ToString());
                        ObjCVarvwOperationsStatistics.mCreatorRoleID = Convert.ToInt32(dr["CreatorRoleID"].ToString());
                        ObjCVarvwOperationsStatistics.mSalesmanRoleID = Convert.ToInt32(dr["SalesmanRoleID"].ToString());
                        ObjCVarvwOperationsStatistics.mOperationManRoleID = Convert.ToInt32(dr["OperationManRoleID"].ToString());
                        ObjCVarvwOperationsStatistics.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarvwOperationsStatistics.mPOrC = Convert.ToInt32(dr["POrC"].ToString());
                        ObjCVarvwOperationsStatistics.mDismissalPermissionSerial = Convert.ToString(dr["DismissalPermissionSerial"].ToString());
                        ObjCVarvwOperationsStatistics.mNumberOfPackages = Convert.ToInt32(dr["NumberOfPackages"].ToString());
                        ObjCVarvwOperationsStatistics.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwOperationsStatistics.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwOperationsStatistics.mDescriptionOfGoods = Convert.ToString(dr["DescriptionOfGoods"].ToString());
                        ObjCVarvwOperationsStatistics.mDeliveryAddress = Convert.ToString(dr["DeliveryAddress"].ToString());
                        ObjCVarvwOperationsStatistics.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwOperationsStatistics.mNotes2 = Convert.ToString(dr["Notes2"].ToString());
                        ObjCVarvwOperationsStatistics.mDeliveryCityID = Convert.ToInt32(dr["DeliveryCityID"].ToString());
                        ObjCVarvwOperationsStatistics.mDeliveryCityName = Convert.ToString(dr["DeliveryCityName"].ToString());
                        ObjCVarvwOperationsStatistics.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        ObjCVarvwOperationsStatistics.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarvwOperationsStatistics.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarvwOperationsStatistics.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
                        ObjCVarvwOperationsStatistics.mSupplierReference = Convert.ToString(dr["SupplierReference"].ToString());
                        ObjCVarvwOperationsStatistics.mPONumber = Convert.ToString(dr["PONumber"].ToString());
                        ObjCVarvwOperationsStatistics.mPOValue = Convert.ToString(dr["POValue"].ToString());
                        ObjCVarvwOperationsStatistics.mPODate = Convert.ToDateTime(dr["PODate"].ToString());
                        ObjCVarvwOperationsStatistics.mReleaseNumber = Convert.ToString(dr["ReleaseNumber"].ToString());
                        ObjCVarvwOperationsStatistics.mReleaseDate = Convert.ToDateTime(dr["ReleaseDate"].ToString());
                        ObjCVarvwOperationsStatistics.mReleaseValue = Convert.ToDecimal(dr["ReleaseValue"].ToString());
                        ObjCVarvwOperationsStatistics.mETAPOLDate = Convert.ToDateTime(dr["ETAPOLDate"].ToString());
                        ObjCVarvwOperationsStatistics.mExpectedDeparture = Convert.ToDateTime(dr["ExpectedDeparture"].ToString());
                        ObjCVarvwOperationsStatistics.mActualDeparture = Convert.ToDateTime(dr["ActualDeparture"].ToString());
                        ObjCVarvwOperationsStatistics.mExpectedArrival = Convert.ToDateTime(dr["ExpectedArrival"].ToString());
                        ObjCVarvwOperationsStatistics.mActualArrival = Convert.ToDateTime(dr["ActualArrival"].ToString());
                        ObjCVarvwOperationsStatistics.mUnloadingDate = Convert.ToDateTime(dr["UnloadingDate"].ToString());
                        ObjCVarvwOperationsStatistics.mTruckingApprovalDate = Convert.ToDateTime(dr["TruckingApprovalDate"].ToString());
                        ObjCVarvwOperationsStatistics.mDeliveryDate = Convert.ToDateTime(dr["DeliveryDate"].ToString());
                        ObjCVarvwOperationsStatistics.mCCADocumentReceiveDate = Convert.ToDateTime(dr["CCADocumentReceiveDate"].ToString());
                        ObjCVarvwOperationsStatistics.mFreeTime = Convert.ToInt32(dr["FreeTime"].ToString());
                        ObjCVarvwOperationsStatistics.mTransientTime = Convert.ToInt32(dr["TransientTime"].ToString());
                        ObjCVarvwOperationsStatistics.mPOLCountryID = Convert.ToInt32(dr["POLCountryID"].ToString());
                        ObjCVarvwOperationsStatistics.mPOLCountryCode = Convert.ToString(dr["POLCountryCode"].ToString());
                        ObjCVarvwOperationsStatistics.mPOLCountryName = Convert.ToString(dr["POLCountryName"].ToString());
                        ObjCVarvwOperationsStatistics.mPOL = Convert.ToInt32(dr["POL"].ToString());
                        ObjCVarvwOperationsStatistics.mPOLCode = Convert.ToString(dr["POLCode"].ToString());
                        ObjCVarvwOperationsStatistics.mPOLName = Convert.ToString(dr["POLName"].ToString());
                        ObjCVarvwOperationsStatistics.mPODCountryID = Convert.ToInt32(dr["PODCountryID"].ToString());
                        ObjCVarvwOperationsStatistics.mPODCountryCode = Convert.ToString(dr["PODCountryCode"].ToString());
                        ObjCVarvwOperationsStatistics.mPODCountryName = Convert.ToString(dr["PODCountryName"].ToString());
                        ObjCVarvwOperationsStatistics.mPOD = Convert.ToInt32(dr["POD"].ToString());
                        ObjCVarvwOperationsStatistics.mPODCode = Convert.ToString(dr["PODCode"].ToString());
                        ObjCVarvwOperationsStatistics.mPODName = Convert.ToString(dr["PODName"].ToString());
                        ObjCVarvwOperationsStatistics.mOperationStageName = Convert.ToString(dr["OperationStageName"].ToString());
                        ObjCVarvwOperationsStatistics.mBookingPartyID = Convert.ToInt32(dr["BookingPartyID"].ToString());
                        ObjCVarvwOperationsStatistics.mBookingPartyName = Convert.ToString(dr["BookingPartyName"].ToString());
                        ObjCVarvwOperationsStatistics.mCustomsClearanceAgentID = Convert.ToInt32(dr["CustomsClearanceAgentID"].ToString());
                        ObjCVarvwOperationsStatistics.mCustomsClearanceAgentName = Convert.ToString(dr["CustomsClearanceAgentName"].ToString());
                        ObjCVarvwOperationsStatistics.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarvwOperationsStatistics.mAgentName = Convert.ToString(dr["AgentName"].ToString());
                        ObjCVarvwOperationsStatistics.mShipperID = Convert.ToInt32(dr["ShipperID"].ToString());
                        ObjCVarvwOperationsStatistics.mShipperName = Convert.ToString(dr["ShipperName"].ToString());
                        ObjCVarvwOperationsStatistics.mConsigneeID = Convert.ToInt32(dr["ConsigneeID"].ToString());
                        ObjCVarvwOperationsStatistics.mConsigneeName = Convert.ToString(dr["ConsigneeName"].ToString());
                        ObjCVarvwOperationsStatistics.mNetworksNames = Convert.ToString(dr["NetworksNames"].ToString());
                        ObjCVarvwOperationsStatistics.mNotify1Name = Convert.ToString(dr["Notify1Name"].ToString());
                        ObjCVarvwOperationsStatistics.mEndUserID = Convert.ToInt32(dr["EndUserID"].ToString());
                        ObjCVarvwOperationsStatistics.mEndUserName = Convert.ToString(dr["EndUserName"].ToString());
                        ObjCVarvwOperationsStatistics.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwOperationsStatistics.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwOperationsStatistics.mClientPhonesAndFaxes = Convert.ToString(dr["ClientPhonesAndFaxes"].ToString());
                        ObjCVarvwOperationsStatistics.mClientAddress = Convert.ToString(dr["ClientAddress"].ToString());
                        ObjCVarvwOperationsStatistics.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwOperationsStatistics.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
                        ObjCVarvwOperationsStatistics.mCommodityID2 = Convert.ToInt32(dr["CommodityID2"].ToString());
                        ObjCVarvwOperationsStatistics.mCommodityName2 = Convert.ToString(dr["CommodityName2"].ToString());
                        ObjCVarvwOperationsStatistics.mCommodityID3 = Convert.ToInt32(dr["CommodityID3"].ToString());
                        ObjCVarvwOperationsStatistics.mCommodityName3 = Convert.ToString(dr["CommodityName3"].ToString());
                        ObjCVarvwOperationsStatistics.mIncotermID = Convert.ToInt32(dr["IncotermID"].ToString());
                        ObjCVarvwOperationsStatistics.mIncotermName = Convert.ToString(dr["IncotermName"].ToString());
                        ObjCVarvwOperationsStatistics.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarvwOperationsStatistics.mQuotationRouteCode = Convert.ToString(dr["QuotationRouteCode"].ToString());
                        ObjCVarvwOperationsStatistics.mCertificateNumber = Convert.ToString(dr["CertificateNumber"].ToString());
                        ObjCVarvwOperationsStatistics.mCertificateValue = Convert.ToString(dr["CertificateValue"].ToString());
                        ObjCVarvwOperationsStatistics.mCertificateDate = Convert.ToString(dr["CertificateDate"].ToString());
                        ObjCVarvwOperationsStatistics.mQasimaNumber = Convert.ToString(dr["QasimaNumber"].ToString());
                        ObjCVarvwOperationsStatistics.mMatch = Convert.ToBoolean(dr["Match"].ToString());
                        ObjCVarvwOperationsStatistics.mQasimaDate = Convert.ToString(dr["QasimaDate"].ToString());
                        ObjCVarvwOperationsStatistics.mMainRouteNotes = Convert.ToString(dr["MainRouteNotes"].ToString());
                        ObjCVarvwOperationsStatistics.mCC_ClearanceTypeID = Convert.ToInt32(dr["CC_ClearanceTypeID"].ToString());
                        ObjCVarvwOperationsStatistics.mCC_ClearanceTypeName = Convert.ToString(dr["CC_ClearanceTypeName"].ToString());
                        ObjCVarvwOperationsStatistics.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarvwOperationsStatistics.mMoveTypeName = Convert.ToString(dr["MoveTypeName"].ToString());
                        ObjCVarvwOperationsStatistics.mLineName = Convert.ToString(dr["LineName"].ToString());
                        ObjCVarvwOperationsStatistics.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarvwOperationsStatistics.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarvwOperationsStatistics.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarvwOperationsStatistics.mVesselID = Convert.ToInt32(dr["VesselID"].ToString());
                        ObjCVarvwOperationsStatistics.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwOperationsStatistics.mVoyageOrTruckNumber = Convert.ToString(dr["VoyageOrTruckNumber"].ToString());
                        ObjCVarvwOperationsStatistics.mMainRouteWarehouse = Convert.ToString(dr["MainRouteWarehouse"].ToString());
                        ObjCVarvwOperationsStatistics.mNetworkID = Convert.ToInt32(dr["NetworkID"].ToString());
                        ObjCVarvwOperationsStatistics.mNetworkName = Convert.ToString(dr["NetworkName"].ToString());
                        ObjCVarvwOperationsStatistics.mContainerTypes = Convert.ToString(dr["ContainerTypes"].ToString());
                        ObjCVarvwOperationsStatistics.mPackageTypes = Convert.ToString(dr["PackageTypes"].ToString());
                        ObjCVarvwOperationsStatistics.mPackageTypesOnContainersTotals = Convert.ToString(dr["PackageTypesOnContainersTotals"].ToString());
                        ObjCVarvwOperationsStatistics.mInvoiceNumbers = Convert.ToString(dr["InvoiceNumbers"].ToString());
                        ObjCVarvwOperationsStatistics.mHouseBLs = Convert.ToString(dr["HouseBLs"].ToString());
                        ObjCVarvwOperationsStatistics.mBookingNumbers = Convert.ToString(dr["BookingNumbers"].ToString());
                        ObjCVarvwOperationsStatistics.mTEUs = Convert.ToInt32(dr["TEUs"].ToString());
                        ObjCVarvwOperationsStatistics.mTrackingStageName = Convert.ToString(dr["TrackingStageName"].ToString());
                        ObjCVarvwOperationsStatistics.mAllTrackingStages = Convert.ToString(dr["AllTrackingStages"].ToString());
                        ObjCVarvwOperationsStatistics.mAllTrackingStages_NotDone = Convert.ToString(dr["AllTrackingStages_NotDone"].ToString());
                        ObjCVarvwOperationsStatistics.mAllTrackingStages_Done = Convert.ToString(dr["AllTrackingStages_Done"].ToString());
                        ObjCVarvwOperationsStatistics.mAllTrackingStages_CC = Convert.ToString(dr["AllTrackingStages_CC"].ToString());
                        ObjCVarvwOperationsStatistics.mAllTrackingStages_CCDone = Convert.ToString(dr["AllTrackingStages_CCDone"].ToString());
                        ObjCVarvwOperationsStatistics.mAllTrackingStages_CCNotDone = Convert.ToString(dr["AllTrackingStages_CCNotDone"].ToString());
                        ObjCVarvwOperationsStatistics.mGrossWeightSum = Convert.ToDecimal(dr["GrossWeightSum"].ToString());
                        ObjCVarvwOperationsStatistics.mGrossWeightTONSum = Convert.ToDecimal(dr["GrossWeightTONSum"].ToString());
                        ObjCVarvwOperationsStatistics.mNetWeightSum = Convert.ToDecimal(dr["NetWeightSum"].ToString());
                        ObjCVarvwOperationsStatistics.mNetWeightTONSum = Convert.ToDecimal(dr["NetWeightTONSum"].ToString());
                        ObjCVarvwOperationsStatistics.mVolumeSum = Convert.ToDecimal(dr["VolumeSum"].ToString());
                        ObjCVarvwOperationsStatistics.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
                        ObjCVarvwOperationsStatistics.mVolumetricWeight = Convert.ToDecimal(dr["VolumetricWeight"].ToString());
                        ObjCVarvwOperationsStatistics.mContainerTypes20 = Convert.ToString(dr["ContainerTypes20"].ToString());
                        ObjCVarvwOperationsStatistics.mContainerTypes40 = Convert.ToString(dr["ContainerTypes40"].ToString());
                        ObjCVarvwOperationsStatistics.mContainerTypes45 = Convert.ToString(dr["ContainerTypes45"].ToString());
                        ObjCVarvwOperationsStatistics.mContainerTypesReefer20 = Convert.ToString(dr["ContainerTypesReefer20"].ToString());
                        ObjCVarvwOperationsStatistics.mContainerTypesReefer40 = Convert.ToString(dr["ContainerTypesReefer40"].ToString());
                        ObjCVarvwOperationsStatistics.mContainerNumbers = Convert.ToString(dr["ContainerNumbers"].ToString());
                        ObjCVarvwOperationsStatistics.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwOperationsStatistics.mPayablesWithoutVAT = Convert.ToDecimal(dr["PayablesWithoutVAT"].ToString());
                        ObjCVarvwOperationsStatistics.mFixedDiscount = Convert.ToDecimal(dr["FixedDiscount"].ToString());
                        ObjCVarvwOperationsStatistics.mReceivables = Convert.ToDecimal(dr["Receivables"].ToString());
                        ObjCVarvwOperationsStatistics.mReceivablesWithoutVAT = Convert.ToDecimal(dr["ReceivablesWithoutVAT"].ToString());
                        ObjCVarvwOperationsStatistics.mPayables = Convert.ToDecimal(dr["Payables"].ToString());
                        ObjCVarvwOperationsStatistics.mTruckersName = Convert.ToString(dr["TruckersName"].ToString());
                        ObjCVarvwOperationsStatistics.mQuotationCode = Convert.ToString(dr["QuotationCode"].ToString());
                        ObjCVarvwOperationsStatistics.mOperationWithInvoiceSerial = Convert.ToInt32(dr["OperationWithInvoiceSerial"].ToString());
                        ObjCVarvwOperationsStatistics.mForm13Number = Convert.ToString(dr["Form13Number"].ToString());
                        ObjCVarvwOperationsStatistics.mACIDNumber = Convert.ToString(dr["ACIDNumber"].ToString());
                        ObjCVarvwOperationsStatistics.mCCAVATCertificateValue = Convert.ToString(dr["CCAVATCertificateValue"].ToString());
                        ObjCVarvwOperationsStatistics.mCCACommercialProfitTax = Convert.ToString(dr["CCACommercialProfitTax"].ToString());
                        ObjCVarvwOperationsStatistics.mCCACustomsValue = Convert.ToString(dr["CCACustomsValue"].ToString());
                        ObjCVarvwOperationsStatistics.mCCAStorageFees = Convert.ToString(dr["CCAStorageFees"].ToString());
                        ObjCVarvwOperationsStatistics.mCCAWindowFees = Convert.ToString(dr["CCAWindowFees"].ToString());
                        ObjCVarvwOperationsStatistics.mCCAOthers = Convert.ToString(dr["CCAOthers"].ToString());
                        ObjCVarvwOperationsStatistics.mCCASpendDate = Convert.ToDateTime(dr["CCASpendDate"].ToString());
                        ObjCVarvwOperationsStatistics.mCCAExchangeRate = Convert.ToString(dr["CCAExchangeRate"].ToString());
                        ObjCVarvwOperationsStatistics.mReferenceNumber = Convert.ToString(dr["ReferenceNumber"].ToString());
                        ObjCVarvwOperationsStatistics.mForm13Date = Convert.ToDateTime(dr["Form13Date"].ToString());
                        ObjCVarvwOperationsStatistics.mChassisNumbers = Convert.ToString(dr["ChassisNumbers"].ToString());
                        ObjCVarvwOperationsStatistics.mMasterOperationCode = Convert.ToString(dr["MasterOperationCode"].ToString());
                        ObjCVarvwOperationsStatistics.mHBOutcome = Convert.ToDecimal(dr["HBOutcome"].ToString());
                        ObjCVarvwOperationsStatistics.mHBIncome = Convert.ToDecimal(dr["HBIncome"].ToString());
                        ObjCVarvwOperationsStatistics.mHBIncomeWithvat = Convert.ToDecimal(dr["HBIncomeWithvat"].ToString());
                        ObjCVarvwOperationsStatistics.mNameConsignee2 = Convert.ToString(dr["NameConsignee2"].ToString());

                        lstCVarvwOperationsStatistics.Add(ObjCVarvwOperationsStatistics);
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

    #endregion

    #region Customized
    public partial class CVarvwOperationsStatistics
    {
        #region "variables" 
        internal string mFirstInvoiceDate;
        #endregion
        #region "Methods"
        public string FirstInvoiceDate
        {
            get { return mFirstInvoiceDate; }
            set { mFirstInvoiceDate = value; }
        }
        #endregion
    }
    public partial class CvwOperationsStatistics
    {
        public Exception GetListPaging_FilterInvoices(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, string pFromInvoiceDate, string pToInvoiceDate, out Int32 TotalRecords)
        {
            return DataFill(PageSize, PageNumber, WhereClause, OrderBy, pFromInvoiceDate, pToInvoiceDate, out TotalRecords);
        }

        private Exception DataFill(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, string FromInvoiceDate, string ToInvoiceDate, out Int32 TotRecs)
        {
            Exception Exp = null;
            TotRecs = 0;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwOperationsStatistics.Clear();

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
                Com.Parameters.Add(new SqlParameter("@FromInvoiceDate", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@ToInvoiceDate", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingvwOperationsStatistics_FilterInvoices";
                Com.Parameters[0].Value = PageSize;
                Com.Parameters[1].Value = PageNumber;
                Com.Parameters[2].Value = WhereClause;
                Com.Parameters[3].Value = OrderBy;
                Com.Parameters[4].Value = FromInvoiceDate;
                Com.Parameters[5].Value = ToInvoiceDate;
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 200000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwOperationsStatistics ObjCVarvwOperationsStatistics = new CVarvwOperationsStatistics();
                        ObjCVarvwOperationsStatistics.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwOperationsStatistics.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwOperationsStatistics.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
                        ObjCVarvwOperationsStatistics.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarvwOperationsStatistics.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
                        ObjCVarvwOperationsStatistics.mBLType = Convert.ToInt32(dr["BLType"].ToString());
                        ObjCVarvwOperationsStatistics.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwOperationsStatistics.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwOperationsStatistics.mDaysDifference = Convert.ToString(dr["DaysDifference"].ToString());
                        ObjCVarvwOperationsStatistics.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwOperationsStatistics.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwOperationsStatistics.mSalesmanID = Convert.ToInt32(dr["SalesmanID"].ToString());
                        ObjCVarvwOperationsStatistics.mSalesman = Convert.ToString(dr["Salesman"].ToString());
                        ObjCVarvwOperationsStatistics.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwOperationsStatistics.mOpenedBy = Convert.ToString(dr["OpenedBy"].ToString());
                        ObjCVarvwOperationsStatistics.mShipmentType = Convert.ToInt32(dr["ShipmentType"].ToString());
                        ObjCVarvwOperationsStatistics.mShipmentTypeCode = Convert.ToString(dr["ShipmentTypeCode"].ToString());
                        ObjCVarvwOperationsStatistics.mOperationManID = Convert.ToInt32(dr["OperationManID"].ToString());
                        ObjCVarvwOperationsStatistics.mOperationManName = Convert.ToString(dr["OperationManName"].ToString());
                        ObjCVarvwOperationsStatistics.mCreatorRoleID = Convert.ToInt32(dr["CreatorRoleID"].ToString());
                        ObjCVarvwOperationsStatistics.mSalesmanRoleID = Convert.ToInt32(dr["SalesmanRoleID"].ToString());
                        ObjCVarvwOperationsStatistics.mOperationManRoleID = Convert.ToInt32(dr["OperationManRoleID"].ToString());
                        ObjCVarvwOperationsStatistics.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarvwOperationsStatistics.mPOrC = Convert.ToInt32(dr["POrC"].ToString());
                        ObjCVarvwOperationsStatistics.mDismissalPermissionSerial = Convert.ToString(dr["DismissalPermissionSerial"].ToString());
                        ObjCVarvwOperationsStatistics.mNumberOfPackages = Convert.ToInt32(dr["NumberOfPackages"].ToString());
                        ObjCVarvwOperationsStatistics.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwOperationsStatistics.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwOperationsStatistics.mDescriptionOfGoods = Convert.ToString(dr["DescriptionOfGoods"].ToString());
                        ObjCVarvwOperationsStatistics.mDeliveryAddress = Convert.ToString(dr["DeliveryAddress"].ToString());
                        ObjCVarvwOperationsStatistics.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwOperationsStatistics.mNotes2 = Convert.ToString(dr["Notes2"].ToString());
                        ObjCVarvwOperationsStatistics.mDeliveryCityID = Convert.ToInt32(dr["DeliveryCityID"].ToString());
                        ObjCVarvwOperationsStatistics.mDeliveryCityName = Convert.ToString(dr["DeliveryCityName"].ToString());
                        ObjCVarvwOperationsStatistics.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        ObjCVarvwOperationsStatistics.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarvwOperationsStatistics.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarvwOperationsStatistics.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
                        ObjCVarvwOperationsStatistics.mSupplierReference = Convert.ToString(dr["SupplierReference"].ToString());
                        ObjCVarvwOperationsStatistics.mPONumber = Convert.ToString(dr["PONumber"].ToString());
                        ObjCVarvwOperationsStatistics.mPOValue = Convert.ToString(dr["POValue"].ToString());
                        ObjCVarvwOperationsStatistics.mPODate = Convert.ToDateTime(dr["PODate"].ToString());
                        ObjCVarvwOperationsStatistics.mReleaseNumber = Convert.ToString(dr["ReleaseNumber"].ToString());
                        ObjCVarvwOperationsStatistics.mReleaseDate = Convert.ToDateTime(dr["ReleaseDate"].ToString());
                        ObjCVarvwOperationsStatistics.mReleaseValue = Convert.ToDecimal(dr["ReleaseValue"].ToString());
                        ObjCVarvwOperationsStatistics.mETAPOLDate = Convert.ToDateTime(dr["ETAPOLDate"].ToString());
                        ObjCVarvwOperationsStatistics.mExpectedDeparture = Convert.ToDateTime(dr["ExpectedDeparture"].ToString());
                        ObjCVarvwOperationsStatistics.mActualDeparture = Convert.ToDateTime(dr["ActualDeparture"].ToString());
                        ObjCVarvwOperationsStatistics.mExpectedArrival = Convert.ToDateTime(dr["ExpectedArrival"].ToString());
                        ObjCVarvwOperationsStatistics.mActualArrival = Convert.ToDateTime(dr["ActualArrival"].ToString());
                        ObjCVarvwOperationsStatistics.mUnloadingDate = Convert.ToDateTime(dr["UnloadingDate"].ToString());
                        ObjCVarvwOperationsStatistics.mDeliveryDate = Convert.ToDateTime(dr["DeliveryDate"].ToString());
                        ObjCVarvwOperationsStatistics.mTruckingApprovalDate = Convert.ToDateTime(dr["TruckingApprovalDate"].ToString());
                        ObjCVarvwOperationsStatistics.mCCADocumentReceiveDate = Convert.ToDateTime(dr["CCADocumentReceiveDate"].ToString());
                        ObjCVarvwOperationsStatistics.mFreeTime = Convert.ToInt32(dr["FreeTime"].ToString());
                        ObjCVarvwOperationsStatistics.mTransientTime = Convert.ToInt32(dr["TransientTime"].ToString());
                        ObjCVarvwOperationsStatistics.mPOLCountryID = Convert.ToInt32(dr["POLCountryID"].ToString());
                        ObjCVarvwOperationsStatistics.mPOLCountryCode = Convert.ToString(dr["POLCountryCode"].ToString());
                        ObjCVarvwOperationsStatistics.mPOLCountryName = Convert.ToString(dr["POLCountryName"].ToString());
                        ObjCVarvwOperationsStatistics.mPOL = Convert.ToInt32(dr["POL"].ToString());
                        ObjCVarvwOperationsStatistics.mPOLCode = Convert.ToString(dr["POLCode"].ToString());
                        ObjCVarvwOperationsStatistics.mPOLName = Convert.ToString(dr["POLName"].ToString());
                        ObjCVarvwOperationsStatistics.mPODCountryID = Convert.ToInt32(dr["PODCountryID"].ToString());
                        ObjCVarvwOperationsStatistics.mPODCountryCode = Convert.ToString(dr["PODCountryCode"].ToString());
                        ObjCVarvwOperationsStatistics.mPODCountryName = Convert.ToString(dr["PODCountryName"].ToString());
                        ObjCVarvwOperationsStatistics.mPOD = Convert.ToInt32(dr["POD"].ToString());
                        ObjCVarvwOperationsStatistics.mPODCode = Convert.ToString(dr["PODCode"].ToString());
                        ObjCVarvwOperationsStatistics.mPODName = Convert.ToString(dr["PODName"].ToString());
                        ObjCVarvwOperationsStatistics.mOperationStageName = Convert.ToString(dr["OperationStageName"].ToString());
                        ObjCVarvwOperationsStatistics.mBookingPartyID = Convert.ToInt32(dr["BookingPartyID"].ToString());
                        ObjCVarvwOperationsStatistics.mBookingPartyName = Convert.ToString(dr["BookingPartyName"].ToString());
                        ObjCVarvwOperationsStatistics.mCustomsClearanceAgentID = Convert.ToInt32(dr["CustomsClearanceAgentID"].ToString());
                        ObjCVarvwOperationsStatistics.mCustomsClearanceAgentName = Convert.ToString(dr["CustomsClearanceAgentName"].ToString());
                        ObjCVarvwOperationsStatistics.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarvwOperationsStatistics.mAgentName = Convert.ToString(dr["AgentName"].ToString());
                        ObjCVarvwOperationsStatistics.mShipperID = Convert.ToInt32(dr["ShipperID"].ToString());
                        ObjCVarvwOperationsStatistics.mShipperName = Convert.ToString(dr["ShipperName"].ToString());
                        ObjCVarvwOperationsStatistics.mConsigneeID = Convert.ToInt32(dr["ConsigneeID"].ToString());
                        ObjCVarvwOperationsStatistics.mConsigneeName = Convert.ToString(dr["ConsigneeName"].ToString());
                        ObjCVarvwOperationsStatistics.mNetworksNames = Convert.ToString(dr["NetworksNames"].ToString());
                        ObjCVarvwOperationsStatistics.mNotify1Name = Convert.ToString(dr["Notify1Name"].ToString());
                        ObjCVarvwOperationsStatistics.mEndUserID = Convert.ToInt32(dr["EndUserID"].ToString());
                        ObjCVarvwOperationsStatistics.mEndUserName = Convert.ToString(dr["EndUserName"].ToString());
                        ObjCVarvwOperationsStatistics.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwOperationsStatistics.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwOperationsStatistics.mClientPhonesAndFaxes = Convert.ToString(dr["ClientPhonesAndFaxes"].ToString());
                        ObjCVarvwOperationsStatistics.mClientAddress = Convert.ToString(dr["ClientAddress"].ToString());
                        ObjCVarvwOperationsStatistics.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwOperationsStatistics.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
                        ObjCVarvwOperationsStatistics.mCommodityID2 = Convert.ToInt32(dr["CommodityID2"].ToString());
                        ObjCVarvwOperationsStatistics.mCommodityName2 = Convert.ToString(dr["CommodityName2"].ToString());
                        ObjCVarvwOperationsStatistics.mCommodityID3 = Convert.ToInt32(dr["CommodityID3"].ToString());
                        ObjCVarvwOperationsStatistics.mCommodityName3 = Convert.ToString(dr["CommodityName3"].ToString());
                        ObjCVarvwOperationsStatistics.mIncotermID = Convert.ToInt32(dr["IncotermID"].ToString());
                        ObjCVarvwOperationsStatistics.mIncotermName = Convert.ToString(dr["IncotermName"].ToString());
                        ObjCVarvwOperationsStatistics.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarvwOperationsStatistics.mQuotationRouteCode = Convert.ToString(dr["QuotationRouteCode"].ToString());
                        ObjCVarvwOperationsStatistics.mCertificateNumber = Convert.ToString(dr["CertificateNumber"].ToString());
                        ObjCVarvwOperationsStatistics.mCertificateValue = Convert.ToString(dr["CertificateValue"].ToString());
                        ObjCVarvwOperationsStatistics.mCertificateDate = Convert.ToString(dr["CertificateDate"].ToString());
                        ObjCVarvwOperationsStatistics.mQasimaNumber = Convert.ToString(dr["QasimaNumber"].ToString());
                        ObjCVarvwOperationsStatistics.mMatch = Convert.ToBoolean(dr["Match"].ToString());
                        ObjCVarvwOperationsStatistics.mQasimaDate = Convert.ToString(dr["QasimaDate"].ToString());
                        ObjCVarvwOperationsStatistics.mMainRouteNotes = Convert.ToString(dr["MainRouteNotes"].ToString());
                        ObjCVarvwOperationsStatistics.mCC_ClearanceTypeID = Convert.ToInt32(dr["CC_ClearanceTypeID"].ToString());
                        ObjCVarvwOperationsStatistics.mCC_ClearanceTypeName = Convert.ToString(dr["CC_ClearanceTypeName"].ToString());
                        ObjCVarvwOperationsStatistics.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarvwOperationsStatistics.mMoveTypeName = Convert.ToString(dr["MoveTypeName"].ToString());
                        ObjCVarvwOperationsStatistics.mLineName = Convert.ToString(dr["LineName"].ToString());
                        ObjCVarvwOperationsStatistics.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarvwOperationsStatistics.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarvwOperationsStatistics.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarvwOperationsStatistics.mVesselID = Convert.ToInt32(dr["VesselID"].ToString());
                        ObjCVarvwOperationsStatistics.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwOperationsStatistics.mVoyageOrTruckNumber = Convert.ToString(dr["VoyageOrTruckNumber"].ToString());
                        ObjCVarvwOperationsStatistics.mMainRouteWarehouse = Convert.ToString(dr["MainRouteWarehouse"].ToString());
                        ObjCVarvwOperationsStatistics.mNetworkID = Convert.ToInt32(dr["NetworkID"].ToString());
                        ObjCVarvwOperationsStatistics.mNetworkName = Convert.ToString(dr["NetworkName"].ToString());
                        ObjCVarvwOperationsStatistics.mContainerTypes = Convert.ToString(dr["ContainerTypes"].ToString());
                        ObjCVarvwOperationsStatistics.mPackageTypes = Convert.ToString(dr["PackageTypes"].ToString());
                        ObjCVarvwOperationsStatistics.mPackageTypesOnContainersTotals = Convert.ToString(dr["PackageTypesOnContainersTotals"].ToString());
                        ObjCVarvwOperationsStatistics.mInvoiceNumbers = Convert.ToString(dr["InvoiceNumbers"].ToString());
                        ObjCVarvwOperationsStatistics.mFirstInvoiceDate = Convert.ToString(dr["FirstInvoiceDate"].ToString());
                        ObjCVarvwOperationsStatistics.mHouseBLs = Convert.ToString(dr["HouseBLs"].ToString());
                        ObjCVarvwOperationsStatistics.mBookingNumbers = Convert.ToString(dr["BookingNumbers"].ToString());
                        ObjCVarvwOperationsStatistics.mTEUs = Convert.ToInt32(dr["TEUs"].ToString());
                        ObjCVarvwOperationsStatistics.mTrackingStageName = Convert.ToString(dr["TrackingStageName"].ToString());
                        ObjCVarvwOperationsStatistics.mAllTrackingStages = Convert.ToString(dr["AllTrackingStages"].ToString());
                        ObjCVarvwOperationsStatistics.mAllTrackingStages_NotDone = Convert.ToString(dr["AllTrackingStages_NotDone"].ToString());
                        ObjCVarvwOperationsStatistics.mAllTrackingStages_Done = Convert.ToString(dr["AllTrackingStages_Done"].ToString());
                        ObjCVarvwOperationsStatistics.mAllTrackingStages_CC = Convert.ToString(dr["AllTrackingStages_CC"].ToString());
                        ObjCVarvwOperationsStatistics.mAllTrackingStages_CCDone = Convert.ToString(dr["AllTrackingStages_CCDone"].ToString());
                        ObjCVarvwOperationsStatistics.mAllTrackingStages_CCNotDone = Convert.ToString(dr["AllTrackingStages_CCNotDone"].ToString());
                        ObjCVarvwOperationsStatistics.mGrossWeightSum = Convert.ToDecimal(dr["GrossWeightSum"].ToString());
                        ObjCVarvwOperationsStatistics.mGrossWeightTONSum = Convert.ToDecimal(dr["GrossWeightTONSum"].ToString());
                        ObjCVarvwOperationsStatistics.mNetWeightSum = Convert.ToDecimal(dr["NetWeightSum"].ToString());
                        ObjCVarvwOperationsStatistics.mNetWeightTONSum = Convert.ToDecimal(dr["NetWeightTONSum"].ToString());
                        ObjCVarvwOperationsStatistics.mVolumeSum = Convert.ToDecimal(dr["VolumeSum"].ToString());
                        ObjCVarvwOperationsStatistics.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
                        ObjCVarvwOperationsStatistics.mVolumetricWeight = Convert.ToDecimal(dr["VolumetricWeight"].ToString());
                        ObjCVarvwOperationsStatistics.mContainerTypes20 = Convert.ToString(dr["ContainerTypes20"].ToString());
                        ObjCVarvwOperationsStatistics.mContainerTypes40 = Convert.ToString(dr["ContainerTypes40"].ToString());
                        ObjCVarvwOperationsStatistics.mContainerTypes45 = Convert.ToString(dr["ContainerTypes45"].ToString());
                        ObjCVarvwOperationsStatistics.mContainerTypesReefer20 = Convert.ToString(dr["ContainerTypesReefer20"].ToString());
                        ObjCVarvwOperationsStatistics.mContainerTypesReefer40 = Convert.ToString(dr["ContainerTypesReefer40"].ToString());
                        ObjCVarvwOperationsStatistics.mContainerNumbers = Convert.ToString(dr["ContainerNumbers"].ToString());
                        ObjCVarvwOperationsStatistics.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwOperationsStatistics.mPayablesWithoutVAT = Convert.ToDecimal(dr["PayablesWithoutVAT"].ToString());
                        ObjCVarvwOperationsStatistics.mReceivablesWithoutVAT = Convert.ToDecimal(dr["ReceivablesWithoutVAT"].ToString());
                        ObjCVarvwOperationsStatistics.mPayables = Convert.ToDecimal(dr["Payables"].ToString());
                        ObjCVarvwOperationsStatistics.mReceivables = Convert.ToDecimal(dr["Receivables"].ToString());
                        ObjCVarvwOperationsStatistics.mFixedDiscount = Convert.ToDecimal(dr["FixedDiscount"].ToString());
                        ObjCVarvwOperationsStatistics.mTruckersName = Convert.ToString(dr["TruckersName"].ToString());
                        ObjCVarvwOperationsStatistics.mQuotationCode = Convert.ToString(dr["QuotationCode"].ToString());
                        ObjCVarvwOperationsStatistics.mOperationWithInvoiceSerial = Convert.ToInt32(dr["OperationWithInvoiceSerial"].ToString());
                        ObjCVarvwOperationsStatistics.mForm13Number = Convert.ToString(dr["Form13Number"].ToString());
                        ObjCVarvwOperationsStatistics.mACIDNumber = Convert.ToString(dr["ACIDNumber"].ToString());
                        ObjCVarvwOperationsStatistics.mChassisNumbers = Convert.ToString(dr["ChassisNumbers"].ToString());
                        //ObjCVarvwOperationsStatistics.mEntryDate = Convert.ToDateTime(dr["EntryDate"].ToString());
                        //ObjCVarvwOperationsStatistics.mStorageEndDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        //ObjCVarvwOperationsStatistics.mNawaleenReceivables = Convert.ToDecimal(dr["NawaleenReceivables"].ToString());
                        //ObjCVarvwOperationsStatistics.mNawaleenPayablesDiff = Convert.ToDecimal(dr["NawaleenPayablesDiff"].ToString());
                        //ObjCVarvwOperationsStatistics.mAccNawaleenPayablesDiff = Convert.ToDecimal(dr["AccNawaleenPayablesDiff"].ToString());
                        //ObjCVarvwOperationsStatistics.mIMO_Chemical =dr["IMO_Chemical"].ToString();
                        ObjCVarvwOperationsStatistics.mMasterOperationCode = Convert.ToString(dr["MasterOperationCode"].ToString());
                        ObjCVarvwOperationsStatistics.mHBOutcome = Convert.ToDecimal(dr["HBOutcome"].ToString());
                        ObjCVarvwOperationsStatistics.mHBIncome = Convert.ToDecimal(dr["HBIncome"].ToString());
                        ObjCVarvwOperationsStatistics.mHBIncomeWithvat = Convert.ToDecimal(dr["HBIncomeWithvat"].ToString());
                        ObjCVarvwOperationsStatistics.mNameConsignee2 = Convert.ToString(dr["NameConsignee2"].ToString());


                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwOperationsStatistics.Add(ObjCVarvwOperationsStatistics);
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
    }
    #endregion



}
