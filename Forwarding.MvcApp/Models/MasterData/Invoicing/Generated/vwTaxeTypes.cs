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
    public class CPKvwTaxeTypes
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
    public partial class CVarvwTaxeTypes : CPKvwTaxeTypes
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal Decimal mCurrentPercentage;
        internal Decimal mCurrentAlternatePercentage;
        internal DateTime mCurrentPercentageDate;
        internal String mNotes;
        internal Boolean mIsDiscount;
        internal Boolean mIsInactive;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mLockingUserID;
        internal DateTime mTimeLocked;
        internal Int32 mAccount_ID;
        internal String mAccountName;
        internal Int32 mSubAccount_ID;
        internal String mSubAccountName;
        internal Boolean mIsDebitAccount;
        internal String mAccountTypeName;
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
        public Decimal CurrentPercentage
        {
            get { return mCurrentPercentage; }
            set { mCurrentPercentage = value; }
        }
        public Decimal CurrentAlternatePercentage
        {
            get { return mCurrentAlternatePercentage; }
            set { mCurrentAlternatePercentage = value; }
        }
        public DateTime CurrentPercentageDate
        {
            get { return mCurrentPercentageDate; }
            set { mCurrentPercentageDate = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Boolean IsDiscount
        {
            get { return mIsDiscount; }
            set { mIsDiscount = value; }
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
        public Int32 Account_ID
        {
            get { return mAccount_ID; }
            set { mAccount_ID = value; }
        }
        public String AccountName
        {
            get { return mAccountName; }
            set { mAccountName = value; }
        }
        public Int32 SubAccount_ID
        {
            get { return mSubAccount_ID; }
            set { mSubAccount_ID = value; }
        }
        public String SubAccountName
        {
            get { return mSubAccountName; }
            set { mSubAccountName = value; }
        }
        public Boolean IsDebitAccount
        {
            get { return mIsDebitAccount; }
            set { mIsDebitAccount = value; }
        }
        public String AccountTypeName
        {
            get { return mAccountTypeName; }
            set { mAccountTypeName = value; }
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

    public partial class CvwTaxeTypes
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
        public List<CVarvwTaxeTypes> lstCVarvwTaxeTypes = new List<CVarvwTaxeTypes>();
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
            lstCVarvwTaxeTypes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwTaxeTypes";
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
                        CVarvwTaxeTypes ObjCVarvwTaxeTypes = new CVarvwTaxeTypes();
                        ObjCVarvwTaxeTypes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwTaxeTypes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwTaxeTypes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwTaxeTypes.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwTaxeTypes.mCurrentPercentage = Convert.ToDecimal(dr["CurrentPercentage"].ToString());
                        ObjCVarvwTaxeTypes.mCurrentAlternatePercentage = Convert.ToDecimal(dr["CurrentAlternatePercentage"].ToString());
                        ObjCVarvwTaxeTypes.mCurrentPercentageDate = Convert.ToDateTime(dr["CurrentPercentageDate"].ToString());
                        ObjCVarvwTaxeTypes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwTaxeTypes.mIsDiscount = Convert.ToBoolean(dr["IsDiscount"].ToString());
                        ObjCVarvwTaxeTypes.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwTaxeTypes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwTaxeTypes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwTaxeTypes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwTaxeTypes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwTaxeTypes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarvwTaxeTypes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarvwTaxeTypes.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarvwTaxeTypes.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwTaxeTypes.mSubAccount_ID = Convert.ToInt32(dr["SubAccount_ID"].ToString());
                        ObjCVarvwTaxeTypes.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        ObjCVarvwTaxeTypes.mIsDebitAccount = Convert.ToBoolean(dr["IsDebitAccount"].ToString());
                        ObjCVarvwTaxeTypes.mAccountTypeName = Convert.ToString(dr["AccountTypeName"].ToString());
                        lstCVarvwTaxeTypes.Add(ObjCVarvwTaxeTypes);
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
            lstCVarvwTaxeTypes.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwTaxeTypes";
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
                        CVarvwTaxeTypes ObjCVarvwTaxeTypes = new CVarvwTaxeTypes();
                        ObjCVarvwTaxeTypes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwTaxeTypes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwTaxeTypes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwTaxeTypes.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwTaxeTypes.mCurrentPercentage = Convert.ToDecimal(dr["CurrentPercentage"].ToString());
                        ObjCVarvwTaxeTypes.mCurrentAlternatePercentage = Convert.ToDecimal(dr["CurrentAlternatePercentage"].ToString());
                        ObjCVarvwTaxeTypes.mCurrentPercentageDate = Convert.ToDateTime(dr["CurrentPercentageDate"].ToString());
                        ObjCVarvwTaxeTypes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwTaxeTypes.mIsDiscount = Convert.ToBoolean(dr["IsDiscount"].ToString());
                        ObjCVarvwTaxeTypes.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwTaxeTypes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwTaxeTypes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwTaxeTypes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwTaxeTypes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwTaxeTypes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarvwTaxeTypes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarvwTaxeTypes.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarvwTaxeTypes.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwTaxeTypes.mSubAccount_ID = Convert.ToInt32(dr["SubAccount_ID"].ToString());
                        ObjCVarvwTaxeTypes.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        ObjCVarvwTaxeTypes.mIsDebitAccount = Convert.ToBoolean(dr["IsDebitAccount"].ToString());
                        ObjCVarvwTaxeTypes.mAccountTypeName = Convert.ToString(dr["AccountTypeName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwTaxeTypes.Add(ObjCVarvwTaxeTypes);
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
