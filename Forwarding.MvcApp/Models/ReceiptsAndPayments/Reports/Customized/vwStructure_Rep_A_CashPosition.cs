using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.Reports.Customized
{
    [Serializable]
    public partial class CVarvwStructure_Rep_A_CashPosition
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mAccountID;
        internal String mAccountName;
        internal Decimal mDebit;
        internal Decimal mCredit;
        internal Decimal mBalance;
        internal Int32 mCurrency_ID;
        internal String mCurrency_Code;
        internal String mCurrency_Name;
        #endregion

        #region "Methods"
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mAccountID = value; }
        }
        public String AccountName
        {
            get { return mAccountName; }
            set { mAccountName = value; }
        }
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
        public Decimal Balance
        {
            get { return mBalance; }
            set { mBalance = value; }
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

        #endregion
    }

    public partial class CvwStructure_Rep_A_CashPosition
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
        public List<CVarvwStructure_Rep_A_CashPosition> lstCVarvwStructure_Rep_A_CashPosition = new List<CVarvwStructure_Rep_A_CashPosition>();
        #endregion


        #region "Select Methods"
        public Exception GetList(int pCurrencyID, int pIsCash, DateTime p_Date, Boolean pHide_Zeroes)
        {
            return DataFill(pCurrencyID, pIsCash, p_Date, pHide_Zeroes, true);
        }

        private Exception DataFill(int pCurrencyID, int pIsCash, DateTime p_Date, Boolean pHide_Zeroes, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_Rep_A_CashPosition.Clear();

            try
            {


                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@IsCash", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@Date", SqlDbType.DateTime));                 
                    Com.Parameters.Add(new SqlParameter("@HideZeroes", SqlDbType.Bit));


                    //Com.CommandText = "ERP_Web.[dbo].Rep_A_SubAccounts_LedgerSumCurrencyByCC";
                    Com.CommandText = "[dbo].Rep_A_CashPosition";
                    Com.Parameters[0].Value = pCurrencyID;
                    Com.Parameters[1].Value = pIsCash;
                    Com.Parameters[2].Value = p_Date;
                    Com.Parameters[3].Value = pHide_Zeroes;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructure_Rep_A_CashPosition ObjCVarvwStructure_Rep_A_CashPosition = new CVarvwStructure_Rep_A_CashPosition();
                        ObjCVarvwStructure_Rep_A_CashPosition.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwStructure_Rep_A_CashPosition.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwStructure_Rep_A_CashPosition.mDebit = Convert.ToDecimal(dr["Debit"].ToString());
                        ObjCVarvwStructure_Rep_A_CashPosition.mCredit = Convert.ToDecimal(dr["Credit"].ToString());
                        ObjCVarvwStructure_Rep_A_CashPosition.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        ObjCVarvwStructure_Rep_A_CashPosition.mCurrency_ID = Convert.ToInt32(dr["Currency_ID"].ToString());
                        ObjCVarvwStructure_Rep_A_CashPosition.mCurrency_Code = Convert.ToString(dr["Currency_Code"].ToString());
                        ObjCVarvwStructure_Rep_A_CashPosition.mCurrency_Name = Convert.ToString(dr["Currency_Name"].ToString());
                        lstCVarvwStructure_Rep_A_CashPosition.Add(ObjCVarvwStructure_Rep_A_CashPosition);
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
