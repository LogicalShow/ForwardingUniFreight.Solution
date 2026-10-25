using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Invoicing.Generated
{
    [Serializable]
    public class CPKvwCurrencies
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
    public partial class CVarvwCurrencies : CPKvwCurrencies
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal Decimal mCurrentExchangeRate;
        internal Decimal mCurrentAlternateExchangeRate;
        internal DateTime mCurrentExchangeRateDate;
        internal String mNotes;
        internal Int32 mExternalID;
        internal Boolean mIsInactive;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mLockingUserID;
        internal DateTime mTimeLocked;
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
        public Decimal CurrentExchangeRate
        {
            get { return mCurrentExchangeRate; }
            set { mCurrentExchangeRate = value; }
        }
        public Decimal CurrentAlternateExchangeRate
        {
            get { return mCurrentAlternateExchangeRate; }
            set { mCurrentAlternateExchangeRate = value; }
        }
        public DateTime CurrentExchangeRateDate
        {
            get { return mCurrentExchangeRateDate; }
            set { mCurrentExchangeRateDate = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Int32 ExternalID
        {
            get { return mExternalID; }
            set { mExternalID = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsInactive = value; }
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

    public partial class CvwCurrencies
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
        public List<CVarvwCurrencies> lstCVarvwCurrencies = new List<CVarvwCurrencies>();
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
            lstCVarvwCurrencies.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwCurrencies";
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
                        CVarvwCurrencies ObjCVarvwCurrencies = new CVarvwCurrencies();
                        ObjCVarvwCurrencies.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwCurrencies.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwCurrencies.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwCurrencies.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwCurrencies.mCurrentExchangeRate = Convert.ToDecimal(dr["CurrentExchangeRate"].ToString());
                        ObjCVarvwCurrencies.mCurrentAlternateExchangeRate = Convert.ToDecimal(dr["CurrentAlternateExchangeRate"].ToString());
                        ObjCVarvwCurrencies.mCurrentExchangeRateDate = Convert.ToDateTime(dr["CurrentExchangeRateDate"].ToString());
                        ObjCVarvwCurrencies.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwCurrencies.mExternalID = Convert.ToInt32(dr["ExternalID"].ToString());
                        ObjCVarvwCurrencies.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwCurrencies.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwCurrencies.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwCurrencies.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwCurrencies.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwCurrencies.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarvwCurrencies.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        lstCVarvwCurrencies.Add(ObjCVarvwCurrencies);
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
            lstCVarvwCurrencies.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwCurrencies";
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
                        CVarvwCurrencies ObjCVarvwCurrencies = new CVarvwCurrencies();
                        ObjCVarvwCurrencies.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwCurrencies.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwCurrencies.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwCurrencies.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwCurrencies.mCurrentExchangeRate = Convert.ToDecimal(dr["CurrentExchangeRate"].ToString());
                        ObjCVarvwCurrencies.mCurrentAlternateExchangeRate = Convert.ToDecimal(dr["CurrentAlternateExchangeRate"].ToString());
                        ObjCVarvwCurrencies.mCurrentExchangeRateDate = Convert.ToDateTime(dr["CurrentExchangeRateDate"].ToString());
                        ObjCVarvwCurrencies.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwCurrencies.mExternalID = Convert.ToInt32(dr["ExternalID"].ToString());
                        ObjCVarvwCurrencies.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwCurrencies.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwCurrencies.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwCurrencies.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwCurrencies.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwCurrencies.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarvwCurrencies.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwCurrencies.Add(ObjCVarvwCurrencies);
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
