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
    public partial class CVarvwLoadingAndDischargingHeaderCranes
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal Int32 mEquipmentID;
        internal String mNotes;
        internal Int32 mLoadingAndDischargingHeaderID;
        internal DateTime mToDate;
        internal DateTime mFromDate;
        internal String mFromTime;
        internal String mToTime;
        internal String mCraneName;
        internal String mCode;
        internal Int32 mTypeID;
        internal String mTypeName;
        internal Int64 mHeaderSerial;
        internal Int32 mVesselD;
        internal String mVesselName;
        internal DateTime mCloseDate;
        internal DateTime mHeaderFromDate;
        internal DateTime mOpenDate;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 EquipmentID
        {
            get { return mEquipmentID; }
            set { mEquipmentID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Int32 LoadingAndDischargingHeaderID
        {
            get { return mLoadingAndDischargingHeaderID; }
            set { mLoadingAndDischargingHeaderID = value; }
        }
        public DateTime ToDate
        {
            get { return mToDate; }
            set { mToDate = value; }
        }
        public DateTime FromDate
        {
            get { return mFromDate; }
            set { mFromDate = value; }
        }
        public String FromTime
        {
            get { return mFromTime; }
            set { mFromTime = value; }
        }
        public String ToTime
        {
            get { return mToTime; }
            set { mToTime = value; }
        }
        public String CraneName
        {
            get { return mCraneName; }
            set { mCraneName = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public Int32 TypeID
        {
            get { return mTypeID; }
            set { mTypeID = value; }
        }
        public String TypeName
        {
            get { return mTypeName; }
            set { mTypeName = value; }
        }
        public Int64 HeaderSerial
        {
            get { return mHeaderSerial; }
            set { mHeaderSerial = value; }
        }
        public Int32 VesselD
        {
            get { return mVesselD; }
            set { mVesselD = value; }
        }
        public String VesselName
        {
            get { return mVesselName; }
            set { mVesselName = value; }
        }
        public DateTime CloseDate
        {
            get { return mCloseDate; }
            set { mCloseDate = value; }
        }
        public DateTime HeaderFromDate
        {
            get { return mHeaderFromDate; }
            set { mHeaderFromDate = value; }
        }
        public DateTime OpenDate
        {
            get { return mOpenDate; }
            set { mOpenDate = value; }
        }
        #endregion
    }

    public partial class CvwLoadingAndDischargingHeaderCranes
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
        public List<CVarvwLoadingAndDischargingHeaderCranes> lstCVarvwLoadingAndDischargingHeaderCranes = new List<CVarvwLoadingAndDischargingHeaderCranes>();
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
            lstCVarvwLoadingAndDischargingHeaderCranes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwLoadingAndDischargingHeaderCranes";
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
                        CVarvwLoadingAndDischargingHeaderCranes ObjCVarvwLoadingAndDischargingHeaderCranes = new CVarvwLoadingAndDischargingHeaderCranes();
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mLoadingAndDischargingHeaderID = Convert.ToInt32(dr["LoadingAndDischargingHeaderID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mFromTime = Convert.ToString(dr["FromTime"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mToTime = Convert.ToString(dr["ToTime"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mCraneName = Convert.ToString(dr["CraneName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mTypeName = Convert.ToString(dr["TypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mHeaderSerial = Convert.ToInt64(dr["HeaderSerial"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mVesselD = Convert.ToInt32(dr["VesselD"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mHeaderFromDate = Convert.ToDateTime(dr["HeaderFromDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        lstCVarvwLoadingAndDischargingHeaderCranes.Add(ObjCVarvwLoadingAndDischargingHeaderCranes);
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
            lstCVarvwLoadingAndDischargingHeaderCranes.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwLoadingAndDischargingHeaderCranes";
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
                        CVarvwLoadingAndDischargingHeaderCranes ObjCVarvwLoadingAndDischargingHeaderCranes = new CVarvwLoadingAndDischargingHeaderCranes();
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mLoadingAndDischargingHeaderID = Convert.ToInt32(dr["LoadingAndDischargingHeaderID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mFromTime = Convert.ToString(dr["FromTime"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mToTime = Convert.ToString(dr["ToTime"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mCraneName = Convert.ToString(dr["CraneName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mTypeName = Convert.ToString(dr["TypeName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mHeaderSerial = Convert.ToInt64(dr["HeaderSerial"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mVesselD = Convert.ToInt32(dr["VesselD"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mHeaderFromDate = Convert.ToDateTime(dr["HeaderFromDate"].ToString());
                        ObjCVarvwLoadingAndDischargingHeaderCranes.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwLoadingAndDischargingHeaderCranes.Add(ObjCVarvwLoadingAndDischargingHeaderCranes);
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
