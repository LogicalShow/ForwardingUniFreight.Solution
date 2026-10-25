using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Invoicing.Generated
{
    [Serializable]
    public class CPKLogExchangeRate
    {
        #region "variables"
        private Int32 mLogExchangeRateID;
        #endregion

        #region "Methods"
        public Int32 LogExchangeRateID
        {
            get { return mLogExchangeRateID; }
            set { mLogExchangeRateID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarLogExchangeRate : CPKLogExchangeRate
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCurrencyCode;
        internal Decimal mExchangeRate;
        internal DateTime mExchangeRateDate;
        internal String mActionTaken;
        internal Int32 mCurrencyID;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Boolean mIsDeleted;
        #endregion

        #region "Methods"
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mIsChanges = true; mCurrencyCode = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mIsChanges = true; mExchangeRate = value; }
        }
        public DateTime ExchangeRateDate
        {
            get { return mExchangeRateDate; }
            set { mIsChanges = true; mExchangeRateDate = value; }
        }
        public String ActionTaken
        {
            get { return mActionTaken; }
            set { mIsChanges = true; mActionTaken = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mIsChanges = true; mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mIsChanges = true; mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mIsChanges = true; mModificationDate = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
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

    public partial class CLogExchangeRate
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
        public List<CVarLogExchangeRate> lstCVarLogExchangeRate = new List<CVarLogExchangeRate>();
        public List<CPKLogExchangeRate> lstDeletedCPKLogExchangeRate = new List<CPKLogExchangeRate>();
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
        public Exception GetItem(Int32 LogExchangeRateID)
        {
            return DataFill(Convert.ToString(LogExchangeRateID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarLogExchangeRate.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListLogExchangeRate";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemLogExchangeRate";
                    Com.Parameters.Add(new SqlParameter("@LogExchangeRateID", SqlDbType.Int));
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
                        CVarLogExchangeRate ObjCVarLogExchangeRate = new CVarLogExchangeRate();
                        ObjCVarLogExchangeRate.LogExchangeRateID = Convert.ToInt32(dr["LogExchangeRateID"].ToString());
                        ObjCVarLogExchangeRate.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarLogExchangeRate.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarLogExchangeRate.mExchangeRateDate = Convert.ToDateTime(dr["ExchangeRateDate"].ToString());
                        ObjCVarLogExchangeRate.mActionTaken = Convert.ToString(dr["ActionTaken"].ToString());
                        ObjCVarLogExchangeRate.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarLogExchangeRate.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarLogExchangeRate.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarLogExchangeRate.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarLogExchangeRate.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarLogExchangeRate.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        lstCVarLogExchangeRate.Add(ObjCVarLogExchangeRate);
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
            lstCVarLogExchangeRate.Clear();

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
                Com.CommandText = "[dbo].GetListPagingLogExchangeRate";
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
                        CVarLogExchangeRate ObjCVarLogExchangeRate = new CVarLogExchangeRate();
                        ObjCVarLogExchangeRate.LogExchangeRateID = Convert.ToInt32(dr["LogExchangeRateID"].ToString());
                        ObjCVarLogExchangeRate.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarLogExchangeRate.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarLogExchangeRate.mExchangeRateDate = Convert.ToDateTime(dr["ExchangeRateDate"].ToString());
                        ObjCVarLogExchangeRate.mActionTaken = Convert.ToString(dr["ActionTaken"].ToString());
                        ObjCVarLogExchangeRate.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarLogExchangeRate.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarLogExchangeRate.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarLogExchangeRate.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarLogExchangeRate.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarLogExchangeRate.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarLogExchangeRate.Add(ObjCVarLogExchangeRate);
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
                    Com.CommandText = "[dbo].DeleteListLogExchangeRate";
                else
                    Com.CommandText = "[dbo].UpdateListLogExchangeRate";
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
        public Exception DeleteItem(List<CPKLogExchangeRate> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemLogExchangeRate";
                Com.Parameters.Add(new SqlParameter("@LogExchangeRateID", SqlDbType.Int));
                foreach (CPKLogExchangeRate ObjCPKLogExchangeRate in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKLogExchangeRate.LogExchangeRateID);
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
        public Exception SaveMethod(List<CVarLogExchangeRate> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@CurrencyCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ExchangeRateDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ActionTaken", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                SqlParameter paraLogExchangeRateID = Com.Parameters.Add(new SqlParameter("@LogExchangeRateID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "LogExchangeRateID", DataRowVersion.Default, null));
                foreach (CVarLogExchangeRate ObjCVarLogExchangeRate in SaveList)
                {
                    if (ObjCVarLogExchangeRate.mIsChanges == true)
                    {
                        if (ObjCVarLogExchangeRate.LogExchangeRateID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemLogExchangeRate";
                            paraLogExchangeRateID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarLogExchangeRate.LogExchangeRateID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemLogExchangeRate";
                            paraLogExchangeRateID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarLogExchangeRate.LogExchangeRateID != 0)
                        {
                            Com.Parameters["@LogExchangeRateID"].Value = ObjCVarLogExchangeRate.LogExchangeRateID;
                        }
                        Com.Parameters["@CurrencyCode"].Value = ObjCVarLogExchangeRate.CurrencyCode;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarLogExchangeRate.ExchangeRate;
                        Com.Parameters["@ExchangeRateDate"].Value = ObjCVarLogExchangeRate.ExchangeRateDate;
                        Com.Parameters["@ActionTaken"].Value = ObjCVarLogExchangeRate.ActionTaken;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarLogExchangeRate.CurrencyID;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarLogExchangeRate.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarLogExchangeRate.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarLogExchangeRate.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarLogExchangeRate.ModificationDate;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarLogExchangeRate.IsDeleted;
                        EndTrans(Com, Con);
                        if (ObjCVarLogExchangeRate.LogExchangeRateID == 0)
                        {
                            ObjCVarLogExchangeRate.LogExchangeRateID = Convert.ToInt32(Com.Parameters["@LogExchangeRateID"].Value);
                        }
                        ObjCVarLogExchangeRate.mIsChanges = false;
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
