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
    public class CPKvwReceivables_Preview
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
    public partial class CVarvwReceivables_Preview : CPKvwReceivables_Preview
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationID;
        internal Int32 mChargeTypeID;
        internal Int32 mPOrC;
        internal Int32 mSupplierID;
        internal Int32 mMeasurementID;
        internal Int32 mContainerTypeID;
        internal Int32 mPackageTypeID;
        internal Decimal mQuantity;
        internal Decimal mCostPrice;
        internal Decimal mCostAmount;
        internal Decimal mSalePrice;
        internal Decimal mSaleAmount;
        internal Decimal mExchangeRate;
        internal Int32 mCurrencyID;
        internal Int64 mInvoiceID;
        internal Int64 mAccNoteID;
        internal String mAccNoteCode;
        internal Decimal mTaxPercentage;
        internal Int32 mTaxTypeID;
        internal String mTaxTypeName;
        internal Decimal mDiscountPercentage;
        internal Int64 mGeneratingQRID;
        internal String mNotes;
        internal Boolean mIsDeleted;
        internal DateTime mCreationDate;
        internal DateTime mModificationDate;
        internal String mChargeTypeCode;
        internal String mChargeTypeName;
        internal String mChargeTypeLocalName;
        internal String mCode;
        internal String mName;
        internal Boolean mIsDefaultInOperations;
        internal Boolean mIsDefaultInQuotation;
        internal Boolean mIsOcean;
        internal Boolean mIsAir;
        internal Boolean mIsInland;
        internal Boolean mIsInactive;
        internal Boolean mIsUsedInPayable;
        internal Boolean mIsUsedInReceivable;
        internal String mOperationCode;
        internal Int32 mShipmentType;
        internal Int32 mPOL;
        internal String mPOLName;
        internal Int32 mPOD;
        internal String mPODName;
        internal Int64 mMasterOperationID;
        internal String mMasterOperationCode;
        internal String mMasterBL;
        internal Int64 mBillID;
        internal String mMeasurementCode;
        internal String mMeasurementName;
        internal String mPOrCCode;
        internal String mPOrCName;
        internal Int32 mSupplierCode;
        internal String mSupplierName;
        internal String mSupplierLocalName;
        internal String mContainerTypeCode;
        internal String mContainerTypeName;
        internal String mPackageTypeCode;
        internal String mPackageTypeName;
        internal String mCurrencyCode;
        internal Int32 mViewOrder;
        internal Int64 mInvoiceNumber;
        internal DateTime mInvoiceDate;
        internal Int32 mInvoiceYear;
        internal String mInvoiceTypeName;
        internal Int64 mPayableID;
        internal Int64 mBillTo;
        internal String mBillToName;
        internal String mCreatorName;
        internal String mCreatorLocalName;
        internal String mModificatorName;
        internal String mModificatorLocalName;
        internal String mInvoiceBL;
        internal String mAccNoteBL;
        internal String mPayableHouseNumber;
        internal String mPayableCertificateNumber;
        internal Decimal mPayCertificateGrossWeight;
        internal DateTime mIssueDate;
        internal Int32 mTrailerID;
        internal String mTrailerName;
        internal Int64 mOperationContainersAndPackagesID;
        internal String mContainerNumber;
        internal String mTankOrFlexiNumber;
        internal Boolean mIsLoaded;
        internal Int32 mOperatorID;
        internal Int64 mDraftInvoiceID;
        internal Decimal mTaxAmount;
        internal Int32 mDiscountTypeID;
        internal Decimal mDiscountAmount;
        internal Decimal mAmountWithoutVAT;
        internal Int64 mHouseBillID;
        internal Int64 mOperationVehicleID;
        internal String mMotorNumber;
        internal String mChassisNumber;
        internal Int64 mTruckingOrderID;
        internal Int32 mLoadingZoneID;
        internal String mLoadingZoneName;
        internal Int32 mFirstCuringAreaID;
        internal String mFirstCuringAreaName;
        internal Int32 mSecondCuringAreaID;
        internal String mSecondCuringAreaName;
        internal Int32 mThirdCuringAreaID;
        internal String mThirdCuringAreaName;
        internal Int32 mTruckID;
        internal String mTruckNumber;
        internal DateTime mPreviousCutOffDate;
        internal DateTime mCutOffDate;
        internal Boolean mIsFleet;
        internal Boolean mIs3PL;
        internal Int64 mVehicleAgingReportID;
        #endregion

        #region "Methods"
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public Int32 ChargeTypeID
        {
            get { return mChargeTypeID; }
            set { mChargeTypeID = value; }
        }
        public Int32 POrC
        {
            get { return mPOrC; }
            set { mPOrC = value; }
        }
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mSupplierID = value; }
        }
        public Int32 MeasurementID
        {
            get { return mMeasurementID; }
            set { mMeasurementID = value; }
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
        public Decimal Quantity
        {
            get { return mQuantity; }
            set { mQuantity = value; }
        }
        public Decimal CostPrice
        {
            get { return mCostPrice; }
            set { mCostPrice = value; }
        }
        public Decimal CostAmount
        {
            get { return mCostAmount; }
            set { mCostAmount = value; }
        }
        public Decimal SalePrice
        {
            get { return mSalePrice; }
            set { mSalePrice = value; }
        }
        public Decimal SaleAmount
        {
            get { return mSaleAmount; }
            set { mSaleAmount = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mExchangeRate = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mInvoiceID = value; }
        }
        public Int64 AccNoteID
        {
            get { return mAccNoteID; }
            set { mAccNoteID = value; }
        }
        public String AccNoteCode
        {
            get { return mAccNoteCode; }
            set { mAccNoteCode = value; }
        }
        public Decimal TaxPercentage
        {
            get { return mTaxPercentage; }
            set { mTaxPercentage = value; }
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
        public Decimal DiscountPercentage
        {
            get { return mDiscountPercentage; }
            set { mDiscountPercentage = value; }
        }
        public Int64 GeneratingQRID
        {
            get { return mGeneratingQRID; }
            set { mGeneratingQRID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mModificationDate = value; }
        }
        public String ChargeTypeCode
        {
            get { return mChargeTypeCode; }
            set { mChargeTypeCode = value; }
        }
        public String ChargeTypeName
        {
            get { return mChargeTypeName; }
            set { mChargeTypeName = value; }
        }
        public String ChargeTypeLocalName
        {
            get { return mChargeTypeLocalName; }
            set { mChargeTypeLocalName = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public Boolean IsDefaultInOperations
        {
            get { return mIsDefaultInOperations; }
            set { mIsDefaultInOperations = value; }
        }
        public Boolean IsDefaultInQuotation
        {
            get { return mIsDefaultInQuotation; }
            set { mIsDefaultInQuotation = value; }
        }
        public Boolean IsOcean
        {
            get { return mIsOcean; }
            set { mIsOcean = value; }
        }
        public Boolean IsAir
        {
            get { return mIsAir; }
            set { mIsAir = value; }
        }
        public Boolean IsInland
        {
            get { return mIsInland; }
            set { mIsInland = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsInactive = value; }
        }
        public Boolean IsUsedInPayable
        {
            get { return mIsUsedInPayable; }
            set { mIsUsedInPayable = value; }
        }
        public Boolean IsUsedInReceivable
        {
            get { return mIsUsedInReceivable; }
            set { mIsUsedInReceivable = value; }
        }
        public String OperationCode
        {
            get { return mOperationCode; }
            set { mOperationCode = value; }
        }
        public Int32 ShipmentType
        {
            get { return mShipmentType; }
            set { mShipmentType = value; }
        }
        public Int32 POL
        {
            get { return mPOL; }
            set { mPOL = value; }
        }
        public String POLName
        {
            get { return mPOLName; }
            set { mPOLName = value; }
        }
        public Int32 POD
        {
            get { return mPOD; }
            set { mPOD = value; }
        }
        public String PODName
        {
            get { return mPODName; }
            set { mPODName = value; }
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
        public String MasterBL
        {
            get { return mMasterBL; }
            set { mMasterBL = value; }
        }
        public Int64 BillID
        {
            get { return mBillID; }
            set { mBillID = value; }
        }
        public String MeasurementCode
        {
            get { return mMeasurementCode; }
            set { mMeasurementCode = value; }
        }
        public String MeasurementName
        {
            get { return mMeasurementName; }
            set { mMeasurementName = value; }
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
        public Int32 SupplierCode
        {
            get { return mSupplierCode; }
            set { mSupplierCode = value; }
        }
        public String SupplierName
        {
            get { return mSupplierName; }
            set { mSupplierName = value; }
        }
        public String SupplierLocalName
        {
            get { return mSupplierLocalName; }
            set { mSupplierLocalName = value; }
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
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
        }
        public Int32 ViewOrder
        {
            get { return mViewOrder; }
            set { mViewOrder = value; }
        }
        public Int64 InvoiceNumber
        {
            get { return mInvoiceNumber; }
            set { mInvoiceNumber = value; }
        }
        public DateTime InvoiceDate
        {
            get { return mInvoiceDate; }
            set { mInvoiceDate = value; }
        }
        public Int32 InvoiceYear
        {
            get { return mInvoiceYear; }
            set { mInvoiceYear = value; }
        }
        public String InvoiceTypeName
        {
            get { return mInvoiceTypeName; }
            set { mInvoiceTypeName = value; }
        }
        public Int64 PayableID
        {
            get { return mPayableID; }
            set { mPayableID = value; }
        }
        public Int64 BillTo
        {
            get { return mBillTo; }
            set { mBillTo = value; }
        }
        public String BillToName
        {
            get { return mBillToName; }
            set { mBillToName = value; }
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
        public String InvoiceBL
        {
            get { return mInvoiceBL; }
            set { mInvoiceBL = value; }
        }
        public String AccNoteBL
        {
            get { return mAccNoteBL; }
            set { mAccNoteBL = value; }
        }
        public String PayableHouseNumber
        {
            get { return mPayableHouseNumber; }
            set { mPayableHouseNumber = value; }
        }
        public String PayableCertificateNumber
        {
            get { return mPayableCertificateNumber; }
            set { mPayableCertificateNumber = value; }
        }
        public Decimal PayCertificateGrossWeight
        {
            get { return mPayCertificateGrossWeight; }
            set { mPayCertificateGrossWeight = value; }
        }
        public DateTime IssueDate
        {
            get { return mIssueDate; }
            set { mIssueDate = value; }
        }
        public Int32 TrailerID
        {
            get { return mTrailerID; }
            set { mTrailerID = value; }
        }
        public String TrailerName
        {
            get { return mTrailerName; }
            set { mTrailerName = value; }
        }
        public Int64 OperationContainersAndPackagesID
        {
            get { return mOperationContainersAndPackagesID; }
            set { mOperationContainersAndPackagesID = value; }
        }
        public String ContainerNumber
        {
            get { return mContainerNumber; }
            set { mContainerNumber = value; }
        }
        public String TankOrFlexiNumber
        {
            get { return mTankOrFlexiNumber; }
            set { mTankOrFlexiNumber = value; }
        }
        public Boolean IsLoaded
        {
            get { return mIsLoaded; }
            set { mIsLoaded = value; }
        }
        public Int32 OperatorID
        {
            get { return mOperatorID; }
            set { mOperatorID = value; }
        }
        public Int64 DraftInvoiceID
        {
            get { return mDraftInvoiceID; }
            set { mDraftInvoiceID = value; }
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
        public Decimal DiscountAmount
        {
            get { return mDiscountAmount; }
            set { mDiscountAmount = value; }
        }
        public Decimal AmountWithoutVAT
        {
            get { return mAmountWithoutVAT; }
            set { mAmountWithoutVAT = value; }
        }
        public Int64 HouseBillID
        {
            get { return mHouseBillID; }
            set { mHouseBillID = value; }
        }
        public Int64 OperationVehicleID
        {
            get { return mOperationVehicleID; }
            set { mOperationVehicleID = value; }
        }
        public String MotorNumber
        {
            get { return mMotorNumber; }
            set { mMotorNumber = value; }
        }
        public String ChassisNumber
        {
            get { return mChassisNumber; }
            set { mChassisNumber = value; }
        }
        public Int64 TruckingOrderID
        {
            get { return mTruckingOrderID; }
            set { mTruckingOrderID = value; }
        }
        public Int32 LoadingZoneID
        {
            get { return mLoadingZoneID; }
            set { mLoadingZoneID = value; }
        }
        public String LoadingZoneName
        {
            get { return mLoadingZoneName; }
            set { mLoadingZoneName = value; }
        }
        public Int32 FirstCuringAreaID
        {
            get { return mFirstCuringAreaID; }
            set { mFirstCuringAreaID = value; }
        }
        public String FirstCuringAreaName
        {
            get { return mFirstCuringAreaName; }
            set { mFirstCuringAreaName = value; }
        }
        public Int32 SecondCuringAreaID
        {
            get { return mSecondCuringAreaID; }
            set { mSecondCuringAreaID = value; }
        }
        public String SecondCuringAreaName
        {
            get { return mSecondCuringAreaName; }
            set { mSecondCuringAreaName = value; }
        }
        public Int32 ThirdCuringAreaID
        {
            get { return mThirdCuringAreaID; }
            set { mThirdCuringAreaID = value; }
        }
        public String ThirdCuringAreaName
        {
            get { return mThirdCuringAreaName; }
            set { mThirdCuringAreaName = value; }
        }
        public Int32 TruckID
        {
            get { return mTruckID; }
            set { mTruckID = value; }
        }
        public String TruckNumber
        {
            get { return mTruckNumber; }
            set { mTruckNumber = value; }
        }
        public DateTime PreviousCutOffDate
        {
            get { return mPreviousCutOffDate; }
            set { mPreviousCutOffDate = value; }
        }
        public DateTime CutOffDate
        {
            get { return mCutOffDate; }
            set { mCutOffDate = value; }
        }
        public Boolean IsFleet
        {
            get { return mIsFleet; }
            set { mIsFleet = value; }
        }
        public Boolean Is3PL
        {
            get { return mIs3PL; }
            set { mIs3PL = value; }
        }
        public Int64 VehicleAgingReportID
        {
            get { return mVehicleAgingReportID; }
            set { mVehicleAgingReportID = value; }
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

    public partial class CvwReceivables_Preview
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
        public List<CVarvwReceivables_Preview> lstCVarvwReceivables_Preview = new List<CVarvwReceivables_Preview>();
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
            lstCVarvwReceivables_Preview.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwReceivables_Preview";
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
                        CVarvwReceivables_Preview ObjCVarvwReceivables_Preview = new CVarvwReceivables_Preview();
                        ObjCVarvwReceivables_Preview.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwReceivables_Preview.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwReceivables_Preview.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwReceivables_Preview.mPOrC = Convert.ToInt32(dr["POrC"].ToString());
                        ObjCVarvwReceivables_Preview.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwReceivables_Preview.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        ObjCVarvwReceivables_Preview.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarvwReceivables_Preview.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwReceivables_Preview.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
                        ObjCVarvwReceivables_Preview.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarvwReceivables_Preview.mCostAmount = Convert.ToDecimal(dr["CostAmount"].ToString());
                        ObjCVarvwReceivables_Preview.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarvwReceivables_Preview.mSaleAmount = Convert.ToDecimal(dr["SaleAmount"].ToString());
                        ObjCVarvwReceivables_Preview.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwReceivables_Preview.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwReceivables_Preview.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvwReceivables_Preview.mAccNoteID = Convert.ToInt64(dr["AccNoteID"].ToString());
                        ObjCVarvwReceivables_Preview.mAccNoteCode = Convert.ToString(dr["AccNoteCode"].ToString());
                        ObjCVarvwReceivables_Preview.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarvwReceivables_Preview.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarvwReceivables_Preview.mTaxTypeName = Convert.ToString(dr["TaxTypeName"].ToString());
                        ObjCVarvwReceivables_Preview.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwReceivables_Preview.mGeneratingQRID = Convert.ToInt64(dr["GeneratingQRID"].ToString());
                        ObjCVarvwReceivables_Preview.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwReceivables_Preview.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwReceivables_Preview.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwReceivables_Preview.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwReceivables_Preview.mChargeTypeCode = Convert.ToString(dr["ChargeTypeCode"].ToString());
                        ObjCVarvwReceivables_Preview.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwReceivables_Preview.mChargeTypeLocalName = Convert.ToString(dr["ChargeTypeLocalName"].ToString());
                        ObjCVarvwReceivables_Preview.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwReceivables_Preview.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwReceivables_Preview.mIsDefaultInOperations = Convert.ToBoolean(dr["IsDefaultInOperations"].ToString());
                        ObjCVarvwReceivables_Preview.mIsDefaultInQuotation = Convert.ToBoolean(dr["IsDefaultInQuotation"].ToString());
                        ObjCVarvwReceivables_Preview.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarvwReceivables_Preview.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarvwReceivables_Preview.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarvwReceivables_Preview.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwReceivables_Preview.mIsUsedInPayable = Convert.ToBoolean(dr["IsUsedInPayable"].ToString());
                        ObjCVarvwReceivables_Preview.mIsUsedInReceivable = Convert.ToBoolean(dr["IsUsedInReceivable"].ToString());
                        ObjCVarvwReceivables_Preview.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwReceivables_Preview.mShipmentType = Convert.ToInt32(dr["ShipmentType"].ToString());
                        ObjCVarvwReceivables_Preview.mPOL = Convert.ToInt32(dr["POL"].ToString());
                        ObjCVarvwReceivables_Preview.mPOLName = Convert.ToString(dr["POLName"].ToString());
                        ObjCVarvwReceivables_Preview.mPOD = Convert.ToInt32(dr["POD"].ToString());
                        ObjCVarvwReceivables_Preview.mPODName = Convert.ToString(dr["PODName"].ToString());
                        ObjCVarvwReceivables_Preview.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwReceivables_Preview.mMasterOperationCode = Convert.ToString(dr["MasterOperationCode"].ToString());
                        ObjCVarvwReceivables_Preview.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwReceivables_Preview.mBillID = Convert.ToInt64(dr["BillID"].ToString());
                        ObjCVarvwReceivables_Preview.mMeasurementCode = Convert.ToString(dr["MeasurementCode"].ToString());
                        ObjCVarvwReceivables_Preview.mMeasurementName = Convert.ToString(dr["MeasurementName"].ToString());
                        ObjCVarvwReceivables_Preview.mPOrCCode = Convert.ToString(dr["POrCCode"].ToString());
                        ObjCVarvwReceivables_Preview.mPOrCName = Convert.ToString(dr["POrCName"].ToString());
                        ObjCVarvwReceivables_Preview.mSupplierCode = Convert.ToInt32(dr["SupplierCode"].ToString());
                        ObjCVarvwReceivables_Preview.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwReceivables_Preview.mSupplierLocalName = Convert.ToString(dr["SupplierLocalName"].ToString());
                        ObjCVarvwReceivables_Preview.mContainerTypeCode = Convert.ToString(dr["ContainerTypeCode"].ToString());
                        ObjCVarvwReceivables_Preview.mContainerTypeName = Convert.ToString(dr["ContainerTypeName"].ToString());
                        ObjCVarvwReceivables_Preview.mPackageTypeCode = Convert.ToString(dr["PackageTypeCode"].ToString());
                        ObjCVarvwReceivables_Preview.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwReceivables_Preview.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwReceivables_Preview.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarvwReceivables_Preview.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwReceivables_Preview.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwReceivables_Preview.mInvoiceYear = Convert.ToInt32(dr["InvoiceYear"].ToString());
                        ObjCVarvwReceivables_Preview.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        ObjCVarvwReceivables_Preview.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        ObjCVarvwReceivables_Preview.mBillTo = Convert.ToInt64(dr["BillTo"].ToString());
                        ObjCVarvwReceivables_Preview.mBillToName = Convert.ToString(dr["BillToName"].ToString());
                        ObjCVarvwReceivables_Preview.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwReceivables_Preview.mCreatorLocalName = Convert.ToString(dr["CreatorLocalName"].ToString());
                        ObjCVarvwReceivables_Preview.mModificatorName = Convert.ToString(dr["ModificatorName"].ToString());
                        ObjCVarvwReceivables_Preview.mModificatorLocalName = Convert.ToString(dr["ModificatorLocalName"].ToString());
                        ObjCVarvwReceivables_Preview.mInvoiceBL = Convert.ToString(dr["InvoiceBL"].ToString());
                        ObjCVarvwReceivables_Preview.mAccNoteBL = Convert.ToString(dr["AccNoteBL"].ToString());
                        ObjCVarvwReceivables_Preview.mPayableHouseNumber = Convert.ToString(dr["PayableHouseNumber"].ToString());
                        ObjCVarvwReceivables_Preview.mPayableCertificateNumber = Convert.ToString(dr["PayableCertificateNumber"].ToString());
                        ObjCVarvwReceivables_Preview.mPayCertificateGrossWeight = Convert.ToDecimal(dr["PayCertificateGrossWeight"].ToString());
                        ObjCVarvwReceivables_Preview.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvwReceivables_Preview.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarvwReceivables_Preview.mTrailerName = Convert.ToString(dr["TrailerName"].ToString());
                        ObjCVarvwReceivables_Preview.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarvwReceivables_Preview.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarvwReceivables_Preview.mTankOrFlexiNumber = Convert.ToString(dr["TankOrFlexiNumber"].ToString());
                        ObjCVarvwReceivables_Preview.mIsLoaded = Convert.ToBoolean(dr["IsLoaded"].ToString());
                        ObjCVarvwReceivables_Preview.mOperatorID = Convert.ToInt32(dr["OperatorID"].ToString());
                        ObjCVarvwReceivables_Preview.mDraftInvoiceID = Convert.ToInt64(dr["DraftInvoiceID"].ToString());
                        ObjCVarvwReceivables_Preview.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarvwReceivables_Preview.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarvwReceivables_Preview.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarvwReceivables_Preview.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarvwReceivables_Preview.mHouseBillID = Convert.ToInt64(dr["HouseBillID"].ToString());
                        ObjCVarvwReceivables_Preview.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarvwReceivables_Preview.mMotorNumber = Convert.ToString(dr["MotorNumber"].ToString());
                        ObjCVarvwReceivables_Preview.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
                        ObjCVarvwReceivables_Preview.mTruckingOrderID = Convert.ToInt64(dr["TruckingOrderID"].ToString());
                        ObjCVarvwReceivables_Preview.mLoadingZoneID = Convert.ToInt32(dr["LoadingZoneID"].ToString());
                        ObjCVarvwReceivables_Preview.mLoadingZoneName = Convert.ToString(dr["LoadingZoneName"].ToString());
                        ObjCVarvwReceivables_Preview.mFirstCuringAreaID = Convert.ToInt32(dr["FirstCuringAreaID"].ToString());
                        ObjCVarvwReceivables_Preview.mFirstCuringAreaName = Convert.ToString(dr["FirstCuringAreaName"].ToString());
                        ObjCVarvwReceivables_Preview.mSecondCuringAreaID = Convert.ToInt32(dr["SecondCuringAreaID"].ToString());
                        ObjCVarvwReceivables_Preview.mSecondCuringAreaName = Convert.ToString(dr["SecondCuringAreaName"].ToString());
                        ObjCVarvwReceivables_Preview.mThirdCuringAreaID = Convert.ToInt32(dr["ThirdCuringAreaID"].ToString());
                        ObjCVarvwReceivables_Preview.mThirdCuringAreaName = Convert.ToString(dr["ThirdCuringAreaName"].ToString());
                        ObjCVarvwReceivables_Preview.mTruckID = Convert.ToInt32(dr["TruckID"].ToString());
                        ObjCVarvwReceivables_Preview.mTruckNumber = Convert.ToString(dr["TruckNumber"].ToString());
                        ObjCVarvwReceivables_Preview.mPreviousCutOffDate = Convert.ToDateTime(dr["PreviousCutOffDate"].ToString());
                        ObjCVarvwReceivables_Preview.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarvwReceivables_Preview.mIsFleet = Convert.ToBoolean(dr["IsFleet"].ToString());
                        ObjCVarvwReceivables_Preview.mIs3PL = Convert.ToBoolean(dr["Is3PL"].ToString());
                        ObjCVarvwReceivables_Preview.mVehicleAgingReportID = Convert.ToInt64(dr["VehicleAgingReportID"].ToString());
                        lstCVarvwReceivables_Preview.Add(ObjCVarvwReceivables_Preview);
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
            lstCVarvwReceivables_Preview.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwReceivables_Preview";
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
                        CVarvwReceivables_Preview ObjCVarvwReceivables_Preview = new CVarvwReceivables_Preview();
                        ObjCVarvwReceivables_Preview.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwReceivables_Preview.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwReceivables_Preview.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwReceivables_Preview.mPOrC = Convert.ToInt32(dr["POrC"].ToString());
                        ObjCVarvwReceivables_Preview.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwReceivables_Preview.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        ObjCVarvwReceivables_Preview.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarvwReceivables_Preview.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwReceivables_Preview.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
                        ObjCVarvwReceivables_Preview.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarvwReceivables_Preview.mCostAmount = Convert.ToDecimal(dr["CostAmount"].ToString());
                        ObjCVarvwReceivables_Preview.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarvwReceivables_Preview.mSaleAmount = Convert.ToDecimal(dr["SaleAmount"].ToString());
                        ObjCVarvwReceivables_Preview.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwReceivables_Preview.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwReceivables_Preview.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvwReceivables_Preview.mAccNoteID = Convert.ToInt64(dr["AccNoteID"].ToString());
                        ObjCVarvwReceivables_Preview.mAccNoteCode = Convert.ToString(dr["AccNoteCode"].ToString());
                        ObjCVarvwReceivables_Preview.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarvwReceivables_Preview.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarvwReceivables_Preview.mTaxTypeName = Convert.ToString(dr["TaxTypeName"].ToString());
                        ObjCVarvwReceivables_Preview.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwReceivables_Preview.mGeneratingQRID = Convert.ToInt64(dr["GeneratingQRID"].ToString());
                        ObjCVarvwReceivables_Preview.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwReceivables_Preview.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwReceivables_Preview.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwReceivables_Preview.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwReceivables_Preview.mChargeTypeCode = Convert.ToString(dr["ChargeTypeCode"].ToString());
                        ObjCVarvwReceivables_Preview.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwReceivables_Preview.mChargeTypeLocalName = Convert.ToString(dr["ChargeTypeLocalName"].ToString());
                        ObjCVarvwReceivables_Preview.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwReceivables_Preview.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwReceivables_Preview.mIsDefaultInOperations = Convert.ToBoolean(dr["IsDefaultInOperations"].ToString());
                        ObjCVarvwReceivables_Preview.mIsDefaultInQuotation = Convert.ToBoolean(dr["IsDefaultInQuotation"].ToString());
                        ObjCVarvwReceivables_Preview.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarvwReceivables_Preview.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarvwReceivables_Preview.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarvwReceivables_Preview.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwReceivables_Preview.mIsUsedInPayable = Convert.ToBoolean(dr["IsUsedInPayable"].ToString());
                        ObjCVarvwReceivables_Preview.mIsUsedInReceivable = Convert.ToBoolean(dr["IsUsedInReceivable"].ToString());
                        ObjCVarvwReceivables_Preview.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwReceivables_Preview.mShipmentType = Convert.ToInt32(dr["ShipmentType"].ToString());
                        ObjCVarvwReceivables_Preview.mPOL = Convert.ToInt32(dr["POL"].ToString());
                        ObjCVarvwReceivables_Preview.mPOLName = Convert.ToString(dr["POLName"].ToString());
                        ObjCVarvwReceivables_Preview.mPOD = Convert.ToInt32(dr["POD"].ToString());
                        ObjCVarvwReceivables_Preview.mPODName = Convert.ToString(dr["PODName"].ToString());
                        ObjCVarvwReceivables_Preview.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwReceivables_Preview.mMasterOperationCode = Convert.ToString(dr["MasterOperationCode"].ToString());
                        ObjCVarvwReceivables_Preview.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwReceivables_Preview.mBillID = Convert.ToInt64(dr["BillID"].ToString());
                        ObjCVarvwReceivables_Preview.mMeasurementCode = Convert.ToString(dr["MeasurementCode"].ToString());
                        ObjCVarvwReceivables_Preview.mMeasurementName = Convert.ToString(dr["MeasurementName"].ToString());
                        ObjCVarvwReceivables_Preview.mPOrCCode = Convert.ToString(dr["POrCCode"].ToString());
                        ObjCVarvwReceivables_Preview.mPOrCName = Convert.ToString(dr["POrCName"].ToString());
                        ObjCVarvwReceivables_Preview.mSupplierCode = Convert.ToInt32(dr["SupplierCode"].ToString());
                        ObjCVarvwReceivables_Preview.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwReceivables_Preview.mSupplierLocalName = Convert.ToString(dr["SupplierLocalName"].ToString());
                        ObjCVarvwReceivables_Preview.mContainerTypeCode = Convert.ToString(dr["ContainerTypeCode"].ToString());
                        ObjCVarvwReceivables_Preview.mContainerTypeName = Convert.ToString(dr["ContainerTypeName"].ToString());
                        ObjCVarvwReceivables_Preview.mPackageTypeCode = Convert.ToString(dr["PackageTypeCode"].ToString());
                        ObjCVarvwReceivables_Preview.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwReceivables_Preview.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwReceivables_Preview.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarvwReceivables_Preview.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwReceivables_Preview.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwReceivables_Preview.mInvoiceYear = Convert.ToInt32(dr["InvoiceYear"].ToString());
                        ObjCVarvwReceivables_Preview.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        ObjCVarvwReceivables_Preview.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        ObjCVarvwReceivables_Preview.mBillTo = Convert.ToInt64(dr["BillTo"].ToString());
                        ObjCVarvwReceivables_Preview.mBillToName = Convert.ToString(dr["BillToName"].ToString());
                        ObjCVarvwReceivables_Preview.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwReceivables_Preview.mCreatorLocalName = Convert.ToString(dr["CreatorLocalName"].ToString());
                        ObjCVarvwReceivables_Preview.mModificatorName = Convert.ToString(dr["ModificatorName"].ToString());
                        ObjCVarvwReceivables_Preview.mModificatorLocalName = Convert.ToString(dr["ModificatorLocalName"].ToString());
                        ObjCVarvwReceivables_Preview.mInvoiceBL = Convert.ToString(dr["InvoiceBL"].ToString());
                        ObjCVarvwReceivables_Preview.mAccNoteBL = Convert.ToString(dr["AccNoteBL"].ToString());
                        ObjCVarvwReceivables_Preview.mPayableHouseNumber = Convert.ToString(dr["PayableHouseNumber"].ToString());
                        ObjCVarvwReceivables_Preview.mPayableCertificateNumber = Convert.ToString(dr["PayableCertificateNumber"].ToString());
                        ObjCVarvwReceivables_Preview.mPayCertificateGrossWeight = Convert.ToDecimal(dr["PayCertificateGrossWeight"].ToString());
                        ObjCVarvwReceivables_Preview.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvwReceivables_Preview.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarvwReceivables_Preview.mTrailerName = Convert.ToString(dr["TrailerName"].ToString());
                        ObjCVarvwReceivables_Preview.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarvwReceivables_Preview.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarvwReceivables_Preview.mTankOrFlexiNumber = Convert.ToString(dr["TankOrFlexiNumber"].ToString());
                        ObjCVarvwReceivables_Preview.mIsLoaded = Convert.ToBoolean(dr["IsLoaded"].ToString());
                        ObjCVarvwReceivables_Preview.mOperatorID = Convert.ToInt32(dr["OperatorID"].ToString());
                        ObjCVarvwReceivables_Preview.mDraftInvoiceID = Convert.ToInt64(dr["DraftInvoiceID"].ToString());
                        ObjCVarvwReceivables_Preview.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarvwReceivables_Preview.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarvwReceivables_Preview.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarvwReceivables_Preview.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarvwReceivables_Preview.mHouseBillID = Convert.ToInt64(dr["HouseBillID"].ToString());
                        ObjCVarvwReceivables_Preview.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarvwReceivables_Preview.mMotorNumber = Convert.ToString(dr["MotorNumber"].ToString());
                        ObjCVarvwReceivables_Preview.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
                        ObjCVarvwReceivables_Preview.mTruckingOrderID = Convert.ToInt64(dr["TruckingOrderID"].ToString());
                        ObjCVarvwReceivables_Preview.mLoadingZoneID = Convert.ToInt32(dr["LoadingZoneID"].ToString());
                        ObjCVarvwReceivables_Preview.mLoadingZoneName = Convert.ToString(dr["LoadingZoneName"].ToString());
                        ObjCVarvwReceivables_Preview.mFirstCuringAreaID = Convert.ToInt32(dr["FirstCuringAreaID"].ToString());
                        ObjCVarvwReceivables_Preview.mFirstCuringAreaName = Convert.ToString(dr["FirstCuringAreaName"].ToString());
                        ObjCVarvwReceivables_Preview.mSecondCuringAreaID = Convert.ToInt32(dr["SecondCuringAreaID"].ToString());
                        ObjCVarvwReceivables_Preview.mSecondCuringAreaName = Convert.ToString(dr["SecondCuringAreaName"].ToString());
                        ObjCVarvwReceivables_Preview.mThirdCuringAreaID = Convert.ToInt32(dr["ThirdCuringAreaID"].ToString());
                        ObjCVarvwReceivables_Preview.mThirdCuringAreaName = Convert.ToString(dr["ThirdCuringAreaName"].ToString());
                        ObjCVarvwReceivables_Preview.mTruckID = Convert.ToInt32(dr["TruckID"].ToString());
                        ObjCVarvwReceivables_Preview.mTruckNumber = Convert.ToString(dr["TruckNumber"].ToString());
                        ObjCVarvwReceivables_Preview.mPreviousCutOffDate = Convert.ToDateTime(dr["PreviousCutOffDate"].ToString());
                        ObjCVarvwReceivables_Preview.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarvwReceivables_Preview.mIsFleet = Convert.ToBoolean(dr["IsFleet"].ToString());
                        ObjCVarvwReceivables_Preview.mIs3PL = Convert.ToBoolean(dr["Is3PL"].ToString());
                        ObjCVarvwReceivables_Preview.mVehicleAgingReportID = Convert.ToInt64(dr["VehicleAgingReportID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwReceivables_Preview.Add(ObjCVarvwReceivables_Preview);
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
