using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKRoutingsTAX
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
    public partial class CVarRoutingsTAX : CPKRoutingsTAX
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mRoutingTypeID;
        internal Int64 mOperationID;
        internal Int32 mTransportType;
        internal String mTransportIconName;
        internal String mTransportIconStyle;
        internal Int32 mPOLCountryID;
        internal Int32 mPOL;
        internal Int32 mPODCountryID;
        internal Int32 mPOD;
        internal DateTime mETAPOLDate;
        internal DateTime mATAPOLDate;
        internal DateTime mExpectedDeparture;
        internal DateTime mActualDeparture;
        internal DateTime mExpectedArrival;
        internal DateTime mActualArrival;
        internal Int32 mShippingLineID;
        internal Int32 mAirlineID;
        internal Int32 mTruckerID;
        internal Int32 mVesselID;
        internal String mVoyageOrTruckNumber;
        internal Int32 mTransientTime;
        internal Int32 mValidity;
        internal Int32 mFreeTime;
        internal String mNotes;
        internal Int32 mGensetSupplierID;
        internal Int32 mCCAID;
        internal String mQuantity;
        internal String mContactPerson;
        internal String mPickupAddress;
        internal String mDeliveryAddress;
        internal Int32 mGateInPortID;
        internal Int32 mGateOutPortID;
        internal DateTime mGateInDate;
        internal DateTime mGateOutDate;
        internal DateTime mStuffingDate;
        internal DateTime mDeliveryDate;
        internal String mBookingNumber;
        internal String mDelays;
        internal String mPowerFromGateInTillActualSailing;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal String mContactPersonPhones;
        internal String mLoadingTime;
        internal String mCertificateNumber;
        internal String mCertificateValue;
        internal DateTime mCertificateDate;
        internal String mQasimaNumber;
        internal DateTime mQasimaDate;
        internal DateTime mSalesDateReceived;
        internal DateTime mCommerceDateReceived;
        internal DateTime mInspectionDateReceived;
        internal DateTime mFinishDateReceived;
        internal DateTime mSalesDateDelivered;
        internal DateTime mCommerceDateDelivered;
        internal DateTime mInspectionDateDelivered;
        internal DateTime mFinishDateDelivered;
        internal String mRoadNumber;
        internal String mDeliveryOrderNumber;
        internal String mWareHouse;
        internal String mWareHouseLocation;
        internal String mDriverName;
        internal String mDriverPhones;
        internal Boolean mIsOwnedByCompany;
        internal Int32 mTrailerID;
        internal Int32 mDriverID;
        internal Int32 mDriverAssistantID;
        internal Int32 mEquipmentID;
        internal Int32 mLoadingZoneID;
        internal Int32 mFirstCuringAreaID;
        internal Int32 mSecondCuringAreaID;
        internal Int32 mThirdCuringAreaID;
        internal String mBillNumber;
        internal String mTruckingOrderCode;
        internal Int32 mTruckCounter;
        internal Decimal mCargoReturnGrossWeight;
        internal Boolean mIsApproved;
        internal Decimal mCCAFreight;
        internal String mCCAInsurance;
        internal String mCCADischargeValue;
        internal String mCCAAcceptedValue;
        internal String mCCAImportValue;
        internal DateTime mCCADocumentReceiveDate;
        internal String mCCAExchangeRate;
        internal String mCCAVATCertificateNumber;
        internal String mCCAVATCertificateValue;
        internal String mCCACommercialProfitCertificateNumber;
        internal String mCCAOthers;
        internal DateTime mCCASpendDate;
        internal Int32 mLastTruckCounter;
        internal DateTime mOffloadingDate;
        internal Int32 mMaxSupplierContainers;
        internal Decimal mCCAFOB;
        internal Decimal mCCACFValue;
        internal String mCCAInvoiceNumber;
        internal Int32 mCustomerID;
        internal Int32 mSubContractedCustomerID;
        internal Decimal mCost;
        internal Decimal mSale;
        internal Boolean mIsFleet;
        internal Int32 mCommodityID;
        internal DateTime mLoadingDate;
        internal String mLoadingReference;
        internal DateTime mUnloadingDate;
        internal String mUnloadingReference;
        internal String mUnloadingTime;
        internal Int64 mQuotationRouteID;
        internal Int64 mInvoiceID;
        internal String mCCReleaseNo;
        internal Int32 mCC_ClearanceTypeID;
        internal DateTime mCCDropBackDelivered;
        internal DateTime mCCDropBackReceived;
        internal DateTime mCCAllowTemporaryDelivered;
        internal DateTime mCCAllowTemporaryReceived;
        #endregion

        #region "Methods"
        public Int32 RoutingTypeID
        {
            get { return mRoutingTypeID; }
            set { mIsChanges = true; mRoutingTypeID = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
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
        public DateTime ETAPOLDate
        {
            get { return mETAPOLDate; }
            set { mIsChanges = true; mETAPOLDate = value; }
        }
        public DateTime ATAPOLDate
        {
            get { return mATAPOLDate; }
            set { mIsChanges = true; mATAPOLDate = value; }
        }
        public DateTime ExpectedDeparture
        {
            get { return mExpectedDeparture; }
            set { mIsChanges = true; mExpectedDeparture = value; }
        }
        public DateTime ActualDeparture
        {
            get { return mActualDeparture; }
            set { mIsChanges = true; mActualDeparture = value; }
        }
        public DateTime ExpectedArrival
        {
            get { return mExpectedArrival; }
            set { mIsChanges = true; mExpectedArrival = value; }
        }
        public DateTime ActualArrival
        {
            get { return mActualArrival; }
            set { mIsChanges = true; mActualArrival = value; }
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
        public Int32 VesselID
        {
            get { return mVesselID; }
            set { mIsChanges = true; mVesselID = value; }
        }
        public String VoyageOrTruckNumber
        {
            get { return mVoyageOrTruckNumber; }
            set { mIsChanges = true; mVoyageOrTruckNumber = value; }
        }
        public Int32 TransientTime
        {
            get { return mTransientTime; }
            set { mIsChanges = true; mTransientTime = value; }
        }
        public Int32 Validity
        {
            get { return mValidity; }
            set { mIsChanges = true; mValidity = value; }
        }
        public Int32 FreeTime
        {
            get { return mFreeTime; }
            set { mIsChanges = true; mFreeTime = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int32 GensetSupplierID
        {
            get { return mGensetSupplierID; }
            set { mIsChanges = true; mGensetSupplierID = value; }
        }
        public Int32 CCAID
        {
            get { return mCCAID; }
            set { mIsChanges = true; mCCAID = value; }
        }
        public String Quantity
        {
            get { return mQuantity; }
            set { mIsChanges = true; mQuantity = value; }
        }
        public String ContactPerson
        {
            get { return mContactPerson; }
            set { mIsChanges = true; mContactPerson = value; }
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
        public Int32 GateInPortID
        {
            get { return mGateInPortID; }
            set { mIsChanges = true; mGateInPortID = value; }
        }
        public Int32 GateOutPortID
        {
            get { return mGateOutPortID; }
            set { mIsChanges = true; mGateOutPortID = value; }
        }
        public DateTime GateInDate
        {
            get { return mGateInDate; }
            set { mIsChanges = true; mGateInDate = value; }
        }
        public DateTime GateOutDate
        {
            get { return mGateOutDate; }
            set { mIsChanges = true; mGateOutDate = value; }
        }
        public DateTime StuffingDate
        {
            get { return mStuffingDate; }
            set { mIsChanges = true; mStuffingDate = value; }
        }
        public DateTime DeliveryDate
        {
            get { return mDeliveryDate; }
            set { mIsChanges = true; mDeliveryDate = value; }
        }
        public String BookingNumber
        {
            get { return mBookingNumber; }
            set { mIsChanges = true; mBookingNumber = value; }
        }
        public String Delays
        {
            get { return mDelays; }
            set { mIsChanges = true; mDelays = value; }
        }
        public String PowerFromGateInTillActualSailing
        {
            get { return mPowerFromGateInTillActualSailing; }
            set { mIsChanges = true; mPowerFromGateInTillActualSailing = value; }
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
        public String ContactPersonPhones
        {
            get { return mContactPersonPhones; }
            set { mIsChanges = true; mContactPersonPhones = value; }
        }
        public String LoadingTime
        {
            get { return mLoadingTime; }
            set { mIsChanges = true; mLoadingTime = value; }
        }
        public String CertificateNumber
        {
            get { return mCertificateNumber; }
            set { mIsChanges = true; mCertificateNumber = value; }
        }
        public String CertificateValue
        {
            get { return mCertificateValue; }
            set { mIsChanges = true; mCertificateValue = value; }
        }
        public DateTime CertificateDate
        {
            get { return mCertificateDate; }
            set { mIsChanges = true; mCertificateDate = value; }
        }
        public String QasimaNumber
        {
            get { return mQasimaNumber; }
            set { mIsChanges = true; mQasimaNumber = value; }
        }
        public DateTime QasimaDate
        {
            get { return mQasimaDate; }
            set { mIsChanges = true; mQasimaDate = value; }
        }
        public DateTime SalesDateReceived
        {
            get { return mSalesDateReceived; }
            set { mIsChanges = true; mSalesDateReceived = value; }
        }
        public DateTime CommerceDateReceived
        {
            get { return mCommerceDateReceived; }
            set { mIsChanges = true; mCommerceDateReceived = value; }
        }
        public DateTime InspectionDateReceived
        {
            get { return mInspectionDateReceived; }
            set { mIsChanges = true; mInspectionDateReceived = value; }
        }
        public DateTime FinishDateReceived
        {
            get { return mFinishDateReceived; }
            set { mIsChanges = true; mFinishDateReceived = value; }
        }
        public DateTime SalesDateDelivered
        {
            get { return mSalesDateDelivered; }
            set { mIsChanges = true; mSalesDateDelivered = value; }
        }
        public DateTime CommerceDateDelivered
        {
            get { return mCommerceDateDelivered; }
            set { mIsChanges = true; mCommerceDateDelivered = value; }
        }
        public DateTime InspectionDateDelivered
        {
            get { return mInspectionDateDelivered; }
            set { mIsChanges = true; mInspectionDateDelivered = value; }
        }
        public DateTime FinishDateDelivered
        {
            get { return mFinishDateDelivered; }
            set { mIsChanges = true; mFinishDateDelivered = value; }
        }
        public String RoadNumber
        {
            get { return mRoadNumber; }
            set { mIsChanges = true; mRoadNumber = value; }
        }
        public String DeliveryOrderNumber
        {
            get { return mDeliveryOrderNumber; }
            set { mIsChanges = true; mDeliveryOrderNumber = value; }
        }
        public String WareHouse
        {
            get { return mWareHouse; }
            set { mIsChanges = true; mWareHouse = value; }
        }
        public String WareHouseLocation
        {
            get { return mWareHouseLocation; }
            set { mIsChanges = true; mWareHouseLocation = value; }
        }
        public String DriverName
        {
            get { return mDriverName; }
            set { mIsChanges = true; mDriverName = value; }
        }
        public String DriverPhones
        {
            get { return mDriverPhones; }
            set { mIsChanges = true; mDriverPhones = value; }
        }
        public Boolean IsOwnedByCompany
        {
            get { return mIsOwnedByCompany; }
            set { mIsChanges = true; mIsOwnedByCompany = value; }
        }
        public Int32 TrailerID
        {
            get { return mTrailerID; }
            set { mIsChanges = true; mTrailerID = value; }
        }
        public Int32 DriverID
        {
            get { return mDriverID; }
            set { mIsChanges = true; mDriverID = value; }
        }
        public Int32 DriverAssistantID
        {
            get { return mDriverAssistantID; }
            set { mIsChanges = true; mDriverAssistantID = value; }
        }
        public Int32 EquipmentID
        {
            get { return mEquipmentID; }
            set { mIsChanges = true; mEquipmentID = value; }
        }
        public Int32 LoadingZoneID
        {
            get { return mLoadingZoneID; }
            set { mIsChanges = true; mLoadingZoneID = value; }
        }
        public Int32 FirstCuringAreaID
        {
            get { return mFirstCuringAreaID; }
            set { mIsChanges = true; mFirstCuringAreaID = value; }
        }
        public Int32 SecondCuringAreaID
        {
            get { return mSecondCuringAreaID; }
            set { mIsChanges = true; mSecondCuringAreaID = value; }
        }
        public Int32 ThirdCuringAreaID
        {
            get { return mThirdCuringAreaID; }
            set { mIsChanges = true; mThirdCuringAreaID = value; }
        }
        public String BillNumber
        {
            get { return mBillNumber; }
            set { mIsChanges = true; mBillNumber = value; }
        }
        public String TruckingOrderCode
        {
            get { return mTruckingOrderCode; }
            set { mIsChanges = true; mTruckingOrderCode = value; }
        }
        public Int32 TruckCounter
        {
            get { return mTruckCounter; }
            set { mIsChanges = true; mTruckCounter = value; }
        }
        public Decimal CargoReturnGrossWeight
        {
            get { return mCargoReturnGrossWeight; }
            set { mIsChanges = true; mCargoReturnGrossWeight = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsChanges = true; mIsApproved = value; }
        }
        public Decimal CCAFreight
        {
            get { return mCCAFreight; }
            set { mIsChanges = true; mCCAFreight = value; }
        }
        public String CCAInsurance
        {
            get { return mCCAInsurance; }
            set { mIsChanges = true; mCCAInsurance = value; }
        }
        public String CCADischargeValue
        {
            get { return mCCADischargeValue; }
            set { mIsChanges = true; mCCADischargeValue = value; }
        }
        public String CCAAcceptedValue
        {
            get { return mCCAAcceptedValue; }
            set { mIsChanges = true; mCCAAcceptedValue = value; }
        }
        public String CCAImportValue
        {
            get { return mCCAImportValue; }
            set { mIsChanges = true; mCCAImportValue = value; }
        }
        public DateTime CCADocumentReceiveDate
        {
            get { return mCCADocumentReceiveDate; }
            set { mIsChanges = true; mCCADocumentReceiveDate = value; }
        }
        public String CCAExchangeRate
        {
            get { return mCCAExchangeRate; }
            set { mIsChanges = true; mCCAExchangeRate = value; }
        }
        public String CCAVATCertificateNumber
        {
            get { return mCCAVATCertificateNumber; }
            set { mIsChanges = true; mCCAVATCertificateNumber = value; }
        }
        public String CCAVATCertificateValue
        {
            get { return mCCAVATCertificateValue; }
            set { mIsChanges = true; mCCAVATCertificateValue = value; }
        }
        public String CCACommercialProfitCertificateNumber
        {
            get { return mCCACommercialProfitCertificateNumber; }
            set { mIsChanges = true; mCCACommercialProfitCertificateNumber = value; }
        }
        public String CCAOthers
        {
            get { return mCCAOthers; }
            set { mIsChanges = true; mCCAOthers = value; }
        }
        public DateTime CCASpendDate
        {
            get { return mCCASpendDate; }
            set { mIsChanges = true; mCCASpendDate = value; }
        }
        public Int32 LastTruckCounter
        {
            get { return mLastTruckCounter; }
            set { mIsChanges = true; mLastTruckCounter = value; }
        }
        public DateTime OffloadingDate
        {
            get { return mOffloadingDate; }
            set { mIsChanges = true; mOffloadingDate = value; }
        }
        public Int32 MaxSupplierContainers
        {
            get { return mMaxSupplierContainers; }
            set { mIsChanges = true; mMaxSupplierContainers = value; }
        }
        public Decimal CCAFOB
        {
            get { return mCCAFOB; }
            set { mIsChanges = true; mCCAFOB = value; }
        }
        public Decimal CCACFValue
        {
            get { return mCCACFValue; }
            set { mIsChanges = true; mCCACFValue = value; }
        }
        public String CCAInvoiceNumber
        {
            get { return mCCAInvoiceNumber; }
            set { mIsChanges = true; mCCAInvoiceNumber = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mIsChanges = true; mCustomerID = value; }
        }
        public Int32 SubContractedCustomerID
        {
            get { return mSubContractedCustomerID; }
            set { mIsChanges = true; mSubContractedCustomerID = value; }
        }
        public Decimal Cost
        {
            get { return mCost; }
            set { mIsChanges = true; mCost = value; }
        }
        public Decimal Sale
        {
            get { return mSale; }
            set { mIsChanges = true; mSale = value; }
        }
        public Boolean IsFleet
        {
            get { return mIsFleet; }
            set { mIsChanges = true; mIsFleet = value; }
        }
        public Int32 CommodityID
        {
            get { return mCommodityID; }
            set { mIsChanges = true; mCommodityID = value; }
        }
        public DateTime LoadingDate
        {
            get { return mLoadingDate; }
            set { mIsChanges = true; mLoadingDate = value; }
        }
        public String LoadingReference
        {
            get { return mLoadingReference; }
            set { mIsChanges = true; mLoadingReference = value; }
        }
        public DateTime UnloadingDate
        {
            get { return mUnloadingDate; }
            set { mIsChanges = true; mUnloadingDate = value; }
        }
        public String UnloadingReference
        {
            get { return mUnloadingReference; }
            set { mIsChanges = true; mUnloadingReference = value; }
        }
        public String UnloadingTime
        {
            get { return mUnloadingTime; }
            set { mIsChanges = true; mUnloadingTime = value; }
        }
        public Int64 QuotationRouteID
        {
            get { return mQuotationRouteID; }
            set { mIsChanges = true; mQuotationRouteID = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mIsChanges = true; mInvoiceID = value; }
        }
        public String CCReleaseNo
        {
            get { return mCCReleaseNo; }
            set { mIsChanges = true; mCCReleaseNo = value; }
        }
        public Int32 CC_ClearanceTypeID
        {
            get { return mCC_ClearanceTypeID; }
            set { mIsChanges = true; mCC_ClearanceTypeID = value; }
        }
        public DateTime CCDropBackDelivered
        {
            get { return mCCDropBackDelivered; }
            set { mIsChanges = true; mCCDropBackDelivered = value; }
        }
        public DateTime CCDropBackReceived
        {
            get { return mCCDropBackReceived; }
            set { mIsChanges = true; mCCDropBackReceived = value; }
        }
        public DateTime CCAllowTemporaryDelivered
        {
            get { return mCCAllowTemporaryDelivered; }
            set { mIsChanges = true; mCCAllowTemporaryDelivered = value; }
        }
        public DateTime CCAllowTemporaryReceived
        {
            get { return mCCAllowTemporaryReceived; }
            set { mIsChanges = true; mCCAllowTemporaryReceived = value; }
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

    public partial class CRoutingsTAX
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
        public List<CVarRoutingsTAX> lstCVarRoutings = new List<CVarRoutingsTAX>();
        public List<CPKRoutingsTAX> lstDeletedCPKRoutings = new List<CPKRoutingsTAX>();
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
            lstCVarRoutings.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListRoutings";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemRoutings";
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
                        CVarRoutingsTAX ObjCVarRoutings = new CVarRoutingsTAX();
                        ObjCVarRoutings.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarRoutings.mRoutingTypeID = Convert.ToInt32(dr["RoutingTypeID"].ToString());
                        ObjCVarRoutings.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarRoutings.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
                        ObjCVarRoutings.mTransportIconName = Convert.ToString(dr["TransportIconName"].ToString());
                        ObjCVarRoutings.mTransportIconStyle = Convert.ToString(dr["TransportIconStyle"].ToString());
                        ObjCVarRoutings.mPOLCountryID = Convert.ToInt32(dr["POLCountryID"].ToString());
                        ObjCVarRoutings.mPOL = Convert.ToInt32(dr["POL"].ToString());
                        ObjCVarRoutings.mPODCountryID = Convert.ToInt32(dr["PODCountryID"].ToString());
                        ObjCVarRoutings.mPOD = Convert.ToInt32(dr["POD"].ToString());
                        ObjCVarRoutings.mETAPOLDate = Convert.ToDateTime(dr["ETAPOLDate"].ToString());
                        ObjCVarRoutings.mATAPOLDate = Convert.ToDateTime(dr["ATAPOLDate"].ToString());
                        ObjCVarRoutings.mExpectedDeparture = Convert.ToDateTime(dr["ExpectedDeparture"].ToString());
                        ObjCVarRoutings.mActualDeparture = Convert.ToDateTime(dr["ActualDeparture"].ToString());
                        ObjCVarRoutings.mExpectedArrival = Convert.ToDateTime(dr["ExpectedArrival"].ToString());
                        ObjCVarRoutings.mActualArrival = Convert.ToDateTime(dr["ActualArrival"].ToString());
                        ObjCVarRoutings.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarRoutings.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarRoutings.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarRoutings.mVesselID = Convert.ToInt32(dr["VesselID"].ToString());
                        ObjCVarRoutings.mVoyageOrTruckNumber = Convert.ToString(dr["VoyageOrTruckNumber"].ToString());
                        ObjCVarRoutings.mTransientTime = Convert.ToInt32(dr["TransientTime"].ToString());
                        ObjCVarRoutings.mValidity = Convert.ToInt32(dr["Validity"].ToString());
                        ObjCVarRoutings.mFreeTime = Convert.ToInt32(dr["FreeTime"].ToString());
                        ObjCVarRoutings.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarRoutings.mGensetSupplierID = Convert.ToInt32(dr["GensetSupplierID"].ToString());
                        ObjCVarRoutings.mCCAID = Convert.ToInt32(dr["CCAID"].ToString());
                        ObjCVarRoutings.mQuantity = Convert.ToString(dr["Quantity"].ToString());
                        ObjCVarRoutings.mContactPerson = Convert.ToString(dr["ContactPerson"].ToString());
                        ObjCVarRoutings.mPickupAddress = Convert.ToString(dr["PickupAddress"].ToString());
                        ObjCVarRoutings.mDeliveryAddress = Convert.ToString(dr["DeliveryAddress"].ToString());
                        ObjCVarRoutings.mGateInPortID = Convert.ToInt32(dr["GateInPortID"].ToString());
                        ObjCVarRoutings.mGateOutPortID = Convert.ToInt32(dr["GateOutPortID"].ToString());
                        ObjCVarRoutings.mGateInDate = Convert.ToDateTime(dr["GateInDate"].ToString());
                        ObjCVarRoutings.mGateOutDate = Convert.ToDateTime(dr["GateOutDate"].ToString());
                        ObjCVarRoutings.mStuffingDate = Convert.ToDateTime(dr["StuffingDate"].ToString());
                        ObjCVarRoutings.mDeliveryDate = Convert.ToDateTime(dr["DeliveryDate"].ToString());
                        ObjCVarRoutings.mBookingNumber = Convert.ToString(dr["BookingNumber"].ToString());
                        ObjCVarRoutings.mDelays = Convert.ToString(dr["Delays"].ToString());
                        ObjCVarRoutings.mPowerFromGateInTillActualSailing = Convert.ToString(dr["PowerFromGateInTillActualSailing"].ToString());
                        ObjCVarRoutings.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarRoutings.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarRoutings.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarRoutings.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarRoutings.mContactPersonPhones = Convert.ToString(dr["ContactPersonPhones"].ToString());
                        ObjCVarRoutings.mLoadingTime = Convert.ToString(dr["LoadingTime"].ToString());
                        ObjCVarRoutings.mCertificateNumber = Convert.ToString(dr["CertificateNumber"].ToString());
                        ObjCVarRoutings.mCertificateValue = Convert.ToString(dr["CertificateValue"].ToString());
                        ObjCVarRoutings.mCertificateDate = Convert.ToDateTime(dr["CertificateDate"].ToString());
                        ObjCVarRoutings.mQasimaNumber = Convert.ToString(dr["QasimaNumber"].ToString());
                        ObjCVarRoutings.mQasimaDate = Convert.ToDateTime(dr["QasimaDate"].ToString());
                        ObjCVarRoutings.mSalesDateReceived = Convert.ToDateTime(dr["SalesDateReceived"].ToString());
                        ObjCVarRoutings.mCommerceDateReceived = Convert.ToDateTime(dr["CommerceDateReceived"].ToString());
                        ObjCVarRoutings.mInspectionDateReceived = Convert.ToDateTime(dr["InspectionDateReceived"].ToString());
                        ObjCVarRoutings.mFinishDateReceived = Convert.ToDateTime(dr["FinishDateReceived"].ToString());
                        ObjCVarRoutings.mSalesDateDelivered = Convert.ToDateTime(dr["SalesDateDelivered"].ToString());
                        ObjCVarRoutings.mCommerceDateDelivered = Convert.ToDateTime(dr["CommerceDateDelivered"].ToString());
                        ObjCVarRoutings.mInspectionDateDelivered = Convert.ToDateTime(dr["InspectionDateDelivered"].ToString());
                        ObjCVarRoutings.mFinishDateDelivered = Convert.ToDateTime(dr["FinishDateDelivered"].ToString());
                        ObjCVarRoutings.mRoadNumber = Convert.ToString(dr["RoadNumber"].ToString());
                        ObjCVarRoutings.mDeliveryOrderNumber = Convert.ToString(dr["DeliveryOrderNumber"].ToString());
                        ObjCVarRoutings.mWareHouse = Convert.ToString(dr["WareHouse"].ToString());
                        ObjCVarRoutings.mWareHouseLocation = Convert.ToString(dr["WareHouseLocation"].ToString());
                        ObjCVarRoutings.mDriverName = Convert.ToString(dr["DriverName"].ToString());
                        ObjCVarRoutings.mDriverPhones = Convert.ToString(dr["DriverPhones"].ToString());
                        ObjCVarRoutings.mIsOwnedByCompany = Convert.ToBoolean(dr["IsOwnedByCompany"].ToString());
                        ObjCVarRoutings.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarRoutings.mDriverID = Convert.ToInt32(dr["DriverID"].ToString());
                        ObjCVarRoutings.mDriverAssistantID = Convert.ToInt32(dr["DriverAssistantID"].ToString());
                        ObjCVarRoutings.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarRoutings.mLoadingZoneID = Convert.ToInt32(dr["LoadingZoneID"].ToString());
                        ObjCVarRoutings.mFirstCuringAreaID = Convert.ToInt32(dr["FirstCuringAreaID"].ToString());
                        ObjCVarRoutings.mSecondCuringAreaID = Convert.ToInt32(dr["SecondCuringAreaID"].ToString());
                        ObjCVarRoutings.mThirdCuringAreaID = Convert.ToInt32(dr["ThirdCuringAreaID"].ToString());
                        ObjCVarRoutings.mBillNumber = Convert.ToString(dr["BillNumber"].ToString());
                        ObjCVarRoutings.mTruckingOrderCode = Convert.ToString(dr["TruckingOrderCode"].ToString());
                        ObjCVarRoutings.mTruckCounter = Convert.ToInt32(dr["TruckCounter"].ToString());
                        ObjCVarRoutings.mCargoReturnGrossWeight = Convert.ToDecimal(dr["CargoReturnGrossWeight"].ToString());
                        ObjCVarRoutings.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarRoutings.mCCAFreight = Convert.ToDecimal(dr["CCAFreight"].ToString());
                        ObjCVarRoutings.mCCAInsurance = Convert.ToString(dr["CCAInsurance"].ToString());
                        ObjCVarRoutings.mCCADischargeValue = Convert.ToString(dr["CCADischargeValue"].ToString());
                        ObjCVarRoutings.mCCAAcceptedValue = Convert.ToString(dr["CCAAcceptedValue"].ToString());
                        ObjCVarRoutings.mCCAImportValue = Convert.ToString(dr["CCAImportValue"].ToString());
                        ObjCVarRoutings.mCCADocumentReceiveDate = Convert.ToDateTime(dr["CCADocumentReceiveDate"].ToString());
                        ObjCVarRoutings.mCCAExchangeRate = Convert.ToString(dr["CCAExchangeRate"].ToString());
                        ObjCVarRoutings.mCCAVATCertificateNumber = Convert.ToString(dr["CCAVATCertificateNumber"].ToString());
                        ObjCVarRoutings.mCCAVATCertificateValue = Convert.ToString(dr["CCAVATCertificateValue"].ToString());
                        ObjCVarRoutings.mCCACommercialProfitCertificateNumber = Convert.ToString(dr["CCACommercialProfitCertificateNumber"].ToString());
                        ObjCVarRoutings.mCCAOthers = Convert.ToString(dr["CCAOthers"].ToString());
                        ObjCVarRoutings.mCCASpendDate = Convert.ToDateTime(dr["CCASpendDate"].ToString());
                        ObjCVarRoutings.mLastTruckCounter = Convert.ToInt32(dr["LastTruckCounter"].ToString());
                        ObjCVarRoutings.mOffloadingDate = Convert.ToDateTime(dr["OffloadingDate"].ToString());
                        ObjCVarRoutings.mMaxSupplierContainers = Convert.ToInt32(dr["MaxSupplierContainers"].ToString());
                        ObjCVarRoutings.mCCAFOB = Convert.ToDecimal(dr["CCAFOB"].ToString());
                        ObjCVarRoutings.mCCACFValue = Convert.ToDecimal(dr["CCACFValue"].ToString());
                        ObjCVarRoutings.mCCAInvoiceNumber = Convert.ToString(dr["CCAInvoiceNumber"].ToString());
                        ObjCVarRoutings.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarRoutings.mSubContractedCustomerID = Convert.ToInt32(dr["SubContractedCustomerID"].ToString());
                        ObjCVarRoutings.mCost = Convert.ToDecimal(dr["Cost"].ToString());
                        ObjCVarRoutings.mSale = Convert.ToDecimal(dr["Sale"].ToString());
                        ObjCVarRoutings.mIsFleet = Convert.ToBoolean(dr["IsFleet"].ToString());
                        ObjCVarRoutings.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarRoutings.mLoadingDate = Convert.ToDateTime(dr["LoadingDate"].ToString());
                        ObjCVarRoutings.mLoadingReference = Convert.ToString(dr["LoadingReference"].ToString());
                        ObjCVarRoutings.mUnloadingDate = Convert.ToDateTime(dr["UnloadingDate"].ToString());
                        ObjCVarRoutings.mUnloadingReference = Convert.ToString(dr["UnloadingReference"].ToString());
                        ObjCVarRoutings.mUnloadingTime = Convert.ToString(dr["UnloadingTime"].ToString());
                        ObjCVarRoutings.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarRoutings.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarRoutings.mCCReleaseNo = Convert.ToString(dr["CCReleaseNo"].ToString());
                        ObjCVarRoutings.mCC_ClearanceTypeID = Convert.ToInt32(dr["CC_ClearanceTypeID"].ToString());
                        ObjCVarRoutings.mCCDropBackDelivered = Convert.ToDateTime(dr["CCDropBackDelivered"].ToString());
                        ObjCVarRoutings.mCCDropBackReceived = Convert.ToDateTime(dr["CCDropBackReceived"].ToString());
                        ObjCVarRoutings.mCCAllowTemporaryDelivered = Convert.ToDateTime(dr["CCAllowTemporaryDelivered"].ToString());
                        ObjCVarRoutings.mCCAllowTemporaryReceived = Convert.ToDateTime(dr["CCAllowTemporaryReceived"].ToString());
                        lstCVarRoutings.Add(ObjCVarRoutings);
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
            lstCVarRoutings.Clear();

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
                Com.CommandText = "[dbo].GetListPagingRoutings";
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
                        CVarRoutingsTAX ObjCVarRoutings = new CVarRoutingsTAX();
                        ObjCVarRoutings.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarRoutings.mRoutingTypeID = Convert.ToInt32(dr["RoutingTypeID"].ToString());
                        ObjCVarRoutings.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarRoutings.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
                        ObjCVarRoutings.mTransportIconName = Convert.ToString(dr["TransportIconName"].ToString());
                        ObjCVarRoutings.mTransportIconStyle = Convert.ToString(dr["TransportIconStyle"].ToString());
                        ObjCVarRoutings.mPOLCountryID = Convert.ToInt32(dr["POLCountryID"].ToString());
                        ObjCVarRoutings.mPOL = Convert.ToInt32(dr["POL"].ToString());
                        ObjCVarRoutings.mPODCountryID = Convert.ToInt32(dr["PODCountryID"].ToString());
                        ObjCVarRoutings.mPOD = Convert.ToInt32(dr["POD"].ToString());
                        ObjCVarRoutings.mETAPOLDate = Convert.ToDateTime(dr["ETAPOLDate"].ToString());
                        ObjCVarRoutings.mATAPOLDate = Convert.ToDateTime(dr["ATAPOLDate"].ToString());
                        ObjCVarRoutings.mExpectedDeparture = Convert.ToDateTime(dr["ExpectedDeparture"].ToString());
                        ObjCVarRoutings.mActualDeparture = Convert.ToDateTime(dr["ActualDeparture"].ToString());
                        ObjCVarRoutings.mExpectedArrival = Convert.ToDateTime(dr["ExpectedArrival"].ToString());
                        ObjCVarRoutings.mActualArrival = Convert.ToDateTime(dr["ActualArrival"].ToString());
                        ObjCVarRoutings.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarRoutings.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarRoutings.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarRoutings.mVesselID = Convert.ToInt32(dr["VesselID"].ToString());
                        ObjCVarRoutings.mVoyageOrTruckNumber = Convert.ToString(dr["VoyageOrTruckNumber"].ToString());
                        ObjCVarRoutings.mTransientTime = Convert.ToInt32(dr["TransientTime"].ToString());
                        ObjCVarRoutings.mValidity = Convert.ToInt32(dr["Validity"].ToString());
                        ObjCVarRoutings.mFreeTime = Convert.ToInt32(dr["FreeTime"].ToString());
                        ObjCVarRoutings.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarRoutings.mGensetSupplierID = Convert.ToInt32(dr["GensetSupplierID"].ToString());
                        ObjCVarRoutings.mCCAID = Convert.ToInt32(dr["CCAID"].ToString());
                        ObjCVarRoutings.mQuantity = Convert.ToString(dr["Quantity"].ToString());
                        ObjCVarRoutings.mContactPerson = Convert.ToString(dr["ContactPerson"].ToString());
                        ObjCVarRoutings.mPickupAddress = Convert.ToString(dr["PickupAddress"].ToString());
                        ObjCVarRoutings.mDeliveryAddress = Convert.ToString(dr["DeliveryAddress"].ToString());
                        ObjCVarRoutings.mGateInPortID = Convert.ToInt32(dr["GateInPortID"].ToString());
                        ObjCVarRoutings.mGateOutPortID = Convert.ToInt32(dr["GateOutPortID"].ToString());
                        ObjCVarRoutings.mGateInDate = Convert.ToDateTime(dr["GateInDate"].ToString());
                        ObjCVarRoutings.mGateOutDate = Convert.ToDateTime(dr["GateOutDate"].ToString());
                        ObjCVarRoutings.mStuffingDate = Convert.ToDateTime(dr["StuffingDate"].ToString());
                        ObjCVarRoutings.mDeliveryDate = Convert.ToDateTime(dr["DeliveryDate"].ToString());
                        ObjCVarRoutings.mBookingNumber = Convert.ToString(dr["BookingNumber"].ToString());
                        ObjCVarRoutings.mDelays = Convert.ToString(dr["Delays"].ToString());
                        ObjCVarRoutings.mPowerFromGateInTillActualSailing = Convert.ToString(dr["PowerFromGateInTillActualSailing"].ToString());
                        ObjCVarRoutings.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarRoutings.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarRoutings.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarRoutings.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarRoutings.mContactPersonPhones = Convert.ToString(dr["ContactPersonPhones"].ToString());
                        ObjCVarRoutings.mLoadingTime = Convert.ToString(dr["LoadingTime"].ToString());
                        ObjCVarRoutings.mCertificateNumber = Convert.ToString(dr["CertificateNumber"].ToString());
                        ObjCVarRoutings.mCertificateValue = Convert.ToString(dr["CertificateValue"].ToString());
                        ObjCVarRoutings.mCertificateDate = Convert.ToDateTime(dr["CertificateDate"].ToString());
                        ObjCVarRoutings.mQasimaNumber = Convert.ToString(dr["QasimaNumber"].ToString());
                        ObjCVarRoutings.mQasimaDate = Convert.ToDateTime(dr["QasimaDate"].ToString());
                        ObjCVarRoutings.mSalesDateReceived = Convert.ToDateTime(dr["SalesDateReceived"].ToString());
                        ObjCVarRoutings.mCommerceDateReceived = Convert.ToDateTime(dr["CommerceDateReceived"].ToString());
                        ObjCVarRoutings.mInspectionDateReceived = Convert.ToDateTime(dr["InspectionDateReceived"].ToString());
                        ObjCVarRoutings.mFinishDateReceived = Convert.ToDateTime(dr["FinishDateReceived"].ToString());
                        ObjCVarRoutings.mSalesDateDelivered = Convert.ToDateTime(dr["SalesDateDelivered"].ToString());
                        ObjCVarRoutings.mCommerceDateDelivered = Convert.ToDateTime(dr["CommerceDateDelivered"].ToString());
                        ObjCVarRoutings.mInspectionDateDelivered = Convert.ToDateTime(dr["InspectionDateDelivered"].ToString());
                        ObjCVarRoutings.mFinishDateDelivered = Convert.ToDateTime(dr["FinishDateDelivered"].ToString());
                        ObjCVarRoutings.mRoadNumber = Convert.ToString(dr["RoadNumber"].ToString());
                        ObjCVarRoutings.mDeliveryOrderNumber = Convert.ToString(dr["DeliveryOrderNumber"].ToString());
                        ObjCVarRoutings.mWareHouse = Convert.ToString(dr["WareHouse"].ToString());
                        ObjCVarRoutings.mWareHouseLocation = Convert.ToString(dr["WareHouseLocation"].ToString());
                        ObjCVarRoutings.mDriverName = Convert.ToString(dr["DriverName"].ToString());
                        ObjCVarRoutings.mDriverPhones = Convert.ToString(dr["DriverPhones"].ToString());
                        ObjCVarRoutings.mIsOwnedByCompany = Convert.ToBoolean(dr["IsOwnedByCompany"].ToString());
                        ObjCVarRoutings.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarRoutings.mDriverID = Convert.ToInt32(dr["DriverID"].ToString());
                        ObjCVarRoutings.mDriverAssistantID = Convert.ToInt32(dr["DriverAssistantID"].ToString());
                        ObjCVarRoutings.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarRoutings.mLoadingZoneID = Convert.ToInt32(dr["LoadingZoneID"].ToString());
                        ObjCVarRoutings.mFirstCuringAreaID = Convert.ToInt32(dr["FirstCuringAreaID"].ToString());
                        ObjCVarRoutings.mSecondCuringAreaID = Convert.ToInt32(dr["SecondCuringAreaID"].ToString());
                        ObjCVarRoutings.mThirdCuringAreaID = Convert.ToInt32(dr["ThirdCuringAreaID"].ToString());
                        ObjCVarRoutings.mBillNumber = Convert.ToString(dr["BillNumber"].ToString());
                        ObjCVarRoutings.mTruckingOrderCode = Convert.ToString(dr["TruckingOrderCode"].ToString());
                        ObjCVarRoutings.mTruckCounter = Convert.ToInt32(dr["TruckCounter"].ToString());
                        ObjCVarRoutings.mCargoReturnGrossWeight = Convert.ToDecimal(dr["CargoReturnGrossWeight"].ToString());
                        ObjCVarRoutings.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarRoutings.mCCAFreight = Convert.ToDecimal(dr["CCAFreight"].ToString());
                        ObjCVarRoutings.mCCAInsurance = Convert.ToString(dr["CCAInsurance"].ToString());
                        ObjCVarRoutings.mCCADischargeValue = Convert.ToString(dr["CCADischargeValue"].ToString());
                        ObjCVarRoutings.mCCAAcceptedValue = Convert.ToString(dr["CCAAcceptedValue"].ToString());
                        ObjCVarRoutings.mCCAImportValue = Convert.ToString(dr["CCAImportValue"].ToString());
                        ObjCVarRoutings.mCCADocumentReceiveDate = Convert.ToDateTime(dr["CCADocumentReceiveDate"].ToString());
                        ObjCVarRoutings.mCCAExchangeRate = Convert.ToString(dr["CCAExchangeRate"].ToString());
                        ObjCVarRoutings.mCCAVATCertificateNumber = Convert.ToString(dr["CCAVATCertificateNumber"].ToString());
                        ObjCVarRoutings.mCCAVATCertificateValue = Convert.ToString(dr["CCAVATCertificateValue"].ToString());
                        ObjCVarRoutings.mCCACommercialProfitCertificateNumber = Convert.ToString(dr["CCACommercialProfitCertificateNumber"].ToString());
                        ObjCVarRoutings.mCCAOthers = Convert.ToString(dr["CCAOthers"].ToString());
                        ObjCVarRoutings.mCCASpendDate = Convert.ToDateTime(dr["CCASpendDate"].ToString());
                        ObjCVarRoutings.mLastTruckCounter = Convert.ToInt32(dr["LastTruckCounter"].ToString());
                        ObjCVarRoutings.mOffloadingDate = Convert.ToDateTime(dr["OffloadingDate"].ToString());
                        ObjCVarRoutings.mMaxSupplierContainers = Convert.ToInt32(dr["MaxSupplierContainers"].ToString());
                        ObjCVarRoutings.mCCAFOB = Convert.ToDecimal(dr["CCAFOB"].ToString());
                        ObjCVarRoutings.mCCACFValue = Convert.ToDecimal(dr["CCACFValue"].ToString());
                        ObjCVarRoutings.mCCAInvoiceNumber = Convert.ToString(dr["CCAInvoiceNumber"].ToString());
                        ObjCVarRoutings.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarRoutings.mSubContractedCustomerID = Convert.ToInt32(dr["SubContractedCustomerID"].ToString());
                        ObjCVarRoutings.mCost = Convert.ToDecimal(dr["Cost"].ToString());
                        ObjCVarRoutings.mSale = Convert.ToDecimal(dr["Sale"].ToString());
                        ObjCVarRoutings.mIsFleet = Convert.ToBoolean(dr["IsFleet"].ToString());
                        ObjCVarRoutings.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarRoutings.mLoadingDate = Convert.ToDateTime(dr["LoadingDate"].ToString());
                        ObjCVarRoutings.mLoadingReference = Convert.ToString(dr["LoadingReference"].ToString());
                        ObjCVarRoutings.mUnloadingDate = Convert.ToDateTime(dr["UnloadingDate"].ToString());
                        ObjCVarRoutings.mUnloadingReference = Convert.ToString(dr["UnloadingReference"].ToString());
                        ObjCVarRoutings.mUnloadingTime = Convert.ToString(dr["UnloadingTime"].ToString());
                        ObjCVarRoutings.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarRoutings.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarRoutings.mCCReleaseNo = Convert.ToString(dr["CCReleaseNo"].ToString());
                        ObjCVarRoutings.mCC_ClearanceTypeID = Convert.ToInt32(dr["CC_ClearanceTypeID"].ToString());
                        ObjCVarRoutings.mCCDropBackDelivered = Convert.ToDateTime(dr["CCDropBackDelivered"].ToString());
                        ObjCVarRoutings.mCCDropBackReceived = Convert.ToDateTime(dr["CCDropBackReceived"].ToString());
                        ObjCVarRoutings.mCCAllowTemporaryDelivered = Convert.ToDateTime(dr["CCAllowTemporaryDelivered"].ToString());
                        ObjCVarRoutings.mCCAllowTemporaryReceived = Convert.ToDateTime(dr["CCAllowTemporaryReceived"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarRoutings.Add(ObjCVarRoutings);
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
                    Com.CommandText = "[dbo].DeleteListRoutings";
                else
                    Com.CommandText = "[dbo].UpdateListRoutings";
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
        public Exception DeleteItem(List<CPKRoutingsTAX> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemRoutings";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKRoutingsTAX ObjCPKRoutings in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKRoutings.ID);
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
        public Exception SaveMethod(List<CVarRoutingsTAX> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@RoutingTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@TransportType", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TransportIconName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TransportIconStyle", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@POLCountryID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@POL", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PODCountryID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@POD", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ETAPOLDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ATAPOLDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ExpectedDeparture", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ActualDeparture", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ExpectedArrival", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ActualArrival", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ShippingLineID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AirlineID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TruckerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@VesselID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@VoyageOrTruckNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TransientTime", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Validity", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@FreeTime", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@GensetSupplierID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CCAID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Quantity", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ContactPerson", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PickupAddress", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DeliveryAddress", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@GateInPortID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@GateOutPortID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@GateInDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@GateOutDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@StuffingDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@DeliveryDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@BookingNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Delays", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PowerFromGateInTillActualSailing", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ContactPersonPhones", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LoadingTime", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CertificateNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CertificateValue", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CertificateDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@QasimaNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@QasimaDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@SalesDateReceived", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CommerceDateReceived", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@InspectionDateReceived", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@FinishDateReceived", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@SalesDateDelivered", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CommerceDateDelivered", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@InspectionDateDelivered", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@FinishDateDelivered", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@RoadNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DeliveryOrderNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@WareHouse", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@WareHouseLocation", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DriverName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DriverPhones", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsOwnedByCompany", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@TrailerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DriverID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DriverAssistantID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EquipmentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@LoadingZoneID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@FirstCuringAreaID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SecondCuringAreaID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ThirdCuringAreaID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@BillNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TruckingOrderCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TruckCounter", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CargoReturnGrossWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@IsApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CCAFreight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CCAInsurance", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CCADischargeValue", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CCAAcceptedValue", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CCAImportValue", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CCADocumentReceiveDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CCAExchangeRate", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CCAVATCertificateNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CCAVATCertificateValue", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CCACommercialProfitCertificateNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CCAOthers", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CCASpendDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LastTruckCounter", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OffloadingDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@MaxSupplierContainers", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CCAFOB", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CCACFValue", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CCAInvoiceNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CustomerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubContractedCustomerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Cost", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Sale", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@IsFleet", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CommodityID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@LoadingDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LoadingReference", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@UnloadingDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@UnloadingReference", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@UnloadingTime", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@QuotationRouteID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@InvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@CCReleaseNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CC_ClearanceTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CCDropBackDelivered", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CCDropBackReceived", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CCAllowTemporaryDelivered", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CCAllowTemporaryReceived", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarRoutingsTAX ObjCVarRoutings in SaveList)
                {
                    if (ObjCVarRoutings.mIsChanges == true)
                    {
                        if (ObjCVarRoutings.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemRoutingsTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarRoutings.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemRoutingsTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarRoutings.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarRoutings.ID;
                        }
                        Com.Parameters["@RoutingTypeID"].Value = ObjCVarRoutings.RoutingTypeID;
                        Com.Parameters["@OperationID"].Value = ObjCVarRoutings.OperationID;
                        Com.Parameters["@TransportType"].Value = ObjCVarRoutings.TransportType;
                        Com.Parameters["@TransportIconName"].Value = ObjCVarRoutings.TransportIconName;
                        Com.Parameters["@TransportIconStyle"].Value = ObjCVarRoutings.TransportIconStyle;
                        Com.Parameters["@POLCountryID"].Value = ObjCVarRoutings.POLCountryID;
                        Com.Parameters["@POL"].Value = ObjCVarRoutings.POL;
                        Com.Parameters["@PODCountryID"].Value = ObjCVarRoutings.PODCountryID;
                        Com.Parameters["@POD"].Value = ObjCVarRoutings.POD;
                        Com.Parameters["@ETAPOLDate"].Value = ObjCVarRoutings.ETAPOLDate;
                        Com.Parameters["@ATAPOLDate"].Value = ObjCVarRoutings.ATAPOLDate;
                        Com.Parameters["@ExpectedDeparture"].Value = ObjCVarRoutings.ExpectedDeparture;
                        Com.Parameters["@ActualDeparture"].Value = ObjCVarRoutings.ActualDeparture;
                        Com.Parameters["@ExpectedArrival"].Value = ObjCVarRoutings.ExpectedArrival;
                        Com.Parameters["@ActualArrival"].Value = ObjCVarRoutings.ActualArrival;
                        Com.Parameters["@ShippingLineID"].Value = ObjCVarRoutings.ShippingLineID;
                        Com.Parameters["@AirlineID"].Value = ObjCVarRoutings.AirlineID;
                        Com.Parameters["@TruckerID"].Value = ObjCVarRoutings.TruckerID;
                        Com.Parameters["@VesselID"].Value = ObjCVarRoutings.VesselID;
                        Com.Parameters["@VoyageOrTruckNumber"].Value = ObjCVarRoutings.VoyageOrTruckNumber;
                        Com.Parameters["@TransientTime"].Value = ObjCVarRoutings.TransientTime;
                        Com.Parameters["@Validity"].Value = ObjCVarRoutings.Validity;
                        Com.Parameters["@FreeTime"].Value = ObjCVarRoutings.FreeTime;
                        Com.Parameters["@Notes"].Value = ObjCVarRoutings.Notes;
                        Com.Parameters["@GensetSupplierID"].Value = ObjCVarRoutings.GensetSupplierID;
                        Com.Parameters["@CCAID"].Value = ObjCVarRoutings.CCAID;
                        Com.Parameters["@Quantity"].Value = ObjCVarRoutings.Quantity;
                        Com.Parameters["@ContactPerson"].Value = ObjCVarRoutings.ContactPerson;
                        Com.Parameters["@PickupAddress"].Value = ObjCVarRoutings.PickupAddress;
                        Com.Parameters["@DeliveryAddress"].Value = ObjCVarRoutings.DeliveryAddress;
                        Com.Parameters["@GateInPortID"].Value = ObjCVarRoutings.GateInPortID;
                        Com.Parameters["@GateOutPortID"].Value = ObjCVarRoutings.GateOutPortID;
                        Com.Parameters["@GateInDate"].Value = ObjCVarRoutings.GateInDate;
                        Com.Parameters["@GateOutDate"].Value = ObjCVarRoutings.GateOutDate;
                        Com.Parameters["@StuffingDate"].Value = ObjCVarRoutings.StuffingDate;
                        Com.Parameters["@DeliveryDate"].Value = ObjCVarRoutings.DeliveryDate;
                        Com.Parameters["@BookingNumber"].Value = ObjCVarRoutings.BookingNumber;
                        Com.Parameters["@Delays"].Value = ObjCVarRoutings.Delays;
                        Com.Parameters["@PowerFromGateInTillActualSailing"].Value = ObjCVarRoutings.PowerFromGateInTillActualSailing;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarRoutings.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarRoutings.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarRoutings.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarRoutings.ModificationDate;
                        Com.Parameters["@ContactPersonPhones"].Value = ObjCVarRoutings.ContactPersonPhones;
                        Com.Parameters["@LoadingTime"].Value = ObjCVarRoutings.LoadingTime;
                        Com.Parameters["@CertificateNumber"].Value = ObjCVarRoutings.CertificateNumber;
                        Com.Parameters["@CertificateValue"].Value = ObjCVarRoutings.CertificateValue;
                        Com.Parameters["@CertificateDate"].Value = ObjCVarRoutings.CertificateDate;
                        Com.Parameters["@QasimaNumber"].Value = ObjCVarRoutings.QasimaNumber;
                        Com.Parameters["@QasimaDate"].Value = ObjCVarRoutings.QasimaDate;
                        Com.Parameters["@SalesDateReceived"].Value = ObjCVarRoutings.SalesDateReceived;
                        Com.Parameters["@CommerceDateReceived"].Value = ObjCVarRoutings.CommerceDateReceived;
                        Com.Parameters["@InspectionDateReceived"].Value = ObjCVarRoutings.InspectionDateReceived;
                        Com.Parameters["@FinishDateReceived"].Value = ObjCVarRoutings.FinishDateReceived;
                        Com.Parameters["@SalesDateDelivered"].Value = ObjCVarRoutings.SalesDateDelivered;
                        Com.Parameters["@CommerceDateDelivered"].Value = ObjCVarRoutings.CommerceDateDelivered;
                        Com.Parameters["@InspectionDateDelivered"].Value = ObjCVarRoutings.InspectionDateDelivered;
                        Com.Parameters["@FinishDateDelivered"].Value = ObjCVarRoutings.FinishDateDelivered;
                        Com.Parameters["@RoadNumber"].Value = ObjCVarRoutings.RoadNumber;
                        Com.Parameters["@DeliveryOrderNumber"].Value = ObjCVarRoutings.DeliveryOrderNumber;
                        Com.Parameters["@WareHouse"].Value = ObjCVarRoutings.WareHouse;
                        Com.Parameters["@WareHouseLocation"].Value = ObjCVarRoutings.WareHouseLocation;
                        Com.Parameters["@DriverName"].Value = ObjCVarRoutings.DriverName;
                        Com.Parameters["@DriverPhones"].Value = ObjCVarRoutings.DriverPhones;
                        Com.Parameters["@IsOwnedByCompany"].Value = ObjCVarRoutings.IsOwnedByCompany;
                        Com.Parameters["@TrailerID"].Value = ObjCVarRoutings.TrailerID;
                        Com.Parameters["@DriverID"].Value = ObjCVarRoutings.DriverID;
                        Com.Parameters["@DriverAssistantID"].Value = ObjCVarRoutings.DriverAssistantID;
                        Com.Parameters["@EquipmentID"].Value = ObjCVarRoutings.EquipmentID;
                        Com.Parameters["@LoadingZoneID"].Value = ObjCVarRoutings.LoadingZoneID;
                        Com.Parameters["@FirstCuringAreaID"].Value = ObjCVarRoutings.FirstCuringAreaID;
                        Com.Parameters["@SecondCuringAreaID"].Value = ObjCVarRoutings.SecondCuringAreaID;
                        Com.Parameters["@ThirdCuringAreaID"].Value = ObjCVarRoutings.ThirdCuringAreaID;
                        Com.Parameters["@BillNumber"].Value = ObjCVarRoutings.BillNumber;
                        Com.Parameters["@TruckingOrderCode"].Value = ObjCVarRoutings.TruckingOrderCode;
                        Com.Parameters["@TruckCounter"].Value = ObjCVarRoutings.TruckCounter;
                        Com.Parameters["@CargoReturnGrossWeight"].Value = ObjCVarRoutings.CargoReturnGrossWeight;
                        Com.Parameters["@IsApproved"].Value = ObjCVarRoutings.IsApproved;
                        Com.Parameters["@CCAFreight"].Value = ObjCVarRoutings.CCAFreight;
                        Com.Parameters["@CCAInsurance"].Value = ObjCVarRoutings.CCAInsurance;
                        Com.Parameters["@CCADischargeValue"].Value = ObjCVarRoutings.CCADischargeValue;
                        Com.Parameters["@CCAAcceptedValue"].Value = ObjCVarRoutings.CCAAcceptedValue;
                        Com.Parameters["@CCAImportValue"].Value = ObjCVarRoutings.CCAImportValue;
                        Com.Parameters["@CCADocumentReceiveDate"].Value = ObjCVarRoutings.CCADocumentReceiveDate;
                        Com.Parameters["@CCAExchangeRate"].Value = ObjCVarRoutings.CCAExchangeRate;
                        Com.Parameters["@CCAVATCertificateNumber"].Value = ObjCVarRoutings.CCAVATCertificateNumber;
                        Com.Parameters["@CCAVATCertificateValue"].Value = ObjCVarRoutings.CCAVATCertificateValue;
                        Com.Parameters["@CCACommercialProfitCertificateNumber"].Value = ObjCVarRoutings.CCACommercialProfitCertificateNumber;
                        Com.Parameters["@CCAOthers"].Value = ObjCVarRoutings.CCAOthers;
                        Com.Parameters["@CCASpendDate"].Value = ObjCVarRoutings.CCASpendDate;
                        Com.Parameters["@LastTruckCounter"].Value = ObjCVarRoutings.LastTruckCounter;
                        Com.Parameters["@OffloadingDate"].Value = ObjCVarRoutings.OffloadingDate;
                        Com.Parameters["@MaxSupplierContainers"].Value = ObjCVarRoutings.MaxSupplierContainers;
                        Com.Parameters["@CCAFOB"].Value = ObjCVarRoutings.CCAFOB;
                        Com.Parameters["@CCACFValue"].Value = ObjCVarRoutings.CCACFValue;
                        Com.Parameters["@CCAInvoiceNumber"].Value = ObjCVarRoutings.CCAInvoiceNumber;
                        Com.Parameters["@CustomerID"].Value = ObjCVarRoutings.CustomerID;
                        Com.Parameters["@SubContractedCustomerID"].Value = ObjCVarRoutings.SubContractedCustomerID;
                        Com.Parameters["@Cost"].Value = ObjCVarRoutings.Cost;
                        Com.Parameters["@Sale"].Value = ObjCVarRoutings.Sale;
                        Com.Parameters["@IsFleet"].Value = ObjCVarRoutings.IsFleet;
                        Com.Parameters["@CommodityID"].Value = ObjCVarRoutings.CommodityID;
                        Com.Parameters["@LoadingDate"].Value = ObjCVarRoutings.LoadingDate;
                        Com.Parameters["@LoadingReference"].Value = ObjCVarRoutings.LoadingReference;
                        Com.Parameters["@UnloadingDate"].Value = ObjCVarRoutings.UnloadingDate;
                        Com.Parameters["@UnloadingReference"].Value = ObjCVarRoutings.UnloadingReference;
                        Com.Parameters["@UnloadingTime"].Value = ObjCVarRoutings.UnloadingTime;
                        Com.Parameters["@QuotationRouteID"].Value = ObjCVarRoutings.QuotationRouteID;
                        Com.Parameters["@InvoiceID"].Value = ObjCVarRoutings.InvoiceID;
                        Com.Parameters["@CCReleaseNo"].Value = ObjCVarRoutings.CCReleaseNo;
                        Com.Parameters["@CC_ClearanceTypeID"].Value = ObjCVarRoutings.CC_ClearanceTypeID;
                        Com.Parameters["@CCDropBackDelivered"].Value = ObjCVarRoutings.CCDropBackDelivered;
                        Com.Parameters["@CCDropBackReceived"].Value = ObjCVarRoutings.CCDropBackReceived;
                        Com.Parameters["@CCAllowTemporaryDelivered"].Value = ObjCVarRoutings.CCAllowTemporaryDelivered;
                        Com.Parameters["@CCAllowTemporaryReceived"].Value = ObjCVarRoutings.CCAllowTemporaryReceived;
                        EndTrans(Com, Con);
                        if (ObjCVarRoutings.ID == 0)
                        {
                            ObjCVarRoutings.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarRoutings.mIsChanges = false;
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
