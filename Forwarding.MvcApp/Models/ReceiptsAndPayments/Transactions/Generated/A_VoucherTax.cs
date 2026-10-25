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
    public class CPKA_VoucherTax
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
    public partial class CVarA_VoucherTax : CPKA_VoucherTax
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal DateTime mVoucherDate;
        internal Int32 mSafeID;
        internal Int32 mCurrencyID;
        internal Decimal mExchangeRate;
        internal String mChargedPerson;
        internal String mNotes;
        internal Int32 mTaxID;
        internal Decimal mTaxValue;
        internal Int32 mTaxSign;
        internal Int32 mTaxID2;
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
        internal Int64 mJVID1;
        internal Int64 mJVID2;
        internal Int64 mJVID3;
        internal Int64 mJVID4;
        internal Int32 mSalesManID;
        internal Int32 mforwOperationID;
        internal Boolean mIsCustomClearance;
        internal Int32 mTransType_ID;
        internal Int32 mVoucherType;
        internal Boolean mIsCash;
        internal Boolean mIsCheque;
        internal DateTime mPrintDate;
        internal String mChequeNo;
        internal DateTime mChequeDate;
        internal Int32 mBankID;
        internal String mOtherSideBankName;
        internal DateTime mCollectionDate;
        internal Decimal mCollectionExpense;
        internal Int32 mDisbursementJob_ID;
        internal Int32 mSL_SalesManID;
        internal Boolean mIsLiner;
        internal Int32 mBill_ID;
        internal String mIBAN;
        internal String mReferenceNo;
        internal DateTime mDepositeDate;
        internal DateTime mTransferDate;
        internal Decimal mPaidAmount;
        internal Decimal mRemainAmount;
        internal Boolean misTransfer;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public DateTime VoucherDate
        {
            get { return mVoucherDate; }
            set { mIsChanges = true; mVoucherDate = value; }
        }
        public Int32 SafeID
        {
            get { return mSafeID; }
            set { mIsChanges = true; mSafeID = value; }
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
        public String ChargedPerson
        {
            get { return mChargedPerson; }
            set { mIsChanges = true; mChargedPerson = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int32 TaxID
        {
            get { return mTaxID; }
            set { mIsChanges = true; mTaxID = value; }
        }
        public Decimal TaxValue
        {
            get { return mTaxValue; }
            set { mIsChanges = true; mTaxValue = value; }
        }
        public Int32 TaxSign
        {
            get { return mTaxSign; }
            set { mIsChanges = true; mTaxSign = value; }
        }
        public Int32 TaxID2
        {
            get { return mTaxID2; }
            set { mIsChanges = true; mTaxID2 = value; }
        }
        public Decimal TaxValue2
        {
            get { return mTaxValue2; }
            set { mIsChanges = true; mTaxValue2 = value; }
        }
        public Int32 TaxSign2
        {
            get { return mTaxSign2; }
            set { mIsChanges = true; mTaxSign2 = value; }
        }
        public Decimal Total
        {
            get { return mTotal; }
            set { mIsChanges = true; mTotal = value; }
        }
        public Decimal TotalAfterTax
        {
            get { return mTotalAfterTax; }
            set { mIsChanges = true; mTotalAfterTax = value; }
        }
        public Boolean Approved
        {
            get { return mApproved; }
            set { mIsChanges = true; mApproved = value; }
        }
        public Boolean Posted
        {
            get { return mPosted; }
            set { mIsChanges = true; mPosted = value; }
        }
        public Boolean IsAGInvoice
        {
            get { return mIsAGInvoice; }
            set { mIsChanges = true; mIsAGInvoice = value; }
        }
        public Int32 AGInvType_ID
        {
            get { return mAGInvType_ID; }
            set { mIsChanges = true; mAGInvType_ID = value; }
        }
        public Int32 Inv_No
        {
            get { return mInv_No; }
            set { mIsChanges = true; mInv_No = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mIsChanges = true; mInvoiceID = value; }
        }
        public Int64 JVID1
        {
            get { return mJVID1; }
            set { mIsChanges = true; mJVID1 = value; }
        }
        public Int64 JVID2
        {
            get { return mJVID2; }
            set { mIsChanges = true; mJVID2 = value; }
        }
        public Int64 JVID3
        {
            get { return mJVID3; }
            set { mIsChanges = true; mJVID3 = value; }
        }
        public Int64 JVID4
        {
            get { return mJVID4; }
            set { mIsChanges = true; mJVID4 = value; }
        }
        public Int32 SalesManID
        {
            get { return mSalesManID; }
            set { mIsChanges = true; mSalesManID = value; }
        }
        public Int32 forwOperationID
        {
            get { return mforwOperationID; }
            set { mIsChanges = true; mforwOperationID = value; }
        }
        public Boolean IsCustomClearance
        {
            get { return mIsCustomClearance; }
            set { mIsChanges = true; mIsCustomClearance = value; }
        }
        public Int32 TransType_ID
        {
            get { return mTransType_ID; }
            set { mIsChanges = true; mTransType_ID = value; }
        }
        public Int32 VoucherType
        {
            get { return mVoucherType; }
            set { mIsChanges = true; mVoucherType = value; }
        }
        public Boolean IsCash
        {
            get { return mIsCash; }
            set { mIsChanges = true; mIsCash = value; }
        }
        public Boolean IsCheque
        {
            get { return mIsCheque; }
            set { mIsChanges = true; mIsCheque = value; }
        }
        public DateTime PrintDate
        {
            get { return mPrintDate; }
            set { mIsChanges = true; mPrintDate = value; }
        }
        public String ChequeNo
        {
            get { return mChequeNo; }
            set { mIsChanges = true; mChequeNo = value; }
        }
        public DateTime ChequeDate
        {
            get { return mChequeDate; }
            set { mIsChanges = true; mChequeDate = value; }
        }
        public Int32 BankID
        {
            get { return mBankID; }
            set { mIsChanges = true; mBankID = value; }
        }
        public String OtherSideBankName
        {
            get { return mOtherSideBankName; }
            set { mIsChanges = true; mOtherSideBankName = value; }
        }
        public DateTime CollectionDate
        {
            get { return mCollectionDate; }
            set { mIsChanges = true; mCollectionDate = value; }
        }
        public Decimal CollectionExpense
        {
            get { return mCollectionExpense; }
            set { mIsChanges = true; mCollectionExpense = value; }
        }
        public Int32 DisbursementJob_ID
        {
            get { return mDisbursementJob_ID; }
            set { mIsChanges = true; mDisbursementJob_ID = value; }
        }
        public Int32 SL_SalesManID
        {
            get { return mSL_SalesManID; }
            set { mIsChanges = true; mSL_SalesManID = value; }
        }
        public Boolean IsLiner
        {
            get { return mIsLiner; }
            set { mIsChanges = true; mIsLiner = value; }
        }
        public Int32 Bill_ID
        {
            get { return mBill_ID; }
            set { mIsChanges = true; mBill_ID = value; }
        }
        public String IBAN
        {
            get { return mIBAN; }
            set { mIsChanges = true; mIBAN = value; }
        }
        public String ReferenceNo
        {
            get { return mReferenceNo; }
            set { mIsChanges = true; mReferenceNo = value; }
        }
        public DateTime DepositeDate
        {
            get { return mDepositeDate; }
            set { mIsChanges = true; mDepositeDate = value; }
        }
        public DateTime TransferDate
        {
            get { return mTransferDate; }
            set { mIsChanges = true; mTransferDate = value; }
        }
        public Decimal PaidAmount
        {
            get { return mPaidAmount; }
            set { mIsChanges = true; mPaidAmount = value; }
        }
        public Decimal RemainAmount
        {
            get { return mRemainAmount; }
            set { mIsChanges = true; mRemainAmount = value; }
        }
        public Boolean isTransfer
        {
            get { return misTransfer; }
            set { mIsChanges = true; misTransfer = value; }
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

    public partial class CA_VoucherTax
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
        public List<CVarA_VoucherTax> lstCVarA_Voucher = new List<CVarA_VoucherTax>();
        public List<CPKA_VoucherTax> lstDeletedCPKA_Voucher = new List<CPKA_VoucherTax>();
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
            lstCVarA_Voucher.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_Voucher";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_Voucher";
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
                        CVarA_VoucherTax ObjCVarA_Voucher = new CVarA_VoucherTax();
                        ObjCVarA_Voucher.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarA_Voucher.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarA_Voucher.mVoucherDate = Convert.ToDateTime(dr["VoucherDate"].ToString());
                        ObjCVarA_Voucher.mSafeID = Convert.ToInt32(dr["SafeID"].ToString());
                        ObjCVarA_Voucher.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarA_Voucher.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarA_Voucher.mChargedPerson = Convert.ToString(dr["ChargedPerson"].ToString());
                        ObjCVarA_Voucher.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarA_Voucher.mTaxID = Convert.ToInt32(dr["TaxID"].ToString());
                        ObjCVarA_Voucher.mTaxValue = Convert.ToDecimal(dr["TaxValue"].ToString());
                        ObjCVarA_Voucher.mTaxSign = Convert.ToInt32(dr["TaxSign"].ToString());
                        ObjCVarA_Voucher.mTaxID2 = Convert.ToInt32(dr["TaxID2"].ToString());
                        ObjCVarA_Voucher.mTaxValue2 = Convert.ToDecimal(dr["TaxValue2"].ToString());
                        ObjCVarA_Voucher.mTaxSign2 = Convert.ToInt32(dr["TaxSign2"].ToString());
                        ObjCVarA_Voucher.mTotal = Convert.ToDecimal(dr["Total"].ToString());
                        ObjCVarA_Voucher.mTotalAfterTax = Convert.ToDecimal(dr["TotalAfterTax"].ToString());
                        ObjCVarA_Voucher.mApproved = Convert.ToBoolean(dr["Approved"].ToString());
                        ObjCVarA_Voucher.mPosted = Convert.ToBoolean(dr["Posted"].ToString());
                        ObjCVarA_Voucher.mIsAGInvoice = Convert.ToBoolean(dr["IsAGInvoice"].ToString());
                        ObjCVarA_Voucher.mAGInvType_ID = Convert.ToInt32(dr["AGInvType_ID"].ToString());
                        ObjCVarA_Voucher.mInv_No = Convert.ToInt32(dr["Inv_No"].ToString());
                        ObjCVarA_Voucher.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarA_Voucher.mJVID1 = Convert.ToInt64(dr["JVID1"].ToString());
                        ObjCVarA_Voucher.mJVID2 = Convert.ToInt64(dr["JVID2"].ToString());
                        ObjCVarA_Voucher.mJVID3 = Convert.ToInt64(dr["JVID3"].ToString());
                        ObjCVarA_Voucher.mJVID4 = Convert.ToInt64(dr["JVID4"].ToString());
                        ObjCVarA_Voucher.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarA_Voucher.mforwOperationID = Convert.ToInt32(dr["forwOperationID"].ToString());
                        ObjCVarA_Voucher.mIsCustomClearance = Convert.ToBoolean(dr["IsCustomClearance"].ToString());
                        ObjCVarA_Voucher.mTransType_ID = Convert.ToInt32(dr["TransType_ID"].ToString());
                        ObjCVarA_Voucher.mVoucherType = Convert.ToInt32(dr["VoucherType"].ToString());
                        ObjCVarA_Voucher.mIsCash = Convert.ToBoolean(dr["IsCash"].ToString());
                        ObjCVarA_Voucher.mIsCheque = Convert.ToBoolean(dr["IsCheque"].ToString());
                        ObjCVarA_Voucher.mPrintDate = Convert.ToDateTime(dr["PrintDate"].ToString());
                        ObjCVarA_Voucher.mChequeNo = Convert.ToString(dr["ChequeNo"].ToString());
                        ObjCVarA_Voucher.mChequeDate = Convert.ToDateTime(dr["ChequeDate"].ToString());
                        ObjCVarA_Voucher.mBankID = Convert.ToInt32(dr["BankID"].ToString());
                        ObjCVarA_Voucher.mOtherSideBankName = Convert.ToString(dr["OtherSideBankName"].ToString());
                        ObjCVarA_Voucher.mCollectionDate = Convert.ToDateTime(dr["CollectionDate"].ToString());
                        ObjCVarA_Voucher.mCollectionExpense = Convert.ToDecimal(dr["CollectionExpense"].ToString());
                        ObjCVarA_Voucher.mDisbursementJob_ID = Convert.ToInt32(dr["DisbursementJob_ID"].ToString());
                        ObjCVarA_Voucher.mSL_SalesManID = Convert.ToInt32(dr["SL_SalesManID"].ToString());
                        ObjCVarA_Voucher.mIsLiner = Convert.ToBoolean(dr["IsLiner"].ToString());
                        ObjCVarA_Voucher.mBill_ID = Convert.ToInt32(dr["Bill_ID"].ToString());
                        ObjCVarA_Voucher.mIBAN = Convert.ToString(dr["IBAN"].ToString());
                        ObjCVarA_Voucher.mReferenceNo = Convert.ToString(dr["ReferenceNo"].ToString());
                        ObjCVarA_Voucher.mDepositeDate = Convert.ToDateTime(dr["DepositeDate"].ToString());
                        ObjCVarA_Voucher.mTransferDate = Convert.ToDateTime(dr["TransferDate"].ToString());
                        ObjCVarA_Voucher.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarA_Voucher.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarA_Voucher.misTransfer = Convert.ToBoolean(dr["isTransfer"].ToString());
                        lstCVarA_Voucher.Add(ObjCVarA_Voucher);
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
            lstCVarA_Voucher.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_Voucher";
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
                        CVarA_VoucherTax ObjCVarA_Voucher = new CVarA_VoucherTax();
                        ObjCVarA_Voucher.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarA_Voucher.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarA_Voucher.mVoucherDate = Convert.ToDateTime(dr["VoucherDate"].ToString());
                        ObjCVarA_Voucher.mSafeID = Convert.ToInt32(dr["SafeID"].ToString());
                        ObjCVarA_Voucher.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarA_Voucher.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarA_Voucher.mChargedPerson = Convert.ToString(dr["ChargedPerson"].ToString());
                        ObjCVarA_Voucher.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarA_Voucher.mTaxID = Convert.ToInt32(dr["TaxID"].ToString());
                        ObjCVarA_Voucher.mTaxValue = Convert.ToDecimal(dr["TaxValue"].ToString());
                        ObjCVarA_Voucher.mTaxSign = Convert.ToInt32(dr["TaxSign"].ToString());
                        ObjCVarA_Voucher.mTaxID2 = Convert.ToInt32(dr["TaxID2"].ToString());
                        ObjCVarA_Voucher.mTaxValue2 = Convert.ToDecimal(dr["TaxValue2"].ToString());
                        ObjCVarA_Voucher.mTaxSign2 = Convert.ToInt32(dr["TaxSign2"].ToString());
                        ObjCVarA_Voucher.mTotal = Convert.ToDecimal(dr["Total"].ToString());
                        ObjCVarA_Voucher.mTotalAfterTax = Convert.ToDecimal(dr["TotalAfterTax"].ToString());
                        ObjCVarA_Voucher.mApproved = Convert.ToBoolean(dr["Approved"].ToString());
                        ObjCVarA_Voucher.mPosted = Convert.ToBoolean(dr["Posted"].ToString());
                        ObjCVarA_Voucher.mIsAGInvoice = Convert.ToBoolean(dr["IsAGInvoice"].ToString());
                        ObjCVarA_Voucher.mAGInvType_ID = Convert.ToInt32(dr["AGInvType_ID"].ToString());
                        ObjCVarA_Voucher.mInv_No = Convert.ToInt32(dr["Inv_No"].ToString());
                        ObjCVarA_Voucher.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarA_Voucher.mJVID1 = Convert.ToInt64(dr["JVID1"].ToString());
                        ObjCVarA_Voucher.mJVID2 = Convert.ToInt64(dr["JVID2"].ToString());
                        ObjCVarA_Voucher.mJVID3 = Convert.ToInt64(dr["JVID3"].ToString());
                        ObjCVarA_Voucher.mJVID4 = Convert.ToInt64(dr["JVID4"].ToString());
                        ObjCVarA_Voucher.mSalesManID = Convert.ToInt32(dr["SalesManID"].ToString());
                        ObjCVarA_Voucher.mforwOperationID = Convert.ToInt32(dr["forwOperationID"].ToString());
                        ObjCVarA_Voucher.mIsCustomClearance = Convert.ToBoolean(dr["IsCustomClearance"].ToString());
                        ObjCVarA_Voucher.mTransType_ID = Convert.ToInt32(dr["TransType_ID"].ToString());
                        ObjCVarA_Voucher.mVoucherType = Convert.ToInt32(dr["VoucherType"].ToString());
                        ObjCVarA_Voucher.mIsCash = Convert.ToBoolean(dr["IsCash"].ToString());
                        ObjCVarA_Voucher.mIsCheque = Convert.ToBoolean(dr["IsCheque"].ToString());
                        ObjCVarA_Voucher.mPrintDate = Convert.ToDateTime(dr["PrintDate"].ToString());
                        ObjCVarA_Voucher.mChequeNo = Convert.ToString(dr["ChequeNo"].ToString());
                        ObjCVarA_Voucher.mChequeDate = Convert.ToDateTime(dr["ChequeDate"].ToString());
                        ObjCVarA_Voucher.mBankID = Convert.ToInt32(dr["BankID"].ToString());
                        ObjCVarA_Voucher.mOtherSideBankName = Convert.ToString(dr["OtherSideBankName"].ToString());
                        ObjCVarA_Voucher.mCollectionDate = Convert.ToDateTime(dr["CollectionDate"].ToString());
                        ObjCVarA_Voucher.mCollectionExpense = Convert.ToDecimal(dr["CollectionExpense"].ToString());
                        ObjCVarA_Voucher.mDisbursementJob_ID = Convert.ToInt32(dr["DisbursementJob_ID"].ToString());
                        ObjCVarA_Voucher.mSL_SalesManID = Convert.ToInt32(dr["SL_SalesManID"].ToString());
                        ObjCVarA_Voucher.mIsLiner = Convert.ToBoolean(dr["IsLiner"].ToString());
                        ObjCVarA_Voucher.mBill_ID = Convert.ToInt32(dr["Bill_ID"].ToString());
                        ObjCVarA_Voucher.mIBAN = Convert.ToString(dr["IBAN"].ToString());
                        ObjCVarA_Voucher.mReferenceNo = Convert.ToString(dr["ReferenceNo"].ToString());
                        ObjCVarA_Voucher.mDepositeDate = Convert.ToDateTime(dr["DepositeDate"].ToString());
                        ObjCVarA_Voucher.mTransferDate = Convert.ToDateTime(dr["TransferDate"].ToString());
                        ObjCVarA_Voucher.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarA_Voucher.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarA_Voucher.misTransfer = Convert.ToBoolean(dr["isTransfer"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_Voucher.Add(ObjCVarA_Voucher);
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
                    Com.CommandText = "[dbo].DeleteListA_Voucher";
                else
                    Com.CommandText = "[dbo].UpdateListA_Voucher";
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
        public Exception DeleteItem(List<CPKA_VoucherTax> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_Voucher";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKA_VoucherTax ObjCPKA_Voucher in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKA_Voucher.ID);
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
        public Exception SaveMethod(List<CVarA_VoucherTax> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@VoucherDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@SafeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ChargedPerson", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TaxID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TaxValue", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TaxSign", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TaxID2", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TaxValue2", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TaxSign2", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Total", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TotalAfterTax", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Approved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Posted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsAGInvoice", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@AGInvType_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Inv_No", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@InvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@JVID1", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@JVID2", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@JVID3", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@JVID4", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@SalesManID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@forwOperationID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsCustomClearance", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@TransType_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@VoucherType", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsCash", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsCheque", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@PrintDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ChequeNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ChequeDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@BankID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OtherSideBankName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CollectionDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CollectionExpense", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DisbursementJob_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SL_SalesManID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsLiner", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Bill_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IBAN", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ReferenceNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DepositeDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@TransferDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PaidAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@RemainAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@isTransfer", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarA_VoucherTax ObjCVarA_Voucher in SaveList)
                {
                    if (ObjCVarA_Voucher.mIsChanges == true)
                    {
                        if (ObjCVarA_Voucher.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_VoucherTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_Voucher.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_VoucherTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_Voucher.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarA_Voucher.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarA_Voucher.Code;
                        Com.Parameters["@VoucherDate"].Value = ObjCVarA_Voucher.VoucherDate;
                        Com.Parameters["@SafeID"].Value = ObjCVarA_Voucher.SafeID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarA_Voucher.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarA_Voucher.ExchangeRate;
                        Com.Parameters["@ChargedPerson"].Value = ObjCVarA_Voucher.ChargedPerson;
                        Com.Parameters["@Notes"].Value = ObjCVarA_Voucher.Notes;
                        Com.Parameters["@TaxID"].Value = ObjCVarA_Voucher.TaxID;
                        Com.Parameters["@TaxValue"].Value = ObjCVarA_Voucher.TaxValue;
                        Com.Parameters["@TaxSign"].Value = ObjCVarA_Voucher.TaxSign;
                        Com.Parameters["@TaxID2"].Value = ObjCVarA_Voucher.TaxID2;
                        Com.Parameters["@TaxValue2"].Value = ObjCVarA_Voucher.TaxValue2;
                        Com.Parameters["@TaxSign2"].Value = ObjCVarA_Voucher.TaxSign2;
                        Com.Parameters["@Total"].Value = ObjCVarA_Voucher.Total;
                        Com.Parameters["@TotalAfterTax"].Value = ObjCVarA_Voucher.TotalAfterTax;
                        Com.Parameters["@Approved"].Value = ObjCVarA_Voucher.Approved;
                        Com.Parameters["@Posted"].Value = ObjCVarA_Voucher.Posted;
                        Com.Parameters["@IsAGInvoice"].Value = ObjCVarA_Voucher.IsAGInvoice;
                        Com.Parameters["@AGInvType_ID"].Value = ObjCVarA_Voucher.AGInvType_ID;
                        Com.Parameters["@Inv_No"].Value = ObjCVarA_Voucher.Inv_No;
                        Com.Parameters["@InvoiceID"].Value = ObjCVarA_Voucher.InvoiceID;
                        Com.Parameters["@JVID1"].Value = ObjCVarA_Voucher.JVID1;
                        Com.Parameters["@JVID2"].Value = ObjCVarA_Voucher.JVID2;
                        Com.Parameters["@JVID3"].Value = ObjCVarA_Voucher.JVID3;
                        Com.Parameters["@JVID4"].Value = ObjCVarA_Voucher.JVID4;
                        Com.Parameters["@SalesManID"].Value = ObjCVarA_Voucher.SalesManID;
                        Com.Parameters["@forwOperationID"].Value = ObjCVarA_Voucher.forwOperationID;
                        Com.Parameters["@IsCustomClearance"].Value = ObjCVarA_Voucher.IsCustomClearance;
                        Com.Parameters["@TransType_ID"].Value = ObjCVarA_Voucher.TransType_ID;
                        Com.Parameters["@VoucherType"].Value = ObjCVarA_Voucher.VoucherType;
                        Com.Parameters["@IsCash"].Value = ObjCVarA_Voucher.IsCash;
                        Com.Parameters["@IsCheque"].Value = ObjCVarA_Voucher.IsCheque;
                        Com.Parameters["@PrintDate"].Value = ObjCVarA_Voucher.PrintDate;
                        Com.Parameters["@ChequeNo"].Value = ObjCVarA_Voucher.ChequeNo;
                        Com.Parameters["@ChequeDate"].Value = ObjCVarA_Voucher.ChequeDate;
                        Com.Parameters["@BankID"].Value = ObjCVarA_Voucher.BankID;
                        Com.Parameters["@OtherSideBankName"].Value = ObjCVarA_Voucher.OtherSideBankName;
                        Com.Parameters["@CollectionDate"].Value = ObjCVarA_Voucher.CollectionDate;
                        Com.Parameters["@CollectionExpense"].Value = ObjCVarA_Voucher.CollectionExpense;
                        Com.Parameters["@DisbursementJob_ID"].Value = ObjCVarA_Voucher.DisbursementJob_ID;
                        Com.Parameters["@SL_SalesManID"].Value = ObjCVarA_Voucher.SL_SalesManID;
                        Com.Parameters["@IsLiner"].Value = ObjCVarA_Voucher.IsLiner;
                        Com.Parameters["@Bill_ID"].Value = ObjCVarA_Voucher.Bill_ID;
                        Com.Parameters["@IBAN"].Value = ObjCVarA_Voucher.IBAN;
                        Com.Parameters["@ReferenceNo"].Value = ObjCVarA_Voucher.ReferenceNo;
                        Com.Parameters["@DepositeDate"].Value = ObjCVarA_Voucher.DepositeDate;
                        Com.Parameters["@TransferDate"].Value = ObjCVarA_Voucher.TransferDate;
                        Com.Parameters["@PaidAmount"].Value = ObjCVarA_Voucher.PaidAmount;
                        Com.Parameters["@RemainAmount"].Value = ObjCVarA_Voucher.RemainAmount;
                        Com.Parameters["@isTransfer"].Value = ObjCVarA_Voucher.isTransfer;
                        EndTrans(Com, Con);
                        if (ObjCVarA_Voucher.ID == 0)
                        {
                            ObjCVarA_Voucher.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarA_Voucher.mIsChanges = false;
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
        public Exception A_JVUpdateList(string WhereClause)
        {
            Boolean IsDelete = false;
            //GlobalConnection.OpenConnection();
            Exception Exp = null;
            //GlobalConnection.GlobalCon = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;// = GlobalConnection.GlobalCom;
            try
            {
                // GlobalConnection.myTrans = GlobalConnection.myConnection.BeginTransaction(IsolationLevel.ReadUncommitted);
                GlobalConnection.myCommand = new SqlCommand();

                GlobalConnection.myCommand.Connection = GlobalConnection.myConnection;
                GlobalConnection.myCommand.Transaction = GlobalConnection.myTrans;
                GlobalConnection.myCommand.CommandType = CommandType.StoredProcedure;
                Com = GlobalConnection.myCommand;
                //GlobalConnection.GlobalCon.Open();
                //Com = new SqlCommand();

                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListA_Voucher";
                else
                    Com.CommandText = "[dbo].UpdateListA_Voucher";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                //BeginTrans(Com, Con);
                Com.Parameters[0].Value = WhereClause;
                //EndTrans(Com, Con);
                Com.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                //Con.Close();
                //Con.Dispose();
            }
            return Exp;
        }
        #endregion
    }

}

