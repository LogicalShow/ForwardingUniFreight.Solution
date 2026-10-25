using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

//Com.CommandTimeout = 2000;
namespace Forwarding.MvcApp.Models.Warehousing.Reports.Customized
{
    [Serializable]
    public class CPKvwWH_VehicleReport
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarvwWH_VehicleReport : CPKvwWH_VehicleReport
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mReceiveDetailsID;
        internal Int64 mOperationVehicleID;
        internal String mChassisNumber;
        internal Int64 mOperation;
        internal String mOperationCode;
        internal Int32 mOperationCodeSerial;
        internal String mDispatchNumber;
        internal Int32 mCustomerID;
        internal String mCustomerName;
        internal Int32 mWarehouseID;
        internal String mWarehouseCode;
        internal String mWarehouseName;
        internal Int64 mReceiveVehicleActionID;
        internal Int32 mReceiveVehicleActionTypeID;
        internal String mReceiveVehicleActionTypeName;
        internal Int64 mReceiveDoc;
        internal Int64 mReceiveID;
        internal String mReceiveCode;
        internal DateTime mReceiveDate;
        internal DateTime mReceiveFinalizeDate;
        internal Int32 mLocationID;
        internal String mLocationCode;
        internal Int64 mPickupVehicleActionID;
        internal Int32 mPickupVehicleActionTypeID;
        internal String mPickupVehicleActionTypeName;
        internal Int64 mPickupDoc;
        internal Int64 mPickupID;
        internal String mPickupCode;
        internal DateTime mPickupRequiredDate;
        internal DateTime mPickupFinalizeDate;
        internal Int32 mStorageDays;
        #endregion

