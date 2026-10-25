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
    public class CPKLoadingAndDischargingHeaderTruckersDetails
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
    public partial class CVarLoadingAndDischargingHeaderTruckersDetails : CPKLoadingAndDischargingHeaderTruckersDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mHeaderTruckerID;
        internal String mVehicleNo;
        internal Decimal mCustodyNo;
        internal String mBillNo;
        internal Decimal mLoadedQty;
        internal String mNotes;
        internal DateTime mDate;
        #endregion

        #region "Methods"
        public Int32 HeaderTruckerID
        {
            get { return mHeaderTruckerID; }
            set { mIsChanges = true; mHeaderTruckerID = value; }
        }
        public String VehicleNo
        {
            get { return mVehicleNo; }
            set { mIsChanges = true; mVehicleNo = value; }
        }
        public Decimal CustodyNo
        {
            get { return mCustodyNo; }
            set { mIsChanges = true; mCustodyNo = value; }
        }
        public String BillNo
        {
            get { return mBillNo; }
            set { mIsChanges = true; mBillNo = value; }
        }
        public Decimal LoadedQty
        {
            get { return mLoadedQty; }
            set { mIsChanges = true; mLoadedQty = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public DateTime Date
        {
            get { return mDate; }
            set { mIsChanges = true; mDate = value; }
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

    public partial class CLoadingAndDischargingHeaderTruckersDetails
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
        public List<CVarLoadingAndDischargingHeaderTruckersDetails> lstCVarLoadingAndDischargingHeaderTruckersDetails = new List<CVarLoadingAndDischargingHeaderTruckersDetails>();
        public List<CPKLoadingAndDischargingHeaderTruckersDetails> lstDeletedCPKLoadingAndDischargingHeaderTruckersDetails = new List<CPKLoadingAndDischargingHeaderTruckersDetails>();
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
            lstCVarLoadingAndDischargingHeaderTruckersDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListLoadingAndDischargingHeaderTruckersDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemLoadingAndDischargingHeaderTruckersDetails";
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
                        CVarLoadingAndDischargingHeaderTruckersDetails ObjCVarLoadingAndDischargingHeaderTruckersDetails = new CVarLoadingAndDischargingHeaderTruckersDetails();
                        ObjCVarLoadingAndDischargingHeaderTruckersDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckersDetails.mHeaderTruckerID = Convert.ToInt32(dr["HeaderTruckerID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckersDetails.mVehicleNo = Convert.ToString(dr["VehicleNo"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckersDetails.mCustodyNo = Convert.ToDecimal(dr["CustodyNo"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckersDetails.mBillNo = Convert.ToString(dr["BillNo"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckersDetails.mLoadedQty = Convert.ToDecimal(dr["LoadedQty"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckersDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckersDetails.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        lstCVarLoadingAndDischargingHeaderTruckersDetails.Add(ObjCVarLoadingAndDischargingHeaderTruckersDetails);
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
            lstCVarLoadingAndDischargingHeaderTruckersDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingLoadingAndDischargingHeaderTruckersDetails";
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
                        CVarLoadingAndDischargingHeaderTruckersDetails ObjCVarLoadingAndDischargingHeaderTruckersDetails = new CVarLoadingAndDischargingHeaderTruckersDetails();
                        ObjCVarLoadingAndDischargingHeaderTruckersDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckersDetails.mHeaderTruckerID = Convert.ToInt32(dr["HeaderTruckerID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckersDetails.mVehicleNo = Convert.ToString(dr["VehicleNo"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckersDetails.mCustodyNo = Convert.ToDecimal(dr["CustodyNo"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckersDetails.mBillNo = Convert.ToString(dr["BillNo"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckersDetails.mLoadedQty = Convert.ToDecimal(dr["LoadedQty"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckersDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckersDetails.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarLoadingAndDischargingHeaderTruckersDetails.Add(ObjCVarLoadingAndDischargingHeaderTruckersDetails);
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
                    Com.CommandText = "[dbo].DeleteListLoadingAndDischargingHeaderTruckersDetails";
                else
                    Com.CommandText = "[dbo].UpdateListLoadingAndDischargingHeaderTruckersDetails";
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
        public Exception DeleteItem(List<CPKLoadingAndDischargingHeaderTruckersDetails> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemLoadingAndDischargingHeaderTruckersDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKLoadingAndDischargingHeaderTruckersDetails ObjCPKLoadingAndDischargingHeaderTruckersDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKLoadingAndDischargingHeaderTruckersDetails.ID);
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
        public Exception SaveMethod(List<CVarLoadingAndDischargingHeaderTruckersDetails> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@HeaderTruckerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@VehicleNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CustodyNo", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@BillNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LoadedQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Date", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarLoadingAndDischargingHeaderTruckersDetails ObjCVarLoadingAndDischargingHeaderTruckersDetails in SaveList)
                {
                    if (ObjCVarLoadingAndDischargingHeaderTruckersDetails.mIsChanges == true)
                    {
                        if (ObjCVarLoadingAndDischargingHeaderTruckersDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemLoadingAndDischargingHeaderTruckersDetails";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarLoadingAndDischargingHeaderTruckersDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemLoadingAndDischargingHeaderTruckersDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarLoadingAndDischargingHeaderTruckersDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarLoadingAndDischargingHeaderTruckersDetails.ID;
                        }
                        Com.Parameters["@HeaderTruckerID"].Value = ObjCVarLoadingAndDischargingHeaderTruckersDetails.HeaderTruckerID;
                        Com.Parameters["@VehicleNo"].Value = ObjCVarLoadingAndDischargingHeaderTruckersDetails.VehicleNo;
                        Com.Parameters["@CustodyNo"].Value = ObjCVarLoadingAndDischargingHeaderTruckersDetails.CustodyNo;
                        Com.Parameters["@BillNo"].Value = ObjCVarLoadingAndDischargingHeaderTruckersDetails.BillNo;
                        Com.Parameters["@LoadedQty"].Value = ObjCVarLoadingAndDischargingHeaderTruckersDetails.LoadedQty;
                        Com.Parameters["@Notes"].Value = ObjCVarLoadingAndDischargingHeaderTruckersDetails.Notes;
                        Com.Parameters["@Date"].Value = ObjCVarLoadingAndDischargingHeaderTruckersDetails.Date;
                        EndTrans(Com, Con);
                        if (ObjCVarLoadingAndDischargingHeaderTruckersDetails.ID == 0)
                        {
                            ObjCVarLoadingAndDischargingHeaderTruckersDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarLoadingAndDischargingHeaderTruckersDetails.mIsChanges = false;
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
