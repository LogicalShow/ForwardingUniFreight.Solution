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
    public partial class CVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Decimal mFinalBalance;
        internal Int32 mSubAccount_ID;
        internal Int32 mCostCenter_ID;
        internal String mCurrency_Code;
        #endregion

        #region "Methods"
        public Decimal FinalBalance
        {
            get { return mFinalBalance; }
            set { mFinalBalance = value; }
        }
        public Int32 SubAccount_ID
        {
            get { return mSubAccount_ID; }
            set { mSubAccount_ID = value; }
        }
        public Int32 CostCenter_ID
        {
            get { return mCostCenter_ID; }
            set { mCostCenter_ID = value; }
        }
        public String Currency_Code
        {
            get { return mCurrency_Code; }
            set { mCurrency_Code = value; }
        }
        #endregion
    }

    public partial class CvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC
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
        public List<CVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC> lstCVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC = new List<CVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string pSubAccount_IDs, string pAccountIDs, string pCostCenter_IDs, DateTime pTo_Date, string pBranchIDs)
        {
            return DataFill(pSubAccount_IDs, pAccountIDs, pCostCenter_IDs, pTo_Date,pBranchIDs, true);
        }
        private Exception DataFill(string pSubAccount_IDs, string pAccountIDs, string pCostCenter_IDs, DateTime pTo_Date, string pBranchIDs, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@SubAccount_IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@AccountIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@CostCenter_IDS", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@To_Date", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@BranchIDs", SqlDbType.NVarChar));

                    //Com.CommandText = "ERP_Web.[dbo].Rep_A_SubAccounts_LedgerSumCurrencyByCC";
                    Com.CommandText = "[dbo].Rep_A_SubAccounts_LedgerSumCurrencyByCC";
                    Com.Parameters[0].Value = pSubAccount_IDs;
                    Com.Parameters[1].Value = pAccountIDs;
                    Com.Parameters[2].Value = pCostCenter_IDs;
                    Com.Parameters[3].Value = pTo_Date;
                    Com.Parameters[4].Value = pBranchIDs;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC ObjCVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC = new CVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC();
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC.mFinalBalance = dr["FinalBalance"].ToString() == "" ? 0 : Convert.ToDecimal(dr["FinalBalance"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC.mSubAccount_ID = dr["SubAccount_ID"].ToString() == "" ? 0 : Convert.ToInt32(dr["SubAccount_ID"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC.mCostCenter_ID = dr["CostCenter_ID"].ToString() == "" ? 0 : Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC.mCurrency_Code = Convert.ToString(dr["Currency_Code"].ToString());
                        lstCVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC.Add(ObjCVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC);
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