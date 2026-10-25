using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.Accounting.MasterData.Generated
{
    [Serializable]
    public class CPKvwA_UserSubAccountsGroupsPrivilege
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
    public partial class CVarvwA_UserSubAccountsGroupsPrivilege : CPKvwA_UserSubAccountsGroupsPrivilege
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mUserID;
        internal Int32 mSubAccountID;
        internal String mUsername;
        internal String mSubAccountName;
        #endregion

        #region "Methods"
        public Int32 UserID
        {
            get { return mUserID; }
            set { mUserID = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mSubAccountID = value; }
        }
        public String Username
        {
            get { return mUsername; }
            set { mUsername = value; }
        }
        public String SubAccountName
        {
            get { return mSubAccountName; }
            set { mSubAccountName = value; }
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

    public partial class CvwA_UserSubAccountsGroupsPrivilege
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
        public List<CVarvwA_UserSubAccountsGroupsPrivilege> lstCVarvwA_UserSubAccountsGroupsPrivilege = new List<CVarvwA_UserSubAccountsGroupsPrivilege>();
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
            lstCVarvwA_UserSubAccountsGroupsPrivilege.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwA_UserSubAccountsGroupsPrivilege";
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
                        CVarvwA_UserSubAccountsGroupsPrivilege ObjCVarvwA_UserSubAccountsGroupsPrivilege = new CVarvwA_UserSubAccountsGroupsPrivilege();
                        ObjCVarvwA_UserSubAccountsGroupsPrivilege.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_UserSubAccountsGroupsPrivilege.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwA_UserSubAccountsGroupsPrivilege.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwA_UserSubAccountsGroupsPrivilege.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwA_UserSubAccountsGroupsPrivilege.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        lstCVarvwA_UserSubAccountsGroupsPrivilege.Add(ObjCVarvwA_UserSubAccountsGroupsPrivilege);
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
            lstCVarvwA_UserSubAccountsGroupsPrivilege.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwA_UserSubAccountsGroupsPrivilege";
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
                        CVarvwA_UserSubAccountsGroupsPrivilege ObjCVarvwA_UserSubAccountsGroupsPrivilege = new CVarvwA_UserSubAccountsGroupsPrivilege();
                        ObjCVarvwA_UserSubAccountsGroupsPrivilege.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_UserSubAccountsGroupsPrivilege.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwA_UserSubAccountsGroupsPrivilege.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwA_UserSubAccountsGroupsPrivilege.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwA_UserSubAccountsGroupsPrivilege.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_UserSubAccountsGroupsPrivilege.Add(ObjCVarvwA_UserSubAccountsGroupsPrivilege);
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
