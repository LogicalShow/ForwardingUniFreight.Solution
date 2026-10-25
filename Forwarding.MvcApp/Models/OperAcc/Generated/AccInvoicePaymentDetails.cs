using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.OperAcc.Generated
{
    [Serializable]
    public class CPKAccInvoicePaymentDetails
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
    public partial class CVarAccInvoicePaymentDetails : CPKAccInvoicePaymentDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mSerial;
        internal String mInvoicePaymentNumber;
        internal Int32 mBranchID;
        internal Int64 mInvoiceID;
        internal Int64 mPaymentID;
        internal Decimal mAmount;
        internal Int32 mCurrencyID;
        internal Decimal mExchangeRate;
        internal String mNotes;
        internal Boolean mIsCancelled;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        #endregion

        #region "Methods"
        public Int64 Serial
        {
            get { return mSerial; }
            set { mIsChanges = true; mSerial = value; }
        }
        public String InvoicePaymentNumber
        {
            get { return mInvoicePaymentNumber; }
            set { mIsChanges = true; mInvoicePaymentNumber = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mIsChanges = true; mBranchID = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mIsChanges = true; mInvoiceID = value; }
        }
        public Int64 PaymentID
        {
            get { return mPaymentID; }
            set { mIsChanges = true; mPaymentID = value; }
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
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Boolean IsCancelled
        {
            get { return mIsCancelled; }
            set { mIsChanges = true; mIsCancelled = value; }
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

    public partial class CAccInvoicePaymentDetails
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
        public List<CVarAccInvoicePaymentDetails> lstCVarAccInvoicePaymentDetails = new List<CVarAccInvoicePaymentDetails>();
        public List<CPKAccInvoicePaymentDetails> lstDeletedCPKAccInvoicePaymentDetails = new List<CPKAccInvoicePaymentDetails>();
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
            lstCVarAccInvoicePaymentDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListAccInvoicePaymentDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemAccInvoicePaymentDetails";
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
                        CVarAccInvoicePaymentDetails ObjCVarAccInvoicePaymentDetails = new CVarAccInvoicePaymentDetails();
                        ObjCVarAccInvoicePaymentDetails.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mInvoicePaymentNumber = Convert.ToString(dr["InvoicePaymentNumber"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mPaymentID = Convert.ToInt64(dr["PaymentID"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mIsCancelled = Convert.ToBoolean(dr["IsCancelled"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        lstCVarAccInvoicePaymentDetails.Add(ObjCVarAccInvoicePaymentDetails);
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
            lstCVarAccInvoicePaymentDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingAccInvoicePaymentDetails";
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
                        CVarAccInvoicePaymentDetails ObjCVarAccInvoicePaymentDetails = new CVarAccInvoicePaymentDetails();
                        ObjCVarAccInvoicePaymentDetails.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mInvoicePaymentNumber = Convert.ToString(dr["InvoicePaymentNumber"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mPaymentID = Convert.ToInt64(dr["PaymentID"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mIsCancelled = Convert.ToBoolean(dr["IsCancelled"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarAccInvoicePaymentDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarAccInvoicePaymentDetails.Add(ObjCVarAccInvoicePaymentDetails);
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
                    Com.CommandText = "[dbo].DeleteListAccInvoicePaymentDetails";
                else
                    Com.CommandText = "[dbo].UpdateListAccInvoicePaymentDetails";
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
        public Exception DeleteItem(List<CPKAccInvoicePaymentDetails> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemAccInvoicePaymentDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKAccInvoicePaymentDetails ObjCPKAccInvoicePaymentDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKAccInvoicePaymentDetails.ID);
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
        public Exception SaveMethod(List<CVarAccInvoicePaymentDetails> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Serial", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@InvoicePaymentNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@InvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@PaymentID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Amount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsCancelled", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarAccInvoicePaymentDetails ObjCVarAccInvoicePaymentDetails in SaveList)
                {
                    if (ObjCVarAccInvoicePaymentDetails.mIsChanges == true)
                    {
                        if (ObjCVarAccInvoicePaymentDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemAccInvoicePaymentDetails";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarAccInvoicePaymentDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemAccInvoicePaymentDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarAccInvoicePaymentDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarAccInvoicePaymentDetails.ID;
                        }
                        Com.Parameters["@Serial"].Value = ObjCVarAccInvoicePaymentDetails.Serial;
                        Com.Parameters["@InvoicePaymentNumber"].Value = ObjCVarAccInvoicePaymentDetails.InvoicePaymentNumber;
                        Com.Parameters["@BranchID"].Value = ObjCVarAccInvoicePaymentDetails.BranchID;
                        Com.Parameters["@InvoiceID"].Value = ObjCVarAccInvoicePaymentDetails.InvoiceID;
                        Com.Parameters["@PaymentID"].Value = ObjCVarAccInvoicePaymentDetails.PaymentID;
                        Com.Parameters["@Amount"].Value = ObjCVarAccInvoicePaymentDetails.Amount;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarAccInvoicePaymentDetails.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarAccInvoicePaymentDetails.ExchangeRate;
                        Com.Parameters["@Notes"].Value = ObjCVarAccInvoicePaymentDetails.Notes;
                        Com.Parameters["@IsCancelled"].Value = ObjCVarAccInvoicePaymentDetails.IsCancelled;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarAccInvoicePaymentDetails.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarAccInvoicePaymentDetails.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarAccInvoicePaymentDetails.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarAccInvoicePaymentDetails.ModificationDate;
                        EndTrans(Com, Con);
                        if (ObjCVarAccInvoicePaymentDetails.ID == 0)
                        {
                            ObjCVarAccInvoicePaymentDetails.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarAccInvoicePaymentDetails.mIsChanges = false;
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
