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
    public class CPKwebpages_Membership
    {
        #region "variables"
        private Int32 mUserId;
        #endregion

        #region "Methods"
        public Int32 UserId
        {
            get { return mUserId; }
            set { mUserId = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarwebpages_Membership : CPKwebpages_Membership
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal DateTime mCreateDate;
        internal String mConfirmationToken;
        internal Boolean mIsConfirmed;
        internal DateTime mLastPasswordFailureDate;
        internal Int32 mPasswordFailuresSinceLastSuccess;
        internal String mPassword;
        internal DateTime mPasswordChangedDate;
        internal String mPasswordSalt;
        internal String mPasswordVerificationToken;
        internal DateTime mPasswordVerificationTokenExpirationDate;
        #endregion

        #region "Methods"
        public DateTime CreateDate
        {
            get { return mCreateDate; }
            set { mCreateDate = value; }
        }
        public String ConfirmationToken
        {
            get { return mConfirmationToken; }
            set { mConfirmationToken = value; }
        }
        public Boolean IsConfirmed
        {
            get { return mIsConfirmed; }
            set { mIsConfirmed = value; }
        }
        public DateTime LastPasswordFailureDate
        {
            get { return mLastPasswordFailureDate; }
            set { mLastPasswordFailureDate = value; }
        }
        public Int32 PasswordFailuresSinceLastSuccess
        {
            get { return mPasswordFailuresSinceLastSuccess; }
            set { mPasswordFailuresSinceLastSuccess = value; }
        }
        public String Password
        {
            get { return mPassword; }
            set { mPassword = value; }
        }
        public DateTime PasswordChangedDate
        {
            get { return mPasswordChangedDate; }
            set { mPasswordChangedDate = value; }
        }
        public String PasswordSalt
        {
            get { return mPasswordSalt; }
            set { mPasswordSalt = value; }
        }
        public String PasswordVerificationToken
        {
            get { return mPasswordVerificationToken; }
            set { mPasswordVerificationToken = value; }
        }
        public DateTime PasswordVerificationTokenExpirationDate
        {
            get { return mPasswordVerificationTokenExpirationDate; }
            set { mPasswordVerificationTokenExpirationDate = value; }
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

    public partial class Cwebpages_Membership
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
        public List<CVarwebpages_Membership> lstCVarwebpages_Membership = new List<CVarwebpages_Membership>();
        public List<CPKwebpages_Membership> lstDeletedCPKwebpages_Membership = new List<CPKwebpages_Membership>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string WhereClause)
        {
            return DataFill(WhereClause, true);
        }
        public Exception GetItem(Int32 UserId)
        {
            return DataFill(Convert.ToString(UserId), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarwebpages_Membership.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListwebpages_Membership";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemwebpages_Membership";
                    Com.Parameters.Add(new SqlParameter("@UserId", SqlDbType.Int));
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
                        CVarwebpages_Membership ObjCVarwebpages_Membership = new CVarwebpages_Membership();
                        ObjCVarwebpages_Membership.UserId = Convert.ToInt32(dr["UserId"].ToString());
                        ObjCVarwebpages_Membership.mCreateDate = Convert.ToDateTime(dr["CreateDate"].ToString());
                        ObjCVarwebpages_Membership.mConfirmationToken = Convert.ToString(dr["ConfirmationToken"].ToString());
                        ObjCVarwebpages_Membership.mIsConfirmed = Convert.ToBoolean(dr["IsConfirmed"].ToString());
                        ObjCVarwebpages_Membership.mLastPasswordFailureDate = Convert.ToDateTime(dr["LastPasswordFailureDate"].ToString());
                        ObjCVarwebpages_Membership.mPasswordFailuresSinceLastSuccess = Convert.ToInt32(dr["PasswordFailuresSinceLastSuccess"].ToString());
                        ObjCVarwebpages_Membership.mPassword = Convert.ToString(dr["Password"].ToString());
                        ObjCVarwebpages_Membership.mPasswordChangedDate = Convert.ToDateTime(dr["PasswordChangedDate"].ToString());
                        ObjCVarwebpages_Membership.mPasswordSalt = Convert.ToString(dr["PasswordSalt"].ToString());
                        ObjCVarwebpages_Membership.mPasswordVerificationToken = Convert.ToString(dr["PasswordVerificationToken"].ToString());
                        ObjCVarwebpages_Membership.mPasswordVerificationTokenExpirationDate = Convert.ToDateTime(dr["PasswordVerificationTokenExpirationDate"].ToString());
                        lstCVarwebpages_Membership.Add(ObjCVarwebpages_Membership);
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
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListwebpages_Membership";
                else
                    Com.CommandText = "[dbo].UpdateListwebpages_Membership";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
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
        public Exception DeleteItem(List<CPKwebpages_Membership> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemwebpages_Membership";
                Com.Parameters.Add(new SqlParameter("@UserId", SqlDbType.Int));
                foreach (CPKwebpages_Membership ObjCPKwebpages_Membership in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKwebpages_Membership.UserId);
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
    }
}
