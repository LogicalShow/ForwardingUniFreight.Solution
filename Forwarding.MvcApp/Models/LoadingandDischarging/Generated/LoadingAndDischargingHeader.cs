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
    public class CPKLoadingAndDischargingHeader
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
    public partial class CVarLoadingAndDischargingHeader : CPKLoadingAndDischargingHeader
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationID;
        internal Int32 mCustomerID;
        internal Int32 mFromCityID;
        internal String mBerthNo;
        internal Int32 mCommodityID;
        internal Int32 mMoveTypeID;
        internal DateTime mCloseDate;
        internal Int32 mVesselD;
        internal String mNotes;
        internal Int32 mToCityID;
        internal String mCode;
        internal Int64 mSerial;
        internal Int32 mTypeID;
        internal Int32 mParentID;
        internal DateTime mFromDate;
        internal Decimal mExpectedTotalQty;
        internal Int32 mDefaultUnitID;
        internal DateTime mStartDate;
        #endregion

        #region "Methods"
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mIsChanges = true; mCustomerID = value; }
        }
        public Int32 FromCityID
        {
            get { return mFromCityID; }
            set { mIsChanges = true; mFromCityID = value; }
        }
        public String BerthNo
        {
            get { return mBerthNo; }
            set { mIsChanges = true; mBerthNo = value; }
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
        public DateTime CloseDate
        {
            get { return mCloseDate; }
            set { mIsChanges = true; mCloseDate = value; }
        }
        public Int32 VesselD
        {
            get { return mVesselD; }
            set { mIsChanges = true; mVesselD = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int32 ToCityID
        {
            get { return mToCityID; }
            set { mIsChanges = true; mToCityID = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public Int64 Serial
        {
            get { return mSerial; }
            set { mIsChanges = true; mSerial = value; }
        }
        public Int32 TypeID
        {
            get { return mTypeID; }
            set { mIsChanges = true; mTypeID = value; }
        }
        public Int32 ParentID
        {
            get { return mParentID; }
            set { mIsChanges = true; mParentID = value; }
        }
        public DateTime FromDate
        {
            get { return mFromDate; }
            set { mIsChanges = true; mFromDate = value; }
        }
        public Decimal ExpectedTotalQty
        {
            get { return mExpectedTotalQty; }
            set { mIsChanges = true; mExpectedTotalQty = value; }
        }
        public Int32 DefaultUnitID
        {
            get { return mDefaultUnitID; }
            set { mIsChanges = true; mDefaultUnitID = value; }
        }
        public DateTime StartDate
        {
            get { return mStartDate; }
            set { mIsChanges = true; mStartDate = value; }
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

    public partial class CLoadingAndDischargingHeader
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
        public List<CVarLoadingAndDischargingHeader> lstCVarLoadingAndDischargingHeader = new List<CVarLoadingAndDischargingHeader>();
        public List<CPKLoadingAndDischargingHeader> lstDeletedCPKLoadingAndDischargingHeader = new List<CPKLoadingAndDischargingHeader>();
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
            lstCVarLoadingAndDischargingHeader.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListLoadingAndDischargingHeader";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemLoadingAndDischargingHeader";
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
                        CVarLoadingAndDischargingHeader ObjCVarLoadingAndDischargingHeader = new CVarLoadingAndDischargingHeader();
                        ObjCVarLoadingAndDischargingHeader.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mFromCityID = Convert.ToInt32(dr["FromCityID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mBerthNo = Convert.ToString(dr["BerthNo"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mVesselD = Convert.ToInt32(dr["VesselD"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mToCityID = Convert.ToInt32(dr["ToCityID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mExpectedTotalQty = Convert.ToDecimal(dr["ExpectedTotalQty"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mDefaultUnitID = Convert.ToInt32(dr["DefaultUnitID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mStartDate = Convert.ToDateTime(dr["StartDate"].ToString());
                        lstCVarLoadingAndDischargingHeader.Add(ObjCVarLoadingAndDischargingHeader);
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
            lstCVarLoadingAndDischargingHeader.Clear();

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
                Com.CommandText = "[dbo].GetListPagingLoadingAndDischargingHeader";
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
                        CVarLoadingAndDischargingHeader ObjCVarLoadingAndDischargingHeader = new CVarLoadingAndDischargingHeader();
                        ObjCVarLoadingAndDischargingHeader.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mFromCityID = Convert.ToInt32(dr["FromCityID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mBerthNo = Convert.ToString(dr["BerthNo"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mVesselD = Convert.ToInt32(dr["VesselD"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mToCityID = Convert.ToInt32(dr["ToCityID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mExpectedTotalQty = Convert.ToDecimal(dr["ExpectedTotalQty"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mDefaultUnitID = Convert.ToInt32(dr["DefaultUnitID"].ToString());
                        ObjCVarLoadingAndDischargingHeader.mStartDate = Convert.ToDateTime(dr["StartDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarLoadingAndDischargingHeader.Add(ObjCVarLoadingAndDischargingHeader);
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
                    Com.CommandText = "[dbo].DeleteListLoadingAndDischargingHeader";
                else
                    Com.CommandText = "[dbo].UpdateListLoadingAndDischargingHeader";
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
        public Exception DeleteItem(List<CPKLoadingAndDischargingHeader> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemLoadingAndDischargingHeader";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKLoadingAndDischargingHeader ObjCPKLoadingAndDischargingHeader in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKLoadingAndDischargingHeader.ID);
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
        public Exception SaveMethod(List<CVarLoadingAndDischargingHeader> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@CustomerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@FromCityID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@BerthNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CommodityID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@MoveTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CloseDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@VesselD", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ToCityID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Serial", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@TypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ParentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ExpectedTotalQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DefaultUnitID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@StartDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarLoadingAndDischargingHeader ObjCVarLoadingAndDischargingHeader in SaveList)
                {
                    if (ObjCVarLoadingAndDischargingHeader.mIsChanges == true)
                    {
                        if (ObjCVarLoadingAndDischargingHeader.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemLoadingAndDischargingHeader";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarLoadingAndDischargingHeader.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemLoadingAndDischargingHeader";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarLoadingAndDischargingHeader.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarLoadingAndDischargingHeader.ID;
                        }
                        Com.Parameters["@OperationID"].Value = ObjCVarLoadingAndDischargingHeader.OperationID;
                        Com.Parameters["@CustomerID"].Value = ObjCVarLoadingAndDischargingHeader.CustomerID;
                        Com.Parameters["@FromCityID"].Value = ObjCVarLoadingAndDischargingHeader.FromCityID;
                        Com.Parameters["@BerthNo"].Value = ObjCVarLoadingAndDischargingHeader.BerthNo;
                        Com.Parameters["@CommodityID"].Value = ObjCVarLoadingAndDischargingHeader.CommodityID;
                        Com.Parameters["@MoveTypeID"].Value = ObjCVarLoadingAndDischargingHeader.MoveTypeID;
                        Com.Parameters["@CloseDate"].Value = ObjCVarLoadingAndDischargingHeader.CloseDate;
                        Com.Parameters["@VesselD"].Value = ObjCVarLoadingAndDischargingHeader.VesselD;
                        Com.Parameters["@Notes"].Value = ObjCVarLoadingAndDischargingHeader.Notes;
                        Com.Parameters["@ToCityID"].Value = ObjCVarLoadingAndDischargingHeader.ToCityID;
                        Com.Parameters["@Code"].Value = ObjCVarLoadingAndDischargingHeader.Code;
                        Com.Parameters["@Serial"].Value = ObjCVarLoadingAndDischargingHeader.Serial;
                        Com.Parameters["@TypeID"].Value = ObjCVarLoadingAndDischargingHeader.TypeID;
                        Com.Parameters["@ParentID"].Value = ObjCVarLoadingAndDischargingHeader.ParentID;
                        Com.Parameters["@FromDate"].Value = ObjCVarLoadingAndDischargingHeader.FromDate;
                        Com.Parameters["@ExpectedTotalQty"].Value = ObjCVarLoadingAndDischargingHeader.ExpectedTotalQty;
                        Com.Parameters["@DefaultUnitID"].Value = ObjCVarLoadingAndDischargingHeader.DefaultUnitID;
                        Com.Parameters["@StartDate"].Value = ObjCVarLoadingAndDischargingHeader.StartDate;
                        EndTrans(Com, Con);
                        if (ObjCVarLoadingAndDischargingHeader.ID == 0)
                        {
                            ObjCVarLoadingAndDischargingHeader.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarLoadingAndDischargingHeader.mIsChanges = false;
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
