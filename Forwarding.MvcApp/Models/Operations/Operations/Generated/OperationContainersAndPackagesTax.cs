using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKOperationContainersAndPackagesTAX
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
    public partial class CVarOperationContainersAndPackagesTAX : CPKOperationContainersAndPackagesTAX
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationID;
        internal Int64 mHouseOperationID;
        internal Int32 mContainerTypeID;
        internal Int32 mPackageTypeID;
        internal Decimal mLength;
        internal Decimal mWidth;
        internal Decimal mHeight;
        internal Decimal mVolume;
        internal Decimal mVolumetricWeight;
        internal Decimal mNetWeight;
        internal Decimal mGrossWeight;
        internal Decimal mVGM;
        internal Decimal mChargeableWeight;
        internal Int32 mQuantity;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal String mContainerNumber;
        internal String mCarrierSeal;
        internal String mShipperSeal;
        internal Decimal mTareWeight;
        internal Boolean mIsReefer;
        internal Boolean mIsNOR;
        internal Decimal mMinTemp;
        internal Decimal mMaxTemp;
        internal Decimal mHumidity;
        internal Decimal mVentilation;
        internal String mLotNumber;
        internal Boolean mIsIMO;
        internal Decimal mIMOClass;
        internal Int32 mUNNumber;
        internal Decimal mFlashPoint;
        internal String mMarksAndNumbers;
        internal String mDescriptionOfGoods;
        internal Int32 mPackageTypeIDOnContainer;
        internal Int32 mNumberOfPackagesOnContainer;
        internal Int64 mPlacedOnOCPID;
        internal Int32 mGateOutPortID;
        internal Int32 mGateInPortID;
        internal DateTime mGateOutDate;
        internal DateTime mStuffingDate;
        internal DateTime mLoadingDate;
        internal Int32 mGateOutAndLoadingDatesDifference;
        internal String mFactory;
        internal String mExportBLNumber;
        internal String mImportBLNumber;
        internal Boolean mIsLoaded;
        internal Boolean mIsTracked;
        internal Decimal mRate;
        internal Boolean mIsAsAgreed;
        internal Boolean mIsMinimum;
        internal Int32 mTrailerID;
        internal Boolean mIsOwnedByCompany;
        internal Int32 mDriverID;
        internal Int32 mDriverAssistantID;
        internal String mSupplierDriverName;
        internal String mSupplierDriverAssistantName;
        internal String mSupplierTrailerName;
        internal String mTankOrFlexiNumber;
        internal Int32 mOperatorID;
        internal String mWeightUnit;
        internal String mRateClass;
        internal Boolean mIsFull;
        internal DateTime mExitDate;
        internal DateTime mReturnDate;
        internal Int32 mFreeDays;
        internal Decimal mDayValue;
        internal Int32 mYardEIRNumber;
        internal DateTime mYardInDate;
        internal Int32 mYardInTime;
        internal DateTime mYardOutDate;
        internal Int32 mYardOutTime;
        internal Int32 mYardLocationID;
        internal Int32 mYardIsIn;
        internal Int32 mYardEIRNumberOut;
        internal Boolean mIsSentToWarehouse;
        #endregion

        #region "Methods"
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public Int64 HouseOperationID
        {
            get { return mHouseOperationID; }
            set { mIsChanges = true; mHouseOperationID = value; }
        }
        public Int32 ContainerTypeID
        {
            get { return mContainerTypeID; }
            set { mIsChanges = true; mContainerTypeID = value; }
        }
        public Int32 PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mIsChanges = true; mPackageTypeID = value; }
        }
        public Decimal Length
        {
            get { return mLength; }
            set { mIsChanges = true; mLength = value; }
        }
        public Decimal Width
        {
            get { return mWidth; }
            set { mIsChanges = true; mWidth = value; }
        }
        public Decimal Height
        {
            get { return mHeight; }
            set { mIsChanges = true; mHeight = value; }
        }
        public Decimal Volume
        {
            get { return mVolume; }
            set { mIsChanges = true; mVolume = value; }
        }
        public Decimal VolumetricWeight
        {
            get { return mVolumetricWeight; }
            set { mIsChanges = true; mVolumetricWeight = value; }
        }
        public Decimal NetWeight
        {
            get { return mNetWeight; }
            set { mIsChanges = true; mNetWeight = value; }
        }
        public Decimal GrossWeight
        {
            get { return mGrossWeight; }
            set { mIsChanges = true; mGrossWeight = value; }
        }
        public Decimal VGM
        {
            get { return mVGM; }
            set { mIsChanges = true; mVGM = value; }
        }
        public Decimal ChargeableWeight
        {
            get { return mChargeableWeight; }
            set { mIsChanges = true; mChargeableWeight = value; }
        }
        public Int32 Quantity
        {
            get { return mQuantity; }
            set { mIsChanges = true; mQuantity = value; }
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
        public String ContainerNumber
        {
            get { return mContainerNumber; }
            set { mIsChanges = true; mContainerNumber = value; }
        }
        public String CarrierSeal
        {
            get { return mCarrierSeal; }
            set { mIsChanges = true; mCarrierSeal = value; }
        }
        public String ShipperSeal
        {
            get { return mShipperSeal; }
            set { mIsChanges = true; mShipperSeal = value; }
        }
        public Decimal TareWeight
        {
            get { return mTareWeight; }
            set { mIsChanges = true; mTareWeight = value; }
        }
        public Boolean IsReefer
        {
            get { return mIsReefer; }
            set { mIsChanges = true; mIsReefer = value; }
        }
        public Boolean IsNOR
        {
            get { return mIsNOR; }
            set { mIsChanges = true; mIsNOR = value; }
        }
        public Decimal MinTemp
        {
            get { return mMinTemp; }
            set { mIsChanges = true; mMinTemp = value; }
        }
        public Decimal MaxTemp
        {
            get { return mMaxTemp; }
            set { mIsChanges = true; mMaxTemp = value; }
        }
        public Decimal Humidity
        {
            get { return mHumidity; }
            set { mIsChanges = true; mHumidity = value; }
        }
        public Decimal Ventilation
        {
            get { return mVentilation; }
            set { mIsChanges = true; mVentilation = value; }
        }
        public String LotNumber
        {
            get { return mLotNumber; }
            set { mIsChanges = true; mLotNumber = value; }
        }
        public Boolean IsIMO
        {
            get { return mIsIMO; }
            set { mIsChanges = true; mIsIMO = value; }
        }
        public Decimal IMOClass
        {
            get { return mIMOClass; }
            set { mIsChanges = true; mIMOClass = value; }
        }
        public Int32 UNNumber
        {
            get { return mUNNumber; }
            set { mIsChanges = true; mUNNumber = value; }
        }
        public Decimal FlashPoint
        {
            get { return mFlashPoint; }
            set { mIsChanges = true; mFlashPoint = value; }
        }
        public String MarksAndNumbers
        {
            get { return mMarksAndNumbers; }
            set { mIsChanges = true; mMarksAndNumbers = value; }
        }
        public String DescriptionOfGoods
        {
            get { return mDescriptionOfGoods; }
            set { mIsChanges = true; mDescriptionOfGoods = value; }
        }
        public Int32 PackageTypeIDOnContainer
        {
            get { return mPackageTypeIDOnContainer; }
            set { mIsChanges = true; mPackageTypeIDOnContainer = value; }
        }
        public Int32 NumberOfPackagesOnContainer
        {
            get { return mNumberOfPackagesOnContainer; }
            set { mIsChanges = true; mNumberOfPackagesOnContainer = value; }
        }
        public Int64 PlacedOnOCPID
        {
            get { return mPlacedOnOCPID; }
            set { mIsChanges = true; mPlacedOnOCPID = value; }
        }
        public Int32 GateOutPortID
        {
            get { return mGateOutPortID; }
            set { mIsChanges = true; mGateOutPortID = value; }
        }
        public Int32 GateInPortID
        {
            get { return mGateInPortID; }
            set { mIsChanges = true; mGateInPortID = value; }
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
        public DateTime LoadingDate
        {
            get { return mLoadingDate; }
            set { mIsChanges = true; mLoadingDate = value; }
        }
        public Int32 GateOutAndLoadingDatesDifference
        {
            get { return mGateOutAndLoadingDatesDifference; }
            set { mIsChanges = true; mGateOutAndLoadingDatesDifference = value; }
        }
        public String Factory
        {
            get { return mFactory; }
            set { mIsChanges = true; mFactory = value; }
        }
        public String ExportBLNumber
        {
            get { return mExportBLNumber; }
            set { mIsChanges = true; mExportBLNumber = value; }
        }
        public String ImportBLNumber
        {
            get { return mImportBLNumber; }
            set { mIsChanges = true; mImportBLNumber = value; }
        }
        public Boolean IsLoaded
        {
            get { return mIsLoaded; }
            set { mIsChanges = true; mIsLoaded = value; }
        }
        public Boolean IsTracked
        {
            get { return mIsTracked; }
            set { mIsChanges = true; mIsTracked = value; }
        }
        public Decimal Rate
        {
            get { return mRate; }
            set { mIsChanges = true; mRate = value; }
        }
        public Boolean IsAsAgreed
        {
            get { return mIsAsAgreed; }
            set { mIsChanges = true; mIsAsAgreed = value; }
        }
        public Boolean IsMinimum
        {
            get { return mIsMinimum; }
            set { mIsChanges = true; mIsMinimum = value; }
        }
        public Int32 TrailerID
        {
            get { return mTrailerID; }
            set { mIsChanges = true; mTrailerID = value; }
        }
        public Boolean IsOwnedByCompany
        {
            get { return mIsOwnedByCompany; }
            set { mIsChanges = true; mIsOwnedByCompany = value; }
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
        public String SupplierDriverName
        {
            get { return mSupplierDriverName; }
            set { mIsChanges = true; mSupplierDriverName = value; }
        }
        public String SupplierDriverAssistantName
        {
            get { return mSupplierDriverAssistantName; }
            set { mIsChanges = true; mSupplierDriverAssistantName = value; }
        }
        public String SupplierTrailerName
        {
            get { return mSupplierTrailerName; }
            set { mIsChanges = true; mSupplierTrailerName = value; }
        }
        public String TankOrFlexiNumber
        {
            get { return mTankOrFlexiNumber; }
            set { mIsChanges = true; mTankOrFlexiNumber = value; }
        }
        public Int32 OperatorID
        {
            get { return mOperatorID; }
            set { mIsChanges = true; mOperatorID = value; }
        }
        public String WeightUnit
        {
            get { return mWeightUnit; }
            set { mIsChanges = true; mWeightUnit = value; }
        }
        public String RateClass
        {
            get { return mRateClass; }
            set { mIsChanges = true; mRateClass = value; }
        }
        public Boolean IsFull
        {
            get { return mIsFull; }
            set { mIsChanges = true; mIsFull = value; }
        }
        public DateTime ExitDate
        {
            get { return mExitDate; }
            set { mIsChanges = true; mExitDate = value; }
        }
        public DateTime ReturnDate
        {
            get { return mReturnDate; }
            set { mIsChanges = true; mReturnDate = value; }
        }
        public Int32 FreeDays
        {
            get { return mFreeDays; }
            set { mIsChanges = true; mFreeDays = value; }
        }
        public Decimal DayValue
        {
            get { return mDayValue; }
            set { mIsChanges = true; mDayValue = value; }
        }
        public Int32 YardEIRNumber
        {
            get { return mYardEIRNumber; }
            set { mIsChanges = true; mYardEIRNumber = value; }
        }
        public DateTime YardInDate
        {
            get { return mYardInDate; }
            set { mIsChanges = true; mYardInDate = value; }
        }
        public Int32 YardInTime
        {
            get { return mYardInTime; }
            set { mIsChanges = true; mYardInTime = value; }
        }
        public DateTime YardOutDate
        {
            get { return mYardOutDate; }
            set { mIsChanges = true; mYardOutDate = value; }
        }
        public Int32 YardOutTime
        {
            get { return mYardOutTime; }
            set { mIsChanges = true; mYardOutTime = value; }
        }
        public Int32 YardLocationID
        {
            get { return mYardLocationID; }
            set { mIsChanges = true; mYardLocationID = value; }
        }
        public Int32 YardIsIn
        {
            get { return mYardIsIn; }
            set { mIsChanges = true; mYardIsIn = value; }
        }
        public Int32 YardEIRNumberOut
        {
            get { return mYardEIRNumberOut; }
            set { mIsChanges = true; mYardEIRNumberOut = value; }
        }
        public Boolean IsSentToWarehouse
        {
            get { return mIsSentToWarehouse; }
            set { mIsChanges = true; mIsSentToWarehouse = value; }
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

    public partial class COperationContainersAndPackagesTAX
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
        public List<CVarOperationContainersAndPackagesTAX> lstCVarOperationContainersAndPackages = new List<CVarOperationContainersAndPackagesTAX>();
        public List<CPKOperationContainersAndPackagesTAX> lstDeletedCPKOperationContainersAndPackages = new List<CPKOperationContainersAndPackagesTAX>();
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
            lstCVarOperationContainersAndPackages.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListOperationContainersAndPackages";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemOperationContainersAndPackages";
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
                        CVarOperationContainersAndPackagesTAX ObjCVarOperationContainersAndPackages = new CVarOperationContainersAndPackagesTAX();
                        ObjCVarOperationContainersAndPackages.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarOperationContainersAndPackages.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarOperationContainersAndPackages.mHouseOperationID = Convert.ToInt64(dr["HouseOperationID"].ToString());
                        ObjCVarOperationContainersAndPackages.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarOperationContainersAndPackages.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarOperationContainersAndPackages.mLength = Convert.ToDecimal(dr["Length"].ToString());
                        ObjCVarOperationContainersAndPackages.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarOperationContainersAndPackages.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarOperationContainersAndPackages.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarOperationContainersAndPackages.mVolumetricWeight = Convert.ToDecimal(dr["VolumetricWeight"].ToString());
                        ObjCVarOperationContainersAndPackages.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarOperationContainersAndPackages.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarOperationContainersAndPackages.mVGM = Convert.ToDecimal(dr["VGM"].ToString());
                        ObjCVarOperationContainersAndPackages.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
                        ObjCVarOperationContainersAndPackages.mQuantity = Convert.ToInt32(dr["Quantity"].ToString());
                        ObjCVarOperationContainersAndPackages.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarOperationContainersAndPackages.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarOperationContainersAndPackages.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarOperationContainersAndPackages.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarOperationContainersAndPackages.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarOperationContainersAndPackages.mCarrierSeal = Convert.ToString(dr["CarrierSeal"].ToString());
                        ObjCVarOperationContainersAndPackages.mShipperSeal = Convert.ToString(dr["ShipperSeal"].ToString());
                        ObjCVarOperationContainersAndPackages.mTareWeight = Convert.ToDecimal(dr["TareWeight"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsReefer = Convert.ToBoolean(dr["IsReefer"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsNOR = Convert.ToBoolean(dr["IsNOR"].ToString());
                        ObjCVarOperationContainersAndPackages.mMinTemp = Convert.ToDecimal(dr["MinTemp"].ToString());
                        ObjCVarOperationContainersAndPackages.mMaxTemp = Convert.ToDecimal(dr["MaxTemp"].ToString());
                        ObjCVarOperationContainersAndPackages.mHumidity = Convert.ToDecimal(dr["Humidity"].ToString());
                        ObjCVarOperationContainersAndPackages.mVentilation = Convert.ToDecimal(dr["Ventilation"].ToString());
                        ObjCVarOperationContainersAndPackages.mLotNumber = Convert.ToString(dr["LotNumber"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsIMO = Convert.ToBoolean(dr["IsIMO"].ToString());
                        ObjCVarOperationContainersAndPackages.mIMOClass = Convert.ToDecimal(dr["IMOClass"].ToString());
                        ObjCVarOperationContainersAndPackages.mUNNumber = Convert.ToInt32(dr["UNNumber"].ToString());
                        ObjCVarOperationContainersAndPackages.mFlashPoint = Convert.ToDecimal(dr["FlashPoint"].ToString());
                        ObjCVarOperationContainersAndPackages.mMarksAndNumbers = Convert.ToString(dr["MarksAndNumbers"].ToString());
                        ObjCVarOperationContainersAndPackages.mDescriptionOfGoods = Convert.ToString(dr["DescriptionOfGoods"].ToString());
                        ObjCVarOperationContainersAndPackages.mPackageTypeIDOnContainer = Convert.ToInt32(dr["PackageTypeIDOnContainer"].ToString());
                        ObjCVarOperationContainersAndPackages.mNumberOfPackagesOnContainer = Convert.ToInt32(dr["NumberOfPackagesOnContainer"].ToString());
                        ObjCVarOperationContainersAndPackages.mPlacedOnOCPID = Convert.ToInt64(dr["PlacedOnOCPID"].ToString());
                        ObjCVarOperationContainersAndPackages.mGateOutPortID = Convert.ToInt32(dr["GateOutPortID"].ToString());
                        ObjCVarOperationContainersAndPackages.mGateInPortID = Convert.ToInt32(dr["GateInPortID"].ToString());
                        ObjCVarOperationContainersAndPackages.mGateOutDate = Convert.ToDateTime(dr["GateOutDate"].ToString());
                        ObjCVarOperationContainersAndPackages.mStuffingDate = Convert.ToDateTime(dr["StuffingDate"].ToString());
                        ObjCVarOperationContainersAndPackages.mLoadingDate = Convert.ToDateTime(dr["LoadingDate"].ToString());
                        ObjCVarOperationContainersAndPackages.mGateOutAndLoadingDatesDifference = Convert.ToInt32(dr["GateOutAndLoadingDatesDifference"].ToString());
                        ObjCVarOperationContainersAndPackages.mFactory = Convert.ToString(dr["Factory"].ToString());
                        ObjCVarOperationContainersAndPackages.mExportBLNumber = Convert.ToString(dr["ExportBLNumber"].ToString());
                        ObjCVarOperationContainersAndPackages.mImportBLNumber = Convert.ToString(dr["ImportBLNumber"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsLoaded = Convert.ToBoolean(dr["IsLoaded"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsTracked = Convert.ToBoolean(dr["IsTracked"].ToString());
                        ObjCVarOperationContainersAndPackages.mRate = Convert.ToDecimal(dr["Rate"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsAsAgreed = Convert.ToBoolean(dr["IsAsAgreed"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsMinimum = Convert.ToBoolean(dr["IsMinimum"].ToString());
                        ObjCVarOperationContainersAndPackages.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsOwnedByCompany = Convert.ToBoolean(dr["IsOwnedByCompany"].ToString());
                        ObjCVarOperationContainersAndPackages.mDriverID = Convert.ToInt32(dr["DriverID"].ToString());
                        ObjCVarOperationContainersAndPackages.mDriverAssistantID = Convert.ToInt32(dr["DriverAssistantID"].ToString());
                        ObjCVarOperationContainersAndPackages.mSupplierDriverName = Convert.ToString(dr["SupplierDriverName"].ToString());
                        ObjCVarOperationContainersAndPackages.mSupplierDriverAssistantName = Convert.ToString(dr["SupplierDriverAssistantName"].ToString());
                        ObjCVarOperationContainersAndPackages.mSupplierTrailerName = Convert.ToString(dr["SupplierTrailerName"].ToString());
                        ObjCVarOperationContainersAndPackages.mTankOrFlexiNumber = Convert.ToString(dr["TankOrFlexiNumber"].ToString());
                        ObjCVarOperationContainersAndPackages.mOperatorID = Convert.ToInt32(dr["OperatorID"].ToString());
                        ObjCVarOperationContainersAndPackages.mWeightUnit = Convert.ToString(dr["WeightUnit"].ToString());
                        ObjCVarOperationContainersAndPackages.mRateClass = Convert.ToString(dr["RateClass"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsFull = Convert.ToBoolean(dr["IsFull"].ToString());
                        ObjCVarOperationContainersAndPackages.mExitDate = Convert.ToDateTime(dr["ExitDate"].ToString());
                        ObjCVarOperationContainersAndPackages.mReturnDate = Convert.ToDateTime(dr["ReturnDate"].ToString());
                        ObjCVarOperationContainersAndPackages.mFreeDays = Convert.ToInt32(dr["FreeDays"].ToString());
                        ObjCVarOperationContainersAndPackages.mDayValue = Convert.ToDecimal(dr["DayValue"].ToString());
                        ObjCVarOperationContainersAndPackages.mYardEIRNumber = Convert.ToInt32(dr["YardEIRNumber"].ToString());
                        ObjCVarOperationContainersAndPackages.mYardInDate = Convert.ToDateTime(dr["YardInDate"].ToString());
                        ObjCVarOperationContainersAndPackages.mYardInTime = Convert.ToInt32(dr["YardInTime"].ToString());
                        ObjCVarOperationContainersAndPackages.mYardOutDate = Convert.ToDateTime(dr["YardOutDate"].ToString());
                        ObjCVarOperationContainersAndPackages.mYardOutTime = Convert.ToInt32(dr["YardOutTime"].ToString());
                        ObjCVarOperationContainersAndPackages.mYardLocationID = Convert.ToInt32(dr["YardLocationID"].ToString());
                        ObjCVarOperationContainersAndPackages.mYardIsIn = Convert.ToInt32(dr["YardIsIn"].ToString());
                        ObjCVarOperationContainersAndPackages.mYardEIRNumberOut = Convert.ToInt32(dr["YardEIRNumberOut"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsSentToWarehouse = Convert.ToBoolean(dr["IsSentToWarehouse"].ToString());
                        lstCVarOperationContainersAndPackages.Add(ObjCVarOperationContainersAndPackages);
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
            lstCVarOperationContainersAndPackages.Clear();

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
                Com.CommandText = "[dbo].GetListPagingOperationContainersAndPackagesTax";
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
                        CVarOperationContainersAndPackagesTAX ObjCVarOperationContainersAndPackages = new CVarOperationContainersAndPackagesTAX();
                        ObjCVarOperationContainersAndPackages.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarOperationContainersAndPackages.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarOperationContainersAndPackages.mHouseOperationID = Convert.ToInt64(dr["HouseOperationID"].ToString());
                        ObjCVarOperationContainersAndPackages.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarOperationContainersAndPackages.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarOperationContainersAndPackages.mLength = Convert.ToDecimal(dr["Length"].ToString());
                        ObjCVarOperationContainersAndPackages.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarOperationContainersAndPackages.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarOperationContainersAndPackages.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarOperationContainersAndPackages.mVolumetricWeight = Convert.ToDecimal(dr["VolumetricWeight"].ToString());
                        ObjCVarOperationContainersAndPackages.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarOperationContainersAndPackages.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarOperationContainersAndPackages.mVGM = Convert.ToDecimal(dr["VGM"].ToString());
                        ObjCVarOperationContainersAndPackages.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
                        ObjCVarOperationContainersAndPackages.mQuantity = Convert.ToInt32(dr["Quantity"].ToString());
                        ObjCVarOperationContainersAndPackages.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarOperationContainersAndPackages.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarOperationContainersAndPackages.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarOperationContainersAndPackages.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarOperationContainersAndPackages.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarOperationContainersAndPackages.mCarrierSeal = Convert.ToString(dr["CarrierSeal"].ToString());
                        ObjCVarOperationContainersAndPackages.mShipperSeal = Convert.ToString(dr["ShipperSeal"].ToString());
                        ObjCVarOperationContainersAndPackages.mTareWeight = Convert.ToDecimal(dr["TareWeight"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsReefer = Convert.ToBoolean(dr["IsReefer"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsNOR = Convert.ToBoolean(dr["IsNOR"].ToString());
                        ObjCVarOperationContainersAndPackages.mMinTemp = Convert.ToDecimal(dr["MinTemp"].ToString());
                        ObjCVarOperationContainersAndPackages.mMaxTemp = Convert.ToDecimal(dr["MaxTemp"].ToString());
                        ObjCVarOperationContainersAndPackages.mHumidity = Convert.ToDecimal(dr["Humidity"].ToString());
                        ObjCVarOperationContainersAndPackages.mVentilation = Convert.ToDecimal(dr["Ventilation"].ToString());
                        ObjCVarOperationContainersAndPackages.mLotNumber = Convert.ToString(dr["LotNumber"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsIMO = Convert.ToBoolean(dr["IsIMO"].ToString());
                        ObjCVarOperationContainersAndPackages.mIMOClass = Convert.ToDecimal(dr["IMOClass"].ToString());
                        ObjCVarOperationContainersAndPackages.mUNNumber = Convert.ToInt32(dr["UNNumber"].ToString());
                        ObjCVarOperationContainersAndPackages.mFlashPoint = Convert.ToDecimal(dr["FlashPoint"].ToString());
                        ObjCVarOperationContainersAndPackages.mMarksAndNumbers = Convert.ToString(dr["MarksAndNumbers"].ToString());
                        ObjCVarOperationContainersAndPackages.mDescriptionOfGoods = Convert.ToString(dr["DescriptionOfGoods"].ToString());
                        ObjCVarOperationContainersAndPackages.mPackageTypeIDOnContainer = Convert.ToInt32(dr["PackageTypeIDOnContainer"].ToString());
                        ObjCVarOperationContainersAndPackages.mNumberOfPackagesOnContainer = Convert.ToInt32(dr["NumberOfPackagesOnContainer"].ToString());
                        ObjCVarOperationContainersAndPackages.mPlacedOnOCPID = Convert.ToInt64(dr["PlacedOnOCPID"].ToString());
                        ObjCVarOperationContainersAndPackages.mGateOutPortID = Convert.ToInt32(dr["GateOutPortID"].ToString());
                        ObjCVarOperationContainersAndPackages.mGateInPortID = Convert.ToInt32(dr["GateInPortID"].ToString());
                        ObjCVarOperationContainersAndPackages.mGateOutDate = Convert.ToDateTime(dr["GateOutDate"].ToString());
                        ObjCVarOperationContainersAndPackages.mStuffingDate = Convert.ToDateTime(dr["StuffingDate"].ToString());
                        ObjCVarOperationContainersAndPackages.mLoadingDate = Convert.ToDateTime(dr["LoadingDate"].ToString());
                        ObjCVarOperationContainersAndPackages.mGateOutAndLoadingDatesDifference = Convert.ToInt32(dr["GateOutAndLoadingDatesDifference"].ToString());
                        ObjCVarOperationContainersAndPackages.mFactory = Convert.ToString(dr["Factory"].ToString());
                        ObjCVarOperationContainersAndPackages.mExportBLNumber = Convert.ToString(dr["ExportBLNumber"].ToString());
                        ObjCVarOperationContainersAndPackages.mImportBLNumber = Convert.ToString(dr["ImportBLNumber"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsLoaded = Convert.ToBoolean(dr["IsLoaded"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsTracked = Convert.ToBoolean(dr["IsTracked"].ToString());
                        ObjCVarOperationContainersAndPackages.mRate = Convert.ToDecimal(dr["Rate"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsAsAgreed = Convert.ToBoolean(dr["IsAsAgreed"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsMinimum = Convert.ToBoolean(dr["IsMinimum"].ToString());
                        ObjCVarOperationContainersAndPackages.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsOwnedByCompany = Convert.ToBoolean(dr["IsOwnedByCompany"].ToString());
                        ObjCVarOperationContainersAndPackages.mDriverID = Convert.ToInt32(dr["DriverID"].ToString());
                        ObjCVarOperationContainersAndPackages.mDriverAssistantID = Convert.ToInt32(dr["DriverAssistantID"].ToString());
                        ObjCVarOperationContainersAndPackages.mSupplierDriverName = Convert.ToString(dr["SupplierDriverName"].ToString());
                        ObjCVarOperationContainersAndPackages.mSupplierDriverAssistantName = Convert.ToString(dr["SupplierDriverAssistantName"].ToString());
                        ObjCVarOperationContainersAndPackages.mSupplierTrailerName = Convert.ToString(dr["SupplierTrailerName"].ToString());
                        ObjCVarOperationContainersAndPackages.mTankOrFlexiNumber = Convert.ToString(dr["TankOrFlexiNumber"].ToString());
                        ObjCVarOperationContainersAndPackages.mOperatorID = Convert.ToInt32(dr["OperatorID"].ToString());
                        ObjCVarOperationContainersAndPackages.mWeightUnit = Convert.ToString(dr["WeightUnit"].ToString());
                        ObjCVarOperationContainersAndPackages.mRateClass = Convert.ToString(dr["RateClass"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsFull = Convert.ToBoolean(dr["IsFull"].ToString());
                        ObjCVarOperationContainersAndPackages.mExitDate = Convert.ToDateTime(dr["ExitDate"].ToString());
                        ObjCVarOperationContainersAndPackages.mReturnDate = Convert.ToDateTime(dr["ReturnDate"].ToString());
                        ObjCVarOperationContainersAndPackages.mFreeDays = Convert.ToInt32(dr["FreeDays"].ToString());
                        ObjCVarOperationContainersAndPackages.mDayValue = Convert.ToDecimal(dr["DayValue"].ToString());
                        ObjCVarOperationContainersAndPackages.mYardEIRNumber = Convert.ToInt32(dr["YardEIRNumber"].ToString());
                        ObjCVarOperationContainersAndPackages.mYardInDate = Convert.ToDateTime(dr["YardInDate"].ToString());
                        ObjCVarOperationContainersAndPackages.mYardInTime = Convert.ToInt32(dr["YardInTime"].ToString());
                        ObjCVarOperationContainersAndPackages.mYardOutDate = Convert.ToDateTime(dr["YardOutDate"].ToString());
                        ObjCVarOperationContainersAndPackages.mYardOutTime = Convert.ToInt32(dr["YardOutTime"].ToString());
                        ObjCVarOperationContainersAndPackages.mYardLocationID = Convert.ToInt32(dr["YardLocationID"].ToString());
                        ObjCVarOperationContainersAndPackages.mYardIsIn = Convert.ToInt32(dr["YardIsIn"].ToString());
                        ObjCVarOperationContainersAndPackages.mYardEIRNumberOut = Convert.ToInt32(dr["YardEIRNumberOut"].ToString());
                        ObjCVarOperationContainersAndPackages.mIsSentToWarehouse = Convert.ToBoolean(dr["IsSentToWarehouse"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarOperationContainersAndPackages.Add(ObjCVarOperationContainersAndPackages);
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
                    Com.CommandText = "[dbo].DeleteListOperationContainersAndPackages";
                else
                    Com.CommandText = "[dbo].UpdateListOperationContainersAndPackages";
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
        public Exception DeleteItem(List<CPKOperationContainersAndPackagesTAX> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemOperationContainersAndPackages";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKOperationContainersAndPackagesTAX ObjCPKOperationContainersAndPackages in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKOperationContainersAndPackages.ID);
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
        public Exception SaveMethod(List<CVarOperationContainersAndPackagesTAX> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@HouseOperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ContainerTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PackageTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Length", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Width", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Height", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Volume", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@VolumetricWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@NetWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@GrossWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@VGM", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ChargeableWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Quantity", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ContainerNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CarrierSeal", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ShipperSeal", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TareWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@IsReefer", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsNOR", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@MinTemp", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@MaxTemp", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Humidity", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Ventilation", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@LotNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsIMO", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IMOClass", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@UNNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@FlashPoint", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@MarksAndNumbers", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DescriptionOfGoods", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PackageTypeIDOnContainer", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@NumberOfPackagesOnContainer", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PlacedOnOCPID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@GateOutPortID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@GateInPortID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@GateOutDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@StuffingDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LoadingDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@GateOutAndLoadingDatesDifference", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Factory", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ExportBLNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ImportBLNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsLoaded", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsTracked", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Rate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@IsAsAgreed", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsMinimum", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@TrailerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsOwnedByCompany", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@DriverID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DriverAssistantID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SupplierDriverName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@SupplierDriverAssistantName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@SupplierTrailerName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TankOrFlexiNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OperatorID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WeightUnit", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@RateClass", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsFull", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ExitDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ReturnDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@FreeDays", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DayValue", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@YardEIRNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@YardInDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@YardInTime", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@YardOutDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@YardOutTime", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@YardLocationID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@YardIsIn", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@YardEIRNumberOut", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsSentToWarehouse", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarOperationContainersAndPackagesTAX ObjCVarOperationContainersAndPackages in SaveList)
                {
                    if (ObjCVarOperationContainersAndPackages.mIsChanges == true)
                    {
                        if (ObjCVarOperationContainersAndPackages.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemOperationContainersAndPackagesTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarOperationContainersAndPackages.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemOperationContainersAndPackagesTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarOperationContainersAndPackages.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarOperationContainersAndPackages.ID;
                        }
                        Com.Parameters["@OperationID"].Value = ObjCVarOperationContainersAndPackages.OperationID;
                        Com.Parameters["@HouseOperationID"].Value = ObjCVarOperationContainersAndPackages.HouseOperationID;
                        Com.Parameters["@ContainerTypeID"].Value = ObjCVarOperationContainersAndPackages.ContainerTypeID;
                        Com.Parameters["@PackageTypeID"].Value = ObjCVarOperationContainersAndPackages.PackageTypeID;
                        Com.Parameters["@Length"].Value = ObjCVarOperationContainersAndPackages.Length;
                        Com.Parameters["@Width"].Value = ObjCVarOperationContainersAndPackages.Width;
                        Com.Parameters["@Height"].Value = ObjCVarOperationContainersAndPackages.Height;
                        Com.Parameters["@Volume"].Value = ObjCVarOperationContainersAndPackages.Volume;
                        Com.Parameters["@VolumetricWeight"].Value = ObjCVarOperationContainersAndPackages.VolumetricWeight;
                        Com.Parameters["@NetWeight"].Value = ObjCVarOperationContainersAndPackages.NetWeight;
                        Com.Parameters["@GrossWeight"].Value = ObjCVarOperationContainersAndPackages.GrossWeight;
                        Com.Parameters["@VGM"].Value = ObjCVarOperationContainersAndPackages.VGM;
                        Com.Parameters["@ChargeableWeight"].Value = ObjCVarOperationContainersAndPackages.ChargeableWeight;
                        Com.Parameters["@Quantity"].Value = ObjCVarOperationContainersAndPackages.Quantity;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarOperationContainersAndPackages.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarOperationContainersAndPackages.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarOperationContainersAndPackages.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarOperationContainersAndPackages.ModificationDate;
                        Com.Parameters["@ContainerNumber"].Value = ObjCVarOperationContainersAndPackages.ContainerNumber;
                        Com.Parameters["@CarrierSeal"].Value = ObjCVarOperationContainersAndPackages.CarrierSeal;
                        Com.Parameters["@ShipperSeal"].Value = ObjCVarOperationContainersAndPackages.ShipperSeal;
                        Com.Parameters["@TareWeight"].Value = ObjCVarOperationContainersAndPackages.TareWeight;
                        Com.Parameters["@IsReefer"].Value = ObjCVarOperationContainersAndPackages.IsReefer;
                        Com.Parameters["@IsNOR"].Value = ObjCVarOperationContainersAndPackages.IsNOR;
                        Com.Parameters["@MinTemp"].Value = ObjCVarOperationContainersAndPackages.MinTemp;
                        Com.Parameters["@MaxTemp"].Value = ObjCVarOperationContainersAndPackages.MaxTemp;
                        Com.Parameters["@Humidity"].Value = ObjCVarOperationContainersAndPackages.Humidity;
                        Com.Parameters["@Ventilation"].Value = ObjCVarOperationContainersAndPackages.Ventilation;
                        Com.Parameters["@LotNumber"].Value = ObjCVarOperationContainersAndPackages.LotNumber;
                        Com.Parameters["@IsIMO"].Value = ObjCVarOperationContainersAndPackages.IsIMO;
                        Com.Parameters["@IMOClass"].Value = ObjCVarOperationContainersAndPackages.IMOClass;
                        Com.Parameters["@UNNumber"].Value = ObjCVarOperationContainersAndPackages.UNNumber;
                        Com.Parameters["@FlashPoint"].Value = ObjCVarOperationContainersAndPackages.FlashPoint;
                        Com.Parameters["@MarksAndNumbers"].Value = ObjCVarOperationContainersAndPackages.MarksAndNumbers;
                        Com.Parameters["@DescriptionOfGoods"].Value = ObjCVarOperationContainersAndPackages.DescriptionOfGoods;
                        Com.Parameters["@PackageTypeIDOnContainer"].Value = ObjCVarOperationContainersAndPackages.PackageTypeIDOnContainer;
                        Com.Parameters["@NumberOfPackagesOnContainer"].Value = ObjCVarOperationContainersAndPackages.NumberOfPackagesOnContainer;
                        Com.Parameters["@PlacedOnOCPID"].Value = ObjCVarOperationContainersAndPackages.PlacedOnOCPID;
                        Com.Parameters["@GateOutPortID"].Value = ObjCVarOperationContainersAndPackages.GateOutPortID;
                        Com.Parameters["@GateInPortID"].Value = ObjCVarOperationContainersAndPackages.GateInPortID;
                        Com.Parameters["@GateOutDate"].Value = ObjCVarOperationContainersAndPackages.GateOutDate;
                        Com.Parameters["@StuffingDate"].Value = ObjCVarOperationContainersAndPackages.StuffingDate;
                        Com.Parameters["@LoadingDate"].Value = ObjCVarOperationContainersAndPackages.LoadingDate;
                        Com.Parameters["@GateOutAndLoadingDatesDifference"].Value = ObjCVarOperationContainersAndPackages.GateOutAndLoadingDatesDifference;
                        Com.Parameters["@Factory"].Value = ObjCVarOperationContainersAndPackages.Factory;
                        Com.Parameters["@ExportBLNumber"].Value = ObjCVarOperationContainersAndPackages.ExportBLNumber;
                        Com.Parameters["@ImportBLNumber"].Value = ObjCVarOperationContainersAndPackages.ImportBLNumber;
                        Com.Parameters["@IsLoaded"].Value = ObjCVarOperationContainersAndPackages.IsLoaded;
                        Com.Parameters["@IsTracked"].Value = ObjCVarOperationContainersAndPackages.IsTracked;
                        Com.Parameters["@Rate"].Value = ObjCVarOperationContainersAndPackages.Rate;
                        Com.Parameters["@IsAsAgreed"].Value = ObjCVarOperationContainersAndPackages.IsAsAgreed;
                        Com.Parameters["@IsMinimum"].Value = ObjCVarOperationContainersAndPackages.IsMinimum;
                        Com.Parameters["@TrailerID"].Value = ObjCVarOperationContainersAndPackages.TrailerID;
                        Com.Parameters["@IsOwnedByCompany"].Value = ObjCVarOperationContainersAndPackages.IsOwnedByCompany;
                        Com.Parameters["@DriverID"].Value = ObjCVarOperationContainersAndPackages.DriverID;
                        Com.Parameters["@DriverAssistantID"].Value = ObjCVarOperationContainersAndPackages.DriverAssistantID;
                        Com.Parameters["@SupplierDriverName"].Value = ObjCVarOperationContainersAndPackages.SupplierDriverName;
                        Com.Parameters["@SupplierDriverAssistantName"].Value = ObjCVarOperationContainersAndPackages.SupplierDriverAssistantName;
                        Com.Parameters["@SupplierTrailerName"].Value = ObjCVarOperationContainersAndPackages.SupplierTrailerName;
                        Com.Parameters["@TankOrFlexiNumber"].Value = ObjCVarOperationContainersAndPackages.TankOrFlexiNumber;
                        Com.Parameters["@OperatorID"].Value = ObjCVarOperationContainersAndPackages.OperatorID;
                        Com.Parameters["@WeightUnit"].Value = ObjCVarOperationContainersAndPackages.WeightUnit;
                        Com.Parameters["@RateClass"].Value = ObjCVarOperationContainersAndPackages.RateClass;
                        Com.Parameters["@IsFull"].Value = ObjCVarOperationContainersAndPackages.IsFull;
                        Com.Parameters["@ExitDate"].Value = ObjCVarOperationContainersAndPackages.ExitDate;
                        Com.Parameters["@ReturnDate"].Value = ObjCVarOperationContainersAndPackages.ReturnDate;
                        Com.Parameters["@FreeDays"].Value = ObjCVarOperationContainersAndPackages.FreeDays;
                        Com.Parameters["@DayValue"].Value = ObjCVarOperationContainersAndPackages.DayValue;
                        Com.Parameters["@YardEIRNumber"].Value = ObjCVarOperationContainersAndPackages.YardEIRNumber;
                        Com.Parameters["@YardInDate"].Value = ObjCVarOperationContainersAndPackages.YardInDate;
                        Com.Parameters["@YardInTime"].Value = ObjCVarOperationContainersAndPackages.YardInTime;
                        Com.Parameters["@YardOutDate"].Value = ObjCVarOperationContainersAndPackages.YardOutDate;
                        Com.Parameters["@YardOutTime"].Value = ObjCVarOperationContainersAndPackages.YardOutTime;
                        Com.Parameters["@YardLocationID"].Value = ObjCVarOperationContainersAndPackages.YardLocationID;
                        Com.Parameters["@YardIsIn"].Value = ObjCVarOperationContainersAndPackages.YardIsIn;
                        Com.Parameters["@YardEIRNumberOut"].Value = ObjCVarOperationContainersAndPackages.YardEIRNumberOut;
                        Com.Parameters["@IsSentToWarehouse"].Value = ObjCVarOperationContainersAndPackages.IsSentToWarehouse;
                        EndTrans(Com, Con);
                        if (ObjCVarOperationContainersAndPackages.ID == 0)
                        {
                            ObjCVarOperationContainersAndPackages.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarOperationContainersAndPackages.mIsChanges = false;
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
