using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.Reports.Generated
{
    [Serializable]
    public partial class CVarvwWH_AreaLocationsChart
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal Int32 mRowID;
        internal String mRowName;
        internal Int32 mAreaID;
        internal String mAreaName;
        internal Int32 mWareHouseID;
        internal String mWarehouseName;
        internal String mCode;
        internal Int32 mLevelNumber;
        internal Int32 mTrayNumber;
        internal Decimal mMaxWeight;
        internal Int32 mWeightUnitID;
        internal String mWeightUnitCode;
        internal Decimal mMaxVolume;
        internal Int32 mVolumeUnitID;
        internal String mVolumeUnitCode;
        internal Decimal mLocationLength;
        internal Decimal mLocationWidth;
        internal Int32 mLengthUnitID;
        internal String mLengthUnitCode;
        internal Int32 mStatusID;
        internal String mStatusName;
        internal Int32 mPickupMethodID;
        internal String mPickupMethodName;
        internal Boolean mIsUsed;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int64 mMaxRecievedDetailsID;
        internal Int64 mLocationIndex;
        internal Int64 mOperationVehicleID;
        internal String mChassisNumber;
        internal String mPINumber;
        internal String mPurchaseItemName;
        internal String mPurchaseItemCode;
        internal String mSerialNumber;
        internal String mEngineNumber;
        internal DateTime mReceiveDate;
        internal Int32 mCustomerID;
        internal String mCustomerName;
        internal Int64 mPurchaseItemID;
        internal String mModel;
        internal String mPaintType;
        internal Int32 mLocationsCount;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 RowID
        {
            get { return mRowID; }
            set { mRowID = value; }
        }
        public String RowName
        {
            get { return mRowName; }
            set { mRowName = value; }
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
        public Int32 WareHouseID
        {
            get { return mWareHouseID; }
            set { mWareHouseID = value; }
        }
        public String WarehouseName
        {
            get { return mWarehouseName; }
            set { mWarehouseName = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public Int32 LevelNumber
        {
            get { return mLevelNumber; }
            set { mLevelNumber = value; }
        }
        public Int32 TrayNumber
        {
            get { return mTrayNumber; }
            set { mTrayNumber = value; }
        }
        public Decimal MaxWeight
        {
            get { return mMaxWeight; }
            set { mMaxWeight = value; }
        }
        public Int32 WeightUnitID
        {
            get { return mWeightUnitID; }
            set { mWeightUnitID = value; }
        }
        public String WeightUnitCode
        {
            get { return mWeightUnitCode; }
            set { mWeightUnitCode = value; }
        }
        public Decimal MaxVolume
        {
            get { return mMaxVolume; }
            set { mMaxVolume = value; }
        }
        public Int32 VolumeUnitID
        {
            get { return mVolumeUnitID; }
            set { mVolumeUnitID = value; }
        }
        public String VolumeUnitCode
        {
            get { return mVolumeUnitCode; }
            set { mVolumeUnitCode = value; }
        }
        public Decimal LocationLength
        {
            get { return mLocationLength; }
            set { mLocationLength = value; }
        }
        public Decimal LocationWidth
        {
            get { return mLocationWidth; }
            set { mLocationWidth = value; }
        }
        public Int32 LengthUnitID
        {
            get { return mLengthUnitID; }
            set { mLengthUnitID = value; }
        }
        public String LengthUnitCode
        {
            get { return mLengthUnitCode; }
            set { mLengthUnitCode = value; }
        }
        public Int32 StatusID
        {
            get { return mStatusID; }
            set { mStatusID = value; }
        }
        public String StatusName
        {
            get { return mStatusName; }
            set { mStatusName = value; }
        }
        public Int32 PickupMethodID
        {
            get { return mPickupMethodID; }
            set { mPickupMethodID = value; }
        }
        public String PickupMethodName
        {
            get { return mPickupMethodName; }
            set { mPickupMethodName = value; }
        }
        public Boolean IsUsed
        {
            get { return mIsUsed; }
            set { mIsUsed = value; }
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
        public Int64 MaxRecievedDetailsID
        {
            get { return mMaxRecievedDetailsID; }
            set { mMaxRecievedDetailsID = value; }
        }
        public Int64 LocationIndex
        {
            get { return mLocationIndex; }
            set { mLocationIndex = value; }
        }
        public Int64 OperationVehicleID
        {
            get { return mOperationVehicleID; }
            set { mOperationVehicleID = value; }
        }
        public String ChassisNumber
        {
            get { return mChassisNumber; }
            set { mChassisNumber = value; }
        }
        public String PINumber
        {
            get { return mPINumber; }
            set { mPINumber = value; }
        }
        public String PurchaseItemName
        {
            get { return mPurchaseItemName; }
            set { mPurchaseItemName = value; }
        }
        public String PurchaseItemCode
        {
            get { return mPurchaseItemCode; }
            set { mPurchaseItemCode = value; }
        }
        public String SerialNumber
        {
            get { return mSerialNumber; }
            set { mSerialNumber = value; }
        }
        public String EngineNumber
        {
            get { return mEngineNumber; }
            set { mEngineNumber = value; }
        }
        public DateTime ReceiveDate
        {
            get { return mReceiveDate; }
            set { mReceiveDate = value; }
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
        public String Model
        {
            get { return mModel; }
            set { mModel = value; }
        }
        public String PaintType
        {
            get { return mPaintType; }
            set { mPaintType = value; }
        }
        public Int32 LocationsCount
        {
            get { return mLocationsCount; }
            set { mLocationsCount = value; }
        }
        #endregion
    }

    public partial class CvwWH_AreaLocationsChart
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
        public List<CVarvwWH_AreaLocationsChart> lstCVarvwWH_AreaLocationsChart = new List<CVarvwWH_AreaLocationsChart>();
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
            lstCVarvwWH_AreaLocationsChart.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwWH_AreaLocationsChart";
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
                        CVarvwWH_AreaLocationsChart ObjCVarvwWH_AreaLocationsChart = new CVarvwWH_AreaLocationsChart();
                        ObjCVarvwWH_AreaLocationsChart.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mRowID = Convert.ToInt32(dr["RowID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mRowName = Convert.ToString(dr["RowName"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mAreaID = Convert.ToInt32(dr["AreaID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mAreaName = Convert.ToString(dr["AreaName"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mWareHouseID = Convert.ToInt32(dr["WareHouseID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mLevelNumber = Convert.ToInt32(dr["LevelNumber"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mTrayNumber = Convert.ToInt32(dr["TrayNumber"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mMaxWeight = Convert.ToDecimal(dr["MaxWeight"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mWeightUnitCode = Convert.ToString(dr["WeightUnitCode"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mMaxVolume = Convert.ToDecimal(dr["MaxVolume"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mVolumeUnitCode = Convert.ToString(dr["VolumeUnitCode"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mLocationLength = Convert.ToDecimal(dr["LocationLength"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mLocationWidth = Convert.ToDecimal(dr["LocationWidth"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mLengthUnitID = Convert.ToInt32(dr["LengthUnitID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mLengthUnitCode = Convert.ToString(dr["LengthUnitCode"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mStatusID = Convert.ToInt32(dr["StatusID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mStatusName = Convert.ToString(dr["StatusName"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mPickupMethodID = Convert.ToInt32(dr["PickupMethodID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mPickupMethodName = Convert.ToString(dr["PickupMethodName"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mIsUsed = Convert.ToBoolean(dr["IsUsed"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mMaxRecievedDetailsID = Convert.ToInt64(dr["MaxRecievedDetailsID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mLocationIndex = Convert.ToInt64(dr["LocationIndex"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mPINumber = Convert.ToString(dr["PINumber"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mSerialNumber = Convert.ToString(dr["SerialNumber"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mEngineNumber = Convert.ToString(dr["EngineNumber"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mModel = Convert.ToString(dr["Model"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mPaintType = Convert.ToString(dr["PaintType"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mLocationsCount = Convert.ToInt32(dr["LocationsCount"].ToString());
                        lstCVarvwWH_AreaLocationsChart.Add(ObjCVarvwWH_AreaLocationsChart);
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
            lstCVarvwWH_AreaLocationsChart.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwWH_AreaLocationsChart";
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
                        CVarvwWH_AreaLocationsChart ObjCVarvwWH_AreaLocationsChart = new CVarvwWH_AreaLocationsChart();
                        ObjCVarvwWH_AreaLocationsChart.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mRowID = Convert.ToInt32(dr["RowID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mRowName = Convert.ToString(dr["RowName"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mAreaID = Convert.ToInt32(dr["AreaID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mAreaName = Convert.ToString(dr["AreaName"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mWareHouseID = Convert.ToInt32(dr["WareHouseID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mLevelNumber = Convert.ToInt32(dr["LevelNumber"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mTrayNumber = Convert.ToInt32(dr["TrayNumber"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mMaxWeight = Convert.ToDecimal(dr["MaxWeight"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mWeightUnitCode = Convert.ToString(dr["WeightUnitCode"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mMaxVolume = Convert.ToDecimal(dr["MaxVolume"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mVolumeUnitCode = Convert.ToString(dr["VolumeUnitCode"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mLocationLength = Convert.ToDecimal(dr["LocationLength"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mLocationWidth = Convert.ToDecimal(dr["LocationWidth"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mLengthUnitID = Convert.ToInt32(dr["LengthUnitID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mLengthUnitCode = Convert.ToString(dr["LengthUnitCode"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mStatusID = Convert.ToInt32(dr["StatusID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mStatusName = Convert.ToString(dr["StatusName"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mPickupMethodID = Convert.ToInt32(dr["PickupMethodID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mPickupMethodName = Convert.ToString(dr["PickupMethodName"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mIsUsed = Convert.ToBoolean(dr["IsUsed"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mMaxRecievedDetailsID = Convert.ToInt64(dr["MaxRecievedDetailsID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mLocationIndex = Convert.ToInt64(dr["LocationIndex"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mPINumber = Convert.ToString(dr["PINumber"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mSerialNumber = Convert.ToString(dr["SerialNumber"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mEngineNumber = Convert.ToString(dr["EngineNumber"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mModel = Convert.ToString(dr["Model"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mPaintType = Convert.ToString(dr["PaintType"].ToString());
                        ObjCVarvwWH_AreaLocationsChart.mLocationsCount = Convert.ToInt32(dr["LocationsCount"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwWH_AreaLocationsChart.Add(ObjCVarvwWH_AreaLocationsChart);
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
