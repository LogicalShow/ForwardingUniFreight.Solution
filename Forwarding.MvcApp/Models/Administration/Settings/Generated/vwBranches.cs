using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Administration.Settings.Generated
{
    [Serializable]
    public class CPKvwBranches
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
    public partial class CVarvwBranches : CPKvwBranches
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal Int32 mCountryID;
        internal Int32 mCityID;
        internal Boolean mIsInactive;
        internal String mNotes;
        internal String mPhone1;
        internal String mPhone2;
        internal String mMobile1;
        internal String mFax;
        internal String mAddress;
        internal String mZipCode;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal String mCountryCode;
        internal String mCountryName;
        internal String mCityCode;
        internal String mCityName;
        internal DateTime mFA_LastDepreciationDate;
        internal Boolean misDepartement;
        internal String mAliasName;
        #endregion

        #region "Methods"
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
        public Int32 CityID
        {
            get { return mCityID; }
            set { mCityID = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsInactive = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public String Phone1
        {
            get { return mPhone1; }
            set { mPhone1 = value; }
        }
        public String Phone2
        {
            get { return mPhone2; }
            set { mPhone2 = value; }
        }
        public String Mobile1
        {
            get { return mMobile1; }
            set { mMobile1 = value; }
        }
        public String Fax
        {
            get { return mFax; }
            set { mFax = value; }
        }
        public String Address
        {
            get { return mAddress; }
            set { mAddress = value; }
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
        public DateTime FA_LastDepreciationDate
        {
            get { return mFA_LastDepreciationDate; }
            set { mFA_LastDepreciationDate = value; }
        }
        public Boolean isDepartement
        {
            get { return misDepartement; }
            set { misDepartement = value; }
        }
        public String AliasName
        {
            get { return mAliasName; }
            set { mAliasName = value; }
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

    public partial class CvwBranches
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
        public List<CVarvwBranches> lstCVarvwBranches = new List<CVarvwBranches>();
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
            lstCVarvwBranches.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListvwBranches";
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
                        CVarvwBranches ObjCVarvwBranches = new CVarvwBranches();
                        ObjCVarvwBranches.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwBranches.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwBranches.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwBranches.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwBranches.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwBranches.mCityID = Convert.ToInt32(dr["CityID"].ToString());
                        ObjCVarvwBranches.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwBranches.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwBranches.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
                        ObjCVarvwBranches.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
                        ObjCVarvwBranches.mMobile1 = Convert.ToString(dr["Mobile1"].ToString());
                        ObjCVarvwBranches.mFax = Convert.ToString(dr["Fax"].ToString());
                        ObjCVarvwBranches.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarvwBranches.mZipCode = Convert.ToString(dr["ZipCode"].ToString());
                        ObjCVarvwBranches.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwBranches.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwBranches.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwBranches.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwBranches.mCountryCode = Convert.ToString(dr["CountryCode"].ToString());
                        ObjCVarvwBranches.mCountryName = Convert.ToString(dr["CountryName"].ToString());
                        ObjCVarvwBranches.mCityCode = Convert.ToString(dr["CityCode"].ToString());
                        ObjCVarvwBranches.mCityName = Convert.ToString(dr["CityName"].ToString());
                        ObjCVarvwBranches.mFA_LastDepreciationDate = Convert.ToDateTime(dr["FA_LastDepreciationDate"].ToString());
                        ObjCVarvwBranches.misDepartement = Convert.ToBoolean(dr["isDepartement"].ToString());
                        ObjCVarvwBranches.mAliasName = Convert.ToString(dr["AliasName"].ToString());
                        lstCVarvwBranches.Add(ObjCVarvwBranches);
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
            lstCVarvwBranches.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwBranches";
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
                        CVarvwBranches ObjCVarvwBranches = new CVarvwBranches();
                        ObjCVarvwBranches.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwBranches.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwBranches.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwBranches.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwBranches.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwBranches.mCityID = Convert.ToInt32(dr["CityID"].ToString());
                        ObjCVarvwBranches.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwBranches.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwBranches.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
                        ObjCVarvwBranches.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
                        ObjCVarvwBranches.mMobile1 = Convert.ToString(dr["Mobile1"].ToString());
                        ObjCVarvwBranches.mFax = Convert.ToString(dr["Fax"].ToString());
                        ObjCVarvwBranches.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarvwBranches.mZipCode = Convert.ToString(dr["ZipCode"].ToString());
                        ObjCVarvwBranches.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwBranches.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwBranches.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwBranches.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwBranches.mCountryCode = Convert.ToString(dr["CountryCode"].ToString());
                        ObjCVarvwBranches.mCountryName = Convert.ToString(dr["CountryName"].ToString());
                        ObjCVarvwBranches.mCityCode = Convert.ToString(dr["CityCode"].ToString());
                        ObjCVarvwBranches.mCityName = Convert.ToString(dr["CityName"].ToString());
                        ObjCVarvwBranches.mFA_LastDepreciationDate = Convert.ToDateTime(dr["FA_LastDepreciationDate"].ToString());
                        ObjCVarvwBranches.misDepartement = Convert.ToBoolean(dr["isDepartement"].ToString());
                        ObjCVarvwBranches.mAliasName = Convert.ToString(dr["AliasName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwBranches.Add(ObjCVarvwBranches);
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
