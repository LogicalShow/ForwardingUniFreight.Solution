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
    public class CPKSC_TransactionsExpensesTaxes
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
    public partial class CVarSC_TransactionsExpensesTaxes : CPKSC_TransactionsExpensesTaxes
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mTaxID;
        internal Decimal mTaxValue;
        internal Decimal mTaxAmount;
        internal Int32 mTransactionID;
        internal Boolean mIsPercentage;
        #endregion

        #region "Methods"
        public Int32 TaxID
        {
            get { return mTaxID; }
            set { mIsChanges = true; mTaxID = value; }
        }
        public Decimal TaxValue
        {
            get { return mTaxValue; }
            set { mIsChanges = true; mTaxValue = value; }
        }
        public Decimal TaxAmount
        {
            get { return mTaxAmount; }
            set { mIsChanges = true; mTaxAmount = value; }
        }
        public Int32 TransactionID
        {
            get { return mTransactionID; }
            set { mIsChanges = true; mTransactionID = value; }
        }
        public Boolean IsPercentage
        {
            get { return mIsPercentage; }
            set { mIsChanges = true; mIsPercentage = value; }
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

    public partial class CSC_TransactionsExpensesTaxes
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
        public List<CVarSC_TransactionsExpensesTaxes> lstCVarSC_TransactionsExpensesTaxes = new List<CVarSC_TransactionsExpensesTaxes>();
        public List<CPKSC_TransactionsExpensesTaxes> lstDeletedCPKSC_TransactionsExpensesTaxes = new List<CPKSC_TransactionsExpensesTaxes>();
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
            lstCVarSC_TransactionsExpensesTaxes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSC_TransactionsExpensesTaxes";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSC_TransactionsExpensesTaxes";
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
                        CVarSC_TransactionsExpensesTaxes ObjCVarSC_TransactionsExpensesTaxes = new CVarSC_TransactionsExpensesTaxes();
                        ObjCVarSC_TransactionsExpensesTaxes.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarSC_TransactionsExpensesTaxes.mTaxID = Convert.ToInt32(dr["TaxID"].ToString());
                        ObjCVarSC_TransactionsExpensesTaxes.mTaxValue = Convert.ToDecimal(dr["TaxValue"].ToString());
                        ObjCVarSC_TransactionsExpensesTaxes.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarSC_TransactionsExpensesTaxes.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarSC_TransactionsExpensesTaxes.mIsPercentage = Convert.ToBoolean(dr["IsPercentage"].ToString());
                        lstCVarSC_TransactionsExpensesTaxes.Add(ObjCVarSC_TransactionsExpensesTaxes);
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
            lstCVarSC_TransactionsExpensesTaxes.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSC_TransactionsExpensesTaxes";
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
                        CVarSC_TransactionsExpensesTaxes ObjCVarSC_TransactionsExpensesTaxes = new CVarSC_TransactionsExpensesTaxes();
                        ObjCVarSC_TransactionsExpensesTaxes.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarSC_TransactionsExpensesTaxes.mTaxID = Convert.ToInt32(dr["TaxID"].ToString());
                        ObjCVarSC_TransactionsExpensesTaxes.mTaxValue = Convert.ToDecimal(dr["TaxValue"].ToString());
                        ObjCVarSC_TransactionsExpensesTaxes.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarSC_TransactionsExpensesTaxes.mTransactionID = Convert.ToInt32(dr["TransactionID"].ToString());
                        ObjCVarSC_TransactionsExpensesTaxes.mIsPercentage = Convert.ToBoolean(dr["IsPercentage"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSC_TransactionsExpensesTaxes.Add(ObjCVarSC_TransactionsExpensesTaxes);
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
                    Com.CommandText = "[dbo].DeleteListSC_TransactionsExpensesTaxes";
                else
                    Com.CommandText = "[dbo].UpdateListSC_TransactionsExpensesTaxes";
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
        public Exception DeleteItem(List<CPKSC_TransactionsExpensesTaxes> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSC_TransactionsExpensesTaxes";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKSC_TransactionsExpensesTaxes ObjCPKSC_TransactionsExpensesTaxes in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKSC_TransactionsExpensesTaxes.ID);
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
        public Exception SaveMethod(List<CVarSC_TransactionsExpensesTaxes> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@TaxID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TaxValue", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TaxAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TransactionID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsPercentage", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSC_TransactionsExpensesTaxes ObjCVarSC_TransactionsExpensesTaxes in SaveList)
                {
                    if (ObjCVarSC_TransactionsExpensesTaxes.mIsChanges == true)
                    {
                        if (ObjCVarSC_TransactionsExpensesTaxes.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSC_TransactionsExpensesTaxes";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSC_TransactionsExpensesTaxes.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSC_TransactionsExpensesTaxes";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSC_TransactionsExpensesTaxes.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSC_TransactionsExpensesTaxes.ID;
                        }
                        Com.Parameters["@TaxID"].Value = ObjCVarSC_TransactionsExpensesTaxes.TaxID;
                        Com.Parameters["@TaxValue"].Value = ObjCVarSC_TransactionsExpensesTaxes.TaxValue;
                        Com.Parameters["@TaxAmount"].Value = ObjCVarSC_TransactionsExpensesTaxes.TaxAmount;
                        Com.Parameters["@TransactionID"].Value = ObjCVarSC_TransactionsExpensesTaxes.TransactionID;
                        Com.Parameters["@IsPercentage"].Value = ObjCVarSC_TransactionsExpensesTaxes.IsPercentage;
                        EndTrans(Com, Con);
                        if (ObjCVarSC_TransactionsExpensesTaxes.ID == 0)
                        {
                            ObjCVarSC_TransactionsExpensesTaxes.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSC_TransactionsExpensesTaxes.mIsChanges = false;
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
