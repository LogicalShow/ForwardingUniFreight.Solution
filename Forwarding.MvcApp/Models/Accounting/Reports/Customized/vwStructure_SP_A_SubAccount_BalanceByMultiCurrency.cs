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
    public partial class CVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mGroup_ID;
        internal Int64 mCustomer_Code;
        internal Int32 mSubAccount_ID;
        internal String mSubAccount_Name;
        internal Decimal mBalance;
        internal Int32 mCurrency_ID;
        internal String mCurrency_Code;
        internal String mCurrency_Name;
      //  internal DateTime mLastDate;
        #endregion

        #region "Methods"
        public Int32 Group_ID
        {
            get { return mGroup_ID; }
            set { mGroup_ID = value; }
        }
        public Int64 Customer_Code
        {
            get { return mCustomer_Code; }
            set { mCustomer_Code = value; }
        }
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
        //public DateTime LastDate
        //{
        //    get { return mLastDate; }
        //    set { mLastDate = value; }
        //}
        #endregion
    }

    public partial class CvwStructure_SP_A_SubAccount_BalanceByMultiCurrency
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
        public List<CVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency> lstCVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency = new List<CVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string pSubAccount_IDs, DateTime pFromDate, DateTime pToDate, Boolean pHide_Zeroes, Boolean pIsOpeningJV)
        {
            return DataFill(pSubAccount_IDs, pFromDate, pToDate, pHide_Zeroes, pIsOpeningJV, true);
        }

        private Exception DataFill(string pSubAccount_IDs, DateTime pFromDate, DateTime pToDate, Boolean pHide_Zeroes, Boolean pIsOpeningJV, Boolean IsList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency.Clear();

            try
            {


                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {

                    Com.Parameters.Add(new SqlParameter("@SubAccountIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@HideZeroes", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@IsOpeningJV", SqlDbType.Bit));


                    Com.CommandText = "[dbo].SP_A_SubAccount_BalanceByMultiCurrency";
                    Com.Parameters[0].Value = pSubAccount_IDs;
                    Com.Parameters[1].Value = pFromDate;
                    Com.Parameters[2].Value = pToDate;
                    Com.Parameters[3].Value = pHide_Zeroes;
                    Com.Parameters[4].Value = pIsOpeningJV;


                }
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 250;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency ObjCVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency = new CVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency();
                        ObjCVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency.mGroup_ID = Convert.ToInt32(dr["Group_ID"].ToString());
                        ObjCVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency.mCustomer_Code = Convert.ToInt64(dr["Customer_Code"].ToString());
                        ObjCVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency.mSubAccount_ID = Convert.ToInt32(dr["SubAccount_ID"].ToString());
                        ObjCVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency.mSubAccount_Name = Convert.ToString(dr["SubAccount_Name"].ToString());
                        ObjCVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        ObjCVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency.mCurrency_ID = Convert.ToInt32(dr["Currency_ID"].ToString());
                        ObjCVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency.mCurrency_Code = Convert.ToString(dr["Currency_Code"].ToString());
                        ObjCVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency.mCurrency_Name = Convert.ToString(dr["Currency_Name"].ToString());
                       // ObjCVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency.mLastDate = Convert.ToDateTime(dr["LastDate"].ToString());
                        lstCVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency.Add(ObjCVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency);
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
