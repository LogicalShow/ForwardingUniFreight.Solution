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
    public partial class CVarvwAccPartnerBalance
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Int64 mPaymentID;
        internal String mPaymentCode;
        internal Int32 mChargeTypeID;
        internal Boolean mIsGeneralExpense;
        internal Int64 mOperationPayableID;
        internal Int64 mInvoiceID;
        internal Int64 mAccNoteID;
        internal String mAccNoteCode;
        internal Int64 mPaymentDetailsID;
        internal Int64 mInvoicePaymentDetailsID;
        internal String mConcatenatedInvoiceNumber;
        internal Decimal mRemainingAmount;
        internal DateTime mDueDate;
        internal Int64 mOperationID;
        internal String mOperationCode;
        internal String mMasterBL;
        internal String mHouseNumber;
        internal Int64 mMasterOperationID;
        internal String mMasterOperationCode;
        internal Int32 mPartnerTypeID;
        internal String mPartnerTypeCode;
        internal Int32 mBranchID;
        internal String mReferenceNumber;
        internal Int32 mPartnerID;
        internal String mPartnerName;
        internal Decimal mCreditAmount;
        internal Decimal mDebitAmount;
        internal Decimal mBalance;
        internal Int32 mCurrencyID;
        internal String mCurrencyCode;
        internal Decimal mExchangeRate;
        internal Int32 mTransactionType;
        internal String mTransactionTypeName;
        internal String mNotes;
        internal Decimal mInvCurLocalExRate;
        internal Decimal mBalCurLocalExRate;
        internal Boolean mIsDeleted;
        internal Int32 mCreatorUserID;
        internal String mCreatorUserName;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal DateTime mInvoiceDate;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int64 PaymentID
        {
            get { return mPaymentID; }
            set { mPaymentID = value; }
        }
        public String PaymentCode
        {
            get { return mPaymentCode; }
            set { mPaymentCode = value; }
        }
        public Int32 ChargeTypeID
        {
            get { return mChargeTypeID; }
            set { mChargeTypeID = value; }
        }
        public Boolean IsGeneralExpense
        {
            get { return mIsGeneralExpense; }
            set { mIsGeneralExpense = value; }
        }
        public Int64 OperationPayableID
        {
            get { return mOperationPayableID; }
            set { mOperationPayableID = value; }
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
        public String AccNoteCode
        {
            get { return mAccNoteCode; }
            set { mAccNoteCode = value; }
        }
        public Int64 PaymentDetailsID
        {
            get { return mPaymentDetailsID; }
            set { mPaymentDetailsID = value; }
        }
        public Int64 InvoicePaymentDetailsID
        {
            get { return mInvoicePaymentDetailsID; }
            set { mInvoicePaymentDetailsID = value; }
        }
        public String ConcatenatedInvoiceNumber
        {
            get { return mConcatenatedInvoiceNumber; }
            set { mConcatenatedInvoiceNumber = value; }
        }
        public Decimal RemainingAmount
        {
            get { return mRemainingAmount; }
            set { mRemainingAmount = value; }
        }
        public DateTime DueDate
        {
            get { return mDueDate; }
            set { mDueDate = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public String OperationCode
        {
            get { return mOperationCode; }
            set { mOperationCode = value; }
        }
        public String MasterBL
        {
            get { return mMasterBL; }
            set { mMasterBL = value; }
        }
        public String HouseNumber
        {
            get { return mHouseNumber; }
            set { mHouseNumber = value; }
        }
        public Int64 MasterOperationID
        {
            get { return mMasterOperationID; }
            set { mMasterOperationID = value; }
        }
        public String MasterOperationCode
        {
            get { return mMasterOperationCode; }
            set { mMasterOperationCode = value; }
        }
        public Int32 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mPartnerTypeID = value; }
        }
        public String PartnerTypeCode
        {
            get { return mPartnerTypeCode; }
            set { mPartnerTypeCode = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mBranchID = value; }
        }
        public String ReferenceNumber
        {
            get { return mReferenceNumber; }
            set { mReferenceNumber = value; }
        }
        public Int32 PartnerID
        {
            get { return mPartnerID; }
            set { mPartnerID = value; }
        }
        public String PartnerName
        {
            get { return mPartnerName; }
            set { mPartnerName = value; }
        }
        public Decimal CreditAmount
        {
            get { return mCreditAmount; }
            set { mCreditAmount = value; }
        }
        public Decimal DebitAmount
        {
            get { return mDebitAmount; }
            set { mDebitAmount = value; }
        }
        public Decimal Balance
        {
            get { return mBalance; }
            set { mBalance = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
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
        public String TransactionTypeName
        {
            get { return mTransactionTypeName; }
            set { mTransactionTypeName = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
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
        public String CreatorUserName
        {
            get { return mCreatorUserName; }
            set { mCreatorUserName = value; }
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
        public DateTime InvoiceDate
        {
            get { return mInvoiceDate; }
            set { mInvoiceDate = value; }
        }
        #endregion
    }

    public partial class CvwAccPartnerBalance
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
        public List<CVarvwAccPartnerBalance> lstCVarvwAccPartnerBalance = new List<CVarvwAccPartnerBalance>();
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
            lstCVarvwAccPartnerBalance.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwAccPartnerBalance";
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
                        CVarvwAccPartnerBalance ObjCVarvwAccPartnerBalance = new CVarvwAccPartnerBalance();
                        ObjCVarvwAccPartnerBalance.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwAccPartnerBalance.mPaymentID = Convert.ToInt64(dr["PaymentID"].ToString());
                        ObjCVarvwAccPartnerBalance.mPaymentCode = Convert.ToString(dr["PaymentCode"].ToString());
                        ObjCVarvwAccPartnerBalance.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwAccPartnerBalance.mIsGeneralExpense = Convert.ToBoolean(dr["IsGeneralExpense"].ToString());
                        ObjCVarvwAccPartnerBalance.mOperationPayableID = Convert.ToInt64(dr["OperationPayableID"].ToString());
                        ObjCVarvwAccPartnerBalance.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvwAccPartnerBalance.mAccNoteID = Convert.ToInt64(dr["AccNoteID"].ToString());
                        ObjCVarvwAccPartnerBalance.mAccNoteCode = Convert.ToString(dr["AccNoteCode"].ToString());
                        ObjCVarvwAccPartnerBalance.mPaymentDetailsID = Convert.ToInt64(dr["PaymentDetailsID"].ToString());
                        ObjCVarvwAccPartnerBalance.mInvoicePaymentDetailsID = Convert.ToInt64(dr["InvoicePaymentDetailsID"].ToString());
                        ObjCVarvwAccPartnerBalance.mConcatenatedInvoiceNumber = Convert.ToString(dr["ConcatenatedInvoiceNumber"].ToString());
                        ObjCVarvwAccPartnerBalance.mRemainingAmount = Convert.ToDecimal(dr["RemainingAmount"].ToString());
                        ObjCVarvwAccPartnerBalance.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarvwAccPartnerBalance.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwAccPartnerBalance.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwAccPartnerBalance.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwAccPartnerBalance.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarvwAccPartnerBalance.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwAccPartnerBalance.mMasterOperationCode = Convert.ToString(dr["MasterOperationCode"].ToString());
                        ObjCVarvwAccPartnerBalance.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwAccPartnerBalance.mPartnerTypeCode = Convert.ToString(dr["PartnerTypeCode"].ToString());
                        ObjCVarvwAccPartnerBalance.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwAccPartnerBalance.mReferenceNumber = Convert.ToString(dr["ReferenceNumber"].ToString());
                        ObjCVarvwAccPartnerBalance.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwAccPartnerBalance.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwAccPartnerBalance.mCreditAmount = Convert.ToDecimal(dr["CreditAmount"].ToString());
                        ObjCVarvwAccPartnerBalance.mDebitAmount = Convert.ToDecimal(dr["DebitAmount"].ToString());
                        ObjCVarvwAccPartnerBalance.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        ObjCVarvwAccPartnerBalance.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwAccPartnerBalance.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwAccPartnerBalance.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwAccPartnerBalance.mTransactionType = Convert.ToInt32(dr["TransactionType"].ToString());
                        ObjCVarvwAccPartnerBalance.mTransactionTypeName = Convert.ToString(dr["TransactionTypeName"].ToString());
                        ObjCVarvwAccPartnerBalance.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwAccPartnerBalance.mInvCurLocalExRate = Convert.ToDecimal(dr["InvCurLocalExRate"].ToString());
                        ObjCVarvwAccPartnerBalance.mBalCurLocalExRate = Convert.ToDecimal(dr["BalCurLocalExRate"].ToString());
                        ObjCVarvwAccPartnerBalance.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwAccPartnerBalance.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwAccPartnerBalance.mCreatorUserName = Convert.ToString(dr["CreatorUserName"].ToString());
                        ObjCVarvwAccPartnerBalance.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwAccPartnerBalance.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwAccPartnerBalance.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwAccPartnerBalance.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        lstCVarvwAccPartnerBalance.Add(ObjCVarvwAccPartnerBalance);
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
            lstCVarvwAccPartnerBalance.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwAccPartnerBalance";
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
                        CVarvwAccPartnerBalance ObjCVarvwAccPartnerBalance = new CVarvwAccPartnerBalance();
                        ObjCVarvwAccPartnerBalance.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwAccPartnerBalance.mPaymentID = Convert.ToInt64(dr["PaymentID"].ToString());
                        ObjCVarvwAccPartnerBalance.mPaymentCode = Convert.ToString(dr["PaymentCode"].ToString());
                        ObjCVarvwAccPartnerBalance.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwAccPartnerBalance.mIsGeneralExpense = Convert.ToBoolean(dr["IsGeneralExpense"].ToString());
                        ObjCVarvwAccPartnerBalance.mOperationPayableID = Convert.ToInt64(dr["OperationPayableID"].ToString());
                        ObjCVarvwAccPartnerBalance.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvwAccPartnerBalance.mAccNoteID = Convert.ToInt64(dr["AccNoteID"].ToString());
                        ObjCVarvwAccPartnerBalance.mAccNoteCode = Convert.ToString(dr["AccNoteCode"].ToString());
                        ObjCVarvwAccPartnerBalance.mPaymentDetailsID = Convert.ToInt64(dr["PaymentDetailsID"].ToString());
                        ObjCVarvwAccPartnerBalance.mInvoicePaymentDetailsID = Convert.ToInt64(dr["InvoicePaymentDetailsID"].ToString());
                        ObjCVarvwAccPartnerBalance.mConcatenatedInvoiceNumber = Convert.ToString(dr["ConcatenatedInvoiceNumber"].ToString());
                        ObjCVarvwAccPartnerBalance.mRemainingAmount = Convert.ToDecimal(dr["RemainingAmount"].ToString());
                        ObjCVarvwAccPartnerBalance.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarvwAccPartnerBalance.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwAccPartnerBalance.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwAccPartnerBalance.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwAccPartnerBalance.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarvwAccPartnerBalance.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwAccPartnerBalance.mMasterOperationCode = Convert.ToString(dr["MasterOperationCode"].ToString());
                        ObjCVarvwAccPartnerBalance.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwAccPartnerBalance.mPartnerTypeCode = Convert.ToString(dr["PartnerTypeCode"].ToString());
                        ObjCVarvwAccPartnerBalance.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwAccPartnerBalance.mReferenceNumber = Convert.ToString(dr["ReferenceNumber"].ToString());
                        ObjCVarvwAccPartnerBalance.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwAccPartnerBalance.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwAccPartnerBalance.mCreditAmount = Convert.ToDecimal(dr["CreditAmount"].ToString());
                        ObjCVarvwAccPartnerBalance.mDebitAmount = Convert.ToDecimal(dr["DebitAmount"].ToString());
                        ObjCVarvwAccPartnerBalance.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        ObjCVarvwAccPartnerBalance.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwAccPartnerBalance.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwAccPartnerBalance.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwAccPartnerBalance.mTransactionType = Convert.ToInt32(dr["TransactionType"].ToString());
                        ObjCVarvwAccPartnerBalance.mTransactionTypeName = Convert.ToString(dr["TransactionTypeName"].ToString());
                        ObjCVarvwAccPartnerBalance.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwAccPartnerBalance.mInvCurLocalExRate = Convert.ToDecimal(dr["InvCurLocalExRate"].ToString());
                        ObjCVarvwAccPartnerBalance.mBalCurLocalExRate = Convert.ToDecimal(dr["BalCurLocalExRate"].ToString());
                        ObjCVarvwAccPartnerBalance.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwAccPartnerBalance.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwAccPartnerBalance.mCreatorUserName = Convert.ToString(dr["CreatorUserName"].ToString());
                        ObjCVarvwAccPartnerBalance.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwAccPartnerBalance.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwAccPartnerBalance.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwAccPartnerBalance.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwAccPartnerBalance.Add(ObjCVarvwAccPartnerBalance);
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
