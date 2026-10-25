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
    public class CPKvwIncoterms
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
    public partial class CVarvwIncoterms : CPKvwIncoterms
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal Int32 mFreightTypeID;
        internal Int32 mOtherChargesID;
        internal Boolean mIsAddedManually;
        internal String mDescription;
        internal Boolean mIsInactive;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mLockingUserID;
        internal DateTime mTimeLocked;
        internal String mFreightTypeCode;
        internal String mFreightTypeName;
        internal String mOtherChargesCode;
        internal String mOtherChargesName;
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
        public Int32 FreightTypeID
        {
            get { return mFreightTypeID; }
            set { mFreightTypeID = value; }
        }
        public Int32 OtherChargesID
        {
            get { return mOtherChargesID; }
            set { mOtherChargesID = value; }
        }
        public Boolean IsAddedManually
        {
            get { return mIsAddedManually; }
            set { mIsAddedManually = value; }
        }
        public String Description
        {
            get { return mDescription; }
            set { mDescription = value; }
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
        public String FreightTypeCode
        {
            get { return mFreightTypeCode; }
            set { mFreightTypeCode = value; }
        }
        public String FreightTypeName
        {
            get { return mFreightTypeName; }
            set { mFreightTypeName = value; }
        }
        public String OtherChargesCode
        {
            get { return mOtherChargesCode; }
            set { mOtherChargesCode = value; }
        }
        public String OtherChargesName
        {
            get { return mOtherChargesName; }
            set { mOtherChargesName = value; }
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

    public partial class CvwIncoterms
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
        public List<CVarvwIncoterms> lstCVarvwIncoterms = new List<CVarvwIncoterms>();
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
            lstCVarvwIncoterms.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListvwIncoterms";
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
                        CVarvwIncoterms ObjCVarvwIncoterms = new CVarvwIncoterms();
                        ObjCVarvwIncoterms.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwIncoterms.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwIncoterms.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwIncoterms.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwIncoterms.mFreightTypeID = Convert.ToInt32(dr["FreightTypeID"].ToString());
                        ObjCVarvwIncoterms.mOtherChargesID = Convert.ToInt32(dr["OtherChargesID"].ToString());
                        ObjCVarvwIncoterms.mIsAddedManually = Convert.ToBoolean(dr["IsAddedManually"].ToString());
                        ObjCVarvwIncoterms.mDescription = Convert.ToString(dr["Description"].ToString());
                        ObjCVarvwIncoterms.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwIncoterms.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwIncoterms.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwIncoterms.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwIncoterms.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwIncoterms.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarvwIncoterms.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarvwIncoterms.mFreightTypeCode = Convert.ToString(dr["FreightTypeCode"].ToString());
                        ObjCVarvwIncoterms.mFreightTypeName = Convert.ToString(dr["FreightTypeName"].ToString());
                        ObjCVarvwIncoterms.mOtherChargesCode = Convert.ToString(dr["OtherChargesCode"].ToString());
                        ObjCVarvwIncoterms.mOtherChargesName = Convert.ToString(dr["OtherChargesName"].ToString());
                        lstCVarvwIncoterms.Add(ObjCVarvwIncoterms);
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
            lstCVarvwIncoterms.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwIncoterms";
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
                        CVarvwIncoterms ObjCVarvwIncoterms = new CVarvwIncoterms();
                        ObjCVarvwIncoterms.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwIncoterms.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwIncoterms.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwIncoterms.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwIncoterms.mFreightTypeID = Convert.ToInt32(dr["FreightTypeID"].ToString());
                        ObjCVarvwIncoterms.mOtherChargesID = Convert.ToInt32(dr["OtherChargesID"].ToString());
                        ObjCVarvwIncoterms.mIsAddedManually = Convert.ToBoolean(dr["IsAddedManually"].ToString());
                        ObjCVarvwIncoterms.mDescription = Convert.ToString(dr["Description"].ToString());
                        ObjCVarvwIncoterms.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwIncoterms.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwIncoterms.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwIncoterms.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwIncoterms.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwIncoterms.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarvwIncoterms.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarvwIncoterms.mFreightTypeCode = Convert.ToString(dr["FreightTypeCode"].ToString());
                        ObjCVarvwIncoterms.mFreightTypeName = Convert.ToString(dr["FreightTypeName"].ToString());
                        ObjCVarvwIncoterms.mOtherChargesCode = Convert.ToString(dr["OtherChargesCode"].ToString());
                        ObjCVarvwIncoterms.mOtherChargesName = Convert.ToString(dr["OtherChargesName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwIncoterms.Add(ObjCVarvwIncoterms);
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
