using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

//Com.CommandTimeout = 2000;
namespace Forwarding.MvcApp.Models.Operations.Operations.Customized
{
    [Serializable]
    public partial class CVarvwTripIncentive
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Int32 mDriverID;
        internal Int32 mDriverCode;
        internal String mDriverName;
        internal String mTruckingOrderCode;
        internal Int32 mEquipmentModelID;
        internal String mEquipmentModelName;
        internal DateTime mGateInDate;
        internal DateTime mGateOutDate;
        internal String mPOLCountryCode;
        internal String mPOLCountryName;
        internal String mPOLCode;
        internal String mPOLName;
        internal String mPODCountryCode;
        internal String mPODCountryName;
        internal String mPODCode;
        internal String mPODName;
        internal Boolean mIsApproved;
        internal String mClientName;
        internal Decimal mTripIncentiveValue;
        internal Decimal mExtraIncentive;
        internal Decimal mUndoingLoadingOrUnloadingIncentive;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 DriverID
        {
            get { return mDriverID; }
            set { mDriverID = value; }
        }
        public Int32 DriverCode
        {
            get { return mDriverCode; }
            set { mDriverCode = value; }
        }
        public String DriverName
        {
            get { return mDriverName; }
            set { mDriverName = value; }
        }
        public String TruckingOrderCode
        {
            get { return mTruckingOrderCode; }
            set { mTruckingOrderCode = value; }
        }
        public Int32 EquipmentModelID
        {
            get { return mEquipmentModelID; }
            set { mEquipmentModelID = value; }
        }
        public String EquipmentModelName
        {
            get { return mEquipmentModelName; }
            set { mEquipmentModelName = value; }
        }
        public DateTime GateInDate
        {
            get { return mGateInDate; }
            set { mGateInDate = value; }
        }
        public DateTime GateOutDate
        {
            get { return mGateOutDate; }
            set { mGateOutDate = value; }
        }
        public String POLCountryCode
        {
            get { return mPOLCountryCode; }
            set { mPOLCountryCode = value; }
        }
        public String POLCountryName
        {
            get { return mPOLCountryName; }
            set { mPOLCountryName = value; }
        }
        public String POLCode
        {
            get { return mPOLCode; }
            set { mPOLCode = value; }
        }
        public String POLName
        {
            get { return mPOLName; }
            set { mPOLName = value; }
        }
        public String PODCountryCode
        {
            get { return mPODCountryCode; }
            set { mPODCountryCode = value; }
        }
        public String PODCountryName
        {
            get { return mPODCountryName; }
            set { mPODCountryName = value; }
        }
        public String PODCode
        {
            get { return mPODCode; }
            set { mPODCode = value; }
        }
        public String PODName
        {
            get { return mPODName; }
            set { mPODName = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsApproved = value; }
        }
        public String ClientName
        {
            get { return mClientName; }
            set { mClientName = value; }
        }
        public Decimal TripIncentiveValue
        {
            get { return mTripIncentiveValue; }
            set { mTripIncentiveValue = value; }
        }
        public Decimal ExtraIncentive
        {
            get { return mExtraIncentive; }
            set { mExtraIncentive = value; }
        }
        public Decimal UndoingLoadingOrUnloadingIncentive
        {
            get { return mUndoingLoadingOrUnloadingIncentive; }
            set { mUndoingLoadingOrUnloadingIncentive = value; }
        }
        #endregion
    }

    public partial class CvwTripIncentive
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
        public List<CVarvwTripIncentive> lstCVarvwTripIncentive = new List<CVarvwTripIncentive>();
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
            lstCVarvwTripIncentive.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwTripIncentive";
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
                        CVarvwTripIncentive ObjCVarvwTripIncentive = new CVarvwTripIncentive();
                        ObjCVarvwTripIncentive.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwTripIncentive.mDriverID = Convert.ToInt32(dr["DriverID"].ToString());
                        ObjCVarvwTripIncentive.mDriverCode = Convert.ToInt32(dr["DriverCode"].ToString());
                        ObjCVarvwTripIncentive.mDriverName = Convert.ToString(dr["DriverName"].ToString());
                        ObjCVarvwTripIncentive.mTruckingOrderCode = Convert.ToString(dr["TruckingOrderCode"].ToString());
                        ObjCVarvwTripIncentive.mEquipmentModelID = Convert.ToInt32(dr["EquipmentModelID"].ToString());
                        ObjCVarvwTripIncentive.mEquipmentModelName = Convert.ToString(dr["EquipmentModelName"].ToString());
                        ObjCVarvwTripIncentive.mGateInDate = Convert.ToDateTime(dr["GateInDate"].ToString());
                        ObjCVarvwTripIncentive.mGateOutDate = Convert.ToDateTime(dr["GateOutDate"].ToString());
                        ObjCVarvwTripIncentive.mPOLCountryCode = Convert.ToString(dr["POLCountryCode"].ToString());
                        ObjCVarvwTripIncentive.mPOLCountryName = Convert.ToString(dr["POLCountryName"].ToString());
                        ObjCVarvwTripIncentive.mPOLCode = Convert.ToString(dr["POLCode"].ToString());
                        ObjCVarvwTripIncentive.mPOLName = Convert.ToString(dr["POLName"].ToString());
                        ObjCVarvwTripIncentive.mPODCountryCode = Convert.ToString(dr["PODCountryCode"].ToString());
                        ObjCVarvwTripIncentive.mPODCountryName = Convert.ToString(dr["PODCountryName"].ToString());
                        ObjCVarvwTripIncentive.mPODCode = Convert.ToString(dr["PODCode"].ToString());
                        ObjCVarvwTripIncentive.mPODName = Convert.ToString(dr["PODName"].ToString());
                        ObjCVarvwTripIncentive.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwTripIncentive.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwTripIncentive.mTripIncentiveValue = Convert.ToDecimal(dr["TripIncentiveValue"].ToString());
                        ObjCVarvwTripIncentive.mExtraIncentive = Convert.ToDecimal(dr["ExtraIncentive"].ToString());
                        ObjCVarvwTripIncentive.mUndoingLoadingOrUnloadingIncentive = Convert.ToDecimal(dr["UndoingLoadingOrUnloadingIncentive"].ToString());
                        lstCVarvwTripIncentive.Add(ObjCVarvwTripIncentive);
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
            lstCVarvwTripIncentive.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwTripIncentive";
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
                        CVarvwTripIncentive ObjCVarvwTripIncentive = new CVarvwTripIncentive();
                        ObjCVarvwTripIncentive.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwTripIncentive.mDriverID = Convert.ToInt32(dr["DriverID"].ToString());
                        ObjCVarvwTripIncentive.mDriverCode = Convert.ToInt32(dr["DriverCode"].ToString());
                        ObjCVarvwTripIncentive.mDriverName = Convert.ToString(dr["DriverName"].ToString());
                        ObjCVarvwTripIncentive.mTruckingOrderCode = Convert.ToString(dr["TruckingOrderCode"].ToString());
                        ObjCVarvwTripIncentive.mEquipmentModelID = Convert.ToInt32(dr["EquipmentModelID"].ToString());
                        ObjCVarvwTripIncentive.mEquipmentModelName = Convert.ToString(dr["EquipmentModelName"].ToString());
                        ObjCVarvwTripIncentive.mGateInDate = Convert.ToDateTime(dr["GateInDate"].ToString());
                        ObjCVarvwTripIncentive.mGateOutDate = Convert.ToDateTime(dr["GateOutDate"].ToString());
                        ObjCVarvwTripIncentive.mPOLCountryCode = Convert.ToString(dr["POLCountryCode"].ToString());
                        ObjCVarvwTripIncentive.mPOLCountryName = Convert.ToString(dr["POLCountryName"].ToString());
                        ObjCVarvwTripIncentive.mPOLCode = Convert.ToString(dr["POLCode"].ToString());
                        ObjCVarvwTripIncentive.mPOLName = Convert.ToString(dr["POLName"].ToString());
                        ObjCVarvwTripIncentive.mPODCountryCode = Convert.ToString(dr["PODCountryCode"].ToString());
                        ObjCVarvwTripIncentive.mPODCountryName = Convert.ToString(dr["PODCountryName"].ToString());
                        ObjCVarvwTripIncentive.mPODCode = Convert.ToString(dr["PODCode"].ToString());
                        ObjCVarvwTripIncentive.mPODName = Convert.ToString(dr["PODName"].ToString());
                        ObjCVarvwTripIncentive.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwTripIncentive.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwTripIncentive.mTripIncentiveValue = Convert.ToDecimal(dr["TripIncentiveValue"].ToString());
                        ObjCVarvwTripIncentive.mExtraIncentive = Convert.ToDecimal(dr["ExtraIncentive"].ToString());
                        ObjCVarvwTripIncentive.mUndoingLoadingOrUnloadingIncentive = Convert.ToDecimal(dr["UndoingLoadingOrUnloadingIncentive"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwTripIncentive.Add(ObjCVarvwTripIncentive);
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
