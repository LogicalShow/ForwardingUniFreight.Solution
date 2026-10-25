using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.Reports.Generated
{
    [Serializable]
    public class CPKWH_VehicleAgingReport
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
    public partial class CVarWH_VehicleAgingReport : CPKWH_VehicleAgingReport
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationVehicleID;
        internal Int64 mReceiveDetailsID;
        internal Int64 mPickupDetailsLocationID;
        internal Boolean mIsReturn;
        internal Boolean mIsOracleInsert;
        internal Boolean mIsOracleUpdate;
        internal Boolean mIsAddExtraDayForFirstCutOff;
        internal Boolean mIsExcluded;
        internal String mChassisNumber;
        internal Int64 mOperationID;
        internal String mDispatchNumber;
        internal Int32 mCustomerID;
        internal Int32 mWarehouseID;
        internal DateTime mReceiveDate;
        internal DateTime mReceiveFinalizeDate;
        internal DateTime mPickupRequiredDate;
        internal DateTime mPickupFinalizeDate;
        internal DateTime mPreviousCutOffDate;
        internal DateTime mPickupWithoutInvoiceDate;
        #endregion

        #region "Methods"
        public Int64 OperationVehicleID
        {
            get { return mOperationVehicleID; }
            set { mIsChanges = true; mOperationVehicleID = value; }
        }
        public Int64 ReceiveDetailsID
        {
            get { return mReceiveDetailsID; }
            set { mIsChanges = true; mReceiveDetailsID = value; }
        }
        public Int64 PickupDetailsLocationID
        {
            get { return mPickupDetailsLocationID; }
            set { mIsChanges = true; mPickupDetailsLocationID = value; }
        }
        public Boolean IsReturn
        {
            get { return mIsReturn; }
            set { mIsChanges = true; mIsReturn = value; }
        }
        public Boolean IsOracleInsert
        {
            get { return mIsOracleInsert; }
            set { mIsChanges = true; mIsOracleInsert = value; }
        }
        public Boolean IsOracleUpdate
        {
            get { return mIsOracleUpdate; }
            set { mIsChanges = true; mIsOracleUpdate = value; }
        }
        public Boolean IsAddExtraDayForFirstCutOff
        {
            get { return mIsAddExtraDayForFirstCutOff; }
            set { mIsChanges = true; mIsAddExtraDayForFirstCutOff = value; }
        }
        public Boolean IsExcluded
        {
            get { return mIsExcluded; }
            set { mIsChanges = true; mIsExcluded = value; }
        }
        public String ChassisNumber
        {
            get { return mChassisNumber; }
            set { mIsChanges = true; mChassisNumber = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public String DispatchNumber
        {
            get { return mDispatchNumber; }
            set { mIsChanges = true; mDispatchNumber = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mIsChanges = true; mCustomerID = value; }
        }
        public Int32 WarehouseID
        {
            get { return mWarehouseID; }
            set { mIsChanges = true; mWarehouseID = value; }
        }
        public DateTime ReceiveDate
        {
            get { return mReceiveDate; }
            set { mIsChanges = true; mReceiveDate = value; }
        }
        public DateTime ReceiveFinalizeDate
        {
            get { return mReceiveFinalizeDate; }
            set { mIsChanges = true; mReceiveFinalizeDate = value; }
        }
        public DateTime PickupRequiredDate
        {
            get { return mPickupRequiredDate; }
            set { mIsChanges = true; mPickupRequiredDate = value; }
        }
        public DateTime PickupFinalizeDate
        {
            get { return mPickupFinalizeDate; }
            set { mIsChanges = true; mPickupFinalizeDate = value; }
        }
        public DateTime PreviousCutOffDate
        {
            get { return mPreviousCutOffDate; }
            set { mIsChanges = true; mPreviousCutOffDate = value; }
        }
        public DateTime PickupWithoutInvoiceDate
        {
            get { return mPickupWithoutInvoiceDate; }
            set { mIsChanges = true; mPickupWithoutInvoiceDate = value; }
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

    public partial class CWH_VehicleAgingReport
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
        public List<CVarWH_VehicleAgingReport> lstCVarWH_VehicleAgingReport = new List<CVarWH_VehicleAgingReport>();
        public List<CPKWH_VehicleAgingReport> lstDeletedCPKWH_VehicleAgingReport = new List<CPKWH_VehicleAgingReport>();
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
        public Exception GetItem(Int64 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarWH_VehicleAgingReport.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListWH_VehicleAgingReport";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemWH_VehicleAgingReport";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                    Com.Parameters[0].Value = Convert.ToInt64(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarWH_VehicleAgingReport ObjCVarWH_VehicleAgingReport = new CVarWH_VehicleAgingReport();
                        ObjCVarWH_VehicleAgingReport.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarWH_VehicleAgingReport.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarWH_VehicleAgingReport.mReceiveDetailsID = Convert.ToInt64(dr["ReceiveDetailsID"].ToString());
                        ObjCVarWH_VehicleAgingReport.mPickupDetailsLocationID = Convert.ToInt64(dr["PickupDetailsLocationID"].ToString());
                        ObjCVarWH_VehicleAgingReport.mIsReturn = Convert.ToBoolean(dr["IsReturn"].ToString());
                        ObjCVarWH_VehicleAgingReport.mIsOracleInsert = Convert.ToBoolean(dr["IsOracleInsert"].ToString());
                        ObjCVarWH_VehicleAgingReport.mIsOracleUpdate = Convert.ToBoolean(dr["IsOracleUpdate"].ToString());
                        ObjCVarWH_VehicleAgingReport.mIsAddExtraDayForFirstCutOff = Convert.ToBoolean(dr["IsAddExtraDayForFirstCutOff"].ToString());
                        ObjCVarWH_VehicleAgingReport.mIsExcluded = Convert.ToBoolean(dr["IsExcluded"].ToString());
                        ObjCVarWH_VehicleAgingReport.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
                        ObjCVarWH_VehicleAgingReport.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarWH_VehicleAgingReport.mDispatchNumber = Convert.ToString(dr["DispatchNumber"].ToString());
                        ObjCVarWH_VehicleAgingReport.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarWH_VehicleAgingReport.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
                        ObjCVarWH_VehicleAgingReport.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
                        ObjCVarWH_VehicleAgingReport.mReceiveFinalizeDate = Convert.ToDateTime(dr["ReceiveFinalizeDate"].ToString());
                        ObjCVarWH_VehicleAgingReport.mPickupRequiredDate = Convert.ToDateTime(dr["PickupRequiredDate"].ToString());
                        ObjCVarWH_VehicleAgingReport.mPickupFinalizeDate = Convert.ToDateTime(dr["PickupFinalizeDate"].ToString());
                        ObjCVarWH_VehicleAgingReport.mPreviousCutOffDate = Convert.ToDateTime(dr["PreviousCutOffDate"].ToString());
                        ObjCVarWH_VehicleAgingReport.mPickupWithoutInvoiceDate = Convert.ToDateTime(dr["PickupWithoutInvoiceDate"].ToString());
                        lstCVarWH_VehicleAgingReport.Add(ObjCVarWH_VehicleAgingReport);
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
            lstCVarWH_VehicleAgingReport.Clear();

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
                Com.CommandText = "[dbo].GetListPagingWH_VehicleAgingReport";
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
                        CVarWH_VehicleAgingReport ObjCVarWH_VehicleAgingReport = new CVarWH_VehicleAgingReport();
                        ObjCVarWH_VehicleAgingReport.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarWH_VehicleAgingReport.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarWH_VehicleAgingReport.mReceiveDetailsID = Convert.ToInt64(dr["ReceiveDetailsID"].ToString());
                        ObjCVarWH_VehicleAgingReport.mPickupDetailsLocationID = Convert.ToInt64(dr["PickupDetailsLocationID"].ToString());
                        ObjCVarWH_VehicleAgingReport.mIsReturn = Convert.ToBoolean(dr["IsReturn"].ToString());
                        ObjCVarWH_VehicleAgingReport.mIsOracleInsert = Convert.ToBoolean(dr["IsOracleInsert"].ToString());
                        ObjCVarWH_VehicleAgingReport.mIsOracleUpdate = Convert.ToBoolean(dr["IsOracleUpdate"].ToString());
                        ObjCVarWH_VehicleAgingReport.mIsAddExtraDayForFirstCutOff = Convert.ToBoolean(dr["IsAddExtraDayForFirstCutOff"].ToString());
                        ObjCVarWH_VehicleAgingReport.mIsExcluded = Convert.ToBoolean(dr["IsExcluded"].ToString());
                        ObjCVarWH_VehicleAgingReport.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
                        ObjCVarWH_VehicleAgingReport.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarWH_VehicleAgingReport.mDispatchNumber = Convert.ToString(dr["DispatchNumber"].ToString());
                        ObjCVarWH_VehicleAgingReport.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarWH_VehicleAgingReport.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
                        ObjCVarWH_VehicleAgingReport.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
                        ObjCVarWH_VehicleAgingReport.mReceiveFinalizeDate = Convert.ToDateTime(dr["ReceiveFinalizeDate"].ToString());
                        ObjCVarWH_VehicleAgingReport.mPickupRequiredDate = Convert.ToDateTime(dr["PickupRequiredDate"].ToString());
                        ObjCVarWH_VehicleAgingReport.mPickupFinalizeDate = Convert.ToDateTime(dr["PickupFinalizeDate"].ToString());
                        ObjCVarWH_VehicleAgingReport.mPreviousCutOffDate = Convert.ToDateTime(dr["PreviousCutOffDate"].ToString());
                        ObjCVarWH_VehicleAgingReport.mPickupWithoutInvoiceDate = Convert.ToDateTime(dr["PickupWithoutInvoiceDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarWH_VehicleAgingReport.Add(ObjCVarWH_VehicleAgingReport);
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
        #region "Common Methods"
        private void BeginTrans(SqlCommand Com, SqlConnection Con)
        {

            tr = Con.BeginTransaction(IsolationLevel.Serializable);
            Com.CommandType = CommandType.StoredProcedure;
        }

        private void EndTrans(SqlCommand Com, SqlConnection Con)
        {

            Com.Transaction = tr;
            Com.Connection = Con;
            Com.ExecuteNonQuery();
            tr.Commit();
        }

        #endregion
        #region "Set List Method"
        private Exception SetList(string WhereClause, Boolean IsDelete)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListWH_VehicleAgingReport";
                else
                    Com.CommandText = "[dbo].UpdateListWH_VehicleAgingReport";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                BeginTrans(Com, Con);
                Com.Parameters[0].Value = WhereClause;
                EndTrans(Com, Con);
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
        #region "Delete Methods"
        public Exception DeleteItem(List<CPKWH_VehicleAgingReport> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemWH_VehicleAgingReport";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKWH_VehicleAgingReport ObjCPKWH_VehicleAgingReport in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKWH_VehicleAgingReport.ID);
                    EndTrans(Com, Con);
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                Con.Close();
                Con.Dispose();
                DeleteList.Clear();
            }
            return Exp;
        }

        public Exception DeleteList(string WhereClause)
        {

            return SetList(WhereClause, true);
        }

        #endregion
        #region "Save Methods"
        public Exception SaveMethod(List<CVarWH_VehicleAgingReport> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@OperationVehicleID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ReceiveDetailsID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@PickupDetailsLocationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@IsReturn", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsOracleInsert", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsOracleUpdate", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsAddExtraDayForFirstCutOff", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsExcluded", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ChassisNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@DispatchNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CustomerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WarehouseID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ReceiveDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ReceiveFinalizeDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PickupRequiredDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PickupFinalizeDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PreviousCutOffDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PickupWithoutInvoiceDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarWH_VehicleAgingReport ObjCVarWH_VehicleAgingReport in SaveList)
                {
                    if (ObjCVarWH_VehicleAgingReport.mIsChanges == true)
                    {
                        if (ObjCVarWH_VehicleAgingReport.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemWH_VehicleAgingReport";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarWH_VehicleAgingReport.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemWH_VehicleAgingReport";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarWH_VehicleAgingReport.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarWH_VehicleAgingReport.ID;
                        }
                        Com.Parameters["@OperationVehicleID"].Value = ObjCVarWH_VehicleAgingReport.OperationVehicleID;
                        Com.Parameters["@ReceiveDetailsID"].Value = ObjCVarWH_VehicleAgingReport.ReceiveDetailsID;
                        Com.Parameters["@PickupDetailsLocationID"].Value = ObjCVarWH_VehicleAgingReport.PickupDetailsLocationID;
                        Com.Parameters["@IsReturn"].Value = ObjCVarWH_VehicleAgingReport.IsReturn;
                        Com.Parameters["@IsOracleInsert"].Value = ObjCVarWH_VehicleAgingReport.IsOracleInsert;
                        Com.Parameters["@IsOracleUpdate"].Value = ObjCVarWH_VehicleAgingReport.IsOracleUpdate;
                        Com.Parameters["@IsAddExtraDayForFirstCutOff"].Value = ObjCVarWH_VehicleAgingReport.IsAddExtraDayForFirstCutOff;
                        Com.Parameters["@IsExcluded"].Value = ObjCVarWH_VehicleAgingReport.IsExcluded;
                        Com.Parameters["@ChassisNumber"].Value = ObjCVarWH_VehicleAgingReport.ChassisNumber;
                        Com.Parameters["@OperationID"].Value = ObjCVarWH_VehicleAgingReport.OperationID;
                        Com.Parameters["@DispatchNumber"].Value = ObjCVarWH_VehicleAgingReport.DispatchNumber;
                        Com.Parameters["@CustomerID"].Value = ObjCVarWH_VehicleAgingReport.CustomerID;
                        Com.Parameters["@WarehouseID"].Value = ObjCVarWH_VehicleAgingReport.WarehouseID;
                        Com.Parameters["@ReceiveDate"].Value = ObjCVarWH_VehicleAgingReport.ReceiveDate;
                        Com.Parameters["@ReceiveFinalizeDate"].Value = ObjCVarWH_VehicleAgingReport.ReceiveFinalizeDate;
                        Com.Parameters["@PickupRequiredDate"].Value = ObjCVarWH_VehicleAgingReport.PickupRequiredDate;
                        Com.Parameters["@PickupFinalizeDate"].Value = ObjCVarWH_VehicleAgingReport.PickupFinalizeDate;
                        Com.Parameters["@PreviousCutOffDate"].Value = ObjCVarWH_VehicleAgingReport.PreviousCutOffDate;
                        Com.Parameters["@PickupWithoutInvoiceDate"].Value = ObjCVarWH_VehicleAgingReport.PickupWithoutInvoiceDate;
                        EndTrans(Com, Con);
                        if (ObjCVarWH_VehicleAgingReport.ID == 0)
                        {
                            ObjCVarWH_VehicleAgingReport.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarWH_VehicleAgingReport.mIsChanges = false;
                    }
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
                if (tr != null)
                    tr.Rollback();
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return Exp;
        }
        #endregion
        #region "Update Methods"
        public Exception UpdateList(string UpdateClause)
        {

            return SetList(UpdateClause, false);
        }

        #endregion
    }
}
