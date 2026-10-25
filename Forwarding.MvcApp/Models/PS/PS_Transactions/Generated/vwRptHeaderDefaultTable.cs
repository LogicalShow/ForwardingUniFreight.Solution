using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Shipping.MvcApp.Models.ReportViews
{
    [Serializable]
    public partial class CVarvwRptHeaderDefaultTable
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal String mCompanyName;
        internal String mCompanyAddress;
        internal String mCompanyPhone;
        internal String mCompanyFax;
        internal String mCompanyEMail;
        internal String mCompanyWebSite;
        internal String mPortName;
        internal String mPortCode;
        internal String mLineCode;
        internal String mLineName;
        internal String mCurrencyName;
        internal String mCurrencyCode;
        internal String mWeightName;
        internal String mWeightCode;
        internal String mVolumeName;
        internal String mVolumeCode;
        internal String mMeasureName;
        internal String mMeasureCode;
        internal String mTemperatureName;
        internal String mTemperatureCode;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String CompanyName
        {
            get { return mCompanyName; }
            set { mCompanyName = value; }
        }
        public String CompanyAddress
        {
            get { return mCompanyAddress; }
            set { mCompanyAddress = value; }
        }
        public String CompanyPhone
        {
            get { return mCompanyPhone; }
            set { mCompanyPhone = value; }
        }
        public String CompanyFax
        {
            get { return mCompanyFax; }
            set { mCompanyFax = value; }
        }
        public String CompanyEMail
        {
            get { return mCompanyEMail; }
            set { mCompanyEMail = value; }
        }
        public String CompanyWebSite
        {
            get { return mCompanyWebSite; }
            set { mCompanyWebSite = value; }
        }
        public String PortName
        {
            get { return mPortName; }
            set { mPortName = value; }
        }
        public String PortCode
        {
            get { return mPortCode; }
            set { mPortCode = value; }
        }
        public String LineCode
        {
            get { return mLineCode; }
            set { mLineCode = value; }
        }
        public String LineName
        {
            get { return mLineName; }
            set { mLineName = value; }
        }
        public String CurrencyName
        {
            get { return mCurrencyName; }
            set { mCurrencyName = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
        }
        public String WeightName
        {
            get { return mWeightName; }
            set { mWeightName = value; }
        }
        public String WeightCode
        {
            get { return mWeightCode; }
            set { mWeightCode = value; }
        }
        public String VolumeName
        {
            get { return mVolumeName; }
            set { mVolumeName = value; }
        }
        public String VolumeCode
        {
            get { return mVolumeCode; }
            set { mVolumeCode = value; }
        }
        public String MeasureName
        {
            get { return mMeasureName; }
            set { mMeasureName = value; }
        }
        public String MeasureCode
        {
            get { return mMeasureCode; }
            set { mMeasureCode = value; }
        }
        public String TemperatureName
        {
            get { return mTemperatureName; }
            set { mTemperatureName = value; }
        }
        public String TemperatureCode
        {
            get { return mTemperatureCode; }
            set { mTemperatureCode = value; }
        }
        #endregion
    }

    public partial class CvwRptHeaderDefaultTable
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
        public List<CVarvwRptHeaderDefaultTable> lstCVarvwRptHeaderDefaultTable = new List<CVarvwRptHeaderDefaultTable>();
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
            lstCVarvwRptHeaderDefaultTable.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwRptHeaderDefaultTable";
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
                        CVarvwRptHeaderDefaultTable ObjCVarvwRptHeaderDefaultTable = new CVarvwRptHeaderDefaultTable();
                        ObjCVarvwRptHeaderDefaultTable.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mCompanyName = Convert.ToString(dr["CompanyName"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mCompanyAddress = Convert.ToString(dr["CompanyAddress"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mCompanyPhone = Convert.ToString(dr["CompanyPhone"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mCompanyFax = Convert.ToString(dr["CompanyFax"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mCompanyEMail = Convert.ToString(dr["CompanyEMail"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mCompanyWebSite = Convert.ToString(dr["CompanyWebSite"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mPortName = Convert.ToString(dr["PortName"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mPortCode = Convert.ToString(dr["PortCode"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mLineCode = Convert.ToString(dr["LineCode"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mLineName = Convert.ToString(dr["LineName"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mCurrencyName = Convert.ToString(dr["CurrencyName"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mWeightName = Convert.ToString(dr["WeightName"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mWeightCode = Convert.ToString(dr["WeightCode"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mVolumeName = Convert.ToString(dr["VolumeName"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mVolumeCode = Convert.ToString(dr["VolumeCode"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mMeasureName = Convert.ToString(dr["MeasureName"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mMeasureCode = Convert.ToString(dr["MeasureCode"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mTemperatureName = Convert.ToString(dr["TemperatureName"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mTemperatureCode = Convert.ToString(dr["TemperatureCode"].ToString());
                        lstCVarvwRptHeaderDefaultTable.Add(ObjCVarvwRptHeaderDefaultTable);
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
            lstCVarvwRptHeaderDefaultTable.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwRptHeaderDefaultTable";
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
                        CVarvwRptHeaderDefaultTable ObjCVarvwRptHeaderDefaultTable = new CVarvwRptHeaderDefaultTable();
                        ObjCVarvwRptHeaderDefaultTable.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mCompanyName = Convert.ToString(dr["CompanyName"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mCompanyAddress = Convert.ToString(dr["CompanyAddress"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mCompanyPhone = Convert.ToString(dr["CompanyPhone"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mCompanyFax = Convert.ToString(dr["CompanyFax"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mCompanyEMail = Convert.ToString(dr["CompanyEMail"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mCompanyWebSite = Convert.ToString(dr["CompanyWebSite"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mPortName = Convert.ToString(dr["PortName"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mPortCode = Convert.ToString(dr["PortCode"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mLineCode = Convert.ToString(dr["LineCode"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mLineName = Convert.ToString(dr["LineName"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mCurrencyName = Convert.ToString(dr["CurrencyName"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mWeightName = Convert.ToString(dr["WeightName"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mWeightCode = Convert.ToString(dr["WeightCode"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mVolumeName = Convert.ToString(dr["VolumeName"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mVolumeCode = Convert.ToString(dr["VolumeCode"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mMeasureName = Convert.ToString(dr["MeasureName"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mMeasureCode = Convert.ToString(dr["MeasureCode"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mTemperatureName = Convert.ToString(dr["TemperatureName"].ToString());
                        ObjCVarvwRptHeaderDefaultTable.mTemperatureCode = Convert.ToString(dr["TemperatureCode"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwRptHeaderDefaultTable.Add(ObjCVarvwRptHeaderDefaultTable);
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
