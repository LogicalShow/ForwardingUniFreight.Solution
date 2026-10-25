using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.PricingModule.PricingTab
{
    [Serializable]
    public class CPKvwPricingLog
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
    public partial class CVarvwPricingLog : CPKvwPricingLog
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mPricingID;
        internal Int32 mUserID;
        internal Int32 mCustomerID;
        internal Int32 mCustomerID_Old;
        internal String mCustomerName;
        internal Int32 mShippingLineID;
        internal Int32 mShippingLineID_Old;
        internal String mShippingLineName;
        internal Int32 mAirlineID;
        internal Int32 mAirlineID_Old;
        internal String mAirlineName;
        internal Int32 mTruckerID;
        internal Int32 mTruckerID_Old;
        internal String mTruckerName;
        internal Int32 mCCAID;
        internal Int32 mCCAID_Old;
        internal String mCCAName;
        internal Int32 mPOLCountryID;
        internal Int32 mPOLCountryID_Old;
        internal Int32 mPOLID;
        internal Int32 mPOLID_Old;
        internal String mPOL;
        internal Int32 mPODCountryID;
        internal Int32 mPODCountryID_Old;
        internal Int32 mPODID;
        internal Int32 mPODID_Old;
        internal String mPOD;
        internal Int32 mCommodityID;
        internal Int32 mCommodityID_Old;
        internal String mCommodityName;
        internal String mNotes;
        internal DateTime mCreationDate;
        #endregion

        #region "Methods"
        public Int64 PricingID
        {
            get { return mPricingID; }
            set { mPricingID = value; }
        }
        public Int32 UserID
        {
            get { return mUserID; }
            set { mUserID = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mCustomerID = value; }
        }
        public Int32 CustomerID_Old
        {
            get { return mCustomerID_Old; }
            set { mCustomerID_Old = value; }
        }
        public String CustomerName
        {
            get { return mCustomerName; }
            set { mCustomerName = value; }
        }
        public Int32 ShippingLineID
        {
            get { return mShippingLineID; }
            set { mShippingLineID = value; }
        }
        public Int32 ShippingLineID_Old
        {
            get { return mShippingLineID_Old; }
            set { mShippingLineID_Old = value; }
        }
        public String ShippingLineName
        {
            get { return mShippingLineName; }
            set { mShippingLineName = value; }
        }
        public Int32 AirlineID
        {
            get { return mAirlineID; }
            set { mAirlineID = value; }
        }
        public Int32 AirlineID_Old
        {
            get { return mAirlineID_Old; }
            set { mAirlineID_Old = value; }
        }
        public String AirlineName
        {
            get { return mAirlineName; }
            set { mAirlineName = value; }
        }
        public Int32 TruckerID
        {
            get { return mTruckerID; }
            set { mTruckerID = value; }
        }
        public Int32 TruckerID_Old
        {
            get { return mTruckerID_Old; }
            set { mTruckerID_Old = value; }
        }
        public String TruckerName
        {
            get { return mTruckerName; }
            set { mTruckerName = value; }
        }
        public Int32 CCAID
        {
            get { return mCCAID; }
            set { mCCAID = value; }
        }
        public Int32 CCAID_Old
        {
            get { return mCCAID_Old; }
            set { mCCAID_Old = value; }
        }
        public String CCAName
        {
            get { return mCCAName; }
            set { mCCAName = value; }
        }
        public Int32 POLCountryID
        {
            get { return mPOLCountryID; }
            set { mPOLCountryID = value; }
        }
        public Int32 POLCountryID_Old
        {
            get { return mPOLCountryID_Old; }
            set { mPOLCountryID_Old = value; }
        }
        public Int32 POLID
        {
            get { return mPOLID; }
            set { mPOLID = value; }
        }
        public Int32 POLID_Old
        {
            get { return mPOLID_Old; }
            set { mPOLID_Old = value; }
        }
        public String POL
        {
            get { return mPOL; }
            set { mPOL = value; }
        }
        public Int32 PODCountryID
        {
            get { return mPODCountryID; }
            set { mPODCountryID = value; }
        }
        public Int32 PODCountryID_Old
        {
            get { return mPODCountryID_Old; }
            set { mPODCountryID_Old = value; }
        }
        public Int32 PODID
        {
            get { return mPODID; }
            set { mPODID = value; }
        }
        public Int32 PODID_Old
        {
            get { return mPODID_Old; }
            set { mPODID_Old = value; }
        }
        public String POD
        {
            get { return mPOD; }
            set { mPOD = value; }
        }
        public Int32 CommodityID
        {
            get { return mCommodityID; }
            set { mCommodityID = value; }
        }
        public Int32 CommodityID_Old
        {
            get { return mCommodityID_Old; }
            set { mCommodityID_Old = value; }
        }
        public String CommodityName
        {
            get { return mCommodityName; }
            set { mCommodityName = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
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

    public partial class CvwPricingLog
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
        public List<CVarvwPricingLog> lstCVarvwPricingLog = new List<CVarvwPricingLog>();
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
            lstCVarvwPricingLog.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPricingLog";
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
                        CVarvwPricingLog ObjCVarvwPricingLog = new CVarvwPricingLog();
                        ObjCVarvwPricingLog.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPricingLog.mPricingID = Convert.ToInt64(dr["PricingID"].ToString());
                        ObjCVarvwPricingLog.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwPricingLog.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwPricingLog.mCustomerID_Old = Convert.ToInt32(dr["CustomerID_Old"].ToString());
                        ObjCVarvwPricingLog.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwPricingLog.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarvwPricingLog.mShippingLineID_Old = Convert.ToInt32(dr["ShippingLineID_Old"].ToString());
                        ObjCVarvwPricingLog.mShippingLineName = Convert.ToString(dr["ShippingLineName"].ToString());
                        ObjCVarvwPricingLog.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarvwPricingLog.mAirlineID_Old = Convert.ToInt32(dr["AirlineID_Old"].ToString());
                        ObjCVarvwPricingLog.mAirlineName = Convert.ToString(dr["AirlineName"].ToString());
                        ObjCVarvwPricingLog.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarvwPricingLog.mTruckerID_Old = Convert.ToInt32(dr["TruckerID_Old"].ToString());
                        ObjCVarvwPricingLog.mTruckerName = Convert.ToString(dr["TruckerName"].ToString());
                        ObjCVarvwPricingLog.mCCAID = Convert.ToInt32(dr["CCAID"].ToString());
                        ObjCVarvwPricingLog.mCCAID_Old = Convert.ToInt32(dr["CCAID_Old"].ToString());
                        ObjCVarvwPricingLog.mCCAName = Convert.ToString(dr["CCAName"].ToString());
                        ObjCVarvwPricingLog.mPOLCountryID = Convert.ToInt32(dr["POLCountryID"].ToString());
                        ObjCVarvwPricingLog.mPOLCountryID_Old = Convert.ToInt32(dr["POLCountryID_Old"].ToString());
                        ObjCVarvwPricingLog.mPOLID = Convert.ToInt32(dr["POLID"].ToString());
                        ObjCVarvwPricingLog.mPOLID_Old = Convert.ToInt32(dr["POLID_Old"].ToString());
                        ObjCVarvwPricingLog.mPOL = Convert.ToString(dr["POL"].ToString());
                        ObjCVarvwPricingLog.mPODCountryID = Convert.ToInt32(dr["PODCountryID"].ToString());
                        ObjCVarvwPricingLog.mPODCountryID_Old = Convert.ToInt32(dr["PODCountryID_Old"].ToString());
                        ObjCVarvwPricingLog.mPODID = Convert.ToInt32(dr["PODID"].ToString());
                        ObjCVarvwPricingLog.mPODID_Old = Convert.ToInt32(dr["PODID_Old"].ToString());
                        ObjCVarvwPricingLog.mPOD = Convert.ToString(dr["POD"].ToString());
                        ObjCVarvwPricingLog.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwPricingLog.mCommodityID_Old = Convert.ToInt32(dr["CommodityID_Old"].ToString());
                        ObjCVarvwPricingLog.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
                        ObjCVarvwPricingLog.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPricingLog.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        lstCVarvwPricingLog.Add(ObjCVarvwPricingLog);
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
            lstCVarvwPricingLog.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPricingLog";
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
                        CVarvwPricingLog ObjCVarvwPricingLog = new CVarvwPricingLog();
                        ObjCVarvwPricingLog.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPricingLog.mPricingID = Convert.ToInt64(dr["PricingID"].ToString());
                        ObjCVarvwPricingLog.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwPricingLog.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwPricingLog.mCustomerID_Old = Convert.ToInt32(dr["CustomerID_Old"].ToString());
                        ObjCVarvwPricingLog.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwPricingLog.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarvwPricingLog.mShippingLineID_Old = Convert.ToInt32(dr["ShippingLineID_Old"].ToString());
                        ObjCVarvwPricingLog.mShippingLineName = Convert.ToString(dr["ShippingLineName"].ToString());
                        ObjCVarvwPricingLog.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarvwPricingLog.mAirlineID_Old = Convert.ToInt32(dr["AirlineID_Old"].ToString());
                        ObjCVarvwPricingLog.mAirlineName = Convert.ToString(dr["AirlineName"].ToString());
                        ObjCVarvwPricingLog.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarvwPricingLog.mTruckerID_Old = Convert.ToInt32(dr["TruckerID_Old"].ToString());
                        ObjCVarvwPricingLog.mTruckerName = Convert.ToString(dr["TruckerName"].ToString());
                        ObjCVarvwPricingLog.mCCAID = Convert.ToInt32(dr["CCAID"].ToString());
                        ObjCVarvwPricingLog.mCCAID_Old = Convert.ToInt32(dr["CCAID_Old"].ToString());
                        ObjCVarvwPricingLog.mCCAName = Convert.ToString(dr["CCAName"].ToString());
                        ObjCVarvwPricingLog.mPOLCountryID = Convert.ToInt32(dr["POLCountryID"].ToString());
                        ObjCVarvwPricingLog.mPOLCountryID_Old = Convert.ToInt32(dr["POLCountryID_Old"].ToString());
                        ObjCVarvwPricingLog.mPOLID = Convert.ToInt32(dr["POLID"].ToString());
                        ObjCVarvwPricingLog.mPOLID_Old = Convert.ToInt32(dr["POLID_Old"].ToString());
                        ObjCVarvwPricingLog.mPOL = Convert.ToString(dr["POL"].ToString());
                        ObjCVarvwPricingLog.mPODCountryID = Convert.ToInt32(dr["PODCountryID"].ToString());
                        ObjCVarvwPricingLog.mPODCountryID_Old = Convert.ToInt32(dr["PODCountryID_Old"].ToString());
                        ObjCVarvwPricingLog.mPODID = Convert.ToInt32(dr["PODID"].ToString());
                        ObjCVarvwPricingLog.mPODID_Old = Convert.ToInt32(dr["PODID_Old"].ToString());
                        ObjCVarvwPricingLog.mPOD = Convert.ToString(dr["POD"].ToString());
                        ObjCVarvwPricingLog.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwPricingLog.mCommodityID_Old = Convert.ToInt32(dr["CommodityID_Old"].ToString());
                        ObjCVarvwPricingLog.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
                        ObjCVarvwPricingLog.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPricingLog.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPricingLog.Add(ObjCVarvwPricingLog);
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
