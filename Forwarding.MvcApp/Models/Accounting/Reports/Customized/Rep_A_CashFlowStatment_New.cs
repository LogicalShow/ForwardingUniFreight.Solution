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
    public partial class CVarRep_A_CashFlowStatment_New
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCashFlowID;
        internal String mName;
        internal Int32 mAccountID;
        internal String mAccount_Name;
        internal Int32 mCurrencyID;
        internal String mCurrencyCode;
        internal Decimal mBalance;
        #endregion

        #region "Methods"
        public Int32 CashFlowID
        {
            get { return mCashFlowID; }
            set { mCashFlowID = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mAccountID = value; }
        }
        public String Account_Name
        {
            get { return mAccount_Name; }
            set { mAccount_Name = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
        }
        public Decimal Balance
        {
            get { return mBalance; }
            set { mBalance = value; }
        }
        #endregion
    }

    public partial class CRep_A_CashFlowStatment_New
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
        public List<CVarRep_A_CashFlowStatment_New> lstCVarRep_A_CashFlowStatment_New = new List<CVarRep_A_CashFlowStatment_New>();
        #endregion

        #region "Select Methods"
        public Exception GetList(DateTime  pFrom_Date, DateTime pTo_Date)
        {
            return DataFill(pFrom_Date,pTo_Date, true);
        }

        private Exception DataFill(DateTime pFrom_Date, DateTime pTo_Date, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarRep_A_CashFlowStatment_New.Clear();

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
                    //Com.CommandText = "ERP_Web.[dbo].SP_A_Rep_BalanceSheet_E";
                    Com.CommandText = "[dbo].Rep_A_CashFlowStatment_New";
                    Com.Parameters[0].Value = pFrom_Date;
                    Com.Parameters[1].Value = pTo_Date;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarRep_A_CashFlowStatment_New ObjCVarRep_A_CashFlowStatment_New = new CVarRep_A_CashFlowStatment_New();
                        ObjCVarRep_A_CashFlowStatment_New.mCashFlowID = Convert.ToInt32(dr["CashFlowID"].ToString());
                        ObjCVarRep_A_CashFlowStatment_New.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarRep_A_CashFlowStatment_New.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarRep_A_CashFlowStatment_New.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarRep_A_CashFlowStatment_New.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarRep_A_CashFlowStatment_New.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarRep_A_CashFlowStatment_New.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        lstCVarRep_A_CashFlowStatment_New.Add(ObjCVarRep_A_CashFlowStatment_New);
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

        public Exception DataFillInvDate(DateTime pFrom_Date, DateTime pTo_Date, Boolean IsList, bool Inv)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarRep_A_CashFlowStatment_New.Clear();

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
                    //Com.CommandText = "ERP_Web.[dbo].SP_A_Rep_BalanceSheet_E";
                    Com.CommandText = "[dbo].Rep_A_CashFlowStatment_New_DueDate";
                    Com.Parameters[0].Value = pFrom_Date;
                    Com.Parameters[1].Value = pTo_Date;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarRep_A_CashFlowStatment_New ObjCVarRep_A_CashFlowStatment_New = new CVarRep_A_CashFlowStatment_New();
                        ObjCVarRep_A_CashFlowStatment_New.mCashFlowID = Convert.ToInt32(dr["CashFlowID"].ToString());
                        ObjCVarRep_A_CashFlowStatment_New.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarRep_A_CashFlowStatment_New.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarRep_A_CashFlowStatment_New.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarRep_A_CashFlowStatment_New.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarRep_A_CashFlowStatment_New.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarRep_A_CashFlowStatment_New.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        lstCVarRep_A_CashFlowStatment_New.Add(ObjCVarRep_A_CashFlowStatment_New);
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
