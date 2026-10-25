using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Others.Generated
{
    [Serializable]
    public class CPKvwVessels
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
    public partial class CVarvwVessels : CPKvwVessels
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal String mCallSign;
        internal String mNotes;
        internal Int32 mShippingLineID;
        internal Boolean mIsInactive;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mLockingUserID;
        internal DateTime mTimeLocked;
        internal String mShippingLineCode;
        internal String mShippingLineName;
        internal String mShippingLineLocalName;
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
        public String CallSign
        {
            get { return mCallSign; }
            set { mCallSign = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Int32 ShippingLineID
        {
            get { return mShippingLineID; }
            set { mShippingLineID = value; }
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
        public String ShippingLineCode
        {
            get { return mShippingLineCode; }
            set { mShippingLineCode = value; }
        }
        public String ShippingLineName
        {
            get { return mShippingLineName; }
            set { mShippingLineName = value; }
        }
        public String ShippingLineLocalName
        {
            get { return mShippingLineLocalName; }
            set { mShippingLineLocalName = value; }
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

    public partial class CvwVessels
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
        public List<CVarvwVessels> lstCVarvwVessels = new List<CVarvwVessels>();
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
            lstCVarvwVessels.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListvwVessels";
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
                        CVarvwVessels ObjCVarvwVessels = new CVarvwVessels();
                        ObjCVarvwVessels.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwVessels.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwVessels.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwVessels.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwVessels.mCallSign = Convert.ToString(dr["CallSign"].ToString());
                        ObjCVarvwVessels.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwVessels.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarvwVessels.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwVessels.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwVessels.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwVessels.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwVessels.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwVessels.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarvwVessels.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarvwVessels.mShippingLineCode = Convert.ToString(dr["ShippingLineCode"].ToString());
                        ObjCVarvwVessels.mShippingLineName = Convert.ToString(dr["ShippingLineName"].ToString());
                        ObjCVarvwVessels.mShippingLineLocalName = Convert.ToString(dr["ShippingLineLocalName"].ToString());
                        lstCVarvwVessels.Add(ObjCVarvwVessels);
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
            lstCVarvwVessels.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwVessels";
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
                        CVarvwVessels ObjCVarvwVessels = new CVarvwVessels();
                        ObjCVarvwVessels.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwVessels.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwVessels.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwVessels.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwVessels.mCallSign = Convert.ToString(dr["CallSign"].ToString());
                        ObjCVarvwVessels.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwVessels.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarvwVessels.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwVessels.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwVessels.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwVessels.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwVessels.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwVessels.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarvwVessels.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarvwVessels.mShippingLineCode = Convert.ToString(dr["ShippingLineCode"].ToString());
                        ObjCVarvwVessels.mShippingLineName = Convert.ToString(dr["ShippingLineName"].ToString());
                        ObjCVarvwVessels.mShippingLineLocalName = Convert.ToString(dr["ShippingLineLocalName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwVessels.Add(ObjCVarvwVessels);
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
