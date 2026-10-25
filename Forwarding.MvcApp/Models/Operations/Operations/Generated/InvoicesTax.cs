using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKInvoicesTAX
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
    public partial class CVarInvoicesTAX : CPKInvoicesTAX
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mInvoiceNumber;
        internal Int32 mInvoiceTypeID;
        internal Int64 mOperationID;
        internal Int64 mOperationPartnerID;
        internal Int64 mAddressID;
        internal String mPrintedAddress;
        internal String mCustomerReference;
        internal Int32 mPaymentTermID;
        internal Int32 mCurrencyID;
        internal Decimal mExchangeRate;
        internal DateTime mInvoiceDate;
        internal DateTime mDueDate;
        internal Decimal mAmountWithoutVAT;
        internal Int32 mTaxTypeID;
        internal Decimal mTaxPercentage;
        internal Decimal mTaxAmount;
        internal Int32 mDiscountTypeID;
        internal Decimal mDiscountPercentage;
        internal Decimal mDiscountAmount;
        internal Decimal mAmount;
        internal Decimal mPaidAmount;
        internal Decimal mRemainingAmount;
        internal Int32 mInvoiceStatusID;
        internal Boolean mIsApproved;
        internal Boolean mIsDeleted;
        internal Int32 mApprovingUserID;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal String mLeftSignature;
        internal String mMiddleSignature;
        internal String mRightSignature;
        internal Int64 mJVID;
        internal String mGRT;
        internal String mDWT;
        internal String mNRT;
        internal String mLOA;
        internal Int64 mRoutingID;
        internal Int64 mOperationContainersAndPackagesID;
        internal Int64 mChildInvoiceID;
        internal Decimal mFixedDiscount;
        internal Boolean mIsNeglectLimit;
        internal Int64 mRelatedToInvoiceID;
        internal Boolean mIsDraftApproved;
        internal Int32 mDraftApprovingUserID;
        internal Int32 mTransactionTypeID;
        internal DateTime mCutOffDate;
        internal String mNotes;
        internal Boolean mIs3PL;
        internal Boolean mIsFleet;
        internal String mEditableNotes;
        internal Boolean mIsPrintOriginal;
        internal Int64 mCancelledInvoiceID;
        internal Boolean mIsDelivered;
        internal Int32 mManualPaymentStatusID;
        #endregion

        #region "Methods"
        public Int64 InvoiceNumber
        {
            get { return mInvoiceNumber; }
            set { mIsChanges = true; mInvoiceNumber = value; }
        }
        public Int32 InvoiceTypeID
        {
            get { return mInvoiceTypeID; }
            set { mIsChanges = true; mInvoiceTypeID = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public Int64 OperationPartnerID
        {
            get { return mOperationPartnerID; }
            set { mIsChanges = true; mOperationPartnerID = value; }
        }
        public Int64 AddressID
        {
            get { return mAddressID; }
            set { mIsChanges = true; mAddressID = value; }
        }
        public String PrintedAddress
        {
            get { return mPrintedAddress; }
            set { mIsChanges = true; mPrintedAddress = value; }
        }
        public String CustomerReference
        {
            get { return mCustomerReference; }
            set { mIsChanges = true; mCustomerReference = value; }
        }
        public Int32 PaymentTermID
        {
            get { return mPaymentTermID; }
            set { mIsChanges = true; mPaymentTermID = value; }
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
        public DateTime InvoiceDate
        {
            get { return mInvoiceDate; }
            set { mIsChanges = true; mInvoiceDate = value; }
        }
        public DateTime DueDate
        {
            get { return mDueDate; }
            set { mIsChanges = true; mDueDate = value; }
        }
        public Decimal AmountWithoutVAT
        {
            get { return mAmountWithoutVAT; }
            set { mIsChanges = true; mAmountWithoutVAT = value; }
        }
        public Int32 TaxTypeID
        {
            get { return mTaxTypeID; }
            set { mIsChanges = true; mTaxTypeID = value; }
        }
        public Decimal TaxPercentage
        {
            get { return mTaxPercentage; }
            set { mIsChanges = true; mTaxPercentage = value; }
        }
        public Decimal TaxAmount
        {
            get { return mTaxAmount; }
            set { mIsChanges = true; mTaxAmount = value; }
        }
        public Int32 DiscountTypeID
        {
            get { return mDiscountTypeID; }
            set { mIsChanges = true; mDiscountTypeID = value; }
        }
        public Decimal DiscountPercentage
        {
            get { return mDiscountPercentage; }
            set { mIsChanges = true; mDiscountPercentage = value; }
        }
        public Decimal DiscountAmount
        {
            get { return mDiscountAmount; }
            set { mIsChanges = true; mDiscountAmount = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mIsChanges = true; mAmount = value; }
        }
        public Decimal PaidAmount
        {
            get { return mPaidAmount; }
            set { mIsChanges = true; mPaidAmount = value; }
        }
        public Decimal RemainingAmount
        {
            get { return mRemainingAmount; }
            set { mIsChanges = true; mRemainingAmount = value; }
        }
        public Int32 InvoiceStatusID
        {
            get { return mInvoiceStatusID; }
            set { mIsChanges = true; mInvoiceStatusID = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsChanges = true; mIsApproved = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
        }
        public Int32 ApprovingUserID
        {
            get { return mApprovingUserID; }
            set { mIsChanges = true; mApprovingUserID = value; }
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
        public String LeftSignature
        {
            get { return mLeftSignature; }
            set { mIsChanges = true; mLeftSignature = value; }
        }
        public String MiddleSignature
        {
            get { return mMiddleSignature; }
            set { mIsChanges = true; mMiddleSignature = value; }
        }
        public String RightSignature
        {
            get { return mRightSignature; }
            set { mIsChanges = true; mRightSignature = value; }
        }
        public Int64 JVID
        {
            get { return mJVID; }
            set { mIsChanges = true; mJVID = value; }
        }
        public String GRT
        {
            get { return mGRT; }
            set { mIsChanges = true; mGRT = value; }
        }
        public String DWT
        {
            get { return mDWT; }
            set { mIsChanges = true; mDWT = value; }
        }
        public String NRT
        {
            get { return mNRT; }
            set { mIsChanges = true; mNRT = value; }
        }
        public String LOA
        {
            get { return mLOA; }
            set { mIsChanges = true; mLOA = value; }
        }
        public Int64 RoutingID
        {
            get { return mRoutingID; }
            set { mIsChanges = true; mRoutingID = value; }
        }
        public Int64 OperationContainersAndPackagesID
        {
            get { return mOperationContainersAndPackagesID; }
            set { mIsChanges = true; mOperationContainersAndPackagesID = value; }
        }
        public Int64 ChildInvoiceID
        {
            get { return mChildInvoiceID; }
            set { mIsChanges = true; mChildInvoiceID = value; }
        }
        public Decimal FixedDiscount
        {
            get { return mFixedDiscount; }
            set { mIsChanges = true; mFixedDiscount = value; }
        }
        public Boolean IsNeglectLimit
        {
            get { return mIsNeglectLimit; }
            set { mIsChanges = true; mIsNeglectLimit = value; }
        }
        public Int64 RelatedToInvoiceID
        {
            get { return mRelatedToInvoiceID; }
            set { mIsChanges = true; mRelatedToInvoiceID = value; }
        }
        public Boolean IsDraftApproved
        {
            get { return mIsDraftApproved; }
            set { mIsChanges = true; mIsDraftApproved = value; }
        }
        public Int32 DraftApprovingUserID
        {
            get { return mDraftApprovingUserID; }
            set { mIsChanges = true; mDraftApprovingUserID = value; }
        }
        public Int32 TransactionTypeID
        {
            get { return mTransactionTypeID; }
            set { mIsChanges = true; mTransactionTypeID = value; }
        }
        public DateTime CutOffDate
        {
            get { return mCutOffDate; }
            set { mIsChanges = true; mCutOffDate = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Boolean Is3PL
        {
            get { return mIs3PL; }
            set { mIsChanges = true; mIs3PL = value; }
        }
        public Boolean IsFleet
        {
            get { return mIsFleet; }
            set { mIsChanges = true; mIsFleet = value; }
        }
        public String EditableNotes
        {
            get { return mEditableNotes; }
            set { mIsChanges = true; mEditableNotes = value; }
        }
        public Boolean IsPrintOriginal
        {
            get { return mIsPrintOriginal; }
            set { mIsChanges = true; mIsPrintOriginal = value; }
        }
        public Int64 CancelledInvoiceID
        {
            get { return mCancelledInvoiceID; }
            set { mIsChanges = true; mCancelledInvoiceID = value; }
        }
        public Boolean IsDelivered
        {
            get { return mIsDelivered; }
            set { mIsChanges = true; mIsDelivered = value; }
        }
        public Int32 ManualPaymentStatusID
        {
            get { return mManualPaymentStatusID; }
            set { mIsChanges = true; mManualPaymentStatusID = value; }
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

    public partial class CInvoicesTax
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
        public List<CVarInvoicesTAX> lstCVarInvoices = new List<CVarInvoicesTAX>();
        public List<CPKInvoicesTAX> lstDeletedCPKInvoices = new List<CPKInvoicesTAX>();
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
            lstCVarInvoices.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListInvoices";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemInvoices";
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
                        CVarInvoicesTAX ObjCVarInvoices = new CVarInvoicesTAX();
                        ObjCVarInvoices.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarInvoices.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarInvoices.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarInvoices.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarInvoices.mOperationPartnerID = Convert.ToInt64(dr["OperationPartnerID"].ToString());
                        ObjCVarInvoices.mAddressID = Convert.ToInt64(dr["AddressID"].ToString());
                        ObjCVarInvoices.mPrintedAddress = Convert.ToString(dr["PrintedAddress"].ToString());
                        ObjCVarInvoices.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
                        ObjCVarInvoices.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarInvoices.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarInvoices.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarInvoices.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarInvoices.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarInvoices.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarInvoices.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarInvoices.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarInvoices.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarInvoices.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarInvoices.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarInvoices.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarInvoices.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarInvoices.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarInvoices.mRemainingAmount = Convert.ToDecimal(dr["RemainingAmount"].ToString());
                        ObjCVarInvoices.mInvoiceStatusID = Convert.ToInt32(dr["InvoiceStatusID"].ToString());
                        ObjCVarInvoices.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarInvoices.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarInvoices.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarInvoices.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarInvoices.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarInvoices.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarInvoices.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarInvoices.mLeftSignature = Convert.ToString(dr["LeftSignature"].ToString());
                        ObjCVarInvoices.mMiddleSignature = Convert.ToString(dr["MiddleSignature"].ToString());
                        ObjCVarInvoices.mRightSignature = Convert.ToString(dr["RightSignature"].ToString());
                        ObjCVarInvoices.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarInvoices.mGRT = Convert.ToString(dr["GRT"].ToString());
                        ObjCVarInvoices.mDWT = Convert.ToString(dr["DWT"].ToString());
                        ObjCVarInvoices.mNRT = Convert.ToString(dr["NRT"].ToString());
                        ObjCVarInvoices.mLOA = Convert.ToString(dr["LOA"].ToString());
                        ObjCVarInvoices.mRoutingID = Convert.ToInt64(dr["RoutingID"].ToString());
                        ObjCVarInvoices.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarInvoices.mChildInvoiceID = Convert.ToInt64(dr["ChildInvoiceID"].ToString());
                        ObjCVarInvoices.mFixedDiscount = Convert.ToDecimal(dr["FixedDiscount"].ToString());
                        ObjCVarInvoices.mIsNeglectLimit = Convert.ToBoolean(dr["IsNeglectLimit"].ToString());
                        ObjCVarInvoices.mRelatedToInvoiceID = Convert.ToInt64(dr["RelatedToInvoiceID"].ToString());
                        ObjCVarInvoices.mIsDraftApproved = Convert.ToBoolean(dr["IsDraftApproved"].ToString());
                        ObjCVarInvoices.mDraftApprovingUserID = Convert.ToInt32(dr["DraftApprovingUserID"].ToString());
                        ObjCVarInvoices.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarInvoices.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarInvoices.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarInvoices.mIs3PL = Convert.ToBoolean(dr["Is3PL"].ToString());
                        ObjCVarInvoices.mIsFleet = Convert.ToBoolean(dr["IsFleet"].ToString());
                        ObjCVarInvoices.mEditableNotes = Convert.ToString(dr["EditableNotes"].ToString());
                        ObjCVarInvoices.mIsPrintOriginal = Convert.ToBoolean(dr["IsPrintOriginal"].ToString());
                        ObjCVarInvoices.mCancelledInvoiceID = Convert.ToInt64(dr["CancelledInvoiceID"].ToString());
                        ObjCVarInvoices.mIsDelivered = Convert.ToBoolean(dr["IsDelivered"].ToString());
                        ObjCVarInvoices.mManualPaymentStatusID = Convert.ToInt32(dr["ManualPaymentStatusID"].ToString());
                        lstCVarInvoices.Add(ObjCVarInvoices);
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
            lstCVarInvoices.Clear();

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
                Com.CommandText = "[dbo].GetListPagingInvoices";
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
                        CVarInvoicesTAX ObjCVarInvoices = new CVarInvoicesTAX();
                        ObjCVarInvoices.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarInvoices.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarInvoices.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarInvoices.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarInvoices.mOperationPartnerID = Convert.ToInt64(dr["OperationPartnerID"].ToString());
                        ObjCVarInvoices.mAddressID = Convert.ToInt64(dr["AddressID"].ToString());
                        ObjCVarInvoices.mPrintedAddress = Convert.ToString(dr["PrintedAddress"].ToString());
                        ObjCVarInvoices.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
                        ObjCVarInvoices.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarInvoices.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarInvoices.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarInvoices.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarInvoices.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarInvoices.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarInvoices.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarInvoices.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarInvoices.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarInvoices.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarInvoices.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarInvoices.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarInvoices.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarInvoices.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarInvoices.mRemainingAmount = Convert.ToDecimal(dr["RemainingAmount"].ToString());
                        ObjCVarInvoices.mInvoiceStatusID = Convert.ToInt32(dr["InvoiceStatusID"].ToString());
                        ObjCVarInvoices.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarInvoices.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarInvoices.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarInvoices.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarInvoices.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarInvoices.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarInvoices.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarInvoices.mLeftSignature = Convert.ToString(dr["LeftSignature"].ToString());
                        ObjCVarInvoices.mMiddleSignature = Convert.ToString(dr["MiddleSignature"].ToString());
                        ObjCVarInvoices.mRightSignature = Convert.ToString(dr["RightSignature"].ToString());
                        ObjCVarInvoices.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarInvoices.mGRT = Convert.ToString(dr["GRT"].ToString());
                        ObjCVarInvoices.mDWT = Convert.ToString(dr["DWT"].ToString());
                        ObjCVarInvoices.mNRT = Convert.ToString(dr["NRT"].ToString());
                        ObjCVarInvoices.mLOA = Convert.ToString(dr["LOA"].ToString());
                        ObjCVarInvoices.mRoutingID = Convert.ToInt64(dr["RoutingID"].ToString());
                        ObjCVarInvoices.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarInvoices.mChildInvoiceID = Convert.ToInt64(dr["ChildInvoiceID"].ToString());
                        ObjCVarInvoices.mFixedDiscount = Convert.ToDecimal(dr["FixedDiscount"].ToString());
                        ObjCVarInvoices.mIsNeglectLimit = Convert.ToBoolean(dr["IsNeglectLimit"].ToString());
                        ObjCVarInvoices.mRelatedToInvoiceID = Convert.ToInt64(dr["RelatedToInvoiceID"].ToString());
                        ObjCVarInvoices.mIsDraftApproved = Convert.ToBoolean(dr["IsDraftApproved"].ToString());
                        ObjCVarInvoices.mDraftApprovingUserID = Convert.ToInt32(dr["DraftApprovingUserID"].ToString());
                        ObjCVarInvoices.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarInvoices.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarInvoices.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarInvoices.mIs3PL = Convert.ToBoolean(dr["Is3PL"].ToString());
                        ObjCVarInvoices.mIsFleet = Convert.ToBoolean(dr["IsFleet"].ToString());
                        ObjCVarInvoices.mEditableNotes = Convert.ToString(dr["EditableNotes"].ToString());
                        ObjCVarInvoices.mIsPrintOriginal = Convert.ToBoolean(dr["IsPrintOriginal"].ToString());
                        ObjCVarInvoices.mCancelledInvoiceID = Convert.ToInt64(dr["CancelledInvoiceID"].ToString());
                        ObjCVarInvoices.mIsDelivered = Convert.ToBoolean(dr["IsDelivered"].ToString());
                        ObjCVarInvoices.mManualPaymentStatusID = Convert.ToInt32(dr["ManualPaymentStatusID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarInvoices.Add(ObjCVarInvoices);
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
                    Com.CommandText = "[dbo].DeleteListInvoices";
                else
                    Com.CommandText = "[dbo].UpdateListInvoices";
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
        public Exception DeleteItem(List<CPKInvoicesTAX> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemInvoices";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKInvoicesTAX ObjCPKInvoices in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKInvoices.ID);
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
        public Exception SaveMethod(List<CVarInvoicesTAX> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@InvoiceNumber", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@InvoiceTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@OperationPartnerID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@AddressID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@PrintedAddress", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CustomerReference", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PaymentTermID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@InvoiceDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@DueDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@AmountWithoutVAT", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TaxTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TaxPercentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TaxAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DiscountTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DiscountPercentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DiscountAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Amount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@PaidAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@RemainingAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@InvoiceStatusID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ApprovingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LeftSignature", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@MiddleSignature", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@RightSignature", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@JVID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@GRT", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DWT", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@NRT", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LOA", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@RoutingID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@OperationContainersAndPackagesID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ChildInvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@FixedDiscount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@IsNeglectLimit", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@RelatedToInvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@IsDraftApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@DraftApprovingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TransactionTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CutOffDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Is3PL", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsFleet", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@EditableNotes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsPrintOriginal", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CancelledInvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@IsDelivered", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ManualPaymentStatusID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarInvoicesTAX ObjCVarInvoices in SaveList)
                {
                    if (ObjCVarInvoices.mIsChanges == true)
                    {
                        if (ObjCVarInvoices.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemInvoicesTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarInvoices.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemInvoicesTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarInvoices.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarInvoices.ID;
                        }
                        Com.Parameters["@InvoiceNumber"].Value = ObjCVarInvoices.InvoiceNumber;
                        Com.Parameters["@InvoiceTypeID"].Value = ObjCVarInvoices.InvoiceTypeID;
                        Com.Parameters["@OperationID"].Value = ObjCVarInvoices.OperationID;
                        Com.Parameters["@OperationPartnerID"].Value = ObjCVarInvoices.OperationPartnerID;
                        Com.Parameters["@AddressID"].Value = ObjCVarInvoices.AddressID;
                        Com.Parameters["@PrintedAddress"].Value = ObjCVarInvoices.PrintedAddress;
                        Com.Parameters["@CustomerReference"].Value = ObjCVarInvoices.CustomerReference;
                        Com.Parameters["@PaymentTermID"].Value = ObjCVarInvoices.PaymentTermID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarInvoices.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarInvoices.ExchangeRate;
                        Com.Parameters["@InvoiceDate"].Value = ObjCVarInvoices.InvoiceDate;
                        Com.Parameters["@DueDate"].Value = ObjCVarInvoices.DueDate;
                        Com.Parameters["@AmountWithoutVAT"].Value = ObjCVarInvoices.AmountWithoutVAT;
                        Com.Parameters["@TaxTypeID"].Value = ObjCVarInvoices.TaxTypeID;
                        Com.Parameters["@TaxPercentage"].Value = ObjCVarInvoices.TaxPercentage;
                        Com.Parameters["@TaxAmount"].Value = ObjCVarInvoices.TaxAmount;
                        Com.Parameters["@DiscountTypeID"].Value = ObjCVarInvoices.DiscountTypeID;
                        Com.Parameters["@DiscountPercentage"].Value = ObjCVarInvoices.DiscountPercentage;
                        Com.Parameters["@DiscountAmount"].Value = ObjCVarInvoices.DiscountAmount;
                        Com.Parameters["@Amount"].Value = ObjCVarInvoices.Amount;
                        Com.Parameters["@PaidAmount"].Value = ObjCVarInvoices.PaidAmount;
                        Com.Parameters["@RemainingAmount"].Value = ObjCVarInvoices.RemainingAmount;
                        Com.Parameters["@InvoiceStatusID"].Value = ObjCVarInvoices.InvoiceStatusID;
                        Com.Parameters["@IsApproved"].Value = ObjCVarInvoices.IsApproved;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarInvoices.IsDeleted;
                        Com.Parameters["@ApprovingUserID"].Value = ObjCVarInvoices.ApprovingUserID;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarInvoices.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarInvoices.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarInvoices.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarInvoices.ModificationDate;
                        Com.Parameters["@LeftSignature"].Value = ObjCVarInvoices.LeftSignature;
                        Com.Parameters["@MiddleSignature"].Value = ObjCVarInvoices.MiddleSignature;
                        Com.Parameters["@RightSignature"].Value = ObjCVarInvoices.RightSignature;
                        Com.Parameters["@JVID"].Value = ObjCVarInvoices.JVID;
                        Com.Parameters["@GRT"].Value = ObjCVarInvoices.GRT;
                        Com.Parameters["@DWT"].Value = ObjCVarInvoices.DWT;
                        Com.Parameters["@NRT"].Value = ObjCVarInvoices.NRT;
                        Com.Parameters["@LOA"].Value = ObjCVarInvoices.LOA;
                        Com.Parameters["@RoutingID"].Value = ObjCVarInvoices.RoutingID;
                        Com.Parameters["@OperationContainersAndPackagesID"].Value = ObjCVarInvoices.OperationContainersAndPackagesID;
                        Com.Parameters["@ChildInvoiceID"].Value = ObjCVarInvoices.ChildInvoiceID;
                        Com.Parameters["@FixedDiscount"].Value = ObjCVarInvoices.FixedDiscount;
                        Com.Parameters["@IsNeglectLimit"].Value = ObjCVarInvoices.IsNeglectLimit;
                        Com.Parameters["@RelatedToInvoiceID"].Value = ObjCVarInvoices.RelatedToInvoiceID;
                        Com.Parameters["@IsDraftApproved"].Value = ObjCVarInvoices.IsDraftApproved;
                        Com.Parameters["@DraftApprovingUserID"].Value = ObjCVarInvoices.DraftApprovingUserID;
                        Com.Parameters["@TransactionTypeID"].Value = ObjCVarInvoices.TransactionTypeID;
                        Com.Parameters["@CutOffDate"].Value = ObjCVarInvoices.CutOffDate;
                        Com.Parameters["@Notes"].Value = ObjCVarInvoices.Notes;
                        Com.Parameters["@Is3PL"].Value = ObjCVarInvoices.Is3PL;
                        Com.Parameters["@IsFleet"].Value = ObjCVarInvoices.IsFleet;
                        Com.Parameters["@EditableNotes"].Value = ObjCVarInvoices.EditableNotes;
                        Com.Parameters["@IsPrintOriginal"].Value = ObjCVarInvoices.IsPrintOriginal;
                        Com.Parameters["@CancelledInvoiceID"].Value = ObjCVarInvoices.CancelledInvoiceID;
                        Com.Parameters["@IsDelivered"].Value = ObjCVarInvoices.IsDelivered;
                        Com.Parameters["@ManualPaymentStatusID"].Value = ObjCVarInvoices.ManualPaymentStatusID;
                        EndTrans(Com, Con);
                        if (ObjCVarInvoices.ID == 0)
                        {
                            ObjCVarInvoices.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarInvoices.mIsChanges = false;
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
