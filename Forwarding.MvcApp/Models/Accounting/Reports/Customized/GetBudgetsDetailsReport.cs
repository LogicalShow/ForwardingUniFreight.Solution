using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SC.Transactions.Customized
{
    [Serializable]
    public class CPKGetBudgetsDetailsReport
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarGetBudgetsDetailsReport : CPKGetBudgetsDetailsReport
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Decimal mActualBudget;
        internal String mAccountName;
        internal String mAccountNumber;
        internal String mSubAccountName;
        internal String mSubAccountNumber;
        internal String mBudgetName;
        internal String mFiscalYear;
        internal Decimal mBudget;
        internal int mMonthID;
        internal String mCostCenterName;

        #endregion

        #region "Methods"
        public Decimal ActualBudget
        {
            get { return mActualBudget; }
            set { mActualBudget = value; }
        }
        public String AccountName
        {
            get { return mAccountName; }
            set { mAccountName = value; }
        }
        public String AccountNumber
        {
            get { return mAccountNumber; }
            set { mAccountNumber = value; }
        }
        public String SubAccountName
        {
            get { return mSubAccountName; }
            set { mSubAccountName = value; }
        }
        public String SubAccountNumber
        {
            get { return mSubAccountNumber; }
            set { mSubAccountNumber = value; }
        }
        public String BudgetName
        {
            get { return mBudgetName; }
            set { mBudgetName = value; }
        }
        public String FiscalYear
        {
            get { return mFiscalYear; }
            set { mFiscalYear = value; }
        }
        public Decimal Budget
        {
            get { return mBudget; }
            set { mBudget = value; }
        }
        public int MonthID
        {
            get { return mMonthID; }
            set { mMonthID = value; }
        }
        public String CostCenterName
        {
            get { return mCostCenterName; }
            set { mCostCenterName = value; }
        }
        #endregion

        #region Functions

        #endregion
    }

    public partial class CGetBudgetsDetailsReport
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
        public List<CVarGetBudgetsDetailsReport> lstCVarGetBudgetsDetailsReport = new List<CVarGetBudgetsDetailsReport>();
        #endregion

        #region "Select Methods"
        public Exception GetList(int FiscalYearID, int BudgetID,bool ByMonth,string MonthIDs)
        {
            return DataFill(FiscalYearID, BudgetID,ByMonth, MonthIDs, true);
        }
        private Exception DataFill(int FiscalYearID, int BudgetID,bool ByMonth, string MonthIDs, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarGetBudgetsDetailsReport.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@FiscalYearID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@BudgetID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@ByMonth", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@MonthIDs", SqlDbType.NVarChar));

                    Com.CommandText = "[dbo].[GetBudgetsDetailsReport]";
                    Com.Parameters[0].Value = FiscalYearID;
                    Com.Parameters[1].Value = BudgetID;
                    Com.Parameters[2].Value = ByMonth;
                    Com.Parameters[3].Value = MonthIDs;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarGetBudgetsDetailsReport ObjCVarGetBudgetsDetailsReport = new CVarGetBudgetsDetailsReport();
                        ObjCVarGetBudgetsDetailsReport.mActualBudget = Convert.ToDecimal(dr["ActualBudget"].ToString());
                        ObjCVarGetBudgetsDetailsReport.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarGetBudgetsDetailsReport.mAccountNumber = Convert.ToString(dr["AccountNumber"].ToString());
                        ObjCVarGetBudgetsDetailsReport.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        ObjCVarGetBudgetsDetailsReport.mSubAccountNumber = Convert.ToString(dr["SubAccountNumber"].ToString());
                        ObjCVarGetBudgetsDetailsReport.mBudgetName = Convert.ToString(dr["BudgetName"].ToString());
                        ObjCVarGetBudgetsDetailsReport.mFiscalYear = Convert.ToString(dr["FiscalYear"].ToString());
                        ObjCVarGetBudgetsDetailsReport.mBudget = Convert.ToDecimal(dr["Budget"].ToString());
                        ObjCVarGetBudgetsDetailsReport.mMonthID = Convert.ToInt32(dr["MonthID"].ToString());
                        ObjCVarGetBudgetsDetailsReport.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());

                        lstCVarGetBudgetsDetailsReport.Add(ObjCVarGetBudgetsDetailsReport);
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
