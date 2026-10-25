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
    public class CPKSC_TransactionsExpenses
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
    public partial class CVarSC_TransactionsExpenses : CPKSC_TransactionsExpenses
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mExpensesID;
        internal Int32 mTransactionID;
        internal Int64 mPartnerTypeID;
        internal Int64 mPartnerID;
        internal String mNotes;
        internal Decimal mAmount;
        internal Int32 mCurrencyID;
        internal Decimal mExchangeRate;
        #endregion

        #region "Methods"
        public Int64 ExpensesID
        {
            get { return mExpensesID; }
            set { mIsChanges = true; mExpensesID = value; }
        }
        public Int32 TransactionID
        {
            get { return mTransactionID; }
            set { mIsChanges = true; mTransactionID = value; }
        }
        public Int64 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mIsChanges = true; mPartnerTypeID = value; }
        }
        public Int64 PartnerID
        {
            get { return mPartnerID; }
            set { mIsChanges = true; mPartnerID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mIsChanges = true; mAmount = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mIsChanges = true; mExchangeRate = value; }
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

    public partial class CSC_TransactionsExpenses
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
        public List<CVarSC_TransactionsExpenses> lstCVarSC_TransactionsExpenses = new List<CVarSC_TransactionsExpenses>();
        public List<CPKSC_TransactionsExpenses> lstDeletedCPKSC_TransactionsExpenses = new List<CPKSC_TransactionsExpenses>();
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
        public Exception GetItem(Int64 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarSC_TransactionsExpenses.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSC_TransactionsExpenses";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSC_TransactionsExpenses";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                    Com.Parameters[0].Value = Convert.ToInt64(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarSC_TransactionsExpenses ObjCVarSC_TransactionsExpenses = new CVarSC_TransactionsExpenses();
                        ObjCVarSC_TransactionsExpenses.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarSC_TransactionsExpenses.mExpensesID = Convert.ToInt64(dr["ExpensesID"].ToString());
                        ObjCVarSC_TransactionsExpenses.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarSC_TransactionsExpenses.mPartnerTypeID = Convert.ToInt64(dr["PartnerTypeID"].ToString());
                        ObjCVarSC_TransactionsExpenses.mPartnerID = Convert.ToInt64(dr["PartnerID"].ToString());
                        ObjCVarSC_TransactionsExpenses.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarSC_TransactionsExpenses.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarSC_TransactionsExpenses.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarSC_TransactionsExpenses.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        lstCVarSC_TransactionsExpenses.Add(ObjCVarSC_TransactionsExpenses);
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
            lstCVarSC_TransactionsExpenses.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSC_TransactionsExpenses";
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
                        CVarSC_TransactionsExpenses ObjCVarSC_TransactionsExpenses = new CVarSC_TransactionsExpenses();
                        ObjCVarSC_TransactionsExpenses.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarSC_TransactionsExpenses.mExpensesID = Convert.ToInt64(dr["ExpensesID"].ToString());
                        ObjCVarSC_TransactionsExpenses.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarSC_TransactionsExpenses.mPartnerTypeID = Convert.ToInt64(dr["PartnerTypeID"].ToString());
                        ObjCVarSC_TransactionsExpenses.mPartnerID = Convert.ToInt64(dr["PartnerID"].ToString());
                        ObjCVarSC_TransactionsExpenses.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarSC_TransactionsExpenses.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarSC_TransactionsExpenses.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarSC_TransactionsExpenses.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSC_TransactionsExpenses.Add(ObjCVarSC_TransactionsExpenses);
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
        #region "Common Methods"
        private void BeginTrans(SqlCommand Com, SqlConnection Con)
        {

            tr = Con.BeginTransaction(IsolationLevel.Serializable);
            Com.CommandType = CommandType.StoredProcedure;
        }

        private void EndTrans(SqlCommand Com, SqlConnection Con)
        {

            Com.Transaction = tr;
            Com.Connection = Con;
            Com.ExecuteNonQuery();
            tr.Commit();
        }

        #endregion
        #region "Set List Method"
        private Exception SetList(string WhereClause, Boolean IsDelete)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListSC_TransactionsExpenses";
                else
                    Com.CommandText = "[dbo].UpdateListSC_TransactionsExpenses";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                BeginTrans(Com, Con);
                Com.Parameters[0].Value = WhereClause;
                EndTrans(Com, Con);
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
        #region "Delete Methods"
        public Exception DeleteItem(List<CPKSC_TransactionsExpenses> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSC_TransactionsExpenses";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKSC_TransactionsExpenses ObjCPKSC_TransactionsExpenses in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKSC_TransactionsExpenses.ID);
                    EndTrans(Com, Con);
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                Con.Close();
                Con.Dispose();
                DeleteList.Clear();
            }
            return Exp;
        }

        public Exception DeleteList(string WhereClause)
        {

            return SetList(WhereClause, true);
        }

        #endregion
        #region "Save Methods"
        public Exception SaveMethod(List<CVarSC_TransactionsExpenses> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@ExpensesID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@TransactionID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PartnerTypeID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@PartnerID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Amount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSC_TransactionsExpenses ObjCVarSC_TransactionsExpenses in SaveList)
                {
                    if (ObjCVarSC_TransactionsExpenses.mIsChanges == true)
                    {
                        if (ObjCVarSC_TransactionsExpenses.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSC_TransactionsExpenses";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSC_TransactionsExpenses.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSC_TransactionsExpenses";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSC_TransactionsExpenses.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSC_TransactionsExpenses.ID;
                        }
                        Com.Parameters["@ExpensesID"].Value = ObjCVarSC_TransactionsExpenses.ExpensesID;
                        Com.Parameters["@TransactionID"].Value = ObjCVarSC_TransactionsExpenses.TransactionID;
                        Com.Parameters["@PartnerTypeID"].Value = ObjCVarSC_TransactionsExpenses.PartnerTypeID;
                        Com.Parameters["@PartnerID"].Value = ObjCVarSC_TransactionsExpenses.PartnerID;
                        Com.Parameters["@Notes"].Value = ObjCVarSC_TransactionsExpenses.Notes;
                        Com.Parameters["@Amount"].Value = ObjCVarSC_TransactionsExpenses.Amount;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarSC_TransactionsExpenses.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarSC_TransactionsExpenses.ExchangeRate;
                        EndTrans(Com, Con);
                        if (ObjCVarSC_TransactionsExpenses.ID == 0)
                        {
                            ObjCVarSC_TransactionsExpenses.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSC_TransactionsExpenses.mIsChanges = false;
                    }
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
                if (tr != null)
                    tr.Rollback();
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return Exp;
        }
        #endregion
        #region "Update Methods"
        public Exception UpdateList(string UpdateClause)
        {

            return SetList(UpdateClause, false);
        }

        #endregion
    }


}
