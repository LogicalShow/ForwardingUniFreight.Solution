using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated
{
    [Serializable]
    public partial class CVarvw_Current_BankBalanceAllCurrencies
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mBankID;
        internal String mBank_Name;
        internal Decimal mAmount;
        internal Int32 mCurrency_ID;
        #endregion

        #region "Methods"
        public Int32 BankID
        {
            get { return mBankID; }
            set { mBankID = value; }
        }
        public String Bank_Name
        {
            get { return mBank_Name; }
            set { mBank_Name = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mAmount = value; }
        }
        public Int32 Currency_ID
        {
            get { return mCurrency_ID; }
            set { mCurrency_ID = value; }
        }
        #endregion
    }

    public partial class Cvw_Current_BankBalanceAllCurrencies
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
        public List<CVarvw_Current_BankBalanceAllCurrencies> lstCVarvw_Current_BankBalanceAllCurrencies = new List<CVarvw_Current_BankBalanceAllCurrencies>();
        #endregion

        #region "Select Methods"
       
       
        public Exception GetList(Int32 pBankID, DateTime pToDate, Int32 pCurrID,Boolean IsList)
        {
          return  DataFill(pBankID, pToDate, pCurrID);
        }

        private Exception DataFill(Int32 pBankID, DateTime pToDate, Int32 pCurrID)
        {
            Exception Exp = null;
            
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvw_Current_BankBalanceAllCurrencies.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@BankID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CurrID", SqlDbType.Int));
                Com.CommandText = "[dbo].Current_BankBalanceAllCurrencies";
                Com.Parameters[0].Value = pBankID;
                Com.Parameters[1].Value = pToDate;
                Com.Parameters[2].Value = pCurrID;
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvw_Current_BankBalanceAllCurrencies ObjCVarvw_Current_BankBalanceAllCurrencies = new CVarvw_Current_BankBalanceAllCurrencies();
                        ObjCVarvw_Current_BankBalanceAllCurrencies.mBankID = Convert.ToInt32(dr["BankID"].ToString());
                        ObjCVarvw_Current_BankBalanceAllCurrencies.mBank_Name = Convert.ToString(dr["Bank_Name"].ToString());
                        ObjCVarvw_Current_BankBalanceAllCurrencies.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvw_Current_BankBalanceAllCurrencies.mCurrency_ID = Convert.ToInt32(dr["Currency_ID"].ToString());
                        lstCVarvw_Current_BankBalanceAllCurrencies.Add(ObjCVarvw_Current_BankBalanceAllCurrencies);
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
