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
    public partial class CVarvwStructure_Rep_A_LedgerSumCurrency
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal int mAccount_ID;
        internal Decimal mFinalBalance;
        internal String mCurrency_Code;
        #endregion

        #region "Methods"
        public int Account_ID
        {
            get { return mAccount_ID; }
            set { mAccount_ID = value; }
        }
        public Decimal FinalBalance
        {
            get { return mFinalBalance; }
            set { mFinalBalance = value; }
        }
        public String Currency_Code
        {
            get { return mCurrency_Code; }
            set { mCurrency_Code = value; }
        }
        #endregion
    }

    public partial class CvwStructure_Rep_A_LedgerSumCurrency
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
        public List<CVarvwStructure_Rep_A_LedgerSumCurrency> lstCVarvwStructure_Rep_A_LedgerSumCurrency = new List<CVarvwStructure_Rep_A_LedgerSumCurrency>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string pAccountIDs, DateTime pTo_Date, string pJournal_IDs, string pBranch_IDs)
        {
            return DataFill(pAccountIDs, pTo_Date, pJournal_IDs, pBranch_IDs, true);
        }

        private Exception DataFill(string pAccountIDs, DateTime pTo_Date, string pJournal_IDs,string pBranch_IDs, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_Rep_A_LedgerSumCurrency.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@AccountIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@To_Date", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@Journal_IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@Branch_IDs", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].Rep_A_LedgerSumCurrency";
                    Com.Parameters[0].Value = pAccountIDs;
                    Com.Parameters[1].Value = pTo_Date;
                    Com.Parameters[2].Value = pJournal_IDs;
                    Com.Parameters[3].Value = pBranch_IDs;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructure_Rep_A_LedgerSumCurrency ObjCVarvwStructure_Rep_A_LedgerSumCurrency = new CVarvwStructure_Rep_A_LedgerSumCurrency();
                        ObjCVarvwStructure_Rep_A_LedgerSumCurrency.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarvwStructure_Rep_A_LedgerSumCurrency.mFinalBalance = Convert.ToDecimal(dr["FinalBalance"].ToString());
                        ObjCVarvwStructure_Rep_A_LedgerSumCurrency.mCurrency_Code = Convert.ToString(dr["Currency_Code"].ToString());
                        lstCVarvwStructure_Rep_A_LedgerSumCurrency.Add(ObjCVarvwStructure_Rep_A_LedgerSumCurrency);
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
