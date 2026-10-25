
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
    public partial class CVarRep_A_IncomeStatementMonth
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

    public partial class CRep_A_IncomeStatementMonth
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
        public List<CVarRep_A_IncomeStatementMonth> lstCVarRep_A_IncomeStatementMonth = new List<CVarRep_A_IncomeStatementMonth>();
        #endregion

        #region "Select Methods"
        public Exception GetList(DateTime pFromDate, DateTime pTo_Date, string pIncomeAccountIDs
            , string pExpensesAccountIDs, string pOtherIncomeAccountIDs, string pOtherExpensesAccountIDs,
            bool WithSubAccounts, string ActivityCenterIDs)
        {
            return DataFill(pFromDate, pTo_Date, pIncomeAccountIDs
            , pExpensesAccountIDs, pOtherIncomeAccountIDs, pOtherExpensesAccountIDs,
            WithSubAccounts, ActivityCenterIDs, true);
        }
        public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        private Exception DataFill(DateTime pFromDate, DateTime pTo_Date, string pIncomeAccountIDs
            , string pExpensesAccountIDs, string pOtherIncomeAccountIDs, string pOtherExpensesAccountIDs,
            bool WithSubAccounts, string ActivityCenterIDs, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarRep_A_IncomeStatementMonth.Clear();

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
                    Com.Parameters.Add(new SqlParameter("@WithSubAccounts", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@ActivityCenterIDs", SqlDbType.VarChar));
                    //Com.CommandText = "ERP_Web.[dbo].Rep_A_IncomeStatement";
                    Com.CommandText = "[dbo].Rep_A_Rep_A_IncomeStatementMonth";
                    Com.Parameters[0].Value = pFromDate;
                    Com.Parameters[1].Value = pTo_Date;
                    Com.Parameters[2].Value = pIncomeAccountIDs;
                    Com.Parameters[3].Value = pExpensesAccountIDs;
                    Com.Parameters[4].Value = pOtherIncomeAccountIDs;
                    Com.Parameters[5].Value = pOtherExpensesAccountIDs;
                    Com.Parameters[6].Value = WithSubAccounts;
                    Com.Parameters[7].Value = ActivityCenterIDs;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarRep_A_IncomeStatementMonth ObjCVarRep_A_IncomeStatementMonth = new CVarRep_A_IncomeStatementMonth();
                        ObjCVarRep_A_IncomeStatementMonth.mFlag = Convert.ToInt32(dr["Flag"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mIsMain = Convert.ToInt32(dr["IsMain"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mType = Convert.ToString(dr["Type"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mAccount_Number = Convert.ToString(dr["Account_Number"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mValue = Convert.ToDecimal(dr["Value"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mActivityName = Convert.ToString(dr["ActivityName"].ToString());
                        lstCVarRep_A_IncomeStatementMonth.Add(ObjCVarRep_A_IncomeStatementMonth);
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
        public Exception GetListIsPort(DateTime pFromDate, DateTime pTo_Date, string pIncomeAccountIDs
                  , string pExpensesAccountIDs, string pOtherIncomeAccountIDs, string pOtherExpensesAccountIDs,
                  bool WithSubAccounts, string ActivityCenterIDs, string PortIDs)
        {
            return DataFillIsPort(pFromDate, pTo_Date, pIncomeAccountIDs
            , pExpensesAccountIDs, pOtherIncomeAccountIDs, pOtherExpensesAccountIDs,
            WithSubAccounts, ActivityCenterIDs, PortIDs, true);
        }

        private Exception DataFillIsPort(DateTime pFromDate, DateTime pTo_Date, string pIncomeAccountIDs
           , string pExpensesAccountIDs, string pOtherIncomeAccountIDs, string pOtherExpensesAccountIDs,
           bool WithSubAccounts, string ActivityCenterIDs, string PortIDs, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarRep_A_IncomeStatementMonth.Clear();

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
                    Com.Parameters.Add(new SqlParameter("@WithSubAccounts", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@ActivityCenterIDs", SqlDbType.VarChar));
                    Com.Parameters.Add(new SqlParameter("@PortIDs", SqlDbType.VarChar));

                    //Com.CommandText = "ERP_Web.[dbo].Rep_A_IncomeStatement";
                    Com.CommandText = "[dbo].Rep_A_IncomeStatementByPort";
                    Com.Parameters[0].Value = pFromDate;
                    Com.Parameters[1].Value = pTo_Date;
                    Com.Parameters[2].Value = pIncomeAccountIDs;
                    Com.Parameters[3].Value = pExpensesAccountIDs;
                    Com.Parameters[4].Value = pOtherIncomeAccountIDs;
                    Com.Parameters[5].Value = pOtherExpensesAccountIDs;
                    Com.Parameters[6].Value = WithSubAccounts;
                    Com.Parameters[7].Value = ActivityCenterIDs;
                    Com.Parameters[8].Value = PortIDs;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarRep_A_IncomeStatementMonth ObjCVarRep_A_IncomeStatementMonth = new CVarRep_A_IncomeStatementMonth();
                        ObjCVarRep_A_IncomeStatementMonth.mFlag = Convert.ToInt32(dr["Flag"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mIsMain = Convert.ToInt32(dr["IsMain"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mType = Convert.ToString(dr["Type"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mAccount_Number = Convert.ToString(dr["Account_Number"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mValue = Convert.ToDecimal(dr["Value"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mActivityName = Convert.ToString(dr["ActivityName"].ToString());
                        lstCVarRep_A_IncomeStatementMonth.Add(ObjCVarRep_A_IncomeStatementMonth);
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

        public Exception GetListIsByJob(DateTime pFromDate, DateTime pTo_Date, string pIncomeAccountIDs
                , string pExpensesAccountIDs, string pOtherIncomeAccountIDs, string pOtherExpensesAccountIDs,
                bool WithSubAccounts, string JobIDs)
        {
            return DataFillByJob(pFromDate, pTo_Date, pIncomeAccountIDs
            , pExpensesAccountIDs, pOtherIncomeAccountIDs, pOtherExpensesAccountIDs,
            WithSubAccounts, JobIDs, true);
        }
        private Exception DataFillByJob(DateTime pFromDate, DateTime pTo_Date, string pIncomeAccountIDs
         , string pExpensesAccountIDs, string pOtherIncomeAccountIDs, string pOtherExpensesAccountIDs,
         bool WithSubAccounts, string JobIDs, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarRep_A_IncomeStatementMonth.Clear();

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
                    Com.Parameters.Add(new SqlParameter("@WithSubAccounts", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@JobIDs", SqlDbType.VarChar));

                    //Com.CommandText = "ERP_Web.[dbo].Rep_A_IncomeStatement";
                    Com.CommandText = "[dbo].Rep_A_Rep_A_IncomeStatementMonthJob";
                    Com.Parameters[0].Value = pFromDate;
                    Com.Parameters[1].Value = pTo_Date;
                    Com.Parameters[2].Value = pIncomeAccountIDs;
                    Com.Parameters[3].Value = pExpensesAccountIDs;
                    Com.Parameters[4].Value = pOtherIncomeAccountIDs;
                    Com.Parameters[5].Value = pOtherExpensesAccountIDs;
                    Com.Parameters[6].Value = WithSubAccounts;
                    Com.Parameters[7].Value = JobIDs;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarRep_A_IncomeStatementMonth ObjCVarRep_A_IncomeStatementMonth = new CVarRep_A_IncomeStatementMonth();
                        ObjCVarRep_A_IncomeStatementMonth.mFlag = Convert.ToInt32(dr["Flag"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mIsMain = Convert.ToInt32(dr["IsMain"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mType = Convert.ToString(dr["Type"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mAccount_Number = Convert.ToString(dr["Account_Number"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mValue = Convert.ToDecimal(dr["Value"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mActivityName = Convert.ToString(dr["ActivityName"].ToString());
                        lstCVarRep_A_IncomeStatementMonth.Add(ObjCVarRep_A_IncomeStatementMonth);
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
            lstCVarRep_A_IncomeStatementMonth.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].Rep_A_IncomeStatementMonth";
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
                        CVarRep_A_IncomeStatementMonth ObjCVarRep_A_IncomeStatementMonth = new CVarRep_A_IncomeStatementMonth();
                        ObjCVarRep_A_IncomeStatementMonth.mFlag = Convert.ToInt32(dr["Flag"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mIsMain = Convert.ToInt32(dr["IsMain"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mType = Convert.ToString(dr["Type"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mAccount_Number = Convert.ToString(dr["Account_Number"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mValue = Convert.ToDecimal(dr["Value"].ToString());
                        ObjCVarRep_A_IncomeStatementMonth.mActivityName = Convert.ToString(dr["ActivityName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarRep_A_IncomeStatementMonth.Add(ObjCVarRep_A_IncomeStatementMonth);
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
        public Exception GetListByMonth(DateTime pFromDate, DateTime pTo_Date, string pIncomeAccountIDs
               , string pExpensesAccountIDs, string pOtherIncomeAccountIDs, string pOtherExpensesAccountIDs, bool pHideProfitLossJV)
        {
            return DataFillByMonth(pFromDate, pTo_Date, pIncomeAccountIDs
            , pExpensesAccountIDs, pOtherIncomeAccountIDs, pOtherExpensesAccountIDs, pHideProfitLossJV, true);
        }

        private Exception DataFillByMonth(
           DateTime pFromDate,
           DateTime pTo_Date,
           string pIncomeAccountIDs,
           string pExpensesAccountIDs,
           string pOtherIncomeAccountIDs,
           string pOtherExpensesAccountIDs,
           bool pHideProfitLossJV,
           bool IsList)
        {
            Exception Exp = null;
            lstCVarRep_A_IncomeStatementMonth.Clear();

            using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString()))
            using (SqlCommand Com = new SqlCommand("[dbo].Rep_A_IncomeStatementByMonth", Con))
            {
                Com.CommandType = CommandType.StoredProcedure;
                Com.CommandTimeout = 200;

                if (IsList)
                {
                    Com.Parameters.Add("@FromDate", SqlDbType.DateTime).Value = pFromDate;
                    Com.Parameters.Add("@ToDate", SqlDbType.DateTime).Value = pTo_Date;
                    Com.Parameters.Add("@IncomeAccountIDs", SqlDbType.VarChar).Value = pIncomeAccountIDs;
                    Com.Parameters.Add("@ExpensesAccountIDs", SqlDbType.VarChar).Value = pExpensesAccountIDs;
                    Com.Parameters.Add("@OtherIncomeAccountIDs", SqlDbType.VarChar).Value = pOtherIncomeAccountIDs;
                    Com.Parameters.Add("@OtherExpensesAccountIDs", SqlDbType.VarChar).Value = pOtherExpensesAccountIDs;
                    Com.Parameters.Add("@HideProfitLossJV", SqlDbType.Bit).Value = pHideProfitLossJV;
                }

                try
                {
                    Con.Open();
                    using (SqlDataReader dr = Com.ExecuteReader(CommandBehavior.CloseConnection))
                    {
                        while (dr.Read())
                        {
                            CVarRep_A_IncomeStatementMonth obj = new CVarRep_A_IncomeStatementMonth
                            {
                                mFlag = Convert.ToInt32(dr["Flag"]),
                                mType = Convert.ToString(dr["Type"]),
                                mAccount_ID = Convert.ToInt32(dr["Account_ID"]),
                                mAccount_Name = Convert.ToString(dr["Account_Name"]),
                                mAccount_Number = Convert.ToString(dr["Account_Number"]),
                                mValue = Convert.ToDecimal(dr["Value"]),
                                mMonth = Convert.ToString(dr["Month"])
                            };
                            lstCVarRep_A_IncomeStatementMonth.Add(obj);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Exp = ex;
                }
            }

            return Exp;
        }


        public Exception GetListByMonthAndInvoiceDate(DateTime pFromDate, DateTime pTo_Date, string pIncomeAccountIDs
       , string pExpensesAccountIDs, string pOtherIncomeAccountIDs, string pOtherExpensesAccountIDs, bool pHideProfitLossJV)
        {
            return DataFillByMonthAndInvoiceDate(pFromDate, pTo_Date, pIncomeAccountIDs
            , pExpensesAccountIDs, pOtherIncomeAccountIDs, pOtherExpensesAccountIDs, pHideProfitLossJV, true);
        }
        private Exception DataFillByMonthAndInvoiceDate(
           DateTime pFromDate,
           DateTime pTo_Date,
           string pIncomeAccountIDs,
           string pExpensesAccountIDs,
           string pOtherIncomeAccountIDs,
           string pOtherExpensesAccountIDs,
           bool pHideProfitLossJV,
           bool IsList)
        {
            Exception Exp = null;
            lstCVarRep_A_IncomeStatementMonth.Clear();

            using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString()))
            using (SqlCommand Com = new SqlCommand("[dbo].Rep_A_IncomeStatementByMonthAndInvoiceDate", Con))
            {
                Com.CommandType = CommandType.StoredProcedure;
                Com.CommandTimeout = 200;

                if (IsList)
                {
                    Com.Parameters.Add("@FromDate", SqlDbType.DateTime).Value = pFromDate;
                    Com.Parameters.Add("@ToDate", SqlDbType.DateTime).Value = pTo_Date;
                    Com.Parameters.Add("@IncomeAccountIDs", SqlDbType.VarChar).Value = pIncomeAccountIDs;
                    Com.Parameters.Add("@ExpensesAccountIDs", SqlDbType.VarChar).Value = pExpensesAccountIDs;
                    Com.Parameters.Add("@OtherIncomeAccountIDs", SqlDbType.VarChar).Value = pOtherIncomeAccountIDs;
                    Com.Parameters.Add("@OtherExpensesAccountIDs", SqlDbType.VarChar).Value = pOtherExpensesAccountIDs;
                    Com.Parameters.Add("@HideProfitLossJV", SqlDbType.Bit).Value = pHideProfitLossJV;
                }

                try
                {
                    Con.Open();
                    using (SqlDataReader dr = Com.ExecuteReader(CommandBehavior.CloseConnection))
                    {
                        while (dr.Read())
                        {
                            CVarRep_A_IncomeStatementMonth obj = new CVarRep_A_IncomeStatementMonth
                            {
                                mFlag = Convert.ToInt32(dr["Flag"]),
                                mType = Convert.ToString(dr["Type"]),
                                mAccount_ID = Convert.ToInt32(dr["Account_ID"]),
                                mAccount_Name = Convert.ToString(dr["Account_Name"]),
                                mAccount_Number = Convert.ToString(dr["Account_Number"]),
                                mValue = Convert.ToDecimal(dr["Value"]),
                                mMonth = Convert.ToString(dr["Month"])
                            };
                            lstCVarRep_A_IncomeStatementMonth.Add(obj);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Exp = ex;
                }
            }

            return Exp;
        }

        #endregion
    }

}
