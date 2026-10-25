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
    public class CPKLoadingAndDischargingHeaerWorkers
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
    public partial class CVarLoadingAndDischargingHeaerWorkers : CPKLoadingAndDischargingHeaerWorkers
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mHeaderID;
        internal Int32 mWorkersTypeID;
        internal Int32 mSupplierID;
        internal Int64 mSerial;
        internal String mNotes;
        internal Int64 mOperationID;
        internal String mBerthNo;
        internal Decimal mExpectedTotalQty;
        internal Int32 mVesselD;
        internal Int32 mCommodityID;
        internal Int32 mMoveTypeID;
        internal DateTime mOpenDate;
        internal DateTime mFromDate;
        internal DateTime mToDate;
        internal Int64 mPayableID;
        #endregion

        #region "Methods"
        public Int32 HeaderID
        {
            get { return mHeaderID; }
            set { mIsChanges = true; mHeaderID = value; }
        }
        public Int32 WorkersTypeID
        {
            get { return mWorkersTypeID; }
            set { mIsChanges = true; mWorkersTypeID = value; }
        }
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mIsChanges = true; mSupplierID = value; }
        }
        public Int64 Serial
        {
            get { return mSerial; }
            set { mIsChanges = true; mSerial = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public String BerthNo
        {
            get { return mBerthNo; }
            set { mIsChanges = true; mBerthNo = value; }
        }
        public Decimal ExpectedTotalQty
        {
            get { return mExpectedTotalQty; }
            set { mIsChanges = true; mExpectedTotalQty = value; }
        }
        public Int32 VesselD
        {
            get { return mVesselD; }
            set { mIsChanges = true; mVesselD = value; }
        }
        public Int32 CommodityID
        {
            get { return mCommodityID; }
            set { mIsChanges = true; mCommodityID = value; }
        }
        public Int32 MoveTypeID
        {
            get { return mMoveTypeID; }
            set { mIsChanges = true; mMoveTypeID = value; }
        }
        public DateTime OpenDate
        {
            get { return mOpenDate; }
            set { mIsChanges = true; mOpenDate = value; }
        }
        public DateTime FromDate
        {
            get { return mFromDate; }
            set { mIsChanges = true; mFromDate = value; }
        }
        public DateTime ToDate
        {
            get { return mToDate; }
            set { mIsChanges = true; mToDate = value; }
        }
        public Int64 PayableID
        {
            get { return mPayableID; }
            set { mIsChanges = true; mPayableID = value; }
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

    public partial class CLoadingAndDischargingHeaerWorkers
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
        public List<CVarLoadingAndDischargingHeaerWorkers> lstCVarLoadingAndDischargingHeaerWorkers = new List<CVarLoadingAndDischargingHeaerWorkers>();
        public List<CPKLoadingAndDischargingHeaerWorkers> lstDeletedCPKLoadingAndDischargingHeaerWorkers = new List<CPKLoadingAndDischargingHeaerWorkers>();
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
        public Exception GetItem(Int32 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarLoadingAndDischargingHeaerWorkers.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListLoadingAndDischargingHeaerWorkers";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemLoadingAndDischargingHeaerWorkers";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                    Com.Parameters[0].Value = Convert.ToInt32(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarLoadingAndDischargingHeaerWorkers ObjCVarLoadingAndDischargingHeaerWorkers = new CVarLoadingAndDischargingHeaerWorkers();
                        ObjCVarLoadingAndDischargingHeaerWorkers.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mHeaderID = Convert.ToInt32(dr["HeaderID"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mWorkersTypeID = Convert.ToInt32(dr["WorkersTypeID"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mBerthNo = Convert.ToString(dr["BerthNo"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mExpectedTotalQty = Convert.ToDecimal(dr["ExpectedTotalQty"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mVesselD = Convert.ToInt32(dr["VesselD"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        lstCVarLoadingAndDischargingHeaerWorkers.Add(ObjCVarLoadingAndDischargingHeaerWorkers);
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
            lstCVarLoadingAndDischargingHeaerWorkers.Clear();

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
                Com.CommandText = "[dbo].GetListPagingLoadingAndDischargingHeaerWorkers";
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
                        CVarLoadingAndDischargingHeaerWorkers ObjCVarLoadingAndDischargingHeaerWorkers = new CVarLoadingAndDischargingHeaerWorkers();
                        ObjCVarLoadingAndDischargingHeaerWorkers.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mHeaderID = Convert.ToInt32(dr["HeaderID"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mWorkersTypeID = Convert.ToInt32(dr["WorkersTypeID"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mBerthNo = Convert.ToString(dr["BerthNo"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mExpectedTotalQty = Convert.ToDecimal(dr["ExpectedTotalQty"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mVesselD = Convert.ToInt32(dr["VesselD"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarLoadingAndDischargingHeaerWorkers.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarLoadingAndDischargingHeaerWorkers.Add(ObjCVarLoadingAndDischargingHeaerWorkers);
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
                    Com.CommandText = "[dbo].DeleteListLoadingAndDischargingHeaerWorkers";
                else
                    Com.CommandText = "[dbo].UpdateListLoadingAndDischargingHeaerWorkers";
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
        public Exception DeleteItem(List<CPKLoadingAndDischargingHeaerWorkers> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemLoadingAndDischargingHeaerWorkers";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKLoadingAndDischargingHeaerWorkers ObjCPKLoadingAndDischargingHeaerWorkers in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKLoadingAndDischargingHeaerWorkers.ID);
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
        public Exception SaveMethod(List<CVarLoadingAndDischargingHeaerWorkers> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@HeaderID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WorkersTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SupplierID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Serial", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@BerthNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ExpectedTotalQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@VesselD", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CommodityID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@MoveTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OpenDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PayableID", SqlDbType.BigInt));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarLoadingAndDischargingHeaerWorkers ObjCVarLoadingAndDischargingHeaerWorkers in SaveList)
                {
                    if (ObjCVarLoadingAndDischargingHeaerWorkers.mIsChanges == true)
                    {
                        if (ObjCVarLoadingAndDischargingHeaerWorkers.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemLoadingAndDischargingHeaerWorkers";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarLoadingAndDischargingHeaerWorkers.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemLoadingAndDischargingHeaerWorkers";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarLoadingAndDischargingHeaerWorkers.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarLoadingAndDischargingHeaerWorkers.ID;
                        }
                        Com.Parameters["@HeaderID"].Value = ObjCVarLoadingAndDischargingHeaerWorkers.HeaderID;
                        Com.Parameters["@WorkersTypeID"].Value = ObjCVarLoadingAndDischargingHeaerWorkers.WorkersTypeID;
                        Com.Parameters["@SupplierID"].Value = ObjCVarLoadingAndDischargingHeaerWorkers.SupplierID;
                        Com.Parameters["@Serial"].Value = ObjCVarLoadingAndDischargingHeaerWorkers.Serial;
                        Com.Parameters["@Notes"].Value = ObjCVarLoadingAndDischargingHeaerWorkers.Notes;
                        Com.Parameters["@OperationID"].Value = ObjCVarLoadingAndDischargingHeaerWorkers.OperationID;
                        Com.Parameters["@BerthNo"].Value = ObjCVarLoadingAndDischargingHeaerWorkers.BerthNo;
                        Com.Parameters["@ExpectedTotalQty"].Value = ObjCVarLoadingAndDischargingHeaerWorkers.ExpectedTotalQty;
                        Com.Parameters["@VesselD"].Value = ObjCVarLoadingAndDischargingHeaerWorkers.VesselD;
                        Com.Parameters["@CommodityID"].Value = ObjCVarLoadingAndDischargingHeaerWorkers.CommodityID;
                        Com.Parameters["@MoveTypeID"].Value = ObjCVarLoadingAndDischargingHeaerWorkers.MoveTypeID;
                        Com.Parameters["@OpenDate"].Value = ObjCVarLoadingAndDischargingHeaerWorkers.OpenDate;
                        Com.Parameters["@FromDate"].Value = ObjCVarLoadingAndDischargingHeaerWorkers.FromDate;
                        Com.Parameters["@ToDate"].Value = ObjCVarLoadingAndDischargingHeaerWorkers.ToDate;
                        Com.Parameters["@PayableID"].Value = ObjCVarLoadingAndDischargingHeaerWorkers.PayableID;
                        EndTrans(Com, Con);
                        if (ObjCVarLoadingAndDischargingHeaerWorkers.ID == 0)
                        {
                            ObjCVarLoadingAndDischargingHeaerWorkers.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarLoadingAndDischargingHeaerWorkers.mIsChanges = false;
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
