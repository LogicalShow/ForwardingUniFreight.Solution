using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Generated
{
	[Serializable]
	public partial class CVarvwWH_ReceiveDetailsToPick
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int64 mID;
		internal Int64 mReceiveID;
		internal String mReceiveCode;
		internal Int32 mReceiveCodeSerial;
		internal Int32 mWarehouseID;
		internal String mWarehouseName;
		internal Int32 mDetailWarehouseID;
		internal Int32 mCustomerID;
		internal String mCustomerName;
		internal Int64 mPurchaseItemID;
		internal String mPurchaseItemCode;
		internal String mPurchaseItemName;
		internal String mPartNumber;
		internal Int32 mPackageTypeID;
		internal String mPackageTypeName;
		internal Decimal mExpectedQuantity;
		internal Decimal mQuantity;
		internal Decimal mSplitQuantity;
		internal Decimal mDemandedQuantity;
		internal Decimal mPDL_DemandedQuantity;
		internal Decimal mPickedQuantity;
		internal Decimal mReservedQuantity;
		internal Decimal mFinalizedPickedQuantity;
		internal Int32 mLocationID;
		internal String mLocationCode;
		internal Int32 mAreaID;
		internal String mAreaName;
		internal Int32 mLocationTypeID;
		internal String mPalletID;
		internal DateTime mReceiveDate;
		internal Int32 mStatusID;
		internal String mStatusCode;
		internal String mStatusName;
		internal Boolean mIsFinalized;
		internal DateTime mFinalizeDate;
		internal Boolean mRD_IsFinalized;
		internal String mBatchNumber;
		internal String mNotes;
		internal DateTime mExpectedProductionDate;
		internal DateTime mProductionDate;
		internal DateTime mExpectedExpirationDate;
		internal DateTime mExpirationDate;
		internal String mSerial;
		internal Int32 mRD_PackageTypeID;
		internal Int32 mPalletStatusID;
		internal String mPalletStatusName;
		internal Boolean mIsExcluded;
		internal String mLotNo;
		internal DateTime mExpireDate;
		internal Boolean mByExpireDate;
		internal Boolean mBySerialNo;
		internal Boolean mByLotNo;
		internal Boolean mByVehicle;
		internal Int64 mOperationVehicleID;
		internal String mOperationVehicleCode;
		internal String mMotorNumber;
		internal String mChassisNumber;
		internal String mLotNumber;
		internal String mSerialNumber;
		internal String mOCNCode;
		internal String mModel;
		internal String mKeyNumber;
		internal String mEC;
		internal String mPaintType;
		internal String mIC;
		internal String mCommercialInvoiceNumber;
		internal String mInsurancePolicyNumber;
		internal String mProductionOrder;
		internal String mPINumber;
		internal String mBillNumber;
		internal String mEngineNumber;
		internal Int64 mOperationID;
		internal String mOperationCode;
		internal DateTime mPreviousCutOffDate;
		internal Boolean mIsPickupAddedToInvoice;
		internal DateTime mPickupWithoutInvoiceDate;
		internal String mContainerNumber;
		internal Boolean mAllProductsReserved;
		internal String mReservationReason;
		internal Boolean mIsDefected;
		internal String mDefectionReason;
		internal String mSerials;
		#endregion

		#region "Methods"
		public Int64 ID
		{
			get { return mID; }
			set { mID = value; }
		}
		public Int64 ReceiveID
		{
			get { return mReceiveID; }
			set { mReceiveID = value; }
		}
		public String ReceiveCode
		{
			get { return mReceiveCode; }
			set { mReceiveCode = value; }
		}
		public Int32 ReceiveCodeSerial
		{
			get { return mReceiveCodeSerial; }
			set { mReceiveCodeSerial = value; }
		}
		public Int32 WarehouseID
		{
			get { return mWarehouseID; }
			set { mWarehouseID = value; }
		}
		public String WarehouseName
		{
			get { return mWarehouseName; }
			set { mWarehouseName = value; }
		}
		public Int32 DetailWarehouseID
		{
			get { return mDetailWarehouseID; }
			set { mDetailWarehouseID = value; }
		}
		public Int32 CustomerID
		{
			get { return mCustomerID; }
			set { mCustomerID = value; }
		}
		public String CustomerName
		{
			get { return mCustomerName; }
			set { mCustomerName = value; }
		}
		public Int64 PurchaseItemID
		{
			get { return mPurchaseItemID; }
			set { mPurchaseItemID = value; }
		}
		public String PurchaseItemCode
		{
			get { return mPurchaseItemCode; }
			set { mPurchaseItemCode = value; }
		}
		public String PurchaseItemName
		{
			get { return mPurchaseItemName; }
			set { mPurchaseItemName = value; }
		}
		public String PartNumber
		{
			get { return mPartNumber; }
			set { mPartNumber = value; }
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
		public Decimal ExpectedQuantity
		{
			get { return mExpectedQuantity; }
			set { mExpectedQuantity = value; }
		}
		public Decimal Quantity
		{
			get { return mQuantity; }
			set { mQuantity = value; }
		}
		public Decimal SplitQuantity
		{
			get { return mSplitQuantity; }
			set { mSplitQuantity = value; }
		}
		public Decimal DemandedQuantity
		{
			get { return mDemandedQuantity; }
			set { mDemandedQuantity = value; }
		}
		public Decimal PDL_DemandedQuantity
		{
			get { return mPDL_DemandedQuantity; }
			set { mPDL_DemandedQuantity = value; }
		}
		public Decimal PickedQuantity
		{
			get { return mPickedQuantity; }
			set { mPickedQuantity = value; }
		}
		public Decimal ReservedQuantity
		{
			get { return mReservedQuantity; }
			set { mReservedQuantity = value; }
		}
		public Decimal FinalizedPickedQuantity
		{
			get { return mFinalizedPickedQuantity; }
			set { mFinalizedPickedQuantity = value; }
		}
		public Int32 LocationID
		{
			get { return mLocationID; }
			set { mLocationID = value; }
		}
		public String LocationCode
		{
			get { return mLocationCode; }
			set { mLocationCode = value; }
		}
		public Int32 AreaID
		{
			get { return mAreaID; }
			set { mAreaID = value; }
		}
		public String AreaName
		{
			get { return mAreaName; }
			set { mAreaName = value; }
		}
		public Int32 LocationTypeID
		{
			get { return mLocationTypeID; }
			set { mLocationTypeID = value; }
		}
		public String PalletID
		{
			get { return mPalletID; }
			set { mPalletID = value; }
		}
		public DateTime ReceiveDate
		{
			get { return mReceiveDate; }
			set { mReceiveDate = value; }
		}
		public Int32 StatusID
		{
			get { return mStatusID; }
			set { mStatusID = value; }
		}
		public String StatusCode
		{
			get { return mStatusCode; }
			set { mStatusCode = value; }
		}
		public String StatusName
		{
			get { return mStatusName; }
			set { mStatusName = value; }
		}
		public Boolean IsFinalized
		{
			get { return mIsFinalized; }
			set { mIsFinalized = value; }
		}
		public DateTime FinalizeDate
		{
			get { return mFinalizeDate; }
			set { mFinalizeDate = value; }
		}
		public Boolean RD_IsFinalized
		{
			get { return mRD_IsFinalized; }
			set { mRD_IsFinalized = value; }
		}
		public String BatchNumber
		{
			get { return mBatchNumber; }
			set { mBatchNumber = value; }
		}
		public String Notes
		{
			get { return mNotes; }
			set { mNotes = value; }
		}
		public DateTime ExpectedProductionDate
		{
			get { return mExpectedProductionDate; }
			set { mExpectedProductionDate = value; }
		}
		public DateTime ProductionDate
		{
			get { return mProductionDate; }
			set { mProductionDate = value; }
		}
		public DateTime ExpectedExpirationDate
		{
			get { return mExpectedExpirationDate; }
			set { mExpectedExpirationDate = value; }
		}
		public DateTime ExpirationDate
		{
			get { return mExpirationDate; }
			set { mExpirationDate = value; }
		}
		public String Serial
		{
			get { return mSerial; }
			set { mSerial = value; }
		}
		public Int32 RD_PackageTypeID
		{
			get { return mRD_PackageTypeID; }
			set { mRD_PackageTypeID = value; }
		}
		public Int32 PalletStatusID
		{
			get { return mPalletStatusID; }
			set { mPalletStatusID = value; }
		}
		public String PalletStatusName
		{
			get { return mPalletStatusName; }
			set { mPalletStatusName = value; }
		}
		public Boolean IsExcluded
		{
			get { return mIsExcluded; }
			set { mIsExcluded = value; }
		}
		public String LotNo
		{
			get { return mLotNo; }
			set { mLotNo = value; }
		}
		public DateTime ExpireDate
		{
			get { return mExpireDate; }
			set { mExpireDate = value; }
		}
		public Boolean ByExpireDate
		{
			get { return mByExpireDate; }
			set { mByExpireDate = value; }
		}
		public Boolean BySerialNo
		{
			get { return mBySerialNo; }
			set { mBySerialNo = value; }
		}
		public Boolean ByLotNo
		{
			get { return mByLotNo; }
			set { mByLotNo = value; }
		}
		public Boolean ByVehicle
		{
			get { return mByVehicle; }
			set { mByVehicle = value; }
		}
		public Int64 OperationVehicleID
		{
			get { return mOperationVehicleID; }
			set { mOperationVehicleID = value; }
		}
		public String OperationVehicleCode
		{
			get { return mOperationVehicleCode; }
			set { mOperationVehicleCode = value; }
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
		public String LotNumber
		{
			get { return mLotNumber; }
			set { mLotNumber = value; }
		}
		public String SerialNumber
		{
			get { return mSerialNumber; }
			set { mSerialNumber = value; }
		}
		public String OCNCode
		{
			get { return mOCNCode; }
			set { mOCNCode = value; }
		}
		public String Model
		{
			get { return mModel; }
			set { mModel = value; }
		}
		public String KeyNumber
		{
			get { return mKeyNumber; }
			set { mKeyNumber = value; }
		}
		public String EC
		{
			get { return mEC; }
			set { mEC = value; }
		}
		public String PaintType
		{
			get { return mPaintType; }
			set { mPaintType = value; }
		}
		public String IC
		{
			get { return mIC; }
			set { mIC = value; }
		}
		public String CommercialInvoiceNumber
		{
			get { return mCommercialInvoiceNumber; }
			set { mCommercialInvoiceNumber = value; }
		}
		public String InsurancePolicyNumber
		{
			get { return mInsurancePolicyNumber; }
			set { mInsurancePolicyNumber = value; }
		}
		public String ProductionOrder
		{
			get { return mProductionOrder; }
			set { mProductionOrder = value; }
		}
		public String PINumber
		{
			get { return mPINumber; }
			set { mPINumber = value; }
		}
		public String BillNumber
		{
			get { return mBillNumber; }
			set { mBillNumber = value; }
		}
		public String EngineNumber
		{
			get { return mEngineNumber; }
			set { mEngineNumber = value; }
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
		public DateTime PreviousCutOffDate
		{
			get { return mPreviousCutOffDate; }
			set { mPreviousCutOffDate = value; }
		}
		public Boolean IsPickupAddedToInvoice
		{
			get { return mIsPickupAddedToInvoice; }
			set { mIsPickupAddedToInvoice = value; }
		}
		public DateTime PickupWithoutInvoiceDate
		{
			get { return mPickupWithoutInvoiceDate; }
			set { mPickupWithoutInvoiceDate = value; }
		}
		public String ContainerNumber
		{
			get { return mContainerNumber; }
			set { mContainerNumber = value; }
		}
		public Boolean AllProductsReserved
		{
			get { return mAllProductsReserved; }
			set { mAllProductsReserved = value; }
		}
		public String ReservationReason
		{
			get { return mReservationReason; }
			set { mReservationReason = value; }
		}
		public Boolean IsDefected
		{
			get { return mIsDefected; }
			set { mIsDefected = value; }
		}
		public String DefectionReason
		{
			get { return mDefectionReason; }
			set { mDefectionReason = value; }
		}
		public String Serials
		{
			get { return mSerials; }
			set { mSerials = value; }
		}
		#endregion
	}

	public partial class CvwWH_ReceiveDetailsToPick
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
		public List<CVarvwWH_ReceiveDetailsToPick> lstCVarvwWH_ReceiveDetailsToPick = new List<CVarvwWH_ReceiveDetailsToPick>();
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
			lstCVarvwWH_ReceiveDetailsToPick.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_ReceiveDetailsToPick";
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
						CVarvwWH_ReceiveDetailsToPick ObjCVarvwWH_ReceiveDetailsToPick = new CVarvwWH_ReceiveDetailsToPick();
						ObjCVarvwWH_ReceiveDetailsToPick.mID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mReceiveID = Convert.ToInt64(dr["ReceiveID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mReceiveCode = Convert.ToString(dr["ReceiveCode"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mReceiveCodeSerial = Convert.ToInt32(dr["ReceiveCodeSerial"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mDetailWarehouseID = Convert.ToInt32(dr["DetailWarehouseID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPartNumber = Convert.ToString(dr["PartNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mExpectedQuantity = Convert.ToDecimal(dr["ExpectedQuantity"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mSplitQuantity = Convert.ToDecimal(dr["SplitQuantity"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mDemandedQuantity = Convert.ToDecimal(dr["DemandedQuantity"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPDL_DemandedQuantity = Convert.ToDecimal(dr["PDL_DemandedQuantity"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPickedQuantity = Convert.ToDecimal(dr["PickedQuantity"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mReservedQuantity = Convert.ToDecimal(dr["ReservedQuantity"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mFinalizedPickedQuantity = Convert.ToDecimal(dr["FinalizedPickedQuantity"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mLocationID = Convert.ToInt32(dr["LocationID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mAreaID = Convert.ToInt32(dr["AreaID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mAreaName = Convert.ToString(dr["AreaName"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mLocationTypeID = Convert.ToInt32(dr["LocationTypeID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mStatusID = Convert.ToInt32(dr["StatusID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mStatusCode = Convert.ToString(dr["StatusCode"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mStatusName = Convert.ToString(dr["StatusName"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mIsFinalized = Convert.ToBoolean(dr["IsFinalized"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mFinalizeDate = Convert.ToDateTime(dr["FinalizeDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mRD_IsFinalized = Convert.ToBoolean(dr["RD_IsFinalized"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mBatchNumber = Convert.ToString(dr["BatchNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mExpectedProductionDate = Convert.ToDateTime(dr["ExpectedProductionDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mProductionDate = Convert.ToDateTime(dr["ProductionDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mExpectedExpirationDate = Convert.ToDateTime(dr["ExpectedExpirationDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mSerial = Convert.ToString(dr["Serial"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mRD_PackageTypeID = Convert.ToInt32(dr["RD_PackageTypeID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPalletStatusID = Convert.ToInt32(dr["PalletStatusID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPalletStatusName = Convert.ToString(dr["PalletStatusName"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mIsExcluded = Convert.ToBoolean(dr["IsExcluded"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mLotNo = Convert.ToString(dr["LotNo"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mExpireDate = Convert.ToDateTime(dr["ExpireDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mByExpireDate = Convert.ToBoolean(dr["ByExpireDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mBySerialNo = Convert.ToBoolean(dr["BySerialNo"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mByLotNo = Convert.ToBoolean(dr["ByLotNo"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mByVehicle = Convert.ToBoolean(dr["ByVehicle"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mOperationVehicleCode = Convert.ToString(dr["OperationVehicleCode"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mMotorNumber = Convert.ToString(dr["MotorNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mLotNumber = Convert.ToString(dr["LotNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mSerialNumber = Convert.ToString(dr["SerialNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mOCNCode = Convert.ToString(dr["OCNCode"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mModel = Convert.ToString(dr["Model"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mKeyNumber = Convert.ToString(dr["KeyNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mEC = Convert.ToString(dr["EC"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPaintType = Convert.ToString(dr["PaintType"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mIC = Convert.ToString(dr["IC"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mCommercialInvoiceNumber = Convert.ToString(dr["CommercialInvoiceNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mInsurancePolicyNumber = Convert.ToString(dr["InsurancePolicyNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mProductionOrder = Convert.ToString(dr["ProductionOrder"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPINumber = Convert.ToString(dr["PINumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mBillNumber = Convert.ToString(dr["BillNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mEngineNumber = Convert.ToString(dr["EngineNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPreviousCutOffDate = Convert.ToDateTime(dr["PreviousCutOffDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mIsPickupAddedToInvoice = Convert.ToBoolean(dr["IsPickupAddedToInvoice"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPickupWithoutInvoiceDate = Convert.ToDateTime(dr["PickupWithoutInvoiceDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mAllProductsReserved = Convert.ToBoolean(dr["AllProductsReserved"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mReservationReason = Convert.ToString(dr["ReservationReason"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mIsDefected = Convert.ToBoolean(dr["IsDefected"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mDefectionReason = Convert.ToString(dr["DefectionReason"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mSerials = Convert.ToString(dr["Serials"].ToString());
						lstCVarvwWH_ReceiveDetailsToPick.Add(ObjCVarvwWH_ReceiveDetailsToPick);
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
			lstCVarvwWH_ReceiveDetailsToPick.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_ReceiveDetailsToPick";
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
						CVarvwWH_ReceiveDetailsToPick ObjCVarvwWH_ReceiveDetailsToPick = new CVarvwWH_ReceiveDetailsToPick();
						ObjCVarvwWH_ReceiveDetailsToPick.mID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mReceiveID = Convert.ToInt64(dr["ReceiveID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mReceiveCode = Convert.ToString(dr["ReceiveCode"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mReceiveCodeSerial = Convert.ToInt32(dr["ReceiveCodeSerial"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mDetailWarehouseID = Convert.ToInt32(dr["DetailWarehouseID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPartNumber = Convert.ToString(dr["PartNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mExpectedQuantity = Convert.ToDecimal(dr["ExpectedQuantity"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mSplitQuantity = Convert.ToDecimal(dr["SplitQuantity"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mDemandedQuantity = Convert.ToDecimal(dr["DemandedQuantity"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPDL_DemandedQuantity = Convert.ToDecimal(dr["PDL_DemandedQuantity"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPickedQuantity = Convert.ToDecimal(dr["PickedQuantity"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mReservedQuantity = Convert.ToDecimal(dr["ReservedQuantity"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mFinalizedPickedQuantity = Convert.ToDecimal(dr["FinalizedPickedQuantity"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mLocationID = Convert.ToInt32(dr["LocationID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mAreaID = Convert.ToInt32(dr["AreaID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mAreaName = Convert.ToString(dr["AreaName"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mLocationTypeID = Convert.ToInt32(dr["LocationTypeID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mStatusID = Convert.ToInt32(dr["StatusID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mStatusCode = Convert.ToString(dr["StatusCode"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mStatusName = Convert.ToString(dr["StatusName"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mIsFinalized = Convert.ToBoolean(dr["IsFinalized"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mFinalizeDate = Convert.ToDateTime(dr["FinalizeDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mRD_IsFinalized = Convert.ToBoolean(dr["RD_IsFinalized"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mBatchNumber = Convert.ToString(dr["BatchNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mExpectedProductionDate = Convert.ToDateTime(dr["ExpectedProductionDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mProductionDate = Convert.ToDateTime(dr["ProductionDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mExpectedExpirationDate = Convert.ToDateTime(dr["ExpectedExpirationDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mSerial = Convert.ToString(dr["Serial"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mRD_PackageTypeID = Convert.ToInt32(dr["RD_PackageTypeID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPalletStatusID = Convert.ToInt32(dr["PalletStatusID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPalletStatusName = Convert.ToString(dr["PalletStatusName"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mIsExcluded = Convert.ToBoolean(dr["IsExcluded"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mLotNo = Convert.ToString(dr["LotNo"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mExpireDate = Convert.ToDateTime(dr["ExpireDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mByExpireDate = Convert.ToBoolean(dr["ByExpireDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mBySerialNo = Convert.ToBoolean(dr["BySerialNo"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mByLotNo = Convert.ToBoolean(dr["ByLotNo"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mByVehicle = Convert.ToBoolean(dr["ByVehicle"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mOperationVehicleCode = Convert.ToString(dr["OperationVehicleCode"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mMotorNumber = Convert.ToString(dr["MotorNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mLotNumber = Convert.ToString(dr["LotNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mSerialNumber = Convert.ToString(dr["SerialNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mOCNCode = Convert.ToString(dr["OCNCode"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mModel = Convert.ToString(dr["Model"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mKeyNumber = Convert.ToString(dr["KeyNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mEC = Convert.ToString(dr["EC"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPaintType = Convert.ToString(dr["PaintType"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mIC = Convert.ToString(dr["IC"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mCommercialInvoiceNumber = Convert.ToString(dr["CommercialInvoiceNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mInsurancePolicyNumber = Convert.ToString(dr["InsurancePolicyNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mProductionOrder = Convert.ToString(dr["ProductionOrder"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPINumber = Convert.ToString(dr["PINumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mBillNumber = Convert.ToString(dr["BillNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mEngineNumber = Convert.ToString(dr["EngineNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPreviousCutOffDate = Convert.ToDateTime(dr["PreviousCutOffDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mIsPickupAddedToInvoice = Convert.ToBoolean(dr["IsPickupAddedToInvoice"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mPickupWithoutInvoiceDate = Convert.ToDateTime(dr["PickupWithoutInvoiceDate"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mAllProductsReserved = Convert.ToBoolean(dr["AllProductsReserved"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mReservationReason = Convert.ToString(dr["ReservationReason"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mIsDefected = Convert.ToBoolean(dr["IsDefected"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mDefectionReason = Convert.ToString(dr["DefectionReason"].ToString());
						ObjCVarvwWH_ReceiveDetailsToPick.mSerials = Convert.ToString(dr["Serials"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_ReceiveDetailsToPick.Add(ObjCVarvwWH_ReceiveDetailsToPick);
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