        #region "Methods"
        public Int64 ReceiveDetailsID
        {
            get { return mReceiveDetailsID; }
            set { mReceiveDetailsID = value; }
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
        public Int64 Operation
        {
            get { return mOperation; }
            set { mOperation = value; }
        }
        public String OperationCode
        {
            get { return mOperationCode; }
            set { mOperationCode = value; }
        }
        public Int32 OperationCodeSerial
        {
            get { return mOperationCodeSerial; }
            set { mOperationCodeSerial = value; }
        }
        public String DispatchNumber
        {
            get { return mDispatchNumber; }
            set { mDispatchNumber = value; }
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
        public Int32 WarehouseID
        {
            get { return mWarehouseID; }
            set { mWarehouseID = value; }
        }
        public String WarehouseCode
        {
            get { return mWarehouseCode; }
            set { mWarehouseCode = value; }
        }
        public String WarehouseName
        {
            get { return mWarehouseName; }
            set { mWarehouseName = value; }
        }
        public Int64 ReceiveVehicleActionID
        {
            get { return mReceiveVehicleActionID; }
            set { mReceiveVehicleActionID = value; }
        }
        public Int32 ReceiveVehicleActionTypeID
        {
            get { return mReceiveVehicleActionTypeID; }
            set { mReceiveVehicleActionTypeID = value; }
        }
        public String ReceiveVehicleActionTypeName
        {
            get { return mReceiveVehicleActionTypeName; }
            set { mReceiveVehicleActionTypeName = value; }
        }
        public Int64 ReceiveDoc
        {
            get { return mReceiveDoc; }
            set { mReceiveDoc = value; }
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
        public DateTime ReceiveDate
        {
            get { return mReceiveDate; }
            set { mReceiveDate = value; }
        }
        public DateTime ReceiveFinalizeDate
        {
            get { return mReceiveFinalizeDate; }
            set { mReceiveFinalizeDate = value; }
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
        public Int64 PickupVehicleActionID
        {
            get { return mPickupVehicleActionID; }
            set { mPickupVehicleActionID = value; }
        }
        public Int32 PickupVehicleActionTypeID
        {
            get { return mPickupVehicleActionTypeID; }
            set { mPickupVehicleActionTypeID = value; }
        }
        public String PickupVehicleActionTypeName
        {
            get { return mPickupVehicleActionTypeName; }
            set { mPickupVehicleActionTypeName = value; }
        }
        public Int64 PickupDoc
        {
            get { return mPickupDoc; }
            set { mPickupDoc = value; }
        }
        public Int64 PickupID
        {
            get { return mPickupID; }
            set { mPickupID = value; }
        }
        public String PickupCode
        {
            get { return mPickupCode; }
            set { mPickupCode = value; }
        }
        public DateTime PickupRequiredDate
        {
            get { return mPickupRequiredDate; }
            set { mPickupRequiredDate = value; }
        }
        public DateTime PickupFinalizeDate
        {
            get { return mPickupFinalizeDate; }
            set { mPickupFinalizeDate = value; }
        }
        public Int32 StorageDays
        {
            get { return mStorageDays; }
            set { mStorageDays = value; }
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

    public partial class CvwWH_VehicleReport
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
        public List<CVarvwWH_VehicleReport> lstCVarvwWH_VehicleReport = new List<CVarvwWH_VehicleReport>();
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
            lstCVarvwWH_VehicleReport.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwWH_VehicleReport";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 2000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwWH_VehicleReport ObjCVarvwWH_VehicleReport = new CVarvwWH_VehicleReport();
                        ObjCVarvwWH_VehicleReport.mReceiveDetailsID = Convert.ToInt64(dr["ReceiveDetailsID"].ToString());
                        ObjCVarvwWH_VehicleReport.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarvwWH_VehicleReport.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
                        ObjCVarvwWH_VehicleReport.mOperation = Convert.ToInt64(dr["Operation"].ToString());
                        ObjCVarvwWH_VehicleReport.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwWH_VehicleReport.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwWH_VehicleReport.mDispatchNumber = Convert.ToString(dr["DispatchNumber"].ToString());
                        ObjCVarvwWH_VehicleReport.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwWH_VehicleReport.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwWH_VehicleReport.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
                        ObjCVarvwWH_VehicleReport.mWarehouseCode = Convert.ToString(dr["WarehouseCode"].ToString());
                        ObjCVarvwWH_VehicleReport.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
                        ObjCVarvwWH_VehicleReport.mReceiveVehicleActionID = Convert.ToInt64(dr["ReceiveVehicleActionID"].ToString());
                        ObjCVarvwWH_VehicleReport.mReceiveVehicleActionTypeID = Convert.ToInt32(dr["ReceiveVehicleActionTypeID"].ToString());
                        ObjCVarvwWH_VehicleReport.mReceiveVehicleActionTypeName = Convert.ToString(dr["ReceiveVehicleActionTypeName"].ToString());
                        ObjCVarvwWH_VehicleReport.mReceiveDoc = Convert.ToInt64(dr["ReceiveDoc"].ToString());
                        ObjCVarvwWH_VehicleReport.mReceiveID = Convert.ToInt64(dr["ReceiveID"].ToString());
                        ObjCVarvwWH_VehicleReport.mReceiveCode = Convert.ToString(dr["ReceiveCode"].ToString());
                        ObjCVarvwWH_VehicleReport.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
                        ObjCVarvwWH_VehicleReport.mReceiveFinalizeDate = Convert.ToDateTime(dr["ReceiveFinalizeDate"].ToString());
                        ObjCVarvwWH_VehicleReport.mLocationID = Convert.ToInt32(dr["LocationID"].ToString());
                        ObjCVarvwWH_VehicleReport.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
                        ObjCVarvwWH_VehicleReport.mPickupVehicleActionID = Convert.ToInt64(dr["PickupVehicleActionID"].ToString());
                        ObjCVarvwWH_VehicleReport.mPickupVehicleActionTypeID = Convert.ToInt32(dr["PickupVehicleActionTypeID"].ToString());
                        ObjCVarvwWH_VehicleReport.mPickupVehicleActionTypeName = Convert.ToString(dr["PickupVehicleActionTypeName"].ToString());
                        ObjCVarvwWH_VehicleReport.mPickupDoc = Convert.ToInt64(dr["PickupDoc"].ToString());
                        ObjCVarvwWH_VehicleReport.mPickupID = Convert.ToInt64(dr["PickupID"].ToString());
                        ObjCVarvwWH_VehicleReport.mPickupCode = Convert.ToString(dr["PickupCode"].ToString());
                        ObjCVarvwWH_VehicleReport.mPickupRequiredDate = Convert.ToDateTime(dr["PickupRequiredDate"].ToString());
                        ObjCVarvwWH_VehicleReport.mPickupFinalizeDate = Convert.ToDateTime(dr["PickupFinalizeDate"].ToString());
                        ObjCVarvwWH_VehicleReport.mStorageDays = Convert.ToInt32(dr["StorageDays"].ToString());
                        lstCVarvwWH_VehicleReport.Add(ObjCVarvwWH_VehicleReport);
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
            lstCVarvwWH_VehicleReport.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwWH_VehicleReport";
                Com.Parameters[0].Value = PageSize;
                Com.Parameters[1].Value = PageNumber;
                Com.Parameters[2].Value = WhereClause;
                Com.Parameters[3].Value = OrderBy;
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 2000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwWH_VehicleReport ObjCVarvwWH_VehicleReport = new CVarvwWH_VehicleReport();
                        ObjCVarvwWH_VehicleReport.mReceiveDetailsID = Convert.ToInt64(dr["ReceiveDetailsID"].ToString());
                        ObjCVarvwWH_VehicleReport.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarvwWH_VehicleReport.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
                        ObjCVarvwWH_VehicleReport.mOperation = Convert.ToInt64(dr["Operation"].ToString());
                        ObjCVarvwWH_VehicleReport.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwWH_VehicleReport.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwWH_VehicleReport.mDispatchNumber = Convert.ToString(dr["DispatchNumber"].ToString());
                        ObjCVarvwWH_VehicleReport.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwWH_VehicleReport.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwWH_VehicleReport.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
                        ObjCVarvwWH_VehicleReport.mWarehouseCode = Convert.ToString(dr["WarehouseCode"].ToString());
                        ObjCVarvwWH_VehicleReport.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
                        ObjCVarvwWH_VehicleReport.mReceiveVehicleActionID = Convert.ToInt64(dr["ReceiveVehicleActionID"].ToString());
                        ObjCVarvwWH_VehicleReport.mReceiveVehicleActionTypeID = Convert.ToInt32(dr["ReceiveVehicleActionTypeID"].ToString());
                        ObjCVarvwWH_VehicleReport.mReceiveVehicleActionTypeName = Convert.ToString(dr["ReceiveVehicleActionTypeName"].ToString());
                        ObjCVarvwWH_VehicleReport.mReceiveDoc = Convert.ToInt64(dr["ReceiveDoc"].ToString());
                        ObjCVarvwWH_VehicleReport.mReceiveID = Convert.ToInt64(dr["ReceiveID"].ToString());
                        ObjCVarvwWH_VehicleReport.mReceiveCode = Convert.ToString(dr["ReceiveCode"].ToString());
                        ObjCVarvwWH_VehicleReport.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
                        ObjCVarvwWH_VehicleReport.mReceiveFinalizeDate = Convert.ToDateTime(dr["ReceiveFinalizeDate"].ToString());
                        ObjCVarvwWH_VehicleReport.mLocationID = Convert.ToInt32(dr["LocationID"].ToString());
                        ObjCVarvwWH_VehicleReport.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
                        ObjCVarvwWH_VehicleReport.mPickupVehicleActionID = Convert.ToInt64(dr["PickupVehicleActionID"].ToString());
                        ObjCVarvwWH_VehicleReport.mPickupVehicleActionTypeID = Convert.ToInt32(dr["PickupVehicleActionTypeID"].ToString());
                        ObjCVarvwWH_VehicleReport.mPickupVehicleActionTypeName = Convert.ToString(dr["PickupVehicleActionTypeName"].ToString());
                        ObjCVarvwWH_VehicleReport.mPickupDoc = Convert.ToInt64(dr["PickupDoc"].ToString());
                        ObjCVarvwWH_VehicleReport.mPickupID = Convert.ToInt64(dr["PickupID"].ToString());
                        ObjCVarvwWH_VehicleReport.mPickupCode = Convert.ToString(dr["PickupCode"].ToString());
                        ObjCVarvwWH_VehicleReport.mPickupRequiredDate = Convert.ToDateTime(dr["PickupRequiredDate"].ToString());
                        ObjCVarvwWH_VehicleReport.mPickupFinalizeDate = Convert.ToDateTime(dr["PickupFinalizeDate"].ToString());
                        ObjCVarvwWH_VehicleReport.mStorageDays = Convert.ToInt32(dr["StorageDays"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwWH_VehicleReport.Add(ObjCVarvwWH_VehicleReport);
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
