using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Administration.DisbursementLink.Customized
{
    [Serializable]
    public class CPKDASUsers
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
    public partial class CVarDASUsers : CPKDASUsers
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mUsername;
        internal String mName;
        internal String mLocalName;
        internal Int32 mRoleID;
        internal Int32 mBranchID;
        internal Int32 mDepartmentID;
        internal String mAddress;
        internal String mPhone1;
        internal String mPhone2;
        internal String mMobile1;
        internal String mEmail;
        internal String mPassword;
        internal DateTime mExpirationDate;
        internal Boolean mIsInactive;
        internal String mNotes;
        internal Boolean mIsSalesman;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;

        #endregion

        #region "Methods"
        public String Username
        {
            get { return mUsername; }
            set { mIsChanges = true; mUsername = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mIsChanges = true; mName = value; }
        }
        public String LocalName
        {
            get { return mLocalName; }
            set { mIsChanges = true; mLocalName = value; }
        }
        public Int32 RoleID
        {
            get { return mRoleID; }
            set { mIsChanges = true; mRoleID = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mIsChanges = true; mBranchID = value; }
        }
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mIsChanges = true; mDepartmentID = value; }
        }
        public String Address
        {
            get { return mAddress; }
            set { mIsChanges = true; mAddress = value; }
        }
        public String Phone1
        {
            get { return mPhone1; }
            set { mIsChanges = true; mPhone1 = value; }
        }
        public String Phone2
        {
            get { return mPhone2; }
            set { mIsChanges = true; mPhone2 = value; }
        }
        public String Mobile1
        {
            get { return mMobile1; }
            set { mIsChanges = true; mMobile1 = value; }
        }
        public String Email
        {
            get { return mEmail; }
            set { mIsChanges = true; mEmail = value; }
        }
        public String Password
        {
            get { return mPassword; }
            set { mIsChanges = true; mPassword = value; }
        }
        public DateTime ExpirationDate
        {
            get { return mExpirationDate; }
            set { mIsChanges = true; mExpirationDate = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsChanges = true; mIsInactive = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Boolean IsSalesman
        {
            get { return mIsSalesman; }
            set { mIsChanges = true; mIsSalesman = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mIsChanges = true; mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mIsChanges = true; mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mIsChanges = true; mModificationDate = value; }
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

    public partial class CDASUsers
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
        public List<CVarDASUsers> lstCVarDASUsers = new List<CVarDASUsers>();
        public List<CPKDASUsers> lstDeletedCPKDASUsers = new List<CPKDASUsers>();
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
        public Exception GetItem(Int32 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DisbursementConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarDASUsers.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListUsers";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemUsers";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                    Com.Parameters[0].Value = Convert.ToInt32(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarDASUsers ObjCVarDASUsers = new CVarDASUsers();
                        ObjCVarDASUsers.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarDASUsers.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarDASUsers.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarDASUsers.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarDASUsers.mRoleID = Convert.ToInt32(dr["RoleID"].ToString());
                        ObjCVarDASUsers.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarDASUsers.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarDASUsers.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarDASUsers.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
                        ObjCVarDASUsers.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
                        ObjCVarDASUsers.mMobile1 = Convert.ToString(dr["Mobile1"].ToString());
                        ObjCVarDASUsers.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarDASUsers.mPassword = Convert.ToString(dr["Password"].ToString());
                        ObjCVarDASUsers.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
                        ObjCVarDASUsers.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarDASUsers.mNotes = Convert.ToString(dr["Notes"].ToString());
                    //    ObjCVarDASUsers.mIsSalesman = Convert.ToBoolean(dr["IsSalesman"].ToString());
                        ObjCVarDASUsers.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarDASUsers.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarDASUsers.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarDASUsers.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                    
                        lstCVarDASUsers.Add(ObjCVarDASUsers);
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
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DisbursementConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarDASUsers.Clear();

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
                Com.CommandText = "[dbo].GetListPagingUsers";
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
                        CVarDASUsers ObjCVarDASUsers = new CVarDASUsers();
                        ObjCVarDASUsers.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarDASUsers.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarDASUsers.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarDASUsers.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarDASUsers.mRoleID = Convert.ToInt32(dr["RoleID"].ToString());
                        ObjCVarDASUsers.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarDASUsers.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarDASUsers.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarDASUsers.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
                        ObjCVarDASUsers.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
                        ObjCVarDASUsers.mMobile1 = Convert.ToString(dr["Mobile1"].ToString());
                        ObjCVarDASUsers.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarDASUsers.mPassword = Convert.ToString(dr["Password"].ToString());
                        ObjCVarDASUsers.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
                        ObjCVarDASUsers.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarDASUsers.mNotes = Convert.ToString(dr["Notes"].ToString());
                       // ObjCVarDASUsers.mIsSalesman = Convert.ToBoolean(dr["IsSalesman"].ToString());
                        ObjCVarDASUsers.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarDASUsers.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarDASUsers.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarDASUsers.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarDASUsers.Add(ObjCVarDASUsers);
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
        #region "Common Methods"
        private void BeginTrans(SqlCommand Com, SqlConnection Con)
        {

            tr = Con.BeginTransaction(IsolationLevel.Serializable);
            Com.CommandType = CommandType.StoredProcedure;
        }

        private void EndTrans(SqlCommand Com, SqlConnection Con)
        {

            Com.Transaction = tr;
            Com.Connection = Con;
            Com.ExecuteNonQuery();
            tr.Commit();
        }

        #endregion
        #region "Set List Method"
        private Exception SetList(string WhereClause, Boolean IsDelete)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DisbursementConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListUsers";
                else
                    Com.CommandText = "[dbo].UpdateListUsers";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                BeginTrans(Com, Con);
                Com.Parameters[0].Value = WhereClause;
                EndTrans(Com, Con);
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
        #region "Delete Methods"
        public Exception DeleteItem(List<CPKDASUsers> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DisbursementConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemUsers";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKDASUsers ObjCPKDASUsers in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKDASUsers.ID);
                    EndTrans(Com, Con);
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                Con.Close();
                Con.Dispose();
                DeleteList.Clear();
            }
            return Exp;
        }

        public Exception DeleteList(string WhereClause)
        {

            return SetList(WhereClause, true);
        }

        #endregion
        #region "Save Methods"
        public Exception SaveMethod(List<CVarDASUsers> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DisbursementConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Username", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LocalName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@RoleID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DepartmentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Address", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Phone1", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Phone2", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Mobile1", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Email", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Password", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ExpirationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
              //  Com.Parameters.Add(new SqlParameter("@IsSalesman", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@HeartBeatDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsAccessAllCharges", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsHideOthersRecords", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Email_Password", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Email_DisplayName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Email_Host", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Email_Port", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Email_IsSSL", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Email_Header", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Email_Footer", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CustomerID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarDASUsers ObjCVarDASUsers in SaveList)
                {
                    if (ObjCVarDASUsers.mIsChanges == true)
                    {
                        if (ObjCVarDASUsers.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemUsers";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarDASUsers.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemUsers";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarDASUsers.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarDASUsers.ID;
                        }
                        Com.Parameters["@Username"].Value = ObjCVarDASUsers.Username;
                        Com.Parameters["@Name"].Value = ObjCVarDASUsers.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarDASUsers.LocalName;
                        Com.Parameters["@RoleID"].Value = ObjCVarDASUsers.RoleID;
                        Com.Parameters["@BranchID"].Value = ObjCVarDASUsers.BranchID;
                        Com.Parameters["@DepartmentID"].Value = ObjCVarDASUsers.DepartmentID;
                        Com.Parameters["@Address"].Value = ObjCVarDASUsers.Address;
                        Com.Parameters["@Phone1"].Value = ObjCVarDASUsers.Phone1;
                        Com.Parameters["@Phone2"].Value = ObjCVarDASUsers.Phone2;
                        Com.Parameters["@Mobile1"].Value = ObjCVarDASUsers.Mobile1;
                        Com.Parameters["@Email"].Value = ObjCVarDASUsers.Email;
                        Com.Parameters["@Password"].Value = ObjCVarDASUsers.Password;
                        Com.Parameters["@ExpirationDate"].Value = ObjCVarDASUsers.ExpirationDate;
                        Com.Parameters["@IsInactive"].Value = ObjCVarDASUsers.IsInactive;
                        Com.Parameters["@Notes"].Value = ObjCVarDASUsers.Notes;
                      //  Com.Parameters["@IsSalesman"].Value = ObjCVarDASUsers.IsSalesman;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarDASUsers.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarDASUsers.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarDASUsers.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarDASUsers.ModificationDate;
                        EndTrans(Com, Con);
                        if (ObjCVarDASUsers.ID == 0)
                        {
                            ObjCVarDASUsers.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarDASUsers.mIsChanges = false;
                    }
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
                if (tr != null)
                    tr.Rollback();
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return Exp;
        }
        #endregion
        #region "Update Methods"
        public Exception UpdateList(string UpdateClause)
        {

            return SetList(UpdateClause, false);
        }

        #endregion
    }


}
