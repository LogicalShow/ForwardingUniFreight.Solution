using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Accounting.Reports.Customized
{
    [Serializable]
    public partial class CVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mAccount_ID;
        internal String mAccount_Number;
        internal String mAccount_Name;
        internal Int32 mSubAccount_ID;
        internal String mSubAccount_Number;
        internal String mSubAccount_Name;
        internal Int32 mParent_ID;
        internal Int32 mAccLevel;
        internal Boolean mIsMain;
        internal Decimal mTotalDbt;
        internal Decimal mTotalCrdt;
        internal Decimal mOpenningDbt;
        internal Decimal mOpenningCrdt;
        #endregion

        #region "Methods"
        public Int32 Account_ID
        {
            get { return mAccount_ID; }
            set { mAccount_ID = value; }
        }
        public String Account_Number
        {
            get { return mAccount_Number; }
            set { mAccount_Number = value; }
        }
        public String Account_Name
        {
            get { return mAccount_Name; }
            set { mAccount_Name = value; }
        }
        public Int32 SubAccount_ID
        {
            get { return mSubAccount_ID; }
            set { mSubAccount_ID = value; }
        }
        public String SubAccount_Number
        {
            get { return mSubAccount_Number; }
            set { mSubAccount_Number = value; }
        }
        public String SubAccount_Name
        {
            get { return mSubAccount_Name; }
            set { mSubAccount_Name = value; }
        }
        public Int32 Parent_ID
        {
            get { return mParent_ID; }
            set { mParent_ID = value; }
        }
        public Int32 AccLevel
        {
            get { return mAccLevel; }
            set { mAccLevel = value; }
        }
        public Boolean IsMain
        {
            get { return mIsMain; }
            set { mIsMain = value; }
        }
        public Decimal TotalDbt
        {
            get { return mTotalDbt; }
            set { mTotalDbt = value; }
        }
        public Decimal TotalCrdt
        {
            get { return mTotalCrdt; }
            set { mTotalCrdt = value; }
        }
        public Decimal OpenningDbt
        {
            get { return mOpenningDbt; }
            set { mOpenningDbt = value; }
        }
        public Decimal OpenningCrdt
        {
            get { return mOpenningCrdt; }
            set { mOpenningCrdt = value; }
        }
        #endregion
    }

    public partial class CvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts
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
        public List<CVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts> lstCVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts = new List<CVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string pAccount_FirstChar, string pAccount_IDs, string pJV_IDs, DateTime pFromDate, DateTime pToDate, Int32 pAcc_level, bool pIsLeafNodes, Int32 pOrdering)
        {
            return DataFill(pAccount_FirstChar, pAccount_IDs, pJV_IDs, pFromDate, pToDate, pAcc_level, pIsLeafNodes, pOrdering, true);
        }
        private Exception DataFill(string pAccount_FirstChar, string pAccount_IDs, string pJV_IDs, DateTime pFromDate, DateTime pToDate, Int32 pAcc_level, bool pIsLeafNodes, Int32 pOrdering, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    //Com.CommandText = "ERP_Web.[dbo].SP_A_Rep_Trial_Balance_E_WithSubAccounts";
                    Com.CommandText = "[dbo].SP_A_Rep_Trial_Balance_E_WithSubAccounts";
                    Com.Parameters.Add(new SqlParameter("@Account_FirstChar", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@Account_IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@JV_IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@Acc_level", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@IsLeafNodes", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@Ordering", SqlDbType.Int));
                    Com.Parameters[0].Value = pAccount_FirstChar;
                    Com.Parameters[1].Value = pAccount_IDs;
                    Com.Parameters[2].Value = pJV_IDs;
                    Com.Parameters[3].Value = pFromDate;
                    Com.Parameters[4].Value = pToDate;
                    Com.Parameters[5].Value = pAcc_level;
                    Com.Parameters[6].Value = pIsLeafNodes;
                    Com.Parameters[7].Value = pOrdering;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 10000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts ObjCVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts = new CVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts();
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts.mAccount_Number = Convert.ToString(dr["Account_Number"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts.mSubAccount_ID = Convert.ToInt32(dr["SubAccount_ID"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts.mSubAccount_Number = Convert.ToString(dr["SubAccount_Number"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts.mSubAccount_Name = Convert.ToString(dr["SubAccount_Name"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts.mParent_ID = Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts.mAccLevel = Convert.ToInt32(dr["AccLevel"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts.mTotalDbt = Convert.ToDecimal(dr["TotalDbt"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts.mTotalCrdt = Convert.ToDecimal(dr["TotalCrdt"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts.mOpenningDbt = Convert.ToDecimal(dr["OpenningDbt"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts.mOpenningCrdt = Convert.ToDecimal(dr["OpenningCrdt"].ToString());
                        lstCVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts.Add(ObjCVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts);
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