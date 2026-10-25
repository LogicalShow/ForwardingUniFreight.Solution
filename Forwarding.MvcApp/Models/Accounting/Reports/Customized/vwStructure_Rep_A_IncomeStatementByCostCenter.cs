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
    public partial class CVarvwA_IncomeStatementByCostCenter
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCostCenter_ID;
        internal String mCostCenterName;
        internal Int32 mFlag;
        internal String mType;
        internal Int32 mAccount_ID;
        internal String mAccount_Name;
        internal String mAccount_Number;
        internal Decimal mValue;
        #endregion

        #region "Methods"
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
        public Int32 Flag
        {
            get { return mFlag; }
            set { mFlag = value; }
        }
        public String Type
        {
            get { return mType; }
            set { mType = value; }
        }
        public Int32 Account_ID
        {
            get { return mAccount_ID; }
            set { mAccount_ID = value; }
        }
        public String Account_Name
        {
            get { return mAccount_Name; }
            set { mAccount_Name = value; }
        }
        public String Account_Number
        {
            get { return mAccount_Number; }
            set { mAccount_Number = value; }
        }
        public Decimal Value
        {
            get { return mValue; }
            set { mValue = value; }
        }
       
        #endregion
    }

    public partial class CvwA_IncomeStatementByCostCenter
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
        public List<CVarvwA_IncomeStatementByCostCenter> lstCVarvwA_IncomeStatementByCostCenter = new List<CVarvwA_IncomeStatementByCostCenter>();
        #endregion

        #region "Select Methods"
        public Exception GetList(DateTime pFromDate, DateTime pTo_Date, string pIncomeAccountIDs
            , string pExpensesAccountIDs, string pOtherIncomeAccountIDs, string pOtherExpensesAccountIDs
            ,  string pCostCenter, bool pLanguage,string pBranche_IDs,bool pSeeingInvisibleAccounts,bool pHideProfitLossJV)
        {
            return DataFill(pFromDate, pTo_Date, pIncomeAccountIDs, pExpensesAccountIDs, pOtherIncomeAccountIDs, pOtherExpensesAccountIDs, pCostCenter, pLanguage,pBranche_IDs, pSeeingInvisibleAccounts, pHideProfitLossJV, true);
        }
        public Exception GetListByCurrency(DateTime pFromDate, DateTime pTo_Date, string pIncomeAccountIDs
            , string pExpensesAccountIDs, string pOtherIncomeAccountIDs, string pOtherExpensesAccountIDs
            , string pCostCenter, bool pLanguage, string pCurrencyID,bool pSeeingInvisibleAccounts)
        {
            return DataFill(pFromDate, pTo_Date, pIncomeAccountIDs, pExpensesAccountIDs, pOtherIncomeAccountIDs, pOtherExpensesAccountIDs, pCostCenter, pLanguage, true, pCurrencyID, pSeeingInvisibleAccounts);
        }
        //public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        //{
        //    return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        //}
        private Exception DataFill(DateTime pFromDate, DateTime pTo_Date, string pIncomeAccountIDs
            , string pExpensesAccountIDs, string pOtherIncomeAccountIDs, string pOtherExpensesAccountIDs
            , string pCostCenter, bool pLanguage,string pBranche_IDs,bool pSeeingInvisibleAccounts,bool pHideProfitLossJV, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwA_IncomeStatementByCostCenter.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@IncomeAccountIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@ExpensesAccountIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@OtherIncomeAccountIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@OtherExpensesAccountIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@CostCenterIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@Language", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@BranchIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@SeeingInvisibleAccounts", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@HideProfitLossJV", SqlDbType.Bit));
                    Com.CommandText = "[dbo].Rep_A_IncomeStatementByCostCenter";
                    Com.Parameters[0].Value = pFromDate;
                    Com.Parameters[1].Value = pTo_Date;
                    Com.Parameters[2].Value = pIncomeAccountIDs;
                    Com.Parameters[3].Value = pExpensesAccountIDs;
                    Com.Parameters[4].Value = pOtherIncomeAccountIDs;
                    Com.Parameters[5].Value = pOtherExpensesAccountIDs;
                    Com.Parameters[6].Value = pCostCenter;
                    Com.Parameters[7].Value = pLanguage;
                    Com.Parameters[8].Value = pBranche_IDs;
                    Com.Parameters[9].Value = pSeeingInvisibleAccounts;
                    Com.Parameters[10].Value = pHideProfitLossJV;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwA_IncomeStatementByCostCenter ObjCVarvwA_IncomeStatementByCostCenter = new CVarvwA_IncomeStatementByCostCenter();
                        ObjCVarvwA_IncomeStatementByCostCenter.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwA_IncomeStatementByCostCenter.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwA_IncomeStatementByCostCenter.mFlag = Convert.ToInt32(dr["Flag"].ToString());
                        ObjCVarvwA_IncomeStatementByCostCenter.mType = Convert.ToString(dr["Type"].ToString());
                        ObjCVarvwA_IncomeStatementByCostCenter.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarvwA_IncomeStatementByCostCenter.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarvwA_IncomeStatementByCostCenter.mAccount_Number = Convert.ToString(dr["Account_Number"].ToString());
                        ObjCVarvwA_IncomeStatementByCostCenter.mValue = Convert.ToDecimal(dr["Value"].ToString());
                        lstCVarvwA_IncomeStatementByCostCenter.Add(ObjCVarvwA_IncomeStatementByCostCenter);
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

        private Exception DataFill(DateTime pFromDate, DateTime pTo_Date, string pIncomeAccountIDs
           , string pExpensesAccountIDs, string pOtherIncomeAccountIDs, string pOtherExpensesAccountIDs, string pCostCenter, bool pLanguage, Boolean IsList,string pCurrencyID,bool pSeeingInvisibleAccounts)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwA_IncomeStatementByCostCenter.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@IncomeAccountIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@ExpensesAccountIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@OtherIncomeAccountIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@OtherExpensesAccountIDs", SqlDbType.NVarChar));
                    //Com.Parameters.Add(new SqlParameter("@BranchIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@CostCenterIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@Language", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@SeeingInvisibleAccounts", SqlDbType.Bit));
                    Com.CommandText = "[dbo].Rep_A_IncomeStatementByCostCenterByCurrency";
                    Com.Parameters[0].Value = pFromDate;
                    Com.Parameters[1].Value = pTo_Date;
                    Com.Parameters[2].Value = pIncomeAccountIDs;
                    Com.Parameters[3].Value = pExpensesAccountIDs;
                    Com.Parameters[4].Value = pOtherIncomeAccountIDs;
                    Com.Parameters[5].Value = pOtherExpensesAccountIDs;
                    //Com.Parameters[6].Value = pBranchs;
                    Com.Parameters[6].Value = pCostCenter;
                    Com.Parameters[7].Value = pLanguage;
                    Com.Parameters[8].Value = Convert.ToInt32(pCurrencyID);
                    Com.Parameters[9].Value = pSeeingInvisibleAccounts;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwA_IncomeStatementByCostCenter ObjCVarvwA_IncomeStatementByCostCenter = new CVarvwA_IncomeStatementByCostCenter();
                        ObjCVarvwA_IncomeStatementByCostCenter.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwA_IncomeStatementByCostCenter.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwA_IncomeStatementByCostCenter.mFlag = Convert.ToInt32(dr["Flag"].ToString());
                        ObjCVarvwA_IncomeStatementByCostCenter.mType = Convert.ToString(dr["Type"].ToString());
                        ObjCVarvwA_IncomeStatementByCostCenter.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarvwA_IncomeStatementByCostCenter.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarvwA_IncomeStatementByCostCenter.mAccount_Number = Convert.ToString(dr["Account_Number"].ToString());
                        ObjCVarvwA_IncomeStatementByCostCenter.mValue = Convert.ToDecimal(dr["Value"].ToString());
                        lstCVarvwA_IncomeStatementByCostCenter.Add(ObjCVarvwA_IncomeStatementByCostCenter);
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