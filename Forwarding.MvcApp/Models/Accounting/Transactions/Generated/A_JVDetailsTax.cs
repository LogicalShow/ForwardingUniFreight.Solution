using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
using Forwarding.MvcApp.Models.Sales.Transactions.Generated.Payments.Generated;

namespace Forwarding.MvcApp.Models.Accounting.Transactions.Generated
{
    [Serializable]
    public class CPKA_JVDetailsTax
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
    public partial class CVarA_JVDetailsTax : CPKA_JVDetailsTax
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mJV_ID;
        internal Int32 mAccount_ID;
        internal Int32 mSubAccount_ID;
        internal Int32 mCostCenter_ID;
        internal Decimal mDebit;
        internal Decimal mCredit;
        internal Int32 mCurrency_ID;
        internal Decimal mExchangeRate;
        internal Decimal mLocalDebit;
        internal Decimal mLocalCredit;
        internal String mDescription;
        internal Boolean mIsDocumented;
        internal Int64 mOperation_ID;
        internal Int32 mBranch_ID;
        #endregion

        #region "Methods"
        public Int64 JV_ID
        {
            get { return mJV_ID; }
            set { mIsChanges = true; mJV_ID = value; }
        }
        public Int32 Account_ID
        {
            get { return mAccount_ID; }
            set { mIsChanges = true; mAccount_ID = value; }
        }
        public Int32 SubAccount_ID
        {
            get { return mSubAccount_ID; }
            set { mIsChanges = true; mSubAccount_ID = value; }
        }
        public Int32 CostCenter_ID
        {
            get { return mCostCenter_ID; }
            set { mIsChanges = true; mCostCenter_ID = value; }
        }
        public Decimal Debit
        {
            get { return mDebit; }
            set { mIsChanges = true; mDebit = value; }
        }
        public Decimal Credit
        {
            get { return mCredit; }
            set { mIsChanges = true; mCredit = value; }
        }
        public Int32 Currency_ID
        {
            get { return mCurrency_ID; }
            set { mIsChanges = true; mCurrency_ID = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mIsChanges = true; mExchangeRate = value; }
        }
        public Decimal LocalDebit
        {
            get { return mLocalDebit; }
            set { mIsChanges = true; mLocalDebit = value; }
        }
        public Decimal LocalCredit
        {
            get { return mLocalCredit; }
            set { mIsChanges = true; mLocalCredit = value; }
        }
        public String Description
        {
            get { return mDescription; }
            set { mIsChanges = true; mDescription = value; }
        }
        public Boolean IsDocumented
        {
            get { return mIsDocumented; }
            set { mIsChanges = true; mIsDocumented = value; }
        }
        public Int64 Operation_ID
        {
            get { return mOperation_ID; }
            set { mIsChanges = true; mOperation_ID = value; }
        }
        public Int32 Branch_ID
        {
            get { return mBranch_ID; }
            set { mIsChanges = true; mBranch_ID = value; }
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

    public partial class CA_JVDetailsTax
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
        public List<CVarA_JVDetailsTax> lstCVarA_JVDetailsTax = new List<CVarA_JVDetailsTax>();
        public List<CPKA_JVDetailsTax> lstDeletedCPKA_JVDetailsTax = new List<CPKA_JVDetailsTax>();
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
            lstCVarA_JVDetailsTax.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_JVDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_JVDetails";
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
                        CVarA_JVDetailsTax ObjCVarA_JVDetailsTax = new CVarA_JVDetailsTax();
                        ObjCVarA_JVDetailsTax.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarA_JVDetailsTax.mJV_ID = Convert.ToInt64(dr["JV_ID"].ToString());
                        ObjCVarA_JVDetailsTax.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarA_JVDetailsTax.mSubAccount_ID = Convert.ToInt32(dr["SubAccount_ID"].ToString());
                        ObjCVarA_JVDetailsTax.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarA_JVDetailsTax.mDebit = Convert.ToDecimal(dr["Debit"].ToString());
                        ObjCVarA_JVDetailsTax.mCredit = Convert.ToDecimal(dr["Credit"].ToString());
                        ObjCVarA_JVDetailsTax.mCurrency_ID = Convert.ToInt32(dr["Currency_ID"].ToString());
                        ObjCVarA_JVDetailsTax.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarA_JVDetailsTax.mLocalDebit = Convert.ToDecimal(dr["LocalDebit"].ToString());
                        ObjCVarA_JVDetailsTax.mLocalCredit = Convert.ToDecimal(dr["LocalCredit"].ToString());
                        ObjCVarA_JVDetailsTax.mDescription = Convert.ToString(dr["Description"].ToString());
                        ObjCVarA_JVDetailsTax.mIsDocumented = Convert.ToBoolean(dr["IsDocumented"].ToString());
                        ObjCVarA_JVDetailsTax.mOperation_ID = Convert.ToInt64(dr["Operation_ID"].ToString());
                        ObjCVarA_JVDetailsTax.mBranch_ID = Convert.ToInt32(dr["Branch_ID"].ToString());
                        lstCVarA_JVDetailsTax.Add(ObjCVarA_JVDetailsTax);
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
            lstCVarA_JVDetailsTax.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_JVDetails";
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
                        CVarA_JVDetailsTax ObjCVarA_JVDetailsTax = new CVarA_JVDetailsTax();
                        ObjCVarA_JVDetailsTax.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarA_JVDetailsTax.mJV_ID = Convert.ToInt64(dr["JV_ID"].ToString());
                        ObjCVarA_JVDetailsTax.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarA_JVDetailsTax.mSubAccount_ID = Convert.ToInt32(dr["SubAccount_ID"].ToString());
                        ObjCVarA_JVDetailsTax.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarA_JVDetailsTax.mDebit = Convert.ToDecimal(dr["Debit"].ToString());
                        ObjCVarA_JVDetailsTax.mCredit = Convert.ToDecimal(dr["Credit"].ToString());
                        ObjCVarA_JVDetailsTax.mCurrency_ID = Convert.ToInt32(dr["Currency_ID"].ToString());
                        ObjCVarA_JVDetailsTax.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarA_JVDetailsTax.mLocalDebit = Convert.ToDecimal(dr["LocalDebit"].ToString());
                        ObjCVarA_JVDetailsTax.mLocalCredit = Convert.ToDecimal(dr["LocalCredit"].ToString());
                        ObjCVarA_JVDetailsTax.mDescription = Convert.ToString(dr["Description"].ToString());
                        ObjCVarA_JVDetailsTax.mIsDocumented = Convert.ToBoolean(dr["IsDocumented"].ToString());
                        ObjCVarA_JVDetailsTax.mOperation_ID = Convert.ToInt64(dr["Operation_ID"].ToString());
                        ObjCVarA_JVDetailsTax.mBranch_ID = Convert.ToInt32(dr["Branch_ID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_JVDetailsTax.Add(ObjCVarA_JVDetailsTax);
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
                    Com.CommandText = "[dbo].DeleteListA_JVDetails";
                else
                    Com.CommandText = "[dbo].UpdateListA_JVDetails";
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
        public Exception DeleteItem(List<CPKA_JVDetailsTax> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_JVDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKA_JVDetailsTax ObjCPKA_JVDetailsTax in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKA_JVDetailsTax.ID);
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
        public Exception SaveMethod(List<CVarA_JVDetailsTax> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@JV_ID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Account_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccount_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenter_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Debit", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Credit", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Currency_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@LocalDebit", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@LocalCredit", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Description", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsDocumented", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Operation_ID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Branch_ID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarA_JVDetailsTax ObjCVarA_JVDetailsTax in SaveList)
                {
                    if (ObjCVarA_JVDetailsTax.mIsChanges == true)
                    {
                        if (ObjCVarA_JVDetailsTax.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_JVDetailsTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_JVDetailsTax.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_JVDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_JVDetailsTax.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarA_JVDetailsTax.ID;
                        }
                        Com.Parameters["@JV_ID"].Value = ObjCVarA_JVDetailsTax.JV_ID;
                        Com.Parameters["@Account_ID"].Value = ObjCVarA_JVDetailsTax.Account_ID;
                        Com.Parameters["@SubAccount_ID"].Value = ObjCVarA_JVDetailsTax.SubAccount_ID;
                        Com.Parameters["@CostCenter_ID"].Value = ObjCVarA_JVDetailsTax.CostCenter_ID;
                        Com.Parameters["@Debit"].Value = ObjCVarA_JVDetailsTax.Debit;
                        Com.Parameters["@Credit"].Value = ObjCVarA_JVDetailsTax.Credit;
                        Com.Parameters["@Currency_ID"].Value = ObjCVarA_JVDetailsTax.Currency_ID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarA_JVDetailsTax.ExchangeRate;
                        Com.Parameters["@LocalDebit"].Value = ObjCVarA_JVDetailsTax.LocalDebit;
                        Com.Parameters["@LocalCredit"].Value = ObjCVarA_JVDetailsTax.LocalCredit;
                        Com.Parameters["@Description"].Value = ObjCVarA_JVDetailsTax.Description;
                        Com.Parameters["@IsDocumented"].Value = ObjCVarA_JVDetailsTax.IsDocumented;
                        Com.Parameters["@Operation_ID"].Value = ObjCVarA_JVDetailsTax.Operation_ID;
                        Com.Parameters["@Branch_ID"].Value = ObjCVarA_JVDetailsTax.Branch_ID;
                        EndTrans(Com, Con);
                        if (ObjCVarA_JVDetailsTax.ID == 0)
                        {
                            ObjCVarA_JVDetailsTax.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarA_JVDetailsTax.mIsChanges = false;
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
