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
    public class CPKGetBudgetsDetailsReportByPeriod
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarGetBudgetsDetailsReportByPeriod : CPKGetBudgetsDetailsReportByPeriod
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Decimal mActualBudget;
        internal String mAccountName;
        internal String mAccountNumber;
        internal String mSubAccountName;
        internal String mSubAccountNumber;
        internal Decimal mBudget;
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

        public Decimal Budget
        {
            get { return mBudget; }
            set { mBudget = value; }
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

    public partial class CGetBudgetsDetailsReportByPeriod
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
        public List<CVarGetBudgetsDetailsReportByPeriod> lstCVarGetBudgetsDetailsReportByPeriod = new List<CVarGetBudgetsDetailsReportByPeriod>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string BudgetIDs, DateTime FromDate, DateTime ToDate)
        {
            return DataFill(BudgetIDs, FromDate,ToDate, true);
        }
        private Exception DataFill( string BudgetIDs, DateTime FromDate,DateTime ToDate, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarGetBudgetsDetailsReportByPeriod.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
         
                    Com.Parameters.Add(new SqlParameter("@BudgetIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));


                    Com.CommandText = "[dbo].[GetBudgetsDetailsReportByPeriod]";
                    Com.Parameters[0].Value = BudgetIDs;
                    Com.Parameters[1].Value = FromDate;
                    Com.Parameters[2].Value = ToDate;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarGetBudgetsDetailsReportByPeriod ObjCVarGetBudgetsDetailsReportByPeriod = new CVarGetBudgetsDetailsReportByPeriod();
                        ObjCVarGetBudgetsDetailsReportByPeriod.mActualBudget = Convert.ToDecimal(dr["ActualBudget"].ToString());
                        ObjCVarGetBudgetsDetailsReportByPeriod.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarGetBudgetsDetailsReportByPeriod.mAccountNumber = Convert.ToString(dr["AccountNumber"].ToString());
                        ObjCVarGetBudgetsDetailsReportByPeriod.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        ObjCVarGetBudgetsDetailsReportByPeriod.mSubAccountNumber = Convert.ToString(dr["SubAccountNumber"].ToString());
                        ObjCVarGetBudgetsDetailsReportByPeriod.mBudget = Convert.ToDecimal(dr["Budget"].ToString());
                        ObjCVarGetBudgetsDetailsReportByPeriod.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());

                        lstCVarGetBudgetsDetailsReportByPeriod.Add(ObjCVarGetBudgetsDetailsReportByPeriod);
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
