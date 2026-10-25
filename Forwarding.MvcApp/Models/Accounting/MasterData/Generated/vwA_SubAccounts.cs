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
    public class CPKvwA_SubAccounts
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
    public partial class CVarvwA_SubAccounts : CPKvwA_SubAccounts
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mSubAccount_Number;
        internal String mCode;
        internal String mName;
        internal String mEnName;
        internal Int32 mParent_ID;
        internal Boolean mIsMain;
        internal Int32 mSubAccLevel;
        internal String mRealSubAccountCode;
        internal Decimal mBalance;
        internal Int32 mUser_ID;
        #endregion

        #region "Methods"
        public String SubAccount_Number
        {
            get { return mSubAccount_Number; }
            set { mSubAccount_Number = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public String EnName
        {
            get { return mEnName; }
            set { mEnName = value; }
        }
        public Int32 Parent_ID
        {
            get { return mParent_ID; }
            set { mParent_ID = value; }
        }
        public Boolean IsMain
        {
            get { return mIsMain; }
            set { mIsMain = value; }
        }
        public Int32 SubAccLevel
        {
            get { return mSubAccLevel; }
            set { mSubAccLevel = value; }
        }
        public String RealSubAccountCode
        {
            get { return mRealSubAccountCode; }
            set { mRealSubAccountCode = value; }
        }
        public Decimal Balance
        {
            get { return mBalance; }
            set { mBalance = value; }
        }
        public Int32 User_ID
        {
            get { return mUser_ID; }
            set { mUser_ID = value; }
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

    public partial class CvwA_SubAccounts
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
        public List<CVarvwA_SubAccounts> lstCVarvwA_SubAccounts = new List<CVarvwA_SubAccounts>();
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
            lstCVarvwA_SubAccounts.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwA_SubAccounts";
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
                        CVarvwA_SubAccounts ObjCVarvwA_SubAccounts = new CVarvwA_SubAccounts();
                        ObjCVarvwA_SubAccounts.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_SubAccounts.mSubAccount_Number = Convert.ToString(dr["SubAccount_Number"].ToString());
                        ObjCVarvwA_SubAccounts.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwA_SubAccounts.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwA_SubAccounts.mEnName = Convert.ToString(dr["EnName"].ToString());
                        ObjCVarvwA_SubAccounts.mParent_ID = Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarvwA_SubAccounts.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarvwA_SubAccounts.mSubAccLevel = Convert.ToInt32(dr["SubAccLevel"].ToString());
                        ObjCVarvwA_SubAccounts.mRealSubAccountCode = Convert.ToString(dr["RealSubAccountCode"].ToString());
                        ObjCVarvwA_SubAccounts.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        ObjCVarvwA_SubAccounts.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        lstCVarvwA_SubAccounts.Add(ObjCVarvwA_SubAccounts);
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
            lstCVarvwA_SubAccounts.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwA_SubAccounts";
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
                        CVarvwA_SubAccounts ObjCVarvwA_SubAccounts = new CVarvwA_SubAccounts();
                        ObjCVarvwA_SubAccounts.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_SubAccounts.mSubAccount_Number = Convert.ToString(dr["SubAccount_Number"].ToString());
                        ObjCVarvwA_SubAccounts.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwA_SubAccounts.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwA_SubAccounts.mEnName = Convert.ToString(dr["EnName"].ToString());
                        ObjCVarvwA_SubAccounts.mParent_ID = Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarvwA_SubAccounts.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarvwA_SubAccounts.mSubAccLevel = Convert.ToInt32(dr["SubAccLevel"].ToString());
                        ObjCVarvwA_SubAccounts.mRealSubAccountCode = Convert.ToString(dr["RealSubAccountCode"].ToString());
                        ObjCVarvwA_SubAccounts.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        ObjCVarvwA_SubAccounts.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_SubAccounts.Add(ObjCVarvwA_SubAccounts);
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
