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
    public class CPKvwLoadingAndDischargingFullDetails
    {
        #region "variables"
        private Int32 mID;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarvwLoadingAndDischargingFullDetails : CPKvwLoadingAndDischargingFullDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mSerial;
        internal Int64 mOperationID;
        internal Int32 mCustomerID;
        internal String mCustomerName;
        internal Int32 mFromCityID;
        internal String mBerthNo;
        internal Int32 mCommodityID;
        internal Int32 mMoveTypeID;
        internal DateTime mCloseDate;
        internal Int32 mVesselD;
        internal String mHeaderNotes;
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
        internal Int32 mLoadingAndDischargingHeaderTruckersID;
        internal Int32 mTruckerID;
        internal Int32 mDestinationCityID;
        internal Int32 mHeaderID;
        internal String mDestinationCityName;
        internal String mTruckerName;
        internal Int32 mPackageTypeID;
        internal String mPackageTypeName;
        internal Int32 mLoadingAndDischargingHeaderTruckersDetailsID;
        internal String mVehicleNo;
        internal Decimal mCustodyNo;
        internal String mBillNo;
        internal Decimal mLoadedQty;
        internal String mNotes;
        internal DateTime mDate;
        internal String mDefaultUnitName;
        internal String mLoadingAndDischargingTypeName;
        #endregion

        #region "Methods"
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
        public String HeaderNotes
        {
            get { return mHeaderNotes; }
            set { mHeaderNotes = value; }
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
        public Int32 LoadingAndDischargingHeaderTruckersID
        {
            get { return mLoadingAndDischargingHeaderTruckersID; }
            set { mLoadingAndDischargingHeaderTruckersID = value; }
        }
        public Int32 TruckerID
        {
            get { return mTruckerID; }
            set { mTruckerID = value; }
        }
        public Int32 DestinationCityID
        {
            get { return mDestinationCityID; }
            set { mDestinationCityID = value; }
        }
        public Int32 HeaderID
        {
            get { return mHeaderID; }
            set { mHeaderID = value; }
        }
        public String DestinationCityName
        {
            get { return mDestinationCityName; }
            set { mDestinationCityName = value; }
        }
        public String TruckerName
        {
            get { return mTruckerName; }
            set { mTruckerName = value; }
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
        public Int32 LoadingAndDischargingHeaderTruckersDetailsID
        {
            get { return mLoadingAndDischargingHeaderTruckersDetailsID; }
            set { mLoadingAndDischargingHeaderTruckersDetailsID = value; }
        }
        public String VehicleNo
        {
            get { return mVehicleNo; }
            set { mVehicleNo = value; }
        }
        public Decimal CustodyNo
        {
            get { return mCustodyNo; }
            set { mCustodyNo = value; }
        }
        public String BillNo
        {
            get { return mBillNo; }
            set { mBillNo = value; }
        }
        public Decimal LoadedQty
        {
            get { return mLoadedQty; }
            set { mLoadedQty = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public DateTime Date
        {
            get { return mDate; }
            set { mDate = value; }
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

    public partial class CvwLoadingAndDischargingFullDetails
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
        public List<CVarvwLoadingAndDischargingFullDetails> lstCVarvwLoadingAndDischargingFullDetails = new List<CVarvwLoadingAndDischargingFullDetails>();
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
            lstCVarvwLoadingAndDischargingFullDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwLoadingAndDischargingFullDetails";
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
                        CVarvwLoadingAndDischargingFullDetails ObjCVarvwLoadingAndDischargingFullDetails = new CVarvwLoadingAndDischargingFullDetails();
                        ObjCVarvwLoadingAndDischargingFullDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mFromCityID = Convert.ToInt32(dr["FromCityID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mBerthNo = Convert.ToString(dr["BerthNo"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mVesselD = Convert.ToInt32(dr["VesselD"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mHeaderNotes = Convert.ToString(dr["HeaderNotes"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mToCityID = Convert.ToInt32(dr["ToCityID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mExpectedTotalQty = Convert.ToDecimal(dr["ExpectedTotalQty"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mDefaultUnitID = Convert.ToInt32(dr["DefaultUnitID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mFromCityName = Convert.ToString(dr["FromCityName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mServiceTypeName = Convert.ToString(dr["ServiceTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mToCityName = Convert.ToString(dr["ToCityName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mLoadingAndDischargingHeaderTruckersID = Convert.ToInt32(dr["LoadingAndDischargingHeaderTruckersID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mDestinationCityID = Convert.ToInt32(dr["DestinationCityID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mHeaderID = Convert.ToInt32(dr["HeaderID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mDestinationCityName = Convert.ToString(dr["DestinationCityName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mTruckerName = Convert.ToString(dr["TruckerName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mLoadingAndDischargingHeaderTruckersDetailsID = Convert.ToInt32(dr["LoadingAndDischargingHeaderTruckersDetailsID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mVehicleNo = Convert.ToString(dr["VehicleNo"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mCustodyNo = Convert.ToDecimal(dr["CustodyNo"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mBillNo = Convert.ToString(dr["BillNo"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mLoadedQty = Convert.ToDecimal(dr["LoadedQty"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mDefaultUnitName = Convert.ToString(dr["DefaultUnitName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mLoadingAndDischargingTypeName = Convert.ToString(dr["LoadingAndDischargingTypeName"].ToString());
                        lstCVarvwLoadingAndDischargingFullDetails.Add(ObjCVarvwLoadingAndDischargingFullDetails);
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
            lstCVarvwLoadingAndDischargingFullDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwLoadingAndDischargingFullDetails";
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
                        CVarvwLoadingAndDischargingFullDetails ObjCVarvwLoadingAndDischargingFullDetails = new CVarvwLoadingAndDischargingFullDetails();
                        ObjCVarvwLoadingAndDischargingFullDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mFromCityID = Convert.ToInt32(dr["FromCityID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mBerthNo = Convert.ToString(dr["BerthNo"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mVesselD = Convert.ToInt32(dr["VesselD"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mHeaderNotes = Convert.ToString(dr["HeaderNotes"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mToCityID = Convert.ToInt32(dr["ToCityID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mExpectedTotalQty = Convert.ToDecimal(dr["ExpectedTotalQty"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mDefaultUnitID = Convert.ToInt32(dr["DefaultUnitID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mFromCityName = Convert.ToString(dr["FromCityName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mServiceTypeName = Convert.ToString(dr["ServiceTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mToCityName = Convert.ToString(dr["ToCityName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mLoadingAndDischargingHeaderTruckersID = Convert.ToInt32(dr["LoadingAndDischargingHeaderTruckersID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mDestinationCityID = Convert.ToInt32(dr["DestinationCityID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mHeaderID = Convert.ToInt32(dr["HeaderID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mDestinationCityName = Convert.ToString(dr["DestinationCityName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mTruckerName = Convert.ToString(dr["TruckerName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mLoadingAndDischargingHeaderTruckersDetailsID = Convert.ToInt32(dr["LoadingAndDischargingHeaderTruckersDetailsID"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mVehicleNo = Convert.ToString(dr["VehicleNo"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mCustodyNo = Convert.ToDecimal(dr["CustodyNo"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mBillNo = Convert.ToString(dr["BillNo"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mLoadedQty = Convert.ToDecimal(dr["LoadedQty"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mDefaultUnitName = Convert.ToString(dr["DefaultUnitName"].ToString());
                        ObjCVarvwLoadingAndDischargingFullDetails.mLoadingAndDischargingTypeName = Convert.ToString(dr["LoadingAndDischargingTypeName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwLoadingAndDischargingFullDetails.Add(ObjCVarvwLoadingAndDischargingFullDetails);
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
