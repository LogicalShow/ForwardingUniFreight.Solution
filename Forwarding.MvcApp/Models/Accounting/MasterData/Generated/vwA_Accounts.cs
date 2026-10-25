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
    public class CPKvwA_Accounts
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
    public partial class CVarvwA_Accounts : CPKvwA_Accounts
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal String mAccount_Number;
        internal String mCode;
        internal String mCodeM;
        internal String mAccount_Name;
        internal String mName;
        internal String mAccount_EnName;
        internal String mEnName;
        internal Int32 mParent_ID;
        internal Boolean mIsMain;
        internal Int32 mAccLevel;
        internal String mRealAccountCode;
        internal Boolean mIsSub;
        internal Boolean mIsVisible;
        internal Int32 mCostCenter_ID;
        internal Decimal mBalance;
        internal Int32 mUser_ID;
        internal String mCostCenterCalcType;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String Account_Number
        {
            get { return mAccount_Number; }
            set { mAccount_Number = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String CodeM
        {
            get { return mCodeM; }
            set { mCodeM = value; }
        }
        public String Account_Name
        {
            get { return mAccount_Name; }
            set { mAccount_Name = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public String Account_EnName
        {
            get { return mAccount_EnName; }
            set { mAccount_EnName = value; }
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
        public Int32 AccLevel
        {
            get { return mAccLevel; }
            set { mAccLevel = value; }
        }
        public String RealAccountCode
        {
            get { return mRealAccountCode; }
            set { mRealAccountCode = value; }
        }
        public Boolean IsSub
        {
            get { return mIsSub; }
            set { mIsSub = value; }
        }
        public Boolean IsVisible
        {
            get { return mIsVisible; }
            set { mIsVisible = value; }
        }
        public Int32 CostCenter_ID
        {
            get { return mCostCenter_ID; }
            set { mCostCenter_ID = value; }
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
        public String CostCenterCalcType
        {
            get { return mCostCenterCalcType; }
            set { mCostCenterCalcType = value; }
        }
        #endregion
    }

    public partial class CvwA_Accounts
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
        public List<CVarvwA_Accounts> lstCVarvwA_Accounts = new List<CVarvwA_Accounts>();
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
            lstCVarvwA_Accounts.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwA_Accounts";
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
                        CVarvwA_Accounts ObjCVarvwA_Accounts = new CVarvwA_Accounts();
                        ObjCVarvwA_Accounts.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_Accounts.mAccount_Number = Convert.ToString(dr["Account_Number"].ToString());
                        ObjCVarvwA_Accounts.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwA_Accounts.mCodeM = Convert.ToString(dr["CodeM"].ToString());
                        ObjCVarvwA_Accounts.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarvwA_Accounts.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwA_Accounts.mAccount_EnName = Convert.ToString(dr["Account_EnName"].ToString());
                        ObjCVarvwA_Accounts.mEnName = Convert.ToString(dr["EnName"].ToString());
                        ObjCVarvwA_Accounts.mParent_ID = Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarvwA_Accounts.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarvwA_Accounts.mAccLevel = Convert.ToInt32(dr["AccLevel"].ToString());
                        ObjCVarvwA_Accounts.mRealAccountCode = Convert.ToString(dr["RealAccountCode"].ToString());
                        ObjCVarvwA_Accounts.mIsSub = Convert.ToBoolean(dr["IsSub"].ToString());
                        ObjCVarvwA_Accounts.mIsVisible = Convert.ToBoolean(dr["IsVisible"].ToString());
                        ObjCVarvwA_Accounts.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwA_Accounts.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        ObjCVarvwA_Accounts.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarvwA_Accounts.mCostCenterCalcType = Convert.ToString(dr["CostCenterCalcType"].ToString());
                        lstCVarvwA_Accounts.Add(ObjCVarvwA_Accounts);
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
            lstCVarvwA_Accounts.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwA_Accounts";
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
                        CVarvwA_Accounts ObjCVarvwA_Accounts = new CVarvwA_Accounts();
                        ObjCVarvwA_Accounts.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_Accounts.mAccount_Number = Convert.ToString(dr["Account_Number"].ToString());
                        ObjCVarvwA_Accounts.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwA_Accounts.mCodeM = Convert.ToString(dr["CodeM"].ToString());
                        ObjCVarvwA_Accounts.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarvwA_Accounts.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwA_Accounts.mAccount_EnName = Convert.ToString(dr["Account_EnName"].ToString());
                        ObjCVarvwA_Accounts.mEnName = Convert.ToString(dr["EnName"].ToString());
                        ObjCVarvwA_Accounts.mParent_ID = Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarvwA_Accounts.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarvwA_Accounts.mAccLevel = Convert.ToInt32(dr["AccLevel"].ToString());
                        ObjCVarvwA_Accounts.mRealAccountCode = Convert.ToString(dr["RealAccountCode"].ToString());
                        ObjCVarvwA_Accounts.mIsSub = Convert.ToBoolean(dr["IsSub"].ToString());
                        ObjCVarvwA_Accounts.mIsVisible = Convert.ToBoolean(dr["IsVisible"].ToString());
                        ObjCVarvwA_Accounts.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwA_Accounts.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        ObjCVarvwA_Accounts.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarvwA_Accounts.mCostCenterCalcType = Convert.ToString(dr["CostCenterCalcType"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_Accounts.Add(ObjCVarvwA_Accounts);
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
