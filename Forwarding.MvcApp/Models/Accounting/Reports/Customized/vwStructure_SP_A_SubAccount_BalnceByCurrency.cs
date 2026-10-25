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
    public partial class CVarvwStructure_SP_A_SubAccount_BalnceByCurrency
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mSubAccount_ID;
        internal String mSubAccount_Name;
        internal Decimal mBalnce;
        internal Int32 mCurrency_ID;
        internal String mCurrency_Code;
        internal String mCurrency_Name;
        internal DateTime mLastDate;
        #endregion

        #region "Methods"
        public Int32 SubAccount_ID
        {
            get { return mSubAccount_ID; }
            set { mSubAccount_ID = value; }
        }
        public String SubAccount_Name
        {
            get { return mSubAccount_Name; }
            set { mSubAccount_Name = value; }
        }
        public Decimal Balnce
        {
            get { return mBalnce; }
            set { mBalnce = value; }
        }
        public Int32 Currency_ID
        {
            get { return mCurrency_ID; }
            set { mCurrency_ID = value; }
        }
        public String Currency_Code
        {
            get { return mCurrency_Code; }
            set { mCurrency_Code = value; }
        }
        public String Currency_Name
        {
            get { return mCurrency_Name; }
            set { mCurrency_Name = value; }
        }
        public DateTime LastDate
        {
            get { return mLastDate; }
            set { mLastDate = value; }
        }
        #endregion
    }

    public partial class CvwStructure_SP_A_SubAccount_BalnceByCurrency
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
        public List<CVarvwStructure_SP_A_SubAccount_BalnceByCurrency> lstCVarvwStructure_SP_A_SubAccount_BalnceByCurrency = new List<CVarvwStructure_SP_A_SubAccount_BalnceByCurrency>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string pSubAccount_IDs, string pSubAccount_Number, DateTime p_Date, string pAccount_IDs, Boolean pHide_Zeroes, Boolean pHide_AsEgp)
        {
            return DataFill(pSubAccount_IDs, pSubAccount_Number, p_Date, pAccount_IDs, pHide_Zeroes, pHide_AsEgp, true);
        }

        private Exception DataFill(string pSubAccount_IDs, string pSubAccount_Number, DateTime p_Date, string pAccount_IDs, Boolean pHide_Zeroes, Boolean pHide_AsEgp, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_SP_A_SubAccount_BalnceByCurrency.Clear();

            try
            {


                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@SubAccountIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@SubAccount_Number", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@Date", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@AccountIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@HideZeroes", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@hideAsEgp", SqlDbType.Bit));
                    //Com.Parameters.Add(new SqlParameter("@CostCenterIDs", SqlDbType.NVarChar));
                    //Com.Parameters.Add(new SqlParameter("@BranchIDs", SqlDbType.NVarChar));


                    //Com.CommandText = "ERP_Web.[dbo].Rep_A_SubAccounts_LedgerSumCurrencyByCC";
                    Com.CommandText = "[dbo].SP_A_SubAccount_BalnceByCurrency";
                    Com.Parameters[0].Value = pSubAccount_IDs;
                    Com.Parameters[1].Value = pSubAccount_Number;
                    Com.Parameters[2].Value = p_Date;
                    Com.Parameters[3].Value = pAccount_IDs;
                    Com.Parameters[4].Value = pHide_Zeroes;
                    Com.Parameters[5].Value = pHide_AsEgp;
                    //Com.Parameters[6].Value = pCostCenter_IDs;
                    //Com.Parameters[7].Value = pBranch_IDs;


                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructure_SP_A_SubAccount_BalnceByCurrency ObjCVarvwStructure_SP_A_SubAccount_BalnceByCurrency = new CVarvwStructure_SP_A_SubAccount_BalnceByCurrency();
                        ObjCVarvwStructure_SP_A_SubAccount_BalnceByCurrency.mSubAccount_ID = Convert.ToInt32(dr["SubAccount_ID"].ToString());
                        ObjCVarvwStructure_SP_A_SubAccount_BalnceByCurrency.mSubAccount_Name = Convert.ToString(dr["SubAccount_Name"].ToString());
                        ObjCVarvwStructure_SP_A_SubAccount_BalnceByCurrency.mBalnce = Convert.ToDecimal(dr["Balnce"].ToString());
                        ObjCVarvwStructure_SP_A_SubAccount_BalnceByCurrency.mCurrency_ID = Convert.ToInt32(dr["Currency_ID"].ToString());
                        ObjCVarvwStructure_SP_A_SubAccount_BalnceByCurrency.mCurrency_Code = Convert.ToString(dr["Currency_Code"].ToString());
                        ObjCVarvwStructure_SP_A_SubAccount_BalnceByCurrency.mCurrency_Name = Convert.ToString(dr["Currency_Name"].ToString());
                        ObjCVarvwStructure_SP_A_SubAccount_BalnceByCurrency.mLastDate = Convert.ToDateTime(dr["LastDate"].ToString());
                        lstCVarvwStructure_SP_A_SubAccount_BalnceByCurrency.Add(ObjCVarvwStructure_SP_A_SubAccount_BalnceByCurrency);
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
