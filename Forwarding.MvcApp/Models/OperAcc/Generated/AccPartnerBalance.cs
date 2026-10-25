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
    public class CPKAccPartnerBalance
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
    public partial class CVarAccPartnerBalance : CPKAccPartnerBalance
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mPaymentID;
        internal Int64 mPaymentDetailsID;
        internal Int64 mInvoiceID;
        internal Int64 mAccNoteID;
        internal Int64 mOperationPayableID;
        internal Int32 mPartnerTypeID;
        internal Int64 mInvoicePaymentDetailsID;
        internal Int32 mCustomerID;
        internal Int32 mAgentID;
        internal Int32 mShippingAgentID;
        internal Int32 mCustomsClearanceAgentID;
        internal Int32 mShippingLineID;
        internal Int32 mAirlineID;
        internal Int32 mTruckerID;
        internal Int32 mSupplierID;
        internal Int32 mCustodyID;
        internal Decimal mCreditAmount;
        internal Decimal mDebitAmount;
        internal Decimal mBalance;
        internal Int32 mCurrencyID;
        internal Decimal mExchangeRate;
        internal Int32 mTransactionType;
        internal Decimal mInvCurLocalExRate;
        internal Decimal mBalCurLocalExRate;
        internal String mNotes;
        internal Boolean mIsDeleted;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int64 mJVID;
        #endregion

        #region "Methods"
        public Int64 PaymentID
        {
            get { return mPaymentID; }
            set { mIsChanges = true; mPaymentID = value; }
        }
        public Int64 PaymentDetailsID
        {
            get { return mPaymentDetailsID; }
            set { mIsChanges = true; mPaymentDetailsID = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mIsChanges = true; mInvoiceID = value; }
        }
        public Int64 AccNoteID
        {
            get { return mAccNoteID; }
            set { mIsChanges = true; mAccNoteID = value; }
        }
        public Int64 OperationPayableID
        {
            get { return mOperationPayableID; }
            set { mIsChanges = true; mOperationPayableID = value; }
        }
        public Int32 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mIsChanges = true; mPartnerTypeID = value; }
        }
        public Int64 InvoicePaymentDetailsID
        {
            get { return mInvoicePaymentDetailsID; }
            set { mIsChanges = true; mInvoicePaymentDetailsID = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mIsChanges = true; mCustomerID = value; }
        }
        public Int32 AgentID
        {
            get { return mAgentID; }
            set { mIsChanges = true; mAgentID = value; }
        }
        public Int32 ShippingAgentID
        {
            get { return mShippingAgentID; }
            set { mIsChanges = true; mShippingAgentID = value; }
        }
        public Int32 CustomsClearanceAgentID
        {
            get { return mCustomsClearanceAgentID; }
            set { mIsChanges = true; mCustomsClearanceAgentID = value; }
        }
        public Int32 ShippingLineID
        {
            get { return mShippingLineID; }
            set { mIsChanges = true; mShippingLineID = value; }
        }
        public Int32 AirlineID
        {
            get { return mAirlineID; }
            set { mIsChanges = true; mAirlineID = value; }
        }
        public Int32 TruckerID
        {
            get { return mTruckerID; }
            set { mIsChanges = true; mTruckerID = value; }
        }
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mIsChanges = true; mSupplierID = value; }
        }
        public Int32 CustodyID
        {
            get { return mCustodyID; }
            set { mIsChanges = true; mCustodyID = value; }
        }
        public Decimal CreditAmount
        {
            get { return mCreditAmount; }
            set { mIsChanges = true; mCreditAmount = value; }
        }
        public Decimal DebitAmount
        {
            get { return mDebitAmount; }
            set { mIsChanges = true; mDebitAmount = value; }
        }
        public Decimal Balance
        {
            get { return mBalance; }
            set { mIsChanges = true; mBalance = value; }
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
        public Int32 TransactionType
        {
            get { return mTransactionType; }
            set { mIsChanges = true; mTransactionType = value; }
        }
        public Decimal InvCurLocalExRate
        {
            get { return mInvCurLocalExRate; }
            set { mIsChanges = true; mInvCurLocalExRate = value; }
        }
        public Decimal BalCurLocalExRate
        {
            get { return mBalCurLocalExRate; }
            set { mIsChanges = true; mBalCurLocalExRate = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
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

    public partial class CAccPartnerBalance
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
        public List<CVarAccPartnerBalance> lstCVarAccPartnerBalance = new List<CVarAccPartnerBalance>();
        public List<CPKAccPartnerBalance> lstDeletedCPKAccPartnerBalance = new List<CPKAccPartnerBalance>();
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
            lstCVarAccPartnerBalance.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListAccPartnerBalance";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemAccPartnerBalance";
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
                        CVarAccPartnerBalance ObjCVarAccPartnerBalance = new CVarAccPartnerBalance();
                        ObjCVarAccPartnerBalance.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarAccPartnerBalance.mPaymentID = Convert.ToInt64(dr["PaymentID"].ToString());
                        ObjCVarAccPartnerBalance.mPaymentDetailsID = Convert.ToInt64(dr["PaymentDetailsID"].ToString());
                        ObjCVarAccPartnerBalance.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarAccPartnerBalance.mAccNoteID = Convert.ToInt64(dr["AccNoteID"].ToString());
                        ObjCVarAccPartnerBalance.mOperationPayableID = Convert.ToInt64(dr["OperationPayableID"].ToString());
                        ObjCVarAccPartnerBalance.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarAccPartnerBalance.mInvoicePaymentDetailsID = Convert.ToInt64(dr["InvoicePaymentDetailsID"].ToString());
                        ObjCVarAccPartnerBalance.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarAccPartnerBalance.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarAccPartnerBalance.mShippingAgentID = Convert.ToInt32(dr["ShippingAgentID"].ToString());
                        ObjCVarAccPartnerBalance.mCustomsClearanceAgentID = Convert.ToInt32(dr["CustomsClearanceAgentID"].ToString());
                        ObjCVarAccPartnerBalance.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarAccPartnerBalance.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarAccPartnerBalance.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarAccPartnerBalance.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarAccPartnerBalance.mCustodyID = Convert.ToInt32(dr["CustodyID"].ToString());
                        ObjCVarAccPartnerBalance.mCreditAmount = Convert.ToDecimal(dr["CreditAmount"].ToString());
                        ObjCVarAccPartnerBalance.mDebitAmount = Convert.ToDecimal(dr["DebitAmount"].ToString());
                        ObjCVarAccPartnerBalance.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        ObjCVarAccPartnerBalance.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarAccPartnerBalance.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarAccPartnerBalance.mTransactionType = Convert.ToInt32(dr["TransactionType"].ToString());
                        ObjCVarAccPartnerBalance.mInvCurLocalExRate = Convert.ToDecimal(dr["InvCurLocalExRate"].ToString());
                        ObjCVarAccPartnerBalance.mBalCurLocalExRate = Convert.ToDecimal(dr["BalCurLocalExRate"].ToString());
                        ObjCVarAccPartnerBalance.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarAccPartnerBalance.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarAccPartnerBalance.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarAccPartnerBalance.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAccPartnerBalance.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarAccPartnerBalance.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarAccPartnerBalance.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        lstCVarAccPartnerBalance.Add(ObjCVarAccPartnerBalance);
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
            lstCVarAccPartnerBalance.Clear();

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
                Com.CommandText = "[dbo].GetListPagingAccPartnerBalance";
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
                        CVarAccPartnerBalance ObjCVarAccPartnerBalance = new CVarAccPartnerBalance();
                        ObjCVarAccPartnerBalance.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarAccPartnerBalance.mPaymentID = Convert.ToInt64(dr["PaymentID"].ToString());
                        ObjCVarAccPartnerBalance.mPaymentDetailsID = Convert.ToInt64(dr["PaymentDetailsID"].ToString());
                        ObjCVarAccPartnerBalance.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarAccPartnerBalance.mAccNoteID = Convert.ToInt64(dr["AccNoteID"].ToString());
                        ObjCVarAccPartnerBalance.mOperationPayableID = Convert.ToInt64(dr["OperationPayableID"].ToString());
                        ObjCVarAccPartnerBalance.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarAccPartnerBalance.mInvoicePaymentDetailsID = Convert.ToInt64(dr["InvoicePaymentDetailsID"].ToString());
                        ObjCVarAccPartnerBalance.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarAccPartnerBalance.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarAccPartnerBalance.mShippingAgentID = Convert.ToInt32(dr["ShippingAgentID"].ToString());
                        ObjCVarAccPartnerBalance.mCustomsClearanceAgentID = Convert.ToInt32(dr["CustomsClearanceAgentID"].ToString());
                        ObjCVarAccPartnerBalance.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarAccPartnerBalance.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarAccPartnerBalance.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarAccPartnerBalance.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarAccPartnerBalance.mCustodyID = Convert.ToInt32(dr["CustodyID"].ToString());
                        ObjCVarAccPartnerBalance.mCreditAmount = Convert.ToDecimal(dr["CreditAmount"].ToString());
                        ObjCVarAccPartnerBalance.mDebitAmount = Convert.ToDecimal(dr["DebitAmount"].ToString());
                        ObjCVarAccPartnerBalance.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        ObjCVarAccPartnerBalance.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarAccPartnerBalance.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarAccPartnerBalance.mTransactionType = Convert.ToInt32(dr["TransactionType"].ToString());
                        ObjCVarAccPartnerBalance.mInvCurLocalExRate = Convert.ToDecimal(dr["InvCurLocalExRate"].ToString());
                        ObjCVarAccPartnerBalance.mBalCurLocalExRate = Convert.ToDecimal(dr["BalCurLocalExRate"].ToString());
                        ObjCVarAccPartnerBalance.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarAccPartnerBalance.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarAccPartnerBalance.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarAccPartnerBalance.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAccPartnerBalance.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarAccPartnerBalance.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarAccPartnerBalance.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarAccPartnerBalance.Add(ObjCVarAccPartnerBalance);
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
                    Com.CommandText = "[dbo].DeleteListAccPartnerBalance";
                else
                    Com.CommandText = "[dbo].UpdateListAccPartnerBalance";
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
        public Exception DeleteItem(List<CPKAccPartnerBalance> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemAccPartnerBalance";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKAccPartnerBalance ObjCPKAccPartnerBalance in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKAccPartnerBalance.ID);
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
        public Exception SaveMethod(List<CVarAccPartnerBalance> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@PaymentID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@PaymentDetailsID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@InvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@AccNoteID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@OperationPayableID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@PartnerTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@InvoicePaymentDetailsID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@CustomerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AgentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ShippingAgentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CustomsClearanceAgentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ShippingLineID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AirlineID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TruckerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SupplierID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CustodyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreditAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DebitAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Balance", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TransactionType", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@InvCurLocalExRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@BalCurLocalExRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@JVID", SqlDbType.BigInt));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarAccPartnerBalance ObjCVarAccPartnerBalance in SaveList)
                {
                    if (ObjCVarAccPartnerBalance.mIsChanges == true)
                    {
                        if (ObjCVarAccPartnerBalance.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemAccPartnerBalance";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarAccPartnerBalance.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemAccPartnerBalance";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarAccPartnerBalance.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarAccPartnerBalance.ID;
                        }
                        Com.Parameters["@PaymentID"].Value = ObjCVarAccPartnerBalance.PaymentID;
                        Com.Parameters["@PaymentDetailsID"].Value = ObjCVarAccPartnerBalance.PaymentDetailsID;
                        Com.Parameters["@InvoiceID"].Value = ObjCVarAccPartnerBalance.InvoiceID;
                        Com.Parameters["@AccNoteID"].Value = ObjCVarAccPartnerBalance.AccNoteID;
                        Com.Parameters["@OperationPayableID"].Value = ObjCVarAccPartnerBalance.OperationPayableID;
                        Com.Parameters["@PartnerTypeID"].Value = ObjCVarAccPartnerBalance.PartnerTypeID;
                        Com.Parameters["@InvoicePaymentDetailsID"].Value = ObjCVarAccPartnerBalance.InvoicePaymentDetailsID;
                        Com.Parameters["@CustomerID"].Value = ObjCVarAccPartnerBalance.CustomerID;
                        Com.Parameters["@AgentID"].Value = ObjCVarAccPartnerBalance.AgentID;
                        Com.Parameters["@ShippingAgentID"].Value = ObjCVarAccPartnerBalance.ShippingAgentID;
                        Com.Parameters["@CustomsClearanceAgentID"].Value = ObjCVarAccPartnerBalance.CustomsClearanceAgentID;
                        Com.Parameters["@ShippingLineID"].Value = ObjCVarAccPartnerBalance.ShippingLineID;
                        Com.Parameters["@AirlineID"].Value = ObjCVarAccPartnerBalance.AirlineID;
                        Com.Parameters["@TruckerID"].Value = ObjCVarAccPartnerBalance.TruckerID;
                        Com.Parameters["@SupplierID"].Value = ObjCVarAccPartnerBalance.SupplierID;
                        Com.Parameters["@CustodyID"].Value = ObjCVarAccPartnerBalance.CustodyID;
                        Com.Parameters["@CreditAmount"].Value = ObjCVarAccPartnerBalance.CreditAmount;
                        Com.Parameters["@DebitAmount"].Value = ObjCVarAccPartnerBalance.DebitAmount;
                        Com.Parameters["@Balance"].Value = ObjCVarAccPartnerBalance.Balance;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarAccPartnerBalance.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarAccPartnerBalance.ExchangeRate;
                        Com.Parameters["@TransactionType"].Value = ObjCVarAccPartnerBalance.TransactionType;
                        Com.Parameters["@InvCurLocalExRate"].Value = ObjCVarAccPartnerBalance.InvCurLocalExRate;
                        Com.Parameters["@BalCurLocalExRate"].Value = ObjCVarAccPartnerBalance.BalCurLocalExRate;
                        Com.Parameters["@Notes"].Value = ObjCVarAccPartnerBalance.Notes;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarAccPartnerBalance.IsDeleted;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarAccPartnerBalance.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarAccPartnerBalance.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarAccPartnerBalance.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarAccPartnerBalance.ModificationDate;
                        Com.Parameters["@JVID"].Value = ObjCVarAccPartnerBalance.JVID;
                        EndTrans(Com, Con);
                        if (ObjCVarAccPartnerBalance.ID == 0)
                        {
                            ObjCVarAccPartnerBalance.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarAccPartnerBalance.mIsChanges = false;
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

