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
    public partial class CVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mSubAccount_ID;
        internal String mSubAccount_Number;
        internal String mSubAccount_Name;
        internal Int32 mParent_ID;
        internal Int32 mSubAccLevel;
        internal Boolean mIsMain;
        internal Decimal mTotalDbt;
        internal Decimal mTotalCrdt;
        internal Decimal mOpenningDbt;
        internal Decimal mOpenningCrdt;
        internal Int32 mCostCenter_ID;
        internal String mCostCenterName;
        #endregion

        #region "Methods"
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
        public Int32 SubAccLevel
        {
            get { return mSubAccLevel; }
            set { mSubAccLevel = value; }
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
        public Int32 CostCenter_ID
        {
            get { return mCostCenter_ID; }
            set { mCostCenter_ID = value; }
        }
        public String CostCenterName
        {
            get { return mCostCenterName; }
            set { mCostCenterName = value; }
        }
        #endregion
    }

    public partial class CvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E
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
        public List<CVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E> lstCVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E = new List<CVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string pSubAccount_IDs, string pAccount_IDs, string pJV_IDs, DateTime pFromDate, DateTime pToDate, Int32 pOrdering
            , string pCostCenter_IDs, string pBranch_IDs)
        {
            return DataFill(pSubAccount_IDs, pAccount_IDs, pJV_IDs, pFromDate, pToDate, pOrdering, pCostCenter_IDs, pBranch_IDs, true);
        }
        private Exception DataFill(string pSubAccount_IDs, string pAccount_IDs, string pJV_IDs, DateTime pFromDate, DateTime pToDate, Int32 pOrdering
            , string pCostCenter_IDs, string pBranch_IDs, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    //Com.CommandText = "ERP_Web.[dbo].Rep_A_SubAccounts_TrialBalance_ByCostCenter_E";
                    Com.CommandText = "[dbo].Rep_A_SubAccounts_TrialBalance_ByCostCenter_E";
                    Com.Parameters.Add(new SqlParameter("@SubAccount_IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@AccountIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@JV_IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@Ordering", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@CostCenter_IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@Branch_IDs", SqlDbType.NVarChar));
                    Com.Parameters[0].Value = pSubAccount_IDs;
                    Com.Parameters[1].Value = pAccount_IDs;
                    Com.Parameters[2].Value = pJV_IDs;
                    Com.Parameters[3].Value = pFromDate;
                    Com.Parameters[4].Value = pToDate;
                    Com.Parameters[5].Value = pOrdering;
                    Com.Parameters[6].Value = pCostCenter_IDs;
                    Com.Parameters[7].Value = pBranch_IDs;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E ObjCVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E = new CVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E();
                        ObjCVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E.mSubAccount_ID = Convert.ToInt32(dr["SubAccount_ID"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E.mSubAccount_Number = Convert.ToString(dr["SubAccount_Number"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E.mSubAccount_Name = Convert.ToString(dr["SubAccount_Name"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E.mParent_ID = Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E.mSubAccLevel = Convert.ToInt32(dr["SubAccLevel"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E.mTotalDbt = Convert.ToDecimal(dr["TotalDbt"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E.mTotalCrdt = Convert.ToDecimal(dr["TotalCrdt"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E.mOpenningDbt = Convert.ToDecimal(dr["OpenningDbt"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E.mOpenningCrdt = Convert.ToDecimal(dr["OpenningCrdt"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E.mCostCenter_ID = dr["CostCenter_ID"].ToString() == "" ? 0 : Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        lstCVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E.Add(ObjCVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E);
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