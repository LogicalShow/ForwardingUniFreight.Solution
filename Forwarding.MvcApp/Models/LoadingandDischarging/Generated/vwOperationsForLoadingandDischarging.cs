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
    public class CPKvwOperationsForLoadingandDischarging
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
    public partial class CVarvwOperationsForLoadingandDischarging : CPKvwOperationsForLoadingandDischarging
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal Int32 mCodeSerial;
        internal Int32 mMoveTypeID;
        internal String mClientName;
        internal Int32 mClientID;
        internal Int32 mVesselID;
        internal String mVesselName;
        internal Int32 mLD_TransportID;
        internal Int32 mLD_LoadingAndDischargingID;
        internal Int32 mLD_LoadingAndDischargingHeaderWorkerID;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public Int32 CodeSerial
        {
            get { return mCodeSerial; }
            set { mCodeSerial = value; }
        }
        public Int32 MoveTypeID
        {
            get { return mMoveTypeID; }
            set { mMoveTypeID = value; }
        }
        public String ClientName
        {
            get { return mClientName; }
            set { mClientName = value; }
        }
        public Int32 ClientID
        {
            get { return mClientID; }
            set { mClientID = value; }
        }
        public Int32 VesselID
        {
            get { return mVesselID; }
            set { mVesselID = value; }
        }
        public String VesselName
        {
            get { return mVesselName; }
            set { mVesselName = value; }
        }
        public Int32 LD_TransportID
        {
            get { return mLD_TransportID; }
            set { mLD_TransportID = value; }
        }
        public Int32 LD_LoadingAndDischargingID
        {
            get { return mLD_LoadingAndDischargingID; }
            set { mLD_LoadingAndDischargingID = value; }
        }
        public Int32 LD_LoadingAndDischargingHeaderWorkerID
        {
            get { return mLD_LoadingAndDischargingHeaderWorkerID; }
            set { mLD_LoadingAndDischargingHeaderWorkerID = value; }
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

    public partial class CvwOperationsForLoadingandDischarging
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
        public List<CVarvwOperationsForLoadingandDischarging> lstCVarvwOperationsForLoadingandDischarging = new List<CVarvwOperationsForLoadingandDischarging>();
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
            lstCVarvwOperationsForLoadingandDischarging.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwOperationsForLoadingandDischarging";
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
                        CVarvwOperationsForLoadingandDischarging ObjCVarvwOperationsForLoadingandDischarging = new CVarvwOperationsForLoadingandDischarging();
                        ObjCVarvwOperationsForLoadingandDischarging.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mVesselID = Convert.ToInt32(dr["VesselID"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mLD_TransportID = Convert.ToInt32(dr["LD_TransportID"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mLD_LoadingAndDischargingID = Convert.ToInt32(dr["LD_LoadingAndDischargingID"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mLD_LoadingAndDischargingHeaderWorkerID = Convert.ToInt32(dr["LD_LoadingAndDischargingHeaderWorkerID"].ToString());
                        lstCVarvwOperationsForLoadingandDischarging.Add(ObjCVarvwOperationsForLoadingandDischarging);
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
            lstCVarvwOperationsForLoadingandDischarging.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwOperationsForLoadingandDischarging";
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
                        CVarvwOperationsForLoadingandDischarging ObjCVarvwOperationsForLoadingandDischarging = new CVarvwOperationsForLoadingandDischarging();
                        ObjCVarvwOperationsForLoadingandDischarging.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mVesselID = Convert.ToInt32(dr["VesselID"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mLD_TransportID = Convert.ToInt32(dr["LD_TransportID"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mLD_LoadingAndDischargingID = Convert.ToInt32(dr["LD_LoadingAndDischargingID"].ToString());
                        ObjCVarvwOperationsForLoadingandDischarging.mLD_LoadingAndDischargingHeaderWorkerID = Convert.ToInt32(dr["LD_LoadingAndDischargingHeaderWorkerID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwOperationsForLoadingandDischarging.Add(ObjCVarvwOperationsForLoadingandDischarging);
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
