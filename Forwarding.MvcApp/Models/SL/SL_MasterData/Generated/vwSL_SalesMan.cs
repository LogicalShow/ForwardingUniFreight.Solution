using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SL.SL_MasterData.Generated
{
    [Serializable]
    public class CPKvwSL_SalesMan
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
    public partial class CVarvwSL_SalesMan : CPKvwSL_SalesMan
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mUserName;
        internal Int32 mUserID;
        internal Int32 mCode;
        internal String mName;
        internal String mLocalName;
        internal String mJob;
        internal String mAddress;
        internal String mMobile;
        internal String mPhone;
        internal String mNotes;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mAccountID;
        internal String mAccountName;
        internal Int32 mSubAccountID;
        internal String mSubAccountName;
        internal Int32 mCostCenterID;
        internal String mCostCenterName;
        internal Int32 mSubAccountGroupID;
        internal Int32 mOperationCount;
        #endregion

        #region "Methods"
        public String UserName
        {
            get { return mUserName; }
            set { mUserName = value; }
        }
        public Int32 UserID
        {
            get { return mUserID; }
            set { mUserID = value; }
        }
        public Int32 Code
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
        public String Job
        {
            get { return mJob; }
            set { mJob = value; }
        }
        public String Address
        {
            get { return mAddress; }
            set { mAddress = value; }
        }
        public String Mobile
        {
            get { return mMobile; }
            set { mMobile = value; }
        }
        public String Phone
        {
            get { return mPhone; }
            set { mPhone = value; }
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
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mAccountID = value; }
        }
        public String AccountName
        {
            get { return mAccountName; }
            set { mAccountName = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mSubAccountID = value; }
        }
        public String SubAccountName
        {
            get { return mSubAccountName; }
            set { mSubAccountName = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mCostCenterID = value; }
        }
        public String CostCenterName
        {
            get { return mCostCenterName; }
            set { mCostCenterName = value; }
        }
        public Int32 SubAccountGroupID
        {
            get { return mSubAccountGroupID; }
            set { mSubAccountGroupID = value; }
        }
        public Int32 OperationCount
        {
            get { return mOperationCount; }
            set { mOperationCount = value; }
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

    public partial class CvwSL_SalesMan
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
        public List<CVarvwSL_SalesMan> lstCVarvwSL_SalesMan = new List<CVarvwSL_SalesMan>();
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
            lstCVarvwSL_SalesMan.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSL_SalesMan";
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
                        CVarvwSL_SalesMan ObjCVarvwSL_SalesMan = new CVarvwSL_SalesMan();
                        ObjCVarvwSL_SalesMan.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSL_SalesMan.mUserName = Convert.ToString(dr["UserName"].ToString());
                        ObjCVarvwSL_SalesMan.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwSL_SalesMan.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarvwSL_SalesMan.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwSL_SalesMan.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwSL_SalesMan.mJob = Convert.ToString(dr["Job"].ToString());
                        ObjCVarvwSL_SalesMan.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarvwSL_SalesMan.mMobile = Convert.ToString(dr["Mobile"].ToString());
                        ObjCVarvwSL_SalesMan.mPhone = Convert.ToString(dr["Phone"].ToString());
                        ObjCVarvwSL_SalesMan.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSL_SalesMan.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwSL_SalesMan.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwSL_SalesMan.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwSL_SalesMan.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwSL_SalesMan.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwSL_SalesMan.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwSL_SalesMan.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwSL_SalesMan.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        ObjCVarvwSL_SalesMan.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwSL_SalesMan.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwSL_SalesMan.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarvwSL_SalesMan.mOperationCount = Convert.ToInt32(dr["OperationCount"].ToString());
                        lstCVarvwSL_SalesMan.Add(ObjCVarvwSL_SalesMan);
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
            lstCVarvwSL_SalesMan.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSL_SalesMan";
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
                        CVarvwSL_SalesMan ObjCVarvwSL_SalesMan = new CVarvwSL_SalesMan();
                        ObjCVarvwSL_SalesMan.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSL_SalesMan.mUserName = Convert.ToString(dr["UserName"].ToString());
                        ObjCVarvwSL_SalesMan.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwSL_SalesMan.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarvwSL_SalesMan.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwSL_SalesMan.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwSL_SalesMan.mJob = Convert.ToString(dr["Job"].ToString());
                        ObjCVarvwSL_SalesMan.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarvwSL_SalesMan.mMobile = Convert.ToString(dr["Mobile"].ToString());
                        ObjCVarvwSL_SalesMan.mPhone = Convert.ToString(dr["Phone"].ToString());
                        ObjCVarvwSL_SalesMan.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSL_SalesMan.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwSL_SalesMan.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwSL_SalesMan.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwSL_SalesMan.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwSL_SalesMan.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwSL_SalesMan.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwSL_SalesMan.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwSL_SalesMan.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        ObjCVarvwSL_SalesMan.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwSL_SalesMan.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwSL_SalesMan.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarvwSL_SalesMan.mOperationCount = Convert.ToInt32(dr["OperationCount"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSL_SalesMan.Add(ObjCVarvwSL_SalesMan);
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
