
using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Accounting.Reports.Customized
{
    [Serializable]
    public partial class CVarRep_A_IncomeStatementMonth_NileLogistics
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mFlag;
        internal Int32 mIsMain;
        internal String mType;
        internal Int32 mAccount_ID;
        internal String mAccount_Name;
        internal String mAccount_Number;
        internal Decimal mValue;
        internal String mActivityName;
        internal String mMonth;

        #endregion

        #region "Methods"
        public Int32 Flag
        {
            get { return mFlag; }
            set { mFlag = value; }
        }
        public String Month
        {
            get { return mMonth; }
            set { mMonth = value; }
        }
        public Int32 IsMain
        {
            get { return mIsMain; }
            set { mIsMain = value; }
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
        public String ActivityName
        {
            get { return mActivityName; }
            set { mActivityName = value; }
        }
        #endregion
    }

    public partial class CRep_A_IncomeStatementMonth_NileLogistics
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
        public List<CVarRep_A_IncomeStatementMonth_NileLogistics> lstCVarRep_A_IncomeStatementMonth_NileLogistics = new List<CVarRep_A_IncomeStatementMonth_NileLogistics>();
        #endregion

        #region "Select Methods"
       

        public Exception GetListByMonth(DateTime pFromDate, DateTime pTo_Date, string pIncomeAccountIDs
               , string pExpensesAccountIDs, string pOtherIncomeAccountIDs, string pOtherExpensesAccountIDs, bool pHideProfitLossJV)
        {
            return DataFillByMonth(pFromDate, pTo_Date, pIncomeAccountIDs
            , pExpensesAccountIDs, pOtherIncomeAccountIDs, pOtherExpensesAccountIDs, pHideProfitLossJV, true);
        }

        private Exception DataFillByMonth(DateTime pFromDate, DateTime pTo_Date, string pIncomeAccountIDs
           , string pExpensesAccountIDs, string pOtherIncomeAccountIDs, string pOtherExpensesAccountIDs,bool pHideProfitLossJV, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarRep_A_IncomeStatementMonth_NileLogistics.Clear();

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
                    Com.Parameters.Add(new SqlParameter("@IncomeAccountIDs", SqlDbType.VarChar));
                    Com.Parameters.Add(new SqlParameter("@ExpensesAccountIDs", SqlDbType.VarChar));
                    Com.Parameters.Add(new SqlParameter("@OtherIncomeAccountIDs", SqlDbType.VarChar));
                    Com.Parameters.Add(new SqlParameter("@OtherExpensesAccountIDs", SqlDbType.VarChar));
                    Com.Parameters.Add(new SqlParameter("@HideProfitLossJV", SqlDbType.Bit));

                    //Com.CommandText = "ERP_Web.[dbo].Rep_A_IncomeStatement";
                    Com.CommandText = "[dbo].Rep_A_IncomeStatementByMonth_NileLogistics";
                    Com.Parameters[0].Value = pFromDate;
                    Com.Parameters[1].Value = pTo_Date;
                    Com.Parameters[2].Value = pIncomeAccountIDs;
                    Com.Parameters[3].Value = pExpensesAccountIDs;
                    Com.Parameters[4].Value = pOtherIncomeAccountIDs;
                    Com.Parameters[5].Value = pOtherExpensesAccountIDs;
                    Com.Parameters[6].Value = pHideProfitLossJV;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarRep_A_IncomeStatementMonth_NileLogistics ObjCVarRep_A_IncomeStatementMonth_NileLogistics = new CVarRep_A_IncomeStatementMonth_NileLogistics();
                        ObjCVarRep_A_IncomeStatementMonth_NileLogistics.mFlag = Convert.ToInt32(dr["Flag"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth_NileLogistics.mType = Convert.ToString(dr["Type"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth_NileLogistics.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth_NileLogistics.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth_NileLogistics.mAccount_Number = Convert.ToString(dr["Account_Number"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth_NileLogistics.mValue = Convert.ToDecimal(dr["Value"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth_NileLogistics.mMonth = Convert.ToString(dr["Month"].ToString());
                        lstCVarRep_A_IncomeStatementMonth_NileLogistics.Add(ObjCVarRep_A_IncomeStatementMonth_NileLogistics);
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
