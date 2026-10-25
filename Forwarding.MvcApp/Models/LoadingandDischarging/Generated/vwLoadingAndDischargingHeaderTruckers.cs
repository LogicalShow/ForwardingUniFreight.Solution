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
    public class CPKvwLoadingAndDischargingHeaderTruckers
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
    public partial class CVarvwLoadingAndDischargingHeaderTruckers : CPKvwLoadingAndDischargingHeaderTruckers
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mTruckerID;
        internal Int32 mDestinationCityID;
        internal Int32 mHeaderID;
        internal Int32 mPackageTypeID;
        internal String mPackageTypeName;
        internal Int32 mTruckingTypeID;
        internal String mTruckingTypeName;
        internal String mDestinationCityName;
        internal String mTruckerName;
        internal Int32 mCountOfDetails;
        internal Decimal mTotalLoadedQty;
        internal Decimal mTotalCustody;
        internal Int32 mStoreID;
        internal String mStoreName;
        internal Int32 mTransID;
        internal Int32 mStorageID;
        #endregion

        #region "Methods"
        public Int32 TruckerID
        {
            get { return mTruckerID; }
            set { mTruckerID = value; }
        }
        public Int32 DestinationCityID
        {
            get { return mDestinationCityID; }
            set { mDestinationCityID = value; }
        }
        public Int32 HeaderID
        {
            get { return mHeaderID; }
            set { mHeaderID = value; }
        }
        public Int32 PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mPackageTypeID = value; }
        }
        public String PackageTypeName
        {
            get { return mPackageTypeName; }
            set { mPackageTypeName = value; }
        }
        public Int32 TruckingTypeID
        {
            get { return mTruckingTypeID; }
            set { mTruckingTypeID = value; }
        }
        public String TruckingTypeName
        {
            get { return mTruckingTypeName; }
            set { mTruckingTypeName = value; }
        }
        public String DestinationCityName
        {
            get { return mDestinationCityName; }
            set { mDestinationCityName = value; }
        }
        public String TruckerName
        {
            get { return mTruckerName; }
            set { mTruckerName = value; }
        }
        public Int32 CountOfDetails
        {
            get { return mCountOfDetails; }
            set { mCountOfDetails = value; }
        }
        public Decimal TotalLoadedQty
        {
            get { return mTotalLoadedQty; }
            set { mTotalLoadedQty = value; }
        }
        public Decimal TotalCustody
        {
            get { return mTotalCustody; }
            set { mTotalCustody = value; }
        }
        public Int32 StoreID
        {
            get { return mStoreID; }
            set { mStoreID = value; }
        }
        public String StoreName
        {
            get { return mStoreName; }
            set { mStoreName = value; }
        }
        public Int32 TransID
        {
            get { return mTransID; }
            set { mTransID = value; }
        }
        public Int32 StorageID
        {
            get { return mStorageID; }
            set { mStorageID = value; }
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

    public partial class CvwLoadingAndDischargingHeaderTruckers
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
        public List<CVarvwLoadingAndDischargingHeaderTruckers> lstCVarvwLoadingAndDischargingHeaderTruckers = new List<CVarvwLoadingAndDischargingHeaderTruckers>();
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
            lstCVarvwLoadingAndDischargingHeaderTruckers.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwLoadingAndDischargingHeaderTruckers";
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
                        CVarvwLoadingAndDischargingHeaderTruckers ObjCVarvwLoadingAndDischargingHeaderTruckers = new CVarvwLoadingAndDischargingHeaderTruckers();
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mDestinationCityID = Convert.ToInt32(dr["DestinationCityID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mHeaderID = Convert.ToInt32(dr["HeaderID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mTruckingTypeID = Convert.ToInt32(dr["TruckingTypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mTruckingTypeName = Convert.ToString(dr["TruckingTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mDestinationCityName = Convert.ToString(dr["DestinationCityName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mTruckerName = Convert.ToString(dr["TruckerName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mCountOfDetails = Convert.ToInt32(dr["CountOfDetails"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mTotalLoadedQty = Convert.ToDecimal(dr["TotalLoadedQty"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mTotalCustody = Convert.ToDecimal(dr["TotalCustody"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mStoreName = Convert.ToString(dr["StoreName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mTransID = Convert.ToInt32(dr["TransID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mStorageID = Convert.ToInt32(dr["StorageID"].ToString());
                        lstCVarvwLoadingAndDischargingHeaderTruckers.Add(ObjCVarvwLoadingAndDischargingHeaderTruckers);
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
            lstCVarvwLoadingAndDischargingHeaderTruckers.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwLoadingAndDischargingHeaderTruckers";
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
                        CVarvwLoadingAndDischargingHeaderTruckers ObjCVarvwLoadingAndDischargingHeaderTruckers = new CVarvwLoadingAndDischargingHeaderTruckers();
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mDestinationCityID = Convert.ToInt32(dr["DestinationCityID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mHeaderID = Convert.ToInt32(dr["HeaderID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mTruckingTypeID = Convert.ToInt32(dr["TruckingTypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mTruckingTypeName = Convert.ToString(dr["TruckingTypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mDestinationCityName = Convert.ToString(dr["DestinationCityName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mTruckerName = Convert.ToString(dr["TruckerName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mCountOfDetails = Convert.ToInt32(dr["CountOfDetails"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mTotalLoadedQty = Convert.ToDecimal(dr["TotalLoadedQty"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mTotalCustody = Convert.ToDecimal(dr["TotalCustody"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mStoreName = Convert.ToString(dr["StoreName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mTransID = Convert.ToInt32(dr["TransID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderTruckers.mStorageID = Convert.ToInt32(dr["StorageID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwLoadingAndDischargingHeaderTruckers.Add(ObjCVarvwLoadingAndDischargingHeaderTruckers);
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
