using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
// the Model for connect with [dbo].[ForeignCurrencyRevaluation] procedure 
// [dbo].[ForeignCurrencyRevaluation] : Merge duplicate items base on Itemtype"customers , subaccounts , ....... etc" 
namespace Forwarding.MvcApp.Models.Accounting.Transactions.Customized
{
    [Serializable]
    public class CPKForeignCurrencyRevaluation
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarForeignCurrencyRevaluation : CPKForeignCurrencyRevaluation
    {
        //#region "variables"
        //internal Int32 mIsSucsess;

        //#endregion

        //#region "Methods"
        //public Int32 IsSucsess
        //{
        //    get { return mIsSucsess; }
        //    set { mIsSucsess = value; }
        //};

        //#endregion

    }

    public partial class CForeignCurrencyRevaluation
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
        public List<CVarForeignCurrencyRevaluation> lstCVarForeignCurrencyRevaluation = new List<CVarForeignCurrencyRevaluation>();
        #endregion
        // Merge(string pItemType, string pDuplicateItems, string pDestinationItem)
        #region "Select Methods"
        public Exception ForeignCurrencyRevaluation(string pAccountIDs, int pRevaluteAccount, int pSubAccountsIDs, decimal pExRate, Int32 pCurrencyID
            , DateTime pFromDate, DateTime pToDate, DateTime pJvRevalueteDate, Int32 pUserID)
        {
            return ExeForeignCurrencyRevaluation(pAccountIDs, pRevaluteAccount, pSubAccountsIDs, pExRate, pCurrencyID,
                pFromDate, pToDate, pJvRevalueteDate, pUserID, true);
        }

        private Exception ExeForeignCurrencyRevaluation(string pAccountIDs, int pRevaluteAccount, int pSubAccountsIDs, decimal pExRate, Int32 pCurrencyID
            , DateTime pFromDate, DateTime pToDate, DateTime pJvRevalueteDate, Int32 pUserID, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarForeignCurrencyRevaluation.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.CommandTimeout = 0;
                if (IsList == true)
                {

                    //@FromDate DATETIME, @ToDate DATETIME , @WhereClause NVarChar(MAX)
                    Com.Parameters.Add(new SqlParameter("@AccountIDs", SqlDbType.NChar));
                    Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@JvRevalueteDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ExRate", SqlDbType.Decimal));
                    Com.Parameters.Add(new SqlParameter("@RevaluteAccount", SqlDbType.Int));
                    Com.CommandText = "[dbo].[A_RevaluateCurrencySubAccounts]";
                    Com.Parameters[0].Value = pAccountIDs;
                    Com.Parameters[1].Value = pSubAccountsIDs;
                    Com.Parameters[2].Value = pCurrencyID;
                    Com.Parameters[3].Value = pUserID;
                    Com.Parameters[4].Value = pFromDate;
                    Com.Parameters[5].Value = pToDate;
                    Com.Parameters[6].Value = pJvRevalueteDate;
                    Com.Parameters[7].Value = pExRate;
                    Com.Parameters[8].Value = pRevaluteAccount;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    //  while (dr.Read())
                    //  {
                    /*Start DataReader*/
                    // CVarForeignCurrencyRevaluation ObjCVarForeignCurrencyRevaluation = new CVarForeignCurrencyRevaluation();
                    // ObjCVarForeignCurrencyRevaluation.mIsSucsess = Convert.ToInt32(dr["IsSucsess"].ToString());

                    // lstCVarForeignCurrencyRevaluation.Add(ObjCVarForeignCurrencyRevaluation);
                    // }
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

        public Exception ForeignCurrencyRevaluationsafena(string pAccountIDs, int pRevaluteAccount, int pSubAccountsIDs, decimal pExRate, Int32 pCurrencyID
           , DateTime pFromDate, DateTime pToDate, DateTime pJvRevalueteDate, Int32 pUserID)
        {
            return ExeForeignCurrencyRevaluationSafena(pAccountIDs, pRevaluteAccount, pSubAccountsIDs, pExRate, pCurrencyID,
                pFromDate, pToDate, pJvRevalueteDate, pUserID, true);
        }

        private Exception ExeForeignCurrencyRevaluationSafena(string pAccountIDs, int pRevaluteAccount, int pSubAccountsIDs, decimal pExRate, Int32 pCurrencyID
            , DateTime pFromDate, DateTime pToDate, DateTime pJvRevalueteDate, Int32 pUserID, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarForeignCurrencyRevaluation.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.CommandTimeout = 0;
                if (IsList == true)
                {

                    //@FromDate DATETIME, @ToDate DATETIME , @WhereClause NVarChar(MAX)
                    Com.Parameters.Add(new SqlParameter("@AccountIDs", SqlDbType.NChar));
                    Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@JvRevalueteDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ExRate", SqlDbType.Decimal));
                    Com.Parameters.Add(new SqlParameter("@RevaluteAccount", SqlDbType.Int));
                    Com.CommandText = "[dbo].[A_RevaluateCurrencySubAccountsForSafena]";
                    Com.Parameters[0].Value = pAccountIDs;
                    Com.Parameters[1].Value = pSubAccountsIDs;
                    Com.Parameters[2].Value = pCurrencyID;
                    Com.Parameters[3].Value = pUserID;
                    Com.Parameters[4].Value = pFromDate;
                    Com.Parameters[5].Value = pToDate;
                    Com.Parameters[6].Value = pJvRevalueteDate;
                    Com.Parameters[7].Value = pExRate;
                    Com.Parameters[8].Value = pRevaluteAccount;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    //  while (dr.Read())
                    //  {
                    /*Start DataReader*/
                    // CVarForeignCurrencyRevaluation ObjCVarForeignCurrencyRevaluation = new CVarForeignCurrencyRevaluation();
                    // ObjCVarForeignCurrencyRevaluation.mIsSucsess = Convert.ToInt32(dr["IsSucsess"].ToString());

                    // lstCVarForeignCurrencyRevaluation.Add(ObjCVarForeignCurrencyRevaluation);
                    // }
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
