using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
//Com.CommandTimeout = 2000;
//Com.CommandTimeout = 2000;
//Change Manually: Don't Generate;
//Change Manually: Don't Generate;
//Change Manually: Don't Generate;
//Change Manually: Don't Generate;
//Change Manually: Don't Generate;
namespace Forwarding.MvcApp.Models.Operations.Operations.Customized
{
    [Serializable]
    public class CPKvwOperationsStatistics_FilterInvoices
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
    public partial class CVarvwOperationsStatistics_FilterInvoices : CPKvwOperationsStatistics_FilterInvoices
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal Int32 mCodeSerial;
        internal Int32 mDirectionType;
        internal Int32 mTransportType;
        internal Int32 mBLType;
        internal Int64 mMasterOperationID;
        internal String mMasterBL;
        internal Int32 mBranchID;
        internal String mBranchName;
        internal Int32 mSalesmanID;
        internal String mSalesman;
        internal Int32 mCreatorUserID;
        internal String mOpenedBy;
        internal Int32 mShipmentType;
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
        internal Int32 mIncotermID;
        internal String mIncotermName;
        internal Int64 mQuotationRouteID;
        internal String mQuotationRouteCode;
        internal String mCertificateNumber;
        internal String mCertificateValue;
        internal String mCertificateDate;
        internal String mQasimaNumber;
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
        internal String mFirstInvoiceDate;
        internal String mHouseBLs;
        internal String mBookingNumbers;
        internal Int32 mTEUs;
        internal String mTrackingStageName;
        internal String mAllTrackingStages;
        internal Decimal mGrossWeightSum;
        internal Decimal mNetWeightSum;
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
        internal Decimal mReceivablesWithoutVAT;
        internal Decimal mPayables;
        internal Decimal mReceivables;
        internal String mTruckersName;
        internal String mQuotationCode;
        internal Int32 mOperationWithInvoiceSerial;
        internal String mForm13Number;
        internal String mACIDNumber;
        #endregion

