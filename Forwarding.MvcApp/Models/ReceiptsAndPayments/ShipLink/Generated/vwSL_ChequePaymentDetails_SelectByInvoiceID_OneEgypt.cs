using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated
{
    [Serializable]
    public partial class CVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Int64 mReceiptNumber;
        internal Int64 mInvoiceHeaderID;
        internal DateTime mIssueDate;
        internal Byte mPaymentTypeID;
        internal Decimal mAmount;
        internal Decimal mOverPayment;
        internal String mReferenceNumber;
        internal Int32 mCheckBankID;
        internal Int32 mCurrencyID;
        internal Int32 mCashSafeID;
        internal Int32 mRef_AccountID;
        internal Int32 mRef_SubAccountID;
        internal String mIsERPClient;
        internal Int64 mClientID;
        internal Int64 minvoiceserial;
        internal String mClientName;
        internal Int32 mBank_Account_ID;
        internal Int32 mBank_ID;
        internal Int32 mSafe_Account_ID;
        internal String mRemarks;
        internal Int32 mERP_Client_AccountID;
        internal Int32 mERP_Client_SubAccountID;
        internal String mBillNumber;
        internal Int32 mJournal_ID;
        internal Int32 mJVType_ID;
        internal Int32 mInvoiceTypeID;
        internal String mInvTypeName;
        internal String mVoyageNumber;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int64 ReceiptNumber
        {
            get { return mReceiptNumber; }
            set { mReceiptNumber = value; }
        }
        public Int64 InvoiceHeaderID
        {
            get { return mInvoiceHeaderID; }
            set { mInvoiceHeaderID = value; }
        }
        public DateTime IssueDate
        {
            get { return mIssueDate; }
            set { mIssueDate = value; }
        }
        public Byte PaymentTypeID
        {
            get { return mPaymentTypeID; }
            set { mPaymentTypeID = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mAmount = value; }
        }
        public Decimal OverPayment
        {
            get { return mOverPayment; }
            set { mOverPayment = value; }
        }
        
        public String ReferenceNumber
        {
            get { return mReferenceNumber; }
            set { mReferenceNumber = value; }
        }
        public Int32 CheckBankID
        {
            get { return mCheckBankID; }
            set { mCheckBankID = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public Int32 CashSafeID
        {
            get { return mCashSafeID; }
            set { mCashSafeID = value; }
        }
        public Int32 Ref_AccountID
        {
            get { return mRef_AccountID; }
            set { mRef_AccountID = value; }
        }
        public Int32 Ref_SubAccountID
        {
            get { return mRef_SubAccountID; }
            set { mRef_SubAccountID = value; }
        }
        public String IsERPClient
        {
            get { return mIsERPClient; }
            set { mIsERPClient = value; }
        }
        public Int64 ClientID
        {
            get { return mClientID; }
            set { mClientID = value; }
        }
        public Int64 invoiceserial
        {
            get { return minvoiceserial; }
            set { minvoiceserial = value; }
        }
        public String ClientName
        {
            get { return mClientName; }
            set { mClientName = value; }
        }
        public Int32 Bank_Account_ID
        {
            get { return mBank_Account_ID; }
            set { mBank_Account_ID = value; }
        }
        public Int32 Bank_ID
        {
            get { return mBank_ID; }
            set { mBank_ID = value; }
        }
        public Int32 Safe_Account_ID
        {
            get { return mSafe_Account_ID; }
            set { mSafe_Account_ID = value; }
        }
        public String Remarks
        {
            get { return mRemarks; }
            set { mRemarks = value; }
        }
        public Int32 ERP_Client_AccountID
        {
            get { return mERP_Client_AccountID; }
            set { mERP_Client_AccountID = value; }
        }
        public Int32 ERP_Client_SubAccountID
        {
            get { return mERP_Client_SubAccountID; }
            set { mERP_Client_SubAccountID = value; }
        }
        public String BillNumber
        {
            get { return mBillNumber; }
            set { mBillNumber = value; }
        }
        public Int32 Journal_ID
        {
            get { return mJournal_ID; }
            set { mJournal_ID = value; }
        }
        public Int32 JVType_ID
        {
            get { return mJVType_ID; }
            set { mJVType_ID = value; }
        }
        public Int32 InvoiceTypeID
        {
            get { return mInvoiceTypeID; }
            set { mInvoiceTypeID = value; }
        }
        public String InvTypeName
        {
            get { return mInvTypeName; }
            set { mInvTypeName = value; }
        }
        public String VoyageNumber
        {
            get { return mVoyageNumber; }
            set { mVoyageNumber = value; }
        }
        #endregion
    }

    public partial class CvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt
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
        public List<CVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt> lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt = new List<CVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt>();
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
            lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt";
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
                        CVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt = new CVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt();
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mReceiptNumber = Convert.ToInt64(dr["ReceiptNumber"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mInvoiceHeaderID = Convert.ToInt64(dr["InvoiceHeaderID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mPaymentTypeID = Convert.ToByte(dr["PaymentTypeID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mOverPayment = Convert.ToDecimal(dr["OverPayment"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mReferenceNumber = Convert.ToString(dr["ReferenceNumber"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mCheckBankID = Convert.ToInt32(dr["CheckBankID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mCashSafeID = Convert.ToInt32(dr["CashSafeID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mRef_AccountID = Convert.ToInt32(dr["Ref_AccountID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mRef_SubAccountID = Convert.ToInt32(dr["Ref_SubAccountID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mIsERPClient = Convert.ToString(dr["IsERPClient"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mClientID = Convert.ToInt64(dr["ClientID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.minvoiceserial = Convert.ToInt64(dr["invoiceserial"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mBank_Account_ID = Convert.ToInt32(dr["Bank_Account_ID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mBank_ID = Convert.ToInt32(dr["Bank_ID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mSafe_Account_ID = Convert.ToInt32(dr["Safe_Account_ID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mERP_Client_AccountID = Convert.ToInt32(dr["ERP_Client_AccountID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mERP_Client_SubAccountID = Convert.ToInt32(dr["ERP_Client_SubAccountID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mBillNumber = Convert.ToString(dr["BillNumber"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mJournal_ID = Convert.ToInt32(dr["Journal_ID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mJVType_ID = Convert.ToInt32(dr["JVType_ID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mInvTypeName = Convert.ToString(dr["InvTypeName"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mVoyageNumber = Convert.ToString(dr["VoyageNumber"].ToString());
                        lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.Add(ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt);
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
            lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt";
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
                        CVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt = new CVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt();
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mReceiptNumber = Convert.ToInt64(dr["ReceiptNumber"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mInvoiceHeaderID = Convert.ToInt64(dr["InvoiceHeaderID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mPaymentTypeID = Convert.ToByte(dr["PaymentTypeID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mOverPayment = Convert.ToDecimal(dr["OverPayment"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mReferenceNumber = Convert.ToString(dr["ReferenceNumber"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mCheckBankID = Convert.ToInt32(dr["CheckBankID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mCashSafeID = Convert.ToInt32(dr["CashSafeID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mRef_AccountID = Convert.ToInt32(dr["Ref_AccountID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mRef_SubAccountID = Convert.ToInt32(dr["Ref_SubAccountID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mIsERPClient = Convert.ToString(dr["IsERPClient"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mClientID = Convert.ToInt64(dr["ClientID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.minvoiceserial = Convert.ToInt64(dr["invoiceserial"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mBank_Account_ID = Convert.ToInt32(dr["Bank_Account_ID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mBank_ID = Convert.ToInt32(dr["Bank_ID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mSafe_Account_ID = Convert.ToInt32(dr["Safe_Account_ID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mERP_Client_AccountID = Convert.ToInt32(dr["ERP_Client_AccountID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mERP_Client_SubAccountID = Convert.ToInt32(dr["ERP_Client_SubAccountID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mBillNumber = Convert.ToString(dr["BillNumber"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mJournal_ID = Convert.ToInt32(dr["Journal_ID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mJVType_ID = Convert.ToInt32(dr["JVType_ID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mInvTypeName = Convert.ToString(dr["InvTypeName"].ToString());
                        ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.mVoyageNumber = Convert.ToString(dr["VoyageNumber"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.Add(ObjCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt);
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
