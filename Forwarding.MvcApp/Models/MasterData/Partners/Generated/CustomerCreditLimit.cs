using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Partners.Generated
{
    [Serializable]
    public class CPKCustomerCreditLimit
    {
        #region "variables"
        private Decimal mID;
        #endregion

        #region "Methods"
        public Decimal ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarCustomerCreditLimit : CPKCustomerCreditLimit
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCstomerID;
        internal Decimal mLimitID;
        internal Int32 mCurrencyID;
        internal DateTime mDate;
        #endregion

        #region "Methods"
        public Int32 CstomerID
        {
            get { return mCstomerID; }
            set { mIsChanges = true; mCstomerID = value; }
        }
        public Decimal LimitID
        {
            get { return mLimitID; }
            set { mIsChanges = true; mLimitID = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public DateTime Date
        {
            get { return mDate; }
            set { mIsChanges = true; mDate = value; }
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

    public partial class CCustomerCreditLimit
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
        public List<CVarCustomerCreditLimit> lstCVarCustomerCreditLimit = new List<CVarCustomerCreditLimit>();
        public List<CPKCustomerCreditLimit> lstDeletedCPKCustomerCreditLimit = new List<CPKCustomerCreditLimit>();
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
        public Exception GetItem(Decimal ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarCustomerCreditLimit.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListCustomerCreditLimit";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemCustomerCreditLimit";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Decimal));
                    Com.Parameters[0].Value = Convert.ToDecimal(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarCustomerCreditLimit ObjCVarCustomerCreditLimit = new CVarCustomerCreditLimit();
                        ObjCVarCustomerCreditLimit.ID = Convert.ToDecimal(dr["ID"].ToString());
                        ObjCVarCustomerCreditLimit.mCstomerID = Convert.ToInt32(dr["CstomerID"].ToString());
                        ObjCVarCustomerCreditLimit.mLimitID = Convert.ToDecimal(dr["LimitID"].ToString());
                        ObjCVarCustomerCreditLimit.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarCustomerCreditLimit.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        lstCVarCustomerCreditLimit.Add(ObjCVarCustomerCreditLimit);
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
            lstCVarCustomerCreditLimit.Clear();

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
                Com.CommandText = "[dbo].GetListPagingCustomerCreditLimit";
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
                        CVarCustomerCreditLimit ObjCVarCustomerCreditLimit = new CVarCustomerCreditLimit();
                        ObjCVarCustomerCreditLimit.ID = Convert.ToDecimal(dr["ID"].ToString());
                        ObjCVarCustomerCreditLimit.mCstomerID = Convert.ToInt32(dr["CstomerID"].ToString());
                        ObjCVarCustomerCreditLimit.mLimitID = Convert.ToDecimal(dr["LimitID"].ToString());
                        ObjCVarCustomerCreditLimit.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarCustomerCreditLimit.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarCustomerCreditLimit.Add(ObjCVarCustomerCreditLimit);
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
                    Com.CommandText = "[dbo].DeleteListCustomerCreditLimit";
                else
                    Com.CommandText = "[dbo].UpdateListCustomerCreditLimit";
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
        public Exception DeleteItem(List<CPKCustomerCreditLimit> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemCustomerCreditLimit";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Decimal));
                foreach (CPKCustomerCreditLimit ObjCPKCustomerCreditLimit in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToDecimal(ObjCPKCustomerCreditLimit.ID);
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
        public Exception SaveMethod(List<CVarCustomerCreditLimit> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@CstomerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@LimitID", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Date", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Decimal, 17, ParameterDirection.Input, false, 18, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarCustomerCreditLimit ObjCVarCustomerCreditLimit in SaveList)
                {
                    if (ObjCVarCustomerCreditLimit.mIsChanges == true)
                    {
                        if (ObjCVarCustomerCreditLimit.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemCustomerCreditLimit";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarCustomerCreditLimit.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemCustomerCreditLimit";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarCustomerCreditLimit.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarCustomerCreditLimit.ID;
                        }
                        Com.Parameters["@CstomerID"].Value = ObjCVarCustomerCreditLimit.CstomerID;
                        Com.Parameters["@LimitID"].Value = ObjCVarCustomerCreditLimit.LimitID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarCustomerCreditLimit.CurrencyID;
                        Com.Parameters["@Date"].Value = ObjCVarCustomerCreditLimit.Date;
                        EndTrans(Com, Con);
                        if (ObjCVarCustomerCreditLimit.ID == 0)
                        {
                            ObjCVarCustomerCreditLimit.ID = Convert.ToDecimal(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarCustomerCreditLimit.mIsChanges = false;
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
