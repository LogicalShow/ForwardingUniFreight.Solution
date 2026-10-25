using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Administration.Security.Generated
{
    [Serializable]
    public class CPKvwUserGroups
    {
        #region "variables"
        private Int32 mGroupID;
        #endregion

        #region "Methods"
        public Int32 GroupID
        {
            get { return mGroupID; }
            set { mGroupID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarvwUserGroups : CPKvwUserGroups
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Int32 mUserID;
        internal Boolean mCanView;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal String mUsername;
        internal Int32 mParentGroupID;
        internal String mGroupCode;
        internal Int32 mGroupOrderNo;
        internal String mGroupIconName;
        internal String mGroupImageURL;
        internal String mGroupDecryptedName;
        internal Boolean mIsInactive;
        internal String mParentGroupCode;
        internal Boolean mIsForCustomers;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 UserID
        {
            get { return mUserID; }
            set { mUserID = value; }
        }
        public Boolean CanView
        {
            get { return mCanView; }
            set { mCanView = value; }
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
        public String Username
        {
            get { return mUsername; }
            set { mUsername = value; }
        }
        public Int32 ParentGroupID
        {
            get { return mParentGroupID; }
            set { mParentGroupID = value; }
        }
        public String GroupCode
        {
            get { return mGroupCode; }
            set { mGroupCode = value; }
        }
        public Int32 GroupOrderNo
        {
            get { return mGroupOrderNo; }
            set { mGroupOrderNo = value; }
        }
        public String GroupIconName
        {
            get { return mGroupIconName; }
            set { mGroupIconName = value; }
        }
        public String GroupImageURL
        {
            get { return mGroupImageURL; }
            set { mGroupImageURL = value; }
        }
        public String GroupDecryptedName
        {
            get { return mGroupDecryptedName; }
            set { mGroupDecryptedName = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsInactive = value; }
        }
        public String ParentGroupCode
        {
            get { return mParentGroupCode; }
            set { mParentGroupCode = value; }
        }
        public Boolean IsForCustomers
        {
            get { return mIsForCustomers; }
            set { mIsForCustomers = value; }
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

    public partial class CvwUserGroups
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
        public List<CVarvwUserGroups> lstCVarvwUserGroups = new List<CVarvwUserGroups>();
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
            lstCVarvwUserGroups.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwUserGroups";
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
                        CVarvwUserGroups ObjCVarvwUserGroups = new CVarvwUserGroups();
                        ObjCVarvwUserGroups.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwUserGroups.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwUserGroups.GroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarvwUserGroups.mCanView = Convert.ToBoolean(dr["CanView"].ToString());
                        ObjCVarvwUserGroups.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwUserGroups.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwUserGroups.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwUserGroups.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwUserGroups.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwUserGroups.mParentGroupID = Convert.ToInt32(dr["ParentGroupID"].ToString());
                        ObjCVarvwUserGroups.mGroupCode = Convert.ToString(dr["GroupCode"].ToString());
                        ObjCVarvwUserGroups.mGroupOrderNo = Convert.ToInt32(dr["GroupOrderNo"].ToString());
                        ObjCVarvwUserGroups.mGroupIconName = Convert.ToString(dr["GroupIconName"].ToString());
                        ObjCVarvwUserGroups.mGroupImageURL = Convert.ToString(dr["GroupImageURL"].ToString());
                        ObjCVarvwUserGroups.mGroupDecryptedName = Convert.ToString(dr["GroupDecryptedName"].ToString());
                        ObjCVarvwUserGroups.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwUserGroups.mParentGroupCode = Convert.ToString(dr["ParentGroupCode"].ToString());
                        ObjCVarvwUserGroups.mIsForCustomers = Convert.ToBoolean(dr["IsForCustomers"].ToString());
                        lstCVarvwUserGroups.Add(ObjCVarvwUserGroups);
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
            lstCVarvwUserGroups.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwUserGroups";
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
                        CVarvwUserGroups ObjCVarvwUserGroups = new CVarvwUserGroups();
                        ObjCVarvwUserGroups.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwUserGroups.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwUserGroups.GroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarvwUserGroups.mCanView = Convert.ToBoolean(dr["CanView"].ToString());
                        ObjCVarvwUserGroups.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwUserGroups.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwUserGroups.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwUserGroups.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwUserGroups.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwUserGroups.mParentGroupID = Convert.ToInt32(dr["ParentGroupID"].ToString());
                        ObjCVarvwUserGroups.mGroupCode = Convert.ToString(dr["GroupCode"].ToString());
                        ObjCVarvwUserGroups.mGroupOrderNo = Convert.ToInt32(dr["GroupOrderNo"].ToString());
                        ObjCVarvwUserGroups.mGroupIconName = Convert.ToString(dr["GroupIconName"].ToString());
                        ObjCVarvwUserGroups.mGroupImageURL = Convert.ToString(dr["GroupImageURL"].ToString());
                        ObjCVarvwUserGroups.mGroupDecryptedName = Convert.ToString(dr["GroupDecryptedName"].ToString());
                        ObjCVarvwUserGroups.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwUserGroups.mParentGroupCode = Convert.ToString(dr["ParentGroupCode"].ToString());
                        ObjCVarvwUserGroups.mIsForCustomers = Convert.ToBoolean(dr["IsForCustomers"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwUserGroups.Add(ObjCVarvwUserGroups);
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
