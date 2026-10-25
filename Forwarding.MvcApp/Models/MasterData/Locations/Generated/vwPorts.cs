using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Locations.Generated
{
    [Serializable]
    public partial class CVarvwPorts
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal Int32 mCountryID;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal Boolean mIsInactive;
        internal Boolean mIsPort;
        internal Boolean mIsOcean;
        internal Boolean mIsAir;
        internal Boolean mIsInland;
        internal Boolean mIsAddedManually;
        internal String mNotes;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal DateTime mTimeLocked;
        internal Int32 mLockingUserID;
        internal String mCountryCode;
        internal String mCountryName;
        internal String mAddress;
        internal String mTelephoneNumber;
        internal String mEmail;
        internal String mContactPerson;
        internal Boolean mIsFactories;
        internal Int32 mFactoryCityID;
        internal String mFactoryCityName;
        internal String mcrmCode;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 CountryID
        {
            get { return mCountryID; }
            set { mCountryID = value; }
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
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsInactive = value; }
        }
        public Boolean IsPort
        {
            get { return mIsPort; }
            set { mIsPort = value; }
        }
        public Boolean IsOcean
        {
            get { return mIsOcean; }
            set { mIsOcean = value; }
        }
        public Boolean IsAir
        {
            get { return mIsAir; }
            set { mIsAir = value; }
        }
        public Boolean IsInland
        {
            get { return mIsInland; }
            set { mIsInland = value; }
        }
        public Boolean IsAddedManually
        {
            get { return mIsAddedManually; }
            set { mIsAddedManually = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
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
        public DateTime TimeLocked
        {
            get { return mTimeLocked; }
            set { mTimeLocked = value; }
        }
        public Int32 LockingUserID
        {
            get { return mLockingUserID; }
            set { mLockingUserID = value; }
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
        public String Address
        {
            get { return mAddress; }
            set { mAddress = value; }
        }
        public String TelephoneNumber
        {
            get { return mTelephoneNumber; }
            set { mTelephoneNumber = value; }
        }
        public String Email
        {
            get { return mEmail; }
            set { mEmail = value; }
        }
        public String ContactPerson
        {
            get { return mContactPerson; }
            set { mContactPerson = value; }
        }
        public Boolean IsFactories
        {
            get { return mIsFactories; }
            set { mIsFactories = value; }
        }
        public Int32 FactoryCityID
        {
            get { return mFactoryCityID; }
            set { mFactoryCityID = value; }
        }
        public String FactoryCityName
        {
            get { return mFactoryCityName; }
            set { mFactoryCityName = value; }
        }
        public String crmCode
        {
            get { return mcrmCode; }
            set { mcrmCode = value; }
        }
        #endregion
    }

    public partial class CvwPorts
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
        public List<CVarvwPorts> lstCVarvwPorts = new List<CVarvwPorts>();
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
            lstCVarvwPorts.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPorts";
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
                        CVarvwPorts ObjCVarvwPorts = new CVarvwPorts();
                        ObjCVarvwPorts.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwPorts.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwPorts.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwPorts.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwPorts.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwPorts.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwPorts.mIsPort = Convert.ToBoolean(dr["IsPort"].ToString());
                        ObjCVarvwPorts.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarvwPorts.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarvwPorts.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarvwPorts.mIsAddedManually = Convert.ToBoolean(dr["IsAddedManually"].ToString());
                        ObjCVarvwPorts.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPorts.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwPorts.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwPorts.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwPorts.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwPorts.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarvwPorts.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarvwPorts.mCountryCode = Convert.ToString(dr["CountryCode"].ToString());
                        ObjCVarvwPorts.mCountryName = Convert.ToString(dr["CountryName"].ToString());
                        ObjCVarvwPorts.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarvwPorts.mTelephoneNumber = Convert.ToString(dr["TelephoneNumber"].ToString());
                        ObjCVarvwPorts.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarvwPorts.mContactPerson = Convert.ToString(dr["ContactPerson"].ToString());
                        ObjCVarvwPorts.mIsFactories = Convert.ToBoolean(dr["IsFactories"].ToString());
                        ObjCVarvwPorts.mFactoryCityID = Convert.ToInt32(dr["FactoryCityID"].ToString());
                        ObjCVarvwPorts.mFactoryCityName = Convert.ToString(dr["FactoryCityName"].ToString());
                        ObjCVarvwPorts.mcrmCode = Convert.ToString(dr["crmCode"].ToString());
                        lstCVarvwPorts.Add(ObjCVarvwPorts);
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
            lstCVarvwPorts.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPorts";
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
                        CVarvwPorts ObjCVarvwPorts = new CVarvwPorts();
                        ObjCVarvwPorts.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwPorts.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwPorts.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwPorts.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwPorts.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwPorts.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwPorts.mIsPort = Convert.ToBoolean(dr["IsPort"].ToString());
                        ObjCVarvwPorts.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarvwPorts.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarvwPorts.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarvwPorts.mIsAddedManually = Convert.ToBoolean(dr["IsAddedManually"].ToString());
                        ObjCVarvwPorts.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPorts.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwPorts.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwPorts.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwPorts.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwPorts.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarvwPorts.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarvwPorts.mCountryCode = Convert.ToString(dr["CountryCode"].ToString());
                        ObjCVarvwPorts.mCountryName = Convert.ToString(dr["CountryName"].ToString());
                        ObjCVarvwPorts.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarvwPorts.mTelephoneNumber = Convert.ToString(dr["TelephoneNumber"].ToString());
                        ObjCVarvwPorts.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarvwPorts.mContactPerson = Convert.ToString(dr["ContactPerson"].ToString());
                        ObjCVarvwPorts.mIsFactories = Convert.ToBoolean(dr["IsFactories"].ToString());
                        ObjCVarvwPorts.mFactoryCityID = Convert.ToInt32(dr["FactoryCityID"].ToString());
                        ObjCVarvwPorts.mFactoryCityName = Convert.ToString(dr["FactoryCityName"].ToString());
                        ObjCVarvwPorts.mcrmCode = Convert.ToString(dr["crmCode"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPorts.Add(ObjCVarvwPorts);
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
