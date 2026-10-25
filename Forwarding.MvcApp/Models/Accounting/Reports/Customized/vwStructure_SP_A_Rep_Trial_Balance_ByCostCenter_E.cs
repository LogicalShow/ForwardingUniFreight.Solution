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
    public partial class CVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mAccount_ID;
        internal String mAccount_Number;
        internal String mAccount_Name;
        internal Int32 mParent_ID;
        internal Int32 mAccLevel;
        internal Boolean mIsMain;
        internal Decimal mTotalDbt;
        internal Decimal mTotalCrdt;
        internal Decimal mOpenningDbt;
        internal Decimal mOpenningCrdt;
        internal Int32 mCostCenter_ID;
        internal String mCostCenterName;
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

    public partial class CvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E
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
        public List<CVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E> lstCVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E = new List<CVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string pAccount_FirstChar, string pAccount_IDs, string pJV_IDs, DateTime pFromDate, DateTime pToDate, Int32 pAcc_level, bool pIsLeafNodes
            , Int32 pOrdering, string pCostCenter_IDs, string pBranch_IDs)
        {
            return DataFill(pAccount_FirstChar, pAccount_IDs, pJV_IDs, pFromDate, pToDate, pAcc_level, pIsLeafNodes, pOrdering, pCostCenter_IDs, pBranch_IDs, true);
        }
        private Exception DataFill(string pAccount_FirstChar, string pAccount_IDs, string pJV_IDs, DateTime pFromDate, DateTime pToDate, Int32 pAcc_level, bool pIsLeafNodes
            , Int32 pOrdering, string pCostCenter_IDs, string pBranch_IDs, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    //Com.CommandText = "ERP_Web.[dbo].SP_A_Rep_Trial_Balance_ByCostCenter_E";
                    Com.CommandText = "[dbo].SP_A_Rep_Trial_Balance_ByCostCenter_E";
                    Com.Parameters.Add(new SqlParameter("@Account_FirstChar", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@Account_IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@JV_IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@Acc_level", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@IsLeafNodes", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@Ordering", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@CostCenter_IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@Branch_IDs", SqlDbType.NVarChar));
                    Com.Parameters[0].Value = pAccount_FirstChar;
                    Com.Parameters[1].Value = pAccount_IDs;
                    Com.Parameters[2].Value = pJV_IDs;
                    Com.Parameters[3].Value = pFromDate;
                    Com.Parameters[4].Value = pToDate;
                    Com.Parameters[5].Value = pAcc_level;
                    Com.Parameters[6].Value = pIsLeafNodes;
                    Com.Parameters[7].Value = pOrdering;
                    Com.Parameters[8].Value = pCostCenter_IDs;
                    Com.Parameters[9].Value = pBranch_IDs;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E ObjCVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E = new CVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E();
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E.mAccount_Number = Convert.ToString(dr["Account_Number"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E.mParent_ID = Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E.mAccLevel = Convert.ToInt32(dr["AccLevel"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E.mTotalDbt = Convert.ToDecimal(dr["TotalDbt"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E.mTotalCrdt = Convert.ToDecimal(dr["TotalCrdt"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E.mOpenningDbt = Convert.ToDecimal(dr["OpenningDbt"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E.mOpenningCrdt = Convert.ToDecimal(dr["OpenningCrdt"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E.mCostCenter_ID = dr["CostCenter_ID"].ToString() == "" ? 0 : Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        lstCVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E.Add(ObjCVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E);
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