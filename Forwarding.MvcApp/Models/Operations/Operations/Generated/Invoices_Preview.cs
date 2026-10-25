using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKInvoices_Preview
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
    public partial class CVarInvoices_Preview : CPKInvoices_Preview
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

    public partial class CInvoices_Preview
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
        public List<CVarInvoices_Preview> lstCVarInvoices_Preview = new List<CVarInvoices_Preview>();
        public List<CPKInvoices_Preview> lstDeletedCPKInvoices_Preview = new List<CPKInvoices_Preview>();
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
            lstCVarInvoices_Preview.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListInvoices_Preview";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemInvoices_Preview";
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
                        CVarInvoices_Preview ObjCVarInvoices_Preview = new CVarInvoices_Preview();
                        ObjCVarInvoices_Preview.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarInvoices_Preview.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarInvoices_Preview.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarInvoices_Preview.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarInvoices_Preview.mOperationPartnerID = Convert.ToInt64(dr["OperationPartnerID"].ToString());
                        ObjCVarInvoices_Preview.mAddressID = Convert.ToInt64(dr["AddressID"].ToString());
                        ObjCVarInvoices_Preview.mPrintedAddress = Convert.ToString(dr["PrintedAddress"].ToString());
                        ObjCVarInvoices_Preview.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
                        ObjCVarInvoices_Preview.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarInvoices_Preview.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarInvoices_Preview.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarInvoices_Preview.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarInvoices_Preview.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarInvoices_Preview.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarInvoices_Preview.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarInvoices_Preview.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarInvoices_Preview.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarInvoices_Preview.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarInvoices_Preview.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarInvoices_Preview.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarInvoices_Preview.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarInvoices_Preview.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarInvoices_Preview.mRemainingAmount = Convert.ToDecimal(dr["RemainingAmount"].ToString());
                        ObjCVarInvoices_Preview.mInvoiceStatusID = Convert.ToInt32(dr["InvoiceStatusID"].ToString());
                        ObjCVarInvoices_Preview.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarInvoices_Preview.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarInvoices_Preview.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarInvoices_Preview.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarInvoices_Preview.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarInvoices_Preview.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarInvoices_Preview.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarInvoices_Preview.mLeftSignature = Convert.ToString(dr["LeftSignature"].ToString());
                        ObjCVarInvoices_Preview.mMiddleSignature = Convert.ToString(dr["MiddleSignature"].ToString());
                        ObjCVarInvoices_Preview.mRightSignature = Convert.ToString(dr["RightSignature"].ToString());
                        ObjCVarInvoices_Preview.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarInvoices_Preview.mGRT = Convert.ToString(dr["GRT"].ToString());
                        ObjCVarInvoices_Preview.mDWT = Convert.ToString(dr["DWT"].ToString());
                        ObjCVarInvoices_Preview.mNRT = Convert.ToString(dr["NRT"].ToString());
                        ObjCVarInvoices_Preview.mLOA = Convert.ToString(dr["LOA"].ToString());
                        ObjCVarInvoices_Preview.mRoutingID = Convert.ToInt64(dr["RoutingID"].ToString());
                        ObjCVarInvoices_Preview.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarInvoices_Preview.mChildInvoiceID = Convert.ToInt64(dr["ChildInvoiceID"].ToString());
                        ObjCVarInvoices_Preview.mFixedDiscount = Convert.ToDecimal(dr["FixedDiscount"].ToString());
                        ObjCVarInvoices_Preview.mIsNeglectLimit = Convert.ToBoolean(dr["IsNeglectLimit"].ToString());
                        ObjCVarInvoices_Preview.mRelatedToInvoiceID = Convert.ToInt64(dr["RelatedToInvoiceID"].ToString());
                        ObjCVarInvoices_Preview.mIsDraftApproved = Convert.ToBoolean(dr["IsDraftApproved"].ToString());
                        ObjCVarInvoices_Preview.mDraftApprovingUserID = Convert.ToInt32(dr["DraftApprovingUserID"].ToString());
                        ObjCVarInvoices_Preview.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarInvoices_Preview.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarInvoices_Preview.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarInvoices_Preview.mIs3PL = Convert.ToBoolean(dr["Is3PL"].ToString());
                        ObjCVarInvoices_Preview.mIsFleet = Convert.ToBoolean(dr["IsFleet"].ToString());
                        ObjCVarInvoices_Preview.mEditableNotes = Convert.ToString(dr["EditableNotes"].ToString());
                        ObjCVarInvoices_Preview.mIsPrintOriginal = Convert.ToBoolean(dr["IsPrintOriginal"].ToString());
                        lstCVarInvoices_Preview.Add(ObjCVarInvoices_Preview);
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
            lstCVarInvoices_Preview.Clear();

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
                Com.CommandText = "[dbo].GetListPagingInvoices_Preview";
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
                        CVarInvoices_Preview ObjCVarInvoices_Preview = new CVarInvoices_Preview();
                        ObjCVarInvoices_Preview.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarInvoices_Preview.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarInvoices_Preview.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarInvoices_Preview.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarInvoices_Preview.mOperationPartnerID = Convert.ToInt64(dr["OperationPartnerID"].ToString());
                        ObjCVarInvoices_Preview.mAddressID = Convert.ToInt64(dr["AddressID"].ToString());
                        ObjCVarInvoices_Preview.mPrintedAddress = Convert.ToString(dr["PrintedAddress"].ToString());
                        ObjCVarInvoices_Preview.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
                        ObjCVarInvoices_Preview.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarInvoices_Preview.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarInvoices_Preview.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarInvoices_Preview.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarInvoices_Preview.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarInvoices_Preview.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarInvoices_Preview.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarInvoices_Preview.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarInvoices_Preview.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarInvoices_Preview.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarInvoices_Preview.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarInvoices_Preview.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarInvoices_Preview.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarInvoices_Preview.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarInvoices_Preview.mRemainingAmount = Convert.ToDecimal(dr["RemainingAmount"].ToString());
                        ObjCVarInvoices_Preview.mInvoiceStatusID = Convert.ToInt32(dr["InvoiceStatusID"].ToString());
                        ObjCVarInvoices_Preview.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarInvoices_Preview.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarInvoices_Preview.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarInvoices_Preview.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarInvoices_Preview.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarInvoices_Preview.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarInvoices_Preview.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarInvoices_Preview.mLeftSignature = Convert.ToString(dr["LeftSignature"].ToString());
                        ObjCVarInvoices_Preview.mMiddleSignature = Convert.ToString(dr["MiddleSignature"].ToString());
                        ObjCVarInvoices_Preview.mRightSignature = Convert.ToString(dr["RightSignature"].ToString());
                        ObjCVarInvoices_Preview.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarInvoices_Preview.mGRT = Convert.ToString(dr["GRT"].ToString());
                        ObjCVarInvoices_Preview.mDWT = Convert.ToString(dr["DWT"].ToString());
                        ObjCVarInvoices_Preview.mNRT = Convert.ToString(dr["NRT"].ToString());
                        ObjCVarInvoices_Preview.mLOA = Convert.ToString(dr["LOA"].ToString());
                        ObjCVarInvoices_Preview.mRoutingID = Convert.ToInt64(dr["RoutingID"].ToString());
                        ObjCVarInvoices_Preview.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarInvoices_Preview.mChildInvoiceID = Convert.ToInt64(dr["ChildInvoiceID"].ToString());
                        ObjCVarInvoices_Preview.mFixedDiscount = Convert.ToDecimal(dr["FixedDiscount"].ToString());
                        ObjCVarInvoices_Preview.mIsNeglectLimit = Convert.ToBoolean(dr["IsNeglectLimit"].ToString());
                        ObjCVarInvoices_Preview.mRelatedToInvoiceID = Convert.ToInt64(dr["RelatedToInvoiceID"].ToString());
                        ObjCVarInvoices_Preview.mIsDraftApproved = Convert.ToBoolean(dr["IsDraftApproved"].ToString());
                        ObjCVarInvoices_Preview.mDraftApprovingUserID = Convert.ToInt32(dr["DraftApprovingUserID"].ToString());
                        ObjCVarInvoices_Preview.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarInvoices_Preview.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarInvoices_Preview.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarInvoices_Preview.mIs3PL = Convert.ToBoolean(dr["Is3PL"].ToString());
                        ObjCVarInvoices_Preview.mIsFleet = Convert.ToBoolean(dr["IsFleet"].ToString());
                        ObjCVarInvoices_Preview.mEditableNotes = Convert.ToString(dr["EditableNotes"].ToString());
                        ObjCVarInvoices_Preview.mIsPrintOriginal = Convert.ToBoolean(dr["IsPrintOriginal"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarInvoices_Preview.Add(ObjCVarInvoices_Preview);
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
                    Com.CommandText = "[dbo].DeleteListInvoices_Preview";
                else
                    Com.CommandText = "[dbo].UpdateListInvoices_Preview";
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
        public Exception DeleteItem(List<CPKInvoices_Preview> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemInvoices_Preview";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKInvoices_Preview ObjCPKInvoices_Preview in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKInvoices_Preview.ID);
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
        public Exception SaveMethod(List<CVarInvoices_Preview> SaveList)
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
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarInvoices_Preview ObjCVarInvoices_Preview in SaveList)
                {
                    if (ObjCVarInvoices_Preview.mIsChanges == true)
                    {
                        if (ObjCVarInvoices_Preview.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemInvoices_Preview";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarInvoices_Preview.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemInvoices_Preview";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarInvoices_Preview.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarInvoices_Preview.ID;
                        }
                        Com.Parameters["@InvoiceNumber"].Value = ObjCVarInvoices_Preview.InvoiceNumber;
                        Com.Parameters["@InvoiceTypeID"].Value = ObjCVarInvoices_Preview.InvoiceTypeID;
                        Com.Parameters["@OperationID"].Value = ObjCVarInvoices_Preview.OperationID;
                        Com.Parameters["@OperationPartnerID"].Value = ObjCVarInvoices_Preview.OperationPartnerID;
                        Com.Parameters["@AddressID"].Value = ObjCVarInvoices_Preview.AddressID;
                        Com.Parameters["@PrintedAddress"].Value = ObjCVarInvoices_Preview.PrintedAddress;
                        Com.Parameters["@CustomerReference"].Value = ObjCVarInvoices_Preview.CustomerReference;
                        Com.Parameters["@PaymentTermID"].Value = ObjCVarInvoices_Preview.PaymentTermID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarInvoices_Preview.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarInvoices_Preview.ExchangeRate;
                        Com.Parameters["@InvoiceDate"].Value = ObjCVarInvoices_Preview.InvoiceDate;
                        Com.Parameters["@DueDate"].Value = ObjCVarInvoices_Preview.DueDate;
                        Com.Parameters["@AmountWithoutVAT"].Value = ObjCVarInvoices_Preview.AmountWithoutVAT;
                        Com.Parameters["@TaxTypeID"].Value = ObjCVarInvoices_Preview.TaxTypeID;
                        Com.Parameters["@TaxPercentage"].Value = ObjCVarInvoices_Preview.TaxPercentage;
                        Com.Parameters["@TaxAmount"].Value = ObjCVarInvoices_Preview.TaxAmount;
                        Com.Parameters["@DiscountTypeID"].Value = ObjCVarInvoices_Preview.DiscountTypeID;
                        Com.Parameters["@DiscountPercentage"].Value = ObjCVarInvoices_Preview.DiscountPercentage;
                        Com.Parameters["@DiscountAmount"].Value = ObjCVarInvoices_Preview.DiscountAmount;
                        Com.Parameters["@Amount"].Value = ObjCVarInvoices_Preview.Amount;
                        Com.Parameters["@PaidAmount"].Value = ObjCVarInvoices_Preview.PaidAmount;
                        Com.Parameters["@RemainingAmount"].Value = ObjCVarInvoices_Preview.RemainingAmount;
                        Com.Parameters["@InvoiceStatusID"].Value = ObjCVarInvoices_Preview.InvoiceStatusID;
                        Com.Parameters["@IsApproved"].Value = ObjCVarInvoices_Preview.IsApproved;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarInvoices_Preview.IsDeleted;
                        Com.Parameters["@ApprovingUserID"].Value = ObjCVarInvoices_Preview.ApprovingUserID;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarInvoices_Preview.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarInvoices_Preview.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarInvoices_Preview.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarInvoices_Preview.ModificationDate;
                        Com.Parameters["@LeftSignature"].Value = ObjCVarInvoices_Preview.LeftSignature;
                        Com.Parameters["@MiddleSignature"].Value = ObjCVarInvoices_Preview.MiddleSignature;
                        Com.Parameters["@RightSignature"].Value = ObjCVarInvoices_Preview.RightSignature;
                        Com.Parameters["@JVID"].Value = ObjCVarInvoices_Preview.JVID;
                        Com.Parameters["@GRT"].Value = ObjCVarInvoices_Preview.GRT;
                        Com.Parameters["@DWT"].Value = ObjCVarInvoices_Preview.DWT;
                        Com.Parameters["@NRT"].Value = ObjCVarInvoices_Preview.NRT;
                        Com.Parameters["@LOA"].Value = ObjCVarInvoices_Preview.LOA;
                        Com.Parameters["@RoutingID"].Value = ObjCVarInvoices_Preview.RoutingID;
                        Com.Parameters["@OperationContainersAndPackagesID"].Value = ObjCVarInvoices_Preview.OperationContainersAndPackagesID;
                        Com.Parameters["@ChildInvoiceID"].Value = ObjCVarInvoices_Preview.ChildInvoiceID;
                        Com.Parameters["@FixedDiscount"].Value = ObjCVarInvoices_Preview.FixedDiscount;
                        Com.Parameters["@IsNeglectLimit"].Value = ObjCVarInvoices_Preview.IsNeglectLimit;
                        Com.Parameters["@RelatedToInvoiceID"].Value = ObjCVarInvoices_Preview.RelatedToInvoiceID;
                        Com.Parameters["@IsDraftApproved"].Value = ObjCVarInvoices_Preview.IsDraftApproved;
                        Com.Parameters["@DraftApprovingUserID"].Value = ObjCVarInvoices_Preview.DraftApprovingUserID;
                        Com.Parameters["@TransactionTypeID"].Value = ObjCVarInvoices_Preview.TransactionTypeID;
                        Com.Parameters["@CutOffDate"].Value = ObjCVarInvoices_Preview.CutOffDate;
                        Com.Parameters["@Notes"].Value = ObjCVarInvoices_Preview.Notes;
                        Com.Parameters["@Is3PL"].Value = ObjCVarInvoices_Preview.Is3PL;
                        Com.Parameters["@IsFleet"].Value = ObjCVarInvoices_Preview.IsFleet;
                        Com.Parameters["@EditableNotes"].Value = ObjCVarInvoices_Preview.EditableNotes;
                        Com.Parameters["@IsPrintOriginal"].Value = ObjCVarInvoices_Preview.IsPrintOriginal;
                        EndTrans(Com, Con);
                        if (ObjCVarInvoices_Preview.ID == 0)
                        {
                            ObjCVarInvoices_Preview.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarInvoices_Preview.mIsChanges = false;
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
