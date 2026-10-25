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
    public class CPKvwRoleForms
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
    public partial class CVarvwRoleForms : CPKvwRoleForms
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mRoleID;
        internal Int32 mFormID;
        internal Boolean mCanView;
        internal Boolean mCanAdd;
        internal Boolean mCanEdit;
        internal Boolean mCanDelete;
        internal Boolean mHideOthersRecords;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
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
        public Int32 RoleID
        {
            get { return mRoleID; }
            set { mRoleID = value; }
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

    public partial class CvwRoleForms
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
        public List<CVarvwRoleForms> lstCVarvwRoleForms = new List<CVarvwRoleForms>();
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
            lstCVarvwRoleForms.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwRoleForms";
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
                        CVarvwRoleForms ObjCVarvwRoleForms = new CVarvwRoleForms();
                        ObjCVarvwRoleForms.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwRoleForms.mRoleID = Convert.ToInt32(dr["RoleID"].ToString());
                        ObjCVarvwRoleForms.mFormID = Convert.ToInt32(dr["FormID"].ToString());
                        ObjCVarvwRoleForms.mCanView = Convert.ToBoolean(dr["CanView"].ToString());
                        ObjCVarvwRoleForms.mCanAdd = Convert.ToBoolean(dr["CanAdd"].ToString());
                        ObjCVarvwRoleForms.mCanEdit = Convert.ToBoolean(dr["CanEdit"].ToString());
                        ObjCVarvwRoleForms.mCanDelete = Convert.ToBoolean(dr["CanDelete"].ToString());
                        ObjCVarvwRoleForms.mHideOthersRecords = Convert.ToBoolean(dr["HideOthersRecords"].ToString());
                        ObjCVarvwRoleForms.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwRoleForms.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwRoleForms.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwRoleForms.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwRoleForms.mRoleName = Convert.ToString(dr["RoleName"].ToString());
                        ObjCVarvwRoleForms.mGroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarvwRoleForms.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwRoleForms.mOrderNo = Convert.ToInt32(dr["OrderNo"].ToString());
                        ObjCVarvwRoleForms.mIconName = Convert.ToString(dr["IconName"].ToString());
                        ObjCVarvwRoleForms.mImageName = Convert.ToString(dr["ImageName"].ToString());
                        ObjCVarvwRoleForms.mDecryptedCode = Convert.ToString(dr["DecryptedCode"].ToString());
                        ObjCVarvwRoleForms.mDecryptedName = Convert.ToString(dr["DecryptedName"].ToString());
                        ObjCVarvwRoleForms.mDecryptedDescription = Convert.ToString(dr["DecryptedDescription"].ToString());
                        ObjCVarvwRoleForms.mEncryptedDescription = Convert.ToString(dr["EncryptedDescription"].ToString());
                        ObjCVarvwRoleForms.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwRoleForms.mGroupCode = Convert.ToString(dr["GroupCode"].ToString());
                        ObjCVarvwRoleForms.mModuleCode = Convert.ToString(dr["ModuleCode"].ToString());
                        lstCVarvwRoleForms.Add(ObjCVarvwRoleForms);
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
            lstCVarvwRoleForms.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwRoleForms";
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
                        CVarvwRoleForms ObjCVarvwRoleForms = new CVarvwRoleForms();
                        ObjCVarvwRoleForms.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwRoleForms.mRoleID = Convert.ToInt32(dr["RoleID"].ToString());
                        ObjCVarvwRoleForms.mFormID = Convert.ToInt32(dr["FormID"].ToString());
                        ObjCVarvwRoleForms.mCanView = Convert.ToBoolean(dr["CanView"].ToString());
                        ObjCVarvwRoleForms.mCanAdd = Convert.ToBoolean(dr["CanAdd"].ToString());
                        ObjCVarvwRoleForms.mCanEdit = Convert.ToBoolean(dr["CanEdit"].ToString());
                        ObjCVarvwRoleForms.mCanDelete = Convert.ToBoolean(dr["CanDelete"].ToString());
                        ObjCVarvwRoleForms.mHideOthersRecords = Convert.ToBoolean(dr["HideOthersRecords"].ToString());
                        ObjCVarvwRoleForms.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwRoleForms.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwRoleForms.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwRoleForms.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwRoleForms.mRoleName = Convert.ToString(dr["RoleName"].ToString());
                        ObjCVarvwRoleForms.mGroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarvwRoleForms.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwRoleForms.mOrderNo = Convert.ToInt32(dr["OrderNo"].ToString());
                        ObjCVarvwRoleForms.mIconName = Convert.ToString(dr["IconName"].ToString());
                        ObjCVarvwRoleForms.mImageName = Convert.ToString(dr["ImageName"].ToString());
                        ObjCVarvwRoleForms.mDecryptedCode = Convert.ToString(dr["DecryptedCode"].ToString());
                        ObjCVarvwRoleForms.mDecryptedName = Convert.ToString(dr["DecryptedName"].ToString());
                        ObjCVarvwRoleForms.mDecryptedDescription = Convert.ToString(dr["DecryptedDescription"].ToString());
                        ObjCVarvwRoleForms.mEncryptedDescription = Convert.ToString(dr["EncryptedDescription"].ToString());
                        ObjCVarvwRoleForms.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwRoleForms.mGroupCode = Convert.ToString(dr["GroupCode"].ToString());
                        ObjCVarvwRoleForms.mModuleCode = Convert.ToString(dr["ModuleCode"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwRoleForms.Add(ObjCVarvwRoleForms);
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
