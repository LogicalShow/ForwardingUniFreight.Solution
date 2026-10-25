using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;

namespace Forwarding.MvcApp.Models.Accounting.Transactions.Generated
{
    [Serializable]
    public class CPKDailyExchangeRate
    {
        #region "variables"
        private Int32 mID;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarDailyExchangeRate : CPKDailyExchangeRate
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mFromCurrencyID;
        internal Int32 mToCurrencyID;
        internal DateTime mFromDate;
        internal DateTime mToDate;
        internal Decimal mExchangeRate;
        internal Int32 mRegUserID;
        internal DateTime mRegDate;
        internal Int32? mUpdateUserID;
        internal DateTime? mUpdateDate;
        internal String mRemarks;
        internal String mFromCurCode;
        internal String mFromCurName;
        internal String mToCurCode;
        internal String mToCurName;
        #endregion

        #region "Methods"
        public Int32 FromCurrencyID
        {
            get { return mFromCurrencyID; }
            set { mIsChanges = true; mFromCurrencyID = value; }
        }
        public Int32 ToCurrencyID
        {
            get { return mToCurrencyID; }
            set { mIsChanges = true; mToCurrencyID = value; }
        }
        public DateTime FromDate
        {
            get { return mFromDate; }
            set { mIsChanges = true; mFromDate = value; }
        }
        public DateTime ToDate
        {
            get { return mToDate; }
            set { mIsChanges = true; mToDate = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mIsChanges = true; mExchangeRate = value; }
        }
        public Int32 RegUserID
        {
            get { return mRegUserID; }
            set { mIsChanges = true; mRegUserID = value; }
        }
        public DateTime RegDate
        {
            get { return mRegDate; }
            set { mIsChanges = true; mRegDate = value; }
        }
        public Int32? UpdateUserID
        {
            get { return mUpdateUserID; }
            set { mIsChanges = true; mUpdateUserID = value; }
        }
        public DateTime? UpdateDate
        {
            get { return mUpdateDate; }
            set { mIsChanges = true; mUpdateDate = value; }
        }
        public String Remarks
        {
            get { return mRemarks; }
            set { mIsChanges = true; mRemarks = value; }
        }
        public String FromCurCode
        {
            get { return mFromCurCode; }
            set { mIsChanges = true; mFromCurCode = value; }
        }
        public String ToCurCode
        {
            get { return mToCurCode; }
            set { mIsChanges = true; mToCurCode = value; }
        }
        public String FromCurName
        {
            get { return mFromCurName; }
            set { mIsChanges = true; mFromCurName = value; }
        }
        public String ToCurName
        {
            get { return mToCurName; }
            set { mIsChanges = true; mToCurName = value; }
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

    public partial class CDailyExchangeRate
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
        public List<CVarDailyExchangeRate> lstCVarDailyExchangeRate = new List<CVarDailyExchangeRate>();
        public List<CPKDailyExchangeRate> lstDeletedCPKDailyExchangeRate = new List<CPKDailyExchangeRate>();
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
        public Exception GetItem(Int32 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarDailyExchangeRate.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListDailyExchangeRate";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemDailyExchangeRate";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                    Com.Parameters[0].Value = Convert.ToInt32(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarDailyExchangeRate ObjCVarDailyExchangeRate = new CVarDailyExchangeRate();
                        ObjCVarDailyExchangeRate.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarDailyExchangeRate.mFromCurrencyID = Convert.ToInt32(dr["FromCurrencyID"].ToString());
                        ObjCVarDailyExchangeRate.mToCurrencyID = Convert.ToInt32(dr["ToCurrencyID"].ToString());
                        ObjCVarDailyExchangeRate.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarDailyExchangeRate.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarDailyExchangeRate.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarDailyExchangeRate.mRegUserID = Convert.ToInt32(dr["RegUserID"].ToString());
                        ObjCVarDailyExchangeRate.mRegDate = Convert.ToDateTime(dr["RegDate"].ToString());
                        ObjCVarDailyExchangeRate.mUpdateUserID = Convert.ToInt32(dr["UpdateUserID"].ToString());
                        ObjCVarDailyExchangeRate.mUpdateDate = Convert.ToDateTime(dr["UpdateDate"].ToString());
                        ObjCVarDailyExchangeRate.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        lstCVarDailyExchangeRate.Add(ObjCVarDailyExchangeRate);
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
            lstCVarDailyExchangeRate.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingDailyExchangeRate";
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
                        CVarDailyExchangeRate ObjCVarDailyExchangeRate = new CVarDailyExchangeRate();
                        ObjCVarDailyExchangeRate.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarDailyExchangeRate.mFromCurrencyID = Convert.ToInt32(dr["FromCurrencyID"].ToString());
                        ObjCVarDailyExchangeRate.mToCurrencyID = Convert.ToInt32(dr["ToCurrencyID"].ToString());
                        ObjCVarDailyExchangeRate.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarDailyExchangeRate.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarDailyExchangeRate.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarDailyExchangeRate.mRegUserID = Convert.ToInt32(dr["RegUserID"].ToString());
                        ObjCVarDailyExchangeRate.mRegDate = Convert.ToDateTime(dr["RegDate"].ToString());
                        ObjCVarDailyExchangeRate.mUpdateUserID = Convert.ToInt32(dr["UpdateUserID"].ToString());
                        ObjCVarDailyExchangeRate.mUpdateDate = Convert.ToDateTime(dr["UpdateDate"].ToString());
                        ObjCVarDailyExchangeRate.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarDailyExchangeRate.mFromCurCode = GetCur(ObjCVarDailyExchangeRate.mFromCurrencyID.ToString()).Code;
                        ObjCVarDailyExchangeRate.mToCurCode = GetCur(ObjCVarDailyExchangeRate.mToCurrencyID.ToString()).Code;

                        ObjCVarDailyExchangeRate.mFromCurName = GetCur(ObjCVarDailyExchangeRate.mFromCurrencyID.ToString()).Name;
                        ObjCVarDailyExchangeRate.mToCurName = GetCur(ObjCVarDailyExchangeRate.mToCurrencyID.ToString()).Name;
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarDailyExchangeRate.Add(ObjCVarDailyExchangeRate);
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


        public CVarCurrencies GetCur(string Param)
        {
            // List<CVarCurrency> lstCVarCurrency = new List<CVarCurrency>();
            CVarCurrencies currency = new CVarCurrencies();
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;

            Con.Open();
            tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
            Com = new SqlCommand();
            Com.CommandType = CommandType.StoredProcedure;

            Com.CommandText = "[dbo].GetItemCurrency";
            Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
            Com.Parameters[0].Value = Convert.ToInt32(Param);

            Com.Transaction = tr;
            Com.Connection = Con;
            dr = Com.ExecuteReader();
            while (dr.Read())
            {
                /*Start DataReader*/

                currency.ID = Convert.ToInt32(dr["ID"].ToString());
                currency.mCode = Convert.ToString(dr["Code"].ToString());
                currency.mName = Convert.ToString(dr["Name"].ToString());
                currency.mNotes = Convert.ToString(dr["Notes"].ToString());

            }


            if (dr != null)
            {
                dr.Close();
                dr.Dispose();
            }

            tr.Commit();


            Con.Close();
            Con.Dispose();

            return currency;
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
                    Com.CommandText = "[dbo].DeleteListDailyExchangeRate";
                else
                    Com.CommandText = "[dbo].UpdateListDailyExchangeRate";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
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
        public Exception DeleteItem(List<CPKDailyExchangeRate> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemDailyExchangeRate";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKDailyExchangeRate ObjCPKDailyExchangeRate in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKDailyExchangeRate.ID);
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
        public Exception SaveMethod(List<CVarDailyExchangeRate> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@FromCurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ToCurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@RegUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@RegDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@UpdateUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@UpdateDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Remarks", SqlDbType.VarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarDailyExchangeRate ObjCVarDailyExchangeRate in SaveList)
                {
                    if (ObjCVarDailyExchangeRate.mIsChanges == true)
                    {
                        if (ObjCVarDailyExchangeRate.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemDailyExchangeRate";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarDailyExchangeRate.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemDailyExchangeRate";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarDailyExchangeRate.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarDailyExchangeRate.ID;
                        }
                        Com.Parameters["@FromCurrencyID"].Value = ObjCVarDailyExchangeRate.FromCurrencyID;
                        Com.Parameters["@ToCurrencyID"].Value = ObjCVarDailyExchangeRate.ToCurrencyID;
                        Com.Parameters["@FromDate"].Value = ObjCVarDailyExchangeRate.FromDate;
                        Com.Parameters["@ToDate"].Value = ObjCVarDailyExchangeRate.ToDate;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarDailyExchangeRate.ExchangeRate;
                        Com.Parameters["@RegUserID"].Value = ObjCVarDailyExchangeRate.RegUserID;
                        Com.Parameters["@RegDate"].Value = ObjCVarDailyExchangeRate.RegDate;

                        if (ObjCVarDailyExchangeRate.UpdateUserID == null)
                        {
                            Com.Parameters["@UpdateUserID"].Value = DBNull.Value;

                        }
                        else
                        {
                            Com.Parameters["@UpdateUserID"].Value = ObjCVarDailyExchangeRate.UpdateUserID;

                        }

                        if (ObjCVarDailyExchangeRate.UpdateDate == null)
                        {
                            Com.Parameters["@UpdateDate"].Value = DBNull.Value;

                        }
                        else
                        {
                            Com.Parameters["@UpdateDate"].Value = ObjCVarDailyExchangeRate.UpdateDate;

                        }
                        Com.Parameters["@Remarks"].Value = ObjCVarDailyExchangeRate.Remarks;
                        EndTrans(Com, Con);
                        if (ObjCVarDailyExchangeRate.ID == 0)
                        {
                            ObjCVarDailyExchangeRate.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarDailyExchangeRate.mIsChanges = false;
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