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
    public partial class CVarvwStructure_Rep_A_IncomeStatement
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mFlag;
        internal String mType;
        internal Int32 mAccount_ID;
        internal String mAccount_Name;
        internal String mAccount_Number;
        internal Decimal mValue;
        #endregion

        #region "Methods"
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

    public partial class CvwStructure_Rep_A_IncomeStatement
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
        public List<CVarvwStructure_Rep_A_IncomeStatement> lstCVarvwStructure_Rep_A_IncomeStatement = new List<CVarvwStructure_Rep_A_IncomeStatement>();
        #endregion

        #region "Select Methods"
        public Exception GetList(DateTime pFromDate, DateTime pTo_Date, string pIncomeAccountIDs
            , string pExpensesAccountIDs, string pOtherIncomeAccountIDs, string pOtherExpensesAccountIDs
            , bool pLanguage,string pBranche_IDs,bool pSeeingInvisibleAccounts, bool pHideProfitLossJV)
        {
            return DataFill(pFromDate, pTo_Date, pIncomeAccountIDs, pExpensesAccountIDs, pOtherIncomeAccountIDs, pOtherExpensesAccountIDs, pLanguage,pBranche_IDs, pSeeingInvisibleAccounts, pHideProfitLossJV, true);
        }
        public Exception GetListByCurrency(DateTime pFromDate, DateTime pTo_Date, string pIncomeAccountIDs
           , string pExpensesAccountIDs, string pOtherIncomeAccountIDs, string pOtherExpensesAccountIDs
            , bool pLanguage, string pCurrencyID,bool pSeeingInvisibleAccounts)
        {
            return DataFill(pFromDate, pTo_Date, pIncomeAccountIDs, pExpensesAccountIDs, pOtherIncomeAccountIDs, pOtherExpensesAccountIDs, pLanguage, true,pCurrencyID, pSeeingInvisibleAccounts);
        }
        private Exception DataFill(DateTime pFromDate, DateTime pTo_Date, string pIncomeAccountIDs, string pExpensesAccountIDs, string pOtherIncomeAccountIDs,
            string pOtherExpensesAccountIDs,  bool pLanguage, string pBranche_IDs,bool pSeeingInvisibleAccounts,bool pHideProfitLossJV, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_Rep_A_IncomeStatement.Clear();

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
                    Com.Parameters.Add(new SqlParameter("@Language", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@BranchIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@SeeingInvisibleAccounts", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@HideProfitLossJV", SqlDbType.Bit));
                    //Com.CommandText = "ERP_Web.[dbo].Rep_A_IncomeStatement";
                    Com.CommandText = "[dbo].Rep_A_IncomeStatement";
                    Com.Parameters[0].Value = pFromDate;
                    Com.Parameters[1].Value = pTo_Date;
                    Com.Parameters[2].Value = pIncomeAccountIDs;
                    Com.Parameters[3].Value = pExpensesAccountIDs;
                    Com.Parameters[4].Value = pOtherIncomeAccountIDs;
                    Com.Parameters[5].Value = pOtherExpensesAccountIDs;
                    Com.Parameters[6].Value = pLanguage;
                    Com.Parameters[7].Value = pBranche_IDs;
                    Com.Parameters[8].Value = pSeeingInvisibleAccounts;
                    Com.Parameters[9].Value = pHideProfitLossJV;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructure_Rep_A_IncomeStatement ObjCVarvwStructure_Rep_A_IncomeStatement = new CVarvwStructure_Rep_A_IncomeStatement();
                        ObjCVarvwStructure_Rep_A_IncomeStatement.mFlag = Convert.ToInt32(dr["Flag"].ToString());
                        ObjCVarvwStructure_Rep_A_IncomeStatement.mType = Convert.ToString(dr["Type"].ToString());
                        ObjCVarvwStructure_Rep_A_IncomeStatement.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarvwStructure_Rep_A_IncomeStatement.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarvwStructure_Rep_A_IncomeStatement.mAccount_Number = Convert.ToString(dr["Account_Number"].ToString());
                        ObjCVarvwStructure_Rep_A_IncomeStatement.mValue = Convert.ToDecimal(dr["Value"].ToString());
                        lstCVarvwStructure_Rep_A_IncomeStatement.Add(ObjCVarvwStructure_Rep_A_IncomeStatement);
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
        private Exception DataFill(DateTime pFromDate, DateTime pTo_Date, string pIncomeAccountIDs, string pExpensesAccountIDs
            , string pOtherIncomeAccountIDs, string pOtherExpensesAccountIDs, bool pLanguage, Boolean IsList, string pCurrencyID,bool pSeeingInvisibleAccounts)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_Rep_A_IncomeStatement.Clear();

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
                    Com.Parameters.Add(new SqlParameter("@Language", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@SeeingInvisibleAccounts", SqlDbType.Bit));
                    //Com.CommandText = "ERP_Web.[dbo].Rep_A_IncomeStatement";
                    Com.CommandText = "[dbo].Rep_A_IncomeStatement";
                    Com.Parameters[0].Value = pFromDate;
                    Com.Parameters[1].Value = pTo_Date;
                    Com.Parameters[2].Value = pIncomeAccountIDs;
                    Com.Parameters[3].Value = pExpensesAccountIDs;
                    Com.Parameters[4].Value = pOtherIncomeAccountIDs;
                    Com.Parameters[5].Value = pOtherExpensesAccountIDs;
                    //Com.Parameters[6].Value = pBranch;
                    Com.Parameters[6].Value = pLanguage;
                    Com.Parameters[7].Value = Convert.ToInt32(pCurrencyID);
                    Com.Parameters[8].Value = pSeeingInvisibleAccounts;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructure_Rep_A_IncomeStatement ObjCVarvwStructure_Rep_A_IncomeStatement = new CVarvwStructure_Rep_A_IncomeStatement();
                        ObjCVarvwStructure_Rep_A_IncomeStatement.mFlag = Convert.ToInt32(dr["Flag"].ToString());
                        ObjCVarvwStructure_Rep_A_IncomeStatement.mType = Convert.ToString(dr["Type"].ToString());
                        ObjCVarvwStructure_Rep_A_IncomeStatement.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarvwStructure_Rep_A_IncomeStatement.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarvwStructure_Rep_A_IncomeStatement.mAccount_Number = Convert.ToString(dr["Account_Number"].ToString());
                        ObjCVarvwStructure_Rep_A_IncomeStatement.mValue = Convert.ToDecimal(dr["Value"].ToString());
                        lstCVarvwStructure_Rep_A_IncomeStatement.Add(ObjCVarvwStructure_Rep_A_IncomeStatement);
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