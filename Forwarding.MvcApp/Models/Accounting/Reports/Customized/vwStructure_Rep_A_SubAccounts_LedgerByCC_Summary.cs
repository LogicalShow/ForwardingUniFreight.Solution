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
    public partial class CVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Decimal mDebit;
        internal Decimal mCredit;
        internal Decimal mExchangeRate;
        internal Decimal mLocalDebit;
        internal Decimal mLocalCredit;
        internal String mCostCenterName;
        internal Int32 mCostCenterID;
        internal String mAccountName;
        internal String mCurrency_Code;
        internal Decimal mOpening_Balance;
        internal String mLocalDebitPrice;
        #endregion

        #region "Methods"
        public Decimal Debit
        {
            get { return mDebit; }
            set { mDebit = value; }
        }
        public Decimal Credit
        {
            get { return mCredit; }
            set { mCredit = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mExchangeRate = value; }
        }
        public Decimal LocalDebit
        {
            get { return mLocalDebit; }
            set { mLocalDebit = value; }
        }
        public Decimal LocalCredit
        {
            get { return mLocalCredit; }
            set { mLocalCredit = value; }
        }
        public String CostCenterName
        {
            get { return mCostCenterName; }
            set { mCostCenterName = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mCostCenterID = value; }
        }
        public String AccountName
        {
            get { return mAccountName; }
            set { mAccountName = value; }
        }
        public String Currency_Code
        {
            get { return mCurrency_Code; }
            set { mCurrency_Code = value; }
        }
        public Decimal Opening_Balance
        {
            get { return mOpening_Balance; }
            set { mOpening_Balance = value; }
        }
        public String LocalDebitPrice
        {
            get { return mLocalDebitPrice; }
            set { mLocalDebitPrice = value; }
        }
        #endregion
    }

    public partial class CvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary
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
        public List<CVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary> lstCVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary = new List<CVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string pAccountIDs, string pCostCenterIDs, DateTime pFrom_Date, DateTime pTo_Date, bool pShowRevaluateEntry)
        {
            return DataFill(pAccountIDs, pCostCenterIDs, pFrom_Date, pTo_Date, pShowRevaluateEntry, true);
        }
        private Exception DataFill( string pAccountIDs, string pCostCenterIDs, DateTime pFrom_Date, DateTime pTo_Date, bool pShowRevaluateEntry, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@AccountIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@CostCenter_ID", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@From_Date", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@To_Date", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ShowRevaluateEntry", SqlDbType.Bit));
                    Com.CommandText = "[dbo].Rep_A_SubAccounts_LedgerByCC_Summary";
                    Com.Parameters[0].Value = pAccountIDs;
                    Com.Parameters[1].Value = pCostCenterIDs;
                    Com.Parameters[2].Value = pFrom_Date;
                    Com.Parameters[3].Value = pTo_Date;
                    Com.Parameters[4].Value = pShowRevaluateEntry;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary = new CVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary();
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary.mDebit = Convert.ToDecimal(dr["Debit"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary.mCredit = Convert.ToDecimal(dr["Credit"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary.mLocalDebit = Convert.ToDecimal(dr["LocalDebit"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary.mLocalCredit = Convert.ToDecimal(dr["LocalCredit"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary.mCurrency_Code = Convert.ToString(dr["Currency_Code"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary.mOpening_Balance = Convert.ToDecimal(dr["Opening_Balance"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary.mLocalDebitPrice = Convert.ToString(dr["LocalDebitPrice"].ToString());
                        lstCVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary.Add(ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary);
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
