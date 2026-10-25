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
    public partial class CVarvw_Current_SafeBalanceAllCurrencies
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mSafeID;
        internal String mSafe_Name;
        internal Decimal mAmount;
        internal Int32 mCurrency_ID;
        #endregion

        #region "Methods"
        public Int32 SafeID
        {
            get { return mSafeID; }
            set { mSafeID = value; }
        }
        public String Safe_Name
        {
            get { return mSafe_Name; }
            set { mSafe_Name = value; }
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

    public partial class Cvw_Current_SafeBalanceAllCurrencies
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
        public List<CVarvw_Current_SafeBalanceAllCurrencies> lstCVarvw_Current_SafeBalanceAllCurrencies = new List<CVarvw_Current_SafeBalanceAllCurrencies>();
        #endregion

        #region "Select Methods"
       
       
        public Exception GetList(Int32 pSafeID, DateTime pToDate, Int32 pCurrID,Boolean IsList)
        {
          return  DataFill(pSafeID, pToDate, pCurrID);
        }

        private Exception DataFill(Int32 pSafeID, DateTime pToDate, Int32 pCurrID)
        {
            Exception Exp = null;
            
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvw_Current_SafeBalanceAllCurrencies.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@SafeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CurrID", SqlDbType.Int));
                Com.CommandText = "[dbo].Current_SafeBalanceAllCurrencies";
                Com.Parameters[0].Value = pSafeID;
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
                        CVarvw_Current_SafeBalanceAllCurrencies ObjCVarvw_Current_SafeBalanceAllCurrencies = new CVarvw_Current_SafeBalanceAllCurrencies();
                        ObjCVarvw_Current_SafeBalanceAllCurrencies.mSafeID = Convert.ToInt32(dr["SafeID"].ToString());
                        ObjCVarvw_Current_SafeBalanceAllCurrencies.mSafe_Name = Convert.ToString(dr["Safe_Name"].ToString());
                        ObjCVarvw_Current_SafeBalanceAllCurrencies.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvw_Current_SafeBalanceAllCurrencies.mCurrency_ID = Convert.ToInt32(dr["Currency_ID"].ToString());
                        lstCVarvw_Current_SafeBalanceAllCurrencies.Add(ObjCVarvw_Current_SafeBalanceAllCurrencies);
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
