using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Quotations.Quotations.Generated
{
	[Serializable]
	public partial class CVarvwQuotationRoute_rpt
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int64 mID;
		internal String mCode;
		internal Int32 mCodeSerial;
		internal Int32 mRoutingTypeID;
		internal Int64 mQuotationID;
		internal String mQuotationCode;
		internal Int32 mBranchID;
		internal String mQuotationNotes;
		internal String mBranchName;
		internal Int32 mDirectionType;
		internal String mDirectionIconName;
		internal String mDirectionIconStyle;
		internal Int32 mTransportType;
		internal String mTransportIconName;
		internal String mTransportIconStyle;
		internal Int32 mShipmentType;
		internal String mShipmentTypeName;
		internal Int32 mPOLCountryID;
		internal Int32 mPOL;
		internal Int32 mPODCountryID;
		internal Int32 mPOD;
		internal String mPickupAddress;
		internal String mDeliveryAddress;
		internal Int32 mMoveTypeID;
		internal String mMoveTypeName;
		internal DateTime mETAPOLDate;
		internal DateTime mExpirationDate;
		internal Int32 mShippingLineID;
		internal Int32 mAirlineID;
		internal Int32 mTruckerID;
		internal Int32 mTransientTime;
		internal Int32 mValidity;
		internal Int32 mFreeTime;
		internal Int32 mFreeTimePOD;
		internal String mNotes;
		internal Int32 mCreatorUserID;
		internal String mCreatorName;
		internal DateTime mCreationDate;
		internal Int32 mModificatorUserID;
		internal DateTime mModificationDate;
		internal Int32 mCommodityID;
		internal String mCommodityName;
		internal String mRoutingName;
		internal Int32 mViewOrder;
		internal String mPOLCountryCode;
		internal String mPOLCountryName;
		internal String mPOLCode;
		internal String mPOLName;
		internal String mPOLAddress;
		internal String mPODCountryCode;
		internal String mPODCountryName;
		internal String mPODCode;
		internal String mPODName;
		internal String mPODAddress;
		internal Int32 mQuotationStageID;
		internal String mQuotationStageName;
		internal String mLineName;
		internal String mShippingLineCode;
		internal String mShippingLineName;
		internal String mAirlineCode;
		internal String mAirlineName;
		internal Int32 mTruckerCode;
		internal String mTruckerName;
		internal Int32 mSalesmanID;
		internal String mSalesmanName;
		internal Int32 mIncotermID;
		internal String mIncotermName;
		internal Int32 mIsExpired;
		internal Int32 mIsQuotationHeaderExpired;
		internal String mRepDirectionTypeShown;
		internal String mRepTransportTypeShown;
		internal Int32 mClientID;
		internal String mClientName;
		internal Int32 mAgentID;
		internal String mAgentName;
		internal String mQuoteOperations;
		internal Decimal mNumberOfPackages;
		internal Decimal mVolume;
		internal Decimal mVolumetricWeight;
		internal Decimal mGrossWeight;
		internal Decimal mChargeableWeight;
		internal String mDenialReason;
		internal Boolean mIsRevised;
		internal Boolean mIsChargesConfirmed;
		internal Int32 mPOrC;
		internal Int32 mEquipmentModelID;
		internal String mEquipmentModelCode;
		internal String mEquipmentModelName;
		internal Int32 mRevisorUserID;
		internal String mRevisorUserName;
		internal String mRevisorName;
		internal Int32 mChargesConfirmingUserID;
		internal String mChargesConfirmingUserName;
		internal String mChargesConfirmingName;
		internal String mPOrCName;
		internal String mPOrCCode;
		internal String mContainerTypes;
		internal String mPackageTypes;
		internal Boolean mIsWarehousing;
		internal Int32 mMainCriteriaID;
		internal String mMainCriteriaName;
		internal Int32 mSubCriteriaID;
		internal String mSubCriteriaName;
		internal Boolean mIsFleet;
		internal DateTime mQuotationOpenDate;
		internal Decimal mCost;
		internal Decimal mSale;
		internal Decimal mSaleFromCharges;
		internal Decimal mCostFromCharges;
		internal Int32 mDivisionID;
		internal String mDivisionName;
		internal Int32 mEquipmentTypeID;
		internal String mEquipmentTypeName;
		internal Int32 mNumberOfChairs;
		internal String mFreightRateFormat;
		internal Boolean mIs48HourAlarmSent;
		internal Int32 mZeroCostChargesCount;
		internal Int32 mChargesCount;
		internal Int32 mSalesLeadID;
		internal String mSalesLeadName;
		internal Boolean mIsAddedToCustomer;
		internal Int32 mSalesLeadCustomerID;
		internal String mSalesLeadCustomerName;
		internal Int32 mClearancePortID;
		internal String mClearancePortCode;
		internal String mClearancePortName;
		internal Int32 mClientPlantID;
		internal String mClientPlantCode;
		internal String mClientPlantName;
		internal Int32 mPOLID_Transport;
		internal String mPOLID_TransportCode;
		internal String mPOLID_TransportName;
		internal Int32 mPickupPlaceID;
		internal String mPickupPlaceCode;
		internal String mPickupPlaceName;
		internal String mModificatorUserName;
		internal String mApprovalUserName;
		internal Boolean mIsChargeEditApprovalRequested;
		internal Int32 mChargeEditApprovalLevel;
		internal Int32 mChargeEdit1stApprovalUserID;
		internal Int32 mChargeEdit2ndApprovalUserID;
		internal Int32 mChargeEdit3rdApprovalUserID;
		internal Int32 mChargeEdit4thApprovalUserID;
		internal String mChargeEdit1stApprovalUserName;
		internal String mChargeEdit2ndApprovalUserName;
		internal String mChargeEdit3rdApprovalUserName;
		internal String mChargeEdit4thApprovalUserName;
		internal String mOperationManName;
		internal DateTime mChareRequestDate;
		internal DateTime mChargeConfirmDate;
		internal DateTime mRequestApprovalDate;
		internal DateTime mSetApprovalDate;
		internal String mSetApprovalUserName;
		internal Boolean mIsContract;
		internal Decimal mCustomsAcceptedValue;
		internal Int32 mServiceID;
		internal DateTime mETD;
		internal DateTime mStuffingCutOf;
        internal String mQuotationCreatorUserName;
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
		public Int32 RoutingTypeID
		{
			get { return mRoutingTypeID; }
			set { mRoutingTypeID = value; }
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
		public Int32 BranchID
		{
			get { return mBranchID; }
			set { mBranchID = value; }
		}
		public String QuotationNotes
		{
			get { return mQuotationNotes; }
			set { mQuotationNotes = value; }
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
		public String ShipmentTypeName
		{
			get { return mShipmentTypeName; }
			set { mShipmentTypeName = value; }
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
		public DateTime ETAPOLDate
		{
			get { return mETAPOLDate; }
			set { mETAPOLDate = value; }
		}
		public DateTime ExpirationDate
		{
			get { return mExpirationDate; }
			set { mExpirationDate = value; }
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
		public Int32 TransientTime
		{
			get { return mTransientTime; }
			set { mTransientTime = value; }
		}
		public Int32 Validity
		{
			get { return mValidity; }
			set { mValidity = value; }
		}
		public Int32 FreeTime
		{
			get { return mFreeTime; }
			set { mFreeTime = value; }
		}
		public Int32 FreeTimePOD
		{
			get { return mFreeTimePOD; }
			set { mFreeTimePOD = value; }
		}
		public String Notes
		{
			get { return mNotes; }
			set { mNotes = value; }
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
		public DateTime ModificationDate
		{
			get { return mModificationDate; }
			set { mModificationDate = value; }
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
		public String RoutingName
		{
			get { return mRoutingName; }
			set { mRoutingName = value; }
		}
		public Int32 ViewOrder
		{
			get { return mViewOrder; }
			set { mViewOrder = value; }
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
		public String POLAddress
		{
			get { return mPOLAddress; }
			set { mPOLAddress = value; }
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
		public String PODAddress
		{
			get { return mPODAddress; }
			set { mPODAddress = value; }
		}
		public Int32 QuotationStageID
		{
			get { return mQuotationStageID; }
			set { mQuotationStageID = value; }
		}
		public String QuotationStageName
		{
			get { return mQuotationStageName; }
			set { mQuotationStageName = value; }
		}
		public String LineName
		{
			get { return mLineName; }
			set { mLineName = value; }
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
		public Int32 IsExpired
		{
			get { return mIsExpired; }
			set { mIsExpired = value; }
		}
		public Int32 IsQuotationHeaderExpired
		{
			get { return mIsQuotationHeaderExpired; }
			set { mIsQuotationHeaderExpired = value; }
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
		public String QuoteOperations
		{
			get { return mQuoteOperations; }
			set { mQuoteOperations = value; }
		}
		public Decimal NumberOfPackages
		{
			get { return mNumberOfPackages; }
			set { mNumberOfPackages = value; }
		}
		public Decimal Volume
		{
			get { return mVolume; }
			set { mVolume = value; }
		}
		public Decimal VolumetricWeight
		{
			get { return mVolumetricWeight; }
			set { mVolumetricWeight = value; }
		}
		public Decimal GrossWeight
		{
			get { return mGrossWeight; }
			set { mGrossWeight = value; }
		}
		public Decimal ChargeableWeight
		{
			get { return mChargeableWeight; }
			set { mChargeableWeight = value; }
		}
		public String DenialReason
		{
			get { return mDenialReason; }
			set { mDenialReason = value; }
		}
		public Boolean IsRevised
		{
			get { return mIsRevised; }
			set { mIsRevised = value; }
		}
		public Boolean IsChargesConfirmed
		{
			get { return mIsChargesConfirmed; }
			set { mIsChargesConfirmed = value; }
		}
		public Int32 POrC
		{
			get { return mPOrC; }
			set { mPOrC = value; }
		}
		public Int32 EquipmentModelID
		{
			get { return mEquipmentModelID; }
			set { mEquipmentModelID = value; }
		}
		public String EquipmentModelCode
		{
			get { return mEquipmentModelCode; }
			set { mEquipmentModelCode = value; }
		}
		public String EquipmentModelName
		{
			get { return mEquipmentModelName; }
			set { mEquipmentModelName = value; }
		}
		public Int32 RevisorUserID
		{
			get { return mRevisorUserID; }
			set { mRevisorUserID = value; }
		}
		public String RevisorUserName
		{
			get { return mRevisorUserName; }
			set { mRevisorUserName = value; }
		}
		public String RevisorName
		{
			get { return mRevisorName; }
			set { mRevisorName = value; }
		}
		public Int32 ChargesConfirmingUserID
		{
			get { return mChargesConfirmingUserID; }
			set { mChargesConfirmingUserID = value; }
		}
		public String ChargesConfirmingUserName
		{
			get { return mChargesConfirmingUserName; }
			set { mChargesConfirmingUserName = value; }
		}
		public String ChargesConfirmingName
		{
			get { return mChargesConfirmingName; }
			set { mChargesConfirmingName = value; }
		}
		public String POrCName
		{
			get { return mPOrCName; }
			set { mPOrCName = value; }
		}
		public String POrCCode
		{
			get { return mPOrCCode; }
			set { mPOrCCode = value; }
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
		public Boolean IsWarehousing
		{
			get { return mIsWarehousing; }
			set { mIsWarehousing = value; }
		}
		public Int32 MainCriteriaID
		{
			get { return mMainCriteriaID; }
			set { mMainCriteriaID = value; }
		}
		public String MainCriteriaName
		{
			get { return mMainCriteriaName; }
			set { mMainCriteriaName = value; }
		}
		public Int32 SubCriteriaID
		{
			get { return mSubCriteriaID; }
			set { mSubCriteriaID = value; }
		}
		public String SubCriteriaName
		{
			get { return mSubCriteriaName; }
			set { mSubCriteriaName = value; }
		}
		public Boolean IsFleet
		{
			get { return mIsFleet; }
			set { mIsFleet = value; }
		}
		public DateTime QuotationOpenDate
		{
			get { return mQuotationOpenDate; }
			set { mQuotationOpenDate = value; }
		}
		public Decimal Cost
		{
			get { return mCost; }
			set { mCost = value; }
		}
		public Decimal Sale
		{
			get { return mSale; }
			set { mSale = value; }
		}
		public Decimal SaleFromCharges
		{
			get { return mSaleFromCharges; }
			set { mSaleFromCharges = value; }
		}
		public Decimal CostFromCharges
		{
			get { return mCostFromCharges; }
			set { mCostFromCharges = value; }
		}
		public Int32 DivisionID
		{
			get { return mDivisionID; }
			set { mDivisionID = value; }
		}
		public String DivisionName
		{
			get { return mDivisionName; }
			set { mDivisionName = value; }
		}
		public Int32 EquipmentTypeID
		{
			get { return mEquipmentTypeID; }
			set { mEquipmentTypeID = value; }
		}
		public String EquipmentTypeName
		{
			get { return mEquipmentTypeName; }
			set { mEquipmentTypeName = value; }
		}
		public Int32 NumberOfChairs
		{
			get { return mNumberOfChairs; }
			set { mNumberOfChairs = value; }
		}
		public String FreightRateFormat
		{
			get { return mFreightRateFormat; }
			set { mFreightRateFormat = value; }
		}
		public Boolean Is48HourAlarmSent
		{
			get { return mIs48HourAlarmSent; }
			set { mIs48HourAlarmSent = value; }
		}
		public Int32 ZeroCostChargesCount
		{
			get { return mZeroCostChargesCount; }
			set { mZeroCostChargesCount = value; }
		}
		public Int32 ChargesCount
		{
			get { return mChargesCount; }
			set { mChargesCount = value; }
		}
		public Int32 SalesLeadID
		{
			get { return mSalesLeadID; }
			set { mSalesLeadID = value; }
		}
		public String SalesLeadName
		{
			get { return mSalesLeadName; }
			set { mSalesLeadName = value; }
		}
		public Boolean IsAddedToCustomer
		{
			get { return mIsAddedToCustomer; }
			set { mIsAddedToCustomer = value; }
		}
		public Int32 SalesLeadCustomerID
		{
			get { return mSalesLeadCustomerID; }
			set { mSalesLeadCustomerID = value; }
		}
		public String SalesLeadCustomerName
		{
			get { return mSalesLeadCustomerName; }
			set { mSalesLeadCustomerName = value; }
		}
		public Int32 ClearancePortID
		{
			get { return mClearancePortID; }
			set { mClearancePortID = value; }
		}
		public String ClearancePortCode
		{
			get { return mClearancePortCode; }
			set { mClearancePortCode = value; }
		}
		public String ClearancePortName
		{
			get { return mClearancePortName; }
			set { mClearancePortName = value; }
		}
		public Int32 ClientPlantID
		{
			get { return mClientPlantID; }
			set { mClientPlantID = value; }
		}
		public String ClientPlantCode
		{
			get { return mClientPlantCode; }
			set { mClientPlantCode = value; }
		}
		public String ClientPlantName
		{
			get { return mClientPlantName; }
			set { mClientPlantName = value; }
		}
		public Int32 POLID_Transport
		{
			get { return mPOLID_Transport; }
			set { mPOLID_Transport = value; }
		}
		public String POLID_TransportCode
		{
			get { return mPOLID_TransportCode; }
			set { mPOLID_TransportCode = value; }
		}
		public String POLID_TransportName
		{
			get { return mPOLID_TransportName; }
			set { mPOLID_TransportName = value; }
		}
		public Int32 PickupPlaceID
		{
			get { return mPickupPlaceID; }
			set { mPickupPlaceID = value; }
		}
		public String PickupPlaceCode
		{
			get { return mPickupPlaceCode; }
			set { mPickupPlaceCode = value; }
		}
		public String PickupPlaceName
		{
			get { return mPickupPlaceName; }
			set { mPickupPlaceName = value; }
		}
		public String ModificatorUserName
		{
			get { return mModificatorUserName; }
			set { mModificatorUserName = value; }
		}
		public String ApprovalUserName
		{
			get { return mApprovalUserName; }
			set { mApprovalUserName = value; }
		}
		public Boolean IsChargeEditApprovalRequested
		{
			get { return mIsChargeEditApprovalRequested; }
			set { mIsChargeEditApprovalRequested = value; }
		}
		public Int32 ChargeEditApprovalLevel
		{
			get { return mChargeEditApprovalLevel; }
			set { mChargeEditApprovalLevel = value; }
		}
		public Int32 ChargeEdit1stApprovalUserID
		{
			get { return mChargeEdit1stApprovalUserID; }
			set { mChargeEdit1stApprovalUserID = value; }
		}
		public Int32 ChargeEdit2ndApprovalUserID
		{
			get { return mChargeEdit2ndApprovalUserID; }
			set { mChargeEdit2ndApprovalUserID = value; }
		}
		public Int32 ChargeEdit3rdApprovalUserID
		{
			get { return mChargeEdit3rdApprovalUserID; }
			set { mChargeEdit3rdApprovalUserID = value; }
		}
		public Int32 ChargeEdit4thApprovalUserID
		{
			get { return mChargeEdit4thApprovalUserID; }
			set { mChargeEdit4thApprovalUserID = value; }
		}
		public String ChargeEdit1stApprovalUserName
		{
			get { return mChargeEdit1stApprovalUserName; }
			set { mChargeEdit1stApprovalUserName = value; }
		}
		public String ChargeEdit2ndApprovalUserName
		{
			get { return mChargeEdit2ndApprovalUserName; }
			set { mChargeEdit2ndApprovalUserName = value; }
		}
		public String ChargeEdit3rdApprovalUserName
		{
			get { return mChargeEdit3rdApprovalUserName; }
			set { mChargeEdit3rdApprovalUserName = value; }
		}
		public String ChargeEdit4thApprovalUserName
		{
			get { return mChargeEdit4thApprovalUserName; }
			set { mChargeEdit4thApprovalUserName = value; }
		}
		public String OperationManName
		{
			get { return mOperationManName; }
			set { mOperationManName = value; }
		}
		public DateTime ChareRequestDate
		{
			get { return mChareRequestDate; }
			set { mChareRequestDate = value; }
		}
		public DateTime ChargeConfirmDate
		{
			get { return mChargeConfirmDate; }
			set { mChargeConfirmDate = value; }
		}
		public DateTime RequestApprovalDate
		{
			get { return mRequestApprovalDate; }
			set { mRequestApprovalDate = value; }
		}
		public DateTime SetApprovalDate
		{
			get { return mSetApprovalDate; }
			set { mSetApprovalDate = value; }
		}
		public String SetApprovalUserName
		{
			get { return mSetApprovalUserName; }
			set { mSetApprovalUserName = value; }
		}
		public Boolean IsContract
		{
			get { return mIsContract; }
			set { mIsContract = value; }
		}
		public Decimal CustomsAcceptedValue
		{
			get { return mCustomsAcceptedValue; }
			set { mCustomsAcceptedValue = value; }
		}
		public Int32 ServiceID
		{
			get { return mServiceID; }
			set { mServiceID = value; }
		}
		public DateTime ETD
		{
			get { return mETD; }
			set { mETD = value; }
		}
		public DateTime StuffingCutOf
		{
			get { return mStuffingCutOf; }
			set { mStuffingCutOf = value; }
		}
        public String QuotationCreatorUserName
        {
            get { return mQuotationCreatorUserName; }
            set { mQuotationCreatorUserName = value; }
        }
        #endregion
    }

	public partial class CvwQuotationRoute_rpt
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
		public List<CVarvwQuotationRoute_rpt> lstCVarvwQuotationRoute_rpt = new List<CVarvwQuotationRoute_rpt>();
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
			lstCVarvwQuotationRoute_rpt.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwQuotationRoute_rpt";
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
						CVarvwQuotationRoute_rpt ObjCVarvwQuotationRoute_rpt = new CVarvwQuotationRoute_rpt();
						ObjCVarvwQuotationRoute_rpt.mID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwQuotationRoute_rpt.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
						ObjCVarvwQuotationRoute_rpt.mRoutingTypeID = Convert.ToInt32(dr["RoutingTypeID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mQuotationID = Convert.ToInt64(dr["QuotationID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mQuotationCode = Convert.ToString(dr["QuotationCode"].ToString());
						ObjCVarvwQuotationRoute_rpt.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mQuotationNotes = Convert.ToString(dr["QuotationNotes"].ToString());
						ObjCVarvwQuotationRoute_rpt.mBranchName = Convert.ToString(dr["BranchName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
						ObjCVarvwQuotationRoute_rpt.mDirectionIconName = Convert.ToString(dr["DirectionIconName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mDirectionIconStyle = Convert.ToString(dr["DirectionIconStyle"].ToString());
						ObjCVarvwQuotationRoute_rpt.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
						ObjCVarvwQuotationRoute_rpt.mTransportIconName = Convert.ToString(dr["TransportIconName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mTransportIconStyle = Convert.ToString(dr["TransportIconStyle"].ToString());
						ObjCVarvwQuotationRoute_rpt.mShipmentType = Convert.ToInt32(dr["ShipmentType"].ToString());
						ObjCVarvwQuotationRoute_rpt.mShipmentTypeName = Convert.ToString(dr["ShipmentTypeName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPOLCountryID = Convert.ToInt32(dr["POLCountryID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPOL = Convert.ToInt32(dr["POL"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPODCountryID = Convert.ToInt32(dr["PODCountryID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPOD = Convert.ToInt32(dr["POD"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPickupAddress = Convert.ToString(dr["PickupAddress"].ToString());
						ObjCVarvwQuotationRoute_rpt.mDeliveryAddress = Convert.ToString(dr["DeliveryAddress"].ToString());
						ObjCVarvwQuotationRoute_rpt.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mMoveTypeName = Convert.ToString(dr["MoveTypeName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mETAPOLDate = Convert.ToDateTime(dr["ETAPOLDate"].ToString());
						ObjCVarvwQuotationRoute_rpt.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarvwQuotationRoute_rpt.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mTransientTime = Convert.ToInt32(dr["TransientTime"].ToString());
						ObjCVarvwQuotationRoute_rpt.mValidity = Convert.ToInt32(dr["Validity"].ToString());
						ObjCVarvwQuotationRoute_rpt.mFreeTime = Convert.ToInt32(dr["FreeTime"].ToString());
						ObjCVarvwQuotationRoute_rpt.mFreeTimePOD = Convert.ToInt32(dr["FreeTimePOD"].ToString());
						ObjCVarvwQuotationRoute_rpt.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwQuotationRoute_rpt.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwQuotationRoute_rpt.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarvwQuotationRoute_rpt.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mRoutingName = Convert.ToString(dr["RoutingName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPOLCountryCode = Convert.ToString(dr["POLCountryCode"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPOLCountryName = Convert.ToString(dr["POLCountryName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPOLCode = Convert.ToString(dr["POLCode"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPOLName = Convert.ToString(dr["POLName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPOLAddress = Convert.ToString(dr["POLAddress"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPODCountryCode = Convert.ToString(dr["PODCountryCode"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPODCountryName = Convert.ToString(dr["PODCountryName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPODCode = Convert.ToString(dr["PODCode"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPODName = Convert.ToString(dr["PODName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPODAddress = Convert.ToString(dr["PODAddress"].ToString());
						ObjCVarvwQuotationRoute_rpt.mQuotationStageID = Convert.ToInt32(dr["QuotationStageID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mQuotationStageName = Convert.ToString(dr["QuotationStageName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mLineName = Convert.ToString(dr["LineName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mShippingLineCode = Convert.ToString(dr["ShippingLineCode"].ToString());
						ObjCVarvwQuotationRoute_rpt.mShippingLineName = Convert.ToString(dr["ShippingLineName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mAirlineCode = Convert.ToString(dr["AirlineCode"].ToString());
						ObjCVarvwQuotationRoute_rpt.mAirlineName = Convert.ToString(dr["AirlineName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mTruckerCode = Convert.ToInt32(dr["TruckerCode"].ToString());
						ObjCVarvwQuotationRoute_rpt.mTruckerName = Convert.ToString(dr["TruckerName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mSalesmanID = Convert.ToInt32(dr["SalesmanID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mSalesmanName = Convert.ToString(dr["SalesmanName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mIncotermID = Convert.ToInt32(dr["IncotermID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mIncotermName = Convert.ToString(dr["IncotermName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mIsExpired = Convert.ToInt32(dr["IsExpired"].ToString());
						ObjCVarvwQuotationRoute_rpt.mIsQuotationHeaderExpired = Convert.ToInt32(dr["IsQuotationHeaderExpired"].ToString());
						ObjCVarvwQuotationRoute_rpt.mRepDirectionTypeShown = Convert.ToString(dr["RepDirectionTypeShown"].ToString());
						ObjCVarvwQuotationRoute_rpt.mRepTransportTypeShown = Convert.ToString(dr["RepTransportTypeShown"].ToString());
						ObjCVarvwQuotationRoute_rpt.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mClientName = Convert.ToString(dr["ClientName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mAgentName = Convert.ToString(dr["AgentName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mQuoteOperations = Convert.ToString(dr["QuoteOperations"].ToString());
						ObjCVarvwQuotationRoute_rpt.mNumberOfPackages = Convert.ToDecimal(dr["NumberOfPackages"].ToString());
						ObjCVarvwQuotationRoute_rpt.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
						ObjCVarvwQuotationRoute_rpt.mVolumetricWeight = Convert.ToDecimal(dr["VolumetricWeight"].ToString());
						ObjCVarvwQuotationRoute_rpt.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
						ObjCVarvwQuotationRoute_rpt.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
						ObjCVarvwQuotationRoute_rpt.mDenialReason = Convert.ToString(dr["DenialReason"].ToString());
						ObjCVarvwQuotationRoute_rpt.mIsRevised = Convert.ToBoolean(dr["IsRevised"].ToString());
						ObjCVarvwQuotationRoute_rpt.mIsChargesConfirmed = Convert.ToBoolean(dr["IsChargesConfirmed"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPOrC = Convert.ToInt32(dr["POrC"].ToString());
						ObjCVarvwQuotationRoute_rpt.mEquipmentModelID = Convert.ToInt32(dr["EquipmentModelID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mEquipmentModelCode = Convert.ToString(dr["EquipmentModelCode"].ToString());
						ObjCVarvwQuotationRoute_rpt.mEquipmentModelName = Convert.ToString(dr["EquipmentModelName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mRevisorUserID = Convert.ToInt32(dr["RevisorUserID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mRevisorUserName = Convert.ToString(dr["RevisorUserName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mRevisorName = Convert.ToString(dr["RevisorName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mChargesConfirmingUserID = Convert.ToInt32(dr["ChargesConfirmingUserID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mChargesConfirmingUserName = Convert.ToString(dr["ChargesConfirmingUserName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mChargesConfirmingName = Convert.ToString(dr["ChargesConfirmingName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPOrCName = Convert.ToString(dr["POrCName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPOrCCode = Convert.ToString(dr["POrCCode"].ToString());
						ObjCVarvwQuotationRoute_rpt.mContainerTypes = Convert.ToString(dr["ContainerTypes"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPackageTypes = Convert.ToString(dr["PackageTypes"].ToString());
						ObjCVarvwQuotationRoute_rpt.mIsWarehousing = Convert.ToBoolean(dr["IsWarehousing"].ToString());
						ObjCVarvwQuotationRoute_rpt.mMainCriteriaID = Convert.ToInt32(dr["MainCriteriaID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mMainCriteriaName = Convert.ToString(dr["MainCriteriaName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mSubCriteriaID = Convert.ToInt32(dr["SubCriteriaID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mSubCriteriaName = Convert.ToString(dr["SubCriteriaName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mIsFleet = Convert.ToBoolean(dr["IsFleet"].ToString());
						ObjCVarvwQuotationRoute_rpt.mQuotationOpenDate = Convert.ToDateTime(dr["QuotationOpenDate"].ToString());
						ObjCVarvwQuotationRoute_rpt.mCost = Convert.ToDecimal(dr["Cost"].ToString());
						ObjCVarvwQuotationRoute_rpt.mSale = Convert.ToDecimal(dr["Sale"].ToString());
						ObjCVarvwQuotationRoute_rpt.mSaleFromCharges = Convert.ToDecimal(dr["SaleFromCharges"].ToString());
						ObjCVarvwQuotationRoute_rpt.mCostFromCharges = Convert.ToDecimal(dr["CostFromCharges"].ToString());
						ObjCVarvwQuotationRoute_rpt.mDivisionID = Convert.ToInt32(dr["DivisionID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mDivisionName = Convert.ToString(dr["DivisionName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mEquipmentTypeID = Convert.ToInt32(dr["EquipmentTypeID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mEquipmentTypeName = Convert.ToString(dr["EquipmentTypeName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mNumberOfChairs = Convert.ToInt32(dr["NumberOfChairs"].ToString());
						ObjCVarvwQuotationRoute_rpt.mFreightRateFormat = Convert.ToString(dr["FreightRateFormat"].ToString());
						ObjCVarvwQuotationRoute_rpt.mIs48HourAlarmSent = Convert.ToBoolean(dr["Is48HourAlarmSent"].ToString());
						ObjCVarvwQuotationRoute_rpt.mZeroCostChargesCount = Convert.ToInt32(dr["ZeroCostChargesCount"].ToString());
						ObjCVarvwQuotationRoute_rpt.mChargesCount = Convert.ToInt32(dr["ChargesCount"].ToString());
						ObjCVarvwQuotationRoute_rpt.mSalesLeadID = Convert.ToInt32(dr["SalesLeadID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mSalesLeadName = Convert.ToString(dr["SalesLeadName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mIsAddedToCustomer = Convert.ToBoolean(dr["IsAddedToCustomer"].ToString());
						ObjCVarvwQuotationRoute_rpt.mSalesLeadCustomerID = Convert.ToInt32(dr["SalesLeadCustomerID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mSalesLeadCustomerName = Convert.ToString(dr["SalesLeadCustomerName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mClearancePortID = Convert.ToInt32(dr["ClearancePortID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mClearancePortCode = Convert.ToString(dr["ClearancePortCode"].ToString());
						ObjCVarvwQuotationRoute_rpt.mClearancePortName = Convert.ToString(dr["ClearancePortName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mClientPlantID = Convert.ToInt32(dr["ClientPlantID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mClientPlantCode = Convert.ToString(dr["ClientPlantCode"].ToString());
						ObjCVarvwQuotationRoute_rpt.mClientPlantName = Convert.ToString(dr["ClientPlantName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPOLID_Transport = Convert.ToInt32(dr["POLID_Transport"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPOLID_TransportCode = Convert.ToString(dr["POLID_TransportCode"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPOLID_TransportName = Convert.ToString(dr["POLID_TransportName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPickupPlaceID = Convert.ToInt32(dr["PickupPlaceID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPickupPlaceCode = Convert.ToString(dr["PickupPlaceCode"].ToString());
						ObjCVarvwQuotationRoute_rpt.mPickupPlaceName = Convert.ToString(dr["PickupPlaceName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mModificatorUserName = Convert.ToString(dr["ModificatorUserName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mApprovalUserName = Convert.ToString(dr["ApprovalUserName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mIsChargeEditApprovalRequested = Convert.ToBoolean(dr["IsChargeEditApprovalRequested"].ToString());
						ObjCVarvwQuotationRoute_rpt.mChargeEditApprovalLevel = Convert.ToInt32(dr["ChargeEditApprovalLevel"].ToString());
						ObjCVarvwQuotationRoute_rpt.mChargeEdit1stApprovalUserID = Convert.ToInt32(dr["ChargeEdit1stApprovalUserID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mChargeEdit2ndApprovalUserID = Convert.ToInt32(dr["ChargeEdit2ndApprovalUserID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mChargeEdit3rdApprovalUserID = Convert.ToInt32(dr["ChargeEdit3rdApprovalUserID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mChargeEdit4thApprovalUserID = Convert.ToInt32(dr["ChargeEdit4thApprovalUserID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mChargeEdit1stApprovalUserName = Convert.ToString(dr["ChargeEdit1stApprovalUserName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mChargeEdit2ndApprovalUserName = Convert.ToString(dr["ChargeEdit2ndApprovalUserName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mChargeEdit3rdApprovalUserName = Convert.ToString(dr["ChargeEdit3rdApprovalUserName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mChargeEdit4thApprovalUserName = Convert.ToString(dr["ChargeEdit4thApprovalUserName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mOperationManName = Convert.ToString(dr["OperationManName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mChareRequestDate = Convert.ToDateTime(dr["ChareRequestDate"].ToString());
						ObjCVarvwQuotationRoute_rpt.mChargeConfirmDate = Convert.ToDateTime(dr["ChargeConfirmDate"].ToString());
						ObjCVarvwQuotationRoute_rpt.mRequestApprovalDate = Convert.ToDateTime(dr["RequestApprovalDate"].ToString());
						ObjCVarvwQuotationRoute_rpt.mSetApprovalDate = Convert.ToDateTime(dr["SetApprovalDate"].ToString());
						ObjCVarvwQuotationRoute_rpt.mSetApprovalUserName = Convert.ToString(dr["SetApprovalUserName"].ToString());
						ObjCVarvwQuotationRoute_rpt.mIsContract = Convert.ToBoolean(dr["IsContract"].ToString());
						ObjCVarvwQuotationRoute_rpt.mCustomsAcceptedValue = Convert.ToDecimal(dr["CustomsAcceptedValue"].ToString());
						ObjCVarvwQuotationRoute_rpt.mServiceID = Convert.ToInt32(dr["ServiceID"].ToString());
						ObjCVarvwQuotationRoute_rpt.mETD = Convert.ToDateTime(dr["ETD"].ToString());
						ObjCVarvwQuotationRoute_rpt.mStuffingCutOf = Convert.ToDateTime(dr["StuffingCutOf"].ToString());
                        ObjCVarvwQuotationRoute_rpt.mQuotationCreatorUserName = Convert.ToString(dr["QuotationCreatorUserName"].ToString());
                        lstCVarvwQuotationRoute_rpt.Add(ObjCVarvwQuotationRoute_rpt);
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