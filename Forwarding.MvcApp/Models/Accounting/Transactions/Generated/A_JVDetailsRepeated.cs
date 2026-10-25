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
    public class CPKA_JVDetailsRepeated
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
    public partial class CVarA_JVDetailsRepeated : CPKA_JVDetailsRepeated
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

    public partial class CA_JVDetailsRepeated
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
        public List<CVarA_JVDetailsRepeated> lstCVarA_JVDetailsRepeated = new List<CVarA_JVDetailsRepeated>();
        public List<CPKA_JVDetailsRepeated> lstDeletedCPKA_JVDetailsRepeated = new List<CPKA_JVDetailsRepeated>();
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
            lstCVarA_JVDetailsRepeated.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_JVDetailsRepeated";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_JVDetailsRepeated";
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
                        CVarA_JVDetailsRepeated ObjCVarA_JVDetailsRepeated = new CVarA_JVDetailsRepeated();
                        ObjCVarA_JVDetailsRepeated.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarA_JVDetailsRepeated.mJV_ID = Convert.ToInt64(dr["JV_ID"].ToString());
                        ObjCVarA_JVDetailsRepeated.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarA_JVDetailsRepeated.mSubAccount_ID = Convert.ToInt32(dr["SubAccount_ID"].ToString());
                        ObjCVarA_JVDetailsRepeated.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarA_JVDetailsRepeated.mDebit = Convert.ToDecimal(dr["Debit"].ToString());
                        ObjCVarA_JVDetailsRepeated.mCredit = Convert.ToDecimal(dr["Credit"].ToString());
                        ObjCVarA_JVDetailsRepeated.mCurrency_ID = Convert.ToInt32(dr["Currency_ID"].ToString());
                        ObjCVarA_JVDetailsRepeated.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarA_JVDetailsRepeated.mLocalDebit = Convert.ToDecimal(dr["LocalDebit"].ToString());
                        ObjCVarA_JVDetailsRepeated.mLocalCredit = Convert.ToDecimal(dr["LocalCredit"].ToString());
                        ObjCVarA_JVDetailsRepeated.mDescription = Convert.ToString(dr["Description"].ToString());
                        ObjCVarA_JVDetailsRepeated.mIsDocumented = Convert.ToBoolean(dr["IsDocumented"].ToString());
                        ObjCVarA_JVDetailsRepeated.mOperation_ID = Convert.ToInt64(dr["Operation_ID"].ToString());
                        ObjCVarA_JVDetailsRepeated.mBranch_ID = Convert.ToInt32(dr["Branch_ID"].ToString());
                        lstCVarA_JVDetailsRepeated.Add(ObjCVarA_JVDetailsRepeated);
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
            lstCVarA_JVDetailsRepeated.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_JVDetailsRepeated";
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
                        CVarA_JVDetailsRepeated ObjCVarA_JVDetailsRepeated = new CVarA_JVDetailsRepeated();
                        ObjCVarA_JVDetailsRepeated.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarA_JVDetailsRepeated.mJV_ID = Convert.ToInt64(dr["JV_ID"].ToString());
                        ObjCVarA_JVDetailsRepeated.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarA_JVDetailsRepeated.mSubAccount_ID = Convert.ToInt32(dr["SubAccount_ID"].ToString());
                        ObjCVarA_JVDetailsRepeated.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarA_JVDetailsRepeated.mDebit = Convert.ToDecimal(dr["Debit"].ToString());
                        ObjCVarA_JVDetailsRepeated.mCredit = Convert.ToDecimal(dr["Credit"].ToString());
                        ObjCVarA_JVDetailsRepeated.mCurrency_ID = Convert.ToInt32(dr["Currency_ID"].ToString());
                        ObjCVarA_JVDetailsRepeated.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarA_JVDetailsRepeated.mLocalDebit = Convert.ToDecimal(dr["LocalDebit"].ToString());
                        ObjCVarA_JVDetailsRepeated.mLocalCredit = Convert.ToDecimal(dr["LocalCredit"].ToString());
                        ObjCVarA_JVDetailsRepeated.mDescription = Convert.ToString(dr["Description"].ToString());
                        ObjCVarA_JVDetailsRepeated.mIsDocumented = Convert.ToBoolean(dr["IsDocumented"].ToString());
                        ObjCVarA_JVDetailsRepeated.mOperation_ID = Convert.ToInt64(dr["Operation_ID"].ToString());
                        ObjCVarA_JVDetailsRepeated.mBranch_ID = Convert.ToInt32(dr["Branch_ID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_JVDetailsRepeated.Add(ObjCVarA_JVDetailsRepeated);
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
                    Com.CommandText = "[dbo].DeleteListA_JVDetailsRepeated";
                else
                    Com.CommandText = "[dbo].UpdateListA_JVDetailsRepeated";
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
        public Exception DeleteItem(List<CPKA_JVDetailsRepeated> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_JVDetailsRepeated";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKA_JVDetailsRepeated ObjCPKA_JVDetailsRepeated in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKA_JVDetailsRepeated.ID);
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
        public Exception SaveMethod(List<CVarA_JVDetailsRepeated> SaveList)
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
                foreach (CVarA_JVDetailsRepeated ObjCVarA_JVDetailsRepeated in SaveList)
                {
                    if (ObjCVarA_JVDetailsRepeated.mIsChanges == true)
                    {
                        if (ObjCVarA_JVDetailsRepeated.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_JVDetailsRepeated";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_JVDetailsRepeated.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_JVDetailsRepeated";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_JVDetailsRepeated.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarA_JVDetailsRepeated.ID;
                        }
                        Com.Parameters["@JV_ID"].Value = ObjCVarA_JVDetailsRepeated.JV_ID;
                        Com.Parameters["@Account_ID"].Value = ObjCVarA_JVDetailsRepeated.Account_ID;
                        Com.Parameters["@SubAccount_ID"].Value = ObjCVarA_JVDetailsRepeated.SubAccount_ID;
                        Com.Parameters["@CostCenter_ID"].Value = ObjCVarA_JVDetailsRepeated.CostCenter_ID;
                        Com.Parameters["@Debit"].Value = ObjCVarA_JVDetailsRepeated.Debit;
                        Com.Parameters["@Credit"].Value = ObjCVarA_JVDetailsRepeated.Credit;
                        Com.Parameters["@Currency_ID"].Value = ObjCVarA_JVDetailsRepeated.Currency_ID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarA_JVDetailsRepeated.ExchangeRate;
                        Com.Parameters["@LocalDebit"].Value = ObjCVarA_JVDetailsRepeated.LocalDebit;
                        Com.Parameters["@LocalCredit"].Value = ObjCVarA_JVDetailsRepeated.LocalCredit;
                        Com.Parameters["@Description"].Value = ObjCVarA_JVDetailsRepeated.Description;
                        Com.Parameters["@IsDocumented"].Value = ObjCVarA_JVDetailsRepeated.IsDocumented;
                        Com.Parameters["@Operation_ID"].Value = ObjCVarA_JVDetailsRepeated.Operation_ID;
                        Com.Parameters["@Branch_ID"].Value = ObjCVarA_JVDetailsRepeated.Branch_ID;
                        EndTrans(Com, Con);
                        if (ObjCVarA_JVDetailsRepeated.ID == 0)
                        {
                            ObjCVarA_JVDetailsRepeated.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarA_JVDetailsRepeated.mIsChanges = false;
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
