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
    public class CPKLoadingAndDischargingHeaderTruckers
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
    public partial class CVarLoadingAndDischargingHeaderTruckers : CPKLoadingAndDischargingHeaderTruckers
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mTruckerID;
        internal Int32 mDestinationCityID;
        internal Int32 mHeaderID;
        internal Int32 mPackageTypeID;
        internal Int32 mTruckingTypeID;
        internal Int32 mStoreID;
        #endregion

        #region "Methods"
        public Int32 TruckerID
        {
            get { return mTruckerID; }
            set { mIsChanges = true; mTruckerID = value; }
        }
        public Int32 DestinationCityID
        {
            get { return mDestinationCityID; }
            set { mIsChanges = true; mDestinationCityID = value; }
        }
        public Int32 HeaderID
        {
            get { return mHeaderID; }
            set { mIsChanges = true; mHeaderID = value; }
        }
        public Int32 PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mIsChanges = true; mPackageTypeID = value; }
        }
        public Int32 TruckingTypeID
        {
            get { return mTruckingTypeID; }
            set { mIsChanges = true; mTruckingTypeID = value; }
        }
        public Int32 StoreID
        {
            get { return mStoreID; }
            set { mIsChanges = true; mStoreID = value; }
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

    public partial class CLoadingAndDischargingHeaderTruckers
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
        public List<CVarLoadingAndDischargingHeaderTruckers> lstCVarLoadingAndDischargingHeaderTruckers = new List<CVarLoadingAndDischargingHeaderTruckers>();
        public List<CPKLoadingAndDischargingHeaderTruckers> lstDeletedCPKLoadingAndDischargingHeaderTruckers = new List<CPKLoadingAndDischargingHeaderTruckers>();
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
            lstCVarLoadingAndDischargingHeaderTruckers.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListLoadingAndDischargingHeaderTruckers";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemLoadingAndDischargingHeaderTruckers";
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
                        CVarLoadingAndDischargingHeaderTruckers ObjCVarLoadingAndDischargingHeaderTruckers = new CVarLoadingAndDischargingHeaderTruckers();
                        ObjCVarLoadingAndDischargingHeaderTruckers.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckers.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckers.mDestinationCityID = Convert.ToInt32(dr["DestinationCityID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckers.mHeaderID = Convert.ToInt32(dr["HeaderID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckers.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckers.mTruckingTypeID = Convert.ToInt32(dr["TruckingTypeID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckers.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        lstCVarLoadingAndDischargingHeaderTruckers.Add(ObjCVarLoadingAndDischargingHeaderTruckers);
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
            lstCVarLoadingAndDischargingHeaderTruckers.Clear();

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
                Com.CommandText = "[dbo].GetListPagingLoadingAndDischargingHeaderTruckers";
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
                        CVarLoadingAndDischargingHeaderTruckers ObjCVarLoadingAndDischargingHeaderTruckers = new CVarLoadingAndDischargingHeaderTruckers();
                        ObjCVarLoadingAndDischargingHeaderTruckers.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckers.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckers.mDestinationCityID = Convert.ToInt32(dr["DestinationCityID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckers.mHeaderID = Convert.ToInt32(dr["HeaderID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckers.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckers.mTruckingTypeID = Convert.ToInt32(dr["TruckingTypeID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderTruckers.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarLoadingAndDischargingHeaderTruckers.Add(ObjCVarLoadingAndDischargingHeaderTruckers);
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
                    Com.CommandText = "[dbo].DeleteListLoadingAndDischargingHeaderTruckers";
                else
                    Com.CommandText = "[dbo].UpdateListLoadingAndDischargingHeaderTruckers";
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
        public Exception DeleteItem(List<CPKLoadingAndDischargingHeaderTruckers> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemLoadingAndDischargingHeaderTruckers";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKLoadingAndDischargingHeaderTruckers ObjCPKLoadingAndDischargingHeaderTruckers in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKLoadingAndDischargingHeaderTruckers.ID);
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
        public Exception SaveMethod(List<CVarLoadingAndDischargingHeaderTruckers> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@TruckerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DestinationCityID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@HeaderID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PackageTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TruckingTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@StoreID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarLoadingAndDischargingHeaderTruckers ObjCVarLoadingAndDischargingHeaderTruckers in SaveList)
                {
                    if (ObjCVarLoadingAndDischargingHeaderTruckers.mIsChanges == true)
                    {
                        if (ObjCVarLoadingAndDischargingHeaderTruckers.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemLoadingAndDischargingHeaderTruckers";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarLoadingAndDischargingHeaderTruckers.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemLoadingAndDischargingHeaderTruckers";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarLoadingAndDischargingHeaderTruckers.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarLoadingAndDischargingHeaderTruckers.ID;
                        }
                        Com.Parameters["@TruckerID"].Value = ObjCVarLoadingAndDischargingHeaderTruckers.TruckerID;
                        Com.Parameters["@DestinationCityID"].Value = ObjCVarLoadingAndDischargingHeaderTruckers.DestinationCityID;
                        Com.Parameters["@HeaderID"].Value = ObjCVarLoadingAndDischargingHeaderTruckers.HeaderID;
                        Com.Parameters["@PackageTypeID"].Value = ObjCVarLoadingAndDischargingHeaderTruckers.PackageTypeID;
                        Com.Parameters["@TruckingTypeID"].Value = ObjCVarLoadingAndDischargingHeaderTruckers.TruckingTypeID;
                        Com.Parameters["@StoreID"].Value = ObjCVarLoadingAndDischargingHeaderTruckers.StoreID;
                        EndTrans(Com, Con);
                        if (ObjCVarLoadingAndDischargingHeaderTruckers.ID == 0)
                        {
                            ObjCVarLoadingAndDischargingHeaderTruckers.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarLoadingAndDischargingHeaderTruckers.mIsChanges = false;
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
