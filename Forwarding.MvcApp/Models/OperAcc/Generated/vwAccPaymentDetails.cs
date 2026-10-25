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
    public partial class CVarvwAccPaymentDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Int64 mPaymentID;
        internal String mPaymentCode;
        internal Int32 mPRType;
        internal Int32 mBankAccountID;
        internal String mAccountName;
        internal Int32 mTreasuryID;
        internal String mTreasuryName;
        internal Int32 mBranchID;
        internal String mPaymentNotes;
        internal DateTime mPaymentDate;
        internal DateTime mDueDate;
        internal String mChequeOrVisaNo;
        internal Boolean mIsRefused;
        internal Int32 mPaymentTypeID;
        internal String mPaymentTypeName;
        internal Int32 mPartnerTypeID;
        internal String mPartnerTypeCode;
        internal Boolean mIsGeneralExpense;
        internal Int32 mChargeTypeID;
        internal String mChargeTypeName;
        internal String mChargeTypeCode;
        internal String mDealerName;
        internal Int32 mPartnerID;
        internal String mPartnerName;
        internal Decimal mAmount;
        internal Int32 mCurrencyID;
        internal String mCurrencyCode;
        internal Decimal mExchangeRate;
        internal Boolean mIsApproved;
        internal Boolean mIsDeleted;
        internal String mNotes;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
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
        public Int32 PRType
        {
            get { return mPRType; }
            set { mPRType = value; }
        }
        public Int32 BankAccountID
        {
            get { return mBankAccountID; }
            set { mBankAccountID = value; }
        }
        public String AccountName
        {
            get { return mAccountName; }
            set { mAccountName = value; }
        }
        public Int32 TreasuryID
        {
            get { return mTreasuryID; }
            set { mTreasuryID = value; }
        }
        public String TreasuryName
        {
            get { return mTreasuryName; }
            set { mTreasuryName = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mBranchID = value; }
        }
        public String PaymentNotes
        {
            get { return mPaymentNotes; }
            set { mPaymentNotes = value; }
        }
        public DateTime PaymentDate
        {
            get { return mPaymentDate; }
            set { mPaymentDate = value; }
        }
        public DateTime DueDate
        {
            get { return mDueDate; }
            set { mDueDate = value; }
        }
        public String ChequeOrVisaNo
        {
            get { return mChequeOrVisaNo; }
            set { mChequeOrVisaNo = value; }
        }
        public Boolean IsRefused
        {
            get { return mIsRefused; }
            set { mIsRefused = value; }
        }
        public Int32 PaymentTypeID
        {
            get { return mPaymentTypeID; }
            set { mPaymentTypeID = value; }
        }
        public String PaymentTypeName
        {
            get { return mPaymentTypeName; }
            set { mPaymentTypeName = value; }
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
        public Boolean IsGeneralExpense
        {
            get { return mIsGeneralExpense; }
            set { mIsGeneralExpense = value; }
        }
        public Int32 ChargeTypeID
        {
            get { return mChargeTypeID; }
            set { mChargeTypeID = value; }
        }
        public String ChargeTypeName
        {
            get { return mChargeTypeName; }
            set { mChargeTypeName = value; }
        }
        public String ChargeTypeCode
        {
            get { return mChargeTypeCode; }
            set { mChargeTypeCode = value; }
        }
        public String DealerName
        {
            get { return mDealerName; }
            set { mDealerName = value; }
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
        public Decimal Amount
        {
            get { return mAmount; }
            set { mAmount = value; }
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
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsApproved = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
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
        #endregion
    }

    public partial class CvwAccPaymentDetails
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
        public List<CVarvwAccPaymentDetails> lstCVarvwAccPaymentDetails = new List<CVarvwAccPaymentDetails>();
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
            lstCVarvwAccPaymentDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwAccPaymentDetails";
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
                        CVarvwAccPaymentDetails ObjCVarvwAccPaymentDetails = new CVarvwAccPaymentDetails();
                        ObjCVarvwAccPaymentDetails.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwAccPaymentDetails.mPaymentID = Convert.ToInt64(dr["PaymentID"].ToString());
                        ObjCVarvwAccPaymentDetails.mPaymentCode = Convert.ToString(dr["PaymentCode"].ToString());
                        ObjCVarvwAccPaymentDetails.mPRType = Convert.ToInt32(dr["PRType"].ToString());
                        ObjCVarvwAccPaymentDetails.mBankAccountID = Convert.ToInt32(dr["BankAccountID"].ToString());
                        ObjCVarvwAccPaymentDetails.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwAccPaymentDetails.mTreasuryID = Convert.ToInt32(dr["TreasuryID"].ToString());
                        ObjCVarvwAccPaymentDetails.mTreasuryName = Convert.ToString(dr["TreasuryName"].ToString());
                        ObjCVarvwAccPaymentDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwAccPaymentDetails.mPaymentNotes = Convert.ToString(dr["PaymentNotes"].ToString());
                        ObjCVarvwAccPaymentDetails.mPaymentDate = Convert.ToDateTime(dr["PaymentDate"].ToString());
                        ObjCVarvwAccPaymentDetails.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarvwAccPaymentDetails.mChequeOrVisaNo = Convert.ToString(dr["ChequeOrVisaNo"].ToString());
                        ObjCVarvwAccPaymentDetails.mIsRefused = Convert.ToBoolean(dr["IsRefused"].ToString());
                        ObjCVarvwAccPaymentDetails.mPaymentTypeID = Convert.ToInt32(dr["PaymentTypeID"].ToString());
                        ObjCVarvwAccPaymentDetails.mPaymentTypeName = Convert.ToString(dr["PaymentTypeName"].ToString());
                        ObjCVarvwAccPaymentDetails.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwAccPaymentDetails.mPartnerTypeCode = Convert.ToString(dr["PartnerTypeCode"].ToString());
                        ObjCVarvwAccPaymentDetails.mIsGeneralExpense = Convert.ToBoolean(dr["IsGeneralExpense"].ToString());
                        ObjCVarvwAccPaymentDetails.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwAccPaymentDetails.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwAccPaymentDetails.mChargeTypeCode = Convert.ToString(dr["ChargeTypeCode"].ToString());
                        ObjCVarvwAccPaymentDetails.mDealerName = Convert.ToString(dr["DealerName"].ToString());
                        ObjCVarvwAccPaymentDetails.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwAccPaymentDetails.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwAccPaymentDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwAccPaymentDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwAccPaymentDetails.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwAccPaymentDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwAccPaymentDetails.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwAccPaymentDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwAccPaymentDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwAccPaymentDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwAccPaymentDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwAccPaymentDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwAccPaymentDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        lstCVarvwAccPaymentDetails.Add(ObjCVarvwAccPaymentDetails);
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
            lstCVarvwAccPaymentDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwAccPaymentDetails";
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
                        CVarvwAccPaymentDetails ObjCVarvwAccPaymentDetails = new CVarvwAccPaymentDetails();
                        ObjCVarvwAccPaymentDetails.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwAccPaymentDetails.mPaymentID = Convert.ToInt64(dr["PaymentID"].ToString());
                        ObjCVarvwAccPaymentDetails.mPaymentCode = Convert.ToString(dr["PaymentCode"].ToString());
                        ObjCVarvwAccPaymentDetails.mPRType = Convert.ToInt32(dr["PRType"].ToString());
                        ObjCVarvwAccPaymentDetails.mBankAccountID = Convert.ToInt32(dr["BankAccountID"].ToString());
                        ObjCVarvwAccPaymentDetails.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwAccPaymentDetails.mTreasuryID = Convert.ToInt32(dr["TreasuryID"].ToString());
                        ObjCVarvwAccPaymentDetails.mTreasuryName = Convert.ToString(dr["TreasuryName"].ToString());
                        ObjCVarvwAccPaymentDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwAccPaymentDetails.mPaymentNotes = Convert.ToString(dr["PaymentNotes"].ToString());
                        ObjCVarvwAccPaymentDetails.mPaymentDate = Convert.ToDateTime(dr["PaymentDate"].ToString());
                        ObjCVarvwAccPaymentDetails.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarvwAccPaymentDetails.mChequeOrVisaNo = Convert.ToString(dr["ChequeOrVisaNo"].ToString());
                        ObjCVarvwAccPaymentDetails.mIsRefused = Convert.ToBoolean(dr["IsRefused"].ToString());
                        ObjCVarvwAccPaymentDetails.mPaymentTypeID = Convert.ToInt32(dr["PaymentTypeID"].ToString());
                        ObjCVarvwAccPaymentDetails.mPaymentTypeName = Convert.ToString(dr["PaymentTypeName"].ToString());
                        ObjCVarvwAccPaymentDetails.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwAccPaymentDetails.mPartnerTypeCode = Convert.ToString(dr["PartnerTypeCode"].ToString());
                        ObjCVarvwAccPaymentDetails.mIsGeneralExpense = Convert.ToBoolean(dr["IsGeneralExpense"].ToString());
                        ObjCVarvwAccPaymentDetails.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwAccPaymentDetails.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwAccPaymentDetails.mChargeTypeCode = Convert.ToString(dr["ChargeTypeCode"].ToString());
                        ObjCVarvwAccPaymentDetails.mDealerName = Convert.ToString(dr["DealerName"].ToString());
                        ObjCVarvwAccPaymentDetails.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwAccPaymentDetails.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwAccPaymentDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwAccPaymentDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwAccPaymentDetails.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwAccPaymentDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwAccPaymentDetails.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwAccPaymentDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwAccPaymentDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwAccPaymentDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwAccPaymentDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwAccPaymentDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwAccPaymentDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwAccPaymentDetails.Add(ObjCVarvwAccPaymentDetails);
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
