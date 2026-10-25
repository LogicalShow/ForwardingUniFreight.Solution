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
    public class CPKvwRoleGroups
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
    public partial class CVarvwRoleGroups : CPKvwRoleGroups
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mRoleID;
        internal Int32 mGroupID;
        internal Boolean mCanView;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal String mName;
        internal Int32 mParentGroupID;
        internal String mGroupCode;
        internal Int32 mGroupOrderNo;
        internal String mGroupIconName;
        internal String mGroupImageURL;
        internal String mGroupDecryptedName;
        internal String mParentGroupCode;
        #endregion

        #region "Methods"
        public Int32 RoleID
        {
            get { return mRoleID; }
            set { mRoleID = value; }
        }
        public Int32 GroupID
        {
            get { return mGroupID; }
            set { mGroupID = value; }
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
        public String Name
        {
            get { return mName; }
            set { mName = value; }
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
        public String ParentGroupCode
        {
            get { return mParentGroupCode; }
            set { mParentGroupCode = value; }
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

    public partial class CvwRoleGroups
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
        public List<CVarvwRoleGroups> lstCVarvwRoleGroups = new List<CVarvwRoleGroups>();
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
            lstCVarvwRoleGroups.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListvwRoleGroups";
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
                        CVarvwRoleGroups ObjCVarvwRoleGroups = new CVarvwRoleGroups();
                        ObjCVarvwRoleGroups.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwRoleGroups.mRoleID = Convert.ToInt32(dr["RoleID"].ToString());
                        ObjCVarvwRoleGroups.mGroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarvwRoleGroups.mCanView = Convert.ToBoolean(dr["CanView"].ToString());
                        ObjCVarvwRoleGroups.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwRoleGroups.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwRoleGroups.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwRoleGroups.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwRoleGroups.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwRoleGroups.mParentGroupID = Convert.ToInt32(dr["ParentGroupID"].ToString());
                        ObjCVarvwRoleGroups.mGroupCode = Convert.ToString(dr["GroupCode"].ToString());
                        ObjCVarvwRoleGroups.mGroupOrderNo = Convert.ToInt32(dr["GroupOrderNo"].ToString());
                        ObjCVarvwRoleGroups.mGroupIconName = Convert.ToString(dr["GroupIconName"].ToString());
                        ObjCVarvwRoleGroups.mGroupImageURL = Convert.ToString(dr["GroupImageURL"].ToString());
                        ObjCVarvwRoleGroups.mGroupDecryptedName = Convert.ToString(dr["GroupDecryptedName"].ToString());
                        ObjCVarvwRoleGroups.mParentGroupCode = Convert.ToString(dr["ParentGroupCode"].ToString());
                        lstCVarvwRoleGroups.Add(ObjCVarvwRoleGroups);
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
            lstCVarvwRoleGroups.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwRoleGroups";
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
                        CVarvwRoleGroups ObjCVarvwRoleGroups = new CVarvwRoleGroups();
                        ObjCVarvwRoleGroups.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwRoleGroups.mRoleID = Convert.ToInt32(dr["RoleID"].ToString());
                        ObjCVarvwRoleGroups.mGroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarvwRoleGroups.mCanView = Convert.ToBoolean(dr["CanView"].ToString());
                        ObjCVarvwRoleGroups.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwRoleGroups.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwRoleGroups.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwRoleGroups.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwRoleGroups.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwRoleGroups.mParentGroupID = Convert.ToInt32(dr["ParentGroupID"].ToString());
                        ObjCVarvwRoleGroups.mGroupCode = Convert.ToString(dr["GroupCode"].ToString());
                        ObjCVarvwRoleGroups.mGroupOrderNo = Convert.ToInt32(dr["GroupOrderNo"].ToString());
                        ObjCVarvwRoleGroups.mGroupIconName = Convert.ToString(dr["GroupIconName"].ToString());
                        ObjCVarvwRoleGroups.mGroupImageURL = Convert.ToString(dr["GroupImageURL"].ToString());
                        ObjCVarvwRoleGroups.mGroupDecryptedName = Convert.ToString(dr["GroupDecryptedName"].ToString());
                        ObjCVarvwRoleGroups.mParentGroupCode = Convert.ToString(dr["ParentGroupCode"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwRoleGroups.Add(ObjCVarvwRoleGroups);
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
