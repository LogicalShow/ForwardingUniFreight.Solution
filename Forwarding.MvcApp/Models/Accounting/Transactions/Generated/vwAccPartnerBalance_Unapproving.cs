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
    public class CPKvwAccPartnerBalance_Unapproving
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
    public partial class CVarvwAccPartnerBalance_Unapproving : CPKvwAccPartnerBalance_Unapproving
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
        internal Decimal mBalanceCreditAmount;
        internal Decimal mBalanceDebitAmount;
        internal Decimal mBalance;
        internal Int32 mBalanceCurrencyID;
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
        internal Int64 mInvoiceNumber;
        internal Int32 mInvoiceCurrencyID;
        internal Int64 mPartenerID;
        internal String mPartenerName;
        internal String mPartenerLocalName;
        internal Decimal mItemCreditAmount;
        internal Decimal mItemDebitAmount;
        #endregion

        #region "Methods"
        public Int64 PaymentID
        {
            get { return mPaymentID; }
            set { mPaymentID = value; }
        }
        public Int64 PaymentDetailsID
        {
            get { return mPaymentDetailsID; }
            set { mPaymentDetailsID = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mInvoiceID = value; }
        }
        public Int64 AccNoteID
        {
            get { return mAccNoteID; }
            set { mAccNoteID = value; }
        }
        public Int64 OperationPayableID
        {
            get { return mOperationPayableID; }
            set { mOperationPayableID = value; }
        }
        public Int32 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mPartnerTypeID = value; }
        }
        public Int64 InvoicePaymentDetailsID
        {
            get { return mInvoicePaymentDetailsID; }
            set { mInvoicePaymentDetailsID = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mCustomerID = value; }
        }
        public Int32 AgentID
        {
            get { return mAgentID; }
            set { mAgentID = value; }
        }
        public Int32 ShippingAgentID
        {
            get { return mShippingAgentID; }
            set { mShippingAgentID = value; }
        }
        public Int32 CustomsClearanceAgentID
        {
            get { return mCustomsClearanceAgentID; }
            set { mCustomsClearanceAgentID = value; }
        }
        public Int32 ShippingLineID
        {
            get { return mShippingLineID; }
            set { mShippingLineID = value; }
        }
        public Int32 AirlineID
        {
            get { return mAirlineID; }
            set { mAirlineID = value; }
        }
        public Int32 TruckerID
        {
            get { return mTruckerID; }
            set { mTruckerID = value; }
        }
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mSupplierID = value; }
        }
        public Int32 CustodyID
        {
            get { return mCustodyID; }
            set { mCustodyID = value; }
        }
        public Decimal BalanceCreditAmount
        {
            get { return mBalanceCreditAmount; }
            set { mBalanceCreditAmount = value; }
        }
        public Decimal BalanceDebitAmount
        {
            get { return mBalanceDebitAmount; }
            set { mBalanceDebitAmount = value; }
        }
        public Decimal Balance
        {
            get { return mBalance; }
            set { mBalance = value; }
        }
        public Int32 BalanceCurrencyID
        {
            get { return mBalanceCurrencyID; }
            set { mBalanceCurrencyID = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mExchangeRate = value; }
        }
        public Int32 TransactionType
        {
            get { return mTransactionType; }
            set { mTransactionType = value; }
        }
        public Decimal InvCurLocalExRate
        {
            get { return mInvCurLocalExRate; }
            set { mInvCurLocalExRate = value; }
        }
        public Decimal BalCurLocalExRate
        {
            get { return mBalCurLocalExRate; }
            set { mBalCurLocalExRate = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mModificationDate = value; }
        }
        public Int64 JVID
        {
            get { return mJVID; }
            set { mJVID = value; }
        }
        public Int64 InvoiceNumber
        {
            get { return mInvoiceNumber; }
            set { mInvoiceNumber = value; }
        }
        public Int32 InvoiceCurrencyID
        {
            get { return mInvoiceCurrencyID; }
            set { mInvoiceCurrencyID = value; }
        }
        public Int64 PartenerID
        {
            get { return mPartenerID; }
            set { mPartenerID = value; }
        }
        public String PartenerName
        {
            get { return mPartenerName; }
            set { mPartenerName = value; }
        }
        public String PartenerLocalName
        {
            get { return mPartenerLocalName; }
            set { mPartenerLocalName = value; }
        }
        public Decimal ItemCreditAmount
        {
            get { return mItemCreditAmount; }
            set { mItemCreditAmount = value; }
        }
        public Decimal ItemDebitAmount
        {
            get { return mItemDebitAmount; }
            set { mItemDebitAmount = value; }
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

    public partial class CvwAccPartnerBalance_Unapproving
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
        public List<CVarvwAccPartnerBalance_Unapproving> lstCVarvwAccPartnerBalance_Unapproving = new List<CVarvwAccPartnerBalance_Unapproving>();
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
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwAccPartnerBalance_Unapproving.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwAccPartnerBalance_Unapproving";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwAccPartnerBalance_Unapproving ObjCVarvwAccPartnerBalance_Unapproving = new CVarvwAccPartnerBalance_Unapproving();
                        ObjCVarvwAccPartnerBalance_Unapproving.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mPaymentID = Convert.ToInt64(dr["PaymentID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mPaymentDetailsID = Convert.ToInt64(dr["PaymentDetailsID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mAccNoteID = Convert.ToInt64(dr["AccNoteID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mOperationPayableID = Convert.ToInt64(dr["OperationPayableID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mInvoicePaymentDetailsID = Convert.ToInt64(dr["InvoicePaymentDetailsID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mShippingAgentID = Convert.ToInt32(dr["ShippingAgentID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mCustomsClearanceAgentID = Convert.ToInt32(dr["CustomsClearanceAgentID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mCustodyID = Convert.ToInt32(dr["CustodyID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mBalanceCreditAmount = Convert.ToDecimal(dr["BalanceCreditAmount"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mBalanceDebitAmount = Convert.ToDecimal(dr["BalanceDebitAmount"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mBalanceCurrencyID = Convert.ToInt32(dr["BalanceCurrencyID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mTransactionType = Convert.ToInt32(dr["TransactionType"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mInvCurLocalExRate = Convert.ToDecimal(dr["InvCurLocalExRate"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mBalCurLocalExRate = Convert.ToDecimal(dr["BalCurLocalExRate"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mInvoiceCurrencyID = Convert.ToInt32(dr["InvoiceCurrencyID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mPartenerID = Convert.ToInt64(dr["PartenerID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mPartenerName = Convert.ToString(dr["PartenerName"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mPartenerLocalName = Convert.ToString(dr["PartenerLocalName"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mItemCreditAmount = Convert.ToDecimal(dr["ItemCreditAmount"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mItemDebitAmount = Convert.ToDecimal(dr["ItemDebitAmount"].ToString());
                        lstCVarvwAccPartnerBalance_Unapproving.Add(ObjCVarvwAccPartnerBalance_Unapproving);
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
            lstCVarvwAccPartnerBalance_Unapproving.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.CommandTimeout = 300;

                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingvwAccPartnerBalance_Unapproving";
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
                        CVarvwAccPartnerBalance_Unapproving ObjCVarvwAccPartnerBalance_Unapproving = new CVarvwAccPartnerBalance_Unapproving();
                        ObjCVarvwAccPartnerBalance_Unapproving.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mPaymentID = Convert.ToInt64(dr["PaymentID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mPaymentDetailsID = Convert.ToInt64(dr["PaymentDetailsID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mAccNoteID = Convert.ToInt64(dr["AccNoteID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mOperationPayableID = Convert.ToInt64(dr["OperationPayableID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mInvoicePaymentDetailsID = Convert.ToInt64(dr["InvoicePaymentDetailsID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mShippingAgentID = Convert.ToInt32(dr["ShippingAgentID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mCustomsClearanceAgentID = Convert.ToInt32(dr["CustomsClearanceAgentID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mCustodyID = Convert.ToInt32(dr["CustodyID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mBalanceCreditAmount = Convert.ToDecimal(dr["BalanceCreditAmount"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mBalanceDebitAmount = Convert.ToDecimal(dr["BalanceDebitAmount"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mBalanceCurrencyID = Convert.ToInt32(dr["BalanceCurrencyID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mTransactionType = Convert.ToInt32(dr["TransactionType"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mInvCurLocalExRate = Convert.ToDecimal(dr["InvCurLocalExRate"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mBalCurLocalExRate = Convert.ToDecimal(dr["BalCurLocalExRate"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mInvoiceCurrencyID = Convert.ToInt32(dr["InvoiceCurrencyID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mPartenerID = Convert.ToInt64(dr["PartenerID"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mPartenerName = Convert.ToString(dr["PartenerName"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mPartenerLocalName = Convert.ToString(dr["PartenerLocalName"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mItemCreditAmount = Convert.ToDecimal(dr["ItemCreditAmount"].ToString());
                        ObjCVarvwAccPartnerBalance_Unapproving.mItemDebitAmount = Convert.ToDecimal(dr["ItemDebitAmount"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwAccPartnerBalance_Unapproving.Add(ObjCVarvwAccPartnerBalance_Unapproving);
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
    }


}

