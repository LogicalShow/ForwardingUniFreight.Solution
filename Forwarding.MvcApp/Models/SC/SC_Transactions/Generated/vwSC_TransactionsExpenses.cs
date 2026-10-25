using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SC.Transactions.Generated
{
    [Serializable]
    public class CPKvwSC_TransactionsExpenses
    {
        #region "variables"
        private Int64 mID;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarvwSC_TransactionsExpenses : CPKvwSC_TransactionsExpenses
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mExpensesID;
        internal Int32 mTransactionID;
        internal Int64 mPartnerTypeID;
        internal Int64 mPartnerID;
        internal String mNotes;
        internal String mTransactionCode;
        internal DateTime mTransactionDate;
        internal String mTransationTypeName;
        internal String mExpensesName;
        internal String mPartnerTypeName;
        internal String mPartnerName;
        internal Decimal mAmount;
        internal Int32 mCurrencyID;
        internal Decimal mExchangeRate;
        #endregion

        #region "Methods"
        public Int64 ExpensesID
        {
            get { return mExpensesID; }
            set { mExpensesID = value; }
        }
        public Int32 TransactionID
        {
            get { return mTransactionID; }
            set { mTransactionID = value; }
        }
        public Int64 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mPartnerTypeID = value; }
        }
        public Int64 PartnerID
        {
            get { return mPartnerID; }
            set { mPartnerID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public String TransactionCode
        {
            get { return mTransactionCode; }
            set { mTransactionCode = value; }
        }
        public DateTime TransactionDate
        {
            get { return mTransactionDate; }
            set { mTransactionDate = value; }
        }
        public String TransationTypeName
        {
            get { return mTransationTypeName; }
            set { mTransationTypeName = value; }
        }
        public String ExpensesName
        {
            get { return mExpensesName; }
            set { mExpensesName = value; }
        }
        public String PartnerTypeName
        {
            get { return mPartnerTypeName; }
            set { mPartnerTypeName = value; }
        }
        public String PartnerName
        {
            get { return mPartnerName; }
            set { mPartnerName = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mAmount = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mExchangeRate = value; }
        }
        #endregion

        #region Functions
        public Boolean GetIsChange()
        {
            return mIsChanges;
        }
        public void SetIsChange(Boolean IsChange)
        {
            mIsChanges = IsChange;
        }
        #endregion
    }

    public partial class CvwSC_TransactionsExpenses
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
        public List<CVarvwSC_TransactionsExpenses> lstCVarvwSC_TransactionsExpenses = new List<CVarvwSC_TransactionsExpenses>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string WhereClause)
        {
            return DataFill(WhereClause, true);
        }
        public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwSC_TransactionsExpenses.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSC_TransactionsExpenses";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwSC_TransactionsExpenses ObjCVarvwSC_TransactionsExpenses = new CVarvwSC_TransactionsExpenses();
                        ObjCVarvwSC_TransactionsExpenses.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mExpensesID = Convert.ToInt64(dr["ExpensesID"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mPartnerTypeID = Convert.ToInt64(dr["PartnerTypeID"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mPartnerID = Convert.ToInt64(dr["PartnerID"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mTransactionCode = Convert.ToString(dr["TransactionCode"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mTransationTypeName = Convert.ToString(dr["TransationTypeName"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mExpensesName = Convert.ToString(dr["ExpensesName"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mPartnerTypeName = Convert.ToString(dr["PartnerTypeName"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        lstCVarvwSC_TransactionsExpenses.Add(ObjCVarvwSC_TransactionsExpenses);
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

        private Exception DataFill(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotRecs)
        {
            Exception Exp = null;
            TotRecs = 0;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwSC_TransactionsExpenses.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingvwSC_TransactionsExpenses";
                Com.Parameters[0].Value = PageSize;
                Com.Parameters[1].Value = PageNumber;
                Com.Parameters[2].Value = WhereClause;
                Com.Parameters[3].Value = OrderBy;
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwSC_TransactionsExpenses ObjCVarvwSC_TransactionsExpenses = new CVarvwSC_TransactionsExpenses();
                        ObjCVarvwSC_TransactionsExpenses.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mExpensesID = Convert.ToInt64(dr["ExpensesID"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mPartnerTypeID = Convert.ToInt64(dr["PartnerTypeID"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mPartnerID = Convert.ToInt64(dr["PartnerID"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mTransactionCode = Convert.ToString(dr["TransactionCode"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mTransationTypeName = Convert.ToString(dr["TransationTypeName"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mExpensesName = Convert.ToString(dr["ExpensesName"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mPartnerTypeName = Convert.ToString(dr["PartnerTypeName"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSC_TransactionsExpenses.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSC_TransactionsExpenses.Add(ObjCVarvwSC_TransactionsExpenses);
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
