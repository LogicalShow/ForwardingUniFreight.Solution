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
    public class CPKLD_Storage
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
    public partial class CVarLD_Storage : CPKLD_Storage
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

    public partial class CLD_Storage
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
        public List<CVarLD_Storage> lstCVarLD_Storage = new List<CVarLD_Storage>();
        public List<CPKLD_Storage> lstDeletedCPKLD_Storage = new List<CPKLD_Storage>();
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
            lstCVarLD_Storage.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListLD_Storage";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemLD_Storage";
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
                        CVarLD_Storage ObjCVarLD_Storage = new CVarLD_Storage();
                        ObjCVarLD_Storage.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLD_Storage.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarLD_Storage.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarLD_Storage.mFromCityID = Convert.ToInt32(dr["FromCityID"].ToString());
                        ObjCVarLD_Storage.mBerthNo = Convert.ToString(dr["BerthNo"].ToString());
                        ObjCVarLD_Storage.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarLD_Storage.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarLD_Storage.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarLD_Storage.mVesselD = Convert.ToInt32(dr["VesselD"].ToString());
                        ObjCVarLD_Storage.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarLD_Storage.mToCityID = Convert.ToInt32(dr["ToCityID"].ToString());
                        ObjCVarLD_Storage.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarLD_Storage.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarLD_Storage.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
                        ObjCVarLD_Storage.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarLD_Storage.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarLD_Storage.mExpectedTotalQty = Convert.ToDecimal(dr["ExpectedTotalQty"].ToString());
                        ObjCVarLD_Storage.mDefaultUnitID = Convert.ToInt32(dr["DefaultUnitID"].ToString());
                        lstCVarLD_Storage.Add(ObjCVarLD_Storage);
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
            lstCVarLD_Storage.Clear();

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
                Com.CommandText = "[dbo].GetListPagingLD_Storage";
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
                        CVarLD_Storage ObjCVarLD_Storage = new CVarLD_Storage();
                        ObjCVarLD_Storage.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLD_Storage.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarLD_Storage.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarLD_Storage.mFromCityID = Convert.ToInt32(dr["FromCityID"].ToString());
                        ObjCVarLD_Storage.mBerthNo = Convert.ToString(dr["BerthNo"].ToString());
                        ObjCVarLD_Storage.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarLD_Storage.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarLD_Storage.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarLD_Storage.mVesselD = Convert.ToInt32(dr["VesselD"].ToString());
                        ObjCVarLD_Storage.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarLD_Storage.mToCityID = Convert.ToInt32(dr["ToCityID"].ToString());
                        ObjCVarLD_Storage.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarLD_Storage.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarLD_Storage.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
                        ObjCVarLD_Storage.mParentID = Convert.ToInt32(dr["ParentID"].ToString());
                        ObjCVarLD_Storage.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarLD_Storage.mExpectedTotalQty = Convert.ToDecimal(dr["ExpectedTotalQty"].ToString());
                        ObjCVarLD_Storage.mDefaultUnitID = Convert.ToInt32(dr["DefaultUnitID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarLD_Storage.Add(ObjCVarLD_Storage);
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
                    Com.CommandText = "[dbo].DeleteListLD_Storage";
                else
                    Com.CommandText = "[dbo].UpdateListLD_Storage";
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
        public Exception DeleteItem(List<CPKLD_Storage> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemLD_Storage";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKLD_Storage ObjCPKLD_Storage in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKLD_Storage.ID);
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
        public Exception SaveMethod(List<CVarLD_Storage> SaveList)
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
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarLD_Storage ObjCVarLD_Storage in SaveList)
                {
                    if (ObjCVarLD_Storage.mIsChanges == true)
                    {
                        if (ObjCVarLD_Storage.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemLD_Storage";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarLD_Storage.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemLD_Storage";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarLD_Storage.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarLD_Storage.ID;
                        }
                        Com.Parameters["@OperationID"].Value = ObjCVarLD_Storage.OperationID;
                        Com.Parameters["@CustomerID"].Value = ObjCVarLD_Storage.CustomerID;
                        Com.Parameters["@FromCityID"].Value = ObjCVarLD_Storage.FromCityID;
                        Com.Parameters["@BerthNo"].Value = ObjCVarLD_Storage.BerthNo;
                        Com.Parameters["@CommodityID"].Value = ObjCVarLD_Storage.CommodityID;
                        Com.Parameters["@MoveTypeID"].Value = ObjCVarLD_Storage.MoveTypeID;
                        Com.Parameters["@CloseDate"].Value = ObjCVarLD_Storage.CloseDate;
                        Com.Parameters["@VesselD"].Value = ObjCVarLD_Storage.VesselD;
                        Com.Parameters["@Notes"].Value = ObjCVarLD_Storage.Notes;
                        Com.Parameters["@ToCityID"].Value = ObjCVarLD_Storage.ToCityID;
                        Com.Parameters["@Code"].Value = ObjCVarLD_Storage.Code;
                        Com.Parameters["@Serial"].Value = ObjCVarLD_Storage.Serial;
                        Com.Parameters["@TypeID"].Value = ObjCVarLD_Storage.TypeID;
                        Com.Parameters["@ParentID"].Value = ObjCVarLD_Storage.ParentID;
                        Com.Parameters["@FromDate"].Value = ObjCVarLD_Storage.FromDate;
                        Com.Parameters["@ExpectedTotalQty"].Value = ObjCVarLD_Storage.ExpectedTotalQty;
                        Com.Parameters["@DefaultUnitID"].Value = ObjCVarLD_Storage.DefaultUnitID;
                        EndTrans(Com, Con);
                        if (ObjCVarLD_Storage.ID == 0)
                        {
                            ObjCVarLD_Storage.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarLD_Storage.mIsChanges = false;
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