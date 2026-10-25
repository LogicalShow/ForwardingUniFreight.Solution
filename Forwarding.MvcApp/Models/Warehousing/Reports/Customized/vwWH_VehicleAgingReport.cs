using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

//Com.CommandTimeout = 2000;
namespace Forwarding.MvcApp.Models.Warehousing.Reports.Customized
{
    [Serializable]
    public class CPKvwWH_VehicleAgingReport
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
    public partial class CVarvwWH_VehicleAgingReport : CPKvwWH_VehicleAgingReport
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mReceiveDetailsID;
        internal Int64 mOperationVehicleID;
        internal String mChassisNumber;
        internal Int64 mOperationID;
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
        internal Int64 mPickupVehicleActionID;
        internal Int32 mPickupVehicleActionTypeID;
        internal String mPickupVehicleActionTypeName;
        internal Int64 mPickupDoc;
        internal Int64 mPickupDetailsLocationID;
        internal Int64 mPickupID;
        internal String mPickupCode;
        internal DateTime mPickupRequiredDate;
        internal DateTime mPickupFinalizeDate;
        internal Int32 mStorageDays;
        internal Boolean mIsAddExtraDayForFirstCutOff;
        internal DateTime mPreviousCutOffDate;
        internal Int32 mReceivablesCount;
        internal DateTime mLastReceivableCutOffDate;
        internal Boolean mIsPickupAddedToInvoice;
        internal DateTime mPickupWithoutInvoiceDate;
        internal Boolean mIsExcluded;
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
        public Int64 PickupDetailsLocationID
        {
            get { return mPickupDetailsLocationID; }
            set { mPickupDetailsLocationID = value; }
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
        public Boolean IsAddExtraDayForFirstCutOff
        {
            get { return mIsAddExtraDayForFirstCutOff; }
            set { mIsAddExtraDayForFirstCutOff = value; }
        }
        public DateTime PreviousCutOffDate
        {
            get { return mPreviousCutOffDate; }
            set { mPreviousCutOffDate = value; }
        }
        public Int32 ReceivablesCount
        {
            get { return mReceivablesCount; }
            set { mReceivablesCount = value; }
        }
        public DateTime LastReceivableCutOffDate
        {
            get { return mLastReceivableCutOffDate; }
            set { mLastReceivableCutOffDate = value; }
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
        public Boolean IsExcluded
        {
            get { return mIsExcluded; }
            set { mIsExcluded = value; }
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

    public partial class CvwWH_VehicleAgingReport
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
        public List<CVarvwWH_VehicleAgingReport> lstCVarvwWH_VehicleAgingReport = new List<CVarvwWH_VehicleAgingReport>();
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
            lstCVarvwWH_VehicleAgingReport.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwWH_VehicleAgingReport";
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
                        CVarvwWH_VehicleAgingReport ObjCVarvwWH_VehicleAgingReport = new CVarvwWH_VehicleAgingReport();
                        ObjCVarvwWH_VehicleAgingReport.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceiveDetailsID = Convert.ToInt64(dr["ReceiveDetailsID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mDispatchNumber = Convert.ToString(dr["DispatchNumber"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mWarehouseCode = Convert.ToString(dr["WarehouseCode"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceiveVehicleActionID = Convert.ToInt64(dr["ReceiveVehicleActionID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceiveVehicleActionTypeID = Convert.ToInt32(dr["ReceiveVehicleActionTypeID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceiveVehicleActionTypeName = Convert.ToString(dr["ReceiveVehicleActionTypeName"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceiveDoc = Convert.ToInt64(dr["ReceiveDoc"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceiveID = Convert.ToInt64(dr["ReceiveID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceiveCode = Convert.ToString(dr["ReceiveCode"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceiveFinalizeDate = Convert.ToDateTime(dr["ReceiveFinalizeDate"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupVehicleActionID = Convert.ToInt64(dr["PickupVehicleActionID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupVehicleActionTypeID = Convert.ToInt32(dr["PickupVehicleActionTypeID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupVehicleActionTypeName = Convert.ToString(dr["PickupVehicleActionTypeName"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupDoc = Convert.ToInt64(dr["PickupDoc"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupDetailsLocationID = Convert.ToInt64(dr["PickupDetailsLocationID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupID = Convert.ToInt64(dr["PickupID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupCode = Convert.ToString(dr["PickupCode"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupRequiredDate = Convert.ToDateTime(dr["PickupRequiredDate"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupFinalizeDate = Convert.ToDateTime(dr["PickupFinalizeDate"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mStorageDays = Convert.ToInt32(dr["StorageDays"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mIsAddExtraDayForFirstCutOff = Convert.ToBoolean(dr["IsAddExtraDayForFirstCutOff"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPreviousCutOffDate = Convert.ToDateTime(dr["PreviousCutOffDate"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceivablesCount = Convert.ToInt32(dr["ReceivablesCount"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mLastReceivableCutOffDate = Convert.ToDateTime(dr["LastReceivableCutOffDate"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mIsPickupAddedToInvoice = Convert.ToBoolean(dr["IsPickupAddedToInvoice"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupWithoutInvoiceDate = Convert.ToDateTime(dr["PickupWithoutInvoiceDate"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mIsExcluded = Convert.ToBoolean(dr["IsExcluded"].ToString());
                        lstCVarvwWH_VehicleAgingReport.Add(ObjCVarvwWH_VehicleAgingReport);
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
            lstCVarvwWH_VehicleAgingReport.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwWH_VehicleAgingReport";
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
                        CVarvwWH_VehicleAgingReport ObjCVarvwWH_VehicleAgingReport = new CVarvwWH_VehicleAgingReport();
                        ObjCVarvwWH_VehicleAgingReport.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceiveDetailsID = Convert.ToInt64(dr["ReceiveDetailsID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mDispatchNumber = Convert.ToString(dr["DispatchNumber"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mWarehouseCode = Convert.ToString(dr["WarehouseCode"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceiveVehicleActionID = Convert.ToInt64(dr["ReceiveVehicleActionID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceiveVehicleActionTypeID = Convert.ToInt32(dr["ReceiveVehicleActionTypeID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceiveVehicleActionTypeName = Convert.ToString(dr["ReceiveVehicleActionTypeName"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceiveDoc = Convert.ToInt64(dr["ReceiveDoc"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceiveID = Convert.ToInt64(dr["ReceiveID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceiveCode = Convert.ToString(dr["ReceiveCode"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceiveFinalizeDate = Convert.ToDateTime(dr["ReceiveFinalizeDate"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupVehicleActionID = Convert.ToInt64(dr["PickupVehicleActionID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupVehicleActionTypeID = Convert.ToInt32(dr["PickupVehicleActionTypeID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupVehicleActionTypeName = Convert.ToString(dr["PickupVehicleActionTypeName"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupDoc = Convert.ToInt64(dr["PickupDoc"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupDetailsLocationID = Convert.ToInt64(dr["PickupDetailsLocationID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupID = Convert.ToInt64(dr["PickupID"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupCode = Convert.ToString(dr["PickupCode"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupRequiredDate = Convert.ToDateTime(dr["PickupRequiredDate"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupFinalizeDate = Convert.ToDateTime(dr["PickupFinalizeDate"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mStorageDays = Convert.ToInt32(dr["StorageDays"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mIsAddExtraDayForFirstCutOff = Convert.ToBoolean(dr["IsAddExtraDayForFirstCutOff"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPreviousCutOffDate = Convert.ToDateTime(dr["PreviousCutOffDate"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mReceivablesCount = Convert.ToInt32(dr["ReceivablesCount"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mLastReceivableCutOffDate = Convert.ToDateTime(dr["LastReceivableCutOffDate"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mIsPickupAddedToInvoice = Convert.ToBoolean(dr["IsPickupAddedToInvoice"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mPickupWithoutInvoiceDate = Convert.ToDateTime(dr["PickupWithoutInvoiceDate"].ToString());
                        ObjCVarvwWH_VehicleAgingReport.mIsExcluded = Convert.ToBoolean(dr["IsExcluded"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwWH_VehicleAgingReport.Add(ObjCVarvwWH_VehicleAgingReport);
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
