using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Station.ST_Transactions.Generated
{
    [Serializable]
    public partial class CVarvwpreGateinvwOperationContainersAndPackages
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Int64 mOperationID;
        internal Int32 mContainerTypeID;
        internal Int32 mPackageTypeID;
        internal Decimal mLength;
        internal Decimal mWidth;
        internal Decimal mHeight;
        internal Decimal mVolume;
        internal Decimal mVolumetricWeight;
        internal Decimal mNetWeight;
        internal Decimal mNetWeightTON;
        internal Decimal mGrossWeight;
        internal Decimal mGrossWeightTON;
        internal Decimal mVGM;
        internal Decimal mChargeableWeight;
        internal Int32 mQuantity;
        internal String mLotNumber;
        internal String mContainerNumber;
        internal String mCarrierSeal;
        internal String mShipperSeal;
        internal Decimal mTareWeight;
        internal Boolean mIsReefer;
        internal Decimal mMinTemp;
        internal Decimal mMaxTemp;
        internal Decimal mVentilation;
        internal Decimal mHumidity;
        internal Boolean mIsNOR;
        internal Boolean mIsIMO;
        internal Decimal mIMOClass;
        internal Int32 mUNNumber;
        internal Decimal mFlashPoint;
        internal String mMarksAndNumbers;
        internal String mDescriptionOfGoods;
        internal Int32 mNumberOfPackagesOnContainer;
        internal Int32 mPackageTypeIDOnContainer;
        internal String mPackageTypeNameOnContainer;
        internal Int64 mPurchaseItemID;
        internal String mPurchaseItemName;
        internal String mContainerTypeCode;
        internal String mContainerTypeName;
        internal String mPackageTypeCode;
        internal String mPackageTypeName;
        internal Int32 mDirectionType;
        internal Int32 mTransportType;
        internal Int32 mShipmentType;
        internal Int64 mHouseOperationID;
        internal Int64 mPlacedOnOCPID;
        internal String mConsolContainerNumber;
        internal Int64 mMasterOperationID;
        internal String mMasterOperationCode;
        internal String mHouseOperationCode;
        internal String mOperationCode;
        internal Int32 mPOLID;
        internal Int32 mGateOutPortID;
        internal String mGateOutPortName;
        internal Int32 mGateInPortID;
        internal String mGateInPortName;
        internal DateTime mGateOutDate;
        internal DateTime mStuffingDate;
        internal DateTime mLoadingDate;
        internal Int32 mGateOutAndLoadingDatesDifference;
        internal String mFactory;
        internal String mExportBLNumber;
        internal String mImportBLNumber;
        internal Boolean mIsLoaded;
        internal Boolean mIsTracked;
        internal String mTankOrFlexiNumber;
        internal Int32 mOperatorID;
        internal Int32 mShipperID;
        internal String mShipperName;
        internal String mShipperLocalName;
        internal Int32 mShippingLineID;
        internal String mShippingLineName;
        internal Int32 mBookingPartyID;
        internal String mBookingPartyName;
        internal String mExtraPackagesTotalRepeatedInEachRowForOperation;
        internal String mExtraPackages;
        internal Decimal mRate;
        internal Boolean mIsAsAgreed;
        internal Boolean mIsMinimum;
        internal String mWeightUnit;
        internal String mRateClass;
        internal Boolean mIsOwnedByCompany;
        internal Int32 mTrailerID;
        internal Int32 mDriverID;
        internal Int32 mDriverAssistantID;
        internal String mTrailerName;
        internal String mDriverName;
        internal String mDriverAssistantName;
        internal Boolean mIsFull;
        internal DateTime mExitDate;
        internal DateTime mReturnDate;
        internal Int32 mFreeDays;
        internal Decimal mDayValue;
        internal Int32 mYardEIRNumber;
        internal Int32 mYardEIRNumberOut;
        internal DateTime mYardInDate;
        internal Int32 mYardInTime;
        internal DateTime mYardOutDate;
        internal Int32 mYardOutTime;
        internal Int32 mYardLocationID;
        internal String mLocationCode;
        internal Int32 mYardIsIn;
        internal String mBookingNumber;
        internal Boolean mIsSentToWarehouse;
        internal String mContainerSizeCode;
        internal Int32 mContainerSizeID;
        internal String mDriver;
        internal String mTruckNumber;
        internal Int64 mContainerID;
        internal Int32 mConsigneeID;
        internal String mConsigneeName;
        internal String mDriverNumber;
        internal String mPO;
        internal Int32 mIsApproved;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public Int32 ContainerTypeID
        {
            get { return mContainerTypeID; }
            set { mContainerTypeID = value; }
        }
        public Int32 PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mPackageTypeID = value; }
        }
        public Decimal Length
        {
            get { return mLength; }
            set { mLength = value; }
        }
        public Decimal Width
        {
            get { return mWidth; }
            set { mWidth = value; }
        }
        public Decimal Height
        {
            get { return mHeight; }
            set { mHeight = value; }
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
        public Decimal NetWeight
        {
            get { return mNetWeight; }
            set { mNetWeight = value; }
        }
        public Decimal NetWeightTON
        {
            get { return mNetWeightTON; }
            set { mNetWeightTON = value; }
        }
        public Decimal GrossWeight
        {
            get { return mGrossWeight; }
            set { mGrossWeight = value; }
        }
        public Decimal GrossWeightTON
        {
            get { return mGrossWeightTON; }
            set { mGrossWeightTON = value; }
        }
        public Decimal VGM
        {
            get { return mVGM; }
            set { mVGM = value; }
        }
        public Decimal ChargeableWeight
        {
            get { return mChargeableWeight; }
            set { mChargeableWeight = value; }
        }
        public Int32 Quantity
        {
            get { return mQuantity; }
            set { mQuantity = value; }
        }
        public String LotNumber
        {
            get { return mLotNumber; }
            set { mLotNumber = value; }
        }
        public String ContainerNumber
        {
            get { return mContainerNumber; }
            set { mContainerNumber = value; }
        }
        public String CarrierSeal
        {
            get { return mCarrierSeal; }
            set { mCarrierSeal = value; }
        }
        public String ShipperSeal
        {
            get { return mShipperSeal; }
            set { mShipperSeal = value; }
        }
        public Decimal TareWeight
        {
            get { return mTareWeight; }
            set { mTareWeight = value; }
        }
        public Boolean IsReefer
        {
            get { return mIsReefer; }
            set { mIsReefer = value; }
        }
        public Decimal MinTemp
        {
            get { return mMinTemp; }
            set { mMinTemp = value; }
        }
        public Decimal MaxTemp
        {
            get { return mMaxTemp; }
            set { mMaxTemp = value; }
        }
        public Decimal Ventilation
        {
            get { return mVentilation; }
            set { mVentilation = value; }
        }
        public Decimal Humidity
        {
            get { return mHumidity; }
            set { mHumidity = value; }
        }
        public Boolean IsNOR
        {
            get { return mIsNOR; }
            set { mIsNOR = value; }
        }
        public Boolean IsIMO
        {
            get { return mIsIMO; }
            set { mIsIMO = value; }
        }
        public Decimal IMOClass
        {
            get { return mIMOClass; }
            set { mIMOClass = value; }
        }
        public Int32 UNNumber
        {
            get { return mUNNumber; }
            set { mUNNumber = value; }
        }
        public Decimal FlashPoint
        {
            get { return mFlashPoint; }
            set { mFlashPoint = value; }
        }
        public String MarksAndNumbers
        {
            get { return mMarksAndNumbers; }
            set { mMarksAndNumbers = value; }
        }
        public String DescriptionOfGoods
        {
            get { return mDescriptionOfGoods; }
            set { mDescriptionOfGoods = value; }
        }
        public Int32 NumberOfPackagesOnContainer
        {
            get { return mNumberOfPackagesOnContainer; }
            set { mNumberOfPackagesOnContainer = value; }
        }
        public Int32 PackageTypeIDOnContainer
        {
            get { return mPackageTypeIDOnContainer; }
            set { mPackageTypeIDOnContainer = value; }
        }
        public String PackageTypeNameOnContainer
        {
            get { return mPackageTypeNameOnContainer; }
            set { mPackageTypeNameOnContainer = value; }
        }
        public Int64 PurchaseItemID
        {
            get { return mPurchaseItemID; }
            set { mPurchaseItemID = value; }
        }
        public String PurchaseItemName
        {
            get { return mPurchaseItemName; }
            set { mPurchaseItemName = value; }
        }
        public String ContainerTypeCode
        {
            get { return mContainerTypeCode; }
            set { mContainerTypeCode = value; }
        }
        public String ContainerTypeName
        {
            get { return mContainerTypeName; }
            set { mContainerTypeName = value; }
        }
        public String PackageTypeCode
        {
            get { return mPackageTypeCode; }
            set { mPackageTypeCode = value; }
        }
        public String PackageTypeName
        {
            get { return mPackageTypeName; }
            set { mPackageTypeName = value; }
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
        public Int32 ShipmentType
        {
            get { return mShipmentType; }
            set { mShipmentType = value; }
        }
        public Int64 HouseOperationID
        {
            get { return mHouseOperationID; }
            set { mHouseOperationID = value; }
        }
        public Int64 PlacedOnOCPID
        {
            get { return mPlacedOnOCPID; }
            set { mPlacedOnOCPID = value; }
        }
        public String ConsolContainerNumber
        {
            get { return mConsolContainerNumber; }
            set { mConsolContainerNumber = value; }
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
        public String HouseOperationCode
        {
            get { return mHouseOperationCode; }
            set { mHouseOperationCode = value; }
        }
        public String OperationCode
        {
            get { return mOperationCode; }
            set { mOperationCode = value; }
        }
        public Int32 POLID
        {
            get { return mPOLID; }
            set { mPOLID = value; }
        }
        public Int32 GateOutPortID
        {
            get { return mGateOutPortID; }
            set { mGateOutPortID = value; }
        }
        public String GateOutPortName
        {
            get { return mGateOutPortName; }
            set { mGateOutPortName = value; }
        }
        public Int32 GateInPortID
        {
            get { return mGateInPortID; }
            set { mGateInPortID = value; }
        }
        public String GateInPortName
        {
            get { return mGateInPortName; }
            set { mGateInPortName = value; }
        }
        public DateTime GateOutDate
        {
            get { return mGateOutDate; }
            set { mGateOutDate = value; }
        }
        public DateTime StuffingDate
        {
            get { return mStuffingDate; }
            set { mStuffingDate = value; }
        }
        public DateTime LoadingDate
        {
            get { return mLoadingDate; }
            set { mLoadingDate = value; }
        }
        public Int32 GateOutAndLoadingDatesDifference
        {
            get { return mGateOutAndLoadingDatesDifference; }
            set { mGateOutAndLoadingDatesDifference = value; }
        }
        public String Factory
        {
            get { return mFactory; }
            set { mFactory = value; }
        }
        public String ExportBLNumber
        {
            get { return mExportBLNumber; }
            set { mExportBLNumber = value; }
        }
        public String ImportBLNumber
        {
            get { return mImportBLNumber; }
            set { mImportBLNumber = value; }
        }
        public Boolean IsLoaded
        {
            get { return mIsLoaded; }
            set { mIsLoaded = value; }
        }
        public Boolean IsTracked
        {
            get { return mIsTracked; }
            set { mIsTracked = value; }
        }
        public String TankOrFlexiNumber
        {
            get { return mTankOrFlexiNumber; }
            set { mTankOrFlexiNumber = value; }
        }
        public Int32 OperatorID
        {
            get { return mOperatorID; }
            set { mOperatorID = value; }
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
        public String ShipperLocalName
        {
            get { return mShipperLocalName; }
            set { mShipperLocalName = value; }
        }
        public Int32 ShippingLineID
        {
            get { return mShippingLineID; }
            set { mShippingLineID = value; }
        }
        public String ShippingLineName
        {
            get { return mShippingLineName; }
            set { mShippingLineName = value; }
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
        public String ExtraPackagesTotalRepeatedInEachRowForOperation
        {
            get { return mExtraPackagesTotalRepeatedInEachRowForOperation; }
            set { mExtraPackagesTotalRepeatedInEachRowForOperation = value; }
        }
        public String ExtraPackages
        {
            get { return mExtraPackages; }
            set { mExtraPackages = value; }
        }
        public Decimal Rate
        {
            get { return mRate; }
            set { mRate = value; }
        }
        public Boolean IsAsAgreed
        {
            get { return mIsAsAgreed; }
            set { mIsAsAgreed = value; }
        }
        public Boolean IsMinimum
        {
            get { return mIsMinimum; }
            set { mIsMinimum = value; }
        }
        public String WeightUnit
        {
            get { return mWeightUnit; }
            set { mWeightUnit = value; }
        }
        public String RateClass
        {
            get { return mRateClass; }
            set { mRateClass = value; }
        }
        public Boolean IsOwnedByCompany
        {
            get { return mIsOwnedByCompany; }
            set { mIsOwnedByCompany = value; }
        }
        public Int32 TrailerID
        {
            get { return mTrailerID; }
            set { mTrailerID = value; }
        }
        public Int32 DriverID
        {
            get { return mDriverID; }
            set { mDriverID = value; }
        }
        public Int32 DriverAssistantID
        {
            get { return mDriverAssistantID; }
            set { mDriverAssistantID = value; }
        }
        public String TrailerName
        {
            get { return mTrailerName; }
            set { mTrailerName = value; }
        }
        public String DriverName
        {
            get { return mDriverName; }
            set { mDriverName = value; }
        }
        public String DriverAssistantName
        {
            get { return mDriverAssistantName; }
            set { mDriverAssistantName = value; }
        }
        public Boolean IsFull
        {
            get { return mIsFull; }
            set { mIsFull = value; }
        }
        public DateTime ExitDate
        {
            get { return mExitDate; }
            set { mExitDate = value; }
        }
        public DateTime ReturnDate
        {
            get { return mReturnDate; }
            set { mReturnDate = value; }
        }
        public Int32 FreeDays
        {
            get { return mFreeDays; }
            set { mFreeDays = value; }
        }
        public Decimal DayValue
        {
            get { return mDayValue; }
            set { mDayValue = value; }
        }
        public Int32 YardEIRNumber
        {
            get { return mYardEIRNumber; }
            set { mYardEIRNumber = value; }
        }
        public Int32 YardEIRNumberOut
        {
            get { return mYardEIRNumberOut; }
            set { mYardEIRNumberOut = value; }
        }
        public DateTime YardInDate
        {
            get { return mYardInDate; }
            set { mYardInDate = value; }
        }
        public Int32 YardInTime
        {
            get { return mYardInTime; }
            set { mYardInTime = value; }
        }
        public DateTime YardOutDate
        {
            get { return mYardOutDate; }
            set { mYardOutDate = value; }
        }
        public Int32 YardOutTime
        {
            get { return mYardOutTime; }
            set { mYardOutTime = value; }
        }
        public Int32 YardLocationID
        {
            get { return mYardLocationID; }
            set { mYardLocationID = value; }
        }
        public String LocationCode
        {
            get { return mLocationCode; }
            set { mLocationCode = value; }
        }
        public Int32 YardIsIn
        {
            get { return mYardIsIn; }
            set { mYardIsIn = value; }
        }
        public String BookingNumber
        {
            get { return mBookingNumber; }
            set { mBookingNumber = value; }
        }
        public Boolean IsSentToWarehouse
        {
            get { return mIsSentToWarehouse; }
            set { mIsSentToWarehouse = value; }
        }
        public String ContainerSizeCode
        {
            get { return mContainerSizeCode; }
            set { mContainerSizeCode = value; }
        }
        public Int32 ContainerSizeID
        {
            get { return mContainerSizeID; }
            set { mContainerSizeID = value; }
        }
        public String Driver
        {
            get { return mDriver; }
            set { mDriver = value; }
        }
        public String TruckNumber
        {
            get { return mTruckNumber; }
            set { mTruckNumber = value; }
        }
        public Int64 ContainerID
        {
            get { return mContainerID; }
            set { mContainerID = value; }
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
        public String DriverNumber
        {
            get { return mDriverNumber; }
            set { mDriverNumber = value; }
        }
        public String PO
        {
            get { return mPO; }
            set { mPO = value; }
        }
        public Int32 IsApproved
        {
            get { return mIsApproved; }
            set { mIsApproved = value; }
        }
        #endregion
    }

    public partial class CvwpreGateinvwOperationContainersAndPackages
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
        public List<CVarvwpreGateinvwOperationContainersAndPackages> lstCVarvwpreGateinvwOperationContainersAndPackages = new List<CVarvwpreGateinvwOperationContainersAndPackages>();
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
            lstCVarvwpreGateinvwOperationContainersAndPackages.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwpreGateinvwOperationContainersAndPackages";
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
                        CVarvwpreGateinvwOperationContainersAndPackages ObjCVarvwpreGateinvwOperationContainersAndPackages = new CVarvwpreGateinvwOperationContainersAndPackages();
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mLength = Convert.ToDecimal(dr["Length"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mVolumetricWeight = Convert.ToDecimal(dr["VolumetricWeight"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mNetWeightTON = Convert.ToDecimal(dr["NetWeightTON"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mGrossWeightTON = Convert.ToDecimal(dr["GrossWeightTON"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mVGM = Convert.ToDecimal(dr["VGM"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mQuantity = Convert.ToInt32(dr["Quantity"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mLotNumber = Convert.ToString(dr["LotNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mCarrierSeal = Convert.ToString(dr["CarrierSeal"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mShipperSeal = Convert.ToString(dr["ShipperSeal"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mTareWeight = Convert.ToDecimal(dr["TareWeight"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsReefer = Convert.ToBoolean(dr["IsReefer"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mMinTemp = Convert.ToDecimal(dr["MinTemp"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mMaxTemp = Convert.ToDecimal(dr["MaxTemp"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mVentilation = Convert.ToDecimal(dr["Ventilation"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mHumidity = Convert.ToDecimal(dr["Humidity"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsNOR = Convert.ToBoolean(dr["IsNOR"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsIMO = Convert.ToBoolean(dr["IsIMO"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIMOClass = Convert.ToDecimal(dr["IMOClass"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mUNNumber = Convert.ToInt32(dr["UNNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mFlashPoint = Convert.ToDecimal(dr["FlashPoint"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mMarksAndNumbers = Convert.ToString(dr["MarksAndNumbers"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mDescriptionOfGoods = Convert.ToString(dr["DescriptionOfGoods"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mNumberOfPackagesOnContainer = Convert.ToInt32(dr["NumberOfPackagesOnContainer"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPackageTypeIDOnContainer = Convert.ToInt32(dr["PackageTypeIDOnContainer"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPackageTypeNameOnContainer = Convert.ToString(dr["PackageTypeNameOnContainer"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mContainerTypeCode = Convert.ToString(dr["ContainerTypeCode"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mContainerTypeName = Convert.ToString(dr["ContainerTypeName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPackageTypeCode = Convert.ToString(dr["PackageTypeCode"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mShipmentType = Convert.ToInt32(dr["ShipmentType"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mHouseOperationID = Convert.ToInt64(dr["HouseOperationID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPlacedOnOCPID = Convert.ToInt64(dr["PlacedOnOCPID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mConsolContainerNumber = Convert.ToString(dr["ConsolContainerNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mMasterOperationCode = Convert.ToString(dr["MasterOperationCode"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mHouseOperationCode = Convert.ToString(dr["HouseOperationCode"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPOLID = Convert.ToInt32(dr["POLID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mGateOutPortID = Convert.ToInt32(dr["GateOutPortID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mGateOutPortName = Convert.ToString(dr["GateOutPortName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mGateInPortID = Convert.ToInt32(dr["GateInPortID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mGateInPortName = Convert.ToString(dr["GateInPortName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mGateOutDate = Convert.ToDateTime(dr["GateOutDate"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mStuffingDate = Convert.ToDateTime(dr["StuffingDate"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mLoadingDate = Convert.ToDateTime(dr["LoadingDate"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mGateOutAndLoadingDatesDifference = Convert.ToInt32(dr["GateOutAndLoadingDatesDifference"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mFactory = Convert.ToString(dr["Factory"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mExportBLNumber = Convert.ToString(dr["ExportBLNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mImportBLNumber = Convert.ToString(dr["ImportBLNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsLoaded = Convert.ToBoolean(dr["IsLoaded"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsTracked = Convert.ToBoolean(dr["IsTracked"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mTankOrFlexiNumber = Convert.ToString(dr["TankOrFlexiNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mOperatorID = Convert.ToInt32(dr["OperatorID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mShipperID = Convert.ToInt32(dr["ShipperID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mShipperName = Convert.ToString(dr["ShipperName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mShipperLocalName = Convert.ToString(dr["ShipperLocalName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mShippingLineName = Convert.ToString(dr["ShippingLineName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mBookingPartyID = Convert.ToInt32(dr["BookingPartyID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mBookingPartyName = Convert.ToString(dr["BookingPartyName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mExtraPackagesTotalRepeatedInEachRowForOperation = Convert.ToString(dr["ExtraPackagesTotalRepeatedInEachRowForOperation"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mExtraPackages = Convert.ToString(dr["ExtraPackages"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mRate = Convert.ToDecimal(dr["Rate"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsAsAgreed = Convert.ToBoolean(dr["IsAsAgreed"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsMinimum = Convert.ToBoolean(dr["IsMinimum"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mWeightUnit = Convert.ToString(dr["WeightUnit"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mRateClass = Convert.ToString(dr["RateClass"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsOwnedByCompany = Convert.ToBoolean(dr["IsOwnedByCompany"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mDriverID = Convert.ToInt32(dr["DriverID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mDriverAssistantID = Convert.ToInt32(dr["DriverAssistantID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mTrailerName = Convert.ToString(dr["TrailerName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mDriverName = Convert.ToString(dr["DriverName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mDriverAssistantName = Convert.ToString(dr["DriverAssistantName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsFull = Convert.ToBoolean(dr["IsFull"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mExitDate = Convert.ToDateTime(dr["ExitDate"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mReturnDate = Convert.ToDateTime(dr["ReturnDate"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mFreeDays = Convert.ToInt32(dr["FreeDays"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mDayValue = Convert.ToDecimal(dr["DayValue"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mYardEIRNumber = Convert.ToInt32(dr["YardEIRNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mYardEIRNumberOut = Convert.ToInt32(dr["YardEIRNumberOut"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mYardInDate = Convert.ToDateTime(dr["YardInDate"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mYardInTime = Convert.ToInt32(dr["YardInTime"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mYardOutDate = Convert.ToDateTime(dr["YardOutDate"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mYardOutTime = Convert.ToInt32(dr["YardOutTime"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mYardLocationID = Convert.ToInt32(dr["YardLocationID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mYardIsIn = Convert.ToInt32(dr["YardIsIn"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mBookingNumber = Convert.ToString(dr["BookingNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsSentToWarehouse = Convert.ToBoolean(dr["IsSentToWarehouse"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mContainerSizeCode = Convert.ToString(dr["ContainerSizeCode"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mContainerSizeID = Convert.ToInt32(dr["ContainerSizeID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mDriver = Convert.ToString(dr["Driver"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mTruckNumber = Convert.ToString(dr["TruckNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mConsigneeID = Convert.ToInt32(dr["ConsigneeID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mConsigneeName = Convert.ToString(dr["ConsigneeName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mDriverNumber = Convert.ToString(dr["DriverNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPO = Convert.ToString(dr["PO"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsApproved = Convert.ToInt32(dr["IsApproved"].ToString());
                        lstCVarvwpreGateinvwOperationContainersAndPackages.Add(ObjCVarvwpreGateinvwOperationContainersAndPackages);
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
            lstCVarvwpreGateinvwOperationContainersAndPackages.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwpreGateinvwOperationContainersAndPackages";
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
                        CVarvwpreGateinvwOperationContainersAndPackages ObjCVarvwpreGateinvwOperationContainersAndPackages = new CVarvwpreGateinvwOperationContainersAndPackages();
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mLength = Convert.ToDecimal(dr["Length"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mVolumetricWeight = Convert.ToDecimal(dr["VolumetricWeight"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mNetWeightTON = Convert.ToDecimal(dr["NetWeightTON"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mGrossWeightTON = Convert.ToDecimal(dr["GrossWeightTON"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mVGM = Convert.ToDecimal(dr["VGM"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mQuantity = Convert.ToInt32(dr["Quantity"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mLotNumber = Convert.ToString(dr["LotNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mCarrierSeal = Convert.ToString(dr["CarrierSeal"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mShipperSeal = Convert.ToString(dr["ShipperSeal"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mTareWeight = Convert.ToDecimal(dr["TareWeight"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsReefer = Convert.ToBoolean(dr["IsReefer"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mMinTemp = Convert.ToDecimal(dr["MinTemp"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mMaxTemp = Convert.ToDecimal(dr["MaxTemp"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mVentilation = Convert.ToDecimal(dr["Ventilation"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mHumidity = Convert.ToDecimal(dr["Humidity"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsNOR = Convert.ToBoolean(dr["IsNOR"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsIMO = Convert.ToBoolean(dr["IsIMO"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIMOClass = Convert.ToDecimal(dr["IMOClass"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mUNNumber = Convert.ToInt32(dr["UNNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mFlashPoint = Convert.ToDecimal(dr["FlashPoint"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mMarksAndNumbers = Convert.ToString(dr["MarksAndNumbers"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mDescriptionOfGoods = Convert.ToString(dr["DescriptionOfGoods"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mNumberOfPackagesOnContainer = Convert.ToInt32(dr["NumberOfPackagesOnContainer"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPackageTypeIDOnContainer = Convert.ToInt32(dr["PackageTypeIDOnContainer"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPackageTypeNameOnContainer = Convert.ToString(dr["PackageTypeNameOnContainer"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mContainerTypeCode = Convert.ToString(dr["ContainerTypeCode"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mContainerTypeName = Convert.ToString(dr["ContainerTypeName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPackageTypeCode = Convert.ToString(dr["PackageTypeCode"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mShipmentType = Convert.ToInt32(dr["ShipmentType"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mHouseOperationID = Convert.ToInt64(dr["HouseOperationID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPlacedOnOCPID = Convert.ToInt64(dr["PlacedOnOCPID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mConsolContainerNumber = Convert.ToString(dr["ConsolContainerNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mMasterOperationCode = Convert.ToString(dr["MasterOperationCode"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mHouseOperationCode = Convert.ToString(dr["HouseOperationCode"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPOLID = Convert.ToInt32(dr["POLID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mGateOutPortID = Convert.ToInt32(dr["GateOutPortID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mGateOutPortName = Convert.ToString(dr["GateOutPortName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mGateInPortID = Convert.ToInt32(dr["GateInPortID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mGateInPortName = Convert.ToString(dr["GateInPortName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mGateOutDate = Convert.ToDateTime(dr["GateOutDate"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mStuffingDate = Convert.ToDateTime(dr["StuffingDate"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mLoadingDate = Convert.ToDateTime(dr["LoadingDate"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mGateOutAndLoadingDatesDifference = Convert.ToInt32(dr["GateOutAndLoadingDatesDifference"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mFactory = Convert.ToString(dr["Factory"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mExportBLNumber = Convert.ToString(dr["ExportBLNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mImportBLNumber = Convert.ToString(dr["ImportBLNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsLoaded = Convert.ToBoolean(dr["IsLoaded"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsTracked = Convert.ToBoolean(dr["IsTracked"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mTankOrFlexiNumber = Convert.ToString(dr["TankOrFlexiNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mOperatorID = Convert.ToInt32(dr["OperatorID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mShipperID = Convert.ToInt32(dr["ShipperID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mShipperName = Convert.ToString(dr["ShipperName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mShipperLocalName = Convert.ToString(dr["ShipperLocalName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mShippingLineName = Convert.ToString(dr["ShippingLineName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mBookingPartyID = Convert.ToInt32(dr["BookingPartyID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mBookingPartyName = Convert.ToString(dr["BookingPartyName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mExtraPackagesTotalRepeatedInEachRowForOperation = Convert.ToString(dr["ExtraPackagesTotalRepeatedInEachRowForOperation"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mExtraPackages = Convert.ToString(dr["ExtraPackages"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mRate = Convert.ToDecimal(dr["Rate"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsAsAgreed = Convert.ToBoolean(dr["IsAsAgreed"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsMinimum = Convert.ToBoolean(dr["IsMinimum"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mWeightUnit = Convert.ToString(dr["WeightUnit"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mRateClass = Convert.ToString(dr["RateClass"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsOwnedByCompany = Convert.ToBoolean(dr["IsOwnedByCompany"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mDriverID = Convert.ToInt32(dr["DriverID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mDriverAssistantID = Convert.ToInt32(dr["DriverAssistantID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mTrailerName = Convert.ToString(dr["TrailerName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mDriverName = Convert.ToString(dr["DriverName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mDriverAssistantName = Convert.ToString(dr["DriverAssistantName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsFull = Convert.ToBoolean(dr["IsFull"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mExitDate = Convert.ToDateTime(dr["ExitDate"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mReturnDate = Convert.ToDateTime(dr["ReturnDate"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mFreeDays = Convert.ToInt32(dr["FreeDays"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mDayValue = Convert.ToDecimal(dr["DayValue"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mYardEIRNumber = Convert.ToInt32(dr["YardEIRNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mYardEIRNumberOut = Convert.ToInt32(dr["YardEIRNumberOut"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mYardInDate = Convert.ToDateTime(dr["YardInDate"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mYardInTime = Convert.ToInt32(dr["YardInTime"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mYardOutDate = Convert.ToDateTime(dr["YardOutDate"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mYardOutTime = Convert.ToInt32(dr["YardOutTime"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mYardLocationID = Convert.ToInt32(dr["YardLocationID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mYardIsIn = Convert.ToInt32(dr["YardIsIn"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mBookingNumber = Convert.ToString(dr["BookingNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsSentToWarehouse = Convert.ToBoolean(dr["IsSentToWarehouse"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mContainerSizeCode = Convert.ToString(dr["ContainerSizeCode"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mContainerSizeID = Convert.ToInt32(dr["ContainerSizeID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mDriver = Convert.ToString(dr["Driver"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mTruckNumber = Convert.ToString(dr["TruckNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mConsigneeID = Convert.ToInt32(dr["ConsigneeID"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mConsigneeName = Convert.ToString(dr["ConsigneeName"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mDriverNumber = Convert.ToString(dr["DriverNumber"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mPO = Convert.ToString(dr["PO"].ToString());
                        ObjCVarvwpreGateinvwOperationContainersAndPackages.mIsApproved = Convert.ToInt32(dr["IsApproved"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwpreGateinvwOperationContainersAndPackages.Add(ObjCVarvwpreGateinvwOperationContainersAndPackages);
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
