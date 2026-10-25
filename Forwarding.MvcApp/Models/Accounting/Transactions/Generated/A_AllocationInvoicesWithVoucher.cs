using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.Accounting.Transactions.Generated
{
    [Serializable]
    public class CPKA_AllocationInvoicesWithVoucher
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
    public partial class CVarA_AllocationInvoicesWithVoucher : CPKA_AllocationInvoicesWithVoucher
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal DateTime mDate;
        internal Int32 mPartnerTypeID;
        internal Int32 mPartnerID;
        internal Int32 mCurrencyID;
        internal Decimal mVoucherExchangeRate;
        internal Decimal mInvoiceExchangeRate;
        internal Decimal mProfitAmount;
        internal Decimal mLossAmount;
        internal Int64 mJVID;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public DateTime Date
        {
            get { return mDate; }
            set { mIsChanges = true; mDate = value; }
        }
        public Int32 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mIsChanges = true; mPartnerTypeID = value; }
        }
        public Int32 PartnerID
        {
            get { return mPartnerID; }
            set { mIsChanges = true; mPartnerID = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public Decimal VoucherExchangeRate
        {
            get { return mVoucherExchangeRate; }
            set { mIsChanges = true; mVoucherExchangeRate = value; }
        }
        public Decimal InvoiceExchangeRate
        {
            get { return mInvoiceExchangeRate; }
            set { mIsChanges = true; mInvoiceExchangeRate = value; }
        }
        public Decimal ProfitAmount
        {
            get { return mProfitAmount; }
            set { mIsChanges = true; mProfitAmount = value; }
        }
        public Decimal LossAmount
        {
            get { return mLossAmount; }
            set { mIsChanges = true; mLossAmount = value; }
        }
        public Int64 JVID
        {
            get { return mJVID; }
            set { mIsChanges = true; mJVID = value; }
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

    public partial class CA_AllocationInvoicesWithVoucher
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
        public List<CVarA_AllocationInvoicesWithVoucher> lstCVarA_AllocationInvoicesWithVoucher = new List<CVarA_AllocationInvoicesWithVoucher>();
        public List<CPKA_AllocationInvoicesWithVoucher> lstDeletedCPKA_AllocationInvoicesWithVoucher = new List<CPKA_AllocationInvoicesWithVoucher>();
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
            lstCVarA_AllocationInvoicesWithVoucher.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_AllocationInvoicesWithVoucher";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_AllocationInvoicesWithVoucher";
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
                        CVarA_AllocationInvoicesWithVoucher ObjCVarA_AllocationInvoicesWithVoucher = new CVarA_AllocationInvoicesWithVoucher();
                        ObjCVarA_AllocationInvoicesWithVoucher.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mVoucherExchangeRate = Convert.ToDecimal(dr["VoucherExchangeRate"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mInvoiceExchangeRate = Convert.ToDecimal(dr["InvoiceExchangeRate"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mProfitAmount = Convert.ToDecimal(dr["ProfitAmount"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mLossAmount = Convert.ToDecimal(dr["LossAmount"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        lstCVarA_AllocationInvoicesWithVoucher.Add(ObjCVarA_AllocationInvoicesWithVoucher);
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
            lstCVarA_AllocationInvoicesWithVoucher.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_AllocationInvoicesWithVoucher";
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
                        CVarA_AllocationInvoicesWithVoucher ObjCVarA_AllocationInvoicesWithVoucher = new CVarA_AllocationInvoicesWithVoucher();
                        ObjCVarA_AllocationInvoicesWithVoucher.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mVoucherExchangeRate = Convert.ToDecimal(dr["VoucherExchangeRate"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mInvoiceExchangeRate = Convert.ToDecimal(dr["InvoiceExchangeRate"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mProfitAmount = Convert.ToDecimal(dr["ProfitAmount"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mLossAmount = Convert.ToDecimal(dr["LossAmount"].ToString());
                        ObjCVarA_AllocationInvoicesWithVoucher.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_AllocationInvoicesWithVoucher.Add(ObjCVarA_AllocationInvoicesWithVoucher);
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
                    Com.CommandText = "[dbo].DeleteListA_AllocationInvoicesWithVoucher";
                else
                    Com.CommandText = "[dbo].UpdateListA_AllocationInvoicesWithVoucher";
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
        public Exception DeleteItem(List<CPKA_AllocationInvoicesWithVoucher> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_AllocationInvoicesWithVoucher";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKA_AllocationInvoicesWithVoucher ObjCPKA_AllocationInvoicesWithVoucher in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKA_AllocationInvoicesWithVoucher.ID);
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
        public Exception SaveMethod(List<CVarA_AllocationInvoicesWithVoucher> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Date", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PartnerTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PartnerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@VoucherExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@InvoiceExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ProfitAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@LossAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@JVID", SqlDbType.BigInt));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarA_AllocationInvoicesWithVoucher ObjCVarA_AllocationInvoicesWithVoucher in SaveList)
                {
                    if (ObjCVarA_AllocationInvoicesWithVoucher.mIsChanges == true)
                    {
                        if (ObjCVarA_AllocationInvoicesWithVoucher.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_AllocationInvoicesWithVoucher";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_AllocationInvoicesWithVoucher.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_AllocationInvoicesWithVoucher";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_AllocationInvoicesWithVoucher.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarA_AllocationInvoicesWithVoucher.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarA_AllocationInvoicesWithVoucher.Code;
                        Com.Parameters["@Date"].Value = ObjCVarA_AllocationInvoicesWithVoucher.Date;
                        Com.Parameters["@PartnerTypeID"].Value = ObjCVarA_AllocationInvoicesWithVoucher.PartnerTypeID;
                        Com.Parameters["@PartnerID"].Value = ObjCVarA_AllocationInvoicesWithVoucher.PartnerID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarA_AllocationInvoicesWithVoucher.CurrencyID;
                        Com.Parameters["@VoucherExchangeRate"].Value = ObjCVarA_AllocationInvoicesWithVoucher.VoucherExchangeRate;
                        Com.Parameters["@InvoiceExchangeRate"].Value = ObjCVarA_AllocationInvoicesWithVoucher.InvoiceExchangeRate;
                        Com.Parameters["@ProfitAmount"].Value = ObjCVarA_AllocationInvoicesWithVoucher.ProfitAmount;
                        Com.Parameters["@LossAmount"].Value = ObjCVarA_AllocationInvoicesWithVoucher.LossAmount;
                        Com.Parameters["@JVID"].Value = ObjCVarA_AllocationInvoicesWithVoucher.JVID;
                        EndTrans(Com, Con);
                        if (ObjCVarA_AllocationInvoicesWithVoucher.ID == 0)
                        {
                            ObjCVarA_AllocationInvoicesWithVoucher.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarA_AllocationInvoicesWithVoucher.mIsChanges = false;
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
