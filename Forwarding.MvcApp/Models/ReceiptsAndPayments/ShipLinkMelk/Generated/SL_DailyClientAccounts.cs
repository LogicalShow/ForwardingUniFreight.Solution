using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkMelk.Generated
{
    [Serializable]
    public class CPKSL_DailyClientAccounts
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
    public partial class CVarSL_DailyClientAccounts : CPKSL_DailyClientAccounts
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mAccountID;
        internal Int32 mSubAccountID;
        internal Int64 mClientID;
        internal Int32 mCurrencyID;
        #endregion

        #region "Methods"
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mIsChanges = true; mAccountID = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mIsChanges = true; mSubAccountID = value; }
        }
        public Int64 ClientID
        {
            get { return mClientID; }
            set { mIsChanges = true; mClientID = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
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

    public partial class CSL_DailyClientAccounts
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
        public List<CVarSL_DailyClientAccounts> lstCVarSL_DailyClientAccounts = new List<CVarSL_DailyClientAccounts>();
        public List<CPKSL_DailyClientAccounts> lstDeletedCPKSL_DailyClientAccounts = new List<CPKSL_DailyClientAccounts>();
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
            lstCVarSL_DailyClientAccounts.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSL_DailyClientAccounts";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSL_DailyClientAccounts";
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
                        CVarSL_DailyClientAccounts ObjCVarSL_DailyClientAccounts = new CVarSL_DailyClientAccounts();
                        ObjCVarSL_DailyClientAccounts.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSL_DailyClientAccounts.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarSL_DailyClientAccounts.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarSL_DailyClientAccounts.mClientID = Convert.ToInt64(dr["ClientID"].ToString());
                        ObjCVarSL_DailyClientAccounts.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        lstCVarSL_DailyClientAccounts.Add(ObjCVarSL_DailyClientAccounts);
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
            lstCVarSL_DailyClientAccounts.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSL_DailyClientAccounts";
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
                        CVarSL_DailyClientAccounts ObjCVarSL_DailyClientAccounts = new CVarSL_DailyClientAccounts();
                        ObjCVarSL_DailyClientAccounts.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSL_DailyClientAccounts.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarSL_DailyClientAccounts.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarSL_DailyClientAccounts.mClientID = Convert.ToInt64(dr["ClientID"].ToString());
                        ObjCVarSL_DailyClientAccounts.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSL_DailyClientAccounts.Add(ObjCVarSL_DailyClientAccounts);
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
                    Com.CommandText = "[dbo].DeleteListSL_DailyClientAccounts";
                else
                    Com.CommandText = "[dbo].UpdateListSL_DailyClientAccounts";
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
        public Exception DeleteItem(List<CPKSL_DailyClientAccounts> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSL_DailyClientAccounts";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKSL_DailyClientAccounts ObjCPKSL_DailyClientAccounts in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKSL_DailyClientAccounts.ID);
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
        public Exception SaveMethod(List<CVarSL_DailyClientAccounts> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@AccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ClientID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSL_DailyClientAccounts ObjCVarSL_DailyClientAccounts in SaveList)
                {
                    if (ObjCVarSL_DailyClientAccounts.mIsChanges == true)
                    {
                        if (ObjCVarSL_DailyClientAccounts.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSL_DailyClientAccounts";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSL_DailyClientAccounts.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSL_DailyClientAccounts";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSL_DailyClientAccounts.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSL_DailyClientAccounts.ID;
                        }
                        Com.Parameters["@AccountID"].Value = ObjCVarSL_DailyClientAccounts.AccountID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarSL_DailyClientAccounts.SubAccountID;
                        Com.Parameters["@ClientID"].Value = ObjCVarSL_DailyClientAccounts.ClientID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarSL_DailyClientAccounts.CurrencyID;
                        EndTrans(Com, Con);
                        if (ObjCVarSL_DailyClientAccounts.ID == 0)
                        {
                            ObjCVarSL_DailyClientAccounts.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSL_DailyClientAccounts.mIsChanges = false;
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
