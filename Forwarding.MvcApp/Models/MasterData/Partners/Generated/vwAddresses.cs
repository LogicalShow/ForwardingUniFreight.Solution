using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Partners.Generated
{
    [Serializable]
    public class CPKvwAddresses
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
    public partial class CVarvwAddresses : CPKvwAddresses
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mPartnerID;
        internal Int32 mPartnerTypeID;
        internal Int32 mAddressTypeID;
        internal Int32 mCountryID;
        internal Int32 mCityID;
        internal String mStreetLine1;
        internal String mStreetLine2;
        internal String mZipCode;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mLockingUserID;
        internal DateTime mTimeLocked;
        internal String mPrintedAs;
        internal Boolean mIsDeleted;
        internal String mAddressType;
        internal String mCountryCode;
        internal String mCountryName;
        internal String mCityCode;
        internal String mCityName;
        internal String mAdditionalAddress;
        #endregion

        #region "Methods"
        public Int64 PartnerID
        {
            get { return mPartnerID; }
            set { mPartnerID = value; }
        }
        public Int32 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mPartnerTypeID = value; }
        }
        public Int32 AddressTypeID
        {
            get { return mAddressTypeID; }
            set { mAddressTypeID = value; }
        }
        public Int32 CountryID
        {
            get { return mCountryID; }
            set { mCountryID = value; }
        }
        public Int32 CityID
        {
            get { return mCityID; }
            set { mCityID = value; }
        }
        public String StreetLine1
        {
            get { return mStreetLine1; }
            set { mStreetLine1 = value; }
        }
        public String StreetLine2
        {
            get { return mStreetLine2; }
            set { mStreetLine2 = value; }
        }
        public String ZipCode
        {
            get { return mZipCode; }
            set { mZipCode = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
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
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mModificationDate = value; }
        }
        public Int32 LockingUserID
        {
            get { return mLockingUserID; }
            set { mLockingUserID = value; }
        }
        public DateTime TimeLocked
        {
            get { return mTimeLocked; }
            set { mTimeLocked = value; }
        }
        public String PrintedAs
        {
            get { return mPrintedAs; }
            set { mPrintedAs = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public String AddressType
        {
            get { return mAddressType; }
            set { mAddressType = value; }
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
        public String CityCode
        {
            get { return mCityCode; }
            set { mCityCode = value; }
        }
        public String CityName
        {
            get { return mCityName; }
            set { mCityName = value; }
        }
        public String AdditionalAddress
        {
            get { return mAdditionalAddress; }
            set { mAdditionalAddress = value; }
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

    public partial class CvwAddresses
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
        public List<CVarvwAddresses> lstCVarvwAddresses = new List<CVarvwAddresses>();
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
            lstCVarvwAddresses.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListvwAddresses";
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
                        CVarvwAddresses ObjCVarvwAddresses = new CVarvwAddresses();
                        ObjCVarvwAddresses.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwAddresses.mPartnerID = Convert.ToInt64(dr["PartnerID"].ToString());
                        ObjCVarvwAddresses.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwAddresses.mAddressTypeID = Convert.ToInt32(dr["AddressTypeID"].ToString());
                        ObjCVarvwAddresses.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwAddresses.mCityID = Convert.ToInt32(dr["CityID"].ToString());
                        ObjCVarvwAddresses.mStreetLine1 = Convert.ToString(dr["StreetLine1"].ToString());
                        ObjCVarvwAddresses.mStreetLine2 = Convert.ToString(dr["StreetLine2"].ToString());
                        ObjCVarvwAddresses.mZipCode = Convert.ToString(dr["ZipCode"].ToString());
                        ObjCVarvwAddresses.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwAddresses.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwAddresses.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwAddresses.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwAddresses.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarvwAddresses.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarvwAddresses.mPrintedAs = Convert.ToString(dr["PrintedAs"].ToString());
                        ObjCVarvwAddresses.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwAddresses.mAddressType = Convert.ToString(dr["AddressType"].ToString());
                        ObjCVarvwAddresses.mCountryCode = Convert.ToString(dr["CountryCode"].ToString());
                        ObjCVarvwAddresses.mCountryName = Convert.ToString(dr["CountryName"].ToString());
                        ObjCVarvwAddresses.mCityCode = Convert.ToString(dr["CityCode"].ToString());
                        ObjCVarvwAddresses.mCityName = Convert.ToString(dr["CityName"].ToString());
                        ObjCVarvwAddresses.mAdditionalAddress = Convert.ToString(dr["AdditionalAddress"].ToString());
                        lstCVarvwAddresses.Add(ObjCVarvwAddresses);
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
            lstCVarvwAddresses.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwAddresses";
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
                        CVarvwAddresses ObjCVarvwAddresses = new CVarvwAddresses();
                        ObjCVarvwAddresses.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwAddresses.mPartnerID = Convert.ToInt64(dr["PartnerID"].ToString());
                        ObjCVarvwAddresses.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwAddresses.mAddressTypeID = Convert.ToInt32(dr["AddressTypeID"].ToString());
                        ObjCVarvwAddresses.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwAddresses.mCityID = Convert.ToInt32(dr["CityID"].ToString());
                        ObjCVarvwAddresses.mStreetLine1 = Convert.ToString(dr["StreetLine1"].ToString());
                        ObjCVarvwAddresses.mStreetLine2 = Convert.ToString(dr["StreetLine2"].ToString());
                        ObjCVarvwAddresses.mZipCode = Convert.ToString(dr["ZipCode"].ToString());
                        ObjCVarvwAddresses.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwAddresses.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwAddresses.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwAddresses.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwAddresses.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarvwAddresses.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarvwAddresses.mPrintedAs = Convert.ToString(dr["PrintedAs"].ToString());
                        ObjCVarvwAddresses.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwAddresses.mAddressType = Convert.ToString(dr["AddressType"].ToString());
                        ObjCVarvwAddresses.mCountryCode = Convert.ToString(dr["CountryCode"].ToString());
                        ObjCVarvwAddresses.mCountryName = Convert.ToString(dr["CountryName"].ToString());
                        ObjCVarvwAddresses.mCityCode = Convert.ToString(dr["CityCode"].ToString());
                        ObjCVarvwAddresses.mCityName = Convert.ToString(dr["CityName"].ToString());
                        ObjCVarvwAddresses.mAdditionalAddress = Convert.ToString(dr["AdditionalAddress"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwAddresses.Add(ObjCVarvwAddresses);
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
