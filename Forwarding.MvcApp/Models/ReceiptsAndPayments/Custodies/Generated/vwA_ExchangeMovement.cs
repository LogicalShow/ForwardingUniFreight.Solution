using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
using Forwarding.MvcApp.Models.Sales.Transactions.Generated.Payments.Generated;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated
{
    [Serializable]
    public class CPKvwA_ExchangeMovement
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
    public partial class CVarvwA_ExchangeMovement : CPKvwA_ExchangeMovement
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal DateTime mVoucherDate;
        internal Int32 mSafeID;
        internal String mSafeName;
        internal Int32 mCurrencyID;
        internal String mCurrencyCode;
        internal Decimal mExchangeRate;
        internal String mChargedPerson;
        internal String mNotes;
        internal Int32 mTaxID;
        internal String mTaxName;
        internal Boolean mIsDebitAccount;
        internal Decimal mTaxValue;
        internal Int32 mTaxSign;
        internal Int32 mTaxID2;
        internal String mTaxName2;
        internal Boolean mIsDebitAccount2;
        internal Decimal mTaxValue2;
        internal Int32 mTaxSign2;
        internal Decimal mTotal;
        internal Decimal mTotalAfterTax;
        internal Boolean mApproved;
        internal Boolean mPosted;
        internal Boolean mIsAGInvoice;
        internal Int32 mAGInvType_ID;
        internal Int32 mInv_No;
        internal Int64 mInvoiceID;
        internal String mSLInvoiceNumber;
        internal Int64 mJVID1;
        internal Int64 mJVID2;
        internal Int64 mJVID3;
        internal Int64 mJVID4;
        internal Int32 mSalesManID;
        internal Int32 mforwOperationID;
        internal Boolean mIsCustomClearance;
        internal Int32 mTransType_ID;
        internal Int32 mVoucherType;
        internal String mVoucherTypeName;
        internal Boolean mIsCash;
        internal Boolean mIsCheque;
        internal DateTime mPrintDate;
        internal String mChequeNo;
        internal DateTime mChequeDate;
        internal Int32 mBankID;
        internal String mBankName;
        internal String mOtherSideBankName;
        internal DateTime mCollectionDate;
        internal Decimal mCollectionExpense;
        internal String mUserName;
        internal Boolean mIsAccept;
        internal Int64 mPaymentRequestID;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public DateTime VoucherDate
        {
            get { return mVoucherDate; }
            set { mVoucherDate = value; }
        }
        public Int32 SafeID
        {
            get { return mSafeID; }
            set { mSafeID = value; }
        }
        public String SafeName
        {
            get { return mSafeName; }
            set { mSafeName = value; }
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
        public String ChargedPerson
        {
            get { return mChargedPerson; }
            set { mChargedPerson = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Int32 TaxID
        {
            get { return mTaxID; }
            set { mTaxID = value; }
        }
        public String TaxName
        {
            get { return mTaxName; }
            set { mTaxName = value; }
        }
        public Boolean IsDebitAccount
        {
            get { return mIsDebitAccount; }
            set { mIsDebitAccount = value; }
        }
        public Decimal TaxValue
        {
            get { return mTaxValue; }
            set { mTaxValue = value; }
        }
        public Int32 TaxSign
        {
            get { return mTaxSign; }
            set { mTaxSign = value; }
        }
        public Int32 TaxID2
        {
            get { return mTaxID2; }
            set { mTaxID2 = value; }
        }
        public String TaxName2
        {
            get { return mTaxName2; }
            set { mTaxName2 = value; }
        }
        public Boolean IsDebitAccount2
        {
            get { return mIsDebitAccount2; }
            set { mIsDebitAccount2 = value; }
        }
        public Decimal TaxValue2
        {
            get { return mTaxValue2; }
            set { mTaxValue2 = value; }
        }
        public Int32 TaxSign2
        {
            get { return mTaxSign2; }
            set { mTaxSign2 = value; }
        }
        public Decimal Total
        {
            get { return mTotal; }
            set { mTotal = value; }
        }
        public Decimal TotalAfterTax
        {
            get { return mTotalAfterTax; }
            set { mTotalAfterTax = value; }
        }
        public Boolean Approved
        {
            get { return mApproved; }
            set { mApproved = value; }
        }
        public Boolean Posted
        {
            get { return mPosted; }
            set { mPosted = value; }
        }
        public Boolean IsAGInvoice
        {
            get { return mIsAGInvoice; }
            set { mIsAGInvoice = value; }
        }
        public Int32 AGInvType_ID
        {
            get { return mAGInvType_ID; }
            set { mAGInvType_ID = value; }
        }
        public Int32 Inv_No
        {
            get { return mInv_No; }
            set { mInv_No = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mInvoiceID = value; }
        }
        public String SLInvoiceNumber
        {
            get { return mSLInvoiceNumber; }
            set { mSLInvoiceNumber = value; }
        }
        public Int64 JVID1
        {
            get { return mJVID1; }
            set { mJVID1 = value; }
        }
        public Int64 JVID2
        {
            get { return mJVID2; }
            set { mJVID2 = value; }
        }
        public Int64 JVID3
        {
            get { return mJVID3; }
            set { mJVID3 = value; }
        }
        public Int64 JVID4
        {
            get { return mJVID4; }
            set { mJVID4 = value; }
        }
        public Int32 SalesManID
        {
            get { return mSalesManID; }
            set { mSalesManID = value; }
        }
        public Int32 forwOperationID
        {
            get { return mforwOperationID; }
            set { mforwOperationID = value; }
        }
        public Boolean IsCustomClearance
        {
            get { return mIsCustomClearance; }
            set { mIsCustomClearance = value; }
        }
        public Int32 TransType_ID
        {
            get { return mTransType_ID; }
            set { mTransType_ID = value; }
        }
        public Int32 VoucherType
        {
            get { return mVoucherType; }
            set { mVoucherType = value; }
        }
        public String VoucherTypeName
        {
            get { return mVoucherTypeName; }
            set { mVoucherTypeName = value; }
        }
        public Boolean IsCash
        {
            get { return mIsCash; }
            set { mIsCash = value; }
        }
        public Boolean IsCheque
        {
            get { return mIsCheque; }
            set { mIsCheque = value; }
        }
        public DateTime PrintDate
        {
            get { return mPrintDate; }
            set { mPrintDate = value; }
        }
        public String ChequeNo
        {
            get { return mChequeNo; }
            set { mChequeNo = value; }
        }
        public DateTime ChequeDate
        {
            get { return mChequeDate; }
            set { mChequeDate = value; }
        }
        public Int32 BankID
        {
            get { return mBankID; }
            set { mBankID = value; }
        }
        public String BankName
        {
            get { return mBankName; }
            set { mBankName = value; }
        }
        public String OtherSideBankName
        {
            get { return mOtherSideBankName; }
            set { mOtherSideBankName = value; }
        }
        public DateTime CollectionDate
        {
            get { return mCollectionDate; }
            set { mCollectionDate = value; }
        }
        public Decimal CollectionExpense
        {
            get { return mCollectionExpense; }
            set { mCollectionExpense = value; }
        }
        public String UserName
        {
            get { return mUserName; }
            set { mUserName = value; }
        }
        public Boolean IsAccept
        {
            get { return mIsAccept; }
            set { mIsAccept = value; }
        }
        public Int64 PaymentRequestID
        {
            get { return mPaymentRequestID; }
            set { mPaymentRequestID = value; }
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

    public partial class CvwA_ExchangeMovement
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
        public List<CVarvwA_ExchangeMovement> lstCVarvwA_ExchangeMovement = new List<CVarvwA_ExchangeMovement>();
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
            lstCVarvwA_ExchangeMovement.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwA_ExchangeMovement";
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
                        CVarvwA_ExchangeMovement ObjCVarvwA_ExchangeMovement = new CVarvwA_ExchangeMovement();
                        ObjCVarvwA_ExchangeMovement.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwA_ExchangeMovement.mVoucherDate = Convert.ToDateTime(dr["VoucherDate"].ToString());
                        ObjCVarvwA_ExchangeMovement.mSafeID = Convert.ToInt32(dr["SafeID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mSafeName = Convert.ToString(dr["SafeName"].ToString());
                        ObjCVarvwA_ExchangeMovement.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwA_ExchangeMovement.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwA_ExchangeMovement.mChargedPerson = Convert.ToString(dr["ChargedPerson"].ToString());
                        ObjCVarvwA_ExchangeMovement.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTaxID = Convert.ToInt32(dr["TaxID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTaxName = Convert.ToString(dr["TaxName"].ToString());
                        ObjCVarvwA_ExchangeMovement.mIsDebitAccount = Convert.ToBoolean(dr["IsDebitAccount"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTaxValue = Convert.ToDecimal(dr["TaxValue"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTaxSign = Convert.ToInt32(dr["TaxSign"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTaxID2 = Convert.ToInt32(dr["TaxID2"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTaxName2 = Convert.ToString(dr["TaxName2"].ToString());
                        ObjCVarvwA_ExchangeMovement.mIsDebitAccount2 = Convert.ToBoolean(dr["IsDebitAccount2"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTaxValue2 = Convert.ToDecimal(dr["TaxValue2"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTaxSign2 = Convert.ToInt32(dr["TaxSign2"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTotal = Convert.ToDecimal(dr["Total"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTotalAfterTax = Convert.ToDecimal(dr["TotalAfterTax"].ToString());
                        ObjCVarvwA_ExchangeMovement.mApproved = Convert.ToBoolean(dr["Approved"].ToString());
                        ObjCVarvwA_ExchangeMovement.mPosted = Convert.ToBoolean(dr["Posted"].ToString());
                        ObjCVarvwA_ExchangeMovement.mIsAGInvoice = Convert.ToBoolean(dr["IsAGInvoice"].ToString());
                        ObjCVarvwA_ExchangeMovement.mAGInvType_ID = Convert.ToInt32(dr["AGInvType_ID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mInv_No = Convert.ToInt32(dr["Inv_No"].ToString());
                        ObjCVarvwA_ExchangeMovement.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mSLInvoiceNumber = Convert.ToString(dr["SLInvoiceNumber"].ToString());
                        ObjCVarvwA_ExchangeMovement.mJVID1 = Convert.ToInt64(dr["JVID1"].ToString());
                        ObjCVarvwA_ExchangeMovement.mJVID2 = Convert.ToInt64(dr["JVID2"].ToString());
                        ObjCVarvwA_ExchangeMovement.mJVID3 = Convert.ToInt64(dr["JVID3"].ToString());
                        ObjCVarvwA_ExchangeMovement.mJVID4 = Convert.ToInt64(dr["JVID4"].ToString());
                        ObjCVarvwA_ExchangeMovement.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mforwOperationID = Convert.ToInt32(dr["forwOperationID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mIsCustomClearance = Convert.ToBoolean(dr["IsCustomClearance"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTransType_ID = Convert.ToInt32(dr["TransType_ID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mVoucherType = Convert.ToInt32(dr["VoucherType"].ToString());
                        ObjCVarvwA_ExchangeMovement.mVoucherTypeName = Convert.ToString(dr["VoucherTypeName"].ToString());
                        ObjCVarvwA_ExchangeMovement.mIsCash = Convert.ToBoolean(dr["IsCash"].ToString());
                        ObjCVarvwA_ExchangeMovement.mIsCheque = Convert.ToBoolean(dr["IsCheque"].ToString());
                        ObjCVarvwA_ExchangeMovement.mPrintDate = Convert.ToDateTime(dr["PrintDate"].ToString());
                        ObjCVarvwA_ExchangeMovement.mChequeNo = Convert.ToString(dr["ChequeNo"].ToString());
                        ObjCVarvwA_ExchangeMovement.mChequeDate = Convert.ToDateTime(dr["ChequeDate"].ToString());
                        ObjCVarvwA_ExchangeMovement.mBankID = Convert.ToInt32(dr["BankID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarvwA_ExchangeMovement.mOtherSideBankName = Convert.ToString(dr["OtherSideBankName"].ToString());
                        ObjCVarvwA_ExchangeMovement.mCollectionDate = Convert.ToDateTime(dr["CollectionDate"].ToString());
                        ObjCVarvwA_ExchangeMovement.mCollectionExpense = Convert.ToDecimal(dr["CollectionExpense"].ToString());
                        ObjCVarvwA_ExchangeMovement.mUserName = Convert.ToString(dr["UserName"].ToString());
                        ObjCVarvwA_ExchangeMovement.mIsAccept = Convert.ToBoolean(dr["IsAccept"].ToString());
                        ObjCVarvwA_ExchangeMovement.mPaymentRequestID = Convert.ToInt64(dr["PaymentRequestID"].ToString());
                        lstCVarvwA_ExchangeMovement.Add(ObjCVarvwA_ExchangeMovement);
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
            lstCVarvwA_ExchangeMovement.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwA_ExchangeMovement";
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
                        CVarvwA_ExchangeMovement ObjCVarvwA_ExchangeMovement = new CVarvwA_ExchangeMovement();
                        ObjCVarvwA_ExchangeMovement.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwA_ExchangeMovement.mVoucherDate = Convert.ToDateTime(dr["VoucherDate"].ToString());
                        ObjCVarvwA_ExchangeMovement.mSafeID = Convert.ToInt32(dr["SafeID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mSafeName = Convert.ToString(dr["SafeName"].ToString());
                        ObjCVarvwA_ExchangeMovement.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwA_ExchangeMovement.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwA_ExchangeMovement.mChargedPerson = Convert.ToString(dr["ChargedPerson"].ToString());
                        ObjCVarvwA_ExchangeMovement.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTaxID = Convert.ToInt32(dr["TaxID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTaxName = Convert.ToString(dr["TaxName"].ToString());
                        ObjCVarvwA_ExchangeMovement.mIsDebitAccount = Convert.ToBoolean(dr["IsDebitAccount"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTaxValue = Convert.ToDecimal(dr["TaxValue"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTaxSign = Convert.ToInt32(dr["TaxSign"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTaxID2 = Convert.ToInt32(dr["TaxID2"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTaxName2 = Convert.ToString(dr["TaxName2"].ToString());
                        ObjCVarvwA_ExchangeMovement.mIsDebitAccount2 = Convert.ToBoolean(dr["IsDebitAccount2"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTaxValue2 = Convert.ToDecimal(dr["TaxValue2"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTaxSign2 = Convert.ToInt32(dr["TaxSign2"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTotal = Convert.ToDecimal(dr["Total"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTotalAfterTax = Convert.ToDecimal(dr["TotalAfterTax"].ToString());
                        ObjCVarvwA_ExchangeMovement.mApproved = Convert.ToBoolean(dr["Approved"].ToString());
                        ObjCVarvwA_ExchangeMovement.mPosted = Convert.ToBoolean(dr["Posted"].ToString());
                        ObjCVarvwA_ExchangeMovement.mIsAGInvoice = Convert.ToBoolean(dr["IsAGInvoice"].ToString());
                        ObjCVarvwA_ExchangeMovement.mAGInvType_ID = Convert.ToInt32(dr["AGInvType_ID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mInv_No = Convert.ToInt32(dr["Inv_No"].ToString());
                        ObjCVarvwA_ExchangeMovement.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mSLInvoiceNumber = Convert.ToString(dr["SLInvoiceNumber"].ToString());
                        ObjCVarvwA_ExchangeMovement.mJVID1 = Convert.ToInt64(dr["JVID1"].ToString());
                        ObjCVarvwA_ExchangeMovement.mJVID2 = Convert.ToInt64(dr["JVID2"].ToString());
                        ObjCVarvwA_ExchangeMovement.mJVID3 = Convert.ToInt64(dr["JVID3"].ToString());
                        ObjCVarvwA_ExchangeMovement.mJVID4 = Convert.ToInt64(dr["JVID4"].ToString());
                        ObjCVarvwA_ExchangeMovement.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mforwOperationID = Convert.ToInt32(dr["forwOperationID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mIsCustomClearance = Convert.ToBoolean(dr["IsCustomClearance"].ToString());
                        ObjCVarvwA_ExchangeMovement.mTransType_ID = Convert.ToInt32(dr["TransType_ID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mVoucherType = Convert.ToInt32(dr["VoucherType"].ToString());
                        ObjCVarvwA_ExchangeMovement.mVoucherTypeName = Convert.ToString(dr["VoucherTypeName"].ToString());
                        ObjCVarvwA_ExchangeMovement.mIsCash = Convert.ToBoolean(dr["IsCash"].ToString());
                        ObjCVarvwA_ExchangeMovement.mIsCheque = Convert.ToBoolean(dr["IsCheque"].ToString());
                        ObjCVarvwA_ExchangeMovement.mPrintDate = Convert.ToDateTime(dr["PrintDate"].ToString());
                        ObjCVarvwA_ExchangeMovement.mChequeNo = Convert.ToString(dr["ChequeNo"].ToString());
                        ObjCVarvwA_ExchangeMovement.mChequeDate = Convert.ToDateTime(dr["ChequeDate"].ToString());
                        ObjCVarvwA_ExchangeMovement.mBankID = Convert.ToInt32(dr["BankID"].ToString());
                        ObjCVarvwA_ExchangeMovement.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarvwA_ExchangeMovement.mOtherSideBankName = Convert.ToString(dr["OtherSideBankName"].ToString());
                        ObjCVarvwA_ExchangeMovement.mCollectionDate = Convert.ToDateTime(dr["CollectionDate"].ToString());
                        ObjCVarvwA_ExchangeMovement.mCollectionExpense = Convert.ToDecimal(dr["CollectionExpense"].ToString());
                        ObjCVarvwA_ExchangeMovement.mUserName = Convert.ToString(dr["UserName"].ToString());
                        ObjCVarvwA_ExchangeMovement.mIsAccept = Convert.ToBoolean(dr["IsAccept"].ToString());
                        ObjCVarvwA_ExchangeMovement.mPaymentRequestID = Convert.ToInt64(dr["PaymentRequestID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_ExchangeMovement.Add(ObjCVarvwA_ExchangeMovement);
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
