using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Customized
{
	[Serializable]
	public class CPKvwVoucherOperationsPayment
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
	public partial class CVarvwVoucherOperationsPayment : CPKvwVoucherOperationsPayment
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int64 mVoucherID;
		internal Int64 mQuotationRouteID;
		internal String mCode;
		internal String mCodeWithoutDashes;
		internal Int32 mCodeSerial;
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
		internal Int32 mTrackingStageID;
		internal String mTrackingStageName;
		internal Int32 mBookingPartyID;
		internal String mBookingPartyName;
		internal Int32 mCustomsClearanceAgentID;
		internal String mCustomsClearanceAgentName;
		internal String mCertificateNumber;
		internal String mCertificateValue;
		internal String mCertificateDate;
		internal String mQasimaNumber;
		internal String mQasimaDate;
		internal String mFirstInvoiceDate;
		internal Int32 mNetworkID;
		internal String mNetworkName;
		internal Int64 mMAWBStockID;
		internal String mMAWBSuffix;
		internal String mMasterBL;
		internal DateTime mBLDate;
		internal Int32 mVia1;
		internal Int32 mVia2;
		internal Int32 mVia3;
		internal String mHouseNumber;
		internal String mHBLDate;
		internal Int32 mAgentID;
		internal Int32 mAgentAddressID;
		internal Int32 mAgentContactID;
		internal Int32 mShipperID;
		internal String mShipperAddress;
		internal String mShipperPhonesAndFaxes;
		internal Int32 mShipperAddressID;
		internal Int32 mShipperContactID;
		internal Int32 mConsigneeID;
		internal String mConsigneeAddress;
		internal String mConsigneePhonesAndFaxes;
		internal Int32 mConsigneeAddressID;
		internal Int32 mConsigneeContactID;
		internal String mAgentName;
		internal String mAgentLocalName;
		internal String mShipperName;
		internal String mShipperLocalName;
		internal String mConsigneeName;
		internal String mConsigneeLocalName;
		internal String mNotify1Name;
		internal Int32 mIncotermID;
		internal Int32 mPOrC;
		internal Int32 mMoveTypeID;
		internal Int32 mCommodityID;
		internal Int32 mTransientTime;
		internal String mCurrencyCode;
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
		internal Int32 mShippingLineID;
		internal Int32 mAirlineID;
		internal Int32 mTruckerID;
		internal Int32 mLineID;
		internal String mLineName;
		internal String mLineLocalName;
		internal String mLineBankName;
		internal String mLineBankAccountNumber;
		internal Boolean mIncludeDelivery;
		internal String mDeliveryZipCode;
		internal Int32 mDeliveryCityID;
		internal Int32 mDeliveryCountryID;
		internal Decimal mGrossWeight;
		internal Decimal mVolume;
		internal Decimal mChargeableWeight;
		internal Decimal mTareWeight;
		internal Int32 mNumberOfPackages;
		internal Int32 mPackageTypeID;
		internal String mPackageTypeName;
		internal Boolean mIsDangerousGoods;
		internal String mNotes;
		internal String mCustomerReference;
		internal String mSupplierReference;
		internal String mPONumber;
		internal String mPOValue;
		internal DateTime mPODate;
		internal String mAgreedRate;
		internal Int32 mOperationStageID;
		internal Int64 mMasterOperationID;
		internal Int32 mNumberOfHousesConnected;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		internal Int32 mModificatorUserID;
		internal DateTime mModificationDate;
		internal Int64 mPlacedOnOperationContainersAndPackagesID;
		internal Boolean mIsPackagesPlacedOnMaster;
		internal Int64 mQuotationID;
		internal String mQuotationCode;
		internal String mQRNotes;
		internal String mContainerTypeCode;
		internal String mContainerNumber;
		internal String mBranchName;
		internal String mBranchLocalName;
		internal String mOpenedBy;
		internal String mSalesman;
		internal String mMoveTypeCode;
		internal String mMoveTypeName;
		internal String mLocalName;
		internal String mMoveTypeIconName;
		internal String mMoveTypeIconStyle;
		internal String mIncotermCode;
		internal String mIncotermName;
		internal String mPOrCCode;
		internal String mPOrCName;
		internal String mShipmentTypeCode;
		internal String mCommodityCode;
		internal String mCommodityName;
		internal String mPOLCountryCode;
		internal String mPOLCountryName;
		internal String mPOLCode;
		internal String mPOLName;
		internal String mPODCountryCode;
		internal String mPODCountryName;
		internal String mPickupAddress;
		internal String mDeliveryAddress;
		internal String mPODCode;
		internal String mPODName;
		internal Int32 mMasterShippingLineID;
		internal Int32 mMasterAirlineID;
		internal Int32 mMasterTruckerID;
		internal String mShippingLineCode;
		internal String mShippingLineName;
		internal String mAirlineCode;
		internal String mAirlineName;
		internal String mAirlinePrefix;
		internal Int32 mTruckerCode;
		internal String mTruckerName;
		internal String mVia1Code;
		internal String mVia1Name;
		internal String mVia1LocalName;
		internal String mVia2Code;
		internal String mVia2Name;
		internal String mVia2LocalName;
		internal String mVia3Code;
		internal String mVia3Name;
		internal String mVia3LocalName;
		internal String mAirlineCode1;
		internal String mAirlineCode2;
		internal String mAirlineCode3;
		internal String mPickupCityCode;
		internal String mPickupCityName;
		internal String mDeliveryCityCode;
		internal String mDeliveryCityName;
		internal String mCountryCode;
		internal String mDeliveryCountryName;
		internal String mOperationStageCode;
		internal String mOperationStageName;
		internal String mMasterOperationCode;
		internal Int32 mMasterOperationCodeSerial;
		internal Boolean mIsAWB;
		internal Boolean mIsDelivered;
		internal Boolean mIsTrucking;
		internal Boolean mIsInsurance;
		internal Boolean mIsClearance;
		internal Boolean mIsGenset;
		internal Boolean mIsCourrier;
		internal Boolean mIsOBL;
		internal Boolean mIsTelexRelease;
		internal String mCreatorName;
		internal String mCreatorLocalName;
		internal String mModificatorName;
		internal String mModificatorLocalName;
		internal String mBookingNumbers;
		internal String mVoyageOrTruckNumber;
		internal Int32 mFreeTime;
		internal DateTime mETAPOLDate;
		internal DateTime mATAPOLDate;
		internal DateTime mExpectedDeparture;
		internal DateTime mActualDeparture;
		internal DateTime mExpectedArrival;
		internal DateTime mActualArrival;
		internal String mRepBLTypeShown;
		internal String mRepDirectionTypeShown;
		internal String mRepTransportTypeShown;
		internal Int32 mClientID;
		internal String mClientName;
		internal String mClientPhonesAndFaxes;
		internal String mClientAddress;
		internal String mContainerNumbers;
		internal String mDimensions;
		internal Int32 mTEUs;
		internal Decimal mGrossWeightSum;
		internal Decimal mVGM;
		internal Decimal mVGMSum;
		internal Decimal mNetWeight;
		internal Decimal mNetWeightSum;
		internal String mDescriptionOfGoods;
		internal String mInvoiceNumbers;
		internal String mAllTrackingStages;
		internal String mHouseBLs;
		internal String mHouseClients;
		internal Decimal mVolumeSum;
		internal Int32 mVesselID;
		internal String mVesselName;
		internal String mContainerTypes;
		internal String mContainerTypes20;
		internal String mContainerTypes40;
		internal String mContainerTypes45;
		internal String mContainerTypesReefer20;
		internal String mContainerTypesReefer40;
		internal String mPackageTypesOnContainersTotals;
		internal String mPackageTypes;
		internal String mExtraPackages;
		internal String mEffectiveOperationCode;
		internal Int64 mEffectiveOperationID;
		internal String mMonthYear;
		internal String mReference;
		internal Int32 mConsigneeID2;
		internal String mConsignee2Name;
		internal String mConsignee2LocalName;
		internal DateTime mReleaseDate;
		internal String mReleaseNumber;
		internal Decimal mReleaseValue;
		internal Int32 mTypeOfStockID;
		internal Int32 mAirLineID1;
		internal Int32 mAirLineID2;
		internal Int32 mAirLineID3;
		internal String mFlightNo1;
		internal String mFlightNo2;
		internal String mFlightNo3;
		internal DateTime mFlightDate1;
		internal DateTime mFlightDate2;
		internal DateTime mFlightDate3;
		internal String mBarcode;
		internal String mDescription;
		internal String mAmountOfInsurance;
		internal String mDeclaredValueForCarriage;
		internal Decimal mWeightCharge;
		internal Decimal mValuationCharge;
		internal Decimal mTax;
		internal Decimal mOtherChargesDueAgent;
		internal Decimal mOtherChargesDueCarrier;
		internal String mOtherCharges;
		internal Int32 mCurrencyID;
		internal String mAccountingInformation;
		internal String mReferenceNumber;
		internal String mOptionalShippingInformation;
		internal String mCHGSCode;
		internal String mWT_VALL;
		internal String mWT_VALL_Other;
		internal String mDeclaredValueForCustoms;
		internal String mFlightNo;
		internal Int32 mOpenYear;
		#endregion

		#region "Methods"
		public Int64 VoucherID
		{
			get { return mVoucherID; }
			set { mVoucherID = value; }
		}
		public Int64 QuotationRouteID
		{
			get { return mQuotationRouteID; }
			set { mQuotationRouteID = value; }
		}
		public String Code
		{
			get { return mCode; }
			set { mCode = value; }
		}
		public String CodeWithoutDashes
		{
			get { return mCodeWithoutDashes; }
			set { mCodeWithoutDashes = value; }
		}
		public Int32 CodeSerial
		{
			get { return mCodeSerial; }
			set { mCodeSerial = value; }
		}
		public Int32 BranchID
		{
			get { return mBranchID; }
			set { mBranchID = value; }
		}
		public Int32 SalesmanID
		{
			get { return mSalesmanID; }
			set { mSalesmanID = value; }
		}
		public Int32 BLType
		{
			get { return mBLType; }
			set { mBLType = value; }
		}
		public String BLTypeIconName
		{
			get { return mBLTypeIconName; }
			set { mBLTypeIconName = value; }
		}
		public String BLTypeIconStyle
		{
			get { return mBLTypeIconStyle; }
			set { mBLTypeIconStyle = value; }
		}
		public Int32 DirectionType
		{
			get { return mDirectionType; }
			set { mDirectionType = value; }
		}
		public String DirectionIconName
		{
			get { return mDirectionIconName; }
			set { mDirectionIconName = value; }
		}
		public String DirectionIconStyle
		{
			get { return mDirectionIconStyle; }
			set { mDirectionIconStyle = value; }
		}
		public Int32 TransportType
		{
			get { return mTransportType; }
			set { mTransportType = value; }
		}
		public String TransportIconName
		{
			get { return mTransportIconName; }
			set { mTransportIconName = value; }
		}
		public String TransportIconStyle
		{
			get { return mTransportIconStyle; }
			set { mTransportIconStyle = value; }
		}
		public Int32 ShipmentType
		{
			get { return mShipmentType; }
			set { mShipmentType = value; }
		}
		public Int32 TrackingStageID
		{
			get { return mTrackingStageID; }
			set { mTrackingStageID = value; }
		}
		public String TrackingStageName
		{
			get { return mTrackingStageName; }
			set { mTrackingStageName = value; }
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
		public String QasimaDate
		{
			get { return mQasimaDate; }
			set { mQasimaDate = value; }
		}
		public String FirstInvoiceDate
		{
			get { return mFirstInvoiceDate; }
			set { mFirstInvoiceDate = value; }
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
		public Int64 MAWBStockID
		{
			get { return mMAWBStockID; }
			set { mMAWBStockID = value; }
		}
		public String MAWBSuffix
		{
			get { return mMAWBSuffix; }
			set { mMAWBSuffix = value; }
		}
		public String MasterBL
		{
			get { return mMasterBL; }
			set { mMasterBL = value; }
		}
		public DateTime BLDate
		{
			get { return mBLDate; }
			set { mBLDate = value; }
		}
		public Int32 Via1
		{
			get { return mVia1; }
			set { mVia1 = value; }
		}
		public Int32 Via2
		{
			get { return mVia2; }
			set { mVia2 = value; }
		}
		public Int32 Via3
		{
			get { return mVia3; }
			set { mVia3 = value; }
		}
		public String HouseNumber
		{
			get { return mHouseNumber; }
			set { mHouseNumber = value; }
		}
		public String HBLDate
		{
			get { return mHBLDate; }
			set { mHBLDate = value; }
		}
		public Int32 AgentID
		{
			get { return mAgentID; }
			set { mAgentID = value; }
		}
		public Int32 AgentAddressID
		{
			get { return mAgentAddressID; }
			set { mAgentAddressID = value; }
		}
		public Int32 AgentContactID
		{
			get { return mAgentContactID; }
			set { mAgentContactID = value; }
		}
		public Int32 ShipperID
		{
			get { return mShipperID; }
			set { mShipperID = value; }
		}
		public String ShipperAddress
		{
			get { return mShipperAddress; }
			set { mShipperAddress = value; }
		}
		public String ShipperPhonesAndFaxes
		{
			get { return mShipperPhonesAndFaxes; }
			set { mShipperPhonesAndFaxes = value; }
		}
		public Int32 ShipperAddressID
		{
			get { return mShipperAddressID; }
			set { mShipperAddressID = value; }
		}
		public Int32 ShipperContactID
		{
			get { return mShipperContactID; }
			set { mShipperContactID = value; }
		}
		public Int32 ConsigneeID
		{
			get { return mConsigneeID; }
			set { mConsigneeID = value; }
		}
		public String ConsigneeAddress
		{
			get { return mConsigneeAddress; }
			set { mConsigneeAddress = value; }
		}
		public String ConsigneePhonesAndFaxes
		{
			get { return mConsigneePhonesAndFaxes; }
			set { mConsigneePhonesAndFaxes = value; }
		}
		public Int32 ConsigneeAddressID
		{
			get { return mConsigneeAddressID; }
			set { mConsigneeAddressID = value; }
		}
		public Int32 ConsigneeContactID
		{
			get { return mConsigneeContactID; }
			set { mConsigneeContactID = value; }
		}
		public String AgentName
		{
			get { return mAgentName; }
			set { mAgentName = value; }
		}
		public String AgentLocalName
		{
			get { return mAgentLocalName; }
			set { mAgentLocalName = value; }
		}
		public String ShipperName
		{
			get { return mShipperName; }
			set { mShipperName = value; }
		}
		public String ShipperLocalName
		{
			get { return mShipperLocalName; }
			set { mShipperLocalName = value; }
		}
		public String ConsigneeName
		{
			get { return mConsigneeName; }
			set { mConsigneeName = value; }
		}
		public String ConsigneeLocalName
		{
			get { return mConsigneeLocalName; }
			set { mConsigneeLocalName = value; }
		}
		public String Notify1Name
		{
			get { return mNotify1Name; }
			set { mNotify1Name = value; }
		}
		public Int32 IncotermID
		{
			get { return mIncotermID; }
			set { mIncotermID = value; }
		}
		public Int32 POrC
		{
			get { return mPOrC; }
			set { mPOrC = value; }
		}
		public Int32 MoveTypeID
		{
			get { return mMoveTypeID; }
			set { mMoveTypeID = value; }
		}
		public Int32 CommodityID
		{
			get { return mCommodityID; }
			set { mCommodityID = value; }
		}
		public Int32 TransientTime
		{
			get { return mTransientTime; }
			set { mTransientTime = value; }
		}
		public String CurrencyCode
		{
			get { return mCurrencyCode; }
			set { mCurrencyCode = value; }
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
		public Boolean IncludePickup
		{
			get { return mIncludePickup; }
			set { mIncludePickup = value; }
		}
		public Int32 PickupCityID
		{
			get { return mPickupCityID; }
			set { mPickupCityID = value; }
		}
		public Int32 PickupAddressID
		{
			get { return mPickupAddressID; }
			set { mPickupAddressID = value; }
		}
		public Int32 POLCountryID
		{
			get { return mPOLCountryID; }
			set { mPOLCountryID = value; }
		}
		public Int32 POL
		{
			get { return mPOL; }
			set { mPOL = value; }
		}
		public Int32 PODCountryID
		{
			get { return mPODCountryID; }
			set { mPODCountryID = value; }
		}
		public Int32 POD
		{
			get { return mPOD; }
			set { mPOD = value; }
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
		public String LineLocalName
		{
			get { return mLineLocalName; }
			set { mLineLocalName = value; }
		}
		public String LineBankName
		{
			get { return mLineBankName; }
			set { mLineBankName = value; }
		}
		public String LineBankAccountNumber
		{
			get { return mLineBankAccountNumber; }
			set { mLineBankAccountNumber = value; }
		}
		public Boolean IncludeDelivery
		{
			get { return mIncludeDelivery; }
			set { mIncludeDelivery = value; }
		}
		public String DeliveryZipCode
		{
			get { return mDeliveryZipCode; }
			set { mDeliveryZipCode = value; }
		}
		public Int32 DeliveryCityID
		{
			get { return mDeliveryCityID; }
			set { mDeliveryCityID = value; }
		}
		public Int32 DeliveryCountryID
		{
			get { return mDeliveryCountryID; }
			set { mDeliveryCountryID = value; }
		}
		public Decimal GrossWeight
		{
			get { return mGrossWeight; }
			set { mGrossWeight = value; }
		}
		public Decimal Volume
		{
			get { return mVolume; }
			set { mVolume = value; }
		}
		public Decimal ChargeableWeight
		{
			get { return mChargeableWeight; }
			set { mChargeableWeight = value; }
		}
		public Decimal TareWeight
		{
			get { return mTareWeight; }
			set { mTareWeight = value; }
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
		public Boolean IsDangerousGoods
		{
			get { return mIsDangerousGoods; }
			set { mIsDangerousGoods = value; }
		}
		public String Notes
		{
			get { return mNotes; }
			set { mNotes = value; }
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
		public String AgreedRate
		{
			get { return mAgreedRate; }
			set { mAgreedRate = value; }
		}
		public Int32 OperationStageID
		{
			get { return mOperationStageID; }
			set { mOperationStageID = value; }
		}
		public Int64 MasterOperationID
		{
			get { return mMasterOperationID; }
			set { mMasterOperationID = value; }
		}
		public Int32 NumberOfHousesConnected
		{
			get { return mNumberOfHousesConnected; }
			set { mNumberOfHousesConnected = value; }
		}
		public Int32 CreatorUserID
		{
			get { return mCreatorUserID; }
			set { mCreatorUserID = value; }
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
		public DateTime ModificationDate
		{
			get { return mModificationDate; }
			set { mModificationDate = value; }
		}
		public Int64 PlacedOnOperationContainersAndPackagesID
		{
			get { return mPlacedOnOperationContainersAndPackagesID; }
			set { mPlacedOnOperationContainersAndPackagesID = value; }
		}
		public Boolean IsPackagesPlacedOnMaster
		{
			get { return mIsPackagesPlacedOnMaster; }
			set { mIsPackagesPlacedOnMaster = value; }
		}
		public Int64 QuotationID
		{
			get { return mQuotationID; }
			set { mQuotationID = value; }
		}
		public String QuotationCode
		{
			get { return mQuotationCode; }
			set { mQuotationCode = value; }
		}
		public String QRNotes
		{
			get { return mQRNotes; }
			set { mQRNotes = value; }
		}
		public String ContainerTypeCode
		{
			get { return mContainerTypeCode; }
			set { mContainerTypeCode = value; }
		}
		public String ContainerNumber
		{
			get { return mContainerNumber; }
			set { mContainerNumber = value; }
		}
		public String BranchName
		{
			get { return mBranchName; }
			set { mBranchName = value; }
		}
		public String BranchLocalName
		{
			get { return mBranchLocalName; }
			set { mBranchLocalName = value; }
		}
		public String OpenedBy
		{
			get { return mOpenedBy; }
			set { mOpenedBy = value; }
		}
		public String Salesman
		{
			get { return mSalesman; }
			set { mSalesman = value; }
		}
		public String MoveTypeCode
		{
			get { return mMoveTypeCode; }
			set { mMoveTypeCode = value; }
		}
		public String MoveTypeName
		{
			get { return mMoveTypeName; }
			set { mMoveTypeName = value; }
		}
		public String LocalName
		{
			get { return mLocalName; }
			set { mLocalName = value; }
		}
		public String MoveTypeIconName
		{
			get { return mMoveTypeIconName; }
			set { mMoveTypeIconName = value; }
		}
		public String MoveTypeIconStyle
		{
			get { return mMoveTypeIconStyle; }
			set { mMoveTypeIconStyle = value; }
		}
		public String IncotermCode
		{
			get { return mIncotermCode; }
			set { mIncotermCode = value; }
		}
		public String IncotermName
		{
			get { return mIncotermName; }
			set { mIncotermName = value; }
		}
		public String POrCCode
		{
			get { return mPOrCCode; }
			set { mPOrCCode = value; }
		}
		public String POrCName
		{
			get { return mPOrCName; }
			set { mPOrCName = value; }
		}
		public String ShipmentTypeCode
		{
			get { return mShipmentTypeCode; }
			set { mShipmentTypeCode = value; }
		}
		public String CommodityCode
		{
			get { return mCommodityCode; }
			set { mCommodityCode = value; }
		}
		public String CommodityName
		{
			get { return mCommodityName; }
			set { mCommodityName = value; }
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
		public String PickupAddress
		{
			get { return mPickupAddress; }
			set { mPickupAddress = value; }
		}
		public String DeliveryAddress
		{
			get { return mDeliveryAddress; }
			set { mDeliveryAddress = value; }
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
		public Int32 MasterShippingLineID
		{
			get { return mMasterShippingLineID; }
			set { mMasterShippingLineID = value; }
		}
		public Int32 MasterAirlineID
		{
			get { return mMasterAirlineID; }
			set { mMasterAirlineID = value; }
		}
		public Int32 MasterTruckerID
		{
			get { return mMasterTruckerID; }
			set { mMasterTruckerID = value; }
		}
		public String ShippingLineCode
		{
			get { return mShippingLineCode; }
			set { mShippingLineCode = value; }
		}
		public String ShippingLineName
		{
			get { return mShippingLineName; }
			set { mShippingLineName = value; }
		}
		public String AirlineCode
		{
			get { return mAirlineCode; }
			set { mAirlineCode = value; }
		}
		public String AirlineName
		{
			get { return mAirlineName; }
			set { mAirlineName = value; }
		}
		public String AirlinePrefix
		{
			get { return mAirlinePrefix; }
			set { mAirlinePrefix = value; }
		}
		public Int32 TruckerCode
		{
			get { return mTruckerCode; }
			set { mTruckerCode = value; }
		}
		public String TruckerName
		{
			get { return mTruckerName; }
			set { mTruckerName = value; }
		}
		public String Via1Code
		{
			get { return mVia1Code; }
			set { mVia1Code = value; }
		}
		public String Via1Name
		{
			get { return mVia1Name; }
			set { mVia1Name = value; }
		}
		public String Via1LocalName
		{
			get { return mVia1LocalName; }
			set { mVia1LocalName = value; }
		}
		public String Via2Code
		{
			get { return mVia2Code; }
			set { mVia2Code = value; }
		}
		public String Via2Name
		{
			get { return mVia2Name; }
			set { mVia2Name = value; }
		}
		public String Via2LocalName
		{
			get { return mVia2LocalName; }
			set { mVia2LocalName = value; }
		}
		public String Via3Code
		{
			get { return mVia3Code; }
			set { mVia3Code = value; }
		}
		public String Via3Name
		{
			get { return mVia3Name; }
			set { mVia3Name = value; }
		}
		public String Via3LocalName
		{
			get { return mVia3LocalName; }
			set { mVia3LocalName = value; }
		}
		public String AirlineCode1
		{
			get { return mAirlineCode1; }
			set { mAirlineCode1 = value; }
		}
		public String AirlineCode2
		{
			get { return mAirlineCode2; }
			set { mAirlineCode2 = value; }
		}
		public String AirlineCode3
		{
			get { return mAirlineCode3; }
			set { mAirlineCode3 = value; }
		}
		public String PickupCityCode
		{
			get { return mPickupCityCode; }
			set { mPickupCityCode = value; }
		}
		public String PickupCityName
		{
			get { return mPickupCityName; }
			set { mPickupCityName = value; }
		}
		public String DeliveryCityCode
		{
			get { return mDeliveryCityCode; }
			set { mDeliveryCityCode = value; }
		}
		public String DeliveryCityName
		{
			get { return mDeliveryCityName; }
			set { mDeliveryCityName = value; }
		}
		public String CountryCode
		{
			get { return mCountryCode; }
			set { mCountryCode = value; }
		}
		public String DeliveryCountryName
		{
			get { return mDeliveryCountryName; }
			set { mDeliveryCountryName = value; }
		}
		public String OperationStageCode
		{
			get { return mOperationStageCode; }
			set { mOperationStageCode = value; }
		}
		public String OperationStageName
		{
			get { return mOperationStageName; }
			set { mOperationStageName = value; }
		}
		public String MasterOperationCode
		{
			get { return mMasterOperationCode; }
			set { mMasterOperationCode = value; }
		}
		public Int32 MasterOperationCodeSerial
		{
			get { return mMasterOperationCodeSerial; }
			set { mMasterOperationCodeSerial = value; }
		}
		public Boolean IsAWB
		{
			get { return mIsAWB; }
			set { mIsAWB = value; }
		}
		public Boolean IsDelivered
		{
			get { return mIsDelivered; }
			set { mIsDelivered = value; }
		}
		public Boolean IsTrucking
		{
			get { return mIsTrucking; }
			set { mIsTrucking = value; }
		}
		public Boolean IsInsurance
		{
			get { return mIsInsurance; }
			set { mIsInsurance = value; }
		}
		public Boolean IsClearance
		{
			get { return mIsClearance; }
			set { mIsClearance = value; }
		}
		public Boolean IsGenset
		{
			get { return mIsGenset; }
			set { mIsGenset = value; }
		}
		public Boolean IsCourrier
		{
			get { return mIsCourrier; }
			set { mIsCourrier = value; }
		}
		public Boolean IsOBL
		{
			get { return mIsOBL; }
			set { mIsOBL = value; }
		}
		public Boolean IsTelexRelease
		{
			get { return mIsTelexRelease; }
			set { mIsTelexRelease = value; }
		}
		public String CreatorName
		{
			get { return mCreatorName; }
			set { mCreatorName = value; }
		}
		public String CreatorLocalName
		{
			get { return mCreatorLocalName; }
			set { mCreatorLocalName = value; }
		}
		public String ModificatorName
		{
			get { return mModificatorName; }
			set { mModificatorName = value; }
		}
		public String ModificatorLocalName
		{
			get { return mModificatorLocalName; }
			set { mModificatorLocalName = value; }
		}
		public String BookingNumbers
		{
			get { return mBookingNumbers; }
			set { mBookingNumbers = value; }
		}
		public String VoyageOrTruckNumber
		{
			get { return mVoyageOrTruckNumber; }
			set { mVoyageOrTruckNumber = value; }
		}
		public Int32 FreeTime
		{
			get { return mFreeTime; }
			set { mFreeTime = value; }
		}
		public DateTime ETAPOLDate
		{
			get { return mETAPOLDate; }
			set { mETAPOLDate = value; }
		}
		public DateTime ATAPOLDate
		{
			get { return mATAPOLDate; }
			set { mATAPOLDate = value; }
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
		public String RepBLTypeShown
		{
			get { return mRepBLTypeShown; }
			set { mRepBLTypeShown = value; }
		}
		public String RepDirectionTypeShown
		{
			get { return mRepDirectionTypeShown; }
			set { mRepDirectionTypeShown = value; }
		}
		public String RepTransportTypeShown
		{
			get { return mRepTransportTypeShown; }
			set { mRepTransportTypeShown = value; }
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
		public String ContainerNumbers
		{
			get { return mContainerNumbers; }
			set { mContainerNumbers = value; }
		}
		public String Dimensions
		{
			get { return mDimensions; }
			set { mDimensions = value; }
		}
		public Int32 TEUs
		{
			get { return mTEUs; }
			set { mTEUs = value; }
		}
		public Decimal GrossWeightSum
		{
			get { return mGrossWeightSum; }
			set { mGrossWeightSum = value; }
		}
		public Decimal VGM
		{
			get { return mVGM; }
			set { mVGM = value; }
		}
		public Decimal VGMSum
		{
			get { return mVGMSum; }
			set { mVGMSum = value; }
		}
		public Decimal NetWeight
		{
			get { return mNetWeight; }
			set { mNetWeight = value; }
		}
		public Decimal NetWeightSum
		{
			get { return mNetWeightSum; }
			set { mNetWeightSum = value; }
		}
		public String DescriptionOfGoods
		{
			get { return mDescriptionOfGoods; }
			set { mDescriptionOfGoods = value; }
		}
		public String InvoiceNumbers
		{
			get { return mInvoiceNumbers; }
			set { mInvoiceNumbers = value; }
		}
		public String AllTrackingStages
		{
			get { return mAllTrackingStages; }
			set { mAllTrackingStages = value; }
		}
		public String HouseBLs
		{
			get { return mHouseBLs; }
			set { mHouseBLs = value; }
		}
		public String HouseClients
		{
			get { return mHouseClients; }
			set { mHouseClients = value; }
		}
		public Decimal VolumeSum
		{
			get { return mVolumeSum; }
			set { mVolumeSum = value; }
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
		public String ContainerTypes
		{
			get { return mContainerTypes; }
			set { mContainerTypes = value; }
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
		public String PackageTypesOnContainersTotals
		{
			get { return mPackageTypesOnContainersTotals; }
			set { mPackageTypesOnContainersTotals = value; }
		}
		public String PackageTypes
		{
			get { return mPackageTypes; }
			set { mPackageTypes = value; }
		}
		public String ExtraPackages
		{
			get { return mExtraPackages; }
			set { mExtraPackages = value; }
		}
		public String EffectiveOperationCode
		{
			get { return mEffectiveOperationCode; }
			set { mEffectiveOperationCode = value; }
		}
		public Int64 EffectiveOperationID
		{
			get { return mEffectiveOperationID; }
			set { mEffectiveOperationID = value; }
		}
		public String MonthYear
		{
			get { return mMonthYear; }
			set { mMonthYear = value; }
		}
		public String Reference
		{
			get { return mReference; }
			set { mReference = value; }
		}
		public Int32 ConsigneeID2
		{
			get { return mConsigneeID2; }
			set { mConsigneeID2 = value; }
		}
		public String Consignee2Name
		{
			get { return mConsignee2Name; }
			set { mConsignee2Name = value; }
		}
		public String Consignee2LocalName
		{
			get { return mConsignee2LocalName; }
			set { mConsignee2LocalName = value; }
		}
		public DateTime ReleaseDate
		{
			get { return mReleaseDate; }
			set { mReleaseDate = value; }
		}
		public String ReleaseNumber
		{
			get { return mReleaseNumber; }
			set { mReleaseNumber = value; }
		}
		public Decimal ReleaseValue
		{
			get { return mReleaseValue; }
			set { mReleaseValue = value; }
		}
		public Int32 TypeOfStockID
		{
			get { return mTypeOfStockID; }
			set { mTypeOfStockID = value; }
		}
		public Int32 AirLineID1
		{
			get { return mAirLineID1; }
			set { mAirLineID1 = value; }
		}
		public Int32 AirLineID2
		{
			get { return mAirLineID2; }
			set { mAirLineID2 = value; }
		}
		public Int32 AirLineID3
		{
			get { return mAirLineID3; }
			set { mAirLineID3 = value; }
		}
		public String FlightNo1
		{
			get { return mFlightNo1; }
			set { mFlightNo1 = value; }
		}
		public String FlightNo2
		{
			get { return mFlightNo2; }
			set { mFlightNo2 = value; }
		}
		public String FlightNo3
		{
			get { return mFlightNo3; }
			set { mFlightNo3 = value; }
		}
		public DateTime FlightDate1
		{
			get { return mFlightDate1; }
			set { mFlightDate1 = value; }
		}
		public DateTime FlightDate2
		{
			get { return mFlightDate2; }
			set { mFlightDate2 = value; }
		}
		public DateTime FlightDate3
		{
			get { return mFlightDate3; }
			set { mFlightDate3 = value; }
		}
		public String Barcode
		{
			get { return mBarcode; }
			set { mBarcode = value; }
		}
		public String Description
		{
			get { return mDescription; }
			set { mDescription = value; }
		}
		public String AmountOfInsurance
		{
			get { return mAmountOfInsurance; }
			set { mAmountOfInsurance = value; }
		}
		public String DeclaredValueForCarriage
		{
			get { return mDeclaredValueForCarriage; }
			set { mDeclaredValueForCarriage = value; }
		}
		public Decimal WeightCharge
		{
			get { return mWeightCharge; }
			set { mWeightCharge = value; }
		}
		public Decimal ValuationCharge
		{
			get { return mValuationCharge; }
			set { mValuationCharge = value; }
		}
		public Decimal Tax
		{
			get { return mTax; }
			set { mTax = value; }
		}
		public Decimal OtherChargesDueAgent
		{
			get { return mOtherChargesDueAgent; }
			set { mOtherChargesDueAgent = value; }
		}
		public Decimal OtherChargesDueCarrier
		{
			get { return mOtherChargesDueCarrier; }
			set { mOtherChargesDueCarrier = value; }
		}
		public String OtherCharges
		{
			get { return mOtherCharges; }
			set { mOtherCharges = value; }
		}
		public Int32 CurrencyID
		{
			get { return mCurrencyID; }
			set { mCurrencyID = value; }
		}
		public String AccountingInformation
		{
			get { return mAccountingInformation; }
			set { mAccountingInformation = value; }
		}
		public String ReferenceNumber
		{
			get { return mReferenceNumber; }
			set { mReferenceNumber = value; }
		}
		public String OptionalShippingInformation
		{
			get { return mOptionalShippingInformation; }
			set { mOptionalShippingInformation = value; }
		}
		public String CHGSCode
		{
			get { return mCHGSCode; }
			set { mCHGSCode = value; }
		}
		public String WT_VALL
		{
			get { return mWT_VALL; }
			set { mWT_VALL = value; }
		}
		public String WT_VALL_Other
		{
			get { return mWT_VALL_Other; }
			set { mWT_VALL_Other = value; }
		}
		public String DeclaredValueForCustoms
		{
			get { return mDeclaredValueForCustoms; }
			set { mDeclaredValueForCustoms = value; }
		}
		public String FlightNo
		{
			get { return mFlightNo; }
			set { mFlightNo = value; }
		}
		public Int32 OpenYear
		{
			get { return mOpenYear; }
			set { mOpenYear = value; }
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

	public partial class CvwVoucherOperationsPayment
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
		public List<CVarvwVoucherOperationsPayment> lstCVarvwVoucherOperationsPayment= new List<CVarvwVoucherOperationsPayment>();
		#endregion

		#region "Select Methods"
		public Exception GetList(string WhereClause)
		{
			return DataFill(WhereClause,true);
		}
		public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
		{
			return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
		}
		private Exception DataFill(string Param , Boolean IsList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			SqlDataReader dr;
			lstCVarvwVoucherOperationsPayment.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@VoucherID", SqlDbType.BigInt));
					Com.CommandText = "[dbo].A_GetVoucherOperationsPayment";
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
						CVarvwVoucherOperationsPayment ObjCVarvwVoucherOperationsPayment = new CVarvwVoucherOperationsPayment();
						ObjCVarvwVoucherOperationsPayment.mVoucherID = Convert.ToInt64(dr["VoucherID"].ToString());
						ObjCVarvwVoucherOperationsPayment.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwVoucherOperationsPayment.mQuotationRouteID = 0;// Convert.ToInt64(dr["QuotationRouteID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCode = Convert.ToString(dr["Code"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCodeWithoutDashes = Convert.ToString(dr["CodeWithoutDashes"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mSalesmanID = 0;//Convert.ToInt32(dr["SalesmanID"].ToString());
      //                  ObjCVarvwVoucherOperationsPayment.mBLType = 0;// Convert.ToInt32(dr["BLType"].ToString());
      //                  ObjCVarvwVoucherOperationsPayment.mBLTypeIconName = Convert.ToString(dr["BLTypeIconName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mBLTypeIconStyle = Convert.ToString(dr["BLTypeIconStyle"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mDirectionType = 0;// Convert.ToInt32(dr["DirectionType"].ToString());
      //                  ObjCVarvwVoucherOperationsPayment.mDirectionIconName = Convert.ToString(dr["DirectionIconName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mDirectionIconStyle = Convert.ToString(dr["DirectionIconStyle"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mTransportType = 0;//Convert.ToInt32(dr["TransportType"].ToString());
      //                  ObjCVarvwVoucherOperationsPayment.mTransportIconName = Convert.ToString(dr["TransportIconName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mTransportIconStyle = Convert.ToString(dr["TransportIconStyle"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mShipmentType = 0;// Convert.ToInt32(dr["ShipmentType"].ToString());
      //                  ObjCVarvwVoucherOperationsPayment.mTrackingStageID = 0;//Convert.ToInt32(dr["TrackingStageID"].ToString());
      //                  ObjCVarvwVoucherOperationsPayment.mTrackingStageName = Convert.ToString(dr["TrackingStageName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mBookingPartyID = 0;//Convert.ToInt32(dr["BookingPartyID"].ToString());
      //                  ObjCVarvwVoucherOperationsPayment.mBookingPartyName = Convert.ToString(dr["BookingPartyName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCustomsClearanceAgentID = 0;// Convert.ToInt32(dr["CustomsClearanceAgentID"].ToString());
      //                  ObjCVarvwVoucherOperationsPayment.mCustomsClearanceAgentName = Convert.ToString(dr["CustomsClearanceAgentName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCertificateNumber = Convert.ToString(dr["CertificateNumber"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCertificateValue = Convert.ToString(dr["CertificateValue"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCertificateDate = Convert.ToString(dr["CertificateDate"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mQasimaNumber = Convert.ToString(dr["QasimaNumber"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mQasimaDate = Convert.ToString(dr["QasimaDate"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mFirstInvoiceDate = Convert.ToString(dr["FirstInvoiceDate"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mNetworkID = Convert.ToInt32(dr["NetworkID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mNetworkName = Convert.ToString(dr["NetworkName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mMAWBStockID = 0;//Convert.ToInt64(dr["MAWBStockID"].ToString());
      //                  ObjCVarvwVoucherOperationsPayment.mMAWBSuffix = Convert.ToString(dr["MAWBSuffix"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mBLDate = Convert.ToDateTime(dr["BLDate"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mVia1 = Convert.ToInt32(dr["Via1"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mVia2 = Convert.ToInt32(dr["Via2"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mVia3 = Convert.ToInt32(dr["Via3"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mHBLDate = Convert.ToString(dr["HBLDate"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mAgentAddressID = Convert.ToInt32(dr["AgentAddressID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mAgentContactID = Convert.ToInt32(dr["AgentContactID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mShipperID = Convert.ToInt32(dr["ShipperID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mShipperAddress = Convert.ToString(dr["ShipperAddress"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mShipperPhonesAndFaxes = Convert.ToString(dr["ShipperPhonesAndFaxes"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mShipperAddressID = Convert.ToInt32(dr["ShipperAddressID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mShipperContactID = Convert.ToInt32(dr["ShipperContactID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mConsigneeID = Convert.ToInt32(dr["ConsigneeID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mConsigneeAddress = Convert.ToString(dr["ConsigneeAddress"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mConsigneePhonesAndFaxes = Convert.ToString(dr["ConsigneePhonesAndFaxes"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mConsigneeAddressID = Convert.ToInt32(dr["ConsigneeAddressID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mConsigneeContactID = Convert.ToInt32(dr["ConsigneeContactID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mAgentName = Convert.ToString(dr["AgentName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mAgentLocalName = Convert.ToString(dr["AgentLocalName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mShipperName = Convert.ToString(dr["ShipperName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mShipperLocalName = Convert.ToString(dr["ShipperLocalName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mConsigneeName = Convert.ToString(dr["ConsigneeName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mConsigneeLocalName = Convert.ToString(dr["ConsigneeLocalName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mNotify1Name = Convert.ToString(dr["Notify1Name"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mIncotermID = Convert.ToInt32(dr["IncotermID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPOrC = Convert.ToInt32(dr["POrC"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mTransientTime = Convert.ToInt32(dr["TransientTime"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mIncludePickup = Convert.ToBoolean(dr["IncludePickup"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPickupCityID = Convert.ToInt32(dr["PickupCityID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPickupAddressID = Convert.ToInt32(dr["PickupAddressID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPOLCountryID = Convert.ToInt32(dr["POLCountryID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPOL = Convert.ToInt32(dr["POL"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPODCountryID = Convert.ToInt32(dr["PODCountryID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPOD = Convert.ToInt32(dr["POD"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mLineID = Convert.ToInt32(dr["LineID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mLineName = Convert.ToString(dr["LineName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mLineLocalName = Convert.ToString(dr["LineLocalName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mLineBankName = Convert.ToString(dr["LineBankName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mLineBankAccountNumber = Convert.ToString(dr["LineBankAccountNumber"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mIncludeDelivery = Convert.ToBoolean(dr["IncludeDelivery"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mDeliveryZipCode = Convert.ToString(dr["DeliveryZipCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mDeliveryCityID = Convert.ToInt32(dr["DeliveryCityID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mDeliveryCountryID = Convert.ToInt32(dr["DeliveryCountryID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mTareWeight = Convert.ToDecimal(dr["TareWeight"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mNumberOfPackages = Convert.ToInt32(dr["NumberOfPackages"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mIsDangerousGoods = Convert.ToBoolean(dr["IsDangerousGoods"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mNotes = Convert.ToString(dr["Notes"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mSupplierReference = Convert.ToString(dr["SupplierReference"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPONumber = Convert.ToString(dr["PONumber"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPOValue = Convert.ToString(dr["POValue"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPODate = Convert.ToDateTime(dr["PODate"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mAgreedRate = Convert.ToString(dr["AgreedRate"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mOperationStageID = Convert.ToInt32(dr["OperationStageID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mNumberOfHousesConnected = Convert.ToInt32(dr["NumberOfHousesConnected"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPlacedOnOperationContainersAndPackagesID = Convert.ToInt64(dr["PlacedOnOperationContainersAndPackagesID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mIsPackagesPlacedOnMaster = Convert.ToBoolean(dr["IsPackagesPlacedOnMaster"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mQuotationID = Convert.ToInt64(dr["QuotationID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mQuotationCode = Convert.ToString(dr["QuotationCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mQRNotes = Convert.ToString(dr["QRNotes"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mContainerTypeCode = Convert.ToString(dr["ContainerTypeCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mBranchName = Convert.ToString(dr["BranchName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mBranchLocalName = Convert.ToString(dr["BranchLocalName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mOpenedBy = Convert.ToString(dr["OpenedBy"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mSalesman = Convert.ToString(dr["Salesman"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mMoveTypeCode = Convert.ToString(dr["MoveTypeCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mMoveTypeName = Convert.ToString(dr["MoveTypeName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mLocalName = Convert.ToString(dr["LocalName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mMoveTypeIconName = Convert.ToString(dr["MoveTypeIconName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mMoveTypeIconStyle = Convert.ToString(dr["MoveTypeIconStyle"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mIncotermCode = Convert.ToString(dr["IncotermCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mIncotermName = Convert.ToString(dr["IncotermName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPOrCCode = Convert.ToString(dr["POrCCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPOrCName = Convert.ToString(dr["POrCName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mShipmentTypeCode = Convert.ToString(dr["ShipmentTypeCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCommodityCode = Convert.ToString(dr["CommodityCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPOLCountryCode = Convert.ToString(dr["POLCountryCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPOLCountryName = Convert.ToString(dr["POLCountryName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPOLCode = Convert.ToString(dr["POLCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPOLName = Convert.ToString(dr["POLName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPODCountryCode = Convert.ToString(dr["PODCountryCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPODCountryName = Convert.ToString(dr["PODCountryName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPickupAddress = Convert.ToString(dr["PickupAddress"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mDeliveryAddress = Convert.ToString(dr["DeliveryAddress"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPODCode = Convert.ToString(dr["PODCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPODName = Convert.ToString(dr["PODName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mMasterShippingLineID = Convert.ToInt32(dr["MasterShippingLineID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mMasterAirlineID = Convert.ToInt32(dr["MasterAirlineID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mMasterTruckerID = Convert.ToInt32(dr["MasterTruckerID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mShippingLineCode = Convert.ToString(dr["ShippingLineCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mShippingLineName = Convert.ToString(dr["ShippingLineName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mAirlineCode = Convert.ToString(dr["AirlineCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mAirlineName = Convert.ToString(dr["AirlineName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mAirlinePrefix = Convert.ToString(dr["AirlinePrefix"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mTruckerCode = Convert.ToInt32(dr["TruckerCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mTruckerName = Convert.ToString(dr["TruckerName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mVia1Code = Convert.ToString(dr["Via1Code"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mVia1Name = Convert.ToString(dr["Via1Name"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mVia1LocalName = Convert.ToString(dr["Via1LocalName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mVia2Code = Convert.ToString(dr["Via2Code"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mVia2Name = Convert.ToString(dr["Via2Name"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mVia2LocalName = Convert.ToString(dr["Via2LocalName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mVia3Code = Convert.ToString(dr["Via3Code"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mVia3Name = Convert.ToString(dr["Via3Name"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mVia3LocalName = Convert.ToString(dr["Via3LocalName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mAirlineCode1 = Convert.ToString(dr["AirlineCode1"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mAirlineCode2 = Convert.ToString(dr["AirlineCode2"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mAirlineCode3 = Convert.ToString(dr["AirlineCode3"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPickupCityCode = Convert.ToString(dr["PickupCityCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPickupCityName = Convert.ToString(dr["PickupCityName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mDeliveryCityCode = Convert.ToString(dr["DeliveryCityCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mDeliveryCityName = Convert.ToString(dr["DeliveryCityName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCountryCode = Convert.ToString(dr["CountryCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mDeliveryCountryName = Convert.ToString(dr["DeliveryCountryName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mOperationStageCode = Convert.ToString(dr["OperationStageCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mOperationStageName = Convert.ToString(dr["OperationStageName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mMasterOperationCode = Convert.ToString(dr["MasterOperationCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mMasterOperationCodeSerial = Convert.ToInt32(dr["MasterOperationCodeSerial"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mIsAWB = Convert.ToBoolean(dr["IsAWB"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mIsDelivered = Convert.ToBoolean(dr["IsDelivered"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mIsTrucking = Convert.ToBoolean(dr["IsTrucking"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mIsInsurance = Convert.ToBoolean(dr["IsInsurance"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mIsClearance = Convert.ToBoolean(dr["IsClearance"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mIsGenset = Convert.ToBoolean(dr["IsGenset"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mIsCourrier = Convert.ToBoolean(dr["IsCourrier"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mIsOBL = Convert.ToBoolean(dr["IsOBL"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mIsTelexRelease = Convert.ToBoolean(dr["IsTelexRelease"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCreatorLocalName = Convert.ToString(dr["CreatorLocalName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mModificatorName = Convert.ToString(dr["ModificatorName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mModificatorLocalName = Convert.ToString(dr["ModificatorLocalName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mBookingNumbers = Convert.ToString(dr["BookingNumbers"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mVoyageOrTruckNumber = Convert.ToString(dr["VoyageOrTruckNumber"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mFreeTime = Convert.ToInt32(dr["FreeTime"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mETAPOLDate = Convert.ToDateTime(dr["ETAPOLDate"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mATAPOLDate = Convert.ToDateTime(dr["ATAPOLDate"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mExpectedDeparture = Convert.ToDateTime(dr["ExpectedDeparture"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mActualDeparture = Convert.ToDateTime(dr["ActualDeparture"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mExpectedArrival = Convert.ToDateTime(dr["ExpectedArrival"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mActualArrival = Convert.ToDateTime(dr["ActualArrival"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mRepBLTypeShown = Convert.ToString(dr["RepBLTypeShown"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mRepDirectionTypeShown = Convert.ToString(dr["RepDirectionTypeShown"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mRepTransportTypeShown = Convert.ToString(dr["RepTransportTypeShown"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mClientName = Convert.ToString(dr["ClientName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mClientPhonesAndFaxes = Convert.ToString(dr["ClientPhonesAndFaxes"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mClientAddress = Convert.ToString(dr["ClientAddress"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mContainerNumbers = Convert.ToString(dr["ContainerNumbers"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mDimensions = Convert.ToString(dr["Dimensions"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mTEUs = Convert.ToInt32(dr["TEUs"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mGrossWeightSum = Convert.ToDecimal(dr["GrossWeightSum"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mVGM = Convert.ToDecimal(dr["VGM"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mVGMSum = Convert.ToDecimal(dr["VGMSum"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mNetWeightSum = Convert.ToDecimal(dr["NetWeightSum"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mDescriptionOfGoods = Convert.ToString(dr["DescriptionOfGoods"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mInvoiceNumbers = Convert.ToString(dr["InvoiceNumbers"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mAllTrackingStages = Convert.ToString(dr["AllTrackingStages"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mHouseBLs = Convert.ToString(dr["HouseBLs"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mHouseClients = Convert.ToString(dr["HouseClients"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mVolumeSum = Convert.ToDecimal(dr["VolumeSum"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mVesselID = Convert.ToInt32(dr["VesselID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mVesselName = Convert.ToString(dr["VesselName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mContainerTypes = Convert.ToString(dr["ContainerTypes"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mContainerTypes20 = Convert.ToString(dr["ContainerTypes20"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mContainerTypes40 = Convert.ToString(dr["ContainerTypes40"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mContainerTypes45 = Convert.ToString(dr["ContainerTypes45"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mContainerTypesReefer20 = Convert.ToString(dr["ContainerTypesReefer20"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mContainerTypesReefer40 = Convert.ToString(dr["ContainerTypesReefer40"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPackageTypesOnContainersTotals = Convert.ToString(dr["PackageTypesOnContainersTotals"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mPackageTypes = Convert.ToString(dr["PackageTypes"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mExtraPackages = Convert.ToString(dr["ExtraPackages"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mEffectiveOperationCode = Convert.ToString(dr["EffectiveOperationCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mEffectiveOperationID = Convert.ToInt64(dr["EffectiveOperationID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mMonthYear = Convert.ToString(dr["MonthYear"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mReference = Convert.ToString(dr["Reference"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mConsigneeID2 = Convert.ToInt32(dr["ConsigneeID2"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mConsignee2Name = Convert.ToString(dr["Consignee2Name"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mConsignee2LocalName = Convert.ToString(dr["Consignee2LocalName"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mReleaseDate = Convert.ToDateTime(dr["ReleaseDate"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mReleaseNumber = Convert.ToString(dr["ReleaseNumber"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mReleaseValue = Convert.ToDecimal(dr["ReleaseValue"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mTypeOfStockID = Convert.ToInt32(dr["TypeOfStockID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mAirLineID1 = Convert.ToInt32(dr["AirLineID1"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mAirLineID2 = Convert.ToInt32(dr["AirLineID2"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mAirLineID3 = Convert.ToInt32(dr["AirLineID3"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mFlightNo1 = Convert.ToString(dr["FlightNo1"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mFlightNo2 = Convert.ToString(dr["FlightNo2"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mFlightNo3 = Convert.ToString(dr["FlightNo3"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mFlightDate1 = Convert.ToDateTime(dr["FlightDate1"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mFlightDate2 = Convert.ToDateTime(dr["FlightDate2"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mFlightDate3 = Convert.ToDateTime(dr["FlightDate3"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mBarcode = Convert.ToString(dr["Barcode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mDescription = Convert.ToString(dr["Description"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mAmountOfInsurance = Convert.ToString(dr["AmountOfInsurance"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mDeclaredValueForCarriage = Convert.ToString(dr["DeclaredValueForCarriage"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mWeightCharge = Convert.ToDecimal(dr["WeightCharge"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mValuationCharge = Convert.ToDecimal(dr["ValuationCharge"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mTax = Convert.ToDecimal(dr["Tax"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mOtherChargesDueAgent = Convert.ToDecimal(dr["OtherChargesDueAgent"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mOtherChargesDueCarrier = Convert.ToDecimal(dr["OtherChargesDueCarrier"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mOtherCharges = Convert.ToString(dr["OtherCharges"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mAccountingInformation = Convert.ToString(dr["AccountingInformation"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mReferenceNumber = Convert.ToString(dr["ReferenceNumber"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mOptionalShippingInformation = Convert.ToString(dr["OptionalShippingInformation"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mCHGSCode = Convert.ToString(dr["CHGSCode"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mWT_VALL = Convert.ToString(dr["WT_VALL"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mWT_VALL_Other = Convert.ToString(dr["WT_VALL_Other"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mDeclaredValueForCustoms = Convert.ToString(dr["DeclaredValueForCustoms"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mFlightNo = Convert.ToString(dr["FlightNo"].ToString());
						//ObjCVarvwVoucherOperationsPayment.mOpenYear = Convert.ToInt32(dr["OpenYear"].ToString());
						lstCVarvwVoucherOperationsPayment.Add(ObjCVarvwVoucherOperationsPayment);
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
			catch ( Exception ex)
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
			lstCVarvwVoucherOperationsPayment.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwVoucherOperationsPayment";
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
						CVarvwVoucherOperationsPayment ObjCVarvwVoucherOperationsPayment = new CVarvwVoucherOperationsPayment();
						ObjCVarvwVoucherOperationsPayment.mVoucherID = Convert.ToInt64(dr["VoucherID"].ToString());
						ObjCVarvwVoucherOperationsPayment.ID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCodeWithoutDashes = Convert.ToString(dr["CodeWithoutDashes"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
						ObjCVarvwVoucherOperationsPayment.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mSalesmanID = Convert.ToInt32(dr["SalesmanID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mBLType = Convert.ToInt32(dr["BLType"].ToString());
						ObjCVarvwVoucherOperationsPayment.mBLTypeIconName = Convert.ToString(dr["BLTypeIconName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mBLTypeIconStyle = Convert.ToString(dr["BLTypeIconStyle"].ToString());
						ObjCVarvwVoucherOperationsPayment.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
						ObjCVarvwVoucherOperationsPayment.mDirectionIconName = Convert.ToString(dr["DirectionIconName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mDirectionIconStyle = Convert.ToString(dr["DirectionIconStyle"].ToString());
						ObjCVarvwVoucherOperationsPayment.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
						ObjCVarvwVoucherOperationsPayment.mTransportIconName = Convert.ToString(dr["TransportIconName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mTransportIconStyle = Convert.ToString(dr["TransportIconStyle"].ToString());
						ObjCVarvwVoucherOperationsPayment.mShipmentType = Convert.ToInt32(dr["ShipmentType"].ToString());
						ObjCVarvwVoucherOperationsPayment.mTrackingStageID = Convert.ToInt32(dr["TrackingStageID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mTrackingStageName = Convert.ToString(dr["TrackingStageName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mBookingPartyID = Convert.ToInt32(dr["BookingPartyID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mBookingPartyName = Convert.ToString(dr["BookingPartyName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCustomsClearanceAgentID = Convert.ToInt32(dr["CustomsClearanceAgentID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCustomsClearanceAgentName = Convert.ToString(dr["CustomsClearanceAgentName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCertificateNumber = Convert.ToString(dr["CertificateNumber"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCertificateValue = Convert.ToString(dr["CertificateValue"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCertificateDate = Convert.ToString(dr["CertificateDate"].ToString());
						ObjCVarvwVoucherOperationsPayment.mQasimaNumber = Convert.ToString(dr["QasimaNumber"].ToString());
						ObjCVarvwVoucherOperationsPayment.mQasimaDate = Convert.ToString(dr["QasimaDate"].ToString());
						ObjCVarvwVoucherOperationsPayment.mFirstInvoiceDate = Convert.ToString(dr["FirstInvoiceDate"].ToString());
						ObjCVarvwVoucherOperationsPayment.mNetworkID = Convert.ToInt32(dr["NetworkID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mNetworkName = Convert.ToString(dr["NetworkName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mMAWBStockID = Convert.ToInt64(dr["MAWBStockID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mMAWBSuffix = Convert.ToString(dr["MAWBSuffix"].ToString());
						ObjCVarvwVoucherOperationsPayment.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
						ObjCVarvwVoucherOperationsPayment.mBLDate = Convert.ToDateTime(dr["BLDate"].ToString());
						ObjCVarvwVoucherOperationsPayment.mVia1 = Convert.ToInt32(dr["Via1"].ToString());
						ObjCVarvwVoucherOperationsPayment.mVia2 = Convert.ToInt32(dr["Via2"].ToString());
						ObjCVarvwVoucherOperationsPayment.mVia3 = Convert.ToInt32(dr["Via3"].ToString());
						ObjCVarvwVoucherOperationsPayment.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
						ObjCVarvwVoucherOperationsPayment.mHBLDate = Convert.ToString(dr["HBLDate"].ToString());
						ObjCVarvwVoucherOperationsPayment.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mAgentAddressID = Convert.ToInt32(dr["AgentAddressID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mAgentContactID = Convert.ToInt32(dr["AgentContactID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mShipperID = Convert.ToInt32(dr["ShipperID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mShipperAddress = Convert.ToString(dr["ShipperAddress"].ToString());
						ObjCVarvwVoucherOperationsPayment.mShipperPhonesAndFaxes = Convert.ToString(dr["ShipperPhonesAndFaxes"].ToString());
						ObjCVarvwVoucherOperationsPayment.mShipperAddressID = Convert.ToInt32(dr["ShipperAddressID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mShipperContactID = Convert.ToInt32(dr["ShipperContactID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mConsigneeID = Convert.ToInt32(dr["ConsigneeID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mConsigneeAddress = Convert.ToString(dr["ConsigneeAddress"].ToString());
						ObjCVarvwVoucherOperationsPayment.mConsigneePhonesAndFaxes = Convert.ToString(dr["ConsigneePhonesAndFaxes"].ToString());
						ObjCVarvwVoucherOperationsPayment.mConsigneeAddressID = Convert.ToInt32(dr["ConsigneeAddressID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mConsigneeContactID = Convert.ToInt32(dr["ConsigneeContactID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mAgentName = Convert.ToString(dr["AgentName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mAgentLocalName = Convert.ToString(dr["AgentLocalName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mShipperName = Convert.ToString(dr["ShipperName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mShipperLocalName = Convert.ToString(dr["ShipperLocalName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mConsigneeName = Convert.ToString(dr["ConsigneeName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mConsigneeLocalName = Convert.ToString(dr["ConsigneeLocalName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mNotify1Name = Convert.ToString(dr["Notify1Name"].ToString());
						ObjCVarvwVoucherOperationsPayment.mIncotermID = Convert.ToInt32(dr["IncotermID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPOrC = Convert.ToInt32(dr["POrC"].ToString());
						ObjCVarvwVoucherOperationsPayment.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mTransientTime = Convert.ToInt32(dr["TransientTime"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
						ObjCVarvwVoucherOperationsPayment.mIncludePickup = Convert.ToBoolean(dr["IncludePickup"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPickupCityID = Convert.ToInt32(dr["PickupCityID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPickupAddressID = Convert.ToInt32(dr["PickupAddressID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPOLCountryID = Convert.ToInt32(dr["POLCountryID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPOL = Convert.ToInt32(dr["POL"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPODCountryID = Convert.ToInt32(dr["PODCountryID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPOD = Convert.ToInt32(dr["POD"].ToString());
						ObjCVarvwVoucherOperationsPayment.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mLineID = Convert.ToInt32(dr["LineID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mLineName = Convert.ToString(dr["LineName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mLineLocalName = Convert.ToString(dr["LineLocalName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mLineBankName = Convert.ToString(dr["LineBankName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mLineBankAccountNumber = Convert.ToString(dr["LineBankAccountNumber"].ToString());
						ObjCVarvwVoucherOperationsPayment.mIncludeDelivery = Convert.ToBoolean(dr["IncludeDelivery"].ToString());
						ObjCVarvwVoucherOperationsPayment.mDeliveryZipCode = Convert.ToString(dr["DeliveryZipCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mDeliveryCityID = Convert.ToInt32(dr["DeliveryCityID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mDeliveryCountryID = Convert.ToInt32(dr["DeliveryCountryID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
						ObjCVarvwVoucherOperationsPayment.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
						ObjCVarvwVoucherOperationsPayment.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
						ObjCVarvwVoucherOperationsPayment.mTareWeight = Convert.ToDecimal(dr["TareWeight"].ToString());
						ObjCVarvwVoucherOperationsPayment.mNumberOfPackages = Convert.ToInt32(dr["NumberOfPackages"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mIsDangerousGoods = Convert.ToBoolean(dr["IsDangerousGoods"].ToString());
						ObjCVarvwVoucherOperationsPayment.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
						ObjCVarvwVoucherOperationsPayment.mSupplierReference = Convert.ToString(dr["SupplierReference"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPONumber = Convert.ToString(dr["PONumber"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPOValue = Convert.ToString(dr["POValue"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPODate = Convert.ToDateTime(dr["PODate"].ToString());
						ObjCVarvwVoucherOperationsPayment.mAgreedRate = Convert.ToString(dr["AgreedRate"].ToString());
						ObjCVarvwVoucherOperationsPayment.mOperationStageID = Convert.ToInt32(dr["OperationStageID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mNumberOfHousesConnected = Convert.ToInt32(dr["NumberOfHousesConnected"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwVoucherOperationsPayment.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPlacedOnOperationContainersAndPackagesID = Convert.ToInt64(dr["PlacedOnOperationContainersAndPackagesID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mIsPackagesPlacedOnMaster = Convert.ToBoolean(dr["IsPackagesPlacedOnMaster"].ToString());
						ObjCVarvwVoucherOperationsPayment.mQuotationID = Convert.ToInt64(dr["QuotationID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mQuotationCode = Convert.ToString(dr["QuotationCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mQRNotes = Convert.ToString(dr["QRNotes"].ToString());
						ObjCVarvwVoucherOperationsPayment.mContainerTypeCode = Convert.ToString(dr["ContainerTypeCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
						ObjCVarvwVoucherOperationsPayment.mBranchName = Convert.ToString(dr["BranchName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mBranchLocalName = Convert.ToString(dr["BranchLocalName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mOpenedBy = Convert.ToString(dr["OpenedBy"].ToString());
						ObjCVarvwVoucherOperationsPayment.mSalesman = Convert.ToString(dr["Salesman"].ToString());
						ObjCVarvwVoucherOperationsPayment.mMoveTypeCode = Convert.ToString(dr["MoveTypeCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mMoveTypeName = Convert.ToString(dr["MoveTypeName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mLocalName = Convert.ToString(dr["LocalName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mMoveTypeIconName = Convert.ToString(dr["MoveTypeIconName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mMoveTypeIconStyle = Convert.ToString(dr["MoveTypeIconStyle"].ToString());
						ObjCVarvwVoucherOperationsPayment.mIncotermCode = Convert.ToString(dr["IncotermCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mIncotermName = Convert.ToString(dr["IncotermName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPOrCCode = Convert.ToString(dr["POrCCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPOrCName = Convert.ToString(dr["POrCName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mShipmentTypeCode = Convert.ToString(dr["ShipmentTypeCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCommodityCode = Convert.ToString(dr["CommodityCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPOLCountryCode = Convert.ToString(dr["POLCountryCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPOLCountryName = Convert.ToString(dr["POLCountryName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPOLCode = Convert.ToString(dr["POLCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPOLName = Convert.ToString(dr["POLName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPODCountryCode = Convert.ToString(dr["PODCountryCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPODCountryName = Convert.ToString(dr["PODCountryName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPickupAddress = Convert.ToString(dr["PickupAddress"].ToString());
						ObjCVarvwVoucherOperationsPayment.mDeliveryAddress = Convert.ToString(dr["DeliveryAddress"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPODCode = Convert.ToString(dr["PODCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPODName = Convert.ToString(dr["PODName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mMasterShippingLineID = Convert.ToInt32(dr["MasterShippingLineID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mMasterAirlineID = Convert.ToInt32(dr["MasterAirlineID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mMasterTruckerID = Convert.ToInt32(dr["MasterTruckerID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mShippingLineCode = Convert.ToString(dr["ShippingLineCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mShippingLineName = Convert.ToString(dr["ShippingLineName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mAirlineCode = Convert.ToString(dr["AirlineCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mAirlineName = Convert.ToString(dr["AirlineName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mAirlinePrefix = Convert.ToString(dr["AirlinePrefix"].ToString());
						ObjCVarvwVoucherOperationsPayment.mTruckerCode = Convert.ToInt32(dr["TruckerCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mTruckerName = Convert.ToString(dr["TruckerName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mVia1Code = Convert.ToString(dr["Via1Code"].ToString());
						ObjCVarvwVoucherOperationsPayment.mVia1Name = Convert.ToString(dr["Via1Name"].ToString());
						ObjCVarvwVoucherOperationsPayment.mVia1LocalName = Convert.ToString(dr["Via1LocalName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mVia2Code = Convert.ToString(dr["Via2Code"].ToString());
						ObjCVarvwVoucherOperationsPayment.mVia2Name = Convert.ToString(dr["Via2Name"].ToString());
						ObjCVarvwVoucherOperationsPayment.mVia2LocalName = Convert.ToString(dr["Via2LocalName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mVia3Code = Convert.ToString(dr["Via3Code"].ToString());
						ObjCVarvwVoucherOperationsPayment.mVia3Name = Convert.ToString(dr["Via3Name"].ToString());
						ObjCVarvwVoucherOperationsPayment.mVia3LocalName = Convert.ToString(dr["Via3LocalName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mAirlineCode1 = Convert.ToString(dr["AirlineCode1"].ToString());
						ObjCVarvwVoucherOperationsPayment.mAirlineCode2 = Convert.ToString(dr["AirlineCode2"].ToString());
						ObjCVarvwVoucherOperationsPayment.mAirlineCode3 = Convert.ToString(dr["AirlineCode3"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPickupCityCode = Convert.ToString(dr["PickupCityCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPickupCityName = Convert.ToString(dr["PickupCityName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mDeliveryCityCode = Convert.ToString(dr["DeliveryCityCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mDeliveryCityName = Convert.ToString(dr["DeliveryCityName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCountryCode = Convert.ToString(dr["CountryCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mDeliveryCountryName = Convert.ToString(dr["DeliveryCountryName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mOperationStageCode = Convert.ToString(dr["OperationStageCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mOperationStageName = Convert.ToString(dr["OperationStageName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mMasterOperationCode = Convert.ToString(dr["MasterOperationCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mMasterOperationCodeSerial = Convert.ToInt32(dr["MasterOperationCodeSerial"].ToString());
						ObjCVarvwVoucherOperationsPayment.mIsAWB = Convert.ToBoolean(dr["IsAWB"].ToString());
						ObjCVarvwVoucherOperationsPayment.mIsDelivered = Convert.ToBoolean(dr["IsDelivered"].ToString());
						ObjCVarvwVoucherOperationsPayment.mIsTrucking = Convert.ToBoolean(dr["IsTrucking"].ToString());
						ObjCVarvwVoucherOperationsPayment.mIsInsurance = Convert.ToBoolean(dr["IsInsurance"].ToString());
						ObjCVarvwVoucherOperationsPayment.mIsClearance = Convert.ToBoolean(dr["IsClearance"].ToString());
						ObjCVarvwVoucherOperationsPayment.mIsGenset = Convert.ToBoolean(dr["IsGenset"].ToString());
						ObjCVarvwVoucherOperationsPayment.mIsCourrier = Convert.ToBoolean(dr["IsCourrier"].ToString());
						ObjCVarvwVoucherOperationsPayment.mIsOBL = Convert.ToBoolean(dr["IsOBL"].ToString());
						ObjCVarvwVoucherOperationsPayment.mIsTelexRelease = Convert.ToBoolean(dr["IsTelexRelease"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCreatorLocalName = Convert.ToString(dr["CreatorLocalName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mModificatorName = Convert.ToString(dr["ModificatorName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mModificatorLocalName = Convert.ToString(dr["ModificatorLocalName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mBookingNumbers = Convert.ToString(dr["BookingNumbers"].ToString());
						ObjCVarvwVoucherOperationsPayment.mVoyageOrTruckNumber = Convert.ToString(dr["VoyageOrTruckNumber"].ToString());
						ObjCVarvwVoucherOperationsPayment.mFreeTime = Convert.ToInt32(dr["FreeTime"].ToString());
						ObjCVarvwVoucherOperationsPayment.mETAPOLDate = Convert.ToDateTime(dr["ETAPOLDate"].ToString());
						ObjCVarvwVoucherOperationsPayment.mATAPOLDate = Convert.ToDateTime(dr["ATAPOLDate"].ToString());
						ObjCVarvwVoucherOperationsPayment.mExpectedDeparture = Convert.ToDateTime(dr["ExpectedDeparture"].ToString());
						ObjCVarvwVoucherOperationsPayment.mActualDeparture = Convert.ToDateTime(dr["ActualDeparture"].ToString());
						ObjCVarvwVoucherOperationsPayment.mExpectedArrival = Convert.ToDateTime(dr["ExpectedArrival"].ToString());
						ObjCVarvwVoucherOperationsPayment.mActualArrival = Convert.ToDateTime(dr["ActualArrival"].ToString());
						ObjCVarvwVoucherOperationsPayment.mRepBLTypeShown = Convert.ToString(dr["RepBLTypeShown"].ToString());
						ObjCVarvwVoucherOperationsPayment.mRepDirectionTypeShown = Convert.ToString(dr["RepDirectionTypeShown"].ToString());
						ObjCVarvwVoucherOperationsPayment.mRepTransportTypeShown = Convert.ToString(dr["RepTransportTypeShown"].ToString());
						ObjCVarvwVoucherOperationsPayment.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mClientName = Convert.ToString(dr["ClientName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mClientPhonesAndFaxes = Convert.ToString(dr["ClientPhonesAndFaxes"].ToString());
						ObjCVarvwVoucherOperationsPayment.mClientAddress = Convert.ToString(dr["ClientAddress"].ToString());
						ObjCVarvwVoucherOperationsPayment.mContainerNumbers = Convert.ToString(dr["ContainerNumbers"].ToString());
						ObjCVarvwVoucherOperationsPayment.mDimensions = Convert.ToString(dr["Dimensions"].ToString());
						ObjCVarvwVoucherOperationsPayment.mTEUs = Convert.ToInt32(dr["TEUs"].ToString());
						ObjCVarvwVoucherOperationsPayment.mGrossWeightSum = Convert.ToDecimal(dr["GrossWeightSum"].ToString());
						ObjCVarvwVoucherOperationsPayment.mVGM = Convert.ToDecimal(dr["VGM"].ToString());
						ObjCVarvwVoucherOperationsPayment.mVGMSum = Convert.ToDecimal(dr["VGMSum"].ToString());
						ObjCVarvwVoucherOperationsPayment.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
						ObjCVarvwVoucherOperationsPayment.mNetWeightSum = Convert.ToDecimal(dr["NetWeightSum"].ToString());
						ObjCVarvwVoucherOperationsPayment.mDescriptionOfGoods = Convert.ToString(dr["DescriptionOfGoods"].ToString());
						ObjCVarvwVoucherOperationsPayment.mInvoiceNumbers = Convert.ToString(dr["InvoiceNumbers"].ToString());
						ObjCVarvwVoucherOperationsPayment.mAllTrackingStages = Convert.ToString(dr["AllTrackingStages"].ToString());
						ObjCVarvwVoucherOperationsPayment.mHouseBLs = Convert.ToString(dr["HouseBLs"].ToString());
						ObjCVarvwVoucherOperationsPayment.mHouseClients = Convert.ToString(dr["HouseClients"].ToString());
						ObjCVarvwVoucherOperationsPayment.mVolumeSum = Convert.ToDecimal(dr["VolumeSum"].ToString());
						ObjCVarvwVoucherOperationsPayment.mVesselID = Convert.ToInt32(dr["VesselID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mVesselName = Convert.ToString(dr["VesselName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mContainerTypes = Convert.ToString(dr["ContainerTypes"].ToString());
						ObjCVarvwVoucherOperationsPayment.mContainerTypes20 = Convert.ToString(dr["ContainerTypes20"].ToString());
						ObjCVarvwVoucherOperationsPayment.mContainerTypes40 = Convert.ToString(dr["ContainerTypes40"].ToString());
						ObjCVarvwVoucherOperationsPayment.mContainerTypes45 = Convert.ToString(dr["ContainerTypes45"].ToString());
						ObjCVarvwVoucherOperationsPayment.mContainerTypesReefer20 = Convert.ToString(dr["ContainerTypesReefer20"].ToString());
						ObjCVarvwVoucherOperationsPayment.mContainerTypesReefer40 = Convert.ToString(dr["ContainerTypesReefer40"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPackageTypesOnContainersTotals = Convert.ToString(dr["PackageTypesOnContainersTotals"].ToString());
						ObjCVarvwVoucherOperationsPayment.mPackageTypes = Convert.ToString(dr["PackageTypes"].ToString());
						ObjCVarvwVoucherOperationsPayment.mExtraPackages = Convert.ToString(dr["ExtraPackages"].ToString());
						ObjCVarvwVoucherOperationsPayment.mEffectiveOperationCode = Convert.ToString(dr["EffectiveOperationCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mEffectiveOperationID = Convert.ToInt64(dr["EffectiveOperationID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mMonthYear = Convert.ToString(dr["MonthYear"].ToString());
						ObjCVarvwVoucherOperationsPayment.mReference = Convert.ToString(dr["Reference"].ToString());
						ObjCVarvwVoucherOperationsPayment.mConsigneeID2 = Convert.ToInt32(dr["ConsigneeID2"].ToString());
						ObjCVarvwVoucherOperationsPayment.mConsignee2Name = Convert.ToString(dr["Consignee2Name"].ToString());
						ObjCVarvwVoucherOperationsPayment.mConsignee2LocalName = Convert.ToString(dr["Consignee2LocalName"].ToString());
						ObjCVarvwVoucherOperationsPayment.mReleaseDate = Convert.ToDateTime(dr["ReleaseDate"].ToString());
						ObjCVarvwVoucherOperationsPayment.mReleaseNumber = Convert.ToString(dr["ReleaseNumber"].ToString());
						ObjCVarvwVoucherOperationsPayment.mReleaseValue = Convert.ToDecimal(dr["ReleaseValue"].ToString());
						ObjCVarvwVoucherOperationsPayment.mTypeOfStockID = Convert.ToInt32(dr["TypeOfStockID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mAirLineID1 = Convert.ToInt32(dr["AirLineID1"].ToString());
						ObjCVarvwVoucherOperationsPayment.mAirLineID2 = Convert.ToInt32(dr["AirLineID2"].ToString());
						ObjCVarvwVoucherOperationsPayment.mAirLineID3 = Convert.ToInt32(dr["AirLineID3"].ToString());
						ObjCVarvwVoucherOperationsPayment.mFlightNo1 = Convert.ToString(dr["FlightNo1"].ToString());
						ObjCVarvwVoucherOperationsPayment.mFlightNo2 = Convert.ToString(dr["FlightNo2"].ToString());
						ObjCVarvwVoucherOperationsPayment.mFlightNo3 = Convert.ToString(dr["FlightNo3"].ToString());
						ObjCVarvwVoucherOperationsPayment.mFlightDate1 = Convert.ToDateTime(dr["FlightDate1"].ToString());
						ObjCVarvwVoucherOperationsPayment.mFlightDate2 = Convert.ToDateTime(dr["FlightDate2"].ToString());
						ObjCVarvwVoucherOperationsPayment.mFlightDate3 = Convert.ToDateTime(dr["FlightDate3"].ToString());
						ObjCVarvwVoucherOperationsPayment.mBarcode = Convert.ToString(dr["Barcode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mDescription = Convert.ToString(dr["Description"].ToString());
						ObjCVarvwVoucherOperationsPayment.mAmountOfInsurance = Convert.ToString(dr["AmountOfInsurance"].ToString());
						ObjCVarvwVoucherOperationsPayment.mDeclaredValueForCarriage = Convert.ToString(dr["DeclaredValueForCarriage"].ToString());
						ObjCVarvwVoucherOperationsPayment.mWeightCharge = Convert.ToDecimal(dr["WeightCharge"].ToString());
						ObjCVarvwVoucherOperationsPayment.mValuationCharge = Convert.ToDecimal(dr["ValuationCharge"].ToString());
						ObjCVarvwVoucherOperationsPayment.mTax = Convert.ToDecimal(dr["Tax"].ToString());
						ObjCVarvwVoucherOperationsPayment.mOtherChargesDueAgent = Convert.ToDecimal(dr["OtherChargesDueAgent"].ToString());
						ObjCVarvwVoucherOperationsPayment.mOtherChargesDueCarrier = Convert.ToDecimal(dr["OtherChargesDueCarrier"].ToString());
						ObjCVarvwVoucherOperationsPayment.mOtherCharges = Convert.ToString(dr["OtherCharges"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
						ObjCVarvwVoucherOperationsPayment.mAccountingInformation = Convert.ToString(dr["AccountingInformation"].ToString());
						ObjCVarvwVoucherOperationsPayment.mReferenceNumber = Convert.ToString(dr["ReferenceNumber"].ToString());
						ObjCVarvwVoucherOperationsPayment.mOptionalShippingInformation = Convert.ToString(dr["OptionalShippingInformation"].ToString());
						ObjCVarvwVoucherOperationsPayment.mCHGSCode = Convert.ToString(dr["CHGSCode"].ToString());
						ObjCVarvwVoucherOperationsPayment.mWT_VALL = Convert.ToString(dr["WT_VALL"].ToString());
						ObjCVarvwVoucherOperationsPayment.mWT_VALL_Other = Convert.ToString(dr["WT_VALL_Other"].ToString());
						ObjCVarvwVoucherOperationsPayment.mDeclaredValueForCustoms = Convert.ToString(dr["DeclaredValueForCustoms"].ToString());
						ObjCVarvwVoucherOperationsPayment.mFlightNo = Convert.ToString(dr["FlightNo"].ToString());
						ObjCVarvwVoucherOperationsPayment.mOpenYear = Convert.ToInt32(dr["OpenYear"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwVoucherOperationsPayment.Add(ObjCVarvwVoucherOperationsPayment);
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
			catch ( Exception ex)
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

