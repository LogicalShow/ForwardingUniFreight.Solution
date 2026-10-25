using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.LoadingAndDischarging.Generated
{
    [Serializable]
    public partial class CVarvwLoadingAndDischargingHeader
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal Int64 mSerial;
        internal Int64 mOperationID;
        internal Int32 mCustomerID;
        internal String mCustomerName;
        internal Int32 mFromCityID;
        internal String mBerthNo;
        internal Int32 mCommodityID;
        internal Int32 mMoveTypeID;
        internal DateTime mStartDate;
        internal DateTime mCloseDate;
        internal Int32 mVesselD;
        internal String mNotes;
        internal Int32 mToCityID;
        internal String mCode;
        internal Int32 mTypeID;
        internal Int32 mParentID;
        internal DateTime mFromDate;
        internal Decimal mExpectedTotalQty;
        internal Int32 mDefaultUnitID;
        internal Int32 mOperationCodeSerial;
        internal String mOperationCode;
        internal String mFromCityName;
        internal String mCommodityName;
        internal String mServiceTypeName;
        internal String mVesselName;
        internal String mToCityName;
        internal String mDefaultUnitName;
        internal String mLoadingAndDischargingTypeName;
        internal Int32 mDirectionType;
        internal String mDirectionTypeName;
        internal Decimal mTotalLoadedQty_UnPackaged;
        internal Decimal mTotalLoadedQty_Packaged;
        internal Decimal mStoreOutQty_UnPackaged;
        internal Decimal mStoreOutQty_Packaged;
        internal Decimal mStoreInQty_UnPackaged;
        internal Decimal mStoreInQty_Packaged;
        internal String mCranesNames;
        internal String mStoresIDs;
        internal DateTime mOpenDate;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int64 Serial
        {
            get { return mSerial; }
            set { mSerial = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
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
        public Int32 FromCityID
        {
            get { return mFromCityID; }
            set { mFromCityID = value; }
        }
        public String BerthNo
        {
            get { return mBerthNo; }
            set { mBerthNo = value; }
        }
        public Int32 CommodityID
        {
            get { return mCommodityID; }
            set { mCommodityID = value; }
        }
        public Int32 MoveTypeID
        {
            get { return mMoveTypeID; }
            set { mMoveTypeID = value; }
        }
        public DateTime StartDate
        {
            get { return mStartDate; }
            set { mStartDate = value; }
        }
        public DateTime CloseDate
        {
            get { return mCloseDate; }
            set { mCloseDate = value; }
        }
        public Int32 VesselD
        {
            get { return mVesselD; }
            set { mVesselD = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Int32 ToCityID
        {
            get { return mToCityID; }
            set { mToCityID = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public Int32 TypeID
        {
            get { return mTypeID; }
            set { mTypeID = value; }
        }
        public Int32 ParentID
        {
            get { return mParentID; }
            set { mParentID = value; }
        }
        public DateTime FromDate
        {
            get { return mFromDate; }
            set { mFromDate = value; }
        }
        public Decimal ExpectedTotalQty
        {
            get { return mExpectedTotalQty; }
            set { mExpectedTotalQty = value; }
        }
        public Int32 DefaultUnitID
        {
            get { return mDefaultUnitID; }
            set { mDefaultUnitID = value; }
        }
        public Int32 OperationCodeSerial
        {
            get { return mOperationCodeSerial; }
            set { mOperationCodeSerial = value; }
        }
        public String OperationCode
        {
            get { return mOperationCode; }
            set { mOperationCode = value; }
        }
        public String FromCityName
        {
            get { return mFromCityName; }
            set { mFromCityName = value; }
        }
        public String CommodityName
        {
            get { return mCommodityName; }
            set { mCommodityName = value; }
        }
        public String ServiceTypeName
        {
            get { return mServiceTypeName; }
            set { mServiceTypeName = value; }
        }
        public String VesselName
        {
            get { return mVesselName; }
            set { mVesselName = value; }
        }
        public String ToCityName
        {
            get { return mToCityName; }
            set { mToCityName = value; }
        }
        public String DefaultUnitName
        {
            get { return mDefaultUnitName; }
            set { mDefaultUnitName = value; }
        }
        public String LoadingAndDischargingTypeName
        {
            get { return mLoadingAndDischargingTypeName; }
            set { mLoadingAndDischargingTypeName = value; }
        }
        public Int32 DirectionType
        {
            get { return mDirectionType; }
            set { mDirectionType = value; }
        }
        public String DirectionTypeName
        {
            get { return mDirectionTypeName; }
            set { mDirectionTypeName = value; }
        }
        public Decimal TotalLoadedQty_UnPackaged
        {
            get { return mTotalLoadedQty_UnPackaged; }
            set { mTotalLoadedQty_UnPackaged = value; }
        }
        public Decimal TotalLoadedQty_Packaged
        {
            get { return mTotalLoadedQty_Packaged; }
            set { mTotalLoadedQty_Packaged = value; }
        }
        public Decimal StoreOutQty_UnPackaged
        {
            get { return mStoreOutQty_UnPackaged; }
            set { mStoreOutQty_UnPackaged = value; }
        }
        public Decimal StoreOutQty_Packaged
        {
            get { return mStoreOutQty_Packaged; }
            set { mStoreOutQty_Packaged = value; }
        }
        public Decimal StoreInQty_UnPackaged
        {
            get { return mStoreInQty_UnPackaged; }
            set { mStoreInQty_UnPackaged = value; }
        }
        public Decimal StoreInQty_Packaged
        {
            get { return mStoreInQty_Packaged; }
            set { mStoreInQty_Packaged = value; }
        }
        public String CranesNames
        {
            get { return mCranesNames; }
            set { mCranesNames = value; }
        }
        public String StoresIDs
        {
            get { return mStoresIDs; }
            set { mStoresIDs = value; }
        }
        public DateTime OpenDate
        {
            get { return mOpenDate; }
            set { mOpenDate = value; }
        }
        #endregion
    }

    public partial class CvwLoadingAndDischargingHeader
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
        public List<CVarvwLoadingAndDischargingHeader> lstCVarvwLoadingAndDischargingHeader = new List<CVarvwLoadingAndDischargingHeader>();
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
            lstCVarvwLoadingAndDischargingHeader.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwLoadingAndDischargingHeader";
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
                        CVarvwLoadingAndDischargingHeader ObjCVarvwLoadingAndDischargingHeader = new CVarvwLoadingAndDischargingHeader();
                        ObjCVarvwLoadingAndDischargingHeader.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mFromCityID = Convert.ToInt32(dr["FromCityID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mBerthNo = Convert.ToString(dr["BerthNo"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mStartDate = Convert.ToDateTime(dr["StartDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mVesselD = Convert.ToInt32(dr["VesselD"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mToCityID = Convert.ToInt32(dr["ToCityID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mExpectedTotalQty = Convert.ToDecimal(dr["ExpectedTotalQty"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mDefaultUnitID = Convert.ToInt32(dr["DefaultUnitID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mFromCityName = Convert.ToString(dr["FromCityName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mServiceTypeName = Convert.ToString(dr["ServiceTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mToCityName = Convert.ToString(dr["ToCityName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mDefaultUnitName = Convert.ToString(dr["DefaultUnitName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mLoadingAndDischargingTypeName = Convert.ToString(dr["LoadingAndDischargingTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mDirectionTypeName = Convert.ToString(dr["DirectionTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mTotalLoadedQty_UnPackaged = Convert.ToDecimal(dr["TotalLoadedQty_UnPackaged"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mTotalLoadedQty_Packaged = Convert.ToDecimal(dr["TotalLoadedQty_Packaged"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mStoreOutQty_UnPackaged = Convert.ToDecimal(dr["StoreOutQty_UnPackaged"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mStoreOutQty_Packaged = Convert.ToDecimal(dr["StoreOutQty_Packaged"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mStoreInQty_UnPackaged = Convert.ToDecimal(dr["StoreInQty_UnPackaged"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mStoreInQty_Packaged = Convert.ToDecimal(dr["StoreInQty_Packaged"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mCranesNames = Convert.ToString(dr["CranesNames"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mStoresIDs = Convert.ToString(dr["StoresIDs"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        lstCVarvwLoadingAndDischargingHeader.Add(ObjCVarvwLoadingAndDischargingHeader);
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
            lstCVarvwLoadingAndDischargingHeader.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwLoadingAndDischargingHeader";
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
                        CVarvwLoadingAndDischargingHeader ObjCVarvwLoadingAndDischargingHeader = new CVarvwLoadingAndDischargingHeader();
                        ObjCVarvwLoadingAndDischargingHeader.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mFromCityID = Convert.ToInt32(dr["FromCityID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mBerthNo = Convert.ToString(dr["BerthNo"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mStartDate = Convert.ToDateTime(dr["StartDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mVesselD = Convert.ToInt32(dr["VesselD"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mToCityID = Convert.ToInt32(dr["ToCityID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mExpectedTotalQty = Convert.ToDecimal(dr["ExpectedTotalQty"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mDefaultUnitID = Convert.ToInt32(dr["DefaultUnitID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mFromCityName = Convert.ToString(dr["FromCityName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mServiceTypeName = Convert.ToString(dr["ServiceTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mToCityName = Convert.ToString(dr["ToCityName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mDefaultUnitName = Convert.ToString(dr["DefaultUnitName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mLoadingAndDischargingTypeName = Convert.ToString(dr["LoadingAndDischargingTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mDirectionTypeName = Convert.ToString(dr["DirectionTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mTotalLoadedQty_UnPackaged = Convert.ToDecimal(dr["TotalLoadedQty_UnPackaged"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mTotalLoadedQty_Packaged = Convert.ToDecimal(dr["TotalLoadedQty_Packaged"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mStoreOutQty_UnPackaged = Convert.ToDecimal(dr["StoreOutQty_UnPackaged"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mStoreOutQty_Packaged = Convert.ToDecimal(dr["StoreOutQty_Packaged"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mStoreInQty_UnPackaged = Convert.ToDecimal(dr["StoreInQty_UnPackaged"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mStoreInQty_Packaged = Convert.ToDecimal(dr["StoreInQty_Packaged"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mCranesNames = Convert.ToString(dr["CranesNames"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mStoresIDs = Convert.ToString(dr["StoresIDs"].ToString());
                        ObjCVarvwLoadingAndDischargingHeader.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwLoadingAndDischargingHeader.Add(ObjCVarvwLoadingAndDischargingHeader);
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
