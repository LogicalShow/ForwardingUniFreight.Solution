using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Administration.Settings.Generated
{
    [Serializable]
    public class CPKvwLicenseExpireDateAlarms_Users
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
    public partial class CVarvwLicenseExpireDateAlarms_Users : CPKvwLicenseExpireDateAlarms_Users
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mUserID;
        internal String mUsername;
        internal String mName;
        internal String mEmail;
        internal Int32 mBranchID;
        internal Int32 mDepartmentID;
        internal String mPhone1;
        internal String mPhone2;
        internal String mMobile1;
        internal Int32 mCustomerID;
        #endregion

        #region "Methods"
        public Int32 UserID
        {
            get { return mUserID; }
            set { mUserID = value; }
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
        public String Email
        {
            get { return mEmail; }
            set { mEmail = value; }
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
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mCustomerID = value; }
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

    public partial class CvwLicenseExpireDateAlarms_Users
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
        public List<CVarvwLicenseExpireDateAlarms_Users> lstCVarvwLicenseExpireDateAlarms_Users = new List<CVarvwLicenseExpireDateAlarms_Users>();
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
            lstCVarvwLicenseExpireDateAlarms_Users.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwLicenseExpireDateAlarms_Users";
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
                        CVarvwLicenseExpireDateAlarms_Users ObjCVarvwLicenseExpireDateAlarms_Users = new CVarvwLicenseExpireDateAlarms_Users();
                        ObjCVarvwLicenseExpireDateAlarms_Users.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mMobile1 = Convert.ToString(dr["Mobile1"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        lstCVarvwLicenseExpireDateAlarms_Users.Add(ObjCVarvwLicenseExpireDateAlarms_Users);
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
            lstCVarvwLicenseExpireDateAlarms_Users.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwLicenseExpireDateAlarms_Users";
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
                        CVarvwLicenseExpireDateAlarms_Users ObjCVarvwLicenseExpireDateAlarms_Users = new CVarvwLicenseExpireDateAlarms_Users();
                        ObjCVarvwLicenseExpireDateAlarms_Users.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mMobile1 = Convert.ToString(dr["Mobile1"].ToString());
                        ObjCVarvwLicenseExpireDateAlarms_Users.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwLicenseExpireDateAlarms_Users.Add(ObjCVarvwLicenseExpireDateAlarms_Users);
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
