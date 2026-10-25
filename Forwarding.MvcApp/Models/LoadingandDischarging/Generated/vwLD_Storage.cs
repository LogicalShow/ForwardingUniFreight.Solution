using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.LoadingandDischarging.Generated
{
    [Serializable]
    public class CPKvwLD_Storage
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
    public partial class CVarvwLD_Storage : CPKvwLD_Storage
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
        internal Decimal mTotalLoadedQty_UnPackaged;
        internal Decimal mTotalLoadedQty_Packaged;
        internal DateTime mOpenDate;
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
        public DateTime OpenDate
        {
            get { return mOpenDate; }
            set { mOpenDate = value; }
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

    public partial class CvwLD_Storage
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
        public List<CVarvwLD_Storage> lstCVarvwLD_Storage = new List<CVarvwLD_Storage>();
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
            lstCVarvwLD_Storage.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwLD_Storage";
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
                        CVarvwLD_Storage ObjCVarvwLD_Storage = new CVarvwLD_Storage();
                        ObjCVarvwLD_Storage.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwLD_Storage.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarvwLD_Storage.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwLD_Storage.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwLD_Storage.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwLD_Storage.mFromCityID = Convert.ToInt32(dr["FromCityID"].ToString());
                        ObjCVarvwLD_Storage.mBerthNo = Convert.ToString(dr["BerthNo"].ToString());
                        ObjCVarvwLD_Storage.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwLD_Storage.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarvwLD_Storage.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarvwLD_Storage.mVesselD = Convert.ToInt32(dr["VesselD"].ToString());
                        ObjCVarvwLD_Storage.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwLD_Storage.mToCityID = Convert.ToInt32(dr["ToCityID"].ToString());
                        ObjCVarvwLD_Storage.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwLD_Storage.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
                        ObjCVarvwLD_Storage.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarvwLD_Storage.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwLD_Storage.mExpectedTotalQty = Convert.ToDecimal(dr["ExpectedTotalQty"].ToString());
                        ObjCVarvwLD_Storage.mDefaultUnitID = Convert.ToInt32(dr["DefaultUnitID"].ToString());
                        ObjCVarvwLD_Storage.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwLD_Storage.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwLD_Storage.mFromCityName = Convert.ToString(dr["FromCityName"].ToString());
                        ObjCVarvwLD_Storage.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
                        ObjCVarvwLD_Storage.mServiceTypeName = Convert.ToString(dr["ServiceTypeName"].ToString());
                        ObjCVarvwLD_Storage.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwLD_Storage.mToCityName = Convert.ToString(dr["ToCityName"].ToString());
                        ObjCVarvwLD_Storage.mDefaultUnitName = Convert.ToString(dr["DefaultUnitName"].ToString());
                        ObjCVarvwLD_Storage.mLoadingAndDischargingTypeName = Convert.ToString(dr["LoadingAndDischargingTypeName"].ToString());
                        ObjCVarvwLD_Storage.mTotalLoadedQty_UnPackaged = Convert.ToDecimal(dr["TotalLoadedQty_UnPackaged"].ToString());
                        ObjCVarvwLD_Storage.mTotalLoadedQty_Packaged = Convert.ToDecimal(dr["TotalLoadedQty_Packaged"].ToString());
                        ObjCVarvwLD_Storage.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        lstCVarvwLD_Storage.Add(ObjCVarvwLD_Storage);
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
            lstCVarvwLD_Storage.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwLD_Storage";
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
                        CVarvwLD_Storage ObjCVarvwLD_Storage = new CVarvwLD_Storage();
                        ObjCVarvwLD_Storage.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwLD_Storage.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarvwLD_Storage.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwLD_Storage.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwLD_Storage.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwLD_Storage.mFromCityID = Convert.ToInt32(dr["FromCityID"].ToString());
                        ObjCVarvwLD_Storage.mBerthNo = Convert.ToString(dr["BerthNo"].ToString());
                        ObjCVarvwLD_Storage.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwLD_Storage.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarvwLD_Storage.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarvwLD_Storage.mVesselD = Convert.ToInt32(dr["VesselD"].ToString());
                        ObjCVarvwLD_Storage.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwLD_Storage.mToCityID = Convert.ToInt32(dr["ToCityID"].ToString());
                        ObjCVarvwLD_Storage.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwLD_Storage.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
                        ObjCVarvwLD_Storage.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarvwLD_Storage.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwLD_Storage.mExpectedTotalQty = Convert.ToDecimal(dr["ExpectedTotalQty"].ToString());
                        ObjCVarvwLD_Storage.mDefaultUnitID = Convert.ToInt32(dr["DefaultUnitID"].ToString());
                        ObjCVarvwLD_Storage.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwLD_Storage.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwLD_Storage.mFromCityName = Convert.ToString(dr["FromCityName"].ToString());
                        ObjCVarvwLD_Storage.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
                        ObjCVarvwLD_Storage.mServiceTypeName = Convert.ToString(dr["ServiceTypeName"].ToString());
                        ObjCVarvwLD_Storage.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwLD_Storage.mToCityName = Convert.ToString(dr["ToCityName"].ToString());
                        ObjCVarvwLD_Storage.mDefaultUnitName = Convert.ToString(dr["DefaultUnitName"].ToString());
                        ObjCVarvwLD_Storage.mLoadingAndDischargingTypeName = Convert.ToString(dr["LoadingAndDischargingTypeName"].ToString());
                        ObjCVarvwLD_Storage.mTotalLoadedQty_UnPackaged = Convert.ToDecimal(dr["TotalLoadedQty_UnPackaged"].ToString());
                        ObjCVarvwLD_Storage.mTotalLoadedQty_Packaged = Convert.ToDecimal(dr["TotalLoadedQty_Packaged"].ToString());
                        ObjCVarvwLD_Storage.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwLD_Storage.Add(ObjCVarvwLD_Storage);
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