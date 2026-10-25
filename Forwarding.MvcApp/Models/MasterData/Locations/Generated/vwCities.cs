using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Locations.Generated
{
    [Serializable]
    public partial class CVarvwCities
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal Int32 mCountryID;
        internal String mCountryCode;
        internal String mCountryName;
        internal String mCountryLocal;
        internal String mRegionCode;
        internal String mRegionName;
        internal Int32 mCreatorUserID;
        internal String mCreatorUserName;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal String mModificatorUserName;
        internal DateTime mModificationDate;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public String LocalName
        {
            get { return mLocalName; }
            set { mLocalName = value; }
        }
        public Int32 CountryID
        {
            get { return mCountryID; }
            set { mCountryID = value; }
        }
        public String CountryCode
        {
            get { return mCountryCode; }
            set { mCountryCode = value; }
        }
        public String CountryName
        {
            get { return mCountryName; }
            set { mCountryName = value; }
        }
        public String CountryLocal
        {
            get { return mCountryLocal; }
            set { mCountryLocal = value; }
        }
        public String RegionCode
        {
            get { return mRegionCode; }
            set { mRegionCode = value; }
        }
        public String RegionName
        {
            get { return mRegionName; }
            set { mRegionName = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
        }
        public String CreatorUserName
        {
            get { return mCreatorUserName; }
            set { mCreatorUserName = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mModificatorUserID = value; }
        }
        public String ModificatorUserName
        {
            get { return mModificatorUserName; }
            set { mModificatorUserName = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mModificationDate = value; }
        }
        #endregion
    }

    public partial class CvwCities
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
        public List<CVarvwCities> lstCVarvwCities = new List<CVarvwCities>();
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
            lstCVarvwCities.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListvwCities";
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
                        CVarvwCities ObjCVarvwCities = new CVarvwCities();
                        ObjCVarvwCities.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwCities.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwCities.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwCities.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwCities.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwCities.mCountryCode = Convert.ToString(dr["CountryCode"].ToString());
                        ObjCVarvwCities.mCountryName = Convert.ToString(dr["CountryName"].ToString());
                        ObjCVarvwCities.mCountryLocal = Convert.ToString(dr["CountryLocal"].ToString());
                        ObjCVarvwCities.mRegionCode = Convert.ToString(dr["RegionCode"].ToString());
                        ObjCVarvwCities.mRegionName = Convert.ToString(dr["RegionName"].ToString());
                        ObjCVarvwCities.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwCities.mCreatorUserName = Convert.ToString(dr["CreatorUserName"].ToString());
                        ObjCVarvwCities.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwCities.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwCities.mModificatorUserName = Convert.ToString(dr["ModificatorUserName"].ToString());
                        ObjCVarvwCities.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        lstCVarvwCities.Add(ObjCVarvwCities);
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
            lstCVarvwCities.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingvwCities";
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
                        CVarvwCities ObjCVarvwCities = new CVarvwCities();
                        ObjCVarvwCities.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwCities.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwCities.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwCities.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwCities.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwCities.mCountryCode = Convert.ToString(dr["CountryCode"].ToString());
                        ObjCVarvwCities.mCountryName = Convert.ToString(dr["CountryName"].ToString());
                        ObjCVarvwCities.mCountryLocal = Convert.ToString(dr["CountryLocal"].ToString());
                        ObjCVarvwCities.mRegionCode = Convert.ToString(dr["RegionCode"].ToString());
                        ObjCVarvwCities.mRegionName = Convert.ToString(dr["RegionName"].ToString());
                        ObjCVarvwCities.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwCities.mCreatorUserName = Convert.ToString(dr["CreatorUserName"].ToString());
                        ObjCVarvwCities.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwCities.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwCities.mModificatorUserName = Convert.ToString(dr["ModificatorUserName"].ToString());
                        ObjCVarvwCities.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwCities.Add(ObjCVarvwCities);
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
