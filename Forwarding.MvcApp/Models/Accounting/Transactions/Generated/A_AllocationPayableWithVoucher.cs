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
    public class CPKA_AllocationPayableWithVoucher
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
    public partial class CVarA_AllocationPayableWithVoucher : CPKA_AllocationPayableWithVoucher
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

    public partial class CA_AllocationPayableWithVoucher
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
        public List<CVarA_AllocationPayableWithVoucher> lstCVarA_AllocationPayableWithVoucher = new List<CVarA_AllocationPayableWithVoucher>();
        public List<CPKA_AllocationPayableWithVoucher> lstDeletedCPKA_AllocationPayableWithVoucher = new List<CPKA_AllocationPayableWithVoucher>();
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
            lstCVarA_AllocationPayableWithVoucher.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_AllocationPayableWithVoucher";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_AllocationPayableWithVoucher";
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
                        CVarA_AllocationPayableWithVoucher ObjCVarA_AllocationPayableWithVoucher = new CVarA_AllocationPayableWithVoucher();
                        ObjCVarA_AllocationPayableWithVoucher.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mVoucherExchangeRate = Convert.ToDecimal(dr["VoucherExchangeRate"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mInvoiceExchangeRate = Convert.ToDecimal(dr["InvoiceExchangeRate"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mProfitAmount = Convert.ToDecimal(dr["ProfitAmount"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mLossAmount = Convert.ToDecimal(dr["LossAmount"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        lstCVarA_AllocationPayableWithVoucher.Add(ObjCVarA_AllocationPayableWithVoucher);
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
            lstCVarA_AllocationPayableWithVoucher.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_AllocationPayableWithVoucher";
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
                        CVarA_AllocationPayableWithVoucher ObjCVarA_AllocationPayableWithVoucher = new CVarA_AllocationPayableWithVoucher();
                        ObjCVarA_AllocationPayableWithVoucher.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mVoucherExchangeRate = Convert.ToDecimal(dr["VoucherExchangeRate"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mInvoiceExchangeRate = Convert.ToDecimal(dr["InvoiceExchangeRate"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mProfitAmount = Convert.ToDecimal(dr["ProfitAmount"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mLossAmount = Convert.ToDecimal(dr["LossAmount"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_AllocationPayableWithVoucher.Add(ObjCVarA_AllocationPayableWithVoucher);
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
                    Com.CommandText = "[dbo].DeleteListA_AllocationPayableWithVoucher";
                else
                    Com.CommandText = "[dbo].UpdateListA_AllocationPayableWithVoucher";
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
        public Exception DeleteItem(List<CPKA_AllocationPayableWithVoucher> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_AllocationPayableWithVoucher";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKA_AllocationPayableWithVoucher ObjCPKA_AllocationPayableWithVoucher in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKA_AllocationPayableWithVoucher.ID);
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
        public Exception SaveMethod(List<CVarA_AllocationPayableWithVoucher> SaveList)
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
                foreach (CVarA_AllocationPayableWithVoucher ObjCVarA_AllocationPayableWithVoucher in SaveList)
                {
                    if (ObjCVarA_AllocationPayableWithVoucher.mIsChanges == true)
                    {
                        if (ObjCVarA_AllocationPayableWithVoucher.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_AllocationPayableWithVoucher";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_AllocationPayableWithVoucher.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_AllocationPayableWithVoucher";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_AllocationPayableWithVoucher.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarA_AllocationPayableWithVoucher.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarA_AllocationPayableWithVoucher.Code;
                        Com.Parameters["@Date"].Value = ObjCVarA_AllocationPayableWithVoucher.Date;
                        Com.Parameters["@PartnerTypeID"].Value = ObjCVarA_AllocationPayableWithVoucher.PartnerTypeID;
                        Com.Parameters["@PartnerID"].Value = ObjCVarA_AllocationPayableWithVoucher.PartnerID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarA_AllocationPayableWithVoucher.CurrencyID;
                        Com.Parameters["@VoucherExchangeRate"].Value = ObjCVarA_AllocationPayableWithVoucher.VoucherExchangeRate;
                        Com.Parameters["@InvoiceExchangeRate"].Value = ObjCVarA_AllocationPayableWithVoucher.InvoiceExchangeRate;
                        Com.Parameters["@ProfitAmount"].Value = ObjCVarA_AllocationPayableWithVoucher.ProfitAmount;
                        Com.Parameters["@LossAmount"].Value = ObjCVarA_AllocationPayableWithVoucher.LossAmount;
                        Com.Parameters["@JVID"].Value = ObjCVarA_AllocationPayableWithVoucher.JVID;
                        EndTrans(Com, Con);
                        if (ObjCVarA_AllocationPayableWithVoucher.ID == 0)
                        {
                            ObjCVarA_AllocationPayableWithVoucher.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarA_AllocationPayableWithVoucher.mIsChanges = false;
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
