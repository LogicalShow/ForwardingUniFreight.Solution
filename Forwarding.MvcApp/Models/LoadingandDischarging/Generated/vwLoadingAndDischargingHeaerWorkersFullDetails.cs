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
    public partial class CVarvwLoadingAndDischargingHeaerWorkersFullDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal Int64 mSerial;
        internal Int32 mHeaderID;
        internal Int32 mWorkersTypeID;
        internal String mWorkersTypeName;
        internal Int32 mSupplierID;
        internal String mNotes;
        internal String mSupplierName;
        internal Int32 mOperationCodeSerial;
        internal Int64 mOperationID;
        internal String mOperationCode;
        internal Int32 mCustomerID;
        internal String mCustomerName;
        internal Int32 mVesselD;
        internal String mVesselName;
        internal DateTime mOpenDate;
        internal DateTime mFromDate;
        internal DateTime mToDate;
        internal Int32 mCommodityID;
        internal String mCommodityName;
        internal Int32 mMoveTypeID;
        internal String mMoveTypeName;
        internal String mBerthNo;
        internal Decimal mExpectedTotalQty;
        internal Decimal mAmount;
        internal Decimal mCount;
        internal Decimal mTotal;
        internal DateTime mDate;
        internal String mPeriodName;
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
        public Int32 HeaderID
        {
            get { return mHeaderID; }
            set { mHeaderID = value; }
        }
        public Int32 WorkersTypeID
        {
            get { return mWorkersTypeID; }
            set { mWorkersTypeID = value; }
        }
        public String WorkersTypeName
        {
            get { return mWorkersTypeName; }
            set { mWorkersTypeName = value; }
        }
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mSupplierID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public String SupplierName
        {
            get { return mSupplierName; }
            set { mSupplierName = value; }
        }
        public Int32 OperationCodeSerial
        {
            get { return mOperationCodeSerial; }
            set { mOperationCodeSerial = value; }
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
        public Int32 VesselD
        {
            get { return mVesselD; }
            set { mVesselD = value; }
        }
        public String VesselName
        {
            get { return mVesselName; }
            set { mVesselName = value; }
        }
        public DateTime OpenDate
        {
            get { return mOpenDate; }
            set { mOpenDate = value; }
        }
        public DateTime FromDate
        {
            get { return mFromDate; }
            set { mFromDate = value; }
        }
        public DateTime ToDate
        {
            get { return mToDate; }
            set { mToDate = value; }
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
        public String BerthNo
        {
            get { return mBerthNo; }
            set { mBerthNo = value; }
        }
        public Decimal ExpectedTotalQty
        {
            get { return mExpectedTotalQty; }
            set { mExpectedTotalQty = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mAmount = value; }
        }
        public Decimal Count
        {
            get { return mCount; }
            set { mCount = value; }
        }
        public Decimal Total
        {
            get { return mTotal; }
            set { mTotal = value; }
        }
        public DateTime Date
        {
            get { return mDate; }
            set { mDate = value; }
        }
        public String PeriodName
        {
            get { return mPeriodName; }
            set { mPeriodName = value; }
        }
        #endregion
    }

    public partial class CvwLoadingAndDischargingHeaerWorkersFullDetails
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
        public List<CVarvwLoadingAndDischargingHeaerWorkersFullDetails> lstCVarvwLoadingAndDischargingHeaerWorkersFullDetails = new List<CVarvwLoadingAndDischargingHeaerWorkersFullDetails>();
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
            lstCVarvwLoadingAndDischargingHeaerWorkersFullDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwLoadingAndDischargingHeaerWorkersFullDetails";
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
                        CVarvwLoadingAndDischargingHeaerWorkersFullDetails ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails = new CVarvwLoadingAndDischargingHeaerWorkersFullDetails();
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mHeaderID = Convert.ToInt32(dr["HeaderID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mWorkersTypeID = Convert.ToInt32(dr["WorkersTypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mWorkersTypeName = Convert.ToString(dr["WorkersTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mVesselD = Convert.ToInt32(dr["VesselD"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mMoveTypeName = Convert.ToString(dr["MoveTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mBerthNo = Convert.ToString(dr["BerthNo"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mExpectedTotalQty = Convert.ToDecimal(dr["ExpectedTotalQty"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mCount = Convert.ToDecimal(dr["Count"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mTotal = Convert.ToDecimal(dr["Total"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mPeriodName = Convert.ToString(dr["PeriodName"].ToString());
                        lstCVarvwLoadingAndDischargingHeaerWorkersFullDetails.Add(ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails);
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
            lstCVarvwLoadingAndDischargingHeaerWorkersFullDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwLoadingAndDischargingHeaerWorkersFullDetails";
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
                        CVarvwLoadingAndDischargingHeaerWorkersFullDetails ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails = new CVarvwLoadingAndDischargingHeaerWorkersFullDetails();
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mHeaderID = Convert.ToInt32(dr["HeaderID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mWorkersTypeID = Convert.ToInt32(dr["WorkersTypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mWorkersTypeName = Convert.ToString(dr["WorkersTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mVesselD = Convert.ToInt32(dr["VesselD"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mMoveTypeName = Convert.ToString(dr["MoveTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mBerthNo = Convert.ToString(dr["BerthNo"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mExpectedTotalQty = Convert.ToDecimal(dr["ExpectedTotalQty"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mCount = Convert.ToDecimal(dr["Count"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mTotal = Convert.ToDecimal(dr["Total"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails.mPeriodName = Convert.ToString(dr["PeriodName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwLoadingAndDischargingHeaerWorkersFullDetails.Add(ObjCVarvwLoadingAndDischargingHeaerWorkersFullDetails);
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
