using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Administration.Settings.Generated
{
    [Serializable]
    public partial class CVarvwTruckingLicenseExpireDates
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal String mstrID;
        internal DateTime mLicenseNumberExpireDate;
        internal String mstrLicenseNumberExpireDate;
        internal DateTime mInsuranceDate;
        internal String mstrInsuranceDate;
        internal String mName;
        internal Int32 mCode;
        internal String mTruckingType;
        internal Boolean mIsSent;
        internal Boolean mIsSentInsuranceDate;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String strID
        {
            get { return mstrID; }
            set { mstrID = value; }
        }
        public DateTime LicenseNumberExpireDate
        {
            get { return mLicenseNumberExpireDate; }
            set { mLicenseNumberExpireDate = value; }
        }
        public String strLicenseNumberExpireDate
        {
            get { return mstrLicenseNumberExpireDate; }
            set { mstrLicenseNumberExpireDate = value; }
        }
        public DateTime InsuranceDate
        {
            get { return mInsuranceDate; }
            set { mInsuranceDate = value; }
        }
        public String strInsuranceDate
        {
            get { return mstrInsuranceDate; }
            set { mstrInsuranceDate = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public Int32 Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String TruckingType
        {
            get { return mTruckingType; }
            set { mTruckingType = value; }
        }
        public Boolean IsSent
        {
            get { return mIsSent; }
            set { mIsSent = value; }
        }
        public Boolean IsSentInsuranceDate
        {
            get { return mIsSentInsuranceDate; }
            set { mIsSentInsuranceDate = value; }
        }
        #endregion
    }

    public partial class CvwTruckingLicenseExpireDates
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
        public List<CVarvwTruckingLicenseExpireDates> lstCVarvwTruckingLicenseExpireDates = new List<CVarvwTruckingLicenseExpireDates>();
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
            lstCVarvwTruckingLicenseExpireDates.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwTruckingLicenseExpireDates";
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
                        CVarvwTruckingLicenseExpireDates ObjCVarvwTruckingLicenseExpireDates = new CVarvwTruckingLicenseExpireDates();
                        ObjCVarvwTruckingLicenseExpireDates.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mstrID = Convert.ToString(dr["strID"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mLicenseNumberExpireDate = Convert.ToDateTime(dr["LicenseNumberExpireDate"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mstrLicenseNumberExpireDate = Convert.ToString(dr["strLicenseNumberExpireDate"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mInsuranceDate = Convert.ToDateTime(dr["InsuranceDate"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mstrInsuranceDate = Convert.ToString(dr["strInsuranceDate"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mTruckingType = Convert.ToString(dr["TruckingType"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mIsSent = Convert.ToBoolean(dr["IsSent"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mIsSentInsuranceDate = Convert.ToBoolean(dr["IsSentInsuranceDate"].ToString());
                        lstCVarvwTruckingLicenseExpireDates.Add(ObjCVarvwTruckingLicenseExpireDates);
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
            lstCVarvwTruckingLicenseExpireDates.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwTruckingLicenseExpireDates";
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
                        CVarvwTruckingLicenseExpireDates ObjCVarvwTruckingLicenseExpireDates = new CVarvwTruckingLicenseExpireDates();
                        ObjCVarvwTruckingLicenseExpireDates.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mstrID = Convert.ToString(dr["strID"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mLicenseNumberExpireDate = Convert.ToDateTime(dr["LicenseNumberExpireDate"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mstrLicenseNumberExpireDate = Convert.ToString(dr["strLicenseNumberExpireDate"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mInsuranceDate = Convert.ToDateTime(dr["InsuranceDate"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mstrInsuranceDate = Convert.ToString(dr["strInsuranceDate"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mTruckingType = Convert.ToString(dr["TruckingType"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mIsSent = Convert.ToBoolean(dr["IsSent"].ToString());
                        ObjCVarvwTruckingLicenseExpireDates.mIsSentInsuranceDate = Convert.ToBoolean(dr["IsSentInsuranceDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwTruckingLicenseExpireDates.Add(ObjCVarvwTruckingLicenseExpireDates);
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
