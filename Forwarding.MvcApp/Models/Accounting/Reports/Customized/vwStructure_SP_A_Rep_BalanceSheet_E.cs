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
    public partial class CVarvwStructure_SP_A_Rep_BalanceSheet_E
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mAccount_ID;
        internal String mAccount_Number;
        internal String mAccount_Name;
        internal Int32 mParent_ID;
        internal Int32 mAccLevel;
        internal Boolean mIsMain;
        internal Decimal mFinalBalance;
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
        public Decimal FinalBalance
        {
            get { return mFinalBalance; }
            set { mFinalBalance = value; }
        }
        #endregion
    }

    public partial class CvwStructure_SP_A_Rep_BalanceSheet_E
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
        public List<CVarvwStructure_SP_A_Rep_BalanceSheet_E> lstCVarvwStructure_SP_A_Rep_BalanceSheet_E = new List<CVarvwStructure_SP_A_Rep_BalanceSheet_E>();
        #endregion

        #region "Select Methods"
        public Exception GetList(DateTime pTo_Date, Int32 pAccLevel, bool pSeeingInvisibleAccounts, string pBranch_IDs)
        {
            return DataFill(pTo_Date, pAccLevel, pSeeingInvisibleAccounts, pBranch_IDs, true);
        }
        
        public Exception GetListByCurrency(DateTime pTo_Date, Int32 pAccLevel, bool pSeeingInvisibleAccounts, string pCurrency)
        {
            return DataFillByCurrency(pTo_Date, pAccLevel, pSeeingInvisibleAccounts, true, pCurrency);
        }
        private Exception DataFill(DateTime pTo_Date, Int32 pAccLevel, bool pSeeingInvisibleAccounts,string pBranch_IDs, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_SP_A_Rep_BalanceSheet_E.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@To_Date", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@Acc_Level", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@SeeingInvisibleAccounts", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@Branch_IDs", SqlDbType.NVarChar));
                    //Com.CommandText = "ERP_Web.[dbo].SP_A_Rep_BalanceSheet_E";
                    Com.CommandText = "[dbo].SP_A_Rep_BalanceSheet_E";
                    Com.Parameters[0].Value = pTo_Date;
                    Com.Parameters[1].Value = pAccLevel;
                    Com.Parameters[2].Value = pSeeingInvisibleAccounts;
                    Com.Parameters[3].Value = pBranch_IDs;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructure_SP_A_Rep_BalanceSheet_E ObjCVarvwStructure_SP_A_Rep_BalanceSheet_E = new CVarvwStructure_SP_A_Rep_BalanceSheet_E();
                        ObjCVarvwStructure_SP_A_Rep_BalanceSheet_E.mAccount_ID = dr["Account_ID"].ToString() == "" ? 0 : Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_BalanceSheet_E.mAccount_Number = Convert.ToString(dr["Account_Number"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_BalanceSheet_E.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_BalanceSheet_E.mParent_ID = dr["Parent_ID"].ToString() == "" ? 0 : Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_BalanceSheet_E.mAccLevel = dr["AccLevel"].ToString() == "" ? 0 : Convert.ToInt32(dr["AccLevel"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_BalanceSheet_E.mIsMain = dr["IsMain"].ToString() == "" ? false : Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_BalanceSheet_E.mFinalBalance = dr["FinalBalance"].ToString() == "" ? 0 : Convert.ToDecimal(dr["FinalBalance"].ToString());
                        lstCVarvwStructure_SP_A_Rep_BalanceSheet_E.Add(ObjCVarvwStructure_SP_A_Rep_BalanceSheet_E);
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
        private Exception DataFillByCurrency(DateTime pTo_Date, Int32 pAccLevel, bool pSeeingInvisibleAccounts, Boolean IsList, string pCurrencyID)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_SP_A_Rep_BalanceSheet_E.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@To_Date", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@Acc_Level", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@SeeingInvisibleAccounts", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                    //Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
                    //Com.Parameters.Add(new SqlParameter("@CostCenterID", SqlDbType.Int));
                    //Com.CommandText = "ERP_Web.[dbo].SP_A_Rep_BalanceSheet_E";
                    Com.CommandText = "[dbo].SP_A_Rep_BalanceSheet_EByCurrency";
                    Com.Parameters[0].Value = pTo_Date;
                    Com.Parameters[1].Value = pAccLevel;
                    Com.Parameters[2].Value = pSeeingInvisibleAccounts;
                    Com.Parameters[3].Value = Convert.ToInt32(pCurrencyID);
                    //Com.Parameters[4].Value = Convert.ToInt32(pBranchID);
                    //Com.Parameters[5].Value = Convert.ToInt32(pCostCenterID);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructure_SP_A_Rep_BalanceSheet_E ObjCVarvwStructure_SP_A_Rep_BalanceSheet_E = new CVarvwStructure_SP_A_Rep_BalanceSheet_E();
                        ObjCVarvwStructure_SP_A_Rep_BalanceSheet_E.mAccount_ID = dr["Account_ID"].ToString() == "" ? 0 : Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_BalanceSheet_E.mAccount_Number = Convert.ToString(dr["Account_Number"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_BalanceSheet_E.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_BalanceSheet_E.mParent_ID = dr["Parent_ID"].ToString() == "" ? 0 : Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_BalanceSheet_E.mAccLevel = dr["AccLevel"].ToString() == "" ? 0 : Convert.ToInt32(dr["AccLevel"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_BalanceSheet_E.mIsMain = dr["IsMain"].ToString() == "" ? false : Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarvwStructure_SP_A_Rep_BalanceSheet_E.mFinalBalance = dr["FinalBalance"].ToString() == "" ? 0 : Convert.ToDecimal(dr["FinalBalance"].ToString());
                        lstCVarvwStructure_SP_A_Rep_BalanceSheet_E.Add(ObjCVarvwStructure_SP_A_Rep_BalanceSheet_E);
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