        #region "Methods"
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
        public String FirstInvoiceDate
        {
            get { return mFirstInvoiceDate; }
            set { mFirstInvoiceDate = value; }
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
        public Decimal GrossWeightSum
        {
            get { return mGrossWeightSum; }
            set { mGrossWeightSum = value; }
        }
        public Decimal NetWeightSum
        {
            get { return mNetWeightSum; }
            set { mNetWeightSum = value; }
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
        public Decimal Receivables
        {
            get { return mReceivables; }
            set { mReceivables = value; }
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

    public partial class CvwOperationsStatistics_FilterInvoices
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
        public List<CVarvwOperationsStatistics_FilterInvoices> lstCVarvwOperationsStatistics_FilterInvoices = new List<CVarvwOperationsStatistics_FilterInvoices>();
        #endregion

        #region "Select Methods"
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
            lstCVarvwOperationsStatistics_FilterInvoices.Clear();

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
                Com.CommandTimeout = 2000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwOperationsStatistics_FilterInvoices ObjCVarvwOperationsStatistics_FilterInvoices = new CVarvwOperationsStatistics_FilterInvoices();
                        ObjCVarvwOperationsStatistics_FilterInvoices.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mBLType = Convert.ToInt32(dr["BLType"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mSalesmanID = Convert.ToInt32(dr["SalesmanID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mSalesman = Convert.ToString(dr["Salesman"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mOpenedBy = Convert.ToString(dr["OpenedBy"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mShipmentType = Convert.ToInt32(dr["ShipmentType"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mOperationManID = Convert.ToInt32(dr["OperationManID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mOperationManName = Convert.ToString(dr["OperationManName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mCreatorRoleID = Convert.ToInt32(dr["CreatorRoleID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mSalesmanRoleID = Convert.ToInt32(dr["SalesmanRoleID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mOperationManRoleID = Convert.ToInt32(dr["OperationManRoleID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPOrC = Convert.ToInt32(dr["POrC"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mDismissalPermissionSerial = Convert.ToString(dr["DismissalPermissionSerial"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mNumberOfPackages = Convert.ToInt32(dr["NumberOfPackages"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mDescriptionOfGoods = Convert.ToString(dr["DescriptionOfGoods"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mDeliveryAddress = Convert.ToString(dr["DeliveryAddress"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mDeliveryCityID = Convert.ToInt32(dr["DeliveryCityID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mDeliveryCityName = Convert.ToString(dr["DeliveryCityName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mSupplierReference = Convert.ToString(dr["SupplierReference"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPONumber = Convert.ToString(dr["PONumber"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPOValue = Convert.ToString(dr["POValue"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPODate = Convert.ToDateTime(dr["PODate"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mReleaseNumber = Convert.ToString(dr["ReleaseNumber"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mReleaseDate = Convert.ToDateTime(dr["ReleaseDate"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mReleaseValue = Convert.ToDecimal(dr["ReleaseValue"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mETAPOLDate = Convert.ToDateTime(dr["ETAPOLDate"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mExpectedDeparture = Convert.ToDateTime(dr["ExpectedDeparture"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mActualDeparture = Convert.ToDateTime(dr["ActualDeparture"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mExpectedArrival = Convert.ToDateTime(dr["ExpectedArrival"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mActualArrival = Convert.ToDateTime(dr["ActualArrival"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPOLCountryID = Convert.ToInt32(dr["POLCountryID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPOLCountryCode = Convert.ToString(dr["POLCountryCode"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPOLCountryName = Convert.ToString(dr["POLCountryName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPOL = Convert.ToInt32(dr["POL"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPOLCode = Convert.ToString(dr["POLCode"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPOLName = Convert.ToString(dr["POLName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPODCountryID = Convert.ToInt32(dr["PODCountryID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPODCountryCode = Convert.ToString(dr["PODCountryCode"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPODCountryName = Convert.ToString(dr["PODCountryName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPOD = Convert.ToInt32(dr["POD"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPODCode = Convert.ToString(dr["PODCode"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPODName = Convert.ToString(dr["PODName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mOperationStageName = Convert.ToString(dr["OperationStageName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mBookingPartyID = Convert.ToInt32(dr["BookingPartyID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mBookingPartyName = Convert.ToString(dr["BookingPartyName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mCustomsClearanceAgentID = Convert.ToInt32(dr["CustomsClearanceAgentID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mCustomsClearanceAgentName = Convert.ToString(dr["CustomsClearanceAgentName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mAgentName = Convert.ToString(dr["AgentName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mShipperID = Convert.ToInt32(dr["ShipperID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mShipperName = Convert.ToString(dr["ShipperName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mConsigneeID = Convert.ToInt32(dr["ConsigneeID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mConsigneeName = Convert.ToString(dr["ConsigneeName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mNetworksNames = Convert.ToString(dr["NetworksNames"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mNotify1Name = Convert.ToString(dr["Notify1Name"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mEndUserID = Convert.ToInt32(dr["EndUserID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mEndUserName = Convert.ToString(dr["EndUserName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mClientPhonesAndFaxes = Convert.ToString(dr["ClientPhonesAndFaxes"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mClientAddress = Convert.ToString(dr["ClientAddress"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mIncotermID = Convert.ToInt32(dr["IncotermID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mIncotermName = Convert.ToString(dr["IncotermName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mQuotationRouteCode = Convert.ToString(dr["QuotationRouteCode"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mCertificateNumber = Convert.ToString(dr["CertificateNumber"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mCertificateValue = Convert.ToString(dr["CertificateValue"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mCertificateDate = Convert.ToString(dr["CertificateDate"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mQasimaNumber = Convert.ToString(dr["QasimaNumber"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mQasimaDate = Convert.ToString(dr["QasimaDate"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mMainRouteNotes = Convert.ToString(dr["MainRouteNotes"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mCC_ClearanceTypeID = Convert.ToInt32(dr["CC_ClearanceTypeID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mCC_ClearanceTypeName = Convert.ToString(dr["CC_ClearanceTypeName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mMoveTypeName = Convert.ToString(dr["MoveTypeName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mLineName = Convert.ToString(dr["LineName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mVesselID = Convert.ToInt32(dr["VesselID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mVoyageOrTruckNumber = Convert.ToString(dr["VoyageOrTruckNumber"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mMainRouteWarehouse = Convert.ToString(dr["MainRouteWarehouse"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mNetworkID = Convert.ToInt32(dr["NetworkID"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mNetworkName = Convert.ToString(dr["NetworkName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mContainerTypes = Convert.ToString(dr["ContainerTypes"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPackageTypes = Convert.ToString(dr["PackageTypes"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPackageTypesOnContainersTotals = Convert.ToString(dr["PackageTypesOnContainersTotals"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mInvoiceNumbers = Convert.ToString(dr["InvoiceNumbers"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mFirstInvoiceDate = Convert.ToString(dr["FirstInvoiceDate"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mHouseBLs = Convert.ToString(dr["HouseBLs"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mBookingNumbers = Convert.ToString(dr["BookingNumbers"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mTEUs = Convert.ToInt32(dr["TEUs"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mTrackingStageName = Convert.ToString(dr["TrackingStageName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mAllTrackingStages = Convert.ToString(dr["AllTrackingStages"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mGrossWeightSum = Convert.ToDecimal(dr["GrossWeightSum"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mNetWeightSum = Convert.ToDecimal(dr["NetWeightSum"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mVolumeSum = Convert.ToDecimal(dr["VolumeSum"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mVolumetricWeight = Convert.ToDecimal(dr["VolumetricWeight"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mContainerTypes20 = Convert.ToString(dr["ContainerTypes20"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mContainerTypes40 = Convert.ToString(dr["ContainerTypes40"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mContainerTypes45 = Convert.ToString(dr["ContainerTypes45"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mContainerTypesReefer20 = Convert.ToString(dr["ContainerTypesReefer20"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mContainerTypesReefer40 = Convert.ToString(dr["ContainerTypesReefer40"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mContainerNumbers = Convert.ToString(dr["ContainerNumbers"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPayablesWithoutVAT = Convert.ToDecimal(dr["PayablesWithoutVAT"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mReceivablesWithoutVAT = Convert.ToDecimal(dr["ReceivablesWithoutVAT"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mPayables = Convert.ToDecimal(dr["Payables"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mReceivables = Convert.ToDecimal(dr["Receivables"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mTruckersName = Convert.ToString(dr["TruckersName"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mQuotationCode = Convert.ToString(dr["QuotationCode"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mOperationWithInvoiceSerial = Convert.ToInt32(dr["OperationWithInvoiceSerial"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mForm13Number = Convert.ToString(dr["Form13Number"].ToString());
                        ObjCVarvwOperationsStatistics_FilterInvoices.mACIDNumber = Convert.ToString(dr["ACIDNumber"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwOperationsStatistics_FilterInvoices.Add(ObjCVarvwOperationsStatistics_FilterInvoices);
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
