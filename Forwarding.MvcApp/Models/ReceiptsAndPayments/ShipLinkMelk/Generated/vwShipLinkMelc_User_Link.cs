using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkMelk.Generated
{
    [Serializable]
    public partial class CVarvwShipLinkMelc_User_Link
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
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
        internal Boolean mIsSystemUser;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mSecurityUserID;
        internal Boolean mCanPrintDO;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String Username
        {
            get { return mUsername; }
            set { mUsername = value; }
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
        public Int32 RoleID
        {
            get { return mRoleID; }
            set { mRoleID = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mBranchID = value; }
        }
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mDepartmentID = value; }
        }
        public String Address
        {
            get { return mAddress; }
            set { mAddress = value; }
        }
        public String Phone1
        {
            get { return mPhone1; }
            set { mPhone1 = value; }
        }
        public String Phone2
        {
            get { return mPhone2; }
            set { mPhone2 = value; }
        }
        public String Mobile1
        {
            get { return mMobile1; }
            set { mMobile1 = value; }
        }
        public String Email
        {
            get { return mEmail; }
            set { mEmail = value; }
        }
        public String Password
        {
            get { return mPassword; }
            set { mPassword = value; }
        }
        public DateTime ExpirationDate
        {
            get { return mExpirationDate; }
            set { mExpirationDate = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsInactive = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Boolean IsSystemUser
        {
            get { return mIsSystemUser; }
            set { mIsSystemUser = value; }
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
        public Int32 SecurityUserID
        {
            get { return mSecurityUserID; }
            set { mSecurityUserID = value; }
        }
        public Boolean CanPrintDO
        {
            get { return mCanPrintDO; }
            set { mCanPrintDO = value; }
        }
        #endregion
    }

    public partial class CvwShipLinkMelc_User_Link
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
        public List<CVarvwShipLinkMelc_User_Link> lstCVarvwShipLinkMelc_User_Link = new List<CVarvwShipLinkMelc_User_Link>();
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
            lstCVarvwShipLinkMelc_User_Link.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwShipLinkMelc_User_Link";
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
                        CVarvwShipLinkMelc_User_Link ObjCVarvwShipLinkMelc_User_Link = new CVarvwShipLinkMelc_User_Link();
                        ObjCVarvwShipLinkMelc_User_Link.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mRoleID = Convert.ToInt32(dr["RoleID"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mMobile1 = Convert.ToString(dr["Mobile1"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mPassword = Convert.ToString(dr["Password"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mIsSystemUser = Convert.ToBoolean(dr["IsSystemUser"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mSecurityUserID = Convert.ToInt32(dr["SecurityUserID"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mCanPrintDO = Convert.ToBoolean(dr["CanPrintDO"].ToString());
                        lstCVarvwShipLinkMelc_User_Link.Add(ObjCVarvwShipLinkMelc_User_Link);
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
            lstCVarvwShipLinkMelc_User_Link.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwShipLinkMelc_User_Link";
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
                        CVarvwShipLinkMelc_User_Link ObjCVarvwShipLinkMelc_User_Link = new CVarvwShipLinkMelc_User_Link();
                        ObjCVarvwShipLinkMelc_User_Link.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mRoleID = Convert.ToInt32(dr["RoleID"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mMobile1 = Convert.ToString(dr["Mobile1"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mPassword = Convert.ToString(dr["Password"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mIsSystemUser = Convert.ToBoolean(dr["IsSystemUser"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mSecurityUserID = Convert.ToInt32(dr["SecurityUserID"].ToString());
                        ObjCVarvwShipLinkMelc_User_Link.mCanPrintDO = Convert.ToBoolean(dr["CanPrintDO"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwShipLinkMelc_User_Link.Add(ObjCVarvwShipLinkMelc_User_Link);
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
