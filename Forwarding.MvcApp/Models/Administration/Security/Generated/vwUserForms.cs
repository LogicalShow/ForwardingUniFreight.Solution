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
    public partial class CVarvwUserForms
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Int32 mUserID;
        internal Int32 mFormID;
        internal Boolean mCanView;
        internal Boolean mCanAdd;
        internal Boolean mCanEdit;
        internal Boolean mCanDelete;
        internal Boolean mHideOthersRecords;
        internal Boolean mIsUsersShareRecords;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal String mName;
        internal String mLocalName;
        internal String mUsername;
        internal Int32 mRoleID;
        internal String mRoleName;
        internal Int32 mGroupID;
        internal String mCode;
        internal Int32 mOrderNo;
        internal String mIconName;
        internal String mImageName;
        internal String mDecryptedCode;
        internal String mDecryptedName;
        internal String mDecryptedDescription;
        internal String mEncryptedDescription;
        internal Boolean mIsInactive;
        internal String mGroupCode;
        internal String mModuleCode;
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
        public Int32 FormID
        {
            get { return mFormID; }
            set { mFormID = value; }
        }
        public Boolean CanView
        {
            get { return mCanView; }
            set { mCanView = value; }
        }
        public Boolean CanAdd
        {
            get { return mCanAdd; }
            set { mCanAdd = value; }
        }
        public Boolean CanEdit
        {
            get { return mCanEdit; }
            set { mCanEdit = value; }
        }
        public Boolean CanDelete
        {
            get { return mCanDelete; }
            set { mCanDelete = value; }
        }
        public Boolean HideOthersRecords
        {
            get { return mHideOthersRecords; }
            set { mHideOthersRecords = value; }
        }
        public Boolean IsUsersShareRecords
        {
            get { return mIsUsersShareRecords; }
            set { mIsUsersShareRecords = value; }
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
        public String LocalName
        {
            get { return mLocalName; }
            set { mLocalName = value; }
        }
        public String Username
        {
            get { return mUsername; }
            set { mUsername = value; }
        }
        public Int32 RoleID
        {
            get { return mRoleID; }
            set { mRoleID = value; }
        }
        public String RoleName
        {
            get { return mRoleName; }
            set { mRoleName = value; }
        }
        public Int32 GroupID
        {
            get { return mGroupID; }
            set { mGroupID = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public Int32 OrderNo
        {
            get { return mOrderNo; }
            set { mOrderNo = value; }
        }
        public String IconName
        {
            get { return mIconName; }
            set { mIconName = value; }
        }
        public String ImageName
        {
            get { return mImageName; }
            set { mImageName = value; }
        }
        public String DecryptedCode
        {
            get { return mDecryptedCode; }
            set { mDecryptedCode = value; }
        }
        public String DecryptedName
        {
            get { return mDecryptedName; }
            set { mDecryptedName = value; }
        }
        public String DecryptedDescription
        {
            get { return mDecryptedDescription; }
            set { mDecryptedDescription = value; }
        }
        public String EncryptedDescription
        {
            get { return mEncryptedDescription; }
            set { mEncryptedDescription = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsInactive = value; }
        }
        public String GroupCode
        {
            get { return mGroupCode; }
            set { mGroupCode = value; }
        }
        public String ModuleCode
        {
            get { return mModuleCode; }
            set { mModuleCode = value; }
        }
        #endregion
    }

    public partial class CvwUserForms
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
        public List<CVarvwUserForms> lstCVarvwUserForms = new List<CVarvwUserForms>();
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
            lstCVarvwUserForms.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwUserForms";
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
                        CVarvwUserForms ObjCVarvwUserForms = new CVarvwUserForms();
                        ObjCVarvwUserForms.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwUserForms.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwUserForms.mFormID = Convert.ToInt32(dr["FormID"].ToString());
                        ObjCVarvwUserForms.mCanView = Convert.ToBoolean(dr["CanView"].ToString());
                        ObjCVarvwUserForms.mCanAdd = Convert.ToBoolean(dr["CanAdd"].ToString());
                        ObjCVarvwUserForms.mCanEdit = Convert.ToBoolean(dr["CanEdit"].ToString());
                        ObjCVarvwUserForms.mCanDelete = Convert.ToBoolean(dr["CanDelete"].ToString());
                        ObjCVarvwUserForms.mHideOthersRecords = Convert.ToBoolean(dr["HideOthersRecords"].ToString());
                        ObjCVarvwUserForms.mIsUsersShareRecords = Convert.ToBoolean(dr["IsUsersShareRecords"].ToString());
                        ObjCVarvwUserForms.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwUserForms.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwUserForms.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwUserForms.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwUserForms.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwUserForms.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwUserForms.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwUserForms.mRoleID = Convert.ToInt32(dr["RoleID"].ToString());
                        ObjCVarvwUserForms.mRoleName = Convert.ToString(dr["RoleName"].ToString());
                        ObjCVarvwUserForms.mGroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarvwUserForms.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwUserForms.mOrderNo = Convert.ToInt32(dr["OrderNo"].ToString());
                        ObjCVarvwUserForms.mIconName = Convert.ToString(dr["IconName"].ToString());
                        ObjCVarvwUserForms.mImageName = Convert.ToString(dr["ImageName"].ToString());
                        ObjCVarvwUserForms.mDecryptedCode = Convert.ToString(dr["DecryptedCode"].ToString());
                        ObjCVarvwUserForms.mDecryptedName = Convert.ToString(dr["DecryptedName"].ToString());
                        ObjCVarvwUserForms.mDecryptedDescription = Convert.ToString(dr["DecryptedDescription"].ToString());
                        ObjCVarvwUserForms.mEncryptedDescription = Convert.ToString(dr["EncryptedDescription"].ToString());
                        ObjCVarvwUserForms.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwUserForms.mGroupCode = Convert.ToString(dr["GroupCode"].ToString());
                        ObjCVarvwUserForms.mModuleCode = Convert.ToString(dr["ModuleCode"].ToString());
                        lstCVarvwUserForms.Add(ObjCVarvwUserForms);
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
            lstCVarvwUserForms.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwUserForms";
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
                        CVarvwUserForms ObjCVarvwUserForms = new CVarvwUserForms();
                        ObjCVarvwUserForms.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwUserForms.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwUserForms.mFormID = Convert.ToInt32(dr["FormID"].ToString());
                        ObjCVarvwUserForms.mCanView = Convert.ToBoolean(dr["CanView"].ToString());
                        ObjCVarvwUserForms.mCanAdd = Convert.ToBoolean(dr["CanAdd"].ToString());
                        ObjCVarvwUserForms.mCanEdit = Convert.ToBoolean(dr["CanEdit"].ToString());
                        ObjCVarvwUserForms.mCanDelete = Convert.ToBoolean(dr["CanDelete"].ToString());
                        ObjCVarvwUserForms.mHideOthersRecords = Convert.ToBoolean(dr["HideOthersRecords"].ToString());
                        ObjCVarvwUserForms.mIsUsersShareRecords = Convert.ToBoolean(dr["IsUsersShareRecords"].ToString());
                        ObjCVarvwUserForms.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwUserForms.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwUserForms.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwUserForms.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwUserForms.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwUserForms.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwUserForms.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwUserForms.mRoleID = Convert.ToInt32(dr["RoleID"].ToString());
                        ObjCVarvwUserForms.mRoleName = Convert.ToString(dr["RoleName"].ToString());
                        ObjCVarvwUserForms.mGroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarvwUserForms.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwUserForms.mOrderNo = Convert.ToInt32(dr["OrderNo"].ToString());
                        ObjCVarvwUserForms.mIconName = Convert.ToString(dr["IconName"].ToString());
                        ObjCVarvwUserForms.mImageName = Convert.ToString(dr["ImageName"].ToString());
                        ObjCVarvwUserForms.mDecryptedCode = Convert.ToString(dr["DecryptedCode"].ToString());
                        ObjCVarvwUserForms.mDecryptedName = Convert.ToString(dr["DecryptedName"].ToString());
                        ObjCVarvwUserForms.mDecryptedDescription = Convert.ToString(dr["DecryptedDescription"].ToString());
                        ObjCVarvwUserForms.mEncryptedDescription = Convert.ToString(dr["EncryptedDescription"].ToString());
                        ObjCVarvwUserForms.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwUserForms.mGroupCode = Convert.ToString(dr["GroupCode"].ToString());
                        ObjCVarvwUserForms.mModuleCode = Convert.ToString(dr["ModuleCode"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwUserForms.Add(ObjCVarvwUserForms);
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
