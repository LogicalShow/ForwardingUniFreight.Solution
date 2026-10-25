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
    public partial class CVarvwLoadingAndDischargingHeaerWorkers
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
        internal Decimal mExpectedTotalQty;
        internal String mBerthNo;
        internal Int32 mCommodityID;
        internal Int32 mMoveTypeID;
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
        public Decimal ExpectedTotalQty
        {
            get { return mExpectedTotalQty; }
            set { mExpectedTotalQty = value; }
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
        #endregion
    }

    public partial class CvwLoadingAndDischargingHeaerWorkers
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
        public List<CVarvwLoadingAndDischargingHeaerWorkers> lstCVarvwLoadingAndDischargingHeaerWorkers = new List<CVarvwLoadingAndDischargingHeaerWorkers>();
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
            lstCVarvwLoadingAndDischargingHeaerWorkers.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwLoadingAndDischargingHeaerWorkers";
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
                        CVarvwLoadingAndDischargingHeaerWorkers ObjCVarvwLoadingAndDischargingHeaerWorkers = new CVarvwLoadingAndDischargingHeaerWorkers();
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mHeaderID = Convert.ToInt32(dr["HeaderID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mWorkersTypeID = Convert.ToInt32(dr["WorkersTypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mWorkersTypeName = Convert.ToString(dr["WorkersTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mVesselD = Convert.ToInt32(dr["VesselD"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mExpectedTotalQty = Convert.ToDecimal(dr["ExpectedTotalQty"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mBerthNo = Convert.ToString(dr["BerthNo"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        lstCVarvwLoadingAndDischargingHeaerWorkers.Add(ObjCVarvwLoadingAndDischargingHeaerWorkers);
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
            lstCVarvwLoadingAndDischargingHeaerWorkers.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwLoadingAndDischargingHeaerWorkers";
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
                        CVarvwLoadingAndDischargingHeaerWorkers ObjCVarvwLoadingAndDischargingHeaerWorkers = new CVarvwLoadingAndDischargingHeaerWorkers();
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mHeaderID = Convert.ToInt32(dr["HeaderID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mWorkersTypeID = Convert.ToInt32(dr["WorkersTypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mWorkersTypeName = Convert.ToString(dr["WorkersTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mVesselD = Convert.ToInt32(dr["VesselD"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mExpectedTotalQty = Convert.ToDecimal(dr["ExpectedTotalQty"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mBerthNo = Convert.ToString(dr["BerthNo"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaerWorkers.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwLoadingAndDischargingHeaerWorkers.Add(ObjCVarvwLoadingAndDischargingHeaerWorkers);
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
